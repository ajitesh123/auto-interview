import type { RoleHub } from './types'

const fde: RoleHub = {
  slug: 'fde',
  visuals: {
    hero: {
      mp4: '/static/images/roles/fde/hero.mp4',
      image: '/static/images/roles/fde/hero.webp',
      alt: 'Forward Deployed Engineer role hub: interview questions, pay in rupees, dollars, pounds and euros, and who is hiring',
    },
    pay: {
      mp4: '/static/images/roles/fde/pay.mp4',
      image: '/static/images/roles/fde/pay.webp',
      alt: 'Median total pay for Forward Deployed Engineers in the US is $220K (Levels.fyi, Nov 2026)',
    },
    hiring: {
      image: '/static/images/roles/fde/hiring.webp',
      alt: 'New Forward Deployed Engineers by company in 2025–26: Palantir 387, Salesforce 275, Databricks 162, UnifyApps 153, OpenAI 57 (Apollo.io, Nov 3, 2026)',
    },
    og: '/static/images/roles/fde/og.jpg',
  },
  roleName: 'Forward Deployed Engineer',
  shortName: 'FDE',
  metaTitle: 'Forward Deployed Engineer Interview Guide 2026: Questions & Pay',
  metaDescription:
    'FDE interview prep: what forward deployed engineers do, 28 questions with model answers, Palantir and AI-lab interview loops, pay in India, US and Europe, and who is hiring.',
  keywords: [
    'forward deployed engineer',
    'forward deployed engineer interview questions',
    'forward deployed engineer salary',
    'forward deployed engineer salary india',
    'palantir forward deployed software engineer interview',
    'what is a forward deployed engineer',
    'fde interview preparation',
  ],
  heroTitle: 'Forward Deployed Engineer interview prep',
  heroDescription:
    'What FDEs really do at Palantir, OpenAI, Anthropic, Databricks and AI startups, the interview loop round by round, 28 questions with model answers, and real pay data.',
  directAnswer:
    "A Forward Deployed Engineer (FDE) is a software engineer who works directly with a customer to get a product working on that customer's real data, systems and workflows. FDEs write production code, but they also scope problems with business stakeholders, travel to customer sites (often 25–50% of the time) and feed what they learn back to the product team. Interviews test coding, problem decomposition, system design and customer communication.",
  lastUpdated: '2026-11-03',
  whatTheRoleIs: [
    'Palantir made the role famous: its postings describe embedding engineers directly with customers to solve their hardest problems and owning projects from the first conversation to deployment. In 2025–26 AI companies adopted the model, because getting an AI model to work inside a bank, hospital or factory takes engineering, not just a sales demo.',
    'An FDE sits between a software engineer and a consultant. You write real code (integrations, data pipelines, agents, internal apps), but your success is measured by whether the customer gets the outcome, not by how many tickets you close.',
    "Because you see every customer's edge cases first, you also act as the product team's eyes in the field: spotting patterns that should become product features instead of one-off code.",
  ],
  expectations: {
    b2b: {
      headline:
        'B2B and government (almost all FDE roles): make the platform work inside one customer',
      points: [
        'Scope the problem with the customer: who uses it, which decision or workflow it changes, and how success will be measured.',
        'Connect messy enterprise systems: databases, data warehouses, CRMs, ERPs, document stores and identity providers, often under strict security rules.',
        'Build the solution end to end: data pipelines, an internal app or an AI agent, with logging, tests and access controls good enough for production.',
        "For AI deployments, build the evaluation set from the customer's real examples and show measured accuracy before go-live.",
        'Run the relationship: weekly demos, managing expectations with executives and end users, and saying no to scope that will not deliver value.',
        'Write up repeatable patterns and send them to product and engineering so the next deployment is faster.',
      ],
      metrics: [
        'Time to first value (first workflow live)',
        "Adoption by the customer's end users",
        'Business outcome agreed at kickoff',
        'Accuracy on the customer eval set',
        'Expansion and renewal of the account',
        'Patterns turned into product features',
      ],
    },
    b2c: {
      headline: "B2C (rare): deploy AI into a customer's consumer-facing product",
      points: [
        'Some FDEs work with consumer brands, banks or telecoms to launch AI their end customers use directly, such as support chat, voice agents or shopping assistants.',
        'The bar is higher on latency, scale and safety because thousands of consumers see every mistake within hours.',
        'Expect work on traffic spikes, multilingual users, abuse and handover to human agents.',
        "Success is measured on the customer's consumer metrics, so you work closely with their product and analytics teams.",
      ],
      metrics: [
        'Containment or self-serve resolution rate',
        'Consumer CSAT',
        'p95 latency under peak load',
        'Escalation to human rate',
        'Safety and policy incidents',
      ],
    },
    difference: [
      "You are judged on the customer's outcome, not only on code quality.",
      'You talk to executives and end users weekly, not just to other engineers.',
      "You work on the customer's infrastructure and security rules, not your own clean stack.",
      'Travel is part of the job: Palantir and Anthropic postings list 25–50%.',
      'Scope changes constantly, so prioritisation and saying no are core skills.',
    ],
  },
  skills: [
    {
      area: 'Engineering',
      items: [
        'Strong coding in Python plus TypeScript or Java',
        'SQL and data modelling on messy real data',
        'APIs, authentication and integrations',
        'Shipping and debugging in production',
      ],
    },
    {
      area: 'AI deployment',
      items: [
        'Prompting, retrieval (RAG) and tool calling',
        'Building agents and MCP servers',
        'Designing evals from customer examples',
        'Latency, cost and failure handling',
      ],
    },
    {
      area: 'Customer craft',
      items: [
        'Discovery: turning a vague ask into a scoped problem',
        'Explaining technical trade-offs to non-engineers',
        'Running demos and weekly check-ins',
        'Managing scope and expectations',
      ],
    },
    {
      area: 'Ownership',
      items: [
        'Working with little structure and high ambiguity',
        'Learning a new codebase or domain fast',
        'Writing up patterns for the product team',
        'Comfort with travel and on-site work',
      ],
    },
  ],
  process: [
    {
      companyType: 'Palantir (Forward Deployed Software Engineer)',
      rounds: [
        'Recruiter call focused on motivation and "why Palantir"',
        'Technical screen: live coding or an online assessment (coding, SQL, API task)',
        'Decomposition: break a vague real-world problem into a buildable solution',
        'Learning or re-engineering: extend or debug an unfamiliar codebase',
        'Hiring manager round, often with team matching',
      ],
    },
    {
      companyType: 'AI labs (OpenAI, Anthropic)',
      rounds: [
        'Recruiter screen',
        'Technical screen: practical coding in Python',
        'Build exercise: an LLM app, agent or integration, often take-home',
        'Customer scenario: scope and present a deployment to a mock stakeholder',
        'System design and values interviews',
      ],
    },
    {
      companyType: 'Data and enterprise platforms (Databricks, Salesforce, UiPath)',
      rounds: [
        'Recruiter and hiring manager screens',
        'Coding and SQL round',
        'Solution design for a customer use case on their platform',
        'Presentation or demo to a panel',
        'Behavioural round on customer situations',
      ],
    },
    {
      companyType: 'AI startups and Indian product companies',
      rounds: [
        'Founder or hiring manager call',
        'Take-home: build a small working integration or agent',
        'Walkthrough of your take-home and past projects',
        'Customer roleplay: a difficult stakeholder or a vague brief',
        'Culture and offer conversation',
      ],
    },
  ],
  pay: {
    intro:
      'Levels.fyi tracks Forward Deployed Engineer as its own title. Samples are smaller than for general software engineers, so we show the FDE data and point to broader software-engineer data where FDE data is thin.',
    tables: [
      {
        region: 'United States',
        currency: 'USD per year (total compensation)',
        rows: [
          {
            band: '25th percentile',
            experience: 'Typically early career (0–2 yrs)',
            value: '$170K',
          },
          { band: 'Median', experience: 'Typically mid-level (2–5 yrs)', value: '$220K' },
          { band: '75th percentile', experience: 'Typically senior (5–8 yrs)', value: '$292K' },
          {
            band: '90th percentile',
            experience: 'Typically staff or lead (8+ yrs)',
            value: '$354K',
          },
        ],
        note: 'Forward Deployed Engineer title, United States. Levels.fyi does not publish the sample size for this page. For one employer, Levels.fyi tracks 229 Palantir FDE submissions with a $233K median.',
        sourceLabel: 'Levels.fyi, Forward Deployed Engineer, US',
        sourceUrl: 'https://www.levels.fyi/t/software-engineer/title/forward-deployed-engineer',
        asOf: 'Updated Nov 3, 2026',
      },
      {
        region: 'India',
        currency: 'INR, lakh per annum (total compensation)',
        rows: [
          {
            band: '25th percentile',
            experience: 'Typically early career (0–2 yrs)',
            value: '₹16.2 LPA',
          },
          { band: 'Median', experience: 'Typically mid-level (2–5 yrs)', value: '₹17.7 LPA' },
          { band: '75th percentile', experience: 'Typically senior (5–8 yrs)', value: '₹42.2 LPA' },
          {
            band: '90th percentile',
            experience: 'Typically staff or lead (8+ yrs)',
            value: '₹55.9 LPA',
          },
        ],
        note: 'Forward Deployed Engineer title, India. The sample is small and not published, which is why the 25th percentile and median sit close together. For comparison, all software engineers in India have a ₹30.6 LPA median across 21,657 salaries.',
        sourceLabel: 'Levels.fyi, Forward Deployed Engineer, India',
        sourceUrl:
          'https://www.levels.fyi/t/software-engineer/title/forward-deployed-engineer/locations/india',
        asOf: 'Updated Nov 2, 2026',
      },
      {
        region: 'Europe: United Kingdom',
        currency: 'GBP per year (total compensation)',
        rows: [
          {
            band: '25th percentile',
            experience: 'Typically early career (0–2 yrs)',
            value: '£89.6K',
          },
          { band: 'Median', experience: 'Typically mid-level (2–5 yrs)', value: '£140K' },
          { band: '75th percentile', experience: 'Typically senior (5–8 yrs)', value: '£174K' },
          {
            band: '90th percentile',
            experience: 'Typically staff or lead (8+ yrs)',
            value: '£201K',
          },
        ],
        note: "Forward Deployed Engineer title, United Kingdom, shown in pounds as reported. London is Europe's largest FDE market. Sample size not published.",
        sourceLabel: 'Levels.fyi, Forward Deployed Engineer, UK',
        sourceUrl:
          'https://www.levels.fyi/t/software-engineer/title/forward-deployed-engineer/locations/united-kingdom',
        asOf: 'Updated Oct 26, 2026',
      },
      {
        region: 'Europe: Germany',
        currency: 'EUR per year (total compensation)',
        rows: [
          {
            band: '25th percentile',
            experience: 'Typically early career (0–2 yrs)',
            value: '€70.5K',
          },
          { band: 'Median', experience: 'Typically mid-level (2–5 yrs)', value: '€84.9K' },
          { band: '75th percentile', experience: 'Typically senior (5–8 yrs)', value: '€102K' },
          {
            band: '90th percentile',
            experience: 'Typically staff or lead (8+ yrs)',
            value: '€126K',
          },
        ],
        note: 'All software engineers in Germany (2,964 salaries), because Levels.fyi has no FDE-specific data for Germany yet. FDE roles usually pay above this baseline. In the Netherlands, Levels.fyi lists an FDE median of €172,081, but no percentiles or sample size.',
        sourceLabel: 'Levels.fyi, Software Engineer, Germany',
        sourceUrl: 'https://www.levels.fyi/t/software-engineer/locations/germany',
        asOf: 'Updated Nov 1, 2026',
      },
    ],
    crossCheck:
      "Posted base salary ranges, checked Nov 3, 2026: Palantir Forward Deployed Software Engineer, New York, $135,000–$200,000 (1+ years' experience); Palantir FDSE New Grad, Chicago, $135,000–$145,000; Anthropic Forward Deployed Engineer, Applied AI, $200,000–$300,000 (4+ years in a technical customer-facing role). Base pay excludes equity and bonus.",
  },
  hiring: {
    intro:
      'Companies with the most people who started a Forward Deployed Engineer title in 2025–26. No public source reports hires per company, so this counts people whose current title is an FDE title and who started it in the last 22 months.',
    companies: [
      { name: 'Palantir', count: 387, segment: 'Data and AI platform' },
      { name: 'Salesforce', count: 275, segment: 'Enterprise SaaS' },
      { name: 'Databricks', count: 162, segment: 'Data and AI platform' },
      { name: 'UnifyApps', count: 153, segment: 'AI startup (India)' },
      { name: 'OpenAI', count: 57, segment: 'AI lab' },
      { name: 'C3 AI', count: 51, segment: 'Enterprise AI' },
      { name: 'Scale AI', count: 24, segment: 'AI data and apps' },
      { name: 'UiPath', count: 23, segment: 'Automation' },
      { name: 'Rippling', count: 14, segment: 'HR and finance SaaS' },
    ],
    method:
      'Source: Apollo.io people database, searched Nov 3, 2026. Titles counted: Forward Deployed Engineer, Forward Deployed Software Engineer, Senior Forward Deployed Engineer and Forward Deployed AI Engineer, held for 670 days or less. Across all companies, 8,443 people match, including 1,404 based in India, where UnifyApps, gnani.ai, Databricks and Skit.ai appear most often. Counts are a lower bound: variants such as "Forward Deployed Engineer, Applied AI" are not included, which is why some AI labs show few or none.',
    sourceLabel: 'Apollo.io people search',
    asOf: 'Nov 3, 2026',
  },
  questionGroups: [
    {
      id: 'common',
      title: 'Common opening questions',
      blurb:
        'Every FDE loop starts here. Your answers must show you want customer work, not just coding.',
      questions: [
        {
          q: 'Why do you want to be a forward deployed engineer rather than a software engineer?',
          answer:
            'Show that you want the customer side, not that you are settling for it. A strong answer names what energises you: seeing your code change how a real team works, solving messy problems with no clean spec, and owning the outcome.\n\nBack it with evidence: a time you sat with users, debugged something on a customer call, or built a tool for a non-technical team and watched them use it.',
          lookFor: 'Genuine pull toward customers and outcomes, with a real example.',
        },
        {
          q: 'Tell me about a time you built something for a non-technical user.',
          answer:
            'Use situation, task, action, result. Spend time on how you learned what they actually needed (watching them work, asking about their week), the trade-offs you made to ship fast, and the measurable result, such as hours saved or errors avoided.',
          lookFor: 'Empathy, speed to value, and a number at the end.',
        },
        {
          q: 'How do you handle travelling to customer sites 25–50% of the time?',
          answer:
            'Be honest and practical. Explain what you value in being on site (faster trust, seeing the real workflow) and how you stay productive (clear weekly goals, async updates to your team). If you have constraints, say so; recruiters prefer honesty to a mismatch later.',
          lookFor: 'Realistic expectations about the job.',
        },
        {
          q: 'Why this company?',
          answer:
            "Tie the company's product to the kind of problems you want to solve. For Palantir, mention specific domains (government, healthcare, manufacturing) and the outcome-ownership culture. For an AI lab, mention a deployment pattern you find interesting, such as agents in regulated industries, and something you built with their models.",
          lookFor: 'Specific knowledge of the product and its customers.',
        },
      ],
    },
    {
      id: 'decomposition',
      title: 'Problem decomposition and customer scoping',
      blurb: "Palantir's signature round, now used by many AI companies. Structure out loud.",
      questions: [
        {
          q: 'A hospital says patients wait too long in the emergency room. How would you help?',
          answer:
            'Clarify first: which hospital, how long is "too long", who feels the pain (patients, nurses, administrators), and what decision someone could make differently with better information.\n\nBreak the problem down: arrival forecasting, triage, bed availability, staffing and discharge delays. Ask what data exists (admission records, bed management, staff rosters).\n\nPropose a first deliverable: a live view of bed status and expected discharges for the bed manager, built on existing systems. Define success, such as median wait time and the share of patients seen within the target, and the next steps if it works.',
          lookFor:
            'Clarifying questions, a clear breakdown, a small first deliverable and a success metric.',
        },
        {
          q: 'A logistics company wants to "use AI". Where do you start?',
          answer:
            'Turn the vague ask into a problem. Ask about their biggest costs and delays: fuel, failed deliveries, customer service volume, manual paperwork. Pick one with data available and clear money attached, for example manual processing of delivery documents.\n\nPropose a pilot: extract fields from documents with an LLM, check them against the order system, route exceptions to a human. Agree on accuracy and hours saved as success measures before building.',
          lookFor: 'Pushing back on "use AI" and converging on a measurable pilot.',
        },
        {
          q: 'Design a system to help a manufacturer predict machine failures.',
          answer:
            'Clarify the decision: should maintenance be scheduled earlier, or parts ordered sooner? Identify data: sensor readings, maintenance logs, failure history.\n\nComponents: ingestion from machines, cleaning and labelling of past failures, a model or rules that flag risk, and an app or alert that maintenance staff actually use. Start with simple thresholds and the top failure mode, measure precision of alerts with the maintenance team, then improve.',
          lookFor: 'Starting simple, involving the end user and measuring alert quality.',
        },
        {
          q: "A customer's executive and their engineers want different things. What do you do?",
          answer:
            "Understand both goals. Usually the executive wants an outcome and the engineers worry about risk or workload. Find the version of the project that serves the executive's outcome while addressing the engineers' concerns, such as phased rollout or shared ownership. Put the agreed plan and success measures in writing and check in weekly.",
          lookFor: 'Stakeholder judgement and written alignment.',
        },
        {
          q: "How would you scope a 6-week AI pilot for a bank's customer support team?",
          answer:
            'Week 1: map top contact reasons, pick two high-volume, low-risk ones (card status, statement requests). Agree on data access and security review.\n\nWeeks 2–4: build the agent with retrieval over approved policy documents, tool calls to read-only account APIs, and a human handoff. Build an eval set from 200 real anonymised conversations.\n\nWeeks 5–6: shadow mode, then a small live rollout. Success: accuracy on the eval set, containment rate, CSAT and zero policy violations. End with a go or no-go review.',
          lookFor: 'Realistic phasing, security awareness and pre-agreed success criteria.',
        },
      ],
    },
    {
      id: 'coding',
      title: 'Coding, data and debugging',
      blurb: 'Practical problems, not puzzles. Expect messy inputs and real-world framing.',
      questions: [
        {
          q: 'Given a CSV of transactions with duplicates and missing fields, produce daily totals per customer.',
          answer:
            'Clarify what counts as a duplicate (same id, or same amount and timestamp?) and how to treat missing values. Then: parse with a tolerant reader, normalise types and time zones, drop or flag duplicates, group by customer and date, and sum. Write a couple of tests for edge cases (empty file, all duplicates, bad dates) and say how you would run it daily at scale (a scheduled job or SQL in the warehouse).',
          lookFor: 'Clarifying data rules, clean code and tests.',
        },
        {
          q: "Write a SQL query for each customer's most recent order and the number of orders in the last 30 days.",
          answer:
            "Use a window function to rank orders by date per customer and keep rank 1, joined with a filtered count:\n\nSELECT o.customer_id, o.order_id, o.created_at, c.orders_30d FROM (SELECT *, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY created_at DESC) AS rn FROM orders) o JOIN (SELECT customer_id, COUNT(*) AS orders_30d FROM orders WHERE created_at >= CURRENT_DATE - INTERVAL '30 days' GROUP BY customer_id) c ON c.customer_id = o.customer_id WHERE o.rn = 1;\n\nMention that customers with no recent orders drop out of the inner join, so use a LEFT JOIN and COALESCE if they must appear.",
          lookFor: 'Window functions and attention to edge cases.',
        },
        {
          q: 'Here are 400 lines of unfamiliar code with a bug. How do you approach it?',
          answer:
            'Reproduce the bug first. Read the entry point and trace the path the failing input takes rather than reading every line. Add logging or a breakpoint at the boundary where data looks wrong, narrow down, then fix the root cause, add a test and check for the same bug elsewhere. Narrate your reasoning so the interviewer can follow.',
          lookFor: 'A calm, systematic method, talked through out loud.',
        },
        {
          q: 'You have one hour to learn a new library and add a feature. How do you work?',
          answer:
            'Spend the first ten minutes on the README, examples and the main types or functions. Get a minimal example running, then build the feature in small steps, testing each one. Ask the interviewer questions when you are blocked; this round tests how you learn, not whether you already know the library.',
          lookFor: 'Fast learning with small verified steps.',
        },
        {
          q: 'An API you integrate with is rate-limited and sometimes fails. How do you make your integration reliable?',
          answer:
            'Retry with exponential backoff and jitter on errors that can safely be retried, respect rate-limit headers, make writes idempotent with request ids, queue work so spikes do not drop data, set timeouts, and add monitoring and alerts for failure rates. Store failed items for replay.',
          lookFor: 'Production-grade reliability thinking.',
        },
        {
          q: 'Implement a function that merges overlapping time ranges.',
          answer:
            'Sort ranges by start time, then walk through them: if the next range starts before the current one ends, extend the end; otherwise push the current range and start a new one. That is O(n log n) for the sort. Mention edge cases: touching ranges, empty input and unsorted input. In customer terms: merging shift schedules or booking slots.',
          lookFor: 'Correct algorithm, edge cases and a real-world framing.',
        },
      ],
    },
    {
      id: 'ai-deployment',
      title: 'AI deployment and system design',
      blurb: 'Most new FDE roles are AI deployments. Know these patterns cold.',
      questions: [
        {
          q: 'Design an AI agent that answers employee HR questions using company policies.',
          answer:
            "Ingest policy documents, chunk them, embed them and store them with metadata (country, effective date). On a question: retrieve relevant chunks filtered by the employee's country, generate an answer that cites the policy, and refuse when sources are missing. Add tools for personal data only through authenticated APIs. Evaluate on 150 real questions labelled by HR, monitor feedback and escalate sensitive topics to a human.",
          lookFor: 'Retrieval with permissions, citations, evals and escalation.',
        },
        {
          q: 'The customer says the AI gives wrong answers. How do you debug it?',
          answer:
            'Collect 20–50 failing examples. For each, check: was the right document retrieved, was it in the prompt, did the model misread it, or is the source itself wrong? Group the failures. Fixes differ: better chunking or filters for retrieval misses, prompt changes for reasoning errors, data fixes for bad sources. Add the cases to the eval set so they stay fixed.',
          lookFor: 'Separating retrieval, generation and data problems.',
        },
        {
          q: 'What is an MCP server and when would you build one for a customer?',
          answer:
            'The Model Context Protocol (MCP) is an open standard for connecting AI applications to tools and data. An MCP server exposes a system, such as a ticketing tool or a database, as tools a model can call. Build one when a customer wants several AI apps or agents to use the same internal system safely, with consistent permissions and logging, instead of custom glue for each app.',
          lookFor: 'A clear definition and a practical reason to use it.',
        },
        {
          q: 'How do you keep customer data safe when deploying an LLM application?',
          answer:
            "Follow the customer's data rules: where data can be processed, retention, and whether it can train models. Use least-privilege access for tools, redact sensitive fields where possible, log access, protect against prompt injection by treating retrieved content as data, and get security review sign-off before launch.",
          lookFor: 'Security as a design input, not an afterthought.',
        },
        {
          q: 'Latency is too high for a voice agent you deployed. What do you change?',
          answer:
            'Measure each step: speech-to-text, model time to first token, tool calls and text-to-speech. Then stream every stage, use a faster model for the first response, run tool calls in parallel or ahead of time, shorten prompts, and keep the conversation state small. Re-measure p95, not just the average.',
          lookFor: 'Measuring before optimising, and voice-specific levers.',
        },
        {
          q: "How would you design an evaluation for a customer's document-extraction pipeline?",
          answer:
            'Sample real documents across types and quality, including bad scans. Have the customer label the expected fields. Measure field-level precision and recall, plus the share of documents fully correct. Track cost and latency per document and set thresholds for automatic approval versus human review.',
          lookFor: 'Customer-labelled data and thresholds tied to workflow.',
        },
        {
          q: 'When should you write custom code for one customer versus push for a product feature?',
          answer:
            'Write custom code when it unblocks a valuable customer quickly and is unlikely to repeat. Push for a product feature when you see the same need in several customers or the custom code would be expensive to maintain. Document the pattern either way and share it with product with evidence: number of customers, revenue at stake and workaround cost.',
          lookFor: 'Balancing customer speed with product leverage.',
        },
      ],
    },
    {
      id: 'customer',
      title: 'Customer scenarios and behavioural',
      blurb: 'Interviewers often roleplay the customer. Stay calm, curious and concrete.',
      questions: [
        {
          q: 'The customer wants a feature by Friday that you think is a bad idea. What do you do?',
          answer:
            'Ask what problem the feature solves and why Friday matters. Often there is a simpler way to meet the real need by Friday. Explain the risk in their terms, offer the alternative and, if they still want it, agree on what is in and out and document the trade-off.',
          lookFor: 'Curiosity before pushback, and a constructive alternative.',
        },
        {
          q: 'Tell me about a time a project with a customer or stakeholder went badly.',
          answer:
            'Own your part. Describe what went wrong (unclear scope, missed signals), how you recovered (reset expectations, delivered a smaller win) and what you do differently now, such as written success criteria at kickoff.',
          lookFor: 'Ownership and a specific lesson.',
        },
        {
          q: 'A customer engineer is hostile and blocks your access to their systems. How do you handle it?',
          answer:
            'Understand their concern: security, extra workload or feeling bypassed. Meet them, show exactly what access you need and why, offer to work within their process, and give them credit for the result. Escalate only if the project is at real risk, and do it transparently.',
          lookFor: 'Turning a blocker into an ally.',
        },
        {
          q: 'Explain a technical trade-off to a non-technical executive.',
          answer:
            'Pick a real example, such as faster delivery with a manual step versus a fully automated version in six more weeks. Use their language: cost, risk, time and outcome. Recommend one option and say what would change your mind.',
          lookFor: 'Plain language and a clear recommendation.',
        },
        {
          q: 'Tell me about a time you had to learn a new domain quickly.',
          answer:
            'Describe how you learned: talking to experts, reading their documents, shadowing users, writing a glossary. Show how quickly you became useful and what you delivered.',
          lookFor: 'A repeatable learning method.',
        },
        {
          q: 'Tell me about something you owned end to end.',
          answer:
            'Pick a project where you handled the messy parts too: unclear requirements, data access, deployment and support after launch. Show the outcome with a number and what you would do differently.',
          lookFor: 'True end-to-end ownership.',
        },
      ],
    },
  ],
  plans: [
    {
      days: '7 days',
      title: 'Interview next week',
      tasks: [
        'Day 1: Write your "why FDE" story and pick 6 customer-facing stories.',
        'Day 2: Practise 2 decomposition questions out loud, 45 minutes each.',
        'Day 3: Do 4 practical coding problems and 3 SQL window-function queries.',
        'Day 4: Learn RAG, tool calling, MCP and evals well enough to sketch an architecture.',
        'Day 5: Do one "learn a new library in an hour" exercise from scratch.',
        'Day 6: Take a full AI mock interview with a customer-roleplay question.',
        "Day 7: Research the company's customers and deployments; prepare 3 questions.",
      ],
    },
    {
      days: '14 days',
      title: 'Two weeks to build depth',
      tasks: [
        'Week 1: Everything in the 7-day plan.',
        'Week 2: Build a small agent with retrieval and one tool, plus a 30-example eval, and write it up.',
        'Practise two system design questions framed as customer deployments.',
        'Do two mock interviews: one decomposition, one customer roleplay.',
      ],
    },
    {
      days: '30 days',
      title: 'A month to switch into FDE',
      tasks: [
        'Week 1: Coding and SQL foundations on messy data; daily practical problems.',
        "Week 2: Build and deploy an AI integration for a real user (a friend's business, a college club).",
        'Week 3: Decomposition and system design practice; record and review.',
        'Week 4: Behavioural stories, company research, three mock interviews and referral outreach to FDEs.',
      ],
    },
  ],
  resources: [
    {
      title: 'Palantir Forward Deployed Software Engineer posting',
      url: 'https://jobs.lever.co/palantir/dab396d4-2f14-4796-aac0-0d82883dccf0',
      kind: 'Job description',
      why: "The original FDE role in Palantir's own words, with responsibilities and pay range.",
      free: true,
    },
    {
      title: 'Anthropic Forward Deployed Engineer, Applied AI posting',
      url: 'https://job-boards.greenhouse.io/anthropic/jobs/4985877008',
      kind: 'Job description',
      why: 'What an AI-lab FDE builds: MCP servers, sub-agents, evals and production deployments.',
      free: true,
    },
    {
      title: 'Building effective agents (Anthropic)',
      url: 'https://www.anthropic.com/engineering/building-effective-agents',
      kind: 'Guide',
      why: 'The clearest guide to agent patterns and when simpler workflows are better.',
      free: true,
    },
    {
      title: 'OpenAI Cookbook',
      url: 'https://developers.openai.com/cookbook',
      kind: 'Guide',
      why: 'Worked examples of retrieval, tool calling and evaluations.',
      free: true,
    },
    {
      title: 'System Design Primer',
      url: 'https://github.com/donnemartin/system-design-primer',
      kind: 'Guide',
      why: 'Free, widely used system design fundamentals for the design round.',
      free: true,
    },
    {
      title: "AI Engineering by Chip Huyen (O'Reilly)",
      url: 'https://www.oreilly.com/library/view/ai-engineering/9781098166298/',
      kind: 'Book',
      why: 'Building and evaluating applications on foundation models, end to end.',
    },
    {
      title: 'Build a real-time voice AI agent in Python',
      url: '/blog/build-your-first-real-time-voice-ai-agent-python-2026',
      kind: 'Our guide',
      why: 'A hands-on project that shows deployment skills in interviews.',
      free: true,
    },
    {
      title: 'Software engineer interview questions',
      url: '/interview-questions/software-engineer',
      kind: 'Our guide',
      why: 'Core engineering questions to pair with the FDE bank above.',
      free: true,
    },
    {
      title: 'Best coding interview platforms',
      url: '/blog/best-coding-interview-platforms',
      kind: 'Our guide',
      why: 'Where to practise the coding and SQL rounds.',
      free: true,
    },
  ],
  related: [
    { label: 'Software engineer resume template', href: '/cv-templates/software-engineer' },
    { label: 'Free AI mock interview', href: '/free-mock-interview' },
    { label: 'AI Product Manager hub', href: '/aipm' },
    { label: 'Best AI hackathon tools', href: '/blog/best-ai-hackathon-tools-2026' },
  ],
  faqs: [
    {
      q: 'What is a forward deployed engineer?',
      a: 'A forward deployed engineer is a software engineer who works directly with customers to make a product work on their real data and workflows. FDEs write production code, scope problems with business stakeholders and often travel to customer sites. The role started at Palantir and is now common at AI companies.',
    },
    {
      q: 'How much does a forward deployed engineer earn?',
      a: 'Levels.fyi reports a median total compensation of $220,000 for Forward Deployed Engineers in the US and about ₹17.7 lakh in India (small sample), as of November 2026. Posted base ranges include $135,000–$200,000 at Palantir in New York and $200,000–$300,000 at Anthropic for experienced FDEs.',
    },
    {
      q: 'Is a forward deployed engineer the same as a solutions engineer?',
      a: "No. Solutions engineers mainly support sales with demos and technical answers before a deal. Forward deployed engineers mainly build and deploy production solutions after or during a deal, and own the customer's outcome. Many FDEs write far more code.",
    },
    {
      q: 'What is the Palantir decomposition interview?',
      a: 'It is a round where you are given a vague real-world problem and must break it into parts, ask clarifying questions and sketch a buildable solution, including data and systems. Interviewers assess structure, judgement and communication more than a single right answer.',
    },
    {
      q: 'Can freshers become forward deployed engineers?',
      a: 'Yes. Palantir hires new graduates into its Forward Deployed Software Engineer role, with a posted New Grad base range of $135,000–$145,000 in Chicago. Strong coding, a practical project built for real users and clear communication matter most.',
    },
  ],
}

export default fde
