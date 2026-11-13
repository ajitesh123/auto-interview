'use client'

// No-AI client islands for /<role>/interview-tips: a self-score checklist per round and the
// interview-week checklist. Every item is server-rendered as a real checkbox label in the HTML;
// this file only remembers ticks in this browser (localStorage, wrapped in try/catch). No streaks,
// no timers, nothing resets.

import { useEffect, useState } from 'react'

const read = (k: string): string[] => {
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

function useTicks(key: string) {
  const [ticks, setTicks] = useState<string[]>([])
  useEffect(() => setTicks(read(key)), [key])
  const toggle = (id: string) => {
    const cur = new Set(read(key))
    if (cur.has(id)) cur.delete(id)
    else cur.add(id)
    const next = [...cur]
    write(key, next)
    setTicks(next)
  }
  const clear = (ids: string[]) => {
    const next = read(key).filter((x) => !ids.includes(x))
    write(key, next)
    setTicks(next)
  }
  return { ticks, toggle, clear }
}

function Box({ on }: { on: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border peer-focus-visible:ring-2 peer-focus-visible:ring-signal-strong peer-focus-visible:ring-offset-2 ${
        on ? 'border-signal bg-signal text-white' : 'border-border-input bg-surface'
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
          <path d="m2.5 6.2 2.3 2.3 4.7-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
  )
}

/** "Score your practice answer": tick what your answer did; the line under it says what to fix. */
export function SelfScore({
  slug,
  round,
  items,
}: {
  slug: string
  round: string
  items: string[]
}) {
  const { ticks, toggle, clear } = useTicks(`tips:${slug}:score`)
  const ids = items.map((_, i) => `${round}:${i}`)
  const done = ids.filter((id) => ticks.includes(id)).length
  const firstMissing = items.find((_, i) => !ticks.includes(ids[i]))
  return (
    <fieldset className="rounded-xl border border-border bg-surface p-4">
      <legend className="px-1 text-small font-semibold text-fg">
        Score one practice answer out loud
      </legend>
      <ul className="mt-1 space-y-1">
        {items.map((it, i) => {
          const on = ticks.includes(ids[i])
          return (
            <li key={it}>
              <label className="flex min-h-11 cursor-pointer items-start gap-3 rounded-lg px-1 py-2 text-small text-fg-2 hover:bg-muted/60">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={on}
                  onChange={() => toggle(ids[i])}
                />
                <Box on={on} />
                <span className={on ? 'text-fg' : ''}>{it}</span>
              </label>
            </li>
          )
        })}
      </ul>
      <div
        className="mt-2 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3 text-caption"
        aria-live="polite"
      >
        <span className="font-mono tabular-nums text-fg-2">
          {done} of {items.length}
          {done === items.length
            ? ' · ready for this round'
            : firstMissing
              ? ` · not yet: “${firstMissing}”`
              : ''}
        </span>
        {done > 0 && (
          <button
            type="button"
            onClick={() => clear(ids)}
            className="rounded-full px-2.5 py-1 text-fg-3 underline-offset-2 hover:text-fg hover:underline"
          >
            Clear for the next answer
          </button>
        )}
      </div>
    </fieldset>
  )
}

/** The interview-week checklist. */
export function WeekChecklist({
  slug,
  groups,
}: {
  slug: string
  groups: { when: string; items: string[] }[]
}) {
  const { ticks, toggle } = useTicks(`tips:${slug}:week`)
  const total = groups.reduce((n, g) => n + g.items.length, 0)
  const done = ticks.length
  return (
    <div>
      <div className="mb-4 max-w-md">
        <div className="flex items-baseline justify-between text-caption text-fg-2">
          <span>Your interview week</span>
          <span className="font-mono tabular-nums">
            {Math.min(done, total)} of {total} done
          </span>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-signal transition-[width] duration-base"
            style={{ width: `${(Math.min(done, total) / total) * 100}%` }}
          />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {groups.map((g) => (
          <fieldset key={g.when} className="rounded-xl border border-border bg-surface p-4">
            <legend className="px-1 font-mono text-kicker uppercase tracking-[0.08em] text-signal-strong">
              {g.when}
            </legend>
            <ul className="mt-1 space-y-1">
              {g.items.map((it) => {
                const id = `${g.when}:${it}`
                const on = ticks.includes(id)
                return (
                  <li key={it}>
                    <label className="flex min-h-11 cursor-pointer items-start gap-3 rounded-lg px-1 py-2 text-small text-fg-2 hover:bg-muted/60">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={on}
                        onChange={() => toggle(id)}
                      />
                      <Box on={on} />
                      <span className={on ? 'text-fg line-through decoration-fg-3' : ''}>{it}</span>
                    </label>
                  </li>
                )
              })}
            </ul>
          </fieldset>
        ))}
      </div>
    </div>
  )
}
