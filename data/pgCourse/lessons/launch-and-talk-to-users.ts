import type { PgLesson } from '../types'

export const lesson: PgLesson = {
  slug: 'launch-and-talk-to-users',
  track: 'build',
  order: 0,
  title: 'Launch early and talk to users',
  metaTitle: 'Launch Early and Talk to Users: Paul Graham and YC’s Advice',
  metaDescription:
    'Why Paul Graham says slow launches kill startups, how YC partners plan an MVP, the user interview questions YC teaches, and how to make a few users love you.',
  h1: 'Launch early and talk to users: what Paul Graham and YC actually tell founders',
  tldr: 'Paul Graham wrote in 2006 that launching too slowly has killed far more startups than launching too fast, because you only understand your idea once real users touch it. YC’s version is short: the most important early tasks are to write code and talk to users. Launch something small within weeks, win a few users who love it, and keep learning from them.',
  minutes: 13,
  level: 'Beginner',
  steps: [
    {
      heading: 'Why does slowness in launching kill so many startups?',
      body: [
        'In "The 18 Mistakes That Kill Startups" (October 2006), Paul Graham lists slowness in launching as mistake number 8. Under the next mistake, launching too early, he is blunt about which is worse: "Launching too slowly has probably killed a hundred times more startups than launching too fast."',
        'His reasons: nothing is truly finished until it is released, and it is only by bouncing your idea off users that you fully understand it. He names what slows founders down, including fear of dealing with users, fear of being judged and excessive perfectionism, and says it takes an effort of will to push through and get something released.',
        'Launching too early is a real mistake too, but a much rarer one. The early adopters you need to impress are fairly tolerant. They don’t expect a new product to do everything; it just has to do something.',
      ],
      keyIdea: 'Your product has to do one thing well enough that real people use it. Ship that.',
    },
    {
      heading: 'How fast is fast? Plan a tiny first version',
      body: [
        'In "Startups in 13 Sentences" (February 2009), "Launch fast" is sentence 2 and "Let your idea evolve" is sentence 3. Graham says the reason to launch fast is not so much that it is critical to get to market early, but that "Launching teaches you what you should have been building." Like an essay, most of the ideas appear while you build.',
        'YC partner Michael Seibel turned this into a method in "How to Plan an MVP" (Startup School, 2019). His line is to launch something bad quickly. Timebox the first version to a few weeks, write the spec down so new features can’t sneak in, and cut features when the deadline slips. Hold the problem and the user tightly; hold the solution loosely.',
        'His examples: Airbnb’s first version had no payments and no map. Twitch began as Justin.tv, a single live channel. Stripe had almost no features, and its founders sometimes went to customers’ offices to integrate it themselves.',
      ],
      example: {
        label: 'A Seibel-style MVP plan on one page',
        text: 'Problem: college clubs in Hyderabad lose track of who paid event fees.\nUser: club treasurers.\nTimebox: 3 weeks.\nIn: a shared list of members, mark paid or unpaid, a UPI link per event.\nOut (for now): login, reports, reminders, a mobile app.\nLaunch: hand it to 5 treasurers on day 21, whatever state it is in.',
      },
    },
    {
      heading: 'Should you aim for many users, or a few who love you?',
      body: [
        'A few who love you. "Startups in 13 Sentences" opens with a principle Graham credits to Paul Buchheit, Gmail’s creator and later a YC partner: it is better to make a few people really happy than to make a lot of people semi-happy. Sentence 5 says the same: "Better to make a few users love you than a lot ambivalent."',
        'Early on, Graham says, you must choose between meeting all the needs of a small group or some of the needs of everyone. Take the first, because it is easier to expand userwise than satisfactionwise.',
        'YC’s 2017 pocket guide, written up by Geoff Ralston, puts a number on it: "Find 10-100 customers who love your product." He adds that 10 customers with a burning problem are better than 1,000 with a passing annoyance.',
      ],
      keyIdea:
        'Ten users who would be upset if you shut down beat a thousand who signed up and forgot.',
    },
    {
      heading: 'Why does YC keep saying "talk to users"?',
      body: [
        'Ralston’s YC pocket guide lists "Write code – talk to users" and explains that the most important tasks for an early stage company are to write code and talk to users. Everything else is secondary until you have something people want.',
        'Graham ends "Startups in 13 Sentences" by asking which one sentence he would keep. His answer: "Understand your users. That’s the key." He pictures the wealth a startup creates as a rectangle: one side is how many users you have, the other is how much you improve their lives, which he says is the side you have most control over.',
        'In "The 18 Mistakes" he says you need a specific user in mind, and you have to be able to talk some specific ones into using what you make; if you can’t, you are on the wrong track. In "What I’ve Learned from Users" (September 2022) he gives a test for founders: would you use this yourself if you hadn’t built it?',
      ],
      flow: ['Talk to users', 'Write code', 'Ship', 'Watch them use it', 'Talk to users again'],
    },
    {
      heading: 'How do you talk to users without fooling yourself?',
      body: [
        'In YC’s "How To Talk To Users" (Startup School, December 2022), group partner Gustaf Alströmer says a short video call teaches more than thousands of survey responses. Your job in the interview is to listen, not to pitch. Hold back your idea until the end, if you mention it at all.',
        'Ask about what people do today and what is hard about it. Avoid questions that invite polite lies, such as whether they would use your product, or which features they want. He suggests doing five to ten interviews, then grouping your notes by problem and building the smallest thing that fixes the most important one.',
      ],
      example: {
        label: 'Questions from the YC talk, lightly edited',
        text: '1. Tell me how you do X today.\n2. What is the hardest thing about doing X?\n3. Why is that hard?\n4. How often do you have to do X?\n5. Why is it important for you to do X?\n6. What do you do to solve this problem today?\nFollow-ups: "What do you mean by that?", "Can you tell me more about that?"\n\nAvoid: "Would you use our product?", "Which features should we add?", and any yes or no question.',
      },
    },
    {
      heading: 'Is launch day the big moment? No, you launch again and again',
      body: [
        'Graham warns in "Do Things that Don’t Scale" (2013) that the Big Launch usually doesn’t work. In "How to Launch (Again and Again)" (Startup School, 2019), YC’s Kat Mañalac treats launching as something you keep doing, not one day you polish for months.',
        'Her practical steps: start with a silent launch, a simple page with your name, a one-line pitch and a way to sign up. Move past friends and family quickly to strangers who match your user. Post in the online communities where those users already are, follow each community’s rules, and write like a person rather than a marketer. Build an email list from everyone you talk to, so each new launch has people ready to hear about it.',
      ],
      bullets: [
        'This week: put up a one-page site with a one-line pitch and a signup form.',
        'Post it in one community your users read, written in plain words.',
        'Email every signup personally and ask for a 15-minute call.',
        'Plan your next small launch, a new feature, two to four weeks out.',
      ],
    },
  ],
  keyTerms: [
    {
      term: 'MVP (minimum viable product)',
      meaning:
        'The smallest first version that real users can use. Michael Seibel’s advice is to timebox it, write the spec down and cut features to ship on time.',
    },
    {
      term: 'Early adopters',
      meaning:
        'The first users of a new product. Graham says they are fairly tolerant: the product just has to do something useful.',
    },
    {
      term: 'Talk to users',
      meaning:
        'YC’s shorthand for the core early job: alongside writing code, learn directly from the people who have the problem.',
    },
    {
      term: 'Silent launch',
      meaning:
        'Kat Mañalac’s term for a first, quiet launch: a simple page with your company name, a short pitch and a way to sign up.',
    },
    {
      term: 'Expand userwise vs satisfactionwise',
      meaning:
        'Graham’s point that it is easier to win more users like the ones who love you than to make lukewarm users love you.',
    },
  ],
  videos: [
    {
      youtubeId: '3xU050kMbHM',
      title: 'Kat Mañalac - How to Launch (Again and Again)',
      channel: 'Y Combinator',
      minutes: 20,
      why: 'A practical launch checklist from YC. Focus on the silent launch and on posting in communities without sounding like an ad.',
    },
    {
      youtubeId: 'z1iF1c8w5Lg',
      title: 'How To Talk To Users | Startup School',
      channel: 'Y Combinator',
      minutes: 18,
      why: 'YC’s Gustaf Alströmer on running user interviews. Write down his questions to ask and to avoid, then use them this week.',
    },
  ],
  tryIt: {
    title: 'Five user conversations and a three-week launch plan',
    steps: [
      'Pick one specific user, for example "final-year engineering students applying for internships", not "students".',
      'Book five 15-minute calls with people who match. Use your network first, then communities they use.',
      'Ask only the questions from step 5 of this lesson. Do not describe your idea until the last two minutes.',
      'After the calls, group your notes by problem. Circle the problem that came up most and hurt most.',
      'Write a one-page MVP plan: the problem, the user, a three-week timebox, what is in, and what is out.',
      'Put a date on your calendar, three weeks out, when you will hand it to those five people whatever state it is in.',
    ],
    link: {
      label: 'Read Paul Graham’s "Startups in 13 Sentences"',
      url: 'https://paulgraham.com/13sentences.html',
    },
  },
  check: [
    {
      q: 'Your app works for its main task but lacks settings, dark mode and an onboarding tour. What would Graham advise?',
      options: [
        'Wait until those are built so first impressions are perfect',
        'Launch now; early adopters are tolerant and launching teaches you what to build',
        'Run a paid ad campaign first to test demand',
        'Find a big partner before launching',
      ],
      answer: 1,
      why: 'In "The 18 Mistakes" Graham says early adopters don’t expect a new product to do everything, and that slow launching kills far more startups than early launching.',
    },
    {
      q: 'You have 2,000 signups but almost nobody comes back. A rival has 40 users who use it daily and complain when it is down. Who is in the stronger position, by PG and YC’s advice?',
      options: [
        'You, because 2,000 is more than 40',
        'The rival, because a few users who love a product are easier to expand from',
        'Neither, only revenue matters',
        'You, if you raise money first',
      ],
      answer: 1,
      why: 'Graham says it is easier to expand userwise than satisfactionwise, and YC advises finding 10 to 100 customers who love your product.',
    },
    {
      q: 'Which interview question follows YC’s "How To Talk To Users" advice?',
      options: [
        '"Would you pay for an app that does this?"',
        '"Which features should we build next?"',
        '"Tell me how you handle this today. What is the hardest part?"',
        '"Don’t you think this is a great idea?"',
      ],
      answer: 2,
      why: 'The talk recommends asking about what people do now and what is hard about it, and avoiding questions about your product or future features, which invite polite guesses.',
    },
  ],
  fromTheSource: [
    {
      who: 'Paul Graham',
      role: 'Cofounder of Y Combinator; earlier cofounded Viaweb, which Yahoo bought and turned into Yahoo Store.',
      work: 'The 18 Mistakes That Kill Startups (essay, October 2006)',
      url: 'https://paulgraham.com/startupmistakes.html',
      idea: 'Slowness in launching is one of the most common ways startups die, much more common than launching too early, because you only fully understand your idea once users react to it.',
      breakdown: [
        'Nothing is finished until it is released, so an unlaunched product is an unfinished one.',
        'The early adopters you need are tolerant: the product just has to do something.',
        'You need a specific user in mind, and you should be able to talk some of them into using it.',
        'When deciding whether to change direction, ask your users. If they are excited about the new direction, it is probably a good bet.',
      ],
      use: 'Pick a launch date within weeks, decide the one thing the product must do by then, and cut everything else.',
    },
    {
      who: 'Michael Seibel',
      role: 'Cofounder of Justin.tv and Twitch, then a longtime Y Combinator partner.',
      work: 'How to Plan an MVP (Startup School talk, 2019)',
      url: 'https://www.youtube.com/watch?v=1hHMwLxN6EM',
      idea: 'Launch something bad quickly, get some customers, and improve it by talking to them. The first version is a step, not the product.',
      breakdown: [
        'Timebox the build to a few weeks and write the spec down so features can’t creep in.',
        'When the date slips, cut features rather than moving the date.',
        'Keep the problem and the user fixed; change the solution when it fails.',
        'Airbnb, Twitch and Stripe all started with tiny, rough first versions.',
      ],
      use: 'Write your MVP spec on one page today with an "out for now" list at least as long as the "in" list.',
    },
  ],
  sources: [
    {
      label: 'Paul Graham: The 18 Mistakes That Kill Startups (October 2006)',
      url: 'https://paulgraham.com/startupmistakes.html',
    },
    {
      label: 'Paul Graham: Startups in 13 Sentences (February 2009)',
      url: 'https://paulgraham.com/13sentences.html',
    },
    {
      label: 'Paul Graham: What I’ve Learned from Users (September 2022)',
      url: 'https://paulgraham.com/users.html',
    },
    {
      label: 'Paul Graham: Do Things that Don’t Scale (July 2013)',
      url: 'https://paulgraham.com/ds.html',
    },
    {
      label: 'Geoff Ralston, YC’s Essential Startup Advice (YC blog, September 2017)',
      url: 'https://www.ycombinator.com/blog/ycs-essential-startup-advice/',
    },
    {
      label: 'Michael Seibel: How to Plan an MVP (Y Combinator, 2019)',
      url: 'https://www.youtube.com/watch?v=1hHMwLxN6EM',
    },
    {
      label: 'Kat Mañalac: How to Launch (Again and Again) (Y Combinator, 2019)',
      url: 'https://www.youtube.com/watch?v=3xU050kMbHM',
    },
    {
      label: 'Gustaf Alströmer: How To Talk To Users, Startup School (Y Combinator, 2022)',
      url: 'https://www.youtube.com/watch?v=z1iF1c8w5Lg',
    },
  ],
  faqs: [
    {
      q: 'How early should a startup launch?',
      a: 'As early as the product does one useful thing. Paul Graham says launching too slowly has killed far more startups than launching too fast, and YC’s Michael Seibel suggests timeboxing the first version to a few weeks.',
    },
    {
      q: 'Who said "make a few users love you"?',
      a: 'Paul Graham, in "Startups in 13 Sentences" (2009): "Better to make a few users love you than a lot ambivalent." He credits the idea to Paul Buchheit, who said it is better to make a few people really happy than a lot semi-happy.',
    },
    {
      q: 'What does YC mean by "write code, talk to users"?',
      a: 'YC’s essential advice, written up by Geoff Ralston in 2017, says the most important tasks for an early stage company are to write code and talk to users. Most other work can wait until people want what you make.',
    },
  ],
  related: [
    { label: 'Do things that don’t scale', href: '/paul-graham/do-things-that-dont-scale' },
    { label: 'Next: Startup = growth', href: '/paul-graham/startup-equals-growth' },
    { label: 'Make something people want', href: '/paul-graham/make-something-people-want' },
    { label: 'The mistakes that kill startups', href: '/paul-graham/mistakes-that-kill-startups' },
    { label: 'YC’s essential startup advice', href: '/paul-graham/yc-essential-startup-advice' },
    { label: 'GTM engineer guide', href: '/gtm-engineer' },
  ],
}
