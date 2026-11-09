// "Learn startups from Paul Graham": an unofficial, free course built only from what Paul Graham
// and Y Combinator have actually written and said (essays on paulgraham.com, YC talks, Startup
// School, YC's own pages, interviews and podcasts). Hub: /paul-graham. Lessons: /paul-graham/<slug>.
// Not affiliated with, or endorsed by, Paul Graham or Y Combinator.
//
// Rules (stricter than Learn AI):
// - Every teaching is traced to a specific essay, talk or interview, linked and dated. Paraphrase;
//   direct quotes under 25 words, in quotation marks, attributed. Never invent a quote.
// - Concrete, practical, specific: what he actually told founders to do, with the examples he used.
// - No generic startup advice that cannot be traced to PG or YC.
import type { Lesson, Track } from '@/data/learnAi/types'

export type PgTrackId = 'ideas' | 'build' | 'founder' | 'money' | 'yc'
export type PgTrack = Track<PgTrackId>
export type PgLesson = Lesson<PgTrackId>

/** One month of the 6-month plan: "if Paul Graham mentored you for six months". */
export interface PlanMonth {
  month: number // 1..6
  theme: string // e.g. "Find the idea"
  goal: string // what is true at the end of the month
  lessons: string[] // lesson slugs to study this month
  actions: { id: string; text: string; why: string; source: { label: string; url: string } }[] // 4–6 weekly actions
  checkpoint: string // the test PG/YC would use to say you are on track, sourced
}
