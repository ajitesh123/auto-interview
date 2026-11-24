'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  KINDS,
  SOURCES,
  CHECKED,
  TTAI_URL,
  WORKED,
  pick,
  type WhoTalks,
  type Audience,
  type Country,
} from '@/data/aiColdCalling'

const STORE = 'aia-cold-calling-picker-v1'

const TONE = {
  go: 'bg-success-soft text-success-strong ring-success/30',
  conditions: 'bg-warn-soft text-fg ring-warn/40',
  stop: 'bg-danger-soft text-fg ring-danger/30',
} as const

const VERDICT = {
  go: 'Fits',
  conditions: 'Fits, with conditions',
  stop: 'Not for cold lists',
} as const

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
        inputMode="numeric"
        min={min}
        max={max}
        step={step}
        value={text}
        onChange={(e) => {
          setText(e.target.value)
          const n = parseFloat(e.target.value)
          if (Number.isFinite(n)) onChange(Math.max(min, Math.min(max, Math.round(n))))
        }}
        onBlur={() => {
          const n = parseFloat(text)
          const v = Number.isFinite(n) ? Math.max(min, Math.min(max, Math.round(n))) : value
          setText(String(v))
          onChange(v)
        }}
        className="mt-1 h-11 w-full rounded-lg border border-border-input bg-surface px-3 text-body tabular-nums text-fg"
      />
      <span className="mt-1 block text-caption text-fg-3">{hint}</span>
    </label>
  )
}

function Pills<T extends string | boolean>({
  legend,
  value,
  options,
  onChange,
}: {
  legend: string
  value: T
  options: { v: T; l: string }[]
  onChange: (v: T) => void
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="text-small font-medium text-fg">{legend}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={String(o.v)}
            type="button"
            aria-pressed={value === o.v}
            onClick={() => onChange(o.v)}
            className={`${pill} ${value === o.v ? on : off}`}
          >
            {o.l}
          </button>
        ))}
      </div>
    </fieldset>
  )
}

/**
 * Pick who talks, how many reps, who you call and where; get the kind of tool, a verdict,
 * a shortlist priced at published list prices, and the rules behind it.
 * No AI; nothing leaves this browser; answers kept on this device.
 */
export default function ColdCallingPicker() {
  const [who, setWho] = useState<WhoTalks>('rep')
  const [reps, setReps] = useState(WORKED.reps)
  const [minutes, setMinutes] = useState(WORKED.minutes)
  const [audience, setAudience] = useState<Audience>('bizMobile')
  const [country, setCountry] = useState<Country>('us')
  const [consent, setConsent] = useState(false)

  useEffect(() => {
    try {
      const s = JSON.parse(window.localStorage.getItem(STORE) || '{}')
      if (s.who === 'ai' || s.who === 'rep') setWho(s.who)
      if (typeof s.reps === 'number' && s.reps >= 1 && s.reps <= 500) setReps(s.reps)
      if (typeof s.minutes === 'number' && s.minutes >= 100 && s.minutes <= 1000000)
        setMinutes(s.minutes)
      if (['consumers', 'bizMobile', 'bizLandline'].includes(s.audience)) setAudience(s.audience)
      if (['us', 'uk', 'in', 'other'].includes(s.country)) setCountry(s.country)
      if (typeof s.consent === 'boolean') setConsent(s.consent)
    } catch {
      /* no storage: defaults */
    }
  }, [])

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORE,
        JSON.stringify({ who, reps, minutes, audience, country, consent })
      )
    } catch {
      /* storage blocked */
    }
  }, [who, reps, minutes, audience, country, consent])

  const r = useMemo(
    () => pick({ who, reps, minutes, audience, country, consent }),
    [who, reps, minutes, audience, country, consent]
  )
  const askConsent =
    who === 'ai' && (country === 'uk' || (country === 'us' && audience !== 'bizLandline'))

  return (
    <div
      id="picker"
      className="not-prose my-8 scroll-mt-24 rounded-2xl border border-border bg-surface p-5 md:p-7"
    >
      <div className="font-mono text-kicker uppercase tracking-[0.08em] text-signal-strong">
        Free tool · no AI · nothing uploaded
      </div>
      <h3 className="mt-2 text-h3 font-semibold text-fg">
        Which cold calling tool fits your team?
      </h3>
      <p className="mt-1 max-w-2xl text-small text-fg-2">
        A few answers. You get the kind of tool, a shortlist priced at the list prices we read on{' '}
        {CHECKED}, and the rules that apply. Our reading of the rules, not legal advice.
      </p>

      <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="min-w-0 space-y-5">
          <Pills<WhoTalks>
            legend="1. Who should talk on the call?"
            value={who}
            onChange={setWho}
            options={[
              { v: 'rep', l: 'My reps talk' },
              { v: 'ai', l: 'An AI voice talks' },
            ]}
          />
          <Pills<Country>
            legend="2. Where are the people you call?"
            value={country}
            onChange={setCountry}
            options={[
              { v: 'us', l: 'US' },
              { v: 'uk', l: 'UK' },
              { v: 'in', l: 'India' },
              { v: 'other', l: 'Elsewhere' },
            ]}
          />
          <Pills<Audience>
            legend="3. Whose phones ring?"
            value={audience}
            onChange={setAudience}
            options={[
              { v: 'bizMobile', l: 'Business people, on mobiles' },
              { v: 'bizLandline', l: 'Business landlines only' },
              { v: 'consumers', l: 'Consumers' },
            ]}
          />
          {askConsent && (
            <Pills<boolean>
              legend={
                country === 'us'
                  ? '4. Did they agree in writing to AI calls from you?'
                  : '4. Did they agree to automated or AI calls from you?'
              }
              value={consent}
              onChange={setConsent}
              options={[
                { v: true, l: 'Yes, on record' },
                { v: false, l: 'No, it is a cold list' },
              ]}
            />
          )}
          {who === 'rep' ? (
            <NumField
              label={askConsent ? '5. Reps who cold call' : '4. Reps who cold call'}
              value={reps}
              onChange={setReps}
              min={1}
              max={500}
              step={1}
              hint="Seats you would buy"
            />
          ) : (
            <NumField
              label={askConsent ? '5. AI minutes a month' : '4. AI minutes a month'}
              value={minutes}
              onChange={setMinutes}
              min={100}
              max={1000000}
              step={100}
              hint="Billed minutes, all attempts together"
            />
          )}
        </div>

        <div className="min-w-0">
          <p className="sr-only" aria-live="polite">
            {VERDICT[r.verdict]}. {r.headline}
          </p>
          <div className={`rounded-xl p-4 ring-1 ring-inset ${TONE[r.verdict]}`}>
            <p className="font-mono text-kicker uppercase tracking-[0.08em]">
              {KINDS[r.kind].label} · {KINDS[r.kind].short}
            </p>
            <p className="mt-1 text-h4 font-semibold">{VERDICT[r.verdict]}</p>
          </div>
          <p className="mt-3 text-small text-fg">{r.headline}</p>
          {r.why.length > 0 && (
            <ul className="mt-3 space-y-2">
              {r.why.map((x) => (
                <li key={x} className="flex gap-2 text-small text-fg">
                  <span
                    aria-hidden="true"
                    className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-signal"
                  />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          )}
          {r.rules.length > 0 ? (
            <p className="mt-3 text-caption text-fg-2">
              Rules:{' '}
              {r.rules.map((x, i) => (
                <span key={x.id}>
                  {i > 0 && ' · '}
                  <a className="text-signal-strong underline" href={SOURCES[x.src].url}>
                    {x.title}
                  </a>
                </span>
              ))}
            </p>
          ) : (
            <p className="mt-3 text-caption text-fg-2">
              Check your country in our{' '}
              <a
                className="text-signal-strong underline"
                href="/blog/ai-calling-compliance-guide-2026-fcc-tcpa-global-regulations"
              >
                AI calling laws guide (8 countries)
              </a>
              .
            </p>
          )}
        </div>
      </div>

      <div className="mt-7 border-t border-border pt-6">
        <h4 className="text-h4 font-semibold text-fg">
          {who === 'ai'
            ? `What ${minutes.toLocaleString('en-US')} AI minutes cost a month`
            : `What ${reps} ${reps === 1 ? 'seat costs' : 'seats cost'} in year one`}
        </h4>
        <ul className="mt-3 divide-y divide-border rounded-xl border border-border">
          {r.priced.map((p) => (
            <li
              key={p.tool.id}
              className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-4 py-3"
            >
              <span className="min-w-0 text-small text-fg">
                <a className="font-medium text-signal-strong underline" href={p.tool.url}>
                  {p.tool.name}
                </a>{' '}
                <span className="text-fg-2">· {KINDS[p.tool.kind].short}</span>
              </span>
              <span className="text-small font-semibold tabular-nums text-fg">{p.text}</span>
            </li>
          ))}
        </ul>
        {r.hidden.length > 0 && (
          <p className="mt-2 text-caption text-fg-2">
            No published {who === 'ai' ? 'per-minute' : 'dialer'} price to compute:{' '}
            {r.hidden.map((t) => t.name).join(', ')}.
            {who === 'rep' && reps < 9 && ' Orum sells at least 9 seats.'}
          </p>
        )}
        <p className="mt-2 text-caption text-fg-3">
          {who === 'ai'
            ? 'Per-minute list prices (Aircall has a $99 monthly minimum); phone numbers, plan fees and extra concurrency are on top.'
            : 'Seat list price × seats × 12 at annual billing (one rep: Regie.ai Pro at $41); phone minutes and add-ons are on top.'}{' '}
          <a className="text-signal-strong underline" href={TTAI_URL}>
            Practise cold calls or build a voice agent on Tough Tongue AI (our product)
          </a>
        </p>
      </div>
    </div>
  )
}
