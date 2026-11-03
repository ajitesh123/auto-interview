import type { Metadata } from 'next'
import RoleHubPage from '@/components/roleHub/RoleHubPage'
import { ROLE_HUBS } from '@/data/roleHubs'

const hub = ROLE_HUBS['gtm-engineer']
const url = `https://www.autointerviewai.com/${hub.slug}`
const image = `https://www.autointerviewai.com${hub.visuals?.og ?? '/static/images/Auto-interview-thumbnail.png'}`

export const metadata: Metadata = {
  title: hub.metaTitle,
  description: hub.metaDescription,
  keywords: hub.keywords,
  alternates: { canonical: url },
  openGraph: {
    title: hub.metaTitle,
    description: hub.metaDescription,
    url,
    siteName: 'Auto Interview AI',
    type: 'article',
    images: [{ url: image, width: 1200, height: 630, alt: `${hub.roleName} interview prep` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: hub.metaTitle,
    description: hub.metaDescription,
    images: [image],
  },
}

export default function Page() {
  return <RoleHubPage hub={hub} />
}
