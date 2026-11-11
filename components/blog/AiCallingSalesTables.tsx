import { VENDORS, WORKED, CHECKED, usd } from '@/data/aiCallingSalesData'

/** Server-rendered price table: every row links to the pricing page we opened. */
export function AiCallingVendorTable() {
  const groups: { kind: 'agent' | 'dialer'; title: string }[] = [
    { kind: 'agent', title: 'AI voice agents (the AI talks)' },
    { kind: 'dialer', title: 'AI-assisted dialers (a rep talks)' },
  ]
  return (
    <>
      <div className="not-prose space-y-6 sm:hidden">
        {groups.map((g) => (
          <div key={g.kind}>
            <p className="text-small font-semibold text-fg">{g.title}</p>
            <ul className="mt-2 divide-y divide-border border-y border-border">
              {VENDORS.filter((v) => v.kind === g.kind).map((v) => (
                <li key={v.id} className="py-3 text-small">
                  <a
                    href={v.url}
                    target="_blank"
                    rel="noopener"
                    className="font-medium text-fg underline"
                  >
                    {v.name}
                  </a>
                  {v.region ? <span className="text-fg-3"> ({v.region})</span> : null}
                  <span className="mt-1 block text-fg">{v.stated}</span>
                  <span className="mt-0.5 block text-caption text-fg-3">{v.covers}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <p className="text-caption text-fg-3">
          Each tool links to the pricing page we opened on {CHECKED}.
        </p>
      </div>
      <div className="hidden w-full overflow-x-auto sm:block">
        <table className="min-w-[40rem]">
          <thead>
            <tr>
              <th>Tool</th>
              <th>Published price (as written)</th>
              <th>What the price covers</th>
            </tr>
          </thead>
          {groups.map((g) => (
            <tbody key={g.kind}>
              <tr>
                <th colSpan={3} scope="colgroup">
                  {g.title}
                </th>
              </tr>
              {VENDORS.filter((v) => v.kind === g.kind).map((v) => (
                <tr key={v.id}>
                  <td>
                    <a href={v.url} target="_blank" rel="noopener">
                      {v.name}
                    </a>
                    {v.region ? ` (${v.region})` : ''}
                  </td>
                  <td>{v.stated}</td>
                  <td>{v.covers}</td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
        <p className="text-caption text-fg-3">
          Each tool links to the pricing page we opened on {CHECKED}. List prices before tax and
          volume deals.
        </p>
      </div>
    </>
  )
}

/** Worked example computed from the same function the calculator uses. */
export function AiCallingWorkedTable() {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-[40rem]">
        <thead>
          <tr>
            <th>Funnel (Gong rates)</th>
            <th>Price / min</th>
            <th>Conversations</th>
            <th>Meetings</th>
            <th>Billed minutes</th>
            <th>Cost</th>
            <th>Cost per meeting</th>
          </tr>
        </thead>
        <tbody>
          {WORKED.map((w) => (
            <tr key={w.funnel.id + w.price}>
              <td>{w.funnel.id === 'avg' ? 'Average rep' : 'Top reps'}</td>
              <td>{usd(w.price)}</td>
              <td>{Math.round(w.conversations)}</td>
              <td>{w.meetings.toFixed(1)}</td>
              <td>{w.minutes.toLocaleString('en-US')}</td>
              <td>{usd(w.cost)}</td>
              <td>{w.perMeeting === null ? '–' : usd(w.perMeeting)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-caption text-fg-3">
        1,000 dials; 3 minutes per conversation; 0.5 billed minutes for each dial that is not
        answered (our assumption). Telephony, setup and your own time are not included.
      </p>
    </div>
  )
}
