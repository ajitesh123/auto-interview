import { StatRow, Flow } from '@/components/viz'
import {
  OBJECTIONS,
  GROUPS,
  FRAMEWORKS,
  SOURCES,
  GONG,
  SALESFORCE,
  COUNTS,
  CHECKED,
  type Group,
} from '@/data/objectionHandling'

const tableWrap = 'overflow-x-auto rounded-xl border border-border bg-surface'

/** Headline numbers, each linked to its source or computed from the data file. */
export function ObjectionStats() {
  return (
    <StatRow
      stats={[
        {
          label: 'Cold-call objections that are brush-offs',
          value: `${GONG.dismissive}%`,
          sub: 'Gong · 300M+ cold calls · 2024',
          href: SOURCES.gong300m.url,
        },
        {
          label: 'Average rep’s answer to an objection',
          value: `${GONG.avgMonologueSec} s`,
          sub: `Gong · ${GONG.demoCalls.toLocaleString('en-US')} recorded demos · 2018`,
          href: SOURCES.gongDemos.url,
        },
        {
          label: 'Reps who say they get too few roleplays',
          value: `${SALESFORCE.roleplayTooFew}%`,
          sub: `Salesforce · sales reps in a ${SALESFORCE.sellers.toLocaleString('en-US')}-person survey · 2025`,
          href: SOURCES.salesforce.url,
        },
        {
          label: 'Objection cards on this page',
          value: String(COUNTS.objections),
          sub: `${COUNTS.fromGong} worded as Gong lists them`,
        },
      ]}
    />
  )
}

/** The five moves of one answer. */
export function ObjectionAnswerFlow() {
  return (
    <Flow
      label="One answer · under 20 seconds · 5 moves"
      steps={[
        {
          title: 'Pause',
          body: 'One breath. Gong’s successful reps paused longer after objections.',
        },
        { title: 'Agree', body: '“That’s fair.” A full stop, never “but”.' },
        { title: 'Ask', body: 'One question that finds what the objection really means.' },
        { title: 'Answer', body: 'One sentence with one concrete detail, about them.' },
        { title: 'Next step', body: 'Ask for the smallest yes: a question, a time, a name.' },
      ]}
    />
  )
}

/** Every objection, grouped by Gong's three kinds, server-rendered in <details>. */
export function ObjectionLibrary() {
  const groups = Object.keys(GROUPS) as Group[]
  let n = 0
  return (
    <div className="not-prose my-8 space-y-8" id="library">
      {groups.map((g) => {
        const list = OBJECTIONS.filter((o) => o.group === g)
        return (
          <section key={g} aria-labelledby={`grp-${g}`}>
            <h3 id={`grp-${g}`} className="text-h4 font-semibold text-fg">
              {GROUPS[g].label} <span className="font-normal text-fg-3">· {list.length}</span>
            </h3>
            <p className="mt-1 max-w-prose text-small text-fg-2">{GROUPS[g].blurb}</p>
            <div className="mt-3 space-y-2">
              {list.map((o) => {
                n += 1
                return (
                  <details
                    key={o.id}
                    id={`obj-${o.id}`}
                    className="group scroll-mt-24 rounded-xl border border-border bg-surface open:shadow-e1"
                    open={n <= 2}
                  >
                    <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 md:px-5">
                      <span className="min-w-0">
                        <span className="mr-2 font-mono text-caption text-fg-3">
                          {String(n).padStart(2, '0')}
                        </span>
                        <span className="font-medium text-fg">“{o.line}”</span>
                      </span>
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 20 20"
                        className="h-4 w-4 shrink-0 text-fg-3 transition-transform duration-base group-open:rotate-180"
                      >
                        <path
                          d="M5 7.5l5 5 5-5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.75"
                        />
                      </svg>
                    </summary>
                    <dl className="grid gap-3 border-t border-border px-4 py-4 text-small md:grid-cols-[9rem_1fr] md:px-5">
                      <dt className="font-medium text-fg-2">Often means</dt>
                      <dd className="text-fg">{o.means}</dd>
                      <dt className="font-medium text-fg-2">Ask first</dt>
                      <dd className="text-fg">“{o.ask}”</dd>
                      <dt className="font-medium text-fg-2">Sample answer</dt>
                      <dd className="rounded-lg bg-signal-tint px-3 py-2 text-fg ring-1 ring-inset ring-signal/15">
                        “{o.answer}”
                      </dd>
                      <dt className="font-medium text-fg-2">Don’t say</dt>
                      <dd className="text-fg">{o.avoid}</dd>
                      <dt className="font-medium text-fg-2">Ask for</dt>
                      <dd className="text-fg">{o.next}</dd>
                    </dl>
                    <p className="px-4 pb-4 text-caption text-fg-3 md:px-5">
                      {o.origin === 'gong' ? (
                        <>
                          Objection worded as{' '}
                          <a className="underline" href={SOURCES.gong300m.url}>
                            Gong lists it
                          </a>
                          . Meaning, question and answer written by us.
                        </>
                      ) : (
                        'Written by us. Rules for stop requests are in the table below.'
                      )}{' '}
                      <a className="text-signal-strong underline" href={`#checker`}>
                        Test your own answer
                      </a>
                    </p>
                  </details>
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}

/** What the rules say when a prospect asks you to stop calling. */
export function StopRulesTable() {
  const rows = [
    {
      where: 'United States (consumer calls)',
      rule: 'Telemarketing Sales Rule, 16 CFR 310.4(b)(1)(iii)(A)',
      quote:
        'It is abusive to initiate an outbound call to a person who “previously has stated that he or she does not wish to receive an outbound telephone call” from that seller. Calls to businesses are exempt under 16 CFR 310.6(b)(7), apart from a few listed parts; honouring the request is still good practice.',
      src: SOURCES.ftc,
      date: 'eCFR text current at 19 Nov 2026; B2B exemption in 310.6(b)(7)',
    },
    {
      where: 'United Kingdom',
      rule: 'ICO guidance on live marketing calls (PECR)',
      quote:
        '“If they object, you must stop or not start marketing them by this method.” Keep a “do not call” or suppression list; “Don’t just delete all record of them.”',
      src: SOURCES.icoLive,
      date: '10 Sep 2025 (under review for the Data (Use and Access) Act)',
    },
    {
      where: 'United Kingdom, B2B',
      rule: 'ICO guidance on business-to-business marketing',
      quote:
        'You “cannot call the number of a business who has previously objected to your calls”, and must screen against both the CTPS and TPS registers.',
      src: SOURCES.icoB2b,
      date: '22 May 2025',
    },
  ]
  return (
    <figure className="not-prose my-8">
      <div
        role="region"
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        aria-label="What the rules say when someone asks you to stop calling"
        className={tableWrap}
      >
        <table className="w-full min-w-[40rem] text-left text-small md:min-w-0">
          <thead className="bg-muted text-fg-2">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">
                Where
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                What it says
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Source · date
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.where} className="border-t border-border align-top">
                <th scope="row" className="px-4 py-3 font-semibold text-fg">
                  {r.where}
                </th>
                <td className="px-4 py-3 text-fg">{r.quote}</td>
                <td className="px-4 py-3 text-fg-2">
                  <a className="text-signal-strong underline" href={r.src.url}>
                    {r.rule}
                  </a>
                  <div className="text-fg-3">{r.date}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-caption text-fg-3">
        Read {CHECKED}. Quotes as the pages word them; not legal advice. For India, see our guide to{' '}
        <a
          className="underline"
          href="/blog/ai-calling-india-dpdp-trai-dlt-compliance-complete-guide-2026"
        >
          TRAI and DLT rules
        </a>
        . <span className="md:hidden">Swipe →</span>
      </figcaption>
    </figure>
  )
}

/** Named frameworks, each described in its owner's words. */
export function ObjectionFrameworkTable() {
  return (
    <figure className="not-prose my-8">
      <div
        role="region"
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        aria-label="Objection handling frameworks compared"
        className={tableWrap}
      >
        <table className="w-full min-w-[40rem] text-left text-small md:min-w-0">
          <thead className="bg-muted text-fg-2">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">
                Framework
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                The steps
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Use it for
              </th>
            </tr>
          </thead>
          <tbody>
            {FRAMEWORKS.map((f) => (
              <tr key={f.name} className="border-t border-border align-top">
                <th scope="row" className="px-4 py-3 font-semibold text-fg">
                  {f.name}
                  <div className="font-normal text-fg-3">
                    <a className="underline" href={f.src.url}>
                      {f.who}
                    </a>
                  </div>
                </th>
                <td className="px-4 py-3 text-fg">{f.steps}</td>
                <td className="px-4 py-3 text-fg-2">{f.best}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-caption text-fg-3">
        Steps as each publisher describes them, read {CHECKED}. “Use it for” is our judgement.{' '}
        <span className="md:hidden">Swipe →</span>
      </figcaption>
    </figure>
  )
}
