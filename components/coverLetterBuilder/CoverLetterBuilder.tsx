'use client'

// Free cover letter builder. Plain rules in the browser: no AI, no account, nothing is sent
// anywhere. Drafts are saved on this device only (localStorage).

import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import {
  assemble,
  BLANK,
  CHANNELS,
  check,
  type Channel,
  type Draft,
  PARTS,
  type Stage,
  STAGES,
  type Status,
  words,
} from '@/data/coverLetterBuilder/engine'
import { SAMPLES } from '@/data/coverLetterBuilder/samples'

const KEY = 'aia.coverLetterBuilder.v1'
const kicker = 'font-mono text-kicker uppercase tracking-[0.08em]'
const field =
  'mt-1.5 w-full rounded-lg border border-border-input bg-surface px-3 text-body text-fg md:text-small placeholder:text-fg-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-strong'
const btn2 =
  'inline-flex h-11 items-center justify-center gap-2 rounded-full bg-surface px-4 text-small font-semibold text-fg ring-1 ring-inset ring-border-strong transition-colors duration-fast hover:bg-muted disabled:opacity-50'
const btn1 =
  'inline-flex h-11 items-center justify-center gap-2 rounded-full bg-signal px-5 text-small font-semibold text-white transition-colors duration-fast hover:bg-signal-strong'
const pill = (on: boolean) =>
  `inline-flex min-h-11 items-center rounded-full px-4 text-small font-medium ring-1 ring-inset transition-colors duration-fast has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-signal-strong ${
    on
      ? 'bg-signal-tint text-signal-ink ring-signal/40'
      : 'bg-surface text-fg-2 ring-border-strong hover:bg-muted'
  }`

const STATUS: Record<Status, { label: string; cls: string }> = {
  pass: { label: 'Pass', cls: 'bg-success-soft text-success-strong' },
  warn: { label: 'Fix', cls: 'bg-warn-soft text-warn' },
  fail: { label: 'Fix first', cls: 'bg-danger-soft text-danger' },
}

const TEXT_KEYS: (keyof Draft)[] = [
  'name',
  'contact',
  'role',
  'company',
  'manager',
  'hook',
  'proof',
  'proof2',
  'fit',
  'close',
]

function normalise(v: unknown): Draft {
  const d = (v && typeof v === 'object' ? v : {}) as Record<string, unknown>
  const out: Draft = { ...BLANK }
  for (const k of TEXT_KEYS) {
    const x = d[k]
    ;(out as unknown as Record<string, string>)[k] = typeof x === 'string' ? x.slice(0, 4000) : ''
  }
  out.stage = STAGES.some((s) => s.id === d.stage) ? (d.stage as Stage) : 'fresher'
  out.channel = CHANNELS.some((c) => c.id === d.channel) ? (d.channel as Channel) : 'email'
  return out
}

const hasText = (d: Draft) =>
  [d.hook, d.proof, d.proof2, d.fit, d.close].some((x) => x.trim().length > 0)

function Field({
  id,
  label,
  hint,
  value,
  onChange,
  placeholder,
}: {
  id: string
  label: string
  hint?: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="text-small font-medium text-fg">
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        aria-describedby={hint ? `${id}-h` : undefined}
        className={`${field} h-11`}
      />
      {hint && (
        <p id={`${id}-h`} className="mt-1 text-caption text-fg-3">
          {hint}
        </p>
      )}
    </div>
  )
}

export default function CoverLetterBuilder() {
  const [draft, setDraft] = useState<Draft>(BLANK)
  const [post, setPost] = useState('')
  const [labels, setLabels] = useState(true)
  const [loaded, setLoaded] = useState(false)
  const [note, setNote] = useState('')
  const [today, setToday] = useState<Date | null>(null)

  useEffect(() => {
    setToday(new Date())
    let saved: Draft | null = null
    try {
      const raw = localStorage.getItem(KEY)
      if (raw) {
        const v = JSON.parse(raw) as { draft?: unknown; post?: unknown }
        saved = normalise(v.draft)
        if (typeof v.post === 'string') setPost(v.post.slice(0, 20000))
      }
    } catch {
      /* private mode or blocked storage: the tool still works, it just won't remember */
    }
    const id = new URLSearchParams(window.location.search).get('sample')
    const s = SAMPLES.find((x) => x.id === id)
    if (s && !(saved && hasText(saved))) {
      setDraft({ ...s.draft })
      setNote(`Loaded the sample: ${s.title}. It is fictional; replace every line with yours.`)
    } else if (saved) {
      setDraft(saved)
      if (s) setNote('Your saved draft was kept. Use “Start from a sample” to load the sample.')
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    try {
      localStorage.setItem(KEY, JSON.stringify({ draft, post }))
    } catch {
      /* ignore */
    }
  }, [draft, post, loaded])

  useEffect(() => {
    if (!note) return
    const id = setTimeout(() => setNote(''), 5000)
    return () => clearTimeout(id)
  }, [note])

  const deferredPost = useDeferredValue(post)
  const report = useMemo(() => check(draft, deferredPost), [draft, deferredPost])
  const letter = useMemo(() => assemble(draft, today ?? new Date(2026, 10, 28)), [draft, today])
  const set = (k: keyof Draft, v: string) => setDraft((d) => ({ ...d, [k]: v }))

  const loadSample = (id: string) => {
    const s = SAMPLES.find((x) => x.id === id)
    if (!s) return
    if (
      hasText(draft) &&
      !window.confirm('Replace your letter with the sample? Your text will be lost.')
    )
      return
    setDraft({ ...s.draft })
    setNote(`Loaded the sample: ${s.title}. It is fictional; replace every line with yours.`)
  }

  const clear = () => {
    if (hasText(draft) && !window.confirm('Clear your letter?')) return
    setDraft({ ...BLANK, stage: draft.stage, channel: draft.channel })
    setNote('Cleared. Start with the role and one reason you want it.')
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(letter.text)
      setNote('Letter copied. Paste it into your email, file or form.')
    } catch {
      setNote('Could not copy here. Select the letter text and copy it instead.')
    }
  }

  const fileBase =
    `Cover-letter-${(draft.company || 'company').replace(/[^A-Za-z0-9]+/g, '-')}`.replace(/-+$/, '')

  const downloadTxt = () => {
    const blob = new Blob([letter.text], { type: 'text/plain;charset=utf-8' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `${fileBase}.txt`
    a.click()
    setTimeout(() => URL.revokeObjectURL(a.href), 1000)
  }

  const downloadDocx = async () => {
    try {
      const { Document, Packer, Paragraph, TextRun } = await import('docx')
      const p = (text: string, after = 200) =>
        new Paragraph({
          spacing: { after, line: 276 },
          children: [new TextRun({ text, font: 'Calibri', size: 22 })],
        })
      const kids: InstanceType<typeof Paragraph>[] = []
      if (letter.subject) kids.push(p(`Subject: ${letter.subject}`, 240))
      letter.header.forEach((l) => kids.push(p(l, 0)))
      if (letter.header.length) kids.push(p('', 200))
      if (letter.greeting) kids.push(p(letter.greeting))
      letter.paras.forEach((t) => kids.push(p(t)))
      if (letter.signOff) kids.push(p(letter.signOff, 0))
      letter.signature.forEach((l) => kids.push(p(l, 0)))
      const doc = new Document({
        sections: [
          {
            properties: {
              page: { margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 } },
            },
            children: kids,
          },
        ],
      })
      const blob = await Packer.toBlob(doc)
      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = `${fileBase}.docx`
      a.click()
      setTimeout(() => URL.revokeObjectURL(a.href), 1000)
      setNote('Word file downloaded. Open it, check it fits one page, then save as PDF if asked.')
    } catch {
      setNote('Could not build the Word file here. Use Copy or the .txt download instead.')
    }
  }

  const t = report.target
  const scaleMax = Math.max(t.max * 1.4, report.bodyWords + 20)
  const pct = (n: number) => `${Math.min(100, (n / scaleMax) * 100)}%`
  const stage = draft.stage
  const partLabel = (i: number) => {
    const keys = PARTS.filter(
      (p) => p.key === 'close' || draft[p.key as keyof Draft].toString().trim()
    )
    return keys[i]?.label.replace(/^\d · /, '') ?? ''
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
      {/* ---------- Left: inputs ---------- */}
      <div className="min-w-0 space-y-5 lg:col-span-7">
        <fieldset className="min-w-0">
          <legend className="text-small font-semibold text-fg">You are</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {STAGES.map((s) => (
              <label key={s.id} className={pill(stage === s.id)}>
                <input
                  type="radio"
                  name="cl-stage"
                  className="sr-only"
                  checked={stage === s.id}
                  onChange={() => setDraft((d) => ({ ...d, stage: s.id }))}
                />
                {s.label}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="min-w-0">
          <legend className="text-small font-semibold text-fg">Where it goes</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {CHANNELS.map((c) => (
              <label key={c.id} className={pill(draft.channel === c.id)}>
                <input
                  type="radio"
                  name="cl-channel"
                  className="sr-only"
                  checked={draft.channel === c.id}
                  onChange={() => setDraft((d) => ({ ...d, channel: c.id }))}
                />
                {c.label}
              </label>
            ))}
          </div>
          <p className="mt-2 text-caption text-fg-2">
            {CHANNELS.find((c) => c.id === draft.channel)?.hint}
          </p>
        </fieldset>

        <div className="flex flex-wrap items-end gap-3">
          <div className="min-w-0 flex-1">
            <label htmlFor="cl-sample" className="text-small font-medium text-fg">
              Start from a sample (fictional)
            </label>
            <select
              id="cl-sample"
              className={`${field} h-11`}
              value=""
              onChange={(e) => {
                if (e.target.value) loadSample(e.target.value)
              }}
            >
              <option value="">Choose a sample…</option>
              {SAMPLES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title}
                </option>
              ))}
            </select>
          </div>
          <button type="button" onClick={clear} className={btn2}>
            Clear
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            id="cl-role"
            label="Role"
            value={draft.role}
            onChange={(v) => set('role', v)}
            placeholder="e.g. Graduate Engineer Trainee"
          />
          <Field
            id="cl-company"
            label="Company"
            value={draft.company}
            onChange={(v) => set('company', v)}
            placeholder="e.g. Mehta Systems"
          />
          {draft.channel !== 'portal' && (
            <>
              <Field
                id="cl-name"
                label="Your name"
                value={draft.name}
                onChange={(v) => set('name', v)}
              />
              <Field
                id="cl-contact"
                label="Email · phone · city"
                value={draft.contact}
                onChange={(v) => set('contact', v)}
              />
              <div className="sm:col-span-2">
                <Field
                  id="cl-manager"
                  label="Who you are writing to (optional)"
                  hint="Title + surname, e.g. “Ms Rao”. Leave blank and we use “Dear Hiring Manager”."
                  value={draft.manager}
                  onChange={(v) => set('manager', v)}
                />
              </div>
            </>
          )}
        </div>

        <details className="group rounded-xl border border-border bg-surface open:shadow-e1">
          <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-small font-medium text-fg">
            <span>
              Paste the job post (optional){' '}
              <span className="font-normal text-fg-2">
                · we show which of its skills your letter uses
              </span>
            </span>
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              className="h-4 w-4 shrink-0 text-fg-2 transition-transform duration-base group-open:rotate-180"
            >
              <path
                d="M4 6l4 4 4-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </summary>
          <div className="px-4 pb-4">
            <label htmlFor="cl-post" className="sr-only">
              Job post
            </label>
            <textarea
              id="cl-post"
              rows={6}
              value={post}
              onChange={(e) => setPost(e.target.value)}
              placeholder="Paste the requirements part of the job post here."
              className={`${field} py-2`}
            />
          </div>
        </details>

        {PARTS.map((p) => {
          const v = draft[p.key as keyof Draft] as string
          const n = words(v)
          return (
            <div key={p.key} className="min-w-0">
              <div className="flex items-baseline justify-between gap-3">
                <label htmlFor={`cl-${p.key}`} className="text-small font-semibold text-fg">
                  {p.label}
                </label>
                <span className="text-caption tabular-nums text-fg-3" aria-hidden="true">
                  {n} words
                </span>
              </div>
              <p id={`cl-${p.key}-h`} className="mt-0.5 text-caption text-fg-2">
                {p.job}
              </p>
              <textarea
                id={`cl-${p.key}`}
                rows={p.key === 'proof' ? 5 : p.key === 'close' ? 2 : 3}
                value={v}
                onChange={(e) => set(p.key as keyof Draft, e.target.value)}
                aria-describedby={`cl-${p.key}-h`}
                placeholder={
                  p.key === 'close'
                    ? 'I would welcome the chance to talk about the role. Thank you for your time and consideration.'
                    : p.placeholder[stage]
                }
                className={`${field} py-2 leading-relaxed`}
              />
            </div>
          )
        })}
      </div>

      {/* ---------- Right: letter + checks ---------- */}
      <div className="min-w-0 space-y-5 lg:col-span-5">
        <div className="space-y-5 lg:sticky lg:top-24">
          <div className="rounded-xl border border-border bg-surface p-4 md:p-5">
            <div className="flex items-baseline justify-between gap-3">
              <div className={`${kicker} text-fg-2`}>Length · body only</div>
              <div className="text-small font-semibold tabular-nums text-fg">
                {report.bodyWords} words
              </div>
            </div>
            <div className="relative mt-3 h-3 rounded-full bg-muted" aria-hidden="true">
              <div
                className="absolute inset-y-0 rounded-full bg-signal-tint ring-1 ring-inset ring-signal/30"
                style={{ left: pct(t.min), width: `calc(${pct(t.max)} - ${pct(t.min)})` }}
              />
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-signal transition-[width] duration-slow ease-out motion-reduce:transition-none"
                style={{ width: pct(report.bodyWords), opacity: 0.85 }}
              />
            </div>
            <p className="mt-2 text-caption text-fg-2">
              Target {t.min}–{t.max} words ({t.why}).
            </p>
          </div>

          <div className="rounded-xl border border-border bg-surface">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3">
              <div className={`${kicker} text-fg-2`}>Your letter</div>
              <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 text-caption text-fg-2">
                <input
                  type="checkbox"
                  checked={labels}
                  onChange={(e) => setLabels(e.target.checked)}
                  className="h-4 w-4 accent-signal"
                />
                Show part labels
              </label>
            </div>
            <div
              className="max-h-[560px] overflow-y-auto px-4 py-4 text-small leading-relaxed text-fg md:px-6"
              // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
              tabIndex={0}
              role="region"
              aria-label="Letter preview"
            >
              {letter.subject && (
                <p className="mb-3 rounded-md bg-muted px-2 py-1 text-caption text-fg-2">
                  <span className="font-semibold text-fg">Subject:</span> {letter.subject}
                </p>
              )}
              {letter.header.length > 0 && (
                <div className="mb-4 text-fg-2">
                  {letter.header.map((l, i) =>
                    l ? (
                      <div key={i} className={i === 0 ? 'font-semibold text-fg' : ''}>
                        {l}
                      </div>
                    ) : (
                      <div key={i} className="h-3" />
                    )
                  )}
                </div>
              )}
              {letter.greeting && <p className="mb-3">{letter.greeting}</p>}
              {letter.paras.map((t, i) => (
                <div key={i} className="mb-3">
                  {labels && (
                    <div className={`${kicker} mb-0.5 text-signal-ink`} aria-hidden="true">
                      {partLabel(i)}
                    </div>
                  )}
                  <p className="break-words">{t}</p>
                </div>
              ))}
              {letter.signOff && (
                <div className="mt-4">
                  <div>{letter.signOff}</div>
                  {letter.signature.map((l, i) => (
                    <div key={i} className={i === 0 ? 'font-semibold' : 'text-fg-2'}>
                      {l}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-2 border-t border-border px-4 py-3">
              <button type="button" onClick={copy} className={btn1}>
                Copy letter
              </button>
              <button type="button" onClick={downloadDocx} className={btn2}>
                Word (.docx)
              </button>
              <button type="button" onClick={downloadTxt} className={btn2}>
                .txt
              </button>
            </div>
            <p className="sr-only" aria-live="polite">
              {note}
            </p>
            {note && (
              <p
                className="border-t border-border px-4 py-2 text-caption text-fg-2"
                aria-hidden="true"
              >
                {note}
              </p>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-4 md:p-5">
          <div className="flex items-baseline justify-between gap-3">
            <div className={`${kicker} text-fg-2`}>Checks</div>
            <div className="text-small font-semibold tabular-nums text-fg">
              {report.empty
                ? 'Waiting for your text'
                : `${report.passed} of ${report.checks.length} pass`}
            </div>
          </div>
          {report.empty ? (
            <p className="mt-3 text-small text-fg-2">
              Write your opening or proof, or load a sample, and {report.checks.length} checks will
              run here as you type.
            </p>
          ) : (
            <ul className="mt-3 space-y-3">
              {report.checks.map((c) => (
                <li key={c.id} className="flex gap-3">
                  <span
                    className={`mt-0.5 inline-flex h-6 shrink-0 items-center rounded-full px-2 text-caption font-semibold ${STATUS[c.status].cls}`}
                  >
                    {STATUS[c.status].label}
                  </span>
                  <div className="min-w-0">
                    <div className="text-small font-medium text-fg">{c.label}</div>
                    <p className="break-words text-caption leading-relaxed text-fg-2">
                      {c.detail}
                      {c.src && (
                        <>
                          {' '}
                          <a
                            href={c.src.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-signal-strong underline decoration-signal/30 underline-offset-2"
                          >
                            {c.src.label}
                          </a>
                        </>
                      )}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {report.keywords &&
            (report.keywords.matched.length > 0 || report.keywords.missing.length > 0) && (
              <div className="mt-4 border-t border-border pt-4">
                <div className="text-small font-medium text-fg">Skills from the post</div>
                <ul className="mt-2 flex flex-wrap gap-1.5" aria-label="Skills from the post">
                  {report.keywords.matched.map((k) => (
                    <li
                      key={k.name}
                      className="inline-flex h-7 items-center rounded-full bg-success-soft px-2.5 text-caption font-medium text-success-strong"
                    >
                      ✓ {k.name}
                    </li>
                  ))}
                  {report.keywords.missing.slice(0, 10).map((k) => (
                    <li
                      key={k.name}
                      className="inline-flex h-7 items-center rounded-full bg-muted px-2.5 text-caption font-medium text-fg-2"
                    >
                      {k.name}
                      {k.priority === 'must' ? ' · must-have' : ''}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-caption text-fg-3">
                  Use a missing skill only if you can prove it in a sentence. Your resume carries
                  the full list.
                </p>
              </div>
            )}
        </div>
      </div>
    </div>
  )
}
