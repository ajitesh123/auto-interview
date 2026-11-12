'use client'

import { useState } from 'react'
import { TRAINERS, KINDS, CITIES, CHECKED, type Kind } from '@/data/indiaSalesTrainingData'

const PRICE_LABEL = {
  current: 'Price published',
  partial: 'Part of the price published',
  old: 'Only an old price published',
  quote: 'Quote only',
} as const

/**
 * Company finder for /blog/best-sales-training-companies-india. Renders every company on the
 * server (so the list works without JavaScript); the filters only hide cards.
 */
export default function IndiaSalesTrainerFinder() {
  const [kind, setKind] = useState<Kind | 'all'>('all')
  const [city, setCity] = useState<string>('all')
  const [hindi, setHindi] = useState(false)
  const [priced, setPriced] = useState(false)

  const shown = TRAINERS.filter(
    (t) =>
      (kind === 'all' || t.kind === kind) &&
      (city === 'all' || (city === 'online' ? t.online : t.cities.includes(city))) &&
      (!hindi || t.hindi) &&
      (!priced || t.priceStatus === 'current' || t.priceStatus === 'partial')
  )

  const select =
    'mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-small text-fg focus:outline-none focus:ring-2 focus:ring-signal'

  return (
    <section
      aria-label="Sales training companies in India, filterable"
      className="not-prose my-8 rounded-2xl border border-border bg-surface p-4 md:p-6"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-small font-medium text-fg">
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
        <label className="text-small font-medium text-fg">
          City
          <select className={select} value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="all">Any city</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
            <option value="online">Online delivery</option>
          </select>
        </label>
      </div>
      <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-small text-fg">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={hindi} onChange={(e) => setHindi(e.target.checked)} />
          Says it delivers in Hindi
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={priced} onChange={(e) => setPriced(e.target.checked)} />
          Publishes a price (full or part)
        </label>
      </div>
      <p className="mt-4 text-small text-fg-2" aria-live="polite">
        Showing {shown.length} of {TRAINERS.length} companies.
        {shown.length === 0 && ' No company matches all of these; clear a filter.'}
      </p>
      <ul className="mt-3 divide-y divide-border border-y border-border">
        {shown.map((t) => (
          <li key={t.id} className="py-4 text-small">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <a
                href={t.url}
                target="_blank"
                rel="noopener"
                className="text-body font-semibold text-fg underline decoration-border-strong underline-offset-2 hover:decoration-signal"
              >
                {t.name}
              </a>
              <span className="font-mono text-caption uppercase tracking-[0.06em] text-signal-strong">
                {KINDS.find((k) => k.id === t.kind)?.short}
                {t.ours ? ' · our product' : ''}
              </span>
            </div>
            <p className="mt-1 text-fg-2">{t.fit}</p>
            <dl className="mt-2 grid gap-x-4 gap-y-1 sm:grid-cols-[8rem_1fr]">
              <dt className="text-fg-3">Offers</dt>
              <dd className="text-fg">{t.offers}</dd>
              <dt className="text-fg-3">Formats</dt>
              <dd className="text-fg">{t.formats}</dd>
              <dt className="text-fg-3">Cities</dt>
              <dd className="text-fg">
                {t.cities.length ? t.cities.join(', ') : 'None named'}{' '}
                <span className="text-fg-3">({t.cityBasis})</span>
              </dd>
              <dt className="text-fg-3">Languages</dt>
              <dd className="text-fg">{t.languages || 'Not stated'}</dd>
              <dt className="text-fg-3">Price</dt>
              <dd className="text-fg">
                {t.priceUrl ? (
                  <a href={t.priceUrl} target="_blank" rel="noopener" className="underline">
                    {t.price}
                  </a>
                ) : (
                  t.price
                )}{' '}
                {t.priceStatus !== 'quote' && (
                  <span className="text-fg-3">· {PRICE_LABEL[t.priceStatus]}</span>
                )}
              </dd>
            </dl>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-caption text-fg-3">
        Every fact was read on the company&apos;s own pages on {CHECKED}; each name links to the
        page we opened. Not a ranking. Tough Tongue AI runs this site.
      </p>
    </section>
  )
}
