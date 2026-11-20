import { StatRow, Flow, Figure, BarList } from '@/components/viz'
import {
  COUNTRIES,
  VENDORS,
  SCRIPTS,
  SOURCES,
  RESEARCH,
  RATES,
  WORKED,
  CHECKED,
  COUNTS,
  monthlyMinutes,
  cost,
  money,
} from '@/data/realEstateCalling'

const tableWrap = 'overflow-x-auto rounded-xl border border-border bg-surface'

/** Headline numbers, each linked to its source. */
export function RealEstateCallingStats() {
  return (
    <StatRow
      stats={[
        {
          label: 'Lower odds of reaching a lead if you call at 30 min, not 5',
          value: `${RESEARCH.contactOdds}×`,
          sub: 'InsideSales.com with MIT · 2007',
          href: SOURCES.mit.url,
        },
        {
          label: 'Lower odds of qualifying that lead',
          value: `${RESEARCH.qualifyOdds}×`,
          sub: 'Same study',
          href: SOURCES.mit.url,
        },
        {
          label: 'US home buyers who used an agent',
          value: `${RESEARCH.buyersUseAgent}%`,
          sub: 'NAR 2026 Profile · Nov 2026',
          href: SOURCES.nar2026.url,
        },
        {
          label: 'US home sellers who used an agent',
          value: `${RESEARCH.sellersUseAgent}%`,
          sub: 'NAR 2026 Profile · Nov 2026',
          href: SOURCES.nar2026.url,
        },
      ]}
    />
  )
}

/** Which calls are safe to automate, as a flow from inbound to cold. */
export function RealEstateCallLadder() {
  return (
    <Flow
      label="From safest to riskiest for an AI voice (US and UK)"
      steps={[
        { title: 'Inbound', body: 'They call you. AI answers, qualifies, books.' },
        { title: 'Confirmations', body: 'Booked showings. No selling on the call.' },
        { title: 'Inquiries with consent', body: 'Form wording names you and covers AI calls.' },
        { title: 'Inquiries without it', body: 'A person calls back, fast.' },
        { title: 'Cold lists', body: 'Expireds, FSBOs, bought lists: a person, after DNC checks.' },
      ]}
    />
  )
}

/** The worked cost example as a bar chart (USD rates only, one currency per chart). */
export function RealEstateCostFigure() {
  const minutes = monthlyMinutes(WORKED.leads, WORKED.minutesPerLead)
  const usd = RATES.filter((r) => r.currency === 'USD')
  const inr = RATES.filter((r) => r.currency === 'INR')
  const rowsUsd = usd.flatMap((r) => {
    const k = cost(r, minutes)
    return k.low === k.high
      ? [{ label: r.label, value: k.low, display: money(k.low, 'USD') }]
      : [
          { label: `${r.label} (low)`, value: k.low, display: money(k.low, 'USD') },
          { label: `${r.label} (high)`, value: k.high, display: money(k.high, 'USD') },
        ]
  })
  const rowsInr = inr.map((r) => {
    const k = cost(r, minutes)
    return { label: r.label, value: k.low, display: money(k.low, 'INR') }
  })
  return (
    <>
      <Figure
        label={`Worked example · ${WORKED.leads} leads × ${WORKED.minutesPerLead} min = ${minutes} min a month`}
        title={`The AI minutes for ${WORKED.leads} leads cost ${money(cost(usd[0], minutes).low, 'USD')} to ${money(cost(usd[0], minutes).high, 'USD')} a month in the US`}
        sub="Per-minute prices as published. Plans, phone numbers and CRM add-ons are extra."
        source={usd.map((r) => ({
          label: r.label,
          url: VENDORS.find((v) => r.label.startsWith(v.name.split(' ')[0]))?.url,
        }))}
        updated={CHECKED}
        table={{
          head: ['Rate', 'USD a month'],
          rows: rowsUsd.map((r) => [r.label, r.display]),
        }}
      >
        <BarList rows={rowsUsd} sort={false} />
      </Figure>
      <Figure
        label={`India · same ${minutes} minutes`}
        title={`In India the same minutes cost about ${money(Math.min(...rowsInr.map((r) => r.value)), 'INR')} to ${money(Math.max(...rowsInr.map((r) => r.value)), 'INR')} before telephony and GST`}
        sub="Rupee prices as published on each vendor’s pricing page."
        source={inr.map((r) => ({
          label: r.label,
          url: VENDORS.find((v) => r.label.startsWith(v.name.split(' ')[0]))?.url,
        }))}
        updated={CHECKED}
        table={{
          head: ['Rate', 'INR a month'],
          rows: rowsInr.map((r) => [r.label, r.display]),
        }}
      >
        <BarList rows={rowsInr} />
      </Figure>
    </>
  )
}

/** Rules by country, each with a quote and a link. */
export function RealEstateRulesTable() {
  return (
    <div className="not-prose my-8 space-y-6">
      {COUNTRIES.map((c) => (
        <section key={c.id} aria-labelledby={`rules-${c.id}`} className={tableWrap}>
          <header className="border-b border-border bg-muted px-4 py-3">
            <h3 id={`rules-${c.id}`} className="text-h4 font-semibold text-fg">
              {c.name}
            </h3>
            <p className="mt-1 text-small text-fg-2">
              <span className="font-medium text-fg">Hours:</span> {c.hours}. {c.aiRule}
            </p>
          </header>
          <ul className="divide-y divide-border">
            {c.rules.map((r) => (
              <li key={r.plain} className="px-4 py-3">
                <p className="text-small font-medium text-fg">{r.plain}</p>
                <p className="mt-1 text-small text-fg-2">
                  “{r.quote}”{' '}
                  <a className="text-signal-strong underline" href={SOURCES[r.src].url}>
                    {SOURCES[r.src].label}
                  </a>
                </p>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <p className="text-caption text-fg-3">
        Quotes copied from each source, opened {CHECKED}. Our plain-English line sits above each
        quote. Not legal advice; check your state or emirate rules with counsel.
      </p>
    </div>
  )
}

/** Vendors with prices as written; ours last and labelled. */
export function RealEstateVendorTable() {
  return (
    <figure className="not-prose my-8">
      <ul className="space-y-3 sm:hidden">
        {VENDORS.map((v) => (
          <li key={v.name} className="rounded-xl border border-border bg-surface p-4">
            <a className="font-semibold text-signal-strong underline" href={v.url}>
              {v.name}
            </a>
            <span className="ml-2 text-caption text-fg-3">{v.market}</span>
            <p className="mt-1 text-small text-fg-2">{v.what}</p>
            <p className="mt-2 text-small font-medium text-fg">{v.stated}</p>
          </li>
        ))}
      </ul>
      <div
        role="region"
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        aria-label="AI calling tools sold to real estate, with prices as written"
        className={`hidden sm:block ${tableWrap}`}
      >
        <table className="w-full min-w-[46rem] text-left text-small">
          <thead className="bg-muted text-fg-2">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">
                Tool
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Market
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                What it does
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Price as written
              </th>
            </tr>
          </thead>
          <tbody>
            {VENDORS.map((v) => (
              <tr key={v.name} className="border-t border-border align-top">
                <th scope="row" className="px-4 py-3 font-semibold text-fg">
                  <a className="text-signal-strong underline" href={v.url}>
                    {v.name}
                  </a>
                </th>
                <td className="px-4 py-3 text-fg-2">{v.market}</td>
                <td className="px-4 py-3 text-fg">{v.what}</td>
                <td className="px-4 py-3 text-fg">{v.stated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-caption text-fg-3">
        {COUNTS.vendors} tools; {COUNTS.priced} publish a price. Prices read on each vendor’s own
        page on {CHECKED}, as written, no conversion. Tough Tongue AI is our product and is listed
        last, not ranked.
      </figcaption>
    </figure>
  )
}

/** Five call scripts, server-rendered in <details>. */
export function RealEstateScripts() {
  return (
    <div className="not-prose my-8 space-y-3" id="scripts">
      {SCRIPTS.map((s, i) => (
        <details
          key={s.id}
          className="group rounded-xl border border-border bg-surface p-4 open:shadow-e1"
          open={i === 0}
        >
          <summary className="flex cursor-pointer list-none flex-wrap items-baseline justify-between gap-2">
            <span className="text-h4 font-semibold text-fg">{s.title}</span>
            <span className="text-small text-fg-2">{s.when}</span>
          </summary>
          <p className="mt-3 text-caption text-fg-2">
            <span className="font-medium text-fg">Before you automate it:</span> {s.consentNeeded}
          </p>
          <ol className="mt-3 space-y-2">
            {s.lines.map((l, j) => (
              <li key={l} className="flex gap-3 text-small text-fg">
                <span className="mt-0.5 font-mono text-caption text-signal-strong">{j + 1}</span>
                <span>{l}</span>
              </li>
            ))}
          </ol>
          <p className="mt-3 rounded-lg bg-muted p-3 text-small text-fg">
            <span className="font-medium">Hand off:</span> {s.handoff}
          </p>
        </details>
      ))}
      <p className="text-caption text-fg-3">
        Scripts written by us, with invented names and addresses. Each opens with who is calling and
        that it is an AI assistant.
      </p>
    </div>
  )
}
