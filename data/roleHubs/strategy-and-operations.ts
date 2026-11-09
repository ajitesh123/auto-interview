import type { RoleHub } from './types'

// Strategy & Operations (S&O) / Business Operations (BizOps) role hub.
// Sources opened on 2026-11-07:
// - Apollo.io people search (free): strict titles "Strategy and Operations" and "Business Operations",
//   started in the last 670 days, person in India / United States, India split by employer headcount.
//   No industry filter (S&O titles sit in tech, fintech, consumer and services alike).
// - Job posts with stated pay (URLs on each pay row). US posts were opened on VC portfolio job boards
//   (General Catalyst, Khosla, Thrive) that mirror the company's Greenhouse post; most are now closed
//   and are used as recent posted-pay data points. Plaid's post was open on plaid.com.
// - Levels.fyi: General Business Operations (US median, updated 6 Nov 2026), Ramp and Plaid biz-ops pages.
// - Story: Emergence Capital (Jul 2022), DoorDash on Medium (May 2017), Biz Ops Con 2017 (Medium),
//   Intercom (May 2018), YourStory (Swiggy, Jul 2021), Palle Substack (Uber launch playbook, Mar 2024,
//   second-hand), Hacking the Case Interview (consulting exits, updated Sep 2026), Google BizOps post (May 2026).
//
// Reported-question pages (opened 2026-11-07):
//   Uber: glassdoor.com.au/Interview/Uber-Strategy-and-Operations-Manager-Interview-Questions-EI_IE575263.0,4_KO5,36.htm
//         igotanoffer.com/en/advice/uber-strategy-and-operations-interview (aggregated, no per-question date)
//   DoorDash: igotanoffer.com/en/advice/doordash-strategy-and-operations-interview (aggregated),
//         glassdoor.com/Interview/DoorDash-Interview-RVW84336222.htm
//   Stripe: glassdoor.com/Interview/Stripe-Interview-E671932-RVW94805784.htm
//   Coinbase: glassdoor.com/Interview/Coinbase-Strategy-and-Operations-Associate-Interview-Questions-EI_IE779622.0,8_KO9,42.htm
//   Lyft: glassdoor.com/Interview/Lyft-Interview-E700614-RVW75625252.htm
//   Google: glassdoor.sg/Interview/Google-Strategy-and-Operations-Interview-Questions-EI_IE9079.0,6_KO7,30.htm
//   Rippling: glassdoor.com/Interview/Rippling-Interview-E2521509-RVW104214580.htm
//   Meesho: glassdoor.com/Interview/Meesho-Interview-E1503776-RVW65501004.htm
//   Swiggy: ambitionbox.com/interviews/swiggy-interview-questions/operations,
//         discuss.boardinfinity.com/t/swiggy-operations-manager-interview-questions-experience-guide/23580
//   Zepto: ambitionbox.com/interviews/zepto-interview-questions?page=4

const strategyAndOperations: RoleHub = {
  slug: 'strategy-and-operations',
  visuals: {
    og: '/static/images/roles/strategy-and-operations/og.jpg',
  },
  roleName: 'Strategy & Operations',
  shortName: 'S&O',
  metaTitle: 'Strategy & Operations Interview Prep 2026: Questions & Pay',
  metaDescription:
    'Strategy & Operations (BizOps) interview prep: 37 questions with model answers, 36 reported at Uber, DoorDash, Stripe, Swiggy and Zepto, plus loops and posted pay.',
  keywords: [
    'strategy and operations',
    'strategy and operations interview questions',
    'bizops interview questions',
    'business operations interview questions',
    'strategy and operations associate',
    'strategy and operations salary',
    'doordash strategy and operations interview',
    'uber strategy and operations interview',
  ],
  heroTitle: 'Strategy & Operations interview prep',
  heroDescription:
    'The in-house consultant who also runs the fix. What S&O and BizOps teams do at startups and marketplaces, 37 questions (36 reported by candidates) with model answers and what the interviewer listens for, the take-home cases, and pay from real job posts.',
  directAnswer:
    'A Strategy & Operations (S&O) or BizOps hire finds the business problem that matters most, sizes it with data, and then runs the fix with the teams who own it. In India, 1,450 people started a strict “Strategy & Operations” title since January 2025, and 5,341 a “Business Operations” title. Loops test cases, metrics root-cause, Excel or SQL, and almost always a take-home you present to a panel.',
  lastUpdated: '2026-11-07',
  story: {
    summary:
      'BizOps grew inside fast-scaling tech companies in the early 2010s, when founders needed consultants who would stay and run the change. Uber’s city launchers and DoorDash’s S&O team made it a marketplace job. By 2026, S&O and BizOps are the most common landing spots for consultants leaving their firms, and AI enablement is part of the job description.',
    born: { when: '2012', what: 'Stripe has a Head of BizOps hiring scrappy generalists' },
    rise: { when: '2017', what: 'DoorDash describes its S&O team; BizOps gets its own conference' },
    milestones: [
      {
        when: '2012–2016',
        title: 'BizOps teams appear at fast-growing tech companies',
        detail:
          'Emergence Capital credits LinkedIn, Pinterest and NerdWallet with pioneering BizOps and growing it to dozens or hundreds of people. It names Brian Sze as Stripe’s Head of BizOps from 2012 to 2016, hiring scrappy generalists.',
        sourceLabel: 'Emergence Capital (Jul 2022)',
        sourceUrl:
          'https://www.emcap.com/thoughts/bizops-what-it-is-and-why-early-stage-companies-should-hire-for-it',
      },
      {
        when: '2012–2014',
        title: 'Uber’s city-launch playbook',
        detail:
          'A second-hand account says Uber built a launch team with a playbook updated after every city. Each city got a general manager, a marketing manager for demand and an operations manager for supply. By the end of 2014 it was launching about a city a day.',
        sourceLabel: 'Palle Substack (Mar 2024, second-hand account)',
        sourceUrl: 'https://palle.substack.com/p/how-uber-ensured-global-dominance-ac3',
      },
      {
        when: 'May 2017',
        title: 'DoorDash describes its Strategy & Operations team',
        detail:
          'DoorDash says S&O works across seven US and Canadian regions, with specialists for merchants, customers and Dashers, and “Launchers” who open new markets in 6 to 8 weeks. Balancing the three-sided marketplace is the core problem.',
        sourceLabel: 'DoorDash on Medium',
        sourceUrl:
          'https://medium.com/@DoorDash/strategy-ops-has-its-finger-on-the-pulse-of-doordashs-three-sided-marketplace-6007f90244e1',
      },
      {
        when: 'Aug 2017',
        title: 'BizOps gets its own conference',
        detail:
          'Biz Ops Con 2017, hosted by NerdWallet, Twitch and Rubrik, called BizOps “connective tissue” and an internal consultant that owns OKRs and KPIs. The first BizOps hire typically came at about 50 to 100 people.',
        sourceLabel: 'Biz Ops Con 2017 notes (Medium)',
        sourceUrl: 'https://medium.com/business-operations/biz-ops-con-2017-d40036914807',
      },
      {
        when: '2015–2021',
        title: 'In India, strategy roles become a path to leadership',
        detail:
          'Phani Kishan joined Swiggy in 2015, was Chief of Staff to the CEO in 2017, then Head of Strategy and Investments. In 2021 Swiggy named him co-founder; the CEO called him the “fixer” who set up functions from scratch.',
        sourceLabel: 'YourStory (Jul 2021)',
        sourceUrl:
          'https://yourstory.com/2021/07/swiggy-elevates-phani-kishan-to-co-founder-sriharsha-majety/amp',
      },
      {
        when: '2026',
        title: 'The top exit for consultants, and an AI brief',
        detail:
          'Hacking the Case Interview says BizOps and S&O hire the most ex-consultants, ahead of chief of staff and PM. A May 2026 Google BizOps post puts “Google’s AI enablement efforts” at the core of the team’s work.',
        sourceLabel: 'Hacking the Case Interview (updated Sep 2026)',
        sourceUrl: 'https://www.hackingthecaseinterview.com/pages/consulting-to-startup',
      },
      {
        when: 'Jan 2025 → now',
        title: '1,450 new S&O hires in India',
        detail:
          '1,450 people in India started a strict Strategy & Operations title since January 2025. 515 of them joined companies of more than 5,000 people, and 473 joined companies of 200 or fewer.',
        sourceLabel: 'Our count (Apollo people search)',
        sourceUrl: '#hiring',
      },
    ],
    why: [
      'Fast-growing companies have more problems than owners. S&O takes the ones that sit between teams, such as pricing, supply, unit economics or planning.',
      'Marketplaces (rides, food, quick commerce) must balance supply and demand city by city, which needs people who can model it and run it.',
      'Consultants want to own outcomes, not slides, and companies want their structured thinking without a consulting bill.',
    ],
  },
  aiAngle:
    'S&O teams are often the first to automate their own work: weekly business reviews, data pulls, vendor and partner follow-ups. Learn to use Claude or ChatGPT to draft an analysis memo from a spreadsheet, and n8n to automate one recurring report, then check every number by hand. Interviewers still score your judgement; AI only makes the first draft faster.',
  mustKnow:
    'Every S&O answer is a short consulting case that ends in action: define the goal metric, break it into its drivers, find which driver moved, size the fix, and say who you would work with and what you would do on Monday. If your answer stops at “it depends”, it has not started.',
  whatTheRoleIs: [
    'A Strategy & Operations hire is an in-house problem solver. A typical week: own a business metric (orders per city, onboarding time, cost per delivery), pull and model the data, write a recommendation, then run the change with operations, product, finance or sales. Titles vary: Strategy & Operations, BizOps, Business Operations, Strategy & Planning.',
    'The title spans several levels. US posts with stated pay ask for 1–3 years (Ramp’s international BizOps role) up to 15+ years (Stripe’s company-level S&O role). Most hires come from consulting, banking or analytics after 2–4 years; marketplaces also promote strong city or ops managers.',
    'In India it is common at both large companies and startups. Of the 1,446 new S&O hires with a known employer size, 515 joined companies of more than 5,000 people (Google is one) and 473 joined companies of 200 or fewer. At a startup you also run operations day to day; at a large company you usually own one region, product line or planning cycle.',
  ],
  expectationLabels: {
    nav: 'Marketplace vs SaaS',
    title: 'What hiring managers expect: marketplace vs B2B SaaS',
    sub: 'The same toolkit, different levers. Know which one you are interviewing for.',
    a: 'Marketplace (rides, food, quick commerce)',
    b: 'B2B SaaS and fintech',
    aNote: 'Uber, DoorDash, Swiggy, Zepto',
    differenceTitle: 'How S&O differs from nearby roles',
  },
  expectations: {
    b2b: {
      headline: 'Marketplace: balance supply and demand, city by city',
      points: [
        'Own a city or region’s numbers: orders, delivery time, partner supply, cost per order.',
        'Diagnose a metric that moved (“delivery times are up in one zone”) and fix it within days.',
        'Plan supply for peak hours, weather and festivals; staffing models are a common case.',
        'Run incentives and pricing tests for drivers, riders, restaurants or stores.',
        'Launch new cities or categories with a playbook, then hand it to operations.',
      ],
      metrics: [
        'Orders and active customers per city',
        'Delivery or ETA time, and on-time %',
        'Partner supply and utilisation at peak',
        'Contribution margin per order',
      ],
    },
    b2c: {
      headline: 'B2B SaaS and fintech: plan the business and fix the funnel',
      points: [
        'Run planning: revenue targets, headcount and sales capacity, quarterly forecasts.',
        'Fix a broken process across teams, such as onboarding, lead routing or pricing approvals.',
        'Build the operating rhythm: weekly business reviews, dashboards, OKRs.',
        'Size new markets or products and write the business case.',
        'Partner with sales, finance and product leaders as an internal consultant.',
      ],
      metrics: [
        'Pipeline and bookings vs plan',
        'Onboarding or time-to-live for new customers',
        'Net revenue retention',
        'Cost to serve per customer',
      ],
    },
    difference: [
      'Versus management consulting: a consultant recommends and leaves; S&O recommends and then runs the fix, owning the metric afterwards.',
      'Versus Founder’s Office or Chief of Staff: those roles follow one leader’s priorities across everything; S&O usually owns a defined business area or planning process.',
      'Versus operations manager: an ops manager runs the daily machine; S&O redesigns the machine with data and decides where it should grow.',
      'Versus business or data analyst: an analyst finds the insight; S&O turns it into a decision and drives it through other teams.',
      'Versus product manager: a PM decides what software to build; S&O changes the business with pricing, process, incentives and planning, often without new software.',
    ],
  },
  skills: [
    {
      area: 'Problem solving',
      items: [
        'Break a goal into a driver tree (orders = customers × frequency)',
        'Root-cause a metric change: data check, internal, external, segment',
        'Size a market or opportunity with stated assumptions',
        'End every analysis with a recommendation and its cost',
      ],
    },
    {
      area: 'Data',
      items: [
        'Excel or Sheets: pivots, lookups, scenarios, a clean model',
        'SQL: joins, group by, window functions for cohorts',
        'Unit economics: contribution margin, CAC, payback',
        'Read a dashboard and question it',
      ],
    },
    {
      area: 'Execution',
      items: [
        'Write a one-page recommendation memo',
        'Run a weekly business review and track actions',
        'Design a pilot with a control and a stop rule',
        'Hand a process over to the team that will own it',
      ],
    },
    {
      area: 'Stakeholders and AI',
      items: [
        'Influence teams you do not manage',
        'Present to a director in 10 minutes',
        'Draft analyses with Claude or ChatGPT and check every number',
        'Automate a recurring report with n8n or scripts',
      ],
    },
  ],
  getHired: {
    intro:
      'S&O hiring managers look for evidence that you can find the problem in messy data and then get other teams to act. Your resume should read like cases you solved, each with a number. The fastest way in without the title is a one-page analysis of their business, built from public data, sent to the hiring manager.',
    bullets: [
      {
        weak: 'Worked on strategic projects with senior stakeholders.',
        strong:
          'Built a city-level supply model for 14 zones and moved 9% of rider incentives from off-peak to peak hours; on-time deliveries rose from 82% to 88% with flat incentive spend.',
      },
      {
        weak: 'Responsible for improving operational efficiency.',
        strong:
          'Mapped merchant onboarding across sales, ops and risk, cut 3 hand-offs and moved document checks earlier; median time to go live fell from 11 days to 6.',
      },
      {
        weak: 'Did data analysis in Excel and SQL.',
        strong:
          'Root-caused a 7% drop in repeat orders to a delivery-fee change in two cities using SQL cohort analysis; the rollback recovered repeat rate within 3 weeks.',
      },
      {
        weak: 'Consultant at a strategy firm.',
        strong:
          'Consultant on a 10-week cost programme for a retail bank: built the branch-level cost model, ran 6 operations workshops and identified savings the client approved in the next budget.',
      },
    ],
    resumeTips: [
      'Write each bullet as a solved case: the problem, how you analysed it, the change you drove and the number that moved.',
      'Show the teams you moved without authority (operations, sales, finance, product).',
      'Name the tools in context: SQL, Excel models, Looker or Tableau, a pilot with a control group.',
      'Consultants: replace client names with industry and size, and say what the client did with your work.',
      'Add one link: a one-page analysis or a public model. It answers “can you do our take-home?”.',
      'One page under 8 years of experience; Indian campus roles expect the table format with marks.',
    ],
    channels: [
      {
        name: 'Company career pages and Greenhouse boards',
        how: 'Most US and many Indian tech companies post S&O and BizOps roles here first. DevRev’s Bengaluru strategic operations role and DoorDash’s associate roles were on Greenhouse.',
        url: 'https://job-boards.greenhouse.io/devrev/jobs/5576360004',
      },
      {
        name: 'Weekday',
        how: 'Indian startup posts, often with a pay band. Search “strategy”, “business operations” and “founder’s office” separately, as titles overlap.',
        url: 'https://www.weekday.works/jobs/operations-strategy-jobs-in-bengaluru',
      },
      {
        name: 'Campus and consulting alumni networks',
        how: 'Indian unicorns hire S&O and strategy associates from IIMs, IITs and other campuses, and from consulting firms through alumni referrals.',
      },
      {
        name: 'Internal moves',
        how: 'City managers, analysts and ops leads who already own a metric often move into S&O by solving one cross-team problem well.',
      },
    ],
    outreach: {
      title: 'A five-line note with a one-page analysis',
      body: 'Hi [Name], I saw you are hiring for Strategy & Operations on [team] at [Company].\n\nAt [current company], I [solved X], which moved [metric] from [A] to [B].\n\nI looked at [their business] from public data and wrote a one-page analysis: the metric I think matters most for [team] this year, the two drivers I would check first, and a small pilot to test the fix.\n\nWorth 20 minutes this week?',
      note: 'Send it to the S&O lead or the business head the role supports. Follow up once after 5–6 days, then stop.',
    },
    proofOfWork: {
      title: 'Do a take-home before they send you one',
      why: 'Nearly every reported S&O loop includes a take-home case. Doing one on their business shows the whole job: structure, data, recommendation and a plan.',
      steps: [
        'Pick one metric that matters to their business (delivery time, onboarding time, repeat rate) and draw its driver tree.',
        'Find public data: app reviews, earnings or annual reports, city launches, pricing pages. Build a small model in Sheets.',
        'Write a one-page memo: what is happening, why, what you would test, and the expected impact with your assumptions.',
        'Add a 5-slide version and record a 3-minute walkthrough, as if presenting to the panel.',
      ],
    },
  },
  process: [
    {
      companyType: 'US marketplace or fintech (Uber, DoorDash, Stripe, Lyft)',
      rounds: [
        'Recruiter screen: background, why S&O, why this company',
        'Hiring manager: behavioural plus how you would tackle a problem',
        'Take-home case with data (often a full day of work), presented to a panel',
        'Final loop of 3–4 interviews with cross-functional partners',
      ],
    },
    {
      companyType: 'Indian consumer unicorn (Swiggy, Zepto, Meesho)',
      rounds: [
        'Guesstimate and case round, sometimes a group discussion on campus',
        'Excel test or questions (pivot tables, VLOOKUP) for ops-heavy roles',
        'One-on-one case with a senior leader (expansion, retention, pricing)',
        'HR or culture round; stress questions on defending your numbers are reported',
      ],
    },
    {
      companyType: 'Early-stage startup',
      rounds: [
        'Founder or business head conversation',
        'A real problem from the business as a take-home or live case',
        'Sessions with the teams you would work with',
        'Final with the founder; 2–5 weeks in total',
      ],
    },
    {
      companyType: 'What candidates reported',
      rounds: [
        'Uber S&O Manager (Feb 2026): recruiter, hiring manager, take-home case presented to a panel, then three cross-functional interviews; about 2 months end to end (Glassdoor)',
        'Stripe S&O (2025–26): recruiter, hiring manager, a written take-home, then a loop of 4 (3 behavioural, 1 functional case), then references (Glassdoor)',
        'Coinbase S&O Associate: HR screen, a short live Excel case, a live problem-solving case, behavioural rounds, and a take-home with presentation (Glassdoor)',
        'Lyft Product Strategy & Ops Analyst (Apr 2023): recruiter, a MySQL interview on CoderPad, a 48-hour take-home, then a 45-minute presentation and 30-minute behavioural (Glassdoor)',
        'Rippling Revenue S&O (May 2026): recruiter, hiring manager, a take-home on routing and onboarding data, a case review, then 2–3 cross-functional interviews (Glassdoor)',
      ],
    },
  ],
  pay: {
    title: 'Pay: US job posts, Levels.fyi, and what India posts show',
    headline: 'US $176K base (post median) · India posts rarely state pay',
    intro:
      'US posts for S&O and BizOps state pay because of pay-transparency laws: from $104K–143K for a BizOps associate at Ramp to $233.6K–350.4K for Stripe’s company-level S&O role. The median midpoint across the 9 base-salary posts we opened is $176K. Indian S&O posts rarely state pay; we found two with a band.',
    tables: [
      {
        region: 'United States: job posts with stated pay',
        tab: 'US · job posts',
        currency: 'USD (base salary per year, as posted)',
        rows: [
          {
            band: 'Ramp, BizOps Associate (Compensation), New York',
            experience: '2–5 yrs',
            value: '$104K–143K',
            url: 'https://jobs.thrivecap.com/companies/ramp-2/jobs/62918530-business-operations-associate-compensation',
          },
          {
            band: 'Ramp, Business Operations (International), New York',
            experience: '1–3 yrs',
            value: '$120K–160K',
            url: 'https://jobs.generalcatalyst.com/companies/ramp-2/jobs/55559806-business-operations-international',
          },
          {
            band: 'Plaid, Business Operations (Payments), New York',
            experience: '2–3 yrs',
            value: '$136.8K–162K',
            url: 'https://plaid.com/careers/openings/business-operations/new-york/business-operations-payments',
          },
          {
            band: 'Stripe, S&O Business Partner, US',
            experience: '7+ yrs',
            value: '$140.4K–210.6K',
            url: 'https://jobs.khoslaventures.com/companies/stripe/jobs/61079692-strategy-operations-business-partner',
          },
          {
            band: 'Cambly, Strategy and Operations Lead, hybrid',
            experience: '12+ yrs',
            value: '$150K–200K',
            url: 'https://joinrise.co/cambly/strategy-and-operations-lead-ft80',
          },
          {
            band: 'Stripe, Strategy & Operations (Connect), US / Toronto',
            experience: '6+ yrs',
            value: '$154.4K–231.6K',
            url: 'https://jobs.generalcatalyst.com/companies/stripe/jobs/60953327-strategy-operations-connect',
          },
          {
            band: 'DoorDash, Senior Manager S&O, SF / LA / NYC',
            experience: '7+ yrs',
            value: '$164.5K–247K',
            url: 'https://jobs.khoslaventures.com/companies/doordash/jobs/25188561-senior-manager-strategy-operations',
          },
          {
            band: 'Stripe, Operations & Strategy (Partner Eng.), US',
            experience: '10+ yrs',
            value: '$165.2K–247.8K',
            url: 'https://jobs.generalcatalyst.com/companies/stripe/jobs/42524799-operations-strategy-partner-engineering',
          },
          {
            band: 'Stripe, Company Strategy & Operations, US',
            experience: '15+ yrs',
            value: '$233.6K–350.4K',
            url: 'https://jobs.generalcatalyst.com/companies/stripe/jobs/86703711-company-strategy-operations',
          },
          {
            band: 'Stripe, Sales S&O Business Partner (OTE), Chicago',
            experience: '7+ yrs',
            value: '$189.4K–284K OTE',
            url: 'https://jobs.generalcatalyst.com/companies/stripe/jobs/81389759-sales-strategy-operations-business-partner',
          },
        ],
        note: 'Each row is one post; tap it to open. The median midpoint of the 9 base-salary posts is $176K; the last row is on-target earnings (base plus commission) and is left out of the median. Most posts are now closed; Stripe, DoorDash and Ramp list equity on top. DoorDash’s range is the lowest and highest of its state bands.',
        sourceLabel: 'Company job posts (via Plaid, Rise and VC portfolio job boards)',
        sourceUrl:
          'https://plaid.com/careers/openings/business-operations/new-york/business-operations-payments',
        asOf: 'Nov 7, 2026',
      },
      {
        region: 'United States: Levels.fyi total compensation',
        tab: 'US · Levels.fyi',
        currency: 'USD (total compensation per year)',
        rows: [
          {
            band: 'General Business Operations, median',
            experience: 'All levels',
            value: '$112K',
            url: 'https://www.levels.fyi/t/biz-ops/focus/general.md',
          },
          {
            band: 'Ramp, Business Operations, average',
            experience: 'All levels',
            value: '$140K–159K',
            url: 'https://www.levels.fyi/en-gb/companies/ramp/salaries/biz-ops',
          },
          {
            band: 'Plaid, Business Operations, average',
            experience: 'All levels',
            value: '$233K–270K',
            url: 'https://www.levels.fyi/en-gb/companies/plaid/salaries/biz-ops',
          },
        ],
        note: 'Levels.fyi’s general figure covers all business operations roles, including many outside tech, so it sits below the tech posts. Company pages show averages, not medians.',
        sourceLabel: 'Levels.fyi',
        sourceUrl: 'https://www.levels.fyi/t/biz-ops/focus/general.md',
        asOf: 'Nov 7, 2026',
      },
      {
        region: 'India: job posts with stated pay',
        tab: 'India · job posts',
        currency: 'INR (₹, lakh per annum, as posted)',
        rows: [
          {
            band: 'Weekday client, Global Business Operations Manager, Noida',
            experience: '5+ yrs',
            value: '₹7–13 LPA',
            url: 'https://startup.jobs/global-business-operation-manager-weekday-ai-8056122',
          },
          {
            band: 'Weekday client, Founder’s Office: Strategy & Consumer Insights, Bengaluru',
            experience: '2–4 yrs',
            value: '₹30–40 LPA',
            url: 'https://jobs.weekday.works/weekday-partner-network-founders-office---strategy-%26-consumer-insights-6iilgk',
          },
        ],
        note: 'Only two Indian S&O posts we opened state a band. Posts at DevRev, GoodScore, Postman and Varni Labs gave no pay. For a closer benchmark, see Founder’s Office pay (17 posts, median midpoint ₹19.5 LPA), and check any offer in hand with our salary calculator.',
        sourceLabel: 'Weekday job posts',
        sourceUrl: 'https://www.weekday.works/jobs/operations-strategy-jobs-in-bengaluru',
        asOf: 'Nov 7, 2026',
      },
    ],
    crossCheck:
      'Posted base pay at tech companies ($176K median midpoint) sits well above Levels.fyi’s general business operations median ($112K), which covers many non-tech employers. In India, S&O pay is negotiated more than posted: ask for the fixed and variable split and compare offers on in-hand pay.',
  },
  hiring: {
    title: 'Where new S&O hires went in India, 2025–26',
    segments: true,
    intro:
      'In India, 1,450 people started a strict “Strategy & Operations” title since January 2025, and 5,341 started a “Business Operations” title. S&O hiring splits between giants and startups: 515 joined companies of more than 5,000 people, 473 joined companies of 200 or fewer. In the US, the same counts are 9,233 and 15,968.',
    companies: [
      { name: '200 people or fewer', count: 473, segment: 'Startups' },
      { name: '201–1,000 people', count: 212, segment: 'Scale-ups' },
      { name: '1,001–5,000 people', count: 246, segment: 'Large companies' },
      { name: 'Over 5,000 people', count: 515, segment: 'Enterprises and Big Tech' },
    ],
    method:
      'Counted in Apollo.io: people located in India whose current title strictly matches “Strategy and Operations” (Apollo also returns “Strategy & Operations”), who started it in the last 670 days, split by employer headcount. 1,446 of 1,450 had a known company size. No industry filter was applied. “Business Operations” (5,341 in India) is a separate title count and is not added. US: same filters, 9,233 and 15,968.',
    sourceLabel: 'Apollo.io people data',
    asOf: 'Nov 7, 2026',
  },
  questionGroups: [
    {
      id: 'fit',
      title: 'Motivation and stakeholders',
      blurb:
        'Every loop has behavioural rounds, and Stripe’s final loop was mostly behavioural. Prepare five stories: a process you fixed, a call made on thin data, a stakeholder you won over, a metric you owned, a time you were wrong.',
      questions: [
        {
          q: 'Why Strategy & Operations, and why leave consulting (or your current role)?',
          answer:
            'Give a reason that points forward, not away. Most strong answers say: I liked structuring problems, but I want to own the outcome after the recommendation.\n\nBack it with one moment: a project where you saw a client fail to implement, or where you ran the change yourself and enjoyed it.\n\nThen tie it to their business: the metric or problem on this team you would want to own first.',
          lookFor:
            'A forward-looking reason, one real example, and a link to this team’s problems.',
          criteria: [
            'Wants to own outcomes, not just advise',
            'One concrete example from past work',
            'Names a problem on this team they want to own',
          ],
        },
        {
          q: 'Tell me about a time you had to influence cross-functional stakeholders to adopt your proposal. (Asked at Uber, per Glassdoor)',
          answer:
            'S&O has no direct authority, so this is the core skill. Pick a story where the other team had a real reason to say no.\n\nWalk through it: what you proposed, who resisted and why, what you did to understand their incentive, and how you changed the proposal or the evidence. Data alone rarely wins; a small pilot or a shared metric often does.\n\nEnd with the result and how the relationship stood afterwards.',
          lookFor:
            'Understanding the other side’s incentives, evidence plus a pilot, and a relationship that survived.',
          criteria: [
            'Names who resisted and why',
            'Adapted the proposal, not just pushed harder',
            'Used a pilot or shared metric',
            'Result with a number',
          ],
          round: 'Cross-functional',
        },
        {
          q: 'Tell me about a process you implemented. (Asked at Stripe, per Glassdoor)',
          answer:
            'Choose a process that solved a measurable pain: slow approvals, missed hand-offs, a weekly report nobody trusted.\n\nCover the before (how slow, how many errors), how you designed the new process with the people who would run it, how you rolled it out, and the after.\n\nAdd what you did so it kept working without you: an owner, a dashboard, a review rhythm.',
          lookFor:
            'A clear before and after, co-design with the users, and a process that outlived you.',
          criteria: [
            'Before-and-after numbers',
            'Designed with the people who run it',
            'Owner or cadence that keeps it alive',
          ],
          reportedAt: 'Feb 2025',
        },
        {
          q: 'Tell me about a time you made a recommendation with incomplete data. (Asked at Uber, per IGotAnOffer)',
          answer:
            'Show that you can decide, and that you know what you do not know.\n\nDescribe the decision and the deadline, the data you had and the gap. Then explain how you bounded the risk: a range of outcomes, a proxy metric, a reversible first step.\n\nClose with what happened and what data you set up so the next call was easier.',
          lookFor:
            'A decision made on time, the uncertainty stated plainly, and a reversible or staged step.',
          criteria: [
            'Made the call by the deadline',
            'Stated the assumptions and the gap',
            'Chose a reversible or staged step',
            'Set up data for next time',
          ],
        },
        {
          q: 'Tell me about a time you had to own metrics, and used data to solve a problem. (Asked at DoorDash, per IGotAnOffer)',
          answer:
            'Pick a metric you were accountable for, not just one you reported. State its level and target.\n\nWalk through how you noticed it going wrong, the analysis that found the cause (segments, cohorts, a funnel step), and the change you drove.\n\nGive the number before and after, and how you kept watching it.',
          lookFor:
            'Real accountability for a number, analysis that found the cause, and a measured fix.',
          criteria: [
            'Owned the metric, with a target',
            'Found the cause with segments or cohorts',
            'Before-and-after numbers',
          ],
          round: 'Behavioural',
        },
        {
          q: 'When a senior challenges your numbers and says you are wrong, how do you respond? (Asked at Swiggy, per Board Infinity)',
          answer:
            'Stay calm and get specific. First, ask which number they doubt and why; sometimes they know something you do not.\n\nThen walk through your source and method briefly. If you made an error, say so at once and say when you will send the corrected figure. If you did not, show the check that confirms it and offer to reconcile with their source.\n\nThe goal is the right number, not winning.',
          lookFor:
            'Calm, curiosity about their objection, a quick check, and owning any error at once.',
          criteria: [
            'Asks which number and why before defending',
            'Explains source and method briefly',
            'Owns an error immediately if there is one',
          ],
          round: 'Stress interview',
        },
        {
          q: 'Tell me about a time you presented data to a non-technical audience. (Asked at Lyft, per Glassdoor)',
          answer:
            'Lead with the decision you wanted, not the method. A good structure: the answer in one sentence, the two numbers that prove it, the one chart that shows it, and the ask.\n\nDescribe how you cut the analysis down and what questions came up. Mention how you handled a question you could not answer on the spot.\n\nEnd with the decision the audience made.',
          lookFor: 'Answer first, very few numbers, one clear chart, and a decision at the end.',
          criteria: [
            'Led with the answer and the ask',
            'Cut to two or three numbers',
            'Ended in a decision',
          ],
          reportedAt: 'Apr 2023',
          round: 'Behavioural',
        },
        {
          q: 'Why do you want to work at Stripe? (Asked at Stripe, per Glassdoor)',
          answer:
            'Swap in any company; the shape is the same. Show you understand how the business makes money and where it is pushing next.\n\nFor Stripe: the business grows with the payment volume of its users, so S&O work is about growing and serving those users efficiently. Name a product or market you read about and the operating problem it creates.\n\nEnd with why your background fits that problem.',
          lookFor:
            'Knows how the company makes money, names a current push, and links it to their own skills.',
          criteria: [
            'Explains the business model in a sentence',
            'Names a current product or market push',
            'Links their background to it',
          ],
          reportedAt: 'Feb 2026',
        },
      ],
    },
    {
      id: 'metrics',
      title: 'Metrics and root-cause',
      blurb:
        'The most common S&O question: a number moved, find out why and fix it. Use one order every time: check the data, then internal changes, then external factors, then segment.',
      questions: [
        {
          q: 'Uber Eats delivery times are increasing. How would you find and fix the problem? (Asked at Uber, per IGotAnOffer)',
          answer:
            'Clarify first: how much, since when, everywhere or some cities, and is it the average or the slow tail?\n\nThen split delivery time into its parts: restaurant prep time, wait for a courier, courier travel to the restaurant, and travel to the customer. Find which part grew. Check internal changes (a new dispatch rule, app release, incentive cut) and external ones (rain, traffic, a festival, a competitor paying couriers more).\n\nIf courier wait is up at peak, you have a supply gap: shift incentives to peak hours in the affected zones and test it against similar zones. Track on-time rate and cost per order.',
          lookFor:
            'Clarifying questions, splitting time into stages, internal versus external causes, and a tested fix with a guardrail.',
          criteria: [
            'Asks how much, since when, where',
            'Splits delivery time into stages',
            'Checks internal and external causes',
            'Proposes a tested fix with a cost guardrail',
          ],
        },
        {
          q: 'First-time users are rising, but retention is falling in a market. How would you diagnose it? (Asked at Uber, per IGotAnOffer)',
          answer:
            'First check the maths: if many new users join, the average retention falls even if nothing broke, because new users churn more. Compare cohorts of the same age, not the blended rate.\n\nIf like-for-like cohorts also retain worse, ask where the new users came from. A promo or a new channel may bring low-intent users. Then check the experience: first-trip quality, ETAs, cancellations and prices for the new cohorts.\n\nRecommend by cause: fix the acquisition mix, or fix the first-order experience, and measure 30-day cohort retention.',
          lookFor:
            'Spotting the mix effect, cohort analysis, acquisition channel quality, and first-experience checks.',
          criteria: [
            'Separates mix effect from real decline',
            'Compares cohorts of the same age',
            'Checks acquisition channel quality',
            'Checks first-experience quality',
          ],
        },
        {
          q: 'What metrics would you use to measure the health of a marketplace? (Asked at Uber, per IGotAnOffer)',
          answer:
            'Cover both sides and the match between them.\n\nDemand: active riders or customers, orders per user, retention. Supply: active drivers or partners, hours online, earnings per hour, churn. Matching: time to match or ETA, fulfilment rate (requests that complete), cancellation rate, surge or wait frequency.\n\nThen economics: take rate and contribution margin per order. Pick one north-star (completed trips, for example) and explain which two numbers you would watch daily.',
          lookFor:
            'Both sides of the market, matching metrics, economics, and one chosen north-star.',
          criteria: [
            'Demand-side metrics',
            'Supply-side metrics',
            'Matching metrics such as fulfilment and ETA',
            'Unit economics and one north-star',
          ],
        },
        {
          q: 'Map out the end-to-end order journey with KPIs and how you would improve it. (Asked at DoorDash, per IGotAnOffer)',
          answer:
            'Draw the journey as steps and give each a metric: app open → search (search-to-menu rate) → cart (add-to-cart) → checkout (checkout conversion) → restaurant accepts (acceptance rate, prep time) → Dasher assigned (assignment time) → pickup (wait at restaurant) → drop-off (travel time, on-time %) → after the order (ratings, refunds, reorder within 30 days).\n\nThen pick the step with the biggest drop or delay, based on data, and propose one fix with a test. Say which metric would prove it worked.',
          lookFor:
            'A complete journey across customer, merchant and courier, a KPI per step, and a data-led priority.',
          criteria: [
            'Covers customer, merchant and courier steps',
            'A KPI for each step',
            'Prioritises one step with data',
          ],
        },
        {
          q: 'How would you improve low Dasher availability in Chicago during winter? (Asked at DoorDash, per IGotAnOffer)',
          answer:
            'Define the gap first: which hours and zones lack Dashers, and how much demand goes unserved or late.\n\nCauses split into fewer Dashers online (cold, snow, holidays) and higher demand (people order more in bad weather). Levers: peak or weather pay for the worst hours, scheduling that guarantees earnings for committed shifts, recruiting part-timers before the season, and on the demand side, wider delivery times or temporary radius limits.\n\nTest pay boosts in matched zones and watch cost per order and on-time rate.',
          lookFor:
            'Sizing the gap by hour and zone, supply and demand levers, and a cost-aware test.',
          criteria: [
            'Sizes the gap by hour and zone',
            'Supply levers such as weather pay and scheduling',
            'Demand-side levers',
            'Tests with cost per order as a guardrail',
          ],
        },
        {
          q: 'If delayed deliveries cluster in one area, how would you diagnose the root cause and fix it? (Asked at Swiggy, per Board Infinity)',
          answer:
            'Compare the area with similar areas: is it slower at the restaurant, waiting for a rider, or on the road?\n\nCheck what changed there: new restaurants with long prep times, a road closure, a rider shortage after an incentive change, a map or address problem with a new housing society.\n\nFix by cause: re-time prep estimates for slow restaurants, add rider supply at peak, or correct addresses and pin locations. Re-check the area’s on-time rate a week later.',
          lookFor:
            'Comparison with similar areas, stage-by-stage breakdown, local causes, and a matched fix.',
          criteria: [
            'Compares with similar areas',
            'Breaks delay into stages',
            'Looks for a local change',
            'Fix matched to the cause, then re-checked',
          ],
          round: 'Situational',
        },
        {
          q: 'If orders increase by X% in a specific zone, what happens to delivery time and how would you mitigate it? (Asked at Swiggy, per Board Infinity)',
          answer:
            'Think in capacity. Each rider can do a certain number of orders an hour. If orders rise faster than riders online, waiting time grows sharply once utilisation is high, not gradually.\n\nEstimate: current orders per hour, riders online, orders per rider per hour, and the utilisation after the rise. If it goes above roughly 85–90%, delays climb.\n\nMitigate with more riders at those hours (incentives, borrowing from nearby zones), batching two orders per trip where routes match, and temporarily limiting the delivery radius.',
          lookFor:
            'Capacity and utilisation thinking, a quick estimate, and supply, batching and demand levers.',
          criteria: [
            'Uses capacity and utilisation',
            'Does a quick estimate',
            'Offers supply, batching and demand levers',
          ],
          round: 'Case study',
        },
        {
          q: 'What variables would you look at to decide if a test launch of a new feature succeeded? (Asked at DoorDash, per IGotAnOffer)',
          answer:
            'Agree on success before the launch. One primary metric linked to the goal (for example conversion or orders per user), two or three guardrails (cancellations, support contacts, cost per order), and the minimum change worth shipping.\n\nCheck the test itself: was assignment random, is the sample big enough, did it run long enough to cover weekdays and weekends?\n\nThen read results by segment (new vs repeat, city) and decide: ship, iterate or stop.',
          lookFor:
            'A primary metric and guardrails set in advance, test validity, segment reads, and a decision.',
          criteria: [
            'Primary metric and guardrails set before launch',
            'Checks randomisation, sample and duration',
            'Reads results by segment',
            'Ends with ship, iterate or stop',
          ],
        },
      ],
    },
    {
      id: 'case',
      title: 'Cases, sizing and strategy',
      blurb:
        'Business cases and guesstimates, often in the live rounds and on campus. State your structure, do the maths aloud, and end with a recommendation.',
      questions: [
        {
          q: 'What are the key buckets in the delivery P&L? (Asked at Uber, per Glassdoor)',
          answer:
            'Start from revenue per order: delivery fee, service fee, small-order fee, commission from the restaurant, and advertising.\n\nThen variable costs per order: courier pay and incentives, payment processing, customer promotions and refunds. Revenue minus these is contribution margin per order.\n\nBelow that sit fixed costs: support, marketing, tech and overheads. Say which bucket you would attack first in a loss-making city, usually incentives and promotions, and how you would test it.',
          lookFor:
            'Revenue lines, variable costs per order, contribution margin, then fixed costs, plus where to act.',
          criteria: [
            'Lists revenue lines including commission and ads',
            'Lists variable costs per order',
            'Defines contribution margin',
            'Says which bucket to attack first',
          ],
          reportedAt: 'Feb 2026',
        },
        {
          q: 'We are thinking of expanding to a new market. How would you size the opportunity with no transaction data? (Asked at DoorDash, per IGotAnOffer)',
          answer:
            'Build it top down and check it bottom up.\n\nTop down: households in the city × share who order delivery × orders per month × average order value. Use census and survey data for the first three.\n\nBottom up: restaurants in the target area × likely partner share × orders per restaurant a day, using a similar city you already serve as the benchmark.\n\nIf the two are close, you have a range. Then add what decides the launch: competitor presence, density (orders per square km) and expected margin per order.',
          lookFor:
            'Top-down and bottom-up sizing, a comparable city as benchmark, and launch factors beyond size.',
          criteria: [
            'Top-down estimate with stated assumptions',
            'Bottom-up cross-check',
            'Uses a comparable market',
            'Considers competition, density and margin',
          ],
          round: 'Case presentation',
        },
        {
          q: 'If you entered a new city with a limited budget, what would your go-to-market plan be? (Asked at Uber, per IGotAnOffer)',
          answer:
            'Pick a small dense area first, not the whole city. A marketplace works when supply and demand meet in the same few square kilometres.\n\nSequence: recruit supply first (drivers or restaurants) so the first customers get a good experience, then turn on demand with targeted offers to the densest neighbourhoods, offices or campuses. Spend on the side that is short each week.\n\nSet launch gates: wait time under a target, repeat rate above a target. Expand to the next zone only when the first zone passes.',
          lookFor:
            'Density first, supply before demand, spending on the short side, and expansion gates.',
          criteria: [
            'Starts with a dense area',
            'Builds supply before demand',
            'Spends on the constrained side',
            'Sets gates before expanding',
          ],
        },
        {
          q: 'A competitor offers drivers a 90/10 pay split versus Uber’s 80/20. How would you respond? (Asked at Uber, per IGotAnOffer)',
          answer:
            'Do not match by reflex. First measure: are drivers actually leaving, in which cities and hours, and do they earn more per hour there after counting fewer trips?\n\nDrivers care about earnings per hour, not the split. If you have more demand, your drivers may earn more despite the lower split; show them that.\n\nResponses: targeted incentives in the cities and hours where you are losing supply, better utilisation (less idle time), and non-cash benefits. Model the cost of matching against the cost of lost supply before deciding.',
          lookFor:
            'Measuring impact before reacting, earnings per hour as the real metric, and targeted rather than blanket responses.',
          criteria: [
            'Measures driver churn before reacting',
            'Focuses on earnings per hour',
            'Targeted response by city and hour',
            'Compares cost of matching against cost of losing supply',
          ],
        },
        {
          q: 'How would you help Uber move into grocery delivery using its existing driver network? (Asked at Uber, per IGotAnOffer)',
          answer:
            'Structure: is it attractive, can we win, and how do we launch?\n\nAttractive: grocery orders are frequent but baskets are bigger and margins thin. Can we win: Uber has drivers, customers and a delivery app; it lacks store partnerships and in-store picking.\n\nLaunch: partner with large grocers in a few cities, use drivers in off-peak hours when rides are slow (which raises their utilisation), and measure order accuracy, delivery time and margin per order. Expand if those pass.',
          lookFor: 'A clear structure, honest gaps, using idle driver time, and launch metrics.',
          criteria: [
            'Attractiveness, ability to win, launch plan',
            'Names gaps such as store partners and picking',
            'Uses off-peak driver capacity',
            'Launch metrics and an expansion gate',
          ],
        },
        {
          q: 'What is the size of the app promotion market in Southeast Asia? (Asked at Google, per Glassdoor)',
          answer:
            'Clarify the scope: money spent by app developers on ads to get installs, across the main Southeast Asian countries, per year.\n\nOne path: smartphone users × new apps installed per user a year × share of installs that are paid × cost per install. Another: number of active app developers who advertise × average yearly ad budget, split into large and small developers.\n\nDo the maths with round numbers, compare the two paths, and say which assumption moves the answer most.',
          lookFor:
            'Clarified scope, a clear formula, round-number maths, a second method and a sensitivity call.',
          criteria: [
            'Defines the market before estimating',
            'Uses a clear formula',
            'Cross-checks with a second method',
            'Names the most sensitive assumption',
          ],
        },
        {
          q: 'Guesstimate the salary that should be paid to a delivery person. (Asked at Swiggy, per AmbitionBox)',
          answer:
            'Work from what a rider needs and what an order can pay.\n\nRider side: a fair monthly income for the city, plus fuel and phone costs, divided by working hours gives a target earning per hour.\n\nOrder side: orders a rider can do per hour at peak and off-peak, times pay per order, plus incentives. Check that the pay per order fits inside the delivery fee and commission per order.\n\nRecommend a structure, such as base per order plus distance plus peak bonus, and say what you would test.',
          lookFor:
            'Both rider needs and order economics, a per-hour view, and a pay structure rather than one number.',
          criteria: [
            'Starts from a rider’s costs and target income',
            'Uses orders per hour',
            'Checks it fits order economics',
            'Proposes a pay structure',
          ],
          reportedAt: 'Aug 2022',
          round: 'Guesstimate',
        },
        {
          q: 'How can you double the output of a kitchen without adding wastage? (Asked at Swiggy, per AmbitionBox)',
          answer:
            'Find the bottleneck first: is it ordering, prep, cooking, packing or hand-off to riders? Output is limited by the slowest step.\n\nLevers: prep high-volume items before the peak using demand forecasts, trim the menu at peak to the items that cook fastest, add a second shift or station only at the bottleneck, and separate packing from cooking.\n\nTo avoid waste, forecast by hour and item from past orders and prep in small batches. Track orders per hour and waste as a percentage of food cost.',
          lookFor: 'Bottleneck thinking, forecasting, menu and layout levers, and a waste metric.',
          criteria: [
            'Finds the bottleneck step',
            'Uses demand forecasts to prep',
            'Menu or layout changes',
            'Tracks waste alongside output',
          ],
          reportedAt: 'Aug 2022',
          round: 'Guesstimate',
        },
        {
          q: 'Build a strategy to expand Zepto in Bengaluru. Why quick commerce, and why Zepto? (Asked at Zepto, per AmbitionBox)',
          answer:
            'Expansion in quick commerce means new dark stores. Each store covers a small radius, so the question is which neighbourhoods have enough orders per day to make a store profitable.\n\nScore areas on household density, income, existing order data from nearby stores, and competitor coverage. Open where a store can reach break-even orders per day fastest, then grow the range in the best stores.\n\nFor “why quick commerce”: talk about the operating problem you find interesting, such as forecasting thousands of items per store, not just growth.',
          lookFor:
            'Dark-store economics, a scoring of areas, break-even thinking, and a specific reason for the industry.',
          criteria: [
            'Treats expansion as dark-store placement',
            'Scores areas on density and demand',
            'Uses break-even orders per store',
            'A specific reason for quick commerce',
          ],
          reportedAt: 'Jul 2024',
          round: 'Round 1',
        },
        {
          q: 'Case: how would you improve customer retention? (Asked at Zepto, per AmbitionBox)',
          answer:
            'Define retention: share of a month’s new customers who order again within 30 days, by cohort.\n\nFind where customers drop: after the first order (bad first experience: late, missing items, out of stock) or later (prices, range, a competitor). Pull complaints and ratings for churned customers.\n\nFix by cause: improve item availability in top stores, fix first-order delivery promise, and test a second-order offer only for the segment that needs it. Measure 30-day repeat rate by cohort.',
          lookFor:
            'A clear retention definition, finding where customers drop, causes from data, and targeted fixes.',
          criteria: [
            'Defines retention by cohort',
            'Finds where customers drop off',
            'Uses complaints or ratings for causes',
            'Targeted fixes, not blanket discounts',
          ],
          reportedAt: 'Aug 2024',
          round: 'Round 1 with a director',
        },
        {
          q: 'Benchmark our competitors in the grocery market. (Asked at Meesho, per Glassdoor)',
          answer:
            'Choose the comparison that matters for the decision. For grocery: price on a basket of common items, delivery promise, range, minimum order and fees, and where each player is strong (metros vs smaller cities).\n\nGather it yourself: build the same basket on each app in two or three cities and record price, fees and delivery time.\n\nSummarise in one table and end with “so what”: where we can win and the one move you would test.',
          lookFor:
            'Criteria tied to the decision, first-hand data, one clear table, and a recommendation.',
          criteria: [
            'Criteria tied to the decision',
            'Collects first-hand data such as a basket test',
            'One summary table',
            'Ends with where to win',
          ],
          reportedAt: 'Jun 2022',
        },
        {
          q: 'If the COO walked in right now and asked what we should do, what would you say? (Asked at Coinbase, per Glassdoor)',
          answer:
            'This tests whether you always carry a recommendation. Answer first: “We should do X, because Y, and the first step is Z.”\n\nThen give your confidence and the one piece of evidence that would change your mind.\n\nIn a case, practise saying your current best answer at every stage, not only at the end. It shows you are driving the problem, not waiting for it to finish.',
          lookFor:
            'A recommendation in one sentence, the reason, a first step and stated confidence.',
          criteria: [
            'Recommendation first',
            'One reason and a first step',
            'States confidence and what would change it',
          ],
        },
        {
          q: 'Should Google enter the TV business? (Asked at Google, per Hacking the Case Interview)',
          answer:
            'Clarify what “TV business” means: hardware, a TV operating system, streaming content, or ads on TV.\n\nThen test each option on market size and growth, Google’s right to win (Android, YouTube, ads, data) and what it costs.\n\nA strong answer narrows to one option, such as growing the TV operating system and YouTube on TV, where Google already has assets, and explains what it would not do and why.',
          lookFor:
            'Clarifying the scope, a structured market and capability test, and a narrowed recommendation.',
          criteria: [
            'Clarifies what the business means',
            'Tests market size and right to win',
            'Narrows to one recommendation',
          ],
        },
      ],
    },
    {
      id: 'data',
      title: 'Take-homes, Excel and SQL',
      blurb:
        'The round that decides most S&O offers. Expect a data file, a deadline and a presentation; some loops add a live Excel or SQL test.',
      questions: [
        {
          q: 'You get a file of 25,000 rows of order data with API error codes. Find the trends behind order errors and recommend fixes for the vendor. (Asked at DoorDash, per IGotAnOffer)',
          answer:
            'Clean first: check duplicates, blanks and time zones, and write down what each column means. Then size the problem: error rate overall and over time.\n\nGroup errors by code, merchant, integration type, time of day and order size. Usually a few codes or merchants cause most errors; show that with one ranked chart.\n\nFor each top cause, give a fix (validation before submission, a retry rule, a merchant setup change), the expected reduction in errors, and an owner. Present the answer first, then the evidence.',
          lookFor:
            'Data cleaning, sizing, a ranked breakdown, fixes with expected impact, and an answer-first deck.',
          criteria: [
            'Cleans and documents the data',
            'Sizes the error rate over time',
            'Ranks causes by share of errors',
            'Fixes with expected impact and owners',
          ],
          round: 'Take-home presentation',
        },
        {
          q: 'You get an Excel sheet of transaction data. Build a client-ready deck with insights and recommendations. (Asked at DoorDash, per IGotAnOffer)',
          answer:
            'Treat it like a consulting deliverable. Slide 1 is the answer: three insights and three recommendations. The next slides prove each insight with one chart and one sentence headline.\n\nInsights that land: concentration (top 20% of customers or merchants and their share), trends over time, and a segment that behaves differently.\n\nEnd with next steps and the size of the prize. Keep the Excel tidy with inputs, calculations and outputs separated, because some panels open it.',
          lookFor:
            'An answer-first deck, one chart per insight, sized recommendations, and a clean model.',
          criteria: [
            'Answer on slide one',
            'One chart and headline per insight',
            'Recommendations sized',
            'Clean, auditable Excel',
          ],
          round: 'Take-home',
        },
        {
          q: 'How many delivery executives do you need during peak versus non-peak hours? Build a staffing plan from past order volumes and SLA targets. (Asked at Swiggy, per Board Infinity)',
          answer:
            'Required riders per hour = forecast orders per hour ÷ orders one rider can complete per hour, plus a buffer for no-shows and uneven demand.\n\nForecast orders by hour and day from past data, adjusting for weather and events. Orders per rider per hour depends on trip time, which rises when you promise a tighter delivery time.\n\nTurn it into shifts that cover the peaks (lunch and dinner) and check cost per order. Show what happens if demand is 20% higher than forecast.',
          lookFor:
            'A clear formula, an hourly forecast, a buffer, shifts that match peaks and a sensitivity check.',
          criteria: [
            'Orders ÷ productivity per hour, plus buffer',
            'Forecast by hour and day',
            'Shifts matched to peaks',
            'Sensitivity to higher demand',
          ],
          round: 'Case study',
        },
        {
          q: 'Build or interpret a pivot table to summarise orders by zone, hour and status, and explain VLOOKUP with an operations example. (Asked at Swiggy, per Board Infinity)',
          answer:
            'Pivot: rows are zone, columns are hour, values are count of orders, with a filter on status (delivered, cancelled). Add a second value for average delivery time. Then read it aloud: which zone and hour has the most cancellations?\n\nVLOOKUP: bring a value from another table using a shared key, such as adding each rider’s zone to the orders table using rider ID. Mention that the key must be unique and that INDEX-MATCH or XLOOKUP is safer when columns move.\n\nInterviewers want speed and a sentence of insight, not just the mechanics.',
          lookFor:
            'Correct pivot set-up, a reading of the result, correct lookup use and awareness of its pitfalls.',
          criteria: [
            'Correct rows, columns, values and filter',
            'Reads an insight from the pivot',
            'Explains lookup with a shared key',
            'Knows XLOOKUP or INDEX-MATCH',
          ],
          round: 'Technical',
        },
        {
          q: 'What is a pivot table, and what is the difference between quick commerce and e-commerce? (Asked at Zepto, per AmbitionBox)',
          answer:
            'A pivot table summarises a large table by groups, such as orders per store per hour, without formulas. Give a one-line example from their business.\n\nQuick commerce delivers a small range (a few thousand items) from dark stores close to customers in minutes. E-commerce delivers a huge range from large warehouses in a day or more.\n\nThe operating difference: quick commerce lives on store-level forecasting, stock availability and rider density; e-commerce on range, logistics networks and returns.',
          lookFor:
            'A crisp definition with an example and the operating difference, not only speed.',
          criteria: [
            'Defines a pivot with an example',
            'Contrasts range, network and speed',
            'Names the operating difference',
          ],
          reportedAt: 'Jan 2025',
          round: 'Round 1',
        },
        {
          q: 'Walk me through this SQL query. What experience do you have with SQL? (Asked at DoorDash, per IGotAnOffer)',
          answer:
            'Read a query in the order the database runs it: FROM and JOIN (which tables, joined on what), WHERE (which rows), GROUP BY (which level), HAVING (filters on groups), SELECT (what is shown), ORDER BY.\n\nPoint out risks: a join that duplicates rows, a missing date filter, averages of averages.\n\nFor your experience, give one real analysis you wrote, the tables, and the decision it supported.',
          lookFor:
            'Reading in execution order, spotting join and aggregation pitfalls, and a real example.',
          criteria: [
            'Reads in execution order',
            'Spots duplicate-row or aggregation risks',
            'Gives a real SQL analysis and decision',
          ],
          round: 'SQL (some roles)',
        },
        {
          q: 'You need 1,000 conversions by next week. What do you do? (Asked at DoorDash, per IGotAnOffer)',
          answer:
            'Clarify the conversion (first order? merchant sign-up?) and today’s baseline per week.\n\nWork backwards from the funnel: if 5% of visitors convert, you need about 20,000 qualified visitors, or a higher rate. List the fastest levers: warm leads already in the pipeline, an offer to users who reached checkout but did not finish, partners or referrals, a focused outbound push.\n\nEstimate what each lever yields and costs, and run the cheapest ones first. Track daily and add levers if you are behind by mid-week.',
          lookFor:
            'Clarifying the goal, working backwards through the funnel, ranked levers and daily tracking.',
          criteria: [
            'Clarifies the conversion and baseline',
            'Works backwards through the funnel',
            'Ranks levers by yield and cost',
            'Tracks daily with a mid-week check',
          ],
        },
        {
          q: 'How would you find people to hire as drivers within 24 hours? (Asked at DoorDash, per IGotAnOffer)',
          answer:
            'Start with the people closest to ready: applicants who dropped out mid-onboarding, inactive drivers, and drivers on other platforms. Message them with a clear earnings offer for the next few days.\n\nIn parallel, ask current drivers to refer friends for a bonus, and run local job ads in the target zones.\n\nThe constraint is usually onboarding (background checks, documents), not interest, so check what can be done in 24 hours and staff the onboarding desk. Track applicants, activated drivers and first trips by the end of the day.',
          lookFor:
            'Closest-to-ready pools first, referrals, the onboarding bottleneck, and same-day tracking.',
          criteria: [
            'Targets dropped-off and inactive drivers first',
            'Uses referrals and local ads',
            'Spots onboarding as the bottleneck',
            'Tracks activation by end of day',
          ],
        },
      ],
    },
  ],
  plans: [
    {
      days: '7 days',
      title: 'Interview next week',
      tasks: [
        'Day 1: read their latest results, blog and app reviews; write the 3 metrics you think the team owns.',
        'Day 2: write five stories (process fixed, thin-data call, stakeholder won, metric owned, a mistake) with numbers.',
        'Day 3: do 3 root-cause questions out loud with the data → internal → external → segment order.',
        'Day 4: do 2 sizing and 2 strategy cases; say your recommendation at every step.',
        'Day 5: Excel and SQL warm-up: one pivot, one lookup, one cohort query on any public dataset.',
        'Day 6: a full mock interview, then fix the weakest round.',
        'Day 7: prepare questions, such as which metric this team is judged on this year.',
      ],
    },
    {
      days: '14 days',
      title: 'Get ready for the take-home',
      tasks: [
        'Week 1: everything in the 7-day plan.',
        'Week 2: do a full practice take-home: a public dataset, 4 hours, a 5-slide answer-first deck.',
        'Present it to a friend in 10 minutes and take questions; cut anything you could not defend.',
        'Rewrite three resume bullets as solved cases with numbers.',
      ],
    },
    {
      days: '30 days',
      title: 'Run a proper search',
      tasks: [
        'List 25 targets: marketplaces, fintechs and SaaS companies with S&O or BizOps teams.',
        'For each: apply, message the S&O lead with a one-page analysis, follow up once after 5–6 days.',
        'One practice case and one root-cause question a day, out loud.',
        'One practice take-home a week; reuse the slide template.',
        'Two mock interviews a week with a peer or an AI interviewer.',
      ],
    },
  ],
  resources: [
    {
      title: 'BizOps: what it is and why early-stage companies hire for it (Emergence Capital)',
      url: 'https://www.emcap.com/thoughts/bizops-what-it-is-and-why-early-stage-companies-should-hire-for-it',
      kind: 'Guide',
      why: 'A VC’s view of what BizOps does and who it hires. Key idea: early BizOps hires are scrappy generalists who solve whatever problem matters most this quarter.',
      free: true,
    },
    {
      title: 'Business operations: when you’ll need it (Intercom)',
      url: 'https://www.intercom.com/blog/why-business-operations',
      kind: 'Guide',
      why: 'A useful counter-view to bring into interviews. Key idea: BizOps exists to cover gaps in how work is organised, so its scope changes as the company grows.',
      free: true,
    },
    {
      title: 'Strategy & Ops at DoorDash (DoorDash on Medium)',
      url: 'https://medium.com/@DoorDash/strategy-ops-has-its-finger-on-the-pulse-of-doordashs-three-sided-marketplace-6007f90244e1',
      kind: 'Guide',
      why: 'How a marketplace S&O team describes its own work. Key idea: the job is balancing customers, merchants and couriers, city by city.',
      free: true,
    },
    {
      title: 'Make operations your secret weapon (First Round Review)',
      url: 'https://review.firstround.com/make-operations-your-secret-weapon-heres-how/',
      kind: 'Guide',
      why: 'How operators think about scaling a company. Key idea: startups often hire operations leaders too late, after the problems compound.',
      free: true,
    },
    {
      title: 'MBA consulting casebooks (Hacking the Case Interview)',
      url: 'https://hackingthecaseinterview.com/pages/mba-consulting-casebooks',
      kind: 'Guide',
      why: 'Free case practice volume from business-school casebooks. Key idea: practise cases out loud with a partner; reading solutions builds little skill.',
      free: true,
    },
    {
      title: 'Metric trees 101 (Mixpanel)',
      url: 'https://mixpanel.com/blog/metric-trees-benefits-guide/',
      kind: 'Guide',
      why: 'The tool behind every root-cause answer. Key idea: break a goal into two or three drivers, then sub-drivers, and review the tree weekly.',
      free: true,
    },
    {
      title: 'DataLemur',
      url: 'https://www.datalemur.com',
      kind: 'Tool',
      why: 'SQL interview practice tagged by company, with a free tutorial. Key idea: S&O SQL screens test joins, group by and window functions, so drill those.',
      free: true,
    },
    {
      title: 'StrataScratch',
      url: 'https://www.stratascratch.com/about',
      kind: 'Tool',
      why: 'Real interview-style SQL questions; 62 are free. Key idea: practise on business datasets, then write one sentence of insight per query.',
      free: true,
    },
    {
      title: 'Mode SQL tutorial',
      url: 'https://mode.com/sql-tutorial/',
      kind: 'Course',
      why: 'A free SQL course from basics to advanced. Key idea: learn by querying real data, not by reading syntax.',
      free: true,
    },
    {
      title: 'Excel guides (Corporate Finance Institute)',
      url: 'https://corporatefinanceinstitute.com/collections/excel',
      kind: 'Guide',
      why: 'Free guides on formulas, shortcuts and modelling conventions. Key idea: separate inputs, calculations and outputs so anyone can audit your model.',
      free: true,
    },
    {
      title: 'High Output Management (Andy Grove)',
      url: 'https://penguinrandomhouse.com/books/72467/high-output-management/',
      kind: 'Book',
      why: 'The operator’s classic on managing processes and teams. Key idea: a manager’s output is the output of the teams they influence, which is exactly S&O’s job.',
      free: false,
    },
    {
      title: 'Prompt engineering overview (Claude docs)',
      url: 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview',
      kind: 'Guide',
      why: 'For using AI on analysis and memos. Key idea: define what a good answer looks like and how you will check it before writing the prompt.',
      free: true,
    },
    {
      title: 'AI workflow examples (n8n docs)',
      url: 'https://docs.n8n.io/build/integrate-ai/ai-examples/',
      kind: 'Tool',
      why: 'How to automate a recurring ops report or follow-up with AI steps. Key idea: put a human approval step before anything goes to a customer or a leader.',
      free: true,
    },
    {
      title: 'OpenAI Cookbook',
      url: 'https://github.com/openai/openai-cookbook',
      kind: 'Guide',
      why: 'Worked examples for data extraction and summarising with AI. Key idea: use structured outputs so the results drop straight into a spreadsheet.',
      free: true,
    },
    {
      title: 'Founder’s Office hub',
      url: '/founders-office',
      kind: 'Our guide',
      why: 'If the role sits next to a founder rather than a business area, prepare for broader, less defined problems as well.',
      free: true,
    },
  ],
  related: [
    { label: 'Founder’s Office hub', href: '/founders-office' },
    { label: 'Data Analyst hub', href: '/data-analyst' },
    { label: 'Product Manager hub', href: '/product-manager' },
    { label: 'In-hand salary calculator', href: '/salary-calculator' },
  ],
  faqs: [
    {
      q: 'What does a Strategy & Operations person do?',
      a: 'They find the business problem that matters most, analyse it with data, recommend a fix and then run it with the teams involved. Typical problems: delivery times, onboarding, pricing, supply planning and business reviews.',
    },
    {
      q: 'Is BizOps the same as Strategy & Operations?',
      a: 'Mostly yes. Business Operations (BizOps), Strategy & Operations (S&O) and Strategy & Planning are names for the same in-house consultant role; the work depends more on the company than the title.',
    },
    {
      q: 'What is the Strategy & Operations salary?',
      a: 'In the US, 9 S&O and BizOps posts we opened in November 2026 had a median base midpoint of $176K, from $104K–143K for an associate to $233.6K–350.4K for a senior company-level role. In India few posts state pay; two we found showed ₹7–13 LPA and ₹30–40 LPA.',
    },
    {
      q: 'What are the rounds in an S&O interview?',
      a: 'Usually a recruiter screen, a hiring manager round, a take-home case with data that you present to a panel, and a final loop with cross-functional partners. Some loops add a live Excel or SQL test, and Indian campuses add guesstimates.',
    },
    {
      q: 'Can I get into S&O without consulting?',
      a: 'Yes. Analysts, city or operations managers and bankers move in often. Show one cross-team problem you solved with data, and do a practice take-home on the company’s business.',
    },
    {
      q: 'Do I need SQL for Strategy & Operations?',
      a: 'Often. DoorDash and Lyft candidates reported SQL rounds, and many posts list SQL with Excel. You need joins, group by and basic window functions, plus the habit of turning a query into a recommendation.',
    },
  ],
}

export default strategyAndOperations
