import type { PgLesson } from '../types'

export const lesson: PgLesson = {
  slug: 'how-to-get-startup-ideas',
  track: 'ideas',
  order: 0,
  title: 'How to get startup ideas',
  metaTitle: 'How to Get Startup Ideas: Paul Graham’s Method',
  metaDescription:
    'Paul Graham’s way to get startup ideas: notice, don’t brainstorm. Live in the future, dig a well, beat schlep blindness, with his Stripe and Facebook examples.',
  h1: 'How to get startup ideas, the way Paul Graham teaches it',
  tldr: 'Paul Graham’s answer is that you don’t think up startup ideas, you notice them. The best ones are things the founders themselves want, can build, and few others see as worth doing. Get to the leading edge of something that is changing fast, look for what is missing, start with a small group who want it badly, and switch off the filters (schleps, unsexy problems, competitors) that hide good ideas from you.',
  minutes: 12,
  level: 'Beginner',
  steps: [
    {
      heading: 'Why does brainstorming give you bad ideas?',
      body: [
        'In ‘How to Get Startup Ideas’ (November 2012), Paul Graham opens with this: "The way to get startup ideas is not to try to think of startup ideas." When you sit down to invent ideas, you get ones that sound plausible enough to fool you into working on them. He knows the cost first-hand: he spent six months on an online art gallery idea that nobody wanted.',
        'At YC they call these made-up or "sitcom" ideas, the kind a TV writer would give a character. His example is a social network for pet owners. Ask people about it and they say they could see using something like that, but when you look closer, they don’t want to use it themselves; they can only imagine other people wanting it. He says the most common mistake startups make, by far, is solving problems no one has.',
        'If you have no idea yet, that is not a disaster. In ‘Why to Not Not Start a Startup’ (March 2007) he points out that most startups change their idea anyway, and that the team matters more.',
      ],
      bullets: [
        'This week: write down the last three startup ideas you had. For each, name one real person who has this problem today. Cross out any idea where you can’t.',
        'Stop asking “what startup should I start?” Start asking “what is annoying, slow or missing in work I already do?”',
      ],
      keyIdea: 'The verb is “notice”, not “think up”.',
    },
    {
      heading: 'What do the best startup ideas have in common?',
      body: [
        'In the same essay, Graham says the very best ideas share three things: "they’re something the founders themselves want, that they themselves can build, and that few others realize are worth doing." His list: Microsoft, Apple, Yahoo, Google and Facebook all began this way.',
        'Graham calls ideas that grow out of the founders’ own lives "organic". In ‘Organic Startup Ideas’ (April 2010) he gives the simplest test: ask yourself what you wish someone would make for you. Apple happened because Steve Wozniak wanted a computer. Facebook started as a project Mark Zuckerberg built for Harvard students, not as a company, which is why organic ideas often don’t look like startup ideas at first.',
        'He also tells founders to become users of their own product, even when that feels unnatural. At Viaweb (his first company, online store software), he later wished the founders had run an online store themselves.',
      ],
      bullets: [
        'Start a “wish list”: every time you think “I wish there was a tool for this”, write it down with the date.',
        'Mark each item: do I want it? Could I build a first version? Do others think it is not worth doing?',
        'Keep only the items with three yes answers.',
      ],
      flow: ['You want it', 'You can build it', 'Few others see it', 'Organic idea'],
    },
    {
      heading: 'Should you start with a big market or a small one?',
      body: [
        'Graham’s picture is a hole. You can dig one that is broad but shallow (lots of people who want your product a little), or narrow and deep, like a well (a small number of people who want it a lot). He says to choose the well.',
        'His examples: Microsoft was a well when it made Altair Basic. Only a couple of thousand people owned an Altair, but without that software they had to program in machine language. Facebook’s first site was only for Harvard students, a small market with a fast path out, because what worked at one college would work at others. The founders of Airbnb did not realise at first how big a market they were tapping.',
        'His test question: who wants this so much that they will use a crappy first version made by a two-person startup they have never heard of? If you can’t name them, you probably have a broad, shallow idea. He also admits it is often impossible to see the path from the well to a big market in advance. If your first users belong to a group that is growing, the start can be small.',
      ],
      bullets: [
        'For your best idea, write the names of five people who would use a rough first version this month.',
        'Ask each one what they use now, and what it costs them in time or money.',
        'If nobody is putting up with something painful today, you are probably digging a shallow hole.',
      ],
      keyIdea: 'Start with a few people who want it urgently, not many who want it a little.',
    },
    {
      heading: 'How do you put yourself where ideas show up?',
      body: [
        'Graham borrows from Paul Buchheit: people at the leading edge of a fast-changing field "live in the future". From there, your hunches about what is needed are more likely to be right. His summary is to live in the future, then build what is missing. Being an early user at the leading edge counts, not only being a builder.',
        'For students he is specific. In this essay he says college time should go into getting yourself to the leading edge, taking classes outside computer science if they interest you, and building things with other students. In his Stanford lecture ‘Before the Startup’ (October 2014) he tells students to learn powerful things, work on problems that interest them, with people they like and respect. In that talk he also advised against starting a startup while still in college.',
        'He warns that a good idea should seem obvious once you have it, so you will often feel late, and that this should not deter you.',
      ],
      bullets: [
        'Pick one field changing fast where you already have an edge (a tool, an industry, a job you have done).',
        'Spend real hours as a power user of the newest tools in that field. Note each time something is missing or broken.',
        'Build one small thing for yourself and two friends. Treat it as a project, not a company.',
      ],
    },
    {
      heading: 'Which filters hide good ideas from you?',
      body: [
        'In ‘Schlep Blindness’ (January 2012), Graham explains that a schlep is a tedious, unpleasant task, and that "Your unconscious won’t even let you see ideas that involve painful schleps." His example is Stripe. For over a decade, every programmer who had processed payments online knew how painful it was, yet when they started startups they built recipe sites and local event aggregators instead, because fixing payments meant deals with banks, fraud and regulations.',
        'His antidote is a better question: instead of asking what problem you should solve, ask what problem you wish someone else would solve for you. The essay on startup ideas adds the unsexy filter: avoiding problems you look down on. He and his cofounders were not interested in ecommerce, but they could see the problem needed solving, and that became Viaweb.',
        'Two more filters to switch off. Competitors: he says it is exceptionally rare for startups to be killed by competitors, so a crowded space is not a reason to drop an idea. And the question “could this be a big company?”, which he says to ignore while you are noticing ideas.',
      ],
      bullets: [
        'List three problems in your field that everyone complains about but no one wants to touch (paperwork, regulation, integrations, payments).',
        'For each, write the schlep that keeps people away. That schlep may be your moat.',
        'Do not drop an idea only because a competitor exists. Ask what users still hate about the competitor.',
      ],
      keyIdea: 'The tedious, unglamorous problems are often the ones no one else is solving.',
    },
  ],
  keyTerms: [
    {
      term: 'Organic startup idea',
      meaning:
        'An idea that grows out of the founders’ own experience, usually something they wanted themselves. Graham prefers these to made-up ideas.',
    },
    {
      term: 'Sitcom idea',
      meaning:
        'A made-up idea that sounds plausible, like one a TV writer would invent, but that few real people want.',
    },
    {
      term: 'The well',
      meaning:
        'A small group of people who want your product a lot. Graham says to start with a well, not a broad shallow market.',
    },
    {
      term: 'Schlep blindness',
      meaning:
        'The unconscious habit of not even seeing ideas that involve tedious, unpleasant work, like fixing payments before Stripe.',
    },
    {
      term: 'Unsexy filter',
      meaning: 'Avoiding problems that seem boring or beneath you. Graham says to turn it off.',
    },
    {
      term: 'Live in the future',
      meaning:
        'Paul Buchheit’s phrase for people at the leading edge of a fast-changing field, who can see what is missing before others.',
    },
  ],
  videos: [
    {
      youtubeId: 'f4_14pZlJBs',
      title: 'Before the Startup with Paul Graham (How to Start a Startup 2014: Lecture 3)',
      channel: 'Y Combinator',
      minutes: 48,
      why: 'Paul Graham himself at Stanford. Listen for why you should not try to think up ideas and what students should do instead.',
    },
    {
      youtubeId: 'Th8JoIan4dg',
      title: 'How to Get and Evaluate Startup Ideas | Startup School',
      channel: 'Y Combinator',
      minutes: 32,
      why: 'YC partner Jared Friedman builds on Graham’s essay and schlep blindness. Focus on tar pit ideas and the questions for evaluating an idea.',
    },
  ],
  tryIt: {
    title: 'Run Graham’s “what’s missing” audit on your own life',
    steps: [
      'Set a 10-minute timer. List every moment in the past two weeks when you thought “why doesn’t someone make…?” or did something slow by hand.',
      'Next to each, ask Graham’s question: what problem do I wish someone else would solve for me?',
      'Circle the ones where you are at the leading edge (you use the newest tools, or you know the work from inside).',
      'For your top pick, name five real people who would use a rough version made by two strangers. If you can name them, message one today and ask how they handle it now.',
    ],
    link: {
      label: 'Read ‘How to Get Startup Ideas’ by Paul Graham',
      url: 'https://paulgraham.com/startupideas.html',
    },
  },
  check: [
    {
      q: 'Riya has two ideas: a social app for all pet lovers in India, and a tool for the 40 vets she knows who keep appointments on paper and lose bookings every week. Which would Graham back first?',
      options: [
        'The pet app, because the market is bigger',
        'The vet tool, because a small group wants it urgently',
        'Neither, because both have competitors',
        'Whichever she can raise money for faster',
      ],
      answer: 1,
      why: 'The vet tool is a well: few people, strong need, and Riya can name them. The pet app is broad and shallow, close to his “sitcom” pet network example.',
    },
    {
      q: 'Arjun keeps rejecting ideas that involve dealing with GST filings and bank integrations because they are “boring and painful”. What is Graham’s diagnosis?',
      options: [
        'Good judgement, since startups should avoid hard problems',
        'Schlep blindness, which hides ideas like Stripe',
        'A marginal niche problem',
        'He should first check if it could be a big company',
      ],
      answer: 1,
      why: 'Graham says your unconscious hides ideas that involve painful schleps. Stripe exists because its founders were willing to take on payments.',
    },
    {
      q: 'You are a final-year student who wants to start a company in two years but has no idea yet. What does Graham’s advice suggest you do now?',
      options: [
        'Brainstorm 100 ideas and pick the most original',
        'Study entrepreneurship courses and write business plans',
        'Learn powerful things, get to the leading edge of a field, and build projects with friends',
        'Copy a successful US startup for India',
      ],
      answer: 2,
      why: 'In ‘Before the Startup’ and ‘How to Get Startup Ideas’ he says to learn powerful things, live in the future and build things. Ideas then show up as things that are missing.',
    },
  ],
  fromTheSource: [
    {
      who: 'Paul Graham',
      role: 'Co-founder of Y Combinator, essayist',
      work: 'How to Get Startup Ideas (essay, November 2012)',
      url: 'https://paulgraham.com/startupideas.html',
      idea: 'Good startup ideas are noticed, not invented. People at the leading edge of a fast-changing field see what is missing, and the best ideas start with a small group who want something a lot.',
      breakdown: [
        'Made-up ideas sound plausible but usually solve problems no one has.',
        'The best ideas are things the founders want, can build, and few others think are worth doing.',
        'Dig a well: Microsoft’s Altair Basic and Harvard-only Facebook served few people who wanted them badly.',
        'Switch off the schlep and unsexy filters, and don’t drop an idea because competitors exist.',
      ],
      use: 'Stop brainstorming. Keep a running list of things you wish existed in your own work, and test each by naming people who want it urgently.',
    },
    {
      who: 'Paul Graham',
      role: 'Co-founder of Y Combinator, essayist',
      work: 'Schlep Blindness (essay, January 2012)',
      url: 'https://paulgraham.com/schlep.html',
      idea: 'Founders unconsciously avoid ideas that involve tedious, unpleasant work, so those ideas stay open. He says "A company is defined by the schleps it will undertake."',
      breakdown: [
        'A schlep is a tedious, unpleasant task, like dealing with banks, rules or other people’s code.',
        'Programmers who had processed payments knew it was painful, but built recipe sites instead. Stripe did the schlep.',
        'He says ignorance helps: young founders often don’t know how hard something will be.',
      ],
      use: 'Ask “what problem do I wish someone else would solve for me?” and look hardest at the answers that make you wince.',
    },
  ],
  sources: [
    {
      label: 'Paul Graham, How to Get Startup Ideas (Nov 2012)',
      url: 'https://paulgraham.com/startupideas.html',
    },
    {
      label: 'Paul Graham, Schlep Blindness (Jan 2012)',
      url: 'https://paulgraham.com/schlep.html',
    },
    {
      label: 'Paul Graham, Organic Startup Ideas (Apr 2010)',
      url: 'https://paulgraham.com/organic.html',
    },
    {
      label: 'Paul Graham, Before the Startup (Oct 2014, Stanford lecture)',
      url: 'https://paulgraham.com/before.html',
    },
    {
      label: 'Paul Graham, Why to Not Not Start a Startup (Mar 2007)',
      url: 'https://paulgraham.com/notnot.html',
    },
    {
      label: 'Y Combinator, Before the Startup with Paul Graham (video)',
      url: 'https://www.youtube.com/watch?v=f4_14pZlJBs',
    },
    {
      label: 'Y Combinator, How to Get and Evaluate Startup Ideas (Jared Friedman, video)',
      url: 'https://www.youtube.com/watch?v=Th8JoIan4dg',
    },
  ],
  faqs: [
    {
      q: 'How does Paul Graham say to get startup ideas?',
      a: 'By noticing, not brainstorming. Get to the leading edge of a field that is changing fast, look for what is missing, and pay attention to problems you have yourself. His summary is “Live in the future, then build what’s missing.”',
    },
    {
      q: 'What is schlep blindness?',
      a: 'Paul Graham’s term for how founders unconsciously ignore ideas that involve tedious, unpleasant work. His example is payments: many programmers knew it was broken, but Stripe was one of the few to take it on.',
    },
    {
      q: 'Is it bad if my startup idea has competitors?',
      a: 'Not according to Graham. He says it is exceptionally rare for startups to be killed by competitors, and advises erring on the side of ideas where you will face some. Look for what users still dislike about existing options.',
    },
  ],
  related: [
    { label: 'Next: Make something people want', href: '/paul-graham/make-something-people-want' },
    { label: 'The mistakes that kill startups', href: '/paul-graham/mistakes-that-kill-startups' },
    { label: 'Do things that don’t scale', href: '/paul-graham/do-things-that-dont-scale' },
    { label: 'Cofounders', href: '/paul-graham/cofounders' },
    { label: 'Founder’s office career guide', href: '/founders-office' },
  ],
}
