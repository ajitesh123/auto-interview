'use client'

// No-AI letter checker: plain string rules run in the browser. Nothing is sent anywhere.

import { useMemo, useState } from 'react'

const CLICHES = [
  'i am writing to express',
  'i am writing to apply',
  'esteemed organisation',
  'esteemed organization',
  'respected sir',
  'dear sir/madam',
  'dear sir or madam',
  'to whom it may concern',
  'passionate',
  'team player',
  'quick learner',
  'hard-working',
  'hardworking',
  'detail-oriented',
  'perfect fit',
  'add value',
  'go-getter',
  'i look forward to hearing from you',
  'yours faithfully',
]

const norm = (s: string) => s.toLowerCase().replace(/[’']/g, "'").replace(/\s+/g, ' ')

function hasTerm(text: string, term: string) {
  const t = term.toLowerCase()
  if (t === 'a/b test') return /\ba\/?b[ -]?test/.test(text)
  if (t === 'experiment') return /\bexperiment/.test(text)
  if (t === 'stakeholder') return /\bstakeholder/.test(text)
  if (t === 'dashboard') return /\bdashboard/.test(text)
  if (t === 'cohort') return /\bcohort/.test(text)
  if (t === 'forecast') return /\bforecast/.test(text)
  if (t === 'statistics') return /\bstatistic/.test(text)
  const esc = t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return new RegExp(`(^|[^a-z])${esc}([^a-z]|$)`).test(text)
}

type Check = { ok: boolean; title: string; detail: string }

export function LetterChecker({ terms }: { terms: string[] }) {
  const [letter, setLetter] = useState('')
  const [post, setPost] = useState('')
  const [company, setCompany] = useState('')

  const result = useMemo(() => {
    const raw = letter.trim()
    if (!raw) return null
    const t = norm(raw)
    // Body only: drop a short greeting line at the top and short sign-off/contact lines at the end.
    const lines = raw.split(/\n/)
    const isShort = (l: string) => l.trim().split(/\s+/).filter(Boolean).length < 8
    let a = 0
    let b = lines.length
    while (a < b && isShort(lines[a])) a++
    while (b > a && isShort(lines[b - 1])) b--
    const body = lines.slice(a, b).join('\n')
    const words = (body.match(/\S+/g) ?? []).length
    const long = (p: string) => p.trim().split(/\s+/).length >= 8
    let paras = body.split(/\n\s*\n/).filter(long).length
    if (paras <= 1) paras = body.split(/\n/).filter(long).length
    // Numbers in the body, ignoring years, phone numbers, emails and long ID-like digit runs.
    const bodyNoContact = body
      .split(/\n/)
      .filter((l) => !l.includes('@') && !/\+?\d[\d\s-]{8,}\d/.test(l))
      .join('\n')
    const numMatches: string[] =
      bodyNoContact.match(/(₹|\$|£|€)?\d[\d,.]*\s?(%|k|K|M|L|lakh|crore|x|×)?/g) ?? []
    const numbers = numMatches
      .map((n) => n.trim().replace(/[,.]$/, ''))
      .filter((n) => !/^(19|20)\d\d$/.test(n) && !/^\d{5,}$/.test(n)).length
    const cliches = CLICHES.filter((c) => t.includes(c))
    const pt = norm(post)
    const wanted = post.trim() ? terms.filter((x) => hasTerm(pt, x)) : []
    const used = wanted.filter((x) => hasTerm(t, x))
    const missing = wanted.filter((x) => !hasTerm(t, x))
    const ctc = /\b(ctc|lpa|expected salary|current salary|salary expectation)/.test(t)
    const named = company.trim() ? t.includes(norm(company.trim())) : null

    const checks: Check[] = [
      {
        ok: words >= 250 && words <= 400,
        title: `${words} words`,
        detail:
          words < 200
            ? 'Short. Add the analysis story: question, data, method, decision, number.'
            : words < 250
              ? 'A little short. Add one line of proof for a tool the post asks for.'
              : words > 400
                ? 'Long. Hiring managers in one survey preferred about 400 words; cut the skills list first.'
                : 'In range (aim for 250–350; greeting and sign-off not counted).',
      },
      {
        ok: paras >= 3 && paras <= 5,
        title: `${paras} paragraph${paras === 1 ? '' : 's'}`,
        detail:
          paras >= 3 && paras <= 5
            ? 'Good: one job per paragraph.'
            : 'Aim for 4 short paragraphs. Leave a blank line between them.',
      },
      {
        ok: numbers >= 3,
        title: `${numbers} number${numbers === 1 ? '' : 's'}`,
        detail:
          numbers >= 3
            ? 'Good: scale, change and time make the story real.'
            : 'Add at least 3: how much data, what moved, how fast.',
      },
      {
        ok: cliches.length === 0,
        title: cliches.length
          ? `${cliches.length} stock phrase${cliches.length === 1 ? '' : 's'}`
          : 'No stock phrases',
        detail: cliches.length
          ? `Replace: ${cliches.map((c) => `“${c}”`).join(', ')}.`
          : 'Nothing that reads as copied.',
      },
    ]
    if (named !== null)
      checks.push({
        ok: named,
        title: named ? 'Company named' : 'Company not named',
        detail: named
          ? 'The letter is clearly for them.'
          : `“${company.trim()}” does not appear. Name the company and the team.`,
      })
    if (post.trim())
      checks.push({
        ok: wanted.length > 0 && used.length >= Math.min(2, wanted.length),
        title: `${used.length} of ${wanted.length} words from the post`,
        detail: wanted.length
          ? missing.length
            ? `The post asks for ${missing.join(', ')}. Tie two or three of these to one line of proof each.`
            : 'You cover what the post asks for.'
          : 'We found none of our tool words in the post. Mirror its exact words by hand.',
      })
    checks.push({
      ok: !ctc,
      title: ctc ? 'Mentions salary or CTC' : 'No salary talk',
      detail: ctc
        ? 'Leave CTC out unless the post asks for it in the letter.'
        : 'Good: pay comes later.',
    })
    return { checks, passed: checks.filter((c) => c.ok).length }
  }, [letter, post, company, terms])

  const field =
    'w-full rounded-lg border border-border-input bg-surface px-3.5 py-3 text-small text-fg placeholder:text-fg-3 focus:border-signal focus:outline-none'
  return (
    <div className="grid gap-5 lg:grid-cols-[1.15fr_1fr]">
      <div className="space-y-3">
        <label className="block">
          <span className="text-small font-medium text-fg">Your letter</span>
          <textarea
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
            rows={11}
            placeholder="Paste your cover letter. Leave a blank line between paragraphs."
            className={`${field} mt-1.5 leading-relaxed`}
          />
        </label>
        <div className="grid gap-3 sm:grid-cols-[1fr_1.4fr]">
          <label className="block">
            <span className="text-small font-medium text-fg">Company name (optional)</span>
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Northwind Retail"
              className={`${field} mt-1.5 h-11 py-0`}
            />
          </label>
          <label className="block">
            <span className="text-small font-medium text-fg">Job post text (optional)</span>
            <textarea
              value={post}
              onChange={(e) => setPost(e.target.value)}
              rows={2}
              placeholder="Paste the requirements to check tool words"
              className={`${field} mt-1.5`}
            />
          </label>
        </div>
        <p className="text-caption text-fg-3">
          Runs in your browser with fixed rules. Nothing is sent or saved.
        </p>
      </div>
      <div aria-live="polite" className="rounded-xl border border-border bg-surface p-5">
        {!result ? (
          <div className="text-small leading-relaxed text-fg-2">
            <div className="font-mono text-kicker uppercase tracking-[0.08em] text-fg-3">
              Waiting for a letter
            </div>
            <p className="mt-2">
              Paste a draft to check length, paragraphs, numbers, stock phrases, the company name
              and the tools the post asks for. Try the “before” letter above to see what it catches.
            </p>
          </div>
        ) : (
          <>
            <div className="font-mono text-kicker uppercase tracking-[0.08em] text-fg-3">
              {result.passed} of {result.checks.length} checks passed
            </div>
            <ul className="mt-3 space-y-3">
              {result.checks.map((c) => (
                <li key={c.title} className="relative flex gap-3">
                  <span
                    aria-hidden="true"
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
                      c.ok
                        ? 'bg-signal text-white'
                        : 'bg-muted text-fg-2 ring-1 ring-inset ring-border-strong'
                    }`}
                  >
                    {c.ok ? '✓' : '!'}
                  </span>
                  <div>
                    <div className="text-small font-semibold text-fg">
                      <span className="sr-only">{c.ok ? 'Pass: ' : 'Fix: '}</span>
                      {c.title}
                    </div>
                    <div className="text-small leading-relaxed text-fg-2">{c.detail}</div>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  )
}
