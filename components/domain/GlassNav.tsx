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
    { href: '/cv-templates', label: 'CVs' },
    { href: '/resources', label: 'Resources' },
    { href: '/free-mock-interview', label: 'Mock Interview' },
    { href: '/communities', label: 'Communities' },
    { href: '/blog', label: 'Blog' },
  ]

  return (
    <nav className="nav-bar sticky top-0 z-50">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6">
        {/* Logo + Wordmark */}
        <Link href="/" className="flex items-center gap-2.5">
          <CubeLogo size={22} />
          <span className="text-sm font-medium tracking-tight text-[#171717]">
            Auto Interview AI
          </span>
        </Link>

        {/* Desktop Nav — Center-left */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-normal transition-colors ${
                currentPath === link.href
                  ? 'font-medium !text-[#171717]'
                  : '!text-[#666666] hover:!text-[#171717]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Action Cluster */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/about"
            className="inline-flex items-center justify-center rounded-[6px] px-3.5 py-1.5 text-sm !text-[#171717] transition-colors hover:bg-[#f0f0f0]"
            style={{ boxShadow: '0 0 0 1px #ebebeb' }}
          >
            About
          </Link>
          <Link
            href="/build-resume"
            className="inline-flex items-center justify-center rounded-[6px] bg-[#171717] px-4 py-1.5 text-sm font-medium !text-white transition-colors hover:bg-[#383838]"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-[#171717] md:hidden"
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
        <div
          className="mx-6 mt-1 rounded-[6px] bg-white px-6 pb-6 md:hidden"
          style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.08)' }}
        >
          <div className="flex flex-col gap-4 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-sm transition-colors ${
                  currentPath === link.href
                    ? 'font-medium !text-[#171717]'
                    : '!text-[#666666] hover:!text-[#171717]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-3 border-t border-[#ebebeb] pt-4">
              <Link
                href="/about"
                onClick={() => setMobileOpen(false)}
                className="flex-1 rounded-[6px] py-2 text-center text-sm !text-[#171717]"
                style={{ boxShadow: '0 0 0 1px #ebebeb' }}
              >
                About
              </Link>
              <Link
                href="/build-resume"
                onClick={() => setMobileOpen(false)}
                className="flex-1 rounded-[6px] bg-[#171717] py-2 text-center text-sm font-medium !text-white"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default GlassNav
