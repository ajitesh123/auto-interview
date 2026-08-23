import { Metadata } from 'next'
import DomainHomePage from '@/components/domain/DomainHomePage'

export const metadata: Metadata = {
  title:
    'Auto Interview AI — Your Dream Job, Engineered | CV Templates, Resources & Mock Interviews',
  description:
    'The one-stop platform for cracking your dream job. Download ATS-optimized CV templates from Harvard and IIM-A, access domain-specific interview resources, practice with AI mock interviews, and join career communities. Free, ungated, built for the ambitious.',
  keywords:
    'Auto Interview AI, CV templates, ATS resume template, Harvard resume template, IIM Ahmedabad resume, MBA interview resources, consulting casebook, mock interview AI, career preparation, job cracking platform, free resume download, interview practice, career intelligence',
  openGraph: {
    title: 'Auto Interview AI — Your Dream Job, Engineered',
    description:
      'CV templates, domain-specific resources, AI mock interviews, and career communities. Everything you need to crack your next role — in one place.',
    type: 'website',
    url: 'https://www.autointerviewai.com',
    images: [
      {
        url: 'https://www.autointerviewai.com/static/images/Auto-interview-thumbnail.png',
        width: 1200,
        height: 630,
        alt: 'Auto Interview AI — Your Dream Job, Engineered',
      },
    ],
  },
  twitter: {
    title: 'Auto Interview AI — Your Dream Job, Engineered',
    description:
      'CV templates, resources, mock interviews & communities. Crack your dream job — free.',
    images: ['https://www.autointerviewai.com/static/images/Auto-interview-thumbnail.png'],
    creator: '@ajiteshleo',
  },
  alternates: {
    canonical: 'https://www.autointerviewai.com',
  },
}

export default function Page() {
  const homepageFaqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Auto Interview AI?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Auto Interview AI is a free career intelligence and job preparation platform offering battle-tested CV templates (Harvard, IIM-A, Resume Worded), domain-specific interview resources & casebooks, AI-driven mock interviews, and role-specific peer communities.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does Auto Interview AI help crack job interviews?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Auto Interview AI covers the three critical phases of hiring: 1) Stellar ATS-compliant CVs that pass recruiters filters, 2) Curated domain study kits and casebooks to master the technical material, and 3) Adaptive AI mock interviews for realistic live practice.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are all templates and resources completely free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Auto Interview AI is 100% free with zero paywalls, zero gatekeeping, and no mandatory subscriptions.',
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageFaqSchema) }}
      />
      <DomainHomePage />
    </>
  )
}
