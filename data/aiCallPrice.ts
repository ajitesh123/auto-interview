// AI calling / AI voice agent price index for /blog/ai-calling-pricing-breakdown-what-it-really-costs-2026.
// Every price below was read on the vendor's own pricing page (or official docs/help page) on 21 Nov 2026.
// "stated" is the price as the page writes it. "lines" rebuild one typical all-in minute from the page's
// own line items. Where the page bills the phone line separately we add ONE assumed carrier rate
// (Twilio US outbound, CARRIER below) so platforms compare like for like. Re-check monthly.

export const CHECKED = '21 Nov 2026'
export const SLUG = 'ai-calling-pricing-breakdown-what-it-really-costs-2026'
export const TTAI_URL = `https://www.toughtongueai.com/?utm_source=autointerviewai&utm_medium=blog&utm_campaign=${SLUG}`

/** Assumed phone-line rate when a platform bills telephony separately (Twilio US outbound, local). */
export const CARRIER = {
  perMin: 0.014,
  label: 'Twilio US outbound',
  stated: 'Twilio outbound $0.014/min (as listed on Vapi’s pricing page)',
  url: 'https://vapi.ai/pricing',
}

/** Rupees per US dollar. Editable in the calculator. */
export const FX = {
  inrPerUsd: 93.5,
  stated: '₹93.49 per US dollar in early trade, 19 Nov 2026 (PTI)',
  url: 'https://hdfcsky.com/news/rupee-slides-8-paise-to-93-49-against-us-dollar-in-early-trade-november-19-2026',
}

export const GST_RATE = 0.18

export type Line = { label: string; perMin: number }
export type Model = 'bundled' | 'platform' | 'raw' | 'plan' | 'quote'

export type Platform = {
  id: string
  name: string
  url: string
  currency: 'USD' | 'INR'
  model: Model
  /** Price as written on the page. */
  stated: string
  /** What the page says the rate covers. */
  covers: string
  /** What you pay on top. */
  extra: string
  /** Line items for a low and a high typical setup (same currency). Empty = no all-in we can build. */
  low: Line[]
  high: Line[]
  /** Billing increment in seconds, when the page states one. */
  roundSec?: number
  /** Monthly minimum spend in the platform's currency, when stated. */
  monthlyMin?: number
  note?: string
  /** True when the all-in excludes something we could not price (e.g. LLM "at cost"). */
  partial?: boolean
}

const carrier: Line = { label: 'Phone line (assumed Twilio US outbound)', perMin: CARRIER.perMin }

export const PLATFORMS: Platform[] = [
  {
    id: 'retell',
    name: 'Retell AI',
    url: 'https://www.retellai.com/pricing',
    currency: 'USD',
    model: 'platform',
    stated:
      '$0.07–$0.31 / min; Voice Infra $0.055/min, voices from $0.015/min, LLM per model, telephony $0.015/min',
    covers:
      'Platform (Voice Infra); voice, model and phone line are separate lines on the same bill',
    extra:
      'Add-ons: knowledge base +$0.005/min, denoise +$0.005/min, PII removal +$0.01/min; phone number $2/month',
    low: [
      { label: 'Voice Infra', perMin: 0.055 },
      { label: 'Retell platform voice', perMin: 0.015 },
      { label: 'GPT 5 nano', perMin: 0.0016 },
      carrier,
    ],
    high: [
      { label: 'Voice Infra', perMin: 0.055 },
      { label: 'ElevenLabs Flash voice', perMin: 0.04 },
      { label: 'GPT 4.1', perMin: 0.045 },
      { label: 'Retell telephony', perMin: 0.015 },
    ],
    note: '$10 free credit. Speech-to-speech GPT Realtime 2.1 is listed at $0.38/min. GPT 4.1 appears at both $0.045 and $0.0675/min on the page; we use $0.045.',
  },
  {
    id: 'vapi',
    name: 'Vapi',
    url: 'https://vapi.ai/pricing',
    currency: 'USD',
    model: 'platform',
    stated: '$0.05/min Vapi hosting; providers at cost',
    covers: 'Hosting only',
    extra:
      'Speech-to-text, LLM, voice and carrier at cost (the page gives ranges); Core plan $29/month',
    low: [
      { label: 'Vapi hosting', perMin: 0.05 },
      { label: 'Deepgram STT (page range, low)', perMin: 0.0095 },
      { label: 'OpenAI LLM (page range, low)', perMin: 0.0077 },
      { label: 'ElevenLabs voice (page range, low)', perMin: 0.0146 },
      { label: 'Twilio outbound', perMin: 0.014 },
    ],
    high: [
      { label: 'Vapi hosting', perMin: 0.05 },
      { label: 'Deepgram STT (page range, high)', perMin: 0.0099 },
      { label: 'OpenAI LLM (page range, high)', perMin: 0.0452 },
      { label: 'ElevenLabs voice (page range, high)', perMin: 0.0238 },
      { label: 'Twilio outbound', perMin: 0.014 },
    ],
    note: '$5 free credit. 4 concurrent calls on the free tier.',
  },
  {
    id: 'bland',
    name: 'Bland AI',
    url: 'https://www.bland.ai/pricing',
    currency: 'USD',
    model: 'bundled',
    stated: 'Start $0.14/min ($0 a month); Build $0.12/min ($299 a month)',
    covers: 'Speech-to-text, LLM and voice ("no token charges")',
    extra:
      'Phone line billed separately (your carrier or Bland at pass-through); transfers $0.04–$0.05/min',
    low: [{ label: 'Start plan, talk time', perMin: 0.14 }, carrier],
    high: [{ label: 'Start plan, talk time', perMin: 0.14 }, carrier],
    note: 'Start allows 10 concurrent calls and 100 calls a day.',
  },
  {
    id: 'telnyx',
    name: 'Telnyx AI Assistants',
    url: 'https://telnyx.com/pricing/ai-assistants',
    currency: 'USD',
    model: 'platform',
    stated: '$0.05/min voice engine (orchestration, speech-to-text, voice)',
    covers: 'Orchestration, speech-to-text and voice',
    extra: 'LLM tokens (about $0.006/min for Kimi on Telnyx GPUs), outbound SIP from $0.005/min',
    low: [
      { label: 'Voice engine', perMin: 0.05 },
      { label: 'Kimi on Telnyx (page estimate)', perMin: 0.006 },
      { label: 'Outbound SIP (from)', perMin: 0.005 },
      { label: 'Voice API platform fee on SIP', perMin: 0.002 },
    ],
    high: [
      { label: 'Voice engine', perMin: 0.05 },
      { label: 'Kimi on Telnyx (page estimate)', perMin: 0.006 },
      { label: 'Outbound SIP (from)', perMin: 0.005 },
      { label: 'Voice API platform fee on SIP', perMin: 0.002 },
    ],
    roundSec: 60,
    note: 'Telnyx warns that per-call rounding to 60-second increments raises the engine charge on short calls. OpenAI or Anthropic models bill at their own rates.',
  },
  {
    id: 'ultravox',
    name: 'Ultravox',
    url: 'https://www.ultravox.ai/pricing',
    currency: 'USD',
    model: 'bundled',
    stated: '$0.05 per minute (Pay as you go, $0 a month); SIP 0.5¢/min',
    covers: 'Speech-native model per minute',
    extra: 'SIP fee 0.5¢/min; your carrier',
    low: [{ label: 'Per minute', perMin: 0.05 }, { label: 'Ultravox SIP', perMin: 0.005 }, carrier],
    high: [
      { label: 'Per minute', perMin: 0.05 },
      { label: 'Ultravox SIP', perMin: 0.005 },
      carrier,
    ],
    note: '30 free minutes; pay-as-you-go capped at 5 concurrent calls.',
  },
  {
    id: 'deepgram',
    name: 'Deepgram Voice Agent API',
    url: 'https://deepgram.com/pricing',
    currency: 'USD',
    model: 'bundled',
    stated: 'Standard $0.075/min pay as you go ($0.068 Growth); Advanced $0.163/min',
    covers: '"One rate covering speech-to-text, a managed language model, and text-to-speech"',
    extra: 'Phone line; billed on WebSocket connection time (silence counts)',
    low: [{ label: 'Standard tier', perMin: 0.075 }, carrier],
    high: [{ label: 'Advanced tier', perMin: 0.163 }, carrier],
    note: '$200 free credit.',
  },
  {
    id: 'smallest',
    name: 'Smallest.ai Atoms',
    url: 'https://docs.smallest.ai/atoms/atoms-platform/account/subscription-plans',
    currency: 'USD',
    model: 'bundled',
    stated: '$0.09 to $0.21/min per call, depending on models (hosting fee $0.01/min included)',
    covers: 'Speech-to-text, LLM, voice and hosting (range by model)',
    extra: 'Phone number $10/month or your own carrier at cost',
    low: [{ label: 'Per call minute (low models)', perMin: 0.09 }, carrier],
    high: [{ label: 'Per call minute (high models)', perMin: 0.21 }, carrier],
    note: '$10 free credit; enterprise "as low as $0.05/min".',
  },
  {
    id: 'air',
    name: 'Air.ai',
    url: 'https://support.air.ai/air/what-is-your-pricing-model',
    currency: 'USD',
    model: 'bundled',
    stated: 'Outbound $0.11/min (dial time and talk time); inbound $0.32/min',
    covers: 'The agent; outbound bills dial time as well as talk time',
    extra: 'Phone line through your own Twilio account',
    low: [{ label: 'Outbound, dial + talk', perMin: 0.11 }, carrier],
    high: [{ label: 'Outbound, dial + talk', perMin: 0.11 }, carrier],
    partial: true,
    note: 'Read on Air.ai’s undated help page, which says outbound is moving to a rate that includes dial time; inbound is $0.32/min. Air AI settled FTC deceptive-marketing charges in March 2026. Not ranked.',
  },
  {
    id: 'aircall',
    name: 'Aircall AI Voice Agent',
    url: 'https://aircall.io/en/pricing/',
    currency: 'USD',
    model: 'bundled',
    stated: '$0.29/min pay as you go, $99 per month minimum; custom from 50,000 minutes',
    covers: 'Not itemised on the page',
    extra: 'Inside Aircall’s phone system (seat plans from $30 a licence a month)',
    low: [{ label: 'Pay as you go', perMin: 0.29 }],
    high: [{ label: 'Pay as you go', perMin: 0.29 }],
    monthlyMin: 99,
    note: 'Aircall’s own blog table shows $0.49/min up to 2,500 minutes; we use the pricing page.',
  },
  {
    id: 'gemini-live',
    name: 'Gemini 3.1 Flash Live (raw model)',
    url: 'https://ai.google.dev/gemini-api/docs/pricing',
    currency: 'USD',
    model: 'raw',
    stated: 'Audio in $0.005/min, audio out $0.018/min (preview)',
    covers: 'The speech-to-speech model only',
    extra: 'Your own hosting, orchestration and phone line',
    low: [{ label: 'Audio in + out (if both run the full minute)', perMin: 0.023 }, carrier],
    high: [{ label: 'Audio in + out (if both run the full minute)', perMin: 0.023 }, carrier],
    partial: true,
    note: 'Preview model. Excludes the servers and engineering you need to run it.',
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs Agents',
    url: 'https://elevenlabs.io/pricing/agents',
    currency: 'USD',
    model: 'plan',
    stated:
      'Pro $99 a month for 1,238 minutes; Business $990 for 12,375 minutes; LLM "varies by model", telephony "at cost"',
    covers: 'Agent call minutes (about $0.08 each on the Pro plan)',
    extra: 'LLM billed by usage; telephony at cost',
    low: [{ label: 'Pro plan, $99 ÷ 1,238 min', perMin: 0.08 }, carrier],
    high: [{ label: 'Pro plan, $99 ÷ 1,238 min', perMin: 0.08 }, carrier],
    partial: true,
    note: 'The page’s rate table did not let us confirm the price of minutes beyond the plan; LLM cost not included.',
  },
  {
    id: 'bolna',
    name: 'Bolna',
    url: 'https://www.bolna.ai/pricing',
    currency: 'INR',
    model: 'bundled',
    stated:
      'From ₹5.52 per minute (6¢); down to ₹4.6 (5¢) with larger top-ups; enterprise as low as ₹1.5',
    covers:
      '"Everything is included": speech-to-text, LLM, voice, telephony, platform fee (with Bolna’s bundled models)',
    extra:
      'The page’s FAQ also says "Telephony and the platform fee are added per minute"; ask which applies',
    low: [{ label: 'Larger top-ups', perMin: 4.6 }],
    high: [{ label: 'Pay as you go', perMin: 5.52 }],
    note: '$5 free credit. A one-time Pilot pack is listed at ₹3.83–₹4.25 a minute ($300 or $500).',
  },
  {
    id: 'sarvam',
    name: 'Sarvam AI Voice Agents',
    url: 'https://www.sarvam.ai/products/voice-agents/pricing',
    currency: 'INR',
    model: 'bundled',
    stated:
      '₹3.50 per minute pay as you go (60-second pulses), excluding GST; Sarvam telephony ₹0.20 per 30-second pulse',
    covers: 'Speech, language and voice models',
    extra:
      'Telephony on a Sarvam number ₹0.20 per 30 s (₹0.40 a minute); number ₹59 per 30 days; GST',
    low: [
      { label: 'Agent minute (pay as you go)', perMin: 3.5 },
      { label: 'Sarvam telephony, 2 × 30 s pulses', perMin: 0.4 },
    ],
    high: [
      { label: 'Agent minute (pay as you go)', perMin: 3.5 },
      { label: 'Sarvam telephony, 2 × 30 s pulses', perMin: 0.4 },
    ],
    roundSec: 60,
    note: 'Lower plan rates: ₹3.25 Pro, ₹3.15 Growth (₹49,999 monthly minimum, returned as credits), ₹3.00 Business. The page says unanswered, busy or failed calls are not charged.',
  },
  {
    id: 'twilio-cr',
    name: 'Twilio ConversationRelay',
    url: 'https://twilio.com/en-us/products/conversational-ai/pricing',
    currency: 'USD',
    model: 'raw',
    stated: '$0.07 / minute; "Voice costs are calculated separately"',
    covers: 'The relay between the call and your app',
    extra: 'Voice minutes and your own LLM',
    low: [],
    high: [],
    partial: true,
  },
  {
    id: 'openai-realtime',
    name: 'OpenAI Realtime API',
    url: 'https://developers.openai.com/api/docs/pricing',
    currency: 'USD',
    model: 'raw',
    stated: 'gpt-realtime-2.1: $32 in / $64 out per 1M audio tokens; mini: $10 / $20',
    covers: 'The speech-to-speech model, billed by tokens',
    extra: 'Hosting and phone line',
    low: [],
    high: [],
    partial: true,
    note: 'Retell resells GPT Realtime 2.1 at $0.38/min and GPT Realtime mini at $0.07/min.',
  },
  {
    id: 'synthflow',
    name: 'Synthflow',
    url: 'https://synthflow.ai/pricing',
    currency: 'USD',
    model: 'quote',
    stated: 'No published price: annual agreement, "no rate by the minute", no free plan',
    covers: 'Voices and transcription included, per the page',
    extra: 'Quote only',
    low: [],
    high: [],
  },
]

/** Tough Tongue AI (our product): plan prices as written on toughtongueai.com/pricing, 21 Nov 2026. */
export const TTAI_PLANS = [
  { name: 'Starter', fee: 20, included: 150, extra: 0.1333 },
  { name: 'Pro', fee: 99, included: 900, extra: 0.11 },
  { name: 'Business', fee: 299, included: 2990, extra: 0.1 },
  { name: 'Growth', fee: 499, included: 6000, extra: 0.0832 },
  { name: 'Momentum', fee: 999, included: 13000, extra: 0.0768 },
]
export const TTAI_PRICING_URL = 'https://www.toughtongueai.com/pricing'

// ---------- maths ----------

export const sum = (lines: Line[]) => lines.reduce((a, l) => a + l.perMin, 0)
export const r4 = (n: number) => Math.round(n * 10000) / 10000

export function allIn(p: Platform): { low: number; high: number } | null {
  if (!p.low.length) return null
  return { low: r4(sum(p.low)), high: r4(sum(p.high)) }
}

export const toUsd = (n: number, cur: 'USD' | 'INR', inrPerUsd = FX.inrPerUsd) =>
  cur === 'USD' ? n : n / inrPerUsd
export const toInr = (n: number, cur: 'USD' | 'INR', inrPerUsd = FX.inrPerUsd) =>
  cur === 'INR' ? n : n * inrPerUsd

/** Billed minutes for one call of `min` minutes on a platform that rounds up to `roundSec`. */
export function billedMinutes(min: number, roundSec?: number) {
  if (!roundSec || min <= 0) return Math.max(0, min)
  const sec = Math.ceil((min * 60) / roundSec - 1e-9) * roundSec
  return sec / 60
}

export type CalcInput = {
  calls: number // connected calls a month
  minutes: number // average minutes per call
  inrPerUsd: number
  gst: boolean // add 18% GST to INR-priced platforms (prices shown ex-GST)
}

export type CalcRow = {
  id: string
  name: string
  currency: 'USD' | 'INR'
  lowNative: number
  highNative: number
  lowUsd: number
  highUsd: number
  perCallUsd: number
  billedMin: number
  partial?: boolean
}

export function monthly(p: Platform, i: CalcInput): CalcRow | null {
  const a = allIn(p)
  if (!a) return null
  const perCall = billedMinutes(i.minutes, p.roundSec)
  const mins = perCall * i.calls
  const tax = p.currency === 'INR' && i.gst ? 1 + GST_RATE : 1
  let low = a.low * mins * tax
  let high = a.high * mins * tax
  if (p.monthlyMin) {
    low = Math.max(low, p.monthlyMin)
    high = Math.max(high, p.monthlyMin)
  }
  const lowUsd = toUsd(low, p.currency, i.inrPerUsd)
  const highUsd = toUsd(high, p.currency, i.inrPerUsd)
  return {
    id: p.id,
    name: p.name,
    currency: p.currency,
    lowNative: low,
    highNative: high,
    lowUsd,
    highUsd,
    perCallUsd: i.calls > 0 ? highUsd / i.calls : 0,
    billedMin: mins,
    partial: p.partial,
  }
}

/** Cheapest Tough Tongue AI plan for a number of minutes (fee + overage). */
export function ttaiBest(minutes: number) {
  return TTAI_PLANS.map((p) => ({
    plan: p.name,
    cost: p.fee + Math.max(0, minutes - p.included) * p.extra,
  })).reduce((a, b) => (b.cost < a.cost ? b : a))
}

export const money = (n: number, cur: 'USD' | 'INR', d?: number) => {
  const digits = d ?? (n < 1 ? 3 : n < 100 ? 2 : 0)
  const s = n.toLocaleString(cur === 'INR' ? 'en-IN' : 'en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })
  return cur === 'INR' ? `₹${s}` : `$${s}`
}

/** Per-minute display that keeps half cents (0.0045 stays 0.0045). */
export const perMin = (n: number, cur: 'USD' | 'INR') =>
  cur === 'INR' ? `₹${n.toFixed(2)}` : `$${n.toFixed(3)}`

export const WORKED: CalcInput = { calls: 1000, minutes: 3, inrPerUsd: FX.inrPerUsd, gst: false }

export const PRICED = PLATFORMS.filter((p) => allIn(p) && !p.partial)

export const COUNTS = {
  platforms: PLATFORMS.length,
  priced: PRICED.length,
  quoteOnly: PLATFORMS.filter((p) => p.model === 'quote').length,
  partial: PLATFORMS.filter((p) => p.partial).length,
  inr: PLATFORMS.filter((p) => p.currency === 'INR').length,
}
