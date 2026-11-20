/**
 * The practice loop in three steps, shown beside every mock-interview call to action:
 * pick a round, answer out loud, read the feedback and go again. A thin Signal-blue bar fills
 * under each step in turn (CSS only, one 9 s cycle); with reduced motion all three bars sit full.
 * Server component: no JavaScript.
 */
const STEPS = [
  {
    title: 'Pick a round',
    body: 'PM case, consulting case, AI engineer round or a speaking coach',
  },
  { title: 'Answer out loud', body: 'The interviewer follows up on what you actually said' },
  { title: 'Read the feedback, go again', body: 'What was strong, what was thin, then a retry' },
]

export default function MockLoopSteps({ className = '' }: { className?: string }) {
  return (
    <ol
      aria-label="How a practice round works"
      className={`grid gap-2 sm:grid-cols-3 ${className}`}
    >
      {STEPS.map((s, k) => (
        <li key={s.title} className="rounded-xl border border-border bg-surface px-4 pb-3 pt-3.5">
          <div className="flex items-baseline gap-2">
            <span
              aria-hidden="true"
              className="font-mono text-kicker tabular-nums text-signal-strong"
            >
              {String(k + 1).padStart(2, '0')}
            </span>
            <span className="text-small font-semibold text-fg">{s.title}</span>
          </div>
          <p className="mt-1 text-caption text-fg-2">{s.body}</p>
          <span
            aria-hidden="true"
            className="mt-3 block h-[3px] overflow-hidden rounded-full bg-muted"
          >
            <span className={`loop-fill loop-fill-${k + 1} block h-full rounded-full bg-signal`} />
          </span>
        </li>
      ))}
    </ol>
  )
}
