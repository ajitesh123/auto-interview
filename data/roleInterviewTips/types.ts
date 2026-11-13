// Interview tips, round by round: /<slug>/interview-tips.
// Rules: every quote is verbatim from an opened written source (under 25 words), with its URL and
// date; reported loops come from named pages; weak and strong openings are written by us and
// labelled as examples; counts shown on the page are computed from `loops`, never typed.

export interface Src {
  label: string
  url: string
}

/** Round types used to tag every round of every mapped loop (the chart counts these). */
export type RoundType =
  | 'recruiter'
  | 'screen'
  | 'written'
  | 'product-sense'
  | 'analytics'
  | 'strategy'
  | 'technical'
  | 'behavioural'
  | 'final'

export interface Loop {
  company: string
  level: string // e.g. "PM, Seattle"
  region: 'India' | 'US' | 'Global'
  kind: 'official' | 'reported'
  when: string // as the source states it, e.g. "May 2026", "undated"
  /** yyyy-mm of the interview or report when known; used to compute "newest report". */
  date?: string
  src: Src
  /** Rounds in order. `minutes` only when the source states it. */
  rounds: { name: string; type: RoundType; also?: RoundType[]; minutes?: number }[]
  /** True when the source lists only part of the loop (excluded from the "share of loops" chart). */
  partial?: boolean
}

export interface Evidence {
  who: string // e.g. "Amazon PM candidate, Seattle, May 2026"
  quote: string // verbatim, under 25 words
  src: Src
  official?: boolean
}

export interface TipRound {
  id: string
  type: RoundType
  name: string
  short: string // chart label
  minutes: string // e.g. "30–60 min", as reported
  tests: string // what it is scored on, in one or two sentences
  doThis: string[]
  avoid: string[]
  weak: string // a weak opening (our example)
  strong: string // a strong opening (our example)
  why: string // why the strong one scores better
  evidence: Evidence[]
  selfCheck: string[] // 3–4 items the reader ticks after a practice answer
  practice?: { label: string; href: string } // matching questions on the hub
}

export interface RoleInterviewTips {
  slug: string
  metaTitle: string // <= 60
  metaDescription: string // 150–160
  h1: string
  kicker: string
  directAnswer: string
  checked: string // yyyy-mm-dd
  loops: Loop[]
  rounds: TipRound[]
  india: { title: string; body: string; src?: Src }[]
  decision: { you: string; focus: string; firstStep: string; effort: 'High' | 'Medium' | 'Low' }[]
  week: { when: string; items: string[] }[]
  sources: Src[]
  faqs: { q: string; a: string }[]
}
