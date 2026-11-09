import type { BatchWeek } from '../types'

export const week: BatchWeek = {
  week: 2,
  slug: 'week-2',
  phase: 1,
  title: 'Talk to users',
  metaTitle: 'YC Week 2: How to Talk to Users (10 Conversations)',
  metaDescription:
    'Week 2 of the YC batch, run yourself: the five user interview questions YC partner Eric Migicovsky teaches, mistakes to avoid and a 10-conversation challenge.',
  h1: 'Week 2: talk to users, the way YC partners teach it',
  tldr: 'YC’s shortest advice is to write code and talk to users. Some founders report spending their first weeks of the batch in customer conversations, using YC’s alumni network for introductions. This week you hold 10 real conversations with people who have the problem, using the questions YC partners teach, and turn your notes into one ranked list of problems.',
  minutes: 62,
  atYc: {
    body: [
      'YC’s 2017 pocket guide, written up by Geoff Ralston, says "The most important tasks for an early stage company are to write code and talk to users." Founders report hearing the same thing in person. Snappr’s crowdsourced write-up of the Winter 2017 batch says partners told founders to focus on three things during the batch: "talk to customers, build their product, and keep healthy".',
      'Some founders make talking to users their first goal. John Lafleur, cofounder of Dataline (later Airbyte), wrote that his team’s goal for the first four weeks was 50 customer meetings, to pin down the problem, the solution, the target user and the pricing model. Using the YC alumni network for introductions, they held 45 in January alone. His conclusion was that meeting potential customers is the best use of a founder’s time, full stop.',
      'Founders also describe learning how to talk, not just how often. Eric Landau of Encord (YC W21) wrote that in his first month he talked too much in calls and demos, and that the advice from his group partners in office hours was worth more than batch-wide events. Carina Boo of Warmly (S20, a remote batch) wrote that in week 2 her team was focused on growth: getting more users, talking to users and improving the new-user experience.',
      'YC does not say how many conversations it expects in week 2, and founders’ counts vary. The 10 in this week’s challenge is our number, chosen so one person can do it in a week. YC group partner Gustaf Alströmer’s talk treats five or ten interviews as a first round, after which you sort your notes.',
    ],
    confidence: 'reported',
    sources: [
      {
        label: 'Geoff Ralston, YC’s Essential Startup Advice (YC blog, 2017)',
        url: 'https://www.ycombinator.com/blog/ycs-essential-startup-advice/',
      },
      {
        label: 'Snappr, Inside Y Combinator W17: A Crowdsourced Snapshot (2017)',
        url: 'https://www.snappr.com/blog/what-the-y-combinator-experience-actually-looks-like',
      },
      {
        label: 'John Lafleur (Dataline), How We Pivoted 3 Times in the 1st Month of YC (2020)',
        url: 'https://hackernoon.com/how-we-pivoted-3-times-in-the-1st-month-of-yc-u29s3ytl',
      },
      {
        label: 'Eric Landau (Encord, YC W21), Learnings from the first month of Y Combinator',
        url: 'https://encord.com/blog/learnings-first-month-y-combinator',
      },
      {
        label: 'Carina Boo (Warmly, YC S20), Week 2 in Y Combinator (2020)',
        url: 'https://warmly.ai/blog/left-google-to-start-a-startup-what-its-like-in-y-combinator',
      },
    ],
  },
  challenge: {
    name: 'The 10 conversations challenge',
    task: 'Hold 10 conversations of at least 15 minutes with people who have the problem you want to solve, using only questions about their life, not your idea. Then rank the problems you heard.',
    proof:
      'A notes sheet with 10 rows (who, role, date, the hardest part in their words, what they use today) and a ranked list of the top three problems.',
    basis:
      'Eric Migicovsky’s "How to Talk to Users" and Gustaf Alströmer’s "How To Talk To Users" (both YC Startup School), and YC’s advice to write code and talk to users (Geoff Ralston, 2017).',
  },
  frameworks: [
    {
      name: 'The five questions, and the three mistakes',
      who: 'Eric Migicovsky, YC partner and Pebble founder (Startup School 2019)',
      source: {
        label: 'Eric Migicovsky - How to Talk to Users (Y Combinator)',
        url: 'https://www.youtube.com/watch?v=MT4Ig2uqjTc',
      },
      explain: [
        'Migicovsky’s talk is built on The Mom Test, the book by Rob Fitzpatrick. The idea: people are polite. If you describe your idea, most will say it sounds great, and that tells you nothing. If you ask about their life and what already happened, they can’t flatter you.',
        'So the interview is not a sales call, and he says not to pitch in it. You are there to learn how bad the problem is, how often it happens and what people already do about it. Compliments and guesses about future features are bad data; throw them out.',
        'He also says you don’t need a hundred interviews to start: begin with one, three or five. Bring a cofounder to take notes, ask permission to record, and keep a first call to 10 or 15 minutes if that is all they can give.',
        'One honest note. In a 2025 note on his blog, Migicovsky says he barely ever used this framework himself on Pebble and Beeper, because he built products he wanted to use. If you are your own user, you still need this week: it checks whether anyone else has the problem as badly as you do.',
      ],
      steps: [
        'Find people who have the problem. Start with yourself, then friends and co-workers, then warm introductions. Go where they are: Migicovsky cites a YC company that got meetings by walking into fire stations, and Pebble meeting users at CES.',
        'Question 1 (wording lightly edited from the talk): What is the hardest part about [doing this thing]?',
        'Question 2: Tell me about the last time you encountered this problem. Get the story, with details.',
        'Question 3: Why was this hard?',
        'Question 4: What, if anything, have you done to try to solve this problem?',
        'Question 5: What don’t you love about the solutions you’ve already tried?',
        'Avoid the three mistakes: talking about your idea instead of their life, asking hypotheticals instead of specifics, and talking more than listening.',
        'Write notes the same day and share them with your cofounder.',
      ],
      example: {
        label: 'Illustrative: one conversation, written up',
        text: 'Who: home tuition teacher, Pune, 3 batches, 45 students. 18 minutes on a call.\n\nHardest part: "chasing fees without sounding rude to parents."\nLast time: last Tuesday, sent 12 WhatsApp messages one by one; 4 parents replied.\nWhy hard: she teaches 5–9 pm and has no time to follow up; some parents pay in cash, some by UPI, and she loses track.\nTried: a notebook, then a Google Sheet her nephew made. Stopped using the sheet after a month.\nDon’t love: the sheet doesn’t know who paid by UPI; she has to check her bank app.\n\nBad data to ignore: "An app for this would be great."',
      },
    },
    {
      name: 'From notes to a decision',
      who: 'Gustaf Alströmer, YC group partner (Startup School, December 2022)',
      source: {
        label: 'How To Talk To Users | Startup School (Y Combinator)',
        url: 'https://www.youtube.com/watch?v=z1iF1c8w5Lg',
      },
      explain: [
        'Alströmer, who worked at Airbnb before joining YC, says a five-minute video call can teach you more than thousands of survey answers. Expect a first round of five or ten interviews, and don’t be afraid of rejection when you ask strangers.',
        'He adds questions to Migicovsky’s: how often does this happen, and why does it matter to you? And he lists questions to avoid: anything yes or no, such as asking whether they will use your product, and asking users which features to build. Users describe problems; designing solutions is your job.',
        'His Airbnb example shows why. Guests asked for hosts’ phone numbers. The real problem was that they didn’t yet trust the platform. If the team had built a phone-number feature, they would have missed it.',
        'After the calls, he groups notes by problem, picks the most important one and checks it is worth solving: are people already paying for a solution, is a free tool like Excel the real competitor, and how easy is it to sell to these people?',
      ],
      steps: [
        'Find interviewees in your network, former co-workers, LinkedIn, Reddit, Slack or Discord groups and in-person events.',
        'Hold back your idea until the end of the call, or don’t mention it at all. Listen more than you talk, and keep asking them to tell you more.',
        'Put each problem you heard on its own sticky note or row.',
        'Group the notes into problem buckets. Our addition: count how many people raised each problem, and mark how painful it sounded.',
        'For the top problem, check whether people already pay for a solution, whether a free tool like Excel already satisfies them, and how easy they are to sell to.',
        'Form one hypothesis about a solution, and keep the people you spoke to in a WhatsApp or Slack group so you can show them what you build next week.',
      ],
      example: {
        label: 'Illustrative: the ranked list after 10 calls',
        text: '1. Tracking who has paid (cash and UPI mixed) - 8 of 10, high pain, today: notebook or sheet, nobody pays for a tool\n2. Sending fee reminders without awkwardness - 7 of 10, high pain, today: one-by-one WhatsApp\n3. Rescheduling classes - 4 of 10, medium pain, today: WhatsApp group\n\nHypothesis: a weekly "who hasn’t paid" list with one-tap polite reminders.\nRisk to check: will teachers pay, when today’s answer is free?',
      },
    },
  ],
  videos: [
    {
      youtubeId: 'MT4Ig2uqjTc',
      title: 'Eric Migicovsky - How to Talk to Users',
      channel: 'Y Combinator',
      minutes: 32,
      why: 'The five questions and three mistakes, from the YC partner who founded Pebble. Write the questions on a card before your first call.',
    },
    {
      youtubeId: 'z1iF1c8w5Lg',
      title: 'How To Talk To Users | Startup School',
      channel: 'Y Combinator',
      minutes: 18,
      why: 'Gustaf Alströmer on finding interviewees, questions to avoid and what to do with your notes. Watch the Airbnb example closely.',
    },
  ],
  assignments: [
    {
      id: 'w2-list',
      text: 'List 30 people who have the problem, with how you will reach each one.',
      why: 'Many will say no or not reply. Alströmer says not to fear rejection; a long list makes 10 calls possible.',
      done: '30 names or handles, each with a channel (intro, DM, email, in person).',
    },
    {
      id: 'w2-card',
      text: 'Write the five questions and three mistakes on one card you keep open during calls.',
      why: 'Migicovsky’s questions only work if you don’t drift into pitching.',
      done: 'Card written and used on your first call.',
    },
    {
      id: 'w2-calls',
      text: 'Hold 10 conversations of 15 minutes or more.',
      why: 'Alströmer treats five or ten interviews as a first round before you sort your notes.',
      done: '10 conversations held with people outside your friends and family.',
    },
    {
      id: 'w2-notes',
      text: 'Write up each call the same day in one shared sheet.',
      why: 'Migicovsky says to take detailed notes and share them with your cofounder.',
      done: '10 rows: who, date, hardest part in their words, last time it happened, what they use today.',
    },
    {
      id: 'w2-rank',
      text: 'Group the notes by problem and rank the top three.',
      why: 'Alströmer’s last step: find the most important problem and check it is worth solving.',
      done: 'A ranked list with counts, pain level and what people use or pay for today.',
    },
    {
      id: 'w2-update',
      text: 'Send weekly update #2.',
      why: 'Keep the weekly rhythm from week 1.',
      done: 'Update sent with conversations held and the top problem in one line.',
    },
  ],
  officeHours: [
    {
      q: 'How many users did you talk to this week, and who were they?',
      why: 'YC’s Startup School update form asks for this number every week (reported by founder Artem Bugara, 2020).',
    },
    {
      q: 'Tell me about the last time one of them hit this problem.',
      why: 'Migicovsky’s second question: specifics that already happened, not hypotheticals.',
    },
    {
      q: 'What do they use today, and do they pay for it?',
      why: 'Alströmer checks whether a problem is worth solving by what people already pay for, and whether Excel is the real competitor.',
    },
    {
      q: 'Did you pitch your idea during the calls?',
      why: 'Migicovsky’s first mistake. A pitch turns an interview into polite agreement.',
    },
    {
      q: 'What did users ask for, and what problem is behind the request?',
      why: 'Alströmer’s Airbnb example: guests asked for phone numbers because they didn’t trust the platform yet.',
    },
  ],
  weeklyUpdate: {
    metric: 'user conversations this week',
    prompt:
      'Update #2: how many conversations you held and with whom, the top problem in a user’s own words, what they use today, your primary metric versus target, and one ask, such as introductions to people with the problem.',
  },
  checkpoint:
    'Before week 3: 10 conversations written up and one problem ranked first, with what people do about it today. This is the interview method Eric Migicovsky and Gustaf Alströmer teach in YC’s Startup School, and the write-code-and-talk-to-users rule in Geoff Ralston’s YC essential startup advice.',
  faqs: [
    {
      q: 'What questions should I ask in a user interview?',
      a: 'Eric Migicovsky’s five: what is the hardest part about this, when did it last happen, why was it hard, what have you done to solve it, and what don’t you love about those solutions. Avoid pitching, hypotheticals and talking too much. Our lesson /paul-graham/launch-and-talk-to-users covers Gustaf Alströmer’s version too.',
    },
    {
      q: 'How many user interviews do I need?',
      a: 'Gustaf Alströmer’s talk treats five or ten as a first round, and Migicovsky says to just start with one, three or five. One founder, John Lafleur, set 50 meetings in his first four weeks of YC. This week’s challenge is 10.',
    },
    {
      q: 'Who should I talk to if I don’t have users yet?',
      a: 'People who have the problem. Start with yourself, then friends and co-workers who match, then introductions, online communities and in-person places where those people already are.',
    },
  ],
  sources: [
    {
      label: 'Eric Migicovsky - How to Talk to Users (Y Combinator, 2019)',
      url: 'https://www.youtube.com/watch?v=MT4Ig2uqjTc',
    },
    {
      label: 'Transcript: Eric Migicovsky - How to Talk to Users (rosetta.to)',
      url: 'https://rosetta.to/u/ycombinator/eric-migicovsky-how-to-talk-to-users',
    },
    {
      label: 'Eric Migicovsky, Startup School - How to talk to users (blog, note added 2025)',
      url: 'https://ericmigi.com/blog/startup-school-how-to-talk-to-users',
    },
    {
      label: 'Gustaf Alströmer, How To Talk To Users | Startup School (Y Combinator, 2022)',
      url: 'https://www.youtube.com/watch?v=z1iF1c8w5Lg',
    },
    {
      label: 'Transcript: How To Talk To Users | Startup School (rosetta.to)',
      url: 'https://rosetta.to/u/ycombinator/how-to-talk-to-users-startup-school',
    },
    {
      label: 'Geoff Ralston, YC’s Essential Startup Advice (YC blog, 2017)',
      url: 'https://www.ycombinator.com/blog/ycs-essential-startup-advice/',
    },
    {
      label: 'Snappr, Inside Y Combinator W17: A Crowdsourced Snapshot (2017)',
      url: 'https://www.snappr.com/blog/what-the-y-combinator-experience-actually-looks-like',
    },
    {
      label: 'John Lafleur (Dataline), How We Pivoted 3 Times in the 1st Month of YC (2020)',
      url: 'https://hackernoon.com/how-we-pivoted-3-times-in-the-1st-month-of-yc-u29s3ytl',
    },
    {
      label: 'Eric Landau (Encord, YC W21), Learnings from the first month of Y Combinator',
      url: 'https://encord.com/blog/learnings-first-month-y-combinator',
    },
    {
      label: 'Carina Boo (Warmly, YC S20), Week 2 in Y Combinator (2020)',
      url: 'https://warmly.ai/blog/left-google-to-start-a-startup-what-its-like-in-y-combinator',
    },
    {
      label: 'Artem Bugara, One simple yet crucial thing I learned from YC’s Startup School (2020)',
      url: 'https://codarium.substack.com/p/one-simple-yet-crucial-thing-i-learned',
    },
  ],
}
