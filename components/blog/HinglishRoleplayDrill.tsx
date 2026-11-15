'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import {
  SCENARIOS,
  SECTORS,
  RUBRIC,
  LEVEL_POINTS,
  MAX_SCORE,
  TTAI_URL,
  ORIGIN_LABEL,
  verdict,
  ruleById,
  type Sector,
} from '@/data/hinglishRoleplay'

const STORE = 'aia-hinglish-roleplay-v1'

type Difficulty = 'easy' | 'medium' | 'hard'
const DIFF: Record<Difficulty, { label: string; repeats: number; delta: number; note: string }> = {
  easy: {
    label: 'Easy',
    repeats: 0,
    delta: 1,
    note: 'Buyer warms up the first time the rep meets the warm-up rule.',
  },
  medium: {
    label: 'Medium',
    repeats: 1,
    delta: 0,
    note: 'Buyer repeats the objection once before warming up.',
  },
  hard: {
    label: 'Hard',
    repeats: 2,
    delta: -1,
    note: 'Buyer repeats it twice, switches to pure Hindi once, and gives a minute less.',
  },
}

type Saved = Record<string, { total: number; at: string; difficulty: Difficulty }[]>

function load(): Saved {
  try {
    return JSON.parse(window.localStorage.getItem(STORE) || '{}') as Saved
  } catch {
    return {}
  }
}

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.max(0, s % 60)).padStart(2, '0')}`

/**
 * Pick a sector and an objection; get a buyer card (hidden from the rep), a rep card with the
 * never-say line, a round timer and a 4-line score. No AI; nothing leaves this browser.
 */
export default function HinglishRoleplayDrill() {
  const [sector, setSector] = useState<Sector>('insurance')
  const inSector = SCENARIOS.filter((s) => s.sector === sector)
  const [id, setId] = useState(inSector[0].id)
  const [difficulty, setDifficulty] = useState<Difficulty>('medium')
  const [scores, setScores] = useState<Record<string, number>>({})
  const [saved, setSaved] = useState<Saved>({})
  const [left, setLeft] = useState<number | null>(null)
  const [running, setRunning] = useState(false)
  const [copied, setCopied] = useState('')
  const [showBuyer, setShowBuyer] = useState(false)
  const [savedNow, setSavedNow] = useState(false)
  const tick = useRef<ReturnType<typeof setInterval> | null>(null)

  const s = SCENARIOS.find((x) => x.id === id && x.sector === sector) ?? inSector[0]
  const d = DIFF[difficulty]
  const rule = ruleById(s.rep.rule)
  const minutes = Math.max(2, s.minutes + d.delta)

  useEffect(() => setSaved(load()), [])

  useEffect(() => {
    setScores({})
    setRunning(false)
    setLeft(null)
    setSavedNow(false)
    setShowBuyer(false)
  }, [s.id, difficulty])

  useEffect(() => {
    if (left === 0) setRunning(false)
  }, [left])

  useEffect(() => {
    if (!running) return
    tick.current = setInterval(() => setLeft((v) => (v === null || v <= 0 ? v : v - 1)), 1000)
    return () => {
      if (tick.current) clearInterval(tick.current)
    }
  }, [running])

  const total = RUBRIC.reduce((sum, r) => sum + (scores[r.id] ?? 0), 0)
  const complete = RUBRIC.every((r) => scores[r.id])
  const history = saved[s.id] ?? []

  const buyerText = useMemo(
    () =>
      [
        `BUYER CARD: scenario ${s.n} (${d.label})`,
        `You are: ${s.buyer.role}`,
        `You say (exactly as written): "${s.line}"`,
        `Meaning: ${s.gloss}`,
        `What is really going on: ${s.buyer.hidden}`,
        `Warm up only if: ${s.buyer.warmsIf}`,
        d.repeats > 0
          ? `Repeat the objection ${d.repeats === 1 ? 'once' : 'twice'} before warming up.`
          : '',
        difficulty === 'hard' ? 'Switch to pure Hindi for one reply in the first minute.' : '',
        `End the call if: ${s.buyer.endsIf}`,
        `Also end it if the rep says anything like: "${s.rep.neverSay}"`,
      ]
        .filter(Boolean)
        .join('\n'),
    [s, d, difficulty]
  )

  const repText = useMemo(
    () =>
      [
        `REP CARD: scenario ${s.n} (${d.label}, ${minutes} min)`,
        `Goal: ${s.rep.goal}`,
        `Never say: "${s.rep.neverSay}"`,
        `The rule makes you: ${s.rep.mustSay} (${rule.regulator}, ${rule.ref})`,
        'Reply in the mix the buyer uses. Ask before you answer.',
      ].join('\n'),
    [s, d, minutes, rule]
  )

  const copy = async (text: string, which: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(which)
      setTimeout(() => setCopied(''), 1500)
    } catch {
      setCopied(`${which}-fail`)
      setTimeout(() => setCopied(''), 2500)
    }
  }

  const saveRound = () => {
    if (!complete || savedNow) return
    const next: Saved = {
      ...saved,
      [s.id]: [{ total, at: new Date().toISOString().slice(0, 10), difficulty }, ...history].slice(
        0,
        5
      ),
    }
    setSaved(next)
    setSavedNow(true)
    try {
      window.localStorage.setItem(STORE, JSON.stringify(next))
    } catch {
      /* storage off: keep in memory only */
    }
  }

  const field =
    'mt-1 w-full min-w-0 rounded-lg border border-border-input bg-surface px-3 py-2 text-small text-fg focus:outline-none focus:ring-2 focus:ring-signal'
  const pill = (on: boolean) =>
    `inline-flex h-9 items-center rounded-full px-3 text-small font-medium transition-colors duration-fast ${
      on ? 'bg-fg text-bg' : 'bg-muted text-fg-2 hover:text-fg'
    }`

  return (
    <section
      aria-label="Hinglish sales roleplay drill"
      className="not-prose my-8 rounded-2xl border border-border bg-surface p-4 md:p-6"
    >
      <div className="font-mono text-kicker uppercase tracking-[0.08em] text-signal-strong">
        Free tool · No AI · Scores stay in this browser
      </div>
      <div className="mt-2 text-h4 font-semibold text-fg">Run a Hinglish round in 5 minutes</div>

      <fieldset className="mt-4 min-w-0">
        <legend className="text-small font-medium text-fg">Your sector</legend>
        <div className="mt-1 flex flex-wrap gap-2">
          {SECTORS.map((x) => (
            <button
              key={x.id}
              type="button"
              aria-pressed={sector === x.id}
              className={pill(sector === x.id)}
              onClick={() => {
                setSector(x.id)
                setId(SCENARIOS.filter((y) => y.sector === x.id)[0].id)
              }}
            >
              {x.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <label className="block min-w-0 text-small font-medium text-fg md:col-span-2">
          Objection
          <select className={field} value={s.id} onChange={(e) => setId(e.target.value)}>
            {inSector.map((x) => (
              <option key={x.id} value={x.id}>
                {x.n}. {x.gloss}
              </option>
            ))}
          </select>
        </label>
        <fieldset className="min-w-0">
          <legend className="text-small font-medium text-fg">Difficulty</legend>
          <div className="mt-1 flex flex-wrap gap-2">
            {(Object.keys(DIFF) as Difficulty[]).map((k) => (
              <button
                key={k}
                type="button"
                aria-pressed={difficulty === k}
                className={pill(difficulty === k)}
                onClick={() => setDifficulty(k)}
              >
                {DIFF[k].label}
              </button>
            ))}
          </div>
        </fieldset>
      </div>
      <p className="mt-2 text-caption text-fg-3">{d.note}</p>

      <div className="mt-4 rounded-xl border border-border px-4 py-3">
        <div className="text-caption text-fg-3">The buyer opens with</div>
        <div className="mt-1 text-body font-semibold text-fg">“{s.line}”</div>
        <div className="mt-1 text-caption text-fg-3">
          {s.gloss} · {ORIGIN_LABEL[s.origin]}
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="min-w-0 rounded-xl bg-muted p-4">
          <div className="flex items-center justify-between gap-2">
            <div className="font-mono text-kicker uppercase tracking-[0.08em] text-fg-2">
              Buyer card · buyer only
            </div>
            <button
              type="button"
              className="text-caption font-medium text-signal-strong underline"
              onClick={() => copy(buyerText, 'buyer')}
            >
              {copied === 'buyer' ? 'Copied' : copied === 'buyer-fail' ? 'Select and copy' : 'Copy'}
            </button>
          </div>
          {showBuyer ? (
            <div className="mt-2 whitespace-pre-wrap break-words text-small leading-relaxed text-fg">
              {buyerText}
            </div>
          ) : (
            <p className="mt-2 text-small text-fg-2">
              Hidden, so the rep does not see the real reason.{' '}
              <button
                type="button"
                className="font-medium text-signal-strong underline"
                onClick={() => setShowBuyer(true)}
              >
                Show buyer card
              </button>
            </p>
          )}
          {showBuyer && (
            <button
              type="button"
              className="mt-2 text-caption font-medium text-signal-strong underline"
              onClick={() => setShowBuyer(false)}
            >
              Hide buyer card
            </button>
          )}
        </div>
        <div className="min-w-0 rounded-xl border border-border p-4">
          <div className="flex items-center justify-between gap-2">
            <div className="font-mono text-kicker uppercase tracking-[0.08em] text-signal-strong">
              Rep card
            </div>
            <button
              type="button"
              className="text-caption font-medium text-signal-strong underline"
              onClick={() => copy(repText, 'rep')}
            >
              {copied === 'rep' ? 'Copied' : copied === 'rep-fail' ? 'Select and copy' : 'Copy'}
            </button>
          </div>
          <div className="mt-2 whitespace-pre-wrap break-words text-small leading-relaxed text-fg">
            {repText}
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <div role="timer" className="min-w-[5.5rem] font-mono text-h3 tabular-nums text-fg">
          {fmt(left ?? minutes * 60)}
        </div>
        <span className="sr-only" aria-live="assertive">
          {left === 0 ? 'Time is up. Stop and score.' : ''}
        </span>
        <button
          type="button"
          className="inline-flex h-11 items-center rounded-full bg-signal px-5 text-small font-semibold text-white hover:bg-signal-strong"
          onClick={() => {
            if (left === null || left === 0) setLeft(minutes * 60)
            setRunning((r) => !r || left === 0)
          }}
        >
          {running ? 'Pause' : left !== null && left > 0 ? 'Resume' : 'Start the round'}
        </button>
        <button
          type="button"
          className="inline-flex h-11 items-center rounded-full bg-surface px-5 text-small font-semibold text-fg ring-1 ring-inset ring-border-strong hover:bg-muted"
          onClick={() => {
            setRunning(false)
            setLeft(null)
          }}
        >
          Reset
        </button>
        {left === 0 && <span className="text-small text-fg-2">Time. Stop and score.</span>}
      </div>

      <div className="mt-6">
        <div className="text-small font-semibold text-fg">Score the round together</div>
        <div className="mt-2 space-y-3">
          {RUBRIC.map((r) => (
            <fieldset
              key={r.id}
              role="radiogroup"
              aria-label={r.name}
              className="min-w-0 rounded-lg border border-border p-3"
            >
              <legend className="px-1 text-small font-medium text-fg">{r.name}</legend>
              <div className="mt-1 grid gap-2 md:grid-cols-3">
                {LEVEL_POINTS.map((p, i) => {
                  const on = scores[r.id] === p
                  return (
                    <button
                      key={p}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => {
                        setScores((v) => ({ ...v, [r.id]: p }))
                        setSavedNow(false)
                      }}
                      className={`min-w-0 rounded-lg px-3 py-2 text-left text-caption transition-colors duration-fast ${
                        on
                          ? 'bg-signal-tint text-fg ring-2 ring-inset ring-signal'
                          : 'bg-muted text-fg-2 hover:text-fg'
                      }`}
                    >
                      <span className="font-semibold tabular-nums text-fg">{p}</span> ·{' '}
                      {r.levels[i]}
                    </button>
                  )
                })}
              </div>
            </fieldset>
          ))}
        </div>

        <div className="mt-4 rounded-xl bg-signal-tint p-4" aria-live="polite">
          <div className="text-small text-fg">
            <span className="font-semibold tabular-nums">
              {complete ? total : '–'} / {MAX_SCORE}
            </span>{' '}
            {complete
              ? scores.rule === 1
                ? 'Rule breached: this round fails whatever the total. Rerun it now.'
                : verdict(total)
              : `Pick a level on all ${RUBRIC.length} lines to see the total.`}
          </div>
          <div className="mt-3 flex flex-wrap gap-3">
            <button
              type="button"
              disabled={!complete || savedNow}
              onClick={saveRound}
              className="inline-flex min-h-10 items-center rounded-full bg-surface px-4 py-2 text-small font-semibold text-fg ring-1 ring-inset ring-border-strong hover:bg-muted disabled:opacity-50"
            >
              {savedNow ? 'Saved on this device' : 'Save this round on this device'}
            </button>
            <a
              href={TTAI_URL}
              className="inline-flex min-h-10 items-center rounded-full bg-signal px-4 py-2 text-center text-small font-semibold text-white hover:bg-signal-strong"
            >
              Practise this buyer by voice (Tough Tongue AI, our product)
            </a>
          </div>
          {history.length > 0 && (
            <div className="mt-3 text-caption text-fg-2">
              Your last rounds of this objection:{' '}
              {history
                .map(
                  (h) =>
                    `${h.total}/${MAX_SCORE} (${DIFF[h.difficulty]?.label ?? h.difficulty}, ${h.at})`
                )
                .join(' · ')}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
