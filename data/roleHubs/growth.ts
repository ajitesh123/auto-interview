import type { RoleHub } from './types'

// Growth role hub (Growth Manager, Growth Marketing Manager, Growth Lead, Head of Growth, Growth PM).
// Sources opened on 2026-11-05:
// - Apollo.io people search (free): strict titles Growth Manager / Head of Growth / Growth Marketing
//   Manager / Growth Product Manager / Growth Lead, started in the last 670 days, tech employers only
//   (NAICS 5415, 5112, 5132, 5182, 5191), by country, title and employer size
// - Levels.fyi growth marketing (https://www.levels.fyi/t/marketing/focus/growth) and growth PM
//   (https://levels.fyi/t/product-manager/focus/growth)
// - AmbitionBox Growth Manager salary (https://ambitionbox.com/profile/growth-manager-salary)
// - Job posts with stated pay: ZipRecruiter India / Weekday, Marketing Monk job board, Wellfound (314e),
//   Weekday Partner Network
// - Glassdoor interview reviews: Uber (RVW6816381, RVW6650205), Dropbox (RVW11648933), Meta (RVW34971105),
//   Thumbtack (RVW50359016), BookBub (RVW26356310), Keragon (RVW102638735), Reddit growth manager page,
//   HubSpot (RVW90113052), EduRev (RVW93493471), Healofy (RVW89061128), CityMall (RVW97623333),
//   Pocket FM (RVW100056956), Paytm (RVW58075335), Glassdoor "growth manager interview questions" search pages
// - Story: Wikipedia (Chamath Palihapitiya), Venture Hacks (Sean Ellis, 2009), startup-marketing.com (2010),
//   andrewchen.com (2012), Reforge (2018), Lenny's Podcast with Elena Verna (Dec 2025)

const growth: RoleHub = {
  slug: 'growth',
  visuals: {
    og: '/static/images/roles/growth/og.jpg',
  },
  roleName: 'Growth Manager',
  shortName: 'Growth',
  metaTitle: 'Growth Manager Interview Guide 2026: Questions & Salary',
  metaDescription:
    'Growth Manager interview prep: 26 questions with model answers (19 reported by candidates), funnel and A/B test maths, pay in India and the US, and who hires.',
  keywords: [
    'growth manager',
    'growth manager interview questions',
    'growth marketing interview questions',
    'growth manager salary india',
    'head of growth salary india',
    'growth product manager interview',
    'how to become a growth manager',
    'growth marketing manager salary',
  ],
  heroTitle: 'Growth Manager interview prep',
  heroDescription:
    'The job that owns a number: signups, activation, retention or revenue. How growth works at consumer apps versus B2B SaaS, 26 questions (19 reported by candidates) with worked maths, and pay you can check.',
  directAnswer:
    'A Growth Manager owns one business number and moves it with experiments across the funnel: acquisition, activation, retention, referral and revenue. In Indian tech, 1,523 people started a growth title since January 2025, and 46% of them joined companies of 50 or fewer. Loops usually mix a funnel or metrics case, an experiment-design question and a take-home presented to the team.',
  lastUpdated: '2026-11-05',
  story: {
    summary:
      'Growth became a job at Facebook, where Chamath Palihapitiya moved to lead growth in 2009. Sean Ellis named the "growth hacker" in 2010 and Andrew Chen made it famous in 2012. Today the role splits into growth marketing and growth product, and AI is rewriting the playbook again.',
    born: { when: '2009', what: 'Facebook puts a leader on growth' },
    rise: { when: '2012', what: '“Growth Hacker is the new VP Marketing”' },
    milestones: [
      {
        when: '2009',
        title: 'Facebook gets a growth leader',
        detail:
          'Chamath Palihapitiya moves to lead growth at Facebook after the Beacon product is shut down. Growth becomes a team with its own metrics, not a marketing campaign.',
        sourceLabel: 'Wikipedia: Chamath Palihapitiya',
        sourceUrl: 'https://en.wikipedia.org/wiki/Chamath_Palihapitiya',
      },
      {
        when: 'Dec 2009',
        title: 'The 40% product-market-fit test',
        detail:
          'Sean Ellis says that when 40% of users would be “very disappointed” to lose a product, you have found product-market fit. Growth teams still use the survey before spending on acquisition.',
        sourceLabel: 'Venture Hacks interview',
        sourceUrl: 'https://venturehacks.com/sean-ellis-interview',
      },
      {
        when: 'Jul 2010',
        title: '“Growth hacker” gets a definition',
        detail: 'Sean Ellis: “A growth hacker is a person whose true north is growth.”',
        sourceLabel: 'startup-marketing.com',
        sourceUrl: 'https://www.startup-marketing.com/where-are-all-the-growth-hackers/',
      },
      {
        when: 'Apr 2012',
        title: 'Growth Hacker is the new VP Marketing',
        detail:
          'Andrew Chen describes growth people as “a hybrid of marketer and coder” and uses Airbnb’s Craigslist integration as the example.',
        sourceLabel: 'andrewchen.com',
        sourceUrl:
          'https://andrewchen.com/how-to-be-a-growth-hacker-an-airbnbcraigslist-case-study/',
      },
      {
        when: 'Jul 2018',
        title: 'Loops replace funnels',
        detail:
          'Reforge publishes “Growth Loops are the New Funnels”: the output of one cycle (a new user, a piece of content) becomes the input to the next.',
        sourceLabel: 'Reforge',
        sourceUrl: 'https://www.reforge.com/blog/growth-loops',
      },
      {
        when: 'Dec 2025',
        title: 'AI rewrites the playbook',
        detail:
          'Elena Verna (Lovable) argues that 60–70% of traditional growth tactics no longer apply to AI products, and that teams must re-find product-market fit every 3 months.',
        sourceLabel: 'Lenny’s Podcast',
        sourceUrl:
          'https://www.lennysnewsletter.com/p/the-new-ai-growth-playbook-for-2026-elena-verna',
      },
      {
        when: 'Jan 2025 → now',
        title: '1,523 new growth hires in Indian tech',
        detail:
          '1,523 people started a growth title at Indian tech companies since January 2025. “Growth Manager” is the most common title (745).',
        sourceLabel: 'Our count (Apollo people search)',
        sourceUrl: '#hiring',
      },
    ],
    why: [
      'Paid acquisition got expensive, so companies need people who find cheaper loops: referrals, SEO, product virality.',
      'Every product tracks its funnel now, so one person can own a number end to end and prove what moved it.',
      'Startups hire growth before they hire a full marketing team: 46% of new growth hires in Indian tech joined companies of 50 or fewer.',
    ],
  },
  aiAngle:
    'AI now writes ad variants, lifecycle emails and SQL in minutes, so the scarce skill is choosing what to test and reading the result honestly. Show one workflow where you used Claude or ChatGPT to generate variants and a simple automation (n8n or a spreadsheet script) to ship them, with the result.',
  mustKnow:
    'Growth is judged on one number and the experiments that moved it. Every answer should name the metric, the baseline, what you changed and the result, with the maths written out.',
  whatTheRoleIs: [
    'You own one number, such as weekly signups, activation rate, D30 retention or monthly revenue, and you move it with a steady flow of experiments. A typical week: read the dashboard, find the biggest drop in the funnel, write 2–3 test ideas, ship one, and read last week’s results.',
    'The title varies more than the work. Of 1,523 people who started a growth title at Indian tech companies since January 2025, 745 were called Growth Manager, 283 Growth Lead, 281 Head of Growth, 171 Growth Marketing Manager and 43 Growth Product Manager.',
    'It is mostly a startup job in India. 700 of those 1,523 joined companies of 50 people or fewer, and only 179 joined companies of more than 1,000. At a small company you will run paid ads, SEO, lifecycle email and referrals yourself. At a large one you usually own one stage of the funnel with analysts and engineers beside you.',
  ],
  expectationLabels: {
    nav: 'Consumer vs B2B',
    title: 'What hiring managers expect: consumer app vs B2B SaaS',
    sub: 'The same funnel thinking, but different levers and different numbers. Find out which one you are interviewing for.',
    a: 'Consumer app',
    b: 'B2B SaaS',
    aNote: 'Most Indian growth roles',
    differenceTitle: 'How growth differs from nearby roles',
  },
  expectations: {
    b2b: {
      headline: 'Consumer app (D2C, fintech, edtech, social): volume and habit',
      points: [
        'Run paid acquisition on Meta and Google with a target cost per install or per order.',
        'Fix activation: the first session, the first order, the first “aha” moment.',
        'Build retention with notifications, lifecycle email, WhatsApp and offers, without spamming.',
        'Design referral programmes and measure whether they are really viral or just discounts.',
        'Work in SQL or a dashboard tool daily; most decisions come from cohort charts.',
      ],
      metrics: [
        'Cost per install or per first order',
        'D1, D7 and D30 retention',
        'Orders or sessions per user per month',
        'Referral share of new users',
      ],
    },
    b2c: {
      headline: 'B2B SaaS (product-led or sales-led): pipeline and activation',
      points: [
        'Turn website visitors and free signups into activated accounts and then paying teams.',
        'Run SEO, content, webinars and paid search aimed at a defined customer profile.',
        'Work with sales on which signups get a call (product-qualified leads).',
        'Test pricing pages, trial length and onboarding emails.',
        'Report pipeline and revenue, not just signups, because sales will ask.',
      ],
      metrics: [
        'Signup to activated account rate',
        'Free-to-paid conversion',
        'Pipeline created by channel',
        'CAC payback in months',
      ],
    },
    difference: [
      'Versus performance marketing: performance marketers run paid channels to a cost target; growth owns the whole funnel, including product changes.',
      'Versus growth product manager: a growth PM ships product experiments with engineers (onboarding, paywalls); a growth marketer works more on channels and lifecycle. Levels.fyi shows growth PMs earning a little more at the median.',
      'Versus GTM engineer: a GTM engineer builds the data and automation behind outbound sales; growth owns the number and decides what to test.',
      'Versus product analyst: an analyst finds the insight; growth turns it into an experiment and owns the result.',
      'Versus brand marketing: brand builds awareness over years; growth is judged week by week on a measurable number.',
    ],
  },
  skills: [
    {
      area: 'Funnel and metrics',
      items: [
        'Draw a funnel with conversion at each step',
        'Cohort retention curves (D1, D7, D30)',
        'Unit economics: CAC, LTV, payback',
        'Pick one north-star metric and its inputs',
      ],
    },
    {
      area: 'Experimentation',
      items: [
        'Write a hypothesis with a metric and a minimum effect',
        'Sample size and test duration',
        'Read results honestly: guardrails, novelty, sample ratio mismatch',
        'Prioritise ideas with ICE or a similar score',
      ],
    },
    {
      area: 'Channels',
      items: [
        'Paid social and search (Meta Ads Manager, Google Ads)',
        'SEO and content',
        'Lifecycle: email, push, WhatsApp',
        'Referral and partnerships',
      ],
    },
    {
      area: 'Tools',
      items: [
        'SQL: joins, group by, window functions for cohorts',
        'GA4, Mixpanel or Amplitude',
        'Google Sheets for quick models',
        'AI assistants for variants, analysis drafts and simple automations',
      ],
    },
  ],
  getHired: {
    intro:
      'Growth hiring managers want proof that you moved a number. Your resume should read like a results log: metric, baseline, what you did, result. The fastest way in is a short growth teardown of their product sent to the hiring manager.',
    bullets: [
      {
        weak: 'Managed social media and performance marketing campaigns.',
        strong:
          'Cut cost per first order from ₹410 to ₹265 in 10 weeks by rebuilding Meta campaigns around 3 audience tests and 24 creative variants; monthly orders from paid rose 38% on flat spend.',
      },
      {
        weak: 'Worked on improving user retention.',
        strong:
          'Raised D30 retention from 18% to 24% by redesigning the first-week WhatsApp and email sequence (5 messages, A/B tested against the old 2-message flow).',
      },
      {
        weak: 'Responsible for referral programme.',
        strong:
          'Relaunched referrals with a two-sided ₹100 credit; referral share of new users went from 6% to 15% in one quarter at a blended CAC 40% below paid.',
      },
      {
        weak: 'Growth intern at an edtech startup.',
        strong:
          'Growth intern: wrote 40 SEO pages from search-console queries; organic signups grew from 120 to 410 a month in 4 months.',
      },
    ],
    resumeTips: [
      'Lead every bullet with the metric you moved, then the baseline and the result.',
      'Name the channel and the tool (Meta Ads, GA4, Mixpanel, SQL) so screening software and humans both find them.',
      'Show one failed test and what you learned; growth managers expect most tests to lose.',
      'Link a teardown or a dashboard screenshot with company data removed.',
      'Keep it to one page unless you have 8+ years.',
      'Switching from marketing, analytics or product? Rewrite your work as experiments: hypothesis, change, result.',
    ],
    channels: [
      {
        name: 'Weekday: growth jobs with posted pay',
        how: 'Many Indian startup growth posts on Weekday show pay and experience bands.',
        url: 'https://jobs.weekday.works/weekday-partner-network-head-of-growth-zs3es2',
      },
      {
        name: 'Marketing Monk job board',
        how: 'A marketing-only board that carries growth roles at D2C and consumer startups, often with pay.',
        url: 'https://www.marketingmonk.so/jobboard/jobs/growth-lead-at-weekday-ai-mzqvjx',
      },
      {
        name: 'Wellfound',
        how: 'Startup posts with salary and equity. Search “growth marketing” and “growth manager” separately.',
        url: 'https://wellfound.com/jobs/4829548-growth-marketing-manager',
      },
      {
        name: 'LinkedIn posts, not just jobs',
        how: 'Search posts for “hiring growth” and “first growth hire”. Founders often post before they list the job.',
      },
      {
        name: 'Funding news',
        how: 'A company that just raised a seed or Series A round usually hires its first growth person within months.',
      },
    ],
    outreach: {
      title: 'A five-line note with a teardown attached',
      body: 'Hi [Name], I saw you are hiring for growth at [Company].\n\nAt [Company], I [moved metric] from [X] to [Y] by [one change].\n\nI mapped your signup funnel from the outside and found 3 tests I would run first, with an ICE score for each. One page, attached.\n\nWorth 20 minutes this week?',
      note: 'Send it to the growth lead or founder, not only the recruiter. Follow up once after 5–6 days, then stop.',
    },
    proofOfWork: {
      title: 'Send a one-page growth teardown',
      why: 'It shows the whole job in miniature: you can find the biggest leak in a funnel, propose tests and prioritise them.',
      steps: [
        'Sign up for the product and screenshot every step from ad or search result to the first “aha” moment.',
        'Estimate where users drop and why, using reviews, app-store ratings and your own experience.',
        'Write 5 test ideas, score each 1–10 on Impact, Confidence and Ease, and pick the top 3.',
        'For the top test, write the hypothesis, the metric, the minimum effect and how long it must run.',
      ],
    },
  },
  process: [
    {
      companyType: 'Indian startup (seed to Series B)',
      rounds: [
        'Call with the founder or head of growth',
        'Take-home: a funnel teardown or a growth plan, due in 2–3 days',
        'Present it to the founder and team, who push on your numbers',
        'Culture conversation',
      ],
    },
    {
      companyType: 'Indian consumer scale-up',
      rounds: [
        'Recruiter screen',
        'Hiring manager: your past metrics, a root-cause analysis and a guesstimate',
        'Case round with a senior growth or product leader',
        'Final with the business head',
      ],
    },
    {
      companyType: 'US or global SaaS',
      rounds: [
        'Recruiter screen',
        'Hiring manager, sometimes with a director',
        'Take-home of 1.5–5 hours',
        'Virtual onsite or panel: present the take-home, plus analytics and behavioural rounds',
      ],
    },
    {
      companyType: 'What candidates reported',
      rounds: [
        'Pocket FM (Bengaluru, 2025): Senior Growth Manager, then a Director, then a Head of Geography; about 3 weeks (Glassdoor)',
        'Paytm (New Delhi, 2022): two rounds in one day on roadmaps, root-cause analysis, guesstimates and “why Paytm” (Glassdoor)',
        'Thumbtack (2021): recruiter, 45 minutes with the hiring manager and director, a 1.5-hour take-home, then a 3-hour virtual onsite (Glassdoor)',
        'Keragon (2025): a three-part take-home, then a 2-hour live review with a founder and the team (Glassdoor)',
      ],
    },
  ],
  pay: {
    title: 'Pay: India job posts and self-reports, plus the US',
    headline: 'US median $225K · India posts ₹8–65 LPA',
    intro:
      'In India, growth pay depends more on stage and scope than on title. Posts we checked run from ₹8–15 LPA for 2–5 years to ₹45–65 LPA for a Head of Growth. US pay from Levels.fyi is shown for growth marketing and growth product managers separately.',
    tables: [
      {
        region: 'India: job posts with stated pay',
        tab: 'India · job posts',
        currency: 'INR (₹, lakh per annum, as posted)',
        rows: [
          {
            band: 'Marketing & Growth Manager, Nagpur',
            experience: '1–4 yrs',
            value: '₹2–4 LPA',
            url: 'https://www.ziprecruiter.in/jobs/531465529-marketing-growth-manager-at-weekday-ai',
          },
          {
            band: 'Assistant Manager, Growth (D2C), Gurugram',
            experience: '2–5 yrs',
            value: '₹8–15 LPA',
            url: 'https://www.marketingmonk.so/jobboard/jobs/assistant-manager-growth-d2c-at-weekday-ai-fvuih3',
          },
          {
            band: '314e, Growth Marketing Manager, Bengaluru',
            experience: '3–5 yrs',
            value: '₹10–30 LPA',
            url: 'https://wellfound.com/jobs/4829548-growth-marketing-manager',
          },
          {
            band: 'Growth Lead, B2C apps, Mumbai',
            experience: '5–10 yrs',
            value: '₹30–50 LPA',
            url: 'https://www.marketingmonk.so/jobboard/jobs/growth-lead-at-weekday-ai-mzqvjx',
          },
          {
            band: 'Head of Growth, Mumbai',
            experience: '6–10 yrs',
            value: '₹45–65 LPA',
            url: 'https://jobs.weekday.works/weekday-partner-network-head-of-growth-zs3es2',
          },
        ],
        note: 'Each row is one job post; tap it to open. Posts without pay were left out, and so were posts older than 2026.',
        sourceLabel: 'Weekday, Marketing Monk, Wellfound and ZipRecruiter job posts',
        sourceUrl: 'https://jobs.weekday.works/weekday-partner-network-head-of-growth-zs3es2',
        asOf: 'Nov 5, 2026',
      },
      {
        region: 'India: self-reported salaries',
        tab: 'India · reported',
        currency: 'INR (₹, lakh per annum)',
        rows: [
          { band: '183 salaries', experience: '1 yr', value: '₹3–25 LPA' },
          { band: '283 salaries', experience: '2 yrs', value: '₹4–26 LPA' },
          { band: '393 salaries', experience: '3 yrs', value: '₹4.5–30 LPA' },
          { band: '373 salaries', experience: '4 yrs', value: '₹5–30 LPA' },
          { band: '365 salaries', experience: '5 yrs', value: '₹5–32.3 LPA' },
        ],
        note: 'AmbitionBox “Growth Manager”, based on 2.2k salaries, last updated 8 Mar 2025. It mixes tech and non-tech employers, which is why the ranges are wide. Senior posts above (₹30–65 LPA) sit well above these self-reports.',
        sourceLabel: 'AmbitionBox',
        sourceUrl: 'https://ambitionbox.com/profile/growth-manager-salary',
        asOf: 'opened Nov 5, 2026',
      },
      {
        region: 'United States: growth marketing',
        tab: 'US · growth marketing',
        currency: 'USD (total compensation per year)',
        rows: [
          { band: '25th percentile', experience: 'All levels', value: '$162K' },
          { band: 'Median', experience: 'All levels', value: '$225K' },
          { band: '75th percentile', experience: 'All levels', value: '$260K' },
          { band: '90th percentile', experience: 'All levels', value: '$350K' },
        ],
        note: 'Levels.fyi marketing track, growth focus. Only 14 data points, so treat it as a rough guide. Total compensation includes base, bonus and stock.',
        sourceLabel: 'Levels.fyi',
        sourceUrl: 'https://www.levels.fyi/t/marketing/focus/growth',
        asOf: 'Nov 5, 2026',
      },
      {
        region: 'United States: growth product manager',
        tab: 'US · growth PM',
        currency: 'USD (total compensation per year)',
        rows: [
          { band: '25th percentile', experience: 'All levels', value: '$175K' },
          { band: 'Median', experience: 'All levels', value: '$241K' },
          { band: '75th percentile', experience: 'All levels', value: '$330K' },
          { band: '90th percentile', experience: 'All levels', value: '$425K' },
        ],
        note: 'Levels.fyi product manager track, growth focus. The page does not show the number of submissions. Total compensation includes base, bonus and stock.',
        sourceLabel: 'Levels.fyi',
        sourceUrl: 'https://levels.fyi/t/product-manager/focus/growth',
        asOf: 'Nov 5, 2026',
      },
    ],
    crossCheck:
      'Growth PMs out-earn growth marketers by about 7% at the US median ($241K vs $225K) but by 21% at the 90th percentile ($425K vs $350K). If you can ship product experiments with engineers, say so.',
  },
  hiring: {
    title: 'Where new growth hires went in Indian tech, 2025–26',
    segments: true,
    intro:
      'In India, 1,523 people started a growth title at tech companies since January 2025: Growth Manager, Growth Lead, Head of Growth, Growth Marketing Manager or Growth Product Manager. Almost half joined companies of 50 or fewer. In the US, 2,569 people started the same titles at tech companies.',
    companies: [
      { name: '50 people or fewer', count: 700, segment: 'Seed to Series A' },
      { name: '51–200 people', count: 318, segment: 'Series A to C' },
      { name: '201–1,000 people', count: 321, segment: 'Scale-ups' },
      { name: 'Over 1,000 people', count: 179, segment: 'Large companies' },
    ],
    method:
      'Counted in Apollo.io: people in India whose current title is exactly one of Growth Manager (745), Growth Lead (283), Head of Growth (281), Growth Marketing Manager (171) or Growth Product Manager (43), who started it in the last 670 days, at employers in software, IT services, data and internet industries (NAICS 5415, 5112, 5132, 5182, 5191), split by employer headcount. 1,518 of 1,523 had a known company size. US: same filter, 2,569 people.',
    sourceLabel: 'Apollo.io people data',
    asOf: 'Nov 5, 2026',
  },
  questionGroups: [
    {
      id: 'fit',
      title: 'Motivation and track record',
      blurb:
        'Growth interviews start with your numbers. Have three results ready, each with a baseline.',
      questions: [
        {
          q: 'Tell me about yourself.',
          answer:
            'Keep it to 90 seconds and make it a story of numbers you moved.\n\nThree beats: where you started, the biggest metric you owned and how far you moved it, and why this company’s funnel is the next problem you want.\n\nEnd with one observation about their product, such as a step in their signup that loses people.',
          lookFor: 'A clear thread, one result with a number, and research on their product.',
          criteria: [
            'Under 90 seconds',
            'One metric with a baseline and a result',
            'A specific observation about their product',
          ],
        },
        {
          q: 'What were your KPIs and what growth tools did you use to achieve them? (Asked at Healofy, per Glassdoor)',
          answer:
            'Name the one KPI you were judged on, then its inputs. “I owned monthly paying users. The inputs were installs, activation (first consult booked) and month-2 retention.”\n\nThen the tools, tied to a use: Meta Ads Manager for acquisition, Mixpanel funnels to find the activation drop, MoEngage or WhatsApp for lifecycle, SQL for weekly cohorts.\n\nFinish with one result: “Activation went from 22% to 31% after we cut onboarding from 6 screens to 3.”',
          lookFor: 'One owned KPI, its input metrics, tools tied to a use, and a result.',
          criteria: [
            'Names the one KPI they owned',
            'Breaks it into input metrics',
            'Ties each tool to a specific use',
            'Gives a result with a number',
          ],
          round: 'Hiring manager',
          reportedAt: 'Apr 2024',
        },
        {
          q: 'Tell me about your main project. (Asked at CityMall, per Glassdoor)',
          answer:
            'The candidate reported that this interview “leaned heavily on first principles thinking”, so expect follow-ups on every assumption.\n\nStructure it as: the problem and the metric, what you believed was causing it, the test you ran, the result, and what you would do differently.\n\nWhen they push (“why did that work?”), go back to user behaviour: what the user saw, what they wanted, and what stopped them.',
          lookFor: 'Clear cause-and-effect reasoning, honest results, and calm answers to “why”.',
          criteria: [
            'States the problem as a metric',
            'Explains the cause from user behaviour',
            'Gives an honest result, even a partial one',
            'Holds up under repeated “why” questions',
          ],
          round: 'Hiring manager',
          reportedAt: 'May 2025',
        },
        {
          q: 'Why this company? (Asked at Dropbox, per Glassdoor)',
          answer:
            'Talk about their growth model, not their brand. “Your growth is product-led: most teams start free and upgrade when they hit a limit. I want to work on the moment free users become paying ones.”\n\nAdd one piece of evidence that you used the product and noticed something specific.\n\nThen connect it to your past results in one line.',
          lookFor:
            'Understanding of how the company grows, evidence of using the product, and a link to your results.',
          criteria: [
            'Explains how the company actually grows',
            'Shows they used the product',
            'Links it to their own past results',
          ],
          reportedAt: 'Aug 2016',
        },
      ],
    },
    {
      id: 'strategy',
      title: 'Growth strategy and cases',
      blurb:
        'The core of the loop. Pick one metric, break it into a funnel, find the biggest leak, and propose tests.',
      questions: [
        {
          q: 'Describe how you would grow the business. Specific levers. (Asked at Uber, per Glassdoor)',
          answer:
            'Start by choosing the metric: completed trips per week. Break it down: trips = active riders × trips per rider, and both depend on driver supply in each city.\n\nThen give one lever per input. New riders: a referral credit and airport partnerships. Trips per rider: cheaper shared rides on commute routes. Supply: driver incentives at the hours with the most unmet requests.\n\nPick one to test first, the input with the biggest gap, and name the guardrail: wait times must not rise.',
          lookFor: 'A metric tree, a lever per input, a first test, and a guardrail metric.',
          criteria: [
            'Chooses one top-line metric',
            'Breaks it into inputs (a metric tree)',
            'Gives a specific lever per input',
            'Names a guardrail metric',
          ],
          round: 'Onsite',
          reportedAt: 'Nov 2016',
        },
        {
          q: 'Come up with as many ways as you can think of to grow comments on Groups. (Asked at Meta, per Glassdoor)',
          answer:
            'Show breadth, then structure. Group ideas by the funnel of a comment: see a post, want to reply, reply easily, get a response.\n\nSee: rank posts with open questions higher; notify members when a post they reacted to gets a reply. Want: let admins pin a weekly question. Easy: suggested quick replies on mobile. Response: notify the commenter when someone replies.\n\nThen prioritise: the reply notification is cheap to build and works on a loop, because each reply creates the next notification.',
          lookFor: 'Many ideas, grouped by a funnel, then a prioritised first test.',
          criteria: [
            'Generates many ideas quickly',
            'Groups them by a clear structure',
            'Prioritises one with a reason',
            'Spots a loop (output feeds the next input)',
          ],
          round: 'Phone screen',
          reportedAt: 'Oct 2019',
        },
        {
          q: 'How would you prioritise channels at an early stage versus long-term? (Asked at Keragon, per Glassdoor)',
          answer:
            'Early stage: pick channels that teach you fastest, not ones that scale. Founder-led outreach, communities and a few paid tests show who converts and what message works.\n\nLong-term: invest in channels that compound and get cheaper over time, such as SEO, referrals and integrations, and keep paid as a dial you can turn up.\n\nThe rule: double down on the one channel that works before adding a second. Brian Balfour’s Four Fits says the channel must fit the product and the business model, so a ₹99 product cannot live on a sales team.',
          lookFor: 'Different goals at each stage, focus on one channel, and channel–model fit.',
          criteria: [
            'Early stage: learning speed over scale',
            'Long-term: compounding channels',
            'Focus on one channel before adding more',
            'Checks the channel fits the price point',
          ],
          round: 'Take-home review',
          reportedAt: 'Dec 2025',
        },
        {
          q: 'How would you approach onboarding and activation at scale? (Asked at Keragon, per Glassdoor)',
          answer:
            'First define activation as an action that predicts retention, not a page view. Find it in the data: compare users who stayed 30 days with those who left, and look for the first-week action that separates them.\n\nThen shorten the path to it: remove steps, pre-fill data, use templates, and send one well-timed nudge to people who stall.\n\nAt scale, segment: a solo user and a 50-person team need different first steps. Measure activation rate weekly by signup cohort.',
          lookFor:
            'A data-backed activation definition, a shorter path, segmentation, and cohort measurement.',
          criteria: [
            'Defines activation from retention data',
            'Removes steps on the path to it',
            'Segments by user type',
            'Measures by weekly signup cohort',
          ],
          reportedAt: 'Dec 2025',
        },
        {
          q: 'Daily signups fell 15% this week. Walk me through how you find out why.',
          answer:
            'Check the data first: did tracking or a release break? Compare with a second source, such as the database versus the analytics tool.\n\nIf the drop is real, split it: by channel, platform, country and new versus returning visitors. Usually one slice explains most of it, for example Android paid installs down 40% while everything else is flat.\n\nThen look for the cause in that slice: an ad account issue, a changed app-store listing, a competitor’s campaign, a public holiday. Fix or roll back, and set an alert so you catch it in a day next time.',
          lookFor:
            'Rule out data issues, segment the drop, find the cause in one slice, and prevent it.',
          criteria: [
            'Checks tracking and releases first',
            'Segments by channel, platform and region',
            'Finds the slice that explains the drop',
            'Proposes a fix and an alert',
          ],
          round: 'Hiring manager',
        },
        {
          q: 'What would you do if engineering had no capacity for new features? (Asked at Reddit, per Glassdoor)',
          answer:
            'Growth does not stop when engineering is busy. Use levers that need no code: copy and pricing tests in tools you control, lifecycle email and push, paid and SEO landing pages built in a no-code tool, partnerships and referrals run manually.\n\nIn parallel, make the case for engineering time with numbers: “This onboarding change is worth about 600 extra activated users a month, for 3 days of work.”',
          lookFor: 'No-code levers, and a quantified case for engineering time.',
          criteria: [
            'Lists levers that need no engineering',
            'Quantifies the value of the blocked work',
            'Stays constructive with engineering',
          ],
          reportedAt: 'Sep 2025',
        },
      ],
    },
    {
      id: 'experiments',
      title: 'Metrics and experiments',
      blurb:
        'Expect a test-design question and some maths. Write the hypothesis, the metric, the sample size and the guardrail.',
      questions: [
        {
          q: 'Explain how you would carry out an experiment and detail the steps in the process. (Asked at Dropbox, per Glassdoor)',
          answer:
            'Seven steps. Write a hypothesis: “Showing team templates on the first screen will raise activation, because new users do not know what to create.” Choose one primary metric (activation rate) and one or two guardrails (support tickets, upgrade rate).\n\nSet the minimum effect worth detecting and calculate the sample size before starting. Randomise by user, not by session. Run for whole weeks so weekdays and weekends are both covered.\n\nCheck that the split is really 50/50 (a sample ratio mismatch means the data is broken). Then decide, write it up, and log the learning even if the test lost.',
          lookFor:
            'Hypothesis, one primary metric, guardrails, sample size up front, and an honest readout.',
          criteria: [
            'Writes a hypothesis with a reason',
            'One primary metric plus guardrails',
            'Sample size decided before the test',
            'Checks the split and documents the result',
          ],
          round: 'Hiring manager',
          reportedAt: 'Nov 2021',
        },
        {
          q: 'Our checkout converts at 4%. How long must a test run to detect a 10% relative lift if 6,000 visitors a day reach checkout?',
          answer:
            'A 10% relative lift on 4% is 0.4 percentage points (4.0% to 4.4%).\n\nA common rule of thumb for 95% confidence and 80% power is n ≈ 16 × p × (1 − p) ÷ δ² per variant. That is 16 × 0.04 × 0.96 ÷ 0.004² = 16 × 0.0384 ÷ 0.000016 = 38,400 visitors per variant.\n\nWith 6,000 a day split evenly, each variant gets 3,000 a day, so 38,400 ÷ 3,000 = 12.8 days. Round up to 14 days, two full weeks. Check the exact number in Evan Miller’s calculator.',
          lookFor:
            'Converting relative to absolute lift, a correct sample size, and rounding to whole weeks.',
          criteria: [
            'Converts 10% relative to 0.4 points',
            'Gets about 38,400 per variant',
            'Divides by daily traffic per variant',
            'Rounds up to whole weeks',
          ],
          round: 'Analytics',
        },
        {
          q: 'Design an email A/B test to re-engage drivers who have had no activity in the last 14 days. (Asked at Uber, per Glassdoor)',
          answer:
            'Audience: drivers with no trips in 14 days, split randomly into control (no email), A and B. Keep a no-email control, or you cannot tell whether email helps at all.\n\nA: a reminder of what they earned last month. B: a time-bound incentive, such as a bonus for 10 trips this week.\n\nPrimary metric: share of drivers completing a trip within 7 days. Guardrail: unsubscribes. If B wins, check the cost: the bonus paid per reactivated driver must be less than what that driver earns the platform over the next months.',
          lookFor:
            'A holdout control, clear variants, a behaviour metric, and the cost of the incentive.',
          criteria: [
            'Includes a no-email holdout',
            'Two clearly different variants',
            'Measures trips, not opens',
            'Checks incentive cost against value',
          ],
          round: 'Phone screen',
          reportedAt: 'Jun 2015',
        },
        {
          q: 'How do you determine success metrics for each marketing funnel? (Asked at Thumbtack, per Glassdoor)',
          answer:
            'Start from the business outcome and work backwards. For a marketplace that might be booked jobs. Each stage gets one conversion metric: visitor to request, request to quote, quote to booking.\n\nAdd a quality check per stage so you do not optimise a number that hurts the next stage, such as cheap clicks that never request.\n\nReview the stage metrics weekly and the business outcome monthly.',
          lookFor: 'Metrics tied to the business outcome, one per stage, plus quality checks.',
          criteria: [
            'Starts from the business outcome',
            'One conversion metric per stage',
            'Adds a quality metric per stage',
          ],
          reportedAt: 'Nov 2024',
        },
        {
          q: 'How would you measure the impact of offline marketing campaigns, specifically radio? (Asked at Uber, per Glassdoor)',
          answer:
            'Use a geographic test. Run radio in some cities and hold out similar cities, matched on past signups and seasonality.\n\nCompare the change in signups and trips in test cities against the holdouts over the campaign and a few weeks after. Add a unique promo code or a short URL in the ad as a second, partial signal.\n\nDivide the extra signups by the spend to get a cost per incremental user, and compare it with paid digital.',
          lookFor: 'A geo holdout, matched controls, and cost per incremental user.',
          criteria: [
            'Uses test and holdout cities',
            'Matches the cities before comparing',
            'Calculates cost per incremental user',
          ],
          reportedAt: 'Jun 2015',
        },
        {
          q: 'Your CAC is ₹1,200. A customer pays ₹299 a month at a 70% gross margin. What is the payback period?',
          answer:
            'Monthly gross profit per customer is ₹299 × 0.70 = ₹209.30.\n\nPayback is ₹1,200 ÷ ₹209.30 = about 5.7 months.\n\nThen judge it: if most customers stay well beyond 6 months, the channel is healthy; if churn is high in months 1–3, many customers leave before paying back, so fix retention before scaling spend.',
          lookFor:
            'Using gross profit, not revenue, the right maths, and a judgement tied to churn.',
          criteria: [
            'Uses gross profit, not revenue',
            'Gets about 5.7 months',
            'Links the answer to retention',
          ],
          round: 'Case',
        },
      ],
    },
    {
      id: 'channels',
      title: 'Channels and analytics',
      blurb: 'Know the maths of each channel and enough SQL to answer your own questions.',
      questions: [
        {
          q: 'What is ROAS in Meta ads? (Asked at EduRev, per Glassdoor)',
          answer:
            'ROAS is return on ad spend: revenue from ads divided by ad spend. ₹2,00,000 of revenue on ₹50,000 of spend is a ROAS of 4.\n\nThe follow-up is what ROAS you need. With a 40% gross margin, you break even at 1 ÷ 0.4 = 2.5. Below that, every sale loses money unless the customer buys again.\n\nAlso say what Meta reports may over-count, because of attribution windows, so check against a holdout or your own sales data.',
          lookFor:
            'The definition, a worked example, break-even ROAS from margin, and attribution caution.',
          criteria: [
            'Defines ROAS correctly',
            'Works an example',
            'Derives break-even ROAS from margin',
            'Mentions attribution limits',
          ],
          reportedAt: 'Dec 2024',
        },
        {
          q: 'What new channels would you propose to add to our advertising mix? (Asked at BookBub, per Glassdoor)',
          answer:
            'First ask what works today and why, and who the best customers are. Then propose channels where those customers already are.\n\nFor each candidate, give a small test: budget, success metric and kill rule. “₹1.5 lakh on YouTube pre-roll over 3 weeks; continue if cost per paying user is within 20% of Meta.”\n\nTest one channel at a time so results are readable.',
          lookFor:
            'Starting from current data and customers, small tests with kill rules, one at a time.',
          criteria: [
            'Asks what works today first',
            'Chooses channels where customers are',
            'Sets budget, metric and kill rule',
          ],
          reportedAt: 'May 2019',
        },
        {
          q: 'Each user invites 2 friends on average and 15% of invites sign up. Is the product viral?',
          answer:
            'The viral coefficient k is invites per user × invite conversion = 2 × 0.15 = 0.3.\n\nBelow 1, referrals do not grow on their own. But they still amplify every other channel: each 100 users you acquire bring 100 × 1 ÷ (1 − 0.3) ≈ 143 in total.\n\nTo raise k, increase invites (prompt at the moment of success) or conversion (a better landing page for invitees, a two-sided reward).',
          lookFor: 'Correct k, knowing it is not viral, the amplification maths, and two levers.',
          criteria: [
            'Calculates k = 0.3',
            'Says it is not self-sustaining (k < 1)',
            'Shows the 1 ÷ (1 − k) amplification',
            'Gives levers for invites and conversion',
          ],
          round: 'Case',
        },
        {
          q: 'Basic SQL: what is the difference between a LEFT JOIN and an INNER JOIN?',
          answer:
            'An INNER JOIN keeps only rows that match in both tables. A LEFT JOIN keeps every row from the left table and fills the right side with NULL where there is no match.\n\nGrowth example: users LEFT JOIN orders shows every user, including those who never ordered (NULL order), which is exactly what you need to find people who did not convert. An INNER JOIN would hide them.',
          lookFor: 'A correct definition and a growth use case where the difference matters.',
          criteria: [
            'Defines both joins correctly',
            'Explains the NULLs in a LEFT JOIN',
            'Gives a growth use case',
          ],
          source: { label: 'Glassdoor growth manager interviews' },
          round: 'Analytics',
        },
        {
          q: 'Write a query for D7 retention by signup week.',
          answer:
            "In words: for each signup week, count users, and count those with any activity 7 days after signup.\n\nSketch: SELECT date_trunc('week', u.signup_date) AS cohort, COUNT(DISTINCT u.id) AS users, COUNT(DISTINCT CASE WHEN e.event_date = u.signup_date + 7 THEN u.id END) AS d7_active FROM users u LEFT JOIN events e ON e.user_id = u.id GROUP BY 1.\n\nThen divide d7_active by users. Say whether you mean exactly day 7 or any day from 7 onwards, because teams define it differently.",
          lookFor:
            'Cohort grouping, a LEFT JOIN, distinct counts, and a clear retention definition.',
          criteria: [
            'Groups users by signup week',
            'Uses a LEFT JOIN so non-returners count',
            'Counts distinct users',
            'States the retention definition',
          ],
          round: 'Analytics',
        },
        {
          q: 'Name some top-line KPIs you would include in a dashboard for marketing stakeholders. (Asked at Uber, per Glassdoor)',
          answer:
            'Keep it to five or six, ordered like the funnel: spend, new users, cost per new user (CAC), activation rate, revenue or orders from new users, and payback.\n\nShow each by channel and week, with last period and target beside it. Put definitions in a footnote so nobody argues about numbers in the meeting.',
          lookFor:
            'Few metrics, ordered by funnel, by channel and week, with targets and definitions.',
          criteria: [
            'Five or six metrics, not twenty',
            'Ordered like the funnel',
            'Split by channel and week with targets',
          ],
          reportedAt: 'Jun 2015',
        },
      ],
    },
    {
      id: 'behavioural',
      title: 'Behavioural and AI',
      blurb: 'Short STAR stories with numbers. Most growth tests fail, so prepare one honest loss.',
      questions: [
        {
          q: 'Give an example of driving growth aligned to a top-of-funnel goal. (Asked at HubSpot, per Glassdoor)',
          answer:
            'Use STAR with the numbers in the middle. “Our goal was 30% more qualified signups. I found that 60% of blog traffic landed on posts with no signup prompt. We added a relevant free template to the top 20 posts. Signups from the blog rose from 900 to 1,400 a month, and the share that became qualified held steady.”\n\nThe last clause matters: show that top-of-funnel growth did not lower quality.',
          lookFor: 'A clear goal, an insight from data, a result, and proof quality held.',
          criteria: [
            'States the goal with a number',
            'Shows the insight that led to the change',
            'Gives a result with numbers',
            'Shows lead quality held',
          ],
          reportedAt: 'Jul 2024',
        },
        {
          q: 'Tell me about your experience working with product and design. (Asked at Dropbox, per Glassdoor)',
          answer:
            'Show how you work, not just that you did. “I bring the funnel data and a ranked list of problems; the designer owns the solution; the PM decides what fits the roadmap. We agree on the success metric before design starts.”\n\nGive one example where design changed your idea for the better.',
          lookFor: 'Clear roles, shared metrics, and respect for design and product.',
          criteria: [
            'Describes clear roles',
            'Agrees the metric before building',
            'Shows openness to their ideas',
          ],
          reportedAt: 'Jun 2018',
        },
        {
          q: 'Tell me about an experiment that failed.',
          answer:
            'Pick a real one. “We tested a 7-day free trial against 14 days, expecting more conversions. Trial-to-paid stayed flat and support tickets rose.”\n\nThen the learning and what changed: “Trial length was not the problem; users were not activating in the first 3 days. We moved effort to onboarding, and that test lifted conversion.”',
          lookFor: 'Honesty, a clear learning, and what it changed.',
          criteria: [
            'A real loss, stated plainly',
            'A specific learning',
            'What they did next because of it',
          ],
        },
        {
          q: 'How would you use AI or automation to improve prioritisation and decision-making? (Asked at Keragon, per Glassdoor)',
          answer:
            'Use AI where volume is high and judgement is checkable. Summarise thousands of reviews and support tickets into themes, then count them to rank problems. Generate 20 ad or email variants and let the test pick. Draft the weekly experiment readout from the data, and have a human check every number.\n\nAutomate the routine: a workflow in n8n or Zapier that posts each finished test’s result to a log. Keep decisions human: AI suggests, data decides, you own the call.',
          lookFor: 'Specific uses, a human check on numbers, and clear ownership of decisions.',
          criteria: [
            'Names specific, high-volume uses',
            'Keeps a human check on numbers',
            'Automates the routine reporting',
            'Owns the final decision',
          ],
          round: 'Take-home review',
          reportedAt: 'Dec 2025',
        },
      ],
    },
  ],
  plans: [
    {
      days: '7 days',
      title: 'Interview next week',
      tasks: [
        'Day 1: sign up for their product and screenshot every step to the first “aha” moment.',
        'Day 2: write three results from your past work, each with metric, baseline, change and result.',
        'Day 3: practise the payback, ROAS, viral-coefficient and sample-size questions until the maths is automatic.',
        'Day 4: write a one-page teardown of their funnel with 3 ranked test ideas.',
        'Day 5: do the root-cause and growth-levers questions out loud, 3 minutes each.',
        'Day 6: do a mock interview and present your teardown in 10 minutes.',
        'Day 7: prepare three questions, such as which metric the team is judged on this quarter.',
      ],
    },
    {
      days: '14 days',
      title: 'Build proof of work',
      tasks: [
        'Week 1: everything in the 7-day plan.',
        'Week 2: turn your teardown into a short public post or doc you can link.',
        'Send it with the five-line note to the growth lead at your top 5 targets.',
        'Rewrite three resume bullets as metric, baseline, change, result.',
      ],
    },
    {
      days: '30 days',
      title: 'Run a proper search',
      tasks: [
        'List 25 targets: companies that raised in the last 6 months, plus scale-ups with open growth roles.',
        'For each: apply, message the growth lead, and follow up once after 5–6 days.',
        'Write one teardown a week and reuse the research.',
        'Practise one case and one maths question a day, out loud.',
        'Track replies by message and double down on the one that works.',
      ],
    },
  ],
  resources: [
    {
      title: 'Four Fits for $100M+ growth (Brian Balfour)',
      url: 'https://brianbalfour.com/four-fits-growth-framework',
      kind: 'Guide',
      why: 'The framework behind most growth strategy questions. Main idea: market, product, channel and business model only work as one system.',
      free: true,
    },
    {
      title: 'Growth loops are the new funnels (Reforge)',
      url: 'https://www.reforge.com/blog/growth-loops',
      kind: 'Guide',
      why: 'Explains loops, where each cycle’s output feeds the next. Use it to spot compounding ideas in case questions.',
      free: true,
    },
    {
      title: 'Growth Hacker is the new VP Marketing (Andrew Chen)',
      url: 'https://andrewchen.com/how-to-be-a-growth-hacker-an-airbnbcraigslist-case-study/',
      kind: 'Essay',
      why: 'The essay that defined the role, with Airbnb’s Craigslist integration as the case. Short and still useful.',
      free: true,
    },
    {
      title: 'Sean Ellis on product-market fit (Venture Hacks)',
      url: 'https://venturehacks.com/sean-ellis-interview',
      kind: 'Guide',
      why: 'The 40% “very disappointed” test. Main idea: do not spend on growth before the product retains.',
      free: true,
    },
    {
      title: 'What is good retention? (Lenny Rachitsky)',
      url: 'https://www.lennysnewsletter.com/p/what-is-good-retention-issue-29',
      kind: 'Newsletter',
      why: 'Retention benchmarks by product type, so you can say whether a number in a case is good or bad.',
      free: true,
    },
    {
      title: 'A/B test sample size calculator (Evan Miller)',
      url: 'https://evanmiller.org/ab-testing/sample-size.html',
      kind: 'Tool',
      why: 'Check your sample-size maths. Main idea: your baseline rate and minimum detectable effect decide how long a test runs.',
      free: true,
    },
    {
      title: 'Experimentation papers (Ron Kohavi)',
      url: 'https://exp-platform.com/',
      kind: 'Guide',
      why: 'Free papers from the people who built experimentation at Microsoft, including the rules of thumb and sample ratio mismatch.',
      free: true,
    },
    {
      title: 'North Star Playbook (Amplitude)',
      url: 'https://amplitude.com/books/north-star/defining-your-north-star',
      kind: 'Guide',
      why: 'How to choose one metric that links customer value to revenue, and break it into inputs.',
    },
    {
      title: 'Google Analytics courses (Skillshop)',
      url: 'https://support.google.com/analytics/answer/15440208?hl=en',
      kind: 'Course',
      why: 'Google’s free e-learning on Analytics. Most Indian growth job posts ask for GA.',
      free: true,
    },
    {
      title: 'GTM Engineer hub',
      url: '/gtm-engineer',
      kind: 'Our guide',
      why: 'The automation-heavy cousin of growth, for B2B outbound. Useful if you like building systems.',
      free: true,
    },
  ],
  related: [
    { label: 'GTM Engineer hub', href: '/gtm-engineer' },
    { label: 'Founder’s Office hub', href: '/founders-office' },
    { label: 'Data Analyst hub', href: '/data-analyst' },
    { label: 'Product Manager hub', href: '/product-manager' },
  ],
  faqs: [
    {
      q: 'What does a Growth Manager do?',
      a: 'They own one business number, such as signups, activation, retention or revenue, and move it with experiments across acquisition channels, onboarding, lifecycle messages and referrals.',
    },
    {
      q: 'What is the Growth Manager salary in India?',
      a: 'Job posts we checked in November 2026 ranged from ₹8–15 LPA for 2–5 years to ₹30–50 LPA for a Growth Lead and ₹45–65 LPA for a Head of Growth. AmbitionBox’s self-reports for 1–5 years range from ₹3 LPA to ₹32.3 LPA across 2.2k salaries.',
    },
    {
      q: 'What is the growth marketing salary in the US?',
      a: 'Levels.fyi shows a median of $225K total compensation for growth marketing (14 data points) and $241K for growth product managers (November 2026).',
    },
    {
      q: 'Can a fresher become a Growth Manager?',
      a: 'Usually through a growth associate, growth intern or performance marketing role first. Startups hire juniors who can show a result, such as SEO pages that brought signups or a campaign with a measured cost per user.',
    },
    {
      q: 'What is the difference between growth marketing and performance marketing?',
      a: 'Performance marketing runs paid channels to a cost target. Growth owns the whole funnel, including onboarding, retention and referrals, and often changes the product as well as the ads.',
    },
    {
      q: 'Do growth interviews include SQL?',
      a: 'Often, at a basic level: joins, group by and simple cohort queries. Candidates reported SQL questions at Meta and in Glassdoor’s growth manager interviews.',
    },
  ],
}

export default growth
