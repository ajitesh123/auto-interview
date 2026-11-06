'use client'

import { useMemo, useState } from 'react'
import { annualCosts, CHECKED, WORKED } from '@/data/salesLmsPricing'

const usd = (n: number) =>
  `$${n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`

function Field({
  label,
  value,
  onChange,
  min,
  max,
  step,
  suffix,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step: number
  suffix: string
}) {
  return (
    <label className="block">
      <span className="text-small font-medium text-fg">{label}</span>
      <span className="mt-1.5 flex items-center gap-2">
        <input
          type="number"
          inputMode="numeric"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => {
            const v = Number(e.target.value)
            if (!Number.isNaN(v)) onChange(Math.min(max, Math.max(min, Math.round(v))))
          }}
          className="h-11 w-full rounded-lg border border-border-input bg-surface px-3 text-small tabular-nums text-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-strong"
        />
        <span className="shrink-0 text-caption text-fg-3">{suffix}</span>
      </span>
    </label>
  )
}

export default function SalesLmsCalculator() {
  const [reps, setReps] = useState(WORKED.reps)
  const [mins, setMins] = useState(WORKED.minutesPerRep)
  const lines = useMemo(() => annualCosts(reps, mins), [reps, mins])

  return (
    <div className="not-prose my-8 rounded-2xl border border-border bg-surface p-5 md:p-6">
      <p className="font-mono text-kicker uppercase tracking-[0.08em] text-fg-3">
        Sales LMS cost calculator · list prices checked {CHECKED}
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Field
          label="Sales reps"
          value={reps}
          onChange={setReps}
          min={1}
          max={1000}
          step={1}
          suffix="people"
        />
        <Field
          label="Spoken practice per rep"
          value={mins}
          onChange={setMins}
          min={0}
          max={600}
          step={5}
          suffix="min / month"
        />
      </div>
      <dl
        className="mt-6 divide-y divide-border border-y border-border text-small"
        aria-live="polite"
      >
        {lines.map((l) => (
          <div key={l.id} className="flex items-start justify-between gap-4 py-3">
            <dt className="min-w-0">
              <span className={l.ours ? 'font-medium text-signal-strong' : 'font-medium text-fg'}>
                {l.name}
              </span>
              <span className="block text-caption text-fg-3">{l.note}</span>
            </dt>
            <dd className="shrink-0 text-right tabular-nums text-fg">
              {l.annual === null
                ? 'Quote'
                : `${l.note.startsWith('From') ? 'from ' : ''}${usd(l.annual)}/yr`}
              {l.annual !== null && !l.note.startsWith('From') && (
                <span className="block text-caption text-fg-3">{usd(l.annual / reps)} per rep</span>
              )}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-caption text-fg-3">
        Published list prices only, before tax, discounts and setup fees. &quot;From&quot; prices
        are the lowest tier, so real quotes for your team can be higher. Mindtickle, Seismic,
        Highspot, Allego, Showpad and Docebo do not publish prices.
      </p>
    </div>
  )
}
