import Head from 'next/head'

const SEOFeatures = () => {
  return (
    <>
      {/* Comprehensive Structured Data for All Features */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Auto Interview AI - Complete Job Preparation Platform',
            alternateName: [
              'Auto Interview AI',
              'Autointerviewai',
              'Job Preparation Tools',
              'Career Preparation Suite',
            ],
            description:
              'Complete AI-powered job preparation platform featuring resume builder, ATS score checker, job search, cover letter generator, and skill assessments. Everything you need to land your dream job.',
            url: 'https://www.autointerviewai.com',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web Browser',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            featureList: [
              'AI Resume Builder',
              'ATS Score Checker',
              'AI Job Search Tool',
              'Cover Letter Generator',
              'Skill Assessments',
              'Mock Interview Practice',
            ],
            creator: {
              '@type': 'Organization',
              name: 'Auto Interview AI',
              url: 'https://www.autointerviewai.com',
            },
            potentialAction: [
              {
                '@type': 'UseAction',
                target: 'https://www.autointerviewai.com',
                name: 'Build Professional Resume',
              },
              {
                '@type': 'UseAction',
                target: 'https://www.autointerviewai.com',
                name: 'Check ATS Resume Score',
              },
              {
                '@type': 'UseAction',
                target: 'https://www.autointerviewai.com',
                name: 'Search for Jobs',
              },
              {
                '@type': 'UseAction',
                target: 'https://www.autointerviewai.com',
                name: 'Generate Cover Letter',
              },
              {
                '@type': 'UseAction',
                target: 'https://www.autointerviewai.com',
                name: 'Take Skill Assessment',
              },
            ],
          }),
        }}
      />

      {/* Individual Feature Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'AI Resume Builder',
              description:
                'Free AI-powered resume builder that creates professional, ATS-friendly resumes from scratch or by uploading existing resumes',
              url: 'https://www.autointerviewai.com',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web Browser',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              featureList: [
                'AI-powered resume building',
                'ATS-friendly templates',
                'Resume upload and parsing',
                'Professional formatting',
                'Content optimization',
                'Multiple export formats',
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'ATS Resume Score Checker',
              description:
                'Free AI-powered ATS resume compatibility checker that analyzes resumes and provides detailed scoring and improvement suggestions',
              url: 'https://www.autointerviewai.com',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web Browser',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              featureList: [
                'Instant ATS compatibility scoring',
                'Detailed category breakdown',
                'Improvement suggestions',
                'Keyword optimization',
                'Format analysis',
                'Contact information verification',
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'AI Job Search Tool',
              description:
                'AI-powered job search tool that finds and matches job opportunities from LinkedIn based on preferences and qualifications',
              url: 'https://www.autointerviewai.com',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web Browser',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              featureList: [
                'AI-powered job matching',
                'LinkedIn job search',
                'Location-based filtering',
                'Company-specific search',
                'Job title filtering',
                'Direct application links',
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'AI Cover Letter Generator',
              description:
                'Free AI-powered cover letter generator that creates personalized cover letters tailored to specific job postings and companies',
              url: 'https://www.autointerviewai.com',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web Browser',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              featureList: [
                'AI-powered cover letter generation',
                'Job-specific customization',
                'Resume integration',
                'Company-specific tailoring',
                'Professional formatting',
                'DOCX download',
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Skills Assessment Platform',
              description:
                'Comprehensive skill assessment and mock interview platform for practice across product management, technical skills, behavioral interviews, and more',
              url: 'https://www.autointerviewai.com',
              applicationCategory: 'EducationalApplication',
              operatingSystem: 'Web Browser',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              featureList: [
                'Product Management assessments',
                'Technical interview practice',
                'Behavioral interview questions',
                'Data analysis assessments',
                'Leadership evaluations',
                'Progress tracking',
              ],
            },
          ]),
        }}
      />

      {/* Comprehensive FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is Auto Interview AI?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Auto Interview AI is a comprehensive job preparation platform that provides AI-powered tools including resume builder, ATS score checker, job search, cover letter generator, and skill assessments to help job seekers land their dream jobs.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is Auto Interview AI free to use?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, all features of Auto Interview AI are completely free to use. You can build resumes, check ATS scores, search for jobs, generate cover letters, and take skill assessments without any cost.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is an ATS score?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'An ATS score is a compatibility rating that measures how well your resume works with Applicant Tracking Systems (ATS). It evaluates factors like keywords, formatting, structure, and content quality to determine if your resume will pass through ATS filters.',
                },
              },
              {
                '@type': 'Question',
                name: 'How does the AI resume builder work?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our AI resume builder helps you create professional resumes by providing content suggestions, ATS-friendly templates, and optimization recommendations. You can start from scratch or upload an existing resume for improvement.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I upload my existing resume?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, you can upload your existing resume in PDF or DOCX format. Our AI will parse the content and help you improve it with better formatting and optimization.',
                },
              },
              {
                '@type': 'Question',
                name: 'How does the job search feature work?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our job search tool searches LinkedIn for job opportunities based on your specified criteria including job title, location, and company. It uses intelligent algorithms to find the most relevant matches.',
                },
              },
              {
                '@type': 'Question',
                name: 'How does the cover letter generator work?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our AI cover letter generator analyzes your resume and the job description to create a personalized cover letter that highlights your relevant skills and experience for the specific position.',
                },
              },
              {
                '@type': 'Question',
                name: 'What types of assessments are available?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'We offer assessments in multiple categories including Product Management, Technical Skills, Behavioral Interviews, Data Analysis, and Leadership. Each category has different difficulty levels from Beginner to Advanced.',
                },
              },
              {
                '@type': 'Question',
                name: 'Are the resume templates ATS-friendly?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, all our resume templates are designed to be ATS-friendly with proper formatting, structure, and keyword optimization to ensure they pass through applicant tracking systems.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I download my resume in different formats?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, you can download your completed resume in multiple formats including PDF and DOCX for maximum compatibility with job applications.',
                },
              },
            ],
          }),
        }}
      />

      {/* How-To Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'HowTo',
              name: 'How to Build an ATS-Friendly Resume',
              description:
                'Step-by-step guide to creating a professional resume that passes ATS filters',
              step: [
                {
                  '@type': 'HowToStep',
                  name: 'Choose a Professional Template',
                  text: 'Select an ATS-friendly resume template with clean formatting and standard sections.',
                },
                {
                  '@type': 'HowToStep',
                  name: 'Add Contact Information',
                  text: 'Include your name, phone number, email, and LinkedIn profile in the header section.',
                },
                {
                  '@type': 'HowToStep',
                  name: 'Write a Professional Summary',
                  text: 'Create a compelling professional summary that highlights your key skills and achievements.',
                },
                {
                  '@type': 'HowToStep',
                  name: 'List Work Experience',
                  text: 'Detail your work experience with job titles, company names, dates, and accomplishments.',
                },
                {
                  '@type': 'HowToStep',
                  name: 'Include Relevant Skills',
                  text: 'Add a skills section with keywords relevant to your target job.',
                },
                {
                  '@type': 'HowToStep',
                  name: 'Check ATS Score',
                  text: 'Use our ATS score checker to analyze your resume and get improvement suggestions.',
                },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'HowTo',
              name: 'How to Generate a Custom Cover Letter',
              description: 'Guide to creating personalized cover letters for job applications',
              step: [
                {
                  '@type': 'HowToStep',
                  name: 'Gather Job Information',
                  text: 'Collect the job title, company name, and complete job description.',
                },
                {
                  '@type': 'HowToStep',
                  name: 'Upload Your Resume',
                  text: 'Upload your current resume in PDF or DOCX format for AI analysis.',
                },
                {
                  '@type': 'HowToStep',
                  name: 'Generate Cover Letter',
                  text: 'Use our AI generator to create a personalized cover letter based on your resume and job requirements.',
                },
                {
                  '@type': 'HowToStep',
                  name: 'Review and Customize',
                  text: 'Review the generated cover letter and make any necessary customizations.',
                },
                {
                  '@type': 'HowToStep',
                  name: 'Download and Apply',
                  text: 'Download the cover letter as a DOCX file and use it for your job application.',
                },
              ],
            },
          ]),
        }}
      />

      {/* Organization Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Auto Interview AI',
            alternateName: 'Autointerviewai',
            description:
              'Leading AI-powered job preparation platform providing resume building, ATS analysis, job search, cover letter generation, and skill assessments',
            url: 'https://www.autointerviewai.com',
            logo: 'https://www.autointerviewai.com/static/images/logo.svg',
            sameAs: [
              'https://github.com/ajitesh123',
              'https://x.com/ajiteshleo',
              'https://www.linkedin.com/in/ajiteshnandan/',
              'https://www.youtube.com/@ajiteshleo',
            ],
            contactPoint: {
              '@type': 'ContactPoint',
              email: 'ajiteshleo@gmail.com',
              contactType: 'Customer Service',
            },
          }),
        }}
      />

      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://www.autointerviewai.com',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Job Preparation Tools',
                item: 'https://www.autointerviewai.com',
              },
            ],
          }),
        }}
      />
    </>
  )
}

export default SEOFeatures
