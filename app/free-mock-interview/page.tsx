import { Metadata } from 'next'
import DomainLayout from '@/components/domain/DomainLayout'
import TLDRSummary from '@/components/TLDRSummary'

export const metadata: Metadata = {
  title: 'Free AI Mock Interview Simulator — Practice Realistic Interviews | Auto Interview AI',
  description:
    'Practice role-specific interview questions with our free AI mock interview simulator. Instant feedback on speech pace, structure, and communication delivery.',
  keywords:
    'free mock interview, AI interview simulator, behavioral interview practice, coding interview prep, technical mock interview, Tough Tongue AI',
  alternates: {
    canonical: 'https://www.autointerviewai.com/free-mock-interview',
  },
  openGraph: {
    title: 'Free AI Mock Interview Simulator — Auto Interview AI',
    description:
      'Practice role-specific interview questions with our free AI mock interview simulator.',
    url: 'https://www.autointerviewai.com/free-mock-interview',
    siteName: 'Auto Interview AI',
    images: [
      {
        url: 'https://www.autointerviewai.com/static/images/Auto-interview-thumbnail.png',
        width: 1200,
        height: 630,
        alt: 'Free Mock Interview Practice',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI Mock Interview Simulator — Auto Interview AI',
    description:
      'Practice role-specific interview questions with our free AI mock interview simulator.',
    images: ['https://www.autointerviewai.com/static/images/Auto-interview-thumbnail.png'],
    creator: '@ajiteshleo',
  },
}

export default function FreeMockInterviewPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Auto Interview AI Mock Interview Simulator',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'A free AI-powered mock interview simulator providing instant feedback on interview performance.',
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is the AI mock interview tool completely free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, our AI mock interview simulator is 100% free with unlimited practice sessions and zero paywalls.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need to install any software or create an account?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No installation is needed. The simulator runs directly in your browser with microphone access.',
        },
      },
    ],
  }

  const interviewFaqs = [
    {
      q: 'Is the AI mock interview tool completely free?',
      a: 'Yes, our AI mock interview simulator is 100% free with unlimited practice sessions and zero paywalls.',
    },
    {
      q: 'Do I need to install any software or create an account?',
      a: 'No installation is needed. The simulator runs directly in your browser with microphone access.',
    },
    {
      q: 'What roles can I practice for?',
      a: 'You can simulate interviews for Software Engineering, Product Management, Consulting, Sales, Marketing, and Behavioral rounds.',
    },
  ]

  return (
    <DomainLayout currentPath="/free-mock-interview">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

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

      <div className="mx-auto max-w-5xl px-6 py-20">
        {/* Header */}
        <header className="mb-12 max-w-3xl">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717]">
            AI SIMULATION
          </p>
          <h1 className="mb-4 text-4xl font-normal tracking-tight text-[#171717] sm:text-5xl md:text-6xl">
            Real-time mock interviews.
          </h1>
          <p className="text-lg leading-relaxed text-[#4d4d4d]">
            Practice realistic voice interviews tailored to your role. Get instant evaluations on
            content depth, structure, and speaking pacing.
          </p>
        </header>

        {/* Simulator Frame Container */}
        <div
          className="overflow-hidden rounded-[6px] bg-white p-2"
          style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.08), 0 0 0 2px #fafafa' }}
        >
          <div className="overflow-hidden rounded-[4px] bg-[#171717]">
            <iframe
              src="https://app.toughtongueai.com/embed/6964fe0b8b51ea70930a6c05?skipPrecheck=true"
              width="100%"
              height="750px"
              frameBorder="0"
              allow="microphone; camera; display-capture"
              title="Auto Interview AI Mock Interview Simulator"
              className="w-full bg-[#171717]"
            />
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          <div
            className="rounded-[6px] bg-white p-6"
            style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.08)' }}
          >
            <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717]">
              01 / VOICE ADAPTIVE
            </div>
            <h2 className="mb-2 text-base font-medium text-[#171717]">Dynamic Follow-ups</h2>
            <p className="text-sm text-[#4d4d4d]">
              The AI listens and asks intelligent follow-up questions based on your exact answers.
            </p>
          </div>

          <div
            className="rounded-[6px] bg-white p-6"
            style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.08)' }}
          >
            <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717]">
              02 / SPEECH METRICS
            </div>
            <h2 className="mb-2 text-base font-medium text-[#171717]">
              Speech &amp; Pace Breakdown
            </h2>
            <p className="text-sm text-[#4d4d4d]">
              Instant metrics on words-per-minute, filler words, clarity, and conciseness.
            </p>
          </div>

          <div
            className="rounded-[6px] bg-white p-6"
            style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.08)' }}
          >
            <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717]">
              03 / 100% UNGATED
            </div>
            <h2 className="mb-2 text-base font-medium text-[#171717]">Unlimited Free Practice</h2>
            <p className="text-sm text-[#4d4d4d]">
              Practice as many iterations as you need to build unbreakable confidence.
            </p>
          </div>
        </div>

        {/* FAQs */}
        <div className="mt-20 border-t border-[#ebebeb] pt-12">
          <div className="mb-8">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717]">
              FAQ
            </p>
            <h2 className="text-2xl font-normal tracking-tight text-[#171717]">
              Mock Interview Simulator FAQs
            </h2>
          </div>
          <div className="space-y-4">
            {interviewFaqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-[6px] bg-white p-6"
                style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.08)' }}
              >
                <h3 className="mb-2 text-base font-medium text-[#171717]">{faq.q}</h3>
                <p className="text-sm leading-relaxed text-[#4d4d4d]">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DomainLayout>
  )
}
