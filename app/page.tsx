import { Metadata } from 'next'
import DomainHomePage from '@/components/domain/DomainHomePage'

export const metadata: Metadata = {
  title: 'Auto Interview AI — Career Intelligence Platform | Resources, Mock Interviews & AI Resume Builder',
  description:
    'The definitive career intelligence platform. Free domain-specific interview resources for MBA, Engineering, Commerce & CA. AI mock interviews, and ATS-ready resume builder in 2 minutes. Built for professionals who refuse to be underprepared.',
  keywords:
    'interview preparation, career intelligence, MBA interview prep, engineering interview resources, mock interview AI, resume builder, ATS resume checker, case interview framework, career preparation, Auto Interview AI, free interview resources, job preparation platform',
  openGraph: {
    title: 'Auto Interview AI — Career Intelligence Platform',
    description:
      'Free domain-specific interview resources, AI mock interviews, and ATS-ready resume builder. Built for the ambitious.',
    type: 'website',
    url: 'https://www.autointerviewai.com',
    images: [
      {
        url: 'https://www.autointerviewai.com/static/images/Auto-interview-thumbnail.png',
        width: 1200,
        height: 630,
        alt: 'Auto Interview AI — Career Intelligence Platform',
      },
    ],
  },
  twitter: {
    title: 'Auto Interview AI — Career Intelligence Platform',
    description:
      'Free interview resources by domain. MBA, Engineering, B.Com, CA — plus AI resume builder and mock interviews.',
    images: ['https://www.autointerviewai.com/static/images/Auto-interview-thumbnail.png'],
  },
  alternates: {
    canonical: 'https://www.autointerviewai.com',
  },
}

export default function Page() {
  return <DomainHomePage />
}
