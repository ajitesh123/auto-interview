// Official list prices for the /voice-ai-calling cost calculator and tables.
// Every price was read on the vendor's own pricing page on 2026-11-05. Re-check monthly.
// Pay-as-you-go list prices in USD unless the unit says otherwise. No volume discounts applied.

export const PRICES_CHECKED = '2026-11-05'

export type PriceOption = {
  id: string
  label: string
  /** USD per minute of call (already converted from the vendor's unit where needed) */
  perMin?: number
  /** For TTS priced per 1K characters */
  per1kChars?: number
  /** For LLMs priced per 1M tokens */
  inPer1M?: number
  outPer1M?: number
  stated: string
  source: string
  note?: string
}

export const TELEPHONY: PriceOption[] = [
  {
    id: 'twilio-us-out',
    label: 'Twilio, US outbound (local)',
    perMin: 0.014,
    stated: '$0.0140 / min',
    source: 'https://www.twilio.com/en-us/voice/pricing/us',
    note: 'Inbound to a local number is $0.0085 / min; a local number is $1.15 / mo.',
  },
  {
    id: 'twilio-us-in',
    label: 'Twilio, US inbound (local)',
    perMin: 0.0085,
    stated: '$0.0085 / min',
    source: 'https://www.twilio.com/en-us/voice/pricing/us',
  },
  {
    id: 'plivo-us-out',
    label: 'Plivo, US outbound (local)',
    perMin: 0.0115,
    stated: '$0.0115 / min',
    source: 'https://plivo.com/voice/pricing/us/',
    note: 'Inbound to a local number is $0.0055 / min.',
  },
  {
    id: 'telnyx-us-out',
    label: 'Telnyx, US outbound',
    perMin: 0.007,
    stated: '$0.002 / min Voice API + $0.005 / min SIP (page example)',
    source: 'https://telnyx.com/pricing/voice-api',
    note: 'Telnyx lists the SIP part as an example rate; confirm on its price sheet.',
  },
  {
    id: 'none',
    label: 'No phone line (web call)',
    perMin: 0,
    stated: '$0 carrier cost',
    source: 'https://vapi.ai/pricing',
    note: 'Vapi lists its WebSockets and Daily WebRTC transport as free.',
  },
]

export const STT: PriceOption[] = [
  {
    id: 'deepgram-nova3',
    label: 'Deepgram Nova-3 (streaming)',
    perMin: 0.0077,
    stated: '$0.0077 / min',
    source: 'https://deepgram.com/pricing',
    note: 'Monolingual. Multilingual is $0.0092 / min.',
  },
  {
    id: 'assembly-us',
    label: 'AssemblyAI Universal-Streaming',
    perMin: 0.0025,
    stated: '$0.15 / hour',
    source: 'https://www.assemblyai.com/pricing',
    note: 'Billed on session duration, not only speech.',
  },
]

export const LLM: PriceOption[] = [
  {
    id: 'gemini-38-flash',
    label: 'Google gemini-3.8-flash',
    inPer1M: 0.75,
    outPer1M: 3.75,
    stated: '$0.75 in / $3.75 out per 1M tokens',
    source: 'https://ai.google.dev/gemini-api/docs/pricing',
    note: 'Google lists $1.50 / $7.50 from 1 Jan 2027.',
  },
  {
    id: 'gemini-35-flash-lite',
    label: 'Google gemini-3.5-flash-lite',
    inPer1M: 0.3,
    outPer1M: 2.5,
    stated: '$0.30 in / $2.50 out per 1M tokens',
    source: 'https://ai.google.dev/gemini-api/docs/pricing',
  },
]

export const TTS: PriceOption[] = [
  {
    id: 'elevenlabs-flash',
    label: 'ElevenLabs Flash / Turbo',
    per1kChars: 0.04,
    stated: '$0.04 / 1K characters',
    source: 'https://elevenlabs.io/pricing/api',
    note: 'ElevenLabs states ~75 ms latency for Flash.',
  },
  {
    id: 'deepgram-aura2',
    label: 'Deepgram Aura-2',
    per1kChars: 0.03,
    stated: '$0.030 / 1K characters',
    source: 'https://deepgram.com/pricing',
  },
  {
    id: 'cartesia-scale',
    label: 'Cartesia Sonic (Scale plan)',
    per1kChars: 0.037375,
    stated: '$299 / mo for 8M credits, 1 credit per character',
    source: 'https://cartesia.ai/pricing',
    note: 'Effective rate if you use the whole plan: $299 ÷ 8,000K characters = $0.0374 / 1K.',
  },
]

export const PLATFORM: PriceOption[] = [
  {
    id: 'self',
    label: 'Self-hosted (Pipecat, LiveKit)',
    perMin: 0,
    stated: '$0 platform fee',
    source: 'https://vapi.ai/pricing',
    note: 'Excludes your own servers and engineering time.',
  },
  {
    id: 'vapi',
    label: 'Vapi hosting fee',
    perMin: 0.05,
    stated: '$0.05 / min',
    source: 'https://vapi.ai/pricing',
    note: 'Vapi passes model and carrier costs through at cost, on top of this fee.',
  },
]

/** Cartesia FAQ: "about 750 to 800 credits per minute of audio" (1 credit = 1 character). We use the top of the range. */
export const CHARS_PER_MIN_OF_SPEECH = 800

export const DEFAULTS = {
  telephony: 'twilio-us-out',
  stt: 'deepgram-nova3',
  llm: 'gemini-38-flash',
  tts: 'elevenlabs-flash',
  platform: 'self',
  agentTalkShare: 0.5, // share of the call the agent is speaking (assumption)
  turnsPerMin: 6, // agent replies per minute (assumption: one every ~10 s)
  inputTokensPerTurn: 1500, // system prompt + history sent each turn (assumption)
  outputTokensPerTurn: 40, // ~30 words per reply (assumption)
}

/** All-in vendor prices, per minute, for the comparison table. */
export const ALL_IN = [
  {
    name: 'Retell AI (example stack)',
    perMin: 0.0978,
    how: '$0.055 voice infra + $0.015 Cartesia voice + $0.0128 GPT 4.1 mini + $0.015 telephony',
    source: 'https://www.retellai.com/pricing',
  },
  {
    name: 'Tough Tongue AI (our product), Pro plan',
    perMin: 0.11,
    how: '$99 / mo for 900 minutes; extra minutes $0.11',
    source: 'https://www.toughtongueai.com/pricing',
  },
  {
    name: 'Tough Tongue AI (our product), Enterprise',
    perMin: 0.07,
    how: 'Listed at $0.07 / min on custom plans',
    source: 'https://www.toughtongueai.com/pricing',
  },
]

export function findOpt(list: PriceOption[], id: string) {
  return list.find((o) => o.id === id) ?? list[0]
}

export type CostInputs = typeof DEFAULTS

export function costBreakdown(i: CostInputs) {
  const tel = findOpt(TELEPHONY, i.telephony).perMin ?? 0
  const stt = findOpt(STT, i.stt).perMin ?? 0
  const llmOpt = findOpt(LLM, i.llm)
  const llm =
    (i.turnsPerMin * i.inputTokensPerTurn * (llmOpt.inPer1M ?? 0)) / 1e6 +
    (i.turnsPerMin * i.outputTokensPerTurn * (llmOpt.outPer1M ?? 0)) / 1e6
  const ttsOpt = findOpt(TTS, i.tts)
  const tts = ((CHARS_PER_MIN_OF_SPEECH * i.agentTalkShare) / 1000) * (ttsOpt.per1kChars ?? 0)
  const platform = findOpt(PLATFORM, i.platform).perMin ?? 0
  const total = tel + stt + llm + tts + platform
  return { tel, stt, llm, tts, platform, total }
}

/** Twilio, "A Guide to Core Latency in AI Voice Agents" (17 Nov 2025): median targets. */
export const LATENCY_TWILIO = {
  source:
    'https://www.twilio.com/en-us/blog/developers/best-practices/guide-core-latency-ai-voice-agents',
  stt: 350,
  llm: 375,
  tts: 100,
  platformTurnGap: 885,
  mouthToEar: 1115,
  mouthToEarUpper: 1400,
}

/** Stivers et al. 2009, PNAS: mean response offset across 10 languages. */
export const HUMAN_GAP_MS = 208
export const HUMAN_GAP_SOURCE = 'https://pmc.ncbi.nlm.nih.gov/articles/PMC2705608'
