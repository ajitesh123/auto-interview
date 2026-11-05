// AI skills toolkit shared by every role hub and the /free-resources page.
// Every link was opened and checked on AI_TOOLKIT_CHECKED_ON. Link to the publisher; never re-host.

import type { FreeResource } from './freeResources'

export const AI_TOOLKIT_CHECKED_ON = '2026-11-05'

export interface AiToolkitItem extends FreeResource {
  id: string
  /** The one idea to walk away with */
  takeaway: string
  level: 'Start here' | 'Build' | 'Go deeper'
}

export const AI_TOOLKIT: AiToolkitItem[] = [
  {
    id: 'karpathy-llms',
    title: 'Intro to Large Language Models (1-hour talk)',
    url: 'https://www.youtube.com/watch?v=zjkBMFhNj_g',
    publisher: 'Andrej Karpathy',
    format: 'Video course',
    level: 'Start here',
    why: 'The clearest plain-English explanation of what an LLM is, how it is trained and where it fails.',
    takeaway:
      'An LLM predicts the next token. Everything else (chat, tools, agents) is built on top of that.',
  },
  {
    id: 'openai-academy',
    title: 'OpenAI Academy: AI Foundations, Applied AI, Agents and Workflows',
    url: 'https://academy.openai.com/',
    publisher: 'OpenAI',
    format: 'Video course',
    level: 'Start here',
    why: 'Free, self-paced courses of about 60–90 minutes each, with a completion certificate (needs a ChatGPT account).',
    takeaway: 'Use AI on your real work every day. Interviewers now ask how you already use it.',
    official: true,
  },
  {
    id: 'anthropic-academy',
    title: 'Anthropic Academy: AI Fluency, the Claude API, MCP and Claude Code',
    url: 'https://www.anthropic.com/learn',
    publisher: 'Anthropic',
    format: 'Video course',
    level: 'Start here',
    why: 'Anthropic’s own courses, from working well with AI to building on the Claude API, with certificates.',
    takeaway:
      'Being fluent means knowing when to delegate to AI, how to describe the task and how to check the output.',
    official: true,
  },
  {
    id: 'claude-prompting',
    title: 'Prompt engineering overview (Claude docs)',
    url: 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview',
    publisher: 'Anthropic',
    format: 'Web guide',
    level: 'Build',
    why: 'Practical techniques: clear instructions, examples, structure and letting the model think step by step.',
    takeaway: 'Define what “good” looks like and test against it before you tweak the wording.',
    official: true,
  },
  {
    id: 'anthropic-agents',
    title: 'Building effective AI agents',
    url: 'https://www.anthropic.com/engineering/building-effective-agents',
    publisher: 'Anthropic (Dec 2024)',
    format: 'Web guide',
    level: 'Build',
    why: 'The most cited guide to workflow vs agent patterns, written from Anthropic’s work with customers.',
    takeaway:
      'Start with the simplest thing that works. Add agent autonomy only when results show it helps.',
    official: true,
  },
  {
    id: 'openai-agents-guide',
    title: 'A practical guide to building agents (PDF)',
    url: 'https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf',
    publisher: 'OpenAI (Apr 2025)',
    format: 'PDF',
    level: 'Build',
    why: 'When to build an agent, how to design its tools and instructions, and how to add guardrails.',
    takeaway:
      'An agent is a model plus tools plus instructions. Guardrails decide whether you can trust it.',
    official: true,
  },
  {
    id: 'n8n-academy',
    title: 'n8n Academy: build automations and AI workflows',
    url: 'https://learn.n8n.io/',
    publisher: 'n8n',
    format: 'Video course',
    level: 'Go deeper',
    why: 'Hands-on courses from your first workflow to APIs and AI, without needing to be a full-time engineer.',
    takeaway:
      'Ship one small automation that saves someone an hour a week. That is your best proof of work.',
    official: true,
  },
]
