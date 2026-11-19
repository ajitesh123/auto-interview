'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import {
  OBJECTIONS,
  GROUPS,
  GONG,
  TTAI_URL,
  checkAnswer,
  score,
  words,
  seconds,
  type Group,
  type CheckState,
} from '@/data/objectionHandling'

const STORE = 'aia-objection-checker-v1'
type Saved = Record<string, { best: number; max: number; text: string; at: string }>

function load(): Saved {
  try {
    const raw = JSON.parse(window.localStorage.getItem(STORE) || '{}')
    if (!raw || typeof raw !== 'object') return {}
    const out: Saved = {}
    for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
      const e = v as Saved[string]
      if (e && typeof e.best === 'number' && typeof e.max === 'number') out[k] = e
    }
    return out
  } catch {
    return {}
  }
}

const STATE: Record<CheckState, { label: string; cls: string; mark: string }> = {
  pass: { label: 'Good', cls: 'bg-success-soft text-success', mark: '✓' },
  warn: { label: 'Could be better', cls: 'bg-warn-soft text-warn', mark: '!' },
  fail: { label: 'Fix this', cls: 'bg-danger-soft text-danger', mark: '×' },
}

/**
 * Pick an objection, type (or say and then type) your answer, and get 8 rule checks with the
 * source of each rule, a speaking-time estimate and an out-loud timer. No AI; nothing leaves
 * this browser. Best score per objection is saved on this device only.
 */
export default function ObjectionAnswerChecker() {
  const [id, setId] = useState(OBJECTIONS[0].id)
  const [text, setText] = useState('')
  const [saved, setSaved] = useState<Saved>({})
  const [savedNow, setSavedNow] = useState(false)
  const [elapsed, setElapsed] = useState<number | null>(null)
  const [running, setRunning] = useState(false)
  const started = useRef(0)
  const tick = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => setSaved(load()), [])
  useEffect(
    () => () => {
      if (tick.current) clearInterval(tick.current)
    },
    []
  )

  const o = OBJECTIONS.find((x) => x.id === id) ?? OBJECTIONS[0]
  const checks = useMemo(() => checkAnswer(text, o.group), [text, o.group])
  const sc = score(checks)
  const practised = Object.keys(saved).filter((k) => OBJECTIONS.some((x) => x.id === k)).length

  function pick(next: string) {
    setId(next)
    setText('')
    setSavedNow(false)
    stopTimer(true)
  }

  function startTimer() {
    if (tick.current) clearInterval(tick.current)
    started.current = Date.now()
    setElapsed(0)
    setRunning(true)
    tick.current = setInterval(() => {
      setElapsed((Date.now() - started.current) / 1000)
    }, 100)
  }

  function stopTimer(reset = false) {
    if (tick.current) clearInterval(tick.current)
    tick.current = null
    setRunning(false)
    if (reset) setElapsed(null)
  }

  function save() {
    if (!checks.length) return
    const prev = saved[o.id]
    const next: Saved = { ...saved }
    if (!prev || sc.points >= prev.best) {
      next[o.id] = { best: sc.points, max: sc.max, text: text.trim(), at: new Date().toISOString() }
    }
    setSaved(next)
    setSavedNow(true)
    try {
      window.localStorage.setItem(STORE, JSON.stringify(next))
    } catch {
      /* storage blocked: keep in memory */
    }
  }

  const groups = Object.keys(GROUPS) as Group[]
  const est = seconds(text)
  const best = saved[o.id]

  return (
    <div
      id="checker"
      className="not-prose my-8 scroll-mt-24 rounded-2xl border border-border bg-surface p-5 md:p-7"
    >
      <div className="font-mono text-kicker uppercase tracking-[0.08em] text-signal-strong">
        Free tool · no AI · nothing uploaded
      </div>
      <h3 className="mt-2 text-h3 font-semibold text-fg">Check your answer to an objection</h3>

      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="min-w-0 space-y-4">
          <label className="block">
            <span className="text-small font-medium text-fg">The objection</span>
            <select
              value={id}
              onChange={(e) => pick(e.target.value)}
              className="mt-1 h-11 w-full rounded-lg border border-border-input bg-surface px-3 text-body text-fg"
            >
              {groups.map((g) => (
                <optgroup key={g} label={GROUPS[g].label}>
                  {OBJECTIONS.filter((x) => x.group === g).map((x) => (
                    <option key={x.id} value={x.id}>
                      {x.line}
                      {saved[x.id] ? ' ✓' : ''}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </label>

          <div className="rounded-xl bg-muted p-4">
            <p className="text-small text-fg-2">The buyer says:</p>
            <p className="mt-1 font-serif text-h4 text-fg">“{o.line}”</p>
            <p className="mt-2 text-small text-fg-2">
              <span className="font-medium text-fg">Often means:</span> {o.means}
            </p>
          </div>

          <label className="block">
            <span className="text-small font-medium text-fg">Your answer, as you would say it</span>
            <textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value)
                setSavedNow(false)
              }}
              rows={5}
              placeholder="Say it out loud first, then type what you said."
              className="mt-1 w-full rounded-lg border border-border-input bg-surface p-3 text-body text-fg placeholder:text-fg-3"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="inline-flex h-10 items-center rounded-full bg-surface px-4 text-small font-medium text-fg ring-1 ring-inset ring-border-strong transition-colors duration-fast hover:bg-muted"
              onClick={() => {
                setText(o.weak)
                setSavedNow(false)
              }}
            >
              Load a weak answer
            </button>
            <button
              type="button"
              className="inline-flex h-10 items-center rounded-full bg-surface px-4 text-small font-medium text-fg ring-1 ring-inset ring-border-strong transition-colors duration-fast hover:bg-muted"
              onClick={() => {
                setText(o.answer)
                setSavedNow(false)
              }}
            >
              Load our sample
            </button>
            {text && (
              <button
                type="button"
                className="inline-flex h-10 items-center rounded-full bg-surface px-4 text-small font-medium text-fg ring-1 ring-inset ring-border-strong transition-colors duration-fast hover:bg-muted"
                onClick={() => setText('')}
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border p-3">
            <button
              type="button"
              className="inline-flex h-10 items-center rounded-full bg-surface px-4 text-small font-medium text-fg ring-1 ring-inset ring-border-strong transition-colors duration-fast hover:bg-muted"
              onClick={() => (running ? stopTimer() : startTimer())}
            >
              {running ? 'Stop' : elapsed === null ? 'Time it out loud' : 'Time it again'}
            </button>
            <span className="text-small tabular-nums text-fg">
              {elapsed === null
                ? `Aim for under 20 s. Gong’s average rep: ${GONG.avgMonologueSec} s.`
                : `${elapsed.toFixed(1)} s${
                    !running
                      ? elapsed <= 20
                        ? ' · under 20 s'
                        : elapsed <= GONG.avgMonologueSec
                          ? ' · close to the average rep'
                          : ' · longer than the average rep'
                      : ''
                  }`}
            </span>
            <span className="sr-only" aria-live="polite">
              {!running && elapsed !== null ? `Timed at ${elapsed.toFixed(1)} seconds.` : ''}
            </span>
          </div>
        </div>

        <div className="min-w-0">
          {checks.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border-strong p-6 text-center">
              <p className="font-medium text-fg">Type an answer to see the checks</p>
              <p className="mt-1 text-small text-fg-2">
                Or load the weak answer and see what it gets wrong.
              </p>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-h3 font-semibold tabular-nums text-fg">
                  {sc.points} / {sc.max}
                </p>
                <p className="text-small text-fg-2">
                  {words(text)} words · about {est} s out loud
                </p>
              </div>
              <ul className="mt-3 space-y-2">
                {checks.map((c) => (
                  <li key={c.id} className="flex gap-3 rounded-lg border border-border p-3">
                    <span
                      className={`mt-0.5 flex h-6 shrink-0 items-center rounded-full px-2 text-caption font-medium ${STATE[c.state].cls}`}
                    >
                      <span aria-hidden="true" className="mr-1">
                        {STATE[c.state].mark}
                      </span>
                      {STATE[c.state].label}
                    </span>
                    <div className="min-w-0 text-small">
                      <p className="font-medium text-fg">{c.label}</p>
                      <p className="text-fg-2">
                        {c.why}
                        {c.source && (
                          <>
                            {' '}
                            <a
                              className="text-signal-strong underline"
                              href={c.source.url}
                              target="_blank"
                              rel="noopener"
                              aria-label={`Source for "${c.label}" (opens in a new tab)`}
                            >
                              Source
                            </a>
                          </>
                        )}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-signal px-5 text-small font-semibold text-white shadow-e1 transition-colors duration-fast hover:bg-signal-strong"
                  onClick={save}
                >
                  Save my best on this device
                </button>
                <span className="text-small text-fg-2" aria-live="polite">
                  {savedNow
                    ? best && best.best > sc.points
                      ? `Kept your earlier best (${best.best}/${best.max}).`
                      : 'Saved.'
                    : best
                      ? `Your best: ${best.best}/${best.max}`
                      : ''}
                </span>
              </div>
            </>
          )}
          <p className="mt-4 text-small text-fg-2">
            {practised} of {OBJECTIONS.length} objections practised on this device.{' '}
            <a className="text-signal-strong underline" href={TTAI_URL}>
              Say it to an AI buyer that pushes back (our product)
            </a>
          </p>
          <p className="mt-2 text-caption text-fg-3">
            The checks are text rules, not a judge of tone. A good score on paper still needs saying
            out loud. Time estimate assumes 150 words a minute.
          </p>
        </div>
      </div>
    </div>
  )
}
