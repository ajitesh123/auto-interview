import type { RoleKits } from './types'

// Keywords taken from the job posts in keywordSources (opened Nov 6, 2026).
// Facts about the role (metrics, channels, tools, example bullets) match data/roleHubs/growth.ts.
// Sample people, companies and numbers are fictional and labelled as samples on the page.

export const GROWTH_KITS: RoleKits = {
  resume: {
    metaTitle: 'Growth Manager Resume (CV): Examples & Bullets 2026',
    metaDescription:
      'Growth Manager resume and CV guide: what hiring managers look for, 12 bullet examples, keywords from real growth job posts, a sample CV and India vs US format.',
    h1: 'Growth Manager resume (CV): examples, bullets and keywords',
    directAnswer:
      'A growth resume should read like a results log: the metric you owned, the baseline, the experiment or channel you changed, and the result. Put your best before-and-after number near the top, show how you measured it (SQL, GA4, Mixpanel or Amplitude), and keep it to one page.',
    recruiterLens: [
      'One number you owned and moved, with a baseline: signups, activation, D30 retention, cost per order or revenue.',
      'Experiments, not campaigns: a hypothesis, a test with a control or holdout, and an honest readout, including tests that lost.',
      'Channels that fit their model: Meta and Google for consumer apps; SEO, lifecycle and product-qualified leads for B2B SaaS.',
      'Enough analytics to answer your own questions: SQL, cohort charts and unit economics such as CAC payback.',
    ],
    format: {
      length:
        'One page unless you have 8+ years. Two pages only if every bullet still shows a result.',
      sections: [
        'Name and contact (city, email, LinkedIn, a link to a teardown or portfolio)',
        'Two-line summary with the biggest metric you moved',
        'Experience (most recent first; each bullet: metric, baseline, change, result)',
        'Growth projects or teardowns (essential for freshers and switchers)',
        'Skills (grouped: channels, experimentation, analytics, tools)',
        'Education and certifications (Google Analytics, Meta ads certifications if relevant)',
      ],
      indiaNote:
        'In India “CV” and “resume” mean the same document, and one page is normal for growth roles. Leave out the photo, date of birth and marital status. Do not write current or expected CTC on the CV; recruiters collect CTC and notice period in the application form or the first call. For Indian roles, write money in rupees (cost per order, CAC), because hiring managers think in rupee unit economics.',
      usNote:
        'US recruiters expect one page, no photo and no personal details. Use the metric names US teams use (CAC, LTV, payback, D30 retention). If your results come from India, percentages and ratios travel better than rupee figures.',
    },
    summaries: [
      {
        level: 'Fresher or switcher (marketing, analytics, product)',
        text: 'Marketing graduate moving into growth. As a growth intern at an edtech startup I wrote 40 SEO pages from search-console queries; organic signups grew from 120 to 410 a month in 4 months. Writes SQL for weekly cohorts.',
      },
      {
        level: 'Experienced growth manager',
        text: 'Growth manager with 4 years at consumer apps. Owns activation and retention: D30 retention up from 18% to 24% after rebuilding the first-week WhatsApp and email flow. Runs 4–6 experiments a month with SQL and Mixpanel.',
      },
      {
        level: 'Senior / head of growth',
        text: 'Head of growth leading a [N]-person team across acquisition, activation and lifecycle. Grew monthly paying users from [X] to [Y] while cutting blended CAC by [X]%. Built the experiment process and weekly growth review the company still runs.',
      },
    ],
    bulletBank: [
      {
        area: 'Acquisition and channels',
        bullets: [
          'Cut cost per [install/first order] from ₹[X] to ₹[Y] in [N] weeks by rebuilding [Meta/Google] campaigns around [N] audience tests and [N] creative variants.',
          'Wrote [N] SEO pages from search-console queries; organic signups grew from [X] to [Y] a month in [N] months.',
          'Relaunched referrals with a two-sided [reward]; referral share of new users rose from [X]% to [Y]% at a CAC [X]% below paid.',
        ],
      },
      {
        area: 'Activation and onboarding',
        bullets: [
          'Defined activation as [action] after finding it separated 30-day retained users from churned ones; raised activation from [X]% to [Y]%.',
          'Cut onboarding from [N] screens to [N] in an A/B test; signup to first [key action] rose from [X]% to [Y]%.',
          'Agreed a product-qualified-lead rule with sales; [N] PQLs a month converted to paid at [X]% versus [Y]% for other signups.',
        ],
      },
      {
        area: 'Retention and lifecycle',
        bullets: [
          'Redesigned the first-week [WhatsApp/email/push] sequence and tested it against the old flow; D30 retention rose from [X]% to [Y]%.',
          'Ran a win-back campaign for users inactive [N] days with a no-message holdout; [X]% reactivated versus [Y]% in the holdout.',
          'Cut notification unsubscribes by [X]% with frequency caps and behaviour-based segments, with no drop in [weekly sessions].',
        ],
      },
      {
        area: 'Experimentation and analytics',
        bullets: [
          'Ran [N] A/B tests in [N] months with sample sizes and guardrails set before launch; [N] shipped, [N] lost and were logged.',
          'Built a weekly cohort dashboard in [SQL/Looker/Amplitude] for D1, D7 and D30 retention by channel; it became the Monday growth review.',
          'Found that a [X]% drop in signups was a broken [Android] tracking event, not a real decline; added an alert that catches it within a day.',
        ],
      },
    ],
    beforeAfter: [
      {
        weak: 'Managed social media and performance marketing campaigns.',
        strong:
          'Cut cost per first order from ₹410 to ₹265 in 10 weeks by rebuilding Meta campaigns around 3 audience tests and 24 creative variants; monthly orders from paid rose 38% on flat spend.',
        why: 'Names the metric, the baseline, what changed and the result, and shows you tested rather than just spent.',
      },
      {
        weak: 'Worked on improving user retention.',
        strong:
          'Raised D30 retention from 18% to 24% by redesigning the first-week WhatsApp and email sequence (5 messages, A/B tested against the old 2-message flow).',
        why: '“Improving retention” is vague. A named retention metric with a before and after, plus the test design, is proof.',
      },
      {
        weak: 'Responsible for referral programme.',
        strong:
          'Relaunched referrals with a two-sided ₹100 credit; referral share of new users went from 6% to 15% in one quarter at a blended CAC 40% below paid.',
        why: '“Responsible for” describes a job, not a result. The CAC comparison shows the channel was worth running.',
      },
    ],
    keywords: [
      {
        group: 'Experimentation',
        terms: [
          'A/B tests and experiments',
          'structured experimentation',
          'hypothesis → design → launch → measurement → iteration',
          'experiment readouts',
          'running experiments across the funnel',
          'root-cause analyses',
        ],
      },
      {
        group: 'Funnels and metrics',
        terms: [
          'user funnels',
          'cohort-based retention',
          'unit economics (ROI, burn, CAC/CPA, payback)',
          'ARPU',
          'repeat purchase rates',
          'customer lifetime value',
          'metrics definitions',
        ],
      },
      {
        group: 'Channels and lifecycle',
        terms: [
          'user acquisition and retention strategies',
          'lifecycle channels (push/WhatsApp/in-app)',
          'email, push, SMS, and in-app',
          'paid acquisition',
          'creative testing',
          'referral programs',
          'PLG',
          'funnel optimization',
          'audience segmentations',
        ],
      },
      {
        group: 'Tools and data',
        terms: [
          'Google Analytics, SQL',
          'GA4, Mixpanel, HubSpot, Amplitude',
          'Iterable',
          'Segment, Branch',
          'SQL or Python literacy',
          'dashboards',
        ],
      },
    ],
    keywordSources: [
      {
        label:
          'Paytm, Growth Management – Senior Manager, User Growth (posted Apr 4, 2026, via Marketing Monk)',
        url: 'https://www.marketingmonk.so/jobboard/jobs/growth-management-senior-manager-user-growth-at-paytm-wbbzpt',
      },
      {
        label: 'Paytm, Growth Management – Senior Manager, Paytm Gold (Lever)',
        url: 'https://jobs.lever.co/paytm/2036f20f-aa59-43a7-bfef-d330ce2ba712',
      },
      {
        label: 'Alt, Growth Lifecycle Manager (posted Feb 2, 2026, via Marketing Monk)',
        url: 'https://www.marketingmonk.so/jobboard/jobs/growth-lifecycle-manager-at-alt-v16f9l',
      },
      {
        label: 'Limy, Growth Manager Lead, New York (company careers page)',
        url: 'https://limy.ai/careers/growth-manager',
      },
    ],
    projects: [
      {
        title: 'Write a one-page growth teardown',
        what: 'Sign up for a product you want to work on and screenshot every step to the first “aha” moment. Estimate where users drop, write 5 test ideas scored on Impact, Confidence and Ease, and write the hypothesis, metric, minimum effect and test length for the top one.',
        proves:
          'The whole job in miniature: you can find the biggest leak in a funnel and prioritise tests. Attach it to your application.',
      },
      {
        title: 'Build a retention cohort analysis',
        what: 'Take a public app or e-commerce events dataset, write SQL for D1, D7 and D30 retention by signup week, chart it, and write three findings with one test idea each.',
        proves: 'You can answer your own questions with data, which most growth interviews test.',
      },
      {
        title: 'Run one small, real test',
        what: 'Help a college club, a local shop or a friend’s startup: write 10 SEO pages, or run a small Meta campaign with two creatives. Set the metric and the success rule before you start, then report cost per signup or per order honestly.',
        proves:
          'You have moved a real number yourself, even a small one, and you measure before you claim.',
      },
    ],
    mistakes: [
      {
        mistake: 'A list of campaigns with no results',
        fix: 'Rewrite each bullet as metric, baseline, change, result.',
      },
      {
        mistake: 'Vanity metrics (impressions, followers, open rates)',
        fix: 'Report what the business pays for: signups, activated users, orders, retention, revenue.',
      },
      {
        mistake: 'Taking credit for the whole company’s number',
        fix: 'Say what you owned: “my lifecycle tests added 6 points of D30 retention”, not “grew revenue 3x”.',
      },
      {
        mistake: 'Only wins',
        fix: 'Mention one test that lost and what it changed. Growth managers expect most tests to lose.',
      },
      {
        mistake: 'Two-column, icon-heavy templates',
        fix: 'Use one column with clear headings. Recruiters skim, and parsers misread columns.',
      },
    ],
    sample: {
      name: 'Sneha Kulkarni (sample)',
      headline: 'Growth Manager, activation and retention',
      contact: 'Bengaluru · sneha@example.com · linkedin.com/in/example',
      summary:
        'Growth manager with 5 years at consumer apps in grocery and fintech. Owns activation and retention: D30 retention up from 18% to 24% and cost per first order down 35%. Runs 4–6 experiments a month with SQL, Mixpanel and a sample size set before every test.',
      experience: [
        {
          role: 'Growth Manager',
          org: 'Kiranakart (fictional)',
          dates: '2023 – present',
          bullets: [
            'Raised D30 retention from 18% to 24% by redesigning the first-week WhatsApp and email sequence (5 messages, A/B tested against the old 2-message flow).',
            'Cut cost per first order from ₹410 to ₹265 in 10 weeks with 3 audience tests and 24 creative variants on Meta; paid orders rose 38% on flat spend.',
            'Relaunched referrals with a two-sided ₹100 credit; referral share of new users went from 6% to 15% in one quarter.',
            'Built a weekly cohort dashboard in SQL that became the Monday growth review for product, marketing and finance.',
          ],
        },
        {
          role: 'Growth Associate',
          org: 'PaisaSetu (fictional)',
          dates: '2021 – 2023',
          bullets: [
            'Cut KYC onboarding from 7 screens to 4 in an A/B test; signup to first investment rose from 21% to 29%.',
            'Found that a 15% signup drop was a broken Android tracking event, not a real decline; added a daily alert.',
          ],
        },
      ],
      projects: [
        {
          name: 'Public growth teardown of a fitness app',
          line: 'Funnel map, 5 ICE-scored test ideas and a sample-size plan; read by 2,500 people.',
        },
      ],
      skills: [
        'SQL (joins, window functions, cohorts)',
        'Mixpanel and GA4',
        'A/B test design and sample size',
        'Meta Ads Manager and Google Ads',
        'Lifecycle: WhatsApp, email, push',
        'Unit economics: CAC, LTV, payback',
      ],
      education: 'B.Com, 2021 · Google Analytics certification',
    },
    coverLetter: {
      subject: 'Growth Manager application: [Your name]',
      body: 'Hi [Hiring manager name],\n\nI am applying for the Growth Manager role. At Kiranakart I own activation and retention. Rebuilding our first-week WhatsApp and email flow, tested against the old one, lifted D30 retention from 18% to 24%, and cost per first order fell from ₹410 to ₹265 after a round of audience and creative tests. I also keep a log of the tests that lost, because they taught us as much as the wins.\n\nI signed up for [Company] and mapped the path to [first “aha” moment]. The biggest drop looks like [step]. I wrote three test ideas with ICE scores and a sample-size estimate for the first one (one page, attached).\n\nCould we find 20 minutes this week to go through it?\n\n[Your name]',
    },
    linkedin: {
      headline:
        'Growth Manager | Activation, retention and lifecycle | SQL, Mixpanel, Meta Ads | Consumer apps',
      about:
        'I own numbers and move them with experiments. At a grocery app I lifted D30 retention from 18% to 24% with a tested first-week WhatsApp and email flow, and cut cost per first order by 35%. I write my own SQL, set sample sizes before tests start, and log the tests that lose as carefully as the ones that win.',
    },
    faqs: [
      {
        q: 'Should my growth resume lean towards marketing or product?',
        a: 'Match the post. Paytm’s Senior Manager, User Growth post asks for “structured experimentation” and “cohort-based retention”, so lead with experiments and retention. Limy’s Growth Manager Lead post asks for paid growth and “creative testing”, so lead with channel results. If you have shipped product experiments with engineers, say so either way.',
      },
      {
        q: 'I am a fresher. What do I put on a growth resume?',
        a: 'Most people start as a growth intern, growth associate or performance marketer. Show one result you produced yourself, such as SEO pages that brought signups or a small campaign with a measured cost per user, plus a one-page teardown of a product you want to work on.',
      },
      {
        q: 'Do I need SQL on a growth resume?',
        a: 'It helps a lot. Paytm’s Paytm Gold growth post lists “Google Analytics, SQL” among its requirements, and Limy lists “SQL or Python literacy” as a bonus. Put SQL in your skills and in at least one bullet that shows what it helped you find.',
      },
      {
        q: 'Should I include experiments that failed?',
        a: 'Yes, one. A short line such as “tested a 7-day trial against 14 days; no lift, so we moved effort to onboarding” shows honest measurement, which growth hiring managers screen for.',
      },
      {
        q: 'How long do recruiters spend on a resume?',
        a: 'A 2018 eye-tracking study by Ladders found recruiters spend about 7.4 seconds on the first skim. Simple one-column layouts with clear headings and bulleted results held attention best.',
      },
    ],
  },

  lor: {
    metaTitle: 'Letter of Recommendation for a Growth Manager (Sample)',
    metaDescription:
      'How to get a letter of recommendation for a Growth Manager: who should write it, what to highlight, a sample letter, the email to ask and the brief to send.',
    h1: 'Letter of recommendation for a Growth Manager',
    directAnswer:
      'The best growth recommendation comes from the person who held you to a number: your head of growth, founder or business head, or a product or data partner you ran experiments with. It should prove three things with specific stories: you moved a metric, you measured it honestly, and product, design and data teams liked working with you.',
    whoShouldWrite: [
      {
        who: 'Your manager: head of growth, founder or business head',
        why: 'They set your target and can confirm the number you moved, which is what growth roles hire for.',
      },
      {
        who: 'A product manager, engineer or data scientist you ran tests with',
        why: 'Vouches for your experiment design and honesty with results, and for how you work across teams.',
      },
      {
        who: 'A marketing, sales or finance partner',
        why: 'Shows you think in unit economics and that other teams trusted your numbers.',
      },
    ],
    whatToHighlight: [
      {
        quality: 'Moves a number and proves it',
        evidence:
          '“Sneha lifted D30 retention from 18% to 24% with a rebuilt first-week flow, tested against the old one.”',
      },
      {
        quality: 'Measures honestly',
        evidence:
          '“She set sample sizes before every test and logged the losses as carefully as the wins.”',
      },
      {
        quality: 'Makes good bets with limited resources',
        evidence:
          '“When engineering had no capacity, she ran lifecycle and creative tests that needed no code.”',
      },
      {
        quality: 'Works well with product, design and data',
        evidence:
          '“She brought the funnel data and a ranked list of problems, and agreed the success metric with design before work began.”',
      },
    ],
    structure: [
      {
        part: 'Opening',
        what: 'Who you are, your role, how long you worked with the candidate and in what capacity, and the role they are applying for.',
      },
      {
        part: 'Headline claim',
        what: 'One sentence that sums up the candidate, e.g. “the most rigorous growth person I have managed”. Only if true.',
      },
      {
        part: 'Two specific stories',
        what: 'Each story: the metric and baseline, the test or channel change, and the measured result.',
      },
      {
        part: 'How they work with others',
        what: 'One short paragraph on cross-functional work, honesty about failed tests, and judgement under pressure.',
      },
      {
        part: 'Close',
        what: 'A clear recommendation and an offer to talk, with your contact details.',
      },
    ],
    sampleLetter: {
      context: 'From a head of growth, for a job application (fictional people and company)',
      paragraphs: [
        'I am Arjun Nair, Head of Growth at Kiranakart (fictional), a grocery delivery app. Sneha Kulkarni has reported to me for three years as the growth manager for activation and retention. I am glad to recommend her for a Growth Manager role.',
        'Sneha is the most rigorous growth person I have managed. When she joined, our new customers rarely came back after the first order. She studied the users who did stay, found that a second order in the first week was the clearest signal, and rebuilt our first-week WhatsApp and email sequence around it. She tested it against the old flow with a proper control, and D30 retention rose from 18% to 24%.',
        'She is just as careful with spend. She rebuilt our Meta campaigns around three audience tests and two dozen creative variants, and cost per first order fell from ₹410 to ₹265 in ten weeks with no increase in budget.',
        'Product and design like working with her because she brings data and a ranked list of problems, not finished solutions, and she agrees the success metric before anyone builds. She also reports losses plainly; her test log is the one the whole company now uses.',
        'I recommend Sneha without reservation. I am happy to talk to you about her work.',
      ],
      signoff: 'Arjun Nair, Head of Growth, Kiranakart (fictional) · arjun@example.com',
    },
    askEmail: {
      subject: 'Would you be a reference for a growth role?',
      body: 'Hi [Name],\n\nI am applying for Growth Manager roles, starting with [Company]. You saw my work on [metric or project] more closely than anyone, so I would be grateful if you could write a short recommendation or take a reference call.\n\nTo make it easy, I have attached a one-page brief: the role, three experiments you might mention, and the before-and-after numbers. Please change anything that does not match your memory, and tell me if any number should stay private.\n\nThe deadline is [date]. If now is a bad time, no problem at all.\n\nThank you,\n[Your name]',
    },
    brief: [
      'The job description and why you want the role (two lines).',
      'Three experiments or channel changes they saw, each with the metric, the baseline, what you changed and the result.',
      'One test that lost and what it taught the team, so they can speak to your honesty.',
      'Which numbers are safe to share outside the company, and which to give as percentages only.',
      'The deadline, the format (letter, form or call) and where to send it.',
    ],
    variants: [
      {
        context: 'Job application or reference call',
        tweak:
          'Keep it to one page and lead with the metric moved and how it was measured. Many companies prefer a 15-minute call, so ask which they want.',
      },
      {
        context: 'MBA or master’s application',
        tweak:
          'Add growth and potential: how the candidate’s scope grew, how they handled a failed bet, and their leadership of people or projects. Follow the school’s questions exactly.',
      },
      {
        context: 'Internal move or promotion (e.g. associate to manager, manager to lead)',
        tweak:
          'Focus on scope at the next level: owning a bigger number, setting up the experiment process, or coaching others to run tests.',
      },
      {
        context: 'Referral note to a recruiter',
        tweak:
          'Three sentences: how you know them, the best number they moved, and why they fit this company’s stage and funnel.',
      },
    ],
    mistakes: [
      'Generic praise (“data-driven, creative, a team player”) with no metric behind it.',
      'Results with no baseline, or numbers the recommender cannot confirm.',
      'Crediting the candidate with the whole company’s growth. Specific, owned results are more believable.',
      'A recommender who barely saw your work. A specific letter from a product partner beats a vague one from a CEO.',
      'Writing the letter yourself and asking them to sign it. Send a brief and let them use their own words.',
    ],
    faqs: [
      {
        q: 'Do growth roles ask for letters of recommendation?',
        a: 'Most companies ask for reference calls rather than letters, often with your last manager. Letters matter more for MBA and master’s applications, internal moves and some Indian employers. The same brief works for both.',
      },
      {
        q: 'Who is the best person to recommend a growth manager?',
        a: 'The person who held you to a number, usually your manager or founder. A product or data partner who ran tests with you is a strong second, because they can vouch for how honestly you measured.',
      },
      {
        q: 'How long should the letter be?',
        a: 'One page, four to five short paragraphs: introduction, two specific stories with numbers, how you work with others, and a clear close.',
      },
      {
        q: 'Can I write my own letter of recommendation?',
        a: 'Avoid it. Send your recommender a one-page brief with your experiments and numbers, and let them write in their own voice.',
      },
    ],
  },
}
