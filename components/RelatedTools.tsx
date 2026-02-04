import Link from './Link'

interface Tool {
  title: string
  description: string
  href: string
  icon: React.ReactNode
}

interface RelatedToolsProps {
  currentPage: string
}

const allTools: Tool[] = [
  {
    title: 'Resume Builder',
    description: 'Build professional ATS-friendly resumes with AI-powered templates',
    href: '/build-resume',
    icon: (
      <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
  {
    title: 'ATS Score Checker',
    description: 'Check your resume ATS compatibility and get improvement suggestions',
    href: '/ats-score',
    icon: (
      <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: 'Job Search',
    description: 'Find relevant job opportunities on LinkedIn with AI matching',
    href: '/find-jobs',
    icon: (
      <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
  },
  {
    title: 'Cover Letter Generator',
    description: 'Create personalized cover letters tailored to job descriptions',
    href: '/cover-letter',
    icon: (
      <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    title: 'Free Resources Library',
    description: 'Download templates, checklists, and job search playbooks',
    href: '/free-resources',
    icon: (
      <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
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
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {relatedTools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group block rounded-lg border border-gray-700 bg-gray-900 p-6 transition-all hover:border-primary hover:bg-gray-800 hover:shadow-lg hover:shadow-primary/20"
            aria-label={`Go to ${tool.title}`}
          >
            <div className="group-hover:text-primary-300 mb-4 text-primary transition-colors">
              {tool.icon}
            </div>
            <h3 className="mb-2 text-lg font-semibold text-white transition-colors group-hover:text-primary">
              {tool.title}
            </h3>
            <p className="text-sm text-gray-400 transition-colors group-hover:text-gray-300">
              {tool.description}
            </p>
            <div className="group-hover:text-primary-300 mt-4 flex items-center text-sm font-medium text-primary transition-colors">
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
