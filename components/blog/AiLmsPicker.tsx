'use client'

import { useMemo, useState } from 'react'
import { CAPABILITIES, CHECKED, PLATFORMS, type Capability } from '@/data/aiLmsData'

const usd = (n: number) =>
  `$${n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`

export default function AiLmsPicker() {
  const [learners, setLearners] = useState(40)
  const [need, setNeed] = useState<Capability[]>(['authoring', 'practice'])
  const [pricedOnly, setPricedOnly] = useState(false)

  const rows = useMemo(() => {
    const out = PLATFORMS.filter((p) => need.every((c) => p.ai[c])).map((p) => ({
      p,
      c: p.cost(learners),
    }))
    const shown = pricedOnly ? out.filter((r) => r.c.annual !== null) : out
    return shown.sort((a, b) => {
      if (a.c.annual === null && b.c.annual === null) return 0
      if (a.c.annual === null) return 1
      if (b.c.annual === null) return -1
      return a.c.annual - b.c.annual
    })
  }, [learners, need, pricedOnly])

  const toggle = (c: Capability) =>
    setNeed((cur) => (cur.includes(c) ? cur.filter((x) => x !== c) : [...cur, c]))

  return (
    <div className="not-prose my-8 rounded-2xl border border-border bg-surface p-5 md:p-6">
      <p className="font-mono text-kicker uppercase tracking-[0.08em] text-fg-3">
        AI LMS shortlist · {PLATFORMS.length - 1} LMS + 1 practice layer · prices checked {CHECKED}
      </p>
      <fieldset className="mt-4">
        <legend className="text-small font-medium text-fg">Must-have AI features</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {CAPABILITIES.map((c) => (
            <label
              key={c.id}
              className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border border-border px-3 text-small text-fg hover:border-border-strong"
            >
              <input
                type="checkbox"
                checked={need.includes(c.id)}
                onChange={() => toggle(c.id)}
                className="h-4 w-4 accent-accent"
              />
              {c.label}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-small font-medium text-fg">Learners</span>
          <input
            type="number"
            inputMode="numeric"
            min={1}
            max={100000}
            value={learners}
            onChange={(e) => {
              const v = Math.round(Number(e.target.value))
              if (!Number.isNaN(v)) setLearners(Math.min(100000, Math.max(1, v)))
            }}
            className="focus-visible:ring-accent-strong mt-1.5 h-11 w-full rounded-lg border border-border-input bg-surface px-3 text-small tabular-nums text-fg focus:outline-none focus-visible:ring-2"
          />
        </label>
        <label className="flex min-h-11 cursor-pointer items-center gap-3 self-end text-small text-fg">
          <input
            type="checkbox"
            checked={pricedOnly}
            onChange={(e) => setPricedOnly(e.target.checked)}
            className="h-4 w-4 accent-accent"
          />
          Only platforms with a published price
        </label>
      </div>
      <p className="mt-6 text-small text-fg-2" aria-live="polite">
        {rows.length === 0
          ? 'No platform names all of those features on its site. Untick one to widen the list.'
          : `${rows.length} platform${rows.length === 1 ? '' : 's'} name every feature you ticked.`}
      </p>
      {rows.length > 0 && (
        <ol className="mt-3 divide-y divide-border border-y border-border text-small">
          {rows.map(({ p, c }) => (
            <li key={p.id} className="flex items-start justify-between gap-4 py-3">
              <div className="min-w-0">
                <a
                  href={p.pricingUrl}
                  target="_blank"
                  rel="noopener"
                  className="hover:text-accent-strong font-medium text-fg underline decoration-border-strong underline-offset-2"
                >
                  {p.name}
                </a>
                {p.ours && <span className="text-fg-2"> (our product, practice layer)</span>}
                <span className="block text-caption text-fg-3">{c.note}</span>
              </div>
              <div className="shrink-0 text-right tabular-nums text-fg">
                {c.annual === null
                  ? 'Quote'
                  : `${c.note.startsWith('From') ? 'from ' : ''}${usd(c.annual)}/yr`}
              </div>
            </li>
          ))}
        </ol>
      )}
      <p className="mt-3 text-caption text-fg-3">
        A platform shows only if its own site names every feature you ticked. Year-one list price
        before tax, discounts and setup. Runs in your browser; nothing is sent anywhere.
      </p>
    </div>
  )
}
