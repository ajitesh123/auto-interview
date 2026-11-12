import type { Metadata } from 'next'
import CoverLetterKitPage from '@/components/roleCoverLetters/CoverLetterKitPage'
import { ROLE_HUBS } from '@/data/roleHubs'
import { ROLE_COVER_LETTERS, coverLetterPath, fillCounts } from '@/data/roleCoverLetters'

const hub = ROLE_HUBS['data-analyst']
const raw = ROLE_COVER_LETTERS['data-analyst']
const kit = { ...raw, metaDescription: fillCounts(raw, raw.metaDescription) }
const url = `https://www.autointerviewai.com${coverLetterPath(hub.slug)}`
const image = `https://www.autointerviewai.com${hub.visuals?.og ?? '/static/images/Auto-interview-thumbnail.png'}`

export const metadata: Metadata = {
  title: kit.metaTitle,
  description: kit.metaDescription,
  alternates: { canonical: url },
  openGraph: {
    title: kit.metaTitle,
    description: kit.metaDescription,
    url,
    siteName: 'Auto Interview AI',
    type: 'article',
    images: [{ url: image, width: 1200, height: 630, alt: kit.h1 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: kit.metaTitle,
    description: kit.metaDescription,
    images: [image],
  },
}

export default function Page() {
  return <CoverLetterKitPage hub={hub} kit={kit} />
}
