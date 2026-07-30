'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function FloatingNav() {
  const router = useRouter()
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [hasComments, setHasComments] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }

    setHasComments(!!document.getElementById('comment'))
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleBack = () => {
    router.back()
  }

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleScrollToComment = () => {
    document.getElementById('comment')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      aria-label="Floating Controls"
      className="animate-fade-rise fixed bottom-6 right-6 z-50 transition-all duration-300"
    >
      {/* Modern Cursor/Claude Style Glassmorphic Capsule */}
      <div className="group/dock relative flex items-center gap-1 rounded-full border border-white/15 bg-neutral-950/85 px-2.5 py-1.5 text-white shadow-[0_16px_36px_rgba(0,0,0,0.6),0_0_12px_rgba(255,255,255,0.08)] backdrop-blur-xl transition-all duration-300 hover:border-white/30 hover:shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_20px_rgba(255,255,255,0.15)]">
        {/* Subtle Ambient Prism Glow Effect */}
        <div className="pointer-events-none absolute -inset-0.5 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 opacity-0 blur-md transition-opacity duration-300 group-hover/dock:opacity-100" />

        {/* Back Button */}
        <button
          onClick={handleBack}
          className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full text-neutral-300 transition-all hover:bg-white/15 hover:text-white active:scale-95"
          aria-label="Back to previous page"
          title="Back"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>

        {/* Divider */}
        <div className="relative z-10 h-3.5 w-px bg-white/20" />

        {/* Home Button */}
        <Link
          href="/"
          className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full text-neutral-300 transition-all hover:bg-white/15 hover:text-white active:scale-95"
          aria-label="Go to home page"
          title="Home"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </Link>

        {/* Dynamic Scroll to Top */}
        {showScrollTop && (
          <>
            <div className="relative z-10 h-3.5 w-px bg-white/20 transition-opacity" />
            <button
              onClick={handleScrollTop}
              className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full text-neutral-300 transition-all hover:bg-white/15 hover:text-white active:scale-95"
              aria-label="Scroll to top"
              title="Scroll to Top"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </button>
          </>
        )}

        {/* Scroll to Comment (if comments exist) */}
        {hasComments && (
          <>
            <div className="relative z-10 h-3.5 w-px bg-white/20" />
            <button
              onClick={handleScrollToComment}
              className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full text-neutral-300 transition-all hover:bg-white/15 hover:text-white active:scale-95"
              aria-label="Jump to comments"
              title="Comments"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </button>
          </>
        )}
      </div>
    </nav>
  )
}
