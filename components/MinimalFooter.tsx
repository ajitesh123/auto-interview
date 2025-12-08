export default function MinimalFooter() {
  return (
    <footer className="mt-16 border-t border-gray-800/50 bg-gradient-to-b from-transparent to-gray-900/20 py-8">
      <div className="text-center">
        <div className="text-sm text-gray-400 transition-colors hover:text-gray-300">
          © {new Date().getFullYear()} Auto Interview AI. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
