/**
 * Best LMS in India 2026: one source of truth for the comparison table, the
 * INR + GST cost calculator, the worked table and the FAQ in
 * /blog/best-lms-india-2026.
 *
 * Every price, hosting and DPDP statement was read on the vendor's own page on
 * 7 Nov 2026 (URLs below). Anything not stated on an opened page is left out or
 * written as "Not stated". Prices are stated as written; `cost()` turns them
 * into a year-one list price in the currency the vendor shows.
 *
 * Tax and law sources (opened 7 Nov 2026):
 * - GST Council flyer, imports: https://gstcouncil.gov.in/sites/default/files/e-version-gst-flyers/Imports_in_GST_Regime.pdf
 * - CBIC reverse charge flyer: https://cbic-gst.gov.in/pdf/e-version-gst-fliers/reverse-charge-mechanism-08aug2017.pdf
 * - CBIC OIDAR flyer: https://cbic-gst.gov.in/hindi/pdf/e-version-gst-fliers/OIDAR_online%20version_online%20version_20_July_2017.pdf
 * - SaaS at 18% after the Sept 2025 rate change: https://www.xflowpay.com/blog/gst-on-software-services
 * - DPDP Rules 2025 (Gazette G.S.R. 846(E), 13 Nov 2025): https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf
 * - DPDP Act 2023: https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf
 * - USD/INR RBI reference rate 5 Nov 2026 (94.3996): https://www.msei.in/markets/currency/historical-data/rbireferenceratearchives
 */
import { PLATFORMS as AI_LMS } from './aiLmsData'
import { practiceCost } from './salesLmsPricing'

export const CHECKED = '7 Nov 2026'
export const GST_RATE = 0.18
/** RBI reference rate for USD on 5 Nov 2026 (94.3996), rounded. Editable in the calculator. */
export const USD_INR = 94.4
export const USD_INR_DATE = '5 Nov 2026'
export const FX_URL =
  'https://www.msei.in/markets/currency/historical-data/rbireferenceratearchives'
export const WORKED_LEARNERS = 100
export const PRACTICE_MIN = 30

export type Segment = 'corporate' | 'sales' | 'creator' | 'academic'

export const SEGMENTS: { id: Segment; label: string }[] = [
  { id: 'corporate', label: 'Corporate L&D' },
  { id: 'sales', label: 'Sales teams' },
  { id: 'creator', label: 'Coaching and course creators' },
  { id: 'academic', label: 'Schools and colleges' },
]

export type Currency = 'INR' | 'USD'

export interface Cost {
  /** Year-one list price in `currency`, before GST. null = quote only. */
  annual: number | null
  currency: Currency
  note: string
}

export interface IndiaLms {
  id: string
  name: string
  segments: Segment[]
  /** How the published price is billed, as the vendor shows it. */
  billing: string
  stated: string
  priceUrl: string
  hosting: string
  hostingUrl?: string
  dpdp: string
  dpdpUrl?: string
  bestFor: string
  cost: (learners: number) => Cost
  ours?: boolean
  /** Billed from outside India even when a rupee price is shown (GST by reverse charge or OIDAR). */
  foreign?: boolean
}

const inr = (annual: number | null, note: string): Cost => ({ annual, currency: 'INR', note })
const usd = (annual: number | null, note: string): Cost => ({ annual, currency: 'USD', note })
const quote = (note = 'Not published: quote only'): Cost => ({
  annual: null,
  currency: 'INR',
  note,
})

const fromAiLms = (id: string) => {
  const p = AI_LMS.find((x) => x.id === id)
  if (!p) throw new Error(`aiLmsData has no ${id}`)
  return p
}
const talent = fromAiLms('talentlms')
const ispring = fromAiLms('ispring')
const l360 = fromAiLms('360learning')

export const PLATFORMS: IndiaLms[] = [
  {
    id: 'edmingle',
    name: 'Edmingle',
    segments: ['creator', 'corporate'],
    billing: 'INR',
    stated:
      'Core ₹7,499/month (500 monthly active learners); Prime ₹14,999 (1,000); Power ₹29,999 (2,000); Maxx custom',
    priceUrl: 'https://www.edmingle.com/blog/lms-pricing-in-india/',
    hosting: 'Not stated ("secure cloud hosting", no location)',
    hostingUrl: 'https://www.edmingle.com/plan-comparison/',
    dpdp: 'DPDP Act badge in the site footer; no detail',
    bestFor:
      'Training businesses and academies that sell courses and want WhatsApp and app delivery',
    cost: (n) =>
      n <= 500
        ? inr(7499 * 12, 'Core, up to 500 monthly active learners, ₹7,499 × 12')
        : n <= 1000
          ? inr(14999 * 12, 'Prime, up to 1,000 monthly active learners, ₹14,999 × 12')
          : n <= 2000
            ? inr(29999 * 12, 'Power, up to 2,000 monthly active learners, ₹29,999 × 12')
            : quote('Over 2,000 active learners: Maxx, custom price'),
  },
  {
    id: 'learnyst-corporate',
    name: 'Learnyst Corporate LMS',
    segments: ['corporate'],
    billing: 'INR',
    stated: 'Starter ₹49,999/month for up to 1,000 learners; Scale custom',
    priceUrl: 'https://www.learnyst.com/corporate-lms/pricing',
    hosting: 'Not stated',
    dpdp: 'Not stated',
    bestFor:
      'Indian companies that want an INR-billed corporate LMS with HRMS and CRM integrations',
    cost: (n) =>
      n <= 1000
        ? inr(49999 * 12, 'Starter, up to 1,000 learners, ₹49,999 × 12')
        : quote('Over 1,000 learners: Scale, custom price'),
  },
  {
    id: 'learnyst',
    name: 'Learnyst (creators)',
    segments: ['creator'],
    billing: 'INR or USD',
    stated:
      'Professional ₹8,999/month ($149 + taxes); Premium ₹14,999 ($249); Business ₹49,999 ($799); Enterprise custom',
    priceUrl: 'https://www.learnyst.com/pricing',
    hosting: 'Not stated',
    dpdp: 'Not stated',
    bestFor: 'Test-prep and coaching brands that need DRM-protected video and their own app',
    cost: () => inr(8999 * 12, 'Professional, ₹8,999 × 12; learner limit not stated on the page'),
  },
  {
    id: 'graphy',
    name: 'Graphy',
    segments: ['creator'],
    billing: 'INR (billed annually) or USD',
    stated:
      'Launch ₹1,999/month and Rise ₹9,999/month, billed annually, plus a fee per sale (10% or 5%, minimum ₹10); USD plans $49, $149, $399',
    priceUrl: 'https://graphy.com/us/pricing/',
    hosting: 'Not stated',
    dpdp: 'Not stated',
    bestFor: 'Solo creators who want the lowest fixed fee and accept a cut of each sale',
    cost: () =>
      inr(1999 * 12, 'Launch, ₹1,999 × 12 billed annually; plus 10% (min ₹10) of every sale'),
  },
  {
    id: 'classplus',
    name: 'Classplus',
    segments: ['creator'],
    billing: 'INR',
    stated:
      '1-year plan ₹29,999 (listed beside ₹34,999); 2-year plan ₹39,999; unlimited students, Android app',
    priceUrl: 'https://classplusapp.com/new-web',
    hosting: 'Not stated',
    dpdp: 'Not stated',
    bestFor: 'Coaching centres that want a branded Android app with unlimited students',
    cost: () => inr(29999, '1-year plan, unlimited students'),
  },
  {
    id: 'moodlecloud',
    name: 'MoodleCloud',
    segments: ['academic', 'creator', 'corporate'],
    billing: 'Shown in INR, billed in AUD',
    foreign: true,
    stated:
      'Per year: Starter ₹14,870 (50 users); Mini ₹24,560 (100); Small ₹45,240 (200); Medium ₹1,09,870 (500); Standard ₹1,93,890 (750)',
    priceUrl: 'https://www.moodlecloud.com/standard-plans/',
    hosting: 'Australia, Europe and the USA (India not listed)',
    hostingUrl: 'https://www.moodlecloud.com/product-specifications/',
    dpdp: 'Not stated',
    bestFor: 'Colleges and small institutes that want open-source Moodle without running servers',
    cost: (n) => {
      const bands: [number, number, string][] = [
        [50, 14870, 'Starter'],
        [100, 24560, 'Mini'],
        [200, 45240, 'Small'],
        [500, 109870, 'Medium'],
        [750, 193890, 'Standard'],
      ]
      const b = bands.find(([cap]) => n <= cap)
      return b
        ? inr(b[1], `${b[2]}, up to ${b[0]} users, per year (shown in INR, billed in AUD)`)
        : quote('Over 750 users: Moodle Partner or self-hosted, custom price')
    },
  },
  {
    id: 'talentlms',
    name: 'TalentLMS',
    segments: ['corporate'],
    billing: 'USD',
    stated: talent.stated,
    priceUrl: talent.pricingUrl,
    hosting: 'Not stated',
    dpdp: 'Not stated',
    bestFor: 'Small teams that want a free start and AI course creation',
    cost: (n) => {
      const c = talent.cost(n)
      return usd(c.annual, c.note)
    },
  },
  {
    id: 'ispring',
    name: 'iSpring LMS',
    segments: ['corporate'],
    billing: 'USD',
    stated: ispring.stated,
    priceUrl: ispring.pricingUrl,
    hosting: 'Not stated',
    dpdp: 'Not stated',
    bestFor: 'Mid-size companies with 100–500 learners that want a low per-user price',
    cost: (n) => {
      const c = ispring.cost(n)
      return usd(c.annual, c.note)
    },
  },
  {
    id: '360learning',
    name: '360Learning',
    segments: ['corporate', 'sales'],
    billing: 'USD',
    stated: l360.stated,
    priceUrl: l360.pricingUrl,
    hosting: 'Not stated',
    dpdp: 'Not stated',
    bestFor: 'Teams under 100 that want AI authoring and AI roleplay on a monthly plan',
    cost: (n) => {
      const c = l360.cost(n)
      return usd(c.annual, c.note)
    },
  },
  {
    id: 'paradiso',
    name: 'Paradiso LMS',
    segments: ['corporate'],
    billing: 'USD',
    stated:
      'Growth from $2.95 per learner/month, up to 500 learners, billed monthly; AI coach and AI admin assistant are add-ons; Enterprise custom',
    priceUrl: 'https://www.paradisosolutions.com/lms-pricing',
    hosting: 'Not stated',
    dpdp: 'Not stated (GDPR and HIPAA named)',
    bestFor: 'Companies that want per-learner pricing and many integrations',
    cost: (n) =>
      n <= 500
        ? usd(
            Math.round(2.95 * n * 12 * 100) / 100,
            `From: Growth $2.95 × ${n} learners × 12; AI add-ons extra`
          )
        : quote('Over 500 learners: Enterprise, custom price'),
  },
  {
    id: 'calibr',
    name: 'Calibr',
    segments: ['corporate'],
    billing: 'USD',
    stated:
      'Starter $2/user/month (core LMS, content library, mobile); Professional (adds AI authoring) and Enterprise custom; 14-day trial',
    priceUrl: 'https://calibr.ai/comparisons/talentlms-alternative',
    hosting: 'Not stated',
    dpdp: 'Not stated (ISO 27001, SOC 2 Ready, GDPR Ready named)',
    bestFor: 'Cost-sensitive teams that need a basic LMS with a mobile app and offline access',
    cost: (n) => usd(2 * n * 12, `Starter $2 × ${n} users × 12; AI authoring needs Professional`),
  },
  {
    id: 'disprz',
    name: 'Disprz',
    segments: ['corporate', 'sales'],
    billing: 'Quote',
    stated: 'Not published: enterprise quote',
    priceUrl: 'https://disprz.ai/blog/best-lms-platform-india',
    hosting: '"Data residency aligned to contractual commitments"; no region named',
    hostingUrl: 'https://disprz.ai/legal/privacy-policy',
    dpdp: 'Claims DPDP alignment on its own blog; privacy policy does not mention DPDP',
    dpdpUrl: 'https://disprz.ai/blog/best-lms-platform-india',
    bestFor: 'Large Indian employers with frontline staff, skills mapping and AI sales coaching',
    cost: () => quote(),
  },
  {
    id: 'mindtickle',
    name: 'Mindtickle',
    segments: ['sales'],
    billing: 'Quote',
    stated: 'Not published',
    priceUrl: 'https://www.mindtickle.com/trust/compliance/',
    hosting: 'Not stated (EU, UK and Swiss transfer frameworks named)',
    hostingUrl: 'https://www.mindtickle.com/trust/compliance/',
    dpdp: '"Complies with India\'s Digital Personal Data Protection Act, 2023"; acts as data processor',
    dpdpUrl: 'https://www.mindtickle.com/trust/compliance/',
    bestFor:
      'Sales enablement teams that want readiness scores, coaching and roleplay in one suite',
    cost: () => quote(),
  },
  {
    id: 'adobe',
    name: 'Adobe Learning Manager',
    segments: ['corporate'],
    billing: 'Quote',
    stated: 'Not published',
    priceUrl: 'https://business.adobe.com/products/learning-manager',
    hosting: "Virginia (US), Frankfurt or Mumbai (India), in the customer's chosen region",
    hostingUrl:
      'https://experienceleague.adobe.com/docs/learning-manager/assets/alm-security-whitepaper-2024.pdf?lang=en',
    dpdp: 'Not stated',
    bestFor: 'Enterprises that must keep learner data in an Indian data centre',
    cost: () => quote(),
  },
  {
    id: 'docebo',
    name: 'Docebo',
    segments: ['corporate', 'sales'],
    billing: 'Quote',
    stated: 'Not published',
    priceUrl: 'https://www.docebo.com/company/docebo-service-descriptions/',
    hosting: 'AWS global hosting; no India region named',
    hostingUrl: 'https://www.docebo.com/company/docebo-service-descriptions/',
    dpdp: 'Not stated',
    bestFor: 'Global enterprises that want AI roleplay, agents and skills as add-ons',
    cost: () => quote(),
  },
  {
    id: 'toughtongue',
    name: 'Tough Tongue AI',
    segments: ['sales', 'corporate'],
    billing: 'USD',
    stated:
      'Free 25 min; Business $299/month (2,990 min, 15 seats); Growth $499 (6,000 min, 25 seats); Momentum $999 (13,000 min, 50 seats)',
    priceUrl: 'https://www.toughtongueai.com/pricing',
    hosting: 'Not an LMS; sits next to one',
    dpdp: 'Not stated',
    bestFor: 'Adding spoken practice (sales calls, interviews, hard conversations) to any LMS',
    ours: true,
    cost: (n) => {
      const t = practiceCost(n, PRACTICE_MIN)
      return t
        ? usd(
            Math.round(t.monthly * 12 * 100) / 100,
            `${t.plan.name} plan (${t.plan.seats} seats), ${PRACTICE_MIN} practice min per learner a month`
          )
        : quote('Over 50 seats: Enterprise, custom price')
    },
  },
]

export type Buyer = 'itc' | 'no-itc'

export interface CostRow {
  id: string
  name: string
  ours?: boolean
  note: string
  currency: Currency
  /** Year-one list price in INR (converted when billed in USD). */
  listInr: number | null
  gstInr: number | null
  /** What the buyer is out of pocket after any input tax credit. */
  netInr: number | null
  route: string
}

const r0 = (n: number) => Math.round(n)

/** GST route for this buyer and billing currency (who pays the 18%). */
export function gstRoute(foreign: boolean, buyer: Buyer) {
  if (!foreign) return 'GST on the vendor invoice'
  return buyer === 'itc'
    ? 'Reverse charge: you pay 18% IGST, then claim it back'
    : 'Foreign vendor charges 18% IGST (OIDAR)'
}

export function costRows(learners: number, buyer: Buyer, fx = USD_INR): CostRow[] {
  return PLATFORMS.map((p) => {
    const c = p.cost(learners)
    const listInr = c.annual === null ? null : r0(c.currency === 'USD' ? c.annual * fx : c.annual)
    const gstInr = listInr === null ? null : r0(listInr * GST_RATE)
    const netInr =
      listInr === null || gstInr === null ? null : buyer === 'itc' ? listInr : listInr + gstInr
    return {
      id: p.id,
      name: p.name,
      ours: p.ours,
      note: c.note,
      currency: c.currency,
      listInr,
      gstInr,
      netInr,
      route: gstRoute(p.foreign ?? c.currency === 'USD', buyer),
    }
  })
}

export const formatInr = (n: number) =>
  `₹${n.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`
