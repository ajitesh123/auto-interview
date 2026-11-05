import type { RoleKits } from './types'

// Keywords taken from the job posts in keywordSources (opened Nov 6, 2026).
// Facts about the role agree with data/roleHubs/founders-office.ts.
// Sample people, companies and numbers are fictional and labelled as samples on the page.

export const FOUNDERS_OFFICE_KITS: RoleKits = {
  resume: {
    metaTitle: "Founder's Office Resume (CV): Examples & Bullets 2026",
    metaDescription:
      'Founder’s Office resume and CV guide: what founders look for, 12 bullets, campus CV tips, keywords from real Indian startup job posts and a one-page sample.',
    h1: "Founder's Office resume (CV): examples, bullets and keywords",
    directAnswer:
      'A Founder’s Office resume has to prove you own outcomes, not tasks: things you started, ran across teams and finished, each with a number. Show range across operations, growth, finance and hiring, one piece of structured analysis that led to a decision, and keep it to one page.',
    recruiterLens: [
      'Ownership: something you started without being asked and saw through to a result.',
      'Range: real work in at least two of operations, growth, finance and hiring, not one narrow function.',
      'Structured thinking with numbers: a market sizing, a unit-economics call or a dashboard someone actually used.',
      'Speed and clear writing. Founders read your resume as a writing sample, so short, specific bullets count.',
    ],
    format: {
      length:
        'One page for freshers and almost everyone under about 8 years. A tight page is itself proof that you can prioritise.',
      sections: [
        'Name and contact (city, email, phone, LinkedIn, and a link to one memo or teardown)',
        'Two-line summary with the biggest thing you owned and its result',
        'Experience (most recent first; open each role with scope: who you reported to, team size)',
        'Projects, case competitions or proof of work (essential for freshers)',
        'Positions of responsibility on campus, or leadership outside work',
        'Skills (grouped: analysis, functions, tools)',
        'Education (degree, college, year, CGPA if strong)',
      ],
      indiaNote:
        'In India “CV” and “resume” mean the same one-page document. Skip the photo, date of birth, marital status and father’s name. Do not put current or expected CTC on the CV; startups ask for CTC and notice period in the application form or on the first call. On campus, if the placement cell gives a fixed template, use it and apply the same rules inside it.',
      usNote:
        'US startups rarely use the Founder’s Office title; the closest roles are Chief of Staff, BizOps or Strategy & Operations. Use one page, no photo and no personal details. Write CGPA as “8.4/10” so the scale is clear, and say “student leadership” instead of “POR”.',
    },
    summaries: [
      {
        level: 'Fresher (campus or off-campus)',
        text: 'Final-year B.Tech student who likes owning whole problems. Led a 9-person sponsorship team that raised ₹4.2 lakh for our college fest, reached the national final of a strategy case competition, and wrote a pricing teardown of a D2C brand that its founder replied to. Looking for a Founder’s Office role at an early-stage startup.',
      },
      {
        level: 'Switching from consulting or investment banking',
        text: 'Business analyst with 2 years in strategy consulting across market entry, pricing and cost cases for consumer and fintech clients. Built the unit-economics model one client used to cut delivery cost 12% in two quarters. Now want to own the plan and execute it, not just recommend it.',
      },
      {
        level: 'Experienced startup generalist',
        text: 'Founder’s Office lead at a 60-person Series A startup. Launched 2 new cities, set up the OKR and weekly review rhythm, and own the monthly investor update. Both cities reached payback in 5 months against a 6-month target.',
      },
    ],
    bulletBank: [
      {
        area: 'Operations and 0→1 projects',
        bullets: [
          'Launched [city/channel/product] from zero: hired [N] people, set up [vendors/process]; reached [X] orders a month by week [N] at ₹[X] CAC.',
          'Found and fixed [process] that no one owned; cut turnaround from [X] days to [Y] and removed the founder from [N] approvals a week.',
          'Built the [tracker/dashboard/SOP] the team now runs on; [N] people use it weekly and [metric] improved [X]%.',
        ],
      },
      {
        area: 'Growth and revenue',
        bullets: [
          'Ran [N] pricing tests on [product]; average order value rose from ₹[X] to ₹[Y] with no drop in conversion.',
          'Segmented a [X]% drop in [retention/conversion] by channel and cohort; traced it to [cause], fixed it, and recovered [X] points in [N] weeks.',
          'Wrote the first sales playbook and ran [N] pilot customer calls; closed [N] accounts worth ₹[X] lakh ARR.',
        ],
      },
      {
        area: 'Finance, fundraising and hiring',
        bullets: [
          'Owned the monthly investor update for [N] months and built the data room for a ₹[X] crore round; every number reconciled with finance before sending.',
          'Built a runway and headcount model that the founder used to time [N] hires; runway stayed above [N] months.',
          'Hired [N] [role] in [N] days: wrote the job post, ran screens and set a fixed weekly interview slot; offer acceptance [X]%.',
        ],
      },
      {
        area: 'Campus and internships (freshers)',
        bullets: [
          'Led a [N]-person team as [POR title]; raised ₹[X] lakh from [N] sponsors, [X]% above the previous year.',
          'Reached [national final / top N of N teams] in [case competition] with a market-entry plan for [company/sector].',
          'In a [N]-week startup internship, sized the [market] at ₹[X] crore and recommended [decision]; the founder used it in [pitch/plan].',
        ],
      },
    ],
    beforeAfter: [
      {
        weak: 'Worked in the Founder’s Office on various strategic projects.',
        strong:
          'Ran 4 founder-priority projects in 2 quarters, including a Pune launch that reached 1,100 orders a month by week 10 at ₹410 CAC.',
        why: '“Various projects” hides the work. Name how many, the biggest one, and its result.',
      },
      {
        weak: 'Handled investor relations and MIS.',
        strong:
          'Built one metrics sheet shared by finance and sales; used it for 6 monthly investor updates and the Series A data room, cutting prep from 4 days to 1.',
        why: 'Shows the system you built and what it saved, not just the task you were given.',
      },
      {
        weak: 'Core team member, E-Cell.',
        strong:
          'Led a 9-person sponsorship team at E-Cell; signed 11 sponsors and raised ₹4.2 lakh, 30% more than the previous year.',
        why: 'For freshers, positions of responsibility are your experience. Give the team size, money raised and the comparison.',
      },
    ],
    keywords: [
      {
        group: 'Ownership and mindset',
        terms: [
          'founder’s mindset',
          'think like an owner',
          'ownership and initiative',
          'ownership mindset',
          'high-autonomy environment',
          'sound business judgment',
        ],
      },
      {
        group: 'Strategy and analysis',
        terms: [
          'structured problem-solving',
          'business acumen',
          'market research',
          'competitive analysis',
          'stakeholder interviews',
          'pricing structure',
        ],
      },
      {
        group: 'Execution and operations',
        terms: [
          'cross-functional initiatives',
          'execution roadmaps',
          'operational bottlenecks',
          '0→1 initiatives',
          'go-to-market launches',
          'design, document and improve organizational processes',
          'support and execute hiring initiatives',
        ],
      },
      {
        group: 'Founder support and finance',
        terms: [
          'board decks',
          'investor updates',
          'data rooms',
          'fundraising',
          'OKR tracking',
          'dashboards for revenue and KPIs',
          'strategic partnerships',
        ],
      },
      {
        group: 'Tools',
        terms: ['Excel / Google Sheets', 'Notion', 'dashboards', 'reporting frameworks'],
      },
    ],
    keywordSources: [
      {
        label: 'Figr, Founder’s Office, Bengaluru (Antler job board, posted Aug 31, 2026)',
        url: 'https://careers.antler.co/companies/figr/jobs/91699210-founder-s-office',
      },
      {
        label: 'Stance Health, Associate: Founder’s Office, Bengaluru (Antler job board)',
        url: 'https://careers.antler.co/companies/stance-health/jobs/70564961-associate-founder-s-office',
      },
      {
        label: 'RagaAI, Founder’s Office: Generalist, Bengaluru (Weekday)',
        url: 'https://jobs.weekday.works/founder-s-office-generalist-at-ragaai-inc-4387949318',
      },
      {
        label: 'BimaKavach, Founder’s Office, Bengaluru (Weekday)',
        url: "https://jobs.weekday.works/bimakavach-founder's-office",
      },
    ],
    projects: [
      {
        title: 'Write a one-page teardown memo',
        what: 'Pick a startup you want to join. Find one real problem (app store reviews, a confusing pricing page, a slow signup), show the evidence, propose a fix and say how you would test it in two weeks. Send it to the founder with a three-line note.',
        proves:
          'Ownership, structured thinking and clear writing, in one page. A good memo gives a busy founder a reason to reply.',
      },
      {
        title: 'Do a mock take-home in 4 hours',
        what: 'Set a timer and do the classic prompt: a competitive analysis of the company and 4–5 rivals on target user, price, channel and complaints. Two pages, recommendation first. Link it on your resume.',
        proves: 'Speed and a clear “so what”, which is exactly what the real take-home tests.',
      },
      {
        title: 'Automate one recurring report',
        what: 'For a club, an NGO or a family business, build a weekly metrics report in Google Sheets, fed automatically with a tool such as n8n, with an AI-drafted summary. Track the hours it saves each week.',
        proves:
          'You build systems so the founder stops being the bottleneck, and you use AI to do the work of more than one person.',
      },
    ],
    mistakes: [
      {
        mistake: 'Listing every function you touched (“strategy, ops, sales, finance, marketing”)',
        fix: 'Pick your three best projects across two or three functions and give each a result.',
      },
      {
        mistake: '“Assisted the founder with…” language',
        fix: 'Say what you owned and decided. If the founder decided, say what you prepared that led to the decision.',
      },
      {
        mistake: 'A campus CV padded with participation certificates',
        fix: 'Keep positions of responsibility, wins and anything with a team size or money attached. Cut the rest.',
      },
      {
        mistake: 'Putting a past startup’s private numbers on your CV (exact revenue, round terms)',
        fix: 'Use percentages, ranges or growth rates. Founders notice leaks, and discretion is part of the job.',
      },
      {
        mistake: 'Two-column, icon-heavy templates',
        fix: 'Use one column with clear headings. Founders skim, and parsers misread columns.',
      },
    ],
    sample: {
      name: 'Riya Sharma (sample)',
      headline: 'Founder’s Office, Series A startup · ex-strategy consulting',
      contact:
        'Bengaluru · riya@example.com · linkedin.com/in/example · Writing sample: example.com/memo',
      summary:
        'Founder’s Office associate with 3 years across strategy consulting and an early-stage startup. Launched a new city, built the investor update and fixed processes nobody owned. Comfortable with unit economics, messy data and a founder who changes priorities on Monday.',
      experience: [
        {
          role: 'Associate, Founder’s Office',
          org: 'Kitebox (fictional), 60-person Series A D2C startup',
          dates: '2024 – present',
          bullets: [
            'Launched Pune from zero: 3 dark stores, 14 hires, vendor contracts; 1,100 orders a month by week 10 at ₹410 CAC.',
            'Built one metrics sheet shared by finance and sales; used it for 6 monthly investor updates and the Series A data room, cutting prep from 4 days to 1.',
            'Moved refunds out of WhatsApp into a form, tracker and approval rule; average refund time fell from 4 days to 1.',
            'Hired the first 5 sales reps in 30 days by running a daily funnel review with the founder.',
          ],
        },
        {
          role: 'Business Analyst',
          org: 'Meridian Strategy Partners (fictional)',
          dates: '2022 – 2024',
          bullets: [
            'Built the unit-economics model for a quick-commerce client; recommendations cut delivery cost 12% in two quarters.',
            'Sized a ₹1,800 crore market for a fintech client’s new product and led 20 customer interviews behind the go/no-go call.',
          ],
        },
      ],
      projects: [
        {
          name: 'Teardown memo: onboarding drop-off at a D2C brand',
          line: 'One page, read and answered by the founder; led to a two-week trial project.',
        },
        {
          name: 'National finalist, strategy case competition',
          line: 'Market-entry plan for an EV two-wheeler brand in tier-2 cities.',
        },
      ],
      skills: [
        'Unit economics and market sizing',
        'Excel / Google Sheets modelling',
        'SQL (basic) and Metabase',
        'Notion trackers and SOPs',
        'Investor updates and board decks',
        'Hiring funnels',
      ],
      education:
        'B.Tech, Mechanical Engineering, 2022 · CGPA 8.4/10 · Head of Sponsorships, college E-Cell',
    },
    coverLetter: {
      subject: 'Founder’s Office: [Your name], with a one-page memo on [problem]',
      body: 'Hi [Founder name],\n\nI am applying for the Founder’s Office role. At Kitebox I launched Pune from zero (1,100 orders a month by week 10), built our investor update and fixed a refund process that used to take four days. Before that I spent two years in strategy consulting, so I am comfortable with numbers and with ambiguity.\n\nI spent a few hours on [Company]. I think [specific problem, e.g. drop-off after the second order] is costing you more than it looks, and I wrote a one-page memo on how I would test a fix in two weeks, with the numbers I would watch (attached). I may have some of it wrong, and I would like to hear where.\n\nI would be glad to do a trial project or talk for 20 minutes, whichever is more useful.\n\n[Your name]',
    },
    linkedin: {
      headline:
        'Founder’s Office at a Series A startup | City launches, investor updates, ops | Ex-consulting',
      about:
        'I work next to founders on whatever matters most this quarter. Most recently I launched a new city from zero, built our investor update and fixed processes nobody owned. Before that I was a strategy consultant. I like turning a vague goal into a plan, then running the plan myself. I write short memos and I keep confidential things confidential.',
    },
    faqs: [
      {
        q: 'I am a fresher with no startup experience. What goes on my Founder’s Office CV?',
        a: 'Positions of responsibility with team sizes and money raised, case competitions, internships, and one piece of proof of work: a teardown memo or a mock take-home linked at the top. Founders hiring freshers are betting on initiative, so every line should show you started or ran something.',
      },
      {
        q: 'Do I need an IIT, IIM or BITS degree?',
        a: 'It helps with some founders but it is rarely a hard rule. In the posts we read, BimaKavach says IIT/IIM is preferred, not required, and Stance Health asks for a bachelor’s degree in any discipline. Proof of ownership and a strong take-home matter more.',
      },
      {
        q: 'Should I put my CGPA and class 10 and 12 marks on the CV?',
        a: 'For campus placements, follow the template your placement cell gives. Off campus, keep CGPA if it is strong and drop school marks. After about three years of work, education moves to the bottom in one line.',
      },
      {
        q: 'How is a Founder’s Office resume different from a Chief of Staff resume?',
        a: 'A Founder’s Office resume shows range and hands-on projects: launches, fixes, analysis. A Chief of Staff resume leads with the operating rhythm you ran for a leader. See our Chief of Staff resume guide if you have 5+ years and have run leadership reviews.',
      },
      {
        q: 'How long do founders spend on a resume?',
        a: 'A 2018 eye-tracking study by Ladders found recruiters spend about 7.4 seconds on the first skim, and simple one-column layouts did best. Founders are often faster. Put your best result in the top three lines.',
      },
    ],
  },

  lor: {
    metaTitle: "Letter of Recommendation for Founder's Office (Sample)",
    metaDescription:
      'Letter of recommendation for a Founder’s Office role: who should write it, what founders want proved, a sample letter, the ask email and an MBA variant.',
    h1: "Letter of recommendation for a Founder's Office role",
    directAnswer:
      'The best Founder’s Office recommendation comes from someone who watched you own something messy: a founder you worked for, a manager, or for freshers a professor or mentor who saw you run a project. It should prove ownership, speed and judgement with two specific stories, and say plainly that the writer would hire you again.',
    whoShouldWrite: [
      {
        who: 'A founder or CEO you worked for (an internship counts)',
        why: 'The strongest signal. Founders trust other founders, and they often call each other anyway.',
      },
      {
        who: 'Your direct manager in consulting, banking or operations',
        why: 'Can vouch for structured analysis, speed and how you handle pressure and feedback.',
      },
      {
        who: 'A professor, faculty adviser or club mentor (freshers)',
        why: 'Saw you run a fest, a research project or a case competition. Best for campus roles and MBA applications.',
      },
      {
        who: 'A client, investor or partner you worked with directly',
        why: 'Shows people outside the company trusted you, which matters when you will represent the founder.',
      },
    ],
    whatToHighlight: [
      {
        quality: 'Ownership without being asked',
        evidence:
          '“Nobody asked Riya to fix our refund process. She noticed it in her second week and had it down from four days to one within a month.”',
      },
      {
        quality: 'Speed with quality',
        evidence:
          '“I gave her a vague question about Pune on a Friday. By Monday I had a two-page recommendation, and the numbers held up.”',
      },
      {
        quality: 'Range',
        evidence:
          '“In one year she launched a city, hired our first five sales reps and built the investor update.”',
      },
      {
        quality: 'Judgement and the courage to push back',
        evidence:
          '“She told me, with data, that our Hyderabad launch should wait a quarter. She was right.”',
      },
      {
        quality: 'Discretion',
        evidence:
          '“She worked with our fundraising data and salary bands, and I never once worried about it.”',
      },
    ],
    structure: [
      {
        part: 'Opening',
        what: 'Who you are, your company and stage, how long you worked with the candidate and in what capacity, and the role or programme they are applying for.',
      },
      {
        part: 'Headline claim',
        what: 'One honest sentence that places them, e.g. “one of the two best generalists I have hired”. Founders and admissions readers both notice a comparison.',
      },
      {
        part: 'Two specific stories',
        what: 'One about ownership (something they started and finished) and one about judgement (a hard call or a pushback). Each with situation, action and a number.',
      },
      {
        part: 'Range and trust',
        what: 'A short paragraph on the different hats they wore, how teams responded to them, and how they handled confidential information.',
      },
      {
        part: 'Close',
        what: '“I would hire them again”, if true, plus your email or phone and an offer to talk.',
      },
    ],
    sampleLetter: {
      context:
        'From a startup founder, for a Founder’s Office or Chief of Staff application at another company (fictional people and company)',
      paragraphs: [
        'I am Kabir Malhotra, co-founder and CEO of Kitebox (fictional), a 60-person D2C startup. Riya Sharma joined my office as our first Founder’s Office associate in 2024 and has worked directly with me for two years. I am glad to recommend her for your Founder’s Office role.',
        'Riya is one of the two best generalists I have hired. In her first quarter I asked her to look into launching Pune. She came back in a week with a two-page plan, then ran it: three dark stores, fourteen hires and every vendor contract. Pune reached 1,100 orders a month by week ten, at a lower acquisition cost than our home city.',
        'She also tells me when I am wrong. When I wanted to open Hyderabad the next quarter, she showed me that our Pune payback was still unproven and proposed a decision rule instead. We waited one quarter, and that saved us a launch we could not yet afford.',
        'Riya wears many hats without dropping any. She built our investor update, hired our first five sales reps in a month and moved refunds out of WhatsApp into a process that takes a day instead of four. Teams follow up with her because she follows up first. She has seen our fundraising data and salary bands, and I have never had to worry about it.',
        'I would hire Riya again without hesitation, and I am sorry to lose her. Please call or email me if you would like to talk.',
      ],
      signoff: 'Kabir Malhotra, Co-founder and CEO, Kitebox (fictional) · kabir@example.com',
    },
    askEmail: {
      subject: 'Would you be a reference for my next role?',
      body: 'Hi [Name],\n\nI am applying for [Founder’s Office roles / the MBA at School], starting with [Company or School]. You saw my work on [project] more closely than anyone, so I would be grateful if you could write a short recommendation or take a reference call.\n\nI know your time is tight, so I have attached a one-page brief: the role, two or three stories you might mention, the numbers, and which figures are fine to share outside the company. Please change anything that does not match your memory.\n\nThe deadline is [date]. If this is a bad time, no problem at all.\n\nThank you,\n[Your name]',
    },
    brief: [
      'The role or programme, the link to the job post or application, and why you want it (two lines).',
      'Two or three stories they saw: the situation, what you did and the result, with the exact numbers.',
      'Which numbers are safe to share outside the company, and which to keep as percentages or ranges.',
      'The qualities this role screens for (ownership, speed, range, judgement, discretion) and which story proves each one.',
      'For MBA applications, the school’s exact questions and word limits, copied from the form.',
      'The deadline, the format (letter, online form or call) and where to send it. Offer to send a reminder a week before.',
    ],
    variants: [
      {
        context: 'Job application or reference call',
        tweak:
          'Most startups call rather than read a letter, and some founders call people you did not list. Brief your references early, and keep a one-page letter for posts that ask for one.',
      },
      {
        context: 'MBA or master’s application (ISB, IIMs, US programmes)',
        tweak:
          'Founder’s Office alumni often apply to MBAs, and the founder is usually the best recommender because they saw your full scope. Each school sets its own questions and word limits, so check the current admissions page and answer exactly what is asked, in order. Lean on growth over time, how you took feedback, and leadership without a title.',
      },
      {
        context: 'Fresher or campus application',
        tweak:
          'Ask a professor, faculty adviser or internship founder who saw you run something. One story about a fest, a club or a research project with a team size and result beats a general note about grades.',
      },
      {
        context: 'Internal move or promotion',
        tweak:
          'The usual move is from Founder’s Office to owning a function or business line. Ask the founder to describe a time you already ran that function, and what you would own next.',
      },
      {
        context: 'Referral note to a founder or recruiter',
        tweak:
          'Three sentences: how they know you, the best thing you shipped, and why you fit this company’s stage. Founders forward short notes.',
      },
      {
        context: 'Accelerator, fellowship or investor (if you are starting up)',
        tweak:
          'Ask your former founder to speak to your judgement and speed, and to say they would back you. Keep it to a short paragraph.',
      },
    ],
    mistakes: [
      'Generic praise (“hard-working, dynamic, a team player”) with no story behind it.',
      'Choosing a famous name who barely knows you. A specific letter from your direct founder beats a vague one from a big investor.',
      'Including private numbers your former startup would not want shared. Agree on what is safe before your recommender writes.',
      'A letter that lists tasks (“handled MIS, assisted in hiring”) instead of outcomes and judgement.',
      'Asking too late. Founders are busy; give at least two weeks and a ready brief.',
      'Writing the letter yourself and asking them to sign it. Send a brief instead and let them use their own words.',
    ],
    faqs: [
      {
        q: 'Do Founder’s Office roles ask for letters of recommendation?',
        a: 'Most startups ask for reference calls instead. Letters matter more for MBA and master’s applications, campus and fresher roles, and some Indian employers. The same brief works for both.',
      },
      {
        q: 'My founder is very busy. Can I draft the letter for them?',
        a: 'Send a one-page brief with stories and numbers first. If they still ask you to draft, write plain facts and let them rewrite it in their own voice. Never send a letter they have not read and approved.',
      },
      {
        q: 'My startup shut down. Is the founder still a good recommender?',
        a: 'Yes. Founders of startups that closed often write the most honest letters, and hiring founders respect that experience. Ask soon, while the details are fresh.',
      },
      {
        q: 'As a fresher, should I ask a professor or an internship founder?',
        a: 'Whoever saw you own something. For a startup job, an internship founder is usually stronger. For an MBA or master’s application, a professor or adviser who supervised a real project can work well too.',
      },
      {
        q: 'How long should the letter be?',
        a: 'One page: four or five short paragraphs with an introduction, two specific stories with results, a note on range and trust, and a clear close.',
      },
    ],
  },
}
