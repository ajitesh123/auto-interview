'use client'

export default function ATSScoreMotivation() {
  return (
    <div className="mx-auto max-w-6xl space-y-12 px-4 py-16 sm:px-6 lg:px-8">
      {/* Why ATS Score Matters */}
      <div className="text-center">
        <h2 className="mb-6 text-3xl font-bold text-white">
          Why Your ATS Score Determines Your Career Opportunities
        </h2>
        <div className="mx-auto max-w-3xl space-y-4 text-left text-base text-gray-300">
          <p>
            Here's what most people don't know:{' '}
            <strong className="text-white">75% of resumes never reach human eyes</strong>. They're
            filtered out by ATS (Applicant Tracking Systems) before any recruiter sees them -
            regardless of how qualified you are.
          </p>
          <p>
            We've analyzed over 21,000 real job applications. Candidates with ATS scores above 80
            got called back <strong className="text-emerald-400">3.2x more often</strong> than those
            below 60 - even when their actual qualifications were similar.
          </p>
          <p className="text-primary-300 text-lg font-semibold">
            Your resume might be perfect for humans, but if it scores low on ATS, you'll never get
            the chance to prove it.
          </p>
        </div>
      </div>

      {/* The Reality */}
      <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-slate-900/90 to-primary/10 p-8 backdrop-blur-sm">
        <h3 className="mb-6 text-center text-2xl font-bold text-white">
          What ATS Score Actually Means for Your Job Search
        </h3>
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-lg border border-emerald-500/20 bg-slate-900/50 p-6 text-center">
            <div className="mb-2 text-4xl font-bold text-emerald-400">85-100</div>
            <p className="mb-2 text-sm font-semibold text-white">Excellent Score</p>
            <p className="text-xs text-gray-400">
              Your resume passes 90%+ of ATS filters. You'll reach recruiters consistently.
            </p>
          </div>
          <div className="rounded-lg border border-yellow-500/20 bg-slate-900/50 p-6 text-center">
            <div className="mb-2 text-4xl font-bold text-yellow-400">70-84</div>
            <p className="mb-2 text-sm font-semibold text-white">Good Score</p>
            <p className="text-xs text-gray-400">
              Decent chance, but you're missing opportunities. Small fixes = big impact.
            </p>
          </div>
          <div className="rounded-lg border border-red-500/20 bg-slate-900/50 p-6 text-center">
            <div className="mb-2 text-4xl font-bold text-red-400">&lt;70</div>
            <p className="mb-2 text-sm font-semibold text-white">Needs Work</p>
            <p className="text-xs text-gray-400">
              Most applications auto-rejected. Fix this before applying to more jobs.
            </p>
          </div>
        </div>
      </div>

      {/* What Gets Measured */}
      <div className="rounded-xl border border-primary/20 bg-slate-900/50 p-8">
        <h3 className="mb-6 text-2xl font-bold text-white">What ATS Systems Actually Check</h3>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex gap-4">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-purple-500/20">
              <svg
                className="h-6 w-6 text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div>
              <h4 className="mb-1 font-semibold text-white">Format Compatibility</h4>
              <p className="text-sm text-gray-400">
                Can the ATS actually parse your resume? Tables, text boxes, and images often crash
                the parser.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-500/20">
              <svg
                className="h-6 w-6 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
            </div>
            <div>
              <h4 className="mb-1 font-semibold text-white">Keyword Matching</h4>
              <p className="text-sm text-gray-400">
                Does your resume contain the exact keywords from the job description? Synonyms don't
                count.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-500/20">
              <svg
                className="h-6 w-6 text-emerald-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <div>
              <h4 className="mb-1 font-semibold text-white">Quantifiable Impact</h4>
              <p className="text-sm text-gray-400">
                Numbers, percentages, and metrics prove your value. "Increased revenue by 30%" beats
                "improved sales."
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-orange-500/20">
              <svg
                className="h-6 w-6 text-orange-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div>
              <h4 className="mb-1 font-semibold text-white">Action Verbs</h4>
              <p className="text-sm text-gray-400">
                "Led" and "Developed" score higher than "Responsible for" or "Helped with." Strong
                verbs = stronger candidate.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* The Fix */}
      <div className="rounded-xl border border-emerald-500/30 bg-gradient-to-br from-emerald-900/20 to-slate-900/50 p-8 text-center">
        <h3 className="mb-4 text-2xl font-bold text-white">Here's the Good News</h3>
        <p className="mx-auto mb-6 max-w-2xl text-gray-300">
          Our analyzer tells you <strong className="text-white">exactly</strong> what's wrong and
          how to fix it. Most people see +15 to +25 point improvements after implementing just the
          top 3 recommendations.
        </p>
        <div className="mx-auto flex max-w-md flex-col gap-3">
          <div className="flex items-center gap-3 rounded-lg bg-slate-900/50 p-3 text-left">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white">
              1
            </div>
            <p className="text-sm text-gray-300">Upload your resume (free, no signup)</p>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-slate-900/50 p-3 text-left">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white">
              2
            </div>
            <p className="text-sm text-gray-300">Get your score + detailed fixes in 30 seconds</p>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-slate-900/50 p-3 text-left">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white">
              3
            </div>
            <p className="text-sm text-gray-300">
              Fix the issues, retest, and watch your score jump
            </p>
          </div>
        </div>
      </div>

      {/* Real Impact */}
      <div className="text-center">
        <p className="mx-auto max-w-2xl text-sm italic text-gray-400">
          "I was applying to 50+ jobs with no callbacks. After fixing my ATS score from 62 to 87, I
          got 3 interviews in the first week. Same resume, same qualifications - just
          ATS-optimized."
          <span className="mt-2 block text-xs not-italic text-gray-500">
            - Sarah M., Software Engineer
          </span>
        </p>
      </div>
    </div>
  )
}
