import {
  WORKED,
  WORKED_REPS,
  inr,
  USD_INR,
  USD_INR_DATE,
  FX_URL,
} from '@/data/indiaSalesTrainingData'

/** Worked cost example: 20 reps, one quarter, published prices plus 18% GST. Server-rendered. */
export function IndiaSalesTrainingWorkedTable() {
  return (
    <div className="my-6">
      <ul className="not-prose divide-y divide-border border-y border-border sm:hidden">
        {WORKED.map((w) => (
          <li key={w.option} className="py-3 text-small">
            <span className="font-semibold text-fg">{w.option}</span>
            <span className="mt-1 block text-fg">
              {inr(w.beforeGst)} + {inr(w.gst)} GST = <strong>{inr(w.total)}</strong> ·{' '}
              {inr(w.perRep)} per rep
            </span>
            <span className="mt-0.5 block text-caption text-fg-3">
              {w.basis}. {w.note}
            </span>
          </li>
        ))}
      </ul>
      <div className="hidden w-full overflow-x-auto sm:block">
        <table className="min-w-[44rem] text-small">
          <thead>
            <tr>
              <th>Option</th>
              <th>Before GST</th>
              <th>GST 18%</th>
              <th>Total</th>
              <th>Per rep ({WORKED_REPS})</th>
            </tr>
          </thead>
          <tbody>
            {WORKED.map((w) => (
              <tr key={w.option}>
                <td>
                  {w.option}
                  <span className="block text-caption text-fg-3">
                    {w.basis}. {w.note}
                  </span>
                </td>
                <td>{inr(w.beforeGst)}</td>
                <td>{inr(w.gst)}</td>
                <td>
                  <strong>{inr(w.total)}</strong>
                </td>
                <td>{inr(w.perRep)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="not-prose mt-2 text-caption text-fg-3">
        {WORKED_REPS} reps, one quarter, list prices. Dollar prices converted at ₹{USD_INR} (
        <a href={FX_URL} target="_blank" rel="noopener" className="underline">
          RBI reference rate
        </a>
        , {USD_INR_DATE}). Pinvista&apos;s page does not say whether GST is included; we added it.
        Travel, venue and your reps&apos; time are not included.
      </p>
    </div>
  )
}
