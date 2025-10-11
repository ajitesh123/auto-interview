import { Metadata } from 'next'
import { genPageMetadata } from '../seo'
import { ATSScorePage } from '@/features/ats-score'
import AppLayout from '@/components/AppLayout'
import RelatedTools from '@/components/RelatedTools'

export const metadata: Metadata = genPageMetadata({
  title: 'Free ATS Resume Score Checker | Check ATS Compatibility | Auto Interview AI',
  description:
    'Free ATS resume score checker - Analyze your resume for Applicant Tracking System compatibility. Get instant scoring, keyword optimization, and improvement suggestions. Upload PDF or DOCX.',
  keywords:
    'ATS score, resume optimization, ATS checker, applicant tracking system, ATS resume scanner, resume ATS test, ATS compatibility',
  alternates: {
    canonical: 'https://www.autointerviewai.com/ats-score',
  },
})

export default function ATSScore() {
  return (
    <>
      {/* SEO Content Section - Accessible to search engines and screen readers */}
      <div className="sr-only" aria-label="ATS Score Checker Description">
        <h1>Free ATS Resume Score Checker - Test Your Resume Compatibility</h1>
        <p>
          Check your resume's ATS (Applicant Tracking System) compatibility with our free AI-powered
          score checker. Get instant analysis, detailed scoring across multiple categories, and
          actionable improvement suggestions to help your resume pass through automated screening
          systems used by 99.7% of recruiters and Fortune 500 companies.
        </p>

        <h2>What is an ATS Score?</h2>
        <p>
          An ATS score measures how well your resume works with Applicant Tracking Systems - software
          that companies use to automatically scan, parse, and rank resumes. The score evaluates
          critical factors including keyword optimization, formatting structure, contact information
          clarity, work experience presentation, skills section organization, and overall
          readability. A high ATS score (75+) means your resume is likely to pass automated screening
          and reach human recruiters.
        </p>

        <h2>Key Features of Our ATS Checker</h2>
        <ul>
          <li>
            <strong>Instant Compatibility Scoring:</strong> Upload your resume and receive a
            comprehensive ATS score within seconds, no waiting required
          </li>
          <li>
            <strong>Detailed Category Breakdown:</strong> See scores for contact information,
            formatting, keywords, work experience, skills section, and overall structure
          </li>
          <li>
            <strong>Actionable Improvement Suggestions:</strong> Get specific, prioritized
            recommendations on what to fix and how to fix it
          </li>
          <li>
            <strong>Keyword Optimization Analysis:</strong> Discover which important keywords are
            missing and how to incorporate them naturally
          </li>
          <li>
            <strong>Format Compatibility Check:</strong> Ensure your resume format works with major
            ATS platforms like Workday, Greenhouse, Lever, and Taleo
          </li>
          <li>
            <strong>Contact Information Verification:</strong> Confirm that your email, phone, and
            LinkedIn profile are properly formatted for ATS parsing
          </li>
          <li>
            <strong>100% Free Analysis:</strong> No signup, no credit card, no hidden fees - just
            upload and get your score instantly
          </li>
        </ul>

        <h2>Why Your ATS Score Matters</h2>
        <p>
          Research shows that 75% of resumes are rejected by ATS before reaching human eyes. Even
          highly qualified candidates lose opportunities because their resumes don't meet ATS
          requirements. Common issues include poor formatting, missing keywords, incompatible fonts,
          tables or graphics that can't be parsed, and unclear section headers. Our ATS checker
          identifies these problems and provides clear solutions, dramatically increasing your chances
          of getting past the initial screening.
        </p>

        <h2>How the ATS Score Checker Works</h2>
        <ol>
          <li>
            <strong>Upload Your Resume:</strong> Submit your resume in PDF or DOCX format - both
            formats are analyzed for ATS compatibility
          </li>
          <li>
            <strong>AI Analysis:</strong> Our advanced AI scans your resume using algorithms similar
            to those used by real ATS systems
          </li>
          <li>
            <strong>Receive Detailed Report:</strong> Get your overall score plus detailed breakdown
            by category with specific issues identified
          </li>
          <li>
            <strong>Review Recommendations:</strong> See prioritized suggestions for improvement,
            from critical fixes to optional enhancements
          </li>
          <li>
            <strong>Improve and Retest:</strong> Make changes to your resume and run the check again
            to see your improved score
          </li>
        </ol>

        <h2>What Our ATS Checker Analyzes</h2>
        <p>
          Our comprehensive analysis evaluates contact information accuracy and parsability, overall
          document formatting and structure, keyword presence and relevance, work experience clarity
          and quantification, skills section organization, education presentation, section headers
          and labels, font compatibility, file format optimization, and overall readability for both
          ATS and human reviewers. Each factor is weighted based on its importance to ATS success.
        </p>
      </div>

      {/* FAQ Schema for AI Search Engines (ChatGPT, Claude, Perplexity) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is a good ATS score for a resume?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'A good ATS score is 75 or higher out of 100. Scores of 80+ indicate excellent ATS compatibility and significantly increase your chances of passing automated screening. Scores below 60 suggest your resume needs optimization before applying to jobs that use Applicant Tracking Systems.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is the ATS checker really free?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, our ATS resume score checker is completely free with no limitations, trial periods, or hidden costs. You can check as many resumes as you want, receive detailed scoring across multiple categories, and get improvement suggestions without signing up or providing payment information.',
                },
              },
              {
                '@type': 'Question',
                name: 'How does the ATS score checker work?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our ATS checker analyzes your resume using AI algorithms similar to those used by real Applicant Tracking Systems like Workday, Greenhouse, Lever, and Taleo. It evaluates contact information, formatting, keywords, work experience presentation, skills organization, and overall structure to generate your compatibility score.',
                },
              },
              {
                '@type': 'Question',
                name: 'Why did my resume fail the ATS test?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Common reasons for low ATS scores include: complex formatting with tables or graphics that ATS cannot parse, missing relevant keywords from job descriptions, non-standard section headers, incompatible fonts, images embedded in PDFs, or unclear contact information. Our checker identifies these specific issues and provides recommendations.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I upload both PDF and DOCX files?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, our ATS checker accepts both PDF and DOCX (Word document) formats. Both formats are analyzed for ATS compatibility, though DOCX files are sometimes preferred by certain ATS systems as they are easier for the software to parse accurately.',
                },
              },
              {
                '@type': 'Question',
                name: 'How can I improve my ATS score quickly?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'To quickly improve your ATS score: use standard section headers (Experience, Education, Skills), remove tables and graphics, include relevant keywords from the job description naturally in your content, use a simple single-column layout, stick to standard fonts like Arial or Calibri, and ensure your contact information is clearly formatted at the top.',
                },
              },
            ],
          }),
        }}
      />

      <AppLayout>
        <ATSScorePage />
        <RelatedTools currentPage="/ats-score" />
      </AppLayout>
    </>
  )
}
