# Brief: /cv-templates hub rebuilt honest and on Signal Paper (Part 1, 17 Nov 2026)

## Why

Part 1 walk, 17 Nov. /cv-templates is the hub of our role CV pages (best role page: /cv-templates/financial-analyst, 224 impressions in the last GSC export). It was the most off-theme, least honest page left in the main nav:

- H1 "Proven formats that pass every filter."; cards said "✓ Verified ATS", "guaranteed to parse accurately in any ATS engine", FAQ said "99%+ parsing accuracy" (no source; same family as the paused 99.8% ATS claim).
- Harvard card said "Best B-School in the world." The template comes from Harvard FAS's Mignone Center for Career Success, not a business school.
- Two Google Doc links attributed to "IIM Ahmedabad" and "Resume Worded" whose owners we could not open or confirm.
- Two links to /build-resume as an "AI resume builder" with "real-time ATS scoring" (no AI exists in the builder; it also claimed "Passes 99.7% of ATS scanners").
- No mock-interview CTA in the page body, black buttons, raw hex, emerald text, a dark card.
- Our strongest asset was buried: 10 one-page Word templates of our own (Indian table CV format, fictional samples), one per role kit.

## What the reader can do after the page

1. Download a one-page Word CV template for their role (10 of ours) or Harvard's official bullet template (Word, accessible Word, Google Docs copy).
2. Know the 5 format rules that keep a CV readable by an applicant tracking system.
3. Check their CV against a job post (/resume-keyword-checker), then practise the interview (/free-mock-interview).

## Sources (opened 17 Nov 2026)

- Harvard FAS Mignone Center, Bullet Point Resume Template page (last modified 14 Oct 2026): https://careerservices.fas.harvard.edu/resources/bullet-point-resume-template/ — .docx, accessible .docx and Google Docs copy links taken from it.
- ATS behaviour: the sources already cited on /resume-keyword-checker (Jobscan Fortune 500 ATS report, 20 Aug 2026; Enhancv recruiter survey via IT Brief UK, 19 Nov 2025). We link there rather than repeat numbers.
- Our own files: public/downloads/resume-templates/<slug>-resume-template.docx (10), built by scripts/resume-templates/build.js.

## Visuals

- Hero aside: "Inside every Word template" panel (sections and what we left out).
- Flow (components/viz): download → fill → check → practise.
- Role template list (10 rows, each: Word download + guide + letter of recommendation).
- Harvard card with the three official formats.
- Role editions grid (existing CV_ROLES pages).
- MockInterviewButton in the hero; MockInterviewCTA at the end.

## Also in this change

- /build-resume copy made true: no "AI-powered", no 99.7%/99.4% parser claims, the dead AI upload card now points to the keyword checker, "Download as Word (.docx)" (the only format it makes).
- Role CV pages (/cv-templates/<role>, 20 pages): "100% Free & Ungated", "Proven", "99%+ accuracy" copy removed; the unverified Google Doc replaced by Harvard's own Google Docs copy link; H1 "(ATS-Optimized)" → "(ATS-Friendly)".
- Footer: /communities (coming-soon page) replaced by the 12-week YC challenge (the STAR builder is already under Interactive Tools).

## Metric

GSC: /cv-templates and /cv-templates/_ clicks and CTR; downloads of /downloads/resume-templates/_.docx (Vercel logs if Rahul can share). Check back 1 Dec 2026.

## Critic (17 Nov): SHIP AFTER FIXES

Applied: our Indian-format .docx files use tables, so the page no longer claims 'single column' for every template (rules and FAQ reworded); builder export screen no longer says 'ATS-optimized' or 'validated against ATS schemas'; editions intro fixed (PM and DA appear in both lists); 5 meta descriptions 'ATS-optimized' → 'ATS-friendly'; aria-labels on the 10 download links; focus rings. Backlog: template thumbnail previews, Fresher/BTech and Software Engineer kits in the Indian format, Google Docs copies of our templates.
