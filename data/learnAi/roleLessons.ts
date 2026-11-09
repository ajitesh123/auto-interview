// Which free Learn AI lessons each role hub points to, in the order to take them.
// Shown on /<role> in the "AI skills" block. Each `why` is one line, specific to the role.
// Every slug must be a PLAN slug in tracks.ts (checked at build: unknown slugs are skipped).
import { getLesson, LESSONS } from './index'
import type { Lesson } from './types'

type Pick = { slug: string; why: string }

export const ROLE_LESSONS: Record<string, Pick[]> = {
  aipm: [
    {
      slug: 'what-is-an-llm',
      why: 'The base every AI PM interview assumes: what a model can and cannot do.',
    },
    {
      slug: 'ai-evals',
      why: 'Evals are the AI PM’s spec. Expect “how would you measure this feature?”',
    },
    {
      slug: 'embeddings-and-rag',
      why: 'Many AI features are RAG. Know the trade-offs before the product sense round.',
    },
    {
      slug: 'prompt-injection',
      why: 'Agent features need a safety story. Interviewers ask what could go wrong.',
    },
  ],
  'ai-engineer': [
    {
      slug: 'tool-calling',
      why: 'Function calling is the core of every agent you will be asked to design.',
    },
    {
      slug: 'embeddings-and-rag',
      why: 'RAG sits behind many of the AI features you will be asked to design.',
    },
    { slug: 'ai-evals', why: 'Shows you can prove an LLM feature works, not just demo it.' },
    {
      slug: 'prompt-injection',
      why: 'OWASP’s number one LLM risk. Expect “how do you secure this agent?”',
    },
  ],
  fde: [
    {
      slug: 'what-is-mcp',
      why: 'FDEs wire models into customer systems; MCP is how tools plug in now.',
    },
    {
      slug: 'ai-agents',
      why: 'Customer builds are agents. Know the loop, the tools and the failure modes.',
    },
    {
      slug: 'prompt-injection',
      why: 'Enterprise customers ask about data leaks first. Have the answer ready.',
    },
    { slug: 'ai-evals', why: 'An FDE proves value with numbers; evals are how you get them.' },
  ],
  'gtm-engineer': [
    {
      slug: 'n8n-ai-automation',
      why: 'GTM engineers ship automations; this is the fastest one to show.',
    },
    { slug: 'tool-calling', why: 'How an AI step calls Apollo, HubSpot or Clay in a workflow.' },
    {
      slug: 'context-engineering',
      why: 'Better enrichment and outreach copy comes from better context, not longer prompts.',
    },
    {
      slug: 'prompt-injection',
      why: 'Agents that read inbound email and web pages can be hijacked. Know the fix.',
    },
  ],
  'founders-office': [
    {
      slug: 'ai-output-levers',
      why: 'Founder’s office work is research and memos; these levers make AI drafts usable.',
    },
    {
      slug: 'context-engineering',
      why: 'Give AI the right company context and the first draft is close to final.',
    },
    {
      slug: 'n8n-ai-automation',
      why: 'Automating one recurring report is a strong case-round story.',
    },
    {
      slug: 'ai-hallucinations',
      why: 'You will put AI numbers in front of founders. Learn to catch made-up ones.',
    },
  ],
  'chief-of-staff': [
    {
      slug: 'ai-output-levers',
      why: 'A CoS writes and summarises all day. These levers raise the quality of AI drafts.',
    },
    {
      slug: 'ai-hallucinations',
      why: 'Board notes and briefs cannot carry invented facts. Learn how to check.',
    },
    {
      slug: 'ai-agents',
      why: 'Know what agents can take off a leader’s plate, and what they cannot.',
    },
    {
      slug: 'prompt-injection',
      why: 'Connecting AI to a leader’s inbox is a real risk. Know the safe setup.',
    },
  ],
  growth: [
    {
      slug: 'prompt-engineering',
      why: 'Ad copy, landing pages and test ideas start with a good prompt.',
    },
    {
      slug: 'n8n-ai-automation',
      why: 'Automate one growth loop (lead scoring, reporting) to show in interviews.',
    },
    {
      slug: 'ai-evals',
      why: 'Growth is testing. Evals apply the same A/B thinking to AI outputs.',
    },
    {
      slug: 'vibe-coding',
      why: 'Ship a landing page or calculator yourself, without waiting for engineering.',
    },
  ],
  'product-manager': [
    {
      slug: 'what-is-an-llm',
      why: 'PM loops increasingly include an AI question. Start with how models work.',
    },
    {
      slug: 'choosing-an-ai-model',
      why: 'Know when to pick ChatGPT, Claude or Gemini, and why it matters for cost.',
    },
    {
      slug: 'ai-evals',
      why: 'How you would measure an AI feature is a common product sense follow-up.',
    },
    { slug: 'vibe-coding', why: 'A working prototype beats a slide in a PM case round.' },
  ],
  'strategy-and-operations': [
    {
      slug: 'ai-output-levers',
      why: 'S&O work is analysis and decks; these levers make AI output trustworthy.',
    },
    {
      slug: 'n8n-ai-automation',
      why: 'Automating an ops report is a concrete S&O win to talk about.',
    },
    {
      slug: 'ai-hallucinations',
      why: 'Numbers in an ops review must be right. Learn to spot invented ones.',
    },
    {
      slug: 'context-engineering',
      why: 'Feed AI your metrics and process docs to get answers you can use.',
    },
  ],
  'data-analyst': [
    {
      slug: 'ai-hallucinations',
      why: 'AI-written SQL and summaries can invent numbers. Learn to catch them before a review.',
    },
    {
      slug: 'ai-output-levers',
      why: 'Context, examples and checks turn a vague AI answer into a query you can trust.',
    },
    {
      slug: 'tokens-and-context-window',
      why: 'Why a large CSV gets cut off or summarised badly when you paste it into a chatbot.',
    },
    {
      slug: 'ai-agents',
      why: 'BigQuery and Power BI now ship data agents. Know how they work before you use one.',
    },
  ],
}

export function lessonsForRole(hubSlug: string): { lesson: Lesson; why: string }[] {
  return (ROLE_LESSONS[hubSlug] ?? [])
    .map((p) => ({ lesson: getLesson(p.slug), why: p.why }))
    .filter((x): x is { lesson: Lesson; why: string } => Boolean(x.lesson))
}

export const LEARN_AI_COUNT = LESSONS.length
