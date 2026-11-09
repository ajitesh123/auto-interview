import type { PgLesson } from '../types'

export const lesson: PgLesson = {
  slug: 'how-to-think-clearly',
  track: 'founder',
  order: 0,
  title: 'Think and write clearly',
  metaTitle: 'Paul Graham’s Writing Advice and Habits for Clear Thinking',
  metaDescription:
    'Paul Graham’s habits for clear thinking: write to find ideas, write like you talk, keep your identity small, disagree well, guard maker time and your top idea.',
  h1: 'Think and write clearly: six habits from Paul Graham',
  tldr: 'For Paul Graham, writing is how you find out what you think, not just how you share it: half the ideas in an essay come while writing it. Write the way you would say it to a friend, keep your identity small so you can change your mind, disagree with the central point instead of the tone, and protect long blocks of time and the idea you think about in the shower.',
  minutes: 13,
  level: 'Beginner',
  steps: [
    {
      heading: 'Why is writing a test of your thinking?',
      body: [
        'In "Putting Ideas into Words" (February 2022), PG says writing about something, even something you know well, usually shows you did not know it as well as you thought. "Putting ideas into words is a severe test." He adds that half the ideas in a finished essay come while writing it, and that someone who never writes has no fully formed ideas about anything nontrivial.',
        'In "Writes and Write-Nots" (October 2024) he warns that AI will remove the pressure to write, so many people will stop. Because writing is thinking, that splits people into those who think and those who do not. He quotes Leslie Lamport: "If you’re thinking without writing, you only think you’re thinking."',
      ],
      bullets: [
        'Before your next big decision (a job, a pivot, a hire), write one page on why. Do not let AI draft it.',
        'Reread it as a stranger who only has the page, PG’s test. Fix every gap the stranger would see.',
        'Notice which ideas appeared only while writing. That is the point.',
      ],
      keyIdea: 'If you cannot write it clearly, you have not finished thinking it.',
    },
    {
      heading: 'How do you write like you talk?',
      body: [
        'In "Write Like You Talk" (October 2015), PG’s test for every sentence is: "Is this the way I’d say this if I were talking to a friend?" If not, write what you would say. He reads every essay aloud before publishing and fixes anything that does not sound like conversation. Do this, he says, and you will be ahead of 95% of writers.',
        'His older list "Writing, Briefly" (March 2005) adds the rest of the method: "Write a bad version 1 as fast as you can," then rewrite and cut. If you are stuck, tell someone what you mean and write down what you said. In "Good Writing" (May 2025) he explains why this matters for thinking, not only style: "It’s hard to be right without sounding right."',
      ],
      example: {
        label: 'Before and after the friend test',
        text: 'Before: "Our platform utilises AI to facilitate seamless interview preparation outcomes for candidates."\nSaid to a friend: "It lets you practise interviews with an AI that asks real questions and tells you what you got wrong."',
      },
    },
    {
      heading: 'Why should you keep your identity small?',
      body: [
        'In "Keep Your Identity Small" (February 2009), PG asks why arguments about religion and politics go nowhere. His answer: once a topic is part of someone’s identity, they cannot think clearly about it. So the best plan is to let as few things into your identity as possible. "The more labels you have for yourself, the dumber they make you."',
        'For a founder this is practical. If "I am a mobile-first founder" or "I am an AI founder" becomes who you are, you cannot see when users want something else. PG allows a few identities, like "scientist", that commit you to following evidence rather than to any conclusion.',
      ],
      bullets: [
        'Write down five labels you use for yourself (a tech stack, a city, a school, a politics, a type of founder).',
        'For each, ask: if the evidence went against this, could I change my mind without feeling attacked?',
        'Drop any label that would stop you.',
      ],
    },
    {
      heading: 'How do you disagree in a way that changes minds?',
      body: [
        'In "How to Disagree" (March 2008), PG ranks disagreement from DH0, name-calling, up to DH6, refuting the central point. In between are attacking the person, responding to tone, plain contradiction, counterargument and refutation. "The most convincing form of disagreement is refutation", and the strongest is refuting the main point, not a side detail.',
        'This is the skill you need for cofounder arguments, investor objections and user complaints. Quote the exact thing you disagree with, then show why it is wrong. PG adds that moving up the hierarchy also makes conversations less mean.',
      ],
      flow: [
        'DH0 Name-calling',
        'DH1 Ad hominem',
        'DH2 Tone',
        'DH3 Contradiction',
        'DH4 Counterargument',
        'DH5 Refutation',
        'DH6 Refute the central point',
      ],
      keyIdea: 'Aim every disagreement at DH5 or DH6: quote it, then show where it is wrong.',
    },
    {
      heading: 'Why do makers need a different schedule?',
      body: [
        'In "Maker’s Schedule, Manager’s Schedule" (July 2009), PG says managers work in one-hour slots, while makers (programmers, writers, designers) need half a day or more. One meeting in the middle of an afternoon can break it into pieces too small for hard work. "For someone on the maker’s schedule, having a meeting is like throwing an exception."',
        'His own fix at YC: he held office hours with founders at the end of his working day, so they never cut into his focused time. As a founder you are both, so split your week on purpose.',
      ],
      bullets: [
        'Pick two or three mornings a week with no meetings at all. Guard them like appointments.',
        'Stack all calls in the afternoon, back to back.',
        'If you manage makers, ask before booking a meeting in the middle of their block.',
      ],
    },
    {
      heading: 'What is the top idea in your mind?',
      body: [
        'In "The Top Idea in Your Mind" (July 2010), PG says the idea your mind drifts to when it is free, like in the shower, gets the benefit of all that background thinking. Other ideas starve. Fundraising takes over that spot, which is why startups slow down while raising, and so do disputes: Newton lost years arguing over his theory of colour.',
        'You cannot pick your shower thoughts directly, but you can pick your situations. PG’s advice: "be careful what you let become critical to you." He also tells himself that grudges and injuries do not deserve room in his head.',
      ],
      bullets: [
        'For three days, write down what you think about in the shower or on your commute.',
        'If it is an argument, a grudge or money worry instead of your work, change one situation that feeds it.',
        'Keep fundraising, side disputes and online arguments short, so they do not take over the top spot.',
      ],
    },
  ],
  keyTerms: [
    {
      term: 'Maker’s schedule',
      meaning:
        'Working in blocks of half a day or more, which deep work like coding or writing needs.',
    },
    {
      term: 'Manager’s schedule',
      meaning: 'A day cut into one-hour slots, where switching tasks and meetings is normal.',
    },
    {
      term: 'Disagreement hierarchy',
      meaning:
        'PG’s seven levels of disagreement, from name-calling (DH0) to refuting the central point (DH6).',
    },
    {
      term: 'Keep your identity small',
      meaning:
        'Let as few beliefs as possible become part of who you are, so you can still think clearly about them.',
    },
    {
      term: 'Top idea in your mind',
      meaning:
        'Whatever your thoughts drift to when they are free. It gets your best background thinking.',
    },
    {
      term: 'Write like you talk',
      meaning:
        'Writing each sentence the way you would say it to a friend, then reading it aloud to check.',
    },
  ],
  videos: [
    {
      youtubeId: '2OZ94b3fJvo',
      title: 'The King of Internet Writing | Paul Graham | How I Write Podcast',
      channel: 'David Perell',
      minutes: 70,
      why: 'About 70 minutes with David Perell on Paul Graham’s writing. Watch it after this lesson and compare what you hear with the six habits above.',
    },
  ],
  tryIt: {
    title: 'Write your idea the way you would say it to a friend',
    steps: [
      'Pick your startup idea, your job pitch or a decision you are stuck on.',
      'Write it in five sentences, fast. PG: a bad version 1 as fast as you can.',
      'Read each sentence aloud. Ask PG’s question: is this how I would say it to a friend? Rewrite any that fail.',
      'Cut every word that does not change the meaning. Count the words before and after.',
      'Give it to someone who knows nothing about it. Ask them to explain it back. Every place they get it wrong is a gap in your thinking, not in their reading.',
    ],
    link: {
      label: 'Read PG’s "Write Like You Talk"',
      url: 'https://paulgraham.com/talk.html',
    },
  },
  check: [
    {
      q: 'An investor says your market is too small. Which reply is DH6 in PG’s hierarchy?',
      options: [
        '"You clearly do not understand our space."',
        '"That was a rude way to put it."',
        '"No, it is big."',
        '"Your estimate assumes only metro users. 60% of our sign-ups are from smaller towns, so the real market is several times larger."',
      ],
      answer: 3,
      why: 'DH6 identifies the central point (the market size assumption) and refutes it with evidence. The others are ad hominem, tone and contradiction.',
    },
    {
      q: 'You are a founder who codes. Investors want meetings at 11 am and 3 pm on the same day. What does "Maker’s Schedule, Manager’s Schedule" suggest?',
      options: [
        'Accept both, since meetings are short',
        'Move both to the same block, ideally the end of the day, to protect a long maker block',
        'Cancel all investor meetings forever',
        'Code during the meetings',
      ],
      answer: 1,
      why: 'PG says one meeting can wreck a maker’s half day. His own fix was holding meetings at the end of his working day.',
    },
    {
      q: 'Your team has argued for a week about whether you are a "B2B company". Users keep asking for a consumer version. What does PG’s "Keep Your Identity Small" suggest is going on?',
      options: [
        'The label has become part of your identity, which makes it hard to think clearly about the evidence',
        'You need a better logo',
        'B2B is always the right choice',
        'Users do not know what they want',
      ],
      answer: 0,
      why: 'PG says people cannot think clearly about anything that has become part of their identity. Treat "B2B" as a guess, not who you are.',
    },
  ],
  fromTheSource: [
    {
      who: 'Paul Graham',
      role: 'Essayist and cofounder of Y Combinator, who has published essays on paulgraham.com since 2001.',
      work: 'Putting Ideas into Words (essay, February 2022)',
      url: 'https://paulgraham.com/words.html',
      idea: 'Writing about something usually shows you did not understand it as well as you thought. Putting ideas into words changes and completes them.',
      breakdown: [
        'Your first words are usually wrong; you rewrite until they are exactly right.',
        'Ideas turn out not just imprecise but incomplete. Half the ideas in an essay come while writing it.',
        'Test a draft by reading it as a neutral stranger who knows only the text.',
        'Someone who never writes has no fully formed ideas about anything nontrivial.',
      ],
      use: 'Write a one-page memo before every major decision, then reread it as a stranger. Rewrite until the stranger would agree it is correct and complete.',
    },
    {
      who: 'Paul Graham',
      role: 'Cofounder of Y Combinator, who ran YC office hours around his own writing and programming time.',
      work: 'Maker’s Schedule, Manager’s Schedule (essay, July 2009)',
      url: 'https://paulgraham.com/makersschedule.html',
      idea: 'Makers and managers use time differently. A meeting costs a manager one hour, but it can cost a maker half a day of real work.',
      breakdown: [
        'Managers work in one-hour slots; makers need half a day or more.',
        'A single meeting can break a block into pieces too small for hard work.',
        'Makers may not even start ambitious work on a day they know will be broken up.',
        'PG held founder office hours at the end of his day so they never interrupted his focus.',
      ],
      use: 'Block two or three meeting-free mornings this week and move all calls to late afternoon. Compare what you finish.',
    },
  ],
  sources: [
    {
      label: 'Paul Graham: Putting Ideas into Words (February 2022)',
      url: 'https://paulgraham.com/words.html',
    },
    {
      label: 'Paul Graham: Writes and Write-Nots (October 2024)',
      url: 'https://paulgraham.com/writes.html',
    },
    {
      label: 'Paul Graham: Write Like You Talk (October 2015)',
      url: 'https://paulgraham.com/talk.html',
    },
    {
      label: 'Paul Graham: Writing, Briefly (March 2005)',
      url: 'https://paulgraham.com/writing44.html',
    },
    {
      label: 'Paul Graham: Good Writing (May 2025)',
      url: 'https://paulgraham.com/goodwriting.html',
    },
    {
      label: 'Paul Graham: Keep Your Identity Small (February 2009)',
      url: 'https://paulgraham.com/identity.html',
    },
    {
      label: 'Paul Graham: How to Disagree (March 2008)',
      url: 'https://paulgraham.com/disagree.html',
    },
    {
      label: 'Paul Graham: Maker’s Schedule, Manager’s Schedule (July 2009)',
      url: 'https://paulgraham.com/makersschedule.html',
    },
    {
      label: 'Paul Graham: The Top Idea in Your Mind (July 2010)',
      url: 'https://paulgraham.com/top.html',
    },
    {
      label:
        'How I Write: The King of Internet Writing, Paul Graham with David Perell (March 2024)',
      url: 'https://www.youtube.com/watch?v=2OZ94b3fJvo',
    },
  ],
  faqs: [
    {
      q: 'What is Paul Graham’s writing advice?',
      a: 'Write like you talk: write each sentence the way you would say it to a friend, and read the draft aloud. Write a bad first version fast, then rewrite and cut. He also argues writing is how you find your ideas, not just how you share them.',
    },
    {
      q: 'What is the maker’s schedule vs the manager’s schedule?',
      a: 'From Paul Graham’s 2009 essay: managers work in one-hour slots, while makers like programmers and writers need half-day blocks. A single meeting can ruin a maker’s afternoon, so group meetings together.',
    },
    {
      q: 'What is Paul Graham’s disagreement hierarchy?',
      a: 'A seven-level ranking from his 2008 essay "How to Disagree": name-calling, ad hominem, responding to tone, contradiction, counterargument, refutation, and refuting the central point. Aim for the top two.',
    },
  ],
  related: [
    { label: 'How to do great work', href: '/paul-graham/how-to-do-great-work' },
    { label: 'Next: Default alive or default dead', href: '/paul-graham/default-alive-or-dead' },
    { label: 'What makes a great founder', href: '/paul-graham/what-makes-a-great-founder' },
    { label: 'All Paul Graham lessons', href: '/paul-graham' },
    { label: 'Chief of staff guide', href: '/chief-of-staff' },
    { label: 'Founder’s office roles', href: '/founders-office' },
  ],
}
