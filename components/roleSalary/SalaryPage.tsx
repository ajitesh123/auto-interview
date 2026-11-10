import Link from 'next/link'
import type { ReactNode } from 'react'
import type { RoleHub } from '@/data/roleHubs'
import { ROLE_KITS, KIT_PATHS } from '@/data/roleKits'
import { ROLE_SALARY_LIST, type RoleSalary, type PayPost } from '@/data/roleSalary'
import { computeSalary, DEFAULT_INPUTS, inr } from '@/data/indiaTax'
import OfferCheck from './OfferCheck'
import { Figure, BarList, RangeList } from '@/components/viz'

const container = 'mx-auto w-full max-w-[1200px] px-5 md:px-8'
const kicker = 'font-mono text-kicker uppercase tracking-[0.08em]'
const link =
  'font-medium text-signal-strong underline decoration-signal/30 underline-offset-2 hover:decoration-signal'

const fmtDate = (d: string) =>
  new Date(d + 'T00:00:00Z').toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })

/* ---------- stats ---------- */

const an = (w: string) => `${/^[AEIOU]/i.test(w) ? 'an' : 'a'} ${w}`
const mid = (p: PayPost) => (p.min + p.max) / 2
function median(xs: number[]) {
  if (!xs.length) return 0
  const s = [...xs].sort((a, b) => a - b)
  const m = Math.floor(s.length / 2)
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2
}
const round1 = (n: number) => Math.round(Number((n * 10).toPrecision(12))) / 10
const fmt = (region: 'india' | 'us', n: number) =>
  region === 'india' ? `₹${round1(n)} LPA` : `$${Math.round(n)}K`

export function salaryStats(posts: PayPost[]) {
  return {
    n: posts.length,
    median: median(posts.map(mid)),
    low: Math.min(...posts.map((p) => p.min)),
    high: Math.max(...posts.map((p) => p.max)),
    equity: posts.filter((p) => p.equity === 'yes').length,
  }
}

/** Monthly in-hand for an India CTC in lakh, on the calculator's defaults (new regime). */
const inHand = (lakhPa: number) =>
  computeSalary({ ...DEFAULT_INPUTS, ctc: Math.round(lakhPa * 100000) }).monthlyInHand

const BANDS = [
  { label: '0–1 yrs asked', test: (y: number) => y <= 1 },
  { label: '2–3 yrs asked', test: (y: number) => y >= 2 && y <= 3 },
  { label: '4+ yrs asked', test: (y: number) => y >= 4 },
]

/* ---------- pieces ---------- */

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
      className="scroll-mt-32 border-t border-border py-14 md:py-20"
    >
      <header className="max-w-2xl">
        <div className={`${kicker} text-signal-strong`}>{meta}</div>
        <h2 id={`${id}-t`} className="mt-3 text-h2 font-semibold text-fg">
          {title}
        </h2>
        {intro && <p className="mt-3 text-body-lg text-fg-2">{intro}</p>}
      </header>
      <div className="mt-8 space-y-8">{children}</div>
    </section>
  )
}

function Table({
  label,
  caption,
  head,
  rows,
  min = 'min-w-[720px]',
}: {
  label: string
  caption: ReactNode
  head: string[]
  rows: ReactNode[][]
  min?: string
}) {
  return (
    <figure>
      <div
        role="region"
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        aria-label={label}
        className="overflow-x-auto rounded-xl border border-border bg-surface"
      >
        <table className={`w-full ${min} text-left text-small tabular-nums`}>
          <thead className="bg-muted text-fg-2">
            <tr>
              {head.map((h, i) => (
                <th
                  key={h}
                  scope="col"
                  className={`px-4 py-3 font-medium ${i === 0 ? 'sticky left-0 bg-muted' : ''}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((r, ri) => (
              <tr key={ri}>
                {r.map((c, ci) =>
                  ci === 0 ? (
                    <th
                      key={ci}
                      scope="row"
                      className="sticky left-0 max-w-[180px] bg-surface px-4 py-3 align-top font-medium text-fg"
                    >
                      {c}
                    </th>
                  ) : (
                    <td key={ci} className="px-4 py-3 align-top text-fg-2">
                      {c}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-2 flex justify-between gap-4 text-caption text-fg-3">
        <span>{caption}</span>
        <span className="shrink-0 md:hidden">Swipe →</span>
      </figcaption>
    </figure>
  )
}

function PostCell({ p }: { p: PayPost }) {
  return (
    <>
      <a href={p.url} target="_blank" rel="noopener nofollow" className={link}>
        {p.company}
      </a>
      <span className="mt-0.5 block text-caption font-normal text-fg-3">{p.title}</span>
    </>
  )
}

function PostTable({ s, region }: { s: RoleSalary; region: 'india' | 'us' }) {
  const posts = [...(region === 'india' ? s.india : s.us)].sort((a, b) => mid(b) - mid(a))
  const head =
    region === 'india'
      ? ['Company and role', 'Pay as posted', 'In hand / month', 'Experience', 'City', 'Equity']
      : ['Company and role', 'Pay as posted', 'Experience', 'Location', 'Equity']
  return (
    <Table
      label={`${s.roleName} posted pay, ${region === 'india' ? 'India' : 'United States'}`}
      caption={
        <>
          {posts.length} posts, opened {fmtDate(s.checked)}. Sorted by midpoint.
          {region === 'india' &&
            ' In hand: new regime, 50% basic, PF on the ₹25,000 ceiling, gratuity in CTC.'}
          {region === 'us' && ' Base pay before equity and bonus unless noted.'}
        </>
      }
      head={head}
      rows={posts.map((p) => {
        const notes = [p.note, p.status].filter(Boolean).join(' · ')
        const pay = (
          <>
            <span className="font-semibold text-fg">{p.stated}</span>
            {notes && <span className="mt-0.5 block text-caption text-fg-3">{notes}</span>}
          </>
        )
        const eq = p.equity === 'yes' ? 'Yes' : p.equity === 'no' ? 'No' : 'Not stated'
        return region === 'india'
          ? [
              <PostCell key="c" p={p} />,
              pay,
              (p.fixedMin ?? p.min) === (p.fixedMax ?? p.max)
                ? inr(inHand(p.fixedMin ?? p.min))
                : `${inr(inHand(p.fixedMin ?? p.min))}–${inr(inHand(p.fixedMax ?? p.max))}${p.fixedMin ? ' (fixed only)' : ''}`,
              p.experience,
              p.location,
              eq,
            ]
          : [<PostCell key="c" p={p} />, pay, p.experience, p.location, eq]
      })}
    />
  )
}

/* ---------- charts (components/viz) ---------- */

const numFmt = (region: 'india' | 'us') =>
  region === 'india' ? { prefix: '₹', suffix: ' LPA' } : { prefix: '$', suffix: 'K' }
const rangeLabel = (region: 'india' | 'us', lo: number, hi: number) => {
  const a = region === 'india' ? round1(lo) : Math.round(lo)
  const b = region === 'india' ? round1(hi) : Math.round(hi)
  const body = a === b ? `${a}` : `${a}–${b}`
  return region === 'india' ? `₹${body} LPA` : `$${body}K`
}

/** Every posted range on one scale, highest midpoint first, with the median marked. */
function OffersChart({ s, region }: { s: RoleSalary; region: 'india' | 'us' }) {
  const posts = [...(region === 'india' ? s.india : s.us)].sort((a, b) => mid(b) - mid(a))
  if (posts.length < 4) return null
  const st = salaryStats(posts)
  const place = region === 'india' ? 'India' : 'the US'
  return (
    <Figure
      label={`Posted pay · ${posts.length} job posts · ${place}`}
      title={`The middle posted ${s.roleName} offer in ${place} is ${fmt(region, st.median)}`}
      sub={`Each bar is one job post's stated range${region === 'us' ? ' (base pay)' : ''}, highest first. Hover or tap a row for the pay as written.`}
      legend={[
        { label: 'Posted range', kind: 'bar', color: '#94A8FF' },
        { label: 'Median midpoint of all posts', kind: 'rule', color: '#737373' },
      ]}
      source={`${posts.length} job posts, linked in the table below`}
      updated={`Opened ${fmtDate(s.checked)}`}
    >
      <RangeList
        format={numFmt(region)}
        rule={{ value: st.median, label: 'Median midpoint' }}
        rows={posts.map((p) => ({
          label: p.company,
          sub: `${p.experience} · ${p.location}`,
          min: p.min,
          max: p.max,
          display: rangeLabel(region, p.min, p.max),
          note: `${p.title}: ${p.stated}${p.note ? ` (${p.note})` : ''}`,
          href: p.url,
        }))}
      />
    </Figure>
  )
}

/** Self-reported pay by city: middle half as a band, median and entry-level median as dots. */
function CityChart({ s }: { s: RoleSalary }) {
  const c = s.cities
  if (!c) return null
  const rows = c.rows
    .filter((r) => r.all || r.entry)
    .sort(
      (a, b) => (b.all?.median ?? b.entry?.median ?? 0) - (a.all?.median ?? a.entry?.median ?? 0)
    )
  if (rows.length < 3) return null
  const hasEntry = rows.some((r) => r.entry)
  const topRow = rows.find((r) => r.all)
  return (
    <Figure
      label={`Self-reported pay · ${rows.length} cities · India`}
      title={
        topRow?.all
          ? `${topRow.city} has the highest median: ₹${topRow.all.median} lakh a year`
          : `${s.roleName} pay by city`
      }
      sub="Total pay per year as people reported it. The band is the middle half of salaries in that city."
      legend={[
        { label: 'Middle half (25th to 75th percentile)', kind: 'bar', color: '#94A8FF' },
        { label: 'Median, all levels', kind: 'dot', color: '#141D52' },
        ...(hasEntry
          ? [{ label: 'Entry-level median', kind: 'ring' as const, color: '#3B5BFF' }]
          : []),
      ]}
      source={[
        {
          label: 'Levels.fyi city pages, linked in the table below',
          url: 'https://www.levels.fyi/',
        },
      ]}
      updated={`Checked ${fmtDate(s.checked)}`}
    >
      <RangeList
        format={{ prefix: '₹', suffix: 'L' }}
        rows={rows.map((r) => ({
          label: r.city,
          sub: r.all
            ? `${r.all.n} salaries`
            : r.entry
              ? `${r.entry.n} entry-level salaries`
              : undefined,
          min: r.all?.p25 ?? r.entry?.median ?? 0,
          max: r.all?.p75 ?? r.entry?.median ?? 0,
          mid: r.all?.median,
          mark: r.entry?.median,
          display: r.all ? `₹${r.all.median} lakh` : `₹${r.entry?.median} lakh (entry)`,
          note: r.all
            ? `Median ₹${r.all.median} lakh; middle half ₹${r.all.p25}–${r.all.p75} lakh${r.entry ? `; entry-level median ₹${r.entry.median} lakh` : ''}`
            : undefined,
        }))}
      />
    </Figure>
  )
}

/** Self-reported median total pay by employer, ranked. */
function CompanyChart({ s }: { s: RoleSalary }) {
  const c = s.companies
  if (!c || c.rows.length < 4) return null
  const rows = [...c.rows].sort((a, b) => b.median - a.median)
  const lakh = (n: number) => (n >= 100 ? `₹${(n / 100).toFixed(2)} Cr` : `₹${round1(n)} lakh`)
  return (
    <Figure
      label={`Self-reported pay · ${rows.length} employers · India`}
      title={`${rows[0].company} pays the most at the median: ${lakh(rows[0].median)} a year`}
      sub="Median total pay per year in India, as reported by employees."
      source={[
        {
          label: 'Levels.fyi company pages, linked in the table below',
          url: 'https://www.levels.fyi/',
        },
      ]}
      updated={`Checked ${fmtDate(s.checked)}`}
    >
      <BarList
        rows={rows.map((r) => ({
          label: r.company,
          value: r.median,
          display: lakh(r.median),
          href: r.url,
          note: r.entryLevel
            ? `Entry level ${r.entryLevel}${r.entryTc !== undefined ? `: ${lakh(r.entryTc)}` : ''}`
            : undefined,
        }))}
      />
    </Figure>
  )
}

function StatTiles({ s, region }: { s: RoleSalary; region: 'india' | 'us' }) {
  const posts = region === 'india' ? s.india : s.us
  const st = salaryStats(posts)
  const tiles: [string, string, string][] = [
    ['Posts with stated pay', String(st.n), `Opened ${fmtDate(s.checked)}`],
    ['Median midpoint', fmt(region, st.median), 'Middle of each posted range'],
    ['Lowest to highest', rangeLabel(region, st.low, st.high), 'Across all posts'],
    ['Mention equity', `${st.equity} of ${st.n}`, 'ESOPs, RSUs or options'],
  ]
  if (region === 'india')
    tiles[3] = ['Median in hand', `${inr(inHand(st.median))}/mo`, 'At the median CTC, new regime']
  return (
    <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {tiles.map(([k, v, sub]) => (
        <div key={k} className="rounded-xl border border-border bg-surface p-4 md:p-5">
          <dt className="text-small text-fg-2">{k}</dt>
          <dd className="mt-1 text-h3 font-semibold tabular-nums text-fg md:text-h2">{v}</dd>
          <dd className="mt-1 text-caption text-fg-3">{sub}</dd>
        </div>
      ))}
    </dl>
  )
}

function ExperienceSplit({ s, region }: { s: RoleSalary; region: 'india' | 'us' }) {
  const posts = (region === 'india' ? s.india : s.us).filter((p) => p.minYears !== undefined)
  const rows = BANDS.map((b) => {
    const ps = posts.filter((p) => b.test(p.minYears as number))
    return { b, ps }
  }).filter((r) => r.ps.length >= 2)
  if (rows.length < 2) return null
  const meds = rows.map(({ ps }) => median(ps.map(mid)))
  const first = meds[0]
  const last = meds[meds.length - 1]
  return (
    <Figure
      label={`Posted pay by experience asked · ${posts.length} posts`}
      title={
        last > first
          ? `Posts asking ${rows[rows.length - 1].b.label.replace(' asked', '')} pay ${round1(last / first)}× the ${rows[0].b.label.replace(' asked', '')} median`
          : 'Posted pay by the experience each post asks for'
      }
      sub="Grouped by the minimum years each post asks for. Small samples: read as a direction, not a band."
      legend={[
        { label: 'Lowest to highest posted', kind: 'bar', color: '#94A8FF' },
        { label: 'Median midpoint', kind: 'dot', color: '#141D52' },
      ]}
      source="The job posts in the table above"
      updated={`Opened ${fmtDate(s.checked)}`}
      table={{
        head:
          region === 'india'
            ? ['Experience asked', 'Posts', 'Median midpoint', 'In hand / month']
            : ['Experience asked', 'Posts', 'Median midpoint'],
        rows: rows.map(({ b, ps }, i) => {
          const base = [b.label, String(ps.length), fmt(region, meds[i])]
          return region === 'india' ? [...base, inr(inHand(meds[i]))] : base
        }),
      }}
    >
      <RangeList
        format={numFmt(region)}
        rows={rows.map(({ b, ps }, i) => ({
          label: b.label,
          sub: `${ps.length} posts`,
          min: Math.min(...ps.map((p) => p.min)),
          max: Math.max(...ps.map((p) => p.max)),
          mid: meds[i],
          display: fmt(region, meds[i]),
          note: `Posted ranges run ${rangeLabel(region, Math.min(...ps.map((p) => p.min)), Math.max(...ps.map((p) => p.max)))}`,
        }))}
      />
    </Figure>
  )
}

function CompanyTable({ s }: { s: RoleSalary }) {
  const c = s.companies
  if (!c) return null
  const rows = [...c.rows].sort((a, b) => b.median - a.median)
  const lakh = (n: number) => (n >= 100 ? `₹${(n / 100).toFixed(2)} Cr` : `₹${n.toFixed(1)} lakh`)
  return (
    <Table
      label={c.title}
      min="min-w-[560px]"
      caption={
        <>
          {c.note}{' '}
          <a href="https://www.levels.fyi/" target="_blank" rel="noopener" className={link}>
            Levels.fyi
          </a>
        </>
      }
      head={['Company', 'Median total pay, India', 'Entry level', 'Entry level pay']}
      rows={rows.map((r) => [
        <a key="c" href={r.url} target="_blank" rel="noopener" className={link}>
          {r.company}
        </a>,
        <span key="m" className="font-semibold text-fg">
          {lakh(r.median)}
        </span>,
        r.entryLevel ?? '—',
        r.entryTc !== undefined ? lakh(r.entryTc) : '—',
      ])}
    />
  )
}

const LOOKUP = [3, 4, 5, 6, 8, 10, 12, 15, 20, 25]

function MonthlyLookup() {
  return (
    <Table
      label="CTC to monthly in-hand pay, India"
      min="min-w-0"
      caption="2026-27 new regime, 50% basic, PF on the ₹25,000 ceiling, gratuity inside CTC, no variable pay."
      head={['CTC a year', 'In hand a month']}
      rows={LOOKUP.map((l) => [`₹${l} LPA`, inr(inHand(l))])}
    />
  )
}

function CityTable({ s }: { s: RoleSalary }) {
  const c = s.cities
  if (!c) return null
  const l = (n: number) => `₹${n} lakh`
  return (
    <Table
      label={c.title}
      min="min-w-[640px]"
      caption={c.note}
      head={[
        'City',
        'Median, all levels',
        'Middle half',
        'Entry-level median',
        'In hand if this were CTC',
      ]}
      rows={c.rows.map((r) => [
        r.city,
        r.all ? (
          <a key="m" href={r.all.url} target="_blank" rel="noopener" className={link}>
            {l(r.all.median)}
          </a>
        ) : (
          '—'
        ),
        r.all ? `₹${r.all.p25}–${r.all.p75} lakh (${r.all.n} salaries)` : '—',
        r.entry ? (
          <a key="e" href={r.entry.url} target="_blank" rel="noopener" className={link}>
            {`${l(r.entry.median)} (${r.entry.n})`}
          </a>
        ) : (
          '—'
        ),
        r.all
          ? `${inr(inHand(r.all.median))}/mo`
          : r.entry
            ? `${inr(inHand(r.entry.median))}/mo (entry)`
            : '—',
      ])}
    />
  )
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="max-w-prose space-y-2.5">
      {items.map((t) => (
        <li key={t} className="flex gap-3 text-body text-fg-2">
          <span
            aria-hidden="true"
            className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-signal"
          />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  )
}

/* ---------- page ---------- */

export default function SalaryPage({ hub, s }: { hub: RoleHub; s: RoleSalary }) {
  const url = `https://www.autointerviewai.com/${hub.slug}/salary`
  const regions: ('india' | 'us')[] = (
    s.lead === 'india' ? ['india', 'us'] : ['us', 'india']
  ).filter((r) => (r === 'india' ? s.india : s.us).length > 0) as ('india' | 'us')[]
  const total = s.india.length + s.us.length
  const lead = s.lead
  const ls = salaryStats(lead === 'india' ? s.india : s.us)
  const india = s.india.length ? salaryStats(s.india) : null
  const us = s.us.length ? salaryStats(s.us) : null
  // Self-reported tables only (they carry a median row); the job-post tables are on this page already.
  const levels = hub.pay.tables.filter((t) => t.rows.some((x) => /median/i.test(x.band)))

  const answer =
    lead === 'india'
      ? `${s.india.length} Indian ${s.roleName} job posts that state pay have a median midpoint of ${fmt('india', ls.median)}, about ${inr(inHand(ls.median))} a month in hand. Posted ranges run from ${fmt('india', ls.low)} to ${fmt('india', ls.high)}.`
      : `${s.us.length} US ${s.roleName} job posts that state pay have a median midpoint of ${fmt('us', ls.median)} base, with ranges from ${fmt('us', ls.low)} to ${fmt('us', ls.high)}.${india && india.n >= 4 ? ` In India, ${s.india.length} posts have a median midpoint of ${fmt('india', india.median)} (about ${inr(inHand(india.median))} a month in hand).` : ''}`

  const answerFull = s.answerExtra ? `${answer} ${s.answerExtra}` : answer

  const faqs = [
    india && {
      q: `What is the salary of ${an(s.roleName)} in India?`,
      a: `Across ${india.n} Indian job posts that state pay, the median midpoint is ${fmt('india', india.median)} and ranges run from ${fmt('india', india.low)} to ${fmt('india', india.high)}. Checked ${fmtDate(s.checked)}.`,
    },
    india && {
      q: `What is the in-hand salary of ${an(s.roleName)} in India?`,
      a: `At the median posted CTC of ${fmt('india', india.median)}, about ${inr(inHand(india.median))} a month under the new tax regime, with 50% basic, PF on the ₹25,000 ceiling and gratuity inside the CTC. Use the salary calculator for your own offer.`,
    },
    us && {
      q: `How much does ${an(s.roleName)} make in the US?`,
      a: `Across ${us.n} US job posts with pay ranges, the median midpoint is ${fmt('us', us.median)} base, before equity. ${us.equity} of ${us.n} posts mention equity.`,
    },
    {
      q: `Do ${s.roleName} roles come with equity?`,
      a: `${(india?.equity ?? 0) + (us?.equity ?? 0)} of the ${total} posts we opened mention equity${india ? ` (${india.equity} of ${india.n} in India)` : ''}. Ask for the share count, strike price, vesting and latest valuation before you value it.`,
    },
    ...s.faqs,
  ].filter(Boolean) as { q: string; a: string }[]

  const kit = ROLE_KITS[hub.slug]
  const siblings = ROLE_SALARY_LIST.filter((r) => r.slug !== hub.slug)

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: s.h1,
      description: s.metaDescription,
      url,
      mainEntityOfPage: url,
      datePublished: s.checked,
      dateModified: s.checked,
      author: {
        '@type': 'Person',
        name: 'Ajitesh Abhishek',
        url: 'https://www.autointerviewai.com/about',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Auto Interview AI',
        url: 'https://www.autointerviewai.com',
        parentOrganization: {
          '@type': 'Organization',
          name: 'Tough Tongue AI',
          url: 'https://www.toughtongueai.com',
        },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.autointerviewai.com' },
        {
          '@type': 'ListItem',
          position: 2,
          name: hub.roleName,
          item: `https://www.autointerviewai.com/${hub.slug}`,
        },
        { '@type': 'ListItem', position: 3, name: 'Salary', item: url },
      ],
    },
  ]

  return (
    <div className="bg-bg text-fg">
      {schema.map((x, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(x) }}
        />
      ))}

      <div className={`${container} pb-10 pt-8 md:pb-14 md:pt-12`}>
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
          <span className="text-fg-2">Salary</span>
        </nav>

        <header className="mt-8 max-w-3xl">
          <div className={`${kicker} text-signal-strong`}>
            Salary · {total} job posts opened · Updated {fmtDate(s.checked)}
          </div>
          <h1 className="mt-4 font-serif text-display font-medium text-fg">{s.h1}</h1>
          <p className="mt-5 max-w-[56ch] text-body-lg text-fg-2">{answerFull}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={`#${regions[0]}`}
              className="inline-flex h-11 items-center rounded-full bg-signal px-5 text-small font-semibold text-white shadow-e1 transition-colors duration-fast hover:bg-signal-strong"
            >
              See every posted offer
            </a>
            <Link
              href="/salary-calculator"
              className="inline-flex h-11 items-center rounded-full bg-surface px-5 text-small font-semibold text-fg ring-1 ring-inset ring-border-strong transition-colors duration-fast hover:bg-muted"
            >
              CTC to in-hand calculator
            </Link>
          </div>
        </header>

        <div className="mt-10 max-w-3xl rounded-xl bg-signal-tint p-5 ring-1 ring-inset ring-signal/15">
          <div className={`${kicker} text-signal-ink`}>How we got these numbers</div>
          <p className="mt-2 text-body text-fg">
            Every row is a real job post that states a pay range, opened on {fmtDate(s.checked)} and
            linked. No estimates from salary sites. Closed posts and job-board copies are marked,
            because they still show what employers offered.
            {s.methodNote ? ` ${s.methodNote}` : ''}
          </p>
        </div>

        {s.india.length >= 4 && (
          <div className="mt-6 max-w-3xl">
            <OfferCheck
              roleName={s.roleName}
              mids={s.india.map(mid)}
              cities={s.cities?.rows.map((r) => ({
                city: r.city,
                all: r.all ? { median: r.all.median, p25: r.all.p25, p75: r.all.p75 } : undefined,
                entry: r.entry?.median,
              }))}
            />
          </div>
        )}
      </div>

      <nav aria-label="On this page" className="sticky top-16 z-40 border-y border-border bg-bg/95">
        <div className={`${container} flex gap-1 overflow-x-auto py-2`}>
          {[
            ...regions.map((r) => ({ id: r, label: r === 'india' ? 'India' : 'United States' })),
            ...(s.cities ? [{ id: 'cities', label: 'By city' }] : []),
            ...(s.companies ? [{ id: 'companies', label: 'By company' }] : []),
            { id: 'patterns', label: 'What the posts show' },
            { id: 'negotiate', label: 'Negotiate' },
            { id: 'faq', label: 'FAQ' },
          ].map((x) => (
            <a
              key={x.id}
              href={`#${x.id}`}
              className="inline-flex h-9 shrink-0 items-center rounded-full px-3 text-small text-fg-2 hover:bg-muted hover:text-fg"
            >
              {x.label}
            </a>
          ))}
        </div>
      </nav>

      <div className={container}>
        {regions.map((r) => (
          <Section
            key={r}
            id={r}
            meta={`${r === 'india' ? 'India' : 'United States'} · ${(r === 'india' ? s.india : s.us).length} posts`}
            title={`${s.roleName} pay in ${r === 'india' ? 'India' : 'the US'}, post by post`}
            intro={
              r === 'india'
                ? 'Each CTC is converted to monthly in-hand pay on 2026-27 tax rules, so you can compare offers the way your bank account will.'
                : 'US pay-transparency laws make employers publish base ranges. Equity and bonus come on top.'
            }
          >
            <StatTiles s={s} region={r} />
            <OffersChart s={s} region={r} />
            <PostTable s={s} region={r} />
            <ExperienceSplit s={s} region={r} />
            {r === 'india' && <MonthlyLookup />}
          </Section>
        ))}

        {s.cities && (
          <Section
            id="cities"
            meta={`Levels.fyi · ${s.cities.rows.length} cities`}
            title={s.cities.title}
            intro={s.cities.intro}
          >
            <CityChart s={s} />
            <CityTable s={s} />
          </Section>
        )}

        {s.companies && (
          <Section
            id="companies"
            meta={`Big employers · ${s.companies.rows.length} companies`}
            title={s.companies.title}
            intro={s.companies.intro}
          >
            <CompanyChart s={s} />
            <CompanyTable s={s} />
          </Section>
        )}

        <Section
          id="patterns"
          meta={`${total} posts read`}
          title="What the posts show"
          intro="Patterns we saw across the posts above. Each one comes from the rows, not from a survey."
        >
          <Bullets items={s.patterns} />
          {levels.length > 0 && (
            <div className="rounded-xl border border-border bg-surface p-5 md:p-6">
              <h3 className="text-h4 font-semibold text-fg">Cross-check with self-reported pay</h3>
              <p className="mt-1 max-w-prose text-small text-fg-2">
                Job posts show what employers offer; self-reported data shows what people say they
                earn. The {hub.shortName} guide has both:
              </p>
              <ul className="mt-3 space-y-1.5 text-small text-fg-2">
                {levels.slice(0, 3).map((t) => {
                  const m = t.rows.find((x) => /median/i.test(x.band))
                  return (
                    <li key={t.region}>
                      <span className="font-medium text-fg">{t.region}:</span>{' '}
                      {m ? `median ${m.value}` : `${t.rows.length} rows`} ·{' '}
                      <a href={t.sourceUrl} target="_blank" rel="noopener" className={link}>
                        {t.sourceLabel}
                      </a>
                    </li>
                  )
                })}
              </ul>
              <Link href={`/${hub.slug}#pay`} className={`mt-3 inline-block text-small ${link}`}>
                See the full pay section in the {hub.shortName} guide
              </Link>
            </div>
          )}
        </Section>

        <Section
          id="negotiate"
          meta={`${s.negotiate.length} moves`}
          title={`How to negotiate ${an(s.roleName)} offer`}
          intro="What to ask for before you sign, based on how these posts are written."
        >
          <Bullets items={s.negotiate} />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ['/salary-calculator', 'Tool', 'Compare two offers in hand'],
              [`/${hub.slug}`, 'Role guide', `Crack the ${hub.shortName} interview`],
              kit
                ? [KIT_PATHS.resume(hub.slug), 'Resume (CV)', `${hub.shortName} resume template`]
                : null,
              ...siblings.map((x) => [`/${x.slug}/salary`, 'Salary', `${x.roleName} salary`]),
            ]
              .filter(Boolean)
              .map((x) => {
                const [href, k, t] = x as string[]
                return (
                  <Link
                    key={href}
                    href={href}
                    className="rounded-xl border border-border bg-surface px-5 py-4 transition-[border-color,box-shadow] duration-fast hover:border-border-strong hover:shadow-e2"
                  >
                    <span className={`block ${kicker} text-fg-3`}>Up next · {k}</span>
                    <span className="mt-1 block text-h4 font-semibold text-fg">{t}</span>
                  </Link>
                )
              })}
          </div>
        </Section>

        <Section id="faq" meta={`FAQ · ${faqs.length} questions`} title="Quick answers">
          <div className="max-w-3xl space-y-3">
            {faqs.map((f, i) => (
              <details
                key={f.q}
                open={i === 0}
                className="group rounded-xl border border-border bg-surface open:shadow-e1"
              >
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-medium text-fg">
                  <h3 className="text-body font-medium">{f.q}</h3>
                  <span
                    aria-hidden="true"
                    className="text-fg-3 transition-transform duration-base group-open:rotate-180"
                  >
                    ▾
                  </span>
                </summary>
                <p className="max-w-prose px-5 pb-5 text-body text-fg-2">{f.a}</p>
              </details>
            ))}
          </div>
        </Section>
      </div>

      <section className="bg-ink py-16 text-ink-fg md:py-20">
        <div className={container}>
          <div className={`${kicker} text-signal-on-ink`}>Free · no login to start</div>
          <h2 className="mt-3 max-w-2xl font-serif text-h1 font-medium text-ink-fg">
            The offer comes after the interview. Practise it out loud.
          </h2>
          <p className="mt-3 max-w-[56ch] text-body-lg text-ink-fg-2">
            Run a free voice mock interview for the {hub.shortName} role and hear where your answers
            are thin.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/free-mock-interview"
              className="inline-flex h-11 items-center rounded-full bg-white px-5 text-small font-semibold text-ink transition-colors duration-fast hover:bg-white/90"
            >
              Start a free mock interview
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
