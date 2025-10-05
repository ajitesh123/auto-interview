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
import LandingHeader from '@/components/LandingHeader'
import Footer from '@/components/Footer'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
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
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Show pages around current page
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
              className="cursor-auto rounded-lg bg-matte-gray px-3 py-2 text-xs font-medium text-gray-500 disabled:opacity-50 sm:px-4 sm:text-sm"
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
              className="rounded-lg border border-matte-gray bg-matte-gray px-3 py-2 text-xs font-medium text-gray-300 transition-colors hover:border-accent-600 hover:bg-accent-600 hover:text-white sm:px-4 sm:text-sm"
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
                <span className="px-2 py-2 text-xs font-medium text-gray-500 sm:px-3 sm:text-sm">
                  ...
                </span>
              ) : (
                <Link
                  href={page === 1 ? `/${basePath}/` : `/${basePath}/page/${page}`}
                  className={`rounded-lg px-2 py-2 text-xs font-medium transition-colors sm:px-3 sm:text-sm ${
                    page === currentPage
                      ? 'bg-accent-600 text-white hover:bg-accent-700'
                      : 'border border-matte-gray bg-matte-gray text-gray-300 hover:border-accent-600 hover:bg-accent-600 hover:text-white'
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
              className="cursor-auto rounded-lg bg-matte-gray px-3 py-2 text-xs font-medium text-gray-500 disabled:opacity-50 sm:px-4 sm:text-sm"
              disabled={!nextPage}
            >
              Next
            </button>
          )}
          {nextPage && (
            <Link
              href={`/${basePath}/page/${currentPage + 1}`}
              rel="next"
              className="rounded-lg border border-matte-gray bg-matte-gray px-3 py-2 text-xs font-medium text-gray-300 transition-colors hover:border-accent-600 hover:bg-accent-600 hover:text-white sm:px-4 sm:text-sm"
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
}: ListLayoutProps) {
  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <div className="min-h-screen bg-matte-black">
      <LandingHeader />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 text-center sm:mb-12">
          <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-4 text-base text-gray-400 sm:text-lg">
            Discover insights, tips, and strategies for your career journey
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-4">
          {/* Sidebar - Categories */}
          <aside className="order-2 lg:order-1 lg:col-span-1">
            <div className="rounded-lg bg-matte-gray p-4 sm:p-6 lg:sticky lg:top-8">
              <h3 className="mb-4 text-base font-semibold text-white sm:text-lg">Categories</h3>
              <nav className="space-y-1 sm:space-y-2">
                <Link
                  href="/blog"
                  className={`block rounded-md px-3 py-2 text-xs font-medium transition-colors sm:text-sm ${
                    pathname.startsWith('/blog') && !pathname.includes('/tags/')
                      ? 'bg-accent-600 text-white'
                      : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  All Posts ({posts.length})
                </Link>
                {sortedTags.slice(0, 12).map((t) => {
                  const isActive = decodeURI(pathname.split('/tags/')[1]) === slug(t)
                  return (
                    <Link
                      key={t}
                      href={`/tags/${slug(t)}`}
                      className={`block rounded-md px-3 py-2 text-xs font-medium transition-colors sm:text-sm ${
                        isActive
                          ? 'bg-accent-600 text-white'
                          : 'text-gray-400 hover:bg-gray-700 hover:text-white'
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
                    className="group rounded-lg border border-matte-gray bg-matte-black p-4 transition-all duration-300 hover:border-accent-600 hover:shadow-lg hover:shadow-accent-600/10 sm:p-6"
                  >
                    <div className="flex flex-col space-y-3 sm:space-y-4">
                      {/* Date */}
                      <div className="flex items-center">
                        <time
                          dateTime={date}
                          className="text-xs font-medium text-accent-400 sm:text-sm"
                          suppressHydrationWarning
                        >
                          {formatDate(date, siteMetadata.locale)}
                        </time>
                      </div>

                      {/* Title */}
                      <h2 className="text-lg font-bold leading-tight text-white transition-colors group-hover:text-accent-400 sm:text-xl md:text-2xl">
                        <Link href={`/${path}`} className="hover:underline">
                          {title}
                        </Link>
                      </h2>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {tags?.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-matte-gray px-2 py-1 text-xs font-medium text-gray-300 transition-colors hover:bg-accent-600 hover:text-white sm:px-3"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Summary */}
                      <p className="text-sm leading-relaxed text-gray-400 sm:text-base">
                        {summary}
                      </p>

                      {/* Read More Link */}
                      <div className="pt-1 sm:pt-2">
                        <Link
                          href={`/${path}`}
                          className="inline-flex items-center text-sm font-medium text-accent-400 transition-colors hover:text-accent-300 sm:text-base"
                        >
                          Read more
                          <svg
                            className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4"
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
