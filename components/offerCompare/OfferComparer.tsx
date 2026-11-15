'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  BLANK_OFFER,
  compareOffers,
  DEFAULT_PAYOUT_PCT,
  type EquityType,
  headlineCtc,
  inr,
  lakhs,
  type Offer,
  fixedToMatch,
  realHike,
  SAMPLE_OFFERS,
} from '@/data/offerCompare/engine'

const KEY = 'aia.offerCompare.v1'
const LETTERS = ['A', 'B', 'C']
const VIZ = ['bg-viz-1', 'bg-viz-2', 'bg-viz-3'] // data-mark tokens, not UI accents

const field =
  'mt-1.5 h-11 w-full rounded-lg border border-border-input bg-surface px-3 text-small text-fg tabular-nums focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-strong'
const kicker = 'font-mono text-kicker uppercase tracking-[0.08em]'

/** Number field that keeps what you type while focused and clamps on blur. */
function Num({
  label,
  unit,
  hint,
  value,
  onChange,
  scale = 1,
  min = 0,
  max = 1e9,
  step = 'any',
}: {
  label: string
  unit?: string
  hint?: string
  value: number
  onChange: (v: number) => void
  scale?: number // 100000 shows ₹ as lakh
  min?: number
  max?: number
  step?: string
}) {
  const shown = +(value / scale).toFixed(scale > 1 ? 2 : 0)
  const [text, setText] = useState(String(shown))
  const [focused, setFocused] = useState(false)
  useEffect(() => {
    if (!focused) setText(String(shown))
  }, [shown, focused])
  return (
    <label className="block min-w-0">
      <span className="text-small font-medium text-fg">
        {label}
        {unit && <span className="font-normal text-fg-3"> ({unit})</span>}
      </span>
      <input
        type="number"
        inputMode="decimal"
        step={step}
        min={min}
        value={text}
        onFocus={() => setFocused(true)}
        onChange={(e) => {
          setText(e.target.value)
          const n = Number(e.target.value)
          if (e.target.value !== '' && Number.isFinite(n))
            onChange(Math.min(max, Math.max(min, n)) * scale)
        }}
        onBlur={() => {
          setFocused(false)
          const n = Number(text)
          const v = Number.isFinite(n) && text !== '' ? Math.min(max, Math.max(min, n)) : 0
          onChange(v * scale)
          setText(String(+v.toFixed(scale > 1 ? 2 : 0)))
        }}
        className={field}
      />
      {(hint || scale > 1) && (
        <span className="mt-1 block text-caption text-fg-3">
          {scale > 1 && <span className="tabular-nums">= {inr(value)}</span>}
          {scale > 1 && hint && ' · '}
          {hint}
        </span>
      )}
    </label>
  )
}

function OfferCard({
  i,
  offer,
  set,
  remove,
}: {
  i: number
  offer: Offer
  set: (p: Partial<Offer>) => void
  remove?: () => void
}) {
  return (
    <fieldset className="min-w-0 rounded-xl border border-border bg-surface p-4 md:p-5">
      <legend className="sr-only">Offer {LETTERS[i]}</legend>
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${VIZ[i]}`} />
          <span className={`${kicker} text-fg-3`}>Offer {LETTERS[i]}</span>
        </span>
        {remove && (
          <button
            type="button"
            onClick={remove}
            className="h-8 rounded-full px-3 text-caption text-fg-2 hover:bg-muted hover:text-fg"
          >
            Remove
          </button>
        )}
      </div>
      <label className="mt-3 block">
        <span className="text-small font-medium text-fg">Name</span>
        <input
          type="text"
          value={offer.name}
          maxLength={28}
          onChange={(e) => set({ name: e.target.value })}
          className={field}
        />
      </label>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <Num
          label="Fixed CTC"
          unit="₹L/yr"
          hint="Incl. employer PF"
          value={offer.fixed}
          scale={100000}
          max={500}
          onChange={(v) => set({ fixed: v })}
        />
        <Num
          label="Variable"
          unit="₹L/yr"
          hint="Target, as on the letter"
          value={offer.variable}
          scale={100000}
          max={500}
          onChange={(v) => set({ variable: v })}
        />
        <Num
          label="Payout"
          unit="%"
          hint="Of target you expect"
          value={offer.payoutPct}
          max={200}
          onChange={(v) => set({ payoutPct: v })}
        />
        <Num
          label="Joining bonus"
          unit="₹L"
          value={offer.joiningBonus}
          scale={100000}
          max={200}
          onChange={(v) => set({ joiningBonus: v })}
        />
        <Num
          label="Rent"
          unit="₹/month"
          value={offer.rent}
          max={1000000}
          onChange={(v) => set({ rent: v })}
        />
        <Num
          label="Commute"
          unit="₹/month"
          value={offer.commute}
          max={500000}
          onChange={(v) => set({ commute: v })}
        />
      </div>

      <details className="group mt-4 rounded-lg border border-border">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between px-3 text-small font-medium text-fg">
          Equity, notice buyout, raises
          <span
            aria-hidden="true"
            className="text-fg-3 transition-transform duration-base group-open:rotate-180"
          >
            ▾
          </span>
        </summary>
        <div className="grid grid-cols-2 gap-3 border-t border-border p-3">
          <label className="col-span-2 block">
            <span className="text-small font-medium text-fg">Equity</span>
            <select
              value={offer.equityType}
              onChange={(e) => {
                const t = e.target.value as EquityType
                set({ equityType: t, equityCountPct: t === 'esop' ? 25 : 100 })
              }}
              className={field}
            >
              <option value="none">None</option>
              <option value="rsu">RSUs of a listed company</option>
              <option value="esop">Startup ESOPs</option>
            </select>
          </label>
          {offer.equityType !== 'none' && (
            <>
              <Num
                label="Grant value today"
                unit="₹L, total"
                hint={
                  offer.equityType === 'esop'
                    ? 'Shares × (latest price − exercise price)'
                    : 'Shares × today’s share price'
                }
                value={offer.equityGrant}
                scale={100000}
                max={5000}
                onChange={(v) => set({ equityGrant: v })}
              />
              <Num
                label="Count it at"
                unit="% of value"
                hint={offer.equityType === 'esop' ? 'Unlisted: many count 0–25%' : undefined}
                value={offer.equityCountPct}
                max={100}
                onChange={(v) => set({ equityCountPct: v })}
              />
              <Num
                label="Vests over"
                unit="years"
                value={offer.vestYears}
                min={1}
                max={10}
                onChange={(v) => set({ vestYears: v })}
              />
              <Num
                label="Cliff"
                unit="months"
                hint="Nothing vests before this"
                value={offer.cliffMonths}
                max={60}
                onChange={(v) => set({ cliffMonths: v })}
              />
            </>
          )}
          <Num
            label="Notice buyout you pay"
            unit="₹L"
            hint="To leave your current job early"
            value={offer.buyout}
            scale={100000}
            max={100}
            onChange={(v) => set({ buyout: v })}
          />
          <Num
            label="Joining bonus clawback"
            unit="months"
            hint="Repay the bonus if you leave sooner"
            value={offer.clawbackMonths}
            max={60}
            onChange={(v) => set({ clawbackMonths: v })}
          />
          <label className="col-span-2 flex min-h-11 items-center gap-3 text-small text-fg">
            <input
              type="checkbox"
              checked={offer.buyoutReimbursed}
              onChange={(e) => set({ buyoutReimbursed: e.target.checked })}
              className="h-5 w-5 rounded border-border-input accent-signal"
            />
            New employer pays the buyout back (taxed as salary)
          </label>
          <Num
            label="Yearly raise"
            unit="%"
            value={offer.hikePct}
            min={-50}
            max={100}
            onChange={(v) => set({ hikePct: v })}
          />
          <Num
            label="Basic"
            unit="% of fixed"
            hint="PF and HRA are worked out from it"
            value={offer.basicPct}
            min={10}
            max={100}
            onChange={(v) => set({ basicPct: v })}
          />
          <label className="col-span-2 flex min-h-11 items-center gap-3 text-small text-fg">
            <input
              type="checkbox"
              checked={offer.pfFull}
              onChange={(e) => set({ pfFull: e.target.checked })}
              className="h-5 w-5 rounded border-border-input accent-signal"
            />
            PF on full basic (not capped at ₹25,000 a month)
          </label>
          <label className="col-span-2 flex min-h-11 items-center gap-3 text-small text-fg">
            <input
              type="checkbox"
              checked={offer.metro}
              onChange={(e) => set({ metro: e.target.checked })}
              className="h-5 w-5 rounded border-border-input accent-signal"
            />
            Metro for HRA (Delhi, Mumbai, Kolkata, Chennai, Bengaluru, Hyderabad, Pune, Ahmedabad)
          </label>
        </div>
      </details>
    </fieldset>
  )
}

function Bars({
  rows,
  best,
  label,
}: {
  rows: { name: string; value: number }[]
  best: number
  label: string
}) {
  const max = Math.max(1, ...rows.map((r) => Math.abs(r.value)))
  return (
    <div>
      <div className="text-small font-medium text-fg">{label}</div>
      <ul className="mt-3 space-y-3">
        {rows.map((r, i) => (
          <li key={i}>
            <div className="flex items-baseline justify-between gap-3 text-small">
              <span className="truncate text-fg-2">
                {LETTERS[i]} · {r.name || `Offer ${LETTERS[i]}`}
                {i === best && (
                  <span className="ml-2 inline-flex h-5 items-center rounded-full bg-signal-tint px-2 text-caption font-medium text-signal-ink">
                    Highest
                  </span>
                )}
              </span>
              <span className="shrink-0 font-semibold tabular-nums text-fg">{inr(r.value)}</span>
            </div>
            <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full rounded-full ${VIZ[i]} transition-[width] duration-slow ease-out`}
                style={{ width: `${Math.max(1, (Math.max(0, r.value) / max) * 100)}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function OfferComparer() {
  const [offers, setOffers] = useState<Offer[]>(SAMPLE_OFFERS)
  const [loaded, setLoaded] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY)
      if (raw) {
        const d = JSON.parse(raw)
        if (Array.isArray(d) && d.length >= 2 && d.length <= 3)
          setOffers(d.map((o) => ({ ...BLANK_OFFER, ...o })))
      }
    } catch {
      /* storage blocked: start from the example */
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    const t = window.setTimeout(() => {
      try {
        window.localStorage.setItem(KEY, JSON.stringify(offers))
      } catch {
        /* ignore */
      }
    }, 400)
    return () => window.clearTimeout(t)
  }, [offers, loaded])

  const cmp = useMemo(() => compareOffers(offers), [offers])
  const { results, bestYear1, bestThreeYear, ctcRank } = cmp
  const nameOf = (i: number) => results[i].name || `Offer ${LETTERS[i]}`

  const setAt = (i: number) => (p: Partial<Offer>) =>
    setOffers((prev) => prev.map((o, j) => (j === i ? { ...o, ...p } : o)))

  const rows: { label: string; get: (i: number) => string; strong?: boolean; note?: string }[] = [
    {
      label: 'Headline CTC (fixed + variable + joining)',
      get: (i) => lakhs(headlineCtc(offers[i])),
    },
    {
      label: 'Salary in-hand per month',
      get: (i) => inr(results[i].monthlyInHand),
      strong: true,
      note: 'After PF, professional tax and income tax',
    },
    {
      label: 'Cheaper tax regime',
      get: (i) => (results[i].regime === 'new' ? 'New' : 'Old'),
    },
    {
      label: 'Variable you expect, after tax (yr 1)',
      get: (i) => inr(results[i].years[0].variableInHand),
    },
    {
      label: 'Joining bonus + buyout refund, after tax',
      get: (i) => inr(results[i].years[0].oneTimeInHand),
    },
    { label: 'Notice buyout you pay', get: (i) => inr(-results[i].years[0].buyoutPaid) },
    { label: 'Cash in year 1', get: (i) => inr(results[i].year1Cash), strong: true },
    { label: 'Rent + commute (yr 1)', get: (i) => inr(-results[i].years[0].living) },
    {
      label: 'Left after rent + commute (yr 1)',
      get: (i) => inr(results[i].year1AfterLiving),
      strong: true,
    },
    { label: 'Equity you count (3 yrs)', get: (i) => inr(results[i].threeYearEquity) },
    { label: '3-year total', get: (i) => inr(results[i].threeYearTotal), strong: true },
  ]

  const hikes = results.slice(1).map((r, j) => ({ i: j + 1, h: realHike(results[0], r) }))
  const toMatch = results
    .map((_, i) => ({
      i,
      need: i === bestThreeYear ? null : fixedToMatch(offers, i, bestThreeYear),
    }))
    .filter((x) => x.need !== null) as { i: number; need: number }[]
  const sameWinner = bestYear1 === bestThreeYear
  const verdict = sameWinner
    ? `${nameOf(bestYear1)} leaves you the most money, both in year 1 and over 3 years.`
    : `${nameOf(bestYear1)} leaves you the most in year 1; ${nameOf(bestThreeYear)} wins over 3 years.`
  const ctcTrap =
    ctcRank !== bestYear1
      ? `${nameOf(ctcRank)} has the biggest headline CTC but not the most cash in year 1.`
      : null

  async function copySummary() {
    const lines = [
      'Offer comparison (autointerviewai.com/job-offer-comparison)',
      ...results.map(
        (r, i) =>
          `${LETTERS[i]}. ${nameOf(i)}: CTC ${lakhs(headlineCtc(offers[i]))}, in-hand ${inr(r.monthlyInHand)}/mo, year-1 left after rent+commute ${inr(r.year1AfterLiving)}, 3-yr total ${inr(r.threeYearTotal)}`
      ),
      verdict,
      ...toMatch.map(
        ({ i, need }) =>
          `To match ${nameOf(bestThreeYear)} over 3 years, ${nameOf(i)} needs fixed CTC ${lakhs(need)}.`
      ),
    ]
    try {
      await navigator.clipboard.writeText(lines.join('\n'))
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard blocked */
    }
  }

  return (
    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 [&>*]:min-w-0">
      <a
        href="#offer-result"
        className="flex items-center justify-between gap-3 rounded-xl bg-signal-tint px-4 py-3 text-small text-fg ring-1 ring-inset ring-signal/15 lg:hidden"
      >
        <span>
          <span className="font-semibold">{nameOf(bestThreeYear)}</span> wins over 3 years
          {bestYear1 !== bestThreeYear && <>; {nameOf(bestYear1)} in year 1</>}
        </span>
        <span className="shrink-0 font-medium text-signal-ink">Result ↓</span>
      </a>
      <div className={`space-y-4 ${offers.length === 3 ? 'lg:col-span-12' : 'lg:col-span-7'}`}>
        <div className={`grid gap-4 ${offers.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
          {offers.map((o, i) => (
            <OfferCard
              key={i}
              i={i}
              offer={o}
              set={setAt(i)}
              remove={
                offers.length > 2 ? () => setOffers((p) => p.filter((_, j) => j !== i)) : undefined
              }
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {offers.length < 3 && (
            <button
              type="button"
              onClick={() =>
                setOffers((p) => [...p, { ...BLANK_OFFER, name: `Offer ${LETTERS[p.length]}` }])
              }
              className="inline-flex h-11 items-center rounded-full bg-surface px-4 text-small font-semibold text-fg ring-1 ring-inset ring-border-strong hover:bg-muted"
            >
              + Add a third offer
            </button>
          )}
          <button
            type="button"
            onClick={() => setOffers(SAMPLE_OFFERS)}
            className="inline-flex h-11 items-center rounded-full px-4 text-small text-fg-2 hover:bg-muted hover:text-fg"
          >
            Reset to the example
          </button>
          <button
            type="button"
            onClick={() =>
              setOffers([
                { ...BLANK_OFFER, name: 'Current job', payoutPct: DEFAULT_PAYOUT_PCT },
                { ...BLANK_OFFER, name: 'New offer', fixed: 1500000 },
              ])
            }
            className="inline-flex h-11 items-center rounded-full px-4 text-small text-fg-2 hover:bg-muted hover:text-fg"
          >
            Start blank
          </button>
        </div>
        <p className="text-caption text-fg-3">
          Saved on this device only. Tax: FY 2026-27 slabs; for each offer we pick the cheaper
          regime. The old regime here counts only HRA, your PF and the standard deduction, so if you
          claim more (80C, 80D, home loan), check it in the CTC calculator.
        </p>
      </div>

      <section
        id="offer-result"
        aria-label="Result"
        className={`scroll-mt-32 space-y-6 rounded-2xl border border-border bg-surface p-5 shadow-e1 md:p-6 ${offers.length === 3 ? 'lg:col-span-12 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0' : 'lg:sticky lg:top-32 lg:col-span-5'}`}
      >
        <div>
          <div className={`${kicker} text-signal-strong`}>Verdict</div>
          <p className="mt-2 text-h4 font-semibold text-fg" aria-live="polite">
            {verdict}
          </p>
          {ctcTrap && <p className="mt-1 text-small text-fg-2">{ctcTrap}</p>}
          <ul className="mt-2 space-y-1 text-small text-fg-2">
            {hikes.map(({ i, h }) =>
              h === null ? null : (
                <li key={i}>
                  {nameOf(i)} leaves{' '}
                  <strong className="font-semibold tabular-nums text-fg">
                    {Math.abs(h).toFixed(1)}% {h >= 0 ? 'more' : 'less'}
                  </strong>{' '}
                  than {nameOf(0)} in year 1, after rent and commute.
                </li>
              )
            )}
          </ul>
          {toMatch.length > 0 && (
            <div className="mt-4 rounded-lg bg-muted px-3 py-2.5">
              <div className={`${kicker} text-fg-3`}>Your negotiation number</div>
              <ul className="mt-1.5 space-y-1 text-small text-fg-2">
                {toMatch.map(({ i, need }) => (
                  <li key={i}>
                    To match {nameOf(bestThreeYear)} over 3 years, {nameOf(i)} needs a fixed CTC of{' '}
                    <strong className="font-semibold tabular-nums text-fg">{lakhs(need)}</strong> (
                    {lakhs(need - offers[i].fixed)} more).
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <Bars
          label="Left after rent + commute, year 1"
          best={bestYear1}
          rows={results.map((r) => ({ name: r.name, value: r.year1AfterLiving }))}
        />
        <Bars
          label="3-year total (cash after rent + commute, plus equity you count)"
          best={bestThreeYear}
          rows={results.map((r) => ({ name: r.name, value: r.threeYearTotal }))}
        />
        {results.some((r) => r.leaveEarlyRepay > 0) && (
          <div className="rounded-lg bg-warn-soft px-3 py-2.5 text-caption text-fg-2 ring-1 ring-inset ring-warn/20">
            {results.map((r, i) =>
              r.leaveEarlyRepay > 0 ? (
                <p key={i}>
                  <strong className="font-semibold text-fg">{nameOf(i)}:</strong> leave before{' '}
                  {offers[i].clawbackMonths} months and you repay {inr(r.leaveEarlyRepay)}, though
                  the bonus left you only {inr(r.joiningBonusInHand)} after tax.
                </p>
              ) : null
            )}
          </div>
        )}
        <button
          type="button"
          onClick={copySummary}
          className="inline-flex h-11 items-center rounded-full bg-surface px-4 text-small font-semibold text-fg ring-1 ring-inset ring-border-strong hover:bg-muted"
        >
          <span role="status">{copied ? 'Copied' : 'Copy summary'}</span>
        </button>
      </section>

      <figure className="lg:col-span-12">
        <div
          role="region"
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
          aria-label="Offer comparison, line by line"
          className="overflow-x-auto rounded-xl border border-border bg-surface"
        >
          <table className="w-full min-w-[620px] text-left text-small tabular-nums">
            <thead className="bg-muted text-fg-2">
              <tr>
                <th scope="col" className="sticky left-0 bg-muted px-4 py-3 font-medium">
                  Line by line
                </th>
                {results.map((r, i) => (
                  <th key={i} scope="col" className="px-4 py-3 text-right font-medium">
                    <span className="inline-flex items-center gap-1.5">
                      <span aria-hidden="true" className={`h-2 w-2 rounded-full ${VIZ[i]}`} />
                      {nameOf(i)}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((row) => (
                <tr key={row.label}>
                  <th
                    scope="row"
                    className={`sticky left-0 bg-surface px-4 py-2.5 text-left ${row.strong ? 'font-semibold text-fg' : 'font-normal text-fg-2'}`}
                  >
                    {row.label}
                    {row.note && (
                      <span className="block text-caption font-normal text-fg-3">{row.note}</span>
                    )}
                  </th>
                  {results.map((_, i) => (
                    <td
                      key={i}
                      className={`px-4 py-2.5 text-right ${row.strong ? 'font-semibold text-fg' : 'text-fg-2'}`}
                    >
                      {row.get(i)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <figcaption className="mt-2 flex justify-between gap-4 text-caption text-fg-3">
          <span>
            Raises and variable payout are your assumptions. Equity is valued at today&apos;s price;
            ESOP tax at exercise is not deducted.
          </span>
          <span className="shrink-0 md:hidden">Swipe →</span>
        </figcaption>
      </figure>
    </div>
  )
}
