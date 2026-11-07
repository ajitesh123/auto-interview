'use client'

import { useMemo, useState } from 'react'
import {
  CHECKED,
  FX_URL,
  SEGMENTS,
  PLATFORMS,
  USD_INR,
  USD_INR_DATE,
  costRows,
  formatInr,
  type Buyer,
  type Segment,
} from '@/data/indiaLmsData'

export default function IndiaLmsCalculator() {
  const [learners, setLearners] = useState(100)
  const [buyer, setBuyer] = useState<Buyer>('itc')
  const [fx, setFx] = useState(USD_INR)
  const [segment, setSegment] = useState<Segment | 'all'>('all')

  const rows = useMemo(() => {
    const ids = new Set(
      PLATFORMS.filter((p) => segment === 'all' || p.segments.includes(segment)).map((p) => p.id)
    )
    return costRows(learners, buyer, fx)
      .filter((r) => ids.has(r.id))
      .sort((a, b) => {
        if (a.netInr === null && b.netInr === null) return 0
        if (a.netInr === null) return 1
        if (b.netInr === null) return -1
        return a.netInr - b.netInr
      })
  }, [learners, buyer, fx, segment])

  const priced = rows.filter((r) => r.netInr !== null).length

  return (
    <div className="not-prose my-8 rounded-2xl border border-border bg-surface p-5 md:p-6">
      <p className="font-mono text-kicker uppercase tracking-[0.08em] text-fg-3">
        India LMS cost calculator · INR with GST · prices checked {CHECKED}
      </p>
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
        <label className="block">
          <span className="text-small font-medium text-fg">₹ per US dollar</span>
          <input
            type="number"
            inputMode="decimal"
            min={50}
            max={200}
            step={0.01}
            value={fx}
            onChange={(e) => {
              const v = Number(e.target.value)
              if (!Number.isNaN(v) && v > 0) setFx(Math.min(200, v))
            }}
            className="focus-visible:ring-accent-strong mt-1.5 h-11 w-full rounded-lg border border-border-input bg-surface px-3 text-small tabular-nums text-fg focus:outline-none focus-visible:ring-2"
          />
          <span className="mt-1 block text-caption text-fg-3">
            Default:{' '}
            <a href={FX_URL} target="_blank" rel="noopener" className="underline">
              RBI reference rate
            </a>{' '}
            on {USD_INR_DATE}
          </span>
        </label>
        <label className="block">
          <span className="text-small font-medium text-fg">Who is it for</span>
          <select
            value={segment}
            onChange={(e) => setSegment(e.target.value as Segment | 'all')}
            className="focus-visible:ring-accent-strong mt-1.5 h-11 w-full rounded-lg border border-border-input bg-surface px-3 text-small text-fg focus:outline-none focus-visible:ring-2"
          >
            <option value="all">All platforms</option>
            {SEGMENTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
        <fieldset>
          <legend className="text-small font-medium text-fg">
            Can you claim GST input credit?
          </legend>
          <div className="mt-1.5 grid gap-2">
            {(
              [
                ['itc', 'Yes, GST-registered business'],
                ['no-itc', 'No (individual, school, unregistered)'],
              ] as [Buyer, string][]
            ).map(([id, label]) => (
              <label
                key={id}
                className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border border-border px-3 text-small text-fg hover:border-border-strong"
              >
                <input
                  type="radio"
                  name="india-lms-buyer"
                  checked={buyer === id}
                  onChange={() => setBuyer(id)}
                  className="h-4 w-4 accent-accent"
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>
      </div>
      <p className="mt-6 text-small text-fg-2" aria-live="polite">
        {priced} of {rows.length} platforms publish a price that fits{' '}
        {learners.toLocaleString('en-IN')} learner{learners === 1 ? '' : 's'}. Sorted by what you
        pay in year one
        {buyer === 'itc' ? ' after claiming GST back' : ' including 18% GST'}.
      </p>
      <ol className="mt-3 divide-y divide-border border-y border-border text-small">
        {rows.map((r) => (
          <li key={r.id} className="flex items-start justify-between gap-4 py-3">
            <div className="min-w-0">
              <span className="font-medium text-fg">{r.name}</span>
              {r.ours && <span className="text-fg-2"> (our product, practice layer)</span>}
              <span className="block text-caption text-fg-3">{r.note}</span>
              {r.listInr !== null && (
                <span className="block text-caption text-fg-3">
                  {r.route}: GST {formatInr(r.gstInr as number)}
                </span>
              )}
            </div>
            <div className="shrink-0 text-right tabular-nums text-fg">
              {r.netInr === null
                ? 'Quote'
                : `${r.note.startsWith('From') ? 'from ' : ''}${formatInr(r.netInr)}/yr`}
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-caption text-fg-3">
        Year-one list price before discounts, setup and bank forex fees. Runs in your browser;
        nothing is sent anywhere.
      </p>
    </div>
  )
}
