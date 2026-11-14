// Salary pages (/<slug>/salary): posted pay from job posts we opened, one record per post.
// Numbers are exactly what the post stated; min/max are parsed from it for the stats.

export interface PayPost {
  company: string
  title: string
  location: string
  experience: string // as asked, e.g. "2–4 yrs"
  minYears?: number // for the experience split
  stated: string // pay exactly as written on the post
  /** India: ₹ lakh per annum. US: $ thousand per year (base unless noted). */
  min: number
  max: number
  /** Fixed part only, when the post splits fixed and variable (India, ₹ lakh). */
  fixedMin?: number
  fixedMax?: number
  equity: 'yes' | 'no' | 'not stated'
  note?: string
  status?: string // e.g. "closed", "listing page only"
  url: string
}

/** Self-reported company pay (Levels.fyi), India, ₹ lakh total compensation per year. */
export interface CompanyPay {
  company: string
  median: number
  entryLevel?: string
  entryTc?: number
  url: string
}

/** Self-reported pay for one city (Levels.fyi), India, ₹ lakh total compensation per year. */
export interface CityPay {
  city: string
  /** All levels, when the city page loaded. */
  all?: { median: number; p25: number; p75: number; n: number; url: string }
  entry?: { median: number; n: number; url: string } // entry-level median, when the page exists
}

/**
 * Pay reported by people already in the role (AmbitionBox), India, ₹ lakh CTC a year.
 * Read from the designation's public page; numbers are AmbitionBox's own aggregates.
 */
export interface ReportedCompany {
  name: string
  slug: string // AmbitionBox company url name
  n: number // salaries reported for this designation at this company
  avg: number
  low: number // typical range
  high: number
  minExp: number
  maxExp: number
}

export interface ReportedSet {
  /** Our name for the role, e.g. "Chief of Staff". */
  label: string
  /** AmbitionBox's designation name, e.g. "Chief Staff". */
  designation: string
  url: string // the designation page
  updated: string // AmbitionBox lastUpdated, YYYY-MM-DD
  n: number
  median: number
  p25: number
  p75: number
  p90: number
  /** By years of experience: [years, avg, typical low, typical high, salaries]. */
  exp: [string, number, number, number, number][]
  /** Metro cities: [city, avg, typical low, typical high, salaries]. */
  cities: [string, number, number, number, number][]
  /** Well-known employers only, chosen by us from AmbitionBox's company list for this title. */
  companies: ReportedCompany[]
}

/** US pay reported on Levels.fyi, $ thousand total compensation a year. */
export interface ReportedUs {
  company: string
  median: number
  n?: number
  note?: string
  url: string
}

export interface RoleSalary {
  slug: string // hub slug
  roleName: string
  metaTitle: string
  metaDescription: string
  h1: string
  checked: string // YYYY-MM-DD the posts were opened
  /** Region shown first. */
  lead: 'india' | 'us'
  india: PayPost[]
  us: PayPost[]
  /** Optional company table (Levels.fyi), shown after the posts. */
  companies?: { title: string; intro: string; note: string; rows: CompanyPay[] }
  /** Optional city table: self-reported medians by city (Levels.fyi), with entry-level medians. */
  cities?: { title: string; intro: string; note: string; rows: CityPay[] }
  /**
   * Pay reported by people already in the role at well-known companies. Shown first: posted
   * ranges are what employers advertise; this is what people say they are paid.
   */
  reported?: {
    checked: string // YYYY-MM-DD we read the pages
    intro: string
    sets: ReportedSet[]
    us?: { title: string; checked: string; overall?: ReportedUs; rows: ReportedUs[] }
    /** One line each: what the reported numbers show. */
    findings: string[]
  }
  /** Optional sentence appended to the hero answer (e.g. fresher pay). */
  answerExtra?: string
  /** Optional sentence appended to the method callout. */
  methodNote?: string
  /** What we saw in the posts, one line each. */
  patterns: string[]
  /** How to negotiate this role's offer, one line each. */
  negotiate: string[]
  faqs: { q: string; a: string }[]
}
