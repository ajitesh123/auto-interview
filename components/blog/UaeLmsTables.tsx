import {
  CHECKED,
  PLATFORMS,
  SEGMENTS,
  USD_AED,
  WORKED_LEARNERS,
  costRows,
  formatAed,
} from '@/data/uaeLmsData'

const segLabel = (ids: string[]) =>
  ids.map((id) => SEGMENTS.find((s) => s.id === id)?.label ?? id).join(', ')

const Linked = ({ text, url }: { text: string; url?: string }) =>
  url ? (
    <a href={url} target="_blank" rel="noopener">
      {text}
    </a>
  ) : (
    <>{text}</>
  )

/** Every platform: who it is for, price as written, hosting, UAE law, Arabic, UAE office. */
export function UaeLmsTable() {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-[80rem]">
        <thead>
          <tr>
            <th scope="col">Platform</th>
            <th scope="col">Built for</th>
            <th scope="col">Published price (as written)</th>
            <th scope="col">Where data is hosted</th>
            <th scope="col">UAE PDPL, DIFC or ADGM statement</th>
            <th scope="col">Arabic and right-to-left</th>
            <th scope="col">UAE office</th>
          </tr>
        </thead>
        <tbody>
          {PLATFORMS.map((p) => (
            <tr key={p.id}>
              <th scope="row" className="text-left font-medium">
                <a href={p.priceUrl} target="_blank" rel="noopener">
                  {p.name}
                </a>
                {p.ours ? ' (our product)' : ''}
              </th>
              <td>{segLabel(p.segments)}</td>
              <td>
                {p.stated}
                {p.billing !== 'Not stated' && p.billing !== 'USD' ? ` (${p.billing})` : ''}
              </td>
              <td>
                <Linked text={p.hosting} url={p.hostingUrl} />
              </td>
              <td>
                <Linked text={p.law} url={p.lawUrl} />
              </td>
              <td>
                <Linked text={p.arabic} url={p.arabicUrl} />
              </td>
              <td>
                <Linked text={p.office} url={p.officeUrl} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-caption text-fg-3">
        Each name links to the page we read the price on, opened {CHECKED}. &quot;Not stated&quot;
        means the vendor&apos;s pages we opened say nothing on it; ask for it in writing.
      </p>
    </div>
  )
}

/** Worked example at one team size, VAT shown both ways. Same data as the calculator. */
export function UaeLmsWorkedTable() {
  const reg = costRows(WORKED_LEARNERS, 'registered')
  const unreg = costRows(WORKED_LEARNERS, 'not-registered')
  const rows = reg
    .map((r, i) => ({ r, n: unreg[i] }))
    .filter(({ r }) => r.listAed !== null)
    .sort((a, b) => (a.r.listAed ?? 0) - (b.r.listAed ?? 0))
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-[56rem]">
        <thead>
          <tr>
            <th scope="col">Platform</th>
            <th scope="col">List price, year one</th>
            <th scope="col">VAT at 5%</th>
            <th scope="col">You pay (not VAT-registered)</th>
            <th scope="col">How we got it</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ r, n }) => (
            <tr key={r.id}>
              <th scope="row" className="text-left font-medium">
                {r.name}
                {r.ours ? ' (our product, practice only)' : ''}
              </th>
              <td className="tabular-nums">
                {r.note.startsWith('From') ? 'from ' : ''}
                {formatAed(r.listAed as number)}
              </td>
              <td className="tabular-nums">{formatAed(r.vatAed as number)}</td>
              <td className="tabular-nums">{formatAed(n.netAed as number)}</td>
              <td>
                {r.note} (US dollars × {USD_AED})
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-caption text-fg-3">
        {WORKED_LEARNERS} learners. Dollars converted at the fixed peg of AED {USD_AED}, rounded. A
        VAT-registered business recovers the 5% (reverse charge on a foreign vendor, input tax on a
        UAE invoice), so it ends up paying the list price; others pay the VAT column on top. Before
        discounts, setup fees and card or bank charges.
      </p>
    </div>
  )
}
