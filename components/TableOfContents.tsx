'use client'

import { useEffect, useState } from 'react'
import Link from './Link'

interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  className?: string
}

/**
 * Table of Contents Component
 * Automatically generates a TOC from H2 and H3 headings in the article
 * Improves UX and SEO through internal linking - Google SEO requirement
 */
export default function TableOfContents({ className = '' }: TableOfContentsProps) {
  const [toc, setToc] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // Extract headings from the article
    const article = document.querySelector('article')
    if (!article) return

    const headings = article.querySelectorAll('h2, h3')
    const items: TocItem[] = Array.from(headings).map((heading) => ({
      id: heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, '-') || '',
      text: heading.textContent || '',
      level: parseInt(heading.tagName.substring(1)),
    }))

    // Add IDs to headings if they don't have them
    headings.forEach((heading, index) => {
      if (!heading.id) {
        heading.id = items[index].id
      }
    })

    setToc(items)

    // Set up intersection observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-100px 0px -80% 0px' }
    )

    headings.forEach((heading) => observer.observe(heading))

    return () => observer.disconnect()
  }, [])

  if (toc.length === 0) return null

  return (
    <nav
      className={`sticky top-20 rounded-lg border border-matte-gray bg-matte-gray/20 p-6 ${className}`}
      aria-label="Table of Contents"
    >
      <h2 className="mb-4 text-lg font-semibold text-white">Table of Contents</h2>
      <ul className="space-y-2 text-sm">
        {toc.map((item) => (
          <li
            key={item.id}
            className={`${item.level === 3 ? 'ml-4' : ''} transition-colors`}
            style={{ listStyle: 'none' }}
          >
            <Link
              href={`#${item.id}`}
              className={`block py-1 ${
                activeId === item.id
                  ? 'font-medium text-accent-400'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
              onClick={(e) => {
                e.preventDefault()
                const element = document.getElementById(item.id)
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  // Update URL without triggering navigation
                  window.history.pushState(null, '', `#${item.id}`)
                }
              }}
            >
              {item.level === 3 && '→ '}
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

