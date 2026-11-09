import type { PgLesson } from '../types'

export const lesson: PgLesson = {
  slug: 'default-alive-or-dead',
  track: 'money',
  order: 0,
  title: 'Default alive or default dead',
  metaTitle: 'Default Alive or Default Dead? Paul Graham’s Test',
  metaDescription:
    'Paul Graham’s default alive test: will you reach profitability on the cash you have? The math with a worked example, the fatal pinch, and what to do if dead.',
  h1: 'Default alive or default dead? How to run Paul Graham’s survival test',
  tldr: 'You are default alive if, with expenses flat and revenue growing at its recent rate, you reach profitability before the money runs out. If not, you are default dead and your survival depends on investors. Paul Graham says half the founders he asks don’t know which they are. Work it out now, because the most common way funded startups die is hiring too fast, and by the time you notice, it can be too late to raise.',
  minutes: 12,
  level: 'Intermediate',
  steps: [
    {
      heading: 'What question does Paul Graham ask first?',
      body: [
        'In ‘Default Alive or Default Dead?’ (October 2015), Graham says that when he talks to a startup that has been running for more than 8 or 9 months, the first thing he wants to know is whether it is default alive or default dead. "Half the founders I talk to don’t know whether they’re default alive or default dead."',
        'The answer changes the whole conversation. If the company is default alive, he says, they can talk about ambitious new things it could do. If it is default dead, the conversation is about how to save it.',
      ],
      keyIdea: 'Know which one you are before anyone asks you.',
    },
    {
      heading: 'How do you calculate it?',
      body: [
        'Graham’s definition: assume your expenses stay the same and your revenue keeps growing at the rate it has over the last several months. Do you reach profitability on the money you have left? If yes, you are default alive. If no, you are default dead.',
        'You need three numbers: money in the bank, monthly expenses, and monthly revenue with its recent growth rate. Then step forward one month at a time until revenue covers expenses or the cash runs out. Trevor Blackwell, one of YC’s founders, made a calculator for this, and Graham links it from the essay.',
        'The example below uses made-up numbers. Notice two things: growth buys you far more time than simple “cash divided by burn” suggests, and a small change in growth rate or costs can flip the answer.',
      ],
      example: {
        label:
          'Illustrative numbers: $600k in the bank, $80k a month in expenses, $20k a month in revenue',
        code: true,
        text: 'Simple runway: 600k / (80k - 20k) = 10 months\n\nA) Revenue grows 10% a month\nMonth  Revenue  Burn   Cash left\n  3     26.6k   53.4k   433k\n  6     35.4k   44.6k   290k\n  9     47.2k   32.8k   179k\n 12     62.8k   17.2k   110k\n 15     83.5k     0     95k   -> profitable. DEFAULT ALIVE\n\nB) Revenue grows 8% a month\n  9     40.0k   40.0k   150k\n 12     50.4k   29.6k    50k\n 14     58.7k   21.3k     3k\n 15     63.4k   16.6k   -14k  -> out of cash. DEFAULT DEAD\n\nC) 8% growth, but expenses held at 65k (one fewer hire)\n 15     63.4k    1.6k   211k\n 16     68.5k     0    211k   -> profitable. DEFAULT ALIVE',
      },
      bullets: [
        'Use real numbers from your bank statement, not plans.',
        'Use the growth rate of the last three to six months, not the best month.',
        'Same math works in rupees or any currency.',
      ],
    },
    {
      heading: 'Why don’t founders know, and what is the fatal pinch?',
      body: [
        'Graham gives two reasons. Early on the question seems meaningless, so founders get out of the habit of asking, and later it becomes critical without anyone noticing the switch. And founders assume it will be easy to raise more money, which is often false.',
        'He wrote about where that leads in ‘The Fatal Pinch’ (December 2014). The company has a meaningful amount of money in the bank, is losing a lot each month, revenue growth is weak, and the plan is to raise more before the money runs out. "That last sentence is the fatal one." In the later essay he sums the pinch up as default dead, plus slow growth, plus not enough time to fix it.',
        'Raising again is harder than the first time for three reasons: you now spend more, investors hold already-funded companies to a higher standard, and you now look like a possible failure. That is why YC tells founders who raise money to act as if it is the last they will ever get.',
      ],
      flow: [
        'Default dead',
        'Slow growth',
        'Few months left',
        'Plan: “we’ll raise”',
        'Fatal pinch',
      ],
    },
    {
      heading: 'What usually makes a startup default dead?',
      body: [
        'Graham says hiring too fast is by far the biggest killer of startups that raise money. Founders hire because successful startups have lots of employees, so it looks like the thing to do. And most overestimate how many people they need.',
        'The deeper problem is that growth is weak because the product is not good enough yet. Hiring people, he says, is rarely the way to fix that. Fast growth usually comes from a product that meets a big need, and spending is only loosely tied to growth. In a footnote he quotes Sam Altman: "I think it’s roughly correct to say that YC’s most successful companies have never been the fastest to hire."',
        'The ‘18 Mistakes That Kill Startups’ (2006) said the same thing a decade earlier: the classic way to burn through cash is by hiring a lot of people.',
      ],
      bullets: [
        'Before each hire, rerun the calculation with that salary added. If it flips you to default dead, wait.',
        'Ask whether growth is slow because you lack people, or because the product is not yet something people want.',
      ],
      keyIdea: 'If growth is slow, more people rarely fix it. A better product does.',
    },
    {
      heading: 'What should you do if you are default dead?',
      body: [
        'In the 2015 essay, Graham’s advice is not to count on investors. Work out precisely what you would need to do to survive without new money, and when you would switch to that plan.',
        '‘The Fatal Pinch’ gives three options. Shut down, if failure is certain. Cut expenses, including non-salary costs and anyone you already know should go. Or make more money: consider having everyone work on selling, and change the question from “do you want to buy our product?” to “what do you need that you’d pay a lot for?” He says to lean toward cutting if overhiring caused the problem, and toward revenue if the team is small.',
        'The safe place to aim for is ramen profitable. In ‘Ramen Profitable’ (July 2009) he defines it as making just enough to pay the founders’ living expenses, which means you are no longer at the mercy of investors. He adds it is not the destination; the goal is still to grow big. And he ends ‘The Fatal Pinch’ with hope: plenty of successful startups have passed through near-death experiences and gone on to flourish.',
      ],
      bullets: [
        'Write your “survive without investors” plan on one page: what you cut, what you sell, and the date you start.',
        'Rerun the calculation every month. Start asking early; Graham says worrying too early is far less dangerous than worrying too late.',
      ],
    },
  ],
  keyTerms: [
    {
      term: 'Default alive',
      meaning:
        'With expenses flat and revenue growing at its recent rate, the company reaches profitability on the money it has.',
    },
    {
      term: 'Default dead',
      meaning:
        'On current numbers, the money runs out before profitability. Survival depends on raising more.',
    },
    {
      term: 'Fatal pinch',
      meaning:
        'Graham’s name for being default dead, growing slowly, and without enough time to fix it, while counting on raising more.',
    },
    {
      term: 'Ramen profitable',
      meaning:
        'Making just enough to pay the founders’ living expenses, so you no longer depend on investors to survive.',
    },
    {
      term: 'Burn',
      meaning: 'How much more you spend than you earn each month.',
    },
    {
      term: 'Overhiring',
      meaning:
        'Hiring faster than the business needs. Graham calls it by far the biggest killer of startups that raise money.',
    },
  ],
  videos: [
    {
      youtubeId: '0OVSTWozvfY',
      title: 'Save Your Startup During an Economic Downturn',
      channel: 'Y Combinator',
      minutes: 36,
      why: 'YC partners apply Graham’s default alive test to real situations. Focus on why founders avoid the math and the hard choices that get a company to default alive.',
    },
  ],
  tryIt: {
    title: 'Compute your default alive date',
    steps: [
      'Collect three numbers: cash in the bank today, average monthly expenses for the last 3 months, and monthly revenue for the last 6 months.',
      'Work out your average monthly revenue growth rate over those months.',
      'In a spreadsheet, roll forward month by month: revenue grows by that rate, expenses stay flat, cash drops by the gap. Or use Trevor Blackwell’s calculator linked below.',
      'Write down the answer: default alive (and the month you reach profit) or default dead (and the month cash hits zero).',
      'If you are default dead, write one line each for: what you would cut, what you would sell, and when you would switch plans.',
      'No startup yet? Run it for a startup you admire using numbers from its public interviews, or for your own personal savings and spending.',
    ],
    link: {
      label: 'Trevor Blackwell’s Startup Growth Tool (linked from the essay)',
      url: 'http://growth.tlb.org/',
    },
  },
  check: [
    {
      q: 'A startup has $300k, spends $50k a month, earns $10k a month, and revenue has been flat for six months. Which is it?',
      options: [
        'Default alive, because it has six months of cash',
        'Default dead, because flat revenue never reaches $50k before the cash runs out',
        'Default alive, if it can raise a seed round',
        'Cannot be known without a valuation',
      ],
      answer: 1,
      why: 'With flat revenue the $40k burn never shrinks, so $300k lasts about 7.5 months and profitability never arrives. Planning to raise does not change the answer; that is the fatal pinch.',
    },
    {
      q: 'A default dead startup with slow growth plans to fix things by hiring five salespeople with its remaining money. What would Graham warn?',
      options: [
        'Good plan, more people means more growth',
        'Hiring is rarely the fix; slow growth usually means the product isn’t good enough yet, and the hires bring the end closer',
        'Only hire engineers, never salespeople',
        'Hire, but raise a bigger round first',
      ],
      answer: 1,
      why: 'He calls hiring too fast by far the biggest killer of startups that raise money, and says hiring people is rarely the way to fix weak growth.',
    },
    {
      q: 'Your team is three founders with no employees, and you are default dead. Per ‘The Fatal Pinch’, where should you lean first?',
      options: [
        'Fire people',
        'Shut down immediately',
        'Make more money: everyone sells, and ask customers what they need that they would pay a lot for',
        'Wait for the market to improve',
      ],
      answer: 2,
      why: 'He says to lean toward cutting if overhiring caused the trouble, and toward making more money if you only have a handful of people.',
    },
  ],
  fromTheSource: [
    {
      who: 'Paul Graham',
      role: 'Co-founder of Y Combinator, essayist',
      work: 'Default Alive or Default Dead? (essay, October 2015)',
      url: 'https://paulgraham.com/aord.html',
      idea: 'Every startup older than about 8 or 9 months should know whether, on current expenses and growth, it reaches profitability on the cash it has. Half the founders he asks don’t.',
      breakdown: [
        'Three inputs: cash, expenses, and the recent revenue growth rate.',
        'Founders avoid the question because it once seemed meaningless and because they assume they can raise more.',
        'Hiring too fast is by far the biggest killer of startups that raise money.',
        'Ask too early rather than too late; an early alarm can keep you out of the fatal pinch.',
      ],
      use: 'Put the calculation in a sheet you update every month, and rerun it before every hire.',
    },
    {
      who: 'Paul Graham',
      role: 'Co-founder of Y Combinator, essayist',
      work: 'The Fatal Pinch (essay, December 2014)',
      url: 'https://paulgraham.com/pinch.html',
      idea: 'Many startups pass through a point a few months before they die: money in the bank, heavy losses, weak growth, and a plan to raise more. That plan is the fatal part.',
      breakdown: [
        'A second raise is harder: you spend more, investors expect more, and you look like a possible failure.',
        'YC tells founders who raise money to act as if it is the last they will ever get.',
        'Ways out: shut down, cut expenses, or make more money by asking customers "what do you need that you’d pay a lot for?"',
      ],
      use: 'Treat your current cash as all you will ever get, and plan so that you reach profitability on it.',
    },
  ],
  sources: [
    {
      label: 'Paul Graham, Default Alive or Default Dead? (Oct 2015)',
      url: 'https://paulgraham.com/aord.html',
    },
    { label: 'Paul Graham, The Fatal Pinch (Dec 2014)', url: 'https://paulgraham.com/pinch.html' },
    {
      label: 'Paul Graham, Ramen Profitable (Jul 2009)',
      url: 'https://paulgraham.com/ramenprofitable.html',
    },
    {
      label: 'Paul Graham, The 18 Mistakes That Kill Startups (Oct 2006)',
      url: 'https://paulgraham.com/startupmistakes.html',
    },
    {
      label: 'Trevor Blackwell, Startup Growth Tool (calculator linked from the essay)',
      url: 'http://growth.tlb.org/',
    },
    {
      label: 'Y Combinator, Save Your Startup During an Economic Downturn (video)',
      url: 'https://www.youtube.com/watch?v=0OVSTWozvfY',
    },
  ],
  faqs: [
    {
      q: 'What does default alive mean?',
      a: 'A term from Paul Graham’s 2015 essay. A startup is default alive if, with expenses staying the same and revenue growing at its recent rate, it reaches profitability before running out of money. Otherwise it is default dead.',
    },
    {
      q: 'How do I calculate if my startup is default alive?',
      a: 'Take your cash in the bank, monthly expenses and recent monthly revenue growth. Project month by month: revenue grows at that rate, expenses stay flat, cash falls by the gap. If revenue overtakes expenses before cash hits zero, you are default alive.',
    },
    {
      q: 'Is default alive the same as profitable?',
      a: 'No. A default alive startup can still be losing money today. It just reaches profitability on the cash it already has, if current growth continues.',
    },
  ],
  related: [
    { label: 'Next: How to raise money', href: '/paul-graham/how-to-raise-money' },
    { label: 'The mistakes that kill startups', href: '/paul-graham/mistakes-that-kill-startups' },
    { label: 'Startup = growth', href: '/paul-graham/startup-equals-growth' },
    { label: 'Founder’s office career guide', href: '/founders-office' },
    { label: 'Chief of staff career guide', href: '/chief-of-staff' },
  ],
}
