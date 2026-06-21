import { Metadata } from 'next'
import DomainHomePage from '@/components/domain/DomainHomePage'

export const metadata: Metadata = {
  title: 'Auto Interview AI — Domain-Specific Interview Preparation',
  description:
    'Free interview preparation resources organized by domain. Access MBA, Engineering, B.Com, and CA interview guides, case frameworks, and practice materials. Download resources, practice mock interviews, and build AI-optimized resumes.',
  keywords:
    'interview preparation, MBA interview prep, engineering interview resources, mock interview, resume builder, case interview framework, interview practice, career preparation, Auto Interview AI',
  openGraph: {
    title: 'Auto Interview AI — Domain-Specific Interview Preparation',
    description:
      'Free interview preparation resources organized by domain. MBA, Engineering, B.Com, CA — case frameworks, practice guides, and more.',
    type: 'website',
    url: 'https://www.autointerviewai.com',
    images: [
      {
        url: 'https://www.autointerviewai.com/static/images/Auto-interview-thumbnail.png',
        width: 1200,
        height: 630,
        alt: 'Auto Interview AI — Domain-Specific Interview Preparation',
      },
    ],
  },
  twitter: {
    title: 'Auto Interview AI — Domain-Specific Interview Preparation',
    description:
      'Free interview prep resources by domain. MBA, Engineering, B.Com, CA — case frameworks, guides, mock interviews.',
    images: ['https://www.autointerviewai.com/static/images/Auto-interview-thumbnail.png'],
  },
  alternates: {
    canonical: 'https://www.autointerviewai.com',
  },
}

export default function Page() {
  return <DomainHomePage />
}
