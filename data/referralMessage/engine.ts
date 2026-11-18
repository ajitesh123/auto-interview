// Referral Message Builder engine: pure functions, no AI, no network. The page's worked example,
// the client builder and the "check my message" panel all run through this file.
//
// Sources (opened 18 Nov 2026):
//  - LinkedIn connection-note limits: LinkedIn Help as quoted by Happenstance (published 26 Aug 2026,
//    updated 28 Aug 2026): "Members with basic (free) accounts can send up to five personalized
//    invitations to connect with a character limit of 200." Premium: "a character limit of 300".
//    https://happenstance.ai/how-to/ask-for-a-job-referral-on-linkedin (the 300 figure is
//    Happenstance's own statement; its LinkedIn quote covers the free limit.)
//    (LinkedIn's own help pages block automated reading, so we could not open them directly.)
//  - Length advice: Weekday "50–80 words is enough for a first message"
//    https://www.weekday.works/post/referral-message-for-job ; Taplio "3 to 5 sentences under 100
//    words" https://taplio.com/blog/linkedin-referral-request-examples ; HireFlow LinkedIn DMs
//    "under 120 words" https://hireflow.net/blog/referral-request-message-examples-us-short-and-polite
//  - Job ID + URL: "Send your message with the proper job id and URL of the opening"
//    https://workat.tech/general/article/linkedin-job-referrals-ys58hxrjj93f
//  - Resume link in the first message: Blind, engineering manager https://www.teamblind.com/post/iMeq6kEY
//  - "Please don't follow up with a '??'":
//    https://www.telecomhall.net/t/basic-etiquettes-when-asking-for-a-job-referral/27058

export type Rel = 'friend' | 'alumni' | 'stranger' | 'senior'
export type AskStyle = 'direct' | 'chat'
export type Channel = 'note' | 'dm' | 'email' | 'whatsapp'
export type Status = 'pass' | 'warn' | 'fail'

export interface Inputs {
  myName: string
  theirName: string
  company: string
  role: string
  jobId: string
  jobUrl: string
  resumeUrl: string
  fit: string // one line on why you fit, ideally with a number
  hook: string // what you share: "we both studied at NIT Trichy", "your post on dbt tests"
  rel: Rel
  ask: AskStyle
  applied: boolean
  connected: boolean // already a first-degree connection (skip the note)
}

export const NOTE_FREE = 200
export const NOTE_PREMIUM = 300
export const DM_TARGET = 100 // Taplio: under 100 words; Weekday 50–80
export const DM_MAX = 120 // HireFlow: under 120 words
export const EMAIL_TARGET = 150
export const EMAIL_MAX = 200
export const FOLLOW_UP_WORKING_DAYS = 5

export const RELS: { id: Rel; name: string; hint: string }[] = [
  { id: 'friend', name: 'Friend or ex-colleague', hint: 'They know your work.' },
  { id: 'alumni', name: 'Alumni', hint: 'Same college or bootcamp; you have not met.' },
  { id: 'stranger', name: 'Someone in the team', hint: 'Does the job you want; no link yet.' },
  { id: 'senior', name: 'Senior person', hint: 'Manager, director or founder.' },
]

export const BLANK: Inputs = {
  myName: '',
  theirName: '',
  company: '',
  role: '',
  jobId: '',
  jobUrl: '',
  resumeUrl: '',
  fit: '',
  hook: '',
  rel: 'alumni',
  ask: 'direct',
  applied: false,
  connected: false,
}

// Fictional people and a fictional company. Job IDs and links are placeholders.
export const SAMPLES: { id: string; label: string; inputs: Inputs }[] = [
  {
    id: 'analyst-alumni',
    label: 'Data analyst, asking an alumnus (India)',
    inputs: {
      myName: 'Priya Nair',
      theirName: 'Arjun',
      company: 'Northwind Payments',
      role: 'Data Analyst II',
      jobId: 'JR-48213',
      jobUrl: 'https://careers.northwind.example/jobs/48213',
      resumeUrl: 'https://drive.google.com/file/d/priya-nair-resume',
      fit: "I've spent 3 years as an analyst at a lending app and cut a weekly risk report from 6 hours to 40 minutes with SQL and Python",
      hook: 'we both studied at NIT Trichy',
      rel: 'alumni',
      ask: 'direct',
      applied: false,
      connected: false,
    },
  },
  {
    id: 'ae-colleague',
    label: 'Account executive, asking an ex-colleague (US)',
    inputs: {
      myName: 'Marcus Lee',
      theirName: 'Dana',
      company: 'Northwind Payments',
      role: 'Mid-Market Account Executive',
      jobId: 'R-10442',
      jobUrl: 'https://careers.northwind.example/jobs/10442',
      resumeUrl: 'https://www.dropbox.com/s/marcus-lee-resume.pdf',
      fit: 'I closed 112% of a $900K quota last year selling payroll software to 200–1,000 person companies',
      hook: 'we worked together on the Midwest team at Fieldline',
      rel: 'friend',
      ask: 'direct',
      applied: false,
      connected: true,
    },
  },
  {
    id: 'swe-stranger',
    label: 'New-grad software engineer, asking an engineer (chat first)',
    inputs: {
      myName: 'Rohan Gupta',
      theirName: 'Meera',
      company: 'Northwind Payments',
      role: 'Software Engineer I (2026 grads)',
      jobId: 'JR-50771',
      jobUrl: 'https://careers.northwind.example/jobs/50771',
      resumeUrl: 'https://drive.google.com/file/d/rohan-gupta-resume',
      fit: "I'm a final-year CSE student; my UPI expense tracker in Kotlin has 1,200 users on the Play Store",
      hook: 'I read your post on making payment retries idempotent',
      rel: 'stranger',
      ask: 'chat',
      applied: false,
      connected: false,
    },
  },
]

// ---------- helpers ----------

const t = (s: string) => (s || '').trim().replace(/\s+/g, ' ')
const HONORIFIC = /^(mr|mrs|ms|miss|dr|prof|sir|shri|smt|er)\.?$/i
/** First real name token: skips honorifics and tokens without a letter (emoji). */
const first = (name: string) =>
  t(name)
    .split(' ')
    .find((w) => /\p{L}/u.test(w) && !HONORIFIC.test(w)) || ''
const noDot = (s: string) => t(s).replace(/[.!?;:,\s]+$/, '')
// Lower-case the first letter unless it is "I" or an acronym/name-like word (second letter upper case).
const lower1 = (s: string) =>
  !s || /^I\b/.test(s) || /^[A-Z][A-Z]/.test(s) ? s : s[0].toLowerCase() + s.slice(1)
/** "the Data Analyst role." -> "Data Analyst" */
export const cleanRole = (s: string) =>
  noDot(s)
    .replace(/^the\s+/i, '')
    .replace(/\s+(role|position|opening|job|vacancy)$/i, '')
/** "Req #4471" / "Job ID: 4471" -> "4471" */
export const cleanId = (s: string) =>
  t(s).replace(/^(job\s*id|job\s*#|req(uisition)?(\s*(id|#|no\.?))?|id)\s*[:#.-]?\s*/i, '')

export function words(text: string): number {
  const m = text.trim().match(/\S+/g)
  return m ? m.length : 0
}

export function chars(text: string): number {
  return [...text].length
}

const roleOf = (i: Inputs) => cleanRole(i.role) || '[role]'

/** "the Data Analyst II role (job ID JR-48213)" with whatever the user gave. */
function roleRef(i: Inputs, withId = true): string {
  const id = cleanId(i.jobId)
  return withId && id ? `the ${roleOf(i)} role (job ID ${id})` : `the ${roleOf(i)} role`
}

function hookLine(i: Inputs): string {
  const h = noDot(i.hook)
  if (!h) return ''
  return `${h[0].toUpperCase()}${h.slice(1)}.`
}

function signoff(i: Inputs): string {
  return first(i.myName) || '[your name]'
}

// ---------- the messages ----------

/** Connection note: tries long to short and returns the first that fits the free limit. */
export function connectionNote(i: Inputs): string {
  const hi = `Hi ${first(i.theirName) || '[name]'}`
  const co = t(i.company) || '[company]'
  const role = roleOf(i)
  const h = noDot(i.hook)
  const me = signoff(i)
  const ask =
    i.ask === 'chat'
      ? `I'm applying for ${role} at ${co} and would value 10 minutes of your time to hear about the team.`
      : i.rel === 'friend'
        ? `I'm applying for ${role} at ${co}; could I send you the details for a referral?`
        : `I'm applying for ${role} at ${co}. Could I message you about a referral?`
  const short =
    i.ask === 'chat'
      ? `I'm applying for ${role} at ${co}. Open to a short chat?`
      : `I'm applying for ${role} at ${co}. Could I ask you about a referral?`
  const candidates = [
    h ? `${hi}, ${lower1(h)}. ${ask} Thanks, ${me}` : '',
    h ? `${hi}, ${lower1(h)}. ${short} ${me}` : '',
    `${hi}! ${ask} Thanks, ${me}`,
    `${hi}! ${short} ${me}`,
    `${hi}! Applying for ${role} at ${co}; may I message you? ${me}`,
    `${hi}! I'm applying for a role at ${co}; may I message you? ${me}`,
  ].filter(Boolean)
  return candidates.find((c) => chars(c) <= NOTE_FREE) ?? candidates[candidates.length - 1]
}

function fitSentence(i: Inputs): string {
  const f = noDot(i.fit)
  if (!f) return ''
  return /^(i|i['’]?m|i['’]?ve|i['’]?d|i['’]?ll|my|we)\b/i.test(f)
    ? `${f[0].toUpperCase()}${f.slice(1)}.`.replace(/^Im\b/, "I'm").replace(/^Ive\b/, "I've")
    : `In short: ${lower1(f)}.`
}

function linksBlock(i: Inputs): string[] {
  const out: string[] = []
  if (t(i.jobUrl)) out.push(`Job: ${t(i.jobUrl)}`)
  if (t(i.resumeUrl)) out.push(`Resume: ${t(i.resumeUrl)}`)
  return out
}

function appliedLine(i: Inputs): string {
  return i.applied
    ? "I've already applied on the careers site, so if your portal can't add a referral now, no problem at all."
    : ''
}

function opener(i: Inputs): string {
  const co = t(i.company) || '[company]'
  if (i.rel === 'friend') return `Hope things are good at ${co}!`
  if (i.connected) return i.rel === 'senior' ? 'I hope you are well.' : "Hope you're well!"
  return i.rel === 'senior' ? 'Thanks for connecting.' : 'Thanks for connecting!'
}

function askLine(i: Inputs): string {
  if (i.ask === 'chat') {
    const when = i.applied ? '' : ' before I do'
    return `I'm applying for ${roleRef(i)} and would value 10 minutes of your time to hear about the team${when}.`
  }
  if (i.rel === 'senior')
    return `I'm applying for ${roleRef(i)} and wanted to ask whether you'd be comfortable referring me, or pointing me to the right person on the team.`
  return `I'm applying for ${roleRef(i)} and wanted to ask if you'd be open to referring me.`
}

function closeLine(i: Inputs, summary: string, out: string): string {
  const ap = appliedLine(i)
  return [ap, i.ask === 'chat' ? '' : summary, ap || i.ask === 'chat' ? '' : out]
    .filter(Boolean)
    .join(' ')
}

/** LinkedIn message (after they accept, or to a first-degree connection). */
export function linkedinMessage(i: Inputs): string {
  const name = first(i.theirName) || '[name]'
  const lines: string[] = [`Hi ${name},`]
  const h = hookLine(i)
  lines.push(h ? `${opener(i)} ${h}` : opener(i))
  lines.push(`${askLine(i)} ${fitSentence(i)}`.trim())
  if (i.ask === 'chat')
    lines.push(
      "If after that you think I'd fit, I'd be grateful for a referral; if not, the advice alone helps."
    )
  const links = linksBlock(i)
  if (links.length) lines.push(links.join('\n'))
  const close = closeLine(
    i,
    'Below is a short summary you can paste into the referral form.',
    "Totally fine if it's not a fit."
  )
  if (close) lines.push(close)
  lines.push(`Thanks,\n${signoff(i)}`)
  return lines.join('\n\n')
}

/** WhatsApp: for people who already have your number. Shorter, no greeting block. */
export function whatsapp(i: Inputs): string {
  const name = first(i.theirName) || '[name]'
  const ask =
    i.ask === 'chat'
      ? `I'm applying for ${roleRef(i)} at ${t(i.company) || '[company]'}. Could we do a 10-minute call this week so I can hear about the team?`
      : `I'm applying for ${roleRef(i)} at ${t(i.company) || '[company]'}. Would you be open to referring me?`
  return [
    `Hi ${name}, ${i.rel === 'friend' ? 'hope all is well!' : `this is ${signoff(i)}.`} ${ask}`,
    fitSentence(i),
    linksBlock(i).join('\n'),
    i.ask === 'chat'
      ? 'No pressure if this week is busy.'
      : "No pressure at all if it's not possible.",
  ]
    .filter(Boolean)
    .join('\n\n')
}

/** A 2–3 line summary for the referrer to paste into their company's referral form. */
export function formBlurb(i: Inputs): string {
  const who = t(i.myName) || '[your name]'
  const f = noDot(i.fit)
  const h = noDot(i.hook)
  const parts = [
    `${who} for ${roleRef(i)}${t(i.company) ? ` at ${t(i.company)}` : ''}.`,
    h ? `How we know each other: ${lower1(h)}.` : '',
    f ? `Fit, in ${first(i.myName) ? `${first(i.myName)}'s` : 'their'} words: ${f}.` : '',
    t(i.resumeUrl) ? `Resume: ${t(i.resumeUrl)}` : '',
  ].filter(Boolean)
  return parts.join(' ')
}

export function emailSubject(i: Inputs): string {
  const id = cleanId(i.jobId)
  return `Referral request: ${roleOf(i)}${id ? ` (${id})` : ''}`
}

export function email(i: Inputs): string {
  const name = first(i.theirName) || '[name]'
  const lines: string[] = [`Hi ${name},`]
  const h = hookLine(i)
  const me = t(i.myName) || '[your name]'
  lines.push(
    `${h ? h + ' ' : ''}I'm ${me}, and I'm applying for ${roleRef(i)}${t(i.company) ? ` at ${t(i.company)}` : ''}.`
  )
  const fit = fitSentence(i)
  if (i.ask === 'chat') {
    lines.push(
      `${fit ? fit + ' ' : ''}${i.applied ? 'Could' : 'Before I go further, could'} I have 10 minutes of your time to understand the team? If you then feel I'd be a fit, a referral would mean a lot.`
    )
  } else {
    lines.push(`${fit ? fit + ' ' : ''}Would you be open to referring me?`)
  }
  const links = linksBlock(i)
  if (links.length) lines.push(links.join('\n'))
  const close = closeLine(
    i,
    'A summary for the referral form is below.',
    "Completely understand if it isn't a fit."
  )
  if (close) lines.push(close)
  lines.push(`Thank you,\n${me}`)
  return lines.join('\n\n')
}

/** The email as sent: body plus, for a direct ask, the form summary under a divider. */
export function emailWithBlurb(i: Inputs): string {
  return i.ask === 'direct'
    ? `${email(i)}\n\n---\nFor the referral form:\n${formBlurb(i)}`
    : email(i)
}

/** The LinkedIn message as sent: for a direct ask the form summary goes under it. */
export function dmWithBlurb(i: Inputs): string {
  return i.ask === 'direct'
    ? `${linkedinMessage(i)}\n\n---\nFor the referral form:\n${formBlurb(i)}`
    : linkedinMessage(i)
}

export function followUp(i: Inputs): string {
  const name = first(i.theirName) || '[name]'
  const id = cleanId(i.jobId)
  return [
    `Hi ${name}, a gentle nudge on my note about the ${roleOf(i)} role${id ? ` (${id})` : ''}. I know you're busy, so no worries if now isn't a good time.`,
    t(i.jobUrl) ? `The link again: ${t(i.jobUrl)}` : '',
    `Thanks, ${signoff(i)}`,
  ]
    .filter(Boolean)
    .join('\n\n')
}

export function thankYou(i: Inputs): string {
  const name = first(i.theirName) || '[name]'
  return `Hi ${name}, thank you for referring me for the ${roleOf(i)} role. I'll let you know how it goes, whatever the outcome. ${signoff(i)}`
}

// ---------- checks on any message ----------

export interface Check {
  id: string
  title: string
  status: Status
  detail: string
}

const URL_RE = /https?:\/\/[^\s)]+/gi
const JOB_URL_RE =
  /https?:\/\/\S*(jobs?|careers?|lever\.co|greenhouse\.io|ashbyhq|myworkdayjobs|workday|naukri|linkedin\.com\/jobs|smartrecruiters|icims|instahyre|wellfound|apply|workable|bamboohr|jobvite|taleo|oraclecloud|successfactors|recruitee|keka|darwinbox|freshteam|foundit|cutshort|indeed)\S*/i
const JOB_ID_RE =
  /\b(job|req(uisition)?|role|position)\s*(id|#|no\.?|number|code)\b|\b(JR|REQ|R)-?\d{3,}\b|#\s?\d{3,}\b|\b(id|req)\s*:?\s*\d{3,}\b/i
const RESUME_RE =
  /(resume|résumé|cv)\b[^\n]{0,60}https?:\/\/|https?:\/\/\S*(drive\.google|docs\.google|dropbox|notion\.site|\.pdf)|\b(attached|attaching)\b[^\n]{0,30}\b(resume|cv)\b|\b(resume|cv)\b[^\n]{0,20}\battached\b/i
const VAGUE_RE =
  /\bany\s+(open(ing|ings)?|vacanc(y|ies)|positions?|roles?|jobs?|opportunit(y|ies))(?![-\w])|\bif (there is|there are|you have) (any|an) (opening|vacanc|position|role)|\brefer me (to|for) (any|something)\b/i
const EASY_OUT_RE =
  /no worries|no problem|totally (fine|understand)|completely understand|no pressure|(if|isn['’]?t|it['’]?s not) (a )?(fit|possible)|understand if|no obligation|advice alone|(ok(ay)?|fine) if (not|you can['’]?t)|feel free to (say no|decline|ignore)|either way|no hard feelings/i
const ASK_RE = /\brefer(ral|ring|red)?\b|\bchat\b|\bcall\b|\bminutes\b|\bmessage you\b/i
const HYPE_RE =
  /kindly do the needful|\b(hi|hello|dear|respected)\s+(sir|ma['’]?am|madam)\b|urgent(ly)?\b|asap\b/i

/** A result number: a digit with a unit, after links and job IDs are removed. */
function hasResultNumber(text: string): boolean {
  const s = text
    .replace(URL_RE, ' ')
    .replace(JOB_ID_RE, ' ')
    .replace(/\b[A-Z]{1,4}-?\d{3,}\b/g, ' ')
  return /\d[\d,.]*\s*(%|x\b|k\b|K\b|lakh|crore|cr\b|hours?|hrs?|minutes?|mins?|users?|customers?|clients?|years?|yrs?|months?|weeks?|days?|people|members|students|million|M\b|\$|₹|cgpa|gpa|lpa|rank|percentile|ms\b|stars|downloads|projects|deals|accounts|leads|meetings|calls)|[$₹£€]\s?\d/i.test(
    s
  )
}

export function checkMessage(text: string, channel: Channel): { checks: Check[]; passed: number } {
  const full = text.trim()
  // Length counts only the message, not a form summary pasted under a '---' divider.
  const body = full
  const msg = full.split(/\n-{3,}\n/)[0]
  const w = words(msg)
  const c = chars(msg)
  const checks: Check[] = []

  if (channel === 'note') {
    checks.push({
      id: 'length',
      title: `Fits a free LinkedIn note (${NOTE_FREE} characters)`,
      status: c <= NOTE_FREE ? 'pass' : c <= NOTE_PREMIUM ? 'warn' : 'fail',
      detail:
        c <= NOTE_FREE
          ? `${c} characters: fits free and Premium accounts.`
          : c <= NOTE_PREMIUM
            ? `${c} characters: fits only Premium (${NOTE_PREMIUM}). Cut ${c - NOTE_FREE} for a free account.`
            : `${c} characters: too long even for Premium (${NOTE_PREMIUM}). Cut ${c - NOTE_FREE}.`,
    })
  } else {
    const target = channel === 'email' ? EMAIL_TARGET : DM_TARGET
    const max = channel === 'email' ? EMAIL_MAX : DM_MAX
    checks.push({
      id: 'length',
      title: `Short: under ${target} words`,
      status: w === 0 ? 'fail' : w <= target ? 'pass' : w <= max ? 'warn' : 'fail',
      detail:
        w <= target
          ? `${w} words. Short enough to read on a phone.`
          : `${w} words. Cut ${w - target}: referrers skim. Keep one line on fit, not a cover letter.`,
    })
  }

  checks.push({
    id: 'substance',
    title: 'Says what you want in the first message',
    status: w >= 12 && ASK_RE.test(body) ? 'pass' : 'fail',
    detail:
      w >= 12 && ASK_RE.test(body)
        ? 'It states the role and the ask, so nobody has to reply "yes?" first.'
        : w < 12
          ? 'Too short to act on. A bare "Hi" waits for a reply; say the role and the ask now.'
          : 'No clear ask. Say what you want: a referral, or a short chat.',
  })

  const vague = VAGUE_RE.test(body)
  checks.push({
    id: 'specific',
    title: 'Names one role, not "any openings"',
    status: vague ? 'fail' : 'pass',
    detail: vague
      ? 'Asks about "any openings". Find the role yourself and name it with its job ID and link (workat.tech).'
      : 'No "any openings" ask.',
  })

  if (channel !== 'note') {
    const job = JOB_URL_RE.test(body) || JOB_ID_RE.test(body)
    checks.push({
      id: 'job',
      title: 'Job ID or job link included',
      status: job ? 'pass' : 'fail',
      detail: job
        ? 'The referrer can find the exact posting in their portal.'
        : "Add the job ID and link. Referral portals work from the job's ID (AT&T's form asks for the requisition ID).",
    })
    const cv = RESUME_RE.test(body)
    checks.push({
      id: 'resume',
      title: 'Resume link (or attachment) included',
      status: cv ? 'pass' : 'warn',
      detail: cv
        ? 'They can check your fit without asking for it.'
        : 'Add a view-only resume link (Drive, Dropbox) so they need not ask.',
    })
    const num = hasResultNumber(body)
    checks.push({
      id: 'number',
      title: 'One line of fit with a number',
      status: num ? 'pass' : 'warn',
      detail: num
        ? 'A concrete result makes it easy to vouch for you.'
        : 'Add one result with a number: years, users, % saved, quota hit.',
    })
  }

  const out = EASY_OUT_RE.test(body)
  checks.push({
    id: 'easyout',
    title: 'Gives them an easy way to say no',
    status: out || channel === 'note' ? 'pass' : 'warn',
    detail:
      out || channel === 'note'
        ? channel === 'note' && !out
          ? 'Not needed in a 200-character note.'
          : 'A polite exit makes a yes more likely and keeps the door open.'
        : 'Add a line like "Totally fine if it\'s not a fit."',
  })

  const pushy = HYPE_RE.test(body) || /\?{2,}/.test(body)
  checks.push({
    id: 'tone',
    title: 'Plain, polite tone',
    status: pushy ? 'warn' : 'pass',
    detail: pushy
      ? 'Drop "kindly do the needful", "dear sir", "urgent" and "??". Write as you would to a colleague.'
      : 'No pushy or stiff phrases.',
  })

  return { checks, passed: checks.filter((x) => x.status === 'pass').length }
}

// ---------- follow-up dates (for the tracker) ----------

/** Adds n working days (Mon–Fri) to an ISO date. Holidays are not known, so they are not skipped. */
export function addWorkingDays(iso: string, n: number): string {
  const d = new Date(`${iso}T12:00:00Z`)
  if (Number.isNaN(d.getTime())) return iso
  let left = n
  while (left > 0) {
    d.setUTCDate(d.getUTCDate() + 1)
    const day = d.getUTCDay()
    if (day !== 0 && day !== 6) left--
  }
  return d.toISOString().slice(0, 10)
}

export function fmtDate(iso: string): string {
  const d = new Date(`${iso}T12:00:00Z`)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' })
}

// The "weak" message the worked example scores. Fictional, written to show common mistakes.
export const WEAK_DM =
  'Dear sir, I am looking for a job change urgently. Can you please refer me for any openings in your company? Kindly do the needful. Thanks'
