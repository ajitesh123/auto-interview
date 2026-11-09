import type { PgTrack, PgTrackId } from './types'

export const PG_TRACKS: PgTrack[] = [
  {
    id: 'ideas',
    n: 1,
    title: 'Find an idea worth building',
    promise:
      'Notice startup ideas the way Paul Graham says the best founders do, and avoid the mistakes that kill startups.',
  },
  {
    id: 'build',
    n: 2,
    title: 'Make something people want',
    promise: 'Launch early, do things that do not scale, talk to users and grow every week.',
  },
  {
    id: 'founder',
    n: 3,
    title: 'Become the founder YC looks for',
    promise: 'Build the determination, judgment and habits of thought PG looks for in founders.',
  },
  {
    id: 'money',
    n: 4,
    title: 'Survive and raise money',
    promise: 'Know if you are default alive, and raise money the way PG and YC advise.',
  },
  {
    id: 'yc',
    n: 5,
    title: 'Inside Y Combinator',
    promise: 'What YC actually does in a batch, how to get in, and what its founders did right.',
  },
]

/** Course order. Site numbering comes from this list. */
export const PG_PLAN: { slug: string; track: PgTrackId; title: string }[] = [
  { slug: 'how-to-get-startup-ideas', track: 'ideas', title: 'How to get startup ideas' },
  { slug: 'make-something-people-want', track: 'ideas', title: 'Make something people want' },
  { slug: 'mistakes-that-kill-startups', track: 'ideas', title: 'The mistakes that kill startups' },
  { slug: 'do-things-that-dont-scale', track: 'build', title: "Do things that don't scale" },
  { slug: 'launch-and-talk-to-users', track: 'build', title: 'Launch early and talk to users' },
  { slug: 'startup-equals-growth', track: 'build', title: 'Startup = growth' },
  { slug: 'what-makes-a-great-founder', track: 'founder', title: 'What makes a great founder' },
  { slug: 'cofounders', track: 'founder', title: 'Cofounders' },
  { slug: 'founder-mode', track: 'founder', title: 'Founder mode' },
  { slug: 'how-to-do-great-work', track: 'founder', title: 'How to do great work' },
  { slug: 'how-to-think-clearly', track: 'founder', title: 'Think and write clearly' },
  { slug: 'default-alive-or-dead', track: 'money', title: 'Default alive or default dead' },
  { slug: 'how-to-raise-money', track: 'money', title: 'How to raise money' },
  { slug: 'what-happens-at-yc', track: 'yc', title: 'What happens inside a YC batch' },
  { slug: 'how-to-get-into-yc', track: 'yc', title: 'How to get into YC' },
  { slug: 'yc-founder-stories', track: 'yc', title: 'What the first YC founders did' },
  { slug: 'yc-essential-startup-advice', track: 'yc', title: "YC's essential startup advice" },
]
