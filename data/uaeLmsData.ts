/**
 * Best LMS in the UAE 2026: one source of truth for the comparison table, the
 * AED + VAT cost calculator, the data-law picker, the worked table and the FAQ in
 * /blog/best-lms-uae-2026.
 *
 * Every price, hosting, Arabic and UAE-office statement was read on the vendor's
 * own page on 9 Nov 2026 (URLs below). Anything not stated on an opened page is
 * written "Not stated". Prices are stated as written; `cost()` turns them into a
 * year-one list price in US dollars, the currency every priced vendor shows.
 *
 * Tax and law sources (opened 9 Nov 2026):
 * - VAT 5% (Art. 3) and reverse charge on imported services (Art. 48), Federal
 *   Decree-Law No. 8 of 2017: https://government.ae/-/media/Information-and-services/Finance-and-Investment/En-VATDecreeLawNo8of2017.pdf
 * - FTA registration thresholds (AED 375,000 / 187,500; not for foreign businesses):
 *   https://tax.gov.ae/en/taxes/Vat/Vat.Topics/registration.for.vat.aspx
 * - 2026 VAT amendments (no self-invoice under reverse charge), Baker McKenzie 8 Dec 2025:
 *   https://www.bakermckenzie.com/en/insight/publications/alerts/2025/12/united-arab-emirates-vat-and-tax-procedures-law-amendments
 * - E-invoicing dates, KPMG: https://kpmg.com/ae/en/insights/tax-insights/implementation-of-the-electronic-invoicing-system-in-the-uae.html
 * - PDPL, Federal Decree-Law No. 45 of 2021: https://uaelegislation.gov.ae/en/legislations/1972/download
 * - DIFC notification fees: https://www.difc.com/business/registrars-and-commissioners/commissioner-of-data-protection/forms-fees
 * - ADGM data protection fees: https://adgm.com/operating-in-adgm/office-of-data-protection/fee-sections
 * - AED peg 3.6725 per USD, CBUAE: https://centralbank.ae/media/jzipihcg/fx_nov25_en.pdf
 */
import { practiceCost } from './salesLmsPricing'

export const CHECKED = '9 Nov 2026'
export const VAT_RATE = 0.05
/** The dirham is pegged to the US dollar at 3.6725 (CBUAE rate table). */
export const USD_AED = 3.6725
export const FX_URL = 'https://centralbank.ae/media/jzipihcg/fx_nov25_en.pdf'
export const WORKED_LEARNERS = 100
export const PRACTICE_MIN = 30

export type Segment = 'corporate' | 'sales' | 'creator' | 'academic'

export const SEGMENTS: { id: Segment; label: string }[] = [
  { id: 'corporate', label: 'Corporate L&D' },
  { id: 'sales', label: 'Sales teams' },
  { id: 'creator', label: 'Course creators and training firms' },
  { id: 'academic', label: 'Schools and universities' },
]

export interface Cost {
  /** Year-one list price in USD, before VAT. null = quote only. */
  annual: number | null
  note: string
}

export interface UaeLms {
  id: string
  name: string
  segments: Segment[]
  billing: string
  stated: string
  priceUrl: string
  /** Where the vendor says data is hosted. */
  hosting: string
  hostingUrl?: string
  /** UAE PDPL, DIFC or ADGM statement on the vendor's pages. */
  law: string
  lawUrl?: string
  arabic: string
  arabicUrl?: string
  /** UAE office or legal entity, as listed by the vendor. */
  office: string
  officeUrl?: string
  bestFor: string
  cost: (learners: number) => Cost
  ours?: boolean
  /** True only when an opened vendor page names a UAE hosting region. */
  hostsInUae?: boolean
  /** True when the vendor lists a UAE office or entity. */
  uaeOffice?: boolean
  /** Arabic interface stated (not just Arabic course content). */
  arabicUi?: boolean
}

const quote = (note = 'Not published: quote only'): Cost => ({ annual: null, note })
const r2 = (n: number) => Math.round(n * 100) / 100

export const PLATFORMS: UaeLms[] = [
  {
    id: 'talentlms',
    name: 'TalentLMS',
    segments: ['corporate'],
    billing: 'USD',
    stated:
      'Free up to 5 users; Core $119/month (up to 100 users); Grow $229/month (up to 500); Pro $449/month (1–100 users) + $6 per extra user; Enterprise from 1,000 users, no price; yearly billing saves 20%',
    priceUrl: 'https://www.talentlms.com/prices/aff:eli',
    hosting: 'USA (AWS N. Virginia)',
    hostingUrl: 'https://www.talentlms.com/subprocessors',
    law: 'Not stated (GDPR and ISO 27001 only)',
    arabic: 'Arabic and RTL fixes in 2022 release notes; full Arabic interface not stated',
    arabicUrl: 'https://help.talentlms.com/hc/en-us/articles/5250535555356-Release-Notes-July-2022',
    office: 'Not stated',
    bestFor: 'Small teams that want a free start and a published price up to 500 users',
    cost: (n) =>
      n <= 5
        ? { annual: 0, note: 'Free plan, up to 5 users' }
        : n <= 100
          ? { annual: 119 * 12, note: 'Core, up to 100 users, $119 × 12 (monthly billing)' }
          : n <= 500
            ? { annual: 229 * 12, note: 'Grow, up to 500 users, $229 × 12 (monthly billing)' }
            : quote('Over 500 users: Pro or Enterprise, priced per user or by quote'),
  },
  {
    id: 'ispring',
    name: 'iSpring LMS',
    segments: ['corporate'],
    billing: 'USD',
    stated:
      'Business, 100 users: $6.91 per user/month, $8,286 a year, active users only; over 100 users: custom quote',
    priceUrl: 'https://www.ispring.com/pricing',
    hosting: 'Not stated',
    law: 'Not stated',
    arabic: 'Not stated',
    office: 'Not stated',
    bestFor: 'Teams of about 100 that want to pay only for monthly active users',
    cost: (n) =>
      n <= 100
        ? { annual: 8286, note: 'Business, 100-user tier (the only one published)' }
        : quote('Over 100 users: custom quote'),
  },
  {
    id: '360learning',
    name: '360Learning',
    segments: ['corporate', 'sales'],
    billing: 'USD',
    stated:
      'Team $8 per user/month, up to 100 users, billed monthly, active users only; Business and Enterprise custom',
    priceUrl: 'https://360learning.com/pricing/',
    hosting: 'Not stated',
    law: 'Not stated',
    arabic:
      'AI translation into Arabic and RTL languages; Arabic not in the interface language list',
    arabicUrl: 'https://360learning.com/solution/globalization/',
    office: 'Not stated',
    bestFor: 'Teams under 100 that want AI authoring and Arabic course translation',
    cost: (n) =>
      n <= 100
        ? { annual: 8 * n * 12, note: `Team plan: $8 × ${n} users × 12` }
        : quote('Over 100 users: Business plan, custom price'),
  },
  {
    id: 'disprz',
    name: 'Disprz',
    segments: ['corporate', 'sales'],
    billing: 'USD',
    stated: 'Essentials "starts at $2 per learner / month"; Enterprise custom',
    priceUrl: 'https://disprz.ai/pricing',
    hosting: '"Multi region deployments"; no UAE region named',
    hostingUrl: 'https://disprz.ai/pricing',
    law: 'PDPL alignment claimed in its own blog; privacy policy does not mention PDPL',
    lawUrl: 'https://disprz.ai/blog/best-lms-platform-uae',
    arabic: 'Arabic with RTL claimed in its own blog',
    arabicUrl: 'https://disprz.ai/blog/best-lms-platform-uae',
    office: 'Dubai (Jebel Ali), Middle East regional HQ',
    officeUrl: 'https://disprz.ai/contact-us',
    uaeOffice: true,
    bestFor: 'Enterprises that want a vendor with a Dubai office and a per-learner price',
    cost: (n) => ({
      annual: r2(2 * n * 12),
      note: `From: Essentials $2 × ${n} learners × 12 (starting price)`,
    }),
  },
  {
    id: 'docebo',
    name: 'Docebo',
    segments: ['corporate', 'sales'],
    billing: 'Not stated',
    stated: 'No price; quote based on active users',
    priceUrl: 'https://www.docebo.com/pricing/',
    hosting: 'Not stated on public pages (trust centre is gated)',
    law: 'Not stated (privacy policy has no UAE mention)',
    lawUrl: 'https://www.docebo.com/company/privacy-policy/',
    arabic: 'Right-to-left language setting exists; Arabic not named on pages opened',
    arabicUrl:
      'https://help.docebo.com/hc/en-us/articles/360020084500-Managing-the-localization-tool-and-platform-languages',
    office: 'Docebo EMEA FZ-LLC, Dubai',
    officeUrl: 'https://www.docebo.com/contact/',
    uaeOffice: true,
    bestFor: 'Large companies that want a vendor with a Dubai entity',
    cost: () => quote(),
  },
  {
    id: 'paradiso',
    name: 'Paradiso LMS',
    segments: ['corporate', 'creator'],
    billing: 'Not stated',
    stated:
      'Cost calculator shows "$6,000 per month" for 100 users next to a "FREE" label, unexplained; other sizes by quote',
    priceUrl: 'https://www.paradisosolutions.com/lms-cost-calculator',
    hosting: '"Regional data residency options"; no country named',
    hostingUrl: 'https://www.paradisosolutions.com/arabic-lms',
    law: 'Not stated (GDPR, HIPAA, SOC, ISO named)',
    arabic: '"A native right-to-left interface"; course prices in AED',
    arabicUrl: 'https://www.paradisosolutions.com/arabic-lms',
    office: 'Not stated',
    arabicUi: true,
    bestFor: 'Training firms that want an Arabic-first interface and AED course pricing',
    cost: () => quote('Calculator figure unclear: ask for a written quote'),
  },
  {
    id: 'learnupon',
    name: 'LearnUpon',
    segments: ['corporate'],
    billing: 'Not stated',
    stated: 'No price; employee plans "from 100 users", customer education "from 300 users"',
    priceUrl: 'https://www.learnupon.com/pricing/',
    hosting: 'EU, USA or Australia',
    hostingUrl: 'https://www.learnupon.com/security/',
    law: 'Not stated',
    arabic: 'Not stated',
    office: 'Not stated',
    bestFor: 'Training employees, customers and partners on one platform',
    cost: () => quote(),
  },
  {
    id: 'adobe',
    name: 'Adobe Learning Manager',
    segments: ['corporate'],
    billing: 'Not stated',
    stated: 'Prime and Ultimate: no price, "Get pricing"; advanced AI billed by credits',
    priceUrl: 'https://business.adobe.com/products/learning-manager/pricing.html',
    hosting: 'AWS Virginia, Frankfurt or Mumbai',
    hostingUrl:
      'https://experienceleague.adobe.com/docs/learning-manager/assets/alm-security-whitepaper-2024.pdf?lang=en',
    law: 'Not stated',
    arabic: 'Not stated',
    office: 'Not stated',
    bestFor: 'Companies already on Adobe tools; Mumbai is the nearest region',
    cost: () => quote(),
  },
  {
    id: 'cornerstone',
    name: 'Cornerstone',
    segments: ['corporate'],
    billing: 'Not stated',
    stated: 'No price: "Each organization will have a different cost"',
    priceUrl: 'https://www.cornerstoneondemand.com/platform/learning-management-lms/',
    hosting: 'Not stated on pages we could open',
    law: 'Not stated on pages we could open',
    arabic: '"50 different languages"; Arabic not named',
    arabicUrl: 'https://www.cornerstoneondemand.com/platform/learning-management-lms/',
    office: 'Not stated on pages we could open',
    bestFor: 'Large enterprises that need many languages and an HR suite',
    cost: () => quote(),
  },
  {
    id: 'mindtickle',
    name: 'Mindtickle',
    segments: ['sales'],
    billing: 'Not stated',
    stated: 'No public price; book a demo',
    priceUrl: 'https://www.mindtickle.com/legal/description-of-subscription-services/',
    hosting: 'AWS USA, Ireland, Singapore or Japan',
    hostingUrl: 'https://www.mindtickle.com/privacy/subprocessors/',
    law: 'Not stated',
    arabic: 'Role plays in "25+ languages"; Arabic not named',
    arabicUrl: 'https://www.mindtickle.com/platform/ai-sales-role-play/',
    office: 'Not stated',
    bestFor: 'Sales enablement with certification and AI role plays',
    cost: () => quote(),
  },
  {
    id: 'absorb',
    name: 'Absorb LMS',
    segments: ['corporate'],
    billing: 'Not stated',
    stated: 'Pricing page redirects to a form; no price',
    priceUrl: 'https://www.absorblms.com/pricing/',
    hosting: 'Not stated',
    law: 'Not stated',
    arabic: 'Arabic listed as an interface language code; RTL not mentioned',
    arabicUrl:
      'https://support.absorblms.com/hc/en-us/articles/115000502428-Language-Codes-for-Absorb',
    office: 'Not stated',
    bestFor: 'Mid-size and large companies that want an Arabic language option',
    cost: () => quote(),
  },
  {
    id: 'classera',
    name: 'Classera',
    segments: ['academic', 'corporate'],
    billing: 'Not stated',
    stated: 'Price page blocked from our network; no public price we could read',
    priceUrl: 'https://pricing.classera.com/',
    hosting: 'Not stated',
    law: 'Not stated',
    arabic: 'Full Arabic product site and Arabic option',
    arabicUrl: 'https://classera.com/ar/products/classera-lms/',
    office: 'Dubai (Al Fahidi)',
    officeUrl: 'https://www.classera.com/en/contact_us/',
    uaeOffice: true,
    arabicUi: true,
    bestFor: 'Schools, universities and ministries in Arabic-speaking markets',
    cost: () => quote(),
  },
  {
    id: 'lumofy',
    name: 'Lumofy',
    segments: ['corporate'],
    billing: 'Not stated',
    stated: 'No public price; contact sales',
    priceUrl: 'https://lumofy.ai/en/contact',
    hosting: '"Servers may be located outside of your region"; no region named',
    hostingUrl: 'https://lumofy.ai/en/privacy',
    law: 'Names Bahrain and Saudi regulators; UAE PDPL not stated',
    lawUrl: 'https://lumofy.ai/en/privacy',
    arabic: 'Arabic site option',
    arabicUrl: 'https://lumofy.ai/en/contact',
    office: 'Bahrain and Riyadh; no UAE office listed',
    officeUrl: 'https://lumofy.ai/en/contact',
    bestFor: 'GCC groups that want a Gulf-based skills and learning vendor',
    cost: () => quote(),
  },
  {
    id: 'moodlecloud',
    name: 'MoodleCloud',
    segments: ['academic', 'creator', 'corporate'],
    billing: 'Shown in USD, billed in AUD',
    stated:
      'Per year: Starter $160 (50 users); Mini $270 (100); Small $490 (200); Medium $1,180 (500); Standard $2,070 (750)',
    priceUrl: 'https://www.moodlecloud.com/standard-plans/',
    hosting: 'Australia, Europe and the USA',
    hostingUrl: 'https://www.moodlecloud.com/product-specifications/',
    law: 'Not stated',
    arabic: 'Not stated on MoodleCloud pages',
    office: 'None; Dubai Moodle partners below',
    bestFor: 'Small institutes that want open-source Moodle without running servers',
    cost: (n) => {
      const bands: [number, number, string][] = [
        [50, 160, 'Starter'],
        [100, 270, 'Mini'],
        [200, 490, 'Small'],
        [500, 1180, 'Medium'],
        [750, 2070, 'Standard'],
      ]
      const b = bands.find(([cap]) => n <= cap)
      return b
        ? { annual: b[1], note: `${b[2]}, up to ${b[0]} users, per year (billed in AUD)` }
        : quote('Over 750 users: a Moodle partner or self-hosting, custom price')
    },
  },
  {
    id: 'moodle-partner',
    name: 'Moodle via a Dubai partner',
    segments: ['academic', 'corporate'],
    billing: 'Not stated',
    stated: 'No public price (Human Logic Software UAE and Eummena UAE are listed Moodle partners)',
    priceUrl: 'https://moodle.com/partners/human-logic-software-uae/',
    hosting: 'Partner hosting offered; location not stated',
    hostingUrl: 'https://moodle.com/partners/eummena-uae/',
    law: 'Not stated (Eummena lists ISO 27001)',
    arabic: 'Moodle supports Arabic; partner pages do not describe it',
    office: 'Dubai (both partners)',
    officeUrl: 'https://moodle.com/partners/human-logic-software-uae/',
    uaeOffice: true,
    bestFor: 'Universities and companies that want Moodle with local setup and support',
    cost: () => quote(),
  },
  {
    id: 'thinkific',
    name: 'Thinkific',
    segments: ['creator'],
    billing: 'USD',
    stated:
      'Start $109/month or $82/month billed annually; Grow $219 or $164; Expand $499 or $374; Plus custom; Thinkific Payments fee 2.9%',
    priceUrl: 'https://www.thinkific.com/pricing/',
    hosting: 'Not stated',
    law: 'Not stated',
    arabic: 'Arabic course content allowed; site language settings do not support it',
    arabicUrl:
      'https://support.thinkific.com/hc/en-us/articles/360035031914-Does-Thinkific-support-Arabic-and-Hebrew',
    office: 'Not stated',
    bestFor: 'Training firms and coaches who sell courses online',
    cost: () => ({ annual: 82 * 12, note: 'Start, $82 × 12 billed annually' }),
  },
  {
    id: 'teachable',
    name: 'Teachable',
    segments: ['creator'],
    billing: 'USD',
    stated:
      'Starter $39/month or $29/month billed yearly (7.5% transaction fee); Builder $89 or $69; Growth $189 or $139',
    priceUrl: 'https://www.teachable.com/pricing',
    hosting: 'Not stated',
    law: 'Not stated',
    arabic: 'Arabic for students; RTL only on newer student pages, admin stays left-to-right',
    arabicUrl: 'https://support.teachable.com/en/articles/11682512-how-do-i-translate-my-school',
    office: 'Not stated',
    bestFor: 'Solo trainers who want the cheapest start',
    cost: () => ({
      annual: 29 * 12,
      note: 'Starter, $29 × 12 billed yearly, plus 7.5% of each sale',
    }),
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
    law: 'Not stated',
    arabic: 'Not stated',
    office: 'Not stated',
    bestFor: 'Adding spoken practice (sales calls, interviews, hard conversations) to any LMS',
    ours: true,
    cost: (n) => {
      const t = practiceCost(n, PRACTICE_MIN)
      return t
        ? {
            annual: r2(t.monthly * 12),
            note: `${t.plan.name} plan (${t.plan.seats} seats), ${PRACTICE_MIN} practice min per learner a month`,
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
    uaeHosting: lms.filter((p) => p.hostsInUae).length,
    uaeOffice: lms.filter((p) => p.uaeOffice).length,
    arabicUi: lms.filter((p) => p.arabicUi).length,
  }
})()

export type Buyer = 'registered' | 'not-registered'

export interface CostRow {
  id: string
  name: string
  ours?: boolean
  note: string
  listAed: number | null
  vatAed: number | null
  /** What the buyer is out of pocket after recovering VAT, if it can. */
  netAed: number | null
}

const r0 = (n: number) => Math.round(n)

export function costRows(learners: number, buyer: Buyer, fx = USD_AED): CostRow[] {
  return PLATFORMS.map((p) => {
    const c = p.cost(learners)
    const listAed = c.annual === null ? null : r0(c.annual * fx)
    const vatAed = listAed === null ? null : r0(listAed * VAT_RATE)
    const netAed =
      listAed === null || vatAed === null
        ? null
        : buyer === 'registered'
          ? listAed
          : listAed + vatAed
    return { id: p.id, name: p.name, ours: p.ours, note: c.note, listAed, vatAed, netAed }
  })
}

export const formatAed = (n: number) =>
  `AED ${n.toLocaleString('en-US', { maximumFractionDigits: 0 })}`

/** Which data-protection law applies, by where the company is set up. */
export type Zone = 'mainland' | 'difc' | 'adgm' | 'health'

export interface ZoneRule {
  id: Zone
  label: string
  law: string
  lawUrl: string
  fee: string
  feeUrl?: string
  transfer: string
  ask: string
}

export const ZONES: ZoneRule[] = [
  {
    id: 'mainland',
    label: 'Mainland or another free zone',
    law: 'UAE PDPL (Federal Decree-Law No. 45 of 2021), in force since 2 January 2022. Companies get up to six months to comply after the Executive Regulations are issued; as of our check they had not been published.',
    lawUrl: 'https://uaelegislation.gov.ae/en/legislations/1972/download',
    fee: 'No registration fee in the law.',
    transfer:
      'Data may leave the UAE to countries approved as adequate (Art. 22), or with other bases such as the person’s explicit consent (Art. 23). Employment-law duties are a listed exception to consent (Art. 4).',
    ask: 'Ask the vendor which country hosts your learner data and on which Art. 22 or 23 basis it leaves the UAE.',
  },
  {
    id: 'difc',
    label: 'DIFC (Dubai International Financial Centre)',
    law: 'DIFC Data Protection Law No. 5 of 2020, not the federal PDPL.',
    lawUrl:
      'https://www.difc.com/business/registrars-and-commissioners/commissioner-of-data-protection/notifications',
    fee: 'Notify the Commissioner of Data Protection: USD 750 at first and USD 250 a year for a firm not regulated by the DFSA (USD 1,250 / 500 if DFSA-regulated; USD 250 / 100 for retail).',
    feeUrl:
      'https://www.difc.com/business/registrars-and-commissioners/commissioner-of-data-protection/forms-fees',
    transfer:
      'Transfers out of DIFC need an adequate country or safeguards such as the Commissioner’s standard clauses.',
    ask: 'Ask the vendor to sign DIFC standard data protection clauses if data is hosted outside an adequate country.',
  },
  {
    id: 'adgm',
    label: 'ADGM (Abu Dhabi Global Market)',
    law: 'ADGM Data Protection Regulations 2021, not the federal PDPL.',
    lawUrl: 'https://adgm.com/operating-in-adgm/office-of-data-protection/fee-sections',
    fee: 'Register with the Office of Data Protection: USD 300 at first and USD 300 each year (all firm categories).',
    feeUrl: 'https://adgm.com/operating-in-adgm/office-of-data-protection/fee-sections',
    transfer:
      'Personal data should not leave ADGM without safeguards: an adequate country, ADGM standard contractual clauses or binding corporate rules.',
    ask: 'Ask the vendor for ADGM standard contractual clauses and its sub-processor list.',
  },
  {
    id: 'health',
    label: 'Healthcare (patient data)',
    law: 'Federal Law No. 2 of 2019 on health data, which PDPL leaves to its own rules.',
    lawUrl:
      'https://elaws.moj.gov.ae/UAE-MOJ_LC-En/00_Health/UAE-LC-En_2019-02-06_00002_Kait.html?val=EL1',
    fee: 'No registration fee for this point.',
    transfer:
      'Health data from services in the UAE may not be stored or processed outside the State except in defined cases (Art. 13).',
    ask: 'Keep patient data out of the LMS, or pick a vendor that hosts inside the UAE in writing.',
  },
]
