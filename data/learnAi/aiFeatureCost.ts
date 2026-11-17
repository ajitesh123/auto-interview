// AI feature cost: list prices per 1M tokens, opened 17 Nov 2026.
// Anthropic: https://platform.claude.com/docs/en/about-claude/pricing (base input / output columns;
//   Haiku 5.5 price is for prompts up to 100,000 tokens).
// OpenAI: https://developers.openai.com/api/docs/pricing (Standard tier, text, short context
//   <= 272K input tokens for the gpt-6 rows; gpt-5.4 rows have no context condition).
// No caching, batch or regional discounts or surcharges. Used by the lesson
// /learn-ai/ai-product-management (worked example, chart and the cost calculator widget).

export interface PricedModel {
  id: string
  name: string
  maker: 'Anthropic' | 'OpenAI'
  inPerM: number // USD per 1M input tokens
  outPerM: number // USD per 1M output tokens
  note?: string
  /** Higher price per request once the prompt is over `over` input tokens (Haiku 5.5) */
  long?: { over: number; inPerM: number; outPerM: number }
  /** Price shown only up to this many input tokens a request (OpenAI short context) */
  maxIn?: number
  url: string
}

export const PRICE_CHECKED = '17 Nov 2026'

const ANTHROPIC = 'https://platform.claude.com/docs/en/about-claude/pricing'
const OPENAI = 'https://developers.openai.com/api/docs/pricing'

export const PRICED_MODELS: PricedModel[] = [
  {
    id: 'claude-haiku-5-5',
    name: 'Claude Haiku 5.5',
    maker: 'Anthropic',
    inPerM: 0.1,
    outPerM: 0.5,
    note: 'prompts up to 100,000 tokens',
    long: { over: 100_000, inPerM: 0.5, outPerM: 2.5 },
    url: ANTHROPIC,
  },
  {
    id: 'claude-sonnet-5-5',
    name: 'Claude Sonnet 5.5',
    maker: 'Anthropic',
    inPerM: 2,
    outPerM: 10,
    url: ANTHROPIC,
  },
  {
    id: 'claude-opus-5-5',
    name: 'Claude Opus 5.5',
    maker: 'Anthropic',
    inPerM: 4,
    outPerM: 20,
    url: ANTHROPIC,
  },
  {
    id: 'gpt-6-luna',
    name: 'gpt-6-luna',
    maker: 'OpenAI',
    inPerM: 0.1,
    outPerM: 0.5,
    note: 'short context',
    maxIn: 272_000,
    url: OPENAI,
  },
  {
    id: 'gpt-5-4-nano',
    name: 'gpt-5.4-nano',
    maker: 'OpenAI',
    inPerM: 0.2,
    outPerM: 1.25,
    url: OPENAI,
  },
  {
    id: 'gpt-5-4-mini',
    name: 'gpt-5.4-mini',
    maker: 'OpenAI',
    inPerM: 0.75,
    outPerM: 4.5,
    url: OPENAI,
  },
  {
    id: 'gpt-6-1-terra',
    name: 'gpt-6.1-terra',
    maker: 'OpenAI',
    inPerM: 1,
    outPerM: 5,
    note: 'short context',
    maxIn: 272_000,
    url: OPENAI,
  },
  {
    id: 'gpt-6-1-sol',
    name: 'gpt-6.1-sol',
    maker: 'OpenAI',
    inPerM: 2,
    outPerM: 10,
    note: 'short context',
    maxIn: 272_000,
    url: OPENAI,
  },
]

export interface Usage {
  perDay: number // requests a day
  inTok: number // input tokens per request (instructions + context + user text)
  outTok: number // output tokens per request
  days?: number // days in the month, default 30
}

/** USD for one request */
export const perRequest = (m: PricedModel, u: Usage) => {
  const p = m.long && u.inTok > m.long.over ? m.long : m
  return (u.inTok * p.inPerM + u.outTok * p.outPerM) / 1_000_000
}

/** USD for a month of traffic */
export const perMonth = (m: PricedModel, u: Usage) => perRequest(m, u) * u.perDay * (u.days ?? 30)

/** Round to cents, half up */
export const cents = (usd: number) => Math.round(usd * 100 + 1e-9) / 100

export const fmtUsd = (usd: number) => {
  if (usd === 0) return '$0'
  if (usd < 0.000005) return '<$0.00001'
  if (usd < 0.01) return `$${usd.toFixed(5).replace(/0+$/, '')}`
  return `$${cents(usd).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

/**
 * The lesson's worked example (our own example, not a measured product):
 * refund-ticket triage for a food-delivery app. Each ticket sends the instructions and the refund
 * policy (about 900 tokens) plus the customer's message and order details (about 300), and gets back
 * a short JSON with a category, a suggested action and a two-line reply draft (about 200 tokens).
 */
export const WORKED: Usage = { perDay: 20_000, inTok: 1_200, outTok: 200, days: 30 }

export const workedRows = () =>
  PRICED_MODELS.map((m) => ({ model: m, month: cents(perMonth(m, WORKED)) })).sort(
    (a, b) => a.month - b.month || a.model.name.localeCompare(b.model.name)
  )
