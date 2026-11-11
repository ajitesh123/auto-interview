import { Metadata } from 'next'
import Link from 'next/link'
import { genPageMetadata } from '../seo'
import { CoverLetterPage } from '@/features/cover-letter'
import AppLayout from '@/components/AppLayout'
import RelatedTools from '@/components/RelatedTools'
import { ROLE_HUB_LIST } from '@/data/roleHubs'
import { ROLE_KITS } from '@/data/roleKits'

export const metadata: Metadata = genPageMetadata({
  title: 'Cover Letter Samples by Role (Free) | Auto Interview AI',
  description:
    'Free sample cover letters (covering letters) for 10 roles, from data analyst to product manager, each in a role kit with a one-page resume template.',
  keywords:
    'cover letter generator, AI cover letter, personalized cover letter, custom cover letter, cover letter builder, free cover letter, cover letter creator',
  alternates: {
    canonical: 'https://www.autointerviewai.com/cover-letter',
  },
})

const kits = ROLE_HUB_LIST.filter((h) => ROLE_KITS[h.slug])

export default function CoverLetter() {
  return (
    <AppLayout>
      <section className="mx-auto w-full max-w-[1100px] px-5 pt-10 md:px-8">
        <div className="rounded-xl bg-signal-tint p-5 ring-1 ring-inset ring-signal/15 md:p-6">
          <div className="font-mono text-kicker uppercase tracking-[0.08em] text-signal-ink">
            Sample cover letters by role · {kits.length} roles · free
          </div>
          <h2 className="mt-2 text-h3 font-semibold text-fg">
            Cover letter (covering letter) samples for {kits.length} roles
          </h2>
          <p className="mt-2 max-w-[68ch] text-small leading-relaxed text-fg-2">
            Each role kit has a short sample cover letter written for that job, next to a one-page
            resume (CV) Word template and the keywords recruiters look for. Copy the structure, then
            replace every line with your own proof. The automatic generator below may be
            unavailable.
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {kits.map((h) => (
              <li key={h.slug}>
                <Link
                  href={`/${h.slug}/resume#cover-letter`}
                  className="inline-flex h-9 items-center rounded-full bg-surface px-3.5 text-small text-fg ring-1 ring-inset ring-border hover:ring-border-strong"
                >
                  {h.roleName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CoverLetterPage />
      <RelatedTools currentPage="/cover-letter" />
    </AppLayout>
  )
}
