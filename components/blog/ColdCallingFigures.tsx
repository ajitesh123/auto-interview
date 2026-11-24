import { StatRow, Flow, Figure, BarList } from '@/components/viz'
import {
  TOOLS,
  KINDS,
  RULES,
  SOURCES,
  CHECKED,
  WORKED,
  counts,
  byKind,
  yearOne,
  minuteCost,
  money,
  type Kind,
} from '@/data/aiColdCalling'

const tableWrap = 'overflow-x-auto rounded-xl border border-border bg-surface'

/** Headline counts, computed from the data file. */
export function ColdCallingStats() {
  const c = counts()
  return (
    <StatRow
      stats={[
        {
          label: 'Cold-calling tools read on their own pricing pages',
          value: String(c.tools),
          sub: `${c.agents} AI agents · ${c.parallel} parallel dialers · ${c.phone} phone systems`,
        },
        {
          label: 'Publish no price at all',
          value: String(c.hiddenPrice),
          sub: 'Synthflow, Orum, Nooks, Koncert',
        },
        {
          label: 'Max US abandoned calls per campaign, 30 days',
          value: '3%',
          sub: '47 CFR 64.1200(a)(7)',
          href: SOURCES.cfr7.url,
        },
        {
          label: 'UK fixed abandoned-call rate since 2017',
          value: 'None',
          sub: 'Ofcom 2016 statement, A4.27',
          href: SOURCES.ofcom.url,
        },
      ]}
    />
  )
}

/** The three kinds of tool, as a flow from "AI talks" to "rep dials". */
export function ColdCallingKinds() {
  const order: Kind[] = ['agent', 'parallel', 'phone']
  return (
    <Flow
      label="Three kinds of AI cold calling software, by who talks on the call"
      steps={order.map((k) => ({
        title: `${KINDS[k].label}: ${KINDS[k].short}`,
        body: KINDS[k].who,
      }))}
    />
  )
}

/** One table per kind; cards on phones. */
export function ColdCallingToolTable({ kind }: { kind: Kind }) {
  const rows = byKind(kind)
  return (
    <figure className="not-prose my-8">
      <ul className="space-y-3 sm:hidden">
        {rows.map((t) => (
          <li key={t.id} className="rounded-xl border border-border bg-surface p-4">
            <a className="font-semibold text-signal-strong underline" href={t.url}>
              {t.name}
            </a>
            {t.lines && <span className="ml-2 text-caption text-fg-3">{t.lines}</span>}
            <p className="mt-1 text-small text-fg-2">{t.what}</p>
            <p className="mt-2 text-small font-medium text-fg">{t.stated}</p>
            <p className="mt-1 text-caption text-fg-3">Best for: {t.bestFor}</p>
          </li>
        ))}
      </ul>
      <div
        role="region"
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        aria-label={`${KINDS[kind].label} tools with prices as written`}
        className={`hidden sm:block ${tableWrap}`}
      >
        <table className="w-full min-w-[36rem] text-left text-small">
          <thead className="bg-muted text-fg-2">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">
                Tool
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Price as written
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                {kind === 'agent' ? 'Calls at once' : 'Lines at once'}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((t) => (
              <tr key={t.id} className="align-top">
                <th scope="row" className="px-4 py-3 font-medium">
                  <a className="text-signal-strong underline" href={t.url}>
                    {t.name}
                  </a>
                  <span className="mt-1 block text-caption font-normal text-fg-3">{t.what}</span>
                  <span className="mt-1 block text-caption font-normal text-fg-2">
                    Best for: {t.bestFor}
                  </span>
                </th>
                <td className="px-4 py-3 text-fg">{t.stated}</td>
                <td className="px-4 py-3 text-fg-2">{t.lines ?? 'Not stated'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-caption text-fg-3">
        Read on each vendor’s own pricing or product page, {CHECKED}. Prices as written, before tax
        and phone-line costs.
      </figcaption>
    </figure>
  )
}

/** Year-one list price for the worked team, USD seat prices only (one currency per chart). */
export function ColdCallingSeatFigure() {
  const reps = WORKED.reps
  const rows = [...byKind('parallel'), ...byKind('phone')]
    .filter((t) => t.seat != null && t.lines != null && t.currency === 'USD')
    .map((t) => {
      const y = yearOne(t, reps) as number
      return {
        label: `${t.name} (${KINDS[t.kind].short.toLowerCase()})`,
        value: y,
        display: money(y),
        url: t.url,
      }
    })
    .sort((a, b) => b.value - a.value)
  const cloud = TOOLS.find((t) => t.id === 'cloudtalk')
  const cloudYear = cloud ? yearOne(cloud, reps) : null
  const lo = rows[rows.length - 1]
  const hi = rows[0]
  return (
    <Figure
      label={`Worked example · ${reps} reps · list price, year one`}
      title={`A ${reps}-rep team pays ${money(lo.value)} to ${money(hi.value)} a year for a dialer with a public price`}
      sub={`Seat price × ${reps} reps × 12 months at annual billing. CloudTalk Essential plus its parallel-dialer add-on is ${cloudYear != null ? money(cloudYear, 'EUR') : 'priced in euros'} (euros, so not on this chart). Orum, Nooks and Koncert publish no price; Dialpad Sell lists no dialer, so it is left out.`}
      source={rows.map((r) => ({ label: r.label.split(' (')[0], url: r.url }))}
      updated={CHECKED}
      table={{
        head: ['Tool', `Year one, ${reps} reps (USD)`],
        rows: rows.map((r) => [r.label, r.display]),
      }}
    >
      <BarList rows={rows.map(({ label, value, display }) => ({ label, value, display }))} />
    </Figure>
  )
}

/** What 1,000 AI minutes cost a month at published per-minute prices. */
export function ColdCallingMinuteFigure() {
  const m = WORKED.minutes
  const rows = byKind('agent')
    .flatMap((t) => {
      const c = minuteCost(t, m)
      if (!c) return []
      return c.low === c.high
        ? [{ label: t.name, value: c.low, display: money(c.low), url: t.url }]
        : [
            { label: `${t.name} (low)`, value: c.low, display: money(c.low), url: t.url },
            { label: `${t.name} (high)`, value: c.high, display: money(c.high), url: t.url },
          ]
    })
    .sort((a, b) => a.value - b.value)
  return (
    <Figure
      label={`Worked example · ${m.toLocaleString('en-US')} AI minutes a month`}
      title={`${m.toLocaleString('en-US')} minutes of an AI voice agent cost ${money(rows[0].value)} to ${money(rows[rows.length - 1].value)} at published rates`}
      sub="Per-minute prices as written. Vapi adds its listed transcriber, model, voice and Twilio ranges to the $0.05 hosting fee. Phone numbers, plan fees (Bland Build $299) and concurrency are extra."
      source={[
        ...new Map(
          rows.map((r) => [r.url, { label: r.label.split(' (')[0], url: r.url }])
        ).values(),
      ]}
      updated={CHECKED}
      table={{
        head: ['Rate', `${m.toLocaleString('en-US')} min a month (USD)`],
        rows: rows.map((r) => [r.label, r.display]),
      }}
    >
      <BarList
        rows={rows.map(({ label, value, display }) => ({ label, value, display }))}
        sort={false}
      />
    </Figure>
  )
}

const COUNTRY_NAME = { us: 'United States', uk: 'United Kingdom', in: 'India', other: 'Elsewhere' }

/** Rules that bite cold-calling tools, grouped by country, each with a quote. */
export function ColdCallingRules() {
  const order = ['us', 'uk', 'in'] as const
  return (
    <div className="not-prose my-8 space-y-6">
      {order.map((c) => (
        <section key={c} aria-labelledby={`cc-rules-${c}`} className={tableWrap}>
          <header className="border-b border-border bg-muted px-4 py-3">
            <h3 id={`cc-rules-${c}`} className="text-h4 font-semibold text-fg">
              {COUNTRY_NAME[c]}
            </h3>
          </header>
          <ul className="divide-y divide-border">
            {RULES.filter((r) => r.country === c).map((r) => (
              <li key={r.id} className="px-4 py-3">
                <p className="text-small font-medium text-fg">
                  {r.title}{' '}
                  <span className="text-caption font-normal text-fg-3">
                    · bites {r.hits.map((h) => KINDS[h].label.toLowerCase()).join(', ')}
                  </span>
                </p>
                <p className="mt-1 text-small text-fg-2">{r.plain}</p>
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
        Quotes copied from each source, opened {CHECKED}. Our plain-English reading sits above each
        quote. Not legal advice.
      </p>
    </div>
  )
}
