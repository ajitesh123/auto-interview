'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function FloatingNav() {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Home Button */}
      <Link
        href="/"
        className="group flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-accent-600 to-accent-700 shadow-lg transition-all duration-300 hover:scale-110 hover:from-accent-500 hover:to-accent-600 hover:shadow-xl hover:shadow-accent-500/50 active:scale-95"
        aria-label="Go to home page"
      >
        <svg
          className="h-6 w-6 text-white transition-transform group-hover:scale-110"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      </Link>

      {/* Back Button */}
      <button
        onClick={handleBack}
        className="group flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-purple-700 shadow-lg transition-all duration-300 hover:scale-110 hover:from-purple-500 hover:to-purple-600 hover:shadow-xl hover:shadow-purple-500/50 active:scale-95"
        aria-label="Go back to previous page"
      >
        <svg
          className="h-6 w-6 text-white transition-transform group-hover:scale-110"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </button>
    </div>
  )
}
