/**
 * AI SDR vs human SDR: one engine for the calculator, the worked table, the charts and the FAQ.
 * No AI, no network: pure functions over the inputs.
 *
 * Every vendor price below was read on the vendor's own pricing page on 26 Nov 2026 and
 * re-checked word for word the same day. Human-side numbers come from The Bridge Group 2025
 * SDR report, RepVue salary pages, the US BLS ECEC release (Sep 2026) and gov.uk rates pages.
 */

export const CHECKED = '26 Nov 2026'
export const SLUG = 'ai-sdr-vs-human-sdr-cost-performance-comparison-2026'
export const TTAI_URL =
  'https://www.toughtongueai.com/?utm_source=autointerviewai&utm_medium=blog&utm_campaign=ai-sdr-vs-human-sdr'

export const SOURCES = {
  bridge: {
    label: 'The Bridge Group, 2025 SDR Models & Metrics (351 companies, Feb 2025)',
    url: 'https://www.bridgegroupinc.com/research/2025-sdr-models-metrics-report-the-bridge-group',
  },
  bridgeRamp: {
    label: 'The Bridge Group, SDR tenure and ramp time (Feb 2025)',
    url: 'https://bridgegroupinc.com/research/sdr-tenure-and-ramp-time',
  },
  bls: {
    label: 'US BLS, Employer Costs for Employee Compensation, June 2026 (released 9 Sep 2026)',
    url: 'https://www.bls.gov/news.release/ecec.nr0.htm',
  },
  repvueUK: {
    label: 'RepVue, SDR salaries in the UK',
    url: 'https://repvue.com/salaries/sales-development-representative/GB',
  },
  repvueIN: {
    label: 'RepVue, SDR salaries in India',
    url: 'https://repvue.com/salaries/sales-development-representative/IN',
  },
  ukNic: {
    label: 'gov.uk, Rates and thresholds for employers 2026 to 2027',
    url: 'https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027',
  },
  ukPension: {
    label: 'gov.uk, Workplace pensions: what you, your employer and the government pay',
    url: 'https://www.gov.uk/workplace-pensions/what-you-your-employer-and-the-government-pay',
  },
  epfCeiling: {
    label: 'SCC Online, ₹25,000 EPF wage ceiling notified (17 Sep 2026)',
    url: 'https://www.scconline.com/blog/post/2026/09/19/labour-ministry-notifies-25000-wage-ceiling-under-social-security-code/',
  },
  fxInr: {
    label: 'RBI reference rate, 25 Nov 2026 (MSEI archive)',
    url: 'https://www.msei.in/markets/currency/historical-data/rbireferenceratearchives',
  },
  fxGbp: {
    label: 'Bank of England spot rate, 25 Nov 2026',
    url: 'https://www.bankofengland.co.uk/boeapps/database/Rates.asp?into=GBP',
  },
  gong: {
    label: 'Gong Labs, insights from 300M cold calls',
    url: 'https://www.gong.io/resources/labs/the-hidden-power-of-cold-calling-insights-from-300m-calls/',
  },
  saastr: {
    label: 'SaaStr, 6 months of AI SDRs: what’s worked',
    url: 'https://www.saastr.com/6-months-of-ai-sdrs-whats-worked',
  },
  techcrunch11x: {
    label: 'TechCrunch, 11x has been claiming customers it doesn’t have (24 Mar 2025)',
    url: 'https://techcrunch.com/2025/03/24/a16z-and-benchmark-backed-11x-has-been-claiming-customers-it-doesnt-have',
  },
  gartner: {
    label: 'Gartner press release, 18 Nov 2025',
    url: 'https://www.gartner.com/en/newsroom/press-releases/2025-11-18-gartner-predicts-by-2028-ai-agents-will-outnumber-sellers-by-10x-yet-fewer-than-40-percent-of-sellers-will-report-ai-agents-improved-productivity',
  },
  salesforce2026: {
    label: 'Salesforce, State of Sales 2026 announcement (3 Feb 2026)',
    url: 'https://www.salesforce.com/news/stories/state-of-sales-report-announcement-2026/',
  },
} as const

export type Currency = 'USD' | 'GBP' | 'INR'
const SYM: Record<Currency, string> = { USD: '$', GBP: '£', INR: '₹' }

export function money(n: number, c: Currency): string {
  const v = Math.round(n)
  const sign = v < 0 ? '−' : ''
  const s = Math.abs(v).toLocaleString(c === 'INR' ? 'en-IN' : 'en-US')
  return `${sign}${SYM[c]}${s}`
}

/** USD list price per month for N new contacts a month; null = not published at that volume. */
export type Plan = {
  id: string
  name: string
  kind: 'agent' | 'platform'
  channels: string
  books: string
  priceAsWritten: string
  term: string
  /** monthly USD for `contacts` new contacts a month, or null if no published price fits */
  monthly: (contacts: number) => number | null
  /** what the computed figure leaves out */
  excludes?: string
  url: string
}

export const PLANS: Plan[] = [
  {
    id: 'aisdr',
    name: 'AiSDR (pay as you go)',
    kind: 'agent',
    channels: 'Email, LinkedIn, call steps via Aircall',
    books: 'Not stated as booking itself',
    priceAsWritten: '“$1.50 / person prospected”',
    term: '“Charged daily · Stop anytime”',
    monthly: (n) => 1.5 * n,
    url: 'https://aisdr.com/pricing',
  },
  {
    id: '11x',
    name: '11x Outbound (Growth)',
    kind: 'agent',
    channels: 'Email, social',
    books: 'Yes (“meeting booking”)',
    priceAsWritten: '“Starting at $36,000 / yr”, up to 2,000 new prospects a month',
    term: 'Billed annually; Pro and Enterprise custom',
    monthly: (n) => (n <= 2000 ? 3000 : null),
    url: 'https://11x.ai/products/alice/pricing',
  },
  {
    id: 'reply',
    name: 'Reply.io Jason AI SDR',
    kind: 'agent',
    channels: 'Email, LinkedIn',
    books: 'Not stated on pricing page',
    priceAsWritten:
      '“Starts from $500 /month (Billed annually)”, 1,000 active contacts; Growth from $1,500 (5,000)',
    term: 'Annual; monthly from $800',
    monthly: (n) => (n <= 1000 ? 500 : n <= 5000 ? 1500 : null),
    url: 'https://reply.io/jason-ai-pricing.txt',
  },
  {
    id: 'salesforge',
    name: 'Salesforge Agent Frank',
    kind: 'agent',
    channels: 'Email, LinkedIn',
    books: 'Yes, in Auto-Pilot',
    priceAsWritten: '“$499 / Month”; “2,000+ Contacts/Mo = $0.25 Per Contact”',
    term: 'Billed quarterly or annually',
    monthly: (n) => Math.max(499, 0.25 * n),
    url: 'https://www.salesforge.ai/pricing',
  },
  {
    id: 'hubspot',
    name: 'HubSpot Prospecting Agent',
    kind: 'agent',
    channels: 'Email',
    books: 'Not stated',
    priceAsWritten: '“$1/per lead” the agent recommends for outreach',
    term: 'Monthly credits; needs a HubSpot subscription',
    monthly: (n) => 1 * n,
    excludes: 'HubSpot seats and plan (not priced here)',
    url: 'https://hubspot.com/products/sales/ai-prospecting-agent',
  },
  {
    id: 'valley',
    name: 'Valley (1 seat)',
    kind: 'agent',
    channels: 'LinkedIn, email',
    books: 'Done-for-you plan: yes ($1,499/mo)',
    priceAsWritten: '“$500 a month for your first seat and $200 for each seat after that”',
    term: 'Monthly',
    monthly: () => 500,
    excludes: '1,000 credits a seat; how many contacts a credit covers is not stated',
    url: 'https://joinvalley.co/pricing',
  },
]

/** Listed for completeness: no price we can compute from their own pages. */
export const QUOTE_ONLY: { name: string; note: string; url: string }[] = [
  {
    name: 'Artisan (Ava)',
    note: 'Every plan says “Talk to sales”',
    url: 'https://www.artisan.co/pricing',
  },
  {
    name: 'Salesforce Agentforce SDR',
    note: '“$2 USD/Per conversation” or Flex Credits at $0.10 an action; needs Sales Cloud',
    url: 'https://salesforce.com/agentforce/pricing',
  },
  {
    name: 'Qualified Piper',
    note: 'Inbound / website SDR; “Contact us” on every plan',
    url: 'https://qualified.com/pricing',
  },
  {
    name: 'Relevance AI BDR agent',
    note: '“available via our sales team”',
    url: 'https://relevanceai.com/pricing',
  },
  {
    name: 'Outreach AI agents',
    note: '“Request pricing” on every plan; per user',
    url: 'https://outreach.ai/pricing',
  },
]

export type Inputs = {
  currency: Currency
  /** local currency per 1 USD; 1 for USD */
  fx: number
  // human SDR
  base: number
  variable: number
  /** % of target variable actually paid */
  payout: number
  /** employer costs on top of pay, % of pay */
  loadPct: number
  /** employer costs on top of pay, fixed per year (can be negative for allowances) */
  loadFixed: number
  toolsMonthly: number
  managerCost: number
  sdrsPerManager: number
  rampMonths: number
  meetingsPerMonth: number
  // AI SDR
  plan: string
  contacts: number
  aiExtraMonthly: number
  oversightHours: number
  /** cost of an oversight hour, local currency; 0 = use the human SDR's loaded hourly cost */
  oversightRate: number
  meetingsPer100: number
}

/** Employer cost rules per country, so a changed salary moves the load correctly. */
export function employerLoad(i: Pick<Inputs, 'currency' | 'base' | 'variable' | 'payout'>) {
  const pay = i.base + (i.variable * i.payout) / 100
  if (i.currency === 'USD') return { pct: (30 / 70) * 100, fixed: 0, pay } // BLS: benefits 30.0% of total comp
  if (i.currency === 'GBP') {
    // Employer NIC 15% above £5,000; pension 3% on £6,240–£50,270 (gov.uk, 2026/27)
    const nic = 0.15 * Math.max(0, pay - 5000)
    const pension = 0.03 * Math.max(0, Math.min(pay, 50270) - 6240)
    return { pct: 0, fixed: nic + pension, pay }
  }
  return { pct: 0, fixed: 0, pay }
}

export const PRESETS: Record<Currency, { label: string; inputs: Inputs; note: string }> = {
  USD: {
    label: 'US SDR (Bridge Group medians)',
    note: 'Median OTE $80K ($55K base, $25K variable); employer benefits from BLS',
    inputs: {
      currency: 'USD',
      fx: 1,
      base: 55000,
      variable: 25000,
      payout: 100,
      loadPct: 0,
      loadFixed: 0,
      toolsMonthly: 0,
      managerCost: 0,
      sdrsPerManager: 6.4,
      rampMonths: 3,
      meetingsPerMonth: 10,
      plan: 'aisdr',
      contacts: 1000,
      aiExtraMonthly: 0,
      oversightHours: 3,
      oversightRate: 0,
      meetingsPer100: 1,
    },
  },
  GBP: {
    label: 'UK SDR (RepVue medians)',
    note: 'Median base £37,580, OTE £56,399; employer NIC and pension minimum from gov.uk',
    inputs: {
      currency: 'GBP',
      fx: Math.round((1 / 1.3062) * 10000) / 10000,
      base: 37580,
      variable: 18819,
      payout: 100,
      loadPct: 0,
      loadFixed: 0,
      toolsMonthly: 0,
      managerCost: 0,
      sdrsPerManager: 6.4,
      rampMonths: 3,
      meetingsPerMonth: 10,
      plan: 'aisdr',
      contacts: 1000,
      aiExtraMonthly: 0,
      oversightHours: 3,
      oversightRate: 0,
      meetingsPer100: 1,
    },
  },
  INR: {
    label: 'India SDR (RepVue medians)',
    note: 'Median base ₹13,17,667, OTE ₹18,15,709 (skews to tech/SaaS); add your EPF and benefits',
    inputs: {
      currency: 'INR',
      fx: 92.4895,
      base: 1317667,
      variable: 498042,
      payout: 100,
      loadPct: 0,
      loadFixed: 0,
      toolsMonthly: 0,
      managerCost: 0,
      sdrsPerManager: 6.4,
      rampMonths: 3,
      meetingsPerMonth: 10,
      plan: 'aisdr',
      contacts: 1000,
      aiExtraMonthly: 0,
      oversightHours: 3,
      oversightRate: 0,
      meetingsPer100: 1,
    },
  },
}

const r2 = (n: number) => Math.round(n * 100) / 100

export function compute(i: Inputs) {
  // ---- human, year one ----
  const law = employerLoad(i)
  const pay = law.pay
  const statutory = (pay * law.pct) / 100 + law.fixed
  const extraLoad = (pay * i.loadPct) / 100 + i.loadFixed
  const tools = i.toolsMonthly * 12
  const manager = i.sdrsPerManager > 0 ? i.managerCost / i.sdrsPerManager : 0
  const humanCost = pay + statutory + extraLoad + tools + manager
  const ramp = Math.max(0, Math.min(12, i.rampMonths))
  // linear ramp: output climbs from 0 to full over `ramp` months, so ramp/2 months of output are lost
  const productiveMonths = 12 - ramp / 2
  const humanMeetings = i.meetingsPerMonth * productiveMonths
  const humanPerMeeting = humanMeetings > 0 ? humanCost / humanMeetings : null
  const steadyMeetings = i.meetingsPerMonth * 12
  const steadyPerMeeting = steadyMeetings > 0 ? humanCost / steadyMeetings : null
  const humanHourly = humanCost / 2080

  // ---- AI SDR, year one ----
  const plan = PLANS.find((p) => p.id === i.plan) ?? PLANS[0]
  const usdMonthly = plan.monthly(Math.max(0, i.contacts))
  const licence = usdMonthly === null ? null : usdMonthly * 12 * i.fx
  const extras = i.aiExtraMonthly * 12
  const rate = i.oversightRate > 0 ? i.oversightRate : humanHourly
  const oversight = i.oversightHours * 52 * rate
  const aiCost = licence === null ? null : licence + extras + oversight
  const aiMeetings = (i.contacts * 12 * i.meetingsPer100) / 100
  const aiPerMeeting = aiCost !== null && aiMeetings > 0 ? aiCost / aiMeetings : null
  // meetings a month the AI SDR must book to match the human's year-one cost per meeting
  const breakEven = aiCost !== null && humanPerMeeting ? aiCost / humanPerMeeting / 12 : null
  const breakEvenPer100 =
    breakEven !== null && i.contacts > 0 ? (breakEven / i.contacts) * 100 : null

  return {
    pay: r2(pay),
    statutory: r2(statutory),
    extraLoad: r2(extraLoad),
    tools: r2(tools),
    manager: r2(manager),
    humanCost: r2(humanCost),
    productiveMonths,
    humanMeetings,
    humanPerMeeting,
    steadyPerMeeting,
    humanHourly,
    plan,
    licence,
    extras,
    rate,
    oversight,
    aiCost,
    aiMeetings,
    aiPerMeeting,
    breakEven,
    breakEvenPer100,
  }
}

/** The worked example printed on the page: US medians, 1,000 new contacts a month. */
export const WORKED: Inputs = PRESETS.USD.inputs

/** Every published plan at the worked volume, with break-even meetings a month. */
export function planRows(base: Inputs = WORKED) {
  return PLANS.map((p) => {
    const r = compute({ ...base, plan: p.id })
    return { plan: p, licence: r.licence, aiCost: r.aiCost, breakEven: r.breakEven }
  })
}

/** Cold-call funnel from Gong: 1,000 dials by an average and a top-quartile human caller. */
export const GONG = {
  avg: { connect: 5.4, meeting: 4.6 },
  top: { connect: 13.3, meeting: 16.7 },
}
export function gongFunnel(dials: number, f: { connect: number; meeting: number }) {
  const conversations = (dials * f.connect) / 100
  return { conversations, meetings: (conversations * f.meeting) / 100 }
}

export const FACTS = {
  ote: '$80K',
  split: '$55K base / $25K variable',
  quota: '10',
  atQuota: '60%',
  ramp: '3.0 months',
  tenure: '1.9 years',
  perManager: '6.4',
  companies: 351,
  benefits: '30.0%',
  saastrHours: '15-20 hours per week',
  gartnerShare: 'less than 40%',
}
