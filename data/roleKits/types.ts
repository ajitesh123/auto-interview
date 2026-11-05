// Role kits: the documents a candidate needs for each role hub.
// Each kit becomes its own page under the hub: /<slug>/resume and /<slug>/letter-of-recommendation.
// Rules: every number needs a source; samples use clearly fictional people and companies;
// keywords come from real job posts listed in `keywordSources`.

export interface SourceRef {
  label: string
  url: string
}

export interface ResumeKit {
  metaTitle: string // <= 60 chars, e.g. "AI Product Manager Resume (CV): Examples & Bullets 2026"
  metaDescription: string // 150–160 chars
  h1: string // e.g. "AI Product Manager resume (CV) guide"
  /** 2 sentences that answer "what should my resume show?" directly */
  directAnswer: string
  /** What the person screening THIS role looks for in the first skim (3–4 points) */
  recruiterLens: string[]
  format: {
    length: string // e.g. "One page under 8 years of experience; two pages after that"
    sections: string[] // section order for this role
    indiaNote: string // CV conventions in India (photo, CTC, notice period, etc.)
    usNote: string // US resume conventions
  }
  summaries: { level: string; text: string }[] // 2–3 profile summaries (fresher/switcher, experienced, senior)
  bulletBank: { area: string; bullets: string[] }[] // 3–4 areas x 3 bullets; use [brackets] for numbers to fill
  beforeAfter: { weak: string; strong: string; why: string }[] // 3 rewrites
  keywords: { group: string; terms: string[] }[] // from real job posts
  keywordSources: SourceRef[] // 2–4 real job posts the keywords came from
  projects: { title: string; what: string; proves: string }[] // proof of work if you lack experience (3)
  mistakes: { mistake: string; fix: string }[] // 4–5
  sample: {
    name: string // fictional, e.g. "Aarav Mehta (sample)"
    headline: string
    contact: string // fictional, e.g. "Bengaluru · aarav@example.com · linkedin.com/in/example"
    summary: string
    experience: { role: string; org: string; dates: string; bullets: string[] }[]
    projects?: { name: string; line: string }[]
    skills: string[]
    education: string
  }
  coverLetter: { subject: string; body: string } // short, 120–180 words
  linkedin: { headline: string; about: string }
  faqs: { q: string; a: string }[] // 4–5
}

export interface LorKit {
  metaTitle: string // <= 60 chars, e.g. "Letter of Recommendation for a Product Manager (Sample)"
  metaDescription: string
  h1: string
  directAnswer: string
  /** Who makes a credible recommender for this role, and why */
  whoShouldWrite: { who: string; why: string }[]
  /** Role-specific qualities the letter must prove, each with an example evidence line */
  whatToHighlight: { quality: string; evidence: string }[]
  structure: { part: string; what: string }[] // paragraph plan, 4–5 parts
  sampleLetter: { context: string; paragraphs: string[]; signoff: string } // fictional people/companies
  askEmail: { subject: string; body: string } // how to ask your recommender
  brief: string[] // what to send the recommender (a "brag sheet")
  variants: { context: string; tweak: string }[] // job reference, MBA/MS application, internal promotion, referral
  mistakes: string[]
  faqs: { q: string; a: string }[]
}

export interface RoleKits {
  resume: ResumeKit
  lor: LorKit
}
