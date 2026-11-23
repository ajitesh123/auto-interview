/**
 * Is AI cold calling legal? Rules by country, read on the regulator or statute page.
 * Opened 20 Nov 2026 (US, UK, India, UAE, Australia, EU FAQ) and 23 Nov 2026 (the rest).
 * `quote` is copied from the source; `plain` is our plain-English reading. Not legal advice.
 * Feeds the call check, the verdict grid, the country cards and the counts in the post.
 */

export const CHECKED = '23 Nov 2026'

export const TTAI_URL =
  'https://www.toughtongueai.com/?utm_source=autointerviewai&utm_medium=blog&utm_campaign=is-ai-cold-calling-legal'

export type Src = { label: string; url: string }

export const SOURCES = {
  fcc2417: {
    label: 'FCC Declaratory Ruling FCC 24-17 (8 Feb 2024)',
    url: 'https://docs.fcc.gov/public/attachments/FCC-24-17A1.pdf',
  },
  ecfr1200: {
    label: '47 CFR 64.1200, TCPA rules (eCFR)',
    url: 'https://www.ecfr.gov/current/title-47/chapter-I/subchapter-B/part-64/subpart-L/section-64.1200',
  },
  usc227: {
    label: '47 U.S.C. 227, the TCPA (Cornell LII)',
    url: 'https://www.law.cornell.edu/uscode/text/47/227',
  },
  tsr: {
    label: '16 CFR 310.4, FTC Telemarketing Sales Rule (eCFR)',
    url: 'https://www.ecfr.gov/current/title-16/chapter-I/subchapter-C/part-310/section-310.4',
  },
  fccNprm: {
    label: 'FCC AI-generated calls rulemaking, RIN 3060-AM12 (Unified Agenda 2026)',
    url: 'https://www.reginfo.gov/public/do/eAgendaViewRule?pubId=202510&RIN=3060-AM12&operation=OPERATION_PRINT_RULE',
  },
  fccRvm: {
    label: 'FCC 22-85: ringless voicemail is a call (All About the Message)',
    url: 'https://www.fcc.gov/node/254946',
  },
  utah: {
    label: 'Utah Code 13-77-103, AI disclosure (in force 7 May 2025)',
    url: 'https://le.utah.gov/xcode/Title13/Chapter77/C13-77-S103_2025050720250507.html',
  },
  crtcRules: {
    label: 'CRTC Unsolicited Telecommunications Rules',
    url: 'https://crtc.gc.ca/eng/trules-reglest.htm',
  },
  crtc132: {
    label: 'CRTC 2026-132: review of the rules, incl. synthesized voices (11 Jun 2026)',
    url: 'https://crtc.gc.ca/eng/archive/2026/2026-132.htm',
  },
  crtcAmp: {
    label: 'CRTC National DNCL report: penalties',
    url: 'https://crtc.gc.ca/eng/dncl/rpt260930/p4.htm',
  },
  pecr19: {
    label: 'UK PECR regulation 19, automated calls (legislation.gov.uk)',
    url: 'https://www.legislation.gov.uk/uksi/2003/2426/regulation/19/data.pdf',
  },
  pecr21: {
    label: 'UK PECR regulation 21, live calls and TPS (legislation.gov.uk)',
    url: 'https://www.legislation.gov.uk/uksi/2003/2426/regulation/21',
  },
  icoAi: {
    label: 'ICO innovation advice: AI-produced greetings on marketing calls',
    url: 'https://ico.org.uk/for-organisations/advice-and-services/innovation-advice/previously-asked-questions/',
  },
  icoDuaa: {
    label: 'ICO: how we will regulate as the Data (Use and Access) Act commences',
    url: 'https://cy.ico.org.uk/about-the-ico/what-we-do/legislation-we-cover/data-use-and-access-act-2025/how-we-will-regulate-as-the-data-use-and-access-act-commences',
  },
  uwg7: {
    label: 'Germany: UWG § 7 (gesetze-im-internet.de)',
    url: 'https://www.gesetze-im-internet.de/uwg_2004/__7.html',
  },
  eprivacy13: {
    label: 'EU ePrivacy Directive 2002/58, Article 13',
    url: 'https://www.legislation.gov.uk/eudr/2002/58/article/13/data.html',
  },
  aiAct50: {
    label: 'European Commission: guidelines on AI Act transparency obligations (20 Jul 2026)',
    url: 'https://digital-strategy.ec.europa.eu/en/library/guidelines-transparency-obligations-providers-and-deployers-ai-systems',
  },
  aiActFaq: {
    label: 'European Commission FAQ: AI Act Article 50',
    url: 'https://digital-strategy.ec.europa.eu/en/faqs/transparency-obligations-under-article-50-ai-act',
  },
  traiReg: {
    label: 'TRAI TCCCPR Second Amendment Regulations (12 Feb 2025)',
    url: 'https://www.trai.gov.in/sites/default/files/2025-02/Regulation_12022025.pdf',
  },
  traiPr11: {
    label: 'TRAI press release 11/2025 (12 Feb 2025)',
    url: 'https://trai.gov.in/sites/default/files/2025-02/PR_No.11of2025.pdf',
  },
  traiA2p: {
    label: 'TRAI TCCCPR Third Amendment Regulations 2026: A2P calls (18 Sep 2026)',
    url: 'https://www.trai.gov.in/sites/default/files/2026-09/Regulation_18092026.pdf',
  },
  traiPr119: {
    label: 'TRAI press release 119/2026 (18 Sep 2026)',
    url: 'https://www.trai.gov.in/sites/default/files/2026-09/PR_No119of2026.pdf',
  },
  dpdp: {
    label: 'PIB backgrounder: DPDP Rules 2025 notified (17 Nov 2025)',
    url: 'https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc20251117695301.pdf',
  },
  uae56: {
    label: 'UAE Cabinet Resolution 56 of 2024 on telemarketing',
    url: 'https://uaelegislation.gov.ae/en/legislations/2519/download',
  },
  uae57: {
    label: 'UAE Cabinet Resolution 57 of 2024: penalties',
    url: 'https://uaelegislation.gov.ae/en/legislations/2523/download',
  },
  dncrAu: {
    label: 'Australia: Do Not Call Register Act 2006',
    url: 'https://www.legislation.gov.au/C2006A00088/2021-09-01/2021-09-01/text/original/pdf',
  },
  acmaDnc: {
    label: 'ACMA: the Do Not Call Register',
    url: 'https://www.acma.gov.au/do-not-call-register',
  },
  auStd: {
    label: 'Telemarketing and Research Industry Standard 2017 (as made)',
    url: 'https://legislation.gov.au/F2017L00323/asmade/2017-03-28/text/original/pdf',
  },
  pdpcDnc: {
    label: 'PDPC Advisory Guidelines on the Do Not Call Provisions (rev. 1 Feb 2021)',
    url: 'https://www.pdpc.gov.sg/-/media/Files/PDPC/PDF-Files/Advisory-Guidelines/Advisory-Guidelines-on-the-DNC-Provisions-1-Feb-2021.pdf',
  },
} satisfies Record<string, Src>

export type SrcId = keyof typeof SOURCES

/* ---------------------------------------------------------------------------------------------
 * Countries
 * ------------------------------------------------------------------------------------------- */

export type CountryId = 'us' | 'ca' | 'uk' | 'de' | 'in' | 'ae' | 'au' | 'sg'

export type Rule = { plain: string; quote: string; src: SrcId }

export type Country = {
  id: CountryId
  name: string
  short: string
  /** One-line answer to "is AI cold calling legal here?" */
  answer: string
  /** Must the caller say it is an AI? */
  disclose: string
  hours: string
  register: string
  /** Largest penalty we could source, or null when we did not verify one. */
  penalty: { text: string; src: SrcId } | null
  rules: Rule[]
}

export const COUNTRIES: Country[] = [
  {
    id: 'us',
    name: 'United States',
    short: 'US',
    answer:
      'Only with prior express written consent for sales calls to mobiles and homes. An AI voice is an “artificial voice” under the TCPA.',
    disclose:
      'No federal rule yet (the FCC’s 2024 proposal is still open). Utah: if the person asks. State the business name at the start.',
    hours: '8 a.m. to 9 p.m. at the called person’s location',
    register: 'National Do Not Call Registry (for live sales calls)',
    penalty: {
      text: 'USD 500 per call in a private suit, up to USD 1,500 if wilful',
      src: 'usc227',
    },
    rules: [
      {
        plain: 'AI-generated voices are “artificial voices” under the TCPA.',
        quote:
          'The TCPA’s restrictions on the use of “artificial or prerecorded voice” encompass current AI technologies that generate human voices.',
        src: 'fcc2417',
      },
      {
        plain:
          'A sales call to a mobile number with an artificial voice needs prior express written consent. The mobile rule covers business mobiles too.',
        quote:
          '…telemarketing, using an automatic telephone dialing system or an artificial or prerecorded voice… other than a call made with the prior express written consent of the called party',
        src: 'ecfr1200',
      },
      {
        plain:
          'Artificial-voice calls to home landlines are restricted too; sales calls among them need prior express written consent.',
        quote:
          'Initiate any telephone call to any residential line using an artificial or prerecorded voice to deliver a message',
        src: 'ecfr1200',
      },
      {
        plain: 'Say who is calling at the start of the message.',
        quote:
          'At the beginning of the message, state clearly the identity of the business, individual, or other entity that is responsible for initiating the call.',
        src: 'ecfr1200',
      },
      {
        plain: 'A voicemail dropped by an AI voice is still a call: it needs consent too.',
        quote:
          'requires consumer consent because it is a “call” made using an artificial or prerecorded voice.',
        src: 'fccRvm',
      },
      {
        plain: 'People can sue: USD 500 per violation, trebled if wilful or knowing.',
        quote: 'to receive $500 in damages for each such violation, whichever is greater',
        src: 'usc227',
      },
      {
        plain:
          'A federal rule that would make callers disclose AI use was proposed in 2024 and has no final date.',
        quote: 'Next Action Undetermined',
        src: 'fccNprm',
      },
    ],
  },
  {
    id: 'ca',
    name: 'Canada',
    short: 'Canada',
    answer:
      'Only with express consent for sales calls, to consumers and businesses alike, if the AI counts as an automatic dialing-announcing device (ADAD). The CRTC is reviewing exactly that.',
    disclose:
      'No AI rule yet; the CRTC asked in June 2026 whether to require it. ADAD calls must open by naming who the call is for.',
    hours: 'Weekdays 9:00 a.m.–9:30 p.m., weekends 10:00 a.m.–6:00 p.m. (called person’s time)',
    register: 'National DNCL (business numbers exempt)',
    penalty: {
      text: 'Up to CAD 15,000 per violation for a business',
      src: 'crtcAmp',
    },
    rules: [
      {
        plain: 'Sales calls by an ADAD need the person’s express consent.',
        quote:
          'A telemarketer shall not initiate … a telemarketing telecommunication via an ADAD unless express consent has been provided by the consumer to receive a telemarketing telecommunication via an ADAD',
        src: 'crtcRules',
      },
      {
        plain:
          'The ADAD rule applies even when the call is exempt from the Do Not Call list (as business calls are).',
        quote:
          'The ADAD Rules apply whether or not the telemarketing telecommunication is exempt from the National DNCL Rules.',
        src: 'crtcRules',
      },
      {
        plain: 'Live calls to businesses are outside the National DNCL rules.',
        quote:
          'The National DNCL Rules do not apply to a telemarketing telecommunication made to a business consumer.',
        src: 'crtcRules',
      },
      {
        plain: 'The CRTC asked whether the ADAD definition already covers synthesized voices.',
        quote:
          'is the definition sufficient to capture software, applications, or technologies that use synthesized voices',
        src: 'crtc132',
      },
    ],
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    short: 'UK',
    answer:
      'Only with prior consent, for consumers and companies. The ICO treats an AI voice on a marketing call as recorded material.',
    disclose:
      'No AI-specific rule found. Automated calls must show a caller line or give a contact line.',
    hours: 'No fixed legal window in PECR',
    register: 'TPS and CTPS (for live calls)',
    penalty: {
      text: 'Up to £17.5m or 4% of global turnover (PECR, since the 2025 Act)',
      src: 'icoDuaa',
    },
    rules: [
      {
        plain:
          'Automated marketing calls with recorded matter need the subscriber’s prior consent.',
        quote:
          'the called line is that of a subscriber who has previously notified the caller that for the time being he consents to such communications being sent by, or at the instigation of, the caller on that line',
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
        plain: 'Live calls by a person: not to numbers on the TPS, and not to anyone who objected.',
        quote:
          'the number allocated to a subscriber in respect of the called line is one listed in the register kept under regulation 26.',
        src: 'pecr21',
      },
      {
        plain: 'Fines for PECR breaches now reach UK GDPR levels.',
        quote: 'issue fines of up to £17.5m or 4% of global turnover under PECR.',
        src: 'icoDuaa',
      },
    ],
  },
  {
    id: 'de',
    name: 'Germany (EU)',
    short: 'Germany',
    answer:
      'Only with prior express consent: German law requires it for advertising by automatic calling machine, to consumers and businesses. From 2 Aug 2026 the EU AI Act also requires telling people they are talking to an AI. EU-wide, automated marketing calls to individuals need consent; rules for calls to companies vary by country.',
    disclose:
      'Yes. AI Act Article 50: people must be told they are interacting with an AI, at the latest at the first interaction (from 2 Aug 2026).',
    hours: 'No fixed legal window in UWG',
    register: 'No national register; consent is the rule for consumers',
    penalty: null,
    rules: [
      {
        plain:
          'Advertising with an automatic calling machine needs the addressee’s prior express consent, business or consumer.',
        quote:
          'bei Werbung unter Verwendung einer automatischen Anrufmaschine, eines Faxgerätes oder elektronischer Post, ohne dass eine vorherige ausdrückliche Einwilligung des Adressaten vorliegt',
        src: 'uwg7',
      },
      {
        plain:
          'Live advertising calls: consumers need prior express consent; businesses at least presumed consent.',
        quote:
          'bei Werbung mit einem Telefonanruf gegenüber einem Verbraucher ohne dessen vorherige ausdrückliche Einwilligung oder gegenüber einem sonstigen Marktteilnehmer ohne dessen zumindest mutmaßliche Einwilligung',
        src: 'uwg7',
      },
      {
        plain: 'EU-wide: direct marketing by automatic calling machines only with prior consent.',
        quote:
          'The use of automated calling and communication systems without human intervention (automatic calling machines), facsimile machines (fax) or electronic mail for the purposes of direct marketing may be allowed only in respect of subscribers or users who have given their prior consent.',
        src: 'eprivacy13',
      },
      {
        plain: 'AI Act transparency duties apply from 2 Aug 2026.',
        quote: 'These transparency obligations apply from 2 August 2026.',
        src: 'aiAct50',
      },
    ],
  },
  {
    id: 'in',
    name: 'India',
    short: 'India',
    answer:
      'Yes, with conditions: promotional calls only from 140-series numbers by a registered sender, respecting DND choices, and AI or software-placed calls declared to your operator in advance.',
    disclose: 'No AI-specific disclosure rule found.',
    hours: 'No fixed national window; people block time bands and categories in DND settings',
    register: 'DND preferences under TRAI’s TCCCPR',
    penalty: {
      text: 'Outgoing service barred for 15 days, then disconnection and blacklisting',
      src: 'traiPr11',
    },
    rules: [
      {
        plain: 'All promotional calls, robocalls included, only from 140-series numbers.',
        quote: 'promotional call should be permitted through 140-series numbers only',
        src: 'traiReg',
      },
      {
        plain:
          'Calls placed by software (AI agents included) are A2P calls: declare them and their number ranges to your operator in advance, or they count as spam.',
        quote:
          'Every Sender shall declare to the Originating Access Provider (OAP), in advance, about the use of Application-to-Person (A2P) calls, along with the details such as Calling Line Identification (CLI) ranges to be used for making A2P calls',
        src: 'traiA2p',
      },
      {
        plain: 'After an opt-out, no new consent request for 90 days.',
        quote:
          'A sender shall not make a request seeking consent of a customer who has opted out, before ninety (90) days.',
        src: 'traiPr11',
      },
      {
        plain: 'Break the rules and outgoing service is barred.',
        quote: 'outgoing services of all telecom resource of the sender will be barred for 15 days',
        src: 'traiPr11',
      },
      {
        plain:
          'DPDP Rules 2025 phase in over 18 months: notice and consent duties for personal data apply from 13 May 2027.',
        quote: 'The Rules introduce an eighteen-month period for phased compliance.',
        src: 'dpdp',
      },
    ],
  },
  {
    id: 'ae',
    name: 'UAE (Dubai, Abu Dhabi)',
    short: 'UAE',
    answer:
      'Yes, with conditions: prior approval to run phone marketing, 9 a.m.–6 p.m., never to DNCR numbers, recorded with a notice at the start, from licensed local numbers. Automated systems are expressly allowed within these rules.',
    disclose: 'No AI-specific rule found. Tell the person the call is recorded when it begins.',
    hours: '9:00 a.m. to 6:00 p.m.',
    register: 'Do Not Call Register (DNCR)',
    penalty: {
      text: 'Up to AED 150,000 for a company (Resolution 57 of 2024)',
      src: 'uae57',
    },
    rules: [
      {
        plain: 'Marketing calls only from 9 a.m. to 6 p.m.',
        quote: 'Make Marketing Phone Calls only during the period from 9:00 am to 6:00 pm.',
        src: 'uae56',
      },
      {
        plain: 'Never call numbers on the DNCR.',
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
        plain: 'Companies need prior approval before they run phone marketing.',
        quote:
          'Obtain prior approval to practice Phone Marketing activity from the Competent Authority',
        src: 'uae56',
      },
      {
        plain: 'Automated systems may be used for marketing, within the resolution’s rules.',
        quote:
          'Automated communication systems may be used for marketing, advertising and promoting the products or services provided by the Company in accordance with the provisions of this resolution',
        src: 'uae56',
      },
      {
        plain:
          'The rules protect a “Consumer”, defined as a natural person; whether an employee on a work line counts is not stated.',
        quote: 'Consumer: Natural Person (Person).',
        src: 'uae56',
      },
    ],
  },
  {
    id: 'au',
    name: 'Australia',
    short: 'Australia',
    answer:
      'Yes, with conditions: not to numbers on the Do Not Call Register without consent, within set hours, and the caller must say who they are and why they call. No AI-specific rule.',
    disclose:
      'No AI-specific rule found. The caller must give their name, the business and the purpose at the start.',
    hours: 'Weekdays 9 a.m.–8 p.m., Saturday 9 a.m.–5 p.m.; no Sundays or national public holidays',
    register: 'Do Not Call Register (personal numbers only)',
    penalty: null,
    rules: [
      {
        plain: 'No telemarketing calls to numbers on the Do Not Call Register without consent.',
        quote:
          'A person must not make, or cause to be made, a telemarketing call to an Australian number if: (a) the number is registered on the Do Not Call Register',
        src: 'dncrAu',
      },
      {
        plain: 'Business numbers cannot be put on the register.',
        quote: 'You cannot add a business phone number to the Do Not Call Register.',
        src: 'acmaDnc',
      },
      {
        plain: 'At the start, say who is calling, for whom and why.',
        quote: 'the purpose of the call',
        src: 'auStd',
      },
    ],
  },
  {
    id: 'sg',
    name: 'Singapore',
    short: 'Singapore',
    answer:
      'Yes, with conditions, for calls to individuals: check the Do Not Call Register first (results valid 21 days) unless you hold clear consent. Synthetic voices count as voice calls.',
    disclose: 'No AI-specific rule found. Do not hide your caller ID.',
    hours: 'No fixed legal window in the DNC provisions',
    register: 'Do Not Call Registry (PDPA)',
    penalty: null,
    rules: [
      {
        plain:
          'Before a marketing call to a Singapore number, hold a valid DNC Register check or consent.',
        quote:
          'must not send a specified message addressed to a Singapore telephone number unless they had valid confirmation',
        src: 'pdpcDnc',
      },
      {
        plain: 'A recorded or synthetic voice is a voice call under these rules.',
        quote: 'a call that involves a recorded or synthetic voice.',
        src: 'pdpcDnc',
      },
      {
        plain:
          'Messages to an organisation are excluded, unless you pitch the person in a personal capacity.',
        quote:
          'any message sent to an organisation other than an individual acting in a personal or domestic capacity',
        src: 'pdpcDnc',
      },
    ],
  },
]

/* ---------------------------------------------------------------------------------------------
 * The call check: country × who you call × what the call is × consent (× US phone type)
 * → verdict, what to do, the rules behind it. Our reading of the rules above, not legal advice.
 * ------------------------------------------------------------------------------------------- */

export type Audience = 'consumer' | 'business'
export type Purpose = 'sales' | 'service' | 'inbound'
export type Phone = 'mobile' | 'landline' | 'unsure'

export const AUDIENCES: { id: Audience; label: string; hint: string }[] = [
  { id: 'consumer', label: 'People at home', hint: 'Consumers, on personal phones' },
  { id: 'business', label: 'People at work', hint: 'B2B: buyers on a company number' },
]

export const PURPOSES: { id: Purpose; label: string; hint: string }[] = [
  {
    id: 'sales',
    label: 'Sell, book a demo or promote',
    hint: 'Cold calls, lead follow-up, offers, win-backs',
  },
  {
    id: 'service',
    label: 'Service only, no selling',
    hint: 'Reminders, confirmations, delivery or payment updates',
  },
  {
    id: 'inbound',
    label: 'Answer calls people make to you',
    hint: 'AI receptionist, support line, after-hours',
  },
]

export type Verdict = 'go' | 'conditions' | 'human'

export const VERDICTS: Record<
  Verdict,
  { label: string; short: string; tone: 'success' | 'warn' | 'danger' }
> = {
  go: { label: 'An AI can take this call', short: 'Yes', tone: 'success' },
  conditions: { label: 'Legal with conditions', short: 'With conditions', tone: 'warn' },
  human: { label: 'Not without consent: use a person', short: 'Needs consent', tone: 'danger' },
}

export type CheckInput = {
  country: CountryId
  audience: Audience
  purpose: Purpose
  consent: boolean
  phone: Phone
}

export type CheckResult = { verdict: Verdict; why: string; todo: string[]; srcs: SrcId[] }

/** Which inputs the tool should ask for. */
export function asksConsent(i: Pick<CheckInput, 'country' | 'purpose'>): boolean {
  if (i.purpose === 'inbound') return false
  if (i.purpose === 'service') return i.country === 'us'
  return true
}
export function asksPhone(i: Pick<CheckInput, 'country' | 'audience' | 'purpose'>): boolean {
  return i.country === 'us' && i.audience === 'business' && i.purpose !== 'inbound'
}

const SAY_AI = 'Open with your business name and that this is an AI assistant, and offer a person.'

export function checkCall(i: CheckInput): CheckResult {
  const c = COUNTRIES.find((x) => x.id === i.country) ?? COUNTRIES[0]
  const hours = `Calling hours: ${c.hours}.`

  if (i.purpose === 'inbound') {
    return {
      verdict: 'go',
      why: 'The calling rules here govern calls you start. When people call you, an AI can answer, qualify and book.',
      todo: [
        i.country === 'de'
          ? 'Tell callers at the start that they are talking to an AI (EU AI Act Article 50, from 2 Aug 2026).'
          : SAY_AI,
        i.country === 'ae'
          ? 'If the call turns into marketing, tell them it is recorded (UAE Resolution 56).'
          : 'If you record, say so at the start and check your local recording-consent rule.',
        'Hand pricing disputes, complaints and legal questions to a person.',
      ],
      srcs: i.country === 'de' ? ['aiAct50'] : i.country === 'ae' ? ['uae56'] : [],
    }
  }

  switch (i.country) {
    case 'us': {
      // A business landline is outside 64.1200(a)(1) (wireless) and (a)(3) (residential).
      const landlineB2b = i.audience === 'business' && i.phone === 'landline'
      if (landlineB2b) {
        return {
          verdict: 'conditions',
          why: 'The TCPA’s artificial-voice consent rules cover mobile numbers and home lines. A company landline falls outside both (our reading of the text), so federal law does not require consent for this call. State laws can still apply.',
          todo: [
            'Confirm the number really is a company landline: many B2B buyers list a mobile, and the mobile rule covers business mobiles too.',
            'State your business name at the start and give a call-back number.',
            'Honour any “stop” at once and keep your own do-not-call list.',
            'Check the state you call into: some states have their own telemarketing and AI rules.',
          ],
          srcs: ['ecfr1200', 'usc227'],
        }
      }
      if (i.purpose === 'service') {
        return i.consent
          ? {
              verdict: 'conditions',
              why: 'A call that sells nothing is not telemarketing, so written consent is not needed. An artificial voice to a mobile still needs the person’s prior consent, which giving you the number for this purpose usually provides.',
              todo: [
                'Keep the record of how and why they gave you the number.',
                'No offers on the call, or it becomes telemarketing and needs written consent.',
                'State your business name at the start and give a call-back number.',
                'If they say stop, stop.',
              ],
              srcs: ['fcc2417', 'ecfr1200'],
            }
          : {
              verdict: 'human',
              why: 'An artificial-voice call to a mobile needs the person’s prior consent even when it sells nothing. Without it, have a person call or send a message. (Home landlines have narrow exceptions for non-sales calls; we treat the number as a mobile.)',
              todo: [
                'Ask for consent to automated calls the next time you collect the number.',
                'Use a person, or a text or email, until you have it.',
              ],
              srcs: ['fcc2417', 'usc227'],
            }
      }
      return i.consent
        ? {
            verdict: 'conditions',
            why: 'With prior express written consent that names you and covers these calls, an AI voice can sell, qualify and book.',
            todo: [
              hours,
              SAY_AI,
              'Store the consent text, date, source and number with the lead.',
              'Honour any “stop”, said in any reasonable way, within 10 business days at the latest.',
              'Voicemails left by the AI count as calls too.',
            ],
            srcs: ['fcc2417', 'ecfr1200', 'fccRvm'],
          }
        : {
            verdict: 'human',
            why:
              i.audience === 'business'
                ? 'An artificial-voice sales call to a mobile needs prior express written consent whoever pays the bill, and many B2B data lists are mobile numbers. A bought list never has that consent.'
                : 'An AI voice is an artificial voice under the TCPA, so a sales call to a mobile or home line needs prior express written consent. A cold list never has it: every call is a violation, USD 500 each in a lawsuit.',
            todo: [
              'Let a person dial and talk. For consumers, scrub the National Do Not Call Registry (at most 31 days old) and your own list first.',
              'Use AI before the call instead: research, a script, and practice against an AI buyer.',
              'Collect written consent on your forms so later follow-ups can be AI calls.',
            ],
            srcs: ['fcc2417', 'ecfr1200', 'usc227', 'tsr'],
          }
    }

    case 'ca':
      if (i.purpose === 'service') {
        return {
          verdict: 'conditions',
          why: 'ADAD calls that do not try to sell are allowed under conditions in Part IV of the CRTC rules.',
          todo: [
            hours,
            'Open with a clear message naming who the call is for, and give a mail or email address and a phone number.',
            'Do not drift into an offer, or the express-consent rule applies.',
          ],
          srcs: ['crtcRules'],
        }
      }
      return i.consent
        ? {
            verdict: 'conditions',
            why: 'With express consent to receive these calls, an AI voice can call. The CRTC is reviewing whether synthesized voices are ADADs and whether to require disclosure, so build disclosure in now.',
            todo: [
              hours,
              SAY_AI,
              'Register with the National DNCL as a telemarketer.',
              'Keep the record of the express consent.',
            ],
            srcs: ['crtcRules', 'crtc132'],
          }
        : {
            verdict: 'human',
            why:
              i.audience === 'business'
                ? 'Business numbers are exempt from the Do Not Call list, but not from the ADAD rule: an automated sales call needs express consent either way. Until the CRTC rules on AI voices, treat an AI caller as an ADAD (our reading).'
                : 'An automated sales call needs the consumer’s express consent. Until the CRTC rules on AI voices, treat an AI caller as an ADAD (our reading).',
            todo: [
              i.audience === 'business'
                ? 'A person may call businesses without a DNCL check; keep your own do-not-call list.'
                : 'A person may call after checking the National DNCL and your own list.',
              hours,
            ],
            srcs: ['crtcRules', 'crtc132'],
          }

    case 'uk':
      if (i.purpose === 'service') {
        return {
          verdict: 'conditions',
          why: 'PECR’s calling rules are about direct marketing. A pure service call is outside them, but UK GDPR still applies to the personal data you use.',
          todo: [
            SAY_AI,
            'No marketing on the call, or it becomes a direct marketing call with recorded material.',
            'Show your number or give a contact line.',
          ],
          srcs: ['pecr19', 'icoAi'],
        }
      }
      return i.consent
        ? {
            verdict: 'conditions',
            why: 'With the subscriber’s prior consent to automated marketing calls from you, an AI voice can call.',
            todo: [
              SAY_AI,
              'Show your caller line or give a number they can reach you on.',
              'Keep the consent record: who, when, what wording.',
            ],
            srcs: ['pecr19', 'icoAi'],
          }
        : {
            verdict: 'human',
            why: 'The ICO says no part of a marketing call can include recorded material without consent, and an AI-made voice counts. Regulation 19 says “subscriber”, so companies are covered too.',
            todo: [
              i.audience === 'business'
                ? 'A person may call after screening the CTPS and anyone who objected.'
                : 'A person may call after screening the TPS and anyone who objected.',
              'Fines can reach £17.5m or 4% of global turnover.',
            ],
            srcs: ['pecr19', 'icoAi', 'pecr21', 'icoDuaa'],
          }

    case 'de':
      if (i.purpose === 'service') {
        return {
          verdict: 'conditions',
          why: 'UWG § 7 covers advertising. A service call without advertising is outside it, but the AI Act and GDPR apply.',
          todo: [
            'Tell people at the start that they are talking to an AI (AI Act Article 50, from 2 Aug 2026).',
            'No offers on the call.',
          ],
          srcs: ['aiAct50', 'uwg7'],
        }
      }
      return i.consent
        ? {
            verdict: 'conditions',
            why: 'With prior express consent to automated advertising calls, an AI voice can call, if it says it is an AI.',
            todo: [
              'Say at the start that this is an AI (AI Act Article 50, from 2 Aug 2026).',
              'Keep proof of the consent: what was agreed, when and how.',
            ],
            srcs: ['uwg7', 'aiAct50'],
          }
        : {
            verdict: 'human',
            why:
              i.audience === 'business'
                ? 'A live call to a business needs only presumed consent, but advertising by automatic calling machine needs prior express consent from any addressee. Whether a conversational AI is such a machine is untested; we read it as one.'
                : 'Advertising calls to consumers need prior express consent, by a person or a machine.',
            todo: [
              i.audience === 'business'
                ? 'A person may call a business where it would plausibly want the call (presumed consent).'
                : 'Do not cold call consumers at all, by person or AI.',
              'Collect consent through your own web forms, events or existing customer contacts; an unsolicited email asking for consent is itself advertising under the same clause.',
            ],
            srcs: ['uwg7', 'eprivacy13'],
          }

    case 'in':
      return {
        verdict: 'conditions',
        why:
          i.purpose === 'service'
            ? 'Service and transactional calls are allowed. If software places them, declare them to your operator as A2P calls.'
            : i.consent
              ? 'With consent recorded, you can call even people with DND blocks for your category, from the right number series.'
              : 'Promotional calls are allowed from 140-series numbers to people who have not blocked your category. India has no AI-specific rule.',
        todo: [
          i.purpose === 'service'
            ? 'Use service numbers (1600 or 1601 series where your sector is eligible).'
            : 'Call only from 140-series numbers, as a sender registered on DLT.',
          'Declare AI or software-placed calls and their number ranges to your operator in advance (TRAI, 18 Sep 2026).',
          i.purpose === 'sales' && !i.consent
            ? 'Skip numbers whose DND settings block your category or time band.'
            : 'Keep the consent record.',
          'After an opt-out, do not ask again for 90 days.',
          i.audience === 'business'
            ? 'TRAI’s rules do not carve out business numbers; treat B2B calls the same.'
            : 'DPDP notice and consent duties start 13 May 2027.',
        ],
        srcs: ['traiReg', 'traiA2p', 'traiPr11'],
      }

    case 'ae':
      if (i.audience === 'business') {
        return {
          verdict: 'conditions',
          why: 'Resolution 56 defines a “Consumer” as a natural person; it does not say whether an employee on a work line counts. Apply its rules anyway (our reading).',
          todo: [
            'Get the competent authority’s prior approval to run phone marketing.',
            'Never call numbers on the DNCR.',
            'Call within 9 a.m.–6 p.m. and from a licensed local number.',
            'Tell them the call is recorded at the start.',
            SAY_AI,
          ],
          srcs: ['uae56'],
        }
      }
      return {
        verdict: 'conditions',
        why:
          i.purpose === 'service'
            ? 'Service calls are not marketing calls under Resolution 56.'
            : 'Marketing calls to people are allowed under Resolution 56 within its rules; it has nothing specific on AI voices.',
        todo: [
          'Get the competent authority’s prior approval to run phone marketing.',
          i.purpose === 'sales'
            ? 'Never call numbers on the DNCR.'
            : 'Do not slip offers into a service call.',
          'Call only 9 a.m.–6 p.m., from licensed local numbers.',
          'Record the call and say so when it begins.',
          'No answer or a hang-up: call back at most once a day and twice a week.',
          SAY_AI,
        ],
        srcs: ['uae56', 'uae57'],
      }

    case 'au':
      return {
        verdict: 'conditions',
        why:
          i.purpose === 'service'
            ? 'Calls that do not market anything are not telemarketing calls under the Do Not Call Register Act.'
            : i.audience === 'business'
              ? 'Business numbers cannot be on the Do Not Call Register, so the register check does not bite; the industry standard on hours and identification still applies to telemarketing calls.'
              : i.consent
                ? 'With consent, you may call even numbers on the register.'
                : 'Telemarketing calls are allowed to numbers that are not on the Do Not Call Register. Australia has no AI-specific rule.',
        todo: [
          i.purpose === 'sales' && i.audience === 'consumer' && !i.consent
            ? 'Wash your list against the Do Not Call Register first.'
            : 'Keep a record of consent or of why the number is outside the register.',
          ...(i.purpose === 'service' ? [] : [hours]),
          'At the start, give a name, the business and the purpose of the call. Saying it is an AI is our advice, not an Australian rule.',
        ],
        srcs: i.purpose === 'service' ? ['dncrAu'] : ['dncrAu', 'acmaDnc', 'auStd'],
      }

    case 'sg':
    default:
      if (i.audience === 'business' || i.purpose === 'service') {
        return {
          verdict: 'conditions',
          why:
            i.purpose === 'service'
              ? 'The Do Not Call rules cover marketing (“specified”) messages; a pure service call is outside them.'
              : 'Messages to organisations are excluded from the Do Not Call rules, unless you pitch the person in a personal capacity.',
          todo: [
            'Keep the pitch about the business, not a personal product.',
            'Do not hide your caller ID.',
            'Never call numbers generated by a dictionary attack or harvested by software.',
            SAY_AI,
          ],
          srcs: ['pdpcDnc'],
        }
      }
      return {
        verdict: 'conditions',
        why: i.consent
          ? 'With clear and unambiguous consent you may call, even numbers on the register.'
          : 'A marketing call to a person needs a valid Do Not Call Register check first. Synthetic voices count as voice calls.',
        todo: [
          i.consent
            ? 'Keep the consent record.'
            : 'Check each number against the DNC Register; results are valid for 21 days.',
          'Do not hide your caller ID.',
          'Never call numbers generated by a dictionary attack or harvested by software.',
          SAY_AI,
        ],
        srcs: ['pdpcDnc'],
      }
  }
}

/* ---------------------------------------------------------------------------------------------
 * The grid the post leads with: four common calls in every country, computed by checkCall.
 * ------------------------------------------------------------------------------------------- */

export const GRID_CALLS: { id: string; label: string; input: Omit<CheckInput, 'country'> }[] = [
  {
    id: 'coldConsumer',
    label: 'AI cold call to consumers (no consent)',
    input: { audience: 'consumer', purpose: 'sales', consent: false, phone: 'mobile' },
  },
  {
    id: 'coldB2b',
    label: 'AI cold call to B2B buyers (no consent, mobile)',
    input: { audience: 'business', purpose: 'sales', consent: false, phone: 'mobile' },
  },
  {
    id: 'consented',
    label: 'AI follow-up to a lead who opted in',
    input: { audience: 'consumer', purpose: 'sales', consent: true, phone: 'mobile' },
  },
  {
    id: 'inbound',
    label: 'AI answering inbound calls',
    input: { audience: 'consumer', purpose: 'inbound', consent: false, phone: 'mobile' },
  },
]

export function grid() {
  return GRID_CALLS.map((g) => ({
    ...g,
    cells: COUNTRIES.map((c) => checkCall({ country: c.id, ...g.input }).verdict),
  }))
}

/** Counts printed in the post, computed so prose and grid cannot drift apart. */
export function counts() {
  const g = grid()
  const cold = g.find((x) => x.id === 'coldConsumer')!
  const b2b = g.find((x) => x.id === 'coldB2b')!
  const needConsent = COUNTRIES.filter((_, k) => cold.cells[k] === 'human').map((c) => c.short)
  const allowCond = COUNTRIES.filter((_, k) => cold.cells[k] === 'conditions').map((c) => c.short)
  const b2bNeed = COUNTRIES.filter((_, k) => b2b.cells[k] === 'human').map((c) => c.short)
  return {
    countries: COUNTRIES.length,
    needConsent,
    allowCond,
    b2bNeed,
    rules: COUNTRIES.reduce((n, c) => n + c.rules.length, 0),
    sources: Object.keys(SOURCES).length,
    discloseLaw: COUNTRIES.filter((c) => c.id === 'de').length,
  }
}
