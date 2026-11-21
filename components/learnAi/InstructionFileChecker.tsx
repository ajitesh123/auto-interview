'use client'

import { useId, useMemo, useState } from 'react'
import {
  CHECKED,
  SAMPLE_AFTER,
  SAMPLE_BEFORE,
  TOOLS,
  checkInstructionFile,
  filePlan,
  type Level,
  type ToolId,
} from '@/data/learnAi/instructionFile'

// CLAUDE.md / AGENTS.md checker. No AI, no network: the text never leaves the browser.
// Rules and their sources live in data/learnAi/instructionFile.ts.

const MARK: Record<Level, { label: string; cls: string }> = {
  fail: { label: 'Fix', cls: 'bg-danger-soft text-danger' },
  warn: { label: 'Improve', cls: 'bg-warn-soft text-warn' },
  pass: { label: 'Good', cls: 'bg-success-soft text-success' },
  info: { label: 'Note', cls: 'bg-muted text-fg-2' },
}

const btn =
  'inline-flex h-9 items-center rounded-full px-4 text-small font-medium ring-1 ring-inset ring-border-strong text-fg transition-colors duration-fast hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-strong'

export default function InstructionFileChecker() {
  const id = useId()
  const [tab, setTab] = useState<'check' | 'plan'>('check')
  const [text, setText] = useState(SAMPLE_BEFORE)
  const [picked, setPicked] = useState<ToolId[]>(['claude', 'codex'])
  const report = useMemo(() => checkInstructionFile(text), [text])
  const plan = filePlan(picked)

  const tabBtn = (t: 'check' | 'plan', label: string) => (
    <button
      type="button"
      role="tab"
      id={`${id}-tab-${t}`}
      aria-selected={tab === t}
      aria-controls={`${id}-panel-${t}`}
      tabIndex={tab === t ? 0 : -1}
      onClick={() => setTab(t)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          const next = t === 'check' ? 'plan' : 'check'
          setTab(next)
          document.getElementById(`${id}-tab-${next}`)?.focus()
        }
      }}
      className={`-mb-px border-b-2 px-1 pb-3 text-small font-medium transition-colors duration-fast focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-strong ${
        tab === t ? 'border-signal text-fg' : 'border-transparent text-fg-3 hover:text-fg'
      }`}
    >
      {label}
    </button>
  )

  return (
    <div className="rounded-xl border border-border bg-surface p-5 md:p-6">
      <div
        role="tablist"
        aria-label="Instruction file tools"
        className="flex gap-6 border-b border-border"
      >
        {tabBtn('check', 'Check my file')}
        {tabBtn('plan', 'Which file do I need?')}
      </div>

      {tab === 'check' ? (
        <div
          role="tabpanel"
          id={`${id}-panel-check`}
          aria-labelledby={`${id}-tab-check`}
          className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
        >
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <button type="button" className={btn} onClick={() => setText(SAMPLE_BEFORE)}>
                Load a messy /init draft
              </button>
              <button type="button" className={btn} onClick={() => setText(SAMPLE_AFTER)}>
                Load the cleaned-up file
              </button>
              <button type="button" className={btn} onClick={() => setText('')}>
                Clear
              </button>
            </div>
            <label htmlFor={`${id}-text`} className="mt-4 block text-small font-medium text-fg">
              Paste your CLAUDE.md, AGENTS.md or rules file
            </label>
            <textarea
              id={`${id}-text`}
              value={text}
              onChange={(e) => setText(e.target.value)}
              spellCheck={false}
              rows={18}
              className="mt-1.5 w-full resize-y rounded-lg bg-bg p-3 font-mono text-caption leading-relaxed text-fg ring-1 ring-inset ring-border-strong focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-strong"
            />
            <p className="mt-1.5 text-caption text-fg-3">
              Checked in your browser; nothing is sent anywhere. Still, never paste a real key.
            </p>
          </div>

          <div className="min-w-0">
            <p className="sr-only" aria-live="polite">
              {report.lines === 0
                ? 'No file to check.'
                : `${report.passed} of ${report.total} checks pass, ${report.findings.filter((x) => x.level === 'fail').length} to fix, ${report.findings.filter((x) => x.level === 'warn').length} to improve.`}
            </p>
            {report.lines === 0 ? (
              <p className="rounded-lg bg-muted px-4 py-3 text-small text-fg-2">
                Paste a file, or load one of the two examples.
              </p>
            ) : (
              <>
                <dl className="grid grid-cols-3 gap-3 border-b border-border pb-4">
                  {[
                    ['Lines', report.lines.toLocaleString('en-US'), 'target under 200'],
                    ['Tokens', `~${report.tokens.toLocaleString('en-US')}`, 'read on every task'],
                    ['Checks', `${report.passed} of ${report.total}`, 'pass'],
                  ].map(([k, v, s]) => (
                    <div key={k} className="min-w-0">
                      <dt className="font-mono text-kicker uppercase tracking-[0.08em] text-fg-3">
                        {k}
                      </dt>
                      <dd className="mt-1 text-h4 font-semibold tabular-nums text-fg">{v}</dd>
                      <dd className="text-caption text-fg-3">{s}</dd>
                    </div>
                  ))}
                </dl>
                <ul className="mt-4 space-y-3">
                  {report.findings.map((f) => (
                    <li key={f.id} className="rounded-lg border border-border p-3">
                      <div className="flex items-start gap-2.5">
                        <span
                          className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-caption font-medium ${MARK[f.level].cls}`}
                        >
                          {MARK[f.level].label}
                        </span>
                        <div className="min-w-0">
                          <p className="text-small font-semibold text-fg">{f.title}</p>
                          <p className="mt-1 text-small leading-relaxed text-fg-2">{f.detail}</p>
                          <p className="mt-1.5 text-caption text-fg-3">
                            {f.lines?.length ? `Line ${f.lines.join(', ')} · ` : ''}
                            <a
                              href={f.source.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline decoration-border-strong underline-offset-2 hover:text-fg"
                            >
                              {f.source.label}
                            </a>
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-caption text-fg-3">
                  Tokens are a rough count (about 4 characters each, OpenAI&rsquo;s rule of thumb
                  for English). Pattern checks can&rsquo;t judge whether a rule is right for your
                  project; they catch the common mistakes. Rules checked {CHECKED}.
                </p>
              </>
            )}
          </div>
        </div>
      ) : (
        <div
          role="tabpanel"
          id={`${id}-panel-plan`}
          aria-labelledby={`${id}-tab-plan`}
          className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
        >
          <fieldset className="min-w-0">
            <legend className="text-small font-medium text-fg">
              Which coding agents do you or your team use?
            </legend>
            <div className="mt-3 space-y-2">
              {TOOLS.map((t) => {
                const on = picked.includes(t.id)
                return (
                  <label
                    key={t.id}
                    className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors duration-fast has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-signal-strong ${
                      on ? 'border-signal bg-signal-tint' : 'border-border hover:bg-muted'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={on}
                      onChange={() =>
                        setPicked((p) => (on ? p.filter((x) => x !== t.id) : [...p, t.id]))
                      }
                      aria-label={t.name}
                      className="mt-1 h-4 w-4 accent-signal"
                    />
                    <span className="min-w-0">
                      <span className="block text-small font-semibold text-fg">{t.name}</span>
                      <span className="block text-caption text-fg-2">Reads: {t.file}</span>
                    </span>
                  </label>
                )
              })}
            </div>
          </fieldset>
          <div className="min-w-0" aria-live="polite">
            <p className="text-body text-fg">{plan.note}</p>
            {plan.files.map((file) => (
              <div key={file.path} className="mt-4">
                <div className="font-mono text-small font-medium text-fg-2">{file.path}</div>
                <pre className="mt-1.5 whitespace-pre-wrap break-words rounded-lg bg-bg p-3 font-mono text-caption leading-relaxed text-fg ring-1 ring-inset ring-border">
                  {file.body}
                </pre>
              </div>
            ))}
            {plan.files.length > 0 && (
              <p className="mt-4 text-caption text-fg-3">
                From each tool&rsquo;s own docs, opened {CHECKED}. Folder-specific rules: see the
                table in step 2.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
