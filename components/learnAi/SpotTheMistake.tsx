'use client'

import { useState } from 'react'
import { CSV_PATH, MONTH_NAME, ROUNDS, ROWS } from '@/data/learnAi/dataAnalysisPractice'

// "Spot the AI's mistake": four AI-style claims about one small fictional dataset, each with a
// classic analysis error. Every number comes from data/learnAi/dataAnalysisPractice.ts.
// No AI, no network. Explanations are in the HTML (hidden until you answer).

const fmt = (n: number) => n.toLocaleString('en-IN')

export default function SpotTheMistake() {
  const [picked, setPicked] = useState<Record<string, number>>({})
  const answered = Object.keys(picked).length
  const right = ROUNDS.filter((r) => picked[r.id] === r.answer).length

  return (
    <div className="space-y-6">
      <figure>
        <div
          role="region"
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
          aria-label="Kettle Lane Cafés: orders and revenue by month and city (fictional)"
          className="overflow-x-auto rounded-xl border border-border bg-surface"
        >
          <table className="w-full min-w-[320px] text-left text-small tabular-nums">
            <thead className="bg-muted text-fg-2">
              <tr>
                <th scope="col" className="px-3 py-2.5 font-medium">
                  Month
                </th>
                <th scope="col" className="px-3 py-2.5 font-medium">
                  City
                </th>
                <th scope="col" className="px-3 py-2.5 text-right font-medium">
                  Orders
                </th>
                <th scope="col" className="px-3 py-2.5 text-right font-medium">
                  Revenue (₹)
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.month + r.city} className="border-t border-border">
                  <td className="px-3 py-2 text-fg-2">{MONTH_NAME[r.month].slice(0, 3)}</td>
                  <th scope="row" className="px-3 py-2 font-medium text-fg">
                    {r.city}
                  </th>
                  <td className="px-3 py-2 text-right text-fg">{fmt(r.orders)}</td>
                  <td className="px-3 py-2 text-right text-fg">
                    {r.revenue === null ? (
                      <span className="rounded bg-warn-soft px-1.5 py-0.5 text-caption font-medium text-warn">
                        blank
                      </span>
                    ) : (
                      fmt(r.revenue)
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <figcaption className="mt-2 flex flex-wrap items-center justify-between gap-2 text-caption text-fg-3">
          <span>Kettle Lane Cafés is made up. 12 rows, 1 blank cell, on purpose.</span>
          <a
            href={CSV_PATH}
            download
            className="font-medium text-signal-strong underline decoration-signal/30 underline-offset-4 hover:decoration-signal-strong"
          >
            Download the CSV
          </a>
        </figcaption>
      </figure>

      <ol className="space-y-4">
        {ROUNDS.map((r, i) => {
          const p = picked[r.id]
          const done = p !== undefined
          const ok = p === r.answer
          return (
            <li key={r.id} className="rounded-xl border border-border bg-surface p-5 md:p-6">
              <div className="font-mono text-kicker uppercase tracking-[0.08em] text-fg-3">
                Claim {i + 1} of {ROUNDS.length} · the AI said
              </div>
              <p className="mt-2 text-body-lg font-medium leading-snug text-fg">“{r.claim}”</p>
              <p className="mt-3 text-small text-fg-2">{r.question}</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {r.options.map((o, j) => {
                  const chosen = p === j
                  const isAnswer = j === r.answer
                  let cls = 'bg-surface text-fg ring-border-strong hover:bg-muted'
                  if (done && isAnswer) cls = 'bg-success-soft text-fg ring-success/40'
                  else if (done && chosen) cls = 'bg-danger-soft text-fg ring-danger/40'
                  else if (done) cls = 'bg-surface text-fg-3 ring-border'
                  return (
                    <button
                      key={o}
                      type="button"
                      disabled={done}
                      aria-pressed={chosen}
                      onClick={() => setPicked((s) => ({ ...s, [r.id]: j }))}
                      className={`min-h-11 rounded-lg px-3 py-2 text-left text-small ring-1 ring-inset transition-colors duration-fast ${cls}`}
                    >
                      {done && isAnswer ? '✓ ' : done && chosen ? '✗ ' : ''}
                      {o}
                    </button>
                  )
                })}
              </div>
              <div hidden={!done} className="mt-4 space-y-2" aria-live="polite">
                <p className="text-small font-semibold text-fg">
                  {ok ? 'Caught it.' : 'Not quite.'} Here is what happened:
                </p>
                <ul className="list-disc space-y-1 pl-5 text-small text-fg-2">
                  {r.explain.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
                <p className="rounded-lg bg-signal-tint px-3 py-2 text-small text-fg ring-1 ring-inset ring-signal/15">
                  <span className="font-semibold">The habit: </span>
                  {r.check}
                </p>
              </div>
            </li>
          )
        })}
      </ol>

      {answered === ROUNDS.length && (
        <div
          className="rounded-xl border border-border bg-muted p-5 text-small text-fg"
          aria-live="polite"
        >
          <p className="font-semibold">
            You caught {right} of {ROUNDS.length}.
          </p>
          <p className="mt-1 text-fg-2">
            Now try it for real: upload the CSV to ChatGPT, Claude or Gemini, ask the same four
            questions, and see whether its answers match the right ones above.
          </p>
        </div>
      )}
    </div>
  )
}
