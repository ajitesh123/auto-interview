import { Metadata } from 'next'
import { genPageMetadata } from '../seo'
import AppLayout from '@/components/AppLayout'
import RelatedTools from '@/components/RelatedTools'
import TLDRSummary from '@/components/TLDRSummary'

export const metadata: Metadata = genPageMetadata({
  title: 'Free Mock Interview Practice | AI Interview Simulator | Auto Interview AI',
  description:
    'Practice your interview skills with our free AI-powered mock interview simulator. Get instant feedback on your answers, body language, and speaking pace. No signup required.',
  keywords:
    'mock interview, ai interview practice, free interview simulator, interview preparation, interview coaching, tough tongue ai, interview feedback',
  alternates: {
    canonical: 'https://www.autointerviewai.com/free-mock-interview',
  },
})

export default function FreeMockInterviewPage() {
  return (
    <>
      {/* SEO Content Section - Accessible to search engines and screen readers */}
      <div className="sr-only" aria-label="Free Mock Interview Description">
        <h1>Free AI Mock Interview Simulator</h1>
        <p>
          Master your interview skills with Auto Interview AI's free mock interview simulator.
          Powered by advanced AI technology, our tool provides a realistic interview environment
          where you can practice answering common questions and receive instant, actionable
          feedback.
        </p>

        <h2>Why Practice with AI?</h2>
        <p>
          Traditional interview practice often requires a partner or expensive coaching. Our AI
          interviewer is available 24/7, allowing you to practice whenever you want. You'll get
          unbiased feedback on your content, delivery, and communication style.
        </p>

        <h2>Key Features</h2>
        <ul>
          <li>
            <strong>Realistic Scenarios:</strong> Practice for various roles including Product
            Management, Software Engineering, Sales, and more.
          </li>
          <li>
            <strong>Instant Feedback:</strong> Receive detailed analysis of your answers immediately
            after speaking.
          </li>
          <li>
            <strong>Speech Analysis:</strong> Get insights into your speaking pace, filler words,
            and tone.
          </li>
          <li>
            <strong>Video & Audio:</strong> Practice with camera and microphone to simulate real
            remote interviews.
          </li>
          <li>
            <strong>100% Free:</strong> Unlimited practice sessions without any cost.
          </li>
        </ul>

        <h2>How to Use the Mock Interview Tool</h2>
        <ol>
          <li>Select your target role or interview type.</li>
          <li>Allow access to your microphone and camera (optional but recommended).</li>
          <li>Listen to the AI interviewer's question.</li>
          <li>Record your answer.</li>
          <li>Review your feedback and try again to improve.</li>
        </ol>
      </div>

      {/* Structured Data for Software Application and FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'SoftwareApplication',
                name: 'Auto Interview AI Mock Interview',
                applicationCategory: 'EducationalApplication',
                operatingSystem: 'Web',
                offers: {
                  '@type': 'Offer',
                  price: '0',
                  priceCurrency: 'USD',
                },
                description:
                  'A free AI-powered mock interview simulator that provides instant feedback on interview performance.',
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: '4.8',
                  ratingCount: '1250',
                },
              },
              {
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'Is this mock interview tool really free?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Yes, our AI mock interview simulator is completely free to use. You can practice as many times as you like without any hidden costs or subscriptions.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Do I need to sign up to use it?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'No, you can start practicing immediately without creating an account. However, creating an account allows you to save your progress and access more advanced features.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'What types of interviews can I practice?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'You can practice for a wide range of roles including Behavioral interviews, Product Management, Software Engineering, Sales, Marketing, and more.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Does it record my video?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'The tool processes your video and audio in real-time to provide feedback, but we do not store your recordings unless you explicitly choose to save them.',
                    },
                  },
                ],
              },
            ],
          }),
        }}
      />

      <AppLayout>
        <TLDRSummary
          title="Free AI Mock Interview Practice"
          summary="Practice your interview skills with our advanced AI simulator. Get instant feedback on your answers, communication style, and body language to ace your next real interview."
          keyPoints={[
            'Unlimited free practice sessions available 24/7',
            'Realistic interview scenarios for various job roles',
            'Instant AI feedback on content and delivery',
            'Analysis of filler words, pacing, and tone',
            'Practice behavioral and technical questions',
            'No credit card or signup required to start',
          ]}
        />

        <div className="container mx-auto px-4 py-8">
          <div className="overflow-hidden rounded-xl border border-gray-800 bg-matte-dark shadow-2xl">
            <iframe
              src="https://app.toughtongueai.com/embed/6964fe0b8b51ea70930a6c05?skipPrecheck=true"
              width="100%"
              height="800px"
              frameBorder="0"
              allow="microphone; camera; display-capture"
              title="Tough Tongue AI Mock Interview"
              className="bg-matte-black"
            ></iframe>
          </div>
        </div>

        <RelatedTools currentPage="/free-mock-interview" />
      </AppLayout>
    </>
  )
}
