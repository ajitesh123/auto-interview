import type { RoleKits } from './types'

// Keywords taken from the job posts in keywordSources (opened Nov 6, 2026).
// Facts about the role (rounds, metrics, example bullets) match data/roleHubs/product-manager.ts.
// Sample people, companies and numbers are fictional and labelled as samples on the page.

export const PRODUCT_MANAGER_KITS: RoleKits = {
  resume: {
    metaTitle: 'Product Manager Resume (CV): Examples & Bullets 2026',
    metaDescription:
      'Product Manager resume and CV guide: what hiring PMs look for, 12 bullet examples, keywords from real PM job posts, a sample CV and a free Word template.',
    h1: 'Product Manager resume (CV): examples, bullets and keywords',
    directAnswer:
      'A PM resume should read like a list of decisions and launches: what you shipped, the metric it moved, and how you decided (user research, data, an A/B test). Put your strongest launch with a before-and-after number near the top, show the team you led without authority, and keep it to one page.',
    recruiterLens: [
      'Something you shipped and the metric it moved, with a baseline: conversion, retention, activation, revenue or time saved.',
      'How you decided: user interviews, SQL or a dashboard, an A/B test, a written spec. Hiring PMs look for judgement, not activity.',
      'Leading without authority: the size of the squad (engineers, designers, analysts) and the stakeholders you aligned.',
      'Fit with their product: consumer funnels and experiments for consumer apps; customers, specs and adoption for B2B SaaS.',
    ],
    format: {
      length:
        'One page under 8 years of experience. Two pages only for senior PMs, and only if every bullet still shows a result.',
      sections: [
        'Name and contact (city, email, LinkedIn, a link to a teardown, PRD or prototype)',
        'Two-line summary with your best launch and its metric',
        'Experience (most recent first; each bullet: what shipped, the metric, how you decided)',
        'Product projects (essential for freshers and switchers: teardowns, prototypes, side products)',
        'Skills (grouped: product, data, technical, AI tools)',
        'Education (with marks for Indian campus and early-career roles)',
      ],
      indiaNote:
        'In India “CV” and “resume” mean the same document. For campus APM roles and early-career PM roles, the one-page table format with marks, positions of responsibility and extra-curriculars is the norm, so our Word template uses it. Leave out the photo, date of birth and marital status. Do not write CTC on the CV; recruiters collect current CTC and notice period separately.',
      usNote:
        'US recruiters expect one page in a simple layout, no photo and no personal details. Lead with outcomes in US metric names (conversion, retention, ARR). Percentages travel better than rupee figures if your results come from India.',
    },
    summaries: [
      {
        level: 'Fresher or switcher (engineering, analytics, consulting)',
        text: 'Software engineer moving into product. Acted as product owner for a payments SDK: wrote the specs for 3 releases, interviewed 12 merchant developers and cut integration time from 5 days to 2. Builds clickable prototypes with AI tools and writes SQL.',
      },
      {
        level: 'Product Manager (3–6 years)',
        text: 'Product manager with 4 years in consumer commerce. Owns search and discovery: rebuilt filters and lifted search-to-cart conversion by 2.3 points in an A/B test. Leads a 6-person squad and decides with user interviews, SQL and experiments.',
      },
      {
        level: 'Senior PM / group PM',
        text: 'Senior PM leading [N] PMs across [product area]. Grew [metric] from [X] to [Y] over [N] quarters and set up the quarterly planning and experiment review the org still uses. Hires and coaches APMs.',
      },
    ],
    bulletBank: [
      {
        area: 'Shipping and outcomes',
        bullets: [
          'Led a [N]-person squad to rebuild [feature]; [metric] rose from [X]% to [Y]% in an A/B test over [N] weeks.',
          'Launched [product] to [N] users in [N] weeks with a staged rollout; [adoption metric] reached [X]% by week [N] with no rise in [guardrail].',
          'Cut [time or cost] from [X] to [Y] by redesigning [flow], saving [N] support tickets a month.',
        ],
      },
      {
        area: 'Discovery and research',
        bullets: [
          'Ran [N] user interviews with [segment]; found [insight], which reshaped the quarter’s roadmap.',
          'Turned [N] support tickets a month into a ranked problem list; the top fix cut tickets by [X]%.',
          'Tested [N] prototypes with [N] users before engineering started, dropping [N] ideas early.',
        ],
      },
      {
        area: 'Data and experiments',
        bullets: [
          'Root-caused a [X]% drop in [metric] to [cause] within [N] days using SQL and segment analysis; the fix recovered it in a week.',
          'Defined the north-star metric and [N] input metrics for [product]; they became the weekly review.',
          'Ran [N] A/B tests in [N] months with guardrails set before launch; [N] shipped and [N] were stopped and logged.',
        ],
      },
      {
        area: 'Strategy and stakeholders',
        bullets: [
          'Cut a [N]-item backlog to [N] bets for the quarter with impact and effort scores agreed with sales; [N] shipped on time.',
          'Wrote the case for [new product or market] with sized demand and a staged plan; approved with [budget or team].',
          'Aligned [N] teams on a shared launch plan, with go or no-go criteria and a rollback rule.',
        ],
      },
    ],
    beforeAfter: [
      {
        weak: 'Worked with engineering and design to launch new features.',
        strong:
          'Led a 6-person squad (4 engineers, 1 designer, 1 analyst) to rebuild search filters; filter use rose from 11% to 19% of sessions and search-to-cart conversion rose 2.3 points in an A/B test.',
        why: 'Names the team, what shipped, the metric, the baseline and how it was measured.',
      },
      {
        weak: 'Responsible for the product roadmap.',
        strong:
          'Cut a 40-item backlog to 6 bets for the quarter using impact and effort scores agreed with sales; 5 shipped on time and the top one lifted weekly active teams by 14%.',
        why: '“Responsible for” describes a job. Showing the cut, the method and the result shows judgement.',
      },
      {
        weak: 'Did user research for the app.',
        strong:
          'Ran 18 user interviews with tier-2 shoppers; found that cash-on-delivery anxiety, not price, blocked first orders, and shipped a pay-on-delivery badge that raised first-order conversion from 3.1% to 3.8%.',
        why: 'Research matters only for what it changed. This links the insight to a launch and a number.',
      },
    ],
    keywords: [
      {
        group: 'Product craft',
        terms: [
          'strong product sense and customer empathy',
          'customer-obsessed',
          'building 0-to-1 products',
          'validating new ideas in ambiguous environments',
          'navigate through ambiguity',
        ],
      },
      {
        group: 'Data and experiments',
        terms: [
          'data-driven',
          'product metrics and user behavior analysis',
          'strong analytical skills',
          'A/B testing and funnel optimization',
          'experimentation mindset',
        ],
      },
      {
        group: 'Leadership and communication',
        terms: [
          'cross-functional collaboration',
          'excellent written and verbal communication',
          'stakeholder management',
          'inspiring and mobilizing teams',
          'bias for action',
        ],
      },
      {
        group: 'Domain and technical',
        terms: [
          'consumer tech or fintech products',
          'B2B SaaS',
          'product-led growth',
          'technical background or ability to work effectively with engineering teams',
          'explore what’s possible with AI',
        ],
      },
    ],
    keywordSources: [
      {
        label: 'Razorpay, Senior Product Manager, Bangalore (Greenhouse)',
        url: 'https://job-boards.greenhouse.io/razorpaysoftwareprivatelimited/jobs/4638854005',
      },
      {
        label: 'Atlassian, Senior Product Manager, Bengaluru (careers site)',
        url: 'https://careers-apac-atlassian.icims.com/jobs/19197/senior-product-manager/job',
      },
      {
        label:
          'Anthropic, Product Manager, Growth, San Francisco / New York / Seattle (Greenhouse)',
        url: 'https://job-boards.greenhouse.io/anthropic/jobs/5406106008',
      },
      {
        label: 'Calendly, Staff Product Manager, New Products, San Francisco (Greenhouse)',
        url: 'https://job-boards.greenhouse.io/calendly/jobs/8450989002',
      },
    ],
    projects: [
      {
        title: 'A one-page product teardown',
        what: 'Use a product you want to work on for a week. Pick one user segment, rank its pains, propose the first thing you would build, and define the success metric and a guardrail.',
        proves:
          'The core PM loop: user, problem, solution, metric. Attach it to your application or link it from your CV.',
      },
      {
        title: 'A clickable prototype built with AI',
        what: 'Turn your teardown’s top idea into a working prototype with Claude, Lovable or v0. Test it with 5 people and write down what changed.',
        proves:
          'You can go from idea to something users can touch, which some loops now test directly.',
      },
      {
        title: 'A metrics deep-dive on public data',
        what: 'Take a public dataset (app reviews, a Kaggle e-commerce dataset), write SQL or a spreadsheet analysis, and write three findings with one product recommendation each.',
        proves: 'You can answer your own questions with data before asking an analyst.',
      },
    ],
    mistakes: [
      {
        mistake: 'Tasks instead of outcomes (“gathered requirements”, “wrote PRDs”)',
        fix: 'Rewrite each bullet as what shipped, the metric it moved and how you decided.',
      },
      {
        mistake: 'Claiming the whole company’s growth',
        fix: 'Say what your squad owned: “filters lifted search-to-cart by 2.3 points”, not “grew GMV 3x”.',
      },
      {
        mistake: 'No sign of how you decided',
        fix: 'Name the evidence: interviews, SQL, an A/B test, a spec reviewed with engineering.',
      },
      {
        mistake: 'Hiding the team',
        fix: 'Give the squad size and the functions you aligned; PMs are hired to lead without authority.',
      },
      {
        mistake: 'Jargon walls (“synergised cross-functional roadmaps”)',
        fix: 'Write plain sentences a hiring PM can read in 7 seconds.',
      },
    ],
    sample: {
      name: 'Ishaan Rao (sample)',
      headline: 'Product Manager, search and discovery',
      contact: 'Bengaluru · ishaan@example.com · linkedin.com/in/example',
      summary:
        'Product manager with 4 years in consumer commerce and fintech. Owns search and discovery for 2 million monthly shoppers: search-to-cart conversion up 2.3 points and first-order conversion up from 3.1% to 3.8%. Decides with user interviews, SQL and A/B tests; prototypes with AI tools.',
      experience: [
        {
          role: 'Product Manager',
          org: 'Bazaarly (fictional)',
          dates: '2023 – present',
          bullets: [
            'Led a 6-person squad to rebuild search filters; filter use rose from 11% to 19% of sessions and search-to-cart conversion rose 2.3 points in an A/B test.',
            'Ran 18 interviews with tier-2 shoppers; a pay-on-delivery badge raised first-order conversion from 3.1% to 3.8%.',
            'Root-caused an 8% drop in orders to a broken Android deep link within 2 days using SQL; added a daily alert.',
            'Cut a 40-item backlog to 6 quarterly bets with impact and effort scores; 5 shipped on time.',
          ],
        },
        {
          role: 'Associate Product Manager',
          org: 'LedgerLoop (fictional)',
          dates: '2021 – 2023',
          bullets: [
            'Owned the payments SDK: wrote specs for 3 releases and cut merchant integration time from 5 days to 2.',
            'Defined activation for new merchants and built the weekly cohort dashboard used by product and sales.',
          ],
        },
      ],
      projects: [
        {
          name: 'Teardown and AI prototype of a grocery app’s reorder flow',
          line: 'Ranked 5 pains, built a clickable prototype with an AI tool and tested it with 6 users.',
        },
      ],
      skills: [
        'Product discovery and user interviews',
        'PRDs and launch plans',
        'SQL, Mixpanel and Amplitude',
        'A/B test design and readouts',
        'Prototyping with Claude, Lovable and Figma',
        'Basic APIs and system design',
      ],
      education: 'B.Tech, Computer Science, 2021',
    },
    coverLetter: {
      subject: 'Product Manager application: [Your name]',
      body: 'Hi [Hiring manager name],\n\nI am applying for the Product Manager role on [team]. At Bazaarly I own search and discovery. Rebuilding our filters with a 6-person squad lifted search-to-cart conversion by 2.3 points in an A/B test, and 18 interviews with tier-2 shoppers led to a pay-on-delivery badge that raised first-order conversion from 3.1% to 3.8%.\n\nI used [Company] for two weeks. The biggest friction I found is [step] for [user segment]. I wrote a one-page teardown and built a clickable prototype of the first fix (link attached).\n\nCould we find 20 minutes this week to go through it?\n\n[Your name]',
    },
    linkedin: {
      headline:
        'Product Manager | Search, discovery and conversion | User research, SQL, A/B tests | Consumer commerce',
      about:
        'I decide what to build and prove it worked. At a commerce app I rebuilt search filters with a 6-person squad and lifted search-to-cart conversion by 2.3 points; interviews with tier-2 shoppers led to a pay-on-delivery badge that raised first-order conversion from 3.1% to 3.8%. I write my own SQL, prototype with AI tools, and log the experiments that fail as carefully as the ones that win.',
    },
    faqs: [
      {
        q: 'Should my PM resume lean towards consumer or B2B?',
        a: 'Match the post. Razorpay’s Senior PM post asks for “consumer tech or fintech products” and “product metrics and user behavior analysis”, so lead with funnel results. Atlassian’s Senior PM post asks for “B2B SaaS” and “inspiring and mobilizing teams”, so lead with customers and the teams you aligned.',
      },
      {
        q: 'I am a fresher. What do I put on a PM resume?',
        a: 'Marks, projects and positions of responsibility, in the one-page table format Indian campus recruiters expect. Add one product project with a result: a teardown, a prototype tested with users, or a side product with real users.',
      },
      {
        q: 'Should a PM resume mention AI tools?',
        a: 'Yes, with a use. Calendly’s Staff PM post says that wanting to “explore what’s possible with AI is a must”. Write “prototyped the reorder flow with Lovable and tested it with 6 users”, not just “ChatGPT” in a skills list.',
      },
      {
        q: 'Engineer to PM: how do I rewrite my resume?',
        a: 'Turn tasks into decisions. Instead of “built the payments API”, write what you decided about the product, who you spoke to and the metric that moved: “wrote the specs for 3 SDK releases after 12 developer interviews; integration time fell from 5 days to 2.”',
      },
      {
        q: 'How long do recruiters spend on a resume?',
        a: 'A 2018 eye-tracking study by Ladders found recruiters spend about 7.4 seconds on the first skim. Clear headings and bulleted results held attention best.',
      },
    ],
  },

  lor: {
    metaTitle: 'Letter of Recommendation for a Product Manager (Sample)',
    metaDescription:
      'How to get a letter of recommendation for a Product Manager: who should write it, what to highlight, a sample letter, the email to ask and the brief to send.',
    h1: 'Letter of recommendation for a Product Manager',
    directAnswer:
      'The best PM recommendation comes from someone who watched you decide and ship: your product lead, or an engineering or design lead from your squad. It should prove three things with specific stories: you found the right problem, you shipped something that moved a metric, and engineers and designers wanted to work with you.',
    whoShouldWrite: [
      {
        who: 'Your product lead or head of product',
        why: 'They set your goals and can confirm what you shipped and the metric it moved.',
      },
      {
        who: 'An engineering or design lead from your squad',
        why: 'PMs lead without authority, so a peer who chose to follow you is strong evidence.',
      },
      {
        who: 'A sales, support or business partner',
        why: 'Shows you listened to customers and balanced their asks against the roadmap.',
      },
    ],
    whatToHighlight: [
      {
        quality: 'Finds the right problem',
        evidence:
          '“Ishaan’s interviews showed us that cash-on-delivery anxiety, not price, was blocking first orders.”',
      },
      {
        quality: 'Ships and measures',
        evidence:
          '“His filter rebuild lifted search-to-cart conversion by 2.3 points in a clean A/B test.”',
      },
      {
        quality: 'Makes hard trade-offs',
        evidence:
          '“He cut a 40-item backlog to 6 bets and explained every cut to sales without losing their trust.”',
      },
      {
        quality: 'Engineers and designers want to work with him',
        evidence:
          '“He brings the problem and the data, not a finished design, and agrees what done means before we build.”',
      },
    ],
    structure: [
      {
        part: 'Opening',
        what: 'Who you are, your role, how long you worked with the candidate and how, and the role they are applying for.',
      },
      {
        part: 'Headline claim',
        what: 'One sentence that sums up the candidate, e.g. “the PM engineers ask to work with”. Only if true.',
      },
      {
        part: 'Two specific stories',
        what: 'Each story: the problem, how they decided, what shipped and the measured result.',
      },
      {
        part: 'How they lead without authority',
        what: 'One short paragraph on trade-offs, communication and how they handled a disagreement or a failed launch.',
      },
      {
        part: 'Close',
        what: 'A clear recommendation and an offer to talk, with your contact details.',
      },
    ],
    sampleLetter: {
      context: 'From a head of product, for a job application (fictional people and company)',
      paragraphs: [
        'I am Meera Iyer, Head of Product at Bazaarly (fictional), an online marketplace. Ishaan Rao has been a product manager on my team for two years, owning search and discovery. I am glad to recommend him for a Product Manager role.',
        'Ishaan is the PM our engineers ask to work with. When first orders from smaller cities stalled, the team assumed price was the problem. Ishaan ran eighteen interviews with shoppers in tier-2 cities and found the real blocker was fear of paying before delivery. A simple pay-on-delivery badge, tested against the old page, raised first-order conversion from 3.1% to 3.8%.',
        'He is just as rigorous when he builds. He led a six-person squad to rebuild our search filters, agreed the success metric with design before any work began, and ran a clean A/B test: search-to-cart conversion rose by 2.3 points.',
        'He also makes hard calls well. Last year he cut a forty-item backlog to six bets and walked our sales team through every item he dropped. They did not get everything they asked for, but they trusted the plan.',
        'I recommend Ishaan without reservation and would be happy to speak with you about his work.',
      ],
      signoff: 'Meera Iyer, Head of Product, Bazaarly (fictional) · meera@example.com',
    },
    askEmail: {
      subject: 'Would you be a reference for a PM role?',
      body: 'Hi [Name],\n\nI am applying for Product Manager roles, starting with [Company]. You saw my work on [launch or project] more closely than anyone, so I would be grateful if you could write a short recommendation or take a reference call.\n\nTo make it easy, I have attached a one-page brief: the role, two launches you might mention, and the before-and-after numbers. Please change anything that does not match your memory, and tell me if any number should stay private.\n\nThe deadline is [date]. If now is a bad time, no problem at all.\n\nThank you,\n[Your name]',
    },
    brief: [
      'The job description and why you want the role (two lines).',
      'Two launches they saw, each with the problem, how you decided, what shipped and the result.',
      'One trade-off or disagreement you handled, so they can speak to how you lead without authority.',
      'Which numbers are safe to share outside the company, and which to give as percentages only.',
      'The deadline, the format (letter, form or call) and where to send it.',
    ],
    variants: [
      {
        context: 'Job application or reference call',
        tweak:
          'Keep it to one page and lead with a launch and its metric. Many companies prefer a 15-minute call, so ask which they want.',
      },
      {
        context: 'MBA or master’s application',
        tweak:
          'Add growth and potential: how the candidate’s scope grew, a failure they learned from, and how they led people. Follow the school’s questions exactly.',
      },
      {
        context: 'Internal move (engineer or analyst to PM, APM to PM)',
        tweak:
          'Focus on PM work already done: specs written, users interviewed, a decision they drove, and how the squad responded.',
      },
      {
        context: 'Referral note to a recruiter',
        tweak:
          'Three sentences: how you know them, the best thing they shipped and its metric, and why they fit this product.',
      },
    ],
    mistakes: [
      'Generic praise (“strategic, customer-focused, a great communicator”) with no story behind it.',
      'Listing features shipped with no metric or user outcome.',
      'Crediting the PM with the engineers’ work. Describe what the PM decided and enabled.',
      'A senior recommender who barely saw the work. A specific letter from an engineering lead beats a vague one from a VP.',
      'Writing the letter yourself and asking them to sign it. Send a brief and let them use their own words.',
    ],
    faqs: [
      {
        q: 'Do PM roles ask for letters of recommendation?',
        a: 'Most companies use reference calls, often with your last manager and a peer. Letters matter more for MBA and master’s applications, internal moves and some Indian employers. The same brief works for both.',
      },
      {
        q: 'Who is the best person to recommend a Product Manager?',
        a: 'Your product lead first, then an engineering or design lead from your squad. A peer who chose to follow your lead shows the skill PMs are hired for.',
      },
      {
        q: 'How long should the letter be?',
        a: 'One page, four to five short paragraphs: introduction, two specific stories with numbers, how you lead without authority, and a clear close.',
      },
      {
        q: 'Can I write my own letter of recommendation?',
        a: 'Avoid it. Send your recommender a one-page brief with your launches and numbers, and let them write in their own voice.',
      },
    ],
  },
}
