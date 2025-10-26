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
import TableOfContents from '@/components/TableOfContents'

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
  const { filePath, path, slug, date, title, tags, summary, images } = content
  const basePath = path.split('/')[0]

  // Generic Article Schema for ALL blog posts (Google SEO requirement)
  const genericArticleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: summary || title,
    author: authorDetails?.map((author) => ({
      '@type': 'Person',
      name: author.name,
      url: author.twitter || author.linkedin || author.github,
    })) || [{
      '@type': 'Organization',
      name: 'Auto Interview AI',
      url: 'https://www.autointerviewai.com',
    }],
    publisher: {
      '@type': 'Organization',
      name: 'Auto Interview AI',
      url: 'https://www.autointerviewai.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.autointerviewai.com/static/images/logo.png',
      },
    },
    datePublished: date,
    dateModified: date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteMetadata.siteUrl}/${path}`,
    },
    image: images && images.length > 0 ? images[0] : `${siteMetadata.siteUrl}/static/images/Auto-interview-thumbnail.png`,
    keywords: tags?.join(', ') || '',
    inLanguage: 'en-US',
    isAccessibleForFree: true,
  }

  // BreadcrumbList Schema for navigation (Google SEO requirement)
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteMetadata.siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${siteMetadata.siteUrl}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: title,
        item: `${siteMetadata.siteUrl}/${path}`,
      },
    ],
  }

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

  // HowTo Schema for Job Search Guide 2025 - Google SEO requirement
  const howToSchema =
    slug === 'job-search-guide-2025'
      ? {
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: 'How to Successfully Search for a Job in 2025',
          description: 'A comprehensive step-by-step guide to navigating the modern job market in 2025, covering AI screening, remote work trends, networking tactics, and skills-based hiring.',
          totalTime: 'P3M', // 3 months
          estimatedCost: {
            '@type': 'MonetaryAmount',
            currency: 'USD',
            value: '0',
          },
          step: [
            {
              '@type': 'HowToStep',
              position: 1,
              name: 'Define Your Target',
              text: 'Identify your ideal role and industry, research company cultures and values, understand salary expectations, and set realistic timelines.',
              url: `${siteMetadata.siteUrl}/blog/job-search-guide-2025#building-your-job-search-strategy`,
            },
            {
              '@type': 'HowToStep',
              position: 2,
              name: 'Optimize Your Online Presence',
              text: 'Update LinkedIn profile with keywords, create a professional portfolio, clean up social media presence, and build a personal brand.',
              url: `${siteMetadata.siteUrl}/blog/job-search-guide-2025#optimize-your-online-presence`,
            },
            {
              '@type': 'HowToStep',
              position: 3,
              name: 'Leverage Multiple Channels',
              text: 'Use job boards and company websites, attend professional networking events, participate in industry conferences and meetups, and get referrals from your network.',
              url: `${siteMetadata.siteUrl}/blog/job-search-guide-2025#leverage-multiple-channels`,
            },
            {
              '@type': 'HowToStep',
              position: 4,
              name: 'Network Effectively',
              text: 'Engage with industry content on LinkedIn, join professional groups and forums, share valuable insights and articles, and connect with industry professionals both online and in-person.',
              url: `${siteMetadata.siteUrl}/blog/job-search-guide-2025#effective-networking-strategies`,
            },
            {
              '@type': 'HowToStep',
              position: 5,
              name: 'Optimize Your Applications',
              text: 'Tailor each resume to the specific job, use ATS-friendly formatting, include quantifiable achievements, and write personalized cover letters.',
              url: `${siteMetadata.siteUrl}/blog/job-search-guide-2025#application-optimization`,
            },
            {
              '@type': 'HowToStep',
              position: 6,
              name: 'Prepare for Interviews',
              text: 'Study the company thoroughly, understand the role requirements, prepare specific examples using the STAR method, and practice common questions.',
              url: `${siteMetadata.siteUrl}/blog/job-search-guide-2025#interview-preparation`,
            },
            {
              '@type': 'HowToStep',
              position: 7,
              name: 'Leverage Technology',
              text: 'Use AI tools for resume optimization and interview practice, set up job alerts, use application tracking systems, and automate follow-up emails.',
              url: `${siteMetadata.siteUrl}/blog/job-search-guide-2025#leveraging-technology`,
            },
          ],
        }
      : null

  return (
    <div className="min-h-screen bg-matte-black">
      <LandingHeader />

      {/* Generic Article Schema for ALL blog posts - Google SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(genericArticleSchema),
        }}
      />

      {/* BreadcrumbList Schema for navigation - Google SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

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

      {/* HowTo Schema for Job Search Guide 2025 - Google SEO */}
      {howToSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(howToSchema),
          }}
        />
      )}

      <ScrollTopAndComment />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="lg:flex lg:gap-8">
          {/* Main Content */}
          <main className="flex-1 lg:max-w-4xl">
            {/* Semantic HTML5 article element for better SEO */}
            <article className="rounded-lg border border-matte-gray bg-matte-black p-8" itemScope itemType="https://schema.org/Article">
              {/* Article Header */}
              <header className="mb-8 border-b border-matte-gray pb-8">
            <div className="space-y-4 text-center">
              <div>
                <time dateTime={date} className="text-sm font-medium text-accent-400" itemProp="datePublished">
                  {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                </time>
              </div>
              <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl" itemProp="headline">{title}</h1>
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

          {/* Article Content - Semantic HTML5 section */}
          <section className="prose prose-invert max-w-none pb-8" itemProp="articleBody">{children}</section>

          {/* Article Footer */}
          <footer className="border-t border-matte-gray pt-8">
            {/* Enhanced Author Info for E-E-A-T (Experience, Expertise, Authority, Trust) - Google SEO */}
            <aside className="mb-8 rounded-lg bg-matte-gray/30 p-6">
              <h3 className="mb-4 text-lg font-semibold text-white">About the Author</h3>
              <div className="flex flex-wrap gap-6">
                {authorDetails.map((author) => (
                  <div key={author.name} className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
                    {author.avatar && (
                      <Image
                        src={author.avatar}
                        width={64}
                        height={64}
                        alt={`${author.name} - Career Expert`}
                        className="h-16 w-16 rounded-full"
                      />
                    )}
                    <div className="flex-1">
                      <div className="mb-2 font-semibold text-white" itemProp="author" itemScope itemType="https://schema.org/Person">
                        <span itemProp="name">{author.name}</span>
                      </div>
                      {author.occupation && (
                        <div className="mb-2 text-sm text-gray-300">{author.occupation}</div>
                      )}
                      <p className="mb-3 text-sm leading-relaxed text-gray-300">
                        {author.name} is an AI & Career Tools Developer specializing in resume optimization, 
                        ATS systems, and interview preparation. Creator of Auto Interview AI, helping thousands 
                        of job seekers land their dream jobs through AI-powered career tools and expert guidance.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {author.twitter && (
                          <Link
                            href={author.twitter}
                            className="text-sm text-accent-400 hover:text-accent-300"
                            rel="author"
                          >
                            Follow on X
                          </Link>
                        )}
                        {author.linkedin && (
                          <Link
                            href={author.linkedin}
                            className="text-sm text-accent-400 hover:text-accent-300"
                            rel="author"
                          >
                            LinkedIn
                          </Link>
                        )}
                        <Link
                          href="/about"
                          className="text-sm text-accent-400 hover:text-accent-300"
                        >
                          More Articles
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </aside>

            {/* Trust Signals for E-E-A-T */}
            <div className="mb-8 rounded-lg border border-matte-gray/50 bg-matte-black p-6">
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">
                Why Trust Auto Interview AI?
              </h4>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="text-sm">
                  <div className="mb-1 font-medium text-white">✓ Expert-Verified Content</div>
                  <div className="text-gray-400">Written by career professionals with real-world experience</div>
                </div>
                <div className="text-sm">
                  <div className="mb-1 font-medium text-white">✓ Data-Driven Insights</div>
                  <div className="text-gray-400">Based on industry research and proven strategies</div>
                </div>
                <div className="text-sm">
                  <div className="mb-1 font-medium text-white">✓ Regularly Updated</div>
                  <div className="text-gray-400">Content reviewed and updated for 2025 job market</div>
                </div>
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

      {/* Sidebar with Table of Contents - Google SEO: Internal linking and better UX */}
      <aside className="hidden lg:block lg:w-80">
        <TableOfContents />
      </aside>
    </div>
  </div>

      <Footer />
    </div>
  )
}
