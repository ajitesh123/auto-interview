'use client'

// Small, no-AI client tools for resume and recommendation pages. All text is server-rendered;
// these only copy, compare or print it.

import { useMemo, useState } from 'react'
import type { ResumeKit } from '@/data/roleKits/types'

export function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [done, setDone] = useState(false)
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text)
          setDone(true)
          setTimeout(() => setDone(false), 1800)
        } catch {
          /* clipboard blocked: the text is on the page to select by hand */
        }
      }}
      className="inline-flex h-9 shrink-0 items-center rounded-full bg-surface px-3.5 text-caption font-semibold text-fg ring-1 ring-inset ring-border-strong transition-colors duration-fast hover:bg-muted"
      aria-live="polite"
    >
      {done ? 'Copied' : label}
    </button>
  )
}

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9+#./ ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

/** A term counts as present if its main words appear in the pasted text (plain string matching, no AI). */
function hasTerm(text: string, term: string) {
  const t = norm(term.replace(/\(.*?\)/g, ''))
  if (!t) return false
  if (text.includes(t)) return true
  const words = t
    .split(' ')
    .filter((w) => w.length > 2 && !['and', 'the', 'for', 'with'].includes(w))
  if (!words.length) return false
  return words.every((w) => text.includes(w.replace(/s$/, '')))
}

export function KeywordChecker({
  groups,
  roleName,
}: {
  groups: ResumeKit['keywords']
  roleName: string
}) {
  const [text, setText] = useState('')
  const result = useMemo(() => {
    const t = norm(text)
    if (t.length < 40) return null
    return groups.map((g) => ({
      group: g.group,
      terms: g.terms.map((term) => ({ term, hit: hasTerm(t, term) })),
    }))
  }, [text, groups])
  const total = groups.reduce((n, g) => n + g.terms.length, 0)
  const hits = result ? result.reduce((n, g) => n + g.terms.filter((x) => x.hit).length, 0) : 0

  return (
    <div className="rounded-2xl border border-border bg-surface p-5 md:p-6">
      <label htmlFor="resume-text" className="text-h4 font-semibold text-fg">
        Check your resume against these keywords
      </label>
      <p className="mt-1 text-small text-fg-2">
        Paste your resume text. It stays in your browser; nothing is uploaded.
      </p>
      <textarea
        id="resume-text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        placeholder={`Paste your ${roleName} resume here…`}
        className="mt-3 w-full rounded-xl border border-border-input bg-bg p-3 text-small text-fg placeholder:text-fg-3 focus:border-signal focus:outline-none"
      />
      {result && (
        <div className="mt-4 space-y-4" aria-live="polite">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-small font-semibold text-fg">
              {hits} of {total} keywords found
            </span>
            <span className="text-caption text-fg-3">
              Only add terms you can back up in a bullet.
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-signal"
              style={{ width: `${(hits / total) * 100}%` }}
            />
          </div>
          {result.map((g) => (
            <div key={g.group}>
              <div className="text-caption font-medium text-fg-3">{g.group}</div>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {g.terms.map((x) => (
                  <span
                    key={x.term}
                    className={`inline-flex min-h-7 items-center gap-1 rounded-full px-2.5 py-1 text-caption font-medium leading-snug ${
                      x.hit ? 'bg-signal-tint text-signal-ink' : 'bg-muted text-fg-2'
                    }`}
                  >
                    <span aria-hidden="true">{x.hit ? '✓' : '+'}</span>
                    <span className="sr-only">{x.hit ? 'found:' : 'missing:'}</span>
                    {x.term}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Opens the sample resume as a clean one-page document and triggers Print / Save as PDF. */
export function PrintSampleButton({
  sample,
  title,
}: {
  sample: ResumeKit['sample']
  title: string
}) {
  return (
    <button
      type="button"
      onClick={() => {
        const w = window.open('', '_blank', 'noopener=no')
        if (!w) return
        const exp = sample.experience
          .map(
            (e) =>
              `<div class="job"><div class="row"><b>${esc(e.role)}</b>, ${esc(e.org)}<span>${esc(e.dates)}</span></div><ul>${e.bullets
                .map((b) => `<li>${esc(b)}</li>`)
                .join('')}</ul></div>`
          )
          .join('')
        const proj = sample.projects?.length
          ? `<h2>Projects</h2><ul>${sample.projects.map((p) => `<li><b>${esc(p.name)}</b>: ${esc(p.line)}</li>`).join('')}</ul>`
          : ''
        w.document.write(
          `<!doctype html><html><head><meta charset="utf-8"><title>${esc(title)}</title>
<style>body{font:11pt/1.45 Arial,Helvetica,sans-serif;color:#171717;max-width:7.5in;margin:.5in auto;padding:0 .25in}
h1{font-size:18pt;margin:0}.meta{color:#525252;margin:.2em 0 1em}h2{font-size:10.5pt;text-transform:uppercase;letter-spacing:.06em;border-bottom:1px solid #d4d4d4;padding-bottom:2px;margin:1.1em 0 .5em}
.row{display:flex;justify-content:space-between;gap:1em}.row span{color:#525252}ul{margin:.3em 0 .7em 1.1em;padding:0}li{margin:.15em 0}p{margin:.2em 0}
@media print{body{margin:0 auto}}</style></head><body>
<h1>${esc(sample.name.replace(/\s*\(sample\)/i, ''))}</h1><div class="meta">${esc(sample.headline)} · ${esc(sample.contact)}</div>
<h2>Summary</h2><p>${esc(sample.summary)}</p><h2>Experience</h2>${exp}${proj}
<h2>Skills</h2><p>${sample.skills.map(esc).join(' · ')}</p><h2>Education</h2><p>${esc(sample.education)}</p>
<scr` +
            `ipt>window.onload=function(){window.print()}</scr` +
            `ipt></body></html>`
        )
        w.document.close()
      }}
      className="inline-flex h-10 items-center rounded-full bg-fg px-4 text-small font-semibold text-bg transition-colors duration-fast hover:bg-fg/90"
    >
      Print or save as PDF
    </button>
  )
}
