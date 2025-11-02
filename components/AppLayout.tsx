'use client'

import Link from './Link'
import SearchButton from './SearchButton'
import MinimalFooter from './MinimalFooter'
import Logo from './Logo'
import { usePathname } from 'next/navigation'

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()

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
  ]

  const isActive = (href: string) => {
    if (href.startsWith('http')) return false
    return pathname === href
  }

  const handleFeatureClick = (feature: any) => {
    if (feature.external) {
      window.open(feature.href, '_blank')
    }
    // For internal links, Next.js Link will handle navigation
  }

  return (
    <div className="min-h-screen bg-matte-black text-white">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <div className="flex w-full flex-col border-b border-matte-gray bg-matte-dark p-4 lg:min-h-screen lg:w-64 lg:max-w-64 lg:flex-shrink-0 lg:border-b-0 lg:border-r">
          <div className="mb-6">
            <Link href="/" className="mb-2 flex items-center transition-opacity hover:opacity-80">
              <Logo width={40} height={40} className="mr-1" />
              <h1 className="text-lg font-bold text-chatgpt-text sm:text-xl">Auto Interview AI</h1>
            </Link>
            <p className="text-xs text-chatgpt-textSecondary sm:text-sm">AI-powered career tools</p>
          </div>

          <nav className="flex-1 space-y-1">
            <Link
              href="/"
              className={`group relative block w-full animate-slide-up rounded-lg px-3 py-2 text-left text-xs font-medium transition-all duration-300 hover:translate-x-2 hover:scale-105 hover:shadow-lg hover:shadow-gray-500/20 sm:text-sm ${
                pathname === '/'
                  ? 'bg-matte-gray/20 text-white'
                  : 'text-gray-400 hover:bg-matte-gray hover:text-white'
              }`}
              style={{ animationDelay: '0.1s' }}
            >
              {pathname === '/' && (
                <div className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-full bg-gradient-to-b from-accent-500 to-accent-400 transition-all duration-300"></div>
              )}
              <span className="relative z-10 whitespace-normal leading-snug">Home</span>
            </Link>

            {features.map((feature, index) => (
              <div key={feature.id}>
                {feature.external ? (
                  <button
                    onClick={() => handleFeatureClick(feature)}
                    className={`group relative block w-full animate-slide-up rounded-lg px-3 py-2 text-left text-xs font-medium transition-all duration-300 hover:translate-x-2 hover:scale-105 hover:shadow-lg hover:shadow-gray-500/20 sm:text-sm ${
                      isActive(feature.href)
                        ? 'bg-matte-gray/20 text-white'
                        : 'text-gray-400 hover:bg-matte-gray hover:text-white'
                    }`}
                    style={{ animationDelay: `${(index + 1) * 0.05}s` }}
                  >
                    {isActive(feature.href) && (
                      <div className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-full bg-gradient-to-b from-accent-500 to-accent-400 transition-all duration-300"></div>
                    )}
                    <span className="relative z-10 whitespace-normal leading-snug">
                      {feature.title}
                    </span>
                  </button>
                ) : (
                  <Link
                    href={feature.href}
                    className={`group relative block w-full animate-slide-up rounded-lg px-3 py-2 text-left text-xs font-medium transition-all duration-300 hover:translate-x-2 hover:scale-105 hover:shadow-lg hover:shadow-gray-500/20 sm:text-sm ${
                      isActive(feature.href)
                        ? 'bg-matte-gray/20 text-white'
                        : 'text-gray-400 hover:bg-matte-gray hover:text-white'
                    }`}
                    style={{ animationDelay: `${(index + 1) * 0.05}s` }}
                  >
                    {isActive(feature.href) && (
                      <div className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-full bg-gradient-to-b from-accent-500 to-accent-400 transition-all duration-300"></div>
                    )}
                    <span className="relative z-10 whitespace-normal leading-snug">
                      {feature.title}
                    </span>
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>

        <div className="flex min-h-screen flex-1 flex-col lg:min-w-0">
          <div className="flex items-center justify-between border-b border-matte-gray p-4 sm:p-6">
            {/* Back to Home Button - hide on home route */}
            {pathname !== '/' ? (
              <Link
                href="/"
                className="flex items-center space-x-2 rounded-lg bg-matte-gray/20 px-3 py-2 text-sm font-medium text-chatgpt-textSecondary transition-all duration-300 hover:scale-105 hover:bg-matte-gray/40 hover:text-chatgpt-text sm:px-4 sm:py-2 sm:text-base"
              >
                <svg
                  className="h-4 w-4 sm:h-5 sm:w-5"
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
            ) : (
              <div />
            )}

            {/* Top Navigation */}
            <div className="flex items-center space-x-4 sm:space-x-6">
              <Link
                href="/"
                className="text-sm font-medium text-chatgpt-textSecondary transition-colors hover:text-chatgpt-text sm:text-base"
              >
                Home
              </Link>
              <Link
                href="/blog"
                className="text-sm font-medium text-chatgpt-textSecondary transition-colors hover:text-chatgpt-text sm:text-base"
              >
                Blog
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-chatgpt-textSecondary transition-colors hover:text-chatgpt-text sm:text-base"
              >
                About
              </Link>
              <Link
                href="https://app.toughtongueai.com/"
                className="text-sm font-medium text-chatgpt-textSecondary transition-colors hover:text-chatgpt-text sm:text-base"
              >
                Tough Tongue AI
              </Link>
              <SearchButton />
            </div>
          </div>

          <div className="w-full flex-1 overflow-auto">{children}</div>
        </div>
      </div>
      <MinimalFooter />
    </div>
  )
}

export default AppLayout
