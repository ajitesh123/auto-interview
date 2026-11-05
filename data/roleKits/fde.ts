import type { RoleKits } from './types'

// Keywords taken from the job posts in keywordSources (opened Nov 6, 2026).
// Sample people, companies and numbers are fictional and labelled as samples on the page.
// Role facts (skills, travel, metrics) match data/roleHubs/fde.ts.

export const FDE_KITS: RoleKits = {
  resume: {
    metaTitle: 'Forward Deployed Engineer Resume (CV): Examples 2026',
    metaDescription:
      'Forward Deployed Engineer resume and CV guide: what FDE screeners look for, 12 bullets, keywords from real FDE job posts, a sample and India vs US format.',
    h1: 'Forward Deployed Engineer resume (CV): examples, bullets and keywords',
    directAnswer:
      'An FDE resume has to prove two things fast: you ship production code, and you can do it inside a customer’s messy systems while keeping the customer on side. Lead with one deployment you owned from the first call to go-live, with the outcome the customer measured, and keep it to one page.',
    recruiterLens: [
      'One deployment you owned end to end: the customer’s problem, what you built on their systems, and the outcome they measured.',
      'Real engineering: production code in Python plus TypeScript or Java, SQL on messy data, APIs, authentication and integrations.',
      'Customer craft: discovery calls, scoping, weekly demos, and saying no to scope that would not deliver value.',
      'For AI deployments: an eval set built from the customer’s own examples, and how you handled latency, cost and failures.',
    ],
    format: {
      length:
        'One page under about 8 years of experience. Two pages only for staff-level FDEs with several large deployments.',
      sections: [
        'Name and contact (city, email, LinkedIn, GitHub)',
        'Two-line summary with your best customer deployment and its outcome',
        'Experience (most recent first; one bullet per deployment or customer outcome)',
        'Deployments and projects (essential for freshers and switchers)',
        'Skills (grouped: engineering, AI deployment, customer work, tools)',
        'Education and certifications',
      ],
      indiaNote:
        'In India “CV” and “resume” mean the same one- or two-page document. Skip the photo, date of birth and marital status. Do not put current CTC on the CV; recruiters ask for it, and for your notice period, in the application form. If you are open to travel, say so in one line: Indian FDE posts such as UnifyApps’ ask for willingness to travel to client sites.',
      usNote:
        'US recruiters expect one page, no photo and no personal details. Lead every bullet with a verb and a number. If you hold or can obtain a US security clearance, list it: some defence FDE posts, such as Code Metal’s, require one.',
    },
    summaries: [
      {
        level: 'Fresher or switching from software engineering',
        text: 'Backend engineer with 3 years building integrations in Python and TypeScript. Led the rollout of our API at 6 enterprise customers, joining their calls and fixing their edge cases in production. Moving into forward deployed engineering.',
      },
      {
        level: 'Experienced FDE or customer-facing engineer',
        text: 'Forward deployed engineer with 4 years of shipping code into customer environments. Took 5 enterprise customers from kickoff to production, including an AI claims assistant now used daily by 140 handlers at an insurer.',
      },
      {
        level: 'Senior / lead',
        text: 'Lead FDE across banking and logistics deployments. Took [N] customers from kickoff to production, wrote the deployment playbook the team now uses, and turned [N] field patterns into product features worth $[X]M in expansion.',
      },
    ],
    bulletBank: [
      {
        area: 'Customer deployments',
        bullets: [
          'Took [customer, e.g. a top-10 private bank] from kickoff to production in [N] weeks; first workflow live in [N] days.',
          'Built [integration or pipeline] connecting [customer system, e.g. SAP or Salesforce] to [product]; [N] records a day, [X]% fewer manual steps.',
          'Deployed [app or agent] on the customer’s own [cloud or on-prem] infrastructure and passed their security review in [N] weeks.',
        ],
      },
      {
        area: 'AI deployment and evals',
        bullets: [
          'Built a [N]-example eval set from the customer’s real [tickets or documents] with their experts; accuracy rose from [X]% to [Y]% before go-live.',
          'Built an MCP server exposing [customer system] to [N] agents, with read-only scopes and audit logging.',
          'Cut p95 latency from [X]s to [Y]s and cost per task by [X]% by [streaming, caching or routing to a smaller model].',
        ],
      },
      {
        area: 'Discovery and scoping',
        bullets: [
          'Ran discovery with [N] end users and the [executive sponsor]; turned “use AI for [area]” into a [N]-week pilot with agreed success metrics.',
          'Wrote scopes of work for [N] proof-of-concept and production deployments; [N] became paid expansions.',
          'Pushed back on [requested feature] that would not move the agreed metric; shipped [smaller alternative] in [N] days instead.',
        ],
      },
      {
        area: 'Product feedback and reuse',
        bullets: [
          'Turned a pattern seen at [N] customers into a product feature; new deployments now take [N] days instead of [N].',
          'Wrote the deployment playbook for [use case]; [N] FDEs used it on [N] new accounts.',
          'Sent [N] field issues to product with evidence (accounts affected, revenue at stake); [N] were fixed in the core product.',
        ],
      },
    ],
    beforeAfter: [
      {
        weak: 'Worked with clients to implement our platform.',
        strong:
          'Deployed our document-extraction pipeline on a logistics customer’s Azure tenant; manual data entry fell from 6 hours a day to 40 minutes within 5 weeks.',
        why: 'Names the deployment, the customer’s environment and the outcome the customer felt.',
      },
      {
        weak: 'Excellent communication skills and client-facing experience.',
        strong:
          'Ran weekly demos with the customer’s COO and 12 claims handlers; turned their feedback into 3 releases and won sign-off for a second workflow.',
        why: 'Shows customer craft through what happened, instead of claiming it as a trait.',
      },
      {
        weak: 'Built an AI chatbot using LangChain and GPT-4.',
        strong:
          'Built a support agent with retrieval over 1,800 policy pages and read-only account tools; 87% correct on 200 real customer conversations before go-live.',
        why: 'Tools are not the result. Say what it did, for which customer, and how you measured it.',
      },
    ],
    keywords: [
      {
        group: 'Customer delivery',
        terms: [
          'embed deeply with strategic customers',
          'technical, customer facing role',
          'customer discovery',
          'scopes of work',
          'proof-of-concept prototypes',
          'production deployments',
          'client sites',
        ],
      },
      {
        group: 'Engineering',
        terms: [
          'full-stack solutions',
          'Python',
          'relational databases (Postgres or MySQL)',
          'data pipelines',
          'API integrations',
          'legacy systems',
          'data structures, algorithms, and system design',
        ],
      },
      {
        group: 'AI deployment',
        terms: [
          'LLMs',
          'prompt engineering',
          'agent development',
          'evaluation frameworks',
          'MCP servers',
          'sub-agents',
          'GenAI/LLM use cases',
        ],
      },
      {
        group: 'Ways of working',
        terms: [
          'experiment-driven, iterative approach',
          'bias for action',
          'high agency',
          'repeatable deployment patterns',
          'deployment playbooks',
          'end-to-end deployment',
        ],
      },
    ],
    keywordSources: [
      {
        label: 'OpenAI, Forward Deployed Software Engineer, San Francisco',
        url: 'https://openai.com/careers/forward-deployed-software-engineer-sf/',
      },
      {
        label: 'Anthropic, Forward Deployed Engineer, Applied AI',
        url: 'https://job-boards.greenhouse.io/anthropic/jobs/4985877008',
      },
      {
        label: 'UnifyApps, Forward Deployed Software Engineer, Gurugram (updated Feb 2026)',
        url: 'https://www.foundit.in/job/forward-deployed-software-engineer-unifyapps-gurugram-38805222',
      },
      {
        label: 'Code Metal, Forward Deployed Engineer (posted Jun 18, 2026)',
        url: 'https://jobs.accel.com/companies/code-metal-2/jobs/83158991-forward-deployed-engineer',
      },
    ],
    projects: [
      {
        title: 'Deploy for a real small business',
        what: 'Find a local shop, college office or NGO with a manual workflow. Scope it with them, build a small tool or agent on their real data (a spreadsheet, a WhatsApp inbox), and keep it running for a month. Write down what changed for them.',
        proves:
          'You can run the whole FDE loop for a real user: discovery, build, deploy and support.',
      },
      {
        title: 'Build an MCP server for a common system',
        what: 'Expose a system companies use (a Postgres database, a ticketing tool, Google Sheets) as an MCP server with read-only tools, authentication and logging. Add a 30-example eval of an agent using it.',
        proves:
          'You can connect AI to enterprise systems safely, which is what AI-lab FDE posts ask for.',
      },
      {
        title: 'Write a mock scope of work',
        what: 'Pick a company you want to join and one of its customer types. Write a two-page scope: the problem, the data and systems needed, a 6-week plan, success metrics and risks.',
        proves:
          'You think in deployments and outcomes, the core of the decomposition round. Attach it to your application.',
      },
    ],
    mistakes: [
      {
        mistake: 'Writing it like a pure software engineer resume',
        fix: 'Put the customer in every bullet: whose problem, on whose systems, and what changed for them.',
      },
      {
        mistake: 'Naming customers who are under NDA',
        fix: 'Describe them instead (“a top-5 Indian private bank”, “a US hospital network”) and keep the numbers. Check your contract.',
      },
      {
        mistake: 'Listing “client-facing” as a skill with no proof',
        fix: 'Show one discovery call, demo or tough conversation and what came out of it.',
      },
      {
        mistake: 'Only demos and proofs of concept, nothing in production',
        fix: 'Lead with what went live and stayed live. Say how many users or records it handles.',
      },
      {
        mistake: 'Two-column, icon-heavy templates',
        fix: 'Use one column with clear headings. Recruiters skim, and parsers misread columns.',
      },
    ],
    sample: {
      name: 'Ishaan Kapoor (sample)',
      headline: 'Forward Deployed Engineer, AI deployments',
      contact: 'Bengaluru · ishaan@example.com · linkedin.com/in/example · github.com/example',
      summary:
        'Forward deployed engineer with 4 years of shipping code into customer environments. Took 5 enterprise customers from kickoff to production, including an AI claims assistant used daily by 140 handlers. Comfortable leading discovery with executives and debugging on site.',
      experience: [
        {
          role: 'Forward Deployed Engineer',
          org: 'Lumen Data Systems (fictional)',
          dates: '2023 – present',
          bullets: [
            'Deployed an AI claims assistant at a mid-size insurer on their own AWS account; 140 handlers use it daily and average handling time fell 31% in 8 weeks.',
            'Built a 250-example eval set from past claims with the insurer’s senior handlers; accuracy rose from 74% to 92% before go-live.',
            'Wrote an MCP server over the customer’s policy database with read-only scopes and audit logs; passed their security review in 3 weeks.',
            'Turned a document-ingestion pattern seen at 4 customers into a product connector; setup for new accounts fell from 10 days to 2.',
          ],
        },
        {
          role: 'Software Engineer, Integrations',
          org: 'Contoso Logistics Cloud (fictional)',
          dates: '2021 – 2023',
          bullets: [
            'Built REST and SFTP integrations with 9 customer ERPs in Python and TypeScript, processing 1.2 million shipment records a day.',
            'Joined weekly customer calls to debug failed syncs; cut integration support tickets by 45% with retries, idempotent writes and alerts.',
          ],
        },
      ],
      projects: [
        {
          name: 'Open-source MCP server for Postgres',
          line: 'Read-only tools, row-level permissions and query logging; used by 3 teams outside the company.',
        },
      ],
      skills: [
        'Python, TypeScript, SQL',
        'APIs, auth and integrations',
        'RAG, tool calling and MCP',
        'Evals from customer data',
        'Discovery and scoping',
        'AWS and Docker',
      ],
      education: 'B.Tech, Computer Science, 2021',
    },
    coverLetter: {
      subject: 'Forward Deployed Engineer application: [Your name]',
      body: 'Hi [Hiring manager name],\n\nI am applying for the Forward Deployed Engineer role. At Lumen I deploy our platform inside customer environments. Most recently I took an AI claims assistant live at an insurer, on their own AWS account: 140 handlers use it daily, and handling time fell 31%. It worked because we built the eval set from their real claims, with their senior handlers, before we shipped.\n\nI read about how [Company] works with [customer type]. I would start the way I always do: one workflow, one agreed metric, and something live in the first few weeks. I wrote a short scope of work for a [customer type] deployment (attached).\n\nI am comfortable with travel and on-site work. I would love 20 minutes to walk you through it.\n\n[Your name]',
    },
    linkedin: {
      headline:
        'Forward Deployed Engineer | Shipping AI into customer systems | Python, RAG, MCP, evals',
      about:
        'I get software working inside real businesses. Most recently I took an AI claims assistant from the first call to production at an insurer, built the eval set with their own experts, and turned patterns I saw across customers into product features. I like messy data, clear success metrics and customers who push back.',
    },
    faqs: [
      {
        q: 'How is an FDE resume different from a software engineer resume?',
        a: 'The code is the same; the framing is not. An FDE resume ties every bullet to a customer: whose problem, on whose systems, and what changed for them. A software engineer resume can stop at what was built.',
      },
      {
        q: 'Can a fresher get an FDE job without customer experience?',
        a: 'Yes. Palantir hires new graduates into its Forward Deployed Software Engineer role, and UnifyApps’ FDSE post in Gurugram asked for 1–2 years of experience or strong internship or project work. Build one project for a real user, keep it running, and write up what you learned from them.',
      },
      {
        q: 'How much experience do AI-lab FDE roles ask for?',
        a: 'More than early-career posts. Anthropic’s Forward Deployed Engineer, Applied AI post asks for 4+ years in a technical, customer-facing role, and OpenAI’s Forward Deployed Software Engineer post in San Francisco asks for 7+ years of full-stack engineering. Both mention travel: 25–50% at Anthropic and up to 50% at OpenAI.',
      },
      {
        q: 'Can I name my customers on my resume?',
        a: 'Only with permission. Most deployments are under NDA, so describe the customer by industry and size (“a top-5 Indian private bank”) and keep the numbers. Interviewers care about what you did, not the logo.',
      },
      {
        q: 'How long do recruiters spend on a resume?',
        a: 'A 2018 eye-tracking study by Ladders found recruiters spend about 7.4 seconds on the first skim. Simple one-column layouts with clear headings and bulleted results held attention best.',
      },
    ],
  },

  lor: {
    metaTitle: 'Letter of Recommendation for a Forward Deployed Engineer',
    metaDescription:
      'How to get a letter of recommendation for a Forward Deployed Engineer role: who should write it, what to highlight, a sample letter, the ask email and a brief.',
    h1: 'Letter of recommendation for a Forward Deployed Engineer',
    directAnswer:
      'The best FDE recommendation comes from someone who saw you deliver for a customer: your engagement lead or manager, or the customer-side sponsor who signed off your work. It should prove three things with specific stories: you ship working code in someone else’s environment, customers trust you in hard conversations, and you own the outcome, not just the tickets.',
    whoShouldWrite: [
      {
        who: 'Your manager or engagement lead',
        why: 'They saw the whole deployment: scope, setbacks, and how you handled the customer when things went wrong.',
      },
      {
        who: 'The customer-side sponsor or their tech lead',
        why: 'Unique to FDE work and very strong: the person you built for confirms the outcome. Ask your manager first and check your contract allows it.',
      },
      {
        who: 'A product or core engineering lead',
        why: 'Shows your field learnings changed the product, which is what separates a strong FDE from a consultant.',
      },
    ],
    whatToHighlight: [
      {
        quality: 'Ships in messy environments',
        evidence:
          '“Ishaan got our platform running on the insurer’s own AWS account, under their security rules, in five weeks.”',
      },
      {
        quality: 'Earns customer trust',
        evidence:
          '“When the pilot slipped, he told their COO first, with a new plan. She added a second workflow the next quarter.”',
      },
      {
        quality: 'Owns the outcome',
        evidence:
          '“He measured success by handling time on the claims floor, not by features shipped.”',
      },
      {
        quality: 'Makes the product better',
        evidence:
          '“A connector he built for one customer is now part of our product and saves every new account a week of setup.”',
      },
    ],
    structure: [
      {
        part: 'Opening',
        what: 'Who you are, your role, how long you worked with the candidate, on which engagements, and the role they are applying for.',
      },
      {
        part: 'Headline claim',
        what: 'One sentence that sums up the candidate, e.g. “the engineer I send to our hardest customers”. Only if true.',
      },
      {
        part: 'Two deployment stories',
        what: 'Each story: the customer situation, what the candidate built or decided, and the outcome the customer measured. Anonymise customers if needed.',
      },
      {
        part: 'How they handle people',
        what: 'One short paragraph on executives, end users and difficult customer engineers, with an example.',
      },
      {
        part: 'Close',
        what: 'A clear recommendation and an offer to talk, with your contact details.',
      },
    ],
    sampleLetter: {
      context: 'From an engagement lead, for a job application (fictional people and company)',
      paragraphs: [
        'I am Meera Iyer, Head of Deployments at Lumen Data Systems (fictional). Ishaan Kapoor reported to me for two years as a forward deployed engineer, and I worked alongside him on four customer engagements. I am glad to recommend him for a Forward Deployed Engineer role.',
        'Ishaan is the engineer I send to our hardest customers. At a mid-size insurer, he got our platform running on their own AWS account, under their security rules, in five weeks. Before shipping the claims assistant, he sat with their senior handlers and built a 250-example evaluation set from real claims. Accuracy rose from 74% to 92% before go-live, and 140 handlers now use it every day.',
        'He also tells customers hard news early. When a data-access delay put the pilot two weeks behind, he called their COO before she heard it from anyone else, with a smaller first release and a new date. We hit that date, and the customer added a second workflow the next quarter.',
        'Our product team values him too. He noticed the same document-ingestion problem at four customers, wrote it up with the evidence, and helped build the connector that now cuts setup for new accounts from ten days to two.',
        'I recommend Ishaan without reservation and am happy to talk to you about his work.',
      ],
      signoff:
        'Meera Iyer, Head of Deployments, Lumen Data Systems (fictional) · meera@example.com',
    },
    askEmail: {
      subject: 'Would you be a reference for a Forward Deployed Engineer role?',
      body: 'Hi [Name],\n\nI am applying for Forward Deployed Engineer roles, starting with [Company]. You saw my work on the [customer or project] deployment more closely than anyone, so I would be grateful if you could write a short recommendation or take a reference call.\n\nTo make it easy, I have attached a one-page brief: the role, three deployment stories you might mention, and the numbers. I have kept customer names out of it. Please change anything that does not match your memory.\n\nThe deadline is [date]. If now is a bad time, no problem at all.\n\nThank you,\n[Your name]',
    },
    brief: [
      'The job description and why you want customer-facing engineering work (two lines).',
      'Three deployment stories they saw, each with the customer situation, what you built or decided, and the outcome.',
      'The exact numbers (time to go-live, adoption, accuracy, hours saved), so they do not have to look them up.',
      'Which customer details are safe to mention and which must stay anonymous.',
      'The deadline, the format (letter, form or call) and where to send it.',
    ],
    variants: [
      {
        context: 'Job application or reference call',
        tweak:
          'Lead with one deployment and its outcome. Many companies prefer a 15-minute call to a letter, so ask which they want and prepare your recommender with the two stories in the brief.',
      },
      {
        context: 'MBA or master’s application',
        tweak:
          'Add growth and leadership: how the candidate grew from writing code to running customer relationships, and how they took feedback. Follow the school’s questions exactly.',
      },
      {
        context: 'Internal move or promotion (e.g. to senior FDE or deployment lead)',
        tweak:
          'Show they already work at the next level: leading an engagement alone, mentoring newer FDEs, or writing playbooks others use.',
      },
      {
        context: 'Referral note to a recruiter',
        tweak:
          'Three sentences: how you know them, the best deployment they delivered, and why they fit this FDE role.',
      },
    ],
    mistakes: [
      'Praising coding skill only. FDE hiring managers also want proof of judgement with customers.',
      'Naming a customer or sharing their numbers without permission.',
      'Asking a customer for a letter without telling your manager. Always ask your manager first.',
      'Generic praise (“great communicator”) with no story about a real customer conversation.',
      'Writing the letter yourself and asking them to sign it. Send a brief instead and let them use their own words.',
    ],
    faqs: [
      {
        q: 'Do FDE employers ask for letters of recommendation?',
        a: 'Most tech companies ask for reference calls rather than letters, usually late in the process. Letters matter more for MBA and master’s applications, internal moves and some Indian and European employers. The same brief works for both.',
      },
      {
        q: 'Can a customer write my recommendation?',
        a: 'Yes, and for FDE roles it is one of the strongest signals. Ask your manager first, check your contract, and let the customer decide what they are comfortable sharing.',
      },
      {
        q: 'Who should write it if I am switching into FDE from software engineering?',
        a: 'Someone who saw you work with users or other teams: a manager who watched you handle a customer escalation, or a support or sales lead you built tools for.',
      },
      {
        q: 'How long should a letter of recommendation be?',
        a: 'One page, four to five short paragraphs: introduction, two deployment stories with outcomes, how you work with people, and a clear close.',
      },
    ],
  },
}
