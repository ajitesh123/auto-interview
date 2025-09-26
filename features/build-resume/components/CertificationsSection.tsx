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
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-3xl font-bold text-white">Certifications</h2>
        <p className="text-gray-300">
          Add your professional certifications, licenses, and credentials
        </p>
      </div>

      {bullets.length === 0 ? (
        <div className="rounded-lg border border-matte-gray bg-matte-dark py-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-accent-500 to-accent-600">
            <svg
              className="h-8 w-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">No Certifications Added Yet</h3>
          <p className="mb-4 text-gray-300">
            Add your professional certifications, licenses, and credentials to showcase your
            expertise.
          </p>
          <button
            onClick={() => handleBulletsChange([''])}
            className="mx-auto flex items-center rounded-lg bg-gradient-to-r from-accent-500 to-accent-600 px-6 py-3 font-semibold text-white transition-colors hover:from-accent-400 hover:to-accent-500"
          >
            <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <div className="rounded-lg border border-matte-gray bg-matte-dark p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-white">Certifications</h3>
            <p className="text-sm text-gray-300">
              List your professional certifications, licenses, and credentials
            </p>
          </div>

          <BulletPointsInput
            bullets={bullets}
            onChange={handleBulletsChange}
            placeholder="e.g., AWS Certified Solutions Architect, PMP Certification, Google Analytics Certified"
            maxBullets={20}
          />
        </div>
      )}

      {/* Help Text */}
      <div className="rounded-lg bg-matte-dark p-4">
        <div className="flex items-start">
          <svg
            className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-accent-500"
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
            <h4 className="mb-1 text-sm font-medium text-white">Certifications Tips</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• Include professional certifications, licenses, and credentials</li>
              <li>• Add relevant industry certifications (AWS, PMP, Google Analytics, etc.)</li>
              <li>• Include language certifications if relevant to your field</li>
              <li>• List technical certifications and specialized training</li>
              <li>
                • Include expiration dates if relevant (e.g., "AWS Certified Solutions Architect
                (2023-2026)")
              </li>
              <li>• Use bullet points for easy scanning</li>
              <li>• Select text and click the bold button (B) to highlight important words</li>
              <li>• Only include certifications that add value to your application</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CertificationsSection
