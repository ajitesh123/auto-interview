import { StatRow, Flow, Figure, BarList } from '@/components/viz'
import {
  SOURCES,
  CHECKED,
  WORKED,
  PLANS,
  QUOTE_ONLY,
  PRESETS,
  FACTS,
  GONG,
  compute,
  planRows,
  gongFunnel,
  money,
  type Currency,
} from '@/data/aiSdrVsHuman'

const box = 'not-prose my-8 overflow-x-auto rounded-xl border border-border bg-surface'
const th = 'px-4 py-3 text-left text-caption font-semibold uppercase tracking-[0.04em] text-fg-3'
const td = 'px-4 py-3 align-top text-small text-fg-2'
const ext = { target: '_blank', rel: 'noopener noreferrer' } as const
const fmt1 = (n: number) => n.toFixed(1)

/** Headline facts, each linked to its source. */
export function AiSdrStats() {
  return (
    <StatRow
      stats={[
        {
          label: 'Median US SDR on-target pay',
          value: FACTS.ote,
          sub: `${FACTS.split} · The Bridge Group, 2025`,
          href: SOURCES.bridge.url,
        },
        {
          label: 'SDRs at quota',
          value: FACTS.atQuota,
          sub: 'Lowest in the study’s history · The Bridge Group',
          href: SOURCES.bridge.url,
        },
        {
          label: 'Average SDR ramp',
          value: FACTS.ramp,
          sub: `Average tenure ${FACTS.tenure} · The Bridge Group`,
          href: SOURCES.bridgeRamp.url,
        },
        {
          label: 'Sellers who will say AI agents made them more productive, by 2028',
          value: '<40%',
          sub: 'Gartner prediction, Nov 2025',
          href: SOURCES.gartner.url,
        },
      ]}
    />
  )
}

/** Break-even meetings a month for every plan with a published price. */
export function AiSdrBreakEven() {
  const h = compute(WORKED)
  const rows = planRows()
    .filter((r) => r.breakEven !== null)
    .map((r) => ({
      label: r.plan.name,
      value: r.breakEven as number,
      display: `${fmt1(r.breakEven as number)} a month`,
      note: `${money(r.aiCost as number, 'USD')} a year incl. oversight`,
    }))
  const lo = Math.min(...rows.map((r) => r.value))
  const hi = Math.max(...rows.map((r) => r.value))
  return (
    <Figure
      label={`US · ${WORKED.contacts.toLocaleString('en-US')} new contacts a month · year one`}
      title={`On list prices, an AI SDR needs only ${fmt1(lo)}–${fmt1(hi)} held meetings a month to match a human SDR’s ${money(h.humanPerMeeting as number, 'USD')} per meeting`}
      sub={`A median US SDR costs ${money(h.humanCost, 'USD')} in year one and holds ${h.humanMeetings} meetings at the median quota. Each AI plan’s cost includes ${WORKED.oversightHours} hours a week of a person checking its work. Price is rarely what decides it: whether the meetings come, and whether they are worth having, is.`}
      source={[
        { label: 'Vendor pricing pages (see table)' },
        { label: SOURCES.bridge.label, url: SOURCES.bridge.url },
        { label: SOURCES.bls.label, url: SOURCES.bls.url },
      ]}
      updated={CHECKED}
      table={{
        head: ['AI SDR plan', 'Year-one cost (USD)', 'Meetings a month to break even'],
        rows: planRows()
          .filter((r) => r.breakEven !== null)
          .map((r) => [r.plan.name, money(r.aiCost as number, 'USD'), fmt1(r.breakEven as number)]),
      }}
    >
      <BarList rows={rows} />
    </Figure>
  )
}

/** The same AI plan as a share of one human SDR, by country. */
export function AiSdrByCountry() {
  const rows = (['USD', 'GBP', 'INR'] as Currency[]).map((c) => {
    const r = compute(PRESETS[c].inputs)
    const share = ((r.aiCost as number) / r.humanCost) * 100
    return {
      c,
      label: { USD: 'United States', GBP: 'United Kingdom', INR: 'India' }[c],
      share,
      human: r.humanCost,
      ai: r.aiCost as number,
    }
  })
  return (
    <Figure
      label="AiSDR pay-as-you-go, 1,000 contacts a month, vs one median SDR · year one"
      title={`The same AI SDR costs ${Math.round(rows[0].share)}% of a US SDR but ${Math.round(rows[2].share)}% of an Indian one`}
      sub="AI SDRs are priced in dollars; people are paid in local currency. In India the dollar price plus a few hours a week of oversight is about the cost of the person it is meant to replace (Indian pay here is before EPF and gratuity)."
      source={[
        { label: SOURCES.bridge.label, url: SOURCES.bridge.url },
        { label: SOURCES.repvueUK.label, url: SOURCES.repvueUK.url },
        { label: SOURCES.repvueIN.label, url: SOURCES.repvueIN.url },
        { label: SOURCES.fxInr.label, url: SOURCES.fxInr.url },
        { label: SOURCES.fxGbp.label, url: SOURCES.fxGbp.url },
      ]}
      updated={CHECKED}
      table={{
        head: ['Country', 'One SDR, year one', 'AI SDR, year one', 'AI as % of SDR'],
        rows: rows.map((r) => [
          r.label,
          money(r.human, r.c),
          money(r.ai, r.c),
          `${Math.round(r.share)}%`,
        ]),
      }}
    >
      <BarList
        rows={rows.map((r) => ({
          label: r.label,
          value: r.share,
          display: `${Math.round(r.share)}%`,
          note: `${money(r.ai, r.c)} vs ${money(r.human, r.c)}`,
          highlight: r.c === 'INR',
        }))}
        sort={false}
        emphasis
      />
    </Figure>
  )
}

/** The worked example as a table whose lines add up. */
export function AiSdrWorked() {
  const i = WORKED
  const r = compute(i)
  const lines: [string, string, string][] = [
    [
      'Human SDR: pay',
      `${money(i.base, 'USD')} base + ${money(i.variable, 'USD')} variable`,
      money(r.pay, 'USD'),
    ],
    [
      'Employer benefits',
      'Benefits are 30.0% of total compensation (BLS, June 2026), so 30/70 of pay',
      money(r.statutory, 'USD'),
    ],
    [
      'Year-one cost',
      'Tools and manager time left at $0 here, as are the AI side’s mailboxes and data: add yours in the calculator',
      money(r.humanCost, 'USD'),
    ],
    [
      'Meetings held',
      `${i.meetingsPerMonth} a month × (12 − ${i.rampMonths} ÷ 2 ramp months)`,
      String(r.humanMeetings),
    ],
    [
      'Human cost per meeting',
      `${money(r.humanCost, 'USD')} ÷ ${r.humanMeetings}`,
      money(r.humanPerMeeting as number, 'USD'),
    ],
    [
      'AI SDR: licence',
      `AiSDR, $1.50 × ${i.contacts.toLocaleString('en-US')} contacts × 12`,
      money(r.licence as number, 'USD'),
    ],
    [
      'Oversight',
      `${i.oversightHours} h a week × 52 × ${money(r.rate, 'USD')} an hour (the SDR’s loaded hourly cost)`,
      money(r.oversight, 'USD'),
    ],
    ['AI year-one cost', 'Licence + oversight', money(r.aiCost as number, 'USD')],
    [
      'Break-even',
      `${money(r.aiCost as number, 'USD')} ÷ ${money(r.humanPerMeeting as number, 'USD')} ÷ 12`,
      `${fmt1(r.breakEven as number)} meetings a month`,
    ],
    [
      'If it holds 1 per 100 contacts',
      `${r.aiMeetings} held meetings a year (AiSDR claims 1–3 booked per 100; held will be lower)`,
      `${money(r.aiPerMeeting as number, 'USD')} a meeting`,
    ],
  ]
  return (
    <div className={box}>
      <table className="w-full min-w-[560px] border-collapse">
        <caption className="px-4 pt-4 text-left text-small font-semibold text-fg">
          Worked example: one median US SDR vs one AI SDR, year one
        </caption>
        <thead>
          <tr className="border-b border-border">
            <th className={th}>Line</th>
            <th className={th}>How</th>
            <th className={`${th} text-right`}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {lines.map(([a, b, c]) => (
            <tr key={a} className="border-b border-border last:border-0">
              <td className={`${td} font-medium text-fg`}>{a}</td>
              <td className={td}>{b}</td>
              <td className={`${td} whitespace-nowrap text-right tabular-nums text-fg`}>{c}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** Every AI SDR whose price we could read, as written. */
export function AiSdrPlansTable() {
  return (
    <>
      <div className={box}>
        <table className="w-full min-w-[720px] border-collapse">
          <caption className="px-4 pt-4 text-left text-small font-semibold text-fg">
            AI SDR prices as each vendor publishes them (read {CHECKED})
          </caption>
          <thead>
            <tr className="border-b border-border">
              <th className={th}>Agent</th>
              <th className={th}>Price as written</th>
              <th className={th}>Term</th>
              <th className={th}>Channels</th>
              <th className={th}>Books meetings?</th>
            </tr>
          </thead>
          <tbody>
            {PLANS.map((p) => (
              <tr key={p.id} className="border-b border-border last:border-0">
                <td className={`${td} font-medium text-fg`}>
                  <a
                    href={p.url}
                    {...ext}
                    className="text-signal-strong underline underline-offset-2"
                  >
                    {p.name}
                  </a>
                </td>
                <td className={td}>
                  {p.priceAsWritten}
                  {p.excludes && (
                    <span className="block text-caption text-fg-3">Excludes: {p.excludes}</span>
                  )}
                </td>
                <td className={td}>{p.term}</td>
                <td className={td}>{p.channels}</td>
                <td className={td}>{p.books}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="not-prose -mt-4 mb-8 text-small text-fg-2">
        <span className="font-medium text-fg">No price on the page: </span>
        {QUOTE_ONLY.map((q, n) => (
          <span key={q.name}>
            <a href={q.url} {...ext} className="text-signal-strong underline underline-offset-2">
              {q.name}
            </a>{' '}
            ({q.note}){n < QUOTE_ONLY.length - 1 ? '; ' : '.'}
          </span>
        ))}
      </p>
    </>
  )
}

/** Gong's cold-call funnel for human callers, per 1,000 dials. */
export function AiSdrGongFunnel() {
  const a = gongFunnel(1000, GONG.avg)
  const t = gongFunnel(1000, GONG.top)
  return (
    <div className={box}>
      <table className="w-full min-w-[480px] border-collapse">
        <caption className="px-4 pt-4 text-left text-small font-semibold text-fg">
          1,000 cold dials by a human caller, on Gong’s rates from 300M+ calls
        </caption>
        <thead>
          <tr className="border-b border-border">
            <th className={th}>Caller</th>
            <th className={th}>Connect rate</th>
            <th className={th}>Conversations</th>
            <th className={th}>Meetings per conversation</th>
            <th className={`${th} text-right`}>Meetings</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['Average rep', GONG.avg, a],
            ['Top-quartile rep', GONG.top, t],
          ].map(([label, f, r]) => {
            const ff = f as typeof GONG.avg
            const rr = r as typeof a
            return (
              <tr key={label as string} className="border-b border-border last:border-0">
                <td className={`${td} font-medium text-fg`}>{label as string}</td>
                <td className={`${td} tabular-nums`}>{ff.connect}%</td>
                <td className={`${td} tabular-nums`}>{Math.round(rr.conversations)}</td>
                <td className={`${td} tabular-nums`}>{ff.meeting}%</td>
                <td className={`${td} text-right tabular-nums text-fg`}>{fmt1(rr.meetings)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <p className="px-4 pb-4 text-caption text-fg-3">
        Source:{' '}
        <a href={SOURCES.gong.url} {...ext} className="underline underline-offset-2">
          {SOURCES.gong.label}
        </a>
        . Gong measures the meeting rate per conversation, not per dial.
      </p>
    </div>
  )
}

/** A 60-day pilot that answers the only question list prices can’t. */
export function AiSdrPilot() {
  return (
    <Flow
      label="A 60-day AI SDR pilot"
      steps={[
        {
          title: 'Week 0: split the list',
          body: 'Take one segment, split accounts at random: half to the AI SDR, half to a human SDR. Same offer, same calendar.',
        },
        {
          title: 'Weeks 1–2: review every message',
          body: 'A person approves what the agent sends. Log the hours: that is your oversight cost.',
        },
        {
          title: 'Weeks 3–8: count held meetings',
          body: 'Booked is not held. Count meetings that happened and that the AE marks as a real opportunity.',
        },
        {
          title: 'Day 60: compare cost per held meeting',
          body: 'Put both arms in the calculator. Check spam complaints and domain health before you scale.',
        },
      ]}
    />
  )
}
