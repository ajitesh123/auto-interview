import type { CSSProperties } from 'react'
import { fmtNum, rampFor, type NumFormat } from './util'

export interface Segment {
  label: string
  value: number
}

/**
 * One whole split into parts (at most six): a tall bar where each block is one part, largest
 * first, in steps of one blue so the order reads in the colour. Shares are printed inside the
 * blocks that have room and listed in the legend below. Use it instead of a pie or donut.
 * Put it inside <Figure>.
 */
export default function SegmentBar({
  parts,
  format,
  sort = true,
}: {
  parts: Segment[]
  format?: NumFormat
  sort?: boolean
}) {
  const data = (sort ? [...parts].sort((a, b) => b.value - a.value) : parts).filter(
    (p) => p.value > 0
  )
  const total = data.reduce((s, p) => s + p.value, 0)
  const colors = rampFor(data.length)
  const share = (v: number) => Math.round((v / total) * 100)
  return (
    <div>
      <div
        role="img"
        aria-label={data.map((p) => `${p.label} ${share(p.value)}%`).join(', ')}
        data-viz-bar
        className="flex h-7 w-full gap-[2px]"
      >
        {data.map((p, i) => {
          const pct = (p.value / total) * 100
          // dark text on the two lightest steps, white on the rest
          const light = colors[i] === '#94A8FF' || colors[i] === '#6680FF'
          return (
            <div
              key={p.label}
              title={`${p.label}: ${fmtNum(p.value, format)} (${share(p.value)}%)`}
              style={{ width: `${pct}%`, backgroundColor: colors[i] } as CSSProperties}
              className={`flex min-w-[3px] items-center overflow-hidden rounded-[4px] px-2 text-caption font-semibold tabular-nums ${light ? 'text-ink' : 'text-white'}`}
            >
              {pct >= 11 ? `${share(p.value)}%` : ''}
            </div>
          )
        })}
      </div>
      <ul className="mt-4 grid gap-x-6 gap-y-2 text-small sm:grid-cols-2">
        {data.map((p, i) => (
          <li key={p.label} className="flex items-center justify-between gap-3">
            <span className="inline-flex min-w-0 items-center gap-2 text-fg-2">
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 shrink-0 rounded-sm"
                style={{ backgroundColor: colors[i] }}
              />
              <span className="truncate">{p.label}</span>
            </span>
            <span className="shrink-0 font-semibold tabular-nums text-fg">
              {fmtNum(p.value, format)}
              <span className="ml-1.5 font-normal text-fg-3">{share(p.value)}%</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
