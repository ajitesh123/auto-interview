import { Figure, BarList, StatRow } from '@/components/viz'
import {
  TAKERS,
  CAPPED,
  UNLIMITED,
  OTHER_LIMIT,
  BOT_FREE,
  NOT_FREE,
  CONSENT,
  CASES,
  CHECKED,
  EXAMPLE,
  fitAll,
  perMonth,
  round1,
  platformLabel,
} from '@/data/freeNoteTakers'

const tableWrap = 'overflow-x-auto rounded-xl border border-border bg-surface'
const link =
  'text-signal-strong underline decoration-signal/30 underline-offset-2 hover:decoration-signal'
const kicker = 'font-mono text-caption uppercase tracking-[0.06em]'

const caps = CAPPED.map((t) => t.capMinutes as number)
const capLo = Math.min(...caps)
const capHi = Math.max(...caps)

/** Headline counts, computed from the data. */
export function FreeNoteTakerStats() {
  return (
    <StatRow
      stats={[
        {
          label: 'Free plans read on the vendor’s own pages',
          value: String(TAKERS.length),
          sub: `${CHECKED}, plus ${NOT_FREE.length} that are paid or a trial`,
        },
        {
          label: 'Unlimited meetings, no monthly minute cap',
          value: `${UNLIMITED.length} of ${TAKERS.length}`,
          sub: UNLIMITED.map((t) => t.name).join(', '),
        },
        {
          label: 'Capped plans top out at',
          value: `${capLo / 60}–${capHi / 60} h`,
          sub: 'Of meetings a month, at most',
        },
        {
          label: 'Offer a way to record with no bot',
          value: `${BOT_FREE.length} of ${TAKERS.length}`,
          sub: 'Desktop app or extension; Fathom’s is a Mac beta',
        },
      ]}
    />
  )
}

/** Most minutes a month on capped free plans. */
export function FreeNoteTakerCapFigure() {
  const rows = CAPPED.map((t) => ({
    label: t.name,
    value: t.capMinutes as number,
    display: `${t.capMinutes} min`,
    note: t.capBasis,
  }))
  return (
    <Figure
      label={`Free plans with a cap · minutes a month · read ${CHECKED}`}
      title={`Where a free plan has a cap, it covers ${capLo / 60} to ${capHi / 60} hours of meetings a month at most`}
      sub={`Upper bounds from the stated caps; per-meeting limits cut them further (Otter 30 min, Jamie 30 min, Notta 3 min). Not shown: ${UNLIMITED.map((t) => t.name).join(', ')} (no cap stated) and ${OTHER_LIMIT.map((t) => t.name).join(', ')} (they count storage, lifetime AI notes, transcripts or meetings instead).`}
      source={CAPPED.map((t) => ({ label: t.name, url: t.url }))}
      updated={CHECKED}
      table={{
        head: ['Note taker', 'Minutes a month', 'How it is worked out'],
        rows: CAPPED.map((t) => [t.name, String(t.capMinutes), t.capBasis ?? '']),
      }}
    >
      <BarList rows={rows} max={capHi} sort />
    </Figure>
  )
}

const STATUS_TEXT = { yes: 'Covers it', catch: 'Covers it, with a catch', no: 'Does not cover it' }

/** The worked example: the fit rules applied on the server, so the result is in the HTML. */
export function FreeNoteTakerExample() {
  const res = fitAll(EXAMPLE)
  const n = round1(perMonth(EXAMPLE.perWeek))
  const groups = (['yes', 'catch', 'no'] as const).map((s) => ({
    s,
    items: res.filter((r) => r.v.status === s),
  }))
  return (
    <figure className="not-prose my-8 rounded-2xl border border-border bg-surface p-4 md:p-6">
      <p className={`${kicker} text-signal-strong`}>Worked example</p>
      <p className="mt-1 text-body font-semibold text-fg">
        {EXAMPLE.perWeek} meetings a week, {EXAMPLE.minutes} minutes each, on{' '}
        {platformLabel(EXAMPLE.platform)}: about {n} meetings and{' '}
        {Math.round(perMonth(EXAMPLE.perWeek) * EXAMPLE.minutes)} minutes a month
      </p>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        {groups.map((g) => (
          <div key={g.s} className="min-w-0">
            <p className="text-small font-medium text-fg">
              {STATUS_TEXT[g.s]} ({g.items.length})
            </p>
            <ul className="mt-2 space-y-1.5 text-small">
              {g.items.map(({ t, v }) => (
                <li key={t.id} className="text-fg-2">
                  <span className="font-medium text-fg">{t.name}</span>
                  {v.reasons.length > 0 && <span>: {v.reasons[0]}</span>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <figcaption className="mt-4 text-caption text-fg-3">
        Rules from each vendor&apos;s stated limits, read {CHECKED}. A month is 52 ÷ 12 weeks.
      </figcaption>
    </figure>
  )
}

/** Every free plan, one row each. Cards under md, table above. */
export function FreeNoteTakerTable() {
  return (
    <figure className="not-prose my-8">
      <ul className="space-y-3 md:hidden">
        {TAKERS.map((t) => (
          <li key={t.id} className="rounded-xl border border-border bg-surface p-4 text-small">
            <a href={t.url} className={`text-body font-semibold ${link}`}>
              {t.name}
            </a>
            <dl className="mt-2 space-y-2">
              <div>
                <dt className={`${kicker} text-signal-strong`}>Free plan</dt>
                <dd className="text-fg">{t.free}</dd>
              </div>
              <div>
                <dt className={`${kicker} text-fg-3`}>Capture · history</dt>
                <dd className="text-fg-2">
                  {t.capture} · {t.history}
                </dd>
              </div>
              <div>
                <dt className={`${kicker} text-fg-3`}>Cheapest paid</dt>
                <dd className="text-fg-2">{t.paid}</dd>
              </div>
              {t.watch && (
                <div>
                  <dt className={`${kicker} text-fg-3`}>Watch for</dt>
                  <dd className="text-fg-2">{t.watch}</dd>
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
        aria-label="Free AI note takers compared"
        className={`hidden md:block ${tableWrap}`}
      >
        <table className="w-full text-left text-small">
          <thead className="bg-muted text-fg-2">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">
                Note taker
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Free plan, as written
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Capture
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                History
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Cheapest paid
              </th>
            </tr>
          </thead>
          <tbody>
            {TAKERS.map((t) => (
              <tr key={t.id} className="border-t border-border align-top">
                <th scope="row" className="px-4 py-3 font-semibold text-fg">
                  <a href={t.url} className={link}>
                    {t.name}
                  </a>
                  {t.also?.map((a) => (
                    <a
                      key={a.url}
                      href={a.url}
                      className={`mt-1 block text-caption font-normal ${link}`}
                    >
                      {a.label}
                    </a>
                  ))}
                </th>
                <td className="px-4 py-3 text-fg">
                  {t.free}
                  {t.watch && <span className="mt-1 block text-caption text-fg-3">{t.watch}</span>}
                </td>
                <td className="px-4 py-3 text-fg-2">{t.capture}</td>
                <td className="px-4 py-3 text-fg-2">{t.history}</td>
                <td className="px-4 py-3 text-fg-2">{t.paid}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-caption text-fg-3">
        Read on each vendor&apos;s own pricing or help page on {CHECKED}; each name links to it.
        Quotes are theirs. Prices in USD as shown to us; they can differ by country. Ordered from
        fewest limits to most, not a ranking of note quality. Tough Tongue AI runs this site and is
        not on this list (it is not a note taker).
      </figcaption>
    </figure>
  )
}

/** "Free" built-in note takers that need a licence, and trials. */
export function NotFreeTable() {
  return (
    <figure className="not-prose my-8">
      <ul className="divide-y divide-border rounded-xl border border-border bg-surface">
        {NOT_FREE.map((n) => (
          <li key={n.name} className="p-4 text-small">
            <a href={n.url} className={`font-semibold ${link}`}>
              {n.name}
            </a>
            <p className="mt-1 text-fg-2">{n.what}</p>
            <p className="mt-1 text-fg">
              <span className={`${kicker} mr-2 text-signal-strong`}>Needs</span>
              {n.needs}
            </p>
          </li>
        ))}
      </ul>
      <figcaption className="mt-2 text-caption text-fg-3">
        Read on the vendor&apos;s own help or pricing pages on {CHECKED}.
      </figcaption>
    </figure>
  )
}

/** Consent rules, primary sources. */
export function ConsentTable() {
  return (
    <figure className="not-prose my-8">
      <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {CONSENT.map((r) => (
          <li key={r.where} className="rounded-xl border border-border bg-surface p-4 text-small">
            <p className={`${kicker} text-signal-strong`}>{r.where}</p>
            <p className="mt-1 text-fg">{r.rule}</p>
            <p className="mt-2 text-fg-2">
              {r.quote}{' '}
              <a href={r.url} className={link}>
                {r.label}
              </a>
            </p>
          </li>
        ))}
      </ul>
      <figcaption className="mt-2 text-caption text-fg-3">
        Read on the statute or regulator&apos;s page on {CHECKED}. A summary, not legal advice.
      </figcaption>
    </figure>
  )
}

export function CasesList() {
  return (
    <ul className="not-prose my-6 space-y-3">
      {CASES.map((c) => (
        <li key={c.name} className="rounded-xl border border-border bg-surface p-4 text-small">
          <a href={c.url} className={`font-semibold ${link}`}>
            {c.name}
          </a>
          <p className={`${kicker} mt-1 text-fg-3`}>{c.filed}</p>
          <p className="mt-1 text-fg-2">{c.what}</p>
        </li>
      ))}
    </ul>
  )
}
