import type { PgLesson } from '../types'

export const lesson: PgLesson = {
  slug: 'what-makes-a-great-founder',
  track: 'founder',
  order: 0,
  title: 'What makes a great founder',
  metaTitle: 'What Paul Graham Looks for in Founders, With Examples',
  metaDescription:
    'What Paul Graham and YC look for in founders: determination, flexibility, imagination, naughtiness, earnestness and being relentlessly resourceful, plus drills.',
  h1: 'What makes a great founder, according to Paul Graham',
  tldr: 'Paul Graham’s answer has stayed the same for over fifteen years: past a basic level of intelligence, determination matters most. Add flexibility, imagination, a little naughtiness, earnestness and a cofounder you are close to, and you get the founder he calls "relentlessly resourceful". Most of it can be trained, and YC judges it from stories of what you actually did, not from how confident you sound.',
  minutes: 14,
  level: 'Beginner',
  steps: [
    {
      heading: 'Why does determination beat intelligence?',
      body: [
        'In "What We Look for in Founders" (October 2010), Paul Graham says YC first assumed intelligence predicted success. It did not. His summary: "as long as you’re over a certain threshold of intelligence, what matters most is determination." His example is Bill Clerico of WePay, a payments startup that had to get things out of big, bureaucratic companies. PG says Clerico is so persistent that people may as well just do what he asks.',
        'In "The Anatomy of Determination" (September 2009) he splits determination into three parts. Willfulness is the raw drive, mostly inborn. Discipline keeps willfulness from being wasted on impulses, and it can be learned. Ambition points both at a goal, and it grows when you spend time around ambitious people. He repeated the same view in a 2018 YC conversation with Geoff Ralston.',
      ],
      bullets: [
        'Pick the one area where your discipline is weakest (sleep, phone, deadlines) and fix only that this week. PG says discipline is the trainable part.',
        'Spend more time with people more ambitious than you. In his essay, ambition is the part peers change most.',
        'Track one hard thing you finished despite wanting to quit. You will need these stories later.',
      ],
      keyIdea:
        'Above a basic level of intelligence, determination decides. And two of its three parts can be trained.',
    },
    {
      heading: 'What does "relentlessly resourceful" mean?',
      body: [
        'In "Be Relentlessly Resourceful" (March 2009), PG boils the good founder down to two words. The opposite is the hapless founder, who waits and lets things happen. "To be hapless is to be battered by circumstances," he writes. Relentless alone is not enough, because in a startup you never know if the wall in front of you is foam or granite. So you keep trying new ways through. That is the resourceful part.',
        'In "A Word to the Resourceful" (January 2012) he adds a test YC noticed in conversations. The weakest founders were hard to talk to: PG could never quite tell if they understood what he was saying. The best were the ones partners said "can take care of themselves". Give them a lead, such as an investor introduction, and they close it. In the footnote a YC partner says weak teams get a "glazed over look" because they have already decided what to do, while strong teams give advice a real hearing and, when they reject it, can name a concrete reason, such as having tried it already.',
      ],
      bullets: [
        'Write down one problem you are waiting on someone else to fix. Find two other ways around it and try one by Friday.',
        'After your next piece of feedback, write what it implies for you in three bullets, even if you disagree. Then decide.',
        'When you hit a wall, ask "foam or granite?" and test it cheaply before you either push or give up.',
      ],
      keyIdea:
        '"Make something people want" is where you are going. Being relentlessly resourceful is how PG says you get there.',
    },
    {
      heading: 'How is persistence different from stubbornness?',
      body: [
        'Determination without flexibility turns into a wall. In the 2010 essay, PG compares a good founder to a running back: set on the end zone, but willing to go sideways or even backward to get there. His example is Daniel Gross, who applied to YC with a weak idea, agreed to change it, tried two more, and had been working on Greplin for only a couple of days when he presented it at Demo Day.',
        'In "The Right Kind of Stubborn" (July 2024) he makes the line precise: "The persistent are attached to the goal. The obstinate are attached to their ideas about how to reach it." Persistent people, he says, are never more engaged than when you disagree with them, and he names the Collison brothers of Stripe as the most determined people he can think of. He lists five things the persistent have: energy, imagination, resilience, good judgement and a goal they are focused on.',
      ],
      example: {
        label: 'Self-check: goal or method?',
        text: 'Goal: "Help 100 small shops in Pune take online orders."\nMethod I am attached to: "A mobile app."\nIf a WhatsApp bot gets the same shops ordering faster, do I switch?\nPersistent answer: yes, the goal is the shops. Obstinate answer: no, I already built the app.',
      },
    },
    {
      heading: 'Why does PG want imagination and a little naughtiness?',
      body: [
        'Imagination, in the 2010 essay, means coming up with surprising new ideas, not solving known problems quickly. He says "most good ideas seem bad initially." His example is Airbnb. YC funded it "because we liked the founders so much", and as soon as the partners heard the founders had been supporting themselves by selling Obama and McCain branded breakfast cereal, PG writes, "they were in."',
        'Naughtiness is his word for founders who are usually good people, but "not Goody Two-Shoes type good": they delight in breaking rules, but not rules that matter. Sam Altman suggested that the YC application ask about a time you hacked something to your advantage, "hacked in the sense of beating the system, not breaking into computers." PG says it became one of the questions YC pays most attention to when judging applications.',
      ],
      bullets: [
        'List three systems you have beaten: a queue, a rule, a slow process at college or work. If you cannot think of one, look for one this month.',
        'Keep a note of ideas that sound slightly crazy to your friends. PG’s point is that good ones often do.',
        'Break rules that do not matter, never ones that do. PG is clear that naughty founders are still good people.',
      ],
    },
    {
      heading: 'What do "earnest" and "formidable" mean at YC?',
      body: [
        'In "Earnestness" (December 2020), PG says the highest compliment he and Jessica Livingston give founders is "earnest": doing something for the right reasons and trying as hard as they can. The root is interest in the problem for its own sake, not in the money or fame. Then he adds YC’s other word: "when founders are both formidable (another of our words) and earnest, they’re as close to unstoppable as you get."',
        'Jessica Livingston said the same in her 2018 talk at YC’s Female Founders Conference. Her questions when judging founders were: did they seem earnest, did they seem determined, were they flexible-minded. In a 2026 YC conversation with Vivian Shen, PG has a whole chapter titled "What Makes a Founder Formidable" (it starts at 9:28 in the video below).',
      ],
      keyIdea:
        'Formidable plus earnest is the combination PG and Jessica Livingston call close to unstoppable.',
    },
    {
      heading: 'How does YC test all this in a 10-minute interview?',
      body: [
        'On Conversations with Tyler (August 2023), PG explained it. You learn what someone is like to work with by working with them for 10 minutes. Determination shows up in stories, not in a pitch: he wants to hear that "Something went wrong, and instead of giving up, they persevered." He also checks if founders really understand their idea or only have a "reading-the-newspaper level of understanding". He said about seven minutes in, interviewers rarely change their mind.',
        'In "How Universities Should Prepare Founders" (August 2026) he adds that YC partners look for people who are "good at building things and have a habit of doing it." Side projects are that proof, and in the same essay he says random side projects are where the best startup ideas come from.',
      ],
      bullets: [
        'Write three 60-second stories: a setback you got past, a system you beat, a thing you built that people used.',
        'For each, say what you did, not what you felt. PG judges the actions.',
        'Explain your idea to a friend who knows the field and let them push hard for 10 minutes. Note every question you could not answer.',
      ],
      example: {
        label: 'A story shape that answers PG’s question',
        text: 'Situation: Our college fest sponsor pulled out 9 days before the event.\nWhat I did: Called 40 local businesses in 3 days, got 6 smaller sponsors, cut two costs.\nResult: Event ran, ₹40,000 surplus.\nWhat it shows: something went wrong, and I did not give up.',
      },
    },
  ],
  keyTerms: [
    {
      term: 'Determination',
      meaning:
        'PG’s top founder trait. Made of willfulness (drive), discipline (control) and ambition (aim), from "The Anatomy of Determination" (2009).',
    },
    {
      term: 'Relentlessly resourceful',
      meaning:
        'PG’s two-word description of a good founder: never stopping, and always trying new ways around obstacles.',
    },
    {
      term: 'Hapless',
      meaning:
        'The opposite founder: passive, waiting, pushed around by circumstances instead of acting on them.',
    },
    {
      term: 'Formidable',
      meaning:
        'One of PG and Jessica Livingston’s special words for founders, used alongside earnest. Formidable and earnest together is their highest bar.',
    },
    {
      term: 'Earnest',
      meaning:
        'Doing something for the right reasons and trying as hard as you can, out of real interest in the problem.',
    },
    {
      term: 'Naughtiness',
      meaning:
        'Being a good person who still enjoys beating systems and breaking rules that do not matter.',
    },
  ],
  videos: [
    {
      youtubeId: '4WO5kJChg3w',
      title: 'A Conversation with Paul Graham - Moderated by Geoff Ralston',
      channel: 'Y Combinator',
      minutes: 64,
      why: 'PG on why determination matters more than intelligence, how he picked cofounders, and why trust is hard to judge. This starts at the determination section.',
      start: 2114,
    },
    {
      youtubeId: '5bxp78i96S8',
      title: 'Paul Graham On Startups, Ambition, and Great Founders',
      channel: 'Y Combinator',
      minutes: 22,
      why: 'A 2026 conversation at the original YC office. Starts at the chapter "What Makes a Founder Formidable".',
      start: 568,
    },
  ],
  tryIt: {
    title: 'Run PG’s founder audit on yourself',
    steps: [
      'Write the five traits from "What We Look for in Founders": determination, flexibility, imagination, naughtiness, friendship. Score yourself 1 to 5 on each, with one real example as evidence.',
      'For your lowest score, write one thing you will do this week to raise it (for example: try a second way around a blocked problem).',
      'Write three systems you have hacked, in PG’s sense of beating the system. If you have none, that is your homework.',
      'Write your best "something went wrong and I kept going" story in under 100 words. Say what you did, not how you felt.',
      'Read it aloud to a friend and ask: "Does this person sound hapless or resourceful?"',
    ],
    link: {
      label: 'Read PG’s "What We Look for in Founders"',
      url: 'https://paulgraham.com/founders.html',
    },
  },
  check: [
    {
      q: 'Two friends apply to YC. Asha topped her university. Rohan is less academic, but rebuilt his product three times after users ignored it. By PG’s essays, who has the stronger founder signal?',
      options: [
        'Asha, because intelligence is the best predictor',
        'Rohan, because past a threshold of intelligence, determination matters most',
        'Neither, because YC only looks at ideas',
        'Both are equal, since grades and persistence cancel out',
      ],
      answer: 1,
      why: 'In "What We Look for in Founders" (2010), PG says that once you are above a threshold of intelligence, determination matters most. Rohan has evidence of it.',
    },
    {
      q: 'Your payments partner bank stops replying for two weeks. What would PG call the relentlessly resourceful response?',
      options: [
        'Wait, since the bank controls the timeline',
        'Email the same person every day with the same message',
        'Try new routes: another contact, another bank, or a workaround, and test which wall is foam',
        'Pivot to a new idea immediately',
      ],
      answer: 2,
      why: 'PG says relentless alone is not enough, because you do not know if an obstacle is foam or granite. Resourcefulness means trying new ways through.',
    },
    {
      q: 'In "The Right Kind of Stubborn", which founder is persistent rather than obstinate?',
      options: [
        'One who keeps the original plan no matter what users say',
        'One who keeps the goal but changes the method when evidence says so',
        'One who changes the goal every month',
        'One who stops listening once an investor objects',
      ],
      answer: 1,
      why: 'PG: the persistent are attached to the goal, the obstinate to their ideas about how to reach it.',
    },
  ],
  fromTheSource: [
    {
      who: 'Paul Graham',
      role: 'Cofounder of Y Combinator and of Viaweb, an early web app company sold to Yahoo in 1998.',
      work: 'Be Relentlessly Resourceful (essay, March 2009)',
      url: 'https://paulgraham.com/relres.html',
      idea: 'After years of trying, PG reduced the good founder to two words: relentlessly resourceful. The bad founder is hapless: passive and pushed around by circumstances.',
      breakdown: [
        'Relentless alone is not enough, because in a startup you cannot tell in advance whether an obstacle is foam or granite.',
        'Resourceful means you keep trying new things until one works.',
        'After four years of trying to teach it, he says it can be taught surprisingly often, especially to young people who have always been under some kind of authority.',
        'The same test works for judging yourself and for judging a possible cofounder.',
      ],
      use: 'Use "Be relentlessly resourceful" as a tactical reminder when you are stuck: list three new ways around the problem before you accept it.',
    },
    {
      who: 'Jessica Livingston',
      role: 'Cofounder of Y Combinator, author of Founders at Work, host of The Social Radars podcast.',
      work: '9 things she learned from founding YC (talk at YC’s Female Founders Conference, 2018)',
      url: 'https://www.ycombinator.com/blog/jessica-livingston-shares-9-things-she-learned-from-founding-yc/',
      idea: 'When she judged founders at YC, Livingston looked for earnestness, determination and flexibility, and she judged people on what they could turn into, not only who they were then.',
      breakdown: [
        'Her questions: did they seem earnest, did they seem determined, were they flexible-minded.',
        'There is no one mold for a successful founder, so do not copy the type you see in the news.',
        'She refused to fund conceited applicants, to keep YC free of jerks.',
        'You do not need an elite college. Users judge the product, not your degree.',
      ],
      use: 'Before any investor or YC conversation, check your stories against her three questions. If a story shows none of them, replace it.',
    },
  ],
  sources: [
    {
      label: 'Paul Graham: What We Look for in Founders (October 2010)',
      url: 'https://paulgraham.com/founders.html',
    },
    {
      label: 'Paul Graham: The Anatomy of Determination (September 2009)',
      url: 'https://paulgraham.com/determination.html',
    },
    {
      label: 'Paul Graham: Be Relentlessly Resourceful (March 2009)',
      url: 'https://paulgraham.com/relres.html',
    },
    {
      label: 'Paul Graham: A Word to the Resourceful (January 2012)',
      url: 'https://paulgraham.com/word.html',
    },
    {
      label: 'Paul Graham: The Right Kind of Stubborn (July 2024)',
      url: 'https://paulgraham.com/persistence.html',
    },
    {
      label: 'Paul Graham: Earnestness (December 2020)',
      url: 'https://paulgraham.com/earnest.html',
    },
    { label: 'Paul Graham: Fierce Nerds (May 2021)', url: 'https://paulgraham.com/fn.html' },
    {
      label: 'Paul Graham: How Universities Should Prepare Founders (August 2026)',
      url: 'https://paulgraham.com/prepare.html',
    },
    {
      label:
        'Conversations with Tyler: Paul Graham on Ambition, Art, and Evaluating Talent (August 2023)',
      url: 'https://conversationswithtyler.com/episodes/paul-graham/',
    },
    {
      label: 'Y Combinator: Jessica Livingston Shares 9 Things She Learned From Founding YC (2018)',
      url: 'https://www.ycombinator.com/blog/jessica-livingston-shares-9-things-she-learned-from-founding-yc/',
    },
    {
      label: 'Y Combinator: A Conversation with Paul Graham, moderated by Geoff Ralston (2018)',
      url: 'https://www.youtube.com/watch?v=4WO5kJChg3w',
    },
    {
      label: 'Y Combinator: Paul Graham On Startups, Ambition, and Great Founders (2026)',
      url: 'https://www.youtube.com/watch?v=5bxp78i96S8',
    },
  ],
  faqs: [
    {
      q: 'What does Paul Graham look for in founders?',
      a: 'In "What We Look for in Founders" (2010) he lists determination, flexibility, imagination, naughtiness and friendship between cofounders. Elsewhere he sums it up as "relentlessly resourceful", and he and Jessica Livingston use "earnest" and "formidable" as their highest praise.',
    },
    {
      q: 'Is intelligence or determination more important for a startup founder?',
      a: 'Paul Graham says determination. Once you are above a certain threshold of intelligence, he writes, what matters most is determination. In "The Anatomy of Determination" he adds that plenty of people as smart as Bill Gates achieve nothing.',
    },
    {
      q: 'What does "relentlessly resourceful" mean?',
      a: 'It is Paul Graham’s 2009 description of a good founder: someone who never stops, and who keeps trying new ways around obstacles instead of pushing the same way or waiting. The opposite is "hapless", being battered by circumstances.',
    },
  ],
  related: [
    { label: 'Next: Cofounders', href: '/paul-graham/cofounders' },
    { label: 'Founder mode', href: '/paul-graham/founder-mode' },
    { label: 'How to do great work', href: '/paul-graham/how-to-do-great-work' },
    { label: 'How to get into YC', href: '/paul-graham/how-to-get-into-yc' },
    { label: 'All Paul Graham lessons', href: '/paul-graham' },
    { label: 'Founder’s office roles', href: '/founders-office' },
  ],
}
