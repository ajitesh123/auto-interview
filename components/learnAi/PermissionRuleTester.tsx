'use client'

import { useId, useMemo, useState } from 'react'
import {
  CHECKED,
  MODES,
  SAMPLE_AFTER,
  SAMPLE_BEFORE,
  TEST_CALLS,
  checkSettings,
  decide,
  effectiveMode,
  parseSettings,
  type Call,
  type Decision,
  type Level,
  type Mode,
  type Scope,
  type Tool,
} from '@/data/learnAi/permissionRules'

// Claude Code permission rule tester + settings checker. No AI, no network: the file never
// leaves the browser. Rules, sources and the decision order live in data/learnAi/permissionRules.ts.

const MARK: Record<Level, { label: string; cls: string }> = {
  fail: { label: 'Fix', cls: 'bg-danger-soft text-danger' },
  warn: { label: 'Improve', cls: 'bg-warn-soft text-warn' },
  pass: { label: 'Good', cls: 'bg-success-soft text-success' },
  info: { label: 'Note', cls: 'bg-muted text-fg-2' },
}

const VERDICT: Record<Decision['verdict'], string> = {
  Blocked: 'bg-danger-soft text-danger',
  'Asks you': 'bg-warn-soft text-warn',
  Runs: 'bg-success-soft text-success',
  'Mode decides': 'bg-muted text-fg-2',
}

const TOOLS: { id: Tool; label: string; hint: string }[] = [
  { id: 'Bash', label: 'Bash', hint: 'a shell command, e.g. npm test && git push' },
  { id: 'Read', label: 'Read', hint: 'a file path, e.g. .env or ~/notes.txt' },
  { id: 'Edit', label: 'Edit', hint: 'a file path, e.g. src/app.ts' },
  { id: 'Write', label: 'Write', hint: 'a file path (checked against Edit rules)' },
  { id: 'WebFetch', label: 'WebFetch', hint: 'a URL, e.g. https://api.github.com/repos' },
  { id: 'mcp', label: 'MCP tool', hint: 'a tool name, e.g. mcp__github__create_issue' },
]

const btn =
  'inline-flex min-h-11 items-center rounded-full px-4 sm:min-h-9 text-small font-medium ring-1 ring-inset ring-border-strong text-fg transition-colors duration-fast hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-strong'
const field =
  'h-11 w-full min-w-0 rounded-lg bg-bg px-3 text-body text-fg sm:text-small ring-1 ring-inset ring-border-input focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-strong'

export default function PermissionRuleTester() {
  const id = useId()
  const [text, setText] = useState(SAMPLE_BEFORE)
  const [call, setCall] = useState<Call>(TEST_CALLS[5].call)
  const [modeSel, setModeSel] = useState<'file' | Mode>('file')
  const [scope, setScope] = useState<Scope>('project')
  const report = useMemo(() => checkSettings(text, scope), [text, scope])
  const parsed = useMemo(() => parseSettings(text), [text])
  const settings = parsed.ok
    ? parsed.settings
    : { rules: [], mode: null, hooks: [], unknownModes: [] }
  const eff = effectiveMode(settings, scope)
  const override = modeSel === 'file' ? undefined : modeSel
  const mode: Mode = override ?? eff.mode
  const result = call.value.trim() ? decide(settings, call, override, scope) : null
  const table = TEST_CALLS.map((t) => ({ ...t, d: decide(settings, t.call, override, scope) }))
  const riskyRun = table.filter((t) => t.risky && t.d.verdict === 'Runs').length
  const risky = table.filter((t) => t.risky).length
  const hint = TOOLS.find((t) => t.id === call.tool)?.hint ?? ''

  return (
    <div className="rounded-xl border border-border bg-surface p-5 md:p-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* ---------- settings file ---------- */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" className={btn} onClick={() => setText(SAMPLE_BEFORE)}>
              Load the risky file
            </button>
            <button type="button" className={btn} onClick={() => setText(SAMPLE_AFTER)}>
              Load the fixed file
            </button>
            <button
              type="button"
              className={btn}
              onClick={() => setText('{\n  "permissions": {}\n}\n')}
            >
              Empty
            </button>
          </div>
          <fieldset className="mt-4 min-w-0">
            <legend className="text-small font-medium text-fg">This file is</legend>
            <div className="mt-1.5 flex flex-wrap gap-2">
              {(
                [
                  ['project', 'Project: .claude/settings.json'],
                  ['user', 'User: ~/.claude/settings.json'],
                ] as [Scope, string][]
              ).map(([v, l]) => (
                <label
                  key={v}
                  className={`inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full px-3 text-caption font-medium ring-1 ring-inset transition-colors duration-fast has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-signal-strong sm:min-h-9 ${
                    scope === v
                      ? 'bg-signal-tint text-signal-strong ring-signal'
                      : 'text-fg-2 ring-border-strong hover:bg-muted'
                  }`}
                >
                  <input
                    type="radio"
                    name={`${id}-scope`}
                    value={v}
                    checked={scope === v}
                    onChange={() => setScope(v)}
                    className="sr-only"
                  />
                  <span className="font-mono">{l}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <label htmlFor={`${id}-text`} className="mt-4 block text-small font-medium text-fg">
            Paste the file
          </label>
          <textarea
            id={`${id}-text`}
            value={text}
            onChange={(e) => setText(e.target.value)}
            spellCheck={false}
            rows={18}
            className="mt-1.5 w-full resize-y rounded-lg bg-bg p-3 font-mono text-body leading-relaxed text-fg ring-1 ring-inset ring-border-strong focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-strong sm:text-caption"
          />
          <p className="mt-1.5 text-caption text-fg-3">
            Checked in your browser; nothing is sent anywhere.
          </p>
        </div>

        {/* ---------- checks ---------- */}
        <div className="min-w-0">
          <p className="sr-only" aria-live="polite">
            {report.ok
              ? `${report.passed} of ${report.total} checks pass.`
              : (report.error ?? 'No file to check.')}
          </p>
          {!report.ok ? (
            <p className="rounded-lg bg-danger-soft px-4 py-3 text-small text-danger">
              {report.error}
            </p>
          ) : (
            <>
              <dl className="grid grid-cols-1 gap-3 border-b border-border pb-4 min-[420px]:grid-cols-3">
                {[
                  [
                    'Rules',
                    `${report.counts.deny + report.counts.ask + report.counts.allow}`,
                    `${report.counts.deny} deny · ${report.counts.ask} ask · ${report.counts.allow} allow`,
                  ],
                  ['Hooks', `${report.counts.hooks}`, 'commands that run at set moments'],
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
                        <p className="text-small font-semibold text-fg [overflow-wrap:anywhere]">
                          {f.title}
                        </p>
                        <p className="mt-1 text-small leading-relaxed text-fg-2 [overflow-wrap:anywhere]">
                          {f.detail}
                        </p>
                        <p className="mt-1.5 text-caption text-fg-3">
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
            </>
          )}
        </div>
      </div>

      {/* ---------- test a call ---------- */}
      <div className="mt-8 border-t border-border pt-6">
        <h3 className="text-h4 font-semibold text-fg">Test a tool call against this file</h3>
        <p className="mt-1 max-w-[68ch] text-small text-fg-2">
          Pick what the agent tries to do. The tester walks the order Claude Code documents: hooks,
          then deny, then ask, then allow, then the permission mode.
        </p>
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Example calls">
          {TEST_CALLS.map((t) => {
            const on = t.call.tool === call.tool && t.call.value === call.value
            return (
              <button
                key={t.label}
                type="button"
                aria-pressed={on}
                onClick={() => setCall(t.call)}
                className={`inline-flex min-h-11 items-center rounded-full px-3 text-caption font-medium ring-1 ring-inset transition-colors duration-fast focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-strong sm:min-h-9 ${
                  on
                    ? 'bg-signal-tint text-signal-strong ring-signal'
                    : 'text-fg-2 ring-border-strong hover:bg-muted'
                }`}
              >
                {t.label}
              </button>
            )
          })}
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-[9rem_minmax(0,1fr)_15rem]">
          <div className="min-w-0">
            <label htmlFor={`${id}-tool`} className="block text-caption font-medium text-fg-2">
              Tool
            </label>
            <select
              id={`${id}-tool`}
              value={call.tool}
              onChange={(e) => setCall({ tool: e.target.value as Tool, value: call.value })}
              className={`mt-1 ${field}`}
            >
              {TOOLS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
          <div className="min-w-0">
            <label htmlFor={`${id}-val`} className="block text-caption font-medium text-fg-2">
              What it tries <span className="font-normal text-fg-3">({hint})</span>
            </label>
            <input
              id={`${id}-val`}
              value={call.value}
              onChange={(e) => setCall({ tool: call.tool, value: e.target.value })}
              spellCheck={false}
              className={`mt-1 font-mono ${field}`}
            />
          </div>
          <div className="min-w-0">
            <label htmlFor={`${id}-mode`} className="block text-caption font-medium text-fg-2">
              Permission mode
            </label>
            <select
              id={`${id}-mode`}
              value={modeSel}
              onChange={(e) => setModeSel(e.target.value as 'file' | Mode)}
              className={`mt-1 ${field}`}
            >
              <option value="file">
                From the file ({eff.mode}
                {eff.ignored ? `; ${eff.ignored} ignored` : ''})
              </option>
              {MODES.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4">
          {result && (
            <div className="rounded-lg border border-border bg-bg p-4">
              <p className="sr-only" aria-live="polite">
                {result.verdict}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-small font-semibold ${VERDICT[result.verdict]}`}
                >
                  {result.verdict}
                </span>
                {result.rule && (
                  <code className="break-all rounded bg-muted px-1.5 py-0.5 font-mono text-caption text-fg">
                    {result.rule}
                  </code>
                )}
              </div>
              <p className="mt-2 text-small text-fg">{result.reason}</p>
              {result.hookNote && <p className="mt-1 text-caption text-warn">{result.hookNote}</p>}
              {result.parts && (
                <p className="mt-1 text-caption text-fg-2">
                  Split into {result.parts.length} parts:{' '}
                  {result.parts.map((p) => `“${p}”`).join(' · ')}
                </p>
              )}
              <ol className="mt-3 space-y-1.5">
                {result.trail.map((t, i) => (
                  <li key={t.step} className="flex gap-2.5 text-caption">
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-mono ${
                        t.hit ? 'bg-fg text-bg' : 'bg-muted text-fg-3'
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="min-w-0 text-fg-2">
                      <span className="font-medium text-fg">{t.step}:</span> {t.result}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>

        <div className="mt-6">
          <p className="text-small font-semibold text-fg">
            All {table.length} example calls under this file: {riskyRun} of {risky} risky ones run
            with no check
          </p>
          <p className="mt-1 text-caption text-fg-3 md:hidden">Swipe the table sideways →</p>
          <div
            className="mt-2 overflow-x-auto rounded-lg border border-border"
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabIndex={0}
            role="region"
            aria-label="Example calls and outcomes"
          >
            <table className="w-full min-w-[30rem] text-left text-caption">
              <thead className="bg-muted text-fg-2">
                <tr>
                  <th scope="col" className="px-3 py-2 font-medium">
                    Call
                  </th>
                  <th scope="col" className="px-3 py-2 font-medium">
                    Outcome
                  </th>
                  <th scope="col" className="px-3 py-2 font-medium">
                    Why
                  </th>
                </tr>
              </thead>
              <tbody>
                {table.map((t) => (
                  <tr key={t.label} className="border-t border-border align-top">
                    <th scope="row" className="px-3 py-2 font-normal text-fg">
                      {t.label}
                      <span className="block break-all font-mono text-fg-3">
                        {t.call.tool === 'mcp' ? t.call.value : `${t.call.tool}(${t.call.value})`}
                      </span>
                    </th>
                    <td className="px-3 py-2">
                      <span
                        className={`whitespace-nowrap rounded-full px-2 py-0.5 font-medium ${VERDICT[t.d.verdict]}`}
                      >
                        {t.d.verdict}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-fg-2">{t.d.rule ?? `mode: ${mode}`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="mt-4 text-caption text-fg-3">
          A teaching model of the rules in Anthropic&rsquo;s permissions and hooks docs, checked{' '}
          {CHECKED}. It assumes Claude Code started in the project folder, splits commands on
          &amp;&amp;, ||, ;, | and &amp;, and doesn&rsquo;t read shell quoting, subshells or
          symlinks. Run <code className="font-mono">/permissions</code> in Claude Code to see the
          rules it actually loaded.
        </p>
      </div>
    </div>
  )
}
