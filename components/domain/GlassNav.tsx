'use client'

import React, { useState } from 'react'
import Link from 'next/link'

interface GlassNavProps {
  currentPath?: string
}

const GlassNav: React.FC<GlassNavProps> = ({ currentPath = '/' }) => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/#domains', label: 'Resources' },
    { href: '/build-resume', label: 'Resume Builder' },
    { href: '/blog', label: 'Insights' },
    { href: '/about', label: 'About' },
  ]

  return (
    <nav className="relative z-20 py-6 pl-6 pr-6">
      <div className="liquid-glass mx-auto flex max-w-5xl items-center justify-between rounded-full px-6 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
            <path
              strokeLinecap="round"
              strokeWidth={1.5}
              d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"
            />
          </svg>
          <span className="text-lg font-semibold text-white">Asme</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                currentPath === link.href ? 'text-white' : 'text-white/80 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/about"
            className="text-sm font-medium text-white transition-colors hover:text-white/80"
          >
            Sign Up
          </Link>
          <Link
            href="/#offerings"
            className="liquid-glass cursor-pointer rounded-full px-6 py-2 text-sm text-white transition-transform hover:scale-[1.03]"
          >
            Login
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-white md:hidden"
          aria-label="Toggle navigation menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="mx-auto mt-3 max-w-5xl rounded-2xl border border-white/10 bg-black/80 px-6 pb-6 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-4 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-sm transition-colors ${
                  currentPath === link.href
                    ? 'text-white'
                    : 'text-[hsl(240,4%,66%)] hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#offerings"
              onClick={() => setMobileOpen(false)}
              className="liquid-glass mt-2 rounded-full px-6 py-2.5 text-center text-sm text-white"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default GlassNav
