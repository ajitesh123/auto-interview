import type { Metadata } from 'next'
import ConceptsPage from '@/components/roleConcepts/ConceptsPage'
import { ROLE_HUBS } from '@/data/roleHubs'
import { ROLE_CONCEPTS } from '@/data/roleConcepts'

const hub = ROLE_HUBS['data-analyst']
const c = ROLE_CONCEPTS['data-analyst']
const url = `https://www.autointerviewai.com/${hub.slug}/concepts`
const image = `https://www.autointerviewai.com${hub.visuals?.og ?? '/static/images/Auto-interview-thumbnail.png'}`

export const metadata: Metadata = {
  title: c.metaTitle,
  description: c.metaDescription,
  alternates: { canonical: url },
  openGraph: {
    title: c.metaTitle,
    description: c.metaDescription,
    url,
    siteName: 'Auto Interview AI',
    type: 'article',
    images: [{ url: image, width: 1200, height: 630, alt: c.h1 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: c.metaTitle,
    description: c.metaDescription,
    images: [image],
  },
}

export default function Page() {
  return <ConceptsPage hub={hub} c={c} />
}
