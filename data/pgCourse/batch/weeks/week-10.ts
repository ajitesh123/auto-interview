// Week 10: the pitch. Sources opened Nov 9, 2026; see `sources`.
// Kevin Hale's talk is explained from YC's library page, his 2015 YC blog post and published
// transcript summaries of the video. Video IDs checked with YouTube oEmbed on Nov 9, 2026.
import type { BatchWeek } from '../types'

export const week: BatchWeek = {
  week: 10,
  slug: 'week-10',
  phase: 3,
  title: 'The pitch: two clear sentences',
  metaTitle: 'YC Batch Week 10: Write Your Two-Sentence Pitch',
  metaDescription:
    'Week 10 of a YC batch, run yourself: Michael Seibel’s seven pitch questions, Kevin Hale’s clarity rules and the Email Test, until 5 strangers repeat it back.',
  h1: 'Week 10: the pitch, starting with two sentences anyone can repeat',
  tldr: 'Inside YC, partners work on each company’s two-sentence description at every group office hours, because the Demo Day pitch and every investor meeting are built on it. This week you answer Michael Seibel’s seven pitch questions, cut your description down with Kevin Hale’s clarity rules, and test it on five people outside your field until each can say it back.',
  minutes: 60,
  atYc: {
    body: [
      'YC works on the pitch long before Demo Day. In his 2016 post “How to Pitch Your Company”, Michael Seibel, then a YC partner, wrote that one thing most people don’t realise about the batch is that YC helps companies with their two-sentence pitch: “We work on it every group office hours for the entire batch.” He calls it the linchpin of a good Demo Day presentation.',
      'The YC application works the same way. Paul Graham’s guide to applying, still on YC’s site, says a reader spends about 20 seconds trying to understand your answer to “What is your company going to make?” before moving on to the founders, and that “The best answers are the most matter of fact.” In his Startup School talk on pitching, YC partner Kevin Hale says a company can be turned down because its application was unclear, even when it was as strong as ones that got in.',
      'Founders describe a fixed formula in the coaching. Daniel Aisen, CEO of Proof (S19), wrote that the last two weeks of YC were geared toward Demo Day preparation, that pitches generally followed a formula (what you do, how big the market is, your growth, why your team fits), and that YC advised against jokes unless you were sure they would land. Aditya Jayaprakash of Blacksmith (W24) describes group office hours every two weeks where each company shared its progress with its section.',
      'YC does not publish the exact sessions or worksheets partners use. What is consistent across its partners’ writing and founders’ accounts is the order: first make it clear, then make it short, then practise.',
    ],
    confidence: 'documented',
    sources: [
      {
        label: 'Michael Seibel, How to Pitch Your Company (Y Combinator blog, 2016)',
        url: 'https://www.ycombinator.com/blog/how-to-pitch-your-company/',
      },
      {
        label: 'Paul Graham, How to Apply to Y Combinator',
        url: 'https://www.ycombinator.com/howtoapply',
      },
      {
        label: 'Y Combinator Library: Kevin Hale, How to Pitch Your Startup',
        url: 'https://www.ycombinator.com/library/6q-how-to-pitch-your-startup',
      },
      {
        label: 'Daniel Aisen (Proof, S19): Fundraising and YC',
        url: 'https://medium.com/prooftrading/fundraising-and-yc-f5dc9d087cf3',
      },
      {
        label: 'Aditya Jayaprakash (Blacksmith, W24): What it was like going through YC W24',
        url: 'https://www.blacksmith.sh/blog/going-through-yc-winter-24',
      },
    ],
  },
  challenge: {
    name: 'The repeat-it-back challenge',
    task: 'Write a two-sentence description of your company. Say it to 5 people who don’t work in your field, one at a time, and ask each to explain it back in their own words. Rewrite after every failure until all 5 can repeat it.',
    proof:
      'A log of 5 people with what each said back, every version of your two sentences with the date, and a final version that all 5 repeated correctly. One of the 5 must be done by email, Seibel’s way.',
    basis:
      'Michael Seibel’s “Email Test” and his note that YC works on the two-sentence pitch at every group office hours (“How to Pitch Your Company”, 2016).',
  },
  frameworks: [
    {
      name: 'The seven pitch questions and the two-sentence description',
      who: 'Michael Seibel, YC partner and former CEO of YC’s accelerator (YC blog, 2016)',
      source: {
        label: 'How to Pitch Your Company',
        url: 'https://www.ycombinator.com/blog/how-to-pitch-your-company/',
      },
      explain: [
        'Seibel reduces a pitch to seven questions: What do you do? How big is the market? What’s your progress? What’s your unique insight? What’s your business model? Who’s on your team? What do you want? A clear, short answer to each puts you ahead of most founders, and the same answers become your investor meeting, your Demo Day script and your application.',
        'The first answer matters most. Start with the company name and what it does, skip the problem setup, and use the simplest words you can. His example: “Socialcam is a mobile app that makes it easy to take videos and share them with friends and family.” He writes that “Your elevator pitch should be like baby food.” If you are stuck, describe what the user actually does; his Google example is “We build a website with a box in it.” The goal is to make the listener curious enough to ask the next question, not to explain everything.',
        'For the rest: estimate the market bottom-up (how many customers times what they would pay), not as a slice of a huge number. Show progress as product built and customers won, not meetings and partnerships. Make the insight something specific you learned from users or your own experience. Keep one simple business model. Say only the team facts that matter. And end with a clear ask; he calls “What do you think?” a bad one.',
        'His check is the Email Test: email your two sentences to a smart friend and ask them to explain it back in different words. If they ask a clarifying question, rewrite. Email matters because you can’t add explanations the way you would in conversation.',
      ],
      steps: [
        'Answer all seven questions in writing, one or two plain sentences each.',
        'Write sentence one: company name, what it does, for whom. No problem setup, no adjectives.',
        'Write sentence two: the single fact that makes someone want to hear more, usually your progress or your insight.',
        'Cross out jargon, acronyms, marketing words and the word “platform”, as Seibel advises.',
        'Run the Email Test with one smart friend. Rewrite if they ask anything.',
        'Say it aloud to four more people outside your field and ask each to repeat it. Rewrite after any miss.',
      ],
      example: {
        label: 'Illustrative: one company, before and after',
        text: 'Before:\n“We are an AI-first engagement platform for the healthcare ecosystem, helping providers drive better outcomes.”\n\nAfter:\n“Remindr sends WhatsApp appointment reminders for small clinics in India. 40 clinics pay ₹999 a month, and their missed appointments fell by a third.”\n\nRepeat-back test: “So it texts patients on WhatsApp so they don’t miss appointments, and clinics pay for it.” Pass.',
      },
    },
    {
      name: 'Kevin Hale’s clarity rules: legible, simple, obvious',
      who: 'Kevin Hale, YC partner and Wufoo cofounder (Startup School talk “How to Pitch Your Startup”, and YC blog, 2015)',
      source: {
        label: 'Kevin Hale - How to Pitch Your Startup',
        url: 'https://www.youtube.com/watch?v=17XZGUX_9iM',
      },
      explain: [
        'Hale speaks as an investor. He says he does not need founders to sell him: he wants to know whether he understands the company, whether he is excited by it and whether he likes the team. A good investor imagines how a company could become huge, so the founder’s job is to be clear and let the investor do the rest. Clarity also drives word of mouth: a description people can repeat is one users and investors can pass on.',
        'He borrows the rule from his 2015 post on Demo Day slides: make it legible, simple and obvious. He names four things that ruin clarity: ambiguity, complexity (several ideas at once), mystery (jargon and vague words like “it” and “solution”), and ignorable language such as marketing speak, MBA speak and buzzwords. Talk the way you would to a friend, with no preamble, in words someone else could reproduce.',
        'A good description makes three nouns clear: what you are making, the problem it solves, and who the customer is. Lead with what, not why or how. His examples include Airbnb’s early line about booking rooms with locals instead of hotels, and Dropbox syncing files across your computers.',
        'He also gives rules for “X for Y” descriptions. They work only if X is a household name that has clearly succeeded, Y actually wants X, and Y is a big market. His example of a comparison that fails these tests is “Buffer for Snapchat”. Being concise is itself a signal: it tells investors you have thought hard and work efficiently.',
      ],
      steps: [
        'Underline the three nouns in your description: the thing, the problem, the customer. If one is missing or vague, fix it first.',
        'Circle every word a stranger would not use. Replace each with an everyday word.',
        'Remove any second idea. One company, one job, one customer.',
        'If you use “X for Y”, check Hale’s three conditions. If any fails, drop the comparison.',
        'Read it aloud to someone outside your field. If they can’t say it back, it is not legible yet.',
      ],
      example: {
        label: 'Illustrative: the three-noun check',
        text: '“Remindr sends WhatsApp appointment reminders for small clinics in India.”\n\nThing:    WhatsApp appointment reminders\nProblem:  missed appointments (implied, stated in sentence two)\nCustomer: small clinics in India\n\n“Uber for clinics”? Uber is a household name, but clinics don’t want rides. Fails Hale’s second rule. Drop it.',
      },
    },
  ],
  videos: [
    {
      youtubeId: '17XZGUX_9iM',
      title: 'Kevin Hale - How to Pitch Your Startup',
      channel: 'Y Combinator',
      minutes: 28,
      why: 'Hale takes real startup descriptions apart and rewrites them. Watch the three-noun check and his rules for “X for Y”.',
    },
    {
      youtubeId: 'B5tU2447OK8',
      title: 'How to Apply And Succeed at Y Combinator | Startup School',
      channel: 'Y Combinator',
      minutes: 25,
      why: 'YC’s view of the application as a written pitch. Use it to rewrite your answer to “What is your company going to make?”',
    },
  ],
  assignments: [
    {
      id: 'w10-seven',
      text: 'Answer Seibel’s seven questions in writing, one or two sentences each.',
      why: 'They are the skeleton of every pitch you will give in weeks 11 and 12.',
      done: 'Seven short answers on one page, with a bottom-up market number.',
    },
    {
      id: 'w10-two',
      text: 'Write your two-sentence description and run Hale’s three-noun check on it.',
      why: 'Seibel calls the two sentences the linchpin of the Demo Day pitch.',
      done: 'Two sentences with the thing, problem and customer each clear.',
    },
    {
      id: 'w10-email',
      text: 'Run the Email Test with one smart friend outside your field.',
      why: 'By email you can’t rescue a confusing pitch with extra words.',
      done: 'Their reply in their own words, with no clarifying question.',
    },
    {
      id: 'w10-five',
      text: 'Say it aloud to four more people outside your field and log what each says back.',
      why: 'If people can’t repeat it, they can’t pass it on to a partner or a friend.',
      done: '5 people in the log, all repeating it correctly on the final version.',
    },
    {
      id: 'w10-app',
      text: 'Rewrite two YC application answers with your new words: the 50-character description and “What is your company going to make?”',
      why: 'Graham says the reader spends about 20 seconds on that answer before looking at the founders.',
      done: 'Both answers written, matter of fact, no jargon.',
    },
  ],
  officeHours: [
    {
      q: 'What do you do, in one sentence a stranger could repeat?',
      why: 'It is the first of Seibel’s seven questions, and the one YC works on at every group office hours.',
    },
    {
      q: 'Who exactly is the customer, and what problem do they have today?',
      why: 'Hale’s test is whether the thing, the problem and the customer are all clear.',
    },
    {
      q: 'How did you size the market, from the bottom up?',
      why: 'Seibel and Ralston both prefer customers times price over a slice of a huge market.',
    },
    {
      q: 'What do you know about this problem that others don’t?',
      why: 'Seibel lists a specific unique insight as one of the seven answers, and says passion is not a substitute.',
    },
    {
      q: 'What are you asking for, exactly?',
      why: 'Seibel’s last question; he says to make it easy for the listener to help you.',
    },
  ],
  weeklyUpdate: {
    metric: 'people who repeated your pitch, out of 5',
    prompt:
      'Week 10: report your one number, your final two sentences, how many versions it took, and the most common thing people got wrong before the final version.',
  },
  checkpoint:
    'Five people outside your field, including one by email, can explain your company back in their own words from two sentences, and you have written answers to all seven of Michael Seibel’s pitch questions (“How to Pitch Your Company”, 2016).',
  faqs: [
    {
      q: 'What is the two-sentence pitch YC founders use?',
      a: 'A plain description of what the company does and for whom, short enough to repeat. Michael Seibel wrote that YC partners work on it at every group office hours in the batch because the Demo Day pitch rests on it.',
    },
    {
      q: 'What is the Email Test?',
      a: 'Seibel’s check: email your two-sentence description to a smart friend and ask them to explain it back in different words. Any clarifying question means you rewrite.',
    },
    {
      q: 'Should I describe my startup as “X for Y”?',
      a: 'Kevin Hale says only if X is a well-known success, Y genuinely wants X, and Y is a large market. Otherwise say plainly what you make, the problem and the customer.',
    },
  ],
  sources: [
    {
      label: 'Michael Seibel, How to Pitch Your Company (Y Combinator blog, 2016)',
      url: 'https://www.ycombinator.com/blog/how-to-pitch-your-company/',
    },
    {
      label: 'Y Combinator Library: Kevin Hale, How to Pitch Your Startup',
      url: 'https://www.ycombinator.com/library/6q-how-to-pitch-your-startup',
    },
    {
      label: 'Kevin Hale - How to Pitch Your Startup (video)',
      url: 'https://www.youtube.com/watch?v=17XZGUX_9iM',
    },
    {
      label: 'Transcript summary: Kevin Hale, How to Pitch Your Startup (Rosetta)',
      url: 'https://rosetta.to/u/ycombinator/kevin-hale-how-to-pitch-your-startup?t=0',
    },
    {
      label: 'Kevin Hale, How to Design a Better Pitch Deck (Y Combinator blog, 2015)',
      url: 'https://www.ycombinator.com/blog/how-to-design-a-better-pitch-deck',
    },
    {
      label: 'Paul Graham, How to Apply to Y Combinator',
      url: 'https://www.ycombinator.com/howtoapply',
    },
    {
      label: 'Y Combinator: How to Apply And Succeed at Y Combinator (Startup School)',
      url: 'https://www.youtube.com/watch?v=B5tU2447OK8',
    },
    {
      label: 'Daniel Aisen (Proof, S19): Fundraising and YC',
      url: 'https://medium.com/prooftrading/fundraising-and-yc-f5dc9d087cf3',
    },
    {
      label: 'Aditya Jayaprakash (Blacksmith, W24): What it was like going through YC W24',
      url: 'https://www.blacksmith.sh/blog/going-through-yc-winter-24',
    },
  ],
}
