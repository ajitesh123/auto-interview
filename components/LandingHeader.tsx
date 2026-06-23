import Link from './Link'
import SearchButton from './SearchButton'
import Logo from './Logo'

const LandingHeader = () => {
  const featureTools = [
    { href: '/build-resume', title: 'Resume Builder', icon: '📝' },
    { href: '/ats-score', title: 'ATS Score', icon: '📊' },
    { href: '/find-jobs', title: 'Find Jobs', icon: '🔍' },
    { href: '/free-mock-interview', title: 'Mock Interview', icon: '🎤' },
  ]

  return (
    <header className="border-b border-white/[0.08] bg-black px-4 py-4 sm:px-8 sm:py-6">
      {/* Logo and Main Navigation - Desktop */}
      <div className="hidden w-full items-center justify-between sm:flex">
        <Link href="/" aria-label="Auto Interview AI">
          <div className="flex items-center">
            <div className="mr-1 h-12 w-12">
              <Logo width={48} height={48} />
            </div>
            <span className="text-2xl font-bold text-white">Auto Interview AI</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="flex items-center space-x-8">
          <Link
            href="/#domains"
            className="font-medium text-white/60 transition-colors hover:text-white"
          >
            Resources
          </Link>
          <Link
            href="/blog"
            className="font-medium text-white/60 transition-colors hover:text-white"
          >
            Insights
          </Link>
          <Link
            href="/about"
            className="font-medium text-white/60 transition-colors hover:text-white"
          >
            About
          </Link>
          <Link
            href="/free-mock-interview"
            className="font-medium text-white/60 transition-colors hover:text-white"
          >
            Mock Interview
          </Link>
          <SearchButton />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="sm:hidden">
        <div className="mb-4 flex items-center justify-between">
          <Link href="/" aria-label="Auto Interview AI">
            <div className="flex items-center">
              <div className="mr-2 h-10 w-10">
                <Logo width={40} height={40} />
              </div>
              <span className="text-xl font-bold text-white">Auto Interview AI</span>
            </div>
          </Link>
          <SearchButton />
        </div>

        <div className="mb-4">
          <p className="mb-3 text-sm font-medium text-white/40">Career Intelligence Tools</p>
          <div className="grid grid-cols-2 gap-2">
            {featureTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="flex items-center space-x-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white/70 transition-colors hover:border-white/20 hover:text-white"
              >
                <span className="text-base">{tool.icon}</span>
                <span className="font-medium">{tool.title}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/blog" className="text-sm text-white/60 hover:text-white">
            Insights
          </Link>
          <Link href="/about" className="text-sm text-white/60 hover:text-white">
            About
          </Link>
          <Link href="/free-mock-interview" className="text-sm text-white/60 hover:text-white">
            Mock Interview
          </Link>
        </div>
      </div>
    </header>
  )
}

export default LandingHeader
