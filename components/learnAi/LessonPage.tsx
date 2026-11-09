import Link from 'next/link'
import type { ReactNode } from 'react'
import DomainLayout from '@/components/domain/DomainLayout'
import { RevealRoot } from '@/components/roleHub/JourneyClient'
import { CopyButton } from '@/components/roleKits/KitClient'
import { ArrowRightIcon, ArrowUpRightIcon, CheckIcon } from '@/components/roleHub/icons'
import type { LessonStep } from '@/data/learnAi/types'
import { DoneMark, MarkComplete, Quiz, YouTubeFacade } from './LearnAiClient'
import { LEARN_AI_COURSE, type AnyLesson, type CourseConfig } from './course'
import MoeCalculator from './MoeCalculator'
import { MOE_MODELS, activePct, weightsGB } from '@/data/learnAi/moeModels'
import { rolesForLesson } from '@/data/learnAi/roleLessons'
import { ROLE_HUBS } from '@/data/roleHubs'

// One lesson of a course (Learn AI by default; the Paul Graham course passes its own config).
// Signal Paper, see the signal-paper-ui skill.
// Flow: short answer → steps → straight from the source → words → watch → try → check → next.

const SITE = 'https://www.autointerviewai.com'
const container = 'mx-auto w-full max-w-[1200px] px-5 md:px-8'
const kicker = 'font-mono text-kicker uppercase tracking-[0.08em]'
const fmtTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

function SectionHead({
  id,
  k,
  title,
  sub,
}: {
  id: string
  k: string
  title: string
  sub?: string
}) {
  return (
    <header data-reveal className="max-w-2xl">
      <div className={`${kicker} text-signal-strong`}>{k}</div>
      <h2 id={id} className="mt-3 text-h2 font-semibold text-fg">
        {title}
      </h2>
      {sub && <p className="mt-2 text-body text-fg-2">{sub}</p>}
    </header>
  )
}

function Flow({ items }: { items: string[] }) {
  return (
    <ol
      aria-label="How it flows"
      className="flex flex-col items-stretch gap-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-y-3"
    >
      {items.map((it, i) => (
        <li key={it + i} className="flex flex-col items-center gap-1.5 sm:flex-row">
          <span className="w-full rounded-lg border border-border bg-surface px-3.5 py-2 text-center text-small font-medium text-fg shadow-e1 sm:w-auto">
            {it}
          </span>
          {i < items.length - 1 && (
            <span aria-hidden="true" className="text-fg-3">
              <span className="sm:hidden">↓</span>
              <span className="hidden px-1 sm:inline">→</span>
            </span>
          )}
        </li>
      ))}
    </ol>
  )
}

function Step({ step, n, last }: { step: LessonStep; n: number; last: boolean }) {
  return (
    <li className="relative grid grid-cols-[32px_minmax(0,1fr)] gap-4 md:gap-6">
      <div className="relative flex justify-center">
        <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-ink font-mono text-caption tabular-nums text-ink-fg">
          {n}
        </span>
        {!last && <span aria-hidden="true" className="absolute bottom-0 top-9 w-px bg-border" />}
      </div>
      <div data-reveal className={`min-w-0 ${last ? '' : 'pb-12 md:pb-14'}`}>
        <h2 className="pt-0.5 text-h3 font-semibold text-fg">{step.heading}</h2>
        <div className="mt-3 max-w-[68ch] space-y-3 text-body text-fg md:text-prose">
          {step.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        {step.bullets && (
          <ul className="mt-4 max-w-[68ch] space-y-2">
            {step.bullets.map((b) => (
              <li key={b} className="flex gap-3 text-body text-fg-2">
                <span
                  aria-hidden="true"
                  className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-signal"
                />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}
        {step.flow && (
          <div className="mt-5">
            <Flow items={step.flow} />
          </div>
        )}
        {step.example && (
          <figure className="mt-5 max-w-[72ch]">
            <figcaption className="flex items-center justify-between gap-3">
              <span className={`${kicker} text-fg-3`}>{step.example.label}</span>
              {step.example.code && <CopyButton text={step.example.text} />}
            </figcaption>
            {step.example.code ? (
              <pre
                // Scrollable code must be keyboard-focusable (WCAG 2.1.1)
                // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                tabIndex={0}
                className="mt-2 overflow-x-auto rounded-xl bg-ink p-4 font-mono text-caption leading-relaxed text-ink-fg md:text-small"
              >
                <code>{step.example.text}</code>
              </pre>
            ) : (
              <div className="mt-2 whitespace-pre-line rounded-xl border border-border bg-muted/60 p-4 text-small leading-relaxed text-fg md:text-body">
                {step.example.text}
              </div>
            )}
          </figure>
        )}
        {step.keyIdea && (
          <div className="mt-5 flex max-w-[68ch] flex-col gap-1.5 rounded-xl bg-signal-tint p-4 ring-1 ring-inset ring-signal/15 sm:flex-row sm:gap-3">
            <span className={`${kicker} shrink-0 pt-0.5 text-signal-ink`}>Key idea</span>
            <p className="text-body font-medium text-fg">{step.keyIdea}</p>
          </div>
        )}
      </div>
    </li>
  )
}

function Section({ id, children }: { id: string; children: ReactNode }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-24 space-y-6 border-t border-border pt-12 md:pt-16"
    >
      {children}
    </section>
  )
}

export default function LessonPage({
  lesson,
  course = LEARN_AI_COURSE,
}: {
  lesson: AnyLesson
  course?: CourseConfig
}) {
  const base = course.basePath
  const url = `${SITE}${base}/${lesson.slug}`
  const track = course.getTrack(lesson.track)
  const { prev, next } = course.getNeighbours(lesson.slug)
  const trackLessons = course.lessonsByTrack(lesson.track)
  const total = course.lessons.length
  const pct = Math.round((lesson.order / total) * 100)
  // Role hubs that send people to this lesson (Learn AI only): gives readers a next step that
  // matches why they are learning, high on the page (NN/g: most viewing time is in 2 screens).
  const roles =
    course.id === LEARN_AI_COURSE.id
      ? rolesForLesson(lesson.slug).flatMap((r) => {
          const hub = ROLE_HUBS[r.hub]
          return hub ? [{ ...r, name: hub.roleName }] : []
        })
      : []

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
        { '@type': 'ListItem', position: 2, name: course.name, item: `${SITE}${base}` },
        { '@type': 'ListItem', position: 3, name: lesson.title, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
      name: lesson.h1,
      headline: lesson.metaTitle,
      description: lesson.metaDescription,
      url,
      inLanguage: 'en',
      learningResourceType: 'Lesson',
      educationalLevel: lesson.level,
      timeRequired: `PT${lesson.minutes}M`,
      isAccessibleForFree: true,
      teaches: lesson.keyTerms.map((t) => t.term),
      position: lesson.order,
      isPartOf: {
        '@type': 'Course',
        name: course.courseName,
        url: `${SITE}${base}`,
        provider: { '@type': 'Organization', name: 'Auto Interview AI', url: SITE },
      },
      publisher: { '@type': 'Organization', name: 'Auto Interview AI', url: SITE },
      citation: lesson.sources.map((s) => s.url),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: lesson.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ]

  return (
    <DomainLayout currentPath={base}>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
      <RevealRoot />

      <div className="bg-bg text-fg">
        {/* Path progress: a hairline at the top showing where this lesson sits in the path */}
        <div className="h-0.5 bg-border" aria-hidden="true">
          <div className="h-full bg-signal" style={{ width: `${pct}%` }} />
        </div>

        <div
          className={`${container} pb-16 pt-8 md:pt-12 lg:grid lg:grid-cols-[232px_minmax(0,1fr)] lg:gap-14`}
        >
          {/* ---------- Track rail (desktop) ---------- */}
          <aside className="hidden lg:block" aria-label={`Lessons in ${track.title}`}>
            <div className="sticky top-24 space-y-4">
              <Link
                href={base}
                className="text-small font-medium text-fg-2 underline-offset-4 hover:text-fg hover:underline"
              >
                ← All {total} lessons
              </Link>
              <div>
                <div className={`${kicker} text-fg-3`}>Track {track.n}</div>
                <div className="mt-1 text-body font-semibold text-fg">{track.title}</div>
              </div>
              <ol className="space-y-1">
                {trackLessons.map((l) => {
                  const current = l.slug === lesson.slug
                  return (
                    <li key={l.slug}>
                      <Link
                        href={`${base}/${l.slug}`}
                        aria-current={current ? 'page' : undefined}
                        className={`flex items-center gap-3 rounded-lg px-2 py-1.5 text-small transition-colors duration-fast ${
                          current ? 'bg-muted font-semibold text-fg' : 'text-fg-2 hover:bg-muted'
                        }`}
                      >
                        <DoneMark slug={l.slug} n={l.order} storageKey={course.storageKey} />
                        <span className="min-w-0 leading-snug">{l.title}</span>
                      </Link>
                    </li>
                  )
                })}
              </ol>
            </div>
          </aside>

          <article className="min-w-0">
            {/* ---------- Header ---------- */}
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-2 text-caption text-fg-3"
            >
              <Link href={base} className="hover:text-fg">
                {course.name}
              </Link>
              <span aria-hidden="true">/</span>
              <Link href={`${base}#${track.id}`} className="hover:text-fg">
                {track.title}
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-fg-2">{lesson.title}</span>
            </nav>
            <div className={`${kicker} mt-6 text-signal-strong`}>
              Lesson {lesson.order} of {total} · Track {track.n}: {track.title}
            </div>
            <h1 className="mt-3 max-w-[22ch] font-serif text-h1 font-medium text-fg md:max-w-[26ch]">
              {lesson.h1}
            </h1>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex h-7 items-center rounded-full bg-muted px-3 text-caption font-medium text-fg-2">
                {lesson.level}
              </span>
              <span className="inline-flex h-7 items-center rounded-full bg-muted px-3 text-caption font-medium text-fg-2">
                {lesson.minutes} min
              </span>
              <span className="inline-flex h-7 items-center rounded-full bg-muted px-3 text-caption font-medium text-fg-2">
                {lesson.steps.length} steps
              </span>
              {lesson.videos.length > 0 && (
                <span className="inline-flex h-7 items-center rounded-full bg-muted px-3 text-caption font-medium text-fg-2">
                  {lesson.videos.length} video{lesson.videos.length > 1 ? 's' : ''}
                </span>
              )}
              <span className="inline-flex h-7 items-center rounded-full bg-muted px-3 text-caption font-medium text-fg-2">
                Free · no login
              </span>
            </div>

            <div className="mt-8 max-w-[72ch] rounded-xl border border-border bg-surface p-5 md:p-6">
              <div className={`${kicker} text-fg-3`}>The short answer</div>
              <p className="mt-2 text-body text-fg md:text-body-lg">{lesson.tldr}</p>
            </div>
            {course.disclaimer && (
              <p className="mt-3 max-w-[72ch] text-caption text-fg-3">{course.disclaimer}</p>
            )}
            {roles.length > 0 && (
              <div className="mt-4 flex max-w-[72ch] flex-wrap items-center gap-2">
                <span className="text-small text-fg-2">Part of the interview prep for</span>
                {roles.map((r) => (
                  <Link
                    key={r.hub}
                    href={`/${r.hub}#ai-skills`}
                    className="inline-flex min-h-9 items-center rounded-full bg-signal-tint px-3 py-1 text-small font-medium text-signal-ink ring-1 ring-inset ring-signal/15 transition-colors duration-fast hover:bg-signal/10"
                  >
                    {r.name}
                  </Link>
                ))}
                <a
                  href="#roles"
                  className="text-small font-medium text-fg-2 underline decoration-border-strong underline-offset-4 hover:text-fg"
                >
                  Why it matters
                </a>
              </div>
            )}

            {/* ---------- Steps ---------- */}
            <ol className="mt-12 md:mt-16" aria-label="Lesson steps">
              {lesson.steps.map((s, i) => (
                <Step key={s.heading} step={s} n={i + 1} last={i === lesson.steps.length - 1} />
              ))}
            </ol>

            <div className="mt-16 space-y-16">
              {/* ---------- Straight from the source ---------- */}
              {lesson.fromTheSource && lesson.fromTheSource.length > 0 && (
                <Section id="from-the-source">
                  <SectionHead
                    id="from-the-source-title"
                    k={course.sourceSection.kicker}
                    title={course.sourceSection.title}
                    sub={course.sourceSection.sub}
                  />
                  <div className="space-y-4">
                    {lesson.fromTheSource.map((s) => (
                      <div
                        key={s.who + s.work}
                        data-reveal
                        className="rounded-xl border border-border bg-surface p-5 md:p-6"
                      >
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                          <div>
                            <div className="text-h4 font-semibold text-fg">{s.who}</div>
                            <div className="text-caption text-fg-3">{s.role}</div>
                          </div>
                          <a
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-11 items-center gap-1 text-small font-medium text-signal-strong underline-offset-4 hover:underline"
                          >
                            {s.work} <ArrowUpRightIcon />
                          </a>
                        </div>
                        <dl className="mt-4 divide-y divide-border border-t border-border">
                          <div className="grid gap-1 py-4 md:grid-cols-[150px_minmax(0,1fr)] md:gap-6">
                            <dt className={`${kicker} text-fg-3`}>1 · Understand</dt>
                            <dd className="max-w-[68ch] text-body text-fg">{s.idea}</dd>
                          </div>
                          <div className="grid gap-1 py-4 md:grid-cols-[150px_minmax(0,1fr)] md:gap-6">
                            <dt className={`${kicker} text-fg-3`}>2 · Break it down</dt>
                            <dd>
                              <ul className="max-w-[68ch] space-y-1.5">
                                {s.breakdown.map((b) => (
                                  <li key={b} className="flex gap-3 text-body text-fg-2">
                                    <span
                                      aria-hidden="true"
                                      className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-fg-3"
                                    />
                                    <span>{b}</span>
                                  </li>
                                ))}
                              </ul>
                            </dd>
                          </div>
                          <div className="grid gap-1 pt-4 md:grid-cols-[150px_minmax(0,1fr)] md:gap-6">
                            <dt className={`${kicker} text-signal-strong`}>3 · Use it</dt>
                            <dd className="max-w-[68ch] text-body font-medium text-fg">{s.use}</dd>
                          </div>
                        </dl>
                      </div>
                    ))}
                  </div>
                </Section>
              )}

              {/* ---------- Key terms ---------- */}
              <Section id="words">
                <SectionHead
                  id="words-title"
                  k={`${lesson.keyTerms.length} terms`}
                  title="Words to know"
                />
                <dl className="grid gap-3 sm:grid-cols-2">
                  {lesson.keyTerms.map((t) => (
                    <div
                      key={t.term}
                      data-reveal
                      className="rounded-xl border border-border bg-surface p-4 md:p-5"
                    >
                      <dt className="text-body font-semibold text-fg">{t.term}</dt>
                      <dd className="mt-1 text-small leading-relaxed text-fg-2">{t.meaning}</dd>
                    </div>
                  ))}
                </dl>
              </Section>

              {/* ---------- Videos ---------- */}
              {lesson.videos.length > 0 && (
                <Section id="watch">
                  <SectionHead
                    id="watch-title"
                    k={`${lesson.videos.length} video${lesson.videos.length > 1 ? 's' : ''} · plays here`}
                    title="Watch"
                    sub="Hand-picked from the people who explain this best. The video loads only when you press play."
                  />
                  <div className="grid gap-6 md:grid-cols-2">
                    {lesson.videos.map((v) => (
                      <figure key={v.youtubeId} data-reveal className="space-y-3">
                        <YouTubeFacade id={v.youtubeId} title={v.title} start={v.start} />
                        <figcaption>
                          <div className="text-body font-semibold leading-snug text-fg">
                            {v.title}
                          </div>
                          <div className="mt-1 text-caption text-fg-3">
                            {v.channel} · {v.minutes} min
                            {v.start ? ` · starts at ${fmtTime(v.start)}` : ''}
                          </div>
                          <p className="mt-2 text-small leading-relaxed text-fg-2">{v.why}</p>
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </Section>
              )}

              {/* ---------- Interactive tool (optional, no AI) ---------- */}
              {lesson.widget === 'moe-calculator' && (
                <Section id="tool">
                  <SectionHead
                    id="tool-title"
                    k={`${MOE_MODELS.length} MoE models · maker numbers · checked Nov 2026`}
                    title="Total vs active: will it fit?"
                    sub="Pick a model or type the two numbers from any model card. Memory comes from the total; speed comes from the active parameters."
                  />
                  <MoeCalculator />
                  <figure>
                    <div
                      role="region"
                      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                      tabIndex={0}
                      aria-label="Mixture-of-experts models: total and active parameters"
                      className="overflow-x-auto rounded-xl border border-border bg-surface"
                    >
                      <table className="w-full min-w-[640px] text-left text-small tabular-nums">
                        <thead className="bg-muted text-fg-2">
                          <tr>
                            <th
                              scope="col"
                              className="sticky left-0 bg-muted px-4 py-3 font-medium"
                            >
                              Model
                            </th>
                            <th scope="col" className="px-4 py-3 font-medium">
                              Total
                            </th>
                            <th scope="col" className="px-4 py-3 font-medium">
                              Active
                            </th>
                            <th scope="col" className="px-4 py-3 font-medium">
                              Used per token
                            </th>
                            <th scope="col" className="px-4 py-3 font-medium">
                              Weights at 4-bit
                            </th>
                            <th scope="col" className="px-4 py-3 font-medium">
                              Experts
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {MOE_MODELS.map((m) => (
                            <tr key={m.name} className="border-t border-border">
                              <th
                                scope="row"
                                className="sticky left-0 bg-surface px-4 py-3 font-medium text-fg"
                              >
                                <a
                                  href={m.source.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="underline decoration-border-strong underline-offset-4 hover:decoration-fg"
                                >
                                  {m.name}
                                </a>
                                <span className="block text-caption font-normal text-fg-3">
                                  {m.maker} · {m.released}
                                </span>
                              </th>
                              <td className="px-4 py-3 text-fg">
                                {m.totalB.toLocaleString('en-US')}B
                              </td>
                              <td className="px-4 py-3 text-fg">{m.activeB}B</td>
                              <td className="px-4 py-3 text-fg">{activePct(m)}%</td>
                              <td className="px-4 py-3 text-fg">
                                ~{weightsGB(m.totalB, 0.5).toLocaleString('en-US')} GB
                              </td>
                              <td className="px-4 py-3 text-fg-2">{m.experts}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <figcaption className="mt-2 flex flex-wrap justify-between gap-2 text-caption text-fg-3">
                      <span>
                        Source: each model name links to its maker&rsquo;s page or paper, opened Nov
                        2026. &ldquo;Used per token&rdquo; and memory are computed from those
                        numbers; memory is weights only.
                      </span>
                      <span className="md:hidden">Swipe →</span>
                    </figcaption>
                  </figure>
                </Section>
              )}

              {/* ---------- Try it ---------- */}
              <Section id="try">
                <SectionHead id="try-title" k={course.tryKicker} title={course.tryTitle} />
                <div
                  data-reveal
                  className="max-w-[72ch] rounded-xl border border-border bg-surface p-5 md:p-6"
                >
                  <h3 className="text-h4 font-semibold text-fg">{lesson.tryIt.title}</h3>
                  <ol className="mt-4 space-y-3">
                    {lesson.tryIt.steps.map((s, i) => (
                      <li key={s} className="flex gap-3 text-body text-fg">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted font-mono text-caption text-fg-2">
                          {i + 1}
                        </span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ol>
                  {lesson.tryIt.link && (
                    <a
                      href={lesson.tryIt.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-surface px-5 text-small font-semibold text-fg ring-1 ring-inset ring-border-strong transition-colors duration-fast hover:bg-muted"
                    >
                      {lesson.tryIt.link.label} <ArrowUpRightIcon />
                    </a>
                  )}
                </div>
              </Section>

              {/* ---------- Check yourself ---------- */}
              <Section id="check">
                <SectionHead
                  id="check-title"
                  k={`${lesson.check.length} questions · instant feedback`}
                  title="Check yourself"
                  sub="Pick an answer to see if you are right, and why."
                />
                <div className="max-w-[72ch]">
                  <Quiz items={lesson.check} />
                </div>
              </Section>

              {/* ---------- Finish + up next ---------- */}
              <Section id="next">
                <SectionHead
                  id="next-title"
                  k={`Lesson ${lesson.order} of ${total}`}
                  title={next ? 'Done? Keep going' : 'You reached the end of the path'}
                  sub={
                    next
                      ? 'Mark this lesson complete to keep your place. Progress is saved on this device, no login.'
                      : course.endOfPath
                  }
                />
                <MarkComplete
                  slug={lesson.slug}
                  nextHref={next && `${base}/${next.slug}`}
                  storageKey={course.storageKey}
                />
                {next && (
                  <Link
                    href={`${base}/${next.slug}`}
                    className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-surface px-5 py-5 transition-[border-color,box-shadow] duration-fast hover:border-border-strong hover:shadow-e2 md:px-6"
                  >
                    <span className="min-w-0">
                      <span className={`${kicker} block text-fg-3`}>
                        Up next · Lesson {next.order} · {next.minutes} min
                      </span>
                      <span className="mt-1 block text-h3 font-semibold text-fg">{next.title}</span>
                      <span className="mt-1 line-clamp-2 max-w-[68ch] text-small text-fg-2">
                        {next.tldr}
                      </span>
                    </span>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-ink-fg transition-transform duration-fast group-hover:translate-x-0.5">
                      <ArrowRightIcon />
                    </span>
                  </Link>
                )}
                {roles.length > 0 && (
                  <div id="roles" className="scroll-mt-24 pt-2">
                    <div className={`${kicker} text-fg-3`}>
                      Roles that need this lesson · {roles.length}
                    </div>
                    <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                      {roles.map((r) => (
                        <li key={r.hub}>
                          <Link
                            href={`/${r.hub}#ai-skills`}
                            className="group flex h-full flex-col rounded-xl border border-border bg-surface p-4 transition-[border-color,box-shadow] duration-fast hover:border-border-strong hover:shadow-e2"
                          >
                            <span className="text-body font-semibold text-fg">
                              {r.name} interview guide
                            </span>
                            <span className="mt-1 text-small text-fg-2">{r.why}</span>
                            <span className="mt-3 inline-flex items-center gap-1 text-small font-semibold text-signal-strong">
                              Open the guide <ArrowRightIcon />
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {prev && (
                  <Link
                    href={`${base}/${prev.slug}`}
                    className="inline-flex min-h-11 items-center text-small font-medium text-fg-2 underline-offset-4 hover:text-fg hover:underline"
                  >
                    ← Previous: {prev.title}
                  </Link>
                )}
              </Section>

              {/* ---------- FAQ ---------- */}
              <Section id="faq">
                <SectionHead id="faq-title" k="People also ask" title="Questions people ask" />
                <div className="max-w-3xl space-y-2.5">
                  {lesson.faqs.map((f, i) => (
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
              </Section>

              {/* ---------- Sources + related ---------- */}
              <Section id="sources">
                <SectionHead
                  id="sources-title"
                  k={`${lesson.sources.length} sources · checked Nov 2026`}
                  title="Sources and further reading"
                />
                <ul className="max-w-[72ch] space-y-2">
                  {lesson.sources.map((s) => (
                    <li key={s.url} className="flex gap-2 text-small text-fg-2">
                      <CheckIcon className="mt-1 h-3.5 w-3.5 shrink-0 text-fg-3" />
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="break-words underline decoration-border-strong underline-offset-4 hover:text-fg hover:decoration-fg"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
                {lesson.related && lesson.related.length > 0 && (
                  <div className="pt-4">
                    <div className={`${kicker} text-fg-3`}>Related on this site</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {lesson.related.map((r) => (
                        <Link
                          key={r.href}
                          href={r.href}
                          className="inline-flex min-h-9 items-center rounded-full bg-surface px-3.5 py-1.5 text-small text-fg ring-1 ring-inset ring-border-strong transition-colors duration-fast hover:bg-muted"
                        >
                          {r.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </Section>
            </div>
          </article>
        </div>

        {/* ---------- Closing CTA (ink band) ---------- */}
        <section className="bg-ink text-ink-fg">
          <div
            className={`${container} flex flex-col gap-6 py-14 md:flex-row md:items-center md:justify-between md:py-20`}
          >
            <div className="max-w-xl">
              <div className={`${kicker} text-signal-on-ink`}>{course.endCta.kicker}</div>
              <h2 className="mt-3 font-serif text-h1 font-medium text-ink-fg">
                {course.endCta.title}
              </h2>
              <p className="mt-3 text-body text-ink-fg-2">{course.endCta.body}</p>
            </div>
            <Link
              href={course.endCta.href}
              className="inline-flex h-12 shrink-0 items-center gap-2 self-start rounded-full bg-white px-6 text-small font-semibold text-ink transition-colors duration-fast hover:bg-white/90 md:self-auto"
            >
              {course.endCta.label} <ArrowRightIcon />
            </Link>
          </div>
        </section>
      </div>
    </DomainLayout>
  )
}
