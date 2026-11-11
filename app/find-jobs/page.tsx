import { Metadata } from 'next'
import { genPageMetadata } from '../seo'
import { FindJobsPage } from '@/features/find-jobs'
import AppLayout from '@/components/AppLayout'
import RelatedTools from '@/components/RelatedTools'

// Nov 2026: rebuilt as a link-out search (no scraping). Copy describes only what the tool does.
export const metadata: Metadata = genPageMetadata({
  title: 'Job Search: LinkedIn, Naukri, Indeed and Google Jobs in One Place | Auto Interview AI',
  description:
    'Type a job title once and open matching jobs on LinkedIn, Naukri, Indeed and Google Jobs. Free, no signup. Then prepare with role-specific interview guides and a free AI mock interview.',
  keywords:
    'job search, find jobs, LinkedIn jobs, Naukri jobs, Indeed jobs, Google jobs, fresher jobs, job finder',
  alternates: {
    canonical: 'https://www.autointerviewai.com/find-jobs',
  },
})

const FAQS = [
  {
    q: 'Is the job search tool free?',
    a: 'Yes. It is free and needs no signup. You type a job title, an optional location and an optional company, and the tool opens that search on each job board.',
  },
  {
    q: 'Which job boards does it search?',
    a: 'LinkedIn Jobs, Naukri, Indeed and Google Jobs. Each link opens the board’s own live results, so you apply on the original site.',
  },
  {
    q: 'Does Auto Interview AI store or copy job listings?',
    a: 'No. The tool only builds search links. Listings, filters and applications stay on each job board.',
  },
  {
    q: 'How do I search for remote jobs?',
    a: 'Type "Remote" in the location field. Most boards also have a remote filter on their results page.',
  },
]

export default function FindJobs() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQS.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
      />

      <AppLayout>
        <FindJobsPage />

        <section className="mx-auto w-full max-w-4xl px-8 pb-12">
          <h2 className="mb-4 text-2xl font-bold text-white">Questions</h2>
          <div className="space-y-4">
            {FAQS.map((f) => (
              <div key={f.q}>
                <h3 className="font-semibold text-white">{f.q}</h3>
                <p className="text-gray-400">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <RelatedTools currentPage="/find-jobs" />
      </AppLayout>
    </>
  )
}
