'use client'

import React, { useState } from 'react'
import type { FAQ } from '@/data/domains'

interface FAQSectionProps {
  faqs: FAQ[]
  /** If true, renders schema.org FAQPage JSON-LD (use once per page) */
  withSchema?: boolean
}

const FAQSection: React.FC<FAQSectionProps> = ({ faqs, withSchema = true }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (faqs.length === 0) return null

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <section className="py-16">
      {withSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      )}

      <h2
        className="mb-8 text-3xl text-white sm:text-4xl"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Frequently Asked Questions
      </h2>

      <div className="glass-card">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-white/[0.02]"
              aria-expanded={openIndex === index}
            >
              <span className="pr-4 text-base font-medium text-white">{faq.question}</span>
              <svg
                className={`h-5 w-5 flex-shrink-0 text-[hsl(240,4%,66%)] transition-transform duration-200 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {openIndex === index && (
              <div className="px-6 pb-5">
                <p className="leading-relaxed text-[hsl(240,4%,66%)]">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default FAQSection
