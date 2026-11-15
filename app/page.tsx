import { Metadata } from 'next'
import DomainHomePage from '@/components/domain/DomainHomePage'

export const metadata: Metadata = {
  title: 'Free ATS CV Templates, Mock Interviews & AI Tools (2026)',
  description:
    'Free interview prep for 10 roles: real reported interview questions, salary data, one-page resume (CV) Word templates, Learn AI lessons, free tools and a free AI mock interview. No signup.',
  keywords:
    'Auto Interview AI, CV templates, ATS resume template, one-page resume template, MBA interview resources, consulting casebook, mock interview AI, career preparation, job cracking platform, free resume download, interview practice, career intelligence',
  openGraph: {
    title: 'Auto Interview AI | Your Dream Job, Engineered',
    description:
      'CV templates, domain-specific resources, AI mock interviews, and career communities. Everything you need to crack your next role in one place.',
    type: 'website',
    url: 'https://www.autointerviewai.com',
    images: [
      {
        url: 'https://www.autointerviewai.com/static/images/Auto-interview-thumbnail.png',
        width: 1200,
        height: 630,
        alt: 'Auto Interview AI | Your Dream Job, Engineered',
      },
    ],
  },
  twitter: {
    title: 'Auto Interview AI | Your Dream Job, Engineered',
    description:
      'CV templates, resources, mock interviews & communities. Crack your dream job. 100% free.',
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
        name: 'What is Tough Tongue AI?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Tough Tongue AI is the product behind Auto Interview AI: AI voice agents for calls and meetings, and AI sales roleplays where reps talk to an AI buyer and get a scored report. Mock interviews on this site run on it.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is Auto Interview AI?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Auto Interview AI is a free interview-prep site: role guides with reported interview questions, salary pages, one-page resume (CV) templates, Learn AI lessons, free browser tools and a free AI mock interview run on Tough Tongue AI.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does Auto Interview AI help crack job interviews?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Auto Interview AI covers the three critical phases of hiring: 1) one-page resume (CV) templates in a plain format applicant tracking systems can read, 2) Curated domain study kits and casebooks to master the technical material, and 3) Adaptive AI mock interviews for realistic live practice.',
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
