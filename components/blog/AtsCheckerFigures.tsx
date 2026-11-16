import { Figure, BarList, StatRow, Flow } from '@/components/viz'
import {
  CHECKERS,
  FREE_REPEAT,
  NO_SIGNUP,
  PRICED_3M,
  ATS_ROWS,
  SCORE_TEST,
  SCORE_SPREAD,
  CLAIMS,
  ENHANCV_STUDY,
  CHECKED,
  usd,
} from '@/data/atsCheckers'

const tableWrap = 'overflow-x-auto rounded-xl border border-border bg-surface'
const link =
  'text-signal-strong underline decoration-signal/30 underline-offset-2 hover:decoration-signal'

/** Headline counts, computed from the data. */
export function AtsCheckerStats() {
  return (
    <StatRow
      stats={[
        { label: 'Checkers read on their own pages', value: String(CHECKERS.length), sub: CHECKED },
        {
          label: 'Recruiters who rely on knock-out questions',
          value: `${ENHANCV_STUDY.knockoutPct}%`,
          sub: `Enhancv interviews with ${ENHANCV_STUDY.recruiters} US recruiters`,
          href: ENHANCV_STUDY.url,
        },
        {
          label: 'Same resume, different tools',
          value: `${SCORE_SPREAD.low}–${SCORE_SPREAD.high}`,
          sub: 'Scores out of 100, one test, May 2026',
          href: SCORE_TEST.url,
        },
        {
          label: 'ATS help docs that reject on resume keywords',
          value: `0 of ${ATS_ROWS.length}`,
          sub: 'Auto-reject runs on application-question answers',
        },
      ]}
    />
  )
}

/** What happens to an application, in the order the ATS docs describe. */
export function AtsApplicationFlow() {
  return (
    <Flow
      label="What happens after you click Apply · from Greenhouse, Workday, Lever, Oracle, SmartRecruiters and Ashby docs"
      steps={[
        {
          title: 'Questions',
          body: 'Knock-out answers (work permit, years, location) are the main automatic rejection the docs describe, and the employer sets the rule.',
        },
        {
          title: 'Parsing',
          body: 'The resume is read into fields. Columns, tables, text boxes and images break it.',
        },
        {
          title: 'Optional AI grade',
          body: 'Some employers turn on a match score or A–D grade. The docs say it ranks; people decide.',
        },
        {
          title: 'A person reviews',
          body: 'A recruiter reads the list, often newest or best-graded first, and rejects or advances.',
        },
      ]}
    />
  )
}

/** Per-ATS: parsing, automatic rejection, AI scoring, each from the vendor's own docs. */
export function AtsRulesTable() {
  return (
    <figure className="not-prose my-8">
      <ul className="space-y-3 md:hidden">
        {ATS_ROWS.map((r) => (
          <li key={r.ats} className="rounded-xl border border-border bg-surface p-4 text-small">
            <p className="text-body font-semibold text-fg">{r.ats}</p>
            <dl className="mt-2 space-y-2">
              <div>
                <dt className="font-mono text-caption uppercase tracking-[0.06em] text-signal-strong">
                  Automatic rejection
                </dt>
                <dd className="text-fg">{r.reject}</dd>
              </div>
              <div>
                <dt className="font-mono text-caption uppercase tracking-[0.06em] text-fg-3">
                  Reading the resume
                </dt>
                <dd className="text-fg-2">{r.parse}</dd>
              </div>
              <div>
                <dt className="font-mono text-caption uppercase tracking-[0.06em] text-fg-3">
                  AI score or grade
                </dt>
                <dd className="text-fg-2">{r.ai}</dd>
              </div>
            </dl>
            <p className="mt-2 text-caption">
              {r.sources.map((s, i) => (
                <span key={s.url}>
                  {i > 0 && ' · '}
                  <a href={s.url} className={link}>
                    {s.label}
                  </a>
                </span>
              ))}
            </p>
          </li>
        ))}
      </ul>
      <div
        role="region"
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        aria-label="What each ATS says it does with your resume"
        className={`hidden md:block ${tableWrap}`}
      >
        <table className="w-full min-w-[52rem] text-left text-small md:min-w-0">
          <thead className="bg-muted text-fg-2">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">
                ATS
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Reading the resume
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Automatic rejection
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                AI score or grade
              </th>
            </tr>
          </thead>
          <tbody>
            {ATS_ROWS.map((r) => (
              <tr key={r.ats} className="border-t border-border align-top">
                <th scope="row" className="px-4 py-3 font-semibold text-fg">
                  {r.ats}
                  <div className="mt-1 space-y-0.5 font-normal">
                    {r.sources.map((s) => (
                      <a key={s.url} href={s.url} className={`block text-caption ${link}`}>
                        {s.label}
                      </a>
                    ))}
                  </div>
                </th>
                <td className="px-4 py-3 text-fg-2">{r.parse}</td>
                <td className="px-4 py-3 text-fg">{r.reject}</td>
                <td className="px-4 py-3 text-fg-2">{r.ai}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-caption text-fg-3">
        Read in each vendor&apos;s help docs on {CHECKED}. Quotes are theirs; summaries are ours.
        &quot;Not covered&quot; means the pages we opened did not say, not that the feature is
        missing. Employers switch these features on or off.
      </figcaption>
    </figure>
  )
}

/** One resume, one job post, six scores. */
export function AtsScoreSpreadFigure() {
  return (
    <Figure
      label="Same resume · same job post · scored in one sitting, 2–3 May 2026"
      title={`One unchanged resume scored from ${SCORE_SPREAD.low} to ${SCORE_SPREAD.high} depending on the checker`}
      sub="A 612-word, single-column PDF from a backend developer, against a 480-word job post. Left out: the tester's own checker (83), which he discloses, and TopResume (a 'Needs work' label, no number)."
      source={[{ label: SCORE_TEST.label, url: SCORE_TEST.url }]}
      updated="Opened 16 Nov 2026"
      table={{
        head: ['Checker', 'Score (out of 100)'],
        rows: SCORE_TEST.rows.map((r) => [r.label, r.value]),
      }}
    >
      <BarList rows={SCORE_TEST.rows} max={100} sort />
    </Figure>
  )
}

/** Cost of covering a 3-month job search, cheapest published route per tool. */
export function AtsCostFigure() {
  const rows = PRICED_3M.map((c) => ({
    label: c.name,
    value: c.threeMonths as number,
    display:
      c.id === 'teal'
        ? `about ${usd(Math.round(c.threeMonths as number))}`
        : usd(c.threeMonths as number),
    note: c.threeMonthsBasis,
  }))
  const sorted = [...rows].sort((a, b) => a.value - b.value)
  const lo = sorted[0]
  const hi = sorted[sorted.length - 1]
  const unpriced = CHECKERS.filter((c) => c.threeMonths === null)
  return (
    <Figure
      label={`Paid plans · USD · read on pricing pages ${CHECKED}`}
      title={`Three months of a paid checker costs ${lo.display} (${lo.label}) to ${hi.display} (${hi.label})`}
      sub={`The cheapest way to cover 3 months on each published price. Not shown: ${unpriced
        .map((c) => `${c.name}: ${c.threeMonthsBasis}`)
        .join(
          '; '
        )}. ${FREE_REPEAT.length} of ${CHECKERS.length} tools also let you re-check free.`}
      source={PRICED_3M.map((c) => ({ label: c.name, url: c.pricingUrl ?? c.url }))}
      updated={CHECKED}
      table={{
        head: ['Checker', '3 months (USD)', 'How it is worked out'],
        rows: PRICED_3M.map((c) => [c.name, usd(c.threeMonths as number), c.threeMonthsBasis]),
      }}
    >
      <BarList rows={rows} format={{ prefix: '$' }} sort />
    </Figure>
  )
}

/** Every checker, one row each: the comparison table. */
export function AtsCheckerTable() {
  const tri = (t: string) =>
    t === 'yes' ? 'Yes' : t === 'no' ? 'No' : t === 'partial' ? 'Partly' : 'Not stated'
  return (
    <figure className="not-prose my-8">
      <div
        role="region"
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        aria-label="ATS resume checkers compared"
        className={tableWrap}
      >
        <table className="w-full min-w-[60rem] text-left text-small">
          <thead className="bg-muted text-fg-2">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">
                Checker
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Free
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Paid, as written
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Job post
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Result
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Rewrites
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                To see a result
              </th>
            </tr>
          </thead>
          <tbody>
            {CHECKERS.map((c) => (
              <tr key={c.id} className="border-t border-border align-top">
                <th scope="row" className="px-4 py-3 font-semibold text-fg">
                  <a href={c.url} className={link}>
                    {c.name}
                  </a>
                  {c.ours && (
                    <div className="font-mono text-caption font-normal uppercase tracking-[0.06em] text-signal-strong">
                      Our product
                    </div>
                  )}
                </th>
                <td className="px-4 py-3 text-fg">{c.free}</td>
                <td className="px-4 py-3 text-fg-2">
                  {c.pricingUrl ? (
                    <a href={c.pricingUrl} className={link}>
                      {c.paid}
                    </a>
                  ) : (
                    c.paid
                  )}
                </td>
                <td className="px-4 py-3 text-fg">{tri(c.jobPost)}</td>
                <td className="px-4 py-3 text-fg-2">{c.score}</td>
                <td className="px-4 py-3 text-fg">{tri(c.rewrite)}</td>
                <td className="px-4 py-3 text-fg-2">{c.needs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-caption text-fg-3">
        Read on each vendor&apos;s own pages on {CHECKED}. Prices are as written in the currency the
        page showed us; they can differ by country. {NO_SIGNUP.length} of {CHECKERS.length} tools
        show a result with no account or email. Not a ranking. Tough Tongue AI runs this site.
      </figcaption>
    </figure>
  )
}

/** Numbers you will be quoted, traced to their origin. */
export function AtsClaimsTable() {
  return (
    <figure className="not-prose my-8">
      <div
        role="region"
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        aria-label="ATS statistics traced to their source"
        className={tableWrap}
      >
        <table className="w-full min-w-[48rem] text-left text-small md:min-w-0">
          <thead className="bg-muted text-fg-2">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">
                What you will read
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Where it comes from
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Verdict
              </th>
            </tr>
          </thead>
          <tbody>
            {CLAIMS.map((c) => (
              <tr key={c.claim} className="border-t border-border align-top">
                <th scope="row" className="px-4 py-3 font-semibold text-fg">
                  {c.claim}
                </th>
                <td className="px-4 py-3 text-fg-2">
                  {c.origin}{' '}
                  <a href={c.url} className={link}>
                    {c.urlLabel}
                  </a>
                  {c.also?.map((a) => (
                    <span key={a.url}>
                      {', '}
                      <a href={a.url} className={link}>
                        {a.label}
                      </a>
                    </span>
                  ))}
                </td>
                <td className="px-4 py-3 text-fg">{c.verdict}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  )
}
