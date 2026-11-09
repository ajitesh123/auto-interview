// The YC batch program registry. Week files (data/pgCourse/batch/weeks/week-<n>.ts, each
// `export const week: BatchWeek`) are picked up by scripts/pg-course/gen-batch.mjs, which writes
// registry.generated.ts. Order comes from each file's `week` number.
import type { BatchFramework, BatchWeek } from './types'
import { BATCH_WEEK_LIST } from './registry.generated'

export type { BatchWeek, BatchFramework }

export const BATCH_BASE = '/paul-graham/yc-batch'
export const BATCH_TOTAL_WEEKS = 12

export const PHASES: { n: 1 | 2 | 3; title: string; weeks: string; promise: string }[] = [
  {
    n: 1,
    title: 'Build and launch',
    weeks: '1–4',
    promise:
      'Pick the one number you will grow, talk to users and get a first version into real hands.',
  },
  {
    n: 2,
    title: 'Grow',
    weeks: '5–8',
    promise: 'Recruit users by hand, grow every week and fix what stops people coming back.',
  },
  {
    n: 3,
    title: 'Raise and Demo Day',
    weeks: '9–12',
    promise: 'Know if you are default alive, build your pitch and investor list, and present.',
  },
]

export const BATCH_WEEKS: BatchWeek[] = [...BATCH_WEEK_LIST].sort((a, b) => a.week - b.week)

const bySlug = new Map(BATCH_WEEKS.map((w) => [w.slug, w]))

export const getWeek = (slug: string): BatchWeek | undefined => bySlug.get(slug)

export const getWeekNeighbours = (slug: string): { prev?: BatchWeek; next?: BatchWeek } => {
  const i = BATCH_WEEKS.findIndex((w) => w.slug === slug)
  if (i < 0) return {}
  return { prev: BATCH_WEEKS[i - 1], next: BATCH_WEEKS[i + 1] }
}

export const weeksByPhase = (n: 1 | 2 | 3): BatchWeek[] => BATCH_WEEKS.filter((w) => w.phase === n)

export const getPhase = (n: number) => PHASES.find((p) => p.n === n) ?? PHASES[0]

/** Every framework across the program, in week order. */
export function allFrameworks(): { f: BatchFramework; week: BatchWeek }[] {
  return BATCH_WEEKS.flatMap((w) => w.frameworks.map((f) => ({ f, week: w })))
}

/** All assignment ids for a week (for progress ticks). */
export const assignmentIds = (w: BatchWeek) => w.assignments.map((a) => a.id)
