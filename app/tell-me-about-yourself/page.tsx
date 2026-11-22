import type { Metadata } from 'next'
import Link from 'next/link'
import DomainLayout from '@/components/domain/DomainLayout'
import type { ReactNode } from 'react'
import MockInterviewButton from '@/components/ai/MockInterviewButton'
import MockInterviewCTA from '@/components/ai/MockInterviewCTA'
import TmayBuilder from '@/components/tmayBuilder/TmayBuilder'
import TmaySplit from '@/components/tmayBuilder/TmaySplit'
import { Figure, Flow, Insight, RangeList, StatRow } from '@/components/viz'
import {
  analyse,
  DEFAULT_WPM,
  firstSentence,
  fmtSec,
  LENGTHS,
  ORDERS,
  PARTS,
} from '@/data/tmay/engine'
import { STRONG, VARIANTS, WEAK } from '@/data/tmay/samples'

const PAGE_URL = 'https://www.autointerviewai.com/tell-me-about-yourself'
const UPDATED = '2026-11-22'
const TITLE = 'Tell Me About Yourself: Answer Builder With a Timer'
const DESC =
  "Build your 'tell me about yourself' answer in three parts and see how long it runs out loud, plus 8 checks: life story, resume recital, numbers, this job. Free."

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
  google: {
    label: 'Grow with Google, How to prepare for an interview (11 Dec 2025)',
    url: 'https://grow.google/certificates/interview-warmup/',
  },
  tufts: {
    label: 'Tufts University Alumni (22 Dec 2025)',
    url: 'https://alumniandfriends.tufts.edu/news/how-answer-tell-me-about-yourself-interview-question',
  },
  penn: {
    label: 'Penn Career Services (2 Apr 2026)',
    url: 'https://careerservices.upenn.edu/blog/2026/04/02/how-to-answer-tell-me-about-yourself/',
  },
  grinnell: {
    label: 'Grinnell College Career Center',
    url: 'https://career.grinnell.edu/?p=115977',
  },
  nidirect: {
    label: 'nidirect (Northern Ireland Government), Common interview questions (1 Oct 2024)',
    url: 'https://www.nidirect.gov.uk/articles/common-interview-questions',
  },
  naukri: {
    label: 'Naukri, Tell me about yourself (16 Jan 2026)',
    url: 'https://www.naukri.com/career-advice/tell-me-about-yourself',
  },
  warwick: {
    label: 'University of Warwick Careers (11 Apr 2025)',
    url: 'https://warwick.ac.uk/services/careers/blog/how_to_answer_tell_me_about_yourself_in_an_interview',
  },
  kcl: {
    label: "King's College London Careers",
    url: 'https://blogs.kcl.ac.uk/kingscareers/tell-me-about-yourself-how-to-answer-this-question-at-interview',
  },
  osu: {
    label: 'Ohio State Engineering Career Services',
    url: 'https://ecs.osu.edu/blog/2019/09/tell-me-about-yourself-what-do-you-want-know',
  },
  pennwest: {
    label: 'PennWest Career Center (27 Feb 2026)',
    url: 'https://career.pennwest.edu/blog/2026/02/27/how-to-answer-the-tell-me-about-yourself-question-develop-an-elevator-pitch/',
  },
  deloitte: {
    label: 'Deloitte US, Interview tips',
    url: 'https://www.deloitte.com/us/en/careers/about-deloitte-careers-interview-tips.html',
  },
  brandeis: {
    label: 'Brandeis University Graduate Affairs (adapted from The Muse)',
    url: 'https://www.brandeis.edu/graduate-affairs/career-professional/tell-about-yourself.html',
  },
  naukriFreshers: {
    label: 'Naukri, Tell me about yourself for freshers (19 Apr 2024)',
    url: 'https://www.naukri.com/blog/tell-me-about-yourself-for-freshers/',
  },
  melbourne: {
    label: 'University of Melbourne Academic Skills, Speaking clearly',
    url: 'https://students.unimelb.edu.au/academic-skills/communication-skills-study-assessment/oral-assessments/speaking-clearly',
  },
}

// What each source says, in its own words (opened 22 Nov 2026).
const GUIDANCE: {
  org: string
  src: { label: string; url: string }
  structure: string
  say: string
}[] = [
  {
    org: 'Penn Career Services',
    src: SRC.penn,
    structure: 'Past → present → future',
    say: '“how you got here, what you are doing now, and what you want next.” Present-first works too.',
  },
  {
    org: 'Grinnell College',
    src: SRC.grinnell,
    structure: 'Past → present → future',
    say: 'It is “NOT an opportunity to narrate your resume.”',
  },
  {
    org: 'Tufts University Alumni',
    src: SRC.tufts,
    structure: 'Past → present → future',
    say: '“Your career narrative is not chronological storytelling. It’s a purposeful progression.”',
  },
  {
    org: 'PennWest Career Center',
    src: SRC.pennwest,
    structure: 'Present → past → future',
    say: '“include only the parts that are relevant to the position you’ve applied for.”',
  },
  {
    org: 'nidirect (UK government)',
    src: SRC.nidirect,
    structure: '4 or 5 things relevant to the job',
    say: '“The interviewer is not looking for your life story.”',
  },
  {
    org: 'Ohio State Engineering',
    src: SRC.osu,
    structure: 'Name and degree → academic summary → link to the job',
    say: '“irrelevant personal information is not necessary to include”',
  },
  {
    org: "King's College London",
    src: SRC.kcl,
    structure: 'Three key points',
    say: '“Mention the interests and skills you have that will make you an asset to the company”',
  },
  {
    org: 'Deloitte US',
    src: SRC.deloitte,
    structure: 'Background, strengths, goals, what sets you apart',
    say: 'Interviews “often start with a general question like ‘Tell me about yourself.’”',
  },
]

const A_STRONG = analyse(STRONG.answer, STRONG.order, STRONG.length, DEFAULT_WPM)
const A_WEAK = analyse(WEAK.answer, WEAK.order, WEAK.length, DEFAULT_WPM)
const wordsAt = (sec: number) => Math.round((sec / 60) * DEFAULT_WPM)

const FAQ = [
  {
    q: 'How do I answer "Tell me about yourself"?',
    a: 'In three parts: who you are now (your role or degree and one strength), one or two things you have done that prove you fit the job, with a number, and why this job is your next step. Penn, Grinnell, Tufts, PennWest and Brandeis career services all teach a version of this present-past-future structure. End on the job, not on your hobbies.',
  },
  {
    q: 'How long should my answer be?',
    a: `Most guidance lands between 30 seconds and 2 minutes: Grow with Google’s elevator-pitch advice says 30 to 60 seconds, Penn 30 to 90, Tufts 60 to 90 at most, and nidirect (UK government) under two minutes. At ${DEFAULT_WPM} words a minute, 60 to 90 seconds is about ${wordsAt(60)} to ${wordsAt(90)} words. Keep a 30-second version too.`,
  },
  {
    q: 'Should I start with my name?',
    a: 'In most interviews they already know it, so start with who you are now. In Indian campus HR rounds, where the question is often “Introduce yourself”, it is normal to begin with your name and degree (Naukri and Ohio State both suggest it), then move straight to the three parts. Naukri also suggests saying where you are from; keep that to one clause, not your family or school.',
  },
  {
    q: 'What should I not say?',
    a: 'Your life story: age, family, hometown, school marks, marital status or hobbies that have nothing to do with the job. nidirect says “The interviewer is not looking for your life story,” and Ohio State calls irrelevant personal information unnecessary. Also avoid reading out your CV year by year; Grinnell says the question is not an opportunity to narrate your resume.',
  },
  {
    q: 'How do freshers answer with no work experience?',
    a: 'Use an internship, final-year project, hackathon, a fest or club you ran, or a part-time job as your proof, with one number (users, rows of data, people, money raised, time saved). The fresher sample in the builder uses an internship and a college project. Then say why this role, in one or two sentences.',
  },
  {
    q: 'Is "Walk me through your resume" the same question?',
    a: 'Nearly. Penn and Grinnell list it as a variant. Use the past-first order and still choose only the two or three stops that matter for this job. Say why each move happened in a clause, then end on why this role is next.',
  },
  {
    q: 'Should I memorise my answer word for word?',
    a: 'No. Write it, time it, then say it from the three part headings so it sounds like you, not a recital. The builder’s short version (the first line of each part) works as speaker notes.',
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
  { id: 'length', label: 'How long' },
  { id: 'structure', label: 'What to say' },
  { id: 'example', label: 'Weak vs strong' },
  { id: 'variants', label: 'Other wordings' },
  { id: 'faq', label: 'FAQ' },
]

export default function TellMeAboutYourselfPage() {
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Tell Me About Yourself Answer Builder',
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
        { '@type': 'ListItem', position: 2, name: 'Tell me about yourself', item: PAGE_URL },
      ],
    },
  ]

  const std = LENGTHS.standard
  const lab = (st: string) => (st === 'pass' ? 'Pass' : st === 'warn' ? 'Fix' : 'Fix first')

  return (
    <DomainLayout currentPath="/tell-me-about-yourself">
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
            <span className="text-fg-2">Tell me about yourself</span>
          </nav>

          <header className="mt-8 grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <div className={`${kicker} text-signal-strong`}>
                Free tool · 8 checks · 11 sources quoted · No AI, no upload · Updated 22 Nov 2026
              </div>
              <h1 className="mt-4 font-serif text-display font-medium text-fg">
                &ldquo;Tell me about yourself&rdquo; answer builder
              </h1>
              <p className="mt-5 max-w-[56ch] text-body-lg text-fg-2">
                Answer in three parts: who you are now, one or two things you have done that prove
                you fit (with a number), and why this job. Keep it to 60 to 90 seconds, about{' '}
                {wordsAt(std.min)} to {wordsAt(std.max)} spoken words. Write yours below and see, as
                you type, how long it runs out loud and whether it slips into your life story or
                your CV.
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
              aria-label="The three parts of the answer"
              className="rounded-2xl border border-border bg-surface p-5 shadow-e1 md:p-6 lg:col-span-5"
            >
              <div className={`${kicker} text-fg-3`}>The three parts · fresher example</div>
              <ol className="mt-4 space-y-4">
                {ORDERS['present-first'].keys.map((k, i) => (
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
                <strong className="font-semibold">Three parts, about 60 to 90 seconds.</strong>{' '}
                Present, past, future (or past first). No guide we opened goes past 2 minutes.
              </li>
              <li>
                <strong className="font-semibold">Proof, not a CV tour.</strong> Pick one or two
                things you did for this kind of job and give one number.
              </li>
              <li>
                <strong className="font-semibold">Leave out the life story</strong> (family,
                hometown, school marks) and end on why this role.
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
            intro="Pick where you are, add the role and a few skills from the job post, then write each part. Not sure where to start? Load a sample and edit it."
          >
            <TmayBuilder />
          </Section>

          <Section
            id="length"
            meta="Answer length · 6 sources opened 22 Nov 2026"
            title="Aim for 60 to 90 seconds; never past 2 minutes"
            intro="Guides differ on the low end, from 30 seconds for an elevator pitch to 2 minutes, but none we opened goes past two."
          >
            <Figure
              label="Recommended length of a 'tell me about yourself' answer, in minutes"
              title="Most advice sits between 30 seconds and 2 minutes"
              source={[SRC.google, SRC.penn, SRC.tufts, SRC.naukri, SRC.nidirect, SRC.grinnell]}
              updated="Nov 2026"
              table={{
                head: ['Source', 'What it says', 'Minutes'],
                rows: [
                  [
                    'Grow with Google (elevator pitch)',
                    '“Aim for a succinct 30-60 second professional pitch”',
                    '0.5–1',
                  ],
                  [
                    'Penn Career Services',
                    '“about 30 to 90 seconds”; two minutes “can start to feel like too much”',
                    '0.5–1.5',
                  ],
                  ['Tufts University Alumni', '“60 to 90 seconds max”', '1–1.5'],
                  ['Naukri', '“around 200–250 words”, “1–2 minutes”', '1–2'],
                  ['nidirect (UK government)', '“Keep your answer under two minutes.”', 'under 2'],
                  [
                    'Grinnell College',
                    '“about 30 seconds”; trim it “if you go over the two-minute mark”',
                    'about 0.5, under 2',
                  ],
                ],
              }}
            >
              <RangeList
                domain={[0, 2.5]}
                ticks={5}
                format={{ suffix: ' min', decimals: 1 }}
                rule={{ value: 2, label: 'Under 2 min (nidirect, Grinnell)' }}
                rows={[
                  {
                    label: 'Grow with Google',
                    sub: 'elevator pitch',
                    min: 0.5,
                    max: 1,
                    display: '30–60 s',
                  },
                  { label: 'Penn Career Services', min: 0.5, max: 1.5, display: '30–90 s' },
                  { label: 'Tufts Alumni', sub: 'maximum', min: 1, max: 1.5, display: '60–90 s' },
                  { label: 'Naukri (India)', min: 1, max: 2, display: '1–2 min' },
                ]}
              />
            </Figure>
            <StatRow
              stats={[
                {
                  label: 'Words in 30 seconds',
                  value: `${wordsAt(30)}`,
                  sub: `At ${DEFAULT_WPM} words a minute: the short version`,
                },
                {
                  label: 'Words in 60–90 seconds',
                  value: `${wordsAt(60)}–${wordsAt(90)}`,
                  sub: 'The full answer',
                },
                {
                  label: 'Comfortable pace for listeners',
                  value: '150–160',
                  sub: 'Words a minute (University of Melbourne)',
                  href: SRC.melbourne.url,
                },
              ]}
            />
            <P>
              Naukri&apos;s 200 to 250 words is the long end: at {DEFAULT_WPM} words a minute that
              is {fmtSec((200 / DEFAULT_WPM) * 60)} to {fmtSec((250 / DEFAULT_WPM) * 60)}. Most
              people speak faster when nervous, so the builder lets you read your answer aloud once
              and times it at your real pace.
            </P>
          </Section>

          <Section
            id="structure"
            meta={`What to say · ${GUIDANCE.length} career services and employers, quoted`}
            title="Present, past, future, and nothing about your family"
            intro="The order varies; the advice does not. Pick what is relevant to this job, show proof, and end on why you want it."
          >
            <Flow
              label="The three parts, in the order most guides teach"
              steps={[
                {
                  title: '1 · Present',
                  body: 'Your role or degree now, and the strength this job needs. One or two sentences.',
                },
                {
                  title: '2 · Past',
                  body: 'One or two things you did that prove it, with a number. The biggest part.',
                },
                {
                  title: '3 · Future',
                  body: 'Why this role and this company, tied to what you just said.',
                },
              ]}
            />
            <div
              className="overflow-x-auto rounded-xl border border-border bg-surface"
              role="region"
              aria-label="What career services and employers say"
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
                      Structure
                    </th>
                    <th scope="col" className="px-4 py-3 font-medium">
                      In their words
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {GUIDANCE.map((g) => (
                    <tr key={g.org}>
                      <th
                        scope="row"
                        className="sticky left-0 bg-surface px-4 py-3 align-top font-medium text-fg"
                      >
                        <a href={g.src.url} target="_blank" rel="noopener" className={link}>
                          {g.org}
                        </a>
                      </th>
                      <td className="px-4 py-3 align-top text-fg-2">{g.structure}</td>
                      <td className="px-4 py-3 align-top text-fg-2">{g.say}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-caption text-fg-3 md:hidden">Swipe the table sideways →</p>
            <P>
              Why they ask: Grinnell calls it &ldquo;usually the first question in any
              interview&rdquo;, and{' '}
              <a href={SRC.warwick.url} target="_blank" rel="noopener" className={link}>
                Warwick
              </a>{' '}
              says it is &ldquo;designed to break the ice&rdquo;. That makes it the one answer you
              can fully prepare, and the first impression the rest of the interview builds on.
            </P>
          </Section>

          <Section
            id="example"
            meta="Worked example · one fictional fresher, written twice"
            title={`Same student: ${A_WEAK.passed} of 8 checks vs ${A_STRONG.passed} of 8`}
            intro="A final-year B.Tech student applying for a data analyst role. Both versions are run through the same code as the builder."
          >
            <div className="grid gap-6 lg:grid-cols-2">
              {[
                { name: 'Weak version', s: WEAK, a: A_WEAK },
                { name: 'Strong version', s: STRONG, a: A_STRONG },
              ].map(({ name, s, a }) => (
                <Figure
                  key={name}
                  label={`${name} · ${a.totalWords} words · ${fmtSec(a.seconds)} at ${DEFAULT_WPM} wpm`}
                  title={`${a.passed} of ${a.checks.length} checks pass; the proof is ${a.share.past}% of it`}
                  source="Auto Interview AI answer builder, run on a fictional answer"
                  updated="Nov 2026"
                  table={{
                    head: ['Part', 'Words', 'Share'],
                    rows: ORDERS[s.order].keys.map((k) => [
                      PARTS[k].name,
                      a.words[k],
                      `${a.share[k]}%`,
                    ]),
                  }}
                >
                  <TmaySplit words={a.words} order={s.order} />
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
            <Insight title="The fix was choosing, not adding">
              The weak version spends its time on family, school marks and four years in date order,
              and ends on &ldquo;a reputed company&rdquo;. The strong one is{' '}
              {A_STRONG.totalWords - A_WEAK.totalWords} words longer but every sentence is about the
              job: a strength, an internship with a number (9% of dairy stock expiring), a project
              600 students use, and why this role.
            </Insight>
          </Section>

          <Section
            id="variants"
            meta={`Other wordings · ${VARIANTS.length} versions of the question`}
            title="Same question, different words"
            intro="Interviewers rarely say it the same way twice. The same three parts answer all of these."
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
            <P>
              Froze on this question in a real interview? Our{' '}
              <Link href="/blog/blanked-on-tell-me-about-yourself-recovery-script" className={link}>
                recovery script for when you blank
              </Link>{' '}
              covers what to say in the moment. For the &ldquo;Tell me about a time&hellip;&rdquo;
              questions that usually come next, use the{' '}
              <Link href="/star-method" className={link}>
                STAR answer builder
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
                ['/star-method', 'Next question', 'STAR answer builder'],
                ['/interview-prep-plan', 'Plan', 'Interview prep plan by date'],
                ['/interview-questions', 'Questions', 'Interview questions by role'],
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
              Sources (opened 22 Nov 2026):{' '}
              {Object.values(SRC).map((s, i) => (
                <span key={s.url}>
                  {i > 0 && '; '}
                  <a href={s.url} target="_blank" rel="noopener" className={link}>
                    {s.label}
                  </a>
                </span>
              ))}
              . Samples are fictional. Not affiliated with any organisation named here.
            </p>
          </Section>
        </div>

        <MockInterviewCTA
          title="It sounds different out loud, to a stranger."
          body="A voice interviewer opens with “Tell me about yourself”, follows up on what you said (“why are you leaving?”), and tells you what landed and what ran long."
          questions={[
            'Tell me about yourself.',
            'Walk me through your resume.',
            'Why do you want this role?',
            'Why should we hire you?',
          ]}
        />
      </div>
    </DomainLayout>
  )
}
