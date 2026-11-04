// Role hub data model. One file per role in this folder; registered in ./index.ts.
// Every number on a hub must carry a source (url + date). No invented figures.

export interface HubQuestion {
  q: string
  answer: string // model answer, plain text with \n\n for paragraphs
  lookFor?: string // what interviewers are listening for
}

export interface HubQuestionGroup {
  id: string
  title: string
  blurb: string
  questions: HubQuestion[]
}

export interface PayRow {
  band: string // e.g. "Early career"
  experience: string // e.g. "0–3 yrs"
  value: string // formatted, e.g. "₹29.5 LPA"
}

export interface PayTable {
  region: string // e.g. "India"
  currency: string // e.g. "INR (₹, lakh per annum)"
  rows: PayRow[]
  note: string
  sourceLabel: string
  sourceUrl: string
  asOf: string
}

export interface HiringCompany {
  name: string
  count: number
  segment: string // e.g. "Big Tech", "Enterprise SaaS"
}

export interface RoundInfo {
  companyType: string
  rounds: string[]
}

export interface Resource {
  title: string
  url: string
  kind: string // Course, Book, Guide, Newsletter, Tool, Our guide
  why: string
  free?: boolean
}

export interface PlanBlock {
  days: string
  title: string
  tasks: string[]
}

export interface HubVisual {
  mp4?: string // looping motion version (made with the Poster Kit)
  image: string // still / poster frame
  alt: string
}

export interface RoleHub {
  slug: string // url segment, e.g. "aipm"
  roleName: string // "AI Product Manager"
  shortName: string // "AI PM"
  metaTitle: string
  metaDescription: string
  keywords: string[]
  heroTitle: string
  heroDescription: string
  directAnswer: string
  lastUpdated: string // YYYY-MM-DD
  whatTheRoleIs: string[]
  /** Optional labels for the two expectation columns (defaults: B2B vs B2C). */
  expectationLabels?: {
    nav: string // short tab label, e.g. "Startup vs scale-up"
    title: string
    sub: string
    a: string // label for the `b2b` column
    b: string // label for the `b2c` column
    aNote?: string // small note beside column A, e.g. "Most roles today"
    differenceTitle?: string
  }
  expectations: {
    b2b: { headline: string; points: string[]; metrics: string[] }
    b2c: { headline: string; points: string[]; metrics: string[] }
    difference: string[] // how it differs from the classic version of the role
  }
  skills: { area: string; items: string[] }[]
  process: RoundInfo[]
  /** title defaults to "Pay by experience: India, US and Europe" */
  pay: {
    title?: string
    /** short pay label for cards when there is no Median row, e.g. "India ₹20–40 LPA posted" */
    headline?: string
    intro: string
    tables: PayTable[]
    crossCheck?: string
  }
  hiring: {
    /** Optional section title (default: "Companies hiring the most in 2025–26") */
    title?: string
    /** true when `companies` are segments (e.g. company-size bands), not company names */
    segments?: boolean
    intro: string
    companies: HiringCompany[]
    method: string
    sourceLabel: string
    asOf: string
  }
  questionGroups: HubQuestionGroup[]
  plans: PlanBlock[]
  resources: Resource[]
  related: { label: string; href: string }[]
  faqs: { q: string; a: string }[]
  visuals?: { hero?: HubVisual; pay?: HubVisual; hiring?: HubVisual; og?: string }
}
