import type { RoleHub } from './types'

const LEVELS_NOTE =
  'Levels.fyi figures are total compensation (base + bonus + equity) for the Product Manager title across all levels, self-reported and verified by Levels.fyi. Its data over-represents large tech companies and well-funded startups, so many early-stage and services-company offers sit below these bands.'

const aipm: RoleHub = {
  slug: 'aipm',
  visuals: {
    hero: {
      mp4: '/static/images/roles/aipm/hero.mp4',
      image: '/static/images/roles/aipm/hero.webp',
      alt: 'AI Product Manager role hub: 30 interview questions, pay in rupees, dollars and euros, and who is hiring',
    },
    pay: {
      mp4: '/static/images/roles/aipm/pay.mp4',
      image: '/static/images/roles/aipm/pay.webp',
      alt: 'Median total pay for product managers in India is ₹45.4 LPA; US $233K, Germany €95K, Netherlands €112K (Levels.fyi, Nov 2026)',
    },
    hiring: {
      image: '/static/images/roles/aipm/hiring.webp',
      alt: 'New AI PMs by company in 2025–26: Microsoft 57, Google 47, Amazon 40, IBM 28, Meta 22 (Apollo.io, Nov 3, 2026)',
    },
    og: '/static/images/roles/aipm/og.jpg',
  },
  roleName: 'AI Product Manager',
  shortName: 'AI PM',
  metaTitle: 'AI Product Manager Interview Guide 2026: Questions & Salary',
  metaDescription:
    'AI PM interview prep: B2B vs B2C expectations, 30 questions with model answers, salary in India, US and Europe, companies hiring, a 30-day plan and a free AI mock interview.',
  keywords: [
    'ai product manager interview questions',
    'ai pm interview',
    'ai product manager salary india',
    'ai product manager salary',
    'ai product manager job description',
    'how to become an ai product manager',
    'ai pm interview preparation',
  ],
  heroTitle: 'AI Product Manager interview prep',
  heroDescription:
    'What AI PMs actually do in B2B and B2C teams, the questions you will be asked with model answers, real pay data for India, the US and Europe, and a plan to get ready.',
  directAnswer:
    'An AI Product Manager owns a product whose core behaviour comes from a machine learning model, usually a large language model. On top of normal PM work, they decide what the model should do, how quality is measured (evals), what it costs per task, and how to ship something non-deterministic safely. Interviews test product sense, AI fluency, metrics and execution.',
  lastUpdated: '2026-11-03',
  story: {
    summary:
      'The AI PM grew out of machine-learning product roles on search, ads and recommendation teams. It went mainstream after ChatGPT launched in November 2022, when building on large language models became a product question for almost every software company.',
    born: { when: 'Before 2022', what: 'ML product managers on search, ads and feeds' },
    rise: { when: 'Nov 2022 →', what: 'ChatGPT puts LLM features on every roadmap' },
    milestones: [
      {
        when: 'Before 2022',
        title: 'The ML product manager',
        detail:
          'PMs on ranking, ads and recommendation products already worked with models, data and metrics.',
      },
      {
        when: 'Nov 30, 2022',
        title: 'ChatGPT launches',
        detail:
          'OpenAI releases ChatGPT as a research preview. Shipping features on top of a large language model becomes possible for any team with an API key.',
        sourceLabel: 'OpenAI, Introducing ChatGPT',
        sourceUrl: 'https://openai.com/index/chatgpt/',
      },
      {
        when: 'May 2025',
        title: '688 open AI PM roles',
        detail:
          'TrueUp counted 688 open AI PM roles across big tech and top startups. The analyst called the growth “insane”.',
        sourceLabel: "Lenny's Newsletter (May 13, 2025)",
        sourceUrl: 'https://www.lennysnewsletter.com/i/162496793/2-ai-roles-are-exploding',
      },
    ],
    why: [
      'Models became an API call, so every team can ship an AI feature. Someone has to decide what it should do and how good is good enough.',
      'AI features can be confidently wrong and cost money on every request, so companies want PMs who understand evals, latency and unit cost.',
      'Classic PM skills still apply, which makes it a natural next step for product managers, engineers and analysts.',
    ],
  },
  aiAngle:
    'AI is the product here, not a side skill. Learn how LLMs work, then how evals and agents work, and be ready to explain one AI product you have built or critiqued.',
  mustKnow:
    'Interviewers want to see you define “good” for a non-deterministic product: what you measure, what it costs per task, and what you do when the model is wrong.',
  whatTheRoleIs: [
    'An AI PM decides which user problems are worth solving with AI, defines what "good" output looks like, and works with ML and engineering teams to get there within latency, cost and safety limits.',
    'The job is still product management: discovery, prioritisation, roadmaps and launches. What changes is that the product can be confidently wrong, its quality has to be measured with evaluation sets rather than only with tests, and every request has a variable cost.',
    'Most open AI PM roles in 2026 sit in B2B companies adding AI to workflows (support, sales, finance, developer tools), followed by consumer apps and the AI labs themselves.',
  ],
  expectations: {
    b2b: {
      headline: 'B2B (most AI PM roles today): automate a workflow a customer will pay for',
      points: [
        'Run discovery with real customers to find a workflow where AI saves measurable time or money, then write acceptance criteria the customer agrees to.',
        'Own the evaluation set: collect real examples from customers, define pass/fail rules, and report accuracy before and after each change.',
        'Work through security and data reviews: where customer data goes, whether it trains a model, retention, and access controls.',
        'Price the feature against its cost: model calls per task, tokens per call, and gross margin at the expected volume.',
        'Partner with solutions or forward deployed engineers on rollouts, integrations (CRM, ticketing, data warehouses) and change management.',
        'Write clear launch notes and guardrails: what the AI will and will not do, and when it hands off to a human.',
      ],
      metrics: [
        'Task success rate on the customer eval set',
        'Time or cost saved per workflow',
        'Weekly active seats and depth of use',
        'Escalation or override rate',
        'Gross margin per task',
        'Net revenue retention of AI-enabled accounts',
      ],
    },
    b2c: {
      headline: 'B2C: make an AI experience people come back to, at scale',
      points: [
        'Design the experience around uncertainty: how the product shows confidence, recovers from bad answers and lets users correct it.',
        'Run experiments at scale, knowing that outputs vary run to run, so samples and guardrail metrics need extra care.',
        'Own trust and safety with policy and research teams: harmful content, abuse, minors, and regional regulation.',
        'Keep latency and cost per active user within budget as usage grows by orders of magnitude.',
        'Build feedback loops (thumbs, edits, retries) that turn usage into better data and better evals.',
      ],
      metrics: [
        'Day-1, day-7 and day-30 retention',
        'Successful sessions or task completion',
        'Positive feedback rate and regenerate rate',
        'p95 latency',
        'Cost per daily active user',
        'Safety incident rate',
      ],
    },
    difference: [
      'Specs include example inputs and expected outputs, not just user stories.',
      'Quality is measured with eval sets and human review, and it can regress when the model or prompt changes.',
      'Every request has a marginal cost, so pricing and model choice are product decisions.',
      'Launches need guardrails and fallbacks because the system can be confidently wrong.',
      'The roadmap moves with model releases: a capability that was impossible last quarter may be cheap next quarter.',
    ],
  },
  skills: [
    {
      area: 'Product',
      items: [
        'Customer discovery and problem framing',
        'Prioritisation with clear trade-offs',
        'Writing specs with example inputs and outputs',
        'Pricing and packaging',
      ],
    },
    {
      area: 'AI fluency',
      items: [
        'How LLMs, embeddings and retrieval work at a conceptual level',
        'Prompting, RAG, fine-tuning and agents: when to use which',
        'Designing evals and reading error analyses',
        'Latency, cost and context-window trade-offs',
      ],
    },
    {
      area: 'Execution',
      items: [
        'Metrics trees and experiment design',
        'Launch plans with guardrails and rollback',
        'Working with ML engineers, designers and legal',
        'Basic SQL to answer your own questions',
      ],
    },
    {
      area: 'Responsible AI',
      items: [
        'Privacy and data-handling basics',
        'Safety and abuse scenarios',
        'Bias and fairness checks',
        'Explaining limits honestly to users and customers',
      ],
    },
  ],
  process: [
    {
      companyType: 'Big Tech (Google, Microsoft, Amazon, Meta)',
      rounds: [
        'Recruiter screen',
        'Product sense / product design',
        'Analytical or metrics round',
        'Technical or AI fluency round',
        'Leadership and behavioural (Amazon: Leadership Principles)',
      ],
    },
    {
      companyType: 'AI labs and AI-native startups',
      rounds: [
        'Founder or hiring manager call',
        'Take-home: a product spec or eval plan for a real feature',
        'Deep dive on a product you shipped',
        'Technical conversation with an engineer or researcher',
        'Values and culture conversation',
      ],
    },
    {
      companyType: 'B2B SaaS adding AI',
      rounds: [
        'Recruiter and hiring manager screens',
        'Case: add AI to one of their workflows',
        'Metrics and prioritisation round',
        'Cross-functional panel (engineering, design, sales)',
        'Leadership round',
      ],
    },
    {
      companyType: 'Indian product companies and GCCs',
      rounds: [
        'HR or recruiter screen',
        'Product case (often guesstimate plus design)',
        'Metrics and root-cause analysis',
        'AI fluency or technical discussion',
        'Hiring manager and culture fit',
      ],
    },
  ],
  pay: {
    intro:
      'Public data rarely separates AI PMs from other product managers, so the tables below use Levels.fyi data for the Product Manager title, the largest verified dataset, with an AI-specific cross-check underneath.',
    tables: [
      {
        region: 'India',
        currency: 'INR, lakh per annum (total compensation)',
        rows: [
          {
            band: '25th percentile',
            experience: 'Typically early career (0–3 yrs)',
            value: '₹29.5 LPA',
          },
          { band: 'Median', experience: 'Typically mid-level (3–6 yrs)', value: '₹45.4 LPA' },
          {
            band: '75th percentile',
            experience: 'Typically senior (6–10 yrs)',
            value: '₹68.7 LPA',
          },
          {
            band: '90th percentile',
            experience: 'Typically lead or principal (10+ yrs)',
            value: '₹93.6 LPA',
          },
        ],
        note: `Based on 1,528 salaries. ${LEVELS_NOTE}`,
        sourceLabel: 'Levels.fyi, Product Manager, India',
        sourceUrl: 'https://www.levels.fyi/t/product-manager/locations/india',
        asOf: 'Updated Nov 2, 2026',
      },
      {
        region: 'United States',
        currency: 'USD per year (total compensation)',
        rows: [
          {
            band: '25th percentile',
            experience: 'Typically early career (0–3 yrs)',
            value: '$170K',
          },
          { band: 'Median', experience: 'Typically mid-level (3–6 yrs)', value: '$233K' },
          { band: '75th percentile', experience: 'Typically senior (6–10 yrs)', value: '$333K' },
          {
            band: '90th percentile',
            experience: 'Typically lead or principal (10+ yrs)',
            value: '$454K',
          },
        ],
        note: `Based on 4,914 salaries. ${LEVELS_NOTE}`,
        sourceLabel: 'Levels.fyi, Product Manager, United States',
        sourceUrl: 'https://www.levels.fyi/t/product-manager/locations/united-states',
        asOf: 'Updated Nov 2, 2026',
      },
      {
        region: 'Europe: Germany',
        currency: 'EUR per year (total compensation)',
        rows: [
          {
            band: '25th percentile',
            experience: 'Typically early career (0–3 yrs)',
            value: '€81K',
          },
          { band: 'Median', experience: 'Typically mid-level (3–6 yrs)', value: '€95K' },
          { band: '75th percentile', experience: 'Typically senior (6–10 yrs)', value: '€114K' },
          {
            band: '90th percentile',
            experience: 'Typically lead or principal (10+ yrs)',
            value: '€141K',
          },
        ],
        note: `Based on 233 salaries. ${LEVELS_NOTE}`,
        sourceLabel: 'Levels.fyi, Product Manager, Germany',
        sourceUrl: 'https://www.levels.fyi/t/product-manager/locations/germany',
        asOf: 'Updated Nov 2, 2026',
      },
      {
        region: 'Europe: Netherlands',
        currency: 'EUR per year (total compensation)',
        rows: [
          {
            band: '25th percentile',
            experience: 'Typically early career (0–3 yrs)',
            value: '€87.8K',
          },
          { band: 'Median', experience: 'Typically mid-level (3–6 yrs)', value: '€112K' },
          { band: '75th percentile', experience: 'Typically senior (6–10 yrs)', value: '€133K' },
          {
            band: '90th percentile',
            experience: 'Typically lead or principal (10+ yrs)',
            value: '€156K',
          },
        ],
        note: `Based on 119 salaries. ${LEVELS_NOTE}`,
        sourceLabel: 'Levels.fyi, Product Manager, Netherlands',
        sourceUrl: 'https://www.levels.fyi/t/product-manager/locations/netherlands',
        asOf: 'Updated Nov 2, 2026',
      },
    ],
    crossCheck:
      'AI-specific cross-check (US): Glassdoor reports average total pay of about $201K a year for the "AI Product Manager" title, with a typical range of $168K–$247K, from 35 salaries (Glassdoor, checked Nov 3, 2026). The small sample is why we lead with the broader Levels.fyi data. The experience labels are our guide to reading percentiles, not a separate dataset.',
  },
  hiring: {
    intro:
      'Companies with the most people who moved into an AI product manager title in 2025–26. No public source reports hires per company, so this counts people whose current title is an AI PM title and who started it in the last 22 months.',
    companies: [
      { name: 'Microsoft', count: 57, segment: 'Big Tech' },
      { name: 'Google', count: 47, segment: 'Big Tech' },
      { name: 'Amazon', count: 40, segment: 'Big Tech' },
      { name: 'IBM', count: 28, segment: 'Enterprise tech' },
      { name: 'Meta', count: 22, segment: 'Big Tech' },
      { name: 'Walmart', count: 10, segment: 'Retail tech' },
      { name: 'Salesforce', count: 9, segment: 'Enterprise SaaS' },
      { name: 'Accenture', count: 7, segment: 'Consulting' },
      { name: 'Flipkart', count: 3, segment: 'India e-commerce' },
    ],
    method:
      'Source: Apollo.io people database, searched Nov 3, 2026. Titles counted: AI Product Manager, Senior AI Product Manager, Generative AI Product Manager, Product Manager AI, Product Manager Generative AI and Product Manager AI/ML, held for 670 days or less. Across all companies, 3,815 people hold the exact title "AI Product Manager" started in that window. Counts are a lower bound: many AI PMs keep the plain title "Product Manager".',
    sourceLabel: 'Apollo.io people search',
    asOf: 'Nov 3, 2026',
  },
  questionGroups: [
    {
      id: 'common',
      title: 'Common opening questions',
      blurb: 'Asked in almost every AI PM loop. Prepare these word for word.',
      questions: [
        {
          q: 'Tell me about yourself.',
          answer:
            'Keep it to 90 seconds and make it a line, not a list: where you started, the thread that led you to AI products, and the proof you can do the job.\n\nExample shape: "I started as a software engineer building data pipelines, moved into product two years ago, and for the last year I have owned an LLM feature that drafts replies for our support team. We took acceptance of drafts from 31% to 58% by building an eval set from real tickets. I want to do that at a bigger scale, which is why I am here."',
          lookFor:
            'A clear narrative, one concrete AI result with a number, and a reason for this role.',
        },
        {
          q: 'Why do you want to be an AI product manager?',
          answer:
            'Tie it to the work, not the hype. Good answers name what is different about AI products (measuring quality with evals, designing for uncertainty, cost per task) and why you enjoy those problems, backed by something you have built or shipped.',
          lookFor: 'Genuine interest in the hard parts, not "AI is the future".',
        },
        {
          q: 'What is your favourite AI product, and how would you improve it?',
          answer:
            'Pick one you use weekly. Say who it is for, the job it does, what it gets right, and one specific failure you have seen. Then propose one improvement with the metric it would move and how you would test it.\n\nExample: a meeting-notes assistant gets summaries right but misses action-item owners. Improve owner detection using calendar attendees, measure the share of action items with a correct owner on a labelled set of 200 meetings, then A/B test on edit rate.',
          lookFor: 'User empathy, a specific failure, and a measurable fix.',
        },
        {
          q: 'Walk me through an AI feature you shipped or would ship.',
          answer:
            'Use problem, approach, evaluation, launch, result. Spend most of the time on the decisions: why AI at all, which model or approach, how you defined good output, what guardrails you added, and what you learned when it met real users.',
          lookFor: 'Ownership of decisions and honest lessons, including what did not work.',
        },
        {
          q: 'How do you work with ML engineers and researchers?',
          answer:
            'Explain the split: you own the problem, the success criteria and the eval set; they own the approach and the model. Mention shared rituals (weekly error review, eval dashboards), and give an example where you changed the spec after seeing failure cases.',
          lookFor: 'Respect for the craft and a practical working rhythm.',
        },
      ],
    },
    {
      id: 'product-sense',
      title: 'Product sense and design',
      blurb: 'Design an AI product or feature from scratch. Structure beats speed.',
      questions: [
        {
          q: 'Design an AI assistant for customer support agents at a food delivery company.',
          answer:
            'Clarify the goal (faster, more accurate resolutions, not replacing agents) and the users (agents, team leads, customers).\n\nTop pain points: looking up orders across tools, writing refunds policy-correctly, long angry-customer chats. Prioritise "suggested reply with the right refund action" because it is frequent and measurable.\n\nSolution: the assistant reads the order, delivery timeline and policy, drafts a reply and proposes an action the agent approves. Guardrails: never issues refunds without approval, cites the policy line.\n\nMetrics: average handle time, first-contact resolution, policy-correct refund rate on an eval set, agent acceptance of drafts, CSAT.',
          lookFor:
            'Clear user, prioritised pain point, human in the loop, and metrics for quality and impact.',
        },
        {
          q: 'How would you add AI to a B2B CRM used by sales reps?',
          answer:
            "Start from the rep's day: research before calls, logging notes, writing follow-ups and updating the pipeline. Logging is hated and hurts data quality, so start there: auto-summarise calls into CRM fields and next steps for the rep to confirm.\n\nMeasure field completeness, time spent on admin per week, forecast accuracy and adoption by rep. Phase two: account research briefs before calls.",
          lookFor: 'Workflow thinking and a wedge that improves data the business depends on.',
        },
        {
          q: 'Design an AI tutor for students preparing for competitive exams in India.',
          answer:
            "Segment: Class 11–12 students preparing for engineering entrance exams, often in Hindi or Hinglish, on low-cost Android phones and patchy networks.\n\nCore job: getting unstuck on a problem at 11 p.m. without a teacher. Feature: photo of a problem leads to step-by-step hints, not answers, in the student's language, then a similar practice question.\n\nRisks: wrong solutions (verify against a solution bank), dependency (hint-first design), cost (cache common problems). Metrics: problems solved after hints, weekly retention, accuracy of solutions on a graded set, cost per active student.",
          lookFor: 'Local context, pedagogy over answers, and cost awareness.',
        },
        {
          q: 'Should a note-taking app build an AI "chat with your notes" feature?',
          answer:
            'Ask what job users hire notes for (finding things later). Check evidence: search usage, failed searches, retention of heavy users. If search failure is high, "ask your notes" with citations is a strong fit. Risks: privacy concerns, hallucinated answers, cost for free users. Recommend a limited beta for paid users, measure answer usefulness and repeat usage, and show sources for every answer.',
          lookFor: 'A decision grounded in data, with risks and a test plan.',
        },
        {
          q: 'Improve ChatGPT (or a similar assistant) for first-time users.',
          answer:
            "First-time users do not know what to ask and churn after one generic answer. Ideas: starter tasks based on the user's stated goal, showing what the assistant can do with files and tools, and a follow-up nudge the next day.\n\nPick one, define activation (for example, three successful tasks in week one) and measure day-7 retention in an A/B test.",
          lookFor: 'A crisp activation metric and one well-argued idea.',
        },
      ],
    },
    {
      id: 'ai-technical',
      title: 'AI and technical fluency',
      blurb: 'You will not write code, but you must explain these clearly and make trade-offs.',
      questions: [
        {
          q: 'Explain how a large language model works to a non-technical stakeholder.',
          answer:
            'An LLM is trained on a huge amount of text to predict the next word. That simple task forces it to learn grammar, facts and patterns of reasoning. When you ask a question, it writes the most likely continuation one piece at a time. That is why it is fluent, why it can be wrong with confidence, and why giving it the right context in the prompt matters so much.',
          lookFor: 'Simple, accurate, and it explains the failure modes.',
        },
        {
          q: 'When would you use RAG, fine-tuning or just prompting?',
          answer:
            "Prompting first: it is cheapest and fastest to iterate. Use retrieval-augmented generation (RAG) when the model needs facts it does not have, such as your docs or a customer's data, especially if they change often or need citations. Consider fine-tuning when you need a consistent format, tone or a narrow skill at lower cost and latency, and you have enough good examples. Many products combine RAG with a lightly fine-tuned or well-prompted model.",
          lookFor: 'A cost-and-data-driven decision, not a favourite technique.',
        },
        {
          q: 'How do you reduce hallucinations in a product?',
          answer:
            'Ground the model in retrieved sources and ask it to cite them; tell it to say "I don\'t know" when sources are missing; constrain outputs with structured formats; add checks (for example, verify numbers against the database); and design the UI so users can see sources and correct mistakes. Measure the hallucination rate on an eval set before and after each change.',
          lookFor: 'Layered defences and measurement.',
        },
        {
          q: 'How would you design an evaluation (eval) for an AI feature?',
          answer:
            'Collect 100–300 real, representative inputs including hard and edge cases. Define what good looks like with a rubric (correct, complete, safe, right format). Label expected outputs or criteria with domain experts. Score with a mix of automated checks, model-graded rubrics checked against human labels, and human review for a sample. Track the score per release and look at failures by category, not just the average.',
          lookFor: 'Representative data, a rubric, and a habit of reading failures.',
        },
        {
          q: 'Latency doubled after switching to a stronger model. What do you do?',
          answer:
            'Check whether quality gains justify it for this task. Options: stream the response, use the larger model only for hard cases (routing), shorten prompts and context, cache repeated work, or run steps in parallel. Decide with data: quality on the eval set versus latency versus cost per task, and the effect on user metrics.',
          lookFor: 'Trade-off thinking and several concrete levers.',
        },
        {
          q: 'What is an AI agent, and when is it the wrong choice?',
          answer:
            'An agent is a model that can plan and take actions with tools (search, APIs, code) over several steps. It fits open-ended tasks where steps vary. It is the wrong choice when a fixed workflow does the job, because each extra step adds cost, latency and chances to fail. Start with the simplest workflow and add autonomy only where it measurably helps.',
          lookFor: 'Pragmatism about reliability and cost.',
        },
        {
          q: 'What is prompt injection, and how would you protect a product from it?',
          answer:
            'Prompt injection is when content the model reads (a web page, an email, a document) contains instructions that try to override yours. Protections: treat external content as data, limit what tools and permissions the model has, require confirmation for risky actions, filter inputs and outputs, and test with known attack examples as part of your eval set.',
          lookFor: 'Awareness of security as a product responsibility.',
        },
        {
          q: 'How do you estimate the cost of an AI feature?',
          answer:
            'Cost per task = calls per task × (input tokens × input price + output tokens × output price), plus retrieval and infrastructure. Multiply by tasks per user and users. Compare with what the customer pays or the value created. Then look for savings: smaller models for easy steps, caching, shorter context, batch processing for non-urgent work.',
          lookFor: 'A clear formula and margin awareness.',
        },
      ],
    },
    {
      id: 'metrics',
      title: 'Metrics and execution',
      blurb: 'Define success, debug a drop, and decide when to launch.',
      questions: [
        {
          q: 'What metrics would you track for an AI support chatbot?',
          answer:
            'North star: issues resolved without a human, confirmed by the customer. Supporting: containment rate, escalation rate, CSAT for bot conversations, repeat contact within 7 days (a sign of false resolution). Quality: accuracy on an eval set and policy compliance. Guardrails: harmful or off-policy answers, cost per conversation, latency.',
          lookFor: 'A north star plus metrics that catch fake wins.',
        },
        {
          q: 'Thumbs-down feedback on your AI feature rose 20% this week. Walk me through it.',
          answer:
            'Confirm the data first (logging change, a new segment of users, one big customer). Check what changed: model version, prompt, retrieval index, product release. Slice by language, task type, customer and platform. Read 50 thumbs-down examples and group the failures. Fix the top cause, add those cases to the eval set, and monitor.',
          lookFor: 'Structured root-cause analysis that ends in reading real examples.',
        },
        {
          q: 'How do you A/B test an AI feature when outputs are non-deterministic?',
          answer:
            'Randomise users, not requests, and run long enough to get stable results. Use user-level outcome metrics (task completion, retention) rather than single-response ratings. Fix the model version and settings during the test, log every output for later review, and pair the experiment with offline evals so you know quality before exposing users.',
          lookFor: 'Experiment hygiene adapted to AI.',
        },
        {
          q: 'How do you decide an AI feature is ready to launch?',
          answer:
            'Agree launch criteria up front: an eval score threshold on key task types, zero critical safety failures in red-team tests, latency and cost within budget, a fallback when the model fails, and monitoring in place. Launch to a small percentage first with a clear rollback plan.',
          lookFor: 'Pre-agreed criteria and staged rollout.',
        },
        {
          q: 'Your cost per query doubled after launch. What would you do?',
          answer:
            'Find the driver: more calls per task, longer contexts, a more expensive model, or abuse. Fixes in order of effort: cap context length, cache common answers, route easy requests to a smaller model, rate-limit heavy free users, and revisit pricing if heavy usage is also your most valuable usage.',
          lookFor: 'Diagnosis before cutting, and a link to pricing.',
        },
      ],
    },
    {
      id: 'strategy',
      title: 'Strategy',
      blurb: 'Common in senior loops and at AI-native companies.',
      questions: [
        {
          q: 'Build our own model or use an API from a model provider?',
          answer:
            'Default to APIs to learn fast. Consider training or fine-tuning your own when you have unique data that creates a quality edge, strict data or latency requirements, or a cost profile that makes it cheaper at your volume. Keep the architecture model-agnostic so you can switch providers as models improve.',
          lookFor: 'Speed now with optionality later.',
        },
        {
          q: "If models keep getting better and cheaper, what is your product's moat?",
          answer:
            'Not the model. Moats come from proprietary data and feedback loops, deep workflow integration, distribution, trust (security, compliance, reliability) and the evaluation know-how for a specific domain. Better models then make your product better, not obsolete.',
          lookFor: 'A clear view of durable advantage.',
        },
        {
          q: 'How would you price an AI feature in a B2B product?',
          answer:
            'Anchor on value (hours saved, revenue gained) and check against cost per task. Options: per seat with usage limits, usage-based credits, or outcome-based pricing for well-defined tasks. Start simple, protect margin with fair-use limits, and watch how heavy users behave.',
          lookFor: 'Value-based thinking with margin protection.',
        },
      ],
    },
    {
      id: 'behavioural',
      title: 'Behavioural',
      blurb: 'Use situation, task, action, result. Have two stories ready for each theme.',
      questions: [
        {
          q: 'Tell me about a time you disagreed with engineering about launching.',
          answer:
            'Pick a story where you used data to resolve it. Example: engineering wanted to wait for a better model; you proposed launching to 5% of users with a fallback, agreed the metric that would trigger a rollback, and the result.',
          lookFor: 'Data over opinion, and a relationship intact afterwards.',
        },
        {
          q: 'Tell me about a product or feature that failed.',
          answer:
            'Own it: what you believed, what happened, what you missed, and what you changed in how you work. Interviewers want self-awareness and a concrete change in behaviour.',
          lookFor: 'Ownership without blame.',
        },
        {
          q: 'Tell me about a time you had to make a decision with incomplete data.',
          answer:
            'Show how you sized the risk, set a reversible first step, and defined what evidence would change your mind.',
          lookFor: 'Comfort with ambiguity and reversible bets.',
        },
        {
          q: 'Tell me about a time you raised an ethical or safety concern.',
          answer:
            'Describe the concern specifically (for example, the model treating some users unfairly), how you checked it with data, who you involved, and what changed. Avoid vague answers.',
          lookFor: 'Courage plus a constructive path.',
        },
      ],
    },
  ],
  plans: [
    {
      days: '7 days',
      title: 'Interview next week',
      tasks: [
        'Day 1: Write your 90-second story and one AI result with a number.',
        'Day 2: Practise 3 product sense questions out loud, timed at 25 minutes each.',
        'Day 3: Learn to explain LLMs, RAG, evals and agents in plain words.',
        'Day 4: Do 2 metrics questions and 1 root-cause question.',
        'Day 5: Prepare 6 behavioural stories (conflict, failure, ambiguity, ethics, influence, impact).',
        'Day 6: Take a full AI mock interview and fix the weakest area.',
        "Day 7: Research the company's AI products and prepare 3 smart questions.",
      ],
    },
    {
      days: '14 days',
      title: 'Two weeks to build depth',
      tasks: [
        'Week 1: Everything in the 7-day plan, plus one short AI course for PMs.',
        'Week 2: Build a tiny AI prototype (a prompt plus a 30-example eval) so you can talk from experience.',
        'Two mock interviews: one product sense, one technical fluency.',
        'Write a one-page spec for an AI feature at your target company.',
      ],
    },
    {
      days: '30 days',
      title: 'A month to switch into AI PM',
      tasks: [
        'Week 1: Foundations: how LLMs, retrieval and evals work; read one AI product teardown a day.',
        'Week 2: Build and ship a small AI project with a public write-up and an eval table.',
        'Week 3: Product sense and metrics practice: 10 questions, recorded and reviewed.',
        'Week 4: Behavioural stories, company research, three full mock interviews and outreach to 10 AI PMs for referrals.',
      ],
    },
  ],
  resources: [
    {
      title: 'AI For Everyone (Andrew Ng)',
      url: 'https://www.coursera.org/learn/ai-for-everyone',
      kind: 'Course',
      why: 'Non-technical foundation in what AI can and cannot do; can be audited.',
    },
    {
      title: 'DeepLearning.AI short courses',
      url: 'https://www.deeplearning.ai/short-courses/',
      kind: 'Course',
      why: 'One-to-two-hour courses on prompting, RAG, agents and evaluation.',
      free: true,
    },
    {
      title: 'Google Machine Learning Crash Course',
      url: 'https://developers.google.com/machine-learning/crash-course',
      kind: 'Course',
      why: 'Free fundamentals of ML concepts such as training, overfitting and metrics.',
      free: true,
    },
    {
      title: 'Claude prompt engineering guide',
      url: 'https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview',
      kind: 'Guide',
      why: 'Practical prompting techniques from a model provider.',
      free: true,
    },
    {
      title: "AI Engineering by Chip Huyen (O'Reilly)",
      url: 'https://www.oreilly.com/library/view/ai-engineering/9781098166298/',
      kind: 'Book',
      why: 'The clearest book on building products with foundation models, including evaluation.',
    },
    {
      title: 'Cracking the PM Interview (McDowell & Bavaro)',
      url: 'https://www.crackingthepminterview.com/',
      kind: 'Book',
      why: 'Classic PM interview structure for product design and estimation questions.',
    },
    {
      title: 'AI product management guide',
      url: '/blog/ai-product-management-complete-guide',
      kind: 'Our guide',
      why: 'Career path, skills and how to break into AI product management.',
      free: true,
    },
    {
      title: 'Product manager interview questions',
      url: '/interview-questions/product-manager',
      kind: 'Our guide',
      why: 'Core PM questions to pair with the AI-specific bank above.',
      free: true,
    },
    {
      title: 'Google PM interview questions',
      url: '/blog/google-product-management-interview-questions-2025',
      kind: 'Our guide',
      why: '19 real, sourced Google PM questions (incl. Gemini AI rounds), Levels.fyi pay in ₹ and $, and the APM 2027 deadline.',
      free: true,
    },
  ],
  related: [
    { label: 'Product manager resume template', href: '/cv-templates/product-manager' },
    { label: 'Free AI mock interview', href: '/free-mock-interview' },
    { label: 'Free resume builder', href: '/build-resume' },
    { label: 'Product Manager hub', href: '/product-manager' },
  ],
  faqs: [
    {
      q: 'What does an AI product manager do?',
      a: 'An AI product manager owns a product whose core behaviour comes from a machine learning model. Besides normal PM work, they define what good model output looks like, build evaluation sets, manage cost per task and latency, and design guardrails for when the model is wrong.',
    },
    {
      q: 'Do AI product managers need to code?',
      a: 'Usually not in the job itself, but strong AI PMs understand how LLMs, retrieval, fine-tuning and evals work well enough to make trade-offs, and many build small prototypes. Basic SQL and comfort reading experiment results are commonly expected.',
    },
    {
      q: 'What is the salary of a product manager in India?',
      a: 'Levels.fyi reports a median total compensation of about ₹45.4 lakh a year for product managers in India, with the 25th percentile around ₹29.5 lakh and the 90th around ₹93.6 lakh (Nov 2026). Its data leans towards large tech companies, so many startup offers are lower.',
    },
    {
      q: 'How do I become an AI product manager with no experience?',
      a: 'Learn the fundamentals (LLMs, retrieval, evals), build and publish a small AI project with an evaluation table, move into AI work inside your current company if you can, and practise AI PM interview questions out loud with mock interviews.',
    },
    {
      q: 'What questions are asked in an AI PM interview?',
      a: 'Expect product sense (design an AI feature), AI fluency (RAG vs fine-tuning, hallucinations, evals, agents), metrics and execution (success metrics, debugging a drop, launch criteria), strategy (build vs buy, moats, pricing) and behavioural questions.',
    },
  ],
}

export default aipm
