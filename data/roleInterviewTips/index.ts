import type { RoleInterviewTips, RoundType } from './types'
import PRODUCT_MANAGER_TIPS from './product-manager'

/** Interview tips pages, keyed by role hub slug. Route: /<slug>/interview-tips */
export const ROLE_INTERVIEW_TIPS: Record<string, RoleInterviewTips> = {
  'product-manager': PRODUCT_MANAGER_TIPS,
}

export const interviewTipsPath = (slug: string) => `/${slug}/interview-tips`

export const ROUND_LABELS: Record<RoundType, string> = {
  recruiter: 'Recruiter screen',
  screen: 'PM / hiring-manager screen',
  written: 'Take-home or writing',
  'product-sense': 'Product sense',
  analytics: 'Analytics / execution',
  strategy: 'Strategy / estimation',
  technical: 'Technical / AI build',
  behavioural: 'Behavioural',
  final: 'Final / bar raiser',
}

/** Every count shown on the page, computed from the mapped loops. */
export function tipStats(t: RoleInterviewTips) {
  const full = t.loops.filter((l) => !l.partial)
  const sizes = full.map((l) => l.rounds.length).sort((a, b) => a - b)
  const mid = Math.floor(sizes.length / 2)
  const med = sizes.length % 2 ? sizes[mid] : (sizes[mid - 1] + sizes[mid]) / 2
  const types = Object.keys(ROUND_LABELS) as RoundType[]
  const share = types.map((type) => ({
    type,
    label: ROUND_LABELS[type],
    loops: full.filter((l) => l.rounds.some((r) => r.type === type || r.also?.includes(type)))
      .length,
  }))
  const companies = new Set(t.loops.map((l) => l.company))
  const dated = t.loops
    .filter((l) => l.kind === 'reported' && l.date)
    .sort((a, b) => (b.date as string).localeCompare(a.date as string))
  const MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const newest = dated[0]
  const newestLabel = newest
    ? `${MONTHS[Number(newest.date!.slice(5, 7)) - 1]} ${newest.date!.slice(0, 4)}`
    : 'UNKNOWN'
  return {
    nLoops: t.loops.length,
    nFull: full.length,
    nOfficial: t.loops.filter((l) => l.kind === 'official').length,
    nReported: t.loops.filter((l) => l.kind === 'reported').length,
    nCompanies: companies.size,
    companies: [...companies],
    minRounds: sizes[0],
    maxRounds: sizes[sizes.length - 1],
    medRounds: med,
    share,
    newest,
    newestLabel,
    nQuotes: t.rounds.reduce((n, r) => n + r.evidence.length, 0),
  }
}

/** Fills {nLoops} {nFull} {nCompanies} {minRounds} {maxRounds} {medRounds} in page text. */
export function fillTips(t: RoleInterviewTips, text: string) {
  const s = tipStats(t)
  const vals: Record<string, string> = {
    nLoops: String(s.nLoops),
    nFull: String(s.nFull),
    nCompanies: String(s.nCompanies),
    minRounds: String(s.minRounds),
    maxRounds: String(s.maxRounds),
    medRounds: String(s.medRounds),
  }
  return text.replace(/\{(\w+)\}/g, (all, k) => vals[k] ?? all)
}

export type { RoleInterviewTips, TipRound, Loop, RoundType } from './types'
