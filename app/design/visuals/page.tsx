import type { Metadata } from 'next'
import {
  Figure,
  BarList,
  RangeList,
  ColumnChart,
  LineChart,
  SegmentBar,
  CompareTable,
  StatRow,
  PullQuote,
  Flow,
  Insight,
} from '@/components/viz'

export const metadata: Metadata = {
  title: 'Data visuals kit',
  description: 'Internal reference: every chart, table and panel in the Signal Paper visuals kit.',
  robots: { index: false, follow: false },
}

const h2 = 'mt-14 text-h3 font-semibold text-fg'
const p = 'mt-2 max-w-prose text-small text-fg-2'

// All numbers on this page are SAMPLE data for layout only.
export default function VisualsPage() {
  return (
    <div className="bg-bg text-fg">
      <div className="mx-auto w-full max-w-[920px] px-5 py-12 md:px-8 md:py-16">
        <div className="font-mono text-kicker uppercase tracking-[0.08em] text-signal-strong">
          Internal · Signal Paper · sample data only
        </div>
        <h1 className="mt-3 font-serif text-h1 font-medium text-fg">Data visuals kit</h1>
        <p className="mt-3 max-w-prose text-body-lg text-fg-2">
          Every chart, table and panel pages and blog posts may use. One blue by default; a second
          and third colour only when series must be told apart. Rules: docs/visuals.md.
        </p>

        <h2 className={h2}>StatRow</h2>
        <p className={p}>A handful of headline numbers. Each one names its source.</p>
        <StatRow
          stats={[
            { label: 'Posts with stated pay', value: '24', sub: 'Opened 8 Nov 2026' },
            { label: 'Median midpoint', value: '₹27.5 LPA', sub: 'Middle of each range' },
            { label: 'Lowest to highest', value: '₹6–80 LPA', sub: 'Across all posts' },
            { label: 'Mention equity', value: '3 of 19', sub: 'ESOPs or RSUs' },
          ]}
        />

        <h2 className={h2}>BarList</h2>
        <p className={p}>Rankings. One series, one colour. Values at the tips, no axis.</p>
        <Figure
          label="Sample · 6 employers"
          title="Company A pays the most at the median"
          sub="Median total pay per year, ₹ lakh."
          source="Sample data"
          updated="Nov 2026"
          table={{
            head: ['Company', 'Median'],
            rows: [
              ['Company A', '₹62 lakh'],
              ['Company B', '₹48 lakh'],
            ],
          }}
        >
          <BarList
            format={{ prefix: '₹', suffix: ' lakh' }}
            rows={[
              { label: 'Company A', value: 62, note: 'Entry level L3: ₹28 lakh' },
              { label: 'Company B', value: 48 },
              { label: 'Company C', value: 41 },
              { label: 'Company D', value: 33 },
              { label: 'Company E', value: 27 },
              { label: 'Company F', value: 19 },
            ]}
          />
        </Figure>
        <Figure
          label="Sample · emphasis"
          title="One row is the point; the rest is context"
          source="Sample data"
        >
          <BarList
            emphasis
            format={{ suffix: '%' }}
            rows={[
              { label: 'Role-play practice', value: 68, highlight: true },
              { label: 'Recorded call review', value: 44 },
              { label: 'Slide-based course', value: 31 },
              { label: 'Shadowing only', value: 22 },
            ]}
          />
        </Figure>

        <h2 className={h2}>RangeList</h2>
        <p className={p}>Ranges on one scale: pay bands by post, experience or city.</p>
        <Figure
          label="Sample · pay by experience"
          title="Posts asking 4+ years pay 2.1× the 0–1 year median"
          legend={[
            { label: 'Lowest to highest posted', kind: 'bar', color: '#94A8FF' },
            { label: 'Median midpoint', kind: 'dot', color: '#141D52' },
            { label: 'Entry-level median', kind: 'ring', color: '#3B5BFF' },
          ]}
          source="Sample data"
        >
          <RangeList
            format={{ prefix: '₹', suffix: ' LPA' }}
            rule={{ value: 27.5, label: 'Median midpoint, all posts' }}
            rows={[
              { label: '0–1 yrs asked', sub: '6 posts', min: 6, max: 24, mid: 15, mark: 12 },
              { label: '2–3 yrs asked', sub: '9 posts', min: 14, max: 45, mid: 26 },
              { label: '4+ yrs asked', sub: '9 posts', min: 20, max: 80, mid: 32.5 },
            ]}
          />
        </Figure>

        <h2 className={h2}>ColumnChart</h2>
        <p className={p}>A short ordered axis, one to three series.</p>
        <Figure
          label="Sample · 2 series"
          title="Ramp time fell in every quarter after role-play practice began"
          legend={[
            { label: 'Before', kind: 'bar', color: '#3B5BFF' },
            { label: 'After', kind: 'bar', color: '#E07A1F' },
          ]}
          source="Sample data"
        >
          <ColumnChart
            format={{ suffix: ' wks' }}
            groups={[
              { label: 'Q1', values: [14, 11] },
              { label: 'Q2', values: [13, 9] },
              { label: 'Q3', values: [15, 8] },
              { label: 'Q4', values: [12, 7] },
            ]}
          />
        </Figure>

        <h2 className={h2}>LineChart</h2>
        <p className={p}>Change over time. Hover or touch for the crosshair.</p>
        <Figure
          label="Sample · weekly growth"
          title="7% a week turns 100 users into 225 in twelve weeks"
          legend={[
            { label: '7% a week', kind: 'line', color: '#3B5BFF' },
            { label: '5% a week', kind: 'line', color: '#E07A1F' },
            { label: '1% a week', kind: 'line', color: '#12A594' },
          ]}
          source="Compounding from a base of 100"
        >
          <LineChart
            x={Array.from({ length: 13 }, (_, i) => `Wk ${i}`)}
            series={[
              {
                name: '7% a week',
                values: Array.from({ length: 13 }, (_, i) => Math.round(100 * 1.07 ** i)),
              },
              {
                name: '5% a week',
                values: Array.from({ length: 13 }, (_, i) => Math.round(100 * 1.05 ** i)),
              },
              {
                name: '1% a week',
                values: Array.from({ length: 13 }, (_, i) => Math.round(100 * 1.01 ** i)),
              },
            ]}
            yMin={80}
          />
        </Figure>

        <h2 className={h2}>SegmentBar</h2>
        <p className={p}>One whole split into parts. Never a pie or donut.</p>
        <Figure
          label="Sample · 240 ms budget"
          title="Where a voice agent's reply time goes"
          source="Sample data"
        >
          <SegmentBar
            format={{ suffix: ' ms' }}
            parts={[
              { label: 'Language model', value: 110 },
              { label: 'Text to speech', value: 60 },
              { label: 'Speech to text', value: 45 },
              { label: 'Network', value: 25 },
            ]}
          />
        </Figure>

        <h2 className={h2}>CompareTable</h2>
        <p className={p}>Options across, criteria down. Best cell in bold; one featured column.</p>
        <CompareTable
          corner="Criteria"
          label="Sample comparison"
          caption="Sample data · Nov 2026"
          columns={[
            { name: 'Option A', sub: 'our product', featured: true },
            { name: 'Option B' },
            { name: 'Option C' },
          ]}
          rows={[
            { group: 'Practice', label: 'Voice role-play', cells: [true, true, false] },
            { label: 'Scored against a rubric', cells: [true, false, false] },
            {
              group: 'Cost',
              label: 'Price per seat',
              sub: 'monthly, billed yearly',
              cells: [{ v: '$20', best: true }, '$45', { v: '$30', note: 'min 10 seats' }],
            },
            { label: 'Free tier', cells: [true, null, false] },
          ]}
        />

        <h2 className={h2}>Flow, PullQuote, Insight</h2>
        <Flow
          label="How a voice agent answers"
          steps={[
            { title: 'Hear', body: 'Speech becomes text.' },
            { title: 'Think', body: 'The model picks a reply.' },
            { title: 'Speak', body: 'Text becomes speech.' },
            { title: 'Listen again', body: 'It stops if you interrupt.' },
          ]}
        />
        <PullQuote
          name="Sample Person"
          jobTitle="Head of Sales, Sample Co"
          source="Sample source, 2026"
        >
          The reps who practised out loud were ready for objections two weeks sooner.
        </PullQuote>
        <Insight>
          <p>Use this for the one thing a reader should take from the chart above it.</p>
        </Insight>
      </div>
    </div>
  )
}
