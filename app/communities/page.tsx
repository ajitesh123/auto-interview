import { Metadata } from 'next'
import Link from 'next/link'
import DomainLayout from '@/components/domain/DomainLayout'

export const metadata: Metadata = {
  title: 'Career Communities — CS, AI & Referrals (Coming Soon) | Auto Interview AI',
  description:
    'Join role-specific peer communities for Computer Science, AI discussions, and job referrals. Connect with ambitious professionals preparing for top roles.',
  keywords:
    'career communities, CS community, AI discussions, tech referrals, job referral network, peer interview prep, Auto Interview AI communities',
  alternates: {
    canonical: 'https://www.autointerviewai.com/communities',
  },
  openGraph: {
    title: 'Career Communities — CS, AI & Referrals | Auto Interview AI',
    description:
      'Join role-specific peer communities for Computer Science, AI discussions, and job referrals.',
    url: 'https://www.autointerviewai.com/communities',
    siteName: 'Auto Interview AI',
    images: [
      {
        url: 'https://www.autointerviewai.com/static/images/Auto-interview-thumbnail.png',
        width: 1200,
        height: 630,
        alt: 'Career Communities — Auto Interview AI',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Career Communities — CS, AI & Referrals',
    description: 'Role-specific peer networks for CS, AI engineering, and job referrals.',
    images: ['https://www.autointerviewai.com/static/images/Auto-interview-thumbnail.png'],
    creator: '@ajiteshleo',
  },
}

export default function CommunitiesPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Career Communities — Auto Interview AI',
    description: metadata.description,
    url: 'https://www.autointerviewai.com/communities',
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What role communities are launching on Auto Interview AI?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We are launching focused peer groups for Computer Science & Software Engineering (DSA, System Design), AI & Machine Learning Engineers (LLMs, GenAI), Job Referrals (verified employee loops), and MBA & Product Management candidate networks.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I join a role-specific community?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Communities will roll out in invite-only cohorts. You can access the platform tools (CV Templates, Resources, Mock Interviews) immediately while early access invitations are distributed.',
        },
      },
    ],
  }

  const communities = [
    {
      title: 'Computer Science & Software Engineering',
      icon: '💻',
      desc: 'System design deep-dives, coding interview problem teardowns, architecture reviews, and hiring trends.',
      tags: ['CS', 'SWE', 'DSA', 'System Design'],
    },
    {
      title: 'AI & Machine Learning Engineers',
      icon: '🤖',
      desc: 'LLM agents, generative AI workflows, model deployment, ML research discussions, and AI engineering interviews.',
      tags: ['AI', 'LLMs', 'MLOps', 'GenAI'],
    },
    {
      title: 'Job Referrals & Internal Openings',
      icon: '🤝',
      desc: 'Verified employee referrals, priority interview loops, warm introductions, and insider hiring tips.',
      tags: ['Referrals', 'Hiring', 'FAANG', 'Startups'],
    },
    {
      title: 'MBA & Product Management Network',
      icon: '🎓',
      desc: 'Case interview practice partners, consulting frameworks, product sense mock loops, and placement prep.',
      tags: ['MBA', 'Consulting', 'Product Management', 'Strategy'],
    },
  ]

  const faqs = [
    {
      q: 'What role communities are launching on Auto Interview AI?',
      a: 'We are launching focused peer groups for Computer Science & Software Engineering (DSA, System Design), AI & Machine Learning Engineers (LLMs, GenAI), Job Referrals (verified employee loops), and MBA & Product Management candidate networks.',
    },
    {
      q: 'How do I join a role-specific community?',
      a: 'Communities will roll out in invite-only cohorts. You can access the platform tools (CV Templates, Resources, Mock Interviews) immediately while early access invitations are distributed.',
    },
  ]

  return (
    <DomainLayout currentPath="/communities">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto max-w-5xl px-6 py-20">
        {/* Header */}
        <header className="mb-16 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717]">
              COMMUNITIES
            </span>
            <span
              className="coming-soon-pulse rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase text-[#666666]"
              style={{ boxShadow: '0 0 0 1px #ebebeb' }}
            >
              Coming Soon
            </span>
          </div>
          <h1 className="mb-4 text-4xl font-normal tracking-tight text-[#171717] sm:text-5xl md:text-6xl">
            Role-specific peer networks.
          </h1>
          <p className="text-lg leading-relaxed text-[#4d4d4d]">
            Connect with ambitious candidates in your exact domain. Discuss interview problems,
            exchange direct company referrals, and prepare together.
          </p>
        </header>

        {/* Communities Grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {communities.map((comm) => (
            <div
              key={comm.title}
              className="flex flex-col rounded-[6px] bg-white p-6 transition-all"
              style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.08)' }}
            >
              <div className="mb-4 flex items-start justify-between">
                <span className="text-3xl">{comm.icon}</span>
                <span
                  className="rounded-full px-2 py-0.5 font-mono text-[10px] uppercase text-[#666666]"
                  style={{ boxShadow: '0 0 0 1px #ebebeb' }}
                >
                  Soon
                </span>
              </div>
              <h2 className="mb-2 text-[20px] font-normal tracking-[-0.5px] text-[#171717]">
                {comm.title}
              </h2>
              <p className="mb-6 flex-grow text-sm leading-relaxed text-[#4d4d4d]">{comm.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {comm.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-[#fafafa] px-2 py-1 font-mono text-[10px] text-[#666666]"
                    style={{ boxShadow: '0 0 0 1px #ebebeb' }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Waitlist Box */}
        <div
          className="mt-16 rounded-[6px] bg-white p-8 text-center sm:p-12"
          style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.08)' }}
        >
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717]">
            EARLY ACCESS
          </p>
          <h3 className="mb-3 text-2xl font-normal tracking-tight text-[#171717]">
            Be first in line when role communities open.
          </h3>
          <p className="mx-auto mb-8 max-w-lg text-sm text-[#666666]">
            While we finalize the invite-only community platform, explore our free CV templates and
            expert domain resources.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/cv-templates"
              className="inline-flex items-center justify-center rounded-[6px] bg-[#171717] px-5 py-2.5 text-sm text-white transition-colors hover:bg-[#383838]"
            >
              Explore CV Templates
            </Link>
            <Link
              href="/resources"
              className="inline-flex items-center justify-center rounded-[6px] px-5 py-2.5 text-sm text-[#4d4d4d] transition-colors hover:text-[#171717]"
              style={{ boxShadow: '0 0 0 1px #ebebeb' }}
            >
              Browse Domain Resources
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 border-t border-[#ebebeb] pt-12">
          <div className="mb-8">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717]">
              FAQ
            </p>
            <h3 className="text-2xl font-normal tracking-tight text-[#171717]">Communities FAQs</h3>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-[6px] bg-white p-6"
                style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.08)' }}
              >
                <h4 className="mb-2 text-base font-medium text-[#171717]">{faq.q}</h4>
                <p className="text-sm leading-relaxed text-[#4d4d4d]">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DomainLayout>
  )
}
