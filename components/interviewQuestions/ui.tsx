import Link from 'next/link'

// Shared pieces for the /interview-questions family (hub, behavioural guides, role pages).
// Server components only; Signal Paper tokens only.

export const container = 'mx-auto w-full max-w-[1100px] px-5 md:px-8'
export const kicker = 'font-mono text-kicker uppercase tracking-[0.08em]'
export const link =
  'font-medium text-signal-strong underline decoration-signal/30 underline-offset-2 hover:decoration-signal'
export const btnSecondary =
  'inline-flex h-12 items-center rounded-full bg-surface px-5 text-small font-semibold text-fg ring-1 ring-inset ring-border-strong transition-colors duration-fast hover:bg-muted'

export function Crumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-2 text-caption text-fg-3"
    >
      {items.map((it, i) => (
        <span key={it.label} className="flex min-w-0 items-center gap-2">
          {i > 0 && <span aria-hidden="true">/</span>}
          {it.href ? (
            <Link href={it.href} className="hover:text-fg">
              {it.label}
            </Link>
          ) : (
            <span className="truncate text-fg-2">{it.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}

export function SectionHead({
  id,
  k,
  title,
  sub,
}: {
  id?: string
  k: string
  title: string
  sub?: string
}) {
  return (
    <header className="max-w-2xl">
      <div className={`${kicker} text-signal-strong`}>{k}</div>
      <h2 id={id} className="mt-3 text-h2 font-semibold text-fg">
        {title}
      </h2>
      {sub && <p className="mt-2 text-body text-fg-2">{sub}</p>}
    </header>
  )
}

export function Faq({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <div className="space-y-3">
      {faqs.map((f, i) => (
        <details
          key={f.q}
          open={i === 0}
          className="group rounded-xl border border-border bg-surface open:shadow-e1"
        >
          <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-medium text-fg [&::-webkit-details-marker]:hidden">
            <h3 className="text-body font-medium">{f.q}</h3>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5 shrink-0 text-fg-3 transition-transform duration-base group-open:rotate-180"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
            >
              <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </summary>
          <p className="max-w-prose px-5 pb-5 text-body leading-relaxed text-fg-2">{f.a}</p>
        </details>
      ))}
    </div>
  )
}

/** The free no-AI tool that fits a behavioural question best. */
export function toolFor(slug: string): { href: string; title: string; body: string } {
  if (slug === 'tell-me-about-yourself')
    return {
      href: '/tell-me-about-yourself',
      title: 'Build your answer with a timer',
      body: 'Write it in three parts (now, before, why this job), see how long it runs out loud, and get 8 plain checks: life story, resume recital, a number, ending on this job.',
    }
  if (slug === 'what-are-your-salary-expectations')
    return {
      href: '/salary-negotiation',
      title: 'Build your salary script',
      body: 'Turn an offer into a counter email, a call script and replies to "max budget" or "send payslips". India (CTC, LPA) and US.',
    }
  return {
    href: '/star-method',
    title: 'Build your STAR answer',
    body: 'Write your story in Situation, Task, Action, Result boxes and see how long it runs out loud, the time split, and 8 checks such as "I" vs "we" and a number in the result.',
  }
}
