/**
 * Sales training platforms: one source for the tables, the cost figure, the calculator and the
 * counts in /blog/best-sales-training-platforms-2026. Every fact was read on the vendor's own page
 * (course libraries, programmes, suites and LMS on 18 Nov 2026; AI practice tools on 13 Nov 2026,
 * shared with data/salesRoleplayData.ts). Nothing comes from review sites or other lists.
 */

export const CHECKED = '18 Nov 2026'
export const PRACTICE_CHECKED = '13 Nov 2026'

export type Kind = 'library' | 'programme' | 'suite' | 'practice'

export const KIND_LABEL: Record<Kind, string> = {
  library: 'Course library',
  programme: 'Methodology programme',
  suite: 'Enablement suite or LMS',
  practice: 'AI practice tool',
}

export interface Platform {
  id: string
  name: string
  kind: Kind
  url: string
  trains: string
  price: string // as written on the vendor's page, shortened
  published: boolean // a paid price a buyer can read without a sales call
  free: string // free plan, free courses or trial, as written; '' when none was found
  roleplay: string // the vendor's own name for AI roleplay / practice, '' when none was named
  ours?: boolean
  /** Year-one list cost for `reps` people, or null when the price is not published. */
  year?: (reps: number) => { usd: number; basis: string } | null
}

const r2 = (n: number) => Math.round(n * 100) / 100

export const PLATFORMS: Platform[] = [
  /* ---------- Course libraries ---------- */
  {
    id: 'hubspot',
    name: 'HubSpot Academy',
    kind: 'library',
    url: 'https://academy.hubspot.com/courses/sales',
    trains: 'Inbound selling, sales management and sales enablement courses with certifications',
    price: 'Free',
    published: true,
    free: '"Completely free & online"',
    roleplay: '',
    year: () => ({ usd: 0, basis: 'Free courses and certifications' }),
  },
  {
    id: 'trailhead',
    name: 'Salesforce Trailhead',
    kind: 'library',
    url: 'https://trailhead.salesforce.com/',
    trains: 'Salesforce Sales Cloud and Agentforce skills (the product, not a selling method)',
    price: 'Free; instructor-led Trailhead Academy is paid (fee not shown)',
    published: true,
    free: '"Learn for free with hands-on training on Trailhead"',
    roleplay: '',
    year: () => ({ usd: 0, basis: 'Free self-paced trails' }),
  },
  {
    id: 'linkedin',
    name: 'LinkedIn Learning (Teams)',
    kind: 'library',
    url: 'https://learning.linkedin.com/products/linkedin-learning-for-teams',
    trains: 'A general library of 18,000+ courses; sales is one topic among many',
    price: '$379.88 per seat a year for 20 or fewer licences',
    published: true,
    free: 'Free trial offered (terms not shown on the page we opened)',
    roleplay: '',
    year: (reps) =>
      reps <= 20 ? { usd: r2(379.88 * reps), basis: `${reps} × $379.88 per seat a year` } : null,
  },
  {
    id: 'coursera',
    name: 'Coursera for Teams',
    kind: 'library',
    url: 'https://discover.coursera.org/coursera-for-teams-calc-b',
    trains: '12,000+ courses and 165+ Professional Certificates, including sales ones',
    price: 'From $399 per user for 12 months, billed annually',
    published: true,
    free: '14-day money-back guarantee',
    roleplay: '',
    year: (reps) => {
      if (reps > 499) return null
      const seats = Math.max(reps, 2)
      return { usd: 399 * seats, basis: `${seats} × $399 per user a year (2-licence minimum)` }
    },
  },
  {
    id: 'udemy',
    name: 'Udemy Business (Team)',
    kind: 'library',
    url: 'https://business.udemy.com/team/',
    trains: 'A general library for teams of 2–50, with topic assessments',
    price: 'Billed annually; the seat price is not on the page we could open',
    published: false,
    free: '"14-day free trial" (not available in India)',
    roleplay: '',
  },
  /* ---------- Methodology programmes ---------- */
  {
    id: 'wbd',
    name: 'Winning by Design',
    kind: 'programme',
    url: 'https://winningbydesign.arlo.co/w/us/schedule/page-2',
    trains: 'SPICED and Revenue Architecture, by role (SDR, AE, CS, managers)',
    price:
      'Live open courses $1,500 or $2,500 per person (four 2-hour sessions); self-paced Essentials $199.99',
    published: true,
    free: '"Intro to SPICED" micro course, free (about 1 hour)',
    roleplay: '',
    year: (reps) => ({
      usd: 1500 * reps,
      basis: `${reps} × $1,500 live course (the $2,500 courses cost more; self-paced is $199.99 each)`,
    }),
  },
  {
    id: 'sandler',
    name: 'Sandler',
    kind: 'programme',
    url: 'https://uk.sandler.com/online-sales-courses',
    trains: 'Prospecting, sales management and the Sandler selling system',
    price: 'Quote only, through a local Sandler training centre',
    published: false,
    free: '',
    roleplay: '',
  },
  {
    id: 'rain',
    name: 'RAIN Group',
    kind: 'programme',
    url: 'https://www.rainsalestraining.com/sales-training-programs/online-sales-training',
    trains: 'RAIN Selling: 11 online programmes; Total Access has 86 modules',
    price: 'Quote only ("Subscribe annually or multi-year")',
    published: false,
    free: '',
    roleplay: '',
  },
  {
    id: 'challenger',
    name: 'Challenger',
    kind: 'programme',
    url: 'https://challengerinc.com/courses/',
    trains: 'Challenger Selling, Coaching and Negotiation: 6 eLearning courses + 2 playbooks',
    price: 'Quote only',
    published: false,
    free: '',
    roleplay: '',
  },
  {
    id: 'corporatevisions',
    name: 'Corporate Visions',
    kind: 'programme',
    url: 'https://corporatevisions.com/',
    trains: 'Messaging, sales process and skills assessments',
    price: 'Quote only',
    published: false,
    free: '',
    roleplay: '',
  },
  {
    id: 'brooks',
    name: 'The Brooks Group',
    kind: 'programme',
    url: 'https://brooksgroup.com/sales-training/open-enrollment-training',
    trains: 'IMPACT Selling, sales leadership, account management; in person or on Zoom',
    price: 'Quote only (open-enrolment dates listed, no price)',
    published: false,
    free: '',
    roleplay: '',
  },
  /* ---------- Enablement suites and LMS ---------- */
  {
    id: 'talentlms',
    name: 'TalentLMS',
    kind: 'suite',
    url: 'https://www.talentlms.com/library/collection/sales-mastery/',
    trains: 'An LMS with a 42-course "Sales Mastery" collection and a practice space',
    price:
      'Free up to 5 users; Core from $119/month (1–40 users), Grow from $229, Pro $449 (+$6 per user over 100); larger brackets cost more; Enterprise from 1,000 users, quote',
    published: true,
    free: 'Free plan: up to 5 users, 10 courses, no time limit',
    roleplay: '"Learning Playground" and "AI Coach"',
    year: (reps) =>
      reps <= 5
        ? { usd: 0, basis: 'Free plan (up to 5 users)' }
        : reps <= 40
          ? { usd: 119 * 12, basis: 'Core $119 a month × 12 (the 1–40 user bracket)' }
          : null,
  },
  {
    id: 'mindtickle',
    name: 'Mindtickle',
    kind: 'suite',
    url: 'https://www.mindtickle.com/platform/ai-sales-role-play/',
    trains: 'Microlearning, assessments, certifications, coaching and call AI',
    price: 'Quote only ("depends on factors like company size and team structure")',
    published: false,
    free: 'Free roleplay demo, no self-serve free plan',
    roleplay: '"AI Role Play"',
  },
  {
    id: 'highspot',
    name: 'Highspot',
    kind: 'suite',
    url: 'https://www.highspot.com/product/sales-training-software/',
    trains: 'Lessons and courses, learning paths, certifications, manager scorecards',
    price: 'Quote only',
    published: false,
    free: '',
    roleplay: '"AI Role Play"',
  },
  {
    id: 'seismic',
    name: 'Seismic Learning (Lessonly)',
    kind: 'suite',
    url: 'https://seismic.com/lessonly/',
    trains: 'Online sales training courses, microlearning, coaching plans',
    price: 'Not published',
    published: false,
    free: '',
    roleplay: '"AI-powered role-plays" (no product name)',
  },
  {
    id: 'allego',
    name: 'Allego',
    kind: 'suite',
    url: 'https://www.allego.com/pricing/',
    trains: 'Onboarding, training, coaching, certification, conversation intelligence',
    price:
      'Per user per month, billed annually; "typical contract length is 3 years"; amounts not shown',
    published: false,
    free: '',
    roleplay:
      '"AI Role Play" (the page also says every AI capability is included; ask which applies)',
  },
  {
    id: 'showpad',
    name: 'Showpad',
    kind: 'suite',
    url: 'https://www.showpad.com/pricing',
    trains: 'Training library and courses, knowledge checks, certifications (Advanced plan)',
    price: 'Quote only, per user',
    published: false,
    free: '',
    roleplay: '"Roleplay AI" (Advanced and Expert plans)',
  },
  {
    id: 'docebo',
    name: 'Docebo',
    kind: 'suite',
    url: 'https://www.docebo.com/pricing/',
    trains: 'An LMS with courses, AI coaching and roleplay scorecards',
    price: 'Quote only ("tailored to your organization")',
    published: false,
    free: '',
    roleplay: '"Docebo Roleplay"',
  },
  {
    id: 'bigtincan',
    name: 'Bigtincan (Brainshark)',
    kind: 'suite',
    url: 'https://www.bigtincan.com/readiness/',
    trains: 'Courses, quizzes, video assignments, readiness scorecards',
    price: 'Not published',
    published: false,
    free: '',
    roleplay: '"RolePlayAI"',
  },
  {
    id: 'smartwinnr',
    name: 'SmartWinnr',
    kind: 'suite',
    url: 'https://smartwinnr.com/',
    trains: 'Microlearning, gamification, field coaching forms',
    price: 'Not published',
    published: false,
    free: '',
    roleplay: '"AI Roleplays"',
  },
  {
    id: 'spekit',
    name: 'Spekit',
    kind: 'suite',
    url: 'https://www.spekit.com/pricing',
    trains: 'Just-in-time enablement with knowledge checks and learning paths',
    price: 'Quote only, per seat',
    published: false,
    free: '',
    roleplay: 'AI roleplay add-on (no product name)',
  },
  {
    id: 'trainual',
    name: 'Trainual',
    kind: 'suite',
    url: 'https://trainual.com/pricing',
    trains:
      'Playbooks, tests and a courses library add-on, for "companies with 25 - 1000 employees"',
    price: 'Quote only; "A one-time implementation fee of $1,000 applies"',
    published: false,
    free: '',
    roleplay: '',
  },
  {
    id: 'gong',
    name: 'Gong',
    kind: 'suite',
    url: 'https://www.gong.io/pricing',
    trains: 'Scores real calls; coaching playlists, training paths, skill certification',
    price: 'Quote only: per user plus a platform fee',
    published: false,
    free: '',
    roleplay: '"AI Trainer" (Gong Enable), roleplays built from real calls',
  },
  /* ---------- AI practice tools (checked 13 Nov; full list in the roleplay guide) ---------- */
  {
    id: 'toughtongue',
    name: 'Tough Tongue AI',
    kind: 'practice',
    url: 'https://www.toughtongueai.com/pricing',
    trains: 'Spoken practice calls with an AI buyer, scored on your own rubric',
    price:
      'Free 25 min; Starter $20/month; Pro $99/month; Business $299/month (15 seats); Growth $499/month (25 seats); Momentum $999/month (50 seats)',
    published: true,
    free: '25 free minutes',
    roleplay: 'Roleplay scenarios by voice, on the web, phone, Meet or Zoom',
    ours: true,
    year: (reps) =>
      reps === 1
        ? { usd: 20 * 12, basis: 'Starter $20 a month × 12 (one person, 150 min a month)' }
        : reps <= 15
          ? { usd: 299 * 12, basis: 'Business $299 a month × 12 (15 seats, 2,990 min a month)' }
          : reps <= 25
            ? { usd: 499 * 12, basis: 'Growth $499 a month × 12 (25 seats, 6,000 min a month)' }
            : reps <= 50
              ? {
                  usd: 999 * 12,
                  basis: 'Momentum $999 a month × 12 (50 seats, 13,000 min a month)',
                }
              : null,
  },
  {
    id: 'exec',
    name: 'Exec',
    kind: 'practice',
    url: 'https://www.exec.com/pricing',
    trains: 'Voice roleplays for sales and service teams',
    price:
      'Free; Starter $20/seat/month (5 seats min); Professional $39 (15 seats min); billed annually',
    published: true,
    free: 'Free plan up to 3 seats, 5 roleplay sessions per user a year',
    roleplay: 'Voice roleplay',
    year: (reps) => {
      const seats = Math.max(reps, 5)
      return { usd: 20 * 12 * seats, basis: `${seats} seats × $20 a month × 12 (Starter)` }
    },
  },
  {
    id: 'trellus',
    name: 'Trellus',
    kind: 'practice',
    url: 'https://www.trellus.ai/pricing',
    trains: 'A dialer with AI practice calls included',
    price: 'Power + Parallel $149.99/seat/month, includes unlimited AI practice calls',
    published: true,
    free: '',
    roleplay: 'Practice bots inside the dialer',
    year: (reps) => ({
      usd: r2(149.99 * 12 * reps),
      basis: `${reps} seats × $149.99 a month × 12 (includes the dialer)`,
    }),
  },
  {
    id: 'hyperbound',
    name: 'Hyperbound',
    kind: 'practice',
    url: 'https://www.hyperbound.ai/pricing',
    trains: 'Cold-call and discovery roleplays; also scores real calls',
    price: 'Free plan; paid plans quote only',
    published: false,
    free: 'Free plan: 45 prebuilt roleplays',
    roleplay: 'AI roleplays',
  },
  {
    id: 'secondnature',
    name: 'Second Nature',
    kind: 'practice',
    url: 'https://secondnature.ai/',
    trains: 'Avatar roleplays for pitch and product certification',
    price: 'Not published',
    published: false,
    free: '',
    roleplay: 'AI roleplay avatars',
  },
  {
    id: 'outdoo',
    name: 'Outdoo',
    kind: 'practice',
    url: 'https://www.outdoo.ai/pricing',
    trains: 'Voice roleplays plus real-call scoring',
    price: 'Free; Growth "custom quote by team size"',
    published: false,
    free: '60 free roleplay minutes',
    roleplay: 'AI roleplays',
  },
]

/* ---------- Counts (computed, never typed) ---------- */
export const COUNT = PLATFORMS.length
export const PUBLISHED = PLATFORMS.filter((p) => p.published)
export const QUOTE = PLATFORMS.filter((p) => !p.published)
export const FREE = PLATFORMS.filter((p) => p.free !== '' && !p.free.startsWith('14-day money'))
export const WITH_ROLEPLAY = PLATFORMS.filter((p) => p.kind === 'suite' && p.roleplay !== '')
export const SUITES = PLATFORMS.filter((p) => p.kind === 'suite')
export const byKind = (k: Kind) => PLATFORMS.filter((p) => p.kind === k)

export const WORKED_REPS = 20

export function yearCosts(reps: number) {
  return PLATFORMS.filter((p) => p.year)
    .map((p) => {
      const y = p.year!(reps)
      return { id: p.id, name: p.name, kind: p.kind, url: p.url, ours: !!p.ours, y }
    })
    .filter((x) => x.y !== null) as {
    id: string
    name: string
    kind: Kind
    url: string
    ours: boolean
    y: { usd: number; basis: string }
  }[]
}

export const usd = (n: number) =>
  '$' +
  n.toLocaleString('en-US', {
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
    maximumFractionDigits: 2,
  })

export const SALESFORCE = {
  url: 'https://www.salesforce.com/news/stories/state-of-sales-report-announcement-2026/',
  roleplay: 47,
  feedback: 46,
  sellers: 4050,
}
