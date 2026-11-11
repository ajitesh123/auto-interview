# Brief: Data analyst interview concepts: the 20 ideas to know before the interview

- URL: /data-analyst/concepts (new page type: data/roleConcepts/<slug>.ts + components/roleConcepts/ConceptsPage.tsx + app/<slug>/concepts/page.tsx)
- Slot: A (interview prep)
- Date: 2026-11-11 Author run: 09:42 IST

## 1. Who is searching and why

- Main query: "data analyst interview concepts". Fan-out: "concepts to learn before data analyst interview", "sql concepts for data analyst interview", "statistics concepts for data analyst interview", "data analyst interview preparation topics", "power bi concepts for interview", "rank vs dense_rank", "where vs having", "import vs directquery", "vlookup vs xlookup", "what is a p-value in simple terms".
- Reader: a fresher or 0–3 year candidate in India (or a switcher) with an interview in days. Knows some SQL and Excel, is unsure what to revise and how deep.
- Success: can explain each idea out loud in one sentence + an example + the edge case, knows which real questions test it, and has checked themselves with a quiz.

## 2. What we already have (inventory check)

- /data-analyst hub (50 questions, 41 reported, model answers), /data-analyst/resume, /letter-of-recommendation, /salary; /interview-questions/data-analyst (older template page, MERGE candidate once GSC arrives); /learn-ai/ai-for-data-analysis.
- No page on the site teaches the concepts themselves. Verdict: NEW page type, linked from the hub (kit card + a line above the question bank), the kit strip on resume/LOR/salary pages, and the sitemap/IndexNow.

## 3. What is ranking and being cited (opened 11 Nov 2026 by a research subagent)

| #   | URL                                                                                       | Type   | What it does well                            | What it misses or gets wrong                                                                      |
| --- | ----------------------------------------------------------------------------------------- | ------ | -------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| 1   | stratascratch.com/blog/concepts-and-questions-to-prep-for-your-data-analyst-job-interview | edtech | Runnable SQL widgets                         | Apr 2022; 5 SQL concepts only; says ranking runs lowest-first while queries use DESC; no stats/BI |
| 2   | datacamp.com/blog/how-to-prepare-for-a-data-analyst-interview                             | edtech | Updated Jun 2026; AI section                 | No code, no outputs, no sources                                                                   |
| 3   | aced.io/blog/data-analyst-interview-guide (tryexponent redirect)                          | edtech | Process diagram, readiness checklist         | Concepts not explained, no outputs, no sources                                                    |
| 4   | interviewquery.com/p/how-to-prepare-data-analyst-interview                                | edtech | Only page with question-frequency data (pie) | Title still says 2025; concepts not taught                                                        |
| 5   | towardsdatascience.com ultimate interview prep guide                                      | blog   | Resource list                                | Undated, data-science focus, stock images                                                         |

- Recurring domains: datacamp, stratascratch, towardsdatascience, interviewquery, coursera, medium. No official docs in results. None pairs a concept with input → query → result; none links concepts to dated, reported questions; none has a per-concept self-check.

## 4. Our information gain

- Concept → question map computed from our own bank: 46 of 50 hub questions (38 reported by candidates on Glassdoor, AmbitionBox, LeetCode Discuss, aced.io) mapped to 20 concepts; BarList shows how often each concept is tested (joins 7, ranking 6, GROUP BY/HAVING 6, root cause 5).
- Worked examples that were RUN, not typed: SQL in SQLite (join row counts, LEFT JOIN + WHERE trap 5 → 3 rows, NOT IN with a NULL → 0 rows, ROW_NUMBER/RANK/DENSE_RANK on a tie, LAG + 3-day rolling average), pandas 3.0.5 (left merge 4 rows → dropna 2), pivot sums, DAX SUMX vs SUM×SUM (₹8,600 vs ₹46,000), mean 12 vs median 6, Evan Miller's n = 16σ²/δ² → 14,400 per group, Simpson's paradox (B wins both segments, loses 8.0% vs 11.0% overall), funnel 1.5%, revenue decomposition.
- One verbatim primary-source line per concept (PostgreSQL, Microsoft Learn/Support, NIST, ASA, SEP, pandas, Amplitude, Evan Miller).
- 12-question client-side quiz with explanations and links back to the concept; "I can explain this out loud" ticks with a progress bar (localStorage, no nagging).

## 5. Sources (primary first, every one opened 11 Nov 2026)

| Claim                               | Source URL                                                                          | Quote or number                                                                                                                              |
| ----------------------------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| LEFT JOIN fills NULLs               | https://www.postgresql.org/docs/current/tutorial-join.html                          | "When outputting a left-table row for which there is no right-table match, empty (null) values are substituted for the right-table columns." |
| Logical order                       | https://learn.microsoft.com/sql/t-sql/queries/select-transact-sql                   | FROM, ON, JOIN, WHERE, GROUP BY, …, HAVING, SELECT, DISTINCT, ORDER BY, TOP                                                                  |
| WHERE vs HAVING                     | https://www.postgresql.org/docs/current/tutorial-agg.html                           | "WHERE selects input rows before groups and aggregates are computed …"                                                                       |
| rank/dense_rank, lag defaults       | https://www.postgresql.org/docs/current/functions-window.html                       | "without gaps; this function effectively counts peer groups"; "offset defaults to 1 and default to NULL"                                     |
| = NULL                              | https://www.postgresql.org/docs/current/functions-comparison.html                   | "Do not write expression = NULL because NULL is not "equal to" NULL."                                                                        |
| VLOOKUP default approximate         | https://support.microsoft.com/en-us/Excel/vlookup-function                          | "the default value will always be TRUE or approximate match"                                                                                 |
| XLOOKUP exact default, left lookups | https://support.microsoft.com/excel/functions/xlookup-function                      | "VLOOKUP can only look from left-to-right." (version list contradicts itself on 2016/2019 → we say Microsoft 365, Excel 2021+)               |
| PivotTable                          | https://support.microsoft.com/office/18fb0032-b01a-4c99-9a5f-7ab09edde05a           | definition sentence                                                                                                                          |
| Star schema                         | https://learn.microsoft.com/power-bi/guidance/star-schema                           | "A fact table contains dimension key columns …"                                                                                              |
| CALCULATE                           | https://learn.microsoft.com/en-us/dax/calculate-function-dax                        | "Evaluates an expression in a modified filter context."                                                                                      |
| Import vs DirectQuery               | https://learn.microsoft.com/power-bi/connect-data/desktop-directquery-about         | 1,000,000-row intermediate limit; Pro 8 refreshes/day, Premium/PPU 48                                                                        |
| Chart choice                        | https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualizations-overview | line charts "ideal for showing trends"                                                                                                       |
| Median vs mean                      | https://itl.nist.gov/div898/handbook/eda/section3/eda351.htm                        | "the median provides a better estimate of location than does the mean"                                                                       |
| p-value                             | ASA statement (Berkeley-hosted copy of TAS 2016)                                    | principle 2                                                                                                                                  |
| Sample size, peeking                | https://www.evanmiller.org/how-not-to-run-an-ab-test.html (2010)                    | n = 16σ²/δ²; "The more you peek, the more your significance levels will be off."                                                             |
| Simpson's paradox                   | https://plato.stanford.edu/archives/sum2026/entries/paradox-simpson/                | first sentence (truncated with …)                                                                                                            |
| North star                          | https://amplitude.com/blog/product-north-star-metric                                | definition                                                                                                                                   |
| pandas merge                        | https://pandas.pydata.org/docs/reference/api/pandas.merge.html                      | "Merge DataFrame or named Series objects with a database-style join."                                                                        |

Not used: Reddit quotes (only reachable via a mirror; not verifiable on reddit.com this run); Kohavi guardrail definition (no primary page opened).

## 6. Shape and engagement plan

- Answer-first box listing all 20; StatRow; question-map BarList; sticky group nav; progress card.
- 5 sections (SQL 6, Excel/BI 6, Stats 4, Business 3, Python 1); each concept card = definition → listens for → worked example (inputs/code/result) → trap → primary-source line → where it was asked (linked) → tick.
- Visuals (each answers a question): BarList "which concepts are tested most" (bank counts); Flow "what order does SQL run in" (MS Learn); CompareTable ROW_NUMBER/RANK/DENSE_RANK (SQLite output); CompareTable lookups (MS Support); CompareTable Import vs DirectQuery (MS Learn); CompareTable chart choice (MS Learn); BarList skew (worked); ColumnChart Simpson (worked, 2 series); BarList funnel (worked).
- DO: 12-question quiz + 20 ticks. Next: hub questions out loud → free mock interview → AI for data analysis lesson.

## 6b. Also shipped this run

- Hub template (all 10 hubs): hiring list → kit Figure + BarList with "View as table", source and method; new "question bank" ColumnChart (reported vs practice per group); concepts card + link above the questions where a concepts page exists.
- KitStrip ("Your <role> kit") on concepts, resume, LOR and salary pages.
- Red line: hidden (sr-only / seo-only) TL;DR text removed from /cover-letter, /build-resume, /find-jobs, /free-mock-interview (build-resume's hidden text carried an unsourced "75% rejected by ATS" and "Harvard" templates; cover-letter's an unsourced 83%); /cover-letter's FAQ schema for invisible text removed; a visible panel now links the sample cover letter in all 10 role kits; title/description no longer promise an AI generator.

## 7. Review

- Critic verdict (independent subagent, 11 Nov 2026): NOT YET → all worked numbers verified correct; 12 fix groups applied before shipping: folded in CTE/subquery filtering (ranking), duplicates + CASE WHEN rates (GROUP BY), UNION vs UNION ALL (joins); date_key rendered as "2,02,61,101" and rolling averages lost their decimal (now strings); sticky quiz bar hid under the in-page nav (moved to top-[7.5rem]; scroll-margins raised); wrong claim "MySQL and SQLite allow alias shortcuts" corrected (SQLite accepts the alias in WHERE, MySQL does not); Tableau FIXED LOD sentence rewritten; p-value definition made precise; A/B settings stated (5% two-sided, 80% power); Simpson's note that a lopsided mix in a randomised test is itself a red flag; funnel takeaway no longer says "the top step loses most so look there"; 3 padded askedIn links dropped; pivot marketing quote dropped; DAX measure renamed Total Sales; quiz uses aria-disabled + aria-live; long code lines split for 390px.
- Own checks: 390 px page overflow 140 px traced to CompareTable's sr-only "(best in this row)" escaping the scroll box (kit bug, fixed with `relative`, affects every CompareTable incl. blog posts); hub question-mix ColumnChart labels broke mid-word at 390 → switched to a BarList; hiring title for size-band hubs reworded ("Employers with 200 people or fewer…").
- Rubric: 18/20 (2 for tokens, accent, type, shell, perf, a11y; 1 for breathability: long page, ~47k px at 390 — groups and quiz nav mitigate; 1 for scannability: 20 cards each with 6 parts).
- Metric: GSC impressions for /data-analyst/concepts and the fan-out terms; quiz completion once GA4 events exist. Check back Nov 25 and Dec 9.
