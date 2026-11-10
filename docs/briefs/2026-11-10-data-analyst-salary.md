# Brief: Data Analyst salary in India and the US (49 posted offers)

- URL: /data-analyst/salary
- Slot: A (interview prep), ROLE ASSET MATRIX item 5 (salary) for the /data-analyst hub
- Date: 2026-11-10 Author run: 09:42 IST

## 1. Who is searching and why

- Main query: data analyst salary in india. Fan-outs: data analyst fresher salary; data analyst
  salary per month in india; senior data analyst salary in india; data analyst salary bangalore /
  hyderabad / pune; can a data analyst earn 1 lakh a month; data analyst vs data scientist salary;
  data analyst salary at Deloitte / Amazon / Google India; data analyst salary (US).
- The reader: a final-year student or 0–3 year analyst in India deciding whether to take an offer,
  which city or employer type to aim for, or what to ask in negotiation. Second reader: US entry
  analyst checking ranges.
- Success: they can price an offer in hand per month, compare it with real posts, their city and
  the employer type, and know what to negotiate.

## 2. What we already have (inventory check)

- /data-analyst (hub, shipped 9 Nov) has a pay section with 28 posts and 6 Levels.fyi rows.
  /interview-questions/data-analyst and /cv-templates/data-analyst have no pay content. No blog post
  covers data analyst salary (grep of data/blog: 0 posts).
- Overlap verdict: NEW matrix page (/<slug>/salary pattern, like /ai-engineer/salary). The hub keeps
  a short pay section and links here automatically (RoleHubPage reads ROLE_SALARIES).
- Links in: /data-analyst hub (automatic), 5 sibling salary pages (automatic "Up next"), sitemap
  (automatic). Links out: /salary-calculator, /data-analyst, /data-analyst/resume, sibling salary pages,
  /free-mock-interview.

## 3. What is ranking and being cited (opened, not guessed)

Teardown run on 10 Nov 2026 by a research subagent (WebSearch is not Google India; Google PAA and AI
Overview were not visible, marked UNKNOWN). AmbitionBox and Glassdoor India did not load.

| #   | URL                                                                          | Type       | What it does well                                                              | What it misses or gets wrong                                                                                               |
| --- | ---------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| 1   | in.indeed.com/career/data-analyst/salaries (9 Oct 2026)                      | aggregator | Avg ₹6.28L, 5 city figures, 6 company figures, live job carousel               | Mixes "reported" with job-post data, no n per company, outliers (Hr Anexi ₹22.5L), no experience split, nothing on in-hand |
| 2   | naukri.com/blog/what-is-the-data-analyst-salary-in-india (modified Feb 2025) | blog       | Experience ladder, IT services firms                                           | Single source (AmbitionBox), "up to" ceilings shown as averages, ~21 months old, no posts                                  |
| 3   | weekday.works/post/data-analyst-salary-in-india-2026 (Oct 2026)              | blog       | Closest competitor: bands by years, city, company type and one in-hand example | Ranges unsourced, internal contradictions, in-hand assumptions hidden                                                      |
| 4   | intellipaat.com/blog/data-analyst-salary (May 2026)                          | edtech     | Experience table, 10 countries                                                 | No source, avg ₹4.4L conflicts with others, copy errors                                                                    |
| 5   | scaler.com/topics/data-science/data-analyst-salary (Feb 2023)                | edtech     | City × level table, company FAQs                                               | 3.75 years old, contradictions, "Explore with AI" prompts                                                                  |
| 6   | payscale.com/research/IN/Job=Senior_Data_Analyst/Salary (Sep 2026)           | aggregator | n=297, percentiles                                                             | Entry n=14, city/company sections have no values                                                                           |

- People ask (from opened pages): fresher salary; can a DA earn ₹1 lakh a month; which city pays most;
  which companies pay most; DA vs data scientist pay; Amazon/Google/Flipkart/Accenture DA salary.

## 4. Our information gain (why ours will be the best page)

- 49 real job posts that print pay, each linked: 24 India (9 asking 0–1 years) and 25 US, opened
  9–10 Nov 2026; posts dated before 2026 dropped.
- Every India CTC converted to monthly in-hand on 2026-27 rules (shared with /salary-calculator).
- Levels.fyi city table (6 cities all-levels with p25/p75 and n, 5 entry-level medians) and an
  18-employer India table, each linked.
- Computed findings no ranking page has: Bengaluru posts ₹18.5 LPA median midpoint vs ₹7 LPA
  elsewhere; fresher posts ~₹4 LPA vs Levels.fyi Bengaluru entry ₹11.5L (self-report skews to
  large employers); employer type 4–5x gap (Walmart ₹42.2L vs Deloitte ₹8.2L).
- A tool: "Where does your offer sit?" (CTC → in-hand, above X of 24 posts, inside/below the city's
  middle half). No AI, nothing leaves the browser. Ships on every salary page with India posts.

## 5. Sources (primary first, every one opened)

| Claim                        | Source URL                                                                                                       | Opened on             | Quote or number                                                                                                                                                                                 |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| India DA median              | https://www.levels.fyi/t/data-analyst/locations/india                                                            | 2026-11-10 (me)       | ₹1,460,342; p25 ₹931K; p75 ₹2.23M; 381 salaries; Walmart ₹4,226,236; Amazon ₹3,952,910                                                                                                          |
| Entry level Bengaluru        | https://www.levels.fyi/t/data-analyst/levels/entry-level/locations/greater-bengaluru                             | 2026-11-10 (me)       | ₹1,145,033; 24 salaries                                                                                                                                                                         |
| Walmart India                | https://www.levels.fyi/companies/walmart/salaries/data-analyst/locations/india                                   | 2026-11-10 (me)       | ₹4.22M; 80 submissions                                                                                                                                                                          |
| City + other company medians | levels.fyi city and company pages (URL on each row of the data file)                                             | 2026-11-10 (subagent) | see data/roleSalary/data-analyst.ts                                                                                                                                                             |
| India posts                  | Wellfound, Cutshort, Internshala, Weekday, Workable (URL per row)                                                | 2026-11-09/10         | re-opened by me: UniAcco ₹4–6L, Translink ₹2.4–3L, Stattr ₹26,000/month, Leon & Walker ₹24–36 LPA, Staffnixcom Pune ₹30–32L, Talent Pro ₹8–12L (28 Jan 2026) and ₹10–12L (15 Dec 2025, dropped) |
| US posts                     | Greenhouse, Lever (URL per row)                                                                                  | 2026-11-10            | all 14 carried-over posts re-opened and live; CareerVillage "Starting salary of $76,000" re-opened by me                                                                                        |
| US DA median                 | https://www.levels.fyi/t/data-analyst                                                                            | 2026-11-10            | $110,000; 991 salaries                                                                                                                                                                          |
| BLS                          | https://www.bls.gov/ooh/math/operations-research-analysts.htm ; https://www.bls.gov/ooh/math/data-scientists.htm | 2026-11-10            | $88,940 (2025); $120,230 (2025)                                                                                                                                                                 |
| In-hand maths                | data/indiaTax.ts (sources map inside)                                                                            | 2026-11-06            | new regime, 50% basic, PF on ₹25,000 ceiling                                                                                                                                                    |

## 6. Shape and engagement plan (5–10 minutes, no walls of text)

- Answer-first: H1 + one-sentence answer with the median and in-hand; method callout.
- The thing to DO, high on the page: "Where does your offer sit?" checker.
- Sections: India posts (tiles, table, experience split) → US posts → By city → By company →
  What the posts show (5 short findings) → Negotiate (5 moves + Up next cards) → FAQ (8) → ink CTA.
- Next step: hub, resume kit, calculator, mock interview.

## 7. Review (filled after the independent critic)

- Critic verdict (fresh subagent, 10 Nov): NOT YET on first pass. More information than any ranking
  page (linked dated posts, in-hand per post, city table with n, working tool), but: (1) the headline
  median (₹10.5 LPA) overstates what most readers earn; (2) Walmart vs Deloitte compared without
  seniority; (3) Levels.fyi total pay labelled LPA and turned into in-hand as if CTC; (4) "fresher"
  band included 0–15 and 1–2 year posts; (5) OfferCheck compared a fresher with all-level city pay,
  preselected Bengaluru, dropped Mumbai, had no fixed-pay hint, unhelpful error; (6) Bengaluru and
  Hyderabad Levels.fyi numbers drifted; (7) 2–3 yr band above 4+ unexplained; (8)–(11) wording,
  India data scientist pay missing, repetition, Velocity counted twice; (12) no LPA → monthly lookup.
- All 12 fixed: hero adds fresher ₹3.1 LPA (≈₹22,000/month) and outside-Bengaluru ₹7 LPA; method
  box names 8 recruiter posts; seniority caveat (L4 vs L1); "lakh" for self-reported pay and "In hand
  if this were CTC"; fresher = 5 posts open to freshers (Uniabroad's 0–15 removed from bands,
  Neemtree moved to 3 yrs); OfferCheck rewritten (entry-level line first, "Pick a city", Mumbai
  included, "Fixed CTC" label, clear error); Bengaluru ₹16.8L/151 and Hyderabad ₹13.3L re-opened;
  pattern explains the band inversion; India data scientist median ₹29.8 lakh (1,030 salaries,
  Levels.fyi, opened); repetition cut; monthly lookup table on every salary page. After fixes, my verdict: SHIP (every critic item addressed; numbers recomputed with tsx).
  "7 years" for Walmart's L4 was not on the page I opened, so it is not stated.
- Metric and check-back: GSC impressions for "data analyst salary in india" and the fan-outs;
  check back 2026-11-24 and 2026-12-08. Hypothesis: the only DA salary page built from linked,
  dated posts with in-hand pay reaches top 30 for the head term in 4 weeks and gets cited for
  "fresher data analyst salary" and city fan-outs.
