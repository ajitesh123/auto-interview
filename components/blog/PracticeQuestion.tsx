import type { ReactNode } from 'react'

/**
 * Attempt-before-reveal question card for blog posts (Signal Paper).
 * Server component: the model answer lives in a native <details>, so it is in
 * the HTML for search engines and needs no JavaScript.
 */
interface PracticeQuestionProps {
  q: string
  type: string
  /** e.g. "APM, Bengaluru · Glassdoor, Oct 2025" */
  source?: string
  sourceUrl?: string
  /** What the interviewer is listening for: 3–4 short items. */
  criteria?: string[]
  /** Optional nudge shown before the reveal. */
  tryFirst?: string
  children: ReactNode
}

export default function PracticeQuestion({
  q,
  type,
  source,
  sourceUrl,
  criteria = [],
  tryFirst = 'Say your answer out loud in 2 minutes before you open the model answer.',
  children,
}: PracticeQuestionProps) {
  return (
    <section className="my-8 rounded-xl border border-border bg-surface">
      <div className="not-prose px-5 pt-5 md:px-6 md:pt-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex h-6 items-center rounded-full bg-signal-tint px-2.5 text-caption font-medium text-signal-strong">
            {type}
          </span>
          {source &&
            (sourceUrl ? (
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-6 items-center rounded-full bg-muted px-2.5 text-caption font-medium text-fg-2 underline-offset-2 hover:text-fg hover:underline"
              >
                {source}
              </a>
            ) : (
              <span className="inline-flex h-6 items-center rounded-full bg-muted px-2.5 text-caption font-medium text-fg-2">
                {source}
              </span>
            ))}
        </div>
        <p className="mt-3 text-h3 font-semibold text-fg">&ldquo;{q}&rdquo;</p>
        <p className="mt-2 text-small text-fg-2">{tryFirst}</p>
        {criteria.length > 0 && (
          <div className="mt-4">
            <p className="font-mono text-kicker uppercase tracking-[0.08em] text-fg-3">
              What the interviewer is listening for
            </p>
            <ul className="mt-2 space-y-1.5">
              {criteria.map((c) => (
                <li key={c} className="flex gap-2 text-small text-fg">
                  <span aria-hidden="true" className="mt-[3px] text-signal-strong">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.75}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <details className="group mt-4 border-t border-border">
        <summary className="not-prose flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-5 py-3 text-small font-semibold text-signal-strong md:px-6 [&::-webkit-details-marker]:hidden">
          <span>Show a strong answer</span>
          <span
            aria-hidden="true"
            className="font-mono text-fg-3 transition-transform duration-base group-open:rotate-45"
          >
            +
          </span>
        </summary>
        <div className="px-5 pb-5 md:px-6 [&>*:first-child]:mt-0">{children}</div>
      </details>
    </section>
  )
}
