import type { CSSProperties } from 'react'
import { fmtNum, niceTicks, SERIES, type NumFormat } from './util'

export interface ColumnGroup {
  label: string // x-axis label, e.g. "0–1 yrs" or "2024"
  values: number[] // one per series, in series order
}

/**
 * Vertical columns for a short ordered axis (years, stages, experience bands), one to three
 * series side by side. Values sit on the caps when there is room; gridlines are hairlines.
 * For rankings use BarList; for long time series use LineChart. Put it inside <Figure> and
 * list the series in the Figure legend when there is more than one.
 */
export default function ColumnChart({
  groups,
  format,
  max,
  height = 220,
  showValues,
}: {
  groups: ColumnGroup[]
  format?: NumFormat
  max?: number
  height?: number
  showValues?: boolean
}) {
  const nSeries = Math.min(Math.max(...groups.map((g) => g.values.length)), 3)
  const top0 = max ?? Math.max(...groups.flatMap((g) => g.values.slice(0, nSeries)), 0)
  const ticks = niceTicks(0, top0, 3)
  const top = ticks[ticks.length - 1]
  const labels = showValues ?? groups.length * nSeries <= 12
  return (
    <div className="flex gap-3">
      {/* y axis */}
      <div
        aria-hidden="true"
        className="relative w-10 shrink-0 text-right text-caption tabular-nums text-fg-3"
        style={{ height }}
      >
        {ticks.map((t) => (
          <span
            key={t}
            className="absolute right-0 translate-y-1/2 leading-none"
            style={{ bottom: `${(t / top) * 100}%` }}
          >
            {fmtNum(t, { ...format, prefix: format?.prefix, suffix: '' })}
          </span>
        ))}
      </div>
      <div className="min-w-0 flex-1">
        <div className="relative" style={{ height }}>
          {ticks.map((t) => (
            <span
              key={t}
              aria-hidden="true"
              className={`absolute inset-x-0 h-px ${t === 0 ? 'bg-border-strong' : 'bg-border'}`}
              style={{ bottom: `${(t / top) * 100}%` }}
            />
          ))}
          <div className="absolute inset-0 flex items-end justify-around gap-2">
            {groups.map((g, gi) => (
              <div key={g.label} className="flex h-full flex-1 items-end justify-center gap-[2px]">
                {g.values.slice(0, nSeries).map((v, si) => (
                  <div
                    key={si}
                    className="group relative flex h-full w-full max-w-[24px] flex-col justify-end"
                  >
                    {labels && (
                      <span
                        data-viz-fade
                        style={{ '--i': gi } as CSSProperties}
                        className="mb-1 block text-center text-caption font-semibold tabular-nums text-fg"
                      >
                        {fmtNum(v, { ...format, suffix: '' })}
                      </span>
                    )}
                    <span
                      data-viz-col
                      style={
                        {
                          height: `${Math.max((v / top) * 100, 0.5)}%`,
                          backgroundColor: SERIES[si],
                          '--i': gi,
                        } as CSSProperties
                      }
                      className="block w-full rounded-t-[4px] group-hover:brightness-95"
                    />
                    <span
                      role="tooltip"
                      className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-1 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-ink px-2.5 py-1.5 text-caption text-ink-fg shadow-e3 group-hover:block"
                    >
                      {g.label}: {fmtNum(v, format)}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-2 flex justify-around gap-2">
          {groups.map((g) => (
            <span
              key={g.label}
              className="min-w-0 flex-1 hyphens-auto text-center text-caption text-fg-2 [overflow-wrap:anywhere]"
            >
              {g.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
