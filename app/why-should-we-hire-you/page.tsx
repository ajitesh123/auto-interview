import type { Metadata } from 'next'
import Link from 'next/link'
import DomainLayout from '@/components/domain/DomainLayout'
import type { ReactNode } from 'react'
import MockInterviewButton from '@/components/ai/MockInterviewButton'
import MockInterviewCTA from '@/components/ai/MockInterviewCTA'
import WswhyBuilder from '@/components/wswhyBuilder/WswhyBuilder'
import WswhySplit, { NeedMap } from '@/components/wswhyBuilder/WswhySplit'
import { Figure, Flow, Insight, RangeList, StatRow } from '@/components/viz'
import {
  analyse,
  DEFAULT_WPM,
  firstSentence,
  fmtSec,
  KEYS,
  LENGTHS,
  PARTS,
} from '@/data/wswhy/engine'
import { SAMPLES, STRONG, VARIANTS, WEAK } from '@/data/wswhy/samples'

const PAGE_URL = 'https://www.autointerviewai.com/why-should-we-hire-you'
const UPDATED = '2026-11-26'
const TITLE = 'Why Should We Hire You? Answer Builder + Examples'
const DESC =
  "Build your 'why should we hire you' answer in 3 parts: their need, your proof with a number, what you'd do first. Live timer and 9 checks. Free, no AI, no sign-up."

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

// Every quote below was opened and re-checked word for word on 26 Nov 2026.
const SRC = {
  naukri: {
    label: 'Naukri, Why should I hire you (7 Jan 2026)',
    url: 'https://www.naukri.com/blog/why-should-i-hire-you/',
  },
  penn: {
    label: 'Penn Career Services (14 Apr 2026)',
    url: 'https://careerservices.upenn.edu/blog/2026/04/14/effective-ways-to-answer-why-should-we-hire-you/',
  },
  roberthalf: {
    label: 'Robert Half (27 Sep 2024)',
    url: 'https://www.roberthalf.com/us/en/insights/landing-job/how-to-answer-why-should-we-hire-you',
  },
  walters: {
    label: 'Robert Walters (20 Jun 2025)',
    url: 'https://www.robertwalters.co.uk/insights/career-advice/blog/interview-question-why-we-should-hire-you.html',
  },
  bright: {
    label: 'Bright Network, graduate career advice',
    url: 'https://www.brightnetwork.co.uk/graduate-career-advice/telephone-video-interviews/how-to-answer-why-should-we-hire-you/',
  },
  alabama: {
    label: 'University of Alabama Career Center',
    url: 'https://career.sa.ua.edu/develop/interview-skills/interview-questions/strength-and-weakness-questions/',
  },
  ncs: {
    label: 'National Careers Service (UK government), Top 10 interview questions',
    url: 'https://nationalcareers.service.gov.uk/careers-advice/top-10-interview-questions',
  },
  muse: {
    label: 'The Muse (updated 30 Apr 2024)',
    url: 'https://www.themuse.com/advice/3-better-ways-to-answer-why-should-we-hire-you',
  },
  indeed: {
    label: 'Indeed for employers (21 Feb 2025)',
    url: 'https://www.indeed.com/hire/c/info/why-should-we-hire-you-interview-question',
  },
}

const GUIDANCE: { org: string; src: { label: string; url: string }; say: string; part: string }[] =
  [
    {
      org: 'Naukri',
      src: SRC.naukri,
      part: 'All three',
      say: 'The formula: “Strengths + Proof + Value for Company”.',
    },
    {
      org: 'Penn Career Services',
      src: SRC.penn,
      part: 'Match',
      say: '“When you focus on one compelling reason — grounded in the organization’s stated needs within the vacant role…”',
    },
    {
      org: 'Robert Half',
      src: SRC.roberthalf,
      part: 'Match',
      say: '“Connect your abilities directly to the job requirements.”',
    },
    {
      org: 'National Careers Service (UK)',
      src: SRC.ncs,
      part: 'Proof',
      say: '“Plan your answers around 2 or 3 examples that are relevant to the job.”',
    },
    {
      org: 'Robert Half',
      src: SRC.roberthalf,
      part: 'Proof',
      say: '“Remember, specific examples and numbers can make your answer more impactful.”',
    },
    {
      org: 'University of Alabama',
      src: SRC.alabama,
      part: 'Value',
      say: 'Summarise “Ways you believe you might contribute immediately”.',
    },
    {
      org: 'The Muse',
      src: SRC.muse,
      part: 'Value',
      say: '“Don’t spend all your time talking about the past.”',
    },
    {
      org: 'Robert Walters',
      src: SRC.walters,
      part: 'Value',
      say: '“End with a clear and positive statement about the value you bring.”',
    },
  ]

const MISTAKES: {
  mistake: string
  quote: string
  src: { label: string; url: string }
  check: string
}[] = [
  {
    mistake: 'Adjectives instead of proof',
    quote: 'Avoid general phrases like “I’m a hard worker” or “I’m good with people.”',
    src: SRC.walters,
    check: 'Shows it instead of claiming it',
  },
  {
    mistake: 'A list of skills',
    quote:
      '“A simple list of your skills is boring, and it doesn’t mean you actually have those skills.”',
    src: SRC.bright,
    check: 'Your proof has a number',
  },
  {
    mistake: 'Putting down the other candidates',
    quote: '“Don’t try to put down your competition to make yourself look better.”',
    src: SRC.bright,
    check: 'No putting down others',
  },
  {
    mistake: 'Why the job suits you',
    quote: '“Talk about what you can bring to the role, not why the role is right for you.”',
    src: SRC.bright,
    check: 'About them, not what you want',
  },
  {
    mistake: 'Sounding desperate',
    quote: '“Expressing desperation isn’t a winning strategy.”',
    src: SRC.roberthalf,
    check: 'About them, not what you want',
  },
  {
    mistake: 'Promising too much',
    quote: '“Exaggerations can backfire if you’re hired and can’t deliver.”',
    src: SRC.roberthalf,
    check: 'No over-claiming',
  },
  {
    mistake: 'Arrogance',
    quote: '“Confidence is good, but arrogance is off-putting.”',
    src: SRC.walters,
    check: 'No over-claiming',
  },
  {
    mistake: 'The same answer as everyone',
    quote: '“Responses to this question can often sound the same.”',
    src: SRC.alabama,
    check: 'Tied to what the job post asks for',
  },
]

const A_STRONG = analyse(STRONG.answer, STRONG.length, DEFAULT_WPM)
const A_WEAK = analyse(WEAK.answer, WEAK.length, DEFAULT_WPM)
const wordsAt = (sec: number) => Math.round((sec / 60) * DEFAULT_WPM)
const MORE = SAMPLES.filter((s) => s !== WEAK)

const FAQ = [
  {
    q: 'How do I answer "Why should we hire you?"',
    a: 'In three parts: name what the job needs most and the strength you bring to it, prove it with one or two things you did (with a number), and end on what you would do for them first. Naukri calls it “Strengths + Proof + Value for Company”; Penn Career Services advises one compelling reason grounded in the role’s stated needs.',
  },
  {
    q: 'How long should the answer be?',
    a: `Robert Walters says 30 to 60 seconds and Naukri 45 to 60; Robert Half allows one to two minutes, and The Muse says under two minutes. At ${DEFAULT_WPM} words a minute, 45 to 60 seconds is about ${wordsAt(45)} to ${wordsAt(60)} words. Start short; they will ask for more if they want it.`,
  },
  {
    q: 'How do I answer as a fresher with no experience?',
    a: 'Your proof is an internship, final-year project, hackathon, a fest or club you ran, or a part-time job, with one number you can defend (users, rows of data, people, money raised, followers, time saved). The fresher sample in the builder uses an internship bug fix and a college app. Then say what you could take off the team’s plate in your first months.',
  },
  {
    q: 'Should I say I am better than the other candidates?',
    a: 'No. You have not met them, and Bright Network says “Don’t try to put down your competition to make yourself look better.” Answer the “over other candidates” version by making your proof specific to this job, so the comparison makes itself.',
  },
  {
    q: 'Is it OK to say I am hard-working and a quick learner?',
    a: 'Only with proof. Robert Walters calls “I’m a hard worker” a general phrase that does not tell the interviewer much without specific examples. Replace the adjective with the thing you did: “I learned Power BI in two weeks to ship the store dashboard” shows quick learning.',
  },
  {
    q: 'How is this different from "Why do you want to work here?"',
    a: '“Why should we hire you” is about what you bring them. “Why do you want to work here” is about why their company appeals to you. Keep the learning-opportunity and company-reputation lines for the second question.',
  },
  {
    q: 'How do I pick the needs from a job post?',
    a: 'Read the first three bullets of the responsibilities and the requirements, and note any word that appears more than once. Those are usually what the hiring manager cares about most. Put 2 to 4 of them in the builder; Penn Career Services advises building the answer on one compelling reason grounded in the role’s stated needs.',
  },
  {
    q: 'What if I do not meet one of the requirements?',
    a: 'Do not lead with it and do not apologise. Build the answer on the needs you do meet, with proof, and if they ask about the gap, name the closest thing you have done and how you would close it (a course, a project, the first month on the job). Robert Half warns that “Exaggerations can backfire if you’re hired and can’t deliver”, so never claim a skill you cannot show.',
  },
  {
    q: 'Can I use the samples on this page as my answer?',
    a: 'Use them for the shape, not the words. They are fictional, and interviewers hear the same lines all day (Alabama’s career center notes responses “can often sound the same”). Load a sample, then replace every detail with your own.',
  },
  {
    q: 'Is my answer saved or sent anywhere?',
    a: 'It is saved only in this browser, so it is there when you come back. Nothing is uploaded and no AI reads your text: every check is a simple rule described on this page.',
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
  { id: 'samples', label: 'Sample answers' },
  { id: 'structure', label: 'What to say' },
  { id: 'length', label: 'How long' },
  { id: 'example', label: 'Weak vs strong' },
  { id: 'mistakes', label: 'Mistakes' },
  { id: 'variants', label: 'Other wordings' },
  { id: 'faq', label: 'FAQ' },
]

export default function WhyShouldWeHireYouPage() {
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Why Should We Hire You Answer Builder',
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
        { '@type': 'ListItem', position: 2, name: 'Why should we hire you', item: PAGE_URL },
      ],
    },
  ]

  const lab = (st: string) => (st === 'pass' ? 'Pass' : st === 'warn' ? 'Fix' : 'Fix first')

  return (
    <DomainLayout currentPath="/why-should-we-hire-you">
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
            <span className="text-fg-2">Why should we hire you</span>
          </nav>

          <header className="mt-8 grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <div className={`${kicker} text-signal-strong`}>
                Free tool · {A_STRONG.checks.length} checks · {SAMPLES.length - 1} sample answers ·
                No AI, no upload · Updated 26 Nov 2026
              </div>
              <h1 className="mt-4 font-serif text-display font-medium text-fg">
                &ldquo;Why should we hire you?&rdquo; answer builder
              </h1>
              <p className="mt-5 max-w-[56ch] text-body-lg text-fg-2">
                Answer in three parts: the thing this job needs most and your strength for it, one
                or two times you did it (with a number), and what you would do for them first. Keep
                it to 30 to 60 seconds, about {wordsAt(30)} to {wordsAt(60)} spoken words. Write
                yours below and see which of the job post&apos;s needs it covers, how long it runs
                out loud, and whether it slips into clichés.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#builder"
                  className="inline-flex h-12 items-center rounded-full bg-surface px-5 text-small font-semibold text-fg ring-1 ring-inset ring-border-strong transition-colors duration-fast hover:bg-muted"
                >
                  Build my answer
                </a>
                <a
                  href="#samples"
                  className="inline-flex h-12 items-center rounded-full px-4 text-small font-semibold text-signal-strong transition-colors duration-fast hover:bg-signal-tint"
                >
                  Read sample answers
                </a>
                <MockInterviewButton caption={false} label="Then say it: free mock interview" />
              </div>
            </div>

            <aside
              aria-label="The three parts of the answer"
              className="rounded-2xl border border-border bg-surface p-5 shadow-e1 md:p-6 lg:col-span-5"
            >
              <div className={`${kicker} text-fg-3`}>The three parts · fresher example</div>
              <ol className="mt-4 space-y-4">
                {KEYS.map((k, i) => (
                  <li key={k} className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-signal-tint font-mono text-small font-semibold text-signal-ink">
                      {i + 1}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-small font-semibold text-fg">
                        {PARTS[k].name} · {PARTS[k].ask.toLowerCase()}
                      </span>
                      <span className="block text-caption text-fg-2">
                        &ldquo;{firstSentence(STRONG.answer[k])}&rdquo;
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
              <div className="mt-5 border-t border-border pt-4">
                <div className={`${kicker} text-fg-3`}>Job post needs: {STRONG.answer.needs}</div>
                <div className="mt-2">
                  <NeedMap needs={A_STRONG.needs} />
                </div>
              </div>
              <p className="mt-4 text-caption text-fg-3">
                Fictional sample. {A_STRONG.totalWords} words, {fmtSec(A_STRONG.seconds)} at{' '}
                {DEFAULT_WPM} words a minute, {A_STRONG.passed} of {A_STRONG.checks.length} checks.
              </p>
            </aside>
          </header>

          <div className="mt-10 max-w-3xl rounded-xl bg-signal-tint p-5 ring-1 ring-inset ring-signal/15">
            <div className={`${kicker} text-signal-ink`}>TL;DR</div>
            <ul className="mt-3 space-y-2 text-body text-fg">
              <li>
                <strong className="font-semibold">Match, proof, value.</strong> Their biggest need
                and your strength for it; one or two results with a number; what you would do first.
              </li>
              <li>
                <strong className="font-semibold">30 to 60 seconds to start.</strong> Robert Walters
                says 30 to 60 seconds; none of the five sources we opened that give a length asks
                for more than about two minutes.
              </li>
              <li>
                <strong className="font-semibold">No adjectives, no comparisons.</strong> Skip
                &ldquo;hard-working&rdquo;, &ldquo;quick learner&rdquo; and &ldquo;better than other
                candidates&rdquo;; show the thing you did instead.
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
            meta="The builder · about 10 minutes"
            title="Write your answer, part by part"
            intro="Pick where you are, paste the 2 to 4 things the job post asks for most, then write each part. Not sure where to start? Load a sample and edit it."
          >
            <WswhyBuilder />
          </Section>

          <Section
            id="samples"
            meta={`Sample answers · ${MORE.length}, all fictional`}
            title="Sample answers for freshers, experienced hires, career switchers and interns"
            intro="Each one is run through the builder's checks. Use the shape; replace every detail with yours. Load any of them into the builder above to edit."
          >
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {MORE.map((s) => {
                const a = analyse(s.answer, s.length, DEFAULT_WPM)
                return (
                  <article
                    key={s.id}
                    className="flex min-w-0 flex-col rounded-xl border border-border bg-surface p-5"
                  >
                    <div className={`${kicker} text-fg-3`}>{s.note}</div>
                    <h3 className="mt-2 text-h4 font-semibold text-fg">{s.label}</h3>
                    <p className="mt-1 text-caption tabular-nums text-fg-3">
                      {a.totalWords} words · {fmtSec(a.seconds)} · {a.passed} of {a.checks.length}{' '}
                      checks
                    </p>
                    <div className="mt-3">
                      <WswhySplit words={a.words} />
                    </div>
                    <div className="mt-4 space-y-3 text-small leading-relaxed text-fg-2">
                      {KEYS.map((k) => (
                        <p key={k}>
                          <span className="font-semibold text-fg">{PARTS[k].name}. </span>
                          {s.answer[k]}
                        </p>
                      ))}
                    </div>
                  </article>
                )
              })}
            </div>
          </Section>

          <Section
            id="structure"
            meta={`What to say · ${GUIDANCE.length} quotes from career services and recruiters`}
            title="Their need, your proof, what you would do first"
            intro="The advice agrees: one strong reason tied to the job, backed by evidence, ending on the value you bring. Not your CV, not why you want the job."
          >
            <Flow
              label="The three parts, in order"
              steps={[
                {
                  title: '1 · Match',
                  body: 'The one or two things this job needs most, and that you bring them. One or two sentences.',
                },
                {
                  title: '2 · Proof',
                  body: 'One or two times you did it, each with a number. The biggest part.',
                },
                {
                  title: '3 · Value',
                  body: 'What you would take on first in this role. One sentence.',
                },
              ]}
            />
            <div
              className="overflow-x-auto rounded-xl border border-border bg-surface"
              role="region"
              aria-label="What career services and recruiters say"
              // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
              tabIndex={0}
            >
              <table className="w-full min-w-[640px] text-left text-small">
                <thead className="bg-muted text-fg-2">
                  <tr>
                    <th scope="col" className="sticky left-0 bg-muted px-4 py-3 font-medium">
                      Who
                    </th>
                    <th scope="col" className="px-4 py-3 font-medium">
                      Part
                    </th>
                    <th scope="col" className="px-4 py-3 font-medium">
                      In their words
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {GUIDANCE.map((g) => (
                    <tr key={g.say}>
                      <th
                        scope="row"
                        className="sticky left-0 bg-surface px-4 py-3 align-top font-medium text-fg"
                      >
                        <a href={g.src.url} target="_blank" rel="noopener" className={link}>
                          {g.org}
                        </a>
                      </th>
                      <td className="px-4 py-3 align-top text-fg-2">{g.part}</td>
                      <td className="px-4 py-3 align-top text-fg-2">{g.say}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-caption text-fg-3 md:hidden">Swipe the table sideways →</p>
            <P>
              What the interviewer is listening for: Indeed&apos;s guide for employers tells hiring
              managers to &ldquo;Listen for concrete examples and achievements.&rdquo; So the Proof
              part carries the most words here, and the builder asks for a number in it.
            </P>
          </Section>

          <Section
            id="length"
            meta="Answer length · 5 sources opened 26 Nov 2026"
            title="Start with 30 to 60 seconds; 2 minutes at most"
            intro="Recruiters lean short, career guides allow up to two minutes. A tight first answer leaves room for the follow-up questions."
          >
            <Figure
              label="Recommended length of a 'why should we hire you' answer, in minutes"
              title="Advice runs from 30 seconds to about 2 minutes"
              source={[SRC.walters, SRC.naukri, SRC.roberthalf, SRC.muse, SRC.alabama]}
              updated="Nov 2026"
              table={{
                head: ['Source', 'What it says', 'Minutes'],
                rows: [
                  [
                    'Robert Walters (recruiter)',
                    '“Aim for 30 to 60 seconds when speaking.”',
                    '0.5–1',
                  ],
                  [
                    'Naukri',
                    '“Around 45–60 seconds is enough to make your point clearly.”',
                    '0.75–1',
                  ],
                  [
                    'Robert Half (recruiter)',
                    '“Aim for a response that’s one to two minutes long.”',
                    '1–2',
                  ],
                  ['The Muse', 'Keep your answer “under two minutes”', 'under 2'],
                  [
                    'University of Alabama',
                    '“Your response should be about two minutes”',
                    'about 2',
                  ],
                ],
              }}
            >
              <RangeList
                domain={[0, 2.5]}
                ticks={5}
                format={{ suffix: ' min', decimals: 1 }}
                rule={{ value: 2, label: 'About two minutes: the longest any source suggests' }}
                rows={[
                  {
                    label: 'Robert Walters',
                    sub: 'recruiter',
                    min: 0.5,
                    max: 1,
                    display: '30–60 s',
                  },
                  { label: 'Naukri (India)', min: 0.75, max: 1, display: '45–60 s' },
                  { label: 'Robert Half', sub: 'recruiter', min: 1, max: 2, display: '1–2 min' },
                  { label: 'The Muse', sub: 'upper limit', min: 0, max: 2, display: 'under 2 min' },
                  {
                    label: 'Univ. of Alabama',
                    sub: 'about',
                    min: 1.75,
                    max: 2,
                    display: 'about 2 min',
                  },
                ]}
              />
            </Figure>
            <StatRow
              stats={[
                {
                  label: 'Words in 30 seconds',
                  value: `${wordsAt(30)}`,
                  sub: `A 30-second answer at ${DEFAULT_WPM} words a minute (our assumed calm pace)`,
                },
                {
                  label: 'Words in 45–60 seconds',
                  value: `${wordsAt(45)}–${wordsAt(60)}`,
                  sub: 'The full answer, Naukri’s range',
                },
                {
                  label: 'Our strong sample',
                  value: fmtSec(A_STRONG.seconds),
                  sub: `${A_STRONG.totalWords} words, ${A_STRONG.share.proof}% of them proof`,
                },
              ]}
            />
          </Section>

          <Section
            id="example"
            meta="Worked example · one fictional fresher, written twice"
            title={`Same student: ${A_WEAK.passed} of ${A_WEAK.checks.length} checks vs ${A_STRONG.passed} of ${A_STRONG.checks.length}`}
            intro="A final-year B.Tech student applying for a software engineer role that asks for Java, REST APIs and debugging. Both versions run through the same code as the builder."
          >
            <div className="grid gap-6 lg:grid-cols-2">
              {[
                { name: 'Weak version', a: A_WEAK },
                { name: 'Strong version', a: A_STRONG },
              ].map(({ name, a }) => (
                <Figure
                  key={name}
                  label={`${name} · ${a.totalWords} words · ${fmtSec(a.seconds)} at ${DEFAULT_WPM} wpm`}
                  title={`${a.passed} of ${a.checks.length} checks pass; ${a.needs.filter((n) => n.inProof).length} of ${a.needs.length} job needs proved`}
                  source="Auto Interview AI answer builder, run on a fictional answer"
                  updated="Nov 2026"
                  table={{
                    head: ['Part', 'Words', 'Share'],
                    rows: KEYS.map((k) => [PARTS[k].name, a.words[k], `${a.share[k]}%`]),
                  }}
                >
                  <WswhySplit words={a.words} />
                  <div className="mt-4">
                    <NeedMap needs={a.needs} />
                  </div>
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
                    <p className="px-4 pb-4 text-small leading-relaxed text-fg-2">{a.text}</p>
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
            <p className="text-caption text-fg-3 md:hidden">Swipe the table sideways →</p>
            <Insight title="The fix was evidence, not confidence">
              The weak version claims four qualities (hard worker, quick learner, passionate, better
              than others) and proves none; it ends on what the student wants. The strong one is{' '}
              {A_STRONG.totalWords - A_WEAK.totalWords} words longer and makes no claims at all: two
              Java APIs, a bug that was double-paying 40 drivers a week, an app with 1,200
              complaints filed, and the tickets the student could take on first.
            </Insight>
          </Section>

          <Section
            id="mistakes"
            meta={`Mistakes · ${MISTAKES.length} named by recruiters and career services`}
            title="What not to say, and the check that catches it"
            intro="Each one maps to a builder check, and most are caught as you type."
          >
            <div
              className="overflow-x-auto rounded-xl border border-border bg-surface"
              role="region"
              aria-label="Common mistakes"
              // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
              tabIndex={0}
            >
              <table className="w-full min-w-[680px] text-left text-small">
                <thead className="bg-muted text-fg-2">
                  <tr>
                    <th scope="col" className="sticky left-0 bg-muted px-4 py-3 font-medium">
                      Mistake
                    </th>
                    <th scope="col" className="px-4 py-3 font-medium">
                      In their words
                    </th>
                    <th scope="col" className="px-4 py-3 font-medium">
                      Builder check
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {MISTAKES.map((m) => (
                    <tr key={m.mistake}>
                      <th
                        scope="row"
                        className="sticky left-0 bg-surface px-4 py-3 align-top font-medium text-fg"
                      >
                        {m.mistake}
                      </th>
                      <td className="px-4 py-3 align-top text-fg-2">
                        {m.quote}{' '}
                        <a href={m.src.url} target="_blank" rel="noopener" className={link}>
                          {m.src.label.split(' (')[0].split(',')[0]}
                        </a>
                      </td>
                      <td className="px-4 py-3 align-top text-fg-2">{m.check}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-caption text-fg-3 md:hidden">Swipe the table sideways →</p>
          </Section>

          <Section
            id="variants"
            meta={`Other wordings · ${VARIANTS.length} versions of the question`}
            title="Same question, different words"
            intro="Interviewers rarely ask it the same way twice. The same three parts answer all of these."
          >
            <div
              className="overflow-x-auto rounded-xl border border-border bg-surface"
              role="region"
              aria-label="Variants of the question"
              // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
              tabIndex={0}
            >
              <table className="w-full min-w-[560px] text-left text-small">
                <thead className="bg-muted text-fg-2">
                  <tr>
                    <th scope="col" className="sticky left-0 bg-muted px-4 py-3 font-medium">
                      If they say
                    </th>
                    <th scope="col" className="px-4 py-3 font-medium">
                      Adjust the answer
                    </th>
                    <th scope="col" className="px-4 py-3 font-medium">
                      Seen in
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {VARIANTS.map((v) => (
                    <tr key={v.q}>
                      <th
                        scope="row"
                        className="sticky left-0 bg-surface px-4 py-3 align-top font-medium text-fg"
                      >
                        &ldquo;{v.q}&rdquo;
                      </th>
                      <td className="px-4 py-3 align-top text-fg-2">{v.adjust}</td>
                      <td className="px-4 py-3 align-top text-fg-2">
                        <a href={v.seen.url} target="_blank" rel="noopener" className={link}>
                          {v.seen.label}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-caption text-fg-3 md:hidden">Swipe the table sideways →</p>
            <P>
              It often comes right after the opener, so build that one too with the{' '}
              <Link href="/tell-me-about-yourself" className={link}>
                &ldquo;Tell me about yourself&rdquo; builder
              </Link>
              . Your Proof part doubles as a story for the &ldquo;Tell me about a
              time&hellip;&rdquo; questions: expand it with the{' '}
              <Link href="/star-method" className={link}>
                STAR answer builder
              </Link>
              . More on this question, with examples by job type, in our{' '}
              <Link href="/interview-questions/behavioral/why-should-we-hire-you" className={link}>
                behavioural question guide
              </Link>
              .
            </P>
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
                ['/tell-me-about-yourself', 'Opener', 'Tell me about yourself builder'],
                ['/star-method', 'Next question', 'STAR answer builder'],
                ['/interview-prep-plan', 'Plan', 'Interview prep plan by date'],
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
              Sources (opened and quotes re-checked 26 Nov 2026):{' '}
              {Object.values(SRC).map((s, i) => (
                <span key={s.url}>
                  {i > 0 && '; '}
                  <a href={s.url} target="_blank" rel="noopener" className={link}>
                    {s.label}
                  </a>
                </span>
              ))}
              . Length guidance for the targets: {LENGTHS.short.who}; {LENGTHS.standard.who}.
              Samples are fictional. Not affiliated with any organisation named here.
            </p>
          </Section>
        </div>

        <MockInterviewCTA
          title="Now say it to someone who pushes back."
          body="A voice interviewer asks “Why should we hire you?”, follows up on your proof (“how did you measure that?”), and tells you what landed and what ran long."
          questions={[
            'Why should we hire you?',
            'Why should we hire you over other candidates?',
            'What would you do in your first 90 days?',
            'Tell me about yourself.',
          ]}
        />
      </div>
    </DomainLayout>
  )
}
