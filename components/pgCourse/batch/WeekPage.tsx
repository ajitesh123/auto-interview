import Link from 'next/link'
import type { ReactNode } from 'react'
import DomainLayout from '@/components/domain/DomainLayout'
import { RevealRoot } from '@/components/roleHub/JourneyClient'
import { CopyButton } from '@/components/roleKits/KitClient'
import { ArrowRightIcon, ArrowUpRightIcon } from '@/components/roleHub/icons'
import { YouTubeFacade } from '@/components/learnAi/LearnAiClient'
import {
  BATCH_BASE,
  BATCH_TOTAL_WEEKS,
  BATCH_WEEKS,
  getPhase,
  getWeekNeighbours,
} from '@/data/pgCourse/batch'
import type { BatchWeek } from '@/data/pgCourse/batch/types'
import {
  Assignments,
  OfficeHours,
  PassedMark,
  PassedToggle,
  PitchBuilder,
  WeekDates,
  WeekTicks,
  WeeklyUpdate,
} from './BatchClient'
import { BATCH_DISCLAIMER } from './BatchHub'

// One week of the self-run YC batch (/paul-graham/yc-batch/week-<n>). Signal Paper.
// Order: header → this week's challenge → inside YC this week → framework(s) → talks → your week → office hours →
// weekly update → (pitch builder, weeks 11–12) → checkpoint → FAQ → sources → prev/next.

const SITE = 'https://www.autointerviewai.com'
const kicker = 'font-mono text-kicker uppercase tracking-[0.08em]'

function Section({
  id,
  label,
  title,
  intro,
  children,
}: {
  id: string
  label: string
  title: string
  intro?: string
  children: ReactNode
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 space-y-5">
      <header data-reveal>
        <div className={`${kicker} text-signal-strong`}>{label}</div>
        <h2 id={`${id}-title`} className="mt-2 text-h2 font-semibold text-fg">
          {title}
        </h2>
        {intro && <p className="mt-2 max-w-[68ch] text-body text-fg-2">{intro}</p>}
      </header>
      {children}
    </section>
  )
}

const isPitch = (name: string) => /pitch/i.test(name)

export default function WeekPage({ week }: { week: BatchWeek }) {
  const url = `${SITE}${BATCH_BASE}/${week.slug}`
  const phase = getPhase(week.phase)
  const { prev, next } = getWeekNeighbours(week.slug)
  const showPitch = week.week >= 11
  const pitchSeconds = week.pitchTarget?.seconds ?? 60
  const pitchNote = week.pitchTarget?.note
  const documented = week.atYc.confidence === 'documented'

  const nav = [
    ...(week.challenge ? [{ id: 'challenge', t: 'Challenge' }] : []),
    { id: 'inside-yc', t: 'Inside YC' },
    { id: 'frameworks', t: week.frameworks.length > 1 ? 'Frameworks' : 'Framework' },
    ...(week.videos.length ? [{ id: 'talks', t: 'Talks' }] : []),
    { id: 'your-week', t: 'Your week' },
    { id: 'office-hours', t: 'Office hours' },
    { id: 'update', t: 'Weekly update' },
    ...(showPitch ? [{ id: 'pitch', t: 'Pitch' }] : []),
    { id: 'checkpoint', t: 'Checkpoint' },
  ]

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Paul Graham course',
          item: `${SITE}/paul-graham`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'The 12-week YC challenge',
          item: `${SITE}${BATCH_BASE}`,
        },
        { '@type': 'ListItem', position: 3, name: `Week ${week.week}: ${week.title}`, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
      name: week.h1,
      description: week.metaDescription,
      url,
      inLanguage: 'en',
      isAccessibleForFree: true,
      learningResourceType: 'Weekly module',
      timeRequired: `PT${week.minutes}M`,
      teaches: week.frameworks.map((f) => f.name),
      isPartOf: {
        '@type': 'Course',
        name: 'The 12-week YC challenge',
        url: `${SITE}${BATCH_BASE}`,
      },
      provider: { '@type': 'Organization', name: 'Auto Interview AI', sameAs: SITE },
    },
    ...(week.faqs.length
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: week.faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          },
        ]
      : []),
  ]

  return (
    <DomainLayout currentPath="/paul-graham">
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
      <RevealRoot />

      <div className="bg-bg text-fg">
        <div className="mx-auto w-full max-w-[1200px] px-5 pb-16 pt-8 md:px-8 md:pb-24 md:pt-12 lg:grid lg:grid-cols-12 lg:gap-12">
          {/* ---------- Week rail (desktop) ---------- */}
          <aside className="hidden lg:col-span-3 lg:block">
            <nav aria-label="All weeks" className="sticky top-24 space-y-1">
              <Link
                href={BATCH_BASE}
                className="mb-3 inline-flex min-h-9 items-center text-small font-medium text-fg-2 hover:text-fg"
              >
                ← The 12-week challenge
              </Link>
              {BATCH_WEEKS.map((w) => {
                const on = w.slug === week.slug
                return (
                  <Link
                    key={w.slug}
                    href={`${BATCH_BASE}/${w.slug}`}
                    aria-current={on ? 'page' : undefined}
                    className={`flex items-center gap-3 rounded-lg px-2.5 py-2 text-small transition-colors duration-fast ${
                      on
                        ? 'bg-muted font-semibold text-fg'
                        : 'text-fg-2 hover:bg-muted hover:text-fg'
                    }`}
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border-strong bg-surface font-mono text-caption tabular-nums">
                      {w.week}
                    </span>
                    <span className="min-w-0 flex-1 leading-snug">{w.title}</span>
                    <PassedMark week={w.week} />
                  </Link>
                )
              })}
            </nav>
          </aside>

          <article className="min-w-0 lg:col-span-9">
            {/* ---------- Header ---------- */}
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-2 text-caption text-fg-3"
            >
              <Link href="/paul-graham" className="hover:text-fg">
                Paul Graham course
              </Link>
              <span aria-hidden="true">/</span>
              <Link href={BATCH_BASE} className="hover:text-fg">
                The 12-week YC challenge
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-fg-2">Week {week.week}</span>
            </nav>
            <div className={`${kicker} mt-5 text-signal-strong`}>
              Week {week.week} of {BATCH_TOTAL_WEEKS} · Phase {phase.n}: {phase.title}
            </div>
            <h1 className="mt-3 max-w-[24ch] font-serif text-h1 font-medium text-fg md:text-display">
              {week.h1}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="inline-flex h-7 items-center rounded-full bg-muted px-3 text-caption font-medium text-fg-2">
                {week.minutes} min to read · the doing takes the week
              </span>
              <WeekTicks ids={week.assignments.map((a) => a.id)} />
              <WeekDates week={week.week} hubHref={BATCH_BASE} />
            </div>

            <div className="mt-6 max-w-[72ch] rounded-xl border border-border bg-surface p-5 md:p-6">
              <div className={`${kicker} text-fg-3`}>This week in short</div>
              <p className="mt-2 text-body-lg text-fg">{week.tldr}</p>
            </div>
            {/* ---------- This week's challenge ---------- */}
            {week.challenge && (
              <section
                id="challenge"
                aria-labelledby="challenge-title"
                className="mt-6 max-w-[72ch] scroll-mt-24 rounded-2xl border border-border-strong bg-surface p-5 shadow-e1 md:p-7"
              >
                <div className={`${kicker} text-signal-strong`}>
                  Week {week.week} challenge · {phase.title}
                </div>
                <h2
                  id="challenge-title"
                  className="mt-2 text-h2 font-semibold text-fg"
                  data-challenge-name
                >
                  {week.challenge.name}
                </h2>
                <p className="mt-3 text-body-lg text-fg">{week.challenge.task}</p>
                <dl className="mt-5 grid gap-4 border-t border-border pt-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-caption font-semibold text-fg">You pass when</dt>
                    <dd className="mt-1 text-small text-fg-2">{week.challenge.proof}</dd>
                  </div>
                  <div>
                    <dt className="text-caption font-semibold text-fg">Why YC founders do this</dt>
                    <dd className="mt-1 text-small text-fg-2">{week.challenge.basis}</dd>
                  </div>
                </dl>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <PassedToggle week={week.week} />
                  <a
                    href="#your-week"
                    className="inline-flex min-h-11 items-center text-small font-semibold text-signal-strong underline-offset-4 hover:underline"
                  >
                    How to do it this week ↓
                  </a>
                </div>
              </section>
            )}
            <p className="mt-3 max-w-[72ch] text-caption text-fg-3">{BATCH_DISCLAIMER}</p>

            {/* ---------- In-page nav ---------- */}
            <nav
              aria-label="On this page"
              className="sticky top-16 z-30 -mx-5 mt-8 border-b border-border bg-bg/95 px-5 py-2 md:-mx-8 md:px-8 lg:mx-0 lg:px-0"
            >
              <ul className="flex gap-1.5 overflow-x-auto [scrollbar-width:none]">
                {nav.map((n) => (
                  <li key={n.id} className="shrink-0">
                    <a
                      href={`#${n.id}`}
                      className="inline-flex h-9 items-center rounded-full px-3 text-caption font-medium text-fg-2 transition-colors duration-fast hover:bg-muted hover:text-fg"
                    >
                      {n.t}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-10 space-y-16 md:space-y-20">
              {/* ---------- Inside YC ---------- */}
              <Section
                id="inside-yc"
                label={`Inside YC · around week ${week.week}`}
                title="What happens inside YC this week"
              >
                <div className="max-w-[72ch] space-y-4">
                  <span
                    className={`inline-flex min-h-7 items-center rounded-full px-3 text-caption font-semibold ${
                      documented ? 'bg-success-soft text-success-strong' : 'bg-warn-soft text-warn'
                    }`}
                  >
                    {documented
                      ? 'Documented by YC, its partners or Paul Graham'
                      : 'Reported by founders who did the batch'}
                  </span>
                  {week.atYc.body.map((p) => (
                    <p key={p.slice(0, 40)} className="text-body text-fg-2 md:text-prose">
                      {p}
                    </p>
                  ))}
                  {week.atYc.sources.length > 0 && (
                    <ul className="space-y-1 border-t border-border pt-3">
                      {week.atYc.sources.map((s) => (
                        <li key={s.url}>
                          <a
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-start gap-1 text-caption text-fg-2 underline-offset-4 hover:text-fg hover:underline"
                          >
                            {s.label} <ArrowUpRightIcon className="mt-0.5 h-3 w-3 shrink-0" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Section>

              {/* ---------- Frameworks ---------- */}
              <Section
                id="frameworks"
                label={`${week.frameworks.length} framework${week.frameworks.length > 1 ? 's' : ''} · explained here in full`}
                title={
                  week.frameworks.length > 1 ? 'This week’s frameworks' : 'This week’s framework'
                }
              >
                <div className="space-y-6">
                  {week.frameworks.map((f) => (
                    <div
                      key={f.name}
                      data-reveal
                      className="rounded-2xl border border-border bg-surface p-5 md:p-7"
                    >
                      <h3 className="text-h3 font-semibold text-fg">{f.name}</h3>
                      <a
                        href={f.source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-flex items-start gap-1 text-small text-fg-2 underline-offset-4 hover:text-fg hover:underline"
                      >
                        {f.who} <ArrowUpRightIcon className="mt-1 h-3 w-3 shrink-0" />
                      </a>
                      <div className="mt-4 max-w-[68ch] space-y-3">
                        {f.explain.map((p) => (
                          <p key={p.slice(0, 40)} className="text-body text-fg-2">
                            {p}
                          </p>
                        ))}
                      </div>
                      {f.steps.length > 0 && (
                        <ol className="mt-5 space-y-2.5">
                          {f.steps.map((s, i) => (
                            <li key={s.slice(0, 40)} className="flex gap-3">
                              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-signal-tint font-mono text-caption font-semibold tabular-nums text-signal-strong">
                                {i + 1}
                              </span>
                              <span className="pt-0.5 text-body text-fg">{s}</span>
                            </li>
                          ))}
                        </ol>
                      )}
                      {f.example && (
                        <div className="mt-6">
                          <div className="flex items-center justify-between gap-3">
                            <span className={`${kicker} text-fg-3`}>{f.example.label}</span>
                            <CopyButton text={f.example.text} />
                          </div>
                          <pre className="mt-2 whitespace-pre-wrap break-words rounded-xl bg-ink p-4 font-mono text-[13px] leading-relaxed text-ink-fg md:p-5">
                            {f.example.text}
                          </pre>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Section>

              {/* ---------- Talks ---------- */}
              {week.videos.length > 0 && (
                <Section
                  id="talks"
                  label={`${week.videos.length} talk${week.videos.length > 1 ? 's' : ''} · play here`}
                  title="This week’s talks"
                >
                  <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2">
                    {week.videos.map((v) => (
                      <figure key={v.youtubeId} data-reveal className="space-y-3">
                        <YouTubeFacade id={v.youtubeId} title={v.title} start={v.start} />
                        <figcaption>
                          <div className="text-small font-semibold leading-snug text-fg">
                            {v.title}
                          </div>
                          <div className="mt-1 text-caption text-fg-3">
                            {v.channel} · {v.minutes} min
                          </div>
                          <p className="mt-1.5 text-small text-fg-2">{v.why}</p>
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </Section>
              )}

              {/* ---------- Your week ---------- */}
              <Section
                id="your-week"
                label={`${week.assignments.length} assignments · saved on this device`}
                title="Your week"
                intro="Do these before next week. Each one says why it matters and what done looks like."
              >
                <Assignments items={week.assignments} />
              </Section>

              {/* ---------- Office hours ---------- */}
              <Section
                id="office-hours"
                label="Office hours · run it yourself"
                title="Questions a YC partner would ask you now"
                intro="Answer each in one or two sentences, out loud first, then in writing. If an answer is vague, that is this week’s problem to fix."
              >
                <OfficeHours items={week.officeHours} idPrefix={week.slug} />
              </Section>

              {/* ---------- Weekly update ---------- */}
              <Section
                id="update"
                label={`Weekly update · ${week.weeklyUpdate.metric}`}
                title="Write this week’s update"
              >
                <WeeklyUpdate
                  week={week.week}
                  metric={week.weeklyUpdate.metric}
                  prompt={week.weeklyUpdate.prompt}
                />
              </Section>

              {/* ---------- Pitch builder (weeks 11–12) ---------- */}
              {showPitch && (
                <Section
                  id="pitch"
                  label={`Pitch builder · target ${pitchSeconds} seconds`}
                  title="Build and time your pitch"
                  intro={
                    week.frameworks.some((f) => isPitch(f.name))
                      ? 'Fill in each part using this week’s framework above. The builder joins them in order and estimates how long it takes to say.'
                      : 'Fill in each part. The builder joins them in order and estimates how long it takes to say.'
                  }
                >
                  <PitchBuilder seconds={pitchSeconds} note={pitchNote} />
                  {week.pitchTarget?.source && (
                    <a
                      href={week.pitchTarget.source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-caption text-fg-3 underline-offset-4 hover:text-fg hover:underline"
                    >
                      Source: {week.pitchTarget.source.label}{' '}
                      <ArrowUpRightIcon className="h-3 w-3" />
                    </a>
                  )}
                </Section>
              )}

              {/* ---------- Checkpoint ---------- */}
              <section id="checkpoint" aria-labelledby="checkpoint-title" className="scroll-mt-24">
                <div className="flex gap-3 rounded-xl bg-signal-tint p-5 ring-1 ring-inset ring-signal/15 md:p-6">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 font-mono text-small font-semibold text-signal-strong"
                  >
                    ✓
                  </span>
                  <div>
                    <h2 id="checkpoint-title" className="text-h4 font-semibold text-fg">
                      Checkpoint before week {Math.min(week.week + 1, BATCH_TOTAL_WEEKS)}
                    </h2>
                    <p className="mt-1.5 max-w-[68ch] text-body text-fg-2">{week.checkpoint}</p>
                    {week.week === BATCH_TOTAL_WEEKS && (
                      <Link
                        href={`${BATCH_BASE}#growth`}
                        className="mt-3 inline-flex min-h-9 items-center text-small font-semibold text-signal-strong underline-offset-4 hover:underline"
                      >
                        See your 12 weeks in the growth tracker →
                      </Link>
                    )}
                  </div>
                </div>
              </section>

              {/* ---------- FAQ ---------- */}
              {week.faqs.length > 0 && (
                <section aria-labelledby="faq-title" className="space-y-4">
                  <h2 id="faq-title" className="text-h3 font-semibold text-fg">
                    Questions about week {week.week}
                  </h2>
                  <div className="space-y-2.5">
                    {week.faqs.map((f, i) => (
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
              )}

              {/* ---------- Sources ---------- */}
              <section aria-labelledby="sources-title" className="space-y-3">
                <h2 id="sources-title" className="text-h4 font-semibold text-fg">
                  Sources for week {week.week}
                </h2>
                <ul className="space-y-1.5">
                  {week.sources.map((s) => (
                    <li key={s.url}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-start gap-1 text-small text-fg-2 underline-offset-4 hover:text-fg hover:underline"
                      >
                        {s.label} <ArrowUpRightIcon className="mt-1 h-3 w-3 shrink-0" />
                      </a>
                    </li>
                  ))}
                </ul>
              </section>

              {/* ---------- Prev / next ---------- */}
              <nav
                aria-label="Previous and next week"
                className="grid gap-3 border-t border-border pt-8 sm:grid-cols-2"
              >
                {prev ? (
                  <Link
                    href={`${BATCH_BASE}/${prev.slug}`}
                    className="group rounded-xl border border-border bg-surface p-5 transition-[border-color,box-shadow] duration-fast hover:border-border-strong hover:shadow-e2"
                  >
                    <div className={`${kicker} text-fg-3`}>← Week {prev.week}</div>
                    <div className="mt-1.5 text-h4 font-semibold text-fg group-hover:text-signal-strong">
                      {prev.title}
                    </div>
                  </Link>
                ) : (
                  <Link
                    href={BATCH_BASE}
                    className="group rounded-xl border border-border bg-surface p-5 transition-[border-color,box-shadow] duration-fast hover:border-border-strong hover:shadow-e2"
                  >
                    <div className={`${kicker} text-fg-3`}>← The challenge</div>
                    <div className="mt-1.5 text-h4 font-semibold text-fg group-hover:text-signal-strong">
                      Set your start date
                    </div>
                  </Link>
                )}
                {next ? (
                  <Link
                    href={`${BATCH_BASE}/${next.slug}`}
                    className="group rounded-xl border border-border bg-surface p-5 text-right transition-[border-color,box-shadow] duration-fast hover:border-border-strong hover:shadow-e2"
                  >
                    <div className={`${kicker} text-fg-3`}>Up next · Week {next.week} →</div>
                    <div className="mt-1.5 text-h4 font-semibold text-fg group-hover:text-signal-strong">
                      {next.title}
                    </div>
                  </Link>
                ) : (
                  <Link
                    href={`${BATCH_BASE}#growth`}
                    className="group flex items-center justify-end gap-2 rounded-xl border border-border bg-surface p-5 text-right text-h4 font-semibold text-fg transition-[border-color,box-shadow] duration-fast hover:border-border-strong hover:shadow-e2"
                  >
                    Your 12 weeks in one chart <ArrowRightIcon />
                  </Link>
                )}
              </nav>
            </div>
          </article>
        </div>
      </div>
    </DomainLayout>
  )
}
