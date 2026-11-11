'use client'

// No-AI client islands for /<role>/concepts: a self-check quiz and "I can explain this" ticks.
// All questions, options and explanations are server-rendered in the page HTML; this file only
// records clicks. Progress is kept in this browser (localStorage, wrapped in try/catch) and never
// nags: no streaks, no timers, nothing resets.

import { useEffect, useState } from 'react'
import type { QuizItem } from '@/data/roleConcepts/types'

const read = (k: string) => {
  try {
    return JSON.parse(localStorage.getItem(k) || '[]') as string[]
  } catch {
    return []
  }
}
const write = (k: string, v: string[]) => {
  try {
    localStorage.setItem(k, JSON.stringify(v))
  } catch {
    /* storage blocked: ticks still work for this visit */
  }
}

/** "I can explain this" toggle on each concept card, with a shared count in the progress bar. */
export function ExplainTick({ slug, id }: { slug: string; id: string }) {
  const key = `concepts:${slug}`
  const [on, setOn] = useState(false)
  useEffect(() => setOn(read(key).includes(id)), [key, id])
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={() => {
        const cur = new Set(read(key))
        if (cur.has(id)) cur.delete(id)
        else cur.add(id)
        write(key, [...cur])
        setOn(cur.has(id))
        window.dispatchEvent(new Event('concepts-progress'))
      }}
      className={`inline-flex h-9 items-center gap-2 rounded-full px-3.5 text-caption font-semibold ring-1 ring-inset transition-colors duration-fast ${
        on
          ? 'bg-signal-tint text-signal-ink ring-signal/30'
          : 'bg-surface text-fg-2 ring-border-strong hover:bg-muted'
      }`}
    >
      <span
        aria-hidden="true"
        className={`flex h-4 w-4 items-center justify-center rounded border ${
          on ? 'border-signal bg-signal text-white' : 'border-border-input'
        }`}
      >
        {on && (
          <svg
            viewBox="0 0 12 12"
            className="h-3 w-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M2.5 6.5 5 9l4.5-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      I can explain this out loud
    </button>
  )
}

export function ExplainProgress({ slug, total }: { slug: string; total: number }) {
  const key = `concepts:${slug}`
  const [n, setN] = useState(0)
  useEffect(() => {
    const upd = () => setN(read(key).length)
    upd()
    window.addEventListener('concepts-progress', upd)
    return () => window.removeEventListener('concepts-progress', upd)
  }, [key])
  return (
    <div className="rounded-xl border border-border bg-surface p-4" aria-live="polite">
      <div className="flex items-baseline justify-between gap-3 text-small">
        <span className="font-semibold text-fg">Your progress</span>
        <span className="font-mono tabular-nums text-fg-2">
          {n} of {total} ticked
        </span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted" aria-hidden="true">
        <div
          className="h-full rounded-full bg-signal transition-[width] duration-base"
          style={{ width: `${(n / total) * 100}%` }}
        />
      </div>
      <p className="mt-2 text-caption text-fg-3">
        Tick a concept when you can explain it without notes. Saved in this browser only.
      </p>
    </div>
  )
}

/** Multiple-choice self-check. Answers and explanations are in the HTML (shown after a pick). */
export function Quiz({
  items,
  conceptNames,
}: {
  items: QuizItem[]
  conceptNames: Record<string, string>
}) {
  const [picked, setPicked] = useState<(number | null)[]>(() => items.map(() => null))
  const done = picked.filter((p) => p !== null).length
  const right = picked.filter((p, i) => p === items[i].answer).length
  const missed = items.filter((it, i) => picked[i] !== null && picked[i] !== it.answer)
  return (
    <div className="space-y-4">
      <div className="sticky top-[7.5rem] z-10 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-surface/95 px-4 py-3 text-small">
        <span className="font-semibold text-fg">
          Score: <span className="font-mono tabular-nums">{right}</span> of {done} answered
          <span className="text-fg-3"> · {items.length} questions</span>
        </span>
        {done > 0 && (
          <button
            type="button"
            onClick={() => setPicked(items.map(() => null))}
            className="inline-flex h-9 items-center rounded-full bg-surface px-3.5 text-caption font-semibold text-fg ring-1 ring-inset ring-border-strong hover:bg-muted"
          >
            Start again
          </button>
        )}
      </div>
      <ol className="space-y-3">
        {items.map((it, qi) => {
          const p = picked[qi]
          return (
            <li key={it.q} className="rounded-xl border border-border bg-surface p-5">
              <div className="flex gap-3">
                <span className="font-mono text-caption text-fg-3">
                  {String(qi + 1).padStart(2, '0')}
                </span>
                <p className="text-body font-medium text-fg">{it.q}</p>
              </div>
              <div
                className="mt-3 grid gap-2 sm:grid-cols-2"
                role="group"
                aria-label={`Question ${qi + 1} options`}
              >
                {it.options.map((o, oi) => {
                  const isAns = oi === it.answer
                  const isPick = p === oi
                  const state =
                    p === null
                      ? 'bg-surface text-fg ring-border-strong hover:bg-muted'
                      : isAns
                        ? 'bg-success-soft text-fg ring-success/40'
                        : isPick
                          ? 'bg-danger-soft text-fg ring-danger/40'
                          : 'bg-surface text-fg-3 ring-border'
                  return (
                    <button
                      key={o}
                      type="button"
                      aria-disabled={p !== null}
                      onClick={() => {
                        if (p !== null) return
                        setPicked((cur) => cur.map((c, i) => (i === qi ? oi : c)))
                      }}
                      className={`flex min-h-11 items-center justify-between gap-2 rounded-lg px-3.5 py-2 text-left text-small ring-1 ring-inset transition-colors duration-fast ${state}`}
                    >
                      <span>{o}</span>
                      {p !== null && isAns && (
                        <span className="text-caption font-semibold text-success">Correct</span>
                      )}
                      {p !== null && isPick && !isAns && (
                        <span className="text-caption font-semibold text-danger">Your pick</span>
                      )}
                    </button>
                  )
                })}
              </div>
              {p !== null && (
                <p className="mt-3 text-small leading-relaxed text-fg-2" aria-live="polite">
                  <span className="font-semibold text-fg">Why: </span>
                  {it.why}{' '}
                  <a
                    href={`#c-${it.concept}`}
                    className="font-medium text-signal-strong underline decoration-signal/30 underline-offset-2"
                  >
                    Review {conceptNames[it.concept]}
                  </a>
                </p>
              )}
            </li>
          )
        })}
      </ol>
      {done === items.length && (
        <div
          className="rounded-xl bg-signal-tint p-5 ring-1 ring-inset ring-signal/15"
          aria-live="polite"
        >
          <p className="text-body font-semibold text-fg">
            You got {right} of {items.length}.
          </p>
          <p className="mt-1 text-small text-fg-2">
            {missed.length === 0
              ? 'Every concept checked. Now practise saying the answers out loud on the interview questions.'
              : `Review these before the interview: ${[...new Set(missed.map((m) => conceptNames[m.concept]))].join('; ')}.`}
          </p>
        </div>
      )}
    </div>
  )
}
