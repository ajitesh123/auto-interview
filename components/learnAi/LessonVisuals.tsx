import { BarList, ColumnChart, CompareTable, Figure, SERIES, fmtNum } from '@/components/viz'
import { CopyButton } from '@/components/roleKits/KitClient'
import type { LessonVisual, LessonWorkflow } from '@/data/learnAi/types'

// Visuals kit and worked workflows inside Learn AI lessons (Rahul, 11 Nov 2026: "a few workflows,
// with examples... not only text"). Server components; charts work without JS.

const kicker = 'font-mono text-kicker uppercase tracking-[0.08em]'

export function LessonVisualBlock({ v }: { v: LessonVisual }) {
  const updated = v.updated
  if (v.kind === 'bars') {
    return (
      <Figure
        label={v.label}
        title={v.title}
        source={v.source}
        updated={updated}
        note={v.note}
        className="max-w-[72ch]"
        table={{
          head: ['Item', 'Value', 'Note'],
          rows: v.rows.map((r) => [r.label, r.display ?? fmtNum(r.value, v.format), r.note ?? '']),
        }}
      >
        <BarList rows={v.rows} format={v.format} emphasis={v.emphasis} sort={v.sort} max={v.max} />
      </Figure>
    )
  }
  if (v.kind === 'columns') {
    return (
      <Figure
        label={v.label}
        title={v.title}
        source={v.source}
        updated={updated}
        note={v.note}
        className="max-w-[72ch]"
        legend={
          v.series.length > 1
            ? v.series.map((s, i) => ({ label: s, kind: 'bar' as const, color: SERIES[i] }))
            : undefined
        }
        table={{
          head: ['Group', ...v.series],
          rows: v.groups.map((g) => [g.label, ...g.values.map((x) => fmtNum(x, v.format))]),
        }}
      >
        <ColumnChart groups={v.groups} format={v.format} />
      </Figure>
    )
  }
  return (
    <Figure
      label={v.label}
      title={v.title}
      source={v.source}
      updated={updated}
      note={v.note}
      className="max-w-[72ch]"
    >
      <CompareTable
        columns={v.columns}
        rows={v.rows}
        corner={v.corner}
        label={v.title}
        caption={`${v.columns.length} options compared`}
        framed={false}
      />
    </Figure>
  )
}

export function WorkflowBlock({ w }: { w: LessonWorkflow }) {
  return (
    <section
      aria-label={w.title}
      className="mt-6 max-w-[72ch] rounded-2xl border border-border bg-surface p-5 md:p-6"
    >
      <div className={`${kicker} text-signal-strong`}>Worked workflow</div>
      <h3 className="mt-2 text-h4 font-semibold text-fg">{w.title}</h3>
      <div className="mt-4 rounded-xl bg-muted/60 p-4">
        <div className={`${kicker} text-fg-3`}>Input</div>
        <p className="mt-1.5 whitespace-pre-line text-small leading-relaxed text-fg md:text-body">
          {w.input}
        </p>
      </div>
      <ol className="mt-4 space-y-4">
        {w.steps.map((s, i) => (
          <li key={s.title} className="flex gap-3">
            <span
              aria-hidden="true"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-signal-tint font-mono text-caption font-semibold text-signal-ink ring-1 ring-inset ring-signal/20"
            >
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-body font-semibold text-fg">{s.title}</p>
              <p className="mt-1 text-small leading-relaxed text-fg-2 md:text-body">{s.detail}</p>
              {s.code && (
                <div className="mt-2">
                  <div className="flex justify-end">
                    <CopyButton text={s.code} />
                  </div>
                  <pre
                    // Scrollable code must be keyboard-focusable (WCAG 2.1.1)
                    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                    tabIndex={0}
                    className="mt-1 overflow-x-auto rounded-xl bg-ink p-4 font-mono text-caption leading-relaxed text-ink-fg md:text-small"
                  >
                    <code>{s.code}</code>
                  </pre>
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-5 rounded-xl bg-signal-tint p-4 ring-1 ring-inset ring-signal/15">
        <div className={`${kicker} text-signal-ink`}>Output</div>
        <p className="mt-1.5 whitespace-pre-line text-small font-medium leading-relaxed text-fg md:text-body">
          {w.output}
        </p>
      </div>
    </section>
  )
}
