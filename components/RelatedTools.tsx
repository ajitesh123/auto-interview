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
    title: 'Resume Keyword Checker',
    description: 'Paste a job post and your resume (CV) to see which skills are missing',
    href: '/resume-keyword-checker',
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
    title: 'Job Search',
    description: 'Search LinkedIn, Naukri, Indeed and Google Jobs in one go',
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
    title: 'Cover Letter Samples',
    description: 'Sample cover letters for 10 roles, each with a Word template',
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
    description:
      'Hand-checked casebooks, resume templates and study PDFs, linked to the publishers',
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
  {
    title: 'ATS Resume Checker',
    description: 'Upload your PDF or Word resume and see the text an ATS would pull out',
    href: '/ats-resume-checker',
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
    title: 'Interview Prep Plan',
    description: 'Enter your interview date and get a day-by-day plan to tick off',
    href: '/interview-prep-plan',
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
]

export default function RelatedTools({ currentPage }: RelatedToolsProps) {
  const relatedTools = allTools.filter((tool) => tool.href !== currentPage).slice(0, 4)

  return (
    <section className="bg-bg py-14">
      <div className="mx-auto max-w-7xl border-t border-border px-4 pt-12 sm:px-6 lg:px-8">
        <h2 className="mb-3 text-center text-h2 font-semibold text-fg">More free job-prep tools</h2>
        <p className="mx-auto mb-8 max-w-2xl text-center text-body text-fg-2">
          Free, no signup, nothing uploaded.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {relatedTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group block rounded-xl border border-border bg-surface p-6 transition-[border-color,box-shadow] duration-fast hover:border-border-strong hover:shadow-e2"
              aria-label={`Go to ${tool.title}`}
            >
              <div className="mb-4 text-signal">{tool.icon}</div>
              <h3 className="mb-2 text-h4 font-semibold text-fg">{tool.title}</h3>
              <p className="text-small text-fg-2">{tool.description}</p>
              <div className="mt-4 flex items-center text-small font-medium text-signal-strong">
                Try it free
                <svg
                  className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
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
      </div>
    </section>
  )
}
