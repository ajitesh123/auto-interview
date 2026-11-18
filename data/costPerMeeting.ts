import { ALL_IN, costBreakdown, DEFAULTS } from '@/data/voiceAiPricing'

// Cost per meeting: AI agent per-minute usage vs human callers. Pure maths over the reader's
// own numbers; every per-minute preset comes from data/voiceAiPricing.ts (vendor pages).

export const DIY = Math.round(costBreakdown(DEFAULTS).total * 10000) / 10000

/** Per-minute presets, all from data/voiceAiPricing.ts (vendor pages, checked there). */
export const RATE_PRESETS = [
  { label: `List-price parts, self-hosted ($${DIY})`, rate: DIY },
  ...ALL_IN.map((a) => ({
    label: `${a.name.replace(' (our product)', ' (ours)')} ($${a.perMin})`,
    rate: a.perMin,
  })),
]

export type Key = 'dials' | 'connect' | 'mins' | 'meetings' | 'rate' | 'human' | 'perDay' | 'days'

export const FIELDS: {
  key: Key
  label: string
  hint: string
  min: number
  max: number
  step: string
}[] = [
  {
    key: 'dials',
    label: 'Dials per month',
    hint: 'From your dialer',
    min: 1,
    max: 1000000,
    step: '100',
  },
  {
    key: 'connect',
    label: 'Connect rate, %',
    hint: 'Calls a person answers',
    min: 0,
    max: 100,
    step: 'any',
  },
  {
    key: 'mins',
    label: 'Minutes per connected call',
    hint: 'Average talk time',
    min: 0.1,
    max: 60,
    step: 'any',
  },
  {
    key: 'meetings',
    label: 'Meetings per 100 connects',
    hint: 'Booked, not held',
    min: 0,
    max: 100,
    step: 'any',
  },
  {
    key: 'rate',
    label: 'AI cost per minute, $',
    hint: 'Pick a preset or type',
    min: 0,
    max: 5,
    step: 'any',
  },
  {
    key: 'human',
    label: 'Cost of one caller per month, $',
    hint: 'Salary + tools + manager share',
    min: 0,
    max: 100000,
    step: '100',
  },
  {
    key: 'perDay',
    label: 'Dials per caller per day',
    hint: 'From your team’s logs',
    min: 1,
    max: 1000,
    step: '5',
  },
  { key: 'days', label: 'Working days per month', hint: '', min: 1, max: 31, step: '1' },
]

export const EXAMPLE: Record<Key, number> = {
  dials: 10000,
  connect: 10,
  mins: 2,
  meetings: 3,
  rate: DIY,
  human: 4000,
  perDay: 60,
  days: 21,
}

export function costPerMeeting(v: Record<Key, number>) {
  const connects = v.dials * (v.connect / 100)
  const minutes = connects * v.mins
  const meetings = connects * (v.meetings / 100)
  const aiCost = minutes * v.rate
  const callers = Math.ceil(v.dials / (v.perDay * v.days))
  const humanCost = callers * v.human
  return {
    connects,
    minutes,
    meetings,
    aiCost,
    callers,
    humanCost,
    aiPerMeeting: meetings > 0 ? aiCost / meetings : null,
    humanPerMeeting: meetings > 0 ? humanCost / meetings : null,
  }
}
