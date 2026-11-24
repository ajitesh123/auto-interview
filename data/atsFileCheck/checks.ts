/**
 * File-level ATS checks over what extract.ts read. Pure functions, no I/O.
 * Each check names the help pages it rests on (keys into sources.ts), so the UI can show
 * "Greenhouse, Talview, MIT say so" under every result instead of our opinion.
 */
import { contactFound, type Extracted } from './extract'
import type { SourceKey } from './sources'

export type Status = 'pass' | 'warn' | 'fail' | 'na'

export type Check = {
  id: string
  label: string
  status: Status
  detail: string
  fix?: string
  sources: SourceKey[]
}

export const PARSE_LIMIT_MB = 2.5
export const MB = 1024 * 1024

const HEADS: [string, RegExp][] = [
  [
    'Experience',
    /^(work |professional |relevant )?(experience|employment|work history|internships?)\b/i,
  ],
  [
    'Education',
    /^(educational qualifications?|education|academics?|academic (background|details|qualifications?)|qualifications)\b/i,
  ],
  ['Skills', /^(([\w&/+-]+\s){0,3}skills|(core )?competencies|tools|tech stack)\b/i],
  ['Projects', /^(academic |personal |key )?projects?\b/i],
  ['Summary', /^(summary|profile|professional summary|about me|objective)\b/i],
]

export function headingsFound(lines: string[]): string[] {
  const short = lines.map((l) => l.replace(/[:|•]/g, '').trim()).filter((l) => l.length <= 40)
  return HEADS.filter(([, re]) => short.some((l) => re.test(l))).map(([n]) => n)
}

const plural = (n: number, one: string, many = one + 's') => `${n} ${n === 1 ? one : many}`

export function runChecks(ex: Extracted): Check[] {
  const c: Check[] = []
  const isPdf = ex.kind === 'pdf'
  const isDocx = ex.kind === 'docx'
  const mb = ex.bytes / MB

  // 1. file type
  c.push({
    id: 'type',
    label: 'File type',
    status: isPdf || isDocx ? 'pass' : ex.kind === 'image' ? 'fail' : 'warn',
    detail: isPdf
      ? 'PDF. Greenhouse, Lever and Workable all list it.'
      : isDocx
        ? 'Word .docx. Greenhouse, Lever and Workable all list it.'
        : ex.kind === 'doc'
          ? 'Old Word .doc. Most systems accept it, but this checker cannot read it.'
          : ex.kind === 'image'
            ? 'An image file. Lever “cannot parse information from image files”.'
            : 'This checker reads PDF and .docx only. Some systems take .txt or .rtf, but PDF or .docx is the safe choice.',
    fix:
      isPdf || isDocx
        ? undefined
        : 'Open it in Word or Google Docs and download as PDF or .docx, then check again.',
    sources: ['lever', 'greenhouseFormats', 'workable'],
  })

  // 2. size
  c.push({
    id: 'size',
    label: 'File size',
    status: mb <= PARSE_LIMIT_MB ? 'pass' : mb <= 5 ? 'warn' : 'fail',
    detail: `${mb < 0.1 ? Math.max(1, Math.round(ex.bytes / 1024)) + ' KB' : mb.toFixed(1) + ' MB'}. Greenhouse does not parse resumes over ${PARSE_LIMIT_MB} MB; Workable’s resume limit is 5 MB.`,
    fix:
      mb > PARSE_LIMIT_MB
        ? 'Remove photos and background images, or export with “Reduce file size” / “Minimum size”.'
        : undefined,
    sources: ['greenhouseParse', 'workable'],
  })

  if (!(isPdf || isDocx) || ex.error || ex.password) {
    if (ex.password)
      c.push({
        id: 'password',
        label: 'Password',
        status: 'fail',
        detail:
          'This PDF asks for a password. “Password-protected files can’t be parsed” (Recruiterflow).',
        fix: 'Export a copy with no password or editing restrictions.',
        sources: ['recruiterflow'],
      })
    return c
  }

  const body = ex.streamText
  const chars = body.replace(/\s/g, '').length

  const partial = isPdf && ex.pages !== null && ex.readPages < ex.pages
  const scope = partial ? ` (we read the first ${ex.readPages} of ${ex.pages} pages)` : ''
  const pagesWord = (ps: number[]) =>
    ps.length === 1
      ? `Page ${ps[0]} has`
      : `Pages ${ps.slice(0, -1).join(', ')} and ${ps[ps.length - 1]} have`

  // 3. text layer
  if (isPdf) {
    const allEmpty = ex.emptyPages.length >= ex.readPages && ex.readPages > 0
    c.push({
      id: 'text',
      label: 'Selectable text',
      status: allEmpty ? 'fail' : ex.emptyPages.length ? 'warn' : 'pass',
      detail: allEmpty
        ? 'No text layer: this PDF is a picture of a resume (a scan or an image export). A parser reads nothing, unless it runs OCR.'
        : ex.emptyPages.length
          ? `${pagesWord(ex.emptyPages)} almost no text a parser can read.`
          : `${chars.toLocaleString('en-IN')} characters of real text on ${plural(ex.readPages || 1, 'page')}${scope}.`,
      fix:
        allEmpty || ex.emptyPages.length
          ? 'Download the resume again as a PDF from Word or Google Docs (File → Download → PDF), not a scan or a photo of the page.'
          : undefined,
      sources: ['lever', 'recruiterflow', 'rchilli', 'affinda'],
    })
    if (allEmpty) return c
  }

  // 4. odd characters (icon fonts, broken encodings, ligatures)
  const odd = ex.privateUse + ex.replacement + ex.symbols
  const lig = ex.ligatures
  c.push({
    id: 'glyphs',
    label: 'Characters a parser can read',
    status: odd === 0 && lig === 0 ? 'pass' : odd > 6 ? 'fail' : 'warn',
    detail:
      odd === 0 && lig === 0
        ? 'No icon-font, ligature or unreadable characters found (list bullets are ignored).'
        : [
            odd
              ? `${plural(odd, 'character')} read as icons or unknown symbols (${[
                  ex.privateUse && `${ex.privateUse} from an icon font`,
                  ex.symbols && `${ex.symbols} Symbol/Wingdings`,
                  ex.replacement && `${ex.replacement} unreadable`,
                ]
                  .filter(Boolean)
                  .join(', ')}). A phone or email icon becomes junk text next to your details.`
              : '',
            lig
              ? `${plural(lig, 'joined letter pair')} (like “ﬁ” in “certiﬁed”): a search for “certified” may not match.`
              : '',
          ]
            .filter(Boolean)
            .join(' '),
    fix:
      odd || lig
        ? [
            odd && 'Replace icons with words: “Email:”, “Phone:”, “LinkedIn:”.',
            lig && 'Turn off ligatures in your design tool or export from Word/Google Docs.',
          ]
            .filter(Boolean)
            .join(' ')
        : undefined,
    sources: ['mit', 'hiringthing', 'rchilli'],
  })

  // 5. contact details in the body text
  const bodyContact = contactFound(body)
  const hfOnly = isDocx ? ex.headerFooter.contact.filter((x) => !bodyContact.includes(x)) : []
  const boxOnly = isDocx
    ? contactFound(ex.textBoxes.text).filter((x) => !bodyContact.includes(x))
    : []
  const missing = ['email', 'phone'].filter((x) => !bodyContact.includes(x))
  c.push({
    id: 'contact',
    label: 'Email and phone in the main text',
    status: missing.length === 0 ? 'pass' : missing.length === 2 ? 'fail' : 'warn',
    detail:
      missing.length === 0
        ? 'Both found in the body text.'
        : `Not found in the body text: ${missing.join(' and ')}.${
            hfOnly.length
              ? ` Your ${hfOnly.join(' and ')} ${hfOnly.length > 1 ? 'sit' : 'sits'} in the Word header or footer.`
              : ''
          }${boxOnly.length ? ` Your ${boxOnly.join(' and ')} ${boxOnly.length > 1 ? 'sit' : 'sits'} in a text box.` : ''}`,
    fix: missing.length
      ? 'Put name, email and phone as normal lines at the top of the page, not in the Word header, a text box or an image.'
      : undefined,
    sources: ['greenhouseParse', 'talview'],
  })

  // 6. header / footer (docx only)
  if (isDocx) {
    const hf = ex.headerFooter.text.trim()
    c.push({
      id: 'header',
      label: 'Nothing important in the header or footer',
      status: !hf ? 'pass' : hfOnly.length ? 'fail' : 'warn',
      detail: !hf
        ? 'The Word header and footer are empty.'
        : `The header/footer holds: “${hf.slice(0, 90)}${hf.length > 90 ? '…' : ''}”.${
            hfOnly.length
              ? ' Greenhouse lists contact details there as a cause of failed parses.'
              : ex.headerFooter.contact.length
                ? ' Your contact details are also in the body, so a parser still finds them; the header copy is harmless but can go.'
                : ''
          }`,
      fix: hf ? 'Move that text into the first lines of the page body.' : undefined,
      sources: ['greenhouseParse', 'talview', 'buffalo'],
    })
  } else {
    c.push({
      id: 'header',
      label: 'Nothing important in the header or footer',
      status: 'na',
      detail:
        'A PDF has no separate header, so this cannot be told from the PDF. If you made it in Word, check that your name and contact lines are not in Insert → Header.',
      sources: ['greenhouseParse'],
    })
  }

  // 7. columns
  if (isPdf) {
    const cp = ex.columnPages
    c.push({
      id: 'columns',
      label: 'One column',
      status: cp.length ? 'fail' : 'pass',
      detail: cp.length
        ? `Two columns found on ${cp.length === 1 ? 'page' : 'pages'} ${cp.map((p) => p.page).join(', ')} (split at about ${Math.round(cp[0].at * 100)}% of the page width). Read across the page, lines from the two columns run together; see “Line by line across the page” below.`
        : `Text runs in one column${scope}, so reading across the page keeps your lines in order.`,
      fix: cp.length
        ? 'Move the sidebar (skills, contact, education) into full-width sections above or below your experience.'
        : undefined,
      sources: ['greenhouseParse', 'talview', 'workday', 'mit'],
    })
  } else {
    const layoutTable = ex.tables > 0
    const allCols = ex.docxColumnSections > 0 && ex.docxColumnSections >= ex.docxSections
    c.push({
      id: 'columns',
      label: 'One column',
      status: allCols ? 'fail' : ex.docxColumnSections ? 'warn' : 'pass',
      detail:
        ex.docxColumnSections > 0
          ? allCols
            ? `Word’s Columns setting is on for the whole document (${ex.docxColumns} columns).`
            : `Word’s Columns setting is on in ${plural(ex.docxColumnSections, 'section')} of ${ex.docxSections} (often a skills list). A .docx keeps its text in order, but a PDF made from it may not.`
          : layoutTable
            ? 'No Word columns setting. (A table can still make a two-column look; see the table check.)'
            : 'No Word columns setting.',
      fix: ex.docxColumnSections ? 'Click in that section → Layout → Columns → One.' : undefined,
      sources: ['greenhouseParse', 'talview', 'mit'],
    })
  }

  // 8. tables
  const tableHeads = isDocx ? headingsFound(ex.tableText.split('\n')) : []
  const layoutTableFound = tableHeads.includes('Experience') || tableHeads.length >= 2
  c.push(
    isDocx
      ? {
          id: 'tables',
          label: 'No tables',
          status: ex.tables === 0 ? 'pass' : layoutTableFound ? 'fail' : 'warn',
          detail:
            ex.tables === 0
              ? 'No tables.'
              : layoutTableFound
                ? `${plural(ex.tables, 'table')}, used for the page layout (it holds your ${tableHeads.slice(0, -1).join(', ')}${tableHeads.length > 1 ? ' and ' : ''}${tableHeads[tableHeads.length - 1]} ${tableHeads.length > 1 ? 'sections' : 'section'}). Greenhouse, Talview, MIT and Buffalo all name tables as a parsing problem: a parser reads one cell after another, so sections can lose their headings.`
                : `${plural(ex.tables, 'table')} (a small one, not your main sections). Greenhouse, Talview, MIT and Buffalo all name tables as a parsing problem; a small one is lower risk, but plain lines are safer.`,
          fix: ex.tables
            ? 'Select the table → Table Layout → Convert to Text, then rebuild as plain sections.'
            : undefined,
          sources: ['greenhouseParse', 'talview', 'mit', 'buffalo'],
        }
      : {
          id: 'tables',
          label: 'No tables',
          status: 'na',
          detail:
            'A PDF does not mark tables, so this cannot be told for sure. If your source file used a table for layout, the column check above usually catches it.',
          sources: ['greenhouseParse'],
        }
  )

  // 9. text boxes
  c.push(
    isDocx
      ? {
          id: 'boxes',
          label: 'No text boxes',
          status: ex.textBoxes.count === 0 ? 'pass' : 'fail',
          detail:
            ex.textBoxes.count === 0
              ? 'No text boxes.'
              : `${plural(ex.textBoxes.count, 'text box', 'text boxes')} holding “${ex.textBoxes.text.slice(0, 80)}${ex.textBoxes.text.length > 80 ? '…' : ''}”. Many parsers skip text boxes.`,
          fix: ex.textBoxes.count
            ? 'Cut the text out of the box and paste it as a normal paragraph.'
            : undefined,
          sources: ['greenhouseParse', 'talview', 'mit'],
        }
      : {
          id: 'boxes',
          label: 'No text boxes',
          status: 'na',
          detail: 'A PDF does not mark text boxes; check your source file.',
          sources: ['mit'],
        }
  )

  // 10. images / graphics
  c.push({
    id: 'images',
    label: 'No photos or graphics',
    status: ex.images === 0 ? 'pass' : ex.images <= 2 ? 'warn' : 'fail',
    detail:
      ex.images === 0
        ? 'No images found.'
        : `${plural(ex.images, 'image')} found${scope} (photo, logo, icon or skill bar). Text inside an image is invisible to a parser.`,
    fix: ex.images
      ? 'Remove the photo and skill-level bars; write skills as words. Keep a photo only if the job post asks for one.'
      : undefined,
    sources: ['greenhouseParse', 'workday', 'mit', 'hiringthing'],
  })

  // 11. headings
  const heads = headingsFound([...ex.lines.map((l) => l.text), ...ex.streamText.split('\n')])
  const core = ['Experience', 'Education', 'Skills']
  const missingCore = core.filter((h) => !heads.includes(h))
  c.push({
    id: 'headings',
    label: 'Standard section headings',
    status: missingCore.length === 0 ? 'pass' : missingCore.length === 1 ? 'warn' : 'fail',
    detail:
      missingCore.length === 0
        ? `Found: ${heads.join(', ')}.`
        : `Not found as a heading line: ${missingCore.join(', ')}.${heads.length ? ` Found: ${heads.join(', ')}.` : ''}`,
    fix: missingCore.length
      ? 'Use plain headings: “Experience”, “Education”, “Skills”. Creative ones (“Where I’ve been”) may not be filed correctly.'
      : undefined,
    sources: ['workday'],
  })

  // 12. pages
  if (ex.pages !== null)
    c.push({
      id: 'pages',
      label: 'Length',
      status: ex.pages <= 2 ? 'pass' : 'warn',
      detail: `${plural(ex.pages, 'page')}.${ex.pages > 2 ? ' A parser reads every page, but a recruiter skims. Two pages or fewer is easier to read.' : ''}`,
      fix: ex.pages > 2 ? 'Cut older roles to one line each.' : undefined,
      sources: [],
    })

  return c
}

export function summary(checks: Check[]) {
  const scored = checks.filter((c) => c.status !== 'na')
  return {
    pass: scored.filter((c) => c.status === 'pass').length,
    warn: scored.filter((c) => c.status === 'warn').length,
    fail: scored.filter((c) => c.status === 'fail').length,
    total: scored.length,
  }
}

/**
 * On two-column pages, how often reading line by line jumps between the columns:
 * every change of side (left → right → left) or a line that holds both.
 */
export function columnJumps(ex: Extracted, page?: number): { jumps: number; lines: number } {
  let jumps = 0
  let lines = 0
  for (const cp of ex.columnPages.filter((x) => page === undefined || x.page === page)) {
    const ls = ex.lines.filter((l) => l.page === cp.page)
    lines += ls.length
    let prev: string | undefined
    for (const l of ls) {
      if (l.side === 'B') jumps++
      else if (prev && l.side !== prev) jumps++
      prev = l.side === 'B' ? undefined : l.side
    }
  }
  return { jumps, lines }
}

/**
 * A preview of the profile fields a parser would try to fill, from the same text and the same
 * patterns the checks use. Real parsers are smarter; a field missing here is still a warning sign.
 */
export function parsedFields(ex: Extracted) {
  const lines = ex.streamText
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
  const nameLine = lines
    .slice(0, 3)
    .find(
      (l) =>
        l.split(/\s+/).length >= 2 &&
        l.split(/\s+/).length <= 4 &&
        /^[\p{L}][\p{L}.'’ -]+$/u.test(l) &&
        !/^(resume|curriculum vitae|cv)$/i.test(l) &&
        headingsFound([l]).length === 0
    )
  const email = ex.streamText.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/)?.[0] ?? null
  const phoneLine = ex.streamText
    .split('\n')
    .map((l) => l.match(/(\+?\d[\d \t().\-‑–]{8,}\d)/g) ?? [])
    .flat()
    .find((m) => {
      const d = m.replace(/\D/g, '')
      return d.length >= 10 && d.length <= 15 && !/(19|20)\d{2}\s*[-–]\s*(19|20)\d{2}/.test(m)
    })
  const linkedin = ex.streamText.match(/linkedin\.com\/in\/[A-Za-z0-9_%-]+/i)?.[0] ?? null
  const sections = headingsFound([...ex.lines.map((l) => l.text), ...lines])
  return {
    name: nameLine ?? null,
    email,
    phone: phoneLine?.trim() ?? null,
    linkedin,
    sections,
  }
}
