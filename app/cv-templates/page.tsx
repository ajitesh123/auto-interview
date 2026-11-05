import { Metadata } from 'next'
import CVTemplatesPage from '@/components/CVTemplatesPage'
import DomainLayout from '@/components/domain/DomainLayout'
import Link from 'next/link'
import { ROLE_HUBS } from '@/data/roleHubs'
import { ROLE_KITS, KIT_PATHS } from '@/data/roleKits'

export const metadata: Metadata = {
  title: 'Free ATS Resume Templates (2026): Harvard & Consulting',
  description:
    'Download free, ATS-optimized resume templates from Harvard University, IIM Ahmedabad, and Resume Worded. 100% free, ungated DOCX & Google Docs formats proven to pass applicant tracking systems.',
  keywords:
    'free ATS resume template, Harvard resume template, IIM Ahmedabad resume format, Resume Worded template, best resume format 2025, ATS friendly resume, free resume download, MBA CV template, tech resume template, consulting resume format, investment banking resume',
  alternates: {
    canonical: 'https://www.autointerviewai.com/cv-templates',
  },
  openGraph: {
    title: 'Free ATS Resume Templates — Harvard, IIM Ahmedabad & Resume Worded',
    description:
      'Download free, ATS-optimized resume templates from Harvard, IIM Ahmedabad, and Resume Worded. Proven formats that pass every applicant tracking system.',
    url: 'https://www.autointerviewai.com/cv-templates',
    siteName: 'Auto Interview AI',
    images: [
      {
        url: 'https://www.autointerviewai.com/static/images/Auto-interview-thumbnail.png',
        width: 1200,
        height: 630,
        alt: 'Free ATS Resume Templates — Harvard, IIM Ahmedabad & Resume Worded',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free ATS Resume Templates — Harvard, IIM Ahmedabad & Resume Worded',
    description:
      'Download free, ATS-optimized resume templates from Harvard, IIM Ahmedabad, and Resume Worded. 100% free and ungated.',
    images: ['https://www.autointerviewai.com/static/images/Auto-interview-thumbnail.png'],
    creator: '@ajiteshleo',
  },
}

export default function Page() {
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'ATS-Optimized Resume & CV Templates',
    description:
      'Curated free resume templates from Harvard University, IIM Ahmedabad, and Resume Worded.',
    url: 'https://www.autointerviewai.com/cv-templates',
    numberOfItems: 3,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'DigitalDocument',
          name: 'Harvard University Resume Template (DOCX)',
          description:
            'The gold standard of resume formatting for MBA and business leadership positions.',
          fileFormat: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          isAccessibleForFree: true,
          author: {
            '@type': 'Organization',
            name: 'Harvard University FAS Career Services',
          },
          url: 'https://cdn-careerservices.fas.harvard.edu/wp-content/uploads/sites/161/2025/09/2025-template_bullet.docx',
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@type': 'DigitalDocument',
          name: 'IIM Ahmedabad Resume Template (Google Docs)',
          description:
            'Clean, structured, and recruiter-approved format for elite business and management roles.',
          fileFormat: 'application/vnd.google-apps.document',
          isAccessibleForFree: true,
          author: {
            '@type': 'Organization',
            name: 'IIM Ahmedabad',
          },
          url: 'https://docs.google.com/document/d/1AVi3XeRchX1VkuRta5Jiy1zhMJz0S3qa/edit',
        },
      },
      {
        '@type': 'ListItem',
        position: 3,
        item: {
          '@type': 'DigitalDocument',
          name: 'Resume Worded ATS-Optimized Template (Google Docs)',
          description: 'Optimized for machine readability and modern Applicant Tracking Systems.',
          fileFormat: 'application/vnd.google-apps.document',
          isAccessibleForFree: true,
          author: {
            '@type': 'Organization',
            name: 'Resume Worded',
          },
          url: 'https://docs.google.com/document/d/1tbnWMFkKT0c4Mh_IKhrobi_yK8qtjL6vkCgvXWCIKI0/edit?tab=t.0',
        },
      },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Why are Harvard and IIM Ahmedabad resume templates ATS-friendly?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'These templates use single-column layouts, standard font typography, clean chronological sections, and zero non-parseable elements (like complex tables, multi-column text boxes, or graphics), ensuring 99%+ parsing accuracy across all major Applicant Tracking Systems (Workday, Taleo, Greenhouse, Lever).',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I submit my resume in DOCX or PDF format for ATS?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Both DOCX and cleanly exported PDFs work well. DOCX has slightly higher compatibility across legacy ATS engines, while standard single-column PDFs preserve exact visual formatting across all devices.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are these CV templates completely free to download?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. All CV templates on Auto Interview AI are 100% free, ungated, and require no account registration or payment.',
        },
      },
    ],
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
      <section
        aria-labelledby="new-age-cv"
        className="mx-auto -mt-16 w-full max-w-[1100px] px-5 pb-16 md:px-8"
      >
        <h2 id="new-age-cv" className="text-h2 font-semibold text-fg">
          Resume (CV) and recommendation letter guides for new-age roles
        </h2>
        <p className="mt-2 max-w-2xl text-body text-fg-2">
          Bullet banks, keywords from real job posts, a sample one-page resume and a sample letter
          of recommendation for each role.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Object.keys(ROLE_KITS)
            .filter((slug) => ROLE_HUBS[slug])
            .map((slug) => (
              <li key={slug} className="rounded-xl border border-border bg-surface p-5">
                <div className="text-h4 font-semibold text-fg">{ROLE_HUBS[slug].roleName}</div>
                <div className="mt-2 flex flex-col gap-1 text-small">
                  <Link
                    href={KIT_PATHS.resume(slug)}
                    className="font-medium text-signal-strong hover:underline"
                  >
                    {ROLE_HUBS[slug].roleName} resume (CV) and Word template
                  </Link>
                  <Link
                    href={KIT_PATHS.lor(slug)}
                    className="font-medium text-signal-strong hover:underline"
                  >
                    Letter of recommendation for {ROLE_HUBS[slug].shortName}
                  </Link>
                </div>
              </li>
            ))}
        </ul>
      </section>
    </DomainLayout>
  )
}
