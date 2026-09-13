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
      className={`shadow-xs sticky top-24 rounded-[8px] border border-[#ebebeb] bg-white p-5 ${className}`}
      aria-label="Table of Contents"
    >
      <div className="mb-3 flex items-center justify-between border-b border-[#f0f0f0] pb-2.5">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[#171717]">
          On This Page
        </span>
        <span className="font-mono text-[10px] text-[#999999]">{toc.length} sections</span>
      </div>
      <ul className="max-h-[calc(100vh-220px)] space-y-1 overflow-y-auto pr-1 text-xs leading-relaxed">
        {toc.map((item) => {
          const isActive = activeId === item.id
          return (
            <li
              key={item.id}
              className={`${item.level === 3 ? 'pl-3' : ''} transition-colors`}
              style={{ listStyle: 'none' }}
            >
              <Link
                href={`#${item.id}`}
                className={`block py-1 transition-all ${
                  isActive
                    ? '-ml-2.5 border-l-2 border-[#171717] pl-2 font-medium text-[#171717]'
                    : 'text-[#666666] hover:text-[#171717]'
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  const element = document.getElementById(item.id)
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    window.history.pushState(null, '', `#${item.id}`)
                  }
                }}
              >
                {item.text}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
