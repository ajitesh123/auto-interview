// Week 11: Demo Day rehearsal. Sources opened Nov 9, 2026; see `sources`.
// YC's current pages do not state the Demo Day pitch length. The 60-second target comes from
// YC's own S22 Demo Day post plus press/investor accounts of W24, Spring 2025, Summer 2025 and
// W26, and is labelled as such. Video ID checked with YouTube oEmbed on Nov 9, 2026.
import type { BatchWeek } from '../types'

export const week: BatchWeek = {
  week: 11,
  slug: 'week-11',
  phase: 3,
  title: 'Demo Day rehearsal',
  metaTitle: 'YC Batch Week 11: Rehearse a 60-Second Demo Day Pitch',
  metaDescription:
    'Week 11 of a YC batch, run yourself: how YC founders prepare a one-minute Demo Day pitch, Geoff Ralston’s and Kevin Hale’s rules, and three rounds of feedback.',
  h1: 'Week 11: rehearse your Demo Day pitch until it fits in a minute',
  tldr: 'In the last weeks before Demo Day, YC founders cut their pitch to about a minute and one slide and rehearse it, including at Alumni Demo Day, which one founder called a dress rehearsal. This week you write a 60-second pitch with Geoff Ralston’s structure, build one slide with Kevin Hale’s rules, record it and improve it through three rounds of feedback.',
  minutes: 55,
  atYc: {
    body: [
      'YC’s current pages do not say how long a Demo Day pitch is or how rehearsals run. What YC has published shows the pitch shrinking as batches grew. In 2006 Paul Graham wrote that each startup got ten minutes, with a closed Rehearsal Day a week before attended only by other founders. In 2015 Kevin Hale put it at about two and a half minutes in rooms of over 500 people. For the online Summer 2022 Demo Day, Michael Seibel wrote: “Every company will have one minute to present.”',
      'Recent accounts say the minute has stayed, first online and now back in person. Fast Company described the Winter 2024 Demo Day, still held over Zoom, as 243 one-minute pitches with one slide each. Alumni Ventures described Spring 2025 as 144 rapid-fire, one-minute pitches in San Francisco before more than 1,500 investors, and investor Jeffrey Paine described Summer 2025 as “one minute and one slide”. Nathan Denier, an investor at Batch, wrote that at the March 2026 Demo Day each founder had one minute to introduce themselves, say what the company does and show their numbers.',
      'The rehearsal is reported by founders rather than documented by YC. YC’s about page says active founders get an early look at each batch at Alumni Demo Day. TechCrunch reported that for Fall 2024 it was held in person on the Sunday before Demo Day, with 93 startups pitching, and Avni Patel Thompson, CEO of Milo, called it “a dress rehearsal for the founders”. Daniel Aisen of Proof (S19) wrote that the last two weeks of his batch were geared toward Demo Day preparation.',
      'Not public: the exact rehearsal schedule, who sits on any practice panels, and whether rules such as one slide are written down. Treat the minute as the current norm, not a published rule.',
    ],
    confidence: 'reported',
    sources: [
      {
        label: 'Paul Graham, How to Present to Investors (2006)',
        url: 'https://paulgraham.com/investors.html',
      },
      {
        label: 'Kevin Hale, How to Design a Better Pitch Deck (Y Combinator blog, 2015)',
        url: 'https://www.ycombinator.com/blog/how-to-design-a-better-pitch-deck',
      },
      {
        label: 'Michael Seibel, YC S22 Virtual Demo Day (Y Combinator blog, 2022)',
        url: 'https://www.ycombinator.com/blog/yc-s22-virtual-demo-day',
      },
      {
        label:
          'Fast Company: What it’s like to watch 243 startups give one-minute pitches (Apr 2024)',
        url: 'https://www.fastcompany.com/91088068/y-combinator-demo-day-winter-2024-batch',
      },
      {
        label: 'Alumni Ventures: Decoding YC’s Spring 2025 Demo Day (Jun 2025)',
        url: 'https://www.av.vc/blog/decoding-ycs-s25-demo-day-trends-takeaways',
      },
      {
        label: 'Jeffrey Paine: My First YC Demo Day in 2025',
        url: 'https://jeffreypaine.com/my-first-yc-demo-day-in-2025-chaos-genius-and-why-this-batch-feels-like-the-future',
      },
      {
        label: 'Nathan Denier (Batch): My First YC Demo Day (2026)',
        url: 'https://nathandenier.substack.com/p/my-first-yc-demo-day-our-first-billion',
      },
      {
        label: 'TechCrunch: Y Combinator’s Demo Day is back in person (Dec 2024)',
        url: 'https://techcrunch.com/2024/12/01/y-combinators-demo-day-is-back-in-person',
      },
      { label: 'Y Combinator: What Happens at YC', url: 'https://www.ycombinator.com/about' },
      {
        label: 'Daniel Aisen (Proof, S19): Fundraising and YC',
        url: 'https://medium.com/prooftrading/fundraising-and-yc-f5dc9d087cf3',
      },
    ],
  },
  challenge: {
    name: 'The 60-second, three-round challenge',
    task: 'Write a Demo Day pitch that fits in 60 seconds with one slide, record it on your phone, and run three rounds of feedback, rewriting and re-recording after each round.',
    proof:
      'Three dated recordings, the last one between 50 and 60 seconds, and a feedback log showing what at least two people said in each round (at least one outside your field) and what you changed. Your final listeners can say what you do and one number from your pitch.',
    basis:
      'Geoff Ralston’s “A Guide to Demo Day Presentations” (YC, 2016), which calls practice “the one preparation technique that matters” and says to record yourself, and the one-minute format YC has used since at least 2022.',
  },
  frameworks: [
    {
      name: 'The Demo Day presentation: vertebrae, structure, delivery',
      who: 'Geoff Ralston, YC partner and later YC president (“A Guide to Demo Day Presentations”, YC blog, 2016)',
      source: {
        label: 'A Guide to Demo Day Presentations',
        url: 'https://www.ycombinator.com/blog/guide-to-demo-day-pitches/',
      },
      explain: [
        'Ralston says the point of a Demo Day pitch is not to close anyone: “your goal should be to intrigue your listeners enough that they will want to meet you and learn more.” Investors use the pitches to sort companies into must-meet and can-skip, so yours has to be hard to ignore. A good pitch is clear, exciting, informative and memorable.',
        'He builds it on “vertebrae”: three or four points you want every listener to remember, because people forget detail. Find them with four questions: what are we building and for whom, why hasn’t it been done before, why is it hard, and why is this opportunity not to be missed. Then tell the story in roughly this order, changing it if your story needs: what you do in plain words, the problem, the product and customer, the opportunity sized from the bottom up, traction, the team’s standout facts, and a strong close that repeats the vertebrae.',
        'Delivery matters as much as words. One person presents, chosen because they are the most persuasive, not because they are CEO. Speak slower than feels natural, pause on key points, face the audience and not the screen, and don’t pace. Never exaggerate: “Exaggerations, or worse, outright untruths, are fatal errors.” Paul Graham’s older advice agrees: say what you do in the first sentence, use a few specific numbers, and “Err on the side of speaking slowly.”',
        'At one minute you cannot fit every section. Keep what you do, one problem line, your best number, one team fact and the close. Cut everything else.',
      ],
      steps: [
        'Write your three or four vertebrae from Ralston’s four questions.',
        'Open with your two sentences from week 10. Your first words say what the company does.',
        'Add one line on the problem, your single best traction number and growth rate, one bottom-up market line and one standout team fact.',
        'End by repeating the vertebrae in one sentence and your company name.',
        'Count the words, then time yourself reading at a slow pace with pauses. Our rule of thumb, not YC’s: that is often only 100–120 words a minute, so measure your own.',
        'Cut until you are under 60 seconds at that slow pace. Cut adjectives and the market line before you cut your number.',
      ],
      example: {
        label: 'Illustrative: a 60-second script (all names and numbers made up)',
        text: '[0–8s]  I’m Asha, CEO of Remindr. Remindr sends WhatsApp appointment reminders for small clinics in India.\n[8–18s] Clinics lose money on every empty slot, and their patients don’t read email. They all read WhatsApp.\n[18–33s] We launched ten weeks ago. 40 clinics pay us ₹999 a month, revenue is growing 15% a week, and missed appointments fell by a third.\n[33–43s] If one lakh small clinics pay ₹12,000 a year, that is ₹120 crore a year, before labs and pharmacies.\n[43–53s] My cofounder ran patient messaging for a 200-clinic chain.\n[53–60s] Paying clinics, fast growth, a team that has done this. Remindr.\n\n≈ 95 words, about 60 seconds read slowly with pauses. Slide: “Remindr: WhatsApp reminders for clinics” + “40 paying clinics, +15%/week”.',
      },
    },
    {
      name: 'One slide that is legible, simple and obvious, then rehearse',
      who: 'Kevin Hale, YC partner (“How to Design a Better Pitch Deck”, YC blog, 2015), with Ralston’s rehearsal advice',
      source: {
        label: 'How to Design a Better Pitch Deck',
        url: 'https://www.ycombinator.com/blog/how-to-design-a-better-pitch-deck',
      },
      explain: [
        'Hale wrote his rules for Demo Day slides, seen by hundreds of investors in a big room, many of them half checking email. Before anyone can remember your point, they have to understand it. So every slide must be legible (large, bold, simple font, strong contrast, text near the top so the back row can read it), simple (one idea per slide) and obvious (a stranger gets it at once).',
        'He lists what to cut: too much text, caveats, heavy branding, photos without captions, animations, transitions, memes and subtle jokes. He avoids screenshots and videos because they are hard to read from a distance. If you show a graph, write the conclusion on it so no one has to study the chart. Ralston adds: about seven words or fewer, no cumulative graphs (they always go up, so investors distrust them) and no video. Hale’s closing line: “Investors invest in teams not slides.”',
        'Then rehearse. Ralston calls practice the one technique that matters: rehearse with cofounders and people who will be honest, and if no one is available, record yourself and watch it, checking for too loud, too soft or too fast. Graham’s Rehearsal Day showed the same thing in 2006: early run-throughs are rough, and that is expected.',
      ],
      steps: [
        'Make one slide: company name, your one-line description, and one big number with its time period.',
        'Test it with Hale’s stranger test: show it to someone for five seconds and ask what you do. If they can’t say, simplify.',
        'Record the full pitch on your phone, standing, with the slide behind you or on screen. Watch it once with sound off (posture, eye contact) and once with sound on (speed, filler words).',
        'Round 1: two people who know you. Ask: what do we do, what number do you remember, what confused you?',
        'Round 2: two people outside your field. Same three questions. Fix whatever they could not repeat.',
        'Round 3: someone who has invested, run a startup or judged pitches. Ask whether they would take a meeting, and why or why not.',
        'After each round, rewrite, re-time and re-record. Keep every version to compare.',
      ],
      example: {
        label: 'Illustrative: a feedback log after round 2',
        text: 'Listener: neighbour, teacher (outside field)\nWhat do we do?  “Reminders for doctors?” (missed WhatsApp)\nNumber recalled: “40 clinics”\nConfused by:    “lakh”, said too fast\nChange: say “WhatsApp” twice; slow down at 18–33s; say “1 lakh, that’s 100,000”\nTime: 64s → cut market line to one clause → 57s',
      },
    },
  ],
  videos: [
    {
      youtubeId: 'fcyf9z4gSeI',
      title: 'Pitch Practice with Paul Buchheit and Sam Altman at Startup School SV 2016',
      channel: 'Y Combinator',
      minutes: 34,
      why: 'Two founders pitch live, then YC’s Sam Altman re-pitches each company. Watch how he opens with what the company does today and who pays.',
    },
  ],
  assignments: [
    {
      id: 'w11-vertebrae',
      text: 'Write your three or four vertebrae using Ralston’s four questions.',
      why: 'Listeners remember a few points; you choose which ones.',
      done: 'Three or four short sentences you would want an investor to repeat.',
    },
    {
      id: 'w11-script',
      text: 'Write a 60-second script that opens with what you do and includes one honest traction number.',
      why: 'Recent Demo Days have given each company about a minute.',
      done: 'A script that reads in 50–60 seconds at a slow pace, with timings marked.',
    },
    {
      id: 'w11-slide',
      text: 'Build one slide with Hale’s rules and run the five-second stranger test.',
      why: 'Accounts of recent Demo Days describe one slide per company, seen from the back of a big room.',
      done: 'One slide, seven words or so plus one number, that a stranger understands in five seconds.',
    },
    {
      id: 'w11-record',
      text: 'Record the pitch on your phone and watch it twice, once without sound.',
      why: 'Ralston’s fallback when no one is around to listen is to record yourself and review it.',
      done: 'A first recording saved with its date and length.',
    },
    {
      id: 'w11-rounds',
      text: 'Run three rounds of feedback, rewriting and re-recording after each.',
      why: 'Rehearsal is how YC founders get from rough to clear before Demo Day.',
      done: 'Three recordings and a log of what each listener said and what you changed.',
    },
    {
      id: 'w11-questions',
      text: 'List the ten questions you least want an investor to ask, and write a short, honest answer to each.',
      why: 'After the minute comes the meeting; Ralston’s guide warns that exaggeration is fatal.',
      done: 'Ten questions and answers, each under 40 words.',
    },
  ],
  officeHours: [
    {
      q: 'What are the three things you want every investor to remember?',
      why: 'Ralston’s guide builds the pitch on three or four “vertebrae”.',
    },
    {
      q: 'Do your first words say what the company does?',
      why: 'Graham’s first rule in “How to Present to Investors” is to say it as soon as possible, preferably in the first sentence.',
    },
    {
      q: 'Is the number on your slide honest, and is it cumulative?',
      why: 'Ralston warns against cumulative graphs and calls exaggeration a fatal error.',
    },
    {
      q: 'Who presents, and why that person?',
      why: 'Ralston says one person presents, chosen for being the most persuasive speaker, not for title.',
    },
    {
      q: 'How many times have you rehearsed, and to whom?',
      why: 'Ralston calls practice the one preparation technique that matters.',
    },
  ],
  weeklyUpdate: {
    metric: 'pitch length (seconds) and listeners who repeated it',
    prompt:
      'Week 11: report your one number, your final pitch length, the biggest change between your first and third recording, and the hardest question you prepared for.',
  },
  checkpoint:
    'You have a recorded pitch of 60 seconds or less with one slide, improved over three rounds of feedback, and listeners who don’t know your field can say what you do and remember your number. The structure and rehearsal method come from Geoff Ralston’s “A Guide to Demo Day Presentations” (2016); the one-minute length comes from YC’s 2022 Demo Day post and later accounts.',
  pitchTarget: {
    seconds: 60,
    note: 'YC’s current pages do not state a pitch length. YC’s Summer 2022 Demo Day post said every company had one minute, and press and investor accounts of the Winter 2024, Spring 2025, Summer 2025 and Winter 2026 Demo Days describe one-minute pitches, usually with one slide.',
    source: {
      label: 'Michael Seibel, YC S22 Virtual Demo Day (Y Combinator blog, 2022)',
      url: 'https://www.ycombinator.com/blog/yc-s22-virtual-demo-day',
    },
  },
  faqs: [
    {
      q: 'How long is a YC Demo Day pitch?',
      a: 'YC’s current pages don’t say. YC’s Summer 2022 post said one minute per company, and accounts of the 2024, 2025 and March 2026 Demo Days describe one-minute pitches with one slide.',
    },
    {
      q: 'Do YC founders rehearse before Demo Day?',
      a: 'Yes, by their own accounts. Alumni Demo Day, held just before the main event, was called a dress rehearsal by one founder in 2024, and Daniel Aisen of Proof (S19) wrote that the final two weeks of his batch were geared toward Demo Day preparation. YC does not publish a rehearsal schedule.',
    },
    {
      q: 'How many slides should a Demo Day pitch have?',
      a: 'Recent accounts describe one slide per company. Kevin Hale’s and Geoff Ralston’s rules apply either way: one idea per slide, about seven words, large text and no cumulative graphs or video.',
    },
  ],
  sources: [
    {
      label: 'Geoff Ralston, A Guide to Demo Day Presentations (Y Combinator blog, 2016)',
      url: 'https://www.ycombinator.com/blog/guide-to-demo-day-pitches/',
    },
    {
      label: 'Kevin Hale, How to Design a Better Pitch Deck (Y Combinator blog, 2015)',
      url: 'https://www.ycombinator.com/blog/how-to-design-a-better-pitch-deck',
    },
    {
      label: 'Paul Graham, How to Present to Investors (2006)',
      url: 'https://paulgraham.com/investors.html',
    },
    {
      label: 'Michael Seibel, YC S22 Virtual Demo Day (Y Combinator blog, 2022)',
      url: 'https://www.ycombinator.com/blog/yc-s22-virtual-demo-day',
    },
    { label: 'Y Combinator: What Happens at YC', url: 'https://www.ycombinator.com/about' },
    { label: 'Y Combinator: Demo Day FAQ', url: 'https://www.ycombinator.com/demoday/faq' },
    {
      label:
        'Fast Company: What it’s like to watch 243 startups give one-minute pitches (Apr 2024)',
      url: 'https://www.fastcompany.com/91088068/y-combinator-demo-day-winter-2024-batch',
    },
    {
      label: 'Alumni Ventures: Decoding YC’s Spring 2025 Demo Day (Jun 2025)',
      url: 'https://www.av.vc/blog/decoding-ycs-s25-demo-day-trends-takeaways',
    },
    {
      label: 'Jeffrey Paine: My First YC Demo Day in 2025',
      url: 'https://jeffreypaine.com/my-first-yc-demo-day-in-2025-chaos-genius-and-why-this-batch-feels-like-the-future',
    },
    {
      label: 'Nathan Denier (Batch): My First YC Demo Day (2026)',
      url: 'https://nathandenier.substack.com/p/my-first-yc-demo-day-our-first-billion',
    },
    {
      label: 'TechCrunch: Y Combinator’s Demo Day is back in person (Dec 2024)',
      url: 'https://techcrunch.com/2024/12/01/y-combinators-demo-day-is-back-in-person',
    },
    {
      label: 'Daniel Aisen (Proof, S19): Fundraising and YC',
      url: 'https://medium.com/prooftrading/fundraising-and-yc-f5dc9d087cf3',
    },
    {
      label: 'Y Combinator: Pitch Practice with Paul Buchheit and Sam Altman (2016)',
      url: 'https://www.youtube.com/watch?v=fcyf9z4gSeI',
    },
  ],
}
