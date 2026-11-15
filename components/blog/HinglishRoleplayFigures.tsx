import { Figure, SegmentBar, StatRow, Flow } from '@/components/viz'
import {
  SCENARIOS,
  SECTORS,
  RULES,
  VENDORS,
  RUBRIC,
  LEVEL_POINTS,
  MAX_SCORE,
  COUNTS,
  CHECKED,
  CENSUS,
  ORIGIN_LABEL,
  ruleById,
} from '@/data/hinglishRoleplay'

/** Headline numbers, each computed from the data file or linked to its source. */
export function HinglishRoleplayStats() {
  const heard = COUNTS.byOrigin.find((o) => o.origin === 'heard')?.count ?? 0
  return (
    <StatRow
      stats={[
        {
          label: 'Indians whose mother tongue the Census groups under Hindi',
          value: `${CENSUS.hindiShare}%`,
          sub: `${CENSUS.hindiCrore} crore · Census 2011, Table C-16`,
          href: CENSUS.url,
        },
        {
          label: 'Objections on this page',
          value: String(COUNTS.scenarios),
          sub: `${COUNTS.sectors} sectors · ${heard} quoted as heard`,
        },
        {
          label: 'Regulator rules quoted',
          value: String(COUNTS.rules),
          sub: `${COUNTS.regulators} regulators · ${COUNTS.rulesTied} tested by a scenario`,
        },
        {
          label: 'Roleplay tools whose own page lists Hindi',
          value: String(COUNTS.vendors),
          sub: `Checked ${CHECKED}, incl. ours`,
        },
      ]}
    />
  )
}

/** Where each objection line came from: one whole, three parts. */
export function HinglishOriginFigure() {
  const written = COUNTS.byOrigin.find((o) => o.origin === 'written')?.count ?? 0
  return (
    <Figure
      label={`Origin of the ${COUNTS.scenarios} objection lines`}
      title={`${COUNTS.scenarios - written} of ${COUNTS.scenarios} lines come from a real page; ${written === 1 ? 'one' : written} we wrote around the rule`}
      source={[{ label: 'Source pages listed on each card below', url: '#library' }]}
      updated={`checked ${CHECKED}`}
      table={{
        head: ['Origin', 'Scenarios', 'What it means'],
        rows: COUNTS.byOrigin.map((o) => [
          o.label,
          String(o.count),
          o.origin === 'heard'
            ? 'Quoted as written on the source page (Hinglish or Hindi)'
            : o.origin === 'translated'
              ? 'The source quotes it in English; the Hinglish is ours'
              : 'No page we opened quotes it; written by us to test the rule',
        ]),
      }}
      note="No Indian edtech page we opened quotes a parent’s objection word for word, so scenario 10 is ours."
    >
      <SegmentBar parts={COUNTS.byOrigin.map((o) => ({ label: o.label, value: o.count }))} />
    </Figure>
  )
}

const tableWrap = 'overflow-x-auto rounded-xl border border-border bg-surface'

/** The regulator rules each scenario tests. Server-rendered HTML table. */
export function HinglishRulesTable() {
  return (
    <figure className="not-prose my-8">
      <div
        role="region"
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        aria-label="What Indian regulators say a sales rep may and may not say"
        className={tableWrap}
      >
        <table className="w-full min-w-[48rem] text-left text-small md:min-w-0">
          <thead className="bg-muted text-fg-2">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">
                Regulator · sector
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                What it means on a call
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                The rule, as written
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Where · date
              </th>
            </tr>
          </thead>
          <tbody>
            {RULES.map((r) => (
              <tr key={r.id} className="border-t border-border align-top">
                <th scope="row" className="px-4 py-3 font-semibold text-fg">
                  {r.regulator}
                  <div className="font-normal text-fg-3">{r.sector}</div>
                </th>
                <td className="px-4 py-3 text-fg">{r.plain}</td>
                <td className="px-4 py-3 text-fg-2">“{r.quote}”</td>
                <td className="px-4 py-3 text-fg-2">
                  <a className="text-signal-strong underline" href={r.url}>
                    {r.ref}
                  </a>
                  <div className="text-fg-3">
                    {r.date}
                    {r.primary ? '' : ` · copy on ${new URL(r.url).hostname}`}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-caption text-fg-3">
        Read {CHECKED}. Plain-words summaries are ours; check the circular before you train on it.
        Not legal advice. <span className="md:hidden">Swipe →</span>
      </figcaption>
    </figure>
  )
}

/** AI roleplay tools whose own page lists Hindi. */
export function HinglishVendorTable() {
  return (
    <figure className="not-prose my-8">
      <div
        role="region"
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        aria-label="AI sales roleplay tools whose own page lists Hindi"
        className={tableWrap}
      >
        <table className="w-full min-w-[40rem] text-left text-small md:min-w-0">
          <thead className="bg-muted text-fg-2">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">
                Tool
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                What its own page says
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Catch, as the page states it
              </th>
            </tr>
          </thead>
          <tbody>
            {VENDORS.map((v) => (
              <tr key={v.name} className="border-t border-border align-top">
                <th scope="row" className="px-4 py-3 font-semibold text-fg">
                  <a className="underline" href={v.url}>
                    {v.name}
                  </a>
                </th>
                <td className="px-4 py-3 text-fg">{v.claim}</td>
                <td className="px-4 py-3 text-fg-2">{v.caveat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-caption text-fg-3">
        Checked {CHECKED}. A language on a list is not proof of Hinglish quality: run scenario 1 in
        a free trial before you buy. Left out: tools that say “20+” or “25+ languages” without
        naming Hindi (Mindtickle, SmartWinnr). <span className="md:hidden">Swipe →</span>
      </figcaption>
    </figure>
  )
}

/** The rubric with defined levels. */
export function HinglishRubricTable() {
  return (
    <figure className="not-prose my-8">
      <div
        role="region"
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        aria-label="Hinglish roleplay scoring rubric"
        className={tableWrap}
      >
        <table className="w-full min-w-[640px] text-left text-small">
          <thead className="bg-muted text-fg-2">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">
                Line
              </th>
              {LEVEL_POINTS.map((p) => (
                <th key={p} scope="col" className="px-4 py-3 font-medium tabular-nums">
                  {p} {p === 1 ? 'point' : 'points'}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {RUBRIC.map((r) => (
              <tr key={r.id} className="border-t border-border align-top">
                <th scope="row" className="px-4 py-3 font-semibold text-fg">
                  {r.name}
                </th>
                {r.levels.map((l, i) => (
                  <td key={i} className="px-4 py-3 text-fg-2">
                    {l}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-caption text-fg-3">
        {RUBRIC.length} lines × 1, 3 or 5 points = {RUBRIC.length}–{MAX_SCORE}. 16+ ready, 10–15
        rerun now, under 10 rerun tomorrow. <span className="md:hidden">Swipe →</span>
      </figcaption>
    </figure>
  )
}

export function HinglishSessionFlow() {
  return (
    <Flow
      label={`One session · about 20 minutes · rounds of ${COUNTS.minMinutes}–${COUNTS.maxMinutes} minutes at medium`}
      steps={[
        {
          title: 'Brief (2 min)',
          body: 'Buyer reads the buyer card. Rep reads the rep card and the never-say line.',
        },
        {
          title: 'Round 1',
          body: 'Buyer speaks only in the card’s language mix. Nobody stops the call.',
        },
        {
          title: 'Score (3 min)',
          body: 'Buyer and observer score 4 lines; the rule line is scored first.',
        },
        { title: 'Round 2', body: 'Same objection at once, fixing the lowest line.' },
        {
          title: 'Swap',
          body: 'Rep plays the buyer next. Hearing the objection teaches the reply.',
        },
      ]}
    />
  )
}

/** Every scenario, server-rendered and grouped by sector. The tool only filters these. */
export function HinglishScenarioLibrary() {
  return (
    <div id="library" className="not-prose my-8 scroll-mt-24 space-y-8">
      {SECTORS.map((sec) => {
        const list = SCENARIOS.filter((s) => s.sector === sec.id)
        return (
          <section key={sec.id} aria-labelledby={`sector-${sec.id}`}>
            <h3 id={`sector-${sec.id}`} className="text-h3 font-semibold text-fg">
              {sec.label}{' '}
              <span className="text-small font-normal text-fg-3">
                · {sec.who} · {list.length} scenarios
              </span>
            </h3>
            <div className="mt-3 space-y-3">
              {list.map((s, i) => {
                const rule = ruleById(s.rep.rule)
                return (
                  <details
                    key={s.id}
                    id={`scenario-${s.n}`}
                    open={sec.id === 'insurance' && i === 0}
                    className="group scroll-mt-24 rounded-xl border border-border bg-surface transition-shadow duration-fast open:shadow-e1"
                  >
                    <summary className="flex min-h-12 cursor-pointer list-none items-start justify-between gap-3 px-5 py-4">
                      <span className="min-w-0 font-medium text-fg">
                        <span className="mr-2 font-mono text-kicker text-fg-3">{s.n}</span>“{s.line}
                        ”
                        <span className="mt-1 block text-small font-normal text-fg-3">
                          {s.gloss}
                        </span>
                      </span>
                      <span className="shrink-0 text-caption text-fg-3">{s.minutes} min</span>
                    </summary>
                    <div className="grid gap-4 px-5 pb-5 md:grid-cols-2">
                      <div className="min-w-0 rounded-lg bg-muted p-4">
                        <div className="font-mono text-kicker uppercase tracking-[0.08em] text-fg-2">
                          Buyer card
                        </div>
                        <dl className="mt-2 space-y-2 text-small">
                          <div>
                            <dt className="font-semibold text-fg">You are</dt>
                            <dd className="text-fg-2">{s.buyer.role}</dd>
                          </div>
                          <div>
                            <dt className="font-semibold text-fg">Where this line comes from</dt>
                            <dd className="text-fg-2">
                              {ORIGIN_LABEL[s.origin]}
                              {s.original ? `: “${s.original}”` : ''}
                              {s.source ? (
                                <>
                                  {' · '}
                                  <a className="underline" href={s.source.url}>
                                    {s.source.label}
                                  </a>
                                </>
                              ) : (
                                ' · built around the rule on the rep card'
                              )}
                            </dd>
                          </div>
                          <div>
                            <dt className="font-semibold text-fg">What is really going on</dt>
                            <dd className="text-fg-2">{s.buyer.hidden}</dd>
                          </div>
                          <div>
                            <dt className="font-semibold text-fg">Warm up only if</dt>
                            <dd className="text-fg-2">{s.buyer.warmsIf}</dd>
                          </div>
                          <div>
                            <dt className="font-semibold text-fg">End the call if</dt>
                            <dd className="text-fg-2">{s.buyer.endsIf}</dd>
                          </div>
                        </dl>
                      </div>
                      <div className="min-w-0 rounded-lg border border-border p-4">
                        <div className="font-mono text-kicker uppercase tracking-[0.08em] text-signal-strong">
                          Rep card
                        </div>
                        <dl className="mt-2 space-y-2 text-small">
                          <div>
                            <dt className="font-semibold text-fg">Goal</dt>
                            <dd className="text-fg-2">{s.rep.goal}</dd>
                          </div>
                          <div>
                            <dt className="font-semibold text-fg">A strong first answer</dt>
                            <dd className="text-fg-2">“{s.rep.example}”</dd>
                          </div>
                          <div>
                            <dt className="font-semibold text-fg">Never say</dt>
                            <dd className="text-fg-2">
                              <s>“{s.rep.neverSay}”</s>
                            </dd>
                          </div>
                          <div>
                            <dt className="font-semibold text-fg">The rule makes you</dt>
                            <dd className="text-fg-2">
                              {s.rep.mustSay}{' '}
                              <a className="text-caption text-fg-3 underline" href={rule.url}>
                                {rule.regulator}: {rule.ref}
                              </a>
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
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
