import { VENDORS, annualCosts, WORKED, CHECKED } from '@/data/salesLmsPricing'

const usd = (n: number) =>
  `$${n.toLocaleString('en-US', { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 })}`

/** Server-rendered vendor comparison (prices as written on each vendor's page). */
export function SalesLmsVendorTable() {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-[56rem]">
        <thead>
          <tr>
            <th>Platform</th>
            <th>Type</th>
            <th>Published price (as written)</th>
            <th>Practice / roleplay</th>
            <th>CRM</th>
            <th>Best for</th>
          </tr>
        </thead>
        <tbody>
          {VENDORS.map((v) => (
            <tr key={v.id}>
              <td>
                <a href={v.pricingUrl} target="_blank" rel="noopener">
                  {v.name}
                </a>
                {v.ours ? ' (our product)' : ''}
              </td>
              <td>{v.type}</td>
              <td>{v.stated}</td>
              <td>{v.practice}</td>
              <td>{v.crm}</td>
              <td>{v.bestFor}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-caption text-fg-3">
        Each platform name links to the pricing page we opened on {CHECKED}.
      </p>
    </div>
  )
}

/** Worked example from the same data the calculator uses. */
export function SalesLmsWorkedTable() {
  const lines = annualCosts(WORKED.reps, WORKED.minutesPerRep)
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-[36rem]">
        <thead>
          <tr>
            <th>Option</th>
            <th>Year one, list price</th>
            <th>Per rep</th>
            <th>How we got it</th>
          </tr>
        </thead>
        <tbody>
          {lines.map((l) => (
            <tr key={l.id}>
              <td>{l.name}</td>
              <td>
                {l.annual === null
                  ? 'Quote'
                  : `${l.note.startsWith('From') ? 'from ' : ''}${usd(l.annual)}`}
              </td>
              <td>
                {l.annual === null || l.note.startsWith('From')
                  ? '—'
                  : usd(Math.round((l.annual / WORKED.reps) * 100) / 100)}
              </td>
              <td>{l.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
