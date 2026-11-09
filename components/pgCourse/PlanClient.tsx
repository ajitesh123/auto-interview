'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import type { PlanMonth } from '@/data/pgCourse/types'

// "If Paul Graham mentored you for 6 months": month cards with ticks saved on this device
// (localStorage aiv:pgplan, no login). All content is server-rendered; only the ticks are client.

const KEY = 'aiv:pgplan'
type Ticks = Record<string, number>

function read(): Ticks {
  try {
    const raw = window.localStorage.getItem(KEY)
    const t = raw ? (JSON.parse(raw) as Ticks) : {}
    return t && typeof t === 'object' ? t : {}
  } catch {
    return {}
  }
}

function useTicks(): [Ticks, (id: string) => void] {
  const [t, setT] = useState<Ticks>({})
  useEffect(() => {
    const sync = () => setT(read())
    sync()
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [])
  const toggle = useCallback((id: string) => {
    const next = { ...read() }
    if (next[id]) delete next[id]
    else next[id] = Date.now()
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next))
    } catch {
      /* storage blocked: ticks just aren't remembered */
    }
    setT(next)
  }, [])
  return [t, toggle]
}

const kicker = 'font-mono text-kicker uppercase tracking-[0.08em]'

const Tick = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.25}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="h-3.5 w-3.5"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

function Bar({ pct, label }: { pct: number; label: string }) {
  return (
    <div
      className="h-1.5 overflow-hidden rounded-full bg-muted"
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <div
        className="h-full rounded-full bg-signal transition-[width] duration-slow"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

export default function PlanClient({
  months,
  lessonTitles,
  basePath,
}: {
  months: PlanMonth[]
  lessonTitles: Record<string, string>
  basePath: string
}) {
  const [ticks, toggle] = useTicks()
  const all = months.flatMap((m) => m.actions.map((a) => a.id))
  const doneAll = all.filter((id) => ticks[id]).length
  const pctAll = all.length ? Math.round((doneAll / all.length) * 100) : 0

  return (
    <div>
      {/* Overall progress */}
      <div className="max-w-xl rounded-xl border border-border bg-surface p-5">
        <div className="flex items-baseline justify-between gap-3">
          <span className={`${kicker} text-fg-3`}>Your 6 months · saved on this device</span>
          <span className="text-small font-semibold tabular-nums text-fg">
            {doneAll} of {all.length} done
          </span>
        </div>
        <div className="mt-3">
          <Bar pct={pctAll} label="Plan actions completed" />
        </div>
      </div>

      <ol className="mt-10 space-y-0" aria-label="Six-month plan">
        {months.map((m, mi) => {
          const ids = m.actions.map((a) => a.id)
          const done = ids.filter((id) => ticks[id]).length
          const complete = done === ids.length && ids.length > 0
          const last = mi === months.length - 1
          return (
            <li
              key={m.month}
              id={`month-${m.month}`}
              className="relative scroll-mt-24 sm:grid sm:grid-cols-[40px_minmax(0,1fr)] sm:gap-4 md:grid-cols-[56px_minmax(0,1fr)] md:gap-6"
            >
              {/* Rail */}
              <div aria-hidden="true" className="relative hidden justify-center sm:flex">
                <span
                  className={`relative z-10 flex h-10 w-10 flex-col items-center justify-center rounded-full font-mono tabular-nums ring-1 ring-inset transition-colors duration-fast md:h-14 md:w-14 ${
                    complete ? 'bg-signal text-white ring-signal' : 'bg-ink text-ink-fg ring-ink'
                  }`}
                >
                  {complete ? (
                    <Tick />
                  ) : (
                    <>
                      <span className="hidden text-[10px] leading-none text-ink-fg-2 md:block">
                        MONTH
                      </span>
                      <span className="text-small font-semibold leading-none md:mt-0.5 md:text-body">
                        {m.month}
                      </span>
                    </>
                  )}
                </span>
                {!last && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 top-11 w-px bg-border md:top-16"
                  />
                )}
              </div>

              {/* Card: one month, collapsible (content stays in the HTML) */}
              <details
                data-reveal
                open={mi === 0}
                className={`group min-w-0 overflow-hidden rounded-2xl border border-border bg-surface open:shadow-e1 ${last ? '' : 'mb-6 md:mb-8'}`}
              >
                <summary className="block cursor-pointer list-none p-5 md:p-7 [&::-webkit-details-marker]:hidden">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <div className={`${kicker} text-signal-strong`}>
                      Month {m.month} of {months.length}
                    </div>
                    <div className="text-caption tabular-nums text-fg-3">
                      {done} of {ids.length} actions done
                    </div>
                  </div>
                  <h3 className="mt-2 text-h3 font-semibold text-fg">{m.theme}</h3>
                  <p className="mt-2 max-w-[64ch] text-body text-fg-2">
                    <span className="font-medium text-fg">By the end of the month: </span>
                    {m.goal}
                  </p>
                  <div className="mt-4">
                    <Bar
                      pct={Math.round((done / ids.length) * 100)}
                      label={`Month ${m.month} progress`}
                    />
                  </div>
                  <span className="mt-4 inline-flex min-h-9 items-center gap-1.5 text-small font-semibold text-signal-strong">
                    <span className="group-open:hidden">Show the {ids.length} actions</span>
                    <span className="hidden group-open:inline">Hide the actions</span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.75}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform duration-base group-open:rotate-180"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </span>
                </summary>

                {m.lessons.some((s) => lessonTitles[s]) && (
                  <div className="border-t border-border px-5 py-4 md:px-7">
                    <div className={`${kicker} text-fg-3`}>Study</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {m.lessons
                        .filter((s) => lessonTitles[s])
                        .map((s) => (
                          <Link
                            key={s}
                            href={`${basePath}/${s}`}
                            className="inline-flex min-h-9 items-center rounded-full bg-signal-tint px-3.5 py-1.5 text-small font-medium text-signal-strong transition-colors duration-fast hover:bg-signal/15"
                          >
                            {lessonTitles[s]} →
                          </Link>
                        ))}
                    </div>
                  </div>
                )}

                <ul className="divide-y divide-border border-t border-border">
                  {m.actions.map((a) => {
                    const on = Boolean(ticks[a.id])
                    return (
                      <li key={a.id} className="flex gap-4 px-5 py-4 md:px-7 md:py-5">
                        <button
                          type="button"
                          role="checkbox"
                          aria-checked={on}
                          aria-labelledby={`${a.id}-t`}
                          onClick={() => toggle(a.id)}
                          className="-m-2.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
                        >
                          <span
                            className={`flex h-6 w-6 items-center justify-center rounded-md ring-1 ring-inset transition-colors duration-fast ${
                              on
                                ? 'bg-signal text-white ring-signal'
                                : 'bg-surface text-transparent ring-border-input hover:ring-fg-2'
                            }`}
                          >
                            <Tick />
                          </span>
                        </button>
                        <div className="min-w-0 flex-1">
                          <p
                            id={`${a.id}-t`}
                            className={`text-body font-medium transition-colors duration-fast ${on ? 'text-fg-3 line-through decoration-fg-3/60' : 'text-fg'}`}
                          >
                            {a.text}
                          </p>
                          <p className="mt-1 max-w-[68ch] text-small leading-relaxed text-fg-2">
                            {a.why}
                          </p>
                          <a
                            href={a.source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1.5 inline-flex min-h-8 items-center gap-1 text-caption font-medium text-fg-2 underline decoration-border-strong underline-offset-4 hover:text-fg hover:decoration-fg"
                          >
                            Source: {a.source.label} ↗
                          </a>
                        </div>
                      </li>
                    )
                  })}
                </ul>

                <div className="flex flex-col gap-1.5 bg-signal-tint p-5 ring-1 ring-inset ring-signal/10 sm:flex-row sm:gap-4 md:px-7">
                  <span className={`${kicker} shrink-0 pt-0.5 text-signal-ink`}>Checkpoint</span>
                  <p className="text-small font-medium leading-relaxed text-fg md:text-body">
                    {m.checkpoint}
                  </p>
                </div>
              </details>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
