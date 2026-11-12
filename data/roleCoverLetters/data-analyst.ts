import type { CoverLetterKit } from './types'

// Research: docs/briefs/2026-11-12-data-analyst-cover-letter.md (every page below opened 12 Nov 2026).
// Job posts: each term was checked on the post itself (yes/no), not from a summary.
// Samples: Ishita Rao, Kabir Menon, Neha Pillai and every company/college here are fictional.
// Ishita's facts match her sample resume in data/roleKits/data-analyst.ts.

const RG = 'https://resumego.net/research/cover-letters'
const RGEN = 'https://resumegenius.com/blog/cover-letter-help/cover-letter-statistics'
const YALE = 'https://arxiv.org/html/2509.25054v2'
const MIT = 'https://capd.mit.edu/resources/how-to-write-an-effective-cover-letter/'
const DC = 'https://www.datacamp.com/blog/data-analyst-cover-letter'
const JS = 'https://www.jobscan.co/cover-letter-examples/data-analyst'
const GH =
  'https://github.com/grnhse/greenhouse-api-docs/blob/4dab9c1b6465d0c4db795f275a21b2e428dd3643/source/includes/job-board/_applications.md'
const ISH = 'https://internshala.com/blog/your-guide-to-going-from-applied-to-hired-on-internshala/'

export const DATA_ANALYST_COVER_LETTER: CoverLetterKit = {
  slug: 'data-analyst',
  metaTitle: 'Data Analyst Cover Letter: 3 Samples + Word Template',
  metaDescription:
    'Data analyst cover letter (covering letter) guide: 3 samples, a before/after rewrite, {n} real job posts checked, a free Word template and a letter checker.',
  h1: 'Data analyst cover letter: samples, structure and a free Word template',
  directAnswer:
    'A good data analyst cover letter is 250–350 words in four short paragraphs, built around one analysis you did: the question, the data, the method, the decision it changed and the number that moved. None of the {n} live analyst posts we checked on {checked} required one, so write it when the form has a field, when you email a person, or when you are switching careers.',
  checked: '2026-11-12',
  evidence: [
    {
      value: '53%',
      label: 'higher callback rate for letters tailored to the job, against no letter',
      sub: 'ResumeGo field test, 7,287 fictitious applications, 2019–20. ResumeGo sells writing services.',
      href: RG,
    },
    {
      value: '83%',
      label: 'of 625 US hiring managers say they read most cover letters',
      sub: 'Resume Genius survey (year given as 2022). Self-reported.',
      href: RGEN,
    },
    {
      value: '51%',
      label:
        'drop in the link between letter–job match and callbacks after an AI writing tool launched',
      sub: 'Cui, Dias and Ye (Yale), arXiv paper, about 5M Freelancer.com cover letters, 2023',
      href: YALE,
    },
  ],
  jobPosts: [
    {
      company: 'Amazon',
      title: 'Data Analyst, WW Returns & Recommerce',
      location: 'Hyderabad',
      region: 'India',
      url: 'https://amazon.jobs/en/jobs/2913323/data-analyst-ww-returns-recommerce',
      coverLetter: 'none',
      coverLetterNote: 'Not mentioned on the post',
      terms: ['SQL', 'Tableau', 'stakeholder', 'dashboard'],
    },
    {
      company: 'P&G India',
      title: 'Data Analyst',
      location: 'Mumbai',
      region: 'India',
      url: 'https://pgcareers.com/eu/en/job/R000128262/Data-Analyst-P-G-India',
      coverLetter: 'none',
      coverLetterNote: 'Not mentioned on the post',
      terms: ['SQL', 'Power BI', 'stakeholder'],
    },
    {
      company: 'AKS Tech (via Internshala)',
      title: 'Data Analytics Associate, fresher',
      location: 'Remote (Noida)',
      region: 'India',
      url: 'https://internshala.com/job/detail/fresher-remote-data-analytics-associate-job-at-aks-tech1793861534',
      coverLetter: 'none',
      coverLetterNote: 'No cover letter field shown',
      terms: ['SQL', 'Excel', 'Power BI', 'Tableau', 'Python'],
    },
    {
      company: 'Skipto Ai (via Internshala)',
      title: 'Data Analyst, fresher',
      location: 'Remote (Mumbai)',
      region: 'India',
      url: 'https://internshala.com/job/detail/fresher-remote-data-analyst-job-at-skipto-ai-international-private-limited1792042502',
      coverLetter: 'none',
      coverLetterNote: 'No cover letter field shown',
      terms: ['SQL', 'Excel', 'Power BI', 'Tableau', 'Looker', 'stakeholder', 'statistics'],
    },
    {
      company: 'Future',
      title: 'Senior/Staff Data Analyst',
      location: 'Remote, US',
      region: 'US',
      url: 'https://job-boards.greenhouse.io/future/jobs/4683274005',
      coverLetter: 'optional',
      coverLetterNote: 'Greenhouse form: Cover Letter field, not marked required',
      terms: ['SQL', 'Python', 'dbt', 'experiments', 'stakeholder', 'dashboard'],
    },
    {
      company: 'MoonPay',
      title: 'Senior/Staff Data Analyst',
      location: 'London / New York, hybrid',
      region: 'UK',
      url: 'https://jobs.lever.co/moonpay/e42e3201-53dc-40a5-9d36-1fcdcc5c2d99/apply',
      coverLetter: 'none',
      coverLetterNote: 'Lever form: resume, LinkedIn and portfolio; no cover letter field',
      terms: ['SQL', 'dbt', 'Looker', 'experiments', 'stakeholder'],
    },
    {
      company: 'Planet',
      title: 'Data Analyst',
      location: 'Berlin',
      region: 'Europe',
      url: 'https://job-boards.greenhouse.io/planetlabs/jobs/8103527',
      coverLetter: 'optional',
      coverLetterNote: 'Greenhouse form: Cover Letter field, not marked required',
      terms: ['SQL', 'dbt', 'Looker', 'stakeholder', 'statistics', 'dashboard'],
    },
  ],
  decision: [
    {
      situation: 'The post says a cover letter is required',
      doThis:
        'Write the full letter for this job. Mirror the title and two or three tools exactly.',
      length: '250–350 words',
      effort: 'High',
    },
    {
      situation: 'The form has an optional cover letter field (Greenhouse, Workday)',
      doThis:
        'Write one if you are a strong fit and have a number to show; paste plain text if a text box is offered.',
      length: '250–350 words',
      effort: 'High',
    },
    {
      situation: 'You are switching careers, returning after a gap, or moving city',
      doThis: 'Write one. It is the only place to explain the move in your own words.',
      length: '250–350 words',
      effort: 'High',
    },
    {
      situation: 'You are emailing a hiring manager, recruiter or referrer',
      doThis: 'Put a short note in the email body and attach the resume. No separate letter file.',
      length: '60–120 words',
      effort: 'Medium',
    },
    {
      situation: 'Internshala asks why you should be hired',
      doThis:
        'Answer it as a mini letter: one project with a number, one reason for this company, your start date.',
      length: '80–150 words',
      effort: 'Medium',
    },
    {
      situation: 'Easy Apply, Naukri or a form with no field',
      doThis:
        'Skip the letter. Spend the time on the resume and a 2–4 line message to the poster if you can find them.',
      length: '0 (or a 2–4 line message)',
      effort: 'Low',
    },
  ],
  lengthGuides: [
    { label: 'Jobscan', sub: '"about 250 to 350 words", Jul 2026', min: 250, max: 350, href: JS },
    {
      label: 'DataCamp',
      sub: '"aim for 300 to 400 words", Sep 2024',
      min: 300,
      max: 400,
      href: DC,
    },
    {
      label: 'Hiring managers’ average',
      sub: 'average preferred length 400 words, Resume Genius 2022',
      min: 400,
      max: 400,
      href: RGEN,
    },
  ],
  structure: [
    {
      title: 'Why you are writing',
      body: 'The exact job title, the team, and the one result you are proudest of. Two or three sentences.',
    },
    {
      title: 'One analysis story',
      body: 'Question, data, method, decision, number. The longest paragraph and the reason the letter exists.',
    },
    {
      title: 'Their words, your proof',
      body: 'Two or three tools or duties from the post, each with one line of proof. Not a list of skills.',
    },
    {
      title: 'Why this team, and a close',
      body: 'One specific thing you noticed about their product or data, then ask for a short call.',
    },
  ],
  story: [
    {
      title: 'Question',
      body: 'What did the business need to know? "Why did repeat orders fall 9%?"',
    },
    {
      title: 'Data',
      body: 'What you pulled and how big it was: 2.1M order rows plus delivery times.',
    },
    {
      title: 'Method',
      body: 'The analysis in plain words: SQL cohorts of repeat rate by wait time.',
    },
    {
      title: 'Decision',
      body: 'What someone did because of it: a delay coupon in three cities. No job yet? The recommendation you would make.',
    },
    {
      title: 'Number',
      body: 'What moved and how fast: repeat rate back to its old level in four weeks.',
    },
  ],
  metricFinder: [
    {
      kind: 'Scale',
      ask: 'How many rows, orders, users or regions did the work touch? How many people use the output?',
      example: '2.1M order rows; 40 regional managers use the dashboard',
      noJob: 'Rows in the dataset, rows you cleaned or dropped',
    },
    {
      kind: 'Time',
      ask: 'How long did the task take before your change, and after?',
      example: 'Weekly reporting went from 6 hours to 30 minutes',
      noJob: 'How long a manual version would take vs your query or dashboard',
    },
    {
      kind: 'Change',
      ask: 'Which metric moved after the decision, by how much, in how long?',
      example: 'Repeat rate back to its old level within 4 weeks',
      noJob: 'The size of the gap you found, e.g. 11 points between two groups',
    },
    {
      kind: 'Money',
      ask: 'Did the analysis find, save or protect money? Use the figure finance would agree with.',
      example: '₹14L of duplicate vendor payments found',
      noJob: 'Usually none. Leave it out rather than invent one',
    },
    {
      kind: 'Decision',
      ask: 'What did a manager do differently because of your numbers?',
      example: 'Ops launched a delay coupon in three cities',
      noJob: 'The recommendation you would make, or the test you would run next',
    },
  ],
  rewrite: {
    weak: {
      id: 'weak',
      level: 'Before',
      who: 'Ishita Rao (sample)',
      context: 'The first draft most people send',
      greeting: 'Dear Sir/Madam,',
      paragraphs: [
        {
          role: 'Opening',
          text: 'I am writing to express my interest in the Data Analyst position at your esteemed organisation. I am a passionate and detail-oriented professional with 3 years of experience in data analysis.',
        },
        {
          role: 'Skills',
          text: 'I am proficient in SQL, Python, Excel, Power BI and Tableau. I have worked on many dashboards and reports and have strong analytical and problem-solving skills. I am a quick learner and a team player.',
        },
        {
          role: 'Fit',
          text: 'I believe my skills make me a perfect fit for this role and I am confident I can add value to your company.',
        },
        {
          role: 'Close',
          text: 'Thank you for considering my application. I look forward to hearing from you.',
        },
      ],
      signoff: 'Yours faithfully,\nIshita Rao',
    },
    moves: [
      {
        label: 'Greeting',
        weak: '"Dear Sir/Madam" and "your esteemed organisation"',
        strong: 'The hiring manager by name and the team by name',
      },
      {
        label: 'Opening',
        weak: '"I am writing to express my interest", then adjectives about yourself',
        strong: 'The exact job title and the one result you are proudest of',
      },
      {
        label: 'Proof',
        weak: '"Many dashboards and reports"',
        strong: 'One analysis told as question, data, method, decision, number',
      },
      {
        label: 'Tools',
        weak: 'Five tools in a row, none tied to anything',
        strong: 'Three tools the post names, each with one line of what you did with it',
      },
      {
        label: 'Why them',
        weak: '"Add value to your company"',
        strong: 'One thing you noticed about their data and what you would look at first',
      },
      {
        label: 'Close',
        weak: '"I look forward to hearing from you"',
        strong: 'Ask for a 20-minute call and point to a link they can open',
      },
    ],
  },
  samples: [
    {
      id: 'experienced',
      level: '2–5 years',
      who: 'Ishita Rao (sample)',
      context:
        'Data Analyst, customer returns team, Northwind Retail (fictional). Applied through a Greenhouse form.',
      greeting: 'Dear Priya Nair,',
      paragraphs: [
        {
          role: 'Why you are writing',
          text: 'I am applying for the Data Analyst role on the customer returns team at Northwind Retail. For three years I have owned the weekly business numbers for 40 regional managers at Kirana Cart, and the work I am proudest of is finding out why customers stopped coming back.',
        },
        {
          role: 'One analysis story',
          text: 'Early this year repeat orders fell 9% in a quarter, and the first guess was pricing. I joined 2.1M order rows to delivery times in SQL and built monthly cohorts by wait time. Customers whose order took more than 45 minutes came back far less often, and most of the drop sat in three cities. I took one chart to the operations head with one recommendation: a delay coupon for late orders in those cities. It went live in two weeks, and the repeat rate was back to its old level within four weeks.',
        },
        {
          role: 'Their words, your proof',
          text: 'Your post asks for SQL, Power BI and work with non-technical teams. I write SQL with window functions every day, I replaced a 6-hour weekly Excel pack with a Power BI dashboard the managers now open themselves, and I set up row-level security so each region sees only its own numbers. I also read out a two-week checkout A/B test with 52,000 users per arm: conversion rose 1.8 points with no change in refunds, so it shipped to everyone.',
        },
        {
          role: 'Why this team, and a close',
          text: 'Returns interest me because they are where a delivery or quality problem shows up in the data first. I would like to start by looking at how return reasons change with delivery time and category. Could we find 20 minutes next week? My dashboard samples are at github.com/example.',
        },
      ],
      signoff: 'Regards,\nIshita Rao',
    },
    {
      id: 'fresher',
      level: 'Fresher',
      who: 'Kabir Menon (sample)',
      context: 'Junior Data Analyst, Lotus Fintech (fictional). Off-campus application by email.',
      greeting: 'Dear Ms Fernandes,',
      paragraphs: [
        {
          role: 'Why you are writing',
          text: 'I am a final-year B.Sc. Statistics student at Westbay College applying for the Junior Data Analyst role at Lotus Fintech. I have not held an analyst job yet, so this letter is about one project that shows how I work.',
        },
        {
          role: 'One analysis story',
          text: 'I wanted to know whether late deliveries cost a food platform its repeat customers. I took a public dataset of 1.2M delivery orders, dropped 38,000 rows with missing timestamps in pandas, and wrote SQL cohorts of repeat orders by delivery time. Customers whose first order arrived more than 45 minutes late were 11 points less likely to order again within 30 days. The queries are on GitHub and the dashboard is on Tableau Public, with a one-page note on what I would test next. Before trusting the result, I checked that it still held with the two largest cities removed.',
        },
        {
          role: 'Their words, your proof',
          text: 'Your post asks for SQL, Excel and explaining numbers to business teams. Beyond the project, I have solved 60 timed SQL questions on joins and window functions, and I run a weekend SQL clinic for 25 juniors, which is where I learnt to explain a query to someone who has never written one.',
        },
        {
          role: 'Why this team, and a close',
          text: 'I use your app to split bills with friends, and I noticed [one specific thing about the product]. I would like to learn how payment reminders change on-time repayment, which is the same kind of cohort question as my project. I can join from [month], and I would be glad to do a take-home task if that helps you decide.',
        },
      ],
      signoff: 'Thank you,\nKabir Menon\n[phone] · [email] · github.com/example',
    },
    {
      id: 'switcher',
      level: 'Career switcher',
      who: 'Neha Pillai (sample)',
      context:
        'Data Analyst, operations analytics, Meridian Health (fictional). Moving from logistics operations.',
      greeting: 'Dear Arjun Shah,',
      paragraphs: [
        {
          role: 'Why you are writing',
          text: 'I am applying for the Data Analyst role in operations analytics at Meridian Health. I have spent four years in logistics operations at Harbour Freight, and for the last two most of my week has been analysis, without the title. I am switching because that analysis is the part of the job I look forward to.',
        },
        {
          role: 'One analysis story',
          text: 'Our on-time delivery rate was stuck at 86% and nobody agreed why. I pulled 14 months of shipment records, about 210,000 rows, into Excel with Power Query, and moved to SQL when Excel slowed down. Splitting late shipments by route and loading time showed that 41% of delays came from trucks loaded after 6 pm. I ruled out weather and driver shortages first, because those were the popular explanations. Two routes moved to a morning slot, on-time delivery reached 91% in a quarter, and the weekly tracker I built is still the one the regional team uses.',
        },
        {
          role: 'Their words, your proof',
          text: 'To make the switch real, I completed [course or certificate] and rebuilt that tracker in Power BI. Your post asks for SQL, Power BI and working with stakeholders; the stakeholder part I have done every day, with drivers, warehouse leads and finance. I also wrote the SQL for a monthly waiting-time report that finance now uses to bill clients.',
        },
        {
          role: 'Why this team, and a close',
          text: 'Hospital operations has the questions I already work on: queues, slots and delays. Your post mentions outpatient waiting times; I would start by splitting waits by clinic, hour and appointment type, the way I split delays by route and loading time. Could we speak for 20 minutes next week?',
        },
      ],
      signoff: 'Regards,\nNeha Pillai',
    },
  ],
  emailNote: {
    subject: 'Data Analyst, returns team: SQL cohort work on repeat orders',
    body: 'Hi Priya,\n\nI applied for the Data Analyst role on your returns team today. One line on why: at Kirana Cart I traced a 9% fall in repeat orders to delivery delays using SQL cohorts on 2.1M orders, and the fix brought the repeat rate back in four weeks.\n\nMy resume is attached and the dashboard is at github.com/example. Would a 15-minute call this week be useful?\n\nIshita Rao',
  },
  portalAnswer: {
    question: 'Why should you be hired for this role?',
    body: 'I can already do the core of this job: pull data with SQL, clean it in Excel or pandas, and turn it into a Power BI dashboard someone uses. In my final-year project I analysed 1.2M public delivery orders and found that customers whose first order arrived 45+ minutes late were 11 points less likely to order again; the queries and dashboard are on GitHub [link]. I want to work at [company] because [one specific reason from their product]. I can start on [date].',
    src: { label: 'Internshala: what the employer wants from this answer', url: ISH },
  },
  portals: [
    {
      name: 'Greenhouse',
      whatWeFound:
        'Accepts a cover letter as a file or as pasted plain text. {optional} of our {n} posts (Future, Planet) used Greenhouse with an optional Cover Letter field.',
      doThis:
        'Paste plain text when a text box is offered. Otherwise upload a PDF or .docx named Firstname-Lastname-Cover-Letter.',
      src: { label: 'Greenhouse Job Board API docs', url: GH },
    },
    {
      name: 'Lever',
      whatWeFound:
        'The MoonPay form asked for a resume, LinkedIn and a portfolio link, and had no cover letter field.',
      doThis:
        'Put your strongest analysis link in the portfolio field. That link does the letter’s job.',
      src: {
        label: 'MoonPay application form',
        url: 'https://jobs.lever.co/moonpay/e42e3201-53dc-40a5-9d36-1fcdcc5c2d99/apply',
      },
    },
    {
      name: 'Internshala',
      whatWeFound:
        'Applications ask why you should be hired; Internshala says the employer wants to know why you want this company and role, and why you fit.',
      doThis: 'Write the 80–150 word answer below. Do not paste the same answer to every post.',
      src: { label: 'Internshala blog, updated 9 Jan 2024', url: ISH },
    },
    {
      name: 'Naukri, LinkedIn Easy Apply',
      whatWeFound:
        'We did not find a cover letter field in Naukri’s profile guidance, and LinkedIn’s help pages were not reachable to check.',
      doThis:
        'Assume no letter will be read. Make the profile summary carry your best result, and message the recruiter or poster with the 2–4 line version.',
    },
  ],
  india: [
    {
      title: 'Covering letter = cover letter',
      body: 'Indian posts and placement cells often say “covering letter”. It is the same document; use the format on this page.',
    },
    {
      title: 'Drop the old formulas',
      body: '“Respected Sir/Madam”, “your esteemed organisation” and “Yours faithfully” read as copied. Find a name on the post, LinkedIn or the company page; if there is none, use “Dear Hiring Manager”.',
    },
    {
      title: 'CTC and notice period',
      body: 'Leave CTC out of the letter unless the post asks for expected salary in it. If the post wants immediate joiners, state your notice period in one line.',
    },
    {
      title: 'Campus drives',
      body: 'Follow the placement cell’s format. If no letter is asked for, put the time into the one-page CV and your project links.',
    },
  ],
  ai: {
    finding:
      'When Freelancer.com added an AI writing tool for proposals in April 2023, access to it raised letter tailoring and callbacks a little. But the link between a well-matched letter and a callback fell by about half, and employers leaned more on work history. A polished letter now proves less; your own proof proves more.',
    quote:
      'Time spent editing AI-generated cover letter drafts is positively correlated with hiring success.',
    src: {
      label:
        'Cui, Dias and Ye, “Signaling in the Age of AI: Evidence from Cover Letters”, arXiv 2509.25054',
      url: YALE,
    },
    whatToDo: [
      'Use AI for structure and grammar, never for facts. Every number must be yours.',
      'Rewrite the analysis story in your own words; it is the part a generic draft cannot fake.',
      'Read it aloud. Cut any sentence you would not say to the hiring manager’s face.',
    ],
  },
  checkerTerms: [
    'SQL',
    'Excel',
    'Power BI',
    'Tableau',
    'Looker',
    'Python',
    'dbt',
    'BigQuery',
    'Snowflake',
    'A/B test',
    'experiment',
    'dashboard',
    'stakeholder',
    'statistics',
    'cohort',
    'forecast',
  ],
  mistakes: [
    {
      mistake: 'Repeating the resume as a paragraph',
      fix: 'Tell one story the resume only lists. MIT’s careers office: “Try not to simply repeat your resume in paragraph form.”',
    },
    {
      mistake: 'A list of tools with nothing done with them',
      fix: 'Tie each tool the post names to one line of what you did with it.',
    },
    {
      mistake: 'Numbers you cannot explain',
      fix: 'Use only numbers you could walk through in the interview. They will ask.',
    },
    {
      mistake: 'One letter sent to every company',
      fix: 'Change the opening, the tools paragraph and the “why this team” line every time. ResumeGo’s callback lift was for letters tailored to the job.',
    },
    {
      mistake: 'Tables, columns or graphics in the letter',
      fix: 'Plain text, one column. Jobscan: skills “in plain text rather than buried in graphics or tables”.',
    },
  ],
  sources: [
    {
      label: 'ResumeGo: Cover letters, just how important are they? (field test 2019–20)',
      url: RG,
    },
    { label: 'Resume Genius: cover letter statistics (625 US hiring managers, 2022)', url: RGEN },
    { label: 'Cui, Dias, Ye (Yale): Signaling in the Age of AI, arXiv 2509.25054', url: YALE },
    { label: 'MIT CAPD: How to write an effective cover letter', url: MIT },
    { label: 'DataCamp: Data analyst cover letter (29 Sep 2024)', url: DC },
    { label: 'Jobscan: Data analyst cover letter examples (23 Jul 2026)', url: JS },
    { label: 'Greenhouse Job Board API: applications', url: GH },
    { label: 'Internshala: from Applied to Hired (updated 9 Jan 2024)', url: ISH },
  ],
  faqs: [
    {
      q: 'Do data analysts need a cover letter?',
      a: 'Usually not required. Of {n} live data analyst posts we checked on {checked}, {requiredWord} required one and {optional} had an optional field. Write one when the form has a field, when you email a person, or when you are switching careers; skip it on Easy Apply and Naukri.',
    },
    {
      q: 'How long should a data analyst cover letter be?',
      a: 'About 250–350 words on one page, in four short paragraphs. Jobscan suggests 250–350 words and DataCamp 300–400; hiring managers in a Resume Genius survey said 400 on average, so treat 400 as the ceiling.',
    },
    {
      q: 'What do I write in a data analyst cover letter with no experience?',
      a: 'One project told as question, data, method, decision and number, with a link to the queries or dashboard. A public dataset analysis with a clear finding is proof; a course list is not.',
    },
    {
      q: 'Can I use ChatGPT or Claude to write my cover letter?',
      a: 'For structure and grammar, yes. A Yale economics paper on about 5M Freelancer.com letters found the AI tool raised callbacks a little, but tailored letters stopped standing out as much, and time spent editing the AI draft went with hiring success. Put your own numbers and story in, and edit hard.',
    },
    {
      q: 'Is a covering letter the same as a cover letter?',
      a: 'Yes. “Covering letter” is common in India and the UK; it is the same one-page letter that goes with your CV or resume.',
    },
    {
      q: 'Should I mention my current or expected CTC in the cover letter?',
      a: 'No, unless the post asks for it in the letter. Recruiters in India ask for current CTC, expected CTC and notice period separately.',
    },
  ],
  template: {
    href: '/downloads/cover-letter-templates/data-analyst-cover-letter-template.docx',
    fileName: 'data-analyst-cover-letter-template.docx',
  },
}
