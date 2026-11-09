import type { Metadata } from 'next'
import BatchHub from '@/components/pgCourse/batch/BatchHub'

const url = 'https://www.autointerviewai.com/paul-graham/yc-batch'
const image = 'https://www.autointerviewai.com/static/images/Auto-interview-thumbnail.png'
const title = 'The 12-Week YC Challenge: Run a YC Batch on Your Own'
const description =
  'What happens inside Y Combinator each week of its 3-month batch, and a free 12-week challenge to do it yourself: weekly updates, partner frameworks, Demo Day.'

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'what happens at YC',
    'YC batch',
    'Y Combinator program',
    'YC batch schedule',
    'YC group office hours',
    'YC weekly update',
    'YC Demo Day',
    '12 week YC challenge',
    'YC startup challenge',
    'Y Combinator curriculum',
  ],
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    url,
    siteName: 'Auto Interview AI',
    type: 'website',
    images: [{ url: image, width: 1200, height: 630, alt: 'The 12-week YC challenge' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: [image] },
}

export default function Page() {
  return <BatchHub />
}
