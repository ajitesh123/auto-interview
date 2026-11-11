// Learn AI registry. Lesson files are picked up by scripts/learn-ai/gen-index.mjs
// (writes registry.generated.ts); the order on the site comes from PLAN in tracks.ts.
import type { Lesson, LessonVideo, TrackId } from './types'
import { PLAN, TRACKS } from './tracks'
import { LESSON_LIST } from './registry.generated'

export { PLAN, TRACKS }
export type { Lesson, LessonVideo, TrackId }

const bySlug = new Map(LESSON_LIST.map((l) => [l.slug, l]))

/** Published lessons, in PLAN order, numbered 1..N (only PLAN slugs that have a file). */
export const LESSONS: Lesson[] = PLAN.filter((p) => bySlug.has(p.slug)).map((p, i) => ({
  ...(bySlug.get(p.slug) as Lesson),
  track: p.track,
  order: i + 1,
}))

const index = new Map(LESSONS.map((l, i) => [l.slug, i]))

export const getLesson = (slug: string): Lesson | undefined => {
  const i = index.get(slug)
  return i === undefined ? undefined : LESSONS[i]
}

export const getNeighbours = (slug: string): { prev?: Lesson; next?: Lesson } => {
  const i = index.get(slug)
  if (i === undefined) return {}
  return { prev: LESSONS[i - 1], next: LESSONS[i + 1] }
}

export const lessonsByTrack = (track: TrackId): Lesson[] => LESSONS.filter((l) => l.track === track)

export const getTrack = (track: TrackId) => TRACKS.find((t) => t.id === track) ?? TRACKS[0]

export const TOTAL_MINUTES = LESSONS.reduce((n, l) => n + l.minutes, 0)

/** The best videos across the path: deduped, Karpathy first, then 3Blue1Brown, then the rest. */
export function topVideos(limit = 8): (LessonVideo & { lesson: Lesson })[] {
  const seen = new Set<string>()
  const all: (LessonVideo & { lesson: Lesson })[] = []
  for (const l of LESSONS)
    for (const v of l.videos)
      if (!seen.has(v.youtubeId)) {
        seen.add(v.youtubeId)
        all.push({ ...v, lesson: l })
      }
  const rank = (c: string) =>
    /karpathy/i.test(c)
      ? 0
      : /3blue1brown/i.test(c)
        ? 1
        : /anthropic|openai|google/i.test(c)
          ? 2
          : 3
  return all
    .map((v, i) => ({ v, i }))
    .sort((a, b) => rank(a.v.channel) - rank(b.v.channel) || a.i - b.i)
    .slice(0, limit)
    .map(({ v }) => v)
}

/** Original ideas from the people who built AI, across all lessons (deduped by person + work). */
export function sourceVoices() {
  const seen = new Set<string>()
  const out: { who: string; role: string; work: string; url: string; lesson: Lesson }[] = []
  for (const l of LESSONS)
    for (const s of l.fromTheSource ?? []) {
      const k = `${s.who}|${s.work}`
      if (seen.has(k)) continue
      seen.add(k)
      out.push({ who: s.who, role: s.role, work: s.work, url: s.url, lesson: l })
    }
  return out
}

/**
 * What the path should add next. The recurring build picks 1–2 per run, researches them
 * (primary sources, verified YouTube IDs), writes the lesson, adds it to PLAN, and adds any
 * new gaps it found back here. The path is meant to keep growing.
 */
export const LEARN_AI_BACKLOG: string[] = [
  'Diffusion models in depth: how image and video generators work',
  'AI image prompting: getting good images from Midjourney, Gemini and ChatGPT',
  'AI video and music generation: what works today',
  'LLM inference and GPUs: why AI is expensive to run',
  'Speculative decoding and other tricks that make models faster',
  'Knowledge graphs and GraphRAG',
  'AI ethics and bias: where models go wrong and why',
  'AI in Indian languages: Hindi, Tamil and Indic models',
  'NotebookLM and Gemini deep dive for studying',
  'Computer-use agents: AI that clicks and types for you',
  'AI for sales and GTM: research, outreach and call prep',
  'AI product management: how to spec and ship an AI feature',
  'Memory in AI assistants: how chatbots remember you',
  'Small language models and on-device AI',
  'Scaling laws explained: why bigger models got better',
  'Interpretability: looking inside a neural network',
  'Open-weight vs closed models: what "open weights" and model licences mean',
  'AI agent security for teams: permissions, approvals and audit logs',
  'AI in cybersecurity: how defenders and attackers use models',
  'Quantization explained: 4-bit, GGUF and MXFP4, and why model files shrink',
  'AI for PowerPoint and Word: Copilot, Gemini and the Claude and ChatGPT add-ins',
  'Python in Excel (=PY) for non-coders: when a formula is not enough',
]
