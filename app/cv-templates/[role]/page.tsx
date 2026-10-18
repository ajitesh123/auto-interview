import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import DomainLayout from '@/components/domain/DomainLayout'
import { CV_ROLES, CVRoleData } from '@/data/cvRolesData'

interface PageProps {
  params: Promise<{
    role: string
  }>
}

export async function generateStaticParams() {
  return Object.keys(CV_ROLES).map((role) => ({
    role,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { role } = await params
  const roleData = CV_ROLES[role]

  if (!roleData) {
    return {
      title: 'Resume Template Not Found',
    }
  }

  return {
    title: roleData.metaTitle,
    description: roleData.metaDescription,
    keywords: [
      `${roleData.roleName} resume template`,
      `${roleData.roleName} cv format`,
      `free ${roleData.roleName} resume docx`,
      `ats friendly ${roleData.roleName} resume`,
      'harvard resume template',
      'ats score checker',
    ],
    alternates: {
      canonical: `https://www.autointerviewai.com/cv-templates/${roleData.slug}`,
    },
    openGraph: {
      title: roleData.metaTitle,
      description: roleData.metaDescription,
      url: `https://www.autointerviewai.com/cv-templates/${roleData.slug}`,
      siteName: 'Auto Interview AI',
      images: [
        {
          url: 'https://www.autointerviewai.com/static/images/Auto-interview-thumbnail.png',
          width: 1200,
          height: 630,
          alt: `${roleData.roleName} Resume Template`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: roleData.metaTitle,
      description: roleData.metaDescription,
      images: ['https://www.autointerviewai.com/static/images/Auto-interview-thumbnail.png'],
      creator: '@ajiteshleo',
    },
  }
}

export default async function RoleCVPage({ params }: PageProps) {
  const { role } = await params
  const roleData = CV_ROLES[role]

  if (!roleData) {
    notFound()
  }

  const allRoles = Object.values(CV_ROLES)

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: roleData.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  }

  const documentSchema = {
    '@context': 'https://schema.org',
    '@type': 'DigitalDocument',
    name: `${roleData.roleName} ATS Resume Template`,
    description: roleData.metaDescription,
    fileFormat: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    isAccessibleForFree: true,
    url: `https://www.autointerviewai.com/cv-templates/${roleData.slug}`,
    author: {
      '@type': 'Organization',
      name: 'Harvard University FAS & Auto Interview AI',
    },
  }

  return (
    <DomainLayout currentPath="/cv-templates">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(documentSchema) }}
      />

      <div className="min-h-screen bg-[#fafafa] px-4 pb-32 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-16">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-xs font-medium text-[#666666]">
            <Link href="/" className="transition-colors hover:text-[#171717]">
              Home
            </Link>
            <span>/</span>
            <Link href="/cv-templates" className="transition-colors hover:text-[#171717]">
              CV Templates
            </Link>
            <span>/</span>
            <span className="font-semibold text-[#171717]">{roleData.roleName}</span>
          </nav>

          {/* Header Section */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ebebeb] bg-white px-3 py-1 font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717] shadow-sm">
              <span>{roleData.category}</span>
              <span className="text-[#999999]">•</span>
              <span className="font-bold text-[#297a3a]">100% Free & Ungated</span>
            </div>
            <h1 className="text-4xl font-normal leading-[1.08] tracking-tight text-[#171717] sm:text-5xl md:text-[52px]">
              {roleData.heroTitle}
            </h1>
            <p className="max-w-3xl text-base leading-relaxed text-[#4d4d4d] sm:text-lg">
              {roleData.heroDescription}
            </p>
          </div>

          {/* Download Action Cards Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Primary Harvard DOCX Card */}
            <div className="flex flex-col justify-between rounded-[8px] border border-[#ebebeb] bg-white p-7 shadow-sm transition-all hover:shadow-md">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="rounded bg-[#f5f5f5] px-2.5 py-1 font-mono text-[11px] uppercase text-[#171717]">
                    DOCX (Microsoft Word)
                  </span>
                  <span className="inline-flex items-center font-mono text-[11px] font-semibold uppercase text-[#297a3a]">
                    ✓ 99.8% ATS Pass Rate
                  </span>
                </div>
                <h2 className="text-2xl font-normal tracking-tight text-[#171717]">
                  Harvard FAS Classic Format
                </h2>
                <p className="text-sm leading-relaxed text-[#4d4d4d]">
                  The globally verified single-column format recommended by Harvard Career Services.
                  Zero unreadable tables, zero header/footer trap zones. Fully editable in Word,
                  LibreOffice, and Pages.
                </p>
                <div className="rounded-md bg-[#fafafa] p-3 text-xs text-[#666666]">
                  <strong>Ideal for:</strong> {roleData.roleName} applications to Fortune 500,
                  FAANG, and enterprise Applicant Tracking Systems (Workday, Taleo, Greenhouse).
                </div>
              </div>

              <div className="mt-6 border-t border-[#ebebeb] pt-5">
                <a
                  href={roleData.docxUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-[6px] bg-[#171717] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#333333]"
                >
                  Download Free DOCX
                  <svg
                    className="ml-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Google Docs Cloud Card */}
            <div className="flex flex-col justify-between rounded-[8px] border border-[#ebebeb] bg-white p-7 shadow-sm transition-all hover:shadow-md">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="rounded bg-[#f5f5f5] px-2.5 py-1 font-mono text-[11px] uppercase text-[#171717]">
                    Google Docs
                  </span>
                  <span className="inline-flex items-center font-mono text-[11px] font-semibold uppercase text-[#297a3a]">
                    ✓ 1-Click Copy
                  </span>
                </div>
                <h2 className="text-2xl font-normal tracking-tight text-[#171717]">
                  Cloud ATS-Optimized Master
                </h2>
                <p className="text-sm leading-relaxed text-[#4d4d4d]">
                  Clean, cloud-accessible template ready to duplicate directly into your personal
                  Google Drive with <em>File &rarr; Make a copy</em>. Pre-formatted with exact
                  0.5-inch margins and standard hierarchy.
                </p>
                <div className="rounded-md bg-[#fafafa] p-3 text-xs text-[#666666]">
                  <strong>Format:</strong> Web Google Doc with standard web-safe Arial/Calibri font
                  styling and bullet point indentations.
                </div>
              </div>

              <div className="mt-6 border-t border-[#ebebeb] pt-5">
                <a
                  href={roleData.gdocsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-[6px] border border-[#171717] bg-white px-5 py-3 text-sm font-medium text-[#171717] transition-colors hover:bg-[#f5f5f5]"
                >
                  Open in Google Docs
                  <svg
                    className="ml-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* ATS Keyword Cloud Matrix */}
          <div className="rounded-[8px] border border-[#ebebeb] bg-white p-8 shadow-sm">
            <div className="mb-4 flex flex-col justify-between sm:flex-row sm:items-center">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717]">
                  KEYWORD MATCHING
                </p>
                <h2 className="mt-1 text-2xl font-normal tracking-tight text-[#171717]">
                  Must-Have {roleData.roleName} ATS Keywords
                </h2>
              </div>
              <span className="mt-2 text-xs text-[#666666] sm:mt-0">
                Scored by automated resume parsers
              </span>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-[#4d4d4d]">
              Recruiter screening algorithms search specifically for these exact keyword strings.
              Naturally incorporate 6 to 10 of these terms across your experience bullet points and
              skills summary:
            </p>
            <div className="flex flex-wrap gap-2.5">
              {roleData.atsKeywords.map((kw, i) => (
                <span
                  key={i}
                  className="rounded-md border border-[#e0e0e0] bg-[#fafafa] px-3 py-1.5 font-mono text-xs font-medium text-[#171717] transition-colors hover:border-[#171717] hover:bg-white"
                >
                  + {kw}
                </span>
              ))}
            </div>
          </div>

          {/* High-Impact Sample Bullets (Google X-Y-Z Formula) */}
          <div className="space-y-6">
            <div className="border-b border-[#ebebeb] pb-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717]">
                EXPERIENCE BULLET BANK
              </p>
              <h2 className="mt-1 text-2xl font-normal tracking-tight text-[#171717]">
                Proven {roleData.roleName} Bullets (Google X-Y-Z Formula)
              </h2>
              <p className="mt-1 text-sm text-[#4d4d4d]">
                Top recruiters look for the formula:{' '}
                <em>&ldquo;Accomplished [X], as measured by [Y], by doing [Z]&rdquo;</em>. Copy and
                adapt these high-converting examples:
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {roleData.sampleBullets.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-[8px] border border-[#ebebeb] bg-white p-6 shadow-sm"
                >
                  <div className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#171717]">
                    {idx + 1}. {item.heading}
                  </div>
                  <p className="text-sm leading-relaxed text-[#171717]">&bull; {item.bullet}</p>
                  <div className="mt-3 flex items-center gap-2 rounded bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-800">
                    <span className="font-bold">Metric Proof:</span>
                    <span>{item.metric}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Matrix */}
          <div className="rounded-[8px] border border-[#ebebeb] bg-white p-8 shadow-sm">
            <div className="mb-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717]">
                SKILLS TAXONOMY
              </p>
              <h2 className="mt-1 text-2xl font-normal tracking-tight text-[#171717]">
                Recommended {roleData.roleName} Skills Section
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {roleData.skillsMatrix.map((matrix, idx) => (
                <div key={idx} className="rounded-md border border-[#ebebeb] p-5">
                  <h3 className="mb-3 text-sm font-semibold text-[#171717]">{matrix.category}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {matrix.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="rounded bg-[#f5f5f5] px-2.5 py-1 text-xs text-[#333333]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Do's and Don'ts */}
          <div className="space-y-6">
            <div className="border-b border-[#ebebeb] pb-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717]">
                RECRUITER AUDIT
              </p>
              <h2 className="mt-1 text-2xl font-normal tracking-tight text-[#171717]">
                Resume Do&apos;s &amp; Don&apos;ts for {roleData.roleName}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {roleData.dosAndDonts.map((rule, idx) => (
                <React.Fragment key={idx}>
                  <div className="rounded-[8px] border border-emerald-200 bg-emerald-50/50 p-5">
                    <div className="mb-2 flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase text-emerald-800">
                      <span>✓ DO</span>
                    </div>
                    <p className="text-xs leading-relaxed text-emerald-950">{rule.do}</p>
                  </div>
                  <div className="rounded-[8px] border border-red-200 bg-red-50/50 p-5">
                    <div className="mb-2 flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase text-red-800">
                      <span>✕ DON&apos;T</span>
                    </div>
                    <p className="text-xs leading-relaxed text-red-950">{rule.dont}</p>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Funnel Bridge Next Steps */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="flex flex-col justify-between rounded-[8px] border border-[#171717] bg-[#171717] p-8 text-white shadow-md">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-gray-400">
                  STEP 2 / VERIFY
                </span>
                <h3 className="mt-2 text-xl font-normal tracking-tight text-white">
                  Audit Your ATS Score (Free)
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-gray-300">
                  Upload your customized resume to our automated ATS parser to check formatting
                  integrity, keyword density, and get an instant score out of 100.
                </p>
              </div>
              <Link
                href="/ats-score"
                className="mt-6 inline-flex items-center justify-center rounded-[6px] bg-white px-4 py-2.5 text-xs font-semibold text-[#171717] transition-colors hover:bg-gray-100"
              >
                Scan Resume ATS Score &rarr;
              </Link>
            </div>

            <div className="flex flex-col justify-between rounded-[8px] border border-[#ebebeb] bg-white p-8 shadow-sm">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#666666]">
                  STEP 3 / PREPARE
                </span>
                <h3 className="mt-2 text-xl font-normal tracking-tight text-[#171717]">
                  Practice Mock Interview
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#4d4d4d]">
                  Once your resume secures you the screen, practice realistic voice interview
                  questions for {roleData.roleName} with instant AI coaching on clarity and pacing.
                </p>
              </div>
              <Link
                href="/free-mock-interview"
                className="mt-6 inline-flex items-center justify-center rounded-[6px] border border-[#171717] bg-white px-4 py-2.5 text-xs font-semibold text-[#171717] transition-colors hover:bg-[#f5f5f5]"
              >
                Launch Mock Interview Simulator &rarr;
              </Link>
            </div>
          </div>

          {/* FAQs Section */}
          <div className="pt-8">
            <div className="mb-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717]">
                FREQUENTLY ASKED QUESTIONS
              </p>
              <h2 className="mt-1 text-2xl font-normal tracking-tight text-[#171717]">
                {roleData.roleName} Resume FAQs
              </h2>
            </div>
            <div className="space-y-4">
              {roleData.faqs.map((faq, i) => (
                <div
                  key={i}
                  className="rounded-[6px] border border-[#ebebeb] bg-white p-6 shadow-sm"
                >
                  <h3 className="mb-2 text-base font-medium text-[#171717]">{faq.q}</h3>
                  <p className="text-sm leading-relaxed text-[#4d4d4d]">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Role Switcher */}
          <div className="border-t border-[#ebebeb] pt-12">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.071em] text-[#666666]">
              BROWSE OTHER ROLE-SPECIFIC TEMPLATES
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {allRoles
                .filter((r) => r.slug !== roleData.slug)
                .map((r) => (
                  <Link
                    key={r.slug}
                    href={`/cv-templates/${r.slug}`}
                    className="flex flex-col justify-between rounded-md border border-[#ebebeb] bg-white p-4 transition-all hover:border-[#171717] hover:shadow-sm"
                  >
                    <span className="text-xs font-medium text-[#171717]">{r.roleName}</span>
                    <span className="mt-1 text-[10px] text-[#666666]">{r.category} &rarr;</span>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </DomainLayout>
  )
}
