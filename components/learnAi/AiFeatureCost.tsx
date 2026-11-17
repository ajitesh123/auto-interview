'use client'

import { useId, useState } from 'react'
import {
  PRICED_MODELS,
  WORKED,
  fmtUsd,
  perMonth,
  perRequest,
  type Usage,
} from '@/data/learnAi/aiFeatureCost'

// "What will this AI feature cost a month?" No AI, no network: list price x tokens x traffic,
// computed in the browser. Prices live in data/learnAi/aiFeatureCost.ts with their sources.

const fieldCls =
  'mt-1.5 h-11 w-full rounded-lg bg-surface px-3 text-body tabular-nums text-fg ring-1 ring-inset ring-border-strong focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-strong'

const PRESETS: { id: string; label: string; u: Usage }[] = [
  { id: 'triage', label: 'Ticket triage (the worked example)', u: WORKED },
  {
    id: 'summary',
    label: 'Meeting-notes summary',
    u: { perDay: 2_000, inTok: 8_000, outTok: 500 },
  },
  {
    id: 'chat',
    label: 'Help-centre chatbot reply',
    u: { perDay: 50_000, inTok: 3_000, outTok: 300 },
  },
]

type Field = 'perDay' | 'inTok' | 'outTok'

const LIMITS: Record<Field, [number, number]> = {
  perDay: [1, 100_000_000],
  inTok: [1, 1_000_000],
  outTok: [1, 200_000],
}

const clamp = (f: Field, n: number) => Math.min(LIMITS[f][1], Math.max(LIMITS[f][0], Math.round(n)))

export default function AiFeatureCost() {
  const id = useId()
  const [preset, setPreset] = useState('triage')
  const [vals, setVals] = useState<Record<Field, string>>({
    perDay: String(WORKED.perDay),
    inTok: String(WORKED.inTok),
    outTok: String(WORKED.outTok),
  })

  const num = (f: Field) => Number(vals[f])
  const valid = (['perDay', 'inTok', 'outTok'] as Field[]).every(
    (f) => Number.isFinite(num(f)) && num(f) > 0
  )
  const u: Usage = {
    perDay: valid ? clamp('perDay', num('perDay')) : 0,
    inTok: valid ? clamp('inTok', num('inTok')) : 0,
    outTok: valid ? clamp('outTok', num('outTok')) : 0,
    days: 30,
  }
  const priced = (m: (typeof PRICED_MODELS)[number]) => !(m.maxIn && u.inTok > m.maxIn)
  const unpriced = valid ? PRICED_MODELS.filter((m) => !priced(m)) : []

  const rows = valid
    ? PRICED_MODELS.filter(priced)
        .map((m) => ({ m, req: perRequest(m, u), month: perMonth(m, u) }))
        .sort((a, b) => a.month - b.month || a.m.name.localeCompare(b.m.name))
    : []
  const max = rows.length ? rows[rows.length - 1].month : 0
  const cheap = rows[0]
  const dear = rows[rows.length - 1]
  const ratio = cheap && cheap.month > 0 ? Math.round(dear.month / cheap.month) : 0
  const haikuLong = valid && u.inTok > 100_000

  function pick(pid: string) {
    setPreset(pid)
    const p = PRESETS.find((x) => x.id === pid)
    if (p)
      setVals({ perDay: String(p.u.perDay), inTok: String(p.u.inTok), outTok: String(p.u.outTok) })
  }

  function input(f: Field, label: string, hint: string) {
    return (
      <label className="block min-w-0 text-small font-medium text-fg" htmlFor={`${id}-${f}`}>
        {label}
        <input
          id={`${id}-${f}`}
          type="number"
          inputMode="numeric"
          min={LIMITS[f][0]}
          max={LIMITS[f][1]}
          step={1}
          value={vals[f]}
          onChange={(e) => {
            setVals((v) => ({ ...v, [f]: e.target.value }))
            setPreset('custom')
          }}
          onBlur={() => {
            const n = Number(vals[f])
            if (Number.isFinite(n) && n > 0) setVals((v) => ({ ...v, [f]: String(clamp(f, n)) }))
          }}
          className={fieldCls}
        />
        <span className="mt-1 block text-caption font-normal text-fg-3">{hint}</span>
      </label>
    )
  }

  return (
    <div className="rounded-xl border border-border bg-surface p-5 md:p-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block text-small font-medium text-fg sm:col-span-3" htmlFor={`${id}-p`}>
          Start from a feature
          <select
            id={`${id}-p`}
            value={preset}
            onChange={(e) => pick(e.target.value)}
            className={fieldCls}
          >
            {PRESETS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
            <option value="custom">Custom: my own numbers</option>
          </select>
        </label>
        {input('perDay', 'Requests a day', 'How often the feature runs')}
        {input('inTok', 'Input tokens per request', 'Instructions + context + user text')}
        {input('outTok', 'Output tokens per request', 'What the model writes back')}
      </div>

      <div aria-live="polite" className="mt-6 border-t border-border pt-5">
        {valid ? (
          <>
            <p className="text-body text-fg">
              A 30-day month is{' '}
              <strong className="tabular-nums">{(u.perDay * 30).toLocaleString('en-US')}</strong>{' '}
              requests. The cheapest model below costs{' '}
              <strong className="tabular-nums">{fmtUsd(cheap.month)}</strong> a month; the dearest
              costs <strong className="tabular-nums">{fmtUsd(dear.month)}</strong>
              {ratio > 1 ? (
                <>
                  , about <strong className="tabular-nums">{ratio}×</strong> as much
                </>
              ) : null}
              . Run your eval on the cheap ones first: if one passes your bar, that gap is yours to
              keep.
            </p>
            <ul className="mt-5 space-y-3">
              {rows.map((r) => (
                <li
                  key={r.m.id}
                  className="grid grid-cols-[minmax(0,9rem)_1fr] items-center gap-3 sm:grid-cols-[12rem_1fr_7rem]"
                >
                  <span className="truncate text-small text-fg" title={r.m.name}>
                    {r.m.name}
                  </span>
                  <span className="relative block h-2.5 overflow-hidden rounded-full bg-muted">
                    <span
                      className="absolute inset-y-0 left-0 rounded-full bg-signal transition-[width] duration-slow motion-reduce:transition-none"
                      style={{ width: `${max > 0 ? Math.max(1.5, (r.month / max) * 100) : 0}%` }}
                    />
                  </span>
                  <span className="col-span-2 -mt-2 text-caption tabular-nums text-fg-2 sm:col-span-1 sm:mt-0 sm:text-right">
                    <strong className="text-small text-fg">{fmtUsd(r.month)}</strong>/mo ·{' '}
                    {fmtUsd(r.req * 1000)} per 1k
                  </span>
                </li>
              ))}
            </ul>
            {haikuLong && (
              <p className="mt-4 rounded-lg bg-muted px-4 py-3 text-small text-fg">
                Over 100,000 input tokens a request, Claude Haiku 5.5 switches to its long-prompt
                price ($0.50 in, $2.50 out per million), and that is what you see above.
              </p>
            )}
            {unpriced.length > 0 && (
              <p className="mt-3 rounded-lg bg-muted px-4 py-3 text-small text-fg">
                Not shown: {unpriced.map((m) => m.name).join(', ')}. Over 272,000 input tokens a
                request OpenAI charges a higher long-context price, which this calculator does not
                model.
              </p>
            )}
            <p className="mt-4 text-caption text-fg-3">
              List prices per million tokens from Anthropic and OpenAI, opened 17 Nov 2026. No
              prompt caching, batch discount or tax. A real bill also has retries and longer edge
              cases: add a margin.
            </p>
          </>
        ) : (
          <p className="text-small text-fg-2">Enter three numbers above zero.</p>
        )}
      </div>
    </div>
  )
}
