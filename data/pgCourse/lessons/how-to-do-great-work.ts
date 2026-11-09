import type { PgLesson } from '../types'

export const lesson: PgLesson = {
  slug: 'how-to-do-great-work',
  track: 'founder',
  order: 0,
  title: 'How to do great work',
  metaTitle: 'How to Do Great Work: Paul Graham’s Method in 6 Steps',
  metaDescription:
    'Paul Graham’s "How to Do Great Work" turned into a 6-step method: choose your field, reach the frontier, notice gaps, own projects, compound and protect morale.',
  h1: 'How to do great work: Paul Graham’s essay as a 6-step method',
  tldr: 'Paul Graham’s 2023 essay boils down to four steps: choose a field, learn enough to get to the frontier, notice gaps, explore the promising ones. Around those steps sit the habits that make them work: your own projects, steady work that compounds, and protected morale. Curiosity is the guide throughout, and because returns are superlinear, small differences in effort and learning grow into very large ones.',
  minutes: 14,
  level: 'Beginner',
  steps: [
    {
      heading: 'Step 1: How do you choose what to work on?',
      body: [
        'In "How to Do Great Work" (July 2023), PG says the work needs three qualities: you have a natural aptitude for it, a deep interest in it, and it offers scope for great work. In practice, he says, you need not worry much about scope, because ambitious people are already too conservative about it. Aptitude and great interest are the parts to get right.',
        'You will not know in advance. "The way to figure out what to work on is by working." His best test is a question: "What are you excessively curious about — curious to a degree that would bore most other people?" Fields aren’t people, he says, so you owe them no loyalty: if you find something more exciting, do not be afraid to switch.',
      ],
      bullets: [
        'Write down three topics you read about when nobody is making you. Those are your curiosity signals.',
        'For each, rate aptitude and interest 1 to 5. Ignore scope for now.',
        'Pick one to work on for the next month. Working on it is how you will find out.',
      ],
      keyIdea:
        'Aptitude plus deep interest first. You find the right field by working, not by planning.',
    },
    {
      heading: 'Step 2: How do you get to the frontier and find gaps?',
      body: [
        'PG’s four steps: "choose a field, learn enough to get to the frontier, notice gaps, explore promising ones." The frontier is the edge of what is known in your field. PG says knowledge expands fractally: from a distance its edges look smooth, but up close they turn out to be full of gaps.',
        'Noticing gaps means questioning what everyone else takes for granted. PG writes that "Originality isn’t a process, but a habit of mind," and suggests looking hard at the "religions" of your field, which he defines as collections of cherished but mistaken principles. When you find an outlier idea, you need enough expertise to say exactly what the others missed.',
      ],
      bullets: [
        'Name the three newest, best things in your chosen field. If you cannot, you are not at the frontier yet.',
        'Keep a "this seems broken or missing" list. Add one line a day.',
        'For each item, ask: what does everyone here assume that might be wrong?',
      ],
    },
    {
      heading: 'Step 3: Why work on your own projects?',
      body: [
        '"Develop a habit of working on your own projects," PG writes. Do not let work mean only what someone assigns you. In "A Project of One’s Own" (June 2021) he describes this kind of work as "as different from ordinary work as skating is from walking", and says that when he interviewed YC applicants he did not care about their grades, but wanted to hear all about any projects of their own.',
        'Start small and let the project grow through versions. "Great things are almost always made in successive versions," he writes in "How to Do Great Work", and he suggests beginning with the simplest thing that could possibly work. In "How to Start Google" (March 2024) he adds that Facebook, Apple and Google all began as projects, not as plans for businesses, and that projects are both the best way to learn and the best source of startup ideas.',
      ],
      example: {
        label: 'A starter project, sized the way PG suggests',
        text: 'Too big: "Build an AI tutor for every Indian student."\nRight size to start: "Make a tool that turns my class notes into quiz questions, use it for two weeks, then give it to five friends."\nLet it grow only after people use it.',
      },
    },
    {
      heading: 'Step 4: How do consistency and compounding work?',
      body: [
        '"Great work happens by focusing consistently on something you’re genuinely interested in." PG’s example: a page a day does not sound like much, but every day it adds up to a book a year. The catch: "The trouble with exponential growth is that the curve feels flat in the beginning."',
        'In "Superlinear Returns" (October 2023) he explains why it is worth it. Teachers and coaches implied the returns for performance were linear; they are not. The two causes are exponential growth and thresholds, and learning is the most important case because it combines both. So his heuristic is "always be learning", and pick work that compounds, either directly (infrastructure, an audience) or by teaching you.',
      ],
      flow: [
        'Small daily output',
        'Learning compounds',
        'Flat-looking early curve',
        'Superlinear results',
      ],
      keyIdea:
        'Do a little every day on work that compounds, and keep going through the flat part.',
    },
    {
      heading: 'Step 5: How do you beat procrastination and protect your hours?',
      body: [
        'PG separates two kinds. Daily procrastination is ordinary. "Per-project procrastination is far the more dangerous": putting off the big project for years while staying busy with smaller, respectable work. To start a day, he suggests tricking yourself, for example by telling yourself you will only reread what you have.',
        'He says the hardest kinds of work may be possible for only four or five hours a day, ideally in one unbroken block, because you shy away from hard tasks if you know you might be interrupted. In "How to Work Hard" (June 2021) he says working hard is a system you keep tuning, not a dial you turn up once, and that it depends on being honest with yourself. "The Top Idea in Your Mind" (July 2010) adds a test: notice what your thoughts return to in the shower. If it is not your work, change what you let become critical to you.',
      ],
      bullets: [
        'Name the one big project you have been "about to start" for over a year. Book its first two-hour block this week.',
        'Protect one 4-hour morning block, three days a week, with no calls.',
        'Each night, leave an easy first task for tomorrow so starting is cheap.',
      ],
    },
    {
      heading: 'Step 6: How do you keep morale and ambition up?',
      body: [
        'PG treats morale as fuel: "It’s the basis of everything when you’re working on ambitious projects." Protect it with a small group of people who love your work, with exercise and sleep, and by treating setbacks as normal. Aim to be the best: if you don’t try to be the best, he writes, you won’t even be good.',
        'Take as much risk as you can afford, especially young. "If you’re not failing occasionally, you’re probably being too conservative." He told Tyler Cowen (2023) people are afraid to think big for two reasons: the goal seems overreaching, and it looks like a lot of work. The essay ends with a direct challenge about the discoveries still waiting: "Why not by you?"',
      ],
      bullets: [
        'Find three people who will read or use your work early and honestly.',
        'Write down one goal you dismissed as "too big". Shrink only the first step, not the goal.',
        'Count your failures this quarter. If it is zero, PG would say you are being too careful.',
      ],
    },
  ],
  keyTerms: [
    {
      term: 'Frontier',
      meaning:
        'The edge of what is currently known in a field, where PG says the gaps worth exploring appear.',
    },
    {
      term: 'Superlinear returns',
      meaning:
        'When doing a bit better gets you far more than a bit more reward, because of exponential growth and thresholds.',
    },
    {
      term: 'Per-project procrastination',
      meaning:
        'Putting off a big, important project for months or years while staying busy with smaller work.',
    },
    {
      term: 'Work that compounds',
      meaning:
        'Work where doing well in one round makes the next round easier, such as an audience, a product or learning.',
    },
    {
      term: 'Morale',
      meaning:
        'Your belief and energy for the work. PG calls it the basis of everything on ambitious projects.',
    },
  ],
  videos: [
    {
      youtubeId: '5bxp78i96S8',
      title: 'Paul Graham On Startups, Ambition, and Great Founders',
      channel: 'Y Combinator',
      minutes: 22,
      why: 'A 2026 conversation with PG at the original YC office. Starts at "Why Today’s Startups Are More Ambitious"; keep going through "Frighteningly Ambitious Ideas".',
      start: 67,
    },
  ],
  tryIt: {
    title: 'Run PG’s four steps on your own life in 10 minutes',
    steps: [
      'Answer PG’s question in writing: "What am I excessively curious about, to a degree that would bore most other people?" List three things.',
      'For the strongest one, write the three newest developments you know of. Circle anything you do not understand: that is the frontier you need to reach.',
      'Write one gap: something in that field that seems broken, missing or strange to you.',
      'Turn it into a small project you can start this week, using only a few hours.',
      'Put a daily 30-minute block on your calendar for 30 days. Mark each day you do it. PG’s compounding works only if you keep going while the curve looks flat.',
    ],
    link: {
      label: 'Read PG’s "How to Do Great Work"',
      url: 'https://paulgraham.com/greatwork.html',
    },
  },
  check: [
    {
      q: 'Meera has spent eight months comparing career options in spreadsheets without starting anything. What would PG tell her?',
      options: [
        'Keep researching until she is sure',
        'Pick the field with the most scope',
        '"The way to figure out what to work on is by working": start a project and learn from doing it',
        'Ask her parents to decide',
      ],
      answer: 2,
      why: 'PG says you mostly learn what work is like by doing it, so choosing is iterative.',
    },
    {
      q: 'Arjun has posted one useful article a week for four months and has 40 followers. He feels like quitting. What does PG’s essay predict?',
      options: [
        'The idea is bad and he should stop',
        'Exponential growth feels flat at first, and learning and audience both compound',
        'He should post 10 times a day instead',
        'Followers do not matter for great work',
      ],
      answer: 1,
      why: 'PG: "The trouble with exponential growth is that the curve feels flat in the beginning." Steady work on something that compounds pays off later.',
    },
    {
      q: 'Which is per-project procrastination, the kind PG calls far more dangerous?',
      options: [
        'Checking your phone for 10 minutes before work',
        'Taking a long walk to think',
        'Putting off writing your book for three years while staying busy with emails and small tasks',
        'Stopping after five hours of hard work',
      ],
      answer: 2,
      why: 'PG warns that putting off big projects for years, disguised as productive busywork, is far more dangerous than daily procrastination.',
    },
  ],
  fromTheSource: [
    {
      who: 'Paul Graham',
      role: 'Essayist, cofounder of Y Combinator, programmer and painter.',
      work: 'How to Do Great Work (essay, July 2023)',
      url: 'https://paulgraham.com/greatwork.html',
      idea: 'Great work in any field follows four steps: choose a field, learn enough to get to the frontier, notice gaps, explore promising ones. Curiosity drives every step.',
      breakdown: [
        'Choose work that fits your aptitude and your interest; ambitious people are already too conservative about scope.',
        'Reach the frontier, then question what others assume. Originality is a habit of mind, not a process.',
        'Work consistently on your own projects; small daily progress compounds.',
        'Protect morale, take risks you can afford, and aim to be the best rather than good.',
      ],
      use: 'Use his question "What are you excessively curious about?" as a filter for your next project, job or startup idea.',
    },
    {
      who: 'Paul Graham',
      role: 'Cofounder of Y Combinator, writing about what he did not understand as a child.',
      work: 'Superlinear Returns (essay, October 2023)',
      url: 'https://paulgraham.com/superlinear.html',
      idea: 'Returns for performance are superlinear: doing somewhat better can bring far more than proportionally better results. School and sports taught us the opposite.',
      breakdown: [
        'Teachers and coaches implied returns were linear. In business, knowledge and fame they are not.',
        'The two causes are exponential growth and thresholds.',
        'Learning is the most important case, since it combines both causes, so "always be learning".',
        'Look for work that compounds, directly or by teaching you. When in doubt, follow your curiosity.',
      ],
      use: 'Ask of each thing you do this week: will this make next week’s work easier? Do more of what does.',
    },
  ],
  sources: [
    {
      label: 'Paul Graham: How to Do Great Work (July 2023)',
      url: 'https://paulgraham.com/greatwork.html',
    },
    {
      label: 'Paul Graham: Superlinear Returns (October 2023)',
      url: 'https://paulgraham.com/superlinear.html',
    },
    {
      label: 'Paul Graham: The Top Idea in Your Mind (July 2010)',
      url: 'https://paulgraham.com/top.html',
    },
    {
      label: 'Paul Graham: A Project of One’s Own (June 2021)',
      url: 'https://paulgraham.com/own.html',
    },
    { label: 'Paul Graham: How to Work Hard (June 2021)', url: 'https://paulgraham.com/hwh.html' },
    {
      label: 'Paul Graham: How to Start Google (March 2024)',
      url: 'https://paulgraham.com/google.html',
    },
    {
      label:
        'Conversations with Tyler: Paul Graham on Ambition, Art, and Evaluating Talent (August 2023)',
      url: 'https://conversationswithtyler.com/episodes/paul-graham/',
    },
    {
      label: 'Y Combinator: Paul Graham On Startups, Ambition, and Great Founders (2026)',
      url: 'https://www.youtube.com/watch?v=5bxp78i96S8',
    },
  ],
  faqs: [
    {
      q: 'What is the summary of Paul Graham’s "How to Do Great Work"?',
      a: 'Choose a field where you have aptitude and deep interest, learn enough to reach the frontier, notice gaps others miss, and explore the promising ones. Work consistently on your own projects, protect your morale, and let curiosity guide you.',
    },
    {
      q: 'What does Paul Graham mean by superlinear returns?',
      a: 'That rewards for performance are not proportional. Doing a little better can bring much bigger results, because of exponential growth and thresholds. Learning compounds, so he advises always be learning and choosing work that compounds.',
    },
    {
      q: 'How many hours a day does Paul Graham work?',
      a: 'In "How to Do Great Work" he says the hardest kinds of work may be possible for only four or five hours a day, ideally in one block. In "How to Work Hard" he puts his own limit for the harder kinds of writing or programming at about five hours a day.',
    },
  ],
  related: [
    { label: 'Founder mode', href: '/paul-graham/founder-mode' },
    { label: 'Next: Think and write clearly', href: '/paul-graham/how-to-think-clearly' },
    { label: 'How to get startup ideas', href: '/paul-graham/how-to-get-startup-ideas' },
    { label: 'What makes a great founder', href: '/paul-graham/what-makes-a-great-founder' },
    { label: 'All Paul Graham lessons', href: '/paul-graham' },
  ],
}
