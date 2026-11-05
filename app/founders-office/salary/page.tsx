import type { Metadata } from 'next'
import SalaryPage from '@/components/roleSalary/SalaryPage'
import { ROLE_HUBS } from '@/data/roleHubs'
import { ROLE_SALARIES } from '@/data/roleSalary'

const hub = ROLE_HUBS['founders-office']
const s = ROLE_SALARIES['founders-office']
const url = `https://www.autointerviewai.com/${hub.slug}/salary`
const image = `https://www.autointerviewai.com${hub.visuals?.og ?? '/static/images/Auto-interview-thumbnail.png'}`

export const metadata: Metadata = {
  title: s.metaTitle,
  description: s.metaDescription,
  alternates: { canonical: url },
  openGraph: {
    title: s.metaTitle,
    description: s.metaDescription,
    url,
    siteName: 'Auto Interview AI',
    type: 'article',
    images: [{ url: image, width: 1200, height: 630, alt: s.h1 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: s.metaTitle,
    description: s.metaDescription,
    images: [image],
  },
}

export default function Page() {
  return <SalaryPage hub={hub} s={s} />
}
