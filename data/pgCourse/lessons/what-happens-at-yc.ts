import type { PgLesson } from '../types'

export const lesson: PgLesson = {
  slug: 'what-happens-at-yc',
  track: 'yc',
  order: 0,
  title: 'What happens inside a YC batch',
  metaTitle: 'What Happens at Y Combinator? Inside a YC Batch (2026)',
  metaDescription:
    'What YC does for 3 months: the $500K deal, four batches a year, group partners, office hours, weekly growth, Bookface, Demo Day and the alumni network.',
  h1: 'What happens at Y Combinator: inside a three-month YC batch',
  tldr: 'As of November 2026, YC invests $500,000 in every company it accepts: $125,000 for a fixed 7% plus $375,000 on an uncapped SAFE with a most favored nation (MFN) clause. Then it runs a three-month, in-person program in San Francisco, four times a year. You get partner office hours, a group of batchmates, weekly talks and a weekly growth number to chase, and the program ends with Demo Day. Most of your time still goes on building and talking to users. After the batch, you keep partner access, Bookface and the alumni network.',
  minutes: 14,
  level: 'Beginner',
  steps: [
    {
      heading: 'What is the YC deal, in plain numbers?',
      body: [
        'YC’s deal page (checked November 2026) says it invests $500,000 per company on two SAFEs signed at the same time. A SAFE is an agreement that turns into shares at your next priced round. $125,000 is on a post-money SAFE for a fixed 7%. The other $375,000 is on an uncapped SAFE with an MFN clause: it converts on the best terms (usually the lowest cap) you give any investor between roughly the start of the batch and your priced round.',
        'YC gives its own example. If your next SAFEs have a $15M post-money cap, the $375,000 converts to 2.5%. YC also gets a right to invest in later rounds. The page says the money does not depend on hitting milestones and YC charges no fees. YC invests in US, Canadian, Cayman and Singapore companies.',
        'The apply page adds that YC invests as soon as a company is accepted, not when the batch starts. The FAQ says founders can use the money for living costs, such as a salary, and for travel to San Francisco.',
      ],
      example: {
        label: 'YC’s own example, worked through',
        code: true,
        text: '$125,000 post-money SAFE   -> fixed 7%\n$375,000 uncapped MFN SAFE  -> takes the lowest cap you later give anyone\nNext SAFEs at $15M cap      -> $375,000 / $15,000,000 = 2.5%\nTotal in that case          -> about 9.5% (7% + 2.5%), before later rounds',
      },
      keyIdea:
        'The 7% is fixed. What the other $375,000 buys depends on the cap you set when you raise next.',
    },
    {
      heading: 'When do batches run, and where?',
      body: [
        'YC used to run two batches a year. In "What I Did this Summer" (October 2005), written after the first three-month program, Paul Graham said YC would invest in one cycle in the summer and one in the winter each year. In January 2025, partner Dalton Caldwell announced that YC now runs four: Winter, Spring, Summer and Fall. One reason he gave was that more batches make it "more likely the timing works" for founders.',
        'As of November 2026, the apply page says the Winter 2027 batch runs January to March in San Francisco. On-time applications closed on November 2, and applicants who met the deadline get a decision by December 11. The Fall 2026 Demo Day is on Wednesday, December 2, in front of about 1,500 investors and media, according to YC’s Demo Day page.',
        'The FAQ says the batch is in person in San Francisco. YC ran remotely during Covid and has been back in person since 2022. Founders are expected to work full time on the company, and after the three months they can live wherever they want.',
      ],
      bullets: [
        'Winter: January to March. Spring: April to June (per YC’s 2025 announcement).',
        'YC does not list exact start dates for every batch in one place. Check ycombinator.com/apply for the current one.',
        'All batch events are optional, but the full-time commitment is not.',
      ],
    },
    {
      heading: 'What actually happens during the three months?',
      body: [
        'YC does not publish a week-by-week calendar. What its "What Happens at YC" page does state: in the first few weeks there is a 3-day, in-person kickoff to meet your batchmates, group partners and the YC team. Startups are sorted into 3 groups, each led by YC partners, and each group is split into sections of 6 to 10 companies.',
        'Partners hold group office hours every two weeks and one-on-one office hours "as often as founders want". Every week YC invites a well-known person from the startup world to speak, and talks are "strictly off the record to encourage candor". There are weekly meetups in San Francisco.',
        'The FAQ says that following every recommended activity takes "a few hours per week". That surprises people. The program is not a school. The rest of the week is yours to build the product and talk to users, which is the point.',
      ],
      flow: [
        'Accepted and funded',
        '3-day kickoff',
        'Office hours with your group partners',
        'Weekly talks and meetups',
        'Weekly growth number',
        'Demo Day',
        'Fundraising and alumni network',
      ],
      keyIdea:
        'YC events take a few hours a week. The batch works because founders spend the rest of the week building and selling.',
    },
    {
      heading: 'Why does everyone talk about weekly growth?',
      body: [
        'In "Startup = Growth" (September 2012), Graham writes that during YC "we measure growth rate per week, partly because there is so little time before Demo Day". A good rate is 5–7% a week. 10% a week is exceptional. 1% usually means you haven’t figured out what you are doing yet. He says to measure revenue if you charge, and active users if you don’t.',
        'His 2022 essay "What I’ve Learned from Users" explains how this connects to office hours. Founders decide which problems matter most, try fixes "at a resolution of a week or less", and report results at office hours the next week, so a wrong guess shows up fast. His summary: "Speed defines startups. Focus enables speed. YC improves focus."',
        'Airbnb is the example he uses. In "The Airbnbs" (December 2020), he says growth turned in late January 2009, about three weeks into YC. Fees went from $460 in the first week of February to $897, then $1,428.',
      ],
      example: {
        label: 'What a weekly rate means over the 11 weeks before Demo Day',
        code: true,
        text: '100 users, growing 1%/week  -> about 112 users\n100 users, growing 5%/week  -> about 171 users\n100 users, growing 7%/week  -> about 210 users\n100 users, growing 10%/week -> about 285 users',
      },
      bullets: [
        'Pick one number: revenue, or active users if you don’t charge yet.',
        'Set a weekly target and check it every Monday.',
        'When you miss, ask what the most important problem is and fix it within the week.',
      ],
    },
    {
      heading: 'How do batchmates and Bookface help?',
      body: [
        'Graham calls founders helping each other "the happiest thing" he learned at YC, and says YC was designed to amplify it ("What I’ve Learned from Users", 2022). It started early. After the first batch in 2005, he wrote that founders learned "a lot from one another" and that the weekly dinners saved several groups from overwork with no social life.',
        'YC’s about page describes Bookface as "the platform founders use to connect to one another". Founders tag their expertise and post questions or requests for introductions. The page says founders have 6,000+ domain experts they can call on, plus founder groups on WhatsApp and Bookface. A 2023 YC video says about one in three alumni use Bookface every day. That figure is YC’s own and not independently checked.',
        'In "Jessica Livingston" (November 2015), Graham credits his cofounder as the main reason the alumni network is so trusting and helpful.',
      ],
      keyIdea:
        'A batch is a peer group with the same deadline. The fastest help usually comes from a founder who solved your problem last month.',
    },
    {
      heading: 'What happens at Demo Day, and after it?',
      body: [
        'At Demo Day, the batch presents to an invite-only audience of investors and press. YC’s about page says that in the weeks after, YC keeps "in close touch" with startups as they negotiate the fundraising maze, helps read investor feedback and sometimes talks to investors directly. YC says its startups "tend to get higher valuations" than they otherwise might. That is YC’s claim, not independent data.',
        'The batch ends but the help doesn’t. "Office hours don’t stop after the YC program", the about page says. Alumni also get a yearly alumni reunion, an early look at each new batch at Alumni Demo Day, and discounts or free accounts for over 100 products. YC says many founders call the 11 weeks before Demo Day the most productive period of their lives.',
        'What is not public: the detailed weekly curriculum, how partners split their time between companies, acceptance rates, and private Demo Day results. If someone online claims to know these, ask for the source.',
      ],
    },
  ],
  keyTerms: [
    {
      term: 'Batch',
      meaning:
        'The group of startups YC funds at the same time and runs through the three-month program together, such as Winter 2027 (W27).',
    },
    {
      term: 'SAFE',
      meaning:
        'Simple Agreement for Future Equity: money now in exchange for shares later, when the company raises a priced round.',
    },
    {
      term: 'MFN (most favored nation)',
      meaning:
        'A clause that lets an investor convert on the best terms the company later gives anyone else, such as the lowest valuation cap.',
    },
    {
      term: 'Group partner and office hours',
      meaning:
        'The YC partners who lead your group. Office hours are your meetings with them: group sessions every two weeks, one-on-one as often as you want.',
    },
    {
      term: 'Bookface',
      meaning:
        'YC’s private online platform where founders and alumni ask questions, offer expertise and request introductions.',
    },
    {
      term: 'Demo Day',
      meaning:
        'The event at the end of the batch where each startup presents to an invite-only audience of investors and press.',
    },
  ],
  videos: [
    {
      youtubeId: 'EiRnSjcVIqk',
      title: 'Inside The Most Powerful Startup Community In The World',
      channel: 'Y Combinator',
      minutes: 6,
      why: 'YC’s own short tour of the batch, batchmates, alumni and Bookface. Watch it as YC’s pitch, and note what it says founders actually do with each other.',
    },
  ],
  tryIt: {
    title: 'Run a three-week mini batch on your own project',
    steps: [
      'Pick one number to grow: revenue, or weekly active users if you don’t charge yet. Write down this week’s value.',
      'Set a weekly target of 5–7% growth, the rate Graham calls good in "Startup = Growth".',
      'Every Monday, send a five-line update to two friends acting as your batchmates: the number, what you shipped, what you learned from a user, your biggest problem, one specific ask.',
      'Every two weeks, book 20 minutes with someone more experienced and treat it as office hours: bring your number and the one problem that matters most.',
      'After three weeks, compare your number with your target. If growth is near 1% a week, spend the next week on the product, not on marketing.',
    ],
    link: {
      label: 'Read YC’s "What Happens at YC" page',
      url: 'https://www.ycombinator.com/about',
    },
  },
  check: [
    {
      q: 'YC accepts you. Months later you raise SAFEs at a $15M post-money cap. Using YC’s own example, what does its $375,000 MFN SAFE convert to?',
      options: ['7%', '2.5%', '3.75%', 'Nothing until Demo Day'],
      answer: 1,
      why: 'The MFN SAFE takes the $15M cap you gave others: $375,000 is 2.5% of $15M. The separate $125,000 SAFE is the fixed 7%.',
    },
    {
      q: 'It is week 5 of your batch and you are growing 1% a week. By the standard in "Startup = Growth", what is the honest reading?',
      options: [
        'You are on track; 1% is normal during YC',
        'You probably haven’t figured out what you are doing yet, so focus on the product and users',
        'You should raise money now before it gets worse',
        'Growth does not matter until after Demo Day',
      ],
      answer: 1,
      why: 'Graham calls 5–7% a week good and says 1% usually means you haven’t figured out what you are doing yet. Fixing the product comes before fundraising.',
    },
    {
      q: 'You are stuck on a tax registration problem another YC company solved last year. What does YC’s structure point you to first?',
      options: [
        'Wait for the next weekly talk',
        'Hire a consultant before asking anyone',
        'Ask on Bookface or your section of batchmates, then raise it at office hours if still stuck',
        'Email investors for advice',
      ],
      answer: 2,
      why: 'YC describes Bookface as the place founders ask questions and find experts, and Graham says YC was designed to amplify founders helping each other.',
    },
  ],
  fromTheSource: [
    {
      who: 'Paul Graham',
      role: 'Cofounder of Y Combinator with Jessica Livingston, Robert Morris and Trevor Blackwell (2005).',
      work: 'How Y Combinator Started (essay, March 2012)',
      url: 'https://paulgraham.com/ycstart.html',
      idea: 'The batch was close to an accident. YC funded its first startups all at once in a summer program because that was a fast way to learn angel investing, and only later realised how much better it was to fund startups "synchronously" instead of one at a time.',
      breakdown: [
        'YC began in March 2005 with $200,000 from Graham, Robert Morris and Trevor Blackwell, and was modelled on the $10,000 seed deal that helped start Graham’s own company, Viaweb.',
        'Speakers at the first summer’s dinners came "in the spirit of someone coming to address a Boy Scout troop" and left saying some version of "these companies might actually succeed".',
        'Graham wrote in 2012 that the batch cycle was "still almost identical" to that first summer: a fixed group, a fixed deadline, dinners with speakers.',
      ],
      use: 'You don’t need YC to get the batch effect. Find two or three other founders on the same timeline and agree to show each other your numbers every week until a shared deadline.',
    },
    {
      who: 'Paul Graham',
      role: 'YC cofounder who ran office hours with thousands of founders.',
      work: 'What I’ve Learned from Users (essay, September 2022)',
      url: 'https://paulgraham.com/users.html',
      idea: 'Graham treats YC’s founders as its users and lists what they taught him: most startups share the same problems, founders often misjudge which problem matters most, and short weekly cycles with a partner fix both.',
      breakdown: [
        'YC split the batch into groups with dedicated partners after the summer 2012 batch, at 80 startups, overwhelmed the old system.',
        'Founders try solutions "at a resolution of a week or less" and report results at office hours the next week.',
        'Founders often don’t believe advice until experience teaches it, because startup lessons are counterintuitive.',
        'The happiest lesson: how generously founders help one another.',
      ],
      use: 'Each week, write your top three problems in order of importance and show the list to someone honest. If they would order it differently, talk about why before you start work.',
    },
  ],
  sources: [
    {
      label: 'Y Combinator: The YC Deal (checked Nov 2026)',
      url: 'https://www.ycombinator.com/deal',
    },
    { label: 'Y Combinator: What Happens at YC', url: 'https://www.ycombinator.com/about' },
    { label: 'Y Combinator: FAQ', url: 'https://www.ycombinator.com/faq' },
    { label: 'Y Combinator: Apply (Winter 2027 dates)', url: 'https://www.ycombinator.com/apply' },
    { label: 'Y Combinator: Demo Day', url: 'https://www.ycombinator.com/demoday' },
    {
      label: 'Dalton Caldwell, Announcing the YC Spring 2025 batch (Jan 2025)',
      url: 'https://www.ycombinator.com/blog/announcing-yc-x25/',
    },
    {
      label: 'Paul Graham, How Y Combinator Started (2012)',
      url: 'https://paulgraham.com/ycstart.html',
    },
    { label: 'Paul Graham, What I Did this Summer (2005)', url: 'https://paulgraham.com/sfp.html' },
    { label: 'Paul Graham, Startup = Growth (2012)', url: 'https://paulgraham.com/growth.html' },
    {
      label: 'Paul Graham, What I’ve Learned from Users (2022)',
      url: 'https://paulgraham.com/users.html',
    },
    { label: 'Paul Graham, The Airbnbs (2020)', url: 'https://paulgraham.com/airbnbs.html' },
    { label: 'Paul Graham, Jessica Livingston (2015)', url: 'https://paulgraham.com/jessica.html' },
    {
      label: 'Paul Graham, The Hardest Lessons for Startups to Learn (2006)',
      url: 'https://paulgraham.com/startuplessons.html',
    },
    {
      label: 'Y Combinator (YouTube), Inside The Most Powerful Startup Community In The World',
      url: 'https://www.youtube.com/watch?v=EiRnSjcVIqk',
    },
  ],
  faqs: [
    {
      q: 'How much does Y Combinator invest?',
      a: 'As of November 2026, $500,000 per company: $125,000 on a post-money SAFE for a fixed 7%, and $375,000 on an uncapped SAFE with an MFN clause that converts on the best terms you later give other investors. YC charges no fees. Check ycombinator.com/deal for the current terms.',
    },
    {
      q: 'What happens during Y Combinator?',
      a: 'A three-month, in-person program in San Francisco: a 3-day kickoff, group office hours every two weeks and one-on-one office hours with your group partners whenever you want, weekly off-the-record talks and meetups, and Demo Day at the end. YC measures progress by weekly growth. The events take a few hours a week; the rest is building.',
    },
    {
      q: 'Is Y Combinator worth it?',
      a: 'It depends on what you lack. You give up 7% plus whatever the $375,000 converts into. In return you get the money, partners who have seen thousands of startups, a batch of peers, Bookface and Demo Day. YC says its startups tend to raise at higher valuations after Demo Day, but that is YC’s claim. About 40% of each batch is just an idea, per YC’s FAQ, so you don’t need traction to apply.',
    },
  ],
  related: [
    { label: 'Next: How to get into YC', href: '/paul-graham/how-to-get-into-yc' },
    { label: 'Startup = growth', href: '/paul-graham/startup-equals-growth' },
    { label: 'What the first YC founders did', href: '/paul-graham/yc-founder-stories' },
    { label: 'How to raise money', href: '/paul-graham/how-to-raise-money' },
    { label: 'Founder’s office roles', href: '/founders-office' },
  ],
}
