import React from 'react'
import Link from 'next/link'

// Shown inside every blog post (PostLayout). Signal Paper: tokens only, light cards, one accent.
// Nov 19 2026: rebuilt from a raw-hex version with a dark card and unsourced labels ('Proven
// Scripts', '100% free... calculation engines'); now lists the job tools people use most.
const TOOLS = [
  {
    kicker: 'Free to start · Tough Tongue AI',
    title: 'Free AI mock interview',
    desc: 'Answer role questions out loud to a voice interviewer that asks follow-ups.',
    href: '/free-mock-interview',
    cta: 'Start a mock interview',
  },
  {
    kicker: 'Free · In browser',
    title: 'Resume keyword checker',
    desc: 'Paste a job post and your resume (CV) to see which of its terms you are missing.',
    href: '/resume-keyword-checker',
    cta: 'Check my resume',
  },
  {
    kicker: 'Free · In browser',
    title: 'STAR answer builder',
    desc: 'Write a behavioural answer in four parts and see how long it runs out loud.',
    href: '/star-method',
    cta: 'Build an answer',
  },
  {
    kicker: 'Free · In browser',
    title: 'Referral message builder',
    desc: 'A LinkedIn note under 200 characters, an email and a follow-up from your details.',
    href: '/referral-message',
    cta: 'Write my message',
  },
  {
    kicker: 'Free · India tax rules',
    title: 'CTC to in-hand calculator',
    desc: 'Turn a CTC offer into monthly take-home pay under the old or new tax regime.',
    href: '/salary-calculator',
    cta: 'Work out my in-hand',
  },
  {
    kicker: 'Free · Word download',
    title: 'One-page CV templates',
    desc: 'Single-column Word templates by role, in the Indian one-page format.',
    href: '/cv-templates',
    cta: 'Browse templates',
  },
]

export default function InteractiveToolsBanner() {
  return (
    <section
      aria-labelledby="free-tools-heading"
      className="not-prose my-16 rounded-2xl border border-border bg-bg p-5 md:p-8"
    >
      <p className="font-mono text-kicker uppercase tracking-[0.08em] text-signal-strong">
        Free tools · {TOOLS.length} · No paywall
      </p>
      <h2 id="free-tools-heading" className="mt-2 text-h3 font-semibold text-fg">
        Free tools for your next interview
      </h2>
      <p className="mt-1 max-w-[56ch] text-small text-fg-2">
        Each one does one job and works on this site, except the mock interview, which runs on Tough
        Tongue AI.
      </p>

      <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {TOOLS.map((t) => (
          <li key={t.href}>
            <Link
              href={t.href}
              className="group flex h-full flex-col justify-between rounded-xl border border-border bg-surface p-5 transition-[border-color,box-shadow] duration-fast hover:border-border-strong hover:shadow-e2"
            >
              <div>
                <span className="block font-mono text-kicker uppercase leading-snug tracking-[0.06em] text-fg-3">
                  {t.kicker}
                </span>
                <h3 className="mt-2 text-h4 font-semibold text-fg">{t.title}</h3>
                <p className="mt-1 text-small text-fg-2">{t.desc}</p>
              </div>
              <span className="mt-4 text-small font-semibold text-signal-strong">
                {t.cta} <span aria-hidden="true">&rarr;</span>
              </span>
            </Link>
          </li>
        ))}

        <li className="sm:col-span-2">
          <div className="flex h-full flex-col justify-between gap-4 rounded-xl border border-border bg-signal-tint p-5 sm:flex-row sm:items-end">
            <div>
              <span className="block font-mono text-kicker uppercase leading-snug tracking-[0.06em] text-signal-ink">
                For sales and hiring teams · Our product
              </span>
              <h3 className="mt-2 text-h4 font-semibold text-fg">Tough Tongue AI for teams</h3>
              <p className="mt-1 max-w-[52ch] text-small text-fg-2">
                AI voice agents for calls and meetings, and sales roleplay your team can practise
                on, with your own scenarios.
              </p>
            </div>
            <a
              href="https://cal.com/ajitesh/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-surface px-5 text-small font-semibold text-fg ring-1 ring-inset ring-border-strong transition-colors hover:bg-muted"
            >
              Book a 30-min demo &rarr;
            </a>
          </div>
        </li>
      </ul>
    </section>
  )
}
