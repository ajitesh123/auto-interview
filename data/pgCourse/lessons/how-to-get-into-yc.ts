import type { PgLesson } from '../types'

export const lesson: PgLesson = {
  slug: 'how-to-get-into-yc',
  track: 'yc',
  order: 0,
  title: 'How to get into YC',
  metaTitle: 'How to Get Into Y Combinator: Application and Interview',
  metaDescription:
    'How to get into Y Combinator: what YC partners and Paul Graham say they look for, how to write the application, the 10-minute interview, mistakes, a checklist.',
  h1: 'How to get into Y Combinator: the application, the interview and what YC looks for',
  tldr: 'YC reads your answer to "what are you making?" first, then looks hard at the founders. Paul Graham’s own advice is to say what you do in the first sentence, in plain words, and be specific about what each founder has built. The best short tip he knows: explain what you have learned from users. If you get an interview, it is a short video call, about 10 minutes, so know your numbers and answer plainly. About half of each batch applied more than once, per YC’s FAQ.',
  minutes: 15,
  level: 'Beginner',
  steps: [
    {
      heading: 'When should you apply, and what happens after?',
      body: [
        'YC’s FAQ says to apply "as soon as you have a founding team and an idea you are excited about". On average, 40% of the companies YC funds in each batch are just an idea. In a typical batch, about half the companies applied several times before getting in. Students can apply early for the batch after the current one.',
        'As of November 2026, the apply page lists Winter 2027 (January to March, San Francisco). On-time applications closed November 2 and get a decision by December 11. YC still accepts late applications and reads them when it has time, with no promised date. Most interviews happen by video call, and everyone YC interviews gets detailed feedback on the decision.',
        'If you are accepted, YC expects the founders to work full time on the company during the batch and after.',
      ],
      flow: [
        'Apply online',
        'Invited to interview',
        'Short video interview',
        'Decision, usually same day',
        'Feedback either way',
      ],
      bullets: [
        'Apply at apply.ycombinator.com. Earlier is better, and on-time applications get a fixed decision date.',
        'Being "too early" is not a reason to wait: 40% of each batch is just an idea.',
        'A rejection is not final. About half of a typical batch applied more than once.',
      ],
    },
    {
      heading: 'What do YC readers look at first?',
      body: [
        'Paul Graham’s guide "How to Apply to Y Combinator", still hosted on YC’s site, says a reader looks at your answer to "What is your company going to make?" first, for about 20 seconds, then at the founders, then decides whether to read the rest closely.',
        'His advice: "Whatever you have to say, give it to us right in the first sentence, in the simplest possible terms." The best answers are "the most matter of fact". If your product is a variant of something familiar, say so. He warns that marketing language and vague claims "carry no weight".',
        'He ends the guide with this: "You don’t have to sell us on you. We’ll sell ourselves, if we can just understand you."',
      ],
      example: {
        label: 'One answer, rewritten (illustration)',
        text: 'Vague: "We are reimagining hiring with AI to empower the workforce of tomorrow."\nPlain: "We make a phone bot that screens applicants for warehouse jobs and books interviews straight into the hiring manager’s calendar. 3 warehouses in Pune use it; 410 calls last week."',
      },
      keyIdea: 'If a stranger can’t repeat what you make after one sentence, rewrite the sentence.',
    },
    {
      heading: 'What does YC look for in founders?',
      body: [
        'In the same guide Graham writes, "I care more about the founders than the idea, because most of the startups we fund will change their idea significantly." He calls the question about something impressive each founder has built or achieved "the most important question on the application". Be specific. Pick the hardest thing you did, and don’t list the startup itself.',
        'The application has also asked about the time you most successfully "hacked some (non-computer) system to your advantage". Graham says a good answer makes him "go back and take a second look" at an application that otherwise seemed unpromising.',
        'In "What We Look for in Founders" (October 2010), he lists determination, flexibility, imagination, "naughtiness" (breaking rules that don’t matter) and friendship between cofounders. In "A Student’s Guide to Startups" (2006): "we look for people who build things."',
      ],
      bullets: [
        'For each founder, write one achievement with a number in it.',
        'Show you build things: shipped projects, users, code, hardware, sales.',
        'Show you have worked together before, and how long you have known each other.',
      ],
    },
    {
      heading: 'Why do users and numbers matter so much?',
      body: [
        'In "What I’ve Learned from Users" (2022), Graham says the best advice he knows, per word, for getting into YC is "Explain what you’ve learned from users." It shows whether you pay attention to users and how much they need what you make.',
        'Founders who have published their applications show questions like "How do you know people need what you’re making?", "How will you get users?" and "Why did you pick this idea to work on?" (from Basedash’s Summer 2020 application). Shizune’s collection of published answers to "How far along are you?" runs from Dropbox (S07) to Summer 2021 companies. Dropbox’s answer was three short lines: prototype done in February, beta in people’s hands now, a version it could charge for in 6 to 8 weeks. Answer with numbers and dates, not adjectives.',
        'If you have users, give the weekly growth rate. YC measures growth per week during the batch, and Graham calls 5–7% a week good ("Startup = Growth", 2012). If you have no users yet, say what you learned from the people you interviewed and what you will launch, and when.',
      ],
      example: {
        label: 'A strong "how far along" answer has this shape',
        text: 'Working on it: 4 months, full time for the last 6 weeks.\nUsers: 62 weekly active, up from 30 four weeks ago (about 20% a week).\nRevenue: $1,150 last month from 23 paying users.\nWhat users taught us: they don’t want reports, they want an alert the minute stock runs low, so we cut reports and built alerts.',
      },
    },
    {
      heading: 'What is the 10-minute interview like?',
      body: [
        'YC’s apply page says most interviews are by video call and decisions usually come the same day. YC’s interview guide says interviews are designed so "you don’t need to do much preparation". The FAQ says everyone interviewed gets detailed feedback on why they were or were not selected.',
        'Garry Tan, now YC’s president, made a video on the interview in 2019, when he was a former YC partner running Initialized Capital. "The YC interview is only ten minutes," he says. His three areas: say what you are building, for whom and how it works, in plain language; show why your solution and team are right, with real customer stories and your numbers (revenue, growth, burn, retention); and explain how big it could get, even if it starts small. His example is Airbnb, which began with air beds for conference visitors in San Francisco.',
        'With ten minutes, every long answer costs you a question. Answer the question asked, in a sentence or two, and stop.',
      ],
      bullets: [
        'Practise "What are you making?" until the answer takes under 15 seconds.',
        'Know your numbers without looking: users, growth, revenue, burn, retention.',
        'Let the founder who knows the answer best take each question.',
        'Don’t recite a script. YC wants to understand you, not hear a pitch.',
      ],
    },
    {
      heading: 'What mistakes sink applications?',
      body: [
        'From Graham’s guide: marketing language, vague claims about effort or design, listing the startup as your most impressive achievement, and too many words. He also says YC is much more likely to interview people who submit the founder video, so don’t skip it. Hiding obvious weaknesses doesn’t work either; he asks founders to face them openly.',
        'From Michael Seibel’s "The Biggest Mistakes First-Time Founders Make" (YC, 2019): not launching, not using analytics, and not knowing where your first users will come from. In an application, those show up as no product, no numbers and a vague "how will you get users?" answer.',
      ],
      keyIdea: 'Plain words, specific numbers, real users. That is most of a good application.',
    },
  ],
  keyTerms: [
    {
      term: 'On-time application',
      meaning:
        'An application sent before the batch deadline. It gets a fixed decision date; late applications are read when YC has time.',
    },
    {
      term: 'Founder video',
      meaning:
        'A short video of the founders that YC asks for with the application. Graham says applicants who submit one are much more likely to be interviewed.',
    },
    {
      term: 'YC interview',
      meaning:
        'A short video call, about 10 minutes, with YC partners. Decisions usually come the same day.',
    },
    {
      term: 'Traction',
      meaning:
        'Evidence that people want what you make: active users, revenue and how fast they grow each week.',
    },
    {
      term: 'Early Decision',
      meaning:
        'Applying now for a later batch. YC’s FAQ says students use it to apply for the batch that starts after they graduate.',
    },
  ],
  videos: [
    {
      youtubeId: 'B5tU2447OK8',
      title: 'How to Apply And Succeed at Y Combinator | Startup School',
      channel: 'Y Combinator',
      minutes: 25,
      why: 'Group partner Dalton Caldwell on how partners read applications and run interviews. Focus on what he says about clarity and the founder video.',
    },
    {
      youtubeId: 'rfTgzA6iKZc',
      title: '3 Tips to Nail the Y Combinator Interview',
      channel: 'Garry Tan',
      minutes: 10, // estimated length
      why: 'YC’s president on the three things the 10-minute interview tests. Watch, then answer his three questions out loud for your own startup.',
    },
  ],
  tryIt: {
    title: 'Draft your YC application answers in 45 minutes',
    steps: [
      'Write "Describe what your company does in 50 characters or less." Read it to a friend. If they can’t repeat it, rewrite it.',
      'Write "What is your company going to make?" in three plain sentences: what it is, who uses it, how it works.',
      'For each founder, write one impressive thing they built or achieved, with a number in it. Don’t use the startup.',
      'Write "How do you know people need what you’re making?" using only things users said or did. Name at least three users.',
      'Write your numbers: how long you have worked on it, users, revenue, weekly growth. If you have none, write when you will launch and to whom.',
      'Ask a friend to give you a 10-minute mock interview from your draft. Count how many questions you got through.',
    ],
    link: {
      label: 'See YC’s current batch dates and apply',
      url: 'https://www.ycombinator.com/apply',
    },
  },
  check: [
    {
      q: 'Your first sentence says: "We use AI to transform the future of learning." What would Graham’s guide tell you?',
      options: [
        'Good, it sounds ambitious',
        'Replace it with a matter-of-fact sentence saying exactly what you make and for whom',
        'Add more detail about your vision',
        'Move it to the end of the answer',
      ],
      answer: 1,
      why: 'Graham says to give it "right in the first sentence, in the simplest possible terms" and that marketing language carries no weight.',
    },
    {
      q: 'You have a working product but no users yet, and the deadline is in three days. What is the better move?',
      options: [
        'Wait for next batch until you have traction',
        'Apply now, say clearly when and to whom you will launch, and what you learned from the people you interviewed',
        'Inflate your waitlist numbers',
        'Skip the founder video to save time',
      ],
      answer: 1,
      why: 'YC says to apply once you have a team and an idea, and 40% of each batch is just an idea. Inflating numbers is dishonest, and Graham says skipping the video lowers your chance of an interview.',
    },
    {
      q: 'In the interview a partner asks, "How many users do you have?" Which answer fits a 10-minute interview best?',
      options: [
        'A two-minute story of how you got the idea',
        '"About a lot, and growing fast"',
        '"62 weekly active, up from 30 a month ago. Most come from one WhatsApp group of shop owners."',
        '"We are pre-launch but our vision is huge"',
      ],
      answer: 2,
      why: 'Garry Tan stresses knowing your numbers and the interview is short. A number, its trend and where users come from answers the question and leaves time for more.',
    },
  ],
  fromTheSource: [
    {
      who: 'Paul Graham',
      role: 'YC cofounder who read thousands of YC applications and wrote YC’s guide to applying.',
      work: 'How to Apply to Y Combinator (guide on ycombinator.com, undated)',
      url: 'https://www.ycombinator.com/howtoapply',
      idea: 'The application is not a sales pitch. Readers spend about 20 seconds on your idea, then judge the founders, so the winning style is plain, specific and short.',
      breakdown: [
        'First sentence: what you make, in the simplest terms. Comparisons to familiar products are fine.',
        'Founders matter more than the idea, because most funded startups change their idea a lot.',
        'Specific beats impressive-sounding. A hard, concrete achievement beats a résumé line.',
        'YC judges ideas less by type than by your level of insight about them, and disclosing the flaws in your idea is better than hiding them.',
      ],
      use: 'Print your draft and cross out every word that doesn’t add a fact. Then check that the first sentence of each answer could stand alone.',
    },
    {
      who: 'Garry Tan',
      role: 'Now president and CEO of Y Combinator. When he made this video in 2019 he was a former YC partner running Initialized Capital.',
      work: '3 Tips to Nail the Y Combinator Interview (video, 2019)',
      url: 'https://www.youtube.com/watch?v=rfTgzA6iKZc',
      idea: 'Tan says "The YC interview is only ten minutes", so it rewards founders who explain the problem plainly, back their solution with numbers and customer stories, and can say how big it might get.',
      breakdown: [
        'Problem: say what you are building and for whom right away, without buzzwords.',
        'Solution: show evidence, such as customer stories, usage and key numbers like growth, burn and retention.',
        'Market: explain how big it could become. Starting small is fine; Airbnb started with air beds for conference visitors.',
      ],
      use: 'Record yourself answering three questions: what do you make, how do you know people want it, how big can it get. Keep each answer under 30 seconds.',
    },
  ],
  sources: [
    { label: 'Y Combinator: Apply (Winter 2027 dates)', url: 'https://www.ycombinator.com/apply' },
    { label: 'Y Combinator: FAQ', url: 'https://www.ycombinator.com/faq' },
    { label: 'Y Combinator: YC Interview Guide', url: 'https://www.ycombinator.com/interviews' },
    {
      label: 'Paul Graham, How to Apply to Y Combinator',
      url: 'https://www.ycombinator.com/howtoapply',
    },
    {
      label: 'Paul Graham, What We Look for in Founders (2010)',
      url: 'https://paulgraham.com/founders.html',
    },
    {
      label: 'Paul Graham, A Student’s Guide to Startups (2006)',
      url: 'https://paulgraham.com/mit.html',
    },
    {
      label: 'Paul Graham, What I’ve Learned from Users (2022)',
      url: 'https://paulgraham.com/users.html',
    },
    { label: 'Paul Graham, Startup = Growth (2012)', url: 'https://paulgraham.com/growth.html' },
    {
      label: 'Michael Seibel, The Biggest Mistakes First-Time Founders Make (YC, 2019)',
      url: 'https://www.ycombinator.com/blog/the-biggest-mistakes-first-time-founders-make/',
    },
    {
      label: 'Shizune: published answers to "How far along are you?" (Dropbox S07 and others)',
      url: 'https://shizune.co/yc-application-examples/how-far-along-are-you',
    },
    {
      label: 'Max Musing (Basedash, YC S20), How to write a successful YC application (2023)',
      url: 'https://www.basedash.com/blog/how-to-write-a-successful-yc-application',
    },
    {
      label: 'Garry Tan, 3 Tips to Nail the Y Combinator Interview (YouTube)',
      url: 'https://www.youtube.com/watch?v=rfTgzA6iKZc',
    },
    {
      label: 'Y Combinator, How to Apply And Succeed at Y Combinator (YouTube)',
      url: 'https://www.youtube.com/watch?v=B5tU2447OK8',
    },
  ],
  faqs: [
    {
      q: 'How hard is it to get into Y Combinator?',
      a: 'Hard, but YC does not publish an acceptance rate on its apply or FAQ pages, so we don’t quote one. What YC does publish: about 40% of each batch is just an idea, and about half of a typical batch applied more than once before getting in.',
    },
    {
      q: 'How long is the Y Combinator interview?',
      a: 'About 10 minutes, by video call. Garry Tan, now YC’s president, says "The YC interview is only ten minutes." Decisions usually come the same day, and YC gives everyone it interviews detailed feedback.',
    },
    {
      q: 'Can you get into YC with just an idea?',
      a: 'Yes. YC’s FAQ says on average 40% of the companies it funds in each batch are just an idea. You still need a founding team you can describe well and a clear explanation of what you will build and why people need it.',
    },
  ],
  related: [
    { label: 'What makes a great founder', href: '/paul-graham/what-makes-a-great-founder' },
    { label: 'What happens inside a YC batch', href: '/paul-graham/what-happens-at-yc' },
    { label: 'Next: What the first YC founders did', href: '/paul-graham/yc-founder-stories' },
    { label: 'Launch early and talk to users', href: '/paul-graham/launch-and-talk-to-users' },
    { label: 'Practise answering out loud', href: '/free-mock-interview' },
    { label: 'Founder’s office roles', href: '/founders-office' },
  ],
}
