import type { Metadata } from 'next'
import Link from 'next/link'
import DomainLayout from '@/components/domain/DomainLayout'
import MockInterviewButton from '@/components/ai/MockInterviewButton'

export const metadata: Metadata = {
  title: 'Page not found | Auto Interview AI',
  robots: { index: false },
}

const PLACES = [
  {
    title: 'Role guides',
    body: 'Questions with model answers, the loop, pay and a CV for 10 roles.',
    links: [
      { href: '/product-manager', label: 'Product Manager' },
      { href: '/aipm', label: 'AI Product Manager' },
      { href: '/data-analyst', label: 'Data Analyst' },
      { href: '/founders-office', label: "Founder's Office" },
    ],
  },
  {
    title: 'Free tools',
    body: 'They run in your browser. No sign-up, nothing sent anywhere.',
    links: [
      { href: '/resume-keyword-checker', label: 'Resume keyword checker' },
      { href: '/star-method', label: 'STAR answer builder' },
      { href: '/salary-negotiation', label: 'Salary negotiation scripts' },
      { href: '/salary-calculator', label: 'CTC to in-hand calculator' },
    ],
  },
  {
    title: 'Learn',
    body: 'Free courses you can finish a lesson at a time.',
    links: [
      { href: '/learn-ai', label: 'Learn AI (43 lessons)' },
      { href: '/paul-graham', label: 'Paul Graham startup course' },
      { href: '/cv-templates', label: 'CV templates in Word' },
      { href: '/blog', label: 'Blog' },
    ],
  },
]

export default function NotFound() {
  return (
    <DomainLayout>
      <div className="mx-auto w-full max-w-[1200px] px-5 py-14 md:px-8 md:py-20">
        <p className="font-mono text-kicker uppercase tracking-[0.08em] text-signal-strong">
          Error 404 · page not found
        </p>
        <h1 className="mt-3 max-w-[20ch] font-serif text-h1 font-medium text-fg">
          This page moved or never existed.
        </h1>
        <p className="mt-4 max-w-[56ch] text-body-lg text-fg-2">
          The link may be old. Everything below is free and live, so pick the closest match.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <MockInterviewButton caption={false} />
          <Link
            href="/"
            className="inline-flex h-12 items-center rounded-full bg-surface px-5 text-small font-semibold text-fg ring-1 ring-inset ring-border-strong transition-colors duration-fast hover:bg-muted"
          >
            Back to the homepage
          </Link>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3 md:gap-6">
          {PLACES.map((p) => (
            <section
              key={p.title}
              className="rounded-xl border border-border bg-surface p-5 md:p-6"
            >
              <h2 className="text-h4 font-semibold text-fg">{p.title}</h2>
              <p className="mt-1 text-small text-fg-2">{p.body}</p>
              <ul className="mt-4 space-y-1">
                {p.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="inline-flex min-h-11 items-center text-small font-medium text-signal-strong hover:underline"
                    >
                      {l.label} →
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </DomainLayout>
  )
}
