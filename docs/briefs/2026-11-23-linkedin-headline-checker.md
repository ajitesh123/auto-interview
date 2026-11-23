# Brief: LinkedIn headline checker (/linkedin-headline-checker)

Date: 23 Nov 2026 · Part 2 (job value) · Owner keyword: "linkedin headline checker"; cluster: "linkedin headline examples for freshers", "linkedin headline for job seekers", "how long should a linkedin headline be", "linkedin headline character limit".

## Who and why

A student, fresher or job switcher (India first, US second) whose headline is still LinkedIn's default ("Student at X" / "Analyst at Y") or a buzzword list. Recruiters search by keywords; the headline is the line under the name everywhere. They want to know: is mine OK, what is wrong, what should it say.

## What the reader can do after the page

1. Paste a headline and get 10 rule checks with the matched text shown, a 220-character meter and a preview of the first ~50 characters people see in narrow views.
2. Build three headline versions from parts (role / target, 1–3 skills, proof, who you help) and load one into the checker.
3. Compare against stage examples (fresher CS, fresher commerce, experienced PM, switcher, between jobs), all fictional and all run through the same engine.

## SERP gap (searched 23 Nov 2026)

MentorCruise and Cultivated Culture gate the breakdown behind email; Pollen, LinkedGrow score without saying how; Cultivated Culture and Naukri still say 120 characters; Grammarly/Resume Worded generate with AI and give no check. Nobody gives a deterministic, explained check with the right limit, LinkedIn's own buzzword list and fresher examples, without sign-up.

## Asset (original)

- Rule engine (data/linkedinHeadline/engine.ts), every rule tied to a source opened 23 Nov 2026.
- Two LinkedIn buzzword lists side by side (LinkedIn Learning list; CBS 2017 report of LinkedIn's analysis of 400 million profiles).
- Career-service guidance table (MIT CAPD, Berkeley iSchool, Notre Dame, CMU, UF, UW, UConn, Texas Tech, Naukri, The Muse via UCSD).
- Weak vs strong worked example computed by the engine.

## Visuals

- HeadlineMeter: 220-character bar with the 50-character preview zone (custom, tokens, data marks only).
- StatRow: 220 limit (LinkedIn Talent Blog), 50 planning number (labelled ours; third-party estimates 40–70), 10 overused words (LinkedIn Learning).
- Flow: the formula (role → skills → proof → target).
- Figure + BarList (emphasis): where the target role first appears, weak vs strong examples (character position), table view.
- Tables: career services, buzzword lists, stage examples.

## Honesty notes

- LinkedIn Help was robots-blocked; the 220 limit is quoted from LinkedIn's own Talent Blog (business.linkedin.com) and Berkeley/Coursera/UC.
- No truncation count is official: say so; 50 is our planning number.
- CMU recommends "Seeking Software Engineering Internship" while The Muse warns about "seeking opportunities" without context: the check passes "seeking" only when it names the role.

## CTA

MockInterviewButton in hero; MockInterviewCTA at end (a headline gets the call, the interview gets the job).

## Measure

GSC clicks/impressions for the page and "linkedin headline" queries; check back 7 Dec 2026.
