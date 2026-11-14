import Link from 'next/link'
import { ROLE_SALARIES } from '@/data/roleSalary'
import type { ReactNode } from 'react'
import DomainLayout from '@/components/domain/DomainLayout'
import type { RoleHub } from '@/data/roleHubs/types'
import { ROLE_HUB_LIST } from '@/data/roleHubs'
import { AI_TOOLKIT } from '@/data/aiToolkit'
import { lessonsForRole, LEARN_AI_COUNT } from '@/data/learnAi/roleLessons'
import { ROLE_KITS, KIT_PATHS } from '@/data/roleKits'
import { ROLE_CONCEPTS } from '@/data/roleConcepts'
import { ROLE_INTERVIEW_TIPS, interviewTipsPath, tipStats } from '@/data/roleInterviewTips'
import { Figure, BarList } from '@/components/viz'
import MockInterviewButton from '@/components/ai/MockInterviewButton'
import { PromptKit } from '@/components/ai/AiPrompt'
import { hubPrompts } from '@/data/aiPrompts'
import {
  JourneyMobileBar,
  JourneyRail,
  PayExplorer,
  PlanTracker,
  PracticeCounter,
  QuestionItem,
  RevealRoot,
  ResumeJourney,
  type ChapterMeta,
} from './JourneyClient'
import { tabLabel } from './payLabels'
import { splitAsked, toCriteria } from './questionUtils'
import { ArrowRightIcon, ArrowUpRightIcon, CheckIcon, SparkIcon } from './icons'
import MockInterviewCTA from '@/components/ai/MockInterviewCTA'

// Role hub = a learner journey (Signal Paper design, see the signal-paper-ui skill).
// Six steps in the order a candidate needs them: understand → decide → get the interview →
// crack it → prepare. Every number on the page carries its source.

const SITE = 'https://www.autointerviewai.com'
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const fmtDate = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number)
  return `${MONTHS[m - 1]} ${d}, ${y}`
}
const words = (...parts: (string | undefined)[]) =>
  parts.filter(Boolean).join(' ').split(/\s+/).length
const mins = (w: number) => `${Math.max(1, Math.round(w / 220))} min`

/* ---------- Small server building blocks ---------- */

function Chapter({
  id,
  n,
  total,
  meta,
  title,
  intro,
  next,
  children,
}: {
  id: string
  n: number
  total: number
  meta: string
  title: string
  intro?: string
  next?: ChapterMeta
  children: ReactNode
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`scroll-mt-28 py-14 md:py-20 ${n === 1 ? 'pt-8 md:pt-10' : 'border-t border-border'}`}
    >
      <header data-reveal className="max-w-2xl">
        <div className="font-mono text-kicker uppercase tracking-[0.08em] text-signal-strong">
          Step {n} of {total} · {meta}
        </div>
        <h2 id={`${id}-title`} className="mt-3 text-h2 font-semibold text-fg">
          {title}
        </h2>
        {intro && <p className="mt-3 text-body-lg text-fg-2">{intro}</p>}
      </header>
      <div className="mt-8 space-y-12">{children}</div>
      {next && (
        <a
          href={`#${next.id}`}
          className="group mt-12 flex items-center justify-between gap-4 rounded-xl border border-border bg-surface px-5 py-4 transition-[border-color,box-shadow] duration-fast hover:border-border-strong hover:shadow-e2"
        >
          <span className="min-w-0">
            <span className="block font-mono text-kicker uppercase tracking-[0.08em] text-fg-3">
              Up next · Step {next.n} · {next.meta}
            </span>
            <span className="mt-1 block text-h4 font-semibold text-fg">{next.label}</span>
          </span>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-signal text-white transition-transform duration-fast group-hover:translate-x-0.5">
            <ArrowRightIcon />
          </span>
        </a>
      )}
    </section>
  )
}

function Block({
  id,
  title,
  sub,
  children,
}: {
  id?: string
  title: string
  sub?: string
  children: ReactNode
}) {
  return (
    <div id={id} className="scroll-mt-32 space-y-5">
      <div data-reveal className="max-w-2xl">
        <h3 className="text-h3 font-semibold text-fg">{title}</h3>
        {sub && <p className="mt-2 text-body text-fg-2">{sub}</p>}
      </div>
      {children}
    </div>
  )
}

function Callout({ kicker, children }: { kicker: string; children: ReactNode }) {
  return (
    <div data-reveal className="rounded-xl bg-signal-tint p-5 ring-1 ring-inset ring-signal/15">
      <div className="font-mono text-kicker uppercase tracking-[0.08em] text-signal-ink">
        {kicker}
      </div>
      <div className="mt-2 text-body leading-relaxed text-fg">{children}</div>
    </div>
  )
}

function Ticks({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((it) => (
        <li key={it} className="flex gap-3 text-small leading-relaxed text-fg-2 sm:text-body">
          <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-signal-strong" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  )
}

function SourceLink({ label, url }: { label: string; url: string }) {
  if (url.startsWith('#'))
    return (
      <a href={url} className="underline underline-offset-2 hover:text-fg">
        {label}
      </a>
    )
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-0.5 underline underline-offset-2 hover:text-fg"
    >
      {label}
      <ArrowUpRightIcon className="h-3 w-3" />
    </a>
  )
}

function KitLinks({ hub }: { hub: RoleHub }) {
  if (!ROLE_KITS[hub.slug]) return null
  const tips = ROLE_INTERVIEW_TIPS[hub.slug]
  const items = [
    ...(tips
      ? [
          {
            href: interviewTipsPath(hub.slug),
            kicker: 'Interview tips',
            title: `Tips for each of the ${tips.rounds.length} ${hub.shortName} rounds`,
            line: 'What each round is scored on, do and avoid, a weak vs strong opening, and a checklist to score your practice answer.',
          },
        ]
      : []),
    ...(ROLE_CONCEPTS[hub.slug]
      ? [
          {
            href: `/${hub.slug}/concepts`,
            kicker: 'Concepts + quiz',
            title: `${ROLE_CONCEPTS[hub.slug].concepts.length} ${hub.shortName} concepts to know`,
            line: 'One-line definitions, worked examples with real output, the trap interviewers probe, and a self-check quiz.',
          },
        ]
      : []),
    {
      href: KIT_PATHS.resume(hub.slug),
      kicker: 'Resume (CV)',
      title: `${hub.shortName} resume guide`,
      line: 'What recruiters check, a bullet bank, keywords from real job posts, a sample one-page resume, cover letter and LinkedIn.',
    },
    {
      href: KIT_PATHS.lor(hub.slug),
      kicker: 'Letter of recommendation',
      title: `Recommendation letter for ${hub.shortName}`,
      line: 'Who to ask, what the letter must prove, a sample letter, the email to send and the brief to attach.',
    },
  ]
  return (
    <div className={`grid gap-3 md:grid-cols-2 ${items.length === 3 ? 'lg:grid-cols-3' : ''}`}>
      {items.map((it) => (
        <Link
          key={it.href}
          href={it.href}
          data-reveal
          className="group flex h-full flex-col rounded-xl border border-border bg-surface p-5 transition-[border-color,box-shadow] duration-fast hover:border-border-strong hover:shadow-e2"
        >
          <span className="text-caption font-semibold text-signal-strong">{it.kicker}</span>
          <span className="mt-1.5 flex items-center justify-between gap-2 text-h4 font-semibold text-fg">
            {it.title}
            <ArrowRightIcon className="h-4 w-4 shrink-0 text-fg-3 transition-transform duration-fast group-hover:translate-x-0.5" />
          </span>
          <span className="mt-1.5 text-small leading-relaxed text-fg-2">{it.line}</span>
        </Link>
      ))}
    </div>
  )
}

function typicalPay(hub: RoleHub) {
  if (hub.pay.headline) return hub.pay.headline
  const median = (re: RegExp) =>
    hub.pay.tables.find((t) => re.test(t.region))?.rows.find((r) => /median/i.test(r.band))?.value
  return [
    median(/^India/) && `India ${median(/^India/)}`,
    median(/^(United States|US)/) && `US ${median(/^(United States|US)/)}`,
  ]
    .filter(Boolean)
    .join(' · ')
}

/* ---------- Page ---------- */

export default function RoleHubPage({ hub }: { hub: RoleHub }) {
  const url = `${SITE}/${hub.slug}`
  const exp = {
    title: 'What companies expect: B2B vs B2C',
    sub: 'Most open roles in 2026 are B2B. Read that column first.',
    a: 'B2B',
    b: 'B2C',
    aNote: 'Most roles today',
    ...hub.expectationLabels,
  }
  const totalQuestions = hub.questionGroups.reduce((n, g) => n + g.questions.length, 0)
  const hiring = hub.hiring
  const hires = hiring ? [...hiring.companies].sort((a, b) => b.count - a.count) : []
  const story = hub.story
  const pay = typicalPay(hub)
  const medians = hub.pay.tables
    .map((t) => ({ t, m: t.rows.find((r) => /median/i.test(r.band)) }))
    .filter((x) => x.m)
  const ai = AI_TOOLKIT
  const roleLessons = lessonsForRole(hub.slug)

  // The journey: few steps, each one complete.
  const defs: { id: string; label: string; w: number; show: boolean }[] = [
    {
      id: 'story',
      label: 'Where this role came from',
      w: words(
        story?.summary,
        hub.directAnswer,
        ...(story?.milestones.map((m) => m.detail) ?? []),
        ...(story?.why ?? [])
      ),
      show: !!story,
    },
    {
      id: 'role',
      label: 'What the job really is',
      w: words(
        ...hub.whatTheRoleIs,
        ...hub.skills.flatMap((s) => s.items),
        ...hub.expectations.b2b.points,
        ...hub.expectations.b2c.points
      ),
      show: true,
    },
    {
      id: 'pay',
      label: hiring ? 'Pay and who is hiring' : 'What the role pays',
      w: words(hub.pay.intro, hiring?.intro) + 250,
      show: true,
    },
    {
      id: 'get-hired',
      label: 'How to get the interview',
      w: hub.getHired
        ? words(
            hub.getHired.intro,
            ...hub.getHired.bullets.flatMap((b) => [b.weak, b.strong]),
            hub.getHired.outreach.body,
            ...hub.getHired.proofOfWork.steps
          )
        : 0,
      show: !!hub.getHired,
    },
    { id: 'interview', label: 'Crack the interview', w: 0, show: true },
    {
      id: 'prepare',
      label: 'Your prep plan and resources',
      w: words(...hub.plans.flatMap((p) => p.tasks), ...hub.resources.map((r) => r.why)) + 150,
      show: true,
    },
  ]
  const chapters: ChapterMeta[] = defs
    .filter((d) => d.show)
    .map((d, i) => ({
      id: d.id,
      n: i + 1,
      label: d.label,
      meta: d.id === 'interview' ? `${totalQuestions} questions` : mins(d.w),
    }))
  const ch = (id: string) => chapters.find((c) => c.id === id)!
  const nextOf = (id: string) => chapters[chapters.findIndex((c) => c.id === id) + 1]
  const totalMin = chapters
    .filter((c) => c.id !== 'interview')
    .reduce((n, c) => n + parseInt(c.meta, 10), 0)

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: hub.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: `${hub.roleName} interview prep`, item: url },
    ],
  }
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: hub.metaTitle,
    description: hub.metaDescription,
    url,
    dateModified: hub.lastUpdated,
    about: { '@type': 'Occupation', name: hub.roleName },
    publisher: { '@type': 'Organization', name: 'Auto Interview AI', url: SITE },
  }

  const container = 'mx-auto w-full max-w-[1200px] px-5 md:px-8'

  return (
    <DomainLayout currentPath={`/${hub.slug}`}>
      {[faqSchema, breadcrumbSchema, pageSchema].map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
      <RevealRoot />

      <div className="bg-bg text-fg">
        {/* ---------- Hero ---------- */}
        <div className={`${container} pb-10 pt-8 md:pb-16 md:pt-12`}>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-caption text-fg-3">
            <Link href="/" className="hover:text-fg">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-fg-2">{hub.roleName}</span>
          </nav>

          <header className="mt-8 grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <div className="font-mono text-kicker uppercase tracking-[0.08em] text-signal-strong">
                Free guide · {chapters.length} steps · about {totalMin} min · Updated{' '}
                {fmtDate(hub.lastUpdated)}
              </div>
              <h1 className="mt-4 font-serif text-display font-medium text-fg">{hub.heroTitle}</h1>
              <p className="mt-5 max-w-[56ch] text-body-lg text-fg-2">{hub.heroDescription}</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <MockInterviewButton caption={false} />
                <a
                  href={`#${chapters[0].id}`}
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-surface px-5 text-small font-semibold text-fg ring-1 ring-inset ring-border-strong transition-colors duration-fast hover:bg-muted"
                >
                  Start the guide
                  <ArrowRightIcon />
                </a>
              </div>
              <ResumeJourney slug={hub.slug} chapters={chapters} />
            </div>

            {/* At a glance */}
            <aside
              aria-label={`${hub.roleName} at a glance`}
              className="rounded-2xl border border-border bg-surface p-5 shadow-e1 md:p-6 lg:col-span-5"
            >
              <div className="font-mono text-kicker uppercase tracking-[0.08em] text-fg-3">
                {hub.shortName} at a glance
              </div>
              <dl className="mt-4 divide-y divide-border">
                {story && (
                  <>
                    <div className="grid grid-cols-[104px_1fr] gap-3 py-3">
                      <dt className="text-small text-fg-3">Started</dt>
                      <dd>
                        <div className="text-small font-semibold text-fg">{story.born.when}</div>
                        <div className="text-caption text-fg-2">{story.born.what}</div>
                      </dd>
                    </div>
                    <div className="grid grid-cols-[104px_1fr] gap-3 py-3">
                      <dt className="text-small text-fg-3">Took off</dt>
                      <dd>
                        <div className="text-small font-semibold text-fg">{story.rise.when}</div>
                        <div className="text-caption text-fg-2">{story.rise.what}</div>
                      </dd>
                    </div>
                  </>
                )}
                {pay && (
                  <div className="grid grid-cols-[104px_1fr] gap-3 py-3">
                    <dt className="text-small text-fg-3">Typical pay</dt>
                    <dd>
                      <div className="font-mono text-small font-semibold tabular-nums text-fg">
                        {pay}
                      </div>
                      <a href="#pay" className="text-caption text-signal-strong hover:underline">
                        By experience and country ↓
                      </a>
                    </dd>
                  </div>
                )}
                <div className="grid grid-cols-[104px_1fr] gap-3 py-3">
                  <dt className="text-small text-fg-3">Practice</dt>
                  <dd>
                    <div className="text-small font-semibold text-fg">
                      {totalQuestions} questions with answers
                    </div>
                    <div className="text-caption text-fg-2">
                      Plus what the interviewer is listening for
                    </div>
                  </dd>
                </div>
              </dl>
            </aside>
          </header>
        </div>

        {/* ---------- Journey ---------- */}
        <div className={`${container} lg:grid lg:grid-cols-[232px_minmax(0,1fr)] lg:gap-14`}>
          <aside className="hidden pt-8 lg:block">
            <JourneyRail slug={hub.slug} chapters={chapters} />
          </aside>

          <div className="min-w-0">
            <JourneyMobileBar slug={hub.slug} chapters={chapters} />

            {/* 1. Story */}
            {story && (
              <Chapter
                id="story"
                n={ch('story').n}
                total={chapters.length}
                meta={ch('story').meta}
                title={`Where the ${hub.roleName} role came from`}
                next={nextOf('story')}
              >
                <Callout kicker="The role in 30 seconds">
                  <p className="speakable-direct-answer">{hub.directAnswer}</p>
                </Callout>
                <p data-reveal className="max-w-[68ch] text-body-lg leading-relaxed text-fg">
                  {story.summary}
                </p>

                <ol className="relative max-w-3xl space-y-0">
                  {story.milestones.map((m, i) => (
                    <li
                      key={m.title}
                      data-reveal
                      className="relative grid grid-cols-[20px_1fr] gap-4 pb-8 last:pb-0 sm:grid-cols-[120px_20px_1fr]"
                      style={{ transitionDelay: `${i * 60}ms` }}
                    >
                      <div className="hidden pt-0.5 text-right font-mono text-caption text-fg-3 sm:block">
                        {m.when}
                      </div>
                      <div className="relative flex justify-center">
                        <span className="relative z-10 mt-1.5 h-3 w-3 rounded-full border-2 border-signal bg-surface" />
                        {i < story.milestones.length - 1 && (
                          <span
                            aria-hidden="true"
                            className="absolute bottom-[-2px] top-5 w-px bg-border"
                          />
                        )}
                      </div>
                      <div>
                        <div className="font-mono text-caption text-fg-3 sm:hidden">{m.when}</div>
                        <div className="text-h4 font-semibold text-fg">{m.title}</div>
                        <p className="mt-1 max-w-[60ch] text-small leading-relaxed text-fg-2 sm:text-body">
                          {m.detail}
                        </p>
                        {m.sourceLabel && m.sourceUrl && (
                          <div className="mt-1.5 text-caption text-fg-3">
                            <SourceLink label={m.sourceLabel} url={m.sourceUrl} />
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>

                <div data-reveal className="rounded-2xl border border-border bg-surface p-5 md:p-6">
                  <h3 className="text-h4 font-semibold text-fg">Why it took off</h3>
                  <ol className="mt-4 grid gap-5 md:grid-cols-3 md:gap-6">
                    {story.why.map((w, i) => (
                      <li key={w} className="flex gap-3 md:block">
                        <span className="font-mono text-h3 font-medium text-signal">0{i + 1}</span>
                        <p className="text-small leading-relaxed text-fg-2 md:mt-2">{w}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </Chapter>
            )}

            {/* 2. The job */}
            <Chapter
              id="role"
              n={ch('role').n}
              total={chapters.length}
              meta={ch('role').meta}
              title={`What ${/^[AEIOU]/i.test(hub.roleName) ? 'an' : 'a'} ${hub.roleName} really does`}
              next={nextOf('role')}
            >
              {!story && (
                <Callout kicker="The role in 30 seconds">
                  <p className="speakable-direct-answer">{hub.directAnswer}</p>
                </Callout>
              )}
              <div data-reveal className="max-w-[68ch] space-y-4">
                {hub.whatTheRoleIs.map((p, i) => (
                  <p key={i} className="text-body leading-relaxed text-fg-2 md:text-prose">
                    {p}
                  </p>
                ))}
              </div>

              <Block title="Skills you need">
                <div className="grid gap-4 sm:grid-cols-2">
                  {hub.skills.map((s) => (
                    <div
                      key={s.area}
                      data-reveal
                      className="rounded-xl border border-border bg-surface p-5"
                    >
                      <h4 className="text-h4 font-semibold text-fg">{s.area}</h4>
                      <div className="mt-3">
                        <Ticks items={s.items} />
                      </div>
                    </div>
                  ))}
                </div>
              </Block>

              <Block id="expectations" title={exp.title} sub={exp.sub}>
                <div className="grid gap-4 lg:grid-cols-2">
                  {(['b2b', 'b2c'] as const).map((k) => {
                    const e = hub.expectations[k]
                    const primary = k === 'b2b'
                    return (
                      <div
                        key={k}
                        data-reveal
                        className={`rounded-xl bg-surface p-5 md:p-6 ${
                          primary ? 'border border-fg/80' : 'border border-border'
                        }`}
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-caption font-semibold ${
                              primary ? 'bg-fg text-bg' : 'bg-muted text-fg'
                            }`}
                          >
                            {primary ? exp.a : exp.b}
                          </span>
                          {primary && exp.aNote && (
                            <span className="text-caption font-medium text-signal-strong">
                              {exp.aNote}
                            </span>
                          )}
                        </div>
                        <h4 className="mt-3 text-h4 font-semibold text-fg">{e.headline}</h4>
                        <div className="mt-3">
                          <Ticks items={e.points} />
                        </div>
                        <div className="mt-5 border-t border-border pt-4">
                          <div className="text-caption text-fg-3">Metrics you will own</div>
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {e.metrics.map((m) => (
                              <span
                                key={m}
                                className="inline-flex h-7 items-center rounded-full bg-muted px-2.5 text-caption font-medium text-fg-2"
                              >
                                {m}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div data-reveal className="rounded-xl border border-border bg-surface p-5 md:p-6">
                  <h4 className="text-h4 font-semibold text-fg">
                    {exp.differenceTitle ??
                      `How it differs from a classic ${hub.roleName.replace(/^AI /, '')} role`}
                  </h4>
                  <ul className="mt-3 grid gap-x-6 gap-y-2.5 md:grid-cols-2">
                    {hub.expectations.difference.map((d) => (
                      <li key={d} className="flex gap-3 text-small leading-relaxed text-fg-2">
                        <ArrowRightIcon className="mt-1 h-4 w-4 shrink-0 text-signal-strong" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Block>
            </Chapter>

            {/* 3. Pay and hiring */}
            <Chapter
              id="pay"
              n={ch('pay').n}
              total={chapters.length}
              meta={ch('pay').meta}
              title={
                hub.pay.title ??
                (hiring
                  ? `What a ${hub.shortName} earns, and who is hiring`
                  : `What a ${hub.shortName} earns`)
              }
              intro={hub.pay.intro}
              next={nextOf('pay')}
            >
              {medians.length > 1 && (
                <div data-reveal className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {medians.map(({ t, m }) => (
                    <div key={t.region} className="rounded-xl border border-border bg-surface p-4">
                      <div className="text-caption text-fg-3">{tabLabel(t)} median</div>
                      <div className="mt-1 font-mono text-h3 font-semibold tabular-nums text-fg">
                        {m!.value}
                      </div>
                      <div className="mt-0.5 text-caption text-fg-3">{t.sourceLabel}</div>
                    </div>
                  ))}
                </div>
              )}
              <div className="space-y-3">
                <PayExplorer tables={hub.pay.tables} />
                {hub.pay.crossCheck && (
                  <p className="max-w-[68ch] text-caption leading-relaxed text-fg-3">
                    {hub.pay.crossCheck}
                  </p>
                )}
                {ROLE_SALARIES[hub.slug] && (
                  <p className="text-small text-fg-2">
                    <Link
                      href={`/${hub.slug}/salary`}
                      className="font-medium text-signal-strong underline decoration-signal/30 underline-offset-2 hover:decoration-signal"
                    >
                      {ROLE_SALARIES[hub.slug].reported
                        ? `See what ${hub.shortName}s report they earn at well-known companies`
                        : `See every posted ${hub.shortName} offer, with in-hand pay`}
                    </Link>{' '}
                    ({ROLE_SALARIES[hub.slug].reported ? 'reported pay, plus ' : ''}
                    {ROLE_SALARIES[hub.slug].india.length + ROLE_SALARIES[hub.slug].us.length} job
                    posts that state a salary).
                  </p>
                )}
                <p className="text-small text-fg-2">
                  Got an Indian offer?{' '}
                  <Link
                    href="/salary-calculator"
                    className="font-medium text-signal-strong underline decoration-signal/30 underline-offset-2 hover:decoration-signal"
                  >
                    Turn the CTC into monthly in-hand pay
                  </Link>{' '}
                  on 2026-27 tax rules, or compare two offers.
                </p>
              </div>

              {hiring && hires.length > 0 && (
                <Block
                  id="hiring"
                  title={hiring.title ?? 'Who is hiring the most in 2025–26'}
                  sub={hiring.intro}
                >
                  <Figure
                    label={`New ${hub.shortName} hires · ${hiring.companies.length} rows · ${hiring.sourceLabel}`}
                    title={`${/people/i.test(hires[0].name) ? `Employers with ${hires[0].name.toLowerCase()}` : hires[0].name}: the most new ${hub.shortName} hires (${hires[0].count.toLocaleString('en-US')})`}
                    sub={`People who started in the title recently (next: ${hires
                      .slice(1, 3)
                      .map((c) => `${c.name} ${c.count.toLocaleString('en-US')}`)
                      .join(', ')}).`}
                    source={[{ label: hiring.sourceLabel }]}
                    updated={hiring.asOf}
                    note={`How we counted: ${hiring.method}`}
                    table={{
                      head: ['Employer', 'Type', 'New hires'],
                      rows: hiring.companies.map((c) => [c.name, c.segment, c.count]),
                    }}
                    className="!my-0"
                  >
                    <BarList
                      rows={hiring.companies.map((c) => ({
                        label: c.name,
                        value: c.count,
                        note: c.segment,
                      }))}
                    />
                  </Figure>
                </Block>
              )}
            </Chapter>

            {/* 4. Get the interview */}
            {hub.getHired && (
              <Chapter
                id="get-hired"
                n={ch('get-hired').n}
                total={chapters.length}
                meta={ch('get-hired').meta}
                title="How to get the interview"
                intro={hub.getHired.intro}
                next={nextOf('get-hired')}
              >
                <Block
                  id="documents"
                  title="Your resume and recommendation letter"
                  sub="Full guides for this role, with samples you can copy."
                >
                  <KitLinks hub={hub} />
                </Block>
                <Block
                  title="Rewrite your resume bullets"
                  sub="Weak bullets list duties. Strong ones show a result with a number."
                >
                  <div className="space-y-3">
                    {hub.getHired.bullets.map((b) => (
                      <div
                        key={b.strong}
                        data-reveal
                        className="grid overflow-hidden rounded-xl border border-border bg-surface md:grid-cols-2"
                      >
                        <div className="p-4 md:p-5">
                          <div className="text-caption font-medium text-fg-3">Before</div>
                          <p className="mt-1 text-small leading-relaxed text-fg-2 line-through decoration-border-strong">
                            {b.weak}
                          </p>
                        </div>
                        <div className="border-t border-border bg-signal-tint/60 p-4 md:border-l md:border-t-0 md:p-5">
                          <div className="text-caption font-semibold text-signal-ink">After</div>
                          <p className="mt-1 text-small leading-relaxed text-fg">{b.strong}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div
                    data-reveal
                    className="grid gap-6 rounded-xl border border-border bg-surface p-5 md:grid-cols-[1fr_auto] md:items-end md:p-6"
                  >
                    <Ticks items={hub.getHired.resumeTips} />
                    <Link
                      href="/build-resume"
                      className="inline-flex h-10 items-center gap-2 self-start rounded-full bg-surface px-4 text-small font-semibold text-fg ring-1 ring-inset ring-border-strong hover:bg-muted"
                    >
                      Free resume builder <ArrowRightIcon />
                    </Link>
                  </div>
                </Block>

                <Block title="Where the jobs are">
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {hub.getHired.channels.map((c) => {
                      const inner = (
                        <>
                          <div className="flex items-center gap-1 text-small font-semibold text-fg">
                            {c.name}
                            {c.url && <ArrowUpRightIcon className="h-3.5 w-3.5 text-fg-3" />}
                          </div>
                          <p className="mt-1 text-caption leading-relaxed text-fg-2">{c.how}</p>
                        </>
                      )
                      const cls =
                        'block rounded-xl border border-border bg-surface p-4 transition-[border-color,box-shadow] duration-fast'
                      return c.url ? (
                        <a
                          key={c.name}
                          data-reveal
                          href={c.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${cls} hover:border-border-strong hover:shadow-e2`}
                        >
                          {inner}
                        </a>
                      ) : (
                        <div key={c.name} data-reveal className={cls}>
                          {inner}
                        </div>
                      )
                    })}
                  </div>
                </Block>

                <div className="grid items-start gap-4 lg:grid-cols-2">
                  <div
                    data-reveal
                    className="rounded-xl border border-border bg-surface p-5 md:p-6"
                  >
                    <div className="text-caption font-semibold text-signal-strong">
                      Message the hiring manager
                    </div>
                    <h3 className="mt-1.5 text-h4 font-semibold text-fg">
                      {hub.getHired.outreach.title}
                    </h3>
                    <p className="mt-3 whitespace-pre-line rounded-lg bg-muted p-4 text-small leading-relaxed text-fg">
                      {hub.getHired.outreach.body}
                    </p>
                    {hub.getHired.outreach.note && (
                      <p className="mt-3 text-caption leading-relaxed text-fg-3">
                        {hub.getHired.outreach.note}
                      </p>
                    )}
                  </div>
                  <div data-reveal className="rounded-xl border border-fg/80 bg-surface p-5 md:p-6">
                    <div className="text-caption font-semibold text-signal-strong">
                      Proof of work
                    </div>
                    <h3 className="mt-1.5 text-h4 font-semibold text-fg">
                      {hub.getHired.proofOfWork.title}
                    </h3>
                    <p className="mt-2 text-small leading-relaxed text-fg-2">
                      {hub.getHired.proofOfWork.why}
                    </p>
                    <ol className="mt-4 space-y-3">
                      {hub.getHired.proofOfWork.steps.map((st, i) => (
                        <li
                          key={st}
                          className="flex items-start gap-3 text-small leading-relaxed text-fg-2"
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-fg font-mono text-[11px] text-bg">
                            {i + 1}
                          </span>
                          {st}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </Chapter>
            )}

            {/* 5. Crack the interview */}
            <Chapter
              id="interview"
              n={ch('interview').n}
              total={chapters.length}
              meta={ch('interview').meta}
              title="Crack the interview"
              intro="First see the rounds you will face. Then practise every question out loud before you open the answer."
              next={nextOf('interview')}
            >
              <Block
                id="process"
                title="The rounds, by company type"
                sub="Typical loops. Each company varies, so confirm the rounds with your recruiter."
              >
                <div className="grid gap-4 md:grid-cols-2">
                  {hub.process.map((p) => (
                    <div
                      key={p.companyType}
                      data-reveal
                      className="rounded-xl border border-border bg-surface p-5"
                    >
                      <h4 className="text-h4 font-semibold text-fg">{p.companyType}</h4>
                      <ol className="mt-4 space-y-0">
                        {p.rounds.map((r, i) => (
                          <li key={r} className="relative flex gap-3 pb-4 last:pb-0">
                            {i < p.rounds.length - 1 && (
                              <span
                                aria-hidden="true"
                                className="absolute left-[11px] top-6 h-[calc(100%-20px)] w-px bg-border"
                              />
                            )}
                            <span className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border bg-surface font-mono text-[11px] text-fg-2">
                              {i + 1}
                            </span>
                            <span className="pt-0.5 text-small leading-relaxed text-fg-2">{r}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>
                {ROLE_INTERVIEW_TIPS[hub.slug] && (
                  <p className="mt-4 text-small text-fg-2">
                    <Link
                      href={interviewTipsPath(hub.slug)}
                      className="font-medium text-signal-strong underline decoration-signal/30 underline-offset-2 hover:decoration-signal"
                    >
                      Tips for each round, from {tipStats(ROLE_INTERVIEW_TIPS[hub.slug]).nLoops}{' '}
                      mapped interview loops
                    </Link>
                    : what each round is scored on, what to do and avoid, and weak vs strong
                    answers.
                  </p>
                )}
              </Block>

              <Block
                id="questions"
                title={`${totalQuestions} ${hub.shortName} interview questions`}
                sub="Each answer shows how you could respond and what the interviewer is listening for. Say yours out loud first."
              >
                <PracticeCounter slug={hub.slug} total={totalQuestions} />
                {(() => {
                  const mix = hub.questionGroups.map((g) => ({
                    label: g.title,
                    reported: g.questions.filter((q) => q.source).length,
                    written: g.questions.filter((q) => !q.source).length,
                  }))
                  const rep = mix.reduce((a, m) => a + m.reported, 0)
                  const size = (m: (typeof mix)[number]) => m.reported + m.written
                  const most = Math.max(...mix.map(size))
                  const tops = mix.filter((m) => size(m) === most)
                  if (rep === 0) return null
                  return (
                    <Figure
                      label={`Question bank · ${totalQuestions} questions · ${rep} reported by candidates`}
                      title={
                        tops.length === 1
                          ? `${tops[0].label} is the biggest set: ${most} of ${totalQuestions} questions`
                          : `${tops.map((t) => t.label).join(' and ')} are the biggest sets: ${most} questions each`
                      }
                      sub="Reported questions come from candidates’ write-ups (linked on each question); practice questions are ones we wrote to cover gaps."
                      source={[{ label: 'Sources linked on each question below' }]}
                      updated={`Updated ${hub.lastUpdated}`}
                      table={{
                        head: ['Group', 'Reported', 'Practice'],
                        rows: mix.map((m) => [m.label, m.reported, m.written]),
                      }}
                      className="!my-0"
                    >
                      <BarList
                        rows={mix.map((m) => ({
                          label: m.label,
                          value: m.reported + m.written,
                          display: `${m.reported + m.written} (${m.reported} reported)`,
                        }))}
                      />
                    </Figure>
                  )
                })()}
                {ROLE_CONCEPTS[hub.slug] && (
                  <p className="text-small text-fg-2">
                    Shaky on the basics behind these questions?{' '}
                    <Link
                      href={`/${hub.slug}/concepts`}
                      className="font-medium text-signal-strong underline decoration-signal/30 underline-offset-2 hover:decoration-signal"
                    >
                      Learn the {ROLE_CONCEPTS[hub.slug].concepts.length} concepts they test, with
                      worked examples and a quiz
                    </Link>
                    .
                  </p>
                )}
                <div className="flex flex-wrap gap-2">
                  {hub.questionGroups.map((g) => (
                    <a
                      key={g.id}
                      href={`#q-${g.id}`}
                      className="inline-flex h-9 items-center gap-1.5 rounded-full bg-surface px-3.5 text-small text-fg-2 ring-1 ring-inset ring-border hover:text-fg hover:ring-border-strong"
                    >
                      {g.title}
                      <span className="font-mono text-caption text-fg-3">{g.questions.length}</span>
                    </a>
                  ))}
                </div>
                {(() => {
                  let idx = 0
                  return hub.questionGroups.map((g, gi) => (
                    <div key={g.id} id={`q-${g.id}`} className="scroll-mt-32 space-y-3 pt-2">
                      <div data-reveal>
                        <h4 className="text-h4 font-semibold text-fg">{g.title}</h4>
                        <p className="mt-1 text-small text-fg-2">{g.blurb}</p>
                      </div>
                      <div className="space-y-2.5">
                        {g.questions.map((q, qi) => {
                          idx += 1
                          return (
                            <QuestionItem
                              key={q.q}
                              slug={hub.slug}
                              qid={`${g.id}-${qi}`}
                              index={idx}
                              q={splitAsked(q.q).text}
                              tags={[
                                q.round,
                                splitAsked(q.q).askedAt
                                  ? `Asked at ${splitAsked(q.q).askedAt} · via ${splitAsked(q.q).via}`
                                  : q.source
                                    ? `Reported · ${q.source.label}`
                                    : undefined,
                                q.reportedAt,
                              ].filter((t): t is string => !!t)}
                              answer={q.answer}
                              lookFor={q.lookFor}
                              criteria={toCriteria(q.lookFor, q.criteria)}
                              source={q.source}
                              defaultOpen={gi === 0 && qi === 0}
                            />
                          )
                        })}
                      </div>
                    </div>
                  ))
                })()}
                <div
                  data-reveal
                  className="flex flex-col gap-4 rounded-2xl bg-signal-tint p-5 ring-1 ring-inset ring-signal/15 sm:flex-row sm:items-center sm:justify-between md:p-6"
                >
                  <div>
                    <div className="text-h4 font-semibold text-fg">
                      Reading answers is not practice.
                    </div>
                    <p className="mt-1 text-small text-fg-2">
                      Answer these out loud to an AI interviewer and get feedback in minutes.
                    </p>
                  </div>
                  <Link
                    href="/free-mock-interview"
                    className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-signal px-5 text-small font-semibold text-white shadow-e1 hover:bg-signal-strong"
                  >
                    Start a mock interview <ArrowRightIcon />
                  </Link>
                </div>
              </Block>
            </Chapter>

            {/* 6. Prepare */}
            <Chapter
              id="prepare"
              n={ch('prepare').n}
              total={chapters.length}
              meta={ch('prepare').meta}
              title="Your prep plan and resources"
              intro="Pick the plan that matches the time you have. Then learn the AI skills this role now expects, and go deeper with the best free resources."
            >
              {!hub.getHired && (
                <Block
                  id="documents"
                  title="Your resume and recommendation letter"
                  sub="Full guides for this role, with samples you can copy."
                >
                  <KitLinks hub={hub} />
                </Block>
              )}
              <Block
                id="plan"
                title="Pick your plan: 7, 14 or 30 days"
                sub="Tick tasks off as you go (saved on this device), and put the sessions in your calendar so they actually happen."
              >
                <div className="grid items-start gap-4 md:grid-cols-3">
                  {hub.plans.map((p, i) => (
                    <PlanTracker
                      key={p.days}
                      slug={hub.slug}
                      roleName={hub.roleName}
                      days={p.days}
                      title={p.title}
                      tasks={p.tasks}
                      defaultOpen={i === 0}
                    />
                  ))}
                </div>
              </Block>

              <Block
                id="ai-skills"
                title={`AI skills for ${/^[AEIOU]/i.test(hub.shortName) ? 'an' : 'a'} ${hub.shortName}`}
                sub="Most interviews now ask how you use AI. Learn what LLMs are, practise with the free OpenAI and Anthropic courses, then build one small agent or automation you can show."
              >
                {hub.aiAngle && (
                  <Callout kicker="Why it matters for this role">{hub.aiAngle}</Callout>
                )}
                {roleLessons.length > 0 && (
                  <div className="rounded-xl border border-border bg-surface p-5 md:p-6">
                    <div className="font-mono text-kicker uppercase tracking-[0.08em] text-signal-strong">
                      Learn AI · {roleLessons.length} free lessons · in this order
                    </div>
                    <h3 className="mt-2 text-h3 font-semibold text-fg">
                      The AI you will be asked about as{' '}
                      {/^[AEIOU]/i.test(hub.shortName) ? 'an' : 'a'} {hub.shortName}
                    </h3>
                    <ol className="mt-4 divide-y divide-border">
                      {roleLessons.map(({ lesson, why }, i) => (
                        <li key={lesson.slug}>
                          <Link
                            href={`/learn-ai/${lesson.slug}`}
                            className="group flex items-start gap-3 py-3.5"
                          >
                            <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted font-mono text-caption font-semibold text-fg-2">
                              {i + 1}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="flex flex-wrap items-baseline gap-x-2">
                                <span className="text-h4 font-semibold text-fg group-hover:underline">
                                  {lesson.title}
                                </span>
                                <span className="text-caption text-fg-3">
                                  {lesson.minutes} min · {lesson.level}
                                </span>
                              </span>
                              <span className="mt-0.5 block text-small leading-relaxed text-fg-2">
                                {why}
                              </span>
                            </span>
                            <ArrowRightIcon className="mt-1.5 h-4 w-4 shrink-0 text-fg-3 group-hover:text-signal-strong" />
                          </Link>
                        </li>
                      ))}
                    </ol>
                    <Link
                      href="/learn-ai"
                      className="mt-2 inline-flex items-center gap-1.5 text-small font-semibold text-signal-strong hover:underline"
                    >
                      The full Learn AI path · {LEARN_AI_COUNT} lessons, free <ArrowRightIcon />
                    </Link>
                  </div>
                )}
                <ol className="grid gap-3 md:grid-cols-2">
                  {ai.map((r) => (
                    <li key={r.id} data-reveal>
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex h-full flex-col rounded-xl border border-border bg-surface p-5 transition-[border-color,box-shadow] duration-fast hover:border-border-strong hover:shadow-e2"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`inline-flex h-6 items-center rounded-full px-2.5 text-[11px] font-semibold ${
                              r.level === 'Start here'
                                ? 'bg-signal-tint text-signal-ink'
                                : 'bg-muted text-fg-2'
                            }`}
                          >
                            {r.level}
                          </span>
                          <span className="text-caption text-fg-3">{r.publisher}</span>
                        </div>
                        <div className="mt-3 flex items-start gap-1 text-h4 font-semibold text-fg group-hover:underline">
                          {r.title}
                          <ArrowUpRightIcon className="mt-1 h-3.5 w-3.5 shrink-0 text-fg-3" />
                        </div>
                        <p className="mt-1.5 text-small leading-relaxed text-fg-2">{r.why}</p>
                        <p className="mt-auto flex gap-2 border-t border-border pt-3 text-small leading-relaxed text-fg">
                          <SparkIcon className="mt-0.5 h-4 w-4 shrink-0 text-signal-strong" />
                          <span>
                            <span className="font-semibold">Key idea: </span>
                            {r.takeaway}
                          </span>
                        </p>
                      </a>
                    </li>
                  ))}
                </ol>
                <Link
                  href="/free-resources#ai-skills"
                  className="inline-flex items-center gap-1.5 text-small font-semibold text-signal-strong hover:underline"
                >
                  All free AI and interview resources <ArrowRightIcon />
                </Link>
              </Block>

              <Block id="resources" title={`The best resources for ${hub.shortName} interviews`}>
                {hub.mustKnow && (
                  <Callout kicker="The one thing to understand">{hub.mustKnow}</Callout>
                )}
                <div className="grid gap-3 md:grid-cols-2">
                  {hub.resources.map((r) => {
                    const internal = r.url.startsWith('/')
                    const body = (
                      <>
                        <div className="flex items-center gap-2">
                          <span className="inline-flex h-6 items-center rounded-full bg-muted px-2.5 text-[11px] font-semibold text-fg-2">
                            {r.kind}
                          </span>
                          {r.free && (
                            <span className="text-caption font-medium text-signal-strong">
                              Free
                            </span>
                          )}
                        </div>
                        <div className="mt-3 flex items-start gap-1 text-h4 font-semibold text-fg group-hover:underline">
                          {r.title}
                          {!internal && (
                            <ArrowUpRightIcon className="mt-1 h-3.5 w-3.5 shrink-0 text-fg-3" />
                          )}
                        </div>
                        <p className="mt-1.5 text-small leading-relaxed text-fg-2">
                          <span className="font-medium text-fg">Why it matters: </span>
                          {r.why}
                        </p>
                      </>
                    )
                    const cls =
                      'group block h-full rounded-xl border border-border bg-surface p-5 transition-[border-color,box-shadow] duration-fast hover:border-border-strong hover:shadow-e2'
                    return internal ? (
                      <Link key={r.title} href={r.url} data-reveal className={cls}>
                        {body}
                      </Link>
                    ) : (
                      <a
                        key={r.title}
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-reveal
                        className={cls}
                      >
                        {body}
                      </a>
                    )
                  })}
                </div>
                <div className="flex flex-wrap gap-2">
                  {hub.related.map((r) => (
                    <Link
                      key={r.href}
                      href={r.href}
                      className="inline-flex h-9 items-center gap-1.5 rounded-full bg-surface px-3.5 text-small text-fg ring-1 ring-inset ring-border hover:ring-border-strong"
                    >
                      {r.label} <ArrowRightIcon className="h-3.5 w-3.5" />
                    </Link>
                  ))}
                </div>
              </Block>
            </Chapter>
          </div>
        </div>

        {/* ---------- Do it with AI: prompts that open in Claude or ChatGPT ---------- */}
        <section id="ai-prompts" className="scroll-mt-24 border-t border-border py-16 md:py-20">
          <div className={container}>
            <PromptKit
              title={`Write your ${hub.shortName} documents with AI`}
              sub="The guides and templates are on this site. If you want AI to draft from your own facts, one tap opens Claude or ChatGPT with the prompt typed in: your resume, your cover letter and your recommendation letter."
              prompts={hubPrompts(
                hub,
                ROLE_KITS[hub.slug]?.resume.keywords.flatMap((g) => g.terms)
              )}
            />
            <div className="mt-8 flex flex-col gap-4 rounded-xl border border-border bg-surface p-5 sm:flex-row sm:items-center sm:justify-between md:p-6">
              <div className="max-w-xl">
                <div className="text-h4 font-semibold text-fg">
                  Practise the interview out loud, here
                </div>
                <p className="mt-1 text-small text-fg-2">
                  Mock interviews run on Tough Tongue AI: a voice interviewer asks {hub.shortName}{' '}
                  questions, follows up, and gives feedback on each answer.
                </p>
              </div>
              <MockInterviewButton caption={false} />
            </div>
          </div>
        </section>

        <MockInterviewCTA
          roleName={hub.shortName}
          questions={hub.questionGroups
            .flatMap((g) => g.questions.map((x) => x.q.replace(/\s*\(.*?\)\s*$/, '').trim()))
            .filter((q) => q.length > 12 && q.length <= 110)
            .slice(0, 4)}
        />

        <div className={`${container} space-y-16 py-16 md:py-24`}>
          {/* More role hubs */}
          <section aria-labelledby="more-hubs" className="space-y-5">
            <h2 id="more-hubs" className="text-h2 font-semibold text-fg">
              Prepare for another new-age role
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {ROLE_HUB_LIST.filter((h) => h.slug !== hub.slug).map((h) => (
                <Link
                  key={h.slug}
                  href={`/${h.slug}`}
                  className="group rounded-xl border border-border bg-surface p-5 transition-[border-color,box-shadow] duration-fast hover:border-border-strong hover:shadow-e2"
                >
                  <div className="flex items-center justify-between gap-2 text-h4 font-semibold text-fg">
                    {h.roleName}
                    <ArrowRightIcon className="h-4 w-4 text-fg-3 transition-transform duration-fast group-hover:translate-x-0.5" />
                  </div>
                  <p className="mt-1 text-caption text-fg-2">
                    {h.questionGroups.reduce((n, g) => n + g.questions.length, 0)} questions · pay ·
                    process
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" aria-labelledby="faq-title" className="scroll-mt-28 space-y-5">
            <h2 id="faq-title" className="text-h2 font-semibold text-fg">
              {hub.roleName}: frequently asked questions
            </h2>
            <div className="max-w-3xl space-y-2.5">
              {hub.faqs.map((f, i) => (
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
        </div>
      </div>
    </DomainLayout>
  )
}
