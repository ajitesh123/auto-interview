# Brief: /cover-letter → free cover letter builder (Part 2, 28 Nov 2026)

## Why

/cover-letter was a thin index (hero card + role chips, straight to the CTA): scored 3/5 valuable on the Nov 25 and Nov 28 Part 1 walks. "Cover letter" / "cover letter format" / "cover letter for freshers" / "covering letter" are among the largest job-seeker queries, and the URL already sits in the footer, homepage tools, /resources and RelatedTools.

## Reader and job

A fresher, intern, switcher or experienced candidate (India first, US/UK too) with a job post open. After the page they can: write a letter part by part, get it laid out correctly for where it goes (email body, PDF/Word, Naukri/Internshala box, UK letter), fix it against 10 checks, and download a Word file. No AI, no sign-up.

## SERP (28 Nov 2026, research subagent)

- Head terms are owned by university guides (BC, UPenn, Purdue) and content sites (Zety, Coursera, Naukri, Adobe).
- Every builder opened uses AI (GPT) and most gate downloads (Zety paid PDF/DOC from $1.95; Kickresume 1 free letter). Naukri's own composer is a bare text box. Naukri's fresher page: 7 samples, copy only.
- Gaps: no no-AI, no-signup builder with a Word download; no cover letter checker (length, opening, clichés, company named, CTA); no visible job-post keyword match; no format switch for India portals / email body / UK sign-off rule.

## Original assets

1. Builder (data/coverLetterBuilder/engine.ts, components/coverLetterBuilder/CoverLetterBuilder.tsx): 4 stages × 4 channels, 5 parts, live letter with part labels, word meter vs target band, 10 checks (9 without a post), job-post skill match reusing the resume keyword checker engine, Copy / .docx (docx lib, in browser) / .txt, saved on device, ?sample= loading.
2. 6 fictional samples (B.Tech fresher email, B.Com fresher Naukri box, internship Internshala box, AE 4 yrs PDF, teacher → CS, UK graduate "Yours faithfully") + a generic weak letter; all counts computed by the engine.
3. Weak vs strong table: checks run on both letters with the same fictional post.

## Sources (opened; quotes re-checked verbatim by a second fetch agent, 28 Nov)

MIT CAPD (one page, 10–12 pt; "Dear Hiring Manager"); National Careers Service UK (3 to 5 paragraphs; sincerely/faithfully); Prospects (3–5 paragraphs, one A4 page; PDF; paste in email body); University of Michigan (email body); Internshala (250–300 words); Resume Genius (625 US hiring managers: 83% always/frequently read, 60% of companies require, 400 words average preferred; survey year 2022–23); ResumeGo (7,287 fictitious applications, tailored +53% vs none; 81% value tailored); Cui, Dias, Ye arXiv 2509.25054 v2 (−51%); TopResume (600 hiring managers, 19.6% would reject AI-generated resume or cover letter). Vendor-run surveys are labelled.

## Visuals

Hero anatomy card (labelled parts of the sample, computed), word meter (animated width, reduced-motion off), Flow (5 parts), 4 channel cards, quotes list, RangeList Figure (sources + our samples + weak letter, rule at 250), StatRow (4 studies with caveats), decision cards, before/after letters + checks table + 5 moves, 6 sample cards (details), AI prompt card (edit-only prompt), role-kit chips, FAQ (11, from real questions), MockInterviewCTA.

## Keywords

cover letter, cover letter format, cover letter builder / generator free, covering letter for resume, cover letter for freshers, cover letter for internship, how long should a cover letter be, cover letter without a name, yours sincerely vs faithfully, Naukri / Internshala cover letter.

## Metric

GSC impressions/clicks/position on /cover-letter for the keywords above (baseline: thin page); builder use once GA4 is connected. Check back 12 Dec and 26 Dec.
