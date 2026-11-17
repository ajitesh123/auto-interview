// Free AI meeting note takers: every limit read on the vendor's own pricing or help page on
// 17 Nov 2026. Quotes are the vendor's words; where a vendor's own pages disagree we say so.
// Feeds /blog/best-free-ai-meeting-note-takers-2026-freemium-plans-ranked (table, figure, fit tool).
// No AI API, no key: the fit tool is plain rules over these numbers.

export const CHECKED = '17 Nov 2026'

export type Platform = 'zoom' | 'meet' | 'teams' | 'inperson'
export type Status = 'yes' | 'catch' | 'no'

export type FitInput = {
  perWeek: number // meetings a week you want notes for
  minutes: number // typical meeting length
  platform: Platform
  botFree: boolean // no bot may join the call
  keepPast30: boolean // need to look back further than 30 days
}

export type Verdict = { status: Status; reasons: string[] }

export type Taker = {
  id: string
  name: string
  url: string // page the limits were read on
  also?: { label: string; url: string }[]
  /** One-line free plan, vendor's words where possible. */
  free: string
  capture: string // bot / bot-free
  history: string
  paid: string // cheapest paid plan, as written
  /** Most minutes a month with AI notes, if a cap is stated or exactly derivable. null = no cap stated. */
  capMinutes: number | null
  /** States unlimited meetings or recordings with no minute or storage cap. */
  unlimited?: true
  capBasis?: string
  watch?: string // a catch or a conflict on the vendor's own pages
  fit: (i: FitInput) => Verdict
}

/** Meetings a month from meetings a week (52 weeks / 12 months). */
export const perMonth = (perWeek: number) => (perWeek * 52) / 12
export const round1 = (n: number) => Math.round(n * 10) / 10

const PLATFORM_LABEL: Record<Platform, string> = {
  zoom: 'Zoom',
  meet: 'Google Meet',
  teams: 'Microsoft Teams',
  inperson: 'in-person meetings',
}
export const platformLabel = (p: Platform) => PLATFORM_LABEL[p]

/** Combine checks: any 'no' wins, then any 'catch'. */
function verdict(checks: [Status, string][]): Verdict {
  const no = checks.filter(([s]) => s === 'no').map(([, r]) => r)
  if (no.length) return { status: 'no', reasons: no }
  const c = checks.filter(([s]) => s === 'catch').map(([, r]) => r)
  if (c.length) return { status: 'catch', reasons: c }
  return { status: 'yes', reasons: [] }
}

const onlyOnline = (i: FitInput): [Status, string] | null =>
  i.platform === 'inperson'
    ? [
        'catch',
        'In-person capture is not described on the pages we read; check before relying on it.',
      ]
    : null

export const TAKERS: Taker[] = [
  {
    id: 'fathom',
    name: 'Fathom',
    url: 'https://www.fathom.ai/pricing',
    also: [
      { label: 'Fathom help: Free version', url: 'https://help.fathom.video/en/articles/729152' },
    ],
    free: '"Unlimited recordings + transcriptions", "Instant AI call summaries"; help: "unlimited storage and recordings - forever"',
    capture: 'Bot, or bot-free capture (beta, Mac)',
    history: 'Unlimited storage (help page)',
    paid: 'Team $15/user/month billed annually (2-user minimum), $19 monthly',
    capMinutes: null,
    unlimited: true,
    watch:
      'AI action items and some other features are marked "Limited use" in the plan table without saying which plan or how much.',
    fit: (i) =>
      verdict(
        [
          onlyOnline(i),
          i.botFree
            ? (['catch', 'Bot-free capture is "in beta" and the footnote says Mac only.'] as [
                Status,
                string,
              ])
            : null,
        ].filter(Boolean) as [Status, string][]
      ),
  },
  {
    id: 'circleback',
    name: 'Circleback',
    url: 'https://circleback.ai/pricing',
    free: '"Every plan, including Free, has unlimited meetings." AI meeting notes and action items',
    capture: '"A bot or the bot-free desktop app for online meetings"',
    history: '"30-day meeting and recording history"',
    paid: 'Pro $15/user/month',
    capMinutes: null,
    unlimited: true,
    fit: (i) =>
      verdict(
        [
          i.keepPast30
            ? (['catch', 'Free keeps a 30-day history; older meetings lock.'] as [Status, string])
            : null,
        ].filter(Boolean) as [Status, string][]
      ),
  },
  {
    id: 'granola',
    name: 'Granola',
    url: 'https://www.granola.ai/pricing',
    also: [
      {
        label: 'Granola pricing blog',
        url: 'https://www.granola.ai/blog/meeting-note-tool-pricing-granola-vs-fireflies-fathom-otter',
      },
    ],
    free: 'Basic $0: AI meeting notes; vendor blog: "unlimited meetings to test note quality"',
    capture: '"Bot-free, device-audio capture" (desktop and mobile apps)',
    history: '"30 days"; older notes return when you upgrade',
    paid: 'Business $14/user/month',
    capMinutes: null,
    unlimited: true,
    watch: 'HubSpot, Notion and Zapier integrations are not on Basic; Slack is.',
    fit: (i) =>
      verdict(
        [
          i.platform === 'inperson'
            ? ([
                'catch',
                'It records device audio; the pricing page does not describe in-person use.',
              ] as [Status, string])
            : null,
          i.keepPast30
            ? (['catch', 'Basic shows 30 days of meeting history.'] as [Status, string])
            : null,
        ].filter(Boolean) as [Status, string][]
      ),
  },
  {
    id: 'grain',
    name: 'Grain',
    url: 'https://support.grain.com/en/articles/9253220-plans',
    free: '"Unlimited meetings, up to 45 minutes each"; AI notes and action items',
    capture: '"Record with the bot, or without one using the desktop app"',
    history: '"30-day meeting history: older meetings are locked"',
    paid: 'Pro $15/month billed yearly, $19 monthly',
    capMinutes: null,
    unlimited: true,
    fit: (i) =>
      verdict(
        [
          onlyOnline(i),
          i.minutes > 45
            ? (['no', `Each meeting is capped at 45 minutes; yours run ${i.minutes}.`] as [
                Status,
                string,
              ])
            : null,
          i.keepPast30
            ? (['catch', 'Free keeps 30 days of meetings; older ones lock.'] as [Status, string])
            : null,
        ].filter(Boolean) as [Status, string][]
      ),
  },
  {
    id: 'fireflies',
    name: 'Fireflies.ai',
    url: 'https://fireflies.ai/pricing',
    also: [
      {
        label: 'Fireflies help: Free plan',
        url: 'https://guide.fireflies.ai/articles/4027724828-learn-about-the-fireflies-free-plan',
      },
    ],
    free: '"Unlimited transcription*", "Limited AI summaries", 2-hour recording limit; help: "20 AI credits per month"',
    capture: 'Bot (auto-join); Chrome extension without the bot is listed, but not clearly on Free',
    history:
      '"400 mins of storage/team" (pricing page); help says "400 minutes of storage per seat"',
    paid: 'Pro $10/seat/month billed annually',
    capMinutes: null,
    watch:
      'Its own pages disagree: storage per team (pricing) vs per seat (help), and the help page also says "3 meetings are included on the Free plan" without saying for what.',
    fit: (i) => {
      const m = perMonth(i.perWeek) * i.minutes
      return verdict(
        [
          onlyOnline(i),
          [
            'catch',
            'AI summaries are "Limited" on Free (the help page says 20 AI credits a month).',
          ],
          i.minutes > 120 ? (['no', 'Free recordings stop at 2 hours.'] as [Status, string]) : null,
          m > 400
            ? ([
                'catch',
                `You record about ${Math.round(m)} minutes a month; storage is 400 minutes, so you would delete old meetings to keep going.`,
              ] as [Status, string])
            : null,
          i.botFree
            ? (['catch', 'The bot-free Chrome extension is not clearly included on Free.'] as [
                Status,
                string,
              ])
            : null,
          i.keepPast30 && m * 3 > 400
            ? (['catch', '400 minutes of storage will not hold three months of your meetings.'] as [
                Status,
                string,
              ])
            : null,
        ].filter(Boolean) as [Status, string][]
      )
    },
  },
  {
    id: 'tldv',
    name: 'tl;dv',
    url: 'https://intercom.help/tldv/en/articles/8919450-what-are-the-limits-of-the-free-plan',
    also: [{ label: 'tl;dv home', url: 'https://tldv.io/' }],
    free: 'Unlimited recordings; "Your first 10 meetings will have automatic AI notes", then "only the first 10 minutes of each meeting"',
    capture: 'Bot (Zoom, Meet, Teams) or desktop app "without a bot"',
    history: '"Recordings on the Free plan are stored for 3 months"',
    paid: 'Not shown on the page we could open',
    capMinutes: null,
    watch: '"These limits are for the lifetime of the account, they do not renew monthly."',
    fit: (i) =>
      verdict(
        [
          onlyOnline(i),
          i.minutes > 180
            ? (['no', 'Every plan caps a meeting at 3 hours.'] as [Status, string])
            : null,
          i.botFree
            ? ([
                'catch',
                'The desktop app records without a bot; the free-plan page does not say it is included.',
              ] as [Status, string])
            : null,
          i.minutes > 10
            ? ([
                'catch',
                'Full AI notes only for your first 10 meetings ever; after that, notes cover the first 10 minutes of each meeting.',
              ] as [Status, string])
            : null,
        ].filter(Boolean) as [Status, string][]
      ),
  },
  {
    id: 'otter',
    name: 'Otter.ai',
    url: 'https://otter.ai/pricing',
    free: '"300 minutes per user" a month, 30 minutes per conversation, "25 most recent" conversations kept',
    capture: 'Notetaker that joins Zoom, Teams and Meet from your calendar',
    history: '25 most recent conversations',
    paid: 'Pro $8.33/user/month billed annually, $16.99 monthly',
    capMinutes: 300,
    capBasis: '300 minutes a month, stated',
    fit: (i) => {
      const m = perMonth(i.perWeek) * Math.min(i.minutes, 30)
      return verdict(
        [
          onlyOnline(i),
          i.minutes > 30
            ? (['no', `Each conversation stops at 30 minutes; yours run ${i.minutes}.`] as [
                Status,
                string,
              ])
            : null,
          m > 300
            ? (['no', `You need about ${Math.round(m)} minutes a month; Basic gives 300.`] as [
                Status,
                string,
              ])
            : null,
          i.botFree
            ? ([
                'catch',
                'Its pricing page describes a notetaker that joins your meetings; bot-free capture is not described.',
              ] as [Status, string])
            : null,
          i.keepPast30
            ? (['catch', 'Only the 25 most recent conversations are kept.'] as [Status, string])
            : null,
        ].filter(Boolean) as [Status, string][]
      )
    },
  },
  {
    id: 'readai',
    name: 'Read AI',
    url: 'https://www.read.ai/plans-pricing',
    free: '"5 meeting transcripts per month", meetings up to 1 hour',
    capture: 'Bot ("Read Assistant") in Zoom, Teams or Meet',
    history: 'Not stated for Free',
    paid: 'Pro $15/user/month billed annually ($19.75 otherwise)',
    capMinutes: 300,
    capBasis: '5 meetings × 60 minutes, the most the caps allow',
    fit: (i) =>
      verdict(
        [
          onlyOnline(i),
          i.minutes > 60 ? (['no', 'Free meetings max out at 1 hour.'] as [Status, string]) : null,
          perMonth(i.perWeek) > 5
            ? ([
                'no',
                `You have about ${round1(perMonth(i.perWeek))} meetings a month; Free transcribes 5.`,
              ] as [Status, string])
            : null,
          i.botFree
            ? ([
                'no',
                'It joins as an assistant in the meeting; bot-free capture is not stated.',
              ] as [Status, string])
            : null,
        ].filter(Boolean) as [Status, string][]
      ),
  },
  {
    id: 'jamie',
    name: 'Jamie',
    url: 'https://www.meetjamie.ai/pricing',
    also: [
      {
        label: 'Jamie docs: plans',
        url: 'https://docs.meetjamie.ai/pages/billing_pricing/pricing_plans',
      },
    ],
    free: '"10 AI notes / month", "30min meeting duration limit", unlimited storage',
    capture: 'Desktop app, no bot; online and in-person meetings',
    history: 'Unlimited storage',
    paid: 'Plus $24 (billing period not stated)',
    capMinutes: 300,
    capBasis: '10 notes × 30 minutes, the most the caps allow',
    fit: (i) =>
      verdict(
        [
          i.minutes > 30
            ? (['no', `Free meetings are limited to 30 minutes; yours run ${i.minutes}.`] as [
                Status,
                string,
              ])
            : null,
          perMonth(i.perWeek) > 10
            ? ([
                'no',
                `You have about ${round1(perMonth(i.perWeek))} meetings a month; Free gives 10 AI notes.`,
              ] as [Status, string])
            : null,
        ].filter(Boolean) as [Status, string][]
      ),
  },
  {
    id: 'meetgeek',
    name: 'MeetGeek',
    url: 'https://meetgeek.ai/',
    free: '"3 hours of recording / month"; "Bot-free recording is on every plan, including Free"',
    capture: 'Bot ("MeetGeek Notetaker") or bot-free',
    history: '"3 months of transcript storage" (FAQ); another FAQ says 1 month on Basic',
    paid: 'Not shown on the page we could open',
    capMinutes: 180,
    capBasis: '3 hours a month, stated',
    watch: 'Its FAQ gives two storage periods (3 months and 1 month).',
    fit: (i) => {
      const m = perMonth(i.perWeek) * i.minutes
      return verdict(
        [
          onlyOnline(i),
          m > 180
            ? (['no', `You need about ${Math.round(m)} minutes a month; Free records 180.`] as [
                Status,
                string,
              ])
            : null,
          i.keepPast30
            ? (['catch', 'Storage is given as 3 months in one FAQ and 1 month in another.'] as [
                Status,
                string,
              ])
            : null,
        ].filter(Boolean) as [Status, string][]
      )
    },
  },
  {
    id: 'tactiq',
    name: 'Tactiq',
    url: 'https://tactiq.io/pricing',
    free: '"10 transcripts / mo", "5 AI credits / mo"',
    capture: 'Chrome extension for Meet, Zoom and Teams, no bot',
    history: 'Not stated',
    paid: 'Pro $8/user/month, annual billing',
    capMinutes: null,
    fit: (i) => {
      const n = perMonth(i.perWeek)
      return verdict(
        [
          i.platform === 'inperson'
            ? (['no', 'It is a Chrome extension for online meetings.'] as [Status, string])
            : null,
          n > 10
            ? ([
                'no',
                `You have about ${round1(n)} meetings a month; Free gives 10 transcripts.`,
              ] as [Status, string])
            : null,
          n > 5 && n <= 10
            ? ([
                'catch',
                'Transcripts cover 10 meetings, but 5 AI credits a month limit the AI summaries.',
              ] as [Status, string])
            : null,
        ].filter(Boolean) as [Status, string][]
      )
    },
  },
  {
    id: 'sembly',
    name: 'Sembly AI',
    url: 'https://www.sembly.ai/pricing/',
    free: '"The Free plan covers 5 meeting hours", 1 month of history',
    capture: 'Bot that joins Zoom, Meet, Teams and Webex',
    history: '"1 month"',
    paid: 'Basic $8/month billed annually (Black Friday price; $10 in the plan table)',
    capMinutes: 300,
    capBasis: '5 meeting hours; the page does not say per month or one-time',
    watch: 'The page does not say whether the 5 hours renew each month.',
    fit: (i) => {
      const m = perMonth(i.perWeek) * i.minutes
      return verdict(
        [
          onlyOnline(i),
          m > 300
            ? (['no', `You need about ${Math.round(m)} minutes a month; Free covers 5 hours.`] as [
                Status,
                string,
              ])
            : null,
          i.botFree
            ? (['no', 'It joins your meetings as a bot; bot-free capture is not stated.'] as [
                Status,
                string,
              ])
            : null,
          m <= 300
            ? (['catch', 'The page does not say if the 5 hours renew each month.'] as [
                Status,
                string,
              ])
            : null,
          i.keepPast30 ? (['catch', 'Free keeps 1 month of history.'] as [Status, string]) : null,
        ].filter(Boolean) as [Status, string][]
      )
    },
  },
  {
    id: 'zoom',
    name: 'Zoom AI Companion / ZoomMate (Basic)',
    url: 'https://zoom.us/pricing/aic',
    free: 'Workplace Basic: "Meeting summaries (for 3 hosted meetings per month)", "AI note-taking (My Notes) ... (3 uses per month)"',
    capture: 'Built into Zoom; summaries for meetings you host',
    history: 'Not stated',
    paid: 'ZoomMate $16.67/user/month billed annually, $20 monthly',
    capMinutes: null,
    fit: (i) =>
      verdict(
        [
          i.platform !== 'zoom' && perMonth(i.perWeek) <= 3
            ? ([
                'catch',
                'On other platforms Basic gives AI note-taking (My Notes), 3 uses a month, not meeting summaries.',
              ] as [Status, string])
            : null,
          i.platform !== 'zoom' && perMonth(i.perWeek) > 3
            ? ([
                'no',
                `Off Zoom, Basic gives 3 AI note-taking uses a month; you have about ${round1(perMonth(i.perWeek))} meetings.`,
              ] as [Status, string])
            : null,
          i.platform === 'zoom' && perMonth(i.perWeek) > 3
            ? ([
                'no',
                `You have about ${round1(perMonth(i.perWeek))} meetings a month; Basic summarises 3 hosted meetings.`,
              ] as [Status, string])
            : null,
          i.platform === 'zoom'
            ? (['catch', 'Only meetings you host get a summary.'] as [Status, string])
            : null,
        ].filter(Boolean) as [Status, string][]
      ),
  },
  {
    id: 'notta',
    name: 'Notta',
    url: 'https://www.notta.ai/en/pricing',
    free: '"120 transcription minutes/month", "Up to 3 minutes per conversation", "10 AI Summary/month"',
    capture:
      'Bot (web app); a desktop app with no bot (free-plan inclusion not stated on the pricing page)',
    history: 'Not stated',
    paid: 'Pro $8.17/month, $97.99 billed annually',
    capMinutes: 120,
    capBasis: '120 minutes a month, stated (3 minutes per conversation)',
    watch: 'At 3 minutes per conversation, the free plan cannot hold a real meeting.',
    fit: (i) => verdict([['no', 'Free transcribes up to 3 minutes per conversation.']]),
  },
]

/** Pages people call "free" that need a paid licence or are a trial. */
export type NotFree = { name: string; url: string; what: string; needs: string }

export const NOT_FREE: NotFree[] = [
  {
    name: 'Google Meet "Take notes for me" (Gemini)',
    url: 'https://support.google.com/meet/answer/14754931',
    what: 'Notes in a Google Doc; "recommended for meetings of 15 minutes to a maximum of 8 hours"',
    needs:
      'Workspace Business Standard, Business Plus, Enterprise Standard or Enterprise Plus, or a Google AI Pro or Ultra plan; the organiser must have it',
  },
  {
    name: 'Microsoft Teams intelligent recap',
    url: 'https://learn.microsoft.com/en-us/microsoftteams/intelligent-recap-calls-meetings',
    what: 'AI notes, tasks and chapters after a Teams meeting',
    needs: '"a Teams Premium license or Microsoft Copilot license", with transcription turned on',
  },
  {
    name: 'Notion AI Meeting Notes',
    url: 'https://www.notion.com/help/ai-meeting-notes',
    what: 'Bot-free notes from system audio into a Notion page',
    needs:
      '"You must be on Notion\'s Business or Enterprise Plan"; the help page offers a free try',
  },
  {
    name: 'Bluedot',
    url: 'https://www.bluedothq.com/pricing',
    what: 'Bot-free notes from a Chrome extension or app',
    needs: 'Free is "5 meetings / lifetime", then Basic from $14/user/month',
  },
  {
    name: 'Avoma',
    url: 'https://www.avoma.com/',
    what: 'Meeting notes and conversation intelligence',
    needs: 'A 14-day trial; the free seats are "view-only"',
  },
]

/** Recording consent: what the law says, primary sources only. */
export type Rule = { where: string; rule: string; quote: string; url: string; label: string }

export const CONSENT: Rule[] = [
  {
    where: 'United States (federal)',
    rule: 'One-party consent: a person who is a party to the call, or has one party’s consent, may record, unless it is for a crime or tort.',
    quote: '"one of the parties to the communication has given prior consent"',
    url: 'https://www.govinfo.gov/content/pkg/USCODE-2021-title18/html/USCODE-2021-title18-partI-chap119-sec2511.htm',
    label: '18 U.S.C. § 2511(2)(d)',
  },
  {
    where: 'California',
    rule: 'All-party consent for confidential conversations. Several other states also require everyone’s consent; check the state of each person on the call.',
    quote: '"without the consent of all parties to a confidential communication"',
    url: 'https://law.justia.com/codes/california/code-pen/part-1/title-15/chapter-1-5/section-632',
    label: 'California Penal Code § 632',
  },
  {
    where: 'United Kingdom',
    rule: 'Tell people you are recording and why; recording must be necessary and proportionate (ICO guidance on monitoring workers).',
    quote: '"You must tell these people that you are recording the call and why."',
    url: 'https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/employment/monitoring-workers/specific-data-protection-considerations-for-different-ways-or-methods-of-monitoring-workers',
    label: 'ICO, monitoring workers',
  },
  {
    where: 'India',
    rule: 'Where consent is the basis, it must come with a notice and be specific and informed (DPDP Act 2023, s.5–6).',
    quote: '"free, specific, informed, unconditional and unambiguous"',
    url: 'https://www.indiacode.nic.in/bitstream/123456789/22037/2/a2023-22.pdf',
    label: 'DPDP Act 2023, s.6',
  },
]

export type Case = { name: string; filed: string; what: string; url: string }

export const CASES: Case[] = [
  {
    name: 'In re Otter.AI Privacy Litigation (N.D. Cal., No. 5:25-cv-06911)',
    filed: 'Filed Aug 2025; order on motion to dismiss 13 Aug 2026',
    what: 'Alleges Otter’s notetaker recorded meeting participants without consent and used recordings to train AI. The court let the federal Wiretap Act, California privacy (CIPA) and several other claims proceed and dismissed or withdrew others. No liability has been found.',
    url: 'https://storage.courtlistener.com/recap/gov.uscourts.cand.454675/gov.uscourts.cand.454675.68.0.pdf',
  },
  {
    name: 'Chamberlain v. Granola, Inc. (N.D. Cal., No. 3:26-cv-07926)',
    filed: 'Filed 30 Jul 2026',
    what: 'A proposed class action by a meeting participant who did not use Granola, against a bot-free note taker that captures device audio. Claims under the Wiretap Act and California privacy law. Allegations only.',
    url: 'https://storage.courtlistener.com/recap/gov.uscourts.cand.475308/gov.uscourts.cand.475308.1.0.pdf',
  },
]

// ---- computed counts (prose and OG never hard-code these) ----
export const UNCAPPED = TAKERS.filter((t) => t.capMinutes === null)
export const UNLIMITED = TAKERS.filter((t) => t.unlimited)
export const OTHER_LIMIT = TAKERS.filter((t) => t.capMinutes === null && !t.unlimited)
export const CAPPED = TAKERS.filter((t) => t.capMinutes !== null)
export const BOT_FREE = TAKERS.filter((t) =>
  /no bot|bot-free|without a bot|without one/i.test(t.capture)
)

/** Worked example used in the post: 2 meetings a week, 45 minutes, Zoom, bot allowed, 30 days is enough. */
export const EXAMPLE: FitInput = {
  perWeek: 2,
  minutes: 45,
  platform: 'zoom',
  botFree: false,
  keepPast30: false,
}

export function fitAll(i: FitInput) {
  return TAKERS.map((t) => ({ t, v: t.fit(i) }))
}
