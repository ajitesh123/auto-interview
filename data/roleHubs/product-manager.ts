import type { RoleHub } from './types'

// Product Manager role hub (generalist PM: APM, PM, Senior PM). AI PM has its own hub at /aipm.
// Sources opened on 2026-11-06:
// - Apollo.io people search (free): titles "Product Manager", "Associate Product Manager",
//   "Senior Product Manager" (strict match), started in the last 670 days, tech employers only
//   (NAICS 5415, 5112, 5132, 5182, 5191), India by employer size, plus the US total
// - Job posts with stated pay: Wellfound, Weekday, YC Work at a Startup (URLs on each pay row)
// - Levels.fyi product manager India and US; AmbitionBox product manager salary (updated 5 Mar 2025)
// - Reported questions: Glassdoor reviews and question pages (Google, Meta, Amazon, Microsoft, Flipkart,
//   Meesho), AmbitionBox (Swiggy, Razorpay, Flipkart)
// - Loops: amazon.jobs PM interview prep, metacareers.com, Glassdoor reviews, productleadership.com,
//   Aakash Gupta on interview homework
// - Story: bringthedonuts.com (McElroy memo), news.aakashg.com (history of PM), Joel on Software (2009),
//   Wikipedia (Marissa Mayer), a16z (Horowitz), CNBC/NBC (Lenny's Newsletter), Business Insider via AOL
//   (LinkedIn Associate Product Builder, Dec 2025)

// Reported-question pages (opened 2026-11-06):
//   Google: glassdoor.com/Interview/Google-Interview-E9079-RVW102441674.htm, RVW9491389,
//     Google-Associate-Product-Manager-Interview-Questions-EI_IE9079.0,6_KO7,32_IP5.htm
//   Meta: glassdoor.com/Interview/Meta-PM-Interview-Questions-EI_IE40772.0,4_KO5,7_IP10.htm
//   Amazon: glassdoor.com/Interview/Amazon-Interview-E6036-RVW92923936.htm,
//     Amazon-Senior-Product-Manager-Interview-Questions-EI_IE6036.0,6_KO7,29_IP17.htm
//   Microsoft: glassdoor.com/Interview/Microsoft-Interview-E1651-RVW101467849.htm
//   Flipkart: glassdoor.ie/Interview/Flipkart-Interview-E300494-RVW87532961.htm,
//     ambitionbox.com/interviews/flipkart-interview-questions?page=8
//   Meesho: glassdoor.co.in/Interview/Meesho-Interview-E1503776-RVW104284631.htm, RVW93238677
//   Swiggy: ambitionbox.com/interviews/question/what-is-the-root-cause-analysis-rca-of-the-5-drop-in-google-docs-usage-QuP0Hy82
//     and the Swiggy repeat-orders interview experience on AmbitionBox
//   Razorpay: ambitionbox.com/interviews/razorpay-interview-questions

const productManager: RoleHub = {
  slug: 'product-manager',
  visuals: {
    og: '/static/images/roles/product-manager/og.jpg',
  },
  roleName: 'Product Manager',
  shortName: 'PM',
  metaTitle: 'Product Manager Interview Prep 2026: Questions & Pay',
  metaDescription:
    'Product Manager interview prep: 30 questions with model answers (27 reported at Google, Meta, Flipkart, Swiggy), loops, and posted pay in India and the US.',
  keywords: [
    'product manager',
    'product manager interview questions',
    'product manager interview preparation',
    'associate product manager interview questions',
    'product manager salary india',
    'apm interview questions',
    'how to become a product manager',
    'product sense interview',
  ],
  heroTitle: 'Product Manager interview prep',
  heroDescription:
    'The job that decides what gets built and why. How the role works at startups versus Big Tech, 30 questions (27 reported by candidates) with model answers and what the interviewer listens for, and pay from real job posts.',
  directAnswer:
    'A Product Manager decides what a team builds next and proves it worked: they find the user problem, pick the metric, write the spec and ship with engineering and design. In Indian tech, 13,442 people started a Product Manager title since January 2025, about half at companies of 1,000+. Loops test product sense, metrics, estimation, strategy and behaviour, and Indian companies often add a take-home deck.',
  lastUpdated: '2026-11-06',
  story: {
    summary:
      'Product management started as a marketing idea: one person owning one product, from a 1931 Procter & Gamble memo. Software made it a technical job at Microsoft and Google, whose APM programme (2002) became the template for new-graduate PM hiring. In 2025–26, AI tools are pushing PMs to prototype and build, not just write specs.',
    born: { when: '1931', what: 'P&G’s “brand man” memo: one owner per product' },
    rise: { when: '2002', what: 'Google’s APM programme hires PMs straight from college' },
    milestones: [
      {
        when: 'May 1931',
        title: 'The “brand man” memo',
        detail:
          'Neil McElroy at Procter & Gamble argues that each brand needs one person who owns it end to end. Rich Mironov calls it the forerunner of product management: it “encouraged organizations to form themselves around products rather than functions”.',
        sourceLabel: 'Rich Mironov: McElroy memo turns ninety',
        sourceUrl:
          'https://www.bringthedonuts.com/essays/product-management-mcelroy-memo-turns-ninety/',
      },
      {
        when: 'Late 1980s',
        title: 'Microsoft reinvents the program manager',
        detail:
          'Jabe Blumenthal, a programmer on Mac Excel, “took the title ‘Program Manager,’ but reinvented the job completely”: the person who writes the spec and speaks for the user. Software PM roles grew from there.',
        sourceLabel: 'Joel Spolsky, Joel on Software (2009)',
        sourceUrl: 'https://www.joelonsoftware.com/2009/03/09/how-to-be-a-program-manager/',
      },
      {
        when: '2002',
        title: 'Google starts the APM programme',
        detail:
          'Marissa Mayer creates the Associate Product Manager programme to hire new graduates straight into product and train them as future leaders. Flipkart later built India’s first APM programme on a similar idea.',
        sourceLabel: 'Wikipedia: Marissa Mayer',
        sourceUrl: 'https://en.wikipedia.org/wiki/Marissa_Mayer',
      },
      {
        when: '2008',
        title: 'INSPIRED becomes the handbook',
        detail:
          'Marty Cagan publishes INSPIRED, the standard text on product discovery and empowered product teams. It is still the book most PM interviewers have read.',
        sourceLabel: 'Rework: Marty Cagan',
        sourceUrl:
          'https://resources.rework.com/libraries/leadership-legends/marty-cagan-leadership',
      },
      {
        when: 'Jun 2012',
        title: '“A good product manager is the CEO of the product”',
        detail:
          'a16z publishes Ben Horowitz’s training note “Good Product Manager / Bad Product Manager”, written about 15 years earlier. Its contrasts between strong and weak PMs are still quoted in interviews.',
        sourceLabel: 'a16z',
        sourceUrl: 'https://a16z.com/good-product-manager-bad-product-manager/',
      },
      {
        when: 'Dec 2025',
        title: 'LinkedIn swaps APMs for “product builders”',
        detail:
          'LinkedIn’s CPO Tomer Cohen says its APM programme will become an Associate Product Builder track: “We’re going to teach them how to code, design, and PM at LinkedIn.”',
        sourceLabel: 'Business Insider via AOL',
        sourceUrl:
          'https://www.aol.com/news/linkedin-scrapping-associate-product-manager-063508038.html',
      },
      {
        when: 'Jan 2025 → now',
        title: '13,442 new Product Managers in Indian tech',
        detail:
          '13,442 people started a Product Manager title at Indian tech companies since January 2025. About half joined companies of 1,000 or more people.',
        sourceLabel: 'Our count (Apollo people search)',
        sourceUrl: '#hiring',
      },
    ],
    why: [
      'Software teams need one person to decide what not to build. Engineering time is the most expensive thing in a tech company.',
      'Every product is measured now, so a PM can own a metric and prove whether a launch worked.',
      'APM programmes at Google, Flipkart and others made PM a job you can enter straight from college, not only after years in engineering.',
    ],
  },
  aiAngle:
    'AI tools let a PM build a clickable prototype in an afternoon, and some loops now test it: a Microsoft candidate in October 2026 reported a “vibecoding” round to build a prototype from a rough spec. Learn to write a one-page spec, turn it into a working prototype with Claude, Cursor or Lovable, and define how you would evaluate an AI feature before it ships.',
  mustKnow:
    'Every PM answer runs on the same spine: who is the user, what problem hurts most, what you would build first and why, and which metric proves it worked. Say that structure out loud before you go deep.',
  whatTheRoleIs: [
    'A Product Manager decides what the team builds next and makes sure it works for users and the business. A typical week: talk to users or read their feedback, check the metric you own, write or refine a spec, unblock engineers and designers, and say no to good ideas that are not the most important one.',
    'The title covers a ladder. Searches for strict titles in Indian tech since January 2025 return 13,442 for Product Manager, 2,663 for Senior Product Manager and 1,742 for Associate Product Manager. APM is the usual entry point from college; most PMs move in from engineering, analytics, consulting or design after 2–4 years.',
    'In India it is a large-company job as much as a startup one. Of the new Product Managers with a known employer size, 6,434 joined companies of more than 1,000 people and 1,860 joined companies of 50 or fewer. At a startup you will also do analytics, support and sales calls; at a large company you usually own one part of one product.',
  ],
  expectationLabels: {
    nav: 'Consumer vs B2B',
    title: 'What hiring managers expect: consumer app vs B2B SaaS',
    sub: 'The same craft, different users and different numbers. Know which one you are interviewing for.',
    a: 'Consumer app',
    b: 'B2B SaaS',
    aNote: 'Most Indian unicorn loops',
    differenceTitle: 'How PM differs from nearby roles',
  },
  expectations: {
    b2b: {
      headline: 'Consumer app (commerce, fintech, food, social): millions of users, small edges',
      points: [
        'Improve one step of a high-volume flow, such as search, checkout, onboarding or repeat orders.',
        'Run A/B tests and read them carefully; a 1% change can be worth crores.',
        'Segment users sharply: new vs repeat, metro vs tier-2, Android vs iOS.',
        'Balance the user, the business and the other side of the market (sellers, restaurants, drivers).',
        'Expect root-cause questions: “orders dropped 8% yesterday, why?”',
      ],
      metrics: [
        'Conversion at each funnel step',
        'D1, D7 and D30 retention',
        'Orders or sessions per user',
        'Contribution margin per order',
      ],
    },
    b2c: {
      headline:
        'B2B SaaS (fintech infra, dev tools, HR, sales software): fewer users, bigger deals',
      points: [
        'Talk to customers every week; sales and support are your best sources.',
        'Separate the buyer (who pays) from the user (who clicks), and design for both.',
        'Write specs engineers can build from, including edge cases, permissions and APIs.',
        'Prioritise a roadmap pulled between big-customer asks and the long-term product.',
        'Work with sales on launches, pricing and enablement.',
      ],
      metrics: [
        'Activated accounts and weekly active teams',
        'Net revenue retention',
        'Feature adoption by account',
        'Time to value for a new customer',
      ],
    },
    difference: [
      'Versus AI PM: an AI PM owns features built on models, with evals, cost and safety in scope. A generalist PM may ship AI features too, but the role is defined by the product, not the model. See the AI PM hub.',
      'Versus program manager: a program manager runs delivery across teams (timelines, dependencies, risks); a PM decides what to build and why.',
      'Versus growth manager: growth owns one business number across channels and the product; a PM owns a product area and its users.',
      'Versus product analyst: an analyst finds the insight; the PM decides what to do about it and owns the result.',
      'Versus Founder’s Office: a Founder’s Office role moves across functions on the founder’s priorities; a PM stays with one product.',
    ],
  },
  skills: [
    {
      area: 'Product sense',
      items: [
        'Pick a user segment and say why',
        'Rank pain points by how often and how badly they hurt',
        'Propose 3 solutions and choose one with a clear trade-off',
        'Sketch the first version (MVP) and what you would cut',
      ],
    },
    {
      area: 'Metrics and analysis',
      items: [
        'Choose a north-star metric and its input metrics',
        'Root-cause a metric drop: internal vs external, segment by segment',
        'Read an A/B test, including guardrails',
        'Basic SQL and a funnel or cohort chart',
      ],
    },
    {
      area: 'Execution',
      items: [
        'Write a one-page spec (PRD) with success criteria',
        'Prioritise with impact, effort and confidence, and explain the cut',
        'Plan a launch: rollout, risks, rollback',
        'Run a weekly review with engineering and design',
      ],
    },
    {
      area: 'Technical and AI',
      items: [
        'Explain how a feature works end to end (client, API, database)',
        'Talk trade-offs with engineers without writing code',
        'Prototype with an AI tool (Claude, Cursor, Lovable, v0)',
        'Define how you would evaluate an AI feature before launch',
      ],
    },
  ],
  getHired: {
    intro:
      'PM hiring managers screen for judgement they can see: a decision you made, the evidence, and the result. Your resume should read like a list of shipped products with metrics. The fastest way in without PM experience is a one-page product teardown, plus a working prototype, sent to the hiring PM.',
    bullets: [
      {
        weak: 'Worked with engineering and design to launch new features.',
        strong:
          'Led a 6-person squad (4 engineers, 1 designer, 1 analyst) to rebuild search filters; filter use rose from 11% to 19% of sessions and search-to-cart conversion rose 2.3 points in an A/B test.',
      },
      {
        weak: 'Responsible for the product roadmap.',
        strong:
          'Cut a 40-item backlog to 6 bets for the quarter using impact and effort scores agreed with sales; 5 shipped on time and the top one lifted weekly active teams by 14%.',
      },
      {
        weak: 'Did user research for the app.',
        strong:
          'Ran 18 user interviews with tier-2 shoppers; found that cash-on-delivery anxiety, not price, blocked first orders, and shipped a pay-on-delivery badge that raised first-order conversion from 3.1% to 3.8%.',
      },
      {
        weak: 'Software engineer interested in product.',
        strong:
          'Software engineer acting as product owner for the payments SDK: wrote the specs for 3 releases, interviewed 12 merchant developers and cut integration time from 5 days to 2.',
      },
    ],
    resumeTips: [
      'Lead each bullet with what shipped and the metric it moved, then how you decided.',
      'Show the team you led (engineers, designers) even without a manager title; PMs lead without authority.',
      'Name the method: A/B test, user interviews, SQL, a PRD. Hiring managers look for evidence you decided with data.',
      'Engineers and analysts moving to PM: rewrite your work as decisions and outcomes, not tasks.',
      'Add one link: a teardown, a PRD or a prototype. It answers “can you do the job?” before the interview.',
      'One page under 8 years of experience.',
    ],
    channels: [
      {
        name: 'Campus APM programmes',
        how: 'Flipkart runs a two-year APM programme with two one-year rotations, hiring through placement cells at selected colleges. Shortlisting often uses a take-home deck.',
        url: 'https://sites.google.com/flipkart.com/apm/about',
      },
      {
        name: 'Wellfound',
        how: 'Startup PM posts with salary and equity shown. Search “product manager” and “associate product manager” separately.',
        url: 'https://wellfound.com/jobs/4829631-product-manager',
      },
      {
        name: 'Weekday',
        how: 'Many Indian startup PM posts show a pay band and experience range.',
        url: 'https://jobs.weekday.works/jigsaw-product-manager-z194',
      },
      {
        name: 'Y Combinator Work at a Startup',
        how: 'US and India startup PM roles with pay and equity ranges. Good for founding PM roles.',
        url: 'https://www.ycombinator.com/companies/dili/jobs/VzbrBab-product-manager',
      },
      {
        name: 'Internal moves',
        how: 'The most common route in. Engineers, analysts and support leads who already know the product ask to own a small feature first.',
      },
    ],
    outreach: {
      title: 'A five-line note with a teardown attached',
      body: 'Hi [Name], I saw you are hiring a PM for [product area] at [Company].\n\nAt [Company], I [shipped X], which moved [metric] from [A] to [B].\n\nI used [their product] for two weeks and wrote a one-page teardown: the user I would focus on, the biggest pain point, and the first thing I would build, with a clickable prototype.\n\nWorth 20 minutes this week?',
      note: 'Send it to the hiring PM or product head, not only the recruiter. Follow up once after 5–6 days, then stop.',
    },
    proofOfWork: {
      title: 'Ship a one-page teardown and a prototype',
      why: 'It shows the whole job in miniature: picking a user, finding the problem, deciding what to build first, and defining success.',
      steps: [
        'Use the product for a week and note every point of friction, with screenshots.',
        'Pick one user segment and the single most painful problem for them; say why it beats the others.',
        'Write a one-page spec: the problem, the solution, what you cut, the success metric and a guardrail.',
        'Build a clickable prototype of the first version with an AI tool (Claude, Lovable or v0) and record a 2-minute walkthrough.',
      ],
    },
  },
  process: [
    {
      companyType: 'Big Tech (Google, Meta, Amazon, Microsoft)',
      rounds: [
        'Recruiter screen',
        'Phone screen: product sense, or Leadership Principles at Amazon',
        'Onsite of 4–5 rounds of 45–55 minutes: product sense, execution or analytics, technical, leadership',
        'Amazon sends a writing exercise before the loop; Google uses a hiring committee',
      ],
    },
    {
      companyType: 'Indian consumer unicorn (Flipkart, Meesho, Razorpay, Swiggy)',
      rounds: [
        'Hiring manager call (30–45 minutes)',
        'Take-home deck or assignment, heavily weighted for the shortlist (campus APM: a 6-page deck)',
        'Product design, root-cause and guesstimate rounds',
        'Strategy or business round, then a bar raiser or culture round',
      ],
    },
    {
      companyType: 'Early-stage startup',
      rounds: [
        'Founder conversation',
        'Product case or take-home, presented to the team',
        'Sessions with engineering and design',
        'Final with the founder; 2–6 weeks in total',
      ],
    },
    {
      companyType: 'What candidates reported',
      rounds: [
        'Amazon (official prep page): a 60-minute phone screen, half Leadership Principles; a writing assessment two days before a loop of five 55-minute interviews (amazon.jobs)',
        'Flipkart APM (campus, Dec 2024): a 6-page deck for shortlisting, then guesstimate, root-cause and HR rounds (Glassdoor)',
        'Meesho PM (Nov 2025): four rounds, with product sense third (Glassdoor)',
        'Microsoft PM, AI org (Redmond, Oct 2026): about five rounds including a “vibecoding” prototype round and a final with a director (Glassdoor)',
      ],
    },
  ],
  pay: {
    title: 'Pay: India and US job posts, plus Levels.fyi',
    headline: 'India ₹19.5 LPA · US $175K (post medians)',
    intro:
      'Posted pay for Product Managers runs from ₹6–10 LPA for an APM at a small startup to ₹50–80 LPA for a senior PM. The median midpoint across 11 India posts we opened is ₹19.5 LPA; across 11 US posts it is $175K base. Big Tech pays more: Levels.fyi’s India median total compensation is ₹45.2 LPA.',
    tables: [
      {
        region: 'India: job posts with stated pay',
        tab: 'India · job posts',
        currency: 'INR (₹, lakh per annum, as posted)',
        rows: [
          {
            band: 'Recruiterflow, Associate PM, Bengaluru',
            experience: '0–1 yrs',
            value: '₹6–10 LPA',
            url: 'https://wellfound.com/jobs/4810423-associate-product-manager',
          },
          {
            band: 'xpat.money, PM, Bengaluru',
            experience: '1–3 yrs',
            value: '₹12–14 LPA',
            url: 'https://jobs.weekday.works/xpat-product-manager',
          },
          {
            band: 'MyNaksh, Associate PM, Bengaluru',
            experience: '1+ yrs',
            value: '₹10–20 LPA',
            url: 'https://jobs.weekday.works/mynaksh%2C-associate-product-manager',
          },
          {
            band: 'Neemtree, Associate PM, Bengaluru / Pune',
            experience: '1+ yrs',
            value: '₹14–20 LPA',
            url: 'https://jobs.weekday.works/neemtree-associate-product-manager-rnuq',
          },
          {
            band: 'Legistify, PM / Solution Engineer, Gurgaon',
            experience: '3 yrs',
            value: '₹12–23 LPA',
            url: 'https://wellfound.com/jobs/4817692-product-manager-solution-engineer',
          },
          {
            band: 'SwiffyLabs, PM (lending), Bengaluru',
            experience: '2 yrs',
            value: '₹15–24 LPA',
            url: 'https://wellfound.com/jobs/4868494-product-manager-los',
          },
          {
            band: 'ZenTrades, Senior PM, Pune',
            experience: '4+ yrs',
            value: '₹20–30 LPA',
            url: 'https://wellfound.com/jobs/4777718-senior-product-manager',
          },
          {
            band: 'Zenskar, PM, Bengaluru',
            experience: '2.5–4.5 yrs',
            value: '₹30–40 LPA',
            url: 'https://wellfound.com/jobs/4829631-product-manager',
          },
          {
            band: 'Senior PM (client unnamed), Mumbai',
            experience: '4–7 yrs',
            value: '₹35–40 LPA',
            url: 'https://jobs.weekday.works/weekday-partner-network-senior-product-manager-pxp9ev',
          },
          {
            band: 'Jigsaw, PM, Bengaluru',
            experience: '4+ yrs',
            value: '₹40–55 LPA',
            url: 'https://jobs.weekday.works/jigsaw-product-manager-z194',
          },
          {
            band: 'Xceedance, Senior PM, Bengaluru',
            experience: '6+ yrs',
            value: '₹50–80 LPA',
            url: 'https://jobs.weekday.works/xceedance-senior-product-manager',
          },
        ],
        note: 'Each row is one job post; tap it to open. The median midpoint of these 11 posts is ₹19.5 LPA. Posts do not say whether figures are CTC or fixed pay; treat them as CTC. Check what that means in hand with our salary calculator.',
        sourceLabel: 'Wellfound and Weekday job posts',
        sourceUrl: 'https://wellfound.com/jobs/4829631-product-manager',
        asOf: 'Nov 6, 2026',
      },
      {
        region: 'India: Levels.fyi total compensation',
        tab: 'India · Levels.fyi',
        currency: 'INR (₹, total compensation per year)',
        rows: [
          { band: '25th percentile', experience: 'All levels', value: '₹29.3 LPA' },
          { band: 'Median', experience: 'All levels', value: '₹45.2 LPA' },
          { band: '75th percentile', experience: 'All levels', value: '₹68.7 LPA' },
          { band: '90th percentile', experience: 'All levels', value: '₹93.1 LPA' },
        ],
        note: 'Levels.fyi self-reports lean towards Big Tech and well-funded companies, which is why they sit above startup posts. AmbitionBox, which covers more employers, shows ₹5.7–38 LPA across 53.6k salaries (last updated 5 Mar 2025).',
        sourceLabel: 'Levels.fyi',
        sourceUrl: 'https://www.levels.fyi/t/product-manager/locations/india',
        asOf: 'Nov 6, 2026',
      },
      {
        region: 'United States: job posts with stated pay',
        tab: 'US · job posts',
        currency: 'USD (base salary per year, as posted)',
        rows: [
          {
            band: 'Reframe, PM (new grads OK), Atlanta',
            experience: 'Any',
            value: '$90K–120K',
            url: 'https://www.ycombinator.com/companies/reframe/jobs/UyM6sgD-product-manager',
          },
          {
            band: 'Agave API, PM, San Francisco',
            experience: '2+ yrs',
            value: '$130K–200K',
            url: 'https://wellfound.com/jobs/4353862-product-manager',
          },
          {
            band: 'Aurelian, Founding PM, Seattle',
            experience: '3+ yrs',
            value: '$140K–200K',
            url: 'https://www.ycombinator.com/companies/aurelian/jobs/Hzna1vE-founding-product-manager',
          },
          {
            band: 'Bobyard, Senior PM, San Francisco',
            experience: '5+ yrs',
            value: '$160K–180K',
            url: 'https://wellfound.com/jobs/3705792-senior-product-manager',
          },
          {
            band: 'Motive, Senior PM, San Francisco',
            experience: '5+ yrs',
            value: '$150K–210K',
            url: 'https://wellfound.com/jobs/4557305-senior-product-manager-security-and-data',
          },
          {
            band: 'dili, PM, New York',
            experience: '3+ yrs',
            value: '$160K–190K',
            url: 'https://www.ycombinator.com/companies/dili/jobs/VzbrBab-product-manager',
          },
          {
            band: 'FleetWorks, Senior PM, San Francisco',
            experience: '5+ yrs',
            value: '$160K–200K',
            url: 'https://www.ycombinator.com/companies/fleetworks/jobs/bBwSR4j-senior-product-manager',
          },
          {
            band: 'Convex, PM, San Francisco',
            experience: '2–4 yrs',
            value: '$170K+',
            url: 'https://wellfound.com/jobs/4290056-product-manager',
          },
          {
            band: 'Unlearn.AI, PM, San Francisco',
            experience: '3+ yrs',
            value: '$156K–235K',
            url: 'https://wellfound.com/jobs/3541212-product-manager',
          },
          {
            band: 'Artos, PM, San Francisco',
            experience: '4+ yrs',
            value: '$195K–242K',
            url: 'https://www.ycombinator.com/companies/artos/jobs/npMEoUf-product-manager',
          },
          {
            band: 'Alinea, PM, New York',
            experience: '6+ yrs',
            value: '$215K–250K',
            url: 'https://www.ycombinator.com/companies/alinea/jobs/hzNvoIY-product-manager',
          },
        ],
        note: 'Each row is one post; tap it to open. The median midpoint of these 11 posts is $175K. All are startups, and several add equity (for example dili 0.10–0.20%, Agave 0.15–0.25%).',
        sourceLabel: 'Y Combinator Work at a Startup and Wellfound job posts',
        sourceUrl: 'https://www.ycombinator.com/companies/dili/jobs/VzbrBab-product-manager',
        asOf: 'Nov 6, 2026',
      },
      {
        region: 'United States: Levels.fyi total compensation',
        tab: 'US · Levels.fyi',
        currency: 'USD (total compensation per year)',
        rows: [
          { band: '25th percentile', experience: 'All levels', value: '$170K' },
          { band: 'Median', experience: 'All levels', value: '$233K' },
          { band: '75th percentile', experience: 'All levels', value: '$333K' },
          { band: '90th percentile', experience: 'All levels', value: '$452K' },
        ],
        note: 'Total compensation includes base, bonus and stock, so it runs above the base-only posts. Self-reports lean towards Big Tech.',
        sourceLabel: 'Levels.fyi',
        sourceUrl: 'https://www.levels.fyi/t/product-manager/locations/united-states',
        asOf: 'Nov 6, 2026',
      },
    ],
    crossCheck:
      'Startup posts sit well below Levels.fyi: the India post median (₹19.5 LPA) is under half the Levels.fyi India median (₹45.2 LPA), and the US post median ($175K base) is about 25% below the US total-compensation median ($233K). The gap is Big Tech and stock. Compare offers on in-hand pay, not CTC.',
  },
  hiring: {
    title: 'Where new Product Managers went in Indian tech, 2025–26',
    segments: true,
    intro:
      'In India, 13,442 people started a Product Manager title at tech companies since January 2025. Unlike growth or Founder’s Office roles, PM hiring leans to large companies: 6,434 of them joined companies of more than 1,000 people. In the US, 25,016 people started the same title at tech companies.',
    companies: [
      { name: '50 people or fewer', count: 1860, segment: 'Seed to Series A' },
      { name: '51–200 people', count: 2067, segment: 'Series A to C' },
      { name: '201–1,000 people', count: 2835, segment: 'Scale-ups' },
      { name: 'Over 1,000 people', count: 6434, segment: 'Large companies' },
    ],
    method:
      'Counted in Apollo.io: people in India whose current title strictly matches “Product Manager”, who started it in the last 670 days, at employers in software, IT services, data and internet industries (NAICS 5415, 5112, 5132, 5182, 5191), split by employer headcount. 13,196 of 13,442 had a known company size. Strict searches for “Associate Product Manager” (1,742) and “Senior Product Manager” (2,663) are shown in the text; Apollo’s strict match for “Product Manager” may include some of them, so they are not added together. US: same filter, 25,016 people.',
    sourceLabel: 'Apollo.io people data',
    asOf: 'Nov 6, 2026',
  },
  questionGroups: [
    {
      id: 'fit',
      title: 'Motivation and leadership',
      blurb:
        'Every loop has a behavioural round, and at Amazon half the phone screen is one. Prepare five stories you can bend to any question.',
      questions: [
        {
          q: 'Tell me about yourself.',
          answer:
            'Keep it to 90 seconds and make it a product story, not a CV recital.\n\nThree beats: what you have built or decided so far (one example with a metric), why product is the job you want, and why this company’s product is the next problem you want to work on.\n\nEnd with one specific observation about their product that you noticed as a user.',
          lookFor:
            'A clear thread, one decision with a result, and evidence you used their product.',
          criteria: [
            'Under 90 seconds',
            'One decision or launch with a number',
            'A clear reason for product, not just “impact”',
            'A specific observation about their product',
          ],
        },
        {
          q: 'Why product management, and why now?',
          answer:
            'Name the moment you found yourself doing PM work already: deciding what to build, talking to users, settling a trade-off between engineering and the business.\n\nThen explain what you liked about it and what you are giving up (deep engineering, client work, analysis) with open eyes.\n\nClose with what you will bring that most PMs lack: your engineering, data, design or domain background.',
          lookFor: 'Real PM-like work in the past, a realistic view of the job, and a clear edge.',
          criteria: [
            'Points to PM work they have already done',
            'Shows they know the hard parts of the job',
            'Names a specific edge from their background',
          ],
        },
        {
          q: 'Tell me about a time you had to pivot a product strategy. (Asked at Meta, per Glassdoor)',
          answer:
            'Use STAR, but spend most of the time on the decision. Situation: what you were building and the bet behind it. Then the signal that the bet was wrong: data, user interviews, a competitor move.\n\nExplain how you decided to change course, who you had to convince, and what you stopped doing. Pivots are about cutting, so name the cut.\n\nFinish with the result and what you would spot earlier next time.',
          lookFor: 'Changing your mind on evidence, bringing people with you, and owning the cost.',
          criteria: [
            'Names the evidence that changed the plan',
            'Explains how they brought stakeholders along',
            'Says what was cut or lost',
            'Gives the result and a lesson',
          ],
          round: 'Leadership and drive',
        },
        {
          q: 'Tell me about a time when you dug deep. (Asked at Amazon, per Glassdoor)',
          answer:
            'This maps to Amazon’s “Dive Deep” principle, so pick a story where the surface answer was wrong.\n\nExample shape: a metric looked healthy, you pulled the raw data or read support tickets, and found a segment hidden by the average. Say what you looked at, in what order, and what you found.\n\nEnd with the decision it changed and the number that moved.',
          lookFor:
            'Going past dashboards to raw data or users, and a decision that changed because of it.',
          criteria: [
            'Starts from a misleading surface number',
            'Describes the exact data or sources they checked',
            'Finds a specific hidden cause',
            'Shows the decision and result that followed',
          ],
          reportedAt: 'Aug 2024',
        },
        {
          q: 'Tell me about a time you had multiple conflicts and managed the trade-offs. (Asked at Amazon, per Glassdoor)',
          answer:
            'Pick a story with at least two stakeholders who wanted different things, such as sales wanting a custom feature and engineering wanting to pay down tech debt.\n\nShow how you made the trade-off explicit: the cost of each option, the metric you used to decide, and who agreed to what. Say who was unhappy and how you handled it.\n\nThe result should include how the relationship held up, not just what shipped.',
          lookFor:
            'Making trade-offs explicit with data, and keeping trust with the side that lost.',
          criteria: [
            'Two or more real, conflicting asks',
            'An explicit decision rule or metric',
            'Honest about who lost and how it was handled',
            'Result covers both outcome and relationships',
          ],
          reportedAt: 'Apr 2025',
        },
        {
          q: 'Tell me about a time you had to make a difficult decision. (Asked at Amazon, per Glassdoor)',
          answer:
            'Choose a decision with real stakes and incomplete data: killing a feature, delaying a launch, saying no to a large customer.\n\nWalk through the options, what you knew and did not know, and why you decided when you did instead of waiting for more data. Amazon calls this a two-way versus one-way door: say which it was.\n\nClose with what happened and whether you would decide the same way again.',
          lookFor: 'Deciding with incomplete data, a clear rationale, and honest reflection.',
          criteria: [
            'Real stakes and real uncertainty',
            'Options weighed with reasons',
            'Explains the timing of the decision',
            'Reflects honestly on the outcome',
          ],
          round: 'Phone screen / loop',
          reportedAt: 'Jun 2024',
        },
      ],
    },
    {
      id: 'product-sense',
      title: 'Product sense: design and improve',
      blurb:
        'The core PM round. Pick a user, pick a pain, pick a solution, and defend each choice. Interviewers score the choices, not the idea.',
      questions: [
        {
          q: 'Design a fitness product for seniors. (Asked at Google, per Glassdoor)',
          answer:
            'Clarify the goal first: health outcomes, engagement or revenue? Assume it is helping seniors stay active safely.\n\nSegment: seniors living alone, seniors with a chronic condition, seniors whose children manage their health from another city. Pick one, say the third, because they have both a strong need and a paying family member.\n\nPain points: no one notices when activity drops, exercise feels unsafe, and apps are too fiddly. Solution: a simple daily walk goal on a basic phone or watch, with a weekly summary sent to the family and an alert when activity falls for three days. Metric: weekly active seniors meeting their goal; guardrail: falls or injuries reported.',
          lookFor:
            'A goal, a chosen segment with a reason, ranked pain points, one solution with an MVP, and a metric.',
          criteria: [
            'Clarifies the goal before designing',
            'Picks one segment and explains why',
            'Ranks pain points instead of listing them',
            'Ends with a success metric and a guardrail',
          ],
          round: 'Onsite: product sense',
          reportedAt: 'Jan 2026',
        },
        {
          q: 'How would you improve Google Calendar? (Asked at Google, per Glassdoor)',
          answer:
            'Start with what Calendar is for and who uses it: people booking meetings with others. Pick a segment, for example managers with back-to-back meetings.\n\nTheir pains: no time to prepare, meetings that run over, and no focus time left. Rank them by frequency and pain; “no focus time” hurts most because it affects every day.\n\nImprovement: suggest moving low-priority meetings to protect two focus blocks a week, with one tap to accept. Measure the share of users who keep focus blocks for four weeks, with a guardrail on meetings declined by others.',
          lookFor:
            'A clear user, a ranked pain, a focused improvement, and how you would measure it.',
          criteria: [
            'States the product’s core job',
            'Chooses a specific user segment',
            'Picks one pain with a reason',
            'Proposes a measurable improvement',
          ],
          round: 'Onsite: product sense',
          reportedAt: 'Jan 2026',
        },
        {
          q: 'How would you improve Instagram Stories for creators? (Asked at Meta, per Glassdoor)',
          answer:
            'Define the creator: small creators (under 10,000 followers) trying to grow, or established ones trying to earn. Pick small creators; there are more of them and their retention drives content supply.\n\nTheir pains: not knowing what works, low reach, and time spent editing. The biggest is not knowing what works, because it makes them post less.\n\nSolution: a weekly “what worked” card comparing their Stories on replies and completion rate, with one suggestion. Metric: stories posted per active small creator per week; guardrail: viewer time spent in Stories.',
          lookFor:
            'Choosing between creator types, a ranked pain, and metrics on both sides of the market.',
          criteria: [
            'Segments creators and picks one',
            'Ranks pains with a reason',
            'Solution tied to the chosen pain',
            'Metrics for creators and viewers',
          ],
          round: 'Product sense (45 min)',
        },
        {
          q: 'Design a group buy feature for Flipkart. (Asked at Flipkart APM, per Glassdoor)',
          answer:
            'Clarify why: group buying lowers price per unit and brings new users through friends. Assume the goal is new buyers in tier-2 and tier-3 cities.\n\nUser: a price-sensitive shopper who already buys with friends or family. Flow: start a group for a deal, share it on WhatsApp, the price drops when 3 people join within 24 hours, and everyone pays separately.\n\nRisks: groups that never fill and sellers who cannot handle the discount. MVP: 50 products in 2 categories with a guaranteed fallback price. Metrics: new buyers acquired through groups and their 60-day repeat rate.',
          lookFor: 'Why the business wants it, a specific user, a simple flow, risks, and an MVP.',
          criteria: [
            'States the business goal',
            'Designs a concrete flow',
            'Names risks and how to limit them',
            'Scopes an MVP with metrics',
          ],
          reportedAt: 'Dec 2021',
        },
        {
          q: 'Design UX changes to improve repeat orders on Swiggy. (Asked at Swiggy, per AmbitionBox)',
          answer:
            'Find where repeat orders are lost. Split users into one-time, occasional and habitual; the biggest lever is usually turning a second order into a third.\n\nPains for occasional users: deciding what to eat takes too long, and the last order’s restaurant may be closed. Ideas: a “reorder” row on the home screen with one-tap checkout, and smart substitutes when a favourite is closed.\n\nTest the reorder row first because it is cheapest. Metric: share of users placing a second order within 14 days; guardrail: average order value.',
          lookFor: 'Segmenting by order frequency, specific UX changes, and a test plan.',
          criteria: [
            'Segments users by order frequency',
            'Picks the stage with the biggest drop',
            'Proposes specific UX changes',
            'Defines the test metric and guardrail',
          ],
        },
        {
          q: 'How would you improve search filters? (Asked at Meesho, per Glassdoor)',
          answer:
            'Ask which users and which categories. Meesho shoppers are often first-time online buyers on low-cost phones, browsing fashion with thousands of results.\n\nPains: too many results, filters hidden behind a menu, and filter names in English jargon. The biggest: shoppers do not find filters at all.\n\nIdeas: show 3 visual filter chips (price band, size, “COD available”) above results, and remember the size the user picked last time. Metric: search-to-order conversion; guardrail: search latency on low-end phones.',
          lookFor:
            'Knowing the user’s context (device, language, category), and visual, low-friction ideas.',
          criteria: [
            'Uses the real user context',
            'Finds the biggest pain with filters',
            'Specific, simple solutions',
            'Metric plus a performance guardrail',
          ],
          round: 'Product sense (round 3 of 4)',
          reportedAt: 'Nov 2025',
        },
        {
          q: 'Design a parking feature for Google Maps. Who are the users, what are their pain points, and why this solution? (Asked at Meta, per Glassdoor)',
          answer:
            'Users: drivers going somewhere they have not been, commuters, and parking operators. Pick first-time visitors to busy city areas.\n\nPains: not knowing if parking exists near the destination, circling for spots, and forgetting where they parked. Circling hurts most: it wastes time and makes people late.\n\nSolution: before the trip starts, show the likely parking difficulty and the nearest paid lot, and route to the lot, not the door. Metric: share of trips that end at a suggested lot; guardrail: total trip time.',
          lookFor: 'Clear users, a ranked pain, a justified choice, and a measurable outcome.',
          criteria: [
            'Lists users and picks one',
            'Ranks pain points',
            'Justifies the chosen solution',
            'Defines a success metric',
          ],
          round: 'Product design',
          reportedAt: 'Jun 2025',
        },
      ],
    },
    {
      id: 'metrics',
      title: 'Metrics and root-cause analysis',
      blurb:
        'Expect at least one “a number moved, why?” question. Check data first, then internal changes, then external causes, then segments.',
      questions: [
        {
          q: 'What is the root cause of a 5% drop in Google Docs usage? (Asked at Swiggy, per AmbitionBox)',
          answer:
            'Clarify first: which metric (daily active users or documents created), over what period, and was the drop sudden or gradual?\n\nThen go in order. Is the data right (a tracking change)? Did we ship something (a release, a login change)? Is it external (a holiday, a competitor, an outage)? Then segment by platform, country, user type and entry point until the drop concentrates somewhere.\n\nState your most likely cause, how you would confirm it, and what you would do next.',
          lookFor:
            'A structured order (data, internal, external, segments) and a testable hypothesis.',
          criteria: [
            'Clarifies the metric and time frame',
            'Checks data quality first',
            'Separates internal from external causes',
            'Segments to isolate the drop',
          ],
        },
        {
          q: 'An app on the Play Store is suddenly getting many negative reviews. Find the root cause. (Asked at Google APM, per Glassdoor)',
          answer:
            '“Suddenly” points to a change. Check the timing against releases, server incidents and policy or pricing changes.\n\nRead the reviews themselves: group them by theme (crash, login, price, ads) and by app version, device and country. If one version or one device family dominates, it is likely a bug.\n\nConfirm with crash rates and support tickets for the same window. Then fix or roll back, reply to reviews, and add an alert on review rating by version.',
          lookFor:
            'Linking “sudden” to a change, reading the reviews, and confirming with other data.',
          criteria: [
            'Looks for a recent change first',
            'Groups reviews by theme and version',
            'Confirms with a second data source',
            'Proposes a fix and a prevention step',
          ],
          round: 'Root-cause analysis',
        },
        {
          q: 'Netflix launches a podcast product in 6 months. How do you measure success, and what is the north-star metric? (Asked at Meta, per Glassdoor)',
          answer:
            'Start with why Netflix would do this: more time with Netflix and lower churn, not podcast ad revenue.\n\nNorth star: weekly podcast listening hours per subscriber, because it captures both reach and depth. Inputs: share of subscribers who try a podcast, listening hours per listener, and week-4 return rate.\n\nGuardrails: video watch time should not fall, and churn among listeners should be lower than among similar non-listeners. Say what result at month 6 would make you keep investing.',
          lookFor:
            'Tying the metric to the company goal, a north star with inputs, and guardrails.',
          criteria: [
            'Starts from the business goal',
            'Names one north-star metric with a reason',
            'Breaks it into input metrics',
            'Adds guardrails and a decision rule',
          ],
          round: 'Product analytics',
          reportedAt: 'Jun 2025',
        },
        {
          q: 'Define success metrics for Reels. (Asked at Meta, per Glassdoor)',
          answer:
            'Reels has viewers, creators and advertisers. Success means viewers find it worth their time, creators keep posting and it adds to Instagram overall.\n\nViewers: daily Reels viewers and time spent per viewer. Creators: share of creators posting weekly. Business: ad impressions in Reels. Pick one north star, say daily Reels viewers who watch at least 5 minutes.\n\nGuardrails: total Instagram time (Reels should not just steal from the feed) and reported or hidden content rate.',
          lookFor:
            'Covering all sides of the product, one clear north star, and cannibalisation guardrails.',
          criteria: [
            'Covers viewers, creators and business',
            'Chooses one north star',
            'Includes a cannibalisation guardrail',
            'Includes a quality guardrail',
          ],
          round: 'Execution',
          reportedAt: 'May 2025',
        },
        {
          q: 'Returns are higher on Meesho than expected. Find out why, then propose and prioritise solutions. (Asked at Meesho, per Glassdoor)',
          answer:
            'Break returns down: by category, by reason code (size, quality, “did not like”, wrong item), by seller and by buyer segment. Fashion size issues usually dominate.\n\nThen tie each reason to a cause in the flow: missing size charts, photos that do not match, or sellers shipping wrong items.\n\nPrioritise by returns removed per unit of effort: size guidance on top fashion listings first, seller penalties for wrong items second, photo checks third. Track return rate by category and guard against a fall in conversion.',
          lookFor:
            'Decomposing returns by reason and segment, linking causes to the flow, and prioritising.',
          criteria: [
            'Breaks returns down by reason and category',
            'Links each reason to a cause',
            'Prioritises fixes by impact and effort',
            'Adds a conversion guardrail',
          ],
          round: 'Product case study',
          reportedAt: 'Jul 2025',
        },
      ],
    },
    {
      id: 'estimation-strategy',
      title: 'Guesstimates and strategy',
      blurb:
        'Estimation tests structure, not the right answer. Strategy tests whether you can say yes or no with reasons.',
      questions: [
        {
          q: 'How many cars are there in Delhi? (Asked at Flipkart APM, per Glassdoor)',
          answer:
            'State your structure before any numbers: households × share owning a car × cars per owning household, plus commercial cars (taxis, company fleets).\n\nUse round assumptions and say they are assumptions: for example 2 crore people, 4.5 people per household (about 45 lakh households), 30% owning a car, 1.3 cars each, which gives about 17–18 lakh private cars. Add a share for taxis and fleets.\n\nSense-check against something you know, such as traffic or parking, and say which assumption you are least sure of.',
          lookFor: 'A stated structure, clear assumptions, clean maths aloud, and a sanity check.',
          criteria: [
            'States the structure before numbers',
            'Labels assumptions as assumptions',
            'Does the maths aloud and correctly',
            'Sense-checks the answer',
          ],
          round: 'Campus APM interview',
          reportedAt: 'Dec 2024',
        },
        {
          q: 'Should Flipkart enter the cattle trading market? (Asked at Flipkart APM, per Glassdoor)',
          answer:
            'Do not answer yes or no straight away. Ask what Flipkart wants: rural users, a new revenue line or a logistics edge.\n\nThen test three things: is the market large and underserved, does Flipkart have a right to win (payments, logistics, trust), and what is hard (live animals, health checks, regulation, delivery)?\n\nGive a recommendation with a smaller first step, for example a listings marketplace with verified sellers and payments, no delivery, in two states, and the metric that would justify going further.',
          lookFor:
            'Goal first, a market and right-to-win test, honest risks, and a staged recommendation.',
          criteria: [
            'Clarifies Flipkart’s goal',
            'Tests market size and right to win',
            'Names the hard parts honestly',
            'Recommends a small first step with a metric',
          ],
          reportedAt: 'Dec 2022',
        },
        {
          q: 'Should Google launch an OTT platform? (Asked at Razorpay, per AmbitionBox)',
          answer:
            'Start with Google’s goal and what it already has: YouTube is already a huge video platform, so the real question is whether a separate paid OTT adds anything.\n\nCheck the market (crowded, content is expensive), Google’s edge (distribution on Android TV and Chromecast, ads, payments) and the cost (content rights).\n\nA reasonable answer: do not build a new OTT; grow YouTube’s paid tiers and channel subscriptions instead. Say what would change your mind.',
          lookFor: 'Considering existing assets, market economics, and a clear recommendation.',
          criteria: [
            'Accounts for what Google already owns',
            'Weighs market and content economics',
            'Gives a clear recommendation',
            'Says what would change the answer',
          ],
          round: 'Round 1 (GTM)',
          reportedAt: 'Oct 2024',
        },
        {
          q: 'A grocery store is losing sales to online delivery apps. Design a product to address this. (Asked at Meta, per Glassdoor)',
          answer:
            'Clarify the store’s strengths: fresh produce, trust, a nearby location. The goal is to keep regular shoppers, not to beat delivery apps on speed.\n\nSegment: regulars who still visit but now order staples online. Their pain: carrying heavy items and not knowing what is in stock.\n\nProduct: order staples for same-day pickup or local delivery while browsing fresh items in store, with a weekly list saved. Metric: retained regular shoppers and basket size; guardrail: in-store margin.',
          lookFor: 'Playing to the store’s strengths, a precise segment, and business metrics.',
          criteria: [
            'Identifies the store’s advantages',
            'Chooses a specific segment',
            'Solution plays to strengths',
            'Business metric plus guardrail',
          ],
          round: 'Product sense',
          reportedAt: 'May 2025',
        },
      ],
    },
    {
      id: 'execution',
      title: 'Execution and take-homes',
      blurb:
        'Can you get it built and launched? Indian companies often test this with a take-home deck you present.',
      questions: [
        {
          q: 'Walk me through launching a messaging feature for small businesses. (Asked at Meta, per Glassdoor)',
          answer:
            'Set the goal and the success metric first: share of small businesses that reply to a customer within an hour, for example.\n\nPlan the launch in stages: internal test, a small beta with 100 businesses, then a percentage rollout by country. List what must be ready at each stage: help content, support training, abuse controls.\n\nName the risks (spam, slow replies hurting customers) with a guardrail and a rollback rule for each. Close with how you would decide to go from beta to full launch.',
          lookFor:
            'A staged plan, launch readiness, risks with guardrails, and go or no-go criteria.',
          criteria: [
            'Defines goal and success metric',
            'Plans a staged rollout',
            'Lists risks with guardrails',
            'States go or no-go criteria',
          ],
          round: 'Execution (45 min)',
        },
        {
          q: 'You have 10 feature requests and room for 3 this quarter. How do you prioritise?',
          answer:
            'Tie every request to the quarter’s goal first; anything that does not move it goes to the bottom, however loud the requester.\n\nScore the rest on impact (users affected × size of the effect), confidence (how sure you are) and effort (engineering weeks), and show the scores so others can challenge them.\n\nThen check dependencies and risk, pick 3, and tell the owners of the other 7 why, and when you will look again.',
          lookFor:
            'A goal-first filter, a transparent scoring method, and clear communication of the cut.',
          criteria: [
            'Filters by the quarter’s goal',
            'Uses a transparent scoring method',
            'Considers dependencies and risk',
            'Communicates the cut to stakeholders',
          ],
        },
        {
          q: 'Take-home: Ekart, Flipkart’s logistics arm, is thinking of entering the courier business. Evaluate the opportunity. (Asked at Flipkart, per AmbitionBox)',
          answer:
            'Treat it like a short consulting deck: the question, the answer on slide one, then the evidence.\n\nCover market size and growth (with sources), who already serves it, Ekart’s advantages (network, volume, tech) and gaps (pickup from individuals, pricing for one-off parcels), and the economics of a parcel.\n\nRecommend a first step, such as B2B courier for small online sellers in 10 cities, with the metrics and milestones that decide the next step. Keep it to the page limit.',
          lookFor: 'Answer first, sourced market numbers, honest gaps, and a concrete first step.',
          criteria: [
            'Puts the recommendation on page one',
            'Uses sourced market numbers',
            'Weighs advantages and gaps',
            'Proposes a first step with milestones',
          ],
          round: 'Take-home strategy assignment',
        },
      ],
    },
    {
      id: 'technical-ai',
      title: 'Technical and AI rounds',
      blurb:
        'You will not write production code, but you must talk to engineers as a peer. AI prototype rounds are starting to appear.',
      questions: [
        {
          q: 'Design the backend for a messaging system. (Asked at Google, per Glassdoor)',
          answer:
            'Keep it high level and talk through the flow. Clients send a message to an API server, which stores it and pushes it to the recipient through a persistent connection; if they are offline, a push notification goes out and the message waits.\n\nName the key choices: how messages are stored and ordered, how delivery and read receipts work, and how group chats fan out.\n\nThen talk trade-offs a PM cares about: latency, cost at scale, end-to-end encryption versus server-side features like search.',
          lookFor: 'A clear end-to-end flow, the main components, and product-relevant trade-offs.',
          criteria: [
            'Explains the send-to-receive flow',
            'Names storage, delivery and offline handling',
            'Discusses scale for group chats',
            'Links technical trade-offs to product choices',
          ],
          round: 'Onsite: technical',
          reportedAt: 'Jan 2026',
        },
        {
          q: 'Name one technical dilemma you had while working on a feature and how you decided to continue. (Asked at Microsoft, per Glassdoor)',
          answer:
            'Pick a real trade-off: build versus buy, a quick fix versus a rebuild, or accuracy versus speed.\n\nExplain the options in plain words, what engineering recommended, and the product factors you added: user impact, time to market, cost of being wrong.\n\nSay what you decided, how you made it reversible if possible, and what happened.',
          lookFor:
            'Understanding the technical options and adding product judgement to the decision.',
          criteria: [
            'Describes the options clearly',
            'Credits engineering’s view',
            'Adds user and business factors',
            'States the outcome',
          ],
          reportedAt: 'Oct 2026',
        },
        {
          q: '“Vibecoding” round: write a short spec, then build a working prototype from a rough brief using any tool. (Asked at Microsoft, per Glassdoor)',
          answer:
            'Spend the first minutes on the spec, not the tool: the user, the job to be done, the one flow you will build, and what “done” looks like.\n\nThen prompt an AI builder (Claude, Cursor, Lovable or v0) one screen at a time, test each step, and fix what breaks. Narrate your choices so the interviewer sees your judgement.\n\nAt the end, show the prototype, list what you cut, and say how you would test it with five users.',
          lookFor:
            'A clear spec first, steady iteration with the tool, and product judgement about scope.',
          criteria: [
            'Writes a short spec before building',
            'Builds one flow end to end',
            'Narrates choices and cuts',
            'Proposes how to test with users',
          ],
          round: 'Onsite: vibecoding',
          reportedAt: 'Oct 2026',
        },
        {
          q: 'Mini case: design an AI solution for a problem on our platform. (Asked at Meesho, per Glassdoor)',
          answer:
            'Start with the problem, not the model: for example, sellers writing poor product titles that hurt search.\n\nPropose the simplest AI that solves it: generate a title and attributes from the seller’s photo, which the seller approves. Explain the inputs, the output and where a human checks it.\n\nDefine evaluation before launch: a set of 200 listings rated for accuracy, a target error rate, and the cost per listing. Then the business metric: search clicks on listings that used the suggestion.',
          lookFor:
            'Problem first, the simplest AI approach, a human check, and an evaluation plan.',
          criteria: [
            'Starts from a user problem',
            'Chooses a simple, specific AI approach',
            'Includes human review',
            'Defines evaluation and cost before launch',
          ],
          round: 'Round 1: case study',
          reportedAt: 'Nov 2024',
        },
        {
          q: 'Write code to count the combinations of N numbers. (Asked at Google APM, per Glassdoor)',
          answer:
            'Some APM loops include a light coding question. Clarify: combinations of what size? If it is all subsets, the answer is 2 to the power N; if it is choosing k of N, it is N! / (k! (N−k)!).\n\nWrite a short function, compute it iteratively to avoid huge factorials, and test it on small cases you can check by hand (N = 3, k = 2 gives 3).\n\nIf you are rusty, say so and reason clearly; interviewers care about how you think through the problem.',
          lookFor: 'Clarifying the question, a correct approach, and testing on small cases.',
          criteria: [
            'Clarifies what is being counted',
            'Gives a correct formula or algorithm',
            'Tests on a small case',
          ],
          round: 'Onsite: technical',
          reportedAt: 'Mar 2026',
        },
      ],
    },
  ],
  plans: [
    {
      days: '7 days',
      title: 'Interview next week',
      tasks: [
        'Day 1: use their product for an hour and write down 10 points of friction.',
        'Day 2: write five stories (a launch, a conflict, a failure, a hard decision, a data dive) with numbers.',
        'Day 3: do 3 product sense questions out loud, 15 minutes each, using user → pain → solution → metric.',
        'Day 4: do 2 root-cause and 2 metrics questions; practise the data → internal → external → segment order.',
        'Day 5: do 2 guesstimates and 1 strategy question, maths aloud.',
        'Day 6: a full mock interview, then fix the weakest round.',
        'Day 7: prepare three questions, such as which metric this team is judged on this year.',
      ],
    },
    {
      days: '14 days',
      title: 'Build proof of work',
      tasks: [
        'Week 1: everything in the 7-day plan.',
        'Week 2: write a one-page teardown of their product and build a clickable prototype of your top idea with an AI tool.',
        'Send both with the five-line note to the hiring PM at your top 5 targets.',
        'Rewrite three resume bullets as shipped, metric moved, how you decided.',
      ],
    },
    {
      days: '30 days',
      title: 'Run a proper search',
      tasks: [
        'List 25 targets: APM programmes, scale-ups with open PM roles, and startups that raised in the last 6 months.',
        'For each: apply, message the hiring PM, follow up once after 5–6 days.',
        'One teardown or prototype a week; reuse the research.',
        'One product sense and one metrics question a day, out loud.',
        'Two mock interviews a week with a peer or an AI interviewer.',
      ],
    },
  ],
  resources: [
    {
      title: 'Good Product Manager / Bad Product Manager (Ben Horowitz)',
      url: 'https://a16z.com/good-product-manager-bad-product-manager/',
      kind: 'Essay',
      why: 'The classic short note on what strong PMs do. Key idea: a good PM knows the market, product and competition deeply and acts as “the CEO of the product”.',
      free: true,
    },
    {
      title: 'The definitive guide to product sense interviews (Lenny’s Newsletter)',
      url: 'https://www.lennysnewsletter.com/p/the-definitive-guide-to-mastering',
      kind: 'Guide',
      why: 'A complete product sense playbook. Key idea: you are scored on communication, motivation, segmentation, problem identification and solutions, in that order, so state your plan up front.',
      free: true,
    },
    {
      title: 'Product metric questions (IGotAnOffer)',
      url: 'https://next.igotanoffer.com/blogs/product-manager/product-metric-interview-questions',
      kind: 'Guide',
      why: 'Covers defining metrics and root-causing a metric change. Key idea: for a change, define it, explore causes in a structured way, then conclude.',
      free: true,
    },
    {
      title: 'PM estimation questions (IGotAnOffer)',
      url: 'https://app.igotanoffer.com/blogs/product-manager/estimation-interview-questions',
      kind: 'Guide',
      why: 'Market sizing and guesstimates. Key idea: confirm your structure with the interviewer before any numbers, round boldly, then sense-check.',
      free: true,
    },
    {
      title: 'Amazon Leadership Principles',
      url: 'https://www.amazon.jobs/content/en/our-workplace/leadership-principles',
      kind: 'Guide',
      why: 'The 16 principles Amazon behavioural rounds are built on. Key idea: map each of your five stories to two or three principles before the loop.',
      free: true,
    },
    {
      title: 'Amazon PM interview prep (official)',
      url: 'https://amazon.jobs/content/en/how-we-hire/product-manager-interview-prep',
      kind: 'Guide',
      why: 'Amazon’s own description of the PM loop, including the writing exercise. Key idea: practise a one-page written narrative, not just spoken answers.',
      free: true,
    },
    {
      title: 'Google APM programme guide (Aakash Gupta)',
      url: 'https://www.aakashg.com/google-apm-program/',
      kind: 'Guide',
      why: 'How the original APM programme hires: about 45 new graduates a class, usually with a technical background. Key idea: show initiative you took on your own.',
      free: true,
    },
    {
      title: '12 essential PM skills (Reforge)',
      url: 'https://www.reforge.com/blog/product-manager-skills',
      kind: 'Guide',
      why: 'Ravi Mehta’s PM competency model. Key idea: you do not need all 12; know your gaps and show the skills this role needs most.',
      free: true,
    },
    {
      title: 'Building effective agents (Anthropic)',
      url: 'https://www.anthropic.com/research/building-effective-agents',
      kind: 'Guide',
      why: 'The reference for scoping AI features. Key idea: start with the simplest solution and add agents only when simpler workflows fail.',
      free: true,
    },
    {
      title: 'Prompt engineering overview (Claude docs)',
      url: 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview',
      kind: 'Guide',
      why: 'Treat a prompt like a product spec. Key idea: define success criteria and a way to test them before you write the prompt.',
      free: true,
    },
    {
      title: 'A practical guide to building agents (OpenAI)',
      url: 'https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf',
      kind: 'Guide',
      why: 'When an agent is worth building, and its parts: model, tools, instructions, guardrails. Key idea: use agents only where rule-based automation struggles.',
      free: true,
    },
    {
      title: 'Agents vs chains (n8n docs)',
      url: 'https://docs.n8n.io/build/integrate-ai/understand-ai-components/agents-vs-chains',
      kind: 'Tool',
      why: 'A no-code way for PMs to automate their own workflows. Key idea: chains run fixed steps; agents decide what to do and use tools.',
      free: true,
    },
    {
      title: 'AI evals FAQ (Hamel Husain and Shreya Shankar)',
      url: 'https://hamel.dev/blog/posts/evals-faq/',
      kind: 'Guide',
      why: 'The most practical guide to evaluating AI features. Key idea: read real outputs to find failure modes before you build automated evaluators.',
      free: true,
    },
    {
      title: 'AI Product Manager hub',
      url: '/aipm',
      kind: 'Our guide',
      why: 'If the role is AI-heavy, prepare for evals, model choice and cost questions as well.',
      free: true,
    },
  ],
  related: [
    { label: 'AI Product Manager hub', href: '/aipm' },
    { label: 'Strategy & Operations hub', href: '/strategy-and-operations' },
    { label: 'Data Analyst hub', href: '/data-analyst' },
    { label: 'In-hand salary calculator', href: '/salary-calculator' },
  ],
  faqs: [
    {
      q: 'What does a Product Manager do?',
      a: 'They decide what a team builds next and make sure it works: find the user problem, choose the metric, write the spec, and ship with engineering and design. They lead without managing the engineers.',
    },
    {
      q: 'What is the Product Manager salary in India?',
      a: 'Across 11 India job posts we opened in November 2026, posted pay ran from ₹6–10 LPA for an Associate PM to ₹50–80 LPA for a senior PM, with a median midpoint of ₹19.5 LPA. Levels.fyi’s India median total compensation, which leans to Big Tech, is ₹45.2 LPA.',
    },
    {
      q: 'Can a fresher become a Product Manager?',
      a: 'Yes, through APM programmes (Google started the first in 2002; Flipkart runs a two-year programme in India) or APM roles at startups. Freshers who get in usually show a teardown, a prototype or a product they built themselves.',
    },
    {
      q: 'What are the rounds in a PM interview?',
      a: 'Usually product sense, metrics or root-cause analysis, estimation, strategy, execution and behavioural, plus a technical round at Google and Microsoft. Indian companies often add a take-home deck; Amazon adds a writing exercise.',
    },
    {
      q: 'Do PMs need to code?',
      a: 'Not in production, but you need to discuss technical trade-offs. Some loops now ask you to build a prototype with AI tools; a Microsoft candidate reported a “vibecoding” round in October 2026.',
    },
    {
      q: 'What is the difference between a PM and an AI PM?',
      a: 'An AI PM owns products built on models, so evals, model cost and safety are part of the job. Many PMs now ship AI features too, which is why basic AI skills appear in general PM loops.',
    },
  ],
}

export default productManager
