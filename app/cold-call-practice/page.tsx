import React from 'react'
import { Metadata } from 'next'
import ColdCallSimulator from '@/components/ColdCallSimulator'
import DomainLayout from '@/components/domain/DomainLayout'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cold Call Practice Simulator (2026) [Free AI Sales Roleplay]',
  description:
    'Free 2026 AI cold call simulator: practice B2B sales objection handling online with instant AI scoring for competitor lock-in, budget freeze, and brush-offs.',
  keywords: [
    'cold call simulator free',
    'sales roleplay practice online',
    'b2b sales roleplay simulator',
    'sales objection handling practice',
    'sdr cold calling practice online',
    'sales training simulator',
    'ai sales roleplay',
    'cold calling practice sandbox',
    'tough tongue ai sales simulator',
  ],
  alternates: {
    canonical: 'https://www.autointerviewai.com/cold-call-practice',
  },
  openGraph: {
    title: 'Cold Call Practice Simulator (2026) [Free AI Sales Roleplay]',
    description:
      'Practice real-world B2B cold calling objections online. Get instant scoring on tone, framework adherence, and counter-scripts.',
    url: 'https://www.autointerviewai.com/cold-call-practice',
    siteName: 'Auto Interview AI',
    images: [
      {
        url: 'https://www.autointerviewai.com/static/images/Auto-interview-thumbnail.png',
        width: 1200,
        height: 630,
        alt: 'Cold Call Practice Simulator Online',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function ColdCallPracticePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Cold Call Practice Simulator (2026)',
        url: 'https://www.autointerviewai.com/cold-call-practice',
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript, Microphone optional for voice mode',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Free online AI sales cold calling simulator to practice real-time B2B objection handling, tone pacing, and MEDDPICC framework adherence.',
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Can I practice cold calling online for free?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. The Auto Interview AI Cold Call Practice Simulator lets SDRs and sales reps practice real-world objection handling for free online. You can select common enterprise objections (competitor contract lock-in, brush-offs, budget freezes), speak or type your counter-response, and receive an instant 100-point AI evaluation score with top-performer benchmark scripts.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the best way to practice sales objection handling?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The most effective method is active solo voice simulation using the A.D.D. Framework: 1) Acknowledge the prospect without defensiveness, 2) Deflect away from rip-and-replace friction, and 3) Differentiate on a specific metric or workflow pain with an open discovery question. Daily 5-minute micro-drills build muscle memory 3.4x faster than passive script reading.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does AI sales roleplay improve SDR ramp times?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Traditional sales onboarding takes 3 to 6 months and burns valuable CRM leads. AI sales roleplay sandboxes allow new reps to complete 20+ realistic customer roleplay scenarios before making their first live outbound call, cutting new SDR ramp time from 120 days down to 21 days.',
            },
          },
        ],
      },
    ],
  }

  return (
    <DomainLayout currentPath="/cold-call-practice">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-[#fafafa] py-24 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-[1280px] space-y-20 px-6">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-xs font-medium text-[#666666]">
            <Link href="/" className="transition-colors hover:text-[#171717]">
              Home
            </Link>
            <span>/</span>
            <span className="font-semibold text-[#171717]">Cold Call Simulator</span>
          </nav>

          {/* Hero Header — Matches DomainHomePage Vercel typography */}
          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717]">
              OUTBOUND SALES INTELLIGENCE
            </p>

            <h1 className="max-w-3xl text-[40px] font-normal leading-[1] tracking-[-2px] text-[#171717] sm:text-[48px] sm:tracking-[-2.88px] lg:text-[56px] lg:tracking-[-3.36px]">
              Cold call simulator. <br className="hidden sm:block" />
              Practice out loud.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#4d4d4d]">
              Master high-friction enterprise objections without burning live outbound leads. Listen
              to realistic buyer pushback, speak or type your counter-pitch, and get instant scoring
              grounded in the proven A.D.D. sales methodology.
            </p>

            {/* Trust signals */}
            <div
              className="mt-6 flex flex-wrap items-center gap-4 text-[11px] text-[#666666]"
              style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.071em' }}
            >
              <span className="flex items-center gap-1.5 uppercase">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#ea580c]" />
                Real-time audio objection
              </span>
              <span className="text-[#ebebeb]">·</span>
              <span className="uppercase">100% free</span>
              <span className="text-[#ebebeb]">·</span>
              <span className="uppercase">A.D.D. Framework</span>
            </div>
          </div>

          {/* Interactive Simulator Component */}
          <ColdCallSimulator />

          {/* Educational Framework Guide — Matches Homepage Pillar Cards */}
          <div
            className="space-y-10 rounded-[6px] bg-white p-7 transition-all duration-200 sm:p-10"
            style={{
              boxShadow: '0 0 0 1px rgba(0,0,0,0.08), 0 0 0 2px #fafafa',
            }}
          >
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717]">
                METHODOLOGY BREAKDOWN
              </p>
              <h2 className="text-[28px] font-normal leading-[1.1] tracking-[-1.5px] text-[#171717]">
                The A.D.D. Framework: How top 1% SDRs disarm tough objections.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#4d4d4d]">
                In outbound prospecting, 82% of sales reps lose control of the call when a prospect
                raises a reflex objection like{' '}
                <strong className="font-medium text-[#171717]">
                  &ldquo;We already use a competitor&rdquo;
                </strong>{' '}
                or{' '}
                <strong className="font-medium text-[#171717]">
                  &ldquo;Just send me an email&rdquo;
                </strong>
                . The instinct is to either apologize and hang up, or launch into an aggressive
                2-minute product monologue. Elite enterprise closers follow the three-stage{' '}
                <strong className="font-semibold text-[#171717]">A.D.D. formula</strong>:
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div
                className="rounded-[6px] bg-white p-6 transition-all"
                style={{ boxShadow: '0 0 0 1px #ebebeb' }}
              >
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-[4px] bg-[#171717] font-mono text-xs font-medium text-white">
                  1
                </span>
                <h3 className="mt-4 text-sm font-medium text-[#171717]">
                  Acknowledge &amp; Validate
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#666666]">
                  Never invalidate the prospect’s vendor choice or act defensive. Use disarming
                  phrases like <em>&ldquo;Totally respect that—they run a solid product&rdquo;</em>{' '}
                  to eliminate psychological confrontation.
                </p>
              </div>

              <div
                className="rounded-[6px] bg-white p-6 transition-all"
                style={{ boxShadow: '0 0 0 1px #ebebeb' }}
              >
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-[4px] bg-[#171717] font-mono text-xs font-medium text-white">
                  2
                </span>
                <h3 className="mt-4 text-sm font-medium text-[#171717]">Deflect Rip-and-Replace</h3>
                <p className="mt-2 text-xs leading-relaxed text-[#666666]">
                  Buyers fear the switching cost of migrating databases or retraining teams.
                  Explicitly clarify:{' '}
                  <em>
                    &ldquo;We definitely aren’t asking you to switch or rip out your existing tech
                    stack today.&rdquo;
                  </em>
                </p>
              </div>

              <div
                className="rounded-[6px] bg-white p-6 transition-all"
                style={{ boxShadow: '0 0 0 1px #ebebeb' }}
              >
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-[4px] bg-[#171717] font-mono text-xs font-medium text-white">
                  3
                </span>
                <h3 className="mt-4 text-sm font-medium text-[#171717]">
                  Differentiate &amp; Probe
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#666666]">
                  Pivot to a single measurable operational pain point (such as conversational audio
                  latency or cost per connection) and finish with a low-friction question:{' '}
                  <em>&ldquo;When reps dial, are you seeing audio lag?&rdquo;</em>
                </p>
              </div>
            </div>

            {/* Comparison Table */}
            <div>
              <h3 className="mb-4 text-base font-medium text-[#171717]">
                Traditional Peer Roleplay vs. Voice AI Simulation
              </h3>
              <div
                className="overflow-x-auto rounded-[6px]"
                style={{ boxShadow: '0 0 0 1px #ebebeb' }}
              >
                <table className="min-w-full divide-y divide-[#ebebeb] text-left text-xs">
                  <thead className="bg-[#fafafa]">
                    <tr>
                      <th className="px-4 py-3 font-medium text-[#171717]">Evaluation Metric</th>
                      <th className="px-4 py-3 font-medium text-[#666666]">
                        Peer-to-Peer Roleplay
                      </th>
                      <th className="px-4 py-3 font-medium text-[#666666]">Static Paper Scripts</th>
                      <th className="px-4 py-3 font-medium text-[#171717]">
                        Auto Interview AI Voice Sandbox
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ebebeb] bg-white text-[#4d4d4d]">
                    <tr>
                      <td className="px-4 py-3 font-medium text-[#171717]">Psychological Safety</td>
                      <td className="px-4 py-3 text-[#666666]">Low (Peer scrutiny)</td>
                      <td className="px-4 py-3 text-[#666666]">Neutral (Passive)</td>
                      <td className="px-4 py-3 font-medium text-[#171717]">
                        100% Private Solo Voice Sandbox
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-[#171717]">
                        Realism &amp; Pushback
                      </td>
                      <td className="px-4 py-3 text-[#666666]">
                        Inconsistent (Peers cave or act sadistic)
                      </td>
                      <td className="px-4 py-3 text-[#666666]">Zero (No live pushback)</td>
                      <td className="px-4 py-3 font-medium text-[#171717]">
                        Dynamic Adaptive Pushback
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-[#171717]">Practice Repetitions</td>
                      <td className="px-4 py-3 text-[#666666]">1–2 drills per month</td>
                      <td className="px-4 py-3 text-[#666666]">Passive memorization</td>
                      <td className="px-4 py-3 font-medium text-[#171717]">
                        20+ drills per week (24/7 on demand)
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-[#171717]">Cost Per Repetition</td>
                      <td className="px-4 py-3 text-[#666666]">$450+ (Manager time)</td>
                      <td className="px-4 py-3 text-[#666666]">Free (Ineffective retention)</td>
                      <td className="px-4 py-3 font-medium text-[#171717]">&lt; $1.20 per drill</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Related Strategy Playbooks */}
            <div className="border-t border-[#ebebeb] pt-8">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717]">
                RELATED SALES PLAYBOOKS
              </p>
              <div className="grid grid-cols-1 gap-3 text-xs sm:grid-cols-2 lg:grid-cols-3">
                <Link
                  href="/blog/top-5-ai-tools-real-time-objection-handling-2026"
                  className="text-[#666666] transition-colors hover:text-[#171717]"
                >
                  → Outbound Apps for Objection Handling (2026)
                </Link>
                <Link
                  href="/blog/why-do-sales-reps-hate-roleplaying-2026"
                  className="text-[#666666] transition-colors hover:text-[#171717]"
                >
                  → Why Sales Reps Hate Roleplaying &amp; How AI Solves It
                </Link>
                <Link
                  href="/blog/roleplay-we-already-use-a-competitor-2026"
                  className="text-[#666666] transition-colors hover:text-[#171717]"
                >
                  → How to Handle &ldquo;We Already Use a Competitor&rdquo;
                </Link>
                <Link
                  href="/blog/sales-roleplay-scoring-rubric-2026"
                  className="text-[#666666] transition-colors hover:text-[#171717]"
                >
                  → 100-Point Sales Roleplay Scoring Rubric
                </Link>
                <Link
                  href="/blog/voice-latency-ai-sales-roleplay-2026"
                  className="text-[#666666] transition-colors hover:text-[#171717]"
                >
                  → Why Sub-500ms Voice Latency Matters in Sales
                </Link>
                <Link
                  href="/ai-calling-roi-calculator"
                  className="text-[#666666] transition-colors hover:text-[#171717]"
                >
                  → Interactive Voice AI &amp; SDR ROI Calculator
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DomainLayout>
  )
}
