'use client'

import { useEffect, useMemo, useState } from 'react'
import { CHECKED, CONTROLS, MAIN_DUTIES_DATE, PENALTY_BY_ID, type Control } from '@/data/dpdpLdData'

function daysUntil(iso: string) {
  const target = new Date(`${iso}T00:00:00+05:30`).getTime()
  return Math.ceil((target - Date.now()) / 86_400_000)
}

export default function DpdpLdChecker() {
  const [done, setDone] = useState<string[]>([])
  const [days, setDays] = useState<number | null>(null)

  useEffect(() => setDays(daysUntil(MAIN_DUTIES_DATE)), [])

  const gaps = useMemo(
    () =>
      CONTROLS.filter((c) => !done.includes(c.id)).sort(
        (a, b) => PENALTY_BY_ID[b.penalty] - PENALTY_BY_ID[a.penalty]
      ),
    [done]
  )

  const toggle = (id: string) =>
    setDone((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]))

  const byOwner = useMemo(() => {
    const m = new Map<Control['owner'], Control[]>()
    for (const g of gaps) m.set(g.owner, [...(m.get(g.owner) ?? []), g])
    return [...m.entries()]
  }, [gaps])

  return (
    <div className="not-prose my-8 rounded-2xl border border-border bg-surface p-5 md:p-6">
      <p className="font-mono text-kicker uppercase tracking-[0.08em] text-fg-3">
        DPDP readiness check for L&amp;D · {CONTROLS.length} controls · law checked {CHECKED}
      </p>
      <fieldset className="mt-4">
        <legend className="text-small font-medium text-fg">Tick what your team already has</legend>
        <div className="mt-2 grid gap-2">
          {CONTROLS.map((c) => (
            <label
              key={c.id}
              className="flex min-h-11 cursor-pointer items-start gap-3 rounded-lg border border-border px-3 py-2.5 text-small text-fg hover:border-border-strong"
            >
              <input
                type="checkbox"
                checked={done.includes(c.id)}
                onChange={() => toggle(c.id)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-accent"
              />
              <span>
                {c.label}
                <span className="block text-caption text-fg-3">{c.law}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6 border-t border-border pt-5" aria-live="polite">
        <p className="text-body font-medium text-fg">
          {done.length} of {CONTROLS.length} in place
          {days !== null && days > 0 && (
            <span className="font-normal text-fg-2">
              {' '}
              · {days} days until the main duties apply (13 May 2027)
            </span>
          )}
        </p>
        {gaps.length === 0 ? (
          <p className="mt-2 text-small text-fg-2">
            Every control is ticked. Keep the evidence (policies, contracts, logs, drill notes) in
            one folder so you can show it if the Data Protection Board asks.
          </p>
        ) : (
          <>
            <p className="mt-2 text-small text-fg-2">
              Your to-do list, highest maximum penalty first, grouped by the team that usually owns
              it:
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {byOwner.map(([owner, list]) => (
                <div key={owner} className="rounded-lg bg-muted p-3">
                  <p className="text-small font-medium text-fg">{owner}</p>
                  <ul className="mt-1.5 space-y-1.5 text-small text-fg-2">
                    {list.map((g) => (
                      <li key={g.id}>
                        {g.label}{' '}
                        <span className="whitespace-nowrap text-caption text-fg-3">
                          (up to ₹{PENALTY_BY_ID[g.penalty]} cr)
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <p className="mt-4 text-caption text-fg-3">
        Penalty figures are the maximums in the Schedule to the DPDP Act, 2023. General information,
        not legal advice. Runs in your browser; nothing is sent anywhere.
      </p>
    </div>
  )
}
