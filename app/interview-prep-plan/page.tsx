import type { Metadata } from 'next'
import Link from 'next/link'
import type { ReactNode } from 'react'
import DomainLayout from '@/components/domain/DomainLayout'
import MockInterviewButton from '@/components/ai/MockInterviewButton'
import MockInterviewCTA from '@/components/ai/MockInterviewCTA'
import PrepPlanner from '@/components/prepPlan/PrepPlanner'
import { ColumnChart, Figure, Flow, Insight, SegmentBar } from '@/components/viz'
import {
  afterChecklist,
  buildPlan,
  dayOfChecklist,
  fmtDay,
  fmtMin,
  MAX_PLAN_DAYS,
  type Phase,
  PHASE_LABEL,
  type Plan,
  SAMPLE,
  taperTasks,
  withDays,
} from '@/data/prepPlan/engine'

const PAGE_URL = 'https://www.autointerviewai.com/interview-prep-plan'
const UPDATED = '2026-11-20'
const TITLE = 'Interview Prep Plan: Free Day-by-Day Planner From Your Date'
const DESC =
  'Enter your interview date, rounds and free time; get a day-by-day prep plan to tick off, with mock interviews, a calendar file and a day-of checklist. Free.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: PAGE_URL,
    siteName: 'Auto Interview AI',
    type: 'website',
  },
  twitter: { card: 'summary', title: TITLE, description: DESC },
}

const container = 'mx-auto w-full max-w-[1200px] px-5 md:px-8'
const kicker = 'font-mono text-kicker uppercase tracking-[0.08em]'
const link =
  'font-medium text-signal-strong underline decoration-signal/30 underline-offset-2 hover:decoration-signal'

const SRC = {
  cepeda06: {
    label:
      'Cepeda et al., Distributed practice in verbal recall tasks, Psychological Bulletin, 2006',
    url: 'https://pubmed.ncbi.nlm.nih.gov/16719566/',
  },
  cepeda08: {
    label: 'Cepeda et al., Spacing effects in learning, Psychological Science, 2008',
    url: 'https://pubmed.ncbi.nlm.nih.gov/19076480/',
  },
  dunlosky: {
    label: 'Association for Psychological Science, on Dunlosky et al. 2013 (PSPI)',
    url: 'https://www.psychologicalscience.org/publications/journals/pspi/learning-techniques.html',
  },
  rework: {
    label: 'Google re:Work, A guide to structured interviewing',
    url: 'https://rework.withgoogle.com/intl/en/guides/a-guide-to-structured-interviewing-for-better-hiring-practices',
  },
  amazon: {
    label: 'About Amazon, Your complete guide to the Amazon interview process (Apr 2025)',
    url: 'https://www.aboutamazon.com/news/workplace/amazon-interview-guide',
  },
  meta: {
    label: 'Meta Careers, Preparing for your software engineering interview at Meta',
    url: 'https://www.metacareers.com/blog/preparing-for-your-software-engineering-interview-at-meta/',
  },
  mckinsey: {
    label: 'McKinsey careers blog, Jenny Phung: practice for interviews, but don’t become scripted',
    url: 'https://www.mckinsey.com/careers/meet-our-people/careers-blog/jenny-phung',
  },
  nhlbi: {
    label: 'NIH NHLBI, How sleep affects your health',
    url: 'https://www.nhlbi.nih.gov/health/sleep-deprivation/health-effects',
  },
  harvard: {
    label: 'Harvard FAS Mignone Center for Career Success, Interviewing',
    url: 'https://careerservices.fas.harvard.edu/resources/interviewing/',
  },
  hls: {
    label: 'Harvard Law School, Video interviewing for candidates (PDF, 2025)',
    url: 'https://hls.harvard.edu/wp-content/uploads/2025/06/Video-Interviewing-for-Candidates.pdf',
  },
}

/* ---------- worked examples, computed from the same engine as the tool ---------- */
const SAMPLE_PLAN = buildPlan(SAMPLE)
const HORIZONS = [3, 7, 14, 28].map((n) => ({ n, plan: buildPlan(withDays(SAMPLE, n)) }))
const TOMORROW = buildPlan(withDays(SAMPLE, 1))
const hours = (m: number) => Math.round((m / 60) * 10) / 10
const PHASES: Phase[] = ['foundation', 'stories', 'drills', 'mocks', 'taper']
const SAMPLE_TOTAL = SAMPLE_PLAN.planned
const share = (m: number) => Math.round((m / SAMPLE_TOTAL) * 100)
const H28 = HORIZONS[3].plan
const H7 = HORIZONS[1].plan
const H3 = HORIZONS[0].plan

/** "days 1–3 groundwork, days 4–5 stories, …" from a plan, so the prose always matches it. */
function phaseRuns(plan: Plan): string {
  const runs: { phase: Phase; from: number; to: number }[] = []
  for (const d of plan.days) {
    const last = runs[runs.length - 1]
    if (last && last.phase === d.phase) last.to = d.index
    else runs.push({ phase: d.phase, from: d.index, to: d.index })
  }
  return runs
    .map(
      (r) =>
        `${r.from === r.to ? `day ${r.from}` : `days ${r.from}–${r.to}`} ${PHASE_LABEL[r.phase].toLowerCase()}`
    )
    .join(', ')
}

const RULES: { rule: string; does: string; quote: string; src: { label: string; url: string } }[] =
  [
    {
      rule: 'Spread practice over days',
      does: 'Stories come back as “retell from memory” every other day; drills repeat with a new focus.',
      quote: 'the ISI producing maximal retention increased as retention interval increased',
      src: SRC.cepeda06,
    },
    {
      rule: 'Test yourself, don’t re-read',
      does: 'Most drill time is answering without notes, then checking.',
      quote:
        'Other learning techniques such as taking practice tests and spreading study sessions out over time … were found to be of high utility',
      src: SRC.dunlosky,
    },
    {
      rule: 'Practise the question types',
      does: 'Rounds you tick decide the drills: structured interviews repeat the same kinds of questions.',
      quote: 'we use the same interview questions, grade candidate responses on an identical scale',
      src: SRC.rework,
    },
    {
      rule: 'Say it out loud, then record',
      does: 'Pitch, stories and drills are spoken and timed; one story is recorded and played back.',
      quote:
        'Consider recording yourself or practicing with a friend to ensure your STAR responses are concise yet detailed',
      src: SRC.amazon,
    },
    {
      rule: 'Think out loud, against a clock',
      does: 'Technical and case drills are timed and spoken.',
      quote: 'Practice under time pressure.',
      src: SRC.meta,
    },
    {
      rule: 'Bullets, not a script',
      does: 'After each mock you rewrite weak answers as a few bullets and say them again.',
      quote:
        'I practiced orally, alone and with friends, incorporating feedback from previous practice sessions.',
      src: SRC.mckinsey,
    },
    {
      rule: 'Keep the last day light',
      does: 'The day before is logistics, questions to ask and a short review, then sleep.',
      quote: 'Studies show that a good night’s sleep improves learning and problem-solving skills.',
      src: SRC.nhlbi,
    },
    {
      rule: 'Arrive early, follow up fast',
      does: 'The day-of list has you 10–15 minutes early (5–10 on video); the after list has the thank-you.',
      quote: 'Send a thank-you email after the interview within 24-48 hours.',
      src: SRC.harvard,
    },
  ]

const FAQ = [
  {
    q: 'How do I make an interview preparation plan?',
    a: 'Count the days to the interview and the minutes you really have each day. Spend the first days on groundwork (the job post, the company, your resume, a 60–90 second pitch), the middle on stories and timed drills for your rounds, the last study days on mock interviews, and keep the day before light. The planner above does this for your date and shows what to drop first if time is short.',
  },
  {
    q: 'How can I prepare for an interview in 1 week?',
    a: `With an hour on weekdays and two on weekend days, a week gives about ${fmtMin(H7.planned)} of prep. Our 7-day example runs: ${phaseRuns(H7)}. Groundwork is the job post, company, resume, pitch and the reported questions; the last study day ends in a full mock interview, and the day before is logistics, questions to ask and sleep.`,
  },
  {
    q: 'How do I prepare for an interview in 3 days?',
    a: `Cut to what changes the outcome: the job post, your pitch, three STAR stories and one mock interview, said out loud. At an hour a day, our 3-day example fits ${fmtMin(H3.planned)} and leaves full company research out; the planner lists the next tasks to add if you find more time.`,
  },
  {
    q: 'I have an interview tomorrow. What should I do tonight?',
    a: `Say your 60–90 second pitch out loud a few times, confirm the time, time zone and link, test your setup, write three questions to ask, and sleep. With an hour, that is about all that fits (${TOMORROW.days[0]?.tasks.map((t) => t.title.toLowerCase()).join(', ')}). Skip new topics.`,
  },
  {
    q: 'How many hours a day should I prepare for an interview?',
    a: 'There is no fixed number; what matters is spreading it out and practising out loud. One hour on weekdays is enough to follow the plan; two on weekends lets you fit a full mock interview and its review on the same day. Tell the planner your real time and it fits the plan to it.',
  },
  {
    q: 'How do I prepare for an interview while working full time?',
    a: 'Set weekdays to 30–60 minutes and weekends to 2–3 hours. The planner fits each day to the time you set, prefers a weekend day for each mock interview near the end, and adds each session to your calendar at the time you choose.',
  },
  {
    q: 'Is it better to cram the night before or prepare over several days?',
    a: 'Spread it. A review of spacing studies found that the best gap between study sessions grows with how long you need to remember, and practice tests and spaced sessions were rated high-utility study techniques. Cramming also costs sleep, which NIH notes improves learning and problem solving.',
  },
  {
    q: 'What should I do on the day of the interview?',
    a: 'Arrive 10–15 minutes early (Harvard’s career office) or log in 5–10 minutes early for a final tech check on video (Harvard Law School). Re-read the job post’s top needs, say your pitch once, and keep water, your resume and your questions nearby.',
  },
  {
    q: 'Does the plan work for freshers and campus placements?',
    a: 'Yes. Pick “Another role” if your role is not listed, tick the rounds your company runs (most campus drives have a technical or aptitude round and an HR round), and use the recruiter/HR screen for the expected-pay and notice-period questions.',
  },
  {
    q: 'Is my plan saved? Is anything uploaded?',
    a: 'Your inputs and ticks are saved only in this browser, so the plan is there when you come back. Nothing is uploaded and no AI is used: the plan is built by fixed rules shown on this page.',
  },
]

function Section({
  id,
  meta,
  title,
  intro,
  children,
}: {
  id: string
  meta: string
  title: string
  intro?: ReactNode
  children: ReactNode
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-t`}
      className="scroll-mt-32 border-t border-border py-14 md:py-20"
    >
      <header className="max-w-2xl">
        <div className={`${kicker} text-signal-strong`}>{meta}</div>
        <h2 id={`${id}-t`} className="mt-3 text-h2 font-semibold text-fg">
          {title}
        </h2>
        {intro && <p className="mt-3 text-body-lg text-fg-2">{intro}</p>}
      </header>
      <div className="mt-8 space-y-8">{children}</div>
    </section>
  )
}

function P({ children }: { children: ReactNode }) {
  return <p className="max-w-prose text-body text-fg-2 md:text-prose">{children}</p>
}

const SECTIONS = [
  { id: 'planner', label: 'Planner' },
  { id: 'why', label: 'Why this shape' },
  { id: 'plans', label: '3 days · 1 week · 2 weeks' },
  { id: 'day-before', label: 'Day before + day of' },
  { id: 'faq', label: 'FAQ' },
]

function PlanList({ plan }: { plan: Plan }) {
  return (
    <ol className="divide-y divide-border">
      {plan.days.map((d) => (
        <li key={d.date} className="grid gap-1 py-3 sm:grid-cols-[9rem_1fr] sm:gap-4">
          <div>
            <div className="text-small font-semibold text-fg">
              Day {d.index} · {fmtDay(d.date)}
            </div>
            <div className="text-caption text-fg-3">
              {PHASE_LABEL[d.phase]} · {fmtMin(d.used)}
            </div>
          </div>
          <ul className="space-y-1 text-small text-fg-2">
            {d.tasks.map((t) => (
              <li key={t.key}>
                {t.title} <span className="text-fg-3">· {t.minutes} min</span>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  )
}

export default function InterviewPrepPlanPage() {
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Interview Prep Plan',
      url: PAGE_URL,
      description: DESC,
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Any (runs in the browser)',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
      dateModified: UPDATED,
      publisher: {
        '@type': 'Organization',
        name: 'Auto Interview AI',
        url: 'https://www.autointerviewai.com',
        parentOrganization: {
          '@type': 'Organization',
          name: 'Tough Tongue AI',
          url: 'https://www.toughtongueai.com',
        },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.autointerviewai.com' },
        { '@type': 'ListItem', position: 2, name: 'Interview prep plan', item: PAGE_URL },
      ],
    },
  ]

  return (
    <DomainLayout currentPath="/interview-prep-plan">
      <div className="bg-bg text-fg">
        {schema.map((s, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
          />
        ))}

        {/* ---------- Hero ---------- */}
        <div className={`${container} pb-10 pt-8 md:pb-14 md:pt-12`}>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-caption text-fg-3">
            <Link href="/" className="hover:text-fg">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-fg-2">Interview prep plan</span>
          </nav>

          <header className="mt-8 grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <div className={`${kicker} text-signal-strong`}>
                Free tool · Plans 1 to {MAX_PLAN_DAYS} days · Saved on your device · No AI · Updated
                20 Nov 2026
              </div>
              <h1 className="mt-4 font-serif text-display font-medium text-fg">
                Interview prep plan
              </h1>
              <p className="mt-5 max-w-[56ch] text-body-lg text-fg-2">
                Enter your interview date, the rounds you face and the time you really have. You get
                a day-by-day plan to tick off: groundwork first, then stories and timed drills said
                out loud, mock interviews near the end and a light last day, with a calendar file
                and a day-of checklist.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#planner"
                  className="inline-flex h-12 items-center rounded-full bg-surface px-5 text-small font-semibold text-fg ring-1 ring-inset ring-border-strong transition-colors duration-fast hover:bg-muted"
                >
                  Build my plan
                </a>
                <MockInterviewButton caption={false} label="Practise a mock interview now" />
              </div>
            </div>

            <aside
              aria-label="How the plan is shaped"
              className="hidden rounded-2xl border border-border bg-surface p-5 shadow-e1 md:p-6 lg:col-span-5 lg:block"
            >
              <div className={`${kicker} text-fg-3`}>Every plan runs in this order</div>
              <ol className="mt-4 space-y-3">
                {[
                  ['Groundwork', 'Job post, company, your resume, a 60–90 s pitch'],
                  ['Stories', '3–6 STAR stories, said out loud and recorded once'],
                  ['Drills', 'Timed, out loud, no notes; stories retold from memory'],
                  ['Mock interviews', 'On the last study days, then fix the 3 weakest answers'],
                  ['Last day: light', 'Logistics, 3 questions to ask, sleep'],
                ].map(([t, b], i) => (
                  <li key={t} className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-signal-tint font-mono text-small font-semibold text-signal-ink">
                      {i + 1}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-small font-semibold text-fg">{t}</span>
                      <span className="block text-caption text-fg-2">{b}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </aside>
          </header>

          <div className="mt-10 max-w-3xl rounded-xl bg-signal-tint p-5 ring-1 ring-inset ring-signal/15">
            <div className={`${kicker} text-signal-ink`}>TL;DR</div>
            <ul className="mt-3 space-y-2 text-body text-fg">
              <li>
                <strong className="font-semibold">Spread it out and say it out loud.</strong> Spaced
                sessions and practice tests are the study methods researchers rate highest; reading
                notes is not.
              </li>
              <li>
                <strong className="font-semibold">Short on time?</strong> Keep the pitch, the job
                post, three STAR stories and one mock interview; drop the rest first.
              </li>
              <li>
                <strong className="font-semibold">Time adds up:</strong> at 1 h on weekdays and 2 h
                on weekends, four weeks gives about {hours(H28.loudMinutes)} hours of out-loud
                practice; one week gives {hours(H7.loudMinutes)}.
              </li>
              <li>
                <strong className="font-semibold">Keep the last day light</strong> and arrive 10–15
                minutes early (5–10 on video).
              </li>
            </ul>
          </div>
        </div>

        {/* ---------- In-page nav ---------- */}
        <nav aria-label="On this page" className="sticky top-16 z-40 border-y border-border bg-bg">
          <div className={`${container} flex gap-1 overflow-x-auto py-2`}>
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="inline-flex h-9 shrink-0 items-center rounded-full px-3 text-small text-fg-2 hover:bg-muted hover:text-fg"
              >
                {s.label}
              </a>
            ))}
          </div>
        </nav>

        <div className={container}>
          <Section
            id="planner"
            meta="The planner · about 1 minute"
            title="Your plan, day by day"
            intro="A one-week example loads first. Change the date, rounds and time to yours; the plan rebuilds as you go and your ticks are saved on this device."
          >
            <PrepPlanner />
          </Section>

          <Section
            id="why"
            meta={`Why the plan looks like this · ${RULES.length} rules, sources opened 20 Nov 2026`}
            title="Most of the time goes to saying answers out loud"
            intro="The plan follows what learning research and employers’ own interview guides say works. Each rule below changes something in your plan."
          >
            <Figure
              label={`Where the time goes · 1-week example, ${fmtMin(SAMPLE_TOTAL)} planned`}
              title={`In a one-week plan, groundwork takes ${share(SAMPLE_PLAN.phaseMinutes.foundation)}% and stories ${share(SAMPLE_PLAN.phaseMinutes.stories)}%`}
              source="Auto Interview AI planner, product manager example: 1 h weekdays, 2 h weekends, screen + behavioural + technical rounds"
              updated="Nov 2026"
              table={{
                head: ['Phase', 'Minutes', 'Share'],
                rows: PHASES.map((p) => [
                  PHASE_LABEL[p],
                  SAMPLE_PLAN.phaseMinutes[p],
                  `${share(SAMPLE_PLAN.phaseMinutes[p])}%`,
                ]),
              }}
            >
              <SegmentBar
                sort={false}
                format={{ suffix: ' min' }}
                parts={PHASES.map((p) => ({
                  label: PHASE_LABEL[p],
                  value: SAMPLE_PLAN.phaseMinutes[p],
                }))}
              />
            </Figure>

            <div
              className="overflow-x-auto rounded-xl border border-border bg-surface"
              role="region"
              aria-label="The rules behind the plan and their sources"
              // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
              tabIndex={0}
            >
              <table className="w-full min-w-[640px] text-left text-small">
                <thead className="bg-muted text-fg-2">
                  <tr>
                    <th scope="col" className="sticky left-0 bg-muted px-4 py-3 font-medium">
                      Rule
                    </th>
                    <th scope="col" className="px-4 py-3 font-medium">
                      What the plan does
                    </th>
                    <th scope="col" className="px-4 py-3 font-medium">
                      What the source says
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {RULES.map((r) => (
                    <tr key={r.rule}>
                      <th
                        scope="row"
                        className="sticky left-0 bg-surface px-4 py-3 align-top font-medium text-fg"
                      >
                        {r.rule}
                      </th>
                      <td className="px-4 py-3 align-top text-fg-2">{r.does}</td>
                      <td className="px-4 py-3 align-top text-fg-2">
                        &ldquo;{r.quote}&rdquo;{' '}
                        <a href={r.src.url} target="_blank" rel="noopener" className={link}>
                          {r.src.label.split(',')[0]}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Insight title="Why spacing matters for an interview">
              Spacing studies find that the gap between practice sessions that works best grows with
              how long you need to remember (
              <a href={SRC.cepeda08.url} target="_blank" rel="noopener" className={link}>
                Cepeda and colleagues, 2008
              </a>
              ). For an interview a week or two away, that means short sessions on most days, with
              your stories coming back every other day, rather than one long evening.
            </Insight>
          </Section>

          <Section
            id="plans"
            meta="Ready-made plans · 1 h weekdays, 2 h weekends · computed by the planner"
            title={`Four weeks gives ${hours(H28.loudMinutes)} hours of out-loud practice; one week gives ${hours(H7.loudMinutes)}`}
            intro="The same product manager example at four lengths. With little time the plan keeps the essentials and adds a short mock; with more, the extra days go to drills and more mock interviews."
          >
            <Figure
              label="Hours spent saying answers out loud, by days to the interview"
              title={`${hours(H28.loudMinutes)} h out loud with four weeks, ${hours(H7.loudMinutes)} h with one`}
              source="Auto Interview AI planner, product manager example (screen + behavioural + technical)"
              updated="Nov 2026"
              table={{
                head: ['Days to interview', 'Time planned', 'Out loud', 'Mock interviews'],
                rows: HORIZONS.map((h) => [
                  `${h.n} days`,
                  fmtMin(h.plan.planned),
                  `${hours(h.plan.loudMinutes)} h`,
                  h.plan.mocks,
                ]),
              }}
            >
              <ColumnChart
                format={{ suffix: ' h' }}
                groups={HORIZONS.map((h) => ({
                  label: `${h.n} days`,
                  values: [hours(h.plan.loudMinutes)],
                }))}
              />
            </Figure>

            <div className="space-y-3">
              {[
                { t: 'Interview tomorrow', plan: TOMORROW, open: false },
                ...HORIZONS.slice(0, 3).map((h, i) => ({
                  t:
                    h.n === 7
                      ? '1-week interview prep plan'
                      : h.n === 14
                        ? '2-week interview prep plan'
                        : '3-day interview prep plan',
                  plan: h.plan,
                  open: i === 1,
                })),
              ].map(({ t, plan, open }) => (
                <details
                  key={t}
                  open={open}
                  className="group rounded-xl border border-border bg-surface open:shadow-e1"
                >
                  <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
                    <span>
                      <h3 className="text-body font-semibold text-fg">{t}</h3>
                      <span className="block text-caption text-fg-3">
                        {fmtMin(plan.planned)} planned · {plan.mocks} mock interview
                        {plan.mocks === 1 ? '' : 's'}
                        {plan.dropped.length
                          ? ` · ${plan.dropped.length} tasks left out for time`
                          : ''}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-fg-3 transition-transform duration-base group-open:rotate-180"
                    >
                      ▾
                    </span>
                  </summary>
                  <div className="border-t border-border px-5 pb-4">
                    <PlanList plan={plan} />
                    {plan.dropped.length > 0 && (
                      <p className="mt-2 text-caption text-fg-3">
                        Left out for time, in the order to add them:{' '}
                        {plan.dropped
                          .slice(0, 4)
                          .map((x) => x.title.toLowerCase())
                          .join('; ')}
                        .
                      </p>
                    )}
                  </div>
                </details>
              ))}
            </div>
            <P>
              Have longer than four weeks? The planner builds the last {MAX_PLAN_DAYS} days in
              detail and tells you the start date; before that, two or three sessions a week on your
              role&apos;s reported questions keep you warm. Role question banks:{' '}
              <Link href="/product-manager#questions" className={link}>
                product manager
              </Link>
              ,{' '}
              <Link href="/data-analyst#questions" className={link}>
                data analyst
              </Link>
              ,{' '}
              <Link href="/aipm#questions" className={link}>
                AI PM
              </Link>
              ,{' '}
              <Link href="/ai-engineer#questions" className={link}>
                AI engineer
              </Link>
              ,{' '}
              <Link href="/founders-office#questions" className={link}>
                founder&apos;s office
              </Link>
              .
            </P>
          </Section>

          <Section
            id="day-before"
            meta="Checklists · the last 48 hours"
            title="The day before, the day of, and the day after"
            intro="The planner puts these in your plan automatically. Here they are on one screen."
          >
            <Flow
              label="The last 48 hours"
              steps={[
                {
                  title: 'Day before',
                  body: taperTasks(SAMPLE)
                    .map((t) => t.title)
                    .join(' · '),
                },
                { title: 'Interview day', body: dayOfChecklist(SAMPLE).slice(0, 3).join(' · ') },
                { title: 'Within 48 hours', body: afterChecklist()[0] },
              ]}
            />
            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  t: 'Video interview',
                  items: [
                    'Test camera and microphone, and light your face from the front',
                    'Plain or simple virtual background',
                    'Log in 5–10 minutes early for a final tech check',
                  ],
                  src: SRC.hls,
                },
                {
                  t: 'In person',
                  items: [
                    'Read the employer’s website and the role page again',
                    'Map the route and plan to arrive 10–15 minutes early',
                    'Send a thank-you email within 24–48 hours',
                  ],
                  src: SRC.harvard,
                },
              ].map((b) => (
                <div key={b.t} className="min-w-0 rounded-xl border border-border bg-surface p-5">
                  <h3 className="text-h4 font-semibold text-fg">{b.t}</h3>
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-small text-fg-2">
                    {b.items.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                  <p className="mt-3 text-caption text-fg-3">
                    Source:{' '}
                    <a href={b.src.url} target="_blank" rel="noopener" className={link}>
                      {b.src.label}
                    </a>
                  </p>
                </div>
              ))}
            </div>
          </Section>

          <Section id="faq" meta={`FAQ · ${FAQ.length} questions people ask`} title="Quick answers">
            <div className="space-y-3">
              {FAQ.map((f, i) => (
                <details
                  key={f.q}
                  open={i === 0}
                  className="group rounded-xl border border-border bg-surface open:shadow-e1"
                >
                  <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-medium text-fg [&::-webkit-details-marker]:hidden">
                    <h3 className="text-body font-medium">{f.q}</h3>
                    <span
                      aria-hidden="true"
                      className="text-fg-3 transition-transform duration-base group-open:rotate-180"
                    >
                      ▾
                    </span>
                  </summary>
                  <p className="max-w-prose px-5 pb-5 text-body text-fg-2">{f.a}</p>
                </details>
              ))}
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ['/star-method', 'Days 4–5', 'Build your STAR stories'],
                ['/resume-keyword-checker', 'Day 1', 'Check your resume against the job post'],
                ['/salary-negotiation', 'After the offer', 'Write your salary counter'],
              ].map(([href, k, t]) => (
                <Link
                  key={href}
                  href={href}
                  className="rounded-xl border border-border bg-surface px-5 py-4 transition-[border-color,box-shadow] duration-fast hover:border-border-strong hover:shadow-e2"
                >
                  <span className={`block ${kicker} text-fg-3`}>Up next · {k}</span>
                  <span className="mt-1 block text-h4 font-semibold text-fg">{t}</span>
                </Link>
              ))}
            </div>
            <p className="max-w-prose text-caption text-fg-3">
              Sources (opened 20 Nov 2026):{' '}
              {Object.values(SRC).map((s, i) => (
                <span key={s.url}>
                  {i > 0 && '; '}
                  <a href={s.url} target="_blank" rel="noopener" className={link}>
                    {s.label}
                  </a>
                </span>
              ))}
              . Task minutes are our estimates, not research findings. Not affiliated with any
              employer or university named here.
            </p>
          </Section>
        </div>

        <MockInterviewCTA
          title="Every plan ends in a mock interview. Start one now."
          body="A voice interviewer asks the questions, follows up on your answers, and tells you what was strong and what was thin, so you know which answers to fix tomorrow."
          questions={[
            'Tell me about yourself.',
            'Walk me through a project you are proud of.',
            'Tell me about a time you disagreed with your manager.',
            'Why do you want this role?',
          ]}
        />
      </div>
    </DomainLayout>
  )
}
