import type { Metadata } from 'next'
import Link from 'next/link'
import DomainLayout from '@/components/domain/DomainLayout'
import type { ReactNode } from 'react'
import MockInterviewButton from '@/components/ai/MockInterviewButton'
import MockInterviewCTA from '@/components/ai/MockInterviewCTA'
import StarBuilder from '@/components/starBuilder/StarBuilder'
import SplitBar from '@/components/starBuilder/SplitBar'
import { Figure, Flow, Insight, RangeList, StatRow } from '@/components/viz'
import { analyse, fmtTime, PARTS, TARGETS, DEFAULT_WPM } from '@/data/starMethod/engine'
import { AMAZON_LP_COUNT, COMPETENCIES, SAMPLES } from '@/data/starMethod/questions'

const PAGE_URL = 'https://www.autointerviewai.com/star-method'
const UPDATED = '2026-11-16'
const TITLE = 'STAR Method Answer Builder: Time and Check Your Answers'
const DESC =
  'Write a STAR interview answer and see, live, how long it runs out loud, its time split and 8 checks: I vs we, a number in the result, hedges. Free, no sign-up.'

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
  mit: {
    label: 'MIT CAPD, The STAR method for behavioral interviews (updated 30 Aug 2023)',
    url: 'https://capd.mit.edu/resources/the-star-method-for-behavioral-interviews',
  },
  umbc: {
    label: 'UMBC Career Center, STAR method',
    url: 'https://careers.umbc.edu/students/interview/questions/star/',
  },
  reading: {
    label: 'University of Reading Careers (updated 1 Aug 2023)',
    url: 'https://blogs.reading.ac.uk/careers/how-to-use-the-star-technique-in-a-graduate-job-interview',
  },
  amazon: {
    label: 'Amazon, Amazon interview guide (8 Apr 2025)',
    url: 'https://aboutamazon.com/news/workplace/amazon-interview-guide',
  },
  amazonLp: {
    label: 'Amazon, Leadership Principles',
    url: 'https://www.amazon.jobs/en/principles',
  },
  microsoft: {
    label: 'Microsoft Careers, Interview tips',
    url: 'https://careers.microsoft.com/v2/global/en/hiring-tips/interview-tips',
  },
  meta: {
    label: 'Meta Careers, Preparing for your software engineering interview (6 Oct 2022)',
    url: 'https://metacareers.com/life/preparing-for-your-software-engineering-interview-at-meta',
  },
  deloitte: {
    label: 'Deloitte US, Behavioral interview tips',
    url: 'https://www.deloitte.com/us/en/careers/join-deloitte/recruiting-tips/behavioral-interview-tips.html',
  },
  ukcs: {
    label: 'UK Civil Service, Success Profiles: Civil Service Behaviours (updated 29 Jan 2025)',
    url: 'https://www.gov.uk/government/publications/success-profiles/success-profiles-civil-service-behaviours',
  },
  opm: {
    label: 'US OPM, How do I create structured interview questions?',
    url: 'https://www.opm.gov/frequently-asked-questions/assessment-policy-faq/structured-interviews/how-do-i-create-structured-interview-questions/',
  },
  opmPdf: {
    label: 'US OPM, Structured Interviews (PDF)',
    url: 'https://www.opm.gov/policy-data-oversight/assessment-and-selection/other-assessment-methods/structured-interviews.pdf',
  },
  sackett: {
    label: 'Sackett, Zhang, Berry & Lievens (2022), Journal of Applied Psychology 107(11)',
    url: 'https://ink.library.smu.edu.sg/lkcsb_research/6894',
  },
  yuan: {
    label: 'Yuan, Liberman & Cieri, Interspeech 2006 (speaking rate)',
    url: 'https://www.ldc.upenn.edu/sites/default/files/interspeech2006-towards-integrated-understanding.pdf',
  },
}

const WHO: { org: string; quote: string; src: { label: string; url: string } }[] = [
  {
    org: 'Amazon',
    quote:
      'The cornerstone of these interviews is the STAR method: situation, task, action, and result.',
    src: SRC.amazon,
  },
  {
    org: 'Microsoft',
    quote: 'We recommend you use the STAR(R) model when answering questions.',
    src: SRC.microsoft,
  },
  {
    org: 'Meta',
    quote: 'Use the S.T.A.R. (Situation, Task, Actions, Results) method …',
    src: SRC.meta,
  },
  {
    org: 'Deloitte (US)',
    quote: 'Structure your responses using the STAR method (situation, task, action, result) …',
    src: SRC.deloitte,
  },
  {
    org: 'UK Civil Service',
    quote:
      'consider using the STAR method which allows you to set the scene, show what and how you did and the overall outcome.',
    src: SRC.ukcs,
  },
  {
    org: 'US Office of Personnel Management (for interviewers)',
    quote:
      'Behavioral description interview questions ask applicants to describe a past behavior … based on the behavioral consistency principle that past behavior is the best predictor of future behavior.',
    src: SRC.opmPdf,
  },
]

// Weak vs strong: the same story, run through the same engine as the builder.
const STRONG = SAMPLES.find((s) => s.id === 'sample-analyst')!
const WEAK = SAMPLES.find((s) => s.id === 'sample-analyst-weak')!
const A_STRONG = analyse(STRONG, DEFAULT_WPM)
const A_WEAK = analyse(WEAK, DEFAULT_WPM)

const FAQ = [
  {
    q: 'What is the STAR method?',
    a: 'STAR is a way to answer behavioural questions ("Tell me about a time…") with one real story in four parts: the Situation, your Task, the Actions you took, and the Result. Amazon, Microsoft, Meta, Deloitte, the UK Civil Service and the US Office of Personnel Management all name it in their own interview guidance.',
  },
  {
    q: 'How long should a STAR answer be?',
    a: `Most career services say one to two minutes (UMBC: "one to two minutes"; University of Reading: no longer than 1½ to 2 minutes). Amazon is the exception: its own guide says STAR responses typically last 2 to 3 minutes. At ${DEFAULT_WPM} words a minute, 1 to 2 minutes is about 150 to 300 words.`,
  },
  {
    q: 'How much of the answer should be the Action?',
    a: 'MIT’s career office suggests about 60% Action, 20% Situation, 10% Task and 10% Result. The builder shows your split live. If your Situation and Task are more than about a third of the answer, cut the set-up, not the actions.',
  },
  {
    q: 'Should I say "I" or "we" in a STAR answer?',
    a: 'Say "I" for what you did. MIT CAPD says "I" statements show ownership and that "we" makes it hard to tell what you contributed; Amazon’s guide gives the same advice. You can name the team for context, but every action step should be yours.',
  },
  {
    q: 'What if my result has no number?',
    a: 'Use the most concrete outcome you can defend: time saved, a deadline met, an error rate, a grade, a rank, people who used it, or a decision that changed. If there was no measurable result, say what you learned and what you would do next time; Microsoft’s version (STAR(R)) adds that Reflection step on purpose.',
  },
  {
    q: 'How many STAR stories should I prepare?',
    a: `MIT CAPD suggests 3 to 5. One strong story usually answers two or three questions (a deadline story can also show ownership and a decision with data). Tag your stories in the builder and the coverage map shows which of the ${COMPETENCIES.length} common questions still have no story.`,
  },
  {
    q: 'What is the difference between STAR, CAR, SOAR and STAR(R)?',
    a: 'They are the same idea with different labels. CAR (Context, Action, Result) folds Situation and Task together. SOAR swaps Task for Objective. STAR(R), which Microsoft recommends, adds a fifth step, Reflection: what you learned. The builder checks for that learning line in your Result.',
  },
  {
    q: 'Can freshers use the STAR method without work experience?',
    a: 'Yes. College projects, internships, hackathons, a club or fest you ran, a part-time job or a family business all count. The fresher sample in the builder uses a final-year project. What matters is that the story is real and the actions are yours.',
  },
  {
    q: 'Is my answer saved or sent anywhere?',
    a: 'Your draft and story bank are saved only in this browser, so they are still there when you come back. Nothing is uploaded and no AI reads your text; every check is a simple rule you can see on this page.',
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
  { id: 'builder', label: 'Builder' },
  { id: 'length', label: 'How long' },
  { id: 'example', label: 'Weak vs strong' },
  { id: 'who', label: 'Who asks for STAR' },
  { id: 'faq', label: 'FAQ' },
]

export default function StarMethodPage() {
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'STAR Method Answer Builder',
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
        { '@type': 'ListItem', position: 2, name: 'STAR method answer builder', item: PAGE_URL },
      ],
    },
  ]

  const std = TARGETS.standard
  const wordsAt = (sec: number) => Math.round((sec / 60) * DEFAULT_WPM)

  return (
    <DomainLayout currentPath="/star-method">
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
            <span className="text-fg-2">STAR method answer builder</span>
          </nav>

          <header className="mt-8 grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <div className={`${kicker} text-signal-strong`}>
                Free tool · 8 checks · {COMPETENCIES.length} common questions · No AI, no upload ·
                Updated 16 Nov 2026
              </div>
              <h1 className="mt-4 font-serif text-display font-medium text-fg">
                STAR method answer builder
              </h1>
              <p className="mt-5 max-w-[56ch] text-body-lg text-fg-2">
                The STAR method answers &ldquo;Tell me about a time&hellip;&rdquo; with one real
                story: Situation, Task, Action, Result. Write yours in four boxes and see, as you
                type, how long it runs out loud, whether the Action gets most of the time, and
                whether you say &ldquo;I&rdquo;, give a number and say what you learned. Save 3 to 5
                stories and see which questions they cover.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#builder"
                  className="inline-flex h-12 items-center rounded-full bg-surface px-5 text-small font-semibold text-fg ring-1 ring-inset ring-border-strong transition-colors duration-fast hover:bg-muted"
                >
                  Build my answer
                </a>
                <MockInterviewButton caption={false} label="Then say it: free mock interview" />
              </div>
            </div>

            <aside
              aria-label="The STAR rules this page checks"
              className="rounded-2xl border border-border bg-surface p-5 shadow-e1 md:p-6 lg:col-span-5"
            >
              <div className={`${kicker} text-fg-3`}>The four parts · target time split</div>
              <ul className="mt-4 space-y-3">
                {PARTS.map((p) => (
                  <li key={p.key} className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-signal-tint font-mono text-small font-semibold text-signal-ink">
                      {p.letter}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline justify-between gap-2">
                        <span className="text-small font-semibold text-fg">{p.name}</span>
                        <span className="text-small font-semibold tabular-nums text-fg">
                          {p.target}%
                        </span>
                      </span>
                      <span className="block text-caption text-fg-2">{p.hint}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-caption text-fg-3">
                Split from{' '}
                <a href={SRC.mit.url} target="_blank" rel="noopener" className={link}>
                  MIT CAPD
                </a>
                . Length: 1 to 2 minutes in most interviews, 2 to 3 at Amazon.
              </p>
            </aside>
          </header>

          <div className="mt-10 max-w-3xl rounded-xl bg-signal-tint p-5 ring-1 ring-inset ring-signal/15">
            <div className={`${kicker} text-signal-ink`}>TL;DR</div>
            <ul className="mt-3 space-y-2 text-body text-fg">
              <li>
                <strong className="font-semibold">Keep it to 1 to 2 minutes</strong> (about{' '}
                {wordsAt(std.min)} to {wordsAt(std.max)} words at {DEFAULT_WPM} a minute). Amazon
                says its answers typically last 2 to 3.
              </li>
              <li>
                <strong className="font-semibold">Spend about 60% on the Action</strong> and say
                &ldquo;I&rdquo;, not &ldquo;we&rdquo;, for what you did.
              </li>
              <li>
                <strong className="font-semibold">End with a number and a lesson.</strong> Then say
                it out loud; a story that reads well can still run long when spoken.
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
            id="builder"
            meta="The builder · about 10 minutes a story"
            title="Write your story, part by part"
            intro="Pick the question, write each part, and watch the live report. Not sure where to start? Load a sample and edit it."
          >
            <StarBuilder />
          </Section>

          <Section
            id="length"
            meta="Answer length · 3 sources opened 16 Nov 2026"
            title="Aim for 1 to 2 minutes; Amazon allows 2 to 3"
            intro="Career services agree on one to two minutes. Amazon, which calls STAR the cornerstone of its behavioural interviews, says its answers typically run 2 to 3."
          >
            <Figure
              label="Recommended length of one STAR answer, in minutes"
              title="Every source but Amazon tops out at 2 minutes"
              source={[SRC.umbc, SRC.reading, SRC.amazon]}
              updated="Nov 2026"
              table={{
                head: ['Source', 'What it says', 'Minutes'],
                rows: [
                  ['UMBC Career Center', '“Answers can take one to two minutes”', '1–2'],
                  [
                    'University of Reading Careers',
                    '“shouldn’t be longer than 1 ½ – 2 minutes”',
                    'up to 1.5–2',
                  ],
                  ['Amazon interview guide', '“typically lasting 2-3 minutes each”', '2–3'],
                ],
              }}
            >
              <RangeList
                domain={[0, 4]}
                ticks={4}
                format={{ suffix: ' min', decimals: 1 }}
                rows={[
                  { label: 'UMBC Career Center', min: 1, max: 2, display: '1–2 min' },
                  {
                    label: 'University of Reading',
                    sub: 'upper limit',
                    min: 1.5,
                    max: 2,
                    display: '≤ 1.5–2 min',
                  },
                  { label: 'Amazon interview guide', min: 2, max: 3, display: '2–3 min' },
                ]}
              />
            </Figure>
            <StatRow
              stats={[
                {
                  label: 'Words in 1 minute',
                  value: `${DEFAULT_WPM}`,
                  sub: `At a calm ${DEFAULT_WPM} words a minute (our default)`,
                },
                {
                  label: 'Words in 2 minutes',
                  value: `${wordsAt(120)}`,
                  sub: 'The top of most guidance',
                },
                {
                  label: 'Phone conversation pace',
                  value: '196 wpm',
                  sub: 'Casual talk, 2,438 US calls (Yuan et al. 2006); not a target',
                  href: SRC.yuan.url,
                },
              ]}
            />
            <P>
              Your own pace matters more than any average. In 2,438 recorded US phone conversations,
              both speakers together averaged 196 words a minute, pauses included, and single calls
              ran from 111 to 291. That is casual talk, not an interview target, and it shows how
              much people differ. So the builder asks you to read your answer aloud and times it: a
              250-word answer takes about 1:28 at 170 words a minute and 1:55 at 130.
            </P>
          </Section>

          <Section
            id="example"
            meta="Worked example · one fictional story, written twice"
            title={`Same story, ${A_WEAK.passed} of 8 checks vs ${A_STRONG.passed} of 8`}
            intro="A data analyst finds a bug in the refund numbers the night before a board review. Both versions are run through the same code as the builder."
          >
            <div className="grid gap-6 lg:grid-cols-2">
              {[
                { name: 'Weak version', s: WEAK, a: A_WEAK },
                { name: 'Strong version', s: STRONG, a: A_STRONG },
              ].map(({ name, s, a }) => (
                <Figure
                  key={name}
                  label={`${name} · ${a.totalWords} words · ${fmtTime(a.seconds)} at ${DEFAULT_WPM} wpm`}
                  title={`Action is ${a.share.a}% of the answer; ${a.passed} of ${a.checks.length} checks pass`}
                  source="Auto Interview AI STAR builder, run on a fictional story"
                  updated="Nov 2026"
                  table={{
                    head: ['Part', 'Words', 'Share'],
                    rows: PARTS.map((p) => [p.name, a.words[p.key], `${a.share[p.key]}%`]),
                  }}
                >
                  <SplitBar words={a.words} showTarget={false} />
                  <details className="group mt-4 rounded-lg border border-border">
                    <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between px-4 text-small font-medium text-fg">
                      Read the {name.toLowerCase()}
                      <span
                        aria-hidden="true"
                        className="text-fg-3 transition-transform duration-base group-open:rotate-180"
                      >
                        ▾
                      </span>
                    </summary>
                    <dl className="space-y-2 px-4 pb-4 text-small text-fg-2">
                      {PARTS.map((p) => (
                        <div key={p.key}>
                          <dt className="font-semibold text-fg">{p.name}</dt>
                          <dd>{s[p.key]}</dd>
                        </div>
                      ))}
                    </dl>
                  </details>
                </Figure>
              ))}
            </div>
            <div
              className="overflow-x-auto rounded-xl border border-border bg-surface"
              role="region"
              aria-label="Checks, weak vs strong"
              // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
              tabIndex={0}
            >
              <table className="w-full min-w-[560px] text-left text-small">
                <thead className="bg-muted text-fg-2">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-medium">
                      Check
                    </th>
                    <th scope="col" className="px-4 py-3 font-medium">
                      Weak
                    </th>
                    <th scope="col" className="px-4 py-3 font-medium">
                      Strong
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {A_STRONG.checks.map((c, i) => {
                    const w = A_WEAK.checks[i]
                    const lab = (st: string) =>
                      st === 'pass' ? 'Pass' : st === 'warn' ? 'Fix' : 'Fix first'
                    return (
                      <tr key={c.id}>
                        <th scope="row" className="px-4 py-3 align-top font-medium text-fg">
                          {c.title}
                        </th>
                        <td className="px-4 py-3 align-top text-fg-2">
                          <span className="font-semibold text-fg">{lab(w.status)}.</span> {w.detail}
                        </td>
                        <td className="px-4 py-3 align-top text-fg-2">
                          <span className="font-semibold text-fg">{lab(c.status)}.</span> {c.detail}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <Insight title="The fix was not more words">
              The weak version is shorter ({A_WEAK.totalWords} words) but spends{' '}
              {A_WEAK.share.s + A_WEAK.share.t}% on set-up and says &ldquo;we&rdquo;{' '}
              {A_WEAK.weCount} times in the Action. The strong version gives {A_STRONG.share.a}% to
              what the analyst did, in order, ends with a number (3.1%, not 4.6%) and a habit
              learned.
            </Insight>
          </Section>

          <Section
            id="who"
            meta={`Who asks for STAR · ${WHO.length} employers and public bodies, quoted`}
            title="Big employers name STAR in their own interview advice"
            intro="These are their words, from their careers or guidance pages. Structured interviews (set questions, answers scored against set benchmarks) ranked top for predicting job performance in Sackett and colleagues’ 2022 re-analysis."
          >
            <div
              className="overflow-x-auto rounded-xl border border-border bg-surface"
              role="region"
              aria-label="Employers that recommend STAR"
              // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
              tabIndex={0}
            >
              <table className="w-full min-w-[560px] text-left text-small">
                <thead className="bg-muted text-fg-2">
                  <tr>
                    <th scope="col" className="sticky left-0 bg-muted px-4 py-3 font-medium">
                      Who
                    </th>
                    <th scope="col" className="px-4 py-3 font-medium">
                      What they say
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {WHO.map((w) => (
                    <tr key={w.org}>
                      <th
                        scope="row"
                        className="sticky left-0 bg-surface px-4 py-3 align-top font-medium text-fg"
                      >
                        <a href={w.src.url} target="_blank" rel="noopener" className={link}>
                          {w.org}
                        </a>
                      </th>
                      <td className="px-4 py-3 align-top text-fg-2">&ldquo;{w.quote}&rdquo;</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Flow
              label="How a behavioural round usually goes"
              steps={[
                {
                  title: 'The question',
                  body: '“Tell me about a time…”, often tied to a value (Amazon has 16 Leadership Principles).',
                },
                { title: 'Your story', body: 'One real example in STAR order, 1 to 2 minutes.' },
                {
                  title: 'Follow-ups',
                  body: '“What would you do differently?” “What was your part?” Have the details ready.',
                },
                {
                  title: 'Scoring',
                  body: 'In structured interviews, answers are scored against set benchmarks (US OPM).',
                },
              ]}
            />
            <P>
              Why employers bother: in{' '}
              <a href={SRC.sackett.url} target="_blank" rel="noopener" className={link}>
                Sackett and colleagues&apos; 2022 review
              </a>{' '}
              of hiring research, &ldquo;structured interviews emerged as the top-ranked selection
              procedure&rdquo; for predicting job performance. Amazon lists {AMAZON_LP_COUNT}{' '}
              <a href={SRC.amazonLp.url} target="_blank" rel="noopener" className={link}>
                Leadership Principles
              </a>
              ; the builder shows which ones each question tends to test.
            </P>
            <div>
              <div className={`${kicker} text-fg-3`}>
                Model answers for the most asked questions
              </div>
              <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {COMPETENCIES.filter((c) => c.href).map((c) => (
                  <li key={c.id}>
                    <Link
                      href={c.href!}
                      className="block h-full rounded-xl border border-border bg-surface px-4 py-3 transition-[border-color,box-shadow] duration-fast hover:border-border-strong hover:shadow-e2"
                    >
                      <span className="block text-caption text-fg-3">{c.name}</span>
                      <span className="mt-0.5 block text-small font-medium text-fg">
                        {c.question}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Section>

          <Section id="faq" meta={`FAQ · ${FAQ.length} questions`} title="Quick answers">
            <div className="space-y-3">
              {FAQ.map((f, i) => (
                <details
                  key={f.q}
                  open={i === 0}
                  className="group rounded-xl border border-border bg-surface open:shadow-e1"
                >
                  <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-medium text-fg">
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
                ['/interview-questions', 'Questions', 'Interview questions by role'],
                ['/resume-keyword-checker', 'Resume', 'Resume keyword checker'],
                ['/job-offer-comparison', 'Offer', 'Job offer comparison'],
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
              Sources (opened 16 Nov 2026):{' '}
              {Object.values(SRC).map((s, i) => (
                <span key={s.url}>
                  {i > 0 && '; '}
                  <a href={s.url} target="_blank" rel="noopener" className={link}>
                    {s.label}
                  </a>
                </span>
              ))}
              . Samples are fictional. Not affiliated with any employer named here.
            </p>
          </Section>
        </div>

        <MockInterviewCTA
          title="A story that reads well can still stumble out loud."
          body="A voice interviewer asks you behavioural questions, follows up on your answers (“what was your part?”), and tells you what was strong and what was thin."
          questions={[
            'Tell me about a time you worked under a tight deadline.',
            'Tell me about a conflict with a coworker and how you resolved it.',
            'Tell me about a time you failed. What did you learn?',
            'Tell me about a decision you made using data.',
          ]}
        />
      </div>
    </DomainLayout>
  )
}
