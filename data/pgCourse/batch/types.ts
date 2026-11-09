// "The YC batch, week by week, and how to run it yourself": /paul-graham/yc-batch (hub) and
// /paul-graham/yc-batch/week-<n> (12 weeks). Rahul, Nov 9: "a lot of content should be on what
// happens inside the YC batch... week on week... if someone is not joining YC but wants to do it
// on their own through this platform, they should be able to... if they explain a framework, you
// have to explain it as well... everything should be over here."
//
// Rules: YC does not publish a day-by-day calendar. Every "at YC" claim is sourced and labelled
// `documented` (YC's own pages, partners, PG) or `reported` (founders' public accounts of their
// batch, named). Frameworks are explained fully on our page (not just linked), credited to who
// teaches them, with a worked example. Paraphrase; quotes under 25 words. Unofficial, not
// affiliated with YC.
import type { LessonVideo } from '@/data/learnAi/types'

export interface BatchSource {
  label: string
  url: string
}

export interface BatchFramework {
  name: string // e.g. "The weekly update", "How to talk to users (the Mom Test questions YC teaches)"
  who: string // who teaches it, e.g. "Eric Migicovsky, YC partner (Startup School 2019)"
  source: BatchSource
  explain: string[] // 2–4 short paragraphs: what it is and why YC teaches it
  steps: string[] // how to do it, step by step
  example?: { label: string; text: string } // a worked example (illustrative, labelled as such)
}

export interface BatchWeek {
  week: number // 1..12
  slug: string // "week-1"
  phase: 1 | 2 | 3 // 1 = Weeks 1–4 build + launch, 2 = Weeks 5–8 grow, 3 = Weeks 9–12 raise + Demo Day
  title: string // short nav label, e.g. "Kickoff and your one number"
  metaTitle: string // <= 60 chars
  metaDescription: string // 150–160 chars
  h1: string
  tldr: string // 2–3 sentences: what happens at YC this week and what you do
  minutes: number // reading + watching time (the doing takes the week)
  atYc: {
    body: string[] // 2–4 short paragraphs: what happens inside YC around this point of the batch
    confidence: 'documented' | 'reported' // documented by YC/partners/PG, or reported by named founders
    sources: BatchSource[]
  }
  /**
   * This week's challenge (Rahul, Nov 9: "like a challenge... do you want to start this challenge?
   * each week a challenge"). One hard, specific, YC-style goal for the week, based on what YC
   * founders are pushed to do at this point of the batch.
   */
  challenge: {
    name: string // e.g. "The 10 conversations challenge"
    task: string // 1–2 sentences: exactly what to do by the end of the week
    proof: string // how you know you passed (a number, an artefact, a sent update)
    basis: string // 1 sentence: which YC practice this comes from, named source
  }
  frameworks: BatchFramework[] // 1–2, explained fully
  videos: LessonVideo[] // 1–2 YC talks for this week (oEmbed-verified)
  assignments: { id: string; text: string; why: string; done: string }[] // 4–6; `done` = definition of done
  officeHours: { q: string; why: string }[] // 4–6 questions a YC partner would ask this week, each with why
  weeklyUpdate: { metric: string; prompt: string } // what to report in this week's update
  checkpoint: string // the bar to clear before next week, sourced in `sources`
  /**
   * Weeks 11–12 only (optional): turns on the on-page pitch builder. `seconds` is the spoken length
   * to aim for and `note` says where that target comes from (e.g. YC's Demo Day pitch length),
   * with its source. If absent on week 11/12, the builder still shows with a 60-second default
   * and a neutral note.
   */
  pitchTarget?: { seconds: number; note: string; source?: BatchSource }
  faqs: { q: string; a: string }[] // 2–3
  sources: BatchSource[] // every page opened for this week
}
