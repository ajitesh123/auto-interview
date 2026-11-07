import type { Track } from './types'

export const TRACKS: Track[] = [
  {
    id: 'foundations',
    n: 1,
    title: 'Understand AI',
    promise: 'Explain what AI, LLMs and transformers are, and how ChatGPT and Claude were built.',
  },
  {
    id: 'use',
    n: 2,
    title: 'Use AI well',
    promise:
      'Write prompts that work, pull the levers that improve answers, and spot made-up facts.',
  },
  {
    id: 'build',
    n: 3,
    title: 'Build with AI',
    promise: 'Understand APIs, tool calling, RAG, MCP, agents, skills, evals and voice agents.',
  },
  {
    id: 'automate',
    n: 4,
    title: 'Automate and code with AI',
    promise: 'Automate real work with n8n and build software with Claude Code, Cursor and Codex.',
  },
  {
    id: 'deeper',
    n: 5,
    title: 'Go deeper',
    promise: 'Fine-tuning, AI safety, building a small LLM with Karpathy, and where to learn next.',
  },
]

/**
 * The path, in order. Order on the site comes from this list (lesson.order is ignored).
 * Adding a lesson: write data/learnAi/lessons/<slug>.ts, add it here, register it in index.ts.
 * The path keeps growing: see LEARN_AI_BACKLOG in index.ts for what comes next.
 */
export const PLAN: { slug: string; track: Track['id']; title: string }[] = [
  { slug: 'what-is-ai', track: 'foundations', title: 'What is AI?' },
  { slug: 'history-of-ai', track: 'foundations', title: 'How AI started: 1956 to ChatGPT' },
  { slug: 'what-is-an-llm', track: 'foundations', title: 'What is an LLM?' },
  { slug: 'tokens-and-context-window', track: 'foundations', title: 'Tokens and context windows' },
  { slug: 'transformers-explained', track: 'foundations', title: 'Transformers and attention' },
  { slug: 'key-ai-papers', track: 'foundations', title: 'The papers that built modern AI' },
  {
    slug: 'how-llms-are-trained',
    track: 'foundations',
    title: 'How ChatGPT and Claude are trained',
  },
  { slug: 'reasoning-models', track: 'foundations', title: 'Reasoning models and thinking' },
  { slug: 'multimodal-ai', track: 'foundations', title: 'How AI sees, hears and speaks' },
  { slug: 'first-prompt', track: 'use', title: 'Your first prompt' },
  { slug: 'prompt-engineering', track: 'use', title: 'Prompting techniques that work' },
  { slug: 'ai-output-levers', track: 'use', title: 'The levers that make answers better' },
  { slug: 'context-engineering', track: 'use', title: 'Context engineering' },
  { slug: 'ai-hallucinations', track: 'use', title: 'Why AI makes things up' },
  { slug: 'choosing-an-ai-model', track: 'use', title: 'ChatGPT vs Claude vs Gemini' },
  { slug: 'ai-for-interview-prep', track: 'use', title: 'Use AI to prepare for interviews' },
  { slug: 'what-is-an-api', track: 'build', title: 'What is an API?' },
  { slug: 'tool-calling', track: 'build', title: 'Tool calling (function calling)' },
  { slug: 'embeddings-and-rag', track: 'build', title: 'Embeddings and RAG' },
  { slug: 'what-is-mcp', track: 'build', title: 'What is MCP?' },
  { slug: 'ai-agents', track: 'build', title: 'What is an AI agent?' },
  { slug: 'agent-skills', track: 'build', title: 'What are Agent Skills?' },
  { slug: 'multi-agent-systems', track: 'build', title: 'Subagents and multi-agent systems' },
  { slug: 'ai-evals', track: 'build', title: 'Evals: does your AI work?' },
  { slug: 'voice-ai-agents', track: 'build', title: 'How voice AI agents work' },
  { slug: 'run-llm-locally', track: 'build', title: 'Open models: run an LLM on your laptop' },
  { slug: 'n8n-ai-automation', track: 'automate', title: 'Your first AI automation in n8n' },
  { slug: 'vibe-coding', track: 'automate', title: 'Vibe coding: apps without code' },
  { slug: 'claude-code', track: 'automate', title: 'Claude Code for beginners' },
  { slug: 'cursor', track: 'automate', title: 'Cursor for beginners' },
  { slug: 'openai-codex', track: 'automate', title: 'OpenAI Codex for beginners' },
  { slug: 'ai-coding-tools-compared', track: 'automate', title: 'Claude Code vs Cursor vs Codex' },
  { slug: 'fine-tuning-vs-rag', track: 'deeper', title: 'Prompting vs RAG vs fine-tuning' },
  { slug: 'ai-safety-and-alignment', track: 'deeper', title: 'AI safety and alignment' },
  {
    slug: 'build-an-llm-from-scratch',
    track: 'deeper',
    title: "Build an LLM with Karpathy's Zero to Hero",
  },
  {
    slug: 'best-free-ai-courses',
    track: 'deeper',
    title: 'Best free AI courses and who to learn from',
  },
]
