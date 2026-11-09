import type { PgLesson } from '../types'

export const lesson: PgLesson = {
  slug: 'yc-essential-startup-advice',
  track: 'yc',
  order: 0,
  title: 'YC’s essential startup advice',
  metaTitle: 'YC’s Essential Startup Advice, Explained Step by Step',
  metaDescription:
    'All 22 points of YC’s Essential Startup Advice in 6 steps you can act on, plus Michael Seibel on launching and Sam Altman’s Startup Playbook where it adds.',
  h1: 'YC’s essential startup advice: the 22-point pocket guide, turned into six steps',
  tldr: 'In 2017 YC partner Geoff Ralston published "YC’s Essential Startup Advice", a pocket guide of 22 short rules YC considers its most important advice. Most of it reduces to this: launch now, talk to users, make a small group love you, grow from the product, spend money as if it isn’t yours, ignore distractions and competitors, and look after your cofounders and yourself. Michael Seibel’s talks on launching and Sam Altman’s Startup Playbook say the same things from other angles.',
  minutes: 14,
  level: 'Beginner',
  steps: [
    {
      heading: 'Step 1: Launch now and build something people want',
      body: [
        'Ralston’s post opens the pocket guide with "Launch now", "Build something people want", and "Write code – talk to users". He writes that "the first thing we always tell founders is to launch their product right away". A mediocre first version that gets feedback beats a perfect one that never ships. "Make something people want" goes back to the start: Graham ends "Why Smart People Have Bad Ideas" (April 2005) with it, written while YC was sifting through 227 applications for its first summer batch.',
        'Michael Seibel gives the practical version in "How to Plan an MVP" (YC, 2019): aim for a first version you can build in weeks, not months; time-box the spec, write it down and cut features hard; get any customers at all as early as you can. Even Airbnb’s first product had no payments and no map.',
        'Item 4 helps you ship: "Find the 90/10 solution". Ralston credits YC partner Paul Buchheit: look for the way to get 90% of the value for 10% of the work.',
      ],
      bullets: [
        'Write your first-version spec on one page, with a launch date three to six weeks away.',
        'Cut every feature your first ten users won’t miss.',
        'Each week, split your time between building and talking to users. Nothing else counts yet.',
      ],
      keyIdea:
        'Launch something small, soon, to real users. Then do two things only: write code and talk to users.',
    },
    {
      heading: 'Step 2: Do things that don’t scale until 10–100 people love it',
      body: [
        'Items 3, 5 and 15: "Do things that don’t scale", "Find 10-100 customers who love your product", and before product-market fit, stay small and nimble. Ralston’s reason: "a small group of customers who love you is better than a large group who kind of like you."',
        'Seibel’s "The Biggest Mistakes First-Time Founders Make" (YC, 2019) names the trap: not knowing where your first users will come from. In the video he says it is odd to pick a problem when you don’t know anyone who has it, including yourself, and that your first handful of users should come from people you know or have already identified.',
        'Sam Altman’s "Startup Playbook" (2015) puts it bluntly: "Literally watch them use your product. Sit in their office if you can."',
      ],
      bullets: [
        'Write down the names of your first 10 users. If you can’t, go back to the problem.',
        'Set up each early user yourself and watch them use it.',
        'Track how many users would be truly upset if you shut down. That is your "love" number.',
      ],
    },
    {
      heading: 'Step 3: Let growth come from the product, and don’t scale early',
      body: [
        'Items 9 and 10: "Growth is the result of a great product not the precursor" and "Don’t scale your team/product until you have built something people want". Ralston writes that growth is "a natural result" of talking to users, building what they want and iterating quickly. Before product-market fit, he says, growth makes little sense: retention is poor, and growing a product that loses money just burns cash.',
        'Altman agrees: "A great product is the only way to grow long-term." Seibel adds the instrument you need: measure what users actually do. Not using analytics is on his list of first-time founder mistakes.',
      ],
      bullets: [
        'Install basic analytics before launch: signups, weekly active users, the one action that means value.',
        'Before any hire or ad spend, ask: do 10–100 people love this yet?',
        'Improve the product a little every week. Altman: "If you improve your product 5% every week, it will really compound."',
      ],
    },
    {
      heading: 'Step 4: Treat money as someone else’s, and ignore valuation',
      body: [
        'Item 8 is "It’s not your money". Ralston writes that "the money you raise IS NOT your money": you have a duty to spend it only on what improves the company’s chances. Item 11: "valuation is not equal to success or even probability of success." He notes some of YC’s best companies raised at tiny valuations.',
        'Item 20, "Most companies don’t die because they run out of money", appears in the pocket guide list without further explanation in the post. Ralston’s body text points to the related idea: every startup is badly broken at some point, and success depends on what founders do about it.',
        'Altman’s line on fundraising fits here: "The secret to successfully raising money is to have a good company."',
      ],
      keyIdea:
        'Valuation is a number on paper. Spend every rupee or dollar as if an investor were watching, because one is.',
    },
    {
      heading: 'Step 5: Cut the distractions: big deals, corp dev, conferences and competitors',
      body: [
        'Items 12, 13, 14, 16, 18 and 19 are all about focus: avoid long negotiated deals with big customers if you can; avoid corporate development (acquisition) chats, which "will only waste time"; avoid conferences unless they are the best way to get customers; a startup can solve only one problem well at a time; sometimes fire customers who cost more than they give; and "Ignore your competitors, you will more likely die of suicide than murder".',
        'Seibel calls the same mistake "poor prioritization": founders chase press, conferences, investors and hiring over the real work, which is building the product and getting it into users’ hands. Altman: "99% of the time, you should ignore competitors."',
      ],
      bullets: [
        'List everything you did last week. Mark each item "product", "users" or "other". Cut half the "other".',
        'Before a big-company meeting, ask: will this get users or revenue within a month?',
        'Unfollow competitors for a month. Talk to users instead.',
      ],
    },
    {
      heading: 'Step 6: Look after your cofounders and yourself',
      body: [
        'The last group: "All startups are badly broken at some point", "Founder relationships matter more than you think", "Be nice! Or at least don’t be a jerk", and "Get sleep and exercise – take care of yourself". Ralston writes that "the relationships with your cofounders matter more than you think" and that success depends not on being broken at the start but on "what the founders do about the inevitable problems".',
        'Seibel lists two cofounder mistakes in his 2019 talk: choosing cofounders you don’t know well, and not having transparent conversations with them.',
      ],
      bullets: [
        'Hold a weekly 30-minute cofounder check-in: what is working, what is bothering you, what changes.',
        'Write down roles and equity now, while things are good.',
        'Protect sleep and exercise like a meeting with your best customer.',
      ],
      keyIdea:
        'Startups break. Teams that talk openly and stay healthy fix them; teams that don’t, split.',
    },
  ],
  keyTerms: [
    {
      term: 'MVP (minimum viable product)',
      meaning:
        'The simplest version you can give first users to see if it delivers any value. Seibel says it should take weeks, not months, for most software.',
    },
    {
      term: '90/10 solution',
      meaning:
        'Paul Buchheit’s rule of thumb, quoted by Ralston: find the way to get 90% of the value with 10% of the effort.',
    },
    {
      term: 'Product-market fit',
      meaning:
        'The point where a clear group of users wants your product enough to keep using it and tell others. YC says not to scale before it.',
    },
    {
      term: 'Corp dev',
      meaning:
        'Corporate development: the team at a big company that explores partnerships and acquisitions. YC says early talks with them mostly waste time.',
    },
    {
      term: 'Fiduciary duty',
      meaning:
        'A duty to act in the interest of the people whose money you manage. It is why Ralston says raised money "IS NOT your money".',
    },
  ],
  videos: [
    {
      youtubeId: '1hHMwLxN6EM',
      title: 'Michael Seibel - How to Plan an MVP',
      channel: 'Y Combinator',
      minutes: 14,
      why: 'The practical side of "launch now": how to scope a first version you can ship in weeks. Note his examples from Airbnb, Twitch and Stripe.',
    },
    {
      youtubeId: 'D56QeyyQMLI',
      title: 'The Biggest Mistakes First-Time Founders Make - Michael Seibel',
      channel: 'Y Combinator',
      minutes: 7,
      why: 'Eight mistakes in seven minutes. Count how many apply to you right now.',
    },
  ],
  tryIt: {
    title: 'Score your startup against the 22-point pocket guide',
    steps: [
      'Open YC’s Essential Startup Advice and copy the 22-point pocket guide into a note.',
      'Next to each point, write "doing it", "not doing it" or "not relevant yet". Be honest.',
      'Pick the two "not doing it" items closest to the top of the list. Launching and talking to users come first for a reason.',
      'Turn each into one action for this week, with a day and a number (for example: "Talk to 5 users by Friday").',
      'Next week, score yourself again and see what moved.',
    ],
    link: {
      label: 'Read YC’s Essential Startup Advice',
      url: 'https://www.ycombinator.com/blog/ycs-essential-startup-advice',
    },
  },
  check: [
    {
      q: 'You have 2,000 signups but almost nobody comes back. A friend says to spend on ads to grow faster. What does YC’s advice say?',
      options: [
        'Do it; growth fixes everything',
        'Growth is the result of a great product, not the precursor. Talk to users and fix the product first',
        'Raise a big round before you lose momentum',
        'Go to more conferences',
      ],
      answer: 1,
      why: 'Item 9 says growth follows a great product. Paying for growth before people love the product wastes cash, and the new users leave too.',
    },
    {
      q: 'A large company wants a six-month negotiated pilot with custom features. You are four people with no product-market fit. What does the pocket guide suggest?',
      options: [
        'Sign it; big logos impress investors',
        'Avoid long negotiated deals with big customers if you can, and focus on users who will adopt quickly',
        'Hire a sales team first',
        'Ask their corp dev team about an acquisition',
      ],
      answer: 1,
      why: 'Ralston warns that deals between big companies and small startups tend to be slow, costly and often fail, and that corp dev talks waste time.',
    },
    {
      q: 'Which line comes from Sam Altman’s Startup Playbook rather than YC’s pocket guide?',
      options: [
        '"Launch now"',
        '"Find the 90/10 solution"',
        '"Literally watch them use your product. Sit in their office if you can."',
        '"Be nice! Or at least don’t be a jerk"',
      ],
      answer: 2,
      why: 'The other three are items in the pocket guide. The line about watching users is from Altman’s 2015 Startup Playbook.',
    },
  ],
  fromTheSource: [
    {
      who: 'Geoff Ralston',
      role: 'Former YC president and partner who wrote YC’s Essential Startup Advice.',
      work: 'YC’s Essential Startup Advice (YC blog, September 2017)',
      url: 'https://www.ycombinator.com/blog/ycs-essential-startup-advice',
      idea: 'Most YC advice is tactical, week to week. This post collects the few pieces YC considers most important and turns them into a 22-line pocket guide.',
      breakdown: [
        'Start: launch now, build something people want, do things that don’t scale, find the 90/10 solution.',
        'Learn: write code and talk to users. Find 10–100 customers who love you.',
        'Grow: growth comes from a great product; don’t scale the team before you have one.',
        'Survive: it’s not your money, valuation isn’t success, ignore distractions and competitors, look after your cofounders and yourself.',
      ],
      use: 'Pin the 22 lines where you work. Each Monday, pick the one you are most clearly breaking and fix it that week.',
    },
    {
      who: 'Michael Seibel',
      role: 'Longtime YC partner who has served as its managing director; earlier, a cofounder of Justin.tv and Socialcam.',
      work: 'The Biggest Mistakes First-Time Founders Make (YC video and post, August 2019)',
      url: 'https://www.ycombinator.com/blog/the-biggest-mistakes-first-time-founders-make/',
      idea: 'First-time founders usually fail in a few predictable ways, most of them about avoiding the real work: building the product and getting it to users.',
      breakdown: [
        'Caring about the problem: solving a problem, or helping users, you don’t care about.',
        'Cofounders: choosing ones you don’t know well, and not talking openly with them.',
        'Launch: not launching, not using analytics, not knowing where your first users will come from.',
        'Focus: poor prioritization, chasing press, conferences and investors over product and users.',
      ],
      use: 'Read the eight mistakes aloud with your cofounder and agree which one you are making now. Fix that one first.',
    },
  ],
  sources: [
    {
      label: 'Geoff Ralston, YC’s Essential Startup Advice (YC blog, 2017)',
      url: 'https://www.ycombinator.com/blog/ycs-essential-startup-advice',
    },
    {
      label: 'YC Startup Library: YC’s essential startup advice',
      url: 'https://www.ycombinator.com/library/4D-yc-s-essential-startup-advice',
    },
    {
      label: 'Michael Seibel, The Biggest Mistakes First-Time Founders Make (YC, 2019)',
      url: 'https://www.ycombinator.com/blog/the-biggest-mistakes-first-time-founders-make/',
    },
    {
      label: 'Michael Seibel, How to Plan an MVP (YC video, 2019)',
      url: 'https://www.youtube.com/watch?v=1hHMwLxN6EM',
    },
    { label: 'Sam Altman, Startup Playbook (2015)', url: 'https://playbook.samaltman.com/' },
    {
      label: 'Paul Graham, Why Smart People Have Bad Ideas (2005)',
      url: 'https://paulgraham.com/bronze.html',
    },
    {
      label: 'Paul Graham, Do Things that Don’t Scale (2013)',
      url: 'https://paulgraham.com/ds.html',
    },
    {
      label: 'GeekWire, Essential startup advice from Y Combinator (2017)',
      url: 'https://www.geekwire.com/2017/essential-startup-advice-top-silicon-valley-accelerator-y-combinator/',
    },
  ],
  faqs: [
    {
      q: 'What is YC’s most important startup advice?',
      a: 'YC’s own list, "YC’s Essential Startup Advice" by Geoff Ralston (2017), starts with: launch now, build something people want, and do things that don’t scale. Its shortest summary is item 7: write code and talk to users.',
    },
    {
      q: 'What does "make something people want" mean?',
      a: 'It is YC’s motto. Build a product that real people need badly enough to use and pay for, and find that out by talking to them, not by guessing. Paul Graham ends his 2005 essay "Why Smart People Have Bad Ideas" with it.',
    },
    {
      q: 'Who wrote YC’s Essential Startup Advice?',
      a: 'Geoff Ralston, then a YC partner and later its president, published it on YC’s blog in September 2017. YC keeps it in its Startup Library. Michael Seibel has taught much of the same advice in YC talks.',
    },
  ],
  related: [
    { label: 'Make something people want', href: '/paul-graham/make-something-people-want' },
    { label: 'Launch early and talk to users', href: '/paul-graham/launch-and-talk-to-users' },
    { label: 'Do things that don’t scale', href: '/paul-graham/do-things-that-dont-scale' },
    { label: 'Startup = growth', href: '/paul-graham/startup-equals-growth' },
    { label: 'Cofounders', href: '/paul-graham/cofounders' },
    { label: 'Founder’s office roles', href: '/founders-office' },
  ],
}
