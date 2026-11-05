'use client'

import { useMemo, useState } from 'react'
import {
  computeSalary,
  DEFAULT_INPUTS,
  HRA_METROS,
  inr,
  PF_WAGE_CEILING,
  type PfMode,
  type SalaryInputs,
  type SalaryResult,
} from '@/data/indiaTax'

const field =
  'mt-1.5 h-11 w-full rounded-lg border border-border-input bg-surface px-3 text-small text-fg tabular-nums focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-strong'

function Num({
  label,
  hint,
  value,
  onChange,
  step = 1,
  min = 0,
  suffix,
}: {
  label: string
  hint?: string
  value: number
  onChange: (v: number) => void
  step?: number
  min?: number
  suffix?: string
}) {
  return (
    <label className="block">
      <span className="text-small font-medium text-fg">
        {label}
        {suffix && <span className="font-normal text-fg-3"> ({suffix})</span>}
      </span>
      <input
        type="number"
        inputMode="decimal"
        min={min}
        step={step}
        value={Number.isFinite(value) ? value : 0}
        onChange={(e) => onChange(e.target.value === '' ? 0 : Number(e.target.value))}
        className={field}
      />
      {hint && <span className="mt-1 block text-caption text-fg-3">{hint}</span>}
    </label>
  )
}

type Offer = SalaryInputs

function OfferInputs({
  id,
  offer,
  set,
}: {
  id: string
  offer: Offer
  set: (o: Partial<Offer>) => void
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Num
          label="CTC"
          suffix="₹ lakh"
          step={0.5}
          value={offer.ctc / 100000}
          onChange={(v) => set({ ctc: Math.round(v * 100000) })}
        />
        <Num
          label="Variable"
          suffix="₹ lakh"
          step={0.5}
          value={offer.variable / 100000}
          onChange={(v) => set({ variable: Math.round(v * 100000) })}
          hint="Yearly bonus inside the CTC"
        />
        <Num
          label="Basic"
          suffix="% of fixed"
          value={offer.basicPct}
          onChange={(v) => set({ basicPct: Math.min(100, Math.max(0, v)) })}
          hint="Labour codes: 50% or more"
        />
        <label className="block">
          <span className="text-small font-medium text-fg">PF</span>
          <select
            value={offer.pfMode}
            onChange={(e) => set({ pfMode: e.target.value as PfMode })}
            className={field}
          >
            <option value="ceiling">Capped at ₹{PF_WAGE_CEILING / 1000}k</option>
            <option value="full">On full basic</option>
            <option value="none">No PF</option>
          </select>
          <span className="mt-1 block text-caption text-fg-3">12% each side</span>
        </label>
      </div>

      <label className="flex min-h-11 items-center gap-3 text-small text-fg">
        <input
          type="checkbox"
          checked={offer.gratuityInCtc}
          onChange={(e) => set({ gratuityInCtc: e.target.checked })}
          className="h-5 w-5 rounded border-border-input accent-signal"
        />
        Gratuity (4.81% of basic) is included in the CTC
      </label>

      <details className="group rounded-xl border border-border bg-bg">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 px-4 py-2 text-small font-medium text-fg">
          Old-regime details: rent, city, investments
          <span
            aria-hidden="true"
            className="text-fg-3 transition-transform duration-base group-open:rotate-180"
          >
            ▾
          </span>
        </summary>
        <div className="grid gap-3 px-4 pb-4 sm:grid-cols-2">
          <Num
            label="Rent paid"
            suffix="₹/month"
            step={1000}
            value={offer.rent}
            onChange={(v) => set({ rent: v })}
          />
          <label className="block">
            <span className="text-small font-medium text-fg">City</span>
            <select
              id={`${id}-city`}
              value={offer.metro ? 'metro' : 'other'}
              onChange={(e) => set({ metro: e.target.value === 'metro' })}
              className={field}
            >
              <option value="metro">One of the 8 (50% HRA)</option>
              <option value="other">Any other city (40%)</option>
            </select>
          </label>
          <Num
            label="HRA in salary"
            suffix="% of basic"
            value={offer.hraPct}
            onChange={(v) => set({ hraPct: Math.max(0, v) })}
          />
          <Num
            label="Other 80C"
            suffix="₹/yr"
            step={5000}
            value={offer.other80C}
            onChange={(v) => set({ other80C: v })}
            hint="ELSS, PPF, life cover…"
          />
          <Num
            label="80D health cover"
            suffix="₹/yr"
            step={1000}
            value={offer.d80D}
            onChange={(v) => set({ d80D: v })}
          />
          <Num
            label="Professional tax"
            suffix="₹/yr"
            step={100}
            value={offer.profTax}
            onChange={(v) => set({ profTax: Math.min(2500, Math.max(0, v)) })}
            hint="Max ₹2,500; 0 in some states"
          />
        </div>
      </details>
    </div>
  )
}

function Breakdown({ r, pt, title }: { r: SalaryResult; pt: number; title: string }) {
  const b = r.regimes[r.best]
  const other = r.regimes[r.best === 'new' ? 'old' : 'new']
  const rows: [string, number, string?][] = [
    ['Fixed CTC', r.fixed],
    ['− Employer PF (goes to your PF account)', -r.employerPf],
    ['− Gratuity (paid when you leave)', -r.gratuity],
    ['= Gross salary', r.gross, 'strong'],
    ['− Your PF (12%)', -r.employeePf],
    ['− Professional tax', -pt],
    [`− Income tax, ${r.best} regime`, -b.taxOnFixed],
    ['= In-hand for the year', r.annualInHand, 'strong'],
  ]
  return (
    <div>
      <div className="font-mono text-kicker uppercase tracking-[0.08em] text-fg-3">{title}</div>
      <div className="mt-2 text-small text-fg-2">In-hand per month</div>
      <div className="text-h1 font-semibold tabular-nums text-fg" aria-live="polite">
        {inr(r.monthlyInHand)}
      </div>
      <div className="mt-1 text-small text-fg-2">
        {r.best === 'new' ? 'New' : 'Old'} regime saves{' '}
        <strong className="font-semibold text-fg">{inr(other.tax - b.tax)}</strong> a year over the{' '}
        {r.best === 'new' ? 'old' : 'new'} one.
      </div>
      <table className="mt-4 w-full text-small tabular-nums">
        <caption className="sr-only">How the CTC becomes in-hand pay</caption>
        <tbody className="divide-y divide-border">
          {rows.map(([k, v, s]) => (
            <tr key={k}>
              <th
                scope="row"
                className={`py-2 pr-3 text-left font-normal ${s ? 'font-semibold text-fg' : 'text-fg-2'}`}
              >
                {k}
              </th>
              <td className={`py-2 text-right ${s ? 'font-semibold text-fg' : 'text-fg-2'}`}>
                {v < 0 ? `−${inr(-v)}` : inr(Math.abs(v))}
              </td>
            </tr>
          ))}
          {r.bonusInHand > 0 && (
            <tr>
              <th scope="row" className="py-2 pr-3 text-left font-normal text-fg-2">
                + Bonus after its extra tax (once a year)
              </th>
              <td className="py-2 text-right text-fg-2">{inr(r.bonusInHand)}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="mt-3 grid grid-cols-2 gap-2 text-caption text-fg-3">
        <div className="rounded-lg bg-muted px-3 py-2">
          New regime tax: <span className="tabular-nums text-fg-2">{inr(r.regimes.new.tax)}</span>
        </div>
        <div className="rounded-lg bg-muted px-3 py-2">
          Old regime tax: <span className="tabular-nums text-fg-2">{inr(r.regimes.old.tax)}</span>
        </div>
      </div>
      {r.wageRuleShort && (
        <p className="mt-3 rounded-lg bg-warn-soft px-3 py-2 text-caption text-fg-2 ring-1 ring-inset ring-warn/20">
          <strong className="font-semibold text-fg">Basic is under 50%.</strong> Under the labour
          codes the shortfall counts as wages for PF and gratuity, so your PF may be higher and
          in-hand lower than shown.
        </p>
      )}
    </div>
  )
}

export default function SalaryCalculator() {
  const [compare, setCompare] = useState(false)
  const [a, setA] = useState<Offer>(DEFAULT_INPUTS)
  const [b, setB] = useState<Offer>({ ...DEFAULT_INPUTS, ctc: 1500000, variable: 150000 })
  const ra = useMemo(() => computeSalary(a), [a])
  const rb = useMemo(() => computeSalary(b), [b])
  const diffMonth = rb.monthlyInHand - ra.monthlyInHand
  const diffYear = rb.totalTakeHome - ra.totalTakeHome
  const diffPf = rb.employerPf + rb.employeePf - (ra.employerPf + ra.employeePf)

  return (
    <div className="rounded-2xl border border-border bg-surface p-5 shadow-e1 md:p-6">
      <div
        role="group"
        aria-label="Calculator mode"
        className="inline-flex rounded-full bg-muted p-1"
      >
        {[
          [false, 'One CTC'],
          [true, 'Compare two offers'],
        ].map(([v, label]) => (
          <button
            key={String(v)}
            type="button"
            aria-pressed={compare === v}
            onClick={() => setCompare(v as boolean)}
            className={`h-10 rounded-full px-4 text-small font-medium transition-colors duration-fast ${
              compare === v ? 'bg-surface text-fg shadow-e1' : 'text-fg-2 hover:text-fg'
            }`}
          >
            {label as string}
          </button>
        ))}
      </div>

      {!compare ? (
        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <OfferInputs id="a" offer={a} set={(o) => setA((p) => ({ ...p, ...o }))} />
          <Breakdown r={ra} pt={a.profTax} title="Your offer" />
        </div>
      ) : (
        <div className="mt-6 space-y-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {[
              ['a', 'Offer A (e.g. current job)', a, setA, ra],
              ['b', 'Offer B (e.g. new offer)', b, setB, rb],
            ].map(([id, title, o, set, r]) => (
              <div
                key={id as string}
                className="space-y-6 rounded-xl border border-border p-4 md:p-5"
              >
                <OfferInputs
                  id={id as string}
                  offer={o as Offer}
                  set={(x) => (set as (f: (p: Offer) => Offer) => void)((p) => ({ ...p, ...x }))}
                />
                <Breakdown
                  r={r as SalaryResult}
                  pt={(o as Offer).profTax}
                  title={title as string}
                />
              </div>
            ))}
          </div>
          <div className="rounded-xl bg-signal-tint p-5 ring-1 ring-inset ring-signal/15">
            <div className="font-mono text-kicker uppercase tracking-[0.08em] text-signal-ink">
              Offer B vs offer A
            </div>
            <dl className="mt-3 grid gap-4 sm:grid-cols-3">
              {[
                ['In-hand per month', diffMonth],
                ['Take-home per year, with bonus', diffYear],
                ['PF saved per year (both sides)', diffPf],
              ].map(([k, v]) => (
                <div key={k as string}>
                  <dt className="text-small text-fg-2">{k}</dt>
                  <dd className="text-h3 font-semibold tabular-nums text-fg">
                    {(v as number) >= 0 ? '+' : '−'}
                    {inr(Math.abs(v as number))}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-caption text-fg-2">
              A CTC hike is not an in-hand hike: compare the monthly line, then the bonus and PF.
            </p>
          </div>
        </div>
      )}
      <p className="mt-6 text-caption text-fg-3">
        Assumes a resident employee under 60, tax year 2026-27, no other income. 50% HRA cities:{' '}
        {HRA_METROS.join(', ')}. Runs in your browser; nothing is sent anywhere.
      </p>
    </div>
  )
}
