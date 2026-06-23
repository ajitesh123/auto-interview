'use client'

import React, { useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import DomainLayout from './DomainLayout'
import DomainCard from './DomainCard'
import { getAllDomains } from '@/lib/domainUtils'

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4'

const DomainHomePage: React.FC = () => {
  const allDomains = getAllDomains()
  const videoRef = useRef<HTMLVideoElement>(null)
  const animFrameRef = useRef<number | null>(null)
  const fadingOutRef = useRef(false)

  // Cancel any running animation frame
  const cancelAnim = useCallback(() => {
    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current)
      animFrameRef.current = null
    }
  }, [])

  // Smooth fade using requestAnimationFrame (500ms duration)
  const animateOpacity = useCallback(
    (el: HTMLVideoElement, from: number, to: number, duration: number, onDone?: () => void) => {
      cancelAnim()
      const start = performance.now()
      el.style.opacity = String(from)
      const step = (now: number) => {
        const elapsed = now - start
        const progress = Math.min(elapsed / duration, 1)
        el.style.opacity = String(from + (to - from) * progress)
        if (progress < 1) {
          animFrameRef.current = requestAnimationFrame(step)
        } else {
          animFrameRef.current = null
          onDone?.()
        }
      }
      animFrameRef.current = requestAnimationFrame(step)
    },
    [cancelAnim]
  )

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Fade in on first load
    video.style.opacity = '0'
    const handleCanPlay = () => {
      animateOpacity(video, 0, 1, 500)
    }

    const handleTimeUpdate = () => {
      if (!video.duration || fadingOutRef.current) return
      const remaining = video.duration - video.currentTime
      if (remaining <= 0.55) {
        fadingOutRef.current = true
        const currentOp = parseFloat(video.style.opacity) || 1
        animateOpacity(video, currentOp, 0, 500)
      }
    }

    const handleEnded = () => {
      video.style.opacity = '0'
      fadingOutRef.current = false
      setTimeout(() => {
        video.currentTime = 0
        video.play().then(() => {
          const currentOp = parseFloat(video.style.opacity) || 0
          animateOpacity(video, currentOp, 1, 500)
        })
      }, 100)
    }

    video.addEventListener('canplay', handleCanPlay, { once: true })
    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('ended', handleEnded)

    return () => {
      cancelAnim()
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('ended', handleEnded)
    }
  }, [animateOpacity, cancelAnim])

  const offerings = [
    {
      title: 'Resources',
      tagline: 'Domain-Specific Prep Kits',
      description:
        'Curated frameworks, case studies, and interview playbooks for MBA, Engineering, Commerce, and CA — built by practitioners, not professors.',
      href: '#domains',
      cta: 'Explore Resources',
      icon: (
        <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
    },
    {
      title: 'Mock Interviews',
      tagline: 'AI-Powered Practice',
      description:
        'Real-time AI interview simulations that adapt to your domain, seniority level, and target role. Feedback in seconds, not days.',
      href: '/free-mock-interview',
      cta: 'Coming Soon',
      comingSoon: true,
      icon: (
        <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      title: 'Resume Builder',
      tagline: 'ATS-Ready in 2 Minutes',
      description:
        'AI-generated resumes that pass 99% of ATS filters. Upload, optimize, and export — professionally formatted, keyword-optimized, recruiter-approved.',
      href: '/build-resume',
      cta: 'Build Your Resume',
      icon: (
        <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
  ]

  return (
    <DomainLayout currentPath="/">
      {/* ===== FULL-SCREEN VIDEO HERO ===== */}
      <section className="relative min-h-screen overflow-hidden bg-black">
        {/* Background Video */}
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="absolute inset-0 z-0 h-full w-full translate-y-[17%] object-cover"
          style={{ opacity: 0 }}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/70 via-black/30 to-black/80" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/40 via-transparent to-black/40" />

        {/* Hero Content */}
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-12 text-center -translate-y-[10%]">
          <h1
            className="animate-fade-rise max-w-5xl text-5xl font-normal leading-[0.95] tracking-[-2.46px] text-white md:text-6xl lg:text-7xl"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Your career.{' '}
            <em className="not-italic text-[hsl(240,4%,66%)]">Engineered,</em>{' '}
            <br className="hidden sm:block" />
            not left to chance.
          </h1>

          <p className="animate-fade-rise-delay mt-8 max-w-2xl text-base leading-relaxed text-[hsl(240,4%,66%)] sm:text-lg">
            The definitive career intelligence platform. Domain-specific resources, AI mock
            interviews, and resumes that open doors — built for professionals who refuse to be
            unprepared.
          </p>

          <div className="animate-fade-rise-delay-2 mt-12 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href="#offerings"
              className="liquid-glass cursor-pointer rounded-full px-14 py-5 text-base text-white transition-transform hover:scale-[1.03]"
            >
              Explore the Platform
            </Link>
            <Link
              href="/build-resume"
              className="rounded-full bg-white px-14 py-5 text-base font-medium text-black transition-all hover:bg-white/90"
            >
              Build Resume — Free
            </Link>
          </div>

          {/* Trust Signal */}
          <div className="animate-fade-rise-delay-3 mt-16 flex items-center gap-6 text-sm text-[hsl(240,4%,66%)]">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              14,000+ resumes analyzed
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">100% free. Zero gatekeeping.</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-shuttle">
          <svg className="h-6 w-6 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* ===== THREE OFFERINGS ===== */}
      <section id="offerings" className="border-t border-white/[0.08] py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="mb-16 max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-[hsl(240,4%,66%)]">
              The Platform
            </p>
            <h2
              className="animate-fade-rise mb-6 text-4xl text-white sm:text-5xl"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Three pillars. One unfair advantage.
            </h2>
            <p className="animate-fade-rise-delay text-base leading-relaxed text-[hsl(240,4%,66%)]">
              Every tool you need to outperform 95% of candidates — from domain-specific knowledge
              to pixel-perfect resumes. No fluff, no paywalls, no excuses.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {offerings.map((offer, idx) => (
              <Link
                key={offer.title}
                href={offer.href}
                className="group relative block"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="domain-card flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8">
                  {/* Icon */}
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/80">
                    {offer.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-3">
                      <h3
                        className="text-2xl text-white"
                        style={{ fontFamily: "'Instrument Serif', serif" }}
                      >
                        {offer.title}
                      </h3>
                      {offer.comingSoon && (
                        <span className="coming-soon-pulse rounded-full border border-white/20 bg-white/[0.05] px-3 py-0.5 text-xs text-[hsl(240,4%,66%)]">
                          Soon
                        </span>
                      )}
                    </div>
                    <p className="mb-1 text-sm font-medium text-white/60">{offer.tagline}</p>
                    <p className="mb-6 text-sm leading-relaxed text-[hsl(240,4%,66%)]">
                      {offer.description}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center text-sm text-[hsl(240,4%,66%)] transition-colors group-hover:text-white">
                    {offer.cta}
                    <svg
                      className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DOMAIN SELECTOR ===== */}
      <section id="domains" className="border-t border-white/[0.08] py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          {/* AEO Summary */}
          <p className="mb-6 text-base leading-relaxed text-[hsl(240,4%,66%)]">
            Auto Interview AI provides free, downloadable interview preparation resources organized
            by academic and professional domain. Choose your domain below to access curated study
            materials, case frameworks, and practice guides.
          </p>

          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-[hsl(240,4%,66%)]">
            Resources
          </p>
          <h2
            className="animate-fade-rise mb-4 text-4xl text-white sm:text-5xl"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Choose your domain
          </h2>
          <p className="animate-fade-rise-delay mb-12 max-w-2xl text-base leading-relaxed text-[hsl(240,4%,66%)]">
            Industry-specific prep kits designed by domain experts. Pick your field, download
            the playbook, and walk into every interview with conviction.
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
            The Playbook
          </h2>

          <div className="space-y-8">
            {[
              {
                step: '01',
                title: 'Pick Your Domain',
                desc: 'MBA, Engineering, Commerce, or CA — select the arena where you compete.',
              },
              {
                step: '02',
                title: 'Download the Intel',
                desc: 'Case frameworks, question banks, and strategy guides — all free, all ungated, all actionable.',
              },
              {
                step: '03',
                title: 'Build Your Resume',
                desc: 'Upload an existing resume or start from scratch. Our AI creates ATS-optimized resumes in under 2 minutes.',
              },
              {
                step: '04',
                title: 'Own the Room',
                desc: 'Walk into every interview prepared, polished, and playing to win.',
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

      {/* ===== SOCIAL PROOF ===== */}
      <section className="border-t border-white/[0.08] py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <h2
            className="mb-16 text-center text-4xl text-white sm:text-5xl"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            The numbers speak
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: '14,363', label: 'Resumes analyzed by our Hiring Index' },
              { value: '3.4×', label: 'Higher callback rate with ATS optimization' },
              { value: '58%', label: 'Of rejections due to missing keywords' },
              { value: '2 min', label: 'Average time to build an AI resume' },
            ].map((stat) => (
              <div
                key={stat.value}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 text-center"
              >
                <div
                  className="mb-3 text-4xl text-white"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {stat.value}
                </div>
                <p className="text-sm leading-relaxed text-[hsl(240,4%,66%)]">{stat.label}</p>
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
            The prepared always win.
          </h2>
          <p className="mb-10 text-base leading-relaxed text-[hsl(240,4%,66%)]">
            Free resources, zero gatekeeping. Pick a domain, build your resume, and start
            preparing like the top 5%.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="#domains"
              className="liquid-glass inline-block cursor-pointer rounded-full px-14 py-5 text-base text-white transition-transform hover:scale-[1.03]"
            >
              Explore Domains
            </Link>
            <Link
              href="/build-resume"
              className="inline-block rounded-full bg-white px-14 py-5 text-base font-medium text-black transition-all hover:bg-white/90"
            >
              Build Resume — 2 Min
            </Link>
          </div>
        </div>
      </section>
    </DomainLayout>
  )
}

export default DomainHomePage
