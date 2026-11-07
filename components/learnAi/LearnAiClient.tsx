'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'

/* ---------- Progress, saved on this device only (no login) ---------- */

const KEY = 'aiv:learnai'
const EVT = 'aiv:learnai'
interface Progress {
  done: Record<string, number>
  last?: string
}

function read(): Progress {
  try {
    const raw = window.localStorage.getItem(KEY)
    const p = raw ? (JSON.parse(raw) as Progress) : null
    return p && typeof p.done === 'object' ? p : { done: {} }
  } catch {
    return { done: {} }
  }
}

function write(p: Progress) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(p))
  } catch {
    /* storage blocked: progress just isn't remembered */
  }
  window.dispatchEvent(new Event(EVT))
}

function useProgress(): [Progress, (fn: (p: Progress) => Progress) => void] {
  const [p, setP] = useState<Progress>({ done: {} })
  useEffect(() => {
    const sync = () => setP(read())
    sync()
    window.addEventListener(EVT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(EVT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])
  const update = useCallback((fn: (p: Progress) => Progress) => write(fn(read())), [])
  return [p, update]
}

const Check = ({ className = 'h-4 w-4' }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

/** Remembers the lesson as the last one opened, and offers "Mark lesson complete". */
export function MarkComplete({ slug, nextHref }: { slug: string; nextHref?: string }) {
  const [p, update] = useProgress()
  useEffect(() => update((x) => ({ ...x, last: slug })), [slug, update])
  const done = Boolean(p.done[slug])
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        aria-pressed={done}
        onClick={() =>
          update((x) => {
            const d = { ...x.done }
            if (d[slug]) delete d[slug]
            else d[slug] = Date.now()
            return { ...x, done: d }
          })
        }
        className={
          done
            ? 'inline-flex h-11 items-center gap-2 rounded-full bg-success-soft px-5 text-small font-semibold text-success-strong ring-1 ring-inset ring-success/30 transition-colors duration-fast'
            : 'inline-flex h-11 items-center gap-2 rounded-full bg-signal px-5 text-small font-semibold text-white shadow-e1 transition-colors duration-fast hover:bg-signal-strong'
        }
      >
        {done && <Check />}
        {done ? 'Lesson complete' : 'Mark lesson complete'}
      </button>
      {done && nextHref && (
        <Link
          href={nextHref}
          className="text-small font-semibold text-signal-strong underline-offset-4 hover:underline"
        >
          Go to the next lesson →
        </Link>
      )}
      {done && <span className="sr-only">Saved on this device.</span>}
    </div>
  )
}

/** A small tick (or the lesson number) on the hub's lesson list. */
export function DoneMark({ slug, n }: { slug: string; n: number }) {
  const [p] = useProgress()
  const done = Boolean(p.done[slug])
  return (
    <span
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-caption tabular-nums ring-1 ring-inset transition-colors duration-fast ${
        done ? 'bg-signal text-white ring-signal' : 'bg-surface text-fg-2 ring-border-strong'
      }`}
    >
      {done ? <Check className="h-3.5 w-3.5" /> : n}
      <span className="sr-only">{done ? ' (done)' : ''}</span>
    </span>
  )
}

/** Hub: progress across the whole path and a "continue" link once someone has started. */
export function HubResume({
  lessons,
}: {
  lessons: { slug: string; title: string; order: number }[]
}) {
  const [p] = useProgress()
  const doneCount = lessons.filter((l) => p.done[l.slug]).length
  if (!doneCount && !p.last) return null
  const lastIdx = Math.max(
    0,
    lessons.findIndex((l) => l.slug === p.last)
  )
  // Continue from the last lesson opened; if it's done, the next one not done after it.
  const next =
    (p.last && !p.done[p.last] ? lessons[lastIdx] : undefined) ??
    lessons.slice(lastIdx).find((l) => !p.done[l.slug]) ??
    lessons.find((l) => !p.done[l.slug])
  const pct = Math.round((doneCount / lessons.length) * 100)
  return (
    <div className="mt-8 max-w-xl rounded-xl border border-border bg-surface p-5">
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-mono text-kicker uppercase tracking-[0.08em] text-fg-3">
          Your progress · saved on this device
        </span>
        <span className="text-small font-semibold tabular-nums text-fg">
          {doneCount} of {lessons.length}
        </span>
      </div>
      <div
        className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Lessons completed"
      >
        <div
          className="h-full rounded-full bg-signal transition-[width] duration-slow"
          style={{ width: `${pct}%` }}
        />
      </div>
      {next ? (
        <Link
          href={`/learn-ai/${next.slug}`}
          className="mt-4 inline-flex min-h-11 items-center gap-2 text-small font-semibold text-signal-strong underline-offset-4 hover:underline"
        >
          Continue with lesson {next.order}: {next.title} →
        </Link>
      ) : (
        <p className="mt-4 text-small font-semibold text-fg">
          You have finished every lesson. New ones are added often.
        </p>
      )}
    </div>
  )
}

/* ---------- YouTube: a light facade, the player loads only when asked ---------- */

export function YouTubeFacade({ id, title, start }: { id: string; title: string; start?: number }) {
  const [play, setPlay] = useState(false)
  const src = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0${start ? `&start=${start}` : ''}`
  return (
    <div className="relative aspect-video overflow-hidden rounded-xl bg-ink ring-1 ring-black/5">
      {play ? (
        <iframe
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlay(true)}
          className="group absolute inset-0 h-full w-full"
          aria-label={`Play video: ${title}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
            decoding="async"
            width={480}
            height={360}
            className="absolute inset-0 h-full w-full object-cover opacity-90 transition-opacity duration-fast group-hover:opacity-100"
          />
          <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-e3 transition-transform duration-fast group-hover:scale-105">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="ml-0.5 h-6 w-6 fill-current">
              <path d="M8 5.5v13l11-6.5z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  )
}

/* ---------- Self-check quiz ---------- */

export function Quiz({
  items,
}: {
  items: { q: string; options: string[]; answer: number; why: string }[]
}) {
  const [picked, setPicked] = useState<(number | null)[]>(() => items.map(() => null))
  const answered = picked.filter((x) => x !== null).length
  const right = picked.filter((x, i) => x === items[i].answer).length
  return (
    <div className="space-y-4">
      {items.map((it, qi) => {
        const pick = picked[qi]
        const locked = pick !== null
        return (
          <fieldset key={it.q} className="rounded-xl border border-border bg-surface p-5 md:p-6">
            <legend className="sr-only">Question {qi + 1}</legend>
            <p className="font-mono text-kicker uppercase tracking-[0.08em] text-fg-3">
              Question {qi + 1} of {items.length}
            </p>
            <p className="mt-2 text-body font-semibold text-fg">{it.q}</p>
            <div className="mt-4 grid gap-2">
              {it.options.map((o, oi) => {
                const isAnswer = oi === it.answer
                const isPick = oi === pick
                let cls = 'bg-surface ring-border-strong text-fg hover:bg-muted'
                if (locked && isAnswer) cls = 'bg-success-soft ring-success/40 text-fg'
                else if (locked && isPick) cls = 'bg-danger-soft ring-danger/40 text-fg'
                else if (locked) cls = 'bg-surface ring-border text-fg-3'
                return (
                  <button
                    key={o}
                    type="button"
                    disabled={locked}
                    onClick={() => setPicked((p) => p.map((x, i) => (i === qi ? oi : x)))}
                    className={`flex min-h-11 w-full items-start gap-3 rounded-lg px-4 py-2.5 text-left text-small ring-1 ring-inset transition-colors duration-fast disabled:cursor-default ${cls}`}
                  >
                    <span className="mt-0.5 w-4 shrink-0 font-mono text-caption text-fg-3">
                      {String.fromCharCode(65 + oi)}
                    </span>
                    <span className="flex-1">{o}</span>
                    {locked && isAnswer && (
                      <span className="shrink-0 text-caption font-semibold text-success-strong">
                        Correct
                      </span>
                    )}
                    {locked && isPick && !isAnswer && (
                      <span className="shrink-0 text-caption font-semibold text-danger">
                        Your pick
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
            {locked && (
              <p className="mt-4 text-small leading-relaxed text-fg-2" aria-live="polite">
                <strong className="text-fg">
                  {pick === it.answer ? 'Right. ' : 'Not quite. '}
                </strong>
                {it.why}
              </p>
            )}
          </fieldset>
        )
      })}
      {answered === items.length && (
        <div
          className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-signal-tint p-5 ring-1 ring-inset ring-signal/15"
          aria-live="polite"
        >
          <p className="text-body font-semibold text-fg">
            You got {right} of {items.length}.{' '}
            <span className="font-normal text-fg-2">
              {right === items.length
                ? 'You have this one. Mark it complete below.'
                : 'Reread the steps above, then try again.'}
            </span>
          </p>
          <button
            type="button"
            onClick={() => setPicked(items.map(() => null))}
            className="inline-flex h-11 items-center rounded-full bg-surface px-4 text-small font-semibold text-fg ring-1 ring-inset ring-border-strong transition-colors duration-fast hover:bg-muted"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  )
}
