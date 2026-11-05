// India salary maths for /salary-calculator: CTC → in-hand, both tax regimes.
// Every rule below carries an opened source. Tax year 2026-27 (FY Apr 2026 – Mar 2027).
// Pure functions: the client calculator, the server-rendered worked tables and the FAQ
// all read from here, so every number on the page comes from one place.

export const TAX_YEAR = '2026-27'
export const RULES_CHECKED = '2026-11-06'

export const SOURCES = {
  slabsOfficial: {
    label: 'Income Tax Dept, Finance Bill 2026 memorandum',
    url: 'https://www.incometaxindia.gov.in/documents/81799/11848482/memo-2026.pdf',
  },
  ratesPage: {
    label: 'Income Tax Dept, tax rates page',
    url: 'https://www.incometaxindia.gov.in/w/tax-rates%E2%80%8B',
  },
  rebate: {
    label: 'Income Tax e-filing portal, salaried individuals',
    url: 'https://www.incometax.gov.in/iec/foportal/help/individual/return-applicable-1',
  },
  budget2026: {
    label: 'Business Today, 1 Feb 2026',
    url: 'https://www.businesstoday.in/personal-finance/tax/story/tax-slabs-fy-2026-27-what-budget-2026-changed-for-individual-taxpayers-and-which-regime-works-best-514044-2026-02-01',
  },
  oldStdDeduction: {
    label: 'Business Today, 1 Apr 2026',
    url: 'https://www.businesstoday.in/personal-finance/tax/story/income-tax-slabs-fy-2026-27-will-rates-change-from-april-1-under-new-tax-rules-details-523303-2026-04-01',
  },
  hraCities: {
    label: 'Business Today, 1 Apr 2026 (Income-tax Rules 2026)',
    url: 'https://www.businesstoday.in/personal-finance/tax/story/income-tax-2026-key-rule-changes-that-increase-salaried-take-home-pay-523501-2026-04-01',
  },
  pfCeiling: {
    label: 'PIB, 16 Sep 2026',
    url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2310973&amp=&reg=3&amp=&lang=1',
  },
  pfRates: {
    label: 'Keka, PF wage ceiling guide',
    url: 'https://www.keka.com/pf-wage-ceiling-raised-to-25000',
  },
  wageRule: {
    label: 'India Briefing, 24 Apr 2026',
    url: 'https://india-briefing.com/news/salary-structure-india-labor-code-compliance-guide-44332.html/',
  },
  sec123: {
    label: 'Business Today, 24 Mar 2026 (section 123, ex-80C)',
    url: 'https://www.businesstoday.in/personal-finance/tax/story/income-tax-act-2025-section-80c-becomes-section-123-from-april-1-2026-heres-what-taxpayers-must-know-522120-2026-03-24',
  },
  profTax: {
    label: 'Constitution of India, Article 276(2)',
    url: 'https://www.latestlaws.com/mobile/app/bare-acts/141989',
  },
} as const

type Slab = { upTo: number; rate: number } // upTo = upper edge of the band (Infinity for the top)

/** New regime (default), section 202 of the Income-tax Act 2025; same bands as 115BAC(1A). */
export const NEW_SLABS: Slab[] = [
  { upTo: 400000, rate: 0 },
  { upTo: 800000, rate: 0.05 },
  { upTo: 1200000, rate: 0.1 },
  { upTo: 1600000, rate: 0.15 },
  { upTo: 2000000, rate: 0.2 },
  { upTo: 2400000, rate: 0.25 },
  { upTo: Infinity, rate: 0.3 },
]

/** Old regime, resident individual below 60. */
export const OLD_SLABS: Slab[] = [
  { upTo: 250000, rate: 0 },
  { upTo: 500000, rate: 0.05 },
  { upTo: 1000000, rate: 0.2 },
  { upTo: Infinity, rate: 0.3 },
]

/** Surcharge bands: [threshold, rate]. New regime tops out at 25%. */
const NEW_SURCHARGE: [number, number][] = [
  [5000000, 0.1],
  [10000000, 0.15],
  [20000000, 0.25],
]
const OLD_SURCHARGE: [number, number][] = [
  [5000000, 0.1],
  [10000000, 0.15],
  [20000000, 0.25],
  [50000000, 0.37],
]

export const STD_DEDUCTION = { new: 75000, old: 50000 }
export const REBATE = {
  new: { limit: 1200000, max: 60000 },
  old: { limit: 500000, max: 12500 },
}
export const CESS = 0.04
export const LIMIT_80C = 150000
export const PF_RATE = 0.12
/** EPF wage ceiling per month, from 17 Sep 2026 (was ₹15,000). */
export const PF_WAGE_CEILING = 25000
/** Gratuity convention: 15 days' basic per year of service ÷ 26 working days ÷ 12 months. */
export const GRATUITY_RATE = 15 / 26 / 12
export const PROF_TAX_MAX = 2500
export const HRA_METROS = [
  'Delhi',
  'Mumbai',
  'Kolkata',
  'Chennai',
  'Bengaluru',
  'Hyderabad',
  'Pune',
  'Ahmedabad',
]

export type Regime = 'new' | 'old'
export type PfMode = 'ceiling' | 'full' | 'none'

export interface SalaryInputs {
  ctc: number // ₹ per year, including variable pay
  variable: number // ₹ per year of the CTC that is a performance bonus
  basicPct: number // basic (+DA) as % of fixed CTC
  hraPct: number // HRA component as % of basic
  pfMode: PfMode
  gratuityInCtc: boolean
  profTax: number // ₹ per year
  metro: boolean // one of the 8 cities with 50% HRA
  rent: number // ₹ per month (old regime HRA)
  other80C: number // ₹ per year beyond employee PF (old regime)
  d80D: number // ₹ per year health insurance (old regime)
}

export const DEFAULT_INPUTS: SalaryInputs = {
  ctc: 1200000,
  variable: 0,
  basicPct: 50,
  hraPct: 40,
  pfMode: 'ceiling',
  gratuityInCtc: true,
  profTax: 2500,
  metro: true,
  rent: 0,
  other80C: 0,
  d80D: 0,
}

const r0 = (n: number) => Math.round(Number(n.toPrecision(12)))

function slabTax(income: number, slabs: Slab[]) {
  let tax = 0
  let lower = 0
  for (const s of slabs) {
    if (income <= lower) break
    tax += (Math.min(income, s.upTo) - lower) * s.rate
    lower = s.upTo
  }
  return tax
}

/** Slab tax after the rebate (and the new regime's marginal relief just above ₹12 lakh). */
function baseTax(income: number, regime: Regime) {
  const raw = slabTax(income, regime === 'new' ? NEW_SLABS : OLD_SLABS)
  const rb = REBATE[regime]
  if (income <= rb.limit) return Math.max(0, raw - Math.min(raw, rb.max))
  if (regime === 'new') return Math.min(raw, income - rb.limit) // marginal relief
  return raw
}

function surchargeRate(income: number, regime: Regime) {
  let rate = 0
  for (const [t, r] of regime === 'new' ? NEW_SURCHARGE : OLD_SURCHARGE) if (income > t) rate = r
  return rate
}

/** Tax + surcharge, with marginal relief at each surcharge threshold. */
function taxWithSurcharge(income: number, regime: Regime) {
  const bands = regime === 'new' ? NEW_SURCHARGE : OLD_SURCHARGE
  const rate = surchargeRate(income, regime)
  const full = baseTax(income, regime) * (1 + rate)
  if (rate === 0) return full
  let t = 0
  for (const [th] of bands) if (income > th) t = th
  const atT = baseTax(t, regime) * (1 + surchargeRate(t, regime))
  return Math.min(full, atT + (income - t))
}

/** Income tax incl. 4% cess on a taxable income, rounded to the rupee. */
export function incomeTax(taxable: number, regime: Regime) {
  const income = Math.max(0, taxable)
  return r0(taxWithSurcharge(income, regime) * (1 + CESS))
}

export interface RegimeResult {
  regime: Regime
  taxable: number
  deductions: { label: string; amount: number }[]
  tax: number // on fixed pay + variable
  taxOnFixed: number
}

export interface SalaryResult {
  fixed: number
  basic: number
  hra: number
  employerPf: number
  employeePf: number
  gratuity: number
  gross: number // fixed pay paid out in salary (before employee deductions)
  special: number // balancing "special allowance"
  wageRuleShort: boolean // basic below 50% of pay: labour-code add-back applies
  regimes: Record<Regime, RegimeResult>
  best: Regime
  // For the best regime:
  monthlyInHand: number
  annualInHand: number // fixed months only
  bonusInHand: number // variable after its extra tax
  totalTakeHome: number
}

export function computeSalary(i: SalaryInputs): SalaryResult {
  const ctc = Math.max(0, i.ctc)
  const variable = Math.min(Math.max(0, i.variable), ctc)
  const fixed = ctc - variable
  const basic = (fixed * i.basicPct) / 100
  const pfWage =
    i.pfMode === 'none' ? 0 : i.pfMode === 'ceiling' ? Math.min(basic, PF_WAGE_CEILING * 12) : basic
  const employerPf = pfWage * PF_RATE
  const employeePf = employerPf
  const gratuity = i.gratuityInCtc ? basic * GRATUITY_RATE : 0
  const gross = Math.max(0, fixed - employerPf - gratuity)
  const hra = Math.min((basic * i.hraPct) / 100, Math.max(0, gross - basic))
  const special = Math.max(0, gross - basic - hra)

  const hraExempt = Math.max(
    0,
    Math.min(hra, i.rent * 12 - 0.1 * basic, (i.metro ? 0.5 : 0.4) * basic)
  )
  const c80 = Math.min(LIMIT_80C, employeePf + Math.max(0, i.other80C))

  const make = (regime: Regime): RegimeResult => {
    const deductions =
      regime === 'new'
        ? [{ label: 'Standard deduction', amount: STD_DEDUCTION.new }]
        : [
            { label: 'Standard deduction', amount: STD_DEDUCTION.old },
            { label: 'Professional tax', amount: i.profTax },
            { label: 'HRA exemption', amount: hraExempt },
            { label: '80C (incl. your PF)', amount: c80 },
            { label: '80D health insurance', amount: Math.max(0, i.d80D) },
          ].filter((d) => d.amount > 0)
    const ded = deductions.reduce((s, d) => s + d.amount, 0)
    const taxableFixed = Math.max(0, gross - ded)
    const taxable = Math.max(0, gross + variable - ded)
    return {
      regime,
      taxable: r0(taxable),
      deductions: deductions.map((d) => ({ ...d, amount: r0(d.amount) })),
      tax: incomeTax(taxable, regime),
      taxOnFixed: incomeTax(taxableFixed, regime),
    }
  }
  const regimes = { new: make('new'), old: make('old') }
  const best: Regime = regimes.old.tax < regimes.new.tax ? 'old' : 'new'
  const b = regimes[best]
  const annualInHand = gross - employeePf - i.profTax - b.taxOnFixed
  const bonusInHand = variable - (b.tax - b.taxOnFixed)
  return {
    fixed: r0(fixed),
    basic: r0(basic),
    hra: r0(hra),
    employerPf: r0(employerPf),
    employeePf: r0(employeePf),
    gratuity: r0(gratuity),
    gross: r0(gross),
    special: r0(special),
    wageRuleShort: i.basicPct < 50,
    regimes,
    best,
    monthlyInHand: r0(annualInHand / 12),
    annualInHand: r0(annualInHand),
    bonusInHand: r0(bonusInHand),
    totalTakeHome: r0(annualInHand + bonusInHand),
  }
}

/** Monthly in-hand for a given regime (used by the worked tables). */
export function monthlyFor(i: SalaryInputs, regime: Regime) {
  const r = computeSalary(i)
  return r0((r.gross - r.employeePf - i.profTax - r.regimes[regime].taxOnFixed) / 12)
}

export const inr = (n: number) => `₹${Math.round(n).toLocaleString('en-IN')}`
export const lakh = (n: number) => {
  const v = n / 100000
  return `₹${Number.isInteger(v) ? v : v.toFixed(1)} LPA`
}

/** CTCs for the worked table (lakh per annum). */
export const WORKED_CTCS = [6, 8, 10, 12, 15, 18, 20, 25, 30, 40, 50]

/**
 * Extra old-regime deductions (beyond the standard deduction, professional tax and your
 * own PF under 80C) needed before the old regime beats the new one. Null = never wins
 * within ₹10 lakh of deductions.
 */
export function breakEvenDeductions(ctcLakh: number, base: SalaryInputs = DEFAULT_INPUTS) {
  const inputs = { ...base, ctc: ctcLakh * 100000, rent: 0, other80C: 0, d80D: 0 }
  const r = computeSalary(inputs)
  const target = r.regimes.new.taxOnFixed
  const oldAt = (extra: number) => {
    const t = r.regimes.old.taxable - extra
    return incomeTax(t, 'old')
  }
  if (oldAt(0) <= target) return 0
  let lo = 0
  let hi = 1000000
  if (oldAt(hi) > target) return null
  while (hi - lo > 100) {
    const mid = (lo + hi) / 2
    if (oldAt(mid) <= target) hi = mid
    else lo = mid
  }
  return Math.ceil(hi / 1000) * 1000
}
