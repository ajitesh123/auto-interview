import type { RoleHub } from './types'

// Founder's Office role hub. Sources opened on 2026-11-04:
// - Apollo.io people search (free), title starts in the last 670 days, by country and company size
// - Weekday.works Founder's Office job listings with posted pay (https://www.weekday.works/jobs/founders-office-jobs)
// - Y Combinator job post, Weekday Founder's Office (https://www.ycombinator.com/companies/weekday/jobs/cQZdv5Q-founder-s-office)
// - Glassdoor India Founder's Office interview questions (https://www.glassdoor.co.in/Interview/founders-office-interview-questions-SRCH_KO0,15.htm)
// - Levels.fyi Chief of Staff, San Francisco (https://www.levels.fyi/t/chief-of-staff/locations/san-francisco-usa)
// - Hacking the Case Interview, chief of staff case formats (https://www.hackingthecaseinterview.com/pages/chief-of-staff-case-interview)

const foundersOffice: RoleHub = {
  slug: 'founders-office',
  visuals: {
    hero: {
      mp4: '/static/images/roles/founders-office/hero.mp4',
      image: '/static/images/roles/founders-office/hero.webp',
      alt: "Founder's Office role hub: 25 interview questions, real posted pay in rupees, and who is hiring",
    },
    pay: {
      image: '/static/images/roles/founders-office/pay.webp',
      alt: "Most Founder's Office roles asking for 2+ years advertise ₹20–40 LPA; a new-grad YC posting offers ₹12–15 LPA plus ESOPs (job posts, Nov 2026)",
    },
    hiring: {
      image: '/static/images/roles/founders-office/hiring.webp',
      alt: "3,611 people in India started a Founder's Office title since January 2025; 2,205 of them joined companies with 50 people or fewer (Apollo.io, Nov 4, 2026)",
    },
    og: '/static/images/roles/founders-office/og.jpg',
  },
  roleName: "Founder's Office",
  shortName: "Founder's Office",
  metaTitle: "Founder's Office Interview Guide 2026: Questions, Assignments & Pay",
  metaDescription:
    "How to get a Founder's Office job: what the role really is, the take-home assignment, 25 interview questions with model answers, real posted pay in India and who is hiring.",
  keywords: [
    "founder's office",
    'founders office role',
    'founders office interview questions',
    'founders office salary india',
    'founders office associate',
    'founders office jobs for freshers',
    'how to get into founders office',
    'founders office assignment',
  ],
  heroTitle: "Founder's Office interview prep",
  heroDescription:
    "The generalist role that puts you next to a startup's founder. What you will actually do, how the take-home assignment works, 25 questions with model answers, and pay from real job posts.",
  directAnswer:
    "A Founder's Office role is a generalist job working directly with a startup's founder on whatever matters most this quarter: a new city launch, a pricing test, an investor update, a broken process no one owns. In India it is mostly a small-startup job: of 3,611 people who started the title since January 2025, 2,205 joined companies with 50 people or fewer. Most hiring loops are a founder call, a take-home assignment and a deep-dive on your answer.",
  lastUpdated: '2026-11-04',
  story: {
    summary:
      'Founder’s Office is an Indian startup title for a generalist who works directly with the founder. It spread with India’s startup boom, which peaked in 2021 with $41.4 billion raised and 42 new unicorns, and it is now seen as a “live MBA” for future founders and investors.',
    born: { when: '2021 boom', what: '$41.4B raised and 42 unicorns in India' },
    rise: { when: '2025', what: '3,611 new Founder’s Office hires in India' },
    milestones: [
      {
        when: '2021',
        title: 'India’s funding peak',
        detail:
          'Indian startups raised more than $41.4 billion across 1,579 deals and minted 42 unicorns. Fast-growing startups needed generalists who could run anything.',
        sourceLabel: 'Inc42 (Dec 30, 2021)',
        sourceUrl:
          'https://inc42.com/features/42-unicorns-41-4-bn-funding-blockbuster-2021-for-indian-startups',
      },
      {
        when: 'Jan 2025 → now',
        title: '3,611 people take the title',
        detail:
          '3,611 people in India started a Founder’s Office title since January 2025. 61% joined companies with 50 people or fewer.',
        sourceLabel: 'Our count (Apollo people search)',
        sourceUrl: '#hiring',
      },
      {
        when: 'Jul 2025',
        title: 'Called a “live MBA”',
        detail:
          'Outlook Business profiled the role. One alum put it this way: “You do real things with real people and real money.”',
        sourceLabel: 'Outlook Business (Jul 30, 2025)',
        sourceUrl:
          'https://www.outlookbusiness.com/news/power-chaos-career-why-everyone-wants-a-gig-in-the-startup-founders-office',
      },
    ],
    why: [
      'You work next to the person making the decisions, so you learn faster than in a fixed-scope role.',
      'It is a launchpad: alumni move into product, strategy, venture capital or their own startup.',
      'Founders of small startups need flexible help more than another specialist.',
    ],
  },
  aiAngle:
    'Founders expect you to do the work of three people with AI. Show that you can research a market, build a model and draft a deck with AI, and automate one recurring report with n8n.',
  mustKnow:
    'Founders hire for judgement and speed. Your take-home should show how you prioritised, what you chose not to do, and a clear recommendation, not just analysis.',
  whatTheRoleIs: [
    "You are the founder's extra pair of hands and an extra brain. The work changes every few weeks: one month you size a new market, the next you fix why customers drop off, then you build the board deck. One YC startup's posting splits the job as 40% operations, 20% product, 20% sales, 10% coding and 10% data analysis.",
    "It is overwhelmingly a startup job. Of the 3,611 people in India who started a Founder's Office title since January 2025, 61% joined companies with 50 people or fewer and only 5% joined companies with more than 1,000. Even big names hire very few: Razorpay 3, Cars24 2, PhysicsWallah 1 in the same period.",
    'The trade-off is clear. You get breadth, speed and direct access to decision-makers. You give up structure and a fixed scope, and part of the job is unglamorous: chasing updates, cleaning data, writing notes. Ask in your interview what the last person in the role actually shipped.',
  ],
  expectationLabels: {
    nav: 'Startup vs scale-up',
    title: 'What founders expect: early startup vs scale-up',
    sub: 'Most openings are at companies under 50 people. Read that column first.',
    a: 'Early startup',
    b: 'Scale-up',
    aNote: 'Most roles today',
    differenceTitle: 'How it differs from consulting, product and chief of staff roles',
  },
  expectations: {
    b2b: {
      headline: 'Early startup (under 50 people): do whatever the company needs next',
      points: [
        'Run projects that have no owner yet: a first sales playbook, a vendor switch, a hiring sprint for the first five reps.',
        'Do the analysis behind decisions: market sizing, competitor teardowns, pricing tests, unit economics.',
        'Prepare investor updates and board material, and keep the numbers in them honest.',
        'Step into gaps for a few weeks at a time: support, operations, sometimes sales calls.',
        'Write a lot: one-page memos, meeting notes, weekly updates to the founder.',
        'Build simple systems: trackers, dashboards and checklists so the founder stops being the bottleneck.',
      ],
      metrics: [
        'Projects shipped per quarter',
        'Revenue or cost impact of your projects',
        'Founder hours saved',
        'Speed from decision to execution',
        'Quality of the numbers in investor updates',
      ],
    },
    b2c: {
      headline: 'Scale-up (200+ people): run strategy projects across teams',
      points: [
        'Own two or three company-level initiatives at a time, such as a new category, a cost programme or a new city.',
        'Coordinate across teams you do not manage: weekly reviews, owners, deadlines, escalation.',
        'Prepare the leadership team’s planning: OKRs, quarterly business reviews, board decks.',
        'Expect a more formal loop: a case or guesstimate round, an assignment with a presentation, then leadership interviews.',
        'The title is often Founder’s Office, Strategy & Operations or Business Finance & Strategy. Read the job description, not the title.',
      ],
      metrics: [
        'Initiative milestones hit on time',
        'Impact on the company’s top OKR',
        'Quality of planning and review cadence',
        'Decisions unblocked',
      ],
    },
    difference: [
      'Versus consulting: you recommend and then execute the plan yourself, with live data and real constraints.',
      'Versus product management: you own business problems across functions, not one product area.',
      'Versus chief of staff: a chief of staff usually manages the leader’s operating rhythm at a larger company; Founder’s Office is more hands-on and project-based.',
      'Versus a strategy analyst: there is no fixed scope; priorities change with the founder’s focus.',
      'The best exits: early product manager, business or category head, chief of staff, or your own startup.',
    ],
  },
  skills: [
    {
      area: 'Problem solving',
      items: [
        'Break a vague goal into a clear question',
        'Market sizing and guesstimates',
        'Unit economics: CAC, payback, contribution margin',
        'Prioritise many projects against one goal',
      ],
    },
    {
      area: 'Execution',
      items: [
        'Run projects across teams you do not manage',
        'Build trackers, dashboards and simple automations',
        'Follow up without being told twice',
        'Ship a rough first version fast, then improve it',
      ],
    },
    {
      area: 'Communication',
      items: [
        'Write one-page memos that lead with the answer',
        'Build a board or investor update',
        'Disagree with a founder clearly and respectfully',
        'Keep confidential information confidential',
      ],
    },
    {
      area: 'Tools',
      items: [
        'Excel or Google Sheets (pivots, lookups, simple models)',
        'Basic SQL, or a BI tool such as Metabase',
        'Notion or similar for docs and trackers',
        'AI assistants for research and first drafts',
      ],
    },
  ],
  process: [
    {
      companyType: 'Early startup (most common)',
      rounds: [
        'Founder or co-founder call: your story, why this company, why a generalist role',
        'Take-home assignment due within a few days: a real problem the company faces',
        'Deep-dive on your assignment with the founder: they push on assumptions',
        'Culture conversation with the team, sometimes a short trial project',
      ],
    },
    {
      companyType: 'YC-style tech startup',
      rounds: [
        'Small take-home assignment you can start straight away',
        'Interview with a senior leader such as the CPO or COO',
        'Interview with the CEO',
      ],
    },
    {
      companyType: 'Scale-up (200+ people)',
      rounds: [
        'Recruiter or HR screen',
        'Live case or guesstimate round',
        'Assignment with a presentation to leadership',
        'CXO interview, then HR and references',
      ],
    },
  ],
  pay: {
    title: 'Pay from real job posts: India, plus the US equivalent',
    headline: 'India ₹20–40 LPA posted (2+ yrs)',
    intro:
      "No salary site publishes a reliable Founder's Office figure for India yet, so we read live job posts that state pay. Ranges are wide because the title covers freshers and people with 8+ years. Most posts asking for 2+ years sit around ₹20–40 LPA.",
    tables: [
      {
        region: 'India (posted ranges)',
        currency: 'INR (₹, lakh per annum, fixed pay as posted)',
        rows: [
          { band: 'New grad, YC startup', experience: '0–1 yr', value: '₹12–15 LPA + ESOPs' },
          { band: 'Non-tech company', experience: '1–5 yrs', value: '₹7.2–9.6 LPA' },
          { band: 'Startup, remote', experience: '2–4 yrs', value: '₹10–30 LPA' },
          { band: 'Startup, remote', experience: '2–5 yrs', value: '₹20–35 LPA' },
          { band: 'Startup, Delhi', experience: '2–6 yrs', value: '₹30–80 LPA' },
          { band: 'Strategy & insights', experience: '2–4 yrs', value: '₹30–40 LPA' },
          { band: 'Startup', experience: '3–7 yrs', value: '₹15–50 LPA' },
          { band: 'Startup', experience: '3–8 yrs', value: '₹20–60 LPA' },
          { band: 'Startup', experience: '4–7 yrs', value: '₹20–40 LPA' },
          { band: 'Startup, Delhi', experience: '5–10 yrs', value: '₹20–35 LPA' },
        ],
        note: 'Each row is one live job post with stated pay; posts without pay were left out. The new-grad row is a Y Combinator job post by Weekday (Bengaluru), which asks for coding skills.',
        sourceLabel: 'Weekday.works and Y Combinator job posts',
        sourceUrl: 'https://www.weekday.works/jobs/founders-office-jobs',
        asOf: 'Nov 4, 2026',
      },
      {
        region: 'US: Chief of Staff (closest US title)',
        tab: 'US · Chief of Staff',
        currency: 'USD (total compensation per year)',
        rows: [
          { band: '25th percentile', experience: 'San Francisco', value: '$200K' },
          { band: 'Median', experience: 'San Francisco', value: '$240K' },
          { band: '75th percentile', experience: 'San Francisco', value: '$375K' },
          { band: '90th percentile', experience: 'San Francisco', value: '$455K' },
        ],
        note: 'US startups rarely use the Founder’s Office title; Chief of Staff or BizOps is the closest match. Based on 14 salaries.',
        sourceLabel: 'Levels.fyi',
        sourceUrl: 'https://www.levels.fyi/t/chief-of-staff/locations/san-francisco-usa',
        asOf: 'Nov 4, 2026',
      },
    ],
    crossCheck:
      'Equity matters more here than in most roles: early-stage posts often add ESOPs. Ask for the number of options, the strike price and the vesting schedule, not just a percentage.',
  },
  hiring: {
    title: 'Where new Founder’s Office hires went, 2025–26',
    segments: true,
    intro:
      'In India, 3,611 people started a Founder’s Office title since January 2025. Most went to small startups, so a list of big-company names would mislead you. The smart move is to target funded startups with 15–150 people.',
    companies: [
      { name: '50 people or fewer', count: 2205, segment: 'Mostly seed to Series A' },
      { name: '51–200 people', count: 758, segment: 'Series A to C' },
      { name: '201–1,000 people', count: 477, segment: 'Scale-ups' },
      { name: 'Over 1,000 people', count: 168, segment: 'Large companies' },
    ],
    method:
      'Counted in Apollo.io: people in India whose current title is Founder’s Office or Founder’s Office Associate and who started it in the last 670 days, split by employer headcount',
    sourceLabel: 'Apollo.io people data',
    asOf: 'Nov 4, 2026',
  },
  questionGroups: [
    {
      id: 'fit',
      title: 'Motivation and fit',
      blurb: 'Founders test whether you want the job or just the title. Be specific.',
      questions: [
        {
          q: 'Why do you want a Founder’s Office role?',
          answer:
            'Tie it to something you have already done. "In college I ran our fest sponsorships end to end: pitching, contracts and delivery. I liked owning the whole problem more than any one function."\n\nThen say what you want to learn: how a founder makes decisions with incomplete data.\n\nClose with intent: "In two or three years I want to own a business line, and this is the fastest way to earn that."',
          lookFor:
            'Proof you already act like a generalist, and a realistic view of the grunt work.',
        },
        {
          q: 'Why our company, and why now?',
          answer:
            'Show you did the homework in three short beats.\n\nWhat they do and who pays, in one line. One thing you noticed, such as a product gap or a pricing page that hides the price. Why this stage excites you: "You just raised, so the next 12 months decide the playbook."\n\nIf you can, bring one concrete idea you would work on in month one.',
          lookFor: 'Real research, an opinion, and a link between their stage and your skills.',
        },
        {
          q: 'Tell me about yourself.',
          answer:
            'Keep it to 60–90 seconds and make it a story of ownership, not a list of jobs.\n\nUse three beats: where you started, the biggest thing you built or fixed (with a number), and why that leads here.\n\nEnd with one sentence on what you would bring in the first 90 days.',
          lookFor: 'Clarity, brevity and a thread of initiative.',
        },
        {
          q: 'How has it been working as a generalist? (Asked at BimaKavach, per Glassdoor)',
          answer:
            'Be honest about the trade-off.\n\n"The upside is speed: I learned sales, ops and data in one year. The hard part is context-switching, so I keep a single priority list the founder signs off each Monday."\n\nGive one example where switching hats helped, such as using a customer-support insight to fix the onboarding flow.',
          lookFor: 'Self-awareness and a system for handling chaos.',
        },
        {
          q: 'Can you handle strategy, sales and operations at the same time? (Asked at Bharat Skool, per Glassdoor)',
          answer:
            'Say yes, then show how.\n\n"Yes, with clear priorities. I would agree with you on the one outcome that matters this month, time-box the rest, and tell you early when something has to drop."\n\nA short example of juggling two workstreams and what you deliberately let slip makes this credible.',
          lookFor: 'Prioritisation, not a promise to do everything.',
        },
        {
          q: 'Where do you see yourself in two or three years?',
          answer:
            'Founders like ambition that fits the company.\n\nPick a path: an early PM, the owner of a business line, or one day a founder. Explain how this role builds that skill.\n\nAvoid "doing an MBA in a year". It signals you will leave before the hard part.',
          lookFor: 'Ambition that grows with the company.',
        },
      ],
    },
    {
      id: 'cases',
      title: 'Cases, guesstimates and assignments',
      blurb: 'The core of the loop. Structure first, then numbers, then a clear recommendation.',
      questions: [
        {
          q: 'Should we launch in tier-2 cities next quarter?',
          answer:
            'Start by clarifying the goal: growth, cheaper customers, or defending against a competitor?\n\nThen use three buckets. Demand: is there search, inbound or waitlist data from those cities? Ability to win: can delivery and support work there, and at what cost? Economics: expected CAC, order value and payback compared with the metros.\n\nRecommend a test, not a big bang: "Pilot two cities for eight weeks with a payback target of under six months. Expand only if the pilot hits it."',
          lookFor: 'A clear goal, a test-first mindset and a decision rule.',
        },
        {
          q: 'Our 7-day retention dropped 15% last month. What do you do?',
          answer:
            'First check the data: did tracking, the definition or the mix of new users change?\n\nThen segment: by acquisition channel, platform, city and cohort week. A drop is usually concentrated in one segment.\n\nThen look for a cause in that segment, such as a release, a price change or a new ad campaign bringing in a different kind of user.\n\nFinish with the fix and the check: "If it is the new paid channel, pause it and compare retention for organic users only."',
          lookFor: 'Validating the data before theorising, then segmenting.',
        },
        {
          q: 'Make a competitive analysis of us and our competitors. (A take-home reported on Glassdoor)',
          answer:
            'Don’t stop at a feature table. Compare 4–5 competitors on who they target, price, channel, product depth and what users complain about (app store reviews are gold).\n\nEnd with the "so what": where they are weak and we can win, and the one move you would make next.\n\nKeep it to two or three pages, and lead with the recommendation.',
          lookFor: 'Insight over volume. A clear "so what".',
        },
        {
          q: 'Estimate the monthly revenue of a cafe chain with 20 outlets.',
          answer:
            'State your assumptions out loud and keep the numbers round.\n\nSay each outlet serves 300 orders a day at an average of ₹250. That is ₹75,000 a day, or about ₹22.5 lakh a month per outlet. Twenty outlets gives about ₹4.5 crore a month.\n\nThen sanity-check it (are weekends busier? are some outlets in malls?) and say which assumption you would verify first.',
          lookFor: 'Structure, clean arithmetic and a sanity check.',
        },
        {
          q: 'We spend ₹800 to acquire a customer. The average order is ₹600 at a 40% contribution margin. Is that healthy?',
          answer:
            'Each order makes ₹240 in contribution (40% of ₹600).\n\nAt one order, we lose ₹560 per customer. We break even at about 3.3 orders, so the real question is repeat rate: what share of customers place 4+ orders, and how fast?\n\nIf most customers order fewer than 3 times in six months, cut CAC or lift order value first, for example with bundles.',
          lookFor: 'Comfort with unit economics, and asking for the missing variable.',
        },
        {
          q: 'EV, hybrid or petrol: which will dominate in ten years, and why? (Asked at Sukhbir Agro Energy, per Glassdoor)',
          answer:
            'There is no right answer, so they are testing structure and conviction.\n\nPick a segment (two-wheelers, cars or trucks), because the answer differs by segment. Then compare cost of ownership, charging infrastructure, policy and battery prices.\n\nCommit: "For two-wheelers in cities, EVs win on running cost. For trucks, petrol and hybrid stay longer because of range."',
          lookFor: 'Segmenting the problem and taking a clear stance.',
        },
        {
          q: 'Why are manholes round? (Asked at AltiusHub, per Glassdoor)',
          answer:
            'This is a lateral-thinking check, so reason aloud.\n\nA round cover cannot fall through its own opening, whereas a square one can drop in along its diagonal. A round cover is also easy to roll and needs no lining up when you put it back.\n\nThen move on. Don’t over-invest in brainteasers.',
          lookFor: 'Calm, out-loud reasoning.',
        },
        {
          q: 'The founder gives you five projects. You can do two this quarter. How do you choose?',
          answer:
            'Anchor on the company’s one goal for the quarter, such as revenue or runway.\n\nScore each project on impact on that goal, effort, and reversibility. Pick the two highest impact-to-effort projects, and say clearly what you are NOT doing and why.\n\nAgree on it with the founder in writing so priorities don’t drift.',
          lookFor: 'A goal-first framework and the courage to say no.',
        },
      ],
    },
    {
      id: 'execution',
      title: 'Execution and operations',
      blurb: 'Can you make things happen without authority?',
      questions: [
        {
          q: 'A project involves three teams and nobody owns it. How do you run it?',
          answer:
            'Write a one-page brief: the goal, a definition of done, the owner of each piece and the dates.\n\nGet each team lead to agree to their piece. Then run a 15-minute weekly check-in and send a written update after each one.\n\nEscalate early, with options: "Ops is two weeks late. We can cut scope or add a contractor. My recommendation is to cut scope."',
          lookFor: 'Structure, written follow-up, and escalating with options.',
        },
        {
          q: 'Walk me through how you would prepare our monthly investor update.',
          answer:
            'Use a fixed structure every month: headline numbers versus plan, wins, misses and what we learned, priorities for next month, and asks (intros, hires, advice).\n\nPull numbers from one source of truth and reconcile them with finance before sending.\n\nKeep it short and honest. Investors trust founders who report bad months clearly.',
          lookFor: 'Accuracy and consistency.',
        },
        {
          q: 'Tell me about a process you built from scratch.',
          answer:
            'Use STAR, and make the before and after measurable.\n\n"Refund requests took four days and lived in WhatsApp. I set up a form, a tracker and a rule for who approves what. Average time fell to one day within a month, and the founder stopped getting pinged."',
          lookFor: 'Ownership and a measurable result.',
        },
        {
          q: 'We need to hire five sales reps in 30 days. What is your plan?',
          answer:
            'Work backwards from the date. To hire five, you probably need about 15 final interviews, about 50 screens and about 200 applicants. Check those ratios against any past hiring data.\n\nWrite a clear job post, use referrals and two job boards, and set a fixed weekly interview slot for the hiring manager.\n\nTrack the funnel daily and fix the narrowest stage first.',
          lookFor: 'Funnel thinking and a plan you can execute.',
        },
        {
          q: 'The founder changes priorities every week. What do you do?',
          answer:
            'Don’t complain; make the cost visible.\n\nKeep one shared priority list. When something new comes in, ask: "To start this, which of these three do we pause?"\n\nMost founders welcome this, because it protects their own focus.',
          lookFor: 'Managing up with a system, not with frustration.',
        },
        {
          q: 'How would you cut our monthly costs by 20% without hurting growth?',
          answer:
            'Start by listing spend by category, from biggest to smallest. The top five lines usually make up most of the spend.\n\nRank savings by size and by risk to growth: unused software seats, renegotiating vendors, and pausing paid channels with poor payback come first. Hiring freezes and cuts to the product team come last.\n\nPropose the plan in tiers and say what you would watch to make sure growth holds.',
          lookFor: 'Prioritising by impact and protecting what drives growth.',
        },
      ],
    },
    {
      id: 'behavioural',
      title: 'Behavioural',
      blurb: 'Short STAR stories with numbers. Prepare six and reuse them.',
      questions: [
        {
          q: 'Tell me about a time you started something without being asked.',
          answer:
            'This is the most important question for this role. Pick a real example: a club, a side project, a fix at work.\n\nGive the situation in one line, then what YOU did, then the result with a number. End with what you would do differently.',
          lookFor: 'Proof of agency. Founders hire people who start things.',
        },
        {
          q: 'Tell me about a time you disagreed with a senior person.',
          answer:
            'Show respect and spine together.\n\n"I disagreed with my manager on launching without a pilot. I shared the data privately, proposed a two-week pilot, and we agreed on a decision rule. The pilot found a pricing issue that saved us a bad launch."',
          lookFor: 'Disagreeing with data, privately and constructively.',
        },
        {
          q: 'Tell me about a failure.',
          answer:
            'Pick a real one with stakes, not a humblebrag.\n\nSay what went wrong, what part was your fault, and what you changed afterwards. Then give one example where the change worked.',
          lookFor: 'Honesty and learning.',
        },
        {
          q: 'You will see confidential information about fundraising and people. How do you handle it?',
          answer:
            'Be simple and firm. "Need-to-know only. I don’t discuss it with friends or colleagues, I keep documents access-controlled, and if I am unsure, I ask the founder."\n\nIf you have handled sensitive data before, mention it in one line.',
          lookFor: 'Discretion. This is non-negotiable for the role.',
        },
        {
          q: 'Describe a time you had to work with very little information.',
          answer:
            'Show how you reduce ambiguity fast.\n\nSay what you assumed, how you tested the assumption cheaply (a call, a quick survey, a small experiment), and how the answer changed your plan.',
          lookFor: 'Comfort with ambiguity and bias to action.',
        },
      ],
    },
  ],
  plans: [
    {
      days: '7 days',
      title: 'Interview next week',
      tasks: [
        'Day 1: study the company. Product, pricing, last funding round, and three things users complain about.',
        'Day 2: write your 90-second story and six STAR stories with numbers.',
        'Day 3: practise unit economics (CAC, payback, contribution margin) with the cafe and ₹800 CAC examples above.',
        'Day 4: do one full take-home in 4 hours. Use the competitive-analysis prompt and write two pages.',
        'Day 5: practise 3 guesstimates out loud, with a timer.',
        'Day 6: do a mock interview and record yourself.',
        'Day 7: prepare three questions for the founder, such as what the last person in the role shipped.',
      ],
    },
    {
      days: '14 days',
      title: 'Build proof of work',
      tasks: [
        'Week 1: do everything in the 7-day plan.',
        'Week 2: write a one-page teardown memo for your target company: one problem, the evidence, and your fix.',
        'Send it to the founder with a three-line note offering to work on that problem as a trial.',
        'Add one measurable "started without being asked" bullet to your resume.',
      ],
    },
    {
      days: '30 days',
      title: 'Run a proper search',
      tasks: [
        'List 25–30 funded startups with 15–150 people (seed to Series B).',
        'For each one: apply, email the founder, connect on LinkedIn, and follow up on day 6.',
        'Do two take-homes or teardown memos a week, and reuse your research.',
        'Practise one case and one behavioural question a day.',
        'Track replies in a spreadsheet and double down on the pitch that gets responses.',
      ],
    },
  ],
  resources: [
    {
      title: 'Founder’s Office interview questions on Glassdoor',
      url: 'https://www.glassdoor.co.in/Interview/founders-office-interview-questions-SRCH_KO0,15.htm',
      kind: 'Guide',
      why: 'Real questions reported by candidates at Indian startups.',
      free: true,
    },
    {
      title: 'Founder’s Office jobs with posted pay (Weekday)',
      url: 'https://www.weekday.works/jobs/founders-office-jobs',
      kind: 'Tool',
      why: 'Live listings, many with salary ranges and experience bands.',
      free: true,
    },
    {
      title: 'Chief of staff case interview formats',
      url: 'https://www.hackingthecaseinterview.com/pages/chief-of-staff-case-interview',
      kind: 'Guide',
      why: 'Take-home, role-play and scenario formats. Very close to Founder’s Office loops.',
      free: true,
    },
    {
      title: 'McKinsey practice cases',
      url: 'https://www.mckinsey.com/careers/interviewing/en',
      kind: 'Guide',
      why: 'The best free practice for structuring a messy business problem.',
      free: true,
    },
    {
      title: 'Damodaran Online: valuation and corporate finance',
      url: 'https://pages.stern.nyu.edu/~adamodar/New_Home_Page/home.htm',
      kind: 'Course',
      why: 'Free classes and spreadsheets for when the founder asks about runway, valuation or fundraising.',
      free: true,
    },
    {
      title: 'Free interview prep library',
      url: '/free-resources',
      kind: 'Our guide',
      why: 'Casebooks, resume templates and behavioural prep, every link checked by hand.',
      free: true,
    },
  ],
  related: [
    { label: 'AI Product Manager hub', href: '/aipm' },
    { label: 'GTM Engineer hub', href: '/gtm-engineer' },
    { label: 'Growth Manager hub', href: '/growth' },
    { label: 'Build your resume', href: '/build-resume' },
  ],
  faqs: [
    {
      q: 'What does a Founder’s Office associate do?',
      a: 'They work directly with the founder on the company’s top priorities: special projects, analysis for decisions, cross-team execution and investor material. The scope changes every few weeks.',
    },
    {
      q: 'Can a fresher get a Founder’s Office job?',
      a: 'Yes. Some startups hire new grads, for example a YC company in Bengaluru advertising ₹12–15 LPA plus ESOPs. Freshers win with proof of work: a teardown memo or a trial project beats a long resume.',
    },
    {
      q: 'What is the salary for Founder’s Office in India?',
      a: 'Posted pay varies widely. Live posts we checked in November 2026 ranged from ₹7.2–9.6 LPA at a non-tech company to ₹30–80 LPA for 2–6 years at a Delhi startup. Most posts asking for 2+ years sit around ₹20–40 LPA.',
    },
    {
      q: 'Do I need an MBA for a Founder’s Office role?',
      a: 'No. Startups care more about evidence that you take initiative, write clearly and handle numbers. Some scale-ups do prefer MBA or consulting backgrounds for senior roles.',
    },
    {
      q: 'What is the Founder’s Office take-home assignment like?',
      a: 'Usually a real problem the company faces, such as a competitive analysis, a launch plan or a retention diagnosis, due within a few days. Lead with your recommendation, keep it to a few pages, and expect the founder to challenge your assumptions.',
    },
  ],
}

export default foundersOffice
