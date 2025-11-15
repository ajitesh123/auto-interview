import { Metadata } from 'next'
import { genPageMetadata } from '../seo'
import { FreeResourcesPage } from '@/features/free-resources'
import AppLayout from '@/components/AppLayout'
import RelatedTools from '@/components/RelatedTools'
import TLDRSummary from '@/components/TLDRSummary'

export const metadata: Metadata = genPageMetadata({
  title: 'Free Career Resources Library | Templates, Playbooks & Checklists',
  description:
    'Download ATS-friendly resume templates, interview checklists, outreach scripts, and job search playbooks. The Auto Interview AI Free Resources library is 100% ungated.',
  keywords:
    'free career resources, resume templates, interview checklist, job search playbook, ATS guide, cover letter template, downloadable templates',
  alternates: {
    canonical: 'https://www.autointerviewai.com/free-resources',
  },
})

export default function FreeResources() {
  return (
    <>
      {/* SEO Content Section */}
      <div className="sr-only" aria-label="Free Resources Library">
        <h1>Free Career Resources, Templates, and Playbooks</h1>
        <p>
          Access ATS-friendly resume templates, interview prep checklists, cover letter scripts, job
          search playbooks, and outreach cadences in a single free resource library. Every download is
          ungated, instantly available, and optimized for 2025 hiring workflows.
        </p>
        <h2>What&apos;s Included</h2>
        <ul>
          <li>Harvard, Stanford, and LBS resume templates with HTML/CSS files</li>
          <li>Product management interview checklists and answer templates</li>
          <li>ATS optimization guides to consistently score 80+ on resume scans</li>
          <li>Job search playbooks covering LinkedIn sourcing and outreach scripts</li>
          <li>Career roadmaps that show the exact order to build, score, and submit applications</li>
        </ul>
        <h2>How to Use the Free Resources</h2>
        <ol>
          <li>Pick a template or checklist that matches your next deliverable.</li>
          <li>Customize the file (HTML, Markdown, or Google Doc) inside 5-10 minutes.</li>
          <li>Run the paired Auto Interview AI workflow (resume builder, ATS score, matcher, or cover letter).</li>
          <li>Repeat weekly to keep applications, interviews, and outreach in sync.</li>
        </ol>
      </div>

      {/* FAQ Schema for AI/AEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Are the resume templates really free?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. All Harvard, Stanford, and LBS resume templates are free, ungated downloads. Customize the HTML/CSS files locally or paste them into the Auto Interview AI resume builder.',
                },
              },
              {
                '@type': 'Question',
                name: 'Do I need to enter an email to access the downloads?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. The Free Resources library is 100% ungated—no email capture, accounts, or paywalls. Click any card to download instantly.',
                },
              },
              {
                '@type': 'Question',
                name: 'How should I use the interview checklists?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Print or duplicate the Product Management interview checklist before every onsite loop. It covers discovery, execution, metrics, and leadership prompts so you can rehearse high-signal stories quickly.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the fastest workflow with these resources?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Download a template, build or paste your resume into Auto Interview AI, run an ATS score check, then use the job search playbook plus AI cover letter generator for targeted applications—all within 30 minutes.',
                },
              },
            ],
          }),
        }}
      />

      <AppLayout>
        <TLDRSummary
          title="Auto Interview AI Free Resources Library"
          summary="Download resume templates, interview frameworks, and job search playbooks without email gates. Pair every resource with an Auto Interview AI workflow to take action immediately."
          keyPoints={[
            'Harvard, Stanford, and LBS resume templates in HTML/CSS',
            'Interview checklists + answer templates for PM, product, and GTM roles',
            'ATS optimization guide to hit 80+ scores before applying',
            'Job search playbooks covering sourcing, outreach, and daily cadences',
            'Completely free downloads—no email capture or credit cards',
            'Built to plug into the Build Resume, ATS Score, Job Search, and Cover Letter tools',
          ]}
        />

        <FreeResourcesPage />
        <RelatedTools currentPage="/free-resources" />
      </AppLayout>
    </>
  )
}

