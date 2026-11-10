// Shared helpers for components/viz. No React here, so both server and client charts can use it.

export interface NumFormat {
  prefix?: string // e.g. "₹" or "$"
  suffix?: string // e.g. " LPA", "K", "%"
  decimals?: number // fixed decimals; default: up to 1, trailing .0 dropped
}

export function fmtNum(n: number, f: NumFormat = {}): string {
  const body =
    f.decimals !== undefined
      ? n.toLocaleString('en-IN', {
          minimumFractionDigits: f.decimals,
          maximumFractionDigits: f.decimals,
        })
      : n.toLocaleString('en-IN', { maximumFractionDigits: 1 })
  return `${f.prefix ?? ''}${body}${f.suffix ?? ''}`
}

/** Round axis ticks: about `count` clean steps covering [0 or min, max]. */
export function niceTicks(min: number, max: number, count = 4): number[] {
  if (!(max > min)) return [min]
  const raw = (max - min) / count
  const mag = Math.pow(10, Math.floor(Math.log10(raw)))
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= raw) ?? 10 * mag
  const start = Math.floor(min / step) * step
  const ticks: number[] = []
  for (let t = start; t <= max + step * 0.001; t += step) ticks.push(Number(t.toPrecision(12)))
  if (ticks[ticks.length - 1] < max)
    ticks.push(Number((ticks[ticks.length - 1] + step).toPrecision(12)))
  return ticks
}

/** Categorical series colours, in fixed order. Never more than three series. */
export const SERIES = ['#3B5BFF', '#E07A1F', '#12A594'] as const
export const SERIES_CLASS = ['bg-viz-1', 'bg-viz-2', 'bg-viz-3'] as const

/** One-hue ordinal ramp, light to dark (for ordered parts such as tiers or stages). */
export const RAMP = ['#94A8FF', '#6680FF', '#3B5BFF', '#2439B5', '#141D52'] as const

/** Pick `n` ramp steps spread across the ramp, darkest first (largest part reads strongest). */
export function rampFor(n: number): string[] {
  if (n <= 1) return [RAMP[2]]
  const picks = Array.from({ length: n }, (_, i) =>
    Math.round(((RAMP.length - 1) * (n - 1 - i)) / (n - 1))
  )
  return picks.map((i) => RAMP[i])
}
