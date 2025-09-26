import Link from './Link'
import SearchButton from './SearchButton'
import Logo from './Logo'

const LandingHeader = () => {
  return (
    <header className="flex w-full items-center justify-between border-b border-matte-gray bg-matte-black px-8 py-6">
      {/* Logo */}
      <Link href="/" aria-label="Auto Interview AI">
        <div className="flex items-center">
          <div className="mr-1 h-12 w-12">
            <Logo width={48} height={48} />
          </div>
          <span className="text-2xl font-bold text-chatgpt-text">Auto Interview AI</span>
        </div>
      </Link>

      {/* Navigation */}
      <div className="flex items-center space-x-8">
        <Link href="/blog" className="font-medium text-gray-400 transition-colors hover:text-white">
          Blog
        </Link>
        <Link
          href="/about"
          className="font-medium text-gray-400 transition-colors hover:text-white"
        >
          About
        </Link>
        <Link
          href="https://app.toughtongueai.com/"
          className="font-medium text-gray-400 transition-colors hover:text-white"
        >
          Tough Tongue AI
        </Link>
        <SearchButton />
      </div>
    </header>
  )
}

export default LandingHeader
