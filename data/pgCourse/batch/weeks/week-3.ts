import type { BatchWeek } from '../types'

export const week: BatchWeek = {
  week: 3,
  slug: 'week-3',
  phase: 1,
  title: 'Plan and build the MVP',
  metaTitle: 'YC Week 3: Plan and Build Your MVP in 7 Days',
  metaDescription:
    'Week 3 of the YC batch, run yourself: Michael Seibel’s MVP plan (timebox, write the spec, cut scope) and a challenge to put v1 in real users’ hands in 7 days.',
  h1: 'Week 3: plan the MVP, cut it down and ship v1 in seven days',
  tldr: 'YC’s first advice to founders is to launch right away, and partner Michael Seibel’s version is to launch something bad quickly. On average 40% of companies YC funds are just an idea at the start, so many spend the early batch building a first version. This week you write a one-page spec for the top problem from week 2, cut it to what one person can build in a week, and put it in the hands of real users.',
  minutes: 55,
  atYc: {
    body: [
      'YC’s FAQ says that on average 40% of the companies it funds in each batch are "just an idea". YC’s 2017 pocket guide, written up by Geoff Ralston, says "The first thing we always tell founders is to launch their product right away". Michael Seibel, a longtime YC partner, gave the method in his Startup School talk: timebox the build, write the spec down, cut scope, and build a first version in weeks, not months.',
      'Founders describe partners pushing on speed. Nathan Leung of Harbor (Spring 2026) wrote that partners "have been aggressively pushing us to ship even more and even faster with AI." Aditya Jayaprakash of Blacksmith (W24) wrote that group partners pushed companies to launch early. Rafael Garcia of Kernel (S25) said his team went from "basically no product" to a product he calls best-in-class within the three months.',
      'Timing varies by company. John Lafleur, cofounder of Dataline (later Airbyte), wrote that his team spent month one on customer meetings and set an alpha version as the goal for month two. YC does not publish a week by which an MVP must exist. Week 3 is our choice for this program, so that weeks 4 to 12 have a real product to launch and grow.',
    ],
    confidence: 'reported',
    sources: [
      { label: 'Y Combinator: FAQ', url: 'https://www.ycombinator.com/faq' },
      {
        label: 'Geoff Ralston, YC’s Essential Startup Advice (YC blog, 2017)',
        url: 'https://www.ycombinator.com/blog/ycs-essential-startup-advice/',
      },
      {
        label: 'Michael Seibel - How to Plan an MVP (Y Combinator, 2019)',
        url: 'https://www.youtube.com/watch?v=1hHMwLxN6EM',
      },
      {
        label: 'Nathan H. Leung (Harbor, YC Spring 2026), Halfway Through Spring 2026',
        url: 'https://www.natecation.com/notes-on-yc-spring-2026/',
      },
      {
        label: 'Aditya Jayaprakash (Blacksmith, YC W24), What it was like going through YC W24',
        url: 'https://blacksmith.sh/blog/going-through-yc-winter-24',
      },
      {
        label: 'Rafael Garcia (Kernel, YC S25), YC, Take Two (2025)',
        url: 'https://www.raf.xyz/blog/01-yc-take-two',
      },
      {
        label: 'John Lafleur (Dataline), How We Pivoted 3 Times in the 1st Month of YC (2020)',
        url: 'https://hackernoon.com/how-we-pivoted-3-times-in-the-1st-month-of-yc-u29s3ytl',
      },
    ],
  },
  challenge: {
    name: 'The 7-day v1 challenge',
    task: 'Write a one-page spec for the top problem from week 2, cut it until it fits seven days, and by day 7 have at least three people from your week 2 conversations use it for real.',
    proof:
      'The one-page spec with its "in" and "out" lists, and the names of three users who used v1, with what each did (a screenshot, a log entry or a payment).',
    basis:
      'Michael Seibel’s "How to Plan an MVP" (YC Startup School): launch something bad quickly, timebox the spec, write it down, cut scope.',
  },
  frameworks: [
    {
      name: 'How to plan an MVP: timebox, write it down, cut',
      who: 'Michael Seibel, cofounder of Justin.tv and Twitch, longtime YC partner (Startup School 2019)',
      source: {
        label: 'Michael Seibel - How to Plan an MVP (Y Combinator)',
        url: 'https://www.youtube.com/watch?v=1hHMwLxN6EM',
      },
      explain: [
        'Seibel’s main point fits in four words: launch something bad quickly. The first version is not the product. It is the simplest thing you can give your first users to see whether you can deliver any value, so you learn from what they do instead of guessing.',
        'He gives a rule for what to hold on to. Hold the problem and the customer tightly; hold the solution loosely. If v1 doesn’t work, you keep the problem and the user and change the solution. That is iterating, not pivoting.',
        'His examples are deliberately unimpressive. Airbnb’s first version had no payments, so guests paid hosts in person, and no map view. Justin.tv, which became Twitch, was one channel showing one person, Justin, in very low-resolution video, and no video games. Stripe, then called /dev/payments, had almost no features, and its founders sometimes went to customers’ offices to integrate it by hand.',
        'He also says YC sees startups begin with just a landing page and a spreadsheet. Regulated and hard-tech companies may need a heavier first version, but even their first step can be a simple site explaining what they do.',
      ],
      steps: [
        'Write the problem and the user in one sentence each, from your week 2 ranking. These stay fixed.',
        'Timebox the build. Seibel uses three weeks as an example and says weeks, not months. For this program, the box is seven days (our choice).',
        'Write the spec down: what v1 must do for the user to get value once. A written spec makes every change to it visible.',
        'Our addition: write an "out for now" list next to it. Everything clever goes there.',
        'Each day, check progress against the date. If you are behind, cut the things that clearly aren’t important; if nothing unimportant is left, Seibel says to start cutting important things. Keep the date.',
        'Do by hand whatever you can, like Stripe’s founders integrating for customers. A form, a spreadsheet and WhatsApp count.',
        'Ship to the people you interviewed, watch them use it and talk to them again. Don’t fall in love with v1; it is step one.',
      ],
      example: {
        label: 'Illustrative: a one-page, 7-day spec',
        text: 'Problem: tuition teachers can’t easily track who has paid when parents mix cash and UPI.\nUser: home tuition teachers with 20–60 students.\nTimebox: 7 days. Ship to 5 teachers from week 2 on day 7, whatever state it is in.\n\nIn:\n- A sheet per teacher: student, fee, paid or not (we set it up for them)\n- Every Sunday we send the teacher a "not paid yet" list on WhatsApp\n- One polite reminder message per parent, copy-paste ready\n\nOut for now:\n- An app or login\n- Automatic UPI matching\n- Payment links\n- Class scheduling\n- Reports, analytics, multiple languages\n\nDone by hand: we update the sheets from teachers’ screenshots each evening.',
      },
    },
  ],
  videos: [
    {
      youtubeId: '1hHMwLxN6EM',
      title: 'Michael Seibel - How to Plan an MVP',
      channel: 'Y Combinator',
      minutes: 14,
      why: 'The source for this week’s method. Pause at the Airbnb, Twitch and Stripe examples and compare them with your own spec.',
    },
    {
      youtubeId: 'QRZ_l7cVzzU',
      title: 'How to Build An MVP | Startup School',
      channel: 'Y Combinator',
      minutes: 31,
      why: 'Seibel’s later Startup School talk on the same subject. Listen for why founders fear launching early and how he answers those fears.',
    },
  ],
  assignments: [
    {
      id: 'w3-problem',
      text: 'Write the problem and the user in one sentence each, from your week 2 ranking.',
      why: 'Seibel: hold the problem and the customer tightly, the solution loosely.',
      done: 'Two sentences that name a specific user and a problem at least half your interviewees raised.',
    },
    {
      id: 'w3-spec',
      text: 'Write a one-page spec with an "in" list and an "out for now" list.',
      why: 'Seibel says to write the spec down so that changes to it are visible.',
      done: 'One page, and the "out" list is at least as long as the "in" list.',
    },
    {
      id: 'w3-manual',
      text: 'Mark every part of the spec you will do by hand for now.',
      why: 'Seibel’s landing-page-and-spreadsheet start, and Stripe’s founders integrating by hand.',
      done: 'Each manual step has a named person and a daily time to do it.',
    },
    {
      id: 'w3-cut',
      text: 'On day 4, compare progress to the date and cut whatever won’t make it.',
      why: 'Seibel: when you are behind, cut the spec, not the deadline.',
      done: 'A dated note of what you cut, or "nothing cut".',
    },
    {
      id: 'w3-ship',
      text: 'Put v1 in the hands of at least three people from your week 2 conversations.',
      why: 'Seibel: get anyone using your product as early as possible, then talk to them.',
      done: 'Three named users who used it for real, with what each did.',
    },
    {
      id: 'w3-update',
      text: 'Send weekly update #3.',
      why: 'Keep the weekly rhythm; this is the first week your primary metric can move.',
      done: 'Update sent with ship date, users on v1 and your primary metric.',
    },
  ],
  officeHours: [
    {
      q: 'Who exactly is this for, and what one problem does v1 solve?',
      why: 'Seibel’s rule: hold the problem and the customer tightly. A vague user means a vague spec.',
    },
    {
      q: 'What did you cut?',
      why: 'Seibel says to cut the spec, not the date, when you fall behind.',
    },
    {
      q: 'When will a real user touch it?',
      why: 'Seibel’s timeframe is weeks, not months, and YC’s first advice is to launch right away.',
    },
    {
      q: 'Could you do this with a landing page and a spreadsheet?',
      why: 'Seibel says YC sees startups begin with exactly that.',
    },
    {
      q: 'If v1 doesn’t work, what will you change and what will you keep?',
      why: 'Seibel: keep the problem and the customer, change the solution. Iterate before you pivot.',
    },
  ],
  weeklyUpdate: {
    metric: 'users on v1 this week',
    prompt:
      'Update #3: did v1 ship (date), how many people used it and what they did, what you cut, what you are doing by hand, your primary metric versus target, and one ask.',
  },
  checkpoint:
    'Before week 4: a written one-page spec, v1 shipped within seven days, and at least three real users who used it. The seven days are our timebox; the method is Michael Seibel’s in "How to Plan an MVP" (launch something bad quickly, timeboxed in weeks), and the urgency comes from Geoff Ralston’s YC essential advice to launch right away.',
  faqs: [
    {
      q: 'How long should it take to build an MVP?',
      a: 'Michael Seibel says weeks, not months, and uses three weeks as an example timebox. This program uses seven days so one person can ship v1 inside the week. Write the spec down and cut features when you fall behind.',
    },
    {
      q: 'What if my MVP is embarrassing?',
      a: 'That is normal. Seibel’s examples: Airbnb had no payments or map, Justin.tv was one low-resolution channel, and Stripe’s founders integrated it by hand. More in /paul-graham/launch-and-talk-to-users.',
    },
    {
      q: 'Is doing things by hand a real MVP?',
      a: 'Yes. Seibel says YC sees startups begin with just a landing page and a spreadsheet. Doing the work by hand also teaches you what to automate later. More in /paul-graham/do-things-that-dont-scale.',
    },
  ],
  sources: [
    {
      label: 'Michael Seibel - How to Plan an MVP (Y Combinator, 2019)',
      url: 'https://www.youtube.com/watch?v=1hHMwLxN6EM',
    },
    {
      label: 'Transcript: Michael Seibel - How to Plan an MVP (rosetta.to)',
      url: 'https://rosetta.to/u/ycombinator/michael-seibel-how-to-plan-an-mvp',
    },
    {
      label: 'Michael Seibel, How to Build An MVP | Startup School (YC Library)',
      url: 'https://www.ycombinator.com/library/Io-how-to-build-an-mvp',
    },
    { label: 'Y Combinator: FAQ', url: 'https://www.ycombinator.com/faq' },
    {
      label: 'Geoff Ralston, YC’s Essential Startup Advice (YC blog, 2017)',
      url: 'https://www.ycombinator.com/blog/ycs-essential-startup-advice/',
    },
    {
      label: 'Nathan H. Leung (Harbor, YC Spring 2026), Halfway Through Spring 2026',
      url: 'https://www.natecation.com/notes-on-yc-spring-2026/',
    },
    {
      label: 'Aditya Jayaprakash (Blacksmith, YC W24), What it was like going through YC W24',
      url: 'https://blacksmith.sh/blog/going-through-yc-winter-24',
    },
    {
      label: 'Rafael Garcia (Kernel, YC S25), YC, Take Two (2025)',
      url: 'https://www.raf.xyz/blog/01-yc-take-two',
    },
    {
      label: 'John Lafleur (Dataline), How We Pivoted 3 Times in the 1st Month of YC (2020)',
      url: 'https://hackernoon.com/how-we-pivoted-3-times-in-the-1st-month-of-yc-u29s3ytl',
    },
  ],
}
