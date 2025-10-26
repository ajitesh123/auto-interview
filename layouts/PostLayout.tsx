import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import LandingHeader from '@/components/LandingHeader'
import Footer from '@/components/Footer'
import SocialShareButtons from '@/components/SocialShareButtons'

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/data/${path}`
const discussUrl = (path) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/${path}`)}`

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export default function PostLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { filePath, path, slug, date, title, tags } = content
  const basePath = path.split('/')[0]

  // FAQ Schema for PM Interview Guide
  const faqSchema =
    slug === 'product-manager-interview-guide-2025'
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'How long should I prepare for a PM interview?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Aim for 6–8 weeks with focused weekly goals: product sense, behavioral stories, estimations, and 6–8 mock interviews. Use AI mocks for extra practice.',
              },
            },
            {
              '@type': 'Question',
              name: 'What frameworks should I use for product questions?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'CIRCLES for product sense, STAR for behavioral, and Impact vs Effort or MoSCoW for prioritization.',
              },
            },
            {
              '@type': 'Question',
              name: 'Where can I practice mock PM interviews?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: "Practice with peers, hire a coach, or use AI platforms like Tough Tongue AI's PM collection to simulate interviewer prompts and get feedback.",
              },
            },
            {
              '@type': 'Question',
              name: "How do I handle questions I don't know the answer to?",
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Be honest, ask clarifying questions, break down the problem, and show your thought process. Interviewers care more about how you think than having perfect answers.',
              },
            },
            {
              '@type': 'Question',
              name: 'What should I ask the interviewer?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Ask about team dynamics, product challenges, success metrics, growth opportunities, and company culture. Show genuine interest in the role.',
              },
            },
            {
              '@type': 'Question',
              name: "What's the difference between a PM and TPM?",
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Product Managers focus on user experience, business strategy, and stakeholder management. Technical Product Managers focus on system architecture, API design, and technical feasibility while still managing product strategy.',
              },
            },
            {
              '@type': 'Question',
              name: 'How do you answer behavioral questions in PM interviews?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Use the STAR method: Situation (set context), Task (explain responsibility), Action (describe what you did), Result (share outcome). Prepare 8-10 stories covering different scenarios.',
              },
            },
            {
              '@type': 'Question',
              name: 'What are the most common PM interview questions?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Top questions include: "Design a feature for [product]", "How would you improve [product]", "Tell me about a time you failed", "How would you prioritize features", and "What metrics would you track".',
              },
            },
          ],
        }
      : null

  // Article Schema for ATS Resume Checker
  const articleSchema =
    slug === 'best-ats-resume-checker-2025'
      ? {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: title,
          description:
            'Discover the 3 best ATS resume checkers in 2025. Compare Resume Worded, Enhancv, and AutoInterviewAI with detailed reviews, pricing, and features to boost your interview rate by 300%.',
          author: {
            '@type': 'Organization',
            name: 'AutoInterviewAI',
            url: 'https://autointerviewai.com',
          },
          publisher: {
            '@type': 'Organization',
            name: 'AutoInterviewAI',
            url: 'https://autointerviewai.com',
            logo: {
              '@type': 'ImageObject',
              url: 'https://autointerviewai.com/static/images/logo.svg',
            },
          },
          datePublished: date,
          dateModified: date,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${siteMetadata.siteUrl}/${path}`,
          },
          articleSection: 'Career Tools',
          keywords:
            'ATS resume checker, resume optimization, job search, Resume Worded, Enhancv, AutoInterviewAI, applicant tracking system, resume scanner, career tools, interview preparation',
          wordCount: 4500,
          timeRequired: 'PT15M',
          inLanguage: 'en-US',
          isAccessibleForFree: true,
        }
      : null

  // FAQ Schema for Job Search Guide
  const jobSearchFaqSchema =
    slug === 'how-to-find-jobs-complete-guide'
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'What is the most effective way to find a job?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'The most effective way to find a job is through employee referrals and strategic networking, which deliver a 60-70% success rate compared to just 1-2% for mass online applications. Build genuine relationships with people in your target companies, attend industry events, and leverage informational interviews to access the hidden job market where 70-80% of jobs are filled.',
              },
            },
            {
              '@type': 'Question',
              name: 'How long does it take to find a job?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Most job seekers take 3-6 months to find a new position with consistent daily effort. However, this varies significantly based on your industry, experience level, location, and job search strategy. Senior-level positions may take 6-12 months, while entry-level roles might be secured in 1-3 months.',
              },
            },
            {
              '@type': 'Question',
              name: 'How many jobs should I apply to per day?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Apply to 5-10 highly targeted positions per day rather than mass-applying to 50+ jobs. Quality beats quantity—tailored applications with customized resumes and cover letters generate 300% better response rates than generic applications.',
              },
            },
            {
              '@type': 'Question',
              name: 'How do I optimize my resume for ATS systems?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'To optimize your resume for ATS: Use standard formatting with .docx or simple PDF format, mirror exact keywords from job descriptions, include both acronyms and full terms, use standard section headings, avoid tables and text boxes, quantify achievements with specific metrics, and use common fonts like Arial or Calibri.',
              },
            },
            {
              '@type': 'Question',
              name: 'What is an ATS and why does it matter?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'An Applicant Tracking System (ATS) is software that screens and ranks resumes before human recruiters see them. 70% of companies use ATS, meaning your resume must pass automated screening to reach hiring managers. Resumes that aren\'t ATS-optimized are automatically rejected, regardless of qualifications.',
              },
            },
            {
              '@type': 'Question',
              name: 'What are the best job search websites?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'The best job search websites are: LinkedIn for networking and professional roles (40-50% success rate), Indeed for broad search across industries (20-30% success rate), Glassdoor for company research and salary data, ZipRecruiter for AI-powered matching, Google for Jobs for aggregated listings, AngelList for startup and tech roles, and FlexJobs for pre-screened remote positions.',
              },
            },
            {
              '@type': 'Question',
              name: 'How important is a LinkedIn presence for job searching?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'LinkedIn presence is critical for modern job searching. 87% of recruiters use LinkedIn to find candidates, and profiles with complete information are 40 times more likely to receive opportunities. LinkedIn enables direct access to hiring managers, visibility in recruiter searches, networking with professionals, and demonstrating expertise through content.',
              },
            },
            {
              '@type': 'Question',
              name: 'What are informational interviews and how do I request them?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Informational interviews are 15-30 minute conversations with professionals to learn about their role, company, or industry—not to ask for jobs directly. Request them by identifying people in target roles through LinkedIn, sending personalized messages explaining why you\'re reaching out, being specific about what you want to learn, and offering flexibility in scheduling.',
              },
            },
          ],
        }
      : null

  return (
    <div className="min-h-screen bg-matte-black">
      <LandingHeader />

      {/* FAQ Schema for PM Interview Guide */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}

      {/* Article Schema for ATS Resume Checker */}
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleSchema),
          }}
        />
      )}

      {/* FAQ Schema for Job Search Guide */}
      {jobSearchFaqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jobSearchFaqSchema),
          }}
        />
      )}

      <ScrollTopAndComment />

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <article className="rounded-lg border border-matte-gray bg-matte-black p-8">
          {/* Article Header */}
          <header className="mb-8 border-b border-matte-gray pb-8">
            <div className="space-y-4 text-center">
              <div>
                <time dateTime={date} className="text-sm font-medium text-accent-400">
                  {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                </time>
              </div>
              <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{title}</h1>
              <div className="flex flex-wrap justify-center gap-2">
                {tags?.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-matte-gray px-3 py-1 text-xs font-medium text-gray-300 transition-colors hover:bg-accent-600 hover:text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </header>

          {/* Social Sharing Buttons */}
          <SocialShareButtons title={title} url={`${siteMetadata.siteUrl}/${path}`} />

          {/* Article Content */}
          <div className="prose prose-invert max-w-none pb-8">{children}</div>

          {/* Article Footer */}
          <footer className="border-t border-matte-gray pt-8">
            {/* Author Info */}
            <div className="mb-8">
              <h3 className="mb-4 text-lg font-semibold text-white">About the Author</h3>
              <div className="flex flex-wrap gap-6">
                {authorDetails.map((author) => (
                  <div key={author.name} className="flex items-center space-x-3">
                    {author.avatar && (
                      <Image
                        src={author.avatar}
                        width={48}
                        height={48}
                        alt="avatar"
                        className="h-12 w-12 rounded-full"
                      />
                    )}
                    <div>
                      <div className="font-medium text-white">{author.name}</div>
                      {author.twitter && (
                        <Link
                          href={author.twitter}
                          className="text-accent-400 hover:text-accent-300"
                        >
                          {author.twitter
                            .replace('https://twitter.com/', '@')
                            .replace('https://x.com/', '@')}
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            {(next || prev) && (
              <div className="mb-8 grid gap-4 sm:grid-cols-2">
                {prev && prev.path && (
                  <div className="rounded-lg border border-matte-gray p-4">
                    <h4 className="text-sm font-medium text-gray-400">Previous Article</h4>
                    <Link
                      href={`/${prev.path}`}
                      className="text-white transition-colors hover:text-accent-400"
                    >
                      {prev.title}
                    </Link>
                  </div>
                )}
                {next && next.path && (
                  <div className="rounded-lg border border-matte-gray p-4">
                    <h4 className="text-sm font-medium text-gray-400">Next Article</h4>
                    <Link
                      href={`/${next.path}`}
                      className="text-white transition-colors hover:text-accent-400"
                    >
                      {next.title}
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Back to Blog */}
            <div className="flex justify-center">
              <Link
                href={`/${basePath}`}
                className="inline-flex items-center rounded-lg bg-matte-gray px-6 py-3 text-white transition-colors hover:bg-accent-600"
                aria-label="Back to the blog"
              >
                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Blog
              </Link>
            </div>

            {/* Comments */}
            {siteMetadata.comments && (
              <div className="mt-8 border-t border-matte-gray pt-8" id="comment">
                <h3 className="mb-4 text-lg font-semibold text-white">Comments</h3>
                <Comments slug={slug} />
              </div>
            )}
          </footer>
        </article>
      </main>

      <Footer />
    </div>
  )
}
