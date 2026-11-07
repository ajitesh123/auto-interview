import {
  CHECKED,
  PLATFORMS,
  SEGMENTS,
  USD_INR,
  USD_INR_DATE,
  WORKED_LEARNERS,
  costRows,
  formatInr,
} from '@/data/indiaLmsData'

const segLabel = (ids: string[]) =>
  ids.map((id) => SEGMENTS.find((s) => s.id === id)?.label ?? id).join(', ')

/** Every platform: who it is for, price as written, billing, India hosting, DPDP statement. */
export function IndiaLmsTable() {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-[68rem]">
        <thead>
          <tr>
            <th scope="col">Platform</th>
            <th scope="col">Built for</th>
            <th scope="col">Published price (as written)</th>
            <th scope="col">Billed in</th>
            <th scope="col">Where data is hosted</th>
            <th scope="col">DPDP statement</th>
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
              <td>{p.stated}</td>
              <td>{p.billing}</td>
              <td>
                {p.hostingUrl ? (
                  <a href={p.hostingUrl} target="_blank" rel="noopener">
                    {p.hosting}
                  </a>
                ) : (
                  p.hosting
                )}
              </td>
              <td>
                {p.dpdpUrl ? (
                  <a href={p.dpdpUrl} target="_blank" rel="noopener">
                    {p.dpdp}
                  </a>
                ) : (
                  p.dpdp
                )}
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

/** Worked example at one team size, with GST shown both ways. Same data as the calculator. */
export function IndiaLmsWorkedTable() {
  const withItc = costRows(WORKED_LEARNERS, 'itc')
  const noItc = costRows(WORKED_LEARNERS, 'no-itc')
  const rows = withItc
    .map((r, i) => ({ r, n: noItc[i] }))
    .filter(({ r }) => r.listInr !== null)
    .sort((a, b) => (a.r.listInr ?? 0) - (b.r.listInr ?? 0))
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-[56rem]">
        <thead>
          <tr>
            <th scope="col">Platform</th>
            <th scope="col">List price, year one</th>
            <th scope="col">GST at 18%</th>
            <th scope="col">You pay (no GST credit)</th>
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
                {formatInr(r.listInr as number)}
              </td>
              <td className="tabular-nums">{formatInr(r.gstInr as number)}</td>
              <td className="tabular-nums">{formatInr(n.netInr as number)}</td>
              <td>
                {r.note}
                {r.currency === 'USD' ? ` (US dollars at ₹${USD_INR})` : ''}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-caption text-fg-3">
        {WORKED_LEARNERS} learners. Dollar prices converted at ₹{USD_INR}, the RBI reference rate on{' '}
        {USD_INR_DATE}, rounded. A GST-registered company that can claim input tax credit ends up
        paying the list price; everyone else pays the last column. Before discounts, setup fees and
        bank forex charges.
      </p>
    </div>
  )
}
