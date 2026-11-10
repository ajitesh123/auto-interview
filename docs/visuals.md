# Visuals: charts, tables and panels (Signal Paper)

Rahul, 11 Nov 2026: "People should not only see the text, they should also see the graphs...
properly themed... tables, proper images, good colours, animation, panels, so that we explain it
better. The result should be so good that they want to look it up, and they should learn as well."

Every page type (role hub, salary, kit, Learn AI lesson, course week, blog post) uses the one kit in
`components/viz`. Live examples with sample data: `/design/visuals` (noindex). The old recharts
components (orange/pink/emerald) were deleted on 11 Nov 2026; never bring them back.

## The rule

A page that makes a point with numbers shows them. Aim for **one visual per major section, 3–6 per
long page**, each answering a question the reader has. No decoration: if a visual does not carry
data or a process, it does not ship.

| The reader needs to...                         | Use                                         |
| ---------------------------------------------- | ------------------------------------------- |
| See 3–4 headline numbers                       | `StatRow`                                   |
| Compare sizes or rank things                   | `BarList` (add `emphasis` for "us vs rest") |
| See a range: pay bands, price bands, durations | `RangeList`                                 |
| Compare a short ordered axis, 1–3 series       | `ColumnChart`                               |
| See change over time                           | `LineChart`                                 |
| See how one whole splits (≤ 6 parts)           | `SegmentBar` (never a pie or donut)         |
| Compare options on criteria                    | `CompareTable` (one `featured` column)      |
| Follow a process                               | `Flow`                                      |
| Hear it from a named person                    | `PullQuote` (real, linked, under 25 words)  |
| Take one thing from a chart                    | `Insight`                                   |

Wrap charts in `Figure`: an informational kicker ("Posted pay · 24 job posts · India"), a title that
states the **finding** ("The middle posted offer is ₹10.5 LPA"), the chart, then source and date.
Pass `table` so "View as table" shows every value.

## Colour (validated, do not change by eye)

- **One series = Signal blue `#3B5BFF`.** This is the default for almost every chart.
- **Emphasis** = the row that matters in blue, the rest in grey `#A3A3A3`.
- **Ordered parts** (tiers, stages, a split) = the one-hue blue ramp `#94A8FF #6680FF #3B5BFF #2439B5 #141D52`.
- **Two or three series that must be told apart** = `#3B5BFF`, `#E07A1F`, `#12A594`, in that order,
  never more than three. These two extra colours are for data marks only, never for UI.
- Ranges: band `#94A8FF`, median dot `#141D52`, second marker a hollow blue ring.
- Text is always a text token (fg, fg-2, fg-3). Never colour text with a series colour.
- Checked with the dataviz validator on the white card surface (11 Nov 2026): colour-blind separation
  ΔE 13.5 (target ≥ 8), normal vision 24.5 (floor 15), all ≥ 3:1 contrast; ramp passes the ordinal checks.

## Motion

Charts are complete without JavaScript. A figure below the fold animates once when it scrolls into
view (bars grow, lines draw, values fade in); figures already on screen do not move. Reduced-motion
readers never see animation. No other animation on data.

## In blog posts (MDX)

All kit components are registered in `components/MDXComponents.tsx`:

```mdx
<Figure
  label="Published prices · 6 vendors"
  title="A 3-minute AI call costs between ₹x and ₹y at list price"
  source={[{ label: 'Vendor pricing pages', url: 'https://…' }]}
  updated="Checked 11 Nov 2026"
>
  <BarList
    format={{ prefix: '$', suffix: '/min', decimals: 2 }}
    rows={[
      { label: 'Vendor A', value: 0.07 },
      { label: 'Vendor B', value: 0.09 },
    ]}
  />
</Figure>
```

## Checks before shipping a visual

1. Every number comes from an opened source, named in the Figure `source`, with a date.
2. The title states what the reader should see. No "Chart 1".
3. At 390px: no sideways page scroll, labels readable, nothing clipped.
4. Colour is not the only signal: a legend for 2+ series, values at the marks or in the table view.
5. Screenshot it and look at it.
