'use client'

import { useMemo, useState } from 'react'
import {
  AUD_USD,
  CHECKED,
  FX_URL,
  PLATFORMS,
  SECTORS,
  SEGMENTS,
  costRows,
  formatAud,
  type Buyer,
  type Sector,
  type Segment,
} from '@/data/auLmsData'

const field =
  'focus-visible:ring-accent-strong mt-1.5 h-11 w-full rounded-lg border border-border-input bg-surface px-3 text-small text-fg focus:outline-none focus-visible:ring-2'

const BUYERS: [Buyer, string][] = [
  ['registered', 'Yes, I claim full GST credits'],
  ['not-registered', 'No, not registered for GST'],
  ['partial', 'Registered, but no full credit (e.g. a bank)'],
]

export default function AuLmsCalculator() {
  const [learners, setLearners] = useState(100)
  const [buyer, setBuyer] = useState<Buyer>('registered')
  const [segment, setSegment] = useState<Segment | 'all'>('all')
  const [sector, setSector] = useState<Sector>('general')

  const rows = useMemo(() => {
    const ids = new Set(
      PLATFORMS.filter((p) => segment === 'all' || p.segments.includes(segment)).map((p) => p.id)
    )
    return costRows(learners, buyer)
      .filter((r) => ids.has(r.id))
      .sort((a, b) => {
        if (a.netAud === null && b.netAud === null) return 0
        if (a.netAud === null) return 1
        if (b.netAud === null) return -1
        return a.netAud - b.netAud
      })
  }, [learners, buyer, segment])

  const priced = rows.filter((r) => r.netAud !== null).length
  const s = SECTORS.find((x) => x.id === sector) ?? SECTORS[0]

  return (
    <div className="not-prose my-8 rounded-2xl border border-border bg-surface p-5 md:p-6">
      <p className="font-mono text-kicker uppercase tracking-[0.08em] text-fg-3">
        Australia LMS cost calculator · AUD with 10% GST · prices checked {CHECKED}
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
            {SEGMENTS.map((x) => (
              <option key={x.id} value={x.id}>
                {x.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-small font-medium text-fg">What kind of organisation?</span>
          <select
            value={sector}
            onChange={(e) => setSector(e.target.value as Sector)}
            className={field}
          >
            {SECTORS.map((x) => (
              <option key={x.id} value={x.id}>
                {x.label}
              </option>
            ))}
          </select>
        </label>
        <fieldset>
          <legend className="text-small font-medium text-fg">GST position</legend>
          <div className="mt-1.5 grid gap-2">
            {BUYERS.map(([id, label]) => (
              <label
                key={id}
                className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border border-border px-3 text-small text-fg hover:border-border-strong"
              >
                <input
                  type="radio"
                  name="au-lms-buyer"
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
        <p className="text-small font-medium text-fg">Rules that apply to you</p>
        <p className="mt-1 text-small text-fg-2">
          <a href={s.lawUrl} target="_blank" rel="noopener" className="underline">
            {s.law}
          </a>
        </p>
        <p className="mt-2 text-small text-fg-2">
          <span className="font-medium text-fg">Hosting: </span>
          {s.hosting}
        </p>
        <p className="mt-2 text-small text-fg-2">
          <span className="font-medium text-fg">Also: </span>
          {s.extraUrl ? (
            <a href={s.extraUrl} target="_blank" rel="noopener" className="underline">
              {s.extra}
            </a>
          ) : (
            s.extra
          )}
        </p>
        <p className="mt-2 text-small text-fg-2">
          <span className="font-medium text-fg">Next step: </span>
          {s.ask}
        </p>
      </div>

      <p className="mt-6 text-small text-fg-2" aria-live="polite">
        {priced} of {rows.length} platforms publish a price we can turn into Australian dollars for{' '}
        {learners.toLocaleString('en-AU')} learner{learners === 1 ? '' : 's'}. Sorted by what you
        pay in year one
        {buyer === 'registered'
          ? ' after GST credits'
          : buyer === 'partial'
            ? ', counting GST as a cost (your real share depends on how much you can claim)'
            : ' including 10% GST where it is charged'}
        .
      </p>
      <ol className="mt-3 divide-y divide-border border-y border-border text-small">
        {rows.map((r) => (
          <li key={r.id} className="flex items-start justify-between gap-4 py-3">
            <div className="min-w-0">
              <span className="font-medium text-fg">{r.name}</span>
              {r.ours && <span className="text-fg-2"> (our product, practice layer)</span>}
              <span className="block text-caption text-fg-3">{r.note}</span>
              {r.listAud !== null && (
                <span className="block text-caption text-fg-3">
                  GST at 10%: {formatAud(r.gstAud as number)}
                  {buyer === 'registered'
                    ? r.currency === 'AUD'
                      ? ', claimed back as a credit'
                      : ', should not be charged by an offshore vendor given your ABN'
                    : buyer === 'partial'
                      ? r.currency === 'AUD'
                        ? ', only partly claimable'
                        : ', reverse-charged by you on an offshore purchase'
                      : ', a cost to you when it is charged'}
                </span>
              )}
            </div>
            <div className="shrink-0 text-right tabular-nums text-fg">
              {r.netAud === null
                ? 'Quote'
                : `${buyer === 'partial' ? 'up to ' : ''}${formatAud(r.netAud)}/yr`}
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-caption text-fg-3">
        US dollar prices ÷ {AUD_USD} (the{' '}
        <a href={FX_URL} target="_blank" rel="noopener" className="underline">
          RBA rate for {CHECKED}
        </a>
        ). Year-one list price before discounts, setup fees and card or bank charges; we assume
        prices exclude GST. Runs in your browser; nothing is sent anywhere.
      </p>
    </div>
  )
}
