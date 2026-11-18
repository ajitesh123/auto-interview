'use client'

import { useState } from 'react'
import { EXAMPLE, FIELDS, RATE_PRESETS, costPerMeeting, type Key } from '@/data/costPerMeeting'

const money = (n: number | null) =>
  n === null
    ? '—'
    : `$${n.toLocaleString('en-US', { maximumFractionDigits: n < 10 ? 2 : 0, minimumFractionDigits: n < 10 ? 2 : 0 })}`
const num = (n: number) => n.toLocaleString('en-US', { maximumFractionDigits: 0 })

export default function CostPerMeeting() {
  const [vals, setVals] = useState<Record<Key, number>>(EXAMPLE)
  const [text, setText] = useState<Partial<Record<Key, string>>>({})
  const r = costPerMeeting(vals)
  const max = Math.max(r.aiCost, r.humanCost, 1)

  const commit = (f: (typeof FIELDS)[number], raw: string) => {
    const n = Number(raw)
    const clamped =
      raw.trim() === '' || !Number.isFinite(n) ? vals[f.key] : Math.min(f.max, Math.max(f.min, n))
    setVals((p) => ({ ...p, [f.key]: clamped }))
    setText((p) => ({ ...p, [f.key]: undefined }))
  }

  return (
    <div className="rounded-xl border border-border bg-surface p-5 md:p-6">
      <div className="flex flex-wrap gap-2" role="group" aria-label="AI cost per minute presets">
        {RATE_PRESETS.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => {
              setVals((v) => ({ ...v, rate: p.rate }))
              setText((t) => ({ ...t, rate: undefined }))
            }}
            aria-pressed={vals.rate === p.rate}
            className={`min-h-9 rounded-full px-3 py-1.5 text-caption font-medium ring-1 ring-inset transition-colors duration-fast ${
              vals.rate === p.rate
                ? 'bg-signal-tint text-signal-strong ring-signal/30'
                : 'bg-surface text-fg-2 ring-border-strong hover:bg-muted'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FIELDS.map((f) => (
          <label key={f.key} className="flex min-w-0 flex-col gap-1.5">
            <span className="text-small font-medium text-fg">{f.label}</span>
            <input
              type="number"
              inputMode="decimal"
              min={f.min}
              max={f.max}
              step={f.step}
              value={text[f.key] ?? String(vals[f.key])}
              onChange={(e) => {
                const raw = e.target.value
                setText((p) => ({ ...p, [f.key]: raw }))
                const n = Number(raw)
                if (raw.trim() !== '' && Number.isFinite(n))
                  setVals((p) => ({ ...p, [f.key]: Math.min(f.max, Math.max(f.min, n)) }))
              }}
              onBlur={(e) => commit(f, e.target.value)}
              className="h-11 w-full rounded-lg border border-border-input bg-surface px-3 text-body tabular-nums text-fg focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/20"
            />
            {f.hint && <span className="text-caption text-fg-3">{f.hint}</span>}
          </label>
        ))}
      </div>

      <div className="mt-6 border-t border-border pt-5" aria-live="polite">
        <p className="text-body text-fg">
          <span className="font-semibold">{num(r.meetings)} meetings a month</span> from{' '}
          {num(r.connects)} connects and {num(r.minutes)} talk minutes.
        </p>
        <dl className="mt-4 space-y-4">
          {[
            {
              k: 'AI agent, per-minute cost only',
              total: r.aiCost,
              per: r.aiPerMeeting,
              note: `${num(r.minutes)} min × $${vals.rate}`,
            },
            {
              k: `Human callers (${r.callers})`,
              total: r.humanCost,
              per: r.humanPerMeeting,
              note: `${num(vals.dials)} dials ÷ (${vals.perDay} × ${vals.days} days), rounded up`,
            },
          ].map((row, i) => (
            <div key={row.k}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <dt className="text-small font-medium text-fg">{row.k}</dt>
                <dd className="text-small tabular-nums text-fg">
                  <span className="font-semibold">{money(row.total)}</span> / month ·{' '}
                  <span className="font-semibold">{money(row.per)}</span> per meeting
                </dd>
              </div>
              <div
                className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-muted"
                aria-hidden="true"
              >
                <div
                  className={`h-full rounded-full transition-[width] duration-slow ease-out ${i === 0 ? 'bg-signal' : 'bg-fg-3'}`}
                  style={{ width: `${Math.max(0.5, (row.total / max) * 100)}%` }}
                />
              </div>
              <p className="mt-1 text-caption text-fg-3">{row.note}</p>
            </div>
          ))}
        </dl>
        <p className="mt-5 rounded-lg bg-warn-soft px-4 py-3 text-small text-fg-2">
          <span className="font-semibold text-fg">Read this before you compare. </span>
          The AI line is talk minutes only (minutes on voicemail and unanswered calls are not
          counted): it leaves out set-up, engineering, prompt work, numbers, compliance checks and
          the person who reviews calls. Both lines use the same connect and meeting rates; whether
          an AI agent books as many meetings as your team is the thing to test on your own calls.
        </p>
      </div>
    </div>
  )
}
