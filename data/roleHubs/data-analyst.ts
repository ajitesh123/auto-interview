import type { RoleHub } from './types'

// Data Analyst role hub. Brief: docs/briefs/2026-11-09-data-analyst-hub.md
// Sources opened on 2026-11-09:
// - Job posts with stated pay (URL on each pay row): Wellfound and Cutshort (India), Greenhouse and Lever (US).
//   Dropped: ShopMy (page calls its range "a good faith estimate"), non-US/India posts, hybrid BA titles.
// - Levels.fyi: Data Analyst title page (US, updated Nov 4 2026) and India location page (updated Nov 9 2026).
// - BLS OOH: operations research analysts and data scientists pages (modified Oct 29 2026).
// - Story / AI: ANSI blog (SQL 1986), eWeek (Power BI GA 2015), Microsoft Tech Community (Python in Excel),
//   Microsoft Learn (Copilot in Power BI), Google Cloud docs (BigQuery data canvas), OpenAI Help (data analysis),
//   Alteryx 2025 State of the Data Analyst (vendor survey), Coursera (Google certificate), WEF Future of Jobs 2025.
// Every question below carries the page it was reported on in `source.url`. Some come from closely related
// loops (Business Analyst, MIS Analyst, Data Science intern); the question text says so.

const dataAnalyst: RoleHub = {
  slug: 'data-analyst',
  visuals: {
    // og image removed: /static/images/roles/data-analyst/og.jpg shows Apollo counts. Regenerate it, then restore.
  },
  roleName: 'Data Analyst',
  shortName: 'Data Analyst',
  metaTitle: 'Data Analyst Interview Questions 2026: 41 Real, With Answers',
  metaDescription:
    'Data analyst interview prep: 41 questions candidates reported at Amazon, Flipkart, Swiggy, EY and Uber, with answers, the rounds, and pay from 28 job posts.',
  keywords: [
    'data analyst interview questions',
    'data analyst interview questions and answers',
    'data analyst sql interview questions',
    'power bi interview questions',
    'data analyst interview questions for freshers',
    'data analyst case study interview',
    'data analyst salary india',
    'flipkart data analyst interview',
    'amazon data analyst interview',
  ],
  heroTitle: 'Data Analyst interview prep',
  heroDescription:
    'The person who turns a business question into a query, a number and a decision. 50 questions, 41 of them reported by candidates at Amazon, Meta, Flipkart, Swiggy, EY, Deloitte, ZS and Uber, each with a model answer and what the interviewer listens for, the rounds by company, and pay from 28 real job posts.',
  directAnswer:
    'A data analyst answers business questions with data: they pull it with SQL, clean and explore it in Excel or Python, show it in Power BI or Tableau, and say what to do next. Almost every loop tests four things: SQL, Excel or a BI tool, a metric or product case, and how you explain numbers to people who are not analysts.',
  lastUpdated: '2026-11-09',
  story: {
    summary:
      'Analysts have answered business questions since the spreadsheet reached office desks in 1979. SQL became a standard in 1986 and BI tools such as Tableau and Power BI turned queries into dashboards. Since 2023, AI has moved inside the tools analysts already use, so the job is shifting from writing every query by hand to checking, explaining and deciding.',
    born: { when: '1979', what: 'VisiCalc puts the spreadsheet on personal computers' },
    rise: { when: '2015', what: 'Power BI goes live; dashboards become every analyst’s output' },
    milestones: [
      {
        when: 'Oct 1979',
        title: 'The spreadsheet reaches the desk',
        detail:
          'VisiCalc shipped for the Apple II on 17 October 1979, the first spreadsheet program for personal computers. Desk-level business analysis starts here.',
        sourceLabel: 'Wikipedia: VisiCalc',
        sourceUrl: 'https://en.wikipedia.org/wiki/VisiCalc',
      },
      {
        when: '1986',
        title: 'SQL becomes a standard',
        detail:
          'SQL was standardised as ANSI X3.135 in 1986 and adopted by ISO months later. That is why one query language still works across almost every database an analyst touches.',
        sourceLabel: 'ANSI blog',
        sourceUrl: 'https://blog.ansi.org/sql-standard-iso-iec-9075-2023-ansi-x3-135/',
      },
      {
        when: '2003',
        title: 'Tableau is founded',
        detail:
          'Tableau was founded in Mountain View in 2003 out of Stanford research, and made drag-and-drop charts a normal part of analysis. Salesforce bought it in 2019.',
        sourceLabel: 'Wikipedia: Tableau Software',
        sourceUrl: 'https://en.wikipedia.org/wiki/Tableau_Software',
      },
      {
        when: 'Jul 2015',
        title: 'Power BI goes live',
        detail:
          'Microsoft Power BI reached general availability on 24 July 2015. Tableau and Power BI are the BI tools named most often in the analyst posts we opened.',
        sourceLabel: 'eWeek',
        sourceUrl:
          'https://www.eweek.com/enterprise-apps/microsoft-power-bi-becomes-generally-available-july-24/',
      },
      {
        when: '2021',
        title: 'A route in without a degree',
        detail:
          'Google added a data analytics certificate to its career certificates on Coursera, aimed at entry-level jobs. Coursera shows more than 3.9 million people enrolled.',
        sourceLabel: 'Coursera course page',
        sourceUrl:
          'https://www.coursera.org/professional-certificates/google-data-analytics?hl=en-US',
      },
      {
        when: 'Aug 2023',
        title: 'Python moves inside Excel, then AI copilots arrive',
        detail:
          'Microsoft announced Python in Excel in August 2023. By 2026, Copilot in Power BI writes DAX and builds report pages, and Gemini in BigQuery writes SQL and charts from plain English.',
        sourceLabel: 'Microsoft Tech Community',
        sourceUrl:
          'https://techcommunity.microsoft.com/t5/excel-blog/announcing-python-in-excel/ba-p/3893439',
      },
      {
        when: '2025–26',
        title: 'Data jobs top the growth lists',
        detail:
          'WEF’s Future of Jobs 2025 names big data specialists the fastest-growing job. The US Bureau of Labor Statistics projects data scientist jobs to grow 35% from 2025 to 2035 and operations research analysts 12%.',
        sourceLabel: 'BLS Occupational Outlook Handbook',
        sourceUrl: 'https://www.bls.gov/ooh/math/data-scientists.htm',
      },
    ],
    why: [
      'Every team now has data and too few people who can turn it into a decision. The analyst sits between the database and the people who act.',
      'Services firms (Deloitte, EY, ZS, Mu Sigma, Tiger Analytics) hire analysts in large batches from Indian campuses, so it is one of the biggest entry routes into tech.',
      'AI tools write first-draft SQL and charts, which raises the value of analysts who can check the numbers and explain what they mean.',
    ],
  },
  aiAngle:
    'AI now sits inside the analyst’s tools: Copilot in Power BI writes DAX and report pages (it needs paid Fabric F2+ or Premium P1+ capacity; a Pro licence alone is not enough), Gemini in BigQuery writes SQL and charts from plain English, and ChatGPT runs pandas code on files you upload. In an Alteryx survey of 1,400 analysts (vendor research), 97% said AI tools speed up their daily tasks. Learn to prompt for a first-draft query, then check it against a hand-calculated number. Interviewers still test whether you can write and debug SQL yourself.',
  mustKnow:
    'Every data analyst answer ends in a decision, not a number. Restate the business question, say how you would get and check the data, give the result in one sentence, and say what the team should do and how you would know it worked. A perfect query with no “so what” scores lower than a simple query with a clear recommendation.',
  whatTheRoleIs: [
    'A data analyst turns business questions into answers. A typical week: write SQL to pull data, clean and join it, build or update a dashboard in Power BI, Tableau or Looker, dig into why a metric moved, and present what you found to a manager or a business team. Titles vary: Data Analyst, Business Analyst, MIS Analyst, Product Analyst, BI Analyst.',
    'In five job posts we opened (Trent, two Amazon teams, a Dice contract and Dexian), SQL, Python or R, and a BI tool appeared in all five; Tableau was named in four. Excel appeared in both Indian posts. Expect SQL to be tested hardest.',
  ],
  expectationLabels: {
    nav: 'Product vs services',
    title: 'What hiring managers expect: product company vs services firm',
    sub: 'Same SQL, different day. Know which one you are interviewing for.',
    a: 'Product company (Amazon, Flipkart, Swiggy, Uber)',
    b: 'Services and consulting (Deloitte, EY, ZS, Mu Sigma)',
    aNote: 'Own a product’s metrics',
    differenceTitle: 'How a data analyst differs from nearby roles',
  },
  expectations: {
    b2b: {
      headline: 'Product company: own the metrics of one product or team',
      points: [
        'Answer “why did this metric move?” for one product or business team, usually within a day or two.',
        'Write SQL against large event and order tables; window functions and joins come up every week.',
        'Build and maintain the team’s dashboards and the weekly business review numbers.',
        'Read A/B test results and say whether a change worked.',
        'Loops lean on SQL rounds and product or metric cases (Flipkart reported three SQL rounds; Meta a six-round final).',
      ],
      metrics: [
        'Daily or monthly active users',
        'Conversion and repeat-order rate',
        'Delivery time or SLA, and complaints',
        'Revenue and order value by segment',
      ],
    },
    b2c: {
      headline: 'Services and consulting: answer a client’s question on a deadline',
      points: [
        'Work on client projects: reporting, dashboards, data cleaning and analysis for banks, retailers or pharma.',
        'Power BI and Excel are central; EY and Deloitte candidates reported DAX, data modelling and RLS questions.',
        'Hiring is often in campus batches, with an aptitude test, a group discussion or guesstimates first.',
        'Explain results to a client manager who is not an analyst, often in slides.',
        'Loops lean on aptitude, Excel or Power BI depth, a case or guesstimate, and HR fit.',
      ],
      metrics: [
        'Reports delivered on time',
        'Dashboard adoption by the client',
        'Data quality and reconciliation errors',
        'Hours of manual reporting saved',
      ],
    },
    difference: [
      'Versus data scientist: a data scientist builds predictive models and experiments at scale; a data analyst explains what happened and why, with SQL, BI tools and basic statistics.',
      'Versus business analyst: in India the titles overlap heavily. Business analyst roles often add process and requirements work; data analyst roles go deeper on SQL and dashboards.',
      'Versus data engineer: a data engineer builds the pipelines and tables; the analyst uses them and flags when the data looks wrong.',
      'Versus product analyst: a product analyst is a data analyst attached to one product, with more A/B tests and funnel work.',
      'Versus MIS analyst: MIS roles focus on recurring Excel and reporting; data analyst roles expect SQL and root-cause work as well.',
    ],
  },
  skills: [
    {
      area: 'SQL',
      items: [
        'Joins (inner, left, self) and what happens with NULLs',
        'GROUP BY with HAVING, and the order SQL runs clauses',
        'Window functions: ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD, running sums',
        'CTEs for retention, repeat rate and top-N per group',
      ],
    },
    {
      area: 'Excel and BI',
      items: [
        'Pivot tables, XLOOKUP or INDEX-MATCH, removing duplicates',
        'Power BI: data model, measures vs calculated columns, SUM vs SUMX',
        'Import vs DirectQuery, row-level security, report performance',
        'Choose the right chart and cut the clutter',
      ],
    },
    {
      area: 'Statistics and Python',
      items: [
        'Mean, median, distributions and outliers',
        'A/B tests: hypotheses, sample size, significance, guardrails',
        'pandas: merge, groupby, pivot_table, handling missing values',
        'Correlation vs causation, with an example',
      ],
    },
    {
      area: 'Business sense and AI',
      items: [
        'Break a metric into drivers and root-cause a drop',
        'Pick a north-star metric and its guardrails',
        'Explain a result to a non-analyst in three sentences',
        'Draft SQL with Copilot, Gemini or ChatGPT, then check it by hand',
      ],
    },
  ],
  getHired: {
    intro:
      'Analyst hiring managers skim for three things: the tools (SQL first), the scale of data you worked with, and a decision your analysis changed. Most Indian entry roles come through campus drives, referrals and job boards; a public portfolio of two or three real analyses is the fastest way to stand out without experience. The strong bullets below are illustrative, with made-up numbers: copy the shape, not the figures.',
    bullets: [
      {
        weak: 'Created dashboards in Power BI.',
        strong:
          'Built a Power BI sales dashboard on 2.1M order rows for 40 regional managers, replacing a weekly Excel pack; manual reporting time fell from 6 hours a week to 30 minutes.',
      },
      {
        weak: 'Good knowledge of SQL and Excel.',
        strong:
          'Wrote SQL cohort queries that showed repeat orders fell 9% for customers who waited over 45 minutes; the ops team added a delay coupon and repeat rate recovered in 4 weeks.',
      },
      {
        weak: 'Worked on data cleaning.',
        strong:
          'Cleaned and reconciled 3 years of vendor invoices (180K rows) in Python and SQL, found ₹14L of duplicate payments, and set up a monthly check that finance still runs.',
      },
      {
        weak: 'Did A/B testing analysis.',
        strong:
          'Analysed a 2-week checkout A/B test (52K users per arm): conversion rose 1.8 points with no change in refunds, so the team shipped the new flow to all users.',
      },
    ],
    resumeTips: [
      'Lead each bullet with the decision or result, then the tool: “Cut reporting time 90% (Power BI, SQL)”.',
      'Say the scale: rows, users, regions, or the number of people who used your dashboard.',
      'Name tools exactly as job posts do: SQL, Excel, Power BI or Tableau, Python (pandas), and your warehouse if any.',
      'Freshers: two projects on real public data beat a list of courses. Link a GitHub repo or a Tableau Public dashboard.',
      'Indian campus and services roles expect the one-page table CV with marks; our Word template uses it.',
      'Keep certificates to one line (Google Data Analytics, PL-300) and only if relevant to the post.',
    ],
    channels: [
      {
        name: 'Campus drives and off-campus hiring challenges',
        how: 'Services and analytics firms (Deloitte, EY, ZS, Mu Sigma, Tiger Analytics) and some product companies hire analysts in batches through aptitude tests, group discussions and case rounds.',
      },
      {
        name: 'Wellfound and Cutshort',
        how: 'Indian startup posts that show the pay band and posting date. Most of the India pay rows on this page come from them.',
        url: 'https://wellfound.com/jobs/4751311-data-analyst',
      },
      {
        name: 'Company career pages and Greenhouse boards',
        how: 'Most US analyst posts with stated pay are on Greenhouse or Lever. Amazon posts analyst and BIE roles on amazon.jobs with a prep guide.',
        url: 'https://amazon.jobs/content/en/how-we-hire/bie-interview-prep',
      },
      {
        name: 'Internal moves from ops, MIS or support',
        how: 'People who already own a report in operations or MIS often move into analyst roles by automating it with SQL and a dashboard.',
      },
    ],
    outreach: {
      title: 'A five-line note with one chart',
      body: 'Hi [Name], I saw the Data Analyst opening on [team] at [Company].\n\nAt [college or current company], I [analysis you did], which led to [decision or result].\n\nI looked at public data on [their product or market] and made one chart that shows [finding]. Link: [Tableau Public or GitHub].\n\nWould you have 15 minutes this week?',
      note: 'Send it to the analytics manager or the business lead the role supports. Follow up once after 5–6 days, then stop.',
    },
    proofOfWork: {
      title: 'Publish one analysis that looks like their work',
      why: 'Most loops include a SQL round and a case. A public analysis on data like theirs shows both, and gives the interviewer something concrete to ask about.',
      steps: [
        'Pick a public dataset close to their business: e-commerce orders, food delivery, payments or ride data from Kaggle or a government portal.',
        'Ask one business question (why did repeat orders fall in one city?), answer it with SQL, and keep the queries in a GitHub repo.',
        'Build one dashboard page in Power BI or Tableau Public with three charts and a one-line takeaway on each.',
        'Write a 150-word summary: the question, the answer, and what you would recommend. Put the link on your CV.',
      ],
    },
  },
  process: [
    {
      companyType: 'Product company (Amazon, Flipkart, Uber, Meta)',
      rounds: [
        'Online assessment or recruiter screen (Amazon’s BIE assessment: SQL Challenge, Working with SQL, Work Styles)',
        'Technical phone screen: SQL plus a short analytics question',
        'Final loop of 3–6 rounds: SQL, metrics or product case, statistics, behavioural',
        'Hiring manager round; Amazon adds a Bar Raiser',
      ],
    },
    {
      companyType: 'Services and consulting firm (Deloitte, EY, ZS, Mu Sigma)',
      rounds: [
        'Aptitude test (quant, logical reasoning, sometimes Excel MCQs)',
        'Group discussion or guesstimate round, common on campus',
        'Technical interview: SQL, Excel or Power BI, Python basics, your projects',
        'Case or manager round, then HR',
      ],
    },
    {
      companyType: 'Startup',
      rounds: [
        'Founder or analytics lead call',
        'A take-home on their data or a live SQL test',
        'Walk-through of your analysis with the team you would support',
        'Culture and offer conversation; often 2–3 weeks end to end',
      ],
    },
    {
      companyType: 'What candidates reported',
      rounds: [
        'Flipkart Data Analyst, Bengaluru (Nov 2025): SQL on several scenarios, then SQL with joins and functions, then SQL with a managerial and business round, then HR (Glassdoor)',
        'Uber Data Analyst (Aug 2026): HR call, hiring manager call with a SQL interview, then a take-home and a case interview (Glassdoor)',
        'Deloitte, Gurgaon (Jun 2026): SQL with dataframes and a business case, a SQL round, then a business case with joins, window functions and repeat rate (Glassdoor)',
        'Meta Staff Data Analyst: recruiter screen, a phone interview on SQL and product strategy, then six finals: metric design, statistics, behavioural, hiring manager, SQL, product sense (Exponent)',
        'ZS (older reviews): online aptitude (60 min), video interview with guesstimates, a 120-minute case, a behavioural round, then a fit round with a manager or principal (AmbitionBox)',
        'Mu Sigma campus: aptitude test of about 60 questions, a group activity, then a technical and HR interview with puzzles (AmbitionBox)',
        'EY Data Analyst, Mumbai (Jul 2022): HR screen, a 70-minute technical round on Python, SQL, pandas and Excel, a 30-minute behavioural round, then the offer call (LeetCode Discuss)',
        'PhonePe campus (Apr 2024): aptitude test, group discussion, a case study with guesstimates, then HR (AmbitionBox)',
      ],
    },
  ],
  pay: {
    title: 'Pay: India and US job posts, and Levels.fyi',
    headline: 'India posts ₹13.5 LPA median · US base $131.8K median',
    intro:
      'We opened 28 data analyst job posts that state pay. The 14 full-time India posts range from ₹3–5 LPA (1–2 years, Tap Invest) to ₹20–35 LPA (2 years, PEEKO), with a median midpoint of ₹13.5 LPA. The 14 US posts range from $58K–70K (entry level) to $180K–210K (senior/staff), with a median midpoint of $131.8K base. Levels.fyi’s medians are ₹14.6 lakh in India and $110,000 in the US.',
    tables: [
      {
        region: 'India: job posts with stated pay',
        tab: 'India · job posts',
        currency: 'INR (₹, lakh per annum, as posted)',
        rows: [
          {
            band: 'LetsIntern, Data Analyst Intern, remote',
            experience: '0–1 yr',
            value: '₹1.8–2.2 LPA (₹15–18K a month)',
            url: 'https://cutshort.io/job/Data-Analyst-Intern-LetsIntern-oT5nTk2c',
          },
          {
            band: 'Tap Invest, Data Analyst, Bengaluru',
            experience: '1–2 yrs',
            value: '₹3–5 LPA',
            url: 'https://cutshort.io/job/Data-Analyst-Bengaluru-Bangalore-Tap-Invest-3nnNwkss',
          },
          {
            band: 'Newton School, Data Analyst, Bengaluru',
            experience: 'Fresher–1 yr',
            value: '₹4–8 LPA',
            url: 'https://wellfound.com/jobs/4751311-data-analyst',
          },
          {
            band: 'Uniabroad, Data Analyst, remote',
            experience: '0–15 yrs',
            value: '₹5–25 LPA',
            url: 'https://cutshort.io/job/Data-Analyst-Uniabroad-NeGaM7Nq',
          },
          {
            band: 'Banking client via Peak Hire, Data Analyst, Bengaluru / Pune / Mumbai',
            experience: '3–5 yrs',
            value: '₹8–11 LPA',
            url: 'https://cutshort.io/job/Data-Analyst-Bengaluru-Bangalore-Mangalore-Pune-Mumbai-Peak-Hire-Solutions-2U3DaYPL',
          },
          {
            band: 'Talent Pro client, Data Analyst, Mumbai / Pune / Bengaluru',
            experience: '3–5 yrs',
            value: '₹8–12 LPA',
            url: 'https://cutshort.io/job/Data-Analyst-Mumbai-Pune-Bengaluru-Bangalore-Talent-Pro--DMllqnzu',
          },
          {
            band: 'Talent Pro fintech client, Data Analyst, Bengaluru and others',
            experience: '3–5 yrs',
            value: '₹10–12 LPA',
            url: 'https://cutshort.io/job/Data-Analyst-Fintech-company-only-Bengaluru-Bangalore-Mangalore-Pune-Mumbai-Navi-Mumbai-Talent-Pro--sGbs4H07',
          },
          {
            band: 'Arivihan Technologies, Data Analyst, Indore',
            experience: '4+ yrs',
            value: '₹10–12 LPA',
            url: 'https://wellfound.com/jobs/4786334-data-analyst',
          },
          {
            band: 'Staffnixcom, Sr Data Analyst (Tariff Data), Pune',
            experience: '4–7 yrs',
            value: '₹11–15 LPA',
            url: 'https://cutshort.io/job/Sr-Data-Analyst-Tariff-Data-Pune-Staffnixcom-MReBjcnP',
          },
          {
            band: 'NeoGenCode, Senior Data Analyst, Bengaluru / Hyderabad',
            experience: '5–10 yrs',
            value: '₹10–18 LPA',
            url: 'https://cutshort.io/job/Senior-Data-Analyst-Bengaluru-Bangalore-Hyderabad-NeoGenCode-Technologies-Pvt-Ltd-UjID0Ekc',
          },
          {
            band: 'QuaXigma, Senior Data Analyst, Tirupati',
            experience: '4–15 yrs',
            value: '₹7–25 LPA',
            url: 'https://cutshort.io/job/Senior-Data-Analyst-Tirupati-QuaXigma-IT-solutions-Private-Limited-WbBNsww1',
          },
          {
            band: 'Xohani Solutions, Data Analyst, Hyderabad / Bengaluru',
            experience: '2–6 yrs',
            value: '₹12–22 LPA',
            url: 'https://wellfound.com/jobs/4629982-technology-transformation-ead-engineering-data-analyst',
          },
          {
            band: 'Velocity, Data Analyst, Bengaluru (equity listed)',
            experience: '2 yrs',
            value: '₹18–25 LPA',
            url: 'https://wellfound.com/jobs/4629922-data-analyst',
          },
          {
            band: 'Velocity, Data Analyst, Bengaluru (equity listed)',
            experience: '2 yrs',
            value: '₹20–30 LPA',
            url: 'https://wellfound.com/jobs/4215166-data-analyst',
          },
          {
            band: 'PEEKO, Data Analyst, Bengaluru',
            experience: '2 yrs',
            value: '₹20–35 LPA',
            url: 'https://wellfound.com/jobs/4574450-data-analyst',
          },
        ],
        note: 'Each row is one post; tap it to open. The median midpoint of the 14 full-time posts is ₹13.5 LPA (the internship is left out). Years of experience predict pay poorly: two Bengaluru startups (PEEKO and Velocity) posted three 2-year roles at ₹18–35 LPA, while three recruiter posts for 3–5 years sat at ₹8–12 LPA. Wellfound posts were 1 week to 2 months old on Nov 9, 2026; most Cutshort posts are dated Aug–Oct 2026. Three are older (NeoGenCode, Jun 2025; the two Talent Pro posts, Dec 2025 and Jan 2026); without them the median midpoint is ₹15 LPA.',
        sourceLabel: 'Wellfound and Cutshort job posts',
        sourceUrl: 'https://wellfound.com/jobs/4751311-data-analyst',
        asOf: 'Nov 9, 2026',
      },
      {
        region: 'United States: job posts with stated pay',
        tab: 'US · job posts',
        currency: 'USD (base salary per year, as posted)',
        rows: [
          {
            band: 'ERG, Entry-Level Safety and Health Data Analyst, DC area',
            experience: '0–5 yrs',
            value: '$58K–70K',
            url: 'https://jobs.lever.co/erg/26fdd838-c4ba-4538-825c-c16b36d18fe1',
          },
          {
            band: 'Vestwell, Data Analyst, NY / Austin / hybrid',
            experience: 'Not stated',
            value: '$70K–80K',
            url: 'https://job-boards.greenhouse.io/vestwell/jobs/8108684003',
          },
          {
            band: 'Splash Financial, Operations Data Analyst, remote',
            experience: '1–3 yrs',
            value: '$61K–97K',
            url: 'https://job-boards.greenhouse.io/splashfinancial/jobs/4721731006',
          },
          {
            band: 'Recidiviz, Data Analyst (Entry-Level), remote / NYC / Oakland',
            experience: '6+ months',
            value: '$85K',
            url: 'https://job-boards.greenhouse.io/recidiviz/jobs/4717510006',
          },
          {
            band: 'AEG Presents, Senior Data Analyst (Paid Media), Los Angeles',
            experience: '4–6 yrs',
            value: '$82.2K–125K',
            url: 'https://job-boards.greenhouse.io/aegworldwide/jobs/8895925002',
          },
          {
            band: 'Tendo, Senior Clinical Data Analyst, Chicago / remote',
            experience: '5+ yrs',
            value: '$97.8K–132.3K',
            url: 'https://jobs.lever.co/tendo/37440057-7929-4943-b3d9-878ff6e51d62',
          },
          {
            band: 'Rent the Runway, Data Analyst, Brooklyn',
            experience: '2–4+ yrs',
            value: '$100K–160K',
            url: 'https://job-boards.greenhouse.io/renttherunway/jobs/7846732',
          },
          {
            band: 'Spring Health, Senior Data Analyst I, remote',
            experience: '5+ yrs',
            value: '$125K–142K',
            url: 'https://job-boards.greenhouse.io/springhealth66/jobs/4733429005',
          },
          {
            band: 'Life360, Senior Data Analyst, remote',
            experience: '5+ yrs',
            value: '$108.5K–159.5K',
            url: 'https://job-boards.greenhouse.io/life360/jobs/8136874002',
          },
          {
            band: 'Fanatics Betting & Gaming, Senior Data Analyst (Finance), NY',
            experience: '4+ yrs',
            value: '$128.3K–168.8K',
            url: 'https://job-boards.greenhouse.io/fanaticsfbg/jobs/4463509009',
          },
          {
            band: 'Hello Heart, Senior Data Analyst (Client Reporting), remote',
            experience: '3+ yrs',
            value: '$140K–160K',
            url: 'https://job-boards.greenhouse.io/helloheart/jobs/8782162002',
          },
          {
            band: 'Lookout, Senior Data Analyst, remote',
            experience: '5+ yrs',
            value: '$133K–183K',
            url: 'https://job-boards.greenhouse.io/lookoutinc/jobs/8167603',
          },
          {
            band: 'Trust & Will, Senior Data Analyst, remote',
            experience: '5–9+ yrs',
            value: '$140K–180K',
            url: 'https://job-boards.greenhouse.io/trustwill/jobs/4379579009',
          },
          {
            band: 'Future, Senior/Staff Data Analyst, remote',
            experience: '7+ yrs',
            value: '$180K–210K',
            url: 'https://job-boards.greenhouse.io/future/jobs/4683274005',
          },
        ],
        note: 'Each row is one post; tap it to open. The median midpoint of the 14 posts is $131.8K base. The four entry-level posts sit between $58K and $97K; Rent the Runway’s 2–4 year role is $100K–160K. Several posts mention equity without an amount. Greenhouse pages show no posting date; all were live when opened on Nov 9, 2026.',
        sourceLabel: 'Greenhouse and Lever job posts',
        sourceUrl: 'https://job-boards.greenhouse.io/renttherunway/jobs/7846732',
        asOf: 'Nov 9, 2026',
      },
      {
        region: 'Levels.fyi: total compensation',
        tab: 'Levels.fyi',
        currency: 'Total compensation per year, median',
        rows: [
          {
            band: 'Data Analyst, India, median',
            experience: 'All levels',
            value: '₹14.6 lakh',
            url: 'https://www.levels.fyi/t/data-analyst/locations/india',
          },
          {
            band: 'Data Analyst, United States, median',
            experience: 'All levels',
            value: '$110,000',
            url: 'https://www.levels.fyi/t/data-analyst',
          },
          {
            band: 'Microsoft, Data Analyst (US), median',
            experience: 'All levels',
            value: '$190,500',
            url: 'https://www.levels.fyi/companies/microsoft/salaries/data-analyst',
          },
          {
            band: 'Amazon, Data Analyst (US), median',
            experience: 'All levels',
            value: '$200,000',
            url: 'https://www.levels.fyi/companies/amazon/salaries/data-analyst',
          },
          {
            band: 'Google, Data Analyst (US), median',
            experience: 'All levels',
            value: '$212,400',
            url: 'https://www.levels.fyi/companies/google/salaries/data-analyst',
          },
          {
            band: 'Meta, Data Analyst (US), median',
            experience: 'All levels',
            value: '$260,000',
            url: 'https://www.levels.fyi/companies/meta/salaries/data-analyst',
          },
        ],
        note: 'Levels.fyi medians are self-reported total compensation (base, bonus and stock). Big Tech company medians are far above the all-employer US median because they include stock and skew senior. Levels.fyi’s Flipkart data analyst page showed no data and the Swiggy page did not load, so neither is shown.',
        sourceLabel: 'Levels.fyi',
        sourceUrl: 'https://www.levels.fyi/t/data-analyst',
        asOf: 'Nov 9, 2026',
      },
    ],
    crossCheck:
      'The India post median (₹13.5 LPA midpoint of posted ranges) sits close to Levels.fyi’s India median (₹14.6 lakh of self-reported total compensation); they measure different things but point the same way. The US post median ($131.8K base) is above Levels.fyi’s US median ($110,000) because 9 of our 14 US posts are senior roles. For a cross-check outside tech, the US Bureau of Labor Statistics reports a 2025 median of $88,940 for operations research analysts. Compare Indian offers on in-hand pay with our salary calculator.',
  },
  questionGroups: [
    {
      id: 'sql',
      title: 'SQL',
      blurb:
        'Every loop we found has SQL, and Flipkart candidates reported three SQL rounds. Say the approach out loud before you type, name the edge cases (ties, NULLs, duplicates), and end with what the result means.',
      questions: [
        {
          q: 'Calculate the repeat rate of orders from a given table. Also: what is the difference between an inner join and an outer join? (Asked at Deloitte, per Glassdoor)',
          answer:
            'First define repeat rate out loud: the share of customers with two or more orders in the period. Confirm the period and whether cancelled orders count.\n\nThen: in a CTE, count orders per customer with GROUP BY customer_id. In the outer query, divide the number of customers with count >= 2 by all customers: SUM(CASE WHEN order_count >= 2 THEN 1 ELSE 0 END) * 1.0 / COUNT(*). Multiply by 1.0 so integer division does not return zero.\n\nJoins: an inner join keeps only rows that match in both tables; a left outer join keeps every row from the left table and fills NULLs where there is no match. For repeat rate by city you would left join customers to orders so customers with no orders still appear; say out loud that this changes the denominator from customers who ordered to all customers.\n\n```sql\nWITH c AS (\n  SELECT customer_id,\n         COUNT(*) AS n\n  FROM orders\n  GROUP BY customer_id\n)\nSELECT\n  SUM(CASE WHEN n >= 2\n      THEN 1 ELSE 0 END)\n  * 1.0 / COUNT(*)\n  AS repeat_rate\nFROM c;\n```',
          lookFor:
            'A clear definition before the query, the integer-division trap, and a correct join explanation with a use case.',
          criteria: [
            'Defines repeat rate and the period first',
            'Counts per customer, then the share with 2+ orders',
            'Avoids integer division',
            'Explains inner vs left join with an example',
          ],
          reportedAt: 'Jun 2026',
          round: 'Round 3: business case + SQL',
          source: {
            label: 'Glassdoor',
            url: 'https://www.glassdoor.co.in/Interview/Deloitte-Interview-E2763-RVW96413379.htm',
          },
        },
        {
          q: 'Using transactions, customers and accounts tables, find the top 3 customers by total spend in each city. (Asked at American Express in an MIS Analyst loop, per Glassdoor)',
          answer:
            'Join transactions to accounts (to get the customer) and customers (to get the city). Sum spend per customer and city with GROUP BY.\n\nThen rank inside each city: DENSE_RANK() OVER (PARTITION BY city ORDER BY total_spend DESC). Wrap it in a CTE and keep rank <= 3.\n\nSay how you handle ties: DENSE_RANK keeps everyone tied at third; ROW_NUMBER would cut to exactly three. Ask which the business wants. Also mention filtering out refunds or failed transactions before summing.\n\n```sql\nWITH s AS (\n  SELECT cu.city,\n         cu.customer_id,\n         SUM(t.amount) AS spend\n  FROM transactions t\n  JOIN accounts a\n    ON a.account_id = t.account_id\n  JOIN customers cu\n    ON cu.customer_id = a.customer_id\n  GROUP BY cu.city, cu.customer_id\n), r AS (\n  SELECT *,\n    DENSE_RANK() OVER (\n      PARTITION BY city\n      ORDER BY spend DESC) AS rk\n  FROM s\n)\nSELECT * FROM r WHERE rk <= 3;\n```',
          lookFor:
            'Correct three-table joins, aggregation before ranking, PARTITION BY city, and a stated choice on ties.',
          criteria: [
            'Joins all three tables on the right keys',
            'Aggregates spend before ranking',
            'Ranks with PARTITION BY city',
            'Explains the tie choice (DENSE_RANK vs ROW_NUMBER)',
          ],
          round: 'SQL round',
          source: {
            label: 'Glassdoor',
            url: 'https://static.glassdoor.at/Interview/American-Express-MIS-Analyst-Interview-Questions-EI_IE35.0,16_KO17,28.htm',
          },
        },
        {
          q: 'Given a transaction table, write a query to identify “whale” users (high-frequency customers). (Asked at American Express, per Glassdoor)',
          answer:
            'Start by agreeing the definition, because “whale” is a business term. Offer one: customers in the top 1% by spend in the last 90 days, or customers above a fixed number of transactions per month.\n\nFor a percentile definition: aggregate spend per customer, then use NTILE(100) OVER (ORDER BY total_spend DESC) or PERCENT_RANK and keep the top bucket. For a frequency definition: COUNT(*) per customer per month with HAVING above the threshold.\n\nClose with a check: how much of total spend the whales account for, and whether the list is stable month to month.',
          lookFor:
            'Clarifying the business definition first, a percentile or threshold approach, and a sanity check on the result.',
          criteria: [
            'Asks or proposes a definition first',
            'Aggregates per customer over a time window',
            'Uses NTILE / PERCENT_RANK or HAVING correctly',
            'Sanity-checks share of spend',
          ],
          round: 'Technical',
          source: {
            label: 'Glassdoor',
            url: 'https://static.glassdoor.fr/Interview/American-Express-Data-Analyst-Interview-Questions-EI_IE35.0,16_KO17,29_IP2.htm',
          },
        },
        {
          q: 'What is the order of execution of a SQL query? And find the 3rd highest salary. (Asked at Flipkart, per Glassdoor)',
          answer:
            'Logical order: FROM and JOIN, then WHERE, GROUP BY, HAVING, SELECT, DISTINCT, ORDER BY, and finally LIMIT. That is why you cannot use a SELECT alias in WHERE, but you can in ORDER BY.\n\nThird highest salary: SELECT DISTINCT salary FROM (SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS r FROM employees) t WHERE r = 3. DISTINCT stops the same salary appearing once per person who earns it. DENSE_RANK handles duplicates, so two people on the top salary do not push the answer down.\n\nMention the alternative (ORDER BY salary DESC with DISTINCT and OFFSET 2) and what to return if fewer than three distinct salaries exist.',
          lookFor:
            'The correct clause order with a consequence (alias use), and a duplicate-safe Nth-highest query.',
          criteria: [
            'States FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT',
            'Explains why an alias fails in WHERE',
            'Uses DENSE_RANK or DISTINCT for duplicates',
            'Handles fewer than three salaries',
          ],
          reportedAt: 'Nov 2025',
          round: 'SQL rounds',
          source: {
            label: 'Glassdoor',
            url: 'https://www.glassdoor.ca/Interview/Flipkart-Interview-E300494-RVW91644973.htm',
          },
        },
        {
          q: 'Solve a self-join question, then a window function question with LEAD and LAG. (Asked at Flipkart, per Glassdoor)',
          answer:
            "A classic self-join: find employees who earn more than their manager. Join employees e to employees m ON e.manager_id = m.id and keep e.salary > m.salary. Explain that you join the table to itself with two aliases.\n\nA classic LAG question: month-on-month revenue change. Aggregate revenue by month, then LAG(revenue) OVER (ORDER BY month) gives last month’s value; subtract and divide for growth. LEAD looks forward instead, for example days until a customer’s next order.\n\nMention the first row returns NULL for LAG and how you would display it.\n\n```sql\nWITH m AS (\n  SELECT DATE_TRUNC('month', order_date)\n           AS month,\n         SUM(amount) AS revenue\n  FROM orders\n  GROUP BY 1\n)\nSELECT month, revenue,\n  revenue * 1.0\n  / LAG(revenue) OVER (ORDER BY month)\n  - 1 AS mom_growth\nFROM m;\n```",
          lookFor:
            'Comfort with aliases in a self-join, and correct use of LAG/LEAD with an ORDER BY and NULL handling.',
          criteria: [
            'Self-join with two aliases on the right key',
            'Aggregates before applying LAG',
            'Correct ORDER BY in the window',
            'Handles the NULL first row',
          ],
          reportedAt: 'Mar 2025',
          round: 'Round 1: Technical',
          source: {
            label: 'Glassdoor',
            url: 'https://www.glassdoor.ca/Interview/Flipkart-Interview-E300494-RVW91644973.htm',
          },
        },
        {
          q: 'Find the second highest salary, and find duplicate entries in a table. (Asked at Amazon in a Business Analyst loop, per Glassdoor)',
          answer:
            'Second highest: MAX(salary) WHERE salary < (SELECT MAX(salary) FROM employees) is short and handles duplicates. The DENSE_RANK version generalises to any N.\n\nDuplicates: decide what “duplicate” means (same email? same every column?). Then GROUP BY those columns HAVING COUNT(*) > 1 to list them. To keep one copy, use ROW_NUMBER() OVER (PARTITION BY the duplicate columns ORDER BY created_at) and delete or filter rows where it is above 1.\n\nAmazon’s reviewer said one question was medium-hard, so expect a follow-up such as “now return the whole latest row per customer”.',
          lookFor:
            'Two working approaches, a definition of duplicate, and ROW_NUMBER to keep one row.',
          criteria: [
            'Second-highest query handles ties',
            'Defines which columns make a duplicate',
            'GROUP BY ... HAVING COUNT(*) > 1',
            'ROW_NUMBER to keep one row',
          ],
          round: 'SQL round',
          source: {
            label: 'Glassdoor',
            url: 'https://static.glassdoor.com.mx/Interview/Amazon-Business-Analyst-Interview-Questions-EI_IE6036.0,6_KO7,23_IP3.htm',
          },
        },
        {
          q: 'For each dish at each restaurant, find the most recent availability status using the latest last_updated timestamp. (Asked at Swiggy in a Data Science intern loop, per Glassdoor)',
          answer:
            'This is “latest row per group”. Use ROW_NUMBER() OVER (PARTITION BY restaurant_id, dish_id ORDER BY last_updated DESC) in a CTE and keep row number 1.\n\nMention the alternative: join to a subquery of MAX(last_updated) per restaurant and dish. Point out it can return two rows if two updates share the same timestamp, which ROW_NUMBER avoids (add a tie-breaker column).\n\nThen say why the business cares: showing an unavailable dish as available causes cancelled orders.\n\n```sql\nSELECT restaurant_id, dish_id,\n       status, last_updated\nFROM (\n  SELECT *,\n    ROW_NUMBER() OVER (\n      PARTITION BY restaurant_id,\n                   dish_id\n      ORDER BY last_updated DESC\n    ) AS rn\n  FROM dish_status\n) t\nWHERE rn = 1;\n```',
          lookFor:
            'The latest-row-per-group pattern, awareness of timestamp ties, and a business reason.',
          criteria: [
            'PARTITION BY restaurant and dish',
            'ORDER BY last_updated DESC, keep row 1',
            'Mentions ties and a tie-breaker',
          ],
          reportedAt: 'Jun 2026',
          round: 'Round 1: SQL',
          source: {
            label: 'Glassdoor',
            url: 'https://www.glassdoor.co.in/Interview/Swiggy-Interview-E952680-RVW80121977.htm',
          },
        },
        {
          q: 'What are the types of joins, and what happens when you join two tables that contain NULLs? Can you UNION tables with different data types? (Asked at PhonePe, per AmbitionBox)',
          answer:
            'Joins: inner, left, right, full outer and cross. NULLs never equal anything, including another NULL, so rows with a NULL join key do not match in an inner join; in a left join they stay, with NULLs on the right side.\n\nUNION: the columns must match in number and have compatible types. Most databases try to convert implicitly (an integer and a decimal combine), but text and dates will fail or convert unpredictably, so cast explicitly. UNION removes duplicates; UNION ALL keeps them and is faster.\n\nA good add: count rows before and after a join to catch silent losses or duplication.',
          lookFor:
            'NULL-never-equals-NULL, explicit casting for UNION, UNION vs UNION ALL, and a row-count check.',
          criteria: [
            'Names the join types',
            'Explains NULL keys do not match',
            'Says to cast types for UNION',
            'UNION vs UNION ALL',
          ],
          reportedAt: 'Nov 2022',
          round: 'Round 2: Technical',
          source: {
            label: 'AmbitionBox',
            url: 'https://www.ambitionbox.com/interviews/phonepe-interview-questions/data-analyst',
          },
        },
        {
          q: 'Explain RANK vs DENSE_RANK, with a join question. (Asked at Swiggy in a Business Analyst loop, per AmbitionBox)',
          answer:
            'Both rank rows by an ORDER BY. With ties, RANK skips numbers (1, 1, 3) and DENSE_RANK does not (1, 1, 2). ROW_NUMBER gives every row a unique number even when tied.\n\nUse DENSE_RANK for “Nth highest value” and ROW_NUMBER when you need exactly one row per group.\n\nShow it on a tiny example out loud: three restaurants with ratings 4.5, 4.5 and 4.2. That makes the difference obvious in ten seconds.',
          lookFor: 'Correct tie behaviour for all three functions and when to use each.',
          criteria: [
            'RANK skips after ties',
            'DENSE_RANK does not skip',
            'ROW_NUMBER is always unique',
            'A tiny example',
          ],
          reportedAt: 'Feb 2024',
          round: 'Round 2: Technical',
          source: {
            label: 'AmbitionBox',
            url: 'https://www.ambitionbox.com/interviews/swiggy-interview-questions/business-analyst',
          },
        },
        {
          q: 'From a dataset of advertisers, their spend and ad types, build an analysis table of each advertiser’s annual spend, optionally split by a dimension. (Asked at Meta in a Staff Data Analyst loop, per Exponent on aced.io)',
          answer:
            'Clarify the grain first: one row per advertiser per year, and which dimension (ad type, region) the team wants.\n\nThen GROUP BY advertiser_id, EXTRACT(YEAR FROM spend_date) and, if needed, the dimension; SUM the spend. Add useful columns with window functions: share of the advertiser’s total, and year-on-year change with LAG.\n\nSay how you would check it: totals by year should match the finance number, and advertisers with no spend in a year should show 0, not disappear (a LEFT JOIN to a calendar or advertiser list).',
          lookFor:
            'Defining the grain, correct aggregation, useful derived columns, and reconciliation to a known total.',
          criteria: [
            'Agrees the grain and dimension first',
            'Aggregates by advertiser and year',
            'Adds share or YoY with window functions',
            'Reconciles totals and keeps zero-spend rows',
          ],
          round: 'Final: SQL / data analysis',
          source: {
            label: 'Exponent (aced.io)',
            url: 'https://www.aced.io/experiences/meta-facebook-staff-data-analyst-interview-181203',
          },
        },
        {
          q: 'Find customers who ordered in January but not in February.',
          answer:
            "This is an anti-join: rows in one set with no match in another. The safest pattern is NOT EXISTS, because NOT IN returns nothing if the subquery contains a NULL.\n\n```sql\nSELECT DISTINCT o.customer_id\nFROM orders o\nWHERE o.order_date >= '2026-01-01'\n  AND o.order_date <  '2026-02-01'\n  AND NOT EXISTS (\n    SELECT 1 FROM orders f\n    WHERE f.customer_id = o.customer_id\n      AND f.order_date >= '2026-02-01'\n      AND f.order_date <  '2026-03-01'\n  );\n```\n\nUse half-open date ranges (>= start, < next start) so you never miss orders late on the last day. The business reading: this is a churn list for a win-back campaign.",
          lookFor:
            'Recognising the anti-join, NOT EXISTS over NOT IN, clean date ranges, and a business use.',
          criteria: [
            'Names it an anti-join',
            'Uses NOT EXISTS or LEFT JOIN ... IS NULL',
            'Explains the NOT IN and NULL trap',
            'Half-open date ranges',
          ],
          round: 'Common SQL pattern',
        },
        {
          q: 'Calculate a rolling 7-day average of daily revenue.',
          answer:
            'Aggregate to one row per day first, then average over the current row and the 6 before it.\n\n```sql\nWITH d AS (\n  SELECT order_date AS day,\n         SUM(amount) AS revenue\n  FROM orders\n  GROUP BY order_date\n)\nSELECT day, revenue,\n  AVG(revenue) OVER (\n    ORDER BY day\n    ROWS BETWEEN 6 PRECEDING\n         AND CURRENT ROW\n  ) AS avg_7d\nFROM d;\n```\n\nPoint out the trap: ROWS counts rows, so a day with no orders is skipped and the window covers more than 7 calendar days. Join to a calendar table first, or use a RANGE window on dates where your database supports it. The first 6 days average fewer than 7 values.',
          lookFor: 'Daily aggregation first, the right window frame, and the missing-days trap.',
          criteria: [
            'Aggregates to one row per day',
            'ROWS BETWEEN 6 PRECEDING AND CURRENT ROW',
            'Mentions missing days and a calendar table',
            'Notes the first 6 days are partial',
          ],
          round: 'Common SQL pattern',
        },
      ],
    },
    {
      id: 'excel-bi',
      title: 'Excel, Power BI and Tableau',
      blurb:
        'Services firms test Excel and Power BI in depth. EY candidates reported DAX, data modelling and row-level security; eClerx and EY asked about lookups and pivots. Know the “why”, not just the button.',
      questions: [
        {
          q: 'What is the difference between VLOOKUP, HLOOKUP, INDEX-MATCH and XLOOKUP? (Asked at eClerx, per Glassdoor)',
          answer:
            'VLOOKUP searches the first column of a range and returns a value from a column to the right. HLOOKUP does the same across rows. With a hard-coded index number, VLOOKUP breaks when columns are inserted (HLOOKUP when rows are), and neither can look left or up.\n\nINDEX-MATCH combines MATCH (find the position) with INDEX (return the value at that position), so it can look in any direction and survives inserted columns.\n\nXLOOKUP, in newer Excel, does both in one function, defaults to an exact match, can search from the bottom, and has a built-in “if not found” value. Use XLOOKUP when the client’s Excel supports it, INDEX-MATCH otherwise.',
          lookFor:
            'The limitations of VLOOKUP, why INDEX-MATCH is more robust, and what XLOOKUP adds.',
          criteria: [
            'VLOOKUP cannot look left and breaks on inserted columns',
            'INDEX-MATCH explained as position + value',
            'XLOOKUP: exact match default, if-not-found',
          ],
          reportedAt: 'Apr 2025',
          round: 'Round 1: Technical',
          source: {
            label: 'Glassdoor',
            url: 'https://www.glassdoor.ie/Interview/eClerx-Interview-E230253-RVW96900361.htm',
          },
        },
        {
          q: 'How do you use pivot tables to summarise data, and how do you remove duplicates in Excel? (Asked at eClerx, per Glassdoor)',
          answer:
            'Pivot table: convert the data to a Table first so new rows are included, then put the category in Rows, the measure in Values (Sum or Count), and the date grouped by month in Columns. Use Show Values As for % of total.\n\nDuplicates: Data → Remove Duplicates, choosing the columns that define a duplicate. Before deleting, flag them with COUNTIFS or the UNIQUE function so you can check what you are removing.\n\nMention that you keep the raw data untouched on its own sheet.',
          lookFor:
            'A practical pivot setup, defining which columns make a duplicate, and keeping raw data safe.',
          criteria: [
            'Source data as a Table',
            'Rows, Values and grouped dates set correctly',
            'Chooses duplicate columns deliberately',
            'Checks before deleting; keeps raw data',
          ],
          reportedAt: 'Apr 2025',
          round: 'Round 1: Technical',
          source: {
            label: 'Glassdoor',
            url: 'https://www.glassdoor.ie/Interview/eClerx-Interview-E230253-RVW96900361.htm',
          },
        },
        {
          q: 'Given student names and marks, use VLOOKUP to fetch values, then build a pivot and find the count on it. (Asked at EY, per LeetCode Discuss)',
          answer:
            'This is a live task, so talk while you work. For the lookup: =VLOOKUP(name, A:B, 2, FALSE); explain that FALSE forces an exact match, which is the most common VLOOKUP mistake.\n\nFor the pivot: Insert → PivotTable, put a grouping (class or grade band) in Rows and the student name in Values set to Count.\n\nIf you have time, show a check: COUNTA of the names should equal the pivot’s grand total.',
          lookFor:
            'Exact match in VLOOKUP, a correct pivot with Count, and a quick reconciliation.',
          criteria: [
            'Uses FALSE / exact match',
            'Pivot with Count, not Sum, of names',
            'Checks the total against COUNTA',
          ],
          reportedAt: 'Jul 2022',
          round: 'Technical round (70 min)',
          source: {
            label: 'LeetCode Discuss',
            url: 'https://leetcode.com/discuss/post/2418234/ey-data-analyst-mumbai-july-2022-offer',
          },
        },
        {
          q: 'Show me a project in Excel: share your screen and walk me through it. (Asked at Flipkart, per Glassdoor)',
          answer:
            'Have one file ready before the interview. Open with the business question in one sentence and the answer in one sentence.\n\nThen walk through the structure: a raw data sheet you never edit, a cleaning sheet, a calculations sheet, and an output sheet with the pivot or chart. Show one formula you are proud of and why you chose it.\n\nEnd with what you would do differently with more time or a database.',
          lookFor: 'Preparation, answer first, a clean sheet structure, and honest reflection.',
          criteria: [
            'Question and answer stated up front',
            'Raw, clean, calc and output separated',
            'Explains one formula choice',
            'Says what they would improve',
          ],
          reportedAt: 'Sep 2024',
          round: 'Interview (fresher)',
          source: {
            label: 'Glassdoor',
            url: 'https://www.glassdoor.co.in/Interview/Flipkart-Interview-E300494-RVW91154344.htm',
          },
        },
        {
          q: 'What is the difference between Import mode and DirectQuery in Power BI? (Asked at EY, per Glassdoor)',
          answer:
            'Import copies the data into the Power BI model. It is fast and supports all DAX, but the data is only as fresh as the last scheduled refresh and the model has size limits.\n\nDirectQuery leaves the data in the source and sends a query every time someone uses a visual. Data is current, but reports are slower, some DAX and transformations are limited, and the source database takes the load.\n\nPick Import for most reports; DirectQuery for very large or near-real-time data. Mention composite models, which mix both.',
          lookFor: 'Freshness vs speed trade-off, DAX limits, source load, and when to use each.',
          criteria: [
            'Import: copied, fast, refresh-dependent',
            'DirectQuery: live, slower, limited',
            'A rule for choosing',
            'Mentions composite models',
          ],
          round: 'Power BI technical (interviewed Nov 2025)',
          source: {
            label: 'Glassdoor',
            url: 'https://www.glassdoor.co.nz/Interview/EY-Data-Analyst-Intern-Interview-Questions-EI_IE2784.0,2_KO3,22.htm',
          },
        },
        {
          q: 'What is the difference between SUM and SUMX? And between a measure and a calculated column? (Asked at EY, per Glassdoor)',
          answer:
            'SUM adds up one column. SUMX is an iterator: it goes row by row through a table, evaluates an expression (such as quantity × price), then adds the results. Use SUMX when the value you need does not exist as a column.\n\nA calculated column is computed once per row at refresh and stored in the model, so it uses memory and can be used to slice. A measure is computed at query time for whatever filters are on the visual, so it responds to slicers and stores nothing.\n\nRule of thumb: prefer measures for anything you aggregate.',
          lookFor:
            'Row-by-row iteration for SUMX, and storage vs query-time evaluation for column vs measure.',
          criteria: [
            'SUMX iterates rows then sums',
            'Gives an example (quantity × price)',
            'Column stored at refresh; measure at query time',
            'Prefers measures for aggregates',
          ],
          round: 'DAX technical (interviewed Nov 2025)',
          source: {
            label: 'Glassdoor',
            url: 'https://www.glassdoor.co.nz/Interview/EY-Data-Analyst-Intern-Interview-Questions-EI_IE2784.0,2_KO3,22.htm',
          },
        },
        {
          q: 'What is RLS, and how do you improve the performance of a Power BI report? (Asked at EY, per Glassdoor)',
          answer:
            'Row-level security restricts which rows a user can see. You define roles with DAX filters in Power BI Desktop (for example Region = “West”), or dynamic roles using USERPRINCIPALNAME(), then assign people to roles in the Power BI service.\n\nPerformance: use a star schema, remove unused columns, reduce cardinality (split date-time into date and time), prefer measures over calculated columns, limit visuals per page, and use Performance Analyzer to find the slow visual and its DAX.\n\nSay you test RLS with “View as role” before publishing.',
          lookFor:
            'Static vs dynamic RLS, practical performance fixes, and measuring before optimising.',
          criteria: [
            'Defines RLS and roles',
            'Mentions dynamic RLS',
            'Three or more concrete performance fixes',
            'Uses Performance Analyzer or “View as role”',
          ],
          round: 'Power BI technical (interviewed Nov 2025)',
          source: {
            label: 'Glassdoor',
            url: 'https://www.glassdoor.co.nz/Interview/EY-Data-Analyst-Intern-Interview-Questions-EI_IE2784.0,2_KO3,22.htm',
          },
        },
        {
          q: 'How do you decide which kind of chart suits a problem? (Asked at Google, per Glassdoor)',
          answer:
            'Start from the question the chart must answer. Change over time: a line chart. Comparing categories: a sorted bar chart. Part of a whole: a stacked bar, or a pie only for two or three parts. Relationship between two numbers: a scatter plot. Distribution: a histogram or box plot.\n\nThen cut clutter: one message per chart, a title that states the finding, labels on the data instead of a legend where possible, and colour only to highlight.\n\nGive an example of a chart you changed because the first version confused people.',
          lookFor: 'Question-first chart choice, decluttering, and a real example.',
          criteria: [
            'Starts from the question',
            'Matches at least four question types to charts',
            'Title states the finding; colour highlights',
            'A real example',
          ],
          round: 'Interview',
          source: {
            label: 'Glassdoor',
            url: 'https://static-pc.glassdoor.fr/Interview/Google-Data-Analyst-Interview-Questions-EI_IE9079.0,6_KO7,19_IP3.htm',
          },
        },
        {
          q: 'How do you do data modelling in Power BI? (Asked at Deloitte, per Glassdoor)',
          answer:
            'Aim for a star schema: one fact table of events or transactions (orders, with amounts and keys) surrounded by dimension tables that describe them (customer, product, date, store).\n\nSteps: clean in Power Query, create a proper date table and mark it, set one-to-many relationships from dimensions to the fact with single-direction filters, and hide the key columns from report users.\n\nExplain why: a star schema keeps DAX simple and reports fast, while one wide flat table or many-to-many relationships cause wrong totals and slow visuals.',
          lookFor: 'Fact vs dimension, a date table, relationship direction, and why it matters.',
          criteria: [
            'Star schema with fact and dimensions',
            'A marked date table',
            'One-to-many, single-direction relationships',
            'Explains the effect on DAX and speed',
          ],
          reportedAt: 'Mar 2026',
          round: 'Technical',
          source: {
            label: 'Glassdoor',
            url: 'https://www.glassdoor.co.in/Interview/Deloitte-Interview-E2763-RVW96413379.htm',
          },
        },
        {
          q: 'What does CALCULATE do in DAX, and what is filter context?',
          answer:
            'Filter context is the set of filters active when a measure is evaluated: the row and column of the visual, slicers, and page or report filters. The same measure, such as [Total Sales], shows a different number in every cell because each cell has a different filter context.\n\nCALCULATE evaluates an expression in a modified filter context. CALCULATE([Total Sales], Region = "West") adds or replaces a filter; CALCULATE([Total Sales], ALL(Product)) removes the product filter, which is how you build “% of total”.\n\nGive one practical measure out loud, such as share of category: DIVIDE([Total Sales], CALCULATE([Total Sales], ALL(Product[Name]))).',
          lookFor:
            'A clear definition of filter context, CALCULATE as the way to change it, and a working example.',
          criteria: [
            'Explains filter context with a visual example',
            'CALCULATE adds, replaces or removes filters',
            'Uses ALL for a % of total',
            'Uses DIVIDE to avoid divide-by-zero',
          ],
          round: 'Common Power BI question',
        },
        {
          q: 'Write a measure for sales growth versus the same period last year.',
          answer:
            "You need a proper date table, marked as the date table and related to the fact table.\n\nThen: Sales LY = CALCULATE([Total Sales], SAMEPERIODLASTYEAR('Date'[Date])). Growth = DIVIDE([Total Sales] - [Sales LY], [Sales LY]).\n\nMention the traps: without a continuous date table time intelligence returns wrong or blank values, and a partial current month compares against a full month last year, so you may need to limit last year to the same number of days.",
          lookFor:
            'A marked date table, SAMEPERIODLASTYEAR inside CALCULATE, DIVIDE, and the partial-period trap.',
          criteria: [
            'Requires a marked, continuous date table',
            'SAMEPERIODLASTYEAR inside CALCULATE',
            'Growth with DIVIDE',
            'Flags the partial-period comparison',
          ],
          round: 'Common Power BI question',
        },
        {
          q: 'What are level of detail (LOD) expressions in Tableau? When would you use FIXED?',
          answer:
            'LOD expressions compute an aggregate at a level different from the view. FIXED computes at the dimensions you name, whatever is on the view; INCLUDE adds a dimension to the view’s level; EXCLUDE removes one.\n\nClassic use of FIXED: each customer’s first order date, { FIXED [Customer ID] : MIN([Order Date]) }, which lets you build cohorts by first-purchase month on any chart.\n\nMention that FIXED is computed before most filters unless they are context filters, so a regular filter will not change it.',
          lookFor:
            'The three LOD types, a real FIXED example such as cohorts, and how filters interact.',
          criteria: [
            'Explains FIXED, INCLUDE and EXCLUDE',
            'Gives a cohort or first-order example',
            'Knows FIXED ignores normal filters unless they are context filters',
          ],
          round: 'Common Tableau question',
        },
      ],
    },
    {
      id: 'stats',
      title: 'Statistics and A/B tests',
      blurb:
        'Product companies ask how you would know a change worked. Keep it practical: the hypothesis, the metric, the sample, significance, and the guardrail you would watch.',
      questions: [
        {
          q: 'How do you measure whether an experiment (A/B test) succeeded? (Asked at Uber, per Glassdoor)',
          answer:
            'Before the test: write the hypothesis, pick one primary metric (for example orders per user) and one or two guardrails (cancellations, delivery time), and estimate the sample size you need for the smallest change worth detecting.\n\nDuring: randomise at the right unit (user, not session), check that the groups look alike, and do not stop early because the numbers look good.\n\nAfter: compare the primary metric with a significance test and a confidence interval, check the guardrails, and check big segments. Ship only if the primary metric improves and no guardrail gets worse.',
          lookFor:
            'Pre-registered metric and guardrail, sample size, proper randomisation, no peeking, and a clear ship rule.',
          criteria: [
            'Hypothesis and one primary metric',
            'Guardrail metrics',
            'Sample size and no early stopping',
            'Significance plus a ship decision',
          ],
          reportedAt: 'Apr 2026',
          round: 'Interview',
          source: {
            label: 'Glassdoor',
            url: 'https://www.glassdoor.co.in/Interview/Uber-Interview-E575263-RVW94688520.htm',
          },
        },
        {
          q: 'How do we determine whether X is better than Y? What are the objectives first, and how would you think about stratified sampling here? (Asked at Meta in a Staff Data Analyst loop, per Exponent on aced.io)',
          answer:
            'Start with what “better” means for the business: more engagement, more revenue, fewer complaints. Choose the metric that represents it and agree the time frame.\n\nThen design the comparison: ideally a randomised test; if not possible, a careful before-and-after with a comparison group.\n\nStratified (blocked) randomisation: if users differ a lot by segment (country, new vs returning, platform), randomise within each segment so both groups get the same mix. That reduces noise and stops one group being, by chance, full of heavy users. Analyse per segment and overall.',
          lookFor:
            'Objective before method, a fair comparison, and why stratifying reduces variance and imbalance.',
          criteria: [
            'Defines “better” as a metric',
            'Randomised design or a fair comparison',
            'Explains stratified (blocked) randomisation',
            'Analyses per segment and overall',
          ],
          round: 'Final: statistics and experimentation',
          source: {
            label: 'Exponent (aced.io)',
            url: 'https://www.aced.io/experiences/meta-facebook-staff-data-analyst-interview-181203',
          },
        },
        {
          q: 'State the null and alternative hypotheses if Flipkart moves customers from credit cards to UPI, and the metrics you would check. (Asked at Swiggy in a Business Analyst loop, per AmbitionBox)',
          answer:
            'Pick the business outcome first. If the goal is fewer failed payments: the null hypothesis is that the payment success rate is the same with UPI as with cards; the alternative is that it is different (or higher, for a one-sided test).\n\nPrimary metric: payment success rate. Guardrails: checkout conversion, average order value (card users may buy more on EMI), refund and dispute rate, and payment cost per order.\n\nSay you would test it on a random share of users and check segments such as order value bands, because high-value buyers may need cards for EMI.',
          lookFor:
            'A correctly stated H0 and H1 tied to one metric, sensible guardrails, and a segment risk.',
          criteria: [
            'H0 “no difference”, H1 “difference” on one metric',
            'Primary metric tied to the goal',
            'At least two guardrails',
            'Notes a segment risk (EMI, high value)',
          ],
          reportedAt: 'Feb 2024',
          round: 'Round 2: Technical',
          source: {
            label: 'AmbitionBox',
            url: 'https://www.ambitionbox.com/interviews/swiggy-interview-questions/business-analyst',
          },
        },
        {
          q: 'A test shows a p-value of 0.03 and a 95% confidence interval of +0.4 to +3.2 points. What does that mean? What are Type I and Type II errors?',
          answer:
            'If there were truly no difference, a result at least this extreme would happen about 3% of the time. Below the usual 0.05 threshold, so we call it statistically significant. It is not the probability that the change works.\n\nThe interval says the true lift is plausibly between 0.4 and 3.2 points. It excludes zero, which matches p < 0.05, but the low end is small: decide whether +0.4 would still be worth shipping.\n\nType I error: a false positive, shipping a change that does nothing (its rate is the 5% threshold). Type II error: a false negative, missing a real effect, usually because the sample was too small.',
          lookFor:
            'A correct reading of the p-value, using the interval for business judgement, and both error types.',
          criteria: [
            'Correct p-value definition, not “probability it works”',
            'Reads the interval and its low end',
            'Type I = false positive',
            'Type II = false negative, linked to sample size',
          ],
          round: 'Common statistics question',
        },
        {
          q: 'Explain correlation versus causation to a non-technical manager, with a business example.',
          answer:
            'Two numbers moving together does not mean one causes the other. A hidden factor can drive both, or the direction can run the other way.\n\nBusiness example: customers who open our emails buy more. That may be because loyal customers both open emails and buy more, not because the emails work. To know, send the email to a random half and hold out the other half, then compare purchases.\n\nKeep it to three sentences and end with the test you would run.',
          lookFor:
            'A plain explanation, a business example with a hidden factor, and a test to settle it.',
          criteria: [
            'Plain-language definition',
            'Names a hidden factor or reverse direction',
            'Proposes a holdout or A/B test',
          ],
          round: 'Common question',
        },
      ],
    },
    {
      id: 'cases',
      title: 'Metric and product cases',
      blurb:
        'The question that separates analysts: a number moved, find out why. Use one order every time: check the data, split the metric, check internal changes, then external ones, then segment.',
      questions: [
        {
          q: 'The SLA is stable, but customer complaints have increased. What could be wrong? (Asked at Uber, per Glassdoor)',
          answer:
            'First check the data: did the complaint form, category list or tracking change? Is the rise in absolute complaints or in complaints per order (orders may simply be up)?\n\nThen ask whether the SLA measures what customers feel. An average can stay flat while the slow tail grows; check the 90th percentile and late-order share. Customers may also complain about things the SLA does not cover: wrong items, rude partners, refunds, app bugs.\n\nSplit complaints by type, city, partner and app version to find where the rise sits. Recommend by cause, and suggest adding the missing measure to the SLA.',
          lookFor:
            'Data check first, average vs tail, complaints the SLA ignores, and segmentation to find the cause.',
          criteria: [
            'Checks data and normalises per order',
            'Looks at the tail, not just the average',
            'Lists causes outside the SLA',
            'Segments to locate the rise',
          ],
          reportedAt: 'Apr 2026',
          round: 'Interview',
          source: {
            label: 'Glassdoor',
            url: 'https://www.glassdoor.co.in/Interview/Uber-Interview-E575263-RVW94688520.htm',
          },
        },
        {
          q: 'How do you define and track a north-star metric? What would you track for a delivery or logistics system? (Asked at Uber, per Glassdoor)',
          answer:
            'A north-star metric captures the value customers get and predicts long-term revenue. For delivery: completed on-time deliveries per week is a strong candidate, because it needs demand, supply and reliability to all work.\n\nUnder it, track drivers: orders placed, acceptance rate, pickup and delivery times, on-time %, cancellations. Add guardrails: cost per delivery, partner earnings per hour and complaints, so you do not grow the metric by burning money or partners.\n\nTrack it weekly by city in one dashboard with targets.',
          lookFor: 'A value-based north star, a driver tree under it, and guardrails.',
          criteria: [
            'Explains what makes a good north star',
            'Proposes one for delivery with a reason',
            'Lists driver metrics',
            'Adds cost and quality guardrails',
          ],
          reportedAt: 'Apr 2026',
          round: 'Interview',
          source: {
            label: 'Glassdoor',
            url: 'https://www.glassdoor.co.in/Interview/Uber-Interview-E575263-RVW94688520.htm',
          },
        },
        {
          q: 'Why did Flipkart’s revenue drop 20% in December compared with November? (Asked at Swiggy in a Business Analyst loop, per AmbitionBox)',
          answer:
            'Clarify: gross merchandise value or net revenue? All categories? Compared with last December too?\n\nThen think seasonality first. In India, October–November often carries the festive sale season, so December can be lower every year. Compare December with last December, not just with November.\n\nIf it is a real drop: split revenue into visitors × conversion × orders per buyer × order value. Check internal causes (fewer sales events, pricing, app issues, delivery delays) and external ones (competitor sales, payment problems). Segment by category, city and new vs returning users, then recommend by cause.',
          lookFor:
            'Seasonality before alarm, year-on-year comparison, a revenue formula, and segmented causes.',
          criteria: [
            'Clarifies the metric and baseline',
            'Raises festive seasonality and compares YoY',
            'Splits revenue into drivers',
            'Internal vs external causes, then segments',
          ],
          round: 'Round 4: One-on-one',
          source: {
            label: 'AmbitionBox',
            url: 'https://www.ambitionbox.com/interviews/swiggy-interview-questions/business-analyst',
          },
        },
        {
          q: 'Do a root-cause analysis of a drop in click-through rate (CTR) on YouTube. (Asked at Swiggy in a Business Analyst loop, per AmbitionBox)',
          answer:
            'CTR = clicks ÷ impressions, so it can fall because clicks fell or because impressions rose. Check which.\n\nIf impressions jumped (a new surface or autoplay change shows more thumbnails), CTR can fall while total clicks rise: that may be fine. If clicks fell, check the data pipeline, then internal changes (a new ranking model, thumbnail layout, app release) and external ones (a holiday, a competitor event).\n\nSegment by surface (home, search, suggested), device, country and creator type. Recommend a rollback or test for the change that lines up with the drop.',
          lookFor:
            'Decomposing a ratio into numerator and denominator, and segmenting by surface and device.',
          criteria: [
            'Splits CTR into clicks and impressions',
            'Notes a CTR drop can be harmless',
            'Internal and external causes',
            'Segments by surface and device',
          ],
          round: 'Round 3: Case study',
          source: {
            label: 'AmbitionBox',
            url: 'https://www.ambitionbox.com/interviews/swiggy-interview-questions/business-analyst',
          },
        },
        {
          q: 'A product is not getting the downloads it was expected to. What would you look at, and what would you suggest? (Asked at Amazon in a Data Analyst intern loop, per Glassdoor)',
          answer:
            'First question the forecast: what was it based on, and is it still valid?\n\nThen walk the funnel: store impressions → store page views → installs → first open. Find the step where the gap sits. Low impressions point to discoverability (search ranking, ads); low page-to-install conversion points to the store page (screenshots, ratings, app size); low opens point to onboarding or a bug.\n\nSegment by channel, country and device. Suggest one test per weak step, such as new screenshots or a smaller app size, and the metric you would watch.',
          lookFor: 'Questioning the target, a funnel to locate the gap, and a test per weak step.',
          criteria: [
            'Checks the forecast assumption',
            'Uses an install funnel',
            'Segments by channel and device',
            'Proposes tests with a metric',
          ],
          round: 'Technical: SQL + Python + analytics',
          source: {
            label: 'Glassdoor',
            url: 'https://www.glassdoor.com.au/Interview/Amazon-Data-Analyst-Intern-Interview-Questions-EI_IE6036.0,6_KO7,26.htm',
          },
        },
        {
          q: 'If we send emails to customers, how would you think about engagement? Which metrics matter, how would they show up in the data, and how would you code them? (Asked at Meta in a Staff Data Analyst loop, per Exponent on aced.io)',
          answer:
            'Start from the email’s goal (bring people back, sell, inform). Then the funnel: delivered → opened → clicked → did the target action (a session, a purchase) within N days. Opens are unreliable because of privacy features, so lean on clicks and downstream actions.\n\nAdd guardrails: unsubscribes and spam complaints.\n\nIn the data: an email_events table (user, email_id, event_type, timestamp) joined to product events. Code it with conditional counts per email, and measure the real effect against a holdout group that did not get the email.',
          lookFor:
            'Goal-driven metrics, unreliable opens, guardrails, a concrete data model, and a holdout for causality.',
          criteria: [
            'Ties metrics to the email’s goal',
            'Funnel to a downstream action',
            'Unsubscribe / spam guardrails',
            'Describes tables and a holdout group',
          ],
          round: 'Phone interview',
          source: {
            label: 'Exponent (aced.io)',
            url: 'https://www.aced.io/experiences/meta-facebook-staff-data-analyst-interview-181203',
          },
        },
        {
          q: 'For a product like Instagram, what are we analysing, which metrics matter, how would you set a target, and what guardrails would you watch? (Asked at Meta in a Staff Data Analyst loop, per Exponent on aced.io)',
          answer:
            'Pick a surface and its goal, for example Reels: help people find short videos they enjoy.\n\nMetrics: daily users of Reels, time spent per user, and a quality signal such as shares or follows from Reels. Choose one as primary.\n\nTarget: base it on the trend, seasonality and the expected effect of planned launches, not a round number. Guardrails: overall app time (did Reels just steal from Feed?), creator posting, reports and well-being signals such as late-night use. Say you would review the target each quarter.',
          lookFor:
            'A clear goal per surface, a primary metric, a target method, and cannibalisation and quality guardrails.',
          criteria: [
            'States the surface and its goal',
            'Picks one primary metric',
            'Explains how to set the target',
            'Guardrails including cannibalisation',
          ],
          round: 'Final: product sense',
          source: {
            label: 'Exponent (aced.io)',
            url: 'https://www.aced.io/experiences/meta-facebook-staff-data-analyst-interview-181203',
          },
        },
        {
          q: 'Calculate the cost per order and rider earnings city by city. (Asked at Zomato in an Analyst loop, per AmbitionBox)',
          answer:
            'Agree the definitions: cost per order = total rider payouts (base pay + distance pay + incentives) ÷ delivered orders; rider earnings per hour = payouts ÷ logged-in hours.\n\nIn SQL or a pivot: group payouts, orders and hours by city and week, then divide. Show both side by side, because pushing cost per order down usually pushes earnings down too.\n\nPoint out what drives the differences: distance per order, orders per hour (batching), incentive spend at peak, and rain or festival days. Recommend where cost can fall without cutting earnings, such as better batching.',
          lookFor:
            'Clear definitions, the two metrics side by side, the drivers behind city differences, and a balanced recommendation.',
          criteria: [
            'Defines both metrics',
            'Groups by city and period',
            'Explains the cost vs earnings tension',
            'Names drivers and a fix',
          ],
          reportedAt: 'Dec 2022',
          round: 'Round 3: Case study',
          source: {
            label: 'AmbitionBox',
            url: 'https://ambitionbox.com/interviews/zomato-interview-questions/analyst',
          },
        },
      ],
    },
    {
      id: 'guesstimates-python',
      title: 'Guesstimates, Python and data cleaning',
      blurb:
        'Consulting and analytics firms (ZS, Mu Sigma) and some campus loops (PhonePe) add guesstimates. Product loops add pandas. For guesstimates, state each assumption with a number and do the arithmetic out loud.',
      questions: [
        {
          q: 'How many pizzas are sold in one day in Pune? (Asked at ZS, role not stated, per AmbitionBox)',
          answer:
            'Choose a structure: people × share who eat pizza in a day. Assume Pune’s population is about 7 million (state it as an assumption).\n\nSegment: say 40% are 15–40 and urban-affluent enough to buy pizza often. If they eat pizza about once a fortnight, that is 7M × 0.4 ÷ 14 ≈ 200,000 people a day; at about 1.5 people per pizza that is roughly 130,000 pizzas. Add a smaller older and younger segment at once a month.\n\nSanity-check from supply: outlets × pizzas per outlet per day. If both land in the same range, you are done.',
          lookFor:
            'A clear structure, stated assumptions, clean arithmetic, and a supply-side sanity check.',
          criteria: [
            'States a structure before numbers',
            'Segments the population',
            'Arithmetic is correct out loud',
            'Cross-checks with a supply view',
          ],
          round: 'Fit round with manager / principal',
          source: {
            label: 'AmbitionBox',
            url: 'https://ambitionbox.com/interviews/zs-interview-questions/data-analyst?page=2',
          },
        },
        {
          q: 'How much paint would you need for a 10 × 10 × 10 m room? (Asked at ZS, role not stated, per AmbitionBox)',
          answer:
            'Clarify: paint the four walls only, or the ceiling too? Any doors and windows? One coat or two?\n\nFour walls: 4 × 10 × 10 = 400 m². Add the ceiling: 500 m². Subtract roughly 10% for a door and windows, so about 450 m².\n\nCoverage: assume one litre covers about 10 m² per coat. Two coats: 450 × 2 ÷ 10 = 90 litres. Add 10% for waste: about 100 litres.',
          lookFor: 'Clarifying scope, clean geometry, a coverage assumption, and coats plus waste.',
          criteria: [
            'Clarifies walls, ceiling, openings',
            'Correct area',
            'States coverage per litre',
            'Includes coats and waste',
          ],
          round: 'Video interview: HR + guesstimates',
          source: {
            label: 'AmbitionBox',
            url: 'https://ambitionbox.com/interviews/zs-interview-questions/data-analyst?page=2',
          },
        },
        {
          q: 'How many people watched Ramayana or Mahabharat in the first month of the 2020 Covid lockdown? (Asked at ZS, role not stated, per AmbitionBox)',
          answer:
            'Structure by TV households: India has roughly 200 million TV households (an assumption to state). Most were at home during lockdown, and the re-runs were on the national broadcaster.\n\nAssume 40–50% of TV households tuned in at least once in the month, and about 3–4 viewers per household. That gives roughly 200M × 0.45 × 3.5 ≈ 300 million people.\n\nSay what would change it (cable vs free-to-air reach, repeat viewers) and how you would check: published broadcast ratings data for that period.',
          lookFor:
            'A household-based structure, reach and household size assumptions, and a named way to verify.',
          criteria: [
            'Structures by households or population',
            'States reach and viewers per household',
            'Arithmetic out loud',
            'Names a source to verify',
          ],
          round: 'Behavioural round (as labelled by the reviewer)',
          source: {
            label: 'AmbitionBox',
            url: 'https://ambitionbox.com/interviews/zs-interview-questions/data-analyst?page=2',
          },
        },
        {
          q: 'Given customer orders with several dishes each, find the pair of dishes that appear together in the most orders. (Asked at Swiggy in a Data Science intern loop, per Glassdoor)',
          answer:
            'In pandas: group dishes by order_id into lists, then generate every pair within each order with itertools.combinations on the sorted list (sorting makes (A, B) and (B, A) the same). Count pairs with a Counter or value_counts and take the top one.\n\nIn SQL: self-join the order_items table on order_id where a.dish_id < b.dish_id, GROUP BY the pair and ORDER BY COUNT(*) DESC.\n\nMention scale: orders with many items create many pairs, so filter rare dishes first. The business use: combo offers and “frequently ordered together”.',
          lookFor:
            'Pairs within an order, de-duplicating (A, B) vs (B, A), and a scale and business note.',
          criteria: [
            'Generates pairs per order',
            'Sorts or uses a < b to avoid double counting',
            'Counts and takes the top pair',
            'Notes scale or business use',
          ],
          reportedAt: 'Jun 2026',
          round: 'Round 1: Python / SQL',
          source: {
            label: 'Glassdoor',
            url: 'https://www.glassdoor.co.in/Interview/Swiggy-Interview-E952680-RVW80121977.htm',
          },
        },
        {
          q: 'What is a DataFrame in pandas? (Asked at Tiger Analytics in a Senior Data Analyst loop, per Glassdoor)',
          answer:
            'A DataFrame is a two-dimensional table in pandas: labelled columns, each with its own data type, and an index for the rows. Think of it as a spreadsheet or SQL table in Python.\n\nThen show you use it: read_csv to load, head and info to inspect, boolean filters to select rows, groupby with agg to summarise, merge to join, and isna with fillna or dropna for missing values.\n\nA senior answer adds a caution: check dtypes after loading, because numbers read as text break sums silently.',
          lookFor: 'A clear definition plus the everyday operations, and a practical caution.',
          criteria: [
            'Table with typed columns and an index',
            'Names load, filter, groupby, merge',
            'Handles missing values',
            'Mentions checking dtypes',
          ],
          reportedAt: 'Jun 2024',
          round: 'Python, after project deep-dive',
          source: {
            label: 'Glassdoor',
            url: 'https://static.glassdoor.co.in/Interview/Tiger-Analytics-Interview-E717029-RVW88618677.htm',
          },
        },
        {
          q: 'Create two datasets of your own, turn them into DataFrames, merge them, then drop rows with missing values. (Asked at EY, per LeetCode Discuss)',
          answer:
            'Build two small dicts and wrap them in pd.DataFrame: customers (id, name, city) and orders (order_id, customer_id, amount). Include one customer with no orders and one order with a missing amount on purpose.\n\nMerge: pd.merge(customers, orders, left_on="id", right_on="customer_id", how="left"). Explain why how="left" keeps customers without orders.\n\nThen think before dropping. After the left merge, the customer with no orders also has a missing amount, so df.dropna(subset=["amount"]) removes them too. Say which you want: drop only orders with a missing amount (filter the orders table first, or use an inner merge), or keep the customer and fill amount with 0. Print shapes before and after.',
          lookFor:
            'Working code, a deliberate join type, a targeted dropna, and row counts before and after.',
          criteria: [
            'Creates DataFrames correctly',
            'Chooses and explains the merge type',
            'Knows dropna after a left merge also drops unmatched rows',
            'Checks shapes before and after',
          ],
          reportedAt: 'Jul 2022',
          round: 'Technical round (70 min)',
          source: {
            label: 'LeetCode Discuss',
            url: 'https://leetcode.com/discuss/post/2418234/ey-data-analyst-mumbai-july-2022-offer',
          },
        },
        {
          q: 'How do you handle missing values and outliers in a dataset?',
          answer:
            'First find out why they are missing or extreme, because the reason decides the fix. Profile each column: share missing, and whether missingness depends on something (one app version, one city).\n\nMissing values: drop rows only when few are missing at random; otherwise fill with a sensible value (median, 0 where 0 is true, last known value for time series) and add a flag column so the fill is visible.\n\nOutliers: check whether they are errors (a ₹10 crore order from a test account) or real (a bulk buyer). Fix or remove errors; keep real ones, but report the median alongside the mean or cap them for the analysis. Always say what you changed and how many rows it touched.',
          lookFor:
            'Diagnosing the cause first, choosing a fix by cause, and being transparent about what changed.',
          criteria: [
            'Profiles missingness and asks why',
            'Chooses drop vs fill deliberately, with a flag',
            'Separates error outliers from real ones',
            'Reports what changed and how many rows',
          ],
          round: 'Common data-cleaning question',
        },
      ],
    },
    {
      id: 'behavioural',
      title: 'Explaining and behavioural',
      blurb:
        'Analysts are judged on whether people act on their numbers. Prepare four stories with numbers: an insight that changed a decision, a number you got wrong, a stakeholder who disagreed, and a messy dataset you cleaned.',
      questions: [
        {
          q: 'How would you analyse a large dataset to find trends and present the insights to non-technical stakeholders? (Asked at Microsoft, per Glassdoor)',
          answer:
            'Analysis: agree the question, profile the data (size, gaps, duplicates), aggregate to the level that matters (week, region, segment), and look for changes over time and differences between segments. Check that a trend survives seasonality and a few outliers.\n\nPresenting: lead with the answer in one sentence, then the two numbers that prove it, one chart with a title that states the finding, and the decision you recommend.\n\nUse an example from your own work and say what the audience did next.',
          lookFor:
            'A structured analysis, robustness checks, an answer-first story, and a real outcome.',
          criteria: [
            'Agrees the question and profiles data',
            'Checks seasonality and outliers',
            'Answer first, few numbers, one chart',
            'Ends with the decision taken',
          ],
          reportedAt: 'Jan 2026',
          round: 'Final case study discussion',
          source: {
            label: 'Glassdoor',
            url: 'https://www.glassdoor.ie/Interview/Microsoft-Interview-E1651-RVW100187837.htm',
          },
        },
        {
          q: 'How do you validate your insights before presenting them? What is your approach to root-cause analysis? (Asked at Uber, per Glassdoor)',
          answer:
            'Validation: reconcile totals to a trusted source (finance, a known dashboard), re-run the key number a second way, check the data for gaps or duplicates in the period, and ask whether the effect holds across segments and time. Have a colleague sanity-check anything surprising.\n\nRoot cause: confirm the change is real, split the metric into its drivers, find which driver moved, then check internal changes (releases, pricing, operations) and external ones (season, competitors), and segment until the cause is narrow enough to act on.\n\nGive one example where validation caught an error.',
          lookFor: 'Concrete validation habits, a repeatable root-cause order, and an example.',
          criteria: [
            'Reconciles to a trusted source',
            'Checks the number a second way',
            'A repeatable root-cause order',
            'A real example of catching an error',
          ],
          reportedAt: 'Apr 2026',
          round: 'Interview',
          source: {
            label: 'Glassdoor',
            url: 'https://www.glassdoor.co.in/Interview/Uber-Interview-E575263-RVW94688520.htm',
          },
        },
        {
          q: 'How do you make your colleagues trust you? (Asked at Uber, per Glassdoor)',
          answer:
            'For an analyst, trust comes from numbers that hold up and from saying what you are unsure of.\n\nGive habits: document how each metric is defined, show the query or source behind a number, flag caveats up front, deliver when you said you would, and correct mistakes quickly and openly.\n\nTell one short story: a time you found an error in your own work, told people before they found it, and fixed it. That is usually the moment trust was built.',
          lookFor: 'Reliability, transparency about method and uncertainty, and owning errors.',
          criteria: [
            'Documents definitions and sources',
            'States caveats up front',
            'Delivers on commitments',
            'A story of owning an error',
          ],
          reportedAt: 'Jan 2025',
          round: 'Interviews with future colleagues',
          source: {
            label: 'Glassdoor',
            url: 'https://www.glassdoor.co.in/Interview/Uber-Interview-E575263-RVW94688520.htm',
          },
        },
        {
          q: 'How do you take criticism? (Asked at PhonePe, per AmbitionBox)',
          answer:
            'Show that you separate the work from yourself. Say you ask what specifically is wrong and why, check it against the data, and change the work if they are right.\n\nGive a real example: a manager said your dashboard was confusing, you asked which decisions they used it for, rebuilt it around those three questions, and usage went up.\n\nIf you disagreed, say how you showed the evidence calmly and accepted the final call.',
          lookFor: 'Curiosity over defensiveness, a real example, and a measurable change.',
          criteria: ['Asks for specifics', 'Checks against data', 'A real example with a result'],
          reportedAt: 'Dec 2024',
          round: 'HR',
          source: {
            label: 'AmbitionBox',
            url: 'https://www.ambitionbox.com/interviews/phonepe-interview-questions/data-analyst',
          },
        },
        {
          q: 'Have you had a conflict at work? How did you resolve it? (Asked at EY, per LeetCode Discuss)',
          answer:
            'Pick a work disagreement about substance, not personalities: for example two teams using different definitions of “active customer” and getting different numbers.\n\nExplain what each side wanted, how you brought both definitions and the data to one meeting, and how you agreed on one definition (or showed both, clearly labelled).\n\nEnd with the result: one number everyone used, and a written definition so it did not happen again.',
          lookFor:
            'A conflict about substance, understanding both sides, a data-led resolution, and a lasting fix.',
          criteria: [
            'Conflict about work, not personalities',
            'Explains both sides',
            'Resolved with data and a decision',
            'A lasting fix (written definition)',
          ],
          reportedAt: 'Jul 2022',
          round: 'Behavioural round (30 min)',
          source: {
            label: 'LeetCode Discuss',
            url: 'https://leetcode.com/discuss/post/2418234/ey-data-analyst-mumbai-july-2022-offer',
          },
        },
        {
          q: 'Tell me about yourself. (For freshers applying to data analyst roles)',
          answer:
            'Keep it to about 60 seconds in three parts: present, past, next.\n\nPresent: “I am a final-year B.Com student specialising in analytics.” Past: one or two pieces of proof, such as “I analysed 1.2 million public food-delivery orders in SQL and found repeat orders drop sharply after 45-minute waits; the dashboard is on my Tableau Public”, plus an internship or a role where you owned a report. Next: why this role and company, in one sentence.\n\nDo not list every course. Interviewers often pick one thing you mention and ask about it, so lead with the project you know best.',
          lookFor:
            'A short present-past-next structure, real proof with a number, and a reason for this role.',
          criteria: [
            'About 60 seconds, present → past → next',
            'One project with data size and a finding',
            'Says why this role and company',
            'Leads with what they can defend in depth',
          ],
          round: 'Common opening question',
        },
      ],
    },
  ],
  plans: [
    {
      days: '7 days',
      title: 'Interview next week',
      tasks: [
        'Day 1: read the job post twice; list the tools it names and the company’s three main metrics.',
        'Day 2: SQL drill: joins, GROUP BY, then 5 window-function questions (top-N per group, latest row, LAG).',
        'Day 3: Excel or Power BI: a pivot, XLOOKUP, and explain Import vs DirectQuery and SUM vs SUMX out loud.',
        'Day 4: two metric cases out loud (a metric dropped; pick a north star) using data → split → internal → external → segment.',
        'Day 5: one A/B test question and, for services firms, two guesstimates with stated assumptions.',
        'Day 6: write four stories with numbers; do a full mock interview and fix the weakest round.',
        'Day 7: prepare your portfolio walk-through and two questions for the interviewer.',
      ],
    },
    {
      days: '14 days',
      title: 'Build the skills and the proof',
      tasks: [
        'Week 1: everything in the 7-day plan.',
        'Week 2: do one public-data analysis end to end: SQL in a GitHub repo, one dashboard page, a 150-word summary.',
        'Practise one SQL question a day without autocomplete, timing yourself to 15 minutes.',
        'Rewrite three CV bullets as result + tool + scale.',
      ],
    },
    {
      days: '30 days',
      title: 'Run a proper search',
      tasks: [
        'List 30 targets across product companies, services firms and startups; note which tools each post asks for.',
        'Apply and message the analytics lead with one chart on their kind of data; follow up once after 5–6 days.',
        'One SQL and one case or guesstimate a day, out loud.',
        'Two mock interviews a week with a peer or an AI interviewer.',
        'Ship a second portfolio analysis in a different domain (payments, delivery, e-commerce).',
      ],
    },
  ],
  resources: [
    {
      title: 'SQLBolt',
      url: 'https://sqlbolt.com/',
      kind: 'Course',
      why: 'Interactive lessons that run in the browser. Key idea: learn SELECT, filters, joins and aggregates by typing queries, not by reading syntax.',
      free: true,
    },
    {
      title: 'Advanced SQL tutorial (formerly Mode, now ThoughtSpot)',
      url: 'https://www.thoughtspot.com/sql-tutorial/intro-to-advanced-sql',
      kind: 'Course',
      why: 'Takes you to the level interview rounds expect. Key idea: subqueries and window functions answer most “per group” and “over time” questions.',
      free: true,
    },
    {
      title: 'DataLemur',
      url: 'https://www.datalemur.com',
      kind: 'Tool',
      why: 'SQL interview questions tagged by company and difficulty, with a free tutorial. Key idea: drill the patterns (top-N, latest row, retention) until they are automatic.',
      free: true,
    },
    {
      title: 'StrataScratch',
      url: 'https://www.stratascratch.com',
      kind: 'Tool',
      why: 'A large bank of company interview questions in SQL and Python; free learning paths need no card. Key idea: after each query, write one sentence on what the result means.',
      free: true,
    },
    {
      title: 'HackerRank SQL (Basic) certification',
      url: 'https://www.hackerrank.com/skills-verification/sql_basic',
      kind: 'Tool',
      why: 'A 30-minute, 2-question test in the format many online assessments use. Key idea: practise under a timer, because OA rounds are timed.',
      free: true,
    },
    {
      title: 'Amazon BIE interview prep (official)',
      url: 'https://amazon.jobs/content/en/how-we-hire/bie-interview-prep',
      kind: 'Guide',
      why: 'Amazon’s own description of its analyst and BIE assessment and loop. Key idea: the online assessment has three parts (SQL Challenge, Working with SQL, Work Styles), then a 60-minute phone screen.',
      free: true,
    },
    {
      title: '10 minutes to pandas (official docs)',
      url: 'https://pandas.pydata.org/docs/user_guide/10min.html',
      kind: 'Guide',
      why: 'The fastest tour of the pandas you will be asked about. Key idea: selection, missing data, merge, groupby and pivot_table cover most analyst Python rounds.',
      free: true,
    },
    {
      title: 'Google Data Analytics Professional Certificate (Coursera)',
      url: 'https://www.coursera.org/professional-certificates/google-data-analytics?hl=en-US',
      kind: 'Course',
      why: 'A structured beginner path through spreadsheets, SQL, Tableau and analysis; $49 a month in the US after a 7-day trial, with financial aid. Key idea: finish the case-study project and put it in your portfolio.',
      free: false,
    },
    {
      title: 'Microsoft PL-300: Power BI Data Analyst',
      url: 'https://learn.microsoft.com/en-us/credentials/certifications/data-analyst-associate/',
      kind: 'Course',
      why: 'The standard Power BI credential; the exam is 100 minutes and priced by country. Key idea: the skills outline (prepare, model, visualise, secure) is also a good interview syllabus.',
      free: false,
    },
    {
      title: 'Tableau Public',
      url: 'https://www.tableau.com/products/tableau-public',
      kind: 'Tool',
      why: 'A free place to publish dashboards recruiters can open. Key idea: one clean dashboard on public data beats a list of course certificates.',
      free: true,
    },
    {
      title: 'Storytelling with Data (Cole Nussbaumer Knaflic)',
      url: 'https://www.oreilly.com/library/view/storytelling-with-data/9781119002253/',
      kind: 'Book',
      why: 'The best guide to the “present your findings” part of analyst interviews. Key idea: cut clutter and make the chart title state the finding.',
      free: false,
    },
    {
      title: 'Overview of Copilot for Power BI (Microsoft Learn)',
      url: 'https://learn.microsoft.com/power-bi/create-reports/copilot-introduction',
      kind: 'Guide',
      why: 'What Copilot can do in Power BI and what it needs. Key idea: it writes DAX and report pages, but requires paid Fabric F2+ or Premium P1+ capacity.',
      free: true,
    },
    {
      title: 'BigQuery data canvas (Google Cloud docs)',
      url: 'https://docs.cloud.google.com/bigquery/docs/data-canvas',
      kind: 'Guide',
      why: 'How Gemini in BigQuery turns plain English into SQL and charts. Key idea: treat AI-written SQL as a draft and check it against a number you trust.',
      free: true,
    },
    {
      title: 'Data analysis with ChatGPT (OpenAI Help)',
      url: 'https://help.openai.com/en/articles/8437071-data-analysis-with-chatgpt',
      kind: 'Guide',
      why: 'How ChatGPT runs pandas code on your files and shows it. Key idea: read the generated code; the chart is only as right as the code behind it.',
      free: true,
    },
    {
      title: 'Learn AI: what is an LLM?',
      url: '/learn-ai/what-is-an-llm',
      kind: 'Our guide',
      why: 'A short, free lesson on what AI tools can and cannot do with your data, so you can answer “how do you use AI in analysis?”.',
      free: true,
    },
  ],
  related: [
    { label: 'Product Manager hub', href: '/product-manager' },
    { label: 'Strategy & Operations hub', href: '/strategy-and-operations' },
    { label: 'Growth hub', href: '/growth' },
    { label: 'In-hand salary calculator', href: '/salary-calculator' },
  ],
  faqs: [
    {
      q: 'What questions are asked in a data analyst interview?',
      a: 'Mostly SQL (joins, window functions, top-N per group, repeat rate), Excel or Power BI (lookups, pivots, DAX, data modelling), a metric or product case (why did a number drop?), basic statistics and A/B tests, and behavioural questions about explaining numbers. Indian services firms often add guesstimates and an aptitude test.',
    },
    {
      q: 'What is the data analyst salary in India?',
      a: 'In 14 full-time Indian data analyst posts we opened in November 2026, pay ranged from ₹3–5 LPA to ₹20–35 LPA, with a median midpoint of ₹13.5 LPA. Levels.fyi’s India median is ₹14.6 lakh. Two Bengaluru startups posted the highest bands, for 2-year analysts.',
    },
    {
      q: 'How many rounds are there in a data analyst interview?',
      a: 'Usually three to five: a screen or online assessment, one or two technical rounds (SQL, Excel or Power BI), a case or manager round, and HR. Flipkart candidates reported three SQL rounds; Meta’s staff loop had six final rounds.',
    },
    {
      q: 'Is SQL enough to get a data analyst job?',
      a: 'SQL is the most tested skill, but most posts also ask for Excel and a BI tool such as Power BI or Tableau, and many for Python. Just as important is explaining what your query means for the business.',
    },
    {
      q: 'Do data analysts need to know AI tools?',
      a: 'Increasingly. Copilot in Power BI and Gemini in BigQuery write first-draft DAX and SQL. Interviewers still test whether you can write and check queries yourself, so learn to use AI for drafts and verify every number.',
    },
    {
      q: 'Can a fresher become a data analyst?',
      a: 'Yes. Many Indian analyst roles hire freshers through campus drives, and posts such as Newton School’s list fresher pay of ₹4–8 LPA. Two public projects on real data and solid SQL are the best way in.',
    },
  ],
}

export default dataAnalyst
