'use client'

import { useState } from 'react'
import BulletPointsInput from './BulletPointsInput'

interface CertificationsSectionProps {
  data?: {
    bullets: string[]
  }
  onChange: (data: { bullets: string[] }) => void
}

const CertificationsSection = ({ data, onChange }: CertificationsSectionProps) => {
  const [bullets, setBullets] = useState<string[]>(
    data?.bullets && data.bullets.length > 0 ? data.bullets : []
  )

  const handleBulletsChange = (newBullets: string[]) => {
    setBullets(newBullets)
    onChange({ bullets: newBullets })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-6 xl:flex-row xl:gap-8">
        {/* Main Content - Left Side */}
        <div className="flex-1 space-y-4">
          {bullets.length === 0 ? (
            <div className="rounded-[8px] border border-dashed border-[#ebebeb] bg-[#fafafa] py-10 text-center">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-[#ebebeb] bg-white text-[#666666]">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <h3 className="mb-1 text-sm font-semibold text-[#171717]">
                No Certifications Added Yet
              </h3>
              <p className="mb-4 text-xs text-[#666666]">
                Add professional certifications, licenses, and credentials to showcase expertise.
              </p>
              <button
                type="button"
                onClick={() => handleBulletsChange([''])}
                className="inline-flex items-center gap-1.5 rounded-[6px] bg-[#171717] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[#333333]"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add Certification
              </button>
            </div>
          ) : (
            <div className="rounded-[8px] border border-[#ebebeb] bg-white p-5 shadow-sm">
              <div className="mb-4 border-b border-[#f0f0f0] pb-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#666666]">
                  Certifications & Credentials
                </h3>
                <p className="mt-0.5 text-xs text-[#888888]">
                  List licenses, certifications, and issuing authorities
                </p>
              </div>

              <BulletPointsInput
                bullets={bullets}
                onChange={handleBulletsChange}
                placeholder="e.g., AWS Certified Solutions Architect – Professional (Amazon Web Services, 2024)"
                maxBullets={20}
              />
            </div>
          )}
        </div>

        {/* Tips Section - Right Side */}
        <div className="w-full xl:w-72 xl:flex-shrink-0">
          <div className="sticky top-6 rounded-[8px] border border-[#ebebeb] bg-[#fafafa] p-4 text-xs text-[#666666]">
            <div className="flex items-start gap-2.5">
              <svg
                className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#171717]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h4 className="mb-1.5 font-semibold text-[#171717]">Certifications Tips</h4>
                <ul className="space-y-1.5 leading-relaxed text-[#666666]">
                  <li>• Include widely recognized industry certs (AWS, GCP, PMP, CISSP)</li>
                  <li>• Include issuing organization and year</li>
                  <li>• Mention credential IDs or verification URLs if applicable</li>
                  <li>• Avoid expired or introductory non-technical certificates</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CertificationsSection
