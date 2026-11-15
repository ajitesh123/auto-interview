# Brief: Job Offer Comparison Calculator (India) — /job-offer-comparison

Date: 15 Nov 2026 · Part 2 (job value: free tool) · Owner keyword: "job offer comparison calculator" (+ "compare two job offers India", "offer comparison calculator CTC", "joining bonus vs higher CTC", "ESOP vs higher salary")

## What the reader can do after this page

Put 2–3 real offers (or current job vs offer) side by side and see, in rupees: monthly in-hand on FY 2026-27 tax (cheaper regime per offer), expected variable after tax, joining bonus after tax and what leaving before the clawback costs, notice-buyout net cost, equity vested with a cliff, rent + commute, year-1 money left and a 3-year total. Copy a one-paragraph summary to share. Then practise the HR / negotiation round out loud (Tough Tongue AI via /free-mock-interview).

## Audit (what exists)

- /salary-calculator already has "Compare two offers" but only CTC → in-hand (no variable payout, joining bonus, clawback, buyout, equity, rent/commute, multi-year). Reuse its tax engine (data/indiaTax.ts); link both ways.
- No blog post owns offer comparison or negotiation for jobseekers.

## SERP teardown (15 Nov 2026, opened pages)

- India results are thin pages.dev/lovable calculators (calculator-junction: new regime only, no clawback/buyout/rent; sum.money: FY25-26, 2 offers, no clawback/rent; toolsindia: 1 offer vs current), plus articles with no maths (greatfrontend, unboxcareer, moneyview). Best overall UX is US-only (sheetsresume).
- Gaps we fill: clawback (gross repay vs after-tax kept), notice buyout (paid / reimbursed + taxed), both regimes per offer, variable payout % (not 100%), RSU (taxed at vest) vs startup ESOP (count % of value, tax at exercise), explicit rent + commute, year-1 vs 3-year, copyable summary.
- Real questions: Fishbowl "joining bonus 1L, got 80k post-tax, leaving before 1 yr — do they deduct 1L or 80k?"; "EY 9.2 CTC vs TCS 9.2 CTC + 1L joining bonus"; Reddit r/developersIndia "28 LPA = 8L fixed + 20L ESOP, should I?"; "Meesho vs Intuit" ESOP vs bonus.

## Primary evidence (opened, dated)

- EY Future of Pay 2026 (23 Feb 2026): average performers got 60–80% of target variable; top 120–150%; variable = 16.1% of fixed in 2025 → default payout 70%.
- Aon (14 Oct 2026): actual 2026 increase 9.0%, projected 2027 9.1% → default raise 9%.
- ITAT Chennai, S.S.N. Ravi vs ACIT (6 May 2016): refunded sign-on bonus (₹25L, Barclays 1-year clause) cannot be reduced from taxable salary.
- Keka (updated 23 Sep 2026): most Indian joining bonuses carry a 1–2 year clawback.
- Taxsutra (19 Jan 2023): reimbursed notice pay is included in income and TDS deducted by the hiring company.
- Income Tax Dept ESOP page: perquisite = FMV at exercise − exercise price; capital gains at sale.
- Income-tax Act 2025 s.289(3) (bare text, TaxHeal 2 Apr 2026): eligible start-up ESOP tax due within 14 days of the earliest of 60 months after the tax year, sale, or leaving.
- BDO (2016): RSUs taxed as salary perquisite at vesting, at FMV.
- Labour ministry FAQs + PIB 21 Nov 2025: gratuity needs 5 years' continuous service (1 year for fixed-term employees).

## Visuals

1. Hero aside: sample verdict + 4 computed numbers (engine).
2. Tool result panel: animated bars (year-1 left, 3-year total), clawback warning, line-by-line table.
3. Figure + ColumnChart: worked example, money left per year × 3 offers (engine at build).
4. StatRow: 60–80% payout, 9.1% raise, 60 months ESOP deferral, 5 years gratuity (sourced).
5. Rules table: 7 rows, rule → what it does to your money → source.
6. Flow: 5 steps before you sign.
7. FAQ (details, server-rendered) + MockInterviewCTA with HR-round questions.

## Measure

GSC impressions/clicks for the keyword family on this URL; clicks to /free-mock-interview from it (GA4). Check back 29 Nov, 13 Dec.
