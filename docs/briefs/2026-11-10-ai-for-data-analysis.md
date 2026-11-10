# Brief: AI for data analysis without code

- URL: /learn-ai/ai-for-data-analysis
- Slot: B (Learn AI + engagement)
- Date: 2026-11-10 Author run: 15:42 IST

## 1. Who is searching and why

- Main query: "how to use AI for data analysis" / "ai for data analysis".
- Fan-outs: "chatgpt for data analysis", "ai tools for data analysis", "can chatgpt analyze excel data", "is chatgpt accurate for data analysis", "gemini in google sheets data analysis", "copilot excel python".
- The reader: an aspiring data analyst (our /data-analyst hub and /data-analyst/salary, shipped Nov 9–10) or a non-technical professional with a spreadsheet. They can use Excel; they do not code. They worry about two things: which tool, and whether to trust the answer.
- Success: they know what the AI does with a file (writes and runs Python), which tool fits their data, how accurate it is per published research, and 5 checks they can run in under 5 minutes. They have practised catching 4 classic errors.

## 2. What we already have (inventory check)

- grep data/blog, data/learnAi, data/roleHubs: no post or lesson on AI data analysis. Closest: /learn-ai/ai-hallucinations (made-up facts, not analysis method), /data-analyst hub (links lessons but none on analysis with AI).
- Overlap verdict: NEW lesson (Learn AI backlog item "AI for data analysis without code").
- Links in: /data-analyst hub (lesson path, first pick), /learn-ai/ai-for-interview-prep (Next), /learn-ai/ai-hallucinations (related), reverse role links on S&O, founder's office, growth and PM. Links out: /data-analyst, /data-analyst/salary, ai-hallucinations, what-is-an-api (Next), /free-mock-interview.

## 3. What is ranking and being cited (opened, not guessed)

Research subagent opened these on 2026-11-10 (WebSearch, US):

| #   | URL                                                       | Type                        | What it does well                                      | What it misses or gets wrong                                                                              |
| --- | --------------------------------------------------------- | --------------------------- | ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| 1   | blog.apify.com/ai-for-data-analysis                       | Vendor blog (mod. Oct 2026) | Long tool list                                         | Mostly Python libraries; 2016–2023 stats; no measured accuracy, no checklist, no dataset; ends in a pitch |
| 2   | blog.coupler.io/how-to-use-chatgpt-for-data-analytics     | Vendor blog (mod. Oct 2026) | Example conversations; "cross-check important figures" | No accuracy data, no checklist, no practice file                                                          |
| 3   | datacamp.com/blog/unique-ways-to-use-ai-in-data-analytics | Edtech (Aug 2024)           | Tool list                                              | Dated; no checks, no data                                                                                 |
| 4   | simplilearn.com/ai-tools-for-data-analysis-article        | Edtech                      | —                                                      | Returned a teaser directory, not an article                                                               |
| 5   | thebricks.com, julius.ai, careerfoundry, dice             | Vendor/tool lists           | Lists                                                  | Same pattern (not all opened)                                                                             |

- AI answers for this query typically list tools; none of the opened pages cites a measured accuracy number or a primary help page.

## 4. Our information gain

- Original asset: "Spot the AI's mistake", a no-AI practice with a 12-row fictional CSV (downloadable) and 4 AI-style claims, each with a classic error (average of averages, blank read as zero, percent vs percentage points, right number wrong label). Every number is computed in data/learnAi/dataAnalysisPractice.ts.
- Measured accuracy from primary papers: DSBench best agent 34.12% of 466 analysis tasks; DA-Code best LLM 30.5%.
- Tool facts from each maker's own help page, as of Nov 2026 (ChatGPT 512 MB / ~50 MB CSV, Free 3 uploads a day; Claude 30 MB, all plans; Gemini in Sheets plan rule and Python per the Jan 2025 Workspace post; Copilot in Excel + =PY Python in Excel). Noted: Microsoft retired its Copilot-with-Python article (Sept 2026).
- What no ranking page says: the AI computes with code, so the risk moved from arithmetic to method; here are 5 checks that need no coding.

## 5. Sources (primary first, every one opened)

| Claim                                                                   | Source URL                                                                                                      | Opened on             | Quote or number                                                                    |
| ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------- | ---------------------------------------------------------------------------------- |
| ChatGPT writes and runs Python, pandas + Matplotlib; 512 MB, CSV ~50 MB | https://help.openai.com/en/articles/8437071-data-analysis-with-chatgpt                                          | 2026-11-10            | "writes Python code to process the data"                                           |
| Free 3 uploads/day                                                      | https://help-lb.openai.com/en/articles/8555545-file-uploads-faq                                                 | 2026-11-10            | "Free users are limited to 3 file uploads per day."                                |
| Claude runs Python/JS, 30 MB, all plans                                 | https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude                               | 2026-11-10            | "The maximum file size is 30MB per file"                                           |
| Gemini in Sheets: plan rule, accuracy warning                           | https://support.google.com/docs/answer/14356410?hl=en                                                           | 2026-11-10            | "requires an eligible Google Workspace or Google AI plan"                          |
| Gemini in Sheets uses Python                                            | https://workspaceupdates.googleblog.com/2025/01/generate-charts-and-insights-with-gemini-google-sheets.html     | 2026-11-10            | transforms requests "into Python code" (Jan 29, 2025)                              |
| Python in Excel: =PY, runs in Microsoft Cloud                           | https://support.microsoft.com/en-us/office/introduction-to-python-in-excel-55643c2e-ff56-4168-b1ce-9428c8308545 | 2026-11-10            | "calculations run in the Microsoft Cloud"                                          |
| Copilot in Excel                                                        | https://support.microsoft.com/en-us/excel/welcome-to-copilot-in-excel                                           | 2026-11-10 (subagent) | "helps you build and edit workbooks"                                               |
| DSBench 34.12%, 466 + 74 tasks, Eloquence + Kaggle                      | https://arxiv.org/abs/2409.07703v2                                                                              | 2026-11-10            | "the best agent solving only 34.12% of data analysis tasks"                        |
| DA-Code 30.5%                                                           | https://arxiv.org/abs/2410.07331v2                                                                              | 2026-11-10            | "only 30.5% accuracy"                                                              |
| InfiAgent-DABench 257 questions / 52 CSVs                               | https://arxiv.org/abs/2401.05507                                                                                | 2026-11-10 (subagent) | 257 questions, 52 CSV files                                                        |
| Mollick: treat it like an analyst, double-check                         | https://www.oneusefulthing.org/p/what-ai-can-do-with-a-toolbox-getting                                          | 2026-11-10            | "double-checking the results and process"                                          |
| Video Hp6HnxFyd10 title + channel                                       | YouTube watch page                                                                                              | 2026-11-10            | Google Workspace; duration not shown (oEmbed fetch blocked), so no minutes printed |

## 6. Shape and engagement plan

- TL;DR: the AI writes and runs code; best agent 34.12% on DSBench; run 5 checks.
- 5 steps as short cards: what happens on upload (flow) → which tool (label: value lines) → how accurate → workflow prompt → 5 checks.
- To DO: Spot the AI's mistake (4 claims, instant feedback, all explanations in HTML) + CSV download + a 10-minute try-it with a real chatbot + 3 self-check questions.
- Next step: role links high under the TL;DR (data analyst first), Next lesson, /data-analyst, /free-mock-interview.

Engagement change in the same run: "Roles that need this lesson" now shows on 37 of 39 lessons (was 21 of 38 before this run; 17 lessons had no role link). Every link names the role first with a one-line reason (information scent, NN/g Jul 2024).

## 7. Review

- Critic verdict (independent subagent, 2026-11-10): NOT YET but close. Beats Apify, Coupler and DataCamp on information gain (only page with measured accuracy, a practice dataset and a no-code checklist). Practice maths re-done by hand: all correct.
- Fixed (12): exact OpenAI step quote and the "[>_]" link label; Mollick quote corrected to "look through it and tell me what you find"; ICLR/EMNLP venues dropped (not on the opened pages); "newer models score higher" removed (unsourced); accuracy bullets labelled as our rules of thumb; TL;DR softened; DA-Code wording matched ("best LLMs"); Gemini Python hedged to the Jan 2025 post; NEW privacy step (OpenAI training "depends on the service", Enterprise excluded, Anthropic file-injection warning, 13-hour sandbox); formulas/pivots and dedicated tools (Julius, Copilot in Power BI) added; direct "Can ChatGPT analyse Excel data" FAQ; try-it names Gemini in Sheets; round 4 tie removed (Sep Bengaluru 4,550); round 3 reworded to "what should the sentence say".
- Not fixed: help-lb.openai.com kept as the URL actually opened. Copilot plan wording comes from the subagent's opened page.
- Verdict after fixes: ship.
- Rubric score: 18/20 (H1 Newsreader 30.2px at 390, 44px at 1280; no page overflow; practice exercised in Playwright: 4 cards, score line, CSV 200; JS error seen is the local static-server font mock, also on existing lessons).

## 8. Measure

- Metric: indexed by Nov 24; impressions for "ai for data analysis" / "chatgpt for data analysis" by Dec 8; clicks from /data-analyst to this lesson once GA4 access arrives.
- Check-back: Nov 24 and Dec 8 (audit again per docs/content-audit.md).
