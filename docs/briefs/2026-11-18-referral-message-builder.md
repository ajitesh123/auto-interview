# Brief: Referral message builder (/referral-message), Part 2, Nov 18 2026

## Reader and job

A job seeker (India campus/early career and US switchers) who has found a role and knows, or can find, someone at the company. Searches: "referral message for job", "how to ask for a referral on linkedin", "referral request message sample", "how to ask a stranger for a referral".

After the page they can: send a LinkedIn connection note that fits the free 200-character limit, send the referral ask once accepted (role, job ID, link, resume link, one line of fit, easy out), paste a summary into the referrer's form, follow up once at the right time, thank the referrer, and track everyone they asked on the device. They can also paste a message they already wrote and get 8 rule checks.

## Gap (SERP teardown, 18 Nov 2026)

Top results (Weekday, Happenstance, Taplio, HireFlow, refer.me, Cake, dev.to) are template lists, often vendor promos with unsourced metrics. Only Happenstance gives the 200/300 limits and no page counts characters. None checks a message for job ID, resume link, "any openings", or tells you when to follow up. Follow-up advice contradicts (4–5 days to 10 business days). We had no page on the topic (grep data/blog and app).

## Original asset

- A working non-AI builder: 4 relationships × 2 ask styles, applied/not applied; note auto-shortens to ≤200 characters.
- 8 rule checks shared by the builder, the paste-your-own panel and the worked example (data/referralMessage/engine.ts).
- Referral tracker with follow-up date (+5 working days), saved in localStorage.
- Sourced visuals: Ashby application-to-interview by source (BarList), follow-up wait advice (RangeList with our rule), length advice (StatRow), how a referral works (Flow) from 4 employer careers pages, weak vs strong worked example.

## Visuals and data sources (all opened 18 Nov 2026)

- Ashby Talent Trends Report: Referrals (16 May 2025): 40% referral vs 3% inbound app-to-interview; 16% interview-to-offer; ~1% of applications.
- Burks et al. QJE 2015; FRBNY Staff Report 568.
- Microsoft, J&J, AT&T, Accenture careers pages; Infosys fraud alert.
- LinkedIn limits: LinkedIn Help as quoted by Happenstance (Aug 2026). LinkedIn Help itself is robots-blocked; stated on page.
- Weekday, Taplio, HireFlow, workat.tech, Blind for length/follow-up/practice.

## CTA

MockInterviewButton in hero ("Referred? Practise the interview"); MockInterviewCTA at the end with post-referral questions.

## Measure

Keyword: "referral message for job" (+ "how to ask for referral on linkedin"). Check GSC impressions for /referral-message on Dec 2 and Dec 16, 2026. Value action: copy clicks and tracker entries are on-device only; proxy is mock-interview clicks from the page.
