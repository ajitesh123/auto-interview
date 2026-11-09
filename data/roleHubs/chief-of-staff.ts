import type { RoleHub } from './types'

// Chief of Staff role hub. Sources opened on 2026-11-04:
// - Apollo.io people search (free): current title "Chief of Staff", started in the last 670 days,
//   by country and employer size; tech employers only (NAICS 5415, 5112, 5132, 5182, 5191)
// - Levels.fyi Chief of Staff, United States (https://www.levels.fyi/t/chief-of-staff?from=jf-loc)
// - AmbitionBox "Chief Staff" salary, India (https://ambitionbox.com/profile/chief-staff-salary)
// - Job posts with stated pay: Wellfound (Spenza, Twenty20Systems), Cutshort (CodeRound AI), Weekday
// - Glassdoor interview reviews (Foxtale, Impact Guru, Stupa, The/Studio, Flink, Sagetap, Rokt)
// - Hacking the Case Interview: chief of staff case formats
// - Bain Capital Ventures: the four Chief of Staff archetypes
// - Google re:Work OKR guide; Amazon 2017 shareholder letter (six-page memos)

const chiefOfStaff: RoleHub = {
  slug: 'chief-of-staff',
  visuals: {
    hero: {
      mp4: '/static/images/roles/chief-of-staff/hero.mp4',
      image: '/static/images/roles/chief-of-staff/hero.webp',
      alt: 'Chief of Staff role hub: 25 interview questions, real pay in India and the US, and who hires',
    },
    pay: {
      image: '/static/images/roles/chief-of-staff/pay.webp',
      alt: 'Median US Chief of Staff pay is $180K total compensation (Levels.fyi, 52 salaries); India startup posts for 2–5 years advertise ₹15–30 LPA',
    },
    hiring: {
      image: '/static/images/roles/chief-of-staff/hiring.webp',
      alt: 'New Chief of Staff hires in Indian tech by company size: 146 at 50 people or fewer, 98 at 51–200, 94 at 201–1,000 and 119 at over 1,000 (Apollo.io, Nov 4, 2026)',
    },
    og: '/static/images/roles/chief-of-staff/og.jpg',
  },
  roleName: 'Chief of Staff',
  shortName: 'Chief of Staff',
  metaTitle: 'Chief of Staff Interview Guide 2026: Questions, Cases & Salary',
  metaDescription:
    'How to become a Chief of Staff: what the job is at startups vs large companies, 25 interview questions with model answers, the case and take-home, salary in India and the US, and who is hiring.',
  keywords: [
    'chief of staff',
    'chief of staff interview questions',
    'chief of staff salary india',
    'chief of staff salary',
    'how to become a chief of staff',
    'chief of staff case study interview',
    'chief of staff vs founders office',
    'chief of staff jobs india',
  ],
  heroTitle: 'Chief of Staff interview prep',
  heroDescription:
    'The job that runs a leader’s operating rhythm and their hardest projects. What it looks like at a startup versus a large company, the case round, 25 questions with model answers, and pay you can check.',
  directAnswer:
    'A Chief of Staff is a senior generalist who multiplies one leader: they run the leadership rhythm (goals, weekly reviews, board prep) and take the cross-team projects nobody else owns. In Indian tech it is not only a startup job: of 457 people who started the title at tech companies since January 2025, 119 joined companies with more than 1,000 people. Most loops are a leader conversation, a case or take-home, and a presentation.',
  lastUpdated: '2026-11-04',
  story: {
    summary:
      'The Chief of Staff came to business from government and the military. In tech it spread among CEOs in the late 2010s, and Harvard Business Review made “The Case for a Chief of Staff” in 2020. In India it now spans startups and large companies.',
    born: { when: 'Government', what: 'Borrowed from government and the military' },
    rise: { when: '2020', what: 'HBR makes “The Case for a Chief of Staff”' },
    milestones: [
      {
        when: 'Origins',
        title: 'From government to business',
        detail:
          'Presidents and generals had chiefs of staff long before companies did. Tech CEOs adopted the title as their companies scaled faster than their calendars.',
      },
      {
        when: 'May 2020',
        title: 'HBR makes the case',
        detail:
          'Dan Ciampa argues that many CEOs need more than an executive assistant: someone to run the office, link siloed work and act as a trusted adviser.',
        sourceLabel: 'Harvard Business Review (May–June 2020)',
        sourceUrl: 'https://hbr.org/2020/05/the-case-for-a-chief-of-staff',
      },
      {
        when: 'Jan 2025 → now',
        title: '457 new Chiefs of Staff in Indian tech',
        detail:
          '457 people started the title at Indian tech companies since January 2025. 26% joined companies with more than 1,000 people.',
        sourceLabel: 'Our count (Apollo people search)',
        sourceUrl: '#hiring',
      },
    ],
    why: [
      'A leader’s time is the bottleneck. A Chief of Staff runs the operating rhythm so the leader can focus.',
      'Cross-team projects need an owner who sits above any single function.',
      'It is a fast track: you see how the whole company is run, from the top.',
    ],
  },
  aiAngle:
    'Much of the operating rhythm (notes, follow-ups, weekly reports, board prep) can now be drafted by AI. Show how you would use Claude or ChatGPT plus one automation to give the leader hours back each week.',
  mustKnow:
    'You are hired on trust and follow-through. Every story you tell should show you ran something across teams, kept people aligned and got it done.',
  whatTheRoleIs: [
    'You make one leader more effective. Half the job is the operating rhythm: setting quarterly goals, running the weekly leadership meeting, tracking decisions, preparing board and investor material. The other half is projects: a reorg, a new market, a pricing change, a process that breaks every month.',
    'In Indian tech, the title spreads across company sizes. Of 457 new Chiefs of Staff at tech employers since January 2025, 32% joined companies of 50 or fewer and 26% joined companies of 1,000+. Among 30 large Indian and global employers we checked, Razorpay had 5 new ones, Nykaa 4, Wipro 4, Swiggy 3 and Meesho 3.',
    'At large companies you often serve a business-unit leader, not the CEO. Titles in our data read "Chief of Staff to CFO", "Chief of Staff to COO" and "Chief of Staff, CEO’s Office". Read the job post for whose staff you would be, because that decides your scope.',
  ],
  expectationLabels: {
    nav: 'Startup vs large company',
    title: 'What leaders expect: startup vs large company',
    sub: 'Same title, very different jobs. Find out which one you are interviewing for.',
    a: 'Startup',
    b: 'Large company',
    aNote: 'Chief of Staff to the CEO',
    differenceTitle: 'The four kinds of Chief of Staff, and how it differs from nearby roles',
  },
  expectations: {
    b2b: {
      headline: 'Startup (under 200 people): the CEO’s second pair of hands',
      points: [
        'Set up the operating rhythm the company does not have yet: quarterly goals, a weekly leadership meeting, a decision log.',
        'Prepare investor updates and board decks, and keep the numbers consistent with finance.',
        'Run one or two company-level projects at a time, such as a new market or a pricing change.',
        'Fill a gap for a quarter when a function has no head yet, then hand it over.',
        'Filter what reaches the CEO: answer what you can, and bring the rest with a recommendation.',
      ],
      metrics: [
        'Quarterly goals hit',
        'Decisions closed on time',
        'CEO hours freed',
        'Board and investor material on time and accurate',
      ],
    },
    b2c: {
      headline: 'Large company (1,000+ people): run a leader’s organisation like a business',
      points: [
        'Serve a CXO or business-unit head, not always the CEO.',
        'Own the planning cycle for that organisation: annual plan, quarterly reviews, headcount and budget.',
        'Prepare the leader for reviews with the CEO and the board, and write their memos.',
        'Run cross-team programmes that touch product, sales and operations.',
        'Expect a formal loop: recruiter, hiring manager, a case or role-play, and a panel.',
      ],
      metrics: [
        'Planning cycle on schedule',
        'Programme milestones hit',
        'Quality of leadership reviews',
        'Budget and headcount within plan',
      ],
    },
    difference: [
      'Early-team generalist: builds whatever the young company needs next (Bain Capital Ventures archetype).',
      'Conductor: the project manager of the leadership team’s priorities (Bain Capital Ventures).',
      'Functional stand-in: covers a missing function head for a few months (Bain Capital Ventures).',
      'CEO brain extension: thinks like the CEO and decides for them on agreed topics (Bain Capital Ventures).',
      'Versus Founder’s Office: Founder’s Office is more junior and project-based; a Chief of Staff usually owns the leadership rhythm.',
      'Versus an executive assistant: an assistant runs the calendar and logistics; a Chief of Staff runs priorities and projects.',
    ],
  },
  skills: [
    {
      area: 'Operating rhythm',
      items: [
        'Quarterly goals or OKRs, set and scored',
        'A weekly leadership meeting with a clear agenda',
        'A decision log with owners and dates',
        'Board and investor update preparation',
      ],
    },
    {
      area: 'Problem solving',
      items: [
        'Structure a messy problem into a few clear questions',
        'Funnel and unit-economics maths',
        'Market entry and expansion cases',
        'Runway and headcount planning',
      ],
    },
    {
      area: 'Writing and influence',
      items: [
        'One-page memos that lead with the answer',
        'Get teams you do not manage to commit',
        'Disagree with a leader in private, support in public',
        'Keep confidential information confidential',
      ],
    },
    {
      area: 'Tools',
      items: [
        'Google Sheets or Excel: pivots, lookups, a simple model',
        'Slides for board and review decks',
        'Notion, Jira or Asana for trackers',
        'AI assistants for research, first drafts and simple automations',
      ],
    },
  ],
  getHired: {
    intro:
      'Chief of Staff roles are filled on trust, so a direct note to the leader matters more than in most jobs. Your resume has one job: prove you ran things across teams and they got done. The bullets below are templates; put your own numbers in.',
    bullets: [
      {
        weak: 'Coordinated with multiple teams on various projects.',
        strong:
          'Ran the weekly leadership review for a 40-person startup (agenda, decision log, follow-ups); quarterly priorities delivered on time rose from 5 of 9 to 8 of 9.',
      },
      {
        weak: 'Helped the CEO with presentations.',
        strong:
          'Wrote the monthly investor update and 3 board decks; cut prep from 4 days to 1.5 by building one metrics sheet shared by finance and sales.',
      },
      {
        weak: 'Worked on strategy projects.',
        strong:
          'Led a 6-city expansion analysis and recommended 2 cities for a pilot; the pilot reached payback in 5 months against a 6-month target.',
      },
      {
        weak: 'President, college entrepreneurship cell.',
        strong:
          'Ran a 1,200-person college summit as E-Cell president: 14-person team, ₹6 lakh in sponsorship raised, delivered ₹40,000 under budget.',
      },
    ],
    resumeTips: [
      'Lead each role with scope: team size, the leader you supported, budget.',
      'Show outcomes across functions, not a list of tasks.',
      'Name the rhythm you ran: OKRs, weekly reviews, board prep.',
      'Link one writing sample: a memo or a teardown.',
      'Keep it to one page unless you have 8+ years.',
      'Switching from consulting? Translate decks into decisions: what changed because of your work.',
    ],
    channels: [
      {
        name: 'Weekday: Chief of Staff jobs in India',
        how: 'Listings with posted pay and experience bands. Filter by remote or city.',
        url: 'https://www.weekday.works/jobs/strategy-chief-of-staff-jobs-in-india-remote',
      },
      {
        name: 'Wellfound',
        how: 'Startup posts often show salary and equity. Search “Chief of Staff” and “Founder’s Office”, since many posts use both titles.',
        url: 'https://wellfound.com/jobs/3084935-chief-of-staff-founder-s-office',
      },
      {
        name: 'Cutshort',
        how: 'Has new-grad Chief of Staff and Founder’s Office posts, with pay ranges.',
        url: 'https://cutshort.io/job/Founder-s-office-Chief-Of-Staff-2025-2026-Grads-Mumbai-CodeRound-AI-DqLI2iBY',
      },
      {
        name: 'LinkedIn posts, not just jobs',
        how: 'Search posts for “hiring a chief of staff”. Founders often announce the role in a post before, or instead of, a job listing.',
      },
      {
        name: 'Investor portfolio job boards',
        how: 'Many VC firms list open roles across their portfolio. Chief of Staff roles open right after a funding round.',
      },
      {
        name: 'Internal moves',
        how: 'At large companies, many Chiefs of Staff come from inside: strategy, programme management or the leader’s own team.',
      },
    ],
    outreach: {
      title: 'A five-line note to the leader',
      body: 'Hi [Name], I saw you are hiring a Chief of Staff after the [Series B / new business unit].\n\nI ran [the weekly leadership review / board prep] at [Company], where [one result with a number].\n\nI wrote a one-page plan for your first 30 days: the operating rhythm I would set up and 3 projects I would take off your plate. It is attached.\n\nWorth 20 minutes this week?',
      note: 'Send it to the leader directly and keep the recruiter in the loop if there is one. Follow up once after 5–6 days, then stop.',
    },
    proofOfWork: {
      title: 'Send a “first 30 days” plan',
      why: 'It shows the two things the role needs: you can work out a leader’s priorities from little information, and you write clearly.',
      steps: [
        'Read everything public: the leader’s last 6 months of posts, funding news, and the company’s open jobs (they reveal priorities).',
        'Write down the 3 priorities you can infer, and the evidence for each.',
        'On one page, set out the rhythm you would run (weekly review, decision log, quarterly goals) and 3 projects you would own.',
        'Attach it to your note and offer a 20-minute walkthrough.',
      ],
    },
  },
  process: [
    {
      companyType: 'Startup: Chief of Staff to the CEO',
      rounds: [
        'Screen with the CEO, a founder or the current Chief of Staff',
        'Take-home: a memo or deck on a real problem, due in 1–2 days',
        'Present it to the CEO, who pushes on your assumptions',
        'Conversations with the leadership team',
      ],
    },
    {
      companyType: 'Large company: Chief of Staff to a CXO or unit head',
      rounds: [
        'Recruiter screen',
        'Hiring manager (the leader you would support)',
        'Live case or role-play: brief a leader and handle curveballs, 45–60 min',
        'Panel with peers, sometimes a bar raiser',
      ],
    },
    {
      companyType: 'Operations-heavy company (quick commerce, logistics)',
      rounds: [
        'Recruiter screen',
        'Spreadsheet case on a real dataset, presented to the hiring manager',
        'Final interview with the leader',
      ],
    },
    {
      companyType: 'What candidates reported',
      rounds: [
        'Impact Guru: Chief of Staff round, home assignment, then the CEO; 4 weeks end to end (Glassdoor)',
        'The/Studio: two 1:1s with the CEO, then a 1.5-hour case presented to the CEO (Glassdoor, 2026)',
        'Flink: recruiter, Excel dataset case presented to the hiring manager, final interview (Glassdoor)',
        'Rokt: 15-minute online test, hiring manager, bar raiser, team conversations (Glassdoor)',
      ],
    },
  ],
  pay: {
    title: 'Pay: India job posts and self-reports, plus the US',
    headline: 'US median $180K · India posts ₹15–30 LPA',
    intro:
      'No salary site has a clean Chief of Staff figure for Indian tech, so we show two views: live job posts that state pay, and self-reported salaries. For 2–5 years at a startup, posts sit around ₹15–30 LPA. US pay comes from Levels.fyi.',
    tables: [
      {
        region: 'India: job posts with stated pay',
        tab: 'India · job posts',
        currency: 'INR (₹, lakh per annum, as posted)',
        rows: [
          {
            band: 'CodeRound AI, Mumbai (2025–26 grads)',
            experience: '0–1 yr',
            value: '₹3–12 LPA',
            url: 'https://cutshort.io/job/Founder-s-office-Chief-Of-Staff-2025-2026-Grads-Mumbai-CodeRound-AI-DqLI2iBY',
          },
          {
            band: 'Spenza, Bengaluru (plus 0.1–0.2% equity)',
            experience: '2 yrs',
            value: '₹15–25 LPA',
            url: 'https://wellfound.com/jobs/3084935-chief-of-staff-founder-s-office',
          },
          {
            band: 'CUBE84, Chennai or remote',
            experience: '4–8 yrs',
            value: '₹10–20 LPA',
            url: 'https://www.weekday.works/jobs/strategy-chief-of-staff-jobs-in-india-remote',
          },
          {
            band: 'Twenty20Systems',
            experience: '5 yrs',
            value: '₹25–30 LPA',
            url: 'https://wellfound.com/jobs/3097050-chief-of-staff-founder-s-office',
          },
          {
            band: 'Fintech SaaS startup, Bengaluru (director level)',
            experience: '6+ yrs',
            value: '₹80–90 LPA',
            url: 'https://jobs.weekday.works/fintech-saas-startup-chief-of-staff-(director-level)',
          },
        ],
        note: 'Each row is one job post; tap the company to open it. Posts without pay were left out. Several use the title “Chief of Staff / Founder’s Office”.',
        sourceLabel: 'Wellfound, Cutshort and Weekday job posts',
        sourceUrl: 'https://www.weekday.works/jobs/strategy-chief-of-staff-jobs-in-india-remote',
        asOf: 'Nov 4, 2026',
      },
      {
        region: 'India: self-reported salaries',
        tab: 'India · reported',
        currency: 'INR (₹, lakh per annum)',
        rows: [
          { band: '59 salaries', experience: '2 yrs', value: '₹4–39 LPA' },
          { band: '86 salaries', experience: '3 yrs', value: '₹5–36 LPA' },
          { band: '86 salaries', experience: '4 yrs', value: '₹7–48 LPA' },
          { band: '95 salaries', experience: '5 yrs', value: '₹7–50 LPA' },
          { band: '101 salaries', experience: '6 yrs', value: '₹9.5–63 LPA' },
        ],
        note: 'Based on 910 salaries in AmbitionBox’s “Chief Staff” category, last updated 20 Mar 2025. It mixes tech and non-tech employers, which is why the ranges are so wide.',
        sourceLabel: 'AmbitionBox',
        sourceUrl: 'https://ambitionbox.com/profile/chief-staff-salary',
        asOf: 'opened Nov 4, 2026',
      },
      {
        region: 'United States',
        currency: 'USD (total compensation per year)',
        rows: [
          { band: '25th percentile', experience: 'All levels', value: '$135K' },
          { band: 'Median', experience: 'All levels', value: '$180K' },
          { band: '75th percentile', experience: 'All levels', value: '$265K' },
          { band: '90th percentile', experience: 'All levels', value: '$350K' },
        ],
        note: 'Based on 52 salary submissions. Total compensation includes base, bonus and stock.',
        sourceLabel: 'Levels.fyi',
        sourceUrl: 'https://www.levels.fyi/t/chief-of-staff?from=jf-loc',
        asOf: 'Nov 4, 2026',
      },
    ],
    crossCheck:
      'Ask whose Chief of Staff you would be. Supporting a CEO or CXO usually pays more than supporting a team lead, even under the same title.',
  },
  hiring: {
    title: 'Where new Chiefs of Staff went in Indian tech, 2025–26',
    segments: true,
    intro:
      'In India, 1,456 people started a Chief of Staff title since January 2025, but the title is also used in government, politics and non-tech firms. Counting tech companies only leaves 457, spread across every company size. In the US, 3,325 started the title at tech companies, and about 40% of those with a known company size joined companies of 1,000+.',
    companies: [
      { name: '50 people or fewer', count: 146, segment: 'Seed to Series A' },
      { name: '51–200 people', count: 98, segment: 'Series A to C' },
      { name: '201–1,000 people', count: 94, segment: 'Scale-ups' },
      { name: 'Over 1,000 people', count: 119, segment: 'Large companies' },
    ],
    method:
      'Counted in Apollo.io: people in India whose current title matches Chief of Staff (strict match, no similar titles) and who started it in the last 670 days, at employers in software, IT services, data and internet industries (NAICS 5415, 5112, 5132, 5182, 5191), split by employer headcount. US: same filter, 3,303 of 3,325 had a known company size; 1,316 were at companies of 1,000+',
    sourceLabel: 'Apollo.io people data',
    asOf: 'Nov 4, 2026',
  },
  questionGroups: [
    {
      id: 'fit',
      title: 'Motivation and fit',
      blurb:
        'Leaders hire people they trust. Show judgement and a track record of finishing things.',
      questions: [
        {
          q: 'Why do you want to be a Chief of Staff?',
          answer:
            'Tie it to work you have already done. "At my last job I ended up running our weekly review and the board prep. I liked making a whole team move faster more than owning one function."\n\nThen say what you want from the role: seeing how a leader makes decisions, and owning problems that cross teams.\n\nEnd with where it leads: "In three years I want to run a business unit. This is the fastest way to learn every part of one."',
          lookFor: 'A real track record of cross-team work, and a sensible next step.',
        },
        {
          q: 'Why this leader, and why now?',
          answer:
            'Show you studied the person, not just the company. Mention one decision they made publicly, such as a new market or a reorg, and what you think it means for the next 12 months.\n\nThen link it to your strengths: "You just raised and are hiring three new function heads. The first quarter will be about getting them aligned, and that is the work I have done before."',
          lookFor: 'Research on the leader and a clear link to what they need now.',
        },
        {
          q: 'Tell me about yourself.',
          answer:
            'Keep it to 90 seconds and make it a story of scope growing over time.\n\nThree beats: where you started, the biggest cross-team thing you ran (with a number), and why that leads to this role.\n\nFinish with what you would take off their plate in the first 30 days.',
          lookFor: 'Brevity, a clear thread, and a concrete offer.',
        },
        {
          q: 'Will you be able to put in 16+ hours a day? (Asked at Stupa, per Glassdoor)',
          answer:
            'Be honest and specific, and do not just say yes.\n\n"For launches or a board week, yes, and I have done it. Week to week, I am more useful if I protect time for thinking. What does a normal week look like for the last person in this role?"\n\nThe question is also a signal about the company. Ask it back politely and listen to the answer.',
          lookFor: 'Commitment without over-promising, and judgement about sustainable pace.',
        },
        {
          q: 'What do you want to do after this role?',
          answer:
            'Leaders know a Chief of Staff moves on after a few years, so do not hide it.\n\nName a realistic path: running a business line, a strategy or operations leadership role, or founding something. Say you would stay long enough to hand over a working system, not just a pile of notes.',
          lookFor: 'Ambition that fits the company, and respect for a proper handover.',
        },
      ],
    },
    {
      id: 'rhythm',
      title: 'Operating rhythm and scenarios',
      blurb:
        'The core of the job. Answer with a concrete system: meetings, documents, owners, dates.',
      questions: [
        {
          q: 'How would you set up OKR planning, then the weekly and monthly meetings? (Asked at The/Studio, per Glassdoor)',
          answer:
            'Quarterly: three weeks before the quarter, the CEO drafts 3 company objectives. Teams propose key results, you merge them, and the leadership team signs off in week 0. Google’s re:Work guide treats 60–70% achievement as the sweet spot, so set them high.\n\nWeekly: a 45-minute leadership meeting. 10 minutes on metrics, 20 on red key results, 15 on decisions. You send notes and a decision log within 2 hours.\n\nMonthly: a 90-minute business review per function with a pre-read sent 48 hours ahead.',
          lookFor: 'A complete cadence with timings, owners and written follow-up.',
        },
        {
          q: 'How would you restructure the CEO’s week? (A scenario format described by Hacking the Case Interview)',
          answer:
            'Start with data. Tag two weeks of the calendar into buckets: customers, hiring, investors, internal status meetings, deep work.\n\nSay internal status meetings take 22 of 50 hours. Replace half with written updates and cut the rest to 25 minutes. Batch 1:1s into two afternoons. Protect two 3-hour blocks for deep work.\n\nAgree on the target split with the CEO, then review it monthly. Calendars drift back within weeks.',
          lookFor: 'Measuring first, a target split, and a way to keep it.',
        },
        {
          q: 'Map out the current process and design an improved one. (Asked at The/Studio, per Glassdoor)',
          answer:
            'Pick one process and draw it as it really runs: each step, who owns it, how long it waits. Ask the people who do it, not the managers.\n\nFind the slowest wait and the step with the most rework. Fix those first: remove an approval, add a template, or automate a handoff.\n\nDefine one measure, such as days from request to done, and check it after 30 days.',
          lookFor: 'Mapping reality, targeting the bottleneck, and a measure.',
        },
        {
          q: 'Two of your leaders disagree on a priority and both come to you. What do you do?',
          answer:
            'Do not decide for them unless the leader gave you that authority.\n\nAsk each to write their case in half a page: the goal, the cost and the risk. Put both side by side against the company’s goal for the quarter.\n\nTake it to the decision-maker with a deadline and your recommendation. Log the decision and tell both leaders the reason the same day.',
          lookFor: 'Neutral process, clear decision owner, written record.',
        },
        {
          q: 'The CEO asks you to tell a VP that their project is cancelled. How do you handle it?',
          answer:
            'Push back gently. Decisions that land hard on a leader should come from the CEO, or you become the messenger people resent.\n\nOffer to prepare the conversation: the reason, what happens to the team, and what the VP owns next. Sit in if the CEO wants.\n\nIf the CEO insists, deliver it privately and early, with the reason, not a rumour.',
          lookFor: 'Protecting the leader’s relationships and your own trust.',
        },
        {
          q: 'How would you prepare a quarterly board deck?',
          answer:
            'Use the same structure every quarter so the board can compare: headline metrics versus plan, what worked, what did not and why, cash and runway, next quarter’s plan, and asks.\n\nPull every number from one source and reconcile it with finance two days before. Send the deck 3–5 days ahead so the meeting is for discussion, not reading.',
          lookFor: 'Consistency, accuracy and respect for the board’s time.',
        },
        {
          q: 'What would you do in your first 30 days?',
          answer:
            'Week 1: listen. Meet every leader for 30 minutes and ask what slows them down.\n\nWeeks 2–3: write a one-page diagnosis with the top three problems, and agree on it with the CEO.\n\nWeek 4: start the weekly review and the decision log, and take one quick project to show results early.',
          lookFor: 'Listening before fixing, and an early, visible win.',
        },
      ],
    },
    {
      id: 'cases',
      title: 'Cases and numbers',
      blurb:
        'Usually a take-home or a live case. Structure first, then numbers that add up, then a decision.',
      questions: [
        {
          q: 'Explain a website funnel with its key KPIs and levers. (Asked at Foxtale, per Glassdoor)',
          answer:
            'Walk it step by step with numbers. 100,000 sessions; 40% view a product (40,000); 8% of those add to cart (3,200); 50% start checkout (1,600); 60% pay (960). That is 0.96% conversion. At a ₹600 average order, revenue is ₹5.76 lakh.\n\nThen give a lever per step: ads and SEO for traffic, product pages for views, offers and reviews for add-to-cart, fewer checkout fields and cash on delivery for completion.\n\nSay which step you would fix first: the biggest drop that is cheapest to move.',
          lookFor: 'A full funnel, correct maths, and a lever per stage.',
        },
        {
          q: 'Case: build a go-to-market plan for taking fundraising to other countries. (Asked at Impact Guru, per Glassdoor)',
          answer:
            'Clarify the goal first: more money per campaign, or new donors?\n\nThen pick countries on three tests: a large Indian diaspora that already donates, easy card and bank payments, and clear rules for sending money to Indian beneficiaries. Check the rules before anything else.\n\nRecommend one pilot country, one channel (diaspora community groups), and a target such as a share of campaign money from abroad after 90 days.',
          lookFor: 'Goal first, a clear filter for countries, and a measurable pilot.',
        },
        {
          q: 'Prepare a US market-entry presentation for a sports SaaS product. (Asked at Stupa, per Glassdoor)',
          answer:
            'Five slides. Who pays (clubs, academies or federations) and how many there are. What they use today. How you would reach them (associations, events, coaches). Pricing and the payback for a club. The entry plan.\n\nEnd with a pilot: a small set of clubs in one region for one season, with clear success criteria for renewal.',
          lookFor: 'Knowing who pays, a realistic channel, and a pilot with criteria.',
        },
        {
          q: 'We want a framework for deciding what to test. (Asked at The/Studio, per Glassdoor)',
          answer:
            'Use ICE: score each idea 1–10 on Impact, Confidence and Ease, and multiply.\n\nExample: a new pricing page scores 8 × 6 × 7 = 336. A shorter signup form scores 5 × 8 × 9 = 360. Test the signup form first.\n\nAdd two rules: one test per page at a time, and a minimum run time decided before you start, so nobody stops a test early because it looks good.',
          lookFor: 'A simple, repeatable scoring method and testing discipline.',
        },
        {
          q: 'How would you build an agent that finds leads and sends the first outreach email? (Asked at The/Studio, per Glassdoor)',
          answer:
            'Five steps. Define the ideal customer in writing. Pull a list from sources that allow it. Enrich and score each lead. Have an AI model draft a first email from one real fact about the company. Send it to a human review queue.\n\nOnly then send, in small daily batches with an opt-out line, and track reply rate by segment.\n\nSay what you would not automate at first: the send itself, until the drafts are reliably good.',
          lookFor: 'A practical pipeline, a human check, and respect for consent.',
        },
        {
          q: 'We have ₹12 crore in the bank and burn ₹80 lakh a month. The CEO wants to hire 10 engineers at ₹30 LPA each. What happens to runway?',
          answer:
            'Today’s runway is 12 ÷ 0.8 = 15 months.\n\nTen engineers at ₹30 LPA cost ₹3 crore a year, or ₹25 lakh a month. Burn becomes ₹1.05 crore, and runway falls to about 11.4 months.\n\nRecommend hiring in two waves tied to a milestone, so runway stays above 12 months until the next round is in sight.',
          lookFor: 'Clean maths and a recommendation that protects runway.',
        },
        {
          q: 'Short case: if you were asked to do X, how would you approach it? (A format reported on Glassdoor’s Chief of Staff page)',
          answer:
            'This tests how you think, not what you know. Use the same four steps every time.\n\nRestate the goal and the deadline. List what you would need to know, and how you would find it in a day. Lay out two or three options with the trade-off of each. Recommend one, and say what would change your mind.',
          lookFor: 'A repeatable structure and a decision at the end.',
        },
      ],
    },
    {
      id: 'behavioural',
      title: 'Behavioural',
      blurb: 'Short STAR stories with numbers. Prepare six and reuse them across questions.',
      questions: [
        {
          q: 'Tell me about a project where you gave a data-driven recommendation. (Asked at Flink, per Glassdoor)',
          answer:
            'Use STAR, with the numbers in the middle.\n\n"Delivery costs were rising. I split cost per order by zone and found 3 of 12 zones made up 40% of late deliveries. I recommended merging two of them. Cost per order fell 9% in six weeks."\n\nSay what data you did not have, and how you handled it.',
          lookFor: 'Clear analysis, a decision, and a measured result.',
        },
        {
          q: 'What process did you make better? (Asked at Sagetap, per Glassdoor)',
          answer:
            'Give before and after numbers. "Hiring approvals took 9 days and went through four people. I cut it to two approvers with a budget check built into the form. It now takes 2 days."\n\nAdd how you got people to adopt it, because that is the hard part.',
          lookFor: 'A measurable improvement and how you got people to adopt it.',
        },
        {
          q: 'Tell me about a time you got a team you did not manage to deliver.',
          answer:
            'Show the mechanics. Agree on the goal with their manager first. Write down who does what by when. Make progress visible in a weekly update, and escalate early with options, not complaints.\n\nEnd with the result and what you would do differently.',
          lookFor: 'Influence through clarity and visibility, not authority.',
        },
        {
          q: 'Tell me about a time you disagreed with your manager.',
          answer:
            'Show respect and spine together. "I thought we were launching too early. I shared the data privately and proposed a two-week pilot with a clear go or no-go rule. The pilot found a pricing bug."\n\nIf you lost the argument, say how you then supported the decision.',
          lookFor: 'Disagreeing in private with data, then backing the decision.',
        },
        {
          q: 'You will see confidential information about people and money. How do you handle it?',
          answer:
            'Keep it short and firm. "Need-to-know only. Documents stay access-controlled, I do not discuss them outside the people involved, and when unsure I ask."\n\nIf you have handled salary, layoff or fundraising information before, mention it in one line.',
          lookFor: 'Discretion. This is non-negotiable.',
        },
        {
          q: 'Tell me about a mistake you made.',
          answer:
            'Pick a real one with stakes. Say what went wrong, which part was yours, and the system you added afterwards, such as a checklist or a second review.\n\nThen give one example where that system caught a problem later.',
          lookFor: 'Ownership and a lasting fix.',
        },
      ],
    },
  ],
  plans: [
    {
      days: '7 days',
      title: 'Interview next week',
      tasks: [
        'Day 1: study the leader: last 6 months of posts, interviews and company news.',
        'Day 2: write your 90-second story and six STAR stories with numbers.',
        'Day 3: write down an operating rhythm you would run (OKRs, weekly review, decision log).',
        'Day 4: practise the funnel and runway questions above until the maths is automatic.',
        'Day 5: do a take-home in 3 hours: a one-page memo on one of the company’s problems.',
        'Day 6: do a mock interview and record yourself presenting the memo.',
        'Day 7: prepare three questions, such as what the last Chief of Staff shipped.',
      ],
    },
    {
      days: '14 days',
      title: 'Build proof of work',
      tasks: [
        'Week 1: everything in the 7-day plan.',
        'Week 2: write the “first 30 days” plan from the section above for your top target.',
        'Send it with the five-line note to the leader.',
        'Rewrite two resume bullets to show cross-team results with numbers.',
      ],
    },
    {
      days: '30 days',
      title: 'Run a proper search',
      tasks: [
        'List 20 targets: companies that raised in the last 6 months, and large-company leaders who just took a new remit.',
        'For each: apply, message the leader, and follow up once after 5–6 days.',
        'Write two short memos a week and reuse the research.',
        'Practise one case and one scenario question a day, out loud.',
        'Track replies and double down on the message that works.',
      ],
    },
  ],
  resources: [
    {
      title: 'Chief of Staff case interview formats',
      url: 'https://www.hackingthecaseinterview.com/pages/chief-of-staff-case-interview',
      kind: 'Guide',
      why: 'Take-home, live role-play and scenario formats, with examples. The article is free.',
      free: true,
    },
    {
      title: 'The four Chief of Staff archetypes (Bain Capital Ventures)',
      url: 'https://baincapitalventures.com/insight/the-four-chief-of-staff-archetypes-and-which-one-your-startup-actually-needs/',
      kind: 'Guide',
      why: 'Helps you work out which kind of Chief of Staff a company wants, so you can pitch the right strengths.',
      free: true,
    },
    {
      title: 'Why you need two chiefs in the executive office (First Round Review)',
      url: 'https://review.firstround.com/why-you-need-two-chiefs-in-the-executive-office/',
      kind: 'Guide',
      why: 'A CEO on what he wants from a Chief of Staff: someone who can predict how he would decide.',
      free: true,
    },
    {
      title: 'Set goals with OKRs (Google re:Work)',
      url: 'https://rework.withgoogle.com/en/guides/set-goals-with-okrs',
      kind: 'Guide',
      why: 'Google’s own OKR guide, with examples. Use it for the planning questions.',
      free: true,
    },
    {
      title: 'Amazon 2017 shareholder letter (six-page memos)',
      url: 'https://www.aboutamazon.com/md/news/company-news/2017-letter-to-shareholders',
      kind: 'Guide',
      why: 'Bezos on why great memos take a week. The best short read on writing for leaders.',
      free: true,
    },
    {
      title: 'Operating cadence: meetings, reviews and rituals',
      url: 'https://www.antoinebuteau.com/the-chief-of-staff-operating-model-series-6-operating-cadence-meetings-reviews-and-rituals-that-actually-work/',
      kind: 'Guide',
      why: 'How to design weekly, monthly and quarterly meetings that each do one job.',
      free: true,
    },
    {
      title: 'Founder’s Office hub',
      url: '/founders-office',
      kind: 'Our guide',
      why: 'The closer-to-entry-level version of this role, with its own questions and posted pay.',
      free: true,
    },
    {
      title: 'Learn startups from Paul Graham (free course)',
      url: '/paul-graham',
      kind: 'Our guide',
      why: 'The founder you support is likely to run on these ideas: talk to users, grow weekly, stay default alive, founder mode. Each lesson links the original essay.',
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
    { label: 'Founder’s Office hub', href: '/founders-office' },
    { label: 'AI Product Manager hub', href: '/aipm' },
    { label: 'Growth Manager hub', href: '/growth' },
    { label: 'Strategy & Operations hub', href: '/strategy-and-operations' },
  ],
  faqs: [
    {
      q: 'What does a Chief of Staff do?',
      a: 'They make one leader more effective. They run the leadership rhythm (goals, weekly reviews, board prep) and own cross-team projects that no single function owns.',
    },
    {
      q: 'What is the Chief of Staff salary in India?',
      a: 'Startup job posts we checked in November 2026 ranged from ₹3–12 LPA for new grads to ₹80–90 LPA for a director-level role with 6+ years. For 2–5 years, posts sat around ₹15–30 LPA. AmbitionBox’s self-reported range is ₹6.6–76.1 LPA across 910 salaries.',
    },
    {
      q: 'What is the Chief of Staff salary in the US?',
      a: 'Levels.fyi shows a median of $180K total compensation in the US, with the 25th to 75th percentile at $135K–$265K, based on 52 submissions (November 2026).',
    },
    {
      q: 'Can a fresher become a Chief of Staff?',
      a: 'Rarely under that exact title, but some startups hire new grads into combined Founder’s Office and Chief of Staff roles, such as a 2025–26 graduate post in Mumbai paying ₹3–12 LPA. Most people reach the role after 3–8 years in consulting, operations, product or strategy.',
    },
    {
      q: 'What is the difference between Chief of Staff and Founder’s Office?',
      a: 'Founder’s Office is usually a junior, project-based role at a small startup. A Chief of Staff usually owns a leader’s whole operating rhythm, and the role is spread across company sizes: in our data, 26% of new Chiefs of Staff in Indian tech joined companies of 1,000+, against 5% for Founder’s Office.',
    },
    {
      q: 'Is Chief of Staff the same as an executive assistant?',
      a: 'No. An executive assistant runs the calendar, travel and logistics. A Chief of Staff runs priorities and projects, and often manages the leadership team’s planning cycle.',
    },
  ],
}

export default chiefOfStaff
