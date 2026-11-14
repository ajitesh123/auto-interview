// Resume Keyword Checker engine. Pure functions, no network, no AI: the same code runs in the
// browser tool and at build time for the worked example on the page, so the page's numbers
// always reconcile with what the tool shows.
import { SKILLS, type SkillCat } from './skills'

export type Priority = 'must' | 'mentioned' | 'nice'

export const PRIORITY_LABEL: Record<Priority, string> = {
  must: 'Must-have',
  mentioned: 'Mentioned',
  nice: 'Nice to have',
}
export const PRIORITY_WEIGHT: Record<Priority, number> = { must: 3, mentioned: 2, nice: 1 }

export interface KeywordHit {
  name: string
  cat: SkillCat
  priority: Priority
  jdCount: number
  resumeCount: number
  context: string // the job post's own line where it first appears (trimmed)
}

export interface FormatCheck {
  id: string
  label: string
  status: 'pass' | 'warn' | 'fail'
  detail: string
}

export interface Analysis {
  keywords: KeywordHit[] // every dictionary skill found in the job post
  matched: KeywordHit[]
  missing: KeywordHit[]
  coverage: number // 0–100, weighted by priority
  byPriority: Record<Priority, { total: number; matched: number }>
  otherTerms: { term: string; count: number; inResume: boolean }[]
  title: { found: string | null; inResume: boolean }
  checks: FormatCheck[]
  resumeWords: number
  jdWords: number
}

/* ---------- text helpers ---------- */

export function normalise(s: string): string {
  return s
    .replace(/\r\n?/g, '\n')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, ' - ')
    .replace(/\u00A0/g, ' ')
}

const WORD = 'A-Za-z0-9+#&'
const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')

interface Pattern {
  skill: number
  re: RegExp
  len: number
}

// One pattern per spelling, longest first, so "data analytics" claims its words before
// "analytics" can, and "A/B testing" before "testing".
const PATTERNS: Pattern[] = SKILLS.flatMap((s, i) =>
  [s.name, ...(s.aliases ?? [])].map((term) => {
    const plural = /[a-z]$/.test(term) && !s.cs ? "(?:s|es|'s)?" : ''
    const flags = s.cs ? 'g' : 'gi'
    return {
      skill: i,
      len: term.length,
      re: new RegExp(`(^|[^${WORD}])(${esc(term)}${plural})(?=$|[^${WORD}])`, flags),
    }
  })
).sort((a, b) => b.len - a.len)

interface Found {
  skill: number
  start: number
  end: number
}

function findSkills(text: string): Found[] {
  const taken: [number, number][] = []
  const out: Found[] = []
  for (const p of PATTERNS) {
    p.re.lastIndex = 0
    let m: RegExpExecArray | null
    while ((m = p.re.exec(text))) {
      const start = m.index + m[1].length
      const end = start + m[2].length
      // A lone capital (R) at the end of a line or before "." is usually a name initial.
      const lone = m[2].length === 1 && /^(\s*$|\s*\n|\.\s|\.$)/.test(text.slice(end, end + 2))
      if (!lone && !taken.some(([a, b]) => start < b && end > a)) {
        taken.push([start, end])
        out.push({ skill: p.skill, start, end })
      }
      if (m[0].length === 0) p.re.lastIndex++
    }
  }
  return out.sort((a, b) => a.start - b.start)
}

/* ---------- reading the job post's structure ---------- */

type Zone = 'req' | 'nice' | 'resp' | 'other'

const H_REQ =
  /(requirement|qualification|must have|must-have|what you('|’)?ll need|you (will )?have|you bring|what we('|’)?re looking for|who you are|skills|experience required|eligibility|about you|what you need)/i
const H_NICE =
  /(preferred|nice to have|nice-to-have|bonus|good to have|plus points|extra credit|would be great)/i
const H_RESP =
  /(responsibilit|what you('|’)?ll do|what you will do|the role|about the role|about us|about the team|day to day|your impact|key result|what we offer|benefits|perks)/i
const L_REQ = /\b(must|required|requirement|mandatory|minimum|at least|need to have|essential)\b/i
const L_NICE =
  /\b(preferred|nice to have|nice-to-have|a plus|bonus|good to have|ideally|desirable)\b/i

interface Line {
  text: string
  start: number
  end: number
  zone: Zone
}

function readLines(text: string): Line[] {
  const lines: Line[] = []
  let zone: Zone = 'other'
  let pos = 0
  for (const raw of text.split('\n')) {
    const start = pos
    pos += raw.length + 1
    const t = raw.trim()
    if (!t) continue
    const words = t.split(/\s+/).length
    const isBullet = /^([-•*▪◦·●–]|\d+[.)])\s/.test(t)
    const isHeading = !isBullet && words <= 8 && t.length <= 70 && !/[.;]$/.test(t)
    if (isHeading) {
      if (H_NICE.test(t)) zone = 'nice'
      else if (H_REQ.test(t)) zone = 'req'
      else if (H_RESP.test(t)) zone = 'resp'
    }
    let lineZone = zone
    if (L_NICE.test(t)) lineZone = 'nice'
    else if (L_REQ.test(t)) lineZone = 'req'
    lines.push({ text: t, start, end: start + raw.length, zone: lineZone })
  }
  return lines
}

const trimContext = (s: string) => {
  const t = s.replace(/^\s*([-•*▪◦·>●–]+|\d+[.)])\s*/, '').trim()
  return t.length > 160 ? t.slice(0, 157).trimEnd() + '…' : t
}

/* ---------- job title ---------- */

const TITLE_WORDS =
  /\b(manager|analyst|engineer|designer|lead|associate|executive|specialist|consultant|developer|scientist|officer|head|director|intern|architect|strategist|representative|coordinator|chief of staff|founder'?s office|marketer|administrator)\b/i
const SENIORITY = /\b(senior|sr\.?|junior|jr\.?|lead|principal|staff|associate|ii|iii|iv|i)\b/gi

function findTitle(lines: Line[]): string | null {
  for (const l of lines.slice(0, 4)) {
    let t = l.text.replace(/^(job title|role|position)\s*[:-]\s*/i, '').trim()
    t = t.split(/\s+[-|@(]\s*|\s+at\s+/i)[0].trim()
    if (t.length <= 60 && TITLE_WORDS.test(t) && t.split(/\s+/).length <= 7) return t
  }
  return null
}

function titleInResume(title: string, resume: string): boolean {
  const core = title.replace(SENIORITY, ' ').replace(/\s+/g, ' ').trim()
  if (!core) return false
  const re = new RegExp(
    `(^|[^${WORD}])${esc(core).replace(/\\ /g, '\\s+').replace(/ /g, '\\s+')}`,
    'i'
  )
  return re.test(resume)
}

/* ---------- other repeated terms (not in the dictionary) ---------- */

const STOP = new Set(
  'I A AN THE AND OR OF TO IN ON AT FOR WITH WE OUR YOU YOUR US IT IS BE AS BY FROM THIS THAT WILL ARE HAVE HAS CAN ALL ANY MAY NOT OUT ROLE TEAM JOB ABOUT WHAT WHO HOW WHY WHEN WHERE PLEASE APPLY JOIN NEW DAY DAYS YEAR YEARS LPA CTC INR USD USA UK INDIA EU LLC LTD PVT INC CO HR FAQ EOE N/A OK AI ML IT'.split(
    ' '
  )
)

function otherTerms(jd: string, jdFound: Found[], resume: string) {
  const masked = jdFound.reduceRight(
    (s, f) => s.slice(0, f.start) + ' '.repeat(f.end - f.start) + s.slice(f.end),
    jd
  )
  const counts = new Map<string, number>()
  // Acronyms (2–6 capitals) and mid-sentence Capitalised words or pairs.
  const re =
    /(^|[^A-Za-z0-9])([A-Z]{2,6}s?|[A-Z][a-z]+[A-Z][A-Za-z]*|[A-Z][a-z]{2,}(?: [A-Z][a-z]{2,})?)(?![A-Za-z0-9])/g
  let m: RegExpExecArray | null
  while ((m = re.exec(masked))) {
    const t = m[2]
    const start = m.index + m[1].length
    const plainCap = /^[A-Z][a-z]/.test(t) && !/[a-z][A-Z]/.test(t)
    // A plain Capitalised word only counts mid-sentence (after a lower-case word or a comma).
    if (plainCap && !(masked[start - 1] === ' ' && /[a-z,;:]/.test(masked[start - 2] ?? '')))
      continue
    if (STOP.has(t.toUpperCase())) continue
    counts.set(t, (counts.get(t) ?? 0) + 1)
  }
  return [...counts.entries()]
    .filter(([t, c]) => c >= 2 || /^[A-Z]{2,6}s?$|[a-z][A-Z]/.test(t))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([term, count]) => ({
      term,
      count,
      inResume: new RegExp(`(^|[^${WORD}])${esc(term)}(?=$|[^${WORD}])`, 'i').test(resume),
    }))
}

/* ---------- resume format checks (plain text) ---------- */

const BULLET = /^\s*([-•*▪◦·●–]|\d+[.)])\s+/
const WEAK =
  /^(responsible for|worked on|helped|assisted|involved in|duties included|tasked with|participated in|handled)\b/i

function formatChecks(resume: string, resumeFound: Found[]): FormatCheck[] {
  const text = resume
  const lines = text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
  const words = text.split(/\s+/).filter(Boolean).length
  const checks: FormatCheck[] = []

  const email = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/.test(text)
  const phone = (text.match(/\+?\d[\d\s().-]{8,}\d/g) ?? ([] as string[])).some(
    (m) =>
      m.replace(/\D/g, '').length >= 10 &&
      !/^(19|20)\d{2}\s*[-–]\s*(19|20)\d{2}$/.test(m.trim()) &&
      !/(19|20)\d{2}\s*[-–]\s*(19|20)\d{2}/.test(m)
  )
  const linkedin = /linkedin\.com\/in\//i.test(text)
  const contactMissing = [!email && 'email', !phone && 'phone', !linkedin && 'LinkedIn URL'].filter(
    Boolean
  ) as string[]
  checks.push({
    id: 'contact',
    label: 'Contact details as text',
    status: contactMissing.length === 0 ? 'pass' : contactMissing.length === 3 ? 'fail' : 'warn',
    detail:
      contactMissing.length === 0
        ? 'Email, phone and LinkedIn URL are all readable as text.'
        : `Not found: ${contactMissing.join(', ')}. Put them as plain text at the top, not in a header image or icon.`,
  })

  const heads: [string, RegExp][] = [
    [
      'Experience',
      /^(work |professional |relevant )?(experience|employment|work history|internships?)\b/i,
    ],
    ['Education', /^(education|academics?|academic background|qualifications)\b/i],
    ['Skills', /^(technical |key |core )?(skills|competencies|tools|tech stack)\b/i],
    ['Projects', /^(projects?|key projects|academic projects|personal projects)\b/i],
  ]
  const shortLines = lines.filter((l) => l.length <= 40)
  const foundHeads = heads.filter(([, re]) =>
    shortLines.some((l) => re.test(l.replace(/[:|]/g, '').trim()))
  )
  const missingCore = ['Experience', 'Education', 'Skills'].filter(
    (h) => !foundHeads.some(([n]) => n === h)
  )
  checks.push({
    id: 'sections',
    label: 'Standard section headings',
    status: missingCore.length === 0 ? 'pass' : missingCore.length >= 2 ? 'fail' : 'warn',
    detail:
      missingCore.length === 0
        ? `Found: ${foundHeads.map(([n]) => n).join(', ')}.`
        : `Not found: ${missingCore.join(', ')}. Use plain headings such as "Experience", "Education" and "Skills" so the parser files each part correctly.`,
  })

  checks.push({
    id: 'length',
    label: 'Length',
    status: words < 200 ? 'warn' : words > 1000 ? 'warn' : 'pass',
    detail:
      words < 200
        ? `${words} words. That is thin: add a bullet or two of proof for each role or project.`
        : words > 1000
          ? `${words} words. That runs past two pages for most layouts; cut older or unrelated bullets.`
          : `${words} words, about one to two pages.`,
  })

  const bulletLines = lines.filter(
    (l) => BULLET.test(l) || (l.split(/\s+/).length >= 8 && !/[:]$/.test(l))
  )
  const withNum = bulletLines.filter((l) =>
    /\d/.test(l.replace(BULLET, '').replace(/\b(19|20)\d{2}\b/g, ''))
  )
  const share = bulletLines.length ? Math.round((withNum.length / bulletLines.length) * 100) : 0
  checks.push({
    id: 'numbers',
    label: 'Bullets with a number',
    status:
      bulletLines.length === 0 ? 'warn' : share >= 50 ? 'pass' : share >= 25 ? 'warn' : 'fail',
    detail:
      bulletLines.length === 0
        ? 'No bullet lines found. Write experience as short bullets that start with a verb.'
        : `${withNum.length} of ${bulletLines.length} bullets (${share}%) carry a number. Our rule of thumb: at least half should show a result (%, ₹, users, time saved).`,
  })

  const weak = bulletLines.filter((l) => WEAK.test(l.replace(BULLET, '')))
  checks.push({
    id: 'weak',
    label: 'Strong openers',
    status: weak.length === 0 ? 'pass' : weak.length <= 2 ? 'warn' : 'fail',
    detail:
      weak.length === 0
        ? 'No bullet starts with "Responsible for", "Worked on" or "Helped".'
        : `${weak.length} bullet${weak.length === 1 ? ' starts' : 's start'} with a duty phrase (e.g. "${trimContext(weak[0]).slice(0, 60)}"). Start with what you did: Built, Cut, Launched, Grew.`,
  })

  const firstPerson =
    (text.match(/(^|\n|[.!?]\s+|^\s*[-•*▪◦·●–]\s*)I(?=\s+[a-z]|'[a-z])/gm) ?? []).length +
    (text.match(/(^|[^A-Za-z])(my|me)(?=[^A-Za-z']|$)/g) ?? []).length
  checks.push({
    id: 'person',
    label: 'No first person',
    status: firstPerson === 0 ? 'pass' : firstPerson <= 3 ? 'warn' : 'fail',
    detail:
      firstPerson === 0
        ? 'No "I", "my" or "me".'
        : `"I", "my" or "me" appears ${firstPerson} time${firstPerson === 1 ? '' : 's'}. Resume bullets drop the pronoun: "Built…", not "I built…".`,
  })

  const long = bulletLines.filter((l) => l.split(/\s+/).length > 40)
  checks.push({
    id: 'long',
    label: 'Bullet length',
    status: long.length === 0 ? 'pass' : 'warn',
    detail:
      long.length === 0
        ? 'Every bullet is 40 words or fewer.'
        : `${long.length} bullet${long.length === 1 ? ' is' : 's are'} over 40 words. Split into two, or cut to the action and the result.`,
  })

  const perSkill = new Map<number, number>()
  for (const f of resumeFound) perSkill.set(f.skill, (perSkill.get(f.skill) ?? 0) + 1)
  const stuffed = [...perSkill.entries()].filter(([, c]) => c > 6).map(([i]) => SKILLS[i].name)
  checks.push({
    id: 'stuffing',
    label: 'No keyword stuffing',
    status: stuffed.length === 0 ? 'pass' : 'warn',
    detail:
      stuffed.length === 0
        ? 'No skill is repeated more than 6 times.'
        : `Repeated more than 6 times: ${stuffed.slice(0, 4).join(', ')}. A recruiter reads this; once in Skills and once or twice in proof bullets is enough.`,
  })

  return checks
}

/* ---------- main ---------- */

export function analyse(jdRaw: string, resumeRaw: string): Analysis {
  const jd = normalise(jdRaw)
  const resume = normalise(resumeRaw)
  const lines = readLines(jd)
  const jdFound = findSkills(jd)
  const resumeFound = findSkills(resume)

  const resumeCounts = new Map<number, number>()
  for (const f of resumeFound) resumeCounts.set(f.skill, (resumeCounts.get(f.skill) ?? 0) + 1)

  const bySkill = new Map<number, { count: number; zones: Set<Zone>; first: Line | undefined }>()
  for (const f of jdFound) {
    const line = lines.find((l) => f.start >= l.start && f.start <= l.end)
    const e = bySkill.get(f.skill) ?? { count: 0, zones: new Set<Zone>(), first: line }
    if (line && line.zone === 'req' && e.first?.zone !== 'req') e.first = line
    e.count++
    if (line) e.zones.add(line.zone)
    bySkill.set(f.skill, e)
  }

  const keywords: KeywordHit[] = [...bySkill.entries()].map(([i, e]) => {
    const priority: Priority =
      e.zones.has('req') || e.count >= 3
        ? 'must'
        : e.zones.size > 0 && [...e.zones].every((z) => z === 'nice')
          ? 'nice'
          : 'mentioned'
    return {
      name: SKILLS[i].name,
      cat: SKILLS[i].cat,
      priority,
      jdCount: e.count,
      resumeCount: resumeCounts.get(i) ?? 0,
      context: e.first ? trimContext(e.first.text) : '',
    }
  })

  const order: Priority[] = ['must', 'mentioned', 'nice']
  keywords.sort(
    (a, b) =>
      order.indexOf(a.priority) - order.indexOf(b.priority) ||
      b.jdCount - a.jdCount ||
      a.name.localeCompare(b.name)
  )

  const matched = keywords.filter((k) => k.resumeCount > 0)
  const missing = keywords.filter((k) => k.resumeCount === 0)
  const byPriority = Object.fromEntries(
    order.map((p) => [
      p,
      {
        total: keywords.filter((k) => k.priority === p).length,
        matched: matched.filter((k) => k.priority === p).length,
      },
    ])
  ) as Record<Priority, { total: number; matched: number }>

  const totalW = keywords.reduce((s, k) => s + PRIORITY_WEIGHT[k.priority], 0)
  const gotW = matched.reduce((s, k) => s + PRIORITY_WEIGHT[k.priority], 0)
  const coverage = totalW ? Math.round((gotW / totalW) * 100) : 0

  const title = findTitle(lines)

  return {
    keywords,
    matched,
    missing,
    coverage,
    byPriority,
    otherTerms: otherTerms(jd, jdFound, resume),
    title: { found: title, inResume: title ? titleInResume(title, resume) : false },
    checks: formatChecks(resume, resumeFound),
    resumeWords: resume.split(/\s+/).filter(Boolean).length,
    jdWords: jd.split(/\s+/).filter(Boolean).length,
  }
}

export function whereToAdd(cat: SkillCat): string {
  switch (cat) {
    case 'tool':
      return 'If you have used it, name it in a bullet with what you did, and add it to your Skills line.'
    case 'skill':
      return 'Show it in a bullet with a result. Add it to Skills only if you could answer interview questions on it.'
    case 'method':
      return 'Name the method in the bullet where you used it, with the outcome it drove.'
    case 'soft':
      return 'Do not list it as a word. Prove it in a bullet: who you worked with and what changed.'
    case 'credential':
      return 'Add it under Education or Certifications only if you hold it (or say "expected 2027").'
  }
}
