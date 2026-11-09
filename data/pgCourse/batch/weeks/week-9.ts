// Week 9: fundraising fundamentals and default alive. Sources opened Nov 9, 2026; see `sources`.
// Facts on the YC deal and Demo Day match the verified lessons what-happens-at-yc.ts and
// how-to-raise-money.ts. Video IDs checked with YouTube oEmbed on Nov 9, 2026.
import type { BatchWeek } from '../types'

export const week: BatchWeek = {
  week: 9,
  slug: 'week-9',
  phase: 3,
  title: 'Default alive and your investor list',
  metaTitle: 'YC Batch Week 9: Default Alive and Fundraising Basics',
  metaDescription:
    'Week 9 of a YC batch, run yourself: work out if you are default alive, learn SAFEs and how YC founders raise a seed round, and rank 30 investors. Free.',
  h1: 'Week 9: know if you are default alive, then build your investor list',
  tldr: 'In the last month of the batch, YC founders get ready to raise a seed round, and partners teach them how the round works before anyone pitches. This week you work out whether you are default alive and on what date, learn how SAFEs and valuation caps work, and build a ranked list of 30 investors.',
  minutes: 100,
  atYc: {
    body: [
      'YC funds every company the same way before the raise starts. As of November 2026, its deal page says it invests $500,000: $125,000 on a post-money SAFE for a fixed 7%, and $375,000 on an uncapped SAFE with a most favoured nation (MFN) clause. That second SAFE converts on the best terms, usually the lowest cap, that you later give other investors. So the cap you pick for your seed round also sets what YC’s $375,000 buys.',
      'The raise itself is timed to the end of the batch. In a May 2024 interview on the 20VC podcast, YC partner Tom Blomfield said YC tells founders not to start raising until about two weeks before Demo Day, so that investors compete in one short window instead of picking off nervous founders early with weak offers. He also described YC’s investor database, in which founders review the investors they have dealt with, and said investors with poor reviews struggle to get meetings. YC partners describe the same database in a 2023 YC video on investor horror stories.',
      'Founders describe the same rhythm. Aditya Jayaprakash, cofounder of Blacksmith (YC W24), wrote: “The YC machine is built around helping companies raise a seed round towards the end of the batch.” His team started with friends, family and YC alumni angels, then took about 70 calls in two weeks. Jeffrey Ip of Confident AI (YC W25) wrote that he had 55 calls booked for the week before his March 12, 2025 Demo Day.',
      'What is not public: the exact week partners start fundraising talks, the content of any internal fundraising session, and the database itself, which is for YC founders only. If you are running this outside YC, you build your own version of that list this week.',
    ],
    confidence: 'documented',
    sources: [
      {
        label: 'Y Combinator: The YC Deal (checked Nov 2026)',
        url: 'https://www.ycombinator.com/deal',
      },
      {
        label: '20VC: Tom Blomfield, Do the Best All Raise Pre-Demo Day (May 2024, transcript)',
        url: 'https://rosetta.to/u/20vc/tom-blomfield-do-the-best-all-raise-pre-demo-day-yc-s-fundraising-advice-to-star',
      },
      {
        label: 'Y Combinator: Startup Experts Share Their Investor Horror Stories (2023)',
        url: 'https://www.youtube.com/watch?v=ljVan7CGBiE',
      },
      {
        label: 'Aditya Jayaprakash (Blacksmith, W24): What it was like going through YC W24',
        url: 'https://www.blacksmith.sh/blog/going-through-yc-winter-24',
      },
      {
        label: 'Jeffrey Ip (Confident AI, W25): How I closed a $2.2M seed round in 5 days',
        url: 'https://www.confident-ai.com/blog/how-i-closed-confident-ais-2-2m-seed-round-in-5-days',
      },
    ],
  },
  challenge: {
    name: 'The runway and 30 investors challenge',
    task: 'By Sunday, work out from your real bank balance, costs and revenue whether you are default alive, and the month you either turn profitable or run out of cash. Then build a list of 30 real, named investors ranked by expected value, each with a way to reach them.',
    proof:
      'A one-page sheet with your three numbers, a month-by-month table, the verdict (alive or dead) and the date. A second sheet of 30 named investors with P(yes), value if yes, expected value and an introduction path, sorted, with at least 10 of the top 15 having a named person who could introduce you.',
    basis:
      'Paul Graham’s “Default Alive or Default Dead?” (2015), his “How to Raise Money” (2013) rule of breadth-first search weighted by expected value, and Geoff Ralston’s “A Guide to Seed Fundraising” (YC, 2016) on sizing the round.',
  },
  frameworks: [
    {
      name: 'Default alive or default dead',
      who: 'Paul Graham, YC cofounder (essay, October 2015)',
      source: {
        label: 'Paul Graham, Default Alive or Default Dead?',
        url: 'https://paulgraham.com/aord.html',
      },
      explain: [
        'Graham’s question: if your expenses stay flat and your revenue keeps growing at the rate it has over the last several months, do you reach profitability on the money you have left? If yes, you are default alive. If no, you are default dead, and your survival depends on someone giving you more money.',
        'He says it is the first thing he wants to know about a startup that has been operating for more than 8 or 9 months, and that half the founders he asks don’t know. The answer changes the conversation: default alive means you can talk about ambitious next steps; default dead means the talk is about how to save the company.',
        'It matters this week because it sets how you raise. A default-alive founder can walk away from bad terms. Graham warns that default-dead founders often assume it will be easy to raise more money; when it isn’t, and growth is slow with too little time to fix it, he calls that the fatal pinch. Geoff Ralston makes a related point in his 2018 YC talk “Fundraising Fundamentals”: the best time to raise is when you don’t need the money, because investors can spot desperation.',
      ],
      steps: [
        'Write down three numbers from your bank statement, not your plan: cash in the bank today, monthly expenses (include founder salaries if you pay them), and this month’s revenue.',
        'Work out your recent monthly revenue growth rate from the last three to six months. If you have no revenue, write zero and say so.',
        'Step forward one month at a time: revenue grows by that rate, expenses stay flat, and you subtract the gap from cash. Trevor Blackwell, one of YC’s founders, built a calculator for this, linked from Graham’s essay.',
        'Stop when revenue covers expenses (default alive: note the month) or when cash goes below zero (default dead: note the month).',
        'If you are dead, rerun it twice: once with your growth rate a few points higher, once with expenses cut. Write down which lever flips you to alive, and the date you would switch to that plan without new money.',
        'Rerun it whenever you consider a hire. Graham calls hiring too fast “by far the biggest killer of startups that raise money.”',
      ],
      example: {
        label: 'Illustrative: two founders in Bengaluru, amounts in lakh rupees',
        text: 'Cash ₹30L. Expenses ₹3L a month. Revenue ₹0.5L a month.\nSimple runway: 30 / (3 − 0.5) = 12 months\n\nA) Revenue grows 15% a month\nMonth 6:  revenue 1.16, cash left 17.0\nMonth 12: revenue 2.68, cash left 10.7\nMonth 13: revenue 3.08 → profitable. DEFAULT ALIVE (month 13)\n\nB) Revenue grows 8% a month\nMonth 9:  revenue 1.00, cash left 9.7\nMonth 14: revenue 1.47, cash left 1.1\nMonth 15: cash runs out. DEFAULT DEAD (month 15)\n\nC) 8% growth, expenses cut to ₹2.5L\nMonth 21: revenue 2.52 → profitable with ₹4.7L left. ALIVE, barely\n\nSame math in dollars or any currency.',
      },
    },
    {
      name: 'How a seed round works: amount, SAFE, cap, list, close',
      who: 'Geoff Ralston, former YC president (“Fundraising Fundamentals”, 2018, and “A Guide to Seed Fundraising”, 2016), Brad Flora, YC group partner (“How Startup Fundraising Works”, 2023), and Paul Graham (“How to Raise Money”, 2013)',
      source: {
        label: 'Y Combinator: A Guide to Seed Fundraising (Geoff Ralston, 2016)',
        url: 'https://www.ycombinator.com/blog/how-to-raise-a-seed-round/',
      },
      explain: [
        'A seed round is a set of separate investments, usually on SAFEs, that you collect from many investors one at a time. Brad Flora describes a typical seed round as roughly $500,000 to a couple of million dollars, and the SAFE YC created in 2013 as a document of about five pages whose two negotiated terms are usually just the amount and the valuation cap. Ralston’s guide gives a typical seed dilution of up to about 20%, and says to try not to go beyond 25%.',
        'Start with the amount, not the valuation. Ralston says to raise enough to reach profitability, or the milestones the next investors will want to see, which is usually 12 to 18 months away. YC’s documents page shows how the cap then follows: decide how much you want and what share you will sell, and divide. $1M for 15% gives a post-money cap of about $6.7M. With a post-money SAFE, each investor’s share is simply their money divided by the cap.',
        'Then run the search. Graham’s method is breadth-first search weighted by expected value: talk to many investors in parallel, ranking them by the chance they say yes times how much a yes is worth. Ralston adds three rules: research each investor, get warm introductions, and never leave a meeting without trying to close or at least agreeing clear next steps. Flora’s example of how hard this is: one YC company, Fresh Paint, met 160 investors and got 39 yeses over about four and a half months, raising $1.6M.',
        'If you are in India: YC’s SAFE forms are written for US companies, with cap versions for Canada, the Cayman Islands and Singapore, and YC says to consult a lawyer licensed in the relevant country. There is no Indian version. YC’s FAQ says a company incorporated elsewhere must set up a parent company in the US, Canada, Singapore or the Cayman Islands to join YC. Get legal advice before you sign anything.',
      ],
      steps: [
        'Write what the money pays for: people, months and the milestone it gets you to. Ralston’s rough sizing in 2016 was about $15,000 a month per engineer; use your own local costs.',
        'Pick the amount, then the share you will sell (10–20% is the typical seed range Ralston gives). Divide to get your post-money cap.',
        'Add up every SAFE you would sign, including YC’s 7% and its MFN SAFE if you are in YC, to see your total dilution before a priced round.',
        'List 30 investors: angels who know your space, founders who have sold companies, seed funds that back your kind of company. For each, write P(yes) from 0 to 1, value if yes (money plus how much their name helps), and multiply.',
        'Next to each, name who could introduce you. Graham says the best introducer is a well-known investor who has just invested in you; next best is a founder they backed.',
        'Sort by expected value. Plan to talk to all of them in one short window, not one at a time.',
      ],
      example: {
        label: 'Illustrative: what a seed SAFE and YC’s MFN SAFE add up to',
        text: 'Seed: $1,000,000 on a $10M post-money cap → 10%\nYC fixed SAFE ($125K)                     → 7%\nYC MFN SAFE ($375K) converts at the lowest cap:\n  $375,000 / $10,000,000                  → 3.75%\nTotal sold before a priced round ≈ 20.75%\n\nYC’s own example: a $15M cap turns the $375K into 2.5%.\n\nInvestor list (first rows of 30)\nInvestor                 P(yes) Value  EV\nAngel, ex-founder, space  0.5    25    12.5\nSeed fund, warm intro     0.2   100    20.0\nFamous angel, cold        0.05   50     2.5\nFriend of a friend        0.6     5     3.0',
      },
    },
  ],
  videos: [
    {
      youtubeId: 'zBUhQPPS9AY',
      title: 'How Startup Fundraising Works | Startup School',
      channel: 'Y Combinator',
      minutes: 28,
      why: 'YC’s Brad Flora on what a seed round is, how SAFEs work and how many meetings a real raise takes. Watch for the 160-meeting example.',
    },
    {
      youtubeId: 'gcevHkNGrWQ',
      title: 'Fundraising Fundamentals By Geoff Ralston',
      channel: 'Y Combinator',
      minutes: 53,
      why: 'The longer YC lecture on when to raise, how much, dilution and post-money SAFE math. It is from 2018, so check today’s numbers.',
    },
  ],
  assignments: [
    {
      id: 'w9-numbers',
      text: 'Pull your three numbers from your bank and payment records: cash, monthly expenses, monthly revenue and its growth rate.',
      why: 'Graham’s test only works on real numbers, not plans.',
      done: 'Three numbers written down with the date and where each came from.',
    },
    {
      id: 'w9-alive',
      text: 'Run the default-alive calculation month by month and write the verdict and the date.',
      why: 'It decides whether you raise from strength or need.',
      done: 'A table ending in “alive, month X” or “dead, month Y”, plus the lever that would flip it.',
    },
    {
      id: 'w9-planb',
      text: 'If you are default dead, write a one-page plan to survive without new money: what you cut, what you sell, and the date you switch to it.',
      why: 'Graham’s advice for default-dead startups is not to count on investors and to decide when you would switch.',
      done: 'One page with a switch date. Skip if you are default alive.',
    },
    {
      id: 'w9-round',
      text: 'Write your round in three sizes (small, medium, large), each with what it pays for, the cap and the share sold.',
      why: 'Ralston says to tie the amount to milestones; Graham says to have several plans.',
      done: 'Three lines like “$500K at $5M post: 10%, 14 months, gets us to X”.',
    },
    {
      id: 'w9-list',
      text: 'Build your ranked list of 30 investors with P(yes), value, expected value and an intro path for each.',
      why: 'YC founders raise in one short window; you need the list ready before it opens.',
      done: '30 named rows, sorted by expected value, with intro paths for at least 10 of the top 15.',
    },
    {
      id: 'w9-safe',
      text: 'Read YC’s post-money SAFE user guide and work out what your cap means for your ownership after every SAFE you plan to sign.',
      why: 'Founders who skip the math find out their dilution at the priced round.',
      done: 'A short cap table: founders, each SAFE, total sold.',
    },
  ],
  officeHours: [
    {
      q: 'Are you default alive or default dead, and on what date?',
      why: 'Paul Graham says it is the first thing he wants to know about a startup more than 8 or 9 months old, and that half of founders don’t know.',
    },
    {
      q: 'How much are you raising, what does it pay for, and how many months does it last?',
      why: 'Ralston’s rule in “Fundraising Fundamentals” is to raise enough to hit the milestones the next round needs, about 18 months at seed.',
    },
    {
      q: 'What share of the company will you have sold after every SAFE converts?',
      why: 'Ralston gives 10–20% as normal at seed, and Tom Blomfield has said that 25–30% is too much.',
    },
    {
      q: 'Who are your first ten investors, and who introduces you to each?',
      why: 'Ralston and Graham both say warm introductions from people investors trust beat cold email.',
    },
    {
      q: 'If no one invests, what do you do on the day the money runs out?',
      why: 'Graham’s advice to default-dead founders is to have a plan B and a date to switch, not to count on investors.',
    },
  ],
  weeklyUpdate: {
    metric: 'runway months and default-alive verdict',
    prompt:
      'Week 9: report your one number, your cash, monthly burn, whether you are default alive or dead and the date, the round size you plan, and how many of your 30 investors have a named intro path.',
  },
  checkpoint:
    'You know whether you are default alive and the month it turns, you have a round size with a cap you can explain, and a sorted list of 30 investors with intro paths, ready for Paul Graham’s parallel, expected-value search (“How to Raise Money”, 2013).',
  faqs: [
    {
      q: 'When do YC founders start fundraising?',
      a: 'Near the end of the batch. YC partner Tom Blomfield said in May 2024 that YC tells founders to start about two weeks before Demo Day, not before, so investors compete in one window. YC does not publish an official fundraising calendar.',
    },
    {
      q: 'What does default alive mean?',
      a: 'Paul Graham’s test: with expenses flat and revenue growing at its recent rate, you reach profitability before the money runs out. If not, you are default dead and depend on raising more.',
    },
    {
      q: 'Can an Indian company raise on a YC SAFE?',
      a: 'YC’s SAFE forms are for US companies, with versions for Canada, the Cayman Islands and Singapore, and YC says to consult a local lawyer. There is no Indian version, so get legal advice before signing.',
    },
  ],
  sources: [
    {
      label: 'Paul Graham, Default Alive or Default Dead? (2015)',
      url: 'https://paulgraham.com/aord.html',
    },
    { label: 'Paul Graham, How to Raise Money (2013)', url: 'https://paulgraham.com/fr.html' },
    { label: 'Trevor Blackwell: default alive calculator', url: 'http://growth.tlb.org/' },
    {
      label: 'Y Combinator: A Guide to Seed Fundraising (Geoff Ralston, 2016)',
      url: 'https://www.ycombinator.com/blog/how-to-raise-a-seed-round/',
    },
    {
      label: 'Y Combinator: SAFE financing documents',
      url: 'https://www.ycombinator.com/documents',
    },
    {
      label: 'Y Combinator: The YC Deal (checked Nov 2026)',
      url: 'https://www.ycombinator.com/deal',
    },
    { label: 'Y Combinator: FAQ', url: 'https://www.ycombinator.com/faq' },
    {
      label: 'Geoff Ralston: Fundraising Fundamentals (Y Combinator, 2018)',
      url: 'https://www.youtube.com/watch?v=gcevHkNGrWQ',
    },
    {
      label: 'Brad Flora: How Startup Fundraising Works, Startup School (Y Combinator, 2023)',
      url: 'https://www.youtube.com/watch?v=zBUhQPPS9AY',
    },
    {
      label: '20VC: Tom Blomfield, Do the Best All Raise Pre-Demo Day (May 2024, transcript)',
      url: 'https://rosetta.to/u/20vc/tom-blomfield-do-the-best-all-raise-pre-demo-day-yc-s-fundraising-advice-to-star',
    },
    {
      label: 'Y Combinator: Startup Experts Share Their Investor Horror Stories (2023)',
      url: 'https://www.youtube.com/watch?v=ljVan7CGBiE',
    },
    {
      label: 'Aditya Jayaprakash (Blacksmith, W24): What it was like going through YC W24',
      url: 'https://www.blacksmith.sh/blog/going-through-yc-winter-24',
    },
    {
      label: 'Jeffrey Ip (Confident AI, W25): How I closed a $2.2M seed round in 5 days',
      url: 'https://www.confident-ai.com/blog/how-i-closed-confident-ais-2-2m-seed-round-in-5-days',
    },
  ],
}
