import { Metadata } from 'next'
import { genPageMetadata } from '../seo'
import { CoverLetterPage } from '@/features/cover-letter'
import AppLayout from '@/components/AppLayout'
import RelatedTools from '@/components/RelatedTools'

export const metadata: Metadata = genPageMetadata({
  title: 'Free AI Cover Letter Generator | Custom Cover Letters | Auto Interview AI',
  description:
    'AI cover letter generator - Create personalized, job-specific cover letters using AI. Upload your resume, paste job description, get custom cover letter in DOCX format. Free tool.',
  keywords:
    'cover letter generator, AI cover letter, personalized cover letter, custom cover letter, cover letter builder, free cover letter, cover letter creator',
  alternates: {
    canonical: 'https://www.autointerviewai.com/cover-letter',
  },
})

export default function CoverLetter() {
  return (
    <>
      {/* SEO Content Section - Accessible to search engines and screen readers */}
      <div className="sr-only" aria-label="Cover Letter Generator Description">
        <h1>Free AI Cover Letter Generator - Create Custom Personalized Cover Letters</h1>
        <p>
          Generate personalized, job-specific cover letters with our free AI-powered cover letter
          generator. Upload your resume, paste the job description, and receive a custom-tailored
          cover letter that highlights your relevant experience and skills. Download in DOCX format
          for easy editing and application submission - completely free with no registration or
          hidden costs.
        </p>

        <h2>Why Use Our AI Cover Letter Generator?</h2>
        <p>
          Cover letters remain critical in job applications, with 83% of hiring managers stating they
          read cover letters and 56% considering them important or very important. However, writing
          unique, compelling cover letters for each application is time-consuming and challenging.
          Our AI cover letter generator solves this problem by analyzing your resume and the job
          posting to create a personalized letter that demonstrates why you're the perfect candidate,
          saving you hours while improving your application quality.
        </p>

        <h2>Key Features of Our Cover Letter Tool</h2>
        <ul>
          <li>
            <strong>AI-Powered Personalization:</strong> Our advanced AI analyzes your resume and
            the job description to create truly personalized content, not generic templates
          </li>
          <li>
            <strong>Job-Specific Customization:</strong> Each cover letter is tailored to the
            specific position, highlighting your most relevant experience and skills
          </li>
          <li>
            <strong>Resume Integration:</strong> Upload your resume in PDF or DOCX format and the AI
            extracts your key achievements and qualifications
          </li>
          <li>
            <strong>Company-Specific Tailoring:</strong> The generator incorporates company-specific
            details to show your genuine interest and research
          </li>
          <li>
            <strong>Professional Formatting:</strong> Receive a professionally formatted cover
            letter following standard business letter conventions
          </li>
          <li>
            <strong>DOCX Download:</strong> Get your cover letter as an editable Word document,
            ready to customize further if needed
          </li>
          <li>
            <strong>Achievement Highlighting:</strong> The AI identifies and emphasizes your most
            impressive and relevant accomplishments
          </li>
          <li>
            <strong>Instant Generation:</strong> Receive your custom cover letter within seconds, no
            waiting or manual writing required
          </li>
        </ul>

        <h2>How the Cover Letter Generator Works</h2>
        <ol>
          <li>
            <strong>Upload Your Resume:</strong> Provide your current resume in PDF or DOCX format
            so the AI can understand your background and experience
          </li>
          <li>
            <strong>Enter Job Details:</strong> Paste the complete job description including
            requirements, responsibilities, and company information
          </li>
          <li>
            <strong>Specify Company and Position:</strong> Enter the company name and job title for
            proper personalization and addressing
          </li>
          <li>
            <strong>AI Analysis and Generation:</strong> Our AI analyzes both documents, identifies
            key matches, and creates your personalized cover letter
          </li>
          <li>
            <strong>Review Generated Letter:</strong> Read through your custom cover letter to
            ensure it captures your voice and matches the opportunity
          </li>
          <li>
            <strong>Download and Edit:</strong> Download the DOCX file and make any final tweaks
            before including it with your application
          </li>
        </ol>

        <h2>What Makes a Great Cover Letter</h2>
        <p>
          Effective cover letters combine several key elements: a strong opening that immediately
          captures attention, specific examples demonstrating how your experience matches the job
          requirements, quantifiable achievements that prove your value, genuine enthusiasm for the
          role and company, clear explanation of why you're the ideal candidate, and professional
          tone that matches the company culture. Our AI cover letter generator incorporates all these
          elements automatically, ensuring every letter you create follows best practices while
          maintaining authenticity and personalization.
        </p>

        <h2>Perfect for Every Application</h2>
        <p>
          Whether you're applying for your first job out of college, seeking a career change into a
          new industry, pursuing a promotion or senior role, targeting competitive positions at top
          companies, or applying to multiple positions simultaneously, our cover letter generator
          adapts to your situation. The AI understands different career levels, industries, and
          application contexts, creating appropriate cover letters for entry-level positions,
          mid-career roles, executive opportunities, technical positions, creative jobs, and
          everything in between.
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
                name: 'Is the AI cover letter generator really free?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, our AI cover letter generator is 100% free with no signup, subscription, or hidden costs. You can generate unlimited personalized cover letters, download them in DOCX format for editing, and use them for as many job applications as you need.',
                },
              },
              {
                '@type': 'Question',
                name: 'Do I really need a cover letter in 2025?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, cover letters still matter in 2025. Research shows 83% of hiring managers read cover letters, and 56% consider them important or very important. Cover letters increase interview chances by 30-40% according to TopResume, especially for competitive positions where multiple candidates have similar qualifications.',
                },
              },
              {
                '@type': 'Question',
                name: 'How does the AI cover letter generator work?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "Our AI analyzes your resume and the job description to create a personalized cover letter that highlights your most relevant experience and skills. It identifies key requirements from the job posting, matches them with your qualifications, and generates professional content that demonstrates why you're the ideal candidate.",
                },
              },
              {
                '@type': 'Question',
                name: 'How long should a cover letter be?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'A cover letter should be 250-400 words or about 3-4 paragraphs. It should fit on a single page with standard margins. Recruiters spend an average of 20-30 seconds reading cover letters, so concise, impactful content is more effective than lengthy explanations.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I edit the generated cover letter?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, we provide your cover letter as an editable DOCX file. You can open it in Microsoft Word, Google Docs, or any word processor to customize the content, adjust tone, or add personal touches before submitting your application.',
                },
              },
              {
                '@type': 'Question',
                name: 'Should I customize my cover letter for every job?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, customizing your cover letter for each job significantly improves your chances. Our AI makes this easy by analyzing each specific job description and tailoring the content accordingly. Customized cover letters show genuine interest and help you stand out from candidates using generic templates.',
                },
              },
            ],
          }),
        }}
      />

      <AppLayout>
        <CoverLetterPage />
        <RelatedTools currentPage="/cover-letter" />
      </AppLayout>
    </>
  )
}
