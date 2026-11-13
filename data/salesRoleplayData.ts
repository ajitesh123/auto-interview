/**
 * AI sales roleplay software: facts read on each vendor's OWN pages on 13 Nov 2026 (Tough Tongue
 * AI's pricing page on 12 Nov 2026). One source for the vendor finder, the price table, the cost
 * calculator, the charts and every count in /blog/best-sales-roleplay-software-platforms-2026.
 * Nothing here comes from G2, a listicle or a vendor's competitor page. "Not stated" means we
 * looked on the pages linked and did not find it. Tough Tongue AI runs this site (ours: true).
 */

export const CHECKED = '13 Nov 2026'

export type Kind = 'practice' | 'suite' | 'dialer'
export type Tri = 'yes' | 'no' | 'not stated'
export type PriceStatus = 'published' | 'free-then-quote' | 'quote'

export const KINDS: { id: Kind; short: string; long: string }[] = [
  {
    id: 'practice',
    short: 'Practice platform',
    long: 'Bought on its own: AI buyers, scoring and reports are the product',
  },
  {
    id: 'suite',
    short: 'Enablement suite',
    long: 'Roleplay is one module of a bigger enablement or content platform',
  },
  {
    id: 'dialer',
    short: 'Dialer bundle',
    long: 'A calling tool that includes AI practice calls in a plan',
  },
]

export interface RoleplayVendor {
  id: string
  name: string
  url: string // the page we opened for price and plan facts
  kind: Kind
  price: string // as written on the vendor's page
  priceStatus: PriceStatus
  freeStart: string // '' = no self-serve free start
  minimum: string
  modes: string // how the AI buyer talks to the rep
  voice: 'yes' | 'implied' | 'not stated'
  fromCalls: Tri // can a scenario be built from your own call recordings or transcripts?
  customRubric: Tri
  realCalls: Tri // scores real customer calls with the same scorecard
  languages: string
  security: string
  bestFor: string
  note?: string // contradictions we found between the vendor's own pages
  also?: { label: string; url: string }[] // other vendor pages we read for the facts
  ours?: boolean
}

export const VENDORS: RoleplayVendor[] = [
  {
    id: 'hyperbound',
    name: 'Hyperbound',
    url: 'https://www.hyperbound.ai/pricing',
    kind: 'practice',
    price: 'Free plan; Practice and Perform plans priced per user, quote only',
    priceStatus: 'free-then-quote',
    freeStart: 'Free plan: 45 prebuilt roleplays and example scorecards',
    minimum: 'Not stated; volume and multi-year discounts',
    modes: 'Cold calls, gatekeeper calls and voicemails with AI buyers',
    voice: 'implied',
    fromCalls: 'yes',
    customRubric: 'yes',
    realCalls: 'yes',
    languages: '25+ (30+ on its Practice page)',
    security: 'SOC 2 Type II, ISO 27001',
    bestFor:
      'B2B SDR and AE teams that want practice plus real-call scoring in one place, on an enterprise budget',
    note: 'Custom bots, custom scorecards and integrations are paid only; real-call scoring, CRM and Gong integrations are in the Perform tier.',
    also: [
      { label: 'Homepage', url: 'https://www.hyperbound.ai/' },
      { label: 'AI sales roleplays', url: 'https://www.hyperbound.ai/product/ai-sales-roleplays' },
    ],
  },
  {
    id: 'secondnature',
    name: 'Second Nature',
    url: 'https://secondnature.ai/',
    kind: 'practice',
    price: 'Not published; demo or sales contact',
    priceStatus: 'quote',
    freeStart: '',
    minimum: 'Not stated',
    modes: 'Voice with video avatars, group scenarios and chat',
    voice: 'yes',
    fromCalls: 'not stated',
    customRubric: 'yes',
    realCalls: 'not stated',
    languages: '30+ (25+ in its FAQ)',
    security: 'SOC 2 Type II, ISO 27001, ISO 27701; EU data centre',
    bestFor:
      'Large, L&D-led programmes that need avatars, LMS delivery (SCORM, LTI) and a long compliance list',
    note: 'Free sample roleplays on the homepage, but no free plan.',
    also: [
      { label: 'Product', url: 'https://secondnature.ai/product/' },
      { label: 'FAQ', url: 'https://secondnature.ai/faqs/' },
    ],
  },
  {
    id: 'outdoo',
    name: 'Outdoo',
    url: 'https://www.outdoo.ai/pricing',
    kind: 'practice',
    price: 'Free; Growth "custom quote by team size"; Enterprise custom',
    priceStatus: 'free-then-quote',
    freeStart: '60 free roleplay minutes, unlimited team members',
    minimum: 'Annual contracts standard',
    modes: 'Voice, chat and video AI buyers',
    voice: 'yes',
    fromCalls: 'yes',
    customRubric: 'yes',
    realCalls: 'yes',
    languages: '120+',
    security: 'SOC 2 Type II',
    bestFor: 'Teams that want to try voice roleplay free, then add real-call scoring and LMS links',
    note: 'Free plan has custom scorecards but not custom rubrics; whether integrations work on Free is unclear (the plan table and the FAQ disagree).',
    also: [{ label: 'Homepage', url: 'https://www.outdoo.ai/' }],
  },
  {
    id: 'yoodli',
    name: 'Yoodli',
    url: 'https://yoodli.ai/pricing',
    kind: 'practice',
    price:
      'Starter free (5 lifetime sessions); Pro $8/month and Advanced $20/month, billed annually (individual plans); Business per seat, quote',
    priceStatus: 'published',
    freeStart: '5 lifetime sessions',
    minimum: 'Business and Enterprise billed annually per seat',
    modes: 'Video, chat or a talking AI avatar',
    voice: 'yes',
    fromCalls: 'not stated',
    customRubric: 'yes',
    realCalls: 'not stated',
    languages: 'Not stated on its pricing page',
    security: 'SOC 2 Type 2, GDPR',
    bestFor:
      'One rep paying for their own practice, or company-wide communication-skills programmes',
    note: 'Built for "human skills" in general, not sales only. Team pricing is quote only.',
  },
  {
    id: 'pitchmonster',
    name: 'PitchMonster',
    url: 'https://www.pitchmonster.io/pricing',
    kind: 'practice',
    price: 'Two plans, both quote only',
    priceStatus: 'quote',
    freeStart: '',
    minimum:
      '"Most teams start with 5 or more seats"; 12-month contracts (3 and 6 months possible)',
    modes: 'Phone, avatar and screen-share roleplays by voice',
    voice: 'yes',
    fromCalls: 'yes',
    customRubric: 'yes',
    realCalls: 'yes',
    languages: '29',
    security: 'GDPR, EU data residency, SOC 2 (roleplay page)',
    bestFor: 'EU or GDPR-sensitive teams of 5+ who want roleplays built from their own calls',
    note: 'Real-call scoring is in the higher plan ("Score live calls on the same scorecard"). Homepage mentions GDPR but not SOC 2; homepage says annual licences, pricing page offers 3 and 6 months.',
  },
  {
    id: 'exec',
    name: 'Exec',
    url: 'https://www.exec.com/pricing',
    kind: 'practice',
    price:
      'Free $0; Starter $20/seat/month (5-seat minimum); Professional $39/seat/month (15-seat minimum); billed annually; Enterprise custom',
    priceStatus: 'published',
    freeStart: 'Free plan: 5 roleplay sessions per user a year, 2 custom scenarios',
    minimum: 'Starter 5 seats, Professional 15 seats',
    modes: 'Voice',
    voice: 'yes',
    fromCalls: 'yes',
    customRubric: 'yes',
    realCalls: 'yes',
    languages: 'Multi-language (none listed)',
    security: 'SOC 2 Type 2',
    bestFor: 'Mid-size teams that want a published per-seat price and an LMS in the same tool',
    note: 'Starter allows 10 roleplay sessions per user a month; Professional is unlimited.',
    also: [{ label: 'Homepage', url: 'https://www.exec.com/' }],
  },
  {
    id: 'trellus',
    name: 'Trellus',
    url: 'https://www.trellus.ai/pricing',
    kind: 'dialer',
    price:
      'Power + Parallel $149.99/seat/month includes unlimited AI practice calls; Power $99.99 has none',
    priceStatus: 'published',
    freeStart: '',
    minimum: 'No seat minimum; buy one seat online',
    modes: 'Voice practice bots',
    voice: 'yes',
    fromCalls: 'not stated',
    customRubric: 'not stated',
    realCalls: 'not stated',
    languages: 'Not stated',
    security: 'SOC 2 Type II',
    bestFor: 'Cold-calling teams buying a power or parallel dialer anyway',
    note: 'A dialer first; AI practice is bundled, not sold alone. "No free plan or free trial."',
  },
  {
    id: 'mindtickle',
    name: 'Mindtickle',
    url: 'https://www.mindtickle.com/platform/ai-sales-role-play/',
    kind: 'suite',
    price: 'Not published; depends on company size and team structure',
    priceStatus: 'quote',
    freeStart: '',
    minimum: 'Not stated',
    modes: 'Voice personas; screen-share for demos',
    voice: 'implied',
    fromCalls: 'not stated',
    customRubric: 'yes',
    realCalls: 'not stated',
    languages: '25+',
    security: 'SOC 2 Type 2; aligned with ISO 27001 and GDPR',
    bestFor: 'Enterprises already on Mindtickle that want roleplay tied to certification',
    note: '"Mindtickle doesn\'t offer a self-serve free version of AI role play"; a free demo exists.',
  },
  {
    id: 'allego',
    name: 'Allego',
    url: 'https://www.allego.com/pricing/',
    kind: 'suite',
    price: 'Per user per month, billed annually; amounts not published',
    priceStatus: 'quote',
    freeStart: '',
    minimum: '"Typical contract length is 3 years paid annually"; 1 and 2 years possible',
    modes: 'Audio-only or video scenarios with avatars',
    voice: 'yes',
    fromCalls: 'not stated',
    customRubric: 'yes',
    realCalls: 'not stated',
    languages: 'Avatars in 32 languages; scoring in 59',
    security: 'Not stated on the roleplay page',
    bestFor: 'Multilingual enablement teams on multi-year enterprise contracts',
    also: [{ label: 'AI sales coaching', url: 'https://www.allego.com/ai-sales-coaching/' }],
  },
  {
    id: 'highspot',
    name: 'Highspot',
    url: 'https://www.highspot.com/pricing/',
    kind: 'suite',
    price: 'Quote only; roleplay in the "Better" and "Best" tiers',
    priceStatus: 'quote',
    freeStart: '',
    minimum: 'Not stated',
    modes: 'Not stated (feedback on "delivery and tone")',
    voice: 'not stated',
    fromCalls: 'not stated',
    customRubric: 'yes',
    realCalls: 'not stated',
    languages: 'Not stated',
    security: 'Does not train public models on customer data',
    bestFor: 'Highspot customers who want roleplay built from content already in Highspot',
  },
  {
    id: 'showpad',
    name: 'Showpad',
    url: 'https://www.showpad.com/pricing',
    kind: 'suite',
    price: 'Quote only, per user; Roleplay AI in Advanced and Expert tiers',
    priceStatus: 'quote',
    freeStart: '',
    minimum: 'Not stated',
    modes: 'AI buyer avatars with speech settings',
    voice: 'implied',
    fromCalls: 'not stated',
    customRubric: 'yes',
    realCalls: 'not stated',
    languages: '14 in its FAQ, including Hindi (25+ elsewhere on the same page)',
    security: 'Not stated on the roleplay page',
    bestFor: 'Showpad content customers who want up to 10 weighted scoring categories',
  },
  {
    id: 'retorio',
    name: 'Retorio',
    url: 'https://www.retorio.com/en/pricing',
    kind: 'practice',
    price: 'Per user, per year or month; amounts not published',
    priceStatus: 'quote',
    freeStart: '',
    minimum: 'Not stated; pay only for active users',
    modes: 'Video with 93 photorealistic avatars, or phone calls',
    voice: 'yes',
    fromCalls: 'not stated',
    customRubric: 'yes',
    realCalls: 'not stated',
    languages: '14',
    security: 'ISO 27001, GDPR, EU hosting',
    bestFor: 'EU enterprises that want video avatars and feedback on non-verbal behaviour',
    note: 'Free trial only "if we see potential for a collaboration".',
  },
  {
    id: 'quantified',
    name: 'Quantified',
    url: 'https://www.quantified.ai/pricing',
    kind: 'practice',
    price: 'Base and Standard packages, quoted per organisation',
    priceStatus: 'quote',
    freeStart: '',
    minimum: '"No published rate card or seat minimum"; not metered by minutes',
    modes: 'Avatars that react to your on-screen visual aids',
    voice: 'implied',
    fromCalls: 'not stated',
    customRubric: 'yes',
    realCalls: 'not stated',
    languages: '40+',
    security: 'SOC 2 Type 2, US or EU hosting',
    bestFor: 'Pharma and life-sciences teams that need on-label compliance scoring',
  },
  {
    id: 'zenarate',
    name: 'Zenarate',
    url: 'https://www.zenarate.com/simulation-lxp/',
    kind: 'practice',
    price: 'Not published',
    priceStatus: 'quote',
    freeStart: '',
    minimum: 'Not stated',
    modes: 'Voice, chat, email, avatar and software simulations',
    voice: 'yes',
    fromCalls: 'not stated',
    customRubric: 'yes',
    realCalls: 'not stated',
    languages: 'Multi-language (none listed)',
    security: 'SOC 2; supports PCI, HIPAA, GDPR needs',
    bestFor: 'Contact centres and frontline service teams more than B2B field sales',
  },
  {
    id: 'toughtongue',
    name: 'Tough Tongue AI',
    url: 'https://www.toughtongueai.com/pricing',
    kind: 'practice',
    price:
      'Free 25 min; Starter $20/month or $16.67/month billed yearly (150 min a month); Pro $99/month (900 min); Business $299/month (15 seats, 2,990 min); Growth $499/month (25 seats, 6,000 min); Momentum $999/month (50 seats, 13,000 min)',
    priceStatus: 'published',
    freeStart: '25 free minutes',
    minimum: 'None; team plans are priced by seats and minutes',
    modes: 'Voice, on the web, by phone, or in Google Meet and Zoom',
    voice: 'yes',
    fromCalls: 'not stated',
    customRubric: 'yes',
    realCalls: 'yes',
    languages: '',
    security: 'SOC 2, HIPAA, zero data retention (Enterprise plan)',
    bestFor:
      'Teams that want reps to practise spoken calls every day, scored against their own rubric, without a sales call to start',
    note: 'Also sells AI voice agents that take sales calls. Its Quality Audit feature is described as "Review 100% of calls automatically".',
    ours: true,
  },
]

/* ---------- Counts used in prose, charts and KeyFacts (computed, never typed) ---------- */

export const COUNT = VENDORS.length
export const PUBLISHED = VENDORS.filter((v) => v.priceStatus === 'published')
export const FREE_START = VENDORS.filter((v) => v.freeStart !== '')
export const QUOTE_ONLY = VENDORS.filter((v) => v.priceStatus === 'quote')
export const FREE_THEN_QUOTE = VENDORS.filter((v) => v.priceStatus === 'free-then-quote')
export const FROM_CALLS = VENDORS.filter((v) => v.fromCalls === 'yes')
export const REAL_CALLS = VENDORS.filter((v) => v.realCalls === 'yes')
export const VOICE_CONFIRMED = VENDORS.filter((v) => v.voice === 'yes')
export const KIND_COUNTS = KINDS.map((k) => ({
  ...k,
  n: VENDORS.filter((v) => v.kind === k.id).length,
}))

/* ---------- Year-one list cost for a team (published per-seat prices only) ---------- */

const round2 = (n: number) => Math.round(Number((n * 100).toPrecision(12))) / 100
export const usd = (n: number) =>
  '$' +
  n.toLocaleString('en-US', {
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
    maximumFractionDigits: 2,
  })

/** Tough Tongue AI team plans (pricing page, checked 12 Nov 2026). */
export const TT_PLANS = [
  { name: 'Business', usdMonth: 299, minutes: 2990, overage: 0.1, seats: 15 },
  { name: 'Growth', usdMonth: 499, minutes: 6000, overage: 0.0832, seats: 25 },
  { name: 'Momentum', usdMonth: 999, minutes: 13000, overage: 0.0768, seats: 50 },
]

export interface CostLine {
  id: string
  name: string
  annual: number | null
  basis: string
  ours?: boolean
}

export function teamCosts(reps: number, minutesPerRep: number): CostLine[] {
  const lines: CostLine[] = []
  if (reps === 1) {
    lines.push({
      id: 'yoodli-advanced',
      name: 'Yoodli Advanced (individual plan)',
      annual: 240,
      basis: '$20 a month billed annually; unlimited roleplays',
    })
  }
  const seats5 = Math.max(reps, 5)
  lines.push({
    id: 'exec-starter',
    name: 'Exec Starter',
    annual: round2(seats5 * 20 * 12),
    basis: `${seats5} seats × $20 × 12 (5-seat minimum; 10 sessions per user a month)`,
  })
  const seats15 = Math.max(reps, 15)
  lines.push({
    id: 'exec-pro',
    name: 'Exec Professional',
    annual: round2(seats15 * 39 * 12),
    basis: `${seats15} seats × $39 × 12 (15-seat minimum; unlimited sessions)`,
  })
  lines.push({
    id: 'trellus',
    name: 'Trellus Power + Parallel',
    annual: round2(reps * 149.99 * 12),
    basis: `${reps} seats × $149.99 × 12 (includes a power and parallel dialer)`,
  })
  const total = reps * minutesPerRep
  if (reps === 1 && total <= 900) {
    const starter = total <= 150
    lines.push({
      id: 'toughtongue',
      name: 'Tough Tongue AI (our product)',
      annual: starter ? 200 : 990,
      basis: starter
        ? `Starter billed yearly ($16.67 a month, 150 min a month), ${total} practice minutes a month`
        : `Pro billed yearly ($82.50 a month, 900 min a month), ${total} practice minutes a month`,
      ours: true,
    })
    return lines
  }
  const fits = TT_PLANS.filter((p) => p.seats >= reps).map((p) => ({
    plan: p,
    monthly: round2(p.usdMonth + Math.max(0, total - p.minutes) * p.overage),
  }))
  const best = fits.length ? fits.reduce((a, b) => (b.monthly < a.monthly ? b : a)) : null
  lines.push({
    id: 'toughtongue',
    name: 'Tough Tongue AI (our product)',
    annual: best ? round2(best.monthly * 12) : null,
    basis: best
      ? `${best.plan.name} plan (${best.plan.seats} seats, ${best.plan.minutes.toLocaleString(
          'en-US'
        )} min a month), ${total.toLocaleString('en-US')} practice minutes a month`
      : 'Over 50 seats: Enterprise, custom price',
    ours: true,
  })
  return lines
}

export const WORKED = { reps: 15, minutesPerRep: 30 }
export const WORKED_LINES = teamCosts(WORKED.reps, WORKED.minutesPerRep)

/* ---------- Evidence on practice (opened 13 Nov 2026) ---------- */

/** Cook et al. 2011, JAMA: simulation-based training vs no intervention, health professions. */
export const COOK_2011 = {
  url: 'https://pubmed.ncbi.nlm.nih.gov/21900138/',
  studies: 609,
  trainees: 35226,
  rows: [
    { label: 'Knowledge', value: 1.2 },
    { label: 'Process skills', value: 1.09 },
    { label: 'Other on-the-job behaviours', value: 0.81 },
    { label: 'Direct effects on patients', value: 0.5 },
  ],
}

/** Salesforce State of Sales 2026 (4,050 sales professionals, Aug–Sep 2025). */
export const SALESFORCE = {
  url: 'https://www.salesforce.com/news/stories/state-of-sales-report-announcement-2026/',
  roleplay: 47,
  feedback: 46,
  selling: 40,
}
