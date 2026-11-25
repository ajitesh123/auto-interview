'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { PRESETS, compute, money, pct, type Currency, type Inputs } from '@/data/salesTrainingRoi'

const STORE = 'aia-sales-training-roi-v1'

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
}: {
  label: string
  value: number
  onChange: (n: number) => void
  min: number
  max: number
  step?: number
  hint?: string
  decimals?: boolean
}) {
  const [text, setText] = useState(String(value))
  const [focus, setFocus] = useState(false)
  useEffect(() => {
    if (!focus) setText(String(value))
  }, [value, focus])
  const norm = (n: number) => {
    const c = Math.max(min, Math.min(max, n))
    return decimals ? Math.round(c * 10) / 10 : Math.round(c)
  }
  return (
    <label className="block min-w-0">
      <span className="text-small font-medium text-fg">{label}</span>
      <input
        type="number"
        inputMode={decimals ? 'decimal' : 'numeric'}
        min={min}
        max={max}
        step={step}
        value={text}
        onFocus={() => setFocus(true)}
        onChange={(e) => {
          setText(e.target.value)
          const n = parseFloat(e.target.value)
          if (Number.isFinite(n)) onChange(norm(n))
        }}
        onBlur={() => {
          setFocus(false)
          const n = parseFloat(text)
          const v = Number.isFinite(n) ? norm(n) : value
          setText(String(v))
          onChange(v)
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
 * Sales training ROI calculator: Phillips method (margin, isolated lift, first year, fully
 * loaded cost). No AI; nothing leaves the browser; inputs kept on this device.
 */
export default function SalesTrainingRoiCalculator() {
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
          if (typeof base[k] === 'boolean' && typeof s[k] === 'boolean')
            (next as Record<string, unknown>)[k] = s[k]
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
  const noCost = r.cost <= 0
  const negative = r.netLift < 0

  return (
    <div
      id="calculator"
      className="not-prose my-8 scroll-mt-24 rounded-2xl border border-border bg-surface p-5 md:p-7"
    >
      <div className="font-mono text-kicker uppercase tracking-[0.08em] text-signal-strong">
        Free tool · no AI · nothing uploaded
      </div>
      <h3 className="mt-2 text-h3 font-semibold text-fg">Sales training ROI calculator</h3>
      <p className="mt-1 max-w-2xl text-small text-fg-2">
        Phillips method: gross margin, not revenue; the control group’s change subtracted; first
        year only; every cost loaded in. Start from an example team, then type your own numbers.
        Your inputs stay on this device.
      </p>

      <fieldset className="mt-5 min-w-0">
        <legend className="text-small font-medium text-fg">Start from an example team</legend>
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
          Example inputs, not benchmarks. Switching resets the numbers to that example.
        </p>
      </fieldset>

      <a
        href="#roi-result"
        className="mt-5 flex items-center justify-between gap-3 rounded-lg border border-border bg-muted px-4 py-3 text-small lg:hidden"
      >
        <span className="text-fg-2">First-year ROI</span>
        <span className="font-semibold tabular-nums text-fg">
          {noCost ? '—' : `${pct(r.roi)} · BCR ${r.bcr.toFixed(2)}`} ↓
        </span>
      </a>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div className="min-w-0 space-y-5">
          <Group title="1. Your team">
            <NumField
              label="Reps trained"
              value={x.reps}
              onChange={set('reps')}
              min={0}
              max={100000}
            />
            <NumField
              label={`Bookings per ramped rep a year (${c})`}
              value={x.bookings}
              onChange={set('bookings')}
              min={0}
              max={BIG}
              step={1000}
              hint={x.bookings > 0 ? m(x.bookings) : 'Revenue each fully ramped rep closes'}
            />
            <NumField
              label="Gross margin (%)"
              value={x.margin}
              onChange={set('margin')}
              min={0}
              max={100}
              hint="Profit on each sale before overheads"
            />
          </Group>

          <Group title="2. The measured change">
            <div className="sm:col-span-2">
              <span className="text-small font-medium text-fg">
                Did you keep an untrained comparison group?
              </span>
              <div className="mt-2 flex flex-wrap gap-2">
                {[
                  { v: true, l: 'Yes, a control group' },
                  { v: false, l: 'No, before and after only' },
                ].map((o) => (
                  <button
                    key={String(o.v)}
                    type="button"
                    aria-pressed={x.hasControl === o.v}
                    onClick={() => set('hasControl')(o.v)}
                    className={`${pill} ${x.hasControl === o.v ? on : off}`}
                  >
                    {o.l}
                  </button>
                ))}
              </div>
            </div>
            <NumField
              label="Change in bookings per rep, trained (%)"
              value={x.trainedLift}
              onChange={set('trainedLift')}
              min={-100}
              max={500}
              decimals
              step={0.5}
              hint="Same months, this year vs last"
            />
            {x.hasControl ? (
              <NumField
                label="Change, control group (%)"
                value={x.controlLift}
                onChange={set('controlLift')}
                min={-100}
                max={500}
                decimals
                step={0.5}
                hint="What the market gave everyone"
              />
            ) : (
              <NumField
                label="Share of that change due to training (%)"
                value={x.attribution}
                onChange={set('attribution')}
                min={0}
                max={100}
                hint="Ask managers; take the lowest defensible figure"
              />
            )}
          </Group>

          <Group title="3. New hires">
            <NumField
              label="New reps through the programme"
              value={x.hires}
              onChange={set('hires')}
              min={0}
              max={100000}
              hint="Their training hours are costed too"
            />
            <div className="hidden sm:block" aria-hidden="true" />
            <NumField
              label="Ramp before (months)"
              value={x.rampBefore}
              onChange={set('rampBefore')}
              min={0}
              max={12}
              decimals
              step={0.5}
              hint="Months to full productivity"
            />
            <NumField
              label="Ramp after (months)"
              value={x.rampAfter}
              onChange={set('rampAfter')}
              min={0}
              max={12}
              decimals
              step={0.5}
              hint="Compare with untrained hires from the same months"
            />
          </Group>

          <Group title={`4. Fully loaded cost (${c})`}>
            <NumField
              label="Programme fee"
              value={x.programFee}
              onChange={set('programFee')}
              min={0}
              max={BIG}
              step={1000}
              hint={m(x.programFee)}
            />
            <NumField
              label="Other costs"
              value={x.otherCost}
              onChange={set('otherCost')}
              min={0}
              max={BIG}
              step={500}
              hint="Design, admin, travel, evaluation"
            />
            <NumField
              label="Training hours per rep"
              value={x.repHours}
              onChange={set('repHours')}
              min={0}
              max={2000}
              hint="Time away from selling"
            />
            <NumField
              label="Loaded cost of a rep hour"
              value={x.repHourCost}
              onChange={set('repHourCost')}
              min={0}
              max={1000000}
              hint="Pay + benefits ÷ hours worked"
            />
            <NumField
              label="Manager hours, total"
              value={x.managerHours}
              onChange={set('managerHours')}
              min={0}
              max={1000000}
              hint="Sessions, coaching, scoring"
            />
            <NumField
              label="Loaded cost of a manager hour"
              value={x.managerHourCost}
              onChange={set('managerHourCost')}
              min={0}
              max={1000000}
            />
          </Group>
        </div>

        <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">
          <div
            id="roi-result"
            className="scroll-mt-24 rounded-xl border border-border bg-muted p-5"
            aria-live="polite"
          >
            <div className="text-small text-fg-2">First-year ROI</div>
            <div className="mt-1 font-serif text-h1 tabular-nums text-fg">
              {noCost ? '—' : pct(r.roi)}
            </div>
            <p className="mt-2 text-small text-fg-2">
              {noCost
                ? 'Enter at least one cost to get an ROI.'
                : `Benefit ${m(r.benefit)} − cost ${m(r.cost)} = net ${m(r.net)}. BCR ${r.bcr.toFixed(2)}${r.paybackMonths != null && r.paybackMonths <= 12 ? `; pays back in ${r.paybackMonths.toFixed(1)} months` : '; does not pay back within the first year'}.`}
            </p>
            <dl className="mt-4 space-y-2 border-t border-border pt-4 text-small">
              <div className="flex justify-between gap-3">
                <dt className="text-fg-2">Lift credited to training</dt>
                <dd className="tabular-nums text-fg">{pct(r.netLift, 1)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-fg-2">Extra bookings, lift</dt>
                <dd className="tabular-nums text-fg">{m(r.liftBookings)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-fg-2">Extra bookings, faster ramp</dt>
                <dd className="tabular-nums text-fg">{m(r.rampBookings)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-fg-2">Benefit at {x.margin}% margin</dt>
                <dd className="font-medium tabular-nums text-fg">{m(r.benefit)}</dd>
              </div>
              {r.costs.map((k) => (
                <div key={k.label} className="flex justify-between gap-3">
                  <dt className="text-fg-3">{k.label}</dt>
                  <dd className="tabular-nums text-fg-2">{m(k.value)}</dd>
                </div>
              ))}
              <div className="flex justify-between gap-3">
                <dt className="text-fg-2">Fully loaded cost</dt>
                <dd className="font-medium tabular-nums text-fg">{m(r.cost)}</dd>
              </div>
            </dl>
            {!noCost && (
              <ul className="mt-4 space-y-2 border-t border-border pt-4 text-small text-fg-2">
                {r.breakEvenLift != null && (
                  <li>
                    Break-even: an isolated lift of{' '}
                    <strong className="text-fg">{pct(r.breakEvenLift, 1)}</strong> on the trained
                    reps pays for it, before any ramp gain.
                  </li>
                )}
                {negative && (
                  <li>
                    {x.hasControl
                      ? 'The trained group did worse than the control group, so the lift counts against the programme.'
                      : 'Bookings per rep fell, so the lift counts against the programme.'}
                  </li>
                )}
                <li>
                  If you reported revenue instead of margin, you would claim{' '}
                  <strong className="text-fg">{pct(r.roiRevenueBasis)}</strong>.
                </li>
                <li>
                  If you credited the whole {pct(x.trainedLift, 1)} change to training, you would
                  claim <strong className="text-fg">{pct(r.roiFullCredit)}</strong>.
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
