// "Tell me about yourself" answer builder engine: pure functions, no AI, no network. The page's
// worked example and the client tool both run through this file, so every number on the page
// comes from one place.
//
// Sources for the rules (all opened 22 Nov 2026):
//  - Length 30–60 s: Grow with Google, interview prep (11 Dec 2025)
//    https://grow.google/certificates/interview-warmup/
//  - Length 60–90 s max: Tufts University Alumni (22 Dec 2025)
//    https://alumniandfriends.tufts.edu/news/how-answer-tell-me-about-yourself-interview-question
//  - Length 30–90 s, "two minutes … can start to feel like too much"; past-present-future:
//    Penn Career Services (2 Apr 2026)
//    https://careerservices.upenn.edu/blog/2026/04/02/how-to-answer-tell-me-about-yourself/
//  - "Keep your answer under two minutes"; "not looking for your life story": nidirect (UK gov,
//    modified 1 Oct 2024) https://www.nidirect.gov.uk/articles/common-interview-questions
//  - "NOT an opportunity to narrate your resume"; trim past two minutes: Grinnell College
//    https://career.grinnell.edu/?p=115977
//  - Present-past-future: PennWest Career Center (27 Feb 2026), Brandeis (adapted from The Muse)
//  - "irrelevant personal information is not necessary": Ohio State Engineering Career Services
//  - Comfortable pace 150–160 wpm: University of Melbourne Academic Skills, "Speaking clearly"
//    https://students.unimelb.edu.au/academic-skills/communication-skills-study-assessment/oral-assessments/speaking-clearly

import { hedgesIn, words } from '@/data/starMethod/engine'

export { words }

export type PartKey = 'present' | 'past' | 'future'
export type Order = 'present-first' | 'past-first'
export type Length = 'short' | 'standard'
export type Stage = 'fresher' | 'experienced' | 'switcher'
export type Status = 'pass' | 'warn' | 'fail'

export interface Answer {
  stage: Stage
  role: string
  company: string
  skills: string // comma separated, from the job post
  present: string
  past: string
  future: string
}

export const PARTS: Record<
  PartKey,
  { name: string; ask: string; hint: Record<Stage, string>; placeholder: Record<Stage, string> }
> = {
  present: {
    name: 'Present',
    ask: 'Who you are now',
    hint: {
      fresher: 'Your degree or final year, and the one strength this job needs.',
      experienced: 'Your current role, team and what you own, in one or two sentences.',
      switcher: 'What you do now, said in words the new field uses.',
    },
    placeholder: {
      fresher: "I'm a final-year B.Tech student in … and I've spent most of this year on …",
      experienced: "I'm a … at …, where I own …",
      switcher: "I've been a … for … years, and the part of the job I'm best at is …",
    },
  },
  past: {
    name: 'Past',
    ask: 'Proof: one or two things you did',
    hint: {
      fresher: 'An internship, project, fest or part-time job, with one number you can defend.',
      experienced: 'One or two results that match this job, each with a number.',
      switcher: 'The work that already looks like the new job, with a number.',
    },
    placeholder: {
      fresher: 'In my internship at …, I built … which cut … from … to …',
      experienced: 'Before that, I … and the result was …',
      switcher: 'Last year I … which …',
    },
  },
  future: {
    name: 'Future',
    ask: 'Why this job, now',
    hint: {
      fresher: 'Why this role and this company, tied to what you just said.',
      experienced: 'What you want next and why this role is it.',
      switcher: 'Why you are moving, and why this role is the right first step.',
    },
    placeholder: {
      fresher: "That's why this … role at … appeals to me: …",
      experienced: "Now I'm looking for … which is why this role …",
      switcher: "I'm moving into … because … and this role lets me …",
    },
  },
}

export const ORDERS: Record<Order, { label: string; keys: PartKey[]; who: string }> = {
  'present-first': {
    label: 'Present → Past → Future',
    keys: ['present', 'past', 'future'],
    who: 'PennWest, Brandeis (from The Muse)',
  },
  'past-first': {
    label: 'Past → Present → Future',
    keys: ['past', 'present', 'future'],
    who: 'Penn, Grinnell, Tufts',
  },
}

export const LENGTHS: Record<
  Length,
  { label: string; min: number; max: number; hardMax: number; who: string }
> = {
  short: {
    label: '30 to 60 seconds',
    min: 30,
    max: 60,
    hardMax: 80,
    who: 'Grow with Google: “a succinct 30-60 second professional pitch”',
  },
  standard: {
    label: '60 to 90 seconds',
    min: 60,
    max: 90,
    hardMax: 120,
    who: 'Tufts: “60 to 90 seconds max”; nidirect and Grinnell: under 2 minutes',
  },
}

export const PACES = [
  { wpm: 130, label: 'Slow, 130 words a minute' },
  { wpm: 150, label: 'Calm, 150 words a minute (default)' },
  { wpm: 170, label: 'Quick, 170 words a minute' },
]
export const DEFAULT_WPM = 150

// Life-story details the guidance says to leave out (nidirect, Ohio State, Warwick). Patterns
// need context so "a single dashboard", "Bachelor of Engineering", "I come from a finance
// background" or "we placed 12th" are not flagged. Naukri does suggest one clause on where you
// are from, so hometown alone is only a "Fix", never "Fix first".
export const PERSONAL: { re: RegExp; label: string }[] = [
  { re: /\b\d{1,2}\s*(years?|yrs?)\s*old\b/i, label: 'your age' },
  { re: /\bborn (in|on)\b/i, label: 'where or when you were born' },
  {
    re: /\bmy (father|mother|dad|mom|mum|parents|family|brother|sister|siblings|husband|wife)\b/i,
    label: 'your family',
  },
  {
    re: /\b(i am|i'm|i’m) (married|unmarried|single)\b|\bmarital status\b/i,
    label: 'marital status',
  },
  {
    re: /\b([Nn]ative place|[Hh]ometown|[Ii] hail from)\b|\b[Ii](?:'m|’m| am) (?:originally )?from [A-Z][a-z]+|\b[Ii] belong to [A-Z][a-z]+/,
    label: 'your hometown',
  },
  {
    re: /\b(my hobbies|hobbies (are|include)|in my free time|in my spare time)\b/i,
    label: 'hobbies',
  },
  { re: /\b(religion|caste|date of birth|d\.o\.b)\b/i, label: 'religion, caste or date of birth' },
  {
    re: /\b(10th|12th)\s*(class|std|standard|board|grade|marks|percentage)\b|\bin (10th|12th)\b|\bclass (x|xii|10|12)\b|\b(cbse|icse|hsc)\b|\bboard exams?\b/i,
    label: 'school marks',
  },
]

export function personalIn(text: string): { label: string; match: string }[] {
  return PERSONAL.flatMap((p) => {
    const m = text.match(p.re)
    return m ? [{ label: p.label, match: m[0] }] : []
  })
}

// A four-digit number counts as a year only with date context ("in 2022", "since 2019",
// "batch of 2025", "2022–24"), so "2000 requests a minute" stays a number.
const YEAR_CTX =
  /\b(?:in|since|from|until|till|by|during|of|batch|year)\s+(19[89]\d|20[0-3]\d)\b|\b(19[89]\d|20[0-3]\d)\s*[–-]\s*\d{2,4}\b/gi
export function yearsIn(text: string): string[] {
  const out: string[] = []
  for (const m of text.matchAll(YEAR_CTX)) out.push(m[1] || m[2])
  return out
}
const NUMBER_RE =
  /(\d|%|₹|\$|£|€|\b(two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|fifteen|twenty|thirty|forty|fifty|hundred|thousand|lakh|lakhs|crore|million|doubled|tripled|twice|halved|half)\b)/i
export function numberIn(text: string): boolean {
  return NUMBER_RE.test(text.replace(YEAR_CTX, ' '))
}

const FIT_WORDS =
  /\b(this (role|job|position|team|opportunity|opening|company|organisation|organization|firm)|your (team|company|product|customers|clients|firm|bank|platform|organisation|organization|mission)|here at|join(ing)? (you|your|the team))\b/i

function skillList(skills: string): string[] {
  return skills
    .split(/[,\n;]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .slice(0, 6)
}

// Short skills (R, C, Go, SQL) match case-sensitively so "go" the verb does not count as Go.
function mentions(text: string, phrase: string): boolean {
  const p = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+')
  const cs = phrase.length <= 3
  return new RegExp(`(^|[^A-Za-z0-9+#])${p}(?![A-Za-z0-9+#])`, cs ? '' : 'i').test(text)
}

/** The first sentence of a part, trimmed. */
const ABBR =
  /(?:\b[A-Z]|\b(?:e\.g|i\.e|Rs|Mr|Mrs|Ms|Dr|vs|etc|Sc|Tech|Com|Ltd|Inc|St|No|approx|Pvt|Co|Corp|Jr|Sr|Prof|Govt|Dept))\.$/i
export function firstSentence(t: string): string {
  const parts = t.trim().split(/(?<=[.!?])\s+(?=[A-Z0-9"“'‘(])/)
  let out = parts[0] || ''
  for (let i = 1; i < parts.length && ABBR.test(out); i++) out += ' ' + parts[i]
  return out.trim()
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
  share: Record<PartKey, number>
  checks: Check[]
  passed: number
  text: string // the full answer in the chosen order
  short: string // first sentence of each part
  shortWords: number
  shortSeconds: number
  empty: boolean
}

export function fmtSec(sec: number): string {
  const s = Math.round(sec)
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

export function analyse(
  a: Answer,
  order: Order = 'present-first',
  length: Length = 'standard',
  wpm = DEFAULT_WPM
): Analysis {
  const keys = ORDERS[order].keys
  const w = { present: words(a.present), past: words(a.past), future: words(a.future) }
  const totalWords = w.present + w.past + w.future
  const seconds = totalWords ? (totalWords / wpm) * 60 : 0
  const pct = (n: number) => (totalWords ? Math.round((n / totalWords) * 100) : 0)
  const share = { present: pct(w.present), past: pct(w.past), future: pct(w.future) }
  const text = keys
    .map((k) => a[k].trim())
    .filter(Boolean)
    .join(' ')
  const short = keys
    .map((k) => firstSentence(a[k]))
    .filter(Boolean)
    .join(' ')
  const shortWords = words(short)
  const shortSeconds = shortWords ? (shortWords / wpm) * 60 : 0
  const L = LENGTHS[length]
  const checks: Check[] = []

  const missing = keys.filter((k) => w[k] === 0)
  checks.push({
    id: 'parts',
    title: 'Present, past and future are all there',
    status: missing.length === 0 ? 'pass' : missing.length >= 2 ? 'fail' : 'warn',
    detail:
      missing.length === 0
        ? 'Who you are, what you have done, and why this job.'
        : `Missing: ${missing.map((k) => PARTS[k].name).join(', ')}.`,
  })

  const t = Math.round(seconds)
  const biggest = keys.slice().sort((x, y) => w[y] - w[x])[0]
  checks.push({
    id: 'length',
    title: `Length: ${L.label}`,
    status: t >= L.min && t <= L.max ? 'pass' : t > L.hardMax || t < L.min * 0.6 ? 'fail' : 'warn',
    detail:
      t > L.max
        ? `About ${fmtSec(seconds)} out loud. Cut ${Math.ceil(((t - L.max) / 60) * wpm)} words, starting with the ${PARTS[biggest].name}.`
        : t < L.min
          ? `About ${fmtSec(seconds)} out loud. Add ${Math.ceil(((L.min - t) / 60) * wpm)} words: a result with a number, or why this role.`
          : `About ${fmtSec(seconds)} out loud at ${wpm} words a minute.`,
  })

  const personal = personalIn(text)
  checks.push({
    id: 'personal',
    title: 'No life story (age, family, hometown, school marks)',
    status: personal.length === 0 ? 'pass' : personal.length >= 2 ? 'fail' : 'warn',
    detail: personal.length
      ? `Mentions ${personal.map((p) => `${p.label} (“${p.match}”)`).join(', ')}. nidirect: “The interviewer is not looking for your life story.”${
          personal.length === 1 && personal[0].label === 'your hometown'
            ? ' Naukri allows one clause on where you are from; keep it to that.'
            : ''
        }`
      : 'Nothing personal that the job does not need.',
  })

  const years = new Set(yearsIn(text))
  checks.push({
    id: 'recital',
    title: 'A story, not your resume read aloud',
    status: years.size <= 1 ? 'pass' : years.size === 2 ? 'warn' : 'fail',
    detail:
      years.size <= 1
        ? 'No year-by-year walk through your CV.'
        : `${years.size} different years (${[...years].sort().join(', ')}). Pick the one or two things that matter for this job instead of going in date order.`,
  })

  const pastNum = numberIn(a.past)
  checks.push({
    id: 'number',
    title: 'Your proof has a number',
    status: pastNum ? 'pass' : 'warn',
    detail: pastNum
      ? 'Your Past part includes a number, amount or result.'
      : 'Add one number you can defend: users, ₹ or $, %, time saved, rank, people led.',
  })

  const fitRole = a.role.trim() ? mentions(a.future, a.role.trim()) : false
  const fitCo = a.company.trim() ? mentions(a.future, a.company.trim()) : false
  const fitWords = FIT_WORDS.test(a.future)
  const fit = fitRole || fitCo || fitWords
  checks.push({
    id: 'fit',
    title: 'You end on this job',
    status: fit ? 'pass' : w.future ? 'warn' : 'fail',
    detail: fit
      ? `Your Future part names ${fitRole ? 'the role' : fitCo ? 'the company' : 'this job, company or team'}.`
      : 'Close by linking back to this role or company (Penn Career Services).',
  })

  const sk = skillList(a.skills)
  const hit = sk.filter((s) => mentions(text, s))
  const need = Math.min(2, sk.length)
  checks.push({
    id: 'skills',
    title: 'Skills from the job post show up',
    status: sk.length === 0 ? 'warn' : hit.length >= need ? 'pass' : hit.length ? 'warn' : 'fail',
    detail:
      sk.length === 0
        ? 'Paste 2 to 5 skills from the job post above to check this.'
        : `${hit.length} of ${sk.length} used${hit.length ? `: ${hit.join(', ')}` : ''}.${
            hit.length < sk.length
              ? ` Not yet: ${sk.filter((s) => !hit.includes(s)).join(', ')}.`
              : ''
          }`,
  })

  const hedges = hedgesIn(text)
  const hedgeTotal = hedges.reduce((s, h) => s + h.n, 0)
  checks.push({
    id: 'hedge',
    title: 'Few hedge words',
    status: hedgeTotal <= 1 ? 'pass' : hedgeTotal <= 3 ? 'warn' : 'fail',
    detail: hedgeTotal
      ? `Found: ${hedges.map((h) => (h.n > 1 ? `“${h.word}” ×${h.n}` : `“${h.word}”`)).join(', ')}.`
      : 'No “basically”, “kind of”, “tried to”, “helped with” and the like.',
  })

  return {
    words: w,
    totalWords,
    seconds,
    share,
    checks,
    passed: checks.filter((c) => c.status === 'pass').length,
    text,
    short,
    shortWords,
    shortSeconds,
    empty: totalWords === 0,
  }
}
