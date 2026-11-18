'use client'

import { useState } from 'react'
import { yearCosts, KIND_LABEL, CHECKED, usd, PLATFORMS } from '@/data/salesTrainingPlatforms'

const field =
  'mt-1.5 h-11 w-full rounded-lg border border-border-input bg-surface px-3 text-small text-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-signal tabular-nums'

/** Year-one list cost at your team size, across the four kinds, published prices only. */
export default function SalesTrainingCostCalc() {
  const [text, setText] = useState('20')
  const parsed = Math.round(Number(text))
  const reps = Number.isNaN(parsed) ? 20 : Math.min(500, Math.max(1, parsed))
  const lines = yearCosts(reps).sort((a, b) => a.y.usd - b.y.usd)
  const shown = new Set(lines.map((l) => l.id))
  const dropped = PLATFORMS.filter((p) => p.year && !shown.has(p.id)).map((p) => p.name)
  return (
    <section
      aria-label="Sales training cost calculator"
      className="not-prose my-8 rounded-2xl border border-border bg-surface p-4 md:p-6"
    >
      <p className="font-mono text-caption uppercase tracking-[0.06em] text-signal-strong">
        Calculator · published prices only
      </p>
      <label className="mt-3 block max-w-xs">
        <span className="text-small font-medium text-fg">People you will train</span>
        <input
          type="number"
          inputMode="numeric"
          min={1}
          max={500}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={() => setText(String(reps))}
          className={field}
        />
      </label>
      <p className="mt-4 text-small text-fg" aria-live="polite">
        For {reps} {reps === 1 ? 'person' : 'people'}, {lines.length} options publish a price you
        can cost today. Quote-only vendors are left out because they show no number.
      </p>
      <ul className="mt-3 divide-y divide-border border-y border-border">
        {lines.map((l) => (
          <li key={l.id} className="flex flex-wrap items-baseline justify-between gap-x-4 py-3">
            <span className="text-small text-fg">
              <a
                href={l.url}
                target="_blank"
                rel="noopener"
                className="font-medium underline-offset-2 hover:underline"
              >
                {l.name}
              </a>
              {l.ours ? ' (our product)' : ''}
              <span className="block text-caption text-fg-3">
                {KIND_LABEL[l.kind]} · {l.y.basis}
              </span>
            </span>
            <span className="text-small font-semibold tabular-nums text-fg">
              {l.y.usd === 0
                ? 'Free'
                : l.kind === 'programme'
                  ? `${usd(l.y.usd)} once`
                  : `${usd(l.y.usd)} a year`}
            </span>
          </li>
        ))}
      </ul>
      {dropped.length > 0 && (
        <p className="mt-3 text-caption text-fg-3">
          Not shown at this size (outside the published plan limits, so a quote):{' '}
          {dropped.join(', ')}.
        </p>
      )}
      <p className="mt-2 text-caption text-fg-3">
        US dollar list prices before tax, read on each vendor&apos;s page ({CHECKED}; AI practice
        tools 13 Nov 2026). Not included: tax or GST, setup, discounts, or your reps&apos; time. A
        live course is taught once; seats and plans renew every year.
      </p>
    </section>
  )
}
