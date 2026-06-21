'use client'

import React from 'react'
import Link from 'next/link'
import DomainLayout from './DomainLayout'
import DomainCard from './DomainCard'
import { getAllDomains } from '@/lib/domainUtils'

const DomainHomePage: React.FC = () => {
  const allDomains = getAllDomains()

  return (
    <DomainLayout currentPath="/">
      {/* ===== VIDEO HERO ===== */}
      <section className="relative overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 z-0 h-full w-full object-cover"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
            type="video/mp4"
          />
        </video>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center px-6 pb-40 pt-32 text-center">
          <h1
            className="animate-fade-rise max-w-7xl text-5xl font-normal leading-[0.95] tracking-[-2.46px] text-white sm:text-7xl md:text-8xl"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Where <em className="not-italic text-[hsl(240,4%,66%)]">dreams</em> rise{' '}
            <em className="not-italic text-[hsl(240,4%,66%)]">through the silence.</em>
          </h1>

          <p className="animate-fade-rise-delay mt-8 max-w-2xl text-base leading-relaxed text-[hsl(240,4%,66%)] sm:text-lg">
            We&apos;re designing tools for deep thinkers, bold creators, and quiet rebels. Amid the
            chaos, we build digital spaces for sharp focus and inspired work.
          </p>

          <Link
            href="#domains"
            className="animate-fade-rise-delay-2 liquid-glass mt-12 cursor-pointer rounded-full px-14 py-5 text-base text-white transition-transform hover:scale-[1.03]"
          >
            Begin Journey
          </Link>
        </div>
      </section>

      {/* ===== DOMAIN SELECTOR ===== */}
      <section id="domains" className="py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          {/* AEO Summary — plain-language intro for AI engines */}
          <p className="mb-6 text-base leading-relaxed text-[hsl(240,4%,66%)]">
            Auto Interview AI provides free, downloadable interview preparation resources organized
            by academic and professional domain. Choose your domain below to access curated study
            materials, case frameworks, and practice guides.
          </p>

          <h2
            className="animate-fade-rise mb-4 text-4xl text-white sm:text-5xl"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Choose Your Domain
          </h2>
          <p className="animate-fade-rise-delay mb-12 max-w-2xl text-base leading-relaxed text-[hsl(240,4%,66%)]">
            Interview preparation resources organized by specialization. Pick your domain to access
            targeted resources, mock interviews, and AI-powered resume building.
          </p>

          <div className="animate-fade-rise-delay-2 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {allDomains.map((domain) => (
              <DomainCard key={domain.slug} domain={domain} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="border-t border-white/[0.08] py-24">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <h2
            className="mb-16 text-center text-4xl text-white sm:text-5xl"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            How It Works
          </h2>

          <div className="space-y-8">
            {[
              {
                step: '01',
                title: 'Choose Your Domain',
                desc: 'Select your academic or professional domain — MBA, Engineering, B.Com, or CA.',
              },
              {
                step: '02',
                title: 'Pick Your Specialization',
                desc: 'Navigate to your specific sub-domain for targeted interview preparation resources.',
              },
              {
                step: '03',
                title: 'Download Resources',
                desc: 'Access free PDF guides, case frameworks, and practice materials. All ungated, no signup required.',
              },
              {
                step: '04',
                title: 'Ace Your Interview',
                desc: 'Use our resources to build confidence, practice answers, and land your dream role.',
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                  <span className="text-sm font-medium text-[hsl(240,4%,66%)]">{item.step}</span>
                </div>
                <div className="flex-1 border-b border-white/[0.05] pb-8">
                  <h3
                    className="mb-2 text-xl text-white"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[hsl(240,4%,66%)]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="border-t border-white/[0.08] py-24 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <h2
            className="mb-6 text-4xl text-white sm:text-5xl"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Start Your Preparation
          </h2>
          <p className="mb-10 text-base leading-relaxed text-[hsl(240,4%,66%)]">
            Free resources, no signup required. Pick a domain and start preparing today.
          </p>
          <Link
            href="#domains"
            className="liquid-glass inline-block cursor-pointer rounded-full px-14 py-5 text-base text-white transition-transform hover:scale-[1.03]"
          >
            Explore Domains
          </Link>
        </div>
      </section>
    </DomainLayout>
  )
}

export default DomainHomePage
