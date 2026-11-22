import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import Image from '@/components/Image'
import siteMetadata from '@/data/siteMetadata'
import GlassNav from '@/components/domain/GlassNav'
import SiteFooter from '@/components/domain/SiteFooter'
import SocialShareButtons from '@/components/SocialShareButtons'
import TableOfContents from '@/components/TableOfContents'
import FloatingNav from '@/components/FloatingNav'
import CTABanner from '@/components/CTABanner'
import InteractiveToolsBanner from '@/components/InteractiveToolsBanner'
import MockInterviewButton from '@/components/ai/MockInterviewButton'
import MockInterviewCTA from '@/components/ai/MockInterviewCTA'

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
  const lastmod = (content as { lastmod?: string }).lastmod
  // Interview and career posts get the mock-interview CTA (checked first, so a career post that
  // also carries a "Tough Tongue AI" tag still gets practice). Voice AI, AI calling, sales
  // training and meeting-agent posts get the Tough Tongue AI demo.
  const t = tags || []
  const isCareerPost = t.some((x) =>
    /interview|resume|\bcv\b|career|mock|communication|job|salary|hiring|placement/i.test(x)
  )
  const isVoiceOrSalesPost =
    !isCareerPost &&
    t.some((x) =>
      /voice|calling|\bcall|sales|agent|lms|l-and-d|training|telephony|tts|stt|roleplay|conversational|meeting|sdr|revops|gtm/i.test(
        x
      )
    )
  const basePath = path.split('/')[0]

  return (
    <div className="min-h-screen bg-bg text-fg">
      <GlassNav currentPath="/blog" />

      <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-start lg:justify-between lg:gap-10">
          {/* Main Content */}
          <main className="min-w-0 max-w-[800px] flex-1">
            {/* Semantic HTML5 article element for better SEO */}
            <article className="overflow-hidden rounded-xl border border-border bg-surface p-5 text-left sm:p-10 lg:p-12">
              {/* Article Header - Left Aligned Editorial Style */}
              <header className="mb-6 border-b border-border pb-6 text-left sm:mb-8 sm:pb-8">
                {/* Breadcrumbs / Category */}
                <div className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-fg-2">
                  <Link href="/blog" className="transition-colors hover:text-fg">
                    Blog
                  </Link>
                  <span>/</span>
                  <span className="font-medium text-fg">
                    {tags && tags.length > 0 ? tags[0] : 'Article'}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-left font-serif text-h1 font-medium text-fg">{title}</h1>

                {/* Subtitle / Summary */}
                {summary && (
                  <p className="mt-3 line-clamp-4 text-left text-body text-fg-2 sm:line-clamp-none sm:text-body-lg">
                    {summary}
                  </p>
                )}

                {/* Byline & Metadata Row */}
                <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border pt-4 text-xs text-fg-2">
                  {authorDetails && authorDetails[0] && (
                    <div className="flex items-center gap-2">
                      {authorDetails[0].avatar && (
                        <Image
                          src={authorDetails[0].avatar}
                          width={28}
                          height={28}
                          alt={authorDetails[0].name}
                          className="h-7 w-7 rounded-full border border-border"
                        />
                      )}
                      <span className="font-medium text-fg">{authorDetails[0].name}</span>
                    </div>
                  )}
                  <span aria-hidden="true" className="text-fg-3">
                    ·
                  </span>
                  <time dateTime={date} className="font-mono text-fg-2">
                    {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                  </time>
                  {lastmod && lastmod.slice(0, 10) !== String(date).slice(0, 10) && (
                    <>
                      <span aria-hidden="true" className="text-fg-3">
                        ·
                      </span>
                      <span className="font-mono text-fg-2">
                        Updated{' '}
                        <time dateTime={lastmod}>
                          {new Date(lastmod).toLocaleDateString(siteMetadata.locale, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </time>
                      </span>
                    </>
                  )}
                  {tags && tags.length > 0 && (
                    <>
                      <span aria-hidden="true" className="hidden text-fg-3 sm:inline">
                        ·
                      </span>
                      <div className="hidden flex-wrap gap-1.5 sm:flex">
                        {tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-border bg-bg px-2 py-0.5 font-mono text-caption uppercase tracking-wider text-fg-2"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </header>

              {/* Call To Action: demo for voice/sales posts, practice for interview-prep posts */}
              {isVoiceOrSalesPost ? (
                <div className="mb-8">
                  <CTABanner />
                </div>
              ) : (
                <div className="mb-8 flex flex-col gap-3 rounded-xl bg-signal-tint px-5 py-4 ring-1 ring-inset ring-signal/15 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-small text-fg">
                    <span className="font-semibold">Practise out loud, free.</span>{' '}
                    <span className="text-fg-2">
                      Answer real interview questions with an AI interviewer and get feedback.
                    </span>
                  </p>
                  <MockInterviewButton caption={false} />
                </div>
              )}

              {/* Featured Hero Image */}
              {images && images.length > 0 && (
                <div className="mb-8 overflow-hidden rounded-xl border border-border bg-bg">
                  <Image
                    src={images[0]}
                    alt={title}
                    width={1200}
                    height={675}
                    className="w-full object-cover"
                    loading="eager"
                  />
                </div>
              )}

              {/* Article Content - Semantic HTML5 section */}
              <section className="prose prose-neutral max-w-none pb-6 text-left font-sans text-fg">
                {children}
              </section>

              {/* Sitewide Interactive Tools Discovery Suite */}
              <InteractiveToolsBanner />

              {/* Social Sharing Buttons */}
              <div className="my-8 border-b border-t border-border py-2">
                <SocialShareButtons
                  title={title}
                  url={`${siteMetadata.siteUrl}/${path}`}
                  align="left"
                />
              </div>

              {/* Article Footer */}
              <footer className="pt-8">
                {/* Author (E-E-A-T): who wrote it and how to reach them */}
                <aside className="mb-8 rounded-xl border border-border bg-surface p-5 md:p-6">
                  <h3 className="mb-4 font-mono text-kicker uppercase tracking-[0.08em] text-fg-2">
                    About the author
                  </h3>
                  <div className="flex flex-wrap gap-6">
                    {authorDetails.map((author) => (
                      <div key={author.name} className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                        {author.avatar && (
                          <Image
                            src={author.avatar}
                            width={64}
                            height={64}
                            alt={author.name}
                            className="h-16 w-16 rounded-full"
                          />
                        )}
                        <div className="flex-1">
                          <div className="mb-1 font-medium text-fg">
                            <span>{author.name}</span>
                          </div>
                          {author.occupation && (
                            <div className="mb-2 text-caption text-fg-3">{author.occupation}</div>
                          )}
                          <p className="mb-3 max-w-prose text-small text-fg-2">
                            {author.name} builds Auto Interview AI, the free interview prep site of
                            Tough Tongue AI, and writes about interviews, careers, AI tools and
                            voice AI.
                          </p>
                          <div className="mt-3 flex flex-wrap gap-4 text-small">
                            {author.twitter && (
                              <Link
                                href={author.twitter}
                                className="text-signal-strong underline underline-offset-4"
                                rel="author"
                              >
                                Follow on X
                              </Link>
                            )}
                            {author.linkedin && (
                              <Link
                                href={author.linkedin}
                                className="text-signal-strong underline underline-offset-4"
                                rel="author"
                              >
                                LinkedIn
                              </Link>
                            )}
                            <Link
                              href="/about"
                              className="text-signal-strong underline underline-offset-4"
                            >
                              About us
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </aside>

                {/* Corrections note (replaces unverifiable 'expert-verified' trust badges) */}
                <p className="mb-8 rounded-xl bg-muted px-5 py-4 text-small text-fg-2">
                  <span className="font-medium text-fg">Found something out of date?</span> Prices,
                  rules and tools change. Tell us through the{' '}
                  <Link
                    href="/contact-policy"
                    className="text-signal-strong underline underline-offset-4"
                  >
                    contact page
                  </Link>{' '}
                  and we will check the source and update the post and its date.
                </p>

                {/* Navigation */}
                {(next || prev) && (
                  <div className="mb-8 grid gap-4 sm:grid-cols-2">
                    {prev && prev.path && (
                      <div className="rounded-xl border border-border bg-surface p-5 transition-colors hover:border-border-strong hover:shadow-e2 sm:px-6">
                        <h4 className="mb-1 font-mono text-kicker uppercase tracking-[0.071em] text-fg-2">
                          Previous Article
                        </h4>
                        <Link
                          href={`/${prev.path}`}
                          className="text-sm font-medium text-fg hover:text-signal-strong"
                        >
                          {prev.title}
                        </Link>
                      </div>
                    )}
                    {next && next.path && (
                      <div className="rounded-xl border border-border bg-surface p-5 transition-colors hover:border-border-strong hover:shadow-e2 sm:px-6">
                        <h4 className="mb-1 font-mono text-kicker uppercase tracking-[0.071em] text-fg-2">
                          Next Article
                        </h4>
                        <Link
                          href={`/${next.path}`}
                          className="text-sm font-medium text-fg hover:text-signal-strong"
                        >
                          {next.title}
                        </Link>
                      </div>
                    )}
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="mt-8 flex items-center justify-between gap-4">
                  {/* Home Button */}
                  <Link
                    href="/"
                    className="inline-flex items-center rounded-full border border-border bg-surface px-4 py-2 text-sm text-fg transition-colors hover:bg-muted"
                    aria-label="Go to home page"
                  >
                    <svg
                      className="mr-2 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    Home
                  </Link>

                  {/* Back to Blog Button */}
                  <Link
                    href={`/${basePath}`}
                    className="inline-flex items-center rounded-full border border-border bg-surface px-4 py-2 text-sm text-fg transition-colors hover:bg-muted"
                    aria-label="Back to the blog"
                  >
                    <svg
                      className="mr-2 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
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
                  <div className="mt-8 border-t border-border pt-8" id="comment">
                    <h3 className="mb-4 text-xl font-normal tracking-tight text-fg">Comments</h3>
                    <Comments slug={slug} />
                  </div>
                )}
              </footer>
            </article>
          </main>

          {/* Sidebar with Table of Contents and Quick Share - Like LiveKit */}
          <aside className="hidden space-y-5 lg:block lg:w-72 lg:shrink-0">
            <TableOfContents />
            <div className="rounded-xl border border-border bg-surface p-4">
              <span className="mb-2.5 block font-mono text-kicker font-semibold uppercase tracking-[0.08em] text-fg">
                Share Article
              </span>
              <div className="flex flex-col gap-2 text-xs">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(`${siteMetadata.siteUrl}/${path}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border border-border bg-bg px-3 py-2 font-medium text-fg transition-colors hover:border-border-strong hover:bg-surface"
                >
                  <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Share on X
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${siteMetadata.siteUrl}/${path}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border border-border bg-bg px-3 py-2 font-medium text-fg transition-colors hover:border-border-strong hover:bg-surface"
                >
                  <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  Share on LinkedIn
                </a>
              </div>
            </div>
            {/* Next step: practice for interview posts, a live demo for voice AI and sales posts */}
            {isVoiceOrSalesPost ? (
              <div className="rounded-xl border border-border bg-surface p-4 text-left">
                <span className="mb-1 block font-mono text-kicker uppercase tracking-[0.08em] text-fg-2">
                  Tough Tongue AI · our product
                </span>
                <p className="mb-3 text-small text-fg">
                  AI voice agents for calls and meetings, and AI sales roleplay for your team.
                </p>
                <Link
                  href="https://cal.com/ajitesh/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-full items-center justify-center rounded-full bg-signal text-small font-semibold text-white transition-colors duration-fast hover:bg-signal-strong"
                >
                  Book a live demo
                </Link>
              </div>
            ) : (
              <div className="rounded-xl border border-border bg-signal-tint p-4 text-left">
                <span className="mb-1 block font-mono text-kicker uppercase tracking-[0.08em] text-signal-strong">
                  Free · voice · 10 minutes
                </span>
                <p className="mb-3 text-small text-fg">
                  Practise these questions out loud with an AI interviewer that follows up.
                </p>
                <MockInterviewButton caption={false} />
              </div>
            )}
          </aside>
        </div>
      </div>

      {!isVoiceOrSalesPost && (
        <MockInterviewCTA
          title="Read it. Now say it out loud."
          body="A voice interviewer asks you questions like the ones in this post, follows up on your answers, and tells you what was strong and what was thin. Free, on Tough Tongue AI."
        />
      )}

      <SiteFooter />

      {/* Floating Navigation Buttons */}
      <FloatingNav />
    </div>
  )
}
