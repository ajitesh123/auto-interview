// Fictional headlines for the checker, the worked example and the examples table.
// Every person, college and company here is invented.
import type { Input, Parts, Stage } from './engine'

export interface Pair {
  id: string
  stage: Stage
  who: string
  target: string
  keywords: string
  weak: string
  strong: string
}

export const PAIRS: Pair[] = [
  {
    id: 'cs-fresher',
    stage: 'student',
    who: 'Final-year B.Tech (CSE) student, applying for software developer roles',
    target: 'Software Developer',
    keywords: 'Java, Spring Boot, SQL, REST APIs',
    weak: 'Student at Sahyadri Institute of Technology',
    strong:
      'Aspiring Software Developer | Final-year B.Tech CSE | Java · Spring Boot · SQL | Built a canteen pre-order app used by 600 students',
  },
  {
    id: 'commerce-fresher',
    stage: 'student',
    who: 'B.Com graduate, applying for financial analyst roles',
    target: 'Financial Analyst',
    keywords: 'Excel, financial modelling, Tally, GST',
    weak: 'Passionate and motivated B.Com graduate seeking new opportunities',
    strong:
      'B.Com Graduate | Aspiring Financial Analyst | Excel · Tally · GST | Reconciled 1,200 vendor invoices in a 3-month internship',
  },
  {
    id: 'pm',
    stage: 'experienced',
    who: 'Product manager with 5 years in payments',
    target: 'Product Manager',
    keywords: 'payments, UPI, checkout, experimentation',
    weak: 'Product Manager at Fintech Company',
    strong:
      'Product Manager, Payments | UPI and card checkout | Cut payment failures 18% across 2M monthly transactions',
  },
  {
    id: 'switcher',
    stage: 'switcher',
    who: 'School teacher moving into instructional design',
    target: 'Instructional Designer',
    keywords: 'Articulate Storyline, ADDIE, LMS, e-learning',
    weak: 'Teacher | Educator | Lifelong Learner | Dreamer | Creative Thinker | Passionate About Education',
    strong:
      'Instructional Designer (ex-teacher) | Articulate Storyline · ADDIE · LMS | Built 14 e-learning modules for 900 learners',
  },
  {
    id: 'between',
    stage: 'between',
    who: 'Data analyst between jobs after a layoff',
    target: 'Data Analyst',
    keywords: 'SQL, Power BI, Python, dashboards',
    weak: 'Open to Work | Actively seeking opportunities | Unemployed',
    strong:
      'Data Analyst | SQL · Power BI · Python | Dashboards that saved a retail ops team 10 hours a week | Open to Bengaluru roles',
  },
]

export const toInput = (p: Pair, which: 'weak' | 'strong'): Input => ({
  headline: p[which],
  target: p.target,
  keywords: p.keywords,
  stage: p.stage,
})

/** Preset for "Build from parts". */
export const PARTS_SAMPLE: Parts = {
  now: 'Final-year B.Tech CSE',
  target: 'Software Developer',
  skills: 'Java, Spring Boot, SQL',
  proof: 'Built a canteen pre-order app used by 600 students',
  audience: '',
  stage: 'student',
}

/** Copy-ready fresher templates by degree (fictional details; swap in your own). */
export interface Template {
  degree: string
  target: string
  keywords: string
  headline: string
}

export const FRESHER: Template[] = [
  {
    degree: 'B.Tech / B.E. CSE',
    target: 'Software Developer',
    keywords: 'Java, Spring Boot, SQL',
    headline:
      'Aspiring Software Developer | B.Tech CSE ’26 | Java · Spring Boot · SQL | Built a library app used by 300 students',
  },
  {
    degree: 'B.Tech CSE (data)',
    target: 'Data Analyst',
    keywords: 'SQL, Python, Power BI',
    headline:
      'Aspiring Data Analyst | B.Tech CSE | SQL · Python · Power BI | Analysed 50,000 rows of sales data in an internship',
  },
  {
    degree: 'B.Tech ECE',
    target: 'Embedded Engineer',
    keywords: 'Embedded C, Arduino, PCB design',
    headline:
      'Aspiring Embedded Engineer | B.Tech ECE | Embedded C · Arduino · PCB design | Built a soil-moisture sensor for 12 farms',
  },
  {
    degree: 'B.E. Mechanical',
    target: 'Design Engineer',
    keywords: 'SolidWorks, AutoCAD, GD&T',
    headline:
      'Aspiring Design Engineer | B.E. Mechanical | SolidWorks · AutoCAD · GD&T | Cut fixture weight 15% in final-year project',
  },
  {
    degree: 'BCA / MCA',
    target: 'Web Developer',
    keywords: 'React, JavaScript, Node.js',
    headline:
      'Aspiring Web Developer | MCA | React · JavaScript · Node.js | Shipped 3 websites for local businesses',
  },
  {
    degree: 'B.Com',
    target: 'Accounts Executive',
    keywords: 'Tally, GST, Excel',
    headline:
      'Aspiring Accounts Executive | B.Com | Tally · GST · Excel | Filed GST returns for 20 clients during internship',
  },
  {
    degree: 'CA Inter / articleship',
    target: 'Audit Associate',
    keywords: 'statutory audit, Ind AS, Excel',
    headline:
      'Audit Associate (CA Inter, articleship) | Statutory audit · Ind AS · Excel | Audited 9 manufacturing clients',
  },
  {
    degree: 'BBA',
    target: 'Business Analyst',
    keywords: 'Excel, SQL, market research',
    headline:
      'Aspiring Business Analyst | BBA | Excel · SQL · market research | Survey of 400 shoppers for a retail project',
  },
  {
    degree: 'MBA Marketing',
    target: 'Brand Manager',
    keywords: 'brand strategy, consumer insights, GA4',
    headline:
      'Aspiring Brand Manager | MBA Marketing ’26 | Consumer insights · GA4 | Summer intern: grew a D2C page’s reach 3x',
  },
  {
    degree: 'MBA Finance',
    target: 'Financial Analyst',
    keywords: 'financial modelling, valuation, Excel',
    headline:
      'Aspiring Financial Analyst | MBA Finance | Financial modelling · valuation · Excel | Built a DCF for a 200 Cr listed firm',
  },
  {
    degree: 'MBA HR',
    target: 'HR Generalist',
    keywords: 'recruitment, onboarding, HRMS',
    headline:
      'Aspiring HR Generalist | MBA HR | Recruitment · onboarding · HRMS | Screened 150 candidates in a summer internship',
  },
  {
    degree: 'B.Des / design',
    target: 'UI/UX Designer',
    keywords: 'Figma, user research, prototyping',
    headline:
      'Aspiring UI/UX Designer | B.Des | Figma · user research · prototyping | Redesigned a college app used by 2,000 students',
  },
  {
    degree: 'B.Pharm',
    target: 'Regulatory Affairs Associate',
    keywords: 'regulatory documentation, CTD, GMP',
    headline:
      'Aspiring Regulatory Affairs Associate | B.Pharm | CTD · GMP · documentation | Compiled 6 dossiers in a 2-month internship',
  },
  {
    degree: 'B.Sc Nursing',
    target: 'Staff Nurse',
    keywords: 'patient care, ICU, BLS',
    headline: 'Staff Nurse (B.Sc Nursing, registered) | ICU · BLS certified | 1,000 clinical hours',
  },
  {
    degree: 'BA English / mass comm',
    target: 'Content Writer',
    keywords: 'SEO, copywriting, WordPress',
    headline:
      'Aspiring Content Writer | BA English | SEO · copywriting · WordPress | 40 published articles, 25,000 reads',
  },
  {
    degree: 'Any degree, sales',
    target: 'Sales Development Representative',
    keywords: 'cold calling, CRM, prospecting',
    headline:
      'Aspiring Sales Development Representative | BBA | Cold calling · CRM · prospecting | Sold 120 fest passes in a week',
  },
]
