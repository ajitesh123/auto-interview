# Brief: AI for Excel and Google Sheets (Learn AI lesson 40)

- URL: /learn-ai/ai-for-excel-and-google-sheets
- Slot: B (Learn AI + engagement)
- Date: 2026-11-11 Author run: 15:42 IST

## 1. Who is searching and why

- Main query: "ai for excel". Fan-out: "chatgpt for excel formulas", "ai in google sheets",
  "copilot in excel how to use", "google sheets ai function", "best ai for excel 2026",
  "copilot function excel not working" (retired 14 Sep 2026), "claude for excel".
- Reader: a student, analyst, ops or sales person who lives in spreadsheets, knows SUM and
  maybe VLOOKUP, and wants AI to write formulas and summaries without shipping a wrong number.
- Success: after this page the reader can (1) pick the assistant that matches the app and plan
  they already have, (2) run one real workflow end to end (describe the sheet → get a formula →
  reconcile → fix the data → chart), (3) use =AI() in Sheets for text columns safely, and
  (4) run two reconciliation checks that catch the classic silent errors.

## 2. What we already have (inventory check)

- /learn-ai/ai-for-data-analysis (Nov 10): uploads to chatbots, accuracy, 5 checks, CSV
  practice. It covers "analyse a file", not "work inside Excel/Sheets with formulas".
- Grep data/blog for "excel" + "ai": no post targets AI for Excel/Sheets.
- Verdict: NEW lesson; link both ways with ai-for-data-analysis (its tool block is stale: it
  does not list ChatGPT for Excel/Sheets or Claude for Excel; REFRESH in this run).
- Links in: ai-for-data-analysis (next + related), data-analyst / strategy-and-operations /
  growth roles via roleLessons. Links out: ai-hallucinations, ai-for-data-analysis, /data-analyst.

## 3. What is ranking and being cited (opened by the research subagent, 11 Nov 2026)

| #   | URL                                                     | Type          | Does well                        | Misses                                                                  |
| --- | ------------------------------------------------------- | ------------- | -------------------------------- | ----------------------------------------------------------------------- |
| 1   | ionos.co.uk/digitalguide/.../excel-ai/ (Oct 2025)       | Tool overview | Plain overview of add-ins        | No dataset, no checks, no plan table, no Agent/edit mode, no Sheets     |
| 2   | thebricks.com/resources/chatgpt-excel-formulas (Apr 25) | Vendor blog   | A "validate" step                | Pitches own product, no dataset, no Copilot/Gemini/add-ins              |
| 3   | dupple.com/learn/how-to-use-ai-in-google-sheets (2026)  | How-to        | =AI(), Gemini panel, test 5 rows | No expected outputs, vague plans, affiliate links                       |
| 4   | softcat.com/blog/how-use-copilot-excel (Apr 2024)       | How-to        | Example prompts                  | Outdated ("Preview", data must be a table), no verification             |
| 5   | wps.com/topic/best-ai-for-excel (Jun 2026)              | Listicle      | Prices                           | Ranks own product first, no method, omits Claude/ChatGPT/Gemini add-ins |

None mentions that =COPILOT was retired on 14 Sep 2026, none shows a dataset with expected
answers, none shows the measured accuracy (SpreadsheetBench), none reconciles a result.

## 4. Our information gain

- A fictional 10-row sales sheet (downloadable CSV) with two planted real-world faults (a
  region with a trailing space, a date stored as text). We computed every number in Python:
  the first AI-style SUMIFS gives North ₹5,400; the true October North total is ₹26,400;
  October total ₹62,550; top rep Ravi ₹17,100. Two checks that catch it without knowing the
  answer: COUNT vs ROWS on the date column (9 vs 10) and region totals vs SUM (₹60,600 vs
  ₹66,600).
- A 4-assistant comparison from the makers' own pages (Nov 2026), including the =COPILOT
  retirement and ChatGPT for Excel/Sheets GA (5 May 2026).
- Measured accuracy: SpreadsheetBench 2024 (GPT-4o 18.35%, Copilot in Excel 20.00%, experts
  71.33%) vs Google's own 70.48% claim for Gemini in Sheets (Apr 2026).

## 5. Sources (primary, opened 11 Nov 2026)

| Claim                                                       | Source                                                                                | Number / quote                                                                                 |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| =COPILOT retired                                            | support.microsoft.com/en-us/excel/copilot-function                                    | "Starting September 14, 2026, the COPILOT function is no longer available in Microsoft Excel." |
| Copilot modes, platforms                                    | support.microsoft.com/en-us/copilot-excel                                             | edit, plan, chat; Android chat only                                                            |
| Copilot plans, .xlsx, Automatic calc, warning               | support.microsoft.com/excel/copilot/frequently-asked-questions-about-copilot-in-excel | "can sometimes make mistakes"                                                                  |
| COPILOT launch post (history, review advice)                | techcommunity.microsoft.com/.../4443487                                               | "Its output should be reviewed and validated for accuracy"                                     |
| =AI() syntax, 350 cells, no nesting, no whole-sheet access  | support.google.com/docs/answer/15877199                                               | "Gemini features may suggest inaccurate or inappropriate information."                         |
| Gemini in Sheets side panel abilities, charts do not update | support.google.com/docs/answer/14356410                                               | list                                                                                           |
| Build whole sheets, plans, US English, 70.48%               | workspaceupdates.googleblog.com/2026/04/...                                           | 70.48%                                                                                         |
| Claude for Excel: plans, platforms, limits                  | claude.com/docs/office-agents/excel                                                   | "Only use Claude for Excel with trusted spreadsheets."                                         |
| ChatGPT for Excel and Sheets: dates, GA, abilities          | openai.com/blog/chatgpt-for-excel                                                     | GA "across all plans" 5 May 2026                                                               |
| SpreadsheetBench                                            | arxiv.org/html/2406.14991v2                                                           | 912 questions; GPT-4o 18.35%; Copilot 20.00%; experts 71.33%                                   |

## 6. Shape and engagement plan

- TL;DR answers "how do I use AI in Excel/Sheets" with the tool per app and the rule: ask for
  the formula, then reconcile.
- Steps: (1) which assistant fits your app and plan (CompareTable); (2) the workflow end to
  end on the practice sheet (workflow block + ColumnChart before/after); (3) the two checks;
  (4) =AI() in Sheets for text columns (workflow block); (5) how accurate (BarList).
- Visuals: CompareTable (which tool: makers' pages); ColumnChart (first formula vs fixed,
  computed); BarList (SpreadsheetBench + Google claim). 3 visuals.
- To DO: download the practice CSV, run the workflow, tutor prompt, quiz.
- Next step: ai-for-data-analysis / ai-hallucinations; data-analyst hub.
- What the reader can do after this page: write and check a SUMIFS-type answer with AI, tag a
  text column with =AI(), and choose a tool.

## 7. Review (filled after the independent critic)

- See bottom of file.

## 8. Measure

- Metric: indexed by Nov 25; impressions for "ai for excel", "copilot function excel",
  "google sheets ai function". Check back Nov 25 and Dec 9.
- Video: Ben Collins' =AI() video ID taken from his own blog post embed (benlcollins.com,
  25 Aug 2025); YouTube oEmbed timed out (permission) this run: re-verify next Slot B.

## Critic verdict (independent subagent, 11 Nov 2026)

- First verdict: NOT YET. All numbers recomputed from the CSV and matched; all quotes verbatim.
  Blocking issues: the reconcile check quoted ₹60,600 without saying it needs region totals for
  ALL dates (a reader following along would get ₹41,550); no ".xlsx first" note for Copilot;
  the chart called a constructed formula "First AI formula"; =AI() needs "Generate and insert";
  COUNTIF array inside SUM is unreliable in Sheets (now SUMPRODUCT); copy buttons copied
  multi-line formulas; compare-table cells too long at 390 px and three cells wrong (Copilot
  phones/iPad, chat mode does not edit, Gemini US-only applies to whole-sheet building only);
  no "how to open each tool" or free path; bar chart mixed setups without saying so.
- Fixed all of the above, plus: helper-column headers and date format, three reusable formula
  prompts, illogical key idea, "Swipe" hint on lesson compare tables, Copilot column dashes in
  ai-coding-tools-compared, duplicated row in vibe-coding.
- Not fixed: YouTube oEmbed still unreachable (proxy); ID confirmed from the creator's own embed.
  Re-verify next Slot B. Optional: run the 4 assistants on the CSV and report what each did.
- Final: SHIP after fixes.
