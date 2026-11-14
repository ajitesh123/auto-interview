import type { RoleHub } from './types'

const aiEngineer: RoleHub = {
  slug: 'ai-engineer',
  visuals: {
    hero: {
      mp4: '/static/images/roles/ai-engineer/hero.mp4',
      image: '/static/images/roles/ai-engineer/hero.webp',
      alt: 'AI Engineer role hub: interview questions, pay in rupees, dollars and euros, and who is hiring',
    },
    pay: {
      mp4: '/static/images/roles/ai-engineer/pay.mp4',
      image: '/static/images/roles/ai-engineer/pay.webp',
      alt: 'Median total pay for AI Engineers in India is ₹17.8 LPA; US $156K, Germany €81K (Levels.fyi, Nov 2026)',
    },
    hiring: {
      image: '/static/images/roles/ai-engineer/hiring.webp',
      alt: 'New AI Engineers by company in 2025–26: TCS 758, IBM 393, Deloitte 333, Accenture 242, Cognizant 162 (Apollo.io, Nov 3, 2026)',
    },
    og: '/static/images/roles/ai-engineer/og.jpg',
  },
  roleName: 'AI Engineer',
  shortName: 'AI Engineer',
  metaTitle: 'AI Engineer Interview Guide 2026: Questions, Skills & Salary',
  metaDescription:
    'AI engineer interview prep: what AI engineers build, 30 questions on LLMs, RAG, agents and evals with model answers, pay in India, US and Europe, and who is hiring.',
  keywords: [
    'ai engineer interview questions',
    'ai engineer salary india',
    'ai engineer salary',
    'generative ai engineer interview questions',
    'llm engineer interview questions',
    'how to become an ai engineer',
    'ai engineer vs ml engineer',
  ],
  heroTitle: 'AI Engineer interview prep',
  heroDescription:
    'What AI engineers really build with LLMs, retrieval, agents and evals, 30 interview questions with model answers, real pay data for India, the US and Europe, and who is hiring.',
  directAnswer:
    'An AI engineer builds products on top of foundation models such as GPT, Claude and Gemini. The work is mostly software engineering: prompts, retrieval (RAG), tool-calling agents, evaluation pipelines, latency and cost control, and safe deployment. Unlike a machine learning engineer, an AI engineer rarely trains models from scratch. Interviews test coding, LLM application design, evals and debugging.',
  lastUpdated: '2026-11-03',
  story: {
    summary:
      'The AI engineer was named in June 2023, when Shawn “swyx” Wang’s essay “The Rise of the AI Engineer” argued that foundation models had created a new kind of engineer. By January 2025 it was the fastest-growing job on LinkedIn’s US Jobs on the Rise list.',
    born: { when: 'June 2023', what: 'Named in “The Rise of the AI Engineer”' },
    rise: { when: 'Jan 2025', what: '#1 on LinkedIn’s US Jobs on the Rise' },
    milestones: [
      {
        when: 'June 2023',
        title: 'The role gets a name',
        detail:
          'The Latent Space essay argues that work which once needed “five years and a research team” can start from “API docs and a spare afternoon”.',
        sourceLabel: 'AI Engineer, About',
        sourceUrl: 'https://www.ai.engineer/about',
      },
      {
        when: 'Oct 2023',
        title: 'First AI Engineer Summit',
        detail:
          'The community holds its first summit, and the title starts appearing in job posts.',
        sourceLabel: 'AI Engineer, About',
        sourceUrl: 'https://www.ai.engineer/about',
      },
      {
        when: 'Jan 2025',
        title: 'Top of LinkedIn’s list',
        detail:
          'AI engineer takes the top spot on LinkedIn’s 2025 Jobs on the Rise list for the US.',
        sourceLabel: 'Allwork.Space (Jan 9, 2025)',
        sourceUrl:
          'https://allwork.space/2025/01/ai-engineer-tops-linkedins-fastest-growing-jobs-for-2025',
      },
      {
        when: 'Jan 2025 → now',
        title: '72,786 people take the title',
        detail:
          '72,786 people started an AI Engineer or GenAI Engineer title since January 2025, including 21,239 in India.',
        sourceLabel: 'Our count (Apollo people search)',
        sourceUrl: '#hiring',
      },
    ],
    why: [
      'Work that once needed a research team can now start from an API, so every product team needs engineers who build on models.',
      'Shipping AI reliably takes new skills: retrieval, tool calling, evals, and latency and cost control.',
      'It reuses software-engineering foundations, so developers can switch in without a PhD.',
    ],
  },
  aiAngle:
    'This is the AI role. Go beyond prompting: build a small RAG app or agent with evals, and be ready to explain your latency, cost and failure cases.',
  mustKnow:
    'Interviews test whether you can make an LLM reliable: how you measure quality (evals), handle wrong answers, and keep cost and latency in budget.',
  whatTheRoleIs: [
    'The AI Engineer community describes the role as a new kind of engineer at the intersection of software engineering and AI: work that once needed a research team can now start from an API. Our count shows 72,786 people started an AI Engineer or GenAI Engineer title since January 2025, including 21,239 in India.',
    "Day to day, you design how a model is used: what context it receives, which tools it can call, how outputs are checked, and how the system behaves when the model is wrong. A typical posting, such as Fluency's AI Engineer role in San Francisco, asks for shipping LLM features end to end, designing evals that catch regressions, and choosing models for quality, latency and cost.",
    'The title covers a wide range. At IT services firms it often means building GenAI solutions for clients; at product companies and startups it means owning AI features in production; at AI labs it overlaps with applied research and forward deployed engineering.',
  ],
  expectations: {
    b2b: {
      headline: 'B2B (most roles, including IT services): reliable AI inside business workflows',
      points: [
        'Build retrieval over company documents with permissions, citations and freshness, so answers can be trusted and audited.',
        'Build agents that take actions in business systems (CRM, ticketing, ERP) with approvals for risky steps.',
        'Design evaluation sets with domain experts and report accuracy per task before every release.',
        'Meet enterprise requirements: data residency, no training on customer data, audit logs and access control.',
        'Control cost per task, because enterprise usage is priced and budgeted.',
        'At IT services firms, work across several client projects and present solutions to client stakeholders.',
      ],
      metrics: [
        'Task accuracy on the eval set',
        'Hallucination or unsupported-claim rate',
        'Cost per task',
        'p95 latency',
        'Automation rate of the workflow',
        'Incidents and rollbacks',
      ],
    },
    b2c: {
      headline: 'B2C: AI features millions of people use',
      points: [
        'Ship features such as chat, search, recommendations, writing help or voice for consumer apps, at large scale.',
        'Optimise latency and cost per user aggressively, because usage is free or cheap for most users.',
        'Handle abuse, jailbreaks and harmful content with safety filters and monitoring.',
        'Run A/B tests and use feedback signals (thumbs, edits, retries) to improve quality.',
        'Support many languages and low-end devices, which matters a lot in India.',
      ],
      metrics: [
        'Engagement and retention lift',
        'Positive feedback rate',
        'Time to first token',
        'Cost per daily active user',
        'Safety incident rate',
      ],
    },
    difference: [
      'Compared with an ML engineer: you mostly use and adapt existing models instead of training them.',
      'Compared with a software engineer: outputs are probabilistic, so testing means evals, not only unit tests.',
      'Model choice, prompts and context are part of the codebase and need versioning.',
      'Cost and latency per request are design constraints from day one.',
      'The field changes monthly, so evaluating new models and tools is a regular task.',
    ],
  },
  skills: [
    {
      area: 'Software engineering',
      items: [
        'Python and/or TypeScript in production',
        'APIs, async code and streaming',
        'Databases, including vector search (pgvector)',
        'Testing, logging and deployment',
      ],
    },
    {
      area: 'LLM application design',
      items: [
        'Prompting and structured outputs',
        'Retrieval: chunking, embeddings, reranking',
        'Tool calling, agents and MCP',
        'Choosing models for quality, latency and cost',
      ],
    },
    {
      area: 'Evaluation',
      items: [
        'Building eval sets from real data',
        'Model-graded and human evaluation',
        'Regression testing across prompt or model changes',
        'Error analysis by failure type',
      ],
    },
    {
      area: 'Production and safety',
      items: [
        'Caching, batching and rate limits',
        'Prompt injection and data-leak defences',
        'Monitoring quality in production',
        'Fallbacks when models fail',
      ],
    },
  ],
  process: [
    {
      companyType: 'AI startups and product companies',
      rounds: [
        'Recruiter or founder call',
        'Practical coding in Python or TypeScript',
        'Build exercise: a RAG app or agent, often a take-home',
        'LLM system design (e.g. a support assistant at scale)',
        'Deep dive on a project you shipped, plus behavioural',
      ],
    },
    {
      companyType: 'Big Tech',
      rounds: [
        'Recruiter screen',
        'Data structures and algorithms rounds',
        'ML or LLM system design',
        'Applied AI round: evals, retrieval and failure analysis',
        'Behavioural or leadership round',
      ],
    },
    {
      companyType: 'IT services and consulting (TCS, Infosys, Accenture, Deloitte)',
      rounds: [
        'Online assessment (aptitude and coding)',
        'Technical interview: Python, GenAI concepts and your projects',
        'Case: propose a GenAI solution for a client scenario',
        'Managerial round',
        'HR round',
      ],
    },
    {
      companyType: 'AI labs',
      rounds: [
        'Recruiter screen',
        'Coding with real-world framing',
        'Take-home or onsite build with their models',
        'System design and deployment trade-offs',
        'Values and mission interviews',
      ],
    },
  ],
  pay: {
    intro:
      'Levels.fyi tracks AI Engineer as its own title. It pays less than Machine Learning Engineer on Levels.fyi, partly because many AI Engineer roles sit in services companies and early-career positions.',
    tables: [
      {
        region: 'India',
        currency: 'INR, lakh per annum (total compensation)',
        rows: [
          {
            band: '25th percentile',
            experience: 'Typically fresher to early career (0–2 yrs)',
            value: '₹10.9 LPA',
          },
          { band: 'Median', experience: 'Typically mid-level (2–5 yrs)', value: '₹17.8 LPA' },
          { band: '75th percentile', experience: 'Typically senior (5–8 yrs)', value: '₹34.5 LPA' },
          {
            band: '90th percentile',
            experience: 'Typically lead or staff (8+ yrs)',
            value: '₹52.6 LPA',
          },
        ],
        note: 'AI Engineer title, India. Levels.fyi does not publish the sample size for this page. Its data leans towards product companies, so many services-company offers sit below these bands.',
        sourceLabel: 'Levels.fyi, AI Engineer, India',
        sourceUrl: 'https://www.levels.fyi/t/software-engineer/title/ai-engineer/locations/india',
        asOf: 'Updated Nov 3, 2026',
      },
      {
        region: 'United States',
        currency: 'USD per year (total compensation)',
        rows: [
          {
            band: '25th percentile',
            experience: 'Typically early career (0–2 yrs)',
            value: '$110K',
          },
          { band: 'Median', experience: 'Typically mid-level (2–5 yrs)', value: '$156K' },
          { band: '75th percentile', experience: 'Typically senior (5–8 yrs)', value: '$213K' },
          {
            band: '90th percentile',
            experience: 'Typically lead or staff (8+ yrs)',
            value: '$282K',
          },
        ],
        note: 'AI Engineer title, United States. Sample size not published.',
        sourceLabel: 'Levels.fyi, AI Engineer, US',
        sourceUrl: 'https://www.levels.fyi/t/software-engineer/title/ai-engineer',
        asOf: 'Updated Nov 3, 2026',
      },
      {
        region: 'Europe: Germany',
        currency: 'EUR per year (total compensation)',
        rows: [
          {
            band: '25th percentile',
            experience: 'Typically early career (0–2 yrs)',
            value: '€70.6K',
          },
          { band: 'Median', experience: 'Typically mid-level (2–5 yrs)', value: '€81.1K' },
          { band: '75th percentile', experience: 'Typically senior (5–8 yrs)', value: '€100K' },
          {
            band: '90th percentile',
            experience: 'Typically lead or staff (8+ yrs)',
            value: '€125K',
          },
        ],
        note: 'AI Engineer title, Germany. Sample size not published.',
        sourceLabel: 'Levels.fyi, AI Engineer, Germany',
        sourceUrl: 'https://www.levels.fyi/t/software-engineer/title/ai-engineer/locations/germany',
        asOf: 'Updated Oct 28, 2026',
      },
      {
        region: 'Europe: Netherlands',
        currency: 'EUR per year (total compensation)',
        rows: [
          {
            band: '25th percentile',
            experience: 'Typically early career (0–2 yrs)',
            value: '€54.1K',
          },
          { band: 'Median', experience: 'Typically mid-level (2–5 yrs)', value: '€65.0K' },
          { band: '75th percentile', experience: 'Typically senior (5–8 yrs)', value: '€74.3K' },
          {
            band: '90th percentile',
            experience: 'Typically lead or staff (8+ yrs)',
            value: '€93.9K',
          },
        ],
        note: 'AI Engineer title, Netherlands. Sample size not published.',
        sourceLabel: 'Levels.fyi, AI Engineer, Netherlands',
        sourceUrl:
          'https://www.levels.fyi/t/software-engineer/title/ai-engineer/locations/netherlands',
        asOf: 'Updated Oct 15, 2026',
      },
    ],
    crossCheck:
      'For comparison: Levels.fyi reports a US median of $287,500 for Machine Learning Engineers (Nov 2, 2026), and a recent AI Engineer posting at Fluency in San Francisco listed a base salary of $180,000–$250,000 (posting closed July 2026). Strong AI engineers at product companies often negotiate towards ML-engineer pay.',
  },
  hiring: {
    intro:
      'Companies with the most people who started an AI Engineer, GenAI Engineer or LLM Engineer title in 2025–26. IT services firms lead because they are staffing GenAI projects for clients at scale.',
    companies: [
      { name: 'Tata Consultancy Services', count: 758, segment: 'IT services (India)' },
      { name: 'IBM', count: 393, segment: 'Enterprise tech' },
      { name: 'Deloitte', count: 333, segment: 'Consulting' },
      { name: 'Accenture', count: 242, segment: 'Consulting and IT services' },
      { name: 'Cognizant', count: 162, segment: 'IT services' },
      { name: 'Microsoft', count: 143, segment: 'Big Tech' },
      { name: 'Infosys', count: 140, segment: 'IT services (India)' },
      { name: 'Amazon', count: 55, segment: 'Big Tech' },
    ],
    method:
      'Source: Apollo.io people database, searched Nov 3, 2026. Titles counted: AI Engineer, Senior AI Engineer, Applied AI Engineer, Generative AI Engineer, GenAI Engineer and LLM Engineer, held for 670 days or less. Across all companies, 72,786 people match, 21,239 of them in India. Big Tech often uses titles such as "Software Engineer, AI", so their counts here are a lower bound.',
    sourceLabel: 'Apollo.io people search',
    asOf: 'Nov 3, 2026',
  },
  questionGroups: [
    {
      id: 'common',
      title: 'Common opening questions',
      blurb: 'Show that you have shipped, measured and learned, not just followed tutorials.',
      questions: [
        {
          q: 'Walk me through an AI feature or project you built.',
          answer:
            'Cover the user problem, why an LLM was the right tool, the architecture (model, retrieval, tools), how you evaluated it, what failed and how you fixed it, and the result in numbers: accuracy, latency, cost or user adoption. Interviewers dig into decisions, so be ready to defend each one.',
          lookFor: 'Real decisions, measurement and honest failures.',
        },
        {
          q: 'What is the difference between an AI engineer and an ML engineer?',
          answer:
            'ML engineers typically train, fine-tune and serve models, working with datasets, training pipelines and model architecture. AI engineers mostly build applications on top of existing foundation models: prompts, retrieval, agents, evals and product integration. The roles overlap, especially for fine-tuning and evaluation.',
          lookFor: 'A clear, non-dismissive distinction.',
        },
        {
          q: 'How do you keep up with new models and tools?',
          answer:
            'Describe a system, not a feed: you follow a few primary sources (model release notes, papers or engineering blogs), and when something new appears you test it on your own eval set before adopting it. Give an example of a model switch you made or rejected based on your evals.',
          lookFor: 'Evidence-based adoption.',
        },
        {
          q: 'Why do you want to work on AI here?',
          answer:
            "Connect the company's AI product or clients to problems you have worked on. Mention something specific you tried or noticed in their product and one idea you would explore.",
          lookFor: 'Specific interest and preparation.',
        },
      ],
    },
    {
      id: 'llm-fundamentals',
      title: 'LLM fundamentals',
      blurb: 'Explain clearly, then connect each concept to a product decision.',
      questions: [
        {
          q: 'What are tokens, and why do they matter for cost and latency?',
          answer:
            'Tokens are the chunks of text a model reads and writes; one word is often one to two tokens, and many non-English scripts use more. Pricing is per input and output token, and output tokens are generated one at a time, so long outputs increase latency. Shorter prompts, smaller contexts and concise outputs cut both cost and latency.',
          lookFor: 'Linking tokens to cost, latency and languages.',
        },
        {
          q: 'What does temperature do, and when would you set it to zero?',
          answer:
            "Temperature controls how random the model's choice of next token is. Low values make outputs more consistent, which suits extraction, classification and evals. Higher values add variety for brainstorming or creative text. Even at zero, outputs can vary slightly, so do not rely on exact repeatability.",
          lookFor: 'Correct intuition and practical defaults.',
        },
        {
          q: 'What is a context window, and what happens when you exceed it?',
          answer:
            'It is the maximum number of tokens the model can consider at once, including the prompt, retrieved documents, conversation history and the answer. If you exceed it, the request fails or content must be truncated. Even within the limit, very long contexts can cost more and reduce attention to important details, so retrieve and summarise selectively.',
          lookFor: 'Limits plus the quality trade-off of long contexts.',
        },
        {
          q: 'When would you fine-tune instead of using prompting or RAG?',
          answer:
            'Use prompting first, add retrieval when the model needs your facts, and fine-tune when you need consistent format, style or a narrow skill that prompting cannot reach, or a smaller, cheaper model to match a larger one on one task. Fine-tuning needs good labelled examples and an eval set to prove it helped. It is not the right way to add frequently changing knowledge.',
          lookFor: 'Ordered decision-making with evidence.',
        },
        {
          q: 'How do you get reliable structured output (JSON) from a model?',
          answer:
            "Use the provider's structured-output or function-calling feature with a schema where available, validate the output against the schema in code, retry with the validation error if it fails, and keep the schema simple. Log failures to improve prompts.",
          lookFor: 'Schema plus validation, not trust.',
        },
        {
          q: 'What are embeddings and what are they used for?',
          answer:
            'Embeddings are lists of numbers that represent the meaning of text, so similar meanings end up close together. They power semantic search, retrieval for RAG, clustering, deduplication and recommendations. Quality depends on the embedding model and on how you chunk the text.',
          lookFor: 'Clear definition with applications.',
        },
      ],
    },
    {
      id: 'rag',
      title: 'Retrieval (RAG) design',
      blurb: 'The most common AI engineer system-design topic.',
      questions: [
        {
          q: "Design a RAG system for a company's internal knowledge base.",
          answer:
            'Ingest documents with metadata (source, team, date, access group). Chunk by structure (sections, headings) with some overlap, embed and store in a vector index, ideally alongside keyword search (hybrid). At query time: rewrite the question if needed, retrieve with permission filters, rerank, and pass the top chunks to the model with instructions to cite sources and say "I don\'t know" when unsupported. Evaluate retrieval (did the right chunk come back?) and answers (correct and grounded?) separately, and keep the index fresh with incremental updates.',
          lookFor: 'Permissions, hybrid retrieval, citations and two-level evaluation.',
        },
        {
          q: 'How do you choose a chunking strategy?',
          answer:
            "Follow the document's structure: split on headings or sections rather than fixed character counts, keep chunks small enough to be specific but large enough to carry context, add overlap or parent-section context, and attach metadata. Then test: compare retrieval hit rate on your eval questions for two or three strategies.",
          lookFor: 'Structure-aware and empirically tested.',
        },
        {
          q: 'Your RAG system retrieves the right document but the answer is still wrong. Why?',
          answer:
            'Possible causes: the relevant passage was cut off or ranked low within the context, too many irrelevant chunks distracted the model, the prompt did not force use of sources, the question needed reasoning across several chunks, or the source itself was ambiguous. Fix with reranking, fewer but better chunks, clearer instructions and a citation requirement, then confirm on the eval set.',
          lookFor: 'Separating retrieval failure from generation failure.',
        },
        {
          q: 'What is hybrid search, and why use it?',
          answer:
            'Hybrid search combines keyword search (exact terms such as product codes, names and error messages) with vector search (meaning). Each catches what the other misses. Results are merged and often reranked by a cross-encoder or a model.',
          lookFor: 'Knowing why exact matching still matters.',
        },
        {
          q: 'How do you handle documents that update often?',
          answer:
            'Track document versions and timestamps, re-embed only changed documents, delete stale chunks, store the effective date as metadata and prefer the latest version at query time. Monitor index freshness as a metric.',
          lookFor: 'Incremental indexing and freshness.',
        },
      ],
    },
    {
      id: 'agents',
      title: 'Agents and tool use',
      blurb: 'Know when an agent helps and when a simple workflow is better.',
      questions: [
        {
          q: 'Design an agent that resolves customer refund requests.',
          answer:
            'Tools: look up order, check refund policy, issue refund (with limits), escalate to human. Flow: identify the customer and order, check eligibility against policy, refund automatically under a threshold and ask for human approval above it, then confirm to the customer. Log every tool call, cap the number of steps, and evaluate on historical tickets for correct decisions and policy compliance.',
          lookFor: 'Bounded autonomy, approvals and evaluation on real cases.',
        },
        {
          q: 'When is an agent the wrong choice?',
          answer:
            'When the steps are known and fixed, a deterministic workflow with one or two model calls is cheaper, faster and easier to test. Agents add value when the path depends on what is discovered along the way. Start simple and add autonomy only where it measurably improves results.',
          lookFor: 'Pragmatism over hype.',
        },
        {
          q: 'How do you stop an agent from looping or taking harmful actions?',
          answer:
            'Limit steps and budget, give it least-privilege tools, require confirmation for irreversible or high-value actions, validate tool inputs in code, detect repeated identical calls, and provide a clear "stop and escalate" path. Test with adversarial scenarios.',
          lookFor: 'Guardrails in code, not just in the prompt.',
        },
        {
          q: 'What is the Model Context Protocol (MCP)?',
          answer:
            'MCP is an open standard for connecting AI applications to tools and data sources. An MCP server exposes capabilities, such as querying a database or creating a ticket, that any compatible AI client can use. It reduces custom integration work and makes permissions and logging consistent across apps.',
          lookFor: 'Accurate definition and why it matters.',
        },
        {
          q: 'How would you evaluate an agent, not just a single response?',
          answer:
            'Define end-to-end tasks with known correct outcomes, run the agent in a sandbox, and score success, the number of steps, cost, time and any policy violations. Review traces of failures to see which step went wrong, and keep the task set as a regression suite.',
          lookFor: 'Task-level success plus trace review.',
        },
      ],
    },
    {
      id: 'evals-production',
      title: 'Evaluation and production',
      blurb: 'The skill that separates senior AI engineers from the rest.',
      questions: [
        {
          q: 'How do you build an eval set for a new AI feature?',
          answer:
            'Collect real inputs (logs, support tickets, user requests), cover common, hard and edge cases, write expected outputs or a grading rubric with domain experts, and include examples that should be refused. Start with 50–200 examples, grow it with every production failure, and run it on every prompt or model change.',
          lookFor: 'Real data, rubrics and continuous growth.',
        },
        {
          q: "Can you use an LLM to grade another LLM's output?",
          answer:
            'Yes, with care. Give the grader a specific rubric, ask for reasoning plus a score, check its agreement with human labels on a sample, and watch for bias towards longer or similar-sounding answers. Use code-based checks wherever possible (exact match, schema, citations present) and keep humans in the loop for subjective quality.',
          lookFor: 'Calibrated model grading.',
        },
        {
          q: 'Latency is 8 seconds and users are leaving. What do you do?',
          answer:
            'Measure each step first. Then: stream the response, cut prompt and context size, run retrieval and tool calls in parallel, cache frequent answers, use a smaller model for simple requests or first drafts, and pre-compute where possible. Track time to first token and p95 latency.',
          lookFor: 'Measure first, then several concrete levers.',
        },
        {
          q: 'Your monthly LLM bill tripled. How do you investigate?',
          answer:
            'Break cost down by feature, model, customer and token type. Common causes: a prompt that grew, longer conversation history, retries in a loop, a switch to a pricier model or abuse. Fix with caching, context limits, routing easy requests to cheaper models, batch processing for non-urgent jobs and per-user limits.',
          lookFor: 'Attribution before optimisation.',
        },
        {
          q: 'How do you defend against prompt injection?',
          answer:
            'Treat all retrieved or user-supplied content as untrusted data, separate it clearly from instructions, limit the tools and data the model can reach, require confirmation for sensitive actions, filter outputs that could leak secrets, and keep attack examples in your eval suite. No single defence is enough.',
          lookFor: 'Defence in depth.',
        },
        {
          q: 'How do you safely switch to a new model version?',
          answer:
            'Run the full eval suite on the new model, compare quality, latency and cost by task, review differences manually, then roll out gradually behind a flag with monitoring and a quick rollback. Pin model versions in production so behaviour does not change unexpectedly.',
          lookFor: 'Eval-gated, staged rollout.',
        },
      ],
    },
    {
      id: 'coding-behavioural',
      title: 'Coding and behavioural',
      blurb: 'Expect practical coding plus classic behavioural questions.',
      questions: [
        {
          q: 'Write a function that splits a long document into overlapping chunks.',
          answer:
            'Take the text, a chunk size and an overlap. Move a window forward by (size − overlap) each step and slice, preferably on sentence or paragraph boundaries rather than mid-word. Handle edge cases: overlap greater than or equal to size, empty text and a final short chunk. Mention that in production you would count tokens rather than characters.',
          lookFor: 'Correct windowing and edge cases.',
        },
        {
          q: 'Implement retries with exponential backoff for an LLM API call.',
          answer:
            'Wrap the call in a loop with a maximum number of attempts. On rate-limit or server errors, wait base × 2^attempt plus random jitter, then retry; on client errors such as invalid requests, fail immediately. Respect any retry-after header, set an overall timeout and log each attempt.',
          lookFor: 'Knowing which errors to retry.',
        },
        {
          q: 'Tell me about a time an AI system you built failed in production.',
          answer:
            'Describe the failure, how you detected it (ideally monitoring, not a customer complaint), the root cause, the fix, and what you added so it cannot recur: an eval case, an alert or a guardrail.',
          lookFor: 'Ownership and systemic fixes.',
        },
        {
          q: 'Tell me about a time you pushed back on using AI for something.',
          answer:
            'A strong answer shows judgement: the task was better solved with rules, search or a simple model, or the risk was too high. Explain the evidence you used and the outcome.',
          lookFor: 'Judgement over enthusiasm.',
        },
      ],
    },
  ],
  plans: [
    {
      days: '7 days',
      title: 'Interview next week',
      tasks: [
        'Day 1: Prepare a 2-minute walkthrough of your best AI project with numbers.',
        'Day 2: Revise tokens, context windows, temperature, embeddings and fine-tuning trade-offs.',
        'Day 3: Practise one RAG system design and one agent design out loud.',
        'Day 4: Code three practical problems: chunking, retries, and a small API integration.',
        'Day 5: Learn how to design evals and explain model-graded scoring.',
        'Day 6: Take a full AI mock interview and fix weak answers.',
        "Day 7: Research the company's AI products and prepare 3 questions.",
      ],
    },
    {
      days: '14 days',
      title: 'Two weeks to build proof',
      tasks: [
        'Week 1: Everything in the 7-day plan.',
        'Week 2: Build a RAG app with citations and a 50-question eval, deploy it and publish the eval table.',
        'Do two mock interviews: one system design, one project deep dive.',
        'Add the project to your resume with measured results.',
      ],
    },
    {
      days: '30 days',
      title: 'A month to switch into AI engineering',
      tasks: [
        'Week 1: Python and API fundamentals; call two model providers and compare outputs.',
        'Week 2: Build retrieval: chunking, embeddings, hybrid search and reranking.',
        'Week 3: Build an agent with two tools, guardrails and a task-level eval.',
        'Week 4: Deploy, write up both projects, practise 20 questions and apply with referrals.',
      ],
    },
  ],
  resources: [
    {
      title: "AI Engineering by Chip Huyen (O'Reilly)",
      url: 'https://www.oreilly.com/library/view/ai-engineering/9781098166298/',
      kind: 'Book',
      why: 'The standard book on building, evaluating and deploying foundation-model applications.',
    },
    {
      title: 'Building effective agents (Anthropic)',
      url: 'https://www.anthropic.com/engineering/building-effective-agents',
      kind: 'Guide',
      why: 'When to use workflows versus agents, with the main patterns.',
      free: true,
    },
    {
      title: 'OpenAI Cookbook',
      url: 'https://developers.openai.com/cookbook',
      kind: 'Guide',
      why: 'Worked code for retrieval, function calling and evals.',
      free: true,
    },
    {
      title: 'DeepLearning.AI short courses',
      url: 'https://www.deeplearning.ai/short-courses/',
      kind: 'Course',
      why: 'Short hands-on courses on RAG, agents and evaluation.',
      free: true,
    },
    {
      title: 'Claude prompt engineering guide',
      url: 'https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview',
      kind: 'Guide',
      why: 'Prompting techniques from a model provider.',
      free: true,
    },
    {
      title: 'AI Engineer conference (talks free on YouTube)',
      url: 'https://www.ai.engineer/about',
      kind: 'Community',
      why: 'Talks from practitioners shipping AI products.',
      free: true,
    },
    {
      title: 'Build a real-time voice AI agent in Python',
      url: '/blog/build-your-first-real-time-voice-ai-agent-python-2026',
      kind: 'Our guide',
      why: 'A portfolio project that covers streaming, latency and tool calls.',
      free: true,
    },
    {
      title: 'Best AI hackathon tools',
      url: '/blog/best-ai-hackathon-tools-2026',
      kind: 'Our guide',
      why: 'Free model APIs, vector databases and voice tools for fast projects.',
      free: true,
    },
    {
      title: 'Machine learning engineer interview questions',
      url: '/interview-questions/machine-learning-engineer',
      kind: 'Our guide',
      why: 'Core ML questions that often appear in AI engineer loops.',
      free: true,
    },
  ],
  related: [
    {
      label: 'Machine learning engineer resume template',
      href: '/cv-templates/machine-learning-engineer',
    },
    { label: 'Free AI mock interview', href: '/free-mock-interview' },
    { label: 'Forward Deployed Engineer hub', href: '/fde' },
    { label: 'AI Product Manager hub', href: '/aipm' },
  ],
  faqs: [
    {
      q: 'What does an AI engineer do?',
      a: 'An AI engineer builds applications on top of foundation models: prompts, retrieval over company data, tool-calling agents, evaluation pipelines and production systems that control cost, latency and safety. Most AI engineers use existing models rather than training their own.',
    },
    {
      q: 'What is the salary of an AI engineer in India?',
      a: 'Levels.fyi reports a median total compensation of about ₹17.8 lakh a year for AI Engineers in India, with the 25th percentile near ₹10.9 lakh and the 90th near ₹52.6 lakh (Nov 2026). Product companies and AI startups usually pay more than IT services firms.',
    },
    {
      q: 'Which companies hire the most AI engineers?',
      a: 'In our count of people who started an AI Engineer or GenAI Engineer title in 2025–26, Tata Consultancy Services, IBM, Deloitte, Accenture and Cognizant lead, followed by Microsoft, Infosys and Amazon. Startups collectively hire a large share too.',
    },
    {
      q: 'Do AI engineers need a machine learning degree?',
      a: 'No. Strong software engineering, an understanding of how LLMs, retrieval and evaluation work, and shipped projects with measured results matter more. ML knowledge helps for fine-tuning and evaluation work.',
    },
    {
      q: 'What questions are asked in an AI engineer interview?',
      a: 'Expect LLM fundamentals (tokens, context windows, fine-tuning versus RAG), RAG and agent system design, evaluation, latency and cost optimisation, prompt injection defence, practical coding, and a deep dive on a project you built.',
    },
  ],
}

export default aiEngineer
