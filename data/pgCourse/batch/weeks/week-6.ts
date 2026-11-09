// Week 6: measure retention and product-market fit. Sources opened Nov 9, 2026; see `sources`.
import type { BatchWeek } from '../types'

export const week: BatchWeek = {
  week: 6,
  slug: 'week-6',
  phase: 2,
  title: 'Retention and product-market fit',
  metaTitle: 'YC Batch Week 6: Retention and Product-Market Fit',
  metaDescription:
    'Week 6 of a YC batch, run yourself: build a cohort retention chart the way YC partner David Lieb teaches and find the users who would be very disappointed.',
  h1: 'Week 6: measure retention and find who would miss you',
  tldr: 'Around the middle of the batch, the question shifts from “did people sign up?” to “do they come back?”. This week you build a weekly cohort retention chart the way YC group partner David Lieb teaches it, and survey users to find the ones who would be very disappointed without your product.',
  minutes: 45,
  atYc: {
    body: [
      'YC’s pocket guide of advice (Geoff Ralston, 2017) tells founders to choose one or two key metrics very early, and says growth makes little sense before product-market fit; the usual result is poor retention. In a 2024 Startup School talk, YC group partner David Lieb presents cohort retention as a numbers-based test of whether you have made something people want.',
      'YC partner Michael Seibel wrote in 2016 that he often talks to founders who believe they have product-market fit when they don’t, and that “you have reached product/market fit when you are overwhelmed with usage”. On the YC podcast in 2018 he said: “You can’t pretend your way out of product/market fit.”',
      'Katia Damer of Prolific (S19) cites YC partner Dalton Caldwell’s tweet about “the uncanny valley of product-market fit”: some traction mistaken for the real thing. In the same write-up, Prolific reports its retention (55% of researchers active in the first quarter of 2019 were still active in the second) and its “very disappointed” survey: 71% of 210 respondents, which she describes as the data point that confirmed fit.',
      'YC does not publish a session on metrics in a particular week. The pattern in YC’s talks and founders’ accounts is that, once users arrive, partners ask whether they stay.',
    ],
    confidence: 'documented',
    sources: [
      {
        label: 'Y Combinator blog: YC’s Essential Startup Advice (Geoff Ralston, 2017)',
        url: 'https://www.ycombinator.com/blog/ycs-essential-startup-advice/',
      },
      {
        label: 'David Lieb, How To Keep Your Users | Startup School (YC, 2024)',
        url: 'https://www.youtube.com/watch?v=VNxBZ7ka5J0',
      },
      {
        label: 'Michael Seibel, The Real Product Market Fit (YC blog, 2016)',
        url: 'https://www.ycombinator.com/blog/the-real-product-market-fit/',
      },
      {
        label: 'Michael Seibel on finding product/market fit (YC blog, 2018)',
        url: 'https://www.ycombinator.com/blog/michael-seibel-on-starting-a-startup-finding-product-market-fit-and-fundraising',
      },
      {
        label: 'Katia Damer (Prolific, S19): Reflecting on Y Combinator, 3 lessons',
        url: 'https://www.prolific.com/resources/reflecting-on-ycombinator-3-lessons',
      },
    ],
  },
  challenge: {
    name: 'The retention truth challenge',
    task: 'Build a weekly cohort retention table from your real usage data, and send the “very disappointed” survey to everyone who has used the core of your product. By Sunday, name the group of users who would be very disappointed and what they have in common.',
    proof:
      'A cohort table (one row per signup week, one column per week since signup, in percentages, with each cohort’s size) and survey results: the number of responses and the share who answered “very disappointed”. Aim for 20 or more responses (our minimum; Vohra says results become directionally correct at around 40); if you have fewer users, interview every one of them instead.',
    basis:
      'David Lieb’s YC Startup School talk “How To Keep Your Users” (2024) on cohort retention, and the “very disappointed” survey Prolific (YC S19) ran, which Katia Damer credits to Superhuman’s Rahul Vohra (the question is Sean Ellis’s).',
  },
  frameworks: [
    {
      name: 'The cohort retention curve',
      who: 'David Lieb, YC group partner, Bump cofounder, and on Google Photos for nearly a decade (Startup School, 2024)',
      source: {
        label: 'How To Keep Your Users | Startup School',
        url: 'https://www.youtube.com/watch?v=VNxBZ7ka5J0',
      },
      explain: [
        'A cohort is everyone who first used your product in the same week. Lieb’s method follows each cohort over time and asks one question: what share of them are still doing the core thing in week 1, week 2, week 3 after they started? He presents this as a numbers-based test of whether you made something people want.',
        'The shape matters more than the height. If the curves flatten, a core group stays, so every new cohort adds to your base and growth compounds. If they keep falling, you have to replace users forever. Curves that flatten and then rise are the best case: people use the product more over time.',
        'His own examples: at Google Photos, weekly curves dropped quickly, then flattened at roughly 20–40% depending on country and device. At Bump, his earlier startup, the team widened the window from weekly to monthly to quarterly so the numbers looked better, which hid the problem instead of fixing it.',
        'He lists ways to fool yourself: a period longer than real use, an action that is too easy (opening the app, clicking a notification), using payment as the action, reading one good week instead of the whole curve, and trusting an analytics tool’s “retention” before you know how it is calculated. Build the first table by hand.',
      ],
      steps: [
        'Pick the action that means real value, not an app open. Lieb’s examples: Uber, a completed ride; Google Photos, opening a photo full screen. His test: watch a user and ask what tells you they are using it the way you intended.',
        'Pick the period that matches how often the product should be used: daily for social apps, weekly for tools like Uber or Google Photos, longer for rare needs such as travel.',
        'Group users by the week they first did the action. Each week is a cohort.',
        'For each cohort, count how many did the action again in week 1, week 2 and so on. Count each person once per week, however often they did it.',
        'Divide by the cohort’s starting size to get percentages, then draw one line per cohort.',
        'Read the shape: flattening, or still falling? Then split cohorts by channel, city, device or customer type to find the group that stays.',
        'If curves don’t flatten, talk to people who left and people who stayed. Lieb’s ways to improve: a better product, better-fit users, better onboarding, and network effects where they apply.',
      ],
      example: {
        label: 'Illustrative: weekly cohorts for a small product (made-up data)',
        text: 'Share of each cohort doing the core action\nSignup week   Size   Wk1   Wk2   Wk3   Wk4\nWeek 2          12   58%   42%   33%   33%\nWeek 3          18   50%   39%   33%\nWeek 4          25   52%   40%\nWeek 5          20   55%\n\nReading: the two oldest cohorts hold near 33%, so the curves may be flattening.\nWith cohorts this small, one person moves a number by 4–8 points. Treat it as a hint and confirm it with interviews.',
      },
    },
    {
      name: 'The “very disappointed” test',
      who: 'Sean Ellis’s survey question, popularised by Rahul Vohra of Superhuman (2018); used by Prolific (YC S19)',
      source: {
        label: 'Rahul Vohra, How Superhuman built an engine to find product-market fit',
        url: 'https://blog.superhuman.com/how-superhuman-built-an-engine-to-find-product-market-fit/',
      },
      explain: [
        'You ask users one question: how would you feel if you could no longer use the product? Very disappointed, somewhat disappointed, or not disappointed. Sean Ellis compared nearly 100 startups and found that those where fewer than 40% answered “very disappointed” generally struggled to grow.',
        'This is not a YC framework. YC partners mostly judge fit by usage and retention, as above. It is here because YC founders use it, and because it answers a question the cohort chart can’t: who exactly your product is for. Prolific (S19) reported 71% from 210 responses.',
        'The value is in sorting the answers. Superhuman started at 22%. Looking only at the kinds of people who were very disappointed, the score was 33%. After building for them for about three quarters, it reached 58%. The very disappointed users tell you who to recruit next and what to build.',
      ],
      steps: [
        'Send four questions, as Vohra did: 1) How would you feel if you could no longer use [product]? 2) What type of people do you think would most benefit from [product]? 3) What is the main benefit you receive from [product]? 4) How can we improve [product] for you?',
        'Send it only to people who have used the core of the product recently, not to everyone who signed up. Superhuman’s filter was at least twice in the last two weeks.',
        'Count the share who said “very disappointed”. Treat 40% as Ellis’s benchmark, not a rule. Vohra says results become directionally correct at around 40 responses; below that, the number is rough.',
        'Read the very disappointed group’s answers to questions 2 and 3: who they are, and the benefit they name in their own words.',
        'Check them against your cohort table: do they sit in the cohorts or the slice that flattens?',
        'Write one sentence, “Our product is for ___ who need ___”, and use it to choose who you recruit next week.',
      ],
      example: {
        label: 'Illustrative: reading 24 survey answers (made-up data)',
        text: '24 responses: 9 very disappointed (38%), 10 somewhat, 5 not\nOf the 9: 7 are clinics with two or more physiotherapists\nMain benefit they name: “no more WhatsApp back-and-forth for bookings”\nThe 10 somewhat: mostly solo practitioners\n\nSentence: “For physio clinics with 2+ therapists who lose hours to booking messages.”\nNext week: recruit only multi-therapist clinics, and build the reminder 4 of them asked for.',
      },
    },
  ],
  videos: [
    {
      youtubeId: 'VNxBZ7ka5J0',
      title: 'How To Keep Your Users | Startup School',
      channel: 'Y Combinator',
      minutes: 29,
      why: 'Lieb builds the cohort chart step by step. Watch his sections on choosing the action and on ways to fool yourself before you build yours.',
    },
  ],
  assignments: [
    {
      id: 'w6-action',
      text: 'Write down your core action and your period (daily, weekly or monthly).',
      why: 'Lieb: the action and the period decide whether your chart tells the truth. An app open is too easy.',
      done: 'One sentence: “Active means a user did ___ at least once in a ___.”',
    },
    {
      id: 'w6-table',
      text: 'Build the cohort table by hand from your data, in percentages, with each cohort’s size.',
      why: 'Lieb advises building the curves yourself before trusting what an analytics tool calls retention.',
      done: 'A table covering every signup week since launch, plus a chart with one line per cohort.',
    },
    {
      id: 'w6-survey',
      text: 'Send the four-question survey to everyone who has used the core product.',
      why: 'It tells you who your product is for, which the cohort chart can’t.',
      done: '20 or more responses, or every user interviewed if you have fewer than 20.',
    },
    {
      id: 'w6-leavers',
      text: 'Talk to 5 people who stopped using the product.',
      why: 'Lieb’s advice when curves keep falling: the data shows whether, conversations show why.',
      done: '5 conversations, each with the reason they left in their own words.',
    },
    {
      id: 'w6-who',
      text: 'Write the sentence “Our product is for ___ who need ___” from the very disappointed group.',
      why: 'Seibel: founders hold too tightly to solutions and too loosely to problems. This sentence names the problem and the people.',
      done: 'One sentence, shared with your cofounder, that decides who you recruit next week.',
    },
  ],
  officeHours: [
    {
      q: 'What does “active” mean for your product, and why that action?',
      why: 'Lieb lists an action that is too easy, such as opening the app, as one of the main ways founders fool themselves.',
    },
    {
      q: 'Show me retention by cohort. Are the curves flattening?',
      why: 'Lieb: flattening is what matters most. It means a core group stays and growth can compound.',
    },
    {
      q: 'Are you overwhelmed with usage, or are you still pushing every user in?',
      why: 'Seibel’s test in “The Real Product Market Fit” (2016): fit is when usage overwhelms you.',
    },
    {
      q: 'Is this product-market fit, or a little traction?',
      why: 'Katia Damer (Prolific, S19) cites Dalton Caldwell’s warning about “the uncanny valley of product-market fit”.',
    },
    {
      q: 'Who would be very disappointed if you shut down tomorrow?',
      why: 'The Sean Ellis question, popularised by Superhuman, that Prolific (S19) used to confirm its fit. If you can’t name them, you don’t yet know who the product is for.',
    },
  ],
  weeklyUpdate: {
    metric: 'oldest-cohort retention',
    prompt:
      'Week 6: your core action, the retention of your oldest cohorts, whether the curves are flattening, your very disappointed share with the number of responses, who those users are, and your one number against target.',
  },
  checkpoint:
    'A weekly cohort table with a named core action, a “very disappointed” share with the number of responses, and one sentence on who those users are. Lieb treats flattening cohort curves as the test of something people want; if yours still fall, YC’s pocket guide (2017) says to work on the product before chasing growth.',
  faqs: [
    {
      q: 'What retention is good for an early startup?',
      a: 'Lieb gives no single number and says the shape matters most: do the curves flatten? His Google Photos curves flattened at roughly 20–40%, depending on country and device. Compare each new cohort with your earlier ones rather than with a benchmark from a different kind of product.',
    },
    {
      q: 'Is 40% “very disappointed” a YC rule?',
      a: 'No. It is Sean Ellis’s benchmark from comparing nearly 100 startups, made popular by Superhuman’s Rahul Vohra. YC partners mostly judge fit by usage and retention. Founders such as Prolific (S19) have used the survey alongside their retention numbers.',
    },
    {
      q: 'How long does it take to find product-market fit?',
      a: 'Often longer than a batch. David Rusenko told Startup School that Weebly took about 20 months, and that returning usage was the best early signal, much better than signups. That is why this week is about learning who stays, not declaring victory.',
    },
  ],
  sources: [
    {
      label: 'YouTube: How To Keep Your Users | Startup School (David Lieb)',
      url: 'https://www.youtube.com/watch?v=VNxBZ7ka5J0',
    },
    {
      label: 'Transcript: How To Keep Your Users (Rosetta)',
      url: 'https://rosetta.to/u/ycombinator/how-to-keep-your-users-startup-school?t=0',
    },
    {
      label: 'Michael Seibel, The Real Product Market Fit (YC blog, 2016)',
      url: 'https://www.ycombinator.com/blog/the-real-product-market-fit/',
    },
    {
      label: 'Michael Seibel on finding product/market fit (YC blog, 2018)',
      url: 'https://www.ycombinator.com/blog/michael-seibel-on-starting-a-startup-finding-product-market-fit-and-fundraising',
    },
    {
      label: 'Y Combinator blog: YC’s Essential Startup Advice (Geoff Ralston, 2017)',
      url: 'https://www.ycombinator.com/blog/ycs-essential-startup-advice/',
    },
    {
      label: 'Rahul Vohra, How Superhuman built an engine to find product-market fit (2018)',
      url: 'https://blog.superhuman.com/how-superhuman-built-an-engine-to-find-product-market-fit/',
    },
    {
      label: 'Katia Damer (Prolific, S19): Reflecting on Y Combinator, 3 lessons',
      url: 'https://www.prolific.com/resources/reflecting-on-ycombinator-3-lessons',
    },
    {
      label: 'Transcript: David Rusenko, How To Find Product Market Fit (Rosetta)',
      url: 'https://rosetta.to/u/ycombinator/david-rusenko-how-to-find-product-market-fit',
    },
    {
      label: 'Transcript: Suhail Doshi, How to Measure Your Product (Rosetta)',
      url: 'https://rosetta.to/u/ycombinator/suhail-doshi-how-to-measure-your-product',
    },
    {
      label: 'Our lesson: Make something people want',
      url: '/paul-graham/make-something-people-want',
    },
  ],
}
