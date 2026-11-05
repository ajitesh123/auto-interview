// Free interview-prep library. Every external link was opened and checked on CHECKED_ON.
// Rule: link to the original publisher; never re-host third-party PDFs or casebooks on our domain.

import { AI_TOOLKIT } from './aiToolkit'

export const CHECKED_ON = '2026-11-04'

export type ResourceFormat =
  | 'PDF'
  | 'Word / Google Docs'
  | 'Web guide'
  | 'Video course'
  | 'Book'
  | 'Tool'
  | 'Practice cases'

export interface FreeResource {
  title: string
  url: string
  publisher: string
  format: ResourceFormat
  why: string
  /** Published by the employer, school or author themselves */
  official?: boolean
}

export interface ResourceSection {
  id: string
  title: string
  intro: string
  items: FreeResource[]
  /** Our own pages that go deeper on this track */
  ours?: { label: string; href: string }[]
}

export const FREE_RESOURCE_SECTIONS: ResourceSection[] = [
  {
    id: 'resume',
    title: 'Resume templates and real examples',
    intro:
      'Recruiters spend about 7.4 seconds on a first look, and simple one-column layouts hold attention best (Ladders eye-tracking study). Start from a clean template, then write each bullet as "Accomplished X, as measured by Y, by doing Z".',
    items: [
      {
        title: 'Harvard bullet-point resume template',
        url: 'https://careerservices.fas.harvard.edu/resources/bullet-point-resume-template/',
        publisher: 'Harvard Mignone Center for Career Success',
        format: 'Word / Google Docs',
        why: 'The classic one-page layout, as Word, accessible Word or a Google Docs copy.',
        official: true,
      },
      {
        title: 'Harvard resume example: tech',
        url: 'https://careerservices.fas.harvard.edu/resources/harvard-college-resume-example-tech/',
        publisher: 'Harvard Mignone Center for Career Success',
        format: 'PDF',
        why: 'A finished student resume for software and tech roles, to copy the structure from.',
        official: true,
      },
      {
        title: 'Harvard resume example: engineering',
        url: 'https://careerservices.fas.harvard.edu/resources/harvard-college-resume-example-engineering/',
        publisher: 'Harvard Mignone Center for Career Success',
        format: 'PDF',
        why: 'A finished engineering resume showing projects and technical skills.',
        official: true,
      },
      {
        title: 'Harvard College guide to resumes and cover letters',
        url: 'https://careerservices.fas.harvard.edu/resources/harvard-college-guide-to-resumes-cover-letters/',
        publisher: 'Harvard Mignone Center for Career Success',
        format: 'Web guide',
        why: 'What a resume should do, with links to every Harvard template and example.',
        official: true,
      },
      {
        title: 'Why recruiters spend 7.4 seconds on a resume',
        url: 'https://www.hrdive.com/news/recruiters-spend-74-seconds-looking-at-your-resume/541582/',
        publisher: 'HR Dive (on the Ladders 2018 eye-tracking study)',
        format: 'Web guide',
        why: 'Which layouts held recruiter attention and which ones lost it.',
      },
      {
        title: "Laszlo Bock's X-Y-Z bullet formula",
        url: 'https://www.businessinsider.in/google-hr-boss-says-this-is-the-key-to-a-perfect-resume/articleshow/43924179.cms',
        publisher: 'Business Insider',
        format: 'Web guide',
        why: "Google's former people chief on writing bullets that show measured results.",
      },
      {
        title: 'Skills employers want on a student resume (2026)',
        url: 'https://naceweb.org/about-us/press/2026/the-high-impact-skills-college-students-should-showcase-on-their-resumes',
        publisher: 'NACE',
        format: 'Web guide',
        why: 'Employers especially want teamwork, problem-solving and communication, and favour internships.',
        official: true,
      },
    ],
    ours: [
      { label: 'Build your resume (free)', href: '/build-resume' },
      { label: 'Role-based resume templates', href: '/cv-templates' },
    ],
  },
  {
    id: 'consulting',
    title: 'Consulting: cases, frameworks and mental math',
    intro:
      'Consulting interviews test structure (issue trees), math under pressure and a clear recommendation. Start with the firms’ own practice cases. They show exactly how each firm runs a case.',
    items: [
      {
        title: 'McKinsey: interview prep and 5 practice cases',
        url: 'https://www.mckinsey.com/careers/interviewing/en',
        publisher: 'McKinsey & Company',
        format: 'Practice cases',
        why: 'Beautify, Diconsa, Electro-Light, Talbot Trucks and an education case, plus Solve and PEI advice.',
        official: true,
      },
      {
        title: 'Bain: case interview preparation',
        url: 'https://bain.com/careers/hiring-process/case-interview',
        publisher: 'Bain & Company',
        format: 'Practice cases',
        why: 'Two Bain-written cases (Coffee Shop Co. and FashionCo) with interview tips.',
        official: true,
      },
      {
        title: '26 MBA consulting casebooks (PDF)',
        url: 'https://hackingthecaseinterview.com/pages/mba-consulting-casebooks',
        publisher: 'Hacking the Case Interview',
        format: 'PDF',
        why: 'Wharton, Booth, Kellogg, INSEAD, Columbia and more, collected on one page.',
      },
      {
        title: 'BCG online case (Casey): format and question types',
        url: 'https://www.roadtooffer.com/blog/bcg-online-case-casey-guide',
        publisher: 'Road to Offer',
        format: 'Web guide',
        why: 'The 35-minute chatbot case: question types, timing and the recorded recommendation.',
      },
      {
        title: 'McKinsey Solve: Redrock and Sea Wolf guide',
        url: 'https://www.roadtooffer.com/blog/mckinsey-solve-guide',
        publisher: 'Road to Offer',
        format: 'Web guide',
        why: 'What each game asks you to do, based on 2026 candidate reports.',
      },
    ],
  },
  {
    id: 'product',
    title: 'Product management and AI PM',
    intro:
      'PM loops test product sense, metrics, estimation, strategy and leadership. Learn how the loop runs at your target company first, then practise each round type out loud.',
    items: [
      {
        title: 'Google PM interview: every round explained',
        url: 'https://www.aced.io/guides/google-product-manager-interview',
        publisher: 'Aced (formerly Exponent)',
        format: 'Web guide',
        why: 'Recruiter screen, hiring manager screen, 3–5 onsite rounds and the hiring committee.',
      },
      {
        title: 'PM interview prep checklist: 6-week plan',
        url: '/downloads/pm-interview-checklist.md',
        publisher: 'Auto Interview AI',
        format: 'Tool',
        why: 'A week-by-week checklist covering frameworks, company research and mock interviews.',
      },
      {
        title: 'PM answer templates: STAR and CIRCLES',
        url: '/downloads/pm-interview-templates.md',
        publisher: 'Auto Interview AI',
        format: 'Tool',
        why: 'Fill-in templates for behavioural and product-design answers.',
      },
    ],
    ours: [{ label: 'AI Product Manager interview hub', href: '/aipm' }],
  },
  {
    id: 'software',
    title: 'Software engineering, FDE and AI engineering',
    intro:
      'Coding rounds reward pattern recognition, not volume. Work through one curated list properly, then add system design if you are mid-level or above.',
    items: [
      {
        title: 'Tech Interview Handbook',
        url: 'https://techinterviewhandbook.org/',
        publisher: 'Yangshun Tay (author of Blind 75)',
        format: 'Web guide',
        why: 'Free coding, behavioural, resume and system design prep in one place.',
        official: true,
      },
      {
        title: 'Grind 75: a study plan that fits your hours',
        url: 'https://techinterviewhandbook.org/grind75/about',
        publisher: 'Yangshun Tay',
        format: 'Tool',
        why: 'The updated Blind 75. Set your weeks and hours and get a prioritised question list.',
        official: true,
      },
      {
        title: 'NeetCode 150 video course',
        url: 'https://www.freecodecamp.org/news/prepare-for-technical-interviews-using-neetcode-150/',
        publisher: 'freeCodeCamp',
        format: 'Video course',
        why: 'Free video walkthroughs of the NeetCode 150 problems, grouped by pattern.',
      },
      {
        title: 'Where Blind 75 came from',
        url: 'https://educative.io/blog/where-did-blind-75-come-from',
        publisher: 'Educative',
        format: 'Web guide',
        why: 'Why the list works, and how it compares with NeetCode 150 and Grind 75.',
      },
      {
        title: 'Introduction to Machine Learning Interviews',
        url: 'https://huyenchip.com/ml-interviews-book/contents/0-about-the-author.html',
        publisher: 'Chip Huyen',
        format: 'Book',
        why: 'ML roles, the interview process and practice questions, readable online.',
        official: true,
      },
    ],
    ours: [
      { label: 'Forward Deployed Engineer hub', href: '/fde' },
      { label: 'AI Engineer hub', href: '/ai-engineer' },
      { label: 'GTM Engineer hub', href: '/gtm-engineer' },
    ],
  },
  {
    id: 'data',
    title: 'Data analyst, statistics and finance',
    intro:
      'Analyst loops lean on SQL, statistics, A/B tests and a take-home that often decides the offer. Finance interviews add valuation.',
    items: [
      {
        title: 'Data analyst interview guide',
        url: 'https://www.aced.io/blog/data-analyst-interview-guide',
        publisher: 'Aced (formerly Exponent)',
        format: 'Web guide',
        why: 'Each round, from the SQL screen to the 4–7 day take-home, with sample prompts.',
      },
      {
        title: 'OpenIntro Statistics (free PDF textbook)',
        url: 'https://openintro.org/book/os/',
        publisher: 'OpenIntro',
        format: 'PDF',
        why: 'A full statistics textbook, free as a PDF if you set the price to $0.',
        official: true,
      },
      {
        title: 'Damodaran Online: valuation classes, spreadsheets and data',
        url: 'https://pages.stern.nyu.edu/~adamodar/New_Home_Page/home.htm',
        publisher: 'Aswath Damodaran, NYU Stern',
        format: 'Video course',
        why: 'Free valuation and corporate finance classes, models and market data.',
        official: true,
      },
    ],
  },
  {
    id: 'behavioural',
    title: 'Behavioural interviews (every role)',
    intro:
      'Most companies score stories, not answers. Prepare 6–8 STAR stories with numbers and map each one to the principles the company hires for.',
    items: [
      {
        title: "Amazon's interview guide: STAR and the loop",
        url: 'https://www.aboutamazon.com/md/news/workplace/amazon-interview-guide',
        publisher: 'Amazon',
        format: 'Web guide',
        why: 'The five-step process, the Bar Raiser, and how to shape STAR answers.',
        official: true,
      },
      {
        title: "Amazon's 16 Leadership Principles, explained",
        url: 'https://www.aboutamazon.com/news/workplace/what-do-each-of-amazons-leadership-principles-really-mean',
        publisher: 'Amazon',
        format: 'Web guide',
        why: '"The framework of how we evaluate potential candidates", in Amazon’s own words.',
        official: true,
      },
    ],
    ours: [{ label: 'Practise answers in a free AI mock interview', href: '/free-mock-interview' }],
  },
  {
    id: 'campus',
    title: 'Campus placements in India',
    intro:
      'Most drives run aptitude, coding, group discussion, technical and HR rounds, often with a CGPA cut-off around 6–7.5. Mass recruiters such as TCS sort freshers into pay tracks by test score.',
    items: [
      {
        title: 'How campus placement works in India',
        url: 'https://www.placementpreparation.io/blog/campus-placement-process-in-india/',
        publisher: 'PlacementPreparation',
        format: 'Web guide',
        why: 'Every round from the pre-placement talk to the offer letter, and typical cut-offs.',
      },
      {
        title: 'TCS NQT test pattern',
        url: 'https://www.geeksforgeeks.org/tcs-nqt-national-qualifier-test-syllabus/amp/',
        publisher: 'GeeksforGeeks',
        format: 'Web guide',
        why: 'Foundation and Advanced sections, question counts and timing (2024 pattern).',
      },
      {
        title: 'TCS NQT 2026 salary: Ninja, Digital, Prime',
        url: 'https://prepinsta.com/tcs-nqt/placement-papers/salary/',
        publisher: 'PrepInsta',
        format: 'Web guide',
        why: 'Pay by track for UG and PG freshers. Third-party figures, confirm with TCS.',
      },
    ],
  },
  {
    id: 'ai-skills',
    title: 'AI skills for every role: LLMs, Claude, OpenAI and agents',
    intro:
      'Most interviews now include “How do you use AI?” Learn what an LLM is, practise with the free OpenAI and Anthropic courses, then build one small agent or automation you can show.',
    items: AI_TOOLKIT.map(({ title, url, publisher, format, why, official }) => ({
      title,
      url,
      publisher,
      format,
      why,
      official,
    })),
    ours: [
      { label: 'AI Engineer interview guide', href: '/ai-engineer' },
      { label: 'AI Product Manager interview guide', href: '/aipm' },
    ],
  },
]

export const FREE_RESOURCE_COUNT = FREE_RESOURCE_SECTIONS.reduce((n, s) => n + s.items.length, 0)
