// Objection handling owner page: /blog/ai-roleplay-objection-handling-scripts-scenarios-results-2026
// Every number on the page comes from SOURCES below (all opened 19 Nov 2026).
// Objection lines are Gong's own examples (300M+ cold calls page) unless `origin` says otherwise.
// "Often means", the first question and the sample answers are written by us and labelled so.
// The answer checker is pure string rules (no AI); each rule names the source it comes from.

export const CHECKED = '19 Nov 2026'

export const TTAI_URL =
  'https://www.toughtongueai.com/?utm_source=autointerviewai&utm_medium=blog&utm_campaign=objection-handling'

export const SOURCES = {
  gong300m: {
    label: 'Gong: the top objections across 300M+ cold calls (31 Jul 2024)',
    url: 'https://www.gong.io/blog/we-found-the-top-objections-across-300m-cold-calls-heres-how-to-handle-them-all',
  },
  gongDemos: {
    label: 'Gong: handling sales objections, 67,149 call recordings (12 Mar 2018)',
    url: 'https://www.gong.io/blog/handling-sales-objections',
  },
  gongCold: {
    label: 'Gong: cold calling tips from 100,000+ cold calls (3 May 2018)',
    url: 'https://www.gong.io/blog/cold-calling-tips/',
  },
  salesforce: {
    label:
      'Salesforce State of Sales, 7th edition (4,050 sales professionals, fieldwork Aug–Sep 2025)',
    url: 'https://www.salesforce.com/en-us/wp-content/uploads/sites/4/documents/reports/sales/salesforce-state-of-sales-report-2026.pdf',
  },
  bridge: {
    label: 'Bridge Group: SDR tenure and ramp time, 2025 (351 B2B companies)',
    url: 'https://bridgegroupinc.com/research/sdr-tenure-and-ramp-time',
  },
  carew: {
    label: 'Selling Power: Jeff Seeley (CEO, Carew International) on LAER (18 Dec 2023)',
    url: 'https://sellingpower.com/blog/a-simple-four-step-approach-to-mastering-sales',
  },
  richardson: {
    label: 'Richardson: resolving sales objections (30 Aug 2017)',
    url: 'https://www.richardson.com/sales-resources/how-to-overcome-objections-in-sales/',
  },
  sandler: {
    label: 'Sandler: objections aren’t the end, they’re the beginning (7 May 2025)',
    url: 'https://go.sandler.com/bestsalespeople/insights/blog/categories/sales-process/objections-aren-t-the-end-they-re-the-beginning-/',
  },
  feelFelt: {
    label: 'ChangingMinds.org: feel, felt, found',
    url: 'https://changingminds.org/disciplines/sales/objection/feel_felt_found.htm',
  },
  ftc: {
    label: 'eCFR: 16 CFR 310.4(b)(1)(iii)(A), Telemarketing Sales Rule (current text)',
    url: 'https://www.ecfr.gov/current/title-16/chapter-I/subchapter-C/part-310/section-310.4',
  },
  ftcB2b: {
    label: 'eCFR: 16 CFR 310.6(b)(7), business-to-business exemption',
    url: 'https://www.ecfr.gov/current/title-16/chapter-I/subchapter-C/part-310/section-310.6',
  },
  icoLive: {
    label: 'ICO: how do we comply with the rules on live marketing calls? (10 Sep 2025)',
    url: 'https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-direct-marketing-using-live-calls/how-do-we-comply-with-the-rules-on-live-marketing-calls/',
  },
  icoB2b: {
    label: 'ICO: business-to-business marketing (22 May 2025)',
    url: 'https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/business-to-business-marketing/',
  },
} as const

/** Gong, 300M+ cold calls: share of all objections by kind (published figures). */
export const GONG = {
  dismissive: 49.5,
  situational: 42.6,
  existing: 7.9,
  top5Share: 74,
  /** Gong, 67,149 recorded demo calls: average reps' answer to an objection. */
  avgMonologueSec: 21.45,
  demoCalls: 67149,
}

export const SALESFORCE = { roleplayTooFew: 41, rarelyFeedback: 46, sellers: 4050, countries: 22 }
export const BRIDGE = { rampMonths: 3.0, tenureYears: 1.9, companies: 351 }

/** We assume a speaking pace of 150 words a minute for the time estimate. Our assumption, not a source. */
export const WORDS_PER_MINUTE = 150

export type Group = 'dismissive' | 'situational' | 'existing' | 'later' | 'stop'

export const GROUPS: Record<Group, { label: string; blurb: string }> = {
  dismissive: {
    label: 'Brush-offs',
    blurb: 'Gong calls these dismissive: a reaction to the interruption, not to your offer.',
  },
  situational: {
    label: 'Money and timing',
    blurb: 'Gong calls these situational: price, budget, bandwidth or fit.',
  },
  existing: {
    label: 'Already solved',
    blurb: 'Gong calls these existing-solution objections: in-house, a competitor or a contract.',
  },
  later: {
    label: 'After the first call',
    blurb:
      'Not on Gong’s cold-call list, but common later in a deal: authority, stalls, proposals and trust. Written by us.',
  },
  stop: {
    label: 'A request to stop',
    blurb:
      'Not an objection. UK rules require you to honour it, B2B calls included; in the US the rule covers consumer calls.',
  },
}

export interface Objection {
  id: string
  group: Group
  /** As Gong writes it, unless origin says otherwise. */
  line: string
  origin: 'gong' | 'ours'
  /** Our reading of what usually sits behind it. */
  means: string
  /** The first question to ask (ours). */
  ask: string
  /** A sample answer (ours). Under ~20 seconds out loud. */
  answer: string
  /** A weak answer, for the checker's "load a weak answer" button (ours). */
  weak: string
  /** What not to say, and why. */
  avoid: string
  /** The smallest next step to ask for. */
  next: string
}

export const OBJECTIONS: Objection[] = [
  {
    id: 'not-interested',
    group: 'dismissive',
    line: 'Not interested',
    origin: 'gong',
    means:
      'Usually a reflex to the interruption. They have not heard enough to be uninterested yet.',
    ask: 'Totally fair, I called out of the blue. Can I ask what you assumed I was calling about?',
    answer:
      "That's fair, you didn't expect my call. I called because new reps often take about three months to ramp. Is ramp time something you're working on this year, or is it fine as it is?",
    weak: 'I understand, but if you just give me two minutes I can show you why our platform is the best on the market and why so many companies love it.',
    avoid:
      '"Just give me two minutes": it argues with the brush-off and asks for more of the interruption.',
    next: 'Permission for one question, then a 15-minute call if the problem is real.',
  },
  {
    id: 'send-info',
    group: 'dismissive',
    line: 'Send me some information',
    origin: 'gong',
    means:
      'Often a polite way to end the call. Sometimes real interest from someone who prefers reading.',
    ask: 'Happy to. So I send something useful rather than a brochure, what would you want it to answer?',
    answer:
      "Happy to send it. So it isn't a generic brochure, which of these matters more to you: new-rep ramp or win rates on late-stage deals? I'll send the one page on that, and if it's useful, could we look at it together on Thursday for 15 minutes?",
    weak: 'Sure, I can send our deck and some case studies over by email today, and I will follow up with you next week to see what you thought.',
    avoid: 'Just taking the email. Without one question the email has no reason to be opened.',
    next: 'One question that shapes what you send, plus a time to go through it.',
  },
  {
    id: 'call-later',
    group: 'dismissive',
    line: 'Call me in 6 months',
    origin: 'gong',
    means: 'Timing may be real (a budget cycle, a reorg) or it may be a softer "no".',
    ask: 'Sure. What happens in six months that makes it a better time?',
    answer:
      "Sure, I can do that. So I call at the right moment, what changes in six months: a new budget, a new quarter, new hires? If it's hiring, the time to prepare is usually before the new reps start. When do they start?",
    weak: "No problem, I'll put a reminder in my calendar and call you back in six months. Thanks for your time and have a great day.",
    avoid:
      'Booking the callback without asking why. You lose the one fact that tells you when to call.',
    next: 'The reason for the date, and a dated callback they agree to.',
  },
  {
    id: 'not-my-job',
    group: 'dismissive',
    line: 'Not my responsibility',
    origin: 'gong',
    means: 'Either true, or they do not want to own a new project. Both are useful to know.',
    ask: 'Thanks for telling me. Who does own rep onboarding there?',
    answer:
      'Thanks, that saves us both time. Who owns onboarding for new reps there: enablement or each sales manager? When I reach them, can I say we spoke, or would you rather I did not mention you?',
    weak: 'Oh okay. Well, I really think our platform would help your whole company, so I would love to be transferred to whoever handles this.',
    avoid:
      'Asking to be transferred straight away. You skip the chance to learn how the decision is made.',
    next: 'A name and a role, and whether you may use theirs.',
  },
  {
    id: 'in-a-meeting',
    group: 'dismissive',
    line: 'I’m in a meeting',
    origin: 'gong',
    means: 'Usually true. Respecting it is the whole answer.',
    ask: 'Sorry, I will be quick. Is later today or tomorrow morning better?',
    answer:
      'Sorry for interrupting, I will let you go. It is about how new reps practise objections before live calls. Would tomorrow at 10 or Friday at 2 be better for ten minutes?',
    weak: 'Oh, this will only take a second, I promise. I just wanted to quickly tell you about our new platform and what it can do for your team.',
    avoid: '"It will only take a second": they told you they cannot talk.',
    next: 'Two specific times to choose from.',
  },
  {
    id: 'cold-call',
    group: 'dismissive',
    line: 'Is this a cold call?',
    origin: 'gong',
    means: 'A test of honesty. Dodging it ends the call.',
    ask: 'It is. Do you want to hang up, or give me 30 seconds and then decide?',
    answer:
      'Yes, it is a cold call. You can hang up, or give me 30 seconds on why I called you and then decide. Fair?',
    weak: "No, no, it's not really a cold call, I was just reaching out because I saw your company online and thought you might be interested in what we do.",
    avoid:
      'Denying it. In Gong’s 2018 cold-call study, stating your reason for calling went with a 2.1x higher success rate; a dodge hides it.',
    next: 'Permission for 30 seconds.',
  },
  {
    id: 'where-number',
    group: 'dismissive',
    line: 'Where’d you get my number!?',
    origin: 'gong',
    means: 'A privacy worry. Answer it straight; it may turn into a stop request.',
    ask: 'Fair question. It came from [source]. Would you like me to take it off our list?',
    answer:
      'Fair question. It came from [your source]. I called about how your new reps practise objections. Would you like me to take your number off our list, or carry on for 30 seconds?',
    weak: 'It was in our database. Anyway, the reason I am calling is that we help sales teams like yours close more deals with our amazing platform.',
    avoid:
      'Brushing past the question. Name the source and offer to take the number off your list.',
    next: 'Their choice: off the list, or 30 seconds.',
  },
  {
    id: 'too-expensive',
    group: 'situational',
    line: 'Too expensive',
    origin: 'gong',
    means:
      'Expensive compared with what? Another quote, last year’s budget, or a value they cannot see yet.',
    ask: 'Compared with what you have budgeted, or with another option you are looking at?',
    answer:
      "That's fair, it isn't cheap. Compared with what: another quote, or the budget you have for this? If it's the budget, would starting with one team of 10 make the number work?",
    weak: 'I hear you, but honestly our price is actually really competitive and you get so much value from our platform that it pays for itself very quickly.',
    avoid:
      '"Honestly, it pays for itself": an unproven claim that skips finding out what "expensive" means.',
    next: 'The comparison they are making, then a smaller first scope.',
  },
  {
    id: 'no-budget',
    group: 'situational',
    line: 'No budget',
    origin: 'gong',
    means: 'No budget this quarter, no budget for you, or no budget owner on the call.',
    ask: 'Is that no budget this year, or no budget line for this yet?',
    answer:
      'Understood. Is that no budget this quarter, or no budget line for training at all? If your budget year starts in April, what would you need to see before then to put it in the plan?',
    weak: 'I understand, but we have flexible payment plans and discounts available, so budget should not really be a problem for you at all.',
    avoid: 'Offering a discount at once. It answers a question they did not ask.',
    next: 'When budgets are set, and what evidence they need before then.',
  },
  {
    id: 'no-bandwidth',
    group: 'situational',
    line: 'No resources / bandwidth',
    origin: 'gong',
    means: 'They fear a rollout project more than the cost.',
    ask: 'What would a rollout have to look like for it to fit this quarter?',
    answer:
      'Makes sense, nobody wants another rollout. What is taking your team’s time this quarter? If a pilot took one hour of a manager’s week, would that fit, or is even that too much right now?',
    weak: "But our setup is really easy and our team will do everything for you, so you won't need any resources at all, I promise.",
    avoid: '"You won’t need any resources": nobody believes it, and it is rarely true.',
    next: 'The real time cost they can accept, stated as a number.',
  },
  {
    id: 'hire-first',
    group: 'situational',
    line: 'We need to hire someone first',
    origin: 'gong',
    means: 'A real sequence. The new hire may be your buyer.',
    ask: 'Who are you hiring, and when do they start?',
    answer:
      'That makes sense. Who are you hiring, an enablement lead or more reps? If it is reps, the first weeks are when practice matters most. Could we talk two weeks before they start?',
    weak: 'Okay, no worries. Just let me know when you have hired them and we can talk then. Here is my number in case you need it.',
    avoid: 'Waiting for them to call back. They will not.',
    next: 'The start date, and a call booked before it.',
  },
  {
    id: 'not-for-us',
    group: 'situational',
    line: 'Product fit (not made for us)',
    origin: 'gong',
    means: 'They may be right. Find out which part does not fit before you defend it.',
    ask: 'Which part feels like it is not for you?',
    answer:
      'You may be right, and if it is a real mismatch I will say so. Which part feels wrong for you: the sales motion, a team size under 5, or the language your reps sell in?',
    weak: 'Actually, our product works for every kind of company, so I am sure it would be a great fit for you too once you see it.',
    avoid: '"It works for everyone": it tells them you did not listen.',
    next: 'The specific mismatch, and an honest yes or no on fit.',
  },
  {
    id: 'in-house',
    group: 'existing',
    line: 'We do it in-house',
    origin: 'gong',
    means: 'They have a process and some pride in it. Learn how it works.',
    ask: 'How do you run it today, and what would you change about it?',
    answer:
      'Good to hear you have a process. How does it work today: managers playing the buyer, call reviews, or both? If you could change one part of it, what would it be?',
    weak: 'In-house solutions are usually not as good as a dedicated platform like ours, so you should really consider switching over to us.',
    avoid: 'Criticising their process. They built it.',
    next: 'How it works now, and the one thing they would change.',
  },
  {
    id: 'competitor',
    group: 'existing',
    line: 'Competitor (known)',
    origin: 'gong',
    means: 'They chose someone. The opening is what that choice does not cover.',
    ask: 'What made you pick them, and is there anything you wish it did?',
    answer:
      'Makes sense to have something in place. What made you pick them? And if you could add one thing it doesn’t do today, what would it be?',
    weak: 'Oh, they are okay, but we are much better than them in every way and a lot of their customers have already switched to us.',
    avoid: 'Attacking the competitor. It makes them defend their own decision.',
    next: 'Their reason, and one gap in the current tool.',
  },
  {
    id: 'contract',
    group: 'existing',
    line: 'Stuck in a contract',
    origin: 'gong',
    means: 'The decision date is the renewal date. That is useful.',
    ask: 'When does it renew, and when would you start looking?',
    answer:
      'Understood, contracts are contracts. When does it renew? If it is in March, could I send you a one-page comparison in December? What would you want it to show?',
    weak: 'We can help you get out of your contract early, and we might even be able to cover some of the cost of switching over to us.',
    avoid: 'Pushing to break the contract on the first call.',
    next: 'The renewal date and what they would compare.',
  },
  {
    id: 'boss',
    group: 'later',
    line: 'I need to run it by my boss',
    origin: 'ours',
    means: 'Often true, and a sign they are not the only decision maker. Help them sell it inside.',
    ask: 'Of course. What will your boss ask you first?',
    answer:
      'Of course, that makes sense. What will your boss ask you first: the cost, or the time it takes your team? I can send you a one-page summary that answers it. Would it help if I joined that conversation for 10 minutes?',
    weak: 'Sure, but can you not just make the decision yourself? It would be a lot faster and I am sure your boss would agree with you anyway.',
    avoid: 'Asking them to go around their boss. It puts them in a corner.',
    next: 'The boss’s first question, and an offer to join the meeting.',
  },
  {
    id: 'think-about-it',
    group: 'later',
    line: 'Let me think about it',
    origin: 'ours',
    means: 'There is a concern they have not said yet. Find it before you leave.',
    ask: 'Sure. What part do you want to think through?',
    answer:
      'Sure, it is a real decision. So I know what to send, which part do you want to think through: the price, the rollout or whether it fits your team? Could we speak again on Friday for 10 minutes?',
    weak: 'No problem at all, take all the time you need and just get back to me whenever you are ready to move forward with us.',
    avoid: '"Take all the time you need": the deal goes quiet and you never learn the concern.',
    next: 'The named concern and a dated follow-up.',
  },
  {
    id: 'send-proposal',
    group: 'later',
    line: 'Just send me a proposal',
    origin: 'ours',
    means: 'They may be comparing quotes. A proposal with no conversation becomes a price list.',
    ask: 'Happy to. What has to be in it for you to say yes?',
    answer:
      'Happy to send it. What has to be in it for you to say yes, and who else will read it? If I send it on Tuesday, can we go through it together on Wednesday for 15 minutes?',
    weak: 'Sure, I will put together our standard proposal with all of our features and pricing and email it over to you by the end of the week.',
    avoid: 'Sending the standard proposal with no questions asked.',
    next: 'What a yes needs, who reads it, and a review call.',
  },
  {
    id: 'never-heard',
    group: 'later',
    line: 'I’ve never heard of you',
    origin: 'ours',
    means: 'A trust question. They want to know you are real and that someone like them uses you.',
    ask: 'Fair. What would you want to know first?',
    answer:
      'Fair, we are smaller than the names you know. What would you want to check first: who uses it, or how long setup takes? I can send two customer names you can call yourself. Would that help?',
    weak: 'Really? We are actually one of the fastest growing companies in our space and a lot of big brands use us, so you have probably seen us around.',
    avoid: 'Claims you cannot back up ("everyone uses us"). Offer names they can check.',
    next: 'What would build trust, and real references.',
  },
  {
    id: 'stop',
    group: 'stop',
    line: 'Take me off your list. Don’t call me again.',
    origin: 'ours',
    means: 'A request to stop. Not an objection to handle.',
    ask: 'None. Confirm and stop.',
    answer:
      "Understood. I'll add your number to our do-not-call list now, and you won't hear from us again. Sorry for the interruption.",
    weak: 'I understand, but before I do that, can I just ask what made you say that? We really do help a lot of companies like yours.',
    avoid:
      'Any attempt to handle it. UK rules require you to honour it, B2B calls included; in the US the rule covers consumer calls (see the table below).',
    next: 'None. Add the number to your do-not-call list today.',
  },
]

export const FRAMEWORKS = [
  {
    name: 'LAER',
    steps: 'Listen, Acknowledge, Explore, Respond',
    who: 'Carew International',
    src: SOURCES.carew,
    best: 'Teams that want one simple model for every stage of a deal.',
  },
  {
    name: 'Richardson’s 5 steps',
    steps:
      'Empathize with or acknowledge, ask clarifying questions, position, check for feedback, repeat',
    who: 'Richardson Sales Performance',
    src: SOURCES.richardson,
    best: 'Late-stage objections where you must confirm the answer landed.',
  },
  {
    name: 'Sandler',
    steps: 'Question the objection instead of defending it; prevent it with an up-front contract',
    who: 'Sandler',
    src: SOURCES.sandler,
    best: 'Stalls and "think it over" answers you could have prevented earlier.',
  },
  {
    name: 'Gong’s 3 steps',
    steps: 'Agree with the objection, incentivise conversation, sell the test drive',
    who: 'Gong (Armand Farrokh)',
    src: SOURCES.gong300m,
    best: 'Cold-call brush-offs in the first 30 seconds.',
  },
  {
    name: 'Feel, felt, found',
    steps: 'I understand how you feel; others felt the same; they found…',
    who: 'Origin not documented on any page we opened',
    src: SOURCES.feelFelt,
    best: 'Trust and fear objections, if the "others" are real customers you can name.',
  },
]

/* ------------------------------ Answer checker ------------------------------ */

export type CheckState = 'pass' | 'warn' | 'fail'
export interface Check {
  id: string
  label: string
  state: CheckState
  why: string
  source?: { label: string; url: string }
}

const ACK =
  /\b(no worries|fair|makes sense|understood|understand|i hear you|i get it|got it|totally|of course|sure|happy to|good (question|choice|to hear)|thanks|thank you|you'?re right|you may be right|that'?s (fair|true|right)|no problem|sorry|yes)\b/i
const ARGUE_OPEN = /^\s*(but|actually|honestly|no,? but|well,? actually|with respect)\b/i
const YES_BUT = /\b(but|however)\b/i
const PROOF =
  /\d|%|\b(for example|e\.g\.|such as|teams like|companies like|customers like|one customer|last (month|quarter|year)|this (quarter|year)|january|february|april|june|july|august|september|october|november|december|monday|tuesday|wednesday|thursday|friday|three|two|ten|six)\b/i
const STOP_OK =
  /\b(remove|removing|take (you|your number) off|off (our|the) list|stop calling|won'?t (call|ring|contact|hear)|will not (call|ring|contact|hear)|not hear from us|do[- ]not[- ]call)\b/i
const STOP_BAD = /\b(won'?t|will not|not|can'?t|cannot) (remove|stop)\b/i
const HYPE =
  /\b(fastest[- ]growing|big brands|everyone uses|best on the market|amazing|world[- ]class|revolutionary|game[- ]chang|guarantee|i promise|pays for itself|much better)\b/i

export function words(text: string): number {
  const t = text.trim()
  return t ? t.split(/\s+/).length : 0
}

export function seconds(text: string): number {
  return Math.round((words(text) / WORDS_PER_MINUTE) * 60)
}

function sentences(text: string): string[] {
  return text
    .split(/(?<=[.?!])\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
}

/** Count references to the buyer vs to the seller. */
export function focus(text: string): { you: number; me: number } {
  const you = (text.match(/\b(you|your|you'?re|yours)\b/gi) || []).length
  const me = (text.match(/\b(we|our|us|i|my|me|i'?m|i'?ll)\b/gi) || []).length
  return { you, me }
}

export function checkAnswer(text: string, group: Group): Check[] {
  const t = text.replace(/[’‘]/g, "'").trim()
  if (!t) return []
  if (group !== 'stop' && words(t) < 8) {
    return [
      {
        id: 'too-short',
        label: 'Too short to judge',
        state: 'fail',
        why: 'Write the whole answer as you would say it: at least one full sentence and a question.',
      },
    ]
  }
  const ss = sentences(t)
  const first = ss[0] || ''
  const last = ss[ss.length - 1] || ''
  const secs = seconds(t)

  if (group === 'stop') {
    const asks = /\?/.test(t)
    return [
      {
        id: 'stop',
        label: 'Confirms you will stop calling',
        state: STOP_OK.test(t) && !STOP_BAD.test(t) ? 'pass' : 'fail',
        why:
          STOP_OK.test(t) && !STOP_BAD.test(t)
            ? 'You confirm the number comes off the list.'
            : 'Say plainly that you will remove the number and not call again.',
        source: SOURCES.icoLive,
      },
      {
        id: 'no-pitch',
        label: 'No question or pitch after a stop request',
        state: asks || YES_BUT.test(t) || HYPE.test(t) ? 'fail' : 'pass',
        why:
          asks || YES_BUT.test(t) || HYPE.test(t)
            ? 'A stop request is not an objection to handle. Drop the question or the "but".'
            : 'You end the call without trying to keep it going.',
        source: SOURCES.ftc,
      },
      {
        id: 'short',
        label: 'Short',
        state: words(t) <= 35 ? 'pass' : 'warn',
        why: `${words(t)} words. One or two sentences is enough.`,
      },
    ]
  }

  const checks: Check[] = []
  const acked = ACK.test(first) && !ARGUE_OPEN.test(first)
  checks.push({
    id: 'ack',
    label: 'Opens by agreeing or acknowledging',
    state: acked ? 'pass' : ARGUE_OPEN.test(first) ? 'fail' : 'warn',
    why: acked
      ? 'Your first sentence takes the objection on board instead of fighting it.'
      : ARGUE_OPEN.test(first)
        ? 'You open with "but", "actually" or "honestly", which reads as an argument.'
        : 'Start with a short acknowledgement ("That’s fair", "Understood") before anything else.',
    source: SOURCES.gong300m,
  })
  const yesBut = YES_BUT.test(ss.slice(0, 2).join(' '))
  checks.push({
    id: 'yes-but',
    label: 'No "yes, but" in the first two sentences',
    state: yesBut ? 'fail' : 'pass',
    why: yesBut
      ? '"I understand, but…" cancels the acknowledgement. Use a full stop and a question instead. (Our rule.)'
      : 'No "but" or "however" undoing your acknowledgement.',
  })
  const asks = /\?/.test(t)
  checks.push({
    id: 'ask',
    label: 'Asks a question',
    state: asks ? 'pass' : 'fail',
    why: asks
      ? 'You answer with a question, as Gong’s successful reps did.'
      : 'Gong’s successful reps answered objections with questions. Add one.',
    source: SOURCES.gongDemos,
  })
  checks.push({
    id: 'end-q',
    label: 'Ends on a question',
    state: /\?\s*$/.test(last) ? 'pass' : asks ? 'warn' : 'fail',
    why: /\?\s*$/.test(last)
      ? 'The buyer has something to answer, so the call keeps going.'
      : 'End on the question so the buyer talks next. (Our rule.)',
  })
  checks.push({
    id: 'length',
    label: 'Under 20 seconds out loud',
    state: secs <= 20 ? 'pass' : secs <= 30 ? 'warn' : 'fail',
    why: `About ${secs} s at ${WORDS_PER_MINUTE} words a minute (${words(t)} words). Gong’s average reps answered with a ${GONG.avgMonologueSec}-second monologue.`,
    source: SOURCES.gongDemos,
  })
  const f = focus(t)
  checks.push({
    id: 'focus',
    label: 'About them more than you',
    state: f.me > f.you + 2 ? 'warn' : 'pass',
    why: `"You/your" ${f.you} times, "I/we/our" ${f.me} times.`,
  })
  checks.push({
    id: 'proof',
    label: 'One concrete detail',
    state: PROOF.test(t) ? 'pass' : 'warn',
    why: PROOF.test(t)
      ? 'There is a number, date or example the buyer can picture.'
      : 'Add one specific: a number, a date, a team size or a real example.',
  })
  checks.push({
    id: 'hype',
    label: 'No hype or promises',
    state: HYPE.test(t) ? 'fail' : 'pass',
    why: HYPE.test(t)
      ? 'Words like "best on the market", "I promise" or "pays for itself" sound like a pitch, not an answer.'
      : 'No superlatives or promises.',
  })
  return checks
}

export function score(checks: Check[]): { points: number; max: number } {
  if (checks.length === 1 && checks[0].id === 'too-short') return { points: 0, max: 16 }
  let points = checks.reduce((n, c) => n + (c.state === 'pass' ? 2 : c.state === 'warn' ? 1 : 0), 0)
  // A rambling answer cannot score well, however many other rules it meets.
  if (checks.some((c) => c.id === 'length' && c.state === 'fail')) points = Math.min(points, 10)
  return { points, max: checks.length * 2 }
}

export const COUNTS = {
  objections: OBJECTIONS.length,
  fromGong: OBJECTIONS.filter((o) => o.origin === 'gong').length,
  byGroup: (Object.keys(GROUPS) as Group[]).map((g) => ({
    group: g,
    label: GROUPS[g].label,
    count: OBJECTIONS.filter((o) => o.group === g).length,
  })),
  frameworks: FRAMEWORKS.length,
}
