import Link from 'next/link'
import DomainLayout from '@/components/domain/DomainLayout'
import { RevealRoot } from '@/components/roleHub/JourneyClient'
import { ArrowRightIcon, ArrowUpRightIcon } from '@/components/roleHub/icons'
import {
  BATCH_BASE,
  BATCH_TOTAL_WEEKS,
  BATCH_WEEKS,
  PHASES,
  allFrameworks,
  assignmentIds,
  weeksByPhase,
} from '@/data/pgCourse/batch'
import { ChallengePanel, ChallengeStatus, GrowthTracker, WeekTicks } from './BatchClient'
import MockInterviewCTA from '@/components/ai/MockInterviewCTA'

// The 12-week YC challenge (/paul-graham/yc-batch). Signal Paper.
// Order: hero + "do you want to start the challenge?" panel → the rhythm of a YC week →
// 12-week challenge board → growth tracker →
// frameworks index → FAQ → closing band. Unofficial; every "at YC" claim is labelled.

const SITE = 'https://www.autointerviewai.com'
const container = 'mx-auto w-full max-w-[1200px] px-5 md:px-8'
const kicker = 'font-mono text-kicker uppercase tracking-[0.08em]'

export const BATCH_DISCLAIMER =
  'YC does not publish a day-by-day calendar. We rebuilt the structure from YC’s pages, partner talks and founders’ accounts; every claim is labelled documented or reported. Unofficial, not affiliated with Y Combinator.'

/** What repeats every week inside a batch, and how this program copies it. */
const RHYTHM: {
  when: string
  what: string
  detail: string
  status: 'Documented by YC' | 'Paul Graham’s advice' | 'This program’s routine'
  source?: { label: string; url: string }
}[] = [
  {
    when: 'Monday',
    what: 'Your number and a weekly update',
    detail:
      'Write down the one number you are growing and send a short update: number, what you did, what you learned, your ask. The week page builds it for you.',
    status: 'This program’s routine',
  },
  {
    when: 'Every week',
    what: 'Fixes at a resolution of a week',
    detail:
      'Graham describes founders trying fixes “at a resolution of a week or less” and reporting results at office hours, so a wrong guess shows up fast.',
    status: 'Paul Graham’s advice',
    source: {
      label: 'What I’ve Learned from Users (2022)',
      url: 'https://paulgraham.com/users.html',
    },
  },
  {
    when: 'Every two weeks',
    what: 'Group office hours',
    detail:
      'Partners meet companies from your group in sections of 6–10. One-on-one office hours are available “as often as founders want”. Here you answer the partner’s questions on each week page.',
    status: 'Documented by YC',
    source: { label: 'ycombinator.com/about', url: 'https://www.ycombinator.com/about' },
  },
  {
    when: 'Every week',
    what: 'A talk from someone who has done it',
    detail:
      'YC invites a well-known founder or investor to speak each week, off the record. Each week page here has the YC talk for that week’s topic.',
    status: 'Documented by YC',
    source: { label: 'ycombinator.com/about', url: 'https://www.ycombinator.com/about' },
  },
  {
    when: 'The rest of the week',
    what: 'Build and talk to users',
    detail:
      'YC’s FAQ says following every recommended activity takes “a few hours per week”. The rest is building the product and talking to users.',
    status: 'Documented by YC',
    source: { label: 'ycombinator.com/faq', url: 'https://www.ycombinator.com/faq' },
  },
]

const firstSentence = (t: string) => {
  const m = t.match(/^.+?[.?!](?=\s|$)/)
  return (m ? m[0] : t).trim()
}

export const BATCH_HUB_FAQS = [
  {
    q: 'What is the 12-week YC challenge?',
    a: 'A free, self-run version of a Y Combinator batch. Each of the 12 weeks explains what happens inside YC around that point, teaches the framework YC partners use then, and sets one hard, specific challenge (for example, ten conversations with potential users, or a launch). You send yourself a weekly update with your one number, answer the questions a partner would ask at office hours, and finish with your own Demo Day pitch. You choose the start date; your progress is saved on your device, with no login.',
  },
  {
    q: 'Is this the real YC curriculum?',
    a: 'No. YC does not publish a week-by-week curriculum. We rebuilt the structure from what YC itself documents (a kickoff, group partners, group office hours every two weeks, weekly talks, Demo Day), from YC partners’ public talks and from founders’ own accounts of their batch. Each week labels what is documented by YC and what is reported by founders, with sources. This page is unofficial and not affiliated with Y Combinator.',
  },
  {
    q: 'What happens in a YC batch?',
    a: 'According to YC’s “What Happens at YC” page, the batch opens with an in-person kickoff, startups are split into groups led by partners and into sections of 6–10 companies, partners hold group office hours every two weeks and one-on-one office hours as often as founders want, a guest speaks every week off the record, and the program ends with Demo Day in front of investors. Most of the week is left for building and talking to users.',
  },
  {
    q: 'How long is YC?',
    a: 'About three months. Since 2025 YC runs four batches a year (Winter, Spring, Summer and Fall), each ending in Demo Day. This program follows the same length: 12 weeks, from picking your one number to presenting.',
  },
  {
    q: 'Do I need a co-founder to do this program?',
    a: 'No, you can run it alone. But Paul Graham lists having a single founder as the first of “The 18 Mistakes That Kill Startups” (2006), so the program includes looking for a cofounder. The cofounders lesson in the Paul Graham course covers how to find and test one.',
  },
  {
    q: 'What is group office hours?',
    a: 'At YC, it is a session every two weeks where partners meet a small set of companies from your group together (YC groups companies in sections of 6–10). Here, each week page lists the questions a partner would ask at that stage, with space to write your answer and a note on why they ask it. You can run it with friends doing the program by sharing your answers every two weeks.',
  },
]

export default function BatchHub() {
  const url = `${SITE}${BATCH_BASE}`
  const frameworks = allFrameworks()
  const ohCount = BATCH_WEEKS.reduce((n, w) => n + w.officeHours.length, 0)
  const assignments = BATCH_WEEKS.reduce((n, w) => n + w.assignments.length, 0)
  const first = BATCH_WEEKS[0]

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Paul Graham course',
          item: `${SITE}/paul-graham`,
        },
        { '@type': 'ListItem', position: 3, name: 'The 12-week YC challenge', item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'The 12-week YC challenge',
      description:
        'What happens inside Y Combinator’s three-month batch, week by week, and a free 12-week challenge to run it yourself: one challenge a week, weekly updates, the frameworks YC partners teach, office-hours questions and Demo Day prep. Unofficial.',
      url,
      inLanguage: 'en',
      isAccessibleForFree: true,
      provider: { '@type': 'Organization', name: 'Auto Interview AI', sameAs: SITE },
      offers: { '@type': 'Offer', category: 'Free', price: 0, priceCurrency: 'USD' },
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'Online',
        courseWorkload: 'P12W',
      },
      teaches: frameworks.map(({ f }) => f.name),
      syllabusSections: BATCH_WEEKS.map((w) => ({
        '@type': 'Syllabus',
        name: `Week ${w.week}: ${w.title}`,
        url: `${url}/${w.slug}`,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: BATCH_HUB_FAQS.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ]

  return (
    <DomainLayout currentPath="/paul-graham">
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
      <RevealRoot />

      <div className="bg-bg text-fg">
        {/* ---------- Hero + start panel ---------- */}
        <div className={`${container} pb-12 pt-8 md:pb-20 md:pt-14`}>
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-caption text-fg-3"
          >
            <Link href="/" className="hover:text-fg">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/paul-graham" className="hover:text-fg">
              Paul Graham course
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-fg-2">The 12-week YC challenge</span>
          </nav>
          <div className="mt-6 lg:grid lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <div className={`${kicker} text-signal-strong`}>
                Free · No login · {BATCH_TOTAL_WEEKS} weekly challenges · {frameworks.length}{' '}
                frameworks · Updated Nov 2026
              </div>
              <h1 className="mt-4 font-serif text-display font-medium text-fg">
                The 12-week YC challenge: run a Y Combinator batch on your own
              </h1>
              <p className="mt-5 max-w-[56ch] text-body-lg text-fg-2">
                What happens inside YC each week of its three months, and the same week here, as a
                challenge: the framework partners teach, one hard task to finish, the questions they
                ask at office hours and a weekly update with your one number.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {/* Phones: the start panel sits below the fold, so give it a jump link here. */}
                <a
                  href="#start"
                  className="inline-flex h-12 items-center rounded-full bg-signal px-6 text-small font-semibold text-white shadow-e1 transition-colors duration-fast hover:bg-signal-strong lg:hidden"
                >
                  Start the challenge
                </a>
                <a
                  href="#timeline"
                  className="inline-flex h-12 items-center rounded-full bg-surface px-6 text-small font-semibold text-fg ring-1 ring-inset ring-border-strong transition-colors duration-fast hover:bg-muted"
                >
                  See the 12 challenges
                </a>
                <Link
                  href="/paul-graham/what-happens-at-yc"
                  className="inline-flex h-12 items-center rounded-full px-4 text-small font-semibold text-signal-strong underline-offset-4 hover:underline"
                >
                  The YC deal and batch, explained →
                </Link>
              </div>
              <p className="mt-5 max-w-[60ch] text-caption text-fg-3">{BATCH_DISCLAIMER}</p>
              <dl className="mt-8 grid max-w-xl grid-cols-3 gap-3">
                {[
                  { k: 'Weekly challenges', v: String(BATCH_TOTAL_WEEKS) },
                  { k: 'Assignments', v: String(assignments) },
                  { k: 'Office-hours questions', v: String(ohCount) },
                ].map((x) => (
                  <div
                    key={x.k}
                    className="rounded-xl border border-border bg-surface p-3.5 md:p-4"
                  >
                    <dt className="text-caption text-fg-2">{x.k}</dt>
                    <dd className="mt-0.5 text-h3 font-semibold tabular-nums text-fg">{x.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div id="start" className="mt-10 scroll-mt-24 lg:col-span-5 lg:mt-0">
              <ChallengePanel
                weeks={BATCH_WEEKS.map((w) => ({
                  week: w.week,
                  slug: w.slug,
                  title: w.title,
                  challenge: w.challenge?.name ?? w.title,
                }))}
                basePath={BATCH_BASE}
                total={BATCH_TOTAL_WEEKS}
              />
            </div>
          </div>
        </div>

        {/* ---------- The rhythm of a YC week ---------- */}
        <section aria-labelledby="rhythm-title" className="border-t border-border bg-surface/60">
          <div className={`${container} py-14 md:py-20`}>
            <header data-reveal className="max-w-2xl">
              <div className={`${kicker} text-signal-strong`}>What repeats every week</div>
              <h2 id="rhythm-title" className="mt-3 text-h2 font-semibold text-fg">
                The rhythm of a YC week
              </h2>
              <p className="mt-2 text-body text-fg-2">
                The batch is not a school. YC events take a few hours a week; the rhythm around them
                is what founders copy. Each part is labelled by where it comes from.
              </p>
            </header>
            <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {RHYTHM.map((r) => (
                <li
                  key={r.what}
                  data-reveal
                  className="flex flex-col rounded-xl border border-border bg-surface p-4"
                >
                  <div className={`${kicker} text-fg-3`}>{r.when}</div>
                  <div className="mt-2 text-h4 font-semibold text-fg">{r.what}</div>
                  <p className="mt-1.5 text-small text-fg-2">{r.detail}</p>
                  <div className="mt-auto pt-3">
                    <span
                      className={`inline-flex min-h-6 items-center rounded-full px-2.5 text-caption font-medium ${
                        r.status === 'Documented by YC'
                          ? 'bg-success-soft text-success-strong'
                          : r.status === 'Paul Graham’s advice'
                            ? 'bg-signal-tint text-signal-strong'
                            : 'bg-muted text-fg-2'
                      }`}
                    >
                      {r.status}
                    </span>
                    {r.source && (
                      <a
                        href={r.source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1.5 flex items-center gap-1 text-caption text-fg-3 underline-offset-4 hover:text-fg hover:underline"
                      >
                        {r.source.label} <ArrowUpRightIcon className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------- 12-week timeline ---------- */}
        <div id="timeline" className="scroll-mt-20 border-t border-border">
          {PHASES.map((ph) => {
            const items = weeksByPhase(ph.n)
            if (!items.length) return null
            return (
              <section
                key={ph.n}
                aria-labelledby={`phase-${ph.n}`}
                className="border-b border-border"
              >
                <div className={`${container} py-12 md:py-16 lg:grid lg:grid-cols-12 lg:gap-12`}>
                  <header data-reveal className="lg:col-span-4">
                    <div className="lg:sticky lg:top-24">
                      <div className={`${kicker} text-signal-strong`}>
                        Phase {ph.n} of 3 · Weeks {ph.weeks}
                      </div>
                      <h2 id={`phase-${ph.n}`} className="mt-3 text-h2 font-semibold text-fg">
                        {ph.title}
                      </h2>
                      <p className="mt-2 max-w-[44ch] text-body text-fg-2">{ph.promise}</p>
                    </div>
                  </header>
                  <ol className="relative mt-6 lg:col-span-8 lg:mt-0">
                    {items.map((w, i) => (
                      <li key={w.slug} className="relative">
                        {i < items.length - 1 && (
                          <span
                            aria-hidden="true"
                            className="absolute bottom-0 left-[35px] top-14 w-px bg-border"
                          />
                        )}
                        <Link
                          href={`${BATCH_BASE}/${w.slug}`}
                          className="group relative flex items-start gap-4 rounded-xl px-4 py-4 transition-colors duration-fast hover:bg-surface hover:shadow-e1"
                        >
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border-strong bg-surface font-mono text-small font-semibold tabular-nums text-fg">
                            {w.week}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="flex items-start justify-between gap-3">
                              <span className="min-w-0">
                                <span className={`${kicker} block text-fg-3`}>
                                  Week {w.week} · {w.title}
                                </span>
                                <span className="mt-1 block text-body font-semibold text-fg group-hover:text-signal-strong">
                                  {w.challenge?.name ?? w.title}
                                </span>
                              </span>
                              <ChallengeStatus week={w.week} ids={assignmentIds(w)} />
                            </span>
                            {w.challenge?.task && (
                              <span className="mt-1 line-clamp-2 text-small text-fg">
                                {w.challenge.task}
                              </span>
                            )}
                            <span className="mt-1.5 line-clamp-2 text-small text-fg-2">
                              <span className="font-medium text-fg-2">At YC:</span>{' '}
                              {firstSentence(w.atYc.body[0] ?? w.tldr)}
                            </span>
                            <span className="mt-2 flex flex-wrap items-center gap-1.5">
                              <span className="text-caption text-fg-3">Assignments</span>
                              <WeekTicks ids={assignmentIds(w)} />
                            </span>
                            {w.frameworks.length > 0 && (
                              <span className="mt-2 flex flex-wrap gap-1.5">
                                {w.frameworks.map((f) => (
                                  <span
                                    key={f.name}
                                    className="inline-flex min-h-6 items-center rounded-full bg-muted px-2.5 text-caption font-medium text-fg-2"
                                  >
                                    {f.name}
                                  </span>
                                ))}
                              </span>
                            )}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ol>
                </div>
              </section>
            )
          })}
        </div>

        <div className={`${container} space-y-20 py-16 md:space-y-24 md:py-24`}>
          {/* ---------- Growth tracker ---------- */}
          <section id="growth" aria-labelledby="growth-title" className="scroll-mt-24 space-y-6">
            <header data-reveal className="max-w-2xl">
              <div className={`${kicker} text-signal-strong`}>
                Your one number · saved on this device
              </div>
              <h2 id="growth-title" className="mt-3 text-h2 font-semibold text-fg">
                Growth tracker
              </h2>
              <p className="mt-2 text-body text-fg-2">
                Enter your number every week (the weekly update on each week page fills this in for
                you). The shaded band shows 5–7% weekly growth from your first week, the rate Paul
                Graham calls good in{' '}
                <a
                  href="https://paulgraham.com/growth.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-signal-strong underline-offset-4 hover:underline"
                >
                  ‘Startup = Growth’
                </a>{' '}
                (2012).
              </p>
            </header>
            <div className="max-w-4xl">
              <GrowthTracker total={BATCH_TOTAL_WEEKS} />
            </div>
          </section>

          {/* ---------- Frameworks index ---------- */}
          {frameworks.length > 0 && (
            <section aria-labelledby="frameworks-title" className="space-y-6">
              <header data-reveal className="max-w-2xl">
                <div className={`${kicker} text-signal-strong`}>
                  {frameworks.length} frameworks · explained in full on each week
                </div>
                <h2 id="frameworks-title" className="mt-3 text-h2 font-semibold text-fg">
                  Every framework in the program
                </h2>
                <p className="mt-2 text-body text-fg-2">
                  The methods YC partners and Paul Graham teach, each credited and worked through
                  with an example.
                </p>
              </header>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {frameworks.map(({ f, week }) => (
                  <li key={`${week.slug}-${f.name}`} data-reveal>
                    <Link
                      href={`${BATCH_BASE}/${week.slug}#frameworks`}
                      className="group flex h-full flex-col rounded-xl border border-border bg-surface p-5 transition-[border-color,box-shadow] duration-fast hover:border-border-strong hover:shadow-e2"
                    >
                      <span className={`${kicker} text-fg-3`}>Week {week.week}</span>
                      <span className="mt-2 text-h4 font-semibold text-fg group-hover:text-signal-strong">
                        {f.name}
                      </span>
                      <span className="mt-auto pt-2 text-caption text-fg-2">{f.who}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* ---------- FAQ ---------- */}
          <section aria-labelledby="faq-title" className="space-y-5">
            <h2 id="faq-title" className="text-h2 font-semibold text-fg">
              The YC batch: questions people ask
            </h2>
            <div className="max-w-3xl space-y-2.5">
              {BATCH_HUB_FAQS.map((f, i) => (
                <details
                  key={f.q}
                  open={i === 0}
                  className="group rounded-xl border border-border bg-surface open:shadow-e1"
                >
                  <summary className="flex min-h-12 cursor-pointer list-none items-start justify-between gap-4 px-5 py-4 text-body font-medium text-fg [&::-webkit-details-marker]:hidden">
                    <span>{f.q}</span>
                    <span
                      aria-hidden="true"
                      className="mt-0.5 font-mono text-fg-3 transition-transform duration-base group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="max-w-[68ch] px-5 pb-5 text-small leading-relaxed text-fg-2 sm:text-body">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        </div>

        {/* ---------- Closing band ---------- */}
        <section className="border-y border-border bg-signal-tint/50">
          <div
            className={`${container} flex flex-col gap-6 py-14 md:flex-row md:items-center md:justify-between md:py-16`}
          >
            <div className="max-w-xl">
              <div className={`${kicker} text-signal-strong`}>
                12 challenges · 12 weekly updates · 1 Demo Day
              </div>
              <h2 className="mt-3 font-serif text-h1 font-medium text-fg">
                Do you want to start the challenge?
              </h2>
              <p className="mt-3 text-body text-fg-2">
                Pick your start date, then do week 1. Everything you write stays on this device.
              </p>
            </div>
            {first && (
              <a
                href="#start"
                className="inline-flex h-12 shrink-0 items-center gap-2 self-start rounded-full bg-signal px-6 text-small font-semibold text-white shadow-e1 transition-colors duration-fast hover:bg-signal-strong md:self-auto"
              >
                Start the challenge <ArrowRightIcon />
              </a>
            )}
          </div>
        </section>
        <MockInterviewCTA
          title="Pitch it out loud before a partner hears it."
          body="YC interviews are ten minutes of fast questions. Practise answering like a founder with a voice interviewer, and hear where you ramble."
          roleName="Founder"
          questions={[
            'What are you building, in one sentence?',
            'How do you know people want this?',
            'Why are you the right team, and why now?',
          ]}
        />
      </div>
    </DomainLayout>
  )
}
