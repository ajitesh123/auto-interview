import Link from './Link'
import SearchButton from './SearchButton'

const LandingHeader = () => {
  return (
    <header className="flex items-center justify-between w-full bg-black py-6 px-8 border-b border-gray-800">
      {/* Logo */}
      <Link href="/" aria-label="Auto Interview">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-pink-500 rounded-lg mr-3"></div>
          <span className="text-2xl font-bold text-white">Auto Interview</span>
        </div>
      </Link>

      {/* Navigation */}
      <div className="flex items-center space-x-8">
        <Link
          href="/blog"
          className="text-gray-400 hover:text-white transition-colors font-medium"
        >
          Blog
        </Link>
        <Link
          href="/about"
          className="text-gray-400 hover:text-white transition-colors font-medium"
        >
          About
        </Link>
        <Link
          href="https://app.toughtongueai.com/"
          className="text-gray-400 hover:text-white transition-colors font-medium"
        >
          Tough Tongue AI
        </Link>
        <SearchButton />
      </div>
    </header>
  )
}

export default LandingHeader
