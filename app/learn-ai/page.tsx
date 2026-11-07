import type { Metadata } from 'next'
import LearnAiHub from '@/components/learnAi/LearnAiHub'

const url = 'https://www.autointerviewai.com/learn-ai'
const image = 'https://www.autointerviewai.com/static/images/Auto-interview-thumbnail.png'
const title = 'Learn AI Free: Step-by-Step Path from Beginner to Advanced'
const description =
  'Learn AI free, step by step: LLMs, transformers, prompting, APIs, RAG, MCP, agents, n8n, Claude Code, Cursor and Codex. Short lessons, videos, tasks, no login.'

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'learn AI',
    'learn AI for free',
    'AI for beginners',
    'learn generative AI',
    'AI course free',
    'how to learn AI',
    'LLM explained',
    'AI learning path',
  ],
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    url,
    siteName: 'Auto Interview AI',
    type: 'website',
    images: [{ url: image, width: 1200, height: 630, alt: 'Learn AI step by step' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: [image] },
}

export default function Page() {
  return <LearnAiHub />
}
