import type { RoleKits } from './types'

// Keywords taken from the job posts in keywordSources (opened Nov 6, 2026).
// Sample people, companies and numbers are fictional and labelled as samples on the page.
// Role facts (skills, metrics, hiring companies) match data/roleHubs/ai-engineer.ts.

export const AI_ENGINEER_KITS: RoleKits = {
  resume: {
    metaTitle: 'AI Engineer Resume (CV): Examples, Bullets & Keywords 2026',
    metaDescription:
      'AI Engineer resume and CV guide: what screeners check, 12 bullet examples, keywords from real AI engineer job posts, a one-page sample and India vs US format.',
    h1: 'AI Engineer resume (CV): examples, bullets and keywords',
    directAnswer:
      'An AI engineer resume has to prove you have shipped LLM systems that real users rely on, not just built demos. Put one production RAG app or agent near the top, say how you measured its quality (evals), its latency and its cost, and keep it to one page.',
    recruiterLens: [
      'One LLM feature in production with real users, and a number: accuracy on an eval set, adoption, latency or cost per task.',
      'Evals: how you built the test set, what you measured (faithfulness, hallucination rate, task success) and the regressions it caught.',
      'Production engineering: Python or TypeScript, APIs, async code and streaming, monitoring, retries and fallbacks.',
      'Judgement on trade-offs: which model and why, RAG versus fine-tuning, and when an agent is the wrong tool.',
    ],
    format: {
      length:
        'One page under about 8 years of experience. Two pages only for staff-level engineers or research-heavy profiles.',
      sections: [
        'Name and contact (city, email, LinkedIn, GitHub, live demo link)',
        'Two-line summary with your best production AI result',
        'Experience (most recent first, 3–5 bullets each)',
        'Projects with evals (essential for freshers and switchers)',
        'Skills (grouped: languages, LLM stack, evals and observability, infrastructure)',
        'Education, publications and certifications',
      ],
      indiaNote:
        'In India “CV” and “resume” mean the same one- or two-page document. Skip the photo, date of birth and marital status. Do not put current CTC on the CV; recruiters ask for it, and for your notice period, in the application form. Indian AI engineer posts, such as Workfall’s in Bengaluru, name specific tools (LangChain, LlamaIndex, FastAPI, vector databases), so name the ones you used inside your bullets.',
      usNote:
        'US recruiters expect one page, no photo and no personal details. Lead every bullet with a verb and a number. Link a live demo or a repo with an eval table, so a screener can check your work in a minute.',
    },
    summaries: [
      {
        level: 'Fresher or switching from software engineering',
        text: 'Backend engineer with 2 years in Python and FastAPI. Built and deployed a RAG assistant over our 3,000-page internal wiki; 120 colleagues use it weekly, and it scores 86% on a 150-question eval set. Moving into AI engineering.',
      },
      {
        level: 'Experienced AI engineer',
        text: 'AI engineer with 4 years of software experience, the last 2 shipping LLM features in B2B SaaS. Built the RAG and agent stack behind our support copilot, with evals that gate every prompt and model change. Cut p95 latency from 7.2s to 2.5s and cost per task by 45%.',
      },
      {
        level: 'Senior / lead',
        text: 'Lead AI engineer. Owns the LLM platform for [N] product teams: model gateway, eval harness and production monitoring. Took [N] AI features from prototype to production and cut model spend by [X]% with routing and caching.',
      },
    ],
    bulletBank: [
      {
        area: 'Shipping LLM features',
        bullets: [
          'Shipped [RAG assistant or agent] from prototype to production in [N] weeks; [N] users, [X]% weekly active.',
          'Built retrieval over [N] documents with hybrid search and reranking; retrieval hit rate rose from [X]% to [Y]% on [N] eval questions.',
          'Built a tool-calling agent for [workflow] with [N] tools and human approval above [threshold]; [X]% of cases resolved without a human.',
        ],
      },
      {
        area: 'Evals and quality',
        bullets: [
          'Built a [N]-example gold dataset from real [tickets or queries]; it gates every prompt and model change and caught [N] regressions.',
          'Cut unsupported answers from [X]% to [Y]% with citations, a refusal path and a faithfulness check in the eval suite.',
          'Set up an LLM-as-judge grader with a written rubric; [X]% agreement with human labels on [N] samples.',
        ],
      },
      {
        area: 'Latency, cost and reliability',
        bullets: [
          'Cut p95 latency from [X]s to [Y]s with streaming, parallel tool calls and a smaller model for first drafts.',
          'Reduced cost per task by [X]% with prompt caching and routing easy requests to a cheaper model, with no drop in eval score.',
          'Added retries with backoff, a provider fallback and alerts; failed requests fell from [X]% to [Y]%.',
        ],
      },
      {
        area: 'Production and safety',
        bullets: [
          'Added prompt-injection defences and kept [N] attack examples in the eval suite; zero data-leak incidents in [N] months.',
          'Built tracing and quality dashboards for [N] LLM endpoints; time to detect a quality regression fell from [N] days to [N] hours.',
          'Migrated [feature] from [model A] to [model B] with a full eval run and a flag-gated rollout; [X]% lower cost at the same score.',
        ],
      },
    ],
    beforeAfter: [
      {
        weak: 'Built a chatbot using LangChain, OpenAI and Pinecone.',
        strong:
          'Built a support assistant with hybrid retrieval over 2,400 help articles; 84% correct on 300 real tickets, now answering 1,100 questions a day.',
        why: 'The stack is not the result. Say what it does, how you measured it and who uses it.',
      },
      {
        weak: 'Worked on improving LLM accuracy and reducing hallucinations.',
        strong:
          'Built a 300-example eval set with support leads and added a citation check; unsupported answers fell from 14% to 3% before launch.',
        why: 'Shows how quality was measured, with a baseline, not just that it improved.',
      },
      {
        weak: 'Optimised performance of AI features.',
        strong:
          'Cut p95 latency from 8s to 2.4s by streaming responses and running retrieval and tool calls in parallel; chat drop-off fell by a third.',
        why: '“Optimised” says nothing. Name the metric, the lever and what users felt.',
      },
    ],
    keywords: [
      {
        group: 'LLM systems',
        terms: [
          'LLM-powered applications',
          'agentic workflows',
          'tool-calling pipelines',
          'multi-agent architectures',
          'MCP (Model Context Protocol) servers',
          'structured output and function calling',
          'multiple LLM providers',
          'prompt engineering',
        ],
      },
      {
        group: 'Retrieval',
        terms: [
          'RAG pipelines',
          'embeddings',
          'vector databases',
          'chunking',
          'hybrid retrieval and reranking',
          'metadata filtering',
          'retrieval tuning',
          'pgvector',
        ],
      },
      {
        group: 'Evals and quality',
        terms: [
          'LLM evaluation frameworks',
          'gold datasets',
          'synthetic evals',
          'regression tests',
          'faithfulness',
          'hallucination reduction',
          'guardrails',
          'LangSmith, Ragas, or OpenAI Evals',
        ],
      },
      {
        group: 'Production',
        terms: [
          'from prototype to production',
          'token, latency, and cost optimization',
          'monitoring, logging, and alerting',
          'fallbacks, retries',
          'async systems',
          'FastAPI',
          'Docker, Kubernetes',
          'CI/CD',
        ],
      },
    ],
    keywordSources: [
      {
        label: 'BambooBox, Senior AI Engineer (LLM Systems & Evaluation), Bengaluru',
        url: 'https://jobs.weekday.works/senior-ai-engineer-llm-systems-evaluation-at-bamboobox-4401168982',
      },
      {
        label: 'Workfall, AI Engineer (RAG & Multi-Agent Systems), Bengaluru (posted Feb 26, 2026)',
        url: 'https://onjob.io/company/workfall/external/ai-engineer-(rag-and-multi-agent-systems)/78e062a4-c599-406f-8d9d-9d326a53e15c',
      },
      {
        label: 'Fluency, AI Engineer, San Francisco (posted May 2026)',
        url: 'https://jobera.com/job/fluency-ai-engineer-ecbecd9f/',
      },
    ],
    projects: [
      {
        title: 'RAG app with a public eval table',
        what: 'Pick documents people actually search (your university’s rules, a government scheme FAQ, an open-source project’s docs). Build retrieval with citations, write 50–100 real questions with expected answers, and publish accuracy, latency and cost per query in the README.',
        proves:
          'You measure quality instead of eyeballing demos, which is the first thing AI engineer screeners check.',
      },
      {
        title: 'A small agent with guardrails',
        what: 'Build an agent with two or three tools for one real job, such as triaging GitHub issues. Cap the steps, require approval for writes, log every tool call, and score it on 30 end-to-end tasks.',
        proves: 'You can make an agent safe and testable, not just impressive once.',
      },
      {
        title: 'A model comparison write-up',
        what: 'Run the same eval set on three models (one small, one large, one open-weight). Compare quality, p95 latency and cost per 1,000 requests, and recommend one with reasons.',
        proves: 'You choose models with evidence, which every AI engineer post asks for.',
      },
    ],
    mistakes: [
      {
        mistake: 'Listing frameworks with no result (“LangChain, LlamaIndex, CrewAI, AutoGen”)',
        fix: 'Name a tool once, inside a bullet that shows what you built with it and how it performed.',
      },
      {
        mistake: 'Accuracy claims with no eval set',
        fix: 'Say what it was measured on: how many examples, where they came from, and how they were scored.',
      },
      {
        mistake: 'Only notebooks and tutorial clones',
        fix: 'Deploy one project behind an API with logging and link it. Production is the job.',
      },
      {
        mistake: 'Ignoring latency and cost',
        fix: 'Put p95 latency or cost per task in at least one bullet. Every post we checked asks for it.',
      },
      {
        mistake: 'Two-column, icon-heavy templates',
        fix: 'Use one column with clear headings. Recruiters skim, and parsers misread columns.',
      },
    ],
    sample: {
      name: 'Ananya Reddy (sample)',
      headline: 'AI Engineer, LLM applications',
      contact: 'Hyderabad · ananya@example.com · linkedin.com/in/example · github.com/example',
      summary:
        'AI engineer with 4 years of software experience, the last 2 shipping LLM features in production. Built the RAG and agent stack behind a support copilot used by 300 agents, with an eval suite that gates every prompt and model change.',
      experience: [
        {
          role: 'AI Engineer',
          org: 'Fabrikam Support Cloud (fictional)',
          dates: '2024 – present',
          bullets: [
            'Built a support copilot with hybrid retrieval over 2,400 help articles; 300 agents use it daily and 84% of drafts are sent with light or no edits.',
            'Built a 300-example eval set from real tickets with support leads; it caught 6 regressions before release in its first year.',
            'Cut p95 latency from 7.2s to 2.5s with streaming and parallel retrieval, and cost per draft by 45% by routing short tickets to a smaller model.',
            'Added prompt-injection checks, a provider fallback and tracing; zero data-leak incidents across 1.4 million requests.',
          ],
        },
        {
          role: 'Software Engineer',
          org: 'Tailspin Payments (fictional)',
          dates: '2022 – 2024',
          bullets: [
            'Built Python and FastAPI services for payment reconciliation, handling 900,000 transactions a day.',
            'Shipped an internal LLM tool that labels payment-failure reasons; 91% agreement with the ops team on 500 labelled cases.',
          ],
        },
      ],
      projects: [
        {
          name: 'Open eval of three embedding models on Indian-language support queries',
          line: '400 questions in Hindi, Telugu and English; results table and code on GitHub.',
        },
      ],
      skills: [
        'Python, TypeScript, SQL',
        'RAG: chunking, hybrid search, reranking',
        'Agents, tool calling and MCP',
        'Evals and LLM-as-judge',
        'FastAPI, Docker, AWS',
        'Tracing and monitoring',
      ],
      education: 'B.Tech, Computer Science, 2022',
    },
    coverLetter: {
      subject: 'AI Engineer application: [Your name]',
      body: 'Hi [Hiring manager name],\n\nI am applying for the AI Engineer role. At Fabrikam I built the support copilot that 300 agents use every day. The part I am proudest of is the eval suite: 300 real tickets that every prompt and model change must pass. It caught 6 regressions before they reached users, and it let us cut cost per draft by 45% with confidence.\n\nI tried [Company]’s product and noticed [specific behaviour, e.g. slow answers on long documents]. I would start by building an eval set from real user inputs, then work on latency and cost against it. I wrote a short note on how I would approach it: [link].\n\nI would love 20 minutes to walk you through it.\n\n[Your name]',
    },
    linkedin: {
      headline: 'AI Engineer | Production LLM apps: RAG, agents and evals | Python, FastAPI',
      about:
        'I build LLM features that people rely on every day. Most recently I built a support copilot used by 300 agents, with an eval suite that gates every change, and cut its p95 latency from 7.2 seconds to 2.5. I care about measured quality, fast responses and systems that fail safely.',
    },
    faqs: [
      {
        q: 'What should an AI engineer resume show that a software engineer resume does not?',
        a: 'Evals and trade-offs. Show how you measured quality (an eval set, a hallucination rate), the latency and cost you hit, and why you chose a model or approach. BambooBox’s Senior AI Engineer post in Bengaluru, for example, lists proven experience designing LLM evaluation frameworks as a requirement, not a bonus.',
      },
      {
        q: 'I am a fresher with no AI job experience. What do I put on my resume?',
        a: 'A projects section with one deployed RAG app and one small agent, each with an eval table: how many test questions, accuracy, latency and cost. Link the repo and a live demo.',
      },
      {
        q: 'Should I list every framework I have used?',
        a: 'No. Name the tools a post asks for only where you really used them, inside bullets. Workfall’s AI Engineer post in Bengaluru names LangChain, LlamaIndex and several vector databases, but one bullet that shows a result with one of them beats a list of all of them.',
      },
      {
        q: 'Is an AI engineer resume the same as an ML engineer resume?',
        a: 'Not quite. ML engineer resumes lead with training and serving models. AI engineer resumes lead with applications on top of foundation models: retrieval, agents, evals, latency and cost. If you have done both, put first the one that matches the post.',
      },
      {
        q: 'How long do recruiters spend on a resume?',
        a: 'A 2018 eye-tracking study by Ladders found recruiters spend about 7.4 seconds on the first skim. Simple one-column layouts with clear headings and bulleted results held attention best.',
      },
    ],
  },

  lor: {
    metaTitle: 'Letter of Recommendation for an AI Engineer (Sample)',
    metaDescription:
      'How to get a letter of recommendation for an AI Engineer job or MS application: who to ask, what to highlight, a sample letter, the ask email and a brief.',
    h1: 'Letter of recommendation for an AI Engineer',
    directAnswer:
      'The best AI engineer recommendation comes from someone who saw your system in production: your tech lead, engineering manager or the PM who owned the feature (for freshers and MS applicants, a project guide who supervised a real build). It should prove three things with specific stories: you measure quality with evals, you make sound trade-offs on latency and cost, and you own what you ship after launch.',
    whoShouldWrite: [
      {
        who: 'Your tech lead or engineering manager',
        why: 'They can vouch for code quality, system design and how you handled production incidents.',
      },
      {
        who: 'The product manager who owned the AI feature',
        why: 'Shows you build for users and outcomes, not just for interesting models.',
      },
      {
        who: 'A professor or project guide (freshers and MS applicants)',
        why: 'Common for Indian students applying for an MS. Strongest when they supervised a project you actually built and evaluated.',
      },
    ],
    whatToHighlight: [
      {
        quality: 'Measures quality',
        evidence:
          '“Ananya built a 300-ticket eval set before we shipped, and it caught six regressions in the first year.”',
      },
      {
        quality: 'Makes sound trade-offs',
        evidence:
          '“She showed with evals that a smaller model handled short tickets just as well, cutting cost per draft by 45%.”',
      },
      {
        quality: 'Builds for production',
        evidence:
          '“She added a provider fallback and tracing before launch, so when our model provider had an outage, users barely noticed.”',
      },
      {
        quality: 'Explains AI clearly',
        evidence:
          '“Support leads trusted the copilot because she showed them exactly where it failed and what we changed.”',
      },
    ],
    structure: [
      {
        part: 'Opening',
        what: 'Who you are, your role, how long and in what capacity you worked with the candidate, and the role or programme they are applying for.',
      },
      {
        part: 'Headline claim',
        what: 'One sentence that sums up the candidate, e.g. “one of the most careful applied AI engineers I have worked with”. Only if true.',
      },
      {
        part: 'Two specific stories',
        what: 'Each story: the problem, what the candidate built or decided, and the measured result (accuracy, latency, cost or adoption).',
      },
      {
        part: 'How they work with others',
        what: 'One short paragraph on code reviews, design notes and explaining model failures to non-engineers.',
      },
      {
        part: 'Close',
        what: 'A clear recommendation and an offer to talk, with your contact details.',
      },
    ],
    sampleLetter: {
      context: 'From a tech lead, for a job application (fictional people and company)',
      paragraphs: [
        'I am Rohan Desai, Staff Engineer and tech lead for the AI team at Fabrikam Support Cloud (fictional). Ananya Reddy worked on my team for two years, building our support copilot, and I am glad to recommend her for an AI Engineer role.',
        'Ananya is one of the most careful AI engineers I have worked with. Before we launched the copilot, she sat with our support leads and turned 300 real tickets into an evaluation set. Every prompt or model change has had to pass it since. In its first year it caught six regressions that would otherwise have reached our 300 support agents.',
        'She also makes trade-offs with data. When model costs grew, she ran the eval set against a smaller model, showed it handled short tickets just as well, and routed them there. Cost per draft fell by 45%. Separately, she cut p95 latency from 7.2 seconds to 2.5 by streaming responses and running retrieval in parallel.',
        'Ananya writes clear design notes, reviews code carefully and explains failures to non-engineers without jargon. Our support leads trust the copilot largely because she showed them where it was weak and what we were doing about it.',
        'I recommend Ananya without reservation and would be happy to talk to you about her work.',
      ],
      signoff:
        'Rohan Desai, Staff Engineer, Fabrikam Support Cloud (fictional) · rohan@example.com',
    },
    askEmail: {
      subject: 'Would you be a reference for an AI Engineer role?',
      body: 'Hi [Name],\n\nI am applying for AI Engineer roles, starting with [Company]. You saw my work on [project] more closely than anyone, so I would be grateful if you could write a short recommendation or take a reference call.\n\nTo make it easy, I have attached a one-page brief: the role, three stories you might mention, and the numbers (eval results, latency and cost). Please change anything that does not match your memory.\n\nThe deadline is [date]. If now is a bad time, no problem at all.\n\nThank you,\n[Your name]',
    },
    brief: [
      'The job description or programme, and why you want it (two lines).',
      'Three stories they saw, each with the problem, what you built or decided, and the result.',
      'The exact numbers: eval set size, accuracy before and after, latency, cost and users.',
      'A one-line plain-English description of each system, so a non-specialist reader (such as an admissions committee) can follow.',
      'The deadline, the format (letter, portal form or call) and where to send it.',
    ],
    variants: [
      {
        context: 'Job application or reference call',
        tweak:
          'Lead with one production system and its measured results. Many companies prefer a 15-minute call to a letter, so ask which they want; the same stories work.',
      },
      {
        context: 'MS or MBA application',
        tweak:
          'Add potential: how the candidate learned, the depth of their technical work and how they compare with others the recommender has taught or managed. Follow the portal’s questions exactly.',
      },
      {
        context: 'Internal move or promotion (e.g. into the AI team or to senior AI engineer)',
        tweak:
          'Show work already at the next level: owning an AI feature end to end, setting up evals others use, or leading a model migration.',
      },
      {
        context: 'Referral note to a recruiter',
        tweak:
          'Three sentences: how you know them, the AI system they shipped and its best number, and why they fit this role.',
      },
    ],
    mistakes: [
      'Listing technologies (“skilled in LangChain and vector databases”) instead of saying what the candidate built.',
      'Accuracy claims with no context. Say what it was measured on.',
      'A well-known professor or VP who barely knows your work. A specific letter from your project guide or tech lead beats a vague one.',
      'Writing the letter yourself and asking them to sign it. Send a brief instead and let them use their own words.',
    ],
    faqs: [
      {
        q: 'Do AI engineer jobs need a letter of recommendation?',
        a: 'Most tech companies ask for reference calls rather than letters, usually near the offer stage. Letters matter most for MS and MBA applications, internal moves and some Indian and European employers. The same brief works for all of them.',
      },
      {
        q: 'Who should write my LOR for an MS in AI or computer science?',
        a: 'A professor or project guide who supervised real work, plus your manager or tech lead if you have work experience. Each letter should describe something you built, how you evaluated it and what you learned.',
      },
      {
        q: 'Can my product manager write the letter instead of an engineer?',
        a: 'Yes, especially for product-company roles. Pair it with a reference from an engineer if you can, so both your judgement and your technical depth are covered.',
      },
      {
        q: 'How long should a letter of recommendation be?',
        a: 'One page, four to five short paragraphs: introduction, two specific stories with results, how you work with others, and a clear close.',
      },
    ],
  },
}
