import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import WeekPage from '@/components/pgCourse/batch/WeekPage'
import { BATCH_BASE, BATCH_WEEKS, getWeek } from '@/data/pgCourse/batch'

const SITE = 'https://www.autointerviewai.com'
const image = `${SITE}/static/images/Auto-interview-thumbnail.png`

export const dynamicParams = false

export function generateStaticParams() {
  return BATCH_WEEKS.map((w) => ({ week: w.slug }))
}

export async function generateMetadata(props: {
  params: Promise<{ week: string }>
}): Promise<Metadata> {
  const { week: slug } = await props.params
  const week = getWeek(slug)
  if (!week) return {}
  const url = `${SITE}${BATCH_BASE}/${week.slug}`
  return {
    title: week.metaTitle,
    description: week.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: week.metaTitle,
      description: week.metaDescription,
      url,
      siteName: 'Auto Interview AI',
      type: 'article',
      images: [{ url: image, width: 1200, height: 630, alt: `Week ${week.week}: ${week.title}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: week.metaTitle,
      description: week.metaDescription,
      images: [image],
    },
  }
}

export default async function Page(props: { params: Promise<{ week: string }> }) {
  const { week: slug } = await props.params
  const week = getWeek(slug)
  if (!week) notFound()
  return <WeekPage week={week} />
}
