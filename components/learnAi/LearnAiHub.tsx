import Link from 'next/link'
import DomainLayout from '@/components/domain/DomainLayout'
import { RevealRoot } from '@/components/roleHub/JourneyClient'
import { ArrowRightIcon, ArrowUpRightIcon } from '@/components/roleHub/icons'
import {
  LESSONS,
  PLAN,
  TOTAL_MINUTES,
  TRACKS,
  lessonsByTrack,
  sourceVoices,
  topVideos,
} from '@/data/learnAi'
import { DoneMark, HubResume, YouTubeFacade } from './LearnAiClient'

// Learn AI hub: one path from "what is AI?" to building agents (Signal Paper design).
// Shows the whole map up front, remembers progress on the device, and plays videos in place.

const SITE = 'https://www.autointerviewai.com'
const container = 'mx-auto w-full max-w-[1200px] px-5 md:px-8'
const kicker = 'font-mono text-kicker uppercase tracking-[0.08em]'

export const HUB_FAQS = [
  {
    q: 'What is the best way to learn AI for free?',
    a: 'Follow one path in order instead of jumping between random videos. Start with what AI and LLMs are, then learn to prompt well, then learn the parts of AI products (APIs, tool calling, RAG, MCP, agents), then build something small with n8n, Claude Code, Cursor or Codex. Each lesson here is short, links the best free videos (Andrej Karpathy, 3Blue1Brown, Anthropic, IBM), and ends with a hands-on task and a quick check.',
  },
  {
    q: 'How long does it take to learn AI?',
    a: `The ${LESSONS.length} lessons here take about ${Math.round(TOTAL_MINUTES / 60)} hours of reading and doing, plus optional videos. One lesson a day gets you from complete beginner to building your first agent and automation in about a month. Going deep, for example building a GPT from scratch with Karpathy’s Zero to Hero course, takes many more weeks.`,
  },
  {
    q: 'Do I need to know coding to learn AI?',
    a: 'No. Tracks 1 and 2 (understanding AI and using it well) need no code at all. Track 3 shows small, readable code snippets but explains every line. Tools like n8n and app builders let you automate and build without coding, and Claude Code, Cursor and Codex can write the code for you once you know what to ask.',
  },
  {
    q: 'Which lesson should I start with?',
    a: 'If you are new, start with lesson 1, “What is AI?”, and go in order. If you already use ChatGPT or Claude daily, start at the Use AI well track. If you want to build products, start at What is an API? in the Build with AI track.',
  },
  {
    q: 'Is this Learn AI course really free?',
    a: 'Yes. Every lesson is free to read, with no login and no sign-up. Your progress is saved in your own browser on this device. The videos are free on YouTube and play right on the page.',
  },
]

export default function LearnAiHub() {
  const hours = Math.round(TOTAL_MINUTES / 60)
  const videos = topVideos(8)
  const voices = sourceVoices().slice(0, 9)
  const first = LESSONS[0]
  const url = `${SITE}/learn-ai`

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
        { '@type': 'ListItem', position: 2, name: 'Learn AI', item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'Learn AI: from your first prompt to building agents',
      description:
        'A free, step-by-step path from what AI is to LLMs, transformers, prompting, APIs, RAG, MCP, agents, n8n automations, Claude Code, Cursor and Codex.',
      url,
      inLanguage: 'en',
      isAccessibleForFree: true,
      educationalLevel: 'Beginner to advanced',
      provider: { '@type': 'Organization', name: 'Auto Interview AI', sameAs: SITE },
      offers: { '@type': 'Offer', category: 'Free', price: 0, priceCurrency: 'USD' },
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'Online',
        courseWorkload: `PT${hours}H`,
      },
      teaches: LESSONS.map((l) => l.title),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Learn AI lessons',
      itemListElement: LESSONS.map((l) => ({
        '@type': 'ListItem',
        position: l.order,
        url: `${SITE}/learn-ai/${l.slug}`,
        name: l.title,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: HUB_FAQS.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ]

  return (
    <DomainLayout currentPath="/learn-ai">
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
      <RevealRoot />

      <div className="bg-bg text-fg">
        {/* ---------- Hero ---------- */}
        <div className={`${container} pb-12 pt-8 md:pb-20 md:pt-14`}>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-caption text-fg-3">
            <Link href="/" className="hover:text-fg">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-fg-2">Learn AI</span>
          </nav>
          <div className="mt-6 lg:grid lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <div className={`${kicker} text-signal-strong`}>
                Free · No login · {LESSONS.length} lessons · Updated Nov 2026
              </div>
              <h1 className="mt-4 font-serif text-display font-medium text-fg">
                Learn AI, from your first prompt to building agents
              </h1>
              <p className="mt-5 max-w-[56ch] text-body-lg text-fg-2">
                Short lessons in a clear order: what LLMs and transformers are, how to get better
                answers, how APIs, RAG, MCP and agents work, then real automations and coding with
                n8n, Claude Code, Cursor and Codex. Each lesson has the best free videos, a hands-on
                task and a quick check.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {first && (
                  <Link
                    href={`/learn-ai/${first.slug}`}
                    className="inline-flex h-12 items-center gap-2 rounded-full bg-signal px-6 text-small font-semibold text-white shadow-e1 transition-colors duration-fast hover:bg-signal-strong"
                  >
                    Start lesson 1: {first.title} <ArrowRightIcon />
                  </Link>
                )}
                <a
                  href="#map"
                  className="inline-flex h-12 items-center rounded-full bg-surface px-6 text-small font-semibold text-fg ring-1 ring-inset ring-border-strong transition-colors duration-fast hover:bg-muted"
                >
                  See the whole path
                </a>
              </div>
              <HubResume
                lessons={LESSONS.map((l) => ({ slug: l.slug, title: l.title, order: l.order }))}
              />
            </div>

            {/* Glance card */}
            <dl className="mt-10 grid grid-cols-2 gap-3 lg:col-span-5 lg:mt-1 lg:self-start">
              {[
                {
                  k: 'Lessons',
                  v: String(LESSONS.length),
                  s: `${PLAN.length} planned, more added often`,
                },
                { k: 'Tracks', v: String(TRACKS.length), s: 'Beginner to advanced' },
                { k: 'Time', v: `~${hours} h`, s: 'Reading and doing, videos extra' },
                { k: 'Cost', v: 'Free', s: 'No login, progress saved here' },
              ].map((x) => (
                <div key={x.k} className="rounded-xl border border-border bg-surface p-4 md:p-5">
                  <dt className="text-small text-fg-2">{x.k}</dt>
                  <dd className="mt-1 text-h2 font-semibold tabular-nums text-fg">{x.v}</dd>
                  <dd className="mt-1 text-caption text-fg-3">{x.s}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* ---------- The path ---------- */}
        <div id="map" className="scroll-mt-20 border-t border-border">
          {TRACKS.map((t) => {
            const items = lessonsByTrack(t.id)
            if (!items.length) return null
            const mins = items.reduce((n, l) => n + l.minutes, 0)
            return (
              <section
                key={t.id}
                id={t.id}
                aria-labelledby={`${t.id}-title`}
                className="scroll-mt-20 border-b border-border"
              >
                <div className={`${container} py-12 md:py-16 lg:grid lg:grid-cols-12 lg:gap-12`}>
                  <header data-reveal className="lg:col-span-4">
                    <div className="lg:sticky lg:top-24">
                      <div className={`${kicker} text-signal-strong`}>
                        Track {t.n} of {TRACKS.length} · {items.length} lessons · {mins} min
                      </div>
                      <h2 id={`${t.id}-title`} className="mt-3 text-h2 font-semibold text-fg">
                        {t.title}
                      </h2>
                      <p className="mt-2 max-w-[44ch] text-body text-fg-2">{t.promise}</p>
                    </div>
                  </header>
                  <ol className="relative mt-6 lg:col-span-8 lg:mt-0">
                    {items.map((l, i) => (
                      <li key={l.slug} className="relative">
                        {i < items.length - 1 && (
                          <span
                            aria-hidden="true"
                            className="absolute bottom-0 left-[31px] top-12 w-px bg-border"
                          />
                        )}
                        <Link
                          href={`/learn-ai/${l.slug}`}
                          className="group relative flex items-start gap-4 rounded-xl px-4 py-3.5 transition-colors duration-fast hover:bg-surface hover:shadow-e1"
                        >
                          <DoneMark slug={l.slug} n={l.order} />
                          <span className="min-w-0 flex-1">
                            <span className="flex items-baseline justify-between gap-3">
                              <span className="text-body font-semibold text-fg group-hover:text-signal-strong">
                                {l.title}
                              </span>
                              <span className="shrink-0 text-caption tabular-nums text-fg-3">
                                {l.minutes} min
                              </span>
                            </span>
                            <span className="mt-0.5 line-clamp-2 text-small text-fg-2">
                              {l.tldr}
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ol>
                </div>
              </section>
            )
          })}
        </div>

        <div className={`${container} space-y-20 py-16 md:space-y-24 md:py-24`}>
          {/* ---------- Videos ---------- */}
          {videos.length > 0 && (
            <section aria-labelledby="videos-title" className="space-y-6">
              <header data-reveal className="max-w-2xl">
                <div className={`${kicker} text-signal-strong`}>
                  {videos.length} videos · play right here
                </div>
                <h2 id="videos-title" className="mt-3 text-h2 font-semibold text-fg">
                  Watch: the best free AI videos
                </h2>
                <p className="mt-2 text-body text-fg-2">
                  Andrej Karpathy, 3Blue1Brown, Anthropic and others explain it better than anyone.
                  Each video sits inside the lesson it belongs to.
                </p>
              </header>
              <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                {videos.map((v) => (
                  <figure key={v.youtubeId} data-reveal className="space-y-3">
                    <YouTubeFacade id={v.youtubeId} title={v.title} start={v.start} />
                    <figcaption>
                      <div className="line-clamp-2 text-small font-semibold leading-snug text-fg">
                        {v.title}
                      </div>
                      <div className="mt-1 text-caption text-fg-3">
                        {v.channel} · {v.minutes} min
                      </div>
                      <Link
                        href={`/learn-ai/${v.lesson.slug}`}
                        className="mt-1 inline-flex min-h-9 items-center text-caption font-medium text-signal-strong underline-offset-4 hover:underline"
                      >
                        In lesson {v.lesson.order}: {v.lesson.title} →
                      </Link>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )}

          {/* ---------- From the people who built it ---------- */}
          {voices.length > 0 && (
            <section aria-labelledby="voices-title" className="space-y-6">
              <header data-reveal className="max-w-2xl">
                <div className={`${kicker} text-signal-strong`}>
                  Original papers, talks and essays
                </div>
                <h2 id="voices-title" className="mt-3 text-h2 font-semibold text-fg">
                  Learn from the people who built it
                </h2>
                <p className="mt-2 text-body text-fg-2">
                  Each lesson takes one original idea, breaks it down in plain English, and shows
                  how to use it.
                </p>
              </header>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {voices.map((s) => (
                  <div
                    key={s.who + s.work}
                    data-reveal
                    className="flex flex-col rounded-xl border border-border bg-surface p-5"
                  >
                    <div className="text-h4 font-semibold text-fg">{s.who}</div>
                    <div className="mt-0.5 text-caption text-fg-3">{s.role}</div>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-start gap-1 text-small text-fg-2 underline decoration-border-strong underline-offset-4 hover:text-fg"
                    >
                      {s.work} <ArrowUpRightIcon className="mt-1 h-3 w-3 shrink-0" />
                    </a>
                    <Link
                      href={`/learn-ai/${s.lesson.slug}#from-the-source`}
                      className="mt-auto inline-flex min-h-11 items-end pt-3 text-small font-medium text-signal-strong underline-offset-4 hover:underline"
                    >
                      Broken down in: {s.lesson.title} →
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ---------- FAQ ---------- */}
          <section aria-labelledby="faq-title" className="space-y-5">
            <h2 id="faq-title" className="text-h2 font-semibold text-fg">
              Learning AI: questions people ask
            </h2>
            <div className="max-w-3xl space-y-2.5">
              {HUB_FAQS.map((f, i) => (
                <details
                  key={f.q}
                  open={i === 0}
                  className="group rounded-xl border border-border bg-surface open:shadow-e1"
                >
                  <summary className="flex min-h-12 cursor-pointer list-none items-start justify-between gap-4 px-5 py-4 text-body font-medium text-fg [&::-webkit-details-marker]:hidden">
                    <span>{f.q}</span>
                    <span
                      aria-hidden="true"
                      className="mt-0.5 font-mono text-fg-3 transition-transform duration-base group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="max-w-[68ch] px-5 pb-5 text-small leading-relaxed text-fg-2 sm:text-body">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* ---------- Related on the site ---------- */}
          <section aria-labelledby="careers-title" className="space-y-5">
            <h2 id="careers-title" className="text-h2 font-semibold text-fg">
              Turn what you learn into a job
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { href: '/ai-engineer', t: 'AI Engineer', s: 'Interview prep, pay and questions' },
                { href: '/aipm', t: 'AI Product Manager', s: 'Interview prep, pay and questions' },
                { href: '/fde', t: 'Forward Deployed Engineer', s: 'Interview prep and pay' },
                {
                  href: '/free-resources#ai-skills',
                  t: 'Free AI resources',
                  s: 'Courses and guides from the labs',
                },
              ].map((x) => (
                <Link
                  key={x.href}
                  href={x.href}
                  className="group rounded-xl border border-border bg-surface p-5 transition-[border-color,box-shadow] duration-fast hover:border-border-strong hover:shadow-e2"
                >
                  <div className="flex items-center justify-between gap-2 text-h4 font-semibold text-fg">
                    {x.t}
                    <ArrowRightIcon className="h-4 w-4 text-fg-3 transition-transform duration-fast group-hover:translate-x-0.5" />
                  </div>
                  <p className="mt-1 text-caption text-fg-2">{x.s}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* ---------- Closing CTA (ink band) ---------- */}
        <section className="bg-ink text-ink-fg">
          <div
            className={`${container} flex flex-col gap-6 py-14 md:flex-row md:items-center md:justify-between md:py-20`}
          >
            <div className="max-w-xl">
              <div className={`${kicker} text-signal-on-ink`}>Free · No signup to start</div>
              <h2 className="mt-3 font-serif text-h1 font-medium text-ink-fg">
                Learned it? Now say it out loud.
              </h2>
              <p className="mt-3 text-body text-ink-fg-2">
                AI interviews ask you to explain LLMs, RAG and agents simply. Practise with an AI
                interviewer and get feedback on every answer.
              </p>
            </div>
            <Link
              href="/free-mock-interview"
              className="inline-flex h-12 shrink-0 items-center gap-2 self-start rounded-full bg-white px-6 text-small font-semibold text-ink transition-colors duration-fast hover:bg-white/90 md:self-auto"
            >
              Start a free mock interview <ArrowRightIcon />
            </Link>
          </div>
        </section>
      </div>
    </DomainLayout>
  )
}
