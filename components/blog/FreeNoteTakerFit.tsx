'use client'

import { useState } from 'react'
import {
  fitAll,
  perMonth,
  round1,
  platformLabel,
  CHECKED,
  type Platform,
  type Status,
} from '@/data/freeNoteTakers'

const LENGTHS = [15, 30, 45, 60, 90, 120, 150]
const PLATFORMS: Platform[] = ['zoom', 'meet', 'teams', 'inperson']
const HEAD: Record<Status, string> = {
  yes: 'Covers your month',
  catch: 'Covers it, with a catch',
  no: 'Does not cover it',
}

/**
 * Free-plan fit check for /blog/best-free-ai-meeting-note-takers-2026-freemium-plans-ranked.
 * Plain rules over the vendors' stated limits (data/freeNoteTakers.ts). No AI, nothing sent.
 */
export default function FreeNoteTakerFit() {
  const [perWeekText, setPerWeekText] = useState('2')
  const [minutes, setMinutes] = useState(45)
  const [platform, setPlatform] = useState<Platform>('zoom')
  const [botFree, setBotFree] = useState(false)
  const [keepPast30, setKeepPast30] = useState(false)

  const parsed = perWeekText.trim() === '' ? NaN : Number(perWeekText)
  const perWeek = Number.isFinite(parsed) ? Math.min(60, Math.max(0.25, parsed)) : 2
  const res = fitAll({ perWeek, minutes, platform, botFree, keepPast30 })
  const n = perMonth(perWeek)
  const counts = {
    yes: res.filter((r) => r.v.status === 'yes').length,
    catch: res.filter((r) => r.v.status === 'catch').length,
  }

  const field = 'mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-body text-fg'

  return (
    <section
      aria-label="Which free AI note taker covers your meetings"
      className="not-prose my-8 rounded-2xl border border-border bg-surface p-4 md:p-6"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <label className="min-w-0 text-small font-medium text-fg">
          Meetings a week
          <input
            type="number"
            inputMode="decimal"
            min={0.25}
            max={60}
            step={1}
            value={perWeekText}
            onChange={(e) => setPerWeekText(e.target.value)}
            onBlur={() => setPerWeekText(String(perWeek))}
            className={field}
          />
        </label>
        <label className="min-w-0 text-small font-medium text-fg">
          Typical length
          <select
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
            className={field}
          >
            {LENGTHS.map((m) => (
              <option key={m} value={m}>
                {m} minutes
              </option>
            ))}
          </select>
        </label>
        <label className="min-w-0 text-small font-medium text-fg">
          Where
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value as Platform)}
            className={field}
          >
            {PLATFORMS.map((p) => (
              <option key={p} value={p}>
                {platformLabel(p)}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {(
          [
            ['No bot may join the call', botFree, setBotFree],
            ['I need notes older than 30 days', keepPast30, setKeepPast30],
          ] as [string, boolean, (b: boolean) => void][]
        ).map(([label, on, set]) => (
          <label
            key={label}
            className={`flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 text-small transition-colors duration-fast ${
              on
                ? 'border-signal bg-signal-tint text-fg'
                : 'border-border bg-surface text-fg-2 hover:border-border-strong'
            }`}
          >
            <input
              type="checkbox"
              className="accent-signal"
              checked={on}
              onChange={(e) => set(e.target.checked)}
            />
            {label}
          </label>
        ))}
      </div>

      <p className="mt-5 text-body text-fg" aria-live="polite">
        About <strong>{round1(n)}</strong> meetings and <strong>{Math.round(n * minutes)}</strong>{' '}
        minutes a month. <strong>{counts.yes}</strong> free plans cover it outright and{' '}
        <strong>{counts.catch}</strong> with a catch.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        {(['yes', 'catch', 'no'] as const).map((s) => {
          const items = res.filter((r) => r.v.status === s)
          return (
            <div key={s} className="min-w-0">
              <p
                className={`font-mono text-caption uppercase tracking-[0.06em] ${
                  s === 'yes' ? 'text-signal-strong' : 'text-fg-3'
                }`}
              >
                {HEAD[s]} ({items.length})
              </p>
              <ul className="mt-2 space-y-2">
                {items.map(({ t, v }) => (
                  <li
                    key={t.id}
                    className={`rounded-lg border p-3 text-small transition-colors duration-fast motion-reduce:transition-none ${
                      s === 'yes' ? 'border-signal/40 bg-signal-tint' : 'border-border bg-surface'
                    }`}
                  >
                    <a
                      href={t.url}
                      target="_blank"
                      rel="noopener"
                      className="font-semibold text-fg underline decoration-border underline-offset-2 hover:decoration-signal"
                    >
                      {t.name}
                    </a>
                    {v.reasons.length > 0 ? (
                      <ul className="mt-1 space-y-1 text-fg-2">
                        {v.reasons.map((r) => (
                          <li key={r}>{r}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-1 text-fg-2">{t.free}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
      <p className="mt-4 text-caption text-fg-3">
        Rules from each vendor&apos;s stated free limits, read on their own pages on {CHECKED}. Not
        a ranking of note quality. Nothing you type leaves this page.
      </p>
    </section>
  )
}
