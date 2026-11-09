'use client'

import { useId, useState } from 'react'
import { MOE_MODELS, PRECISIONS, activePct, weightsGB } from '@/data/learnAi/moeModels'

// "Will it fit?" for mixture-of-experts models. No AI, no network: plain arithmetic in the
// browser. Memory for weights = total parameters x bytes per weight; compute per token
// follows the active parameters. Numbers for the presets come from data/learnAi/moeModels.ts.

const fmt = (n: number) => n.toLocaleString('en-US', { maximumFractionDigits: 1 })

const fieldCls =
  'mt-1.5 h-11 w-full rounded-lg bg-surface px-3 text-body tabular-nums text-fg ring-1 ring-inset ring-border-strong focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-strong'

export default function MoeCalculator() {
  const id = useId()
  const [preset, setPreset] = useState('gpt-oss-20b')
  const start = MOE_MODELS.find((m) => m.name === 'gpt-oss-20b') ?? MOE_MODELS[0]
  const [total, setTotal] = useState(String(start.totalB))
  const [active, setActive] = useState(String(start.activeB))
  const [prec, setPrec] = useState<string>('4')
  const [mem, setMem] = useState('16')

  const t = Number(total)
  const a = Number(active)
  const m = Number(mem)
  const bytes = PRECISIONS.find((p) => p.id === prec)?.bytes ?? 0.5
  const valid = t > 0 && a > 0 && a <= t
  const weights = valid ? weightsGB(t, bytes) : 0
  const share = valid ? activePct({ totalB: t, activeB: a }) : 0
  const left = Math.round((m - weights) * 10) / 10

  function pick(name: string) {
    setPreset(name)
    const found = MOE_MODELS.find((x) => x.name === name)
    if (found) {
      setTotal(String(found.totalB))
      setActive(String(found.activeB))
    }
  }

  return (
    <div className="rounded-xl border border-border bg-surface p-5 md:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-small font-medium text-fg sm:col-span-2" htmlFor={`${id}-m`}>
          Start from a model
          <select
            id={`${id}-m`}
            value={preset}
            onChange={(e) => pick(e.target.value)}
            className={fieldCls}
          >
            {MOE_MODELS.map((x) => (
              <option key={x.name} value={x.name}>
                {x.name} ({x.maker})
              </option>
            ))}
            <option value="custom">Custom: type your own numbers</option>
          </select>
        </label>
        <label className="block text-small font-medium text-fg" htmlFor={`${id}-t`}>
          Total parameters (billions)
          <input
            id={`${id}-t`}
            type="number"
            inputMode="decimal"
            min={0}
            step="any"
            value={total}
            onChange={(e) => {
              setTotal(e.target.value)
              setPreset('custom')
            }}
            className={fieldCls}
          />
        </label>
        <label className="block text-small font-medium text-fg" htmlFor={`${id}-a`}>
          Active parameters per token (billions)
          <input
            id={`${id}-a`}
            type="number"
            inputMode="decimal"
            min={0}
            step="any"
            value={active}
            onChange={(e) => {
              setActive(e.target.value)
              setPreset('custom')
            }}
            className={fieldCls}
          />
        </label>
        <fieldset className="sm:col-span-1">
          <legend className="text-small font-medium text-fg">Precision of the weights</legend>
          <div className="mt-1.5 flex gap-2">
            {PRECISIONS.map((p) => (
              <button
                key={p.id}
                type="button"
                aria-pressed={prec === p.id}
                onClick={() => setPrec(p.id)}
                className={`h-11 flex-1 rounded-full px-3 text-small font-semibold ring-1 ring-inset transition-colors duration-fast ${
                  prec === p.id
                    ? 'bg-ink text-ink-fg ring-ink'
                    : 'bg-surface text-fg ring-border-strong hover:bg-muted'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </fieldset>
        <label className="block text-small font-medium text-fg" htmlFor={`${id}-r`}>
          Your memory: RAM, VRAM or Mac unified (GB)
          <input
            id={`${id}-r`}
            type="number"
            inputMode="decimal"
            min={0}
            step="any"
            value={mem}
            onChange={(e) => setMem(e.target.value)}
            className={fieldCls}
          />
        </label>
      </div>

      <div aria-live="polite" className="mt-6 border-t border-border pt-5">
        {valid ? (
          <dl className="grid gap-4 sm:grid-cols-3">
            <div>
              <dt className="text-small text-fg-2">Memory for the weights (at least)</dt>
              <dd className="mt-1 text-h2 font-semibold tabular-nums text-fg">{fmt(weights)} GB</dd>
              <dd className="text-caption text-fg-3">
                {fmt(t)}B total × {bytes} byte{bytes === 1 ? '' : 's'}
              </dd>
            </div>
            <div>
              <dt className="text-small text-fg-2">Compute per token, like a dense model of</dt>
              <dd className="mt-1 text-h2 font-semibold tabular-nums text-fg">{fmt(a)}B</dd>
              <dd className="text-caption text-fg-3">if the weights sit in fast memory</dd>
            </div>
            <div>
              <dt className="text-small text-fg-2">Share used per token</dt>
              <dd className="mt-1 text-h2 font-semibold tabular-nums text-fg">{share}%</dd>
              <dd className="text-caption text-fg-3">
                {fmt(a)}B of {fmt(t)}B
              </dd>
            </div>
          </dl>
        ) : (
          <p className="text-small text-fg-2">
            Enter total and active parameters above zero, with active no bigger than total.
          </p>
        )}
        {valid && m > 0 && (
          <p className="mt-5 rounded-lg bg-muted px-4 py-3 text-small text-fg">
            {left >= 0 ? (
              <>
                <strong>The weights fit</strong> in {fmt(m)} GB with {fmt(left)} GB left. You still
                need room for the conversation (the KV cache, which grows with context) and your
                other apps, and real quantized files run a little bigger, so leave a margin.
              </>
            ) : (
              <>
                <strong>Too big:</strong> the weights need {fmt(Math.abs(left))} GB more than{' '}
                {fmt(m)} GB. Try a lower precision or a smaller model. A small active size does not
                help here: every expert must be loaded.
              </>
            )}
          </p>
        )}
      </div>
    </div>
  )
}
