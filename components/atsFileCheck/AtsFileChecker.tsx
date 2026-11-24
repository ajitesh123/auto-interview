'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  blank,
  extractDocx,
  extractPdf,
  kindOf,
  type Extracted,
  type PdfJs,
  type ZipLib,
} from '@/data/atsFileCheck/extract'
import {
  columnJumps,
  parsedFields,
  runChecks,
  summary,
  type Check,
  type Status,
} from '@/data/atsFileCheck/checks'
import { SOURCES } from '@/data/atsFileCheck/sources'

/* pdf.js is served from our own domain (public/vendor), never bundled and never a CDN, so the file
   you drop is read by code on this page only. Nothing is uploaded. */
const PDFJS = '/vendor/pdfjs-4.10.38/'
type PdfJsModule = PdfJs & { GlobalWorkerOptions: { workerSrc: string } }
// the slice of pdf.js used to draw page 1
type PdfRender = {
  getDocument: (src: {
    data: Uint8Array
    cMapUrl?: string
    cMapPacked?: boolean
    standardFontDataUrl?: string
    isEvalSupported?: boolean
  }) => {
    promise: Promise<{
      getPage: (n: number) => Promise<{
        getViewport: (o: { scale: number }) => { width: number; height: number }
        render: (o: { canvasContext: CanvasRenderingContext2D; viewport: unknown }) => {
          promise: Promise<void>
        }
      }>
      destroy: () => Promise<void>
    }>
  }
}
let pdfjsPromise: Promise<PdfJsModule> | null = null
function loadPdfJs(): Promise<PdfJsModule> {
  if (!pdfjsPromise) {
    const url = `${PDFJS}pdf.min.mjs`
    pdfjsPromise = import(/* webpackIgnore: true */ url).then((m: PdfJsModule) => {
      m.GlobalWorkerOptions.workerSrc = `${PDFJS}pdf.worker.min.mjs`
      return m
    })
  }
  return pdfjsPromise
}
const ASSETS = { cMapUrl: `${PDFJS}cmaps/`, standardFontDataUrl: `${PDFJS}standard_fonts/` }

const KC_KEY = 'aiai.keywordChecker.v1'
const MAX_BYTES = 25 * 1024 * 1024

const kicker = 'font-mono text-kicker uppercase tracking-[0.08em]'
const btn2 =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-surface px-4 text-small font-semibold text-fg ring-1 ring-inset ring-border-strong transition-colors duration-fast hover:bg-muted disabled:opacity-50'
const link =
  'font-medium text-signal-strong underline decoration-signal/30 underline-offset-2 hover:decoration-signal'

const STATUS: Record<Status, { label: string; cls: string; icon: string }> = {
  pass: { label: 'Pass', cls: 'bg-success-soft text-success-strong', icon: 'M3.5 8.5l3 3 6-7' },
  warn: { label: 'Check', cls: 'bg-warn-soft text-warn', icon: 'M8 4v5M8 11.5v.5' },
  fail: { label: 'Fix', cls: 'bg-danger-soft text-danger', icon: 'M4.5 4.5l7 7M11.5 4.5l-7 7' },
  na: { label: 'Can’t tell', cls: 'bg-muted text-fg-3', icon: 'M5 8h6' },
}

export const SAMPLE_FILES = [
  { file: 'single-column.pdf', label: 'One column (PDF)' },
  { file: 'two-column.pdf', label: 'Two columns (PDF)' },
  { file: 'table-and-header.docx', label: 'Table + header (Word)' },
]

type Result = { ex: Extracted; checks: Check[]; data: Uint8Array | null }
type View = 'rows' | 'stream' | 'hf' | 'boxes'

function Chip({ s }: { s: Status }) {
  const st = STATUS[s]
  return (
    <span
      className={`mt-0.5 inline-flex h-6 shrink-0 items-center gap-1 rounded-full px-2 text-caption font-semibold ${st.cls}`}
    >
      <svg
        viewBox="0 0 16 16"
        className="h-3 w-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <path d={st.icon} />
      </svg>
      {st.label}
    </span>
  )
}

function Fields({ ex }: { ex: Extracted }) {
  const f = parsedFields(ex)
  const rows: [string, string | null][] = [
    ['Name', f.name],
    ['Email', f.email],
    ['Phone', f.phone],
    ['LinkedIn', f.linkedin],
    ['Sections', f.sections.length ? f.sections.join(', ') : null],
  ]
  return (
    <div className="rounded-xl border border-border bg-surface p-4 md:p-5">
      <div className={`${kicker} text-fg-3`}>What a parser would try to fill in</div>
      <dl className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-5">
        {rows.map(([k, v]) => (
          <div key={k} className="min-w-0">
            <dt className="text-caption text-fg-3">{k}</dt>
            <dd
              className={`truncate text-small font-semibold ${v ? 'text-fg' : 'text-danger'}`}
              title={v ?? undefined}
            >
              {v ?? 'Not found'}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-caption text-fg-3">
        Our simple reading of the text above. Real systems differ; after you upload to a portal,
        check the fields it filled in and correct them.
      </p>
    </div>
  )
}

export default function AtsFileChecker() {
  const [phase, setPhase] = useState<'idle' | 'reading' | 'done'>('idle')
  const [note, setNote] = useState('')
  const [drag, setDrag] = useState(false)
  const [res, setRes] = useState<Result | null>(null)
  const [view, setView] = useState<View>('rows')
  const [copied, setCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  const read = useCallback(async (data: Uint8Array, name: string) => {
    setPhase('reading')
    setNote(`Reading ${name}…`)
    setRes(null)
    try {
      const kind = kindOf(name, data)
      let ex: Extracted
      if (kind === 'pdf') ex = await extractPdf(data, name, await loadPdfJs(), ASSETS)
      else if (kind === 'docx') {
        const JSZip = (await import('jszip')).default as unknown as ZipLib
        ex = await extractDocx(data, name, JSZip)
      } else ex = blank(kind, name, data.byteLength)
      const checks = runChecks(ex)
      setRes({ ex, checks, data: kind === 'pdf' ? data : null })
      setView(ex.kind === 'pdf' ? (ex.columnPages.length ? 'rows' : 'stream') : 'stream')
      const s = summary(checks)
      setNote(ex.error ?? `${name}: ${s.pass} pass, ${s.warn} to check, ${s.fail} to fix.`)
      setPhase('done')
      window.requestAnimationFrame(() =>
        resultRef.current?.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
            ? 'auto'
            : 'smooth',
          block: 'start',
        })
      )
    } catch {
      setNote('Something went wrong reading that file. Try exporting it again as PDF or .docx.')
      setPhase('idle')
    }
  }, [])

  const onFile = useCallback(
    async (f: File | undefined | null) => {
      if (!f) return
      if (f.size > MAX_BYTES) {
        const head = new Uint8Array(await f.slice(0, 8).arrayBuffer())
        const ex = blank(kindOf(f.name, head), f.name, f.size)
        ex.error = 'Too big to read here.'
        setRes({ ex, checks: runChecks(ex), data: null })
        setNote(`${f.name} is ${(f.size / 1024 / 1024).toFixed(1)} MB, too big to read here.`)
        setPhase('done')
        return
      }
      const buf = new Uint8Array(await f.arrayBuffer())
      await read(buf, f.name)
    },
    [read]
  )

  const loadSample = useCallback(
    async (file: string) => {
      try {
        const r = await fetch(`/samples/ats-check/${file}`)
        if (!r.ok) throw new Error()
        await read(new Uint8Array(await r.arrayBuffer()), file)
      } catch {
        setNote('Could not load the sample. Check your connection and try again.')
      }
    },
    [read]
  )

  // page 1 preview with the column split drawn on top
  useEffect(() => {
    const data = res?.data
    const canvas = canvasRef.current
    if (!data || !canvas || phase !== 'done') return
    let cancelled = false
    ;(async () => {
      try {
        const pdfjs = (await loadPdfJs()) as unknown as PdfRender
        const doc = await pdfjs.getDocument({
          data: data.slice(),
          isEvalSupported: false,
          ...ASSETS,
          cMapPacked: true,
        }).promise
        const page = await doc.getPage(1)
        const base = page.getViewport({ scale: 1 })
        const scale = (canvas.parentElement?.clientWidth ?? 320) / base.width
        const dpr = Math.min(window.devicePixelRatio || 1, 2)
        const vp = page.getViewport({ scale: scale * dpr })
        if (cancelled) return
        canvas.width = vp.width
        canvas.height = vp.height
        canvas.style.width = `${vp.width / dpr}px`
        canvas.style.height = `${vp.height / dpr}px`
        const ctx = canvas.getContext('2d')
        if (ctx) await page.render({ canvasContext: ctx, viewport: vp }).promise
        await doc.destroy()
      } catch {
        /* preview is optional */
      }
    })()
    return () => {
      cancelled = true
    }
  }, [res, phase])

  const ex = res?.ex
  const checks = res?.checks ?? []
  const s = summary(checks)
  const jumps = ex ? columnJumps(ex, 1) : { jumps: 0, lines: 0 }
  const split = ex?.columnPages.find((c) => c.page === 1)
  const isPdf = ex?.kind === 'pdf'
  const isDocx = ex?.kind === 'docx'
  const readable =
    !!ex && !ex.error && !ex.password && (isPdf || isDocx) && ex.streamText.trim().length > 0

  const views: { id: View; label: string; show: boolean }[] = [
    { id: 'rows', label: 'Line by line across the page', show: !!isPdf },
    { id: 'stream', label: isPdf ? 'In file order' : 'Body text', show: true },
    { id: 'hf', label: 'Header & footer', show: !!isDocx },
    {
      id: 'boxes',
      label: `Text boxes (${ex?.textBoxes.count ?? 0})`,
      show: !!isDocx && (ex?.textBoxes.count ?? 0) > 0,
    },
  ]
  const shown =
    view === 'rows'
      ? (ex?.rowText ?? '')
      : view === 'hf'
        ? (ex?.headerFooter.text ?? '')
        : view === 'boxes'
          ? (ex?.textBoxes.text ?? '')
          : (ex?.streamText ?? '')

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shown)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard blocked */
    }
  }

  const sendToKeywordChecker = () => {
    try {
      const prev = JSON.parse(window.localStorage.getItem(KC_KEY) || '{}')
      window.localStorage.setItem(
        KC_KEY,
        JSON.stringify({
          jd: typeof prev.jd === 'string' ? prev.jd : '',
          resume: ex?.streamText ?? '',
        })
      )
    } catch {
      /* storage blocked: the checker opens empty */
    }
  }

  return (
    <div className="space-y-8">
      {/* ---------- Drop zone ---------- */}
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDrag(true)
        }}
        onDragLeave={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setDrag(false)
        }}
        onDrop={(e) => {
          e.preventDefault()
          setDrag(false)
          onFile(e.dataTransfer.files?.[0])
        }}
        className={`ats-drop relative overflow-hidden rounded-2xl border-2 border-dashed p-6 text-center transition-colors duration-fast md:p-10 ${
          drag ? 'border-signal bg-signal-tint' : 'border-border-strong bg-surface'
        }`}
      >
        <div
          aria-hidden="true"
          className="mx-auto flex h-14 w-11 flex-col gap-1.5 rounded-md border border-border-strong bg-bg p-2"
        >
          <span className="ats-doc-line h-1 w-full rounded-full bg-fg-3/40" />
          <span className="ats-doc-line h-1 w-4/5 rounded-full bg-fg-3/40" />
          <span className="ats-doc-line h-1 w-full rounded-full bg-signal/50" />
          <span className="ats-doc-line h-1 w-3/5 rounded-full bg-fg-3/40" />
        </div>
        <p className="mt-4 text-body-lg font-semibold text-fg">Drop your resume here</p>
        <p className="mt-1 text-small text-fg-2">
          PDF or Word (.docx). It is read inside this browser tab and never uploaded.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={phase === 'reading'}
            className="inline-flex min-h-12 items-center rounded-full bg-signal px-6 text-small font-semibold text-white transition-colors duration-fast hover:bg-signal-strong disabled:opacity-60"
          >
            {phase === 'reading' ? 'Reading…' : 'Choose a file'}
          </button>
          <input
            ref={inputRef}
            id="ats-file"
            type="file"
            accept=".pdf,.docx,.doc,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="sr-only"
            tabIndex={-1}
            aria-label="Choose your resume file (PDF or .docx)"
            onChange={(e) => {
              onFile(e.target.files?.[0])
              e.target.value = ''
            }}
          />
        </div>
        <div
          className="mt-6 flex flex-wrap items-center justify-center gap-2 text-small"
          role="group"
          aria-label="Try a sample resume"
        >
          <span className="text-fg-3">No file handy? Try a fictional sample:</span>
          {SAMPLE_FILES.map((x) => (
            <button
              key={x.file}
              type="button"
              className={btn2}
              disabled={phase === 'reading'}
              onClick={() => loadSample(x.file)}
            >
              {x.label}
            </button>
          ))}
        </div>
      </div>

      <p aria-live="polite" className="min-h-[1.5rem] text-small text-fg-2">
        {note}
      </p>

      {/* ---------- Results ---------- */}
      {phase === 'done' && ex && (
        <div ref={resultRef} className="kc-in scroll-mt-32 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-surface px-5 py-4">
            <div className="min-w-0">
              <div className={`${kicker} text-fg-3`}>
                {ex.kind === 'pdf'
                  ? 'PDF'
                  : ex.kind === 'docx'
                    ? 'Word .docx'
                    : ex.kind.toUpperCase()}
                {ex.pages ? ` · ${ex.pages} page${ex.pages === 1 ? '' : 's'}` : ''}
              </div>
              <div className="mt-1 truncate text-body font-semibold text-fg">{ex.fileName}</div>
            </div>
            <div className="flex flex-wrap gap-2 text-small font-semibold tabular-nums">
              <span className="rounded-full bg-success-soft px-3 py-1 text-success-strong">
                {s.pass} pass
              </span>
              <span className="rounded-full bg-warn-soft px-3 py-1 text-warn">{s.warn} check</span>
              <span className="rounded-full bg-danger-soft px-3 py-1 text-danger">
                {s.fail} fix
              </span>
            </div>
          </div>

          {readable && <Fields ex={ex} />}

          <div className="grid gap-6 lg:grid-cols-12">
            {/* preview / structure */}
            <div className="min-w-0 lg:col-span-5">
              {isPdf && readable ? (
                <figure className="rounded-xl border border-border bg-surface p-3">
                  <div className="relative overflow-hidden rounded-md bg-bg ring-1 ring-border">
                    <canvas
                      ref={canvasRef}
                      className="block w-full"
                      aria-label="Page 1 of your resume"
                      role="img"
                    />
                    {split && (
                      <span
                        aria-hidden="true"
                        className="ats-split pointer-events-none absolute inset-y-0 w-0 border-l-2 border-dashed border-danger"
                        style={{ left: `${(split.at * 100).toFixed(1)}%` }}
                      />
                    )}
                    <span
                      aria-hidden="true"
                      className="ats-scan pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-signal"
                    />
                  </div>
                  <figcaption className="mt-3 text-caption text-fg-2">
                    {split
                      ? `Page 1. The dashed line is the column split we found. Reading across the page, the parser jumps between the two columns ${jumps.jumps} times in ${jumps.lines} lines.`
                      : 'Page 1, as drawn from your file. No column split found.'}
                  </figcaption>
                </figure>
              ) : isDocx && readable ? (
                <div className="rounded-xl border border-border bg-surface p-4">
                  <div className={`${kicker} text-fg-3`}>Inside your Word file</div>
                  <ul className="mt-3 space-y-2 text-small">
                    {[
                      {
                        k: 'Header & footer',
                        v: ex.headerFooter.text.trim() ? 'has text' : 'empty',
                        bad: !!ex.headerFooter.text.trim(),
                      },
                      { k: 'Tables', v: String(ex.tables), bad: ex.tables > 0 },
                      {
                        k: 'Text boxes',
                        v: String(ex.textBoxes.count),
                        bad: ex.textBoxes.count > 0,
                      },
                      { k: 'Word columns', v: String(ex.docxColumns), bad: ex.docxColumns > 1 },
                      { k: 'Images', v: String(ex.images), bad: ex.images > 0 },
                      { k: 'Symbol icons', v: String(ex.symbols), bad: ex.symbols > 0 },
                    ].map((r) => (
                      <li
                        key={r.k}
                        className="flex items-center justify-between gap-3 rounded-lg bg-bg px-3 py-2 ring-1 ring-inset ring-border"
                      >
                        <span className="text-fg-2">{r.k}</span>
                        <span
                          className={`font-semibold tabular-nums ${r.bad ? 'text-danger' : 'text-fg'}`}
                        >
                          {r.v}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="rounded-xl border border-border bg-surface p-5 text-small text-fg-2">
                  {ex.password
                    ? 'This PDF is password-protected, so nothing inside can be read.'
                    : (ex.error ?? 'There is no text here a parser can read.')}
                </div>
              )}
            </div>

            {/* checks */}
            <div className="min-w-0 lg:col-span-7">
              <ul className="divide-y divide-border rounded-xl border border-border bg-surface px-4">
                {checks.map((c) => (
                  <li key={c.id} className="flex gap-3 py-3">
                    <Chip s={c.status} />
                    <div className="min-w-0">
                      <div className="text-small font-semibold text-fg">{c.label}</div>
                      <p className="mt-0.5 break-words text-small text-fg-2">{c.detail}</p>
                      {c.fix && (
                        <p className="mt-1 text-small text-fg">
                          <span className="font-semibold">Fix: </span>
                          {c.fix}
                        </p>
                      )}
                      {c.sources.length > 0 && (
                        <p className="mt-1 text-caption text-fg-3">
                          Source:{' '}
                          {c.sources.map((k, i) => (
                            <span key={k}>
                              {i > 0 && ', '}
                              <a
                                href={SOURCES[k].url}
                                target="_blank"
                                rel="noopener"
                                className="underline decoration-border-strong underline-offset-2 hover:text-fg"
                              >
                                {SOURCES[k].org}
                              </a>
                            </span>
                          ))}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {readable && (
            <div className="rounded-xl border border-border bg-surface">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
                <div
                  role="tablist"
                  aria-label="What the parser reads"
                  className="flex flex-wrap gap-1"
                >
                  {views
                    .filter((v) => v.show)
                    .map((v) => (
                      <button
                        key={v.id}
                        id={`ats-tab-${v.id}`}
                        role="tab"
                        type="button"
                        aria-selected={view === v.id}
                        aria-controls="ats-panel"
                        tabIndex={view === v.id ? 0 : -1}
                        onClick={() => setView(v.id)}
                        onKeyDown={(e) => {
                          const ids = views.filter((x) => x.show).map((x) => x.id)
                          const i = ids.indexOf(v.id)
                          const next =
                            e.key === 'ArrowRight'
                              ? ids[(i + 1) % ids.length]
                              : e.key === 'ArrowLeft'
                                ? ids[(i - 1 + ids.length) % ids.length]
                                : null
                          if (next) {
                            e.preventDefault()
                            setView(next)
                            document.getElementById(`ats-tab-${next}`)?.focus()
                          }
                        }}
                        className={`min-h-11 rounded-full px-3 text-small font-medium transition-colors duration-fast ${
                          view === v.id
                            ? 'bg-signal-tint text-signal-ink'
                            : 'text-fg-2 hover:bg-muted'
                        }`}
                      >
                        {v.label}
                      </button>
                    ))}
                </div>
                <button type="button" className={btn2} onClick={copy}>
                  <span aria-live="polite">{copied ? 'Copied' : 'Copy text'}</span>
                </button>
              </div>
              <div
                id="ats-panel"
                role="tabpanel"
                aria-labelledby={`ats-tab-${view}`}
                tabIndex={0}
                className="max-h-[28rem] overflow-auto px-4 py-3"
              >
                {view === 'rows' && split ? (
                  <ol className="space-y-0.5 font-mono text-caption leading-relaxed">
                    {ex.lines
                      .filter((l) => l.page === 1)
                      .map((l, i) => (
                        <li
                          key={i}
                          className={`ats-line flex gap-3 rounded px-1 ${l.side === 'B' ? 'bg-warn-soft' : ''}`}
                          style={{ animationDelay: `${Math.min(i, 30) * 35}ms` }}
                        >
                          <span
                            className={`w-8 shrink-0 text-right ${l.side === 'R' ? 'text-signal' : 'text-fg-3'}`}
                          >
                            <span aria-hidden="true">
                              {l.side === 'R' ? 'R' : l.side === 'L' ? 'L' : 'L+R'}
                            </span>
                            <span className="sr-only">
                              {l.side === 'R'
                                ? 'right column:'
                                : l.side === 'L'
                                  ? 'left column:'
                                  : 'both columns:'}
                            </span>
                          </span>
                          <span
                            className={`whitespace-pre-wrap break-words ${l.side === 'R' ? 'text-signal-ink' : 'text-fg'}`}
                          >
                            {l.text}
                          </span>
                        </li>
                      ))}
                  </ol>
                ) : (
                  <pre className="whitespace-pre-wrap break-words font-mono text-caption leading-relaxed text-fg">
                    {shown.trim() || 'Nothing here.'}
                  </pre>
                )}
              </div>
              <p className="border-t border-border px-4 py-3 text-caption text-fg-3">
                {view === 'rows'
                  ? 'Some parsers read straight across the page. L = left column, R = right column, highlighted = both on one line.'
                  : view === 'stream'
                    ? 'The text in the order your file stores it. If this reads like your resume, top to bottom, a parser can follow it.'
                    : view === 'hf'
                      ? 'Text in the Word header and footer. Greenhouse lists contact details here as a reason parses fail.'
                      : 'Text inside text boxes. Many parsers skip it.'}
              </p>
            </div>
          )}

          {readable && (
            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href="/resume-keyword-checker"
                onClick={sendToKeywordChecker}
                className="rounded-xl border border-border bg-surface px-5 py-4 transition-[border-color,box-shadow] duration-fast hover:border-border-strong hover:shadow-e2"
              >
                <span className={`block ${kicker} text-signal-strong`}>Next · keywords</span>
                <span className="mt-1 block text-h4 font-semibold text-fg">
                  Check this text against a job post
                </span>
                <span className="mt-1 block text-small text-fg-2">
                  Opens the keyword checker with this text already in it (saved on this device
                  only).
                </span>
              </Link>
              <button
                type="button"
                onClick={() => {
                  setRes(null)
                  setPhase('idle')
                  setNote('')
                  inputRef.current?.click()
                }}
                className="rounded-xl border border-border bg-surface px-5 py-4 text-left transition-[border-color,box-shadow] duration-fast hover:border-border-strong hover:shadow-e2"
              >
                <span className={`block ${kicker} text-fg-3`}>Fixed something?</span>
                <span className="mt-1 block text-h4 font-semibold text-fg">
                  Check the new version
                </span>
                <span className="mt-1 block text-small text-fg-2">
                  Export again from Word or Google Docs and drop it in.
                </span>
              </button>
            </div>
          )}
          {!readable && ex.kind === 'doc' && (
            <p className="text-small text-fg-2">
              Open the .doc in Word or Google Docs, use <strong>File → Download → .docx</strong> or{' '}
              <strong>PDF</strong>, and check that file.{' '}
              <a href="#how-to-fix" className={link}>
                How to fix each problem
              </a>
            </p>
          )}
        </div>
      )}
    </div>
  )
}
