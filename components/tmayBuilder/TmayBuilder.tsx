'use client'

import MockInterviewButton from '@/components/ai/MockInterviewButton'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  analyse,
  type Answer,
  DEFAULT_WPM,
  fmtSec,
  type Length,
  LENGTHS,
  type Order,
  ORDERS,
  PACES,
  PARTS,
  type PartKey,
  type Stage,
  type Status,
} from '@/data/tmay/engine'
import { SAMPLES } from '@/data/tmay/samples'
import TmaySplit, { SEG } from './TmaySplit'

const KEY = 'aia.tmayBuilder.v1'
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

const BLANK: Answer = {
  stage: 'fresher',
  role: '',
  company: '',
  skills: '',
  present: '',
  past: '',
  future: '',
}

const STAGES: { id: Stage; label: string }[] = [
  { id: 'fresher', label: 'Student or fresher' },
  { id: 'experienced', label: 'Experienced' },
  { id: 'switcher', label: 'Changing careers' },
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

interface Saved {
  draft: Answer
  order: Order
  length: Length
  wpm: number
  measured: number | null
}

export default function TmayBuilder() {
  const [draft, setDraft] = useState<Answer>(BLANK)
  const [order, setOrder] = useState<Order>('present-first')
  const [length, setLength] = useState<Length>('standard')
  const [wpm, setWpm] = useState(DEFAULT_WPM)
  const [loaded, setLoaded] = useState(false)
  const [note, setNote] = useState('')
  const [running, setRunning] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [measured, setMeasured] = useState<number | null>(null)
  const startRef = useRef(0)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY)
      if (raw) {
        const v = JSON.parse(raw) as Partial<Saved>
        if (v.draft && typeof v.draft === 'object') {
          const d = v.draft as unknown as Record<string, unknown>
          const str = (x: unknown) => (typeof x === 'string' ? x : '')
          setDraft({
            stage: STAGES.some((s) => s.id === d.stage) ? (d.stage as Stage) : 'fresher',
            role: str(d.role),
            company: str(d.company),
            skills: str(d.skills),
            present: str(d.present),
            past: str(d.past),
            future: str(d.future),
          })
        }
        if (typeof v.measured === 'number' && v.measured >= 60 && v.measured <= 260)
          setMeasured(v.measured)
        if (v.order && v.order in ORDERS) setOrder(v.order)
        if (v.length && v.length in LENGTHS) setLength(v.length)
        if (typeof v.wpm === 'number' && v.wpm >= 60 && v.wpm <= 260) setWpm(v.wpm)
      }
    } catch {
      /* private mode or blocked storage: the tool still works, it just won't remember */
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    try {
      localStorage.setItem(
        KEY,
        JSON.stringify({ draft, order, length, wpm, measured } satisfies Saved)
      )
    } catch {
      /* ignore */
    }
  }, [draft, order, length, wpm, measured, loaded])

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => setElapsed((Date.now() - startRef.current) / 1000), 250)
    return () => clearInterval(id)
  }, [running])

  useEffect(() => {
    if (!note) return
    const id = setTimeout(() => setNote(''), 4000)
    return () => clearTimeout(id)
  }, [note])

  const res = useMemo(() => analyse(draft, order, length, wpm), [draft, order, length, wpm])
  const L = LENGTHS[length]
  const keys = ORDERS[order].keys
  const set = (k: keyof Answer, v: string) => setDraft((d) => ({ ...d, [k]: v }))

  const hasText = !res.empty
  const loadSample = (i: number) => {
    if (hasText && !window.confirm('Replace your answer with the sample? Your text will be lost.'))
      return
    const s = SAMPLES[i]
    setDraft({ ...s.answer })
    setOrder(s.order)
    setLength(s.length)
    setNote(`Loaded the sample: ${s.label}. It is fictional; edit it into yours.`)
  }

  const clear = () => {
    if (hasText && !window.confirm('Clear your answer?')) return
    setDraft({ ...BLANK, stage: draft.stage })
    setMeasured(null)
    setNote('Cleared. Start with who you are now.')
  }

  const copy = async (text: string, what: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setNote(`${what} copied.`)
    } catch {
      setNote('Could not copy here. Select the text and copy it instead.')
    }
  }

  const timer = () => {
    if (!running) {
      startRef.current = Date.now()
      setElapsed(0)
      setRunning(true)
      return
    }
    setRunning(false)
    const sec = (Date.now() - startRef.current) / 1000
    setElapsed(sec)
    if (sec >= 10 && res.totalWords >= 20) {
      const pace = Math.round(res.totalWords / (sec / 60))
      if (pace >= 60 && pace <= 260) {
        setMeasured(pace)
        setWpm(pace)
        setNote(`You spoke at about ${pace} words a minute. Times now use your pace.`)
        return
      }
    }
    setNote(
      sec < 10
        ? 'Read the whole answer aloud (at least 10 seconds), then press stop.'
        : `That was too ${res.totalWords / (sec / 60) > 260 ? 'quick' : 'slow'} for ${res.totalWords} words. Read it once at interview speed, then press stop.`
    )
  }

  const own = measured ?? (PACES.some((p) => p.wpm === wpm) ? null : wpm)
  const paces =
    own && !PACES.some((p) => p.wpm === own)
      ? [...PACES, { wpm: own, label: `Your measured pace, ${own} words a minute` }]
      : PACES

  const t = Math.round(res.seconds)
  const scaleMax = 150
  const pos = (sec: number) => `${Math.min(100, (sec / scaleMax) * 100)}%`
  const stage = draft.stage

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
      {/* ---------- Left: inputs ---------- */}
      <div className="min-w-0 space-y-5 lg:col-span-7">
        <div className="rounded-xl border border-border bg-surface p-4 md:p-5">
          <fieldset>
            <legend className="text-small font-medium text-fg">Where you are</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {STAGES.map((s) => (
                <label
                  key={s.id}
                  className={`${pill(stage === s.id)} cursor-pointer has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-signal-strong`}
                >
                  <input
                    type="radio"
                    name="tmay-stage"
                    value={s.id}
                    checked={stage === s.id}
                    onChange={() => set('stage', s.id)}
                    className="sr-only"
                  />
                  {s.label}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block min-w-0">
              <span className="text-small font-medium text-fg">Role you are interviewing for</span>
              <input
                value={draft.role}
                onChange={(e) => set('role', e.target.value)}
                placeholder="e.g. data analyst"
                className={`${field} h-11`}
              />
            </label>
            <label className="block min-w-0">
              <span className="text-small font-medium text-fg">
                Company <span className="font-normal text-fg-3">(optional)</span>
              </span>
              <input
                value={draft.company}
                onChange={(e) => set('company', e.target.value)}
                placeholder="e.g. the company name"
                className={`${field} h-11`}
              />
            </label>
            <label className="block min-w-0 sm:col-span-2">
              <span className="text-small font-medium text-fg">
                2 to 5 skills from the job post{' '}
                <span className="font-normal text-fg-3">(comma separated)</span>
              </span>
              <input
                value={draft.skills}
                onChange={(e) => set('skills', e.target.value)}
                placeholder="e.g. SQL, Excel, stakeholder management"
                className={`${field} h-11`}
              />
            </label>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <label className="block min-w-0">
              <span className="text-small font-medium text-fg">Order of the parts</span>
              <select
                value={order}
                onChange={(e) => setOrder(e.target.value as Order)}
                className={`${field} h-11`}
              >
                {(Object.keys(ORDERS) as Order[]).map((o) => (
                  <option key={o} value={o}>
                    {ORDERS[o].label}
                  </option>
                ))}
              </select>
            </label>
            <label className="block min-w-0">
              <span className="text-small font-medium text-fg">Target length</span>
              <select
                value={length}
                onChange={(e) => setLength(e.target.value as Length)}
                className={`${field} h-11`}
              >
                {(Object.keys(LENGTHS) as Length[]).map((l) => (
                  <option key={l} value={l}>
                    {LENGTHS[l].label}
                  </option>
                ))}
              </select>
            </label>
            <label className="block min-w-0">
              <span className="text-small font-medium text-fg">Speaking pace</span>
              <select
                value={wpm}
                onChange={(e) => setWpm(Number(e.target.value))}
                className={`${field} h-11`}
              >
                {paces.map((p) => (
                  <option key={p.wpm} value={p.wpm}>
                    {p.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-caption text-fg-3">Try a sample:</span>
            {SAMPLES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => loadSample(i)}
                className="inline-flex h-11 items-center rounded-full bg-muted px-4 text-caption font-medium text-fg-2 transition-colors duration-fast hover:bg-signal-tint hover:text-signal-ink"
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {keys.map((k: PartKey, i) => (
          <div key={k} className="rounded-xl border border-border bg-surface p-4 md:p-5">
            <label htmlFor={`tmay-${k}`} className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className={`flex h-8 min-w-8 shrink-0 items-center justify-center rounded-full px-2 font-mono text-small font-semibold ${SEG[k]}`}
              >
                {i + 1}
              </span>
              <span className="min-w-0">
                <span className="block text-body font-semibold text-fg">
                  {PARTS[k].name} <span className="font-normal text-fg-3">· {PARTS[k].ask}</span>
                </span>
                <span className="block text-small text-fg-2">{PARTS[k].hint[stage]}</span>
              </span>
            </label>
            <textarea
              id={`tmay-${k}`}
              value={draft[k]}
              onChange={(e) => set(k, e.target.value)}
              rows={k === 'past' ? 5 : 3}
              placeholder={PARTS[k].placeholder[stage]}
              className={`${field} mt-3 py-2.5 leading-relaxed`}
            />
            <div className="mt-2 flex flex-wrap justify-between gap-2 text-caption tabular-nums text-fg-3">
              <span>
                {res.words[k]} words · {fmtSec((res.words[k] / wpm) * 60)}
              </span>
              <span>{res.share[k]}% of the answer</span>
            </div>
          </div>
        ))}

        {/* mobile: jump to report */}
        <a
          href="#tmay-report"
          className="sticky bottom-3 z-30 flex items-center justify-between gap-3 rounded-full border border-border bg-surface px-4 py-2.5 text-small shadow-e2 lg:hidden"
        >
          <span className="tabular-nums text-fg">
            <span className="font-semibold">{fmtSec(res.seconds)}</span>
            <span className="text-fg-2">
              {' '}
              · {res.empty ? 'start writing' : `${res.passed} of ${res.checks.length} checks`}
            </span>
          </span>
          <span className="font-semibold text-signal-strong">See report ↓</span>
        </a>

        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={clear} className={btn2} disabled={!hasText}>
            Clear
          </button>
        </div>
        <p aria-live="polite" className="min-h-[1.5rem] text-small text-fg-2">
          {note}
        </p>
      </div>

      {/* ---------- Right: live report ---------- */}
      <aside
        id="tmay-report"
        aria-label="Live report"
        className="min-w-0 scroll-mt-32 lg:col-span-5"
      >
        <div className="space-y-5 rounded-2xl border border-border bg-surface p-5 shadow-e1 md:p-6 lg:sticky lg:top-32">
          <div>
            <div className={`${kicker} text-fg-3`}>Out loud, at {wpm} words a minute</div>
            <div className="mt-2 flex items-baseline gap-3">
              <span className="text-[2.75rem] font-semibold tabular-nums leading-none text-fg">
                {fmtSec(res.seconds)}
              </span>
              <span className="text-small text-fg-2">
                {res.totalWords} words · target {L.label}
              </span>
            </div>
            <div className="relative mt-4 h-3 rounded-full bg-muted" aria-hidden="true">
              <div
                className="absolute inset-y-0 rounded-full bg-success-soft ring-1 ring-inset ring-success/30"
                style={{ left: pos(L.min), width: `calc(${pos(L.max)} - ${pos(L.min)})` }}
              />
              <div
                className="absolute top-1/2 h-5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fg transition-[left] duration-slow ease-standard"
                style={{ left: pos(t) }}
              />
            </div>
            <div className="mt-1.5 flex justify-between text-caption tabular-nums text-fg-3">
              <span>0:00</span>
              <span>
                target {fmtSec(L.min)}–{fmtSec(L.max)}
              </span>
              <span>{fmtSec(scaleMax)}</span>
            </div>
          </div>

          <div>
            <div className={`${kicker} text-fg-3`}>Where the time goes</div>
            <div className="mt-2">
              <TmaySplit words={res.words} order={order} />
            </div>
          </div>

          <div>
            <div className="flex items-baseline justify-between gap-2">
              <div className={`${kicker} text-fg-3`}>Checks</div>
              <div className="text-small font-semibold tabular-nums text-fg">
                {res.empty ? 'Start writing' : `${res.passed} of ${res.checks.length} pass`}
              </div>
            </div>
            <ul className="mt-2 divide-y divide-border">
              {res.checks.map((c) => {
                const st = res.empty ? null : STATUS[c.status]
                return (
                  <li key={c.id} className="flex gap-3 py-2.5">
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
                    <span className="min-w-0">
                      <span className="block text-small font-medium text-fg">{c.title}</span>
                      {!res.empty && (
                        <span className="block text-caption text-fg-2">{c.detail}</span>
                      )}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>

          {!res.empty && (
            <div className="space-y-3">
              <details className="group rounded-xl border border-border" open>
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-2 px-4 text-small font-semibold text-fg">
                  Your answer, in order · {fmtSec(res.seconds)}
                  <span
                    aria-hidden="true"
                    className="text-fg-3 transition-transform duration-base group-open:rotate-180"
                  >
                    ▾
                  </span>
                </summary>
                <p className="px-4 text-small leading-relaxed text-fg-2">{res.text}</p>
                <div className="px-4 pb-4 pt-3">
                  <button
                    type="button"
                    onClick={() => copy(res.text, 'Answer')}
                    className="inline-flex h-11 items-center rounded-full px-4 text-caption font-semibold text-signal-strong ring-1 ring-inset ring-border-strong hover:bg-signal-tint"
                  >
                    Copy answer
                  </button>
                </div>
              </details>
              <details className="group rounded-xl border border-border">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-2 px-4 text-small font-semibold text-fg">
                  Short version (first line of each part) · {fmtSec(res.shortSeconds)}
                  <span
                    aria-hidden="true"
                    className="text-fg-3 transition-transform duration-base group-open:rotate-180"
                  >
                    ▾
                  </span>
                </summary>
                <p className="px-4 text-caption text-fg-3">
                  For a recruiter screen, a networking call, or when they say &ldquo;briefly&rdquo;.
                  It only works if each part opens with its main point.
                </p>
                <p className="mt-2 px-4 text-small leading-relaxed text-fg-2">{res.short}</p>
                <div className="px-4 pb-4 pt-3">
                  <button
                    type="button"
                    onClick={() => copy(res.short, 'Short version')}
                    className="inline-flex h-11 items-center rounded-full px-4 text-caption font-semibold text-signal-strong ring-1 ring-inset ring-border-strong hover:bg-signal-tint"
                  >
                    Copy short version
                  </button>
                </div>
              </details>
            </div>
          )}

          <div className="rounded-xl bg-muted p-4">
            <div className="text-small font-semibold text-fg">Read it aloud and time it</div>
            <p className="mt-1 text-caption text-fg-2">
              Press start, say your answer at interview speed, press stop. We work out your real
              pace. Nothing is recorded.
            </p>
            <div className="mt-3 flex items-center gap-3">
              <button
                type="button"
                onClick={timer}
                disabled={!running && res.totalWords < 20}
                className={btn2}
              >
                <span
                  aria-hidden="true"
                  className={`h-2.5 w-2.5 rounded-full ${running ? 'animate-pulse bg-danger' : 'bg-fg-3'}`}
                />
                {running ? 'Stop' : 'Start reading'}
              </button>
              <span className="text-h3 font-semibold tabular-nums text-fg" aria-live="off">
                {fmtSec(elapsed)}
              </span>
            </div>
            {measured && (
              <p className="mt-3 text-caption text-fg-2">
                Your pace: {measured} words a minute, so this answer runs {fmtSec(res.seconds)}. Now
                say it again without reading: remember the three parts, not the words.
              </p>
            )}
            <div className="mt-3 space-y-3 border-t border-border pt-3">
              <div>
                <div className="text-small font-semibold text-fg">
                  The follow-ups that come next
                </div>
                <ul className="mt-1 list-disc space-y-0.5 pl-5 text-caption text-fg-2">
                  <li>Why are you leaving (or, as a fresher, why this field)?</li>
                  <li>Tell me more about the project you mentioned.</li>
                  <li>Why should we hire you over other candidates?</li>
                </ul>
              </div>
              <MockInterviewButton caption={false} label="Say it to an interviewer" />
            </div>
          </div>
          <p className="text-caption text-fg-3">
            Saved on this device only. No AI reads your text and nothing is uploaded.
          </p>
        </div>
      </aside>
    </div>
  )
}
