'use client'

import { useEffect, useRef, useState } from 'react'
import { fmtNum, niceTicks, SERIES, type NumFormat } from './util'

export interface LineSeries {
  name: string
  values: (number | null)[] // one per x label; null = no data
}

/**
 * Change over time: up to three 2px lines on one axis, hairline grid, an end dot with its value,
 * and a crosshair with a tooltip on hover or touch. A single series also gets a light wash under
 * the line. Drawn at the container's real width, so text never shrinks on phones. Put it inside
 * <Figure>; pass the same numbers as Figure `table` so they are readable without hover.
 */
export default function LineChart({
  x,
  series,
  format,
  height = 260,
  yMin,
  yMax,
  band,
}: {
  x: string[]
  series: LineSeries[]
  format?: NumFormat
  height?: number
  yMin?: number
  yMax?: number
  /** Optional shaded target band between two y values, e.g. a goal range. */
  band?: { from: number; to: number; label: string }
}) {
  const wrap = useRef<HTMLDivElement>(null)
  const [w, setW] = useState(640)
  const [hover, setHover] = useState<number | null>(null)
  useEffect(() => {
    const el = wrap.current
    if (!el) return
    const set = () => setW(Math.max(el.clientWidth, 280))
    set()
    if (!('ResizeObserver' in window)) return
    const ro = new ResizeObserver(set)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const data = series.slice(0, 3)
  const all = data.flatMap((s) => s.values.filter((v): v is number => v !== null))
  const lo0 = yMin ?? Math.min(0, ...all)
  const hi0 = yMax ?? Math.max(...all, band?.to ?? -Infinity)
  const ticks = niceTicks(lo0, hi0, 4)
  const lo = ticks[0]
  const hi = ticks[ticks.length - 1]
  const m = { t: 14, r: 56, b: 28, l: 44 }
  const iw = w - m.l - m.r
  const ih = height - m.t - m.b
  const px = (i: number) => m.l + (x.length > 1 ? (i / (x.length - 1)) * iw : iw / 2)
  const py = (v: number) => m.t + ih - ((v - lo) / (hi - lo || 1)) * ih
  const path = (vals: (number | null)[]) => {
    let d = ''
    let pen = false
    vals.forEach((v, i) => {
      if (v === null) {
        pen = false
        return
      }
      d += `${pen ? 'L' : 'M'}${px(i).toFixed(1)},${py(v).toFixed(1)}`
      pen = true
    })
    return d
  }
  const lastIdx = (vals: (number | null)[]) => {
    for (let i = vals.length - 1; i >= 0; i--) if (vals[i] !== null) return i
    return -1
  }
  // show at most ~6 x labels
  const step = Math.max(1, Math.ceil(x.length / (w < 480 ? 4 : 7)))
  const onMove = (clientX: number) => {
    const box = wrap.current?.getBoundingClientRect()
    if (!box || x.length < 2) return
    const rel = (clientX - box.left - m.l) / iw
    setHover(Math.min(x.length - 1, Math.max(0, Math.round(rel * (x.length - 1)))))
  }

  return (
    <div ref={wrap} className="relative w-full select-none">
      <svg
        role="img"
        aria-label={`Line chart: ${data.map((s) => s.name).join(', ')} across ${x[0]} to ${x[x.length - 1]}`}
        width={w}
        height={height}
        viewBox={`0 0 ${w} ${height}`}
        className="block max-w-full touch-pan-y"
        onPointerMove={(e) => onMove(e.clientX)}
        onPointerDown={(e) => onMove(e.clientX)}
        onPointerLeave={() => setHover(null)}
      >
        {band && (
          <g>
            <rect
              x={m.l}
              width={iw}
              y={py(band.to)}
              height={Math.max(py(band.from) - py(band.to), 1)}
              className="fill-viz-1"
              opacity={0.08}
            />
            <text
              x={m.l + 6}
              y={py(band.to) + 13}
              className="fill-signal-strong text-[11px] font-medium"
            >
              {band.label}
            </text>
          </g>
        )}
        {ticks.map((t) => (
          <g key={t}>
            <line
              x1={m.l}
              x2={m.l + iw}
              y1={py(t)}
              y2={py(t)}
              className={t === lo ? 'stroke-border-strong' : 'stroke-border'}
              strokeWidth={1}
            />
            <text
              x={m.l - 8}
              y={py(t) + 4}
              textAnchor="end"
              className="fill-fg-3 text-[11px] tabular-nums"
            >
              {fmtNum(t, { ...format, suffix: '' })}
            </text>
          </g>
        ))}
        {x.map((label, i) =>
          i % step === 0 || i === x.length - 1 ? (
            <text
              key={i}
              x={px(i)}
              y={height - 8}
              textAnchor={i === 0 ? 'start' : i === x.length - 1 ? 'end' : 'middle'}
              className="fill-fg-3 text-[11px]"
            >
              {label}
            </text>
          ) : null
        )}
        {data.length === 1 && lastIdx(data[0].values) > 0 && (
          <path
            data-viz-fade
            d={`${path(data[0].values)}L${px(lastIdx(data[0].values)).toFixed(1)},${py(lo)}L${px(
              data[0].values.findIndex((v) => v !== null)
            ).toFixed(1)},${py(lo)}Z`}
            fill={SERIES[0]}
            opacity={0.1}
          />
        )}
        {data.map((s, si) => {
          const li = lastIdx(s.values)
          return (
            <g key={s.name}>
              <path
                data-viz-line
                pathLength={1}
                d={path(s.values)}
                fill="none"
                stroke={SERIES[si]}
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              {li >= 0 && (
                <g data-viz-fade>
                  <circle
                    cx={px(li)}
                    cy={py(s.values[li] as number)}
                    r={5}
                    fill={SERIES[si]}
                    className="stroke-surface"
                    strokeWidth={2}
                  />
                  <text
                    x={px(li) + 10}
                    y={py(s.values[li] as number) + 4}
                    className="fill-fg text-[12px] font-semibold tabular-nums"
                  >
                    {fmtNum(s.values[li] as number, format)}
                  </text>
                </g>
              )}
            </g>
          )
        })}
        {hover !== null && (
          <g pointerEvents="none">
            <line
              x1={px(hover)}
              x2={px(hover)}
              y1={m.t}
              y2={m.t + ih}
              className="stroke-viz-mute"
              strokeWidth={1}
            />
            {data.map((s, si) =>
              s.values[hover] !== null ? (
                <circle
                  key={s.name}
                  cx={px(hover)}
                  cy={py(s.values[hover] as number)}
                  r={5}
                  fill={SERIES[si]}
                  className="stroke-surface"
                  strokeWidth={2}
                />
              ) : null
            )}
          </g>
        )}
      </svg>
      {hover !== null && (
        <div
          role="status"
          className="pointer-events-none absolute top-0 z-20 min-w-[8rem] rounded-lg bg-ink px-3 py-2 text-caption text-ink-fg shadow-e3"
          style={
            px(hover) > w / 2
              ? { right: `${w - px(hover) + 10}px` }
              : { left: `${px(hover) + 10}px` }
          }
        >
          <div className="font-medium text-ink-fg-2">{x[hover]}</div>
          {data.map((s, si) => (
            <div key={s.name} className="mt-0.5 flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-1.5">
                <span
                  aria-hidden="true"
                  className="h-0.5 w-3 rounded-full"
                  style={{ backgroundColor: SERIES[si] }}
                />
                {s.name}
              </span>
              <span className="font-semibold tabular-nums">
                {s.values[hover] === null ? '—' : fmtNum(s.values[hover] as number, format)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
