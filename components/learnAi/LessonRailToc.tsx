'use client'

import { useEffect, useState } from 'react'

export type RailItem = { id: string; label: string; n?: number }

/**
 * "In this lesson" map for the desktop rail of a lesson. The list is server-rendered as plain
 * anchor links; this island only marks the section in view (IntersectionObserver) and fills a
 * thin progress line. Transitions are CSS and stop under prefers-reduced-motion (global rule).
 */
export default function LessonRailToc({ items }: { items: RailItem[] }) {
  const [active, setActive] = useState(-1)

  useEffect(() => {
    const els = items
      .map((it) => document.getElementById(it.id))
      .filter((el): el is HTMLElement => !!el)
    // The rail only shows at lg+; skip the work on phones and tablets.
    if (!window.matchMedia('(min-width: 1024px)').matches) return
    if (!els.length || typeof IntersectionObserver === 'undefined') return
    const onScroll = () => {
      // The last section whose top has passed 40% of the viewport is the one being read.
      const line = window.innerHeight * 0.4
      let idx = -1
      els.forEach((el, i) => {
        if (el.getBoundingClientRect().top <= line) idx = i
      })
      setActive(idx)
    }
    const io = new IntersectionObserver(onScroll, {
      rootMargin: '0px 0px -60% 0px',
      threshold: [0, 1],
    })
    els.forEach((el) => io.observe(el))
    onScroll()
    return () => io.disconnect()
  }, [items])

  const steps = items.filter((it) => it.n !== undefined).length
  const current = active >= 0 ? items[active] : undefined
  // Progress follows the label: step N of the steps, full once past the last step.
  const pct = !current ? 0 : current.n !== undefined ? Math.round((current.n / steps) * 100) : 100

  return (
    <nav aria-label="In this lesson">
      <div className="flex items-baseline justify-between gap-2">
        <span className="font-mono text-kicker uppercase tracking-[0.08em] text-fg-3">
          In this lesson
        </span>
        <span className="text-caption tabular-nums text-fg-3">
          {current?.n !== undefined
            ? `Step ${current.n} of ${steps}`
            : current
              ? current.label
              : `${steps} steps`}
        </span>
      </div>
      <div className="mt-2 h-0.5 overflow-hidden rounded-full bg-border" aria-hidden="true">
        <div
          className="h-full rounded-full bg-signal transition-[width] duration-slow ease-standard"
          style={{ width: `${pct}%` }}
        />
      </div>
      <ol className="mt-3 space-y-0.5">
        {items.map((it, i) => {
          const on = i === active
          const done = i < active
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                aria-current={on ? 'location' : undefined}
                className={`group flex items-start gap-2.5 rounded-lg px-2 py-1.5 text-small leading-snug transition-colors duration-fast focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-signal-strong ${
                  on ? 'bg-signal-tint text-fg' : 'text-fg-2 hover:bg-muted hover:text-fg'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`mt-[0.45em] h-2 w-2 shrink-0 rounded-full ring-1 ring-inset transition-colors duration-base ${
                    on
                      ? 'bg-signal ring-signal'
                      : done
                        ? 'bg-signal/40 ring-signal/40'
                        : 'bg-surface ring-border-strong'
                  }`}
                />
                <span className="min-w-0">
                  {it.n !== undefined && (
                    <span className="mr-1 font-mono text-caption tabular-nums text-fg-3">
                      {it.n}.
                    </span>
                  )}
                  {it.label}
                </span>
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
