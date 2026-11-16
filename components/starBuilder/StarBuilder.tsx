'use client'

import Link from 'next/link'
import MockInterviewButton from '@/components/ai/MockInterviewButton'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  analyse,
  DEFAULT_WPM,
  fmtTime,
  type Mode,
  PACES,
  PARTS,
  type PartKey,
  speakerNotes,
  type Status,
  type Story,
  TARGETS,
} from '@/data/starMethod/engine'
import { COMPETENCIES, SAMPLES } from '@/data/starMethod/questions'
import SplitBar, { SEG } from './SplitBar'

const KEY = 'aia.starBuilder.v1'
const kicker = 'font-mono text-kicker uppercase tracking-[0.08em]'
const field =
  'mt-1.5 w-full rounded-lg border border-border-input bg-surface px-3 text-small text-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-strong'
const btn2 =
  'inline-flex h-11 items-center justify-center gap-2 rounded-full bg-surface px-4 text-small font-semibold text-fg ring-1 ring-inset ring-border-strong transition-colors duration-fast hover:bg-muted disabled:opacity-50'
const btn1 =
  'inline-flex h-11 items-center justify-center gap-2 rounded-full bg-signal px-5 text-small font-semibold text-white shadow-e1 transition-colors duration-fast hover:bg-signal-strong disabled:opacity-50'

const BLANK: Story = { id: '', title: '', tags: [], s: '', t: '', a: '', r: '' }

const STATUS: Record<Status, { label: string; cls: string; icon: string }> = {
  pass: { label: 'Pass', cls: 'bg-success-soft text-success-strong', icon: 'M3.5 8.5l3 3 6-7' },
  warn: { label: 'Fix', cls: 'bg-warn-soft text-warn', icon: 'M8 4v5M8 11.5v.5' },
  fail: {
    label: 'Fix first',
    cls: 'bg-danger-soft text-danger',
    icon: 'M4.5 4.5l7 7M11.5 4.5l-7 7',
  },
}

interface Saved {
  draft: Story
  stories: Story[]
  wpm: number
  mode: Mode
}

function newId() {
  return `s${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`
}

export default function StarBuilder() {
  const [draft, setDraft] = useState<Story>(BLANK)
  const [stories, setStories] = useState<Story[]>([])
  const [wpm, setWpm] = useState(DEFAULT_WPM)
  const [mode, setMode] = useState<Mode>('standard')
  const [questionId, setQuestionId] = useState(COMPETENCIES[0].id)
  const [loaded, setLoaded] = useState(false)
  const [note, setNote] = useState('')
  // read-aloud timer
  const [running, setRunning] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [measured, setMeasured] = useState<number | null>(null)
  const startRef = useRef(0)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY)
      if (raw) {
        const v = JSON.parse(raw) as Partial<Saved>
        if (v.draft)
          setDraft({ ...BLANK, ...v.draft, tags: Array.isArray(v.draft.tags) ? v.draft.tags : [] })
        if (Array.isArray(v.stories))
          setStories(
            v.stories
              .filter((x) => x && typeof x === 'object')
              .map((x) => ({ ...BLANK, ...x, tags: Array.isArray(x.tags) ? x.tags : [] }))
          )
        if (typeof v.wpm === 'number' && v.wpm >= 60 && v.wpm <= 260) setWpm(v.wpm)
        if (v.mode === 'amazon' || v.mode === 'standard') setMode(v.mode)
      }
    } catch {
      /* private mode or blocked storage: the tool still works, it just won't remember */
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    try {
      localStorage.setItem(KEY, JSON.stringify({ draft, stories, wpm, mode } satisfies Saved))
    } catch {
      /* ignore */
    }
  }, [draft, stories, wpm, mode, loaded])

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => setElapsed((Date.now() - startRef.current) / 1000), 250)
    return () => clearInterval(id)
  }, [running])

  useEffect(() => {
    if (!note) return
    const id = setTimeout(() => setNote(''), 3500)
    return () => clearTimeout(id)
  }, [note])

  const res = useMemo(() => analyse(draft, wpm, mode), [draft, wpm, mode])
  const target = TARGETS[mode]
  const q = COMPETENCIES.find((c) => c.id === questionId) ?? COMPETENCIES[0]

  const set = (k: keyof Story, v: string) => setDraft((d) => ({ ...d, [k]: v }))
  const toggleTag = (id: string) =>
    setDraft((d) => ({
      ...d,
      tags: d.tags.includes(id) ? d.tags.filter((t) => t !== id) : [...d.tags, id],
    }))

  // Is there typing that would be lost? (non-empty and different from its saved copy)
  const dirty = () => {
    if (analyse(draft).empty) return false
    const saved = stories.find((x) => x.id === draft.id)
    if (!saved) return true
    return (['title', 's', 't', 'a', 'r'] as const).some((k) => saved[k] !== draft[k])
  }
  const okToReplace = () =>
    !dirty() || window.confirm('Replace the story you are writing? Unsaved changes will be lost.')

  const loadSample = (i: number) => {
    if (!okToReplace()) return
    const s = SAMPLES[i]
    setDraft({ ...s, id: '' })
    setNote(`Loaded the sample: ${s.label}. Edit it, or clear it and write your own.`)
  }

  const save = () => {
    if (res.empty) return
    const firstWords = (draft.s.trim() || draft.a.trim()).split(/\s+/).slice(0, 6).join(' ')
    const title = draft.title.trim() || `${firstWords}…`
    const story: Story = {
      ...draft,
      title,
      tags: draft.tags.length ? draft.tags : [questionId],
      id: draft.id || newId(),
      updated: new Date().toISOString().slice(0, 10),
    }
    setStories((all) => {
      const i = all.findIndex((x) => x.id === story.id)
      if (i === -1) return [story, ...all].slice(0, 50)
      const next = [...all]
      next[i] = story
      return next
    })
    setDraft(story)
    setNote(`Saved “${title}” to your story bank on this device.`)
  }

  const startNew = () => {
    if (!okToReplace()) return
    setDraft(BLANK)
    setNote('New blank story. Your saved stories are below.')
  }

  const copyNotes = async () => {
    try {
      await navigator.clipboard.writeText(speakerNotes(draft))
      setNote('Speaker notes copied: one line per part, so you remember the story, not a script.')
    } catch {
      setNote('Could not copy here. Select the text in the boxes and copy it instead.')
    }
  }

  const timer = () => {
    if (!running) {
      startRef.current = Date.now()
      setElapsed(0)
      setMeasured(null)
      setRunning(true)
      return
    }
    setRunning(false)
    const sec = (Date.now() - startRef.current) / 1000
    setElapsed(sec)
    if (sec >= 10 && res.totalWords >= 20) {
      const pace = Math.round(res.totalWords / (sec / 60))
      if (pace >= 60 && pace <= 260) {
        setMeasured(pace)
        setWpm(pace)
        setNote(`You spoke at about ${pace} words a minute. Times now use your pace.`)
        return
      }
    }
    setNote(
      sec < 10
        ? 'Read the whole answer aloud (at least 10 seconds), then press stop.'
        : `That was too ${res.totalWords / (sec / 60) > 260 ? 'quick' : 'slow'} for ${res.totalWords} words. Read the whole answer once, at interview speed, then press stop.`
    )
  }

  const covered = COMPETENCIES.map((c) => ({
    c,
    by: stories.filter((s) => s.tags.includes(c.id)),
  }))
  const coveredN = covered.filter((x) => x.by.length > 0).length
  const paces = !PACES.some((p) => p.wpm === wpm)
    ? [...PACES, { wpm, label: `Your measured pace, ${wpm} words a minute` }]
    : PACES

  const t = Math.round(res.seconds)
  const scaleMax = target.hardMax + 30
  const pos = (sec: number) => `${Math.min(100, (sec / scaleMax) * 100)}%`

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
      {/* ---------- Left: the answer ---------- */}
      <div className="min-w-0 space-y-5 lg:col-span-7">
        <div className="rounded-xl border border-border bg-surface p-4 md:p-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block min-w-0 sm:col-span-2">
              <span className="text-small font-medium text-fg">Question you are answering</span>
              <select
                value={questionId}
                onChange={(e) => setQuestionId(e.target.value)}
                className={`${field} h-11 pr-9`}
              >
                {COMPETENCIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}: {c.question}
                  </option>
                ))}
              </select>
            </label>
            <label className="block min-w-0">
              <span className="text-small font-medium text-fg">Interview style</span>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as Mode)}
                className={`${field} h-11 pr-9`}
              >
                <option value="standard">Most interviews: 1 to 2 min</option>
                <option value="amazon">Amazon loop: 2 to 3 min</option>
              </select>
            </label>
            <label className="block min-w-0">
              <span className="text-small font-medium text-fg">Speaking pace</span>
              <select
                value={wpm}
                onChange={(e) => setWpm(Number(e.target.value))}
                className={`${field} h-11 pr-9`}
              >
                {paces.map((p) => (
                  <option key={p.wpm} value={p.wpm}>
                    {p.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <p className="mt-3 text-caption text-fg-3">
            Amazon principles this question often maps to (our mapping): {q.lp.join(' and ')}. Tip:
            the story is saved under this question unless you tick others below.
            {q.href && (
              <>
                {' '}
                <Link
                  href={q.href}
                  className="font-medium text-signal-strong underline decoration-signal/30 underline-offset-2"
                >
                  Model answers for this question
                </Link>
              </>
            )}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-caption text-fg-3">Try a sample:</span>
            {SAMPLES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => loadSample(i)}
                className="inline-flex h-9 items-center rounded-full bg-muted px-3 text-caption font-medium text-fg-2 transition-colors duration-fast hover:bg-signal-tint hover:text-signal-ink"
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <label className="block">
          <span className="text-small font-medium text-fg">Story name (for your story bank)</span>
          <input
            type="text"
            value={draft.title}
            maxLength={80}
            placeholder="e.g. Refund report the night before the review"
            onChange={(e) => set('title', e.target.value)}
            className={`${field} h-11`}
          />
        </label>

        {PARTS.map((p) => {
          const w = res.words[p.key]
          const sec = res.totalWords ? (w / wpm) * 60 : 0
          return (
            <div key={p.key} className="rounded-xl border border-border bg-surface p-4 md:p-5">
              <label htmlFor={`star-${p.key}`} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-small font-semibold ${SEG[p.key]}`}
                >
                  {p.letter}
                </span>
                <span className="min-w-0">
                  <span className="block text-body font-semibold text-fg">
                    {p.name}{' '}
                    <span className="font-normal text-fg-3">· aim for about {p.target}%</span>
                  </span>
                  <span className="block text-small text-fg-2">{p.hint}</span>
                </span>
              </label>
              <textarea
                id={`star-${p.key}`}
                rows={p.key === 'a' ? 6 : 3}
                value={draft[p.key]}
                onChange={(e) => set(p.key, e.target.value)}
                className={`${field} py-2.5 leading-relaxed`}
              />
              <div className="mt-2 flex flex-wrap justify-between gap-2 text-caption tabular-nums text-fg-3">
                <span>
                  {w} word{w === 1 ? '' : 's'} · about {fmtTime(sec)}
                </span>
                <span>{res.totalWords ? `${res.share[p.key]}% of the answer` : ''}</span>
              </div>
            </div>
          )
        })}

        <fieldset className="min-w-0 rounded-xl border border-border bg-surface p-4 md:p-5">
          <legend className="px-1 text-small font-medium text-fg">
            Which questions could this story answer?
          </legend>
          <p className="text-caption text-fg-3">
            One good story often answers two or three. Tick them to fill your coverage map.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {COMPETENCIES.map((c) => {
              const on = draft.tags.includes(c.id)
              return (
                <label
                  key={c.id}
                  className={`inline-flex h-9 cursor-pointer items-center gap-2 rounded-full px-3 text-caption font-medium ring-1 ring-inset transition-colors duration-fast has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-signal-strong ${
                    on
                      ? 'bg-signal-tint text-signal-ink ring-signal/30'
                      : 'bg-surface text-fg-2 ring-border-strong hover:bg-muted'
                  }`}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={on}
                    onChange={() => toggleTag(c.id)}
                  />
                  <span aria-hidden="true">{on ? '✓' : '+'}</span>
                  {c.name}
                </label>
              )
            })}
          </div>
        </fieldset>

        <a
          href="#live-report"
          className="sticky bottom-3 z-30 flex items-center justify-between gap-3 rounded-full border border-border bg-surface px-4 py-2.5 text-small shadow-e2 lg:hidden"
        >
          <span className="tabular-nums text-fg">
            <span className="font-semibold">{fmtTime(res.seconds)}</span>
            <span className="text-fg-2">
              {' '}
              · {res.empty ? 'start writing' : `${res.passed} of ${res.checks.length} checks pass`}
            </span>
          </span>
          <span className="font-semibold text-signal-strong">See report ↓</span>
        </a>

        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={save} disabled={res.empty} className={btn1}>
            {draft.id ? 'Update in story bank' : 'Save to story bank'}
          </button>
          <button type="button" onClick={copyNotes} disabled={res.empty} className={btn2}>
            Copy speaker notes
          </button>
          <button type="button" onClick={startNew} className={btn2}>
            New story
          </button>
        </div>
        <p aria-live="polite" className="min-h-[1.5rem] text-small text-fg-2">
          {note}
        </p>
      </div>

      {/* ---------- Right: live report ---------- */}
      <aside
        id="live-report"
        aria-label="Live report"
        className="min-w-0 scroll-mt-32 lg:col-span-5"
      >
        <div className="space-y-5 rounded-2xl border border-border bg-surface p-5 shadow-e1 md:p-6 lg:sticky lg:top-32">
          <div>
            <div className={`${kicker} text-fg-3`}>Out loud, at {wpm} words a minute</div>
            <div className="mt-2 flex items-baseline gap-3">
              <span className="text-[2.75rem] font-semibold tabular-nums leading-none text-fg">
                {fmtTime(res.seconds)}
              </span>
              <span className="text-small text-fg-2">
                {res.totalWords} words · target {target.label}
              </span>
            </div>
            {/* time scale with the target band */}
            <div className="relative mt-4 h-3 rounded-full bg-muted" aria-hidden="true">
              <div
                className="absolute inset-y-0 rounded-full bg-success-soft ring-1 ring-inset ring-success/30"
                style={{
                  left: pos(target.min),
                  width: `calc(${pos(target.max)} - ${pos(target.min)})`,
                }}
              />
              <div
                className="absolute top-1/2 h-5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fg transition-[left] duration-slow ease-standard"
                style={{ left: pos(t) }}
              />
            </div>
            <div className="mt-1.5 flex justify-between text-caption tabular-nums text-fg-3">
              <span>0:00</span>
              <span>
                target {fmtTime(target.min)}–{fmtTime(target.max)}
              </span>
              <span>{fmtTime(scaleMax)}</span>
            </div>
          </div>

          <div>
            <div className="flex items-baseline justify-between gap-2">
              <div className={`${kicker} text-fg-3`}>Time split</div>
            </div>
            <div className="mt-2">
              <SplitBar words={res.words} />
            </div>
          </div>

          <div>
            <div className="flex items-baseline justify-between gap-2">
              <div className={`${kicker} text-fg-3`}>Checks</div>
              <div className="text-small font-semibold tabular-nums text-fg">
                {res.empty ? 'Start writing' : `${res.passed} of ${res.checks.length} pass`}
              </div>
            </div>
            <ul className="mt-2 divide-y divide-border">
              {res.checks.map((c) => {
                const st = res.empty ? null : STATUS[c.status]
                return (
                  <li key={c.id} className="flex gap-3 py-2.5">
                    <span
                      className={`mt-0.5 inline-flex h-6 shrink-0 items-center gap-1 rounded-full px-2 text-caption font-semibold ${
                        st ? st.cls : 'bg-muted text-fg-3'
                      }`}
                    >
                      {st && (
                        <svg
                          viewBox="0 0 16 16"
                          className="h-3 w-3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          aria-hidden="true"
                        >
                          <path d={st.icon} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                      {st ? st.label : '—'}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-small font-medium text-fg">{c.title}</span>
                      {!res.empty && (
                        <span className="block text-caption text-fg-2">{c.detail}</span>
                      )}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="rounded-xl bg-muted p-4">
            <div className="text-small font-semibold text-fg">Read it aloud and time it</div>
            <p className="mt-1 text-caption text-fg-2">
              Press start, read your answer at interview speed, press stop. We work out your real
              pace. Nothing is recorded.
            </p>
            <div className="mt-3 flex items-center gap-3">
              <button
                type="button"
                onClick={timer}
                disabled={!running && res.totalWords < 20}
                className={btn2}
              >
                <span
                  aria-hidden="true"
                  className={`h-2.5 w-2.5 rounded-full ${running ? 'animate-pulse bg-danger' : 'bg-fg-3'}`}
                />
                {running ? 'Stop' : 'Start reading'}
              </button>
              <span className="text-h3 font-semibold tabular-nums text-fg" aria-live="off">
                {fmtTime(elapsed)}
              </span>
            </div>
            {measured && (
              <div className="mt-3 space-y-3">
                <p className="text-caption text-fg-2">
                  Your pace: {measured} words a minute, so this answer runs {fmtTime(res.seconds)}.{' '}
                  {measured > 170
                    ? 'That is faster than our “quick” setting; pause for a breath between Situation, Action and Result.'
                    : 'Pause for a breath between Situation, Action and Result.'}
                </p>
                <div>
                  <div className="text-small font-semibold text-fg">
                    Now be ready for follow-ups
                  </div>
                  <ul className="mt-1 list-disc space-y-0.5 pl-5 text-caption text-fg-2">
                    <li>What exactly was your part, and what did others do?</li>
                    <li>What would you do differently next time?</li>
                    <li>How do you know the result came from what you did?</li>
                  </ul>
                </div>
                <MockInterviewButton caption={false} label="Say it to an interviewer" />
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* ---------- Story bank ---------- */}
      <div id="story-bank" className="scroll-mt-32 lg:col-span-12">
        <div className="rounded-2xl border border-border bg-surface p-5 md:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <div>
              <div className={`${kicker} text-signal-strong`}>
                Your story bank · saved on this device
              </div>
              <h3 className="mt-2 text-h3 font-semibold text-fg">
                {stories.length
                  ? `${stories.length} stor${stories.length === 1 ? 'y covers' : 'ies cover'} ${coveredN} of ${COMPETENCIES.length} common questions`
                  : 'Save 3 to 5 stories and most questions are covered'}
              </h3>
            </div>
            {stories.length > 0 && (
              <span className="text-caption text-fg-3">
                MIT CAPD suggests preparing 3 to 5 stories.
              </span>
            )}
          </div>

          {stories.length === 0 ? (
            <div className="mt-5 rounded-xl border border-dashed border-border-strong p-6 text-center">
              <p className="text-small font-medium text-fg">No saved stories yet</p>
              <p className="mx-auto mt-1 max-w-md text-caption text-fg-2">
                Write one above (or load a sample) and press “Save to story bank”. Stories stay in
                this browser only; nothing is uploaded.
              </p>
            </div>
          ) : (
            <ul className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
              {stories.map((s) => {
                const a = analyse(s, wpm, mode)
                return (
                  <li key={s.id} className="min-w-0 rounded-xl border border-border p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="truncate text-small font-semibold text-fg">{s.title}</div>
                        <div className="mt-0.5 text-caption tabular-nums text-fg-3">
                          {fmtTime(a.seconds)} · {a.passed} of {a.checks.length} checks
                          {s.updated ? ` · saved ${s.updated}` : ''}
                        </div>
                      </div>
                      <div className="flex shrink-0 gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            if (s.id !== draft.id && !okToReplace()) return
                            setDraft(s)
                            setNote(`Editing “${s.title}”.`)
                            document
                              .getElementById('builder')
                              ?.scrollIntoView({ behavior: 'smooth' })
                            setTimeout(
                              () =>
                                document.getElementById('star-s')?.focus({ preventScroll: true }),
                              400
                            )
                          }}
                          className="inline-flex h-9 items-center rounded-full px-3 text-caption font-semibold text-signal-strong hover:bg-signal-tint"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (!window.confirm(`Delete “${s.title}” from this device?`)) return
                            setStories((all) => all.filter((x) => x.id !== s.id))
                            if (draft.id === s.id) setDraft({ ...draft, id: '' })
                          }}
                          className="inline-flex h-9 items-center rounded-full px-3 text-caption font-medium text-fg-2 hover:bg-muted"
                          aria-label={`Delete ${s.title}`}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    {s.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {s.tags.map((tg) => (
                          <span
                            key={tg}
                            className="inline-flex h-6 items-center rounded-full bg-muted px-2.5 text-caption text-fg-2"
                          >
                            {COMPETENCIES.find((c) => c.id === tg)?.name ?? tg}
                          </span>
                        ))}
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          )}

          <div className="mt-6">
            <div className={`${kicker} text-fg-3`}>Coverage map</div>
            <ul className="mt-2 grid grid-cols-1 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
              {covered.map(({ c, by }) => (
                <li key={c.id} className="flex items-start gap-2.5 border-b border-border py-2.5">
                  <span
                    aria-hidden="true"
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
                      by.length ? 'bg-signal text-white' : 'bg-muted text-fg-3'
                    }`}
                  >
                    {by.length ? '✓' : ''}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-small font-medium text-fg">
                      {c.name}
                      <span className="sr-only">{by.length ? ': covered' : ': no story yet'}</span>
                    </span>
                    <span className="block truncate text-caption text-fg-3">
                      {by.length ? by.map((s) => s.title).join(', ') : 'No story yet'}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
