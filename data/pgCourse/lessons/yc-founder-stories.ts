import type { PgLesson } from '../types'

export const lesson: PgLesson = {
  slug: 'yc-founder-stories',
  track: 'yc',
  order: 0,
  title: 'What the first YC founders did',
  metaTitle: 'YC Founder Stories: Reddit, Airbnb, Dropbox, Twitch, Stripe',
  metaDescription:
    'What early YC founders really did: Reddit’s pivot, Airbnb’s cereal boxes, Dropbox’s demo video, Stripe’s installs, Twitch and Instacart. Sourced, myths flagged.',
  h1: 'What the first YC founders actually did: Reddit, Airbnb, Dropbox, Twitch, Stripe and Instacart',
  tldr: 'The famous YC companies did not start with great ideas or great timing. Reddit changed its idea before the first batch began. Kiko failed and its founders went on to build Justin.tv, then Twitch. Airbnb sold cereal boxes to pay its debts and grew only after the founders went door to door in New York. Dropbox showed a 3-minute demo video instead of describing the product. Stripe set users up on the spot. Each story below links the source and says when the source is the founder’s own retelling.',
  minutes: 15,
  level: 'Beginner',
  steps: [
    {
      heading: 'What happened in the very first batch, in 2005?',
      body: [
        'Paul Graham wrote up the first Summer Founders Program in "What I Did this Summer" (October 2005). YC funded eight startups, and the most any group got was $20,000. The founders were 18 to 28. Seven of the eight had a prototype by demo day at ten weeks, and Reddit had already launched and demoed its live site. A researcher who studied the batch said the one thing they shared was that "they all worked ridiculously hard."',
        'Reddit’s founders, Steve Huffman and Alexis Ohanian, applied with a different idea: My Mobile Menu, a way to order food ahead from a phone. Ohanian has told the story this way (reported by Entrepreneur, 2016): Graham didn’t think a mobile-only idea would work, then called them while they were on the train home and offered a place if they would work on a desktop idea instead. They got off the train in Connecticut and started over. That is Ohanian’s retelling, reported second-hand.',
        'The same batch included Kiko, an online calendar by Justin Kan and Emmett Shear, and Loopt, Sam Altman’s location app, which YC lists as Summer 2005. Graham had his own history: he and Robert Morris started Viaweb in 1995 to let people build online stores, and later sold it to Yahoo ("Beating the Averages").',
      ],
      keyIdea: 'YC bet on founders, not ideas. Reddit’s idea changed before it was even funded.',
    },
    {
      heading: 'Kiko failed. Why does that story matter?',
      body: [
        'Kiko lost out once Google Calendar arrived. In 2006 the founders sold it on eBay; Business Insider puts the price at $258,100. Shear later summed it up in a 2014 talk: "We built it, we sold it on eBay."',
        'The same team then launched Justin.tv in 2007, one channel streaming Justin Kan’s life around the clock. In 2011 Shear spun off the gaming part as Twitch, and in 2014 Amazon bought Twitch for $970 million (Business Insider, 2023). In his talk "How to Plan an MVP" (2019), YC partner Michael Seibel, who was also a Justin.tv cofounder, uses its first version as an example of a deliberately simple start: one channel, low-resolution video.',
      ],
      bullets: [
        'A failed product is not a failed team. They kept the team and tried again.',
        'The big company was hidden inside a side feature of the second product.',
        'Version one was crude on purpose, and that was fine.',
      ],
    },
    {
      heading: 'What really happened with Airbnb and the cereal boxes?',
      body: [
        'In late 2008 Airbnb was in debt. The founders made "Obama O’s" and "Cap’n McCain’s" cereal boxes for the US election and sold them at $40 each. Joe Gebbia told NPR’s "How I Built This" that they paid off their credit card debt and that, at the end of a weak YC interview, they handed Graham a box. When he heard how they had funded the company, he was intrigued (Inc., 2016). Brian Chesky’s version (Fortune, 2023) puts the money raised at about $30,000. Tellings differ on details such as how many boxes were made, so treat exact numbers with care.',
        'Graham’s own account is in "The Airbnbs" (December 2020): "We didn’t even like the idea that much." What won him over was the founders. They "did nothing half-way, and we could sense this even in the interview." The well-known line that Graham called them "cockroaches" comes from Chesky’s own retelling, reported by Business Insider, not from Graham’s writing.',
        'What made Airbnb grow was not the cereal. Graham writes that the founders went to New York in person to visit hosts and make their listings more attractive. Growth turned about three weeks into YC, in late January 2009. Fees went from $460 in the first week of February to $897, then $1,428.',
      ],
      keyIdea:
        'The cereal showed grit. The door-to-door work in New York is what made Airbnb grow.',
    },
    {
      heading: 'How did Dropbox and Stripe get their first users?',
      body: [
        'Drew Houston showed rather than told. His own "Startup Lessons Learned" slides say Dropbox’s first minimum viable product was a 3-minute screencast posted on Hacker News in April 2007, which brought "lots of immediate, high-quality feedback". He told TechCrunch (2011) the video stayed at the top of Hacker News for a couple of days, and that Graham helped them distill the idea. A second video, for the private beta in March 2008, took the waiting list from 5,000 to 75,000 in one day, according to the same slides.',
        'Stripe did the opposite of waiting for signups. In "Do Things that Don’t Scale" (2013), Graham says YC uses the term "Collison installation" for what the Collison brothers did: when anyone agreed to try Stripe, they would say "Right then, give me your laptop" and set them up on the spot.',
      ],
      bullets: [
        'If your product is hard to explain, record a short screen demo and post it where your users are.',
        'When someone says "I’ll try it", set them up yourself, right then.',
      ],
    },
    {
      heading: 'Instacart: what did it take to get noticed late?',
      body: [
        'Apoorva Mehta wrote the story himself for TechCrunch in August 2012. He decided to apply in June and had missed the deadline "by over two months". Alumni introductions to partners were turned down, and so was his late application. Then he used his own app to send a six-pack of beer to Garry Tan at YC. About half an hour after it arrived, Tan called and asked him to come in the next day.',
        'His lesson: "I’ll never take ‘No’ for an answer again." The better lesson for you is what made the stunt work: the delivery was the product working, end to end. Don’t copy the beer. YC’s FAQ is clear that late applications are read only when partners have time.',
      ],
      keyIdea:
        'The strongest pitch is the product doing its job in front of the person you are pitching.',
    },
    {
      heading: 'How did these founders help each other?',
      body: [
        'From the first summer, Graham saw the founders learn "a lot from one another" by watching each other’s presentations, and several said the weekly dinners kept them from overwork with no social life ("What I Did this Summer", 2005). In "What I’ve Learned from Users" (2022), he calls founders’ generosity to each other "the happiest thing" he learned, and says YC was designed to amplify it.',
        'Jessica Livingston, YC’s cofounder, ran much of this. Graham writes that she judged the founders, set the culture, and is the main reason the alumni network is so trusting and helpful ("Jessica Livingston", 2015). Her book "Founders at Work" (2007) collects interviews with founders about their first days. Today YC’s Bookface platform and founder groups carry the same habit, according to YC’s about page.',
      ],
      bullets: [
        'Find three founders on your timeline and share numbers every week.',
        'When you solve a hard problem, write it up for the others.',
        'Ask specific questions. Bookface works because founders post a precise problem and tag what they know.',
      ],
    },
  ],
  keyTerms: [
    {
      term: 'Summer Founders Program',
      meaning:
        'YC’s first batch, in summer 2005 in Cambridge, Massachusetts: eight startups, up to $20,000 each, and a demo day after ten weeks.',
    },
    {
      term: 'Pivot',
      meaning:
        'Changing what the company makes while keeping the team, as Reddit did before its batch and Justin.tv did when it became Twitch.',
    },
    {
      term: 'Collison installation',
      meaning:
        'YC’s name for setting up a new user on the spot, as the Stripe founders did with people’s laptops.',
    },
    {
      term: 'Minimum viable product (MVP)',
      meaning:
        'The simplest version that real users can try. For Dropbox it was a 3-minute demo video.',
    },
    {
      term: 'Ramen profitable',
      meaning:
        'Making just enough to pay the founders’ living costs. Graham says it was Airbnb’s goal during YC; Brian Chesky emailed him on February 22, 2009 to say they had reached it.',
    },
  ],
  videos: [
    {
      youtubeId: 'Ya0I6oz7q9U',
      title: 'Nate Blecharczyk at Startup School 2013',
      channel: 'Y Combinator',
      minutes: 29,
      why: 'Airbnb’s third cofounder on the early years, the advice they got at YC and the trips to meet New York hosts. Note how small the first steps were.',
    },
    {
      youtubeId: 'oYFjKml9ptk',
      title: 'The Untold Stories of Y Combinator with Co-Founder Jessica Livingston',
      channel: 'Garry Tan',
      minutes: 60,
      why: 'Jessica Livingston on the first batch, the weekly dinners and how founders learned from each other. Good for the founders-helping-founders part.',
    },
  ],
  tryIt: {
    title: 'Steal one move from each story this week',
    steps: [
      'Reddit: write your idea in one sentence, then write two other ideas the same team could build. Would you still want to work together on those?',
      'Airbnb: list five early users you could meet in person this week, and go and help one of them use your product better.',
      'Dropbox: record a 2–3 minute screen demo of your product (or a mock-up) and post it where your target users gather. Count replies.',
      'Stripe: next time someone says "sounds interesting", set them up on the spot, on a call or in person.',
      'Founders helping founders: message two other people building something and suggest a weekly 15-minute numbers check.',
    ],
    link: { label: 'Read Paul Graham’s "The Airbnbs"', url: 'https://paulgraham.com/airbnbs.html' },
  },
  check: [
    {
      q: 'According to Graham’s own essay, why did YC fund Airbnb?',
      options: [
        'Because it loved the idea of renting air beds',
        'Because of the founders: earnest, full of energy, doing nothing half-way',
        'Because they already had fast growth',
        'Because a big investor recommended them',
      ],
      answer: 1,
      why: 'In "The Airbnbs", Graham says YC didn’t even like the idea much and users weren’t growing. The founders’ earnestness and energy, visible in the interview, decided it.',
    },
    {
      q: 'Your product is hard to explain in words and early feedback is thin. Which early YC story fits best?',
      options: [
        'Instacart’s beer delivery',
        'Kiko’s eBay sale',
        'Dropbox’s 3-minute demo video on Hacker News',
        'Reddit’s train ride',
      ],
      answer: 2,
      why: 'Houston showed Dropbox working in a short screencast where his users already were, and got immediate, high-quality feedback.',
    },
    {
      q: 'A blog says Graham wrote that Airbnb’s founders were "cockroaches". How should you treat that?',
      options: [
        'As a direct quote from his essays',
        'As Brian Chesky’s retelling of what Graham said, reported second-hand',
        'As made up entirely',
        'As YC’s official description of Airbnb',
      ],
      answer: 1,
      why: 'The word comes from Chesky recalling what Graham told him, as reported by Business Insider. It does not appear in Graham’s essay "The Airbnbs".',
    },
  ],
  fromTheSource: [
    {
      who: 'Paul Graham',
      role: 'YC cofounder who interviewed and funded Airbnb in 2009.',
      work: 'The Airbnbs (essay, December 2020)',
      url: 'https://paulgraham.com/airbnbs.html',
      idea: 'What was special about Airbnb’s founders was how earnest they were. YC didn’t like the idea much, but the founders "did nothing half-way", and that showed even in the interview.',
      breakdown: [
        'Before YC they had given the company a year with no growth and agreed it was their last try.',
        'During the batch, YC nicknamed Brian Chesky "The Tasmanian Devil" for his energy.',
        'They visited hosts in New York and helped improve listings. Growth turned about three weeks into YC.',
        'Weekly fees went from $460 to $897 to $1,428 in the first three weeks of February 2009.',
      ],
      use: 'Ask yourself: is there anything in your startup you are doing half-way? Pick it and either commit fully this week or drop it.',
    },
    {
      who: 'Apoorva Mehta',
      role: 'Founder of Instacart, writing in his own words the summer he got into YC.',
      work: 'How Instacart Hacked YC (TechCrunch, August 2012)',
      url: 'https://techcrunch.com/2012/08/18/how-instacart-hacked-yc/amp',
      idea: 'Mehta missed YC’s deadline by over two months and was turned down several times. He got an interview by using Instacart to deliver a six-pack of beer to partner Garry Tan.',
      breakdown: [
        'He tried alumni introductions first. Each partner said no.',
        'His late application was also rejected.',
        'The delivery itself was the demo: an order placed in the app arrived at YC.',
        'Tan called within about half an hour and invited him in the next day.',
      ],
      use: 'Before you pitch anyone, ask: can I let them use the product for 30 seconds instead of describing it?',
    },
  ],
  sources: [
    { label: 'Paul Graham, What I Did this Summer (2005)', url: 'https://paulgraham.com/sfp.html' },
    {
      label: 'Paul Graham, How Y Combinator Started (2012)',
      url: 'https://paulgraham.com/ycstart.html',
    },
    { label: 'Paul Graham, Beating the Averages (2001)', url: 'https://paulgraham.com/avg.html' },
    { label: 'Paul Graham, The Airbnbs (2020)', url: 'https://paulgraham.com/airbnbs.html' },
    {
      label: 'Paul Graham, Do Things that Don’t Scale (2013)',
      url: 'https://paulgraham.com/ds.html',
    },
    {
      label: 'Paul Graham, What I’ve Learned from Users (2022)',
      url: 'https://paulgraham.com/users.html',
    },
    { label: 'Paul Graham, Jessica Livingston (2015)', url: 'https://paulgraham.com/jessica.html' },
    {
      label: 'Paul Graham, Ramen Profitable (2009)',
      url: 'https://paulgraham.com/ramenprofitable.html',
    },
    {
      label: 'Entrepreneur, To Alexis Ohanian, Success Came After a Series of Setbacks (2016)',
      url: 'https://www.entrepreneur.com/leadership/to-alexis-ohanian-success-came-after-a-series-of-setbacks/271690',
    },
    {
      label: 'Y Combinator company page: Loopt (Summer 2005)',
      url: 'https://www.ycombinator.com/companies/loopt',
    },
    {
      label: 'Business Insider via Yahoo, Meet Emmett Shear (Nov 2023)',
      url: 'https://ca.news.yahoo.com/meet-emmett-shear-interim-ceo-095411940.html',
    },
    {
      label: 'Inc., How Novelty Cereal Helped Dig Airbnb Out of the Trough of Sorrow (2016)',
      url: 'https://www.inc.com/tess-townsend/airbnb-gebbia-trough-of-sorrow-npr.html',
    },
    {
      label: 'Fortune, Airbnb CEO on the cereal box that changed everything (2023)',
      url: 'https://fortune.com/2023/04/19/airbnb-ceo-cereal-box-investors-changed-everything-billion-dollar-company',
    },
    {
      label: 'Business Insider, How a box of cereal and acting like a cockroach helped Airbnb',
      url: 'https://www.businessinsider.in/how-a-box-of-cereal-and-acting-like-a-cockroach-helped-airbnb-become-a-billion-dollar-business/amp_articleshow/21270791.cms',
    },
    {
      label: 'Drew Houston, Dropbox: Startup Lessons Learned (slides)',
      url: 'https://www.slideshare.net/gueste94e4c/dropbox-startup-lessons-learned-3836587',
    },
    {
      label: 'TechCrunch, Founder Stories: Drew Houston (Oct 2011)',
      url: 'https://techcrunch.com/2011/10/30/founder-stories-drew-houston-dropbox-users-save-a-billion-files-every-three-days/amp/',
    },
    {
      label: 'TechCrunch, Founder Stories: How Dropbox Got Its First 10 Million Users (2011)',
      url: 'https://techcrunch.com/2011/11/01/founder-storie-how-dropbox-got-its-first-10-million-users/amp/',
    },
    {
      label: 'Apoorva Mehta, How Instacart Hacked YC (TechCrunch, 2012)',
      url: 'https://techcrunch.com/2012/08/18/how-instacart-hacked-yc/amp',
    },
    {
      label: 'Michael Seibel, How to Plan an MVP (YC video, 2019)',
      url: 'https://www.youtube.com/watch?v=1hHMwLxN6EM',
    },
    { label: 'Founders at Work (book site)', url: 'http://www.foundersatwork.com/' },
    { label: 'Y Combinator: What Happens at YC', url: 'https://www.ycombinator.com/about' },
    { label: 'Y Combinator: FAQ', url: 'https://www.ycombinator.com/faq' },
  ],
  faqs: [
    {
      q: 'Is the Airbnb cereal box story true?',
      a: 'Yes, in outline. Joe Gebbia (on NPR) and Brian Chesky (at Stanford, reported by Fortune) both tell it: "Obama O’s" and "Cap’n McCain’s" boxes sold at $40 to pay off debt, and a box handed to Paul Graham at the interview. Details such as the number of boxes differ between tellings. Graham’s own essay says the founders’ earnestness, not the cereal, is what stood out.',
    },
    {
      q: 'Which famous companies came out of Y Combinator’s first batch?',
      a: 'The Summer 2005 batch funded eight startups, including Reddit (Steve Huffman and Alexis Ohanian), Kiko (Justin Kan and Emmett Shear, who later built Justin.tv and Twitch) and Loopt (Sam Altman).',
    },
    {
      q: 'Did Dropbox get into YC because of its demo video?',
      a: 'The video helped. Drew Houston posted a 3-minute screencast on Hacker News in April 2007 and said he hoped Paul Graham and YC would see it. It reached the top of Hacker News and brought immediate feedback. It is not documented as the single reason YC accepted Dropbox.',
    },
  ],
  related: [
    { label: 'Do things that don’t scale', href: '/paul-graham/do-things-that-dont-scale' },
    { label: 'What happens inside a YC batch', href: '/paul-graham/what-happens-at-yc' },
    { label: 'How to get into YC', href: '/paul-graham/how-to-get-into-yc' },
    {
      label: 'Next: YC’s essential startup advice',
      href: '/paul-graham/yc-essential-startup-advice',
    },
    { label: 'What makes a great founder', href: '/paul-graham/what-makes-a-great-founder' },
    { label: 'Founder’s office roles', href: '/founders-office' },
  ],
}
