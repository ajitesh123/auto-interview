'use client'

// Learner-journey interactivity for role hubs. Everything here renders on the server first,
// so all text stays in the HTML for search engines; the browser only adds motion and progress.

import { useCallback, useEffect, useMemo, useState } from 'react'
import type { PayTable } from '@/data/roleHubs/types'
import { ArrowRightIcon, CheckIcon, ChevronDownIcon, MicIcon } from './icons'
import { tabLabel } from './payLabels'

export interface ChapterMeta {
  id: string
  n: number
  label: string
  meta: string
}

const safeGet = (k: string): string[] => {
  try {
    const v = JSON.parse(localStorage.getItem(k) || '[]')
    return Array.isArray(v) ? v : []
  } catch {
    return []
  }
}
const safeSet = (k: string, v: string[]) => {
  try {
    localStorage.setItem(k, JSON.stringify(v))
  } catch {
    /* private mode: progress is a convenience only */
  }
}

/* ---------- Scroll reveal: adds .rv to <html> and marks blocks as they enter ---------- */
export function RevealRoot() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (!('IntersectionObserver' in window)) return
    const vh = window.innerHeight
    // Anything already on screen shows at once, so nothing flickers on load.
    els.forEach((el) => {
      const r = el.getBoundingClientRect()
      if (r.top < vh && r.bottom > 0) el.classList.add('is-in')
    })
    document.documentElement.classList.add('rv')
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    )
    els.filter((el) => !el.classList.contains('is-in')).forEach((el) => io.observe(el))
    return () => {
      io.disconnect()
      document.documentElement.classList.remove('rv')
    }
  }, [])
  return null
}

/* ---------- Which chapter is on screen, and which ones the reader has seen ---------- */
function useJourney(slug: string, chapters: ChapterMeta[]) {
  const key = `aiv:journey:${slug}`
  const [current, setCurrent] = useState(chapters[0]?.id)
  const [seen, setSeen] = useState<string[]>([])

  useEffect(() => setSeen(safeGet(key)), [key])

  useEffect(() => {
    const sections = chapters
      .map((c) => document.getElementById(c.id))
      .filter(Boolean) as HTMLElement[]
    if (!sections.length || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          const id = e.target.id
          setCurrent(id)
          setSeen((prev) => {
            if (prev.includes(id)) return prev
            const next = [...prev, id]
            safeSet(key, next)
            return next
          })
        })
      },
      { rootMargin: '-35% 0px -55% 0px' }
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [chapters, key])

  return { current, seen }
}

/* ---------- Desktop rail ---------- */
export function JourneyRail({ slug, chapters }: { slug: string; chapters: ChapterMeta[] }) {
  const { current, seen } = useJourney(slug, chapters)
  const { stats } = usePractice(slug)
  const done = chapters.filter((c) => seen.includes(c.id)).length
  return (
    <nav aria-label="Your path through this guide" className="sticky top-24">
      <div className="font-mono text-kicker uppercase tracking-[0.08em] text-fg-3">Your path</div>
      <ol className="mt-4 space-y-1">
        {chapters.map((c, i) => {
          const isCurrent = c.id === current
          const isSeen = seen.includes(c.id) && !isCurrent
          return (
            <li key={c.id} className="relative">
              {i < chapters.length - 1 && (
                <span
                  aria-hidden="true"
                  className={`absolute left-[13px] top-9 h-[calc(100%-20px)] w-px ${
                    isSeen ? 'bg-signal/40' : 'bg-border'
                  }`}
                />
              )}
              <a
                href={`#${c.id}`}
                aria-current={isCurrent ? 'step' : undefined}
                className={`group flex items-start gap-3 rounded-lg px-1 py-2 transition-colors duration-fast ${
                  isCurrent ? 'text-fg' : 'text-fg-2 hover:text-fg'
                }`}
              >
                <span
                  className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-[11px] transition-colors duration-base ${
                    isCurrent
                      ? 'bg-signal text-white shadow-e1'
                      : isSeen
                        ? 'bg-signal-tint text-signal-strong'
                        : 'border border-border bg-surface text-fg-3'
                  }`}
                >
                  {isSeen ? <CheckIcon className="h-3.5 w-3.5" /> : c.n}
                </span>
                <span className="min-w-0 pt-0.5">
                  <span
                    className={`block text-small ${isCurrent ? 'font-semibold' : 'font-medium'}`}
                  >
                    {c.label}
                  </span>
                  <span className="block text-caption text-fg-3">{c.meta}</span>
                </span>
              </a>
            </li>
          )
        })}
      </ol>
      <div className="mt-6 rounded-xl border border-border bg-surface p-4">
        <div className="flex items-baseline justify-between text-caption text-fg-2">
          <span>Progress</span>
          <span className="font-mono tabular-nums">
            {done}/{chapters.length}
          </span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-signal transition-[width] duration-slow ease-out"
            style={{ width: `${(done / chapters.length) * 100}%` }}
          />
        </div>
        <p className="mt-2 text-caption text-fg-2">
          {stats.practised} practised · {stats.strong} strong
          {stats.due.length > 0 && (
            <>
              {' · '}
              <button
                type="button"
                onClick={() => openQuestion(stats.due[0])}
                className="font-semibold text-signal-strong hover:underline"
              >
                {stats.due.length} due
              </button>
            </>
          )}
        </p>
        <p className="mt-1 text-caption text-fg-3">Saved on this device. No login.</p>
      </div>
    </nav>
  )
}

/* ---------- Mobile: one slim sticky bar ("2/6 · Pay") with a step menu ---------- */
export function JourneyMobileBar({ slug, chapters }: { slug: string; chapters: ChapterMeta[] }) {
  const { current } = useJourney(slug, chapters)
  const idx = Math.max(
    0,
    chapters.findIndex((c) => c.id === current)
  )
  const c = chapters[idx]
  const [open, setOpen] = useState(false)
  return (
    <div className="sticky top-16 z-40 -mx-5 border-b border-border bg-bg px-5 md:-mx-8 md:px-8 lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={`Step ${idx + 1} of ${chapters.length}: ${c?.label}. Show all steps`}
        className="flex h-11 w-full items-center gap-2 text-left"
      >
        <span className="font-mono text-caption tabular-nums text-signal-strong">
          {idx + 1}/{chapters.length}
        </span>
        <span className="min-w-0 flex-1 truncate text-small font-medium text-fg">{c?.label}</span>
        <ChevronDownIcon
          className={`h-4 w-4 shrink-0 text-fg-2 transition-transform duration-base ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-muted">
        <div
          className="h-full bg-signal transition-[width] duration-slow ease-out"
          style={{ width: `${((idx + 1) / chapters.length) * 100}%` }}
        />
      </div>
      {open && (
        <ol className="space-y-1 pb-3">
          {chapters.map((ch, i) => (
            <li key={ch.id}>
              <a
                href={`#${ch.id}`}
                onClick={() => setOpen(false)}
                className={`flex min-h-11 items-center gap-3 rounded-lg px-2 ${
                  i === idx ? 'bg-surface font-semibold text-fg shadow-e1' : 'text-fg-2'
                }`}
              >
                <span className="font-mono text-caption text-fg-3">
                  {String(ch.n).padStart(2, '0')}
                </span>
                <span className="text-small">{ch.label}</span>
                <span className="ml-auto text-caption text-fg-3">{ch.meta}</span>
              </a>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}

/* ---------- "Pick up where you left off" (hero) ---------- */
export function ResumeJourney({ slug, chapters }: { slug: string; chapters: ChapterMeta[] }) {
  const [seen, setSeen] = useState<string[] | null>(null)
  const { stats } = usePractice(slug)
  useEffect(() => setSeen(safeGet(`aiv:journey:${slug}`)), [slug])
  const next = useMemo(
    () => (seen && seen.length ? chapters.find((c) => !seen.includes(c.id)) : undefined),
    [seen, chapters]
  )
  if (stats.due.length > 0)
    return (
      <button
        type="button"
        onClick={() => openQuestion(stats.due[0])}
        className="group mt-5 flex w-full items-center justify-between gap-3 rounded-xl bg-signal-tint px-4 py-3 text-left text-small text-signal-ink ring-1 ring-inset ring-signal/15"
      >
        <span>
          <span className="font-semibold">Welcome back.</span> {stats.due.length}{' '}
          {stats.due.length === 1 ? 'question is' : 'questions are'} due for review.
        </span>
        <ArrowRightIcon className="h-4 w-4 shrink-0 transition-transform duration-fast group-hover:translate-x-0.5" />
      </button>
    )
  if (!seen || !seen.length || !next) return null
  return (
    <a
      href={`#${next.id}`}
      className="group mt-5 flex items-center justify-between gap-3 rounded-xl bg-signal-tint px-4 py-3 text-small text-signal-ink ring-1 ring-inset ring-signal/15"
    >
      <span>
        <span className="font-semibold">Welcome back.</span> Pick up at step {next.n}: {next.label}
      </span>
      <ArrowRightIcon className="h-4 w-4 shrink-0 transition-transform duration-fast group-hover:translate-x-0.5" />
    </a>
  )
}

/* ---------- Pay explorer: geography tabs, experience bars ---------- */
function parsePay(v: string) {
  const nums = (
    v
      .split('+')[0]
      .replace(/,/g, '')
      .match(/\d+(?:\.\d+)?/g) || []
  ).map(Number)
  if (!nums.length) return null
  return { lo: nums[0], hi: nums[1] ?? nums[0], range: nums.length > 1 }
}
export function PayExplorer({ tables }: { tables: PayTable[] }) {
  const [active, setActive] = useState(0)
  const onKey = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
      e.preventDefault()
      const d = e.key === 'ArrowRight' ? 1 : -1
      const n = (active + d + tables.length) % tables.length
      setActive(n)
      document.getElementById(`pay-tab-${n}`)?.focus()
    },
    [active, tables.length]
  )
  return (
    <div data-reveal className="overflow-hidden rounded-2xl border border-border bg-surface">
      <div
        role="tablist"
        aria-label="Pay by country"
        className="flex gap-1 overflow-x-auto border-b border-border bg-muted/60 p-1.5"
      >
        {tables.map((t, i) => (
          <button
            key={t.region}
            id={`pay-tab-${i}`}
            role="tab"
            type="button"
            aria-selected={i === active}
            aria-controls={`pay-panel-${i}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={onKey}
            className={`h-9 shrink-0 rounded-full px-4 text-small transition-colors duration-fast ${
              i === active
                ? 'bg-surface font-semibold text-fg shadow-e1'
                : 'text-fg-2 hover:text-fg'
            }`}
          >
            {tabLabel(t)}
          </button>
        ))}
      </div>
      {tables.map((t, i) => {
        const parsed = t.rows.map((r) => parsePay(r.value))
        const max = Math.max(...parsed.map((p) => p?.hi ?? 0), 1)
        return (
          <div
            key={t.region}
            id={`pay-panel-${i}`}
            role="tabpanel"
            aria-labelledby={`pay-tab-${i}`}
            hidden={i !== active}
            className="p-5 md:p-6"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h4 className="text-h4 font-semibold text-fg">{t.region}</h4>
              <span className="text-caption text-fg-3">{t.currency}</span>
            </div>
            <ul className="mt-3 divide-y divide-border">
              {t.rows.map((r, ri) => {
                const p = parsed[ri]
                const isMedian = /median/i.test(r.band)
                return (
                  <li key={`${r.band}-${ri}`} className="py-3">
                    <div className="flex items-baseline justify-between gap-4">
                      <div className="min-w-0">
                        <div className="text-small font-medium text-fg">
                          {r.experience}
                          {isMedian && (
                            <span className="ml-2 rounded-full bg-signal-tint px-2 py-0.5 align-middle text-[11px] font-medium text-signal-ink">
                              Median
                            </span>
                          )}
                        </div>
                        <div className="text-caption text-fg-3">
                          {r.url ? (
                            <a
                              href={r.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline decoration-border-strong underline-offset-2 hover:text-fg"
                            >
                              {r.band}
                            </a>
                          ) : (
                            r.band
                          )}
                        </div>
                      </div>
                      <div className="shrink-0 text-right font-mono text-small font-semibold tabular-nums text-fg">
                        {r.value}
                      </div>
                    </div>
                    {p && (
                      <div
                        className="relative mt-2 h-2 overflow-hidden rounded-full bg-muted"
                        aria-hidden="true"
                      >
                        {p.range && (
                          <span
                            data-bar
                            className="absolute inset-y-0 left-0 rounded-full bg-signal/15"
                            style={{
                              width: `${(p.lo / max) * 100}%`,
                              transitionDelay: `${ri * 50}ms`,
                            }}
                          />
                        )}
                        <span
                          data-bar
                          className={`absolute inset-y-0 rounded-full ${isMedian ? 'bg-signal' : 'bg-signal/70'}`}
                          style={{
                            left: p.range ? `${(p.lo / max) * 100}%` : 0,
                            width: `${Math.max(2, ((p.range ? p.hi - p.lo : p.hi) / max) * 100)}%`,
                            transitionDelay: `${ri * 50}ms`,
                          }}
                        />
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
            <p className="mt-4 text-caption leading-relaxed text-fg-3">
              Source:{' '}
              <a
                href={t.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-fg"
              >
                {t.sourceLabel}
              </a>{' '}
              ({t.asOf}). {t.note}
            </p>
          </div>
        )
      })}
    </div>
  )
}

/* ---------- Practice loop: self-rating + spaced review (saved on this device) ---------- */
export type Rating = 'weak' | 'ok' | 'strong'
type Entry = { r: Rating; t: number; n: number }
type Store = Record<string, Entry>
const PRACTICE_EVENT = 'aiv-practice'
const DAY = 86400000
const RATING_LABEL: Record<Rating, string> = {
  weak: 'Needs work',
  ok: 'Getting there',
  strong: 'Strong',
}

/** Weak comes back tomorrow, ok in 3 days, strong in 7 (doubling each time it stays strong). */
function dueAt(e: Entry) {
  const base = e.r === 'weak' ? 1 : e.r === 'ok' ? 3 : 7 * Math.min(4, 2 ** Math.max(0, e.n - 1))
  return e.t + base * DAY
}
function readStore(key: string): Store {
  try {
    const v = JSON.parse(localStorage.getItem(key) || '{}')
    return v && typeof v === 'object' && !Array.isArray(v) ? v : {}
  } catch {
    return {}
  }
}

export function usePractice(slug: string) {
  const key = `aiv:practice:${slug}`
  const [store, setStore] = useState<Store>({})
  const [now, setNow] = useState(0)
  useEffect(() => {
    const read = () => {
      setStore(readStore(key))
      setNow(Date.now())
    }
    read()
    window.addEventListener(PRACTICE_EVENT, read)
    return () => window.removeEventListener(PRACTICE_EVENT, read)
  }, [key])
  const rate = (id: string, r: Rating) => {
    const cur = readStore(key)
    const prev = cur[id]
    cur[id] = { r, t: Date.now(), n: prev && prev.r === r ? prev.n + 1 : 1 }
    try {
      localStorage.setItem(key, JSON.stringify(cur))
    } catch {
      /* progress is a convenience only */
    }
    setStore({ ...cur })
    window.dispatchEvent(new Event(PRACTICE_EVENT))
  }
  const isDue = (id: string) => !!store[id] && now > 0 && now >= dueAt(store[id])
  const ids = Object.keys(store)
  const stats = {
    practised: ids.length,
    strong: ids.filter((i) => store[i].r === 'strong').length,
    due: ids.filter((i) => isDue(i)),
  }
  return { store, rate, isDue, stats }
}

function openQuestion(id: string) {
  const el = document.getElementById(`qa-${id}`) as HTMLDetailsElement | null
  if (!el) return
  el.open = true
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function PracticeCounter({ slug, total }: { slug: string; total: number }) {
  const { stats } = usePractice(slug)
  const n = stats.practised
  const due = stats.due
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="text-small font-medium text-fg">
          {n === 0
            ? 'Answer out loud, reveal, then rate yourself. Weak answers come back for review.'
            : `${n} of ${total} practised · ${stats.strong} strong${due.length ? ` · ${due.length} due for review` : ''}`}
        </span>
        <span className="font-mono text-caption tabular-nums text-fg-3">
          {n}/{total}
        </span>
      </div>
      <div className="mt-2 flex h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full bg-signal transition-[width] duration-slow ease-out"
          style={{ width: `${(stats.strong / Math.max(total, 1)) * 100}%` }}
        />
        <div
          className="h-full bg-signal/35 transition-[width] duration-slow ease-out"
          style={{ width: `${((n - stats.strong) / Math.max(total, 1)) * 100}%` }}
        />
      </div>
      {due.length > 0 && (
        <button
          type="button"
          onClick={() => openQuestion(due[0])}
          className="mt-3 inline-flex h-10 items-center gap-2 rounded-full bg-signal px-4 text-small font-semibold text-white hover:bg-signal-strong"
        >
          Review {due.length} due {due.length === 1 ? 'question' : 'questions'}
          <ArrowRightIcon />
        </button>
      )}
    </div>
  )
}

export function QuestionItem({
  slug,
  qid,
  index,
  q,
  answer,
  lookFor,
  defaultOpen,
}: {
  slug: string
  qid: string
  index: number
  q: string
  answer: string
  lookFor?: string
  defaultOpen?: boolean
}) {
  const { store, rate, isDue } = usePractice(slug)
  const entry = store[qid]
  const due = isDue(qid)
  // Attempt first, then reveal (retrieval practice). The answer is in the server HTML;
  // only after the page loads do we fold it behind "Reveal". The first question stays a worked example.
  const [revealed, setRevealed] = useState(true)
  useEffect(() => {
    if (!defaultOpen) setRevealed(false)
  }, [defaultOpen])
  return (
    <details
      id={`qa-${qid}`}
      open={defaultOpen}
      className="group scroll-mt-32 rounded-xl border border-border bg-surface transition-shadow duration-base open:shadow-e1"
    >
      <summary className="flex min-h-12 cursor-pointer list-none items-start gap-3 px-4 py-4 sm:px-5 [&::-webkit-details-marker]:hidden">
        <span
          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[11px] ${
            entry?.r === 'strong'
              ? 'bg-signal text-white'
              : entry
                ? 'bg-signal-tint text-signal-ink'
                : 'border border-border text-fg-3'
          }`}
        >
          {entry?.r === 'strong' ? <CheckIcon className="h-3.5 w-3.5" /> : index}
        </span>
        <span className="flex-1">
          <span className="block text-body font-medium text-fg">{q}</span>
          {entry && (
            <span className="mt-1 inline-flex flex-wrap gap-1.5 text-[11px] font-medium">
              <span className="rounded-full bg-muted px-2 py-0.5 text-fg-2">
                {RATING_LABEL[entry.r]}
              </span>
              {due && (
                <span className="rounded-full bg-signal-tint px-2 py-0.5 text-signal-ink">
                  Due for review
                </span>
              )}
            </span>
          )}
        </span>
        <ChevronDownIcon className="mt-1 h-4 w-4 shrink-0 text-fg-3 transition-transform duration-base group-open:rotate-180" />
      </summary>
      <div className="space-y-4 px-4 pb-5 sm:px-5 sm:pl-14">
        {!revealed && (
          <div className="rounded-lg border border-dashed border-border-strong p-4">
            <div className="font-mono text-kicker uppercase tracking-[0.08em] text-signal-strong">
              Your turn first
            </div>
            <p className="mt-1.5 text-small leading-relaxed text-fg-2">
              Take 20 seconds to plan, then answer out loud in about 90 seconds. Trying before you
              read is what makes it stick.
            </p>
            <button
              type="button"
              onClick={() => setRevealed(true)}
              className="mt-3 inline-flex h-10 items-center gap-2 rounded-full bg-fg px-4 text-small font-semibold text-bg transition-colors duration-fast hover:bg-fg/90"
            >
              Reveal how you could answer
            </button>
          </div>
        )}
        <div className={revealed ? 'space-y-4' : 'hidden'}>
          <div>
            <div className="font-mono text-kicker uppercase tracking-[0.08em] text-fg-3">
              How you could answer
            </div>
            <div className="mt-2 max-w-[68ch] space-y-3">
              {answer.split('\n\n').map((p, i) => (
                <p key={i} className="text-small leading-relaxed text-fg-2 sm:text-body">
                  {p}
                </p>
              ))}
            </div>
          </div>
          {lookFor && (
            <div className="rounded-lg bg-signal-tint p-3.5 ring-1 ring-inset ring-signal/15">
              <div className="font-mono text-kicker uppercase tracking-[0.08em] text-signal-ink">
                What the interviewer is listening for
              </div>
              <p className="mt-1.5 text-small leading-relaxed text-fg">{lookFor}</p>
              <p className="mt-2 text-caption text-fg-2">
                Check yourself: did your answer cover this?
              </p>
            </div>
          )}
        </div>
        {revealed && (
          <div className="rounded-lg border border-border p-3.5">
            <div className="text-small font-medium text-fg">How did your answer compare?</div>
            <div role="group" aria-label="Rate your answer" className="mt-2.5 flex flex-wrap gap-2">
              {(['weak', 'ok', 'strong'] as Rating[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => rate(qid, r)}
                  aria-pressed={entry?.r === r}
                  className={`inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-small font-medium transition-colors duration-fast ${
                    entry?.r === r
                      ? 'bg-fg text-bg'
                      : 'bg-surface text-fg ring-1 ring-inset ring-border-strong hover:bg-muted'
                  }`}
                >
                  {entry?.r === r && <CheckIcon className="h-4 w-4" />}
                  {r === 'weak' ? 'Missed key points' : r === 'ok' ? 'Partly there' : 'Nailed it'}
                </button>
              ))}
            </div>
            <p className="mt-2 text-caption text-fg-3">
              {entry
                ? entry.r === 'weak'
                  ? 'Saved. This one comes back tomorrow.'
                  : entry.r === 'ok'
                    ? 'Saved. It comes back in 3 days.'
                    : 'Saved. We will check it again in a week.'
                : 'Your rating decides when this question comes back for review.'}
            </p>
          </div>
        )}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <a
            href="/free-mock-interview"
            className="inline-flex h-10 items-center gap-2 rounded-full px-3 text-small font-medium text-signal-strong hover:underline"
          >
            <MicIcon className="h-4 w-4" />
            Say it out loud in a mock interview
          </a>
        </div>
      </div>
    </details>
  )
}

/* ---------- Prep plan: tick tasks off and add study sessions to your calendar ---------- */
const pad = (n: number) => String(n).padStart(2, '0')
function icsDate(d: Date) {
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`
}
function icsEscape(t: string) {
  return t.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')
}

export function PlanTracker({
  slug,
  roleName,
  days,
  title,
  tasks,
  defaultOpen,
}: {
  slug: string
  roleName: string
  days: string
  title: string
  tasks: string[]
  defaultOpen?: boolean
}) {
  const key = `aiv:plan:${slug}:${days}`
  const [done, setDone] = useState<string[]>([])
  useEffect(() => setDone(safeGet(key)), [key])
  const toggle = (t: string) => {
    const next = done.includes(t) ? done.filter((x) => x !== t) : [...done, t]
    setDone(next)
    safeSet(key, next)
  }
  const n = parseInt(days, 10) || tasks.length

  const addToCalendar = () => {
    // One 45-minute session a day at 8 pm local time, starting tomorrow; tasks spread across the days.
    const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Auto Interview AI//Prep plan//EN']
    const start = new Date()
    start.setDate(start.getDate() + 1)
    start.setHours(20, 0, 0, 0)
    for (let d = 0; d < n; d++) {
      const day = new Date(start)
      day.setDate(start.getDate() + d)
      const end = new Date(day.getTime() + 45 * 60000)
      const from = Math.floor((d * tasks.length) / n)
      const to = Math.max(from + 1, Math.floor(((d + 1) * tasks.length) / n))
      const todays = tasks.slice(from, to)
      lines.push(
        'BEGIN:VEVENT',
        `UID:${slug}-${days.replace(/\s/g, '')}-${d}-${icsDate(day)}@autointerviewai.com`,
        `DTSTAMP:${icsDate(new Date())}`,
        `DTSTART:${icsDate(day)}`,
        `DTEND:${icsDate(end)}`,
        `SUMMARY:${icsEscape(`${roleName} prep · day ${d + 1} of ${n}`)}`,
        `DESCRIPTION:${icsEscape(`${todays.join('\n')}\n\nGuide: https://www.autointerviewai.com/${slug}#plan`)}`,
        'END:VEVENT'
      )
    }
    lines.push('END:VCALENDAR')
    const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${slug}-${n}-day-prep-plan.ics`
    a.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  const count = done.filter((t) => tasks.includes(t)).length
  return (
    <details
      data-reveal
      open={defaultOpen}
      className="group rounded-xl border border-border bg-surface p-5 open:shadow-e1"
    >
      <summary className="flex cursor-pointer list-none items-start justify-between gap-3 [&::-webkit-details-marker]:hidden">
        <span>
          <span className="block font-mono text-h3 font-semibold text-fg">{days}</span>
          <span className="mt-0.5 block text-small text-fg-2">{title}</span>
        </span>
        <span className="mt-1 font-mono text-caption tabular-nums text-fg-3">
          {count}/{tasks.length}
        </span>
      </summary>
      <ul className="mt-4 space-y-1 border-t border-border pt-3">
        {tasks.map((t) => {
          const on = done.includes(t)
          return (
            <li key={t}>
              <label className="flex min-h-10 cursor-pointer items-start gap-3 rounded-lg py-1.5 text-small leading-relaxed text-fg-2">
                <input
                  type="checkbox"
                  checked={on}
                  onChange={() => toggle(t)}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-border-input text-signal accent-signal"
                />
                <span className={on ? 'text-fg-3 line-through' : ''}>{t}</span>
              </label>
            </li>
          )
        })}
      </ul>
      <button
        type="button"
        onClick={addToCalendar}
        className="mt-4 inline-flex h-10 items-center gap-2 rounded-full bg-surface px-4 text-small font-semibold text-fg ring-1 ring-inset ring-border-strong transition-colors duration-fast hover:bg-muted"
      >
        Add {n} sessions to my calendar
      </button>
      <p className="mt-2 text-caption text-fg-3">
        45 minutes a day at 8 pm, starting tomorrow. Works with Google, Apple and Outlook calendars.
      </p>
    </details>
  )
}
