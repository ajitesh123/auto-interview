import Link from './Link'

interface Tool {
  title: string
  description: string
  href: string
  icon: string
}

interface RelatedToolsProps {
  currentPage: string
}

const allTools: Tool[] = [
  {
    title: 'Resume Builder',
    description: 'Build professional ATS-friendly resumes with AI-powered templates',
    href: '/build-resume',
    icon: '📝',
  },
  {
    title: 'ATS Score Checker',
    description: 'Check your resume ATS compatibility and get improvement suggestions',
    href: '/ats-score',
    icon: '✅',
  },
  {
    title: 'Job Search',
    description: 'Find relevant job opportunities on LinkedIn with AI matching',
    href: '/find-jobs',
    icon: '🔍',
  },
  {
    title: 'Cover Letter Generator',
    description: 'Create personalized cover letters tailored to job descriptions',
    href: '/cover-letter',
    icon: '✉️',
  },
]

export default function RelatedTools({ currentPage }: RelatedToolsProps) {
  const relatedTools = allTools.filter((tool) => tool.href !== currentPage)

  return (
    <section className="mx-auto max-w-7xl border-t border-gray-700 px-4 pt-12 sm:px-6 lg:px-8">
      <h2 className="mb-8 text-center text-2xl font-bold text-white sm:text-3xl">
        Related Job Preparation Tools
      </h2>
      <p className="mx-auto mb-8 max-w-2xl text-center text-gray-400">
        Complete your job search journey with our suite of free AI-powered career tools
      </p>
      <div className="grid gap-6 md:grid-cols-3">
        {relatedTools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group block rounded-lg border border-gray-700 bg-gray-900 p-6 transition-all hover:border-purple-500 hover:bg-gray-800 hover:shadow-lg hover:shadow-purple-500/20"
            aria-label={`Go to ${tool.title}`}
          >
            <div className="mb-4 text-4xl">{tool.icon}</div>
            <h3 className="mb-2 text-lg font-semibold text-white transition-colors group-hover:text-purple-400">
              {tool.title}
            </h3>
            <p className="text-sm text-gray-400 transition-colors group-hover:text-gray-300">
              {tool.description}
            </p>
            <div className="mt-4 flex items-center text-sm font-medium text-purple-400 transition-colors group-hover:text-purple-300">
              Try it free
              <svg
                className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

