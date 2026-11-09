import type { AnyLesson, AnyTrack, CourseConfig } from '@/components/learnAi/course'
import {
  PG_LESSONS,
  PG_PLAN,
  PG_TRACKS,
  getPgNeighbours,
  getPgTrack,
  pgLessonsByTrack,
  type PgTrackId,
} from '@/data/pgCourse'

export const PG_DISCLAIMER =
  'Unofficial. Not affiliated with or endorsed by Paul Graham or Y Combinator. Every teaching links to the original essay or talk.'

export const PG_COURSE: CourseConfig = {
  id: 'paul-graham',
  name: 'Paul Graham course',
  courseName: 'Learn startups from Paul Graham: a free 6-month course',
  basePath: '/paul-graham',
  storageKey: 'aiv:pgcourse',
  lessons: PG_LESSONS as AnyLesson[],
  planned: PG_PLAN.length,
  tracks: PG_TRACKS as AnyTrack[],
  getTrack: (id) => getPgTrack(id as PgTrackId) as AnyTrack,
  getNeighbours: (slug) => getPgNeighbours(slug),
  lessonsByTrack: (id) => pgLessonsByTrack(id as PgTrackId),
  disclaimer: PG_DISCLAIMER,
  sourceSection: {
    kicker: 'In his own words',
    title: 'Straight from the source',
    sub: 'What Paul Graham or YC actually wrote or said, taken apart, then what to do with it this week.',
  },
  tryKicker: 'Do this week',
  tryTitle: 'Put it into practice',
  endOfPath:
    'You finished the course. Go back to the 6-month plan on the course page and tick off what you have done.',
  endCta: {
    kicker: 'Free · No signup to start',
    title: 'Pitching investors or a founder? Practise out loud.',
    body: 'Answer hard questions out loud with an AI interviewer and get feedback on every answer.',
    href: '/free-mock-interview',
    label: 'Start a free mock interview',
  },
}
