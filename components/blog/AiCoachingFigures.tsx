import { StatRow, Figure, BarList, Flow } from '@/components/viz'
import {
  VENDORS,
  JOBS,
  COUNTS,
  PUBLISHED,
  CHECKED,
  REGIONS,
  TEAM_SIZES,
  WORKED,
  managerTime,
  GONG_START,
  AVOMA,
  avomaYear,
  US_ALL_PARTY,
  type Tri,
} from '@/data/aiSalesCoaching'

const usd = (n: number) => '$' + n.toLocaleString('en-US')

/** Headline numbers, computed from the vendor data. */
export function AiCoachingStats() {
  return (
    <StatRow
      stats={[
        {
          label: 'Coaching tools checked on their own pages',
          value: String(COUNTS.vendors),
          sub: `Read ${CHECKED}`,
        },
        {
          label: 'Publish a price',
          value: `${COUNTS.published} of ${COUNTS.vendors}`,
          sub: `${PUBLISHED.map((v) => v.name).join(' and ')}; the rest are quote only`,
        },
        {
          label: 'Guide reps during live calls',
          value: `${COUNTS.live} of ${COUNTS.vendors}`,
          sub: 'Prompts or battlecards on the call',
        },
        {
          label: 'Offer AI practice calls too',
          value: `${COUNTS.practice} of ${COUNTS.vendors}`,
          sub: 'Most review calls only after they happen',
        },
      ]}
    />
  )
}

const mark = (t: Tri) =>
  t === 'yes' ? (
    <span className="font-medium text-signal-strong">Yes</span>
  ) : t === 'no' ? (
    <span className="text-fg-2">No</span>
  ) : (
    <span className="text-fg-3">Not stated</span>
  )

/** Every vendor, what it does, its price as written. Stacks into cards on phones. */
export function AiCoachingVendorTable() {
  const order = [...VENDORS].sort(
    (a, b) =>
      (a.segment === b.segment ? 0 : a.segment === 'sales' ? -1 : 1) ||
      (a.priceStatus === b.priceStatus ? 0 : a.priceStatus === 'published' ? -1 : 1) ||
      a.name.localeCompare(b.name)
  )
  return (
    <figure className="not-prose my-8" aria-labelledby="coach-table-title">
      <p className="font-mono text-kicker uppercase tracking-[0.08em] text-signal-strong">
        {COUNTS.vendors} AI sales coaching tools · read {CHECKED}
      </p>
      <h3 id="coach-table-title" className="mt-1 text-h4 font-semibold text-fg">
        {COUNTS.review} of {COUNTS.vendors} review recorded calls; {COUNTS.live} coach during the
        call and only {COUNTS.practice} let reps practise first
      </h3>
      <div className="mt-4 hidden overflow-x-auto rounded-2xl border border-border bg-surface md:block">
        <table className="w-full min-w-[44rem] border-collapse text-left text-small">
          <thead>
            <tr className="border-b border-border text-fg-2">
              <th scope="col" className="px-3 py-3 font-medium">
                Tool
              </th>
              <th scope="col" className="px-3 py-3 font-medium">
                Reviews calls
              </th>
              <th scope="col" className="px-3 py-3 font-medium">
                AI scorecards
              </th>
              <th scope="col" className="px-3 py-3 font-medium">
                Live guidance
              </th>
              <th scope="col" className="px-3 py-3 font-medium">
                Practice
              </th>
              <th scope="col" className="w-[38%] px-3 py-3 font-medium">
                Price, as the vendor writes it · built for
              </th>
            </tr>
          </thead>
          <tbody>
            {order.map((v) => (
              <tr key={v.id} className="border-b border-border align-top last:border-0">
                <th scope="row" className="px-3 py-3 font-semibold text-fg">
                  <a
                    href={v.url}
                    className="underline decoration-border underline-offset-2 hover:decoration-signal"
                  >
                    {v.name}
                  </a>
                  {v.segment === 'contact-centre' && (
                    <span className="mt-1 block text-caption font-normal text-fg-3">
                      Contact centre
                    </span>
                  )}
                </th>
                <td className="px-3 py-3">{mark(v.review)}</td>
                <td className="px-3 py-3">{mark(v.scorecards)}</td>
                <td className="px-3 py-3">{mark(v.live)}</td>
                <td className="px-3 py-3">{mark(v.practice)}</td>
                <td className="px-3 py-3 text-fg-2">
                  {v.price}
                  <span className="mt-1 block text-caption text-fg-3">{v.forWhom}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="mt-4 grid gap-3 md:hidden">
        {order.map((v) => (
          <li key={v.id} className="rounded-2xl border border-border bg-surface p-4">
            <a
              href={v.url}
              className="text-body font-semibold text-fg underline decoration-border underline-offset-2"
            >
              {v.name}
            </a>
            {v.segment === 'contact-centre' && (
              <span className="ml-2 text-caption text-fg-3">Contact centre</span>
            )}
            <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1 text-small">
              <dt className="text-fg-3">Reviews calls</dt>
              <dd>{mark(v.review)}</dd>
              <dt className="text-fg-3">AI scorecards</dt>
              <dd>{mark(v.scorecards)}</dd>
              <dt className="text-fg-3">Live guidance</dt>
              <dd>{mark(v.live)}</dd>
              <dt className="text-fg-3">Practice</dt>
              <dd>{mark(v.practice)}</dd>
            </dl>
            <p className="mt-3 text-small text-fg-2">{v.price}</p>
            <p className="mt-1 text-caption text-fg-3">{v.forWhom}</p>
          </li>
        ))}
      </ul>
      <figcaption className="mt-3 text-caption text-fg-3">
        Source: each vendor’s own pricing or product page (linked on its name), read {CHECKED}. “Not
        stated” means we looked on those pages and did not find it, not that the feature is missing.
        Clari Copilot and MeetRecord are left out because their pages now redirect (to Salesloft and
        Outdoo) and could not be read. Tough Tongue AI, which runs this site, is not in the table.
      </figcaption>
    </figure>
  )
}

/** Manager hours a week at Gong's starting point, by team size. */
export function AiCoachingTimeChart() {
  const rows = TEAM_SIZES.map((reps) => {
    const r = managerTime({ ...WORKED, reps, reviewedPerRep: GONG_START.reviewedPerRep })
    return {
      label: `${reps} reps`,
      note: `${r.callsReviewed} of ${r.callsTotal} calls looked at (${r.coveragePct}%)`,
      value: r.hoursPerWeek,
      display: `${r.hoursPerWeek} h a week`,
    }
  })
  const last = rows[rows.length - 1]
  return (
    <Figure
      label="Manager time for one reviewed call per rep a week"
      title={`Reviewing one ${WORKED.callMinutes}-minute call per rep a week already costs a manager of ${TEAM_SIZES[TEAM_SIZES.length - 1]} reps ${last.display}, and still covers only ${(100 / WORKED.callsPerRep).toFixed(0)}% of calls`}
      sub={`Our arithmetic: reps × 1 call × (${WORKED.callMinutes} min listening + ${WORKED.feedbackMinutes} min feedback), with each rep having ${WORKED.callsPerRep} calls a week. One call per rep a week is the starting point Gong recommends. Change every number in the planner below.`}
      source={[{ label: 'Gong help centre: weekly coaching routine', url: GONG_START.url }]}
      updated={CHECKED}
      table={{
        head: ['Team', 'Manager hours a week', 'Share of calls looked at'],
        rows: rows.map((r) => [r.label, r.display, r.note]),
      }}
    >
      <BarList rows={rows} format={{ suffix: ' h', decimals: 1 }} />
    </Figure>
  )
}

/** Avoma, the clearest published coaching price, worked for small teams. */
export function AiCoachingAvomaCost() {
  const seats = [5, 10, 25]
  const rows = seats.map((n) => ({
    label: `${n} recorder seats`,
    value: avomaYear(n, true),
    display: `${usd(avomaYear(n, true))} a year`,
    note: `${usd(avomaYear(n, false))} if paid monthly`,
  }))
  return (
    <Figure
      label="Year-one list price · Avoma Startup + Conversation Intelligence"
      title={`Avoma’s coaching features cost $${AVOMA.startupAnnual + AVOMA.ciAnnual} a seat a month billed annually: about ${usd(avomaYear(10))} a year for 10 reps`}
      sub={`Startup seat $${AVOMA.startupAnnual} + Conversation Intelligence add-on $${AVOMA.ciAnnual}, per recorder seat a month, billed annually ($${AVOMA.startupMonthly} + $${AVOMA.ciMonthly} monthly). Viewers such as managers are free. Startup allows up to 25 paid seats. Before tax.`}
      source={[{ label: 'Avoma pricing', url: AVOMA.url }]}
      updated={CHECKED}
      table={{
        head: ['Team', 'Billed annually', 'Billed monthly'],
        rows: rows.map((r) => [r.label, r.display, r.note]),
      }}
    >
      <BarList rows={rows} format={{ prefix: '$', decimals: 0 }} />
    </Figure>
  )
}

/** The three jobs, as a flow from before to after the call. */
export function AiCoachingJobs() {
  return (
    <Flow
      label="Three jobs an AI sales coach can do"
      steps={JOBS.map((j) => ({
        title: j.short,
        body: `${j.long}. Pick it when: ${j.when.charAt(0).toLowerCase()}${j.when.slice(1)}.`,
      }))}
    />
  )
}

/** The weekly loop we recommend. */
export function AiCoachingLoop() {
  return (
    <Flow
      label="A weekly coaching loop: about 15 minutes of 1:1 per rep"
      steps={[
        { title: 'Score', body: 'Let the tool score every recorded call against one scorecard.' },
        {
          title: 'Pick one call',
          body: 'Per rep, the lowest-scoring call on the skill you are working on.',
        },
        { title: '15-minute 1:1', body: 'Play 2 minutes of it. Agree one thing to change.' },
        {
          title: 'Practise the fix',
          body: 'Three roleplay attempts on that moment before the next live call.',
        },
        { title: 'Re-score', body: 'Next week, check that skill on new calls. Keep or move on.' },
      ]}
    />
  )
}

/** Rules on recording and analysing calls, by region. */
export function AiCoachingRules() {
  return (
    <figure className="not-prose my-8" aria-labelledby="coach-rules-title">
      <p className="font-mono text-kicker uppercase tracking-[0.08em] text-signal-strong">
        Recording and analysing sales calls · rules read {CHECKED}
      </p>
      <h3 id="coach-rules-title" className="mt-1 text-h4 font-semibold text-fg">
        {US_ALL_PARTY.length}+ US states need everyone’s consent to record, and the EU bans AI that
        reads your reps’ emotions
      </h3>
      <div className="mt-4 hidden overflow-x-auto rounded-2xl border border-border bg-surface md:block">
        <table className="w-full min-w-[40rem] border-collapse text-left text-small">
          <thead>
            <tr className="border-b border-border text-fg-2">
              <th scope="col" className="w-[18%] px-3 py-3 font-medium">
                Where
              </th>
              <th scope="col" className="px-3 py-3 font-medium">
                What it means for coaching
              </th>
              <th scope="col" className="w-[34%] px-3 py-3 font-medium">
                In the source’s words
              </th>
            </tr>
          </thead>
          <tbody>
            {REGIONS.flatMap((r) =>
              r.rules.map((x, i) => (
                <tr key={r.id + i} className="border-b border-border align-top last:border-0">
                  <th scope="row" className="px-3 py-3 font-semibold text-fg">
                    {i === 0 ? r.name : ''}
                  </th>
                  <td className="px-3 py-3 text-fg-2">{x.plain}</td>
                  <td className="px-3 py-3 text-fg-2">
                    {x.quote}{' '}
                    <a href={x.src} className="text-signal-strong underline underline-offset-2">
                      {x.srcLabel}
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <ul className="mt-4 grid gap-3 md:hidden">
        {REGIONS.flatMap((r) =>
          r.rules.map((x, i) => (
            <li
              key={r.id + i}
              className="rounded-2xl border border-border bg-surface p-4 text-small"
            >
              <p className="font-semibold text-fg">{r.name}</p>
              <p className="mt-2 text-fg-2">{x.plain}</p>
              <p className="mt-2 text-caption text-fg-3">
                {x.quote}{' '}
                <a href={x.src} className="text-signal-strong underline underline-offset-2">
                  {x.srcLabel}
                </a>
              </p>
            </li>
          ))
        )}
      </ul>
      <figcaption className="mt-3 text-caption text-fg-3">
        A summary to help you ask the right questions, not legal advice. Check with your lawyer for
        your own calls, especially across borders.
      </figcaption>
    </figure>
  )
}
