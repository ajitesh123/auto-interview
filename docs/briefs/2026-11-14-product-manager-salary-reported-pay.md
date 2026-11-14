# Brief: Product Manager salary, rebuilt on reported pay (India + US, 55 employers)

> OUTCOME (merge, 14 Nov ~11:30 IST): while this run built a Levels.fyi version, another session
> (desktop, AmbitionBox access) pushed 64ec6f5 + b00d829: a reusable ReportedPay section with 75
> AmbitionBox India employers for PM + APM. That design wins for India (bigger samples, experience
> and city splits). This run kept upstream's template and data and ADDED the US block it lacked:
> 28 well-known US employers from Levels.fyi (median, report count, page-updated date, lowest →
> highest level shown), plus a US finding. The Levels.fyi India company layer (27 employers) and the
> level-ladder chart below were NOT shipped; the data is in Appendix A for a later merge.

- URL: /product-manager/salary
- Slot: A (interview prep: salary kit page, item 7)
- Date: 2026-11-14 Author run: 09:40 IST

Why now: Rahul, Nov 14 09:40 — "job-post pay ranges are not the true figure. Use pay REPORTED BY
PEOPLE ALREADY IN THE ROLE at well-known companies, India and US, at least 20 famous or
well-known companies per role, through AmbitionBox, Levels.fyi and similar." Also: "Ensure the
quality now" and "Don't use Apollo for anything."

## 1. Who is searching and why

- Main query: product manager salary in India. Fan-out: PM salary at Google / Amazon / Flipkart
  India, APM salary India, product manager salary US, senior PM salary, how much does a PM make
  at <company>, PM in-hand salary.
- Reader: a PM candidate (APM to senior PM) with an offer or an interview coming, who needs a
  fair number for a company and level before the HR call.
- Success: they can name the company median, the level band (entry to senior) and the
  percentile their offer sits at, then negotiate with a linked number.

## 2. What we already have

- /product-manager/salary (Nov 6): led with 25 India + 11 US job posts; 16-company Levels.fyi
  India table (no report counts, no dates per row). Hub /product-manager pay chapter.
- Verdict: extend the existing page. Lead with reported pay; keep posts as the startup view.
- Apollo-derived hiring counts removed from all 10 hubs in the same commit (Rahul's ban).

## 3. What is ranking (opened 14 Nov 2026)

| #   | URL                                                     | What it does well        | What it misses                                                                |
| --- | ------------------------------------------------------- | ------------------------ | ----------------------------------------------------------------------------- |
| 1   | weekday.works/post/product-manager-salary-in-india-2026 | APM→CPO ladder, Oct 2026 | 4 companies, no report counts, no US, Glassdoor-derived approximations        |
| 2   | scaler.com/blog/product-manager-salary-in-india         | many sources named       | no company count, no sample sizes, Levels.fyi data from late 2025             |
| 3   | levels.fyi/t/product-manager/locations/india            | the primary data         | one company at a time; no in-hand, no ladder across companies, no negotiation |

AI answers for "PM salary India" quote ranges without counts. Our edge: the dated table with
counts per company, both countries, and a level ladder.

## 4. Information gain

- 27 India + 28 US employers, each with the reported median, number of PM salaries on the page,
  the page's last-updated date and a link (Levels.fyi, opened 14 Nov 2026).
- Role-wide percentiles: India median ₹45.4 lakh (1,512 salaries, updated 13 Nov 2026); US
  $234K (4,884 salaries, 13 Nov 2026).
- Level ladder: lowest vs highest PM level shown, 12 India and 12 US employers (picked for comparable PM levels; 18 / 28 rows carry levels in the table).
- Computed in code: median of company medians, spread, stale-row flags.

## 5. Sources

All Levels.fyi pages listed with URL in data/roleSalary/product-manager.ts (`reported`), opened
14 Nov 2026. Not used: AmbitionBox (WebFetch blocked; needs the desktop browser pane; next run
with the desktop), Glassdoor ('humans only' check), Apollo (banned). Excluded: OpenAI US (one
row), Microsoft/Uber/Salesforce/Walmart India (no India PM page surfaced today; Nov 6 figures had
no count or date).

## Visuals

| Visual                                    | Question it answers               | Data                                         |
| ----------------------------------------- | --------------------------------- | -------------------------------------------- |
| StatRow-style tiles (India, US)           | What is normal?                   | role median, middle half, 90th, salary count |
| BarList Figure, India companies           | Which employers pay most?         | 27 company medians, note = reports + updated |
| BarList Figure, US companies              | Same, US                          | 28 company medians                           |
| RangeList Figure, level ladder India + US | How much does a level change pay? | entry→senior totals                          |
| Tables (View as table + full table)       | Look up my company                | all rows, counts, dates, links               |

## What the reader can do after this page

Find their company and level, see where an offer sits against people already in the role,
convert the fixed part to in-hand, and negotiate with a dated, linked number.

## 6. Shape

Answer-first hero from computed numbers → reported India → reported US → level ladder →
startup job posts (demoted, labelled as posted ranges) → negotiate → FAQ → mock interview.

## 7. Review

- Critic verdict (fresh subagent, 14 Nov): SHIP AFTER FIXES. Spot-checks matched (Flipkart, Meesho,
  Netflix US, Capital One US, Zoho, India role page); Airbnb was wrong. Fixes applied: Airbnb 65
  salaries / 24 Sep 2026 / top level L6; counts that are identical on India and US pages marked
  "all locations" (Google, Amazon, Oracle, Adobe); ladder retitled "lowest → highest level shown"
  with no headline multiple, level names in the label (visible at 390px), one unit (₹L / $K),
  trimmed to 12 + 12; offer check now compares total offer against reported percentiles (bonus +
  stock field); in-hand FAQ uses the fixed part (Flipkart PM I base ₹33.2 lakh → ₹2,18,849/mo);
  stale flag uses calendar year (Swiggy now flagged); locale prefixes stripped from URLs.
  Not fixed this run: AmbitionBox (blocked here), table search/filter, per-city reported pay.
- Rubric: 18/20 (long tables scroll inside their box at 390; ladder labels truncate on mobile, full names in View as table).
- Metric: GSC impressions/position for "product manager salary in India" family + company
  queries. Check back 28 Nov, 12 Dec.

## Appendix A: Levels.fyi data collected 14 Nov 2026 (India + US, not all shipped)

```ts
  reported: {
    checked: '2026-11-14',
    india: {
      role: {
        median: 45.4,
        p25: 29.5,
        p75: 68.9,
        p90: 93.3,
        n: 1512,
        updated: '2026-11-13',
        url: `${LF}t/product-manager/locations/india`,
      },
      ladder: [
        'Google',
        'Amazon',
        'Atlassian',
        'Adobe',
        'Flipkart',
        'Oracle',
        'PhonePe',
        'Swiggy',
        'Razorpay',
        'Meesho',
        'Paytm',
        'BrowserStack',
      ],
      rows: [
        {
          company: 'Google',
          median: 115.4,
          reports: 1827,
          reportsAllLocations: true,
          updated: '2026-10-31',
          url: `${LF}companies/google/salaries/product-manager/locations/india`,
          entry: { level: 'APM1', total: 31.7 },
          senior: { level: 'PM2 (L5)', total: 126 },
        },
        {
          company: 'Atlassian',
          median: 107.5,
          reports: 219,
          updated: '2026-10-27',
          url: `${LF}companies/atlassian/salaries/product-manager/locations/india`,
          entry: { level: 'P30 Associate PM', total: 48 },
          senior: { level: 'P60 Principal PM', total: 164.5 },
        },
        {
          company: 'Adobe',
          median: 93.8,
          reports: 322,
          reportsAllLocations: true,
          updated: '2026-09-22',
          url: `${LF}companies/adobe/salaries/product-manager/locations/india`,
          entry: { level: 'L2', total: 26 },
          senior: { level: 'L4 Senior PM', total: 97.5 },
        },
        {
          company: 'Amazon',
          median: 82.2,
          reports: 5868,
          reportsAllLocations: true,
          updated: '2026-11-14',
          url: `${LF}companies/amazon/salaries/product-manager/locations/india`,
          entry: { level: 'PM (L5)', total: 56.9 },
          senior: { level: 'Principal PM', total: 164.8 },
        },
        {
          company: 'Freshworks',
          median: 79.2,
          reports: 49,
          updated: '2026-05-31',
          url: `${LF}companies/freshworks/salaries/product-manager`,
        },
        {
          company: 'Meesho',
          median: 66.0,
          reports: 39,
          updated: '2026-10-28',
          url: `${LF}companies/meesho/salaries/product-manager`,
          entry: { level: 'PM I', total: 34 },
          senior: { level: 'Senior PM', total: 91.7 },
        },
        {
          company: 'InMobi',
          median: 60.0,
          reports: 42,
          updated: '2026-06-17',
          url: `${LF}companies/inmobi/salaries/product-manager`,
          entry: { level: 'PM I', total: 36.5 },
          senior: { level: 'PM III', total: 66.1 },
        },
        {
          company: 'Razorpay',
          median: 57.4,
          reports: 34,
          updated: '2025-12-20',
          url: `${LF}companies/razorpay/salaries/product-manager`,
          entry: { level: 'Product Manager', total: 50.8 },
          senior: { level: 'Senior PM', total: 67 },
        },
        {
          company: 'Swiggy',
          median: 56.2,
          reports: 28,
          updated: '2025-11-14',
          url: `${LF}companies/swiggy/salaries/product-manager`,
          entry: { level: 'L6 PM I', total: 42.1 },
          senior: { level: 'L8 PM III', total: 73.6 },
        },
        {
          company: 'Myntra',
          median: 55.9,
          reports: 18,
          updated: '2025-10-14',
          url: `${LF}companies/myntra/salaries/product-manager`,
          entry: { level: 'Product Manager', total: 46.5 },
          senior: { level: 'Senior PM', total: 63.5 },
        },
        {
          company: 'Media.net',
          median: 54.5,
          reports: 19,
          updated: '2026-09-15',
          url: `${LF}companies/medianet/salaries/product-manager`,
          entry: { level: 'PM 1', total: 49 },
          senior: { level: 'Senior PM', total: 66.2 },
        },
        {
          company: 'Flipkart',
          median: 54.2,
          reports: 151,
          updated: '2026-10-29',
          url: `${LF}companies/flipkart/salaries/product-manager/locations/india`,
          entry: { level: 'APM I', total: 21.4 },
          senior: { level: 'PM II', total: 60.4 },
        },
        {
          company: 'PhonePe',
          median: 52.4,
          reports: 23,
          updated: '2026-04-17',
          url: `${LF}companies/phonepe/salaries/product-manager`,
          entry: { level: 'PM 1', total: 44.2 },
          senior: { level: 'Senior PM', total: 68.5 },
        },
        {
          company: 'Dream11',
          median: 52.0,
          reports: 15,
          updated: '2025-09-14',
          url: `${LF}companies/dream11/salaries/product-manager`,
        },
        {
          company: 'Oracle',
          median: 51.6,
          reports: 471,
          reportsAllLocations: true,
          updated: '2026-11-06',
          url: `${LF}companies/oracle/salaries/product-manager/locations/india`,
          entry: { level: 'IC-2', total: 32.9 },
          senior: { level: 'IC-4 Principal PM', total: 58.2 },
        },
        {
          company: 'ShareChat',
          median: 49.7,
          reports: 30,
          updated: '2025-11-01',
          url: `${LF}companies/sharechat/salaries/product-manager`,
          entry: { level: 'PM I', total: 26.5 },
          senior: { level: 'Senior PM', total: 87.5 },
        },
        {
          company: 'BrowserStack',
          median: 46.2,
          reports: 38,
          updated: '2026-10-07',
          url: `${LF}companies/browserstack/salaries/product-manager`,
          entry: { level: 'L1 PM', total: 39 },
          senior: { level: 'L3 Lead PM', total: 86.7 },
        },
        {
          company: 'CRED',
          median: 45.1,
          reports: 22,
          updated: '2026-11-14',
          url: `${LF}companies/cred/salaries/product-manager`,
        },
        {
          company: 'Zomato (Eternal)',
          median: 44.7,
          reports: 18,
          updated: '2026-11-08',
          url: `${LF}companies/zomato/salaries/product-manager`,
        },
        {
          company: 'Ola',
          median: 44.0,
          reports: 22,
          updated: '2026-11-14',
          url: `${LF}companies/ola/salaries/product-manager`,
        },
        {
          company: 'Zepto',
          median: 41.1,
          reports: 15,
          updated: '2026-11-14',
          url: `${LF}companies/zepto/salaries/product-manager`,
        },
        {
          company: 'Nykaa',
          median: 40.7,
          reports: 12,
          updated: '2026-11-14',
          url: `${LF}companies/nykaa/salaries/product-manager`,
        },
        {
          company: 'Paytm',
          median: 38.3,
          reports: 96,
          updated: '2026-06-18',
          url: `${LF}companies/paytm/salaries/product-manager`,
          entry: { level: 'Product Manager', total: 35.9 },
          senior: { level: 'Senior PM', total: 46.1 },
        },
        {
          company: 'Groww',
          median: 34.4,
          reports: 12,
          updated: '2025-10-27',
          url: `${LF}companies/groww/salaries/product-manager`,
          entry: { level: 'PM I', total: 30 },
          senior: { level: 'PM III', total: 52.3 },
        },
        {
          company: 'MakeMyTrip',
          median: 31.7,
          reports: 21,
          updated: '2026-11-10',
          url: `${LF}companies/makemytrip/salaries/product-manager`,
        },
        {
          company: 'Juspay',
          median: 29.5,
          reports: 22,
          updated: '2026-11-14',
          url: `${LF}companies/juspay/salaries/product-manager`,
        },
        {
          company: 'Zoho',
          median: 16.8,
          reports: 19,
          updated: '2026-01-29',
          url: `${LF}companies/zoho/salaries/product-manager`,
          entry: { level: 'L1', total: 13.9 },
          senior: { level: 'L3', total: 27 },
        },
      ],
    },
    us: {
      role: {
        median: 234,
        p25: 170,
        p75: 335,
        p90: 455,
        n: 4884,
        updated: '2026-11-13',
        url: `${LF}t/product-manager/locations/united-states`,
      },
      ladder: [
        'Google',
        'Meta',
        'Amazon',
        'Apple',
        'LinkedIn',
        'Uber',
        'Salesforce',
        'Intuit',
        'Stripe',
        'Databricks',
        'Coinbase',
        'Nvidia',
      ],
      rows: [
        {
          company: 'Airbnb',
          median: 655,
          reports: 65,
          updated: '2026-09-24',
          url: `${LF}companies/airbnb/salaries/product-manager/locations/united-states`,
          entry: { level: 'L4', total: 291.5 },
          senior: { level: 'L6', total: 584.2 },
        },
        {
          company: 'Netflix',
          median: 600,
          reports: 63,
          updated: '2026-10-20',
          url: `${LF}companies/netflix/salaries/product-manager/locations/united-states`,
          entry: { level: 'Product Manager', total: 317 },
          senior: { level: 'Lead PM', total: 693 },
        },
        {
          company: 'Meta',
          median: 540,
          reports: 1138,
          updated: '2026-10-29',
          url: `${LF}companies/meta/salaries/product-manager/locations/united-states`,
          entry: { level: 'RPM (L3)', total: 174 },
          senior: { level: 'L6', total: 570 },
        },
        {
          company: 'Google',
          median: 525.4,
          reports: 1827,
          reportsAllLocations: true,
          updated: '2026-11-08',
          url: `${LF}companies/google/salaries/product-manager/locations/united-states`,
          entry: { level: 'APM1', total: 229 },
          senior: { level: 'PM2 (L5)', total: 404 },
        },
        {
          company: 'Snowflake',
          median: 461.75,
          reports: 46,
          updated: '2026-10-25',
          url: `${LF}companies/snowflake-/salaries/product-manager`,
          entry: { level: 'IC2', total: 353 },
          senior: { level: 'IC4', total: 716 },
        },
        {
          company: 'Coinbase',
          median: 444,
          reports: 99,
          updated: '2026-10-12',
          url: `${LF}companies/coinbase/salaries/product-manager`,
          entry: { level: 'IC3', total: 187 },
          senior: { level: 'IC6', total: 501 },
        },
        {
          company: 'LinkedIn',
          median: 400,
          reports: 223,
          updated: '2026-10-31',
          url: `${LF}companies/linkedin/salaries/product-manager`,
          entry: { level: 'Associate PM', total: 205 },
          senior: { level: 'Principal/Group PM', total: 627 },
        },
        {
          company: 'Pinterest',
          median: 400,
          reports: 46,
          updated: '2026-09-21',
          url: `${LF}companies/pinterest/salaries/product-manager`,
          entry: { level: 'M13', total: 115 },
          senior: { level: 'M16', total: 531 },
        },
        {
          company: 'Intuit',
          median: 395,
          reports: 383,
          updated: '2026-11-12',
          url: `${LF}companies/intuit/salaries/product-manager/locations/united-states`,
          entry: { level: 'PM 1', total: 156 },
          senior: { level: 'Staff PM', total: 315 },
        },
        {
          company: 'Stripe',
          median: 393,
          reports: 114,
          updated: '2026-10-14',
          url: `${LF}companies/stripe/salaries/product-manager`,
          entry: { level: 'L2', total: 263 },
          senior: { level: 'L4', total: 557 },
        },
        {
          company: 'Databricks',
          median: 379.25,
          reports: 36,
          updated: '2026-10-14',
          url: `${LF}companies/databricks/salaries/product-manager`,
          entry: { level: 'L3', total: 256 },
          senior: { level: 'L6', total: 638 },
        },
        {
          company: 'DoorDash',
          median: 360,
          reports: 80,
          updated: '2026-09-29',
          url: `${LF}companies/doordash/salaries/product-manager`,
          entry: { level: 'E4', total: 296 },
          senior: { level: 'E6', total: 600 },
        },
        {
          company: 'Nvidia',
          median: 355,
          reports: 106,
          updated: '2026-10-21',
          url: `${LF}companies/nvidia/salaries/product-manager/locations/united-states`,
          entry: { level: 'IC1', total: 127 },
          senior: { level: 'IC4', total: 330 },
        },
        {
          company: 'Uber',
          median: 350,
          reports: 482,
          updated: '2026-11-01',
          url: `${LF}companies/uber/salaries/product-manager/locations/united-states`,
          entry: { level: 'Associate PM', total: 161 },
          senior: { level: 'Senior PM (L5a)', total: 373 },
        },
        {
          company: 'Walmart',
          median: 328,
          reports: 939,
          updated: '2026-10-02',
          url: `${LF}companies/walmart/salaries/product-manager`,
          entry: { level: 'P1', total: 105 },
          senior: { level: 'P4', total: 234 },
        },
        {
          company: 'Shopify',
          median: 321,
          reports: 123,
          updated: '2026-06-18',
          url: `${LF}companies/shopify/salaries/product-manager/locations/united-states`,
          entry: { level: 'L4', total: 118 },
          senior: { level: 'L7', total: 388 },
        },
        {
          company: 'PayPal',
          median: 315,
          reports: 414,
          updated: '2026-10-30',
          url: `${LF}companies/paypal/salaries/product-manager`,
          entry: { level: 'T22', total: 144 },
          senior: { level: 'T25', total: 239 },
        },
        {
          company: 'Oracle',
          median: 310,
          reports: 471,
          reportsAllLocations: true,
          updated: '2026-10-21',
          url: `${LF}companies/oracle/salaries/product-manager`,
          entry: { level: 'IC-1', total: 174 },
          senior: { level: 'IC-4', total: 275 },
        },
        {
          company: 'Amazon',
          median: 307.5,
          reports: 5863,
          reportsAllLocations: true,
          updated: '2026-11-10',
          url: `${LF}companies/amazon/salaries/product-manager/locations/united-states`,
          entry: { level: 'PM (L5)', total: 198 },
          senior: { level: 'Principal PM (L7)', total: 514 },
        },
        {
          company: 'Apple',
          median: 305,
          reports: 283,
          updated: '2026-11-03',
          url: `${LF}companies/apple/salaries/product-manager`,
          entry: { level: 'ICT2', total: 185 },
          senior: { level: 'ICT5', total: 409 },
        },
        {
          company: 'Adobe',
          median: 293.9,
          reports: 322,
          reportsAllLocations: true,
          updated: '2026-10-15',
          url: `${LF}companies/adobe/salaries/product-manager`,
          entry: { level: 'L1', total: 168 },
          senior: { level: 'L4', total: 270 },
        },
        {
          company: 'Salesforce',
          median: 290,
          reports: 619,
          updated: '2026-11-10',
          url: `${LF}companies/salesforce/salaries/product-manager/locations/united-states`,
          entry: { level: 'Associate PM', total: 183 },
          senior: { level: 'Senior PM (L8)', total: 289 },
        },
        {
          company: 'Microsoft',
          median: 287,
          reports: 3203,
          updated: '2026-11-05',
          url: `${LF}companies/microsoft/salaries/product-manager`,
          entry: { level: '59 (PM 1)', total: 169 },
          senior: { level: '62 (PM 2)', total: 204 },
        },
        {
          company: 'ServiceNow',
          median: 268.5,
          reports: 258,
          updated: '2026-10-28',
          url: `${LF}companies/servicenow/salaries/product-manager`,
          entry: { level: 'IC1', total: 127 },
          senior: { level: 'IC4', total: 281 },
        },
        {
          company: 'Cisco',
          median: 252,
          reports: 479,
          updated: '2026-10-17',
          url: `${LF}companies/cisco/salaries/product-manager`,
          entry: { level: 'Grade 4', total: 126 },
          senior: { level: 'Grade 10', total: 234 },
        },
        {
          company: 'Capital One',
          median: 200,
          reports: 912,
          updated: '2026-11-02',
          url: `${LF}companies/capital-one/salaries/product-manager/locations/united-states`,
          entry: { level: 'Associate', total: 106 },
          senior: { level: 'Manager', total: 191 },
        },
        {
          company: 'Visa',
          median: 189,
          reports: 329,
          updated: '2026-10-01',
          url: `${LF}companies/visa/salaries/product-manager/locations/united-states`,
          entry: { level: 'PM (L4)', total: 170 },
          senior: { level: 'Principal PM (L6)', total: 204 },
        },
        {
          company: 'JPMorgan Chase',
          median: 185.5,
          reports: 802,
          updated: '2026-11-09',
          url: `${LF}companies/jpmorgan-chase/salaries/product-manager`,
          entry: { level: 'Analyst (502)', total: 92.3 },
          senior: { level: 'Senior Associate (602)', total: 135 },
        },
      ],
    },
  },
```
