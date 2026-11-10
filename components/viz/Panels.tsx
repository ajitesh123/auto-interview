import type { CSSProperties, ReactNode } from 'react'
import VizReveal from './VizReveal'

/* ---------- StatRow: a handful of headline numbers, each with its source ---------- */

export interface Stat {
  label: string // sentence case, no colon
  value: string // already formatted, e.g. "₹27.5 LPA" or "3 of 19"
  sub?: string // what the number is, or its source and date
  href?: string // source link
}

export function StatRow({ stats }: { stats: Stat[] }) {
  const cols =
    stats.length >= 4 ? 'lg:grid-cols-4' : stats.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'
  return (
    <dl data-viz="in" className={`not-prose my-8 grid grid-cols-2 gap-3 ${cols}`}>
      {stats.map((s, i) => (
        <div key={s.label} className="rounded-xl border border-border bg-surface p-4 md:p-5">
          <dt className="text-small text-fg-2">{s.label}</dt>
          <dd
            data-viz-fade
            style={{ '--i': i } as CSSProperties}
            className="mt-1 text-h3 font-semibold text-fg md:text-h2"
          >
            {s.value}
          </dd>
          {s.sub && (
            <dd className="mt-1 text-caption text-fg-3">
              {s.href ? (
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener"
                  className="underline decoration-border-strong underline-offset-2 hover:text-fg"
                >
                  {s.sub}
                </a>
              ) : (
                s.sub
              )}
            </dd>
          )}
        </div>
      ))}
      <VizReveal />
    </dl>
  )
}

/* ---------- PullQuote: someone's words, attributed and linked ---------- */

export function PullQuote({
  children,
  name,
  jobTitle,
  href,
  source,
}: {
  children: ReactNode
  name: string
  jobTitle?: string // their role, e.g. "Head of Sales, Acme"
  href?: string // where they said it
  source?: string // e.g. "YC Startup School, 2019"
}) {
  return (
    <figure className="not-prose my-8 rounded-2xl border border-border bg-surface p-6 md:p-8">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-6 w-6 text-signal"
        fill="currentColor"
      >
        <path d="M4 17.5c0-4.6 2.3-8.6 6.4-11l1.1 1.7C9.2 9.9 7.9 11.8 7.6 14H11v6H4v-2.5Zm9.5 0c0-4.6 2.3-8.6 6.4-11L21 8.2c-2.3 1.7-3.6 3.6-3.9 5.8h3.4v6h-7v-2.5Z" />
      </svg>
      <blockquote className="mt-4 font-serif text-h3 font-medium leading-snug text-fg md:text-h2">
        {children}
      </blockquote>
      <figcaption className="mt-5 text-small text-fg-2">
        <span className="font-semibold text-fg">{name}</span>
        {jobTitle && <span>, {jobTitle}</span>}
        {source && (
          <span className="mt-0.5 block text-caption text-fg-3">
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener"
                className="underline decoration-border-strong underline-offset-2 hover:text-fg"
              >
                {source}
              </a>
            ) : (
              source
            )}
          </span>
        )}
      </figcaption>
    </figure>
  )
}

/* ---------- Flow: a process as numbered boxes, left to right (top to bottom on phones) ---------- */

export interface FlowStep {
  title: string
  body?: string
}

export function Flow({ steps, label }: { steps: FlowStep[]; label?: string }) {
  return (
    <figure data-viz="in" className="not-prose my-8">
      {label && (
        <div className="mb-3 font-mono text-kicker uppercase tracking-[0.08em] text-signal-strong">
          {label}
        </div>
      )}
      <ol className="grid gap-3 md:auto-cols-fr md:grid-flow-col md:gap-0">
        {steps.map((s, i) => (
          <li
            key={s.title}
            data-viz-fade
            style={{ '--i': i * 2 } as CSSProperties}
            className="relative flex gap-3 md:block md:pr-6"
          >
            <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-small font-semibold tabular-nums text-ink-fg">
              {i + 1}
            </div>
            {i < steps.length - 1 && (
              <>
                {/* connector: vertical on phones, horizontal from md */}
                <span
                  aria-hidden="true"
                  className="absolute bottom-[-12px] left-4 top-8 w-px bg-border-strong md:hidden"
                />
                <span
                  aria-hidden="true"
                  className="absolute left-8 right-0 top-4 hidden h-px bg-border-strong md:block"
                />
              </>
            )}
            <div className="min-w-0 pb-1 md:mt-3">
              <div className="text-small font-semibold text-fg">{s.title}</div>
              {s.body && <p className="mt-1 text-small text-fg-2">{s.body}</p>}
            </div>
          </li>
        ))}
      </ol>
      <VizReveal />
    </figure>
  )
}

/* ---------- Insight: the one thing to take from a chart or section ---------- */

export function Insight({
  title = 'What this means',
  children,
}: {
  title?: string
  children: ReactNode
}) {
  return (
    <aside className="not-prose my-6 flex gap-3 rounded-xl bg-signal-tint p-4 text-small ring-1 ring-inset ring-signal/15 md:p-5">
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className="mt-0.5 h-5 w-5 shrink-0 text-signal-strong"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      >
        <path
          d="M10 2.5a5.5 5.5 0 0 0-3.2 10v1.7h6.4v-1.7a5.5 5.5 0 0 0-3.2-10ZM7.8 17h4.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div>
        <div className="font-semibold text-fg">{title}</div>
        <div className="mt-1 text-fg-2 [&>p+p]:mt-2">{children}</div>
      </div>
    </aside>
  )
}
