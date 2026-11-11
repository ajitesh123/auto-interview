// "Concepts to know before the interview" pages: /<role>/concepts
// One data file per role (data/roleConcepts/<slug>.ts) drives components/roleConcepts/ConceptsPage.tsx.
// Rules: every definition is one plain sentence; every worked example's numbers are computed
// (scripts or by hand, re-checked); every quote is copied from an opened page; question links
// point at questions that already live on the role hub (resolved from the hub data, so counts
// are computed, never typed).

export interface ConceptSource {
  label: string
  url: string
}

export interface ConceptExample {
  /** One line that sets up the example, e.g. "Two tables: 4 customers, 5 orders." */
  setup: string
  /** Optional input tables (small: at most 6 rows). */
  inputs?: { caption: string; head: string[]; rows: (string | number)[][] }[]
  /** Code shown in a block: SQL, Excel formula, DAX or Python. Lines ≤ 40 chars. */
  code?: { lang: 'sql' | 'excel' | 'dax' | 'python' | 'text'; text: string }
  /** The result as a small table. */
  result?: { caption: string; head: string[]; rows: (string | number)[][] }
  /** The one thing to notice in the result. */
  takeaway: string
}

/** A reference to a question on the role hub: question group id + index inside the group. */
export interface HubQuestionRef {
  group: string
  i: number
}

export interface Concept {
  id: string
  group: string // ConceptGroup id
  short: string // label for charts and links, ≤ 22 chars
  name: string
  /** One plain sentence a candidate could say out loud. */
  definition: string
  /** What the interviewer is checking when this comes up. */
  listensFor: string
  example: ConceptExample
  /** The most common mistake, in one or two sentences. */
  trap: string
  /** A short verbatim line from the primary source (under 25 words). */
  fromSource?: { quote: string; source: ConceptSource }
  /** Questions on the hub that test this concept. */
  askedIn: HubQuestionRef[]
  /** Learn more: our own lessons first, then the primary doc. */
  learn?: { label: string; href: string }[]
  /** Optional visual key rendered by the page template (charts that need a component). */
  visual?:
    | 'sql-order'
    | 'rank-compare'
    | 'lookup-compare'
    | 'import-dq'
    | 'simpson'
    | 'funnel'
    | 'chart-choice'
    | 'skew'
}

export interface ConceptGroup {
  id: string
  label: string
  blurb: string
}

export interface QuizItem {
  q: string
  options: string[]
  answer: number // index into options
  why: string
  concept: string // Concept id
}

export interface RoleConcepts {
  slug: string // role hub slug
  metaTitle: string // ≤ 60 chars
  metaDescription: string // 150–160 chars
  h1: string
  kicker: string
  directAnswer: string
  lastUpdated: string // YYYY-MM-DD
  groups: ConceptGroup[]
  concepts: Concept[]
  quiz: QuizItem[]
  faqs: { q: string; a: string }[]
  /** Forum lines from people describing what they were asked (verbatim, < 25 words). */
  voices?: { quote: string; who: string; url: string; date: string }[]
}
