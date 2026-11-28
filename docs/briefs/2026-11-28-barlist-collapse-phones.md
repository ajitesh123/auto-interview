# Brief: long bar charts collapse to the top 15 on phones (Nov 28, 2026, Part 1)

**Problem (Nov 27 walk).** Salary pages score 3/5 on "fast" at 390 px: the employee-reported pay chart on
/product-manager/salary has 40+ companies, and at phone width each bar takes two lines (label + value, then the bar),
so the chart is a ~1,800 px wall before the reader reaches experience bands, cities and the posted-pay table.
The same BarList renders on 3 salary sections x 10 roles, role hubs, concept pages, tools and 12 blog figure sets.

**What the reader can do after.** See the top 15 at a glance, then choose "Show all 40 (+25 more)" to expand;
on desktop the full list shows as before (one line per bar, no wall).

**Design.**

- One change in `components/viz/BarList.tsx`, so every long BarList on the site benefits.
- `collapseAfter` prop, default 15; only collapses when at least 5 rows would be tucked away (no "Show 2 more").
- CSS-only: an sr-only checkbox + label styled as the secondary pill (44 px target, focus ring via
  peer-focus-visible). All rows stay in the HTML (Google, AI crawlers and "View as table" unaffected).
- Desktop (md+) never collapses; the toggle is md:hidden.
- Chevron rotates 200 ms; reduced motion handled by the global rule.
- Tokens only; no new client JS.

**Visuals.** No new chart; same BarList.

**Checks.** Build; 390/1280 screenshots of /product-manager/salary, /ai-engineer/salary, /data-analyst/salary;
Playwright: count visible rows before/after clicking the label at 390; keyboard: Tab to the checkbox, Space toggles;
desktop shows all rows; page height at 390 before vs after.

**Metric.** Scroll depth past the reported-pay chart and clicks on posted-pay table / mock CTA on salary pages
(needs GA4); check back Dec 12.
