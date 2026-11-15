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
      className="animate-fade-rise fixed bottom-6 right-6 z-50 print:hidden"
    >
      {/* Signal Paper capsule: light surface, hairline, small lift */}
      <div className="flex items-center gap-1 rounded-full border border-border bg-surface px-2 py-1.5 text-fg-2 shadow-e2">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex h-9 w-9 items-center justify-center rounded-full text-fg-2 transition-colors duration-fast hover:bg-muted hover:text-signal-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
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
        <div className="h-3.5 w-px bg-border" />

        {/* Home Button */}
        <Link
          href="/"
          className="flex h-9 w-9 items-center justify-center rounded-full text-fg-2 transition-colors duration-fast hover:bg-muted hover:text-signal-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
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
            <div className="h-3.5 w-px bg-border" />
            <button
              onClick={handleScrollTop}
              className="flex h-9 w-9 items-center justify-center rounded-full text-fg-2 transition-colors duration-fast hover:bg-muted hover:text-signal-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
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
            <div className="h-3.5 w-px bg-border" />
            <button
              onClick={handleScrollToComment}
              className="flex h-9 w-9 items-center justify-center rounded-full text-fg-2 transition-colors duration-fast hover:bg-muted hover:text-signal-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
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
