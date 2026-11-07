import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import LessonPage from '@/components/learnAi/LessonPage'
import { LESSONS, getLesson } from '@/data/learnAi'

const SITE = 'https://www.autointerviewai.com'
const image = `${SITE}/static/images/Auto-interview-thumbnail.png`

export const dynamicParams = false

export function generateStaticParams() {
  return LESSONS.map((l) => ({ slug: l.slug }))
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await props.params
  const lesson = getLesson(slug)
  if (!lesson) return {}
  const url = `${SITE}/learn-ai/${lesson.slug}`
  return {
    title: lesson.metaTitle,
    description: lesson.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: lesson.metaTitle,
      description: lesson.metaDescription,
      url,
      siteName: 'Auto Interview AI',
      type: 'article',
      images: [{ url: image, width: 1200, height: 630, alt: lesson.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: lesson.metaTitle,
      description: lesson.metaDescription,
      images: [image],
    },
  }
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const lesson = getLesson(slug)
  if (!lesson) notFound()
  return <LessonPage lesson={lesson} />
}
