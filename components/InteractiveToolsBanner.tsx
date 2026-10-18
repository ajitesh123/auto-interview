import React from 'react'
import Link from 'next/link'

export default function InteractiveToolsBanner() {
  const tools = [
    {
      badge: 'Interactive Sandbox',
      title: 'Cold Call Simulator',
      desc: 'Practice B2B sales objections with live speech scoring and 1% benchmark counter-scripts.',
      href: '/cold-call-practice',
      cta: 'Start Cold Call Drill &rarr;',
      tagColor: 'bg-[#fff7ed] text-[#ea580c] border-[#fed7aa]',
    },
    {
      badge: 'Voice Simulation',
      title: 'Free AI Mock Interview',
      desc: 'Real-time role-specific interview simulation with instant feedback on pacing and conciseness.',
      href: '/free-mock-interview',
      cta: 'Launch Mock Interview &rarr;',
      tagColor: 'bg-[#fff7ed] text-[#ea580c] border-[#fed7aa]',
    },
    {
      badge: 'Planning Tool',
      title: 'Voice AI ROI Calculator',
      desc: 'Estimate per-minute calling costs, pipeline savings, and SDR economics across providers.',
      href: '/ai-calling-roi-calculator',
      cta: 'Calculate ROI &rarr;',
      tagColor: 'bg-[#fff7ed] text-[#ea580c] border-[#fed7aa]',
    },
    {
      badge: 'ATS Scanner',
      title: 'Instant ATS Score Checker',
      desc: 'Scan your resume against Fortune 500 ATS algorithms with keyword density scoring.',
      href: '/ats-score',
      cta: 'Check ATS Score &rarr;',
      tagColor: 'bg-[#fff7ed] text-[#ea580c] border-[#fed7aa]',
    },
    {
      badge: '1-Click Download',
      title: 'Harvard CV Templates',
      desc: 'Proven single-column templates for Software Engineers, PMs, SDRs, Data Analysts, and Freshers.',
      href: '/cv-templates',
      cta: 'Browse Templates &rarr;',
      tagColor: 'bg-[#fff7ed] text-[#ea580c] border-[#fed7aa]',
    },
    {
      badge: 'Proven Scripts',
      title: 'Interview Questions Q&A',
      desc: 'Word-for-word STAR sample answers, psychology breakdowns, and bad answer critiques for 20+ roles.',
      href: '/interview-questions',
      cta: 'Explore Questions &rarr;',
      tagColor: 'bg-[#fff7ed] text-[#ea580c] border-[#fed7aa]',
    },
    {
      badge: '2026 Directory',
      title: 'AI Sales Training Index',
      desc: 'Top AI calling & sales roleplay platforms compared across latency, MEDDPICC, and compliance.',
      href: '/ai-sales-training',
      cta: 'Compare Platforms &rarr;',
      tagColor: 'bg-[#fff7ed] text-[#ea580c] border-[#fed7aa]',
    },
  ]

  return (
    <div className="not-prose my-16 rounded-2xl border border-[#ebebeb] bg-[#fafafa] p-6 shadow-sm sm:p-10">
      <div className="mb-6 flex flex-col justify-between sm:flex-row sm:items-end">
        <div>
          <div className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#ea580c]">
            AUTO INTERVIEW AI • FREE APPS &amp; SIMULATORS
          </div>
          <h2 className="mt-1 text-2xl font-normal tracking-tight text-[#171717] sm:text-3xl">
            Accelerate Your Career &amp; Sales Execution
          </h2>
          <p className="mt-1 text-sm text-[#666666]">
            100% free, ungated interactive simulators and calculation engines. Zero signup required.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t, idx) => (
          <Link
            key={idx}
            href={t.href}
            className="group flex flex-col justify-between rounded-xl border border-[#ebebeb] bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-[#ea580c] hover:shadow-md"
          >
            <div>
              <span
                className={`inline-block rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider ${t.tagColor}`}
              >
                {t.badge}
              </span>
              <h3 className="mt-2 text-base font-medium text-[#171717] transition-colors group-hover:text-[#ea580c]">
                {t.title}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-[#666666]">{t.desc}</p>
            </div>
            <div className="mt-4 border-t border-[#f0f0f0] pt-3 text-xs font-semibold text-[#ea580c] transition-colors group-hover:text-[#c2410c]">
              <span dangerouslySetInnerHTML={{ __html: t.cta }} />
            </div>
          </Link>
        ))}

        {/* B2B Sales Custom Bot CTA Card */}
        <div className="flex flex-col justify-between rounded-xl border border-[#262626] bg-[#171717] p-5 text-white shadow-sm sm:col-span-2 lg:col-span-1">
          <div>
            <span className="inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-orange-400">
              Enterprise Solution
            </span>
            <h3 className="mt-2 text-base font-normal text-white">Tough Tongue AI For Teams</h3>
            <p className="mt-1 text-xs leading-relaxed text-[#a8a8a8]">
              Deploy customized voice objection bots and progressive outbound dial gating for your
              entire sales organization.
            </p>
          </div>
          <a
            href="https://cal.com/ajitesh/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center justify-center rounded-lg bg-[#ea580c] px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-[#c2410c]"
          >
            Book 30-Min Demo &rarr;
          </a>
        </div>
      </div>
    </div>
  )
}
