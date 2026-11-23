'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import {
  analyse,
  charCount,
  compose,
  type Input,
  LIMIT,
  type Parts,
  PREVIEW,
  SOURCES,
  type Stage,
  type Status,
} from '@/data/linkedinHeadline/engine'
import { FRESHER, PAIRS, PARTS_SAMPLE } from '@/data/linkedinHeadline/samples'
import HeadlineMeter from './HeadlineMeter'

const KEY = 'aia.linkedinHeadline.v1'
const kicker = 'font-mono text-kicker uppercase tracking-[0.08em]'
const field =
  'mt-1.5 w-full rounded-lg border border-border-input bg-surface px-3 text-small text-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-strong'
const btn2 =
  'inline-flex h-11 items-center justify-center gap-2 rounded-full bg-surface px-4 text-small font-semibold text-fg ring-1 ring-inset ring-border-strong transition-colors duration-fast hover:bg-muted disabled:opacity-50'
const pill = (on: boolean) =>
  `inline-flex min-h-11 items-center rounded-full px-4 text-small font-medium ring-1 ring-inset transition-colors duration-fast ${
    on
      ? 'bg-signal-tint text-signal-ink ring-signal/40'
      : 'bg-surface text-fg-2 ring-border-strong hover:bg-muted'
  }`

const STAGES: { id: Stage; label: string }[] = [
  { id: 'student', label: 'Student or fresher' },
  { id: 'experienced', label: 'Working' },
  { id: 'switcher', label: 'Changing careers' },
  { id: 'between', label: 'Between jobs' },
]

const STATUS: Record<Status, { label: string; cls: string; icon: string }> = {
  pass: { label: 'Pass', cls: 'bg-success-soft text-success-strong', icon: 'M3.5 8.5l3 3 6-7' },
  warn: { label: 'Fix', cls: 'bg-warn-soft text-warn', icon: 'M8 4v5M8 11.5v.5' },
  fail: {
    label: 'Fix first',
    cls: 'bg-danger-soft text-danger',
    icon: 'M4.5 4.5l7 7M11.5 4.5l-7 7',
  },
}

const BLANK: Input = { headline: '', target: '', keywords: '', stage: 'student' }
const BLANK_PARTS: Parts = {
  now: '',
  target: '',
  skills: '',
  proof: '',
  audience: '',
  stage: 'student',
}

const short = (t: string) => (t.length > 48 ? `${t.slice(0, 48)}…` : t)
const str = (x: unknown) => (typeof x === 'string' ? x.slice(0, 2000) : '')
const isStage = (x: unknown): x is Stage => STAGES.some((s) => s.id === x)

function Chip({ status }: { status: Status | null }) {
  const st = status ? STATUS[status] : null
  return (
    <span
      className={`mt-0.5 inline-flex h-6 shrink-0 items-center gap-1 rounded-full px-2 text-caption font-semibold ${
        st ? st.cls : 'bg-muted text-fg-2'
      }`}
    >
      {st && (
        <svg
          viewBox="0 0 16 16"
          className="h-3 w-3"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d={st.icon} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {st ? st.label : '—'}
    </span>
  )
}

export default function HeadlineChecker() {
  const [input, setInput] = useState<Input>(BLANK)
  const [parts, setParts] = useState<Parts>(BLANK_PARTS)
  const [loaded, setLoaded] = useState(false)
  const [note, setNote] = useState('')
  const checkerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY)
      if (raw) {
        const v = JSON.parse(raw) as {
          input?: Record<string, unknown>
          parts?: Record<string, unknown>
        }
        if (v.input && typeof v.input === 'object')
          setInput({
            headline: str(v.input.headline),
            target: str(v.input.target),
            keywords: str(v.input.keywords),
            stage: isStage(v.input.stage) ? v.input.stage : 'student',
          })
        if (v.parts && typeof v.parts === 'object')
          setParts({
            now: str(v.parts.now),
            target: str(v.parts.target),
            skills: str(v.parts.skills),
            proof: str(v.parts.proof),
            audience: str(v.parts.audience),
            stage: isStage(v.parts.stage) ? v.parts.stage : 'student',
          })
      }
    } catch {
      /* private mode or blocked storage: the tool still works, it just won't remember */
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    try {
      localStorage.setItem(KEY, JSON.stringify({ input, parts }))
    } catch {
      /* ignore */
    }
  }, [input, parts, loaded])

  useEffect(() => {
    if (!note) return
    const id = setTimeout(() => setNote(''), 4000)
    return () => clearTimeout(id)
  }, [note])

  const res = useMemo(() => analyse(input), [input])
  const empty = !input.headline.trim()
  const drafts = useMemo(() => compose(parts), [parts])
  const draftScores = useMemo(
    () =>
      drafts.map((d) =>
        analyse({
          headline: d.text,
          target: parts.target,
          keywords: parts.skills,
          stage: parts.stage,
        })
      ),
    [drafts, parts]
  )

  const set = (k: keyof Input, v: string) => setInput((d) => ({ ...d, [k]: v }))
  const setP = (k: keyof Parts, v: string) => setParts((d) => ({ ...d, [k]: v }))

  const loadPair = (id: string) => {
    const [pid, which] = id.split(':')
    if (pid === 'fresher') {
      const t = FRESHER[Number(which)]
      if (!t) return
      setInput({ headline: t.headline, target: t.target, keywords: t.keywords, stage: 'student' })
      setNote(`Loaded a fictional ${t.degree} example. Swap in your own skills and number.`)
      return
    }
    const p = PAIRS.find((x) => x.id === pid)
    if (!p) return
    setInput({
      headline: which === 'strong' ? p.strong : p.weak,
      target: p.target,
      keywords: p.keywords,
      stage: p.stage,
    })
    setNote(`Loaded a fictional ${which} example: ${p.who.toLowerCase()}.`)
  }

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setNote('Copied. Paste it into the Headline field of your LinkedIn profile intro.')
    } catch {
      setNote('Copy did not work in this browser; select the text and copy it.')
    }
  }

  const moveDraft = (text: string) => {
    setInput((d) => ({
      ...d,
      headline: text,
      target: parts.target || d.target,
      keywords: parts.skills || d.keywords,
      stage: parts.stage,
    }))
    setNote('Draft moved into the checker above. Edit it there.')
    checkerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const hl = input.headline.replace(/\s+/g, ' ').trim()
  const chars = charCount(hl)

  return (
    <div className="space-y-10">
      {/* ---------- Checker ---------- */}
      <div ref={checkerRef} className="grid scroll-mt-32 gap-6 lg:grid-cols-12">
        <div className="space-y-5 lg:col-span-7">
          <fieldset>
            <legend className="text-small font-medium text-fg">Where are you now?</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {STAGES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  aria-pressed={input.stage === s.id}
                  onClick={() => set('stage', s.id)}
                  className={pill(input.stage === s.id)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </fieldset>

          <div>
            <div className="flex items-baseline justify-between gap-3">
              <label htmlFor="lh-headline" className="text-small font-medium text-fg">
                Your headline
              </label>
              <span
                id="lh-count"
                className={`text-caption tabular-nums ${chars > LIMIT ? 'font-semibold text-danger' : 'text-fg-3'}`}
              >
                {chars} / {LIMIT} characters
              </span>
            </div>
            <textarea
              id="lh-headline"
              aria-describedby="lh-count"
              rows={3}
              value={input.headline}
              onChange={(e) => set('headline', e.target.value)}
              placeholder="Copy it from your profile, e.g. Student at ABC College"
              className={`${field} py-2.5 leading-relaxed`}
            />
            <div className="mt-2">
              <HeadlineMeter chars={chars} rolePos={res.rolePos} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="lh-target" className="text-small font-medium text-fg">
                Role you want to be found for
              </label>
              <input
                id="lh-target"
                value={input.target}
                onChange={(e) => set('target', e.target.value)}
                placeholder="e.g. Data Analyst"
                className={`${field} h-11`}
              />
              <p className="mt-1 text-caption text-fg-3">The words a recruiter would type.</p>
            </div>
            <div>
              <label htmlFor="lh-kw" className="text-small font-medium text-fg">
                Skills from a job post <span className="font-normal text-fg-3">(optional)</span>
              </label>
              <input
                id="lh-kw"
                value={input.keywords}
                onChange={(e) => set('keywords', e.target.value)}
                placeholder="e.g. SQL, Power BI, Python"
                className={`${field} h-11`}
              />
              <p className="mt-1 text-caption text-fg-3">Separate with commas.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label htmlFor="lh-sample" className="sr-only">
              Load an example
            </label>
            <select
              id="lh-sample"
              value=""
              onChange={(e) => {
                loadPair(e.target.value)
                e.target.value = ''
              }}
              className={`${field} mt-0 h-11 w-auto max-w-full pr-8`}
            >
              <option value="">Try an example…</option>
              {PAIRS.map((p) => (
                <optgroup key={p.id} label={p.who}>
                  <option value={`${p.id}:weak`}>Weak: {short(p.weak)}</option>
                  <option value={`${p.id}:strong`}>Strong: {short(p.strong)}</option>
                </optgroup>
              ))}
              <optgroup label="Fresher examples by degree">
                {FRESHER.map((t, i) => (
                  <option key={t.degree} value={`fresher:${i}`}>
                    {t.degree}: {short(t.headline)}
                  </option>
                ))}
              </optgroup>
            </select>
            <button type="button" className={btn2} disabled={empty} onClick={() => copy(hl)}>
              Copy headline
            </button>
            <button
              type="button"
              className={btn2}
              disabled={empty && !input.target && !input.keywords}
              onClick={() => {
                setInput({ ...BLANK, stage: input.stage })
                setNote('Cleared.')
              }}
            >
              Clear
            </button>
          </div>
          <p aria-live="polite" className="min-h-[1.5rem] text-small text-fg-2">
            {note}
          </p>

          {/* Previews */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-surface p-4">
              <div className={`${kicker} text-fg-3`}>Narrow view · about {PREVIEW} characters</div>
              <div className="mt-3 flex items-start gap-3">
                <span aria-hidden="true" className="h-9 w-9 shrink-0 rounded-full bg-muted" />
                <span className="min-w-0">
                  <span className="block text-small font-semibold text-fg">Your Name</span>
                  <span className="block break-words text-caption text-fg-2">
                    {empty ? 'Your headline shows here' : res.preview}
                    {res.previewCut && '…'}
                  </span>
                </span>
              </div>
              <p className="mt-3 text-caption text-fg-3">
                Like a comment or a search result on a phone. LinkedIn does not publish the cut-off;
                {` ${PREVIEW}`} is our safe planning number.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-4">
              <div className={`${kicker} text-fg-3`}>Your profile · full headline</div>
              <div className="mt-3">
                <span className="block text-small font-semibold text-fg">Your Name</span>
                <span className="mt-0.5 block break-words text-small text-fg-2">
                  {empty ? 'Your headline shows here' : hl.slice(0, 400)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Checks */}
        <div className="lg:col-span-5">
          <div className="rounded-xl border border-border bg-surface p-4 md:p-5 lg:sticky lg:top-32">
            <div className="flex items-baseline justify-between gap-3">
              <div className={`${kicker} text-fg-3`}>10 checks</div>
              <div className="text-small font-semibold tabular-nums text-fg" aria-live="polite">
                {empty ? 'Paste a headline' : `${res.passed} of ${res.checks.length} pass`}
              </div>
            </div>
            <ul className="mt-2 divide-y divide-border">
              {res.checks.map((c) => (
                <li key={c.id} className="flex gap-3 py-2.5">
                  <Chip status={empty ? null : c.status} />
                  <span className="min-w-0">
                    <span className="block text-small font-medium text-fg">{c.title}</span>
                    {!empty && (
                      <>
                        <span className="block text-caption text-fg-2">{c.detail}</span>
                        {c.matched && c.status !== 'pass' && (
                          <span className="mt-1 flex flex-wrap gap-1">
                            {c.matched.map((m) => (
                              <mark
                                key={m}
                                className="rounded bg-warn-soft px-1.5 py-0.5 text-caption text-fg"
                              >
                                {m}
                              </mark>
                            ))}
                          </span>
                        )}
                        <a
                          href={SOURCES[c.source].url}
                          target={SOURCES[c.source].url.startsWith('http') ? '_blank' : undefined}
                          rel="noopener"
                          className="mt-1 inline-block text-caption text-fg-3 underline decoration-border-strong underline-offset-2 hover:text-fg"
                        >
                          Why: {SOURCES[c.source].label.split(',')[0]}
                        </a>
                      </>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ---------- Build from parts ---------- */}
      <div className="rounded-2xl border border-border bg-surface p-5 md:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <div className={`${kicker} text-signal-strong`}>No headline yet? Build one</div>
            <h3 className="mt-2 text-h3 font-semibold text-fg">
              Fill the parts, get up to three versions
            </h3>
          </div>
          <button
            type="button"
            className={btn2}
            onClick={() => {
              setParts(PARTS_SAMPLE)
              setNote('Loaded a fictional fresher. Change the parts to yours.')
            }}
          >
            Load a sample
          </button>
        </div>
        <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Your stage">
          {STAGES.map((s) => (
            <button
              key={s.id}
              type="button"
              aria-pressed={parts.stage === s.id}
              onClick={() => setP('stage', s.id)}
              className={pill(parts.stage === s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {(
            [
              ['target', 'Role you want', 'e.g. Data Analyst'],
              ['now', 'Where you are now', 'e.g. Final-year B.Com, or Senior Associate'],
              ['skills', '1 to 3 skills (commas)', 'e.g. SQL, Power BI, Python'],
              ['proof', 'One result with a number', 'e.g. Built a dashboard 40 managers use'],
              ['audience', 'Who you help (optional)', 'e.g. D2C brands, early-stage founders'],
            ] as [keyof Parts, string, string][]
          ).map(([k, l, ph]) => (
            <div key={k} className={k === 'proof' ? 'sm:col-span-2' : ''}>
              <label htmlFor={`lh-p-${k}`} className="text-small font-medium text-fg">
                {l}
              </label>
              <input
                id={`lh-p-${k}`}
                value={parts[k]}
                onChange={(e) => setP(k, e.target.value)}
                placeholder={ph}
                className={`${field} h-11`}
              />
            </div>
          ))}
        </div>

        {drafts.length === 0 ? (
          <div className="mt-6 rounded-xl border border-dashed border-border-strong p-6 text-center text-small text-fg-2">
            Add the role you want (or where you are now) to see drafts.
          </div>
        ) : (
          <ul className="mt-6 space-y-3">
            {drafts.map((d, i) => {
              const r = draftScores[i]
              return (
                <li key={d.id} className="rounded-xl border border-border p-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="text-small font-semibold text-fg">{d.name}</span>
                    <span className="text-caption tabular-nums text-fg-3">
                      {r.chars} / {LIMIT} characters · {r.passed} of {r.checks.length} checks
                    </span>
                  </div>
                  <p className="mt-2 break-words text-body text-fg">{d.text}</p>
                  <p className="mt-1 text-caption text-fg-2">{d.why}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button type="button" className={btn2} onClick={() => moveDraft(d.text)}>
                      Check this one
                    </button>
                    <button type="button" className={btn2} onClick={() => copy(d.text)}>
                      Copy
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
        <p className="mt-4 text-caption text-fg-3">
          Saved only in this browser. Nothing is uploaded, and no AI reads your text.
        </p>
      </div>
    </div>
  )
}
