import type { RoleKits } from './types'

// Keywords taken from the job posts in keywordSources (opened Nov 6, 2026).
// Facts about the role agree with data/roleHubs/chief-of-staff.ts (getHired bullets reused in beforeAfter).
// Sample people, companies and numbers are fictional and labelled as samples on the page.

export const CHIEF_OF_STAFF_KITS: RoleKits = {
  resume: {
    metaTitle: 'Chief of Staff Resume (CV): Examples & Bullets 2026',
    metaDescription:
      'Chief of Staff resume and CV guide: what leaders screen for, 12 bullets on operating rhythm and board prep, keywords from real job posts and a one-page sample.',
    h1: 'Chief of Staff resume (CV): examples, bullets and keywords',
    directAnswer:
      'A Chief of Staff resume has to prove that a leader trusted you to run things and they got done. Open each role with scope (whose staff, team size, budget), name the operating rhythm you ran, and show two or three cross-functional results with numbers, on one page if you can.',
    recruiterLens: [
      'Scope and trust: whose staff you were (CEO, CXO or unit head), how big the organisation was, and what you could decide alone.',
      'A named operating rhythm you owned: quarterly OKRs, the weekly leadership meeting, business reviews, board prep.',
      'Cross-functional programmes with outcomes, delivered through teams you did not manage.',
      'Writing and judgement: memos, board updates, drafting for the leader, and a background (consulting, product, operations) that shows structured problem solving.',
    ],
    format: {
      length:
        'One page under about 8 years of experience. Two pages for senior hires, but the first half page must carry the whole story.',
      sections: [
        'Name and contact (city, email, LinkedIn, and a link to one writing sample)',
        'Two-line summary: whose staff you were and your biggest cross-team result',
        'Experience (most recent first; open each role with a one-line scope statement)',
        'Selected programmes (optional, useful for consultants: 2–3 engagements written as outcomes)',
        'Skills (grouped: operating rhythm, analysis, communication, tools)',
        'Education and certifications',
      ],
      indiaNote:
        'In India “CV” and “resume” mean the same document. Skip the photo, date of birth and marital status. Do not put current or expected CTC on the CV; recruiters ask for CTC and notice period in the application form. If your title was “Manager, CEO’s Office” or “Strategy & Operations”, keep the real title and show the Chief of Staff work in the bullets.',
      usNote:
        'US recruiters expect one page, no photo and no personal details. Many US posts look for a consulting or product background (RZR Global’s Chief of Staff post strongly prefers a former product manager), so translate that work into decisions and outcomes.',
    },
    summaries: [
      {
        level: 'Switching from consulting or product',
        text: 'Product manager with 5 years in B2B SaaS. For the last year I also ran my VP’s weekly review and quarterly planning across 4 teams; planned launches delivered on time rose from 6 of 10 to 9 of 10. Moving into a Chief of Staff role.',
      },
      {
        level: 'Chief of Staff at a startup',
        text: 'Chief of Staff to the CEO of a 40-person Series A startup. Run the weekly leadership review, quarterly OKRs, investor updates and board decks. Quarterly priorities delivered on time rose from 5 of 9 to 8 of 9 after I set up the decision log.',
      },
      {
        level: 'Senior / large company',
        text: 'Chief of Staff to the COO of a [N]-person company. Own the annual operating plan, monthly business reviews and a cost programme that saved ₹[X] crore. Prepare the COO for every board and CEO review.',
      },
    ],
    bulletBank: [
      {
        area: 'Operating rhythm',
        bullets: [
          'Set up quarterly OKRs for [N] teams and a weekly 45-minute leadership review with a decision log; priorities delivered on time rose from [X] of [N] to [Y] of [N].',
          'Ran the annual plan and monthly business reviews for a [N]-person organisation; every review had a pre-read out [N] hours ahead.',
          'Cut recurring status meetings by [X]% by replacing them with a weekly written update; gave the leader [N] hours a week back.',
        ],
      },
      {
        area: 'Board, investor and leadership prep',
        bullets: [
          'Wrote the monthly investor update and [N] board decks; cut prep from [X] days to [Y] with one metrics sheet shared by finance and sales.',
          'Prepared the [CEO/COO] for [N] board meetings with one-page briefs: context, decisions needed, recommended positions and open questions.',
          'Built the executive dashboard for revenue, pipeline and headcount used in every leadership meeting; reconciled numbers with finance before each board cycle.',
        ],
      },
      {
        area: 'Cross-functional programmes',
        bullets: [
          'Led a [N]-city expansion analysis and recommended [N] cities for a pilot; the pilot reached payback in [N] months against an [N]-month target.',
          'Ran a [reorg/cost/pricing] programme across [N] functions; delivered ₹[X] crore in savings with no missed customer commitments.',
          'Owned [initiative] with no natural single owner; got [N] teams to commit to dates and shipped it [N] weeks ahead of plan.',
        ],
      },
      {
        area: 'Acting for the leader',
        bullets: [
          'Acted as the [CEO’s] proxy in [N] recurring meetings; closed [N] decisions a month without escalating.',
          'Drafted all-hands notes, board updates and internal memos on the leader’s behalf; [N] of [N] went out with light edits.',
          'Built the escalation rule (what gets escalated, delegated or resolved); items reaching the leader fell from [X] to [Y] a week.',
        ],
      },
    ],
    beforeAfter: [
      {
        weak: 'Coordinated with multiple teams on various projects.',
        strong:
          'Ran the weekly leadership review for a 40-person startup (agenda, decision log, follow-ups); quarterly priorities delivered on time rose from 5 of 9 to 8 of 9.',
        why: 'Names the rhythm you owned and the result it produced, not the fact that you attended meetings.',
      },
      {
        weak: 'Helped the CEO with presentations.',
        strong:
          'Wrote the monthly investor update and 3 board decks; cut prep from 4 days to 1.5 by building one metrics sheet shared by finance and sales.',
        why: '“Helped” sounds like an assistant. Say what you wrote and the system you built.',
      },
      {
        weak: 'Worked on strategy projects.',
        strong:
          'Led a 6-city expansion analysis and recommended 2 cities for a pilot; the pilot reached payback in 5 months against a 6-month target.',
        why: 'Shows the decision your analysis drove and how it was judged afterwards.',
      },
    ],
    keywords: [
      {
        group: 'Operating rhythm',
        terms: [
          'SLT operating rhythm',
          'weekly leadership meetings',
          'monthly business reviews',
          'quarterly OKR cycles',
          'annual planning',
          'operating cadences',
        ],
      },
      {
        group: 'Leader support',
        terms: [
          'board prep',
          'investor materials',
          'executive communications',
          'CEO’s proxy',
          'structured briefs',
          'draft communications on behalf of the CEO',
        ],
      },
      {
        group: 'Execution',
        terms: [
          'CEO-level strategic projects end to end',
          'cross-functional initiatives',
          'drive accountability across functions',
          'surface blockers',
          'connective tissue between strategy and execution',
          'special projects from ideation through implementation',
        ],
      },
      {
        group: 'Analysis',
        terms: [
          'structured problem-solving',
          'executive dashboards',
          'read a P&L',
          'interpret an A/B test',
          'data-driven recommendations',
          'M&A diligence',
        ],
      },
      {
        group: 'Mindset',
        terms: [
          'high agency',
          'ownership mindset',
          'cross-functional credibility',
          'bias toward experimenting with AI',
        ],
      },
    ],
    keywordSources: [
      {
        label: 'RZR Global, Chief of Staff to the CEO, San Francisco (Teal listing)',
        url: 'https://www.tealhq.com/job/chief-of-staff-to-the-ceo_7ea1a8c0039e8e0437822f5ac8b70aa32ccb4',
      },
      {
        label: 'Textio, Chief of Staff to the CEO, San Francisco (Built In SF; closed May 2026)',
        url: 'https://www.builtinsf.com/job/chief-staff-ceo/8319501',
      },
      {
        label: 'AI software company via Michael Page, Chief of Staff (GTM), Bengaluru',
        url: 'https://www.michaelpage.co.in/job-detail/chief-staff-gtm-ai-bangalore-5-day-wfo/ref/jn-072026-7072727',
      },
    ],
    projects: [
      {
        title: 'Write a “first 30 days” plan',
        what: 'For a leader you want to work for, read their last six months of posts, funding news and open jobs. Infer three priorities with evidence, then set out on one page the rhythm you would run and three projects you would take off their plate.',
        proves:
          'You can work out a leader’s priorities from little information, and you write clearly. Attach it to your note.',
      },
      {
        title: 'Run a mini operating rhythm',
        what: 'For your team, a club, an NGO or a family business, run a 30-minute weekly review with a decision log for six weeks. Track decisions closed and tasks shipped on time, before and after.',
        proves:
          'You have actually run a cadence, not just read about one. It gives you a real bullet with numbers.',
      },
      {
        title: 'Turn a public update into a leadership brief',
        what: 'Take a listed company’s latest quarterly results or shareholder letter and rewrite it as a one-page brief: headline metrics versus plan, what worked, risks, and the three decisions leadership faces next.',
        proves: 'Synthesis and board-level writing, which is most of board prep.',
      },
    ],
    mistakes: [
      {
        mistake: 'Writing like an executive assistant (calendar, travel, logistics)',
        fix: 'Lead with priorities, programmes and decisions. Mention logistics only if it shows scale.',
      },
      {
        mistake: 'Hiding whose staff you were',
        fix: 'Name the leader’s title and the size of their organisation in the first line of the role.',
      },
      {
        mistake: 'Consulting bullets that end at the deck',
        fix: 'Say what changed because of your work: the decision, the money, the date.',
      },
      {
        mistake: 'Taking credit for the leader’s decisions',
        fix: 'Say what you prepared or ran, and that the leader decided. Precise credit reads as trustworthy.',
      },
      {
        mistake: 'Naming unannounced reorgs, layoffs or deal targets',
        fix: 'Describe them generically (“a confidential partnership evaluation”). Discretion is the job, and readers notice.',
      },
    ],
    sample: {
      name: 'Neha Iyer (sample)',
      headline: 'Chief of Staff to the CEO · ex-strategy consulting',
      contact:
        'Bengaluru · neha@example.com · linkedin.com/in/example · Writing sample: example.com/brief',
      summary:
        'Chief of Staff to the CEO of a 180-person Series B fintech SaaS company. Run the leadership rhythm, board prep and the CEO’s top cross-team programmes. Before that, 4 years in strategy consulting.',
      experience: [
        {
          role: 'Chief of Staff to the CEO',
          org: 'Lumen Ledger (fictional), Series B fintech SaaS, 180 people',
          dates: '2023 – present',
          bullets: [
            'Set up quarterly OKRs and a weekly 45-minute leadership review with a decision log; quarterly priorities delivered on time rose from 5 of 9 to 8 of 9.',
            'Own board prep: 6 quarterly decks and monthly investor updates, sent 4 days ahead, every number reconciled with finance.',
            'Led a 6-city expansion analysis and recommended 2 cities for a pilot; the pilot reached payback in 5 months against a 6-month target.',
            'Ran the CEO’s escalation rule; items reaching the CEO fell from about 30 a week to 12.',
          ],
        },
        {
          role: 'Senior Associate',
          org: 'Fabrikam Consulting (fictional)',
          dates: '2019 – 2023',
          bullets: [
            'Led a cost programme for a logistics client across 4 functions; ₹18 crore in annual savings delivered in 3 quarters.',
            'Built the operating model and governance cadence for a bank’s new digital unit, used for its first two years.',
          ],
        },
      ],
      projects: [
        {
          name: 'Writing sample: one-page leadership brief',
          line: 'A public company’s quarterly results rewritten as decisions for its leadership team.',
        },
      ],
      skills: [
        'OKRs and planning cycles',
        'Board and investor material',
        'Executive dashboards (Sheets, Metabase)',
        'Memo writing',
        'Programme management',
        'P&L and runway models',
      ],
      education: 'MBA, 2019 · B.Com, 2017',
    },
    coverLetter: {
      subject: 'Chief of Staff: [Your name], with a first 30 days plan',
      body: 'Hi [Leader name],\n\nI saw you are hiring a Chief of Staff after [the Series B / your new remit]. For the last three years I have been Chief of Staff to the CEO at Lumen Ledger, where I run the weekly leadership review, OKRs and board prep. After I set up a decision log, quarterly priorities delivered on time rose from 5 of 9 to 8 of 9.\n\nFrom your posts and open roles, I think your next two quarters are about [priority 1] and [priority 2]. I wrote a one-page plan for my first 30 days: the rhythm I would set up and three projects I would take off your plate (attached). I am happy to be wrong about the priorities; the plan is mainly to show how I work.\n\nWould 20 minutes this week work?\n\n[Your name]',
    },
    linkedin: {
      headline:
        'Chief of Staff to the CEO | Operating rhythm, board prep, cross-team programmes | Ex-consulting',
      about:
        'I help one leader get more done. As Chief of Staff to a fintech CEO I run the leadership rhythm (OKRs, weekly reviews, board prep) and take the cross-team projects nobody else owns. Before that I spent four years in strategy consulting. I write short memos, I follow up, and I keep confidential things confidential.',
    },
    faqs: [
      {
        q: 'I did Chief of Staff work without the title. What do I write?',
        a: 'Keep your real title, then add a short scope line under it, such as “Ran the CEO’s weekly leadership review and board prep”. Recruiters check titles, but the bullets show the work.',
      },
      {
        q: 'I am a consultant. How do I make my resume read like a Chief of Staff resume?',
        a: 'Turn engagements into outcomes and name the cadence you ran: steering committees, weekly reviews, governance. Show one thing you executed, not just recommended. Many posts ask for this background; Textio’s Chief of Staff post asked for 3+ years in a startup, high-growth or consulting environment.',
      },
      {
        q: 'Do I need an MBA to become a Chief of Staff?',
        a: 'Not usually. RZR Global’s post lists an MBA as “a strong plus”, not a requirement. Evidence that you ran things across teams and wrote for a leader matters more.',
      },
      {
        q: 'Should I name the leader I supported?',
        a: 'Use their title (CEO, COO) rather than their name, unless the role was public. Ask them first if you are unsure. It is a small signal of discretion.',
      },
      {
        q: 'How long do recruiters spend on a resume?',
        a: 'A 2018 eye-tracking study by Ladders found recruiters spend about 7.4 seconds on the first skim, and simple one-column layouts did best. Put your scope and best result in the top three lines.',
      },
    ],
  },

  lor: {
    metaTitle: 'Letter of Recommendation for a Chief of Staff (Sample)',
    metaDescription:
      'Letter of recommendation for a Chief of Staff: who should write it, what to prove (trust, rhythm, judgement), a sample letter, the ask email and MBA variant.',
    h1: 'Letter of recommendation for a Chief of Staff',
    directAnswer:
      'A Chief of Staff is hired on trust, so the best recommendation comes from the leader you supported, backed by a peer executive who saw you drive their team. It should prove three things with specific stories: you ran the operating rhythm, you delivered programmes across teams you did not manage, and you handled confidential matters with judgement.',
    whoShouldWrite: [
      {
        who: 'The leader you supported (CEO, CXO or unit head)',
        why: 'The strongest signal. No one else can speak to how much they trusted you and what you decided for them.',
      },
      {
        who: 'A peer executive or function head',
        why: 'Proves cross-functional credibility: you got their team to deliver without managing them.',
      },
      {
        who: 'A board member or investor who saw your board prep',
        why: 'Rare and strong, if the relationship is real. Ask the leader first.',
      },
      {
        who: 'For consultants: your engagement partner or a client executive',
        why: 'Can speak to structured problem solving and, ideally, to something you saw through to execution.',
      },
    ],
    whatToHighlight: [
      {
        quality: 'Runs the operating rhythm',
        evidence:
          '“Within a month Neha had our OKRs, weekly review and decision log running. Priorities delivered on time went from 5 of 9 to 8 of 9.”',
      },
      {
        quality: 'Delivers across teams',
        evidence:
          '“She got sales, product and finance to agree on the expansion pilot in three weeks, and it hit payback early.”',
      },
      {
        quality: 'Judgement as the leader’s proxy',
        evidence:
          '“I let her close decisions in our ops review on my behalf. I did not overturn one.”',
      },
      {
        quality: 'Trust and discretion',
        evidence:
          '“She worked on our reorg and fundraising for months before anything was announced. Nothing leaked.”',
      },
      {
        quality: 'Writing for leaders',
        evidence:
          '“Her board pre-reads were so clear that our board meetings became discussions instead of presentations.”',
      },
    ],
    structure: [
      {
        part: 'Opening',
        what: 'Who you are, the size of your organisation, how long the candidate was your Chief of Staff (or worked with you), and what they are applying for.',
      },
      {
        part: 'Headline claim',
        what: 'One honest sentence about trust, e.g. “the person I trusted most with decisions I could not attend”. Only if true.',
      },
      {
        part: 'Two specific stories',
        what: 'One on the rhythm or a cross-team programme, one on judgement or a hard conversation. Each with situation, action and a measurable result.',
      },
      {
        part: 'Trust and how others see them',
        what: 'How peers and the leadership team responded to them, and how they handled confidential work, without revealing it.',
      },
      {
        part: 'Close',
        what: 'A clear recommendation, what you think they are ready for next, and your contact details.',
      },
    ],
    sampleLetter: {
      context:
        'From a CEO, for a Chief of Staff or operating role at another company (fictional people and company)',
      paragraphs: [
        'I am Vikram Sethi, CEO of Lumen Ledger (fictional), a 180-person fintech software company. Neha Iyer has been my Chief of Staff for three years, and I recommend her for your Chief of Staff role without reservation.',
        'Neha is the person I trusted most with decisions I could not attend. When she joined, our leadership team had goals but no rhythm. Within a month she set up quarterly OKRs, a 45-minute weekly review and a decision log. Over the next year, the share of quarterly priorities we delivered on time went from 5 of 9 to 8 of 9.',
        'She also delivers across teams she does not manage. Last year she led our analysis of six possible new cities, got sales, product and finance to agree on a two-city pilot, and ran it. The pilot reached payback in five months against a six-month target.',
        'Her judgement is what I will miss most. She tells me in private when I am wrong, and supports the decision in public once it is made. She worked on our reorganisation and our last fundraise for months before either was announced, and nothing leaked. My leadership team respects her because she is fair to every function.',
        'Neha is ready for a bigger remit, and I would hire her again. Please email or call me if I can help.',
      ],
      signoff: 'Vikram Sethi, CEO, Lumen Ledger (fictional) · vikram@example.com',
    },
    askEmail: {
      subject: 'Would you be a reference for my next role?',
      body: 'Hi [Name],\n\nAs we discussed, I am starting to look for my next role, beginning with [Company or School]. You saw my work more closely than anyone, so I would be grateful if you could write a short recommendation or take a reference call.\n\nI have attached a one-page brief: the role, three stories you might mention, the numbers, and a note on what is fine to mention and what should stay inside the company.\n\nThe deadline is [date]. I will make sure my handover plan is on track before then.\n\nThank you,\n[Your name]',
    },
    brief: [
      'The role, the leader you would support, and why you want it (two lines).',
      'Three stories they saw: one on the rhythm, one on a cross-team programme, one on judgement or a hard conversation.',
      'The exact numbers, so they do not have to look them up.',
      'What is safe to mention (announced events, public numbers) and what to describe only in general terms.',
      'For MBA applications, the school’s exact questions and word limits, copied from the form.',
      'The deadline, the format (letter, form or call) and your handover plan, so they know the team is covered.',
    ],
    variants: [
      {
        context: 'Job application or reference call',
        tweak:
          'Expect a call with your leader rather than a letter, and sometimes a backchannel call to a peer. Brief both. The hiring leader wants to hear one thing above all: would you trust them again?',
      },
      {
        context: 'MBA or Executive MBA application (ISB, IIMs, US programmes)',
        tweak:
          'Your leader is usually the right recommender because they saw your full scope. Each school sets its own questions and word limits, so check the current admissions page and answer exactly what is asked, in order. Lean on growth over the years, how you took feedback, and leadership without formal authority.',
      },
      {
        context: 'Internal move or promotion',
        tweak:
          'Chief of Staff often leads to running a business line or an operations role. Ask your leader to describe a time you already ran something at that level, and the handover plan that makes the move safe.',
      },
      {
        context: 'Referral note to a recruiter or another leader',
        tweak:
          'Three sentences: how they know you, the clearest result of your rhythm or programme, and the kind of leader you work best with.',
      },
      {
        context: 'Moving with your leader, or to a new leader inside the company',
        tweak:
          'A short note from your current leader to the new one, focused on how you work and what you need to be effective, matters more than a formal letter.',
      },
    ],
    mistakes: [
      'A letter that describes an executive assistant (“managed my calendar, organised offsites”) instead of priorities, programmes and decisions.',
      'Revealing confidential details (an unannounced reorg, deal names, salaries) to make a story sound impressive.',
      'Only the leader writes. One peer reference shows you earned trust across the team, not just from the top.',
      'Asking without a handover plan. Leaders recommend people who leave well.',
      'Generic praise (“organised, reliable, strategic”) with no story or number behind it.',
    ],
    faqs: [
      {
        q: 'Do Chief of Staff roles need a letter of recommendation?',
        a: 'Most companies ask for reference calls instead. Letters matter more for MBA and Executive MBA applications, internal moves and some Indian employers. The same brief works for both.',
      },
      {
        q: 'How do I ask my current leader while I still work for them?',
        a: 'Talk to them first, in person, before you send anything. Many Chiefs of Staff move on after a few years and leaders expect it. Bring a handover plan to the conversation.',
      },
      {
        q: 'How can the letter show discretion without revealing anything?',
        a: 'Describe the type of work and the result, not the details: “she worked on a confidential reorganisation for three months and nothing leaked”. That sentence proves trust better than the details would.',
      },
      {
        q: 'Can a peer write my recommendation instead of my leader?',
        a: 'As a second reference, yes, and it helps. As the only one, it raises the question why your leader did not write. If your leader has left the company, say so in your note.',
      },
      {
        q: 'How long should the letter be?',
        a: 'One page: four or five short paragraphs with an introduction, two specific stories with results, a note on trust, and a clear close.',
      },
    ],
  },
}
