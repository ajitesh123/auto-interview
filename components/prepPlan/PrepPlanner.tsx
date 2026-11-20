'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import {
  addDays,
  afterChecklist,
  buildPlan,
  type Day,
  dayOfChecklist,
  diffDays,
  fmtDay,
  fmtMin,
  type Inputs,
  localToday,
  MAX_PLAN_DAYS,
  MINUTE_OPTS,
  PHASE_LABEL,
  planText,
  ROLES,
  ROUNDS,
  type RoundId,
  SAMPLE,
  type Task,
} from '@/data/prepPlan/engine'

const KEY = 'aia.prepPlan.v1'
const kicker = 'font-mono text-kicker uppercase tracking-[0.08em]'
const field =
  'mt-1.5 h-11 w-full min-w-0 rounded-lg border border-border-input bg-surface px-3 text-small text-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-strong'
const btn2 =
  'inline-flex h-11 items-center justify-center gap-2 rounded-full bg-surface px-4 text-small font-semibold text-fg ring-1 ring-inset ring-border-strong transition-colors duration-fast hover:bg-muted disabled:opacity-50'
const btn1 =
  'inline-flex h-11 items-center justify-center gap-2 rounded-full bg-signal px-5 text-small font-semibold text-white shadow-e1 transition-colors duration-fast hover:bg-signal-strong disabled:opacity-50'

interface Saved {
  inputs: Inputs
  done: string[]
  time: string
  start?: string // the day the plan was first built; kept while the interview date is unchanged
}

const ISO = /^\d{4}-\d{2}-\d{2}$/

/** RFC 5545: lines longer than 75 octets are folded with CRLF + a space. */
function fold(line: string): string {
  const out: string[] = []
  let cur = ''
  let bytes = 0
  for (const ch of line) {
    const b = new TextEncoder().encode(ch).length
    if (bytes + b > 74) {
      out.push(cur)
      cur = ' '
      bytes = 1
    }
    cur += ch
    bytes += b
  }
  out.push(cur)
  return out.join('\r\n')
}

const pad = (n: number) => String(n).padStart(2, '0')
function icsStamp(d: string, time: string, addMin = 0): string {
  const [h, m] = time.split(':').map(Number)
  const total = h * 60 + m + addMin
  const day = addDays(d, Math.floor(total / 1440))
  const mm = total % 1440
  return `${day.replace(/-/g, '')}T${pad(Math.floor(mm / 60))}${pad(mm % 60)}00`
}
const icsEsc = (t: string) =>
  t.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')

const taskId = (d: Day, t: Task, k: number) => `${d.date}|${k}|${t.title}`

function Check({
  on,
  onChange,
  children,
}: {
  on: boolean
  onChange: () => void
  children: React.ReactNode
}) {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className="flex min-h-11 cursor-pointer items-start gap-3 py-2">
      <input
        type="checkbox"
        checked={on}
        onChange={onChange}
        className="mt-1 h-5 w-5 shrink-0 rounded border-border-input accent-signal"
      />
      <span className="min-w-0 flex-1">{children}</span>
    </label>
  )
}

export default function PrepPlanner() {
  // Server render uses the fixed sample; the browser swaps in today's date after mount.
  const [inputs, setInputs] = useState<Inputs>(SAMPLE)
  const [done, setDone] = useState<string[]>([])
  const [time, setTime] = useState('20:00')
  const [loaded, setLoaded] = useState(false)
  const [copied, setCopied] = useState(false)
  const [now, setNow] = useState(SAMPLE.today)

  useEffect(() => {
    const today = localToday()
    setNow(today)
    let next: Inputs = { ...SAMPLE, today, interview: addDays(today, 7) }
    try {
      const raw = localStorage.getItem(KEY)
      if (raw) {
        const v = JSON.parse(raw) as Partial<Saved>
        if (v.inputs && typeof v.inputs === 'object') {
          const s = v.inputs
          const interview =
            typeof s.interview === 'string' && ISO.test(s.interview) && s.interview >= today
              ? s.interview
              : next.interview
          // Coming back to the same interview: keep the original start so days and ticks stay put.
          const start =
            interview === s.interview &&
            typeof v.start === 'string' &&
            ISO.test(v.start) &&
            v.start <= today
              ? v.start
              : today
          next = {
            today: start,
            interview,
            role: ROLES.some((r) => r.id === s.role) ? (s.role as string) : next.role,
            rounds: Array.isArray(s.rounds)
              ? (s.rounds.filter((x) => ROUNDS.some((r) => r.id === x)) as RoundId[])
              : next.rounds,
            weekdayMin: MINUTE_OPTS.includes(Number(s.weekdayMin))
              ? Number(s.weekdayMin)
              : next.weekdayMin,
            weekendMin: MINUTE_OPTS.includes(Number(s.weekendMin))
              ? Number(s.weekendMin)
              : next.weekendMin,
            mode: s.mode === 'onsite' ? 'onsite' : 'video',
          }
        }
        if (Array.isArray(v.done)) setDone(v.done.filter((x) => typeof x === 'string'))
        if (typeof v.time === 'string' && /^\d{2}:\d{2}$/.test(v.time)) setTime(v.time)
      }
    } catch {
      /* storage blocked: start fresh */
    }
    try {
      // ?role=<hub slug> from a role hub link preselects the role
      const q = new URLSearchParams(window.location.search).get('role')
      if (q && ROLES.some((r) => r.id === q)) next = { ...next, role: q }
    } catch {
      /* ignore */
    }
    setInputs(next)
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    try {
      localStorage.setItem(
        KEY,
        JSON.stringify({ inputs, done, time, start: inputs.today } satisfies Saved)
      )
    } catch {
      /* ignore */
    }
  }, [inputs, done, time, loaded])

  const plan = useMemo(() => buildPlan(inputs), [inputs])
  const set = <K extends keyof Inputs>(k: K, v: Inputs[K]) =>
    // a new interview date starts a new plan from today
    setInputs((p) => ({ ...p, [k]: v, ...(k === 'interview' ? { today: now } : {}) }))
  const left = diffDays(now, inputs.interview)
  const toggle = (id: string) =>
    setDone((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))
  const toggleRound = (r: RoundId) =>
    set(
      'rounds',
      inputs.rounds.includes(r) ? inputs.rounds.filter((x) => x !== r) : [...inputs.rounds, r]
    )

  const allIds = plan.days.flatMap((d) => d.tasks.map((t, k) => taskId(d, t, k)))
  const doneCount = allIds.filter((id) => done.includes(id)).length
  const pct = allIds.length ? Math.round((doneCount / allIds.length) * 100) : 0
  const todayIdx = plan.days.findIndex((d) => d.date === now)
  const dayNo = todayIdx >= 0 ? todayIdx + 1 : 0
  const startsLater = plan.capped && diffDays(now, plan.start) > 0
  const role = ROLES.find((r) => r.id === inputs.role)

  const download = () => {
    const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Auto Interview AI//Prep plan//EN']
    const stamp = new Date().toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z'
    for (const d of plan.days) {
      if (!d.tasks.length) continue
      lines.push(
        'BEGIN:VEVENT',
        `UID:prep-${inputs.interview}-${d.date}@autointerviewai.com`,
        `DTSTAMP:${stamp}`,
        `DTSTART:${icsStamp(d.date, time)}`,
        `DTEND:${icsStamp(d.date, time, Math.max(d.used, 15))}`,
        `SUMMARY:${icsEsc(`Interview prep · day ${d.index} of ${plan.days.length} · ${PHASE_LABEL[d.phase]}`)}`,
        `DESCRIPTION:${icsEsc(
          `${d.tasks.map((t) => `- ${t.title} (${t.minutes} min)`).join('\n')}\n\nYour plan: https://www.autointerviewai.com/interview-prep-plan`
        )}`,
        'END:VEVENT'
      )
    }
    lines.push(
      'BEGIN:VEVENT',
      `UID:prep-${inputs.interview}-interview@autointerviewai.com`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${inputs.interview.replace(/-/g, '')}`,
      `DTEND;VALUE=DATE:${addDays(inputs.interview, 1).replace(/-/g, '')}`,
      `SUMMARY:${icsEsc('Interview day')}`,
      `DESCRIPTION:${icsEsc(dayOfChecklist(inputs).join('\n'))}`,
      'END:VEVENT',
      'END:VCALENDAR'
    )
    const blob = new Blob([lines.map(fold).join('\r\n') + '\r\n'], { type: 'text/calendar' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `interview-prep-plan-${inputs.interview}.ics`
    a.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(planText(plan, inputs))
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard blocked */
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      {/* ---------- Inputs ---------- */}
      <form
        className="min-w-0 space-y-6 lg:sticky lg:top-32 lg:col-span-4 lg:self-start"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Your interview"
      >
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
          <label className="col-span-2 block min-w-0 lg:col-span-1">
            <span className="text-small font-medium text-fg">Interview date</span>
            <input
              type="date"
              value={inputs.interview}
              min={now}
              onChange={(e) => e.target.value && set('interview', e.target.value)}
              aria-describedby="date-hint"
              className={field}
            />
            <span id="date-hint" className="mt-1 block text-caption text-fg-3">
              {left > 0
                ? `${left} day${left === 1 ? '' : 's'} from today`
                : left === 0
                  ? 'Today'
                  : 'Pick a date from today on'}
            </span>
          </label>
          <label className="col-span-2 block min-w-0 lg:col-span-1">
            <span className="text-small font-medium text-fg">Role</span>
            <select
              value={inputs.role}
              onChange={(e) => set('role', e.target.value)}
              className={field}
            >
              {ROLES.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <fieldset className="min-w-0">
          <legend className="text-small font-medium text-fg">Rounds you will face</legend>
          <div className="mt-1.5 divide-y divide-border rounded-xl border border-border bg-surface px-3">
            {ROUNDS.map((r) => (
              <Check
                key={r.id}
                on={inputs.rounds.includes(r.id)}
                onChange={() => toggleRound(r.id)}
              >
                <span className="block text-small font-medium text-fg">{r.name}</span>
                <span className="block text-caption text-fg-3">{r.hint}</span>
              </Check>
            ))}
          </div>
        </fieldset>

        <fieldset className="min-w-0">
          <legend className="text-small font-medium text-fg">Time you can give it</legend>
          <div className="mt-1.5 grid grid-cols-2 gap-4">
            {(
              [
                ['weekdayMin', 'Each weekday'],
                ['weekendMin', 'Each weekend day'],
              ] as const
            ).map(([k, label]) => (
              <label key={k} className="block min-w-0">
                <span className="text-caption text-fg-2">{label}</span>
                <select
                  value={inputs[k]}
                  onChange={(e) => set(k, Number(e.target.value))}
                  className={field}
                >
                  {MINUTE_OPTS.map((m) => (
                    <option key={m} value={m}>
                      {m === 0 ? 'None' : fmtMin(m)}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="min-w-0">
          <legend className="text-small font-medium text-fg">Interview format</legend>
          <div className="mt-1.5 grid grid-cols-2 gap-2">
            {(
              [
                ['video', 'Video call'],
                ['onsite', 'In person'],
              ] as const
            ).map(([v, label]) => (
              <label
                key={v}
                className={`flex h-11 cursor-pointer items-center justify-center rounded-full text-small font-medium ring-1 ring-inset transition-colors duration-fast has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-signal-strong ${
                  inputs.mode === v
                    ? 'bg-signal-tint text-signal-ink ring-signal/40'
                    : 'bg-surface text-fg-2 ring-border-strong hover:bg-muted'
                }`}
              >
                <input
                  type="radio"
                  name="mode"
                  value={v}
                  checked={inputs.mode === v}
                  onChange={() => set('mode', v)}
                  className="sr-only"
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>
        <p className="text-caption text-fg-3">
          Saved in this browser only. Nothing is uploaded and no AI is used.
        </p>
      </form>

      {/* ---------- Plan ---------- */}
      <div className="min-w-0 space-y-6 lg:col-span-8">
        {!loaded ? (
          <div
            className="h-[28rem] animate-pulse rounded-2xl border border-border bg-surface motion-reduce:animate-none"
            aria-label="Building your plan"
          />
        ) : left < 0 ? (
          <div className="rounded-xl border border-dashed border-border-strong bg-surface p-8 text-center">
            <p className="text-h4 font-semibold text-fg" aria-live="polite">
              That date has passed. Pick the date of your next round.
            </p>
          </div>
        ) : plan.error ? (
          <div className="rounded-xl border border-dashed border-border-strong bg-surface p-8 text-center">
            <p className="text-h4 font-semibold text-fg" aria-live="polite">
              {plan.error}
            </p>
            <p className="mt-2 text-small text-fg-2">Your plan appears here as soon as you do.</p>
          </div>
        ) : left === 0 ? (
          <div className="rounded-2xl border border-border bg-surface p-5 md:p-6">
            <div className={`${kicker} text-signal-strong`}>Your interview is today</div>
            <h3 className="mt-2 text-h3 font-semibold text-fg">
              No new topics now. Do these and go.
            </h3>
            <ul className="mt-3 divide-y divide-border">
              {[...dayOfChecklist(inputs), 'Say your two best stories out loud once'].map((c) => (
                <li key={c}>
                  <Check on={done.includes(`day|${c}`)} onChange={() => toggle(`day|${c}`)}>
                    <span className="text-small text-fg">{c}</span>
                  </Check>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <>
            {/* summary */}
            <div className="rounded-2xl border border-border bg-surface p-5 md:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <div>
                  <div className={`${kicker} text-fg-3`}>
                    {role?.name} · interview {fmtDay(inputs.interview)}
                  </div>
                  <p className="mt-1 text-h3 font-semibold text-fg">
                    {left === 1 && plan.days.length === 1
                      ? 'Interview tomorrow: today is your one prep day'
                      : dayNo
                        ? `Day ${dayNo} of ${plan.days.length}`
                        : `Starts ${fmtDay(plan.start)}`}
                  </p>
                </div>
                <div className="text-small tabular-nums text-fg-2" aria-live="polite">
                  <span className="font-semibold text-fg">{doneCount}</span> of {allIds.length}{' '}
                  tasks done
                </div>
              </div>
              <div
                className="mt-4 h-2 overflow-hidden rounded-full bg-muted"
                role="progressbar"
                aria-label="Plan progress"
                aria-valuenow={pct}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="h-full rounded-full bg-signal transition-[width] duration-slow ease-out"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <dl className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  ['Days to go', String(left)],
                  ['Time planned', fmtMin(plan.planned)],
                  ['Said out loud', fmtMin(plan.loudMinutes)],
                  ['Mock interviews', String(plan.mocks)],
                ].map(([k, v]) => (
                  <div key={k} className="min-w-0">
                    <dt className="text-caption text-fg-3">{k}</dt>
                    <dd className="text-h4 font-semibold tabular-nums text-fg">{v}</dd>
                  </div>
                ))}
              </dl>
              {startsLater && (
                <p className="mt-4 text-small text-fg-2">
                  Your interview is more than {MAX_PLAN_DAYS} days away, so the daily plan starts on{' '}
                  {fmtDay(plan.start)}. Until then, two or three sessions a week on the{' '}
                  {role?.hub ? (
                    <Link href={`${role.hub}#questions`} className="font-medium text-signal-strong">
                      reported questions
                    </Link>
                  ) : (
                    'questions your role is known for'
                  )}{' '}
                  keep you warm.
                </p>
              )}
              <div className="mt-5 flex flex-wrap gap-2">
                <button type="button" onClick={download} className={btn1}>
                  Add to my calendar
                </button>
                <label className="inline-flex h-11 items-center gap-2 rounded-full px-3 text-small text-fg-2 ring-1 ring-inset ring-border">
                  at
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => e.target.value && setTime(e.target.value)}
                    className="border-0 bg-transparent p-0 text-small text-fg focus:outline-none focus:ring-0"
                    aria-label="Daily session start time"
                  />
                </label>
                <button type="button" onClick={copy} className={btn2}>
                  {copied ? 'Copied' : 'Copy plan'}
                </button>
                {doneCount > 0 && (
                  <button type="button" onClick={() => setDone([])} className={btn2}>
                    Clear ticks
                  </button>
                )}
              </div>
            </div>

            {plan.dropped.length > 0 && (
              <div className="rounded-xl bg-warn-soft p-4 ring-1 ring-inset ring-warn/20 md:p-5">
                <p className="text-small font-semibold text-fg">
                  Your time covers the most important tasks, not all of them.
                </p>
                <p className="mt-1 text-small text-fg-2">
                  About {fmtMin(plan.shortBy)} more would cover these, in the order to add them:
                </p>
                <ol className="mt-2 list-decimal space-y-1 pl-5 text-small text-fg-2">
                  {plan.dropped.slice(0, 6).map((t) => (
                    <li key={t.key}>
                      {t.title} <span className="text-fg-3">· {t.minutes} min</span>
                    </li>
                  ))}
                </ol>
                {plan.dropped.length > 6 && (
                  <p className="mt-1 text-caption text-fg-3">
                    and {plan.dropped.length - 6} more. Add time on the left to bring them in.
                  </p>
                )}
              </div>
            )}

            {/* days */}
            <ol className="space-y-3">
              {plan.days.map((d) => {
                const ids = d.tasks.map((t, k) => taskId(d, t, k))
                const n = ids.filter((id) => done.includes(id)).length
                const isToday = d.date === now
                const past = diffDays(d.date, now) > 0
                return (
                  <li key={d.date}>
                    <details
                      open={isToday || (todayIdx < 0 && d.index === 1) || plan.days.length <= 2}
                      className={`group rounded-xl border bg-surface open:shadow-e1 ${
                        isToday ? 'border-signal/50 ring-1 ring-signal/30' : 'border-border'
                      }`}
                    >
                      <summary className="flex min-h-14 cursor-pointer list-none items-center gap-3 px-4 py-3 md:px-5 [&::-webkit-details-marker]:hidden">
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-small font-semibold tabular-nums ${
                            n === ids.length && ids.length
                              ? 'bg-signal text-white'
                              : isToday
                                ? 'bg-signal-tint text-signal-ink'
                                : 'bg-muted text-fg-2'
                          }`}
                          aria-hidden="true"
                        >
                          {d.index}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-small font-semibold text-fg">
                            {fmtDay(d.date)}
                            {isToday && <span className="ml-2 text-signal-strong">Today</span>}
                            {past && n < ids.length && (
                              <span className="ml-2 font-normal text-fg-3">
                                catch up if you can
                              </span>
                            )}
                          </span>
                          <span className="block text-caption text-fg-3">
                            {d.tasks.length
                              ? `${PHASE_LABEL[d.phase]} · ${fmtMin(d.used)}`
                              : d.budget === 0
                                ? 'Rest day: no time set'
                                : 'Nothing planned: a free day'}
                          </span>
                        </span>
                        {ids.length > 0 && (
                          <span className="font-mono text-caption tabular-nums text-fg-3">
                            {n}/{ids.length}
                          </span>
                        )}
                        <span
                          aria-hidden="true"
                          className="text-fg-3 transition-transform duration-base group-open:rotate-180"
                        >
                          ▾
                        </span>
                      </summary>
                      {d.tasks.length > 0 && (
                        <ul className="divide-y divide-border border-t border-border px-4 md:px-5">
                          {d.tasks.map((t, k) => {
                            const id = taskId(d, t, k)
                            const on = done.includes(id)
                            return (
                              <li key={id}>
                                <Check on={on} onChange={() => toggle(id)}>
                                  <span className="flex items-baseline justify-between gap-3">
                                    <span
                                      className={`text-small font-medium ${on ? 'text-fg-3 line-through' : 'text-fg'}`}
                                    >
                                      {t.title}
                                    </span>
                                    <span className="shrink-0 font-mono text-caption tabular-nums text-fg-3">
                                      {t.minutes}m
                                    </span>
                                  </span>
                                  <span className="mt-0.5 block text-caption text-fg-2">
                                    {t.detail}
                                    {t.tooLong &&
                                      ' Longer than your time that day: split it across two sittings.'}
                                  </span>
                                </Check>
                                {t.href && (
                                  <Link
                                    href={t.href}
                                    className="mb-1 ml-8 inline-flex min-h-11 items-center text-caption font-semibold text-signal-strong hover:underline"
                                  >
                                    {t.hrefLabel} →
                                  </Link>
                                )}
                              </li>
                            )
                          })}
                        </ul>
                      )}
                    </details>
                  </li>
                )
              })}
            </ol>

            {/* interview day + after */}
            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  k: 'day',
                  title: `Interview day · ${fmtDay(inputs.interview)}`,
                  items: dayOfChecklist(inputs),
                },
                {
                  k: 'after',
                  title: `After · by ${fmtDay(addDays(inputs.interview, 2))}`,
                  items: afterChecklist(),
                },
              ].map((b) => (
                <div key={b.k} className="min-w-0 rounded-xl border border-border bg-surface p-4">
                  <div className={`${kicker} text-fg-3`}>{b.title}</div>
                  <ul className="mt-2 divide-y divide-border">
                    {b.items.map((c) => (
                      <li key={c}>
                        <Check
                          on={done.includes(`${b.k}|${c}`)}
                          onChange={() => toggle(`${b.k}|${c}`)}
                        >
                          <span className="text-small text-fg">{c}</span>
                        </Check>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
