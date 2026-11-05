// Helpers shared by the server template and client islands (never import from a 'use client' file).

/** "Why us? (Asked at Stupa, per Glassdoor)" -> { text: "Why us?", askedAt: "Stupa", via: "Glassdoor" } */
export function splitAsked(q: string) {
  const m = q.match(/\s*\(Asked at ([^,)]+),\s*per ([^)]+)\)\s*$/)
  if (!m) return { text: q }
  return { text: q.slice(0, m.index).trim(), askedAt: m[1].trim(), via: m[2].trim() }
}

/**
 * Turn a "what the interviewer is listening for" sentence into 2–5 tickable criteria.
 * "A clear narrative, one concrete AI result with a number, and a reason for this role."
 * -> ["A clear narrative", "One concrete AI result with a number", "A reason for this role"]
 * Fragments starting with "not", "including", "especially" or "even" stay attached to the previous item.
 */
export function toCriteria(lookFor?: string, explicit?: string[]): string[] {
  if (explicit?.length) return explicit
  if (!lookFor) return []
  const s = lookFor.trim().replace(/\.$/, '')
  // Do not split inside quotes or parentheses
  if (/["“(]/.test(s) && !/,/.test(s.replace(/["“][^"”]*["”]|\([^)]*\)/g, ''))) return [cap(s)]
  const parts = s
    .replace(/,\s*and\s+/g, ', ')
    .split(/,\s+/)
    .flatMap((p, i, arr) =>
      i === arr.length - 1 && arr.length === 1 ? p.split(/\s+and\s+(?=[a-z])/i) : [p]
    )
  const out: string[] = []
  for (const p of parts) {
    const t = p.trim()
    if (!t) continue
    if (
      out.length &&
      /^(not|including|especially|even|rather|without|with|while|so|because|then)\b/i.test(t)
    ) {
      out[out.length - 1] += `, ${t}`
    } else out.push(cap(t))
  }
  // Splits that read badly fall back to one criterion: a one-word item, "a calm", a pronoun start,
  // or a short gerund phrase whose object continues in the next item ("separating retrieval, generation ...").
  const awkward = out.some(
    (t, i) =>
      t.split(/\s+/).length < 2 ||
      /^(a|an)\s+\w+$/i.test(t) ||
      (i > 0 && /^(it|its|their|they|them)\b/i.test(t)) ||
      (i === 0 && /^\w+ing\s+\w+$/i.test(t) && out.length > 1)
  )
  return !awkward && out.length >= 2 && out.length <= 6 ? out : [cap(s)]
}
const cap = (t: string) => t.charAt(0).toUpperCase() + t.slice(1)
