# Brief: Resume Keyword Checker (free, in-browser, no AI)

Date: 14 Nov 2026 · Part 2 (job value) · URL: /resume-keyword-checker

## Reader and queries

Job seekers in India and the US tailoring a resume/CV to one job post. Queries: "resume keyword checker", "resume keyword scanner free", "match resume to job description", "ATS keyword checker", "missing keywords in resume", "resume vs job description checker". The reader has a job post open in one tab and their resume in another.

## What the reader can DO after the page

Paste a job post and their resume, and in under a minute see: which skills the post asks for, which of those the resume already shows, which are missing (with the post's own sentence for context and where to add each), whether the post's job title is on the resume, and 8 format checks (contact lines, section headings, length, bullets with numbers, weak openers, first person, overlong bullets, keyword stuffing). Text stays on their device.

## Inventory (ours)

- /resume-job-matcher: upload tool that calls a Gemini route (needs the Vercel key; slow, sends the resume to a server; sr-only description text). Verdict: KEEP, add a visible link to the new no-AI checker. Not merged now (a page with a URL and possible impressions; Rahul approves redirects).
- Role resume kits /<role>/resume (10 roles): the checker links each one as "next step".
- /build-resume, /cv-templates: linked as next steps.

## Teardown of what ranks (opened 14 Nov 2026)

- Rezi keyword scanner: signup wall, AI bullet rewriting; FAQ quotes unsourced stats ("88% filtered out", "99.7% of Fortune 500 recruiters use keyword filters").
- tryapplynow keyword checker: in-browser, match % and matched/missing, but no counts, no categories, unexplained 70%/40% thresholds, no context for why a term is missing.
- Jobscan (the category leader) is paid after a few scans.
  Gap: nobody shows the post's own sentence beside each missing skill, separates must-have from nice-to-have by reading the post's sections, or tells the reader honestly what an ATS does with keywords.

## Information gain

1. Priority read from the post's structure (requirements vs preferred lines, repeats).
2. Context snippet for every missing skill + where it belongs (skills line vs a bullet with proof).
3. A skill dictionary (220+ entries at launch) with aliases (PowerBI = Power BI, k8s = Kubernetes, GenAI = generative AI) tuned to our role hubs.
4. Honest ATS section with primary sources: Jobscan 2026 Fortune 500 report (97.4%, 487 of 500; vendor source); Jobscan State of the Job Search: 76.4% of recruiters search and rank by skills from the job description (vendor survey); Enhancv survey of 25 US recruiters, Nov 2025: 92% say their ATS does not auto-reject for formatting or missing keywords (small sample, vendor).
5. A worked example computed at build time by the same code the tool runs, so numbers on the page reconcile with the tool.

## Visuals

- Tool result panel: coverage meter + counts (CSS), keyword chips.
- StatRow: three sourced ATS facts.
- Flow: how the checker reads a post (4 steps).
- BarList in Figure: worked example, coverage by priority for the sample.
- Table: where to put a missing keyword (do / don't).

## Engagement

Samples (PM, data analyst, AI engineer: fictional) to try with one click; drafts saved on this device; next-step cards to the role's resume kit; MockInterviewButton near top, MockInterviewCTA at the end.

## Measure

Check back 28 Nov and 12 Dec: GSC impressions for "resume keyword checker" family; clicks to /<role>/resume from the tool.

## Critic (fresh subagent, 14 Nov 2026): SHIP AFTER FIXES

Fixed before ship: 17 bad aliases (REST, Excel case, MS, lone R, ML, Go, Branch, containers, CSM, packaging, lifecycle, discovery, demos, testing, deployment, growth, .js); bullet lines no longer act as section headings; Bachelor of / Master of / MBA long forms; context keeps leading digits and prefers the requirements line; phone check ignores year ranges; "Phase I" no longer counts as first person; ~40 sales, marketing and software skills added; single-mention acronyms and CamelCase names shown; sticky nav opaque; non-must missing cards collapsed; 76.4% now links the Jobscan 2026 report that cites it; hero says "likely must-haves".
