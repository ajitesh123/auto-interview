'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import CubeLogo from '@/components/CubeLogo'

interface GlassNavProps {
  currentPath?: string
}

const GlassNav: React.FC<GlassNavProps> = ({ currentPath = '/' }) => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { href: '/cv-templates', label: 'CV Templates' },
    { href: '/interview-questions', label: 'Interview Q&A' },
    { href: '/learn-ai', label: 'Learn AI' },
    { href: '/free-mock-interview', label: 'Mock Interview' },
    { href: '/cold-call-practice', label: 'Cold Calling' },
    { href: '/ai-calling-roi-calculator', label: 'ROI Calculator' },
    { href: '/resources', label: 'Resources' },
    { href: '/blog', label: 'Blog' },
  ]

  return (
    <nav className="nav-bar sticky top-0 z-50 border-b border-border/80 bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6">
        {/* Logo + Wordmark — Perfectly centered horizontally and vertically */}
        <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
          <CubeLogo size={24} />
          <span className="text-[15px] font-medium tracking-[-0.01em] text-fg">
            Auto Interview AI
          </span>
        </Link>

        {/* Desktop Nav — Center-left */}
        <div className="hidden items-center gap-6 xl:flex">
          {navLinks.map((link) => {
            const isActive =
              link.href === '/'
                ? currentPath === '/'
                : currentPath === link.href || currentPath.startsWith(`${link.href}/`)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap text-sm transition-colors ${
                  isActive ? 'font-medium !text-fg' : '!text-fg-2 hover:!text-fg'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* Right Action Cluster */}
        <div className="hidden items-center gap-3 xl:flex">
          <Link
            href="/about"
            className="inline-flex items-center justify-center rounded-[6px] px-3.5 py-1.5 text-sm !text-fg ring-1 ring-inset ring-border transition-colors hover:bg-muted"
          >
            About
          </Link>
          <Link
            href="/free-mock-interview"
            className="inline-flex items-center justify-center rounded-[6px] bg-signal px-4 py-1.5 text-sm font-medium !text-white transition-colors hover:bg-signal-strong"
          >
            Free mock interview
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-fg xl:hidden"
          aria-label="Toggle navigation menu"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="mx-6 mt-1 rounded-[6px] bg-surface px-6 pb-6 ring-1 ring-border xl:hidden">
          <div className="flex flex-col gap-4 pt-4">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? currentPath === '/'
                  : currentPath === link.href || currentPath.startsWith(`${link.href}/`)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`whitespace-nowrap text-sm transition-colors ${
                    isActive ? 'font-medium !text-fg' : '!text-fg-2 hover:!text-fg'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
            <div className="mt-2 flex gap-3 border-t border-border pt-4">
              <Link
                href="/about"
                onClick={() => setMobileOpen(false)}
                className="flex-1 rounded-[6px] py-2 text-center text-sm !text-fg ring-1 ring-inset ring-border"
              >
                About
              </Link>
              <Link
                href="/free-mock-interview"
                onClick={() => setMobileOpen(false)}
                className="flex-1 rounded-[6px] bg-signal py-2 text-center text-sm font-medium !text-white"
              >
                Free mock interview
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default GlassNav
