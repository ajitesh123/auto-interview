'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  addWorkingDays,
  BLANK,
  type Channel,
  chars,
  checkMessage,
  connectionNote,
  email,
  emailSubject,
  fmtDate,
  FOLLOW_UP_WORKING_DAYS,
  followUp,
  formBlurb,
  type Inputs,
  linkedinMessage,
  dmWithBlurb,
  emailWithBlurb,
  whatsapp,
  NOTE_FREE,
  NOTE_PREMIUM,
  RELS,
  SAMPLES,
  type Status,
  thankYou,
  words,
} from '@/data/referralMessage/engine'

const KEY = 'aia.referralBuilder.v1'
const kicker = 'font-mono text-kicker uppercase tracking-[0.08em]'
const field =
  'mt-1.5 w-full min-w-0 rounded-lg border border-border-input bg-surface px-3 text-small text-fg placeholder:text-fg-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-strong'
const btn2 =
  'inline-flex h-11 items-center justify-center gap-2 rounded-full bg-surface px-4 text-small font-semibold text-fg ring-1 ring-inset ring-border-strong transition-colors duration-fast hover:bg-muted disabled:opacity-50'
const btn1 =
  'inline-flex h-11 items-center justify-center gap-2 rounded-full bg-signal px-5 text-small font-semibold text-white shadow-e1 transition-colors duration-fast hover:bg-signal-strong disabled:opacity-50'

const STATUS: Record<Status, { label: string; cls: string; icon: string }> = {
  pass: { label: 'Pass', cls: 'bg-success-soft text-success-strong', icon: 'M3.5 8.5l3 3 6-7' },
  warn: { label: 'Fix', cls: 'bg-warn-soft text-warn', icon: 'M8 4v5M8 11.5v.5' },
  fail: {
    label: 'Fix first',
    cls: 'bg-danger-soft text-fg',
    icon: 'M4.5 4.5l7 7M11.5 4.5l-7 7',
  },
}

type Tab = 'note' | 'dm' | 'whatsapp' | 'email' | 'follow'
const TABS: { id: Tab; name: string; when: string }[] = [
  { id: 'note', name: 'Connection note', when: 'Step 1 · with your invite' },
  { id: 'dm', name: 'LinkedIn message', when: 'Step 2 · after they accept' },
  { id: 'whatsapp', name: 'WhatsApp', when: 'If they have your number' },
  { id: 'email', name: 'Email', when: 'If you have their email' },
  {
    id: 'follow',
    name: 'Follow-up',
    when: `Step 3 · after ${FOLLOW_UP_WORKING_DAYS} working days`,
  },
]

type TrackStatus = 'waiting' | 'replied' | 'referred' | 'noreply'
const TRACK: { id: TrackStatus; name: string }[] = [
  { id: 'waiting', name: 'Waiting' },
  { id: 'replied', name: 'Replied' },
  { id: 'referred', name: 'Referred' },
  { id: 'noreply', name: 'No reply: ask someone else' },
]
interface Asked {
  id: string
  name: string
  company: string
  role: string
  sent: string // ISO date
  status: TrackStatus
}

interface Saved {
  inputs: Inputs
  asked: Asked[]
}

function today(): string {
  const d = new Date()
  const off = d.getTimezoneOffset()
  return new Date(d.getTime() - off * 60000).toISOString().slice(0, 10)
}

function Badge({ s }: { s: Status }) {
  const st = STATUS[s]
  return (
    <span
      className={`inline-flex h-6 shrink-0 items-center gap-1 rounded-full px-2 text-caption font-semibold ${st.cls}`}
    >
      <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
        <path d={st.icon} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      {st.label}
    </span>
  )
}

export function Checks({ text, channel }: { text: string; channel: Channel }) {
  const res = checkMessage(text, channel)
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <div className={`${kicker} text-fg-3`}>Checks</div>
        <div className="text-small font-semibold tabular-nums text-fg" aria-live="polite">
          {res.passed} of {res.checks.length} pass
        </div>
      </div>
      <ul className="mt-3 divide-y divide-border rounded-xl border border-border bg-surface">
        {res.checks.map((c) => (
          <li key={c.id} className="flex items-start gap-3 px-4 py-3">
            <Badge s={c.status} />
            <span className="min-w-0">
              <span className="block text-small font-medium text-fg">{c.title}</span>
              <span className="block text-caption text-fg-2">{c.detail}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Character meter for the connection note: free limit, Premium limit, animated fill. */
function NoteMeter({ n }: { n: number }) {
  const pct = Math.min(100, (n / NOTE_PREMIUM) * 100)
  const freePct = (NOTE_FREE / NOTE_PREMIUM) * 100
  const over = n > NOTE_FREE
  return (
    <div className="mt-3">
      <div className="relative h-2 rounded-full bg-muted" aria-hidden="true">
        <div
          className={`absolute inset-y-0 left-0 rounded-full transition-[width] duration-slow ease-out ${over ? 'bg-warn' : 'bg-signal'}`}
          style={{ width: `${pct}%` }}
        />
        <div className="absolute -top-1 h-4 w-px bg-fg-3" style={{ left: `${freePct}%` }} />
      </div>
      <div className="mt-1.5 flex justify-between text-caption tabular-nums text-fg-3">
        <span>
          <span className="font-semibold text-fg">{n}</span> characters
        </span>
        <span>
          free {NOTE_FREE} · Premium {NOTE_PREMIUM}
        </span>
      </div>
    </div>
  )
}

function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className="block min-w-0">
      <span className="text-small font-medium text-fg">{label}</span>
      {hint && <span className="block text-caption text-fg-3">{hint}</span>}
      {children}
    </label>
  )
}

export default function ReferralBuilder() {
  const [inputs, setInputs] = useState<Inputs>(SAMPLES[0].inputs)
  const [asked, setAsked] = useState<Asked[]>([])
  const [tab, setTab] = useState<Tab>('note')
  const [loaded, setLoaded] = useState(false)
  const [note, setNote] = useState('')
  const [own, setOwn] = useState('')
  const [ownCh, setOwnCh] = useState<Channel>('dm')
  const [now, setNow] = useState('')

  useEffect(() => {
    setNow(today())
    try {
      const raw = localStorage.getItem(KEY)
      if (raw) {
        const v = JSON.parse(raw) as Partial<Saved>
        if (v.inputs && typeof v.inputs === 'object') {
          const merged = { ...BLANK, ...v.inputs }
          ;(Object.keys(BLANK) as (keyof Inputs)[]).forEach((k) => {
            if (typeof merged[k] !== typeof BLANK[k])
              (merged as Record<string, unknown>)[k] = BLANK[k]
          })
          if (!RELS.some((r) => r.id === merged.rel)) merged.rel = BLANK.rel
          if (merged.ask !== 'chat' && merged.ask !== 'direct') merged.ask = BLANK.ask
          setInputs(merged)
        }
        if (Array.isArray(v.asked))
          setAsked(
            v.asked
              .filter((x) => x && typeof x === 'object' && typeof x.sent === 'string')
              .map((x) => ({
                ...x,
                status: TRACK.some((t) => t.id === x.status) ? x.status : 'waiting',
              }))
              .slice(0, 100)
          )
      }
    } catch {
      /* private mode or blocked storage: the tool still works, it just won't remember */
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    try {
      localStorage.setItem(KEY, JSON.stringify({ inputs, asked } satisfies Saved))
    } catch {
      /* ignore */
    }
  }, [inputs, asked, loaded])

  useEffect(() => {
    if (!note) return
    const id = setTimeout(() => setNote(''), 3500)
    return () => clearTimeout(id)
  }, [note])

  const out = useMemo(
    () => ({
      note: connectionNote(inputs),
      dm: linkedinMessage(inputs),
      dmFull: dmWithBlurb(inputs),
      wa: whatsapp(inputs),
      emailFull: emailWithBlurb(inputs),
      subject: emailSubject(inputs),
      email: email(inputs),
      blurb: formBlurb(inputs),
      follow: followUp(inputs),
      thanks: thankYou(inputs),
    }),
    [inputs]
  )

  const set = <K extends keyof Inputs>(k: K, v: Inputs[K]) => setInputs((i) => ({ ...i, [k]: v }))

  const copy = async (text: string, what: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setNote(`${what} copied. Read it once before you send it.`)
    } catch {
      setNote('Could not copy here. Select the text and copy it instead.')
    }
  }

  const loadSample = (i: number) => {
    setInputs(SAMPLES[i].inputs)
    setTab(SAMPLES[i].inputs.connected ? 'dm' : 'note')
    setNote(`Loaded: ${SAMPLES[i].label}. Change the details to yours.`)
  }

  const clear = () => {
    setInputs({ ...BLANK, myName: inputs.myName, resumeUrl: inputs.resumeUrl })
    setNote('Cleared. Your name and resume link stay, since they rarely change.')
  }

  const track = () => {
    const name = inputs.theirName.trim()
    if (!name) {
      setNote('Add their name first, so the tracker knows who you asked.')
      return
    }
    const entry: Asked = {
      id: `a${Date.now().toString(36)}`,
      name,
      company: inputs.company.trim(),
      role: inputs.role.trim(),
      sent: now || today(),
      status: 'waiting',
    }
    setAsked((a) => [entry, ...a].slice(0, 100))
    setNote(
      `Added ${name}. Follow up on ${fmtDate(addWorkingDays(entry.sent, FOLLOW_UP_WORKING_DAYS))} if there is no reply.`
    )
  }

  const nameOf = inputs.theirName.trim().split(' ')[0] || 'they'
  const tabIds = TABS.map((t) => t.id)
  const onTabKey = (e: React.KeyboardEvent) => {
    const i = tabIds.indexOf(tab)
    let n = -1
    if (e.key === 'ArrowRight') n = (i + 1) % tabIds.length
    else if (e.key === 'ArrowLeft') n = (i - 1 + tabIds.length) % tabIds.length
    else if (e.key === 'Home') n = 0
    else if (e.key === 'End') n = tabIds.length - 1
    if (n < 0) return
    e.preventDefault()
    setTab(tabIds[n])
    document.getElementById(`ref-tab-${tabIds[n]}`)?.focus()
  }
  const dueFor = (a: Asked) => addWorkingDays(a.sent, FOLLOW_UP_WORKING_DAYS)
  const tabText: Record<Tab, string> = {
    note: out.note,
    dm: out.dmFull,
    whatsapp: out.wa,
    email: `Subject: ${out.subject}\n\n${out.emailFull}`,
    follow: out.follow,
  }
  const checkCh: Channel | null = tab === 'follow' ? null : tab

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      {/* ---------- Inputs ---------- */}
      <form
        id="ref-form"
        className="min-w-0 scroll-mt-32 space-y-6 lg:col-span-5"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Your details"
      >
        <div>
          <div className={`${kicker} text-fg-3`}>Start from a sample (fictional)</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {SAMPLES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => loadSample(i)}
                className="inline-flex min-h-9 items-center rounded-full bg-muted px-3 py-1.5 text-left text-caption font-medium text-fg-2 transition-colors duration-fast hover:bg-signal-tint hover:text-signal-ink"
              >
                {s.label}
              </button>
            ))}
            <button
              type="button"
              onClick={clear}
              className="inline-flex min-h-9 items-center rounded-full px-3 py-1.5 text-caption font-medium text-fg-2 underline decoration-border-strong underline-offset-2 hover:text-fg"
            >
              Clear
            </button>
          </div>
        </div>

        <fieldset className="min-w-0">
          <legend className="text-small font-medium text-fg">Who are you asking?</legend>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {RELS.map((r) => (
              <label
                key={r.id}
                className={`cursor-pointer rounded-xl border px-3 py-2.5 transition-colors duration-fast has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-signal-strong ${
                  inputs.rel === r.id
                    ? 'border-signal bg-signal-tint'
                    : 'border-border bg-surface hover:border-border-strong'
                }`}
              >
                <input
                  type="radio"
                  name="rel"
                  value={r.id}
                  checked={inputs.rel === r.id}
                  onChange={() => set('rel', r.id)}
                  className="sr-only"
                />
                <span className="block text-small font-semibold text-fg">{r.name}</span>
                <span className="block text-caption text-fg-2">{r.hint}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="min-w-0">
          <legend className="text-small font-medium text-fg">What do you ask for first?</legend>
          <div className="mt-2 inline-flex rounded-full bg-muted p-1">
            {(
              [
                ['direct', 'The referral'],
                ['chat', 'A 10-minute chat'],
              ] as const
            ).map(([id, label]) => (
              <label
                key={id}
                className={`cursor-pointer rounded-full px-4 py-2 text-small font-medium transition-colors duration-fast has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-signal-strong ${
                  inputs.ask === id ? 'bg-surface text-fg shadow-e1' : 'text-fg-2 hover:text-fg'
                }`}
              >
                <input
                  type="radio"
                  name="ask"
                  value={id}
                  checked={inputs.ask === id}
                  onChange={() => set('ask', id)}
                  className="sr-only"
                />
                {label}
              </label>
            ))}
          </div>
          <p className="mt-2 text-caption text-fg-3">
            Friends and alumni: ask directly. Senior people and strangers in the US often prefer a
            chat first.
          </p>
        </fieldset>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Their first name">
            <input
              className={`${field} h-11`}
              value={inputs.theirName}
              onChange={(e) => set('theirName', e.target.value)}
              placeholder="Arjun"
              autoComplete="off"
            />
          </Field>
          <Field label="Company">
            <input
              className={`${field} h-11`}
              value={inputs.company}
              onChange={(e) => set('company', e.target.value)}
              placeholder="Company name"
              autoComplete="off"
            />
          </Field>
          <Field label="Role title, as posted">
            <input
              className={`${field} h-11`}
              value={inputs.role}
              onChange={(e) => set('role', e.target.value)}
              placeholder="Data Analyst II"
              autoComplete="off"
            />
          </Field>
          <Field label="Job ID" hint="At the end of the posting">
            <input
              className={`${field} h-11`}
              value={inputs.jobId}
              onChange={(e) => set('jobId', e.target.value)}
              placeholder="JR-48213"
              autoComplete="off"
            />
          </Field>
        </div>
        <Field label="Job link">
          <input
            className={`${field} h-11`}
            type="url"
            inputMode="url"
            value={inputs.jobUrl}
            onChange={(e) => set('jobUrl', e.target.value)}
            placeholder="https://careers.company.com/jobs/…"
            autoComplete="off"
          />
        </Field>
        <Field label="What you share with them" hint="College, old team, a post of theirs you read">
          <input
            className={`${field} h-11`}
            value={inputs.hook}
            onChange={(e) => set('hook', e.target.value)}
            placeholder="we both studied at NIT Trichy"
            autoComplete="off"
          />
        </Field>
        <Field
          label="Why you fit, in one line"
          hint={`Start with "I". One result with a number. ${words(inputs.fit)} words (aim for 15–30).`}
        >
          <textarea
            className={`${field} min-h-[88px] py-2.5`}
            value={inputs.fit}
            onChange={(e) => set('fit', e.target.value)}
            placeholder="I've spent 3 years as an analyst and cut a weekly report from 6 hours to 40 minutes with SQL"
          />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Your name">
            <input
              className={`${field} h-11`}
              value={inputs.myName}
              onChange={(e) => set('myName', e.target.value)}
              placeholder="Priya Nair"
              autoComplete="name"
            />
          </Field>
          <Field label="Resume link" hint="View-only Drive or Dropbox link">
            <input
              className={`${field} h-11`}
              type="url"
              inputMode="url"
              value={inputs.resumeUrl}
              onChange={(e) => set('resumeUrl', e.target.value)}
              placeholder="https://drive.google.com/…"
              autoComplete="off"
            />
          </Field>
        </div>
        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-surface p-3">
          <input
            type="checkbox"
            checked={inputs.connected}
            onChange={(e) => set('connected', e.target.checked)}
            className="mt-0.5 h-5 w-5 shrink-0 accent-signal"
          />
          <span className="min-w-0">
            <span className="block text-small font-medium text-fg">
              We are already connected on LinkedIn
            </span>
            <span className="block text-caption text-fg-2">
              Skips the connection note and opens with &ldquo;Hope you&apos;re well&rdquo;.
            </span>
          </span>
        </label>
        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-surface p-3">
          <input
            type="checkbox"
            checked={inputs.applied}
            onChange={(e) => set('applied', e.target.checked)}
            className="mt-0.5 h-5 w-5 shrink-0 accent-signal"
          />
          <span className="min-w-0">
            <span className="block text-small font-medium text-fg">I have already applied</span>
            <span className="block text-caption text-fg-2">
              Some referral portals may not add you after you apply. The message will say so
              politely.
            </span>
          </span>
        </label>
      </form>

      {/* ---------- Outputs ---------- */}
      <div className="order-first min-w-0 space-y-6 lg:order-none lg:col-span-7">
        <a
          href="#ref-form"
          className="inline-flex text-small font-medium text-signal-strong underline decoration-signal/30 underline-offset-2 lg:hidden"
        >
          A sample is loaded. Put in your details ↓
        </a>
        <div className="rounded-2xl border border-border bg-surface shadow-e1">
          <div
            role="tablist"
            aria-label="Messages"
            className="flex gap-1 overflow-x-auto border-b border-border p-2 sm:flex-wrap"
          >
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                id={`ref-tab-${t.id}`}
                aria-selected={tab === t.id}
                aria-controls="ref-panel"
                tabIndex={tab === t.id ? 0 : -1}
                onKeyDown={onTabKey}
                onClick={() => setTab(t.id)}
                className={`flex shrink-0 flex-col items-start rounded-lg px-3 py-2 text-left transition-colors duration-fast ${
                  tab === t.id ? 'bg-signal-tint' : 'hover:bg-muted'
                }`}
              >
                <span
                  className={`text-small font-semibold ${tab === t.id ? 'text-signal-ink' : 'text-fg'}`}
                >
                  {t.name}
                </span>
                <span className="text-caption text-fg-2">{t.when}</span>
              </button>
            ))}
          </div>

          <div
            role="tabpanel"
            id="ref-panel"
            aria-labelledby={`ref-tab-${tab}`}
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabIndex={0}
            className="p-4 md:p-6"
          >
            {tab === 'note' && (
              <>
                <p className="text-small text-fg-2">
                  {inputs.connected
                    ? 'You are already connected, so skip this and send the LinkedIn message.'
                    : 'Send with your connection request. A free account gets only a few personalised notes, so use them on the people most likely to help.'}
                </p>
                <pre className="mt-3 whitespace-pre-wrap break-words rounded-xl bg-muted p-4 font-sans text-body text-fg">
                  {out.note}
                </pre>
                <NoteMeter n={chars(out.note)} />
              </>
            )}
            {tab === 'dm' && (
              <>
                <p className="text-small text-fg-2">
                  {inputs.connected
                    ? `Send this to ${nameOf === 'they' ? 'them' : nameOf}.`
                    : `Once ${nameOf} ${nameOf === 'they' ? 'accept' : 'accepts'}, send this.`}{' '}
                  {inputs.ask === 'direct' && 'The copy button includes the form summary under it.'}
                </p>
                <pre className="mt-3 whitespace-pre-wrap break-words rounded-xl bg-muted p-4 font-sans text-body text-fg">
                  {out.dm}
                </pre>
                {inputs.ask === 'direct' && (
                  <div className="mt-3 rounded-xl border border-dashed border-border-strong p-4">
                    <div className={`${kicker} text-fg-3`}>For the referral form</div>
                    <p className="mt-1.5 break-words text-small text-fg">{out.blurb}</p>
                    <button
                      type="button"
                      className={`${btn2} mt-3 h-9 text-caption`}
                      onClick={() => copy(out.blurb, 'Form summary')}
                    >
                      Copy summary
                    </button>
                  </div>
                )}
                <p className="mt-2 text-caption tabular-nums text-fg-3">{words(out.dm)} words</p>
              </>
            )}
            {tab === 'whatsapp' && (
              <>
                <p className="text-small text-fg-2">
                  Only for people who already have your number. Shorter than LinkedIn, same facts.
                </p>
                <pre className="mt-3 whitespace-pre-wrap break-words rounded-xl bg-muted p-4 font-sans text-body text-fg">
                  {out.wa}
                </pre>
                <p className="mt-2 text-caption tabular-nums text-fg-3">{words(out.wa)} words</p>
              </>
            )}
            {tab === 'email' && (
              <>
                <div className="rounded-xl border border-border px-4 py-2.5 text-small">
                  <span className="text-fg-3">Subject: </span>
                  <span className="break-words font-medium text-fg">{out.subject}</span>
                </div>
                <pre className="mt-3 whitespace-pre-wrap break-words rounded-xl bg-muted p-4 font-sans text-body text-fg">
                  {out.emailFull}
                </pre>
                <p className="mt-2 text-caption tabular-nums text-fg-3">
                  {words(out.email)} words above the divider
                </p>
              </>
            )}
            {tab === 'follow' && (
              <>
                <p className="text-small text-fg-2">
                  No reply after {FOLLOW_UP_WORKING_DAYS} working days? Send one nudge in the same
                  thread. Still nothing a week later: thank them and ask someone else.
                </p>
                <pre className="mt-3 whitespace-pre-wrap break-words rounded-xl bg-muted p-4 font-sans text-body text-fg">
                  {out.follow}
                </pre>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                  <div className={`${kicker} text-fg-3`}>When they refer you</div>
                  <button
                    type="button"
                    className={`${btn2} h-9 text-caption`}
                    onClick={() => copy(out.thanks, 'Thank-you note')}
                  >
                    Copy thank-you
                  </button>
                </div>
                <pre className="mt-2 whitespace-pre-wrap break-words rounded-xl bg-muted p-4 font-sans text-small text-fg">
                  {out.thanks}
                </pre>
              </>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                className={btn1}
                onClick={() =>
                  copy(tabText[tab], TABS.find((t) => t.id === tab)?.name ?? 'Message')
                }
              >
                Copy {TABS.find((t) => t.id === tab)?.name.toLowerCase()}
              </button>
              <button type="button" className={btn2} onClick={track}>
                I sent it: track follow-up
              </button>
            </div>
            <p className="mt-3 min-h-5 text-small text-signal-ink" aria-live="polite">
              {note}
            </p>
          </div>
        </div>

        {checkCh && <Checks text={tabText[tab]} channel={checkCh} />}
      </div>

      {/* ---------- Tracker ---------- */}
      <div className="min-w-0 lg:col-span-12" id="tracker">
        <div className="rounded-2xl border border-border bg-surface p-4 md:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <div className={`${kicker} text-fg-3`}>
                Your referral tracker · saved on this device
              </div>
              <h3 className="mt-1 text-h4 font-semibold text-fg">
                Who you asked, and when to nudge
              </h3>
            </div>
            <span className="text-small tabular-nums text-fg-2">
              {asked.length} asked · {asked.filter((a) => a.status === 'referred').length} referred
            </span>
          </div>
          {asked.length === 0 ? (
            <p className="mt-4 rounded-xl border border-dashed border-border-strong p-6 text-center text-small text-fg-2">
              Nobody yet. After you send a message, press &ldquo;I sent it&rdquo; and the follow-up
              date shows here.
            </p>
          ) : (
            <ul className="mt-4 divide-y divide-border rounded-xl border border-border">
              {asked.map((a) => {
                const due = dueFor(a)
                const overdue = a.status === 'waiting' && now && due <= now
                return (
                  <li
                    key={a.id}
                    className="grid gap-2 px-4 py-3 sm:grid-cols-[1fr_auto_auto] sm:items-center"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-small font-semibold text-fg">
                        {a.name}
                        {a.company ? ` · ${a.company}` : ''}
                      </span>
                      <span className="block truncate text-caption text-fg-3">
                        {a.role || 'Role not set'} · sent {fmtDate(a.sent)}
                      </span>
                    </span>
                    <span
                      className={`text-caption tabular-nums ${overdue ? 'font-semibold text-warn' : 'text-fg-2'}`}
                    >
                      {a.status === 'waiting'
                        ? overdue
                          ? `Follow up now (due ${fmtDate(due)})`
                          : `Follow up ${fmtDate(due)}`
                        : TRACK.find((t) => t.id === a.status)?.name}
                    </span>
                    <span className="flex items-center gap-2">
                      <select
                        aria-label={`Status for ${a.name}`}
                        className={`${field} mt-0 h-9 w-auto`}
                        value={a.status}
                        onChange={(e) =>
                          setAsked((all) =>
                            all.map((x) =>
                              x.id === a.id ? { ...x, status: e.target.value as TrackStatus } : x
                            )
                          )
                        }
                      >
                        {TRACK.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.name}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        aria-label={`Remove ${a.name}`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-fg-3 hover:bg-muted hover:text-fg"
                        onClick={() => setAsked((all) => all.filter((x) => x.id !== a.id))}
                      >
                        ×
                      </button>
                    </span>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>

      {/* ---------- Check your own ---------- */}
      <div className="min-w-0 lg:col-span-12" id="check-own">
        <div className="grid gap-6 rounded-2xl border border-border bg-surface p-4 md:p-6 lg:grid-cols-2">
          <div className="min-w-0">
            <div className={`${kicker} text-fg-3`}>Already wrote one?</div>
            <h3 className="mt-1 text-h4 font-semibold text-fg">Paste it and run the same checks</h3>
            <div
              className="mt-3 inline-flex rounded-full bg-muted p-1"
              aria-label="Where you will send it"
            >
              {(
                [
                  ['note', 'Note'],
                  ['dm', 'LinkedIn message'],
                  ['email', 'Email'],
                ] as const
              ).map(([id, label]) => (
                <label
                  key={id}
                  className={`cursor-pointer rounded-full px-3 py-1.5 text-caption font-medium transition-colors duration-fast has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-signal-strong ${
                    ownCh === id ? 'bg-surface text-fg shadow-e1' : 'text-fg-2 hover:text-fg'
                  }`}
                >
                  <input
                    type="radio"
                    name="ownCh"
                    value={id}
                    checked={ownCh === id}
                    onChange={() => setOwnCh(id)}
                    className="sr-only"
                  />
                  {label}
                </label>
              ))}
            </div>
            <textarea
              aria-label="Your message"
              className={`${field} mt-3 min-h-[180px] py-2.5`}
              value={own}
              onChange={(e) => setOwn(e.target.value)}
              placeholder="Paste your referral message here"
            />
            <p className="mt-1.5 text-caption tabular-nums text-fg-3">
              {words(own)} words · {chars(own)} characters
            </p>
          </div>
          <div className="min-w-0">
            {own.trim() ? (
              <Checks text={own} channel={ownCh} />
            ) : (
              <p className="rounded-xl border border-dashed border-border-strong p-6 text-center text-small text-fg-2">
                Your checks appear here as you paste. Nothing leaves this browser.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
