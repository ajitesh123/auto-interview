import type { Metadata } from 'next'
import InterviewTipsPage from '@/components/roleInterviewTips/InterviewTipsPage'
import { ROLE_HUBS } from '@/data/roleHubs'
import { ROLE_INTERVIEW_TIPS, interviewTipsPath, fillTips } from '@/data/roleInterviewTips'

const hub = ROLE_HUBS['product-manager']
const t = ROLE_INTERVIEW_TIPS['product-manager']
const description = fillTips(t, t.metaDescription)
const url = `https://www.autointerviewai.com${interviewTipsPath(hub.slug)}`
const image = `https://www.autointerviewai.com${hub.visuals?.og ?? '/static/images/Auto-interview-thumbnail.png'}`

export const metadata: Metadata = {
  title: t.metaTitle,
  description,
  alternates: { canonical: url },
  openGraph: {
    title: t.metaTitle,
    description,
    url,
    siteName: 'Auto Interview AI',
    type: 'article',
    images: [{ url: image, width: 1200, height: 630, alt: t.h1 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: t.metaTitle,
    description,
    images: [image],
  },
}

export default function Page() {
  return <InterviewTipsPage hub={hub} t={t} />
}
