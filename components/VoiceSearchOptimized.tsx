/**
 * Voice Search Optimized Component
 * Ensures content answers voice queries naturally
 * Provides both short answers for voice assistants and full answers for visual readers
 */

interface VoiceSearchOptimizedProps {
  question: string // How users ask via voice
  shortAnswer: string // 20-30 words for voice assistants
  fullAnswer: string // Complete written answer
}

export default function VoiceSearchOptimized({
  question,
  shortAnswer,
  fullAnswer,
}: VoiceSearchOptimizedProps) {
  return (
    <div className="my-6 rounded-lg border border-gray-700 bg-gray-900/30 p-5">
      {/* Question in natural language (voice query format) */}
      <h3 className="mb-3 text-lg font-semibold text-purple-400">{question}</h3>

      {/* Short answer (read by voice assistants) */}
      <p className="mb-3 text-base font-medium text-white">{shortAnswer}</p>

      {/* Full answer for visual readers */}
      <p className="text-sm leading-relaxed text-gray-300">{fullAnswer}</p>

      {/* Hidden schema for voice assistants and AI platforms */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Question',
            name: question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: shortAnswer,
            },
          }),
        }}
      />
    </div>
  )
}

