import { Metadata } from 'next'
import Link from 'next/link'
import { allBlogs } from 'contentlayer/generated'
import DomainLayout from '@/components/domain/DomainLayout'
import { COLUMNS } from '@/components/domain/SiteFooter'
import { ROLE_HUB_LIST } from '@/data/roleHubs'
import { ROLE_KITS, KIT_PATHS } from '@/data/roleKits'
import { ROLE_SALARY_LIST } from '@/data/roleSalary'
import { ROLE_CONCEPTS } from '@/data/roleConcepts'
import { ROLE_INTERVIEW_TIPS } from '@/data/roleInterviewTips'
import { ROLE_COVER_LETTERS } from '@/data/roleCoverLetters'
import { LESSONS } from '@/data/learnAi'
import { PG_LESSONS } from '@/data/pgCourse'
import { genPageMetadata } from '../seo'

// Nov 21 2026: rebuilt from the data files that feed sitemap.xml, so every link here is a live page.
export const metadata: Metadata = genPageMetadata({
  title: 'Site Map: Every Guide, Tool and Lesson | Auto Interview AI',
  description:
    'Every page on Auto Interview AI in one place: free tools, 10 role interview guides with resume, cover letter and salary pages, Learn AI lessons, the Paul Graham course and the blog.',
  alternates: { canonical: 'https://www.autointerviewai.com/sitemap' },
})

type L = { href: string; label: string }

function Group({
  id,
  title,
  note,
  links,
}: {
  id: string
  title: string
  note?: string
  links: L[]
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-border py-8">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-h3 font-semibold text-fg">{title}</h2>
        <span className="font-mono text-kicker uppercase tracking-[0.08em] text-fg-3">
          {links.length} pages
        </span>
      </div>
      {note && <p className="mt-1 max-w-prose text-small text-fg-2">{note}</p>}
      <ul className="mt-4 grid gap-x-6 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="inline-block py-1 text-small text-fg-2 transition-colors duration-fast hover:text-signal-strong"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default function SitemapPage() {
  const tools = COLUMNS.find((c) => c.title === 'Free tools')?.links ?? []
  const salaryTools = [
    { href: '/salary-calculator', label: 'CTC to in-hand calculator' },
    { href: '/job-offer-comparison', label: 'Job offer comparison' },
  ]

  // Grouped by page type (all guides, then tips, concepts, resumes, letters), so each column reads cleanly.
  const roles: L[] = [
    ...ROLE_HUB_LIST.map((h) => ({ href: `/${h.slug}`, label: `${h.roleName} interview guide` })),
    ...ROLE_HUB_LIST.filter((h) => ROLE_INTERVIEW_TIPS[h.slug]).map((h) => ({
      href: `/${h.slug}/interview-tips`,
      label: `${h.roleName} interview tips`,
    })),
    ...ROLE_HUB_LIST.filter((h) => ROLE_CONCEPTS[h.slug]).map((h) => ({
      href: `/${h.slug}/concepts`,
      label: `${h.roleName} concepts to know`,
    })),
    ...ROLE_HUB_LIST.filter((h) => ROLE_KITS[h.slug]).map((h) => ({
      href: KIT_PATHS.resume(h.slug),
      label: `${h.roleName} resume (CV)`,
    })),
    ...ROLE_HUB_LIST.filter((h) => ROLE_COVER_LETTERS[h.slug]).map((h) => ({
      href: `/${h.slug}/cover-letter`,
      label: `${h.roleName} cover letter`,
    })),
    ...ROLE_HUB_LIST.filter((h) => ROLE_KITS[h.slug]).map((h) => ({
      href: KIT_PATHS.lor(h.slug),
      label: `${h.roleName} recommendation letter`,
    })),
  ]

  const salaries: L[] = [
    ...ROLE_SALARY_LIST.map((r) => ({ href: `/${r.slug}/salary`, label: `${r.roleName} salary` })),
    ...salaryTools,
  ]

  const resumes = COLUMNS.find((c) => c.title === 'CV templates')?.links ?? []

  const learnAi: L[] = [
    { href: '/learn-ai', label: 'Learn AI: all lessons' },
    ...LESSONS.map((l) => ({ href: `/learn-ai/${l.slug}`, label: l.title })),
  ]
  const pg: L[] = [
    { href: '/paul-graham', label: 'Paul Graham course: all lessons' },
    { href: '/paul-graham/yc-batch', label: '12-week YC challenge' },
    ...PG_LESSONS.map((l) => ({ href: `/paul-graham/${l.slug}`, label: l.title })),
  ]
  const more: L[] = [
    { href: '/voice-ai-calling', label: 'Voice AI calling guide' },
    { href: '/ai-sales-training', label: 'AI sales training directory' },
    { href: '/interview-questions', label: 'Interview questions Q&A' },
    { href: '/free-resources', label: 'Free prep resources' },
    { href: '/blog', label: 'Blog: all posts' },
    { href: '/about', label: 'About' },
    { href: '/privacy-policy', label: 'Privacy policy' },
    { href: '/terms-conditions', label: 'Terms and conditions' },
    { href: '/refund-policy', label: 'Refund policy' },
    { href: '/contact-policy', label: 'Contact' },
  ]
  const posts = allBlogs.filter((p) => !p.draft).length

  const groups = [
    { id: 'tools', title: 'Free tools', links: tools },
    {
      id: 'roles',
      title: 'Role interview guides',
      note: 'Each guide has reported questions with model answers; most have a resume, cover letter and salary page too.',
      links: roles,
    },
    { id: 'salary', title: 'Salary data', links: salaries },
    { id: 'resumes', title: 'Resume (CV) templates', links: resumes },
    { id: 'learn-ai', title: 'Learn AI', links: learnAi },
    { id: 'paul-graham', title: 'Paul Graham and YC', links: pg },
    {
      id: 'more',
      title: 'Guides, blog and policies',
      note: `The blog has ${posts} posts; browse them by date or tag from the blog page.`,
      links: more,
    },
  ]
  const total = groups.reduce((n, g) => n + g.links.length, 0)

  return (
    <DomainLayout currentPath="/sitemap">
      <div className="mx-auto w-full max-w-page px-5 pb-16 pt-10 md:px-8 md:pt-14">
        <p className="font-mono text-kicker uppercase tracking-[0.08em] text-signal-strong">
          Site map · {total} pages + {posts} blog posts
        </p>
        <h1 className="mt-3 font-serif text-h1 font-medium text-fg">
          Every page on Auto Interview AI
        </h1>
        <p className="mt-3 max-w-[56ch] text-body-lg text-fg-2">
          Free tools, role guides, salary data, templates and lessons, grouped so you can find the
          one you need.
        </p>
        <nav aria-label="Sections" className="mt-6 flex flex-wrap gap-2">
          {groups.map((g) => (
            <a
              key={g.id}
              href={`#${g.id}`}
              className="inline-flex h-9 items-center rounded-full border border-border bg-surface px-3 text-small text-fg-2 transition-colors duration-fast hover:border-border-strong hover:text-fg"
            >
              {g.title}
            </a>
          ))}
        </nav>
        <div className="mt-8">
          {groups.map((g) => (
            <Group key={g.id} {...g} />
          ))}
        </div>
      </div>
    </DomainLayout>
  )
}
