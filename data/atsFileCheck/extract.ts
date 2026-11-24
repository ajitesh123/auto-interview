/**
 * Read a resume file the way a plain parser does, with no server and no AI.
 * PDF: pdf.js text layer (positions, page count, images). DOCX: the XML inside the zip.
 * The libraries are passed in, so the same code runs in the browser and in our tsx tests.
 */

/** side: on a two-column page, L = left column only, R = right only, B = both on one line. */
export type Line = { text: string; page: number; y: number; side?: 'L' | 'R' | 'B' }

export type Extracted = {
  kind: 'pdf' | 'docx' | 'doc' | 'image' | 'other'
  fileName: string
  bytes: number
  /** Plain text in the order the file stores it (PDF content stream, DOCX body order). */
  streamText: string
  /** PDF only: text read line by line across the full page width (top to bottom, left to right). */
  rowText: string
  lines: Line[]
  pages: number | null
  password: boolean
  error?: string
  /** PDF: pages with fewer than 40 text characters. */
  emptyPages: number[]
  /** PDF: pages where a two-column split was found, with the split position as a share of width. */
  columnPages: { page: number; at: number; share: number }[]
  images: number
  tables: number
  textBoxes: { count: number; text: string }
  headerFooter: { text: string; contact: string[] }
  docxColumns: number
  /** DOCX: sections in the file, and how many of them use Word's Columns setting. */
  docxSections: number
  docxColumnSections: number
  /** DOCX: text inside tables, to tell a layout table from a small one. */
  tableText: string
  symbols: number
  privateUse: number
  replacement: number
  /** Typographic ligatures (ﬁ, ﬂ…) that break keyword search ("certiﬁed"). */
  ligatures: number
  /** PDF: pages actually read (we stop at 6). */
  readPages: number
  /** PDF page 1 size, for the preview overlay. */
  pageSize?: { w: number; h: number }
}

export const EMAIL_RE = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/
// no newlines inside a match: a postcode on one line and a phone on the next must not merge
export const PHONE_RE = /(\+?\d[\d \t().\-\u2011\u2013]{8,}\d)/g

export function hasPhone(s: string): boolean {
  return s.split('\n').some((line) => phoneOnLine(line))
}

function phoneOnLine(s: string): boolean {
  return (s.match(PHONE_RE) ?? ([] as string[])).some((m) => {
    const digits = m.replace(/\D/g, '')
    if (digits.length < 10 || digits.length > 15) return false
    // "2019 - 2023" style ranges are dates, not phones
    if (/(19|20)\d{2}\s*[-–]\s*(19|20)\d{2}/.test(m)) return false
    return true
  })
}

export function contactFound(s: string): string[] {
  const out: string[] = []
  if (EMAIL_RE.test(s)) out.push('email')
  if (hasPhone(s)) out.push('phone')
  return out
}

/**
 * Private-use (icon font) and unreadable characters. A private-use character that starts a line
 * is a list bullet (Word's Symbol bullet extracts as U+F0B7), which parsers drop harmlessly, so
 * it is not counted.
 */
export function countPua(s: string) {
  let pua = 0
  let rep = 0
  let lig = 0
  for (const line of s.split('\n')) {
    const first = line.trimStart().codePointAt(0)
    let i = 0
    for (const ch of line.trimStart()) {
      const c = ch.codePointAt(0) ?? 0
      if (c >= 0xe000 && c <= 0xf8ff) {
        if (!(i === 0 && c === first)) pua++
      } else if (c === 0xfffd) rep++
      else if (c >= 0xfb00 && c <= 0xfb06) lig++
      i++
    }
  }
  return { pua, rep, lig }
}

/** Word Symbol/Wingdings characters used as bullets: not icons. */
const BULLET_SYMS = /w:char="(F0B7|F0A7|F0D8|F076|F0FC|F0A8|F06E|F071|F0B2|F0E0|F0D7)"/i

export function blank(kind: Extracted['kind'], fileName: string, bytes: number): Extracted {
  return {
    kind,
    fileName,
    bytes,
    streamText: '',
    rowText: '',
    lines: [],
    pages: null,
    password: false,
    emptyPages: [],
    columnPages: [],
    images: 0,
    tables: 0,
    textBoxes: { count: 0, text: '' },
    headerFooter: { text: '', contact: [] },
    docxColumns: 1,
    docxSections: 1,
    docxColumnSections: 0,
    tableText: '',
    symbols: 0,
    privateUse: 0,
    replacement: 0,
    ligatures: 0,
    readPages: 0,
  }
}

export function kindOf(name: string, head: Uint8Array): Extracted['kind'] {
  const n = name.toLowerCase()
  const sig = Array.from(head.slice(0, 8))
  const isPdf = sig[0] === 0x25 && sig[1] === 0x50 && sig[2] === 0x44 && sig[3] === 0x46 // %PDF
  const isZip = sig[0] === 0x50 && sig[1] === 0x4b // PK
  const isOle = sig[0] === 0xd0 && sig[1] === 0xcf && sig[2] === 0x11 && sig[3] === 0xe0
  const isPng = sig[0] === 0x89 && sig[1] === 0x50 && sig[2] === 0x4e && sig[3] === 0x47
  const isJpg = sig[0] === 0xff && sig[1] === 0xd8
  if (isPdf) return 'pdf'
  if (isZip && n.endsWith('.docx')) return 'docx'
  if (isOle || n.endsWith('.doc')) return 'doc'
  if (isPng || isJpg || /\.(png|jpe?g|heic|webp)$/.test(n)) return 'image'
  if (isZip) return 'docx'
  return 'other'
}

/* ---------------- PDF ---------------- */

type PdfItem = { str: string; transform: number[]; width: number; hasEOL?: boolean }
// Minimal shape of the pdf.js API we use, so this file does not import pdf.js types.
export type PdfJs = {
  getDocument: (src: {
    data: Uint8Array
    isEvalSupported?: boolean
    disableFontFace?: boolean
    useSystemFonts?: boolean
    cMapUrl?: string
    cMapPacked?: boolean
    standardFontDataUrl?: string
  }) => {
    promise: Promise<{
      numPages: number
      getPage: (n: number) => Promise<{
        view: number[]
        getTextContent: () => Promise<{ items: unknown[] }>
        getOperatorList: () => Promise<{ fnArray: number[] }>
      }>
      destroy: () => Promise<void>
    }>
  }
  OPS: Record<string, number>
}

type Row = { y: number; items: { x: number; end: number; str: string }[] }

function rowsOf(items: PdfItem[]): Row[] {
  const rows: Row[] = []
  const sorted = items
    .filter((i) => i.str.trim().length > 0)
    .map((i) => ({
      x: i.transform[4],
      y: i.transform[5],
      end: i.transform[4] + i.width,
      str: i.str,
    }))
    .sort((a, b) => b.y - a.y || a.x - b.x)
  for (const it of sorted) {
    const row = rows.find((r) => Math.abs(r.y - it.y) <= 2.5)
    if (row) row.items.push(it)
    else rows.push({ y: it.y, items: [it] })
  }
  for (const r of rows) r.items.sort((a, b) => a.x - b.x)
  return rows.sort((a, b) => b.y - a.y)
}

function joinRow(r: Row): string {
  let out = ''
  let lastEnd = -Infinity
  for (const it of r.items) {
    if (out && it.x - lastEnd > 1.5 && !out.endsWith(' ')) out += it.x - lastEnd > 24 ? '   ' : ' '
    out += it.str
    lastEnd = it.end
  }
  return out.replace(/\s+$/, '')
}

/**
 * Two-column test for one page: a vertical gutter that almost no text crosses, with a body of
 * text on each side (each side on at least 30% of lines), and the right side starting at a shared
 * left edge on at least 5 lines. That last test keeps right-aligned dates (which share a right
 * edge, not a left one) from reading as a second column.
 */
export function detectColumns(
  rows: Row[],
  pageWidth: number
): { at: number; share: number } | null {
  if (rows.length < 8) return null
  const candidates: number[] = []
  for (let x = pageWidth * 0.2; x <= pageWidth * 0.75; x += 4) candidates.push(x)
  let best: { at: number; share: number } | null = null
  const good: { x: number; share: number }[] = []
  for (const x of candidates) {
    let crossing = 0
    let left = 0
    let right = 0
    for (const r of rows) {
      const l = r.items.some((i) => i.end <= x - 6)
      const rt = r.items.some((i) => i.x >= x + 6)
      const cross = r.items.some((i) => i.x < x - 6 && i.end > x + 6)
      if (cross) crossing++
      else {
        if (l) left++
        if (rt) right++
      }
    }
    // a real gutter: almost nothing crosses it, and both sides carry a body of text
    if (crossing / rows.length > 0.12) continue
    if (left < 5 || right < 5) continue
    const share = Math.min(left, right) / rows.length
    if (share < 0.3) continue
    const starts = rows
      .map((r) => r.items.find((i) => i.x >= x + 6)?.x)
      .filter((v): v is number => v !== undefined)
    const edge = starts.reduce(
      (bestN, s0) => Math.max(bestN, starts.filter((s1) => Math.abs(s1 - s0) <= 3).length),
      0
    )
    if (edge < 5) continue
    good.push({ x, share })
  }
  if (!good.length) return null
  // the gutter is a run of candidate positions; put the split in the middle of the widest run
  const top = Math.max(...good.map((g) => g.share))
  const run = good.filter((g) => g.share >= top - 0.02).map((g) => g.x)
  best = { at: (run[0] + run[run.length - 1]) / 2 / pageWidth, share: top }
  return best
}

export async function extractPdf(
  data: Uint8Array,
  fileName: string,
  pdfjs: PdfJs,
  assets?: { cMapUrl: string; standardFontDataUrl: string }
): Promise<Extracted> {
  const ex = blank('pdf', fileName, data.byteLength)
  let doc
  try {
    doc = await pdfjs.getDocument({
      data: data.slice(),
      isEvalSupported: false,
      ...(assets
        ? {
            cMapUrl: assets.cMapUrl,
            cMapPacked: true,
            standardFontDataUrl: assets.standardFontDataUrl,
          }
        : {}),
    }).promise
  } catch (e) {
    const name = (e as { name?: string })?.name ?? ''
    if (name === 'PasswordException') {
      ex.password = true
      return ex
    }
    ex.error =
      'This PDF could not be opened. It may be damaged; export it again from Word or Google Docs.'
    return ex
  }
  ex.pages = doc.numPages
  const stream: string[] = []
  const rowLines: string[] = []
  const imgOps = new Set(
    [
      'paintImageXObject',
      'paintInlineImageXObject',
      'paintImageMaskXObject',
      'paintImageXObjectRepeat',
    ]
      .map((k) => pdfjs.OPS[k])
      .filter((v) => typeof v === 'number')
  )
  const maxPages = Math.min(doc.numPages, 6)
  ex.readPages = maxPages
  for (let p = 1; p <= maxPages; p++) {
    const page = await doc.getPage(p)
    const [x0, y0, x1, y1] = page.view
    const width = x1 - x0
    if (p === 1) ex.pageSize = { w: width, h: y1 - y0 }
    const tc = await page.getTextContent()
    const items = (tc.items as PdfItem[])
      .filter((i) => typeof i.str === 'string')
      .map((i) => ({
        ...i,
        transform: [...i.transform.slice(0, 4), i.transform[4] - x0, i.transform[5]],
      }))
    let s = ''
    for (const it of items) {
      s += it.str
      if (it.hasEOL) s += '\n'
      else if (it.str && !it.str.endsWith(' ')) s += ' '
    }
    stream.push(s.replace(/[ \t]+\n/g, '\n').trim())
    const chars = items.reduce((n, i) => n + i.str.replace(/\s/g, '').length, 0)
    if (chars < 40) ex.emptyPages.push(p)
    const rows = rowsOf(items)
    const col = detectColumns(rows, width)
    if (col) ex.columnPages.push({ page: p, at: col.at, share: col.share })
    const split = col ? col.at * width : null
    for (const r of rows) {
      const t = joinRow(r)
      rowLines.push(t)
      let side: Line['side']
      if (split !== null) {
        const l = r.items.some((i) => i.end <= split)
        const rt = r.items.some((i) => i.x >= split)
        side = l && rt ? 'B' : l ? 'L' : 'R'
      }
      ex.lines.push({ text: t, page: p, y: r.y, side })
    }
    try {
      const ops = await page.getOperatorList()
      ex.images += ops.fnArray.filter((f) => imgOps.has(f)).length
    } catch {
      /* images are a soft signal; ignore failures */
    }
  }
  await doc.destroy()
  ex.streamText = stream.join('\n\n')
  ex.rowText = rowLines.join('\n')
  const g = countPua(ex.streamText)
  ex.privateUse = g.pua
  ex.replacement = g.rep
  ex.ligatures = g.lig
  return ex
}

/* ---------------- DOCX ---------------- */

export type ZipLib = {
  loadAsync: (d: Uint8Array) => Promise<{
    file: (path: string) => { async: (t: 'string') => Promise<string> } | null
    files: Record<string, unknown>
  }>
}

const decode = (s: string) =>
  s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&amp;/g, '&')

/** Paragraph text from WordprocessingML: w:t runs, tabs and breaks, one line per w:p. */
export function paragraphsOf(xml: string): string[] {
  const out: string[] = []
  const paras = xml.split(/<\/w:p>/)
  for (const p of paras) {
    let line = ''
    const re = /<w:t(?:\s[^>]*)?>([^<]*)<\/w:t>|<w:tab\/>|<w:br\/>|<w:sym\s[^>]*\/>/g
    let m: RegExpExecArray | null
    while ((m = re.exec(p))) {
      if (m[1] !== undefined) line += decode(m[1])
      else if (m[0].startsWith('<w:tab')) line += '\t'
      else if (m[0].startsWith('<w:br')) line += '\n'
      else line += '□' // a Symbol/Wingdings glyph: shown as a box, like many parsers do
    }
    if (line.trim()) out.push(line.replace(/\t+/g, '   ').trimEnd())
  }
  return out
}

export async function extractDocx(
  data: Uint8Array,
  fileName: string,
  JSZip: ZipLib
): Promise<Extracted> {
  const ex = blank('docx', fileName, data.byteLength)
  let zip
  try {
    zip = await JSZip.loadAsync(data)
  } catch {
    ex.error = 'This .docx could not be opened. Save it again from Word or Google Docs.'
    return ex
  }
  const main = zip.file('word/document.xml')
  if (!main) {
    ex.error = 'No Word document found inside this file. Is it a real .docx?'
    return ex
  }
  let xml = await main.async('string')
  // Word stores a text box twice (DrawingML + a VML fallback); keep one copy
  xml = xml.replace(/<mc:Fallback>[\s\S]*?<\/mc:Fallback>/g, '')
  const boxes = xml.match(/<w:txbxContent>[\s\S]*?<\/w:txbxContent>/g) ?? []
  ex.textBoxes = {
    count: boxes.length,
    text: boxes.flatMap((b) => paragraphsOf(b)).join('\n'),
  }
  const body = xml.replace(/<w:txbxContent>[\s\S]*?<\/w:txbxContent>/g, '</w:p>')
  ex.tables = (xml.match(/<w:tbl>/g) ?? []).length
  ex.tableText = (xml.match(/<w:tbl>[\s\S]*?<\/w:tbl>/g) ?? [])
    .flatMap((t) => paragraphsOf(t))
    .join('\n')
  const imgCount = (x: string) =>
    (x.match(/<pic:pic[\s>]/g) ?? []).length + (x.match(/<v:imagedata\s/g) ?? []).length
  ex.images = imgCount(xml)
  ex.symbols = (xml.match(/<w:sym\s[^>]*\/>/g) ?? []).filter((m) => !BULLET_SYMS.test(m)).length
  const sects = xml.match(/<w:sectPr[\s>][\s\S]*?<\/w:sectPr>/g) ?? []
  const colsPer = sects.map((x) => Number(x.match(/<w:cols\s[^>]*w:num="(\d+)"/)?.[1] ?? 1))
  ex.docxSections = Math.max(1, sects.length)
  ex.docxColumnSections = colsPer.filter((n) => n > 1).length
  ex.docxColumns = colsPer.length ? Math.max(...colsPer) : 1

  const paras = paragraphsOf(body)
  ex.streamText = paras.join('\n')
  ex.lines = paras.map((t, i) => ({ text: t, page: 1, y: -i }))

  const hf: string[] = []
  for (const path of Object.keys(zip.files)) {
    if (/^word\/(header|footer)\d*\.xml$/.test(path)) {
      const f = zip.file(path)
      if (f) {
        const hx = await f.async('string')
        hf.push(...paragraphsOf(hx))
        ex.images += imgCount(hx) // a photo in the header is common
      }
    }
  }
  const hfText = hf.join('\n')
  ex.headerFooter = { text: hfText, contact: contactFound(hfText) }

  const app = zip.file('docProps/app.xml')
  if (app) {
    const m = (await app.async('string')).match(/<Pages>(\d+)<\/Pages>/)
    if (m) ex.pages = Number(m[1])
  }
  const g = countPua(ex.streamText + '\n' + ex.textBoxes.text)
  ex.privateUse = g.pua
  ex.replacement = g.rep
  ex.ligatures = g.lig
  return ex
}
