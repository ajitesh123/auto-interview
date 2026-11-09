// A course = an ordered set of lessons rendered by components/learnAi/LessonPage.tsx.
// Learn AI (/learn-ai) and the Paul Graham course (/paul-graham) both use it; each has its own
// URL base, progress key (localStorage) and wording.
import type { Lesson, Track } from '@/data/learnAi/types'
import { LESSONS, PLAN, TRACKS, getNeighbours, getTrack, lessonsByTrack } from '@/data/learnAi'

export type AnyLesson = Lesson<string>
export type AnyTrack = Track<string>

export interface CourseConfig {
  id: string
  /** Breadcrumb / nav label, e.g. "Learn AI" */
  name: string
  /** Name used in Course schema, e.g. "Learn AI: from your first prompt to building agents" */
  courseName: string
  basePath: string // '/learn-ai'
  storageKey: string // 'aiv:learnai'
  lessons: AnyLesson[]
  planned: number
  tracks: AnyTrack[]
  getTrack: (id: string) => AnyTrack
  getNeighbours: (slug: string) => { prev?: AnyLesson; next?: AnyLesson }
  lessonsByTrack: (id: string) => AnyLesson[]
  /** Shown under the short answer on every lesson (e.g. an "unofficial" note) */
  disclaimer?: string
  sourceSection: { kicker: string; title: string; sub: string }
  tryKicker: string
  tryTitle: string
  /** Text when the reader reaches the last lesson */
  endOfPath: string
  endCta: { kicker: string; title: string; body: string; href: string; label: string }
}

export const LEARN_AI_COURSE: CourseConfig = {
  id: 'learn-ai',
  name: 'Learn AI',
  courseName: 'Learn AI: from your first prompt to building agents',
  basePath: '/learn-ai',
  storageKey: 'aiv:learnai',
  lessons: LESSONS as AnyLesson[],
  planned: PLAN.length,
  tracks: TRACKS as AnyTrack[],
  getTrack: (id) => getTrack(id as Parameters<typeof getTrack>[0]) as AnyTrack,
  getNeighbours: (slug) => getNeighbours(slug),
  lessonsByTrack: (id) => lessonsByTrack(id as Parameters<typeof lessonsByTrack>[0]),
  sourceSection: {
    kicker: 'From the people who built it',
    title: 'Straight from the source',
    sub: 'The original idea, then the same idea taken apart, then how you use it today.',
  },
  tryKicker: 'Hands-on · 10 minutes or less',
  tryTitle: 'Try it',
  endOfPath: `More lessons are on the way (${PLAN.length} planned). Mark this one complete to keep your place.`,
  endCta: {
    kicker: 'Free · No signup to start',
    title: 'Going for an AI role? Practise the interview.',
    body: 'Talk to an AI interviewer about what you just learned and get feedback on every answer.',
    href: '/free-mock-interview',
    label: 'Start a free mock interview',
  },
}
