import { useId, type CSSProperties } from 'react'
import { fmtNum, type NumFormat } from './util'

export interface BarRow {
  label: string
  value: number
  display?: string // overrides the formatted value shown at the bar's tip
  note?: string // shown on hover and in the table view
  href?: string
  highlight?: boolean // emphasis mode: this row in Signal blue, the rest in grey
}

/**
 * Ranked horizontal bars: the default chart for "which is bigger". One series, one colour
 * (Signal blue). `emphasis` turns every row grey except the highlighted one, for "us vs the
 * rest" or "the one that matters". Values sit at the bar tips, so no axis is needed.
 * Put it inside <Figure>.
 *
 * Long lists: on phones every bar takes two lines, so a 40-company list becomes a wall.
 * Below md, rows after `collapseAfter` (default 15) are hidden behind a "Show all N" toggle.
 * It is a CSS-only checkbox, so every row stays in the HTML and desktop always shows all rows.
 */
export default function BarList({
  rows,
  format,
  max,
  sort = true,
  emphasis = false,
  collapseAfter = 15,
}: {
  rows: BarRow[]
  format?: NumFormat
  max?: number
  sort?: boolean
  emphasis?: boolean
  collapseAfter?: number
}) {
  const id = useId()
  const data = sort ? [...rows].sort((a, b) => b.value - a.value) : rows
  const top = max ?? Math.max(...data.map((r) => r.value), 0)
  // Collapse only when it saves real space: at least 5 rows would be tucked away.
  const collapse = collapseAfter > 0 && data.length >= collapseAfter + 5
  const list = (
    <ul className="space-y-3 md:space-y-2.5">
      {data.map((r, i) => {
        const pct = top > 0 ? Math.max((r.value / top) * 100, 0.75) : 0
        const strong = !emphasis || r.highlight
        const tucked = collapse && i >= collapseAfter && !(emphasis && r.highlight)
        return (
          <li
            key={r.label}
            className={`group relative grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1.5 md:grid-cols-[minmax(7rem,13rem)_1fr_minmax(4rem,auto)]${
              tucked ? 'max-md:hidden max-md:group-has-[:checked]/bars:grid' : ''
            }`}
          >
            <span
              className={`min-w-0 truncate text-small ${strong ? 'font-medium text-fg' : 'text-fg-2'}`}
            >
              {r.href ? (
                <a
                  href={r.href}
                  target={r.href.startsWith('http') ? '_blank' : undefined}
                  rel={r.href.startsWith('http') ? 'noopener' : undefined}
                  className="underline decoration-border-strong underline-offset-2 hover:decoration-signal"
                >
                  {r.label}
                </a>
              ) : (
                r.label
              )}
            </span>
            <span className="order-3 col-span-2 flex h-3 items-center md:order-2 md:col-span-1">
              <span
                data-viz-bar
                style={{ width: `${pct}%`, '--i': i } as CSSProperties}
                className={`block h-3 rounded-r-[4px] ${strong ? 'bg-viz-1' : 'bg-viz-mute'} group-hover:brightness-95`}
              />
            </span>
            <span
              data-viz-fade
              style={{ '--i': i } as CSSProperties}
              className={`order-2 text-right text-small tabular-nums md:order-3 ${strong ? 'font-semibold text-fg' : 'text-fg-2'}`}
            >
              {r.display ?? fmtNum(r.value, format)}
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
        )
      })}
    </ul>
  )
  if (!collapse) return list
  const hidden = data.length - collapseAfter
  return (
    <div className="group/bars relative">
      {list}
      <input id={id} type="checkbox" className="peer sr-only md:hidden" />
      <label
        htmlFor={id}
        className="mt-4 inline-flex h-11 cursor-pointer select-none items-center gap-2 rounded-full bg-surface px-4 text-small font-semibold text-fg ring-1 ring-inset ring-border-strong transition-colors duration-fast ease-standard hover:bg-muted peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-signal-strong md:hidden"
      >
        <span className="group-has-[:checked]/bars:hidden">
          Show all {data.length} <span className="font-normal text-fg-2">(+{hidden} more)</span>
        </span>
        <span className="hidden group-has-[:checked]/bars:inline">
          Show top {collapseAfter} only
        </span>
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          className="h-4 w-4 transition-transform duration-base ease-standard group-has-[:checked]/bars:rotate-180"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
        >
          <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </label>
    </div>
  )
}
