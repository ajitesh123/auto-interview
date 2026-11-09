import type { PgLesson } from '../types'

export const lesson: PgLesson = {
  slug: 'how-to-raise-money',
  track: 'money',
  order: 0,
  title: 'How to raise money',
  metaTitle: 'How to Raise Money: Paul Graham’s Fundraising Rules',
  metaDescription:
    'Paul Graham’s "How to Raise Money" made practical: when to raise, how much, why investors follow each other, getting the first yes, closing, and SAFE basics.',
  h1: 'How to raise money: Paul Graham’s fundraising rules, step by step',
  tldr: 'Paul Graham’s advice is to raise only if you need it and investors want in, to treat every investor as a no until money is committed, and to talk to many in parallel, ranked by expected value. The first commitment is the hardest; after that, investors follow each other. Raise less than you hope, take good offers fast, close the money, and get back to work.',
  minutes: 15,
  level: 'Intermediate',
  steps: [
    {
      heading: 'Should you raise money at all?',
      body: [
        'Graham’s "How to Raise Money" (September 2013) starts with a filter: "Don’t raise money unless you want it and it wants you." Raise if fast growth would benefit from outside money, and if your growth makes investors want to invest. Many good businesses should do neither.',
        'His earlier "A Fundraising Survival Guide" (August 2008) adds the attitude to bring: approach fundraising as if it were always going badly, assume any deal can fall through, keep working on the startup, and know that consulting is the one fallback you can always count on.',
        'Being ramen profitable, covering the founders’ living costs, changes this. In ‘Ramen Profitable’ (July 2009) Graham writes that if investors know you need money, they’ll sometimes take advantage of you, and that the most obvious advantage of not needing money is better terms.',
      ],
      keyIdea:
        'The best position to raise from is not needing to. Get as close to ramen profitable as you can first.',
    },
    {
      heading: 'How much should you raise?',
      body: [
        'Graham describes a typical path. Phase 1: a few tens of thousands from something like YC or angels to get started. Phase 2: a few hundred thousand to a few million to build the company. Phase 3: later rounds once the company is clearly working. His rule of thumb is not to sell more than 25% in phase 2, and to assume the money you raise in phase 2 is the last you will ever raise.',
        'He says to underestimate how much you want. If you hope for $500k, say at first you are raising $250k. Reaching $150k then makes you more than half done, which tells investors you are doing well and that they must decide quickly because you are running out of room. Have several plans depending on how much you raise, and don’t raise too much: a big round usually means a high valuation you may not be able to raise sufficiently next time, and spending the money, mostly on people, makes profitability harder and the company slower to change direction. If you do raise a lot, he says, don’t spend it.',
        'At Startup School in 2018, YC’s Geoff Ralston suggested raising enough for about 18 months, and gave a rough seed-round dilution of 10% to maybe 20%, adding that if founders sell as much as 30%, YC starts to get "a little squirrelly". In 2023, YC group partner Brad Flora described a typical seed round as roughly $500,000 to a couple of million dollars.',
      ],
    },
    {
      heading: 'Why do investors follow each other?',
      body: [
        'In "Investor Herd Dynamics" (August 2013) Graham writes: "The biggest component in most investors’ opinion of you is the opinion of other investors." The reason is that judging startups is hard, even for the best investors, so when they see others want in, they assume there is a reason.',
        'Two rules from "How to Raise Money" follow. First, "Hear no till you hear yes": treat every investor as saying no until they make a definite offer with no conditions. Enthusiasm in a meeting is not a yes. Second, be in fundraising mode or not. Fundraising takes over your mind, so do it in one focused burst. Outside that burst, take money only from investors who need no convincing.',
        'In ‘Investor Herd Dynamics’ he adds a limit. Telling investor A that you are far along with investor B is fine, and you are safe so long as you are telling the truth, but be very careful about exaggerating interest to push someone to decide. "Do not, however, tell A who B is." VCs will sometimes ask which other VCs you are talking to; he says never tell them.',
      ],
      keyIdea:
        'Interest from one respected investor is what turns maybes into yeses. Everything before that is the hard part.',
    },
    {
      heading: 'How do you run the search?',
      body: [
        'Graham’s method: "Do breadth-first search weighted by expected value." Talk to investors in parallel, not one at a time. Expected value is how likely an investor is to say yes, multiplied by how good it would be if they did. A famous investor who is hard to convince can rank the same as an easy angel.',
        'Know where you stand by watching investors’ actions, not their words. Before you leave any meeting, ask what happens next and what more they need in order to decide. If there are several founders, pick one to handle fundraising so the others can keep working on the company. The best introduction is from a well-known investor who has just invested in you.',
        'Expect volume. Brad Flora described a YC company that met about 160 investors, got 39 yeses and took around four months to close.',
      ],
      example: {
        label: 'Ranking investors by expected value (amounts in lakh rupees)',
        code: true,
        text: 'Investor               P(yes)  Value if yes  Expected value\nAngel who knows space   0.5     25            12.5\nSeed fund, warm intro   0.2     100           20.0\nFamous angel, cold      0.05    50            2.5 (plus signal)\nFriend of a friend      0.6     5             3.0\n\nTalk to all of them this fortnight, in parallel.\nSpend most prep time on the top two rows.',
      },
    },
    {
      heading: 'How do you get the first yes and close?',
      body: [
        'Graham: "Getting the first substantial offer can be half the total difficulty of fundraising." A commitment of around $50k from a well-known VC or angel is often enough to get momentum going. Avoid investors who say they don’t lead; in practice that means no, unless you become a hot deal, so talk to them last if at all.',
        'Then three rules. Accept offers greedily: if someone makes an acceptable offer, take it rather than hold out for better. Close committed money: it is not a deal until the money is in the bank, so collect it promptly. And talk about whether they want to invest before you talk about price, because valuation is not that important. Getting the money comes first, good investors second, valuation third.',
        'Stop when it stops working, when you start to get a lot of air in the straw. And don’t get addicted. Fundraising is not what will make your company successful.',
      ],
      flow: [
        'Talk to many in parallel',
        'Get the first commitment',
        'Others follow',
        'Take acceptable offers',
        'Money in the bank',
        'Back to building',
      ],
    },
    {
      heading: 'What is a SAFE, and what if you are in India?',
      body: [
        'YC created the SAFE (simple agreement for future equity) in 2013; YC’s documents page credits Carolynn Levy. YC describes it as "a short contract an investor signs to fund your startup now" that converts into shares automatically when you raise a priced round. The term usually negotiated is the valuation cap. YC’s example: $1M for 15% means a post-money valuation cap of about $6.7M.',
        'The standard SAFE forms are written for US companies. YC also publishes cap versions for companies formed in Canada, the Cayman Islands and Singapore, and says to consult a lawyer licensed in the relevant country before using them. There is no Indian version on that page, so an Indian private limited company should get legal advice before signing one.',
        'If you apply to YC: its FAQ says it invests $500,000 in each company and that founders do not need to incorporate before applying. A company already incorporated outside YC’s accepted places must create a parent company in one of them to join, which YC says many companies in each batch do with lawyers YC connects them to. Check the FAQ for the current list.',
      ],
      example: {
        label: 'Post-money SAFE ownership, the YC way',
        code: true,
        text: 'Ownership = investment / post-money valuation cap\n\n$1,000,000 / $6,670,000 = ~15%\n$250,000 / $5,000,000  = 5%\n\nAdd up every SAFE you sign to see total dilution before your priced round.',
      },
    },
  ],
  keyTerms: [
    {
      term: 'Breadth-first search weighted by expected value',
      meaning:
        'Graham’s method: talk to many investors in parallel, giving more time to those with the highest chance of yes times value if they say yes.',
    },
    {
      term: 'Herd dynamics',
      meaning:
        'Investors rely heavily on what other investors think, so the first commitment makes later ones much easier.',
    },
    {
      term: 'Lead investor',
      meaning:
        'An investor willing to commit first and set terms. Graham says investors who won’t lead are effectively saying no unless you get hot.',
    },
    {
      term: 'SAFE',
      meaning:
        'Simple agreement for future equity: YC’s short contract where an investor pays now and gets shares when you raise a priced round.',
    },
    {
      term: 'Valuation cap',
      meaning:
        'The maximum valuation at which a SAFE converts into shares. It sets the minimum ownership the investor will get.',
    },
    {
      term: 'Ramen profitable',
      meaning:
        'Making enough to cover the founders’ living costs, which lets you raise from strength instead of need.',
    },
  ],
  videos: [
    {
      youtubeId: 'zBUhQPPS9AY',
      title: 'How Startup Fundraising Works | Startup School',
      channel: 'Y Combinator',
      minutes: 28,
      why: 'YC’s Brad Flora on how a seed round actually runs today and how SAFEs work. Watch for how many meetings a real raise took.',
    },
    {
      youtubeId: 'gcevHkNGrWQ',
      title: 'Fundraising Fundamentals By Geoff Ralston',
      channel: 'Y Combinator',
      minutes: 53,
      why: 'A longer YC lecture on how much to raise, valuation and dilution. Note it is from 2018, so check current numbers.',
    },
  ],
  tryIt: {
    title: 'Build an investor list ranked by expected value',
    steps: [
      'Write your plan in three sizes, as Graham suggests: what you do with a small, medium and large round.',
      'List 30 possible investors: angels who know your space, founders who have sold companies, seed funds, accelerators.',
      'For each, estimate P(yes) from 0 to 1 and the value if they say yes (money plus how much their name would help).',
      'Multiply to get expected value. Sort the list.',
      'Next to each, write who could introduce you. A recent investor in you is the best introducer.',
      'Write your one-page executive summary. Graham says it should be no more than a page.',
      'Set a fundraising window of a few focused weeks, and decide which founder runs it.',
    ],
    link: {
      label: 'Read Paul Graham’s "How to Raise Money"',
      url: 'https://paulgraham.com/fr.html',
    },
  },
  check: [
    {
      q: 'After a great meeting, an investor says "We love it, let’s keep talking." How should you treat this?',
      options: [
        'As a yes, and stop meeting others',
        'As a no until they make a definite offer with no conditions',
        'As a reason to raise your valuation',
        'As a signal to tell other investors they committed',
      ],
      answer: 1,
      why: 'Graham’s rule is "Hear no till you hear yes." Only a definite offer counts. Ask what happens next and keep talking to others in parallel.',
    },
    {
      q: 'You hope to raise $500k. How does Graham suggest you describe the round at first?',
      options: [
        'Say $1 million so you have room to negotiate down',
        'Say $500k exactly',
        'Say you are raising around $250k, so early commitments look like strong progress',
        'Refuse to name any amount',
      ],
      answer: 2,
      why: 'In "Underestimate how much you want" he uses this example: aim for $500k but say $250k at first. Hitting $150k then looks like momentum.',
    },
    {
      q: 'A respected angel offers $50k on fair terms, but you hope a bigger fund will offer more later. What does Graham advise?',
      options: [
        'Decline and wait for the fund',
        'Accept it; take acceptable offers greedily and get the money in the bank',
        'Ask the angel to wait until the fund decides',
        'Raise the price for the angel',
      ],
      answer: 1,
      why: 'The first substantial commitment can be half the difficulty, and Graham says to accept acceptable offers rather than hold out. Then close it: it is not a deal until the money is in the bank.',
    },
  ],
  fromTheSource: [
    {
      who: 'Paul Graham',
      role: 'Cofounder of Y Combinator, writing for founders raising their first rounds after YC.',
      work: 'How to Raise Money (essay, September 2013)',
      url: 'https://paulgraham.com/fr.html',
      idea: 'Fundraising is driven by two fears investors have, missing a startup that takes off and backing one that fizzles, and by how much they rely on each other. Founders should raise only when it makes sense, run a short parallel search, get the first commitment, and close fast.',
      breakdown: [
        'Treat investors as no until they make a definite offer with no conditions.',
        'Search breadth-first, weighted by expected value: chance of yes times value of yes.',
        'The first substantial offer can be half the difficulty; after it, others follow.',
        'Valuation matters less than getting the money and getting good investors.',
      ],
      use: 'Before your first investor meeting, write your list ranked by expected value, your three round sizes and one question to end every meeting: what happens next?',
    },
    {
      who: 'Geoff Ralston',
      role: 'Longtime Y Combinator partner and YC’s president from 2019 to 2022.',
      work: 'Fundraising Fundamentals (Startup School talk, 2018)',
      url: 'https://www.youtube.com/watch?v=gcevHkNGrWQ',
      idea: 'Raise enough to reach the milestones the next round’s investors will want to see, keep the paperwork simple with post-money SAFEs, avoid a valuation so high it kills the round, and then get back to building.',
      breakdown: [
        'Plan for around 18 months of runway at seed, tied to what the money will achieve.',
        'Post-money SAFEs make ownership easy to calculate: investment divided by the cap.',
        'Too high a valuation can stall a round; too low can over-dilute you.',
        'Once the round is done, the job is the product again.',
      ],
      use: 'Write down what you will hire and build with the money and how long it lasts. If you cannot, you are not ready to raise.',
    },
  ],
  sources: [
    {
      label: 'Paul Graham: How to Raise Money (September 2013)',
      url: 'https://paulgraham.com/fr.html',
    },
    {
      label: 'Paul Graham: Investor Herd Dynamics (August 2013)',
      url: 'https://paulgraham.com/herd.html',
    },
    {
      label: 'Paul Graham: A Fundraising Survival Guide (August 2008)',
      url: 'https://paulgraham.com/fundraising.html',
    },
    {
      label: 'Paul Graham: Ramen Profitable (July 2009)',
      url: 'https://paulgraham.com/ramenprofitable.html',
    },
    {
      label: 'Y Combinator: SAFE financing documents',
      url: 'https://www.ycombinator.com/documents',
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
  ],
  faqs: [
    {
      q: 'What is Paul Graham’s main advice on raising money?',
      a: 'Raise only if you want it and investors want you. Treat every investor as a no until they make a firm offer, talk to many in parallel ranked by expected value, get the first commitment, accept good offers quickly, and close the money.',
    },
    {
      q: 'How much should a startup raise in a seed round?',
      a: 'Graham says to underestimate what you want, have plans for several amounts, avoid raising too much, and not sell more than 25% in that round. YC’s Geoff Ralston suggested about 18 months of runway at seed in 2018.',
    },
    {
      q: 'Can an Indian startup use a YC SAFE?',
      a: 'YC’s SAFE forms are written for US companies, with separate versions for Canada, the Cayman Islands and Singapore, and YC says to consult a local lawyer. There is no Indian version, so get legal advice first. To join YC, a company incorporated elsewhere must create a parent in one of YC’s accepted jurisdictions.',
    },
  ],
  related: [
    { label: 'Default alive or default dead', href: '/paul-graham/default-alive-or-dead' },
    { label: 'Startup = growth', href: '/paul-graham/startup-equals-growth' },
    { label: 'How to get into YC', href: '/paul-graham/how-to-get-into-yc' },
    { label: 'What happens inside a YC batch', href: '/paul-graham/what-happens-at-yc' },
    { label: 'Founder’s office guide', href: '/founders-office' },
  ],
}
