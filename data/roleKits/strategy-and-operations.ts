import type { RoleKits } from './types'

// Keywords condensed from the requirement text of the job posts in keywordSources (opened Nov 7, 2026).
// Facts about the role (rounds, take-homes, metrics) match data/roleHubs/strategy-and-operations.ts.
// Sample people, companies and numbers are fictional and labelled as samples on the page.

export const STRATEGY_AND_OPERATIONS_KITS: RoleKits = {
  resume: {
    metaTitle: 'Strategy & Operations Resume (CV): Examples & Bullets',
    metaDescription:
      'Strategy & Operations (BizOps) resume and CV guide: what S&O leads screen for, 12 bullet examples, keywords from real job posts, a sample CV and a free Word template.',
    h1: 'Strategy & Operations resume (CV): examples, bullets and keywords',
    directAnswer:
      'An S&O resume should read like a list of business problems you solved: the problem, how you analysed it, the change you drove across teams, and the number that moved. Lead with your strongest case and its before-and-after metric, show the teams you moved without authority, and keep it to one page.',
    recruiterLens: [
      'A business metric you moved, with a baseline: delivery time, onboarding time, cost per order, repeat rate, revenue against plan.',
      'Evidence of analysis: SQL, an Excel model, a pilot with a control group, a market sizing. S&O leads hire for structured thinking.',
      'Driving change through other teams: operations, sales, finance, product. Name them and say what they did differently.',
      'Fit with their business: supply, cities and unit economics for marketplaces; planning, funnels and process for SaaS and fintech.',
    ],
    format: {
      length:
        'One page under 8 years of experience. Two pages only for senior S&O leaders, and only if every bullet still shows a result.',
      sections: [
        'Name and contact (city, email, LinkedIn, a link to a one-page analysis or model)',
        'Two-line summary with your best solved case and its metric',
        'Experience (most recent first; each bullet: problem, analysis, change, result)',
        'Projects or cases (essential for freshers and switchers: practice take-homes, case competitions)',
        'Skills (grouped: analysis, tools, operations, AI)',
        'Education (with marks for Indian campus and early-career roles)',
      ],
      indiaNote:
        'In India “CV” and “resume” mean the same document. Campus strategy and S&O roles expect the one-page table format with marks, positions of responsibility and extra-curriculars, so our Word template uses it. Leave out the photo, date of birth and marital status. Do not put CTC on the CV; recruiters ask for current CTC and notice period separately.',
      usNote:
        'US recruiters expect one page in a simple layout with no photo or personal details. Ex-consultants should replace client names with industry and size, and say what the client did with the work.',
    },
    summaries: [
      {
        level: 'Fresher or switcher (consulting, banking, analytics)',
        text: 'Analyst moving into Strategy & Operations. Built the cost model behind a 10-week retail-bank programme and ran 6 operations workshops; the client approved the savings in its next budget. Writes SQL, builds Excel models and presents answer-first decks.',
      },
      {
        level: 'S&O associate or manager (3–6 years)',
        text: 'Strategy & Operations manager with 4 years in food delivery. Owns supply planning for 14 zones: on-time deliveries up from 82% to 88% with flat incentive spend. Root-causes metric moves with SQL and runs pilots with control zones.',
      },
      {
        level: 'Senior S&O or BizOps lead',
        text: 'S&O lead for [business unit], running planning and the weekly business review for [N] teams. Grew [metric] from [X] to [Y] in [N] quarters and built the operating rhythm leadership still uses. Hires and coaches associates.',
      },
    ],
    bulletBank: [
      {
        area: 'Metrics and root-cause',
        bullets: [
          'Root-caused a [X]% drop in [metric] to [cause] within [N] days using SQL cohort analysis; the fix recovered it in [N] weeks.',
          'Built the driver tree for [north-star metric] and the weekly dashboard leadership uses to run the business review.',
          'Found that [segment] drove [X]% of [problem]; a targeted fix cut it by [Y]% in [N] weeks.',
        ],
      },
      {
        area: 'Operations and process',
        bullets: [
          'Mapped [process] across [N] teams and removed [N] hand-offs; median [cycle time] fell from [X] days to [Y].',
          'Designed a staffing model for [N] zones from hourly demand forecasts; [SLA metric] rose from [X]% to [Y]% at flat cost.',
          'Set up the [weekly business review / OKR cadence] for [team]; actions closed on time rose from [X]% to [Y]%.',
        ],
      },
      {
        area: 'Strategy and sizing',
        bullets: [
          'Sized the [new market or category] opportunity at [range] with top-down and bottom-up models; leadership approved a [N]-city pilot.',
          'Wrote the business case for [initiative] with payback in [N] months; approved with [budget or team].',
          'Benchmarked [N] competitors on price, range and delivery promise across [N] cities; findings set the [pricing or launch] plan.',
        ],
      },
      {
        area: 'Pilots and economics',
        bullets: [
          'Ran a [N]-week pilot of [change] in [N] zones against matched control zones; [metric] improved [X]% and it rolled out to [N] cities.',
          'Cut [cost line] per order from [X] to [Y] by [change], saving [amount] a quarter.',
          'Automated the [weekly report] with [SQL / n8n / scripts], saving [N] hours a week across [team].',
        ],
      },
    ],
    beforeAfter: [
      {
        weak: 'Worked on strategic projects with senior stakeholders.',
        strong:
          'Built a city-level supply model for 14 zones and moved 9% of rider incentives from off-peak to peak hours; on-time deliveries rose from 82% to 88% with flat incentive spend.',
        why: 'Names the problem, the analysis, the change and the result, with the cost held flat.',
      },
      {
        weak: 'Responsible for improving operational efficiency.',
        strong:
          'Mapped merchant onboarding across sales, ops and risk, cut 3 hand-offs and moved document checks earlier; median time to go live fell from 11 days to 6.',
        why: '“Responsible for” describes a job. This shows the teams involved, the change and the number.',
      },
      {
        weak: 'Did data analysis in Excel and SQL.',
        strong:
          'Root-caused a 7% drop in repeat orders to a delivery-fee change in two cities using SQL cohort analysis; the rollback recovered repeat rate within 3 weeks.',
        why: 'Tools only matter for what they found. This links the analysis to a decision and a recovery.',
      },
    ],
    keywords: [
      {
        group: 'Analysis',
        terms: [
          'data analysis',
          'financial modeling',
          'ROI modeling',
          'building business cases',
          'root cause',
        ],
      },
      {
        group: 'Tools',
        terms: ['SQL', 'Excel', 'dashboards', 'KPIs', 'Salesforce'],
      },
      {
        group: 'Operations and planning',
        terms: [
          'process improvements',
          'operational excellence',
          'automation opportunities',
          'revenue planning',
          'headcount planning',
          'quarterly forecasts',
        ],
      },
      {
        group: 'Ways of working',
        terms: [
          'stakeholder communication',
          'cross-functional collaboration',
          'influence without formal authority',
          'comfort with ambiguity',
          'managing multiple concurrent projects',
        ],
      },
    ],
    keywordSources: [
      {
        label: 'DevRev, Strategic Operations Manager / Sr. Associate, Bengaluru (Greenhouse)',
        url: 'https://job-boards.greenhouse.io/devrev/jobs/5576360004',
      },
      {
        label: 'GoodScore, Manager, Strategy & Operations, Bengaluru',
        url: 'https://getmereferred.com/in/job-listing/manager-strategy-operations-iit-nit-iim-goodscore-inkabengaluru-3-to-6-years-experience-19925420-a78e-404c-b45d-ff1a941a34a9',
      },
      {
        label: 'DoorDash, Associate, Strategy & Operations, Merchant Onboarding (Greenhouse)',
        url: 'https://job-boards.greenhouse.io/doordashusa/jobs/7397585',
      },
      {
        label: 'Sierra, Strategy & Operations Lead, San Francisco',
        url: 'https://joinrise.co/sierra/strategy-operations-lead-05ge',
      },
    ],
    projects: [
      {
        title: 'A practice take-home on their business',
        what: 'Pick one metric that matters to the company, find public data (reviews, annual reports, pricing pages), build a small model and write a 5-slide answer-first deck.',
        proves:
          'You can do the round that decides most S&O offers. Link it from your CV or attach it to your note.',
      },
      {
        title: 'A driver tree and dashboard',
        what: 'Take a public dataset (a Kaggle delivery or e-commerce dataset), break the main metric into drivers, and build a one-page dashboard with three findings.',
        proves: 'You think in drivers and can answer your own questions with data.',
      },
      {
        title: 'An automated weekly report',
        what: 'Automate a recurring summary (for a club, a small business or your own job) with SQL, a spreadsheet script or n8n, with a human check before it goes out.',
        proves: 'You remove manual work, which S&O teams value and AI now makes faster.',
      },
    ],
    mistakes: [
      {
        mistake: 'Consulting jargon with no outcome (“drove strategic alignment”)',
        fix: 'Write the problem, the analysis, the change and the number. Say what the client or team did with your work.',
      },
      {
        mistake: 'Claiming the whole company’s growth',
        fix: 'Say what you owned: “on-time deliveries in 14 zones rose from 82% to 88%”, not “grew orders 3x”.',
      },
      {
        mistake: 'Tools listed with no use',
        fix: 'Put tools inside bullets: “SQL cohort analysis found…”, “an Excel staffing model set…”.',
      },
      {
        mistake: 'Hiding the teams you worked through',
        fix: 'Name the functions you moved (ops, sales, finance, product); S&O is hired to lead without authority.',
      },
      {
        mistake: 'No sign of judgement on cost',
        fix: 'Show the trade-off: “at flat incentive spend”, “payback in 5 months”. S&O leads think in unit economics.',
      },
    ],
    sample: {
      name: 'Kavya Menon (sample)',
      headline: 'Strategy & Operations Manager, supply and city operations',
      contact: 'Bengaluru · kavya@example.com · linkedin.com/in/example',
      summary:
        'Strategy & Operations manager with 4 years in food delivery and consulting. Owns supply planning for 14 zones: on-time deliveries up from 82% to 88% at flat incentive spend, and merchant go-live time down from 11 days to 6. Works in SQL, Excel models and controlled pilots.',
      experience: [
        {
          role: 'Manager, Strategy & Operations',
          org: 'Thaali Express (fictional)',
          dates: '2023 – present',
          bullets: [
            'Built a supply model for 14 zones and moved 9% of rider incentives to peak hours; on-time deliveries rose from 82% to 88% at flat spend.',
            'Root-caused a 7% drop in repeat orders to a delivery-fee change in 2 cities with SQL cohorts; the rollback recovered it in 3 weeks.',
            'Cut 3 hand-offs from merchant onboarding across sales, ops and risk; median go-live time fell from 11 days to 6.',
            'Set up the weekly business review for 5 city teams; actions closed on time rose from 54% to 81%.',
          ],
        },
        {
          role: 'Business Analyst',
          org: 'Northbridge Advisory (fictional)',
          dates: '2021 – 2023',
          bullets: [
            'Built the branch-level cost model for a 10-week retail-bank programme; the client approved the savings in its next budget.',
            'Sized a new SME lending market with top-down and bottom-up models for a fintech client’s board.',
          ],
        },
      ],
      projects: [
        {
          name: 'Practice take-home: quick-commerce dark-store placement in Pune',
          line: 'Scored 40 neighbourhoods on density and demand from public data; 5-slide answer-first deck.',
        },
      ],
      skills: [
        'SQL (cohorts, window functions)',
        'Excel and Sheets modelling',
        'Driver trees and root-cause analysis',
        'Pilot design with control groups',
        'Looker and Tableau dashboards',
        'Analysis drafts with Claude; n8n automations',
      ],
      education: 'B.Tech, Mechanical Engineering, 2021',
    },
    coverLetter: {
      subject: 'Strategy & Operations application: [Your name]',
      body: 'Hi [Hiring manager name],\n\nI am applying for the Strategy & Operations role on [team]. At Thaali Express I own supply planning for 14 zones. A zone-level model let us move 9% of rider incentives to peak hours, and on-time deliveries rose from 82% to 88% with no extra spend. I also cut merchant go-live time from 11 days to 6 by removing three hand-offs between sales, ops and risk.\n\nI looked at [Company] from public data and wrote a one-page analysis of [metric], with the two drivers I would check first and a small pilot to test the fix (attached).\n\nCould we find 20 minutes this week to go through it?\n\n[Your name]',
    },
    linkedin: {
      headline:
        'Strategy & Operations | Supply planning, unit economics, root-cause analysis | SQL, Excel, pilots | Food delivery',
      about:
        'I find the business problem that matters most and then run the fix with the teams who own it. In food delivery I rebuilt supply planning for 14 zones and lifted on-time deliveries from 82% to 88% at flat incentive spend, and cut merchant go-live time from 11 days to 6. Before that I built cost and market models as a consulting analyst. I write my own SQL and test changes against control zones before rolling them out.',
    },
    faqs: [
      {
        q: 'Should my S&O resume lean towards marketplace or SaaS work?',
        a: 'Match the post. DoorDash’s associate post centres on onboarding, SLA tracking and root cause, so lead with operations results. Sierra’s S&O lead post centres on revenue, headcount and compensation planning, so lead with planning and models.',
      },
      {
        q: 'I am a consultant. How do I rewrite my CV for S&O?',
        a: 'Turn each project into a solved case: the client’s problem (by industry and size), your analysis, what the client did, and the result. Add one bullet where you ran something yourself, because S&O hires people who implement.',
      },
      {
        q: 'I am a fresher. What do I put on an S&O resume?',
        a: 'Marks, projects and positions of responsibility in the one-page table format Indian campus recruiters expect. Add case competitions and one practice take-home with a clear recommendation.',
      },
      {
        q: 'Should an S&O resume mention AI tools?',
        a: 'Yes, with a use: “automated the weekly city report with n8n, saving 4 hours a week” beats “ChatGPT” in a skills list. GoodScore’s S&O post asks for spotting “automation opportunities”.',
      },
      {
        q: 'How long do recruiters spend on a resume?',
        a: 'A 2018 eye-tracking study by Ladders found recruiters spend about 7.4 seconds on the first skim. Clear headings and bulleted results held attention best.',
      },
    ],
  },

  lor: {
    metaTitle: 'Letter of Recommendation for Strategy & Operations (Sample)',
    metaDescription:
      'How to get a letter of recommendation for a Strategy & Operations or BizOps role: who should write it, what to highlight, a sample letter, the ask email and brief.',
    h1: 'Letter of recommendation for a Strategy & Operations role',
    directAnswer:
      'The strongest S&O recommendation comes from someone who saw you solve a business problem end to end: your manager, or the operations or business lead whose metric you moved. It should prove three things with specific stories: you found the real cause in messy data, you got other teams to act, and the number moved.',
    whoShouldWrite: [
      {
        who: 'Your manager or S&O lead',
        why: 'They set your problems and can confirm the analysis, the change and the result.',
      },
      {
        who: 'An operations, sales or finance leader whose metric you moved',
        why: 'S&O works through other teams, so a partner who acted on your work is strong evidence.',
      },
      {
        who: 'A former engagement manager (for ex-consultants)',
        why: 'They can speak to structured problem solving and how clients responded to your work.',
      },
    ],
    whatToHighlight: [
      {
        quality: 'Finds the real cause',
        evidence:
          '“Kavya traced our drop in repeat orders to a delivery-fee change in two cities, when everyone suspected app quality.”',
      },
      {
        quality: 'Gets other teams to act',
        evidence:
          '“She brought sales, operations and risk into one room and removed three hand-offs from onboarding.”',
      },
      {
        quality: 'Moves the number',
        evidence:
          '“Her supply model lifted on-time deliveries from 82% to 88% without adding incentive spend.”',
      },
      {
        quality: 'Thinks about cost',
        evidence: '“Every recommendation came with its cost, its payback and a pilot to test it.”',
      },
    ],
    structure: [
      {
        part: 'Opening',
        what: 'Who you are, how long and how you worked with the candidate, and the role they are applying for.',
      },
      {
        part: 'Headline claim',
        what: 'One sentence that sums them up, e.g. “the person I give the problems nobody owns”. Only if true.',
      },
      {
        part: 'Two specific cases',
        what: 'Each: the problem, how they analysed it, which teams they moved, and the measured result.',
      },
      {
        part: 'How they work with others',
        what: 'One short paragraph on influence without authority and how they handled being wrong or challenged.',
      },
      {
        part: 'Close',
        what: 'A clear recommendation and an offer to talk, with your contact details.',
      },
    ],
    sampleLetter: {
      context:
        'From a head of strategy & operations, for a job application (fictional people and company)',
      paragraphs: [
        'I am Rohan Bhatia, Head of Strategy & Operations at Thaali Express (fictional), a food delivery company. Kavya Menon has worked on my team for two years as a manager, owning supply planning across fourteen zones. I am glad to recommend her for a Strategy & Operations role.',
        'Kavya is the person I give the problems nobody owns. When repeat orders fell 7% in two cities, most of us suspected the app. She ran a cohort analysis, traced the drop to a delivery-fee change, and made the case to roll it back. Repeat rate recovered within three weeks.',
        'She is just as strong at running the fix. Her zone-level supply model showed that we paid incentives at the wrong hours. She tested a shift against matched control zones, then rolled it out: on-time deliveries rose from 82% to 88% with no extra spend.',
        'She also brings people with her. Merchant onboarding took eleven days because sales, operations and risk each waited on the others. Kavya got all three teams to agree a new order of checks; go-live now takes six days, and the teams still use her tracker.',
        'I recommend Kavya without reservation and would be happy to speak with you about her work.',
      ],
      signoff:
        'Rohan Bhatia, Head of Strategy & Operations, Thaali Express (fictional) · rohan@example.com',
    },
    askEmail: {
      subject: 'Would you be a reference for a Strategy & Operations role?',
      body: 'Hi [Name],\n\nI am applying for Strategy & Operations roles, starting with [Company]. You saw my work on [project] more closely than anyone, so I would be grateful if you could write a short recommendation or take a reference call.\n\nI have attached a one-page brief: the role, two cases you might mention, and the before-and-after numbers. Please change anything that does not match your memory, and tell me if any number should stay private.\n\nThe deadline is [date]. If now is a bad time, no problem at all.\n\nThank you,\n[Your name]',
    },
    brief: [
      'The job description and why you want the role (two lines).',
      'Two cases they saw, each with the problem, your analysis, the teams involved and the result.',
      'One time you were challenged or wrong, so they can speak to how you handle it.',
      'Which numbers are safe to share outside the company, and which to give as percentages only.',
      'The deadline, the format (letter, form or call) and where to send it.',
    ],
    variants: [
      {
        context: 'Job application or reference call',
        tweak:
          'Keep it to one page and lead with a case and its number. Many companies prefer a 15-minute call, so ask which they want.',
      },
      {
        context: 'MBA or master’s application',
        tweak:
          'Add growth and potential: how the candidate’s scope grew, a setback they learned from, and how they led people. Answer the school’s questions exactly.',
      },
      {
        context: 'Internal move (operations or analytics to S&O)',
        tweak:
          'Focus on S&O work already done: a cross-team problem they solved, the analysis and how other teams responded.',
      },
      {
        context: 'Referral note to a recruiter',
        tweak:
          'Three sentences: how you know them, the best problem they solved and its number, and why they fit this team.',
      },
    ],
    mistakes: [
      'Generic praise (“strategic, analytical, a great communicator”) with no case behind it.',
      'Describing the analysis but not the change it led to or the result.',
      'Crediting the candidate with the operations team’s work. Say what they found and drove.',
      'A senior recommender who barely saw the work. A specific letter from a direct manager beats a vague one from a VP.',
      'Writing the letter yourself and asking them to sign it. Send a brief and let them use their own words.',
    ],
    faqs: [
      {
        q: 'Do S&O roles ask for letters of recommendation?',
        a: 'Most companies use reference calls with your last manager and a peer. Letters matter more for MBA and master’s applications, internal moves and some Indian employers. The same brief works for both.',
      },
      {
        q: 'Who is the best person to recommend me for S&O?',
        a: 'Your direct manager first, then a business or operations leader who acted on your work. For ex-consultants, a former engagement manager who saw your analysis up close.',
      },
      {
        q: 'How long should the letter be?',
        a: 'One page, four to five short paragraphs: introduction, two specific cases with numbers, how the candidate works with others, and a clear close.',
      },
      {
        q: 'Can I write my own letter of recommendation?',
        a: 'Avoid it. Send your recommender a one-page brief with your cases and numbers, and let them write in their own voice.',
      },
    ],
  },
}
