/**
 * Published list prices for LMS and sales-practice tools, checked on the
 * vendors' own pricing pages on 6 Nov 2026. One source of truth for the
 * /blog/best-lms-for-sales-teams-2026 calculator, worked table and FAQ.
 * Vendors that do not publish prices are listed with price: null.
 */

export const CHECKED = '6 Nov 2026'

export type PriceModel =
  | { kind: 'perUser'; usdPerUserMonth: number; maxUsers?: number; basis: string }
  | { kind: 'flatFrom'; usdPerYear: number; basis: string }
  | null

export interface Vendor {
  id: string
  name: string
  type: 'LMS' | 'Enablement suite' | 'Practice layer'
  stated: string
  price: PriceModel
  practice: string
  crm: string
  bestFor: string
  pricingUrl: string
  ours?: boolean
}

export const VENDORS: Vendor[] = [
  {
    id: 'talentlms',
    name: 'TalentLMS',
    type: 'LMS',
    stated:
      'Free (5 users, 10 courses); Core $119/month; Grow $229/month; Pro $449/month + $6 per extra user',
    price: {
      kind: 'flatFrom',
      usdPerYear: 119 * 12,
      basis: 'Core plan, smallest user band, billed monthly',
    },
    practice: '"Learning Playground" to rehearse conversations; AI Coach',
    crm: 'Salesforce app; HubSpot on paid plans',
    bestFor: 'Small teams that want a cheap, simple course library',
    pricingUrl: 'https://www.talentlms.com/prices/aff:crz',
  },
  {
    id: 'ispring',
    name: 'iSpring LMS',
    type: 'LMS',
    stated: 'Business $6.91 per user/month ($8,286 a year shown for 100 users), active users only',
    price: {
      kind: 'perUser',
      usdPerUserMonth: 6.91,
      basis: 'price shown for 100 active users, billed annually',
    },
    practice: 'Dialog simulations to "role-play real customer conversations"',
    crm: 'Salesforce user sync',
    bestFor: 'Teams that want branching dialogue drills without a big contract',
    pricingUrl: 'https://www.ispring.com/pricing',
  },
  {
    id: '360learning',
    name: '360Learning',
    type: 'LMS',
    stated:
      'Team $8 per user/month, up to 100 users, monthly, 30-day trial; Business and Enterprise custom',
    price: {
      kind: 'perUser',
      usdPerUserMonth: 8,
      maxUsers: 100,
      basis: 'Team plan, billed monthly, active users',
    },
    practice: 'AI Roleplay, video pitch assessments, coach feedback',
    crm: 'Salesforce app',
    bestFor: 'Teams under 100 that want peer-built courses plus video pitches',
    pricingUrl: 'https://360learning.com/pricing/',
  },
  {
    id: 'learnup',
    name: 'Learn:Up (formerly WorkRamp) + Practice',
    type: 'LMS',
    stated:
      'Learn:Up from $9 and Practice from $4 per user/month, billed annually, based on a 200-person company',
    price: {
      kind: 'perUser',
      usdPerUserMonth: 9 + 4,
      basis: 'Learn:Up $9 + Practice $4, "starting from", 200-person basis',
    },
    practice: 'Practice: voice or text conversations with "a realistic AI character"',
    crm: 'UNKNOWN on the pages we opened',
    bestFor: 'Mid-size companies that want LMS and AI practice from one vendor',
    pricingUrl: 'https://www.confirm.com/scale-up/pricing',
  },
  {
    id: 'litmos',
    name: 'SAP Litmos',
    type: 'LMS',
    stated: 'Foundation from $8K a year; Platinum from $15K a year; Platinum AI on request',
    price: { kind: 'flatFrom', usdPerYear: 8000, basis: 'Foundation plan, "starting at"' },
    practice: '"AI video assessments": role-play scenarios with automated scoring',
    crm: 'Salesforce AppExchange app',
    bestFor: 'Companies that need compliance training and sales training in one LMS',
    pricingUrl: 'https://www.litmos.com/plans/',
  },
  {
    id: 'docebo',
    name: 'Docebo',
    type: 'LMS',
    stated: 'Not published (Elevate, Enterprise; Docebo Roleplay is an add-on)',
    price: null,
    practice: 'Docebo Roleplay: AI practice across chat, voice and video',
    crm: 'Native Salesforce connector; HubSpot for reporting',
    bestFor: 'Large companies running customer, partner and employee academies',
    pricingUrl: 'https://www.docebo.com/pricing/',
  },
  {
    id: 'mindtickle',
    name: 'Mindtickle',
    type: 'Enablement suite',
    stated: 'Not published',
    price: null,
    practice: 'AI role-plays with immediate feedback; Copilot grades submissions',
    crm: 'Salesforce, Microsoft Dynamics',
    bestFor: 'Revenue teams of 100+ that want readiness scores tied to deals',
    pricingUrl: 'https://www.mindtickle.com/pricing/',
  },
  {
    id: 'seismic',
    name: 'Seismic Learning (Lessonly) + Highspot',
    type: 'Enablement suite',
    stated: 'Not published (Highspot is now part of Seismic)',
    price: null,
    practice: 'AI role-plays; Role-Play Agent included in Advanced and Ultimate',
    crm: 'Salesforce, Dynamics 365, HubSpot, Oracle',
    bestFor: 'Enterprises that already run Seismic or Highspot for content',
    pricingUrl: 'https://www.highspot.com/pricing/',
  },
  {
    id: 'allego',
    name: 'Allego',
    type: 'Enablement suite',
    stated: 'Not published; per user per month, billed annually, typical 3-year term',
    price: null,
    practice: 'AI video avatars for practice, flash drills, skills scorecards',
    crm: 'Salesforce, HubSpot, Dynamics 365, Pipedrive, Close',
    bestFor: 'Field and pharma sales teams that coach on recorded video',
    pricingUrl: 'https://www.allego.com/pricing/',
  },
  {
    id: 'showpad',
    name: 'Showpad (with Brainshark and Bigtincan)',
    type: 'Enablement suite',
    stated: 'Not published; licensed per user',
    price: null,
    practice: 'RolePlayAI and CoachingAI',
    crm: 'Salesforce, Microsoft Dynamics',
    bestFor: 'Field-selling teams that live in a content portal',
    pricingUrl: 'https://www.showpad.com/pricing',
  },
  {
    id: 'toughtongue',
    name: 'Tough Tongue AI',
    type: 'Practice layer',
    stated:
      'Free 25 min; Business $299/month (2,990 min, 15 seats); Growth $499 (6,000 min, 25 seats); Momentum $999 (13,000 min, 50 seats)',
    price: null,
    practice: 'Voice roleplay with AI buyers, scored after every session',
    crm: 'Integrations by plan; no CRM named on the pricing page',
    bestFor: 'Reps who need spoken practice on top of the LMS they already have',
    pricingUrl: 'https://www.toughtongueai.com/pricing',
    ours: true,
  },
]

/** Tough Tongue AI plans with a stated seat limit (pricing page, 6 Nov 2026). */
export const TT_PLANS = [
  { name: 'Business', usdMonth: 299, minutes: 2990, overage: 0.1, seats: 15 },
  { name: 'Growth', usdMonth: 499, minutes: 6000, overage: 0.0832, seats: 25 },
  { name: 'Momentum', usdMonth: 999, minutes: 13000, overage: 0.0768, seats: 50 },
]

const round2 = (n: number) => Math.round(Number((n * 100).toPrecision(12))) / 100

export interface CostLine {
  id: string
  name: string
  annual: number | null
  note: string
  ours?: boolean
}

/** Cheapest Tough Tongue AI plan that fits the seats, with overage, per month. */
export function practiceCost(reps: number, minutesPerRep: number) {
  const total = reps * minutesPerRep
  const fits = TT_PLANS.filter((p) => p.seats >= reps).map((p) => ({
    plan: p,
    monthly: round2(p.usdMonth + Math.max(0, total - p.minutes) * p.overage),
  }))
  if (fits.length === 0) return null
  return fits.reduce((a, b) => (b.monthly < a.monthly ? b : a))
}

export function annualCosts(reps: number, minutesPerRep: number): CostLine[] {
  const lines: CostLine[] = []
  for (const v of VENDORS) {
    if (v.ours) continue
    const p = v.price
    if (!p) continue
    if (p.kind === 'perUser') {
      if (p.maxUsers && reps > p.maxUsers) {
        lines.push({
          id: v.id,
          name: v.name,
          annual: null,
          note: `Over ${p.maxUsers} users: custom quote`,
        })
      } else {
        lines.push({
          id: v.id,
          name: v.name,
          annual: round2(p.usdPerUserMonth * reps * 12),
          note: p.basis,
        })
      }
    } else {
      lines.push({ id: v.id, name: v.name, annual: p.usdPerYear, note: `From: ${p.basis}` })
    }
  }
  const t = practiceCost(reps, minutesPerRep)
  lines.push({
    id: 'toughtongue',
    name: 'Tough Tongue AI (practice layer, our product)',
    annual: t ? round2(t.monthly * 12) : null,
    note: t
      ? `${t.plan.name} plan (${t.plan.seats} seats), ${(reps * minutesPerRep).toLocaleString('en-US')} practice minutes a month`
      : 'Over 50 seats: Enterprise, custom price at $0.07/min',
    ours: true,
  })
  return lines
}

export const WORKED = { reps: 20, minutesPerRep: 30 }
