// LinkedIn headline checker: pure rule checks, no AI, no network.
// Every rule names the source it comes from (all opened 23 Nov 2026; see SOURCES).

export type Stage = 'student' | 'experienced' | 'switcher' | 'between'
export type Status = 'pass' | 'warn' | 'fail'

export interface Input {
  headline: string
  /** The role you want recruiters to find you for, e.g. "Data Analyst". */
  target: string
  /** Skills or keywords from a job post, comma separated. Optional. */
  keywords: string
  stage: Stage
}

export interface Check {
  id: string
  title: string
  status: Status
  detail: string
  /** Text from the headline the rule matched, shown to the user so they can judge it. */
  matched?: string[]
  source: keyof typeof SOURCES
}

export interface Result {
  chars: number
  checks: Check[]
  passed: number
  /** Index (in characters) where the target role, or a role word, first appears; -1 if none. */
  rolePos: number
  roleText: string
  preview: string
  previewCut: boolean
}

export const LIMIT = 220
/** Our planning number for narrow views (comments, phone search). LinkedIn publishes none. */
export const PREVIEW = 50

export const SOURCES = {
  talentBlog: {
    label: 'LinkedIn Talent Blog, 5 ways to make your LinkedIn headline stand out',
    url: 'https://business.linkedin.com/talent-solutions/blog/2015/01/5-ways-to-make-your-linkedin-headline-stand-out',
  },
  salesDefault: {
    label: 'LinkedIn Sales Solutions, Write a compelling headline',
    url: 'https://business.linkedin.com/sales-solutions/cx/22/05/want-to-generate-more-leads-and-opportunities-for-dialogue/write-a-compelling-headline',
  },
  mit: { label: 'MIT CAPD, LinkedIn', url: 'https://capd.mit.edu/resources/linkedin/' },
  berkeley: {
    label: 'UC Berkeley School of Information, LinkedIn guide (13 Feb 2024)',
    url: 'https://www.ischool.berkeley.edu/careers/guides/linkedin',
  },
  notreDame: {
    label: 'University of Notre Dame Career Center, LinkedIn',
    url: 'https://undergradcareers.nd.edu/start/linkedin/',
  },
  cmu: {
    label: 'Carnegie Mellon SCS Career Center, Developing a strong LinkedIn profile (PDF)',
    url: 'https://www.cmu.edu/career/documents/resources-by-college/scs/developing-a-strong-linkedin-profile.pdf',
  },
  uf: {
    label: 'University of Florida Career Connections Center, Six LinkedIn profile must-haves',
    url: 'https://career.ufl.edu/six-linkedin-profile-must-haves/',
  },
  uw: {
    label: 'University of Washington Career & Internship Center (27 Oct 2025)',
    url: 'https://careers.uw.edu/blog/2025/10/27/improve-your-linkedin-headline-to-enhance-your-opportunities/',
  },
  uconn: {
    label: 'UConn Center for Career Readiness, Building a strong LinkedIn profile',
    url: 'https://career.uconn.edu/building-a-strong-linkedin-profile/',
  },
  ttu: {
    label: 'Texas Tech University Career Center, LinkedIn handout (Feb 2026, PDF)',
    url: 'https://www.depts.ttu.edu/careercenter/International_resources/LinkedIn_Handout_Updated_2026.pdf',
  },
  naukri: {
    label: 'Naukri Campus, LinkedIn profile tips (3 Sep 2026)',
    url: 'https://www.naukri.com/campus/career-guidance/linkedin-profile-tips',
  },
  muse: {
    label: 'The Muse via UC San Diego Extended Studies (10 Oct 2024)',
    url: 'https://unex-careerhub.ucsd.edu/blog/2024/10/10/what-to-put-on-linkedin-headline-when-unemployed-5-examples-for-job-seekers/',
  },
  learning: {
    label: 'LinkedIn Learning blog, The 10 words you shouldn’t use in your LinkedIn profile',
    url: 'https://learning.linkedin.com/blog/advancing-your-career/the-10-words-you-absolutely-shouldnt-put-in-your-linkedin-profil',
  },
  cbs: {
    label: 'CBS News MoneyWatch, LinkedIn’s overused buzzwords (26 Jan 2017)',
    url: 'https://www.cbsnews.com/news/linked-in-resume-tips-buzzwords',
  },
  uva: {
    label: 'UVA Economics, reposting LinkedIn designer Katie Jacquez (7 Jan 2023)',
    url: 'https://economics.virginia.edu/tips-attract-more-recruiters-linkedin',
  },
  semantic: {
    label: 'LinkedIn Talent Solutions, Using AI-assisted search (PDF)',
    url: 'https://business.linkedin.com/content/dam/lem/business/en/hire/product-update/Using%20AI-Assisted_Search_Semantic%20Search.pdf',
  },
  coursera: {
    label: 'Coursera, How to let recruiters know you’re open on LinkedIn (30 Dec 2025)',
    url: 'https://www.coursera.org/articles/how-to-let-recruiters-know-youre-open-on-linkedin',
  },
  // Checked locally with Python's unicodedata (Unicode 15.1): "𝗗" is U+1D5D7 MATHEMATICAL
  // SANS-SERIF BOLD CAPITAL D, a different character from "D". Not an opened web page.
  unicode: {
    label: 'Unicode character data: styled letters are separate characters (U+1D400–U+1D7FF)',
    url: '/linkedin-headline-checker#faq',
  },
} as const

/** LinkedIn Learning's list, in its order. */
export const BUZZ_LEARNING = [
  'Specialized',
  'Experienced',
  'Leadership',
  'Skilled',
  'Passionate',
  'Expert',
  'Motivated',
  'Creative',
  'Strategic',
  'Successful',
]
/** LinkedIn's 2017 list as reported by CBS News (analysis of 400 million profiles), in its order. */
export const BUZZ_2017 = [
  'Specialized',
  'Leadership',
  'Passionate',
  'Strategic',
  'Experienced',
  'Focused',
  'Expert',
  'Certified',
  'Creative',
  'Excellent',
]
export const BUZZ_ALL = Array.from(new Set([...BUZZ_LEARNING, ...BUZZ_2017]))

/** Words that are also real parts of job titles or credentials ("Creative Director", "Strategic
 * Partnerships", "Leadership Development Program", "AWS Certified"). Not flagged when the next
 * word is capitalised or the word follows a capitalised word (a named title or credential). */
const TITLE_WORDS = new Set(['creative', 'strategic', 'leadership', 'certified', 'expert'])

const CUTE = [
  'ninja',
  'guru',
  'rockstar',
  'rock star',
  'wizard',
  'jedi',
  'unicorn',
  'hustler',
  'superhero',
  'dreamer',
  'go-getter',
  'self-starter',
  'team player',
  'hard-working',
  'hardworking',
  'results-driven',
  'result-oriented',
  'results-oriented',
]

/** Common role nouns, used only when no target role is given. */
const ROLE_WORDS = [
  'analyst',
  'engineer',
  'developer',
  'manager',
  'designer',
  'consultant',
  'scientist',
  'architect',
  'accountant',
  'associate',
  'executive',
  'specialist',
  'officer',
  'lead',
  'director',
  'founder',
  'marketer',
  'recruiter',
  'writer',
  'teacher',
  'researcher',
  'administrator',
  'coordinator',
  'representative',
  'sdr',
  'bdr',
  'intern',
  'internship',
  'sde',
  'swe',
  'trainee',
  'graduate engineer trainee',
  'mba',
  'consultant',
  'chief of staff',
  'product manager',
  'program manager',
  'ca',
  'cfa',
]

export const SEPARATORS = /\s*(?:\||•|·|\/\/|—|–|;|,|•)\s*/

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const norm = (s: string) => s.replace(/\s+/g, ' ').trim()
/** Character count as a person sees it (code points, so an emoji counts once). */
export const charCount = (s: string) => Array.from(s).length

/** Major parts: split on " | ", bullets, "//" and dashes, but not on "·" or commas, which
 * usually group skills inside one part. */
export const MAJOR = /\s*(?:\||•|\/\/|—|–|\u2022)\s*/
export function majorParts(h: string): string[] {
  return norm(h)
    .split(MAJOR)
    .map((x) => x.trim())
    .filter(Boolean)
}

export function segments(h: string): string[] {
  return norm(h)
    .split(SEPARATORS)
    .map((x) => x.trim())
    .filter(Boolean)
}

export function splitList(s: string): string[] {
  return Array.from(
    new Set(
      s
        .split(/[,\n;|]/)
        .map((x) => norm(x))
        .filter((x) => x.length >= 2)
    )
  )
}

/** Find a phrase with word edges; returns index or -1. Handles "C++", "Power BI", "Node.js". */
export function findPhrase(text: string, phrase: string): number {
  const p = norm(phrase)
  if (!p) return -1
  const re = new RegExp(`(^|[^A-Za-z0-9])${esc(p)}(?=$|[^A-Za-z0-9+#])`, 'i')
  const m = re.exec(text)
  return m ? m.index + m[1].length : -1
}

/** Target role match: the whole phrase, or every meaningful word of it (any order, plural ok). */
function findTarget(text: string, target: string): { pos: number; text: string } {
  const t = norm(target)
  if (!t) return { pos: -1, text: '' }
  const whole = findPhrase(text, t)
  if (whole >= 0) return { pos: whole, text: text.slice(whole, whole + t.length) }
  const words = t
    .split(' ')
    .filter((w) => w.length > 2 && !['and', 'the', 'for', 'of'].includes(w.toLowerCase()))
  if (!words.length) return { pos: -1, text: '' }
  let first = Infinity
  for (const w of words) {
    let i = findPhrase(text, w)
    if (i < 0) i = findPhrase(text, w.replace(/s$/i, ''))
    if (i < 0) i = findPhrase(text, `${w}s`)
    if (i < 0) return { pos: -1, text: '' }
    first = Math.min(first, i)
  }
  return { pos: first, text: words.join(' ') }
}

const ABBR: Record<string, string[]> = {
  'chartered accountant': ['CA'],
  'software engineer': ['SDE', 'SWE'],
  'software developer': ['SDE', 'SWE', 'Software Engineer'],
  'software development engineer': ['SDE'],
  'business development representative': ['BDR'],
  'sales development representative': ['SDR'],
  'human resources': ['HR'],
  'user experience designer': ['UX Designer', 'UI/UX Designer'],
}

/** Part of the target matches (a shared word stem, or a known abbreviation): worth a warning,
 * not a fail. Returns the matched words from the headline. */
export function nearMiss(text: string, target: string): string | null {
  const t = norm(target).toLowerCase()
  for (const a of ABBR[t] ?? []) {
    const i = a === a.toUpperCase() ? findCase(text, a) : findPhrase(text, a)
    if (i >= 0) return text.substr(i, a.length)
  }
  const words = t
    .split(' ')
    .filter((w) => w.length > 3)
    .sort((x, y) => y.length - x.length)
  for (const w of words) {
    const stem = w.slice(0, Math.max(4, w.length - 4))
    const m = new RegExp(`(^|[^A-Za-z])(${esc(stem)}[A-Za-z]*)`, 'i').exec(text)
    if (m) return m[2]
  }
  return null
}

function findRoleWord(text: string): { pos: number; text: string } {
  let best = { pos: -1, text: '' }
  for (const w of ROLE_WORDS) {
    const i = w === 'ca' || w === 'cfa' ? findCase(text, w.toUpperCase()) : findPhrase(text, w)
    if (i >= 0 && (best.pos < 0 || i < best.pos)) best = { pos: i, text: text.substr(i, w.length) }
  }
  return best
}
function findCase(text: string, word: string): number {
  const m = new RegExp(`(^|[^A-Za-z])${word}(?=$|[^A-Za-z])`).exec(text)
  return m ? m.index + m[1].length : -1
}

const FANCY = /[\u{1D400}-\u{1D7FF}]/u
const EMOJI = /\p{Extended_Pictographic}/gu

/** A number that proves something. Years ("Class of 2026"), study years ("3rd year") and
 * years of experience ("6 yrs") are not proof. */
export function hasProofNumber(text: string): string | null {
  const re =
    /(?:[₹$€£]\s?)?\d[\d,.]*\s?(?:%|\+|x\b|k\b|m\b|lpa|cr\b|crore|lakh|users|students|clients|customers|hours|hrs|yrs|years|people|members|reps|countries|cities|modules|apps?|projects?|teams?|stores?)?/gi
  let m: RegExpExecArray | null
  while ((m = re.exec(text))) {
    const tok = m[0].trim()
    // "D2C", "B2B", "Web3", "H1B": a digit inside a word is not a number.
    if (m.index > 0 && /[A-Za-z]/.test(text[m.index - 1])) continue
    // "SDE-1", "L-4": a level after a letter and a hyphen.
    if (m.index > 1 && /[A-Za-z][-–]$/.test(text.slice(m.index - 2, m.index))) continue
    // Batch tags: "IIM Indore '26", "(2022-26)".
    if (m.index > 0 && /['’‘]/.test(text[m.index - 1])) continue
    if (/\d{4}\s?[-–]\s?$/.test(text.slice(Math.max(0, m.index - 6), m.index))) continue
    // Years of experience: "2+ YOE", "3 yrs exp".
    if (/^\s*(yoe|yrs?|years?|exp\b|experience)/i.test(text.slice(m.index + m[0].length))) continue
    const after = text.slice(m.index + m[0].length, m.index + m[0].length + 3)
    if (/^(19|20)\d{2}$/.test(tok)) continue
    if (/^[a-z]/i.test(after) && /^\d+$/.test(tok) && /^(st|nd|rd|th)/i.test(after)) continue
    if (/(\+\s*)?(yrs|years)$/i.test(tok)) continue
    if (/^\s*(yoe|exp\b|experience)/i.test(text.slice(m.index + tok.length))) continue
    if (/^\d+\+$/.test(tok) && /^\s*(yrs|years|yr|year)/i.test(text.slice(m.index + m[0].length)))
      continue
    return tok
  }
  return null
}

const OUTCOME =
  /\b(built|build|shipped|launched|grew|grow|reduced|cut|saved|increased|improved|automated|scaled|won|ranked|delivered|helped|helping|help|led|cleared|published|mentored|trained|closed|generated|raised)\b/i

const JOBHUNT: { re: RegExp; label: string }[] = [
  { re: /#?\s?open\s?to\s?work/i, label: 'open to work' },
  {
    re: /\b(seeking|looking for)\s+(new\s+|better\s+|exciting\s+|suitable\s+|full[- ]time\s+)?(opportunit(y|ies)|a job|jobs?|employment|work|openings?|roles?|positions?|a role|a position|a change)\b/i,
    label: 'seeking opportunities',
  },
  { re: /\bactively\s+(seeking|looking)\b/i, label: 'actively seeking' },
  { re: /\bunemployed\b/i, label: 'unemployed' },
  { re: /\bjob\s?seeker\b/i, label: 'job seeker' },
  { re: /\bdesperate\b/i, label: 'desperate' },
]

function buzzMatches(text: string): string[] {
  const out: string[] = []
  for (const w of BUZZ_ALL) {
    const re = new RegExp(`(^|[^A-Za-z])(${w})(?=$|[^A-Za-z])`, 'gi')
    let m: RegExpExecArray | null
    while ((m = re.exec(text))) {
      const start = m.index + m[1].length
      const word = m[2]
      if (TITLE_WORDS.has(w.toLowerCase())) {
        const next = text.slice(start + word.length).match(/^[\s-]+([A-Za-z0-9])/)
        const prev = text.slice(0, start).match(/([A-Za-z0-9+#])[A-Za-z0-9+#.]*\s+$/)
        const nextCap = !!next && /[A-Z0-9]/.test(next[1])
        const prevCap = !!prev && /[A-Z0-9]/.test(prev[0].trim()[0])
        // "Creative Director", "AWS Certified", "Strategic Partnerships" are titles, not puffery.
        if (nextCap || prevCap) {
          // ...unless the whole headline is title-cased and the next word is a generic noun.
          const nextWord =
            text
              .slice(start + word.length)
              .trim()
              .split(/[\s|,·•]+/)[0] || ''
          if (!/^(professional|individual|thinker|person|mind|leader|learner)$/i.test(nextWord))
            continue
        }
      }
      out.push(word)
    }
  }
  return out
}

function cuteMatches(text: string): string[] {
  return CUTE.filter((w) => findPhrase(text, w) >= 0).map((w) => {
    const i = findPhrase(text, w)
    return text.slice(i, i + w.length)
  })
}

/** "Student at X", "Analyst at Y": the shape LinkedIn fills in from your latest position. */
export function looksDefault(h: string): boolean {
  const t = norm(h)
  if (segments(t).length > 1) return false
  return /^[^|•·,]{2,60}\s+(at|@)\s+[^|•·,]{2,80}$/i.test(t) && t.split(' ').length <= 10
}

export function analyse(input: Input): Result {
  const raw = input.headline ?? ''
  const h = norm(raw)
  const chars = charCount(h)
  const segs = segments(h)
  const checks: Check[] = []
  const stage = input.stage

  // 1. Length
  checks.push(
    chars === 0
      ? {
          id: 'length',
          title: 'Length',
          status: 'fail',
          detail: 'Paste or write a headline to check it.',
          source: 'talentBlog',
        }
      : chars > LIMIT
        ? {
            id: 'length',
            title: 'Length',
            status: 'fail',
            detail: `${chars} characters. LinkedIn gives you ${LIMIT}, so it will not save; cut ${chars - LIMIT}.`,
            source: 'talentBlog',
          }
        : chars < 30
          ? {
              id: 'length',
              title: 'Length',
              status: 'warn',
              detail: `${chars} of ${LIMIT} characters. Room for 1 to 3 skills and a result after your role.`,
              source: 'uw',
            }
          : {
              id: 'length',
              title: 'Length',
              status: 'pass',
              detail: `${chars} of ${LIMIT} characters.`,
              source: 'talentBlog',
            }
  )

  // 2. Not LinkedIn's default
  const def = h && looksDefault(h)
  checks.push({
    id: 'default',
    title: 'Not the default',
    status: !h ? 'fail' : def ? (stage === 'student' ? 'fail' : 'warn') : 'pass',
    detail: !h
      ? 'Nothing to check yet.'
      : def
        ? stage === 'student'
          ? 'This reads like the headline LinkedIn fills in for you ("Student at College"). Say the role you are aiming for instead.'
          : 'This reads like the headline LinkedIn fills in from your latest position ("Title at Company"). It is searchable; add skills and a result after the title.'
        : 'Written by you, not the "Title at Company" default.',
    matched: def ? [h] : undefined,
    source: def && stage === 'student' ? 'notreDame' : 'salesDefault',
  })

  // 3. The role you want to be found for
  const tgt = findTarget(h, input.target)
  const roleHit = norm(input.target) ? tgt : findRoleWord(h)
  const near = norm(input.target) && tgt.pos < 0 ? nearMiss(h, input.target) : null
  // For placement, a near miss still counts: it is where the reader's eye finds the role.
  const place = roleHit.pos >= 0 ? roleHit : near ? { pos: h.indexOf(near), text: near } : roleHit
  checks.push({
    id: 'role',
    title: 'Names the role you want',
    status: !h
      ? 'fail'
      : roleHit.pos >= 0
        ? 'pass'
        : near
          ? 'warn'
          : norm(input.target)
            ? 'fail'
            : 'warn',
    detail: !h
      ? 'Nothing to check yet.'
      : norm(input.target)
        ? roleHit.pos >= 0
          ? `"${norm(input.target)}" is in your headline, so a recruiter searching for it can match it.`
          : near
            ? `Close: you wrote "${near}". If "${norm(input.target)}" is what recruiters search for, use those exact words.`
            : `"${norm(input.target)}" is not in your headline. Recruiters search by role; put the exact words in.`
        : roleHit.pos >= 0
          ? `Found a role word ("${roleHit.text}"). Add your target role above to check the exact words.`
          : 'No role found. Add the role you want to be found for (students can write "Aspiring Data Analyst").',
    matched: roleHit.pos >= 0 ? [roleHit.text] : near ? [near] : undefined,
    source: 'ttu',
  })

  // 4. Front-loaded
  checks.push({
    id: 'front',
    title: `Role in the first ${PREVIEW} characters`,
    status: place.pos < 0 ? 'warn' : place.pos + place.text.length <= PREVIEW ? 'pass' : 'warn',
    detail:
      place.pos < 0
        ? 'No role to place yet.'
        : place.pos + place.text.length <= PREVIEW
          ? `Starts at character ${place.pos + 1}, inside the part shown in narrow views.`
          : `Starts at character ${place.pos + 1}. Comments and phone search may cut it off; move it to the front.`,
    source: 'mit',
  })

  // 5. Skills / keywords
  const kws = splitList(input.keywords)
  if (kws.length) {
    const found = kws.filter(
      (k) =>
        findPhrase(h, k) >= 0 ||
        findPhrase(h, k.replace(/s$/i, '')) >= 0 ||
        findPhrase(h, `${k}s`) >= 0
    )
    checks.push({
      id: 'skills',
      title: 'Skills from the job post',
      status: found.length >= 1 ? 'pass' : 'warn',
      detail: found.length
        ? `${found.length} of ${kws.length} keywords appear: ${found.join(', ')}. One to three is enough.`
        : `None of your ${kws.length} keywords appear. Add the one or two that matter most.`,
      matched: found.length ? found : undefined,
      source: 'uf',
    })
  } else {
    const extra = Math.max(segs.length - 1, 0)
    checks.push({
      id: 'skills',
      title: 'Skills named',
      status: extra >= 1 ? 'pass' : 'warn',
      detail:
        extra >= 1
          ? `${segs.length} parts after splitting on separators. Paste job-post keywords above to check the exact ones.`
          : 'One part only. Add 1 to 3 skills after your role, split with " | ".',
      source: 'uw',
    })
  }

  // 6. Proof or value
  const num = hasProofNumber(h)
  const verb = h.match(OUTCOME)?.[0]
  checks.push({
    id: 'proof',
    title: 'A result or who you help',
    status: num || verb || stage === 'student' ? 'pass' : 'warn',
    detail:
      num || verb
        ? `Has proof: "${num ?? verb}".`
        : stage === 'student'
          ? 'Optional for students (passes either way), but a project with a number ("used by 600 students") stands out.'
          : 'Add one result with a number, or who you help ("helping D2C brands cut returns").',
    matched: num || verb ? [String(num ?? verb)] : undefined,
    source: 'uw',
  })

  // 7. Buzzwords and cute titles
  const buzz = buzzMatches(h)
  const cute = cuteMatches(h)
  const bad = [...buzz, ...cute]
  checks.push({
    id: 'buzz',
    title: 'No buzzwords or cute titles',
    status: bad.length === 0 ? 'pass' : bad.length >= 3 ? 'fail' : 'warn',
    detail:
      bad.length === 0
        ? 'None of LinkedIn’s overused words, and no "ninja" or "guru" titles.'
        : `${bad.length === 1 ? 'This word says' : 'These words say'} little that a recruiter would search for. Replace with a skill or a result.`,
    matched: bad.length ? bad : undefined,
    source: buzz.length ? 'learning' : 'uva',
  })

  // 8. Job-hunt phrases
  const hunt = JOBHUNT.map((j) => h.match(j.re)?.[0]?.trim()).filter((x): x is string => !!x)
  const openToWork = /open\s?to\s?work/i.test(h)
  checks.push({
    id: 'hunt',
    title: 'Role, not "seeking opportunities"',
    status: hunt.length ? 'warn' : 'pass',
    detail: hunt.length
      ? openToWork
        ? 'Use LinkedIn’s Open to Work setting instead (it can be shown to recruiters only) and spend these characters on your role and skills.'
        : '"Seeking opportunities" without a role says nothing about what you bring. Name the role ("Seeking Data Analyst roles") or drop it.'
      : 'No generic job-hunt phrases.',
    matched: hunt.length ? hunt : undefined,
    source: openToWork ? 'coursera' : 'muse',
  })

  // 9. Searchable plain text
  const fancy = FANCY.test(h)
  const emoji = h.match(EMOJI) ?? []
  // Acronyms ("CA", "GST", "SQL", "B2B") are not shouting: drop all-caps tokens of 4 letters or fewer.
  const noAcr = h.replace(/\b[A-Z0-9&.]{1,4}\b/g, ' ')
  const letters = noAcr.replace(/[^A-Za-z]/g, '')
  const upper = noAcr.replace(/[^A-Z]/g, '')
  const shouting = letters.length >= 12 && upper.length / letters.length > 0.7
  const issues = [
    fancy &&
      'Unicode bold or italic letters; they are different characters from plain letters, so a search for the plain word will not match them',
    emoji.length > 0 && `${emoji.length} emoji`,
    shouting && 'mostly capital letters',
  ].filter(Boolean) as string[]
  checks.push({
    id: 'plain',
    title: 'Plain, searchable text',
    status: fancy ? 'fail' : issues.length ? 'warn' : 'pass',
    detail: issues.length
      ? `Found ${issues.join('; ')}.`
      : 'Plain letters, no emoji: every word can be matched by search.',
    matched: emoji.length ? emoji : undefined,
    source: fancy ? 'unicode' : 'muse',
  })

  // 10. Not stuffed
  const words = h.toLowerCase().match(/[a-z][a-z+#.]{2,}/g) ?? []
  const counts = new Map<string, number>()
  for (const w of words) counts.set(w, (counts.get(w) ?? 0) + 1)
  const stop = new Set(['and', 'the', 'for', 'with', 'ex-'])
  const repeated = Array.from(counts.entries())
    .filter(([w, n]) => n >= 3 && !stop.has(w))
    .map(([w]) => w)
  const major = majorParts(h)
  const tooMany = major.length > 5 || segs.length > 9
  checks.push({
    id: 'stuffed',
    title: 'Not a keyword list',
    status: tooMany || repeated.length ? 'warn' : 'pass',
    detail: tooMany
      ? `${major.length} parts, ${segs.length} items. Pick the role, 1 to 3 skills and one result; a long list reads as stuffing.`
      : repeated.length
        ? `Repeated words: ${repeated.join(', ')}. Say each once.`
        : `${major.length} ${major.length === 1 ? 'part' : 'parts'}, nothing repeated.`,
    matched: repeated.length ? repeated : undefined,
    source: 'uw',
  })

  const arr = Array.from(h)
  return {
    chars,
    checks,
    passed: checks.filter((c) => c.status === 'pass').length,
    rolePos: place.pos,
    roleText: place.text,
    preview: arr.slice(0, PREVIEW).join(''),
    previewCut: arr.length > PREVIEW,
  }
}

// ---------- Build from parts ----------

export interface Parts {
  now: string // current role or degree, e.g. "Final-year B.Tech CSE"
  target: string // role you want, e.g. "Data Analyst"
  skills: string // comma separated
  proof: string // one result with a number
  audience: string // who you help (optional), e.g. "D2C brands"
  stage: Stage
}

export interface Draft {
  id: string
  name: string
  text: string
  why: string
}

const join = (xs: string[]) => xs.map(norm).filter(Boolean).join(' | ')

/** Trim a headline to the limit by dropping skills from the end, then the proof. */
function fit(
  parts: string[],
  skills: string[],
  tail: string[],
  build: (s: string[], t: string[]) => string[]
): string {
  let s = [...skills]
  let t = [...tail]
  let out = join(build(s, t))
  while (charCount(out) > LIMIT && s.length > 1) {
    s = s.slice(0, -1)
    out = join(build(s, t))
  }
  while (charCount(out) > LIMIT && t.length) {
    t = t.slice(0, -1)
    out = join(build(s, t))
  }
  return Array.from(out).slice(0, LIMIT).join('')
}

export function compose(p: Parts): Draft[] {
  const skills = splitList(p.skills).slice(0, 3)
  const sk = (s: string[]) => (s.length ? s.join(' · ') : '')
  const target = norm(p.target)
  const now = norm(p.now)
  const proof = norm(p.proof)
  const aud = norm(p.audience)
  const learner = p.stage === 'student' || p.stage === 'switcher'
  const drafts: Draft[] = []
  if (!target && !now) return drafts

  drafts.push({
    id: 'role-first',
    name: 'Role first',
    text: fit([], skills, [proof], (s, t) => [
      learner && target ? `Aspiring ${target}` : target || now,
      sk(s),
      ...t,
    ]),
    why: 'The words a recruiter types come first, then skills, then one result.',
  })

  if (learner && now && target) {
    drafts.push({
      id: 'now-next',
      name: 'Aspiring + now',
      text: fit([], skills, [proof], (s, t) => [`Aspiring ${target}`, now, sk(s), ...t]),
      why: 'The role you are aiming for first, with "aspiring" so no one reads it as a title you hold, then where you are now.',
    })
  } else if (now && target && now.toLowerCase() !== target.toLowerCase()) {
    drafts.push({
      id: 'now-next',
      name: 'Role + where you are now',
      text: fit([], skills, [proof], (s, t) => [target, now, ...t, sk(s)]),
      why: 'The role you want, then your current title or context, then the result before the skills.',
    })
  }

  if (aud && !learner) {
    drafts.push({
      id: 'who-you-help',
      name: 'Who you help',
      text: fit([], skills, [proof], (s, t) => [
        `${learner && target ? `Aspiring ${target}` : target || now} helping ${aud}`,
        ...t,
        sk(s),
      ]),
      why: 'Says who you are useful to, which reads as value rather than a list.',
    })
  } else if (proof) {
    drafts.push({
      id: 'proof-first',
      name: 'Proof up front',
      text: fit([], skills, [proof], (s, t) => [
        learner && target ? `Aspiring ${target}` : target || now,
        ...t,
        sk(s),
      ]),
      why: 'The result sits right after the role, inside the part most people see.',
    })
  }
  // De-duplicate identical drafts.
  const seen = new Set<string>()
  return drafts.filter((d) => d.text && !seen.has(d.text) && seen.add(d.text))
}
