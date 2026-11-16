// STAR Answer Builder engine: pure functions, no AI, no network. The page's worked example and
// the client tool both run through this file, so every number on the page comes from one place.
//
// Sources for the targets (opened 16 Nov 2026):
//  - Time split S 20% / T 10% / A 60% / R 10%: MIT CAPD, "The STAR method for behavioral
//    interviews" https://capd.mit.edu/resources/the-star-method-for-behavioral-interviews
//  - "Answers can take one to two minutes": UMBC Career Center
//    https://careers.umbc.edu/students/interview/questions/star/
//  - "this shouldn't be longer than 1 ½ – 2 minutes": University of Reading Careers (updated 1 Aug 2023)
//    https://blogs.reading.ac.uk/careers/how-to-use-the-star-technique-in-a-graduate-job-interview
//  - Amazon: "typically lasting 2-3 minutes each" (aboutamazon.com, 8 Apr 2025)
//    https://aboutamazon.com/news/workplace/amazon-interview-guide
//  - Speaking rate: Yuan, Liberman & Cieri (Interspeech 2006), 196 wpm average across 2,438
//    US telephone conversations (range 111–291).
//    https://www.ldc.upenn.edu/sites/default/files/interspeech2006-towards-integrated-understanding.pdf

export type PartKey = 's' | 't' | 'a' | 'r'
export type Mode = 'standard' | 'amazon'
export type Status = 'pass' | 'warn' | 'fail'

export interface Story {
  id: string
  title: string
  tags: string[] // competency ids from questions.ts
  s: string
  t: string
  a: string
  r: string
  updated?: string // ISO date, set by the client when saved
}

export const PARTS: { key: PartKey; name: string; letter: string; target: number; hint: string }[] =
  [
    {
      key: 's',
      letter: 'S',
      name: 'Situation',
      target: 20,
      hint: 'Where and when, in one or two sentences. Only what the listener needs.',
    },
    {
      key: 't',
      letter: 'T',
      name: 'Task',
      target: 10,
      hint: 'What you were responsible for, and what made it hard.',
    },
    {
      key: 'a',
      letter: 'A',
      name: 'Action',
      target: 60,
      hint: 'What YOU did, step by step, and why. This is most of the answer.',
    },
    {
      key: 'r',
      letter: 'R',
      name: 'Result',
      target: 10,
      hint: 'What changed, with a number if you have one, and what you learned.',
    },
  ]

export const PACES = [
  { wpm: 130, label: 'Slow, 130 words a minute' },
  { wpm: 150, label: 'Calm, 150 words a minute (default)' },
  { wpm: 170, label: 'Quick, 170 words a minute' },
]
export const DEFAULT_WPM = 150

export const TARGETS: Record<Mode, { min: number; max: number; hardMax: number; label: string }> = {
  // UMBC "one to two minutes"; Reading "shouldn't be longer than 1½–2 minutes"
  standard: { min: 60, max: 120, hardMax: 150, label: '1 to 2 minutes' },
  // Amazon "typically lasting 2-3 minutes each"
  amazon: { min: 120, max: 180, hardMax: 210, label: '2 to 3 minutes (Amazon)' },
}

const I_WORDS = /\b(i|i'm|i’m|i've|i’ve|i'd|i’d|i'll|i’ll|me|my|myself)\b/gi
const WE_WORDS = /\b(we|we're|we’re|we've|we’ve|our|ourselves|the team)\b/gi
const US_WORD = /\bus\b/g // lowercase only, so "the US market" is not counted
export const HEDGES = [
  'basically',
  'kind of',
  'sort of',
  'actually',
  'literally',
  'i guess',
  'i think',
  'maybe',
  'somehow',
  'tried to',
  'helped with',
  'was involved in',
  'was part of',
  'pretty much',
  'a bit',
  'stuff like that',
]
// A digit (years like 2023 do not count), a currency sign or %, or a number word.
const NUMBER =
  /(\d|%|₹|\$|£|€|\b(two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|fifteen|twenty|thirty|forty|fifty|hundred|thousand|lakh|lakhs|crore|million|doubled|tripled|twice|halved)\b)/i
const YEAR = /\b(19|20)\d{2}\b/g
export function hasNumber(text: string): boolean {
  return NUMBER.test(text.replace(YEAR, ' '))
}
const REFLECTION =
  /\b(i learn(ed|t)?|i've learn(ed|t)|learned|learnt|my (key |biggest )?(learning|lesson|takeaway)|lesson|takeaway|next time|going forward|in (the )?future|i would (now|do it)|now i|since then|i still|taught me|changed how i|i realised|i realized)\b/i

export function words(text: string): number {
  const m = text.trim().match(/[\p{L}\p{N}][\p{L}\p{N}'’.%-]*/gu)
  return m ? m.length : 0
}

function count(re: RegExp, text: string): number {
  return (text.match(re) || []).length
}

export function hedgesIn(text: string): { word: string; n: number }[] {
  const low = ' ' + text.toLowerCase().replace(/[’]/g, "'") + ' '
  return HEDGES.map((w) => {
    const re = new RegExp(`(^|[^a-z])${w.replace(/ /g, '\\s+')}(?=[^a-z]|$)`, 'g')
    return { word: w, n: (low.match(re) || []).length }
  }).filter((h) => h.n > 0)
}

export interface Check {
  id: string
  title: string
  status: Status
  detail: string
}

export interface Analysis {
  words: Record<PartKey, number>
  totalWords: number
  seconds: number
  share: Record<PartKey, number> // whole percentages of the words
  iCount: number // in Action
  weCount: number // in Action
  hedges: { word: string; n: number }[]
  resultHasNumber: boolean
  hasReflection: boolean
  checks: Check[]
  passed: number
  empty: boolean
}

export function fmtTime(sec: number): string {
  const s = Math.round(sec)
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

export function analyse(
  story: Pick<Story, PartKey>,
  wpm = DEFAULT_WPM,
  mode: Mode = 'standard'
): Analysis {
  const w = {
    s: words(story.s),
    t: words(story.t),
    a: words(story.a),
    r: words(story.r),
  }
  const totalWords = w.s + w.t + w.a + w.r
  const seconds = totalWords ? (totalWords / wpm) * 60 : 0
  const pct = (n: number) => (totalWords ? Math.round((n / totalWords) * 100) : 0)
  const share = { s: pct(w.s), t: pct(w.t), a: pct(w.a), r: pct(w.r) }
  const iCount = count(I_WORDS, story.a)
  const weCount = count(WE_WORDS, story.a) + count(US_WORD, story.a)
  const all = [story.s, story.t, story.a, story.r].join(' ')
  const hedges = hedgesIn(all)
  const hedgeTotal = hedges.reduce((s, h) => s + h.n, 0)
  const resultHasNumber = hasNumber(story.r)
  const hasReflection = REFLECTION.test(story.r)
  const target = TARGETS[mode]
  const empty = totalWords === 0

  const checks: Check[] = []
  const missing = PARTS.filter((p) => w[p.key] === 0)
  checks.push({
    id: 'parts',
    title: 'All four parts are there',
    status: missing.length === 0 ? 'pass' : missing.length >= 2 ? 'fail' : 'warn',
    detail:
      missing.length === 0
        ? 'Situation, Task, Action and Result each have something.'
        : `Missing: ${missing.map((p) => p.name).join(', ')}.`,
  })

  const t = Math.round(seconds)
  const over = PARTS.filter((p) => p.key !== 'a')
    .map((p) => ({ name: p.name, by: share[p.key] - p.target }))
    .sort((x, y) => y.by - x.by)[0]
  const overPart = over && over.by > 0 ? `the ${over.name}` : 'the longest part'
  checks.push({
    id: 'length',
    title: `Length: ${target.label}`,
    status:
      t >= target.min && t <= target.max
        ? 'pass'
        : t > target.hardMax || t < target.min * 0.6
          ? 'fail'
          : 'warn',
    detail:
      t > target.max
        ? `About ${fmtTime(seconds)} out loud. Cut ${Math.ceil(((t - target.max) / 60) * wpm)} words, mostly from ${overPart}.`
        : t < target.min
          ? `About ${fmtTime(seconds)} out loud. Add ${Math.ceil(((target.min - t) / 60) * wpm)} words of what you did and why.`
          : `About ${fmtTime(seconds)} out loud at ${wpm} words a minute.`,
  })

  checks.push({
    id: 'action',
    title: 'Action is the biggest part (aim for about 60%)',
    status: share.a >= 50 ? 'pass' : share.a >= 35 ? 'warn' : 'fail',
    detail: `Action is ${share.a}% of your words (word share stands in for time). MIT CAPD suggests about 60%.`,
  })

  const setup = share.s + share.t
  checks.push({
    id: 'setup',
    title: 'Short set-up (Situation + Task about 30%)',
    status: setup <= 35 ? 'pass' : setup <= 45 ? 'warn' : 'fail',
    detail: `Situation and Task are ${setup}% of your words. Long set-ups use up the time interviewers want for your actions.`,
  })

  checks.push({
    id: 'owner',
    title: 'You say what YOU did ("I" at least as often as "we")',
    status: iCount >= 2 && iCount >= weCount ? 'pass' : iCount >= 1 ? 'warn' : 'fail',
    detail: `In Action: "I/my/me" ${iCount} time${iCount === 1 ? '' : 's'}, "we/our/us/the team" ${weCount} time${weCount === 1 ? '' : 's'}.`,
  })

  checks.push({
    id: 'number',
    title: 'The result has a number',
    status: resultHasNumber ? 'pass' : 'warn',
    detail: resultHasNumber
      ? 'Your Result includes a number or amount.'
      : 'No number in the Result. Add one you can defend: time saved, %, ₹, users, rank, deadline met.',
  })

  checks.push({
    id: 'learn',
    title: 'You close with what you learned',
    status: hasReflection ? 'pass' : 'warn',
    detail: hasReflection
      ? 'Your Result says what you learned or would do next time.'
      : 'Add one line on what you learned. Microsoft asks for it (its STAR(R) adds Reflection).',
  })

  checks.push({
    id: 'hedge',
    title: 'Few hedge words',
    status: hedgeTotal <= 1 ? 'pass' : hedgeTotal <= 3 ? 'warn' : 'fail',
    detail: hedgeTotal
      ? `Found: ${hedges.map((h) => (h.n > 1 ? `"${h.word}" ×${h.n}` : `"${h.word}"`)).join(', ')}.`
      : 'No "basically", "kind of", "tried to", "helped with" and the like.',
  })

  return {
    words: w,
    totalWords,
    seconds,
    share,
    iCount,
    weCount,
    hedges,
    resultHasNumber,
    hasReflection,
    checks,
    passed: checks.filter((c) => c.status === 'pass').length,
    empty,
  }
}

/** Speaker notes: the first sentence of each part, so you remember the story, not a script. */
export function speakerNotes(story: Pick<Story, PartKey | 'title'>): string {
  const first = (t: string) => {
    const s = t.trim().split(/(?<=[.!?])\s+/)[0] || ''
    return s.length > 140 ? s.slice(0, 137) + '…' : s
  }
  return [
    story.title ? story.title.toUpperCase() : 'MY STORY',
    ...PARTS.map((p) => `${p.letter}: ${first(story[p.key]) || '—'}`),
  ].join('\n')
}
