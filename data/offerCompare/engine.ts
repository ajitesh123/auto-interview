// Job offer comparer for India: real money from 2–3 offers, year 1 and 3 years.
// Tax comes from data/indiaTax.ts (FY 2026-27, both regimes, best one picked per offer),
// so this file only adds what a CTC calculator misses: expected variable payout, joining
// bonus and its clawback, notice buyout, equity vesting with a cliff, rent and commute.
// Pure functions: the client tool, the server-rendered worked example and the FAQ read
// from here, so every number on /job-offer-comparison comes from one place.
import { computeSalary, DEFAULT_INPUTS } from '@/data/indiaTax'

export const RULES_CHECKED = '2026-11-15'

export const SOURCES = {
  eyPay: {
    label: 'EY Future of Pay 2026 (press release, 23 Feb 2026)',
    url: 'https://ey.com/en_in/newsroom/2026/02/india-inc-projects-9-point-1-percent-salary-increase-in-2026-as-compensation-becomes-sharper-more-skills-led-ey-future-of-pay-2026-report',
  },
  aonHike: {
    label: 'Aon salary increase study (press release, 14 Oct 2026)',
    url: 'https://www.aon.com/apac/in-the-press/asia-newsroom/2026/aon-study-finds-salaries-in-india-projected-to-fise-9-1-in-2027-employers-balance-growth-and-cost-pressures',
  },
  signOnItat: {
    label: 'ITAT Chennai, S.S.N. Ravi vs ACIT, 6 May 2016 (ClearTax summary)',
    url: 'https://cleartax.in/s/sign-on-bonus-refunded-employer-cannot-reduced-taxable-salary-case-law',
  },
  kekaSignOn: {
    label: 'Keka, sign-on bonus guide (updated 23 Sep 2026)',
    url: 'https://www.keka.com/sign-on-bonus',
  },
  buyoutTax: {
    label: 'Taxsutra, notice-pay reimbursement (19 Jan 2023)',
    url: 'https://www.taxsutra.com/article-print-preview/103861',
  },
  esopDept: {
    label: 'Income Tax Department, taxation of ESOPs',
    url: 'https://www.incometaxindia.gov.in/w/taxation-of-employee-stock-option-plan-esop-',
  },
  esopDeferral: {
    label: 'Income-tax Act 2025, section 289(3) (bare text, TaxHeal, 2 Apr 2026)',
    url: 'https://www.taxheal.com/section-289-income-tax-act-2025.html',
  },
  rsuVest: {
    label: 'BDO, India tax treatment of restricted stock (2016)',
    url: 'https://global-www.bdo.global/getmedia/04739374-174b-4a1e-a4a5-6ac255591ba2/India-Tax-Treatment-of-Restricted-Stock.pdf.aspx',
  },
  gratuityFaq: {
    label: 'Ministry of Labour, FAQs on the labour codes',
    url: 'https://labour.gov.in/sites/default/files/faqs_on_labour_codes.pdf',
  },
  gratuityFixedTerm: {
    label: 'PIB, labour codes in force (21 Nov 2025)',
    url: 'https://labour.gov.in/sites/default/files/pib2192463.pdf',
  },
} as const

/** EY Future of Pay 2026: average performers received 60–80% of target variable pay. */
export const DEFAULT_PAYOUT_PCT = 70
/** Aon, Oct 2026: India salaries projected to rise 9.1% in 2027 (actual 2026: 9.0%). */
export const DEFAULT_HIKE_PCT = 9

export type EquityType = 'none' | 'rsu' | 'esop'

export interface Offer {
  name: string
  fixed: number // ₹/yr fixed CTC (incl. employer PF and gratuity, as offer letters show it)
  variable: number // ₹/yr target variable / performance bonus
  payoutPct: number // % of target you expect to be paid
  joiningBonus: number // ₹ one-time, paid in year 1
  clawbackMonths: number // repay the joining bonus if you leave before this
  buyout: number // ₹ notice-period buyout you pay your current employer
  buyoutReimbursed: boolean // new employer pays it back (taxable as salary)
  equityType: EquityType
  equityGrant: number // ₹ value of the whole grant today
  vestYears: number
  cliffMonths: number
  equityCountPct: number // how much of that value you choose to count
  basicPct: number
  pfFull: boolean // PF on full basic instead of the ₹25,000 wage ceiling
  metro: boolean
  rent: number // ₹/month you would pay for this job's city
  commute: number // ₹/month travel to this office
  hikePct: number // expected yearly raise
}

export const BLANK_OFFER: Offer = {
  name: 'Offer',
  fixed: 1200000,
  variable: 0,
  payoutPct: DEFAULT_PAYOUT_PCT,
  joiningBonus: 0,
  clawbackMonths: 12,
  buyout: 0,
  buyoutReimbursed: false,
  equityType: 'none',
  equityGrant: 0,
  vestYears: 4,
  cliffMonths: 12,
  equityCountPct: 100,
  basicPct: 50,
  pfFull: false,
  metro: true,
  rent: 0,
  commute: 0,
  hikePct: DEFAULT_HIKE_PCT,
}

/** Fictional worked example: current job vs an MNC offer vs a startup offer, Bengaluru. */
export const SAMPLE_OFFERS: Offer[] = [
  {
    ...BLANK_OFFER,
    name: 'Current job',
    fixed: 1200000,
    rent: 25000,
    commute: 3000,
  },
  {
    ...BLANK_OFFER,
    name: 'MNC offer',
    fixed: 1400000,
    variable: 150000,
    joiningBonus: 100000,
    clawbackMonths: 12,
    rent: 25000,
    commute: 7000,
  },
  {
    ...BLANK_OFFER,
    name: 'Startup offer',
    fixed: 1550000,
    buyout: 60000,
    buyoutReimbursed: true,
    equityType: 'esop',
    equityGrant: 800000,
    vestYears: 4,
    cliffMonths: 12,
    equityCountPct: 25,
    rent: 25000,
    commute: 3000,
  },
]

const r0 = (n: number) => Math.round(Number(n.toPrecision(12)))
const clamp = (n: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, Number.isFinite(n) ? n : 0))

/** Take-home for one year: fixed pay plus a lump of extra taxable pay (bonus, perks, RSU). */
function takeHome(o: Offer, fixed: number, lump: number) {
  const r = computeSalary({
    ...DEFAULT_INPUTS,
    ctc: fixed + lump,
    variable: lump,
    basicPct: clamp(o.basicPct, 10, 100),
    pfMode: o.pfFull ? 'full' : 'ceiling',
    metro: o.metro,
    rent: Math.max(0, o.rent),
  })
  return { total: r.totalTakeHome, fixedInHand: r.annualInHand, monthly: r.monthlyInHand, r }
}

/** Share of the grant vested by month m (cliff, then even monthly vesting). */
export function vestedShare(month: number, vestYears: number, cliffMonths: number) {
  const total = Math.max(1, vestYears) * 12
  if (month < cliffMonths) return 0
  return Math.min(1, month / total)
}

export interface YearRow {
  year: number
  fixedInHand: number // salary in-hand for the year (12 months)
  variableInHand: number // expected variable after its extra tax
  oneTimeInHand: number // joining bonus + reimbursed buyout, after tax (year 1)
  buyoutPaid: number // cash out to the old employer (year 1)
  living: number // rent + commute for the year
  cash: number // fixedInHand + variableInHand + oneTimeInHand − buyoutPaid − living
  equityVested: number // ₹ value vested this year (before tax), at today's value
  equityCounted: number // what you chose to count (RSU: after tax at vest)
}

export interface OfferResult {
  name: string
  regime: 'new' | 'old'
  monthlyInHand: number // year-1 salary in-hand per month, excluding bonuses
  guaranteedYear1: number // year-1 salary in-hand + one-time pay − buyout (no variable)
  years: YearRow[]
  year1Cash: number
  year1AfterLiving: number
  threeYearCash: number // after rent + commute
  threeYearEquity: number
  threeYearTotal: number
  leaveEarlyRepay: number // joining bonus you repay (gross) if you leave before the clawback
  joiningBonusInHand: number // what the joining bonus left you after tax
}

export function computeOffer(input: Offer): OfferResult {
  const o: Offer = {
    ...input,
    fixed: Math.max(0, input.fixed),
    variable: Math.max(0, input.variable),
    payoutPct: clamp(input.payoutPct, 0, 200),
    joiningBonus: Math.max(0, input.joiningBonus),
    buyout: Math.max(0, input.buyout),
    equityGrant: Math.max(0, input.equityGrant),
    vestYears: clamp(input.vestYears, 1, 10),
    cliffMonths: clamp(input.cliffMonths, 0, 60),
    equityCountPct: clamp(input.equityCountPct, 0, 100),
    rent: Math.max(0, input.rent),
    commute: Math.max(0, input.commute),
    hikePct: clamp(input.hikePct, -50, 100),
  }
  const years: YearRow[] = []
  let regime: 'new' | 'old' = 'new'
  let monthly = 0
  let jbInHand = 0
  for (let y = 1; y <= 3; y++) {
    const g = Math.pow(1 + o.hikePct / 100, y - 1)
    const fixed = o.fixed * g
    const varPaid = (o.variable * g * o.payoutPct) / 100
    const oneTime = y === 1 ? o.joiningBonus + (o.buyoutReimbursed ? o.buyout : 0) : 0
    const vested =
      o.equityType === 'none'
        ? 0
        : o.equityGrant *
          (vestedShare(12 * y, o.vestYears, o.cliffMonths) -
            vestedShare(12 * (y - 1), o.vestYears, o.cliffMonths))
    const rsu = o.equityType === 'rsu' ? vested : 0

    const base = takeHome(o, fixed, varPaid)
    const withOne = takeHome(o, fixed, varPaid + oneTime)
    const withAll = takeHome(o, fixed, varPaid + oneTime + rsu)
    if (y === 1) {
      regime = withAll.r.best
      monthly = withAll.monthly
      const withJbOnly = takeHome(o, fixed, varPaid + o.joiningBonus)
      jbInHand = withJbOnly.total - base.total
    }
    const fixedInHand = withAll.fixedInHand
    const variableInHand = base.total - base.fixedInHand
    const oneTimeInHand = withOne.total - base.total
    // RSUs are taxed as salary at vest: count what is left after that extra tax.
    const equityCounted =
      o.equityType === 'rsu'
        ? ((withAll.total - withOne.total) * o.equityCountPct) / 100
        : (vested * o.equityCountPct) / 100
    // The RSU tax is paid out of the RSU value above, so salary cash uses the no-RSU run.
    const fixedCash = withOne.fixedInHand
    const buyoutPaid = y === 1 ? o.buyout : 0
    const living = (o.rent + o.commute) * 12
    years.push({
      year: y,
      fixedInHand: Math.max(0, r0(o.equityType === 'rsu' ? fixedCash : fixedInHand)),
      variableInHand: r0(variableInHand),
      oneTimeInHand: r0(oneTimeInHand),
      buyoutPaid: r0(buyoutPaid),
      living: r0(living),
      cash: 0,
      equityVested: r0(vested),
      equityCounted: r0(equityCounted),
    })
    const row = years[years.length - 1]
    row.cash =
      row.fixedInHand + row.variableInHand + row.oneTimeInHand - row.buyoutPaid - row.living
  }
  const y1 = years[0]
  const threeYearCash = years.reduce((s, y) => s + y.cash, 0)
  const threeYearEquity = years.reduce((s, y) => s + y.equityCounted, 0)
  return {
    name: o.name,
    regime,
    monthlyInHand: Math.max(0, r0(monthly)),
    guaranteedYear1: y1.fixedInHand + y1.oneTimeInHand - y1.buyoutPaid,
    years,
    year1Cash: y1.fixedInHand + y1.variableInHand + y1.oneTimeInHand - y1.buyoutPaid,
    year1AfterLiving: y1.cash,
    threeYearCash,
    threeYearEquity,
    threeYearTotal: threeYearCash + threeYearEquity,
    leaveEarlyRepay: o.clawbackMonths > 0 ? o.joiningBonus : 0,
    joiningBonusInHand: r0(jbInHand),
  }
}

export interface Comparison {
  results: OfferResult[]
  bestYear1: number // index with the most year-1 cash after rent + commute
  bestThreeYear: number // index with the highest 3-year total
  ctcRank: number // index with the highest headline CTC (fixed + target variable + joining)
}

export function compareOffers(offers: Offer[]): Comparison {
  const results = offers.map(computeOffer)
  const argmax = (f: (i: number) => number) => results.reduce((b, _, i) => (f(i) > f(b) ? i : b), 0)
  return {
    results,
    bestYear1: argmax((i) => results[i].year1AfterLiving),
    bestThreeYear: argmax((i) => results[i].threeYearTotal),
    ctcRank: argmax((i) => offers[i].fixed + offers[i].variable + offers[i].joiningBonus),
  }
}

/**
 * Fixed CTC offer i would need for its 3-year total to match offer `target`'s.
 * Null when it already matches or cannot within ₹5 crore. This is the number to negotiate with.
 */
export function fixedToMatch(offers: Offer[], i: number, target: number) {
  const goal = computeOffer(offers[target]).threeYearTotal
  const at = (fixed: number) => computeOffer({ ...offers[i], fixed }).threeYearTotal
  let lo = Math.max(0, offers[i].fixed)
  if (at(lo) >= goal) return null
  let hi = lo + 50000000
  if (at(hi) < goal) return null
  while (hi - lo > 500) {
    const mid = (lo + hi) / 2
    if (at(mid) >= goal) hi = mid
    else lo = mid
  }
  return Math.ceil(hi / 1000) * 1000
}

/** Headline CTC as recruiters quote it: fixed + target variable (+ joining bonus, year 1). */
export const headlineCtc = (o: Offer) => o.fixed + o.variable + o.joiningBonus

/** % raise in real year-1 cash (after rent + commute) of offer b over offer a. */
export function realHike(a: OfferResult, b: OfferResult) {
  if (a.year1AfterLiving <= 0) return null
  return ((b.year1AfterLiving - a.year1AfterLiving) / a.year1AfterLiving) * 100
}

export const inr = (n: number) =>
  `${n < 0 ? '−' : ''}₹${Math.abs(Math.round(n)).toLocaleString('en-IN')}`
export const lakhs = (n: number) => {
  const v = Math.abs(n) / 100000
  const t = Number.isInteger(v)
    ? String(v)
    : v >= 10
      ? v.toFixed(1)
      : v.toFixed(2).replace(/0$/, '')
  return `${n < 0 ? '−' : ''}₹${t}L`
}
