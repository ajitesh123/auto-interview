// Prices and funnel rates for /blog/ai-calling-software-sales-teams-2026 (AI calling for sales).
// Every price was read on the vendor's own pricing page on 2026-11-11. Prices as written, no
// conversion, no volume discounts unless the row says so. Re-check monthly.
// Funnel defaults come from Gong Labs' analysis of 300M+ cold calls (human reps), the best public
// primary source we found; no independent source publishes AI-agent connect rates.

export const CHECKED = '11 Nov 2026'

export type ToolKind = 'agent' | 'dialer'

export type Vendor = {
  id: string
  name: string
  kind: ToolKind
  /** price exactly as the vendor states it */
  stated: string
  /** what the price does and does not include */
  covers: string
  url: string
  /** USD per minute, low/high, only when the vendor states a USD per-minute agent price */
  perMin?: { low: number; high: number; note?: string }
  region?: string
}

export const VENDORS: Vendor[] = [
  {
    id: 'retell',
    name: 'Retell AI',
    kind: 'agent',
    stated: '$0.07–$0.31 / min; default estimate $0.11',
    covers: 'Platform, model and voice; phone line $0.015/min and $2/month per number extra',
    url: 'https://www.retellai.com/pricing',
    perMin: { low: 0.07, high: 0.31 },
  },
  {
    id: 'bland',
    name: 'Bland AI',
    kind: 'agent',
    stated: '$0.14/min (Start, $0 a month); $0.12/min (Build, $299 a month)',
    covers: 'Model, transcription and voice included; telephony at pass-through cost',
    url: 'https://bland.ai/pricing',
    perMin: { low: 0.12, high: 0.14, note: 'plus telephony' },
  },
  {
    id: 'air',
    name: 'Air.ai',
    kind: 'agent',
    stated: '$0.11/min outbound (dial + talk time); $0.32/min inbound',
    covers:
      'Telephony billed separately at Twilio prices. Settled FTC charges in Mar 2026 (business-opportunity marketing)',
    url: 'https://support.air.ai/air/what-is-your-pricing-model',
    perMin: { low: 0.11, high: 0.32, note: 'outbound low, inbound high; plus telephony' },
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs Agents',
    kind: 'agent',
    stated: '$0.08/min beyond plan minutes; plans $0–$990 a month',
    covers: 'Language model by usage; telephony at cost',
    url: 'https://elevenlabs.io/pricing/agents',
    perMin: { low: 0.08, high: 0.08, note: 'plus model and telephony' },
  },
  {
    id: 'vapi',
    name: 'Vapi',
    kind: 'agent',
    stated: '$0.05/min platform fee',
    covers: 'Transcriber, model, voice and telephony charged at cost on top',
    url: 'https://docs.vapi.ai/pricing',
    perMin: { low: 0.05, high: 0.05, note: 'platform fee only' },
  },
  {
    id: 'aircall-agent',
    name: 'Aircall AI Voice Agent',
    kind: 'agent',
    stated: '$0.29/min pay as you go; 1,000 min for $250 a month',
    covers: 'Bundles billed monthly on an annual commitment; Aircall licences sold separately',
    url: 'https://aircall.io/pricing/',
    perMin: { low: 0.25, high: 0.29, note: '$0.25 is the 1,000-minute bundle' },
  },
  {
    id: 'smallest',
    name: 'Smallest.ai Atoms',
    kind: 'agent',
    stated:
      'US ~$0.15/min, India ~$0.09/min (pay as you go); Business $1,999 a month: ~$0.12 / ~$0.07',
    covers: 'Numbers $10 a month each',
    url: 'https://docs.smallest.ai/atoms/product-overview/admin/subscription-plans',
    perMin: { low: 0.07, high: 0.15, note: 'India low, US high' },
    region: 'India and US',
  },
  {
    id: 'bolna',
    name: 'Bolna',
    kind: 'agent',
    stated: '6.00¢ (₹5.52) per min; about 4.5¢ (₹4.15) on larger top-ups',
    covers:
      'Bundled models included; telephony and a platform fee added per minute (amounts not shown)',
    url: 'https://www.bolna.ai/pricing',
    perMin: { low: 0.045, high: 0.06, note: 'plus telephony and platform fee' },
    region: 'India',
  },
  {
    id: 'cloudtalk',
    name: 'CloudTalk',
    kind: 'dialer',
    stated:
      '€25–€49 per user a month (annual); Power dialer €15, Parallel dialer €39 per user a month',
    covers: 'AI voice agents sold separately: 200 min €99 a month up to 2,500 min €699',
    url: 'https://www.cloudtalk.io/pricing',
  },
  {
    id: 'aircall',
    name: 'Aircall',
    kind: 'dialer',
    stated: '$30 or $50 per licence a month (annual), minimum 3; AI Assist Pro $49 per seat',
    covers: 'Essentials and Professional include 50 AI Voice Agent minutes a month',
    url: 'https://aircall.io/pricing/',
  },
  {
    id: 'justcall',
    name: 'JustCall',
    kind: 'dialer',
    stated:
      '$29 / $49 / $89 per user a month (annual), minimum 2; AI Voice Agent down to $0.15/min',
    covers: 'Volume discounts set the $0.15 agent rate',
    url: 'https://justcall.io/pricing/',
  },
  {
    id: 'dialpad',
    name: 'Dialpad Sell',
    kind: 'dialer',
    stated: '$39 / $59 / $79 per user a month',
    covers: 'Live coaching on Advanced; AI scorecards on Premium',
    url: 'https://www.dialpad.com/pricing/',
  },
  {
    id: 'orum',
    name: 'Orum',
    kind: 'dialer',
    stated: 'Quote only, minimum 9 seats',
    covers: 'Power, parallel and AI dialers; AI coaching is an add-on',
    url: 'https://www.orum.com/pricing',
  },
  {
    id: 'nooks',
    name: 'Nooks',
    kind: 'dialer',
    stated: 'Quote only',
    covers: 'Needs a ZoomInfo, Cognism or LeadIQ subscription',
    url: 'https://www.nooks.ai/pricing',
  },
]

export const AGENTS_WITH_PRICE = VENDORS.filter((v) => v.kind === 'agent' && v.perMin)

/** Gong Labs, 300M+ cold calls: https://www.gong.io/blog/the-hidden-power-of-cold-calling-insights-from-300m-calls */
export const GONG_URL =
  'https://www.gong.io/blog/the-hidden-power-of-cold-calling-insights-from-300m-calls'

export type Funnel = { id: string; label: string; connectPct: number; meetingPct: number }

export const FUNNELS: Funnel[] = [
  { id: 'avg', label: 'Average cold-call rates (Gong)', connectPct: 5.4, meetingPct: 4.6 },
  { id: 'top', label: 'Top-rep cold-call rates (Gong)', connectPct: 13.3, meetingPct: 16.7 },
]

export type CostInput = {
  dials: number
  connectPct: number
  meetingPct: number
  talkMin: number
  /** billed minutes for a dial that does not become a conversation (ringing, voicemail) */
  missMin: number
  pricePerMin: number
}

export function funnelCost(i: CostInput) {
  const conversations = i.dials * (i.connectPct / 100)
  const meetings = conversations * (i.meetingPct / 100)
  const minutes = conversations * i.talkMin + (i.dials - conversations) * i.missMin
  const cost = minutes * i.pricePerMin
  return {
    conversations,
    meetings,
    minutes,
    cost,
    perMeeting: meetings > 0 ? cost / meetings : null,
  }
}

/** The worked example printed on the page: 1,000 dials, 3-minute conversations, 0.5 billed minutes per miss. */
export const WORKED = FUNNELS.flatMap((f) =>
  [0.07, 0.11, 0.31].map((p) => ({
    funnel: f,
    price: p,
    ...funnelCost({
      dials: 1000,
      connectPct: f.connectPct,
      meetingPct: f.meetingPct,
      talkMin: 3,
      missMin: 0.5,
      pricePerMin: p,
    }),
  }))
)

export const usd = (n: number, d = 2) =>
  '$' + n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d })
