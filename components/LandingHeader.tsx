import Link from './Link'
import SearchButton from './SearchButton'
import Logo from './Logo'

const LandingHeader = () => {
  const featureTools = [
    { href: '/build-resume', title: 'Create Resume', icon: '📝' },
    { href: '/ats-score', title: 'Check ATS Score', icon: '📊' },
    { href: '/find-jobs', title: 'Find Jobs', icon: '🔍' },
    { href: '/cover-letter', title: 'Cover Letter', icon: '✍️' },
  ]

  return (
    <header className="border-b border-matte-gray bg-matte-black px-4 py-4 sm:px-8 sm:py-6">
      {/* Logo and Main Navigation - Desktop */}
      <div className="hidden w-full items-center justify-between sm:flex">
        <Link href="/" aria-label="Auto Interview AI">
          <div className="flex items-center">
            <div className="mr-1 h-12 w-12">
              <Logo width={48} height={48} />
            </div>
            <span className="text-2xl font-bold text-chatgpt-text">Auto Interview AI</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="flex items-center space-x-8">
          <Link
            href="/blog"
            className="font-medium text-gray-400 transition-colors hover:text-white"
          >
            Blog
          </Link>
          <Link
            href="/about"
            className="font-medium text-gray-400 transition-colors hover:text-white"
          >
            About
          </Link>
          <Link
            href="/free-mock-interview"
            className="font-medium text-gray-400 transition-colors hover:text-white"
          >
            Free Mock Interview
          </Link>
          <SearchButton />
        </div>
      </div>

      {/* Mobile Layout - Logo + Feature Tools */}
      <div className="sm:hidden">
        {/* Logo + Title Row */}
        <div className="mb-4 flex items-center justify-between">
          <Link href="/" aria-label="Auto Interview AI">
            <div className="flex items-center">
              <div className="mr-2 h-10 w-10">
                <Logo width={40} height={40} />
              </div>
              <span className="text-xl font-bold text-chatgpt-text">Auto Interview AI</span>
            </div>
          </Link>
          <SearchButton />
        </div>

        {/* Feature Tools - Similar to Final Round AI */}
        <div className="mb-4">
          <p className="mb-3 text-sm font-medium text-gray-400">AI-powered career tools</p>
          <div className="grid grid-cols-2 gap-2">
            {featureTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="flex items-center space-x-2 rounded-lg border border-matte-gray bg-matte-black px-3 py-2 text-sm text-gray-300 transition-colors hover:border-accent-600 hover:text-white"
              >
                <span className="text-base">{tool.icon}</span>
                <span className="font-medium">{tool.title}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Menu Links */}
        <div className="flex items-center space-x-4">
          <Link href="/blog" className="text-sm text-gray-400 hover:text-white">
            Blog
          </Link>
          <Link href="/about" className="text-sm text-gray-400 hover:text-white">
            About
          </Link>
          <Link href="/free-mock-interview" className="text-sm text-gray-400 hover:text-white">
            Free Mock Interview
          </Link>
        </div>
      </div>
    </header>
  )
}

export default LandingHeader
