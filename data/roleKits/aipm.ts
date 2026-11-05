import type { RoleKits } from './types'

// Keywords taken from the job posts in keywordSources (opened Nov 6, 2026).
// Sample people, companies and numbers are fictional and labelled as samples on the page.

export const AIPM_KITS: RoleKits = {
  resume: {
    metaTitle: 'AI Product Manager Resume (CV): Examples & Bullets 2026',
    metaDescription:
      'AI Product Manager resume and CV guide: what recruiters look for, 12 bullet examples, keywords from real AI PM job posts, a one-page sample and India vs US format.',
    h1: 'AI Product Manager resume (CV): examples, bullets and keywords',
    directAnswer:
      'An AI PM resume has to prove two things fast: you shipped products people used, and you understand how AI products succeed or fail. Put one AI result with a number near the top, name the evals and metrics you owned, and keep it to one page.',
    recruiterLens: [
      'One shipped AI feature with a real metric: adoption, accuracy, cost per task or time saved.',
      'Evidence you can define “good” for a model: evals, golden datasets, error analysis, guardrails.',
      'Classic PM signals: discovery with real users, prioritisation, a launch you owned end to end.',
      'Range across the team: ML engineers, design, legal and go-to-market.',
    ],
    format: {
      length:
        'One page under about 8 years of experience. Two pages only if every line earns its place.',
      sections: [
        'Name and contact (city, email, LinkedIn, portfolio or GitHub)',
        'Two-line summary with your strongest AI result',
        'Experience (most recent first, 3–5 bullets each)',
        'AI projects or side builds (essential for switchers)',
        'Skills (grouped: product, AI, data, tools)',
        'Education and certifications',
      ],
      indiaNote:
        'In India “CV” and “resume” mean the same one- or two-page document. Skip the photo, date of birth and marital status. Do not put current CTC on the CV; recruiters ask for it in the form.',
      usNote:
        'US recruiters expect one page, no photo and no personal details. Lead every bullet with a verb and a number.',
    },
    summaries: [
      {
        level: 'Switching from engineering or analytics',
        text: 'Software engineer turned product builder. Shipped an LLM support-reply feature used by 40 agents, raising first-draft acceptance from 31% to 58% with an eval set built from real tickets. Moving into AI product management.',
      },
      {
        level: 'Experienced PM adding AI',
        text: 'Product manager with 6 years in B2B SaaS. Led our first GenAI feature from discovery to GA: 22% of weekly active accounts use it, cost per task down 40% after a model switch. Comfortable with evals, pricing and enterprise rollout.',
      },
      {
        level: 'Senior / lead',
        text: 'Group PM for AI features across three products. Built the eval and launch process the company now uses for every model change. Grew AI-attributed revenue to $[X]M ARR.',
      },
    ],
    bulletBank: [
      {
        area: 'Shipping AI features',
        bullets: [
          'Launched [feature] using [model/RAG/agents] for [users]; [X]% of weekly active users adopted it within [N] weeks.',
          'Cut cost per task by [X]% by routing simple requests to a smaller model, with no drop in eval score.',
          'Took an LLM prototype to GA in [N] weeks with staged rollout, kill switch and human review for low-confidence answers.',
        ],
      },
      {
        area: 'Evals and quality',
        bullets: [
          'Built a [N]-example golden dataset from real user inputs; used it to block [N] regressions before release.',
          'Defined quality rubric with support leads; raised answer accuracy from [X]% to [Y]% over [N] model iterations.',
          'Ran weekly error analysis with ML engineers; top three failure types fell from [X]% to [Y]% of responses.',
        ],
      },
      {
        area: 'Discovery and strategy',
        bullets: [
          'Interviewed [N] customers to find where AI saved real time; reprioritised roadmap around the top workflow.',
          'Wrote the pricing and packaging for [AI add-on]; [X]% attach rate in the first quarter.',
          'Killed an AI feature that tested well in demos but failed evals on real data; saved [N] engineer-months.',
        ],
      },
      {
        area: 'Cross-functional leadership',
        bullets: [
          'Aligned legal, security and sales on data-use terms so [N] enterprise customers could turn AI features on.',
          'Ran launch with marketing and support: help docs, demo script and an escalation path for wrong answers.',
          'Mentored [N] PMs on writing AI specs with example inputs, expected outputs and failure cases.',
        ],
      },
    ],
    beforeAfter: [
      {
        weak: 'Worked on AI chatbot project.',
        strong:
          'Owned the support chatbot roadmap; resolution without a human rose from 18% to 41% after we added retrieval over 2,300 help articles.',
        why: 'Names your ownership, the technique and a before/after number.',
      },
      {
        weak: 'Responsible for improving model accuracy.',
        strong:
          'Built a 400-example eval set with support leads; accuracy on refund questions rose from 72% to 91% before launch.',
        why: 'Shows you know how quality is measured, not just that it improved.',
      },
      {
        weak: 'Collaborated with engineering and design on GenAI features.',
        strong:
          'Wrote specs with sample inputs and expected outputs for 3 GenAI features; engineering estimates dropped from weeks to days.',
        why: '“Collaborated” says nothing. Say what you produced and what changed.',
      },
    ],
    keywords: [
      {
        group: 'AI and models',
        terms: [
          'LLMs',
          'evals',
          'RAG',
          'AI agents',
          'agentic orchestration',
          'prompt engineering',
          'fine-tuning',
          'classical machine learning',
        ],
      },
      {
        group: 'Quality and data',
        terms: [
          'evaluation frameworks',
          'gold-standard datasets',
          'AI observability',
          'data pipelines',
          'data flywheels',
          'end-to-end model lifecycle',
        ],
      },
      {
        group: 'Product',
        terms: [
          'product vision, roadmap and priorities',
          'customer discovery',
          'concept to launch',
          'go-to-market',
          'stakeholder alignment',
          'business outcomes',
        ],
      },
      {
        group: 'Governance',
        terms: ['responsible AI', 'AI governance', 'guardrails', 'enterprise SaaS'],
      },
    ],
    keywordSources: [
      {
        label: 'EvenUp, AI Product Manager (posted Mar 2026)',
        url: 'https://www.jobera.com/job/evenup-ai-product-manager-3a483cd6/',
      },
      {
        label: 'Harness, Director of PM, AI Evals',
        url: 'https://www.tealhq.com/job/director-of-product-management-ai-evals_7ea1a331cea8a2e9936afb523a0c6fd85e5ba',
      },
      {
        label: 'AI Product Manager (Teal job listing)',
        url: 'https://www.tealhq.com/job/ai-product-manager_7ea1abfd791f1841cde211d8861277b7e4817',
      },
    ],
    projects: [
      {
        title: 'Eval a real AI product',
        what: 'Pick an AI feature you use (a support bot, an AI search). Write 50 realistic test inputs, score the answers against a rubric, and publish the failure patterns with fixes.',
        proves: 'You can define quality, which is the core AI PM skill.',
      },
      {
        title: 'Ship a small agent',
        what: 'Build a workflow in n8n or with the OpenAI or Claude API that does one job end to end, such as summarising support tickets into a weekly report. Track time saved.',
        proves: 'You understand tools, cost and failure modes from the inside.',
      },
      {
        title: 'Write a one-page AI spec',
        what: 'Spec an AI feature for a company you want to join: user, job to be done, example inputs and outputs, eval plan, launch guardrails and the metric that decides success.',
        proves: 'You think like their PM before they hire you. Attach it to your application.',
      },
    ],
    mistakes: [
      {
        mistake: 'Listing “AI” as a skill with no proof',
        fix: 'Replace it with one line that shows an AI result and how you measured it.',
      },
      {
        mistake: 'Describing model work as if you trained the model',
        fix: 'Say what you owned: the problem, the eval, the launch. Credit the ML team for the model.',
      },
      {
        mistake: 'Accuracy numbers with no baseline',
        fix: 'Always give before and after, and say what it was measured on.',
      },
      {
        mistake: 'Buzzword clusters (“GenAI, LLM, NLP, ML, AI”)',
        fix: 'Use each term once, inside a bullet that shows you used it.',
      },
      {
        mistake: 'Two-column, icon-heavy templates',
        fix: 'Use one column with clear headings. Recruiters skim, and parsers misread columns.',
      },
    ],
    sample: {
      name: 'Aarav Mehta (sample)',
      headline: 'Product Manager, AI features',
      contact: 'Bengaluru · aarav@example.com · linkedin.com/in/example',
      summary:
        'Product manager with 5 years in B2B SaaS. Led our first LLM feature from discovery to GA, now used by 22% of weekly active accounts. Owns evals, pricing and enterprise rollout for AI features.',
      experience: [
        {
          role: 'Product Manager, AI',
          org: 'Northwind Software (fictional)',
          dates: '2023 – present',
          bullets: [
            'Launched AI reply drafts for support teams; 22% of weekly active accounts adopted it within 10 weeks.',
            'Built a 400-example eval set with support leads; accuracy on refund questions rose from 72% to 91% before GA.',
            'Cut cost per draft by 40% by routing short tickets to a smaller model with no drop in eval score.',
            'Aligned legal and security on data-use terms, unblocking 14 enterprise customers.',
          ],
        },
        {
          role: 'Product Manager',
          org: 'Contoso Payments (fictional)',
          dates: '2021 – 2023',
          bullets: [
            'Interviewed 35 finance teams; rebuilt invoice matching around the top workflow, raising activation from 38% to 55%.',
            'Ran 12 A/B tests on onboarding; time to first payment fell from 6 days to 2.',
          ],
        },
      ],
      projects: [
        {
          name: 'Public eval of three AI meeting-notes tools',
          line: '60 test meetings, a 5-point rubric and a write-up read by 4,000 people.',
        },
      ],
      skills: [
        'Discovery and specs',
        'Evals and error analysis',
        'RAG and agents (conceptual)',
        'SQL',
        'Experiment design',
        'Pricing',
      ],
      education: 'B.Tech, Computer Science, 2019',
    },
    coverLetter: {
      subject: 'AI Product Manager application: [Your name]',
      body: 'Hi [Hiring manager name],\n\nI am applying for the AI Product Manager role. At Northwind I took our first LLM feature from discovery to GA: 22% of weekly active accounts use it, and we cut cost per task by 40% without losing quality, because we measured every change against an eval set built with our support team.\n\nI looked at how [Company] handles [specific workflow]. I would start by building an eval set from real customer inputs, so we can ship improvements quickly and know they are real. I wrote a one-page spec of how I would approach it (attached).\n\nI would love 20 minutes to walk you through it.\n\n[Your name]',
    },
    linkedin: {
      headline: 'Product Manager, AI features | Evals, RAG and agents | B2B SaaS',
      about:
        'I build AI features that people keep using. Most recently I led an LLM support feature from discovery to GA (22% weekly adoption) and built the eval process our team now uses for every model change. I care about measurable quality, honest metrics and shipping in small, safe steps.',
    },
    faqs: [
      {
        q: 'Should I call it a resume or a CV for AI PM roles?',
        a: 'Both words work. In India and the UK “CV” is common, in the US “resume”. For product roles it is the same one-page document either way.',
      },
      {
        q: 'I have no AI product experience. What do I put on my resume?',
        a: 'Add an AI projects section: one public eval of an AI product, one small agent you built, and one AI spec for a company you want to join. Each line should end with a result or a number.',
      },
      {
        q: 'Do I need to show that I can code?',
        a: 'Not for most AI PM roles. Show that you understand how models are evaluated, what they cost and how they fail. Basic SQL helps you answer your own questions.',
      },
      {
        q: 'How long do recruiters spend on a resume?',
        a: 'A 2018 eye-tracking study by Ladders found recruiters spend about 7.4 seconds on the first skim. Simple one-column layouts with clear headings and bulleted results held attention best.',
      },
    ],
  },

  lor: {
    metaTitle: 'Letter of Recommendation for an AI Product Manager (Sample)',
    metaDescription:
      'How to get a strong letter of recommendation for an AI Product Manager role: who should write it, what to highlight, a sample letter, the email to ask and a brief to send.',
    h1: 'Letter of recommendation for an AI Product Manager',
    directAnswer:
      'The best AI PM recommendation comes from someone who saw you ship, ideally an engineering or ML lead or your manager. It should prove three things with specific stories: you define quality before you build, you make clear trade-offs, and people across functions trust your judgement.',
    whoShouldWrite: [
      {
        who: 'Your manager or skip-level',
        why: 'They can speak to scope, ownership and how you handled hard calls.',
      },
      {
        who: 'An ML or engineering lead you worked with',
        why: 'For AI roles this is the strongest signal: a technical partner vouching for your judgement.',
      },
      {
        who: 'A customer or design partner',
        why: 'Shows you understand users, and adds credibility for B2B roles.',
      },
    ],
    whatToHighlight: [
      {
        quality: 'Defines quality before building',
        evidence:
          '“Before we wrote a line of code, Aarav built a 400-example eval set with our support team.”',
      },
      {
        quality: 'Makes clear trade-offs',
        evidence:
          '“He chose a smaller model for short tickets, cutting cost 40% with no drop in quality.”',
      },
      {
        quality: 'Ships safely',
        evidence:
          '“He insisted on a staged rollout with a kill switch, which saved us during the first week.”',
      },
      {
        quality: 'Earns trust across functions',
        evidence:
          '“Legal and security signed off in two weeks because his proposal answered their questions upfront.”',
      },
    ],
    structure: [
      {
        part: 'Opening',
        what: 'Who you are, your role, how long and in what capacity you worked with the candidate, and the role they are applying for.',
      },
      {
        part: 'Headline claim',
        what: 'One sentence that sums up the candidate, e.g. “one of the best AI product thinkers I have worked with”. Only if true.',
      },
      {
        part: 'Two specific stories',
        what: 'Each story: the situation, what the candidate did, and the measurable result.',
      },
      {
        part: 'How they work with others',
        what: 'One short paragraph on collaboration, feedback and judgement under pressure.',
      },
      {
        part: 'Close',
        what: 'A clear recommendation and an offer to talk, with your contact details.',
      },
    ],
    sampleLetter: {
      context: 'From an engineering manager, for a job application (fictional people and company)',
      paragraphs: [
        'I am Priya Rao, Engineering Manager for the AI platform team at Northwind Software (fictional). I worked closely with Aarav Mehta for two years while he was the product manager for our first LLM features, and I am glad to recommend him for an AI Product Manager role.',
        'Aarav is one of the clearest product thinkers I have worked with on AI. Before we built our support reply feature, he sat with our support leads and turned 400 real tickets into an evaluation set with a scoring rubric. That set became how the whole team decided what “better” meant. Accuracy on the hardest category rose from 72% to 91% before launch, and we never shipped a change that lowered the score.',
        'He also makes trade-offs with numbers, not opinions. When costs grew, he proposed routing short tickets to a smaller model, ran it against the eval set, and showed no quality drop. Our cost per draft fell by 40%.',
        'Engineers like working with Aarav because his specs include example inputs, expected outputs and failure cases, so we spend our time building instead of guessing. Legal and security trusted him because he answered their questions before they asked.',
        'I recommend Aarav without reservation. I am happy to talk to you about his work.',
      ],
      signoff: 'Priya Rao, Engineering Manager, Northwind Software (fictional) · priya@example.com',
    },
    askEmail: {
      subject: 'Would you be a reference for an AI PM role?',
      body: 'Hi [Name],\n\nI am applying for AI Product Manager roles, starting with [Company]. You saw my work on [project] more closely than anyone, so I would be grateful if you could write a short recommendation or take a reference call.\n\nTo make it easy, I have attached a one-page brief: the role, three stories you might mention, and the numbers. Please change anything that does not match your memory.\n\nThe deadline is [date]. If now is a bad time, no problem at all.\n\nThank you,\n[Your name]',
    },
    brief: [
      'The job description and why you want the role (two lines).',
      'Three stories they witnessed, each with the situation, what you did and the result.',
      'The exact numbers, so they do not have to look them up.',
      'The qualities the role screens for (from this page) and which story proves each one.',
      'The deadline, the format (letter, form or call) and where to send it.',
    ],
    variants: [
      {
        context: 'Job application or reference call',
        tweak:
          'Keep it to one page and lead with shipped results. Many companies prefer a 15-minute call to a letter, so ask which they want.',
      },
      {
        context: 'MBA or master’s application',
        tweak:
          'Add growth and potential: how the candidate improved over time and how they handled feedback. Follow the school’s questions exactly.',
      },
      {
        context: 'Internal move or promotion',
        tweak:
          'Focus on scope and impact at the next level, with examples of operating there already.',
      },
      {
        context: 'Referral note to a recruiter',
        tweak: 'Three sentences: how you know them, their best result, and why they fit this role.',
      },
    ],
    mistakes: [
      'Generic praise (“hard-working, team player”) with no story behind it.',
      'Claims with no numbers, when the numbers exist.',
      'A recommender who barely knows your work. A specific letter from a peer beats a vague one from a VP.',
      'Writing the letter yourself and asking them to sign it. Send a brief instead and let them use their own words.',
    ],
    faqs: [
      {
        q: 'Do companies still ask for letters of recommendation for AI PM jobs?',
        a: 'Most tech companies ask for reference calls rather than letters. Letters matter more for MBA and master’s applications, internal moves and some Indian and European employers. The same brief works for both.',
      },
      {
        q: 'Who is the best person to write an AI PM recommendation?',
        a: 'Someone who saw you ship. An engineering or ML lead who can vouch for your judgement on quality and trade-offs is especially strong for AI roles.',
      },
      {
        q: 'How long should a letter of recommendation be?',
        a: 'One page, four to five short paragraphs: introduction, two specific stories with results, how you work with others, and a clear close.',
      },
      {
        q: 'Can I write my own letter of recommendation?',
        a: 'Avoid it. Send your recommender a one-page brief with stories and numbers instead, and let them write in their own voice.',
      },
    ],
  },
}
