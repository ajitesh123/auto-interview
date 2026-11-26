// "Why should we hire you?" answer builder engine: pure functions, no AI, no network. The page's
// worked example and the client tool both run through this file, so every number on the page
// comes from one place.
//
// Sources for the rules (all opened and re-checked verbatim 26 Nov 2026):
//  - "Strengths + Proof + Value for Company"; "Around 45–60 seconds": Naukri (7 Jan 2026)
//    https://www.naukri.com/blog/why-should-i-hire-you/
//  - "one compelling reason — grounded in the organization's stated needs": Penn Career
//    Services (14 Apr 2026) https://careerservices.upenn.edu/blog/2026/04/14/effective-ways-to-answer-why-should-we-hire-you/
//  - "Connect your abilities directly to the job requirements."; "specific examples and
//    numbers"; "one to two minutes"; desperation; exaggerations: Robert Half (27 Sep 2024)
//  - "Aim for 30 to 60 seconds"; "I'm a hard worker"; arrogance; "End with a clear and
//    positive statement about the value you bring.": Robert Walters (20 Jun 2025)
//  - "Talk about what you can bring to the role, not why the role is right for you."; "Don't
//    try to put down your competition": Bright Network
//  - "Ways you believe you might contribute immediately": University of Alabama Career Center
//  - "under two minutes": The Muse (30 Apr 2024)

import { hedgesIn, words } from '@/data/starMethod/engine'
import { firstSentence, fmtSec, numberIn } from '@/data/tmay/engine'

export { words, fmtSec, firstSentence }

export type PartKey = 'match' | 'proof' | 'value'
export type Length = 'short' | 'standard'
export type Stage = 'fresher' | 'experienced' | 'switcher'
export type Status = 'pass' | 'warn' | 'fail'

export interface Answer {
  stage: Stage
  role: string
  company: string
  needs: string // comma separated: what the job post asks for most
  match: string
  proof: string
  value: string
}

export const KEYS: PartKey[] = ['match', 'proof', 'value']

export const PARTS: Record<
  PartKey,
  { name: string; ask: string; hint: Record<Stage, string>; placeholder: Record<Stage, string> }
> = {
  match: {
    name: 'Match',
    ask: 'Their need, and your strength for it',
    hint: {
      fresher: 'Name the one thing this job needs most, and the strength you bring to it.',
      experienced: 'Name the problem this role exists to solve, and that you already solve it.',
      switcher: 'Name what the role needs, in their words, and the part of your work that is it.',
    },
    placeholder: {
      fresher: 'This role needs someone who can … and that is what I have spent this year doing.',
      experienced: 'You need someone who can … from day one, and that is what I do now at …',
      switcher: 'This role is about … and that is the part of my current job I am best at.',
    },
  },
  proof: {
    name: 'Proof',
    ask: 'One or two times you did it, with a number',
    hint: {
      fresher: 'An internship, project, fest or part-time job, with one number you can defend.',
      experienced: 'One or two results that match this job, each with a number.',
      switcher: 'The work that already looks like the new job, with a number.',
    },
    placeholder: {
      fresher: 'In my internship at …, I … which cut … from … to …',
      experienced: 'Last year I … and the result was …',
      switcher: 'For the last two years I … for … people, and …',
    },
  },
  value: {
    name: 'Value',
    ask: 'What you would do for them first',
    hint: {
      fresher: 'What you would take on in your first months here, tied to the proof.',
      experienced: 'The first result you would go after in this role.',
      switcher: 'What you would do first, and why your background makes it faster.',
    },
    placeholder: {
      fresher: 'In my first months here I could take … off the team’s plate, because …',
      experienced: 'In this role I would start with … so that …',
      switcher: 'So in this role I could start with … from the first week.',
    },
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
    who: 'Robert Walters: “Aim for 30 to 60 seconds”; Naukri: 45–60 seconds',
  },
  standard: {
    label: '1 to 2 minutes',
    min: 60,
    max: 120,
    hardMax: 150,
    who: 'Robert Half: “one to two minutes”; The Muse: “under two minutes”',
  },
}

export const PACES = [
  { wpm: 130, label: 'Slow, 130 words a minute' },
  { wpm: 150, label: 'Calm, 150 words a minute (default)' },
  { wpm: 170, label: 'Quick, 170 words a minute' },
]
export const DEFAULT_WPM = 150

function esc(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// Phrases that need context to mean what we flag. Each returns the matched text so the report
// can show the visitor exactly what it read.
function findAll(text: string, list: { re: RegExp; label: string }[]) {
  return list.flatMap((p) => {
    const m = text.match(p.re)
    return m ? [{ label: p.label, match: m[0] }] : []
  })
}

// Robert Walters: "Avoid general phrases like 'I'm a hard worker' or 'I'm good with people.'"
// Bright Network: "A simple list of your skills is boring". Flagged only in sentences where you
// are the subject (I, I'm, me, myself), so "our team was hard-working" is not. Words that are
// often used plainly ("honest about trade-offs", "motivated by hard problems") are left out.
const CLICHE_WORDS: [string, string][] = [
  ['hard[- ]?working|hard worker', 'hard-working'],
  [
    'quick learner|fast learner|quick to learn|learn(?:s|t|ed)?(?:\\s+\\w+){0,2}\\s+(?:quickly|fast)',
    'quick learner',
  ],
  ['team player', 'team player'],
  ['good with people|people person', 'good with people'],
  ['self[- ]motivated|highly motivated', 'self-motivated'],
  ['passionate', 'passionate'],
  ["(?:I am|I'm|I’m|very|highly|truly|extremely)\\s+dedicated", 'dedicated'],
  ['go[- ]getter', 'go-getter'],
  ['perfectionist', 'perfectionist'],
  ['results?[- ]oriented|results?[- ]driven', 'result-oriented'],
  ['detail[- ]oriented', 'detail-oriented'],
  ['punctual', 'punctual'],
]
export const CLICHES: { re: RegExp; label: string }[] = CLICHE_WORDS.map(([w, label]) => ({
  re: new RegExp(`\\b(?:${w})\\b`, 'i'),
  label,
}))
const SELF_SUBJECT = /(^|[^A-Za-z])(i|i'm|i’m|me|myself)(?![A-Za-z])/i
export function clichesIn(text: string) {
  const sentences = text.split(/(?<=[.!?])\s+/).filter((x) => SELF_SUBJECT.test(x))
  return CLICHES.flatMap((c) => {
    for (const sn of sentences) {
      const m = sn.match(c.re)
      if (m) return [{ label: c.label, match: m[0] }]
    }
    return []
  })
}

// Bright Network: "Don't try to put down your competition to make yourself look better."
export const COMPARE: { re: RegExp; label: string }[] = [
  {
    re: /\b(?:better|stronger|smarter|more qualified|more skilled)\s+than\s+(?:the\s+)?(?:other|any other|most|all the other|everyone|anyone|others)\b(?:\s+(?:candidates?|applicants?|people|freshers?))?/i,
    label: 'better than the others',
  },
  {
    re: /\bunlike\s+(?:the\s+)?(?:other|most|many)\s+(?:candidates?|applicants?|people|freshers?|graduates?)\b/i,
    label: 'unlike other candidates',
  },
  {
    re: /\b(?:other|most)\s+(?:candidates?|applicants?)\s+(?:don't|don’t|do not|can't|can’t|cannot|won't|won’t|lack|only)\b/i,
    label: 'what other candidates lack',
  },
]
export function compareIn(text: string) {
  return findAll(text, COMPARE)
}

// Bright Network: "Talk about what you can bring to the role, not why the role is right for
// you." Robert Half: "Expressing desperation isn't a winning strategy."
export const SELF_FOCUS: { re: RegExp; label: string }[] = [
  {
    re: /\b(?:learning|growth|learning and growth)\s+opportunit(?:y|ies)\b|\bgrow my (?:career|skills)\b|\bopportunity to (?:learn|grow)\b|\b(?:hope|want|wish|eager|keen) to learn\b|\blearn from (?:your|the best|experienced|senior)\b|\bgain (?:exposure|experience|knowledge)\b/i,
    label: 'what you will learn',
  },
  {
    re: /\b(?:good|great|better|attractive|handsome)\s+(?:salary|package|pay)\b|\b(?:my|expected|current)\s+(?:salary|CTC|package)\b|\b(?:salary|CTC)\s+(?:hike|expectations?|package)\b/i,
    label: 'the pay',
  },
  {
    re: /\b(?:i\s+(?:really|badly|desperately)?\s*need\s+(?:this|a)\s+job(?!\s*(?:description|post|spec))|please (?:give|hire)|give me (?:a|one) chance|my dream (?:company|job))\b/i,
    label: 'needing the job',
  },
  {
    re: /\b(?:reputed|reputable|well-known|prestigious|big brand)\s+(?:company|organisation|organization|brand|MNC|firm)\b/i,
    label: 'the company’s name',
  },
]
export function selfFocusIn(text: string) {
  return findAll(text, SELF_FOCUS)
}

// Robert Half: "Exaggerations can backfire if you're hired and can't deliver." Robert Walters:
// "Confidence is good, but arrogance is off-putting."
export const OVERCLAIM: { re: RegExp; label: string }[] = [
  {
    re: /\b(?:the\s+)?(?:best|perfect|ideal)\s+(?:candidate|person|fit|choice|hire)\b|\bthe only (?:candidate|choice|one who can)\b/i,
    label: 'the best or perfect candidate',
  },
  { re: /\bI\s+(?:can\s+)?guarantee\b/i, label: 'a guarantee' },
  { re: /\b100\s?%\s+(?:sure|committed|dedicated|effort|guaranteed|confident)\b/i, label: '100%' },
  {
    re: /\bi\s+(?:never|don't ever|don’t ever)\s+(?:fail|make mistakes|miss)\b/i,
    label: 'never failing',
  },
  { re: /\bno\s?one\s+(?:else\s+)?(?:can|will)\b/i, label: 'no one else can' },
]
export function overclaimIn(text: string) {
  return findAll(text, OVERCLAIM)
}

const THEM =
  /\b(this (role|job|position|team|opportunity|opening|company|organisation|organization|firm|desk|branch|function|internship)|your\b|here\b|for you\b|the team\b)/i
const FIRST =
  /\b(first (week|weeks|month|months|30|60|90|quarter|year|few months|project|task|thing)|from (day one|the first (day|week))|in (my|the) first|day one|start (by|with)|begin (by|with)|take (over|on)|i(?:['’]d|['’]ll| would| could| will| can) (start|begin|take|own|run|build|fix|cut|set up|clear|ship|close|draft|map|audit))/i

function list(s: string): string[] {
  return s
    .split(/[,\n;]/)
    .map((x) => x.trim())
    .filter((x) => x.length > 0)
    .slice(0, 5)
}

// Matching a need from the job post against the answer, built to avoid the false hits seen in
// testing: acronyms (SQL, CSS, R, Go, C++) match case-sensitively and whole, so "CS" never
// matches "CSS" and "R" never matches "Rs 5 lakh"; capitalised names (Java, Canva) match only
// themselves, so "Canva" is not "Canvas"; lower-case words match their stem plus a real suffix,
// so "training" finds "trained" and "debugging" finds "debugged", but "testing" never matches
// "testimonials" and "planning" never matches "plant". Multi-word needs match as a phrase
// ("Power BI" = "PowerBI", "go-to-market" = "go to market") or, failing that, when every
// meaningful word appears ("client handling" in "handled 40 clients").
const SUFFIX = '(?:s|es|ed|d|ing|er|ers|ment|ments|ation|ations)?'
const STOP = new Set(['and', 'the', 'for', 'with', 'from', 'into', 'of', 'to', 'in', 'on', 'a'])
const B = '(?<![A-Za-z0-9])'
const E = '(?![A-Za-z0-9+#])'

export function stem(w: string): string {
  const low = w.toLowerCase()
  for (const suf of ['ing', 'ed', 'ers', 'er', 'ments', 'ment', 'es', 's']) {
    if (!low.endsWith(suf)) continue
    if (suf === 's' && low.endsWith('ss')) continue
    if (suf === 'es' && !/(sses|shes|ches|xes)$/.test(low)) continue
    let s = low.slice(0, -suf.length)
    if ((suf === 'ing' || suf === 'ed') && /([^aeioulsfz])\1$/.test(s)) s = s.slice(0, -1)
    if (s.length >= 4) return s
  }
  return low
}

function wordRe(word: string): RegExp {
  const acronym =
    /^[A-Z][A-Z0-9+#.]*s?$/.test(word) &&
    word.replace(/s$/, '').length >= 1 &&
    word.replace(/s$/, '') === word.replace(/s$/, '').toUpperCase()
  if (acronym && word.length <= 6) {
    const allCaps = word === word.toUpperCase()
    const base = allCaps ? word : word.slice(0, -1)
    // a lower-case letter may come before an acronym of 3+ letters: MySQL, PostgreSQL
    const before = base.length >= 3 ? '(?<![A-Z0-9])' : B
    return new RegExp(`${before}${esc(base)}${allCaps ? '' : 's?'}${E}`)
  }
  if (/[^A-Za-z]/.test(word) || /^[A-Z]/.test(word) || word.length <= 3)
    return new RegExp(`${B}${esc(word)}${E}`, word.length <= 3 && /[A-Z]/.test(word) ? '' : 'i')
  const st = stem(word)
  const dbl = /[^aeiou]$/.test(st) ? `${st.slice(-1)}?` : ''
  return new RegExp(`${B}${esc(st)}${dbl}${SUFFIX}(?![A-Za-z])`, 'i')
}

export function mentions(text: string, phrase: string): boolean {
  const ws = phrase
    .trim()
    .split(/[\s\-_/]+/)
    .filter(Boolean)
  if (ws.length === 0) return false
  if (ws.length === 1) return wordRe(ws[0]).test(text)
  const last = ws[ws.length - 1]
  const lastSrc =
    esc(last.length > 3 ? last.replace(/s$/i, '') : last) + (last.length > 3 ? 's?' : '')
  const phraseRe = new RegExp(
    `${B}${ws.slice(0, -1).map(esc).join('[\\s\\-_]*')}[\\s\\-_]*${lastSrc}${E}`,
    'i'
  )
  if (phraseRe.test(text)) return true
  const sig = ws.filter((w) => w.length >= 3 && !STOP.has(w.toLowerCase()))
  return sig.length >= 2 && sig.every((w) => wordRe(w).test(text))
}

// Version numbers, levels and tenure are not results: "SDE-1", "two years of
// experience" or "for six years" do not count as the number in your proof.
const TENURE =
  /\b(?:for\s+)?(?:\d+|one|two|three|four|five|six|seven|eight|nine|ten)\+?\s*(?:years?|yrs?)(?:\s+of\s+(?:experience|exp|work))?\b/gi
export function proofForNumber(t: string): string {
  return t
    .replace(/\b[A-Za-z]+-?\d+\b/g, ' ')
    .replace(TENURE, (m) => (/^for\s|of\s+(experience|exp|work)$/i.test(m) ? ' ' : m))
}

export interface Check {
  id: string
  title: string
  status: Status
  detail: string
}

export interface NeedHit {
  need: string
  inMatch: boolean
  inProof: boolean
}

export interface Analysis {
  words: Record<PartKey, number>
  totalWords: number
  seconds: number
  share: Record<PartKey, number>
  needs: NeedHit[]
  checks: Check[]
  passed: number
  text: string
  short: string
  shortWords: number
  shortSeconds: number
  empty: boolean
}

const q = (xs: { label: string; match: string }[]) =>
  xs.map((x) => `“${x.match.trim()}”`).join(', ')

export function analyse(a: Answer, length: Length = 'short', wpm = DEFAULT_WPM): Analysis {
  const w = { match: words(a.match), proof: words(a.proof), value: words(a.value) }
  const totalWords = w.match + w.proof + w.value
  const seconds = totalWords ? (totalWords / wpm) * 60 : 0
  const pct = (n: number) => (totalWords ? Math.round((n / totalWords) * 100) : 0)
  const share = { match: pct(w.match), proof: pct(w.proof), value: pct(w.value) }
  const text = KEYS.map((k) => a[k].trim())
    .filter(Boolean)
    .join(' ')
  const short = KEYS.map((k) => firstSentence(a[k]))
    .filter(Boolean)
    .join(' ')
  const shortWords = words(short)
  const shortSeconds = shortWords ? (shortWords / wpm) * 60 : 0
  const L = LENGTHS[length]
  const checks: Check[] = []

  const missing = KEYS.filter((k) => w[k] === 0)
  checks.push({
    id: 'parts',
    title: 'Match, proof and value are all there',
    status: missing.length === 0 ? 'pass' : missing.length >= 2 ? 'fail' : 'warn',
    detail:
      missing.length === 0
        ? 'Naukri’s formula: “Strengths + Proof + Value for Company”.'
        : `Missing: ${missing.map((k) => PARTS[k].name).join(', ')}.`,
  })

  const t = Math.round(seconds)
  const biggest = KEYS.slice().sort((x, y) => w[y] - w[x])[0]
  checks.push({
    id: 'length',
    title: `Length: ${L.label}`,
    status: t >= L.min && t <= L.max ? 'pass' : t > L.hardMax || t < L.min * 0.6 ? 'fail' : 'warn',
    detail:
      t > L.max
        ? `About ${fmtSec(seconds)} out loud. Cut ${Math.ceil(((t - L.max) / 60) * wpm)} words, starting with the ${PARTS[biggest].name}.`
        : t < L.min
          ? `About ${fmtSec(seconds)} out loud. Add ${Math.ceil(((L.min - t) / 60) * wpm)} words: a result with a number, or what you would do first.`
          : `About ${fmtSec(seconds)} out loud at ${wpm} words a minute.`,
  })

  const needList = list(a.needs)
  const needs: NeedHit[] = needList.map((n) => ({
    need: n,
    inMatch: mentions(a.match, n) || mentions(a.value, n),
    inProof: mentions(a.proof, n),
  }))
  const covered = needs.filter((n) => n.inMatch || n.inProof)
  const proved = needs.filter((n) => n.inProof)
  const needMin = Math.min(2, needList.length)
  checks.push({
    id: 'needs',
    title: 'Tied to what the job post asks for',
    status:
      needList.length === 0
        ? 'warn'
        : covered.length >= needMin && proved.length >= 1
          ? 'pass'
          : covered.length
            ? 'warn'
            : 'fail',
    detail:
      needList.length === 0
        ? 'Add 2 to 4 needs from the job post above to check this. Robert Half: “Connect your abilities directly to the job requirements.”'
        : `${covered.length} of ${needList.length} named, ${proved.length} backed by your proof.${
            covered.length < needList.length
              ? ` Not yet: ${needList.filter((n) => !covered.some((c) => c.need === n)).join(', ')}.`
              : ''
          }${covered.length && !proved.length ? ' Put at least one of them in the Proof part.' : ''}`,
  })

  const proofNum = numberIn(proofForNumber(a.proof))
  checks.push({
    id: 'number',
    title: 'Your proof has a number',
    status: proofNum ? 'pass' : w.proof ? 'warn' : 'fail',
    detail: proofNum
      ? 'Your Proof part includes a number, amount or result.'
      : 'Add one number you can defend: users, ₹ or $, %, time saved, rank, people trained. Robert Half: “specific examples and numbers can make your answer more impactful.”',
  })

  const cl = clichesIn(text)
  checks.push({
    id: 'cliche',
    title: 'Shows it instead of claiming it',
    status: cl.length === 0 ? 'pass' : cl.length <= 2 ? 'warn' : 'fail',
    detail: cl.length
      ? `Found ${q(cl)}. Robert Walters: “Without specific examples, these don’t tell the interviewer much.” Replace each with the thing you did.`
      : 'No “I’m a hard worker” or “quick learner” claims.',
  })

  const fit =
    THEM.test(a.value) ||
    (a.role.trim() ? mentions(a.value, a.role.trim()) : false) ||
    (a.company.trim() ? mentions(a.value, a.company.trim()) : false)
  const first = FIRST.test(a.value)
  checks.push({
    id: 'value',
    title: 'Ends on what you would do for them',
    status: fit && first ? 'pass' : w.value && (fit || first) ? 'warn' : 'fail',
    detail:
      fit && first
        ? 'Your Value part says what you would do, for this role.'
        : !w.value
          ? 'Write the Value part: what you would take on first. Alabama lists “Ways you believe you might contribute immediately”.'
          : !first
            ? 'Say what you would do first (“I’d start by…”, “in my first months…”), not only that you would add value.'
            : 'Tie it to this role, team or company by name.',
  })

  const sf = selfFocusIn(text)
  checks.push({
    id: 'them',
    title: 'About them, not what you want',
    status: sf.length === 0 ? 'pass' : sf.length === 1 ? 'warn' : 'fail',
    detail: sf.length
      ? `Mentions ${sf.map((s) => `${s.label} (“${s.match.trim()}”)`).join(', ')}. Bright Network: “Talk about what you can bring to the role, not why the role is right for you.”`
      : 'No learning-opportunity, pay or “dream company” lines.',
  })

  const cmp = compareIn(text)
  const over = overclaimIn(text)
  const bad = cmp.length + over.length
  checks.push({
    id: 'others',
    title: 'No putting down others, no over-claiming',
    status: bad === 0 ? 'pass' : cmp.length || bad >= 2 ? 'fail' : 'warn',
    detail: bad
      ? `Found ${q([...cmp, ...over])}. ${
          cmp.length
            ? 'Bright Network: “Don’t try to put down your competition to make yourself look better.”'
            : 'Robert Half: “Exaggerations can backfire if you’re hired and can’t deliver.”'
        }`
      : 'You talk about yourself, without “best candidate” or comparisons.',
  })

  const hedges = hedgesIn(text)
  const hedgeTotal = hedges.reduce((s, h) => s + h.n, 0)
  checks.push({
    id: 'hedge',
    title: 'Few hedge words',
    status: hedgeTotal <= 1 ? 'pass' : hedgeTotal <= 3 ? 'warn' : 'fail',
    detail: hedgeTotal
      ? `Found: ${hedges.map((h) => (h.n > 1 ? `“${h.word}” ×${h.n}` : `“${h.word}”`)).join(', ')}. Say what you did, plainly.`
      : 'No “basically”, “I think”, “tried to”, “helped with” and the like.',
  })

  return {
    words: w,
    totalWords,
    seconds,
    share,
    needs,
    checks,
    passed: checks.filter((c) => c.status === 'pass').length,
    text,
    short,
    shortWords,
    shortSeconds,
    empty: totalWords === 0,
  }
}
