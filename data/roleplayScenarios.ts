/**
 * Sales roleplay scenario library for /blog/12-realistic-sales-role-play-scenarios-sdr-mastery-2026.
 * Every scenario is built on an objection buyers really say, quoted from an opened source (checked 14 Nov 2026):
 * - Gong, "We found the top objections across 300M cold calls" (Armand Farrokh, 31 Jul 2024): category shares and
 *   the example objections in each category.
 * - SaaStr Q&A, Jason Lemkin, 17 Jul 2023: objections reps can and cannot overcome.
 * - RepVue Sales Floor thread, 13 May 2025: "great, send me an email".
 * One data file feeds the server-rendered library, the builder tool, the figures and the counts in the prose.
 */

export const CHECKED = '14 Nov 2026'

export type SourceRef = { label: string; url: string }

export const SOURCES = {
  gong300m: {
    label: 'Gong, 300M+ cold calls (31 Jul 2024)',
    url: 'https://www.gong.io/blog/we-found-the-top-objections-across-300m-cold-calls-heres-how-to-handle-them-all',
  },
  gongObjections: {
    label: 'Gong, 67,149 call recordings (12 Mar 2018)',
    url: 'https://www.gong.io/blog/handling-sales-objections',
  },
  gongColdCalls: {
    label: 'Gong, cold call stats (16 Aug 2021)',
    url: 'https://www.gong.io/blog/cold-call-stats',
  },
  saastr: {
    label: 'SaaStr, Jason Lemkin (17 Jul 2023)',
    url: 'https://www.saastr.com/some-classic-sales-objections-that-are-hard-to-overcome-and-some-you-can-get-over-if-you-put-in-the-work',
  },
  repvue: {
    label: 'RepVue Sales Floor thread (13 May 2025)',
    url: 'https://www.repvue.com/sales-floor/posts/on-all-my-cold-calls-it-seems-like-the-prospects-are-interested-but-i-keep-getting-to-a-point-where-they-say-great-send-me-an-email-any-way-to-handle-this-so-i-don-t-keep-getting-ghosted',
  },
  bridge: {
    label: 'Bridge Group, SDR report 2025 (351 B2B companies)',
    url: 'https://bridgegroupinc.com/research/sdr-tenure-and-ramp-time',
  },
  cso: {
    label: 'CSO Insights, 5th Sales Enablement Study (2019)',
    url: 'https://community.highspot.com/assets/2019/10/CSO-Insights-5th-Annual-Sales-Enablement-Study.pdf',
  },
} satisfies Record<string, SourceRef>

/** Gong's three objection categories across 300M+ cold calls (shares as published). */
export const GONG_SPLIT = [
  {
    id: 'dismissive',
    label: 'Dismissive',
    share: 49.5,
    examples: 'Not interested · Call me in 6 months · Send me some information · I’m in a meeting',
  },
  {
    id: 'situational',
    label: 'Situational',
    share: 42.6,
    examples: 'Too expensive · No budget · No resources / bandwidth · Product fit',
  },
  {
    id: 'existing',
    label: 'Existing solution',
    share: 7.9,
    examples: 'We do it in-house · Competitor · Stuck in a contract',
  },
] as const

export const GONG_TOP5_SHARE = 74
export const GONG_MONOLOGUE_SEC = 21.45
export const BRIDGE = { rampMonths: 3.0, tenureYears: 1.9, companies: 351 }
export const CSO = { dynamicWinRate: 55.2, gapVsRandom: 13.4, participants: 900 }

export type Group = 'dismissive' | 'situational' | 'existing' | 'late'

export const GROUPS: { id: Group; label: string; when: string }[] = [
  { id: 'dismissive', label: 'Brush-offs', when: 'First 30 seconds of a cold call' },
  { id: 'situational', label: 'Money and timing', when: 'Once the buyer is listening' },
  { id: 'existing', label: 'Existing solution', when: 'They already have something' },
  { id: 'late', label: 'Late-stage deal', when: 'Demo done, deal at risk' },
]

export type Scenario = {
  id: string
  n: number
  group: Group
  title: string
  /** The objection, as buyers say it, quoted from the source. */
  line: string
  source: SourceRef
  buyer: {
    role: string
    situation: string
    /** What is really going on; the rep has to find it. */
    hidden: string
    warmsIf: string
    endsIf: string
  }
  rep: {
    goal: string
    mustDo: string
    /** What a winning round ends with. */
    win: string
    /** One strong first answer, as a model (not a script). */
    example: string
  }
  /** Minutes for one round at medium difficulty. */
  minutes: number
}

export const SCENARIOS: Scenario[] = [
  {
    id: 'in-a-meeting',
    n: 1,
    group: 'dismissive',
    title: '“I’m in a meeting”',
    line: 'I’m in a meeting.',
    source: SOURCES.gong300m,
    buyer: {
      role: 'Head of a 12-person team, answering between calls',
      situation: 'Picks up on the second ring, sounds rushed, already reaching to hang up.',
      hidden:
        'Has 2 minutes; will give them only if the reason for the call is about their team, not your product.',
      warmsIf:
        'The rep says who they are and why they called in one sentence, then asks for 30 seconds.',
      endsIf: 'The rep asks “Did I catch you at a bad time?” or starts the pitch without asking.',
    },
    rep: {
      goal: 'Earn 30 seconds or a booked callback.',
      mustDo: 'State the reason for calling in the first 15 seconds.',
      win: 'A callback with a day and time, or 30 seconds granted now.',
      example:
        'It’s Priya from Acme. I called because team leads like you tell us new hires take months to get useful. Can I have 30 seconds, or is 4 pm better?',
    },
    minutes: 3,
  },
  {
    id: 'where-did-you-get-my-number',
    n: 2,
    group: 'dismissive',
    title: '“Where’d you get my number?”',
    line: 'Where’you get my number!?',
    source: SOURCES.gong300m,
    buyer: {
      role: 'Operations manager, called on a mobile number',
      situation:
        'Annoyed and suspicious; asks the question before the rep finishes the first sentence.',
      hidden:
        'Gets 5 sales calls a week and assumes this one is a list buy. Will listen if the answer is plain and honest.',
      warmsIf:
        'The rep answers the question directly, without apologising twice, and gives a reason tied to their role.',
      endsIf: 'The rep dodges the question or pretends to be someone else.',
    },
    rep: {
      goal: 'Rebuild trust in one answer, then earn the reason to continue.',
      mustDo: 'Answer the question truthfully in one sentence before anything else.',
      win: 'The buyer asks a question back about what you do.',
      example:
        'Fair question. It came from [say where you really got it], and I called because you run operations there. Can I tell you why in 20 seconds?',
    },
    minutes: 3,
  },
  {
    id: 'send-me-an-email',
    n: 3,
    group: 'dismissive',
    title: '“Great, send me an email”',
    line: 'Great, send me an email.',
    source: SOURCES.repvue,
    buyer: {
      role: 'Director who sounded interested for the first minute',
      situation: 'Ends the call politely the moment the rep pauses.',
      hidden:
        'One reply in that thread put it bluntly: 95% of the time it is “just to get you off the phone”. This buyer has no reason to open the email yet.',
      warmsIf:
        'The rep agrees, then asks what would make the email worth opening (one problem, one number).',
      endsIf: 'The rep says “Sure, what’s your email?” and hangs up happy.',
    },
    rep: {
      goal: 'Turn the brush-off into a reason the email will be read, or a next step.',
      mustDo:
        'Ask one question that tests whether the interest is real before agreeing to send anything.',
      win: 'A meeting, or an email the buyer asked for with a named topic and a reply date.',
      example:
        'Happy to. So it’s worth opening: what is the one thing about ramping new reps you’d want it to answer?',
    },
    minutes: 4,
  },
  {
    id: 'not-interested',
    n: 4,
    group: 'dismissive',
    title: '“Not interested”',
    line: 'Not interested.',
    source: SOURCES.gong300m,
    buyer: {
      role: 'VP Sales at a 200-person company',
      situation: 'Says it flatly, 8 seconds into the call.',
      hidden:
        'Not interested in “a tool”; is very interested in why new reps take so long to ramp. Never got that far on a call before.',
      warmsIf:
        'The rep asks what they are working on this quarter instead of defending the product.',
      endsIf: 'The rep repeats the pitch louder or argues.',
    },
    rep: {
      goal: 'Find out whether “not interested” is about you or about now.',
      mustDo: 'Pause, acknowledge, then ask one question; no pitch in the first answer.',
      win: 'The buyer names a problem in their own words.',
      example:
        'That’s fair, most people aren’t on a cold call. Out of interest, what is your team focused on this quarter?',
    },
    minutes: 3,
  },
  {
    id: 'call-me-in-6-months',
    n: 5,
    group: 'dismissive',
    title: '“Call me in 6 months”',
    line: 'Call me in 6 months.',
    source: SOURCES.gong300m,
    buyer: {
      role: 'Founder and CEO of a 40-person startup',
      situation: 'Friendly, busy, wants the rep gone without being rude.',
      hidden:
        'A hiring plan starts next quarter; that is the real trigger, and the founder will say so if asked what changes in 6 months.',
      warmsIf: 'The rep asks what will be different in 6 months.',
      endsIf: 'The rep just books a reminder and leaves.',
    },
    rep: {
      goal: 'Learn the trigger behind the timing.',
      mustDo: 'Ask what changes between now and then.',
      win: 'A dated follow-up tied to the trigger, or an earlier meeting because the trigger is sooner.',
      example: 'Will do. What changes between now and then, so I call at the right moment?',
    },
    minutes: 3,
  },
  {
    id: 'not-my-responsibility',
    n: 6,
    group: 'dismissive',
    title: '“Not my responsibility”',
    line: 'Not my responsibility.',
    source: SOURCES.gong300m,
    buyer: {
      role: 'Marketing manager reached by mistake',
      situation: 'Polite; correct that it is not their area.',
      hidden: 'Knows exactly who owns it and has opinions about how badly it runs.',
      warmsIf: 'The rep asks who owns it and what they would want that person to hear.',
      endsIf: 'The rep keeps pitching to the wrong person.',
    },
    rep: {
      goal: 'Get a referral with a reason.',
      mustDo: 'Ask for the owner by name and what problem they would care about.',
      win: 'A name, a role and permission to mention this call.',
      example: 'Thanks for telling me. Who does own it, and what would you want them to fix first?',
    },
    minutes: 3,
  },
  {
    id: 'too-expensive',
    n: 7,
    group: 'situational',
    title: '“Too expensive”',
    line: 'Too expensive.',
    source: SOURCES.gong300m,
    buyer: {
      role: 'Finance lead joining a second call',
      situation: 'Has seen the price page and opens with it.',
      hidden:
        'Compares you with a cheaper tool that does half the job; has never priced the cost of the problem itself.',
      warmsIf:
        'The rep asks “compared with what?” and works out the cost of the problem with the buyer’s own numbers.',
      endsIf: 'The rep offers a discount in the first minute.',
    },
    rep: {
      goal: 'Move the conversation from price to cost of the problem.',
      mustDo: 'Ask what the buyer is comparing the price with before answering.',
      win: 'The buyer states the cost of the problem in a number.',
      example:
        'Compared with what? If we put a number on what the problem costs you today, we can see whether the price makes sense.',
    },
    minutes: 5,
  },
  {
    id: 'no-budget',
    n: 8,
    group: 'situational',
    title: '“No budget”',
    line: 'No budget.',
    source: SOURCES.gong300m,
    buyer: {
      role: 'Team lead, not the budget owner',
      situation: 'Likes the idea, says there is no budget this year.',
      hidden:
        'Budget exists in another line (training or tools) and the team lead does not know how to ask for it.',
      warmsIf: 'The rep asks how a purchase like this got approved last time.',
      endsIf: 'The rep pushes for a decision the team lead cannot make.',
    },
    rep: {
      goal: 'Map how money really gets approved.',
      mustDo: 'Ask how the last similar purchase was approved and by whom.',
      win: 'The name of the budget owner and a plan to bring them in.',
      example: 'Understood. How did the last tool like this get approved, and who signed it off?',
    },
    minutes: 5,
  },
  {
    id: 'no-bandwidth',
    n: 9,
    group: 'situational',
    title: '“No bandwidth right now”',
    line: 'No resources / bandwidth.',
    source: SOURCES.gong300m,
    buyer: {
      role: 'Enablement manager running 3 projects',
      situation: 'Agrees the problem is real; cannot take on a rollout.',
      hidden:
        'Fears the setup, not the product; would say yes to something that takes under a week.',
      warmsIf: 'The rep asks what a rollout would need from them and makes it smaller.',
      endsIf: 'The rep lists every feature.',
    },
    rep: {
      goal: 'Shrink the first step until it fits.',
      mustDo: 'Ask what the buyer would have to do, then offer a smaller first step.',
      win: 'Agreement to a first step that takes under a week of their time.',
      example:
        'Makes sense. What would a rollout need from you? Let’s see if there’s a first step that takes under a week.',
    },
    minutes: 5,
  },
  {
    id: 'we-do-it-in-house',
    n: 10,
    group: 'existing',
    title: '“We do it in-house”',
    line: 'We do it in-house.',
    source: SOURCES.gong300m,
    buyer: {
      role: 'Head of a team that built its own process',
      situation: 'Proud of the internal setup; slightly defensive.',
      hidden: 'The in-house process depends on one senior person who is overloaded.',
      warmsIf: 'The rep asks how it works today and what happens when that person is away.',
      endsIf: 'The rep says the in-house way is wrong.',
    },
    rep: {
      goal: 'Find the cost of the in-house way without attacking it.',
      mustDo: 'Ask how the current process works before saying anything about yours.',
      win: 'The buyer names a gap in their own process.',
      example:
        'Good to hear you’ve built something. How does it work today, and what happens when the person who runs it is away?',
    },
    minutes: 5,
  },
  {
    id: 'stuck-in-a-contract',
    n: 11,
    group: 'existing',
    title: '“We’re stuck in a contract”',
    line: 'Stuck in a contract.',
    source: SOURCES.gong300m,
    buyer: {
      role: 'Ops director, 14 months left on a competitor contract',
      situation: 'Not unhappy enough to break the contract.',
      hidden: 'Renewal planning starts 4 months before the end date; nobody owns it yet.',
      warmsIf: 'The rep asks when the contract ends and how renewal decisions get made.',
      endsIf: 'The rep pushes them to break the contract.',
    },
    rep: {
      goal: 'Get on the renewal calendar honestly.',
      mustDo: 'Ask for the end date and who decides the renewal.',
      win: 'A dated check-in before the renewal window opens.',
      example: 'No need to break it. When does it end, and who decides the renewal?',
    },
    minutes: 4,
  },
  {
    id: 'competitor-safer-bet',
    n: 12,
    group: 'late',
    title: '“Your competitor seems the safer bet”',
    line: 'Your competitor seems the safer bet.',
    source: SOURCES.saastr,
    buyer: {
      role: 'Buying committee lead after two demos',
      situation: 'Leaning to the bigger, better-known vendor.',
      hidden:
        'Afraid of blame if a smaller vendor fails; needs proof for their boss, not more features.',
      warmsIf:
        'The rep asks what “safe” would have to look like and offers a way to reduce the risk.',
      endsIf: 'The rep criticises the competitor.',
    },
    rep: {
      goal: 'Name the risk and make it smaller.',
      mustDo: 'Ask what would make the choice feel safe to the people they report to.',
      win: 'An agreed risk reducer: a reference call, a pilot with exit terms, or a phased start.',
      example:
        'That’s a reasonable worry. What would make this feel safe to the people you report to: a reference call, a pilot with exit terms, or a phased start?',
    },
    minutes: 6,
  },
  {
    id: 'team-not-sure',
    n: 13,
    group: 'late',
    title: '“The rest of the team’s not sure”',
    line: 'The rest of the team’s not sure.',
    source: SOURCES.saastr,
    buyer: {
      role: 'Champion who liked the demo',
      situation: 'Comes back after an internal meeting with doubts they will not name.',
      hidden: 'One colleague raised a security question the champion could not answer.',
      warmsIf: 'The rep asks who is unsure and what exactly they asked.',
      endsIf: 'The rep asks the champion to “push it through”.',
    },
    rep: {
      goal: 'Find the real doubt and who holds it.',
      mustDo: 'Ask who is not sure and what they said, word for word.',
      win: 'A meeting with the doubter, or the exact question to answer in writing.',
      example: 'Thanks for being straight with me. Who isn’t sure, and what exactly did they ask?',
    },
    minutes: 6,
  },
  {
    id: 'need-a-pilot',
    n: 14,
    group: 'late',
    title: '“We need to start with a pilot”',
    line: 'I need to start with a pilot.',
    source: SOURCES.saastr,
    buyer: {
      role: 'Senior manager with a cautious boss',
      situation: 'Will not sign a full deal; wants to try first.',
      hidden: 'Has no idea what a successful pilot would prove; a vague pilot will drift and die.',
      warmsIf: 'The rep agrees and asks what result would make the full rollout an easy yes.',
      endsIf: 'The rep agrees to a free pilot with no end date or success measure.',
    },
    rep: {
      goal: 'Turn “pilot” into a test with a date and a pass mark.',
      mustDo: 'Agree success criteria and an end date before agreeing the pilot.',
      win: 'A written pilot plan: who, how long, what number counts as success, what happens next.',
      example:
        'Let’s do one. What result at the end would make the full rollout an easy yes, and by what date?',
    },
    minutes: 6,
  },
]

/** The same four criteria score every scenario; the third one uses the scenario's own must-do. */
export const RUBRIC: { id: string; name: string; levels: [string, string, string] }[] = [
  {
    id: 'pause',
    name: 'Pause and ask',
    levels: [
      'Answers the objection at once with a pitch or a long monologue.',
      'Acknowledges, then asks one question, but goes back to pitching.',
      'Acknowledges, asks a question that uncovers the real reason, then lets the buyer talk.',
    ],
  },
  {
    id: 'relevance',
    name: 'Relevance',
    levels: [
      'Generic pitch that could go to anyone.',
      'One reason tied to the buyer’s role.',
      'Reasons tied to what this buyer said, in their own words.',
    ],
  },
  {
    id: 'mustdo',
    name: 'The scenario’s must-do',
    levels: ['Not done.', 'Done late or only in part.', 'Done fully and early.'],
  },
  {
    id: 'next',
    name: 'Next step',
    levels: [
      'No next step, or “I’ll send you an email”.',
      'A vague next step with no date.',
      'A specific next step with a date, or a clean, polite disqualification.',
    ],
  },
]

export const LEVEL_POINTS = [1, 3, 5] as const
export const MAX_SCORE = RUBRIC.length * 5
export const MIN_SCORE = RUBRIC.length * 1

export function verdict(total: number): string {
  if (total >= 16) return 'Ready: move to a harder difficulty or a new scenario.'
  if (total >= 10) return 'Close: rerun the same scenario now, fixing your lowest line.'
  return 'Not yet: rerun it tomorrow at easy difficulty, then try again.'
}

export type Difficulty = 'easy' | 'medium' | 'hard'

export const DIFFICULTY: Record<
  Difficulty,
  { label: string; repeats: number; minutesDelta: number; note: string }
> = {
  easy: {
    label: 'Easy',
    repeats: 0,
    minutesDelta: 1,
    note: 'Buyer warms up the first time the rep meets the warm-up condition.',
  },
  medium: {
    label: 'Medium',
    repeats: 1,
    minutesDelta: 0,
    note: 'Buyer repeats the objection once before warming up.',
  },
  hard: {
    label: 'Hard',
    repeats: 2,
    minutesDelta: -1,
    note: 'Buyer repeats the objection twice, interrupts once, and gives a minute less.',
  },
}

export type Industry = 'general' | 'saas' | 'realestate' | 'insurance' | 'edtech'

/** One line of context the buyer adds, so the same drill fits the team's market. */
export const INDUSTRIES: Record<Industry, { label: string; context: string }> = {
  general: { label: 'Any industry', context: '' },
  saas: {
    label: 'B2B software',
    context: 'Market: B2B software. The buyer mentions the tools they already pay for.',
  },
  realestate: {
    label: 'Real estate',
    context:
      'Market: real estate. The buyer mentions the agents and property portals that already call them.',
  },
  insurance: {
    label: 'Insurance',
    context:
      'Market: insurance. The buyer mentions the policy they already have through a bank or employer.',
  },
  edtech: {
    label: 'Education (India)',
    context:
      'Market: education in India. The buyer mentions fees, EMI options and the admission season.',
  },
}

export const COUNTS = {
  scenarios: SCENARIOS.length,
  byGroup: GROUPS.map((g) => ({
    ...g,
    count: SCENARIOS.filter((s) => s.group === g.id).length,
  })),
  gongBased: SCENARIOS.filter((s) => s.source.url === SOURCES.gong300m.url).length,
  minMinutes: Math.min(...SCENARIOS.map((s) => s.minutes)),
  maxMinutes: Math.max(...SCENARIOS.map((s) => s.minutes)),
}

export const TTAI_URL =
  'https://www.toughtongueai.com/?utm_source=autointerviewai&utm_medium=blog&utm_campaign=sales-roleplay-scenarios'
