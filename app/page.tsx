import { Metadata } from 'next'
import DomainHomePage from '@/components/domain/DomainHomePage'
import { HOME_FAQS } from '@/components/domain/homeFaqs'

export const metadata: Metadata = {
  title: 'Free ATS CV Templates, Mock Interviews & AI Tools (2026)',
  description:
    'Free interview prep for 10 roles: real reported interview questions, salary data, one-page resume (CV) Word templates, Learn AI lessons, free tools and a free AI mock interview. No signup.',
  keywords:
    'Auto Interview AI, CV templates, ATS resume template, one-page resume template, MBA interview resources, consulting casebook, mock interview AI, career preparation, job cracking platform, free resume download, interview practice, career intelligence',
  openGraph: {
    title: 'Auto Interview AI | Walk into your interview ready',
    description:
      'Free role guides with interview questions and model answers, pay data, one-page CV templates, browser tools, Learn AI lessons and a free AI mock interview.',
    type: 'website',
    url: 'https://www.autointerviewai.com',
    images: [
      {
        url: 'https://www.autointerviewai.com/static/images/Auto-interview-thumbnail.png',
        width: 1200,
        height: 630,
        alt: 'Auto Interview AI | Walk into your interview ready',
      },
    ],
  },
  twitter: {
    title: 'Auto Interview AI | Walk into your interview ready',
    description:
      'Free role guides, interview questions, pay data, CV templates, tools and a free AI mock interview.',
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
    mainEntity: HOME_FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
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
