/**
 * Sales training ROI: one engine for the calculator, the worked table, the charts and the FAQ.
 * Method: Phillips ROI Methodology (ROI Institute) on top of the Kirkpatrick levels.
 * Every rule the engine applies is named in SOURCES and quoted on the page.
 * No AI, no network: pure functions over the inputs.
 *
 * Sources opened 25 Nov 2026 (and re-checked word for word the same day):
 * - ROI Institute Fold-Out Model, 12 guiding principles (PDF)
 * - ROI Institute methodology page (ROI and BCR formulas, isolation methods)
 * - ROI Institute evaluation targets (Level 5 ROI: 5-10% of programmes)
 * - Kirkpatrick Partners, The Kirkpatrick Model (Levels 1-4)
 * - Training magazine 2025 Training Industry Report
 * - The Bridge Group, SDR tenure and ramp time (Feb 2025)
 * - Salesforce State of Sales stats (Jul 2024)
 * - Murre & Dros 2015, PLOS ONE (forgetting curve replication)
 * - Arthur, Bennett, Edens & Bell 2003, J Appl Psychol 88(2) (training meta-analysis)
 */

export const CHECKED = '25 Nov 2026'
export const SLUG = 'ai-sales-roleplay-vs-traditional-sales-training-cost-roi-2026'
export const TTAI_URL = `https://www.toughtongueai.com/?utm_source=autointerviewai&utm_medium=blog&utm_campaign=sales-training-roi`

export const SOURCES = {
  foldout: {
    label: 'ROI Institute, ROI Methodology fold-out (12 guiding principles)',
    url: 'https://roiinstitute.net/wp-content/uploads/2019/04/Fold-Out-Model.pdf',
  },
  method: {
    label: 'ROI Institute, ROI Methodology',
    url: 'https://roiinstitute.net/?p=14250',
  },
  targets: {
    label: 'ROI Institute, setting your measurement and evaluation goal',
    url: 'https://roiinstitute.net/roi-repository-for-human-capital-tools-and-templates/setting-your-measurement-and-evaluation-goal-2/',
  },
  kirkpatrick: {
    label: 'Kirkpatrick Partners, The Kirkpatrick Model',
    url: 'https://www.kirkpatrickpartners.com/the-kirkpatrick-model/',
  },
  trainingMag: {
    label: 'Training magazine, 2025 Training Industry Report',
    url: 'https://trainingmag.com/2025-training-industry-report',
  },
  bridge: {
    label: 'The Bridge Group, SDR tenure and ramp time (Feb 2025)',
    url: 'https://bridgegroupinc.com/research/sdr-tenure-and-ramp-time',
  },
  salesforce: {
    label: 'Salesforce, State of Sales statistics (Jul 2024)',
    url: 'https://salesforce.com/news/stories/sales-ai-statistics-2024',
  },
  murre: {
    label: 'Murre & Dros (2015), PLOS ONE',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4492928',
  },
  arthur: {
    label: 'Arthur, Bennett, Edens & Bell (2003), Journal of Applied Psychology',
    url: 'https://www.psychologie.uni-mannheim.de/cip/tut/seminare_wittmann/meta_fribourg/Arthur_etal_2003_MA_Trainings_in_organisations.pdf',
  },
  atd2014: {
    label: 'ATD blog, Five ways to improve the ROI of your sales training (Mar 2014)',
    url: 'https://www.td.org/content/atd-blog/five-ways-to-improve-the-roi-of-your-sales-training-program',
  },
} as const

export type SourceId = keyof typeof SOURCES

/** The Phillips principles the calculator applies, quoted from the fold-out. */
export const PRINCIPLES: { n: number; quote: string; how: string }[] = [
  {
    n: 4,
    quote: 'When analyzing data, select the most conservative alternative for calculations.',
    how: 'Benefits use gross margin, not revenue; with no control group, only the share of the lift you can defend counts.',
  },
  {
    n: 5,
    quote: 'Use at least one method to isolate the effects of a project.',
    how: 'The calculator subtracts the control group’s change from the trained group’s change.',
  },
  {
    n: 7,
    quote: 'Adjust estimates of improvement for potential errors of estimation.',
    how: 'No control group? You enter how much of the lift you can attribute to training, and the rest is dropped.',
  },
  {
    n: 9,
    quote: 'Use only the first year of annual benefits in ROI analysis of short-term solutions.',
    how: 'Benefits are counted for 12 months only.',
  },
  {
    n: 10,
    quote: 'Fully load all costs of a solution, project, or program when analyzing ROI.',
    how: 'Costs include rep time away from selling, manager time, design and evaluation, not only the trainer’s invoice.',
  },
]

/** Kirkpatrick levels 1-4 (verbatim) plus Phillips Level 5, with what a sales team measures. */
export const LEVELS: {
  level: string
  name: string
  quote?: string
  sales: string
  src: SourceId
}[] = [
  {
    level: '1',
    name: 'Reaction',
    quote:
      'Level 1: Reaction measures the degree to which the target audience finds an experience or initiative favorable, engaging, relevant, and supportive of the work needed to achieve the targeted outcomes.',
    sales:
      'A two-question survey after each session: was it relevant to your deals, will you use it this week?',
    src: 'kirkpatrick',
  },
  {
    level: '2',
    name: 'Learning',
    quote:
      'Level 2: Learning measures the degree to which the target audience acquires the intended knowledge, skills, attitude, confidence, and commitment necessary to achieve the targeted outcomes.',
    sales: 'A scored roleplay before and after: the same buyer, objection and rubric.',
    src: 'kirkpatrick',
  },
  {
    level: '3',
    name: 'Behavior',
    quote:
      'Level 3: Behavior measures the degree to which the target audience performs the critical behaviors in its environment and is supported in and accountable for its performance.',
    sales: 'Score 5 recorded live calls per rep on the same rubric, 30 and 60 days later.',
    src: 'kirkpatrick',
  },
  {
    level: '4',
    name: 'Results',
    quote:
      'Level 4: Results measures the degree to which targeted organizational outcomes occur as a result of an experience or initiative and performance support.',
    sales:
      'Bookings per rep, win rate, meetings per 100 dials, ramp months: trained group vs control group.',
    src: 'kirkpatrick',
  },
  {
    level: '5',
    name: 'ROI (Phillips)',
    sales:
      'Margin from the isolated lift, minus fully loaded cost, divided by cost. First year only.',
    src: 'method',
  },
]

export type Currency = 'USD' | 'GBP' | 'INR'

export interface Inputs {
  currency: Currency
  reps: number // reps who take the training
  bookings: number // annual bookings (revenue) per fully ramped rep, before training
  margin: number // gross margin %, 0-100
  hasControl: boolean
  trainedLift: number // % change in bookings per rep, trained group
  controlLift: number // % change, control group (same period)
  attribution: number // % of the trained lift you attribute to training when there is no control group
  hires: number // new reps who go through the programme this year (their training hours are costed too)
  rampBefore: number // months to full productivity, before
  rampAfter: number // months, after
  programFee: number // trainer, licence or platform fee for the year
  repHours: number // hours each rep spends in training, away from selling
  repHourCost: number // loaded cost of a rep hour
  managerHours: number // total manager hours (coaching, scoring, sessions)
  managerHourCost: number
  otherCost: number // design, admin, travel, evaluation
}

export interface Result {
  netLift: number // percentage points credited to training
  liftBookings: number
  rampBookings: number
  bookingsTotal: number
  benefit: number // gross margin on bookingsTotal
  costs: { label: string; value: number }[]
  cost: number
  net: number
  roi: number // %
  bcr: number
  paybackMonths: number | null
  breakEvenLift: number | null // percentage points of isolated lift on the trained reps for ROI = 0, ignoring ramp gain
  roiRevenueBasis: number // what you'd report using revenue instead of margin
  roiFullCredit: number // what you'd report crediting the whole trained lift to training
}

const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n))

/**
 * Ramp value per new hire, in bookings, assuming productivity climbs in a straight line from
 * zero to full over the ramp: the ramp then costs half its months of full output, so cutting
 * the ramp by d months adds d / 2 months of full bookings in year one.
 */
export function rampGainPerHire(bookings: number, before: number, after: number): number {
  // A longer ramp after training counts against the programme (most conservative reading).
  const b = clamp(before, 0, 12)
  const a = clamp(after, 0, 12)
  return ((b - a) / 2) * (bookings / 12)
}

export function compute(i: Inputs): Result {
  const m = clamp(i.margin, 0, 100) / 100
  const reps = Math.max(0, i.reps)
  const hires = Math.max(0, i.hires)
  const netLift = i.hasControl
    ? i.trainedLift - i.controlLift
    : (i.trainedLift * clamp(i.attribution, 0, 100)) / 100
  const liftBookings = (reps * i.bookings * netLift) / 100
  // Without a control group, the ramp change gets the same attribution share as the lift.
  const share = i.hasControl ? 1 : clamp(i.attribution, 0, 100) / 100
  const rampBookings = hires * rampGainPerHire(i.bookings, i.rampBefore, i.rampAfter) * share
  const bookingsTotal = liftBookings + rampBookings
  const benefit = bookingsTotal * m
  const costs = [
    { label: 'Programme fee (trainer, licence or platform)', value: i.programFee },
    { label: 'Rep time away from selling', value: (reps + hires) * i.repHours * i.repHourCost },
    { label: 'Manager time', value: i.managerHours * i.managerHourCost },
    { label: 'Design, admin, travel and evaluation', value: i.otherCost },
  ]
  const cost = costs.reduce((s, c) => s + c.value, 0)
  const net = benefit - cost
  const roi = cost > 0 ? (net / cost) * 100 : 0
  const bcr = cost > 0 ? benefit / cost : 0
  const paybackMonths = benefit > 0 ? (cost / benefit) * 12 : null
  const marginOnOnePoint = (reps * i.bookings * m) / 100
  // Lift needed from the trained reps alone (ramp gain left out) for ROI = 0.
  const breakEvenLift = marginOnOnePoint > 0 ? cost / marginOnOnePoint : null
  const roiRevenueBasis = cost > 0 ? ((bookingsTotal - cost) / cost) * 100 : 0
  const fullCreditBookings =
    (reps * i.bookings * i.trainedLift) / 100 +
    hires * rampGainPerHire(i.bookings, i.rampBefore, i.rampAfter)
  const roiFullCredit = cost > 0 ? ((fullCreditBookings * m - cost) / cost) * 100 : 0
  return {
    netLift,
    liftBookings,
    rampBookings,
    bookingsTotal,
    benefit,
    costs,
    cost,
    net,
    roi,
    bcr,
    paybackMonths,
    breakEvenLift,
    roiRevenueBasis,
    roiFullCredit,
  }
}

/** Example inputs for three team shapes. Illustrative, not benchmarks: replace with your own. */
export const PRESETS: Record<Currency, { label: string; inputs: Inputs }> = {
  USD: {
    label: 'US account executives, 20 reps (USD)',
    inputs: {
      currency: 'USD',
      reps: 20,
      bookings: 500000,
      margin: 75,
      hasControl: true,
      trainedLift: 8,
      controlLift: 3,
      attribution: 50,
      hires: 6,
      rampBefore: 6,
      rampAfter: 5,
      programFee: 60000,
      repHours: 24,
      repHourCost: 60,
      managerHours: 80,
      managerHourCost: 90,
      otherCost: 9000,
    },
  },
  GBP: {
    label: 'UK SDR team, 12 reps (GBP)',
    inputs: {
      currency: 'GBP',
      reps: 12,
      bookings: 300000,
      margin: 70,
      hasControl: false,
      trainedLift: 6,
      controlLift: 0,
      attribution: 40,
      hires: 4,
      rampBefore: 3,
      rampAfter: 2,
      programFee: 18000,
      repHours: 16,
      repHourCost: 30,
      managerHours: 40,
      managerHourCost: 55,
      otherCost: 3000,
    },
  },
  INR: {
    label: 'India inside sales, 40 reps (INR)',
    inputs: {
      currency: 'INR',
      reps: 40,
      bookings: 6000000,
      margin: 60,
      hasControl: true,
      trainedLift: 7,
      controlLift: 2,
      attribution: 50,
      hires: 15,
      rampBefore: 4,
      rampAfter: 3,
      programFee: 1200000,
      repHours: 20,
      repHourCost: 400,
      managerHours: 120,
      managerHourCost: 1000,
      otherCost: 150000,
    },
  },
}

export const WORKED = PRESETS.USD.inputs

const SYM: Record<Currency, string> = { USD: '$', GBP: '£', INR: '₹' }

/** Money with the currency's own grouping (lakh/crore for INR). Rounds half up to whole units. */
export function money(n: number, c: Currency): string {
  const v = Math.round(n)
  const sign = v < 0 ? '−' : ''
  const abs = Math.abs(v)
  const s = abs.toLocaleString(c === 'INR' ? 'en-IN' : 'en-US')
  return `${sign}${SYM[c]}${s}`
}

export function pct(n: number, dp = 0): string {
  let f = n.toFixed(dp)
  if (/^-0(\.0+)?$/.test(f)) f = f.slice(1)
  return `${f.startsWith('-') ? '−' + f.slice(1) : f}%`
}

/** Facts the page states, from the sources. */
export const FACTS = {
  usSpend: '$102.8 billion',
  usSpendYear: 2025,
  perLearner: '$874',
  sdrRamp: '3.0 months',
  sdrAtQuota: '60%',
  roiShare: '5–10%',
  sfMiss: '67%',
}
