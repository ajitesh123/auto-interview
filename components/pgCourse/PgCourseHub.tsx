import Link from 'next/link'
import DomainLayout from '@/components/domain/DomainLayout'
import { RevealRoot } from '@/components/roleHub/JourneyClient'
import { ArrowRightIcon, ArrowUpRightIcon } from '@/components/roleHub/icons'
import { DoneMark, HubResume, YouTubeFacade } from '@/components/learnAi/LearnAiClient'
import {
  PG_LESSONS,
  PG_PLAN,
  PG_TOTAL_MINUTES,
  PG_TRACKS,
  pgEssays,
  pgLessonsByTrack,
  pgVideos,
} from '@/data/pgCourse'
import type { PlanMonth } from '@/data/pgCourse/types'
import { PG_COURSE, PG_DISCLAIMER } from './course'
import PlanClient from './PlanClient'

// Paul Graham course hub (/paul-graham). Signal Paper design.
// Order: hero → the 6-month plan (centrepiece) → course map → essays → videos → FAQ → CTA.

const SITE = 'https://www.autointerviewai.com'
const BASE = PG_COURSE.basePath
const KEY = PG_COURSE.storageKey
const container = 'mx-auto w-full max-w-[1200px] px-5 md:px-8'
const kicker = 'font-mono text-kicker uppercase tracking-[0.08em]'

export const PG_HUB_FAQS = [
  {
    q: 'Who is Paul Graham?',
    a: 'Paul Graham is a programmer, writer and investor. In 1995 he and Robert Morris started Viaweb, which he calls the first software-as-a-service company; Yahoo bought it in 1998. In 2005 he started Y Combinator with Jessica Livingston, Robert Morris and Trevor Blackwell (source: his bio on paulgraham.com). His essays, free on paulgraham.com, cover startups, programming, writing and how to do good work.',
  },
  {
    q: 'What does Y Combinator teach founders?',
    a: 'Mostly a few ideas, repeated until they stick: make something people want, launch early, talk to users, do things that don’t scale, grow every week, stay default alive, and raise money only when it helps. YC’s motto is “Make something people want.” During the three-month batch, partners advise each company in one-on-one and group office hours, an invited founder or investor speaks every week, and it ends with Demo Day, where founders present to investors (source: ycombinator.com/about). This course covers each idea in a lesson, sourced to the essay or talk it comes from.',
  },
  {
    q: 'Can I learn YC’s methods without getting into YC?',
    a: 'Much of it, yes. Paul Graham’s essays, YC’s Startup School and the YC Library are free and public, and most of the advice is about how you work, not about access. What you cannot copy is the network, the partners’ time and the peer pressure of a batch. The 6-month plan on this page turns the public advice into weekly actions so you can apply it on your own.',
  },
  {
    q: 'Which Paul Graham essays should I read first?',
    a: 'Start with How to Get Startup Ideas, Do Things that Don’t Scale and Startup = Growth. Then read Default Alive or Default Dead, How to Raise Money and Founder Mode. The “Most cited essays” list on this page ranks the essays by how often the lessons rely on them, each with a link to the original.',
  },
  {
    q: 'How long does this course take?',
    a: `The lessons take about ${Math.max(1, Math.round(PG_TOTAL_MINUTES / 60))} hours to read, plus optional talks. The plan is built for six months because the advice only works when you do it: talk to users, ship, measure growth each week. Read one lesson a week and do that week’s actions.`,
  },
]

export default function PgCourseHub({ months }: { months: PlanMonth[] }) {
  const essays = pgEssays()
  const videos = pgVideos(6)
  const first = PG_LESSONS[0]
  const url = `${SITE}${BASE}`
  const hours = Math.max(1, Math.round(PG_TOTAL_MINUTES / 60))
  const lessonTitles = Object.fromEntries(PG_LESSONS.map((l) => [l.slug, l.title]))
  const actions = months.reduce((n, m) => n + m.actions.length, 0)

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
        { '@type': 'ListItem', position: 2, name: 'Learn startups from Paul Graham', item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: PG_COURSE.courseName,
      description:
        'A free, unofficial course built from Paul Graham’s essays and talks and Y Combinator’s public advice: startup ideas, making something people want, doing things that don’t scale, growth, founders, fundraising and how a YC batch works.',
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
      teaches: PG_LESSONS.map((l) => l.title),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Paul Graham course lessons',
      itemListElement: PG_LESSONS.map((l) => ({
        '@type': 'ListItem',
        position: l.order,
        url: `${SITE}${BASE}/${l.slug}`,
        name: l.title,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: PG_HUB_FAQS.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ]

  return (
    <DomainLayout currentPath={BASE}>
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
            <span className="text-fg-2">Paul Graham course</span>
          </nav>
          <div className="mt-6 lg:grid lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <div className={`${kicker} text-signal-strong`}>
                Free · No login · {PG_LESSONS.length} lessons · 6-month plan · Updated Nov 2026
              </div>
              <h1 className="mt-4 font-serif text-display font-medium text-fg">
                Learn startups from Paul Graham
              </h1>
              <p className="mt-5 max-w-[56ch] text-body-lg text-fg-2">
                A free 6-month course built only from what Paul Graham and Y Combinator have
                actually written and said: his essays, talks and interviews, and how a YC batch
                works.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#plan"
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-signal px-6 text-small font-semibold text-white shadow-e1 transition-colors duration-fast hover:bg-signal-strong"
                >
                  See the 6-month plan <ArrowRightIcon />
                </a>
                {first && (
                  <Link
                    href={`${BASE}/${first.slug}`}
                    className="inline-flex h-12 items-center rounded-full bg-surface px-6 text-small font-semibold text-fg ring-1 ring-inset ring-border-strong transition-colors duration-fast hover:bg-muted"
                  >
                    Start lesson 1: {first.title}
                  </Link>
                )}
              </div>
              <p className="mt-5 max-w-[60ch] text-caption text-fg-3">{PG_DISCLAIMER}</p>
              <HubResume
                lessons={PG_LESSONS.map((l) => ({ slug: l.slug, title: l.title, order: l.order }))}
                storageKey={KEY}
                basePath={BASE}
                doneText="You have read every lesson. Keep ticking off the 6-month plan below."
              />
            </div>

            {/* Glance card */}
            <dl className="mt-10 grid grid-cols-2 gap-3 lg:col-span-5 lg:mt-1 lg:self-start">
              {[
                {
                  k: 'Lessons',
                  v: String(PG_LESSONS.length),
                  s: `${PG_TRACKS.length} tracks, ideas to Demo Day`,
                },
                {
                  k: 'PG essays cited',
                  v: String(essays.length),
                  s: 'Each linked to paulgraham.com',
                },
                {
                  k: 'Plan',
                  v: `${months.length || 6} months`,
                  s: actions
                    ? `${actions} weekly actions to tick off`
                    : 'Weekly actions to tick off',
                },
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

        {/* ---------- The 12-week YC challenge (invitation) ---------- */}
        <div className={`${container} pb-12 md:pb-16`}>
          <Link
            href="/paul-graham/yc-batch"
            className="group flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5 shadow-e1 transition-[border-color,box-shadow] duration-fast hover:border-border-strong hover:shadow-e2 md:flex-row md:items-center md:justify-between md:p-7"
          >
            <div className="max-w-2xl">
              <div className={`${kicker} text-signal-strong`}>
                New · 12 weeks · one challenge a week
              </div>
              <div className="mt-2 text-h3 font-semibold text-fg group-hover:text-signal-strong">
                Take the 12-week YC challenge
              </div>
              <p className="mt-1.5 text-body text-fg-2">
                Run a Y Combinator batch on your own: what happens inside YC each week, the
                framework partners teach, and one challenge to finish before the next week. Free,
                saved on your device.
              </p>
            </div>
            <span className="inline-flex h-11 shrink-0 items-center gap-2 self-start rounded-full bg-surface px-5 text-small font-semibold text-fg ring-1 ring-inset ring-border-strong transition-colors duration-fast group-hover:bg-muted md:self-auto">
              Start the challenge <ArrowRightIcon />
            </span>
          </Link>
        </div>

        {/* ---------- The 6-month plan (centrepiece) ---------- */}
        {months.length > 0 && (
          <section
            id="plan"
            aria-labelledby="plan-title"
            className="scroll-mt-20 border-t border-border bg-surface/60"
          >
            <div className={`${container} py-14 md:py-24`}>
              <header data-reveal className="max-w-2xl">
                <div className={`${kicker} text-signal-strong`}>
                  {months.length} months · {actions} actions · every one sourced
                </div>
                <h2 id="plan-title" className="mt-3 text-h1 font-semibold text-fg">
                  If Paul Graham mentored you for 6 months
                </h2>
                <p className="mt-3 text-body-lg text-fg-2">
                  What his essays and YC’s advice tell a founder to do, month by month. Read the
                  lessons, do the actions, and check yourself against the tests Paul Graham and YC
                  describe. Tick things off as you go; it is saved on this device.
                </p>
              </header>
              <div className="mt-10 max-w-4xl">
                <PlanClient months={months} lessonTitles={lessonTitles} basePath={BASE} />
              </div>
            </div>
          </section>
        )}

        {/* ---------- Course map ---------- */}
        <div id="map" className="scroll-mt-20 border-t border-border">
          {PG_TRACKS.map((t) => {
            const items = pgLessonsByTrack(t.id)
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
                        Track {t.n} of {PG_TRACKS.length} · {items.length} lessons · {mins} min
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
                          href={`${BASE}/${l.slug}`}
                          className="group relative flex items-start gap-4 rounded-xl px-4 py-3.5 transition-colors duration-fast hover:bg-surface hover:shadow-e1"
                        >
                          <DoneMark slug={l.slug} n={l.order} storageKey={KEY} />
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
          {/* ---------- Most cited essays ---------- */}
          {essays.length > 0 && (
            <section aria-labelledby="essays-title" className="space-y-6">
              <header data-reveal className="max-w-2xl">
                <div className={`${kicker} text-signal-strong`}>
                  {essays.length} essays · ranked by how often the lessons use them
                </div>
                <h2 id="essays-title" className="mt-3 text-h2 font-semibold text-fg">
                  Read the originals
                </h2>
                <p className="mt-2 text-body text-fg-2">
                  The essays this course is built on, most used first. Each opens on paulgraham.com.
                </p>
              </header>
              <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {essays.slice(0, 12).map((e, i) => (
                  <li
                    key={e.url}
                    data-reveal
                    className="flex flex-col rounded-xl border border-border bg-surface p-5"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-caption tabular-nums text-fg-3">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <a
                        href={e.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-start gap-1 text-body font-semibold text-fg underline-offset-4 hover:underline"
                      >
                        {e.label} <ArrowUpRightIcon className="mt-1.5 h-3 w-3 shrink-0" />
                      </a>
                    </div>
                    <div className="mt-auto pt-3 text-caption text-fg-2">
                      Used in{' '}
                      {e.lessons.slice(0, 2).map((l, j) => (
                        <span key={l.slug}>
                          {j > 0 && ', '}
                          <Link
                            href={`${BASE}/${l.slug}`}
                            className="font-medium text-signal-strong underline-offset-4 hover:underline"
                          >
                            {l.title}
                          </Link>
                        </span>
                      ))}
                      {e.lessons.length > 2 && ` and ${e.lessons.length - 2} more`}
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* ---------- Videos ---------- */}
          {videos.length > 0 && (
            <section aria-labelledby="videos-title" className="space-y-6">
              <header data-reveal className="max-w-2xl">
                <div className={`${kicker} text-signal-strong`}>
                  {videos.length} talks · play right here
                </div>
                <h2 id="videos-title" className="mt-3 text-h2 font-semibold text-fg">
                  Watch the talks
                </h2>
                <p className="mt-2 text-body text-fg-2">
                  Paul Graham and YC partners in their own words. Each talk sits inside the lesson
                  it belongs to.
                </p>
              </header>
              <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
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
                        href={`${BASE}/${v.lesson.slug}`}
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

          {/* ---------- FAQ ---------- */}
          <section aria-labelledby="faq-title" className="space-y-5">
            <h2 id="faq-title" className="text-h2 font-semibold text-fg">
              Paul Graham and YC: questions people ask
            </h2>
            <div className="max-w-3xl space-y-2.5">
              {PG_HUB_FAQS.map((f, i) => (
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
          <section aria-labelledby="related-title" className="space-y-5">
            <h2 id="related-title" className="text-h2 font-semibold text-fg">
              Working at a startup instead of founding one?
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { href: '/founders-office', t: "Founder's Office", s: 'Work next to a founder' },
                { href: '/chief-of-staff', t: 'Chief of Staff', s: 'Interview prep and pay' },
                { href: '/product-manager', t: 'Product Manager', s: 'Interview prep and pay' },
                { href: '/learn-ai', t: 'Learn AI', s: 'Build with AI, step by step' },
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
              <div className={`${kicker} text-signal-on-ink`}>{PG_COURSE.endCta.kicker}</div>
              <h2 className="mt-3 font-serif text-h1 font-medium text-ink-fg">
                {PG_COURSE.endCta.title}
              </h2>
              <p className="mt-3 text-body text-ink-fg-2">{PG_COURSE.endCta.body}</p>
            </div>
            <Link
              href={PG_COURSE.endCta.href}
              className="inline-flex h-12 shrink-0 items-center gap-2 self-start rounded-full bg-white px-6 text-small font-semibold text-ink transition-colors duration-fast hover:bg-white/90 md:self-auto"
            >
              {PG_COURSE.endCta.label} <ArrowRightIcon />
            </Link>
          </div>
        </section>
      </div>
    </DomainLayout>
  )
}
