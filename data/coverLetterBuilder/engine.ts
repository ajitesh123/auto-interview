// Cover Letter Builder engine (/cover-letter). Pure functions, no network, no AI.
// The same code runs in the browser tool and at build time for the page's worked example,
// so every count on the page comes from here.
//
// Sources (opened and re-checked word for word on 28 Nov 2026):
// - MIT CAPD: "A cover letter should be no longer than one page with a font size between 10-12
//   points." / "If you are not sure who to address the letter to, write “Dear Hiring Manager.”"
//   https://capd.mit.edu/resources/how-to-write-an-effective-cover-letter/
// - National Careers Service (UK): "It’s a short letter, usually 3 to 5 paragraphs long." and the
//   sincerely / faithfully rule. https://nationalcareers.service.gov.uk/careers-advice/covering-letter
// - Prospects: "Typically, three to five concise paragraphs, cover letters should not exceed one
//   A4 page." https://www.prospects.ac.uk/careers-advice/cvs-and-cover-letters/cover-letters
// - University of Michigan: "E-mail: Use body of e-mail as cover letter starting with salutation."
//   https://careercenter.umich.edu/node/116
// - Internshala: "Aim for around 250-300 words." https://internshala.com/blog/cover-letter-for-internship/
// - Resume Genius (625 US hiring managers): "the average preferred length for a cover letter is
//   400 words." https://resumegenius.com/blog/cover-letter-help/cover-letter-statistics
import { analyse as analyseKeywords, type KeywordHit } from '@/data/keywordChecker/analyze'
import { SKILLS } from '@/data/keywordChecker/skills'

export type Stage = 'fresher' | 'intern' | 'experienced' | 'switcher'
export type Channel = 'email' | 'attach' | 'portal' | 'uk'
export type Status = 'pass' | 'warn' | 'fail'

export interface Draft {
  stage: Stage
  channel: Channel
  name: string
  contact: string // email · phone · city (one line)
  role: string
  company: string
  manager: string // e.g. "Ms Priya Rao"; blank = no name found
  hook: string // paragraph 1: the role, where you saw it, one specific reason
  proof: string // paragraph 2: one story with a number
  proof2: string // paragraph 3 (optional): a second proof, or the skill gap you closed
  fit: string // paragraph 4: why this company + what you would do first
  close: string // last paragraph; blank = the standard close below
}

export const BLANK: Draft = {
  stage: 'fresher',
  channel: 'email',
  name: '',
  contact: '',
  role: '',
  company: '',
  manager: '',
  hook: '',
  proof: '',
  proof2: '',
  fit: '',
  close: '',
}

export const STAGES: { id: Stage; label: string }[] = [
  { id: 'fresher', label: 'Fresher or campus' },
  { id: 'intern', label: 'Internship' },
  { id: 'experienced', label: 'Experienced' },
  { id: 'switcher', label: 'Changing careers' },
]

export const CHANNELS: { id: Channel; label: string; hint: string }[] = [
  {
    id: 'email',
    label: 'Email body',
    hint: 'Subject line + letter in the email itself, resume attached.',
  },
  {
    id: 'attach',
    label: 'PDF or Word file',
    hint: 'A one-page letter with your details and the date at the top.',
  },
  {
    id: 'portal',
    label: 'Portal text box',
    hint: 'Naukri, Internshala, Greenhouse or Lever box: body only, no greeting block.',
  },
  {
    id: 'uk',
    label: 'UK letter',
    hint: 'Same as a file, with the UK sign-off rule (sincerely / faithfully).',
  },
]

/** Word targets per channel. Full letters follow Internshala (250–300) to Resume Genius (≈400). */
export const TARGET: Record<Channel, { min: number; max: number; why: string }> = {
  email: { min: 250, max: 400, why: 'Internshala: 250–300 words; Resume Genius: 400 on average' },
  attach: { min: 250, max: 400, why: 'Internshala: 250–300 words; Resume Genius: 400 on average' },
  uk: { min: 250, max: 400, why: 'our band; Prospects: one A4 page' },
  portal: { min: 120, max: 300, why: 'our rule of thumb for a form box read on a small panel' },
}

export const PARTS: {
  key: 'hook' | 'proof' | 'proof2' | 'fit' | 'close'
  label: string
  job: string
  placeholder: Record<Stage, string>
  optional?: boolean
}[] = [
  {
    key: 'hook',
    label: '1 · Opening',
    job: 'Name the role, where you saw it, and one specific reason you want this one.',
    placeholder: {
      fresher:
        'I’m applying for the Graduate Engineer Trainee role at Mehta Systems, which I saw on your careers page. Your team’s work on …',
      intern:
        'I’m applying for the Marketing Intern role (6 months, Bengaluru) posted on Internshala. I’ve followed your Instagram since …',
      experienced:
        'I’m applying for the Account Executive role on your mid-market team. In four years selling payroll software I have …',
      switcher:
        'I’m applying for the Customer Success Associate role. After five years of teaching, I want to …',
    },
  },
  {
    key: 'proof',
    label: '2 · Proof',
    job: 'One story: the situation, what you did, and the number that moved.',
    placeholder: {
      fresher:
        'In my final-year project I built … It cut … from 40 minutes to 6, and 120 students used it in the first month.',
      intern:
        'As events lead of our college fest I ran … We grew registrations from 900 to 1,400 in three weeks.',
      experienced: 'Last year I closed ₹1.8 crore of new business against a ₹1.5 crore quota by …',
      switcher:
        'Each term I ran parent meetings for 40 families and cut missed homework by a third by …',
    },
  },
  {
    key: 'proof2',
    label: '3 · Second proof (optional)',
    job: 'Another skill the job post asks for, or how you closed a gap.',
    optional: true,
    placeholder: {
      fresher: 'I also completed … and used SQL to …',
      intern: 'I taught myself Canva and Meta Ads Manager and …',
      experienced: 'I also trained two new hires, who both hit quota by month four …',
      switcher: 'To prepare for this move I completed … and shadowed …',
    },
  },
  {
    key: 'fit',
    label: '4 · Why you, why them',
    job: 'Tie your proof to their need, and say what you would do first.',
    placeholder: {
      fresher: 'Your post asks for … In my first months I would …',
      intern: 'Your brand speaks to students like me, and I’d bring …',
      experienced: 'Your post mentions a new mid-market segment. I would start by …',
      switcher: 'Customer success is the part of teaching I enjoy most: …',
    },
  },
  {
    key: 'close',
    label: '5 · Close',
    job: 'Ask for the next step and thank them. Leave blank to use the standard close.',
    optional: true,
    placeholder: {
      fresher: '',
      intern: '',
      experienced: '',
      switcher: '',
    },
  },
]

/* ---------- small text helpers ---------- */

export const words = (s: string) => (s.trim().match(/\S+/g) ?? []).length
const clean = (s: string) => s.replace(/\s+/g, ' ').trim()
/** Company name without legal suffixes or punctuation: "Mehta Systems Pvt. Ltd." → "mehta systems". */
export const coreName = (s: string) =>
  ` ${s
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9 ]+/g, ' ')} `
    .replace(
      /\s(pvt|private|ltd|limited|llp|inc|llc|corp|corporation|co|company|plc|gmbh)(?=\s)/g,
      ' '
    )
    .replace(/\s+/g, ' ')
    .trim()
const hasName = (text: string, name: string) => {
  const n = coreName(name)
  return !!n && ` ${coreName(text)} `.includes(` ${n} `)
}

const norm = (s: string) =>
  s.toLowerCase().replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, ' ')

export function standardClose(d: Pick<Draft, 'role' | 'channel'>) {
  const role = clean(d.role)
  const what = role ? `the ${role} role` : 'this role'
  return `I would welcome the chance to talk about ${what}. Thank you for your time and consideration.`
}

/** A general greeting (no person named): UK letters then end "Yours faithfully" (Prospects). */
const GENERAL = /\b(sir|madam)\b|whom it may concern|hiring manager|\bteam\b|department|recruit/i

const managerName = (m: string) =>
  clean(m)
    .replace(/^dear\s+/i, '')
    .replace(/[,:]+$/, '')

export function greeting(d: Pick<Draft, 'manager'>) {
  const m = managerName(d.manager)
  return m ? `Dear ${m},` : 'Dear Hiring Manager,'
}

/** Sign-off: UK rule from the National Careers Service and Prospects; plain business sign-off otherwise. */
export function signOff(d: Pick<Draft, 'manager' | 'channel'>) {
  const m = managerName(d.manager)
  const named = !!m && !GENERAL.test(m)
  if (d.channel === 'uk') return named ? 'Yours sincerely,' : 'Yours faithfully,'
  if (d.channel === 'email') return 'Best regards,'
  return 'Yours sincerely,'
}

export function subjectLine(d: Pick<Draft, 'role' | 'name'>) {
  const role = clean(d.role) || '[Role]'
  const name = clean(d.name) || '[Your name]'
  return `Application for ${role} – ${name}`
}

export function fmtDate(dt: Date) {
  return dt.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

/** Body paragraphs in order (blank optional parts dropped; blank close → standard close). */
export function bodyParas(d: Draft): string[] {
  const out = [d.hook, d.proof, d.proof2, d.fit].map(clean).filter(Boolean)
  out.push(clean(d.close) || standardClose(d))
  return out
}

export interface Assembled {
  subject: string | null
  header: string[] // lines above the greeting (file / UK letter only)
  greeting: string | null
  paras: string[]
  signOff: string | null
  signature: string[]
  text: string // what Copy puts on the clipboard
}

export function assemble(d: Draft, today: Date = new Date()): Assembled {
  const paras = bodyParas(d)
  const name = clean(d.name) || '[Your name]'
  if (d.channel === 'portal') {
    return {
      subject: null,
      header: [],
      greeting: null,
      paras,
      signOff: null,
      signature: [],
      text: paras.join('\n\n'),
    }
  }
  const subject = d.channel === 'email' ? subjectLine(d) : null
  const header: string[] = []
  if (d.channel !== 'email') {
    header.push(name)
    if (clean(d.contact)) header.push(clean(d.contact))
    header.push('', fmtDate(today))
    const who = managerName(d.manager)
    const recipient = [who && !GENERAL.test(who) ? who : '', clean(d.company)].filter(Boolean)
    if (recipient.length) header.push('', ...recipient)
  }
  const g = greeting(d)
  const so = signOff(d)
  const signature = d.channel === 'email' ? [name, clean(d.contact)].filter(Boolean) : [name]
  const parts = [
    subject ? `Subject: ${subject}` : null,
    header.length ? header.join('\n') : null,
    g,
    ...paras,
    `${so}\n${signature.join('\n')}`,
  ].filter((x): x is string => !!x)
  return { subject, header, greeting: g, paras, signOff: so, signature, text: parts.join('\n\n') }
}

/* ---------- checks ---------- */

export const CLICHES = [
  'i am writing to express',
  'i am writing to apply',
  'i am writing this letter',
  'my name is',
  'esteemed organisation',
  'esteemed organization',
  'esteemed company',
  'reputed company',
  'reputed organisation',
  'reputed organization',
  'respected sir',
  'kindly consider',
  'please find attached',
  'pfa',
  'passionate',
  'team player',
  'quick learner',
  'hard-working',
  'hard worker',
  'detail-oriented',
  'perfect fit',
  'go-getter',
  'dynamic individual',
  'think outside the box',
  'i look forward to hearing from you',
  'do the needful',
  'respected madam',
  'to whom it may concern',
  'herewith',
  'i am a fresher',
]

const findCliches = (t: string) =>
  CLICHES.filter((c) =>
    new RegExp(`(^|[^a-z])${c.replace(/[- ]/g, '[- ]?')}([^a-z]|$)`).test(t.replace(/\//g, ' '))
  )

/** Numbers that show a result: %, money, counts. Years and phone-like runs don't count. */
// Words after a bare number that make it a label, not a result ("8.6 CGPA", "Class 8", "12-week").
const NOT_RESULT_AFTER =
  /^(cgpa|gpa|sgpa|percentile|weeks?|months?|years?|yrs?|semesters?|sem|std|grade|class)\b/i
const NOT_RESULT_BEFORE =
  /\b(class|grade|semester|sem|std|standard|cgpa|gpa|level|year|batch|no\.?|number)\s*$/i

export function resultNumbers(s: string): string[] {
  const re = /(₹|\$|£|€|\brs\.?\s?)?\d[\d,.]*(\s?(%|k\b|lakh|crore|cr\b|x\b|×|m\b))?/gi
  const out: string[] = []
  for (const m of s.matchAll(re)) {
    const raw = m[0].trim().replace(/[,.]$/, '')
    const at = m.index ?? 0
    const after = s.slice(at + m[0].length)
    const before = s.slice(0, at)
    const unit = !!(m[1] || m[2])
    if (/^(19|20)\d\d$/.test(raw) || /^\d{6,}$/.test(raw.replace(/[,\s]/g, ''))) continue
    if (!unit) {
      if (/^[-–]\s?[a-z]/i.test(after)) continue // "12-week", "2025-26"
      if (NOT_RESULT_AFTER.test(after.trim())) continue
      if (NOT_RESULT_BEFORE.test(before)) continue
      if (/\d[-–/]$/.test(before)) continue // second half of "2025-26"
    }
    out.push(raw)
  }
  return out
}

const sentences = (s: string) =>
  s
    .replace(
      /\b(Mr|Ms|Mrs|Dr|Prof|B|M|Pvt|Ltd|Inc|Co|Rs|No|St|Jr|Sr|Ph\.D|U\.S|e\.g|i\.e|vs|approx)\./gi,
      (x) => x.replace(/\./g, '§')
    )
    .replace(/([.!?])\s+(?=[A-Z“"‘'(])/g, '$1\u0000')
    .split('\u0000')
    .map((x) => x.replace(/§/g, '.').trim())
    .filter((x) => words(x) >= 3)

export interface Check {
  id: string
  label: string
  status: Status
  detail: string
  src?: { label: string; url: string }
}

export interface Report {
  bodyWords: number
  paraCount: number
  target: { min: number; max: number; why: string }
  checks: Check[]
  passed: number
  empty: boolean // nothing written yet: show checks as pending
  keywords: { matched: KeywordHit[]; missing: KeywordHit[]; title: string | null } | null
}

const SRC = {
  mit: {
    label: 'MIT CAPD',
    url: 'https://capd.mit.edu/resources/how-to-write-an-effective-cover-letter/',
  },
  ncs: {
    label: 'National Careers Service (UK)',
    url: 'https://nationalcareers.service.gov.uk/careers-advice/covering-letter',
  },
  prospects: {
    label: 'Prospects',
    url: 'https://www.prospects.ac.uk/careers-advice/cvs-and-cover-letters/cover-letters',
  },
  internshala: {
    label: 'Internshala',
    url: 'https://internshala.com/blog/cover-letter-for-internship/',
  },
  rg: {
    label: 'Resume Genius survey',
    url: 'https://resumegenius.com/blog/cover-letter-help/cover-letter-statistics',
  },
}

export function check(d: Draft, jobPost = ''): Report {
  const empty = ![d.hook, d.proof, d.proof2, d.fit].some((x) => x.trim())
  const paras = bodyParas(d)
  const body = paras.join('\n\n')
  const t = norm(body)
  const bodyWords = words(body)
  const target = TARGET[d.channel]
  const checks: Check[] = []
  const company = clean(d.company)
  const role = clean(d.role)

  // 1. Length
  const lo = target.min
  const hi = target.max
  const lenStatus: Status =
    bodyWords >= lo && bodyWords <= hi
      ? 'pass'
      : bodyWords >= lo * 0.6 && bodyWords <= hi * 1.15
        ? 'warn'
        : 'fail'
  checks.push({
    id: 'length',
    label: 'Length',
    status: lenStatus,
    detail:
      lenStatus === 'pass'
        ? `${bodyWords} words in the body: inside ${lo}–${hi} (${target.why}).`
        : bodyWords < lo
          ? `${bodyWords} words. Aim for ${lo}–${hi} (${target.why}): add the number to your proof or a line on what you would do first.`
          : `${bodyWords} words. Aim for ${lo}–${hi} (${target.why}): cut the second proof or any line that repeats your resume.`,
    src:
      d.channel === 'portal'
        ? undefined
        : d.channel === 'uk'
          ? SRC.prospects
          : d.stage === 'intern' || d.stage === 'fresher'
            ? SRC.internshala
            : SRC.rg,
  })

  // 2. Paragraphs (full letters only)
  const paraCount = paras.length
  if (d.channel !== 'portal') {
    const ok = paraCount >= 3 && paraCount <= 5
    checks.push({
      id: 'paras',
      label: '3 to 5 paragraphs',
      status: ok ? 'pass' : 'warn',
      detail: ok
        ? `${paraCount} paragraphs, the shape UK careers services describe.`
        : `${paraCount} paragraph${paraCount === 1 ? '' : 's'}. Careers services describe 3 to 5 short paragraphs: opening, proof, fit, close.`,
      src: SRC.ncs,
    })
  }

  // 3. Opening line
  const hook = norm(clean(d.hook))
  const weakOpen =
    /^(i am writing|i'm writing|my name is|respected|with reference to|this is to)/.test(hook)
  const namesTarget = (!!company && hasName(hook, company)) || (!!role && hook.includes(norm(role)))
  checks.push({
    id: 'opening',
    label: 'Opening says what and why',
    status: !hook ? 'fail' : weakOpen ? 'fail' : namesTarget ? 'pass' : 'warn',
    detail: !hook
      ? 'Write the opening: the role, where you saw it, and one reason you want it.'
      : weakOpen
        ? `It starts “${clean(d.hook).split(/\s+/).slice(0, 5).join(' ')}…”. Start with the role and your reason instead: “I’m applying for the ${role || '…'} role because …”.`
        : namesTarget
          ? 'The opening names the role or company, so the reader knows what this is in one line.'
          : 'Name the role or the company in the first paragraph, so the reader knows what this letter is for.',
    src: SRC.mit,
  })

  // 4. Company named in the body
  if (company) {
    const named = hasName(body, company)
    checks.push({
      id: 'company',
      label: 'Company named',
      status: named ? 'pass' : 'fail',
      detail: named
        ? `“${coreName(company)}” appears in the body: this letter could not be sent to another company unchanged.`
        : `“${company}” is not in the body. A letter that never names the company reads like one sent to fifty.`,
    })
  } else {
    checks.push({
      id: 'company',
      label: 'Company named',
      status: 'warn',
      detail: 'Add the company name above; the check needs it.',
    })
  }

  // 5. A number in the proof
  const proofText = `${d.proof} ${d.proof2}`
  const nums = resultNumbers(proofText)
  checks.push({
    id: 'number',
    label: 'Proof has a number',
    status: !clean(d.proof) ? 'fail' : nums.length ? 'pass' : 'warn',
    detail: !clean(d.proof)
      ? 'Write one story with a result: what you did and what changed.'
      : nums.length
        ? `Found ${nums
            .slice(0, 3)
            .map((n) => `“${n}”`)
            .join(', ')} in your proof.`
        : 'No result number in your proof. Add what changed: users, ₹ or $, %, hours saved, rank.',
  })

  // 6. Clichés
  const cl = findCliches(t)
  checks.push({
    id: 'cliches',
    label: 'No stock phrases',
    status: cl.length === 0 ? 'pass' : cl.length <= 2 ? 'warn' : 'fail',
    detail:
      cl.length === 0
        ? `None of our ${CLICHES.length} stock phrases (e.g. “esteemed organisation”, “team player”, “I am writing to express”).`
        : `Found: ${cl.map((c) => `“${c}”`).join(', ')}. Replace each with the fact behind it.`,
  })

  // 7. Sentences that start with "I"
  const ss = sentences(body)
  const iStarts = ss.filter((s) => /^I(\s|’|')/.test(s))
  const share = ss.length ? iStarts.length / ss.length : 0
  checks.push({
    id: 'i-starts',
    label: 'Not every sentence starts with “I”',
    status: ss.length === 0 ? 'warn' : share <= 0.5 ? 'pass' : share <= 0.7 ? 'warn' : 'fail',
    detail:
      ss.length === 0
        ? 'Write a few sentences first.'
        : `${iStarts.length} of ${ss.length} sentences start with “I”. ${share <= 0.5 ? 'Good balance.' : 'Start some with the result or the company: “Registrations grew…”, “Your team…”.'}`,
  })

  // 8. Greeting
  const m = managerName(d.manager)
  const oldGreeting = /\b(sir|madam)\b|whom it may concern/i.test(m)
  const doubled =
    /^\s*(dear|respected|hi|hello)\b/i.test(d.hook) ||
    /\b(regards|sincerely|faithfully|thanking you)\b[,.]?\s*\S*\s*\S*\s*$/i.test(d.close)
  checks.push({
    id: 'greeting',
    label: 'Greeting',
    status: doubled ? 'warn' : d.channel === 'portal' ? 'pass' : oldGreeting ? 'warn' : 'pass',
    detail: doubled
      ? 'Your opening or close already has a greeting or sign-off; the builder adds these for you, so delete them from the boxes.'
      : d.channel === 'portal'
        ? 'Portal boxes skip the greeting; start with your opening.'
        : oldGreeting
          ? 'Try to find a name first (the post, LinkedIn, the company site). If you can’t, MIT suggests “Dear Hiring Manager”.'
          : m
            ? `“${greeting(d)}” with “${signOff(d)}”${d.channel === 'uk' ? ' (UK rule: a named person gets “Yours sincerely”)' : ''}.`
            : `No name, so “Dear Hiring Manager,”${d.channel === 'uk' ? ' with “Yours faithfully” (UK rule for a general greeting)' : ''}. A name is better if you can find one.`,
    src: d.channel === 'uk' ? SRC.prospects : SRC.mit,
  })

  // 9. Asks for the next step
  const closeText = norm(clean(d.close) || standardClose(d))
  const asks = /\b(talk|discuss|conversation|interview|call|meet|chat|speak)\b/.test(closeText)
  checks.push({
    id: 'close',
    label: 'Close asks for a next step',
    status: asks ? 'pass' : 'warn',
    detail: asks
      ? 'Your close asks for a conversation and thanks the reader.'
      : 'Ask for the next step (“I’d welcome a call about …”) and thank the reader.',
  })

  // 10. Job-post words (only when a post is pasted)
  let keywords: Report['keywords'] = null
  if (clean(jobPost)) {
    const a = analyseKeywords(jobPost, body)
    keywords = { matched: a.matched, missing: a.missing, title: a.title.found }
    const must = a.keywords.filter((k) => k.priority === 'must')
    const mustHit = must.filter((k) => k.resumeCount > 0)
    // Skills only listed together in one sentence ("I know Java, Python and SQL") are not proof.
    // A sentence like "good knowledge of Java, Python and SQL" (3+ skills after a claim phrase) is a list, not proof.
    const listed = sentences(body).some(
      (s) =>
        /\b(knowledge of|skills? (in|like)|proficient|familiar with|good (at|in|with)|expertise in|i know|well[- ]versed|hands-on (with|in))\b/i.test(
          s
        ) && analyseKeywords(jobPost, s).matched.length >= 3
    )
    const st: Status =
      a.keywords.length === 0
        ? 'warn'
        : listed
          ? 'warn'
          : a.matched.length >= 3 || (must.length > 0 && mustHit.length === must.length)
            ? 'pass'
            : a.matched.length >= 1
              ? 'warn'
              : 'fail'
    checks.push({
      id: 'post',
      label: 'Uses the job post’s words',
      status: st,
      detail:
        a.keywords.length === 0
          ? `We found no skills from our ${SKILLS.length}-skill list in the post. Check you pasted the requirements part.`
          : `${a.matched.length} of ${a.keywords.length} skills from the post appear in your letter${must.length ? ` (${mustHit.length} of ${must.length} must-haves)` : ''}${listed ? ', but 3 or more are listed after “knowledge of” or similar. Show them inside a story instead.' : '. Our rule of thumb: show 3 or more inside your proof, not as a list.'}`,
    })
  }

  return {
    bodyWords,
    paraCount,
    target,
    checks,
    passed: empty ? 0 : checks.filter((c) => c.status === 'pass').length,
    empty,
    keywords,
  }
}
