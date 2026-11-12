/**
 * Sales training companies in India, 2026: one source of truth for the company finder, the
 * charts, the price table and the worked cost example in
 * /blog/best-sales-training-companies-india.
 *
 * Every company fact was read on the company's own pages on 12 Nov 2026 (URLs per row).
 * Anything not stated on an opened page is left out or written as "Not stated". This is not a
 * ranking: companies are grouped by what you buy from them. Tough Tongue AI, which runs this
 * site, is marked "our product".
 *
 * Not listed: Sandler (its location finder lists no India office); Mercuri International (its
 * India page did not open for us). The Knowledge Academy is listed for its published
 * public-course prices.
 *
 * Tax, research and official sources (opened 12 Nov 2026):
 * - SAC 999293 "Commercial training and coaching services": https://gstcouncil.gov.in/sites/default/files/2024-05/notification11-cgst-annexure.pdf
 * - Education services 18%: https://www.gstcouncil.gov.in/sites/default/files/e-version-gst-flyers/GST_Education_Services.pdf
 * - Exemption for NSDC scheme training partners, Notification 12/2017 Sl. 69: https://gstcouncil.gov.in/sites/default/files/2024-02/12-exemption_cgst-01.04.2019-revised.pdf
 * - GST 2.0 FAQ (effective 22 Sep 2025, no training entry): https://gstcouncil.gov.in/sites/default/files/2025-09/faq.pdf
 * - Reverse charge on imported services: https://cbic-gst.gov.in/pdf/e-version-gst-fliers/reverse-charge-mechanism-08aug2017.pdf
 * - PLFS 2023-24 Table 25 (sales workers 8.30%): https://mospi.gov.in/sites/default/files/publication_reports/AnnualReport_PLFS2023-24L.pdf
 * - Ebbinghaus 1885 savings, via Murre & Dros 2015 Table 3: https://pmc.ncbi.nlm.nih.gov/articles/PMC4492928
 * - NQR qualifications: https://www.nqr.gov.in/qualification/file/Retail%20Sales%20Associate
 */
import { USD_INR, USD_INR_DATE, FX_URL } from './indiaLmsData'

export const CHECKED = '12 Nov 2026'
export const GST_RATE = 0.18
export { USD_INR, USD_INR_DATE, FX_URL }

export type Kind = 'trainer' | 'mixed' | 'platform' | 'practice'

export const KINDS: { id: Kind; label: string; short: string }[] = [
  {
    id: 'trainer',
    label: 'Trainer-led firms (workshops, classroom or live online)',
    short: 'Trainer-led',
  },
  { id: 'mixed', label: 'Trainer-led plus their own online courses or platform', short: 'Mixed' },
  {
    id: 'platform',
    label: 'Sales enablement software (content, quizzes, coaching)',
    short: 'Enablement software',
  },
  {
    id: 'practice',
    label: 'AI roleplay practice (reps talk to an AI buyer)',
    short: 'AI roleplay practice',
  },
]

export type PriceStatus = 'current' | 'partial' | 'old' | 'quote'

export interface Trainer {
  id: string
  name: string
  url: string
  kind: Kind
  /** Cities named on the company's own pages, and what kind of mention it is. */
  cities: string[]
  cityBasis: string
  online: boolean
  /** Formats as the company names them. */
  formats: string
  /** Sales programmes or products, as named. */
  offers: string
  /** Languages as stated; '' = not stated. */
  languages: string
  hindi: boolean
  price: string
  priceStatus: PriceStatus
  priceUrl?: string
  /** One plain line: who it suits, from what the company says it does. */
  fit: string
  ours?: boolean
}

export const TRAINERS: Trainer[] = [
  {
    id: 'dale-carnegie',
    name: 'Dale Carnegie India',
    url: 'https://dalecarnegie.com/en-gb/locations/india',
    kind: 'trainer',
    cities: ['Mumbai'],
    cityBasis: 'office address (Ballard Estate)',
    online: true,
    formats: 'In-person and live online',
    offers: 'Winning With Relationships Selling; Developing Sales Talent; custom sales programmes',
    languages: '29 languages worldwide (global page; India not stated)',
    hindi: false,
    price:
      '₹29,500 for the 3-day relationship-selling course (a May 2020 Gurgaon batch; no current India fee shown)',
    priceStatus: 'old',
    priceUrl: 'https://www.dalecarnegie.com/en-gb/courses/3949/25386',
    fit: 'Managers and senior reps who want a known, classroom-style programme',
  },
  {
    id: 'korn-ferry',
    name: 'Korn Ferry (Miller Heiman)',
    url: 'https://www.kornferry.com/capabilities/leadership-professional-development/training-certification/sales',
    kind: 'trainer',
    cities: ['Bengaluru', 'Mumbai', 'Gurugram', 'Pune'],
    cityBasis: 'Korn Ferry offices in India (pages do not say sales training is run from them)',
    online: false,
    formats: 'Not stated ("multiple modalities")',
    offers:
      'Strategic Selling, Conceptual Selling, Large Account Management Process (LAMP), Professional Selling Skills',
    languages: '',
    hindi: false,
    price: 'Quote only',
    priceStatus: 'quote',
    fit: 'Enterprise account teams that want a named methodology across countries',
  },
  {
    id: 'byld',
    name: 'BYLD Group',
    url: 'https://byldgroup.com/',
    kind: 'trainer',
    cities: ['Gurugram'],
    cityBasis: 'head office',
    online: true,
    formats: 'Workshops, live webinars, business simulations, coaching, an LMS',
    offers:
      'Licensed programmes (Everything DiSC, SLII, Crucial Learning); no sales programme named on the home page',
    languages: '',
    hindi: false,
    price: 'Quote only',
    priceStatus: 'quote',
    fit: 'Companies buying sales skills as part of a wider leadership and behaviour programme',
  },
  {
    id: 'edstellar',
    name: 'Edstellar',
    url: 'https://www.edstellar.com/category/sales-training',
    kind: 'trainer',
    cities: ['Bengaluru'],
    cityBasis: 'head office',
    online: true,
    formats: 'Instructor-led virtual, onsite, blended',
    offers: 'Consultative selling, closing, objection handling, key account, prospecting courses',
    languages: '10+ languages including Hindi (sales training page)',
    hindi: true,
    price:
      'Packages of trainee licences (1 licence = 1 trainee for one 8-hour day); amounts on enquiry; onsite is +30%',
    priceStatus: 'partial',
    priceUrl: 'https://edstellar.com/corporate-training-pricing',
    fit: 'HR and L&D teams that want a catalogue of trainers and courses under one contract',
  },
  {
    id: 'pinvista',
    name: 'Pinvista (Anmol Dhamija)',
    url: 'https://anmoldhamija.com/',
    kind: 'trainer',
    cities: [],
    cityBasis: '"Pan-India & Online"',
    online: true,
    formats: 'Hybrid, live and online',
    offers: 'Sales closing, objection handling, negotiation, follow-up ("10X Sales Blueprint")',
    languages: 'Hindi and English (on one version of its page)',
    hindi: true,
    price:
      '₹1,00,000–₹5,00,000+ per programme, by team size (on a list the company publishes about itself)',
    priceStatus: 'current',
    priceUrl: 'https://anmoldhamija.com/best-sales-training-companies-in-india/',
    fit: 'Owner-led and SME sales teams that want a trainer who says he delivers in Hindi and English',
  },
  {
    id: 'yatharth',
    name: 'Yatharth Marketing Solutions',
    url: 'https://www.yatharthmarketing.com/sales-training-programs.html',
    kind: 'trainer',
    cities: ['Bengaluru', 'Pune', 'Mumbai', 'Ahmedabad', 'Chennai', 'Hyderabad'],
    cityBasis: 'cities it says it trains in',
    online: true,
    formats: '1- to 4-day programmes; online sessions for individuals',
    offers: 'Gold to Rhodium tiers (8 to 32 hours), telecaller training, objection handling',
    languages: '',
    hindi: false,
    price:
      'Base fee not shown; each extra person adds 2,000 (1 day) down to 500 (4 days), no currency stated',
    priceStatus: 'partial',
    priceUrl: 'https://www.yatharthmarketing.com/sales-training-programs.html',
    fit: 'Telecalling and field teams that want a short, fixed-format workshop',
  },
  {
    id: 'ripples',
    name: 'Ripples Learning',
    url: 'https://rippleslearning.com',
    kind: 'trainer',
    cities: ['Bengaluru'],
    cityBasis: 'city it names for its sales training',
    online: true,
    formats: 'Classroom, live and self-paced, workshops, blended',
    offers: 'Sales training (SPIN selling, negotiation); sales and marketing certification',
    languages: '',
    hindi: false,
    price: 'Quote only',
    priceStatus: 'quote',
    fit: 'Bengaluru teams that want a SPIN-based workshop',
  },
  {
    id: 'yellow-spot',
    name: 'The Yellow Spot',
    url: 'https://theyellowspot.com/',
    kind: 'trainer',
    cities: ['Mumbai'],
    cityBasis: 'office address (Andheri West)',
    online: true,
    formats: 'Classroom, virtual instructor-led, learning journeys, microlearning',
    offers: 'Sales Effectiveness Training and a multi-month Sales Effectiveness Journey',
    languages: '',
    hindi: false,
    price: 'Quote only',
    priceStatus: 'quote',
    fit: 'Teams that want a designed journey over months rather than one workshop',
  },
  {
    id: 'tka',
    name: 'The Knowledge Academy',
    url: 'https://www.theknowledgeacademy.com/in/courses/sales-training/online-sales-training/',
    kind: 'trainer',
    cities: [],
    cityBasis: 'online course pages for 12 cities; no office named',
    online: true,
    formats: 'Online instructor-led public courses; onsite on quote',
    offers: 'Online sales, telephone sales, objection handling, negotiation (1-day courses)',
    languages: '',
    hindi: false,
    price:
      '₹1,54,995 for a 1-day online instructor-led course, GST extra (18%); page does not say per person',
    priceStatus: 'current',
    priceUrl:
      'https://www.theknowledgeacademy.com/in/courses/sales-training/online-sales-training/',
    fit: 'One person who needs a certificate on a fixed date',
  },
  {
    id: 'niit',
    name: 'NIIT (Sales and Service Excellence)',
    url: 'https://www.niit.com/india/sales-and-service-excellence/about',
    kind: 'mixed',
    cities: [],
    cityBasis: 'not stated on the page we could open',
    online: true,
    formats: '"Curated learning journeys" and digital learning tools',
    offers: 'Sales, service capability, soft skills, GenAI for productivity',
    languages: '',
    hindi: false,
    price: 'Quote only',
    priceStatus: 'quote',
    fit: 'Large sales and service workforces (BFSI, retail) that want an outsourced academy',
  },
  {
    id: 'centum',
    name: 'Centum Learning',
    url: 'https://www.centumlearning.com/sales-training',
    kind: 'mixed',
    cities: [],
    cityBasis: 'not stated on the pages we could open',
    online: true,
    formats: 'Classroom, virtual, digital, coaching; an AI-based sales simulator',
    offers: 'Sales Excellence Program; Sales & Service Academy',
    languages: '"Conducted in the appropriate language" (none listed)',
    hindi: false,
    price: 'Quote only',
    priceStatus: 'quote',
    fit: 'Field and channel sales forces spread across many towns',
  },
  {
    id: 'henry-harvin',
    name: 'Henry Harvin',
    url: 'https://www.henryharvin.com/sales-executive-course',
    kind: 'mixed',
    cities: [],
    cityBasis: 'online',
    online: true,
    formats: 'Live online sessions plus self-paced e-learning',
    offers:
      'Certified Sales Professional (24 h live), Sales Management (50 h), 6-month PG programme',
    languages: '',
    hindi: false,
    price: 'Not shown on the course pages we opened',
    priceStatus: 'quote',
    fit: 'Individuals who want a certificate course they pay for themselves',
  },
  {
    id: 'sharpsell',
    name: 'Sharpsell.ai',
    url: 'https://www.sharpsell.ai/',
    kind: 'platform',
    cities: ['Mumbai', 'Bengaluru'],
    cityBasis: 'offices in the site footer',
    online: true,
    formats: 'Software: sales CRM, AI coach, enablement content, AI roleplay agent',
    offers: 'AI Enablement, AI Coach, Just-in-Time Roleplay (an agent), Sharpsell One',
    languages: 'Hindi, English, Hinglish; 11 languages for voice updates',
    hindi: true,
    price: 'Quote only (demo)',
    priceStatus: 'quote',
    fit: 'Insurance, banking and consumer brands with large field and agent networks',
  },
  {
    id: 'mindtickle',
    name: 'Mindtickle',
    url: 'https://www.mindtickle.com/',
    kind: 'platform',
    cities: ['Pune', 'Bengaluru'],
    cityBasis: 'offices (both labelled APAC HQ); North America HQ in San Francisco',
    online: true,
    formats: 'Software: training, coaching, AI role play, call recording',
    offers: 'Sales Training, AI Role Play, Coaching, Readiness Index, Call AI',
    languages: '',
    hindi: false,
    price: 'Quote only (demo)',
    priceStatus: 'quote',
    fit: 'B2B software and pharma teams that want training, coaching and call review in one tool',
  },
  {
    id: 'smartwinnr',
    name: 'SmartWinnr',
    url: 'https://www.smartwinnr.com',
    kind: 'platform',
    cities: [],
    cityBasis: 'head office in Jersey City, USA; no India office named',
    online: true,
    formats: 'Mobile app and web: quizzes, gamification, field coaching, AI roleplay',
    offers: 'AI Roleplay, Targeted Learning, Gamification, Field Coaching',
    languages: '"30+" and "32+" (both on its home page), including Indian languages',
    hindi: true,
    price: 'Quote only',
    priceStatus: 'quote',
    fit: 'Pharma and medical-device field teams',
  },
  {
    id: 'awarathon',
    name: 'Awarathon',
    url: 'https://www.awarathon.com/simulation',
    kind: 'practice',
    cities: ['Mumbai', 'Ahmedabad'],
    cityBasis: 'contact page',
    online: true,
    formats: 'Web: AI roleplay simulations with feedback reports; AI voice calling agent',
    offers: 'Simulations, roleplays and quizzes, personalised AI coaching, skill audit',
    languages: '22+ languages, including Hindi',
    hindi: true,
    price: 'Quote only (free start offered)',
    priceStatus: 'quote',
    fit: 'Pharma and BFSI teams that want scored practice in Indian languages',
  },
  {
    id: 'tough-tongue-ai',
    name: 'Tough Tongue AI',
    url: 'https://www.toughtongueai.com/?utm_source=autointerviewai&utm_medium=blog&utm_campaign=best-sales-training-companies-india',
    kind: 'practice',
    cities: [],
    cityBasis: 'online',
    online: true,
    formats: 'Voice roleplay on web, phone, Google Meet and Zoom; scored against a rubric',
    offers:
      'AI roleplay for sales calls, objections and negotiation; AI voice agents for sales calls',
    languages: '',
    hindi: false,
    price:
      'Free 25 minutes; $20/month (150 min); Business $299/month (15 seats, 2,990 min); Growth $499/month (25 seats, 6,000 min); prices in US dollars',
    priceStatus: 'current',
    priceUrl: 'https://www.toughtongueai.com/pricing/',
    fit: 'Teams that want reps to practise calls daily between workshops, with a record of every session',
    ours: true,
  },
]

/* ---------- Counts used in prose, charts and KeyFacts (never typed by hand) ---------- */

export const COUNT = TRAINERS.length
export const KIND_COUNTS = KINDS.map((k) => ({
  ...k,
  n: TRAINERS.filter((t) => t.kind === k.id).length,
}))
export const PRICE_CURRENT = TRAINERS.filter((t) => t.priceStatus === 'current').length
export const PRICE_ANY = TRAINERS.filter((t) => t.priceStatus !== 'quote').length
export const PRICE_QUOTE = COUNT - PRICE_ANY
export const HINDI = TRAINERS.filter((t) => t.hindi).length

const cityTally = new Map<string, number>()
for (const t of TRAINERS) for (const c of t.cities) cityTally.set(c, (cityTally.get(c) ?? 0) + 1)
export const CITY_COUNTS = [...cityTally.entries()]
  .map(([city, n]) => ({ city, n }))
  .sort((a, b) => b.n - a.n || a.city.localeCompare(b.city))
export const CITIES = CITY_COUNTS.map((c) => c.city)
export const NO_CITY = TRAINERS.filter((t) => t.cities.length === 0).length

/* ---------- Worked example: 20 reps, one quarter, published prices, 18% GST ---------- */

export const WORKED_REPS = 20

export const inr = (n: number) =>
  '₹' + Math.round(n).toLocaleString('en-IN', { maximumFractionDigits: 0 })

export interface WorkedRow {
  option: string
  basis: string
  beforeGst: number
  gst: number
  total: number
  perRep: number
  note: string
}

function row(option: string, basis: string, beforeGst: number, note: string): WorkedRow {
  const gst = beforeGst * GST_RATE
  return {
    option,
    basis,
    beforeGst,
    gst,
    total: beforeGst + gst,
    perRep: (beforeGst + gst) / WORKED_REPS,
    note,
  }
}

export const WORKED: WorkedRow[] = [
  row(
    'A trainer-led team programme (Pinvista, low end)',
    '₹1,00,000 per programme',
    100000,
    'The lowest figure in the published ₹1–5 lakh+ range; the top end is 5x this.'
  ),
  row(
    'AI roleplay practice (Tough Tongue AI Growth, our product)',
    `$499 × 3 months × ₹${USD_INR} (RBI rate, ${USD_INR_DATE})`,
    499 * 3 * USD_INR,
    'Covers up to 25 seats and 6,000 minutes a month (300 a month per rep for 20 reps). Priced in US dollars; we added 18% GST (paid by you under reverse charge if billed from outside India).'
  ),
  row(
    'Both: one workshop, then daily practice',
    'the two rows above',
    100000 + 499 * 3 * USD_INR,
    'The pattern most teams end up with: the method from a trainer, the repetitions from practice.'
  ),
]
