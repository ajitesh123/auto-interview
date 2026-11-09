import type { PgLesson } from '../types'

export const lesson: PgLesson = {
  slug: 'make-something-people-want',
  track: 'ideas',
  order: 0,
  title: 'Make something people want',
  metaTitle: 'Make Something People Want: Paul Graham’s Rule',
  metaDescription:
    'Where YC’s motto “make something people want” came from, what Paul Graham means by it, and how to apply it: watch users, win a few fans, then worry about money.',
  h1: 'Make something people want: what Paul Graham means, and how to do it',
  tldr: '“Make something people want” is Y Combinator’s motto, and Paul Graham says it came from his own failure: six months building software nobody wanted. In practice it means getting a rough version in front of real users fast, watching them use it, making a few people love it before trying to please many, and not letting tricks, investors or early revenue pull you away from what users actually need.',
  minutes: 11,
  level: 'Beginner',
  steps: [
    {
      heading: 'Where did “make something people want” come from?',
      body: [
        'In ‘Be Good’ (April 2008), Paul Graham writes: "About a month after we started Y Combinator we came up with the phrase that became our motto: Make something people want." It still sits under the logo on YC’s website.',
        'In a 2016 Startup School Radio interview he explained its real origin. Before Viaweb became online store software, he and his cofounders built software to put art galleries online. Nobody wanted it, and they persisted with it for six months. The motto, he said, came from making something people didn’t want. They then noticed that online stores were built like their gallery sites, added an order button, and started making something people did want.',
      ],
      bullets: [
        'Write one sentence: who is my user, and what will they do with my product this week?',
        'If you have spent more than a month building without a single user trying it, treat that as Graham’s art gallery warning.',
      ],
      keyIdea: 'The motto is a lesson learned from failure, not a slogan.',
    },
    {
      heading: 'What are the three things every startup needs?',
      body: [
        'In ‘How to Start a Startup’ (March 2005), from a talk at Harvard, Graham says you need three things: to start with good people, to make something customers actually want, and to spend as little money as possible. "Most startups that fail do it because they fail at one of these."',
        'On the second, he is concrete. The only way to make something customers want is to get a prototype in front of them and refine it based on their reactions. His advice for learning what they want is to watch them. At Viaweb, one of the best places to do that was trade shows, where they could see people use the software. He adds that nothing is more valuable early on than smart users, the ones who find you by themselves.',
        'Eleven years later his advice was the same. In the 2016 interview he said that if you build something for users, you should go and stand behind them while they use it, and resist telling them where to click.',
      ],
      bullets: [
        'Book three 20-minute sessions this week where a real user uses your product (or a mock-up) while you watch silently.',
        'Write down every place they hesitate, ask a question or go the wrong way.',
        'Fix the biggest one before you build anything new.',
      ],
      flow: [
        'Rough prototype',
        'Real user tries it',
        'You watch quietly',
        'Fix what confused them',
        'Repeat',
      ],
    },
    {
      heading: 'Should you aim for many users or a few who love you?',
      body: [
        'In ‘Startups in 13 Sentences’ (February 2009), one of the 13 is "Better to make a few users love you than a lot ambivalent." He explains that it is easier to expand to more users than to make existing users happier, so start with a small group you satisfy completely.',
        'At the end of the essay, he says that if he could keep only one sentence, it would be the one about understanding your users. He says the wealth a startup creates is roughly the number of users times how much you improve their lives, and understanding users tells you how to do both.',
        'This connects to the well in the previous lesson: a small group who want something badly. The ‘18 Mistakes That Kill Startups’ (October 2006) put it bluntly: in a sense there is just one mistake that kills startups, not making something users want.',
      ],
      bullets: [
        'List your 10 most active users. Message each and ask what they would miss most if you shut down tomorrow.',
        'If fewer than three can answer, focus on one narrow group until some of them would be upset to lose you.',
      ],
      keyIdea: 'A few people who love it beats many who are indifferent.',
    },
    {
      heading: 'Why can’t you game your way to success?',
      body: [
        'In ‘Before the Startup’ (October 2014), his Stanford lecture, Graham says school trains people to hack exams, and founders bring that habit to startups: they look for tricks to impress investors. It can work for a round or two, but not for long. "There is no boss to trick, only users, and all users care about is whether your product does what they want."',
        'His advice is to be an expert on your users and the problem you are solving for them, not an expert on startups. His example is Mark Zuckerberg, who he says succeeded despite being a complete beginner at startups, because he understood his users really well.',
      ],
      bullets: [
        'Look at last week’s calendar. Count hours spent on users and product versus hours on decks, events, logos and networking.',
        'If the second number is bigger, move one recurring meeting to a user call.',
      ],
    },
    {
      heading: 'When should you worry about making money?',
      body: [
        'In ‘Be Good’, Graham pairs the motto with a second piece of advice: don’t worry too much about the business model at first, not because money doesn’t matter but because making money is much easier than making something great. Put the two together, he notes, and what you get is a description of a charity. His example is Craigslist, which is not a charity but is run like one.',
        'The 18 mistakes essay calls the opposite error "Sacrificing Users to (Supposed) Profit". He points to Google, which made search work very well before it worried about revenue. In the 2016 interview he compared optimising for the next dollar too early to sprinting in the first 100 yards of a marathon.',
        'And you do not need business training first. In ‘Why to Not Not Start a Startup’ (March 2007) he says you don’t need to know anything about business to start: build something people want, and working out how to earn from a popular product is manageable.',
      ],
      bullets: [
        'If a pricing or monetisation change would make the product worse for your best users, delay it.',
        'Before any monetisation change, ask: does this make the product better or worse for the users who love it?',
      ],
      keyIdea:
        'Make something great for users first. Money from a product people want is the easier problem.',
    },
    {
      heading: 'How does this connect to growth?',
      body: [
        'In ‘Startup = Growth’ (September 2012), Graham defines a startup as "a company designed to grow fast." To get there, you have to make something lots of people want and be able to reach and serve all of them. Being newly founded does not make a company a startup.',
        'He gives YC’s benchmark: a good growth rate during YC is 5 to 7 percent a week. He calls growth the only essential thing about a startup, and it gets its own lesson later in this course.',
      ],
      bullets: [
        'Pick one number that shows real use (weekly active users, orders, paying customers) and write it down every Monday.',
      ],
    },
  ],
  keyTerms: [
    {
      term: 'Make something people want',
      meaning:
        'Y Combinator’s motto, coined about a month after YC started in 2005. The core job of a startup is building something real users want.',
    },
    {
      term: 'Prototype',
      meaning:
        'A rough first version you put in front of users so their reactions can guide what you build next.',
    },
    {
      term: 'Smart users',
      meaning:
        'Graham’s term in ‘How to Start a Startup’ for early users smart enough to find you by themselves. He says nothing is more valuable early on.',
    },
    {
      term: 'Gaming the system',
      meaning:
        'Using tricks to impress investors or the press instead of serving users. Graham says it fails because there is no boss to trick, only users.',
    },
    {
      term: 'Startup',
      meaning:
        'In Graham’s definition, a company designed to grow fast. Being new does not make a company a startup.',
    },
  ],
  videos: [
    {
      youtubeId: '4WO5kJChg3w',
      title: 'A Conversation with Paul Graham - Moderated by Geoff Ralston',
      channel: 'Y Combinator',
      minutes: 63,
      why: 'Paul Graham answering founders’ questions about users, launching and early mistakes. Listen for how he says to talk to users and when to launch.',
    },
    {
      youtubeId: 'z1iF1c8w5Lg',
      title: 'How To Talk To Users | Startup School',
      channel: 'Y Combinator',
      minutes: 18,
      why: 'YC partner Gustaf Alströmer on how to run user conversations that tell you what people actually want. Use it before your first user calls.',
    },
  ],
  tryIt: {
    title: 'Watch three people use what you made',
    steps: [
      'Pick the smallest thing you have: a prototype, a Figma screen, a spreadsheet you run by hand, or a landing page.',
      'Find three people who have the problem. Friends of friends are fine if they really have it.',
      'Give each one a real task (“book an appointment”, “find a supplier”) and say nothing while they try. Sit behind them or watch their shared screen.',
      'Write down where they got stuck, and ask one question at the end: what did you expect to happen?',
      'Change one thing based on what you saw, and repeat with someone new next week.',
    ],
    link: {
      label: 'Read ‘How to Start a Startup’ by Paul Graham',
      url: 'https://paulgraham.com/start.html',
    },
  },
  check: [
    {
      q: 'Meera has spent four months building a polished app. No one outside her team has used it yet. What would Graham tell her to do next?',
      options: [
        'Add the remaining features so the first impression is perfect',
        'Put it in front of real users now and watch them use it',
        'Raise a seed round before launching',
        'Hire a designer to improve the branding',
      ],
      answer: 1,
      why: 'He says the only way to make something customers want is to get a prototype in front of them and refine it based on their reactions. Four months without users repeats his art gallery mistake.',
    },
    {
      q: 'Two startups after three months: A has 5,000 sign-ups who rarely return. B has 40 users who use it daily and complain when it breaks. Who is closer to making something people want?',
      options: [
        'A, because the number is bigger',
        'B, because a few users love it',
        'Both equally',
        'Neither, until they have revenue',
      ],
      answer: 1,
      why: '‘Startups in 13 Sentences’ says it is better to make a few users love you than a lot ambivalent. It is easier to grow from a group that loves you.',
    },
    {
      q: 'A founder adds aggressive pop-up ads that annoy users, to show revenue to investors next month. Which mistake from Graham’s essays is this?',
      options: [
        'Sacrificing users to (supposed) profit',
        'Schlep blindness',
        'Choosing the wrong platform',
        'Launching too early',
      ],
      answer: 0,
      why: 'Graham lists sacrificing users to supposed profit among the 18 mistakes, and says Google made search work before worrying about revenue.',
    },
  ],
  fromTheSource: [
    {
      who: 'Paul Graham',
      role: 'Co-founder of Y Combinator, essayist',
      work: 'How to Start a Startup (essay from a Harvard talk, March 2005)',
      url: 'https://paulgraham.com/start.html',
      idea: 'A startup needs good people, something customers actually want, and as little spending as possible. "Most startups that fail do it because they fail at one of these."',
      breakdown: [
        'You don’t need a brilliant idea. Existing options are often weak enough that a better one takes no special genius.',
        'The only way to know what customers want is to show them a prototype and refine it from their reactions.',
        'To learn what users want, watch them. Viaweb did much of its watching at trade shows, and valued smart users who found it on their own.',
      ],
      use: 'Before writing more code, put whatever you have in front of three real users and watch them use it.',
    },
    {
      who: 'Paul Graham',
      role: 'Co-founder of Y Combinator, essayist',
      work: 'Before the Startup (Stanford lecture and essay, October 2014)',
      url: 'https://paulgraham.com/before.html',
      idea: 'Founders often try to game startups the way they gamed exams. Graham says it does not work, because "There is no boss to trick, only users."',
      breakdown: [
        'Fake progress can fool investors for a round or two, but the company is still doomed.',
        'Be an expert on your users and their problem, not an expert on startups.',
        'Zuckerberg was a beginner at startups but understood his users really well.',
      ],
      use: 'Judge every week by one question: did we learn something real about our users, and did we make the product better for them?',
    },
  ],
  sources: [
    { label: 'Paul Graham, Be Good (Apr 2008)', url: 'https://paulgraham.com/good.html' },
    {
      label:
        'Y Combinator blog, Paul Graham on Doing Things Right by Accident (Startup School Radio, Feb 2016)',
      url: 'https://www.ycombinator.com/blog/paul-graham-startup-school-radio-interview/',
    },
    {
      label: 'Paul Graham, How to Start a Startup (Mar 2005)',
      url: 'https://paulgraham.com/start.html',
    },
    {
      label: 'Paul Graham, Startups in 13 Sentences (Feb 2009)',
      url: 'https://paulgraham.com/13sentences.html',
    },
    {
      label: 'Paul Graham, Before the Startup (Oct 2014)',
      url: 'https://paulgraham.com/before.html',
    },
    {
      label: 'Paul Graham, The 18 Mistakes That Kill Startups (Oct 2006)',
      url: 'https://paulgraham.com/startupmistakes.html',
    },
    {
      label: 'Paul Graham, Why to Not Not Start a Startup (Mar 2007)',
      url: 'https://paulgraham.com/notnot.html',
    },
    {
      label: 'Paul Graham, Startup = Growth (Sep 2012)',
      url: 'https://paulgraham.com/growth.html',
    },
    { label: 'Y Combinator, About YC', url: 'https://www.ycombinator.com/about' },
  ],
  faqs: [
    {
      q: 'What does “make something people want” mean?',
      a: 'It is Y Combinator’s motto, coined by Paul Graham and his cofounders in 2005. It means the main job of a startup is building something real users want, which you find out by putting early versions in front of them and watching how they use it.',
    },
    {
      q: 'Who said “make something people want”?',
      a: 'Paul Graham and the Y Combinator founders adopted it as YC’s motto about a month after starting YC, as Graham wrote in ‘Be Good’ (2008). He has said it came from his own failure building art gallery software nobody wanted.',
    },
    {
      q: 'What are Paul Graham’s three rules for a startup?',
      a: 'In ‘How to Start a Startup’ (2005) he says you need to start with good people, make something customers actually want, and spend as little money as possible. He says most startups that fail do so because they fail at one of these.',
    },
  ],
  related: [
    { label: 'Previous: How to get startup ideas', href: '/paul-graham/how-to-get-startup-ideas' },
    {
      label: 'Next: The mistakes that kill startups',
      href: '/paul-graham/mistakes-that-kill-startups',
    },
    { label: 'Launch early and talk to users', href: '/paul-graham/launch-and-talk-to-users' },
    { label: 'Startup = growth', href: '/paul-graham/startup-equals-growth' },
    { label: 'Do things that don’t scale', href: '/paul-graham/do-things-that-dont-scale' },
    { label: 'Founder’s office career guide', href: '/founders-office' },
  ],
}
