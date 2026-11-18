import { Figure, BarList, StatRow } from '@/components/viz'
import {
  PLATFORMS,
  COUNT,
  PUBLISHED,
  SUITES,
  WITH_ROLEPLAY,
  KIND_LABEL,
  CHECKED,
  PRACTICE_CHECKED,
  WORKED_REPS,
  SALESFORCE,
  yearCosts,
  usd,
  type Kind,
} from '@/data/salesTrainingPlatforms'

const paidPublished = PUBLISHED.filter((p) => p.year && (p.year(WORKED_REPS)?.usd ?? 0) > 0)

/** Headline counts, computed from the vendor data. */
export function SalesTrainingStats() {
  return (
    <StatRow
      stats={[
        {
          label: 'Platforms checked on their own pages',
          value: String(COUNT),
          sub: `${CHECKED} (AI practice tools ${PRACTICE_CHECKED})`,
        },
        {
          label: 'Publish a paid price you can read',
          value: `${paidPublished.length} of ${COUNT}`,
          sub: paidPublished.map((p) => p.name).join(', '),
        },
        {
          label: 'Enablement suites and LMS with AI roleplay',
          value: `${WITH_ROLEPLAY.length} of ${SUITES.length}`,
          sub: 'Roleplay is now a module, not a separate category',
        },
        {
          label: 'Sellers who lack roleplay before calls',
          value: `${SALESFORCE.roleplay}%`,
          sub: `Salesforce State of Sales 2026, ${SALESFORCE.sellers.toLocaleString('en-US')} sellers`,
          href: SALESFORCE.url,
        },
      ]}
    />
  )
}

/** Year-one list cost for the worked team, published prices only. */
export function SalesTrainingCostFigure() {
  const lines = yearCosts(WORKED_REPS).filter((l) => l.y.usd > 0)
  const rows = lines.map((l) => ({
    label: `${l.name}${l.ours ? ' (our product)' : ''}`,
    value: l.y.usd,
    display: usd(l.y.usd),
    note: `${KIND_LABEL[l.kind]} · ${l.y.basis}`,
  }))
  const sorted = [...rows].sort((a, b) => a.value - b.value)
  return (
    <Figure
      label={`Year-one list price · ${WORKED_REPS} reps · published prices only`}
      title={`For ${WORKED_REPS} reps, a year of published-price training runs from ${sorted[0].display} to ${sorted[sorted.length - 1].display}, before the free options`}
      sub="Different kinds buy different things: an LMS seat holds courses, a live course is taught once, a practice plan buys call minutes. HubSpot Academy, Trailhead and the TalentLMS free plan cost $0."
      source={lines.map((l) => ({ label: l.name, url: l.url }))}
      updated={CHECKED}
      table={{
        head: ['Option', 'Kind', 'Year one (USD)', 'How it is worked out'],
        rows: lines.map((l) => [l.name, KIND_LABEL[l.kind], usd(l.y.usd), l.y.basis]),
      }}
    >
      <BarList rows={rows} format={{ prefix: '$' }} sort />
    </Figure>
  )
}

const ORDER: Kind[] = ['library', 'programme', 'suite', 'practice']

/** Every platform, grouped by kind, server-rendered with the vendor's own words. */
export function SalesTrainingPlatformTable() {
  return (
    <>
      {/* Phone: one card per platform, grouped by kind */}
      <div className="not-prose my-6 space-y-6 md:hidden">
        {ORDER.map((k) => (
          <section key={k} aria-label={KIND_LABEL[k]}>
            <h3 className="font-mono text-caption uppercase tracking-[0.06em] text-signal-strong">
              {KIND_LABEL[k]}
            </h3>
            <ul className="mt-2 divide-y divide-border border-y border-border">
              {PLATFORMS.filter((p) => p.kind === k).map((p) => (
                <li key={p.id} className="py-3">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener"
                    className="text-small font-semibold text-fg underline-offset-2 hover:underline"
                  >
                    {p.name}
                  </a>
                  {p.ours ? <span className="text-small text-fg-2"> (our product)</span> : null}
                  <p className="mt-1 text-small text-fg-2">{p.trains}</p>
                  <dl className="mt-2 grid grid-cols-[6.5rem_1fr] gap-x-3 gap-y-1 text-caption">
                    <dt className="text-fg-3">Price</dt>
                    <dd className="text-fg">{p.price}</dd>
                    <dt className="text-fg-3">Free start</dt>
                    <dd className="text-fg">{p.free || 'None found'}</dd>
                    <dt className="text-fg-3">AI roleplay</dt>
                    <dd className="text-fg">{p.roleplay || 'None named'}</dd>
                  </dl>
                </li>
              ))}
            </ul>
          </section>
        ))}
        <p className="text-caption text-fg-3">
          Each name links to the page we opened ({CHECKED}; AI practice tools {PRACTICE_CHECKED}).
        </p>
      </div>
      <div className="hidden w-full overflow-x-auto md:block">
        <table className="min-w-[52rem]">
          <thead>
            <tr>
              <th>Platform</th>
              <th>What it trains</th>
              <th>Price (as the vendor shows it)</th>
              <th>Free start</th>
              <th>AI roleplay (vendor&apos;s name)</th>
            </tr>
          </thead>
          {ORDER.map((k) => (
            <tbody key={k}>
              <tr>
                <th colSpan={5} scope="colgroup" className="text-left">
                  {KIND_LABEL[k]}
                </th>
              </tr>
              {PLATFORMS.filter((p) => p.kind === k).map((p) => (
                <tr key={p.id}>
                  <td>
                    <a href={p.url} target="_blank" rel="noopener">
                      {p.name}
                    </a>
                    {p.ours ? ' (our product)' : ''}
                  </td>
                  <td>{p.trains}</td>
                  <td>{p.price}</td>
                  <td>{p.free || 'None found'}</td>
                  <td>{p.roleplay || 'None named'}</td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
        <p className="text-caption text-fg-3">
          Each name links to the page we opened: course libraries, programmes, suites and LMS on{' '}
          {CHECKED}; AI practice tools on {PRACTICE_CHECKED}. &quot;None found&quot; means the page
          we opened did not show one, not that the vendor has none.
        </p>
      </div>
    </>
  )
}
