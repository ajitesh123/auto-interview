/**
 * AI sales coaching software: facts read on each vendor's OWN pages on 22 Nov 2026.
 * One source for the vendor table, the stats, the planner tool and every count in
 * /blog/top-5-sales-coaching-tools-sales-managers-2026 (the owner page for "AI sales coaching").
 * Nothing here comes from G2, a listicle or a competitor's page. "not stated" = we opened the
 * pages linked and did not find it. Clari Copilot (its page now redirects to Salesloft) and
 * MeetRecord (now redirects to Outdoo) are left out because their pages could not be read.
 * Tough Tongue AI runs this site and is listed separately (PRACTICE_OURS), not ranked.
 */

export const CHECKED = '22 Nov 2026'

export type Tri = 'yes' | 'no' | 'not stated'
export type JobId = 'review' | 'live' | 'practice'

export const JOBS: { id: JobId; short: string; long: string; when: string }[] = [
  {
    id: 'review',
    short: 'Reviews recorded calls',
    long: 'Records, transcribes and scores real calls after they happen (conversation intelligence)',
    when: 'You do not know what actually happens on your team’s calls',
  },
  {
    id: 'live',
    short: 'Guides during the call',
    long: 'Shows prompts, battlecards or checklists to the rep while the call is live',
    when: 'Reps know the content but forget it under pressure on live calls',
  },
  {
    id: 'practice',
    short: 'Practice before the call',
    long: 'An AI buyer the rep rehearses with, scored against a rubric (AI roleplay)',
    when: 'New or struggling reps need repetitions before they touch real buyers',
  },
]

export type PriceStatus = 'published' | 'quote'

export interface CoachVendor {
  id: string
  name: string
  url: string // page we opened for price facts
  featureUrl: string // page we opened for the jobs
  price: string // as written
  priceStatus: PriceStatus
  minimum: string
  review: Tri
  scorecards: Tri
  live: Tri
  practice: Tri
  languages: string
  forWhom: string // in the vendor's own words, shortened
  proof: string // one short verbatim line from the vendor page
  segment: 'sales' | 'contact-centre'
}

export const VENDORS: CoachVendor[] = [
  {
    id: 'gong',
    name: 'Gong',
    url: 'https://gong.io/pricing',
    featureUrl: 'https://help.gong.io/docs/run-a-weekly-coaching-routine-as-a-manager',
    price:
      'Quote only: “Licenses are priced per user” plus “a platform fee based on the number of users supported”',
    priceStatus: 'quote',
    minimum: 'Not stated',
    review: 'yes',
    scorecards: 'not stated',
    live: 'not stated',
    practice: 'not stated',
    languages: 'Not stated',
    forWhom: 'Revenue teams of any size (team-size picker runs from 1–50 to 10,000+)',
    proof:
      '“Gong recommends starting with one call per direct report each week and reviewing your Coaching inbox weekly.”',
    segment: 'sales',
  },
  {
    id: 'chorus',
    name: 'ZoomInfo Chorus',
    url: 'https://www.zoominfo.com/solutions/conversation-intelligence',
    featureUrl: 'https://www.zoominfo.com/solutions/conversation-intelligence',
    price: 'Not published; “Start a free trial” (no terms shown)',
    priceStatus: 'quote',
    minimum: 'Not stated',
    review: 'yes',
    scorecards: 'yes',
    live: 'not stated',
    practice: 'not stated',
    languages: 'Not stated',
    forWhom: 'Teams already on ZoomInfo data',
    proof: '“Every call scored against your framework, so coaching covers the whole team”',
    segment: 'sales',
  },
  {
    id: 'salesloft',
    name: 'Salesloft',
    url: 'https://salesloft.com/platform/conversations/coaching',
    featureUrl: 'https://salesloft.com/platform/conversations/coaching',
    price: 'Not published',
    priceStatus: 'quote',
    minimum: 'Not stated',
    review: 'yes',
    scorecards: 'yes',
    live: 'yes',
    practice: 'not stated',
    languages: 'Not stated',
    forWhom: 'Teams that run outreach cadences in Salesloft',
    proof: '“Battlecards surface in real time on every call.”',
    segment: 'sales',
  },
  {
    id: 'outreach',
    name: 'Outreach (Kaia)',
    url: 'https://www.outreach.ai/platform/features/conversation-intelligence',
    featureUrl: 'https://www.outreach.ai/platform/features/conversation-intelligence',
    price: 'Not published (“Get pricing”)',
    priceStatus: 'quote',
    minimum: 'Not stated',
    review: 'yes',
    scorecards: 'not stated',
    live: 'yes',
    practice: 'not stated',
    languages: 'Not stated',
    forWhom: '“Sales, Marketing, Rev Ops and Customer Success teams”',
    proof: '“joins sales meetings and calls live, supporting reps in the moment”',
    segment: 'sales',
  },
  {
    id: 'avoma',
    name: 'Avoma',
    url: 'https://avoma.com/pricing',
    featureUrl: 'https://avoma.com/pricing',
    price:
      'Startup $19, Organization $29, Enterprise $39 per recorder seat a month billed annually; coaching sits in the Conversation Intelligence add-on, $29 a seat a month billed annually ($35 monthly)',
    priceStatus: 'published',
    minimum: 'Startup up to 25 paid seats; Enterprise minimum 10; viewers free',
    review: 'yes',
    scorecards: 'yes',
    live: 'yes',
    practice: 'not stated',
    languages: '“Supports 70+ languages”',
    forWhom: 'Startup “for small teams”; Organization “for growing organizations”',
    proof:
      '“Custom AI Scorecards” and “Real-time Answer Assistant” (Conversation Intelligence add-on)',
    segment: 'sales',
  },
  {
    id: 'jiminny',
    name: 'Jiminny',
    url: 'https://jiminny.com/flat-fee',
    featureUrl: 'https://jiminny.com/flat-fee',
    price: 'Quote only: “One flat fee”',
    priceStatus: 'quote',
    minimum: 'Not stated',
    review: 'yes',
    scorecards: 'not stated',
    live: 'not stated',
    practice: 'not stated',
    languages: 'Not stated',
    forWhom: 'Buyers who want a flat fee instead of per-seat pricing',
    proof: '“Try full features for 14 days. No credit card required”',
    segment: 'sales',
  },
  {
    id: 'revenueio',
    name: 'Revenue.io',
    url: 'https://revenue.io/pricing',
    featureUrl: 'https://revenue.io/pricing',
    price: 'Quote only: “Pricing is seat-based and scoped to your team and plan.”',
    priceStatus: 'quote',
    minimum: '“Built for Salesforce teams of 15+ seats.”',
    review: 'yes',
    scorecards: 'yes',
    live: 'yes',
    practice: 'not stated',
    languages: 'Not stated',
    forWhom: 'Salesforce teams of 15 or more seats',
    proof:
      '“Moments™ real-time call guidance” and “AI scorecards and automatic coaching feedback”',
    segment: 'sales',
  },
  {
    id: 'sybill',
    name: 'Sybill',
    url: 'https://www.sybill.ai/pricing',
    featureUrl: 'https://www.sybill.ai/pricing',
    price:
      'Free $0; Pro $30 or $36 and Business $90 or $108 per user a month (the page toggles “Annual Save 17%” and “Monthly”); Enterprise custom',
    priceStatus: 'published',
    minimum: 'Not stated',
    review: 'yes',
    scorecards: 'not stated',
    live: 'not stated',
    practice: 'not stated',
    languages: '“Supports 100+ Languages”',
    forWhom: 'Pro: “For small teams”',
    proof:
      '“Coach your team with comments, shared call snippets, or collections of your best demos.”',
    segment: 'sales',
  },
  {
    id: 'attention',
    name: 'Attention',
    url: 'https://attention.com/product/ai-sales-agents',
    featureUrl: 'https://attention.com/product/ai-sales-agents',
    price: 'Not published (no pricing page found)',
    priceStatus: 'quote',
    minimum: 'Not stated',
    review: 'yes',
    scorecards: 'yes',
    live: 'not stated',
    practice: 'not stated',
    languages: 'Not stated',
    forWhom: 'Revenue teams, sales leaders, reps and customer success',
    proof: '“AI Coaching Scorecards Grade your reps against BANT, MEDDIC & more”',
    segment: 'sales',
  },
  {
    id: 'allego',
    name: 'Allego',
    url: 'https://www.allego.com/platform/conversation-intelligence/',
    featureUrl: 'https://www.allego.com/platform/conversation-intelligence/',
    price: 'Not published',
    priceStatus: 'quote',
    minimum: 'Not stated',
    review: 'yes',
    scorecards: 'yes',
    live: 'not stated',
    practice: 'yes',
    languages: 'Not stated',
    forWhom: 'Enablement teams that also run content and lessons',
    proof: '“Score calls consistently against standardized rubrics”',
    segment: 'sales',
  },
  {
    id: 'mindtickle',
    name: 'Mindtickle (Call AI)',
    url: 'https://www.mindtickle.com/platform/conversation-intelligence',
    featureUrl: 'https://www.mindtickle.com/platform/conversation-intelligence',
    price: 'Not published (“Get a demo”)',
    priceStatus: 'quote',
    minimum: 'Not stated',
    review: 'yes',
    scorecards: 'yes',
    live: 'not stated',
    practice: 'not stated',
    languages: 'Not stated',
    forWhom: 'Enablement and sales leadership in larger teams',
    proof: '“Score every call to understand sales effectiveness”',
    segment: 'sales',
  },
  {
    id: 'convin',
    name: 'Convin',
    url: 'https://convin.ai/products/conversation-intelligence',
    featureUrl: 'https://convin.ai/products/conversation-intelligence',
    price: 'Quote only (“Get a Quote”)',
    priceStatus: 'quote',
    minimum: 'Not stated',
    review: 'yes',
    scorecards: 'yes',
    live: 'yes',
    practice: 'not stated',
    languages: 'Speech-to-text in “20+” languages; demo agent speaks English, Hindi and Hinglish',
    forWhom: 'Indian sales and support teams (based in Bengaluru)',
    proof: '“Automatically audit and score 100% of customer conversations”',
    segment: 'contact-centre',
  },
  {
    id: 'balto',
    name: 'Balto',
    url: 'https://www.balto.ai/ai-info-page/',
    featureUrl: 'https://www.balto.ai/ai-info-page/',
    price: 'Quote only: “Modular subscription pricing with per-user licensing”',
    priceStatus: 'quote',
    minimum: 'Not stated',
    review: 'yes',
    scorecards: 'yes',
    live: 'yes',
    practice: 'not stated',
    languages: 'Not stated',
    forWhom:
      'Mid-market and enterprise contact centres (insurance, finance, healthcare, home services)',
    proof: '“LLM-driven checklist prompts that update live”',
    segment: 'contact-centre',
  },
  {
    id: 'cresta',
    name: 'Cresta',
    url: 'https://cresta.com/agent-assist',
    featureUrl: 'https://cresta.com/agent-assist',
    price: 'Not published',
    priceStatus: 'quote',
    minimum: 'Not stated',
    review: 'not stated',
    scorecards: 'not stated',
    live: 'yes',
    practice: 'yes',
    languages: 'Not stated',
    forWhom: '“built for large, high-volume customer operations”',
    proof: '“real-time hints, reminders, and workflows tailored to each conversation”',
    segment: 'contact-centre',
  },
  {
    id: 'observe',
    name: 'Observe.AI',
    url: 'https://www.observe.ai/real-time',
    featureUrl: 'https://www.observe.ai/real-time',
    price: 'Not published',
    priceStatus: 'quote',
    minimum: 'Not stated',
    review: 'yes',
    scorecards: 'yes',
    live: 'yes',
    practice: 'not stated',
    languages: 'Not stated',
    forWhom: 'Enterprise contact centres',
    proof:
      '“Real-time Agent Assist empowers your agents with in-the-moment guidance and coaching.”',
    segment: 'contact-centre',
  },
]

/** Our product, shown in its own box and never ranked in the table above. */
export const PRACTICE_OURS = {
  name: 'Tough Tongue AI',
  url: 'https://www.toughtongueai.com/pricing',
  price:
    'Free 25 min; Starter $20 a month (150 min); Business $299 a month (15 seats, 2,990 min) — pricing page read 12 Nov 2026',
  what: 'AI roleplay calls the rep can practise by voice on the web, by phone or inside Google Meet and Zoom, scored against a rubric you write; it also sells AI voice agents that take calls.',
}

/* ---------- Counts used in prose, charts and KeyFacts (computed, never typed) ---------- */

export const COUNT = VENDORS.length
export const PUBLISHED = VENDORS.filter((v) => v.priceStatus === 'published')
export const QUOTE = VENDORS.filter((v) => v.priceStatus === 'quote')
export const withJob = (j: JobId | 'scorecards') => VENDORS.filter((v) => v[j] === 'yes')
export const COUNTS = {
  vendors: COUNT,
  published: PUBLISHED.length,
  quote: QUOTE.length,
  review: withJob('review').length,
  scorecards: withJob('scorecards').length,
  live: withJob('live').length,
  practice: withJob('practice').length,
  allThree: VENDORS.filter((v) => v.review === 'yes' && v.live === 'yes' && v.practice === 'yes')
    .length,
  contactCentre: VENDORS.filter((v) => v.segment === 'contact-centre').length,
}

/* ---------- Manager time: plain arithmetic, no assumptions hidden ---------- */

export interface TimeInput {
  reps: number
  callsPerRep: number // calls each rep has a week
  callMinutes: number // average call length
  reviewedPerRep: number // calls the manager reviews per rep per week
  feedbackMinutes: number // minutes to write or give feedback on one reviewed call
}

export interface TimeResult {
  hoursPerWeek: number
  coveragePct: number // share of calls a human looks at
  callsTotal: number
  callsReviewed: number
}

const r1 = (n: number) => Math.round(Number((n * 10).toPrecision(12))) / 10

export function managerTime(i: TimeInput): TimeResult {
  const reviewed = Math.min(i.reviewedPerRep, i.callsPerRep)
  const callsReviewed = i.reps * reviewed
  const callsTotal = i.reps * i.callsPerRep
  const minutes = callsReviewed * (i.callMinutes + i.feedbackMinutes)
  return {
    hoursPerWeek: r1(minutes / 60),
    coveragePct: callsTotal ? r1((callsReviewed / callsTotal) * 100) : 0,
    callsTotal,
    callsReviewed,
  }
}

/** Gong's starting point: one call per direct report a week (Gong help centre, read 22 Nov 2026). */
export const GONG_START = {
  reviewedPerRep: 1,
  url: 'https://help.gong.io/docs/run-a-weekly-coaching-routine-as-a-manager',
}

export const WORKED: TimeInput = {
  reps: 8,
  callsPerRep: 25,
  callMinutes: 30,
  reviewedPerRep: 1,
  feedbackMinutes: 10,
}
export const WORKED_RESULT = managerTime(WORKED)
export const TEAM_SIZES = [5, 8, 12, 20]

/** Avoma, the clearest published coaching price: base seat + Conversation Intelligence add-on. */
export const AVOMA = {
  url: 'https://avoma.com/pricing',
  startupAnnual: 19,
  startupMonthly: 29,
  ciAnnual: 29,
  ciMonthly: 35,
}
export const avomaYear = (seats: number, annual = true) =>
  seats *
  12 *
  (annual ? AVOMA.startupAnnual + AVOMA.ciAnnual : AVOMA.startupMonthly + AVOMA.ciMonthly)

/* ---------- Rules on recording and analysing calls ---------- */

export type RegionId = 'us' | 'eu' | 'uk' | 'in'

export interface RegionRule {
  id: RegionId
  name: string
  rules: { plain: string; quote: string; src: string; srcLabel: string }[]
}

export const US_ALL_PARTY = [
  'California',
  'Florida',
  'Maryland',
  'Massachusetts',
  'New Hampshire',
  'Pennsylvania',
]
export const US_QUALIFIED = [
  'Delaware (“arguably”)',
  'Illinois (“generally”)',
  'Michigan (“technically”)',
  'Washington (“generally”)',
  'Montana (all-party “knowledge”)',
  'Nevada (phone calls and texts)',
  'Connecticut (civil liability for phone calls)',
]

export const REGIONS: RegionRule[] = [
  {
    id: 'us',
    name: 'United States',
    rules: [
      {
        plain: `Most states let one party to a call consent to recording, but some need every party to agree. Justia lists ${US_ALL_PARTY.length} plain all-party states (${US_ALL_PARTY.join(', ')}) and qualifies ${US_QUALIFIED.length} more. If any caller or rep sits in one of them, get everyone’s consent at the start of the call.`,
        quote: '“a smaller group of states requires all-party consent.”',
        src: 'https://justia.com/50-state-surveys/recording-phone-calls-and-conversations',
        srcLabel: 'Justia 50-state survey',
      },
    ],
  },
  {
    id: 'eu',
    name: 'European Union',
    rules: [
      {
        plain:
          'Since 2 February 2025 the AI Act bans AI that infers the emotions of people at work from biometric data such as their voice, except for medical or safety reasons. A coaching tool that reads your reps’ anger or stress from their voice is banned. Reading a customer’s emotions is not banned but is still regulated (people must be told), and emotion read from text only is not biometric.',
        quote:
          '“using webcams and voice recognition systems by a call centre to track their employee’s emotions, such as anger” (prohibited example)',
        src: 'https://cms.law/en/gbr/legal-updates/eu-commission-issues-guidelines-on-prohibited-ai-practices-part-ii',
        srcLabel: 'CMS on the Commission guidelines, 10 Feb 2025',
      },
      {
        plain:
          'The ban has applied since 2 February 2025; Germany’s regulator says so on its AI Act page.',
        quote: '“These prohibitions have been in place since 2 February 2025.”',
        src: 'https://bundesnetzagentur.de/EN/Areas/Digitalisation/AI/08_ProhibitedPractices/start.html',
        srcLabel: 'Bundesnetzagentur',
      },
    ],
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    rules: [
      {
        plain:
          'Recording and scoring reps’ calls is monitoring workers. The ICO expects you to tell them, use the least intrusive way, run a DPIA where the monitoring is likely to be high risk, and let them see what you collect.',
        quote:
          '“Carrying out a Data Protection Impact Assessment for any monitoring that is likely to result in a high risk”',
        src: 'https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/2023/10/ico-publishes-guidance-to-ensure-lawful-monitoring-in-the-workplace',
        srcLabel: 'ICO, 3 Oct 2023',
      },
    ],
  },
  {
    id: 'in',
    name: 'India',
    rules: [
      {
        plain:
          'The DPDP Rules were notified on 14 Nov 2025 with an 18-month phase-in, so the consent and notice duties apply from about May 2027. From then, recording a customer call for coaching needs a separate, plain notice that names the purpose, and the customer can withdraw consent. Start now; ask your counsel for the exact date.',
        quote:
          '“Every Data Fiduciary must issue a separate consent notice that is clear and easy to understand”',
        src: 'https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc20251117695301.pdf',
        srcLabel: 'PIB explainer, Nov 2025',
      },
    ],
  },
]

export const GARTNER_2020 = {
  url: 'https://www.gartner.com/en/newsroom/press-releases/2020-07-29-gartner-says-high-performing-sales-managers-prioritiz',
  pct: 58,
  quote:
    '58% of sale managers report they struggle to accomplish all the tasks they have been given in the time allotted.',
  date: '29 Jul 2020',
}
