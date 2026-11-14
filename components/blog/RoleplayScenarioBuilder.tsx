'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import {
  SCENARIOS,
  GROUPS,
  RUBRIC,
  LEVEL_POINTS,
  MAX_SCORE,
  DIFFICULTY,
  INDUSTRIES,
  TTAI_URL,
  verdict,
  type Difficulty,
  type Industry,
} from '@/data/roleplayScenarios'

const STORE = 'aia-roleplay-scores-v1'

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
 * Builds a buyer card and a rep card for one scenario, runs the round timer and scores the round
 * on the 4-line rubric. No AI, nothing sent anywhere; scores stay in this browser.
 */
export default function RoleplayScenarioBuilder() {
  const [id, setId] = useState(SCENARIOS[0].id)
  const [difficulty, setDifficulty] = useState<Difficulty>('medium')
  const [industry, setIndustry] = useState<Industry>('general')
  const [scores, setScores] = useState<Record<string, number>>({})
  const [saved, setSaved] = useState<Saved>({})
  const [left, setLeft] = useState<number | null>(null)
  const [running, setRunning] = useState(false)
  const [copied, setCopied] = useState('')
  const [showBuyer, setShowBuyer] = useState(false)
  const [savedNow, setSavedNow] = useState(false)
  const tick = useRef<ReturnType<typeof setInterval> | null>(null)

  const s = SCENARIOS.find((x) => x.id === id) ?? SCENARIOS[0]
  const d = DIFFICULTY[difficulty]
  const ind = INDUSTRIES[industry]
  const minutes = Math.max(2, s.minutes + d.minutesDelta)

  useEffect(() => setSaved(load()), [])

  // New scenario or difficulty: reset the round.
  useEffect(() => {
    setScores({})
    setRunning(false)
    setLeft(null)
    setSavedNow(false)
    setShowBuyer(false)
  }, [id, difficulty])

  useEffect(() => {
    if (left === 0) setRunning(false)
  }, [left])

  useEffect(() => {
    if (!running) return
    tick.current = setInterval(() => {
      setLeft((v) => {
        if (v === null || v <= 0) return v
        return v - 1
      })
    }, 1000)
    return () => {
      if (tick.current) clearInterval(tick.current)
    }
  }, [running])

  const total = RUBRIC.reduce((sum, r) => sum + (scores[r.id] ?? 0), 0)
  const complete = RUBRIC.every((r) => scores[r.id])
  const history = saved[id] ?? []

  const buyerText = useMemo(
    () =>
      [
        `BUYER CARD: ${s.title} (${d.label})`,
        `You are: ${s.buyer.role}`,
        ind.context ? ind.context : '',
        `You say: "${s.line}"`,
        `Situation: ${s.buyer.situation}`,
        `What is really going on: ${s.buyer.hidden}`,
        `Warm up only if: ${s.buyer.warmsIf}`,
        d.repeats > 0
          ? `Repeat the objection ${d.repeats === 1 ? 'once' : 'twice'} before warming up, even if the rep does it right.`
          : '',
        difficulty === 'hard' ? 'Interrupt the rep once in the first minute.' : '',
        `End the call if: ${s.buyer.endsIf}`,
      ]
        .filter(Boolean)
        .join('\n'),
    [s, d, ind, difficulty]
  )

  const repText = useMemo(
    () =>
      [
        `REP CARD: ${s.title} (${d.label}, ${minutes} min)`,
        `Goal: ${s.rep.goal}`,
        `Must do: ${s.rep.mustDo}`,
        `A winning round ends with: ${s.rep.win}`,
        ind.context ? `Market: ${ind.label}` : '',
      ]
        .filter(Boolean)
        .join('\n'),
    [s, d, ind, minutes]
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
      [id]: [{ total, at: new Date().toISOString().slice(0, 10), difficulty }, ...history].slice(
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
    'mt-1 w-full rounded-lg border border-border-input bg-surface px-3 py-2 text-small text-fg focus:outline-none focus:ring-2 focus:ring-signal'
  const pill = (on: boolean) =>
    `inline-flex h-9 items-center rounded-full px-3 text-small font-medium transition-colors duration-fast ${
      on ? 'bg-fg text-bg' : 'bg-muted text-fg-2 hover:text-fg'
    }`

  return (
    <section
      aria-label="Sales roleplay scenario builder"
      className="not-prose my-8 rounded-2xl border border-border bg-surface p-4 md:p-6"
    >
      <div className="font-mono text-kicker uppercase tracking-[0.08em] text-signal-strong">
        Free tool · No AI · Scores stay in this browser
      </div>
      <div className="mt-2 text-h4 font-semibold text-fg">Build a roleplay round in 30 seconds</div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <label className="block text-small font-medium text-fg md:col-span-1">
          Scenario
          <select className={field} value={id} onChange={(e) => setId(e.target.value)}>
            {GROUPS.map((g) => (
              <optgroup key={g.id} label={g.label}>
                {SCENARIOS.filter((x) => x.group === g.id).map((x) => (
                  <option key={x.id} value={x.id}>
                    {x.n}. {x.title.replace(/[“”]/g, '')}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>
        <label className="block text-small font-medium text-fg">
          Your market
          <select
            className={field}
            value={industry}
            onChange={(e) => setIndustry(e.target.value as Industry)}
          >
            {(Object.keys(INDUSTRIES) as Industry[]).map((k) => (
              <option key={k} value={k}>
                {INDUSTRIES[k].label}
              </option>
            ))}
          </select>
        </label>
        <fieldset>
          <legend className="text-small font-medium text-fg">Difficulty</legend>
          <div className="mt-1 flex flex-wrap gap-2">
            {(Object.keys(DIFFICULTY) as Difficulty[]).map((k) => (
              <button
                key={k}
                type="button"
                aria-pressed={difficulty === k}
                className={pill(difficulty === k)}
                onClick={() => setDifficulty(k)}
              >
                {DIFFICULTY[k].label}
              </button>
            ))}
          </div>
        </fieldset>
      </div>
      <p className="mt-2 text-caption text-fg-3">{d.note}</p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl bg-muted p-4">
          <div className="flex items-center justify-between gap-2">
            <div className="font-mono text-kicker uppercase tracking-[0.08em] text-fg-2">
              Buyer card · give to the buyer only
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
            <div className="mt-2 whitespace-pre-wrap text-small leading-relaxed text-fg">
              {buyerText}
            </div>
          ) : (
            <p className="mt-2 text-small text-fg-2">
              Hidden, so the rep does not see the hidden reason.{' '}
              <button
                type="button"
                className="font-medium text-signal-strong underline"
                onClick={() => setShowBuyer(true)}
              >
                Show buyer card
              </button>
            </p>
          )}
        </div>
        <div className="rounded-xl border border-border p-4">
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
          <div className="mt-2 whitespace-pre-wrap text-small leading-relaxed text-fg">
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
        <div className="text-small font-semibold text-fg">
          Score the round (agree one score with the buyer and observer)
        </div>
        <div className="mt-2 space-y-3">
          {RUBRIC.map((r) => (
            <fieldset key={r.id} role="radiogroup" className="rounded-lg border border-border p-3">
              <legend className="px-1 text-small font-medium text-fg">
                {r.name}
                {r.id === 'mustdo' && (
                  <span className="font-normal text-fg-2">: {s.rep.mustDo}</span>
                )}
              </legend>
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
                      className={`rounded-lg px-3 py-2 text-left text-caption transition-colors duration-fast ${
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
              ? verdict(total)
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
              Practise this buyer out loud (Tough Tongue AI, our product)
            </a>
          </div>
          {history.length > 0 && (
            <div className="mt-3 text-caption text-fg-2">
              Your last rounds of this scenario:{' '}
              {history
                .map(
                  (h) =>
                    `${h.total}/${MAX_SCORE} (${DIFFICULTY[h.difficulty]?.label ?? h.difficulty}, ${h.at})`
                )
                .join(' · ')}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
