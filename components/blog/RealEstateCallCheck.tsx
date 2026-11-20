'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  COUNTRIES,
  CALL_TYPES,
  VERDICTS,
  SOURCES,
  RATES,
  WORKED,
  TTAI_URL,
  checkCall,
  monthlyMinutes,
  cost,
  money,
  type CountryId,
  type CallType,
} from '@/data/realEstateCalling'

const STORE = 'aia-re-call-check-v1'

const TONE = {
  success: 'bg-success-soft text-success-strong ring-success/30',
  warn: 'bg-warn-soft text-fg ring-warn/40',
  danger: 'bg-danger-soft text-fg ring-danger/30',
} as const

const pill =
  'inline-flex min-h-10 items-center rounded-full px-4 py-2 text-left text-small font-medium ring-1 ring-inset transition-colors duration-fast'

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
  useEffect(() => setText(String(value)), [value])
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
        onChange={(e) => {
          setText(e.target.value)
          const n = parseFloat(e.target.value)
          if (Number.isFinite(n)) onChange(Math.max(min, Math.min(max, n)))
        }}
        onBlur={() => {
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

/**
 * Pick where you call and what kind of call it is; get a verdict (AI can call / with conditions /
 * use a person), what to do, and the rule behind it. Then estimate monthly AI minutes and cost
 * at published per-minute prices. No AI; nothing leaves this browser; choices kept on this device.
 */
export default function RealEstateCallCheck() {
  const [country, setCountry] = useState<CountryId>('us')
  const [type, setType] = useState<CallType>('inquiry')
  const [consent, setConsent] = useState(false)
  const [leads, setLeads] = useState(WORKED.leads)
  const [mins, setMins] = useState(WORKED.minutesPerLead)

  useEffect(() => {
    try {
      const s = JSON.parse(window.localStorage.getItem(STORE) || '{}')
      if (COUNTRIES.some((c) => c.id === s.country)) setCountry(s.country)
      if (CALL_TYPES.some((t) => t.id === s.type)) setType(s.type)
      if (typeof s.consent === 'boolean') setConsent(s.consent)
      if (typeof s.leads === 'number' && s.leads >= 0 && s.leads <= 100000) setLeads(s.leads)
      if (typeof s.mins === 'number' && s.mins >= 0 && s.mins <= 60) setMins(s.mins)
    } catch {
      /* no storage: defaults */
    }
  }, [])

  useEffect(() => {
    try {
      window.localStorage.setItem(STORE, JSON.stringify({ country, type, consent, leads, mins }))
    } catch {
      /* storage blocked */
    }
  }, [country, type, consent, leads, mins])

  const c = COUNTRIES.find((x) => x.id === country) ?? COUNTRIES[0]
  const t = CALL_TYPES.find((x) => x.id === type) ?? CALL_TYPES[0]
  const r = useMemo(() => checkCall(country, type, consent), [country, type, consent])
  const v = VERDICTS[r.verdict]
  const minutes = monthlyMinutes(leads, mins)
  const askConsent =
    t.marketing && (country === 'us' || country === 'uk' || country === 'au' || country === 'in')
  const rates = RATES.filter((x) =>
    country === 'in' ? x.currency === 'INR' : x.currency === 'USD'
  )
  const aiAllowed = r.verdict === 'go' || r.verdict === 'conditions'

  return (
    <div
      id="call-check"
      className="not-prose my-8 scroll-mt-24 rounded-2xl border border-border bg-surface p-5 md:p-7"
    >
      <div className="font-mono text-kicker uppercase tracking-[0.08em] text-signal-strong">
        Free tool · no AI · nothing uploaded
      </div>
      <h3 className="mt-2 text-h3 font-semibold text-fg">Can an AI make this call?</h3>
      <p className="mt-1 max-w-2xl text-small text-fg-2">
        Three answers, one verdict, and the rule behind it. Our reading of the rules, not legal
        advice.
      </p>

      <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="min-w-0 space-y-5">
          <fieldset className="min-w-0">
            <legend className="text-small font-medium text-fg">
              1. Where are the people you call?
            </legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {COUNTRIES.map((x) => (
                <button
                  key={x.id}
                  type="button"
                  aria-pressed={country === x.id}
                  onClick={() => setCountry(x.id)}
                  className={`${pill} ${
                    country === x.id
                      ? 'bg-signal text-white ring-signal'
                      : 'bg-surface text-fg ring-border-strong hover:bg-muted'
                  }`}
                >
                  {x.short}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="min-w-0">
            <legend className="text-small font-medium text-fg">2. What kind of call?</legend>
            <div className="mt-2 grid gap-2">
              {CALL_TYPES.map((x) => (
                <label
                  key={x.id}
                  className={`flex cursor-pointer gap-3 rounded-xl border p-3 transition-colors duration-fast has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-signal ${
                    type === x.id ? 'border-signal bg-signal-tint' : 'border-border hover:bg-muted'
                  }`}
                >
                  <input
                    type="radio"
                    name="re-call-type"
                    value={x.id}
                    checked={type === x.id}
                    onChange={() => setType(x.id)}
                    className="mt-1 h-4 w-4 shrink-0 accent-signal"
                  />
                  <span className="min-w-0">
                    <span className="block text-small font-medium text-fg">{x.label}</span>
                    <span className="block text-caption text-fg-2">{x.hint}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          {askConsent && (
            <fieldset className="min-w-0">
              <legend className="text-small font-medium text-fg">
                {country === 'uk'
                  ? '3. Did they agree (on record) to automated or AI calls from you?'
                  : '3. Did they agree in writing to automated or AI calls from you?'}
              </legend>
              <p className="mt-1 text-caption text-fg-2">
                A form or sign-in with consent wording that names you. A plain inquiry is not
                enough.
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {[
                  { v: true, l: 'Yes, I have it on record' },
                  { v: false, l: 'No, or not sure' },
                ].map((o) => (
                  <button
                    key={String(o.v)}
                    type="button"
                    aria-pressed={consent === o.v}
                    onClick={() => setConsent(o.v)}
                    className={`${pill} ${
                      consent === o.v
                        ? 'bg-signal text-white ring-signal'
                        : 'bg-surface text-fg ring-border-strong hover:bg-muted'
                    }`}
                  >
                    {o.l}
                  </button>
                ))}
              </div>
            </fieldset>
          )}
        </div>

        <div className="min-w-0">
          <p className="sr-only" aria-live="polite">
            {v.label}. {r.why}
          </p>
          <div className={`rounded-xl p-4 ring-1 ring-inset ${TONE[v.tone]}`}>
            <p className="font-mono text-kicker uppercase tracking-[0.08em]">
              {c.short} · {t.label}
            </p>
            <p className="mt-1 text-h4 font-semibold">{v.label}</p>
          </div>
          <p className="mt-3 text-small text-fg">{r.why}</p>
          <ul className="mt-3 space-y-2">
            {r.todo.map((x) => (
              <li key={x} className="flex gap-2 text-small text-fg">
                <span
                  aria-hidden="true"
                  className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-signal"
                />
                <span>{x}</span>
              </li>
            ))}
          </ul>
          {r.srcs.length > 0 && (
            <p className="mt-3 text-caption text-fg-2">
              Rules:{' '}
              {r.srcs.map((s, i) => (
                <span key={s}>
                  {i > 0 && ' · '}
                  <a className="text-signal-strong underline" href={SOURCES[s].url}>
                    {SOURCES[s].label}
                  </a>
                </span>
              ))}
            </p>
          )}
          <p className="mt-2 text-caption text-fg-3">{c.aiRule}</p>
        </div>
      </div>

      <div className="mt-7 border-t border-border pt-6">
        <h4 className="text-h4 font-semibold text-fg">What would the AI minutes cost a month?</h4>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <NumField
            label="Leads a month"
            value={leads}
            onChange={setLeads}
            min={0}
            max={100000}
            step={10}
            hint="Inquiries, sign-ins or showings you would call"
          />
          <NumField
            label="Billed minutes per lead"
            value={mins}
            onChange={setMins}
            min={0}
            max={60}
            step={0.5}
            hint="All attempts together, e.g. one 2.5-minute talk + short tries"
          />
        </div>
        <p className="mt-4 text-small text-fg">
          <span className="font-semibold tabular-nums">{minutes.toLocaleString('en-US')}</span> AI
          minutes a month.
          {!aiAllowed && (
            <span className="text-fg-2">
              {' '}
              For the call you picked above, a person should dial, so these minutes would not apply.
            </span>
          )}
        </p>
        <ul className="mt-3 divide-y divide-border rounded-xl border border-border">
          {rates.map((x) => {
            const k = cost(x, minutes)
            return (
              <li
                key={x.id}
                className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-4 py-3"
              >
                <span className="min-w-0 text-small text-fg">
                  <span className="font-medium">{x.label}</span>{' '}
                  <span className="text-fg-2">· {x.note}</span>
                </span>
                <span className="text-small font-semibold tabular-nums text-fg">
                  {k.low === k.high
                    ? money(k.low, x.currency)
                    : `${money(k.low, x.currency)}–${money(k.high, x.currency)}`}
                </span>
              </li>
            )
          })}
        </ul>
        <p className="mt-2 text-caption text-fg-3">
          {country === 'in'
            ? 'India: rupee prices as published; telephony, GST and set-up may be extra.'
            : 'US-dollar prices as published; plans, phone numbers and CRM add-ons are extra.'}{' '}
          Lofty and Ylopo price per lead or by quote, so they are not in this sum.{' '}
          <a className="text-signal-strong underline" href={TTAI_URL}>
            Try a voice agent on Tough Tongue AI (our product)
          </a>
        </p>
      </div>
    </div>
  )
}
