'use client'

import { useState } from 'react'
import { CHECKERS, CHECKED, usd, type Checker } from '@/data/atsCheckers'

const triText = (t: string) =>
  t === 'yes' ? 'Yes' : t === 'no' ? 'No' : t === 'partial' ? 'Partly' : 'Not stated'

/**
 * Filter for /blog/best-ats-resume-checker-2025. Every checker renders on the server, so the list
 * works without JavaScript; the boxes only hide cards. Not a ranking.
 */
export default function AtsCheckerFinder() {
  const [free, setFree] = useState(false)
  const [noSignup, setNoSignup] = useState(false)
  const [jobPost, setJobPost] = useState(false)
  const [rewrite, setRewrite] = useState(false)
  const [linkedin, setLinkedin] = useState(false)

  const shown = CHECKERS.filter(
    (c: Checker) =>
      (!free || c.freeRepeat) &&
      (!noSignup || c.noSignup === 'yes') &&
      (!jobPost || c.jobPost === 'yes') &&
      (!rewrite || c.rewrite === 'yes') &&
      (!linkedin || c.linkedin === 'yes')
  )

  const boxes: [string, boolean, (b: boolean) => void][] = [
    ['Free check I can repeat', free, setFree],
    ['No account or email', noSignup, setNoSignup],
    ['Compares with the job post', jobPost, setJobPost],
    ['Rewrites my lines', rewrite, setRewrite],
    ['Reviews LinkedIn too', linkedin, setLinkedin],
  ]

  return (
    <section
      aria-label="ATS resume checkers, filterable"
      className="not-prose my-8 rounded-2xl border border-border bg-surface p-4 md:p-6"
    >
      <fieldset className="min-w-0">
        <legend className="text-small font-medium text-fg">I need a checker that…</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {boxes.map(([label, on, set]) => (
            <label
              key={label}
              className={`flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 text-small transition-colors duration-fast ${
                on
                  ? 'border-signal bg-signal-tint text-fg'
                  : 'border-border bg-surface text-fg-2 hover:border-border-strong'
              }`}
            >
              <input
                type="checkbox"
                className="accent-signal"
                checked={on}
                onChange={(e) => set(e.target.checked)}
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>
      <p className="mt-4 text-small text-fg-2" aria-live="polite">
        Showing {shown.length} of {CHECKERS.length} checkers. Tap one for details.
        {shown.length === 0 &&
          ' None of them states all of these on its own pages; untick one box.'}
      </p>
      <ul className="mt-3 divide-y divide-border border-y border-border">
        {shown.map((c) => (
          <li key={c.id} className="text-small">
            <details className="group py-3">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-3 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-signal [&::-webkit-details-marker]:hidden">
                <span className="min-w-0">
                  <span className="block text-body font-semibold text-fg">{c.name}</span>
                  <span className="mt-0.5 block text-fg-2">{c.free}</span>
                  <span className="mt-1 block font-mono text-caption uppercase tracking-[0.06em] text-signal-strong">
                    {c.ours
                      ? 'Our product · free'
                      : c.threeMonths !== null
                        ? `3 months: ${c.id === 'teal' ? 'about ' + usd(Math.round(c.threeMonths)) : usd(c.threeMonths)}`
                        : c.threeMonthsBasis}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-fg-3 transition-transform duration-fast group-open:rotate-180 motion-reduce:transition-none"
                >
                  ▾
                </span>
              </summary>
              <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-1 sm:grid-cols-[9rem_1fr]">
                <dt className="text-fg-3">To see a result</dt>
                <dd className="text-fg">{c.needs}</dd>
                <dt className="text-fg-3">What you get</dt>
                <dd className="text-fg">{c.score}</dd>
                <dt className="text-fg-3">Job post · rewrites · LinkedIn</dt>
                <dd className="text-fg">
                  {triText(c.jobPost)} · {triText(c.rewrite)} · {triText(c.linkedin)}
                </dd>
                <dt className="text-fg-3">Paid</dt>
                <dd className="text-fg">{c.paid}</dd>
                {c.watch && (
                  <>
                    <dt className="text-fg-3">Watch for</dt>
                    <dd className="text-fg">{c.watch}</dd>
                  </>
                )}
              </dl>
              <a
                href={c.url}
                target={c.ours ? undefined : '_blank'}
                rel={c.ours ? undefined : 'noopener'}
                className="mt-3 inline-block font-medium text-signal-strong underline underline-offset-2"
              >
                {c.ours ? 'Open the checker' : `Open ${c.name}'s page`}
              </a>
            </details>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-caption text-fg-3">
        Every fact was read on the vendor&apos;s own pages on {CHECKED}; each name links to the page
        we opened. &quot;Not stated&quot; means we did not find it there. Not a ranking. Tough
        Tongue AI runs this site.
      </p>
    </section>
  )
}
