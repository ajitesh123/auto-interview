/**
 * Best LMS in Australia 2026: one source of truth for the comparison table, the
 * AUD + GST cost calculator, the "which rules apply to you" picker, the worked
 * table and the FAQ in /blog/best-lms-australia-2026.
 *
 * Every price, hosting, privacy and office statement was read on the vendor's own
 * pages on 10 Nov 2026 (URLs below). Anything not stated on an opened page is
 * written "Not stated". Prices are stored as written, in the currency the vendor
 * shows; `cost()` returns a year-one list price in that currency and `costRows()`
 * converts US dollars to Australian dollars at the RBA rate.
 *
 * Tax and law sources (opened 10 Nov 2026):
 * - GST 10%: https://www.ato.gov.au/businesses-and-organisations/gst-excise-and-indirect-taxes/gst/how-gst-works
 * - GST registration at $75,000 turnover: https://www.ato.gov.au/businesses-and-organisations/gst-excise-and-indirect-taxes/gst/registering-for-gst
 * - Offshore supplier B2B, ABN + GST-registered, no GST charged:
 *   https://www.ato.gov.au/businesses-and-organisations/gst-excise-and-indirect-taxes/gst/in-detail/rules-for-specific-transactions/international-transactions/australian-business-importing-goods-and-services
 * - Reverse charge only where no full GST credit:
 *   https://www.ato.gov.au/businesses-and-organisations/international-tax-for-business/gst-for-non-resident-businesses/gst-cross-border-transactions-between-businesses
 * - Privacy Act small business ($3m), employee records exemption, APP 8, NDB, ADM (10 Dec 2026): oaic.gov.au pages listed in SOURCES
 * - APRA CPS 230 / CPS 234: apra.gov.au PDFs listed in SOURCES
 * - AUD/USD 0.6924 on 10 Nov 2026, RBA: https://www.rba.gov.au/rss/rss-cb-exchange-rates.xml
 */
import { practiceCost } from './salesLmsPricing'

export const CHECKED = '10 Nov 2026'
export const GST_RATE = 0.1
/** RBA: 1 AUD = 0.6924 USD on 10 Nov 2026 (4 pm Eastern Australian time). */
export const AUD_USD = 0.6924
export const FX_URL = 'https://www.rba.gov.au/rss/rss-cb-exchange-rates.xml'
export const WORKED_LEARNERS = 100
export const PRACTICE_MIN = 30

export type Segment = 'corporate' | 'frontline' | 'sales' | 'creator'

export const SEGMENTS: { id: Segment; label: string }[] = [
  { id: 'corporate', label: 'Corporate L&D' },
  { id: 'frontline', label: 'Frontline and compliance' },
  { id: 'sales', label: 'Sales teams' },
  { id: 'creator', label: 'Course sellers and RTOs' },
]

export type Currency = 'AUD' | 'USD'

export interface Cost {
  /** Year-one list price in `currency`, before GST. null = quote only or currency not shown. */
  annual: number | null
  note: string
}

export interface AuLms {
  id: string
  name: string
  segments: Segment[]
  /** Currency the price is shown and billed in, as stated. */
  currency: Currency | 'Not stated'
  stated: string
  priceUrl: string
  hosting: string
  hostingUrl?: string
  /** True only when an opened vendor page says Australian hosting is available. */
  auHosting?: boolean
  /** Privacy Act 1988 / APP statement on the vendor's own pages. */
  privacy: string
  privacyUrl?: string
  apps?: boolean
  /** Security assurance named on the vendor's pages (ISO 27001, SOC 2, IRAP). */
  assurance: string
  assuranceUrl?: string
  irap?: boolean
  /** Australian office or legal entity, as listed by the vendor. */
  office: string
  officeUrl?: string
  auOffice?: boolean
  bestFor: string
  cost: (learners: number) => Cost
  ours?: boolean
}

const quote = (note = 'Not published: quote only'): Cost => ({ annual: null, note })
const r2 = (n: number) => Math.round(n * 100) / 100

export const PLATFORMS: AuLms[] = [
  {
    id: 'moodlecloud',
    name: 'MoodleCloud',
    segments: ['creator', 'corporate'],
    currency: 'AUD',
    stated:
      'Billed yearly in AUD: Starter $230 (50 users); Mini $380 (100); Small $700 (200); Medium $1,700 (500); Standard $3,000 (750); "Country-specific taxes may also apply"',
    priceUrl: 'https://www.moodlecloud.com/?p=75',
    hosting: 'Choice of Australia (Sydney), EU (Ireland) or USA (Oregon)',
    hostingUrl:
      'https://support.moodle.com/support/solutions/articles/80000831971-moodlecloud-data-hosting-locations',
    auHosting: true,
    privacy: 'Not stated (privacy notice cites GDPR, UK GDPR and CCPA)',
    privacyUrl: 'https://www.moodlecloud.com/privacy-notice/',
    assurance: '"Not accredited with any ISO certifications"',
    assuranceUrl:
      'https://support.moodle.com/support/solutions/articles/80000951697-moodlecloud-security-certification',
    office: 'Moodle Pty Ltd, West Perth WA',
    officeUrl: 'https://www.moodlecloud.com/privacy-notice/',
    auOffice: true,
    bestFor:
      'Small teams, RTOs and course sellers that want open-source Moodle for a few hundred dollars a year',
    cost: (n) => {
      const bands: [number, number, string][] = [
        [50, 230, 'Starter'],
        [100, 380, 'Mini'],
        [200, 700, 'Small'],
        [500, 1700, 'Medium'],
        [750, 3000, 'Standard'],
      ]
      const b = bands.find(([cap]) => n <= cap)
      return b
        ? { annual: b[1], note: `${b[2]}, up to ${b[0]} users, per year in AUD` }
        : quote('Over 750 users: a Moodle partner or self-hosting, custom price')
    },
  },
  {
    id: 'elmo',
    name: 'ELMO Learning',
    segments: ['corporate', 'frontline'],
    currency: 'Not stated',
    stated:
      'No public price: "For bespoke pricing, we invite you to reach out for a quote"; priced per employee',
    priceUrl: 'https://elmosoftware.com.au/pricing',
    hosting: '"Customer data is hosted in secure, accredited AWS data centers in Australia"',
    hostingUrl: 'https://elmosoftware.com.au/about/data-security',
    auHosting: true,
    privacy: '"In line with the Australian Privacy Principles (APPs), the Privacy Act 1988"',
    privacyUrl: 'https://elmosoftware.com.au/about/data-security',
    apps: true,
    assurance: 'ISO/IEC 27001:2022, ISO/IEC 27017:2015 and ISO/IEC 42001:2023',
    assuranceUrl: 'https://elmosoftware.com.au/about/data-security',
    office: '"9 Offices across ANZ & UK"',
    officeUrl: 'https://elmosoftware.com.au/about',
    auOffice: true,
    bestFor:
      'Mid-sized Australian employers that want learning inside an HR suite with local hosting',
    cost: () => quote(),
  },
  {
    id: 'go1',
    name: 'Go1',
    segments: ['corporate', 'frontline'],
    currency: 'USD',
    stated:
      'Small-team plans priced per user per year, "USD pricing shown for teams of 100 employees" (amount not shown on the page we opened); Premium plans "Speak with an expert"',
    priceUrl: 'https://www.go1.com/small-business-lms',
    hosting:
      'Microsoft Azure; customers "can choose where your Personally Identifiable Information (PII) is stored" (Australia, US or EU)',
    hostingUrl: 'https://www.go1.com/faqs',
    auHosting: true,
    privacy:
      'Not stated (policy refers to "the laws and regulations of each of the countries in which we operate")',
    privacyUrl: 'https://www.go1.com/terms/privacy-policy',
    assurance: 'SOC 2 Type II and ISO 27001',
    assuranceUrl: 'https://www.go1.com/faqs',
    office: 'Go1 Pty Ltd, Underwood QLD (Brisbane)',
    officeUrl: 'https://www.go1.com/terms/privacy-policy',
    auOffice: true,
    bestFor: 'Teams that want a large off-the-shelf course library more than an authoring tool',
    cost: () => quote('Price not visible on the page we opened: quote or check in the app'),
  },
  {
    id: 'employment-hero',
    name: 'Employment Hero Learning',
    segments: ['corporate', 'frontline'],
    currency: 'Not stated',
    stated:
      'Add-ons: "Learning – 10-Course Bundle" $9 per employee/month (min $90/month); "LMS Plus" $18 per employee/month (min $180/month); HR plans need at least 10 users; currency not shown',
    priceUrl: 'https://employmenthero.com/pricing/',
    hosting: 'Not stated on public pages',
    privacy:
      'Privacy policy says it complies with "the Australian Privacy Act 1988, the Australian Privacy Principles"',
    privacyUrl: 'https://help.employmenthero.com/hc/en-au/articles/5839177043983-Privacy-Policy',
    apps: true,
    assurance: 'Not stated on pages we could open',
    office: 'Not stated on pages opened',
    bestFor: 'Small and mid-sized businesses already on Employment Hero for HR and payroll',
    cost: () => quote('Currency not shown on the pricing page: ask for an AUD quote'),
  },
  {
    id: 'absorb',
    name: 'Absorb LMS',
    segments: ['corporate', 'frontline'],
    currency: 'Not stated',
    stated: 'No public price: "Get your tailored pricing now"',
    priceUrl: 'https://www.absorbai.com/blog/the-essential-guide-to-lms-pricing',
    hosting: 'AWS Australia region, data centre in "Sydney, New South Wales, Australia"',
    hostingUrl:
      'https://support.absorblms.com/hc/en-us/articles/53677872546323-Data-Hosting-Locations-and-AWS-Regions',
    auHosting: true,
    privacy: 'Not stated',
    assurance: 'Not stated on pages opened ("industry standard security practices")',
    office: 'Support staff in Australia (among five countries)',
    officeUrl:
      'https://support.absorblms.com/hc/en-us/articles/53677872546323-Data-Hosting-Locations-and-AWS-Regions',
    bestFor: 'Mid-to-large employers that want a Sydney-hosted, enterprise-grade LMS',
    cost: () => quote(),
  },
  {
    id: 'docebo',
    name: 'Docebo',
    segments: ['corporate', 'sales'],
    currency: 'Not stated',
    stated: 'No public price; "based on active learner usage, not simply the number of accounts"',
    priceUrl: 'https://www.docebo.com/pricing/',
    hosting:
      'AWS in Australia is one of six processing locations; "Disaster Recovery location for Australia processing location will be located in Singapore"; Amazon Bedrock AI processing listed in the EU',
    hostingUrl: 'https://tos.docebo.com/Docebo-sub-processors-list.pdf',
    auHosting: true,
    privacy: 'Not stated (pricing page names GDPR and SOC 2)',
    assurance: 'SOC 2; trust centre gated',
    assuranceUrl: 'https://www.docebo.com/pricing/',
    office: 'Docebo Australia Pty Ltd, St Kilda Road, Melbourne',
    officeUrl: 'https://www.docebo.com/contact/',
    auOffice: true,
    bestFor: 'Large companies training staff, partners and customers on one platform',
    cost: () => quote(),
  },
  {
    id: 'learnupon',
    name: 'LearnUpon',
    segments: ['corporate', 'sales'],
    currency: 'Not stated',
    stated: 'No public price; employee plan "From 100 Users"',
    priceUrl: 'https://www.learnupon.com/pricing/',
    hosting:
      'EU, US or Australia; Australian location "available to new customers only, depending on your LearnUpon plan"',
    hostingUrl:
      'https://support.learnupon.com/hc/en-us/articles/4409727105937-Data-residency-options-for-LearnUpon',
    auHosting: true,
    privacy: 'Not stated',
    assurance: 'ISO 27001:2022 and SOC 2',
    assuranceUrl: 'https://www.learnupon.com/security/',
    office: 'Level 20, 135 King Street, Sydney',
    officeUrl: 'https://www.learnupon.com/contact/',
    auOffice: true,
    bestFor: 'Companies with 100+ learners that also train customers or partners',
    cost: () => quote('Quote only; plans start at 100 users'),
  },
  {
    id: 'litmos',
    name: 'Litmos',
    segments: ['corporate', 'sales'],
    currency: 'Not stated',
    stated:
      'Foundation "Starting at $8K per year"; Platinum "Starting at $15K per year"; currency not shown',
    priceUrl: 'https://www.litmos.com/plans/',
    hosting:
      'Customers "can choose to host data in several regions including the EU, Australia, or United States"',
    hostingUrl: 'https://www.litmos.com/trust-and-security/',
    auHosting: true,
    privacy: 'Not stated',
    assurance: 'ISO 27001:2022 and SOC 2 Type II',
    assuranceUrl: 'https://www.litmos.com/trust-and-security/',
    office: 'Learning Seat Pty Ltd (affiliate), George Street, Sydney',
    officeUrl: 'https://litmos.com/files/LIT-FRM-SubProcessors.pdf',
    auOffice: true,
    bestFor:
      'Mid-market teams that want a published starting price and an Australian hosting option',
    cost: () => quote('From $8K a year, currency not shown: ask for an AUD quote'),
  },
  {
    id: 'ispring',
    name: 'iSpring LMS',
    segments: ['corporate'],
    currency: 'USD',
    stated:
      'Business, 100 users: $6.91 per user/month, $8,286 a year, active users only; larger: Contact Sales',
    priceUrl: 'https://www.ispring.com/pricing',
    hosting: '"We store data of our clients from Australia and New Zealand at AWS (Sydney)"',
    hostingUrl: 'https://www.ispring.com/legal/data-security',
    auHosting: true,
    privacy: 'Not stated',
    assurance:
      'Not stated on its data security page (names its hosting providers as ISO 27001 certified)',
    assuranceUrl: 'https://www.ispring.com/legal/data-security',
    office: 'Not stated',
    bestFor: 'Teams of about 100 that build their own courses in PowerPoint',
    cost: (n) =>
      n <= 100
        ? { annual: 8286, note: 'Business, 100-user tier (the only one published), USD' }
        : quote('Over 100 users: Contact Sales'),
  },
  {
    id: 'talentlms',
    name: 'TalentLMS',
    segments: ['corporate'],
    currency: 'USD',
    stated:
      'Free up to 5 users; Core $119/month (up to 100 users); Grow $229/month (up to 500); Pro $449/month + $6 per extra user; "Prices in USD"; annual billing 20% off',
    priceUrl: 'https://www.talentlms.com/pricing',
    hosting: 'USA only (AWS N. Virginia)',
    hostingUrl: 'https://www.talentlms.com/subprocessors',
    privacy: 'Not stated (GDPR only)',
    assurance: 'ISO/IEC 27001:2022',
    assuranceUrl: 'https://www.talentlms.com/security',
    office: 'Not stated',
    bestFor: 'Small businesses that want a free start and a published price up to 500 users',
    cost: (n) =>
      n <= 5
        ? { annual: 0, note: 'Free plan, up to 5 users' }
        : n <= 100
          ? {
              annual: 119 * 12,
              note: 'Core, up to 100 users, $119 × 12 as shown (annual billing advertised 20% off), USD',
            }
          : n <= 500
            ? { annual: 229 * 12, note: 'Grow, up to 500 users, $229 × 12 (monthly billing), USD' }
            : quote('Over 500 users: Pro or Enterprise'),
  },
  {
    id: '360learning',
    name: '360Learning',
    segments: ['corporate', 'sales'],
    currency: 'USD',
    stated:
      'Team $8 per user/month (currency not named; we assume USD), up to 100 users, active users only, no minimum, billed monthly; Business and Enterprise custom',
    priceUrl: 'https://360learning.com/pricing/',
    hosting: 'Azure, "in locations non subject to the Patriot Act"; Australia not named',
    hostingUrl: 'https://360learning.com/privacy-and-security/',
    privacy: 'Not stated',
    assurance: 'SOC 2 Type II and ISO 27001',
    assuranceUrl: 'https://360learning.com/privacy-and-security/',
    office: 'Not stated',
    bestFor: 'Teams under 100 that want managers and experts to write courses together',
    cost: (n) =>
      n <= 100
        ? { annual: 8 * n * 12, note: `Team plan: $8 × ${n} users × 12, USD` }
        : quote('Over 100 users: Business plan, custom price'),
  },
  {
    id: 'workday',
    name: 'Workday Learning',
    segments: ['corporate'],
    currency: 'Not stated',
    stated: 'No public price; for Workday HCM customers, with Sana Learn sold standalone',
    priceUrl:
      'https://investor.workday.com/news-and-events/press-releases/news-details/2026/Workday-Learning-Powered-by-Sana-Now-Generally-Available-as-an-AI-Native-Learning-Experience-Built-on-Workdays-Trusted-Data/default.aspx',
    hosting: 'Not stated on public pages',
    privacy:
      '"Workday adheres to Australian data protection regulations, including the Australian Privacy Principles (APPs)"',
    privacyUrl: 'https://www.workday.com/en-au/why-workday/trust/compliance.html',
    apps: true,
    assurance: 'IRAP assessment by a third-party assessor; ISO 27001',
    assuranceUrl: 'https://www.workday.com/en-au/why-workday/trust/compliance.html',
    irap: true,
    office: 'Brisbane, Melbourne and North Sydney',
    officeUrl: 'https://www.workday.com/en-au/company/workday-for-australia.html',
    auOffice: true,
    bestFor: 'Large employers and agencies already running Workday HR',
    cost: () => quote(),
  },
  {
    id: 'totara-kineo',
    name: 'Totara (Kineo edition)',
    segments: ['corporate', 'frontline'],
    currency: 'AUD',
    stated:
      'No public price; Kineo terms (Feb 2023): "All prices are quoted in $AUD or $NZD", exclusive of GST, licences invoiced yearly in advance',
    priceUrl:
      'https://kineo.com/assets/Terms-and-Conditions/February-2023-V2/kapac-au-nz_totara-kineo-edition-terms-and-conditions_global_-v2.4_20230215.pdf',
    hosting:
      'Not stated for the LMS; Kineo terms say personal data is not sent outside Australia or New Zealand without consent',
    hostingUrl:
      'https://kineo.com/assets/Terms-and-Conditions/February-2023-V2/kapac-au-nz_totara-kineo-edition-terms-and-conditions_global_-v2.4_20230215.pdf',
    privacy: 'Not stated',
    assurance: 'Not stated',
    office: 'Totara Learning (Australia), Sydney; Kineo support in Australia',
    officeUrl: 'https://totara.com/terms-of-service/',
    auOffice: true,
    bestFor: 'Organisations that want an open-source enterprise LMS set up by a local partner',
    cost: () => quote(),
  },
  {
    id: 'cornerstone',
    name: 'Cornerstone',
    segments: ['corporate'],
    currency: 'Not stated',
    stated: 'No public price',
    priceUrl: 'https://trustcenter.cornerstoneondemand.com/',
    hosting: 'Not stated on public pages (hosting regions are behind the trust centre login)',
    privacy: 'Not stated',
    assurance: 'SOC 2 Type 2 and ISO/IEC 27001:2022',
    assuranceUrl: 'https://trustcenter.cornerstoneondemand.com/',
    office: 'Not confirmed (contact page did not load)',
    bestFor: 'Enterprises that want learning, skills and performance in one suite',
    cost: () => quote(),
  },
  {
    id: 'safetyculture',
    name: 'SafetyCulture Training (formerly EdApp)',
    segments: ['frontline'],
    currency: 'Not stated',
    stated:
      'Free and per-learner plans advertised; we could not open the live pricing page on 10 Nov',
    priceUrl: 'https://training.safetyculture.com/pricing',
    hosting: 'Not stated on pages we could open',
    privacy: 'Not stated',
    assurance: 'Not stated',
    office: 'Not confirmed',
    bestFor: 'Frontline and shift teams that learn on phones in short lessons',
    cost: () => quote('Live pricing page did not load for us: check it directly'),
  },
  {
    id: 'thinkific',
    name: 'Thinkific',
    segments: ['creator'],
    currency: 'USD',
    stated:
      'Start $109/month or $82/month billed annually; Grow $219 or $164; Expand $499 or $374; Plus custom',
    priceUrl: 'https://www.thinkific.com/pricing/',
    hosting: '"Thinkific hosts customer and learner data in the United States"',
    hostingUrl: 'https://www.thinkific.com/security-overview/',
    privacy: 'Not stated',
    assurance: 'SOC 2',
    assuranceUrl: 'https://www.thinkific.com/security-overview/',
    office: 'Not stated',
    bestFor: 'Trainers and coaches who sell courses online rather than train staff',
    cost: () => ({ annual: 82 * 12, note: 'Start, $82 × 12 billed annually, USD' }),
  },
  {
    id: 'toughtongue',
    name: 'Tough Tongue AI',
    segments: ['sales', 'corporate'],
    currency: 'USD',
    stated:
      'Free 25 min; Business $299/month (2,990 min, 15 seats); Growth $499 (6,000 min, 25 seats); Momentum $999 (13,000 min, 50 seats)',
    priceUrl: 'https://www.toughtongueai.com/pricing',
    hosting: 'Not an LMS; sits next to one',
    privacy: 'Not stated',
    assurance: 'Not stated',
    office: 'Not stated',
    bestFor: 'Adding spoken practice (sales calls, interviews, hard conversations) to any LMS',
    ours: true,
    cost: (n) => {
      const t = practiceCost(n, PRACTICE_MIN)
      return t
        ? {
            annual: r2(t.monthly * 12),
            note: `${t.plan.name} plan (${t.plan.seats} seats), ${PRACTICE_MIN} practice min per learner a month, USD`,
          }
        : quote('Over 50 seats: Enterprise, custom price')
    },
  },
]

/** Counts used in the post's prose and OG card (computed, never typed by hand). */
export const STATS = (() => {
  const lms = PLATFORMS.filter((p) => !p.ours)
  return {
    total: PLATFORMS.length,
    lms: lms.length,
    pricedAt100: lms.filter((p) => p.cost(WORKED_LEARNERS).annual !== null).length,
    quoteOnly: lms.filter((p) => p.cost(WORKED_LEARNERS).annual === null).length,
    auHosting: lms.filter((p) => p.auHosting).length,
    auOffice: lms.filter((p) => p.auOffice).length,
    apps: lms.filter((p) => p.apps).length,
    irap: lms.filter((p) => p.irap).length,
    audBilled: lms.filter((p) => p.currency === 'AUD').length,
  }
})()

/**
 * GST position of the buyer.
 * - registered: GST-registered, full credits. An Australian vendor charges 10% and you
 *   claim it back; an offshore vendor charges none once you give your ABN.
 * - not-registered: under the $75,000 threshold. You pay 10% where the vendor charges it.
 * - partial: registered but cannot claim a full credit (input-taxed supplies such as
 *   financial services). Offshore purchases fall under the reverse charge.
 */
export type Buyer = 'registered' | 'not-registered' | 'partial'

export interface CostRow {
  id: string
  name: string
  ours?: boolean
  note: string
  currency: Currency | 'Not stated'
  listAud: number | null
  gstAud: number | null
  /** What the buyer bears after any GST credit, at most. */
  netAud: number | null
}

const r0 = (n: number) => Math.round(n)

export function toAud(amount: number, currency: Currency, fx = AUD_USD) {
  return currency === 'AUD' ? amount : amount / fx
}

export function costRows(learners: number, buyer: Buyer, fx = AUD_USD): CostRow[] {
  return PLATFORMS.map((p) => {
    const c = p.cost(learners)
    const listAud =
      c.annual === null || p.currency === 'Not stated' ? null : r0(toAud(c.annual, p.currency, fx))
    const gstAud = listAud === null ? null : r0(listAud * GST_RATE)
    const netAud =
      listAud === null || gstAud === null
        ? null
        : buyer === 'registered'
          ? listAud
          : listAud + gstAud
    return {
      id: p.id,
      name: p.name,
      ours: p.ours,
      note: c.note,
      currency: p.currency,
      listAud,
      gstAud,
      netAud,
    }
  })
}

export const formatAud = (n: number) =>
  `A$${n.toLocaleString('en-AU', { maximumFractionDigits: 0 })}`

/** Which rules apply, by the kind of organisation buying. */
export type Sector = 'general' | 'small' | 'apra' | 'government' | 'health'

export interface SectorRule {
  id: Sector
  label: string
  law: string
  lawUrl: string
  hosting: string
  extra: string
  extraUrl?: string
  ask: string
}

export const SECTORS: SectorRule[] = [
  {
    id: 'general',
    label: 'Business over $3m turnover',
    law: 'Privacy Act 1988 and the Australian Privacy Principles. Your own staff records are largely exempt, but the OAIC says the exemption is "unlikely to apply" to training services under contract, so the LMS vendor is covered.',
    lawUrl:
      'https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/organisations/employee-records-exemption',
    hosting:
      'No law forces Australian hosting. Before data goes overseas, APP 8 says you must take reasonable steps so the recipient does not breach the APPs, and you stay accountable for it.',
    extra:
      'From 10 December 2026 your privacy policy must explain automated decisions that use personal information and could significantly affect people. A breach must be assessed within 30 days.',
    extraUrl:
      'https://www.oaic.gov.au/news/media-centre/new-resources-on-transparency-for-use-of-ai-and-automated-decision-making',
    ask: 'Get the hosting region, the sub-processor list and APP clauses written into the contract.',
  },
  {
    id: 'small',
    label: 'Small business ($3m or less)',
    law: 'Usually outside the Privacy Act: the OAIC defines a small business as "annual turnover of $3 million or less". Health service providers, businesses that trade in personal information and Commonwealth contractors are covered anyway.',
    lawUrl:
      'https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/organisations/small-business',
    hosting: 'No hosting rule applies to you. Your vendor may still be bound by the APPs itself.',
    extra:
      'Under $75,000 turnover you need not register for GST, so GST charged to you is a cost you cannot claim back.',
    extraUrl:
      'https://www.ato.gov.au/businesses-and-organisations/gst-excise-and-indirect-taxes/gst/registering-for-gst',
    ask: 'Pick on price and ease; check that you can export your records if you leave.',
  },
  {
    id: 'apra',
    label: 'Bank, insurer or super fund (APRA)',
    law: 'APRA CPS 230 (in force since 1 July 2025) and CPS 234, on top of the Privacy Act.',
    lawUrl:
      'https://www.apra.gov.au/system/files/2023-07/Prudential%20Standard%20CPS%20230%20Operational%20Risk%20Management%20-%20clean.pdf',
    hosting:
      'No fixed hosting rule, but you must "assess the information security capability" of a third party that handles your information (CPS 234).',
    extra:
      'If the LMS is a material service provider, it goes on your register and needs a legally binding agreement. Security incidents go to APRA within 72 hours.',
    extraUrl:
      'https://www.apra.gov.au/sites/default/files/cps_234_july_2019_for_public_release.pdf',
    ask: 'Ask for the vendor’s security assessment pack and APRA-ready contract terms before the demo stage.',
  },
  {
    id: 'government',
    label: 'Government agency',
    law: 'Privacy Act and APPs, plus your agency’s security policy. IRAP is how agencies check a cloud system against the ISM.',
    lawUrl: 'https://cyber.gov.au/sites/default/files/2024-08/IRAP%20consumer%20guide.pdf',
    hosting:
      'Expect to need Australian hosting and an IRAP assessment. ASD says an assessment "does not imply that a system is compliant, endorsed or approved".',
    extra:
      'Of the LMS vendors we checked, only Workday names an IRAP assessment on its public pages.',
    extraUrl: 'https://www.workday.com/en-au/why-workday/trust/compliance.html',
    ask: 'Ask for the IRAP assessment report, its date and scope, and the hosting provider’s certification level.',
  },
  {
    id: 'health',
    label: 'Health provider',
    law: 'Privacy Act (covered at any size) plus state health records laws, such as Victoria’s Health Records Act 2001 and NSW’s HRIP Act 2002.',
    lawUrl: 'https://www.health.vic.gov.au/legislation/health-records-act',
    hosting:
      'Training records are not health records, but case studies built from real patients are.',
    extra: 'Keep patient details out of courses and roleplays; use invented cases.',
    ask: 'Confirm in writing that no patient data will be uploaded, and where any uploaded files are stored.',
  },
]
