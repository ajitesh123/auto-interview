import { Figure, BarList, SegmentBar, StatRow } from '@/components/viz'
import {
  VENDORS,
  COUNT,
  PUBLISHED,
  FREE_START,
  QUOTE_ONLY,
  FREE_THEN_QUOTE,
  REAL_CALLS,
  WORKED,
  WORKED_LINES,
  COOK_2011,
  SALESFORCE,
  CHECKED,
  usd,
} from '@/data/salesRoleplayData'

/** Headline counts, computed from the vendor data. */
export function SalesRoleplayStats() {
  return (
    <StatRow
      stats={[
        { label: 'Tools checked on their own pages', value: String(COUNT), sub: CHECKED },
        {
          label: 'Publish a price for a paid plan',
          value: `${PUBLISHED.length} of ${COUNT}`,
          sub: PUBLISHED.map((v) => v.name).join(', '),
        },
        {
          label: 'Let you start free without a sales call',
          value: `${FREE_START.length} of ${COUNT}`,
          sub: FREE_START.map((v) => v.name).join(', '),
        },
        {
          label: 'Sellers who lack roleplay before calls',
          value: `${SALESFORCE.roleplay}%`,
          sub: 'Salesforce State of Sales 2026',
          href: SALESFORCE.url,
        },
      ]}
    />
  )
}

/** How the 15 tools price: one whole split into parts. */
export function SalesRoleplayPricingFigure() {
  const parts = [
    { label: 'Quote only', value: QUOTE_ONLY.length },
    { label: 'Free plan, then quote', value: FREE_THEN_QUOTE.length },
    { label: 'Paid price published', value: PUBLISHED.length },
  ]
  return (
    <Figure
      label={`Pricing pages · ${COUNT} tools · opened ${CHECKED}`}
      title={`${QUOTE_ONLY.length + FREE_THEN_QUOTE.length} of ${COUNT} tools will not tell you a team price until you talk to sales`}
      source={[{ label: 'Each vendor’s pricing or product page (linked in the finder)' }]}
      updated={CHECKED}
      table={{
        head: ['How the price is shown', 'Tools', 'Which'],
        rows: [
          ['Quote only', QUOTE_ONLY.length, QUOTE_ONLY.map((v) => v.name).join(', ')],
          [
            'Free plan, then quote',
            FREE_THEN_QUOTE.length,
            FREE_THEN_QUOTE.map((v) => v.name).join(', '),
          ],
          ['Paid price published', PUBLISHED.length, PUBLISHED.map((v) => v.name).join(', ')],
        ],
      }}
    >
      <SegmentBar parts={parts} sort={false} />
    </Figure>
  )
}

/** Year-one list cost at the worked team size. */
export function SalesRoleplayCostFigure() {
  const rows = WORKED_LINES.filter((l) => l.annual !== null).map((l) => ({
    label: l.name,
    value: l.annual as number,
    display: usd(l.annual as number),
    note: l.basis,
    highlight: false,
  }))
  const sorted = [...rows].sort((a, b) => a.value - b.value)
  const low = sorted[0]
  const high = sorted[sorted.length - 1]
  return (
    <Figure
      label={`Year-one list price · ${WORKED.reps} reps · ${WORKED.minutesPerRep} practice minutes each a month`}
      title={`For ${WORKED.reps} reps, published prices run from ${low.display} to ${high.display} a year`}
      sub="Only tools with a published per-seat price can be costed. The top bar includes a full dialer."
      source={PUBLISHED.filter((v) => v.id !== 'yoodli').map((v) => ({
        label: v.name,
        url: v.url,
      }))}
      updated={CHECKED}
      table={{
        head: ['Option', 'Year one (USD)', 'How it is worked out'],
        rows: WORKED_LINES.map((l) => [
          l.name,
          l.annual === null ? 'Quote' : usd(l.annual),
          l.basis,
        ]),
      }}
    >
      <BarList rows={rows} format={{ prefix: '$' }} sort />
    </Figure>
  )
}

/** Evidence that practice with feedback works: the biggest meta-analysis we could open. */
export function SalesRoleplayEvidenceFigure() {
  return (
    <Figure
      label={`Meta-analysis · ${COOK_2011.studies} studies · ${COOK_2011.trainees.toLocaleString('en-US')} trainees`}
      title="Simulation practice moved knowledge most, and on-the-job behaviour less, but still clearly"
      sub="Pooled effect sizes against no training. Health professions, not sales: the largest controlled evidence on simulated practice we could open."
      source={[{ label: 'Cook et al., JAMA 2011', url: COOK_2011.url }]}
      updated="Opened 13 Nov 2026"
      table={{
        head: ['Outcome', 'Pooled effect size'],
        rows: COOK_2011.rows.map((r) => [r.label, r.value.toFixed(2)]),
      }}
    >
      <BarList rows={COOK_2011.rows} format={{ decimals: 2 }} sort={false} />
    </Figure>
  )
}

/** Which tools score real customer calls with the same scorecard (for prose). */
export const REAL_CALL_NAMES = REAL_CALLS.map((v) => v.name).join(', ')
export const ALL_NAMES = VENDORS.map((v) => v.name)
