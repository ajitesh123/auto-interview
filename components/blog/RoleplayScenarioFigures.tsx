import { Figure, SegmentBar, StatRow, Flow } from '@/components/viz'
import {
  SCENARIOS,
  GROUPS,
  GONG_SPLIT,
  GONG_TOP5_SHARE,
  GONG_MONOLOGUE_SEC,
  BRIDGE,
  SOURCES,
  RUBRIC,
  LEVEL_POINTS,
  MAX_SCORE,
  COUNTS,
  CHECKED,
} from '@/data/roleplayScenarios'

/** Headline numbers, each linked to its source. */
export function RoleplayScenarioStats() {
  return (
    <StatRow
      stats={[
        {
          label: 'Cold-call objections that are brush-offs',
          value: `${GONG_SPLIT[0].share}%`,
          sub: 'Gong, 300M+ cold calls, Jul 2024',
          href: SOURCES.gong300m.url,
        },
        {
          label: 'Share of objections the top 5 cover',
          value: `${GONG_TOP5_SHARE}%`,
          sub: 'Same Gong study',
          href: SOURCES.gong300m.url,
        },
        {
          label: 'Average rep’s answer to an objection',
          value: `${GONG_MONOLOGUE_SEC} s`,
          sub: 'A “knee-jerk” monologue · Gong, 67,149 demo calls',
          href: SOURCES.gongObjections.url,
        },
        {
          label: 'Average SDR ramp time',
          value: `${BRIDGE.rampMonths.toFixed(1)} months`,
          sub: `Bridge Group 2025 · ${BRIDGE.companies} B2B companies`,
          href: SOURCES.bridge.url,
        },
      ]}
    />
  )
}

/** Gong's objection split: one whole, three parts. */
export function GongObjectionSplitFigure() {
  return (
    <Figure
      label="Cold-call objections · 300M+ calls · Gong"
      title="Half of all cold-call objections are brush-offs, so drill those first"
      source={[{ label: SOURCES.gong300m.label, url: SOURCES.gong300m.url }]}
      updated={`read ${CHECKED}`}
      table={{
        head: ['Kind of objection', 'Share of all objections', 'Examples Gong lists'],
        rows: GONG_SPLIT.map((g) => [g.label, `${g.share}%`, g.examples]),
      }}
      note="Shares as Gong publishes them (49.5 + 42.6 + 7.9 = 100). The bar rounds to whole numbers."
    >
      <SegmentBar parts={GONG_SPLIT.map((g) => ({ label: g.label, value: g.share }))} />
    </Figure>
  )
}

/** One session, start to finish. */
export function RoleplaySessionFlow() {
  return (
    <Flow
      label={`One session · about 20 minutes · rounds of ${COUNTS.minMinutes}–${COUNTS.maxMinutes} minutes at medium`}
      steps={[
        {
          title: 'Brief (2 min)',
          body: 'Buyer reads the buyer card alone. Rep reads only the rep card.',
        },
        { title: 'Round 1', body: 'Timer on. Nobody stops the call; the buyer follows the card.' },
        {
          title: 'Score (3 min)',
          body: 'Buyer and one observer score the 4 lines; rep scores too.',
        },
        { title: 'Round 2', body: 'Same scenario at once, fixing the lowest line only.' },
        {
          title: 'Log it',
          body: 'Write both totals down; rerun the weakest scenario later in the week.',
        },
      ]}
    />
  )
}

/** The rubric as a table with defined levels. Server-rendered. */
export function RoleplayRubricTable() {
  return (
    <figure className="not-prose my-8">
      <div
        role="region"
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        aria-label="Sales roleplay scoring rubric"
        className="overflow-x-auto rounded-xl border border-border bg-surface"
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
        4 lines × 1, 3 or 5 points = {RUBRIC.length}–{MAX_SCORE}. “Pause and ask” follows Gong’s
        finding that successful sellers pause longer after objections and answer with questions (
        <a className="underline" href={SOURCES.gongObjections.url}>
          Gong, 2018
        </a>
        ). <span className="md:hidden">Swipe →</span>
      </figcaption>
    </figure>
  )
}

/** Every scenario, server-rendered, grouped. The builder above only filters and formats these. */
export function RoleplayScenarioLibrary() {
  return (
    <div className="not-prose my-8 space-y-8">
      {GROUPS.map((g) => {
        const list = SCENARIOS.filter((s) => s.group === g.id)
        return (
          <section key={g.id} aria-labelledby={`group-${g.id}`}>
            <h3 id={`group-${g.id}`} className="text-h3 font-semibold text-fg">
              {g.label}{' '}
              <span className="text-small font-normal text-fg-3">
                · {g.when} · {list.length} scenarios
              </span>
            </h3>
            <div className="mt-3 space-y-3">
              {list.map((s, i) => (
                <details
                  key={s.id}
                  id={`scenario-${s.n}`}
                  open={g.id === 'dismissive' && i === 0}
                  className="group scroll-mt-24 rounded-xl border border-border bg-surface open:shadow-e1"
                >
                  <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-5 py-4">
                    <span className="font-medium text-fg">
                      <span className="mr-2 font-mono text-kicker text-fg-3">{s.n}</span>
                      {s.title}
                    </span>
                    <span className="shrink-0 text-caption text-fg-3">{s.minutes} min</span>
                  </summary>
                  <div className="grid gap-4 px-5 pb-5 md:grid-cols-2">
                    <div className="rounded-lg bg-muted p-4">
                      <div className="font-mono text-kicker uppercase tracking-[0.08em] text-fg-2">
                        Buyer card
                      </div>
                      <dl className="mt-2 space-y-2 text-small">
                        <div>
                          <dt className="font-semibold text-fg">You are</dt>
                          <dd className="text-fg-2">{s.buyer.role}</dd>
                        </div>
                        <div>
                          <dt className="font-semibold text-fg">You say</dt>
                          <dd className="text-fg-2">
                            “{s.line}”{' '}
                            <a className="text-caption text-fg-3 underline" href={s.source.url}>
                              {s.source.url === SOURCES.gong300m.url
                                ? 'heard on real cold calls'
                                : 'quoted in'}
                              : {s.source.label}
                            </a>
                          </dd>
                        </div>
                        <div>
                          <dt className="font-semibold text-fg">Situation</dt>
                          <dd className="text-fg-2">{s.buyer.situation}</dd>
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
                    <div className="rounded-lg border border-border p-4">
                      <div className="font-mono text-kicker uppercase tracking-[0.08em] text-signal-strong">
                        Rep card
                      </div>
                      <dl className="mt-2 space-y-2 text-small">
                        <div>
                          <dt className="font-semibold text-fg">Goal</dt>
                          <dd className="text-fg-2">{s.rep.goal}</dd>
                        </div>
                        <div>
                          <dt className="font-semibold text-fg">Must do</dt>
                          <dd className="text-fg-2">{s.rep.mustDo}</dd>
                        </div>
                        <div>
                          <dt className="font-semibold text-fg">A winning round ends with</dt>
                          <dd className="text-fg-2">{s.rep.win}</dd>
                        </div>
                        <div>
                          <dt className="font-semibold text-fg">A strong first answer</dt>
                          <dd className="text-fg-2">“{s.rep.example}”</dd>
                        </div>
                        <div>
                          <dt className="font-semibold text-fg">Time</dt>
                          <dd className="text-fg-2">{s.minutes} minutes at medium difficulty</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
