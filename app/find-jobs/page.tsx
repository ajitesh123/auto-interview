import { Metadata } from 'next'
import { genPageMetadata } from '../seo'
import { FindJobsPage } from '@/features/find-jobs'
import DomainLayout from '@/components/domain/DomainLayout'
import MockInterviewCTA from '@/components/ai/MockInterviewCTA'
import RelatedTools from '@/components/RelatedTools'
import Link from 'next/link'

// Nov 2026: rebuilt as a link-out search (no scraping). Copy describes only what the tool does.
export const metadata: Metadata = genPageMetadata({
  title: 'Search LinkedIn, Naukri, Indeed and Google Jobs at Once (Free)',
  description:
    'Type a job title once and open matching jobs on LinkedIn, Naukri, Indeed and Google Jobs, with last-24-hours and fresher filters carried over where each board allows. Free, no signup.',
  keywords:
    'job search, find jobs, LinkedIn jobs, Naukri jobs, Indeed jobs, Google jobs, fresher jobs, job finder',
  alternates: {
    canonical: 'https://www.autointerviewai.com/find-jobs',
  },
})

const FAQS = [
  {
    q: 'Is the job search tool free?',
    a: 'Yes. It is free and needs no signup. You type a job title, an optional location and an optional company, and the tool opens that search on each job board.',
  },
  {
    q: 'Which job boards does it search?',
    a: 'LinkedIn Jobs, Naukri, Indeed and Google Jobs. Each link opens the board’s own live results, so you apply on the original site.',
  },
  {
    q: 'Does Auto Interview AI store or copy job listings?',
    a: 'No. The tool only builds search links. Listings, filters and applications stay on each job board.',
  },
  {
    q: 'How do I see only jobs posted in the last 24 hours?',
    a: 'Pick "Last 24 hours" under Posted. LinkedIn and Indeed receive the filter in the link. Naukri and Google Jobs do not take it from a link, so set Freshness on Naukri or Date posted on Google Jobs after the page opens.',
  },
  {
    q: 'How do I find fresher or entry-level jobs?',
    a: 'Pick "Fresher / entry level" under Level. LinkedIn gets its Entry level filter, Naukri gets 0 years of experience, and Google Jobs gets "entry level" added to the search. On Indeed, set the experience filter on its page.',
  },
  {
    q: 'How do I search for remote jobs?',
    a: 'Type "Remote" in the location field. LinkedIn, Naukri and Indeed then open without a city, and each card reminds you to switch on that board’s remote or work-from-home filter. Google Jobs gets "remote" added to the search.',
  },
]

const CARRY: [string, string, string, string][] = [
  ['LinkedIn Jobs', 'Yes, sent in the link', 'Yes, Entry level filter', 'Yes, Internship filter'],
  ['Indeed', 'Yes, sent in the link', 'No, set it on Indeed', 'Adds “internship” to the search'],
  [
    'Naukri',
    'No, set Freshness on Naukri',
    'Yes, 0 years experience',
    'Closest: 0 years experience',
  ],
  [
    'Google Jobs',
    'No, set Date posted',
    'Adds “entry level” to the search',
    'Adds “internship” to the search',
  ],
]

const NEXT_STEPS = [
  {
    href: '/resume-keyword-checker',
    step: '01',
    title: 'Match your resume to the post',
    body: 'Paste the job post and your resume; see which of its words you are missing.',
  },
  {
    href: '/ats-resume-checker',
    step: '02',
    title: 'Check the file can be read',
    body: 'Upload your PDF or Word resume and see the text an ATS would pull out.',
  },
  {
    href: '/referral-message',
    step: '03',
    title: 'Ask for a referral',
    body: 'Build a short LinkedIn or email message to someone at the company.',
  },
  {
    href: '/interview-prep-plan',
    step: '04',
    title: 'Plan the days before the interview',
    body: 'Enter the interview date and get a day-by-day prep plan.',
  },
]

const ROLE_GUIDES: [string, string][] = [
  ['/product-manager', 'Product Manager'],
  ['/aipm', 'AI Product Manager'],
  ['/data-analyst', 'Data Analyst'],
  ['/ai-engineer', 'AI Engineer'],
  ['/fde', 'Forward Deployed Engineer'],
  ['/gtm-engineer', 'GTM Engineer'],
  ['/growth', 'Growth Manager'],
  ['/founders-office', 'Founder’s Office'],
  ['/chief-of-staff', 'Chief of Staff'],
  ['/strategy-and-operations', 'Strategy & Operations'],
]

export default function FindJobs() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQS.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
      />

      <DomainLayout currentPath="/find-jobs">
        <FindJobsPage />

        <section
          aria-labelledby="carry-h"
          className="mx-auto w-full max-w-[1200px] px-5 py-10 md:px-8"
        >
          <div className="font-mono text-kicker uppercase tracking-[0.08em] text-signal-strong">
            What each link carries · checked Nov 2026
          </div>
          <h2 id="carry-h" className="mt-3 text-h2 font-semibold text-fg">
            Two of four boards take the date filter from a link
          </h2>
          <p className="mt-2 max-w-[68ch] text-body text-fg-2">
            Job boards differ in what they accept in a search link. Where a filter cannot be sent,
            the card tells you which filter to set once the board opens.
          </p>
          <figure className="mt-6">
            <div
              role="region"
              // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
              tabIndex={0}
              aria-label="Filters each job board accepts in a search link"
              className="overflow-x-auto rounded-xl border border-border bg-surface"
            >
              <table className="w-full min-w-[560px] text-left text-small tabular-nums">
                <thead className="bg-muted text-fg-2">
                  <tr>
                    <th scope="col" className="sticky left-0 bg-muted px-4 py-3 font-medium">
                      Board
                    </th>
                    <th scope="col" className="px-4 py-3 font-medium">
                      Last 24 h / 7 days
                    </th>
                    <th scope="col" className="px-4 py-3 font-medium">
                      Fresher / entry level
                    </th>
                    <th scope="col" className="px-4 py-3 font-medium">
                      Internship
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-fg">
                  {CARRY.map((r) => (
                    <tr key={r[0]}>
                      <th scope="row" className="sticky left-0 bg-surface px-4 py-3 font-semibold">
                        {r[0]}
                      </th>
                      <td className="px-4 py-3 text-fg-2">{r[1]}</td>
                      <td className="px-4 py-3 text-fg-2">{r[2]}</td>
                      <td className="px-4 py-3 text-fg-2">{r[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <figcaption className="mt-2 text-caption text-fg-3">
              Sources, opened Nov 25, 2026: LinkedIn date and level parameters,{' '}
              <a
                className="underline underline-offset-2"
                href="https://www.trykondo.com/blog/linkedin-job-search-hacks"
                rel="noopener nofollow"
              >
                Kondo
              </a>
              ; Indeed{' '}
              <a
                className="underline underline-offset-2"
                href="https://serpapi.com/indeed-jobs-api"
                rel="noopener nofollow"
              >
                fromage
              </a>{' '}
              and{' '}
              <a
                className="underline underline-offset-2"
                href="https://in.indeed.com/llms.txt"
                rel="noopener nofollow"
              >
                in.indeed.com
              </a>
              ; Naukri{' '}
              <a
                className="underline underline-offset-2"
                href="https://apify.com/scrapewise/naukri-scraper"
                rel="noopener nofollow"
              >
                experience
              </a>
              . Boards can change them; each card notes what to set by hand.{' '}
              <span className="md:hidden">Swipe →</span>
            </figcaption>
          </figure>
        </section>

        <section
          aria-labelledby="next-h"
          className="mx-auto w-full max-w-[1200px] px-5 pb-12 md:px-8"
        >
          <div className="font-mono text-kicker uppercase tracking-[0.08em] text-signal-strong">
            After you find the job · 4 free tools
          </div>
          <h2 id="next-h" className="mt-3 text-h2 font-semibold text-fg">
            Found a post you like? Do these four things before you apply
          </h2>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {NEXT_STEPS.map((s) => (
              <li
                key={s.href}
                className="relative rounded-xl border border-border bg-surface p-5 transition-[border-color,box-shadow] duration-fast hover:border-border-strong hover:shadow-e2"
              >
                <span className="font-mono text-kicker tabular-nums text-signal-strong">
                  {s.step}
                </span>
                <h3 className="mt-2 text-h4 font-semibold text-fg">
                  <Link href={s.href} className="after:absolute after:inset-0">
                    {s.title}
                  </Link>
                </h3>
                <p className="mt-1 text-small text-fg-2">{s.body}</p>
              </li>
            ))}
          </ol>
          <h3 className="mt-10 text-h4 font-semibold text-fg">Interview guides by role</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {ROLE_GUIDES.map(([href, label]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="inline-flex h-9 items-center rounded-full bg-surface px-3.5 text-small text-fg-2 ring-1 ring-inset ring-border-strong transition-colors duration-fast hover:bg-muted hover:text-fg"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto w-full max-w-[1200px] px-5 pb-12 md:px-8">
          <h2 className="mb-4 text-h3 font-semibold text-fg">Questions</h2>
          <div className="space-y-4">
            {FAQS.map((f) => (
              <div key={f.q}>
                <h3 className="text-body font-semibold text-fg">{f.q}</h3>
                <p className="mt-1 max-w-[68ch] text-body text-fg-2">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <MockInterviewCTA title="Found the job? Practise the interview out loud." />
        <RelatedTools currentPage="/find-jobs" />
      </DomainLayout>
    </>
  )
}
