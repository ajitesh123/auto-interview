// AI calling for real estate owner page: /blog/ai-calling-for-real-estate-convert-more-leads-2026
// Every rule and number comes from SOURCES below (opened 20 Nov 2026). Rules are quoted from the
// regulator, statute or court page; prices are as written on each vendor's own page. Where we
// interpret a rule (which lead types need which consent), the text says so. Not legal advice.
// The call check is pure logic over these rules: no AI, nothing leaves the browser.

export const CHECKED = '20 Nov 2026'

export const TTAI_URL =
  'https://www.toughtongueai.com/?utm_source=autointerviewai&utm_medium=blog&utm_campaign=ai-calling-for-real-estate'

export type Src = { label: string; url: string }

export const SOURCES = {
  fcc2417: {
    label: 'FCC Declaratory Ruling FCC 24-17 (released 8 Feb 2024)',
    url: 'https://docs.fcc.gov/public/attachments/FCC-24-17A1.pdf',
  },
  ecfr1200: {
    label: 'eCFR: 47 CFR 64.1200 (TCPA rules, text current to 7 Oct 2026)',
    url: 'https://www.ecfr.gov/current/title-47/chapter-I/subchapter-B/part-64/subpart-L/section-64.1200',
  },
  ca11: {
    label: 'Insurance Marketing Coalition v. FCC, 11th Cir., 24 Jan 2025',
    url: 'https://media.ca11.uscourts.gov/opinions/pub/files/202410277.pdf',
  },
  fcc2667: {
    label: 'FCC 26-67, consent revocation order (Federal Register, 26 Oct 2026)',
    url: 'https://www.govinfo.gov/content/pkg/FR-2026-10-26/pdf/2026-21821.pdf',
  },
  tsr: {
    label: 'eCFR: 16 CFR 310.4, FTC Telemarketing Sales Rule (text current to 16 Jul 2026)',
    url: 'https://www.ecfr.gov/current/title-16/chapter-I/subchapter-C/part-310/section-310.4',
  },
  tsrDef: {
    label: 'eCFR: 16 CFR 310.2, TSR definitions (established business relationship)',
    url: 'https://www.ecfr.gov/current/title-16/chapter-I/subchapter-C/part-310/section-310.2',
  },
  flFtsa: {
    label: 'Florida Statutes 501.059 (2024), Telephone Solicitation Act',
    url: 'https://www.flsenate.gov/laws/statutes/2024/501.059',
  },
  fl616: {
    label: 'Florida Statutes 501.616 (2025): hours and 3 calls a day',
    url: 'https://flsenate.gov/Laws/Statutes/2025/501.616',
  },
  traiPr: {
    label: 'TRAI press release 11/2025 (12 Feb 2025)',
    url: 'https://trai.gov.in/sites/default/files/2025-02/PR_No.11of2025.pdf',
  },
  trai113: {
    label: 'TRAI press release 113/2026: 1601 series (10 Aug 2026)',
    url: 'https://trai.gov.in/sites/default/files/2026-08/PR_No113of2026_1.pdf',
  },
  traiReg: {
    label: 'TRAI TCCCPR Second Amendment Regulations (12 Feb 2025)',
    url: 'https://www.trai.gov.in/sites/default/files/2025-02/Regulation_12022025.pdf',
  },
  rera: {
    label: 'Real Estate (Regulation and Development) Act 2016, India Code',
    url: 'https://www.indiacode.nic.in/bitstream/123456789/19012/1/reraact.pdf',
  },
  uae56: {
    label: 'UAE Cabinet Resolution No. 56 of 2024 on telemarketing (10 Jun 2024)',
    url: 'https://uaelegislation.gov.ae/en/legislations/2519/download',
  },
  pecr19: {
    label: 'UK PECR regulation 19 (automated calls), legislation.gov.uk',
    url: 'https://www.legislation.gov.uk/uksi/2003/2426/regulation/19',
  },
  pecr21: {
    label: 'UK PECR regulation 21 (live calls and TPS), legislation.gov.uk',
    url: 'https://www.legislation.gov.uk/uksi/2003/2426/regulation/21',
  },
  icoAi: {
    label: 'ICO innovation advice: AI-produced greetings on marketing calls',
    url: 'https://ico.org.uk/for-organisations/advice-and-services/innovation-advice/previously-asked-questions/',
  },
  acma: {
    label: 'ACMA: say no to telemarketers (calling hours)',
    url: 'https://www.acma.gov.au/say-no-to-telemarketers',
  },
  dncrAu: {
    label: 'Australia Do Not Call Register Act 2006, s.11',
    url: 'https://www.legislation.gov.au/C2006A00088/2021-09-01/2021-09-01/text/original/pdf',
  },
  euAiAct: {
    label: 'European Commission FAQ: AI Act Article 50 (updated 24 Jul 2026)',
    url: 'https://digital-strategy.ec.europa.eu/en/faqs/transparency-obligations-under-article-50-ai-act',
  },
  mit: {
    label: 'Lead Response Management study, InsideSales.com with MIT (presented Oct 2007)',
    url: 'https://www.mortech.com/hs-fs/hub/25649/file-13535879-pdf/docs/mit_study.pdf',
  },
  hbr: {
    label: 'Oldroyd, McElheran, Elkington: The Short Life of Online Sales Leads (HBR, Mar 2011)',
    url: 'https://hbr.org/2011/03/the-short-life-of-online-sales-leads',
  },
  nar2026: {
    label: 'NAR: top 10 takeaways from the 2026 Profile of Home Buyers and Sellers (5 Nov 2026)',
    url: 'https://www.nar.realtor/news/economists-outlook/top-10-takeaways-from-nars-2026-profile-of-home-buyers-and-sellers',
  },
  narCold: {
    label: 'NAR: telemarketing and cold calling resources',
    url: 'https://www.nar.realtor/telemarketing-cold-calling',
  },
} satisfies Record<string, Src>

export type SrcId = keyof typeof SOURCES

/** Headline research numbers, each from one opened source. */
export const RESEARCH = {
  contactOdds: 100, // odds of contacting a lead drop 100x calling at 30 min vs 5 min (MIT/InsideSales 2007)
  qualifyOdds: 21, // odds of qualifying drop 21x (same study)
  buyersUseAgent: 90, // NAR 2026 Profile
  sellersUseAgent: 92, // NAR 2026 Profile
}

/* ---------------------------------------------------------------------------------------------
 * Rules by country. `quote` is copied from the source; `plain` is our plain-English reading.
 * ------------------------------------------------------------------------------------------- */

export type CountryId = 'us' | 'in' | 'ae' | 'uk' | 'au'

export type Rule = { plain: string; quote: string; src: SrcId }

export type Country = {
  id: CountryId
  name: string
  short: string
  hours: string
  aiRule: string
  rules: Rule[]
}

export const COUNTRIES: Country[] = [
  {
    id: 'us',
    name: 'United States',
    short: 'US',
    hours: '8 a.m. to 9 p.m. at the person’s location (Florida: 8 a.m. to 8 p.m.)',
    aiRule:
      'An AI voice is an “artificial voice” under the TCPA, so the consent rules for robocalls apply.',
    rules: [
      {
        plain: 'AI-generated voices count as artificial voices under the TCPA.',
        quote:
          'The TCPA’s restrictions on the use of “artificial or prerecorded voice” encompass current AI technologies that generate human voices.',
        src: 'fcc2417',
      },
      {
        plain:
          'A marketing call to a mobile number with an artificial voice needs prior express written consent.',
        quote:
          '…telemarketing, using an automatic telephone dialing system or an artificial or prerecorded voice… other than a call made with the prior express written consent of the called party',
        src: 'ecfr1200',
      },
      {
        plain:
          'The same applies to residential landlines, and there is no “past client” exception for artificial-voice marketing calls.',
        quote:
          'Initiate any telephone call to any residential line using an artificial or prerecorded voice to deliver a message',
        src: 'ecfr1200',
      },
      {
        plain: 'Say who is calling at the start and give a phone number.',
        quote:
          'At the beginning of the message, state clearly the identity of the business, individual, or other entity that is responsible for initiating the call.',
        src: 'ecfr1200',
      },
      {
        plain:
          'A “stop” said in any reasonable way ends consent; honour it within 10 business days at the latest.',
        quote:
          'must be honored within a reasonable time not to exceed ten business days from receipt of such request.',
        src: 'ecfr1200',
      },
      {
        plain:
          'Live (human) sales calls: scrub the National Do Not Call list at least every 31 days and keep your own do-not-call list.',
        quote:
          'employing a version of the “do-not-call” registry obtained from the Commission no more than thirty-one (31) days prior to the date any call is made',
        src: 'tsr',
      },
      {
        plain:
          'Florida: no unsolicited sales calls that use automated selection and dialing, or play a recorded message when answered, without prior express written consent; at most 3 calls in 24 hours on the same subject.',
        quote:
          'A person may not make or knowingly allow to be made an unsolicited telephonic sales call if such call involves an automated system for the selection and dialing of telephone numbers or the playing of a recorded message when a connection is completed to a number called without the prior express written consent of the called party.',
        src: 'flFtsa',
      },
    ],
  },
  {
    id: 'in',
    name: 'India',
    short: 'India',
    hours:
      'No fixed national window; people block time bands and categories in their DND preferences, which senders must respect',
    aiRule:
      'We found no rule specific to AI voices; TRAI’s commercial-communication rules apply to every promotional call.',
    rules: [
      {
        plain:
          'Promotional calls only from 140-series numbers. The 1600 service series went to banks, financial firms and government; a 1601 series for other sectors started in Aug 2026 in phases, so check whether real estate is eligible yet.',
        quote:
          'While the 140 series will continue to be used for promotional calls… the newly allocated 1600 series is designated for transactional and service calls.',
        src: 'traiPr',
      },
      {
        plain: 'Robocalls and auto-dialled promotional calls only from 140-series numbers.',
        quote: 'promotional call should be permitted through 140-series numbers only',
        src: 'traiReg',
      },
      {
        plain:
          'After an opt-out, no new consent request for 90 days; consent for an ongoing transaction lasts 7 days.',
        quote:
          'A sender shall not make a request seeking consent of a customer who has opted out, before ninety (90) days.',
        src: 'traiPr',
      },
      {
        plain:
          'Senders who break the rules lose outgoing service for 15 days, then face disconnection and a 1-year blacklist.',
        quote: 'outgoing services of all telecom resource of the sender will be barred for 15 days',
        src: 'traiPr',
      },
      {
        plain:
          'RERA: project marketing must show the RERA website and registration details; agents must be RERA-registered.',
        quote: 'shall mention prominently the website address of the Authority',
        src: 'rera',
      },
    ],
  },
  {
    id: 'ae',
    name: 'UAE (Dubai, Abu Dhabi)',
    short: 'UAE',
    hours: '9:00 a.m. to 6:00 p.m.',
    aiRule:
      'We found no UAE rule specific to AI voices; Cabinet Resolution 56 of 2024 applies to every marketing call.',
    rules: [
      {
        plain: 'Marketing calls only from 9 a.m. to 6 p.m.',
        quote: 'Make Marketing Phone Calls only during the period from 9:00 am to 6:00 pm.',
        src: 'uae56',
      },
      {
        plain: 'Never call numbers on the Do Not Call Register (DNCR).',
        quote:
          'Do not call for marketing products or services to Consumers whose numbers are listed on the DNCR.',
        src: 'uae56',
      },
      {
        plain: 'Record marketing calls and say so when the call begins.',
        quote:
          'Record Marketing Phone Calls, with the necessity of informing the Consumer of this recording when the call begins.',
        src: 'uae56',
      },
      {
        plain: 'Use local numbers from licensed UAE telecom companies.',
        quote:
          'Use local Phone numbers issued by telecommunications companies licensed in the State',
        src: 'uae56',
      },
      {
        plain:
          'If they don’t answer or hang up, call back at most once a day and twice a week (Art. 5(5)).',
        quote: 'more than once a day',
        src: 'uae56',
      },
    ],
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    short: 'UK',
    hours: 'No fixed legal window in PECR; TPS and objection rules apply to live calls',
    aiRule:
      'The ICO says even an AI-made greeting is recorded material, so automated-call consent rules apply.',
    rules: [
      {
        plain: 'Automated marketing calls with recorded material need the person’s prior consent.',
        quote:
          'A person shall neither transmit, nor instigate the transmission of, communications comprising recorded matter for direct marketing purposes by means of an automated calling or communication system except in the circumstances referred to in paragraph (2).',
        src: 'pecr19',
      },
      {
        plain:
          'An AI voice counts: no part of a marketing call can be recorded material without consent.',
        quote:
          'no part of a direct marketing call can include recorded material without consent from the individual receiving the call.',
        src: 'icoAi',
      },
      {
        plain:
          'Live calls by a person: not to numbers on the TPS, and not to anyone who has objected.',
        quote:
          'the number allocated to a subscriber in respect of the called line is one listed in the register kept under regulation 26.',
        src: 'pecr21',
      },
    ],
  },
  {
    id: 'au',
    name: 'Australia',
    short: 'Australia',
    hours:
      'Weekdays 9 a.m. to 8 p.m., Saturday 9 a.m. to 5 p.m.; no Sundays or national public holidays',
    aiRule:
      'We found no Australian rule specific to AI voices; the Do Not Call Register and ACMA hours apply to telemarketing calls.',
    rules: [
      {
        plain: 'No telemarketing calls to numbers on the Do Not Call Register without consent.',
        quote:
          'A person must not make, or cause to be made, a telemarketing call to an Australian number if: (a) the number is registered on the Do Not Call Register',
        src: 'dncrAu',
      },
      {
        plain:
          'Calling hours: weekdays 9–8, Saturday 9–5, never Sunday or national public holidays.',
        quote: 'They must not call on national public holidays.',
        src: 'acma',
      },
    ],
  },
]

/* ---------------------------------------------------------------------------------------------
 * The call check: country × call type × written consent → what you can do.
 * This is our reading of the rules above, not legal advice.
 * ------------------------------------------------------------------------------------------- */

export type CallType = 'inbound' | 'booked' | 'inquiry' | 'openhouse' | 'pastclient' | 'cold'

export const CALL_TYPES: { id: CallType; label: string; hint: string; marketing: boolean }[] = [
  {
    id: 'inbound',
    label: 'Answer calls people make to you',
    hint: 'Your listing line, sign calls, after-hours calls',
    marketing: false,
  },
  {
    id: 'booked',
    label: 'Confirm or reschedule a booked showing',
    hint: 'No selling on the call',
    marketing: false,
  },
  {
    id: 'inquiry',
    label: 'Call back a web or portal inquiry',
    hint: 'They asked about a listing or a home valuation',
    marketing: true,
  },
  {
    id: 'openhouse',
    label: 'Follow up open-house visitors',
    hint: 'Numbers from a sign-in sheet or app',
    marketing: true,
  },
  {
    id: 'pastclient',
    label: 'Call past clients or your sphere',
    hint: '“Thinking of selling?” check-ins',
    marketing: true,
  },
  {
    id: 'cold',
    label: 'Cold call expireds, FSBOs or a bought list',
    hint: 'People who never gave you their number',
    marketing: true,
  },
]

export type Verdict = 'go' | 'conditions' | 'human'

export const VERDICTS: Record<Verdict, { label: string; tone: 'success' | 'warn' | 'danger' }> = {
  go: { label: 'AI can make this call', tone: 'success' },
  conditions: { label: 'AI can call, with conditions', tone: 'warn' },
  human: { label: 'Use a person, not an AI voice', tone: 'danger' },
}

export type CheckResult = {
  verdict: Verdict
  why: string
  todo: string[]
  srcs: SrcId[]
}

const DISCLOSE =
  'Open with who you are and that this is an AI assistant calling for them (the EU AI Act requires it from 2 Aug 2026; elsewhere it is the honest default).'

export function checkCall(country: CountryId, type: CallType, consent: boolean): CheckResult {
  const c = COUNTRIES.find((x) => x.id === country) ?? COUNTRIES[0]
  const hours = `Calling hours: ${c.hours}.`

  if (type === 'inbound') {
    return {
      verdict: 'go',
      why: 'The calling rules on this page govern calls you start. When the person calls you, an AI can answer, qualify and book.',
      todo: [
        'Say at the start that it is an AI assistant and offer a person.',
        country === 'ae'
          ? 'If the call turns into marketing, the UAE recording notice applies: tell them the call is recorded.'
          : 'Tell callers if you record, and check your local recording-consent rule.',
        'Hand off fast: price negotiation, offers and legal questions go to a licensed agent.',
      ],
      srcs: country === 'ae' ? ['uae56'] : [],
    }
  }

  if (country === 'us') {
    if (type === 'booked') {
      return {
        verdict: 'conditions',
        why: 'A confirmation that sells nothing is not telemarketing, so written consent is not needed, but an AI voice to a mobile still needs the person’s prior consent to be called.',
        todo: [
          'Keep a record of how and why they gave you the number (the booking).',
          'No offers, “new listings” or “thinking of selling?” on this call, or it becomes telemarketing.',
          'State your business name at the start and give a call-back number.',
          'If they say stop, stop all calls within 10 business days at the latest.',
        ],
        srcs: ['fcc2417', 'ecfr1200'],
      }
    }
    if (type === 'cold' && !consent) {
      return {
        verdict: 'human',
        why: 'A marketing call with an AI voice needs prior express written consent, which a cold list never has. An AI voice here breaks the TCPA on every call.',
        todo: [
          'If you call, a person dials and talks. Scrub the National Do Not Call list (at most 31 days old) and your own list first.',
          'FSBO and expired owners on the Do Not Call list are off limits for sales calls.',
          'Florida: no automated selection-and-dialing for these calls, and no more than 3 calls in 24 hours.',
          'Use AI to prepare the person instead: practise the expired and FSBO calls before dialing.',
        ],
        srcs: ['fcc2417', 'ecfr1200', 'tsr', 'flFtsa', 'fl616', 'narCold'],
      }
    }
    // inquiry, openhouse, pastclient
    if (!consent) {
      return {
        verdict: 'human',
        why:
          type === 'pastclient'
            ? 'Having done business with them is not enough: artificial-voice marketing calls have no past-client exception. Without written consent, a person must make this call.'
            : 'An inquiry or a sign-in is not written consent to AI calls unless the form said so. Without that wording, have a person call back, fast.',
        todo:
          type === 'pastclient'
            ? [
                'A person may call. If the last closing was more than 18 months ago, scrub the National Do Not Call list first: the business-relationship exemption for live calls runs 18 months after a transaction.',
                'Ask for AI-call consent in writing at your next contact.',
                'On the Do Not Call list? Send a note or email instead of calling.',
              ]
            : [
                'Call back by hand within minutes; that is where speed pays.',
                'Add consent wording to your forms and sign-in sheets now, so future leads can get AI calls (it must name you and cover artificial-voice calls).',
                'Text or email them a link to book a time if you can’t call quickly.',
              ],
        srcs:
          type === 'pastclient'
            ? ['fcc2417', 'ecfr1200', 'tsr', 'tsrDef']
            : ['fcc2417', 'ecfr1200'],
      }
    }
    return {
      verdict: 'conditions',
      why: 'With prior express written consent that covers your calls, an AI voice can call, qualify and book.',
      todo: [
        hours,
        DISCLOSE,
        'Store the consent text, date, source page and number with the lead.',
        'Honour any “stop” within 10 business days at the latest, across calls and texts.',
        'Florida numbers: no more than 3 calls in 24 hours on the same subject.',
      ],
      srcs: ['fcc2417', 'ecfr1200', 'fl616'],
    }
  }

  if (country === 'uk') {
    if (type === 'booked') {
      return {
        verdict: 'conditions',
        why: 'PECR’s automated-call consent rule covers direct marketing. A confirmation with no marketing is a service call.',
        todo: [
          'Keep it to the appointment: no listings or valuations offers.',
          'Say who is calling and that it is an AI assistant.',
        ],
        srcs: ['pecr19'],
      }
    }
    if (!consent) {
      return {
        verdict: 'human',
        why: 'The ICO treats an AI voice as recorded material, and automated marketing calls with recorded material need the person’s specific prior consent.',
        todo: [
          'A person can make live calls, but never to TPS-registered numbers or anyone who has objected.',
          'Ask for consent to automated calls on your forms, by name, before using AI.',
        ],
        srcs: ['pecr19', 'icoAi', 'pecr21'],
      }
    }
    return {
      verdict: 'conditions',
      why: 'With specific consent to automated calls from you, an AI voice can make the call.',
      todo: [DISCLOSE, 'Keep a record of the consent and stop the moment they object.'],
      srcs: ['pecr19', 'icoAi'],
    }
  }

  if (country === 'in') {
    if (type === 'booked') {
      return {
        verdict: 'conditions',
        why: 'A confirmation or reminder is a service call, not a promotional one. Keep offers off it, and send it from your DLT-registered business number unless TRAI has opened the 1601 service series to real estate.',
        todo: [
          'Use your DLT-registered business number; move to a 1601 number if TRAI makes real estate eligible.',
          'No project offers on the same call, or it becomes promotional.',
          DISCLOSE,
        ],
        srcs: ['traiPr', 'trai113'],
      }
    }
    return {
      verdict: 'conditions',
      why: 'Promotional AI calls are allowed from registered 140-series numbers, within the person’s DND preferences.',
      todo: [
        'Call only from a 140-series number registered for promotional calls; never from a personal mobile or an unregistered SIP line.',
        consent
          ? 'Keep the consent record; if they opt out, don’t ask again for 90 days.'
          : 'Without consent, respect every DND preference the person has set (categories and time bands).',
        'Quote the RERA registration and the RERA website when you pitch a project.',
        'Bought lists carry no consent from the people on them; build your own consented list instead.',
        DISCLOSE,
      ],
      srcs: ['traiPr', 'traiReg', 'rera'],
    }
  }

  if (country === 'ae') {
    if (type === 'booked') {
      return {
        verdict: 'conditions',
        why: 'Resolution 56 covers marketing calls; a booked-showing confirmation with no selling sits outside it, but keep the same habits.',
        todo: ['Call from your licensed local number.', DISCLOSE],
        srcs: ['uae56'],
      }
    }
    return {
      verdict: 'conditions',
      why: 'Marketing calls are allowed with strict conditions, and they apply the same way to an AI caller.',
      todo: [
        'Call only from 9 a.m. to 6 p.m.',
        'Skip every number on the DNCR.',
        'Record the call and say so at the start.',
        'Use a local number from a licensed UAE telecom company.',
        'No answer or hung up? Call back at most once a day and twice a week.',
        DISCLOSE,
      ],
      srcs: ['uae56'],
    }
  }

  // au
  if (type === 'booked') {
    return {
      verdict: 'conditions',
      why: 'A confirmation with no offer is not a telemarketing call, but keep to the ACMA hours anyway.',
      todo: ['Keep it to the appointment.', DISCLOSE],
      srcs: ['acma'],
    }
  }
  return {
    verdict: 'conditions',
    why: consent
      ? 'With consent, an AI caller can make the call within ACMA hours.'
      : 'Telemarketing calls to numbers on the Do Not Call Register need consent; numbers not on it can be called within ACMA hours.',
    todo: [
      hours,
      consent
        ? 'Keep the consent record.'
        : 'Wash the list against the Do Not Call Register first.',
      DISCLOSE,
    ],
    srcs: ['dncrAu', 'acma'],
  }
}

/* ---------------------------------------------------------------------------------------------
 * Vendors that sell AI calling to real estate, prices as written on their own pages (20 Nov 2026).
 * ------------------------------------------------------------------------------------------- */

export type Vendor = {
  name: string
  market: string
  what: string
  stated: string
  url: string
  ours?: boolean
}

export const VENDORS: Vendor[] = [
  {
    name: 'Lofty AI Sales Agent',
    market: 'US',
    what: 'Texts and calls new leads from inside Lofty CRM, live-transfers and books',
    stated:
      'Free (10 leads); Pro $60/month (200 leads); Max $150/month + overages (500 leads, then $0.30/lead)',
    url: 'https://help.lofty.com/hc/en-us/articles/51928215387803-Sales-Agent-Packages',
  },
  {
    name: 'JustCall AI Voice Agent',
    market: 'US',
    what: 'AI receptionist and caller with Follow Up Boss, kvCORE, BoomTown and others',
    stated: 'AI Voice Agent add-on “Starting at $0.15/min”, on top of a JustCall plan',
    url: 'https://justcall.io/product/ai-voice-agent/real-estate/',
  },
  {
    name: 'Retell AI',
    market: 'Global',
    what: 'Build-your-own voice agent platform with real-estate templates',
    stated: '$0.07–$0.31 per minute; phone line extra',
    url: 'https://www.retellai.com/pricing',
  },
  {
    name: 'Ylopo AI Voice (rAIya)',
    market: 'US',
    what: 'Calls Ylopo and portal leads for up to 90 days, live-transfers to agents',
    stated: 'Not published (market-based quote)',
    url: 'https://www.ylopo.com/pricing',
  },
  {
    name: 'Bolna',
    market: 'India',
    what: 'Voice AI platform with a property-tech inquiry agent',
    stated: 'Pay as you go from ₹5.52 (6¢) per minute',
    url: 'https://www.bolna.ai/pricing',
  },
  {
    name: 'Edesy',
    market: 'India',
    what: 'Hindi/English follow-up calls for developers’ inquiries',
    stated: '₹6/minute + telephony (pay as you go), prices exclude 18% GST',
    url: 'https://edesy.in/ai-voice-agent/pricing',
  },
  {
    name: 'Caller.Digital',
    market: 'India',
    what: 'Hindi and regional AI calls for portal leads and site-visit booking',
    stated: 'Pay-as-you-go total ₹9.4175 per minute in its pricing breakdown',
    url: 'https://caller.digital/pricing',
  },
  {
    name: 'SquadStack',
    market: 'India',
    what: 'Hindi/Indic voice agents that qualify portal leads and book site visits',
    stated: 'Quote only: per minute of live calls plus a one-time set-up fee',
    url: 'https://www.squadstack.ai/pricing',
  },
  {
    name: 'Tough Tongue AI (our product)',
    market: 'Global',
    what: 'Voice agents for calls and meetings, plus roleplay practice for agents',
    stated: 'See the site',
    url: TTAI_URL,
    ours: true,
  },
]

/** Per-minute rates the cost estimator can use; only rates stated per minute above. */
export type Rate = {
  id: string
  label: string
  currency: 'USD' | 'INR'
  low: number
  high: number
  note: string
}

export const RATES: Rate[] = [
  {
    id: 'retell',
    label: 'Retell AI',
    currency: 'USD',
    low: 0.07,
    high: 0.31,
    note: 'plus phone line',
  },
  {
    id: 'justcall',
    label: 'JustCall AI add-on',
    currency: 'USD',
    low: 0.15,
    high: 0.15,
    note: 'starting rate; plus a JustCall plan',
  },
  {
    id: 'bolna',
    label: 'Bolna (PAYG)',
    currency: 'INR',
    low: 5.52,
    high: 5.52,
    note: 'from-price',
  },
  {
    id: 'edesy',
    label: 'Edesy (PAYG)',
    currency: 'INR',
    low: 6,
    high: 6,
    note: 'plus telephony and 18% GST',
  },
  {
    id: 'callerdigital',
    label: 'Caller.Digital (PAYG)',
    currency: 'INR',
    low: 9.4175,
    high: 9.4175,
    note: 'breakdown total',
  },
]

export function monthlyMinutes(leads: number, minutesPerLead: number): number {
  const l = Math.max(0, Math.min(100000, Math.round(leads)))
  const m = Math.max(0, Math.min(60, minutesPerLead))
  return Math.round(l * m * 10) / 10
}

export function cost(rate: Rate, minutes: number): { low: number; high: number } {
  return {
    low: Math.round(rate.low * minutes * 100) / 100,
    high: Math.round(rate.high * minutes * 100) / 100,
  }
}

export function money(v: number, currency: 'USD' | 'INR'): string {
  if (currency === 'INR')
    return `₹${v.toLocaleString('en-IN', { maximumFractionDigits: v >= 100 ? 0 : 2 })}`
  return `$${v.toLocaleString('en-US', { maximumFractionDigits: v >= 100 ? 0 : 2 })}`
}

/** Worked example used in the page text and the calculator's default. */
export const WORKED = { leads: 200, minutesPerLead: 4 }

/* ---------------------------------------------------------------------------------------------
 * Call scripts. Written by us; each opens with identity and AI disclosure.
 * ------------------------------------------------------------------------------------------- */

export type Script = {
  id: string
  title: string
  when: string
  consentNeeded: string
  lines: string[]
  handoff: string
}

export const SCRIPTS: Script[] = [
  {
    id: 'inquiry',
    title: 'Inquiry callback',
    when: 'Within 5 minutes of a web or portal inquiry',
    consentNeeded: 'US/UK: written consent to AI calls on the form. India: 140-series number.',
    lines: [
      'Hi Priya, this is an AI assistant calling for Maya Shah at Northside Realty. You asked about 14 Elm Street a few minutes ago. Is now an OK time for two quick questions?',
      'Are you looking to buy in the next three months, or just starting to look?',
      'Would you be paying with a mortgage, and have you spoken to a lender yet?',
      'Maya has Thursday at 5:30 or Saturday at 11 for a showing. Which works better?',
      'Booked. You’ll get a text with the address. If you’d like me to stop calling, just say so.',
    ],
    handoff:
      'Price, offers or “what would they accept?” → “That’s one for Maya. I’ll have her call you today.”',
  },
  {
    id: 'confirm',
    title: 'Showing confirmation',
    when: '24 hours and 2 hours before a booked showing',
    consentNeeded: 'Service call: no selling on it.',
    lines: [
      'Hi Daniel, this is an AI assistant calling for Northside Realty about your showing at 14 Elm Street tomorrow at 5:30.',
      'Are you still able to make it?',
      'Great. Parking is on the street; Maya will meet you at the front door. Anything you want her to bring, like the disclosure pack?',
    ],
    handoff: 'Wants to reschedule beyond the agent’s calendar → text the booking link.',
  },
  {
    id: 'openhouse',
    title: 'Open-house follow-up',
    when: 'The same evening, within calling hours',
    consentNeeded: 'US/UK: written AI-call consent on the sign-in. Otherwise a person calls.',
    lines: [
      'Hi Sam, this is an AI assistant calling for Maya Shah. You visited the open house at 14 Elm Street today. Thanks for coming.',
      'What did you think of the place, honestly?',
      'Is anything stopping it from being a fit: price, space, location?',
      'Would a private second look help, or would you rather see similar homes?',
    ],
    handoff: 'Wants to make an offer → transfer to the agent now, or book a call within the hour.',
  },
  {
    id: 'valuation',
    title: 'Home valuation callback',
    when: 'Within 5 minutes of a valuation request',
    consentNeeded: 'US/UK: written AI-call consent on the valuation form.',
    lines: [
      'Hi Anita, this is an AI assistant calling for Maya Shah at Northside Realty about the valuation you requested for 22 Oak Lane.',
      'Are you thinking of selling, or mainly curious about the value?',
      'If you did sell, roughly when: this spring, later this year, or no plans yet?',
      'Maya can walk you through recent sales nearby in 20 minutes. Would Tuesday or Wednesday evening suit you?',
    ],
    handoff:
      'Asks for a price on the call → “Maya will give you a range with the recent sales behind it.”',
  },
  {
    id: 'site-visit',
    title: 'Site-visit booking (India, new project)',
    when: 'After a portal inquiry on a project',
    consentNeeded: '140-series number; quote the RERA registration.',
    lines: [
      'Namaste Rohit ji, main Skyline Homes ki taraf se AI assistant bol rahi hoon. Aapne 99acres par Skyline Greens ke 2 BHK ke baare mein poocha tha. Kya do minute baat kar sakte hain?',
      'Aap khud rehne ke liye dekh rahe hain ya investment ke liye?',
      'Budget roughly kitna socha hai: 80 lakh tak, ya 80 lakh se 1.2 crore?',
      'Project RERA registered hai; registration number aur RERA website main SMS kar dungi. Site visit Saturday 11 baje ya Sunday 4 baje, kaunsa theek rahega?',
    ],
    handoff: 'Asks for a discount or payment-plan change → sales manager calls back the same day.',
  },
]

export const COUNTS = {
  countries: COUNTRIES.length,
  rules: COUNTRIES.reduce((n, c) => n + c.rules.length, 0),
  vendors: VENDORS.filter((v) => !v.ours).length,
  priced: VENDORS.filter((v) => !v.ours && !/^Not published|^Quote only/.test(v.stated)).length,
  scripts: SCRIPTS.length,
  sources: Object.keys(SOURCES).length,
}
