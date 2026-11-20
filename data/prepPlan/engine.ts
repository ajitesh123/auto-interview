/**
 * Interview prep plan engine (pure functions, no AI, no network).
 *
 * Given today's date, the interview date, the rounds you face and the minutes you have on
 * weekdays and weekends, it builds a day-by-day plan:
 *   1. Foundation: the job post, the company, your resume, a 60–90 second pitch.
 *   2. Stories and round drills, practised out loud and timed, with spaced re-tellings of your
 *      stories from memory (retrieval practice spread over days).
 *   3. Mock interviews near the end, each followed by fixing the weakest answers.
 *   4. A light last day: logistics, questions to ask, sleep.
 * When the time does not cover every must-do task, it keeps the most important ones and lists
 * what it dropped and how many more minutes would cover it.
 *
 * Rules and where they come from (opened 20 Nov 2026):
 *   - Spaced study beats cramming; the best gap grows with how long you need to remember:
 *     Cepeda et al. 2006 (Psychological Bulletin), Cepeda et al. 2008 (Psychological Science).
 *   - Practice tests and distributed practice rated "high utility": Dunlosky et al. 2013, PSPI.
 *   - Structured interviews use the same questions and scale: Google re:Work; US OPM.
 *   - Rehearse out loud / record yourself; 2–3 minute STAR answers: Amazon interview guide (2025).
 *   - Think out loud; practise under time pressure: Meta Careers (SWE prep).
 *   - Practise orally with feedback, don't script: McKinsey careers blog (Jenny Phung).
 *   - Sleep improves learning: NIH NHLBI.
 *   - Arrive 10–15 min early; thank-you email within 24–48 hours: Harvard FAS career services.
 *   - Video: 5–10 minutes early for a final tech check: Harvard Law School.
 *   - Prepare questions to ask: Amazon interview guide; Microsoft Careers.
 */

export type RoundId = 'screen' | 'behavioural' | 'technical' | 'case' | 'presentation' | 'final'
export type Mode = 'video' | 'onsite'
export type Phase = 'foundation' | 'stories' | 'drills' | 'mocks' | 'taper'

export interface RoleOpt {
  id: string
  name: string
  hub?: string // our role hub path, when we have one
  salary?: string
  drillHint: string // what the technical drill means for this role
}

export const ROLES: RoleOpt[] = [
  {
    id: 'product-manager',
    name: 'Product manager',
    hub: '/product-manager',
    salary: '/product-manager/salary',
    drillHint: 'product sense, metrics and estimation questions',
  },
  {
    id: 'aipm',
    name: 'AI product manager',
    hub: '/aipm',
    drillHint: 'AI product sense, evals and metrics questions',
  },
  {
    id: 'data-analyst',
    name: 'Data analyst',
    hub: '/data-analyst',
    salary: '/data-analyst/salary',
    drillHint: 'SQL, Excel and metrics questions',
  },
  {
    id: 'ai-engineer',
    name: 'AI engineer',
    hub: '/ai-engineer',
    salary: '/ai-engineer/salary',
    drillHint: 'coding, LLM system design and evals questions',
  },
  {
    id: 'fde',
    name: 'Forward deployed engineer',
    hub: '/fde',
    salary: '/fde/salary',
    drillHint: 'coding, debugging and customer-scenario questions',
  },
  {
    id: 'gtm-engineer',
    name: 'GTM engineer',
    hub: '/gtm-engineer',
    salary: '/gtm-engineer/salary',
    drillHint: 'workflow, data and automation build questions',
  },
  {
    id: 'founders-office',
    name: "Founder's office",
    hub: '/founders-office',
    salary: '/founders-office/salary',
    drillHint: 'case, guesstimate and problem-solving questions',
  },
  {
    id: 'chief-of-staff',
    name: 'Chief of staff',
    hub: '/chief-of-staff',
    drillHint: 'prioritisation, operating cadence and case questions',
  },
  {
    id: 'growth',
    name: 'Growth / marketing',
    hub: '/growth',
    drillHint: 'funnel, experiment and channel questions',
  },
  {
    id: 'strategy-and-operations',
    name: 'Strategy and operations',
    hub: '/strategy-and-operations',
    drillHint: 'case, modelling and operations questions',
  },
  {
    id: 'other',
    name: 'Another role',
    drillHint: 'the technical questions your role is known for',
  },
]

export const ROUNDS: { id: RoundId; name: string; hint: string }[] = [
  {
    id: 'screen',
    name: 'Recruiter / HR screen',
    hint: 'Pitch, why this job, notice period, expected pay',
  },
  { id: 'behavioural', name: 'Behavioural', hint: '“Tell me about a time…” with STAR stories' },
  {
    id: 'technical',
    name: 'Technical / skills',
    hint: 'SQL, coding, product sense or role skills',
  },
  { id: 'case', name: 'Case / guesstimate', hint: 'Structure a problem out loud' },
  {
    id: 'presentation',
    name: 'Presentation / take-home',
    hint: 'Build and present a piece of work',
  },
  { id: 'final', name: 'Hiring manager / final', hint: 'Why us, first 90 days, fit' },
]

export const MINUTE_OPTS = [0, 30, 45, 60, 90, 120, 180, 240]
export const MAX_PLAN_DAYS = 28

export interface Inputs {
  today: string // YYYY-MM-DD (local)
  interview: string // YYYY-MM-DD
  role: string
  rounds: RoundId[]
  weekdayMin: number
  weekendMin: number
  mode: Mode
}

export interface Task {
  key: string // stable within a plan: base id + instance number
  title: string
  detail: string
  minutes: number
  phase: Phase
  must: boolean
  href?: string
  hrefLabel?: string
  tooLong?: boolean // longer than the day's budget on its own
}

export interface Day {
  date: string
  index: number // 1-based
  budget: number
  used: number
  phase: Phase
  tasks: Task[]
}

export interface Plan {
  ok: boolean
  error?: string
  daysLeft: number // calendar days from today to the interview
  start: string // first plan day
  days: Day[]
  budget: number // minutes available across plan days
  planned: number // minutes planned
  mustTotal: number
  mustPlanned: number
  dropped: Task[] // must-do tasks that did not fit
  shortBy: number // minutes needed to fit the dropped must-dos
  extraDrills: number
  mocks: number
  capped: boolean // more than MAX_PLAN_DAYS days away
  phaseMinutes: Record<Phase, number>
  loudMinutes: number // minutes spent saying answers out loud (pitch, stories, drills, mocks)
}

/* ---------------- dates (UTC maths on YYYY-MM-DD so time zones never shift a day) ---------------- */

const ISO = /^\d{4}-\d{2}-\d{2}$/
export function toUTC(d: string): number {
  const [y, m, day] = d.split('-').map(Number)
  return Date.UTC(y, m - 1, day)
}
export function fromUTC(t: number): string {
  return new Date(t).toISOString().slice(0, 10)
}
export function addDays(d: string, n: number): string {
  return fromUTC(toUTC(d) + n * 86400000)
}
export function diffDays(a: string, b: string): number {
  return Math.round((toUTC(b) - toUTC(a)) / 86400000)
}
export function isWeekend(d: string): boolean {
  const w = new Date(toUTC(d)).getUTCDay()
  return w === 0 || w === 6
}
const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
export function fmtDay(d: string): string {
  const t = new Date(toUTC(d))
  return `${DOW[t.getUTCDay()]} ${t.getUTCDate()} ${MON[t.getUTCMonth()]}`
}
export function fmtMin(m: number): string {
  if (m < 60) return `${m} min`
  const h = Math.floor(m / 60)
  const r = m % 60
  return r ? `${h} h ${r} min` : `${h} h`
}
export function localToday(): string {
  const n = new Date()
  const p = (x: number) => String(x).padStart(2, '0')
  return `${n.getFullYear()}-${p(n.getMonth() + 1)}-${p(n.getDate())}`
}

/* ---------------- task library ---------------- */

function roleOf(id: string): RoleOpt {
  return ROLES.find((r) => r.id === id) || ROLES[ROLES.length - 1]
}

type T = Omit<Task, 'key'> & { id: string }

function foundation(i: Inputs): T[] {
  const r = roleOf(i.role)
  const has = (x: RoundId) => i.rounds.includes(x)
  const out: T[] = [
    {
      id: 'jd',
      title: 'Read the job post line by line',
      detail:
        'Underline the 5 things it asks for most. These are what the interviewers will probe, so every story and drill should point at them.',
      minutes: 20,
      phase: 'foundation',
      must: true,
      href: '/resume-keyword-checker',
      hrefLabel: 'Check your resume against the post',
    },
    {
      id: 'company',
      title: 'Research the company',
      detail:
        'What it sells, to whom, how it makes money, and two recent news items. Write one line on why you want to work there.',
      minutes: 30,
      phase: 'foundation',
      must: true,
    },
    {
      id: 'resume',
      title: 'Walk through your own resume',
      detail:
        'For every line, be ready to say what you did, how, and the number it moved. Interviewers often open with “walk me through your resume”.',
      minutes: 20,
      phase: 'foundation',
      must: true,
    },
    {
      id: 'pitch',
      title: 'Write and say your 60–90 second pitch',
      detail:
        '“Tell me about yourself”: now, before, why this role. Say it out loud three times with a timer; do not memorise it word for word.',
      minutes: 25,
      phase: 'foundation',
      must: true,
    },
  ]
  if (has('screen') || has('final')) {
    out.push({
      id: 'pay',
      title: 'Know your expected pay and notice period',
      detail:
        'Recruiter screens often ask for expected pay and when you can join. Look up what people in the role earn and write one sentence with your range.',
      minutes: 20,
      phase: 'foundation',
      must: has('screen'),
      href: r.salary || '/salary-negotiation',
      hrefLabel: r.salary ? `${r.name} pay data` : 'Build your pay answer',
    })
  }
  if (r.hub) {
    out.push({
      id: 'questions',
      title: `Read the reported ${r.name} questions`,
      detail:
        'Skim the questions candidates report for this role and mark the 10 you would find hardest. Those are your drill list.',
      minutes: 25,
      phase: 'foundation',
      must: true,
      href: `${r.hub}#questions`,
      hrefLabel: `${r.name} question bank`,
    })
  }
  return out
}

function stories(i: Inputs): T[] {
  const has = (x: RoundId) => i.rounds.includes(x)
  if (!(has('behavioural') || has('final') || has('screen'))) return []
  const out: T[] = [
    {
      id: 'story-a',
      title: 'Draft 3 STAR stories',
      detail:
        'A win with a number, a failure and what you changed, a conflict you resolved. Situation and task in two sentences; most of the time on your actions.',
      minutes: 35,
      phase: 'stories',
      must: true,
      href: '/star-method',
      hrefLabel: 'STAR answer builder',
    },
    {
      id: 'story-b',
      title: 'Draft 3 more STAR stories',
      detail:
        'Leading without authority, a tight deadline, a decision you made with data. Six stories cover most behavioural questions.',
      minutes: 35,
      phase: 'stories',
      must: has('behavioural'),
      href: '/star-method',
      hrefLabel: 'STAR answer builder',
    },
    {
      id: 'story-say',
      title: 'Say each story out loud, then record one',
      detail:
        'Aim for about 2–3 minutes each. Play the recording back once and cut whatever you would skip as a listener.',
      minutes: 30,
      phase: 'stories',
      must: true,
    },
  ]
  if (has('behavioural')) {
    out.push({
      id: 'story-map',
      title: 'Map stories to the job post',
      detail:
        'Put each of the 5 things the post asks for next to a story. Any need without a story is your gap: find one today.',
      minutes: 15,
      phase: 'stories',
      must: false,
    })
  }
  if (has('final')) {
    out.push({
      id: 'why',
      title: 'Answer why this company, why this role, why now',
      detail:
        'Three sentences each, out loud. Then sketch what you would do in your first 90 days.',
      minutes: 30,
      phase: 'stories',
      must: true,
    })
  }
  return out
}

function roundSetup(i: Inputs): T[] {
  const r = roleOf(i.role)
  const has = (x: RoundId) => i.rounds.includes(x)
  const out: T[] = []
  if (has('technical'))
    out.push({
      id: 'tech-setup',
      title: 'List the skills the technical round will test',
      detail: `For a ${r.name.toLowerCase()} that usually means ${r.drillHint}. Rank them weakest first.`,
      minutes: 20,
      phase: 'drills',
      must: true,
      href: r.hub ? `${r.hub}#questions` : undefined,
      hrefLabel: r.hub ? 'Reported questions' : undefined,
    })
  if (has('case'))
    out.push({
      id: 'case-setup',
      title: 'Learn one case structure',
      detail:
        'Clarify the goal, lay out a structure, analyse the numbers, recommend. Say your assumptions out loud as you go.',
      minutes: 30,
      phase: 'drills',
      must: true,
    })
  if (has('presentation'))
    out.push(
      {
        id: 'pres-build',
        title: 'Build the presentation or take-home',
        detail:
          'Lead with your recommendation, one point per slide, numbers you can defend. Note the 3 questions you would ask if you were them.',
        minutes: 90,
        phase: 'drills',
        must: true,
      },
      {
        id: 'pres-rehearse',
        title: 'Rehearse the presentation out loud, timed, twice',
        detail: 'Stay inside the time they gave you, then answer your own 3 hard questions.',
        minutes: 30,
        phase: 'drills',
        must: true,
      }
    )
  return out
}

const TECH_FOCUS = [
  'your weakest topic',
  'your second-weakest topic',
  'a mixed set, as the interview mixes them',
  'redo every question you missed so far',
]
const CASE_FOCUS = [
  'one profitability or growth case',
  'two market-size estimates',
  'one case in an industry you do not know',
  'redo your weakest case from scratch',
]

function drill(i: Inputs, kind: 'tech' | 'case' | 'retell' | 'short', n: number): T {
  const r = roleOf(i.role)
  if (kind === 'short')
    return {
      id: `short-drill`,
      title: 'Quick round, out loud',
      detail: i.rounds.some((x) => x === 'technical' || x === 'case')
        ? `One timed question (${r.drillHint.split(',')[0]}), said out loud, then your pitch once. Note what you would change.`
        : 'Your pitch once, then two stories you have not told for a while, to a timer. Note what you would change.',
      minutes: 25,
      phase: 'drills',
      must: false,
    }
  if (kind === 'tech')
    return {
      id: `tech-drill`,
      title: `Timed drill, out loud: ${TECH_FOCUS[n % TECH_FOCUS.length]}`,
      detail: `Three ${r.drillHint}, no notes, about 15 minutes each, thinking out loud. Check your answers after and note every miss.`,
      minutes: 45,
      phase: 'drills',
      must: n === 0,
      href: r.hub ? `${r.hub}#questions` : undefined,
      hrefLabel: r.hub ? 'Question bank' : undefined,
    }
  if (kind === 'case')
    return {
      id: `case-drill`,
      title: `Case out loud, timed: ${CASE_FOCUS[n % CASE_FOCUS.length]}`,
      detail:
        'About 25 minutes out loud, stating your assumptions, then 15 minutes writing what you would do differently.',
      minutes: 40,
      phase: 'drills',
      must: n === 0,
    }
  return {
    id: `retell`,
    title: 'Retell your stories from memory',
    detail:
      'No notes: pick three stories at random and tell them to a timer. Pulling them from memory a few days apart is what makes them stick.',
    minutes: 15,
    phase: 'drills',
    must: n === 0,
  }
}

function mockPair(): T[] {
  return [
    {
      id: 'mock',
      title: 'Full mock interview, out loud',
      detail:
        'A voice interviewer asks real questions and follows up. Afterwards write down the 3 answers that felt weakest.',
      minutes: 30,
      phase: 'mocks',
      must: true,
      href: '/free-mock-interview',
      hrefLabel: 'Start a free mock interview',
    },
    {
      id: 'mock-fix',
      title: 'Fix and re-say your 3 weakest answers',
      detail: 'Rewrite each in a few bullet points, not a script, and say it again out loud.',
      minutes: 25,
      phase: 'mocks',
      must: true,
    },
  ]
}

export function taperTasks(i: Inputs): T[] {
  const out: T[] = [
    {
      id: 'logistics',
      title: 'Confirm the details',
      detail:
        'Time and time zone, the link or address, who you are meeting. Save the recruiter’s number or email in case something goes wrong.',
      minutes: 10,
      phase: 'taper',
      must: true,
    },
    i.mode === 'video'
      ? {
          id: 'tech-check',
          title: 'Test your setup',
          detail:
            'Camera, microphone, light on your face, a plain background, laptop charged, the meeting app updated.',
          minutes: 15,
          phase: 'taper',
          must: true,
        }
      : {
          id: 'route',
          title: 'Plan the route',
          detail:
            'Work back from arriving 10–15 minutes early. Print two copies of your resume and set out what you will wear.',
          minutes: 15,
          phase: 'taper',
          must: true,
        },
    {
      id: 'ask',
      title: 'Write 3 questions to ask them',
      detail: 'About the role, the team and how success is measured in the first months.',
      minutes: 10,
      phase: 'taper',
      must: true,
    },
    {
      id: 'skim',
      title: 'Light review only',
      detail:
        'Say your pitch once and skim your story list. No new topics tonight; stop early and sleep.',
      minutes: 15,
      phase: 'taper',
      must: true,
    },
  ]
  return out
}

export function dayOfChecklist(i: Inputs): string[] {
  return [
    i.mode === 'video'
      ? 'Log in 5–10 minutes early for a last camera and sound check'
      : 'Arrive 10–15 minutes early; use the time to settle',
    'Water, your resume, your 3 questions and a pen within reach',
    'Re-read the job post’s top 5 needs once',
    'Say your pitch out loud once before you start',
    'Think out loud in technical and case questions',
  ]
}

export function afterChecklist(): string[] {
  return [
    'Send a short thank-you email within 24–48 hours',
    'Write down every question you were asked while you still remember them',
    'Note the 2 answers you would change and practise them for the next round',
  ]
}

/* ---------------- the planner ---------------- */

function budgetFor(i: Inputs, d: string): number {
  return isWeekend(d) ? i.weekendMin : i.weekdayMin
}

function emptyPhases(): Record<Phase, number> {
  return { foundation: 0, stories: 0, drills: 0, mocks: 0, taper: 0 }
}

export function validate(i: Inputs): string | undefined {
  if (!ISO.test(i.today) || !ISO.test(i.interview)) return 'Pick your interview date.'
  const left = diffDays(i.today, i.interview)
  if (left < 0) return 'That date has passed. Pick the date of your next round.'
  if (i.rounds.length === 0) return 'Tick at least one round you will face.'
  if (left > 0 && i.weekdayMin === 0 && i.weekendMin === 0)
    return 'Give yourself some time on weekdays or weekends.'
  return undefined
}

export function buildPlan(i: Inputs): Plan {
  const base: Plan = {
    ok: false,
    daysLeft: 0,
    start: i.today,
    days: [],
    budget: 0,
    planned: 0,
    mustTotal: 0,
    mustPlanned: 0,
    dropped: [],
    shortBy: 0,
    extraDrills: 0,
    mocks: 0,
    capped: false,
    phaseMinutes: emptyPhases(),
    loudMinutes: 0,
  }
  const err = validate(i)
  if (err) return { ...base, error: err }
  const daysLeft = diffDays(i.today, i.interview)
  if (daysLeft === 0) return { ...base, ok: true, daysLeft: 0 }

  const capped = daysLeft > MAX_PLAN_DAYS
  const start = capped ? addDays(i.interview, -MAX_PLAN_DAYS) : i.today
  const n = diffDays(start, i.interview) // plan days: start .. interview-1
  const dates = Array.from({ length: n }, (_, k) => addDays(start, k))
  const days: Day[] = dates.map((d, k) => ({
    date: d,
    index: k + 1,
    budget: budgetFor(i, d),
    used: 0,
    phase: 'foundation',
    tasks: [],
  }))

  let seq = 0
  const mk = (t: T): Task => {
    const { id, ...rest } = t
    seq += 1
    return { ...rest, key: `${id}-${seq}` }
  }

  // 1. The last day before the interview is the taper day: light by design.
  const taper = days[days.length - 1]
  taper.phase = 'taper'
  const work = days.slice(0, -1)
  const tomorrow = work.length === 0
  for (const t of taperTasks(i)) {
    if (tomorrow && t.id === 'skim') continue // the whole plan is today
    const task = mk(t)
    taper.tasks.push(task)
    taper.used += task.minutes
  }

  const has = (x: RoundId) => i.rounds.includes(x)
  const storyRounds = has('behavioural') || has('final') || has('screen')
  const drillKinds: ('tech' | 'case')[] = []
  if (has('technical')) drillKinds.push('tech')
  if (has('case')) drillKinds.push('case')

  // 2. Every core task, with its natural order, a priority rank (1 = keep first) and the task
  //    it depends on (never planned without it, never planned before it).
  const all: T[] = [...foundation(i), ...stories(i), ...roundSetup(i)]
  drillKinds.forEach((k) => all.push(drill(i, k, 0)))
  if (storyRounds) all.push(drill(i, 'retell', 0))
  const ORDER = [
    'jd',
    'company',
    'resume',
    'pitch',
    'pay',
    'questions',
    'story-a',
    'tech-setup',
    'case-setup',
    'pres-build',
    'story-b',
    'story-say',
    'why',
    'tech-drill',
    'case-drill',
    'pres-rehearse',
    'story-map',
    'retell',
  ]
  const RANK: Record<string, number> = {
    pitch: 1,
    jd: 2,
    company: 3,
    'story-a': 4,
    'tech-setup': 5,
    'case-setup': 5,
    'pres-build': 5,
    mock: 6,
    'story-say': 7,
    'tech-drill': 8,
    'case-drill': 8,
    'pres-rehearse': 8,
    resume: 9,
    questions: 10,
    pay: 11,
    why: 12,
    'story-b': 13,
    retell: 14,
    'story-map': 20,
  }
  const NEEDS: Record<string, string> = {
    'story-b': 'story-a',
    'story-say': 'story-a',
    'story-map': 'story-a',
    retell: 'story-a',
    'pres-rehearse': 'pres-build',
    'tech-drill': 'tech-setup',
    'case-drill': 'case-setup',
  }
  const core = all.filter((t) => t.must)
  const extras = all.filter((t) => !t.must)

  // 3. Mock interviews: one per ~6 days you can study (max 3); at least one whenever any day has time.
  const active = work.filter((d) => d.budget > 0)
  const mockCount = tomorrow
    ? 1
    : active.length >= 1
      ? Math.min(3, Math.max(1, Math.round(active.length / 6)))
      : 0

  const room = tomorrow
    ? Math.max(budgetFor(i, taper.date) - taper.used, 0)
    : active.reduce((a, d) => a + d.budget, 0)
  // Short on time: one 30-minute mock with the fix folded in; stories and the mock move ahead of
  // research, and the two longest groundwork tasks are trimmed.
  const short = room < 240
  const pairFor = (): T[] =>
    short
      ? [
          {
            ...mockPair()[0],
            detail:
              'A voice interviewer asks real questions and follows up. Then re-say your weakest answer once, out loud.',
          },
        ]
      : mockPair()
  const mockUnit: T = { ...mockPair()[0], minutes: pairFor().reduce((a, t) => a + t.minutes, 0) }
  if (short) {
    RANK.mock = 3.5
    RANK['story-a'] = 3
    RANK.company = 4
    for (const t of core) {
      if (t.id === 'company') {
        t.minutes = 20
        t.detail =
          'Quick version: what it sells, to whom, one recent news item, and one line on why you want to work there.'
      }
      if (t.id === 'story-a') t.minutes = 30
    }
  }

  // 4. Choose what fits, most important first, never a task without the one it depends on.
  const ranked = [...core, ...(mockCount ? [mockUnit] : [])].sort(
    (a, b) => (RANK[a.id] ?? 30) - (RANK[b.id] ?? 30)
  )
  const chosen = new Set<string>()
  const dropped: Task[] = []
  let used = 0
  for (const t of ranked) {
    const need = NEEDS[t.id]
    const needOk = !need || chosen.has(need) || !all.some((x) => x.id === need)
    if (needOk && used + t.minutes <= room) {
      chosen.add(t.id)
      used += t.minutes
    } else dropped.push(mk(t))
  }
  const mustTotal =
    ranked.reduce((a, t) => a + t.minutes, 0) + taper.tasks.reduce((a, t) => a + t.minutes, 0)
  const byOrder = (a: T, b: T) => ORDER.indexOf(a.id) - ORDER.indexOf(b.id)
  const picked = core.filter((t) => chosen.has(t.id)).sort(byOrder)
  const mockPicked = chosen.has('mock')

  const insert = (d: Day, t: Task) => {
    const mi = d.tasks.findIndex((x) => x.phase === 'mocks')
    if (mi >= 0 && t.phase !== 'mocks') d.tasks.splice(mi, 0, t)
    else d.tasks.push(t)
    d.used += t.minutes
  }

  if (tomorrow) {
    // Everything happens today: chosen tasks, then the mock, then logistics.
    const todays = [...picked.map(mk), ...(mockPicked ? pairFor().map(mk) : [])]
    taper.tasks = [...todays, ...taper.tasks]
    taper.used += todays.reduce((a, t) => a + t.minutes, 0)
    taper.budget = Math.max(budgetFor(i, taper.date), taper.used)
  } else {
    taper.budget = taper.used
    const idx = (d: Day) => work.indexOf(d)

    // 5. Mocks go on the last study days, spaced back from the end; on each slot prefer a
    //    weekend day (more time). A pair that fits no single day is split over two days.
    const pairs: Task[][] = []
    if (mockPicked) pairs.push(pairFor().map(mk))
    for (let m = 1; m < mockCount; m++) {
      if (room - used < mockUnit.minutes) break
      pairs.push(pairFor().map((t) => mk({ ...t, must: false })))
      used += mockUnit.minutes
    }
    const spacing = Math.max(1, Math.floor(active.length / (pairs.length + 1)))
    const placedMockDays: number[] = []
    pairs.forEach((pair, k) => {
      const need = pair.reduce((a, t) => a + t.minutes, 0)
      const end = active.length - 1 - k * spacing
      const window = active.slice(Math.max(0, end - 2), end + 1).reverse() // latest first
      const fits = (d: Day) => d.used + need <= d.budget && !placedMockDays.includes(idx(d))
      const pick =
        window.find((d) => fits(d) && isWeekend(d.date)) ||
        window.find(fits) ||
        [...active].reverse().find(fits)
      if (pick) {
        pair.forEach((t) => insert(pick, t))
        placedMockDays.push(idx(pick))
        return
      }
      // split: mock on one day, the fix on the next study day
      if (pair.length === 2) {
        for (let a = active.length - 2; a >= 0; a--) {
          const d1 = active[a]
          const d2 = active[a + 1]
          if (d1.used + pair[0].minutes <= d1.budget && d2.used + pair[1].minutes <= d2.budget) {
            insert(d1, pair[0])
            insert(d2, pair[1])
            placedMockDays.push(idx(d1))
            return
          }
        }
      }
      if (pair[0].must) pair.forEach((t) => dropped.push(t))
    })

    // 6. Pack the chosen tasks in their natural order. Each goes on the earliest day with room
    //    that is not before the task it depends on (groundwork may fill any earlier gap).
    const dayOf: Record<string, number> = {}
    const place = (task: Task, from: number): number => {
      for (let di = from; di < work.length; di++) {
        const d = work[di]
        if (d.budget > 0 && d.used + task.minutes <= d.budget) {
          insert(d, task)
          return di
        }
      }
      return -1
    }
    const maxDay = Math.max(...work.map((d) => d.budget))
    let cursor = 0
    for (const t of picked) {
      const task = mk(t)
      const need = NEEDS[t.id]
      const from = need && dayOf[need] !== undefined ? dayOf[need] : 0
      let at = place(task, Math.max(from, t.phase === 'foundation' ? 0 : Math.min(cursor, from)))
      if (at < 0 && task.minutes > maxDay) {
        const d = work.reduce((a, b) => (b.budget - b.used > a.budget - a.used ? b : a))
        task.tooLong = true
        insert(d, task)
        at = idx(d)
      }
      if (at < 0 && (t.id === 'tech-drill' || t.id === 'case-drill')) {
        // no 45-minute gap left: a shorter two-question drill still gets it said out loud
        const shorter = {
          ...task,
          minutes: 25,
          title: task.title.replace(/^[^:]+:/, 'Short drill:'),
        }
        shorter.detail = 'Two questions, no notes, timed and out loud. Check your answers after.'
        at = place(shorter, from)
      }
      if (at < 0) {
        dropped.push(task)
        continue
      }
      dayOf[t.id] = at
      cursor = Math.max(cursor, at)
    }
    for (const t of dropped.length ? [] : extras.sort(byOrder)) {
      const need = NEEDS[t.id]
      if (need && dayOf[need] === undefined) continue
      const at = place(mk(t), need ? dayOf[need] : 0)
      if (at >= 0) dayOf[t.id] = at
    }

    // 7. Fill spare time: a story retelling every other day once the stories exist (spaced
    //    retrieval), up to 2 extra drills a day, then a 25-minute quick round in any gap left.
    let extra = 0
    let k = 0
    const firstStory = dayOf['story-a']
    let lastRetell = work.findIndex((d) => d.tasks.some((t) => t.key.startsWith('retell')))
    if (lastRetell < 0 && firstStory !== undefined) lastRetell = firstStory
    for (let di = 0; di < work.length; di++) {
      const d = work[di]
      if (d.budget <= 0) continue
      const hasRetell = d.tasks.some((t) => t.key.startsWith('retell'))
      if (hasRetell) lastRetell = di
      else if (storyRounds && firstStory !== undefined && di > firstStory && di - lastRetell >= 2) {
        const t = mk(drill(i, 'retell', 1))
        if (d.used + t.minutes <= d.budget) {
          insert(d, t)
          lastRetell = di
          extra++
        }
      }
      let added = 0
      while (drillKinds.length && added < 2) {
        const kind = drillKinds[k % drillKinds.length]
        const setup = kind === 'tech' ? 'tech-setup' : 'case-setup'
        if (dayOf[setup] === undefined || di < dayOf[setup]) break
        const t = mk(drill(i, kind, Math.floor(k / drillKinds.length) + 1))
        if (d.used + t.minutes > d.budget) break
        insert(d, t)
        added++
        extra++
        k++
      }
      const quick = mk(drill(i, 'short', 1))
      const readyForQuick = storyRounds
        ? firstStory !== undefined && di >= firstStory
        : di >= (cursor || 0)
      if (readyForQuick && d.used + quick.minutes <= d.budget && dropped.length === 0) {
        insert(d, quick)
        extra++
      }
    }
    base.extraDrills = extra
  }
  base.dropped = dropped
  base.mustTotal = mustTotal
  // phases and totals
  const phaseMinutes = emptyPhases()
  let planned = 0
  let mustPlanned = 0
  let loudMinutes = 0
  for (const d of days) {
    for (const t of d.tasks) {
      if (LOUD.test(t.key)) loudMinutes += t.minutes
      phaseMinutes[t.phase] += t.minutes
      planned += t.minutes
      if (t.must) mustPlanned += t.minutes
    }
    if (d.phase !== 'taper') {
      const counts = emptyPhases()
      d.tasks.forEach((t) => (counts[t.phase] += t.minutes))
      d.phase = (Object.keys(counts) as Phase[]).reduce((a, b) => (counts[b] > counts[a] ? b : a))
      if (d.tasks.length === 0) d.phase = 'drills'
    }
  }
  const budget = days.reduce((a, d) => a + d.budget, 0)
  const mocks = days.reduce((a, d) => a + d.tasks.filter((t) => /^mock-\d/.test(t.key)).length, 0)
  return {
    ok: true,
    daysLeft,
    start,
    days,
    budget,
    planned,
    mustTotal,
    mustPlanned,
    dropped,
    shortBy: dropped.reduce((a, t) => a + t.minutes, 0),
    extraDrills: base.extraDrills,
    mocks,
    capped,
    phaseMinutes,
    loudMinutes,
  }
}

const LOUD =
  /^(pitch|story-say|retell|tech-drill|case-drill|mock|mock-fix|pres-rehearse|why|skim)-\d/

export const PHASE_LABEL: Record<Phase, string> = {
  foundation: 'Groundwork',
  stories: 'Stories',
  drills: 'Drills',
  mocks: 'Mock interviews',
  taper: 'Last day: light',
}

/** Plain-text plan for copy and the calendar description. */
export function planText(p: Plan, i: Inputs): string {
  const lines = [`Interview prep plan · interview on ${fmtDay(i.interview)}`, '']
  for (const d of p.days) {
    lines.push(`Day ${d.index} · ${fmtDay(d.date)} · ${PHASE_LABEL[d.phase]} · ${fmtMin(d.used)}`)
    d.tasks.forEach((t) => lines.push(`  [ ] ${t.title} (${t.minutes} min)`))
    lines.push('')
  }
  lines.push(`Interview day · ${fmtDay(i.interview)}`)
  dayOfChecklist(i).forEach((c) => lines.push(`  [ ] ${c}`))
  lines.push('', 'Built free at https://www.autointerviewai.com/interview-prep-plan')
  return lines.join('\n')
}

/** Example inputs used on the page (fixed dates so the server render is stable). */
export const SAMPLE: Inputs = {
  today: '2026-11-23',
  interview: '2026-11-30',
  role: 'product-manager',
  rounds: ['screen', 'behavioural', 'technical'],
  weekdayMin: 60,
  weekendMin: 120,
  mode: 'video',
}

export function withDays(i: Inputs, n: number): Inputs {
  return { ...i, interview: addDays(i.today, n) }
}
