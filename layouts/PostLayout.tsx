import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import LandingHeader from '@/components/LandingHeader'
import Footer from '@/components/Footer'
import SocialShareButtons from '@/components/SocialShareButtons'
import TableOfContents from '@/components/TableOfContents'

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/data/${path}`
const discussUrl = (path) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/${path}`)}`

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export default function PostLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { filePath, path, slug, date, title, tags, summary, images } = content
  const basePath = path.split('/')[0]

  // Generic Article Schema for ALL blog posts (Google SEO requirement)
  const genericArticleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: summary || title,
    author: authorDetails?.map((author) => ({
      '@type': 'Person',
      name: author.name,
      url: author.twitter || author.linkedin || author.github,
    })) || [{
      '@type': 'Organization',
      name: 'Auto Interview AI',
      url: 'https://www.autointerviewai.com',
    }],
    publisher: {
      '@type': 'Organization',
      name: 'Auto Interview AI',
      url: 'https://www.autointerviewai.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.autointerviewai.com/static/images/logo.png',
      },
    },
    datePublished: date,
    dateModified: date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteMetadata.siteUrl}/${path}`,
    },
    image: images && images.length > 0 ? images[0] : `${siteMetadata.siteUrl}/static/images/Auto-interview-thumbnail.png`,
    keywords: tags?.join(', ') || '',
    inLanguage: 'en-US',
    isAccessibleForFree: true,
  }

  // BreadcrumbList Schema for navigation (Google SEO requirement)
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteMetadata.siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${siteMetadata.siteUrl}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: title,
        item: `${siteMetadata.siteUrl}/${path}`,
      },
    ],
  }

  // FAQ Schema for PM Interview Guide
  const faqSchema =
    slug === 'product-manager-interview-guide-2025'
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'How long should I prepare for a PM interview?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Aim for 6–8 weeks with focused weekly goals: product sense, behavioral stories, estimations, and 6–8 mock interviews. Use AI mocks for extra practice.',
              },
            },
            {
              '@type': 'Question',
              name: 'What frameworks should I use for product questions?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'CIRCLES for product sense, STAR for behavioral, and Impact vs Effort or MoSCoW for prioritization.',
              },
            },
            {
              '@type': 'Question',
              name: 'Where can I practice mock PM interviews?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: "Practice with peers, hire a coach, or use AI platforms like Tough Tongue AI's PM collection to simulate interviewer prompts and get feedback.",
              },
            },
            {
              '@type': 'Question',
              name: "How do I handle questions I don't know the answer to?",
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Be honest, ask clarifying questions, break down the problem, and show your thought process. Interviewers care more about how you think than having perfect answers.',
              },
            },
            {
              '@type': 'Question',
              name: 'What should I ask the interviewer?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Ask about team dynamics, product challenges, success metrics, growth opportunities, and company culture. Show genuine interest in the role.',
              },
            },
            {
              '@type': 'Question',
              name: "What's the difference between a PM and TPM?",
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Product Managers focus on user experience, business strategy, and stakeholder management. Technical Product Managers focus on system architecture, API design, and technical feasibility while still managing product strategy.',
              },
            },
            {
              '@type': 'Question',
              name: 'How do you answer behavioral questions in PM interviews?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Use the STAR method: Situation (set context), Task (explain responsibility), Action (describe what you did), Result (share outcome). Prepare 8-10 stories covering different scenarios.',
              },
            },
            {
              '@type': 'Question',
              name: 'What are the most common PM interview questions?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Top questions include: "Design a feature for [product]", "How would you improve [product]", "Tell me about a time you failed", "How would you prioritize features", and "What metrics would you track".',
              },
            },
          ],
        }
      : null

  // Article Schema for ATS Resume Checker
  const articleSchema =
    slug === 'best-ats-resume-checker-2025'
      ? {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: title,
          description:
            'Discover the 3 best ATS resume checkers in 2025. Compare Resume Worded, Enhancv, and AutoInterviewAI with detailed reviews, pricing, and features to boost your interview rate by 300%.',
          author: {
            '@type': 'Organization',
            name: 'AutoInterviewAI',
            url: 'https://autointerviewai.com',
          },
          publisher: {
            '@type': 'Organization',
            name: 'AutoInterviewAI',
            url: 'https://autointerviewai.com',
            logo: {
              '@type': 'ImageObject',
              url: 'https://autointerviewai.com/static/images/logo.svg',
            },
          },
          datePublished: date,
          dateModified: date,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${siteMetadata.siteUrl}/${path}`,
          },
          articleSection: 'Career Tools',
          keywords:
            'ATS resume checker, resume optimization, job search, Resume Worded, Enhancv, AutoInterviewAI, applicant tracking system, resume scanner, career tools, interview preparation',
          wordCount: 4500,
          timeRequired: 'PT15M',
          inLanguage: 'en-US',
          isAccessibleForFree: true,
        }
      : null

  // FAQ Schema for Job Search Guide
  const jobSearchFaqSchema =
    slug === 'how-to-find-jobs-complete-guide'
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'What is the most effective way to find a job?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'The most effective way to find a job is through employee referrals and strategic networking, which deliver a 60-70% success rate compared to just 1-2% for mass online applications. Build genuine relationships with people in your target companies, attend industry events, and leverage informational interviews to access the hidden job market where 70-80% of jobs are filled.',
              },
            },
            {
              '@type': 'Question',
              name: 'How long does it take to find a job?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Most job seekers take 3-6 months to find a new position with consistent daily effort. However, this varies significantly based on your industry, experience level, location, and job search strategy. Senior-level positions may take 6-12 months, while entry-level roles might be secured in 1-3 months.',
              },
            },
            {
              '@type': 'Question',
              name: 'How many jobs should I apply to per day?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Apply to 5-10 highly targeted positions per day rather than mass-applying to 50+ jobs. Quality beats quantity—tailored applications with customized resumes and cover letters generate 300% better response rates than generic applications.',
              },
            },
            {
              '@type': 'Question',
              name: 'How do I optimize my resume for ATS systems?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'To optimize your resume for ATS: Use standard formatting with .docx or simple PDF format, mirror exact keywords from job descriptions, include both acronyms and full terms, use standard section headings, avoid tables and text boxes, quantify achievements with specific metrics, and use common fonts like Arial or Calibri.',
              },
            },
            {
              '@type': 'Question',
              name: 'What is an ATS and why does it matter?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'An Applicant Tracking System (ATS) is software that screens and ranks resumes before human recruiters see them. 70% of companies use ATS, meaning your resume must pass automated screening to reach hiring managers. Resumes that aren\'t ATS-optimized are automatically rejected, regardless of qualifications.',
              },
            },
            {
              '@type': 'Question',
              name: 'What are the best job search websites?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'The best job search websites are: LinkedIn for networking and professional roles (40-50% success rate), Indeed for broad search across industries (20-30% success rate), Glassdoor for company research and salary data, ZipRecruiter for AI-powered matching, Google for Jobs for aggregated listings, AngelList for startup and tech roles, and FlexJobs for pre-screened remote positions.',
              },
            },
            {
              '@type': 'Question',
              name: 'How important is a LinkedIn presence for job searching?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'LinkedIn presence is critical for modern job searching. 87% of recruiters use LinkedIn to find candidates, and profiles with complete information are 40 times more likely to receive opportunities. LinkedIn enables direct access to hiring managers, visibility in recruiter searches, networking with professionals, and demonstrating expertise through content.',
              },
            },
            {
              '@type': 'Question',
              name: 'What are informational interviews and how do I request them?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Informational interviews are 15-30 minute conversations with professionals to learn about their role, company, or industry—not to ask for jobs directly. Request them by identifying people in target roles through LinkedIn, sending personalized messages explaining why you\'re reaching out, being specific about what you want to learn, and offering flexibility in scheduling.',
              },
            },
          ],
        }
      : null

  // HowTo Schema for Job Search Guide 2025 - Google SEO requirement
  const howToSchema =
    slug === 'job-search-guide-2025'
      ? {
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: 'How to Successfully Search for a Job in 2025',
          description: 'A comprehensive step-by-step guide to navigating the modern job market in 2025, covering AI screening, remote work trends, networking tactics, and skills-based hiring.',
          totalTime: 'P3M', // 3 months
          estimatedCost: {
            '@type': 'MonetaryAmount',
            currency: 'USD',
            value: '0',
          },
          step: [
            {
              '@type': 'HowToStep',
              position: 1,
              name: 'Define Your Target',
              text: 'Identify your ideal role and industry, research company cultures and values, understand salary expectations, and set realistic timelines.',
              url: `${siteMetadata.siteUrl}/blog/job-search-guide-2025#building-your-job-search-strategy`,
            },
            {
              '@type': 'HowToStep',
              position: 2,
              name: 'Optimize Your Online Presence',
              text: 'Update LinkedIn profile with keywords, create a professional portfolio, clean up social media presence, and build a personal brand.',
              url: `${siteMetadata.siteUrl}/blog/job-search-guide-2025#optimize-your-online-presence`,
            },
            {
              '@type': 'HowToStep',
              position: 3,
              name: 'Leverage Multiple Channels',
              text: 'Use job boards and company websites, attend professional networking events, participate in industry conferences and meetups, and get referrals from your network.',
              url: `${siteMetadata.siteUrl}/blog/job-search-guide-2025#leverage-multiple-channels`,
            },
            {
              '@type': 'HowToStep',
              position: 4,
              name: 'Network Effectively',
              text: 'Engage with industry content on LinkedIn, join professional groups and forums, share valuable insights and articles, and connect with industry professionals both online and in-person.',
              url: `${siteMetadata.siteUrl}/blog/job-search-guide-2025#effective-networking-strategies`,
            },
            {
              '@type': 'HowToStep',
              position: 5,
              name: 'Optimize Your Applications',
              text: 'Tailor each resume to the specific job, use ATS-friendly formatting, include quantifiable achievements, and write personalized cover letters.',
              url: `${siteMetadata.siteUrl}/blog/job-search-guide-2025#application-optimization`,
            },
            {
              '@type': 'HowToStep',
              position: 6,
              name: 'Prepare for Interviews',
              text: 'Study the company thoroughly, understand the role requirements, prepare specific examples using the STAR method, and practice common questions.',
              url: `${siteMetadata.siteUrl}/blog/job-search-guide-2025#interview-preparation`,
            },
            {
              '@type': 'HowToStep',
              position: 7,
              name: 'Leverage Technology',
              text: 'Use AI tools for resume optimization and interview practice, set up job alerts, use application tracking systems, and automate follow-up emails.',
              url: `${siteMetadata.siteUrl}/blog/job-search-guide-2025#leveraging-technology`,
            },
          ],
        }
      : null

  // FAQ Schema for Communication Skills Blog - Google SEO requirement
  const communicationFaqSchema =
    slug === 'master-communication-skills-speak-english-fluently'
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'How can I improve my communication skills?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Improve communication skills by practicing the CLEAR Framework daily: Clarity (simplify messages), Listening (engage actively), Empathy (understand perspectives), Adaptability (adjust to audiences), and Repetition (consistent practice). Start with 15 minutes daily focused practice and record yourself to track progress.',
              },
            },
            {
              '@type': 'Question',
              name: 'How do I speak English fluently?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Achieve English fluency in 3-12 months by: 1) Building vocabulary foundation (1,000 most common words first), 2) Practicing pronunciation with the Mirror Method, 3) Speaking 15-30 minutes daily (even to yourself), 4) Using spaced repetition for phrases, and 5) Practicing with AI tools or conversation partners.',
              },
            },
            {
              '@type': 'Question',
              name: 'What are the 7 C\'s of effective communication?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'While traditional models list Clear, Concise, Concrete, Correct, Coherent, Complete, and Courteous, the CLEAR Framework (Clarity, Listening, Empathy, Adaptability, Repetition) is more actionable for modern learners and includes active listening—the foundation of all communication.',
              },
            },
            {
              '@type': 'Question',
              name: 'How long does it take to improve communication skills?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Noticeable improvement in 2-4 weeks with daily practice. Significant transformation in 3-6 months with structured training (15-30 minutes daily). Communication skills are like fitness—consistent effort produces continuous improvement. The 7-Day Speaking Challenge provides immediate progress in one week.',
              },
            },
            {
              '@type': 'Question',
              name: 'Can I learn English by myself?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. Self-taught English learners succeed by: 1) Using structured frameworks (like the Mirror Method for pronunciation), 2) Practicing with AI tools (Tough Tongue AI, ELSA Speak), 3) Consuming English content daily (podcasts, YouTube), 4) Joining online language exchange communities, and 5) Setting specific, measurable goals. Consistency matters more than formal classes.',
              },
            },
            {
              '@type': 'Question',
              name: 'What\'s the fastest way to improve English pronunciation?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'The Mirror Method: 1) Observe native speakers\' mouth movements, 2) Isolate difficult sounds and practice alone, 3) Integrate sounds into words, 4) Apply in full sentences, 5) Record and compare. Practice 10 minutes daily for 30 days focusing on your 3 most difficult sounds. Results visible within 2 weeks.',
              },
            },
            {
              '@type': 'Question',
              name: 'How can I practice speaking English alone?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Practice alone by: 1) Narrating your day aloud, 2) Recording voice memos explaining topics you know, 3) Shadowing technique (repeat after native speakers), 4) Using AI conversation tools like Tough Tongue AI, 5) Reading aloud for 10 minutes daily, 6) Thinking in English instead of translating. Talking to yourself is highly effective practice.',
              },
            },
            {
              '@type': 'Question',
              name: 'What are the most important communication skills for the workplace?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Top workplace communication skills: 1) Active listening (L.I.S.T.E.N. Framework), 2) Clear, concise messaging (avoid jargon), 3) Adaptability (adjust for different audiences), 4) Emotional intelligence (reading the room), 5) Conflict resolution (using SBI method), 6) Written communication clarity, 7) Nonverbal awareness. Employers prioritize these in hiring decisions.',
              },
            },
            {
              '@type': 'Question',
              name: 'How do I overcome fear of speaking English?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Overcome speaking fear by: 1) Starting with low-stakes practice (AI tools, talking to yourself), 2) Accepting imperfection (fluency before accuracy), 3) Preparing 5-10 conversation starters in advance, 4) Using the 7-Day Speaking Challenge to build gradual confidence, 5) Celebrating small wins, 6) Remembering that native speakers make mistakes too. Fear decreases with repetition.',
              },
            },
            {
              '@type': 'Question',
              name: 'What\'s the difference between fluency and accuracy in English?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Fluency = smooth, natural flow of speech without long pauses. Accuracy = grammatical correctness. Prioritize fluency first—communicate your ideas even with small errors. Accuracy improves naturally with practice. Native speakers value understanding over perfect grammar. The Mirror Method and conversation practice build fluency; grammar study builds accuracy.',
              },
            },
          ],
        }
      : null

  // HowTo Schema for Communication Skills Blog - Google SEO requirement
  const communicationHowToSchema =
    slug === 'master-communication-skills-speak-english-fluently'
      ? {
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: 'How to Master Communication Skills and Speak English Fluently',
          description: 'A complete guide to improving communication skills and achieving English fluency using proven frameworks, daily exercises, and AI-powered practice methods.',
          totalTime: 'P6M', // 6 months
          estimatedCost: {
            '@type': 'MonetaryAmount',
            currency: 'USD',
            value: '0-50',
          },
          tool: [
            {
              '@type': 'HowToTool',
              name: 'Tough Tongue AI',
            },
            {
              '@type': 'HowToTool',
              name: 'Mirror for pronunciation practice',
            },
            {
              '@type': 'HowToTool',
              name: 'Recording device or smartphone',
            },
          ],
          step: [
            {
              '@type': 'HowToStep',
              position: 1,
              name: 'Master the CLEAR Framework',
              text: 'Learn and practice Clarity (simplify messages), Listening (engage actively), Empathy (understand perspectives), Adaptability (adjust to audiences), and Repetition (consistent practice). Apply one element daily for 5 days.',
              url: `${siteMetadata.siteUrl}/blog/master-communication-skills-speak-english-fluently#the-clear-framework-your-communication-blueprint`,
            },
            {
              '@type': 'HowToStep',
              position: 2,
              name: 'Build Vocabulary Foundation',
              text: 'Focus on the 1,000 most common English words which cover 80% of conversations. Learn phrases in context, not isolated words. Create a phrase journal and use new phrases within 24 hours.',
              url: `${siteMetadata.siteUrl}/blog/master-communication-skills-speak-english-fluently#how-do-i-speak-english-fluently`,
            },
            {
              '@type': 'HowToStep',
              position: 3,
              name: 'Practice the Mirror Method',
              text: 'Improve pronunciation by: 1) Observing native speakers, 2) Isolating difficult sounds, 3) Integrating into words, 4) Applying in sentences, 5) Recording and comparing. Practice 10 minutes daily focusing on 3 difficult sounds.',
              url: `${siteMetadata.siteUrl}/blog/master-communication-skills-speak-english-fluently#the-mirror-method-master-your-pronunciation`,
            },
            {
              '@type': 'HowToStep',
              position: 4,
              name: 'Develop Active Listening Skills',
              text: 'Apply the L.I.S.T.E.N. Framework: Look at speaker, Inquire with questions, Suspend judgment, Take notes appropriately, Empathize with emotions, Nod and provide feedback. Practice in every conversation.',
              url: `${siteMetadata.siteUrl}/blog/master-communication-skills-speak-english-fluently#active-listening-the-foundation-of-great-communication`,
            },
            {
              '@type': 'HowToStep',
              position: 5,
              name: 'Complete the 7-Day Speaking Challenge',
              text: 'Progressive daily exercises: Day 1 (Clarity), Day 2 (Listening), Day 3 (Empathy), Day 4 (Adaptability), Day 5 (Pronunciation), Day 6 (Live Conversation), Day 7 (Integration). Spend 20-30 minutes per day.',
              url: `${siteMetadata.siteUrl}/blog/master-communication-skills-speak-english-fluently#the-7-day-speaking-challenge`,
            },
            {
              '@type': 'HowToStep',
              position: 6,
              name: 'Leverage AI Tools for Practice',
              text: 'Use AI-powered platforms like Tough Tongue AI for realistic conversation practice, ELSA Speak for pronunciation, and ChatGPT for grammar. Practice 15-30 minutes daily with immediate feedback.',
              url: `${siteMetadata.siteUrl}/blog/master-communication-skills-speak-english-fluently#how-ai-tools-accelerate-your-learning`,
            },
            {
              '@type': 'HowToStep',
              position: 7,
              name: 'Self-Assess and Adjust',
              text: 'Complete communication and fluency self-assessments monthly. Identify 3 lowest-scoring areas and focus practice on those. Track progress and celebrate improvements.',
              url: `${siteMetadata.siteUrl}/blog/master-communication-skills-speak-english-fluently#self-assessment-where-are-you-now`,
            },
            {
              '@type': 'HowToStep',
              position: 8,
              name: 'Follow Action Plan',
              text: 'Right Now: Complete self-assessment, choose one framework. This Week: 15-20 min daily practice. This Month: Build consistency, increase difficulty. 3 Months: Achieve conversational fluency.',
              url: `${siteMetadata.siteUrl}/blog/master-communication-skills-speak-english-fluently#your-action-plan-steps-to-master-communication`,
            },
          ],
        }
      : null

  // FAQ Schema for Interview Freeze Blog - Google SEO requirement
  const interviewFreezeFaqSchema =
    slug === 'why-freeze-interviews-after-mock-practice'
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'How many mock interviews do I actually need?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Research suggests quality matters more than quantity. One study found that 25+ mock interviews improved confidence but didn\'t guarantee real interview success if they lacked stress simulation. Focus on 8-12 progressively stressful mock interviews rather than 30+ comfortable ones.',
              },
            },
            {
              '@type': 'Question',
              name: 'Can I really train my brain to handle interview stress?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. Stress inoculation training has been proven effective for PTSD, performance anxiety, and pre-deployment military stress. Your nervous system can adapt to high-pressure scenarios through repeated exposure, raising your stress threshold over time.',
              },
            },
            {
              '@type': 'Question',
              name: 'What if I still freeze during the real interview despite preparation?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Have a recovery protocol ready. Practice this exact script: "That\'s a great question. Let me take a moment to organize my thoughts... [breathe for 3-5 seconds] ... Here\'s what I\'d highlight..." This buys you time to let your amygdala calm and your prefrontal cortex reboot.',
              },
            },
            {
              '@type': 'Question',
              name: 'Should I mention my anxiety to the interviewer?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Generally no. Naming anxiety can sometimes reduce it (a technique called "affect labeling"), but it risks appearing unprofessional. Instead, use internal labeling: mentally say "This is adrenaline, not failure" to reactivate your rational brain.',
              },
            },
            {
              '@type': 'Question',
              name: 'How do I find someone to do brutal mock interviews with me?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Look for: Former hiring managers (they understand what harsh interviews feel like), Professional mock interview services that offer "stress testing", Peers who are also preparing and willing to trade brutal feedback, Career coaches who specialize in performance psychology, not just content.',
              },
            },
            {
              '@type': 'Question',
              name: 'Is it normal to feel worse after implementing stress training?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. Stress inoculation initially feels worse because you\'re confronting discomfort you previously avoided. This is called the "valley before the peak"—performance dips before it improves. Expect 2-3 weeks of increased anxiety before your nervous system adapts.',
              },
            },
            {
              '@type': 'Question',
              name: 'Can AI interview tools replace human mock interviewers?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Not entirely. AI excels at content feedback and unlimited practice but can\'t replicate the social threat response that human interviewers trigger. Use AI for volume and skill-building; use humans for stress inoculation.',
              },
            },
            {
              '@type': 'Question',
              name: 'What is the single most important thing I can do to close the practice-performance gap?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Practice under adversity. Stop doing comfortable mock interviews with supportive partners. Find the harshest, most unresponsive mock interviewer possible and practice recovering from failure in real-time. This trains the exact skills that traditional practice ignores.',
              },
            },
            {
              '@type': 'Question',
              name: 'Why do I freeze in interviews even though I practiced?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Your brain creates state-dependent memory during practice under low-stress conditions, which gets stored separately from high-stress memories. During real interviews, cortisol levels spike 200-300% higher than mock interviews, triggering an amygdala hijack that shuts down your prefrontal cortex (thinking brain) and blocks access to practiced answers. This is a neurological response, not a preparation failure.',
              },
            },
            {
              '@type': 'Question',
              name: 'What is amygdala hijack during interviews?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Amygdala hijack occurs when your brain\'s threat-detection system (amygdala) perceives social rejection or evaluation as a survival threat. It releases adrenaline and cortisol, shuts down non-essential cognitive functions including memory retrieval and complex reasoning, and redirects resources to fight-or-flight responses. This causes blank mind, verbal stumbling, time distortion, and physical symptoms like sweating and shaking.',
              },
            },
          ],
        }
      : null

  // FAQ Schema for "Blanked on Tell Me About Yourself" Blog - Google SEO requirement
  const tellMeAboutYourselfFaqSchema =
    slug === 'blanked-on-tell-me-about-yourself-recovery-script'
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'What do I do if I completely blank on "Tell me about yourself"?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Use the immediate recovery script: "That\'s a great question—give me just a moment to organize my thoughts" [pause 3-5 seconds, deep breath] "Sure. I\'m currently working as [role] at [company]...". This buys you 5-10 seconds for your prefrontal cortex to reboot.',
              },
            },
            {
              '@type': 'Question',
              name: 'Why do I know my introduction perfectly at home but freeze in the actual interview?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Your brain stores information in state-dependent memory. Practice under low stress creates memories your brain can\'t access under high stress. The information is there, but cortisol blocks retrieval pathways. Solution: Practice under realistic stress conditions (after physical exercise, with harsh evaluators, surprise timing).',
              },
            },
            {
              '@type': 'Question',
              name: 'How long should my "Tell me about yourself" answer be?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: '90-120 seconds maximum. Under 60 seconds is too brief (shows lack of preparation); over 2 minutes loses the interviewer\'s attention. Practice with a timer to calibrate.',
              },
            },
            {
              '@type': 'Question',
              name: 'Is it unprofessional to ask for a moment to think?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'No. Research shows interviewers interpret intentional pauses as thoughtfulness, not incompetence. Saying "Let me take a moment to give you a thoughtful answer" demonstrates professionalism and composure under pressure.',
              },
            },
            {
              '@type': 'Question',
              name: 'What causes interview freeze?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Interview freeze is caused by amygdala hijack—your brain\'s threat detector floods your system with cortisol and adrenaline, shutting down non-essential cognitive functions like memory retrieval and complex reasoning. The amygdala can\'t distinguish between a job interview and actual life-threatening danger.',
              },
            },
            {
              '@type': 'Question',
              name: 'Can I bring notes to reference if I blank?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Most interviews allow you to bring a portfolio, notepad, or resume. Have your 3-4 story points (Present-Past-Future keywords) written at the top of a visible page. A quick glance can reactivate your memory without obviously reading.',
              },
            },
            {
              '@type': 'Question',
              name: 'How many times should I practice before I\'m confident?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Research suggests quality over quantity: 25-30 practice repetitions using stress conditions (physical stress, surprise timing, harsh feedback) is more effective than 100 comfortable repetitions. Confidence comes from knowing you can recover from mistakes, not from never making them.',
              },
            },
            {
              '@type': 'Question',
              name: 'Is "Tell me about yourself" really that important?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. 49% of employers make hiring decisions within the first 5 minutes. Your opening answer sets the tone for everything that follows. A strong start creates positive momentum; a weak start is difficult to recover from.',
              },
            },
            {
              '@type': 'Question',
              name: 'What is the Present-Past-Future formula?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'The Present-Past-Future formula is: Present (30-40 seconds: current role + key achievement) → Past (30-40 seconds: relevant experience + connecting thread) → Future (20-30 seconds: why this role interests you). Total time: 90-120 seconds maximum.',
              },
            },
            {
              '@type': 'Question',
              name: 'What if I freeze and then forget what job I\'m interviewing for?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'This is panic-level anxiety. Use emergency protocol: "I apologize—I need a brief moment to compose myself" → 5-4-3-2-1 grounding (mentally note 5 things you see) → Box breathing (4-4-4-4) → If still frozen, request brief bathroom break to check your notes and reset.',
              },
            },
          ],
        }
      : null

  // HowTo Schema for Interview Freeze Blog - Google SEO requirement
  const interviewFreezeHowToSchema =
    slug === 'why-freeze-interviews-after-mock-practice'
      ? {
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: 'How to Stop Freezing in Real Interviews After Mock Practice',
          description: 'A comprehensive guide to bridging the practice-performance gap in job interviews using stress inoculation training, neuroscience-based recovery protocols, and evidence-based strategies.',
          totalTime: 'P6W', // 6 weeks
          estimatedCost: {
            '@type': 'MonetaryAmount',
            currency: 'USD',
            value: '0-100',
          },
          step: [
            {
              '@type': 'HowToStep',
              position: 1,
              name: 'Understand the Neuroscience of Interview Freeze',
              text: 'Learn why your brain treats interview rejection as a survival threat, activating the amygdala hijack and releasing cortisol that impairs memory, verbal fluency, and reasoning. Understand that social rejection activates the same brain regions as physical pain.',
              url: `${siteMetadata.siteUrl}/blog/why-freeze-interviews-after-mock-practice#the-neuroscience`,
            },
            {
              '@type': 'HowToStep',
              position: 2,
              name: 'Identify Your Personal Stress Triggers',
              text: 'Map out your specific stress symptoms during interviews: Do you experience blank mind, verbal stumbling, rapid heartbeat, or time distortion? Understanding your patterns helps you prepare targeted recovery protocols.',
              url: `${siteMetadata.siteUrl}/blog/why-freeze-interviews-after-mock-practice#amygdala-hijack`,
            },
            {
              '@type': 'HowToStep',
              position: 3,
              name: 'Practice the 4-7-8 Breathing Method',
              text: 'Master controlled breathing to deactivate the amygdala hijack: Inhale through nose for 4 seconds, hold breath for 7 seconds, exhale through mouth for 8 seconds, repeat 3-4 times. This activates your parasympathetic nervous system and overrides fight-or-flight.',
              url: `${siteMetadata.siteUrl}/blog/why-freeze-interviews-after-mock-practice#strategies`,
            },
            {
              '@type': 'HowToStep',
              position: 4,
              name: 'Replicate Physiological Stress in Practice',
              text: 'Before mock interviews, do 30 jumping jacks or sprint in place to elevate heart rate to 120+ bpm. Practice with visible timers and stand during interviews. This trains your brain to function while your body is in a stress state.',
              url: `${siteMetadata.siteUrl}/blog/why-freeze-interviews-after-mock-practice#strategies`,
            },
            {
              '@type': 'HowToStep',
              position: 5,
              name: 'Internalize Story Points, Not Scripts',
              text: 'Replace word-for-word memorization with flexible story frameworks: context (3-4 words), challenge (1 sentence), action (2-3 bullet points), result (1 metric). This conceptual framework survives stress because you can reconstruct it in real-time.',
              url: `${siteMetadata.siteUrl}/blog/why-freeze-interviews-after-mock-practice#strategies`,
            },
            {
              '@type': 'HowToStep',
              position: 6,
              name: 'Practice Recovery Protocols',
              text: 'Rehearse this exact script for when you blank: "That\'s a great question. Let me take a moment to organize my thoughts... [pause 3-5 seconds, breathe] ... Here\'s what I\'d highlight..." Practice intentional failure moments in mock interviews.',
              url: `${siteMetadata.siteUrl}/blog/why-freeze-interviews-after-mock-practice#strategies`,
            },
            {
              '@type': 'HowToStep',
              position: 7,
              name: 'Seek Brutal Mock Interviewers',
              text: 'Find mock interviewers who maintain blank faces, ask impossible questions, interrupt you mid-answer, and express skepticism. Practice under adversity builds resilience that comfortable practice never achieves.',
              url: `${siteMetadata.siteUrl}/blog/why-freeze-interviews-after-mock-practice#strategies`,
            },
            {
              '@type': 'HowToStep',
              position: 8,
              name: 'Add Real Consequences to Practice',
              text: 'Create authentic stakes: bet $20 on your performance, record and publicly share mock interviews, or apply to practice jobs you don\'t care about. Real consequences activate your stress response during practice.',
              url: `${siteMetadata.siteUrl}/blog/why-freeze-interviews-after-mock-practice#strategies`,
            },
            {
              '@type': 'HowToStep',
              position: 9,
              name: 'Implement the Interview Resilience Framework',
              text: 'Follow the 6-week plan: Foundation (Weeks 1-2), Stress Exposure (Weeks 3-4), Inoculation (Weeks 5-6), Live Practice (Ongoing). Measure success by stress recovery time, not perfect answers.',
              url: `${siteMetadata.siteUrl}/blog/why-freeze-interviews-after-mock-practice#framework`,
            },
            {
              '@type': 'HowToStep',
              position: 10,
              name: 'Combine AI and Human Practice',
              text: 'Use AI tools for unlimited content practice and volume, brutal human mock interviews for stress inoculation, and real interviews at companies you don\'t care about for authentic stakes exposure.',
              url: `${siteMetadata.siteUrl}/blog/why-freeze-interviews-after-mock-practice#coaching-limits`,
            },
          ],
        }
      : null

  return (
    <div className="min-h-screen bg-matte-black">
      <LandingHeader />

      {/* Generic Article Schema for ALL blog posts - Google SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(genericArticleSchema),
        }}
      />

      {/* BreadcrumbList Schema for navigation - Google SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* FAQ Schema for PM Interview Guide */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}

      {/* Article Schema for ATS Resume Checker */}
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleSchema),
          }}
        />
      )}

      {/* FAQ Schema for Job Search Guide */}
      {jobSearchFaqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jobSearchFaqSchema),
          }}
        />
      )}

      {/* HowTo Schema for Job Search Guide 2025 - Google SEO */}
      {howToSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(howToSchema),
          }}
        />
      )}

      {/* FAQ Schema for Communication Skills Blog - Google SEO */}
      {communicationFaqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(communicationFaqSchema),
          }}
        />
      )}

      {/* HowTo Schema for Communication Skills Blog - Google SEO */}
      {communicationHowToSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(communicationHowToSchema),
          }}
        />
      )}

      {/* FAQ Schema for Interview Freeze Blog - Google SEO */}
      {interviewFreezeFaqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(interviewFreezeFaqSchema),
          }}
        />
      )}

      {/* FAQ Schema for Blanked on Tell Me About Yourself Blog - Google SEO */}
      {tellMeAboutYourselfFaqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(tellMeAboutYourselfFaqSchema),
          }}
        />
      )}

      {/* HowTo Schema for Interview Freeze Blog - Google SEO */}
      {interviewFreezeHowToSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(interviewFreezeHowToSchema),
          }}
        />
      )}

      <ScrollTopAndComment />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="lg:flex lg:gap-8">
          {/* Main Content */}
          <main className="flex-1 lg:max-w-4xl">
            {/* Semantic HTML5 article element for better SEO */}
            <article className="rounded-lg border border-matte-gray bg-matte-black p-8" itemScope itemType="https://schema.org/Article">
              {/* Article Header */}
              <header className="mb-8 border-b border-matte-gray pb-8">
            <div className="space-y-4 text-center">
              <div>
                <time dateTime={date} className="text-sm font-medium text-accent-400" itemProp="datePublished">
                  {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                </time>
              </div>
              <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl" itemProp="headline">{title}</h1>
              <div className="flex flex-wrap justify-center gap-2">
                {tags?.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-matte-gray px-3 py-1 text-xs font-medium text-gray-300 transition-colors hover:bg-accent-600 hover:text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </header>

          {/* Social Sharing Buttons */}
          <SocialShareButtons title={title} url={`${siteMetadata.siteUrl}/${path}`} />

          {/* Article Content - Semantic HTML5 section */}
          <section className="prose prose-invert max-w-none pb-8" itemProp="articleBody">{children}</section>

          {/* Article Footer */}
          <footer className="border-t border-matte-gray pt-8">
            {/* Enhanced Author Info for E-E-A-T (Experience, Expertise, Authority, Trust) - Google SEO */}
            <aside className="mb-8 rounded-lg bg-matte-gray/30 p-6">
              <h3 className="mb-4 text-lg font-semibold text-white">About the Author</h3>
              <div className="flex flex-wrap gap-6">
                {authorDetails.map((author) => (
                  <div key={author.name} className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
                    {author.avatar && (
                      <Image
                        src={author.avatar}
                        width={64}
                        height={64}
                        alt={`${author.name} - Career Expert`}
                        className="h-16 w-16 rounded-full"
                      />
                    )}
                    <div className="flex-1">
                      <div className="mb-2 font-semibold text-white" itemProp="author" itemScope itemType="https://schema.org/Person">
                        <span itemProp="name">{author.name}</span>
                      </div>
                      {author.occupation && (
                        <div className="mb-2 text-sm text-gray-300">{author.occupation}</div>
                      )}
                      <p className="mb-3 text-sm leading-relaxed text-gray-300">
                        {author.name} is an AI & Career Tools Developer specializing in resume optimization, 
                        ATS systems, and interview preparation. Creator of Auto Interview AI, helping thousands 
                        of job seekers land their dream jobs through AI-powered career tools and expert guidance.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {author.twitter && (
                          <Link
                            href={author.twitter}
                            className="text-sm text-accent-400 hover:text-accent-300"
                            rel="author"
                          >
                            Follow on X
                          </Link>
                        )}
                        {author.linkedin && (
                          <Link
                            href={author.linkedin}
                            className="text-sm text-accent-400 hover:text-accent-300"
                            rel="author"
                          >
                            LinkedIn
                          </Link>
                        )}
                        <Link
                          href="/about"
                          className="text-sm text-accent-400 hover:text-accent-300"
                        >
                          More Articles
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </aside>

            {/* Trust Signals for E-E-A-T */}
            <div className="mb-8 rounded-lg border border-matte-gray/50 bg-matte-black p-6">
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">
                Why Trust Auto Interview AI?
              </h4>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="text-sm">
                  <div className="mb-1 font-medium text-white">✓ Expert-Verified Content</div>
                  <div className="text-gray-400">Written by career professionals with real-world experience</div>
                </div>
                <div className="text-sm">
                  <div className="mb-1 font-medium text-white">✓ Data-Driven Insights</div>
                  <div className="text-gray-400">Based on industry research and proven strategies</div>
                </div>
                <div className="text-sm">
                  <div className="mb-1 font-medium text-white">✓ Regularly Updated</div>
                  <div className="text-gray-400">Content reviewed and updated for 2025 job market</div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            {(next || prev) && (
              <div className="mb-8 grid gap-4 sm:grid-cols-2">
                {prev && prev.path && (
                  <div className="rounded-lg border border-matte-gray p-4">
                    <h4 className="text-sm font-medium text-gray-400">Previous Article</h4>
                    <Link
                      href={`/${prev.path}`}
                      className="text-white transition-colors hover:text-accent-400"
                    >
                      {prev.title}
                    </Link>
                  </div>
                )}
                {next && next.path && (
                  <div className="rounded-lg border border-matte-gray p-4">
                    <h4 className="text-sm font-medium text-gray-400">Next Article</h4>
                    <Link
                      href={`/${next.path}`}
                      className="text-white transition-colors hover:text-accent-400"
                    >
                      {next.title}
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Back to Blog */}
            <div className="flex justify-center">
              <Link
                href={`/${basePath}`}
                className="inline-flex items-center rounded-lg bg-matte-gray px-6 py-3 text-white transition-colors hover:bg-accent-600"
                aria-label="Back to the blog"
              >
                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Blog
              </Link>
            </div>

            {/* Comments */}
            {siteMetadata.comments && (
              <div className="mt-8 border-t border-matte-gray pt-8" id="comment">
                <h3 className="mb-4 text-lg font-semibold text-white">Comments</h3>
                <Comments slug={slug} />
              </div>
            )}
          </footer>
        </article>
      </main>

      {/* Sidebar with Table of Contents - Google SEO: Internal linking and better UX */}
      <aside className="hidden lg:block lg:w-80">
        <TableOfContents />
      </aside>
    </div>
  </div>

      <Footer />
    </div>
  )
}
