import {
  AUD_USD,
  CHECKED,
  PLATFORMS,
  SEGMENTS,
  WORKED_LEARNERS,
  costRows,
  formatAud,
} from '@/data/auLmsData'

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

/** Every platform: who it is for, price as written, hosting, privacy, assurance, office. */
export function AuLmsTable() {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-[84rem]">
        <thead>
          <tr>
            <th scope="col">Platform</th>
            <th scope="col">Built for</th>
            <th scope="col">Published price (as written)</th>
            <th scope="col">Where data is hosted</th>
            <th scope="col">Privacy Act or APP statement</th>
            <th scope="col">Security assurance</th>
            <th scope="col">Australian office</th>
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
              <td>
                <Linked text={p.hosting} url={p.hostingUrl} />
              </td>
              <td>
                <Linked text={p.privacy} url={p.privacyUrl} />
              </td>
              <td>
                <Linked text={p.assurance} url={p.assuranceUrl} />
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

/** Worked example at one team size, GST shown both ways. Same data as the calculator. */
export function AuLmsWorkedTable() {
  const reg = costRows(WORKED_LEARNERS, 'registered')
  const unreg = costRows(WORKED_LEARNERS, 'not-registered')
  const rows = reg
    .map((r, i) => ({ r, n: unreg[i] }))
    .filter(({ r }) => r.listAud !== null)
    .sort((a, b) => (a.r.listAud ?? 0) - (b.r.listAud ?? 0))
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-[56rem]">
        <thead>
          <tr>
            <th scope="col">Platform</th>
            <th scope="col">List price, year one</th>
            <th scope="col">GST at 10%</th>
            <th scope="col">You pay (not GST-registered)</th>
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
              <td className="tabular-nums">{formatAud(r.listAud as number)}</td>
              <td className="tabular-nums">{formatAud(r.gstAud as number)}</td>
              <td className="tabular-nums">{formatAud(n.netAud as number)}</td>
              <td>
                {r.note}
                {r.currency === 'USD' ? ` ÷ ${AUD_USD}` : ''}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-caption text-fg-3">
        {WORKED_LEARNERS} learners. US dollars converted at the RBA rate on {CHECKED} (A$1 = US$
        {AUD_USD}), rounded. A GST-registered business with full credits ends up paying the list
        price: it claims back GST on an Australian invoice, and an offshore vendor does not charge
        GST once given an ABN. Before discounts, setup fees and card or bank charges.
      </p>
    </div>
  )
}
