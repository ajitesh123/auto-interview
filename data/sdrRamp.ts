/**
 * SDR ramp time: one engine for the calculator, the worked table, the figures and the FAQ.
 * No AI, no network: pure functions over the inputs.
 *
 * Benchmarks were read on the publishers' own pages on 28 Nov 2026 (The Bridge Group SDR 2025 and
 * AE 2026 pages, the Salesforce State of Sales 2026 PDF, QuotaPath's ramp survey, GitLab's public
 * SDR handbook). Year-one employer cost presets reuse the AI SDR vs human SDR engine so both posts
 * show the same numbers.
 */
import { PRESETS as SDR_PRESETS, compute as sdrCost, money, type Currency } from './aiSdrVsHuman'

export { money }
export type { Currency }

export const CHECKED = '28 Nov 2026'
export const SLUG = 'sales-onboarding-training-cut-sdr-ramp-time-ai-roleplay-2026'
export const TTAI_URL = `https://www.toughtongueai.com/?utm_source=autointerviewai&utm_medium=blog&utm_campaign=${SLUG}`

export const SOURCES = {
  bridgeRamp: {
    label: 'The Bridge Group, SDR tenure and ramp time (2025 report, 351 companies, Feb 2025)',
    url: 'https://bridgegroupinc.com/research/sdr-tenure-and-ramp-time',
  },
  bridgeSdr: {
    label: 'The Bridge Group, 2025 SDR Models & Metrics (351 companies, survey 2024–25)',
    url: 'https://www.bridgegroupinc.com/research/2025-sdr-models-metrics-report-the-bridge-group',
  },
  bridgeAe: {
    label: 'The Bridge Group, 2026 AE Models, Motions & Metrics (158 companies, 22 Jun 2026)',
    url: 'https://www.bridgegroupinc.com/research/2026-ae-models-motions-metrics',
  },
  salesforcePdf: {
    label: 'Salesforce, State of Sales, 7th edition (4,050 sales pros, survey Aug–Sep 2025)',
    url: 'https://www.salesforce.com/en-us/wp-content/uploads/sites/4/documents/reports/sales/salesforce-state-of-sales-report-2026.pdf',
  },
  salesforceNews: {
    label: 'Salesforce News, State of Sales 2026 announcement (3 Feb 2026)',
    url: 'https://www.salesforce.com/news/stories/state-of-sales-report-announcement-2026/',
  },
  quotapath: {
    label: 'QuotaPath, ramping comp plans survey (114 revenue leaders, Apr 2025)',
    url: 'https://www.quotapath.com/blog/sales-ramping-comp-plans/',
  },
  gitlab: {
    label: 'GitLab Handbook, SDR onboarding and ramp quota (public)',
    url: 'https://handbook.gitlab.com/handbook/marketing/sales-development/sdr-playbook-onboarding/',
  },
  saastrSdr: {
    label: 'SaaStr, How long do you have as an SDR if you aren’t hitting quota? (13 Aug 2023)',
    url: 'https://www.saastr.com/how-long-do-you-have-as-an-sdr-bdr-if-you-arent-hitting-your-quota',
  },
  saastrAe: {
    label: 'SaaStr, How long should new account execs get to make quota? (1 Oct 2025)',
    url: 'https://www.saastr.com/dear-saastr-how-long-should-new-account-execs-get-to-make-quota',
  },
  forrester: {
    label: 'Forrester, How quickly should a sales rep be onboarded? (14 May 2024)',
    url: 'https://www.forrester.com/blogs/how-quickly-should-a-sales-rep-be-onboarded',
  },
  salesfuel: {
    label:
      'Sales & Marketing Management / SalesFuel, the true cost of a bad sales hire (12 Jun 2026)',
    url: 'https://salesandmarketing.com/new-research-the-true-cost-of-a-bad-sales-hire/',
  },
  payscaleIn: {
    label: 'PayScale, SDR salary in India (71 profiles, updated 28 May 2026)',
    url: 'https://www.payscale.com/research/IN/Job=Sales_Development_Representative_(SDR)/Salary',
  },
  repvueIn: {
    label: 'RepVue, SDR salaries in India',
    url: 'https://repvue.com/salaries/sales-development-representative/IN',
  },
  repvueUk: {
    label: 'RepVue, SDR salaries in the UK',
    url: 'https://repvue.com/salaries/sales-development-representative/GB',
  },
  aiSdrPost: {
    label: 'Our AI SDR vs human SDR cost model (BLS benefits, gov.uk NIC and pension)',
    url: '/blog/ai-sdr-vs-human-sdr-cost-performance-comparison-2026',
  },
} as const

/** Headline benchmark facts, as printed on the source pages. */
export const FACTS = {
  sdrRamp: 3.0,
  sdrRampPeak: 3.8, // 2014, same Bridge Group page
  sdrTenureYears: 1.9,
  sdrAtQuota: 60,
  sdrAttrition: 40,
  sdrQuota: 10, // Stage 0 meetings held, global median
  sdrOte: 80000,
  aeRamp: 6.2,
  aeAtQuota: 48,
  sfNoRoleplayPdf: 41,
  sfNoRoleplayNews: 47,
  sfNoFeedback: 46,
  sfTeamsRoleplay: 26,
  sfCoach: 75,
  quotapathAvgRamp: 6,
  forresterDayOne: 7,
  badHireCost: 177171,
  badHireExtraMonths: 5.5,
}

/**
 * Every ramp number we found quoted on ranking pages, traced to its origin.
 * verdict: 'primary' = read on the publisher's own page; 'secondhand' = only seen quoted by others;
 * 'mislabelled' = real figure attached to the wrong role; 'simulated' = the source says it is not survey data.
 */
export type Trace = {
  figure: string
  measures: string
  origin: string
  date: string
  verdict: 'primary' | 'secondhand' | 'mislabelled' | 'simulated'
  note: string
  url?: string
}

export const TRACES: Trace[] = [
  {
    figure: '3.0 months',
    measures: 'Average SDR ramp',
    origin: 'The Bridge Group, 351 B2B companies',
    date: 'Feb 2025',
    verdict: 'primary',
    note: '“Lowest since 2010”, down from “a peak of 3.8 months in 2014”. The report does not define when ramp ends.',
    url: SOURCES.bridgeRamp.url,
  },
  {
    figure: '6.2 months',
    measures: 'Average AE ramp',
    origin: 'The Bridge Group, 158 B2B companies',
    date: 'Jun 2026',
    verdict: 'primary',
    note: '“Highest in study history”. AEs, not SDRs.',
    url: SOURCES.bridgeAe.url,
  },
  {
    figure: '6 months',
    measures: 'Most common ramp period (all sales roles)',
    origin: 'QuotaPath survey of 114 revenue leaders',
    date: 'Apr 2025',
    verdict: 'primary',
    note: 'A comp-plan survey; the page does not say which roles. Its 25/50/75/100% schedule is given as an example.',
    url: SOURCES.quotapath.url,
  },
  {
    figure: '3.2 months',
    measures: 'SDR ramp',
    origin: 'The Bridge Group 2018 SDR report; also credited to “HubSpot”',
    date: '2018',
    verdict: 'secondhand',
    note: 'Seven years old. We could not find the HubSpot original that Xactly cites.',
  },
  {
    figure: '5.7 months',
    measures: 'Quoted as “SaaS SDR ramp”',
    origin: 'Bridge Group AE figures (4.3 in 2020, 5.7 in 2024)',
    date: '2024',
    verdict: 'mislabelled',
    note: 'These are account-executive numbers. At least one vendor page quotes them as SDR ramp.',
  },
  {
    figure: '3.2 months; 2.4–6.1 by deal size',
    measures: '“SDR Performance Index”',
    origin: 'A vendor benchmark PDF',
    date: 'Undated',
    verdict: 'simulated',
    note: 'Its own source line says “simulated composite benchmark data”. Not survey data.',
  },
  {
    figure: '381 days; 11.2 months',
    measures: '“Time to full productivity”',
    origin: 'Training Industry; Sales Management Association',
    date: 'Undated',
    verdict: 'secondhand',
    note: 'Widely repeated; we could not open an original study for either.',
  },
]

/** Ramp curves. Each returns the share of full quota (0–1) for month i (1-based) of an n-month ramp. */
export type CurveId = 'even' | 'slow'
export const CURVES: Record<
  CurveId,
  { label: string; explain: string; at: (i: number, n: number) => number }
> = {
  even: {
    label: 'Even steps',
    explain:
      'Month i of an n-month ramp expects i ÷ (n + 1) of full quota. For 3 months that is 25%, 50%, 75%: GitLab’s published SDR schedule.',
    at: (i, n) => i / (n + 1),
  },
  slow: {
    label: 'Nothing in month 1',
    explain:
      'Month 1 expects 0 (training only), then even steps: month i expects (i − 1) ÷ n. For 3 months that is 0%, 33%, 67%.',
    at: (i, n) => (i - 1) / n,
  },
}

export type Inputs = {
  currency: Currency
  /** employer cost of one SDR for a year (pay + employer costs) */
  annualCost: number
  /** full monthly quota in held meetings */
  quota: number
  rampMonths: number
  curve: CurveId
  /** average tenure in months (for the 'share of tenure lost' line) */
  tenureMonths: number
  /** optional: pipeline value of one held meeting, in the same currency; 0 = skip */
  meetingValue: number
}

export const PRESETS: Record<Currency, { label: string; note: string; inputs: Inputs }> = (() => {
  const mk = (
    c: Currency,
    label: string,
    note: string
  ): { label: string; note: string; inputs: Inputs } => ({
    label,
    note,
    inputs: {
      currency: c,
      annualCost: Math.round(sdrCost(SDR_PRESETS[c].inputs).humanCost),
      quota: FACTS.sdrQuota,
      rampMonths: 3,
      curve: 'even',
      tenureMonths: Math.round(FACTS.sdrTenureYears * 12 * 10) / 10,
      meetingValue: 0,
    },
  })
  return {
    USD: mk(
      'USD',
      'US SDR',
      'Median OTE $80K (Bridge Group 2025) plus employer benefits at 30% of total pay (BLS)'
    ),
    GBP: mk(
      'GBP',
      'UK SDR',
      'RepVue median OTE £56,399 plus employer NIC and the pension minimum (gov.uk)'
    ),
    INR: mk(
      'INR',
      'India SDR',
      'RepVue median OTE ₹18,15,709 (skews to tech/SaaS); add your PF and benefits'
    ),
  }
})()

export const WORKED: Inputs = PRESETS.USD.inputs

export type MonthRow = {
  month: number
  share: number
  target: number
  lostMeetings: number
  uncovered: number
}

const clamp = (v: number, lo: number, hi: number) =>
  Number.isFinite(v) ? Math.min(hi, Math.max(lo, v)) : lo

export function compute(raw: Inputs) {
  const i: Inputs = {
    ...raw,
    annualCost: clamp(raw.annualCost, 0, 1e12),
    quota: clamp(raw.quota, 0, 10000),
    rampMonths: Math.round(clamp(raw.rampMonths, 0, 12)),
    tenureMonths: clamp(raw.tenureMonths, 0, 600),
    meetingValue: clamp(raw.meetingValue, 0, 1e12),
  }
  const monthly = i.annualCost / 12
  const curve = CURVES[i.curve] ?? CURVES.even
  const rows: MonthRow[] = []
  for (let m = 1; m <= i.rampMonths; m++) {
    const share = curve.at(m, i.rampMonths)
    rows.push({
      month: m,
      share,
      target: i.quota * share,
      lostMeetings: i.quota * (1 - share),
      uncovered: monthly * (1 - share),
    })
  }
  /** months of full output lost while ramping */
  const lostMonths = rows.reduce((s, r) => s + (1 - r.share), 0)
  const lostMeetings = i.quota * lostMonths
  const rampCost = monthly * lostMonths
  const pipelineLost = i.meetingValue > 0 ? lostMeetings * i.meetingValue : null
  /** year one, assuming the SDR stays 12 months */
  const yearMeetings = i.quota * (12 - Math.min(12, lostMonths))
  const perMeetingYear = yearMeetings > 0 ? i.annualCost / yearMeetings : null
  const perMeetingRamped = i.quota > 0 ? i.annualCost / (i.quota * 12) : null
  /** share of an average stay spent not producing because of ramp */
  const tenureShare = i.tenureMonths > 0 ? Math.min(1, lostMonths / i.tenureMonths) : null
  /** what one month shorter ramp is worth, same curve */
  let oneFaster: { cost: number; meetings: number } | null = null
  if (i.rampMonths >= 1) {
    const shorter = compute({ ...i, rampMonths: i.rampMonths - 1 })
    oneFaster = { cost: rampCost - shorter.rampCost, meetings: lostMeetings - shorter.lostMeetings }
  }
  return {
    inputs: i,
    monthly,
    rows,
    lostMonths,
    lostMeetings,
    rampCost,
    pipelineLost,
    yearMeetings,
    perMeetingYear,
    perMeetingRamped,
    tenureShare,
    oneFaster,
  }
}

export const pct = (x: number) => `${Math.round(x * 100)}%`
export const n1 = (x: number) => (Math.round(x * 10) / 10).toLocaleString('en-US')
