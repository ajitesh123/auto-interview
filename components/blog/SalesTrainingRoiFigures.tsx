import { StatRow, Flow, Figure, BarList } from '@/components/viz'
import {
  SOURCES,
  CHECKED,
  WORKED,
  PRINCIPLES,
  LEVELS,
  FACTS,
  compute,
  money,
  pct,
} from '@/data/salesTrainingRoi'

const box = 'overflow-hidden rounded-xl border border-border bg-surface'

/** Headline facts, each linked to the page it came from. */
export function SalesTrainingRoiStats() {
  return (
    <StatRow
      stats={[
        {
          label: `US training spend, ${FACTS.usSpendYear}`,
          value: FACTS.usSpend,
          sub: `${FACTS.perLearner} per learner · Training magazine`,
          href: SOURCES.trainingMag.url,
        },
        {
          label: 'Programmes the ROI Institute says to take to ROI',
          value: FACTS.roiShare,
          sub: 'The rest stop at reaction, learning, behaviour or results',
          href: SOURCES.targets.url,
        },
        {
          label: 'Average SDR ramp, 2025',
          value: FACTS.sdrRamp,
          sub: `${FACTS.sdrAtQuota} of SDRs at quota · The Bridge Group`,
          href: SOURCES.bridge.url,
        },
        {
          label: 'Reps who don’t expect to hit quota',
          value: FACTS.sfMiss,
          sub: 'Salesforce State of Sales, 2024',
          href: SOURCES.salesforce.url,
        },
      ]}
    />
  )
}

/** Kirkpatrick 1-4 + Phillips 5, with what a sales team measures at each. */
export function SalesTrainingRoiLevels() {
  return (
    <Flow
      label="Five levels of evidence, from a survey to ROI"
      steps={LEVELS.map((l) => ({
        title: `Level ${l.level}: ${l.name}`,
        body: l.sales,
      }))}
    />
  )
}

/** The same programme, reported three ways. */
export function SalesTrainingRoiThreeWays() {
  const r = compute(WORKED)
  const c = WORKED.currency
  const rows = [
    {
      label: 'Revenue as benefit',
      value: r.roiRevenueBasis,
      display: pct(r.roiRevenueBasis, 1),
      note: `Bookings ${money(r.bookingsTotal, c)} treated as profit`,
    },
    {
      label: 'All lift credited',
      value: r.roiFullCredit,
      display: pct(r.roiFullCredit, 1),
      note: `Ignores the control group's +${WORKED.controlLift}%`,
    },
    {
      label: 'Margin, control subtracted',
      value: r.roi,
      display: pct(r.roi, 1),
      note: 'Phillips principles 4, 5, 9 and 10',
      highlight: true,
    },
  ]
  return (
    <Figure
      label={`Worked example · ${WORKED.reps} reps · first year`}
      title={`One programme, three ROI numbers: ${pct(r.roiFullCredit, 1)}, ${pct(r.roiRevenueBasis, 1)} or ${pct(r.roi, 1)}`}
      sub={`Same team, same ${money(r.cost, c)} cost. The two bigger numbers count revenue as if it were profit, or credit training with the market lift the untrained reps also got. Only the last one survives a CFO's questions.`}
      source={[
        { label: SOURCES.foldout.label, url: SOURCES.foldout.url },
        { label: 'Example inputs (ours), not benchmarks' },
      ]}
      updated={CHECKED}
      table={{
        head: ['How ROI is reported', 'ROI'],
        rows: rows.map((x) => [x.label, x.display]),
      }}
    >
      <BarList rows={rows} sort={false} emphasis />
    </Figure>
  )
}

/** The worked example as a table whose lines add up. */
export function SalesTrainingRoiWorked() {
  const i = WORKED
  const r = compute(i)
  const c = i.currency
  const lines: [string, string, string][] = [
    [
      'Isolated lift',
      `${i.trainedLift}% trained − ${i.controlLift}% control`,
      `${r.netLift} points`,
    ],
    [
      'Extra bookings from the lift',
      `${i.reps} reps × ${money(i.bookings, c)} × ${r.netLift}%`,
      money(r.liftBookings, c),
    ],
    [
      'Extra bookings from faster ramp',
      `${i.hires} hires × (${i.rampBefore} − ${i.rampAfter}) ÷ 2 months × ${money(i.bookings / 12, c)}`,
      money(r.rampBookings, c),
    ],
    ['Benefit (gross margin)', `${money(r.bookingsTotal, c)} × ${i.margin}%`, money(r.benefit, c)],
    ['Programme fee', 'Trainer, licence or platform', money(r.costs[0].value, c)],
    [
      'Rep time away from selling',
      `(${i.reps} reps + ${i.hires} hires) × ${i.repHours} h × ${money(i.repHourCost, c)}`,
      money(r.costs[1].value, c),
    ],
    [
      'Manager time',
      `${i.managerHours} h × ${money(i.managerHourCost, c)}`,
      money(r.costs[2].value, c),
    ],
    ['Design, admin, travel, evaluation', 'Estimate', money(r.costs[3].value, c)],
    ['Fully loaded cost', 'Sum of the four cost lines', money(r.cost, c)],
    ['Net benefit', `${money(r.benefit, c)} − ${money(r.cost, c)}`, money(r.net, c)],
    ['ROI', `${money(r.net, c)} ÷ ${money(r.cost, c)} × 100`, pct(r.roi, 1)],
    ['Benefit-cost ratio (BCR)', `${money(r.benefit, c)} ÷ ${money(r.cost, c)}`, r.bcr.toFixed(2)],
    [
      'Payback',
      `${money(r.cost, c)} ÷ (${money(r.benefit, c)} ÷ 12)`,
      `${(r.paybackMonths ?? 0).toFixed(1)} months`,
    ],
  ]
  return (
    <figure className="not-prose my-8">
      <ol className={`divide-y divide-border ${box}`}>
        {lines.map(([k, how, v]) => {
          const strong = ['Benefit (gross margin)', 'Fully loaded cost', 'ROI'].includes(k)
          return (
            <li
              key={k}
              className={`grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 px-4 py-3 ${strong ? 'bg-muted' : ''}`}
            >
              <span className="min-w-0">
                <span
                  className={`block text-small ${strong ? 'font-semibold' : 'font-medium'} text-fg`}
                >
                  {k}
                </span>
                <span className="block text-caption text-fg-3">{how}</span>
              </span>
              <span className="self-center text-right text-small font-semibold tabular-nums text-fg">
                {v}
              </span>
            </li>
          )
        })}
      </ol>
      <figcaption className="mt-2 text-caption text-fg-3">
        Example inputs, not benchmarks: a {i.reps}-rep account executive team with{' '}
        {money(i.bookings, c)} of bookings per ramped rep and {i.margin}% gross margin. Ramp assumes
        output climbs in a straight line and hires start early in the year, so a ramp of n months
        costs n ÷ 2 months of full bookings. Ramp months are compared before vs after; isolate them
        the same way you isolate the lift. Same maths as the calculator above.
      </figcaption>
    </figure>
  )
}

/** Phillips principles the calculator applies, quoted. */
export function SalesTrainingRoiPrinciples() {
  return (
    <div className={`not-prose my-8 ${box}`}>
      <ul className="divide-y divide-border">
        {PRINCIPLES.map((p) => (
          <li key={p.n} className="px-4 py-3">
            <p className="text-small font-medium text-fg">
              Principle {p.n}: “{p.quote}”
            </p>
            <p className="mt-1 text-small text-fg-2">{p.how}</p>
          </li>
        ))}
      </ul>
      <p className="border-t border-border px-4 py-2 text-caption text-fg-3">
        Quoted from the{' '}
        <a className="text-signal-strong underline" href={SOURCES.foldout.url}>
          ROI Institute’s 12 guiding principles
        </a>
        , opened {CHECKED}.
      </p>
    </div>
  )
}

/** Kirkpatrick definitions, verbatim. */
export function SalesTrainingRoiKirkpatrick() {
  return (
    <div className={`not-prose my-8 ${box}`}>
      <ul className="divide-y divide-border">
        {LEVELS.filter((l) => l.quote).map((l) => (
          <li key={l.level} className="px-4 py-3">
            <p className="text-small text-fg-2">“{l.quote}”</p>
          </li>
        ))}
      </ul>
      <p className="border-t border-border px-4 py-2 text-caption text-fg-3">
        Definitions quoted from{' '}
        <a className="text-signal-strong underline" href={SOURCES.kirkpatrick.url}>
          Kirkpatrick Partners
        </a>
        , opened {CHECKED}.
      </p>
    </div>
  )
}
