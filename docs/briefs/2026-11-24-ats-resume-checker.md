# Brief: ATS resume file checker (/ats-resume-checker), Part 2, 24 Nov 2026

**Reader:** a job seeker (India first, US/UK second) about to apply through a company careers page, holding a PDF or Word resume, often a two-column template from Canva or a resume site. Searches: "ats resume checker", "check if resume is ats friendly", "ats format checker", "is my resume ats readable", "ats resume checker pdf", "ats resume checker free no sign up".

**After the page they can:** drop their own file and see (1) the plain text a parser pulls out, read two ways (file order and straight across the page), (2) 12 file checks with the help page each rests on, (3) the exact fix for each failure, then send the text to our keyword checker in one click.

**Why ours wins (SERP, 24 Nov):** top results (ResumeBuilder, resume.io, Enhancv, Jobscan, Zety, Kickresume) upload the file to a server, most lead into signup/builder flows, and none shows the line-by-line jumble of a two-column layout. Closest rival is Checkr ATS X-Ray (shows extracted text, PDF only, server-side). Ours: PDF + .docx, in the browser, nothing uploaded, Word-specific checks (header/footer, text boxes, tables, Word columns, Symbol icons) no rival lists, and every check cites the ATS's own help page.

**Original assets:**

1. Matrix: 11 primary sources (8 ATS/parser help pages + MIT + Buffalo + Workday) × 8 layout problems, quotes verbatim, counts computed (data/atsFileCheck/sources.ts).
2. Measured worked example: one fictional resume in three layouts run through the real checker at build time (scripts/ats/gen-samples.mts → data/atsFileCheck/sampleResults.json): pass/fix counts and column jumps.
3. The working tool (no AI, no key, no upload): data/atsFileCheck/extract.ts + checks.ts, pdf.js served from /vendor.

**Visuals:** hero "same resume read across the page" (L/R lines from sampleResults, staggered reveal); BarList "how many sources name each problem"; matrix table; three sample thumbnails with counts; live page preview with the column split and a read line sweep (CSS, off under reduced motion).

**Honesty rules:** no "ATS score"; say plainly that an ATS rarely auto-rejects on layout (knock-out questions do) and that the cost of a bad parse is wrong profile fields and missed recruiter searches; PDF vs Word: sources disagree (Buffalo prefers PDF), follow the posting.

**CTA:** MockInterviewButton in hero; MockInterviewCTA at the end (recruiter screen questions).

**Metric / check-back:** impressions for "ats resume checker" family and clicks to /ats-resume-checker in GSC by 8 Dec 2026; sends to /resume-keyword-checker.
