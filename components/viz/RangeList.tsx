import type { CSSProperties } from 'react'
import { fmtNum, niceTicks, type NumFormat } from './util'

export interface RangeRow {
  label: string
  sub?: string // small second line under the label
  min: number
  max: number
  mid?: number // filled dot (e.g. median)
  mark?: number // hollow dot (e.g. entry-level median)
  display?: string // text at the right; default "min–max"
  note?: string // hover text
  href?: string
}

/**
 * Ranges on one shared scale: a light-blue band from min to max per row, a dark dot for the
 * middle value and an optional hollow dot for a second value. Built for pay bands (by post, by
 * experience, by city). `rule` draws one vertical reference line across all rows (e.g. the
 * overall median). Put it inside <Figure> and name the band and dots in the Figure legend.
 */
export default function RangeList({
  rows,
  format,
  domain,
  rule,
  ticks = 4,
}: {
  rows: RangeRow[]
  format?: NumFormat
  domain?: [number, number]
  rule?: { value: number; label: string }
  ticks?: number
}) {
  const lo = domain?.[0] ?? 0
  const rawHi =
    domain?.[1] ?? Math.max(...rows.map((r) => Math.max(r.max, r.mid ?? 0, r.mark ?? 0)))
  const axis = niceTicks(lo, rawHi, ticks)
  const hi = Math.max(axis[axis.length - 1], rawHi)
  const pos = (v: number) => `${Math.min(Math.max(((v - lo) / (hi - lo)) * 100, 0), 100)}%`
  const grid =
    'grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1 md:grid-cols-[minmax(7rem,13rem)_1fr_minmax(5.5rem,auto)]'

  return (
    <div>
      <ul className="space-y-2.5 md:space-y-2">
        {rows.map((r, i) => (
          <li key={`${r.label}-${i}`} className={`group relative ${grid}`}>
            <span className="min-w-0 text-small">
              <span className="block truncate font-medium text-fg">
                {r.href ? (
                  <a
                    href={r.href}
                    target={r.href.startsWith('http') ? '_blank' : undefined}
                    rel={r.href.startsWith('http') ? 'noopener nofollow' : undefined}
                    className="underline decoration-border-strong underline-offset-2 hover:decoration-signal"
                  >
                    {r.label}
                  </a>
                ) : (
                  r.label
                )}
              </span>
              {r.sub && (
                <span className="hidden truncate text-caption text-fg-3 md:block">{r.sub}</span>
              )}
            </span>
            <span className="relative order-3 col-span-2 h-5 md:order-2 md:col-span-1">
              {/* faint baseline so short ranges still read as "on a scale" */}
              <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border" />
              {rule && (
                <span
                  aria-hidden="true"
                  className="absolute inset-y-[-6px] w-px bg-fg-3/60"
                  style={{ left: pos(rule.value) }}
                />
              )}
              <span
                data-viz-bar
                style={
                  {
                    left: pos(r.min),
                    width: `max(${((Math.max(r.max - r.min, 0) / (hi - lo)) * 100).toFixed(3)}%, 4px)`,
                    '--i': i,
                  } as CSSProperties
                }
                className="absolute top-[5px] h-2.5 rounded-full bg-viz-s1 group-hover:bg-viz-s2"
              />
              {r.mark !== undefined && (
                <span
                  data-viz-fade
                  style={{ left: pos(r.mark), '--i': i } as CSSProperties}
                  className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-viz-1 bg-surface"
                />
              )}
              {r.mid !== undefined && (
                <span
                  data-viz-fade
                  style={{ left: pos(r.mid), '--i': i } as CSSProperties}
                  className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-viz-s5 ring-2 ring-surface"
                />
              )}
            </span>
            <span className="order-2 text-right text-small font-semibold tabular-nums text-fg md:order-3">
              {r.display ??
                (r.min === r.max
                  ? fmtNum(r.min, format)
                  : `${fmtNum(r.min, { ...format, suffix: '' })}–${fmtNum(r.max, { ...format, prefix: '' })}`)}
            </span>
            {r.note && (
              <span
                role="tooltip"
                className="pointer-events-none absolute left-0 top-full z-20 mt-1 hidden max-w-xs rounded-lg bg-ink px-3 py-2 text-caption text-ink-fg shadow-e3 group-focus-within:block group-hover:block"
              >
                {r.note}
              </span>
            )}
          </li>
        ))}
      </ul>

      {/* axis: same grid as the rows, so ticks line up with the bands */}
      <div className={`mt-3 ${grid}`} aria-hidden="true">
        <span className="hidden md:block" />
        <span className="relative col-span-2 h-5 border-t border-border md:col-span-1">
          {axis.map((t, ti) => (
            <span
              key={t}
              className="absolute top-1 -translate-x-1/2 whitespace-nowrap text-caption tabular-nums text-fg-3 first:translate-x-0 last:-translate-x-full"
              style={{ left: pos(t) }}
            >
              {fmtNum(t, ti === axis.length - 1 ? format : { ...format, suffix: '' })}
            </span>
          ))}
          {rule && (
            <span
              className="absolute -top-px h-1.5 w-px bg-fg-3"
              style={{ left: pos(rule.value) }}
            />
          )}
        </span>
        <span className="hidden md:block" />
      </div>
      {rule && (
        <p className="mt-3 text-caption text-fg-2">
          <span aria-hidden="true" className="mr-2 inline-block h-3 w-px bg-fg-3 align-middle" />
          {rule.label}: <span className="font-semibold text-fg">{fmtNum(rule.value, format)}</span>
        </p>
      )}
    </div>
  )
}
