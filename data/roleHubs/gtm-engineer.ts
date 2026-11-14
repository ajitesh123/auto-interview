import type { RoleHub } from './types'

const gtmEngineer: RoleHub = {
  slug: 'gtm-engineer',
  visuals: {
    hero: {
      mp4: '/static/images/roles/gtm-engineer/hero.mp4',
      image: '/static/images/roles/gtm-engineer/hero.webp',
      alt: 'GTM Engineer role hub: interview questions, pay in rupees, dollars, pounds and euros, and the interview process',
    },
    pay: {
      mp4: '/static/images/roles/gtm-engineer/pay.mp4',
      image: '/static/images/roles/gtm-engineer/pay.webp',
      alt: 'Median total pay for GTM Engineers in the US is $140K (Levels.fyi, Oct 2026)',
    },
    og: '/static/images/roles/gtm-engineer/og.jpg',
  },
  roleName: 'GTM Engineer',
  shortName: 'GTM Engineer',
  metaTitle: 'GTM Engineer Interview Guide 2026: Questions, Skills & Pay',
  metaDescription:
    'GTM engineer interview prep: what the role is, the Clay-to-code stack, 24 questions with model answers, pay in India, US and Europe, the interview process and a 30-day plan.',
  keywords: [
    'gtm engineer',
    'what is a gtm engineer',
    'gtm engineer interview questions',
    'gtm engineer salary',
    'gtm engineer salary india',
    'go to market engineer',
    'how to become a gtm engineer',
  ],
  heroTitle: 'GTM Engineer interview prep',
  heroDescription:
    'The role Clay made famous: engineers who build the systems that find, enrich and reach buyers. What GTM engineers do, the stack, 24 questions with model answers, and real pay data.',
  directAnswer:
    'A GTM (go-to-market) engineer builds the systems a sales and marketing team runs on: data enrichment, lead scoring and routing, outbound automation, CRM workflows and, increasingly, AI agents for research and outreach. They mix no-code tools such as Clay, n8n and HubSpot with code (Python, JavaScript, SQL) and are measured on pipeline and revenue, not on lines of code.',
  lastUpdated: '2026-11-03',
  story: {
    summary:
      'GTM (go-to-market) engineering grew out of sales operations and growth engineering. Clay coined the title in 2023, and it spread fast across B2B startups in 2025 as AI made it possible to automate account research and outreach.',
    born: { when: '2023', what: 'Title coined by Clay' },
    rise: { when: '2025', what: '400+ GTM engineer jobs in about 4.5 months' },
    milestones: [
      {
        when: '2023',
        title: 'Clay coins the title',
        detail:
          'The data-enrichment platform Clay coined “GTM engineer”. Cursor, Lovable, Notion and Webflow have since hired at least one.',
        sourceLabel: 'Sifted (Aug 6, 2025)',
        sourceUrl: 'https://sifted.eu/articles/gtm-engineer-the-next-big-thing',
      },
      {
        when: 'Spring–summer 2025',
        title: '400+ roles posted',
        detail:
          'Clay data cited by Sifted counted over 400 GTM engineer jobs posted in roughly four and a half months.',
        sourceLabel: 'Sifted (Aug 6, 2025)',
        sourceUrl: 'https://sifted.eu/articles/gtm-engineer-the-next-big-thing',
      },
    ],
    why: [
      'AI tools can research thousands of accounts and draft outreach, so the bottleneck moved from reps’ hours to whoever builds the system.',
      'Revenue teams want someone measured on pipeline who can also write Python, SQL and workflows.',
      'Small startups cannot hire large sales-development teams, so one engineer automating the top of the funnel is a cheaper bet.',
    ],
  },
  aiAngle:
    'AI agents are now part of the GTM stack. Learn to build a research-and-outreach workflow in n8n or Clay that calls an LLM, and show the before and after numbers.',
  mustKnow:
    'You are judged on pipeline, not code. Every project you show should end with a number: accounts researched, replies, meetings booked, hours saved.',
  whatTheRoleIs: [
    'GTM engineering grew out of sales operations and growth engineering. Clay popularised the title, and in 2025 it spread fast across B2B startups: Clay data cited by Sifted counted over 400 GTM engineer jobs posted in roughly four and a half months.',
    'Where a sales rep researches 30 accounts by hand, a GTM engineer builds a workflow that researches 3,000, scores them, writes a first draft of outreach and routes the best ones to the right rep. The job is to turn what top sellers do into a system.',
    'Job postings show two flavours. Some (Peec AI, early-stage startups) want a builder who lives in Clay, HubSpot and n8n with some Python. Others (Vercel, larger tech companies) want a full software engineer who ships production apps and AI agents for the revenue team.',
  ],
  expectations: {
    b2b: {
      headline: 'B2B SaaS (nearly every GTM engineer role): build the revenue machine',
      points: [
        'Build enrichment and scoring: pull firmographic, technographic and intent data into the CRM and rank accounts by fit and timing.',
        'Automate outbound: segment lists, generate personalised first lines with AI, launch multi-channel sequences and protect email deliverability.',
        'Route leads in minutes: inbound forms, product sign-ups and website visits sent to the right rep with context.',
        'Own CRM hygiene and data quality: deduplication, field standards and syncs between Salesforce or HubSpot and other tools.',
        'Build AI agents for the sales team: account research briefs, call prep, meeting follow-ups and CRM updates.',
        'Measure everything: attribution, conversion by step and the cost and return of each campaign.',
      ],
      metrics: [
        'Pipeline generated from built workflows',
        'Meetings booked per campaign',
        'Reply and positive reply rate',
        'Speed to lead (minutes)',
        'Rep hours saved per week',
        'CRM data completeness',
      ],
    },
    b2c: {
      headline: 'B2C and product-led companies: growth systems at volume',
      points: [
        'Consumer and product-led companies hire GTM or growth engineers to run lifecycle messaging, referral loops and experiments rather than sales outreach.',
        'Expect work on event tracking, segmentation, email and push automation, and paid-acquisition data pipelines.',
        'Volume is much higher, so reliability, cost per message and privacy rules (consent, unsubscribe) matter more.',
        'The line between GTM engineer and growth engineer blurs here; read the job description carefully.',
      ],
      metrics: [
        'Activation and conversion rate',
        'Retention by lifecycle campaign',
        'Cost per acquired user',
        'Experiment velocity',
        'Unsubscribe and complaint rate',
      ],
    },
    difference: [
      'Compared with RevOps: you build and automate, not only configure and report.',
      'Compared with a software engineer: your users are sellers and marketers, and success is pipeline.',
      'Compared with an SDR: you design the system that prospects, instead of prospecting by hand.',
      'Most roles sit inside sales or revenue, reporting to a revenue or GTM leader.',
      'Tools change fast, so learning speed matters more than any single tool.',
    ],
  },
  skills: [
    {
      area: 'GTM tools',
      items: [
        'Clay for enrichment and workflows',
        'HubSpot or Salesforce administration',
        'Sequencing tools (Apollo, Outreach, Instantly)',
        'n8n, Zapier or Make for automation',
      ],
    },
    {
      area: 'Engineering',
      items: [
        'Python or JavaScript for APIs and scripts',
        'SQL and basic data modelling',
        'Webhooks, APIs and rate limits',
        'For senior roles: shipping full-stack apps',
      ],
    },
    {
      area: 'AI',
      items: [
        'Prompting for research and personalisation',
        'Building agents that call tools',
        'Checking AI output quality at scale',
        'Cost per enriched record',
      ],
    },
    {
      area: 'Revenue sense',
      items: [
        'Ideal customer profile and segmentation',
        'The sales funnel and its conversion rates',
        'Email deliverability basics',
        'Explaining impact to sales leaders',
      ],
    },
  ],
  process: [
    {
      companyType: 'Seed to Series B startups',
      rounds: [
        'Founder or head of revenue call',
        'Take-home: build an enrichment and outbound workflow for a sample ICP',
        'Walkthrough of your build and your past workflows',
        'Working session with sales: diagnose a broken part of their funnel',
        'Culture and offer conversation',
      ],
    },
    {
      companyType: 'Growth-stage SaaS (RevOps-led)',
      rounds: [
        'Recruiter screen',
        'Hiring manager deep dive on systems you have built',
        'Technical round: CRM logic, data model and an API or SQL task',
        'Case: design lead routing or scoring for their motion',
        'Cross-functional panel with sales and marketing',
      ],
    },
    {
      companyType: 'Tech companies hiring engineering-heavy GTM roles (e.g. Vercel)',
      rounds: [
        'Recruiter screen',
        'Coding round (full-stack, often Next.js and APIs)',
        'Build exercise: an AI app or agent for a sales use case',
        'System design for an internal GTM tool',
        'Behavioural and values interviews',
      ],
    },
    {
      companyType: 'Agencies and Indian GTM teams',
      rounds: [
        'Screening call',
        'Live Clay or automation task',
        'Campaign teardown: what you would change and why',
        'Client-communication roleplay',
        'Offer discussion',
      ],
    },
  ],
  pay: {
    intro:
      'GTM engineer is a new title, so salary samples are small. We show every verified data point we found, with the sample size, so you can judge how much weight to give each number.',
    tables: [
      {
        region: 'United States',
        currency: 'USD per year (total compensation)',
        rows: [
          {
            band: '25th percentile',
            experience: 'Typically early career (0–2 yrs)',
            value: '$110K',
          },
          { band: 'Median', experience: 'Typically mid-level (2–5 yrs)', value: '$140K' },
          { band: '75th percentile', experience: 'Typically senior (5–8 yrs)', value: '$249K' },
          { band: '90th percentile', experience: 'Typically lead (8+ yrs)', value: '$365K' },
        ],
        note: 'Based on 24 salaries. Glassdoor, with 31 salaries, reports a higher average of about $192K and a typical range of $144K–$262K, so treat the band as wide.',
        sourceLabel: 'Levels.fyi, Go-To-Market Engineer, US',
        sourceUrl: 'https://www.levels.fyi/t/gtm-engineer',
        asOf: 'Updated Oct 27, 2026',
      },
      {
        region: 'India',
        currency: 'INR, lakh per annum (total compensation)',
        rows: [
          {
            band: '25th percentile',
            experience: 'Typically early career (0–2 yrs)',
            value: '₹12.7 LPA',
          },
          { band: 'Median', experience: 'Typically mid-level (2–5 yrs)', value: '₹31.9 LPA' },
          { band: '75th percentile', experience: 'Typically senior (5–8 yrs)', value: '₹65.7 LPA' },
          { band: '90th percentile', experience: 'Typically lead (8+ yrs)', value: '₹71.8 LPA' },
        ],
        note: 'Based on only 10 salaries, so read it as a rough guide. It likely includes India-based engineers paid by US companies, which lifts the upper bands.',
        sourceLabel: 'Levels.fyi, Go-To-Market Engineer, India',
        sourceUrl: 'https://www.levels.fyi/t/gtm-engineer/locations/india',
        asOf: 'Updated Nov 3, 2026',
      },
      {
        region: 'Europe: United Kingdom',
        currency: 'GBP per year (total compensation)',
        rows: [{ band: 'Median', experience: 'All levels', value: '£142K' }],
        note: 'Levels.fyi lists a median of £142,041 for the UK but publishes no percentiles or sample size, so this is a single, low-confidence data point.',
        sourceLabel: 'Levels.fyi, Go-To-Market Engineer, UK',
        sourceUrl: 'https://www.levels.fyi/t/gtm-engineer/locations/united-kingdom',
        asOf: 'Checked Nov 3, 2026',
      },
      {
        region: 'Europe: Germany',
        currency: 'EUR per year (posted base salary)',
        rows: [
          { band: 'Posted range', experience: '2+ yrs (Berlin startup)', value: '€70K–€115K' },
        ],
        note: 'Levels.fyi has no German GTM engineer data yet. This is the posted range for a GTM Engineer at Peec AI in Berlin, plus equity; the posting is now closed.',
        sourceLabel: 'Peec AI GTM Engineer posting',
        sourceUrl:
          'https://careers.antler.co/companies/peec-ai/jobs/62875307-founding-gtm-engineer',
        asOf: 'Checked Nov 3, 2026',
      },
    ],
    crossCheck:
      'Posted ranges, checked Nov 3, 2026: Vercel GTM Engineer (4+ years full-stack), San Francisco on-target earnings $180,000–$310,000; Clay GTM Engineer, Partnerships (6–10 years), New York, $140,000–$200,000 plus equity (posting closed).',
  },
  questionGroups: [
    {
      id: 'common',
      title: 'Common opening questions',
      blurb: 'Show that you think in revenue, not in tools.',
      questions: [
        {
          q: 'What is a GTM engineer, in your words?',
          answer:
            'Someone who turns the best manual work of a revenue team into systems. Give a crisp definition, then an example: "Our best SDR spent two hours a day researching accounts. I built a workflow that does the research for 500 accounts a day and writes a brief for each, so reps spend that time on calls."',
          lookFor: 'A definition tied to outcomes and a concrete example.',
        },
        {
          q: 'Walk me through a GTM workflow you built.',
          answer:
            'Cover the problem, the data sources, each step (enrichment, scoring, personalisation, routing), the tools, how you tested it, and the result in numbers: meetings booked, reply rate, hours saved. Mention what broke and how you fixed it.',
          lookFor: 'End-to-end ownership and a measured result.',
        },
        {
          q: 'Why GTM engineering rather than software engineering or sales?',
          answer:
            'Explain that you like being close to revenue and to the people using what you build, and that you enjoy fast feedback: a workflow shipped on Monday shows results by Friday.',
          lookFor: 'Genuine motivation for the hybrid role.',
        },
        {
          q: 'Which tools are you strongest in, and when would you write code instead?',
          answer:
            'Name your strongest tools honestly. Then give a rule: use no-code tools for speed and handoff to non-engineers; write code when volume, cost, custom logic or reliability needs outgrow them, for example when processing 100,000 records or calling an API the tool does not support.',
          lookFor: 'Judgement about build versus configure.',
        },
      ],
    },
    {
      id: 'workflows',
      title: 'Workflow design and outbound',
      blurb: 'The core of most GTM engineer interviews. Think out loud.',
      questions: [
        {
          q: 'Design an outbound system to book 40 meetings a month for a B2B SaaS selling to finance teams.',
          answer:
            'Work backwards: 40 meetings at a 1% meeting rate needs about 4,000 well-targeted contacts a month. Define the ICP (company size, industry, tools such as their ERP, recent hiring or funding signals). Build the list, enrich with verified emails, score by fit and signal, write segment-specific messaging with an AI-personalised first line based on a real signal, and send through warmed domains with sensible daily limits. Track reply, positive reply and meeting rate by segment and kill weak segments weekly.',
          lookFor: 'Funnel math, signal-based targeting and deliverability.',
        },
        {
          q: 'How would you build a lead-scoring model for inbound sign-ups?',
          answer:
            'Combine fit (company size, industry, role) with intent (pages viewed, product actions, pricing visits). Start with simple points agreed with sales, back-test against past deals to see which signals predicted closed-won, then adjust. Route high scores to reps within minutes and send low scores to nurture. Review monthly.',
          lookFor: 'Fit plus intent, validated against real outcomes.',
        },
        {
          q: 'How do you personalise outreach at scale without it sounding automated?',
          answer:
            'Personalise on a real, recent signal (a hire, a launch, a job posting, a tool they use) rather than generic flattery. Use AI to draft the first line from that signal, keep the rest of the email human and short, and review a sample of each batch. Block outputs that mention nothing specific.',
          lookFor: 'Signal-based personalisation with quality control.',
        },
        {
          q: 'Reply rates fell from 4% to 1.5% over a month. Diagnose it.',
          answer:
            'Check deliverability first: inbox placement, bounce rate, spam complaints, domain reputation and recent volume changes. Then targeting: did the list source or ICP change? Then messaging: did copy or the AI prompt change? Compare by domain, segment and sequence step to isolate the cause, fix it and add monitoring.',
          lookFor: 'Deliverability first, then targeting, then copy.',
        },
        {
          q: 'Design lead routing for a company with 20 reps across three regions.',
          answer:
            'Route by territory (region, account size), then by account ownership so existing accounts go to their owner, then round-robin within the pod for new ones. Handle edge cases: duplicates, missing country, reps on leave. Set a speed-to-lead target and an alert when a lead is not touched in time.',
          lookFor: 'Clear rules plus edge cases and service levels.',
        },
        {
          q: 'How would you use website visits to trigger outreach?',
          answer:
            'Identify visiting companies, filter by ICP fit and high-intent pages such as pricing, find the right contacts, and alert the account owner with context, or trigger a short sequence for unowned accounts. Respect privacy rules in each region and avoid creepy messaging that mentions the visit directly.',
          lookFor: 'Intent use with good taste and compliance.',
        },
      ],
    },
    {
      id: 'technical',
      title: 'Data, APIs and technical skills',
      blurb: 'Expect a live task: SQL, an API call or a small script.',
      questions: [
        {
          q: 'Write SQL to find accounts with an open opportunity but no activity in 14 days.',
          answer:
            "Join opportunities to activities and filter: SELECT o.account_id, o.id FROM opportunities o LEFT JOIN activities a ON a.opportunity_id = o.id AND a.created_at >= CURRENT_DATE - INTERVAL '14 days' WHERE o.status = 'open' GROUP BY o.account_id, o.id HAVING COUNT(a.id) = 0;\n\nThen explain how you would turn this into a weekly alert to each owner.",
          lookFor: 'Correct join logic and a workflow use for the result.',
        },
        {
          q: 'How do you deduplicate contacts across a CRM and an enrichment tool?',
          answer:
            'Pick matching keys in order of reliability: email, then LinkedIn URL, then name plus company domain. Normalise them (lowercase, trim, strip tracking parameters). Decide which source wins for each field, merge, and log merges so they can be reversed. Prevent new duplicates with a check before records are created.',
          lookFor: 'Matching keys, field precedence and prevention.',
        },
        {
          q: 'An enrichment API is rate-limited to 10 requests per second. How do you enrich 200,000 records?',
          answer:
            'Queue the records and process them in batches under the limit with backoff on errors; at 10 per second that is about 5.5 hours. Cache results so you never pay twice for the same record, skip records already enriched recently, and run it as a scheduled job with logging and a resume point.',
          lookFor: 'Throughput math, caching and resumability.',
        },
        {
          q: 'What is a webhook, and how would you use one in a GTM stack?',
          answer:
            'A webhook is an HTTP call one system sends to another when an event happens. Example: when a form is submitted, the form tool sends a webhook to your workflow, which enriches the lead, scores it and creates the CRM record with an owner within seconds.',
          lookFor: 'A clear definition with a GTM example.',
        },
        {
          q: 'How do you keep email deliverability healthy at scale?',
          answer:
            'Use separate sending domains from your main domain, set up SPF, DKIM and DMARC, warm new inboxes gradually, keep daily volume per inbox modest, verify emails before sending, remove bounces, make unsubscribing easy, and watch bounce and spam-complaint rates daily.',
          lookFor: 'Authentication, volume discipline and monitoring.',
        },
      ],
    },
    {
      id: 'ai',
      title: 'AI agents for go-to-market',
      blurb: 'Increasingly the main differentiator between candidates.',
      questions: [
        {
          q: 'Design an AI agent that writes account research briefs for reps before calls.',
          answer:
            'Inputs: account and contact names from the CRM meeting. Tools: company website, news search, the CRM history and product usage data. Output: a one-page brief with company context, likely pains, recent signals, past interactions and three suggested questions, each claim with a source. Check quality with reps on 30 briefs, measure usage and time saved, and limit cost per brief.',
          lookFor: 'Tool use, sourced output and adoption measurement.',
        },
        {
          q: 'How do you stop AI-written outreach from making things up about a prospect?',
          answer:
            'Only let the model use facts you supply from enrichment, tell it not to invent anything else, ask it to return the source for each claim, validate outputs automatically (for example, block emails that mention a fact not in the input) and spot-check samples before each send.',
          lookFor: 'Grounding and automated checks.',
        },
        {
          q: 'Where would a voice AI agent fit into a GTM motion?',
          answer:
            'Common uses: calling inbound leads within a minute to qualify and book meetings, reactivating old leads, confirming meetings to reduce no-shows, and letting reps practise calls with an AI roleplay. Measure connect rate, qualified meetings and cost per meeting against human calling, and make it easy to reach a person.',
          lookFor: 'Realistic use cases and comparison metrics.',
        },
        {
          q: 'How do you measure whether an AI GTM workflow is worth its cost?',
          answer:
            'Compare cost per record or per meeting (tool fees, AI tokens, data credits) with the value: extra meetings, pipeline and hours saved, versus the old process. Run it on a holdout group where possible so you measure real lift rather than activity.',
          lookFor: 'Unit economics and a fair comparison.',
        },
      ],
    },
    {
      id: 'stakeholders',
      title: 'Stakeholders and behavioural',
      blurb: 'You serve sales and marketing leaders. Show you can earn their trust.',
      questions: [
        {
          q: 'Sales leadership wants a new workflow by Monday. Your backlog is full. What do you do?',
          answer:
            'Ask what outcome it drives and compare it with what is in the backlog using expected pipeline impact and effort. Offer a quick version if one exists, agree on what moves down, and make the trade-off visible to the people affected.',
          lookFor: 'Prioritisation by impact, made transparent.',
        },
        {
          q: 'Reps are not using the tool you built. What do you do?',
          answer:
            'Talk to reps and watch them work. Usually the tool adds a step, lives in the wrong place or is not trusted. Fix the workflow (put it where they already work), show early wins from a few champions and remove the old manual path once it works.',
          lookFor: 'User empathy and adoption tactics.',
        },
        {
          q: 'Tell me about a campaign or workflow that failed.',
          answer:
            'Own it with numbers: what you expected, what happened, why (often targeting or deliverability), and what you changed. Show that you shut it down quickly rather than letting it run.',
          lookFor: 'Ownership and fast learning.',
        },
        {
          q: 'How do you explain the impact of your work to a CRO?',
          answer:
            'In pipeline and revenue terms: meetings, pipeline created, win rate and cost compared with the alternative, with a simple dashboard and one recommendation for what to do next.',
          lookFor: 'Business language, not tool language.',
        },
        {
          q: 'How do you stay current when GTM tools change every month?',
          answer:
            'Mention specific habits: communities you are active in, tools you test in a sandbox, how you decide when a new tool is worth switching to (it must beat the current one on cost, quality or speed in a small test).',
          lookFor: 'A deliberate learning system.',
        },
      ],
    },
  ],
  plans: [
    {
      days: '7 days',
      title: 'Interview next week',
      tasks: [
        'Day 1: Write up two workflows you built, with before-and-after numbers.',
        'Day 2: Build a small Clay or n8n workflow: enrich 50 accounts, score them, draft one line each.',
        'Day 3: Practise 3 outbound-design questions with funnel math out loud.',
        'Day 4: Refresh SQL joins and window functions; do 5 CRM-style queries.',
        'Day 5: Learn deliverability basics: SPF, DKIM, DMARC, warming and volume limits.',
        'Day 6: Take a full AI mock interview and fix the weakest answer.',
        "Day 7: Study the company's ICP and sales motion; prepare 3 ideas for their funnel.",
      ],
    },
    {
      days: '14 days',
      title: 'Two weeks to build a portfolio',
      tasks: [
        'Week 1: Everything in the 7-day plan.',
        'Week 2: Build a public portfolio project: an AI research-brief agent or a signal-based outbound workflow.',
        'Write a short case study with screenshots and results.',
        'Do two mock interviews: one workflow design, one stakeholder scenario.',
      ],
    },
    {
      days: '30 days',
      title: 'A month to switch into GTM engineering',
      tasks: [
        'Week 1: Learn Clay, HubSpot (free CRM) and n8n through official tutorials.',
        'Week 2: Learn enough Python or JavaScript to call APIs and process CSVs.',
        "Week 3: Run a real small campaign for a friend's business or a student project and measure it.",
        'Week 4: Package three case studies, practise 15 questions and reach out to GTM engineers for referrals.',
      ],
    },
  ],
  resources: [
    {
      title: 'Clay University cohorts',
      url: 'https://www.clay.com/university/cohorts',
      kind: 'Course',
      why: 'Structured training from the company that popularised GTM engineering.',
    },
    {
      title: 'Clay Community',
      url: 'https://www.clay.com/fr/community',
      kind: 'Community',
      why: 'Where GTM engineers share workflows, ask questions and find jobs.',
      free: true,
    },
    {
      title: 'Vercel GTM Engineer posting',
      url: 'https://job-boards.greenhouse.io/vercel/jobs/5777645004',
      kind: 'Job description',
      why: 'What an engineering-heavy GTM role expects: Next.js, AI agents and shipping daily.',
      free: true,
    },
    {
      title: 'Peec AI GTM Engineer posting',
      url: 'https://careers.antler.co/companies/peec-ai/jobs/62875307-founding-gtm-engineer',
      kind: 'Job description',
      why: 'What a startup GTM role expects: Clay, HubSpot, n8n and 3–5 campaigns a month.',
      free: true,
    },
    {
      title: 'Building effective agents (Anthropic)',
      url: 'https://www.anthropic.com/engineering/building-effective-agents',
      kind: 'Guide',
      why: 'Agent patterns to apply to research and outreach workflows.',
      free: true,
    },
    {
      title: 'Best AI voice agents for cold calling',
      url: '/blog/best-ai-voice-agents-cold-calling-2026',
      kind: 'Our guide',
      why: 'Where voice AI fits in an outbound motion, with tools compared.',
      free: true,
    },
    {
      title: 'Build a voice AI agent without code',
      url: '/blog/build-voice-ai-agent-no-code-minutes-guide-2026',
      kind: 'Our guide',
      why: 'A quick portfolio project: an AI agent that qualifies inbound leads.',
      free: true,
    },
    {
      title: 'Cold call simulator',
      url: '/cold-call-practice',
      kind: 'Tool',
      why: 'Practise the sales conversations your workflows will feed.',
      free: true,
    },
    {
      title: 'Best tools for a SaaS hackathon',
      url: '/blog/best-tools-saas-hackathon-2026',
      kind: 'Our guide',
      why: 'The modern SaaS stack (CRM-adjacent tools, email, analytics) explained.',
      free: true,
    },
  ],
  related: [
    { label: 'Growth Manager hub', href: '/growth' },
    { label: 'Sales SDR resume template', href: '/cv-templates/sales-sdr' },
    { label: 'Free AI mock interview', href: '/free-mock-interview' },
    { label: 'Forward Deployed Engineer hub', href: '/fde' },
  ],
  faqs: [
    {
      q: 'What does a GTM engineer do?',
      a: 'A GTM engineer builds the systems a sales and marketing team runs on: data enrichment, lead scoring and routing, outbound automation, CRM workflows and AI agents for research and outreach. They use tools such as Clay, HubSpot and n8n plus code, and are measured on pipeline.',
    },
    {
      q: 'How much does a GTM engineer earn?',
      a: 'Levels.fyi reports a median total compensation of $140,000 in the US (24 salaries) and about ₹31.9 lakh in India (10 salaries), as of late 2026. Glassdoor reports a US average of about $192,000. Samples are small because the title is new.',
    },
    {
      q: 'Do GTM engineers need to code?',
      a: "It depends on the company. Startup roles often centre on Clay, HubSpot and automation tools with some Python or JavaScript. Engineering-heavy roles, such as Vercel's, require years of full-stack development and shipping production apps.",
    },
    {
      q: 'Is GTM engineer the same as RevOps?',
      a: 'They overlap, but RevOps traditionally configures systems and reports on the funnel, while GTM engineers build automated workflows, integrations and AI agents that generate pipeline. Many GTM engineers come from RevOps.',
    },
    {
      q: 'How do I become a GTM engineer with no experience?',
      a: 'Learn Clay, a CRM and an automation tool, learn enough Python or JavaScript to call APIs, then build and measure a real outbound or research workflow for a small business or project. Publish the case study and practise workflow-design interview questions.',
    },
  ],
}

export default gtmEngineer
