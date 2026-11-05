import type { ReactNode } from 'react'

/** TL;DR box for blog posts (Signal Paper callout, no left-edge bar). */
export default function KeyFacts({
  title = 'TL;DR',
  children,
}: {
  title?: string
  children: ReactNode
}) {
  return (
    <aside
      aria-label={title}
      className="my-8 rounded-xl bg-signal-tint px-5 py-4 ring-1 ring-inset ring-signal/15 md:px-6 [&_li]:my-1.5 [&_ul]:my-2"
    >
      <p className="not-prose font-mono text-kicker uppercase tracking-[0.08em] text-signal-strong">
        {title}
      </p>
      <div className="text-fg [&>*:last-child]:mb-0">{children}</div>
    </aside>
  )
}
