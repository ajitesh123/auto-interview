# Brief: Salary negotiation script builder (/salary-negotiation), 19 Nov 2026, Part 2

## Reader and job

A job seeker in India (offer in fixed CTC, LPA) or the US (base salary) who has an offer or is about
to be asked "expected CTC / salary expectations". After the page they can: say one precise number,
send a counter email or run a call, answer the recruiter's next line ("max budget", "send 3 payslips",
"we will revise after 6 months", "answer by tomorrow"), ask for a joining bonus / notice buyout
(India) or sign-on / equity (US), accept in writing and resign only after the signed letter.

## Why this page (gap)

SERP teardown 19 Nov (subagent): "salary negotiation email / script / counter offer email" is held by
email-tool content marketing (MailMaestro, Lindy, Hunter), SoFi, paid coaching funnels and thin SEO
pages. India queries ("expected CTC best answer", "negotiate salary in India") are held by Naukri and
Weekday with unsourced hike benchmarks. Free generators (Resume Worded, Teamz Lab, ClavePrep) take no
numbers or no INR; none computes the ask, none branches on the recruiter's reply, none handles CTC,
payslip demands, buyout/clawback. We had no page on negotiation (only the offer comparer and CTC
calculator, which now link here).

## Keywords

Primary: salary negotiation script / salary negotiation email / counter offer email. Secondary:
how to negotiate salary after job offer, expected CTC answer, how to negotiate salary in India,
HR max budget reply, joining bonus notice buyout.

## Original asset

A working no-AI builder (data/negotiation/engine.ts): precise-number rule (round ask +~1.5%, rounded
to ₹5,000/$250, from the Columbia precise-anchor study), gap % and money, hike over current vs Aon 9%,
7 moment scripts × email/call, 9 India / 7 US replies filled with the reader's numbers, 8 rule checks
on any draft, on-device save. Worked weak-vs-strong example computed by the same checks.

## Visuals (all from components/viz, sourced, dated)

1. SegmentBar: Pew 2023 outcomes for those who asked (38 / 35 / 28). Source: Pew short read 5 Apr 2023.
2. StatRow: Pew who asked (32% men / 28% women), not comfortable (38%; 42/33), 18–29 (46%).
3. Flow: 6 steps offer → signed letter → resign.
4. BarList: Aon India 2027 projection by industry (NBFC 10.1 … tech consulting 6.6, all 9.1). Aon 14 Oct 2026.
5. StatRow: India 9% actual 2026, 18% attrition, 9.1% 2027; US 3.5% actual 2026, 3.4% 2027 (WTW 15 Jul 2026).
6. Table: US state rules (CA, NY, CO, WA, IL, MA): salary-history ban (only where opened) + pay range in postings.
7. In-tool GapLine: offer / walk-away / counter / current on one line (CSS transition, reduced-motion off).

## Sources opened (19 Nov 2026)

Pew; Columbia CBS release; Harvard PON (29 Oct 2026); Aon India 14 Oct 2026; WTW 15 Jul 2026; CA DIR
Equal Pay Act FAQ; MA pay transparency; IL IDOL release; (subagent-opened, quoted) NY.gov, NY Governor,
CO CDLE statute, WA RCW 49.58.110; r/developersIndia offer-revoked thread (via mirror).

## Red lines checked

No AI call, no key. No invented stats (no "84% who negotiate get more", no unsourced hike %). No
aggregateRating. Mock CTA top (MockInterviewButton) and MockInterviewCTA at the end. Samples fictional.

## Measure

GSC impressions/clicks for /salary-negotiation on the keywords above; internal clicks from
/job-offer-comparison and /salary-calculator. Check back 3 Dec and 17 Dec 2026.
