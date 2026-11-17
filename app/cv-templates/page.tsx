import { Metadata } from 'next'
import CVTemplatesPage, { CV_FAQ } from '@/components/CVTemplatesPage'
import DomainLayout from '@/components/domain/DomainLayout'
import { ROLE_HUB_LIST } from '@/data/roleHubs'
import { ROLE_KITS } from '@/data/roleKits'

const URL = 'https://www.autointerviewai.com/cv-templates'
const TITLE = 'Free Resume (CV) Templates in Word: By Role + Harvard (2026)'
const DESC =
  "Free one-page Word resume (CV) templates for 10 roles in the Indian table format, plus Harvard's bullet template. One column, plain text, ATS-readable. No sign-up."
const IMG = 'https://www.autointerviewai.com/static/images/Auto-interview-thumbnail.png'

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  keywords:
    'free resume template, cv template word, ATS friendly resume template, one-page resume template, Indian CV format, harvard resume template, resume template docx, fresher resume template',
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: URL,
    siteName: 'Auto Interview AI',
    images: [{ url: IMG, width: 1200, height: 630, alt: 'Free resume (CV) templates in Word' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESC,
    images: [IMG],
    creator: '@ajiteshleo',
  },
}

export default function Page() {
  const kitRoles = ROLE_HUB_LIST.filter((h) => ROLE_KITS[h.slug])
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Free resume (CV) templates in Word',
    url: URL,
    numberOfItems: kitRoles.length + 1,
    itemListElement: [
      ...kitRoles.map((h, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'DigitalDocument',
          name: `${h.roleName} resume (CV) template (Word)`,
          fileFormat: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          isAccessibleForFree: true,
          url: `https://www.autointerviewai.com/downloads/resume-templates/${h.slug}-resume-template.docx`,
          author: { '@type': 'Organization', name: 'Auto Interview AI' },
        },
      })),
      {
        '@type': 'ListItem',
        position: kitRoles.length + 1,
        item: {
          '@type': 'DigitalDocument',
          name: 'Harvard College bullet point resume template (Word)',
          fileFormat: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          isAccessibleForFree: true,
          author: {
            '@type': 'Organization',
            name: 'Harvard FAS Mignone Center for Career Success',
          },
          url: 'https://cdn-careerservices.fas.harvard.edu/wp-content/uploads/sites/161/2025/09/2025-template_bullet.docx',
        },
      },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: CV_FAQ.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <DomainLayout currentPath="/cv-templates">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <CVTemplatesPage />
    </DomainLayout>
  )
}
