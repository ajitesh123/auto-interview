import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from './Logo'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'

const Header = () => {
  let headerClass =
    'flex items-center w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 justify-between py-4 px-4 sm:py-6 sm:px-8'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }

  const featureTools = [
    { href: '/build-resume', title: 'Create Resume', icon: '📝' },
    { href: '/ats-score', title: 'Check ATS Score', icon: '📊' },
    { href: '/find-jobs', title: 'Find Jobs', icon: '🔍' },
    { href: '/cover-letter', title: 'Cover Letter', icon: '✍️' },
    { href: '/free-resources', title: 'Free Resources', icon: '🎁' },
  ]

  return (
    <header className={headerClass}>
      {/* Desktop Layout */}
      <div className="hidden w-full items-center justify-between sm:flex">
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center justify-between">
            <div className="mr-1 h-12 w-12">
              <Logo width={48} height={48} />
            </div>
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div className="hidden h-6 text-2xl font-semibold text-black sm:block">
                {siteMetadata.headerTitle}
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
          </div>
        </Link>
        <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
          <div className="no-scrollbar hidden max-w-40 items-center space-x-4 overflow-x-auto sm:flex sm:space-x-6 md:max-w-72 lg:max-w-96">
            {headerNavLinks
              .filter((link) => link.href !== '/')
              .map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="block font-medium text-gray-700 hover:text-black"
                >
                  {link.title}
                </Link>
              ))}
          </div>
          <SearchButton />
          <ThemeSwitch />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="sm:hidden">
        <div className="flex w-full flex-col">
          {/* Logo */}
          <div className="mb-3 flex items-center justify-between">
            <Link href="/" aria-label={siteMetadata.headerTitle}>
              <div className="flex items-center">
                <div className="mr-2 h-10 w-10">
                  <Logo width={40} height={40} />
                </div>
                <span className="text-chatgpt-text text-lg font-semibold">
                  {typeof siteMetadata.headerTitle === 'string'
                    ? siteMetadata.headerTitle
                    : 'Auto Interview AI'}
                </span>
              </div>
            </Link>
            <div className="flex items-center space-x-2">
              <SearchButton />
              <MobileNav />
            </div>
          </div>

          {/* Feature Tools */}
          <div className="mb-3">
            <p className="mb-2 text-xs font-medium text-gray-400">AI-powered career tools</p>
            <div className="grid grid-cols-2 gap-2">
              {featureTools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="flex items-center space-x-2 rounded-lg border border-gray-700 bg-gray-800 px-2 py-1.5 text-xs text-gray-300 transition-colors hover:border-primary hover:text-white"
                >
                  <span className="text-sm">{tool.icon}</span>
                  <span className="font-medium">{tool.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
