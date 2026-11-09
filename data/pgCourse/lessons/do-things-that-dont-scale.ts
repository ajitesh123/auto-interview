import type { PgLesson } from '../types'

export const lesson: PgLesson = {
  slug: 'do-things-that-dont-scale',
  track: 'build',
  order: 0,
  title: 'Do things that don’t scale',
  metaTitle: 'Do Things That Don’t Scale: Paul Graham’s Advice in Practice',
  metaDescription:
    'Paul Graham’s "Do Things That Don’t Scale" made practical: recruit users by hand, the Collison installation, Airbnb’s door to door start, and this week’s tasks.',
  h1: 'Do things that don’t scale: how Paul Graham says startups really get going',
  tldr: 'Startups rarely take off on their own. In his 2013 essay, Paul Graham says founders have to push them into motion by hand: recruit users one at a time, make each early user extremely happy, and do manually what you will automate later. It feels small and slow, but it is how Stripe, Airbnb and DoorDash started, and it teaches you what to build.',
  minutes: 12,
  level: 'Beginner',
  steps: [
    {
      heading: 'Why does YC tell founders to do things that don’t scale?',
      body: [
        'Paul Graham’s essay "Do Things that Don’t Scale" (July 2013) opens with this: "One of the most common types of advice we give at Y Combinator is to do things that don’t scale." Many would-be founders believe a startup either takes off or it doesn’t. Graham’s point is that startups take off because the founders push them, like the hand crank that started old car engines.',
        'In a short 2019 YC video, he gave three reasons to do the slow, handmade work anyway: if you don’t do it, you may never get big; at the start you have nothing to lose; and you learn a lot from it.',
      ],
      keyIdea:
        'Scale is a problem you earn. Before that, your job is to get the engine turning by hand.',
    },
    {
      heading: 'How do you get your first users? You go and get them',
      body: [
        'Graham calls recruiting users by hand "the most common unscalable thing founders have to do at the start", and says nearly all startups have to do it. You can’t wait for users to come to you. His example is Stripe. At YC, he writes, they use the term "Collison installation" for the technique the Collison brothers invented: when anyone agreed to try Stripe, they would ask for the person’s laptop and set them up on the spot.',
        'Airbnb did the same for a marketplace, which Graham says needs heroic effort to start: the founders went door to door in New York, signing up hosts and helping existing ones improve their listings, including taking photos of their apartments.',
        'He names two reasons founders avoid this. One is shyness and laziness. The other is that the numbers look too small to matter. His answer is compounding: with 100 users, you need 10 more next week to grow 10% a week. Keep that up and you have about 14,000 users after a year and about 2 million after two.',
      ],
      bullets: [
        'This week: list 30 people who have the problem you solve, by name.',
        'Reach out to each one personally, not with a mass email.',
        'When someone says yes, set them up yourself, on a call or in person, right then.',
        'Write down every question they ask during setup. Those are your next fixes.',
      ],
    },
    {
      heading: 'Why does a tiny, fragile startup still deserve your full effort?',
      body: [
        'Graham writes that almost all startups are fragile at first. Founders, investors and onlookers make the mistake of judging them by the standards of established companies, so a small startup looks like it is going nowhere. He says the right question is "how big could this company get if the founders did the right things?"',
        'He says Airbnb was fragile enough that about 30 days of going out and meeting users in person made the difference. Even Bill Gates underrated his early company, Graham notes: he went back to Harvard after starting Microsoft.',
      ],
      keyIdea:
        'Do not judge week 3 of your startup by what a big company looks like. Judge it by what it could become if you do the right things now.',
    },
    {
      heading: 'How much effort should go into each early user?',
      body: [
        'Far more than feels reasonable. Graham says you should take extraordinary measures not only to get users but to make them happy, and that your first users should feel signing up was one of the best choices they ever made. Wufoo, a form builder, sent each new user a handwritten thank-you note.',
        'He borrows Steve Jobs’s phrase but moves it: "It’s not the product that should be insanely great, but the experience of being your user." Your early product will be incomplete and buggy. Make up for it with attention. He adds that he had never once seen a startup misled by trying too hard to make its first users happy, and that this close contact gives you the best feedback you will ever get.',
      ],
      bullets: [
        'Reply to every early user personally, the same day.',
        'Send a short personal thank-you to every new signup this week.',
        'When a user hits a bug, fix it and tell them yourself.',
      ],
    },
    {
      heading: 'What else can you do by hand before you automate it?',
      body: [
        'Graham lists several unscalable moves. Start in a deliberately narrow market, the way Facebook started with Harvard students, to keep the fire contained until it is hot. In B2B, pick a single user and act like consultants building something just for them; he warns this is safe only if you are not being paid by the hour, because paid consulting creates an obligation to do whatever the client asks.',
        'Most extreme of all, you can be your software. Stripe’s "instant" merchant accounts were, behind the scenes, the founders signing users up for traditional merchant accounts by hand. Hardware founders "pull a Meraki" by assembling early units themselves, and Pebble’s founders assembled their first several hundred watches. Graham’s logic: doing things by hand is less frightening than the far more common case of automating something that doesn’t yet solve anyone’s problem.',
        'DoorDash cofounder Stanley Tang told the same story in Stanford’s How to Start a Startup course (2014, lecture 8): the first version was a landing page with PDF menus of Palo Alto restaurants, the founders delivered the food themselves, and they tracked drivers with Apple’s Find My Friends.',
      ],
      flow: [
        'Do it by hand',
        'Learn what users actually need',
        'Automate the part that repeats',
        'Then scale',
      ],
    },
    {
      heading: 'What usually doesn’t work, and when do you stop?',
      body: [
        'Graham names two things that rarely work early. The Big Launch: launches matter much less than founders think, and what counts is the core group of users you win and how happy you make them. Partnerships also usually don’t work. He says inexperienced founders often think a partnership with a big company will be their big break, and six months later they all say the same thing: it was way more work than expected and they got practically nothing out of it.',
        'His last idea is to think of a startup idea as a pair: what you are going to build, plus the unscalable thing you will do to get started. In 2017, YC’s pocket guide by Geoff Ralston put it as "Pre-product market fit – do things that don’t scale: remain small/nimble." In a 2024 YC video, partners said to move to scalable systems once you have proof users want the product and you understand their needs.',
      ],
      example: {
        label: 'Write your idea as a pair, the way Graham suggests',
        text: 'Build: a booking tool for physiotherapy clinics in Pune.\nUnscalable start: visit 15 clinics in person, enter their schedules for them, and answer their WhatsApp messages ourselves for the first two months.',
      },
    },
  ],
  keyTerms: [
    {
      term: 'Do things that don’t scale',
      meaning:
        'YC’s advice to do slow, manual, one-at-a-time work early on, because it gets a startup moving and teaches you what users need.',
    },
    {
      term: 'Collison installation',
      meaning:
        'The YC name for how Stripe’s founders signed up users: instead of sending a link, they took the person’s laptop and set Stripe up on the spot.',
    },
    {
      term: 'Pulling a Meraki',
      meaning:
        'Graham’s phrase for hardware founders assembling early units themselves, as Meraki did, before outsourcing manufacturing.',
    },
    {
      term: 'The Big Launch',
      meaning:
        'A single, heavily promoted launch day. Graham says it usually does not work; a small group of delighted users matters more.',
    },
    {
      term: 'Being your software',
      meaning:
        'Doing by hand what your product claims to do automatically, so you can launch sooner and learn exactly what to build.',
    },
  ],
  videos: [
    {
      youtubeId: '5-TgqZ8nado',
      title: 'Paul Graham: What does it mean to do things that don’t scale?',
      channel: 'Y Combinator',
      minutes: 2,
      why: 'Graham himself, in under two minutes, on why the handmade early work is worth it. Listen for his three reasons.',
    },
    {
      youtubeId: 'IjPDIjge81o',
      title: 'Startup Experts Discuss Doing Things That Don’t Scale',
      channel: 'Y Combinator',
      minutes: 26,
      why: 'YC partners revisit the essay with newer examples, from DoorDash to Instacart. Focus on the part about when to stop.',
    },
  ],
  tryIt: {
    title: 'Recruit 10 users by hand this week',
    steps: [
      'Write one sentence: who has the problem you solve, and where they spend time (a college hostel, a WhatsApp group, a Reddit community, a market street).',
      'List 30 named people or businesses that fit. Friends and family count only if they truly have the problem.',
      'Contact each one personally. Offer to set them up yourself, on a call or in person, that day: your own Collison installation.',
      'For each person you set up, note what confused them and what they asked for.',
      'Send each new user a short personal thank-you note, as Wufoo did.',
      'At the end of the week, count users and write the three things you learned. Repeat next week with 10% more.',
    ],
    link: {
      label: 'Read Paul Graham’s "Do Things that Don’t Scale"',
      url: 'https://paulgraham.com/ds.html',
    },
  },
  check: [
    {
      q: 'You have built a scheduling app. A friend agrees to try it. Following Graham’s essay, what should you do?',
      options: [
        'Send the signup link and wait for feedback',
        'Ask for their laptop or phone and set them up yourself, right now',
        'Add them to the mailing list for the launch next month',
        'Ask them to fill out a survey first',
      ],
      answer: 1,
      why: 'That is the Collison installation. Setting people up on the spot removes the drop-off between "I’ll try it" and actually trying it.',
    },
    {
      q: 'Your B2B startup’s first customer offers to pay you by the hour to build a custom version. What does Graham warn about?',
      options: [
        'Nothing, consulting revenue is always good',
        'Building for one user is fine, but paid hourly work obliges you to do whatever they ask',
        'You should never talk to a single user in depth',
        'You should hire a sales team first',
      ],
      answer: 1,
      why: 'Graham suggests acting like consultants for one user, but says it is safe only if you are not paid as consultants, since paid work creates an expectation that you will do everything the client wants.',
    },
    {
      q: 'Your team wants to spend six weeks preparing a big press launch and a partnership with a large company. What would Graham say?',
      options: [
        'Good plan, a big launch is the best way to get users',
        'Both usually don’t work early; spend the time winning and delighting a core group of users',
        'Only do the partnership, skip the launch',
        'Delay everything until the product is perfect',
      ],
      answer: 1,
      why: 'The essay says the Big Launch usually doesn’t work and partnerships usually don’t either. What matters is the core group of users you win and how happy you make them.',
    },
  ],
  fromTheSource: [
    {
      who: 'Paul Graham',
      role: 'Cofounder of Y Combinator; earlier cofounded Viaweb, one of the first web application companies.',
      work: 'Do Things that Don’t Scale (essay, July 2013)',
      url: 'https://paulgraham.com/ds.html',
      idea: 'Startups do not take off by themselves. Founders have to start them by hand: recruit users one at a time, make them extremely happy, and do manually what they will later automate.',
      breakdown: [
        'Recruit: you can’t wait for users to come to you. Stripe set people up on the spot; Airbnb went door to door in New York.',
        'Delight: the experience of being your user should be insanely great, even if the product is not yet.',
        'Manual: being your own software lets you launch sooner and learn exactly what to automate.',
        'Avoid the Big Launch and early partnerships. They usually don’t work.',
      ],
      use: 'Write your idea as a pair: what you will build, and the unscalable thing you will do to start. Then do the second part this week.',
    },
    {
      who: 'Paul Graham',
      role: 'Cofounder of Y Combinator, speaking in a short YC interview after stepping back from running it.',
      work: 'Paul Graham: What does it mean to do things that don’t scale? (YC video, 2019)',
      url: 'https://www.youtube.com/watch?v=5-TgqZ8nado',
      idea: 'Doing things that don’t scale means slow, handmade work that a large company could not keep up. Startups should do it anyway, especially to win their first customers.',
      breakdown: [
        'Without the manual push, many startups never grow big enough for scale to be a problem.',
        'At the start you have little to lose, so the cost of handmade work is low.',
        'You learn a lot from doing the work yourself, especially for your first customers.',
      ],
      use: 'If a task feels “too manual to be worth it” and you have fewer than 100 users, do it anyway and write down what you learn.',
    },
  ],
  sources: [
    {
      label: 'Paul Graham: Do Things that Don’t Scale (July 2013)',
      url: 'https://paulgraham.com/ds.html',
    },
    {
      label:
        'Y Combinator: Paul Graham, What does it mean to do things that don’t scale? (video, 2019)',
      url: 'https://www.youtube.com/watch?v=5-TgqZ8nado',
    },
    {
      label: 'Y Combinator: Startup Experts Discuss Doing Things That Don’t Scale (video, 2024)',
      url: 'https://www.youtube.com/watch?v=IjPDIjge81o',
    },
    {
      label:
        'Stanford CS183B How to Start a Startup, Lecture 8: Doing Things that Don’t Scale (2014)',
      url: 'https://www.youtube.com/watch?v=oQOC-qy-GDY',
    },
    {
      label: 'Geoff Ralston, YC’s Essential Startup Advice (YC blog, September 2017)',
      url: 'https://www.ycombinator.com/blog/ycs-essential-startup-advice/',
    },
  ],
  faqs: [
    {
      q: 'What does "do things that don’t scale" mean?',
      a: 'It is Paul Graham’s 2013 advice that early startups should do manual, one-at-a-time work, such as recruiting users personally and setting them up by hand, because that is how startups get moving and how founders learn what users need.',
    },
    {
      q: 'What is the Collison installation?',
      a: 'It is the name YC used for how Stripe’s founders, Patrick and John Collison, signed up early users. When someone agreed to try Stripe, they asked for the person’s laptop and set it up for them on the spot.',
    },
    {
      q: 'When should a startup stop doing things that don’t scale?',
      a: 'Graham does not give a fixed point. YC partners in a 2024 video said to move to scalable systems once users clearly want the product and you understand their needs. Until then, the manual work is how you learn.',
    },
  ],
  related: [
    { label: 'Make something people want', href: '/paul-graham/make-something-people-want' },
    {
      label: 'Next: Launch early and talk to users',
      href: '/paul-graham/launch-and-talk-to-users',
    },
    { label: 'Startup = growth', href: '/paul-graham/startup-equals-growth' },
    { label: 'What the first YC founders did', href: '/paul-graham/yc-founder-stories' },
    { label: 'GTM engineer guide', href: '/gtm-engineer' },
  ],
}
