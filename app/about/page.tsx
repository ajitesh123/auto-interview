import { Metadata } from 'next'
import Link from 'next/link'
import DomainLayout from '@/components/domain/DomainLayout'
import MockInterviewButton from '@/components/ai/MockInterviewButton'
import MockInterviewCTA from '@/components/ai/MockInterviewCTA'
import { ROLE_HUB_LIST } from '@/data/roleHubs'
import { ROLE_SALARIES } from '@/data/roleSalary'
import { LESSONS } from '@/data/learnAi'
import { PG_LESSONS } from '@/data/pgCourse'
import { FREE_RESOURCE_COUNT } from '@/data/freeResources'

/* Every count is computed from the site's own data files at build time. */
const HUBS = ROLE_HUB_LIST.length
const QUESTIONS = ROLE_HUB_LIST.reduce(
  (n, h) => n + h.questionGroups.reduce((m, g) => m + g.questions.length, 0),
  0
)
const SALARY_PAGES = Object.keys(ROLE_SALARIES).length

const DESCRIPTION = `Free interview prep by the team behind Tough Tongue AI: ${HUBS} role guides, ${QUESTIONS} questions, sourced salary data and free tools. How we check every page.`

export const metadata: Metadata = {
  title: 'About Auto Interview AI: Who Makes It and How We Check It',
  description: DESCRIPTION,
  alternates: { canonical: 'https://www.autointerviewai.com/about' },
  openGraph: {
    title: 'About Auto Interview AI',
    description: DESCRIPTION,
    url: 'https://www.autointerviewai.com/about',
    siteName: 'Auto Interview AI',
    locale: 'en_US',
    type: 'website',
  },
}

const container = 'mx-auto w-full max-w-[1200px] px-5 md:px-8'
const kicker = 'font-mono text-kicker uppercase tracking-[0.08em] text-signal-strong'

const STATS = [
  { v: HUBS, l: 'role guides', href: '/#roles' },
  { v: QUESTIONS, l: 'interview questions with model answers', href: '/#roles' },
  { v: SALARY_PAGES, l: 'salary pages with sources', href: '/product-manager/salary' },
  {
    v: LESSONS.length + PG_LESSONS.length,
    l: 'free lessons (Learn AI, Paul Graham)',
    href: '/learn-ai',
  },
]

const RULES = [
  {
    title: 'Every number comes from a page we opened',
    body: 'Pay, prices, laws and statistics carry their source and the date we checked it. If we cannot trace a number to where it was first published, we leave it out.',
  },
  {
    title: 'Pay is what people in the role report',
    body: 'Salary pages lead with pay reported by people already in the job, with how many reports and when, then ranges from real job posts.',
  },
  {
    title: 'Questions say where they came from',
    body: 'When a role guide says candidates were asked a question, it names where that was reported. Questions we wrote ourselves are not passed off as reported.',
  },
  {
    title: 'No fake proof',
    body: 'No invented reviews, ratings, testimonials, user counts or success rates. When something is our own product, we say so.',
  },
  {
    title: 'Tools run in your browser',
    body: 'The resume keyword checker, LinkedIn headline checker, answer builders and salary calculators work without an account and check what you paste inside your browser.',
  },
  {
    title: 'We link to the original',
    body: `Outside material (casebooks, templates, guides) links to its publisher. Our free resources page lists ${FREE_RESOURCE_COUNT} links, each opened and checked.`,
  },
]

const POLICIES = [
  { href: '/contact-policy', title: 'Contact us', body: 'Email and support hours' },
  { href: '/privacy-policy', title: 'Privacy policy', body: 'What we collect and why' },
  { href: '/terms-conditions', title: 'Terms & conditions', body: 'The rules for using the site' },
  { href: '/refund-policy', title: 'Refund policy', body: 'How refund requests work' },
]

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Auto Interview AI',
    description: DESCRIPTION,
    url: 'https://www.autointerviewai.com/about',
    about: {
      '@type': 'Organization',
      name: 'Auto Interview AI',
      url: 'https://www.autointerviewai.com',
      parentOrganization: {
        '@type': 'Organization',
        name: 'Tough Tongue AI',
        url: 'https://www.toughtongueai.com',
      },
    },
  }

  return (
    <DomainLayout currentPath="/about">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="border-b border-border">
        <div className={`${container} py-12 md:py-20`}>
          <p className={`animate-fade-rise ${kicker}`}>About · Updated Nov 2026</p>
          <h1 className="animate-fade-rise mt-4 max-w-[20ch] font-serif text-display font-medium text-fg">
            Free interview prep you can check.
          </h1>
          <p className="animate-fade-rise-delay mt-5 max-w-[60ch] text-body-lg text-fg-2">
            Auto Interview AI helps people get ready for a job interview: learn the role, fix the
            resume (CV), prepare answers, practise out loud and judge the offer. It is free to read
            with no sign-up, and it is made by the team behind{' '}
            <a
              href="https://www.toughtongueai.com/?utm_source=autointerviewai&utm_medium=about&utm_campaign=about"
              className="font-medium text-signal-strong underline-offset-2 hover:underline"
            >
              Tough Tongue AI
            </a>
            , which runs the voice mock interviews.
          </p>
          <div className="animate-fade-rise-delay-2 mt-8">
            <MockInterviewButton />
          </div>

          <dl className="animate-fade-rise-delay-2 mt-12 grid grid-cols-2 gap-4 border-t border-border pt-8 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.l}>
                <dd className="text-h2 font-semibold tabular-nums text-fg">
                  <Link href={s.href} className="hover:text-signal-strong">
                    {s.v}
                  </Link>
                </dd>
                <dt className="mt-1 text-caption text-fg-3">{s.l}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="rules-title" className="py-14 md:py-20">
        <div className={container}>
          <div className="max-w-2xl">
            <p className={kicker}>How we make pages · {RULES.length} rules</p>
            <h2 id="rules-title" className="mt-3 text-h2 font-semibold text-fg">
              What you can rely on here
            </h2>
            <p className="mt-3 text-body text-fg-2">
              Interview advice online is full of made-up statistics. These are the rules every page
              on this site is held to, and what we fix when a page breaks them.
            </p>
          </div>
          <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {RULES.map((r, i) => (
              <li key={r.title} className="rounded-xl border border-border bg-surface p-5 md:p-6">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-signal-tint font-mono text-caption font-semibold text-signal-ink">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-h4 font-semibold text-fg">{r.title}</h3>
                <p className="mt-2 text-small text-fg-2">{r.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 max-w-[68ch] text-small text-fg-2">
            Found a wrong number, a dead link or a claim you cannot check?{' '}
            <Link
              href="/contact-policy"
              className="font-medium text-signal-strong underline-offset-2 hover:underline"
            >
              Tell us
            </Link>{' '}
            and we will fix or remove it.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="where-title"
        className="border-t border-border bg-surface py-14 md:py-20"
      >
        <div className={`${container} grid gap-8 lg:grid-cols-12`}>
          <div className="lg:col-span-5">
            <p className={kicker}>Start here</p>
            <h2 id="where-title" className="mt-3 text-h2 font-semibold text-fg">
              New to the site?
            </h2>
            <p className="mt-3 text-body text-fg-2">
              The resources page puts every guide and tool in the order you need them, from job post
              to offer.
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:col-span-7">
            {[
              {
                href: '/resources',
                t: 'All resources, step by step',
                b: 'Five stages, each with the free tool for it',
              },
              {
                href: '/#roles',
                t: `Pick your role (${HUBS} guides)`,
                b: 'Questions, model answers, pay and the full kit',
              },
              {
                href: '/resume-keyword-checker',
                t: 'Check your resume against a job post',
                b: 'See the skills the post asks for that you never mention',
              },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-bg p-5 transition-[border-color,box-shadow] duration-fast hover:border-border-strong hover:shadow-e2"
              >
                <span>
                  <span className="block text-h4 font-semibold text-fg group-hover:text-signal-strong">
                    {l.t}
                  </span>
                  <span className="mt-1 block text-small text-fg-2">{l.b}</span>
                </span>
                <span
                  aria-hidden="true"
                  className="text-signal-strong transition-transform duration-base group-hover:translate-x-0.5"
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="policies-title" className="border-t border-border py-14 md:py-16">
        <div className={container}>
          <h2 id="policies-title" className="text-h3 font-semibold text-fg">
            Policies and contact
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {POLICIES.map((p) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  className="group flex h-full flex-col rounded-xl border border-border bg-surface p-4 transition-colors duration-fast hover:border-border-strong"
                >
                  <span className="text-small font-semibold text-fg group-hover:text-signal-strong">
                    {p.title} →
                  </span>
                  <span className="mt-1 text-caption text-fg-2">{p.body}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <MockInterviewCTA />
    </DomainLayout>
  )
}
