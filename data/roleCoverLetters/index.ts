import type { CoverLetterKit } from './types'
import { DATA_ANALYST_COVER_LETTER } from './data-analyst'

/** Cover letter kits, keyed by role hub slug. Route: /<slug>/cover-letter */
export const ROLE_COVER_LETTERS: Record<string, CoverLetterKit> = {
  'data-analyst': DATA_ANALYST_COVER_LETTER,
}

export const coverLetterPath = (slug: string) => `/${slug}/cover-letter`

export const wordCount = (s: string) =>
  (s.match(/[A-Za-z0-9₹$%.,'’\-+/]+/g) || []).filter((w) => /[A-Za-z0-9]/.test(w)).length

/** Body words of a sample: paragraphs only (no greeting or sign-off). */
export const letterWords = (paras: { text: string }[]) =>
  paras.reduce((n, p) => n + wordCount(p.text), 0)

/** Fills {n} {required} {requiredWord} {optional} {none} {checked} from the kit's job posts. */
export function fillCounts(kit: CoverLetterKit, text: string) {
  const c = (k: string) => kit.jobPosts.filter((p) => p.coverLetter === k).length
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
  const [y, m, d] = kit.checked.split('-').map(Number)
  const vals: Record<string, string> = {
    n: String(kit.jobPosts.length),
    required: String(c('required')),
    requiredWord: c('required') === 0 ? 'none' : String(c('required')),
    optional: String(c('optional')),
    none: String(c('none')),
    checked: `${d} ${MONTHS[m - 1]} ${y}`,
  }
  return text.replace(/\{(\w+)\}/g, (all, k) => vals[k] ?? all)
}
