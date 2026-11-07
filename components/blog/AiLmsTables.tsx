import {
  ACADEMIC,
  CAPABILITIES,
  CHECKED,
  PLATFORMS,
  WORKED_LEARNERS,
  costs,
} from '@/data/aiLmsData'

const usd = (n: number) =>
  `$${n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`

/** Which AI capability each platform names on its own site (server-rendered). */
export function AiLmsFeatureMatrix() {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-[64rem]">
        <thead>
          <tr>
            <th scope="col">Platform</th>
            {CAPABILITIES.map((c) => (
              <th key={c.id} scope="col">
                {c.short}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PLATFORMS.map((p) => (
            <tr key={p.id}>
              <th scope="row" className="text-left font-medium">
                <a href={p.aiUrl} target="_blank" rel="noopener">
                  {p.name}
                </a>
                {p.ours ? ' (our product)' : ''}
              </th>
              {CAPABILITIES.map((c) => (
                <td key={c.id}>{p.ai[c.id] ?? '—'}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-caption text-fg-3">
        A cell shows the feature name the vendor uses on its own AI page, opened {CHECKED}. A dash
        means we found no such feature on the vendor&apos;s site, not that it can never exist.
      </p>
    </div>
  )
}

/** Published prices as written, plus how AI is charged. */
export function AiLmsPriceTable() {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-[52rem]">
        <thead>
          <tr>
            <th scope="col">Platform</th>
            <th scope="col">Published price (as written)</th>
            <th scope="col">How AI is charged</th>
            <th scope="col">Best for</th>
          </tr>
        </thead>
        <tbody>
          {PLATFORMS.map((p) => (
            <tr key={p.id}>
              <th scope="row" className="text-left font-medium">
                <a href={p.pricingUrl} target="_blank" rel="noopener">
                  {p.name}
                </a>
                {p.ours ? ' (our product)' : ''}
              </th>
              <td>{p.stated}</td>
              <td>{p.aiPricing}</td>
              <td>{p.bestFor}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-caption text-fg-3">
        Each name links to the pricing page we opened on {CHECKED}. US dollars, before tax.
      </p>
    </div>
  )
}

/** Worked example: year-one list price for one team size, same data as the picker. */
export function AiLmsWorkedTable() {
  const lines = costs(WORKED_LEARNERS).filter((l) => l.annual !== null)
  const sorted = [...lines].sort((a, b) => (a.annual ?? 0) - (b.annual ?? 0))
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-[36rem]">
        <thead>
          <tr>
            <th scope="col">Platform</th>
            <th scope="col">Year one, {WORKED_LEARNERS} learners</th>
            <th scope="col">Per learner</th>
            <th scope="col">How we got it</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((l) => (
            <tr key={l.id}>
              <th scope="row" className="text-left font-medium">
                {l.name}
                {l.ours ? ' (our product, practice only)' : ''}
              </th>
              <td className="tabular-nums">
                {l.note.startsWith('From') ? 'from ' : ''}
                {usd(l.annual as number)}
              </td>
              <td className="tabular-nums">
                {l.ours
                  ? '—'
                  : usd(Math.round(((l.annual as number) / WORKED_LEARNERS) * 100) / 100)}
              </td>
              <td>{l.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** Schools and universities. */
export function AiLmsAcademicTable() {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-[44rem]">
        <thead>
          <tr>
            <th scope="col">LMS</th>
            <th scope="col">AI features (vendor names)</th>
            <th scope="col">Price and AI access</th>
          </tr>
        </thead>
        <tbody>
          {ACADEMIC.map((a) => (
            <tr key={a.name}>
              <th scope="row" className="text-left font-medium">
                <a href={a.url} target="_blank" rel="noopener">
                  {a.name}
                </a>
              </th>
              <td>{a.ai}</td>
              <td>{a.pricing}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
