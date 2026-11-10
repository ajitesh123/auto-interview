import type { ReactNode } from 'react'

export type CompareCell =
  | string
  | boolean
  | null
  | { v: string; best?: boolean; note?: string; href?: string }

export interface CompareColumn {
  name: string
  sub?: string // small line under the name, e.g. "our product" or a plan name
  featured?: boolean // one column at most: tinted, for the option the page is about
  href?: string
}

export interface CompareRow {
  label: string
  sub?: string
  cells: CompareCell[] // one per column
  /** Starts a new group; the group name spans the table as a quiet header row. */
  group?: string
}

/**
 * A comparison grid in the style of a benchmark table: options across the top, criteria down
 * the side, the best cell in each row in bold, yes/no as icons with text for screen readers,
 * a dash where there is no value. The first column stays put while the rest scroll on phones.
 * Works on its own (it brings its own frame) or inside <Figure>.
 */
export default function CompareTable({
  columns,
  rows,
  caption,
  corner = '',
  label,
  framed = true,
}: {
  columns: CompareColumn[]
  rows: CompareRow[]
  caption?: ReactNode // source and date
  corner?: string // top-left cell text, e.g. "Criteria"
  label?: string // accessible name
  framed?: boolean
}) {
  const feat = columns.findIndex((c) => c.featured)
  const colClass = (i: number) => (i === feat ? 'bg-signal-tint/60' : '')
  return (
    <figure className={framed ? 'not-prose my-8' : 'not-prose'}>
      <div
        role="region"
        aria-label={label ?? 'Comparison table'}
        // Scrollable region must be keyboard-focusable (WCAG 2.1.1)
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        className="overflow-x-auto rounded-2xl border border-border bg-surface"
      >
        <table className="w-full min-w-[560px] border-collapse text-left text-small">
          <thead>
            <tr className="border-b border-border">
              <th
                scope="col"
                className="sticky left-0 z-10 w-[32%] min-w-[9rem] bg-surface px-4 py-4 align-bottom font-mono text-kicker font-normal uppercase tracking-[0.08em] text-fg-3"
              >
                {corner}
              </th>
              {columns.map((c, i) => (
                <th
                  key={c.name}
                  scope="col"
                  className={`px-4 py-4 align-bottom font-semibold text-fg ${colClass(i)}`}
                >
                  {c.href ? (
                    <a
                      href={c.href}
                      target={c.href.startsWith('http') ? '_blank' : undefined}
                      rel={c.href.startsWith('http') ? 'noopener' : undefined}
                      className="underline decoration-border-strong underline-offset-2 hover:decoration-signal"
                    >
                      {c.name}
                    </a>
                  ) : (
                    c.name
                  )}
                  {c.sub && (
                    <span
                      className={`mt-0.5 block text-caption font-normal ${i === feat ? 'text-signal-ink' : 'text-fg-3'}`}
                    >
                      {c.sub}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, ri) => (
              <RowGroup key={`${r.label}-${ri}`} r={r} n={columns.length} colClass={colClass} />
            ))}
          </tbody>
        </table>
      </div>
      {caption && (
        <figcaption className="mt-2 flex justify-between gap-4 text-caption text-fg-3">
          <span>{caption}</span>
          <span className="shrink-0 md:hidden">Swipe →</span>
        </figcaption>
      )}
    </figure>
  )
}

function RowGroup({
  r,
  n,
  colClass,
}: {
  r: CompareRow
  n: number
  colClass: (i: number) => string
}) {
  return (
    <>
      {r.group && (
        <tr className="border-b border-border bg-muted">
          <th
            scope="colgroup"
            colSpan={n + 1}
            className="sticky left-0 px-4 py-2 text-left font-mono text-kicker font-normal uppercase tracking-[0.08em] text-fg-2"
          >
            {r.group}
          </th>
        </tr>
      )}
      <tr className="border-b border-border last:border-b-0">
        <th
          scope="row"
          className="sticky left-0 z-10 bg-surface px-4 py-3 align-top font-medium text-fg"
        >
          {r.label}
          {r.sub && (
            <span className="mt-0.5 block text-caption font-normal text-fg-3">{r.sub}</span>
          )}
        </th>
        {Array.from({ length: n }, (_, i) => (
          <td key={i} className={`px-4 py-3 align-top tabular-nums text-fg-2 ${colClass(i)}`}>
            <Cell c={r.cells[i] ?? null} />
          </td>
        ))}
      </tr>
    </>
  )
}

function Cell({ c }: { c: CompareCell }) {
  if (c === null || c === '')
    return (
      <span className="text-fg-3">
        <span aria-hidden="true">—</span>
        <span className="sr-only">No value</span>
      </span>
    )
  if (c === true)
    return (
      <span className="inline-flex items-center gap-1.5 text-fg">
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="h-4 w-4 text-signal-strong"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="m3.5 8.5 3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Yes
      </span>
    )
  if (c === false)
    return (
      <span className="inline-flex items-center gap-1.5 text-fg-3">
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
        >
          <path d="M4 8h8" strokeLinecap="round" />
        </svg>
        No
      </span>
    )
  if (typeof c === 'string') return <>{c}</>
  const body = c.href ? (
    <a
      href={c.href}
      target="_blank"
      rel="noopener"
      className="underline decoration-border-strong underline-offset-2 hover:decoration-signal"
    >
      {c.v}
    </a>
  ) : (
    c.v
  )
  return (
    <>
      <span className={c.best ? 'font-semibold text-fg' : ''}>
        {body}
        {c.best && <span className="sr-only"> (best in this row)</span>}
      </span>
      {c.note && <span className="mt-0.5 block text-caption font-normal text-fg-3">{c.note}</span>}
    </>
  )
}
