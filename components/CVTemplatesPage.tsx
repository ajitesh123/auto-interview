import React from 'react'
import Link from 'next/link'

export default function CVTemplatesPage() {
  const faqs = [
    {
      q: 'Why are Harvard and IIM Ahmedabad resume templates ATS-friendly?',
      a: 'These templates use single-column layouts, standard font typography, clean chronological sections, and zero non-parseable elements (like complex tables, multi-column text boxes, or graphics), ensuring 99%+ parsing accuracy across all major Applicant Tracking Systems (Workday, Taleo, Greenhouse, Lever).',
    },
    {
      q: 'Should I submit my resume in DOCX or PDF format for ATS?',
      a: 'Both DOCX and cleanly exported PDFs work well. DOCX has slightly higher compatibility across legacy ATS engines, while standard single-column PDFs preserve exact visual formatting across all devices.',
    },
    {
      q: 'Are these CV templates completely free to download?',
      a: 'Yes. All CV templates on Auto Interview AI are 100% free, ungated, and require no account registration or payment.',
    },
  ]

  return (
    <div className="min-h-screen bg-[#fafafa] px-4 pb-32 pt-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-16">
        {/* Header section */}
        <div className="space-y-4">
          <div className="font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717]">
            CV TEMPLATES
          </div>
          <h1 className="text-4xl font-normal leading-[1.05] tracking-tight text-[#171717] sm:text-5xl md:text-[56px]">
            Proven formats that pass every filter.
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-[#4d4d4d] sm:text-lg">
            Download ATS-optimized resume templates from the world&apos;s best institutions. Free,
            ungated, and ready to customize.
          </p>
        </div>

        {/* Grid of templates */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Card 1 — Harvard */}
          <div
            className="flex h-full flex-col rounded-[6px] bg-white p-6 transition-all"
            style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.08)' }}
          >
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between">
                <span
                  className="rounded bg-[#fafafa] px-2 py-1 font-mono text-[10px] uppercase text-[#171717]"
                  style={{ boxShadow: '0 0 0 1px #ebebeb' }}
                >
                  DOCX
                </span>
                <span className="font-mono text-[10px] uppercase text-[#297a3a]">
                  ✓ Verified ATS
                </span>
              </div>
              <h2 className="text-[24px] font-normal leading-tight tracking-[-1px] text-[#171717]">
                Harvard University
              </h2>
              <p className="text-xs font-medium text-[#666666]">Best B-School in the world.</p>
              <p className="text-sm leading-relaxed text-[#4d4d4d]">
                The gold standard of resume formatting. Clean, professional, and guaranteed to parse
                accurately in any ATS engine.
              </p>
            </div>
            <div className="mt-6 border-t border-[#ebebeb] pt-4">
              <a
                href="https://cdn-careerservices.fas.harvard.edu/wp-content/uploads/sites/161/2025/09/2025-template_bullet.docx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-[6px] bg-[#171717] px-4 py-2.5 text-sm text-white transition-colors hover:bg-[#383838]"
              >
                Download DOCX
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Card 2 — IIM Ahmedabad */}
          <div
            className="flex h-full flex-col rounded-[6px] bg-white p-6 transition-all"
            style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.08)' }}
          >
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between">
                <span
                  className="rounded bg-[#fafafa] px-2 py-1 font-mono text-[10px] uppercase text-[#171717]"
                  style={{ boxShadow: '0 0 0 1px #ebebeb' }}
                >
                  Google Docs
                </span>
                <span className="font-mono text-[10px] uppercase text-[#297a3a]">
                  ✓ Verified ATS
                </span>
              </div>
              <h2 className="text-[24px] font-normal leading-tight tracking-[-1px] text-[#171717]">
                IIM Ahmedabad
              </h2>
              <p className="text-xs font-medium text-[#666666]">India&apos;s premier B-School.</p>
              <p className="text-sm leading-relaxed text-[#4d4d4d]">
                Clean, structured, and recruiter-approved. Highlights academic and leadership
                milestones with high quantitative impact.
              </p>
            </div>
            <div className="mt-6 border-t border-[#ebebeb] pt-4">
              <a
                href="https://docs.google.com/document/d/1AVi3XeRchX1VkuRta5Jiy1zhMJz0S3qa/edit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-[6px] bg-[#171717] px-4 py-2.5 text-sm text-white transition-colors hover:bg-[#383838]"
              >
                Open Google Doc
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Card 3 — Resume Worded */}
          <div
            className="flex h-full flex-col rounded-[6px] bg-white p-6 transition-all"
            style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.08)' }}
          >
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between">
                <span
                  className="rounded bg-[#fafafa] px-2 py-1 font-mono text-[10px] uppercase text-[#171717]"
                  style={{ boxShadow: '0 0 0 1px #ebebeb' }}
                >
                  Google Docs
                </span>
                <span className="font-mono text-[10px] uppercase text-[#297a3a]">
                  ✓ Verified ATS
                </span>
              </div>
              <h2 className="text-[24px] font-normal leading-tight tracking-[-1px] text-[#171717]">
                Resume Worded
              </h2>
              <p className="text-xs font-medium text-[#666666]">ATS Scorer Recommended.</p>
              <p className="text-sm leading-relaxed text-[#4d4d4d]">
                Engineered specifically for machine readability and modern ATS parsing algorithms
                across tech and product management.
              </p>
            </div>
            <div className="mt-6 border-t border-[#ebebeb] pt-4">
              <a
                href="https://docs.google.com/document/d/1tbnWMFkKT0c4Mh_IKhrobi_yK8qtjL6vkCgvXWCIKI0/edit?tab=t.0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-[6px] bg-[#171717] px-4 py-2.5 text-sm text-white transition-colors hover:bg-[#383838]"
              >
                Open Google Doc
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* AI Resume Builder CTA Card */}
        <div
          className="flex flex-col items-center justify-between gap-6 rounded-[6px] bg-white p-8 sm:flex-row sm:p-10"
          style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.08)' }}
        >
          <div>
            <div className="mb-1 font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717]">
              AUTOMATE YOUR RESUME
            </div>
            <h3 className="text-xl font-normal tracking-tight text-[#171717]">
              Prefer to build your resume with AI?
            </h3>
            <p className="text-sm text-[#666666]">
              Use our step-by-step AI resume builder with real-time ATS scoring.
            </p>
          </div>
          <Link
            href="/build-resume"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-[6px] bg-[#171717] px-5 py-2.5 text-sm text-white transition-colors hover:bg-[#383838]"
          >
            Launch Resume Builder →
          </Link>
        </div>

        {/* FAQ Section (AEO/GEO Optimized) */}
        <div className="pt-10">
          <div className="mb-8">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717]">
              FREQUENTLY ASKED QUESTIONS
            </p>
            <h3 className="text-2xl font-normal tracking-tight text-[#171717]">
              ATS Resume Template FAQs
            </h3>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-[6px] bg-white p-6"
                style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.08)' }}
              >
                <h4 className="mb-2 text-base font-medium text-[#171717]">{faq.q}</h4>
                <p className="text-sm leading-relaxed text-[#4d4d4d]">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
