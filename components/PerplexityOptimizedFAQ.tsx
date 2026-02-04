/**
 * Perplexity-Optimized FAQ Component
 * Structured for Perplexity AI's semantic understanding
 * Uses short, complete sentences and fresh data indicators
 */

interface FAQItem {
  question: string
  answer: string
  lastUpdated: string
}

interface PerplexityOptimizedFAQProps {
  faqs: FAQItem[]
  category: string
}

export default function PerplexityOptimizedFAQ({ faqs, category }: PerplexityOptimizedFAQProps) {
  return (
    <div className="my-12">
      <h2 className="mb-8 text-3xl font-bold text-white">Frequently Asked Questions: {category}</h2>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-700 bg-gray-900/50 p-6 transition-colors hover:border-primary"
          >
            {/* Question as H3 (Perplexity indexes these) */}
            <h3 className="mb-3 text-xl font-semibold text-primary">{faq.question}</h3>

            {/* Short, complete sentences in answer */}
            <p className="leading-relaxed text-gray-200">{faq.answer}</p>

            {/* Freshness indicator (Perplexity prioritizes fresh content) */}
            <p className="mt-3 text-sm text-gray-500">Last updated: {faq.lastUpdated}</p>
          </div>
        ))}
      </div>

      {/* FAQ Schema for AI platforms */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
          }),
        }}
      />
    </div>
  )
}
