import { StatRow, Flow } from '@/components/viz'
import {
  COUNTRIES,
  SOURCES,
  VERDICTS,
  CHECKED,
  grid,
  counts,
  type Verdict,
} from '@/data/aiCallingLaws'

const wrap = 'overflow-hidden rounded-2xl border border-border bg-surface'

const CHIP: Record<Verdict, string> = {
  go: 'bg-success-soft text-success-strong ring-success/30',
  conditions: 'bg-warn-soft text-fg ring-warn/40',
  human: 'bg-danger-soft text-fg ring-danger/30',
}

function Chip({ v }: { v: Verdict }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-caption font-medium ring-1 ring-inset ${CHIP[v]}`}
    >
      {VERDICTS[v].short}
    </span>
  )
}

/** Headline counts, computed from the rules data. */
export function AiCallingLawsStats() {
  const k = counts()
  return (
    <StatRow
      stats={[
        {
          label: 'Countries where an AI cold call to consumers needs consent first',
          value: `${k.needConsent.length} of ${k.countries}`,
          sub: k.needConsent.join(', '),
        },
        {
          label: 'Where the same is true for B2B calls to mobiles',
          value: `${k.b2bNeed.length} of ${k.countries}`,
          sub: k.b2bNeed.join(', '),
        },
        {
          label: 'Where a law already says the caller must disclose it is an AI',
          value: `${k.discloseLaw} of ${k.countries}`,
          sub: 'EU AI Act Art. 50, from 2 Aug 2026',
          href: SOURCES.aiAct50.url,
        },
        {
          label: 'Rules quoted from regulators and statutes',
          value: String(k.rules),
          sub: `Opened ${CHECKED}`,
        },
      ]}
    />
  )
}

/** The verdict grid: four common calls × eight countries, computed by the call check. */
export function AiCallingVerdictGrid() {
  const g = grid()
  return (
    <figure className="not-prose my-8">
      <figcaption className="mb-3">
        <span className="block text-h4 font-semibold text-fg">
          AI cold calls without consent are off-limits in the US, Canada, the UK and Germany; India,
          the UAE, Australia and Singapore allow them with conditions
        </span>
        <span className="mt-1 block text-small text-fg-2">
          Each cell is the call check’s verdict for that call. “Needs consent” means a person should
          dial instead, or you get consent first.
        </span>
      </figcaption>

      {/* Phones: one card per country */}
      <ul className="space-y-3 sm:hidden">
        {COUNTRIES.map((c, ci) => (
          <li key={c.id} className="rounded-xl border border-border bg-surface p-4">
            <p className="font-semibold text-fg">{c.name}</p>
            <dl className="mt-2 space-y-2">
              {g.map((row) => (
                <div key={row.id} className="flex items-start justify-between gap-3">
                  <dt className="min-w-0 text-small text-fg-2">{row.label}</dt>
                  <dd className="shrink-0">
                    <Chip v={row.cells[ci]} />
                  </dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>

      <div
        role="region"
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        aria-label="Verdict by country for four common AI calls"
        className={`hidden sm:block ${wrap} overflow-x-auto`}
      >
        <table className="w-full min-w-[44rem] text-left text-small">
          <thead className="bg-muted text-fg-2">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">
                Country
              </th>
              {g.map((row) => (
                <th key={row.id} scope="col" className="px-3 py-3 font-medium">
                  {row.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {COUNTRIES.map((c, ci) => (
              <tr key={c.id}>
                <th scope="row" className="px-4 py-3 font-medium text-fg">
                  <a
                    className="underline decoration-border-strong underline-offset-2 hover:decoration-signal"
                    href={`#law-${c.id}`}
                  >
                    {c.name}
                  </a>
                </th>
                {g.map((row) => (
                  <td key={row.id} className="px-3 py-3">
                    <Chip v={row.cells[ci]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-caption text-fg-3">
        Source: our reading of {counts().rules} rules quoted below, opened {CHECKED}. Not legal
        advice.
      </p>
    </figure>
  )
}

/** One row per country: the short answer, disclosure, hours, register, penalty. */
export function AiCallingLawsTable() {
  return (
    <figure className="not-prose my-8">
      <ul className="space-y-3 md:hidden">
        {COUNTRIES.map((c) => (
          <li key={c.id} className="rounded-xl border border-border bg-surface p-4">
            <p className="font-semibold text-fg">{c.name}</p>
            <dl className="mt-2 space-y-1.5 text-small">
              <div>
                <dt className="inline font-medium text-fg">Say it’s AI? </dt>
                <dd className="inline text-fg-2">{c.disclose}</dd>
              </div>
              <div>
                <dt className="inline font-medium text-fg">Hours: </dt>
                <dd className="inline text-fg-2">{c.hours}</dd>
              </div>
              <div>
                <dt className="inline font-medium text-fg">Register: </dt>
                <dd className="inline text-fg-2">{c.register}</dd>
              </div>
              {c.penalty && (
                <div>
                  <dt className="inline font-medium text-fg">Penalty: </dt>
                  <dd className="inline text-fg-2">
                    <a className="underline" href={SOURCES[c.penalty.src].url}>
                      {c.penalty.text}
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </li>
        ))}
      </ul>
      <div
        role="region"
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        aria-label="AI calling rules by country: disclosure, hours, register, penalty"
        className={`hidden md:block ${wrap} overflow-x-auto`}
      >
        <table className="w-full min-w-[52rem] text-left text-small">
          <thead className="bg-muted text-fg-2">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">
                Country
              </th>
              <th scope="col" className="px-3 py-3 font-medium">
                Must it say it is an AI?
              </th>
              <th scope="col" className="px-3 py-3 font-medium">
                Calling hours
              </th>
              <th scope="col" className="px-3 py-3 font-medium">
                Do-not-call register
              </th>
              <th scope="col" className="px-3 py-3 font-medium">
                Largest penalty we sourced
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border align-top">
            {COUNTRIES.map((c) => (
              <tr key={c.id}>
                <th scope="row" className="px-4 py-3 font-medium text-fg">
                  {c.name}
                </th>
                <td className="px-3 py-3 text-fg-2">{c.disclose}</td>
                <td className="px-3 py-3 text-fg-2">{c.hours}</td>
                <td className="px-3 py-3 text-fg-2">{c.register}</td>
                <td className="px-3 py-3 text-fg-2">
                  {c.penalty ? (
                    <a className="underline" href={SOURCES[c.penalty.src].url}>
                      {c.penalty.text}
                    </a>
                  ) : (
                    'Not checked for this page'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  )
}

/** Country cards: the one-line answer, then each rule in plain English over its quote. */
export function AiCallingLawsByCountry() {
  return (
    <div className="not-prose my-8 space-y-4">
      {COUNTRIES.map((c, i) => (
        <details
          key={c.id}
          id={`law-${c.id}`}
          open={i === 0}
          className={`group scroll-mt-24 ${wrap}`}
        >
          <summary className="cursor-pointer list-none px-4 py-4 transition-colors duration-fast hover:bg-muted [&::-webkit-details-marker]:hidden">
            <span className="flex items-start justify-between gap-3">
              <span className="min-w-0">
                <span className="block text-h4 font-semibold text-fg">{c.name}</span>
                <span className="mt-1 block text-small text-fg-2">{c.answer}</span>
              </span>
              <span
                aria-hidden="true"
                className="mt-1 shrink-0 font-mono text-small text-signal-strong transition-transform duration-fast group-open:rotate-45"
              >
                +
              </span>
            </span>
          </summary>
          <ul className="divide-y divide-border border-t border-border">
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
        </details>
      ))}
      <p className="text-caption text-fg-3">
        Quotes copied from each source, opened {CHECKED}; German quotes in the original. Our
        plain-English line sits above each quote. Not legal advice.
      </p>
    </div>
  )
}

/** What to set up before an AI dials anyone. */
export function AiCallingPreDial() {
  return (
    <Flow
      label="Before an AI dials: five checks, in order"
      steps={[
        {
          title: 'Where and who',
          body: 'Country of the person called, consumer or business, mobile or landline.',
        },
        {
          title: 'Consent',
          body: 'Wording that names you and covers AI or automated calls, stored with the lead.',
        },
        { title: 'Registers', body: 'DNC, TPS, DNCR or DND checks where the call needs them.' },
        {
          title: 'Opening line',
          body: 'Business name, that it is an AI, why you call, how to stop.',
        },
        {
          title: 'Stop and log',
          body: 'Honour opt-outs at once; keep call, consent and opt-out records.',
        },
      ]}
    />
  )
}
