'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { PLANS, PRESETS, compute, money, type Currency, type Inputs } from '@/data/aiSdrVsHuman'

const STORE = 'aia-ai-sdr-vs-human-v1'

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

/**
 * AI SDR vs human SDR cost per held meeting. No AI; nothing leaves the browser; inputs kept on
 * this device.
 */
export default function AiSdrVsHumanCalculator() {
  const [x, setX] = useState<Inputs>(PRESETS.USD.inputs)
  const hydrated = useRef(false)

  useEffect(() => {
    try {
      const s = JSON.parse(window.localStorage.getItem(STORE) || 'null')
      if (s && (s.currency === 'USD' || s.currency === 'GBP' || s.currency === 'INR')) {
        const base = PRESETS[s.currency as Currency].inputs
        const next = { ...base }
        for (const k of Object.keys(base) as (keyof Inputs)[]) {
          if (k === 'currency') continue
          if (typeof base[k] === 'number' && typeof s[k] === 'number' && Number.isFinite(s[k]))
            (next as Record<string, unknown>)[k] = s[k]
          if (k === 'plan' && PLANS.some((p) => p.id === s.plan)) next.plan = s.plan
        }
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
  const one = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1))
  const cheaper =
    r.aiPerMeeting !== null && r.humanPerMeeting !== null
      ? r.aiPerMeeting < r.humanPerMeeting
      : null

  return (
    <div
      id="calculator"
      className="not-prose my-8 scroll-mt-24 rounded-2xl border border-border bg-surface p-5 md:p-7"
    >
      <div className="font-mono text-kicker uppercase tracking-[0.08em] text-signal-strong">
        Free tool · no AI · nothing uploaded
      </div>
      <h3 className="mt-2 text-h3 font-semibold text-fg">AI SDR vs human SDR cost calculator</h3>
      <p className="mt-1 max-w-2xl text-small text-fg-2">
        Year one, cost per held meeting. The human side loads pay, employer costs, tools, a share of
        the manager and the ramp. The AI side uses the vendor’s published price plus the hours a
        person spends checking its work. Your inputs stay on this device.
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
        href="#sdr-result"
        className="mt-5 flex items-center justify-between gap-3 rounded-lg border border-border bg-muted px-4 py-3 text-small lg:hidden"
      >
        <span className="text-fg-2">Cost per held meeting</span>
        <span className="font-semibold tabular-nums text-fg">
          {r.humanPerMeeting !== null ? m(r.humanPerMeeting) : '—'} vs{' '}
          {r.aiPerMeeting !== null ? m(r.aiPerMeeting) : '—'} ↓
        </span>
      </a>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div className="min-w-0 space-y-5">
          <Group title={`1. One human SDR (${c} a year)`}>
            <NumField
              label="Base salary"
              value={x.base}
              onChange={set('base')}
              min={0}
              max={BIG}
              step={1000}
              hint={m(x.base)}
            />
            <NumField
              label="Target variable pay"
              value={x.variable}
              onChange={set('variable')}
              min={0}
              max={BIG}
              step={1000}
              hint={m(x.variable)}
            />
            <NumField
              label="Variable actually paid (%)"
              value={x.payout}
              onChange={set('payout')}
              min={0}
              max={300}
              hint="100 = at target; lower it if meetings fall short of quota"
            />
            <NumField
              label="Other employer costs (% of pay)"
              value={x.loadPct}
              onChange={set('loadPct')}
              min={0}
              max={200}
              decimals
              hint={
                c === 'INR'
                  ? 'EPF, gratuity, insurance: add yours'
                  : c === 'GBP'
                    ? 'On top of NIC and pension, which we add'
                    : 'On top of BLS benefits, which we add'
              }
            />
            <NumField
              label="Tools per SDR, a month"
              value={x.toolsMonthly}
              onChange={set('toolsMonthly')}
              min={0}
              max={BIG}
              hint="Dialer, data, sequencer"
            />
            <NumField
              label="Manager’s yearly cost"
              value={x.managerCost}
              onChange={set('managerCost')}
              min={0}
              max={BIG}
              step={1000}
              hint={`Split across ${x.sdrsPerManager} SDRs`}
            />
            <NumField
              label="SDRs per manager"
              value={x.sdrsPerManager}
              onChange={set('sdrsPerManager')}
              min={1}
              max={50}
              decimals
              hint="Bridge Group median: 6.4"
            />
            <NumField
              label="Ramp (months)"
              value={x.rampMonths}
              onChange={set('rampMonths')}
              min={0}
              max={12}
              decimals
              hint="Bridge Group average: 3.0"
            />
            <NumField
              label="Held meetings a month, ramped"
              value={x.meetingsPerMonth}
              onChange={set('meetingsPerMonth')}
              min={0}
              max={500}
              decimals
              hint="Median quota is 10; 60% of SDRs hit it"
            />
          </Group>

          <Group title="2. One AI SDR">
            <label className="block min-w-0 sm:col-span-2">
              <span className="text-small font-medium text-fg">Plan (published price)</span>
              <select
                value={x.plan}
                onChange={(e) => set('plan')(e.target.value)}
                className="mt-1 h-11 w-full rounded-lg border border-border-input bg-surface px-3 text-body text-fg"
              >
                {PLANS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <span className="mt-1 block text-caption text-fg-3">
                {r.plan.priceAsWritten}
                {r.plan.excludes ? ` · Excludes ${r.plan.excludes}` : ''}
              </span>
            </label>
            <NumField
              label="New contacts a month"
              value={x.contacts}
              onChange={set('contacts')}
              min={0}
              max={1000000}
              step={100}
            />
            <NumField
              label={c === 'USD' ? 'FX (USD)' : `1 USD = ? ${c}`}
              value={x.fx}
              onChange={set('fx')}
              min={0.0001}
              max={100000}
              precision={4}
              hint={c === 'USD' ? 'Leave at 1' : 'Rate on 25 Nov 2026; change to today’s'}
            />
            <NumField
              label={`Other AI costs a month (${c})`}
              value={x.aiExtraMonthly}
              onChange={set('aiExtraMonthly')}
              min={0}
              max={BIG}
              hint="Mailboxes, data, domains"
            />
            <NumField
              label="Oversight hours a week"
              value={x.oversightHours}
              onChange={set('oversightHours')}
              min={0}
              max={168}
              decimals
              hint="Someone checking lists and messages"
            />
            <NumField
              label={`Oversight hourly cost (${c})`}
              value={x.oversightRate}
              onChange={set('oversightRate')}
              min={0}
              max={BIG}
              hint={
                x.oversightRate > 0
                  ? m(x.oversightRate)
                  : `0 = the SDR’s loaded rate, ${m(r.humanHourly)}`
              }
            />
            <NumField
              label="Held meetings per 100 contacts"
              value={x.meetingsPer100}
              onChange={set('meetingsPer100')}
              min={0}
              max={100}
              decimals
              hint="Your pilot’s number. AiSDR claims 1–3 booked; held is lower"
            />
          </Group>
        </div>

        <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">
          <div
            id="sdr-result"
            className="scroll-mt-24 rounded-xl border border-border bg-muted p-5"
          >
            <div className="grid grid-cols-2 gap-4" aria-live="polite">
              <div className="min-w-0">
                <div className="text-small text-fg-2">Human, per meeting</div>
                <div className="mt-1 break-words font-serif text-h3 tabular-nums text-fg sm:text-h2">
                  {r.humanPerMeeting !== null ? m(r.humanPerMeeting) : '—'}
                </div>
              </div>
              <div className="min-w-0">
                <div className="text-small text-fg-2">AI SDR, per meeting</div>
                <div className="mt-1 break-words font-serif text-h3 tabular-nums text-signal-strong sm:text-h2">
                  {r.aiPerMeeting !== null ? m(r.aiPerMeeting) : '—'}
                </div>
              </div>
            </div>
            <p className="mt-3 text-small text-fg-2" aria-live="polite">
              {r.licence === null
                ? `${r.plan.name} publishes no price above this volume. Pick another plan or lower the contacts.`
                : r.breakEven !== null
                  ? `The AI SDR has to hold ${one(r.breakEven)} meetings a month (${(r.breakEvenPer100 ?? 0).toFixed(2)} per 100 contacts) to match the human. ${cheaper === null ? '' : cheaper ? 'At your rate it is cheaper per meeting.' : 'At your rate it costs more per meeting.'}`
                  : 'Enter held meetings for the human SDR to compare.'}
            </p>
            <dl className="mt-4 space-y-2 border-t border-border pt-4 text-small">
              {[
                ['Human pay', r.pay],
                [
                  c === 'USD'
                    ? 'Employer benefits (BLS)'
                    : c === 'GBP'
                      ? 'Employer NIC + pension'
                      : 'Employer costs',
                  r.statutory,
                ],
                ['Other employer costs', r.extraLoad],
                ['Tools', r.tools],
                ['Manager share', r.manager],
              ].map(([l, v]) => (
                <div key={l as string} className="flex justify-between gap-3">
                  <dt className="text-fg-3">{l as string}</dt>
                  <dd className="tabular-nums text-fg-2">{m(v as number)}</dd>
                </div>
              ))}
              <div className="flex justify-between gap-3">
                <dt className="text-fg-2">Human, year one · {one(r.humanMeetings)} meetings</dt>
                <dd className="font-medium tabular-nums text-fg">{m(r.humanCost)}</dd>
              </div>
              <div className="flex justify-between gap-3 pt-2">
                <dt className="text-fg-3">AI licence</dt>
                <dd className="tabular-nums text-fg-2">
                  {r.licence === null ? 'Not published' : m(r.licence)}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-fg-3">Other AI costs</dt>
                <dd className="tabular-nums text-fg-2">{m(r.extras)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-fg-3">Oversight</dt>
                <dd className="tabular-nums text-fg-2">{m(r.oversight)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-fg-2">AI, year one · {one(r.aiMeetings)} meetings</dt>
                <dd className="font-medium tabular-nums text-fg">
                  {r.aiCost === null ? '—' : m(r.aiCost)}
                </dd>
              </div>
            </dl>
            <p className="mt-4 border-t border-border pt-4 text-caption text-fg-3">
              Ramp counted as a straight line, so {one(x.rampMonths / 2)} months of output are lost.
              Booked is not held: use held meetings on both sides. The AI side assumes no setup
              months.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
