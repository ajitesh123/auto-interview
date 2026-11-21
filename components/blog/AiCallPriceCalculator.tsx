'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  PRICED,
  FX,
  GST_RATE,
  TTAI_PRICING_URL,
  CHECKED,
  monthly,
  ttaiBest,
  money,
  type CalcInput,
} from '@/data/aiCallPrice'

const STORE = 'aia-ai-call-price-v1'

/** String state while typing, clamped number on blur. */
function NumField({
  label,
  value,
  onChange,
  min,
  max,
  step,
  hint,
}: {
  label: string
  value: number
  onChange: (n: number) => void
  min: number
  max: number
  step: number
  hint: string
}) {
  const [text, setText] = useState(String(value))
  const [focused, setFocused] = useState(false)
  useEffect(() => {
    if (!focused) setText(String(value))
  }, [value, focused])
  return (
    <label className="block min-w-0">
      <span className="text-small font-medium text-fg">{label}</span>
      <input
        type="number"
        inputMode="decimal"
        min={min}
        max={max}
        step={step}
        value={text}
        onFocus={() => setFocused(true)}
        onChange={(e) => {
          setText(e.target.value)
          const n = parseFloat(e.target.value)
          if (Number.isFinite(n) && n >= min && n <= max) onChange(n)
        }}
        onBlur={() => {
          setFocused(false)
          const n = parseFloat(text)
          const v = Number.isFinite(n) ? Math.max(min, Math.min(max, n)) : value
          setText(String(v))
          onChange(v)
        }}
        className="mt-1 h-11 w-full rounded-lg border border-border-input bg-surface px-3 text-body tabular-nums text-fg"
      />
      <span className="mt-1 block text-caption text-fg-3">{hint}</span>
    </label>
  )
}

const DEFAULTS: CalcInput = { calls: 1000, minutes: 3, inrPerUsd: FX.inrPerUsd, gst: false }

const PRESETS: { label: string; calls: number; minutes: number }[] = [
  { label: 'Small test: 200 calls × 2 min', calls: 200, minutes: 2 },
  { label: 'Inbound desk: 1,500 × 4 min', calls: 1500, minutes: 4 },
  { label: 'Outbound team: 5,000 × 1.5 min', calls: 5000, minutes: 1.5 },
  { label: 'Collections: 20,000 × 2.5 min', calls: 20000, minutes: 2.5 },
]

/**
 * Monthly cost of the same calls on every platform we could price, in dollars and rupees.
 * Runs in the browser with no AI. Remembers the last inputs on this device.
 */
export default function AiCallPriceCalculator() {
  const [input, setInput] = useState<CalcInput>(DEFAULTS)
  const [cur, setCur] = useState<'USD' | 'INR'>('USD')

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE)
      if (!raw) return
      const v = JSON.parse(raw)
      const ok = (n: unknown, lo: number, hi: number) =>
        typeof n === 'number' && Number.isFinite(n) && n >= lo && n <= hi
      setInput({
        calls: ok(v.calls, 1, 1000000) ? v.calls : DEFAULTS.calls,
        minutes: ok(v.minutes, 0.1, 60) ? v.minutes : DEFAULTS.minutes,
        inrPerUsd: ok(v.inrPerUsd, 50, 150) ? v.inrPerUsd : DEFAULTS.inrPerUsd,
        gst: v.gst === true,
      })
      if (v.cur === 'INR') setCur('INR')
    } catch {
      /* storage blocked: defaults */
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORE, JSON.stringify({ ...input, cur }))
    } catch {
      /* ignore */
    }
  }, [input, cur])

  const rows = useMemo(
    () =>
      PRICED.map((p) => monthly(p, input)!)
        .filter(Boolean)
        .sort((a, b) => a.highUsd - b.highUsd),
    [input]
  )
  const minutes = input.calls * input.minutes
  const ttai = ttaiBest(minutes)
  const max = Math.max(...rows.map((r) => r.highUsd), 1)
  const show = (usd: number) =>
    cur === 'USD' ? money(usd, 'USD', usd < 10 ? 2 : 0) : money(usd * input.inrPerUsd, 'INR', 0)
  const cheapest = rows[0]
  const dearest = rows[rows.length - 1]

  return (
    <section
      id="price-calculator"
      aria-labelledby="price-calc-title"
      className="not-prose my-8 rounded-2xl border border-border bg-surface p-5 md:p-7"
    >
      <p className="font-mono text-kicker uppercase tracking-[0.08em] text-signal-strong">
        Free calculator · no AI, no sign-up
      </p>
      <h3 id="price-calc-title" className="mt-1 text-h3 font-semibold text-fg">
        What your calls cost a month on each platform
      </h3>

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Examples">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => setInput((s) => ({ ...s, calls: p.calls, minutes: p.minutes }))}
            aria-pressed={input.calls === p.calls && input.minutes === p.minutes}
            className="hover:bg-surface-2 min-h-10 rounded-full px-4 py-2 text-small font-medium text-fg ring-1 ring-inset ring-border transition-colors duration-fast aria-pressed:bg-signal-tint aria-pressed:ring-signal/40"
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <NumField
          label="Answered calls a month"
          value={input.calls}
          onChange={(n) => setInput((s) => ({ ...s, calls: Math.round(n) }))}
          min={1}
          max={1000000}
          step={100}
          hint="Calls that connect and talk"
        />
        <NumField
          label="Average minutes per call"
          value={input.minutes}
          onChange={(n) => setInput((s) => ({ ...s, minutes: n }))}
          min={0.1}
          max={60}
          step={0.5}
          hint="Talk time, not ring time"
        />
        <NumField
          label="Rupees per US dollar"
          value={input.inrPerUsd}
          onChange={(n) => setInput((s) => ({ ...s, inrPerUsd: n }))}
          min={50}
          max={150}
          step={0.5}
          hint={`₹${FX.inrPerUsd} on 19 Nov 2026`}
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
        <div
          role="group"
          aria-label="Show prices in"
          className="inline-flex rounded-full p-1 ring-1 ring-inset ring-border"
        >
          {(['USD', 'INR'] as const).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={cur === c}
              onClick={() => setCur(c)}
              className="min-h-9 rounded-full px-4 text-small font-medium text-fg-2 transition-colors duration-fast aria-pressed:bg-signal aria-pressed:text-white"
            >
              {c === 'USD' ? 'US dollars' : 'Rupees'}
            </button>
          ))}
        </div>
        <label className="inline-flex min-h-10 items-center gap-2 text-small text-fg">
          <input
            type="checkbox"
            checked={input.gst}
            onChange={(e) => setInput((s) => ({ ...s, gst: e.target.checked }))}
            className="h-4 w-4 accent-signal"
          />
          Add {Math.round(GST_RATE * 100)}% GST to rupee invoices (dollar vendors: reverse charge
          also applies)
        </label>
      </div>

      <p className="mt-5 text-body text-fg" aria-live="polite">
        <strong>
          {minutes.toLocaleString('en-US', { maximumFractionDigits: 1 })} minutes a month
        </strong>{' '}
        cost {show(cheapest.highUsd)} on {cheapest.name} and {show(dearest.highUsd)} on{' '}
        {dearest.name} (typical setup).
      </p>

      <ol className="mt-4 space-y-3">
        {rows.map((r) => (
          <li key={r.id} className="min-w-0">
            <div className="flex items-baseline justify-between gap-3 text-small">
              <span className="min-w-0 truncate font-medium text-fg">{r.name}</span>
              <span className="shrink-0 tabular-nums text-fg">
                {r.lowUsd === r.highUsd ? show(r.highUsd) : `${show(r.lowUsd)}–${show(r.highUsd)}`}
              </span>
            </div>
            <div className="bg-surface-2 relative mt-1 h-2 rounded-full" aria-hidden="true">
              <span
                className="absolute inset-y-0 left-0 rounded-full bg-viz-s1"
                style={{ width: `${(r.highUsd / max) * 100}%` }}
              />
              <span
                className="absolute inset-y-0 left-0 rounded-full bg-signal transition-[width] duration-base motion-reduce:transition-none"
                style={{ width: `${(r.lowUsd / max) * 100}%` }}
              />
            </div>
            <span className="mt-0.5 block text-caption text-fg-3">
              {show(r.perCallUsd)} per call
              {r.billedMin > minutes + 0.01
                ? ` · billed ${Math.round(r.billedMin).toLocaleString('en-US')} min (rounds each call up)`
                : ''}
            </span>
          </li>
        ))}
      </ol>

      <p className="mt-5 rounded-xl bg-signal-tint px-4 py-3 text-small text-fg ring-1 ring-inset ring-signal/15">
        <strong>Tough Tongue AI (our product):</strong> the cheapest plan for{' '}
        {minutes.toLocaleString('en-US', { maximumFractionDigits: 1 })} minutes is {ttai.plan} at{' '}
        {show(ttai.cost)} a month (fee plus any extra minutes), about{' '}
        {show(ttai.cost / Math.max(minutes, 1))} a minute, from the{' '}
        <a
          href={TTAI_PRICING_URL}
          target="_blank"
          rel="noopener"
          className="font-medium text-signal-strong underline"
        >
          plan prices
        </a>{' '}
        (included minutes plus the extra-minute rate). Its page does not say whether phone lines are
        included, so it is not ranked above.
      </p>

      <p className="mt-3 text-caption text-fg-3">
        Dark bar: cheap setup. Light bar: typical setup. Prices read on each vendor’s page on{' '}
        {CHECKED}. Platforms with a separate phone bill include Twilio US outbound at $0.014/min.
        Excludes plan fees, numbers and discounts. Sarvam and Telnyx bill whole minutes, so a
        2.2-minute call is billed as 3.
      </p>
    </section>
  )
}
