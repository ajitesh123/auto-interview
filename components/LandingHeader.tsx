import Link from './Link'
import SearchButton from './SearchButton'

const LandingHeader = () => {
  return (
    <header className="flex w-full items-center justify-between border-b border-gray-800 bg-black px-8 py-6">
      {/* Logo */}
      <Link href="/" aria-label="Auto Interview">
        <div className="flex items-center">
          <div className="mr-3 h-8 w-8 rounded-lg bg-pink-500"></div>
          <span className="text-2xl font-bold text-white">Auto Interview</span>
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
          href="https://www.toughtongueai.com/"
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
