// Learn AI: a free, step-by-step path from "what is AI?" to building agents and coding with AI.
// Hub: /learn-ai. Lessons: /learn-ai/<slug>. One file per lesson in data/learnAi/lessons/.
// Rules: every fact and number from an opened source (listed in `sources`); YouTube IDs verified;
// short, breathable steps; plain English for beginners; no hype words.

export type TrackId = 'foundations' | 'use' | 'build' | 'automate' | 'deeper'

export interface Track<T extends string = TrackId> {
  id: T
  n: number
  title: string // e.g. "Understand AI"
  promise: string // one line: what you can do after this track
}

export interface LessonVideo {
  youtubeId: string // verified with YouTube oEmbed
  title: string // exact title from YouTube
  channel: string
  minutes?: number // leave out when YouTube does not show the duration
  why: string // one line: why watch this, and what to focus on
  start?: number // optional start time in seconds
}

export interface LessonStep {
  heading: string // short, question or action shaped, e.g. "So what does an LLM actually do?"
  body: string[] // 1–3 short paragraphs (2–4 sentences each)
  bullets?: string[] // optional, 3–5 short bullets
  /** A worked example: a prompt, an output, a mini calculation, or a short code/config snippet */
  example?: { label: string; text: string; code?: boolean }
  /** A simple left-to-right flow, rendered as boxes with arrows, e.g. ["Your question", "Tokens", "Model", "Next token"] */
  flow?: string[]
  /** One-line takeaway shown in a highlighted box */
  keyIdea?: string
  /** A real workflow shown end to end: the input, each step, the output (Rahul, 11 Nov 2026) */
  workflow?: LessonWorkflow
  /** A chart or table from the visuals kit (components/viz), with its source and date */
  visual?: LessonVisual
}

export interface LessonWorkflow {
  title: string // e.g. "Worked workflow: October revenue by region"
  input: string // what you start with
  steps: { title: string; detail: string; code?: string }[] // 3–6 steps
  output: string // what you end with, with the real numbers
}

export interface LessonVisualSource {
  label: string
  url: string
}

/** Visuals kit inside a lesson step. Every value comes from an opened source or our own computed example. */
export type LessonVisual =
  | {
      kind: 'bars'
      label: string // kicker, e.g. "SpreadsheetBench · 912 tasks"
      title: string // the finding
      rows: { label: string; value: number; display?: string; note?: string; highlight?: boolean }[]
      format?: { prefix?: string; suffix?: string; decimals?: number }
      emphasis?: boolean
      sort?: boolean
      max?: number
      note?: string
      source: LessonVisualSource[]
      updated: string
    }
  | {
      kind: 'columns'
      label: string
      title: string
      series: string[] // 1–3 names, in value order
      groups: { label: string; values: number[] }[]
      format?: { prefix?: string; suffix?: string; decimals?: number }
      note?: string
      source: LessonVisualSource[]
      updated: string
    }
  | {
      kind: 'compare'
      label: string
      title: string
      corner?: string
      columns: { name: string; sub?: string; href?: string }[]
      rows: { label: string; cells: (string | boolean | null)[] }[]
      note?: string
      source: LessonVisualSource[]
      updated: string
    }

/**
 * "Straight from the source": the original idea from the person or team who made it
 * (a paper author, Karpathy, Anthropic/OpenAI founders and researchers), shown as
 * Understand -> Break it down -> Use it. Paraphrase; any direct quote is under 25 words
 * and in quotation marks. The url must be the primary source (paper, talk, essay, post).
 */
export interface FromTheSource {
  who: string // e.g. "Andrej Karpathy"
  role: string // why they matter, e.g. "OpenAI founding member, former Tesla AI director"
  work: string // e.g. "Intro to Large Language Models (talk, 2023)"
  url: string
  idea: string // 1–2 sentences: what they actually said or showed
  breakdown: string[] // 2–4 short bullets: the idea taken apart, plain English
  use: string // 1–2 sentences: how a beginner uses this idea today
}

export interface Lesson<T extends string = TrackId> {
  slug: string // url segment, e.g. "what-is-an-llm"
  track: T
  order: number // global order across the whole path, 1..N
  title: string // short label for navigation, e.g. "What is an LLM?"
  metaTitle: string // <= 60 chars, matches how people search, e.g. "What Is an LLM? Large Language Models Explained Simply"
  metaDescription: string // 150–160 chars
  h1: string
  tldr: string // 2–3 sentences, the direct answer first
  minutes: number // honest reading + doing time
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  steps: LessonStep[] // 3–6 steps, each one idea
  keyTerms: { term: string; meaning: string }[] // 3–6 plain-English definitions
  videos: LessonVideo[] // 1–2 best videos for this lesson
  tryIt: { title: string; steps: string[]; link?: { label: string; url: string } } // a hands-on task, 10 minutes or less
  check: { q: string; options: string[]; answer: number; why: string }[] // exactly 3 self-check questions
  sources: { label: string; url: string }[] // every source opened while writing
  faqs: { q: string; a: string }[] // 3 real questions people search
  related?: { label: string; href: string }[] // other site pages, e.g. /ai-engineer, /aipm, /free-resources#ai-skills
  fromTheSource?: FromTheSource[] // 1–2 original ideas from the people who built this
  /** Optional interactive tool rendered before "Try it" (no AI, runs in the browser) */
  widget?: 'moe-calculator' | 'spot-the-mistake'
}
