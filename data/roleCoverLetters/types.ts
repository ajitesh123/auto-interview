// Cover letter (covering letter) kits: /<slug>/cover-letter.
// Rules: every number has an opened source; sample people, companies and colleges are fictional
// and labelled; counts shown on the page are computed from `jobPosts`, never typed into prose.

export interface Src {
  label: string
  url: string
}

export interface CoverLetterSample {
  id: string
  level: string // e.g. "2–5 years", "Fresher", "Career switcher"
  who: string // fictional, e.g. "Ishita Rao (sample)"
  context: string // what they are applying for and how
  subject?: string
  greeting: string
  /** Paragraphs in order. `role` names what the paragraph does (shown as a margin label). */
  paragraphs: { role: string; text: string }[]
  signoff: string
}

export interface JobPostCheck {
  company: string
  title: string
  location: string
  region: 'India' | 'US' | 'UK' | 'Europe'
  url: string
  /** What the application asks: required / optional field / none (no field, not mentioned). */
  coverLetter: 'required' | 'optional' | 'none'
  coverLetterNote: string
  /** Terms found on the post (checked one by one on 12 Nov 2026). */
  terms: string[]
}

export interface CoverLetterKit {
  slug: string // role hub slug
  metaTitle: string // <= 60
  metaDescription: string // 150–160
  h1: string
  /** directAnswer, faqs and portal text may use {n} {required} {requiredWord} {optional} {none} {checked}; filled from jobPosts. */
  directAnswer: string
  checked: string // yyyy-mm-dd
  evidence: { value: string; label: string; sub: string; href: string }[]
  jobPosts: JobPostCheck[]
  decision: {
    situation: string
    doThis: string
    length: string
    effort: 'High' | 'Medium' | 'Low'
  }[]
  lengthGuides: { label: string; sub: string; min: number; max: number; href: string }[]
  structure: { title: string; body: string }[]
  story: { title: string; body: string }[]
  metricFinder: { kind: string; ask: string; example: string; noJob: string }[]
  rewrite: {
    weak: CoverLetterSample
    moves: { label: string; weak: string; strong: string }[]
  }
  samples: CoverLetterSample[] // first = the main sample, also in the Word file
  emailNote: { subject: string; body: string }
  portalAnswer: { question: string; body: string; src: Src }
  portals: { name: string; whatWeFound: string; doThis: string; src?: Src }[]
  india: { title: string; body: string }[]
  ai: { finding: string; quote: string; src: Src; whatToDo: string[] }
  /** Terms the letter checker looks for (role tools and words from the job posts). */
  checkerTerms: string[]
  mistakes: { mistake: string; fix: string }[]
  sources: Src[]
  faqs: { q: string; a: string }[]
  template: { href: string; fileName: string }
}
