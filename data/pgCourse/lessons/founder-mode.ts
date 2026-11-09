import type { PgLesson } from '../types'

export const lesson: PgLesson = {
  slug: 'founder-mode',
  track: 'founder',
  order: 0,
  title: 'Founder mode',
  metaTitle: 'Founder Mode Explained: Paul Graham and Brian Chesky',
  metaDescription:
    'What Paul Graham’s Founder Mode essay says: Brian Chesky’s YC talk, manager mode vs founder mode, skip-level meetings, Jobs’s top 100 retreat, and its limits.',
  h1: 'Founder mode: what Paul Graham and Brian Chesky actually said',
  tldr: 'Founder mode is Paul Graham’s name, from a September 2024 essay, for how founders run companies differently from hired managers: staying close to the work and reaching past the org chart, instead of only steering through direct reports. It came from a Brian Chesky talk at a YC event. PG is clear that founders still have to delegate, and that almost nothing is known about it yet.',
  minutes: 11,
  level: 'Intermediate',
  steps: [
    {
      heading: 'Where did "founder mode" come from?',
      body: [
        'PG’s essay "Founder Mode" (September 2024) opens with a talk Brian Chesky gave at a YC event the week before. Chesky said the standard advice on running a big company had failed Airbnb. That advice, in PG’s words: "Hire good people and give them room to do their jobs." Chesky then studied how Steve Jobs ran Apple and found something that worked better.',
        'Other founders in the room said the same had happened to them. PG writes that founders felt gaslit from both sides: by the people telling them to run their companies like managers, and by the people working for them when they did. Chesky later said at the Skift Global Forum that he never called it "founder mode". The name was PG’s.',
      ],
      keyIdea:
        'Founder mode is a name for something founders were already doing and being told was wrong.',
    },
    {
      heading: 'What is manager mode, and why did it fail these founders?',
      body: [
        'Manager mode is how professional managers are taught to run companies. PG compares it to modular design: you treat each part of the org chart as a black box. You tell your direct reports what to do, and they work out how. You do not look inside.',
        'In theory that sounds right. In practice, PG says, founders who followed it often found they had hired people who were good at seeming competent and bad at the work, and the company suffered. His note 1 adds that experienced executives are often skilled at "managing up", controlling how their bosses see them.',
      ],
      flow: ['CEO', 'Direct reports only', 'Black box teams', 'Founder loses sight of the work'],
    },
    {
      heading: 'What does founder mode look like in practice?',
      body: [
        'PG gives two clues. First, it breaks the rule that the CEO deals with the company only through direct reports, so skip-level meetings become normal. Second, Steve Jobs ran an annual retreat for the 100 people he considered most important at Apple, and they were not simply the 100 highest on the org chart. PG says he has never heard of another company doing this.',
        'Chesky described his own version on The Social Radars podcast with Jessica Livingston (2025). He treats a wider group of 40 to 50 leaders almost as direct reports, hires and promotes together with his executives, uses skip-level conversations to see how executives are really doing, and works through ideas with teams in the room rather than handing down orders. He admits executives often dislike it and that it is not for everyone.',
      ],
      bullets: [
        'Once a month, talk to someone two levels below you about what is actually blocking them.',
        'Make your own list of the people who matter most to the work, ignoring titles. Is it the same as your org chart?',
        'Review real output (the product, the code, the support tickets), not only reports about it.',
      ],
    },
    {
      heading: 'What is founder mode not?',
      body: [
        'It is not "never delegate". PG writes: "Obviously founders can’t keep running a 2000 person company the way they ran it when it had 20." There will have to be delegation, and how much depends on the company and on how much trust a manager has earned.',
        'He also predicted it would be misused. In note 3: "Founders who are unable to delegate even things they should will use founder mode as the excuse." Critics went further. Some called it a new name for micromanagement, others said founders need both modes, and several women founders said the same behaviour is judged differently in them. Chesky has pushed back on the micromanagement label: as Wikipedia’s summary of his comments puts it, he says founder mode means staying in the details, and he points to accounts that Jobs collaborated on employees’ ideas rather than taking them over.',
      ],
      keyIdea:
        'Founder mode means staying close to the work, not doing everyone’s job. PG warned it would be used as an excuse.',
    },
    {
      heading: 'How much do we actually know about it?',
      body: [
        'Very little, and PG says so. As far as he knows there are no books on it, and he writes that business schools do not know it exists. On Jobs’s retreat he asks whether it is a good idea or a bad one, and answers: "We still don’t know." The essay is a call to study founder mode, not a finished manual.',
        'So treat it as a hypothesis to test in your own company. Try one practice, such as a skip-level week, and watch what changes: do you catch problems earlier, and do good people feel trusted or watched?',
      ],
    },
    {
      heading: 'What does founder mode mean before you have a big company?',
      body: [
        'At 2 to 20 people you are already in founder mode by default, and PG’s earlier advice is all hands-on. "Startups in 13 Sentences" (February 2009) says understand your users, offer surprisingly good customer service, and remember you make what you measure. Each one means the founder is personally close to the work and the customer.',
        'In "Making Startups Powerful" (September 2026) PG adds in a note that only founders tend to have the inclination or ability to create new things, and that founders remember when the company had to delight users to survive. The habit to build now is the one founder mode protects later: knowing your product and users first-hand.',
      ],
      bullets: [
        'Answer support emails yourself this week. Note three things you would not have learned from a summary.',
        'Pick one number to track weekly. PG: you make what you measure.',
        'If you work in a founder’s office or as a chief of staff, your job is often to extend the founder’s reach into the details. Learn where they want to stay close.',
      ],
    },
  ],
  keyTerms: [
    {
      term: 'Founder mode',
      meaning:
        'PG’s 2024 name for founders running companies hands-on, reaching past the org chart, instead of only through direct reports.',
    },
    {
      term: 'Manager mode',
      meaning:
        'Running a company by treating each team as a black box: say what, let managers decide how, and do not look inside.',
    },
    {
      term: 'Skip-level meeting',
      meaning:
        'A leader talking directly with people below their direct reports. PG expects these to become normal.',
    },
    {
      term: 'Managing up',
      meaning:
        'Controlling how your boss sees you. PG notes experienced executives are often very good at it.',
    },
    {
      term: 'The 100 retreat',
      meaning:
        'Steve Jobs’s annual retreat for the 100 people he thought most important at Apple, regardless of rank.',
    },
  ],
  videos: [
    {
      youtubeId: 'ViqxJY_AG_w',
      title: 'Founder Mode: Brian Chesky, Founder & CEO, Airbnb',
      channel: 'The Social Radars Podcast',
      minutes: 20,
      why: 'Chesky explains to Jessica Livingston what went wrong with "hire great people and trust them", and why he uses skip-level conversations.',
    },
  ],
  tryIt: {
    title: 'Run a one-week founder mode experiment',
    steps: [
      'If you lead a team (or a project, a club or a college fest), draw your org chart in two minutes.',
      'Now list the 5 to 10 people whose work matters most to the outcome, ignoring titles. Circle anyone missing from your direct reports.',
      'Have one 20-minute skip-level chat this week. Ask: what is slowing you down, and what do you think I do not know?',
      'Look at one piece of real output yourself (a page, a ticket, a sales call) instead of a summary of it.',
      'At the end of the week, write one thing you learned that the normal chain would not have told you, and one way the experiment could feel like micromanagement to others.',
    ],
    link: {
      label: 'Read PG’s "Founder Mode"',
      url: 'https://paulgraham.com/foundermode.html',
    },
  },
  check: [
    {
      q: 'A 300-person startup’s CEO only meets their six VPs and never sees the product teams. Which mode is this?',
      options: [
        'Founder mode',
        'Manager mode: treating each team as a black box run through direct reports',
        'Neither, this is just delegation',
        'Micromanagement',
      ],
      answer: 1,
      why: 'PG describes manager mode as treating subtrees of the org chart as black boxes and engaging only through direct reports.',
    },
    {
      q: 'A founder of a 2,000-person company insists on approving every design file personally and cites "founder mode". What would PG say?',
      options: [
        'Correct, founder mode means never delegating',
        'He warned that founders who can’t delegate even what they should would use founder mode as an excuse',
        'This is exactly what Steve Jobs did',
        'Founder mode only applies to 20-person companies',
      ],
      answer: 1,
      why: 'PG says founders cannot run a 2,000-person company like a 20-person one, and note 3 predicts this misuse.',
    },
    {
      q: 'Which practice comes straight from PG’s essay?',
      options: [
        'Firing every manager hired from big companies',
        'Steve Jobs’s yearly retreat for the 100 most important people, chosen regardless of rank',
        'Weekly all-hands meetings',
        'Removing the org chart entirely',
      ],
      answer: 1,
      why: 'PG cites Jobs’s retreat for the 100 people he thought most important, who were not simply the highest ranked.',
    },
  ],
  fromTheSource: [
    {
      who: 'Paul Graham',
      role: 'Cofounder of Y Combinator, writing after hearing Brian Chesky’s talk at a YC event.',
      work: 'Founder Mode (essay, September 2024)',
      url: 'https://paulgraham.com/foundermode.html',
      idea: 'There are two ways to run a company, manager mode and founder mode. Founders were being taught the first, and it often failed them. Almost nothing is known yet about the second.',
      breakdown: [
        'Manager mode treats parts of the org chart as black boxes, managed only through direct reports.',
        'Founder mode breaks that rule: skip-level meetings become normal, and the founder stays close to the work.',
        'Founders still delegate. A 2,000-person company cannot be run like a 20-person one.',
        'PG expected misuse, by founders who cannot delegate and by non-founders imitating founders.',
      ],
      use: 'Read your own calendar: how much of your week is spent close to the actual product and users, versus in reports about them? Move one hour across.',
    },
    {
      who: 'Brian Chesky',
      role: 'Cofounder and CEO of Airbnb (YC Winter 2009), whose YC talk led to the essay.',
      work: 'Founder Mode, interview on The Social Radars podcast with Jessica Livingston (2025)',
      url: 'https://www.youtube.com/watch?v=ViqxJY_AG_w',
      idea: 'Chesky says following "hire great people and trust them" let Airbnb’s teams drift in different directions, and that a founder’s job is to stay close to the work and set the pace every day.',
      breakdown: [
        'He co-hires and makes promotion decisions together with his executives.',
        'He treats a wider group of leaders almost as direct reports and uses skip-level conversations to see how executives are really doing.',
        'He describes it as working through ideas together in the room, not dictating, though he admits critics call it micromanagement.',
        'He says the pandemic, when he had to rebuild the company fast, was when he took this approach.',
      ],
      use: 'If you manage people, decide which two or three decisions you will stay inside (for Chesky, hiring and product), and delegate the rest fully.',
    },
  ],
  sources: [
    {
      label: 'Paul Graham: Founder Mode (September 2024)',
      url: 'https://paulgraham.com/foundermode.html',
    },
    {
      label: 'Paul Graham: Startups in 13 Sentences (February 2009)',
      url: 'https://paulgraham.com/13sentences.html',
    },
    {
      label: 'Paul Graham: Making Startups Powerful (September 2026)',
      url: 'https://paulgraham.com/powerful.html',
    },
    {
      label: 'The Social Radars Podcast: Founder Mode, Brian Chesky (2025)',
      url: 'https://www.youtube.com/watch?v=ViqxJY_AG_w',
    },
    {
      label: 'Skift: Airbnb CEO Brian Chesky, "I Never Called it Founder Mode" (September 2024)',
      url: 'https://skift.com/2024/09/21/airbnb-ceo-brian-chesky-i-never-called-it-founder-mode/',
    },
    {
      label: 'Wikipedia: Founder mode (reactions and criticism)',
      url: 'https://en.wikipedia.org/wiki/Founder_mode',
    },
    {
      label: 'Lenny’s Podcast: Brian Chesky’s new playbook (November 2023)',
      url: 'https://www.youtube.com/watch?v=4ef0juAMqoE',
    },
  ],
  faqs: [
    {
      q: 'What is founder mode?',
      a: 'It is Paul Graham’s term, from a September 2024 essay, for how founders run companies hands-on: reaching past their direct reports, holding skip-level meetings and staying close to the work, rather than managing teams as black boxes.',
    },
    {
      q: 'Is founder mode the same as micromanagement?',
      a: 'Not as PG describes it. He says founders still have to delegate and warns that founders who cannot delegate will use founder mode as an excuse. Critics argue the line is easy to cross, and PG admits little is known about it yet.',
    },
    {
      q: 'Who came up with founder mode, Paul Graham or Brian Chesky?',
      a: 'The idea came from Brian Chesky’s talk at a YC event about how he changed Airbnb after studying Steve Jobs. The name "founder mode" came from Paul Graham’s essay about the talk. Chesky has said he never called it that.',
    },
  ],
  related: [
    { label: 'Cofounders', href: '/paul-graham/cofounders' },
    { label: 'Next: How to do great work', href: '/paul-graham/how-to-do-great-work' },
    { label: 'Do things that don’t scale', href: '/paul-graham/do-things-that-dont-scale' },
    { label: 'All Paul Graham lessons', href: '/paul-graham' },
    { label: 'Founder’s office roles', href: '/founders-office' },
    { label: 'Chief of staff guide', href: '/chief-of-staff' },
  ],
}
