'use client'

// Client tools for the self-run YC batch (/paul-graham/yc-batch). No login, no AI: everything is
// saved in this browser's localStorage (wrapped in try/catch so blocked storage never breaks the
// page). All teaching content is server-rendered; these islands only hold the user's own work.
//
// Keys: aiv:ycbatch:start (YYYY-MM-DD) · aiv:ycbatch:paused (YYYY-MM-DD) · aiv:ycbatch:passed:<n>
// (timestamp) · aiv:ycbatch:metrics ({week: number}) · aiv:ycbatch:done ({assignmentId: ts}) ·
// aiv:ycbatch:oh:<id> (text) · aiv:ycbatch:update:<week> (fields) · aiv:ycbatch:company ·
// aiv:ycbatch:unit · aiv:ycbatch:pitch (fields)

import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { CopyButton } from '@/components/roleKits/KitClient'

const P = 'aiv:ycbatch:'
const EVT = 'aiv:ycbatch'
const DAY = 86400000
const kicker = 'font-mono text-kicker uppercase tracking-[0.08em]'
const field =
  'w-full rounded-xl border border-border-input bg-bg px-3 py-2.5 text-small text-fg placeholder:text-fg-3 focus:border-signal focus:outline-none'
const label = 'text-caption font-semibold text-fg'

function readRaw(key: string): string | null {
  try {
    return window.localStorage.getItem(P + key)
  } catch {
    return null
  }
}
function writeRaw(key: string, value: string | null) {
  try {
    if (value === null) window.localStorage.removeItem(P + key)
    else window.localStorage.setItem(P + key, value)
  } catch {
    /* storage blocked: nothing is remembered, the page still works */
  }
  window.dispatchEvent(new CustomEvent(EVT, { detail: key }))
}
function readJSON<T>(key: string, fallback: T): T {
  const raw = readRaw(key)
  if (!raw) return fallback
  try {
    const v = JSON.parse(raw)
    return v && typeof v === 'object' ? (v as T) : fallback
  } catch {
    return fallback
  }
}

/** Re-render when any batch key changes (this tab or another). */
function useStore<T>(read: () => T, initial: T): T {
  const [v, setV] = useState<T>(initial)
  useEffect(() => {
    const sync = () => setV(read())
    sync()
    window.addEventListener(EVT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(EVT, sync)
      window.removeEventListener('storage', sync)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return v
}

type Metrics = Record<string, number>
const readMetrics = () => readJSON<Metrics>('metrics', {})
const readDone = () => readJSON<Record<string, number>>('done', {})
const readStart = () => readRaw('start')

function setMetric(week: number, value: number | null) {
  const m = { ...readMetrics() }
  if (value === null || !Number.isFinite(value)) delete m[week]
  else m[week] = value
  writeRaw('metrics', JSON.stringify(m))
}

/* ---------- Dates ---------- */

const pad2 = (n: number) => String(n).padStart(2, '0')
const toISO = (d: Date) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`
const todayISO = () => toISO(new Date())
const nextMondayISO = () => {
  const d = new Date()
  const add = (8 - d.getDay()) % 7 || 7 // days until next Monday (never today)
  return toISO(new Date(d.getFullYear(), d.getMonth(), d.getDate() + add))
}
const parseISO = (s: string) => {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, (m || 1) - 1, d || 1)
}
const fmt = (d: Date) =>
  d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
const weekStart = (start: string, n: number) =>
  new Date(parseISO(start).getTime() + (n - 1) * 7 * DAY)
const weekEnd = (start: string, n: number) => new Date(weekStart(start, n).getTime() + 6 * DAY)
/** Week number on a given day (default today). 0 = not started yet. */
function currentWeek(start: string, asOf?: string | null): number {
  const ref = asOf ? parseISO(asOf) : new Date()
  const day = new Date(ref.getFullYear(), ref.getMonth(), ref.getDate()).getTime()
  const diff = Math.round((day - parseISO(start).getTime()) / DAY)
  if (diff < 0) return 0
  return Math.floor(diff / 7) + 1
}

const pct = (a: number, b: number) => ((a - b) / b) * 100
const fmtPct = (p: number) => `${p >= 0 ? '+' : ''}${p.toFixed(1)}%`

/* ---------- Challenge state ---------- */

const readPaused = () => readRaw('paused')
const readPassed = (total = 12): Record<number, boolean> => {
  const out: Record<number, boolean> = {}
  for (let n = 1; n <= total; n++) out[n] = !!readRaw(`passed:${n}`)
  return out
}

/* ---------- "Do you want to start the challenge?" (hub) ---------- */

type WeekLite = { week: number; slug: string; title: string; challenge: string }

const btnPrimary =
  'inline-flex h-11 items-center justify-center gap-2 rounded-full bg-signal px-5 text-small font-semibold text-white shadow-e1 transition-colors duration-fast hover:bg-signal-strong disabled:opacity-50'
const btnSecondary =
  'inline-flex h-11 items-center justify-center rounded-full bg-surface px-5 text-small font-semibold text-fg ring-1 ring-inset ring-border-strong transition-colors duration-fast hover:bg-muted'
const btnQuiet =
  'inline-flex min-h-11 items-center rounded-full px-3 text-caption font-medium text-fg-2 underline-offset-4 hover:text-fg hover:underline'

export function ChallengePanel({
  weeks,
  basePath,
  total = 12,
}: {
  weeks: WeekLite[]
  basePath: string
  total?: number
}) {
  const start = useStore(readStart, null)
  const paused = useStore(readPaused, null)
  const passed = useStore(() => readPassed(total), {} as Record<number, boolean>)
  const [step, setStep] = useState<'ask' | 'form'>('ask')
  const [draft, setDraft] = useState('')
  const [company, setCompany] = useState('')
  const [unit, setUnit] = useState('')
  const [confirmRestart, setConfirmRestart] = useState(false)
  useEffect(() => {
    setDraft(nextMondayISO())
    setCompany(readRaw('company') ?? '')
    setUnit(readRaw('unit') ?? '')
  }, [])

  const passedCount = Object.values(passed).filter(Boolean).length
  const n = start ? currentWeek(start, paused) : 0
  const cur = weeks.find((w) => w.week === Math.min(Math.max(n, 1), total))
  const finished = n > total

  const begin = () => {
    if (!draft) return
    if (company.trim()) writeRaw('company', company.trim())
    if (unit.trim()) writeRaw('unit', unit.trim())
    writeRaw('paused', null)
    writeRaw('start', draft)
  }
  const pause = () => writeRaw('paused', todayISO())
  const resume = () => {
    if (start && paused) {
      // Shift the start date by the days spent paused, so the weeks pick up where you left off.
      const gap = Math.max(
        0,
        Math.round((parseISO(todayISO()).getTime() - parseISO(paused).getTime()) / DAY)
      )
      writeRaw('start', toISO(new Date(parseISO(start).getTime() + gap * DAY)))
    }
    writeRaw('paused', null)
  }
  const restart = () => {
    writeRaw('start', null)
    writeRaw('paused', null)
    for (let i = 1; i <= total; i++) writeRaw(`passed:${i}`, null)
    setConfirmRestart(false)
    setStep('ask')
  }

  return (
    <div
      className="rounded-2xl border border-border bg-surface p-5 shadow-e1 md:p-6"
      data-challenge-panel
    >
      {!start ? (
        step === 'ask' ? (
          <>
            <div className={`${kicker} text-signal-strong`}>12 weeks · one challenge a week</div>
            <h2 className="mt-2 text-h3 font-semibold text-fg">
              Do you want to start the challenge?
            </h2>
            <p className="mt-2 text-small text-fg-2">
              Run your own YC batch: the same 12-week rhythm, one hard, specific challenge each
              week, and a weekly update with your one number. You pick the dates. Nothing to sign up
              for; it is saved on this device.
            </p>
            <ul className="mt-4 space-y-2 text-small text-fg">
              {[
                'Each week: what happens inside YC, the framework partners teach, and your challenge',
                'Every Monday: your one number and a short update',
                'Week 12: your own Demo Day pitch',
              ].map((t) => (
                <li key={t} className="flex gap-2.5">
                  <span
                    aria-hidden="true"
                    className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-signal"
                  />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button type="button" onClick={() => setStep('form')} className={btnPrimary}>
                Start the 12-week challenge
              </button>
              {weeks[0] && (
                <Link href={`${basePath}/${weeks[0].slug}`} className={btnQuiet}>
                  Read week 1 first
                </Link>
              )}
            </div>
          </>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              begin()
            }}
          >
            <div className={`${kicker} text-signal-strong`}>Set up your challenge</div>
            <h2 className="mt-2 text-h3 font-semibold text-fg">When does your week 1 start?</h2>
            <p className="mt-1 text-small text-fg-2">
              A Monday works best, so your weekly update lands at the start of each week.
            </p>
            <div className="mt-4 space-y-3">
              <label className="flex flex-col gap-1.5">
                <span className={label}>Start date</span>
                <input
                  type="date"
                  required
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  className={`${field} h-11`}
                  data-start-date
                />
              </label>
              <button
                type="button"
                onClick={() => setDraft(todayISO())}
                className="text-caption font-medium text-signal-strong underline-offset-4 hover:underline"
              >
                Start today instead
              </button>
              <label className="flex flex-col gap-1.5">
                <span className={label}>
                  Startup or idea name <span className="font-normal text-fg-3">· optional</span>
                </span>
                <input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. a working title is fine"
                  className={`${field} h-11`}
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className={label}>
                  The one number you will grow{' '}
                  <span className="font-normal text-fg-3">· optional, week 1 helps you pick</span>
                </span>
                <input
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  placeholder="e.g. weekly active users, revenue (₹)"
                  className={`${field} h-11`}
                />
              </label>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button type="submit" disabled={!draft} className={btnPrimary}>
                Start my challenge
              </button>
              <button type="button" onClick={() => setStep('ask')} className={btnQuiet}>
                Not now
              </button>
            </div>
          </form>
        )
      ) : (
        <>
          <div className={`${kicker} text-signal-strong`}>
            Your challenge · {passedCount} of {total} passed · saved on this device
          </div>
          <h2
            className="mt-2 text-h3 font-semibold text-fg"
            aria-live="polite"
            data-challenge-status
          >
            {paused
              ? `Paused in week ${Math.max(n, 1)}`
              : n === 0
                ? `Your challenge starts ${fmt(parseISO(start))}`
                : finished
                  ? `You finished all ${total} weeks`
                  : `Week ${n} of ${total}`}
          </h2>
          {cur && !finished && (
            <p className="mt-1.5 text-body text-fg-2">
              {n === 0 ? 'First challenge' : 'This week’s challenge'}:{' '}
              <span className="font-semibold text-fg">{cur.challenge}</span>
            </p>
          )}
          <div
            className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted"
            role="progressbar"
            aria-valuenow={passedCount}
            aria-valuemin={0}
            aria-valuemax={total}
            aria-label="Challenges passed"
          >
            <div
              className="h-full rounded-full bg-signal transition-[width] duration-slow"
              style={{ width: `${(passedCount / total) * 100}%` }}
            />
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-small">
            <div>
              <dt className="text-caption text-fg-3">Week 1 started</dt>
              <dd className="font-medium text-fg">{fmt(parseISO(start))}</dd>
            </div>
            <div>
              <dt className="text-caption text-fg-3">Your Demo Day (end of week {total})</dt>
              <dd className="font-medium text-fg">{fmt(weekEnd(start, total))}</dd>
            </div>
          </dl>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {paused ? (
              <button type="button" onClick={resume} className={btnPrimary}>
                Resume the challenge
              </button>
            ) : (
              cur &&
              !finished && (
                <Link href={`${basePath}/${cur.slug}`} className={btnPrimary}>
                  Go to week {cur.week} →
                </Link>
              )
            )}
            {finished && (
              <a href="#growth" className={btnSecondary}>
                See your 12 weeks
              </a>
            )}
            {!paused && !finished && (
              <button type="button" onClick={pause} className={btnQuiet}>
                Pause
              </button>
            )}
            {!confirmRestart ? (
              <button type="button" onClick={() => setConfirmRestart(true)} className={btnQuiet}>
                Restart
              </button>
            ) : (
              <span className="flex flex-wrap items-center gap-2 rounded-xl bg-muted px-3 py-2 text-caption text-fg-2">
                Restart clears your dates and passed weeks. Your notes and numbers stay.
                <button
                  type="button"
                  onClick={restart}
                  className="font-semibold text-fg underline underline-offset-4"
                >
                  Restart
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmRestart(false)}
                  className="font-medium text-fg-2 underline-offset-4 hover:underline"
                >
                  Keep going
                </button>
              </span>
            )}
          </div>
          {paused && (
            <p className="mt-2 text-caption text-fg-3">
              Paused {fmt(parseISO(paused))}. When you resume, your dates move forward by the days
              you were away.
            </p>
          )}
        </>
      )}
    </div>
  )
}

/** "Your dates: Mon 9 Nov – Sun 15 Nov" on a week page (only if the challenge has started). */
export function WeekDates({ week, hubHref }: { week: number; hubHref: string }) {
  const start = useStore(readStart, null)
  const paused = useStore(readPaused, null)
  if (!start)
    return (
      <Link
        href={`${hubHref}#start`}
        className="text-caption font-medium text-signal-strong underline-offset-4 hover:underline"
      >
        Start the challenge to see your dates →
      </Link>
    )
  const n = currentWeek(start, paused)
  return (
    <span className="text-caption text-fg-2">
      Your week {week}: {fmt(weekStart(start, week))} – {fmt(weekEnd(start, week))}
      {n === week && !paused && (
        <span className="ml-2 font-semibold text-signal-strong">This week</span>
      )}
      {paused && <span className="ml-2 font-medium text-fg-3">Challenge paused</span>}
    </span>
  )
}

/** "I passed this challenge" toggle on a week page. */
export function PassedToggle({ week }: { week: number }) {
  const passed = useStore(() => !!readRaw(`passed:${week}`), false)
  return (
    <button
      type="button"
      aria-pressed={passed}
      onClick={() => writeRaw(`passed:${week}`, passed ? null : String(Date.now()))}
      data-passed-toggle
      className={`inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-small font-semibold transition-colors duration-fast ${
        passed
          ? 'bg-success-soft text-success-strong ring-1 ring-inset ring-success/30'
          : 'bg-surface text-fg ring-1 ring-inset ring-border-strong hover:bg-muted'
      }`}
    >
      <span
        aria-hidden="true"
        className={`flex h-5 w-5 items-center justify-center rounded-full border text-[12px] ${
          passed ? 'border-success bg-success text-white' : 'border-border-input'
        }`}
      >
        {passed ? '✓' : ''}
      </span>
      {passed ? `Week ${week} challenge passed` : 'I passed this challenge'}
    </button>
  )
}

/** Status chip on the hub board: Passed / In progress / Not started. */
export function ChallengeStatus({ week, ids }: { week: number; ids: string[] }) {
  const passed = useStore(() => !!readRaw(`passed:${week}`), false)
  const done = useStore(readDone, {} as Record<string, number>)
  const start = useStore(readStart, null)
  const paused = useStore(readPaused, null)
  const isCurrent = !!start && currentWeek(start, paused) === week
  const started = ids.some((id) => done[id]) || isCurrent
  const [t, cls] = passed
    ? ['Passed', 'bg-success-soft text-success-strong']
    : started
      ? ['In progress', 'bg-signal-tint text-signal-strong']
      : ['Not started', 'bg-muted text-fg-2']
  return (
    <span
      data-status={t}
      className={`inline-flex h-6 shrink-0 items-center rounded-full px-2.5 text-caption font-medium ${cls}`}
    >
      {passed && (
        <span aria-hidden="true" className="mr-1">
          ✓
        </span>
      )}
      {t}
    </span>
  )
}

/** Tiny tick next to a week in the week-page rail when that challenge is passed. */
export function PassedMark({ week }: { week: number }) {
  const passed = useStore(() => !!readRaw(`passed:${week}`), false)
  if (!passed) return null
  return (
    <span className="ml-auto text-caption font-semibold text-success-strong">
      ✓<span className="sr-only"> passed</span>
    </span>
  )
}

/** Small "3 of 5 done" marker for the hub timeline. */
export function WeekTicks({ ids }: { ids: string[] }) {
  const done = useStore(readDone, {} as Record<string, number>)
  const n = ids.filter((id) => done[id]).length
  if (!ids.length) return null
  return (
    <span
      className={`inline-flex h-6 shrink-0 items-center rounded-full px-2.5 text-caption font-medium tabular-nums ${
        n === ids.length ? 'bg-success-soft text-success-strong' : 'bg-muted text-fg-2'
      }`}
    >
      {n === ids.length ? 'Done' : `${n}/${ids.length}`}
    </span>
  )
}

/* ---------- Growth tracker (hub) ---------- */

export function GrowthTracker({ total = 12 }: { total?: number }) {
  const metrics = useStore(readMetrics, {} as Metrics)
  const [unit, setUnit] = useState('')
  useEffect(() => setUnit(readRaw('unit') ?? ''), [])
  const weeks = Array.from({ length: total }, (_, i) => i + 1)
  const vals = weeks.map((w) => (Number.isFinite(metrics[w]) ? metrics[w] : null))
  const entered = vals.map((v, i) => (v !== null ? { w: i + 1, v } : null)).filter(Boolean) as {
    w: number
    v: number
  }[]
  const first = entered[0]
  const last = entered[entered.length - 1]
  const avg =
    first && last && last.w > first.w && first.v > 0
      ? (Math.pow(last.v / first.v, 1 / (last.w - first.w)) - 1) * 100
      : null

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end gap-3">
        <label className="flex min-w-0 flex-1 flex-col gap-1.5 sm:max-w-xs">
          <span className={label}>Your one number (what you are growing)</span>
          <input
            value={unit}
            onChange={(e) => {
              setUnit(e.target.value)
              writeRaw('unit', e.target.value || null)
            }}
            placeholder="e.g. weekly active users, revenue (₹)"
            className={`${field} h-11`}
          />
        </label>
        <div className="rounded-xl bg-muted px-4 py-2.5" aria-live="polite">
          <div className="text-caption text-fg-3">Average weekly growth</div>
          <div className="text-h3 font-semibold tabular-nums text-fg">
            {avg === null ? '—' : fmtPct(avg)}
          </div>
        </div>
      </div>

      <GrowthChart vals={vals} />

      <div
        role="region"
        aria-label="Weekly numbers (scrolls sideways on small screens)"
        // Scrollable region must be keyboard-focusable (WCAG 2.1.1)
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        className="overflow-x-auto rounded-xl border border-border bg-surface"
      >
        <table className="w-full text-small tabular-nums">
          <thead className="bg-muted text-left text-fg-2">
            <tr>
              <th scope="col" className="w-14 px-3 py-2.5 font-medium md:px-4">
                Week
              </th>
              <th scope="col" className="px-3 py-2.5 font-medium md:px-4">
                {unit || 'Your number'}
              </th>
              <th scope="col" className="px-3 py-2.5 font-medium md:px-4">
                vs last week
              </th>
            </tr>
          </thead>
          <tbody>
            {weeks.map((w, i) => {
              const v = vals[i]
              const prev = i > 0 ? vals[i - 1] : null
              const g = v !== null && prev !== null && prev > 0 ? pct(v, prev) : null
              return (
                <tr key={w} className="border-t border-border">
                  <th scope="row" className="px-3 py-1.5 text-left font-medium text-fg md:px-4">
                    {w}
                  </th>
                  <td className="px-3 py-1.5 md:px-4">
                    <input
                      type="number"
                      inputMode="decimal"
                      min={0}
                      aria-label={`Week ${w} number`}
                      value={v ?? ''}
                      onChange={(e) =>
                        setMetric(w, e.target.value === '' ? null : Number(e.target.value))
                      }
                      className={`${field} h-10 w-full max-w-[9rem] py-1.5`}
                    />
                  </td>
                  <td
                    className={`px-3 py-1.5 font-medium md:px-4 ${
                      g === null ? 'text-fg-3' : g >= 5 ? 'text-success-strong' : 'text-fg-2'
                    }`}
                  >
                    {g === null ? '—' : fmtPct(g)}
                    {g !== null && g >= 5 && <span className="sr-only"> (at or above 5%)</span>}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/** Inline SVG: your weekly numbers against a 5–7% weekly growth band from your first number. */
function GrowthChart({ vals }: { vals: (number | null)[] }) {
  const W = 640
  const H = 220
  const pad = { l: 44, r: 12, t: 12, b: 28 }
  const n = vals.length
  const firstIdx = vals.findIndex((v) => v !== null && v > 0)
  const base = firstIdx >= 0 ? (vals[firstIdx] as number) : null
  const band =
    base === null
      ? []
      : vals.map((_, i) =>
          i < firstIdx
            ? null
            : { lo: base * Math.pow(1.05, i - firstIdx), hi: base * Math.pow(1.07, i - firstIdx) }
        )
  const maxV = Math.max(1, ...vals.map((v) => v ?? 0), ...band.map((b) => (b ? b.hi : 0)))
  const x = (i: number) => pad.l + (i * (W - pad.l - pad.r)) / Math.max(1, n - 1)
  const y = (v: number) => pad.t + (H - pad.t - pad.b) * (1 - v / maxV)
  const pts = vals
    .map((v, i) => (v === null ? null : `${x(i).toFixed(1)},${y(v).toFixed(1)}`))
    .filter(Boolean)
  const bandIdx = band.map((b, i) => (b ? i : -1)).filter((i) => i >= 0)
  const bandPath =
    bandIdx.length > 1
      ? `M${bandIdx.map((i) => `${x(i)},${y(band[i]!.hi)}`).join(' L')} L${[...bandIdx]
          .reverse()
          .map((i) => `${x(i)},${y(band[i]!.lo)}`)
          .join(' L')} Z`
      : ''
  const count = pts.length

  return (
    <figure className="rounded-xl border border-border bg-surface p-3 md:p-4">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label={
          count
            ? `Chart of ${count} weekly numbers against a 5 to 7 percent weekly growth band`
            : 'Empty chart: enter your weekly numbers below'
        }
        data-points={count}
      >
        {[0, 0.5, 1].map((f) => (
          <g key={f}>
            <line
              x1={pad.l}
              x2={W - pad.r}
              y1={y(maxV * f)}
              y2={y(maxV * f)}
              className="stroke-border"
              strokeWidth={1}
            />
            <text
              x={pad.l - 6}
              y={y(maxV * f) + 4}
              textAnchor="end"
              className="fill-fg-3 text-[11px]"
            >
              {Math.round(maxV * f).toLocaleString('en-IN')}
            </text>
          </g>
        ))}
        {vals.map((_, i) => (
          <text key={i} x={x(i)} y={H - 8} textAnchor="middle" className="fill-fg-3 text-[11px]">
            {i + 1}
          </text>
        ))}
        {bandPath && <path d={bandPath} className="fill-signal-tint" />}
        {count > 1 && (
          <polyline
            points={pts.join(' ')}
            fill="none"
            className="stroke-signal"
            strokeWidth={2.5}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        )}
        {vals.map((v, i) =>
          v === null ? null : (
            <circle
              key={i}
              cx={x(i)}
              cy={y(v)}
              r={4}
              className="fill-signal stroke-surface"
              strokeWidth={2}
            />
          )
        )}
      </svg>
      <figcaption className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-caption text-fg-2">
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-signal" /> Your number
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span
            aria-hidden="true"
            className="h-2.5 w-4 rounded-sm bg-signal-tint ring-1 ring-inset ring-signal/20"
          />
          5–7% a week from your first week
        </span>
        <span className="text-fg-3">
          Paul Graham, ‘Startup = Growth’ (2012): 5–7% a week is a good rate early on; 10% is
          exceptional.
        </span>
      </figcaption>
    </figure>
  )
}

/* ---------- Assignments (week page) ---------- */

export function Assignments({
  items,
}: {
  items: { id: string; text: string; why: string; done: string }[]
}) {
  const done = useStore(readDone, {} as Record<string, number>)
  const n = items.filter((a) => done[a.id]).length
  const p = items.length ? Math.round((n / items.length) * 100) : 0
  const toggle = useCallback((id: string) => {
    const next = { ...readDone() }
    if (next[id]) delete next[id]
    else next[id] = Date.now()
    writeRaw('done', JSON.stringify(next))
  }, [])
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div
          className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-valuenow={p}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="This week’s assignments done"
        >
          <div
            className="h-full rounded-full bg-signal transition-[width] duration-slow"
            style={{ width: `${p}%` }}
          />
        </div>
        <span className="text-caption tabular-nums text-fg-2" aria-live="polite">
          {n} of {items.length} done
        </span>
      </div>
      <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-surface">
        {items.map((a) => {
          const on = !!done[a.id]
          return (
            <li key={a.id} className="flex gap-3 p-4 md:p-5">
              <input
                id={`a-${a.id}`}
                type="checkbox"
                checked={on}
                onChange={() => toggle(a.id)}
                data-assignment={a.id}
                className="mt-0.5 h-6 w-6 shrink-0 cursor-pointer rounded-md border-border-input text-signal focus:ring-signal"
              />
              <div className="min-w-0">
                <label
                  htmlFor={`a-${a.id}`}
                  className={`cursor-pointer text-body font-medium ${on ? 'text-fg-2 line-through decoration-fg-3' : 'text-fg'}`}
                >
                  {a.text}
                </label>
                <p className="mt-1 text-small text-fg-2">{a.why}</p>
                <p className="mt-1.5 text-caption text-fg-2">
                  <span className="font-semibold text-fg">Done when:</span> {a.done}
                </p>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/* ---------- Office hours (week page) ---------- */

export function OfficeHours({
  items,
  idPrefix,
}: {
  items: { q: string; why: string }[]
  idPrefix: string
}) {
  return (
    <ol className="space-y-3">
      {items.map((it, i) => (
        <OfficeHoursItem key={it.q} id={`${idPrefix}-q${i + 1}`} n={i + 1} {...it} />
      ))}
    </ol>
  )
}

function OfficeHoursItem({ id, n, q, why }: { id: string; n: number; q: string; why: string }) {
  const [text, setText] = useState('')
  const [saved, setSaved] = useState(false)
  useEffect(() => setText(readRaw(`oh:${id}`) ?? ''), [id])
  useEffect(() => {
    if (!saved) return
    const t = setTimeout(() => setSaved(false), 1200)
    return () => clearTimeout(t)
  }, [saved])
  return (
    <li className="rounded-xl border border-border bg-surface p-4 md:p-5">
      <div className="flex gap-3">
        <span className="font-mono text-caption tabular-nums text-fg-3">
          {String(n).padStart(2, '0')}
        </span>
        <div className="min-w-0 flex-1">
          <label htmlFor={`oh-${id}`} className="text-body font-semibold text-fg">
            {q}
          </label>
          <textarea
            id={`oh-${id}`}
            rows={2}
            value={text}
            onChange={(e) => {
              setText(e.target.value)
              writeRaw(`oh:${id}`, e.target.value || null)
              setSaved(true)
            }}
            placeholder="Your answer in one or two sentences"
            className={`${field} mt-2 resize-y`}
          />
          <div className="mt-1 h-4 text-caption text-fg-3" aria-live="polite">
            {saved ? 'Saved on this device' : ''}
          </div>
          <details className="group mt-1">
            <summary className="inline-flex min-h-9 cursor-pointer list-none items-center gap-1 text-caption font-semibold text-signal-strong [&::-webkit-details-marker]:hidden">
              Why a partner asks this
              <span
                aria-hidden="true"
                className="transition-transform duration-base group-open:rotate-90"
              >
                ›
              </span>
            </summary>
            <p className="mt-1 max-w-[68ch] text-small text-fg-2">{why}</p>
          </details>
        </div>
      </div>
    </li>
  )
}

/* ---------- Weekly update builder (week page) ---------- */

type UpdateFields = { did: string; learned: string; obstacle: string; ask: string }
const emptyUpdate: UpdateFields = { did: '', learned: '', obstacle: '', ask: '' }

export function WeeklyUpdate({
  week,
  metric,
  prompt,
}: {
  week: number
  metric: string
  prompt: string
}) {
  const metrics = useStore(readMetrics, {} as Metrics)
  const [company, setCompany] = useState('')
  const [f, setF] = useState<UpdateFields>(emptyUpdate)
  const [unit, setUnit] = useState('')
  useEffect(() => {
    setCompany(readRaw('company') ?? '')
    setUnit(readRaw('unit') ?? '')
    setF({ ...emptyUpdate, ...readJSON<UpdateFields>(`update:${week}`, emptyUpdate) })
  }, [week])
  const set = (k: keyof UpdateFields, v: string) => {
    const next = { ...f, [k]: v }
    setF(next)
    writeRaw(`update:${week}`, JSON.stringify(next))
  }
  const cur = Number.isFinite(metrics[week]) ? metrics[week] : null
  const prev = week > 1 && Number.isFinite(metrics[week - 1]) ? metrics[week - 1] : null
  const g = cur !== null && prev !== null && prev > 0 ? pct(cur, prev) : null

  const text = useMemo(() => {
    const lines = [
      `${company || 'Our company'}: week ${week} update`,
      '',
      `Our number${unit ? ` (${unit})` : ''}: ${cur ?? '?'}${
        prev !== null
          ? ` (last week ${prev}${g !== null ? `, ${fmtPct(g)} week over week` : ''})`
          : ''
      }`,
      `This week's focus: ${metric}`,
      `What we did: ${f.did || '-'}`,
      `What we learned: ${f.learned || '-'}`,
      `Biggest obstacle: ${f.obstacle || '-'}`,
      `Ask: ${f.ask || '-'}`,
    ]
    return lines.join('\n')
  }, [company, week, unit, metric, cur, prev, g, f])

  const num = (w: number, v: string) => setMetric(w, v === '' ? null : Number(v))

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <p className="text-small text-fg-2">{prompt}</p>
        <label className="flex flex-col gap-1.5">
          <span className={label}>Company or project name</span>
          <input
            value={company}
            onChange={(e) => {
              setCompany(e.target.value)
              writeRaw('company', e.target.value || null)
            }}
            className={`${field} h-11`}
          />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="flex flex-col gap-1.5">
            <span className={label}>This week ({unit || metric})</span>
            <input
              type="number"
              inputMode="decimal"
              min={0}
              value={cur ?? ''}
              onChange={(e) => num(week, e.target.value)}
              data-metric="this"
              className={`${field} h-11`}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className={label}>Last week</span>
            <input
              type="number"
              inputMode="decimal"
              min={0}
              disabled={week === 1}
              value={prev ?? ''}
              onChange={(e) => num(week - 1, e.target.value)}
              placeholder={week === 1 ? 'n/a in week 1' : ''}
              data-metric="last"
              className={`${field} h-11 disabled:opacity-60`}
            />
          </label>
        </div>
        {(
          [
            ['did', 'What we did'],
            ['learned', 'What we learned (from users)'],
            ['obstacle', 'Biggest obstacle'],
            ['ask', 'Ask (what would help most)'],
          ] as [keyof UpdateFields, string][]
        ).map(([k, l]) => (
          <label key={k} className="flex flex-col gap-1.5">
            <span className={label}>{l}</span>
            <textarea
              rows={2}
              value={f[k]}
              onChange={(e) => set(k, e.target.value)}
              className={`${field} resize-y`}
            />
          </label>
        ))}
      </div>
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="flex items-center justify-between gap-3">
          <span className={`${kicker} text-fg-3`}>Your update, ready to send</span>
          <CopyButton text={text} label="Copy update" />
        </div>
        <pre
          data-update-text
          className="mt-3 whitespace-pre-wrap break-words rounded-xl bg-ink p-4 font-mono text-[13px] leading-relaxed text-ink-fg md:p-5"
        >
          {text}
        </pre>
        <p className="mt-2 text-caption text-fg-3">
          Your number also goes into the growth tracker on the program page. Saved on this device.
        </p>
      </div>
    </div>
  )
}

/* ---------- Pitch builder (weeks 11–12) ---------- */

const PITCH_PARTS: { k: string; l: string; hint: string }[] = [
  { k: 'oneLiner', l: 'What you do, in one sentence', hint: 'We help X do Y.' },
  { k: 'problem', l: 'The problem', hint: 'Who has it, how badly, how you know.' },
  { k: 'solution', l: 'Your product', hint: 'What it does, concretely.' },
  { k: 'traction', l: 'Traction', hint: 'Your number and its weekly growth.' },
  { k: 'insight', l: 'Market or insight', hint: 'Why now, why this is big, what you know.' },
  { k: 'team', l: 'Team', hint: 'Why you are the people to build this.' },
  { k: 'ask', l: 'The ask', hint: 'How much you are raising, how to reach you.' },
]
const WPM = 150

export function PitchBuilder({ seconds = 60, note }: { seconds?: number; note?: string }) {
  const [f, setF] = useState<Record<string, string>>({})
  useEffect(() => setF(readJSON<Record<string, string>>('pitch', {})), [])
  const set = (k: string, v: string) => {
    const next = { ...f, [k]: v }
    setF(next)
    writeRaw('pitch', JSON.stringify(next))
  }
  const script = PITCH_PARTS.map((p) => (f[p.k] || '').trim())
    .filter(Boolean)
    .join(' ')
  const words = script ? script.split(/\s+/).length : 0
  const secs = Math.round((words / WPM) * 60)
  const over = secs > seconds
  const p = Math.min(100, Math.round((secs / seconds) * 100))

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-3">
        {PITCH_PARTS.map((part) => (
          <label key={part.k} className="flex flex-col gap-1.5">
            <span className={label}>
              {part.l} <span className="font-normal text-fg-3">· {part.hint}</span>
            </span>
            <textarea
              rows={2}
              value={f[part.k] || ''}
              onChange={(e) => set(part.k, e.target.value)}
              className={`${field} resize-y`}
            />
          </label>
        ))}
      </div>
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-xl border border-border bg-surface p-4 md:p-5" aria-live="polite">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-small font-semibold text-fg">
              {words} words · about {secs}s spoken
            </span>
            <span className={`text-caption font-semibold ${over ? 'text-danger' : 'text-fg-2'}`}>
              Target {seconds}s{over ? ` · ${secs - seconds}s over` : ''}
            </span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className={`h-full rounded-full ${over ? 'bg-danger' : 'bg-signal'}`}
              style={{ width: `${p}%` }}
            />
          </div>
          <p className="mt-2 text-caption text-fg-3">
            Estimated at {WPM} words a minute.{note ? ` ${note}` : ''}
          </p>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className={`${kicker} text-fg-3`}>Your script</span>
          <CopyButton text={script} label="Copy script" />
        </div>
        <p className="mt-3 min-h-[6rem] whitespace-pre-wrap rounded-xl bg-muted p-4 text-small text-fg">
          {script || 'Fill in the parts on the left; your script appears here in order.'}
        </p>
      </div>
    </div>
  )
}
