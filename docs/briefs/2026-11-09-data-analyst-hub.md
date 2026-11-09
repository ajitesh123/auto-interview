# Brief: Data Analyst interview prep hub (+ resume/CV kit, LOR kit, Word template)

- URL: /data-analyst (+ /data-analyst/resume, /data-analyst/letter-of-recommendation,
  /downloads/resume-templates/data-analyst-resume-template.docx)
- Slot: A (interview prep)
- Date: 2026-11-09 Author run: 09:41 IST

## 1. Who is searching and why

- Main query: "data analyst interview questions" (and "data analyst interview questions and answers").
- Fan-outs (from the FAQ / follow-up blocks on the ranking pages, and our hub template's sections):
  data analyst SQL interview questions; data analyst interview questions for freshers; Power BI
  interview questions (DAX, Import vs DirectQuery); Excel interview questions for data analyst
  (VLOOKUP vs XLOOKUP); data analyst case study / guesstimate questions; data analyst salary India
  / fresher salary; how to prepare for a data analyst interview; data analyst resume / CV format;
  Amazon / Flipkart / Swiggy / Deloitte / EY data analyst interview process.
- The reader: an Indian final-year student or 0–4 year analyst (MIS, ops, BA) preparing for a DA
  loop at a product company, a Big 4 / analytics services firm (Deloitte, EY, ZS, Mu Sigma, Tiger)
  or a startup; also US career switchers. They know some Excel and SQL; they do not know which
  rounds come, which questions are really asked, or what a "good" answer sounds like.
- Success: they know the loop for their target company type, have practised the questions that
  were actually reported (SQL, Excel/Power BI, stats, metric cases, guesstimates, behavioural)
  against explicit criteria, know the pay range for their level from real posts, and leave with a
  one-page Indian table CV in Word.

## 2. What we already have (inventory check)

- /interview-questions/data-analyst (data/interviewQuestionsData.ts): 2 generic questions, 1 FAQ,
  no sources, no rounds, no pay. Thin.
- /cv-templates/data-analyst (data/cvRolesData.ts): single-column template that links out to a
  Harvard careers DOCX; sample bullets with invented metrics; no Indian table format.
- Blog: no post on data analyst interviews (4 posts mention the phrase in passing).
- Overlap verdict: NEW hub (no page covers the intent in depth). The two thin pages are kept for now
  and pointed at the hub (REFRESH, see docs/content-audit.md); MERGE/redirect of
  /interview-questions/data-analyst into /data-analyst is queued for when GSC per-URL data shows its
  traffic (needs Rahul's OK if it has traffic).
- Links in: the two pages above, 3 sibling hubs' `related` (product-manager, strategy-and-operations,
  growth), /interview-questions index via ROLE_HUBS if listed, sitemap (automatic).
- Links out: Learn AI path (roleLessons), /salary-calculator, /free-mock-interview, sibling hubs.

## 3. What is ranking and being cited (opened, not guessed)

| #   | URL                                                                    | Type           | What it does well                                                  | What it misses or gets wrong                                                                                     |
| --- | ---------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| 1   | hackr.io/blog/data-analyst-interview-questions                         | Edtech list    | 34 Qs in tiers, some "what the interviewer wants" notes            | No company or reported source, almost no Excel, no metric cases, stale stack (QlikView, Hadoop); byline Jan 2025 |
| 2   | coursera.org/in/articles/data-analyst-interview-questions-and-answers  | Edtech article | 15 Qs with "what they're really asking" + follow-ups (Aug 2025)    | No company attribution, no Python/BI depth, VLOOKUP-centric (no XLOOKUP)                                         |
| 3   | guru99.com/data-analyst-interview-questions.html                       | List           | 60 Q + 10 scenarios, updated Oct 2026                              | Claims "65 professionals" with none named; thin SQL (3) and Excel (1); stale refs                                |
| 4   | careery.pro/blog/data-analyst-careers/data-analyst-interview-questions | Blog           | Concrete SQL (rolling 7-day avg, MoM growth), "what they evaluate" | Title says 40+, body has 12; no company source, no BI tools, no Python                                           |
| 5   | jotform / gusto / workable                                             | Employer banks | n/a                                                                | Written for hiring managers, not candidates                                                                      |

- AI answers: could not query ChatGPT/Perplexity/AI Overviews from this sandbox. The SERP shows the
  same generic lists that AI answers summarise; none has reported, dated, company-attributed
  questions, loops by company, or posted pay, which is exactly what fan-out queries ("Flipkart data
  analyst interview", "EY Power BI interview questions") need.

## 4. Our information gain (why ours will be the best page)

- 41 questions candidates reported, each with company, round, month and the Glassdoor /
  AmbitionBox / LeetCode / Exponent page it came from (Deloitte Jun 2026, Uber Apr 2026, Swiggy Jun
  2026, EY Nov 2025, Flipkart Nov 2025...), with a model answer, what the interviewer listens for and
  3–4 tickable criteria. Role caveats stated (some are BA / MIS / DS-intern loops).
- Interview loops for 12 companies as reported (Amazon OA → phone → loop; Meta 6-round final;
  Flipkart 3 SQL rounds; ZS 5 rounds with guesstimates; Mu Sigma aptitude + GD).
- Posted pay: 14 India posts (Wellfound, Cutshort) + 14 US posts (Greenhouse, Lever) with the URL on
  every row; Levels.fyi medians (US $110,000; India ₹14,62,936); BLS proxy.
- Our Apollo count: 46,860 people in India and 32,906 in the US started a strict "Data Analyst" title
  in the last 670 days, India split by employer size.
- What no ranking page says: in India, employer type moves pay more than years (2-year analysts at
  two Bengaluru startups were posted at ₹18–35 LPA; 3–5 year roles via recruiters at ₹8–12 LPA).
- Kits: resume/CV guide + Indian one-page table CV in Word + LOR guide with a fictional sample.

## 5. Sources (primary first, every one opened)

| Claim                                  | Source URL                                                                                    | Opened on  | Quote or number                                                           |
| -------------------------------------- | --------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------- |
| Amazon BIE OA has 3 parts              | https://amazon.jobs/content/en/how-we-hire/bie-interview-prep                                 | 2026-11-09 | "SQL Challenge, Working with SQL, and Work Styles"                        |
| Copilot in Power BI needs capacity     | https://learn.microsoft.com/power-bi/create-reports/copilot-introduction                      | 2026-11-09 | "A Power BI Pro or Premium Per User (PPU) license alone isn't sufficient" |
| Gemini in BigQuery data canvas         | https://docs.cloud.google.com/bigquery/docs/data-canvas                                       | 2026-11-09 | "find your data, create SQL, generate charts, and create data summaries"  |
| ChatGPT data analysis uses pandas      | https://help.openai.com/en/articles/8437071-data-analysis-with-chatgpt                        | 2026-11-09 | "ChatGPT uses pandas to analyze your data"                                |
| Alteryx analyst survey (vendor)        | https://www.alteryx.com/resources/report/2025-state-of-the-data-analyst                       | 2026-11-09 | "97% of analysts say AI tools accelerate their daily tasks"               |
| Levels.fyi US DA median                | https://www.levels.fyi/t/data-analyst                                                         | 2026-11-09 | $110,000, updated Nov 4, 2026                                             |
| Levels.fyi India DA median             | https://www.levels.fyi/t/data-analyst/locations/india                                         | 2026-11-09 | ₹14,62,936, updated Nov 9, 2026                                           |
| BLS operations research analysts       | https://www.bls.gov/ooh/math/operations-research-analysts.htm                                 | 2026-11-09 | $88,940 (2025), +12% 2025–35                                              |
| BLS data scientists growth             | https://www.bls.gov/ooh/math/data-scientists.htm                                              | 2026-11-09 | "projected to grow 35 percent from 2025 to 2035"                          |
| Python in Excel                        | https://techcommunity.microsoft.com/t5/excel-blog/announcing-python-in-excel/ba-p/3893439     | 2026-11-09 | Aug 22, 2023 announcement                                                 |
| Power BI GA                            | https://www.eweek.com/enterprise-apps/microsoft-power-bi-becomes-generally-available-july-24/ | 2026-11-09 | GA July 24, 2015                                                          |
| SQL ANSI standard 1986                 | https://blog.ansi.org/sql-standard-iso-iec-9075-2023-ansi-x3-135/                             | 2026-11-09 | "standardized in ANSI X3.135 in 1986"                                     |
| Google DA certificate enrolment, price | https://www.coursera.org/professional-certificates/google-data-analytics                      | 2026-11-09 | "3,910,483 already enrolled"; $49/month US                                |
| Each question / loop / pay row         | URL on the row in data/roleHubs/data-analyst.ts                                               | 2026-11-09 | as written on the page                                                    |
| Apollo counts                          | Apollo.io people search (free), strict title, ≤670 days                                       | 2026-11-09 | India 46,860; US 32,906; bands sum 46,617                                 |

## 6. Shape and engagement plan (5–10 minutes, no walls of text)

- Answer-first TL;DR: what a DA does, our hiring count, the four things every loop tests.
- Sections (existing RoleHubPage template, all server-rendered): story timeline → AI angle + Learn AI
  path → what the role is → product vs services expectations → skills → get hired (weak/strong
  bullets, channels, outreach, proof of work) → loops by company → pay explorer (India posts, US
  posts, Levels.fyi) → hiring by company size → 6 question groups with attempt-first reveals and
  tickable criteria → 7/14/30-day plans with calendar export → resources with why → FAQ → related.
- Things to DO: attempt-first answers + criteria checkboxes, practised counter, plans, Word download,
  free mock interview CTA.
- Next step at the end: resume kit, LOR kit, Learn AI lessons, sibling hubs, mock interview.

## 7. Review (filled after the independent critic)

- Critic verdict (fresh subagent, compared with Coursera, Careery, DataCamp): **not yet** on first
  pass. Research better than anything on page one, but (1) question sources were invisible (no
  links), (2) Power BI/Tableau and stats fan-outs thin, no copyable SQL, (3) several number and label
  errors. All fixed this run:
  - Question template now renders each question's source as a link under the answer (all hubs)
    and supports code blocks; 4 SQL answers got copyable code.
  - Added 9 written questions (anti-join, rolling 7-day average, CALCULATE / filter context, YoY
    time intelligence, Tableau LOD, p-value + CI + Type I/II, correlation vs causation, missing values
    and outliers, fresher "tell me about yourself"): 50 questions, 41 reported.
  - Wrong answer fixed: dropna after a left merge also drops unmatched customers. 3rd-highest
    query now DISTINCT. HLOOKUP breaks on inserted rows. Repeat-rate denominator caveat.
  - Numbers: "SQL first, then Excel" replaced by what the 5 posts show (SQL, Python/R, BI tool in
    all 5; Tableau 4; Excel in the 2 Indian posts); US entry range now "four entry posts $58K–97K";
    India note flags the 3 posts older than 9 months (median without them ₹15 LPA); Levels.fyi
    framed as total comp; Swiggy note corrected; Dexian added to keyword sources.
  - Labels: PhonePe no longer called a services firm; Exponent (aced.io); ZS "role not stated";
    Zomato "Analyst loop"; Ramayana round as labelled; EY Nov 2025 interview month; Amazon OA marked
    as the BIE assessment; "whale" = high-frequency only. Illustrative bullets labelled.
  - Duplicate review IDs checked: the Glassdoor RVW pages show several reviews (the Uber page shows
    4: Amsterdam Jan 2025, Hyderabad Apr 2026, Jan 2026, Oct 2025), so one URL legitimately backs
    questions with different dates.
- Not fixed this run (queued in the Brain): "questions to ask the interviewer" + take-home
  checklist; per-company timelines in weeks; moving the story timeline below the questions
  (template-wide decision); more Excel (SUMIFS/IFS).
- Final verdict after fixes: best page for the main query on information gain (only page with
  reported, dated, linked questions, loops by company and posted pay); ship.
- Rubric score: see Ledger (screenshots at 390 and 1280).

## 8. Measure

- Metric: indexed by Nov 23; impressions for "data analyst interview questions", "flipkart data
  analyst interview", "ey power bi interview questions", "data analyst salary india" by Dec 7.
- Check-back dates: 2026-11-23 (index + audit), 2026-12-07 (impressions, positions), 2027-01-03.
