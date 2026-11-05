'use client'

import { useMemo, useState } from 'react'
import {
  TELEPHONY,
  STT,
  LLM,
  TTS,
  PLATFORM,
  DEFAULTS,
  costBreakdown,
  findOpt,
  LATENCY_TWILIO,
  HUMAN_GAP_MS,
  type CostInputs,
  type PriceOption,
} from '@/data/voiceAiPricing'

const usd = (n: number, d = 4) =>
  `$${(Math.round(Number((n * 10 ** d).toPrecision(12))) / 10 ** d).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d })}`

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: PriceOption[]
  onChange: (v: string) => void
}) {
  const opt = findOpt(options, value)
  return (
    <label className="block">
      <span className="text-small font-medium text-fg">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 h-11 w-full rounded-lg border border-border-input bg-surface px-3 text-small text-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-strong"
      >
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </select>
      <span className="mt-1 block text-caption text-fg-3">
        {opt.stated} ·{' '}
        <a href={opt.source} target="_blank" rel="noopener" className="underline hover:text-fg">
          source
        </a>
      </span>
    </label>
  )
}

function NumberField({
  label,
  value,
  onChange,
  min,
  max,
  step,
  suffix,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step: number
  suffix?: string
}) {
  return (
    <label className="block">
      <span className="text-small font-medium text-fg">{label}</span>
      <span className="mt-1.5 flex items-center gap-2">
        <input
          type="number"
          inputMode="decimal"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => {
            const v = Number(e.target.value)
            if (!Number.isNaN(v)) onChange(Math.min(max, Math.max(min, v)))
          }}
          className="h-11 w-full rounded-lg border border-border-input bg-surface px-3 text-small tabular-nums text-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-strong"
        />
        {suffix && <span className="shrink-0 text-caption text-fg-3">{suffix}</span>}
      </span>
    </label>
  )
}

export function CostCalculator() {
  const [i, setI] = useState<CostInputs>(DEFAULTS)
  const [minutes, setMinutes] = useState(10000)
  const b = useMemo(() => costBreakdown(i), [i])
  const set = <K extends keyof CostInputs>(k: K, v: CostInputs[K]) =>
    setI((p) => ({ ...p, [k]: v }))
  const rows: [string, number][] = [
    ['Phone line', b.tel],
    ['Speech-to-text', b.stt],
    ['LLM', b.llm],
    ['Text-to-speech', b.tts],
    ['Platform fee', b.platform],
  ]

  return (
    <div className="rounded-2xl border border-border bg-surface p-5 md:p-6">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          <Select
            label="Phone line"
            value={i.telephony}
            options={TELEPHONY}
            onChange={(v) => set('telephony', v)}
          />
          <Select
            label="Speech-to-text"
            value={i.stt}
            options={STT}
            onChange={(v) => set('stt', v)}
          />
          <Select label="LLM" value={i.llm} options={LLM} onChange={(v) => set('llm', v)} />
          <Select
            label="Text-to-speech"
            value={i.tts}
            options={TTS}
            onChange={(v) => set('tts', v)}
          />
          <Select
            label="Orchestration"
            value={i.platform}
            options={PLATFORM}
            onChange={(v) => set('platform', v)}
          />
          <NumberField
            label="Minutes per month"
            value={minutes}
            onChange={setMinutes}
            min={0}
            max={10000000}
            step={1000}
          />
          <details className="group sm:col-span-2">
            <summary className="cursor-pointer list-none text-small font-medium text-signal-strong">
              Change the assumptions (agent talk time, turns, tokens)
            </summary>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <NumberField
                label="Agent talks for"
                value={Math.round(i.agentTalkShare * 100)}
                onChange={(v) => set('agentTalkShare', v / 100)}
                min={0}
                max={100}
                step={5}
                suffix="% of the call"
              />
              <NumberField
                label="Agent replies per minute"
                value={i.turnsPerMin}
                onChange={(v) => set('turnsPerMin', v)}
                min={0}
                max={30}
                step={1}
              />
              <NumberField
                label="Input tokens per reply"
                value={i.inputTokensPerTurn}
                onChange={(v) => set('inputTokensPerTurn', v)}
                min={0}
                max={200000}
                step={100}
                suffix="prompt + history"
              />
              <NumberField
                label="Output tokens per reply"
                value={i.outputTokensPerTurn}
                onChange={(v) => set('outputTokensPerTurn', v)}
                min={0}
                max={4000}
                step={10}
              />
            </div>
          </details>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-xl bg-muted p-5" aria-live="polite">
            <div className="font-mono text-kicker uppercase tracking-[0.08em] text-fg-3">
              Cost per call minute
            </div>
            <div className="mt-2 text-h1 font-semibold tabular-nums text-fg">{usd(b.total)}</div>
            <div className="mt-1 text-small tabular-nums text-fg-2">
              {usd(b.total * minutes, 0)} for {minutes.toLocaleString('en-US')} minutes a month
            </div>
            <dl className="mt-5 divide-y divide-border border-t border-border text-small">
              {rows.map(([k, v]) => (
                <div key={k} className="flex items-center justify-between gap-3 py-2">
                  <dt className="text-fg-2">{k}</dt>
                  <dd className="tabular-nums text-fg">
                    {usd(v)}
                    <span className="ml-2 inline-block w-10 text-right text-caption text-fg-3">
                      {b.total > 0 ? Math.round((v / b.total) * 100) : 0}%
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <p className="mt-3 text-caption text-fg-3">
            List prices, no volume discounts. Excludes phone-number rental, servers, recording
            storage and taxes.
          </p>
        </div>
      </div>
    </div>
  )
}

const PARTS = [
  { key: 'stt', label: 'Speech-to-text final transcript', def: LATENCY_TWILIO.stt },
  { key: 'llm', label: 'LLM time to first token', def: LATENCY_TWILIO.llm },
  { key: 'tts', label: 'Text-to-speech time to first byte', def: LATENCY_TWILIO.tts },
  {
    key: 'hops',
    label: 'Platform hops between services',
    def:
      LATENCY_TWILIO.platformTurnGap - LATENCY_TWILIO.stt - LATENCY_TWILIO.llm - LATENCY_TWILIO.tts,
  },
  {
    key: 'net',
    label: 'Phone network, media edge, buffering',
    def: LATENCY_TWILIO.mouthToEar - LATENCY_TWILIO.platformTurnGap,
  },
] as const

type PartKey = (typeof PARTS)[number]['key']

export function LatencyBudget() {
  const [v, setV] = useState<Record<PartKey, number>>(
    () => Object.fromEntries(PARTS.map((p) => [p.key, p.def])) as Record<PartKey, number>
  )
  const total = PARTS.reduce((s, p) => s + v[p.key], 0)
  const max = Math.max(total, LATENCY_TWILIO.mouthToEarUpper)
  const verdict =
    total <= LATENCY_TWILIO.mouthToEar
      ? { t: 'Within Twilio’s 1,115 ms target', c: 'bg-success-soft text-success-strong' }
      : total <= LATENCY_TWILIO.mouthToEarUpper
        ? { t: 'Over target, under the 1,400 ms limit', c: 'bg-warn-soft text-warn' }
        : { t: 'Over the 1,400 ms upper limit', c: 'bg-danger-soft text-danger' }

  return (
    <div className="rounded-2xl border border-border bg-surface p-5 md:p-6">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-7">
          {PARTS.map((p) => (
            <label key={p.key} className="block">
              <span className="flex items-baseline justify-between gap-3">
                <span className="text-small font-medium text-fg">{p.label}</span>
                <span className="text-small tabular-nums text-fg-2">{v[p.key]} ms</span>
              </span>
              <input
                type="range"
                min={0}
                max={1500}
                step={5}
                value={v[p.key]}
                onChange={(e) => setV((s) => ({ ...s, [p.key]: Number(e.target.value) }))}
                className="mt-2 h-6 w-full accent-signal"
                aria-label={`${p.label} in milliseconds`}
              />
            </label>
          ))}
          <button
            type="button"
            onClick={() =>
              setV(Object.fromEntries(PARTS.map((p) => [p.key, p.def])) as Record<PartKey, number>)
            }
            className="inline-flex h-11 items-center rounded-full bg-surface px-5 text-small font-semibold text-fg ring-1 ring-inset ring-border-strong transition-colors duration-fast hover:bg-muted"
          >
            Reset to Twilio’s targets
          </button>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-xl bg-muted p-5" aria-live="polite">
            <div className="font-mono text-kicker uppercase tracking-[0.08em] text-fg-3">
              Mouth-to-ear turn gap
            </div>
            <div className="mt-2 text-h1 font-semibold tabular-nums text-fg">
              {total.toLocaleString('en-US')} ms
            </div>
            <span
              className={`mt-2 inline-flex h-6 items-center rounded-full px-2.5 text-caption font-medium ${verdict.c}`}
            >
              {verdict.t}
            </span>
            <div className="mt-5 space-y-2 text-caption text-fg-2">
              {[
                { l: 'Your stack', ms: total, strong: true },
                { l: 'Twilio target', ms: LATENCY_TWILIO.mouthToEar },
                { l: 'Twilio upper limit', ms: LATENCY_TWILIO.mouthToEarUpper },
                { l: 'Humans, average gap', ms: HUMAN_GAP_MS },
              ].map((r) => (
                <div key={r.l}>
                  <div className="flex justify-between">
                    <span>{r.l}</span>
                    <span className="tabular-nums">{r.ms.toLocaleString('en-US')} ms</span>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-surface">
                    <div
                      className={`h-2 rounded-full ${r.strong ? 'bg-signal' : 'bg-border-strong'}`}
                      style={{ width: `${Math.min(100, (r.ms / max) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-3 text-caption text-fg-3">
            The two last rows are the remainder of Twilio’s published budget (885 ms platform gap
            minus the three services; 1,115 ms minus 885 ms).
          </p>
        </div>
      </div>
    </div>
  )
}
