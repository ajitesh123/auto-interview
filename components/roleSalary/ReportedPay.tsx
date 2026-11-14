import type { ReactNode } from 'react'
import type { RoleSalary, ReportedSet, ReportedCompany } from '@/data/roleSalary'
import { Figure, BarList, RangeList } from '@/components/viz'
import { inHandMonthly } from './reportedMath'

const link =
  'font-medium text-signal-strong underline decoration-signal/30 underline-offset-2 hover:decoration-signal'

export const lakh = (n: number) =>
  n >= 100 ? `₹${(n / 100).toFixed(2)} Cr` : `₹${n % 1 === 0 ? n : n.toFixed(1)} lakh`
const lakhShort = (n: number) => (n >= 100 ? `₹${(n / 100).toFixed(2)} Cr` : `₹${n.toFixed(1)} L`)
const inrMonth = (n: number) => `₹${Math.round(n).toLocaleString('en-IN')}`

export const fmtDay = (d: string) =>
  new Date(d.slice(0, 10) + 'T00:00:00Z').toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })

const expLabel = (c: ReportedCompany) =>
  c.minExp === c.maxExp ? `${c.minExp} yrs` : `${c.minExp}–${c.maxExp} yrs`
const companyUrl = (c: ReportedCompany, set: ReportedSet) => {
  const role = set.url.replace(/^.*\/profile\/(.*)-salary.*$/, '$1')
  return `https://www.ambitionbox.com/salaries/${c.slug}-salaries/${role}`
}

/** Rows with at least this many reports are charted; fewer are listed and marked. */
export const MIN_REPORTS = 3

function Tiles({ set }: { set: ReportedSet }) {
  const tiles: [string, string, string][] = [
    ['Median CTC', lakh(set.median), `${set.n.toLocaleString('en-IN')} salaries reported`],
    ['Middle half', `₹${set.p25}–${set.p75} lakh`, '25th to 75th percentile'],
    ['Top 10% earn', `${lakh(set.p90)}+`, '90th percentile'],
    [
      'Median in hand',
      `${inrMonth(inHandMonthly(set.median))}/mo`,
      'At the median CTC, new regime',
    ],
  ]
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

function CompanyBars({ set }: { set: ReportedSet }) {
  const rows = set.companies.filter((c) => c.n >= MIN_REPORTS).sort((a, b) => b.avg - a.avg)
  if (rows.length < 4) return null
  return (
    <Figure
      label={`Reported by employees · ${rows.length} well-known employers · India`}
      title={`${set.label} at well-known companies: ${rows[0].name} reports the highest average, ${lakh(rows[0].avg)}`}
      sub={`Average CTC a year as reported on AmbitionBox under "${set.designation}". The number in brackets is how many reports sit behind each company (at least ${MIN_REPORTS}); open the table for their experience.`}
      source={[{ label: `AmbitionBox: ${set.designation} salaries in India`, url: set.url }]}
      updated={`Data updated ${fmtDay(set.updated)}`}
      table={{
        head: ['Company', 'Average CTC', 'Typical range', 'Reports', 'Experience'],
        rows: rows.map((c) => [
          c.name,
          lakh(c.avg),
          `${lakhShort(c.low)} – ${lakhShort(c.high)}`,
          c.n,
          expLabel(c),
        ]),
      }}
    >
      <BarList
        rows={rows.map((c) => ({
          label: `${c.name} (${c.n.toLocaleString('en-IN')})`,
          value: c.avg,
          display: lakhShort(c.avg),
          href: companyUrl(c, set),
          note: `${c.n} reports · ${expLabel(c)} experience · typical ${lakhShort(c.low)}–${lakhShort(c.high)}`,
        }))}
      />
    </Figure>
  )
}

function ExpBands({ set }: { set: ReportedSet }) {
  const rows = set.exp.filter((e) => e[4] >= 10)
  if (rows.length < 3) return null
  const first = rows[0]
  const last = rows[rows.length - 1]
  return (
    <Figure
      label={`Reported by employees · ${rows.length} experience bands`}
      title={`${set.label} pay rises from ${lakhShort(first[1])} at ${first[0]} years to ${lakhShort(last[1])} at ${last[0]} years`}
      sub="Average CTC by years of experience, with AmbitionBox's typical range for each year. Years with fewer than 10 reports are left out."
      legend={[
        { label: 'Typical range', kind: 'bar', color: '#94A8FF' },
        { label: 'Average', kind: 'dot', color: '#141D52' },
      ]}
      source={[{ label: `AmbitionBox: ${set.designation} salaries in India`, url: set.url }]}
      updated={`Data updated ${fmtDay(set.updated)}`}
      table={{
        head: ['Experience', 'Average CTC', 'Typical range', 'Salaries', 'In hand / month'],
        rows: rows.map((e) => [
          `${e[0]} yrs`,
          lakh(e[1]),
          `${lakhShort(e[2])} – ${lakhShort(e[3])}`,
          e[4],
          inrMonth(inHandMonthly(e[1])),
        ]),
      }}
    >
      <RangeList
        format={{ prefix: '₹', suffix: ' L' }}
        rows={rows.map((e) => ({
          label: `${e[0]} yrs`,
          sub: `${e[4]} salaries`,
          min: e[2],
          max: e[3],
          mid: e[1],
          display: lakhShort(e[1]),
          note: `Typical ${lakhShort(e[2])}–${lakhShort(e[3])} · about ${inrMonth(inHandMonthly(e[1]))} a month in hand`,
        }))}
      />
    </Figure>
  )
}

function CityBars({ set }: { set: ReportedSet }) {
  if (set.cities.length < 3) return null
  const rows = [...set.cities].sort((a, b) => b[1] - a[1])
  return (
    <Figure
      label={`Reported by employees · ${rows.length} metro cities`}
      title={`${rows[0][0]} pays ${set.label} the most on average: ${lakh(rows[0][1])}`}
      sub="Average CTC a year by city, with the number of salaries behind each."
      source={[{ label: `AmbitionBox: ${set.designation} salaries in India`, url: set.url }]}
      updated={`Data updated ${fmtDay(set.updated)}`}
      table={{
        head: ['City', 'Average CTC', 'Typical range', 'Salaries'],
        rows: rows.map((c) => [c[0], lakh(c[1]), `${lakhShort(c[2])} – ${lakhShort(c[3])}`, c[4]]),
      }}
    >
      <BarList
        rows={rows.map((c) => ({
          label: c[0],
          value: c[1],
          display: lakhShort(c[1]),
          note: `${c[4]} salaries · typical ${lakhShort(c[2])}–${lakhShort(c[3])}`,
        }))}
      />
    </Figure>
  )
}

function FewReports({ set }: { set: ReportedSet }) {
  const rows = set.companies.filter((c) => c.n < MIN_REPORTS).sort((a, b) => b.avg - a.avg)
  if (!rows.length) return null
  return (
    <p className="max-w-prose text-small text-fg-2">
      <span className="font-medium text-fg">
        Fewer than {MIN_REPORTS} reports, so not charted:{' '}
      </span>
      {rows.map((c, i) => (
        <span key={c.slug}>
          {i > 0 && '; '}
          <a href={companyUrl(c, set)} target="_blank" rel="noopener" className={link}>
            {c.name}
          </a>{' '}
          {lakhShort(c.avg)} ({c.n} {c.n === 1 ? 'report' : 'reports'}, {expLabel(c)})
        </span>
      ))}
      .
    </p>
  )
}

function UsTable({ s }: { s: RoleSalary }) {
  const us = s.reported?.us
  if (!us || !us.rows.length) return null
  const rows = [...us.rows].sort((a, b) => b.median - a.median)
  return (
    <Figure
      label={`Reported by employees · United States · Levels.fyi`}
      title={us.title}
      sub={
        us.overall
          ? `Across all US employers on Levels.fyi, the median is $${us.overall.median}K total pay a year${us.overall.n ? ` (${us.overall.n} reports)` : ''}. Base, stock and bonus included.`
          : 'Median total pay a year: base, stock and bonus.'
      }
      source={[
        ...(us.overall ? [{ label: 'Levels.fyi: all US employers', url: us.overall.url }] : []),
        { label: 'Levels.fyi company pages, linked in the chart', url: 'https://www.levels.fyi/' },
      ]}
      updated={`Checked ${fmtDay(us.checked)}`}
      table={{
        head: ['Company', 'Median total pay', 'Reports', 'Note'],
        rows: rows.map((r) => [r.company, `$${r.median}K`, r.n ?? 'not shown', r.note ?? '']),
      }}
    >
      <BarList
        rows={rows.map((r) => ({
          label: r.company,
          value: r.median,
          display: `$${r.median}K`,
          href: r.url,
          note: [r.n ? `${r.n} reports` : null, r.note].filter(Boolean).join(' · ') || undefined,
        }))}
      />
    </Figure>
  )
}

export default function ReportedPay({
  s,
  Section,
}: {
  s: RoleSalary
  Section: (p: {
    id: string
    meta: string
    title: string
    intro?: ReactNode
    children: ReactNode
  }) => JSX.Element
}) {
  const r = s.reported
  if (!r) return null
  const companies = new Set(r.sets.flatMap((x) => x.companies.map((c) => c.slug)))
  return (
    <Section
      id="reported"
      meta={`Reported by employees · ${companies.size} well-known companies · read ${fmtDay(r.checked)}`}
      title={`What ${s.roleName}${r.sets.length > 1 ? ' and related roles are' : 's are'} paid at companies you know`}
      intro={r.intro}
    >
      <ul className="max-w-prose space-y-2 text-body text-fg-2">
        {r.findings.map((f) => (
          <li key={f} className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-signal"
            />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      {r.sets.map((set) => (
        <div key={set.designation} className="space-y-6">
          <h3 className="text-h3 font-semibold text-fg">
            {set.label}{' '}
            <span className="text-body font-normal text-fg-3">
              (reported as &ldquo;{set.designation}&rdquo;)
            </span>
          </h3>
          <Tiles set={set} />
          <CompanyBars set={set} />
          <FewReports set={set} />
          <ExpBands set={set} />
          <CityBars set={set} />
        </div>
      ))}
      <UsTable s={s} />
      <p className="max-w-prose text-small text-fg-3">
        How to read this: AmbitionBox figures are CTC that employees report, not offers we verified.
        A company with many reports at one experience level can pull its average up or down, so read
        the number of reports and the experience next to each company. We list only employers most
        readers will know; the full list is on each AmbitionBox page linked above.
      </p>
    </Section>
  )
}
