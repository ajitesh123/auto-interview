'use client'

import React from 'react'
import Link from 'next/link'
import DomainLayout from './DomainLayout'
import CubeLogo from '@/components/CubeLogo'

const DomainHomePage: React.FC = () => {
  const homeFaqs = [
    {
      q: 'What is Auto Interview AI?',
      a: 'Auto Interview AI is a free career intelligence platform offering battle-tested CV templates (Harvard, IIM-A, Resume Worded), domain-specific interview resources, casebooks, AI-driven mock interviews, and role-specific peer communities.',
    },
    {
      q: 'How does Auto Interview AI help crack job interviews?',
      a: 'Auto Interview AI covers the three critical phases of hiring: 1) Stellar ATS-compliant CVs that pass recruiter filters, 2) Curated domain study kits and casebooks to master the technical material, and 3) Adaptive AI mock interviews for realistic live practice.',
    },
    {
      q: 'Are all templates and resources completely free?',
      a: 'Yes. Auto Interview AI is 100% free with zero paywalls, zero gatekeeping, and no mandatory subscriptions.',
    },
  ]

  return (
    <DomainLayout currentPath="/">
      {/* ===== HERO — Vercel asymmetric composition ===== */}
      <section className="py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="grid items-center gap-16 lg:grid-cols-[1fr_auto]">
            {/* Left — Headline stack */}
            <div>
              {/* Eyebrow */}
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717]">
                FOR JOB SEEKERS
              </p>

              {/* Hero Headline — 56px, weight ~450, tight tracking */}
              <h1 className="animate-fade-rise max-w-3xl text-[40px] font-normal leading-[1] tracking-[-2px] text-[#171717] sm:text-[48px] sm:tracking-[-2.88px] lg:text-[56px] lg:tracking-[-3.36px]">
                Your dream job. <br className="hidden sm:block" />
                Engineered.
              </h1>

              {/* Supporting text — 16px, charcoal without emdash */}
              <p className="animate-fade-rise-delay mt-6 max-w-xl text-base leading-relaxed text-[#4d4d4d]">
                Stellar CVs. Expert resources. Realistic practice. Everything you need to crack your
                next role in one place.
              </p>

              {/* CTA Row */}
              <div className="animate-fade-rise-delay-2 mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#pillars"
                  className="inline-flex items-center justify-center rounded-[6px] bg-[#171717] px-6 py-3 text-sm font-medium !text-white transition-all hover:bg-[#333333] hover:shadow-sm"
                >
                  Explore the Platform
                </Link>
                <Link
                  href="/cv-templates"
                  className="inline-flex items-center justify-center rounded-[6px] bg-white px-6 py-3 text-sm font-medium !text-[#171717] transition-all hover:bg-[#f5f5f5]"
                  style={{ boxShadow: '0 0 0 1px #ebebeb' }}
                >
                  Download CV Templates
                </Link>
              </div>

              {/* Trust signals — monospace */}
              <div
                className="animate-fade-rise-delay-3 mt-8 flex flex-wrap items-center gap-4 text-[11px] text-[#666666]"
                style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.071em' }}
              >
                <span className="flex items-center gap-1.5 uppercase">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#297a3a]" />
                  14,000+ resumes analyzed
                </span>
                <span className="text-[#ebebeb]">·</span>
                <span className="uppercase">100% free</span>
                <span className="text-[#ebebeb]">·</span>
                <span className="uppercase">Zero gatekeeping</span>
              </div>
            </div>

            {/* Right — 4x4x4 3D Isometric Cube Logo */}
            <div className="hidden lg:flex lg:items-center lg:justify-center">
              <CubeLogo size={160} className="transition-transform duration-300 hover:scale-105" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOUR PILLARS — Feature Card Grid ===== */}
      <section id="pillars" className="py-24">
        <div className="mx-auto max-w-[1280px] px-6">
          {/* Section header */}
          <div className="mb-12">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717]">
              EVERYTHING YOU NEED
            </p>
            <h2 className="text-[30px] font-normal leading-[1.1] tracking-[-1.5px] text-[#171717]">
              Four pillars to crack your dream job.
            </h2>
          </div>

          {/* 2×2 Grid */}
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Pillar 1 — Stellar CVs */}
            <Link href="/cv-templates" className="group block">
              <div
                className="flex h-full flex-col rounded-[6px] bg-white p-7 transition-all duration-200"
                style={{
                  boxShadow: '0 0 0 1px rgba(0,0,0,0.08), 0 0 0 2px #fafafa',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 0 1px rgba(0,0,0,0.15), 0 0 0 2px #fafafa'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 0 1px rgba(0,0,0,0.08), 0 0 0 2px #fafafa'
                }}
              >
                <div
                  className="mb-5 flex h-10 w-10 items-center justify-center rounded-[6px] bg-[#fafafa] text-[#171717]"
                  style={{ boxShadow: '0 0 0 1px #ebebeb' }}
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-[22px] font-normal tracking-[-0.5px] text-[#171717]">
                  Stellar CVs
                </h3>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-[#4d4d4d]">
                  ATS-optimized resume templates from Harvard, IIM Ahmedabad, and Resume Worded.
                  Download and customize. Free, no signup required.
                </p>
                <span className="flex items-center text-sm font-medium text-[#171717] transition-colors group-hover:text-black">
                  Download Templates
                  <svg
                    className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Pillar 2 — Expert Resources */}
            <Link href="/resources" className="group block">
              <div
                className="flex h-full flex-col rounded-[6px] bg-white p-7 transition-all duration-200"
                style={{
                  boxShadow: '0 0 0 1px rgba(0,0,0,0.08), 0 0 0 2px #fafafa',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 0 1px rgba(0,0,0,0.15), 0 0 0 2px #fafafa'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 0 1px rgba(0,0,0,0.08), 0 0 0 2px #fafafa'
                }}
              >
                <div
                  className="mb-5 flex h-10 w-10 items-center justify-center rounded-[6px] bg-[#fafafa] text-[#171717]"
                  style={{ boxShadow: '0 0 0 1px #ebebeb' }}
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-[22px] font-normal tracking-[-0.5px] text-[#171717]">
                  Expert Resources
                </h3>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-[#4d4d4d]">
                  Domain-specific prep kits. Casebooks, frameworks, and playbooks for MBA,
                  Engineering, and more, curated by practitioners.
                </p>
                <span className="flex items-center text-sm font-medium text-[#171717] transition-colors group-hover:text-black">
                  Explore Resources
                  <svg
                    className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Pillar 3 — Mock Interviews */}
            <Link href="/free-mock-interview" className="group block">
              <div
                className="flex h-full flex-col rounded-[6px] bg-white p-7 transition-all duration-200"
                style={{
                  boxShadow: '0 0 0 1px rgba(0,0,0,0.08), 0 0 0 2px #fafafa',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 0 1px rgba(0,0,0,0.15), 0 0 0 2px #fafafa'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 0 1px rgba(0,0,0,0.08), 0 0 0 2px #fafafa'
                }}
              >
                <div
                  className="mb-5 flex h-10 w-10 items-center justify-center rounded-[6px] bg-[#fafafa] text-[#171717]"
                  style={{ boxShadow: '0 0 0 1px #ebebeb' }}
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-[22px] font-normal tracking-[-0.5px] text-[#171717]">
                  Mock Interviews
                </h3>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-[#4d4d4d]">
                  AI-powered practice that adapts to your domain, seniority level, and target role.
                  Real-time feedback in seconds, not days.
                </p>
                <span className="flex items-center text-sm font-medium text-[#171717] transition-colors group-hover:text-black">
                  Start Practicing
                  <svg
                    className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Pillar 4 — Communities */}
            <Link href="/communities" className="group block">
              <div
                className="flex h-full flex-col rounded-[6px] bg-white p-7 transition-all duration-200"
                style={{
                  boxShadow: '0 0 0 1px rgba(0,0,0,0.08), 0 0 0 2px #fafafa',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 0 1px rgba(0,0,0,0.15), 0 0 0 2px #fafafa'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 0 1px rgba(0,0,0,0.08), 0 0 0 2px #fafafa'
                }}
              >
                <div className="mb-5 flex items-center justify-between">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-[6px] bg-[#fafafa] text-[#171717]"
                    style={{ boxShadow: '0 0 0 1px #ebebeb' }}
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <span
                    className="coming-soon-pulse rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase text-[#666666]"
                    style={{
                      boxShadow: '0 0 0 1px #ebebeb',
                    }}
                  >
                    Coming Soon
                  </span>
                </div>
                <h3 className="mb-2 text-[22px] font-normal tracking-[-0.5px] text-[#171717]">
                  Communities
                </h3>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-[#4d4d4d]">
                  Role-specific communities for CS, AI discussion, and referrals. Connect with
                  peers, share opportunities, and grow together.
                </p>
                <span className="flex items-center text-sm font-medium text-[#171717] transition-colors group-hover:text-black">
                  Join Early Access →
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS — 3-step method ===== */}
      <section className="py-24">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="grid gap-16 lg:grid-cols-[1fr_1fr]">
            {/* Left — Steps */}
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717]">
                THE METHOD
              </p>
              <h2 className="mb-12 text-[30px] font-normal leading-[1.1] tracking-[-1.5px] text-[#171717]">
                Three steps to your next offer.
              </h2>

              <div className="space-y-8">
                {[
                  {
                    step: '01',
                    title: 'Build your CV',
                    desc: 'Pick a battle-tested template from Harvard, IIM-A, or Resume Worded. Customize it. Pass every ATS filter.',
                  },
                  {
                    step: '02',
                    title: 'Master the material',
                    desc: 'Download domain-specific playbooks and case frameworks. MBA, Engineering, Commerce. All free, all ungated.',
                  },
                  {
                    step: '03',
                    title: 'Practice until perfect',
                    desc: 'Run AI mock interviews tailored to your target role. Get feedback in seconds. Walk in ready.',
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div
                      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-[11px] text-[#666666]"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        boxShadow: '0 0 0 1px #ebebeb',
                      }}
                    >
                      {item.step}
                    </div>
                    <div>
                      <h3 className="mb-1 text-sm font-medium text-[#171717]">{item.title}</h3>
                      <p className="text-sm leading-relaxed text-[#4d4d4d]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — CLI Output Panel */}
            <div className="flex items-center">
              <div className="cli-panel w-full">
                <div className="space-y-2">
                  <div className="cli-command">download --template harvard-2025.docx</div>
                  <div className="cli-success">Template downloaded successfully</div>
                  <div className="cli-command">
                    resources --domain mba --specialization consulting
                  </div>
                  <div className="cli-success">4 casebooks ready (IIM-A, IIM-B, IIM-C, FMS)</div>
                  <div className="cli-command">
                    mock-interview --role &quot;Product Manager&quot; --level senior
                  </div>
                  <div className="cli-success">Interview session ready. 12 questions queued.</div>
                  <div className="mt-4 border-t border-[#ebebeb] pt-4 font-mono text-[12px] text-[#297a3a]">
                    ✓ You&apos;re prepared. Go get that offer.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SOCIAL PROOF / STATS ===== */}
      <section className="py-24">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: '14,363', label: 'Resumes analyzed' },
              { value: '3.4×', label: 'Higher callback rate' },
              { value: '58%', label: 'Fail on missing keywords' },
              { value: '2 min', label: 'Average build time' },
            ].map((stat) => (
              <div
                key={stat.value}
                className="rounded-[6px] bg-white p-6 text-center"
                style={{
                  boxShadow: '0 0 0 1px rgba(0,0,0,0.08), 0 0 0 2px #fafafa',
                }}
              >
                <div className="mb-2 text-[30px] font-normal leading-[1.1] tracking-[-1.5px] text-[#171717]">
                  {stat.value}
                </div>
                <p className="text-sm text-[#666666]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOMEPAGE FAQ SECTION ===== */}
      <section className="border-t border-[#ebebeb] py-24">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717]">
              FAQ
            </p>
            <h2 className="text-[30px] font-normal leading-[1.1] tracking-[-1.5px] text-[#171717]">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {homeFaqs.map((faq) => (
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
      </section>

      {/* ===== CTA BANNER — Inverted black card with 100% bright white text ===== */}
      <section className="py-24">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="rounded-[6px] bg-[#171717] px-8 py-20 text-center sm:px-16">
            <h2
              className="mb-4 text-[32px] font-normal leading-[1.15] tracking-[-1.5px] !text-white sm:text-[38px]"
              style={{ color: '#ffffff' }}
            >
              The job market is tough.
              <br />
              We make it easier.
            </h2>
            <p
              className="mx-auto mb-10 max-w-lg text-sm leading-relaxed !text-[#a8a8a8]"
              style={{ color: '#a8a8a8' }}
            >
              Free CV templates, domain-specific resources, AI mock interviews, and career
              communities. Everything you need with zero gatekeeping.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/build-resume"
                className="inline-flex min-w-[170px] items-center justify-center rounded-[6px] bg-white px-6 py-3 text-sm font-medium !text-[#171717] transition-all hover:bg-[#f0f0f0]"
                style={{ color: '#171717', backgroundColor: '#ffffff' }}
              >
                Get Started Free
              </Link>
              <Link
                href="/resources"
                className="inline-flex min-w-[170px] items-center justify-center rounded-[6px] border border-white/30 bg-transparent px-6 py-3 text-sm font-medium !text-white transition-all hover:bg-white/10"
                style={{ color: '#ffffff' }}
              >
                Browse Resources
              </Link>
            </div>
          </div>
        </div>
      </section>
    </DomainLayout>
  )
}

export default DomainHomePage
