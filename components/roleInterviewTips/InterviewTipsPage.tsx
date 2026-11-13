import Link from 'next/link'
import type { ReactNode } from 'react'
import DomainLayout from '@/components/domain/DomainLayout'
import type { RoleHub } from '@/data/roleHubs/types'
import type { RoleInterviewTips, TipRound } from '@/data/roleInterviewTips/types'
import { tipStats, fillTips, ROUND_LABELS, interviewTipsPath } from '@/data/roleInterviewTips'
import KitStrip from '@/components/roleKits/KitStrip'
import MockInterviewButton from '@/components/ai/MockInterviewButton'
import { ArrowRightIcon } from '@/components/roleHub/icons'
import { Figure, BarList, CompareTable, StatRow, Flow, Insight } from '@/components/viz'
import { SelfScore, WeekChecklist } from './TipsClient'

// Template for /<role>/interview-tips. Everything is in the server HTML; the client islands only
// remember checkbox ticks. Counts come from tipStats() over the mapped loops, never typed.

const SITE = 'https://www.autointerviewai.com'
const container = 'mx-auto w-full max-w-[1100px] px-5 md:px-8'
const kicker = 'font-mono text-kicker uppercase tracking-[0.08em]'
const link =
  'font-medium text-signal-strong underline decoration-signal/30 underline-offset-2 hover:decoration-signal'

const fmtDate = (d: string) =>
  new Date(d + 'T00:00:00Z').toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })

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
      className="scroll-mt-32 border-t border-border py-12 md:py-16"
    >
      <header className="max-w-2xl">
        <div className={`${kicker} text-signal-strong`}>{meta}</div>
        <h2 id={`${id}-t`} className="mt-3 text-h2 font-semibold text-fg">
          {title}
        </h2>
        {intro && <p className="mt-3 text-body text-fg-2">{intro}</p>}
      </header>
      <div className="mt-8 space-y-6">{children}</div>
    </section>
  )
}

function Ext({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener nofollow"
      className="underline decoration-border-strong underline-offset-2 hover:text-fg"
    >
      {children}
    </a>
  )
}

function List({ items, mark }: { items: string[]; mark: 'do' | 'avoid' }) {
  return (
    <ul className="space-y-2">
      {items.map((it) => (
        <li key={it} className="flex gap-2.5 text-small leading-relaxed text-fg-2">
          <span
            aria-hidden="true"
            className={`mt-[3px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
              mark === 'do' ? 'bg-success-soft text-success' : 'bg-danger-soft text-danger'
            }`}
          >
            {mark === 'do' ? '✓' : '×'}
          </span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  )
}

function RoundCard({
  r,
  n,
  total,
  slug,
  inLoops,
  nFull,
}: {
  r: TipRound
  n: number
  total: number
  slug: string
  inLoops: number
  nFull: number
}) {
  return (
    <article
      id={`r-${r.id}`}
      aria-labelledby={`r-${r.id}-t`}
      className="scroll-mt-36 rounded-2xl border border-border bg-surface p-5 md:p-7"
    >
      <header>
        <div className={`${kicker} text-fg-3`}>
          Card {n} of {total} · {r.minutes}
          {inLoops > 0 ? ` · in ${inLoops} of ${nFull} mapped loops` : ''}
        </div>
        <h3 id={`r-${r.id}-t`} className="mt-2 text-h3 font-semibold text-fg">
          {r.name}
        </h3>
        <p className="mt-3 max-w-[68ch] text-body leading-relaxed text-fg">
          <span className="font-semibold">What it tests: </span>
          {r.tests}
        </p>
      </header>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div>
          <div className={`${kicker} mb-3 text-success`}>Do</div>
          <List items={r.doThis} mark="do" />
        </div>
        <div>
          <div className={`${kicker} mb-3 text-danger`}>Avoid</div>
          <List items={r.avoid} mark="avoid" />
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-muted/60 p-4 md:p-5">
        <div className={`${kicker} text-fg-3`}>The first 20 seconds · our example</div>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-surface p-4">
            <div className="text-caption font-semibold text-danger">Weak</div>
            <p className="mt-1.5 text-small leading-relaxed text-fg-2">{r.weak}</p>
          </div>
          <div className="rounded-lg border border-signal/30 bg-surface p-4">
            <div className="text-caption font-semibold text-signal-strong">Strong</div>
            <p className="mt-1.5 text-small leading-relaxed text-fg">{r.strong}</p>
          </div>
        </div>
        <p className="mt-3 text-small leading-relaxed text-fg-2">
          <span className="font-semibold text-fg">Why it scores: </span>
          {r.why}
        </p>
      </div>

      {r.evidence.length > 0 && (
        <div className="mt-6">
          <div className={`${kicker} text-fg-3`}>In their own words</div>
          <ul className="mt-3 grid gap-3 md:grid-cols-2">
            {r.evidence.map((e) => (
              <li key={e.quote} className="border-t border-border pt-3">
                <p className="font-serif text-body italic leading-relaxed text-fg">“{e.quote}”</p>
                <p className="mt-1.5 text-caption text-fg-3">
                  {e.official ? 'Company’s own prep page' : e.who} ·{' '}
                  <Ext href={e.src.url}>{e.src.label}</Ext>
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 grid items-start gap-4 md:grid-cols-[1fr_auto]">
        <SelfScore slug={slug} round={r.id} items={r.selfCheck} />
        {r.practice && (
          <Link
            href={r.practice.href}
            className="group inline-flex min-h-11 items-center gap-2 self-end rounded-full bg-surface px-4 text-small font-semibold text-fg ring-1 ring-inset ring-border-strong hover:bg-muted"
          >
            Practise: {r.practice.label}
            <ArrowRightIcon className="h-4 w-4 shrink-0 text-fg-3 transition-transform duration-fast group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>
    </article>
  )
}

export default function InterviewTipsPage({ hub, t }: { hub: RoleHub; t: RoleInterviewTips }) {
  const st = tipStats(t)
  const url = `${SITE}${interviewTipsPath(hub.slug)}`
  const shareOf = Object.fromEntries(st.share.map((s) => [s.type, s.loops]))
  const counted = st.share.filter((s) => s.loops > 0)
  const top = [...counted].sort((a, b) => b.loops - a.loops)[0]
  const tops = counted.filter((x) => x.loops === top.loops)
  const faqs = t.faqs.map((f) => ({ q: f.q, a: fillTips(t, f.a) }))

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: t.h1,
      description: fillTips(t, t.metaDescription),
      url,
      dateModified: t.checked,
      about: { '@type': 'Occupation', name: hub.roleName },
      author: { '@type': 'Organization', name: 'Auto Interview AI', url: SITE },
      publisher: { '@type': 'Organization', name: 'Auto Interview AI', url: SITE },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
        { '@type': 'ListItem', position: 2, name: hub.roleName, item: `${SITE}/${hub.slug}` },
        { '@type': 'ListItem', position: 3, name: 'Interview tips', item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ]

  return (
    <DomainLayout currentPath={`/${hub.slug}`}>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
      <div className="bg-bg text-fg">
        <div className={`${container} pb-6 pt-8 md:pt-12`}>
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-caption text-fg-3"
          >
            <Link href="/" className="hover:text-fg">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href={`/${hub.slug}`} className="hover:text-fg">
              {hub.roleName}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-fg-2">Interview tips</span>
          </nav>
          <header className="mt-8 max-w-3xl">
            <div className={`${kicker} text-signal-strong`}>
              {fillTips(t, t.kicker)} · Updated {fmtDate(t.checked)}
            </div>
            <h1 className="mt-4 font-serif text-h1 font-medium text-fg md:text-display">{t.h1}</h1>
            <div className="mt-6 rounded-xl bg-signal-tint p-5 ring-1 ring-inset ring-signal/15">
              <div className={`${kicker} text-signal-ink`}>The short answer</div>
              <p className="speakable-direct-answer mt-2 text-body leading-relaxed text-fg md:text-body-lg">
                {fillTips(t, t.directAnswer)}
              </p>
            </div>
            <div className="mt-6 flex flex-wrap items-start gap-3">
              <MockInterviewButton role={hub.roleName} />
              <a
                href="#rounds"
                className="inline-flex h-12 items-center rounded-full bg-surface px-5 text-small font-semibold text-fg ring-1 ring-inset ring-border-strong hover:bg-muted"
              >
                Tips for each round
              </a>
            </div>
          </header>
          <div className="mt-8">
            <KitStrip hub={hub} current="interview-tips" />
          </div>
        </div>

        <div className={container}>
          <StatRow
            stats={[
              {
                label: 'Interview loops mapped',
                value: String(st.nLoops),
                sub: `${st.nReported} reported by candidates, ${st.nOfficial} from company prep pages`,
              },
              {
                label: 'Companies',
                value: String(st.nCompanies),
                sub: st.companies.join(', '),
              },
              {
                label: 'Rounds in a complete loop',
                value: `${st.minRounds}–${st.maxRounds}`,
                sub: `median ${st.medRounds}, incl. the recruiter call (${st.nFull} complete loops)`,
              },
              {
                label: 'Newest report',
                value: st.newestLabel,
                sub: st.newest ? `${st.newest.company}, ${st.newest.level}` : '',
              },
            ]}
          />

          <Figure
            label="The usual order · from the loops below"
            title="Most PM loops start with two screens, then case and behavioural rounds, then a final check"
            sub="The order of the case and behavioural rounds varies (Google’s reported loop opened with behavioural). Ask your recruiter for your round names and match them to the cards below."
            source={[
              { label: 'Amazon PM interview prep', url: t.loops[0].src.url },
              { label: 'Reported loops on this page', url: '#loops' },
            ]}
            updated={`opened ${fmtDate(t.checked)}`}
          >
            <Flow
              steps={[
                { title: 'Recruiter call', body: 'Fit, level, logistics' },
                { title: 'PM / HM screen', body: 'One product + one behavioural' },
                { title: 'Take-home (some)', body: 'Amazon writing; Flipkart APM 2-pager' },
                { title: 'Case rounds', body: 'Product sense, analytics, strategy, technical' },
                { title: 'Behavioural', body: 'Leadership, conflict, failure' },
                { title: 'Final check', body: 'Bar raiser, HM or director' },
              ]}
            />
          </Figure>

          <Figure
            label={`Round types · ${st.nFull} complete loops · ${st.nCompanies} companies`}
            title={`${tops.map((x) => x.label).join(' and ')} show${tops.length === 1 ? 's' : ''} up in ${top.loops === st.nFull ? 'all' : top.loops + ' of'} ${st.nFull} complete loops; prepare ${tops.length === 1 ? 'it' : 'them'} first`}
            sub="How many of the complete loops we mapped include each round type. Partial loops (a company page, or a review that lists only the first round) are not counted."
            source={[
              {
                label: 'Glassdoor, AmbitionBox and aced.io reports in the loops table',
                url: '#loops',
              },
            ]}
            updated={`Counted from the page data, ${fmtDate(t.checked)}`}
            table={{
              head: ['Round type', `Complete loops that include it (of ${st.nFull})`],
              rows: st.share.map((s) => [s.label, s.loops]),
            }}
            note="A round counts for two types when the source says it covered both (an Amazon bar raiser is behavioural; one Flipkart design round also asked behavioural questions). Official Amazon and Flipkart APM processes add a writing round but are partial lists, so they are not counted."
          >
            <BarList
              rows={st.share.map((s) => ({
                label: s.label,
                value: s.loops,
                display: `${s.loops} of ${st.nFull}`,
                href: `#r-${t.rounds.find((r) => r.type === s.type)?.id ?? s.type}`,
              }))}
              max={st.nFull}
            />
          </Figure>

          <nav
            aria-label="Rounds on this page"
            className="sticky top-16 z-20 -mx-5 border-b border-border bg-bg/95 px-5 py-2 md:-mx-8 md:px-8"
          >
            <ol className="flex gap-2 overflow-x-auto">
              {t.rounds.map((r) => (
                <li key={r.id} className="shrink-0">
                  <a
                    href={`#r-${r.id}`}
                    className="inline-flex h-9 items-center rounded-full px-3 text-small text-fg-2 ring-1 ring-inset ring-border hover:text-fg"
                  >
                    {r.short}
                  </a>
                </li>
              ))}
              <li className="shrink-0">
                <a
                  href="#week"
                  className="inline-flex h-9 items-center rounded-full px-3 text-small text-fg-2 ring-1 ring-inset ring-border hover:text-fg"
                >
                  Interview week
                </a>
              </li>
            </ol>
          </nav>

          <Section
            id="rounds"
            meta={`${t.rounds.length} rounds · do, avoid, weak vs strong`}
            title="Tips for each round"
            intro="Each card says what the round is scored on, in the company’s words where it publishes them, what to do and avoid, and how a weak and a strong answer start. Answer out loud, then tick what your answer did."
          >
            {t.rounds.map((r, i) => (
              <RoundCard
                key={r.id}
                r={r}
                n={i + 1}
                total={t.rounds.length}
                slug={hub.slug}
                inLoops={shareOf[r.type] ?? 0}
                nFull={st.nFull}
              />
            ))}
          </Section>

          <Section
            id="moves"
            meta="Weak vs strong · the pattern across rounds"
            title="The same five moves win every round"
            intro="Read across a row: the weak habit and the strong one are the same in every round, only the material changes."
          >
            <CompareTable
              label="Weak vs strong moves in a PM interview"
              corner="Moment in the answer"
              columns={[{ name: 'Weak move' }, { name: 'Strong move', featured: true }]}
              rows={[
                {
                  label: 'First 30 seconds',
                  cells: [
                    'Starts listing ideas',
                    { v: 'States the goal and one user', best: true },
                  ],
                },
                {
                  label: 'Choosing',
                  cells: [
                    'Keeps every option open',
                    { v: 'Ranks and picks one, names the trade-off', best: true },
                  ],
                },
                {
                  label: 'Evidence',
                  cells: ['“It went well”', { v: 'What it moved, with a number', best: true }],
                },
                {
                  label: 'Structure',
                  cells: [
                    'Recites a framework',
                    { v: 'Leads with a thesis, uses steps that fit', best: true },
                  ],
                },
                {
                  label: 'Credit',
                  cells: ['“I did everything”', { v: '“We”, and which call was mine', best: true }],
                },
                {
                  label: 'Under pushback',
                  cells: [
                    'Defends the first idea',
                    { v: 'Listens, updates, says why', best: true },
                  ],
                },
              ]}
              caption={
                <>
                  From the reports on this page and hiring-manager writing:{' '}
                  <Ext href={t.sources.find((s) => s.url.includes('naspers'))?.url ?? '#'}>
                    Barron Ernst
                  </Ext>
                  ,{' '}
                  <Ext href={t.sources.find((s) => s.url.includes('atlassian'))?.url ?? '#'}>
                    Atlassian
                  </Ext>
                  ,{' '}
                  <Ext href={t.sources.find((s) => s.url.includes('amazon.jobs'))?.url ?? '#'}>
                    Amazon
                  </Ext>{' '}
                  (opened {fmtDate(t.checked)})
                </>
              }
            />
            <Insight title="If you fix one thing">
              Put a number in every answer. Amazon asks for it on its own prep page, and the Amazon
              candidate who reported a weak round in May 2026 named missing data points as the
              reason.
            </Insight>
          </Section>

          <Section
            id="loops"
            meta={`${st.nLoops} loops · ${st.nReported} reported · ${st.nOfficial} official`}
            title="What each company’s loop looked like"
            intro="Every loop below links to where it was reported or published. Dates are as the source gives them; aced.io shows relative dates, so we give the approximate month as of the date we opened it."
          >
            <p className="text-caption text-fg-3 md:hidden">
              Swipe the table sideways to see dates and sources →
            </p>
            <div
              className="overflow-x-auto rounded-xl border border-border bg-surface"
              role="region"
              // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
              tabIndex={0}
              aria-label="Product manager interview loops by company"
            >
              <table className="w-full min-w-[640px] text-left text-small">
                <thead className="bg-muted text-fg-2">
                  <tr>
                    <th scope="col" className="sticky left-0 bg-muted px-4 py-2.5 font-medium">
                      Company
                    </th>
                    <th scope="col" className="px-4 py-2.5 font-medium">
                      Rounds, in order
                    </th>
                    <th scope="col" className="whitespace-nowrap px-4 py-2.5 font-medium">
                      When · source
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {t.loops.map((l) => (
                    <tr key={l.src.url + l.level} className="align-top">
                      <th
                        scope="row"
                        className="sticky left-0 bg-surface px-4 py-3 font-medium text-fg"
                      >
                        {l.company}
                        <span className="block text-caption font-normal text-fg-3">{l.level}</span>
                      </th>
                      <td className="px-4 py-3 text-fg-2">
                        <ol className="list-decimal space-y-0.5 pl-4">
                          {l.rounds.map((r) => (
                            <li key={r.name}>
                              {r.name}
                              {r.minutes ? ` (${r.minutes} min)` : ''}
                            </li>
                          ))}
                        </ol>
                        {l.partial && (
                          <span className="mt-1 block text-caption text-fg-3">
                            Partial list; not counted in the chart.
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-caption text-fg-3">
                        {l.when}
                        <span className="block">
                          {l.kind === 'official' ? 'Company page: ' : 'Reported: '}
                          <Ext href={l.src.url}>{l.src.label.split(',')[0]}</Ext>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section
            id="india"
            meta="India · campus APM and consumer companies"
            title="If you are interviewing in India"
          >
            <div className="grid gap-4 md:grid-cols-2">
              {t.india.map((x) => (
                <div key={x.title} className="rounded-xl border border-border bg-surface p-5">
                  <h3 className="text-h4 font-semibold text-fg">{x.title}</h3>
                  <p className="mt-2 text-small leading-relaxed text-fg-2">{x.body}</p>
                  {x.src && (
                    <p className="mt-2 text-caption text-fg-3">
                      Source: <Ext href={x.src.url}>{x.src.label}</Ext>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Section>

          <Section
            id="decide"
            meta="Decision · where to spend your prep"
            title="What to prepare first, by where you are"
          >
            <div className="space-y-3 md:hidden">
              {t.decision.map((d) => (
                <div key={d.you} className="rounded-xl border border-border bg-surface p-4">
                  <div className="text-small font-semibold text-fg">{d.you}</div>
                  <p className="mt-2 text-small text-fg-2">
                    <span className="font-medium text-fg">Focus: </span>
                    {d.focus}
                  </p>
                  <p className="mt-1 text-small text-fg-2">
                    <span className="font-medium text-fg">First step: </span>
                    {d.firstStep}
                  </p>
                  <p className="mt-1 text-caption text-fg-3">Effort: {d.effort}</p>
                </div>
              ))}
            </div>
            <div className="hidden overflow-hidden rounded-xl border border-border bg-surface md:block">
              <table className="w-full text-left text-small">
                <thead className="bg-muted text-fg-2">
                  <tr>
                    <th scope="col" className="px-4 py-2.5 font-medium">
                      If you are…
                    </th>
                    <th scope="col" className="px-4 py-2.5 font-medium">
                      Focus on
                    </th>
                    <th scope="col" className="px-4 py-2.5 font-medium">
                      First step this week
                    </th>
                    <th scope="col" className="px-4 py-2.5 font-medium">
                      Effort
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {t.decision.map((d) => (
                    <tr key={d.you} className="align-top">
                      <th scope="row" className="px-4 py-3 font-medium text-fg">
                        {d.you}
                      </th>
                      <td className="px-4 py-3 text-fg-2">{d.focus}</td>
                      <td className="px-4 py-3 text-fg-2">{d.firstStep}</td>
                      <td className="px-4 py-3 text-fg-2">{d.effort}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section
            id="week"
            meta="Checklist · saved in this browser · no login"
            title="Your interview week"
            intro="Tick as you go. Ticks stay on this device; nothing is sent anywhere."
          >
            <WeekChecklist slug={hub.slug} groups={t.week} />
          </Section>

          <Section id="next" meta="Next step" title="Now say it out loud">
            <p className="max-w-[68ch] text-body text-fg-2">
              Reading tips does not change how you sound under time pressure. Pick your weakest
              round from the chart above, answer two questions out loud in a mock interview, and
              score them with that round’s checklist.
            </p>
            <div className="flex flex-wrap items-start gap-3">
              <MockInterviewButton role={hub.roleName} />
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {[
                {
                  href: `/${hub.slug}#questions`,
                  label: `${hub.shortName} interview questions with model answers`,
                },
                {
                  href: `/${hub.slug}/resume`,
                  label: `${hub.shortName} resume (CV) + Word template`,
                },
                {
                  href: `/${hub.slug}/salary`,
                  label: `${hub.shortName} salary, by level and city`,
                },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-surface p-5 text-small font-semibold text-fg transition-[border-color,box-shadow] duration-fast hover:border-border-strong hover:shadow-e2"
                >
                  {l.label}
                  <ArrowRightIcon className="h-4 w-4 shrink-0 text-fg-3 transition-transform duration-fast group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </Section>

          <section
            id="faq"
            aria-labelledby="faq-t"
            className="scroll-mt-32 border-t border-border py-12 md:py-16"
          >
            <h2 id="faq-t" className="text-h2 font-semibold text-fg">
              Frequently asked questions
            </h2>
            <div className="mt-6 max-w-3xl space-y-2.5">
              {faqs.map((f, i) => (
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

          <section
            id="sources"
            aria-labelledby="sources-t"
            className="border-t border-border pb-16 pt-12"
          >
            <h2 id="sources-t" className="text-h3 font-semibold text-fg">
              Sources (all opened {fmtDate(t.checked)})
            </h2>
            <ol className="mt-4 grid list-decimal gap-1.5 pl-5 text-small text-fg-2 md:grid-cols-2">
              {t.sources.map((s) => (
                <li key={s.url}>
                  <Ext href={s.url}>{s.label}</Ext>
                </li>
              ))}
            </ol>
            <p className="mt-4 max-w-[68ch] text-caption text-fg-3">
              Weak and strong openings are examples we wrote; people, products and numbers in them
              are illustrative. Quotes are copied from the linked pages and kept under 25 words.
              Round labels such as “{ROUND_LABELS['product-sense']}” are our grouping of the names
              each company uses. See also the{' '}
              <Link href={`/${hub.slug}`} className={link}>
                {hub.roleName} interview guide
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </DomainLayout>
  )
}
