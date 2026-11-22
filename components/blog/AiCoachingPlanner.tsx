'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import {
  VENDORS,
  JOBS,
  REGIONS,
  GONG_START,
  CHECKED,
  managerTime,
  type JobId,
  type RegionId,
  type TimeInput,
} from '@/data/aiSalesCoaching'

const STORE = 'aia-ai-coaching-planner-v1'

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
        className="mt-1 h-11 w-full rounded-lg border border-border-input bg-surface px-3 text-body tabular-nums text-fg focus:border-signal focus:ring-2 focus:ring-signal/40"
      />
      <span className="mt-1 block text-caption text-fg-3">{hint}</span>
    </label>
  )
}

const DEFAULTS: TimeInput = {
  reps: 8,
  callsPerRep: 25,
  callMinutes: 30,
  reviewedPerRep: GONG_START.reviewedPerRep,
  feedbackMinutes: 10,
}

const LIMITS: Record<keyof TimeInput, [number, number]> = {
  reps: [1, 500],
  callsPerRep: [1, 500],
  callMinutes: [1, 120],
  reviewedPerRep: [0, 50],
  feedbackMinutes: [0, 60],
}

function Pill({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className="min-h-10 rounded-xl px-4 py-2 text-left text-small font-medium text-fg ring-1 ring-inset ring-border transition-colors duration-fast hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal aria-pressed:bg-signal-tint aria-pressed:ring-signal/40"
    >
      {children}
    </button>
  )
}

/**
 * Coaching planner: manager hours for the review routine you choose, which kind of AI coaching
 * tool fits the problem, the tools that state that job, and the recording rules where you sell.
 * Plain arithmetic in the browser; no AI, nothing sent anywhere. Inputs are saved on this device.
 */
export default function AiCoachingPlanner() {
  const [input, setInput] = useState<TimeInput>(DEFAULTS)
  const [job, setJob] = useState<JobId>('review')
  const [region, setRegion] = useState<RegionId>('us')
  const [contactCentre, setContactCentre] = useState(false)
  const loaded = useRef(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE)
      if (!raw) return
      const v = JSON.parse(raw)
      const next = { ...DEFAULTS }
      ;(Object.keys(LIMITS) as (keyof TimeInput)[]).forEach((k) => {
        const n = v?.[k]
        const [lo, hi] = LIMITS[k]
        if (typeof n === 'number' && Number.isFinite(n) && n >= lo && n <= hi) next[k] = n
      })
      setInput(next)
      if (JOBS.some((j) => j.id === v?.job)) setJob(v.job)
      if (REGIONS.some((r) => r.id === v?.region)) setRegion(v.region)
      if (v?.contactCentre === true) setContactCentre(true)
    } catch {
      /* storage blocked: defaults */
    } finally {
      loaded.current = true
    }
  }, [])

  useEffect(() => {
    if (!loaded.current) return
    try {
      localStorage.setItem(STORE, JSON.stringify({ ...input, job, region, contactCentre }))
    } catch {
      /* ignore */
    }
  }, [input, job, region, contactCentre])

  const r = useMemo(() => managerTime(input), [input])
  const matches = VENDORS.filter(
    (v) => v[job] === 'yes' && (contactCentre ? true : v.segment === 'sales')
  ).sort((a, b) => a.name.localeCompare(b.name))
  const chosen = JOBS.find((j) => j.id === job)!
  const rules = REGIONS.find((x) => x.id === region)!
  const set = (k: keyof TimeInput) => (n: number) =>
    setInput((s) => ({
      ...s,
      [k]: k === 'callMinutes' || k === 'feedbackMinutes' ? n : Math.round(n),
    }))

  return (
    <section
      id="coaching-planner"
      aria-labelledby="coach-plan-title"
      className="not-prose my-8 rounded-2xl border border-border bg-surface p-5 md:p-7"
    >
      <p className="font-mono text-kicker uppercase tracking-[0.08em] text-signal-strong">
        Free planner · no AI, no sign-up
      </p>
      <h3 id="coach-plan-title" className="mt-1 text-h3 font-semibold text-fg">
        Plan your coaching week and find the right kind of tool
      </h3>

      <fieldset className="mt-5 min-w-0">
        <legend className="text-small font-semibold text-fg">1. Your team and calls</legend>
        <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <NumField
            label="Reps you coach"
            value={input.reps}
            onChange={set('reps')}
            min={1}
            max={500}
            step={1}
            hint="Direct reports"
          />
          <NumField
            label="Calls per rep a week"
            value={input.callsPerRep}
            onChange={set('callsPerRep')}
            min={1}
            max={500}
            step={1}
            hint="Recorded calls or meetings"
          />
          <NumField
            label="Average call length (min)"
            value={input.callMinutes}
            onChange={set('callMinutes')}
            min={1}
            max={120}
            step={5}
            hint="Talk time"
          />
          <NumField
            label="Calls you review per rep a week"
            value={input.reviewedPerRep}
            onChange={set('reviewedPerRep')}
            min={0}
            max={50}
            step={1}
            hint="Gong suggests starting at 1"
          />
          <NumField
            label="Feedback minutes per reviewed call"
            value={input.feedbackMinutes}
            onChange={set('feedbackMinutes')}
            min={0}
            max={60}
            step={5}
            hint="Notes plus the 1:1 talk"
          />
        </div>
      </fieldset>

      <div className="mt-5 grid gap-3 sm:grid-cols-3" aria-live="polite">
        <div className="rounded-xl border border-border p-4">
          <p className="text-caption text-fg-3">Manager time a week</p>
          <p className="mt-1 text-h3 font-semibold tabular-nums text-fg">{r.hoursPerWeek} h</p>
        </div>
        <div className="rounded-xl border border-border p-4">
          <p className="text-caption text-fg-3">Calls a human looks at</p>
          <p className="mt-1 text-h3 font-semibold tabular-nums text-fg">
            {r.callsReviewed.toLocaleString('en-US')} of {r.callsTotal.toLocaleString('en-US')}
          </p>
        </div>
        <div className="rounded-xl border border-border p-4">
          <p className="text-caption text-fg-3">Share of calls coached</p>
          <p className="mt-1 text-h3 font-semibold tabular-nums text-signal-strong">
            {r.coveragePct}%
          </p>
        </div>
      </div>
      <p className="mt-2 text-caption text-fg-3">
        {r.hoursPerWeek > 8
          ? 'That is more than a working day a week. Let a tool score every call and listen only to the ones it flags.'
          : r.coveragePct < 10
            ? 'The time is manageable, but you see under a tenth of calls. Automatic scoring shows you which calls to pick.'
            : 'A manageable routine. Keep it, and use a tool mainly to pick the right calls and track one skill.'}
      </p>

      <fieldset className="mt-6 min-w-0">
        <legend className="text-small font-semibold text-fg">2. What is the real problem?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {JOBS.map((j) => (
            <Pill key={j.id} pressed={job === j.id} onClick={() => setJob(j.id)}>
              {j.when}
            </Pill>
          ))}
        </div>
        <label className="mt-3 flex items-center gap-2 text-small text-fg-2">
          <input
            type="checkbox"
            checked={contactCentre}
            onChange={(e) => setContactCentre(e.target.checked)}
            className="h-4 w-4 rounded text-signal focus:ring-signal"
          />
          Include contact-centre tools (inside sales or support desks with many agents)
        </label>
      </fieldset>

      <div className="mt-4 rounded-xl border border-border p-4">
        <p className="text-small font-semibold text-fg">You need: {chosen.short.toLowerCase()}</p>
        <p className="mt-1 text-small text-fg-2">{chosen.long}.</p>
        {matches.length > 0 ? (
          <p className="mt-2 text-small text-fg-2">
            Tools whose own pages state this ({matches.length}):{' '}
            {matches.map((v, i) => (
              <span key={v.id}>
                <a href={v.featureUrl} className="text-signal-strong underline underline-offset-2">
                  {v.name}
                </a>
                {i < matches.length - 1 ? ', ' : ''}
              </span>
            ))}
            .
          </p>
        ) : (
          <p className="mt-2 text-small text-fg-2">
            None of the sales tools we checked state this on their pages. Tick contact-centre tools,
            or see the AI roleplay tools linked below.
          </p>
        )}
        {job === 'practice' && (
          <p className="mt-2 text-small text-fg-2">
            Dedicated practice tools are compared in our{' '}
            <a
              href="/blog/best-sales-roleplay-software-platforms-2026"
              className="text-signal-strong underline underline-offset-2"
            >
              AI sales roleplay software guide
            </a>{' '}
            (15 vendors with prices).
          </p>
        )}
      </div>

      <fieldset className="mt-6 min-w-0">
        <legend className="text-small font-semibold text-fg">
          3. Where are your reps and buyers?
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {REGIONS.map((x) => (
            <Pill key={x.id} pressed={region === x.id} onClick={() => setRegion(x.id)}>
              {x.name}
            </Pill>
          ))}
        </div>
      </fieldset>
      <ul className="mt-3 grid gap-2">
        {rules.rules.map((x) => (
          <li key={x.src} className="rounded-xl border border-border p-4 text-small text-fg-2">
            {x.plain}{' '}
            <a href={x.src} className="text-signal-strong underline underline-offset-2">
              {x.srcLabel}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-caption text-fg-3">
        Vendor facts read {CHECKED}. Arithmetic: reps × reviewed calls × (call length + feedback
        minutes). A guide, not legal advice. Your inputs stay on this device.
      </p>
    </section>
  )
}
