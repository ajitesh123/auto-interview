import type { BatchWeek } from '../types'

export const week: BatchWeek = {
  week: 4,
  slug: 'week-4',
  phase: 1,
  title: 'Launch',
  metaTitle: 'YC Week 4: How to Launch (Launch YC and Hacker News)',
  metaDescription:
    'Week 4 of the YC batch, run yourself: how YC startups launch on Bookface, Launch YC and Hacker News, Kat Mañalac’s launch steps, and a public launch challenge.',
  h1: 'Week 4: launch in public, then launch again',
  tldr: 'YC helps its startups launch to users and press, including on Product Hunt and Hacker News, and founders describe a set routine: launch to the YC community first, then publicly on Launch YC and Hacker News. YC partner Kat Mañalac teaches that launching is something you keep doing, not one big day. This week you launch v1 in public where your users already are, answer every comment and win your first users from strangers.',
  minutes: 53,
  atYc: {
    body: [
      'YC’s "What Happens at YC" page says YC helps founders present their product to users and the press, including preparing for launches on Product Hunt and Hacker News. In 2022 YC opened Launch YC, a public page for discovering recently funded YC startups, where visitors can try demos and vote; YC says founders "can launch on any day, at any time". Hacker News runs Launch HN for YC startups: it is curated, each startup gets one, and the HN team helps pick the day.',
      'Founders describe the routine. Rafael Garcia of Kernel (S25) calls launching "a formalized playbook": launch internally on Bookface, list in the YC directory, do a Launch YC that YC’s X account shares with its followers, then post on Hacker News. Aditya Jayaprakash of Blacksmith (W24) wrote that every company had a Bookface launch and a Launch YC, and that group partners pushed teams to launch early.',
      'The timing is not fixed. Blacksmith timed its Launch YC about a week before fundraising began, near the end of the batch. Nate Matherson of ContainIQ (S21) wrote that his team launched mid-batch and signed first customers from batchmates soon after. YC does not publish a launch week. This program puts the first public launch in week 4 because YC’s advice is to launch right away, and Mañalac’s point is that you will launch again.',
    ],
    confidence: 'documented',
    sources: [
      { label: 'Y Combinator: What Happens at YC', url: 'https://www.ycombinator.com/about' },
      {
        label: 'Y Combinator, Launch YC: The Launchpad for YC Startups (YC blog, June 2022)',
        url: 'https://www.ycombinator.com/blog/launch-yc-the-launchpad-for-yc-startups',
      },
      {
        label: 'Hacker News, Launch HN instructions for YC startups',
        url: 'https://news.ycombinator.com/yli.html',
      },
      {
        label: 'Rafael Garcia (Kernel, YC S25), YC, Take Two (2025)',
        url: 'https://www.raf.xyz/blog/01-yc-take-two',
      },
      {
        label: 'Aditya Jayaprakash (Blacksmith, YC W24), What it was like going through YC W24',
        url: 'https://blacksmith.sh/blog/going-through-yc-winter-24',
      },
      {
        label: 'Nate Matherson (ContainIQ, YC S21), Doing Y Combinator a Second Time (2023)',
        url: 'https://www.growthmentor.com/blog/doing-y-combinator-a-second-time',
      },
    ],
  },
  challenge: {
    name: 'The public launch challenge',
    task: 'Launch v1 publicly in at least two places where your users already gather, reply to every comment the same day, and get 10 new users who are not friends or family.',
    proof:
      'The live URLs of your launch posts and a count of new users from strangers (aim for 10), with where each came from.',
    basis:
      'Kat Mañalac’s YC talks "How to Launch (Again and Again)" and "The Best Way To Launch Your Startup", and Hacker News’s launch guidance for YC startups.',
  },
  frameworks: [
    {
      name: 'Launch again and again: the launch ladder',
      who: 'Kat Mañalac, YC partner (Startup School 2019 and 2023)',
      source: {
        label: 'Kat Mañalac - How to Launch (Again and Again) (Y Combinator)',
        url: 'https://www.youtube.com/watch?v=3xU050kMbHM',
      },
      explain: [
        'Mañalac’s first aim is to kill the idea that a launch is one moment. Each launch tests your pitch and shows whether you are reaching the right users. In her 2023 talk she says founders are very good at fooling themselves about their problem and their users, and a launch is how you find out. Airbnb launched three times before it took off.',
        'Her steps form a ladder. A silent launch first: a simple page with a domain, company name, a short description, a way to contact you and a call to action. Then friends and family, to test the pitch, but leave that circle fast because they may not be your users. Then strangers who match your user. Then online communities you belong to, a request-access launch, blogs and press, and new-feature launches after that.',
        'On communities, her advice is to learn each one’s rules and to write like a person, not a marketing robot. Share something interesting you learned rather than an ad. She cites Magic, which got about 40,000 sign-ups in a weekend after a friend posted it on Reddit and Hacker News, and calls it an extreme case.',
        'Build an email list from everyone you talk to, so each launch has people ready to help spread it. She warns against paying for placements early on, and in 2023 said press is not a reliable growth channel for early startups. Her example of a steady rhythm is Glossier, which she says launches something every six to eight weeks.',
      ],
      steps: [
        'Write what you do in one plain sentence. Lead with what, not why, and cut jargon. Use "X for Y" only if X is a household name and the link is obvious.',
        'Silent launch: put up the page with domain, name, one-line description, contact and a call to action.',
        'Email everyone from your week 2 and 3 conversations. Tell them it is live and ask them to share it with one person who has the problem.',
        'Go to strangers who match your user, in person or online. Mañalac’s example is Lugg’s founders renting a truck and offering help to shoppers struggling outside Ikea.',
        'Pick two or three communities where your users already are. Read their rules, then post as a person: who you are, what you built and why, something surprising you learned, and a request for feedback.',
        'Reply to every comment, and add every new user to your list.',
        'Put the next launch in the calendar: a new feature or a new community. The two-to-six-week gap is our suggestion.',
      ],
      example: {
        label: 'Illustrative: a launch week plan',
        text: 'Mon: one-line pitch tested on 3 teachers from week 2. "FeeKit sends tuition teachers a weekly list of who hasn’t paid, with a polite reminder ready to forward."\nTue: landing page live (name, line, WhatsApp contact, "Get your list this Sunday").\nWed: message all 10 interviewees; ask each to forward to one teacher friend.\nThu: post in 2 teacher groups (after reading the rules) and 1 subreddit for tutors.\nFri: reply to every comment; call 3 sign-ups.\nSun: first lists sent. Count: new users from strangers.\nNext launch: UPI payment link, in 4 weeks.',
      },
    },
    {
      name: 'Write a launch post Hacker News readers will respect',
      who: 'Hacker News team’s Launch HN instructions for YC startups (also advised for non-YC Show HN posts)',
      source: {
        label: 'Hacker News: Launch HN instructions',
        url: 'https://news.ycombinator.com/yli.html',
      },
      explain: [
        'Hacker News publishes how YC companies should write a Launch HN, and says the same writing advice works for non-YC founders posting a Show HN. Launch HN is curated and each startup gets one; anyone can post a Show HN.',
        'The core rule is tone. Write as a peer talking to other engineers, in a factual, personal voice, not as marketing copy or a pitch to investors. Avoid superlatives and self-congratulation. Readers should be able to try the product, ideally without signing up, at least on launch day. If they can’t, show a demo or video. A waitlist alone usually means it is too early.',
        'The comments matter as much as the post. Reply promptly and stay in the thread. Never ask friends to post supportive comments; HN calls this the worst mistake you can make. When someone criticises you, start with what you agree with and stay calm. Your real audience is the many people reading silently.',
      ],
      steps: [
        'Title: for YC companies, "Launch HN: <company> (YC batch) - <tag line>", 80 characters or fewer, with a neutral, factual tag line. For everyone else, our adaptation is "Show HN: <product> - <tag line>".',
        'Introduce yourselves.',
        'Say what the company does in one clear sentence, then explain it a second way without repeating the title.',
        'Explain the problem, why it is hard and why it matters.',
        'Tell your backstory: where you were and why you started this.',
        'Explain how it works and what is different, in prose, not a feature list. Define any jargon.',
        'Say how you make money, or plan to. HN asks for transparent pricing, so state your price.',
        'End by inviting feedback, ideas and experiences. Then stay in the thread all day.',
      ],
      example: {
        label: 'Illustrative: the opening of a Show HN post',
        text: 'Show HN: FeeKit - weekly unpaid-fee lists for home tuition teachers\n\nHi HN, we’re Asha and Rohan. FeeKit tells a tuition teacher every Sunday which students haven’t paid yet, and gives her a polite reminder she can forward to each parent.\n\nWe started after Asha’s mother, who teaches maths to 40 students in Pune, spent an evening matching UPI screenshots against a notebook. We spoke to 10 teachers; 8 had the same problem.\n\nRight now we build each list partly by hand from screenshots, which is why we can only take 50 teachers. It’s free for the first month, then ₹199 a month.\n\nWe’d love to hear from anyone who has tried to solve fee tracking for small classes. What did you try, and what broke?',
      },
    },
  ],
  videos: [
    {
      youtubeId: '3xU050kMbHM',
      title: 'Kat Mañalac - How to Launch (Again and Again)',
      channel: 'Y Combinator',
      minutes: 20,
      why: 'The launch ladder from silent launch to communities and press. Note her examples, from Lugg at Ikea to Glossier’s launch rhythm.',
    },
    {
      youtubeId: 'u36A-YTxiOw',
      title: 'The Best Way To Launch Your Startup | Startup School',
      channel: 'Y Combinator',
      minutes: 21,
      why: 'Mañalac’s 2023 update: how to describe what you do without jargon, when "X for Y" works, and why waitlists go cold.',
    },
  ],
  assignments: [
    {
      id: 'w4-line',
      text: 'Write your one-line description and test it on three people from your week 2 calls.',
      why: 'Mañalac says to lead with what you do, not why, and to avoid jargon.',
      done: 'A sentence that all three can repeat back correctly.',
    },
    {
      id: 'w4-page',
      text: 'Put up a launch page with domain, name, one line, contact and a call to action.',
      why: 'Mañalac’s silent launch: the minimum before anything public.',
      done: 'A live URL that someone can act on without asking you a question.',
    },
    {
      id: 'w4-list',
      text: 'Email or message everyone you have spoken to since week 1 and ask them to share the launch with one person.',
      why: 'Mañalac’s example of a founder who built an email list over time and found many people helped when he asked.',
      done: 'Every contact messaged, with a count of who shared it.',
    },
    {
      id: 'w4-communities',
      text: 'Pick two or three communities your users already read, and read each one’s rules.',
      why: 'Mañalac: launch to every community you belong to, and follow each one’s rules.',
      done: 'A list of communities with the rule that matters most for each.',
    },
    {
      id: 'w4-launch',
      text: 'Post your launch in at least two places and reply to every comment the same day.',
      why: 'HN’s guidance: be present, reply promptly and never use booster comments.',
      done: 'Two live post URLs and no unanswered comments at the end of the day.',
    },
    {
      id: 'w4-update',
      text: 'Send weekly update #4 and put the date of your next launch in it.',
      why: 'Mañalac: launching is something you keep doing.',
      done: 'Update sent with users from strangers, your primary metric and the next launch date.',
    },
  ],
  officeHours: [
    {
      q: 'What does your company do, in one sentence, with no jargon?',
      why: 'Mañalac’s 2023 talk: lead with what, not why, and drop phrases that say nothing concrete.',
    },
    {
      q: 'Where do your users already spend time online, and what are the rules there?',
      why: 'Mañalac’s 2019 talk: launch to the communities your users are in, and learn each one’s rules.',
    },
    {
      q: 'Can someone try it right now without signing up?',
      why: 'HN’s launch guidance asks founders to remove sign-up barriers on launch day and says a waitlist alone is usually too early.',
    },
    {
      q: 'How many of your new users are strangers, not friends?',
      why: 'Mañalac says to leave the friends-and-family circle as fast as you can; they may not be your users.',
    },
    {
      q: 'When is your next launch, and what will it be?',
      why: 'Mañalac’s core point: you launch again and again, with each new feature or community.',
    },
  ],
  weeklyUpdate: {
    metric: 'new users from strangers',
    prompt:
      'Update #4: where you launched (links), how many new users came from strangers and from which post, the best and worst comment you got, your primary metric versus target, the date of your next launch and one ask.',
  },
  checkpoint:
    'Before week 5: a live launch page, public launch posts in at least two places, every comment answered, first users from strangers counted, and the next launch dated. This follows Kat Mañalac’s YC launch talks (2019 and 2023), Geoff Ralston’s YC essential advice to launch right away, and Hacker News’s Launch HN instructions.',
  faqs: [
    {
      q: 'What is Launch YC?',
      a: 'A public page YC opened in 2022 where recently funded YC startups post launches; visitors can try demos, learn about the team and vote. Founders say it usually follows an internal launch on Bookface and is often paired with a Hacker News post. It is for YC companies; anyone else can use Show HN, Product Hunt and the communities their users read.',
    },
    {
      q: 'Can I post on Hacker News if I am not in YC?',
      a: 'Yes, as a Show HN. Launch HN is only for YC startups, but HN says its writing advice applies to everyone: be factual and personal, let people try the product, state your price and stay in the comments.',
    },
    {
      q: 'Is it too early to launch after one week of building?',
      a: 'Usually not. YC’s first advice is to launch right away, Seibel says to launch something bad quickly, and Mañalac says you will launch many more times. See /paul-graham/launch-and-talk-to-users.',
    },
  ],
  sources: [
    { label: 'Y Combinator: What Happens at YC', url: 'https://www.ycombinator.com/about' },
    {
      label: 'Y Combinator, Launch YC: The Launchpad for YC Startups (YC blog, June 2022)',
      url: 'https://www.ycombinator.com/blog/launch-yc-the-launchpad-for-yc-startups',
    },
    {
      label: 'Hacker News, Launch HN instructions for YC startups',
      url: 'https://news.ycombinator.com/yli.html',
    },
    {
      label: 'Kat Mañalac - How to Launch (Again and Again) (Y Combinator, 2019)',
      url: 'https://www.youtube.com/watch?v=3xU050kMbHM',
    },
    {
      label: 'Transcript: Kat Mañalac - How to Launch (Again and Again) (rosetta.to)',
      url: 'https://rosetta.to/u/ycombinator/kat-ma-alac-how-to-launch-again-and-again',
    },
    {
      label: 'The Best Way To Launch Your Startup | Startup School (Y Combinator, 2023)',
      url: 'https://www.youtube.com/watch?v=u36A-YTxiOw',
    },
    {
      label: 'Transcript: The Best Way To Launch Your Startup (rosetta.to)',
      url: 'https://rosetta.to/u/ycombinator/the-best-way-to-launch-your-startup-startup-school',
    },
    {
      label: 'Geoff Ralston, YC’s Essential Startup Advice (YC blog, 2017)',
      url: 'https://www.ycombinator.com/blog/ycs-essential-startup-advice/',
    },
    {
      label: 'Rafael Garcia (Kernel, YC S25), YC, Take Two (2025)',
      url: 'https://www.raf.xyz/blog/01-yc-take-two',
    },
    {
      label: 'Aditya Jayaprakash (Blacksmith, YC W24), What it was like going through YC W24',
      url: 'https://blacksmith.sh/blog/going-through-yc-winter-24',
    },
    {
      label: 'Nate Matherson (ContainIQ, YC S21), Doing Y Combinator a Second Time (2023)',
      url: 'https://www.growthmentor.com/blog/doing-y-combinator-a-second-time',
    },
  ],
}
