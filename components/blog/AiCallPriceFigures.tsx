import { StatRow, Figure, BarList, RangeList } from '@/components/viz'
import {
  PLATFORMS,
  PRICED,
  CARRIER,
  FX,
  CHECKED,
  COUNTS,
  WORKED,
  allIn,
  monthly,
  toUsd,
  money,
  perMin,
} from '@/data/aiCallPrice'

const usdRange = (id: string) => {
  const p = PLATFORMS.find((x) => x.id === id)!
  const a = allIn(p)!
  return { p, low: toUsd(a.low, p.currency), high: toUsd(a.high, p.currency), a }
}

const median = (xs: number[]) => {
  const s = [...xs].sort((a, b) => a - b)
  const m = Math.floor(s.length / 2)
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2
}

const RANGES = PRICED.map((p) => usdRange(p.id))
const USD_ONLY = RANGES.filter((r) => r.p.currency === 'USD')
const INR_ONLY = RANGES.filter((r) => r.p.currency === 'INR')
export const MEDIAN_MID = median(USD_ONLY.map((r) => (r.low + r.high) / 2))
const LOWEST_USD = USD_ONLY.reduce((a, b) => (b.low < a.low ? b : a))
const HIGHEST_USD = USD_ONLY.reduce((a, b) => (b.high > a.high ? b : a))
const LOWEST_ALL = Math.min(...RANGES.map((r) => r.low))
const INR_LOW = Math.min(...INR_ONLY.map((r) => r.a.low))
const INR_HIGH = Math.max(...INR_ONLY.map((r) => r.a.high))

/** Headline numbers, computed from the price data. */
export function AiCallPriceStats() {
  return (
    <StatRow
      stats={[
        {
          label: 'Middle of the US range, all-in per minute',
          value: `$${MEDIAN_MID.toFixed(2)}`,
          sub: `Median of ${USD_ONLY.length} platforms we could price fully`,
        },
        {
          label: 'Lowest US all-in we could build',
          value: perMin(LOWEST_USD.low, 'USD'),
          sub: LOWEST_USD.p.name,
          href: LOWEST_USD.p.url,
        },
        {
          label: 'India, per minute before GST',
          value: `₹${INR_LOW.toFixed(2)}–₹${INR_HIGH.toFixed(2)}`,
          sub: INR_ONLY.map((r) => r.p.name.split(' ')[0]).join(' and '),
        },
        {
          label: 'Platforms that publish no price',
          value: `${COUNTS.quoteOnly} of ${COUNTS.platforms}`,
          sub: `Checked ${CHECKED}`,
        },
      ]}
    />
  )
}

/** All-in per minute ranges on one dollar scale. */
export function AiCallPriceRanges() {
  const rows = [...RANGES]
    .sort((a, b) => a.high - b.high || a.low - b.low)
    .map((r) => ({
      label: r.p.name,
      sub:
        r.p.currency === 'INR'
          ? `₹${r.a.low.toFixed(2)}–₹${r.a.high.toFixed(2)} as priced`
          : r.p.model === 'bundled'
            ? 'One rate + phone line'
            : 'Platform + models + phone line',
      min: r.low,
      max: r.high,
      mid: (r.low + r.high) / 2,
      display:
        r.low === r.high
          ? perMin(r.low, 'USD')
          : `${perMin(r.low, 'USD')}–${perMin(r.high, 'USD')}`,
      href: r.p.url,
    }))
  return (
    <Figure
      label={`All-in price per minute · ${rows.length} platforms`}
      title={`Before GST, an all-in AI call minute runs from ${perMin(LOWEST_ALL, 'USD')} in India to ${perMin(HIGHEST_USD.high, 'USD')} in the US`}
      sub={`Each band is a cheap and a typical setup rebuilt from the vendor's own line items. Where the phone line is billed separately and the vendor sells none, we add ${CARRIER.label} at $${CARRIER.perMin}/min. Rupee prices converted at ₹${FX.inrPerUsd} per dollar, before GST.`}
      legend={[
        { label: 'Cheap to typical setup', kind: 'bar', color: '#94A8FF' },
        { label: 'Middle', kind: 'dot', color: '#141D52' },
        { label: 'Median of US platforms', kind: 'rule', color: '#737373' },
      ]}
      source={[
        ...RANGES.map((r) => ({ label: r.p.name, url: r.p.url })),
        { label: 'Exchange rate', url: FX.url },
      ]}
      updated={CHECKED}
      table={{
        head: ['Platform', 'USD per minute, cheap', 'USD per minute, typical'],
        rows: rows.map((r) => [r.label, perMin(r.min, 'USD'), perMin(r.max, 'USD')]),
      }}
    >
      <RangeList
        rows={rows}
        format={{ prefix: '$', decimals: 2 }}
        rule={{ value: MEDIAN_MID, label: `Median $${MEDIAN_MID.toFixed(2)}` }}
      />
    </Figure>
  )
}

/** Where one minute goes, on the most itemised bill (Retell, typical setup). */
export function AiCallMinuteBreakdown() {
  const { p, a } = usdRange('retell')
  const rows = p.high.map((l) => ({
    label: l.label,
    value: l.perMin,
    display: perMin(l.perMin, 'USD'),
  }))
  return (
    <Figure
      label="One minute, line by line · Retell AI typical setup"
      title={`The platform fee is about a third of a ${perMin(a.high, 'USD')} minute; the model, the voice and the phone line are the rest`}
      sub="Retell prints every part of the minute separately, which makes it the clearest bill to read. Other platforms bundle some of these lines."
      source={[{ label: 'Retell AI pricing', url: p.url }]}
      updated={CHECKED}
      table={{ head: ['Line', 'USD per minute'], rows: rows.map((r) => [r.label, r.display]) }}
    >
      <BarList rows={rows} format={{ prefix: '$', decimals: 3 }} />
    </Figure>
  )
}

/** Worked month: 1,000 connected calls × 3 minutes. */
export function AiCallWorkedMonth() {
  const rows = PRICED.map((p) => monthly(p, WORKED)!)
    .sort((a, b) => a.highUsd - b.highUsd)
    .map((r) => ({
      label: r.name,
      value: r.highUsd,
      display:
        r.currency === 'INR'
          ? `${money(r.highNative, 'INR', 0)} (${money(r.highUsd, 'USD', 0)})`
          : money(r.highUsd, 'USD', 0),
    }))
  const mins = WORKED.calls * WORKED.minutes
  return (
    <Figure
      label={`Worked month, typical setup · ${WORKED.calls.toLocaleString('en-US')} answered calls × ${WORKED.minutes} min = ${mins.toLocaleString('en-US')} min`}
      title={`The same ${mins.toLocaleString('en-US')} minutes cost ${rows[0].display} to ${rows[rows.length - 1].display} a month, depending on the platform`}
      sub="Bars show the typical setup. Rupee prices before GST. No plan fees, phone-number rental or volume discounts."
      source={PRICED.map((p) => ({ label: p.name, url: p.url }))}
      updated={CHECKED}
      table={{ head: ['Platform', 'A month'], rows: rows.map((r) => [r.label, r.display]) }}
    >
      <BarList rows={rows} sort={false} format={{ prefix: '$', decimals: 0 }} />
    </Figure>
  )
}

/** Every platform, price as written, what it covers, what you add. */
export function AiCallPriceTable() {
  return (
    <>
      <ul className="not-prose my-6 divide-y divide-border border-y border-border md:hidden">
        {PLATFORMS.map((p) => (
          <li key={p.id} className="py-4 text-small">
            <a
              href={p.url}
              target="_blank"
              rel="noopener"
              className="font-medium text-fg underline"
            >
              {p.name}
            </a>
            <span className="mt-1 block text-fg">{p.stated}</span>
            <span className="mt-1 block text-fg-2">Covers: {p.covers}</span>
            <span className="mt-0.5 block text-fg-2">You add: {p.extra}</span>
            {p.note ? <span className="mt-0.5 block text-caption text-fg-3">{p.note}</span> : null}
          </li>
        ))}
      </ul>
      <div className="not-prose my-6 hidden overflow-x-auto rounded-xl border border-border bg-surface md:block">
        <table className="w-full min-w-[56rem] text-left text-small">
          <caption className="sr-only">
            AI voice agent prices as published, checked {CHECKED}
          </caption>
          <thead className="border-b border-border text-fg-2">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">
                Platform
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Price as written
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                The rate covers
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                You add
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {PLATFORMS.map((p) => (
              <tr key={p.id} className="align-top">
                <th scope="row" className="px-4 py-3 font-medium text-fg">
                  <a href={p.url} target="_blank" rel="noopener" className="underline">
                    {p.name}
                  </a>
                </th>
                <td className="px-4 py-3 text-fg">{p.stated}</td>
                <td className="px-4 py-3 text-fg-2">{p.covers}</td>
                <td className="px-4 py-3 text-fg-2">
                  {p.extra}
                  {p.note ? (
                    <span className="mt-1 block text-caption text-fg-3">{p.note}</span>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
