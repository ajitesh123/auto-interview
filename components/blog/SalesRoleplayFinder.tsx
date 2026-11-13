'use client'

import { useState } from 'react'
import { VENDORS, KINDS, CHECKED, type Kind, type RoleplayVendor } from '@/data/salesRoleplayData'

const PRICE_LABEL = {
  published: 'Price published',
  'free-then-quote': 'Free plan, then quote',
  quote: 'Quote only',
} as const

const triText = (t: string) => (t === 'yes' ? 'Yes' : t === 'no' ? 'No' : 'Not stated')

/**
 * Shortlist finder for /blog/best-sales-roleplay-software-platforms-2026. Every vendor is rendered
 * on the server (the list works without JavaScript); the filters only hide cards. Not a ranking.
 */
export default function SalesRoleplayFinder() {
  const [kind, setKind] = useState<Kind | 'all'>('all')
  const [free, setFree] = useState(false)
  const [priced, setPriced] = useState(false)
  const [voice, setVoice] = useState(false)
  const [calls, setCalls] = useState(false)
  const [real, setReal] = useState(false)

  const shown = VENDORS.filter(
    (v: RoleplayVendor) =>
      (kind === 'all' || v.kind === kind) &&
      (!free || v.freeStart !== '') &&
      (!priced || v.priceStatus === 'published') &&
      (!voice || v.voice === 'yes') &&
      (!calls || v.fromCalls === 'yes') &&
      (!real || v.realCalls === 'yes')
  )

  const select =
    'mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-small text-fg focus:outline-none focus:ring-2 focus:ring-signal'
  const boxes: [string, boolean, (b: boolean) => void][] = [
    ['Free start, no sales call', free, setFree],
    ['Publishes a paid price', priced, setPriced],
    ['Says the AI buyer speaks', voice, setVoice],
    ['Builds scenarios from your calls', calls, setCalls],
    ['Scores real customer calls too', real, setReal],
  ]

  return (
    <section
      aria-label="AI sales roleplay software, filterable"
      className="not-prose my-8 rounded-2xl border border-border bg-surface p-4 md:p-6"
    >
      <label className="block max-w-sm text-small font-medium text-fg">
        What you want to buy
        <select
          className={select}
          value={kind}
          onChange={(e) => setKind(e.target.value as Kind | 'all')}
        >
          <option value="all">All kinds</option>
          {KINDS.map((k) => (
            <option key={k.id} value={k.id}>
              {k.short}
            </option>
          ))}
        </select>
      </label>
      <fieldset className="mt-3">
        <legend className="text-small font-medium text-fg">Must have</legend>
        <div className="mt-1 flex flex-wrap gap-x-6 gap-y-2 text-small text-fg">
          {boxes.map(([label, on, set]) => (
            <label key={label} className="flex items-center gap-2">
              <input type="checkbox" checked={on} onChange={(e) => set(e.target.checked)} />
              {label}
            </label>
          ))}
        </div>
      </fieldset>
      <p className="mt-4 text-small text-fg-2" aria-live="polite">
        Showing {shown.length} of {VENDORS.length} tools.
        {shown.length === 0 && ' No tool states all of these on its own pages; clear a filter.'}
      </p>
      <ul className="mt-3 divide-y divide-border border-y border-border">
        {shown.map((v) => (
          <li key={v.id} className="py-4 text-small">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <a
                href={v.url}
                target="_blank"
                rel="noopener"
                className="text-body font-semibold text-fg underline decoration-border-strong underline-offset-2 hover:decoration-signal"
              >
                {v.name}
              </a>
              <span className="font-mono text-caption uppercase tracking-[0.06em] text-signal-strong">
                {KINDS.find((k) => k.id === v.kind)?.short}
                {v.ours ? ' · our product' : ''}
              </span>
            </div>
            <p className="mt-1 text-fg-2">{v.bestFor}</p>
            <dl className="mt-2 grid gap-x-4 gap-y-1 sm:grid-cols-[9rem_1fr]">
              <dt className="text-fg-3">Price</dt>
              <dd className="text-fg">
                {v.price} <span className="text-fg-3">· {PRICE_LABEL[v.priceStatus]}</span>
              </dd>
              <dt className="text-fg-3">Free start</dt>
              <dd className="text-fg">{v.freeStart || 'None self-serve'}</dd>
              <dt className="text-fg-3">Minimum</dt>
              <dd className="text-fg">{v.minimum}</dd>
              <dt className="text-fg-3">How the buyer talks</dt>
              <dd className="text-fg">{v.modes}</dd>
              <dt className="text-fg-3">From your calls</dt>
              <dd className="text-fg">{triText(v.fromCalls)}</dd>
              <dt className="text-fg-3">Scores real calls</dt>
              <dd className="text-fg">{triText(v.realCalls)}</dd>
              <dt className="text-fg-3">Languages</dt>
              <dd className="text-fg">{v.languages || 'Not stated'}</dd>
              <dt className="text-fg-3">Security stated</dt>
              <dd className="text-fg">{v.security || 'Not stated on the page we opened'}</dd>
              {v.note && (
                <>
                  <dt className="text-fg-3">Watch for</dt>
                  <dd className="text-fg">{v.note}</dd>
                </>
              )}
              {v.also && (
                <>
                  <dt className="text-fg-3">Also read</dt>
                  <dd className="text-fg">
                    {v.also.map((l, i) => (
                      <span key={l.url}>
                        {i > 0 && ', '}
                        <a href={l.url} target="_blank" rel="noopener" className="underline">
                          {l.label}
                        </a>
                      </span>
                    ))}
                  </dd>
                </>
              )}
            </dl>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-caption text-fg-3">
        Every fact was read on the vendor&apos;s own pages on {CHECKED} (Tough Tongue AI&apos;s
        pricing on 12 Nov 2026); each name links to the page we opened. &quot;Not stated&quot; means
        we did not find it there, not that the feature is missing. Not a ranking. Tough Tongue AI
        runs this site.
      </p>
    </section>
  )
}
