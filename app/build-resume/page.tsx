import { Metadata } from 'next'
import { genPageMetadata } from '../seo'
import { BuildResumePage } from '@/features/build-resume'
import AppLayout from '@/components/AppLayout'
import RelatedTools from '@/components/RelatedTools'

export const metadata: Metadata = genPageMetadata({
  title: 'Free AI Resume Builder | ATS-Friendly Templates | Auto Interview AI',
  description:
    'Free AI-powered resume builder with ATS-friendly templates. Create professional resumes from scratch or upload existing resumes. Download in PDF or DOCX format. No signup required.',
  keywords:
    'resume builder, AI resume, professional resume, resume templates, ATS resume, free resume builder, resume creator, online resume builder',
  alternates: {
    canonical: 'https://www.autointerviewai.com/build-resume',
  },
})

export default function BuildResume() {
  return (
    <>
      {/* SEO Content Section - Accessible to search engines and screen readers */}
      <div className="sr-only" aria-label="Resume Builder Description">
        <h1>Free AI Resume Builder - Create ATS-Friendly Professional Resumes</h1>
        <p>
          Build professional, ATS-optimized resumes with our free AI-powered resume builder.
          Create from scratch or upload your existing resume for AI-driven improvements. Choose
          from multiple ATS-friendly templates including Harvard, Modern, and Professional formats
          that pass Applicant Tracking Systems used by 99% of Fortune 500 companies.
        </p>

        <h2>Key Features of Our Resume Builder</h2>
        <ul>
          <li>
            <strong>AI-Powered Content Suggestions:</strong> Get intelligent recommendations to
            improve your resume content, optimize keywords, and highlight your achievements
            effectively
          </li>
          <li>
            <strong>ATS-Friendly Templates:</strong> Choose from professionally designed templates
            (Harvard, Modern, Professional) that are proven to pass Applicant Tracking Systems
          </li>
          <li>
            <strong>Upload Existing Resume:</strong> Upload your current resume in PDF or DOCX
            format and let our AI analyze and improve it
          </li>
          <li>
            <strong>Real-Time Preview:</strong> See your resume updates instantly as you make
            changes with our live preview feature
          </li>
          <li>
            <strong>Multiple Export Formats:</strong> Download your completed resume in PDF or DOCX
            format for maximum compatibility
          </li>
          <li>
            <strong>No Signup Required:</strong> Start building your resume immediately without
            creating an account or providing personal information
          </li>
          <li>
            <strong>100% Free Forever:</strong> All features are completely free with no hidden
            costs, premium tiers, or limitations
          </li>
        </ul>

        <h2>Why Use Our AI Resume Builder?</h2>
        <p>
          Over 75% of resumes are rejected by Applicant Tracking Systems (ATS) before reaching
          human recruiters. Companies use ATS software to automatically filter and rank resumes
          based on keywords, formatting, and structure. Our resume builder ensures your resume
          passes ATS screening with proper formatting, strategic keyword optimization, and
          professional structure that both algorithms and recruiters appreciate.
        </p>

        <h2>How the Resume Builder Works</h2>
        <ol>
          <li>
            <strong>Choose Your Starting Point:</strong> Build from scratch with our guided process
            or upload an existing resume for AI-powered improvements
          </li>
          <li>
            <strong>Select an ATS-Friendly Template:</strong> Pick from Harvard (traditional),
            Modern (contemporary), or Professional (business-focused) templates
          </li>
          <li>
            <strong>Fill in Your Information:</strong> Add your contact details, work experience,
            education, skills, and achievements. Our AI provides suggestions for improvement
          </li>
          <li>
            <strong>Preview in Real-Time:</strong> Watch your resume come together with instant
            preview updates as you edit
          </li>
          <li>
            <strong>Download Your Resume:</strong> Export your finished resume in PDF (for
            applications) or DOCX (for further editing) format
          </li>
        </ol>

        <h2>Perfect For Job Seekers At All Levels</h2>
        <p>
          Whether you're a recent graduate looking for your first job, a mid-career professional
          seeking advancement, or an executive exploring new opportunities, our resume builder helps
          you create a compelling resume that showcases your unique value. The AI-powered
          suggestions adapt to your experience level and industry, ensuring your resume resonates
          with recruiters in your field.
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
                name: 'Is the AI resume builder really free?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, Auto Interview AI resume builder is 100% free with no hidden costs, premium tiers, or limitations. All features including AI-powered content suggestions, ATS-friendly templates (Harvard, Modern, Professional), and downloads in PDF or DOCX format are completely free with no signup required.',
                },
              },
              {
                '@type': 'Question',
                name: 'How long does it take to build a resume with AI?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Most users complete their professional resume in 10-15 minutes using our AI-powered builder. If you upload an existing resume, the process is even faster as our AI analyzes and improves your content automatically while maintaining your professional history.',
                },
              },
              {
                '@type': 'Question',
                name: 'Are the resume templates ATS-friendly?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, all our resume templates (Harvard, Modern, and Professional) are specifically designed to pass Applicant Tracking Systems used by 99.7% of Fortune 500 companies. They use standard formatting, proper section headers (Experience, Education, Skills), and compatible fonts that ATS software can easily parse and understand.',
                },
              },
              {
                '@type': 'Question',
                name: 'Do I need to create an account to use the resume builder?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No signup or account creation is required. You can start building your resume immediately and download it in PDF or DOCX format without providing any personal information, email address, or payment details.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I upload my existing resume to improve it?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, you can upload your existing resume in PDF or DOCX format. Our AI will analyze your content, identify areas for improvement, and suggest optimizations for ATS compatibility while maintaining your professional achievements and work history.',
                },
              },
              {
                '@type': 'Question',
                name: 'What makes an ATS-friendly resume?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'An ATS-friendly resume uses standard section headers, simple formatting without tables or graphics, compatible fonts (like Arial or Calibri), relevant keywords from job descriptions, and a clear structure. Our templates are pre-optimized for all these factors to ensure your resume passes ATS screening.',
                },
              },
            ],
          }),
        }}
      />

      <AppLayout>
        <BuildResumePage />
        <RelatedTools currentPage="/build-resume" />
      </AppLayout>
    </>
  )
}
