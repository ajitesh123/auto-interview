'use client'

import Link from 'next/link'
import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react'
import {
  analyse,
  PRIORITY_LABEL,
  whereToAdd,
  type FormatCheck,
  type KeywordHit,
  type Priority,
} from '@/data/keywordChecker/analyze'
import { CAT_LABEL } from '@/data/keywordChecker/skills'
import { SAMPLES } from '@/data/keywordChecker/samples'

const KEY = 'aiai.keywordChecker.v1'
const MIN_WORDS = 25

const kicker = 'font-mono text-kicker uppercase tracking-[0.08em]'
const words = (s: string) => s.split(/\s+/).filter(Boolean).length

const PRIORITY_CHIP: Record<Priority, string> = {
  must: 'bg-signal-tint text-signal-ink',
  mentioned: 'bg-muted text-fg-2',
  nice: 'bg-surface text-fg-3 ring-1 ring-inset ring-border',
}

const STATUS: Record<FormatCheck['status'], { label: string; cls: string; icon: string }> = {
  pass: { label: 'Pass', cls: 'bg-success-soft text-success-strong', icon: 'M4 8.5 7 11.5 12.5 5' },
  warn: { label: 'Check', cls: 'bg-warn-soft text-warn', icon: 'M8 4.5v4.5M8 11.6v.1' },
  fail: { label: 'Fix', cls: 'bg-danger-soft text-danger', icon: 'M5 5l6 6M11 5l-6 6' },
}

export interface KitLink {
  name: string
  href: string
}

export default function KeywordChecker({ kits }: { kits: KitLink[] }) {
  const [jd, setJd] = useState('')
  const [resume, setResume] = useState('')
  const [sample, setSample] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const loaded = useRef(false)
  const resultsRef = useRef<HTMLDivElement>(null)

  // Drafts stay on this device only.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY)
      if (raw) {
        const d = JSON.parse(raw)
        if (typeof d.jd === 'string') setJd(d.jd)
        if (typeof d.resume === 'string') setResume(d.resume)
      }
    } catch {
      /* storage blocked: start empty */
    }
    loaded.current = true
  }, [])

  useEffect(() => {
    if (!loaded.current) return
    const t = window.setTimeout(() => {
      try {
        window.localStorage.setItem(KEY, JSON.stringify({ jd, resume }))
      } catch {
        /* ignore */
      }
    }, 400)
    return () => window.clearTimeout(t)
  }, [jd, resume])

  const dJd = useDeferredValue(jd)
  const dResume = useDeferredValue(resume)
  const ready = words(dJd) >= MIN_WORDS && words(dResume) >= MIN_WORDS
  const a = useMemo(() => (ready ? analyse(dJd, dResume) : null), [ready, dJd, dResume])

  const kit = sample ? SAMPLES.find((s) => s.id === sample) : null

  function loadSample(id: string) {
    const s = SAMPLES.find((x) => x.id === id)
    if (!s) return
    setJd(s.jd)
    setResume(s.resume)
    setSample(id)
    window.setTimeout(
      () => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
      60
    )
  }

  function clearAll() {
    setJd('')
    setResume('')
    setSample(null)
    try {
      window.localStorage.removeItem(KEY)
    } catch {
      /* ignore */
    }
  }

  async function copyMissing() {
    if (!a) return
    const text = a.missing.map((k) => `${k.name} (${PRIORITY_LABEL[k.priority]})`).join('\n')
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard blocked */
    }
  }

  const field =
    'block h-64 w-full resize-y rounded-xl border border-border-input bg-surface p-4 text-small leading-relaxed text-fg placeholder:text-fg-3 focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/20 md:h-80'

  return (
    <div>
      {/* ---------- Samples ---------- */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 text-small text-fg-2">No resume handy? Try a sample:</span>
        {SAMPLES.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => loadSample(s.id)}
            aria-pressed={sample === s.id}
            className={`inline-flex h-9 items-center rounded-full px-3.5 text-small font-medium transition-colors duration-fast ${
              sample === s.id
                ? 'bg-fg text-bg'
                : 'bg-surface text-fg ring-1 ring-inset ring-border-strong hover:bg-muted'
            }`}
          >
            {s.role}
          </button>
        ))}
      </div>

      {/* ---------- Inputs ---------- */}
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="kc-jd" className="flex items-baseline justify-between gap-3">
            <span className="text-small font-semibold text-fg">1. The job post</span>
            <span className="text-caption tabular-nums text-fg-3">{words(jd)} words</span>
          </label>
          <textarea
            id="kc-jd"
            value={jd}
            onChange={(e) => {
              setJd(e.target.value)
              setSample(null)
            }}
            placeholder="Paste the whole job post: title, responsibilities, requirements and 'nice to have'. The sections tell the checker what matters most."
            className={`mt-2 ${field}`}
            spellCheck={false}
          />
        </div>
        <div>
          <label htmlFor="kc-cv" className="flex items-baseline justify-between gap-3">
            <span className="text-small font-semibold text-fg">2. Your resume or CV</span>
            <span className="text-caption tabular-nums text-fg-3">{words(resume)} words</span>
          </label>
          <textarea
            id="kc-cv"
            value={resume}
            onChange={(e) => {
              setResume(e.target.value)
              setSample(null)
            }}
            placeholder="Open your resume PDF or Word file, select all (Ctrl+A or Cmd+A), copy and paste here. If the text comes out jumbled, an ATS may read it that way too."
            className={`mt-2 ${field}`}
            spellCheck={false}
          />
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-caption text-fg-3">
        <span className="inline-flex items-center gap-1.5">
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
          >
            <rect x="3" y="7" width="10" height="7" rx="1.5" />
            <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
          </svg>
          Runs in your browser. Nothing is uploaded; your text is saved on this device only.
        </span>
        {(jd || resume) && (
          <button
            type="button"
            onClick={clearAll}
            className="font-medium text-fg-2 underline underline-offset-2 hover:text-fg"
          >
            Clear both
          </button>
        )}
      </div>

      {/* ---------- Results ---------- */}
      <div ref={resultsRef} className="scroll-mt-32" aria-live="polite">
        {!a ? (
          <div className="mt-8 rounded-xl border border-dashed border-border-strong bg-surface p-8 text-center">
            <div className="text-small font-semibold text-fg">
              Your results appear here as you paste
            </div>
            <p className="mx-auto mt-2 max-w-[48ch] text-small text-fg-2">
              Paste at least {MIN_WORDS} words in each box, or tap a sample above to see a full
              check in one click.
            </p>
          </div>
        ) : (
          <Results
            a={a}
            kit={kit ? { name: kit.role, href: kit.kitHref } : null}
            kits={kits}
            copied={copied}
            onCopy={copyMissing}
          />
        )}
      </div>
    </div>
  )
}

function Results({
  a,
  kit,
  kits,
  copied,
  onCopy,
}: {
  a: NonNullable<ReturnType<typeof analyse>>
  kit: KitLink | null
  kits: KitLink[]
  copied: boolean
  onCopy: () => void
}) {
  const order: Priority[] = ['must', 'mentioned', 'nice']
  const mustMissing = a.missing.filter((k) => k.priority === 'must')
  const verdict =
    a.keywords.length === 0
      ? 'We could not find known skills in this post. Paste the full post, including the requirements.'
      : mustMissing.length === 0
        ? 'Every must-have skill in the post shows up on your resume. Now make sure each one sits in a bullet with a result.'
        : `${mustMissing.length} must-have skill${mustMissing.length === 1 ? ' is' : 's are'} missing. Add the ones you really have, in the post's own words.`

  return (
    <div className="kc-in mt-8 space-y-6">
      {/* Score panel */}
      <section
        aria-labelledby="kc-score"
        className="rounded-2xl border border-border bg-surface p-5 shadow-e1 md:p-6"
      >
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-10">
          <div>
            <div className={`${kicker} text-signal-strong`}>
              Keyword coverage · weighted by priority
            </div>
            <div id="kc-score" className="mt-2 flex items-baseline gap-2">
              <span className="text-[3.5rem] font-semibold tabular-nums leading-none text-fg">
                {a.coverage}%
              </span>
              <span className="text-small text-fg-2">
                {a.matched.length} of {a.keywords.length} skills
              </span>
            </div>
            <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-muted" aria-hidden="true">
              <div
                className="kc-bar h-full rounded-full bg-signal"
                style={{ width: `${a.coverage}%` }}
              />
            </div>
            <p className="mt-4 text-small text-fg">{verdict}</p>
            <p className="mt-2 text-caption text-fg-3">
              Our own measure, not an ATS score: must-haves count 3, mentions 2, nice-to-haves 1.
            </p>
          </div>
          <dl className="space-y-3">
            {order.map((p) => {
              const b = a.byPriority[p]
              const pct = b.total ? Math.round((b.matched / b.total) * 100) : 0
              return (
                <div key={p}>
                  <div className="flex items-baseline justify-between gap-3 text-small">
                    <dt className="font-medium text-fg">{PRIORITY_LABEL[p]}</dt>
                    <dd className="tabular-nums text-fg-2">
                      {b.matched} of {b.total} on your resume
                    </dd>
                  </div>
                  <div
                    className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted"
                    aria-hidden="true"
                  >
                    <div
                      className={`kc-bar h-full rounded-full ${p === 'must' ? 'bg-signal' : p === 'mentioned' ? 'bg-signal/60' : 'bg-signal/30'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}
            <div className="flex items-start gap-2 border-t border-border pt-3 text-small">
              <Status s={a.title.found ? (a.title.inResume ? 'pass' : 'warn') : 'warn'} />
              <span className="text-fg-2">
                {a.title.found ? (
                  a.title.inResume ? (
                    <>
                      The post&apos;s title,{' '}
                      <strong className="font-semibold text-fg">{a.title.found}</strong>, is on your
                      resume.
                    </>
                  ) : (
                    <>
                      The post&apos;s title,{' '}
                      <strong className="font-semibold text-fg">{a.title.found}</strong>, is not on
                      your resume. Recruiters often search by title: use it in your headline if it
                      is honest.
                    </>
                  )
                ) : (
                  'Put the job title as the first line of the post so we can check it against your resume.'
                )}
              </span>
            </div>
          </dl>
        </div>
      </section>

      {/* Missing */}
      <section aria-labelledby="kc-missing">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className={`${kicker} text-signal-strong`}>
              Missing · {a.missing.length} skills
            </div>
            <h3 id="kc-missing" className="mt-2 text-h3 font-semibold text-fg">
              In the post, not on your resume
            </h3>
          </div>
          {a.missing.length > 0 && (
            <button
              type="button"
              onClick={onCopy}
              className="inline-flex h-9 items-center rounded-full bg-surface px-3.5 text-small font-medium text-fg ring-1 ring-inset ring-border-strong hover:bg-muted"
            >
              {copied ? 'Copied' : 'Copy the list'}
            </button>
          )}
        </div>
        {a.missing.length === 0 ? (
          <p className="mt-3 text-small text-fg-2">
            Nothing missing from our skill list. Check the other terms below too.
          </p>
        ) : (
          <>
            {a.missing.some((k) => k.priority === 'must') && (
              <ul className="mt-4 grid gap-3 md:grid-cols-2">
                {a.missing
                  .filter((k) => k.priority === 'must')
                  .map((k) => (
                    <MissingCard key={k.name} k={k} />
                  ))}
              </ul>
            )}
            {a.missing.some((k) => k.priority !== 'must') && (
              <details className="group mt-3 rounded-xl border border-border bg-surface open:shadow-e1">
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 text-small font-medium text-fg">
                  <span>
                    {a.missing.filter((k) => k.priority !== 'must').length} more: mentioned or nice
                    to have
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-fg-3 transition-transform duration-base group-open:rotate-180"
                  >
                    ▾
                  </span>
                </summary>
                <ul className="grid gap-3 px-4 pb-4 md:grid-cols-2">
                  {a.missing
                    .filter((k) => k.priority !== 'must')
                    .map((k) => (
                      <MissingCard key={k.name} k={k} />
                    ))}
                </ul>
              </details>
            )}
          </>
        )}
      </section>

      {/* Matched */}
      <section aria-labelledby="kc-matched">
        <div className={`${kicker} text-signal-strong`}>Matched · {a.matched.length} skills</div>
        <h3 id="kc-matched" className="mt-2 text-h3 font-semibold text-fg">
          Already on your resume
        </h3>
        {a.matched.length === 0 ? (
          <p className="mt-3 text-small text-fg-2">None yet.</p>
        ) : (
          <ul className="mt-4 flex flex-wrap gap-2">
            {a.matched.map((k) => (
              <li
                key={k.name}
                className="inline-flex h-8 items-center gap-2 rounded-full bg-success-soft px-3 text-small text-fg"
                title={`${PRIORITY_LABEL[k.priority]} · in the post ${k.jdCount}×, on your resume ${k.resumeCount}×`}
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  className="h-3.5 w-3.5 text-success-strong"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 8.5 7 11.5 12.5 5" />
                </svg>
                {k.name}
                <span className="text-caption tabular-nums text-fg-3">
                  {k.resumeCount}×{k.priority === 'must' ? ' · must' : ''}
                </span>
              </li>
            ))}
          </ul>
        )}
        {a.otherTerms.length > 0 && (
          <div className="mt-5 rounded-xl border border-border bg-surface p-4">
            <div className="text-small font-semibold text-fg">
              Other names and terms in the post
            </div>
            <p className="mt-1 text-caption text-fg-3">
              Not in our skill list. Product names, teams or jargon: add them only if they fit you.
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {a.otherTerms.map((t) => (
                <li key={t.term} className={`chip ${t.inResume ? 'bg-success-soft text-fg' : ''}`}>
                  {t.term} <span className="ml-1 tabular-nums text-fg-3">{t.count}×</span>
                  <span className="sr-only">
                    {t.inResume ? ', on your resume' : ', not on your resume'}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Format */}
      <section
        aria-labelledby="kc-format"
        className="rounded-2xl border border-border bg-surface p-5 md:p-6"
      >
        <div className={`${kicker} text-signal-strong`}>
          Format · {a.checks.filter((c) => c.status === 'pass').length} of {a.checks.length} pass
        </div>
        <h3 id="kc-format" className="mt-2 text-h3 font-semibold text-fg">
          How your resume reads as plain text
        </h3>
        <ul className="mt-4 divide-y divide-border">
          {a.checks.map((c) => (
            <li key={c.id} className="flex gap-3 py-3">
              <Status s={c.status} />
              <div className="min-w-0">
                <div className="text-small font-semibold text-fg">{c.label}</div>
                <p className="mt-0.5 text-small text-fg-2">{c.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Next step */}
      <section
        aria-labelledby="kc-next"
        className="rounded-2xl bg-signal-tint p-5 ring-1 ring-inset ring-signal/15 md:p-6"
      >
        <div className={`${kicker} text-signal-ink`}>Next step</div>
        <h3 id="kc-next" className="mt-2 text-h3 font-semibold text-fg">
          Fix the bullets, then say them out loud
        </h3>
        <p className="mt-2 max-w-prose text-small text-fg-2">
          Every keyword you add is a question you may be asked. Rewrite with a role&apos;s resume
          kit, then practise the answers in a free mock interview.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {(kit ? [kit, ...kits.filter((k) => k.href !== kit.href)] : kits)
            .slice(0, 6)
            .map((k, i) => (
              <Link
                key={k.href}
                href={k.href}
                className={`inline-flex h-9 items-center rounded-full px-3.5 text-small font-medium transition-colors duration-fast ${
                  i === 0 && kit
                    ? 'bg-fg text-bg hover:bg-fg/90'
                    : 'bg-surface text-fg ring-1 ring-inset ring-border-strong hover:bg-muted'
                }`}
              >
                {k.name} resume kit
              </Link>
            ))}
        </div>
      </section>
    </div>
  )
}

function MissingCard({ k }: { k: KeywordHit }) {
  return (
    <li className="rounded-xl border border-border bg-surface p-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-body font-semibold text-fg">{k.name}</span>
        <span
          className={`inline-flex h-6 items-center rounded-full px-2.5 text-caption font-medium ${PRIORITY_CHIP[k.priority]}`}
        >
          {PRIORITY_LABEL[k.priority]}
        </span>
        <span className="text-caption text-fg-3">
          {CAT_LABEL[k.cat]}
          {k.jdCount > 1 ? ` · ${k.jdCount}× in the post` : ''}
        </span>
      </div>
      {k.context && (
        <blockquote className="mt-2 border-l-0 text-small italic text-fg-2">
          &ldquo;{k.context}&rdquo;
        </blockquote>
      )}
      <p className="mt-2 text-small text-fg">{whereToAdd(k.cat)}</p>
    </li>
  )
}

function Status({ s }: { s: FormatCheck['status'] }) {
  const st = STATUS[s]
  return (
    <span
      className={`mt-0.5 inline-flex h-6 shrink-0 items-center gap-1 rounded-full px-2 text-caption font-semibold ${st.cls}`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className="h-3.5 w-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d={st.icon} />
      </svg>
      {st.label}
    </span>
  )
}
