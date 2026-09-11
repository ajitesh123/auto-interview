/* eslint-disable jsx-a11y/anchor-is-valid */
'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'
import GlassNav from '@/components/domain/GlassNav'
import Footer from '@/components/Footer'
import FloatingNav from '@/components/FloatingNav'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
  totalCount?: number
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname.split('/')[1]
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      const start = Math.max(1, currentPage - 2)
      const end = Math.min(totalPages, currentPage + 2)

      if (start > 1) {
        pages.push(1)
        if (start > 2) pages.push('...')
      }

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (end < totalPages) {
        if (end < totalPages - 1) pages.push('...')
        pages.push(totalPages)
      }
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="flex items-center justify-center">
      <nav className="flex items-center space-x-1 sm:space-x-2">
        <div className="flex items-center space-x-1 sm:space-x-2">
          {!prevPage && (
            <button
              className="cursor-auto rounded-[6px] border border-[#ebebeb] bg-[#f5f5f5] px-3 py-1.5 text-xs font-medium text-[#a0a0a0] disabled:opacity-50 sm:px-4 sm:text-sm"
              disabled={!prevPage}
            >
              <span className="hidden sm:inline">Previous</span>
              <span className="sm:hidden">Prev</span>
            </button>
          )}
          {prevPage && (
            <Link
              href={
                currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`
              }
              rel="prev"
              className="rounded-[6px] border border-[#ebebeb] bg-white px-3 py-1.5 text-xs font-medium text-[#171717] transition-colors hover:bg-[#f5f5f5] sm:px-4 sm:text-sm"
            >
              <span className="hidden sm:inline">Previous</span>
              <span className="sm:hidden">Prev</span>
            </Link>
          )}
        </div>

        <div className="flex items-center space-x-1">
          {pageNumbers.map((page, index) => (
            <div key={index}>
              {page === '...' ? (
                <span className="px-2 py-1.5 text-xs font-medium text-[#888888] sm:px-3 sm:text-sm">
                  ...
                </span>
              ) : (
                <Link
                  href={page === 1 ? `/${basePath}/` : `/${basePath}/page/${page}`}
                  className={`rounded-[6px] px-2.5 py-1.5 text-xs font-medium transition-colors sm:px-3 sm:text-sm ${
                    page === currentPage
                      ? 'bg-[#171717] text-white'
                      : 'border border-[#ebebeb] bg-white text-[#171717] hover:bg-[#f5f5f5]'
                  }`}
                >
                  {page}
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-1 sm:space-x-2">
          {!nextPage && (
            <button
              className="cursor-auto rounded-[6px] border border-[#ebebeb] bg-[#f5f5f5] px-3 py-1.5 text-xs font-medium text-[#a0a0a0] disabled:opacity-50 sm:px-4 sm:text-sm"
              disabled={!nextPage}
            >
              Next
            </button>
          )}
          {nextPage && (
            <Link
              href={`/${basePath}/page/${currentPage + 1}`}
              rel="next"
              className="rounded-[6px] border border-[#ebebeb] bg-white px-3 py-1.5 text-xs font-medium text-[#171717] transition-colors hover:bg-[#f5f5f5] sm:px-4 sm:text-sm"
            >
              Next
            </Link>
          )}
        </div>
      </nav>
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
  totalCount,
}: ListLayoutProps) {
  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  const featuredReport = posts.find((post) => post.tags?.includes('hiring-index'))

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <FloatingNav />
      <GlassNav currentPath="/blog" />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-14 lg:px-8">
        {/* Page Header */}
        <div className="mb-12 pt-4 text-center">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717]">
            CAREER INTELLIGENCE & INSIGHTS
          </p>
          <h1 className="text-3xl font-normal tracking-[-1.5px] text-[#171717] sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-[#666666] sm:text-lg">
            Actionable playbooks, ATS breakdowns, interview frameworks, and hiring strategies to
            help you crack your dream role.
          </p>
        </div>

        {/* Platform Highlight Banner */}
        <div
          className="relative mx-auto mb-12 flex max-w-4xl flex-col items-start justify-between gap-6 rounded-[8px] border border-[#ebebeb] bg-white p-6 sm:flex-row sm:items-center sm:p-8"
          style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.04)' }}
        >
          <div>
            <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717]">
              FREE CAREER ASSETS
            </p>
            <h2 className="text-xl font-normal tracking-tight text-[#171717] sm:text-2xl">
              Crack your dream job with verified CV templates
            </h2>
            <p className="mt-1 text-sm text-[#666666]">
              Download ATS-optimized Harvard, IIM-A, and top-tier resumes. 100% free with zero
              paywalls.
            </p>
          </div>
          <Link
            href="/cv-templates"
            className="inline-flex shrink-0 items-center justify-center rounded-[6px] bg-[#171717] px-5 py-2.5 text-sm font-medium !text-white transition-all hover:bg-[#333333]"
          >
            Explore Templates &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-4">
          {/* Sidebar - Categories */}
          <aside className="order-2 lg:order-1 lg:col-span-1">
            <div
              className="rounded-[8px] border border-[#ebebeb] bg-white p-5 lg:sticky lg:top-24"
              style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.04)' }}
            >
              <h3
                className="mb-4 text-[11px] font-normal uppercase text-[#171717]"
                style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.071em' }}
              >
                Categories
              </h3>
              <nav className="space-y-1">
                <Link
                  href="/blog"
                  className={`block rounded-[6px] px-3 py-2 text-xs font-medium transition-colors sm:text-sm ${
                    pathname.startsWith('/blog') && !pathname.includes('/tags/')
                      ? 'bg-[#171717] !text-white'
                      : 'text-[#666666] hover:bg-[#f5f5f5] hover:text-[#171717]'
                  }`}
                >
                  All Posts ({totalCount !== undefined ? totalCount : posts.length})
                </Link>
                {sortedTags.slice(0, 14).map((t) => {
                  const currentTag = pathname.includes('/tags/')
                    ? decodeURI(pathname.split('/tags/')[1] || '')
                    : ''
                  const isActive = currentTag === slug(t)
                  return (
                    <Link
                      key={t}
                      href={`/tags/${slug(t)}`}
                      className={`block rounded-[6px] px-3 py-2 text-xs font-medium transition-colors sm:text-sm ${
                        isActive
                          ? 'bg-[#171717] !text-white'
                          : 'text-[#666666] hover:bg-[#f5f5f5] hover:text-[#171717]'
                      }`}
                      aria-label={`View posts tagged ${t}`}
                    >
                      {t} ({tagCounts[t]})
                    </Link>
                  )
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="order-1 lg:order-2 lg:col-span-3">
            <div className="space-y-4 sm:space-y-6">
              {displayPosts.map((post) => {
                const { path, date, title, summary, tags } = post
                return (
                  <article
                    key={path}
                    className="group rounded-[8px] border border-[#ebebeb] bg-white p-6 transition-all hover:border-[#171717]/30 hover:shadow-sm sm:p-8"
                    style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.04)' }}
                  >
                    <div className="flex flex-col space-y-3">
                      {/* Date & Tags Row */}
                      <div className="flex flex-wrap items-center gap-2">
                        <time
                          dateTime={date}
                          className="font-mono text-[11px] text-[#888888]"
                          suppressHydrationWarning
                        >
                          {formatDate(date, siteMetadata.locale)}
                        </time>
                        {tags && tags.length > 0 && <span className="text-[#d4d4d4]">·</span>}
                        <div className="flex flex-wrap gap-1.5">
                          {tags?.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center rounded-[4px] bg-[#f5f5f5] px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.071em] text-[#666666]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Title */}
                      <h2 className="text-xl font-normal leading-[1.3] tracking-tight text-[#171717] sm:text-2xl">
                        <Link
                          href={`/${path}`}
                          className="!text-[#171717] transition-colors hover:!text-black"
                        >
                          {title}
                        </Link>
                      </h2>

                      {/* Summary */}
                      <p className="text-sm leading-relaxed text-[#666666]">{summary}</p>

                      {/* Read More Link */}
                      <div className="pt-2">
                        <Link
                          href={`/${path}`}
                          className="inline-flex items-center text-xs font-medium text-[#171717] transition-transform group-hover:translate-x-1"
                        >
                          Read article &rarr;
                        </Link>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <Pagination
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
