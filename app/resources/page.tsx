import { Metadata } from 'next'
import Link from 'next/link'
import DomainLayout from '@/components/domain/DomainLayout'
import MockInterviewButton from '@/components/ai/MockInterviewButton'
import MockInterviewCTA from '@/components/ai/MockInterviewCTA'
import MockLoopSteps from '@/components/ai/MockLoopSteps'
import { ROLE_HUB_LIST, ROLE_HUBS } from '@/data/roleHubs'
import { ROLE_SALARIES } from '@/data/roleSalary'
import { ROLE_CONCEPTS } from '@/data/roleConcepts'
import { ROLE_INTERVIEW_TIPS } from '@/data/roleInterviewTips'
import { LESSONS } from '@/data/learnAi'
import { PG_LESSONS } from '@/data/pgCourse'
import { FREE_RESOURCE_SECTIONS, FREE_RESOURCE_COUNT, CHECKED_ON } from '@/data/freeResources'

/* Every count on this page is computed from the site's own data files at build time. */
const HUB_COUNT = ROLE_HUB_LIST.length
const QUESTION_COUNT = ROLE_HUB_LIST.reduce(
  (n, h) => n + h.questionGroups.reduce((m, g) => m + g.questions.length, 0),
  0
)
const SALARY_COUNT = Object.keys(ROLE_SALARIES).length
const CONCEPT_COUNT = Object.keys(ROLE_CONCEPTS).length
const TIPS_COUNT = Object.keys(ROLE_INTERVIEW_TIPS).length
const CHECKED_LABEL = new Date(CHECKED_ON + 'T00:00:00Z').toLocaleDateString('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

const TITLE = 'Free Interview Prep Resources, Step by Step (2026)'
const DESCRIPTION = `Free interview prep in five stages: ${HUB_COUNT} role guides with ${QUESTION_COUNT} questions, resume checkers, answer builders, a voice mock interview and salary tools.`

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: 'https://www.autointerviewai.com/resources' },
  openGraph: {
    title: 'Free interview prep resources, step by step',
    description: DESCRIPTION,
    url: 'https://www.autointerviewai.com/resources',
    siteName: 'Auto Interview AI',
    locale: 'en_US',
    type: 'website',
  },
}

type Item = {
  href: string
  title: string
  body: string
  tag?: string
  links?: { href: string; label: string }[]
}
type Stage = {
  id: string
  title: string
  done: string
  items: Item[]
  outside?: string[] // FREE_RESOURCE_SECTIONS ids
}

const STAGES: Stage[] = [
  {
    id: 'learn-the-role',
    title: 'Learn the role',
    done: 'You can say what the job does day to day and what the interview will test.',
    items: [
      {
        href: '/#roles',
        title: `${HUB_COUNT} role guides`,
        body: `What the job involves, ${QUESTION_COUNT} interview questions with model answers, and pay with sources.`,
        tag: 'Start here',
      },
      {
        href: '/data-analyst/concepts',
        title:
          CONCEPT_COUNT > 1
            ? `Concept quizzes (${CONCEPT_COUNT} roles)`
            : 'Data analyst concepts quiz',
        body: 'The SQL and statistics ideas interviewers expect you to explain, with a short quiz and a score.',
      },
      {
        href: '/learn-ai',
        title: `Learn AI (${LESSONS.length} lessons)`,
        body: 'LLMs, prompts, RAG, agents and evals, each with a worked example. Most roles now get an AI question.',
      },
      {
        href: '/paul-graham',
        title: `Paul Graham and YC (${PG_LESSONS.length} lessons)`,
        body: 'The essays founders and startup hires are expected to know, read for what to do with them.',
      },
    ],
    outside: ['ai-skills'],
  },
  {
    id: 'resume-and-applying',
    title: 'Fix your resume (CV) and apply',
    done: 'Your resume matches the job post, and you have a way in that is not the apply button.',
    items: [
      {
        href: '/resume-keyword-checker',
        title: 'Resume keyword checker',
        body: 'Paste a job post and your resume. See the skills it asks for that you never mention.',
        tag: 'Most used',
      },
      {
        href: '/cv-templates',
        title: 'One-page CV templates',
        body: 'Word templates in the plain one-page format recruiters and ATS read.',
      },
      {
        href: '/ats-resume-checker',
        title: 'ATS resume checker',
        body: 'Drop a PDF or Word resume to see what a parser reads, with checks for columns, tables and headers.',
      },
      {
        href: '/linkedin-headline-checker',
        title: 'LinkedIn headline checker',
        body: 'Ten checks for the 220-character limit, your role up front, skills and buzzwords.',
      },
      {
        href: '/referral-message',
        title: 'Referral message builder',
        body: 'A LinkedIn note, message, email and follow-up asking for a referral.',
      },
      {
        href: '/cover-letter',
        title: 'Cover letter samples',
        body: 'Role-specific letters you can copy, each paragraph labelled by its job.',
      },
      {
        href: '/find-jobs',
        title: 'Find jobs',
        body: 'Search several job boards from one box.',
      },
    ],
    outside: ['resume'],
  },
  {
    id: 'prepare-answers',
    title: 'Prepare your answers',
    done: 'You have a 60-second opening, five STAR stories and a plan up to the interview day.',
    items: [
      {
        href: '/tell-me-about-yourself',
        title: '"Tell me about yourself" builder',
        body: 'Your opening answer in three parts, timed out loud, plus a 30-second version.',
        tag: 'First question',
      },
      {
        href: '/why-should-we-hire-you',
        title: '"Why should we hire you" builder',
        body: 'Their need, your proof with a number, what you would do first. Timed, with 9 checks.',
        tag: 'Closing question',
      },
      {
        href: '/star-method',
        title: 'STAR answer builder',
        body: 'Write a "tell me about a time" story and see how long it runs out loud.',
      },
      {
        href: '/interview-questions',
        title: 'Interview questions Q&A',
        body: 'Behavioural questions with what the interviewer is checking and a model answer.',
      },
      {
        href: '/interview-prep-plan',
        title: 'Interview prep plan',
        body: 'A day-by-day plan from your interview date and free time, with a calendar file.',
      },
      {
        href: '/product-manager/interview-tips',
        title:
          TIPS_COUNT > 1
            ? `Round-by-round tips (${TIPS_COUNT} roles)`
            : 'PM interview, round by round',
        body: 'What each product manager round tests and where candidates lose points.',
      },
    ],
    outside: ['behavioural', 'consulting'],
  },
  {
    id: 'practise-out-loud',
    title: 'Practise out loud',
    done: 'You have said your answers to someone who follows up, not just written them.',
    items: [
      {
        href: '/free-mock-interview',
        title: 'Free AI mock interview',
        body: 'A voice interviewer asks role questions, follows up on what you say, and tells you what was thin. Runs on Tough Tongue AI.',
        tag: 'Do this twice',
      },
    ],
  },
  {
    id: 'offer-and-salary',
    title: 'Know your number and negotiate',
    done: 'You know what the role pays, what an offer is worth in hand, and what to ask for.',
    items: [
      {
        href: '/product-manager/salary',
        title: `Salary data (${SALARY_COUNT} roles)`,
        body: 'Pay reported by people in the role and posted ranges, with sources and dates.',
        links: Object.values(ROLE_SALARIES).map((r) => ({
          href: `/${r.slug}/salary`,
          label: r.roleName,
        })),
      },
      {
        href: '/salary-calculator',
        title: 'CTC to in-hand calculator',
        body: 'Monthly take-home on FY 2026-27 tax, old vs new regime, PF and variable pay.',
      },
      {
        href: '/job-offer-comparison',
        title: 'Job offer comparison',
        body: 'Two or three offers side by side on real money: bonus clawback, ESOPs, rent.',
      },
      {
        href: '/salary-negotiation',
        title: 'Salary negotiation scripts',
        body: 'A counter email, call script and replies to "this is our max budget".',
      },
    ],
  },
]

const SECTION_BY_ID = Object.fromEntries(FREE_RESOURCE_SECTIONS.map((s) => [s.id, s]))

const FAQS = [
  {
    q: 'Where should I start preparing for an interview?',
    a: `Start with the role, not the questions: read the guide for your role (we have ${HUB_COUNT}), then check your resume against the job post, prepare a "tell me about yourself" answer and five STAR stories, and practise them out loud before the day.`,
  },
  {
    q: 'Are these interview resources free?',
    a: 'Yes. Every guide, template, checker and calculator on this page is free to use without signing up. The calculators and checkers run in your browser. The voice mock interview runs on Tough Tongue AI and is free to start.',
  },
  {
    q: 'Where are the MBA consulting casebooks?',
    a: 'We link to casebooks on the sites that publish them instead of re-hosting PDFs. The MBA and consulting page lists them with McKinsey and Bain’s own practice cases.',
  },
  {
    q: 'How do you check the outside links?',
    a: `Each outside link on the free resources page was opened and checked on ${CHECKED_LABEL}, and we link to the original publisher. There are ${FREE_RESOURCE_COUNT} of them.`,
  },
]

const container = 'mx-auto w-full max-w-[1200px] px-5 md:px-8'
const kicker = 'font-mono text-kicker uppercase tracking-[0.08em] text-signal-strong'

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-4 w-4 shrink-0 transition-transform duration-base group-hover:translate-x-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
    >
      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function ResourcesHubPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: 'Free interview prep resources, step by step',
        description: DESCRIPTION,
        url: 'https://www.autointerviewai.com/resources',
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQS.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  }
  const ctaQuestions = ['aipm', 'data-analyst', 'strategy-and-operations', 'ai-engineer']
    .map((slug) => {
      const qs = ROLE_HUBS[slug]?.questionGroups.flatMap((g) => g.questions) ?? []
      return [...qs].filter((q) => q.q.length < 75).sort((a, b) => a.q.length - b.q.length)[0]?.q
    })
    .filter((q): q is string => Boolean(q))

  return (
    <DomainLayout currentPath="/resources">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ===== HERO: answer + the stage picker ===== */}
      <section className="border-b border-border">
        <div className={`${container} grid gap-10 py-12 md:py-20 lg:grid-cols-12 lg:gap-12`}>
          <div className="lg:col-span-7 lg:pt-4">
            <p className={`animate-fade-rise ${kicker}`}>
              Resources · {STAGES.reduce((n, s) => n + s.items.length, 0)} free tools and guides ·
              Updated Nov 2026
            </p>
            <h1 className="animate-fade-rise mt-4 max-w-[18ch] font-serif text-display font-medium text-fg">
              Interview prep resources, in the order you need them.
            </h1>
            <p className="animate-fade-rise-delay mt-5 max-w-[56ch] text-body-lg text-fg-2">
              Five stages from job post to offer. Each stage says what &ldquo;done&rdquo; looks like
              and gives you the free tool for it. Reading and the tools need no sign-up.
            </p>
            <div className="animate-fade-rise-delay-2 mt-8 flex flex-wrap items-start gap-3">
              <MockInterviewButton />
              <a
                href="#learn-the-role"
                className="inline-flex h-12 items-center rounded-full bg-surface px-5 text-small font-semibold text-fg ring-1 ring-inset ring-border-strong transition-colors duration-fast hover:bg-muted"
              >
                Start at stage 1
              </a>
            </div>
          </div>

          <nav aria-label="Prep stages" className="animate-fade-rise-delay lg:col-span-5">
            <div className="rounded-2xl border border-border bg-surface p-2 shadow-e2">
              <div className="flex items-center justify-between px-4 pb-2 pt-3">
                <h2 className="text-small font-semibold text-fg">Where are you?</h2>
                <span className="text-caption text-fg-3">{STAGES.length} stages</span>
              </div>
              <ol className="relative">
                {STAGES.map((s, i) => (
                  <li key={s.id} className="relative">
                    {i < STAGES.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="absolute bottom-0 left-[31px] top-[38px] w-px bg-border-strong"
                      />
                    )}
                    <a
                      href={`#${s.id}`}
                      className="group flex min-h-[56px] items-center gap-3 rounded-lg px-4 py-2.5 transition-colors duration-fast hover:bg-signal-tint"
                    >
                      <span
                        className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-caption font-semibold transition-colors duration-fast ${
                          s.id === 'practise-out-loud'
                            ? 'bg-signal text-white'
                            : 'bg-signal-tint text-signal-ink group-hover:bg-signal group-hover:text-white'
                        }`}
                      >
                        {i + 1}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-small font-medium text-fg group-hover:text-signal-strong">
                          {s.title}
                        </span>
                        <span className="block text-caption text-fg-3">
                          {s.items.length} {s.items.length === 1 ? 'tool' : 'tools and guides'}
                        </span>
                      </span>
                      <span className="text-signal-strong">
                        <Arrow />
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>
        </div>
      </section>

      {/* ===== THE STAGES ===== */}
      {STAGES.map((s, i) => {
        const outside = (s.outside ?? [])
          .map((id) => SECTION_BY_ID[id])
          .filter(Boolean)
          .flatMap((sec) => sec.items.filter((it) => /^https?:/.test(it.url)).slice(0, 2))
        return (
          <section
            key={s.id}
            id={s.id}
            aria-labelledby={`${s.id}-title`}
            className={`scroll-mt-24 border-b border-border py-14 md:py-20 ${
              i % 2 === 1 ? 'bg-surface' : ''
            }`}
          >
            <div className={`${container} grid gap-8 lg:grid-cols-12 lg:gap-12`}>
              <div className="lg:col-span-4">
                <p className={kicker}>
                  Stage {i + 1} of {STAGES.length}
                </p>
                <h2 id={`${s.id}-title`} className="mt-3 text-h2 font-semibold text-fg">
                  {s.title}
                </h2>
                <p className="mt-4 flex gap-2 text-small text-fg-2">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    className="mt-0.5 h-4 w-4 shrink-0 text-signal-strong"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                  >
                    <path d="M4 10.5l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>
                    <span className="font-semibold text-fg">Done when: </span>
                    {s.done}
                  </span>
                </p>
                {s.id === 'practise-out-loud' && (
                  <div className="mt-6">
                    <MockInterviewButton caption />
                  </div>
                )}
              </div>

              <div className="lg:col-span-8">
                <ul className="grid gap-4 sm:grid-cols-2">
                  {s.items.map((it) =>
                    it.links ? (
                      <li
                        key={it.href}
                        className="flex h-full flex-col rounded-xl border border-border bg-surface p-5"
                      >
                        <span className="text-h4 font-semibold text-fg">{it.title}</span>
                        <span className="mt-2 text-small text-fg-2">{it.body}</span>
                        <span className="mt-3 flex flex-wrap gap-2">
                          {it.links.map((l) => (
                            <Link
                              key={l.href}
                              href={l.href}
                              className="inline-flex min-h-[32px] items-center rounded-full bg-muted px-3 text-caption font-medium text-fg-2 transition-colors duration-fast hover:bg-signal-tint hover:text-signal-ink"
                            >
                              {l.label}
                            </Link>
                          ))}
                        </span>
                      </li>
                    ) : (
                      <li key={it.href}>
                        <Link
                          href={it.href}
                          className="group flex h-full flex-col rounded-xl border border-border bg-surface p-5 transition-[border-color,box-shadow] duration-fast hover:border-border-strong hover:shadow-e2"
                        >
                          <span className="flex items-start justify-between gap-3">
                            <span className="text-h4 font-semibold text-fg group-hover:text-signal-strong">
                              {it.title}
                            </span>
                            <span className="mt-1 text-signal-strong">
                              <Arrow />
                            </span>
                          </span>
                          {it.tag && (
                            <span className="mt-2 inline-flex h-6 w-fit items-center rounded-full bg-signal-tint px-2.5 text-caption font-medium text-signal-ink">
                              {it.tag}
                            </span>
                          )}
                          <span className="mt-2 text-small text-fg-2">{it.body}</span>
                        </Link>
                      </li>
                    )
                  )}
                </ul>

                {s.id === 'practise-out-loud' && <MockLoopSteps className="mt-6" />}

                {outside.length > 0 && (
                  <div className="mt-6 rounded-xl border border-dashed border-border-strong p-5">
                    <p className="font-mono text-kicker uppercase tracking-[0.08em] text-fg-3">
                      Outside reading we checked · {CHECKED_LABEL}
                    </p>
                    <ul className="mt-3 divide-y divide-border">
                      {outside.map((o) => (
                        <li key={o.url} className="py-2.5">
                          <a
                            href={o.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-small font-medium text-signal-strong underline-offset-2 hover:underline"
                          >
                            {o.title}
                          </a>
                          <span className="text-caption text-fg-3"> · {o.publisher}</span>
                          <p className="mt-0.5 text-caption text-fg-2">{o.why}</p>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/free-resources"
                      className="group mt-3 inline-flex items-center gap-1.5 text-small font-semibold text-signal-strong"
                    >
                      All {FREE_RESOURCE_COUNT} checked links <Arrow />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </section>
        )
      })}

      {/* ===== MBA / CONSULTING ===== */}
      <section aria-labelledby="mba-title" className="border-b border-border py-14 md:py-16">
        <div className={container}>
          <Link
            href="/resources/mba/consulting"
            className="group flex flex-col gap-4 rounded-xl border border-border bg-surface p-6 transition-[border-color,box-shadow] duration-fast hover:border-border-strong hover:shadow-e2 md:flex-row md:items-center md:justify-between md:p-8"
          >
            <span>
              <span className="font-mono text-kicker uppercase tracking-[0.08em] text-fg-3">
                MBA and consulting
              </span>
              <span
                id="mba-title"
                className="mt-2 block text-h3 font-semibold text-fg group-hover:text-signal-strong"
              >
                Case interview casebooks and practice cases
              </span>
              <span className="mt-1 block max-w-[60ch] text-small text-fg-2">
                Where to find the B-school casebooks and the firms&rsquo; own practice cases, plus
                how to practise a case with a partner.
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-small font-semibold text-signal-strong">
              Open casebook list <Arrow />
            </span>
          </Link>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section aria-labelledby="faq-title" className="py-14 md:py-20">
        <div className={`${container} max-w-3xl`}>
          <p className={kicker}>FAQ · {FAQS.length} questions</p>
          <h2 id="faq-title" className="mt-3 text-h2 font-semibold text-fg">
            Questions about these resources
          </h2>
          <div className="mt-8 space-y-3">
            {FAQS.map((f, i) => (
              <details
                key={f.q}
                open={i === 0}
                className="group rounded-xl border border-border bg-surface open:shadow-e1"
              >
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 font-medium text-fg">
                  {f.q}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    className="h-5 w-5 shrink-0 text-fg-3 transition-transform duration-base group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                  >
                    <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <p className="max-w-prose px-5 pb-5 text-body text-fg-2">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <MockInterviewCTA
        title="Stage 4 is the one people skip."
        body="Reading answers is not the same as saying them. A voice interviewer asks role questions, follows up on what you say, and tells you what was strong and what was thin."
        questions={ctaQuestions}
      />
    </DomainLayout>
  )
}
