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
      slug: 'ai-for-data-analysis',
      why: 'Interviewers now ask how you use AI on data. Show the 5 checks you run before trusting it.',
    },
    {
      slug: 'ai-hallucinations',
      why: 'AI-written SQL and summaries can invent numbers. Learn to catch them before a review.',
    },
    {
      slug: 'ai-output-levers',
      why: 'Context, examples and checks turn a vague AI answer into a query you can trust.',
    },
    {
      slug: 'ai-for-excel-and-google-sheets',
      why: 'Excel and Sheets rounds test SUMIFS and pivots. Use AI for the formula, then reconcile it.',
    },
  ],
}

// Reverse-only links: lessons a role hub does not list in its top 4, but that still matter for
// that role. Shown on the lesson page with the hub's own picks ("Roles that need this lesson").
export const LESSON_EXTRA_ROLES: Record<string, { hub: string; why: string }[]> = {
  'ai-for-excel-and-google-sheets': [
    {
      hub: 'strategy-and-operations',
      why: 'Ops models live in spreadsheets. Get AI to write the formula, then make the parts add up.',
    },
    {
      hub: 'founders-office',
      why: 'Board and investor numbers come from a sheet. Two checks stop a wrong total going out.',
    },
    {
      hub: 'chief-of-staff',
      why: 'You own the numbers in the leadership review. Use AI for speed and reconcile before sending.',
    },
    {
      hub: 'growth',
      why: 'Tag thousands of survey comments with =AI() and count themes without a data team.',
    },
  ],
  'ai-for-data-analysis': [
    {
      hub: 'strategy-and-operations',
      why: 'Ops reviews run on numbers. Get AI speed on a spreadsheet without shipping a wrong figure.',
    },
    {
      hub: 'founders-office',
      why: 'Founders ask for a quick cut of the data. Use AI for it and check it before you send.',
    },
    {
      hub: 'growth',
      why: 'Funnel and cohort cuts in minutes, plus the points-vs-percent trap every growth deck falls into.',
    },
    {
      hub: 'product-manager',
      why: 'PMs pull their own metrics now. Know where AI analysis goes wrong before a metrics round.',
    },
  ],
  'tokens-and-context-window': [
    {
      hub: 'data-analyst',
      why: 'Why a large CSV pasted into a chatbot gets cut off or summarised badly. Upload the file instead.',
    },
  ],
  'first-prompt': [
    {
      hub: 'founders-office',
      why: 'Start here if you have not used AI for daily research and drafting yet.',
    },
    {
      hub: 'chief-of-staff',
      why: 'The basics of asking AI for a summary or a draft you can actually send.',
    },
  ],
  'ai-for-interview-prep': [
    {
      hub: 'product-manager',
      why: 'Run a mock product sense round with AI and get feedback on structure before the real one.',
    },
    {
      hub: 'data-analyst',
      why: 'Practise explaining a SQL answer out loud; AI can play the interviewer who asks why.',
    },
    {
      hub: 'founders-office',
      why: 'Founder’s office loops are case-heavy. Use AI to rehearse cases and your “why this startup”.',
    },
  ],
  'what-is-an-api': [
    {
      hub: 'gtm-engineer',
      why: 'Every GTM tool you wire together (CRM, enrichment, email) talks over an API.',
    },
    {
      hub: 'fde',
      why: 'FDE work is connecting systems. APIs, keys and rate limits come up on day one.',
    },
  ],
  'agent-harness': [
    {
      hub: 'ai-engineer',
      why: 'Interviewers ask why an agent failed. Naming the harness part (context, tool, check) is the strong answer.',
    },
    {
      hub: 'fde',
      why: 'Most customer agent work is harness work: connectors, permissions and checks around a model you cannot change.',
    },
    {
      hub: 'aipm',
      why: 'Knowing what belongs to the model and what belongs to the harness is how you scope an agent feature.',
    },
  ],
  'agent-skills': [
    {
      hub: 'ai-engineer',
      why: 'Skills are how agents load instructions and scripts only when needed. Expect design questions on it.',
    },
    {
      hub: 'fde',
      why: 'Packaging a customer’s workflow as a reusable skill is a common FDE deliverable.',
    },
  ],
  'voice-ai-agents': [
    {
      hub: 'ai-engineer',
      why: 'Speech-to-text, LLM and text-to-speech in one loop: a common system design prompt.',
    },
    {
      hub: 'fde',
      why: 'Voice agents are a fast-growing customer build. Know the latency budget and failure modes.',
    },
  ],
  'claude-code': [
    {
      hub: 'gtm-engineer',
      why: 'Build scripts and small GTM tools yourself, without waiting for engineering.',
    },
    {
      hub: 'ai-engineer',
      why: 'Agentic coding tools are part of the job now. Know how to steer one and review its work.',
    },
  ],
  cursor: [
    {
      hub: 'ai-engineer',
      why: 'Many AI teams code in an AI editor. Show you can use one well, not just accept its output.',
    },
  ],
  'openai-codex': [
    {
      hub: 'ai-engineer',
      why: 'Know how a cloud coding agent works so you can compare it with Claude Code and Cursor.',
    },
  ],
  'ai-coding-tools-compared': [
    {
      hub: 'aipm',
      why: 'AI PMs get asked which coding tools their team should use, and what each costs.',
    },
    {
      hub: 'product-manager',
      why: 'Pick the right tool to prototype an idea yourself before a review.',
    },
  ],
  'fine-tuning-vs-rag': [
    {
      hub: 'aipm',
      why: '“Should we fine-tune or use RAG?” is one of the most common AI PM interview questions.',
    },
    {
      hub: 'ai-engineer',
      why: 'Know the cost and data trade-offs before you are asked to choose in a design round.',
    },
  ],
  'ai-safety-and-alignment': [
    {
      hub: 'aipm',
      why: 'Shipping AI features means owning their risks. Know the vocabulary labs use.',
    },
  ],
  'build-an-llm-from-scratch': [
    {
      hub: 'ai-engineer',
      why: 'Building a small GPT yourself is the strongest proof you understand how models work.',
    },
  ],
  'best-free-ai-courses': [
    {
      hub: 'ai-engineer',
      why: 'A short list of free courses worth your time after this path, picked by who teaches them.',
    },
    {
      hub: 'aipm',
      why: 'Where to go deeper on AI without paying for a bootcamp.',
    },
  ],
  'multimodal-ai': [
    {
      hub: 'aipm',
      why: 'Image, voice and video inputs change what a product can do. Know the basics before a product round.',
    },
  ],
  'key-ai-papers': [
    {
      hub: 'ai-engineer',
      why: 'Interviewers like candidates who know where transformers, RLHF and RAG came from.',
    },
  ],
  'mixture-of-experts': [
    {
      hub: 'ai-engineer',
      why: 'Choosing and hosting open models: total parameters set the GPU memory you must budget.',
    },
    {
      hub: 'aipm',
      why: 'Model launches quote total and active parameters. Know which one drives cost and speed.',
    },
  ],
  'transformers-explained': [
    {
      hub: 'ai-engineer',
      why: 'Attention and context length explain most model limits you will design around.',
    },
    {
      hub: 'aipm',
      why: 'Lets you explain to a team why long inputs cost more and how models read text.',
    },
  ],
  'run-llm-locally': [
    {
      hub: 'ai-engineer',
      why: 'Running open models yourself is the fastest way to test them before you build on one.',
    },
    {
      hub: 'fde',
      why: 'Some customers cannot send data to a cloud API. Know what a local or on-prem model needs.',
    },
  ],
  'how-llms-are-trained': [
    {
      hub: 'aipm',
      why: 'Pre-training vs fine-tuning vs RLHF explains what a model update can and cannot fix.',
    },
  ],
  'reasoning-models': [
    {
      hub: 'aipm',
      why: 'Thinking models trade speed and cost for accuracy: a product call you will have to make.',
    },
  ],
  'multi-agent-systems': [
    {
      hub: 'ai-engineer',
      why: 'Subagents and orchestration come up as soon as you design an agent that does more than one job.',
    },
  ],
}

/** Role hubs that point to this lesson: the hub's own top-4 picks first, then reverse-only links. */
export function rolesForLesson(slug: string): { hub: string; why: string }[] {
  const out: { hub: string; why: string }[] = []
  for (const [hub, picks] of Object.entries(ROLE_LESSONS)) {
    const p = picks.find((x) => x.slug === slug)
    if (p) out.push({ hub, why: p.why })
  }
  for (const e of LESSON_EXTRA_ROLES[slug] ?? []) {
    if (!out.some((o) => o.hub === e.hub)) out.push(e)
  }
  return out
}

export function lessonsForRole(hubSlug: string): { lesson: Lesson; why: string }[] {
  return (ROLE_LESSONS[hubSlug] ?? [])
    .map((p) => ({ lesson: getLesson(p.slug), why: p.why }))
    .filter((x): x is { lesson: Lesson; why: string } => Boolean(x.lesson))
}

export const LEARN_AI_COUNT = LESSONS.length
