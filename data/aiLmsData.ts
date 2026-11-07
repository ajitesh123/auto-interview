/**
 * AI LMS facts, checked on each vendor's own pricing and AI feature pages on
 * 7 Nov 2026. One source of truth for /blog/best-ai-lms-2026: the AI feature
 * matrix, the worked cost table, the shortlist picker and the FAQ.
 * A feature is listed only when the vendor names it on an opened page.
 * Prices are stated as written; `cost()` turns them into a year-one list price.
 */
import { practiceCost } from './salesLmsPricing'

export const CHECKED = '7 Nov 2026'

export type Capability =
  | 'authoring'
  | 'assistant'
  | 'practice'
  | 'skills'
  | 'translation'
  | 'agents'

export const CAPABILITIES: { id: Capability; label: string; short: string }[] = [
  { id: 'authoring', label: 'AI course and quiz authoring', short: 'Authoring' },
  { id: 'assistant', label: 'AI tutor or assistant for learners', short: 'Tutor / assistant' },
  { id: 'practice', label: 'AI roleplay or conversation practice', short: 'Roleplay' },
  { id: 'skills', label: 'AI skills tagging or skills inference', short: 'Skills' },
  { id: 'translation', label: 'AI translation', short: 'Translation' },
  { id: 'agents', label: 'AI agents that act inside the LMS', short: 'Agents' },
]

export interface Cost {
  annual: number | null
  note: string
}

export interface AiLms {
  id: string
  name: string
  stated: string
  ai: Partial<Record<Capability, string>>
  aiPricing: string
  bestFor: string
  pricingUrl: string
  aiUrl: string
  cost: (learners: number) => Cost
  ours?: boolean
}

/** Practice minutes per learner per month assumed for the practice layer. */
export const PRACTICE_MIN = 30

const quote = (note = 'Not published: quote only'): Cost => ({ annual: null, note })

export const PLATFORMS: AiLms[] = [
  {
    id: '360learning',
    name: '360Learning',
    stated:
      'Team $8 per user/month, up to 100 users, billed monthly; Business and Enterprise custom',
    ai: {
      authoring: 'AI Content Builder',
      assistant: 'AI Companion',
      practice: 'AI Roleplay',
      skills: 'AI skills tagging',
      translation: 'Automated translations',
      agents: 'Agentic Automation + MCP server',
    },
    aiPricing: '"All plans include our AI-powered LMS"; features are not mapped to plans',
    bestFor: 'Teams under 100 that want every AI feature type on a monthly plan',
    pricingUrl: 'https://360learning.com/pricing/',
    aiUrl: 'https://360learning.com/product/artificial-intelligence/',
    cost: (n) =>
      n <= 100
        ? { annual: 8 * n * 12, note: `Team plan: $8 × ${n} active users × 12 months` }
        : quote('Over 100 users: Business plan, custom price'),
  },
  {
    id: 'talentlms',
    name: 'TalentLMS',
    stated:
      'Free (5 users, 10 courses); Core $119/month; Grow $229/month; Pro $449/month + $6 per extra user; price rises by user band',
    ai: {
      authoring: 'TalentCraft AI course creator',
      assistant: 'AI Coach',
      practice: 'Learning Playground (rehearse conversations)',
      skills: 'Skills',
      translation: 'AI course translation',
    },
    aiPricing:
      'Credit-metered: Core 5,000 AI credits one-time; Grow 10,000 a month; Pro 15,000 a month',
    bestFor: 'Small teams that want a free tier and a cheap start',
    pricingUrl: 'https://www.talentlms.com/pricing',
    aiUrl: 'https://www.talentlms.com/ai-lms',
    cost: (n) =>
      n <= 5
        ? { annual: 0, note: 'Free plan: up to 5 users and 10 courses' }
        : n <= 40
          ? { annual: 119 * 12, note: 'Core, 1–40 users band, $119 × 12 (monthly billing)' }
          : quote('Over 40 users: band price shown on the page slider, not in its text'),
  },
  {
    id: 'ispring',
    name: 'iSpring LMS',
    stated:
      'Business: 100 users $6.91/user/month ($8,286 a year); 300 users $4.46 ($16,050); 500 users $3.97 ($23,790)',
    ai: {
      authoring: 'AI Course Creation + AI Quiz Generator',
      assistant: 'AI assistant',
      translation: 'AI translation',
    },
    aiPricing: 'Not mapped to plans on the pricing page',
    bestFor: 'Mid-size teams that want a low per-user price at 100–500 users',
    pricingUrl: 'https://www.ispring.com/ispring-learn/pricing',
    aiUrl: 'https://www.ispring.com/solutions/lms-with-ai',
    cost: (n) =>
      n <= 100
        ? { annual: 8286, note: 'Business, 100-user tier (smallest published)' }
        : n <= 300
          ? { annual: 16050, note: 'Business, 300-user tier' }
          : n <= 500
            ? { annual: 23790, note: 'Business, 500-user tier' }
            : quote('Over 500 users: Enterprise, contact sales'),
  },
  {
    id: 'educateme',
    name: 'EducateMe',
    stated:
      'Pro $239/month (80 users); Premium $399/month (100 users); Scale $999/month (200 users); Enterprise custom',
    ai: {
      authoring: 'AI Assistant builds lessons and quizzes from files',
      assistant: 'AI Assistant and AI search',
      practice: 'AI Roleplay Coach (voice and chat)',
      translation: 'AI lesson translation',
    },
    aiPricing:
      'Voice roleplay sessions capped at 10 / 40 / 200 a month by plan; extra packs from 50 sessions for $175',
    bestFor: 'Small teams that want voice roleplay inside the LMS',
    pricingUrl: 'https://www.educate-me.co/pricing',
    aiUrl: 'https://www.educate-me.co/ai-lms',
    cost: (n) =>
      n <= 80
        ? { annual: 239 * 12, note: 'Pro, 80 users included, $239 × 12 (monthly billing)' }
        : n <= 100
          ? { annual: 399 * 12, note: 'Premium, 100 users included, $399 × 12' }
          : n <= 200
            ? { annual: 999 * 12, note: 'Scale, 200 users included, $999 × 12' }
            : quote('Over 200 users: extra-user fees or Enterprise; ask for a quote'),
  },
  {
    id: 'disco',
    name: 'Disco',
    stated: 'Create $399/month billed annually (250 active members); Scale from $999/month',
    ai: {
      authoring: 'AI curriculum builder + AI quiz generator',
      assistant: 'Ask AI',
    },
    aiPricing: '"AI is included in every Disco plan, with no credits to buy or track"',
    bestFor: 'Cohort academies and community-led programmes',
    pricingUrl: 'https://www.disco.co/pricing',
    aiUrl: 'https://www.disco.co/features/ai-lms-for-corporate-ld',
    cost: (n) =>
      n <= 250
        ? { annual: 399 * 12, note: 'Create, 250 active members, $399 × 12 (annual billing)' }
        : { annual: 999 * 12, note: 'From: Scale, starting at $999 × 12' },
  },
  {
    id: 'litmos',
    name: 'Litmos',
    stated: 'Foundation from $8K a year; Platinum from $15K a year; Platinum AI "Talk to sales"',
    ai: {
      authoring: 'AI Content Authoring',
      assistant: 'AI assistant',
      practice: 'AI video assessments (scored role-play)',
      skills: 'Skill gap analysis',
    },
    aiPricing:
      'Platinum AI is priced on request; the page does not show which plan carries which AI feature',
    bestFor: 'Companies running compliance and sales training in one LMS',
    pricingUrl: 'https://www.litmos.com/pricing',
    aiUrl: 'https://www.litmos.com/features/ai-solutions',
    cost: () =>
      quote('AI tier (Platinum AI) priced on request; Foundation without stated AI from $8,000'),
  },
  {
    id: 'docebo',
    name: 'Docebo',
    stated: 'Not published (Elevate and Enterprise plans, priced on active learners)',
    ai: {
      authoring: 'AI content creation',
      assistant: 'AI assistant and search',
      practice: 'Docebo Roleplay (add-on)',
      skills: 'Skills Intelligence (add-on)',
      translation: 'AI translations',
      agents: 'Docebo Agents (add-on)',
    },
    aiPricing:
      'Assistant and content creation included; AI credits, Agents, Roleplay and Skills are add-ons',
    bestFor: 'Large companies that want to add AI modules one at a time',
    pricingUrl: 'https://www.docebo.com/pricing/',
    aiUrl: 'https://www.docebo.com/ai-info/',
    cost: () => quote(),
  },
  {
    id: 'absorb',
    name: 'Absorb LMS',
    stated: 'Not published (pricing form only)',
    ai: {
      authoring: 'Absorb Create',
      assistant: 'Intelligent Assist (admin reports in plain language)',
      skills: 'Absorb Skills',
      agents: 'Absorb Aura (agentic AI via MCP)',
    },
    aiPricing: 'Not stated; Create can be switched off, Intelligent Assist is built in',
    bestFor: 'Admin-heavy teams that want AI for reporting and setup',
    pricingUrl: 'https://www.absorbai.com/get-pricing',
    aiUrl: 'https://www.absorbai.com/features/lms-ai',
    cost: () => quote(),
  },
  {
    id: 'cornerstone',
    name: 'Cornerstone Galaxy',
    stated: 'Not published ("different cost depending on needs and size")',
    ai: {
      assistant: 'Conversational AI agents for leaders',
      practice: 'Immerse AI Companion (VR)',
      skills: 'Skills Engine (skill inference from labour-market data)',
      agents: 'AI Readiness Agents',
    },
    aiPricing: 'Not stated',
    bestFor: 'Enterprises building a skills-based talent strategy',
    pricingUrl: 'https://www.cornerstoneondemand.com/pricing/',
    aiUrl: 'https://www.cornerstoneondemand.com/platform/cornerstone-galaxy-ai/',
    cost: () => quote(),
  },
  {
    id: 'sana',
    name: 'Sana Learn (Workday)',
    stated: 'Not published in page text; bands below 300, 300–3,000 and above 3,000 users',
    ai: {
      authoring: 'AI authoring + course converter (SCORM/PDF to native)',
      assistant: 'AI Tutor',
      translation: 'Authoring into any language',
    },
    aiPricing: 'Not stated',
    bestFor: 'Enterprises that want an AI-first LMS with a learner tutor',
    pricingUrl: 'https://sanalabs.com/platform-pricing',
    aiUrl: 'https://sanalabs.com/products/sana-learn/',
    cost: () => quote(),
  },
  {
    id: 'learnupon',
    name: 'LearnUpon',
    stated: 'Not published; employee training from 100 users',
    ai: {
      authoring: 'Create+ (agentic AI co-creator)',
      assistant: 'Ask Lia',
      agents: 'Agentic Editor, Reporting Agent, Journey Agent (beta)',
    },
    aiPricing: 'Mentions optional add-ons without naming them; Scenarios Agent "coming soon"',
    bestFor: 'Mid-market teams training employees, customers or partners',
    pricingUrl: 'https://www.learnupon.com/pricing/',
    aiUrl: 'https://www.learnupon.com/features/artificial-intelligence/',
    cost: (n) => quote(n < 100 ? 'Employee plan starts at 100 users; quote only' : undefined),
  },
  {
    id: 'continu',
    name: 'Continu',
    stated: 'Not published; tiers by monthly active users',
    ai: {
      authoring: 'Outline Generator',
      assistant: 'Eddy (in Slack, Teams and SMS)',
      agents: 'Eddy AI Learning Agent',
    },
    aiPricing: 'Continu AI not in Growth (under 1,000 MAU); unlocked on Professional',
    bestFor: 'Learning inside Slack or Teams',
    pricingUrl: 'https://www.continu.com/pricing',
    aiUrl: 'https://www.continu.com/features/ai',
    cost: () => quote(),
  },
  {
    id: 'toughtongue',
    name: 'Tough Tongue AI',
    stated:
      'Free 25 min; Business $299/month (2,990 min, 15 seats); Growth $499 (6,000 min, 25 seats); Momentum $999 (13,000 min, 50 seats)',
    ai: {
      practice:
        'Voice roleplay with AI buyers, candidates or customers, scored after every session',
    },
    aiPricing: 'Priced by practice minutes; not an LMS, it sits next to one',
    bestFor: 'Adding spoken practice to the LMS you already have',
    pricingUrl: 'https://www.toughtongueai.com/pricing',
    aiUrl: 'https://www.toughtongueai.com/pricing',
    ours: true,
    cost: (n) => {
      const t = practiceCost(n, PRACTICE_MIN)
      return t
        ? {
            annual: Math.round(t.monthly * 12 * 100) / 100,
            note: `${t.plan.name} plan (${t.plan.seats} seats), ${PRACTICE_MIN} practice min per learner a month`,
          }
        : quote('Over 50 seats: Enterprise, custom price')
    },
  },
]

/** Schools and universities: AI in the big academic LMS platforms. */
export const ACADEMIC = [
  {
    name: 'Moodle LMS',
    ai: 'AI subsystem (since 4.5): generate text and images in the editor, summarise and explain course content',
    pricing:
      'Open source; AI needs your own provider (OpenAI, Azure AI or a self-hosted Ollama model), billed by that provider',
    url: 'https://docs.moodle.org/en/AI_subsystem',
  },
  {
    name: 'Canvas (Instructure)',
    ai: 'IgniteAI: discussion summaries, translations, quiz question help, rubric generator, grading assistance, Agent, Study Tools',
    pricing:
      'Tiered: some IgniteAI tools in Canvas Core, teaching tools need Canvas Plus, Agent and Study Tools need Canvas Next; prices via account team',
    url: 'https://www.instructure.com/resources/blog/what-we-shared-april-2026-new-next-showcase',
  },
  {
    name: 'D2L Brightspace',
    ai: 'D2L Lumi: outcomes mapping, study support after quizzes, content from existing files, module summaries',
    pricing: 'Not published; Lumi is listed under Brightspace add-ons',
    url: 'https://www.d2l.com/newsroom/new-d2l-lumi-features-enhance-personalized-learning-and-language-capabilities/',
  },
  {
    name: 'Blackboard (Anthology)',
    ai: 'AI Design Assistant, AI Conversation (Socratic or role-play persona), AVA virtual assistant',
    pricing: '"These AI capabilities are included as standard"; LMS price not published',
    url: 'https://www.blackboard.com/solutions/lms/ai',
  },
]

export const WORKED_LEARNERS = 40

export function costs(n: number) {
  return PLATFORMS.map((p) => ({ id: p.id, name: p.name, ours: p.ours, ...p.cost(n) }))
}
