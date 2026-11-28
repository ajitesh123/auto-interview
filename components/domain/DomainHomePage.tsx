import Link from 'next/link'
import DomainLayout from './DomainLayout'
import MockInterviewButton from '@/components/ai/MockInterviewButton'
import MockInterviewCTA from '@/components/ai/MockInterviewCTA'
import { ROLE_HUB_LIST, ROLE_HUBS } from '@/data/roleHubs'
import { LESSONS, TRACKS, TOTAL_MINUTES } from '@/data/learnAi'
import { PG_LESSONS } from '@/data/pgCourse'
import { ROLE_KITS, KIT_PATHS } from '@/data/roleKits'
import { ROLE_SALARIES } from '@/data/roleSalary'
import { ROLE_CONCEPTS } from '@/data/roleConcepts'
import { ROLE_COVER_LETTERS, coverLetterPath } from '@/data/roleCoverLetters'
import { ROLE_INTERVIEW_TIPS, interviewTipsPath } from '@/data/roleInterviewTips'
import { HOME_FAQS } from './homeFaqs'

/* Every number on this page is counted from the site's own data files at build time. */
const HUBS = ROLE_HUB_LIST.map((hub) => {
  const qs = hub.questionGroups.flatMap((g) => g.questions)
  const s = hub.slug
  const kit = [
    ROLE_SALARIES[s] && { href: `/${s}/salary`, label: 'Salary' },
    ROLE_KITS[s] && { href: KIT_PATHS.resume(s), label: 'Resume (CV)' },
    ROLE_COVER_LETTERS[s] && { href: coverLetterPath(s), label: 'Cover letter' },
    ROLE_INTERVIEW_TIPS[s] && { href: interviewTipsPath(s), label: 'Round tips' },
    ROLE_CONCEPTS[s] && { href: `/${s}/concepts`, label: 'Concepts quiz' },
  ].filter(Boolean) as { href: string; label: string }[]
  return {
    slug: s,
    name: hub.roleName,
    short: hub.shortName,
    kit,
    questions: qs.length,
  }
})
const TOTAL_QUESTIONS = HUBS.reduce((n, h) => n + h.questions, 0)
const LEARN_HOURS = Math.round(TOTAL_MINUTES / 60)

/* The questions cycling in the closing mock-interview panel: the shortest real question
   from four hubs, so the panel shows what the interviewer actually asks. */
const CTA_QUESTIONS = ['ai-engineer', 'aipm', 'strategy-and-operations', 'fde']
  .map((slug) => {
    const qs = ROLE_HUBS[slug]?.questionGroups.flatMap((g) => g.questions) ?? []
    return [...qs].filter((q) => q.q.length < 75).sort((a, b) => a.q.length - b.q.length)[0]?.q
  })
  .filter((q): q is string => Boolean(q))

const container = 'mx-auto w-full max-w-[1200px] px-5 md:px-8'
const kicker = 'font-mono text-kicker uppercase tracking-[0.08em] text-signal-strong'
const card =
  'group relative rounded-xl border border-border bg-surface transition-[border-color,box-shadow] duration-fast hover:border-border-strong hover:shadow-e2'

const STEPS = [
  {
    n: '1',
    title: 'Learn the role',
    body: `Read what the job really involves and ${TOTAL_QUESTIONS} interview questions with model answers.`,
    href: '#roles',
    cta: 'Pick a role',
  },
  {
    n: '2',
    title: 'Fix your resume',
    body: 'Paste a real job post and your resume. See which skills the post asks for that you never mention.',
    href: '/resume-keyword-checker',
    cta: 'Check my resume',
  },
  {
    n: '3',
    title: 'Know your number',
    body: 'Turn a CTC into what lands in your bank each month, so you know your number before you negotiate.',
    href: '/salary-calculator',
    cta: 'CTC to in-hand',
  },
  {
    n: '4',
    title: 'Practise out loud',
    body: 'A voice interviewer runs a PM case, a consulting case or an AI engineer round and follows up on what you say.',
    href: '/free-mock-interview',
    cta: 'Start a mock interview',
  },
]

const TOOLS = [
  {
    href: '/resume-keyword-checker',
    title: 'Resume keyword checker',
    body: 'Job post vs your resume (CV): missing skills, title check and 8 format checks.',
  },
  {
    href: '/salary-calculator',
    title: 'CTC to in-hand calculator',
    body: 'Monthly take-home on FY 2026-27 tax, old vs new regime, PF and variable pay.',
  },
  {
    href: '/interview-prep-plan',
    title: 'Interview prep plan',
    body: 'A day-by-day plan from your interview date and free time, with mocks and a calendar file.',
  },
  {
    href: '/ats-resume-checker',
    title: 'ATS resume checker',
    body: 'Drop a PDF or Word resume: see the text a parser reads, plus checks for columns, tables and headers.',
  },
  {
    href: '/linkedin-headline-checker',
    title: 'LinkedIn headline checker',
    body: 'Paste your headline: 10 checks for the 220-character limit, your role up front, skills and buzzwords.',
  },
  {
    href: '/tell-me-about-yourself',
    title: '"Tell me about yourself" builder',
    body: 'Your opening answer in three parts, timed out loud, with 8 checks and a 30-second version.',
  },
  {
    href: '/why-should-we-hire-you',
    title: '"Why should we hire you" builder',
    body: 'Match the job post, prove it with a number, end on what you would do first. Timed, 9 checks.',
  },
  {
    href: '/notice-period-calculator',
    title: 'Notice period calculator',
    body: 'Your last working day, leave set-off, buyout cost for the joining date and when final wages are due.',
  },
  {
    href: '/star-method',
    title: 'STAR answer builder',
    body: 'Write a "tell me about a time" story and see its length out loud and 8 checks.',
  },
  {
    href: '/referral-message',
    title: 'Referral message builder',
    body: 'A LinkedIn note, message, email and follow-up for a job referral, with 8 checks.',
  },
  {
    href: '/job-offer-comparison',
    title: 'Job offer comparison',
    body: 'Two or three offers side by side on real money: bonus clawback, ESOPs, rent.',
  },
  {
    href: '/salary-negotiation',
    title: 'Salary negotiation scripts',
    body: 'Counter email, call script and replies to "max budget", built from your offer.',
  },
  {
    href: '/cv-templates',
    title: 'One-page CV templates',
    body: 'Word templates in the plain one-page format recruiters and ATS read.',
  },
  {
    href: '/cover-letter',
    title: 'Cover letter builder',
    body: 'Write it part by part, in the right format for email, PDF or a Naukri box, with 10 checks.',
  },
]

const SALES = [
  {
    href: '/cold-call-practice',
    title: 'Cold call practice',
    body: 'Roleplay a cold call with an AI buyer who objects, and get a scored report.',
  },
  {
    href: '/ai-sales-training',
    title: 'AI sales training',
    body: 'How teams use AI roleplay to train reps on discovery and objection handling.',
  },
  {
    href: '/voice-ai-calling',
    title: 'Voice AI calling',
    body: 'What AI calling agents do, what they cost, and the rules by country.',
  },
]

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

export default function DomainHomePage() {
  return (
    <DomainLayout currentPath="/">
      {/* ===== HERO: answer + the one CTA on the left, "pick your role" on the right ===== */}
      <section className="border-b border-border">
        <div className={`${container} grid gap-10 py-12 md:py-20 lg:grid-cols-12 lg:gap-12`}>
          <div className="lg:col-span-7 lg:pt-6">
            <p className={`animate-fade-rise ${kicker}`}>
              Free · No sign-up to read · Updated November 2026
            </p>
            <h1 className="animate-fade-rise mt-4 max-w-[16ch] font-serif text-display font-medium text-fg">
              Walk into your interview ready.
            </h1>
            <p className="animate-fade-rise-delay mt-5 max-w-[56ch] text-body-lg text-fg-2">
              Pick your role. Read the questions interviewers ask, check your resume against a real
              job post, know what the role pays, then practise out loud with a voice interviewer.
            </p>
            <div className="animate-fade-rise-delay-2 mt-8 flex flex-wrap items-start gap-3">
              <MockInterviewButton />
              <a
                href="#roles"
                className="inline-flex h-12 items-center rounded-full bg-surface px-5 text-small font-semibold text-fg ring-1 ring-inset ring-border-strong transition-colors duration-fast hover:bg-muted"
              >
                Find your role
              </a>
            </div>
            <div className="animate-fade-rise-delay-2 mt-10 grid max-w-2xl grid-cols-2 gap-x-4 gap-y-5 border-t border-border pt-6 sm:grid-cols-4">
              {[
                { v: String(HUBS.length), l: 'role guides', href: '#roles' },
                { v: String(TOTAL_QUESTIONS), l: 'questions with model answers', href: '#roles' },
                { v: String(TOOLS.length), l: 'free tools and templates', href: '#tools-title' },
                { v: String(LESSONS.length), l: 'Learn AI lessons', href: '/learn-ai' },
              ].map((s) => (
                <Link
                  key={s.l}
                  href={s.href}
                  className="group flex flex-col rounded-lg transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-4"
                >
                  <span className="text-h2 font-semibold tabular-nums text-fg transition-colors duration-fast group-hover:text-signal-strong">
                    {s.v}
                  </span>
                  <span className="mt-1 text-caption text-fg-3 underline decoration-transparent underline-offset-4 transition-colors duration-fast group-hover:decoration-border-strong">
                    {s.l}&nbsp;<span aria-hidden="true">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Pick your role: the first action, Interview Warmup style */}
          <div className="animate-fade-rise-delay lg:col-span-5">
            <div className="rounded-2xl border border-border bg-surface p-2 shadow-e2">
              <div className="flex items-center justify-between px-4 pb-2 pt-3">
                <h2 className="text-small font-semibold text-fg">Pick your role</h2>
                <span className="text-caption text-fg-3">{HUBS.length} guides</span>
              </div>
              <ul className="divide-y divide-border">
                {HUBS.map((h) => (
                  <li key={h.slug}>
                    <Link
                      href={`/${h.slug}`}
                      className="group flex min-h-[44px] items-center justify-between gap-3 rounded-lg px-4 py-2.5 text-small transition-colors duration-fast hover:bg-signal-tint"
                    >
                      <span className="font-medium text-fg group-hover:text-signal-strong">
                        {h.name}
                      </span>
                      <span className="flex items-center gap-2 text-caption text-fg-3">
                        <span className="whitespace-nowrap tabular-nums">
                          {h.questions} questions
                        </span>
                        <span className="text-signal-strong">
                          <Arrow />
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== THE PATH: four things to do, each a real page ===== */}
      <section aria-labelledby="path-title" className="py-16 md:py-24">
        <div className={container}>
          <div className="max-w-2xl">
            <p className={kicker}>Your prep path · 4 steps</p>
            <h2 id="path-title" className="mt-3 text-h2 font-semibold text-fg">
              From job post to offer, in the order that works
            </h2>
          </div>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s.n} className="relative">
                <Link href={s.href} className={`${card} flex h-full flex-col p-5 md:p-6`}>
                  <span className="flex items-center gap-3">
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full font-mono text-caption font-semibold ${
                        i === STEPS.length - 1
                          ? 'bg-signal text-white'
                          : 'bg-signal-tint text-signal-ink'
                      }`}
                    >
                      {s.n}
                    </span>
                    <span className="text-h4 font-semibold text-fg">{s.title}</span>
                  </span>
                  <span className="mt-3 flex-1 text-small text-fg-2">{s.body}</span>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-small font-semibold text-signal-strong">
                    {s.cta} <Arrow />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== ROLE GUIDES ===== */}
      <section
        id="roles"
        aria-labelledby="roles-title"
        className="scroll-mt-24 border-t border-border bg-surface py-16 md:py-24"
      >
        <div className={container}>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className={kicker}>
                Role guides · {HUBS.length} roles · {TOTAL_QUESTIONS} questions
              </p>
              <h2 id="roles-title" className="mt-3 text-h2 font-semibold text-fg">
                Everything for one role, on one page
              </h2>
            </div>
            <p className="max-w-md text-small text-fg-2">
              What the job involves, interview questions with model answers, pay with sources, and
              the rest of the kit: salary, resume (CV) and cover letter pages where we have them.
            </p>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 md:gap-5">
            {HUBS.map((h) => (
              <li key={h.slug} className={`${card} flex flex-col p-5 md:p-6`}>
                <div className="flex items-start justify-between gap-3">
                  <Link
                    href={`/${h.slug}`}
                    className="text-h4 font-semibold text-fg after:absolute after:inset-0 after:rounded-xl group-hover:text-signal-strong"
                  >
                    {h.name}
                  </Link>
                  <span className="mt-1 text-signal-strong">
                    <Arrow />
                  </span>
                </div>
                <p className="mt-1.5 text-small text-fg-2">
                  <span className="tabular-nums">{h.questions} interview questions</span> with model
                  answers
                </p>
                {h.kit.length > 0 && (
                  <div className="relative z-10 mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
                    {h.kit.map((k) => (
                      <Link
                        key={k.href}
                        href={k.href}
                        aria-label={`${h.short} ${k.label.toLowerCase()}`}
                        className="inline-flex min-h-[32px] items-center rounded-full bg-muted px-3 text-caption font-medium text-fg-2 transition-colors duration-fast hover:bg-signal-tint hover:text-signal-ink"
                      >
                        {k.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== FREE TOOLS ===== */}
      <section aria-labelledby="tools-title" className="border-t border-border py-16 md:py-24">
        <div className={container}>
          <div className="max-w-2xl">
            <p className={kicker}>Free tools · no sign-up · calculators run in your browser</p>
            <h2 id="tools-title" className="mt-3 scroll-mt-24 text-h2 font-semibold text-fg">
              Tools for the parts people get stuck on
            </h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TOOLS.map((t) => (
              <Link key={t.href} href={t.href} className={`${card} flex flex-col p-5 md:p-6`}>
                <span className="flex items-center justify-between gap-3 text-h4 font-semibold text-fg group-hover:text-signal-strong">
                  {t.title}
                  <span className="text-signal-strong">
                    <Arrow />
                  </span>
                </span>
                <span className="mt-2 text-small text-fg-2">{t.body}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LEARN ===== */}
      <section
        aria-labelledby="learn-title"
        className="border-t border-border bg-surface py-16 md:py-24"
      >
        <div className={container}>
          <div className="max-w-2xl">
            <p className={kicker}>Free courses · no sign-up · progress saved on your device</p>
            <h2 id="learn-title" className="mt-3 text-h2 font-semibold text-fg">
              Learn what the interview will test
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 md:gap-6">
            <Link href="/learn-ai" className={`${card} flex flex-col p-6 md:p-8`}>
              <span className="font-mono text-kicker uppercase tracking-[0.08em] text-fg-3">
                {LESSONS.length} lessons · {TRACKS.length} tracks · about {LEARN_HOURS} hours
              </span>
              <span className="mt-3 text-h2 font-semibold text-fg group-hover:text-signal-strong">
                Learn AI
              </span>
              <span className="mt-3 text-body text-fg-2">
                From what an LLM is to prompts, RAG, agents, evals and voice agents. Each lesson has
                a worked example and something to try.
              </span>
              <span className="mt-6 inline-flex items-center gap-1.5 text-small font-semibold text-signal-strong">
                Start lesson 1 <Arrow />
              </span>
            </Link>
            <Link href="/paul-graham" className={`${card} flex flex-col p-6 md:p-8`}>
              <span className="font-mono text-kicker uppercase tracking-[0.08em] text-fg-3">
                {PG_LESSONS.length} lessons · from the original essays
              </span>
              <span className="mt-3 text-h2 font-semibold text-fg group-hover:text-signal-strong">
                Paul Graham and YC
              </span>
              <span className="mt-3 text-body text-fg-2">
                The essays founders and startup hires are expected to know, each read for what to do
                with it, plus a YC application challenge.
              </span>
              <span className="mt-6 inline-flex items-center gap-1.5 text-small font-semibold text-signal-strong">
                Read the course <Arrow />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FOR SALES TEAMS (Tough Tongue AI's other audience) ===== */}
      <section aria-labelledby="sales-title" className="border-t border-border py-16 md:py-20">
        <div className={container}>
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className={kicker}>For sales teams</p>
              <h2 id="sales-title" className="mt-3 text-h3 font-semibold text-fg">
                The same voice roleplay, for sales calls
              </h2>
              <p className="mt-3 text-small text-fg-2">
                Reps practise cold calls and objections with an AI buyer before they reach a real
                one.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 lg:col-span-8">
              {SALES.map((s) => (
                <Link key={s.href} href={s.href} className={`${card} flex flex-col p-5`}>
                  <span className="flex items-center justify-between gap-2 text-small font-semibold text-fg group-hover:text-signal-strong">
                    {s.title}
                    <span className="text-signal-strong">
                      <Arrow />
                    </span>
                  </span>
                  <span className="mt-2 text-caption text-fg-2">{s.body}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ (native details, answers in the HTML) ===== */}
      <section aria-labelledby="faq-title" className="border-t border-border py-16 md:py-24">
        <div className={`${container} grid gap-8 lg:grid-cols-12`}>
          <div className="lg:col-span-4">
            <p className={kicker}>FAQ · {HOME_FAQS.length} questions</p>
            <h2 id="faq-title" className="mt-3 text-h2 font-semibold text-fg">
              Questions people ask first
            </h2>
          </div>
          <div className="space-y-3 lg:col-span-8">
            {HOME_FAQS.map((f, i) => (
              <details
                key={f.q}
                open={i < 2}
                className="group rounded-xl border border-border bg-surface open:shadow-e1"
              >
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-medium text-fg [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    className="h-4 w-4 shrink-0 text-fg-3 transition-transform duration-base group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                  >
                    <path d="m4 6 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <p className="max-w-prose px-5 pb-5 text-body text-fg-2">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <MockInterviewCTA
        title="Practise out loud. It’s free."
        body="Pick a product manager case, a consulting case or an AI engineer technical round. A voice interviewer listens and follows up on what you actually said."
        questions={CTA_QUESTIONS}
      />
    </DomainLayout>
  )
}
