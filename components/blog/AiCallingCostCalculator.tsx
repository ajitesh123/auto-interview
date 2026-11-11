'use client'

import { useMemo, useState } from 'react'
import {
  AGENTS_WITH_PRICE,
  CHECKED,
  FUNNELS,
  GONG_URL,
  funnelCost,
  usd,
} from '@/data/aiCallingSalesData'

const field =
  'focus-visible:ring-accent-strong mt-1.5 h-11 w-full rounded-lg border border-border-input bg-surface px-3 text-small text-fg focus:outline-none focus-visible:ring-2'

const cents = (p: number) => usd(p, Math.abs(p * 100 - Math.round(p * 100)) < 1e-9 ? 2 : 3)

/** Published per-minute prices, one option per distinct value, labelled by every vendor that states it. */
const PRICE_OPTIONS = (() => {
  const m = new Map<number, string[]>()
  const add = (p: number, who: string) => m.set(p, [...(m.get(p) ?? []), who])
  for (const v of AGENTS_WITH_PRICE) {
    add(v.perMin!.low, v.perMin!.high === v.perMin!.low ? v.name : `${v.name} low`)
    if (v.perMin!.high !== v.perMin!.low) add(v.perMin!.high, `${v.name} high`)
  }
  add(0.11, 'Retell AI default estimate')
  return [...m.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([p, who]) => ({ p, who: who.join(', ') }))
})()

/** Number field that keeps what you type and only clamps when you leave the field. */
function Num({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  hint,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step?: number
  hint?: string
}) {
  const [text, setText] = useState(String(value))
  const [focused, setFocused] = useState(false)
  return (
    <label className="block">
      <span className="text-small font-medium text-fg">{label}</span>
      <input
        type="number"
        inputMode="decimal"
        min={min}
        max={max}
        step={step}
        value={focused ? text : String(value)}
        onFocus={() => {
          setText(String(value))
          setFocused(true)
        }}
        onChange={(e) => {
          setText(e.target.value)
          const v = Number(e.target.value)
          if (e.target.value !== '' && !Number.isNaN(v) && v >= min && v <= max) onChange(v)
        }}
        onBlur={() => {
          const v = Number(text)
          onChange(Number.isNaN(v) || text === '' ? value : Math.min(max, Math.max(min, v)))
          setFocused(false)
        }}
        className={`${field} tabular-nums`}
      />
      {hint && <span className="mt-1 block text-caption text-fg-3">{hint}</span>}
    </label>
  )
}

export default function AiCallingCostCalculator() {
  const [dials, setDials] = useState(1000)
  const [funnel, setFunnel] = useState('avg')
  const [connectPct, setConnect] = useState(5.4)
  const [meetingPct, setMeeting] = useState(4.6)
  const [talkMin, setTalk] = useState(3)
  const [missMin, setMiss] = useState(0.5)
  const [price, setPrice] = useState(0.11)
  const [phone, setPhone] = useState(0.015)
  const [sdrMonthly, setSdr] = useState(0)
  const [sdrMeetings, setSdrMeetings] = useState(0)

  const r = useMemo(
    () =>
      funnelCost({ dials, connectPct, meetingPct, talkMin, missMin, pricePerMin: price + phone }),
    [dials, connectPct, meetingPct, talkMin, missMin, price, phone]
  )
  const sdrPer = sdrMonthly > 0 && sdrMeetings > 0 ? sdrMonthly / sdrMeetings : null
  const meetingsText = r.meetings > 0 && r.meetings < 0.1 ? '<0.1' : r.meetings.toFixed(1)
  const preset = PRICE_OPTIONS.some((o) => o.p === price) ? String(price) : 'custom'

  return (
    <div className="not-prose my-8 rounded-2xl border border-border bg-surface p-5 md:p-6">
      <p className="font-mono text-kicker uppercase tracking-[0.08em] text-fg-3">
        Cost per meeting calculator · AI voice agent · prices checked {CHECKED}
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="text-small font-medium text-fg">Start from</span>
          <select
            value={funnel}
            onChange={(e) => {
              setFunnel(e.target.value)
              const f = FUNNELS.find((x) => x.id === e.target.value)
              if (f) {
                setConnect(f.connectPct)
                setMeeting(f.meetingPct)
              }
            }}
            className={field}
          >
            {FUNNELS.map((f) => (
              <option key={f.id} value={f.id}>
                {f.label}
              </option>
            ))}
            <option value="own">My own numbers</option>
          </select>
        </label>
        <Num label="Dials" value={dials} onChange={setDials} min={1} max={1000000} />
        <label className="block">
          <span className="text-small font-medium text-fg">Published price per minute</span>
          <select
            value={preset}
            onChange={(e) => {
              if (e.target.value !== 'custom') setPrice(Number(e.target.value))
            }}
            className={field}
          >
            {PRICE_OPTIONS.map((o) => (
              <option key={o.p} value={String(o.p)}>
                {cents(o.p)} · {o.who}
              </option>
            ))}
            <option value="custom">Custom (type below)</option>
          </select>
        </label>
        <Num
          label="Agent price per minute (USD)"
          value={price}
          onChange={setPrice}
          min={0}
          max={5}
          step={0.005}
          hint="Type your quoted rate here, or pick a published one above."
        />
        <Num
          label="Telephony per minute (USD)"
          value={phone}
          onChange={setPhone}
          min={0}
          max={1}
          step={0.001}
          hint="Retell lists $0.015; most others add the carrier's rate. 0 if already included."
        />
        <Num
          label="Calls answered (% of dials)"
          value={connectPct}
          onChange={(v) => {
            setConnect(v)
            setFunnel('own')
          }}
          min={0}
          max={100}
          step={0.1}
        />
        <Num
          label="Meetings booked (% of conversations)"
          value={meetingPct}
          onChange={(v) => {
            setMeeting(v)
            setFunnel('own')
          }}
          min={0}
          max={100}
          step={0.1}
        />
        <Num
          label="Minutes per conversation"
          value={talkMin}
          onChange={setTalk}
          min={0.5}
          max={60}
          step={0.5}
        />
        <Num
          label="Billed minutes per unanswered dial"
          value={missMin}
          onChange={setMiss}
          min={0}
          max={5}
          step={0.1}
          hint="Ringing and voicemail. Air.ai says its outbound rate includes dial time."
        />
      </div>

      <dl
        className="mt-6 grid grid-cols-2 gap-3 rounded-xl border border-border bg-bg p-4 sm:grid-cols-4"
        aria-live="polite"
      >
        {[
          ['Conversations', Math.round(r.conversations).toLocaleString('en-US')],
          ['Meetings', meetingsText],
          ['Agent + phone cost', usd(r.cost)],
          ['Cost per meeting', r.perMeeting === null ? '–' : usd(r.perMeeting)],
        ].map(([k, v]) => (
          <div key={k}>
            <dt className="text-caption text-fg-3">{k}</dt>
            <dd className="mt-0.5 text-h4 font-semibold tabular-nums text-fg">{v}</dd>
          </div>
        ))}
      </dl>
      {r.meetings < 5 && (
        <p className="mt-2 text-caption text-fg-3">
          Fewer than 5 meetings: the cost per meeting swings a lot with one booking more or less.
          Try more dials to see a steadier figure.
        </p>
      )}

      <details className="mt-4 rounded-xl border border-border p-4">
        <summary className="cursor-pointer text-small font-medium text-fg">
          Compare with a rep (optional)
        </summary>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <Num
            label="What one rep costs you a month (USD)"
            value={sdrMonthly}
            onChange={setSdr}
            min={0}
            max={1000000}
            hint="Salary, tax and tools: your own number."
          />
          <Num
            label="Meetings that rep books a month"
            value={sdrMeetings}
            onChange={setSdrMeetings}
            min={0}
            max={10000}
          />
        </div>
        <p className="mt-3 text-small text-fg-2" aria-live="polite">
          {sdrPer === null
            ? 'Enter both numbers to compare cost per meeting.'
            : `Rep: ${usd(sdrPer)} per meeting, all costs. Agent: ${r.perMeeting === null ? 'no meetings at these rates' : `${usd(r.perMeeting)} per meeting, call minutes only`}; add setup, software plans and the time someone spends reviewing calls before you compare.`}
        </p>
      </details>

      <p className="mt-4 text-caption text-fg-3">
        Default rates are from{' '}
        <a href={GONG_URL} target="_blank" rel="noopener" className="underline">
          Gong Labs’ study of 300M+ cold calls
        </a>{' '}
        by human reps; no independent source publishes AI-agent answer or booking rates, so replace
        them with your own pilot numbers. Runs in your browser; nothing is sent anywhere.
      </p>
    </div>
  )
}
