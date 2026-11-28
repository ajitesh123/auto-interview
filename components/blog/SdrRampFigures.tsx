import { StatRow, Flow, Figure, BarList } from '@/components/viz'
import {
  SOURCES,
  CHECKED,
  FACTS,
  TRACES,
  PRESETS,
  WORKED,
  compute,
  money,
  pct,
  n1,
  type Currency,
} from '@/data/sdrRamp'

const box = 'not-prose my-8 overflow-x-auto rounded-xl border border-border bg-surface'
const th = 'px-4 py-3 text-left text-caption font-semibold uppercase tracking-[0.04em] text-fg-3'
const td = 'px-4 py-3 align-top text-small text-fg-2'
const ext = { target: '_blank', rel: 'noopener noreferrer' } as const
const f1 = (x: number) => x.toFixed(1)

/** Headline benchmarks, each linked to its source. */
export function SdrRampStats() {
  return (
    <StatRow
      stats={[
        {
          label: 'Average SDR ramp',
          value: `${f1(FACTS.sdrRamp)} months`,
          sub: `Lowest since 2010; peak ${f1(FACTS.sdrRampPeak)} in 2014 · The Bridge Group, 2025`,
          href: SOURCES.bridgeRamp.url,
        },
        {
          label: 'Average AE ramp',
          value: `${f1(FACTS.aeRamp)} months`,
          sub: 'Highest in the study’s history · The Bridge Group, Jun 2026',
          href: SOURCES.bridgeAe.url,
        },
        {
          label: 'Average SDR tenure',
          value: `${f1(FACTS.sdrTenureYears)} years`,
          sub: `${FACTS.sdrAttrition}% median attrition a year · The Bridge Group`,
          href: SOURCES.bridgeSdr.url,
        },
        {
          label: 'Reps who say they lack roleplay before calls',
          value: `${FACTS.sfNoRoleplayPdf}%`,
          sub: 'Salesforce State of Sales, survey Aug–Sep 2025',
          href: SOURCES.salesforcePdf.url,
        },
      ]}
    />
  )
}

/** Ramp months by role, primary sources only. */
export function SdrRampByRole() {
  const rows = [
    {
      label: 'SDR, 2014 (peak)',
      value: FACTS.sdrRampPeak,
      note: 'Same Bridge Group page as the 2025 figure',
    },
    { label: 'SDR, 2025', value: FACTS.sdrRamp, note: '351 companies', highlight: true },
    { label: 'AE, 2026', value: FACTS.aeRamp, note: '158 companies' },
    {
      label: 'Most common ramp period, all roles (2025)',
      value: FACTS.quotapathAvgRamp,
      note: 'QuotaPath survey of 114 revenue leaders',
    },
  ]
  return (
    <Figure
      label="Ramp time, months · primary sources only"
      title={`An SDR ramps in ${f1(FACTS.sdrRamp)} months, half the ${f1(FACTS.aeRamp)} months an account executive now takes`}
      sub="SDR ramp has fallen since its 2014 peak while AE ramp hit a record in 2026. Numbers that mix the two roles are the most common error on ranking pages (see the trace table below)."
      source={[
        { label: SOURCES.bridgeRamp.label, url: SOURCES.bridgeRamp.url },
        { label: SOURCES.bridgeAe.label, url: SOURCES.bridgeAe.url },
        { label: SOURCES.quotapath.label, url: SOURCES.quotapath.url },
      ]}
      updated={CHECKED}
      table={{
        head: ['Role and year', 'Months', 'Sample'],
        rows: rows.map((r) => [r.label, f1(r.value), r.note]),
      }}
    >
      <BarList
        rows={rows.map((r) => ({ ...r, display: `${f1(r.value)} mo` }))}
        sort={false}
        emphasis
      />
    </Figure>
  )
}

const VERDICT: Record<string, string> = {
  primary: 'Primary',
  secondhand: 'Second-hand only',
  mislabelled: 'Wrong role',
  simulated: 'Not survey data',
}

/** Every ramp number quoted on ranking pages, traced. */
export function SdrRampTraceTable() {
  return (
    <div className={box}>
      <table className="w-full min-w-[640px] border-collapse">
        <caption className="px-4 pt-4 text-left text-small text-fg-2">
          Ramp figures quoted on pages that rank for “SDR ramp time”, traced to where they come
          from. Checked {CHECKED}.
        </caption>
        <thead>
          <tr className="border-b border-border">
            <th scope="col" className={th}>
              Figure
            </th>
            <th scope="col" className={th}>
              What it measures
            </th>
            <th scope="col" className={th}>
              Origin
            </th>
            <th scope="col" className={th}>
              Verdict
            </th>
          </tr>
        </thead>
        <tbody>
          {TRACES.map((t) => (
            <tr key={t.figure + t.measures} className="border-b border-border last:border-0">
              <td className={`${td} font-medium text-fg`}>{t.figure}</td>
              <td className={td}>{t.measures}</td>
              <td className={td}>
                {t.url ? (
                  <a
                    href={t.url}
                    {...ext}
                    className="text-signal-strong underline-offset-2 hover:underline"
                  >
                    {t.origin}
                  </a>
                ) : (
                  t.origin
                )}
                <span className="block text-caption text-fg-3">{t.date}</span>
              </td>
              <td className={td}>
                <span
                  className={`font-medium ${t.verdict === 'primary' ? 'text-signal-strong' : 'text-fg'}`}
                >
                  {VERDICT[t.verdict]}
                </span>
                <span className="block text-caption text-fg-3">{t.note}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** The worked US example: lines that add up. */
export function SdrRampWorked() {
  const r = compute(WORKED)
  const c: Currency = 'USD'
  return (
    <div className={box}>
      <table className="w-full min-w-[560px] border-collapse">
        <caption className="px-4 pt-4 text-left text-small text-fg-2">
          One median US SDR, 3-month ramp in even steps (GitLab’s 25/50/75%), full quota{' '}
          {WORKED.quota} held meetings a month.
        </caption>
        <thead>
          <tr className="border-b border-border">
            <th scope="col" className={th}>
              Month
            </th>
            <th scope="col" className={th}>
              Ramp quota
            </th>
            <th scope="col" className={th}>
              Meetings expected
            </th>
            <th scope="col" className={th}>
              Below full quota
            </th>
            <th scope="col" className={th}>
              Pay not matched by output
            </th>
          </tr>
        </thead>
        <tbody>
          {r.rows.map((row) => (
            <tr key={row.month} className="border-b border-border">
              <td className={td}>{row.month}</td>
              <td className={`${td} tabular-nums`}>{pct(row.share)}</td>
              <td className={`${td} tabular-nums`}>{n1(row.target)}</td>
              <td className={`${td} tabular-nums`}>{n1(row.lostMeetings)}</td>
              <td className={`${td} tabular-nums`}>
                {money(r.monthly, c)} × {pct(1 - row.share)} = {money(row.uncovered, c)}
              </td>
            </tr>
          ))}
          <tr>
            <td className={`${td} font-medium text-fg`} colSpan={3}>
              Total ({n1(r.lostMonths)} months of output)
            </td>
            <td className={`${td} font-medium tabular-nums text-fg`}>{n1(r.lostMeetings)}</td>
            <td className={`${td} font-medium tabular-nums text-fg`}>{money(r.rampCost, c)}</td>
          </tr>
        </tbody>
      </table>
      <p className="px-4 pb-4 text-caption text-fg-3">
        Monthly cost {money(r.monthly, c)} = {money(WORKED.annualCost, c)} a year ÷ 12 (Bridge Group
        median OTE $80K plus employer benefits at 30% of total pay, per the{' '}
        <a
          href={SOURCES.aiSdrPost.url}
          className="text-signal-strong underline-offset-2 hover:underline"
        >
          same model as our AI SDR vs human SDR post
        </a>
        ).
      </p>
    </div>
  )
}

/** Ramp cost and one month faster, by country. */
export function SdrRampByCountry() {
  const rows = (['USD', 'GBP', 'INR'] as Currency[]).map((c) => {
    const r = compute(PRESETS[c].inputs)
    return { c, label: { USD: 'United States', GBP: 'United Kingdom', INR: 'India' }[c], r }
  })
  return (
    <div className={box}>
      <table className="w-full min-w-[560px] border-collapse">
        <caption className="px-4 pt-4 text-left text-small text-fg-2">
          Median SDR in each country, 3-month ramp in even steps, {WORKED.quota} held meetings a
          month at full quota. Checked {CHECKED}.
        </caption>
        <thead>
          <tr className="border-b border-border">
            <th scope="col" className={th}>
              Country
            </th>
            <th scope="col" className={th}>
              Employer cost a year
            </th>
            <th scope="col" className={th}>
              Cost of the ramp
            </th>
            <th scope="col" className={th}>
              One month faster saves
            </th>
            <th scope="col" className={th}>
              Pay basis
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ c, label, r }) => (
            <tr key={c} className="border-b border-border last:border-0">
              <td className={`${td} font-medium text-fg`}>{label}</td>
              <td className={`${td} tabular-nums`}>{money(r.inputs.annualCost, c)}</td>
              <td className={`${td} tabular-nums`}>{money(r.rampCost, c)}</td>
              <td className={`${td} tabular-nums text-signal-strong`}>
                {money(r.oneFaster?.cost ?? 0, c)}
              </td>
              <td className={`${td} text-caption text-fg-3`}>{PRESETS[c].note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** The 90-day plan as gates. */
export function SdrRampPlanFlow() {
  return (
    <Flow
      label="The SDR ramp, gate by gate"
      steps={[
        {
          title: 'Week 1: product, buyer, tools',
          body: 'ICP, pains, the talk track; first scored practice calls',
        },
        {
          title: 'Week 2: practice, not shadowing',
          body: 'Daily scored roleplays on openers and objections',
        },
        { title: 'Week 3 gate: certification', body: 'Pass 3 scored roleplays to earn live dials' },
        {
          title: 'Month 1: 25% of quota',
          body: 'Live from day 22, with a daily 10-minute warm-up',
        },
        { title: 'Month 2–3: 50% then 75%', body: 'Weekly call review against the same rubric' },
        { title: 'Month 4: full quota', body: 'Compare the cohort with the last two' },
      ]}
    />
  )
}
