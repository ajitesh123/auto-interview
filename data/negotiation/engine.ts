// Salary negotiation script builder: pure functions, no AI, no network.
// Every script is a template filled from the reader's own numbers; every check is a plain rule
// shown on the page. Sources behind the rules (opened 19 Nov 2026):
//  - Precise numbers anchor harder: Mason, Ames, Lee & Wiley (Columbia Business School press
//    release on their JESP study; $5,015 vs $5,000 example).
//    https://business.columbia.edu/press-release/cbs-press-releases/new-research-shows-asking-precise-not-round-number-during
//  - "don't ask if an offer is negotiable; just begin the negotiation" and the bad-faith warning:
//    Harvard PON, Katie Shonk, 29 Oct 2026.
//    https://www.pon.harvard.edu/daily/salary-negotiations/how-to-negotiate-a-higher-salary-after-a-job-offer
//  - Outcomes of asking: Pew Research Center, 5 Apr 2023.
//  - India increment benchmark: Aon, 14 Oct 2026 (9% actual 2026, 9.1% projected 2027).

export type Market = 'in' | 'us'
export type Moment = 'expected' | 'counter' | 'budget' | 'time' | 'extras' | 'accept' | 'decline'
export type Channel = 'email' | 'call'
export type Lever = 'competing' | 'market' | 'scope'
export type Status = 'pass' | 'warn' | 'fail'

export interface Inputs {
  market: Market
  myName: string
  recruiter: string
  company: string
  role: string
  /** India: LPA (fixed CTC). US: annual base in dollars. */
  offer: number
  /** India only, LPA fixed. 0 = not given. */
  current: number
  ask: number
  floor: number
  lever: Lever
  competing: number
  competingCo: string
  evidence: string
  why: string
  /** I will sign if they meet the ask. */
  commit: boolean
  noticeDays: number
  /** India: rupees to buy out notice. US: unused. */
  buyout: number
  timeDays: number
}

export const MOMENTS: { id: Moment; name: string; when: string }[] = [
  { id: 'expected', name: 'Expected salary', when: 'They ask before the offer' },
  { id: 'counter', name: 'Counter the offer', when: 'Offer in hand' },
  { id: 'budget', name: '“Max budget”', when: 'They said no to base' },
  { id: 'time', name: 'Ask for time', when: 'Tight deadline' },
  { id: 'extras', name: 'Bonus + buyout', when: 'Base is fixed' },
  { id: 'accept', name: 'Accept', when: 'You got a yes' },
  { id: 'decline', name: 'Decline', when: 'It is a no' },
]

export const LEVERS: { id: Lever; name: string; hint: string }[] = [
  { id: 'competing', name: 'Another offer', hint: 'A written offer you really have' },
  { id: 'market', name: 'Market pay', hint: 'What people in this role report' },
  { id: 'scope', name: 'Bigger role', hint: 'The job is above the level offered' },
]

// ---------- money ----------

const inr = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 })
const usd = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 })

/** Annual amount in the market's base unit: rupees (from LPA) or dollars. */
export function units(m: Market, v: number): number {
  return m === 'in' ? Math.round(v * 100000) : Math.round(v)
}

/** "₹18.4 LPA (₹18,40,000)" style for India, "$128,500" for the US. */
export function money(m: Market, v: number, long = true): string {
  if (!isFinite(v) || v <= 0) return m === 'in' ? '₹— LPA' : '$—'
  if (m === 'us') return `$${usd.format(Math.round(v))}`
  const lpa = Math.round(v * 100) / 100
  const short = `₹${lpa.toLocaleString('en-IN', { maximumFractionDigits: 2 })} LPA`
  return long ? `${short} (₹${inr.format(units('in', v))})` : short
}

export function moneyRupees(r: number): string {
  return `₹${inr.format(Math.max(0, Math.round(r)))}`
}

/** True when the ask is a round number: a whole lakh (India) or a multiple of $5,000 (US). */
export function isRound(m: Market, v: number): boolean {
  const u = units(m, v)
  return m === 'in' ? u % 100000 === 0 : u % 5000 === 0
}

/**
 * A precise version of a round ask: about 1.5% higher, rounded to ₹5,000 or $250, so it reads
 * as researched, not rounded (Columbia study). Non-round asks are returned unchanged.
 */
export function precise(m: Market, v: number): number {
  if (!(v > 0) || !isRound(m, v)) return v
  const step = m === 'in' ? 5000 : 250
  let u = Math.round((units(m, v) * 1.015) / step) * step
  if (isRound(m, m === 'in' ? u / 100000 : u)) u += step
  return m === 'in' ? u / 100000 : u
}

export function pct(a: number, b: number): number {
  if (!(a > 0) || !(b > 0)) return 0
  return Math.round(((a - b) / b) * 1000) / 10
}

export interface Numbers {
  ask: number
  preciseAsk: number
  roundNote: boolean
  gap: number
  gapPct: number
  hikeOverCurrent: number
  floorGap: number
  warnings: string[]
}

export function numbers(i: Inputs): Numbers {
  const p = precise(i.market, i.ask)
  const w: string[] = []
  if (i.ask > 0 && i.offer > 0 && i.ask <= i.offer)
    w.push('Your ask is at or below the offer. If the offer already meets your number, accept it.')
  if (i.floor > 0 && i.ask > 0 && i.floor > i.ask)
    w.push(
      'Your walk-away number is above your ask. Swap them: the ask is the top, the walk-away the bottom.'
    )
  if (i.lever === 'competing' && !(i.competing > 0))
    w.push(
      'Add the other offer’s amount, or pick a different reason. Never mention an offer you do not have: recruiters often ask for the letter.'
    )
  if (i.lever === 'competing' && i.competing > 0 && i.offer > 0 && i.competing <= i.offer)
    w.push(
      'The other offer is not higher than this one, so it is not a lever for more pay here. Use market pay or scope instead.'
    )
  return {
    ask: i.ask,
    preciseAsk: p,
    roundNote: p !== i.ask,
    gap: Math.max(0, p - i.offer),
    gapPct: pct(p, i.offer),
    hikeOverCurrent: i.market === 'in' ? pct(p, i.current) : 0,
    floorGap: Math.max(0, i.floor - i.offer),
    warnings: w,
  }
}

// ---------- text helpers ----------

const first = (s: string, d: string) => (s.trim() ? s.trim().split(/\s+/)[0] : d)
const or = (s: string, d: string) => (s.trim() ? s.trim() : d)
/** Lower-case the first letter so it reads mid-sentence, unless it is 'I', an acronym or a name. */
const lc = (s: string) =>
  /^(I\b|[A-Z]{2}|[A-Z][a-z]+'s\b|[A-Z][a-z]+\s[A-Z])/.test(s)
    ? s
    : s.charAt(0).toLowerCase() + s.slice(1)
const stripDot = (s: string) => s.trim().replace(/[.\s]+$/, '')

function payWord(m: Market) {
  return m === 'in' ? 'fixed CTC' : 'base salary'
}

function workingDaysFrom(n: number, m: Market = 'in', from = new Date()): string {
  const d = new Date(from)
  let left = Math.max(1, Math.min(10, Math.round(n || 2)))
  while (left > 0) {
    d.setDate(d.getDate() + 1)
    const wd = d.getDay()
    if (wd !== 0 && wd !== 6) left--
  }
  return d.toLocaleDateString(m === 'us' ? 'en-US' : 'en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
}

function reasonLine(i: Inputs): string {
  const roles = i.role.trim() ? `${i.role.trim()} roles` : 'roles like this'
  const ev = stripDot(i.evidence)
  if (i.lever === 'competing' && i.competing > 0) {
    const co = or(i.competingCo, 'another company')
    return `I also have a written offer from ${co} at ${money(i.market, i.competing, false)} ${payWord(i.market)}. I would rather join ${or(i.company, 'your team')}, and I want to be open about the gap.`
  }
  if (i.lever === 'scope')
    return ev
      ? `The role we discussed includes ${lc(ev)}, which is more than the level the offer is set at.`
      : `The role we discussed is broader than the level the offer is set at.`
  // market
  return ev
    ? `Based on the pay people report for ${roles} at similar companies, and on what I bring (${ev}), I believe the role is worth more than the offer.`
    : `Based on the pay people report for ${roles} at similar companies, I believe the role is worth more than the offer.`
}

// ---------- scripts ----------

export interface Script {
  subject?: string
  body: string
  /** One-line note on what this script does, shown above it. */
  note: string
}

export function script(i: Inputs, moment: Moment, ch: Channel): Script {
  const n = numbers(i)
  const m = i.market
  const me = or(i.myName, 'Your name')
  const hi = `Hi ${first(i.recruiter, 'there')},`
  const co = or(i.company, 'the company')
  const role = or(i.role, 'the role')
  const roleP = i.role.trim() ? `the ${i.role.trim()} role` : 'this role'
  const hasGap = n.gap > 0
  const gapOnce = hasGap ? moneyRupees(units('in', n.gap)) : '[amount]'
  const why = stripDot(i.why)
  const ask = money(m, n.preciseAsk, m === 'in')
  const askShort = money(m, n.preciseAsk, false)
  const gap = money(m, n.gap, false)
  const pw = payWord(m)
  const by = workingDaysFrom(i.timeDays, m)
  const notice = Math.max(0, Math.round(i.noticeDays || 0))
  const close = `\n\nThanks again,\n${me}`

  if (moment === 'expected') {
    const body =
      m === 'in'
        ? `${ch === 'email' ? `${hi}\n\n` : ''}Thanks for asking. For this role I am looking at ${askShort} fixed. That is based on the scope of ${roleP} and what people in similar roles report, not on a percentage over my current pay. On top of the fixed, I am open to how variable pay and any joining bonus are set up. Could you share the budgeted range for this position?${ch === 'email' ? close : ''}`
        : `${ch === 'email' ? `${hi}\n\n` : ''}Thanks for asking. I am targeting a base salary of ${askShort}, depending on the full package: bonus, equity and benefits. Could you share the range budgeted for this role? Happy to talk it through once I know more about the level.${ch === 'email' ? close : ''}`
    return {
      subject: ch === 'email' ? `${role}: salary expectations` : undefined,
      body,
      note: 'Give one number based on the role, then ask for their range. Do not open with your current pay.',
    }
  }

  if (moment === 'counter') {
    const commit = i.commit
      ? ` If we can get there, I am ready to accept${m === 'in' ? ' and confirm my joining date' : ''}.`
      : ''
    if (ch === 'email')
      return {
        subject: `${role} offer: one question before I sign`,
        body: `${hi}\n\nThank you for the offer for ${roleP} at ${co}.${why ? (/^i\b/i.test(why) ? ` ${why}.` : ` I am excited about ${lc(why)}.`) : ' I am excited about the role and the team.'}\n\nBefore I sign, I would like to ask about the ${pw}. ${reasonLine(i)} Could you take the ${pw} to ${ask}?${commit}\n\nWould a short call help? Happy to talk whenever suits you.${close}`,
        note: 'Thanks, one reason, one precise number, and a clear next step. No range, no apology.',
      }
    return {
      body: `“Thanks again for the offer. ${why && /^i\b/i.test(why) ? `${why}` : `I am excited about ${why ? lc(why) : 'the role'}`}, and I want to make this work.”\n\n“Before I sign, I would like to talk about the ${pw}. ${reasonLine(i)}”\n\n“Could you take it to ${askShort}?”\n\n[Stop talking. Let them answer, even if there is a pause.]\n\n${i.commit ? `If they agree: “Thank you. Please send the revised offer letter and I will sign it.”` : `If they agree: “Thank you. Please send the revised offer in writing and I will reply by ${by}.”`}\n\nIf they need to check: “Of course. When should I expect to hear back?”`,
      note: 'Say the number once, then stop. The pause is part of the script.',
    }
  }

  if (moment === 'budget') {
    const extras =
      m === 'in'
        ? [
            `a one-time joining bonus of ${gapOnce}`,
            notice > 0 ? `cover for my notice-period buyout` : '',
            `a pay review at 6 months with the amount written into the offer letter`,
          ]
        : [
            `a sign-on bonus of ${hasGap ? gap : '[amount]'}`,
            `additional equity`,
            `a compensation review at 6 months, written into the offer`,
          ]
    const list = extras.filter(Boolean)
    const body = `${ch === 'email' ? `${hi}\n\n` : '“'}Thank you for checking. I understand the ${pw} cannot move past the band. ${hasGap ? `The gap to my number is ${gap}. ` : ''}Could we close the gap another way? For example, ${list.slice(0, -1).join(', ')} or ${list[list.length - 1]}. If the level is what fixes the band, could we also look at whether the role fits the next level?${ch === 'email' ? close : '”'}`
    return {
      subject: ch === 'email' ? `Re: ${role} offer` : undefined,
      body,
      note: 'When base is stuck, ask for the gap in another form, and get any promise in writing.',
    }
  }

  if (moment === 'time') {
    const body = `${ch === 'email' ? `${hi}\n\n` : '“'}Thank you for the offer. I am keen on ${roleP} and I want to give you a considered yes, not a rushed one. Could I have until ${by} to reply? ${m === 'in' ? 'I want to read the full offer letter, including the CTC breakup and any clawback or bond terms.' : 'I want to review the full package, including the equity and benefits details.'} If anything is unclear I will call you before then.${ch === 'email' ? close : '”'}`
    return {
      subject: ch === 'email' ? `${role} offer: timing` : undefined,
      body,
      note: 'Ask for a specific date and say why. A short, polite request is rarely refused outright.',
    }
  }

  if (moment === 'extras') {
    if (m === 'in') {
      const buy = i.buyout > 0 ? moneyRupees(i.buyout) : 'the buyout amount'
      const body = `${ch === 'email' ? `${hi}\n\n` : '“'}Thank you for the offer. ${notice > 0 ? 'Two things' : 'One thing'} before I sign.\n\n${notice > 0 ? `First, my current employer asks for ${notice} days' notice. To join earlier I would need to buy out part of it, about ${buy}. Could ${co} cover that as a joining bonus?\n\nSecond, could you share the joining-bonus terms in writing: how long I need to stay, whether any repayment is pro-rated, and whether my notice period counts?` : `Could ${co} add a one-time joining bonus of ${gapOnce} to close the gap to my number? Could you share its terms in writing: how long I need to stay, and whether any repayment is pro-rated?`}${ch === 'email' ? close : '”'}`
      return {
        subject: ch === 'email' ? `${role} offer: joining bonus and notice` : undefined,
        body,
        note: 'A joining bonus is one-time money: ask what it is for, and read the clawback before you sign.',
      }
    }
    const body = `${ch === 'email' ? `${hi}\n\n` : '“'}Thank you for the offer. If the base salary is fixed, could we close the ${hasGap ? `${gap} ` : ''}gap with a sign-on bonus? I would also like to understand the equity: the number of units or shares, the vesting schedule and cliff, and whether there are annual refreshers. Could you send those details in writing?${ch === 'email' ? close : '”'}`
    return {
      subject: ch === 'email' ? `${role} offer: sign-on and equity` : undefined,
      body,
      note: 'Sign-on money is one-time; equity is only worth what its terms say. Get both in writing.',
    }
  }

  if (moment === 'accept') {
    const body = `${ch === 'email' ? `${hi}\n\n` : '“'}Thank you for working on this with me. I am happy to accept the offer for ${roleP} at [agreed amount] ${pw}. Could you send the revised offer letter${m === 'in' ? ' with the CTC breakup' : ''} so I can sign it?${m === 'in' ? ' Once I have the signed letter, I will resign and confirm my last working day.' : ''} I am looking forward to starting.${ch === 'email' ? close : '”'}`
    return {
      subject: ch === 'email' ? `Accepting the ${role} offer` : undefined,
      body,
      note:
        m === 'in'
          ? 'Type the number you agreed where it says [agreed amount]. Resign only after the signed letter arrives.'
          : 'Type the number you agreed where it says [agreed amount]. Sign the written offer before you give notice.',
    }
  }

  // decline
  const body = `${ch === 'email' ? `${hi}\n\n` : '“'}Thank you for the offer and for the time your team spent with me. After thinking it over, I have decided not to accept. ${i.lever === 'competing' && i.competing > 0 ? 'I have decided to go with another offer that is a better fit right now.' : 'The package does not work for me at this stage.'} I enjoyed meeting the team and would be glad to stay in touch for future roles.${ch === 'email' ? close : '”'}`
  return {
    subject: ch === 'email' ? `${role} offer` : undefined,
    body,
    note: 'Short, warm and final. Leave the door open; people move companies.',
  }
}

// ---------- replies: when the recruiter says X ----------

export interface Reply {
  id: string
  they: string
  say: string
  why: string
}

export function replies(i: Inputs): Reply[] {
  const m = i.market
  const n = numbers(i)
  const askShort = money(m, n.preciseAsk, false)
  const gap = money(m, n.gap, false)
  const by = workingDaysFrom(i.timeDays, m)
  const why = stripDot(i.why)
  const common: Reply[] = [
    {
      id: 'final',
      they: '“This is our final offer.”',
      say: `“Thank you for checking. Let me think it over properly and come back to you by ${by}.”`,
      why: 'You do not have to decide on the call. Ask for the final offer in writing and use the time to compare.',
    },
    {
      id: 'later',
      they: '“We will revise your pay after 6 months.”',
      say: '“Thank you, that helps. Could we put the review date and the amount, or the range, in the offer letter?”',
      why: 'A promise only counts if it is written down. Ask for the date and the amount.',
    },
    {
      id: 'silence',
      they: 'No reply for 3 working days after your counter',
      say: `“Hi, following up on my note about the offer. I am still keen on the role. Is there an update on the ${payWord(m)}, or anything you need from me?”`,
      why: 'One short follow-up. Do not lower your own number while you wait.',
    },
    {
      id: 'proof',
      they: '“Can you send us the other offer letter?”',
      say: '“Yes, I can share it with the salary figures, since that is what we are comparing. I would rather keep the other company’s internal details private.”',
      why: 'Only mention an offer you can show. Recruiters often ask for it, and a bluff can end the process.',
    },
    {
      id: 'deadline',
      they: '“We need an answer by tomorrow.”',
      say: `“I understand you need to plan. I want to give you a real yes. Could I reply by ${by}? If that does not work, what is the latest that does?”`,
      why: 'Offer a specific date and ask what works. Most deadlines have some room.',
    },
  ]
  if (m === 'in')
    return [
      {
        id: 'ctc',
        they: '“What is your current CTC? Send your last 3 payslips.”',
        say: `“My current fixed is ${i.current > 0 ? money('in', i.current, false) : '[your fixed]'}. I will share payslips with the other documents at the offer stage. My expectation of ${askShort} is based on this role, not on a percentage over my current pay.”`,
        why: 'Many Indian employers ask for proof, so never inflate it. Be truthful, then move the talk back to the role.',
      },
      {
        id: 'budget',
        they: '“The maximum budget for this role is X.”',
        say: `“Thanks for being clear. If the fixed cannot move, could we close the ${n.gap > 0 ? `${gap} ` : ''}gap with a joining bonus, a notice buyout or a written review at 6 months?”`,
        why: 'Accept the band, then ask for the gap in another form.',
      },
      {
        id: 'hike',
        they: '“A hike this big is not possible.”',
        say: `“I understand. My number is about the role, not the hike. What is the top of the band for this level? If the level sets the cap, could we check whether the role fits the next level?”`,
        why: 'Move the talk from your old pay to the job’s band and level.',
      },
      {
        id: 'money',
        they: '“Is money the only reason you are switching?”',
        say: `“No. ${why ? `${/^i\b/i.test(why) ? `${why}.` : `What draws me is ${lc(why)}.`}` : 'What draws me is the work and the team.'} Pay matters too, and I would like to settle it now so I can focus on the work once I join.”`,
        why: 'Give your real reason first, then say why pay matters.',
      },
      {
        id: 'notice',
        they: '“Can you join in 15 days?”',
        say: `“My notice period is ${i.noticeDays > 0 ? `${Math.round(i.noticeDays)} days` : '[your notice] days'}. I can ask for early release, and if I need to buy out part of it, could the joining bonus cover that?”`,
        why: 'Do not promise a date your current employer controls. Tie any buyout to a joining bonus.',
      },
      ...common,
    ]
  return [
    {
      id: 'history',
      they: '“What are you making now?”',
      say: `“I would rather focus on this role. I am targeting ${askShort} base, depending on the package. What range is budgeted?”`,
      why: 'Several states ban employers from asking about salary history; see the law table below. Where it is allowed, you can still steer to the role.',
    },
    {
      id: 'band',
      they: '“That is above our range.”',
      say: `“Thanks for telling me. If base is capped, could we close the ${n.gap > 0 ? `${gap} ` : ''}gap with a sign-on bonus or more equity? And is the role levelled where it should be?”`,
      why: 'Ask for the gap in another form, and test the level.',
    },
    {
      id: 'equity',
      they: '“We can offer more equity instead.”',
      say: '“Thank you. Could you send the number of units, the current value used, the vesting schedule and cliff, and whether there are refreshers? Then I can compare it fairly.”',
      why: 'Equity is only worth what its terms say. Get them in writing first.',
    },
    ...common,
  ]
}

// ---------- checks on any message ----------

export interface Check {
  id: string
  title: string
  status: Status
  detail: string
}

export function words(s: string): number {
  return (s.trim().match(/\S+/g) || []).length
}

const MONEY_RE =
  /(?:₹|rs\.?|inr|\$|usd)\s?\d[\d,]*(?:\.\d+)?\s?(?:k|l|lpa|lakhs?|lacs?|cr|crore)?|\b\d+(?:\.\d+)?\s?(?:lpa|lakhs?|lacs?|k)\b|\b\d{1,3}(?:,\d{2})*,\d{3}\b/gi
// A salary range: two numbers joined by -, – or 'to', with a currency sign or a pay unit on one side.
const RANGE_RE =
  /(?:(?:₹|\$|rs\.?)\s?\d[\d,.]*\s?(?:k|lpa|lakhs?|l)?\s?(?:-|–|—|to)\s?(?:₹|\$|rs\.?)?\s?\d[\d,.]*)|(?:\d[\d,.]*\s?(?:k|lpa|lakhs?|l)?\s?(?:-|–|—|to)\s?(?:₹|\$|rs\.?)?\s?\d[\d,.]*\s?(?:k|lpa|lakhs?|lacs?)\b)/i

export function checkMessage(text: string): { checks: Check[]; passed: number } {
  const t = text.trim()
  const lower = t.toLowerCase()
  const w = words(t)
  const amounts = t.match(MONEY_RE) || []
  const hasRange = RANGE_RE.test(t) && amounts.length >= 1
  const checks: Check[] = [
    {
      id: 'thanks',
      title: 'Opens with thanks or interest',
      status: /\b(thank|grateful|apprecia|excit|keen|glad)/i.test(t) ? 'pass' : 'warn',
      detail: 'Show you want the job before you ask for more. It keeps the talk friendly.',
    },
    {
      id: 'number',
      title: 'One clear number, not a range',
      status: amounts.length === 0 ? 'fail' : hasRange ? 'warn' : 'pass',
      detail:
        amounts.length === 0
          ? 'Name the amount you want. Without a number they will not know what to say yes to.'
          : hasRange
            ? 'A range invites them to pick the bottom. Give one number; make it precise.'
            : 'Good. A precise number reads as researched (Columbia study).',
    },
    {
      id: 'reason',
      title: 'Gives a reason about the role or the market',
      status:
        /\b(because|based on|given|scope|market|report|offer from|experience|level|responsib|includes|led|built|grew|managed)\b/i.test(
          t
        )
          ? 'pass'
          : 'warn',
      detail: 'Tie the number to the role, market pay or another offer, so it is easy to approve.',
    },
    {
      id: 'needs',
      title: 'Leaves out personal costs',
      status:
        /\b(rent|emi|loan|mortgage|bills|wedding|debt|afford|school fees|relocating my family)\b/i.test(
          t
        )
          ? 'fail'
          : 'pass',
      detail: 'Rent or EMIs are real, but they are not why the role is worth more. Leave them out.',
    },
    {
      id: 'hedge',
      title: 'No apology or hedging',
      status:
        /\b(sorry|apolog|i know this is (a lot|too much)|i hope (this|it|it's|it’s) (is |isn't |isn’t )?(ok|okay|fine)|if (it's|it’s|it is) not too much|just wondering)/i.test(
          t
        )
          ? 'warn'
          : 'pass',
      detail: 'Asking is normal. An apology tells them your number is soft.',
    },
    {
      id: 'ultimatum',
      title: 'No ultimatum',
      status:
        /\b(non-negotiable|otherwise i(?: will| would|'ll|’ll)|or else|take it or leave it|i(?: will|'ll|’ll) (have to )?(decline|walk away)|final demand)\b/i.test(
          t
        )
          ? 'fail'
          : 'pass',
      detail:
        'PON warns that hiring managers may reconsider an offer if they sense bad-faith bargaining.',
    },
    {
      id: 'next',
      title: 'Ends with a clear next step',
      status:
        /\?\s*([^?]{0,120})$/.test(t) ||
        /\b(let me know|could we|would you|happy to (talk|discuss|jump)|call)\b/i.test(lower)
          ? 'pass'
          : 'warn',
      detail: 'Ask a question or offer a call so they know what to do next.',
    },
    {
      id: 'length',
      title: 'Short enough to read on a phone',
      status: w === 0 ? 'warn' : w <= 160 ? 'pass' : 'warn',
      detail: `${w} words. Keep a negotiation email under about 160 words; the detail belongs on a call.`,
    },
  ]
  return { checks, passed: checks.filter((c) => c.status === 'pass').length }
}

// ---------- samples ----------

export const BLANK: Inputs = {
  market: 'in',
  myName: '',
  recruiter: '',
  company: '',
  role: '',
  offer: 0,
  current: 0,
  ask: 0,
  floor: 0,
  lever: 'market',
  competing: 0,
  competingCo: '',
  evidence: '',
  why: '',
  commit: true,
  noticeDays: 0,
  buyout: 0,
  timeDays: 2,
}

export const SAMPLES: { id: string; label: string; inputs: Inputs }[] = [
  {
    id: 'in-analyst',
    label: 'Data analyst, Bengaluru, market pay',
    inputs: {
      ...BLANK,
      market: 'in',
      myName: 'Priya Nair',
      recruiter: 'Rohan Mehta',
      company: 'Northwind Payments',
      role: 'Senior Data Analyst',
      offer: 16,
      current: 12.5,
      ask: 19,
      floor: 17.5,
      lever: 'market',
      evidence: 'the dashboards I built that cut weekly reporting from two days to two hours',
      why: 'the payments risk team and the problems we discussed',
      noticeDays: 60,
      buyout: 150000,
    },
  },
  {
    id: 'in-competing',
    label: 'PM, Mumbai, competing offer',
    inputs: {
      ...BLANK,
      market: 'in',
      myName: 'Arjun Rao',
      recruiter: 'Neha',
      company: 'Northwind Payments',
      role: 'Product Manager',
      offer: 32,
      current: 26,
      ask: 36,
      floor: 34,
      lever: 'competing',
      competing: 35,
      competingCo: 'a Series C fintech',
      why: 'owning the merchant onboarding product',
      noticeDays: 90,
      buyout: 400000,
    },
  },
  {
    id: 'us-swe',
    label: 'Software engineer, US, bigger scope',
    inputs: {
      ...BLANK,
      market: 'us',
      myName: 'Sam Lee',
      recruiter: 'Jordan',
      company: 'Northwind Payments',
      role: 'Software Engineer II',
      offer: 135000,
      ask: 150000,
      floor: 142000,
      lever: 'scope',
      evidence: 'on-call ownership of the payouts service and mentoring two new hires',
      why: 'the payouts platform team',
    },
  },
]

/** A typical first draft, for the weak-vs-strong example. Fictional. */
export const WEAK =
  'Hi Rohan, thanks so much for the offer! Sorry to ask, but is there any flexibility on the salary? I was hoping for something around 18-20 LPA since my rent and EMI have gone up a lot this year. I hope this is ok. Regards, Priya'
