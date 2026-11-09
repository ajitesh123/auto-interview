import type { PgLesson } from '../types'

export const lesson: PgLesson = {
  slug: 'mistakes-that-kill-startups',
  track: 'ideas',
  order: 0,
  title: 'The mistakes that kill startups',
  metaTitle: 'Paul Graham’s 18 Mistakes That Kill Startups',
  metaDescription:
    'All 18 mistakes from Paul Graham’s essay in six checks, with what to do instead, plus his ‘How Not to Die’ point: most startups die because founders give up.',
  h1: 'The 18 mistakes that kill startups, and what Paul Graham says to do instead',
  tldr: 'In ‘The 18 Mistakes That Kill Startups’ (2006), Paul Graham lists the causes of failure that founders control, and says that in a sense there is only one: not making something users want. The 18 fall into six groups: the idea, the team, launching, money, users and sales, and effort. His follow-up, ‘How Not to Die’ (2007), adds the most important point: if you just avoid dying, you get rich, and startups usually die because the founders get demoralised and give up.',
  minutes: 13,
  level: 'Beginner',
  steps: [
    {
      heading: 'Is your idea one of the four bad kinds?',
      body: [
        'In ‘The 18 Mistakes That Kill Startups’ (October 2006), Graham says he wrote a list of what to avoid because it is easier to catch yourself doing something you shouldn’t than always to remember to do something you should. Near the start he says: "In a sense there’s just one mistake that kills startups: not making something users want." Four of the 18 are about the idea.',
        'Marginal niche: picking a small, obscure corner to avoid competition. He says you can only avoid competition by avoiding good ideas, and suggests asking what would be a great idea for someone else to do. Derivative idea: copying a successful company. Start from a problem instead, and imagine the company that might solve it. Obstinacy: refusing to change the plan when evidence says so; startups are more like science, where you follow the trail. Having no specific user in mind: you can’t build things users like without understanding them.',
      ],
      bullets: [
        'Mistake 3, marginal niche: pick the problem, not the hiding place.',
        'Mistake 4, derivative idea: if your pitch is “X for Y”, rewrite it as a problem a real person has.',
        'Mistake 5, obstinacy: write down what evidence would make you change direction.',
        'Mistake 10, no specific user: name the exact person you are building for.',
      ],
    },
    {
      heading: 'Are the people and the place right?',
      body: [
        'Four mistakes are about who builds the company and where. Single founder: "Starting a startup is too hard for one person," and the low points are so low that few could bear them alone. He adds that it is a vote of no confidence: it suggests the founder could not convince any friend to join.',
        'Bad location: startups do better in some places than others. In 2006 his ranking was Silicon Valley first, then Boston, then Seattle, Austin, Denver and New York. Hiring bad programmers: non-programmers struggle to judge programmers, and Graham admits he doesn’t think there is an answer to how they should pick them. Fights between founders: most come from choosing the wrong people. His advice: "Don’t suppress misgivings."',
      ],
      bullets: [
        'Mistake 1: if you are solo, spend this month looking for a cofounder you have worked with before.',
        'Mistake 2: go where the people building in your field are, in person, at least some of the time.',
        'Mistake 6: if no founder can judge code, make finding a technical cofounder the first job, before hiring any programmers.',
        'Mistake 17: before you split equity, say out loud every doubt you have about roles, money and commitment.',
      ],
    },
    {
      heading: 'Are you launching too slowly, or too early?',
      body: [
        'Choosing the wrong platform: let good programmers choose the technology, not what looks like a safe, responsible choice to outsiders. Slowness in launching is the big one. In his words, "software is always 85% done." Launching forces you to finish, and only by bouncing your idea off users do you fully understand it.',
        'Launching too early is also a mistake, because a bad first version can cost you early adopters. But Graham is clear about which is worse: launching too slowly has probably killed a hundred times more startups than launching too fast. The first version does not have to do much, it just has to be useful on its own and something you can build on.',
      ],
      bullets: [
        'Mistakes 8 and 9: write the one thing your first version must do well. Cut everything else.',
        'Set a launch date within the next four weeks and tell three people.',
        'Mistake 7: if your technical cofounder strongly prefers a tool, let them use it.',
      ],
      keyIdea: 'Of the two launch mistakes, launching too late kills far more startups.',
    },
    {
      heading: 'Are you raising and spending the right amount?',
      body: [
        'Four mistakes are about money. Raising too little: startup funding is measured in time. If you take investors’ money, take enough to reach the next step, whatever that is. Raising too much: big money puts you under pressure (as one VC put it, "the clock is ticking") and makes it harder to change direction. YC advises founders seeking VC money to take the first reasonable deal they get.',
        'Spending too much: "The classic way to burn through cash is by hiring a lot of people." Avoid hiring where you can, and hire only people who will write code or get users. Poor investor management: listen to investors, but don’t let them run the company. The next track’s lesson on default alive or default dead shows how to check whether your spending will kill you.',
      ],
      bullets: [
        'Mistake 11: write your next milestone and how many months it needs. Add a buffer, since things take longer than planned.',
        'Mistake 12: for each planned hire, ask “will this person build the product or bring in users?”',
        'Mistakes 13 and 14: decide in writing which decisions stay with the founders.',
      ],
    },
    {
      heading: 'Are you avoiding users and sales?',
      body: [
        'Sacrificing users to (supposed) profit: the core problem is creating wealth, so make something users want before squeezing money out of them. His example is Google, which made search work very well before worrying about revenue.',
        'Not wanting to get your hands dirty: many technical founders want to write code and avoid selling. Graham says "No one trusts an idea till you embody it in a product and use that to grow a user base." He notes that after developing their search algorithm, Larry Page and Sergey Brin first tried to get another company to buy it, and found there is not much of a market for ideas.',
      ],
      bullets: [
        'Mistake 15: list every way you make money today. Strike any that makes the product worse for your best users.',
        'Mistake 16: each founder, technical or not, talks to at least five users or customers this week.',
      ],
    },
    {
      heading: 'Will you keep going when it gets bad?',
      body: [
        'The last of the 18 is a half-hearted effort. "Most founders of failed startups don’t quit their day jobs, and most founders of successful ones do." He ends by saying that starting a startup is like everything else: the biggest mistake you can make is not to try hard enough.',
        'In ‘How Not to Die’ (August 2007), a talk at the last YC dinner of that summer, he goes further: if you can just avoid dying, you get rich. The official cause of death is usually running out of money or a key founder leaving, but he thinks the underlying cause is usually that the founders became demoralised. His two rules: don’t give up, and avoid other projects, because distraction is fatal. In a 2016 interview he put it the same way: if you don’t die, you become rich.',
        'He also warned: bad things will happen, they always do in a startup, and that is normal. When something doesn’t work, don’t sit still. Iterate.',
      ],
      bullets: [
        'Mistake 18: decide the date you go full-time, or the milestone that triggers it.',
        'Drop or pause one side project this week.',
        'Write a one-line note to your future self for the bad week: what you will try next instead of quitting.',
      ],
      keyIdea: 'Most startups don’t die from one bad decision. They die when the founders stop.',
    },
  ],
  keyTerms: [
    {
      term: 'Marginal niche',
      meaning:
        'A small, obscure market chosen to avoid competition. Graham says it also avoids the good ideas.',
    },
    {
      term: 'Derivative idea',
      meaning:
        'A copy of an existing successful startup, rather than a company built around an unsolved problem.',
    },
    {
      term: 'Obstinacy',
      meaning: 'Sticking to the original plan when users and evidence say it is wrong.',
    },
    {
      term: 'Half-hearted effort',
      meaning:
        'Running a startup on the side while keeping a day job. Graham’s last mistake: he says most founders of failed startups don’t quit their day jobs.',
    },
    {
      term: 'Demoralisation',
      meaning:
        'What Graham calls the usual underlying cause of startup death in ‘How Not to Die’: the founders lose heart and stop, even when the official cause is money or a founder leaving.',
    },
  ],
  videos: [
    {
      youtubeId: 'D56QeyyQMLI',
      title: 'The Biggest Mistakes First-Time Founders Make - Michael Seibel',
      channel: 'Y Combinator',
      minutes: 7,
      why: 'A short YC update of Graham’s list from a partner who saw hundreds of companies. Compare his list with the 18 above.',
    },
    {
      youtubeId: '4WO5kJChg3w',
      title: 'A Conversation with Paul Graham - Moderated by Geoff Ralston',
      channel: 'Y Combinator',
      minutes: 63,
      why: 'Paul Graham on why startups fail and what founders get wrong about users and launching, in his own words.',
    },
  ],
  tryIt: {
    title: 'Run the 18-mistake audit on your startup or idea',
    steps: [
      'Open the essay and copy the 18 headings into a note.',
      'Mark each one red (we are doing this now), amber (we are at risk) or green (not a problem). Be honest; ask a cofounder to mark separately.',
      'Pick the reddest one and write one action you will take this week to fix it, using the “this week” bullets above.',
      'Put a reminder in your calendar to redo the audit in a month.',
    ],
    link: {
      label: 'Read ‘The 18 Mistakes That Kill Startups’',
      url: 'https://paulgraham.com/startupmistakes.html',
    },
  },
  check: [
    {
      q: 'Kabir has worked for nine months on his app and says it is “about 85% done”. He wants two more months before launching. What does Graham’s list say?',
      options: [
        'Wait, because launching too early hurts your reputation',
        'Launch now; software is always 85% done, and slow launching kills far more startups',
        'Raise money first so the launch is bigger',
        'Rewrite it on a more popular platform',
      ],
      answer: 1,
      why: 'Graham says software is always 85% done and that launching too slowly has probably killed a hundred times more startups than launching too fast.',
    },
    {
      q: 'After a small seed round, a founder wants to hire eight people to “grow faster”, though users are flat. Which mistake is the closest match?',
      options: ['Raising too little money', 'Spending too much', 'Derivative idea', 'Obstinacy'],
      answer: 1,
      why: 'He calls hiring a lot of people the classic way to burn through cash, and advises hiring only people who will write code or get users.',
    },
    {
      q: 'Two founders keep their jobs and work on the startup on weekends “until it takes off”. What does Graham say?',
      options: [
        'Smart, because it lowers risk',
        'Fine, as long as they raise money first',
        'This is a half-hearted effort; most founders of failed startups don’t quit their day jobs',
        'Only a problem if they have no cofounder',
      ],
      answer: 2,
      why: 'Mistake 18: most founders of failed startups don’t quit their day jobs, and most founders of successful ones do.',
    },
  ],
  fromTheSource: [
    {
      who: 'Paul Graham',
      role: 'Co-founder of Y Combinator, essayist',
      work: 'The 18 Mistakes That Kill Startups (essay, October 2006)',
      url: 'https://paulgraham.com/startupmistakes.html',
      idea: 'A list of the causes of startup failure that founders can control, written as things to avoid because that is easier to act on. Underneath all of them is one mistake: not making something users want.',
      breakdown: [
        'Idea mistakes: marginal niche, derivative idea, obstinacy, no specific user.',
        'Team mistakes: single founder, bad location, bad programmers, founder fights.',
        'Execution and money: wrong platform, launching too slowly or too early, raising or spending wrongly, letting investors run things.',
        'Attitude: sacrificing users for profit, avoiding sales, and a half-hearted effort.',
      ],
      use: 'Use it as a monthly checklist. It is easy to be making two or three of these mistakes at once without noticing.',
    },
    {
      who: 'Paul Graham',
      role: 'Co-founder of Y Combinator, essayist',
      work: 'How Not to Die (talk and essay, August 2007)',
      url: 'https://paulgraham.com/die.html',
      idea: 'Survival is most of the game. "If you can just avoid dying, you get rich." Startups usually die because the founders become demoralised.',
      breakdown: [
        'The official causes are running out of money or a key founder leaving.',
        'The underlying cause is usually that the founders gave up.',
        'Avoid other projects: "Distraction is fatal to startups."',
        'Bad things will happen. When they do, don’t freeze. Iterate.',
      ],
      use: 'Plan for the bad month now: know what you will try next, and keep your attention on this one company.',
    },
  ],
  sources: [
    {
      label: 'Paul Graham, The 18 Mistakes That Kill Startups (Oct 2006)',
      url: 'https://paulgraham.com/startupmistakes.html',
    },
    { label: 'Paul Graham, How Not to Die (Aug 2007)', url: 'https://paulgraham.com/die.html' },
    {
      label: 'Y Combinator blog, Paul Graham on Doing Things Right by Accident (Feb 2016)',
      url: 'https://www.ycombinator.com/blog/paul-graham-startup-school-radio-interview/',
    },
    {
      label: 'Y Combinator blog, The Biggest Mistakes First-Time Founders Make (Aug 2019)',
      url: 'https://www.ycombinator.com/blog/the-biggest-mistakes-first-time-founders-make/',
    },
  ],
  faqs: [
    {
      q: 'What are the 18 mistakes that kill startups?',
      a: 'Single founder, bad location, marginal niche, derivative idea, obstinacy, hiring bad programmers, choosing the wrong platform, slowness in launching, launching too early, having no specific user in mind, raising too little money, spending too much, raising too much money, poor investor management, sacrificing users to (supposed) profit, not wanting to get your hands dirty, fights between founders, and a half-hearted effort.',
    },
    {
      q: 'What is the number one reason startups fail, according to Paul Graham?',
      a: 'He says that in a sense there is one mistake behind all of them: not making something users want. In ‘How Not to Die’ he adds that the underlying cause of death is usually that founders get demoralised and give up.',
    },
    {
      q: 'Is it bad to start a startup alone?',
      a: 'Graham lists being a single founder as mistake number one. He says starting a startup is too hard for one person, the low points are hard to bear alone, and it is a vote of no confidence: it suggests the founder could not persuade any friend, the people who know them best, to join.',
    },
  ],
  related: [
    {
      label: 'Previous: Make something people want',
      href: '/paul-graham/make-something-people-want',
    },
    { label: 'Next: Do things that don’t scale', href: '/paul-graham/do-things-that-dont-scale' },
    { label: 'Cofounders', href: '/paul-graham/cofounders' },
    { label: 'Default alive or default dead', href: '/paul-graham/default-alive-or-dead' },
    { label: 'Launch early and talk to users', href: '/paul-graham/launch-and-talk-to-users' },
    { label: 'Founder’s office career guide', href: '/founders-office' },
  ],
}
