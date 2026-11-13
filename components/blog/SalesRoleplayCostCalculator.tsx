'use client'

import { useState } from 'react'
import { teamCosts, usd, CHECKED } from '@/data/salesRoleplayData'

const field =
  'mt-1.5 h-11 w-full rounded-lg border border-border-input bg-surface px-3 text-small text-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-signal tabular-nums'

/** Number field that keeps what you type and only clamps when you leave the field. */
function Num({
  label,
  value,
  onChange,
  min,
  max,
  hint,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  hint?: string
}) {
  const [text, setText] = useState(String(value))
  const [focused, setFocused] = useState(false)
  return (
    <label className="block">
      <span className="text-small font-medium text-fg">{label}</span>
      <input
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        step={1}
        value={focused ? text : String(value)}
        onFocus={() => {
          setText(String(value))
          setFocused(true)
        }}
        onChange={(e) => {
          setText(e.target.value)
          const v = Math.round(Number(e.target.value))
          if (e.target.value !== '' && !Number.isNaN(v) && v >= min && v <= max) onChange(v)
        }}
        onBlur={() => {
          const v = Math.round(Number(text))
          onChange(Number.isNaN(v) || text === '' ? value : Math.min(max, Math.max(min, v)))
          setFocused(false)
        }}
        className={field}
      />
      {hint && <span className="mt-1 block text-caption text-fg-3">{hint}</span>}
    </label>
  )
}

/** Year-one list cost at your team size, from the published per-seat prices only. */
export default function SalesRoleplayCostCalculator() {
  const [reps, setReps] = useState(15)
  const [mins, setMins] = useState(30)
  const lines = teamCosts(reps, mins)
  const priced = lines.filter((l) => l.annual !== null) as { annual: number; name: string }[]
  const low = priced.reduce((a, b) => (b.annual < a.annual ? b : a), priced[0])
  return (
    <section
      aria-label="AI sales roleplay cost calculator"
      className="not-prose my-8 rounded-2xl border border-border bg-surface p-4 md:p-6"
    >
      <p className="font-mono text-caption uppercase tracking-[0.06em] text-signal-strong">
        Calculator · published prices only
      </p>
      <div className="mt-3 grid gap-4 sm:grid-cols-2">
        <Num label="Reps who will practise" value={reps} onChange={setReps} min={1} max={50} />
        <Num
          label="Practice minutes per rep per month"
          value={mins}
          onChange={setMins}
          min={5}
          max={600}
          hint="30 minutes is about one 5-minute call every working day for a week and a half."
        />
      </div>
      <p className="mt-4 text-small text-fg" aria-live="polite">
        For {reps} {reps === 1 ? 'rep' : 'reps'} at {mins} minutes a month, the lowest published
        year-one list price here is <strong>{usd(low.annual)}</strong> ({low.name}). Quote-only
        tools are not in this list because they publish no number.
      </p>
      <ul className="mt-3 divide-y divide-border border-y border-border">
        {lines.map((l) => (
          <li key={l.id} className="flex flex-wrap items-baseline justify-between gap-x-4 py-3">
            <span className="text-small text-fg">
              <span className="font-medium">{l.name}</span>
              <span className="block text-caption text-fg-3">{l.basis}</span>
            </span>
            <span className="text-small font-semibold tabular-nums text-fg">
              {l.annual === null ? 'Quote' : `${usd(l.annual)} a year`}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-caption text-fg-3">
        List prices in US dollars before tax, read on each pricing page on {CHECKED}. Not included:
        sales tax or GST, setup, your reps&apos; time, or discounts. Trellus includes a dialer; Exec
        includes an LMS; Tough Tongue AI plans share a pool of minutes across seats.
      </p>
    </section>
  )
}
