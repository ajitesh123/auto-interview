// Paul Graham course registry. Lesson files are picked up by scripts/pg-course/gen-index.mjs
// (writes registry.generated.ts); order on the site comes from PG_PLAN in tracks.ts.
import type { LessonVideo } from '@/data/learnAi/types'
import type { PgLesson, PgTrackId } from './types'
import { PG_PLAN, PG_TRACKS } from './tracks'
import { PG_LESSON_LIST } from './registry.generated'

export { PG_PLAN, PG_TRACKS }
export type { PgLesson, PgTrackId }

const bySlug = new Map(PG_LESSON_LIST.map((l) => [l.slug, l]))

/** Published lessons, in PG_PLAN order, numbered 1..N (only plan slugs that have a file). */
export const PG_LESSONS: PgLesson[] = PG_PLAN.filter((p) => bySlug.has(p.slug)).map((p, i) => ({
  ...(bySlug.get(p.slug) as PgLesson),
  track: p.track,
  order: i + 1,
}))

const index = new Map(PG_LESSONS.map((l, i) => [l.slug, i]))

export const getPgLesson = (slug: string): PgLesson | undefined => {
  const i = index.get(slug)
  return i === undefined ? undefined : PG_LESSONS[i]
}

export const getPgNeighbours = (slug: string): { prev?: PgLesson; next?: PgLesson } => {
  const i = index.get(slug)
  if (i === undefined) return {}
  return { prev: PG_LESSONS[i - 1], next: PG_LESSONS[i + 1] }
}

export const pgLessonsByTrack = (track: PgTrackId): PgLesson[] =>
  PG_LESSONS.filter((l) => l.track === track)

export const getPgTrack = (track: PgTrackId) =>
  PG_TRACKS.find((t) => t.id === track) ?? PG_TRACKS[0]

export const PG_TOTAL_MINUTES = PG_LESSONS.reduce((n, l) => n + l.minutes, 0)

/** Distinct paulgraham.com essays cited across all lessons (sources + fromTheSource). */
export function pgEssays(): { label: string; url: string; lessons: PgLesson[] }[] {
  const map = new Map<string, { label: string; url: string; lessons: PgLesson[] }>()
  const norm = (u: string) =>
    u
      .replace(/^http:/, 'https:')
      .replace('://www.', '://')
      .replace(/#.*$/, '')
  for (const l of PG_LESSONS) {
    const items = [
      ...l.sources.map((s) => ({ label: s.label, url: s.url })),
      ...(l.fromTheSource ?? []).map((s) => ({ label: s.work, url: s.url })),
    ]
    for (const it of items) {
      if (!/paulgraham\.com\/[a-z0-9]+\.html/i.test(it.url)) continue
      const k = norm(it.url)
      const e = map.get(k)
      if (e) {
        if (!e.lessons.includes(l)) e.lessons.push(l)
      } else map.set(k, { label: it.label, url: it.url, lessons: [l] })
    }
  }
  return [...map.values()].sort((a, b) => b.lessons.length - a.lessons.length)
}

/** Course videos, deduped; Y Combinator and Paul Graham talks first. */
export function pgVideos(limit = 8): (LessonVideo & { lesson: PgLesson })[] {
  const seen = new Set<string>()
  const all: (LessonVideo & { lesson: PgLesson })[] = []
  for (const l of PG_LESSONS)
    for (const v of l.videos)
      if (!seen.has(v.youtubeId)) {
        seen.add(v.youtubeId)
        all.push({ ...v, lesson: l })
      }
  const rank = (v: LessonVideo) =>
    /paul graham/i.test(v.title) ? 0 : /y combinator/i.test(v.channel) ? 1 : 2
  return all
    .map((v, i) => ({ v, i }))
    .sort((a, b) => rank(a.v) - rank(b.v) || a.i - b.i)
    .slice(0, limit)
    .map(({ v }) => v)
}
