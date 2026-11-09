// Week 5: first customers by hand. Sources opened Nov 9, 2026; see `sources`.
import type { BatchWeek } from '../types'

export const week: BatchWeek = {
  week: 5,
  slug: 'week-5',
  phase: 2,
  title: 'First customers by hand',
  metaTitle: 'YC Batch Week 5: Get Your First Customers by Hand',
  metaDescription:
    'Week 5 of a YC batch, run yourself: recruit 20 users by hand with Gustaf Alströmer’s founder sales funnel and Paul Graham’s Do Things that Don’t Scale. Free.',
  h1: 'Week 5: get your first customers by hand',
  tldr: 'After launch, YC’s advice is blunt: startups don’t take off on their own, so founders go and get users one at a time. This week you build the simple sales funnel YC partner Gustaf Alströmer teaches, and you recruit and set up 20 users or customers yourself.',
  minutes: 40,
  atYc: {
    body: [
      'YC’s own pocket guide of advice (Geoff Ralston, 2017) says that once you have launched, do things that don’t scale and get your first customer by any means necessary. Paul Graham’s 2013 essay calls this “one of the most common types of advice we give at Y Combinator”, and says the most common form is recruiting users by hand.',
      'In his Startup School talk on first customers, YC partner Gustaf Alströmer uses Brex as the example: the founders signed their first 10 customers from inside their own YC batch with a very basic virtual card, and one cofounder onboarded each customer personally.',
      'Founders describe the same pattern. Nate Matherson (ContainIQ, S21) wrote that they launched mid-batch and onboarded their first customers from the batch shortly after. Rafael Garcia (Kernel, S25) describes the launch path YC partners push: launch first to the batch on Bookface, then the YC directory, a Launch YC post and a Show HN, “as soon as possible”.',
      'YC does not publish what each week of the batch covers. What is consistent across YC’s advice and founders’ accounts is that the weeks after launch are spent selling, one customer at a time, mostly by the founders themselves.',
    ],
    confidence: 'documented',
    sources: [
      {
        label: 'Y Combinator blog: YC’s Essential Startup Advice (Geoff Ralston, 2017)',
        url: 'https://www.ycombinator.com/blog/ycs-essential-startup-advice/',
      },
      {
        label: 'Paul Graham, Do Things that Don’t Scale (2013)',
        url: 'https://paulgraham.com/ds.html',
      },
      {
        label: 'Gustaf Alströmer, How to Get Your First Customers (YC, Dec 2022)',
        url: 'https://www.youtube.com/watch?v=hyYCn_kAngI',
      },
      {
        label: 'Nate Matherson (ContainIQ, S21): Doing Y Combinator a second time',
        url: 'https://www.growthmentor.com/blog/doing-y-combinator-a-second-time',
      },
      {
        label: 'Rafael Garcia (Kernel, S25): YC, take two',
        url: 'https://www.raf.xyz/blog/01-yc-take-two',
      },
    ],
  },
  challenge: {
    name: 'The 20 by hand challenge',
    task: 'By Sunday, recruit 20 new users or customers yourself, one at a time. Each one is contacted personally by a founder and set up by you, on a call or in person. No ads, no mass emails, no launch posts.',
    proof:
      'A funnel sheet with 20 named rows marked “set up”, each with the date, how you reached them and what they did in their first session. At least 5 of the 20 came back and used the product again without you prompting them.',
    basis:
      'Paul Graham’s “Do Things that Don’t Scale” (2013), which calls recruiting users by hand the most common unscalable thing founders do, and Gustaf Alströmer’s YC Startup School talk “How to Get Your First Customers” (2022).',
  },
  frameworks: [
    {
      name: 'The founder sales funnel, worked backwards from your goal',
      who: 'Gustaf Alströmer, YC group partner, who worked at Airbnb before YC (Startup School, December 2022)',
      source: {
        label: 'How to Get Your First Customers | Startup School',
        url: 'https://www.youtube.com/watch?v=hyYCn_kAngI',
      },
      explain: [
        'Alströmer starts from Paul Graham’s essay: a good product does not grow by itself at the start, so founders have to recruit customers by hand. He then argues that founders must do the selling themselves. Selling and talking to users are closely linked, and you won’t know whether the product is bad until you have tried to sell it. Don’t hire a sales team until you can sell yourself and know what good looks like.',
        'The funnel is simple. A list of people who might buy. A short message to each. A call or demo. A price and a close. Then onboarding. He counts onboarding as part of sales, because a customer who signs and never uses the product will leave. A spreadsheet is enough to run it.',
        'His advice on the first message: keep it short, at most 6 to 8 sentences, in plain language with no HTML. Say you are the founder, address the problem they probably have, include proof, link to your website and end with one clear call to action, such as a call. Start with the easiest leads: people you know, other startups (they decide faster than big companies) and early adopters.',
        'The last part is working backwards. Each stage converts only a fraction of people, so a handful of customers needs many messages. He warns that founders who send about 100 emails, get nothing and conclude that sales doesn’t work usually just didn’t send enough to measure anything. Track the conversion rate at each stage. Our addition: fix the weakest stage first.',
      ],
      steps: [
        'Write your list (60–100 names is our target for one week): people or companies who plausibly have the problem. Alströmer says to start with the easiest leads: people you know, other startups and early adopters.',
        'Put them in a sheet with these columns: name, company, role, contact, how you found them, stage, next step, date.',
        'Write a first message of at most 6 to 8 plain sentences: you are the founder, the problem they likely have, proof, a link to your site, and one call to action (for example, a 15-minute call).',
        'Run every call or demo yourself. Ask about their problem before you show anything.',
        'Say the price, or the commitment you want if it is free for now, and ask for a yes: a signup, a payment or a start date.',
        'Onboard each yes yourself, there and then, on the call or in person. Graham’s essay says YC calls this the “Collison installation”, after Stripe’s founders.',
        'Every evening, update the stage column. On Sunday, work out the conversion from each stage to the next. Our addition: pick the weakest stage to fix next week.',
      ],
      example: {
        label: 'Illustrative: working backwards from 20 set-ups (made-up rates)',
        text: 'Goal: 20 users set up this week\nDemo → set up: 50%       → need 40 demos\nReply → demo: 50%        → need 80 replies\nMessage → reply: 40%     → need 200 messages (warm list)\n200 messages in 7 days   → about 30 a day\n\nIf your reply rate is 10% (cold list), you would need 800 messages.\nThe fix is a warmer list, not a longer week: users’ friends, other founders, communities you belong to.\nReplace these rates with your own after the first 50 messages.',
      },
    },
    {
      name: 'Recruit, set up, delight: do things that don’t scale',
      who: 'Paul Graham, “Do Things that Don’t Scale” (July 2013)',
      source: {
        label: 'Paul Graham, Do Things that Don’t Scale',
        url: 'https://paulgraham.com/ds.html',
      },
      explain: [
        'Graham writes: “The most common unscalable thing founders have to do at the start is to recruit users manually.” Stripe’s founders would ask for your laptop and set you up on the spot. Airbnb’s founders went door to door in New York, signing up hosts and photographing their apartments.',
        'Founders skip this because the numbers look too small. Graham’s answer is compounding: “If you have 100 users, you need to get 10 more next week to grow 10% a week.” Small weekly additions become large within a year.',
        'Getting users is half of it. “You should take extraordinary measures not just to acquire users, but also to make them happy.” Wufoo sent every new user a handwritten thank-you note. Your early product is incomplete, so make up for it with attention. Our full lesson on the essay is at /paul-graham/do-things-that-dont-scale.',
      ],
      steps: [
        'Set up every new user yourself, while you are talking to them.',
        'Write down every question they ask during setup. Those are next week’s fixes.',
        'Send each new user a short personal thank-you within a day.',
        'When a user hits a bug, fix it and tell them yourself.',
        'Write your idea as a pair, as Graham suggests: what you build, plus the unscalable thing you do to get started.',
      ],
      example: {
        label: 'Illustrative: an idea written as a pair',
        text: 'Build: a booking and reminder tool for physiotherapy clinics in Pune.\nUnscalable start: visit 20 clinics, enter their schedules for them, and answer their patients’ WhatsApp questions ourselves for the first month.',
      },
    },
  ],
  videos: [
    {
      youtubeId: 'hyYCn_kAngI',
      title: 'How to Get Your First Customers | Startup School',
      channel: 'Y Combinator',
      minutes: 23,
      why: 'Alströmer’s full talk. Watch the funnel section and the part on working backwards from your goal, then build your sheet.',
    },
    {
      youtubeId: '5-TgqZ8nado',
      title: "Paul Graham: What does it mean to do things that don't scale?",
      channel: 'Y Combinator',
      minutes: 2,
      why: 'Graham in two minutes on why the slow, handmade work is worth it.',
    },
  ],
  assignments: [
    {
      id: 'w5-list',
      text: 'Build a list of at least 60 named people or companies who have the problem you solve.',
      why: 'Alströmer’s funnel starts with a list. You can’t work backwards from an empty one.',
      done: 'A sheet with 60+ rows, each with a way to reach the person.',
    },
    {
      id: 'w5-message',
      text: 'Write your first message (6–8 plain sentences, one ask) and send it to 10 people today.',
      why: 'Alströmer caps outreach at 6 to 8 sentences because people don’t have time to read long emails.',
      done: '10 messages sent and the number of replies written in the sheet.',
    },
    {
      id: 'w5-setup',
      text: 'Set up every yes yourself, on a call or in person, the same day they say yes.',
      why: 'This is the Collison installation Graham describes: you remove every step where a new user could give up.',
      done: 'Every new user in the sheet has a set-up date and the name of the founder who did it.',
    },
    {
      id: 'w5-notes',
      text: 'Write down every question, complaint and request you hear during setup.',
      why: 'Graham says this close contact gives you the best feedback you will ever get.',
      done: 'At least 15 notes, grouped into themes, with the top three marked for next week.',
    },
    {
      id: 'w5-funnel',
      text: 'On Sunday, work out the conversion from each stage to the next and name your weakest stage.',
      why: 'Alströmer says to track conversion at each stage; founders who skip it conclude sales doesn’t work when they simply lack data.',
      done: 'Four conversion rates in the sheet and one sentence on what you will change.',
    },
  ],
  officeHours: [
    {
      q: 'How many users did you personally recruit this week, and how did you reach them?',
      why: 'Graham’s “Do Things that Don’t Scale” calls recruiting users by hand the most common unscalable thing founders do. A partner wants a count, not a plan.',
    },
    {
      q: 'Which stage of your funnel is weakest: replies, demos, or closing?',
      why: 'Alströmer asks founders to track conversion at each stage. Our reading: a low reply rate points to the list or the message; many demos and few closes point to fit, the demo or the price.',
    },
    {
      q: 'Who said no, and what exactly did they say?',
      why: 'Alströmer’s case for founder-led sales is that selling teaches you about customers. If a prospect won’t pay, he says, move on to the next one.',
    },
    {
      q: 'Are these first customers paying?',
      why: 'Alströmer says that if you don’t charge, they are not customers and you don’t have a company. For B2B he advises against free trials and unpaid pilots and suggests a money-back guarantee. Week 8 goes deeper.',
    },
    {
      q: 'Could your batchmates, other founders or your users’ friends be customers?',
      why: 'Alströmer’s Brex example: the first 10 customers came from inside the YC batch. The warmest list you have is usually the fastest.',
    },
  ],
  weeklyUpdate: {
    metric: 'users recruited by hand',
    prompt:
      'Week 5: how many people you recruited and set up yourself, your funnel numbers (messages, replies, demos, set up), your weakest stage, the top three things new users asked for, and your one number against target.',
  },
  checkpoint:
    'Twenty people recruited and set up by a founder, a funnel sheet with conversion at each stage, and a list of what new users asked for. That is the manual start Paul Graham describes in “Do Things that Don’t Scale” (2013) and the funnel Gustaf Alströmer teaches in “How to Get Your First Customers” (2022).',
  faqs: [
    {
      q: 'What do YC founders do in the weeks after they launch?',
      a: 'YC’s own advice says to do things that don’t scale and get your first customer by any means necessary. Founders’ public accounts describe launching to their batch on Bookface first and selling to batchmates. YC does not publish a week-by-week calendar, so treat any exact schedule you see online with care.',
    },
    {
      q: 'Does recruiting users by hand work for a consumer app?',
      a: 'Yes. Airbnb, a consumer marketplace, went door to door in New York, and Alströmer’s talk covers both B2B and B2C. For a consumer app, go where your users already gather, in person or in the groups they use, and set each person up while you are with them.',
    },
    {
      q: 'I am not in a YC batch. Who do I sell to first?',
      a: 'The batch works as a warm list of people who reply. Build your own: founders you know, college and alumni groups, communities you are already part of, and two names from every happy user. Warm lists convert far better than cold ones, which is why Alströmer says to start with the easiest leads.',
    },
  ],
  sources: [
    {
      label: 'Paul Graham, Do Things that Don’t Scale (2013)',
      url: 'https://paulgraham.com/ds.html',
    },
    {
      label: 'Y Combinator blog: YC’s Essential Startup Advice (Geoff Ralston, 2017)',
      url: 'https://www.ycombinator.com/blog/ycs-essential-startup-advice/',
    },
    {
      label: 'YouTube: How to Get Your First Customers | Startup School (Gustaf Alströmer)',
      url: 'https://www.youtube.com/watch?v=hyYCn_kAngI',
    },
    {
      label: 'Transcript: How to Get Your First Customers (Rosetta)',
      url: 'https://rosetta.to/u/ycombinator/how-to-get-your-first-customers-startup-school',
    },
    {
      label: 'Notes on the talk: How to Get Your First Customers (driptanil)',
      url: 'https://driptanil.vercel.app/blog/y-combinator/4.-first-customers',
    },
    {
      label: 'YouTube: Paul Graham, What does it mean to do things that don’t scale?',
      url: 'https://www.youtube.com/watch?v=5-TgqZ8nado',
    },
    {
      label: 'Nate Matherson (ContainIQ, S21): Doing Y Combinator a second time',
      url: 'https://www.growthmentor.com/blog/doing-y-combinator-a-second-time',
    },
    {
      label: 'Rafael Garcia (Kernel, S25): YC, take two',
      url: 'https://www.raf.xyz/blog/01-yc-take-two',
    },
    {
      label: 'Our lesson: Do things that don’t scale',
      url: '/paul-graham/do-things-that-dont-scale',
    },
  ],
}
