import type { RoleKits } from './types'

// Keywords taken from the job posts in keywordSources (opened Nov 6, 2026).
// Facts about the role (stack, metrics, posted pay) match data/roleHubs/gtm-engineer.ts.
// Sample people, companies and numbers are fictional and labelled as samples on the page.

export const GTM_ENGINEER_KITS: RoleKits = {
  resume: {
    metaTitle: 'GTM Engineer Resume (CV): Examples & Bullets 2026',
    metaDescription:
      'GTM Engineer resume and CV guide: what hiring managers look for, 12 bullet examples, keywords from real GTM job posts, a sample CV and India vs US format.',
    h1: 'GTM Engineer resume (CV): examples, bullets and keywords',
    directAnswer:
      'A GTM engineer resume has to show that you built systems that created pipeline, not that you know a list of tools. Lead with one workflow and its revenue result (meetings booked, pipeline created, speed to lead), name the stack you built it on (Clay, n8n, a CRM, APIs, SQL), and keep it to one page.',
    recruiterLens: [
      'One workflow you built end to end, with a revenue number: meetings booked, pipeline sourced, reply rate or speed to lead.',
      'The stack, used for something real: Clay tables and waterfall enrichment, n8n or Make, HubSpot or Salesforce, APIs and webhooks.',
      'Enough engineering to be trusted with data and sending: SQL, Python or JavaScript, rate limits, deduplication and email deliverability.',
      'Revenue sense: a clear ICP, a funnel with conversion rates, and sellers who actually used what you built.',
    ],
    format: {
      length:
        'One page for almost everyone. The title is new, so few people have more than a page of directly relevant work. Two pages only for senior engineers with a long software career.',
      sections: [
        'Name and contact (city, email, LinkedIn, GitHub or a link to your workflow case studies)',
        'Two-line summary with your best pipeline result',
        'Experience (most recent first, 3–5 bullets each, every bullet ending in a number)',
        'GTM builds or case studies (essential for switchers from SDR, RevOps or engineering)',
        'Skills (grouped: GTM tools, engineering, AI, data)',
        'Education and certifications (Clay certification if you have it)',
      ],
      indiaNote:
        'In India “CV” and “resume” mean the same one- or two-page document. Leave out the photo, date of birth and marital status. Do not put current or expected CTC on the CV, and leave your notice period for the application form, where recruiters ask for both. Many Indian GTM engineers work for US or European startups and agencies, so say which markets your campaigns targeted and which time zones you have worked across.',
      usNote:
        'US recruiters expect one page, no photo and no personal details. Start each bullet with a verb and end it with a number. Use the sales team’s words: “pipeline sourced”, “meetings booked”, “speed to lead”, with money in dollars.',
    },
    summaries: [
      {
        level: 'Switching from SDR, RevOps or engineering',
        text: 'SDR turned GTM builder. Automated account research for a 6-person SDR team with Clay, an LLM step and HubSpot; meetings booked per rep rose from 9 to 14 a month. Writes Python for API calls and SQL for reporting.',
      },
      {
        level: 'Experienced GTM engineer',
        text: 'GTM engineer with 3 years at B2B SaaS startups. Built signal-based outbound in Clay, n8n and Salesforce that sourced $2.1M of pipeline in a year, and cut cost per enriched record by 45% with waterfall enrichment and caching.',
      },
      {
        level: 'Senior / lead',
        text: 'Lead GTM engineer. Owns the data, enrichment and routing layer for a [N]-rep revenue team. Built the AI research agent reps use before every call: [X]% weekly usage and $[X]M of influenced pipeline.',
      },
    ],
    bulletBank: [
      {
        area: 'Enrichment and data',
        bullets: [
          'Built a waterfall enrichment in Clay across [N] providers; email coverage rose from [X]% to [Y]% and cost per enriched record fell [X]%.',
          'Wrote a Python job that enriches [N] records a day within API rate limits, with caching, retries and a resume point; no record paid for twice.',
          'Deduplicated [N] CRM contacts using email, LinkedIn URL and domain matching; completeness on key fields rose from [X]% to [Y]%.',
        ],
      },
      {
        area: 'Outbound and deliverability',
        bullets: [
          'Built signal-based outbound (hiring, funding, tech-stack changes) for [segment]; [N] meetings booked and $[X] pipeline sourced in [N] months.',
          'Set up SPF, DKIM and DMARC on [N] secondary sending domains with warm-up and daily caps; bounce rate held under [X]% at [N] emails a month.',
          'Traced a reply-rate drop from [X]% to [Y]% to domain reputation; recovered to [Z]% in [N] weeks and added daily inbox-placement checks.',
        ],
      },
      {
        area: 'Inbound, routing and CRM',
        bullets: [
          'Rebuilt lead routing in [HubSpot/Salesforce] for [N] reps across [N] regions; median speed to lead fell from [X] hours to [Y] minutes.',
          'Built lead scoring from fit and product-usage signals, back-tested on [N] closed deals; conversion on top-tier leads rose from [X]% to [Y]%.',
          'Synced product sign-up events into the CRM with webhooks; sales now sees [N] product-qualified leads a week that were invisible before.',
        ],
      },
      {
        area: 'AI agents and internal tools',
        bullets: [
          'Built an AI account-research agent in [n8n/Clay] with [Claude/OpenAI]; [N] reps use it weekly, saving about [N] hours each.',
          'Added a grounding check that blocks AI first lines citing facts not in the enrichment data; spot-checked [N] samples per batch before send.',
          'Shipped an internal [Next.js] app for [task] used by [N] sellers; [metric] improved from [X] to [Y].',
        ],
      },
    ],
    beforeAfter: [
      {
        weak: 'Managed Clay tables and automations for the sales team.',
        strong:
          'Built a Clay workflow that researches 1,200 target accounts a week and drafts a first line from a real buying signal; meetings booked rose from 22 to 37 a month.',
        why: 'Says what the system does, at what volume, and the revenue result. “Managed tables” says nothing.',
      },
      {
        weak: 'Worked on CRM data quality.',
        strong:
          'Merged 18,000 duplicate contacts across HubSpot and our enrichment tool by email, LinkedIn URL and domain; reps stopped double-emailing accounts and field completeness rose from 61% to 88%.',
        why: 'Names the method and the business effect, which tells a hiring manager you can be trusted with their CRM.',
      },
      {
        weak: 'Skilled in Python, APIs, n8n, Zapier, Make, Clay, Apollo, Instantly, HubSpot, Salesforce.',
        strong:
          'Wrote an n8n and Python pipeline that enriches inbound demo requests and routes them to the right rep; speed to lead fell from 9 hours to 4 minutes.',
        why: 'A tool list is a claim. One bullet that uses three of the tools to move a number is proof.',
      },
    ],
    keywords: [
      {
        group: 'Clay and enrichment',
        terms: [
          'Clay tables',
          'waterfall enrichment',
          'enrichment pipelines',
          'custom data models',
          'multi-step outbound logic',
          'signal-based workflows',
          'enrichment providers',
        ],
      },
      {
        group: 'Automation and engineering',
        terms: [
          'APIs, webhooks, and automation workflows',
          'Zapier, n8n, Make',
          'SQL or Python basics',
          'full-stack development',
          'Next.js app to production',
          'AI SDK',
        ],
      },
      {
        group: 'AI',
        terms: [
          'AI-powered workflows',
          'Claude prompts',
          'AI agents',
          'AI-driven personalization at scale',
          'AI models and APIs (OpenAI, Anthropic)',
          'Claude Code',
        ],
      },
      {
        group: 'Revenue and CRM',
        terms: [
          'Salesforce or HubSpot',
          'lead scoring',
          'routing',
          'intent signals',
          'outbound activation',
          'pipeline metrics, attribution, and funnel analysis',
          'RevOps',
          'Smartlead, Instantly, Apollo',
        ],
      },
    ],
    keywordSources: [
      {
        label: 'Vercel, GTM Engineer (Greenhouse)',
        url: 'https://job-boards.greenhouse.io/vercel/jobs/5777645004',
      },
      {
        label: 'GTMBase, Senior GTM Engineer (posted Feb 27, 2026)',
        url: 'https://www.jobera.com/job/gtmbaseio-senior-gtm-engineer-c427df7c/',
      },
      {
        label: 'Hire Overseas, GTM Engineer (Clay & Claude) (Workable)',
        url: 'https://jobs.workable.com/jobs/a34ef0b3-a799-4d7f-95eb-c7f11d1ae4d2.md',
      },
      {
        label: 'Sympower, GTM Engineer (Clay.com & Automation Expert)',
        url: 'https://careers.sympower.net/o/gtm-engineer-claycom-automation-expert',
      },
    ],
    projects: [
      {
        title: 'Build a signal-based target list',
        what: 'Pick a real B2B product. Define its ICP, pull 200 matching companies, enrich them in Clay with a waterfall, score them on one buying signal (such as hiring for a role the product helps), and draft a first line for the top 50. Publish the table structure and the scoring rule.',
        proves: 'You can turn an ICP into a working, explainable list, which is most of the job.',
      },
      {
        title: 'Automate inbound routing end to end',
        what: 'Use n8n and a free HubSpot account: a form submission fires a webhook, the lead is enriched and scored, and a CRM record is created with an owner. Time it end to end and write up how you handled duplicates and missing domains.',
        proves:
          'You understand webhooks, CRM logic and speed to lead, and you think about edge cases.',
      },
      {
        title: 'Run one real campaign and report it',
        what: 'Help a friend’s business, a college club or a non-profit with a small outbound or reactivation campaign. Use a separate sending domain with SPF, DKIM and DMARC, keep volume modest, and report replies and meetings honestly.',
        proves: 'Deliverability and revenue sense, with a result you can put on your resume.',
      },
    ],
    mistakes: [
      {
        mistake: 'A wall of tool names and logos',
        fix: 'Keep a short skills line grouped by type, and put each important tool inside a bullet that shows what you built with it.',
      },
      {
        mistake: 'Activity numbers instead of outcomes (“sent 50,000 emails”)',
        fix: 'Report what the volume produced: replies, meetings, pipeline. Volume alone can read as a deliverability risk.',
      },
      {
        mistake: 'Results with no baseline',
        fix: 'Give before and after: “speed to lead from 9 hours to 4 minutes”, not “faster lead routing”.',
      },
      {
        mistake: 'Hiding the code',
        fix: 'If you wrote Python, SQL or JavaScript, say what it did. Engineering-heavy roles screen for shipped code.',
      },
      {
        mistake: 'Two-column, icon-heavy templates',
        fix: 'Use one column with clear headings. Recruiters skim, and parsers misread columns.',
      },
    ],
    sample: {
      name: 'Rohan Iyer (sample)',
      headline: 'GTM Engineer, enrichment and outbound systems',
      contact: 'Pune · rohan@example.com · linkedin.com/in/example · github.com/example',
      summary:
        'GTM engineer with 3 years at B2B SaaS startups, after 2 years as an SDR. Builds enrichment, scoring and outbound systems in Clay, n8n and HubSpot, with Python and SQL where the tools run out. Workflows I built sourced $1.8M of pipeline last year.',
      experience: [
        {
          role: 'GTM Engineer',
          org: 'Fabrikam Cloud (fictional)',
          dates: '2023 – present',
          bullets: [
            'Built signal-based outbound in Clay for finance-team buyers (new finance leaders, ERP changes); meetings rose from 18 to 41 a month.',
            'Designed a 4-provider waterfall enrichment with caching; email coverage rose from 58% to 83% and cost per enriched record fell 45%.',
            'Rebuilt inbound routing with n8n webhooks and HubSpot workflows; median speed to lead fell from 6 hours to 3 minutes.',
            'Built a Claude-based research brief that 12 AEs use before calls, with a check that blocks any claim not in the source data.',
          ],
        },
        {
          role: 'Sales Development Representative',
          org: 'Tailspin Analytics (fictional)',
          dates: '2021 – 2023',
          bullets: [
            'Wrote the team’s first Python script to clean and dedupe lead lists; saved each of 8 SDRs about 5 hours a week.',
            'Moved sending to 3 warmed secondary domains with SPF, DKIM and DMARC; bounce rate fell from 7% to under 2%.',
          ],
        },
      ],
      projects: [
        {
          name: 'Open n8n template for inbound routing',
          line: 'Webhook to enrichment to scored CRM record in under a minute; used by 300+ people from a public post.',
        },
      ],
      skills: [
        'Clay (certified)',
        'n8n, Make, Zapier',
        'HubSpot and Salesforce admin',
        'Python, SQL, REST APIs, webhooks',
        'Claude and OpenAI APIs',
        'Deliverability: SPF, DKIM, DMARC',
      ],
      education: 'B.E., Electronics and Telecommunication, 2021',
    },
    coverLetter: {
      subject: 'GTM Engineer application: [Your name]',
      body: 'Hi [Hiring manager name],\n\nI am applying for the GTM Engineer role. At Fabrikam I built the outbound and routing systems our sales team runs on. Signal-based outbound in Clay took us from 18 to 41 meetings a month, and inbound leads now reach a rep in 3 minutes instead of 6 hours.\n\nI looked at how [Company] sells to [ICP]. Two buying signals look under-used: [signal 1] and [signal 2]. I built a small Clay table of 50 matching accounts with a scoring rule and a draft first line for each, and I would be glad to share it.\n\nI started as an SDR, so I build for the people who use the system every day.\n\nCould we find 20 minutes this week?\n\n[Your name]',
    },
    linkedin: {
      headline:
        'GTM Engineer | Clay, n8n, HubSpot, Python | Signal-based outbound and inbound routing',
      about:
        'I build the systems sales teams run on: enrichment, scoring, routing and outbound that books meetings. I started as an SDR, so I build for the people who use the tools. Last year my workflows sourced $1.8M of pipeline and cut speed to lead from hours to minutes. I care about clean data, honest attribution and deliverability done properly.',
    },
    faqs: [
      {
        q: 'I do not have a GTM engineer title yet. What do I put on my resume?',
        a: 'Rewrite the work you already do as systems. SDRs, RevOps analysts and software engineers already build parts of this job. Add a “GTM builds” section with two or three workflows, each with the tools, the volume and a result such as meetings booked or hours saved.',
      },
      {
        q: 'Do I need a Clay certification or a software background?',
        a: 'It depends on the post. Hire Overseas’s GTM Engineer (Clay & Claude) post lists “Clay Certification is required”. Vercel’s GTM Engineer post asks instead for 4+ years of full-stack development and a Next.js app shipped to production. Read the post and lead with what it screens for.',
      },
      {
        q: 'Should I list every GTM tool I have used?',
        a: 'No. Keep a short grouped skills line and show the important tools inside bullets. Tools change fast, so hiring managers care more that you learn quickly and tie each tool to a result.',
      },
      {
        q: 'How do I show revenue impact if I cannot share company numbers?',
        a: 'Use relative numbers (“meetings per month more than doubled”, “speed to lead from hours to minutes”) or rounded figures. Be careful with attribution: say “sourced” only for pipeline your workflow created, and “influenced” for the rest.',
      },
      {
        q: 'How long do recruiters spend on a resume?',
        a: 'A 2018 eye-tracking study by Ladders found recruiters spend about 7.4 seconds on the first skim. Simple one-column layouts with clear headings and bulleted results held attention best.',
      },
    ],
  },

  lor: {
    metaTitle: 'Letter of Recommendation for a GTM Engineer (Sample)',
    metaDescription:
      'How to get a letter of recommendation for a GTM Engineer: who should write it, what to highlight, a sample letter, the email to ask and the brief to send.',
    h1: 'Letter of recommendation for a GTM Engineer',
    directAnswer:
      'The best GTM engineer recommendation comes from a sales or revenue leader who used what you built, or a RevOps or engineering lead who saw how you built it. It should prove three things with specific stories: your systems created pipeline, sellers trusted and used them, and you handle data and email sending with care.',
    whoShouldWrite: [
      {
        who: 'Your head of sales, CRO or revenue leader',
        why: 'They can speak to pipeline and meetings, the outcome a GTM engineer is judged on.',
      },
      {
        who: 'An SDR manager or rep who used your tools daily',
        why: 'Proves adoption: the people your systems serve found them useful, which many builders cannot show.',
      },
      {
        who: 'A RevOps or engineering lead',
        why: 'Vouches for data quality, reliability and code, which matters most for engineering-heavy GTM roles.',
      },
    ],
    whatToHighlight: [
      {
        quality: 'Builds systems that create pipeline',
        evidence: '“The outbound workflow Rohan built took us from 18 to 41 meetings a month.”',
      },
      {
        quality: 'Builds for the people who use it',
        evidence:
          '“He shadowed our SDRs for a week before building anything, and they used his research briefs from day one.”',
      },
      {
        quality: 'Careful with data and sending',
        evidence:
          '“He moved us to warmed secondary domains before raising volume, and our bounce rate fell under 2%.”',
      },
      {
        quality: 'Explains impact in revenue terms',
        evidence:
          '“His monthly report showed sourced pipeline and cost per meeting, not tool activity, with one clear recommendation.”',
      },
    ],
    structure: [
      {
        part: 'Opening',
        what: 'Who you are, your role, how long you worked with the candidate and in what capacity, and the role they are applying for.',
      },
      {
        part: 'Headline claim',
        what: 'One sentence that sums up the candidate, e.g. “the reason our outbound works”. Only if true.',
      },
      {
        part: 'Two specific stories',
        what: 'Each story: the problem in the funnel, what the candidate built, and the result in meetings, pipeline, speed or hours saved.',
      },
      {
        part: 'How they work with sellers',
        what: 'One short paragraph on adoption, judgement with data and AI output, and how they report impact.',
      },
      {
        part: 'Close',
        what: 'A clear recommendation and an offer to talk, with your contact details.',
      },
    ],
    sampleLetter: {
      context: 'From a VP of Sales, for a job application (fictional people and company)',
      paragraphs: [
        'I am Meera Joshi, VP of Sales at Fabrikam Cloud (fictional). Rohan Iyer was our first GTM engineer and worked inside my team for two years. I am glad to recommend him for a GTM Engineer role.',
        'Rohan is the reason our outbound works. Before he joined, our SDRs worked from static lists and researched every account by hand. He rebuilt the motion around buying signals, such as a new finance leader or a change of ERP, using Clay, our CRM and a short AI step for the first line. Meetings booked rose from about 18 to 41 a month, and those meetings became our largest single source of pipeline last year.',
        'He also fixed problems nobody had asked him to fix. Inbound demo requests used to wait most of a working day for a rep. Rohan rebuilt routing with webhooks and clear territory rules, and a rep now calls within minutes. He handled the edge cases (duplicates, missing countries, reps on leave) before they turned into complaints.',
        'My reps trust his work because he built it with them. He spent his first week listening to SDR calls, and when an AI draft once got a fact wrong, he added a check that blocks any claim not in the source data. He reports in pipeline and cost per meeting, so leadership always knew what his work was worth.',
        'I recommend Rohan without reservation and would hire him again. I am happy to talk to you about his work.',
      ],
      signoff: 'Meera Joshi, VP of Sales, Fabrikam Cloud (fictional) · meera@example.com',
    },
    askEmail: {
      subject: 'Would you be a reference for a GTM Engineer role?',
      body: 'Hi [Name],\n\nI am applying for GTM Engineer roles, starting with [Company]. You saw the results of [workflow or system] more closely than anyone, so I would be grateful if you could write a short recommendation or take a reference call.\n\nTo make it easy, I have attached a one-page brief: the role, three systems I built, and the numbers (meetings, pipeline, speed to lead). Please change anything that does not match your memory.\n\nThe deadline is [date]. If now is a bad time, no problem at all.\n\nThank you,\n[Your name]',
    },
    brief: [
      'The job description and why you want the role (two lines).',
      'Three systems they saw, each with the funnel problem, what you built and the result.',
      'The exact numbers (meetings, pipeline sourced, speed to lead, hours saved), and which ones are safe to share outside the company.',
      'A simple diagram or screenshot of your main workflow, so they can describe it accurately.',
      'The deadline, the format (letter, form or call) and where to send it.',
    ],
    variants: [
      {
        context: 'Job application or reference call',
        tweak:
          'Keep it to one page and lead with pipeline and adoption. Most startups prefer a 15-minute call to a letter, so ask which they want.',
      },
      {
        context: 'MBA or master’s application',
        tweak:
          'Add growth and potential: how the candidate went from doing the work by hand to building systems, and how they handled feedback from sellers. Follow the school’s questions exactly.',
      },
      {
        context: 'Internal move or promotion (e.g. SDR or RevOps to GTM engineer, or to lead)',
        tweak:
          'Show they already work at the next level: systems other teams now depend on, and people they have trained to use or maintain them.',
      },
      {
        context: 'Referral note to a recruiter',
        tweak:
          'Three sentences: how you know them, the one system they built and its result, and why they fit this company’s sales motion.',
      },
    ],
    mistakes: [
      'Praising tool skills (“great at Clay”) instead of what the tools produced.',
      'Numbers with no baseline, or pipeline numbers the recommender cannot stand behind.',
      'A recommender who never used or saw your systems. A specific letter from an SDR manager beats a vague one from a CEO.',
      'Sharing confidential revenue figures without permission. Agree in your brief which numbers can be used.',
      'Writing the letter yourself and asking them to sign it. Send a brief and let them use their own words.',
    ],
    faqs: [
      {
        q: 'Do GTM engineer jobs ask for letters of recommendation?',
        a: 'Rarely as letters. Startups usually ask for reference calls, often with a sales leader you supported. Letters matter more for MBA and master’s applications, internal moves and some Indian and European employers. The same brief works for both.',
      },
      {
        q: 'Who is the best person to recommend a GTM engineer?',
        a: 'A sales or revenue leader who can speak to pipeline, ideally backed by a rep or SDR manager who used your tools every day. For engineering-heavy roles, add an engineering or RevOps lead who can vouch for your code and data work.',
      },
      {
        q: 'How long should the letter be?',
        a: 'One page, four to five short paragraphs: introduction, two specific stories with results, how you work with sellers, and a clear close.',
      },
      {
        q: 'Can I write my own letter of recommendation?',
        a: 'Avoid it. Send your recommender a one-page brief with the systems you built and the numbers, and let them write in their own voice.',
      },
    ],
  },
}
