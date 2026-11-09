'use client'

import { useMemo, useState } from 'react'
import {
  CHECKED,
  FX_URL,
  PLATFORMS,
  SEGMENTS,
  USD_AED,
  ZONES,
  costRows,
  formatAed,
  type Buyer,
  type Segment,
  type Zone,
} from '@/data/uaeLmsData'

const field =
  'focus-visible:ring-accent-strong mt-1.5 h-11 w-full rounded-lg border border-border-input bg-surface px-3 text-small text-fg focus:outline-none focus-visible:ring-2'

export default function UaeLmsCalculator() {
  const [learners, setLearners] = useState(100)
  const [buyer, setBuyer] = useState<Buyer>('registered')
  const [segment, setSegment] = useState<Segment | 'all'>('all')
  const [zone, setZone] = useState<Zone>('mainland')

  const rows = useMemo(() => {
    const ids = new Set(
      PLATFORMS.filter((p) => segment === 'all' || p.segments.includes(segment)).map((p) => p.id)
    )
    return costRows(learners, buyer)
      .filter((r) => ids.has(r.id))
      .sort((a, b) => {
        if (a.netAed === null && b.netAed === null) return 0
        if (a.netAed === null) return 1
        if (b.netAed === null) return -1
        return a.netAed - b.netAed
      })
  }, [learners, buyer, segment])

  const priced = rows.filter((r) => r.netAed !== null).length
  const z = ZONES.find((x) => x.id === zone) ?? ZONES[0]

  return (
    <div className="not-prose my-8 rounded-2xl border border-border bg-surface p-5 md:p-6">
      <p className="font-mono text-kicker uppercase tracking-[0.08em] text-fg-3">
        UAE LMS cost calculator · AED with 5% VAT · prices checked {CHECKED}
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
            className={`${field} tabular-nums`}
          />
        </label>
        <label className="block">
          <span className="text-small font-medium text-fg">Who is it for</span>
          <select
            value={segment}
            onChange={(e) => setSegment(e.target.value as Segment | 'all')}
            className={field}
          >
            <option value="all">All platforms</option>
            {SEGMENTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-small font-medium text-fg">Where is your company set up?</span>
          <select value={zone} onChange={(e) => setZone(e.target.value as Zone)} className={field}>
            {ZONES.map((x) => (
              <option key={x.id} value={x.id}>
                {x.label}
              </option>
            ))}
          </select>
        </label>
        <fieldset>
          <legend className="text-small font-medium text-fg">Are you VAT-registered?</legend>
          <div className="mt-1.5 grid gap-2">
            {(
              [
                ['registered', 'Yes, I can recover input VAT'],
                ['not-registered', 'No, or I cannot recover it'],
              ] as [Buyer, string][]
            ).map(([id, label]) => (
              <label
                key={id}
                className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border border-border px-3 text-small text-fg hover:border-border-strong"
              >
                <input
                  type="radio"
                  name="uae-lms-buyer"
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

      <div className="mt-6 rounded-xl border border-border bg-bg p-4" aria-live="polite">
        <p className="text-small font-medium text-fg">Your data law</p>
        <p className="mt-1 text-small text-fg-2">
          <a href={z.lawUrl} target="_blank" rel="noopener" className="underline">
            {z.law}
          </a>
        </p>
        <p className="mt-2 text-small text-fg-2">
          <span className="font-medium text-fg">Fee: </span>
          {z.feeUrl ? (
            <a href={z.feeUrl} target="_blank" rel="noopener" className="underline">
              {z.fee}
            </a>
          ) : (
            z.fee
          )}
        </p>
        <p className="mt-2 text-small text-fg-2">
          <span className="font-medium text-fg">Data leaving: </span>
          {z.transfer}
        </p>
        <p className="mt-2 text-small text-fg-2">
          <span className="font-medium text-fg">Next step: </span>
          {z.ask}
        </p>
      </div>

      <p className="mt-6 text-small text-fg-2" aria-live="polite">
        {priced} of {rows.length} platforms publish a price that fits{' '}
        {learners.toLocaleString('en-US')} learner{learners === 1 ? '' : 's'}. Sorted by what you
        pay in year one
        {buyer === 'registered'
          ? ' after recovering VAT'
          : ' including 5% VAT where the vendor charges it'}
        .
      </p>
      <ol className="mt-3 divide-y divide-border border-y border-border text-small">
        {rows.map((r) => (
          <li key={r.id} className="flex items-start justify-between gap-4 py-3">
            <div className="min-w-0">
              <span className="font-medium text-fg">{r.name}</span>
              {r.ours && <span className="text-fg-2"> (our product, practice layer)</span>}
              <span className="block text-caption text-fg-3">{r.note}</span>
              {r.listAed !== null && (
                <span className="block text-caption text-fg-3">
                  VAT at 5%: {formatAed(r.vatAed as number)}
                  {buyer === 'registered'
                    ? ', recovered if your supplies are taxable'
                    : ', a cost to you if the vendor charges it'}
                </span>
              )}
            </div>
            <div className="shrink-0 text-right tabular-nums text-fg">
              {r.netAed === null
                ? 'Quote'
                : `${r.note.startsWith('From') ? 'from ' : ''}${formatAed(r.netAed)}/yr`}
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-caption text-fg-3">
        Dollar prices × AED {USD_AED} (the{' '}
        <a href={FX_URL} target="_blank" rel="noopener" className="underline">
          Central Bank peg
        </a>
        ). Year-one list price before discounts and setup fees. Runs in your browser; nothing is
        sent anywhere.
      </p>
    </div>
  )
}
