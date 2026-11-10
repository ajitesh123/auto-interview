import type { ReactNode } from 'react'
import VizReveal from './VizReveal'

export interface FigureSource {
  label: string
  url?: string
}

export interface LegendItem {
  label: string
  /** bar = filled swatch, dot = filled circle, ring = hollow circle, line = short line, rule = reference line */
  kind?: 'bar' | 'dot' | 'ring' | 'line' | 'rule'
  color?: string // hex from the viz palette; default Signal blue
}

export interface FigureTable {
  head: string[]
  rows: (string | number)[][]
}

/**
 * The frame every chart sits in: informational kicker, plain-English title (the finding, not
 * "Chart 1"), the chart, then source and date. `table` adds a "View as table" drawer so every
 * value is readable without the picture. Signal Paper: white card, hairline border, no shadow.
 */
export default function Figure({
  label,
  title,
  sub,
  legend,
  children,
  source,
  updated,
  note,
  table,
  className = '',
}: {
  label?: string // kicker, e.g. "Posted pay · 24 job posts"
  title: string
  sub?: ReactNode
  legend?: LegendItem[]
  children: ReactNode
  source?: FigureSource[] | string
  updated?: string // e.g. "Nov 2026"
  note?: ReactNode
  table?: FigureTable
  className?: string
}) {
  const sources: FigureSource[] = typeof source === 'string' ? [{ label: source }] : (source ?? [])
  return (
    <figure
      data-viz="in"
      className={`not-prose my-8 rounded-2xl border border-border bg-surface p-5 text-fg md:p-7 ${className}`}
    >
      <header className="max-w-2xl">
        {label && (
          <div className="font-mono text-kicker uppercase tracking-[0.08em] text-signal-strong">
            {label}
          </div>
        )}
        <div className={`text-h4 font-semibold text-fg ${label ? 'mt-2' : ''}`}>{title}</div>
        {sub && <p className="mt-1 text-small text-fg-2">{sub}</p>}
      </header>

      {legend && legend.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-caption text-fg-2">
          {legend.map((l) => (
            <li key={l.label} className="inline-flex items-center gap-2">
              <LegendKey kind={l.kind} color={l.color} />
              {l.label}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-5">{children}</div>

      {(sources.length > 0 || updated || note) && (
        <figcaption className="mt-5 border-t border-border pt-3 text-caption text-fg-3">
          {note && <span className="block text-fg-2">{note}</span>}
          {(sources.length > 0 || updated) && (
            <span className={note ? 'mt-1 block' : 'block'}>
              {sources.length > 0 && 'Source: '}
              {sources.map((s, i) => (
                <span key={s.label}>
                  {i > 0 && ', '}
                  {s.url ? (
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener"
                      className="underline decoration-border-strong underline-offset-2 hover:text-fg"
                    >
                      {s.label}
                    </a>
                  ) : (
                    s.label
                  )}
                </span>
              ))}
              {updated && `${sources.length > 0 ? ' · ' : ''}${updated}`}
            </span>
          )}
        </figcaption>
      )}

      {table && (
        <details className="group mt-3">
          <summary className="inline-flex min-h-9 cursor-pointer list-none items-center gap-1.5 rounded-full px-3 text-caption font-medium text-fg-2 ring-1 ring-inset ring-border hover:bg-muted hover:text-fg [&::-webkit-details-marker]:hidden">
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              className="h-3.5 w-3.5 transition-transform duration-base group-open:rotate-90"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
            >
              <path d="M6 3.5 10.5 8 6 12.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            View as table
          </summary>
          <div
            role="region"
            aria-label={`${title}: data table`}
            // Scrollable region must be keyboard-focusable (WCAG 2.1.1)
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabIndex={0}
            className="mt-3 overflow-x-auto rounded-xl border border-border"
          >
            <table className="w-full text-left text-small tabular-nums">
              <thead className="bg-muted text-fg-2">
                <tr>
                  {table.head.map((h) => (
                    <th key={h} scope="col" className="px-3 py-2 font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {table.rows.map((r, i) => (
                  <tr key={i}>
                    {r.map((c, j) =>
                      j === 0 ? (
                        <th key={j} scope="row" className="px-3 py-2 font-medium text-fg">
                          {c}
                        </th>
                      ) : (
                        <td key={j} className="px-3 py-2 text-fg-2">
                          {c}
                        </td>
                      )
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      )}
      <VizReveal />
    </figure>
  )
}

export function LegendKey({ kind = 'bar', color = '#3B5BFF' }: Omit<LegendItem, 'label'>) {
  if (kind === 'dot')
    return (
      <span
        aria-hidden="true"
        className="h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: color }}
      />
    )
  if (kind === 'ring')
    return (
      <span
        aria-hidden="true"
        className="h-2.5 w-2.5 rounded-full border-2 bg-surface"
        style={{ borderColor: color }}
      />
    )
  if (kind === 'line')
    return (
      <span
        aria-hidden="true"
        className="h-0.5 w-4 rounded-full"
        style={{ backgroundColor: color }}
      />
    )
  if (kind === 'rule')
    return <span aria-hidden="true" className="h-3.5 w-px" style={{ backgroundColor: color }} />
  return (
    <span aria-hidden="true" className="h-2.5 w-4 rounded-sm" style={{ backgroundColor: color }} />
  )
}
