'use client'

import { useId, useMemo, useState } from 'react'
import { computeSalary, DEFAULT_INPUTS, inr } from '@/data/indiaTax'

type City = {
  city: string
  /** All-levels self-reported total pay, ₹ lakh. */
  all?: { median: number; p25: number; p75: number }
  /** Entry-level self-reported median, ₹ lakh. */
  entry?: number
}

/**
 * "Where does my offer sit?" A no-AI check: fixed CTC in lakh → monthly in-hand (same rules as
 * the salary calculator), position against the posted midpoints on this page, and against
 * self-reported city pay when the page has a city table.
 */
export default function OfferCheck({
  roleName,
  mids,
  cities,
}: {
  roleName: string
  /** Midpoints of the India posts on this page, ₹ lakh. */
  mids: number[]
  cities?: City[]
}) {
  const id = useId()
  const [ctc, setCtc] = useState('')
  const [city, setCity] = useState('')
  const lakh = Number(ctc)
  const valid = ctc !== '' && Number.isFinite(lakh) && lakh >= 0.5 && lakh <= 500

  const out = useMemo(() => {
    if (!valid) return null
    const inHand = computeSalary({
      ...DEFAULT_INPUTS,
      ctc: Math.round(lakh * 100000),
    }).monthlyInHand
    const below = mids.filter((m) => m < lakh).length
    const c = cities?.find((x) => x.city === city)
    const lines: string[] = []
    if (c?.entry !== undefined)
      lines.push(
        `Entry level in ${c.city}: ₹${c.entry} lakh median. Your offer is ${lakh >= c.entry ? 'at or above' : 'below'} it.`
      )
    if (c?.all) {
      const { median, p25, p75 } = c.all
      const where =
        lakh < p25
          ? 'below the middle half'
          : lakh > p75
            ? 'above the middle half'
            : `inside the middle half, ${lakh >= median ? 'at or above' : 'below'} the ₹${median} lakh median`
      lines.push(`All levels in ${c.city} (₹${p25}–${p75} lakh): ${where}.`)
    }
    return { inHand, below, lines }
  }, [valid, lakh, mids, cities, city])

  return (
    <div className="rounded-xl border border-border bg-surface p-5 md:p-6">
      <h2 className="text-h3 font-semibold text-fg">Where does your offer sit?</h2>
      <p className="mt-1 max-w-prose text-small text-fg-2">
        Type the fixed part of a {roleName} offer. You get monthly in-hand pay and where it falls
        against the {mids.length} Indian posts on this page. Nothing leaves your browser.
      </p>
      <div className="mt-4 flex flex-wrap items-end gap-3">
        <label htmlFor={`${id}-ctc`} className="block text-small font-medium text-fg">
          Fixed CTC, ₹ lakh a year
          <input
            id={`${id}-ctc`}
            type="number"
            inputMode="decimal"
            min={0.5}
            max={500}
            step={0.1}
            placeholder="e.g. 6.5"
            value={ctc}
            onChange={(e) => setCtc(e.target.value)}
            className="mt-1 block h-11 w-44 rounded-lg border border-border-input bg-surface px-3 text-body tabular-nums text-fg"
          />
        </label>
        {cities && cities.length > 0 && (
          <label htmlFor={`${id}-city`} className="block text-small font-medium text-fg">
            City (optional)
            <select
              id={`${id}-city`}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="mt-1 block h-11 w-48 rounded-lg border border-border-input bg-surface px-3 text-body text-fg"
            >
              <option value="">Pick a city</option>
              {cities.map((c) => (
                <option key={c.city} value={c.city}>
                  {c.city}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>
      <div aria-live="polite" className="mt-4">
        {out ? (
          <dl className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg bg-muted p-4">
              <dt className="text-small text-fg-2">In hand a month</dt>
              <dd className="mt-1 text-h3 font-semibold tabular-nums text-fg">{inr(out.inHand)}</dd>
              <dd className="mt-1 text-caption text-fg-3">
                New regime, 50% basic, PF on ₹25,000, gratuity in CTC
              </dd>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <dt className="text-small text-fg-2">Against the posts here</dt>
              <dd className="mt-1 text-h3 font-semibold tabular-nums text-fg">
                Above {out.below} of {mids.length}
              </dd>
              <dd className="mt-1 text-caption text-fg-3">Posted range midpoints below your CTC</dd>
            </div>
            {out.lines.length > 0 && (
              <div className="text-small text-fg-2 sm:col-span-2">
                {out.lines.map((l) => (
                  <p key={l}>{l}</p>
                ))}
                <p className="mt-1 text-caption text-fg-3">
                  City figures are Levels.fyi self-reported total pay, including bonus and stock.
                </p>
              </div>
            )}
          </dl>
        ) : (
          <p className="text-small text-fg-3">
            {ctc !== '' && !valid
              ? 'Enter yearly CTC in lakh, e.g. 6.5 for ₹6.5 LPA.'
              : 'Your result appears here.'}
          </p>
        )}
      </div>
    </div>
  )
}
