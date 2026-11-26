'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import MockInterviewButton from './MockInterviewButton'
import MockLoopSteps from './MockLoopSteps'

const DEFAULT_QUESTIONS = [
  'Tell me about yourself in 60 seconds.',
  'Walk me through a decision you made with incomplete data.',
  'Why this role, and why now?',
]

// Fixed bar heights (0–1) so server and client render the same waveform.
const WAVE = [
  0.3, 0.5, 0.8, 0.45, 0.65, 1, 0.55, 0.85, 0.4, 0.95, 0.6, 0.35, 0.75, 0.9, 0.5, 0.3, 0.7, 1, 0.6,
  0.4, 0.85, 0.55, 0.95, 0.45, 0.7, 0.35, 0.8, 0.5, 0.65, 0.3, 0.9, 0.55,
]

/**
 * The closing call to action on every learning page: a live-looking mock interview in the
 * site's light theme. The interviewer's waveform moves, the role's real questions cycle, a
 * timer runs, and the one button goes to /free-mock-interview (Tough Tongue AI). Motion stops
 * for readers who ask for reduced motion; the page works the same without JavaScript.
 */
export default function MockInterviewCTA({
  title = 'Practise out loud. It’s free.',
  body,
  roleName: role,
  questions,
  label = 'Start a free mock interview',
}: {
  title?: string
  body?: string
  roleName?: string // e.g. "AI PM"
  questions?: string[]
  label?: string
}) {
  const pathname = usePathname()
  const qs = (questions?.length ? questions : DEFAULT_QUESTIONS).slice(0, 4)
  const [i, setI] = useState(0)
  const [secs, setSecs] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const q = setInterval(() => setI((x) => (x + 1) % qs.length), 4200)
    const t = setInterval(() => setSecs((s) => (s + 1) % 3600), 1000)
    return () => {
      clearInterval(q)
      clearInterval(t)
    }
  }, [qs.length])

  const clock = `${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`
  const text =
    body ??
    `A voice interviewer asks ${role ? `${role} ` : ''}questions, follows up on your answers, and tells you what was strong and what was thin.`

  return (
    <section aria-labelledby="mi-cta-title" className="py-14 md:py-20">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
        <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-border bg-surface shadow-e1 md:grid-cols-[1.05fr_1fr]">
          <div className="p-6 md:p-10">
            <div className="font-mono text-kicker uppercase tracking-[0.08em] text-signal-strong">
              Free to start · runs in your browser · by Tough Tongue AI
            </div>
            <h2 id="mi-cta-title" className="mt-3 font-serif text-h1 font-medium text-fg">
              {title}
            </h2>
            <p className="mt-3 max-w-[48ch] text-body-lg text-fg-2">{text}</p>
            <MockLoopSteps className="mt-6 md:grid-cols-1" />
            <div className="mt-7 flex flex-col items-start gap-3">
              <MockInterviewButton label={label} role={role} />
              {pathname !== '/interview-prep-plan' && (
                <Link
                  href="/interview-prep-plan"
                  className="text-small font-medium text-fg-2 underline decoration-border-strong underline-offset-4 transition-colors duration-fast hover:text-fg hover:decoration-fg"
                >
                  Or build a day-by-day prep plan →
                </Link>
              )}
            </div>
          </div>

          {/* The live panel: decorative, so hidden from screen readers */}
          <div
            aria-hidden="true"
            className="relative flex flex-col justify-center gap-5 border-t border-border bg-signal-tint/60 p-6 md:border-l md:border-t-0 md:p-10"
          >
            <div className="flex items-center justify-between text-caption text-fg-2">
              <span className="inline-flex items-center gap-2 font-medium">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="cta-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-signal" />
                </span>
                Mock interview in progress
              </span>
              <span className="font-mono tabular-nums text-fg-3">{clock}</span>
            </div>

            <div className="rounded-xl border border-border bg-surface p-5 shadow-e1">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-signal font-mono text-caption font-semibold text-white">
                  AI
                </span>
                <div>
                  <div className="text-small font-semibold text-fg">Interviewer</div>
                  <div className="text-caption text-fg-3">
                    {role ? `${role} round` : 'Mock round'} · question {i + 1} of {qs.length}
                  </div>
                </div>
              </div>
              <p
                key={i}
                className="cta-q mt-4 min-h-[3.5rem] font-serif text-h3 font-medium leading-snug text-fg"
              >
                “{qs[i]}”
              </p>
              <div className="mt-4 flex h-10 items-center justify-between">
                {WAVE.map((h, k) => (
                  <span
                    key={k}
                    className="cta-wave w-[3px] shrink-0 rounded-full bg-signal"
                    style={{ height: `${Math.round(h * 100)}%`, animationDelay: `${k * 90}ms` }}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-dashed border-border-strong bg-surface/70 px-4 py-3">
              <span className="text-small text-fg-2">Your turn: answer out loud</span>
              <span className="flex h-6 items-center gap-[3px]">
                {[0, 1, 2, 3, 4].map((k) => (
                  <span
                    key={k}
                    className="mi-bar w-[3px] rounded-full bg-fg-3"
                    style={{ animationDelay: `${k * 120}ms` }}
                  />
                ))}
              </span>
            </div>

            {/* What comes back after the answer (shown at md+ where the panel has room) */}
            <div className="hidden rounded-xl border border-border bg-surface p-5 shadow-e1 md:block">
              <div className="flex items-center justify-between">
                <span className="font-mono text-kicker uppercase tracking-[0.08em] text-fg-3">
                  What you get back
                </span>
                <span className="text-caption text-fg-3">example</span>
              </div>
              <ul key={i} className="mt-3 space-y-2.5 text-small">
                <li className="cta-q flex gap-2.5" style={{ animationDelay: '900ms' }}>
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-signal" />
                  <span className="text-fg-2">
                    <span className="font-semibold text-fg">Strong:</span> you answered the question
                    in your first sentence.
                  </span>
                </li>
                <li className="cta-q flex gap-2.5" style={{ animationDelay: '1500ms' }}>
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full border border-fg-3" />
                  <span className="text-fg-2">
                    <span className="font-semibold text-fg">Thin:</span> no example from your own
                    work. Add one, with what changed.
                  </span>
                </li>
                <li className="cta-q flex gap-2.5" style={{ animationDelay: '2100ms' }}>
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full border border-fg-3" />
                  <span className="text-fg-2">
                    <span className="font-semibold text-fg">Follow-up:</span> “Can you walk me
                    through a time you did that?”
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
