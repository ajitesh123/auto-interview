'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  BLANK,
  type Channel,
  checkMessage,
  type Inputs,
  LEVERS,
  type Market,
  money,
  MOMENTS,
  type Moment,
  numbers,
  replies,
  SAMPLES,
  script,
  type Status,
  words,
} from '@/data/negotiation/engine'

const KEY = 'aia.negotiationBuilder.v1'
const kicker = 'font-mono text-kicker uppercase tracking-[0.08em]'
const field =
  'mt-1.5 w-full min-w-0 rounded-lg border border-border-input bg-surface px-3 text-small text-fg placeholder:text-fg-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-strong'
const btn2 =
  'inline-flex h-11 items-center justify-center gap-2 rounded-full bg-surface px-4 text-small font-semibold text-fg ring-1 ring-inset ring-border-strong transition-colors duration-fast hover:bg-muted disabled:opacity-50'
const btn1 =
  'inline-flex h-11 items-center justify-center gap-2 rounded-full bg-signal px-5 text-small font-semibold text-white shadow-e1 transition-colors duration-fast hover:bg-signal-strong disabled:opacity-50'

/** Aon, 14 Oct 2026: actual average increase in India in 2026. */
const AON_2026 = 9

const STATUS: Record<Status, { label: string; cls: string; icon: string }> = {
  pass: { label: 'Pass', cls: 'bg-success-soft text-success-strong', icon: 'M3.5 8.5l3 3 6-7' },
  warn: { label: 'Fix', cls: 'bg-warn-soft text-warn', icon: 'M8 4v5M8 11.5v.5' },
  fail: { label: 'Fix first', cls: 'bg-danger-soft text-fg', icon: 'M4.5 4.5l7 7M11.5 4.5l-7 7' },
}

const CHECKED: Moment[] = ['expected', 'counter', 'budget']

function Badge({ s }: { s: Status }) {
  const st = STATUS[s]
  return (
    <span
      className={`inline-flex h-6 shrink-0 items-center gap-1 rounded-full px-2 text-caption font-semibold ${st.cls}`}
    >
      <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
        <path d={st.icon} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      {st.label}
    </span>
  )
}

export function Checks({ text }: { text: string }) {
  const res = checkMessage(text)
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <div className={`${kicker} text-fg-3`}>Checks</div>
        <div className="text-small font-semibold tabular-nums text-fg" aria-live="polite">
          {res.passed} of {res.checks.length} pass
        </div>
      </div>
      <ul className="mt-3 divide-y divide-border rounded-xl border border-border bg-surface">
        {res.checks.map((c) => (
          <li key={c.id} className="flex items-start gap-3 px-4 py-3">
            <Badge s={c.status} />
            <span className="min-w-0">
              <span className="block text-small font-medium text-fg">{c.title}</span>
              <span className="block text-caption text-fg-2">{c.detail}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className="block min-w-0">
      <span className="text-small font-medium text-fg">{label}</span>
      {hint && <span className="block text-caption text-fg-3">{hint}</span>}
      {children}
    </label>
  )
}

/** Number input that keeps what you type while focused and clamps on blur. */
function NumField({
  label,
  hint,
  value,
  onChange,
  max,
  step = 'any',
  prefix,
  suffix,
}: {
  label: string
  hint?: string
  value: number
  onChange: (v: number) => void
  max: number
  step?: string
  prefix?: string
  suffix?: string
}) {
  const [text, setText] = useState(value ? String(value) : '')
  const [focus, setFocus] = useState(false)
  useEffect(() => {
    if (!focus) setText(value ? String(value) : '')
  }, [value, focus])
  const parse = (s: string) => {
    const v = parseFloat(s.replace(/[,₹$\s]/g, ''))
    return isFinite(v) ? Math.min(max, Math.max(0, v)) : 0
  }
  return (
    <Field label={label} hint={hint}>
      <span className="relative mt-1.5 block">
        {prefix && (
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-small text-fg-3">
            {prefix}
          </span>
        )}
        <input
          inputMode="decimal"
          className={`${field} mt-0 h-11 tabular-nums ${prefix ? 'pl-7' : ''} ${suffix ? 'pr-12' : ''}`}
          value={text}
          step={step}
          onFocus={() => setFocus(true)}
          onChange={(e) => {
            setText(e.target.value)
            onChange(parse(e.target.value))
          }}
          onBlur={() => {
            setFocus(false)
            const v = parse(text)
            onChange(v)
            setText(v ? String(v) : '')
          }}
        />
        {suffix && (
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-caption text-fg-3">
            {suffix}
          </span>
        )}
      </span>
    </Field>
  )
}

/** Offer, walk-away and ask on one line, so the gap is visible. CSS transitions only. */
function GapLine({ i }: { i: Inputs }) {
  const n = numbers(i)
  const pts = [
    { k: 'Offer', v: i.offer, cls: 'bg-fg-3' },
    { k: 'Walk-away', v: i.floor, cls: 'bg-warn' },
    { k: 'Your counter', v: n.preciseAsk, cls: 'bg-signal' },
    ...(i.market === 'in' && i.current > 0
      ? [{ k: 'Current', v: i.current, cls: 'bg-border-strong' }]
      : []),
  ].filter((p) => p.v > 0)
  if (pts.length < 2) return null
  const lo = Math.min(...pts.map((p) => p.v)) * 0.94
  const hi = Math.max(...pts.map((p) => p.v)) * 1.04
  const x = (v: number) => ((v - lo) / (hi - lo)) * 100
  const offerX = x(i.offer)
  const askX = x(n.preciseAsk)
  return (
    <div
      className="mt-5"
      role="img"
      aria-label={pts.map((p) => `${p.k} ${money(i.market, p.v, false)}`).join(', ')}
    >
      <div className="relative h-10">
        <div className="absolute inset-x-0 top-5 h-px bg-border-strong" />
        {i.offer > 0 && n.preciseAsk > i.offer && (
          <div
            className="absolute top-[18px] h-[5px] rounded-full bg-signal/30 transition-[left,width] duration-slow ease-out motion-reduce:transition-none"
            style={{ left: `${offerX}%`, width: `${Math.max(0, askX - offerX)}%` }}
          />
        )}
        {pts.map((p) => (
          <span
            key={p.k}
            className={`absolute top-[14px] h-3 w-3 -translate-x-1/2 rounded-full ring-2 ring-surface transition-[left] duration-slow ease-out motion-reduce:transition-none ${p.cls}`}
            style={{ left: `${x(p.v)}%` }}
          />
        ))}
      </div>
      <ul className="flex flex-wrap gap-x-4 gap-y-1 text-caption text-fg-2">
        {pts.map((p) => (
          <li key={p.k} className="inline-flex items-center gap-1.5">
            <span className={`h-2.5 w-2.5 rounded-full ${p.cls}`} aria-hidden="true" />
            {p.k}{' '}
            <span className="font-semibold tabular-nums text-fg">
              {money(i.market, p.v, false)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function NegotiationBuilder() {
  const [inputs, setInputs] = useState<Inputs>(SAMPLES[0].inputs)
  const [moment, setMoment] = useState<Moment>('counter')
  const [ch, setCh] = useState<Channel>('email')
  const [loaded, setLoaded] = useState(false)
  const [note, setNote] = useState('')
  const [own, setOwn] = useState('')
  const [open, setOpen] = useState<string | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY)
      if (raw) {
        const v = JSON.parse(raw) as { inputs?: Partial<Inputs>; moment?: Moment }
        if (v.inputs && typeof v.inputs === 'object') {
          const merged = { ...BLANK, ...v.inputs } as Inputs
          ;(Object.keys(BLANK) as (keyof Inputs)[]).forEach((k) => {
            if (typeof merged[k] !== typeof BLANK[k])
              (merged as unknown as Record<string, unknown>)[k] = BLANK[k]
          })
          if (merged.market !== 'in' && merged.market !== 'us') merged.market = 'in'
          if (!LEVERS.some((l) => l.id === merged.lever)) merged.lever = 'market'
          setInputs(merged)
        }
        if (v.moment && MOMENTS.some((m) => m.id === v.moment)) setMoment(v.moment)
      }
    } catch {
      /* private mode or blocked storage: the tool still works, it just won't remember */
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    try {
      localStorage.setItem(KEY, JSON.stringify({ inputs, moment }))
    } catch {
      /* ignore */
    }
  }, [inputs, moment, loaded])

  useEffect(() => {
    if (!note) return
    const id = setTimeout(() => setNote(''), 3500)
    return () => clearTimeout(id)
  }, [note])

  const n = useMemo(() => numbers(inputs), [inputs])
  const out = useMemo(() => script(inputs, moment, ch), [inputs, moment, ch])
  const rep = useMemo(() => replies(inputs), [inputs])
  const set = <K extends keyof Inputs>(k: K, v: Inputs[K]) => setInputs((i) => ({ ...i, [k]: v }))
  const m = inputs.market
  const unit = m === 'in' ? 'LPA' : 'a year'
  const maxPay = m === 'in' ? 1000 : 5000000

  const copy = async (text: string, what: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setNote(`${what} copied. Read it once and change anything that is not true for you.`)
    } catch {
      setNote('Could not copy here. Select the text and copy it instead.')
    }
  }

  const switchMarket = (mk: Market) => {
    if (mk === m) return
    const s = SAMPLES.find((x) => x.inputs.market === mk)
    setInputs((i) => ({
      ...(s ? s.inputs : BLANK),
      market: mk,
      myName: i.myName || (s ? s.inputs.myName : ''),
    }))
    setNote(
      mk === 'in'
        ? 'India: amounts in LPA (lakh per annum, fixed CTC). A sample is loaded.'
        : 'US: amounts are annual base salary in dollars. A sample is loaded.'
    )
  }

  const full = `${out.subject ? `Subject: ${out.subject}\n\n` : ''}${out.body}`
  const ids = MOMENTS.map((x) => x.id)
  const onTabKey = (e: React.KeyboardEvent) => {
    const idx = ids.indexOf(moment)
    let k = -1
    if (e.key === 'ArrowRight') k = (idx + 1) % ids.length
    else if (e.key === 'ArrowLeft') k = (idx - 1 + ids.length) % ids.length
    else if (e.key === 'Home') k = 0
    else if (e.key === 'End') k = ids.length - 1
    if (k < 0) return
    e.preventDefault()
    setMoment(ids[k])
    document.getElementById(`neg-tab-${ids[k]}`)?.focus()
  }

  return (
    <div className="space-y-10">
      <div className="grid gap-8 lg:grid-cols-12">
        {/* ---------- Inputs ---------- */}
        <form
          className="min-w-0 space-y-6 lg:col-span-5"
          onSubmit={(e) => e.preventDefault()}
          aria-label="Your offer"
        >
          <fieldset className="min-w-0">
            <legend className="text-small font-medium text-fg">Where is the job?</legend>
            <div className="mt-2 inline-flex rounded-full bg-muted p-1">
              {(
                [
                  ['in', 'India (CTC, LPA)'],
                  ['us', 'US ($ base)'],
                ] as const
              ).map(([id, label]) => (
                <label
                  key={id}
                  className={`cursor-pointer rounded-full px-4 py-2 text-small font-medium transition-colors duration-fast has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-signal-strong ${
                    m === id ? 'bg-surface text-fg shadow-e1' : 'text-fg-2 hover:text-fg'
                  }`}
                >
                  <input
                    type="radio"
                    name="market"
                    value={id}
                    checked={m === id}
                    onChange={() => switchMarket(id)}
                    className="sr-only"
                  />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <div className={`${kicker} text-fg-3`}>Start from a sample (fictional)</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {SAMPLES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setInputs(s.inputs)
                    setNote(`Loaded: ${s.label}. Change the details to yours.`)
                  }}
                  className="inline-flex min-h-9 items-center rounded-full bg-muted px-3 py-1.5 text-left text-caption font-medium text-fg-2 transition-colors duration-fast hover:bg-signal-tint hover:text-signal-ink"
                >
                  {s.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  setInputs({ ...BLANK, market: m, myName: inputs.myName })
                  setNote('Cleared. Fill in your own offer.')
                }}
                className="inline-flex min-h-9 items-center rounded-full px-3 py-1.5 text-caption font-medium text-fg-2 underline decoration-border-strong underline-offset-2 hover:text-fg"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <NumField
              label={m === 'in' ? 'Their offer (fixed)' : 'Their offer (base)'}
              hint="From the offer letter or call"
              value={inputs.offer}
              onChange={(v) => set('offer', v)}
              max={maxPay}
              prefix={m === 'in' ? '₹' : '$'}
              suffix={unit}
            />
            <NumField
              label="Your ask"
              hint="The top number you can justify"
              value={inputs.ask}
              onChange={(v) => set('ask', v)}
              max={maxPay}
              prefix={m === 'in' ? '₹' : '$'}
              suffix={unit}
            />
            <NumField
              label="Your walk-away"
              hint="Below this you say no. Private."
              value={inputs.floor}
              onChange={(v) => set('floor', v)}
              max={maxPay}
              prefix={m === 'in' ? '₹' : '$'}
              suffix={unit}
            />
            {m === 'in' && (
              <NumField
                label="Your current fixed"
                hint="Optional. Only for the hike maths."
                value={inputs.current}
                onChange={(v) => set('current', v)}
                max={maxPay}
                prefix="₹"
                suffix={unit}
              />
            )}
          </div>

          <fieldset className="min-w-0">
            <legend className="text-small font-medium text-fg">Your main reason</legend>
            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
              {LEVERS.map((l) => (
                <label
                  key={l.id}
                  className={`cursor-pointer rounded-xl border px-3 py-2.5 transition-colors duration-fast has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-signal-strong ${
                    inputs.lever === l.id
                      ? 'border-signal bg-signal-tint'
                      : 'border-border bg-surface hover:border-border-strong'
                  }`}
                >
                  <input
                    type="radio"
                    name="lever"
                    value={l.id}
                    checked={inputs.lever === l.id}
                    onChange={() => set('lever', l.id)}
                    className="sr-only"
                  />
                  <span className="block text-small font-semibold text-fg">{l.name}</span>
                  <span className="block text-caption text-fg-2">{l.hint}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {inputs.lever === 'competing' ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <NumField
                label="The other offer"
                value={inputs.competing}
                onChange={(v) => set('competing', v)}
                max={maxPay}
                prefix={m === 'in' ? '₹' : '$'}
                suffix={unit}
              />
              <Field label="From" hint="Name it, or describe it">
                <input
                  className={`${field} h-11`}
                  value={inputs.competingCo}
                  onChange={(e) => set('competingCo', e.target.value)}
                  placeholder="a Series C fintech"
                  autoComplete="off"
                />
              </Field>
            </div>
          ) : (
            <Field
              label={
                inputs.lever === 'scope'
                  ? 'What makes the role bigger'
                  : 'What you bring, with a number'
              }
              hint={
                inputs.lever === 'scope'
                  ? 'From the interviews or the job post'
                  : 'Optional. Finishes “…what I bring (___)”'
              }
            >
              <input
                className={`${field} h-11`}
                value={inputs.evidence}
                onChange={(e) => set('evidence', e.target.value)}
                placeholder={
                  inputs.lever === 'scope'
                    ? 'on-call ownership of the payouts service'
                    : 'the dashboards that cut reporting from 2 days to 2 hours'
                }
                autoComplete="off"
              />
            </Field>
          )}

          <Field label="What you are excited about" hint="Finishes “I am excited about …”">
            <input
              className={`${field} h-11`}
              value={inputs.why}
              onChange={(e) => set('why', e.target.value)}
              placeholder="the payments risk team"
              autoComplete="off"
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Your name">
              <input
                className={`${field} h-11`}
                value={inputs.myName}
                onChange={(e) => set('myName', e.target.value)}
                autoComplete="name"
              />
            </Field>
            <Field label="Recruiter’s first name">
              <input
                className={`${field} h-11`}
                value={inputs.recruiter}
                onChange={(e) => set('recruiter', e.target.value)}
                autoComplete="off"
              />
            </Field>
            <Field label="Company">
              <input
                className={`${field} h-11`}
                value={inputs.company}
                onChange={(e) => set('company', e.target.value)}
                autoComplete="organization"
              />
            </Field>
          </div>
          <Field label="Role title">
            <input
              className={`${field} h-11`}
              value={inputs.role}
              onChange={(e) => set('role', e.target.value)}
              autoComplete="off"
            />
          </Field>

          <details className="group rounded-xl border border-border bg-surface">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between px-4 text-small font-medium text-fg">
              More: deadline{m === 'in' ? ', notice period, buyout' : ''}, commitment
              <span
                aria-hidden="true"
                className="text-fg-3 transition-transform duration-base group-open:rotate-180"
              >
                ▾
              </span>
            </summary>
            <div className="grid gap-4 px-4 pb-4 sm:grid-cols-2">
              <NumField
                label="Working days you need to decide"
                value={inputs.timeDays}
                onChange={(v) => set('timeDays', Math.round(v))}
                max={10}
                suffix="days"
              />
              {m === 'in' && (
                <>
                  <NumField
                    label="Your notice period"
                    value={inputs.noticeDays}
                    onChange={(v) => set('noticeDays', Math.round(v))}
                    max={180}
                    suffix="days"
                  />
                  <NumField
                    label="Buyout amount"
                    hint="What your employer would recover"
                    value={inputs.buyout}
                    onChange={(v) => set('buyout', Math.round(v))}
                    max={10000000}
                    prefix="₹"
                  />
                </>
              )}
              <label className="flex items-start gap-3 sm:col-span-2">
                <input
                  type="checkbox"
                  checked={inputs.commit}
                  onChange={(e) => set('commit', e.target.checked)}
                  className="mt-1 h-4 w-4 accent-signal"
                />
                <span className="text-small text-fg">
                  I will sign if they meet my number
                  <span className="block text-caption text-fg-3">
                    Adds “If we can get there, I am ready to accept.” Untick it if that is not true.
                  </span>
                </span>
              </label>
            </div>
          </details>
        </form>

        {/* ---------- Output ---------- */}
        <div className="min-w-0 space-y-6 lg:col-span-7">
          <div className="rounded-2xl border border-border bg-surface p-5 shadow-e1 md:p-6">
            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <div className={`${kicker} text-fg-3`}>Say this number</div>
                <div
                  className="mt-1 text-h3 font-semibold tabular-nums text-signal-strong"
                  aria-live="polite"
                >
                  {money(m, n.preciseAsk, false)}
                </div>
                <div className="text-caption text-fg-3">
                  {n.roundNote
                    ? `Precise version of your round ${money(m, inputs.ask, false)}`
                    : 'Your ask, as typed'}
                </div>
              </div>
              <div>
                <div className={`${kicker} text-fg-3`}>Above the offer</div>
                <div className="mt-1 text-h3 font-semibold tabular-nums text-fg">
                  {inputs.offer > 0 && n.gap > 0 ? `+${n.gapPct}%` : '—'}
                </div>
                <div className="text-caption text-fg-3">
                  {inputs.offer > 0 && n.gap > 0
                    ? `${money(m, n.gap, false)} more`
                    : 'Add the offer and your ask'}
                </div>
              </div>
              <div>
                <div className={`${kicker} text-fg-3`}>
                  {m === 'in' ? 'Over your current' : 'Walk-away gap'}
                </div>
                <div className="mt-1 text-h3 font-semibold tabular-nums text-fg">
                  {m === 'in'
                    ? inputs.current > 0
                      ? `+${n.hikeOverCurrent}%`
                      : '—'
                    : inputs.floor > 0
                      ? money(m, n.floorGap, false)
                      : '—'}
                </div>
                <div className="text-caption text-fg-3">
                  {m === 'in'
                    ? `Average India raise in 2026: ${AON_2026}% (Aon)`
                    : 'How far the offer is below your floor'}
                </div>
              </div>
            </div>
            <GapLine i={inputs} />
            {n.warnings.length > 0 && (
              <ul className="mt-4 space-y-2" aria-live="polite">
                {n.warnings.map((w) => (
                  <li key={w} className="rounded-lg bg-warn-soft px-3 py-2 text-caption text-fg">
                    {w}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <div
              role="tablist"
              aria-label="Which moment are you in?"
              className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-1"
            >
              {MOMENTS.map((t) => (
                <button
                  key={t.id}
                  id={`neg-tab-${t.id}`}
                  role="tab"
                  type="button"
                  aria-selected={moment === t.id}
                  aria-controls="neg-panel"
                  tabIndex={moment === t.id ? 0 : -1}
                  onClick={() => setMoment(t.id)}
                  onKeyDown={onTabKey}
                  className={`min-w-0 rounded-xl border px-3 py-2 text-left transition-colors duration-fast focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-strong ${
                    moment === t.id
                      ? 'border-signal bg-signal-tint'
                      : 'border-border bg-surface hover:border-border-strong'
                  }`}
                >
                  <span className="block text-small font-semibold text-fg">{t.name}</span>
                  <span className="block text-caption text-fg-3">{t.when}</span>
                </button>
              ))}
            </div>

            <div
              id="neg-panel"
              role="tabpanel"
              aria-labelledby={`neg-tab-${moment}`}
              className="mt-4 rounded-2xl border border-border bg-surface p-4 md:p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div
                  className="inline-flex rounded-full bg-muted p-1"
                  role="group"
                  aria-label="Email or call"
                >
                  {(
                    [
                      ['email', 'Email'],
                      ['call', 'Call script'],
                    ] as const
                  ).map(([id, label]) => (
                    <button
                      key={id}
                      type="button"
                      aria-pressed={ch === id}
                      onClick={() => setCh(id)}
                      className={`rounded-full px-4 py-1.5 text-small font-medium transition-colors duration-fast focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-strong ${
                        ch === id ? 'bg-surface text-fg shadow-e1' : 'text-fg-2 hover:text-fg'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <span className="text-caption tabular-nums text-fg-3">{words(out.body)} words</span>
              </div>
              <p className="mt-3 text-caption text-fg-2">{out.note}</p>
              {out.subject && (
                <div className="mt-3 text-small text-fg">
                  <span className="text-fg-3">Subject: </span>
                  {out.subject}
                </div>
              )}
              <pre className="mt-2 whitespace-pre-wrap break-words rounded-xl bg-muted p-4 font-sans text-small leading-relaxed text-fg">
                {out.body}
              </pre>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className={btn1}
                  onClick={() => copy(full, ch === 'email' ? 'Email' : 'Script')}
                >
                  Copy {ch === 'email' ? 'email' : 'script'}
                </button>
                <button type="button" className={btn2} onClick={() => setOwn(out.body)}>
                  Edit and check it below
                </button>
              </div>
              <p className="mt-3 min-h-5 text-caption text-signal-ink" aria-live="polite">
                {note}
              </p>
            </div>
          </div>

          {CHECKED.includes(moment) && <Checks text={out.body} />}
        </div>
      </div>

      {/* ---------- Replies ---------- */}
      <div>
        <div className={`${kicker} text-signal-strong`}>
          When they say this · {rep.length} replies with your numbers
        </div>
        <h3 className="mt-2 text-h3 font-semibold text-fg">What to say back</h3>
        <ul className="mt-5 grid gap-3 md:grid-cols-2">
          {rep.map((r) => {
            const isOpen = open === r.id
            return (
              <li key={r.id} className="min-w-0 rounded-xl border border-border bg-surface">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : r.id)}
                  className="flex min-h-12 w-full items-center justify-between gap-3 px-4 py-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-strong"
                >
                  <span className="text-small font-semibold text-fg">{r.they}</span>
                  <span
                    aria-hidden="true"
                    className={`text-fg-3 transition-transform duration-base ${isOpen ? 'rotate-180' : ''}`}
                  >
                    ▾
                  </span>
                </button>
                {isOpen && (
                  <div className="space-y-3 px-4 pb-4">
                    <p className="rounded-lg bg-signal-tint p-3 text-small text-fg">{r.say}</p>
                    <p className="text-caption text-fg-2">{r.why}</p>
                    <button
                      type="button"
                      className={`${btn2} h-9`}
                      onClick={() => copy(r.say.replace(/[“”]/g, ''), 'Reply')}
                    >
                      Copy reply
                    </button>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </div>

      {/* ---------- Paste your own ---------- */}
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-6">
          <div className={`${kicker} text-signal-strong`}>Check your own draft</div>
          <h3 className="mt-2 text-h3 font-semibold text-fg">Paste the email you wrote</h3>
          <p className="mt-2 text-small text-fg-2">
            The same 8 rules run on your text, in this browser. Nothing is sent anywhere.
          </p>
          <textarea
            aria-label="Your negotiation email"
            className={`${field} mt-4 min-h-[220px] py-3 leading-relaxed`}
            value={own}
            onChange={(e) => setOwn(e.target.value)}
            placeholder="Hi Rohan, thank you for the offer…"
          />
        </div>
        <div className="min-w-0 lg:col-span-6">{own.trim() ? <Checks text={own} /> : null}</div>
      </div>
    </div>
  )
}
