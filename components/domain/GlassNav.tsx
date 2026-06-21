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
    { href: '/#domains', label: 'Domains' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
  ]

  return (
    <nav className="relative z-10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 sm:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1">
          <span
            className="text-2xl tracking-tight text-white sm:text-3xl"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Auto Interview AI<sup className="text-xs">®</sup>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
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
            href="/#domains"
            className="liquid-glass cursor-pointer rounded-full px-6 py-2.5 text-sm text-white transition-transform hover:scale-[1.03]"
          >
            Get Started
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
        <div className="border-t border-white/10 px-6 pb-6 md:hidden">
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
              href="/#domains"
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
