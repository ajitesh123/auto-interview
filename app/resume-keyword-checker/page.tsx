import type { Metadata } from 'next'
import Link from 'next/link'
import type { ReactNode } from 'react'
import MockInterviewButton from '@/components/ai/MockInterviewButton'
import MockInterviewCTA from '@/components/ai/MockInterviewCTA'
import KeywordChecker from '@/components/keywordChecker/KeywordChecker'
import { BarList, Figure, Flow, Insight, StatRow } from '@/components/viz'
import { ROLE_HUB_LIST } from '@/data/roleHubs'
import { analyse, PRIORITY_LABEL } from '@/data/keywordChecker/analyze'
import { SAMPLES } from '@/data/keywordChecker/samples'
import { SKILLS } from '@/data/keywordChecker/skills'

const PAGE_URL = 'https://www.autointerviewai.com/resume-keyword-checker'
const UPDATED = '2026-11-14'
const TITLE = 'Free Resume Keyword Checker: Match Your Resume to a Job Post'
const DESC =
  'Paste a job post and your resume or CV to see which skills are missing, which matter most, and 8 ATS format checks. Free, no sign-up, nothing uploaded.'

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

/* ---------- Worked example: the PM sample, run through the same code as the tool ---------- */
const PM = SAMPLES[0]
const EX = analyse(PM.jd, PM.resume)
const EX_MUST_MISSING = EX.missing.filter((k) => k.priority === 'must')

// Honest rewrites for the sample's must-have gaps: only if the candidate really did this.
const REWRITES: Record<string, string> = {
  fintech: 'Owned refunds and COD-to-prepaid payment flows (fintech) for 1.2 lakh orders a month',
  prioritization:
    'Prioritized a 40-item returns backlog with RICE; shipped the top 5 in one quarter',
  'B2B SaaS': 'Built a seller dashboard used by 300 merchants (B2B SaaS inside a marketplace)',
  communication: 'Wrote the weekly product update read by 9 category heads (written communication)',
  'data analysis': 'Ran the data analysis behind the prepaid nudge: COD users churned 2x faster',
  'stakeholder management':
    'Aligned support, finance and logistics on one refund policy (stakeholder management)',
}

const SOURCES = {
  jobscanF500: {
    label: 'Jobscan, Fortune 500 ATS report (6th ed., 20 Aug 2026)',
    url: 'https://www.jobscan.co/blog/Fortune-500-use-applicant-tracking-systems/',
  },
  jobscanState: {
    label: 'Jobscan, State of the Job Search survey (cited in its 2026 Fortune 500 ATS report)',
    url: 'https://www.jobscan.co/blog/Fortune-500-use-applicant-tracking-systems/',
  },
  enhancv: {
    label: 'Enhancv survey of 25 US recruiters, reported by IT Brief UK (19 Nov 2025)',
    url: 'https://itbrief.co.uk/story/study-reveals-ats-rarely-auto-rejects-cvs-debunks-75-myth',
  },
}

const SECTIONS = [
  { id: 'checker', label: 'Checker' },
  { id: 'how', label: 'How it works' },
  { id: 'example', label: 'Worked example' },
  { id: 'ats', label: 'What an ATS does' },
  { id: 'where', label: 'Where to add' },
  { id: 'faq', label: 'FAQ' },
]

const FAQ = [
  {
    q: 'How do I check my resume against a job description for free?',
    a: 'Paste the full job post in the first box and your resume text in the second. The checker lists every skill it finds in the post, marks each as must-have, mentioned or nice to have, and shows which ones your resume already has. It runs in your browser, with no sign-up and no upload.',
  },
  {
    q: 'Does an ATS reject a resume automatically for missing keywords?',
    a: 'Usually not. In an Enhancv survey of 25 US recruiters (Nov 2025), 92% said their system does not auto-reject for formatting or missing keywords. The bigger risk is search: in Jobscan’s survey, 76.4% of recruiters said they search and rank candidates by skills from the job description. If a skill you have is not written on your resume, a search for it will not find you.',
  },
  {
    q: 'What is a good keyword match score?',
    a: 'There is no official number; every ATS and recruiter is different. Treat our coverage as a to-do list, not a grade: add every must-have you genuinely have, in the post’s own words, and leave out the ones you do not. A lower honest score beats a higher one you cannot defend in the interview.',
  },
  {
    q: 'Should I copy keywords from the job post into my resume?',
    a: 'Use the post’s exact words for skills you really have (write “A/B testing” if that is what the post says, not only “experiments”). Do not paste lines from the post or hide keywords in white text. The recruiter reads your resume after the search, and an interviewer will ask about every skill you list.',
  },
  {
    q: 'Can I check a CV, not a resume?',
    a: 'Yes. CV and resume mean the same one-to-two page document in India and most job posts; paste either. For a long academic CV, paste the sections that match the post.',
  },
  {
    q: 'Can I upload a PDF?',
    a: 'Not here, on purpose: pasting keeps everything on your device. Open the PDF, select all, copy and paste. If the pasted text is jumbled (columns mixed together, missing words), an ATS parser may read it the same way: switch to a single-column layout.',
  },
  {
    q: 'Is my resume stored anywhere?',
    a: 'Only in your own browser, so your draft is still there when you come back. Nothing is sent to a server, and “Clear both” deletes it from this device.',
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

export default function ResumeKeywordCheckerPage() {
  const kits = ROLE_HUB_LIST.map((h) => ({ name: h.shortName, href: `/${h.slug}/resume` }))

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Resume Keyword Checker',
      url: PAGE_URL,
      description: DESC,
      applicationCategory: 'BusinessApplication',
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
        { '@type': 'ListItem', position: 2, name: 'Resume keyword checker', item: PAGE_URL },
      ],
    },
  ]

  return (
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
          <span className="text-fg-2">Resume keyword checker</span>
        </nav>

        <header className="mt-8 grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div className={`${kicker} text-signal-strong`}>
              Free tool · {SKILLS.length} skills and their spellings · No upload · Updated 14 Nov
              2026
            </div>
            <h1 className="mt-4 font-serif text-display font-medium text-fg">
              Resume keyword checker
            </h1>
            <p className="mt-5 max-w-[56ch] text-body-lg text-fg-2">
              Paste a job post and your resume or CV. In seconds you see which skills the post asks
              for, which are likely must-haves, which ones your resume is missing (with the
              post&apos;s own line for each), and 8 format checks. It runs in your browser, so
              nothing leaves your device.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#checker"
                className="inline-flex h-12 items-center rounded-full bg-surface px-5 text-small font-semibold text-fg ring-1 ring-inset ring-border-strong transition-colors duration-fast hover:bg-muted"
              >
                Check my resume
              </a>
              <MockInterviewButton caption={false} label="Then practise: free mock interview" />
            </div>
          </div>

          <aside
            aria-label="What the checker reports"
            className="rounded-2xl border border-border bg-surface p-5 shadow-e1 md:p-6 lg:col-span-5"
          >
            <div className={`${kicker} text-fg-3`}>Sample run · {PM.role} post (fictional)</div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-[2.75rem] font-semibold tabular-nums leading-none text-fg">
                {EX.coverage}%
              </span>
              <span className="text-small text-fg-2">keyword coverage</span>
            </div>
            <dl className="mt-4 divide-y divide-border">
              {[
                [
                  'Must-haves on the resume',
                  `${EX.byPriority.must.matched} of ${EX.byPriority.must.total}`,
                ],
                ['Missing skills, with the post’s line', `${EX.missing.length}`],
                ['Job title on the resume', EX.title.inResume ? 'Yes' : 'No'],
                [
                  'Format checks passed',
                  `${EX.checks.filter((c) => c.status === 'pass').length} of ${EX.checks.length}`,
                ],
              ].map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-3 py-2.5">
                  <dt className="text-small text-fg-2">{k}</dt>
                  <dd className="text-small font-semibold tabular-nums text-fg">{v}</dd>
                </div>
              ))}
            </dl>
            <a href="#example" className={`mt-3 inline-block text-small ${link}`}>
              See this example line by line
            </a>
          </aside>
        </header>

        <div className="mt-10 max-w-3xl rounded-xl bg-signal-tint p-5 ring-1 ring-inset ring-signal/15">
          <div className={`${kicker} text-signal-ink`}>TL;DR</div>
          <ul className="mt-3 space-y-2 text-body text-fg">
            <li>
              <strong className="font-semibold">Recruiters search, the ATS rarely rejects.</strong>{' '}
              76.4% of recruiters in Jobscan&apos;s survey search and rank by skills from the job
              post; 92% of 25 recruiters in an Enhancv survey said their system does not
              auto-reject.
            </li>
            <li>
              <strong className="font-semibold">
                Use the post&apos;s words for skills you really have.
              </strong>{' '}
              &ldquo;A/B testing&rdquo;, not only &ldquo;experiments&rdquo;; &ldquo;Power BI&rdquo;,
              not only &ldquo;dashboards&rdquo;.
            </li>
            <li>
              <strong className="font-semibold">Put each keyword in a bullet with a result,</strong>{' '}
              not only in a Skills list. Then practise saying it out loud.
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
          id="checker"
          meta="Step 1 · about 1 minute"
          title="Check your resume against the job post"
          intro="Paste both texts. Results update as you type; tap a sample to see a full report first."
        >
          <KeywordChecker kits={kits} />
        </Section>

        <Section
          id="how"
          meta="Method · no AI, no server"
          title="How the checker reads a job post"
          intro="It does what a recruiter's search does: look for the skills by name. Then it reads the post's sections to tell must-haves from extras."
        >
          <Flow
            label="Four steps, all in your browser"
            steps={[
              {
                title: 'Find the skills',
                body: `Matches ${SKILLS.length} skills and their common spellings (Power BI = PowerBI, Kubernetes = k8s, generative AI = GenAI). Longest phrase wins, so "data analytics" is not also counted as "analytics".`,
              },
              {
                title: 'Rank them',
                body: 'A skill under "Requirements" or "What we’re looking for", on a "must" line, or repeated 3+ times is a must-have. One only under "Preferred" or "Bonus" is nice to have.',
              },
              {
                title: 'Compare',
                body: 'Each skill is looked up in your resume. Missing ones come with the post’s own line, so you can see what the employer means.',
              },
              {
                title: 'Read the format',
                body: 'Contact details, standard headings, length, bullets with numbers, weak openers, first person, long bullets and stuffing.',
              },
            ]}
          />
          <P>
            Coverage is weighted: a must-have counts 3, a mention 2 and a nice-to-have 1. It is our
            own measure to help you prioritise, not a score any ATS publishes. What it cannot do:
            judge whether your experience is good, read a PDF&apos;s layout, or know a skill that is
            not in its list. For those, the &ldquo;Other words the post repeats&rdquo; box and your
            own read of the post fill the gap.
          </P>
        </Section>

        <Section
          id="example"
          meta={`Worked example · ${PM.role} post and resume (fictional)`}
          title={`A strong resume can still miss ${EX_MUST_MISSING.length} of ${EX.byPriority.must.total} must-haves`}
          intro="This is the Product Manager sample, run through the same code as the checker above. The candidate shipped real results, yet the resume describes them in words the post does not use."
        >
          <Figure
            label={`Sample run · ${EX.keywords.length} skills found in the post`}
            title={`Must-haves are the weak spot: ${EX.byPriority.must.matched} of ${EX.byPriority.must.total} are on the resume`}
            source="Auto Interview AI resume keyword checker, run on the fictional Product Manager sample"
            updated="Nov 2026"
            table={{
              head: ['Priority', 'Skills in the post', 'On the resume', 'Share'],
              rows: (['must', 'mentioned', 'nice'] as const).map((p) => [
                PRIORITY_LABEL[p],
                EX.byPriority[p].total,
                EX.byPriority[p].matched,
                `${EX.byPriority[p].total ? Math.round((EX.byPriority[p].matched / EX.byPriority[p].total) * 100) : 0}%`,
              ]),
            }}
          >
            <BarList
              sort={false}
              emphasis
              max={100}
              format={{ suffix: '%' }}
              rows={(['must', 'mentioned', 'nice'] as const).map((p) => ({
                label: `${PRIORITY_LABEL[p]} (${EX.byPriority[p].matched} of ${EX.byPriority[p].total})`,
                value: EX.byPriority[p].total
                  ? Math.round((EX.byPriority[p].matched / EX.byPriority[p].total) * 100)
                  : 0,
                highlight: p === 'must',
              }))}
            />
          </Figure>

          <figure>
            <div
              role="region"
              // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
              tabIndex={0}
              aria-label="Missing must-have skills and honest rewrites"
              className="overflow-x-auto rounded-xl border border-border bg-surface"
            >
              <table className="w-full min-w-[640px] text-left text-small">
                <thead className="bg-muted text-fg-2">
                  <tr>
                    <th scope="col" className="sticky left-0 bg-muted px-4 py-3 font-medium">
                      Missing must-have
                    </th>
                    <th scope="col" className="px-4 py-3 font-medium">
                      Where the post asks for it
                    </th>
                    <th scope="col" className="px-4 py-3 font-medium">
                      A bullet that adds it (only if true)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {EX_MUST_MISSING.map((k) => (
                    <tr key={k.name}>
                      <th
                        scope="row"
                        className="sticky left-0 bg-surface px-4 py-3 align-top font-medium text-fg"
                      >
                        {k.name}
                      </th>
                      <td className="px-4 py-3 align-top italic text-fg-2">
                        &ldquo;{k.context}&rdquo;
                      </td>
                      <td className="px-4 py-3 align-top text-fg">
                        {REWRITES[k.name] ?? 'Name it in the bullet where you used it.'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <figcaption className="mt-2 flex justify-between gap-4 text-caption text-fg-3">
              <span>
                Fictional candidate and company. Rewrites are examples of wording, not facts to
                copy.
              </span>
              <span className="shrink-0 md:hidden">Swipe →</span>
            </figcaption>
          </figure>

          <Insight title="What the example shows">
            The candidate ran 14 A/B tests and cut refund time from 7 days to 2, but wrote
            &ldquo;Analysed cohort retention&rdquo; where the post says &ldquo;data analysis&rdquo;,
            and never named fintech, RICE or stakeholders. A recruiter searching the ATS for those
            words would not find this resume. {EX_MUST_MISSING.length} honest edits fix it.
          </Insight>
        </Section>

        <Section
          id="ats"
          meta="Evidence · 3 sources, all vendor research"
          title="What an ATS really does with your keywords"
          intro="The popular line that robots reject 75% of resumes is not backed by any study we could find. What the surveys do show: almost every big employer uses an ATS, and recruiters search it by skill."
        >
          <StatRow
            stats={[
              {
                label: 'Fortune 500 companies with a detectable ATS',
                value: '97.4%',
                sub: '487 of 500; Workday at over 40%. Jobscan, Aug 2026',
                href: SOURCES.jobscanF500.url,
              },
              {
                label: 'Recruiters who search and rank by skills from the job post',
                value: '76.4%',
                sub: 'Jobscan State of the Job Search survey, cited Aug 2026',
                href: SOURCES.jobscanState.url,
              },
              {
                label: 'Recruiters whose ATS does not auto-reject on keywords or format',
                value: '92%',
                sub: '23 of 25 US recruiters. Enhancv, Nov 2025',
                href: SOURCES.enhancv.url,
              },
            ]}
          />
          <P>
            Read these as direction, not law. Jobscan and Enhancv both sell resume tools, and 25
            recruiters is a small sample. They agree on the useful part: the ATS stores your resume
            and the recruiter queries it. Matching the post&apos;s words gets you found; the bullets
            around those words get you the interview.
          </P>
        </Section>

        <Section
          id="where"
          meta="Do and don't · 6 rules"
          title="Where to put a missing keyword"
          intro="A keyword works hardest inside a bullet that proves it. A Skills line alone helps the search but not the human who reads next."
        >
          <figure>
            <div
              role="region"
              // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
              tabIndex={0}
              aria-label="Where to add keywords"
              className="overflow-x-auto rounded-xl border border-border bg-surface"
            >
              <table className="w-full min-w-[600px] text-left text-small">
                <thead className="bg-muted text-fg-2">
                  <tr>
                    <th scope="col" className="sticky left-0 bg-muted px-4 py-3 font-medium">
                      Kind of keyword
                    </th>
                    <th scope="col" className="px-4 py-3 font-medium">
                      Do
                    </th>
                    <th scope="col" className="px-4 py-3 font-medium">
                      Don&apos;t
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    [
                      'Tool (SQL, Power BI, Figma)',
                      'Name it in a bullet: “Built 6 Power BI dashboards for…”, and list it in Skills',
                      'List tools you opened once',
                    ],
                    [
                      'Hard skill (data analysis, RAG)',
                      'Show the output and its result',
                      'Write “knowledge of…” with no proof',
                    ],
                    [
                      'Method (A/B testing, RICE)',
                      'Say what it decided: “14 A/B tests; +3.1% conversion”',
                      'Swap in your own synonym when the post uses a set term',
                    ],
                    [
                      'Soft skill (communication)',
                      'Prove it: who, how many, what changed',
                      'List “excellent communicator” in Skills',
                    ],
                    [
                      'Job title',
                      'Use the post’s title in your headline if it matches your work',
                      'Change past job titles you did not hold',
                    ],
                    [
                      'Degree or certificate',
                      'Write it the way the post does (B.Tech, MBA)',
                      'Claim one in progress without “expected 2027”',
                    ],
                  ].map((r) => (
                    <tr key={r[0]}>
                      <th
                        scope="row"
                        className="sticky left-0 bg-surface px-4 py-3 align-top font-medium text-fg"
                      >
                        {r[0]}
                      </th>
                      <td className="px-4 py-3 align-top text-fg-2">{r[1]}</td>
                      <td className="px-4 py-3 align-top text-fg-2">{r[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <figcaption className="mt-2 flex justify-between gap-4 text-caption text-fg-3">
              <span>Our editorial rules, from the role resume kits on this site.</span>
              <span className="shrink-0 md:hidden">Swipe →</span>
            </figcaption>
          </figure>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {ROLE_HUB_LIST.map((h) => (
              <Link
                key={h.slug}
                href={`/${h.slug}/resume`}
                className="rounded-xl border border-border bg-surface px-4 py-3 transition-[border-color,box-shadow] duration-fast hover:border-border-strong hover:shadow-e2"
              >
                <span className={`block ${kicker} text-fg-3`}>Resume kit</span>
                <span className="mt-1 block text-small font-semibold text-fg">{h.roleName}</span>
              </Link>
            ))}
          </div>
        </Section>

        <Section id="faq" meta={`FAQ · ${FAQ.length} questions`} title="Quick answers">
          <div className="max-w-3xl space-y-3">
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
              ['/build-resume', 'Build', 'Free resume builder'],
              ['/cv-templates', 'Templates', 'One-page CV templates'],
              ['/salary-calculator', 'Offer', 'CTC to in-hand calculator'],
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
            Sources:{' '}
            {Object.values(SOURCES).map((s, i) => (
              <span key={s.url}>
                {i > 0 && '; '}
                <a href={s.url} target="_blank" rel="noopener" className={link}>
                  {s.label}
                </a>
              </span>
            ))}
            . Not affiliated with any ATS vendor.
          </p>
        </Section>
      </div>

      <MockInterviewCTA
        title="Every keyword is a question. Answer it out loud."
        body="A voice interviewer asks about the skills on your resume, follows up on your answers, and tells you what was strong and what was thin."
        questions={[
          'Walk me through an A/B test you ran. What did it decide?',
          'How do you prioritise when three teams want different things?',
          'Tell me about a time you used data to change a decision.',
          'Which of the skills on your resume are you strongest in, and why?',
        ]}
      />
    </div>
  )
}
