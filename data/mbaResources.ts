// MBA interview resources by specialization (rebuilt Nov 24, 2026).
// Rule: link to the original publisher; never re-host casebooks or promise downloads we do not have.
// Outside links come from FREE_RESOURCE_SECTIONS (each opened and checked on CHECKED_ON),
// referenced by URL so there is one place to fix a dead link.

import { FREE_RESOURCE_SECTIONS, type FreeResource } from './freeResources'

export interface MBAOwnPage {
  href: string
  title: string
  body: string
}

export interface MBASpecialization {
  slug: string
  name: string
  /** One line: what this interview tests */
  tests: string
  /** 3 things the interview checks, in the order they come up */
  checks: string[]
  ours: MBAOwnPage[]
  /** Heading for the outside links when they are general (e.g. behavioural) prep */
  outsideLabel?: string
  /** URLs from FREE_RESOURCE_SECTIONS */
  outsideUrls: string[]
}

const ALL_OUTSIDE: FreeResource[] = FREE_RESOURCE_SECTIONS.flatMap((s) => s.items)

export function outsideFor(spec: MBASpecialization): FreeResource[] {
  return spec.outsideUrls
    .map((u) => ALL_OUTSIDE.find((r) => r.url === u))
    .filter((r): r is FreeResource => Boolean(r))
}

export const mbaSpecializations: MBASpecialization[] = [
  {
    slug: 'consulting',
    name: 'Consulting',
    tests:
      'A case: can you structure a messy business problem, do the maths out loud and land a recommendation.',
    checks: [
      'Structure: an issue tree that is mutually exclusive and covers the problem',
      'Maths under pressure: market sizing and break-even without a calculator',
      'Synthesis: a one-line answer first, then the two reasons and the risk',
    ],
    ours: [
      {
        href: '/strategy-and-operations',
        title: 'Strategy & Operations guide',
        body: 'Case-style questions with model answers and what each round checks.',
      },
      {
        href: '/founders-office',
        title: "Founder's Office guide",
        body: 'The startup version of a consulting job: problem-solving rounds and pay.',
      },
      {
        href: '/star-method',
        title: 'STAR answer builder',
        body: 'For the fit half of the interview: write and time your stories.',
      },
    ],
    outsideUrls: [
      'https://www.mckinsey.com/careers/interviewing/en',
      'https://bain.com/careers/hiring-process/case-interview',
      'https://hackingthecaseinterview.com/pages/mba-consulting-casebooks',
      'https://www.roadtooffer.com/blog/bcg-online-case-casey-guide',
      'https://www.roadtooffer.com/blog/mckinsey-solve-guide',
    ],
  },
  {
    slug: 'general-management',
    outsideLabel: 'For the behavioural round',
    name: 'General Management',
    tests:
      'Judgement and ownership: how you run a messy project across teams and what you did when it went wrong.',
    checks: [
      'A business problem you broke down and the call you made',
      'Stories of leading people who did not report to you',
      'Why this company and this rotation, in specifics',
    ],
    ours: [
      {
        href: '/chief-of-staff',
        title: 'Chief of Staff guide',
        body: 'Questions, model answers and pay for the closest corporate role.',
      },
      {
        href: '/strategy-and-operations',
        title: 'Strategy & Operations guide',
        body: 'Problem-solving and operating questions with model answers.',
      },
      {
        href: '/tell-me-about-yourself',
        title: '"Tell me about yourself" builder',
        body: 'The first question in every GM interview, in three timed parts.',
      },
    ],
    outsideUrls: [
      'https://www.aboutamazon.com/md/news/workplace/amazon-interview-guide',
      'https://www.aboutamazon.com/news/workplace/what-do-each-of-amazons-leadership-principles-really-mean',
    ],
  },
  {
    slug: 'finance',
    name: 'Finance',
    tests:
      'Technical basics (valuation, statements, markets) and whether you follow the markets you say you love.',
    checks: [
      'Walk me through a DCF, and how the three statements connect',
      'A stock or deal you would pitch, with the numbers',
      'Accuracy: small maths and accounting errors are what fail people',
    ],
    ours: [
      {
        href: '/cv-templates/financial-analyst',
        title: 'Financial analyst CV template',
        body: 'A one-page Word CV in the Indian table format, with a filled-in sample.',
      },
      {
        href: '/salary-calculator',
        title: 'CTC to in-hand calculator',
        body: 'What a finance offer pays each month after FY 2026-27 tax and PF.',
      },
      {
        href: '/job-offer-comparison',
        title: 'Job offer comparison',
        body: 'Compare offers on bonus, clawback and ESOPs, not headline CTC.',
      },
    ],
    outsideUrls: ['https://pages.stern.nyu.edu/~adamodar/New_Home_Page/home.htm'],
  },
  {
    slug: 'marketing',
    outsideLabel: 'For the behavioural round',
    name: 'Marketing',
    tests:
      'Consumer judgement: how you would grow a brand or product, and the numbers you would watch.',
    checks: [
      'A product or brand you would fix, and how you would know it worked',
      'Funnel and channel maths: acquisition cost, conversion, retention',
      'A campaign or project you ran, as a STAR story with a result',
    ],
    ours: [
      {
        href: '/growth',
        title: 'Growth Manager guide',
        body: 'Funnel, experiment and channel questions with model answers and pay.',
      },
      {
        href: '/product-manager',
        title: 'Product Manager guide',
        body: 'Product sense questions overlap with brand and digital marketing rounds.',
      },
      {
        href: '/star-method',
        title: 'STAR answer builder',
        body: 'Turn a campaign into a story with a measured result.',
      },
    ],
    outsideUrls: ['https://www.aboutamazon.com/md/news/workplace/amazon-interview-guide'],
  },
  {
    slug: 'hr',
    outsideLabel: 'For the behavioural round',
    name: 'HR',
    tests:
      'People judgement: how you handle a hard conversation, a policy call and a hiring decision.',
    checks: [
      'A conflict or performance case you handled, step by step',
      'Why HR, and which part of it (business partner, talent, rewards)',
      'Basic labour law and policy awareness for the country you will work in',
    ],
    ours: [
      {
        href: '/interview-questions',
        title: 'Behavioural questions Q&A',
        body: 'What the interviewer checks in each behavioural question, with a model answer.',
      },
      {
        href: '/star-method',
        title: 'STAR answer builder',
        body: 'Write and time the conflict and feedback stories HR rounds ask for.',
      },
      {
        href: '/chief-of-staff',
        title: 'Chief of Staff guide',
        body: 'A people-heavy generalist role many HR MBAs also interview for.',
      },
    ],
    outsideUrls: [
      'https://www.aboutamazon.com/md/news/workplace/amazon-interview-guide',
      'https://www.aboutamazon.com/news/workplace/what-do-each-of-amazons-leadership-principles-really-mean',
    ],
  },
  {
    slug: 'product-management',
    name: 'Product Management',
    tests:
      'Product sense, metrics and execution: what you would build, how you would measure it, what you would cut.',
    checks: [
      'Product sense: design or improve a product for a named user',
      'Metrics: pick the one number, then diagnose why it dropped',
      'Execution and stakeholders: a launch you drove and a trade-off you made',
    ],
    ours: [
      {
        href: '/product-manager',
        title: 'Product Manager guide',
        body: 'Questions by round with model answers, salary data and the full kit.',
      },
      {
        href: '/aipm',
        title: 'AI Product Manager guide',
        body: 'The AI PM version: evals, model trade-offs and AI product sense.',
      },
      {
        href: '/product-manager/salary',
        title: 'Product Manager salary',
        body: 'Pay reported by PMs at well-known companies, with sources and dates.',
      },
    ],
    outsideUrls: ['https://www.aced.io/guides/google-product-manager-interview'],
  },
]

export function getSpecializationBySlug(slug: string): MBASpecialization | undefined {
  return mbaSpecializations.find((spec) => spec.slug === slug)
}

export function getAllSpecializationSlugs(): string[] {
  return mbaSpecializations.map((spec) => spec.slug)
}
