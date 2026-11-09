import type { PgLesson } from '../types'

export const lesson: PgLesson = {
  slug: 'startup-equals-growth',
  track: 'build',
  order: 0,
  title: 'Startup = growth',
  metaTitle: 'Startup = Growth: Paul Graham on Weekly Growth Rate',
  metaDescription:
    'Paul Graham’s "Startup = Growth" explained: what makes a startup, YC’s 5–7% weekly benchmark, what to measure, how compounding works, and ramen profitable.',
  h1: 'Startup = growth: Paul Graham’s weekly growth rate, and how to use it',
  tldr: 'Paul Graham defines a startup as a company designed to grow fast. At YC, growth is measured weekly: 5–7% a week is good, 10% is exceptional, and 1% means you have not yet figured out what you are doing. Pick one number, usually revenue, set a weekly target, and let it decide what you work on. Getting ramen profitable buys you the time to keep going.',
  minutes: 12,
  level: 'Beginner',
  steps: [
    {
      heading: 'What exactly is a startup?',
      body: [
        'Graham opens "Startup = Growth" (September 2012) with a distinction: not every newly founded company is a startup. His definition: "A startup is a company designed to grow fast." He adds that a startup does not have to work on technology or take venture funding.',
        'His comparison is a barbershop and a search engine. A barbershop is not designed to grow fast; a search engine is. That is why he says the only essential thing about a startup is growth, and everything else we associate with startups follows from it.',
      ],
      keyIdea:
        'If you are not trying to grow fast, you may be running a fine business, but not a startup in Graham’s sense.',
    },
    {
      heading: 'What growth rate counts as good?',
      body: [
        'During YC, Graham writes, growth is measured per week. His benchmarks: "A good growth rate during YC is 5-7% a week." If you can hit 10% a week you are doing exceptionally well. If you can only manage 1%, it is a sign you have not yet figured out what you are doing.',
        'What to measure: revenue is best. For startups that are not charging yet, the next best is active users. In a footnote he adds that these weekly targets are for startups that have launched or can launch soon, not, say, a company building a new database.',
        'YC partner Adora Cheung went further in "How to Set KPIs and Goals" (Startup School, 2019): pick one primary metric you would bet the company on, prefer revenue, define "active" precisely if you use active users, and keep three to five secondary metrics, including retention, so growth on top does not hide users leaving at the bottom.',
      ],
      bullets: [
        '1% a week: you have not found it yet. Talk to users and change the product.',
        '5–7% a week: good, by YC’s standard.',
        '10% a week: exceptional.',
        'Measure weekly, on revenue if you charge, or on precisely defined active users if not.',
      ],
    },
    {
      heading: 'Why do small weekly differences matter so much?',
      body: [
        'Because growth compounds. Graham’s table: 1% a week is 1.7x in a year, 5% is 12.6x, 7% is 33.7x and 10% is 142x. A company making $1,000 a month and growing 1% a week makes about $7,900 a month four years later. At 5% a week, he writes, it would be making $25 million a month.',
        'The same maths is why he tells founders in "Do Things that Don’t Scale" (2013) not to dismiss tiny numbers: with 100 users, 10 more next week is 10% growth, and at that rate you reach about 14,000 users in a year.',
      ],
      example: {
        label: 'Worked example: ₹50,000 monthly revenue, one year (52 weeks)',
        code: true,
        text: 'Weekly growth  Multiple (1+g)^52  Revenue after 1 year  Doubles every\n 1%             1.68x              ₹83,900 a month       ~70 weeks\n 5%            12.64x              ₹6.32 lakh a month    ~14 weeks\n 7%            33.73x              ₹16.9 lakh a month    ~10 weeks\n10%           142.04x              ₹71 lakh a month      ~7 weeks\n\nCheck it yourself: 1.05^52 = 12.64, so ₹50,000 x 12.64 = ₹6,32,000.',
      },
    },
    {
      heading: 'How does a growth target make decisions for you?',
      body: [
        'Graham’s practical advice: "pick a growth rate they think they can hit, and then just try to hit it every week." He says you can then use growth like a compass for almost every decision. Should you spend two days at a conference? Should you hire another programmer? Ask whether it helps you hit this week’s number.',
        'It also shrinks a bewildering job into a single problem. He goes further: optimising for growth can discover startup ideas, acting as evolutionary pressure on what you build. In a footnote he rules out trickery, such as buying users for more than their lifetime value, and says fooling investors that way would only hurt you.',
        'In "Startups in 13 Sentences" (2009) he adds the warning that comes with this: you make what you measure, so be careful what you measure. Graham suggests putting a chart of your numbers on the wall. Cheung goes further: draw the next 10 weeks of target growth, post it where you will see it every day, and ask every week what the biggest obstacle to hitting this week’s target is.',
      ],
      flow: [
        'Pick one number',
        'Set a weekly target',
        'Ask: what helps hit it?',
        'Do that',
        'Review every week',
      ],
    },
    {
      heading: 'Where does growth actually come from?',
      body: [
        'Graham describes the growth curve of a successful startup as an S: a period of slow or no growth while the startup works out what it is doing, then fast growth, then a slowdown as it matures. YC’s 2017 pocket guide, written up by Geoff Ralston, puts it as "Growth is the result of a great product not the precursor", and adds: don’t scale your team or product until you have built something people want.',
        'So when the number is flat, the fix is usually the product and the users, not ads. Go back to the earlier lessons: talk to users, do things that don’t scale, and make a few people love what you make.',
      ],
      keyIdea:
        'A weekly growth number tells you whether you have made something people want. It does not make it for you.',
    },
    {
      heading: 'What is ramen profitable, and why aim for it?',
      body: [
        'In "Ramen Profitable" (July 2009), Graham defines it simply: a startup makes just enough to pay the founders’ living expenses. In "Startups in 13 Sentences" he says that once you cross into ramen profitable, it completely changes your relationship with investors.',
        'His reasons: investors take advantage of founders who obviously need money, so not needing it gets you better terms. It shows you can get paid and keep costs down. It lifts morale, because survival becomes the default. And you can raise money when you choose instead of stopping work to do it.',
        'His warnings: the biggest danger is that it turns you into a consulting firm, since, as he notes, it is pretty easy to make $3,000 a month consulting. And ramen profitable "is not the destination"; growth is. It just keeps you alive long enough to find it.',
      ],
      bullets: [
        'Add up your team’s real monthly living costs. That is your ramen number.',
        'Track monthly revenue against it every week.',
        'Charge early. Paying users also tell you more than free ones.',
      ],
    },
  ],
  keyTerms: [
    {
      term: 'Startup',
      meaning:
        'In Paul Graham’s definition, a company designed to grow fast. Growth is the one essential thing.',
    },
    {
      term: 'Weekly growth rate',
      meaning:
        'How much your key number grows each week. YC’s benchmark from Graham: 5–7% is good, 10% exceptional, 1% means you have not figured it out.',
    },
    {
      term: 'Primary metric',
      meaning:
        'The one number you track growth on. Graham says revenue is best and active users next best if you are not charging yet.',
    },
    {
      term: 'Compounding',
      meaning:
        'Growth on top of growth. 5% a week is not 260% a year but about 12.6x, because each week builds on the last.',
    },
    {
      term: 'Ramen profitable',
      meaning:
        'Making just enough to cover the founders’ living expenses, so the company can survive without new investment.',
    },
  ],
  videos: [
    {
      youtubeId: 'lL6GdUHIBsM',
      title: 'Adora Cheung - How to Set KPIs and Goals',
      channel: 'Y Combinator',
      minutes: 24,
      why: 'A YC partner turns Graham’s growth essay into a weekly routine. Focus on choosing one primary metric and on why retention matters.',
    },
  ],
  tryIt: {
    title: 'Set up your weekly growth number in 20 minutes',
    steps: [
      'Choose one number: revenue if you charge anything, otherwise active users with a strict definition (for example, used the core feature at least twice this week).',
      'Make a sheet with three columns: week, number, growth % (this week divided by last week, minus 1).',
      'Fill in every past week you can reconstruct, even if the numbers are tiny.',
      'Pick a weekly target you think you can hit, as Graham advises. If you have no idea, start with 5%.',
      'List what you plan to do this week. Next to each item, write how it helps hit the target. Cut anything that doesn’t.',
      'Add your ramen number (founders’ monthly living costs) as a line on the same sheet.',
    ],
    link: {
      label: 'Read Paul Graham’s "Startup = Growth"',
      url: 'https://paulgraham.com/growth.html',
    },
  },
  check: [
    {
      q: 'Your paid users went from 200 to 202 this week. By Graham’s benchmarks, what does that tell you?',
      options: [
        'You are doing exceptionally well',
        'About 1% a week: a sign you have not yet figured out what you are doing',
        'Exactly YC’s good range',
        'Nothing, weekly numbers do not matter',
      ],
      answer: 1,
      why: '2 out of 200 is 1%. Graham says 1% a week means you haven’t figured it out yet; 5–7% is good and 10% exceptional.',
    },
    {
      q: 'You charge nothing yet. You can track signups, page views or users who used the core feature this week. Which fits Graham and YC best?',
      options: [
        'Total signups since launch',
        'Page views',
        'Active users, defined precisely, such as people who used the core feature this week',
        'Social media followers',
      ],
      answer: 2,
      why: 'Graham says revenue is best and active users next best for startups that are not charging. Adora Cheung adds that "active" must be defined precisely.',
    },
    {
      q: 'You are ramen profitable doing custom projects for three clients and are tempted to take on more clients. What danger does Graham name?',
      options: [
        'None, profit is the goal',
        'Turning into a consulting firm, which does not grow like a product company',
        'Investors will refuse to meet you',
        'You will grow too fast',
      ],
      answer: 1,
      why: 'In "Ramen Profitable" Graham says the biggest danger is that it might turn you into a consulting firm. Ramen profitable is not the destination; growth is.',
    },
  ],
  fromTheSource: [
    {
      who: 'Paul Graham',
      role: 'Cofounder of Y Combinator; YC partners later repeated this essay’s weekly benchmarks in Startup School talks.',
      work: 'Startup = Growth (essay, September 2012)',
      url: 'https://paulgraham.com/growth.html',
      idea: 'A startup is a company designed to grow fast, so growth is the one essential thing. Measure it weekly, aim for a rate, and let that rate guide your decisions.',
      breakdown: [
        'Benchmarks during YC: 5–7% a week is good, 10% exceptional, 1% a sign you have not figured it out.',
        'Measure revenue if you can; active users if you are not charging yet.',
        'Compounding turns small weekly differences into huge yearly ones: 5% a week is 12.6x a year.',
        'Tricks like buying users at a loss do not count, and hurt you in the end.',
      ],
      use: 'Pick a weekly target you think you can hit, write it where you see it, and test every plan this week against it.',
    },
    {
      who: 'Adora Cheung',
      role: 'Cofounder of Homejoy and a Y Combinator partner.',
      work: 'How to Set KPIs and Goals (Startup School talk, 2019)',
      url: 'https://www.youtube.com/watch?v=lL6GdUHIBsM',
      idea: 'Choose one primary metric you would bet the company on, usually revenue, set weekly growth goals for it, and review it every week with a few supporting metrics.',
      breakdown: [
        'Revenue is the best primary metric for most startups; she urges founders to get paid.',
        'If you use active users, define "active" precisely. A signup is not a user.',
        'Keep three to five secondary metrics, and watch retention so new users do not hide lost ones.',
        'Each week, ask what the biggest obstacle to hitting the target is, and work on that.',
      ],
      use: 'Write down your primary metric and its exact definition today, then put it next to your weekly target.',
    },
  ],
  sources: [
    {
      label: 'Paul Graham: Startup = Growth (September 2012)',
      url: 'https://paulgraham.com/growth.html',
    },
    {
      label: 'Paul Graham: Ramen Profitable (July 2009)',
      url: 'https://paulgraham.com/ramenprofitable.html',
    },
    {
      label: 'Paul Graham: Startups in 13 Sentences (February 2009)',
      url: 'https://paulgraham.com/13sentences.html',
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
      label: 'Adora Cheung: How to Set KPIs and Goals (Y Combinator, 2019)',
      url: 'https://www.youtube.com/watch?v=lL6GdUHIBsM',
    },
  ],
  faqs: [
    {
      q: 'What is a good weekly growth rate for a startup?',
      a: 'Paul Graham wrote in 2012 that a good growth rate during YC is 5–7% a week, 10% a week is exceptional, and 1% a week suggests you have not yet figured out what you are doing.',
    },
    {
      q: 'What should a startup measure growth on?',
      a: 'Revenue, according to Graham. If you are not charging yet, use active users, and define "active" precisely. YC partner Adora Cheung also recommends watching a few secondary metrics such as retention.',
    },
    {
      q: 'What does ramen profitable mean?',
      a: 'It is Paul Graham’s term (2009) for a startup that makes just enough to pay the founders’ living expenses. It means you no longer depend on raising money to survive, which improves your terms with investors.',
    },
  ],
  related: [
    { label: 'Launch early and talk to users', href: '/paul-graham/launch-and-talk-to-users' },
    { label: 'Do things that don’t scale', href: '/paul-graham/do-things-that-dont-scale' },
    { label: 'Default alive or default dead', href: '/paul-graham/default-alive-or-dead' },
    { label: 'How to raise money', href: '/paul-graham/how-to-raise-money' },
    { label: 'Founder’s office guide', href: '/founders-office' },
  ],
}
