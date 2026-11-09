import type { Metadata } from 'next'
import PgCourseHub from '@/components/pgCourse/PgCourseHub'
import { SIX_MONTH_PLAN } from '@/data/pgCourse/plan'

const url = 'https://www.autointerviewai.com/paul-graham'
const image = 'https://www.autointerviewai.com/static/images/Auto-interview-thumbnail.png'
const title = 'Paul Graham’s Startup Advice: A Free 6-Month Course'
const description =
  'Learn startups from Paul Graham’s essays and talks and how Y Combinator works: ideas, do things that don’t scale, growth, founders, fundraising. Free, sourced.'

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'Paul Graham',
    'Paul Graham essays',
    'Paul Graham startup advice',
    'Y Combinator',
    'what does YC teach',
    'how to start a startup',
    'YC founder mindset',
    'Paul Graham essays reading order',
  ],
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    url,
    siteName: 'Auto Interview AI',
    type: 'website',
    images: [{ url: image, width: 1200, height: 630, alt: 'Learn startups from Paul Graham' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: [image] },
}

export default function Page() {
  return <PgCourseHub months={SIX_MONTH_PLAN} />
}
