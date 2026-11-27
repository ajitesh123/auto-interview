'use client'

import { useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  compute,
  COUNT_LABEL,
  type Count,
  type Currency,
  diffDays,
  fmtDate,
  fmtMoney,
  type Inputs,
  isValidISO,
  joiningEmail,
  MAX_LENGTH,
  type MonthRule,
  releaseEmail,
  SAMPLE,
  type Start,
  type Unit,
  validate,
} from '@/data/noticePeriod/engine'

const KEY = 'aia.noticePeriod.v1'
const kicker = 'font-mono text-kicker uppercase tracking-[0.08em]'
const field =
  'mt-1.5 h-11 w-full min-w-0 rounded-lg border border-border-input bg-surface px-3 text-small text-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-strong'
const label = 'block text-small font-medium text-fg'
const hint = 'mt-1 block text-caption text-fg-3'
const btn2 =
  'inline-flex h-11 items-center justify-center gap-2 rounded-full bg-surface px-4 text-small font-semibold text-fg ring-1 ring-inset ring-border-strong transition-colors duration-fast hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-strong'

/** Number field that keeps what you type while focused and clamps on blur. */
function NumField({
  id,
  value,
  onChange,
  min,
  max,
  placeholder,
}: {
  id: string
  value: number | undefined
  onChange: (n: number | undefined) => void
  min: number
  max: number
  placeholder?: string
}) {
  const [text, setText] = useState(value === undefined ? '' : String(value))
  const [focus, setFocus] = useState(false)
  useEffect(() => {
    if (!focus) setText(value === undefined ? '' : String(value))
  }, [value, focus])
  return (
    <input
      id={id}
      inputMode="numeric"
      className={field}
      value={text}
      placeholder={placeholder}
      onFocus={() => setFocus(true)}
      onChange={(e) => {
        const t = e.target.value.replace(/[^\d]/g, '')
        setText(t)
        if (t === '') onChange(undefined)
        else onChange(Math.min(max, Math.max(min, Number(t))))
      }}
      onBlur={() => {
        setFocus(false)
        if (text !== '') setText(String(Math.min(max, Math.max(min, Number(text)))))
      }}
    />
  )
}

function Seg<T extends string>({
  name,
  labelledBy,
  value,
  options,
  onChange,
}: {
  name: string
  labelledBy: string
  value: T
  options: [T, string][]
  onChange: (v: T) => void
}) {
  return (
    <div role="radiogroup" aria-labelledby={labelledBy} className="mt-1.5 flex flex-wrap gap-1.5">
      {options.map(([v, l]) => (
        <label
          key={v}
          className={`relative inline-flex min-h-10 cursor-pointer items-center rounded-full px-3.5 text-small ring-1 ring-inset transition-colors duration-fast has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-signal-strong ${
            value === v
              ? 'bg-signal-tint font-semibold text-signal-ink ring-signal/40'
              : 'bg-surface text-fg-2 ring-border hover:bg-muted'
          }`}
        >
          <input
            type="radio"
            name={name}
            value={v}
            checked={value === v}
            onChange={() => onChange(v)}
            className="sr-only"
          />
          {l}
        </label>
      ))}
    </div>
  )
}

function Copy({ text, children }: { text: string; children: ReactNode }) {
  const [done, setDone] = useState(false)
  return (
    <button
      type="button"
      className={btn2}
      onClick={() => {
        navigator.clipboard?.writeText(text).then(
          () => {
            setDone(true)
            setTimeout(() => setDone(false), 1800)
          },
          () => setDone(false)
        )
      }}
    >
      {done ? 'Copied' : children}
    </button>
  )
}

const HOL = /\d{4}-\d{2}-\d{2}/g
const plural = (n: number, w: string) => `${n} ${w}${n === 1 ? '' : 's'}`

export default function NoticePeriodCalculator() {
  const [i, setI] = useState<Inputs>(SAMPLE)
  const [holText, setHolText] = useState('')
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY)
      if (raw) {
        const s = JSON.parse(raw) as { i?: Record<string, unknown>; hol?: string }
        const v = s.i
        if (v && typeof v.resign === 'string' && isValidISO(v.resign)) {
          const str = (x: unknown) => (typeof x === 'string' && x ? x : undefined)
          const num = (x: unknown) => (typeof x === 'number' && Number.isFinite(x) ? x : undefined)
          setI({
            ...SAMPLE,
            resign: v.resign,
            length: num(v.length) ?? SAMPLE.length,
            unit: (['days', 'weeks', 'months'] as const).find((u) => u === v.unit) ?? 'days',
            count:
              (['calendar', 'mon-fri', 'mon-sat'] as const).find((u) => u === v.count) ??
              'calendar',
            start: v.start === 'same' ? 'same' : 'next',
            monthRule: v.monthRule === 'thirty' ? 'thirty' : 'calendar',
            leave: num(v.leave) ?? 0,
            join: str(v.join),
            pay: num(v.pay),
            currency: (['INR', 'USD', 'GBP'] as const).find((u) => u === v.currency) ?? 'INR',
            joined: str(v.joined),
            fixedTerm: v.fixedTerm === true,
            holidays: [],
          })
        }
        if (typeof s.hol === 'string') setHolText(s.hol)
      }
    } catch {
      /* private window or bad data: keep the example */
    }
    setLoaded(true)
  }, [])

  const inputs: Inputs = useMemo(
    () => ({ ...i, holidays: holText.match(HOL)?.filter(isValidISO) ?? [] }),
    [i, holText]
  )

  useEffect(() => {
    if (!loaded) return
    try {
      const save = {
        ...inputs,
        holidays: [],
        join: inputs.join ?? null,
        pay: inputs.pay ?? null,
        joined: inputs.joined ?? null,
      }
      localStorage.setItem(KEY, JSON.stringify({ i: save, hol: holText }))
    } catch {
      /* ignore */
    }
  }, [inputs, holText, loaded])

  const err = validate(inputs)
  const r = useMemo(() => (err ? undefined : compute(inputs)), [inputs, err])
  const set = <K extends keyof Inputs>(k: K, v: Inputs[K]) => setI((p) => ({ ...p, [k]: v }))
  const countApplies = i.unit === 'days' || (i.unit === 'months' && i.monthRule === 'thirty')
  const cur = i.currency

  // timeline geometry
  const tl = useMemo(() => {
    if (!r) return undefined
    const total = diffDays(r.startDay, r.lwd) + 1
    const pct = (d: string) =>
      Math.max(0, Math.min(100, ((diffDays(r.startDay, d) + 1) / total) * 100))
    const servedEnd = r.servedUntil ?? r.lwdWithLeave
    const served = diffDays(r.startDay, servedEnd) < 0 ? 0 : pct(servedEnd)
    const leaveEnd = pct(r.lwdWithLeave)
    const joinAt =
      inputs.join && diffDays(r.startDay, inputs.join) >= 0 && diffDays(inputs.join, r.lwd) >= 0
        ? (diffDays(r.startDay, inputs.join) / total) * 100
        : undefined
    return {
      served,
      buyout: Math.max(0, leaveEnd - served),
      leave: Math.max(0, 100 - leaveEnd),
      joinAt,
    }
  }, [r, inputs.join])

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {/* ---------- inputs ---------- */}
      <form
        className="min-w-0 space-y-5 rounded-2xl border border-border bg-surface p-5 md:p-6 lg:col-span-5"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Your notice period"
      >
        <div className="flex items-center justify-between gap-3">
          <div className={`${kicker} text-fg-3`}>Your notice</div>
          <button
            type="button"
            className="text-small font-medium text-signal-strong underline decoration-signal/30 underline-offset-2 hover:decoration-signal"
            onClick={() => {
              setI(SAMPLE)
              setHolText('')
            }}
          >
            Load the example
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="min-w-0">
            <label htmlFor="np-resign" className={label}>
              Day you resign
            </label>
            <input
              id="np-resign"
              type="date"
              className={field}
              value={i.resign}
              onChange={(e) => set('resign', e.target.value)}
            />
          </div>
          <div className="min-w-0">
            <label htmlFor="np-len" className={label}>
              Notice in your contract
            </label>
            <div className="flex gap-2">
              <div className="w-24 shrink-0">
                <NumField
                  id="np-len"
                  value={i.length}
                  min={1}
                  max={MAX_LENGTH[i.unit]}
                  onChange={(n) => set('length', n ?? 0)}
                />
              </div>
              <select
                aria-label="Notice unit"
                className={field}
                value={i.unit}
                onChange={(e) => {
                  const u = e.target.value as Unit
                  const days =
                    i.unit === 'months'
                      ? i.length * 30
                      : i.unit === 'weeks'
                        ? i.length * 7
                        : i.length
                  const n = u === 'months' ? days / 30 : u === 'weeks' ? days / 7 : days
                  setI((p) => ({
                    ...p,
                    unit: u,
                    length: Math.min(MAX_LENGTH[u], Math.max(1, Math.round(n))),
                  }))
                }}
              >
                <option value="days">days</option>
                <option value="weeks">weeks</option>
                <option value="months">months</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <span className={label} id="np-start-l">
            Does the day you resign count?
          </span>
          <Seg<Start>
            name="np-start"
            labelledBy="np-start-l"
            value={i.start}
            onChange={(v) => set('start', v)}
            options={[
              ['next', 'No, notice starts the next day'],
              ['same', 'Yes, it is day 1'],
            ]}
          />
          <span className={hint}>
            Check your appointment letter. If it is silent, notice usually starts the day after.
          </span>
        </div>

        {i.unit === 'months' && (
          <div>
            <span className={label} id="np-month-l">
              A month means
            </span>
            <Seg<MonthRule>
              name="np-month"
              labelledBy="np-month-l"
              value={i.monthRule}
              onChange={(v) => set('monthRule', v)}
              options={[
                ['calendar', 'A calendar month'],
                ['thirty', '30 days'],
              ]}
            />
          </div>
        )}

        {countApplies && (
          <div>
            <span className={label} id="np-count-l">
              Days are counted as
            </span>
            <Seg<Count>
              name="np-count"
              labelledBy="np-count-l"
              value={i.count}
              onChange={(v) => set('count', v)}
              options={[
                ['calendar', 'Calendar days'],
                ['mon-fri', 'Working days, Mon–Fri'],
                ['mon-sat', 'Mon–Sat'],
              ]}
            />
            <span className={hint}>Calendar days unless your contract says working days.</span>
          </div>
        )}

        {countApplies && i.count !== 'calendar' && (
          <div>
            <label htmlFor="np-hol" className={label}>
              Company holidays during the notice (optional)
            </label>
            <textarea
              id="np-hol"
              rows={2}
              className={`${field} h-auto py-2 font-mono`}
              placeholder="2026-12-25, 2027-01-26"
              value={holText}
              onChange={(e) => setHolText(e.target.value)}
            />
            <span className={hint}>
              YYYY-MM-DD, any separator. Skipped when counting working days.
            </span>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="min-w-0">
            <label htmlFor="np-leave" className={label}>
              Leave to set off (days)
            </label>
            <NumField
              id="np-leave"
              value={i.leave || undefined}
              placeholder="0"
              min={0}
              max={365}
              onChange={(n) => set('leave', n ?? 0)}
            />
            <span className={hint}>
              Only if your policy allows it. Counted in the same days as your notice.
            </span>
          </div>
          <div className="min-w-0">
            <label htmlFor="np-join" className={label}>
              New joining date (optional)
            </label>
            <input
              id="np-join"
              type="date"
              className={field}
              value={i.join ?? ''}
              onChange={(e) => set('join', e.target.value || undefined)}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-[1fr_8rem]">
          <div className="min-w-0">
            <label htmlFor="np-pay" className={label}>
              Monthly pay for buyout (optional)
            </label>
            <NumField
              id="np-pay"
              value={i.pay}
              placeholder="e.g. 120000"
              min={0}
              max={100000000}
              onChange={(n) => set('pay', n)}
            />
            <span className={hint}>Use the basis your letter names: gross or basic.</span>
          </div>
          <div className="min-w-0">
            <label htmlFor="np-cur" className={label}>
              Currency
            </label>
            <select
              id="np-cur"
              className={field}
              value={cur}
              onChange={(e) => set('currency', e.target.value as Currency)}
            >
              <option value="INR">₹ INR</option>
              <option value="USD">$ USD</option>
              <option value="GBP">£ GBP</option>
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="min-w-0">
            <label htmlFor="np-joined" className={label}>
              You joined this employer on (optional)
            </label>
            <input
              id="np-joined"
              type="date"
              className={field}
              value={i.joined ?? ''}
              onChange={(e) => set('joined', e.target.value || undefined)}
            />
            <span className={hint}>For the gratuity line (India).</span>
          </div>
          <label className="flex min-w-0 items-start gap-3 self-center pt-2 text-small text-fg-2">
            <input
              type="checkbox"
              checked={!!i.fixedTerm}
              onChange={(e) => set('fixedTerm', e.target.checked)}
              className="mt-0.5 h-5 w-5 shrink-0 accent-signal"
            />
            Fixed-term contract
          </label>
        </div>
        <p className="text-caption text-fg-3">Saved on this device only. Nothing is uploaded.</p>
      </form>

      {/* ---------- result ---------- */}
      <div className="min-w-0 space-y-4 lg:col-span-7">
        <p className="sr-only" aria-live="polite">
          {loaded && r
            ? `Last working day ${fmtDate(r.lwdWithLeave)}.${r.shortCalendar ? ` ${r.shortCalendar} days short of your joining date.` : ''}`
            : ''}
        </p>
        {err || !r || !tl ? (
          <div className="rounded-2xl border border-border bg-surface p-6 text-body text-fg-2">
            {err ?? 'Enter your dates.'}
          </div>
        ) : (
          <>
            <div className="rounded-2xl border border-border bg-surface p-5 shadow-e1 md:p-6">
              <div className={`${kicker} text-signal-strong`}>Your last working day</div>
              <div className="mt-2 font-serif text-h1 font-medium text-fg">
                {fmtDate(r.lwdWithLeave)}
              </div>
              <p className="mt-2 text-small text-fg-2">
                {r.lwdWithLeave !== r.lwd ? (
                  <>
                    Full notice ends {fmtDate(r.lwd)}; {i.leave} leave day{i.leave === 1 ? '' : 's'}{' '}
                    set off bring{i.leave === 1 ? 's' : ''} it to {fmtDate(r.lwdWithLeave)}.{' '}
                  </>
                ) : null}
                Notice runs {fmtDate(r.startDay, false)} to {fmtDate(r.lwd)}: {r.calendarDays}{' '}
                calendar days, {r.weekdays} of them Mon–Fri working days, counted in{' '}
                {COUNT_LABEL[r.countUsed]}.
              </p>
              {r.endsOnOff && r.prevWorkday && (
                <p className="mt-2 rounded-lg bg-warn-soft px-3 py-2 text-small text-fg">
                  That day is not a working day. Many employers relieve you on the working day
                  before, {fmtDate(r.prevWorkday)}; ask HR which date goes on your relieving letter.
                </p>
              )}

              {/* timeline */}
              <div className="mt-5">
                <div
                  className="relative flex h-4 w-full overflow-hidden rounded-full bg-muted"
                  role="img"
                  aria-label={`Timeline: notice served ${r.servedUntil ? `until ${fmtDate(r.servedUntil)}` : `until ${fmtDate(r.lwdWithLeave)}`}${r.shortCalendar ? `, ${r.shortCalendar} days to buy out` : ''}${r.lwdWithLeave !== r.lwd ? `, leave set off to ${fmtDate(r.lwd)}` : ''}`}
                >
                  <span
                    className="h-full bg-signal transition-[width] duration-slow motion-reduce:transition-none"
                    style={{ width: `${tl.served}%` }}
                  />
                  {tl.buyout > 0 && (
                    <span
                      className="h-full bg-warn transition-[width] duration-slow motion-reduce:transition-none"
                      style={{ width: `${tl.buyout}%` }}
                    />
                  )}
                  {tl.leave > 0 && (
                    <span
                      className="h-full bg-signal-tint ring-1 ring-inset ring-signal/50 transition-[width] duration-slow motion-reduce:transition-none"
                      style={{ width: `${tl.leave}%` }}
                    />
                  )}
                  {tl.joinAt !== undefined && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-0 w-0.5 bg-fg"
                      style={{ left: `${tl.joinAt}%` }}
                    />
                  )}
                </div>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-caption text-fg-2">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-signal" aria-hidden="true" /> You
                    serve
                  </span>
                  {tl.buyout > 0 && (
                    <span className="inline-flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-warn" aria-hidden="true" /> Buy
                      out or ask to waive
                    </span>
                  )}
                  {tl.leave > 0 && (
                    <span className="inline-flex items-center gap-1.5">
                      <span
                        className="h-2.5 w-2.5 rounded-full bg-signal-tint ring-1 ring-inset ring-signal/30"
                        aria-hidden="true"
                      />{' '}
                      Leave set off
                    </span>
                  )}
                  {tl.joinAt !== undefined && (
                    <span className="inline-flex items-center gap-1.5">
                      <span className="h-3 w-0.5 bg-fg" aria-hidden="true" /> New joining date
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="min-w-0 rounded-xl border border-border bg-surface p-5">
                <div className={`${kicker} text-fg-3`}>Joining</div>
                {i.join && r.shortCalendar > 0 ? (
                  <>
                    <div className="mt-2 break-words text-h3 font-semibold text-fg">
                      {r.shortCalendar} days short
                    </div>
                    <p className="mt-1 text-small text-fg-2">
                      To join on {fmtDate(i.join)} your last day must be{' '}
                      {fmtDate(r.servedUntil ?? r.lwdWithLeave)}. That leaves {r.shortCalendar}{' '}
                      calendar days ({r.shortWorking6} Mon–Sat working days) of notice unserved.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="mt-2 break-words text-h3 font-semibold text-fg">
                      {fmtDate(r.earliestJoin)}
                    </div>
                    <p className="mt-1 text-small text-fg-2">
                      {i.join
                        ? `Your joining date ${fmtDate(i.join)} is after your last day: no buyout needed.`
                        : 'Earliest joining date without an early release.'}
                    </p>
                  </>
                )}
              </div>

              <div className="min-w-0 rounded-xl border border-border bg-surface p-5">
                <div className={`${kicker} text-fg-3`}>Notice buyout</div>
                {r.shortCalendar > 0 && i.pay ? (
                  <>
                    <div className="mt-2 break-words text-h3 font-semibold text-fg">
                      {fmtMoney(Math.min(r.buyout26 ?? Infinity, r.buyout30 ?? Infinity), cur)}–
                      {fmtMoney(Math.max(r.buyout26 ?? 0, r.buyout30 ?? 0), cur)}
                    </div>
                    <p className="mt-1 text-small text-fg-2">
                      {fmtMoney(i.pay, cur)} ÷ 30 × {r.shortCalendar} calendar days ={' '}
                      {fmtMoney(r.buyout30 ?? 0, cur)}; ÷ 26 × {r.shortWorking6} Mon–Sat days ={' '}
                      {fmtMoney(r.buyout26 ?? 0, cur)}. Your letter decides which.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="mt-2 break-words text-h3 font-semibold text-fg">
                      {r.shortCalendar > 0 ? 'Add your pay' : 'None'}
                    </div>
                    <p className="mt-1 text-small text-fg-2">
                      {r.shortCalendar > 0
                        ? 'Enter monthly pay to see the cost of the unserved days.'
                        : 'You serve the full notice (after any leave set-off).'}
                    </p>
                  </>
                )}
              </div>

              <div className="min-w-0 rounded-xl border border-border bg-surface p-5">
                <div className={`${kicker} text-fg-3`}>Final wages, read from your last day</div>
                <div className="mt-2 break-words text-h3 font-semibold text-fg">
                  {fmtDate(r.wagesDueEarly ?? r.wagesDue)}
                </div>
                <p className="mt-1 text-small text-fg-2">
                  The Code on Wages s.17(2) says “within two working days of … his resignation”;
                  counted here from your {r.wagesDueEarly ? 'early-release ' : ''}last day (
                  {r.countUsed === 'mon-sat' ? 'Mon–Sat' : 'Mon–Fri'}). Many employers&apos;
                  policies say 45–60 days for the full and final; ask HR for the date in writing.
                </p>
              </div>

              <div className="min-w-0 rounded-xl border border-border bg-surface p-5">
                <div className={`${kicker} text-fg-3`}>Gratuity line (India)</div>
                {r.service && r.gratuityLine ? (
                  <>
                    <div className="mt-2 break-words text-h3 font-semibold text-fg">
                      {r.service.years} y {r.service.months} m {r.service.days} d
                    </div>
                    <p className="mt-1 text-small text-fg-2">
                      {r.gratuityMet
                        ? `Service at your last day passes the ${i.fixedTerm ? '1-year (fixed-term)' : '5-year'} line (${fmtDate(r.gratuityLine)}).`
                        : `You complete ${i.fixedTerm ? '1 year (fixed-term)' : '5 years'} on ${fmtDate(r.gratuityLine)}: ${plural(diffDays(r.lwdWithLeave, r.gratuityLine), 'day')} after your last day${r.gratuityGapEarly ? ` (${plural(r.gratuityGapEarly, 'day')} if released early)` : ''}. Some courts count 4 years and 240 days as 5; ask HR in writing before you rely on either.`}
                    </p>
                  </>
                ) : (
                  <p className="mt-2 text-small text-fg-2">
                    Add the date you joined to see where you stand.
                  </p>
                )}
              </div>
            </div>

            <details className="group rounded-xl border border-border bg-surface open:shadow-e1">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
                <span className="text-body font-semibold text-fg">
                  Emails: ask for early release, tell the new employer
                </span>
                <span
                  aria-hidden="true"
                  className="text-fg-3 transition-transform duration-base group-open:rotate-180"
                >
                  ▾
                </span>
              </summary>
              <div className="space-y-4 border-t border-border px-5 pb-5 pt-4">
                {[
                  ['To your manager', releaseEmail(inputs, r)],
                  ['To the new employer', joiningEmail(inputs, r)],
                ].map(([t, body]) => (
                  <div key={t} className="min-w-0">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-small font-semibold text-fg">{t}</h3>
                      <Copy text={body}>Copy</Copy>
                    </div>
                    <pre className="mt-2 max-h-72 overflow-auto whitespace-pre-wrap break-words rounded-lg bg-muted p-4 font-sans text-small text-fg-2">
                      {body}
                    </pre>
                  </div>
                ))}
                <p className="text-caption text-fg-3">
                  Fill the &lt;brackets&gt;. Built from your dates; no AI.
                </p>
              </div>
            </details>
          </>
        )}
      </div>
    </div>
  )
}
