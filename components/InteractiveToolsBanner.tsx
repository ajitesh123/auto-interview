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
      tagColor: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      badge: 'Voice Simulation',
      title: 'Free AI Mock Interview',
      desc: 'Real-time role-specific interview simulation with instant feedback on pacing and conciseness.',
      href: '/free-mock-interview',
      cta: 'Launch Mock Interview &rarr;',
      tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      badge: 'Planning Tool',
      title: 'Voice AI ROI Calculator',
      desc: 'Estimate per-minute calling costs, pipeline savings, and SDR economics across providers.',
      href: '/ai-calling-roi-calculator',
      cta: 'Calculate ROI &rarr;',
      tagColor: 'bg-purple-50 text-purple-700 border-purple-200',
    },
    {
      badge: 'ATS Scanner',
      title: 'Instant ATS Score Checker',
      desc: 'Scan your resume against Fortune 500 ATS algorithms with keyword density scoring.',
      href: '/ats-score',
      cta: 'Check ATS Score &rarr;',
      tagColor: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      badge: '1-Click Download',
      title: 'Harvard CV Templates',
      desc: 'Proven single-column templates for Software Engineers, PMs, SDRs, Data Analysts, and Freshers.',
      href: '/cv-templates',
      cta: 'Browse Templates &rarr;',
      tagColor: 'bg-slate-100 text-slate-800 border-slate-200',
    },
    {
      badge: 'Proven Scripts',
      title: 'Interview Questions Q&A',
      desc: 'Word-for-word STAR sample answers, psychology breakdowns, and bad answer critiques for 20+ roles.',
      href: '/interview-questions',
      cta: 'Explore Questions &rarr;',
      tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
  ]

  return (
    <div className="not-prose my-16 rounded-2xl border border-gray-200 bg-gradient-to-b from-gray-50 to-white p-6 shadow-sm dark:border-gray-800 dark:from-gray-900/60 dark:to-gray-950 sm:p-10">
      <div className="mb-6 flex flex-col justify-between sm:flex-row sm:items-end">
        <div>
          <div className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-blue-600 dark:text-blue-400">
            AUTO INTERVIEW AI • FREE APPS &amp; SIMULATORS
          </div>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
            Accelerate Your Career &amp; Sales Execution
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            100% free, ungated interactive simulators and calculation engines. Zero signup required.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t, idx) => (
          <Link
            key={idx}
            href={t.href}
            className="group flex flex-col justify-between rounded-xl border border-gray-200/80 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-blue-500 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-500"
          >
            <div>
              <span
                className={`inline-block rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider ${t.tagColor}`}
              >
                {t.badge}
              </span>
              <h3 className="mt-2 text-base font-bold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                {t.title}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-gray-600 dark:text-gray-400">
                {t.desc}
              </p>
            </div>
            <div className="mt-4 border-t border-gray-100 pt-3 text-xs font-semibold text-blue-600 transition-colors group-hover:text-blue-700 dark:border-gray-800 dark:text-blue-400">
              <span dangerouslySetInnerHTML={{ __html: t.cta }} />
            </div>
          </Link>
        ))}

        {/* B2B Sales Custom Bot CTA Card */}
        <div className="border-slate-800 flex flex-col justify-between rounded-xl border bg-[#0f172a] p-5 text-white shadow-sm sm:col-span-2 lg:col-span-1">
          <div>
            <span className="inline-block rounded-full border border-blue-400/40 bg-blue-500/20 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-blue-300">
              Enterprise Solution
            </span>
            <h3 className="mt-2 text-base font-bold text-white">Tough Tongue AI For Teams</h3>
            <p className="text-slate-300 mt-1 text-xs leading-relaxed">
              Deploy customized voice objection bots and progressive outbound dial gating for your
              entire sales organization.
            </p>
          </div>
          <a
            href="https://cal.com/ajitesh/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center justify-center rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-blue-500"
          >
            Book 30-Min Demo &rarr;
          </a>
        </div>
      </div>
    </div>
  )
}
