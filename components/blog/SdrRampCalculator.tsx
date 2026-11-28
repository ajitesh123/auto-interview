'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import {
  CURVES,
  PRESETS,
  compute,
  money,
  pct,
  n1,
  type Currency,
  type CurveId,
  type Inputs,
} from '@/data/sdrRamp'

const STORE = 'aia-sdr-ramp-v1'

const pill =
  'inline-flex min-h-10 items-center rounded-full px-4 py-2 text-left text-small font-medium ring-1 ring-inset transition-colors duration-fast'
const on = 'bg-signal text-white ring-signal'
const off = 'bg-surface text-fg ring-border-strong hover:bg-muted'

/** String state while typing, clamped number on blur. */
function NumField({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  hint,
  decimals = false,
  precision,
}: {
  label: string
  value: number
  onChange: (n: number) => void
  min: number
  max: number
  step?: number
  hint?: string
  decimals?: boolean
  precision?: number
}) {
  const [text, setText] = useState(String(value))
  const [focus, setFocus] = useState(false)
  useEffect(() => {
    if (!focus) setText(String(value))
  }, [value, focus])
  const norm = (n: number) => {
    const c = Math.max(min, Math.min(max, n))
    const p = precision ?? (decimals ? 1 : 0)
    return Math.round(c * 10 ** p) / 10 ** p
  }
  return (
    <label className="block min-w-0">
      <span className="text-small font-medium text-fg">{label}</span>
      <input
        type="number"
        inputMode={decimals || (precision ?? 0) > 0 ? 'decimal' : 'numeric'}
        min={min}
        max={max}
        step={step}
        value={text}
        onFocus={() => setFocus(true)}
        onChange={(e) => {
          setText(e.target.value)
          const n = parseFloat(e.target.value)
          if (Number.isFinite(n) && n >= min && n <= max) onChange(norm(n))
        }}
        onBlur={() => {
          setFocus(false)
          const n = parseFloat(text)
          const v = Number.isFinite(n) ? norm(n) : value
          setText(String(v))
          if (v !== value) onChange(v)
        }}
        className="mt-1 h-11 w-full rounded-lg border border-border-input bg-surface px-3 text-body tabular-nums text-fg"
      />
      {hint && <span className="mt-1 block text-caption text-fg-3">{hint}</span>}
    </label>
  )
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="min-w-0 rounded-xl border border-border p-4">
      <legend className="px-1 font-mono text-kicker uppercase tracking-[0.08em] text-fg-3">
        {title}
      </legend>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </fieldset>
  )
}

const BIG = 1e12

/** SDR ramp cost and ramped-quota schedule. No AI; nothing leaves the browser; inputs kept on this device. */
export default function SdrRampCalculator() {
  const [x, setX] = useState<Inputs>(PRESETS.USD.inputs)
  const [copied, setCopied] = useState<'' | 'ok' | 'fail'>('')
  const hydrated = useRef(false)

  useEffect(() => {
    try {
      const s = JSON.parse(window.localStorage.getItem(STORE) || 'null')
      if (s && (s.currency === 'USD' || s.currency === 'GBP' || s.currency === 'INR')) {
        const base = PRESETS[s.currency as Currency].inputs
        const next = { ...base }
        for (const k of Object.keys(base) as (keyof Inputs)[]) {
          if (typeof base[k] === 'number' && typeof s[k] === 'number' && Number.isFinite(s[k]))
            (next as Record<string, unknown>)[k] = s[k]
        }
        if (s.curve === 'even' || s.curve === 'slow') next.curve = s.curve
        setX(next)
      }
    } catch {
      /* no storage: defaults */
    }
    hydrated.current = true
  }, [])

  useEffect(() => {
    if (!hydrated.current) return
    try {
      window.localStorage.setItem(STORE, JSON.stringify(x))
    } catch {
      /* storage blocked */
    }
  }, [x])

  const set =
    <K extends keyof Inputs>(k: K) =>
    (v: Inputs[K]) =>
      setX((p) => ({ ...p, [k]: v }))
  const r = useMemo(() => compute(x), [x])
  const c = x.currency
  const m = (n: number) => money(n, c)

  const scheduleText = [
    `SDR ramp schedule (${CURVES[x.curve].label.toLowerCase()}, full quota ${n1(x.quota)} held meetings a month)`,
    ...r.rows.map(
      (row) => `Month ${row.month}: ${pct(row.share)} of quota = ${n1(row.target)} meetings`
    ),
    `Month ${r.rows.length + 1} onward: 100% = ${n1(x.quota)} meetings`,
    `Made with autointerviewai.com/blog/sales-onboarding-training-cut-sdr-ramp-time-ai-roleplay-2026`,
  ].join('\n')

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(scheduleText)
      setCopied('ok')
    } catch {
      setCopied('fail')
    }
    window.setTimeout(() => setCopied(''), 2500)
  }

  return (
    <div
      id="calculator"
      className="not-prose my-8 scroll-mt-24 rounded-2xl border border-border bg-surface p-5 md:p-7"
    >
      <div className="font-mono text-kicker uppercase tracking-[0.08em] text-signal-strong">
        Free tool · no AI · nothing uploaded
      </div>
      <h3 className="mt-2 text-h3 font-semibold text-fg">
        SDR ramp cost and ramp-quota calculator
      </h3>
      <p className="mt-1 max-w-2xl text-small text-fg-2">
        What a ramp costs in pay and meetings, what one month faster is worth, and a month-by-month
        ramped quota you can copy into a comp plan. Your inputs stay on this device.
      </p>

      <fieldset className="mt-5 min-w-0">
        <legend className="text-small font-medium text-fg">Start from a median SDR in</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {(Object.keys(PRESETS) as Currency[]).map((k) => (
            <button
              key={k}
              type="button"
              aria-pressed={c === k}
              onClick={() => setX(PRESETS[k].inputs)}
              className={`${pill} ${c === k ? on : off}`}
            >
              {PRESETS[k].label}
            </button>
          ))}
        </div>
        <p className="mt-2 text-caption text-fg-3">
          {PRESETS[c].note}. Switching resets the numbers.
        </p>
      </fieldset>

      <a
        href="#ramp-result"
        className="mt-5 flex items-center justify-between gap-3 rounded-lg border border-border bg-muted px-4 py-3 text-small lg:hidden"
      >
        <span className="text-fg-2">Cost of this ramp</span>
        <span className="font-semibold tabular-nums text-fg">
          {m(r.rampCost)} <span aria-hidden="true">↓</span>
        </span>
      </a>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div className="min-w-0 space-y-5">
          <Group title="1. One SDR">
            <NumField
              label={`Employer cost a year (${c})`}
              value={x.annualCost}
              onChange={set('annualCost')}
              min={0}
              max={BIG}
              step={1000}
              hint={`${m(x.annualCost)}: pay plus employer costs`}
            />
            <NumField
              label="Full quota: held meetings a month"
              value={x.quota}
              onChange={set('quota')}
              min={0}
              max={1000}
              decimals
              hint="Bridge Group global median: 10"
            />
            <NumField
              label="Average tenure (months)"
              value={x.tenureMonths}
              onChange={set('tenureMonths')}
              min={0}
              max={600}
              decimals
              hint="Bridge Group average: 1.9 years = 22.8"
            />
            <NumField
              label={`Pipeline value of one held meeting (${c}, optional)`}
              value={x.meetingValue}
              onChange={set('meetingValue')}
              min={0}
              max={BIG}
              hint="0 = skip. Win rate × deal size, from your CRM"
            />
          </Group>
          <Group title="2. The ramp">
            <NumField
              label="Ramp months (before full quota)"
              value={x.rampMonths}
              onChange={set('rampMonths')}
              min={0}
              max={12}
              hint="Bridge Group average: 3.0"
            />
            <fieldset className="min-w-0 sm:col-span-2">
              <legend className="text-small font-medium text-fg">Ramp shape</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {(Object.keys(CURVES) as CurveId[]).map((k) => (
                  <button
                    key={k}
                    type="button"
                    aria-pressed={x.curve === k}
                    onClick={() => set('curve')(k)}
                    className={`${pill} ${x.curve === k ? on : off}`}
                  >
                    {CURVES[k].label}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-caption text-fg-3">{CURVES[x.curve].explain}</p>
            </fieldset>
          </Group>
        </div>

        <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">
          <div
            id="ramp-result"
            className="scroll-mt-24 rounded-xl border border-border bg-muted p-5"
          >
            <div aria-live="polite">
              <div className="text-small text-fg-2">Cost of this ramp</div>
              <div className="mt-1 break-words font-serif text-h2 tabular-nums text-fg">
                {m(r.rampCost)}
              </div>
              <p className="mt-2 text-small text-fg-2">
                {r.lostMonths > 0
                  ? `You pay for ${n1(r.lostMonths)} months of output you don’t get: ${n1(r.lostMeetings)} held meetings below full quota.`
                  : 'No ramp: the SDR is at full quota from month 1.'}
                {r.pipelineLost !== null
                  ? ` At your meeting value that is ${m(r.pipelineLost)} of pipeline.`
                  : ''}
              </p>
            </div>
            <dl className="mt-4 space-y-2 border-t border-border pt-4 text-small">
              <div className="flex justify-between gap-3">
                <dt className="text-fg-3">One month faster saves</dt>
                <dd className="text-right tabular-nums text-signal-strong">
                  {r.oneFaster
                    ? `${m(r.oneFaster.cost)} · ${n1(r.oneFaster.meetings)} meetings`
                    : '—'}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-fg-3">Cost per meeting, year one</dt>
                <dd className="tabular-nums text-fg-2">
                  {r.perMeetingYear !== null ? m(r.perMeetingYear) : '—'}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-fg-3">Cost per meeting once ramped</dt>
                <dd className="tabular-nums text-fg-2">
                  {r.perMeetingRamped !== null ? m(r.perMeetingRamped) : '—'}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-fg-3">Share of an average stay lost to ramp</dt>
                <dd className="tabular-nums text-fg-2">
                  {r.tenureShare !== null ? pct(r.tenureShare) : '—'}
                </dd>
              </div>
            </dl>

            <div className="mt-4 border-t border-border pt-4">
              <div className="flex items-center justify-between gap-3">
                <div className="text-small font-medium text-fg">Ramped quota</div>
                <button
                  type="button"
                  onClick={copy}
                  className="inline-flex min-h-10 items-center rounded-full px-4 py-2 text-caption font-medium text-signal-strong ring-1 ring-inset ring-border-strong transition-colors duration-fast hover:bg-surface"
                >
                  {copied === 'ok'
                    ? 'Copied'
                    : copied === 'fail'
                      ? 'Copy failed: select the table'
                      : 'Copy schedule'}
                </button>
              </div>
              <table className="mt-2 w-full text-small">
                <thead>
                  <tr className="text-left text-caption text-fg-3">
                    <th className="py-1 font-medium">Month</th>
                    <th className="py-1 font-medium">Quota</th>
                    <th className="py-1 text-right font-medium">Meetings</th>
                  </tr>
                </thead>
                <tbody>
                  {r.rows.map((row) => (
                    <tr key={row.month} className="border-t border-border">
                      <td className="py-1.5 text-fg-2">{row.month}</td>
                      <td className="py-1.5">
                        <span className="flex items-center gap-2">
                          <span
                            aria-hidden="true"
                            className="h-1.5 w-16 overflow-hidden rounded-full bg-surface ring-1 ring-inset ring-border"
                          >
                            <span
                              className="block h-full bg-signal"
                              style={{ width: pct(row.share) }}
                            />
                          </span>
                          <span className="tabular-nums text-fg-2">{pct(row.share)}</span>
                        </span>
                      </td>
                      <td className="py-1.5 text-right tabular-nums text-fg-2">{n1(row.target)}</td>
                    </tr>
                  ))}
                  <tr className="border-t border-border">
                    <td className="py-1.5 text-fg-2">{r.rows.length + 1}+</td>
                    <td className="py-1.5 tabular-nums text-fg">100%</td>
                    <td className="py-1.5 text-right tabular-nums text-fg">{n1(x.quota)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 border-t border-border pt-4 text-caption text-fg-3">
              Ramp cost = monthly employer cost × months of output not delivered. It leaves out
              recruiting, the manager’s time and the SDRs who leave before ramping.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
