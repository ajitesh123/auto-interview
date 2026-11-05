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
  /** What we saw in the posts, one line each. */
  patterns: string[]
  /** How to negotiate this role's offer, one line each. */
  negotiate: string[]
  faqs: { q: string; a: string }[]
}
