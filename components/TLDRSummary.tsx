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
    <div 
      className="seo-only-content"
      aria-hidden="false"
      role="complementary"
      aria-label="SEO optimized summary for search engines and AI crawlers"
      data-seo-content="true"
      data-crawler-target="search-engines"
    >
      <h2>TL;DR: {title}</h2>
      <p>{summary}</p>
      <ul>
        {keyPoints.map((point, index) => (
          <li key={index}>
            <span>✓</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

