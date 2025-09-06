import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Projects' })

export default function Projects() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
            Projects
          </h1>
          <p className="text-lg text-gray-600 dark:text-white/80">
            Showcasing my latest projects and courses
          </p>
        </div>

        <div className="grid gap-8 py-12 md:grid-cols-2">
          {/* AI for Product Leaders Course */}
          <div className="space-y-4 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              AI for Product Leaders
            </h2>
            <div className="mx-auto max-w-md overflow-hidden rounded-lg border border-gray-200/20">
              <a
                href="https://aitutor.gumroad.com/l/aischoolforleaders"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/static/images/ai-product-leaders.webp"
                  alt="AI for Product Leaders Course"
                  className="h-auto w-full border border-black/20 object-cover"
                />
                <div className="bg-gray-800 p-4">
                  <h3 className="mb-2 text-xl font-semibold text-white">
                    AI Application Development
                  </h3>
                  <p className="mb-4 text-sm text-white/70">
                    Learn to build AI applications with insights from Google Gemini and Archie AI
                    experience.
                  </p>
                  <div className="text-sm text-white/80">Instructors: Ajitesh and Jinal Dalal</div>
                </div>
              </a>
            </div>
          </div>

          {/* PM Course */}
          <div className="space-y-4 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">PM Interview Prep</h2>
            <div className="mx-auto max-w-md overflow-hidden rounded-lg border border-gray-200/20">
              <a
                href="https://pm-interview-prep1.teachable.com/p/pm-interview-course?preview=logged_out"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/static/images/pm.webp"
                  alt="PM Interview Prep Course"
                  className="h-auto w-full border border-black/20 object-cover"
                />
                <div className="bg-gray-800 p-4">
                  <h3 className="mb-2 text-xl font-semibold text-white">
                    Product Management Interviews
                  </h3>
                  <div className="space-y-2 text-sm text-white/70">
                    <div>Weekly Subscription: $10/week</div>
                    <div>Lifetime Access: $50</div>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Amazon Book */}
          <div className="space-y-4 text-center md:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">PM Interview Book</h2>
            <div className="mx-auto max-w-2xl overflow-hidden rounded-lg border border-gray-200/20">
              <a
                href="https://www.amazon.com/Simple-Approach-Product-Manager-Interviews-ebook/dp/B0FF1MSDWD/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/static/images/pm_strategy.webp"
                  alt="A Simple Approach to Product Manager Interviews Book"
                  className="h-auto w-full border border-black/20 object-cover"
                />
                <div className="bg-gray-800 p-4">
                  <h3 className="mb-2 text-xl font-semibold text-white">
                    A Simple Approach to Product Manager Interviews
                  </h3>
                  <p className="mb-4 text-sm text-white/70">
                    Master PM interviews with proven strategies and real interview examples from top
                    tech companies.
                  </p>
                  <div className="text-sm text-white/80">Available on Amazon</div>
                </div>
              </a>
            </div>
          </div>

          {/* Archie AI Project - Spanning full width */}
          <div className="space-y-4 text-center md:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Archie AI</h2>
            <div className="mx-auto max-w-2xl overflow-hidden rounded-lg border border-gray-200/20">
              <a href="https://www.getarchieai.com/" target="_blank" rel="noopener noreferrer">
                <img
                  src="/static/images/archie ai.gif"
                  alt="Archie AI Demo"
                  className="h-auto w-full border border-black/20 object-cover"
                />
                <div className="bg-gray-800 p-4">
                  <h3 className="mb-2 text-xl font-semibold text-white">
                    Archie AI: AI Engineer on your codebase
                  </h3>
                  <p className="mb-4 text-sm text-white/70">
                    An AI agent that reviews pull requests, explains code, and helps fix bugs.
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* AI Performance Review Project - Spanning full width */}
          <div className="space-y-4 text-center md:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              AI Performance Review
            </h2>
            <div className="mx-auto max-w-2xl overflow-hidden rounded-lg border border-gray-200/20">
              <a href="https://www.getopenhrai.com/" target="_blank" rel="noopener noreferrer">
                <img
                  src="/static/gif/simplehrai.gif"
                  alt="AI Performance Review"
                  className="h-auto w-full border border-black/20 object-cover"
                />
                <div className="bg-gray-800 p-4">
                  <h3 className="mb-2 text-xl font-semibold text-white">
                    AI Performance Review: Write Better Reviews in Minutes
                  </h3>
                  <p className="mt-3 text-sm text-white/70">
                    A voice-first AI tool that helps managers write insightful and personalized
                    performance reviews quickly and efficiently.
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* GitHub Projects Section */}
          <div className="space-y-4 text-center md:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Open Source Projects
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {/* First GitHub Project */}
              <div className="overflow-hidden rounded-lg border border-gray-200/20">
                <a
                  href="https://github.com/ajitesh123/tough-tongue-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gray-800 p-6 transition-all hover:bg-gray-700"
                >
                  <div className="flex items-center gap-3">
                    <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <h3 className="text-xl font-semibold text-white">Tough Tongue AI</h3>
                  </div>
                  <p className="mt-3 text-sm text-white/70">
                    Your personal AI coach for mastering life's awkward conversations!
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-gray-700 px-2 py-1 text-xs text-white/90">
                      TypeScript
                    </span>
                    <span className="rounded-full bg-gray-700 px-2 py-1 text-xs text-white/90">
                      React
                    </span>
                    <span className="rounded-full bg-gray-700 px-2 py-1 text-xs text-white/90">
                      Next.js
                    </span>
                  </div>
                </a>
              </div>

              {/* Second GitHub Project */}
              <div className="overflow-hidden rounded-lg border border-gray-200/20">
                <a
                  href="https://github.com/ajitesh123/auto-review-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gray-800 p-6 transition-all hover:bg-gray-700"
                >
                  <div className="flex items-center gap-3">
                    <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <h3 className="text-xl font-semibold text-white">Auto Review AI</h3>
                  </div>
                  <p className="mt-3 text-sm text-white/70">
                    AI-Powered Performance Review Generator - Write better reviews in minutes with
                    AI.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-gray-700 px-2 py-1 text-xs text-white/90">
                      Python
                    </span>
                    <span className="rounded-full bg-gray-700 px-2 py-1 text-xs text-white/90">
                      Django
                    </span>
                    <span className="rounded-full bg-gray-700 px-2 py-1 text-xs text-white/90">
                      PostgreSQL
                    </span>
                  </div>
                </a>
              </div>

              {/* Third GitHub Project - Spanning full width */}
              <div className="overflow-hidden rounded-lg border border-gray-200/20 sm:col-span-2">
                <a
                  href="https://github.com/ajitesh123/langgraph_demo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gray-800 p-6 transition-all hover:bg-gray-700"
                >
                  <div className="flex items-center gap-3">
                    <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <h3 className="text-xl font-semibold text-white">Job Description AI</h3>
                  </div>
                  <p className="mt-3 text-sm text-white/70">
                    Generate job descriptions with with LangGraph Agentic Framework.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-gray-700 px-2 py-1 text-xs text-white/90">
                      Python
                    </span>
                    <span className="rounded-full bg-gray-700 px-2 py-1 text-xs text-white/90">
                      LangGraph
                    </span>
                    <span className="rounded-full bg-gray-700 px-2 py-1 text-xs text-white/90">
                      LangChain
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
