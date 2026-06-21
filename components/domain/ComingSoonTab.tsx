'use client'

import React, { useState } from 'react'

interface ComingSoonTabProps {
  featureName: string
  description: string
}

const ComingSoonTab: React.FC<ComingSoonTabProps> = ({ featureName, description }) => {
  const [showNotify, setShowNotify] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      {/* Lock Icon */}
      <div className="coming-soon-pulse mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
        <svg
          className="h-10 w-10 text-[hsl(240,4%,66%)]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      </div>

      {/* Badge */}
      <span className="mb-4 inline-block rounded-full border border-white/20 bg-white/[0.05] px-4 py-1.5 text-sm font-medium text-white">
        Coming Soon
      </span>

      {/* Feature Name */}
      <h3
        className="mb-3 text-2xl text-white sm:text-3xl"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        {featureName}
      </h3>

      {/* Description */}
      <p className="mb-8 max-w-md text-base leading-relaxed text-[hsl(240,4%,66%)]">
        {description}
      </p>

      {/* Notify Button */}
      {!showNotify ? (
        <button
          onClick={() => setShowNotify(true)}
          className="liquid-glass flex cursor-pointer items-center gap-2 rounded-full px-8 py-3 text-sm text-white transition-transform hover:scale-[1.03]"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          Notify Me When Available
        </button>
      ) : (
        <div className="animate-fade-rise flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-white">
            <svg className="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            We&apos;ll notify you when {featureName} launches!
          </div>
          <p className="text-xs text-[hsl(240,4%,66%)]">Stay tuned for updates</p>
        </div>
      )}
    </div>
  )
}

export default ComingSoonTab
