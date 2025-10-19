/**
 * TL;DR Summary Component
 * Answer-first format for 2025 SEO/AEO optimization
 * Optimized for AI platforms and voice search
 */

interface TLDRSummaryProps {
  title: string
  summary: string
  keyPoints: string[]
}

export default function TLDRSummary({ title, summary, keyPoints }: TLDRSummaryProps) {
  return (
    <div className="mb-8 rounded-lg border border-purple-500 bg-gray-900/50 p-6">
      <h2 className="mb-3 text-xl font-bold text-purple-400">TL;DR: {title}</h2>
      <p className="mb-4 text-base leading-relaxed text-gray-200">{summary}</p>
      <ul className="space-y-2">
        {keyPoints.map((point, index) => (
          <li key={index} className="flex items-start">
            <span className="mr-2 mt-1 text-purple-400">✓</span>
            <span className="text-sm text-gray-300">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

