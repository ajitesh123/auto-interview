// Data for /blog/best-ai-voice-agents-cold-calling-2026 (best AI cold calling software).
// Every price, seat minimum and "lines at once" figure was read on the vendor's own page on
// 24 Nov 2026 and re-checked by a second fetch the same day. Prices are copied as written: no
// conversion, no discounts. Rules are quoted from the regulator or statute text.
// Re-check monthly. Never add a number that is not on an opened page: write null instead.

export const CHECKED = '24 Nov 2026'
export const TTAI_URL =
  'https://www.toughtongueai.com/?utm_source=autointerviewai&utm_medium=blog&utm_campaign=best-ai-cold-calling-software'

/** agent = the AI talks; parallel = AI dials several lines, a rep talks; phone = phone system with a dialer */
export type Kind = 'agent' | 'parallel' | 'phone'

export const KINDS: Record<Kind, { label: string; short: string; who: string; body: string }> = {
  agent: {
    label: 'AI voice agent',
    short: 'AI talks',
    who: 'The AI places the call and holds the conversation.',
    body: 'Billed by the minute. In the US an AI voice is an “artificial voice”, so the robocall consent rules apply.',
  },
  parallel: {
    label: 'AI parallel dialer',
    short: 'AI dials, rep talks',
    who: 'Software dials several numbers at once; a rep talks to whoever picks up.',
    body: 'Billed per seat. The voice is human, but dropped pickups count toward abandoned-call rules.',
  },
  phone: {
    label: 'Phone system with a dialer',
    short: 'Rep dials faster',
    who: 'A cloud phone system for calls, SMS and numbers, with a dialer as a plan or add-on.',
    body: 'Billed per user. Seats from $39 (Dialpad Sell); a power or parallel dialer is often an add-on or a higher plan.',
  },
}

export type Currency = 'USD' | 'EUR'

export type Tool = {
  id: string
  name: string
  kind: Kind
  /** price exactly as the vendor writes it */
  stated: string
  /** seat price per month used in the picker (annual billing), null when not public */
  seat: number | null
  currency: Currency
  /** seats you must buy, when the page states a minimum */
  minSeats: number | null
  /** lines dialled at once, as stated; null when not stated */
  lines: string | null
  /** per-minute low/high for agents, all-in where the vendor states it */
  perMin?: { low: number; high: number; fee: number; note: string; floor?: number }
  /** one-person plan price per month, when the vendor sells one (used when reps = 1) */
  solo?: number
  /** one line, from the vendor's own page */
  what: string
  bestFor: string
  url: string
}

export const TOOLS: Tool[] = [
  // ---- AI voice agents (the AI talks) ----
  {
    id: 'retell',
    name: 'Retell AI',
    kind: 'agent',
    stated:
      '$0.07–$0.31 / min for AI voice agents; first 20 concurrent calls free, then $8 per concurrency a month',
    seat: null,
    currency: 'USD',
    minSeats: null,
    lines: '20 concurrent calls included',
    perMin: { low: 0.07, high: 0.31, fee: 0, note: 'phone numbers $2 a month each' },
    what: 'Build and run voice agents; batch calls at +$0.005 a dial; voicemail detection.',
    bestFor: 'Teams with a developer who want a published per-minute price and no contract',
    url: 'https://www.retellai.com/pricing',
  },
  {
    id: 'bland',
    name: 'Bland AI',
    kind: 'agent',
    stated: 'Start $0.14/min, $0 platform fee; Build $0.12/min plus $299/month platform fee',
    seat: null,
    currency: 'USD',
    minSeats: null,
    lines: '10 concurrent calls and 100 calls a day (Start); 50 and 2,000 (Build)',
    perMin: {
      low: 0.14,
      high: 0.14,
      fee: 0,
      note: 'Start plan (100 calls a day); Build is $0.12/min plus $299 a month',
    },
    what: 'API-first voice agents; local caller ID for US calls; named TCPA guardrails in its docs.',
    bestFor: 'Engineering teams running high call volumes through an API',
    url: 'https://bland.ai/pricing',
  },
  {
    id: 'vapi',
    name: 'Vapi',
    kind: 'agent',
    stated:
      '$0.05/min Vapi hosting, plus transcriber, model, voice and phone at provider cost; Core package $29/month',
    seat: null,
    currency: 'USD',
    minSeats: null,
    lines: '4 concurrent calls without a package, 10 on Core',
    perMin: {
      low: 0.0958,
      high: 0.1429,
      fee: 0,
      note: 'hosting + listed transcriber, model, voice and Twilio outbound ranges',
    },
    what: 'Developer platform: you pick the speech, model and voice providers.',
    bestFor: 'Developers who want to choose every provider and pay each at cost',
    url: 'https://vapi.ai/pricing',
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs Agents',
    kind: 'agent',
    stated:
      'Plans from $0 (15 min) to $990/month (12,375 min); Pro $99/month includes 1,238 min; model and telephony extra',
    seat: null,
    currency: 'USD',
    minSeats: null,
    lines: '4 concurrent calls (Free) to 40 (Business)',
    what: 'Voice agents on ElevenLabs voices; voicemail detection as a system tool.',
    bestFor: 'Teams that care most about voice quality and languages',
    url: 'https://elevenlabs.io/pricing/agents',
  },
  {
    id: 'aircall',
    name: 'Aircall AI Voice Agent',
    kind: 'agent',
    stated:
      '$0.29/min pay as you go ($99/month minimum standalone); 1,000 min for $250/month on an annual commitment',
    seat: null,
    currency: 'USD',
    minSeats: null,
    lines: null,
    perMin: {
      low: 0.25,
      high: 0.29,
      fee: 0,
      floor: 99,
      note: '$0.25 is the 1,000-minute bundle; $99 a month minimum',
    },
    what: 'Outbound calls when a lead arrives or an appointment nears; HubSpot and Salesforce built in.',
    bestFor: 'Teams already on Aircall who want speed-to-lead callbacks',
    url: 'https://aircall.io/en/pricing/',
  },
  {
    id: 'synthflow',
    name: 'Synthflow',
    kind: 'agent',
    stated:
      'No public price: “sold as an annual enterprise agreement”, no free plan and no per-minute rate',
    seat: null,
    currency: 'USD',
    minSeats: null,
    lines: null,
    what: 'No-code voice agents, now sold only on annual contracts.',
    bestFor: 'Larger teams that want a vendor-built agent on a contract',
    url: 'https://www.synthflow.ai/pricing',
  },
  // ---- AI parallel dialers (a rep talks) ----
  {
    id: 'orum',
    name: 'Orum',
    kind: 'parallel',
    stated: 'No public price (“Request pricing”); minimum 9 seats',
    seat: null,
    currency: 'USD',
    minSeats: 9,
    lines: 'Up to 5 lines at once',
    what: 'Detects human, screener, voicemail or phone tree on each pickup; spam-monitored numbers.',
    bestFor: 'SDR floors of 9+ reps on Salesforce, Outreach or Salesloft',
    url: 'https://www.orum.com/pricing',
  },
  {
    id: 'nooks',
    name: 'Nooks',
    kind: 'parallel',
    stated: 'No public price (“custom quote”)',
    seat: null,
    currency: 'USD',
    minSeats: null,
    lines: 'Up to 5 dials at once',
    what: 'AI answer detection, voicemail drops, number rotation and reputation monitoring.',
    bestFor: 'Teams that want AI answer detection and spam protection in a parallel dialer',
    url: 'https://nooks.ai/pricing',
  },
  {
    id: 'salesfinity',
    name: 'Salesfinity',
    kind: 'parallel',
    stated:
      'Gold $249 per licence a month billed annually ($299 month to month); Enterprise $299, 12-month plan',
    seat: 249,
    currency: 'USD',
    minSeats: null,
    lines: 'Five lines at once',
    what: 'Parallel dialer with an AI agent called Ari; 1–5 licences can be bought online.',
    bestFor: 'Small teams that want a parallel dialer without a sales call',
    url: 'https://salesfinity.ai/pricing',
  },
  {
    id: 'trellus',
    name: 'Trellus',
    kind: 'parallel',
    stated: 'Power $99.99/seat/month; Power + Parallel $149.99/seat/month; no seat minimum',
    seat: 149.99,
    currency: 'USD',
    minSeats: null,
    lines: 'Up to five numbers at once',
    what: 'Power and parallel dialer with AI practice calls included on Power + Parallel.',
    bestFor: 'One to a few reps who want parallel dialling and practice in one seat',
    url: 'https://www.trellus.ai/pricing',
  },
  {
    id: 'regie',
    name: 'Regie.ai',
    kind: 'parallel',
    stated:
      'Free tier; Pro $41/month billed annually (one person); Team $125/seat/month, two seats minimum',
    seat: 125,
    solo: 41,
    currency: 'USD',
    minSeats: 2,
    lines: 'Up to five lines at once',
    what: 'Prospecting suite with a built-in CRM, sequences and a parallel dialer.',
    bestFor: 'Small teams that want dialler, sequences and lists in one tool',
    url: 'https://regie.ai/pricing',
  },
  {
    id: 'koncert',
    name: 'Koncert',
    kind: 'parallel',
    stated: 'No public price (“Get Pricing”)',
    seat: null,
    currency: 'USD',
    minSeats: null,
    lines: '1 to 5 lines (Symphony+)',
    what: 'Parallel and agent-assisted dialers, local presence, managed caller ID reputation, AI voice agent add-on.',
    bestFor: 'Enterprise teams that want human dialing agents to clear phone trees',
    url: 'https://www.koncert.com/pricing',
  },
  {
    id: 'kixie',
    name: 'Kixie',
    kind: 'parallel',
    stated:
      'Price not readable on the page we opened (plans: Professional, Single-Line and Multi-Line PowerDialer)',
    seat: null,
    currency: 'USD',
    minSeats: null,
    lines: 'Up to 4 lines (Multi-Line PowerDialer)',
    what: 'Power dialer with a DNC add-on and AI human-voice detection add-on.',
    bestFor: 'HubSpot and Salesforce teams that want SMS and calling together',
    url: 'https://www.kixie.com/pricing/',
  },
  // ---- Phone systems with dialers (a rep talks) ----
  {
    id: 'cloudtalk',
    name: 'CloudTalk',
    kind: 'phone',
    stated:
      'Starter €25, Essential €29, Expert €49 per user a month billed annually; Parallel dialer €39, Power dialer €15 per user',
    seat: 68,
    currency: 'EUR',
    minSeats: null,
    lines: 'Up to ten lines per rep (five by default)',
    what: 'Cloud phone system; parallel dialer add-on; AI voice agents sold separately.',
    bestFor: 'European teams that want a phone system and a parallel dialer from one vendor',
    url: 'https://www.cloudtalk.io/pricing/',
  },
  {
    id: 'justcall',
    name: 'JustCall',
    kind: 'phone',
    stated:
      'Team $29, Pro $49, Pro Plus $89 per user/month billed annually, 2-seat minimum; SalesPro (predictive dialer) custom',
    seat: null,
    currency: 'USD',
    minSeats: 2,
    lines: 'Predictive dialer up to 10 lines (SalesPro)',
    what: 'Cloud phone system with local numbers; AI voice agent add-on from $0.15/min at volume.',
    bestFor: 'SMB teams that want local numbers and SMS on the same line',
    url: 'https://justcall.io/pricing/',
  },
  {
    id: 'dialpad',
    name: 'Dialpad Sell',
    kind: 'phone',
    stated: 'Essentials $39, Advanced $59, Premium $79 per user a month',
    seat: 39,
    currency: 'USD',
    minSeats: null,
    lines: null,
    what: 'Phone system for sales; Advanced adds Reach Booster (local presence dialing and voicemail drop).',
    bestFor: 'Teams that need a phone system first; no dialer is listed on the Sell plans',
    url: 'https://www.dialpad.com/pricing/',
  },
  {
    id: 'phoneburner',
    name: 'PhoneBurner',
    kind: 'phone',
    stated:
      'Standard $140 per user a month billed annually ($165 monthly); Premium $183 ($215 monthly)',
    seat: 140,
    currency: 'USD',
    minSeats: null,
    lines: 'Power dialer',
    what: 'Power dialer with unlimited dialling on its plans.',
    bestFor:
      'Teams that want power dialling (one number at a time per rep, so no second pickup to drop)',
    url: 'https://www.phoneburner.com/pricing',
  },
]

/* ---------------------------------------------------------------------------------------------
 * Sources and rules. `quote` is copied from the source; `plain` is our plain-English reading.
 * ------------------------------------------------------------------------------------------- */

export const SOURCES = {
  cfr7: {
    label: '47 CFR 64.1200(a)(7), Cornell LII (amended to 26 Oct 2026)',
    url: 'https://www.law.cornell.edu/cfr/text/47/64.1200',
  },
  ecfr: {
    label: 'eCFR: 47 CFR 64.1200 (TCPA rules)',
    url: 'https://www.ecfr.gov/current/title-47/chapter-I/subchapter-B/part-64/subpart-L/section-64.1200',
  },
  fcc2417: {
    label: 'FCC Declaratory Ruling FCC 24-17 (8 Feb 2024)',
    url: 'https://docs.fcc.gov/public/attachments/FCC-24-17A1.pdf',
  },
  ofcom: {
    label: 'Ofcom: persistent misuse policy statement (20 Dec 2016, in force 1 Mar 2017)',
    url: 'https://www.ofcom.org.uk/__data/assets/pdf_file/0024/96135/Persistent-Misuse-Policy-Statement.pdf',
  },
  pecr19: {
    label: 'UK PECR regulation 19 (automated calls), legislation.gov.uk',
    url: 'https://www.legislation.gov.uk/uksi/2003/2426/regulation/19',
  },
  icoAi: {
    label: 'ICO innovation advice: AI-produced greetings on marketing calls',
    url: 'https://ico.org.uk/for-organisations/advice-and-services/innovation-advice/previously-asked-questions/',
  },
  trai91: {
    label: 'TRAI press release 91/2026 (10 Jul 2026)',
    url: 'https://trai.gov.in/sites/default/files/2026-07/PR_No91of2026.pdf',
  },
  stir: {
    label: 'FCC: caller ID authentication (STIR/SHAKEN)',
    url: 'https://www.fcc.gov/call-authentication',
  },
} as const

export type SrcId = keyof typeof SOURCES

export type Country = 'us' | 'uk' | 'in' | 'other'

export type Rule = {
  id: string
  country: Country
  /** which kinds of tool the rule bites */
  hits: Kind[]
  title: string
  plain: string
  quote: string
  src: SrcId
}

export const RULES: Rule[] = [
  {
    id: 'us-ai-voice',
    country: 'us',
    hits: ['agent'],
    title: 'An AI voice is an “artificial voice”',
    plain:
      'The TCPA’s robocall rules cover AI voices, so an AI cold call is treated like a recorded-message call.',
    quote:
      'The TCPA’s restrictions on the use of “artificial or prerecorded voice” encompass current AI technologies that generate human voices.',
    src: 'fcc2417',
  },
  {
    id: 'us-consent',
    country: 'us',
    hits: ['agent'],
    title: 'Marketing calls with an artificial voice need written consent',
    plain:
      'An AI sales call to a mobile (business mobiles included) or a home line needs prior express written consent. A cold list has none.',
    quote:
      '…telemarketing, using an automatic telephone dialing system or an artificial or prerecorded voice… other than a call made with the prior express written consent of the called party',
    src: 'ecfr',
  },
  {
    id: 'us-abandon',
    country: 'us',
    hits: ['parallel', 'phone'],
    title: 'No more than 3% abandoned calls per campaign',
    plain:
      'When two people answer a parallel dial and only one reaches a rep, the other call can count as abandoned. Telemarketing campaigns must stay at or under 3% of live answers over 30 days.',
    quote:
      'Abandon more than three percent of all telemarketing calls that are answered live by a person, as measured over a 30-day period for a single calling campaign.',
    src: 'cfr7',
  },
  {
    id: 'us-two-seconds',
    country: 'us',
    hits: ['parallel', 'phone'],
    title: 'The 2-second test',
    plain:
      'A call counts as abandoned if no rep is on the line within 2 seconds of the person finishing their “hello”. Ask every parallel-dialer vendor how it handles a second pickup.',
    quote:
      'A call is “abandoned” if it is not connected to a live sales representative within two (2) seconds of the called person’s completed greeting.',
    src: 'cfr7',
  },
  {
    id: 'uk-ofcom',
    country: 'uk',
    hits: ['parallel', 'phone'],
    title: 'Ofcom no longer sets a fixed abandoned-call rate',
    plain:
      'The “3% in the UK” figure many vendor pages repeat comes from Ofcom’s 2010 policy. Since 1 Mar 2017 Ofcom weighs the harm instead, and still expects a short information message within about 2 seconds of a dropped pickup.',
    quote:
      'We have not included as a prioritisation criterion in the revised policy a reference to a specific abandoned call rate.',
    src: 'ofcom',
  },
  {
    id: 'uk-ai',
    country: 'uk',
    hits: ['agent'],
    title: 'An AI voice is “recorded material”',
    plain:
      'Automated marketing calls with recorded material need the person’s prior consent, and the ICO treats an AI-made voice as recorded material.',
    quote:
      'no part of a direct marketing call can include recorded material without consent from the individual receiving the call.',
    src: 'icoAi',
  },
  {
    id: 'in-140',
    country: 'in',
    hits: ['agent', 'parallel', 'phone'],
    title: 'Promotional calls only from 140-series numbers',
    plain:
      'In India every promotional call, from a rep or an AI, must go out from a 140xx number registered for that purpose.',
    quote:
      'TRAI has mandated use of 140xx series numbers for making promotional calls by entities of any sector.',
    src: 'trai91',
  },
  {
    id: 'us-stir',
    country: 'us',
    hits: ['agent', 'parallel', 'phone'],
    title: 'Caller ID is checked on every call',
    plain:
      'Carriers verify that a call really comes from the number shown. Spoofed or rotated numbers that fail checks get blocked or labelled, which is why connect rates fall.',
    quote:
      'SHAKEN/STIR digitally validates the handoff of phone calls passing through the complex web of networks',
    src: 'stir',
  },
]

/* ---------------------------------------------------------------------------------------------
 * Pure functions (used by the server figures, the picker and the claims script)
 * ------------------------------------------------------------------------------------------- */

export function byKind(kind: Kind): Tool[] {
  return TOOLS.filter((t) => t.kind === kind)
}

/** seats you actually pay for */
export function seatsBilled(t: Tool, reps: number): number {
  if (reps <= 1 && t.solo != null) return 1
  return Math.max(reps, t.minSeats ?? 1)
}

/** year-one list price for `reps` seats, null when the price is not public */
export function yearOne(t: Tool, reps: number): number | null {
  if (t.seat == null) return null
  if (reps <= 1 && t.solo != null) return Math.round(t.solo * 12 * 100) / 100
  return Math.round(seatsBilled(t, reps) * t.seat * 12 * 100) / 100
}

/** monthly cost range for `minutes` AI minutes, null when no per-minute price is public */
export function minuteCost(t: Tool, minutes: number): { low: number; high: number } | null {
  if (!t.perMin) return null
  const f = t.perMin.floor ?? 0
  return {
    low: Math.round(Math.max(f, t.perMin.low * minutes + t.perMin.fee) * 100) / 100,
    high: Math.round(Math.max(f, t.perMin.high * minutes + t.perMin.fee) * 100) / 100,
  }
}

export function money(n: number, c: Currency = 'USD'): string {
  const sym = c === 'EUR' ? '€' : '$'
  const whole = Math.abs(n - Math.round(n)) < 0.005
  return `${sym}${n.toLocaleString('en-US', {
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: whole ? 0 : 2,
  })}`
}

export type WhoTalks = 'ai' | 'rep'
export type Audience = 'consumers' | 'bizMobile' | 'bizLandline'

export type PickInput = {
  who: WhoTalks
  reps: number
  minutes: number
  audience: Audience
  country: Country
  consent: boolean
}

export type Verdict = 'go' | 'conditions' | 'stop'

export type Pick = {
  kind: Kind
  verdict: Verdict
  headline: string
  why: string[]
  priced: { tool: Tool; text: string; value: number | null }[]
  hidden: Tool[]
  rules: Rule[]
}

/** The picker. Pure: same input, same output. Our reading of the quoted rules, not legal advice. */
export function pick(i: PickInput): Pick {
  const why: string[] = []
  const reps = Math.max(1, Math.round(i.reps))
  const minutes = Math.max(0, Math.round(i.minutes))

  if (i.who === 'ai') {
    let verdict: Verdict = 'go'
    let headline = 'An AI voice agent fits, billed by the minute.'
    const strict = i.country === 'us' || i.country === 'uk'
    const covered = i.country === 'us' ? i.audience !== 'bizLandline' : i.country === 'uk'
    if (strict && covered && !i.consent) {
      verdict = 'stop'
      headline =
        'Not for cold calls: an AI voice needs prior consent here. Keep a rep on cold lists and use the AI for consented callbacks.'
      why.push(
        i.country === 'us'
          ? 'The FCC treats AI voices as artificial voices; marketing calls to mobiles and home lines need prior express written consent.'
          : 'PECR regulation 19 needs prior consent for automated marketing calls, and the ICO counts an AI voice as recorded material.'
      )
    } else if (strict && covered) {
      verdict = 'conditions'
      headline = 'Yes, for people who gave consent. Keep the consent record and say who is calling.'
      why.push('Your consent must cover calls of this kind from your business; keep proof of it.')
    } else if (i.country === 'us' && i.audience === 'bizLandline') {
      verdict = 'conditions'
      headline =
        'Possible on business landlines, but check state laws and scrub any mobiles out of the list first.'
      why.push(
        'The federal artificial-voice rules name mobiles and residential lines; many “business” lists mix in mobiles, which are covered.'
      )
    } else if (i.country === 'in') {
      verdict = 'conditions'
      headline = 'Yes, from a registered 140-series number, respecting DND preferences.'
      why.push(
        'TRAI requires promotional calls from 140xx numbers, whoever or whatever is speaking.'
      )
    } else {
      verdict = 'conditions'
      headline =
        'Likely needs prior consent: many countries treat AI voices like automated calls (in the EU, ePrivacy Article 13 needs prior consent for automated calling). Check yours before you dial.'
      why.push('Our laws guide quotes the rules for 8 countries, including Germany and the EU.')
    }
    const priced = byKind('agent')
      .map((tool) => {
        const c = minuteCost(tool, minutes)
        return {
          tool,
          value: c ? c.low : null,
          text: c
            ? c.low === c.high
              ? `${money(c.low)} a month`
              : `${money(c.low)}–${money(c.high)} a month`
            : tool.stated,
        }
      })
      .sort((a, b) => (a.value ?? Infinity) - (b.value ?? Infinity))
    return {
      kind: 'agent',
      verdict,
      headline,
      why,
      priced,
      hidden: [], // agents without a per-minute price show their stated price in the list
      rules: RULES.filter((r) => r.hits.includes('agent') && r.country === i.country),
    }
  }

  // a rep talks
  const kind: Kind = reps >= 3 ? 'parallel' : 'phone'
  let verdict: Verdict = 'go'
  let headline =
    kind === 'parallel'
      ? 'An AI parallel dialer fits: software dials, your reps talk.'
      : 'Start with a phone system and power dialer; add parallel dialing when the team grows.'
  if (i.country === 'us') {
    verdict = 'conditions'
    if (i.audience === 'consumers')
      headline =
        'A rep must talk, and you must scrub the National and state Do Not Call lists. Parallel dialing drops pickups: stay under the 3% abandoned-call cap or dial one line at a time.'
    why.push(
      '47 CFR 64.1200(a)(7) caps abandoned telemarketing calls at 3% of live answers per campaign over 30 days; a call is abandoned if no rep is on within 2 seconds of the greeting. Its definition of telemarketing is not limited to consumers.'
    )
    why.push(
      'On a dropped pickup, play a short recorded message with your business name and a number for do-not-call requests, let unanswered calls ring at least 15 seconds or four rings, and keep records of your abandoned-call rate.'
    )
  } else if (i.country === 'uk') {
    verdict = 'conditions'
    why.push(
      'Ofcom has no fixed rate since 2017 but treats abandoned and silent calls as misuse; play an information message on dropped pickups and screen live calls against the TPS.'
    )
  } else if (i.country === 'in') {
    verdict = 'conditions'
    why.push('Dial promotional calls from a 140xx number and respect DND preferences.')
  }
  if (reps < 3)
    why.push(
      'Parallel dialers pay off when reps spend most of their day dialling; under 3 reps a one-line dialer usually costs less.'
    )

  const pool = [...byKind('parallel'), ...byKind('phone')]
  const priced = pool
    .filter((t) => t.seat != null && t.lines != null)
    .map((tool) => {
      const y = yearOne(tool, reps) as number
      const billed = seatsBilled(tool, reps)
      return {
        tool,
        value: tool.currency === 'USD' ? y : null,
        text: `${money(y, tool.currency)} in year one${billed > reps ? ` (minimum ${billed} seats)` : ''}`,
      }
    })
    .sort((a, b) => (a.value ?? Infinity) - (b.value ?? Infinity))
  return {
    kind,
    verdict,
    headline,
    why,
    priced,
    hidden: pool.filter((t) => t.seat == null),
    // Dialpad Sell lists no dialer on its pricing page, so it is neither priced nor 'hidden' here
    rules: RULES.filter(
      (r) => (r.hits.includes('parallel') || r.hits.includes('phone')) && r.country === i.country
    ),
  }
}

/** Counts printed on the page; computed, never typed. */
export function counts() {
  const agents = byKind('agent')
  const dialers = [...byKind('parallel'), ...byKind('phone')]
  return {
    tools: TOOLS.length,
    agents: agents.length,
    parallel: byKind('parallel').length,
    phone: byKind('phone').length,
    hiddenPrice: TOOLS.filter((t) => t.stated.startsWith('No public price')).length,
    publicPrice: TOOLS.filter((t) => /\$|€/.test(t.stated)).length,
    agentsPerMin: agents.filter((t) => t.perMin).length,
    dialersSeat: dialers.filter((t) => t.seat != null).length,
    fiveLines: TOOLS.filter((t) => t.lines && /\b5\b|five/i.test(t.lines)).length,
    rules: RULES.length,
  }
}

/** Worked example used on the page */
export const WORKED = { reps: 5, minutes: 1000 }
