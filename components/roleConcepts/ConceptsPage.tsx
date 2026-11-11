import Link from 'next/link'
import type { ReactNode } from 'react'
import DomainLayout from '@/components/domain/DomainLayout'
import type { RoleHub } from '@/data/roleHubs/types'
import type { RoleConcepts, Concept } from '@/data/roleConcepts/types'
import type { HubQuestion } from '@/data/roleHubs/types'
import KitStrip from '@/components/roleKits/KitStrip'
import { ArrowRightIcon } from '@/components/roleHub/icons'
import {
  Figure,
  BarList,
  ColumnChart,
  CompareTable,
  StatRow,
  Flow,
  Insight,
  SERIES,
} from '@/components/viz'
import { ExplainTick, ExplainProgress, Quiz } from './ConceptsClient'

// Template for /<role>/concepts. Everything a reader needs is in the server HTML; the client
// islands only record quiz picks and "I can explain this" ticks. Counts are computed from the
// role hub's question bank, never typed.

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

export function conceptStats(hub: RoleHub, c: RoleConcepts) {
  const allQ = hub.questionGroups.flatMap((g) => g.questions.map((q, i) => ({ g: g.id, i, q })))
  const lookup = (g: string, i: number) =>
    hub.questionGroups.find((x) => x.id === g)?.questions[i] as HubQuestion | undefined
  const linkedKeys = new Set(c.concepts.flatMap((k) => k.askedIn.map((r) => `${r.group}:${r.i}`)))
  const linked = allQ.filter((x) => linkedKeys.has(`${x.g}:${x.i}`))
  const perConcept = c.concepts.map((k) => ({
    id: k.id,
    name: k.name,
    n: k.askedIn.filter((r) => lookup(r.group, r.i)).length,
    reported: k.askedIn.filter((r) => lookup(r.group, r.i)?.source).length,
  }))
  return {
    totalQ: allQ.length,
    linked: linked.length,
    linkedReported: linked.filter((x) => x.q.source).length,
    perConcept,
    lookup,
  }
}

function Table({
  caption,
  head,
  rows,
}: {
  caption: string
  head: string[]
  rows: (string | number)[][]
}) {
  return (
    <figure className="min-w-0">
      <figcaption className="mb-1.5 font-mono text-caption text-fg-3">{caption}</figcaption>
      <div
        className="overflow-x-auto rounded-lg border border-border bg-surface"
        role="region"
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        aria-label={caption}
      >
        <table className="w-full text-left text-caption tabular-nums sm:text-small">
          <thead className="bg-muted text-fg-2">
            <tr>
              {head.map((h) => (
                <th key={h} scope="col" className="whitespace-nowrap px-3 py-2 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((r, i) => (
              <tr key={i}>
                {r.map((v, j) => (
                  <td
                    key={j}
                    className={`whitespace-nowrap px-3 py-1.5 ${v === 'NULL' || v === 'NaN' ? 'font-mono text-fg-3' : 'text-fg'}`}
                  >
                    {typeof v === 'number' ? v.toLocaleString('en-IN') : v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  )
}

function Code({ lang, text }: { lang: string; text: string }) {
  return (
    <figure className="min-w-0">
      <figcaption className="mb-1.5 font-mono text-caption uppercase text-fg-3">{lang}</figcaption>
      <pre className="overflow-x-auto rounded-lg bg-ink p-4 font-mono text-caption leading-relaxed text-ink-fg sm:text-small">
        <code>{text}</code>
      </pre>
    </figure>
  )
}

/* ---------- concept visuals (data from the concept's own example) ---------- */

function ConceptVisual({ c }: { c: Concept }) {
  switch (c.visual) {
    case 'sql-order':
      return (
        <Figure
          label="Logical order · SQL"
          title="SQL evaluates FROM first and SELECT near the end"
          source={[
            {
              label: 'Microsoft Learn, SELECT (Transact-SQL)',
              url: 'https://learn.microsoft.com/sql/t-sql/queries/select-transact-sql',
            },
          ]}
          updated="opened 11 Nov 2026"
          note="Simplified from Microsoft’s list. The engine may execute in another physical order; the logical order decides which names each clause can see."
        >
          <Flow
            steps={[
              { title: 'FROM / JOIN', body: 'Build the rows' },
              { title: 'WHERE', body: 'Filter rows' },
              { title: 'GROUP BY', body: 'Make groups' },
              { title: 'HAVING', body: 'Filter groups' },
              { title: 'SELECT', body: 'Compute columns, aliases' },
              { title: 'ORDER BY', body: 'Sort, then LIMIT' },
            ]}
          />
        </Figure>
      )
    case 'rank-compare':
      return (
        <CompareTable
          label="ROW_NUMBER vs RANK vs DENSE_RANK"
          corner="Scores 90, 85, 85, 80"
          columns={[{ name: 'ROW_NUMBER' }, { name: 'RANK' }, { name: 'DENSE_RANK' }]}
          rows={[
            { label: 'Ties get the same number', cells: [false, true, true] },
            { label: 'Skips numbers after a tie', cells: [false, true, false] },
            { label: 'Number given to the 80', cells: ['4', '4', { v: '3', best: true }] },
            {
              label: 'Use it for',
              cells: ['Exactly N rows, dedupe', 'Competition-style rank', 'Nth highest value'],
            },
          ]}
          caption={
            <>
              Computed in SQLite; definitions from{' '}
              <a
                href="https://www.postgresql.org/docs/current/functions-window.html"
                target="_blank"
                rel="noopener"
                className="underline underline-offset-2"
              >
                PostgreSQL docs
              </a>{' '}
              (opened 11 Nov 2026)
            </>
          }
        />
      )
    case 'lookup-compare':
      return (
        <CompareTable
          label="Excel lookups compared"
          corner="Feature"
          columns={[
            { name: 'VLOOKUP' },
            { name: 'INDEX + MATCH' },
            { name: 'XLOOKUP', featured: true },
          ]}
          rows={[
            { label: 'Can return a column left of the key', cells: [false, true, true] },
            {
              label: 'Match if you leave the flag out',
              cells: ['Approximate', 'MATCH: approximate', { v: 'Exact', best: true }],
            },
            { label: 'Your own “not found” text', cells: [false, false, true] },
            {
              label: 'Breaks when a column is inserted',
              cells: ['Yes (column number)', 'No', 'No'],
            },
            {
              label: 'Available in',
              cells: ['All versions', 'All versions', 'Microsoft 365, Excel 2021+'],
            },
          ]}
          caption={
            <>
              Microsoft Support:{' '}
              <a
                href="https://support.microsoft.com/en-us/Excel/vlookup-function"
                target="_blank"
                rel="noopener"
                className="underline underline-offset-2"
              >
                VLOOKUP
              </a>
              ,{' '}
              <a
                href="https://support.microsoft.com/excel/functions/xlookup-function"
                target="_blank"
                rel="noopener"
                className="underline underline-offset-2"
              >
                XLOOKUP
              </a>{' '}
              (opened 11 Nov 2026)
            </>
          }
        />
      )
    case 'import-dq':
      return (
        <CompareTable
          label="Power BI storage modes"
          corner="What changes"
          columns={[{ name: 'Import' }, { name: 'DirectQuery' }]}
          rows={[
            {
              label: 'Where the data sits',
              cells: ['Copied into the model’s memory', 'Stays in the source'],
            },
            {
              label: 'How fresh visuals are',
              cells: ['As of the last refresh', 'Queried when the visual loads'],
            },
            {
              label: 'Visual speed',
              cells: [
                { v: 'Fast, fully interactive', best: true },
                'Depends on the source and network',
              ],
            },
            {
              label: 'Scheduled refreshes',
              cells: ['Up to 8 a day on Pro, 48 on Premium/PPU', 'Not needed'],
            },
            {
              label: 'Row limit to know',
              cells: ['Model size', '1,000,000-row intermediate results'],
            },
          ]}
          caption={
            <>
              <a
                href="https://learn.microsoft.com/power-bi/connect-data/desktop-directquery-about"
                target="_blank"
                rel="noopener"
                className="underline underline-offset-2"
              >
                Microsoft Learn, DirectQuery in Power BI
              </a>{' '}
              (opened 11 Nov 2026)
            </>
          }
        />
      )
    case 'chart-choice':
      return (
        <CompareTable
          label="Question first, then chart"
          corner="The question"
          columns={[{ name: 'Chart' }, { name: 'Why' }]}
          rows={[
            {
              label: 'How did it change over time?',
              cells: ['Line', 'Shows the shape of a trend'],
            },
            {
              label: 'Which category is biggest?',
              cells: ['Bar, sorted', 'Lengths are easy to compare'],
            },
            {
              label: 'Do two numbers move together?',
              cells: ['Scatter', 'Shows correlation and clusters'],
            },
            {
              label: 'What is the exact value?',
              cells: ['Table', 'People read numbers, not shapes'],
            },
          ]}
          caption={
            <>
              Based on{' '}
              <a
                href="https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualizations-overview"
                target="_blank"
                rel="noopener"
                className="underline underline-offset-2"
              >
                Microsoft Learn, Overview of visualizations in Power BI
              </a>{' '}
              (opened 11 Nov 2026)
            </>
          }
        />
      )
    case 'skew': {
      const vals = [4, 5, 5, 6, 6, 7, 7, 8, 60]
      const mean = vals.reduce((a, b) => a + b, 0) / vals.length
      const sorted = [...vals].sort((a, b) => a - b)
      const median = sorted[Math.floor(sorted.length / 2)]
      return (
        <Figure
          label="Worked example · 9 fictional salaries"
          title={`One ₹60 LPA salary pulls the mean to ₹${mean} LPA; the median stays at ₹${median} LPA`}
          table={{
            head: ['Person', 'Salary (₹ LPA)'],
            rows: vals.map((v, i) => [`Person ${i + 1}`, v]),
          }}
          note={`Mean = ${vals.reduce((a, b) => a + b, 0)} ÷ ${vals.length} = ${mean}. Median = the 5th of 9 sorted values = ${median}.`}
        >
          <BarList
            emphasis
            sort={false}
            format={{ prefix: '₹', suffix: ' LPA' }}
            rows={vals.map((v, i) => ({ label: `Person ${i + 1}`, value: v, highlight: v > 30 }))}
          />
        </Figure>
      )
    }
    case 'simpson':
      return (
        <Figure
          label="Worked example · 2,000 fictional users"
          title="Version B converts better on mobile and on desktop, but worse overall"
          legend={[
            { label: 'Version A', color: SERIES[0] },
            { label: 'Version B', color: SERIES[1] },
          ]}
          table={{
            head: ['Segment', 'A conversion %', 'B conversion %'],
            rows: [
              ['Mobile', 5.0, 5.6],
              ['Desktop', 15.0, 17.5],
              ['Overall', 11.0, 8.0],
            ],
          }}
          note="B’s users were 80% mobile; A’s were 40% mobile. Mobile converts less for both versions, so the mix decides the overall number."
        >
          <ColumnChart
            format={{ suffix: '%', decimals: 1 }}
            groups={[
              { label: 'Mobile', values: [5.0, 5.6] },
              { label: 'Desktop', values: [15.0, 17.5] },
              { label: 'Overall', values: [11.0, 8.0] },
            ]}
          />
        </Figure>
      )
    case 'funnel': {
      const steps = [
        { label: 'Visited', value: 10000 },
        { label: 'Signed up', value: 1200 },
        { label: 'Activated', value: 600 },
        { label: 'Paid', value: 150 },
      ]
      return (
        <Figure
          label="Worked example · fictional funnel"
          title="1.5% of visitors pay; compare each step with a benchmark before choosing where to dig"
          table={{
            head: ['Step', 'Users', '% of previous'],
            rows: steps.map((s, i) => [
              s.label,
              s.value,
              i === 0 ? '—' : `${Math.round((s.value / steps[i - 1].value) * 1000) / 10}%`,
            ]),
          }}
        >
          <BarList
            sort={false}
            rows={steps.map((s, i) => ({
              label: s.label,
              value: s.value,
              display:
                i === 0
                  ? s.value.toLocaleString('en-IN')
                  : `${s.value.toLocaleString('en-IN')} (${Math.round((s.value / steps[i - 1].value) * 100)}%)`,
            }))}
          />
        </Figure>
      )
    }
    default:
      return null
  }
}

function ConceptCard({
  c,
  n,
  slug,
  hub,
  lookup,
}: {
  c: Concept
  n: number
  slug: string
  hub: RoleHub
  lookup: (g: string, i: number) => HubQuestion | undefined
}) {
  const ex = c.example
  const asked = c.askedIn
    .map((r) => ({ r, q: lookup(r.group, r.i) }))
    .filter((x): x is { r: typeof x.r; q: HubQuestion } => Boolean(x.q))
  return (
    <article
      id={`c-${c.id}`}
      aria-labelledby={`c-${c.id}-t`}
      className="scroll-mt-36 rounded-2xl border border-border bg-surface p-5 md:p-7"
    >
      <header>
        <div className={`${kicker} text-fg-3`}>
          Concept {String(n).padStart(2, '0')} · asked in {asked.length} question
          {asked.length === 1 ? '' : 's'} on our {hub.shortName} page
        </div>
        <h3 id={`c-${c.id}-t`} className="mt-2 text-h3 font-semibold text-fg">
          {c.name}
        </h3>
        <p className="mt-3 max-w-[68ch] text-body-lg leading-relaxed text-fg">{c.definition}</p>
      </header>

      <div className="mt-5 max-w-[68ch] text-small leading-relaxed text-fg-2">
        <span className="font-semibold text-fg">What the interviewer listens for: </span>
        {c.listensFor}
      </div>

      <div className="mt-6 rounded-xl bg-muted/60 p-4 md:p-5">
        <div className={`${kicker} text-signal-strong`}>Worked example</div>
        <p className="mt-2 text-small text-fg-2">{ex.setup}</p>
        {(ex.inputs?.length || ex.code || ex.result) && (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {ex.inputs?.map((t) => <Table key={t.caption} {...t} />)}
            {ex.code && <Code {...ex.code} />}
            {ex.result && <Table {...ex.result} />}
          </div>
        )}
        <p className="mt-4 text-small leading-relaxed text-fg">
          <span className="font-semibold">Notice: </span>
          {ex.takeaway}
        </p>
      </div>

      {c.visual && (
        <div className="mt-2">
          <ConceptVisual c={c} />
        </div>
      )}

      <div className="mt-5 flex gap-3 rounded-xl bg-warn-soft p-4 text-small ring-1 ring-inset ring-warn/20">
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="mt-0.5 h-5 w-5 shrink-0 text-warn"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
        >
          <path d="M10 3 2.5 16.5h15L10 3Z" strokeLinejoin="round" />
          <path d="M10 8v4M10 14.2v.3" strokeLinecap="round" />
        </svg>
        <p className="leading-relaxed text-fg-2">
          <span className="font-semibold text-fg">The trap: </span>
          {c.trap}
        </p>
      </div>

      {c.fromSource && (
        <blockquote className="mt-5 border-t border-border pt-4">
          <p className="font-serif text-body-lg italic leading-relaxed text-fg">
            “{c.fromSource.quote}”
          </p>
          <footer className="mt-1.5 text-caption text-fg-3">
            <a
              href={c.fromSource.source.url}
              target="_blank"
              rel="noopener"
              className="underline decoration-border-strong underline-offset-2 hover:text-fg"
            >
              {c.fromSource.source.label}
            </a>{' '}
            · opened 11 Nov 2026
          </footer>
        </blockquote>
      )}

      {asked.length > 0 && (
        <details className="group mt-5 rounded-xl border border-border bg-surface" open={n <= 2}>
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-small font-semibold text-fg [&::-webkit-details-marker]:hidden">
            <span>
              Where it was asked ({asked.filter((a) => a.q.source).length} reported,{' '}
              {asked.filter((a) => !a.q.source).length} practice)
            </span>
            <span
              aria-hidden="true"
              className="font-mono text-fg-3 transition-transform duration-base group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <ul className="divide-y divide-border border-t border-border">
            {asked.map(({ r, q }) => (
              <li key={`${r.group}:${r.i}`} className="px-4 py-3 text-small leading-relaxed">
                <span className="text-fg">{q.q}</span>
                <span className="mt-1 block text-caption text-fg-3">
                  {q.source?.url ? (
                    <>
                      Reported on{' '}
                      <a
                        href={q.source.url}
                        target="_blank"
                        rel="noopener nofollow"
                        className="underline underline-offset-2 hover:text-fg"
                      >
                        {q.source.label}
                      </a>
                      {q.reportedAt ? ` · ${q.reportedAt}` : ''} ·{' '}
                    </>
                  ) : (
                    'Practice question we wrote · '
                  )}
                  <Link href={`/${slug}#q-${r.group}`} className={link}>
                    Model answer and what they listen for
                  </Link>
                </span>
              </li>
            ))}
          </ul>
        </details>
      )}

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <ExplainTick slug={slug} id={c.id} />
        {c.learn && (
          <div className="text-caption text-fg-3">
            Go deeper:{' '}
            {c.learn.map((l, i) => (
              <span key={l.href}>
                {i > 0 && ' · '}
                {l.href.startsWith('/') ? (
                  <Link href={l.href} className={link}>
                    {l.label}
                  </Link>
                ) : (
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener"
                    className="underline underline-offset-2 hover:text-fg"
                  >
                    {l.label}
                  </a>
                )}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

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

export default function ConceptsPage({ hub, c }: { hub: RoleHub; c: RoleConcepts }) {
  const st = conceptStats(hub, c)
  const url = `${SITE}/${hub.slug}/concepts`
  const names = Object.fromEntries(c.concepts.map((k) => [k.id, k.short]))
  const top = [...st.perConcept].sort((a, b) => b.n - a.n)
  const groupCounts = c.groups.map((g) => ({
    ...g,
    concepts: c.concepts.filter((k) => k.group === g.id),
  }))
  let n = 0

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: c.h1,
      description: c.metaDescription,
      url,
      dateModified: c.lastUpdated,
      about: { '@type': 'Occupation', name: hub.roleName },
      publisher: { '@type': 'Organization', name: 'Auto Interview AI', url: SITE },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'DefinedTermSet',
      name: `${hub.roleName} interview concepts`,
      url,
      hasDefinedTerm: c.concepts.map((k) => ({
        '@type': 'DefinedTerm',
        name: k.name,
        description: k.definition,
        url: `${url}#c-${k.id}`,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
        { '@type': 'ListItem', position: 2, name: hub.roleName, item: `${SITE}/${hub.slug}` },
        { '@type': 'ListItem', position: 3, name: 'Concepts', item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: c.faqs.map((f) => ({
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
            <span className="text-fg-2">Concepts</span>
          </nav>
          <header className="mt-8 max-w-3xl">
            <div className={`${kicker} text-signal-strong`}>
              {c.kicker} · Updated {fmtDate(c.lastUpdated)}
            </div>
            <h1 className="mt-4 font-serif text-h1 font-medium text-fg md:text-display">{c.h1}</h1>
            <div className="mt-6 rounded-xl bg-signal-tint p-5 ring-1 ring-inset ring-signal/15">
              <div className={`${kicker} text-signal-ink`}>The short answer</div>
              <p className="speakable-direct-answer mt-2 text-body leading-relaxed text-fg md:text-body-lg">
                {c.directAnswer}
              </p>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#quiz"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-signal px-5 text-small font-semibold text-white shadow-e1 transition-colors duration-fast hover:bg-signal-strong"
              >
                Take the {c.quiz.length}-question quiz <ArrowRightIcon />
              </a>
              <Link
                href={`/${hub.slug}#questions`}
                className="inline-flex h-11 items-center rounded-full bg-surface px-5 text-small font-semibold text-fg ring-1 ring-inset ring-border-strong hover:bg-muted"
              >
                {st.totalQ} {hub.shortName} questions with answers
              </Link>
            </div>
          </header>
          <div className="mt-8">
            <KitStrip hub={hub} current="concepts" />
          </div>
        </div>

        <div className={container}>
          <StatRow
            stats={[
              {
                label: 'Concepts on this page',
                value: String(c.concepts.length),
                sub: `${c.groups.length} areas: ${c.groups.map((g) => g.label).join(', ')}`,
              },
              {
                label: 'Interview questions they cover',
                value: `${st.linked} of ${st.totalQ}`,
                sub: `on our ${hub.shortName} page; the other ${st.totalQ - st.linked} test how you communicate`,
              },
              {
                label: 'Of those, reported by candidates',
                value: String(st.linkedReported),
                sub: 'Glassdoor, AmbitionBox, LeetCode Discuss, aced.io',
              },
              {
                label: 'Self-check quiz',
                value: `${c.quiz.length} questions`,
                sub: 'No login. Answers explained.',
              },
            ]}
          />

          <Figure
            label={`Question map · ${st.totalQ} questions on our ${hub.shortName} page`}
            title={`${names[top[0].id]} show up most: in ${top[0].n} of the ${st.totalQ} questions`}
            sub={`How many questions on our ${hub.shortName} page test each concept. One question can test several concepts. Tap a concept to jump to it.`}
            source={[
              { label: `Our ${hub.shortName} question bank`, url: `/${hub.slug}#questions` },
            ]}
            updated={`Counted from the page data, ${fmtDate(c.lastUpdated)}`}
            table={{
              head: ['Concept', 'Questions', 'Reported by candidates'],
              rows: top.map((p) => [names[p.id], p.n, p.reported]),
            }}
          >
            <BarList
              rows={st.perConcept.map((p) => ({
                label: names[p.id],
                value: p.n,
                href: `#c-${p.id}`,
                note: `${p.reported} reported`,
              }))}
            />
          </Figure>

          <nav
            aria-label="On this page"
            className="sticky top-16 z-20 -mx-5 border-b border-border bg-bg/95 px-5 py-2 md:-mx-8 md:px-8"
          >
            <ol className="flex gap-2 overflow-x-auto">
              {c.groups.map((g) => (
                <li key={g.id} className="shrink-0">
                  <a
                    href={`#g-${g.id}`}
                    className="inline-flex h-9 items-center rounded-full px-3 text-small text-fg-2 ring-1 ring-inset ring-border hover:text-fg"
                  >
                    {g.label}
                  </a>
                </li>
              ))}
              <li className="shrink-0">
                <a
                  href="#quiz"
                  className="inline-flex h-9 items-center rounded-full px-3 text-small text-fg-2 ring-1 ring-inset ring-border hover:text-fg"
                >
                  Quiz
                </a>
              </li>
            </ol>
          </nav>

          <div className="mt-8 max-w-md">
            <ExplainProgress slug={hub.slug} total={c.concepts.length} />
          </div>

          {groupCounts.map((g) => (
            <Section
              key={g.id}
              id={`g-${g.id}`}
              meta={`${g.label} · ${g.concepts.length} concept${g.concepts.length === 1 ? '' : 's'}`}
              title={`${g.label} concepts to know`}
              intro={g.blurb}
            >
              {g.concepts.map((k) => {
                n += 1
                return (
                  <ConceptCard
                    key={k.id}
                    c={k}
                    n={n}
                    slug={hub.slug}
                    hub={hub}
                    lookup={st.lookup}
                  />
                )
              })}
            </Section>
          ))}

          <Section
            id="quiz"
            meta={`Self-check · ${c.quiz.length} questions · no login`}
            title="Check yourself before the interview"
            intro="Pick an answer to see why it is right or wrong. Your score stays on this page; nothing is sent anywhere."
          >
            <Quiz items={c.quiz} conceptNames={names} />
          </Section>

          <Section id="next" meta="Next step" title="Now say it out loud">
            <Insight title="Knowing a concept is not the same as explaining it">
              Interviewers score the explanation: the definition, the example and the edge case, in
              that order. Answer the linked questions out loud first, then read the model answers.
            </Insight>
            <div className="grid gap-3 md:grid-cols-3">
              {[
                {
                  href: `/${hub.slug}#questions`,
                  label: `${st.totalQ} ${hub.shortName} interview questions with model answers`,
                },
                {
                  href: '/free-mock-interview',
                  label: 'Practise out loud in a free AI mock interview',
                },
                {
                  href: '/learn-ai/ai-for-data-analysis',
                  label: 'Use AI for analysis, and catch its mistakes',
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
              {c.faqs.map((f, i) => (
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
