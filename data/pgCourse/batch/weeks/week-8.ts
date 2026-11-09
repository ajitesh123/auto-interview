// Week 8: pricing and first revenue. Sources opened Nov 9, 2026; see `sources`.
import type { BatchWeek } from '../types'

export const week: BatchWeek = {
  week: 8,
  slug: 'week-8',
  phase: 2,
  title: 'Pricing and first revenue',
  metaTitle: 'YC Batch Week 8: Pricing and Your First Revenue',
  metaDescription:
    'Week 8 of a YC batch, run yourself: set a price from the value you create using YC partners’ pricing frameworks, quote it to 10 users and get one to pay.',
  h1: 'Week 8: put a price in front of users and get paid',
  tldr: 'YC partners say most startups charge too little and start too late. This week you set a price from the value you create, using Kevin Hale’s and Tom Blomfield’s YC pricing frameworks, quote it to 10 users in person, and get at least one to pay or sign a commitment.',
  minutes: 45,
  atYc: {
    body: [
      'In YC’s talks and videos, partners keep returning to one point. Kevin Hale (Startup School, 2019) lists prices that are too low first among four common pricing mistakes. Dalton Caldwell, in a short 2019 YC video, says many startups charge a small fraction of what they could and should raise prices sharply. In a 2022 YC partner episode, “Turning Your Users Into Paying Customers”, the partners say the advice to start charging comes up in nearly every batch, and that a paid pilot proves far more than a free one.',
      'Founders report the other half of the advice: don’t agonise over the number. Val Yermakova, a cofounder of Warmly, wrote in July 2020, during YC’s summer batch, that when they asked their partner how to price, the answer was a literal “LOL” and “Choose something decent and go with it”, then focus on getting paying customers. Her reading of the advice: don’t optimise price while you have double-digit users.',
      'The two views fit together: charge now, pick a sensible price, and raise it as you learn. As for revenue expectations, Rafael Garcia (Kernel, S25) wrote that “The top-tier startups in a YC batch today often have $300k–$500k ARR by Demo Day”. That describes the top of the batch, not a requirement, and YC does not publish revenue figures for batches.',
    ],
    confidence: 'documented',
    sources: [
      {
        label: 'YC blog: Startup School week 7 recap, Kevin Hale on pricing (2019)',
        url: 'https://www.ycombinator.com/blog/startup-school-week-7-recap-kevin-hale-on-conversion-rates-and-pricing/',
      },
      {
        label: 'Transcript: Most Startups Are Undercharging, Dalton Caldwell (Rosetta)',
        url: 'https://rosetta.to/u/ycombinator/most-startups-are-undercharging-dalton-caldwell?t=51',
      },
      {
        label: 'Transcript: Turning Your Users Into Paying Customers, YC partners (Rosetta, 2022)',
        url: 'https://rosetta.to/u/ycombinator/turning-your-users-into-paying-customers',
      },
      {
        label:
          'Val Yermakova (Warmly): Week 3 in Y Combinator, three things YC changed our minds on',
        url: 'https://www.warmly.ai/blog/week-3-in-y-combinator-three-things-yc-has-changed-our-minds-on',
      },
      {
        label: 'Rafael Garcia (Kernel, S25): YC, take two',
        url: 'https://www.raf.xyz/blog/01-yc-take-two',
      },
    ],
  },
  challenge: {
    name: 'The 10 prices challenge',
    task: 'Quote a specific price to 10 current or likely users this week, in a live conversation, and get at least one to pay or sign a written commitment to pay: a payment, a deposit, an invoice they accept or a paid pilot with a start date.',
    proof:
      'A pricing log with 10 rows: who, the price you quoted, what they said right after hearing it, and the outcome (paid, committed, objected, no). At least one row says paid or committed, with the receipt, invoice or signed note attached.',
    basis:
      'Kevin Hale’s “Startup Pricing 101” (2019) and Tom Blomfield’s “How To Price For B2B” (2024), both YC Startup School, and Gustaf Alströmer’s advice to charge your first customers.',
  },
  frameworks: [
    {
      name: 'The pricing thermometer and the 10-5-20 rule',
      who: 'Kevin Hale, YC partner and Wufoo cofounder (Startup School, 2019)',
      source: {
        label: 'Kevin Hale - Startup Pricing 101',
        url: 'https://www.youtube.com/watch?v=jwXlo9gy_k4',
      },
      explain: [
        'Hale argues that pricing returns more on effort than anything else; YC’s recap of his talk heads that section “Monetization gives you the biggest bang for your buck”. He cites a survey of more than 500 SaaS companies to argue that effort on pricing pays back more than the same effort on getting or keeping customers.',
        'His picture is a thermometer with three marks: cost at the bottom, price in the middle, value at the top. The gap between price and cost is your reason to sell. The gap between value and price is the customer’s reason to buy. Cost-plus pricing starts from the bottom; value-based pricing starts from the top, and he recommends it because it lets you charge far more.',
        'His four common mistakes: prices too low, costs underestimated, value not understood, and the wrong customers. Early adopters, roughly the first 2–5% of a market, “care more about benefits than price”, and a very low price can make them doubt the product.',
        'His rule of thumb, the 10-5-20 rule: set the price so the value is about 10 times the price, raise it in steps of about 5%, and stop when you are losing about 20% of deals. To compare prices, keep a simple table of each price, its conversion rate, volume and revenue.',
      ],
      steps: [
        'Estimate the value to one customer per month: time saved times what that time costs them, money they gain, or losses you prevent.',
        'Set a first price at about a tenth of that value.',
        'Check your cost to serve one customer. The price should sit well above it.',
        'Quote it to early adopters with the problem, not to bargain hunters.',
        'Log every quote: price, yes or no, and the reason for any no.',
        'Raise the price for new customers in small steps. When about 1 in 5 say no because of price, you are near Hale’s level.',
      ],
      example: {
        label: 'Illustrative: pricing a clinic booking tool in India (made-up numbers)',
        text: 'Front desk time on bookings: 6 h a week × 4 weeks × ₹200/h  = ₹4,800 a month\nMissed sessions: 8 a month × ₹800; reminders recover half    = ₹3,200 a month\nValue to the clinic                                        ≈ ₹8,000 a month\n10x rule → first price                                     ≈ ₹800 a month\nCost to serve (SMS, hosting)                               ≈ ₹150 a month\n\nThen raise about 5% for each new batch of clinics until roughly 1 in 5 says no on price.',
      },
    },
    {
      name: 'The value equation for B2B pricing',
      who: 'Tom Blomfield, YC group partner (Startup School, July 2024)',
      source: {
        label: 'How To Price For B2B | Startup School',
        url: 'https://www.youtube.com/watch?v=4hjiRmgmHiU',
      },
      explain: [
        'Blomfield starts with the value equation, worked out with a champion inside the customer: the money saved, time saved or revenue gained. Let the champion attack your assumptions, because they will have to defend the number to their boss or finance team. His example: 100 support agents at a fully loaded $100K each cost $10M a year, so a tool that removes 20% of that work is worth about $2M a year.',
        'Charge a share of that value, roughly 25–50% (in the talk he suggests about a third), so the customer keeps most of it. Cost is the floor, never the starting point: software should earn high gross margins (he suggests 80–90%), and free cloud or AI credits should be counted as real costs because they run out. Don’t compete on price; make the comparison unequal through a niche, integrations or features.',
        'Copy how the buyer already pays for similar software (per seat, by usage, flat fee) and keep it simple. Keep pilots short, two to four weeks, with success measures taken from the value equation, or sign an annual contract with a 30–60 day money-back guarantee. Ask the champion what they can approve without finance or legal, and keep the first deal under that.',
        'If you don’t know where to start, begin near comparable software and raise about 50% with each new customer. Once you lose more than about a quarter of deals on price, you are probably close. Note the difference from Hale: Blomfield’s big steps suit a handful of early B2B deals; Hale’s 5% steps suit many smaller sales. Both stop at a similar loss rate.',
      ],
      steps: [
        'Find a champion at a customer and list where your product saves money, saves time or adds revenue.',
        'Put a number on each, together, and let them challenge your assumptions.',
        'Price at roughly 25–50% of the yearly value, and check it is well above your cost.',
        'Match how they already buy software, and keep the first deal under the champion’s approval limit.',
        'Offer a paid pilot of 2–4 weeks with success measures, or an annual contract with a money-back guarantee.',
        'Quote the next customer about 50% more. Count how many deals you lose on price.',
      ],
      example: {
        label: 'Blomfield’s numbers from the talk, laid out',
        text: 'Value equation\n100 agents × $100K fully loaded       = $10M a year in support cost\nTool removes 20% of the work           = about $2M a year of value\nCharge 25–50% of value                 = $500K–$1M a year\n\nStarting price when unsure\nCustomer 1: $10K → customer 2: $15K → customer 3: about $22K\nStop raising when you lose more than about 25% of deals on price',
      },
    },
  ],
  videos: [
    {
      youtubeId: 'jwXlo9gy_k4',
      title: 'Kevin Hale - Startup Pricing 101',
      channel: 'Y Combinator',
      minutes: 18,
      why: 'The pricing thermometer, the four mistakes and the 10-5-20 rule. Watch the whole thing before you set your price.',
    },
    {
      youtubeId: '4hjiRmgmHiU',
      title: 'How To Price For B2B | Startup School',
      channel: 'Y Combinator',
      minutes: 18,
      why: 'Blomfield’s value equation and his advice on pilots and free trials. Watch it if you sell to businesses.',
    },
  ],
  assignments: [
    {
      id: 'w8-value',
      text: 'Estimate the value of your product to one customer, in money, per month or year.',
      why: 'Hale and Blomfield both start from value, not cost.',
      done: 'A three-line calculation you would be willing to show a customer.',
    },
    {
      id: 'w8-price',
      text: 'Set your first price and write the one sentence you will say when you quote it.',
      why: 'Warmly’s partners’ advice: choose something decent and go with it. A price you never say out loud teaches you nothing.',
      done: 'A price, a billing unit (per month, per seat, per use) and the sentence.',
    },
    {
      id: 'w8-quote',
      text: 'Quote the price to 10 current or likely users in live conversations and log what they say right after.',
      why: 'YC partners in the 2022 episode say the reaction just after you name the price is the most honest signal you will get.',
      done: '10 rows in your pricing log with their words, not your summary.',
    },
    {
      id: 'w8-close',
      text: 'Ask each interested person to pay or commit, and send the payment link or invoice the same day.',
      why: 'YC group partner Gustaf Alströmer: if you don’t charge them, they are not customers. A yes that is not paid or signed is not a customer yet.',
      done: 'At least one payment or signed commitment.',
    },
    {
      id: 'w8-free',
      text: 'Decide what happens to your free users: keep the earliest on an old price, or give them a date when paid plans start.',
      why: 'YC partners suggest keeping early users on old prices while charging new users more, rather than never charging.',
      done: 'A decision written down and the message sent to free users.',
    },
  ],
  officeHours: [
    {
      q: 'Are you charging yet? If not, why not?',
      why: 'YC partners say the advice to start charging comes up in nearly every batch (“Turning Your Users Into Paying Customers”, 2022).',
    },
    {
      q: 'In money, what is your product worth to one customer?',
      why: 'Blomfield’s value equation and Hale’s thermometer both start here.',
    },
    {
      q: 'What did they say right after you told them the price?',
      why: 'In the 2022 partner episode, the first seconds after hearing the price are described as the best signal of real demand.',
    },
    {
      q: 'How many deals have you lost on price?',
      why: 'Hale’s 10-5-20 rule stops around 20% lost; Blomfield’s around 25%. If you have lost none, you are probably too cheap.',
    },
    {
      q: 'Is your main pitch that you are cheaper?',
      why: 'Dalton Caldwell: competing mainly on a low price attracts buyers who only want the cheapest option and tells you little about whether the product is good.',
    },
    {
      q: 'Is this pilot paid?',
      why: 'YC partners say a paid pilot shows the champion will spend budget and reputation on you; a free one proves much less.',
    },
  ],
  weeklyUpdate: {
    metric: 'revenue or commitments, and prices quoted',
    prompt:
      'Week 8: your price and how you set it, the number of quotes, how many paid or committed, the main objections in users’ words, revenue to date, and your one number against target.',
  },
  checkpoint:
    'Ten prices quoted in live conversations, reactions logged, and at least one payment or signed commitment. Hale’s 10-5-20 rule (YC Startup School, 2019) says to keep raising until you lose about 20% of deals; if nobody pushed back, your price is probably too low.',
  faqs: [
    {
      q: 'When should an early startup start charging?',
      a: 'YC partners say early, and that the advice comes up in nearly every batch. Free can work only with a deliberate path to revenue, such as a free tier with a clear limit people pay to remove. Giving the product away and hoping people pay later is the pattern they warn against.',
    },
    {
      q: 'Should I offer a free trial or a pilot?',
      a: 'For B2B, Blomfield suggests short pilots of 2–4 weeks with agreed success measures, or an annual contract with a 30–60 day money-back guarantee. Alströmer also suggests money-back or opt-out terms instead of open-ended free use.',
    },
    {
      q: 'How much revenue do YC companies have by Demo Day?',
      a: 'YC doesn’t publish it. Rafael Garcia (Kernel, S25) wrote that top-tier companies often have $300K–$500K in annual revenue by Demo Day, and YC CEO Garry Tan told CNBC the Winter 2025 batch grew 10% a week in aggregate. Most companies have less, so compare yourself with your own last week.',
    },
  ],
  sources: [
    {
      label: 'YC blog: Startup School week 7 recap, Kevin Hale on pricing (2019)',
      url: 'https://www.ycombinator.com/blog/startup-school-week-7-recap-kevin-hale-on-conversion-rates-and-pricing/',
    },
    {
      label: 'YC Startup Library: Startup pricing 101',
      url: 'https://www.ycombinator.com/library/6h-startup-pricing-101',
    },
    {
      label: 'YouTube: Kevin Hale - Startup Pricing 101',
      url: 'https://www.youtube.com/watch?v=jwXlo9gy_k4',
    },
    {
      label: 'Transcript: Kevin Hale, Startup Pricing 101 (Rosetta)',
      url: 'https://rosetta.to/u/ycombinator/kevin-hale-startup-pricing-101',
    },
    {
      label: 'YouTube: How To Price For B2B | Startup School (Tom Blomfield)',
      url: 'https://www.youtube.com/watch?v=4hjiRmgmHiU',
    },
    {
      label: 'Transcript: How To Price For B2B (Rosetta)',
      url: 'https://rosetta.to/u/ycombinator/how-to-price-for-b2b-startup-school',
    },
    {
      label: 'Transcript: Most Startups Are Undercharging, Dalton Caldwell (Rosetta)',
      url: 'https://rosetta.to/u/ycombinator/most-startups-are-undercharging-dalton-caldwell?t=51',
    },
    {
      label: 'Transcript: Turning Your Users Into Paying Customers, YC partners (Rosetta, 2022)',
      url: 'https://rosetta.to/u/ycombinator/turning-your-users-into-paying-customers',
    },
    {
      label: 'Transcript: How to Get Your First Customers, Gustaf Alströmer (Rosetta)',
      url: 'https://rosetta.to/u/ycombinator/how-to-get-your-first-customers-startup-school',
    },
    {
      label: 'Val Yermakova (Warmly): Week 3 in Y Combinator, three things YC changed our minds on',
      url: 'https://www.warmly.ai/blog/week-3-in-y-combinator-three-things-yc-has-changed-our-minds-on',
    },
    {
      label: 'Rafael Garcia (Kernel, S25): YC, take two',
      url: 'https://www.raf.xyz/blog/01-yc-take-two',
    },
    {
      label: 'CNBC (via NBC New York): YC startups are fastest growing in fund history (Mar 2025)',
      url: 'https://www.nbcnewyork.com/news/business/money-report/y-combinator-startups-are-fastest-growing-most-profitable-in-fund-history-because-of-ai/6188199/',
    },
  ],
}
