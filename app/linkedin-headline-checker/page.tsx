import type { Metadata } from 'next'
import Link from 'next/link'
import type { ReactNode } from 'react'
import DomainLayout from '@/components/domain/DomainLayout'
import MockInterviewButton from '@/components/ai/MockInterviewButton'
import MockInterviewCTA from '@/components/ai/MockInterviewCTA'
import HeadlineChecker from '@/components/linkedinHeadline/HeadlineChecker'
import HeadlineMeter from '@/components/linkedinHeadline/HeadlineMeter'
import { ColumnChart, Figure, Flow, Insight, StatRow } from '@/components/viz'
import {
  analyse,
  BUZZ_2017,
  BUZZ_LEARNING,
  LIMIT,
  PREVIEW,
  SOURCES,
} from '@/data/linkedinHeadline/engine'
import { FRESHER, PAIRS, toInput } from '@/data/linkedinHeadline/samples'

const PAGE_URL = 'https://www.autointerviewai.com/linkedin-headline-checker'
const UPDATED = '2026-11-23'
const TITLE = 'LinkedIn Headline Checker: 10 Free Checks + Examples'
const DESC =
  'Paste your LinkedIn headline and get 10 rule checks: the 220-character limit, your role up front, skills, a result, LinkedIn’s overused buzzwords. Examples for freshers. Free, no sign-up.'

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

const S = SOURCES
// Third-party estimates of the cut-off, opened 23 Nov 2026; neither says how it measured.
const THIRD = {
  tc: 'https://textcountify.com/linkedin-headline-character-counter',
  wf: 'https://wildandfreetools.com/blog/linkedin-headline-character-limit-220/',
}

// What career services say, in their own words (all opened 23 Nov 2026).
const GUIDANCE: { org: string; src: { label: string; url: string }; say: string; take: string }[] =
  [
    {
      org: 'MIT CAPD',
      src: S.mit,
      say: '“Your headline is one of the most highly weighted elements in the LinkedIn search.”',
      take: 'Put the words you want to be found for here.',
    },
    {
      org: 'University of Washington',
      src: S.uw,
      say: '“A role you are currently or were in, 1 to 3 skills, and/or a result, accomplishment or future aspiration.”',
      take: 'Role, a few skills, one result.',
    },
    {
      org: 'University of Florida',
      src: S.uf,
      say: '“the headline is keyword searchable, so incorporate keywords that you’d like to be found by here.”',
      take: 'Use the job post’s words.',
    },
    {
      org: 'UC Berkeley School of Information',
      src: S.berkeley,
      say: '“Make your headline forward-looking and related to your target career goals”',
      take: 'Write for the job you want next.',
    },
    {
      org: 'University of Notre Dame',
      src: S.notreDame,
      say: '“Avoid the default “Student at University of Notre Dame.””',
      take: 'Replace the auto-filled line.',
    },
    {
      org: 'UConn',
      src: S.uconn,
      say: 'Students can state future goals “(using the word “aspiring”)”.',
      take: '“Aspiring Data Analyst” is fine.',
    },
    {
      org: 'Texas Tech Career Center',
      src: S.ttu,
      say: '“Recruiters often search by current role or headline.” Example: “Finance Student | Aspiring Financial Analyst”.',
      take: 'Do not invent a title; say what you aim for.',
    },
    {
      org: 'Carnegie Mellon SCS',
      src: S.cmu,
      say: 'Example: “Carnegie Mellon | Electrical & Computer Engineering Grad Student | Seeking Software Engineering Internship”.',
      take: '“Seeking” is fine when it names the role.',
    },
    {
      org: 'Naukri Campus (India)',
      src: S.naukri,
      say: 'Example: “Computer Science Graduate | Aspiring Software Developer | Java | Python”.',
      take: 'Specialisation, target role, skills.',
    },
    {
      org: 'The Muse (via UC San Diego)',
      src: S.muse,
      say: '“Phrases like “seeking opportunities” without context don’t say enough about what you bring to the table.”',
      take: 'Drop generic job-hunt phrases.',
    },
  ]

const RESULTS = PAIRS.map((p) => ({
  p,
  weak: analyse(toInput(p, 'weak')),
  strong: analyse(toInput(p, 'strong')),
}))
const CS = RESULTS[0]
const STRONG_MIN = Math.min(...RESULTS.map((r) => r.strong.passed))
const ROLE_MISSING = RESULTS.filter(
  (r) => r.weak.checks.find((c) => c.id === 'role')?.status !== 'pass'
).length
const NUM_WORD = ['zero', 'one', 'two', 'three', 'four', 'five']
const STAGE_NAME: Record<string, string> = {
  'cs-fresher': 'CS fresher',
  'commerce-fresher': 'Commerce fresher',
  pm: 'Product manager',
  switcher: 'Teacher → Instr. designer',
  between: 'Between jobs',
}

const FAQ = [
  {
    q: 'How long can a LinkedIn headline be?',
    a: `${LIMIT} characters. LinkedIn’s own Talent Blog says “You get 220 characters”, and UC Berkeley’s guide says the same. Some guides still say 120, which was the older limit. Use the room for your role, 1 to 3 skills and one result, but keep the role inside the first ${PREVIEW} or so characters, because comments and phone search show only the start.`,
  },
  {
    q: 'What should a fresher put in their LinkedIn headline?',
    a: 'The role you want with “Aspiring”, your degree or college, two or three skills from job posts, and one project with a number. For example: “Aspiring Software Developer | Final-year B.Tech CSE | Java · Spring Boot · SQL | Built a canteen pre-order app used by 600 students”. UConn and Texas Tech both suggest “aspiring” so it does not read as a title you hold.',
  },
  {
    q: 'Should my headline just be my job title?',
    a: 'LinkedIn fills it in from your latest position (“Title at Company”), so many people never change it. It is searchable, but it says nothing about your skills or results. Keep the title first if it is the role you want, then add skills and one result.',
  },
  {
    q: 'Should I write “Open to work” or “Seeking opportunities” in my headline?',
    a: 'Use LinkedIn’s Open to Work setting instead; it can be shown to recruiters only (Coursera describes the Recruiters-only option and the green #OpenToWork photo frame). In the headline, generic phrases waste characters; The Muse says they “don’t say enough about what you bring to the table.” Naming the role is different: Carnegie Mellon’s example ends with “Seeking Software Engineering Internship”.',
  },
  {
    q: 'What do I write if I am unemployed?',
    a: 'The role you do, not your status: “Data Analyst | SQL · Power BI · Python | Dashboards that saved a retail ops team 10 hours a week”. Recruiters search by role and skills, so those words do more for you than “unemployed” or “actively seeking”.',
  },
  {
    q: 'Can I use emojis or bold text in my headline?',
    a: 'Emojis do not help search and The Muse advises skipping them. Bold or italic “fonts” made with Unicode are a bigger problem: they are different characters from plain letters (the Mathematical Alphanumeric Symbols block), so someone searching for “Data Analyst” will not match “𝗗𝗮𝘁𝗮 𝗔𝗻𝗮𝗹𝘆𝘀𝘁”.',
  },
  {
    q: 'Which words should I avoid?',
    a: `LinkedIn’s own lists of overused profile words: ${BUZZ_LEARNING.join(', ')} (LinkedIn Learning), plus Focused, Certified and Excellent from its 2017 analysis of 400 million profiles reported by CBS News. Replace them with a skill or a result. “Certified” is fine inside a real credential, such as “AWS Certified Solutions Architect”, and the checker allows that.`,
  },
  {
    q: 'Should I write “Immediate joiner”, my notice period or “2+ YOE”?',
    a: 'The checker does not flag them. They tell an Indian recruiter when you can start or how senior you are, which matters for roles that must be filled fast, but they are not skills anyone searches for first. If you use one, put it last, after your role, skills and result.',
  },
  {
    q: 'Should I add my college and batch, like “IIM Indore ’26”?',
    a: 'Yes, if it helps you: Carnegie Mellon’s own example headline starts with “Carnegie Mellon”. Put it after the role you want, so the role stays in the first 50 or so characters. The checker does not count a batch year as a result.',
  },
  {
    q: 'Where do I change my headline?',
    a: 'On your profile, select the pencil icon in your intro section (the part with your name and photo); Headline is one of the fields there, on the app and on desktop. LinkedIn’s help page for this could not be opened by our tools, so follow the labels on your screen.',
  },
  {
    q: 'Is my headline saved or sent anywhere?',
    a: 'It is saved only in this browser so it is there when you come back. Nothing is uploaded and no AI reads it: every check is a simple rule explained on this page.',
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
  { id: 'checker', label: 'Checker' },
  { id: 'length', label: '220 characters' },
  { id: 'what-to-write', label: 'What to write' },
  { id: 'examples', label: 'Before & after' },
  { id: 'fresher-examples', label: 'Fresher examples' },
  { id: 'buzzwords', label: 'Words to cut' },
  { id: 'open-to-work', label: 'Open to work' },
  { id: 'faq', label: 'FAQ' },
]

export default function LinkedInHeadlineCheckerPage() {
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'LinkedIn Headline Checker',
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
        { '@type': 'ListItem', position: 2, name: 'LinkedIn headline checker', item: PAGE_URL },
      ],
    },
  ]

  const lab = (st: string) => (st === 'pass' ? 'Pass' : st === 'warn' ? 'Fix' : 'Fix first')

  return (
    <DomainLayout currentPath="/linkedin-headline-checker">
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
            <span className="text-fg-2">LinkedIn headline checker</span>
          </nav>

          <header className="mt-8 grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <div className={`${kicker} text-signal-strong`}>
                Free tool · 10 checks · {GUIDANCE.length} career services quoted · No AI, no sign-up
                · Updated 23 Nov 2026
              </div>
              <h1 className="mt-4 font-serif text-display font-medium text-fg">
                LinkedIn headline checker
              </h1>
              <p className="mt-5 max-w-[56ch] text-body-lg text-fg-2">
                A good headline is the role you want, 1 to 3 skills and one result, in under {LIMIT}{' '}
                characters, with the role in the first {PREVIEW} or so. Paste yours to see what a
                recruiter&apos;s search and a phone screen see, and which of LinkedIn&apos;s own
                overused words to cut.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#checker"
                  className="inline-flex h-12 items-center rounded-full bg-surface px-5 text-small font-semibold text-fg ring-1 ring-inset ring-border-strong transition-colors duration-fast hover:bg-muted"
                >
                  Check my headline
                </a>
                <MockInterviewButton caption={false} label="Got the call? Free mock interview" />
              </div>
            </div>

            <aside
              aria-label="Before and after example"
              className="rounded-2xl border border-border bg-surface p-5 shadow-e1 md:p-6 lg:col-span-5"
            >
              <div className={`${kicker} text-fg-3`}>Same fresher · fictional</div>
              {[
                { name: 'Default', h: CS.p.weak, r: CS.weak },
                { name: 'Rewritten', h: CS.p.strong, r: CS.strong },
              ].map((x) => (
                <div key={x.name} className="mt-4 first:mt-4">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-small font-semibold text-fg">{x.name}</span>
                    <span className="text-caption tabular-nums text-fg-3">
                      {x.r.passed} of 10 checks · {x.r.chars} chars
                    </span>
                  </div>
                  <p className="mt-1 text-small text-fg-2">&ldquo;{x.h}&rdquo;</p>
                  <div className="mt-2">
                    <HeadlineMeter chars={x.r.chars} rolePos={x.r.rolePos} compact />
                  </div>
                </div>
              ))}
              <p className="mt-4 text-caption text-fg-3">
                Bar: {LIMIT} characters. Tinted zone: first {PREVIEW}. Dark tick: where the target
                role starts (none in the default).
              </p>
            </aside>
          </header>

          <div className="mt-10 max-w-3xl rounded-xl bg-signal-tint p-5 ring-1 ring-inset ring-signal/15">
            <div className={`${kicker} text-signal-ink`}>TL;DR</div>
            <ul className="mt-3 space-y-2 text-body text-fg">
              <li>
                <strong className="font-semibold">Role first, then skills, then one result.</strong>{' '}
                University of Washington: a role, 1 to 3 skills and a result or aspiration.
              </li>
              <li>
                <strong className="font-semibold">
                  {LIMIT} characters, but the start matters most.
                </strong>{' '}
                Keep the role you want inside the first {PREVIEW} or so.
              </li>
              <li>
                <strong className="font-semibold">Cut the filler.</strong> No
                &ldquo;passionate&rdquo;, &ldquo;motivated&rdquo;, &ldquo;seeking
                opportunities&rdquo;, emoji or Unicode bold letters.
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
                className="inline-flex min-h-11 shrink-0 items-center rounded-full px-3 text-small text-fg-2 hover:bg-muted hover:text-fg"
              >
                {s.label}
              </a>
            ))}
          </div>
        </nav>

        <div className={container}>
          <Section
            id="checker"
            meta="The checker · about 3 minutes"
            title="Paste your headline, add the role you want"
            intro="Copy the line under your name from your profile. Add the role you want recruiters to find you for and, if you have one open, a few skills from a job post."
          >
            <HeadlineChecker />
          </Section>

          <Section
            id="length"
            meta="Length · LinkedIn and UC Berkeley, opened 23 Nov 2026"
            title={`You get ${LIMIT} characters; most people see the first ${PREVIEW} or so`}
            intro="The full headline shows on your profile. In comments, search results on a phone and connection requests it is cut short, so the start does the work."
          >
            <StatRow
              stats={[
                {
                  label: 'Headline limit',
                  value: `${LIMIT}`,
                  sub: 'Characters. LinkedIn Talent Blog; UC Berkeley iSchool',
                  href: S.talentBlog.url,
                },
                {
                  label: 'Planning number for narrow views',
                  value: `~${PREVIEW}`,
                  sub: 'Ours. LinkedIn publishes no cut-off',
                },
                {
                  label: 'Overused words LinkedIn lists',
                  value: `${BUZZ_LEARNING.length}`,
                  sub: 'LinkedIn Learning blog',
                  href: S.learning.url,
                },
              ]}
            />
            <P>
              LinkedIn&apos;s Talent Blog calls the headline &ldquo;that line of text that appears
              just below your name&rdquo; and ends with &ldquo;You get 220 characters — so make them
              count&rdquo;. Some popular guides still say 120 (Naukri&apos;s campus guide, dated 3
              Sep 2026, among them); that is the older limit. No LinkedIn page we could open says
              where the headline is cut in narrow views. Third-party guides estimate 40 to 70
              characters (
              <a href={THIRD.tc} target="_blank" rel="noopener" className={link}>
                textcountify
              </a>
              ,{' '}
              <a href={THIRD.wf} target="_blank" rel="noopener" className={link}>
                WildAndFreeTools
              </a>
              ) without saying how they measured, so the checker uses {PREVIEW} as a safe number: if
              the role you want is in the first {PREVIEW} characters, it is seen almost everywhere.
            </P>
          </Section>

          <Section
            id="what-to-write"
            meta={`What to write · ${GUIDANCE.length} career services, quoted`}
            title="Role, skills, one result: what career services teach"
            intro="They differ on wording, not on the shape. Say the role you want, back it with skills and proof, and leave out what a recruiter would never search for."
          >
            <Flow
              label="The headline formula, left to right"
              steps={[
                {
                  title: '1 · Role',
                  body: 'The exact words a recruiter types. Students: “Aspiring …”.',
                },
                {
                  title: '2 · Where you are',
                  body: 'Degree, college or current title, if it helps.',
                },
                {
                  title: '3 · 1 to 3 skills',
                  body: 'From job posts for that role, split with “·”.',
                },
                {
                  title: '4 · One result',
                  body: 'A number, or who you help. Optional for students.',
                },
              ]}
            />
            <div
              className="overflow-x-auto rounded-xl border border-border bg-surface"
              role="region"
              aria-label="What career services say about LinkedIn headlines"
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
                      In their words
                    </th>
                    <th scope="col" className="px-4 py-3 font-medium">
                      What it means for you
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
                      <td className="px-4 py-3 align-top text-fg-2">{g.say}</td>
                      <td className="px-4 py-3 align-top text-fg-2">{g.take}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-caption text-fg-3 md:hidden">Swipe the table sideways →</p>
            <P>
              Why keywords matter:{' '}
              <a href={S.semantic.url} target="_blank" rel="noopener" className={link}>
                LinkedIn&apos;s guide to its recruiter search
              </a>{' '}
              says keyword search &ldquo;returns users who have that term anywhere on their
              profile&rdquo;, and its newer AI-assisted search standardises profile titles and
              skills. A LinkedIn designer, in a post{' '}
              <a href={S.uva.url} target="_blank" rel="noopener" className={link}>
                reposted by UVA Economics
              </a>
              , put it simply: &ldquo;recruiters typically are not looking for a &lsquo;Design
              ninja&rsquo;&rdquo;.
            </P>
          </Section>

          <Section
            id="examples"
            meta={`Examples · ${PAIRS.length} fictional people, each written twice`}
            title="Five headlines before and after, run through the same checks"
            intro="Freshers, a working PM, a career switcher and someone between jobs. Every score below comes from the same code as the checker."
          >
            <Figure
              label="Checks passed out of 10, before and after the rewrite"
              title={`The weak versions pass ${Math.min(...RESULTS.map((r) => r.weak.passed))} to ${Math.max(
                ...RESULTS.map((r) => r.weak.passed)
              )} checks; the rewrites pass ${STRONG_MIN === 10 ? 'all 10' : `${STRONG_MIN} or more`}`}
              sub="The rewrites were written to pass. What matters is what changed: the target role added, skills from job posts, one number."
              legend={[
                { label: 'Before', color: '#3B5BFF' },
                { label: 'After', color: '#E07A1F' },
              ]}
              source="Auto Interview AI headline checker, run on fictional headlines"
              updated="Nov 2026"
              table={{
                head: ['Person', 'Before', 'After'],
                rows: RESULTS.map((r) => [STAGE_NAME[r.p.id], r.weak.passed, r.strong.passed]),
              }}
            >
              <ColumnChart
                max={10}
                groups={RESULTS.map((r) => ({
                  label: STAGE_NAME[r.p.id],
                  values: [r.weak.passed, r.strong.passed],
                }))}
              />
            </Figure>

            <div className="space-y-4">
              {RESULTS.map(({ p, weak, strong }) => (
                <article key={p.id} className="rounded-xl border border-border bg-surface p-5">
                  <div className={`${kicker} text-fg-3`}>
                    {p.who} · target: {p.target}
                  </div>
                  <div className="mt-4 grid gap-5 md:grid-cols-2">
                    {[
                      { name: 'Before', h: p.weak, r: weak },
                      { name: 'After', h: p.strong, r: strong },
                    ].map((x) => (
                      <div key={x.name}>
                        <div className="flex items-baseline justify-between gap-2">
                          <h3 className="text-small font-semibold text-fg">{x.name}</h3>
                          <span className="text-caption tabular-nums text-fg-3">
                            {x.r.passed}/10 · {x.r.chars} chars
                          </span>
                        </div>
                        <p className="mt-1 break-words text-body text-fg">{x.h}</p>
                        <div className="mt-2">
                          <HeadlineMeter chars={x.r.chars} rolePos={x.r.rolePos} compact />
                        </div>
                        {x.name === 'Before' && (
                          <ul className="mt-3 space-y-1 text-caption text-fg-2">
                            {x.r.checks
                              .filter((c) => c.status !== 'pass')
                              .slice(0, 3)
                              .map((c) => (
                                <li key={c.id}>
                                  <span className="font-semibold text-fg">{lab(c.status)}:</span>{' '}
                                  {c.title}
                                  {c.matched && c.id !== 'default'
                                    ? ` (${c.matched.join(', ')})`
                                    : ''}
                                </li>
                              ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
            <Insight title="The biggest fix was one phrase">
              In {NUM_WORD[ROLE_MISSING]} of the {NUM_WORD[PAIRS.length]}, the target role was
              missing from the headline. Adding the exact words a recruiter would type
              (&ldquo;Software Developer&rdquo;, &ldquo;Data Analyst&rdquo;) near the start fixed
              two checks at once: the role is named, and it shows in narrow views.
            </Insight>
          </Section>

          <Section
            id="fresher-examples"
            meta={`Fresher examples · ${FRESHER.length} degrees · fictional details`}
            title="LinkedIn headline examples for freshers, by degree"
            intro="Copy the shape, not the details: swap in your own skills from real job posts and one number from your own project or internship. Each line below passes the checker."
          >
            <ul className="grid gap-3 md:grid-cols-2">
              {FRESHER.map((t) => {
                const r = analyse({
                  headline: t.headline,
                  target: t.target,
                  keywords: t.keywords,
                  stage: 'student',
                })
                return (
                  <li key={t.degree} className="rounded-xl border border-border bg-surface p-4">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-small font-semibold text-fg">
                        {t.degree} <span className="font-normal text-fg-3">→ {t.target}</span>
                      </h3>
                      <span className="shrink-0 text-caption tabular-nums text-fg-3">
                        {r.passed}/10 · {r.chars} chars
                      </span>
                    </div>
                    <p className="mt-2 break-words text-body text-fg">{t.headline}</p>
                  </li>
                )
              })}
            </ul>
            <P>
              Every example uses &ldquo;Aspiring&rdquo; or names a real stage (CA Inter, a
              registered nurse) rather than inventing a job title, as UConn and Texas Tech advise.
              Load any of them in the checker from &ldquo;Try an example&rdquo; and edit it into
              yours.
            </P>
          </Section>

          <Section
            id="buzzwords"
            meta="Words to cut · LinkedIn’s own lists"
            title="The words LinkedIn says everyone already uses"
            intro="LinkedIn has published lists of the most overused words on profiles. They are not wrong, just empty: a recruiter does not search for “passionate”."
          >
            <div
              className="overflow-x-auto rounded-xl border border-border bg-surface"
              role="region"
              aria-label="LinkedIn's overused profile words"
              // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
              tabIndex={0}
            >
              <table className="w-full min-w-[480px] text-left text-small">
                <thead className="bg-muted text-fg-2">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-medium">
                      #
                    </th>
                    <th scope="col" className="px-4 py-3 font-medium">
                      <a href={S.learning.url} target="_blank" rel="noopener" className={link}>
                        LinkedIn Learning list
                      </a>
                    </th>
                    <th scope="col" className="px-4 py-3 font-medium">
                      <a href={S.cbs.url} target="_blank" rel="noopener" className={link}>
                        2017 list (400M profiles, via CBS)
                      </a>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {BUZZ_LEARNING.map((w, i) => (
                    <tr key={w}>
                      <td className="px-4 py-2.5 tabular-nums text-fg-3">{i + 1}</td>
                      <td className="px-4 py-2.5 text-fg">{w}</td>
                      <td className="px-4 py-2.5 text-fg">{BUZZ_2017[i]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <P>
              The two lists share seven words. The checker flags all thirteen, plus cute titles like
              &ldquo;ninja&rdquo;, &ldquo;guru&rdquo; and &ldquo;rockstar&rdquo;. It does not flag
              them inside real titles and credentials: &ldquo;Creative Director&rdquo;,
              &ldquo;Strategic Partnerships&rdquo; and &ldquo;AWS Certified&rdquo; are words people
              search for.
            </P>
          </Section>

          <Section
            id="open-to-work"
            meta="Job hunting · headline vs the Open to Work setting"
            title="Say the role, not that you are looking"
            intro="LinkedIn has a separate Open to Work setting, so the headline does not need to carry that message."
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-border bg-surface p-5">
                <h3 className="text-h4 font-semibold text-fg">Open to Work setting</h3>
                <p className="mt-2 text-small text-fg-2">
                  You can show it to recruiters only, or to everyone with a green #OpenToWork photo
                  frame. Coursera notes LinkedIn &ldquo;can&apos;t guarantee&rdquo; recruiters at
                  your own company won&apos;t see it.{' '}
                  <a href={S.coursera.url} target="_blank" rel="noopener" className={link}>
                    Coursera, 30 Dec 2025
                  </a>
                </p>
              </div>
              <div className="rounded-xl border border-border bg-surface p-5">
                <h3 className="text-h4 font-semibold text-fg">The headline</h3>
                <p className="mt-2 text-small text-fg-2">
                  Spend it on the role, skills and a result. &ldquo;Seeking Data Analyst
                  roles&rdquo; names something searchable; &ldquo;Actively seeking
                  opportunities&rdquo; does not. The checker passes the first and flags the second.
                </p>
              </div>
            </div>
            <P>
              Once a recruiter does call, the next test is the screening call. Practise the opener
              with the{' '}
              <Link href="/tell-me-about-yourself" className={link}>
                &ldquo;Tell me about yourself&rdquo; builder
              </Link>{' '}
              and ask for a referral with the{' '}
              <Link href="/referral-message" className={link}>
                referral message builder
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
                ['/resume-keyword-checker', 'Resume', 'Resume keyword checker'],
                ['/referral-message', 'Referrals', 'Referral message builder'],
                ['/tell-me-about-yourself', 'First question', 'Tell me about yourself builder'],
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
              Sources (opened 23 Nov 2026):{' '}
              {Object.values(S)
                .filter((s) => s.url.startsWith('http'))
                .map((s, i) => (
                  <span key={s.url}>
                    {i > 0 && '; '}
                    <a href={s.url} target="_blank" rel="noopener" className={link}>
                      {s.label}
                    </a>
                  </span>
                ))}
              . LinkedIn Help pages could not be opened by our tools, so LinkedIn is quoted from its
              own business blogs. Examples are fictional. Not affiliated with LinkedIn or any
              organisation named here.
            </p>
          </Section>
        </div>

        <MockInterviewCTA
          title="The headline gets the call. Practise what comes next."
          body="A voice interviewer runs the recruiter screen: “Tell me about yourself”, “Why this role?”, “What are your salary expectations?”, follows up on your answers and tells you what landed."
          questions={[
            'Tell me about yourself.',
            'Why are you looking for a change?',
            'Why this role?',
            'What are your salary expectations?',
          ]}
        />
      </div>
    </DomainLayout>
  )
}
