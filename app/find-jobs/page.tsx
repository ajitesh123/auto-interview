import { Metadata } from 'next'
import { genPageMetadata } from '../seo'
import { FindJobsPage } from '@/features/find-jobs'
import AppLayout from '@/components/AppLayout'
import RelatedTools from '@/components/RelatedTools'
import TLDRSummary from '@/components/TLDRSummary'

export const metadata: Metadata = genPageMetadata({
  title: 'AI Job Search Tool | Find Jobs on LinkedIn | Auto Interview AI',
  description:
    'AI-powered job search tool - Find relevant jobs on LinkedIn based on your skills, location, and preferences. Direct application links, company filtering, and smart matching. Free to use.',
  keywords:
    'job search, find jobs, job opportunities, career search, LinkedIn jobs, AI job search, job finder, employment search, job board',
  alternates: {
    canonical: 'https://www.autointerviewai.com/find-jobs',
  },
})

export default function FindJobs() {
  return (
    <>
      {/* SEO Content Section - Accessible to search engines and screen readers */}
      <div className="sr-only" aria-label="Job Search Tool Description">
        <h1>AI-Powered Job Search Tool - Find Relevant Jobs on LinkedIn</h1>
        <p>
          Discover relevant job opportunities with our free AI-powered job search tool. Search
          LinkedIn jobs by title, location, and company with intelligent matching algorithms that
          find positions aligned with your skills and career goals. Get direct application links,
          detailed job descriptions, and smart filtering options - all completely free with no
          registration required.
        </p>

        <h2>How Our AI Job Search Works</h2>
        <p>
          Our intelligent job search platform connects directly to LinkedIn's extensive job database,
          searching thousands of current openings to find the best matches for your criteria. Unlike
          basic job boards, our AI analyzes job requirements, company culture, and position details
          to present opportunities that truly fit your profile. The system continuously updates with
          new postings, ensuring you never miss fresh opportunities in your field.
        </p>

        <h2>Key Features of Our Job Finder</h2>
        <ul>
          <li>
            <strong>Smart Job Matching:</strong> AI-powered algorithms analyze your search criteria
            and find positions that match your skills, experience level, and career aspirations
          </li>
          <li>
            <strong>LinkedIn Integration:</strong> Access LinkedIn's vast job database with
            thousands of opportunities from companies worldwide
          </li>
          <li>
            <strong>Location-Based Filtering:</strong> Search by city, state, country, or remote
            work options to find jobs in your preferred locations
          </li>
          <li>
            <strong>Company-Specific Search:</strong> Target specific companies you want to work for
            or explore opportunities across multiple organizations
          </li>
          <li>
            <strong>Job Title Filtering:</strong> Search by exact job titles or related positions to
            find roles that match your experience and goals
          </li>
          <li>
            <strong>Direct Application Links:</strong> Click through directly to job postings with
            all the information you need to apply quickly
          </li>
          <li>
            <strong>Real-Time Results:</strong> Get instant search results with up-to-date job
            postings and accurate information
          </li>
          <li>
            <strong>No Registration Required:</strong> Start searching immediately without creating
            an account or sharing personal information
          </li>
        </ul>

        <h2>Why Use Our Job Search Platform</h2>
        <p>
          The average job search takes 3-6 months and involves applying to 100-200 positions. Our AI
          job search tool streamlines this process by showing you only relevant opportunities that
          match your criteria, saving you hours of manual searching and filtering through irrelevant
          postings. The intelligent matching means you spend less time searching and more time
          preparing quality applications for positions where you're truly a good fit.
        </p>

        <h2>How to Find Your Perfect Job</h2>
        <ol>
          <li>
            <strong>Enter Your Search Criteria:</strong> Specify the job title you're looking for,
            your preferred location, and optionally target specific companies
          </li>
          <li>
            <strong>Review AI-Matched Results:</strong> Browse through curated job listings that
            match your search parameters with relevance scoring
          </li>
          <li>
            <strong>Read Detailed Descriptions:</strong> Click on any job to see full details
            including requirements, responsibilities, company information, and benefits
          </li>
          <li>
            <strong>Apply Directly:</strong> Use the direct LinkedIn application links to submit
            your resume and cover letter
          </li>
          <li>
            <strong>Refine Your Search:</strong> Adjust your criteria to expand or narrow results
            based on what you find
          </li>
        </ol>

        <h2>Perfect for All Career Stages</h2>
        <p>
          Whether you're a recent graduate exploring entry-level opportunities, a professional
          seeking career advancement, an executive looking for leadership roles, or someone
          considering a career change, our job search tool adapts to your needs. The AI understands
          different experience levels and matches you with appropriate positions, from internships
          and junior roles to senior positions and C-level opportunities across all industries
          including technology, healthcare, finance, marketing, education, and more.
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
                name: 'Is the AI job search tool free to use?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, Auto Interview AI job search tool is completely free with no signup required. You can search for jobs on LinkedIn, filter by location and company, view detailed job descriptions, and access direct application links without any cost or registration.',
                },
              },
              {
                '@type': 'Question',
                name: 'How does the AI job matching work?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "Our AI analyzes your search criteria (job title, location, company preferences) and matches you with relevant opportunities from LinkedIn's job database. The intelligent matching considers job requirements, company culture indicators, and position details to present opportunities that truly fit your profile.",
                },
              },
              {
                '@type': 'Question',
                name: 'Can I search for remote jobs?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, you can search for remote jobs by including "remote" in your location field or job title. Our tool will find remote and work-from-home opportunities that match your criteria across all industries and experience levels.',
                },
              },
              {
                '@type': 'Question',
                name: 'How many jobs should I apply to per week?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Career experts recommend applying to 10-15 quality jobs per week rather than mass-applying to dozens. Our AI job search helps you find relevant matches so you can focus on quality applications with tailored resumes and cover letters for each position, which increases your interview rate by 3x compared to generic applications.',
                },
              },
              {
                '@type': 'Question',
                name: 'Does the tool search all job boards?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "Our tool primarily searches LinkedIn's extensive job database, which includes millions of current job postings from companies worldwide. LinkedIn is used by 90% of recruiters and contains listings from virtually all major employers, making it the most comprehensive single source for job opportunities.",
                },
              },
              {
                '@type': 'Question',
                name: 'How often are job listings updated?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "Job listings are pulled in real-time from LinkedIn's current database, ensuring you see the most up-to-date opportunities. New jobs are posted daily, and expired listings are automatically removed, so you never waste time applying to filled positions.",
                },
              },
            ],
          }),
        }}
      />

      <AppLayout>
        {/* TL;DR Summary - Answer-first format for 2025 SEO/AEO */}
        <TLDRSummary
          title="AI-Powered Job Search Tool"
          summary="Find relevant jobs on LinkedIn instantly with AI-powered matching. Search by title, location, and company to discover opportunities that match your skills and goals."
          keyPoints={[
            'Average job search takes 3-6 months - accelerate yours with AI matching',
            '70% of jobs are hidden/unadvertised - access millions on LinkedIn',
            'Smart filtering by location, company, remote options, and job title',
            'Direct application links to all current openings - apply in one click',
            '10-15 quality applications per week recommended - focus on relevance',
            '100% free job search - no signup, no limits, no registration required',
          ]}
        />

        <FindJobsPage />
        <RelatedTools currentPage="/find-jobs" />
      </AppLayout>
    </>
  )
}
