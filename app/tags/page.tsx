import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { slug } from 'github-slugger'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'
import DomainLayout from '@/components/domain/DomainLayout'

export const metadata = genPageMetadata({
  title: 'All Topics & Tags — Auto Interview AI',
  description: 'Browse all career, ATS optimization, and interview topics on Auto Interview AI.',
})

export default async function Page() {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
  return (
    <DomainLayout currentPath="/tags">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
        <div className="mb-12 text-center">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717]">
            EXPLORE TOPICS
          </p>
          <h1 className="text-3xl font-normal tracking-[-1.5px] text-[#171717] sm:text-4xl lg:text-5xl">
            Browse All Topics
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-base text-[#666666]">
            Filter and discover career advice, resume templates, and interview prep by topic.
          </p>
        </div>

        <div
          className="rounded-[8px] border border-[#ebebeb] bg-white p-6 sm:p-10"
          style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.04)' }}
        >
          <div className="flex flex-wrap gap-2.5">
            {tagKeys.length === 0 && <p className="text-sm text-[#666666]">No tags found.</p>}
            {sortedTags.map((t) => (
              <Link
                key={t}
                href={`/tags/${slug(t)}`}
                className="inline-flex items-center gap-2 rounded-[6px] border border-[#ebebeb] bg-[#fafafa] px-3.5 py-2 text-xs font-medium text-[#171717] transition-colors hover:border-[#171717] hover:bg-white"
              >
                <span className="font-mono uppercase tracking-[0.071em]">{t}</span>
                <span className="rounded-[4px] bg-[#ebebeb] px-1.5 py-0.5 text-[10px] text-[#666666]">
                  {tagCounts[t]}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </DomainLayout>
  )
}
