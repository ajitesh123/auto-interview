'use client'

import { useState, useEffect, useRef } from 'react'
import Link from './Link'
import SearchButton from './SearchButton'
import MinimalFooter from './MinimalFooter'
import Logo from './Logo'
import FloatingNav from './FloatingNav'
import { usePathname } from 'next/navigation'

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const features = [
    {
      id: 'build-resume',
      title: 'Create Resume',
      href: '/build-resume',
    },
    {
      id: 'ats-score',
      title: 'Check Resume ATS Score',
      href: '/ats-score',
    },
    {
      id: 'find-jobs',
      title: 'Find Relevant Jobs',
      href: '/find-jobs',
    },
    {
      id: 'assessments',
      title: 'Practice Interview',
      href: 'https://app.toughtongueai.com/',
      external: true,
    },
    {
      id: 'cover-letter',
      title: 'Generate Custom Cover Letter',
      href: '/cover-letter',
    },
    {
      id: 'free-resources',
      title: 'Free Resources Library',
      href: '/free-resources',
    },
  ]

  const isActive = (href: string) => {
    if (href.startsWith('http')) return false
    return pathname === href
  }

  const handleFeatureClick = (feature: any) => {
    if (feature.external) {
      window.open(feature.href, '_blank')
      setIsMenuOpen(false)
    } else {
      setIsMenuOpen(false)
    }
  }

  // Close menu on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false)
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMenuOpen])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <div className="min-h-screen bg-matte-black text-white">
      <div className="flex min-h-screen flex-col">
        {/* Top Header Bar */}
        <div className="sticky top-0 z-50 border-b border-matte-gray bg-matte-dark">
          <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            {/* Left side: Logo + Hamburger */}
            <div className="flex items-center space-x-3">
              {/* Hamburger Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="rounded-lg p-2 text-chatgpt-text transition-colors hover:bg-matte-gray focus:outline-none focus:ring-2 focus:ring-accent-500"
                aria-label="Toggle menu"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
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

              {/* Logo */}
              <Link href="/" className="flex items-center transition-opacity hover:opacity-80">
                <Logo width={40} height={40} className="mr-2" />
                <div>
                  <h1 className="text-base font-bold text-chatgpt-text sm:text-lg">
                    Auto Interview AI
                  </h1>
                  <p className="hidden text-xs text-chatgpt-textSecondary sm:block">
                    AI-powered career tools
                  </p>
                </div>
              </Link>
            </div>

            {/* Right side: Top Navigation */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Link
                href="/"
                className="hidden text-sm font-medium text-chatgpt-textSecondary transition-colors hover:text-chatgpt-text sm:block"
              >
                Home
              </Link>
              <Link
                href="/blog"
                className="hidden text-sm font-medium text-chatgpt-textSecondary transition-colors hover:text-chatgpt-text sm:block"
              >
                Blog
              </Link>
              <Link
                href="/about"
                className="hidden text-sm font-medium text-chatgpt-textSecondary transition-colors hover:text-chatgpt-text lg:block"
              >
                About
              </Link>
              <Link
                href="https://app.toughtongueai.com/"
                className="hidden text-sm font-medium text-chatgpt-textSecondary transition-colors hover:text-chatgpt-text lg:block"
              >
                Tough Tongue AI
              </Link>
              <SearchButton />
            </div>
          </div>
        </div>

        {/* Sliding Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm">
            <div
              ref={menuRef}
              className="absolute left-0 top-[73px] h-[calc(100vh-73px)] w-80 max-w-[90vw] overflow-y-auto bg-matte-dark shadow-2xl"
            >
              <nav className="space-y-1 p-4">
                <Link
                  href="/"
                  onClick={() => setIsMenuOpen(false)}
                  className={`group relative block w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-all duration-200 ${
                    pathname === '/'
                      ? 'bg-matte-gray/20 text-white'
                      : 'text-gray-400 hover:bg-matte-gray hover:text-white'
                  }`}
                >
                  {pathname === '/' && (
                    <div className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-full bg-gradient-to-b from-accent-500 to-accent-400" />
                  )}
                  <span className="relative z-10">Home</span>
                </Link>

                {features.map((feature) => (
                  <div key={feature.id}>
                    {feature.external ? (
                      <button
                        onClick={() => handleFeatureClick(feature)}
                        className={`group relative block w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-all duration-200 ${
                          isActive(feature.href)
                            ? 'bg-matte-gray/20 text-white'
                            : 'text-gray-400 hover:bg-matte-gray hover:text-white'
                        }`}
                      >
                        {isActive(feature.href) && (
                          <div className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-full bg-gradient-to-b from-accent-500 to-accent-400" />
                        )}
                        <span className="relative z-10 flex items-center justify-between">
                          {feature.title}
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </span>
                      </button>
                    ) : (
                      <Link
                        href={feature.href}
                        onClick={() => handleFeatureClick(feature)}
                        className={`group relative block w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-all duration-200 ${
                          isActive(feature.href)
                            ? 'bg-matte-gray/20 text-white'
                            : 'text-gray-400 hover:bg-matte-gray hover:text-white'
                        }`}
                      >
                        {isActive(feature.href) && (
                          <div className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-full bg-gradient-to-b from-accent-500 to-accent-400" />
                        )}
                        <span className="relative z-10">{feature.title}</span>
                      </Link>
                    )}
                  </div>
                ))}

                {/* Mobile-only links */}
                <div className="mt-6 border-t border-matte-gray pt-4 sm:hidden">
                  {pathname !== '/' && (
                    <Link
                      href="/"
                      onClick={() => setIsMenuOpen(false)}
                      className="mb-2 flex items-center space-x-2 rounded-lg px-4 py-3 text-sm font-medium text-gray-400 hover:bg-matte-gray hover:text-white"
                    >
                      <svg
                        className="h-4 w-4"
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
                      <span>Back to Home</span>
                    </Link>
                  )}
                  <Link
                    href="/blog"
                    onClick={() => setIsMenuOpen(false)}
                    className="block rounded-lg px-4 py-3 text-sm font-medium text-gray-400 hover:bg-matte-gray hover:text-white"
                  >
                    Blog
                  </Link>
                  <Link
                    href="/about"
                    onClick={() => setIsMenuOpen(false)}
                    className="block rounded-lg px-4 py-3 text-sm font-medium text-gray-400 hover:bg-matte-gray hover:text-white"
                  >
                    About
                  </Link>
                  <Link
                    href="https://app.toughtongueai.com/"
                    onClick={() => setIsMenuOpen(false)}
                    className="block rounded-lg px-4 py-3 text-sm font-medium text-gray-400 hover:bg-matte-gray hover:text-white"
                  >
                    Tough Tongue AI
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="w-full flex-1 overflow-auto">{children}</div>
      </div>
      {/* Floating Nav - only show on non-home pages */}
      {pathname !== '/' && <FloatingNav />}
      <MinimalFooter />
    </div>
  )
}

export default AppLayout
