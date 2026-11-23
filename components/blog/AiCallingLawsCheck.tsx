'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  COUNTRIES,
  AUDIENCES,
  PURPOSES,
  VERDICTS,
  SOURCES,
  TTAI_URL,
  checkCall,
  asksConsent,
  asksPhone,
  type CountryId,
  type Audience,
  type Purpose,
  type Phone,
} from '@/data/aiCallingLaws'

const STORE = 'aia-ai-call-law-check-v1'

const TONE = {
  success: 'bg-success-soft text-success-strong ring-success/30',
  warn: 'bg-warn-soft text-fg ring-warn/40',
  danger: 'bg-danger-soft text-fg ring-danger/30',
} as const

const pill =
  'inline-flex min-h-10 items-center rounded-full px-4 py-2 text-left text-small font-medium ring-1 ring-inset transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2'
const on = 'bg-signal text-white ring-signal'
const off = 'bg-surface text-fg ring-border-strong hover:bg-muted'

function Pills<T extends string | boolean>({
  options,
  value,
  onChange,
}: {
  options: { v: T; l: string }[]
  value: T
  onChange: (v: T) => void
}) {
  return (
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
  )
}

/**
 * Is this AI call legal? Pick where the people are, who they are, what the call is for and
 * whether you hold consent; get a verdict, what to do and the rules behind it.
 * No AI; nothing leaves this browser; the last answers are kept on this device.
 */
export default function AiCallingLawsCheck() {
  const [country, setCountry] = useState<CountryId>('us')
  const [audience, setAudience] = useState<Audience>('business')
  const [purpose, setPurpose] = useState<Purpose>('sales')
  const [consent, setConsent] = useState(false)
  const [phone, setPhone] = useState<Phone>('mobile')

  useEffect(() => {
    try {
      const s = JSON.parse(window.localStorage.getItem(STORE) || '{}')
      if (COUNTRIES.some((c) => c.id === s.country)) setCountry(s.country)
      if (AUDIENCES.some((a) => a.id === s.audience)) setAudience(s.audience)
      if (PURPOSES.some((p) => p.id === s.purpose)) setPurpose(s.purpose)
      if (typeof s.consent === 'boolean') setConsent(s.consent)
      if (['mobile', 'landline', 'unsure'].includes(s.phone)) setPhone(s.phone)
    } catch {
      /* no storage: defaults */
    }
  }, [])

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORE,
        JSON.stringify({ country, audience, purpose, consent, phone })
      )
    } catch {
      /* storage blocked */
    }
  }, [country, audience, purpose, consent, phone])

  const c = COUNTRIES.find((x) => x.id === country) ?? COUNTRIES[0]
  const p = PURPOSES.find((x) => x.id === purpose) ?? PURPOSES[0]
  const showConsent = asksConsent({ country, purpose })
  const showPhone = asksPhone({ country, audience, purpose })
  const r = useMemo(
    () => checkCall({ country, audience, purpose, consent, phone }),
    [country, audience, purpose, consent, phone]
  )
  const v = VERDICTS[r.verdict]
  let step = 3

  return (
    <div
      id="call-check"
      className="not-prose my-8 scroll-mt-24 rounded-2xl border border-border bg-surface p-5 md:p-7"
    >
      <div className="font-mono text-kicker uppercase tracking-[0.08em] text-signal-strong">
        Free tool · no AI · nothing uploaded
      </div>
      <h3 className="mt-2 text-h3 font-semibold text-fg">Is this AI call legal?</h3>
      <p className="mt-1 max-w-2xl text-small text-fg-2">
        A few answers, one verdict, and the rule behind it. Our reading of the rules quoted on this
        page, not legal advice.
      </p>

      <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="min-w-0 space-y-5">
          <fieldset className="min-w-0">
            <legend className="text-small font-medium text-fg">
              1. Where are the people you call?
            </legend>
            <Pills<CountryId>
              options={COUNTRIES.map((x) => ({ v: x.id, l: x.short }))}
              value={country}
              onChange={setCountry}
            />
          </fieldset>

          <fieldset className="min-w-0">
            <legend className="text-small font-medium text-fg">2. Who picks up?</legend>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {AUDIENCES.map((x) => (
                <label
                  key={x.id}
                  className={`flex cursor-pointer gap-3 rounded-xl border p-3 transition-colors duration-fast has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-signal ${
                    audience === x.id
                      ? 'border-signal bg-signal-tint'
                      : 'border-border hover:bg-muted'
                  }`}
                >
                  <input
                    type="radio"
                    name="law-audience"
                    value={x.id}
                    checked={audience === x.id}
                    onChange={() => setAudience(x.id)}
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

          <fieldset className="min-w-0">
            <legend className="text-small font-medium text-fg">3. What is the call for?</legend>
            <div className="mt-2 grid gap-2">
              {PURPOSES.map((x) => (
                <label
                  key={x.id}
                  className={`flex cursor-pointer gap-3 rounded-xl border p-3 transition-colors duration-fast has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-signal ${
                    purpose === x.id
                      ? 'border-signal bg-signal-tint'
                      : 'border-border hover:bg-muted'
                  }`}
                >
                  <input
                    type="radio"
                    name="law-purpose"
                    value={x.id}
                    checked={purpose === x.id}
                    onChange={() => setPurpose(x.id)}
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

          {showConsent && (
            <fieldset className="min-w-0">
              <legend className="text-small font-medium text-fg">
                {++step}.{' '}
                {purpose === 'service'
                  ? 'Did they give you this number for these calls, or agree to automated calls?'
                  : country === 'us'
                    ? 'Do you hold their written consent to AI or automated sales calls from you?'
                    : 'Did they agree, on record, to AI or automated sales calls from you?'}
              </legend>
              <p className="mt-1 text-caption text-fg-2">
                Form or contract wording that names you and covers these calls. A download, a
                business card or a bought list is not consent.
              </p>
              <Pills<boolean>
                options={[
                  { v: true, l: 'Yes, on record' },
                  { v: false, l: 'No, or not sure' },
                ]}
                value={consent}
                onChange={setConsent}
              />
            </fieldset>
          )}

          {showPhone && (
            <fieldset className="min-w-0">
              <legend className="text-small font-medium text-fg">
                {++step}. What kind of number is it?
              </legend>
              <p className="mt-1 text-caption text-fg-2">
                The US mobile rule covers business mobiles. Not sure counts as mobile.
              </p>
              <Pills<Phone>
                options={[
                  { v: 'mobile' as Phone, l: 'Mobile' },
                  { v: 'landline' as Phone, l: 'Company landline' },
                  { v: 'unsure' as Phone, l: 'Not sure' },
                ]}
                value={phone}
                onChange={setPhone}
              />
            </fieldset>
          )}
        </div>

        <div className="min-w-0">
          <p className="sr-only" aria-live="polite">
            {v.label}. {r.why}
          </p>
          <div className={`rounded-xl p-4 ring-1 ring-inset ${TONE[v.tone]}`}>
            <p className="font-mono text-kicker uppercase tracking-[0.08em]">
              {c.short} · {p.label}
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
              {r.srcs.map((s, k) => (
                <span key={s}>
                  {k > 0 && ' · '}
                  <a className="text-signal-strong underline" href={SOURCES[s].url}>
                    {SOURCES[s].label}
                  </a>
                </span>
              ))}
            </p>
          )}
          <p className="mt-2 text-caption text-fg-3">Must it say it is an AI? {c.disclose}</p>
          {r.verdict === 'human' && (
            <p className="mt-4 rounded-xl border border-border bg-muted p-3 text-small text-fg">
              Where a person must make the call, AI can still help them make it well: practise the
              call against an AI buyer first.{' '}
              <a className="font-medium text-signal-strong underline" href={TTAI_URL}>
                Practise on Tough Tongue AI (our product)
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
