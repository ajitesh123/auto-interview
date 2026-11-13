import Link from 'next/link'
import type { RoleHub } from '@/data/roleHubs/types'
import { ROLE_KITS, KIT_PATHS } from '@/data/roleKits'
import { ROLE_SALARIES } from '@/data/roleSalary'
import { ROLE_CONCEPTS } from '@/data/roleConcepts'
import { ROLE_COVER_LETTERS, coverLetterPath } from '@/data/roleCoverLetters'
import { ROLE_INTERVIEW_TIPS, interviewTipsPath } from '@/data/roleInterviewTips'

/**
 * "Your <role> kit": every page we have for this role, in the order a candidate uses them.
 * Only pages that exist are listed; the current page is marked, not linked.
 */
export default function KitStrip({ hub, current }: { hub: RoleHub; current: string }) {
  const s = hub.slug
  const items = [
    { key: 'hub', href: `/${s}`, label: 'Interview guide' },
    ROLE_INTERVIEW_TIPS[s] && {
      key: 'interview-tips',
      href: interviewTipsPath(s),
      label: 'Tips for each round',
    },
    ROLE_CONCEPTS[s] && { key: 'concepts', href: `/${s}/concepts`, label: 'Concepts + quiz' },
    ROLE_KITS[s] && {
      key: 'resume',
      href: KIT_PATHS.resume(s),
      label: 'Resume (CV) + Word template',
    },
    ROLE_COVER_LETTERS[s] && {
      key: 'cover-letter',
      href: coverLetterPath(s),
      label: 'Cover letter + Word template',
    },
    ROLE_KITS[s] && { key: 'lor', href: KIT_PATHS.lor(s), label: 'Letter of recommendation' },
    ROLE_SALARIES[s] && { key: 'salary', href: `/${s}/salary`, label: 'Salary' },
  ].filter(Boolean) as { key: string; href: string; label: string }[]
  return (
    <nav
      aria-label={`Your ${hub.shortName} kit`}
      className="rounded-xl border border-border bg-surface p-4"
    >
      <div className="font-mono text-kicker uppercase tracking-[0.08em] text-fg-3">
        Your {hub.shortName} kit · {items.length} pages
      </div>
      <ol className="mt-3 flex flex-wrap gap-2">
        {items.map((it, i) => (
          <li key={it.key}>
            {it.key === current ? (
              <span
                aria-current="page"
                className="inline-flex h-9 items-center gap-1.5 rounded-full bg-fg px-3.5 text-small font-medium text-bg"
              >
                <span className="font-mono text-caption opacity-70">{i + 1}</span>
                {it.label}
              </span>
            ) : (
              <Link
                href={it.href}
                className="inline-flex h-9 items-center gap-1.5 rounded-full bg-surface px-3.5 text-small text-fg-2 ring-1 ring-inset ring-border hover:text-fg hover:ring-border-strong"
              >
                <span className="font-mono text-caption text-fg-3">{i + 1}</span>
                {it.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
