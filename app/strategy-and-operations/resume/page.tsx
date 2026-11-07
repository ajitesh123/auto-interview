import type { Metadata } from 'next'
import ResumeKitPage from '@/components/roleKits/ResumeKitPage'
import { ROLE_HUBS } from '@/data/roleHubs'
import { ROLE_KITS, KIT_PATHS } from '@/data/roleKits'

const hub = ROLE_HUBS['strategy-and-operations']
const kit = ROLE_KITS['strategy-and-operations'].resume
const url = `https://www.autointerviewai.com${KIT_PATHS.resume(hub.slug)}`
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
  return <ResumeKitPage hub={hub} kit={kit} />
}
