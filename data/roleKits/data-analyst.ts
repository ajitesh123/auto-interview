import type { RoleKits } from './types'

// Keywords condensed from the requirement text of the job posts in keywordSources (opened Nov 9, 2026).
// Facts about the role (rounds, tools, questions) match data/roleHubs/data-analyst.ts.
// Sample people, companies, colleges and numbers are fictional and labelled as samples on the page.

export const DATA_ANALYST_KITS: RoleKits = {
  resume: {
    metaTitle: 'Data Analyst Resume (CV): Examples, Bullets, Keywords',
    metaDescription:
      'Data analyst resume and CV guide: what hiring managers skim for, 12 bullet examples, keywords from real job posts, a sample CV and a free Word template.',
    h1: 'Data analyst resume (CV): examples, bullets and keywords',
    directAnswer:
      'A data analyst resume should show three things in every bullet: the tool (SQL first), the scale of the data, and the decision or result your analysis led to. Lead with your strongest analysis and its outcome, name the tools exactly as the job post does, and keep it to one page with a link to a portfolio.',
    recruiterLens: [
      'SQL, Python or R, and a BI tool: in five analyst posts we opened, all three were in every post (Tableau in four). Excel was in both Indian posts.',
      'Scale: rows, users, regions, or how many people used your dashboard. “2.1M order rows for 40 managers” reads as real work.',
      'A decision your analysis changed, with a number: a fix shipped, a cost found, hours of manual reporting removed.',
      'Proof you can show: a GitHub repo of queries or a Tableau Public dashboard, especially for freshers.',
    ],
    format: {
      length:
        'One page for freshers and anyone under 8 years of experience. Two pages only for senior analysts, and only if every bullet still shows a result.',
      sections: [
        'Name and contact (city, email, LinkedIn, GitHub or Tableau Public link)',
        'Two-line summary with your best analysis and its result',
        'Experience (most recent first; each bullet: result, method, tool, scale)',
        'Projects (essential for freshers and switchers: public-data analyses with links)',
        'Skills (grouped: SQL and databases, Excel and BI, Python and statistics)',
        'Education (with marks for Indian campus and early-career roles), certificates in one line',
      ],
      indiaNote:
        'In India “CV” and “resume” mean the same document. Campus drives and services firms (Deloitte, EY, ZS, Mu Sigma) expect the one-page table format with marks, co-curriculars and positions of responsibility, so our Word template uses it. Leave out the photo, date of birth, gender and marital status. Do not put CTC on the CV; recruiters ask for current CTC and notice period separately.',
      usNote:
        'US recruiters expect one page in a simple layout with no photo or personal details. Lead with tools and outcomes; a link to a portfolio dashboard is common and welcome.',
    },
    summaries: [
      {
        level: 'Fresher or switcher',
        text: 'Final-year B.Com student moving into data analysis. Built a Power BI dashboard on 1.2M public delivery orders and a SQL analysis of repeat orders by wait time (GitHub linked). Comfortable with SQL window functions, Excel pivots and pandas.',
      },
      {
        level: 'Data analyst (2–5 years)',
        text: 'Data analyst with 3 years in e-commerce. Owns the weekly business review numbers for 40 regional managers; replaced a 6-hour Excel pack with a Power BI dashboard on 2.1M rows. Found the delivery-delay effect behind a 9% fall in repeat orders.',
      },
      {
        level: 'Senior analyst',
        text: 'Senior data analyst for [business unit], running metric definitions and experiment readouts for [N] teams. Analyses led to [decision] worth [amount or metric change]. Mentors [N] analysts and owns the team’s SQL style guide.',
      },
    ],
    bulletBank: [
      {
        area: 'SQL and root cause',
        bullets: [
          'Found that [segment] drove [X]% of a drop in [metric] using SQL cohort analysis on [N] rows; the fix recovered it in [N] weeks.',
          'Wrote the SQL behind [N] core metrics and documented their definitions; reporting disputes between teams stopped.',
          'Cut a daily query from [X] minutes to [Y] by rewriting joins and adding a date filter on [table].',
        ],
      },
      {
        area: 'Dashboards and reporting',
        bullets: [
          'Built a [Power BI / Tableau] dashboard on [N] rows for [N] users, replacing a weekly Excel pack; reporting time fell from [X] hours to [Y].',
          'Set up row-level security so [N] regional managers see only their region in one shared report.',
          'Automated [report] with [SQL / Python / Power Query], saving [N] hours a week for [team].',
        ],
      },
      {
        area: 'Experiments and statistics',
        bullets: [
          'Analysed a [N]-week A/B test of [change] ([N] users per arm): [metric] rose [X] points with no change in [guardrail]; the team shipped it.',
          'Designed the sample size and success metric for [N] experiments with the product team.',
          'Built a [forecast / regression] for [metric] with [error] on held-out weeks, used for [planning decision].',
        ],
      },
      {
        area: 'Data quality and Python',
        bullets: [
          'Cleaned and reconciled [N] rows of [data] in pandas and SQL, found [amount] of [errors or duplicates], and set up a monthly check.',
          'Merged [N] source systems into one customer table with a match rate of [X]%.',
          'Drafted queries with [Copilot / Gemini / ChatGPT] and validated each against [trusted total] before publishing.',
        ],
      },
    ],
    beforeAfter: [
      {
        weak: 'Created dashboards in Power BI.',
        strong:
          'Built a Power BI sales dashboard on 2.1M order rows for 40 regional managers, replacing a weekly Excel pack; reporting time fell from 6 hours a week to 30 minutes.',
        why: 'Adds the scale, the users and the time saved. “Created dashboards” could describe anyone.',
      },
      {
        weak: 'Good knowledge of SQL and Excel.',
        strong:
          'Wrote SQL cohort queries that showed repeat orders fell 9% for customers who waited over 45 minutes; the ops team added a delay coupon and repeat rate recovered in 4 weeks.',
        why: 'Skills claims are cheap. This shows SQL in use and the decision it changed.',
      },
      {
        weak: 'Did A/B testing analysis.',
        strong:
          'Analysed a 2-week checkout A/B test (52K users per arm): conversion rose 1.8 points with no change in refunds, so the team shipped the new flow.',
        why: 'Names the sample, the primary metric, the guardrail and the decision.',
      },
    ],
    keywords: [
      {
        group: 'SQL and data',
        terms: [
          'SQL (advanced)',
          'stored procedures',
          'data warehousing',
          'data modeling',
          'ETL pipelines',
          'Redshift',
          'SparkSQL',
        ],
      },
      {
        group: 'BI and Excel',
        terms: [
          'Power BI',
          'DAX',
          'Tableau',
          'Looker',
          'QuickSight',
          'Excel (advanced)',
          'KPIs and dashboards',
        ],
      },
      {
        group: 'Python and statistics',
        terms: ['Python', 'R', 'PySpark', 'regression', 'forecasting', 'clustering'],
      },
      {
        group: 'Cloud and ways of working',
        terms: [
          'Azure Synapse / Databricks',
          'AWS',
          'stakeholder communication',
          'presentation skills',
          'metrics recommendations',
          'GenAI tools',
        ],
      },
    ],
    keywordSources: [
      {
        label: 'Trent Limited, Executive – Power BI Analyst, Mumbai',
        url: 'https://careers.trentlimited.com/job/Mumbai-Executive-Power-Bi-Analyst-Maha/54963444/',
      },
      {
        label: 'Amazon, Data Analyst (Emerging Stores), Bengaluru (closed)',
        url: 'https://jobs.anitab.org/companies/amazon-3-60ad394d-c673-4474-9694-344b0cae748f/jobs/58471550-data-analyst-emsx',
      },
      {
        label: 'Amazon Prime Video, Business Intelligence Engineer, Culver City / Seattle',
        url: 'https://amazon.jobs/en/jobs/10561033/business-intelligence-engineer-prime-video-partner-experience-supply-chain',
      },
      {
        label: 'Dexian, Data Analyst with Tableau and SQL, Charlotte (expired)',
        url: 'https://justjobs.com/career/16744842/Data-Analyst-W-Tableau-Sql-North-Carolina-Charlotte',
      },
      {
        label: 'Data Analyst contract (unnamed client), via Dice',
        url: 'https://www.dice.com/job-detail/0c898bac-7104-4724-a478-61d388d75877',
      },
    ],
    projects: [
      {
        title: 'A root-cause analysis on public data',
        what: 'Take an e-commerce or food-delivery dataset, ask one business question (why did repeat orders fall in one city?), answer it in SQL and keep the queries in a GitHub repo with a short README.',
        proves: 'You can do the SQL round and the case round in one piece of work.',
      },
      {
        title: 'One dashboard page that makes a point',
        what: 'Build a single Power BI or Tableau Public page with three charts, each titled with its finding, and a one-line recommendation.',
        proves:
          'You can choose charts, cut clutter and lead with the answer, which interviewers test directly.',
      },
      {
        title: 'An A/B test readout',
        what: 'Use a public A/B test dataset, state the hypothesis and guardrail, run the test in Python or a spreadsheet, and write a ship / do-not-ship note.',
        proves: 'You understand experiments, which product-company loops ask about.',
      },
    ],
    mistakes: [
      {
        mistake: 'A long skills list with no evidence',
        fix: 'Put tools inside bullets: “SQL cohort analysis found…”, “a Power BI dashboard for 40 managers…”.',
      },
      {
        mistake: 'No scale',
        fix: 'Add rows, users, regions or money: it is the quickest signal that the work was real.',
      },
      {
        mistake: 'Results with no decision',
        fix: 'Say what the team did with your analysis: shipped, rolled back, changed a price, stopped a report.',
      },
      {
        mistake: 'A two-column graphic CV with charts of your skill levels',
        fix: 'Use a plain one-page layout (the Indian table format for campus roles). Skill bars say nothing and can confuse parsers.',
      },
      {
        mistake: 'Course certificates taking half the page',
        fix: 'One line for certificates. Projects with links prove more than course names.',
      },
    ],
    sample: {
      name: 'Ishita Rao (sample)',
      headline: 'Data Analyst, e-commerce reporting and root cause',
      contact: 'Bengaluru · ishita@example.com · github.com/example',
      summary:
        'Data analyst with 3 years in e-commerce. Replaced a 6-hour weekly Excel pack with a Power BI dashboard on 2.1M rows for 40 regional managers, and traced a 9% fall in repeat orders to delivery delays. Writes SQL with window functions daily; pandas for cleaning.',
      experience: [
        {
          role: 'Data Analyst',
          org: 'Kirana Cart (fictional)',
          dates: '2023 – present',
          bullets: [
            'Built a Power BI sales dashboard on 2.1M order rows for 40 regional managers; weekly reporting time fell from 6 hours to 30 minutes.',
            'Wrote SQL cohort queries showing repeat orders fell 9% after waits over 45 minutes; a delay coupon recovered repeat rate in 4 weeks.',
            'Analysed a 2-week checkout A/B test (52K users per arm): conversion up 1.8 points with no change in refunds; shipped to all users.',
            'Set up row-level security so each regional manager sees only their region in one shared report.',
          ],
        },
        {
          role: 'MIS Analyst',
          org: 'Coastline Logistics (fictional)',
          dates: '2022 – 2023',
          bullets: [
            'Reconciled 180K rows of vendor invoices in Excel and SQL and found ₹14L of duplicate payments; finance now runs the check monthly.',
            'Automated the daily shipment report with Power Query, saving 5 hours a week.',
          ],
        },
      ],
      projects: [
        {
          name: 'Food delivery root cause (public data, GitHub)',
          line: 'SQL analysis of 1.2M orders: repeat rate by wait time and city, with a one-page Tableau Public summary.',
        },
      ],
      skills: [
        'SQL (window functions, CTEs)',
        'Power BI (DAX, data modelling, RLS)',
        'Excel (pivots, XLOOKUP, Power Query)',
        'Python (pandas)',
        'A/B test analysis',
        'Query drafts with Copilot, checked by hand',
      ],
      education: 'B.Com (Business Analytics), 8.4 / 10, 2022',
    },
    coverLetter: {
      subject: 'Data Analyst application: [Your name]',
      body: 'Hi [Hiring manager name],\n\nI am applying for the Data Analyst role on [team]. At Kirana Cart I own the weekly business review numbers for 40 regional managers. I replaced a 6-hour Excel pack with a Power BI dashboard on 2.1M rows, and my SQL cohort analysis traced a 9% fall in repeat orders to delivery delays, which the ops team fixed within a month.\n\nI looked at public data on [their product or market] and made one chart on [finding] (link). I would like to do this kind of work on [team’s metric].\n\nCould we find 15 minutes this week?\n\n[Your name]',
    },
    linkedin: {
      headline:
        'Data Analyst | SQL, Power BI, Python | E-commerce metrics, root cause and A/B tests',
      about:
        'I turn business questions into numbers people act on. In e-commerce I built the Power BI dashboard 40 regional managers use each week, cut reporting time from 6 hours to 30 minutes, and traced a 9% fall in repeat orders to delivery delays. I write SQL every day, clean data in pandas, and use AI tools for first drafts that I check by hand. My public analyses are on GitHub.',
    },
    faqs: [
      {
        q: 'What should a data analyst put on a resume with no experience?',
        a: 'Two or three projects on real public data with links (a SQL repo, a dashboard), your marks, and any role where you owned a report. In India use the one-page table format; our free Word template follows it.',
      },
      {
        q: 'Which skills should a data analyst resume list?',
        a: 'In the five analyst posts we opened, SQL, Python or R, and a BI tool appeared in all five (Tableau in four), and Excel in both Indian posts. Lead with SQL, and name each tool inside a bullet as well as in the skills section.',
      },
      {
        q: 'Should I put certificates like Google Data Analytics or PL-300 on my CV?',
        a: 'Yes, on one line, if they match the post. PL-300 signals Power BI depth for services firms. A project with a link still counts for more than a certificate.',
      },
      {
        q: 'Is a CV different from a resume for data analyst jobs?',
        a: 'In India the two words mean the same one- to two-page document. In the US and Europe a CV can mean a longer academic record, but for analyst jobs both mean the short version.',
      },
    ],
  },

  lor: {
    metaTitle: 'Letter of Recommendation for a Data Analyst (Sample)',
    metaDescription:
      'How to get a letter of recommendation for a data analyst job or a master’s in analytics: who should write it, what to prove, a sample letter and the ask email.',
    h1: 'Letter of recommendation for a data analyst',
    directAnswer:
      'The strongest data analyst recommendation comes from someone who used your analysis to make a decision: your manager, or the business lead who acted on your numbers. It should prove three things with specific examples: your numbers were right, you explained them so people understood, and a decision changed because of them.',
    whoShouldWrite: [
      {
        who: 'Your manager or analytics lead',
        why: 'They reviewed your queries and can vouch for accuracy, speed and judgement.',
      },
      {
        who: 'A business or operations lead who used your analysis',
        why: 'They can say what decision your work changed, which is the strongest evidence for an analyst.',
      },
      {
        who: 'A professor or project guide (for freshers and master’s applications)',
        why: 'They can speak to statistics, rigour and a project they supervised.',
      },
    ],
    whatToHighlight: [
      {
        quality: 'Numbers you can trust',
        evidence:
          '“Ishita reconciled every figure to finance before the review; in three years I never had to correct one of her numbers in front of leadership.”',
      },
      {
        quality: 'Finds the real cause',
        evidence:
          '“She traced a 9% fall in repeat orders to delivery waits over 45 minutes, when we had assumed it was pricing.”',
      },
      {
        quality: 'Explains clearly',
        evidence:
          '“Her one-page summaries led with the answer, so regional managers acted on them the same week.”',
      },
      {
        quality: 'Saves the team time',
        evidence: '“Her Power BI dashboard replaced a six-hour weekly Excel pack.”',
      },
    ],
    structure: [
      {
        part: 'Opening',
        what: 'Who you are, how long and how you worked with the candidate, and what they are applying for.',
      },
      {
        part: 'Headline claim',
        what: 'One sentence that sums them up, e.g. “the analyst whose numbers we never had to re-check”. Only if true.',
      },
      {
        part: 'Two specific analyses',
        what: 'Each: the question, what they did (data, method), what they found, and the decision it led to.',
      },
      {
        part: 'How they work with others',
        what: 'One short paragraph on explaining numbers to non-analysts and handling a challenge to their figures.',
      },
      {
        part: 'Close',
        what: 'A clear recommendation and an offer to talk, with your contact details.',
      },
    ],
    sampleLetter: {
      context: 'From an analytics manager, for a job application (fictional people and company)',
      paragraphs: [
        'I am Vikram Joshi, Analytics Manager at Kirana Cart (fictional), an online grocery company. Ishita Rao has worked on my team since 2023 as a data analyst, owning the numbers for our weekly business review. I am glad to recommend her.',
        'Ishita is the analyst whose numbers we never had to re-check. Before each review she reconciles every figure to finance, and in three years I have not had to correct one of her numbers in front of leadership.',
        'When repeat orders fell 9% last year, most of us suspected a price change. Ishita built cohort queries by delivery wait time and showed the drop came from customers who waited more than 45 minutes. Operations added a delay coupon and repeat rate recovered within four weeks.',
        'She also makes the numbers easy to use. Her Power BI dashboard replaced a six-hour weekly Excel pack for 40 regional managers, and her one-page summaries lead with the answer, so managers act on them the same week.',
        'I recommend Ishita without reservation and would be happy to speak with you about her work.',
      ],
      signoff: 'Vikram Joshi, Analytics Manager, Kirana Cart (fictional) · vikram@example.com',
    },
    askEmail: {
      subject: 'Would you be a reference for a data analyst role?',
      body: 'Hi [Name],\n\nI am applying for data analyst roles, starting with [Company]. You saw my work on [analysis or dashboard] more closely than anyone, so I would be grateful if you could write a short recommendation or take a reference call.\n\nI have attached a one-page brief: the role, two analyses you might mention, and the decisions they led to. Please change anything that does not match your memory, and tell me if any number should stay private.\n\nThe deadline is [date]. If now is a bad time, no problem at all.\n\nThank you,\n[Your name]',
    },
    brief: [
      'The job description or programme, and why you want it (two lines).',
      'Two analyses they saw: the question, your method, the finding and the decision it changed.',
      'One time your numbers were challenged and how you handled it.',
      'Which numbers are safe to share outside the company, and which to give as percentages only.',
      'The deadline, the format (letter, form or call) and where to send it.',
    ],
    variants: [
      {
        context: 'Job application or reference call',
        tweak:
          'One page, led by an analysis and the decision it changed. Many companies prefer a short call, so ask which they want.',
      },
      {
        context: 'Master’s in analytics or data science',
        tweak:
          'Add rigour and potential: statistics they used, a project they drove on their own, how fast they learned a new tool. Answer the university’s questions exactly.',
      },
      {
        context: 'Internal move (MIS, ops or support to analyst)',
        tweak:
          'Focus on analysis already done in the current role: a report they automated, a question they answered with data, and who used it.',
      },
      {
        context: 'Referral note to a recruiter',
        tweak:
          'Three sentences: how you know them, the best analysis they did and its result, and why they fit this team.',
      },
    ],
    mistakes: [
      'Listing tools (“expert in SQL and Power BI”) with no analysis behind them.',
      'Describing the dashboard but not who used it or what changed.',
      'Claiming the business result as the analyst’s own. Say what they found and how it was used.',
      'A senior recommender who never saw the work. A specific letter from a direct manager beats a vague one from a director.',
      'Writing the letter yourself and asking them to sign it. Send a brief and let them use their own words.',
    ],
    faqs: [
      {
        q: 'Do data analyst jobs ask for letters of recommendation?',
        a: 'Most companies use reference calls with your last manager. Letters matter more for master’s applications, internal moves and some Indian employers. The same brief works for both.',
      },
      {
        q: 'Who should write my recommendation for a master’s in analytics?',
        a: 'A professor or project guide who saw your quantitative work, and a manager who saw your analysis used at work. Universities want specific examples of rigour, not general praise.',
      },
      {
        q: 'How long should the letter be?',
        a: 'One page, four to five short paragraphs: introduction, two specific analyses with results, how the candidate explains numbers, and a clear close.',
      },
      {
        q: 'Can I write my own letter of recommendation?',
        a: 'Avoid it. Send your recommender a one-page brief with your analyses and numbers, and let them write in their own voice.',
      },
    ],
  },
}
