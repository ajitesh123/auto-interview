/**
 * Hinglish sales roleplay library for /blog/hinglish-sales-roleplay-scripts-india-2026.
 * Every objection is labelled by where it came from (all pages opened 15 Nov 2026):
 *  - heard: quoted as written on the source page (Hinglish or Devanagari)
 *  - translated: the source quotes it in English; the Hinglish line is ours
 *  - written: no page we opened quotes it; written by us around the rule it tests
 * Every "never say" line is tied to a rule we read on the regulator's page (or a full-text copy, flagged).
 * One file feeds the library, the tool, the rules table, the vendor table and every count in the prose.
 */

export const CHECKED = '15 Nov 2026'

export type SourceRef = { label: string; url: string }

export const SRC = {
  rmdialer: {
    label: 'RMDialer, Hindi/Hinglish telecalling scripts (updated 29 Oct 2026)',
    url: 'https://rmdialer.com/blog/telecalling-script-hindi-hinglish/',
  },
  neodove: {
    label: 'NeoDove, insurance cold-calling scripts in Hindi (updated 13 Jan 2025)',
    url: 'https://neodove.com/best-cold-calling-scripts-for-insurance-sales/',
  },
  mfsh: {
    label: 'Mutual Funds Sahi Hai (AMFI), investor questions in Hindi',
    url: 'https://www.mutualfundssahihai.com/hi/your-questions-old',
  },
  juno: {
    label: 'Juno School, health insurance objections India (30 Apr 2026)',
    url: 'https://junoschool.pages.dev/article/health-insurance-objection-handling-scripts-india/',
  },
  jago: {
    label: 'Jago Investor forum, LIC as back-up to private term cover',
    url: 'https://www.jagoinvestor.com/forum/can-lic-of-india-policy-act-as-a-back-up-for-term-insurance-policy-from-private-companies',
  },
  telecrm: {
    label: 'TeleCRM, credit card sales script (updated 20 Apr 2026)',
    url: 'https://telecrm.in/blog/how-to-sell-credit-card-script-methods/',
  },
  oriserve: {
    label: 'Oriserve, loan lead qualification objections',
    url: 'https://oriserve.com/blog/answers/ai-voice-bot-loan-lead-qualification-india',
  },
  sharekhan: {
    label: 'Sharekhan investor FAQ (PDF)',
    url: 'https://www.sharekhan.com/MediaGalary/Newsletter/Frequently-Asked-Questions-280420.pdf',
  },
  callyzer: {
    label: 'Callyzer, objection handling in sales',
    url: 'https://callyzer.co/blog/objection-handling-in-sales/',
  },
  callyzerRe: {
    label: 'Callyzer, real estate cold-calling scripts',
    url: 'https://callyzer.co/blog/the-best-real-estate-cold-calling-scripts/',
  },
} satisfies Record<string, SourceRef>

export type RuleId =
  | 'irdaiMisSell'
  | 'irdaiFreeLook'
  | 'irdaiCompare'
  | 'rbiCardHours'
  | 'rbiUnsolicited'
  | 'rbiKfs'
  | 'amfiReturns'
  | 'sebiYield'
  | 'trai'
  | 'rera'
  | 'ccpaCoaching'

export type Rule = {
  id: RuleId
  regulator: string
  sector: string
  plain: string
  quote: string
  ref: string
  date: string
  url: string
  /** false = a full-text copy on a third-party site, not the regulator's own page */
  primary: boolean
}

export const RULES: Rule[] = [
  {
    id: 'irdaiMisSell',
    regulator: 'IRDAI',
    sector: 'Insurance',
    plain: 'Mis-selling includes any false or misleading statement about what a policy does.',
    quote: 'making a false or misleading statement or misrepresenting the facts or benefits',
    ref: 'Protection of Policyholders’ Interests Regulations 2024, Reg. 5(9)(b)',
    date: '20 Mar 2024',
    url: 'https://taxguru.in/?p=911054',
    primary: false,
  },
  {
    id: 'irdaiFreeLook',
    regulator: 'IRDAI',
    sector: 'Insurance',
    plain:
      'Life and individual health policies of a year or more come with 30 days to cancel after the document arrives; the refund is less proportionate risk premium and some costs.',
    quote: 'free look period of 30 days beginning from the date of receipt of policy document',
    ref: 'PPHI Regulations 2024, Reg. 20(1)',
    date: '20 Mar 2024',
    url: 'https://taxguru.in/?p=911054',
    primary: false,
  },
  {
    id: 'irdaiCompare',
    regulator: 'IRDAI',
    sector: 'Insurance',
    plain:
      'No unfair comparison with products that are not comparable (an FD is not a policy), and a benefit that is not guaranteed must be called that.',
    quote: 'makes unfair or incomplete comparisons with products which are not comparable',
    ref: 'Insurance Advertisements and Disclosure Regulations 2021, Reg. 3(g)',
    date: '7 Apr 2021',
    url: 'https://taxguru.in/?p=765351',
    primary: false,
  },
  {
    id: 'rbiCardHours',
    regulator: 'RBI',
    sector: 'Credit cards',
    plain: 'Card sales reps may call customers only between 10 am and 7 pm.',
    quote:
      'The card-issuer’s representatives shall contact the customers only between 10:00 hrs and 19:00 hrs.',
    ref: 'Master Direction on Credit and Debit Cards 2022, para 6(a)(ix)',
    date: '21 Apr 2022 (as updated)',
    url: 'https://www.rbi.org.in/scripts/NotificationUser.aspx?Id=12300',
    primary: true,
  },
  {
    id: 'rbiUnsolicited',
    regulator: 'RBI',
    sector: 'Credit cards',
    plain: 'No card without an explicit yes. "We’ll send it, use it if you like" is not consent.',
    quote: 'The issue of unsolicited cards/upgradation is strictly prohibited.',
    ref: 'Master Direction on Credit and Debit Cards 2022, para 6(a)(iv)',
    date: '21 Apr 2022 (as updated)',
    url: 'https://www.rbi.org.in/scripts/NotificationUser.aspx?Id=12300',
    primary: true,
  },
  {
    id: 'rbiKfs',
    regulator: 'RBI',
    sector: 'Loans',
    plain:
      'Every retail loan comes with a Key Facts Statement showing the all-in annual percentage rate (APR). Compare on APR, not the monthly rate.',
    quote: 'REs shall provide a KFS to all prospective borrowers',
    ref: 'Key Facts Statement for Loans and Advances, RBI/2024-25/18',
    date: '15 Apr 2024',
    url: 'https://rbi.org.in/Scripts/NotificationUser.aspx?Id=12663&Mode=0',
    primary: true,
  },
  {
    id: 'amfiReturns',
    regulator: 'SEBI (AMFI code)',
    sector: 'Mutual funds',
    plain:
      'A distributor may never indicate or assure returns, and must explain that mutual funds are not guaranteed.',
    quote:
      'It shall be explained to the clients that MF investments are not guaranteed or assured return products',
    ref: 'AMFI Code of Conduct for MF Distributors, II.4(g)–(h)',
    date: 'Apr 2022',
    url: 'https://www.arihantcapital.com/pdf/AMFI_Code-of-Conduct.pdf',
    primary: false,
  },
  {
    id: 'sebiYield',
    regulator: 'SEBI',
    sector: 'Mutual funds',
    plain:
      'No “indicative portfolio” or “indicative yield” for a scheme, from the AMC or the distributor.',
    quote:
      'Mutual Funds, AMCs and distributors shall not offer any indicative portfolio and indicative yield.',
    ref: 'Master Circular for Mutual Funds, para 13.6.1',
    date: '27 Jun 2024',
    url: 'https://cdn.taxguru.in/wp-content/uploads/2024/06/Master-Circular-for-Mutual-Funds.pdf',
    primary: false,
  },
  {
    id: 'trai',
    regulator: 'TRAI',
    sector: 'All telecalling',
    plain:
      'Promotional calls come from 140 numbers, service and transactional calls from 1600 numbers (deadlines: banks 1 Jan 2026, NBFCs 1 Feb–1 Mar, AMCs 15 Feb, insurers 15 Feb 2026). A sender’s first violation bars its outgoing calls for 15 days.',
    quote: 'the newly allocated 1600 series is designated for transactional and service calls',
    ref: 'TCCCPR (Second Amendment) 2025, TRAI PR 11/2025; deadlines in PR 135/2025 and the 16 Dec 2025 direction',
    date: '12 Feb 2025; 19 Nov and 16 Dec 2025',
    url: 'https://cms.trai.gov.in/sites/default/files/2025-02/PR_No.11of2025.pdf',
    primary: true,
  },
  {
    id: 'rera',
    regulator: 'RERA',
    sector: 'Real estate',
    plain:
      'No marketing or booking for an unregistered project, and every advert carries the RERA registration number. A buyer misled by a false advertisement or prospectus can withdraw and get the money back with interest.',
    quote: 'It is compulsory for the promoter to mention the registration number of the project.',
    ref: 'RERA Act 2016, s.3(1), s.11(2), s.12 (AP RERA guidance page)',
    date: 'Act of 2016',
    url: 'https://rera.ap.gov.in/RERA/Views/AdvertisementGuidelines.aspx',
    primary: true,
  },
  {
    id: 'ccpaCoaching',
    regulator: 'CCPA',
    sector: 'Edtech and coaching',
    plain:
      'No claim of guaranteed selection, job or salary rise (cl. 3(c)) and no “false sense of urgency or scarcity” (cl. 3(e)) in coaching advertising.',
    quote:
      'make false claims such as guaranteed selection, job security, job promotions, salary increase',
    ref: 'Guidelines for Prevention of Misleading Advertisement in Coaching Sector 2024, cl. 3(c) and 3(e)',
    date: '13 Nov 2024',
    url: 'https://livelaw.in/pdf_upload/guidelines-for-prevention-of-misleading-advertisement-in-coaching-sector-2024-571711.pdf',
    primary: true,
  },
]

export const ruleById = (id: RuleId) => RULES.find((r) => r.id === id) as Rule

export type Sector = 'insurance' | 'lending' | 'mf' | 'edtech' | 'realestate'

export const SECTORS: { id: Sector; label: string; who: string }[] = [
  {
    id: 'insurance',
    label: 'Insurance',
    who: 'Life and health insurance agents, bancassurance, POSP',
  },
  { id: 'lending', label: 'Loans and credit cards', who: 'Bank and NBFC telesales, DSAs' },
  { id: 'mf', label: 'Mutual funds and SIP', who: 'MF distributors, wealth RMs' },
  { id: 'edtech', label: 'Edtech counselling', who: 'Admission and course counsellors' },
  { id: 'realestate', label: 'Real estate', who: 'Pre-sales and channel partner teams' },
]

export type Origin = 'heard' | 'translated' | 'written'

export const ORIGIN_LABEL: Record<Origin, string> = {
  heard: 'Quoted as written',
  translated: 'English original, our Hinglish',
  written: 'Written by us',
}

export type Scenario = {
  id: string
  n: number
  sector: Sector
  /** The objection in the buyer's words (Hinglish or Hindi). */
  line: string
  /** English gloss for managers and the AI buyer prompt. */
  gloss: string
  origin: Origin
  /** As written on the source page when origin is 'translated'. */
  original?: string
  source?: SourceRef
  buyer: { role: string; hidden: string; warmsIf: string; endsIf: string }
  rep: {
    goal: string
    /** A model first answer in Hinglish (not a script). */
    example: string
    /** The line that breaks the rule. */
    neverSay: string
    rule: RuleId
    /** What the rule makes the rep say or do. */
    mustSay: string
  }
  minutes: number
}

export const SCENARIOS: Scenario[] = [
  // Insurance
  {
    id: 'mehenga-health',
    n: 1,
    sector: 'insurance',
    line: 'मैं स्वास्थ्य बीमा कवरेज लेना चाहता हूँ लेकिन मुझे लगता है कि यह बहुत महंगा है।',
    gloss: 'I want health cover, but I think it is too expensive.',
    origin: 'heard',
    source: SRC.neodove,
    buyer: {
      role: '34, salaried in Pune, wife and one child, only the employer’s group cover',
      hidden:
        'Compared a ₹10 lakh family floater online and saw a premium higher than expected; does not know the employer cover ends if they change jobs.',
      warmsIf:
        'The rep asks what they compared and what the office cover is, before quoting any number.',
      endsIf: 'The rep pushes the most expensive plan or says the premium will double next month.',
    },
    rep: {
      goal: 'Find what they compared and why, then show one plan that fits their budget.',
      example:
        'Bilkul, premium ek bada kharcha hai. Aapne kaunsa plan dekha tha, aur abhi office wala cover kitne ka hai? Usse pata chalega ki aapko kitna extra chahiye.',
      neverSay: 'Aaj le lo, agle mahine se premium double ho jayega.',
      rule: 'irdaiMisSell',
      mustSay:
        'State the premium, the cover and the main exclusions as they are on the policy document.',
    },
    minutes: 5,
  },
  {
    id: 'young-healthy',
    n: 2,
    sector: 'insurance',
    line: 'Main abhi young hoon, healthy hoon. Abhi zaroorat nahi hai.',
    gloss: 'I am young and healthy. I don’t need it now.',
    origin: 'translated',
    original: 'I’m young and healthy. I don’t need it now.',
    source: SRC.juno,
    buyer: {
      role: '26, software engineer in Bengaluru, single, says they have no dependants',
      hidden:
        'Parents depend on them financially; they have never thought of term cover as being for the parents.',
      warmsIf: 'The rep asks who would be affected if their income stopped, without fear words.',
      endsIf: 'The rep uses scare lines about accidents or death in the first minute.',
    },
    rep: {
      goal: 'Find whether anyone depends on the income; book a 15-minute review if so.',
      example:
        'Sahi baat hai, aap fit ho toh premium bhi kam aata hai. Ek sawaal: agar kal aapki salary ruk jaye, toh ghar mein kisi par asar padega?',
      neverSay: 'Is plan mein return bhi milega aur cover bhi, FD se better hai.',
      rule: 'irdaiMisSell',
      mustSay:
        'Say plainly whether the plan returns anything; if a benefit is not guaranteed, say so.',
    },
    minutes: 4,
  },
  {
    id: 'lic-trust',
    n: 3,
    sector: 'insurance',
    line: 'LIC ki policy hai mere paas. Private wale pe bharosa nahi hai.',
    gloss: 'I have an LIC policy. I don’t trust private insurers.',
    origin: 'translated',
    original:
      'you can’t trust private insurers and shud have a back of LIC in case anything happens to you',
    source: SRC.jago,
    buyer: {
      role: '41, small business owner in Lucknow, LIC endowment policy bought 12 years ago',
      hidden:
        'Has heard of claims being rejected; the LIC policy’s cover is a small share of their income.',
      warmsIf: 'The rep respects the LIC policy and asks how much cover it gives.',
      endsIf: 'The rep runs down LIC or calls the old policy a waste.',
    },
    rep: {
      goal: 'Find the cover gap; explain how to check a claim record, and the 30-day free look.',
      example:
        'LIC acchi company hai, policy chalu rakhiye. Bas ek baat check karte hain: us policy mein cover kitna hai, aur aapki saal ki income kitni hai?',
      neverSay:
        'Le lijiye, pasand na aaye toh 30 din mein poora paisa wapas, ek rupaya nahi katega.',
      rule: 'irdaiFreeLook',
      mustSay:
        'Tell them they have 30 days from receiving the policy document to cancel, and that the refund deducts proportionate risk premium and some costs such as medical exams and stamp duty.',
    },
    minutes: 5,
  },
  // Lending
  {
    id: 'number-kisne',
    n: 4,
    sector: 'lending',
    line: 'Aapko mera number kisne diya?',
    gloss: 'Who gave you my number?',
    origin: 'translated',
    original: 'who gave you my number',
    source: SRC.oriserve,
    buyer: {
      role: '29, filled a personal-loan form on a comparison site two weeks ago and forgot',
      hidden:
        'Gets 6–8 loan calls a day; will listen only if the caller is straight about where the lead came from.',
      warmsIf: 'The rep names the company, the source of the enquiry and the date in one sentence.',
      endsIf: 'The rep dodges the question or says "aapka loan pre-approved hai" before any check.',
    },
    rep: {
      goal: 'Earn 60 seconds by answering honestly, then ask if the need is still live.',
      example:
        'Sach bataun toh, main XYZ Finance se bol raha hoon, aapne 2 November ko comparison site pe personal loan ke liye form bhara tha. Kya abhi bhi zaroorat hai?',
      neverSay: 'Main apne personal mobile se call kar raha hoon, isi pe baat kar lete hain.',
      rule: 'trai',
      mustSay:
        'Make sales calls only from your firm’s 140-series number; if they ask not to be called, note it and stop.',
    },
    minutes: 3,
  },
  {
    id: 'card-use-nahi',
    n: 5,
    sector: 'lending',
    line: 'Main credit card use hi nahi karta.',
    gloss: 'I don’t use credit cards.',
    origin: 'translated',
    original: 'I don’t use credit cards',
    source: SRC.telecrm,
    buyer: {
      role: '38, government employee in Jaipur, pays everything by UPI and debit card',
      hidden: 'A relative fell into card debt; afraid of the interest, not of the card.',
      warmsIf: 'The rep asks why, and talks about paying in full and the interest-free period.',
      endsIf: 'The rep offers to send the card anyway.',
    },
    rep: {
      goal: 'Find the real fear; leave the decision with them and send the Key Fact Statement.',
      example:
        'Bahut log UPI se hi kaam chala lete hain, theek hai. Card se door rehne ki koi khaas wajah hai, jaise interest ka darr?',
      neverSay: 'Card bhej dete hain, pasand na aaye toh use mat karna.',
      rule: 'rbiUnsolicited',
      mustSay:
        'Ask for an explicit yes; share the one-page Key Fact Statement with the application.',
    },
    minutes: 4,
  },
  {
    id: 'better-rate',
    n: 6,
    sector: 'lending',
    line: 'Pehle wale se accha rate mila hai.',
    gloss: 'I got a better rate from the last one.',
    origin: 'heard',
    source: SRC.rmdialer,
    buyer: {
      role: '33, comparing personal-loan offers for a wedding, ₹5 lakh',
      hidden:
        'The "better rate" was a flat monthly rate quoted on a call; they have not seen the APR or fees.',
      warmsIf:
        'The rep asks what the other offer said and offers to compare on APR, fees included.',
      endsIf: 'The rep simply matches the rate without knowing what it was.',
    },
    rep: {
      goal: 'Compare like for like on APR from the Key Facts Statement.',
      example:
        'Accha hai ki aap compare kar rahe ho. Unhone rate monthly bataya ya saal ka? Processing fee milake APR kitna aa raha hai, KFS mein likha hoga.',
      neverSay: 'Hamara rate sabse kam hai, baaki charges baad mein dekh lenge.',
      rule: 'rbiKfs',
      mustSay: 'Quote the APR from your Key Facts Statement, fees included.',
    },
    minutes: 5,
  },
  // Mutual funds
  {
    id: 'bachat-jokhim',
    n: 7,
    sector: 'mf',
    line: 'क्या मुझे म्यूचुअल फंड्स में अपनी बचत को जोख़िम में डालना चाहिए?',
    gloss: 'Should I put my savings at risk in mutual funds?',
    origin: 'heard',
    source: SRC.mfsh,
    buyer: {
      role: '45, a schoolteacher in Indore (she), all savings in FDs and post-office schemes',
      hidden: 'Needs the money for a daughter’s college in 4 years; fears losing it right before.',
      warmsIf: 'The rep asks when the money is needed before naming any fund.',
      endsIf: 'The rep names a return figure.',
    },
    rep: {
      goal: 'Match the product to the time horizon; say plainly that returns are not guaranteed.',
      example:
        'Bahut sahi sawaal hai. Pehle ye bataiye, ye paisa kab chahiye? Agar 4 saal mein chahiye toh har fund sahi nahi hai, aur koi bhi return guaranteed nahi hota.',
      neverSay: 'Is fund ne 15% diya hai, aapko bhi 12% toh milega hi.',
      rule: 'amfiReturns',
      mustSay: 'Say that mutual funds are not guaranteed or assured-return products.',
    },
    minutes: 5,
  },
  {
    id: 'sip-band',
    n: 8,
    sector: 'mf',
    line: 'Market gir raha hai. SIP band kar doon kya?',
    gloss: 'The market is falling. Should I stop my SIP?',
    origin: 'translated',
    original: 'Should I discontinue my SIPs?',
    source: SRC.sharekhan,
    buyer: {
      role: '31, product manager in Gurugram, ₹15,000 a month SIP for 3 years',
      hidden: 'Saw the portfolio in red for the first time; a colleague stopped theirs.',
      warmsIf: 'The rep asks what the SIP is for and when they need the money.',
      endsIf: 'The rep promises the market will bounce back.',
    },
    rep: {
      goal: 'Bring the decision back to their goal and horizon, without predicting the market.',
      example:
        'Portfolio red mein dekh ke darr lagna normal hai. Ye SIP kis cheez ke liye shuru kiya tha, aur paisa kab chahiye? Uske hisaab se decide karte hain, market ke andaaze se nahi.',
      neverSay: 'Tension mat lo, market pakka wapas upar aayega.',
      rule: 'amfiReturns',
      mustSay:
        'Make no forecast of returns; talk only about their goal, horizon and the scheme documents.',
    },
    minutes: 4,
  },
  {
    id: 'mf-confusing',
    n: 9,
    sector: 'mf',
    line: 'म्यूचुअल फंड चुनना बहुत उलझन भरा है?',
    gloss: 'Choosing a mutual fund is very confusing, isn’t it?',
    origin: 'heard',
    source: SRC.mfsh,
    buyer: {
      role: '27, first job in Kolkata, has ₹3,000 a month to invest',
      hidden: 'Has seen 20 "top fund" videos and is frozen; wants one simple step.',
      warmsIf: 'The rep reduces it to one goal and one next step.',
      endsIf: 'The rep lists more than three funds.',
    },
    rep: {
      goal: 'Turn confusion into one goal and one first step.',
      example:
        'Haan, options bahut hain. Chaliye ek hi sawaal se shuru karte hain: ye ₹3,000 kis kaam ke liye bachana hai, aur kitne saal ke liye?',
      neverSay: 'Ye top fund hai, isme paisa double ho jayega.',
      rule: 'amfiReturns',
      mustSay: 'No assured returns; point them to the scheme documents before they invest.',
    },
    minutes: 4,
  },
  // Edtech
  {
    id: 'fees-zyada',
    n: 10,
    sector: 'edtech',
    line: 'Fees bahut zyada hai. Placement ki guarantee hai kya?',
    gloss: 'The fee is too high. Is placement guaranteed?',
    origin: 'written',
    buyer: {
      role: 'Father of a final-year BCom student in Nagpur, calling after a webinar',
      hidden: 'Will take a loan for the fee; needs to know what happens if no job comes.',
      warmsIf:
        'The rep gives real numbers (who got placed, how many, how it was counted) and the refund policy.',
      endsIf: 'The rep says "100% placement guaranteed".',
    },
    rep: {
      goal: 'Answer honestly about outcomes and the refund terms; agree a call with the student.',
      example:
        'Sir, guarantee koi bhi imaandaar institute nahi de sakta. Main aapko pichle batch ka data bhejta hoon: kitne bacche the, kitno ko job mili, aur refund policy bhi.',
      neverSay: '100% placement guarantee hai, tension mat lijiye.',
      rule: 'ccpaCoaching',
      mustSay: 'No guaranteed selection or job; share outcome data with how it was counted.',
    },
    minutes: 5,
  },
  {
    id: 'ghar-walon',
    n: 11,
    sector: 'edtech',
    line: 'Ghar walon se puchna padega.',
    gloss: 'I’ll have to ask my family.',
    origin: 'translated',
    original: 'Let me discuss it with my family.',
    source: SRC.callyzer,
    buyer: {
      role: '22, graduate in Patna, interested in a data-analytics course',
      hidden: 'Parents pay; the student wants the course but cannot explain the cost to them.',
      warmsIf: 'The rep offers a joint call with the parents and a one-page summary in Hindi.',
      endsIf: 'The rep invents a deadline.',
    },
    rep: {
      goal: 'Help them explain it at home; book a call with the decision-maker.',
      example:
        'Bilkul, ye family ka decision hai. Kya main aapke papa ya mummy ke saath 10 minute ki call rakh sakta hoon? Main ek page ki summary Hindi mein bhej deta hoon.',
      neverSay: 'Ye discount sirf aaj raat 12 baje tak hai.',
      rule: 'ccpaCoaching',
      mustSay: 'No false urgency or scarcity; give the real fee and its validity in writing.',
    },
    minutes: 4,
  },
  {
    id: 'whatsapp-edtech',
    n: 12,
    sector: 'edtech',
    line: 'WhatsApp pe bhej do.',
    gloss: 'Send it on WhatsApp.',
    origin: 'heard',
    source: SRC.rmdialer,
    buyer: {
      role: '24, working in a BPO in Noida, downloaded a brochure for an MBA prep course',
      hidden: 'Curious but unsure the course fits a night shift; "send it" is a polite exit.',
      warmsIf: 'The rep asks one question about their schedule before agreeing to send.',
      endsIf: 'The rep reads the brochure aloud.',
    },
    rep: {
      goal: 'Turn the brush-off into one qualifying question and a dated follow-up.',
      example:
        'Zaroor bhejta hoon. Bas itna bata dijiye, aapki day shift hai ya night shift? Main wahi batch timing bhejunga jo aapke liye chal sake.',
      neverSay: 'Sirf 3 seats bachi hain, aaj hi book karo.',
      rule: 'ccpaCoaching',
      mustSay: 'No false scarcity; send only what is true about seats, dates and fees.',
    },
    minutes: 3,
  },
  // Real estate
  {
    id: 'market-theek-nahi',
    n: 13,
    sector: 'realestate',
    line: 'Abhi market theek nahi hai. Thoda ruk ke dekhte hain.',
    gloss: 'The market isn’t good right now. Let’s wait and see.',
    origin: 'translated',
    original: 'The market is bad right now.',
    source: SRC.callyzerRe,
    buyer: {
      role: '36, IT couple in Hyderabad, renting, looking at 2BHK under-construction flats',
      hidden: 'Worried the project will be delayed, not about prices.',
      warmsIf:
        'The rep asks what "theek nahi" means to them and offers the RERA page for the project.',
      endsIf: 'The rep promises a possession date or price rise as certain.',
    },
    rep: {
      goal: 'Find the real worry; show registration and construction status from the RERA site.',
      example:
        'Samajh sakta hoon. "Theek nahi" se aapka matlab price hai ya project time pe complete hoga ya nahi? Main aapko project ka RERA number bhejta hoon, wahan progress khud dekh sakte ho.',
      neverSay: 'Possession pakka next year hai, aur price 20% badh jayega.',
      rule: 'rera',
      mustSay: 'Give the RERA registration number; make no promise the agreement does not make.',
    },
    minutes: 5,
  },
  {
    id: 'budget-nahi',
    n: 14,
    sector: 'realestate',
    line: 'Abhi budget nahi hai.',
    gloss: 'There’s no budget right now.',
    origin: 'heard',
    source: SRC.rmdialer,
    buyer: {
      role: '30, a first-time buyer in Thane (she), enquired about a ₹78 lakh 1BHK',
      hidden: 'Has the down payment; unsure about the EMI and charges on top of the base price.',
      warmsIf: 'The rep asks what budget they had in mind and offers an all-in cost sheet.',
      endsIf: 'The rep says "all inclusive" without a written cost sheet.',
    },
    rep: {
      goal: 'Find the real number; share an all-in cost sheet in writing.',
      example:
        'Koi baat nahi. Aapne apne liye kitna budget socha tha, down payment aur EMI milake? Main aapko poori cost sheet bhejta hoon, registration aur charges ke saath.',
      neverSay: 'Sab kuch included hai, koi hidden charge nahi.',
      rule: 'rera',
      mustSay:
        'Share the full cost sheet in writing; anything in the brochure or ad must match it (s.12 lets a buyer misled by an ad withdraw with interest).',
    },
    minutes: 4,
  },
  {
    id: 'sochke-batata',
    n: 15,
    sector: 'realestate',
    line: 'Sochke batata hoon.',
    gloss: 'I’ll think and let you know.',
    origin: 'heard',
    source: SRC.rmdialer,
    buyer: {
      role: '48, business owner in Ahmedabad, visited the site last Sunday with family',
      hidden: 'Liked the flat; the spouse wants a second site visit to check the school route.',
      warmsIf: 'The rep asks what is left to decide and who else is deciding.',
      endsIf:
        'The rep says the unit will be sold by tonight, or asks for a token before registration.',
    },
    rep: {
      goal: 'Find what is left to decide; book a dated second visit.',
      example:
        'Zaroor sochiye, bada decision hai. Bas ye bata dijiye, kis baat pe sochna hai: price, location, ya family ko ek baar aur dikhana hai? Main uske hisaab se arrange kar deta hoon.',
      neverSay: 'Registration abhi process mein hai, aap token amount de ke booking kar lo.',
      rule: 'rera',
      mustSay: 'Book only units in a RERA-registered project, and give the registration number.',
    },
    minutes: 4,
  },
]

export const RUBRIC = [
  {
    id: 'language',
    name: 'Spoke their language',
    levels: [
      'Switched to formal English or jargon (APR, NAV, CTC) without explaining',
      'Matched their Hindi/Hinglish mix most of the time',
      'Matched their mix, plain words, explained every term in one line',
    ],
  },
  {
    id: 'ask',
    name: 'Found the real reason',
    levels: [
      'Answered the objection at once with a pitch',
      'Asked a question but answered before hearing the reason',
      'Asked first, uncovered the hidden reason on the buyer card',
    ],
  },
  {
    id: 'rule',
    name: 'Stayed inside the rule',
    levels: [
      'Said the never-say line or something like it',
      'No breach, but skipped what the rule asks the rep to say',
      'No breach and said what the rule asks (free look, KFS, no guarantee, RERA number)',
    ],
  },
  {
    id: 'next',
    name: 'Agreed a next step',
    levels: [
      '"Main WhatsApp kar deta hoon" with no date',
      'A next step without a date or the right person',
      'A dated next step with the person who decides',
    ],
  },
] as const

export const LEVEL_POINTS = [1, 3, 5] as const
export const MAX_SCORE = RUBRIC.length * 5

export const verdict = (total: number) =>
  total >= 16
    ? 'Ready for live calls on this objection.'
    : total >= 10
      ? 'Close. Rerun now and fix only the lowest line.'
      : 'Not yet. Rerun tomorrow, then try again.'

export type Vendor = {
  name: string
  claim: string
  caveat: string
  url: string
  ours?: boolean
}

/** Only tools whose own page (or own help centre) lists Hindi. Checked 15 Nov 2026. */
export const VENDORS: Vendor[] = [
  {
    name: 'Hyperbound',
    claim: 'Lists Hindi, Gujarati, Marathi and Tamil among “25+ languages”',
    caveat: 'Enterprise page FAQ; “more upon request”',
    url: 'https://www.hyperbound.ai/enterprise',
  },
  {
    name: 'Second Nature',
    claim: 'Lists “Hindi - India [hi-IN]”',
    caveat: 'All content, persona and evaluation guidelines must be written in Hindi',
    url: 'https://support.secondnature.ai/articles/7053325590-language-support',
  },
  {
    name: 'PitchMonster',
    claim: 'Lists Hindi, Bengali, Kannada, Marathi and Tamil',
    caveat: 'Language is fixed once you continue; the interface stays in English',
    url: 'https://help.pitchmonster.io/en-gb/what-languages-are-available-in-pitchmonster-and-how-do-they-work',
  },
  {
    name: 'Yoodli',
    claim: 'Lists Hindi for practice sessions, including roleplays',
    caveat: 'Roleplay titles and admin-written text are not translated',
    url: 'https://support.yoodli.ai/en/articles/15346192-yoodli-language-localization-overview',
  },
  {
    name: 'Disprz',
    claim: '“Vernacular persona configurations for Hindi and other regional languages”',
    caveat: 'Stated in a blog FAQ (14 Jul 2026), not a language list',
    url: 'https://disprz.ai/blog/ai-sales-roleplay-scenarios-india',
  },
  {
    name: 'Outdoo',
    claim: 'Lists Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Punjabi',
    caveat: 'The page itself advises testing a language before rollout',
    url: 'https://www.outdoo.ai/blog/multilingual-ai-roleplay-sales-teams',
  },
  {
    name: 'Tough Tongue AI (our product)',
    claim:
      'Hindi listed for its voice models, speech recognition and voices, including Sarvam voices for Indian languages',
    caveat: 'Its docs say to test a language before launch',
    url: 'https://app.toughtongueai.com/docs/guides/supported-languages',
    ours: true,
  },
]

export const COUNTS = {
  scenarios: SCENARIOS.length,
  sectors: SECTORS.length,
  rules: RULES.length,
  rulesTied: new Set(SCENARIOS.map((s) => s.rep.rule)).size,
  regulators: new Set(RULES.map((r) => r.regulator.split(' ')[0])).size,
  vendors: VENDORS.length,
  byOrigin: (['heard', 'translated', 'written'] as Origin[]).map((o) => ({
    origin: o,
    label: ORIGIN_LABEL[o],
    count: SCENARIOS.filter((s) => s.origin === o).length,
  })),
  bySector: SECTORS.map((s) => ({
    ...s,
    count: SCENARIOS.filter((x) => x.sector === s.id).length,
  })),
  minMinutes: Math.min(...SCENARIOS.map((s) => s.minutes)),
  maxMinutes: Math.max(...SCENARIOS.map((s) => s.minutes)),
}

/** Census 2011, Table C-16 (ORGI, 2018): Hindi as mother tongue. */
export const CENSUS = {
  hindiCrore: 52.83,
  hindiShare: 43.63,
  url: 'https://new.census.gov.in/nada/index.php/catalog/42458/download/46089/C-16_25062018.pdf',
}

export const TTAI_URL =
  'https://www.toughtongueai.com/?utm_source=autointerviewai&utm_medium=blog&utm_campaign=hinglish-sales-roleplay'
