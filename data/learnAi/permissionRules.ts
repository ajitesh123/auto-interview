// Permission rule tester + settings checker for the lesson /learn-ai/claude-code-hooks-permissions.
// Pure functions, no AI, no network. It models the rules as Anthropic documents them
// (pages opened 25 Nov 2026):
//  - Permissions:    https://code.claude.com/docs/en/permissions
//  - Hooks guide:    https://code.claude.com/docs/en/hooks-guide
//  - Hooks reference: https://code.claude.com/docs/en/hooks
//  - Settings:       https://code.claude.com/docs/en/settings
//  - Best practices: https://code.claude.com/docs/en/best-practices
// It is a teaching model, not Claude Code itself: it does not parse shell quoting, subshells,
// redirects or symlinks, and it assumes Claude Code was started at the project root.

export const CHECKED = '25 Nov 2026'

export const SRC = {
  permissions: {
    label: 'Claude Code docs: permissions',
    url: 'https://code.claude.com/docs/en/permissions',
  },
  hooksGuide: {
    label: 'Claude Code docs: hooks guide',
    url: 'https://code.claude.com/docs/en/hooks-guide',
  },
  hooks: {
    label: 'Claude Code docs: hooks reference',
    url: 'https://code.claude.com/docs/en/hooks',
  },
  modes: {
    label: 'Claude Code docs: permission modes',
    url: 'https://code.claude.com/docs/en/permission-modes',
  },
  settings: {
    label: 'Claude Code docs: settings',
    url: 'https://code.claude.com/docs/en/settings',
  },
  best: {
    label: 'Claude Code docs: best practices',
    url: 'https://code.claude.com/docs/en/best-practices',
  },
} as const

export type Source = { label: string; url: string }

/* ------------------------------------------------------------------ */
/* Rules                                                                */
/* ------------------------------------------------------------------ */

export type Kind = 'deny' | 'ask' | 'allow'

export interface Rule {
  kind: Kind
  raw: string
  tool: string
  spec?: string // text inside the brackets, if any
}

export function parseRule(raw: string, kind: Kind): Rule | null {
  const s = raw.trim()
  if (s === '*') return { kind, raw: s, tool: '*' }
  const m = s.match(/^([A-Za-z_][\w-]*\*?)(?:\(([\s\S]*)\))?$/)
  if (!m) return null
  return { kind, raw: s, tool: m[1], spec: m[2] }
}

export type Mode = 'default' | 'acceptEdits' | 'plan' | 'auto' | 'dontAsk' | 'bypassPermissions'

export const MODES: { id: Mode; label: string; text: string }[] = [
  {
    id: 'default',
    label: 'default (Manual)',
    text: 'Prompts for permission on first use of each tool.',
  },
  {
    id: 'acceptEdits',
    label: 'acceptEdits',
    text: 'Automatically accepts file edits and common filesystem commands such as mkdir, touch, mv, and cp for paths in the working directory.',
  },
  {
    id: 'plan',
    label: 'plan',
    text: 'Claude reads files and runs read-only shell commands to explore but doesn’t edit your source files.',
  },
  {
    id: 'auto',
    label: 'auto',
    text: 'Runs without routine prompts; before actions such as shell commands and network requests run, a background classifier checks that they align with your request.',
  },
  {
    id: 'dontAsk',
    label: 'dontAsk',
    text: 'Auto-denies every call that would otherwise prompt.',
  },
  {
    id: 'bypassPermissions',
    label: 'bypassPermissions',
    text: 'Skips permission prompts, except for the actions no mode auto-approves.',
  },
]

export interface Settings {
  rules: Rule[]
  mode: Mode | null // permissions.defaultMode, if set
  hooks: HookEntry[]
  unknownModes: string[]
}

export interface HookEntry {
  event: string
  matcher: string
  type: string
  command: string
  onFailure?: string
  exec?: boolean // command given as an args array (no shell, no quoting needed)
}

export type ParseResult = { ok: true; settings: Settings } | { ok: false; error: string }

const MODE_IDS = new Set(MODES.map((m) => m.id))

export function parseSettings(text: string): ParseResult {
  let json: unknown
  try {
    json = JSON.parse(text)
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'invalid JSON'
    return { ok: false, error: `Not valid JSON: ${msg}` }
  }
  if (!json || typeof json !== 'object' || Array.isArray(json))
    return { ok: false, error: 'The file should be one JSON object: { "permissions": { … } }' }
  const obj = json as Record<string, unknown>
  const perms = (obj.permissions ?? {}) as Record<string, unknown>
  const rules: Rule[] = []
  for (const kind of ['deny', 'ask', 'allow'] as Kind[]) {
    const list = perms[kind]
    if (!Array.isArray(list)) continue
    for (const item of list) {
      if (typeof item !== 'string') continue
      const r = parseRule(item, kind)
      if (r) rules.push(r)
      else rules.push({ kind, raw: item, tool: '' })
    }
  }
  const unknownModes: string[] = []
  let mode: Mode | null = null
  if (typeof perms.defaultMode === 'string') {
    const dm = perms.defaultMode === 'manual' ? 'default' : perms.defaultMode
    if (MODE_IDS.has(dm as Mode)) mode = dm as Mode
    else unknownModes.push(perms.defaultMode)
  }
  const hooks: HookEntry[] = []
  const h = obj.hooks
  if (h && typeof h === 'object' && !Array.isArray(h)) {
    for (const [event, groups] of Object.entries(h as Record<string, unknown>)) {
      if (!Array.isArray(groups)) continue
      for (const g of groups) {
        if (!g || typeof g !== 'object') continue
        const gg = g as Record<string, unknown>
        const matcher = typeof gg.matcher === 'string' ? gg.matcher : ''
        const list = Array.isArray(gg.hooks) ? gg.hooks : []
        for (const hk of list) {
          if (!hk || typeof hk !== 'object') continue
          const x = hk as Record<string, unknown>
          hooks.push({
            event,
            matcher,
            type: typeof x.type === 'string' ? x.type : 'command',
            command:
              typeof x.command === 'string'
                ? x.command
                : typeof x.prompt === 'string'
                  ? x.prompt
                  : typeof x.url === 'string'
                    ? x.url
                    : '',
            onFailure: typeof x.onFailure === 'string' ? x.onFailure : undefined,
            exec: Array.isArray(x.args),
          })
        }
      }
    }
  }
  return { ok: true, settings: { rules, mode, hooks, unknownModes } }
}

/* ------------------------------------------------------------------ */
/* Matching                                                             */
/* ------------------------------------------------------------------ */

const esc = (s: string) => s.replace(/[.+?^${}()|[\]\\]/g, '\\$&')

/** Bash pattern → RegExp. A trailing " *" (or legacy ":*") also matches the bare command. */
export function bashPattern(spec: string): RegExp {
  let p = spec.trim()
  if (p.endsWith(':*')) p = p.slice(0, -2) + ' *'
  if (p.endsWith(' *')) {
    const head = p.slice(0, -2)
    return new RegExp('^' + head.split('*').map(esc).join('[\\s\\S]*') + '(?: [\\s\\S]*)?$')
  }
  return new RegExp('^' + p.split('*').map(esc).join('[\\s\\S]*') + '$')
}

/** Split a shell command on the separators the docs list: && || ; | |& & and newlines.
 *  Redirects like 2>&1, &> and >& are not separators. */
export function splitCommand(cmd: string): string[] | null {
  const t = cmd.trim()
  if (/(&&|\|\|)\s*$/.test(t)) return null // "npm test &&" is unparseable for allow matching
  const guarded = t.replace(/(\d?>&\d?|&>>?|<&)/g, (m) => m.replace(/&/g, '§AMP§'))
  return guarded
    .split(/\|&|&&|\|\||;|\||&|\n/)
    .map((x) => x.replace(/§AMP§/g, '&').trim())
    .filter(Boolean)
}

/** Drop leading VAR=value assignments and the wrappers timeout, nice, nohup and xargs. */
export function stripWrappers(cmd: string): string {
  let c = cmd.trim()
  for (let i = 0; i < 6; i++) {
    const next = c
      .replace(/^[A-Za-z_][A-Za-z0-9_]*=("[^"]*"|'[^']*'|\S*)\s+/, '')
      .replace(/^timeout\s+(-\S+\s+)*\d+[smhd]?\s+/, '')
      .replace(/^nice\s+(-n\s+-?\d+\s+|-\d+\s+)?/, '')
      .replace(/^nohup\s+/, '')
      .replace(/^xargs\s+(-\S+\s+)*/, '')
    if (next === c) break
    c = next
  }
  return c
}

export const PROJECT = '/home/you/jobtrack'
export const HOME = '/home/you'

function normPath(p: string): string {
  const parts: string[] = []
  for (const seg of p.split('/')) {
    if (seg === '' || seg === '.') continue
    if (seg === '..') parts.pop()
    else parts.push(seg)
  }
  return '/' + parts.join('/')
}

/** Resolve a path the agent wants to read or edit (relative to the project, where Claude Code started). */
export function resolveTarget(p: string): string {
  const s = p.trim().replace(/^["']|["']$/g, '')
  if (s === '~') return HOME
  if (s.startsWith('~/')) return normPath(HOME + '/' + s.slice(2))
  if (s.startsWith('/')) return normPath(s)
  return normPath(PROJECT + '/' + s)
}

const inProject = (p: string) => {
  const r = resolveTarget(p)
  return r === PROJECT || r.startsWith(PROJECT + '/')
}

/** gitignore-style pattern → absolute RegExp, using the four forms in the permissions docs.
 *  A bare name (no slash) matches at any depth; so does a single directory with /** in a deny or ask rule. */
export function pathPattern(spec: string, kind: Kind = 'allow'): RegExp {
  let s = spec.trim()
  let base: string
  let anyDepth = false
  if (s.startsWith('//')) {
    base = ''
    s = s.slice(1) // keep one leading slash: absolute
  } else if (s.startsWith('~/')) {
    base = HOME
    s = s.slice(1)
  } else if (s.startsWith('/')) {
    base = PROJECT // relative to the settings source (project settings → project root)
  } else if (s.startsWith('./')) {
    base = PROJECT // the current folder (here: the project root)
    s = s.slice(1)
  } else {
    if (!s.replace(/\/$/, '').includes('/')) anyDepth = true
    else if (kind !== 'allow' && /^[^/*]+\/\*\*$/.test(s)) anyDepth = true
    base = PROJECT
    s = '/' + s
  }
  if (s.endsWith('/')) s += '**'
  let re = ''
  for (let i = 0; i < s.length; i++) {
    const c = s[i]
    if (c === '*' && s[i + 1] === '*') {
      if (s[i + 2] === '/') {
        re += '(?:.*/)?'
        i += 2
      } else {
        re += '.*'
        i += 1
      }
    } else if (c === '*') re += '[^/]*'
    else if (c === '?') re += '[^/]'
    else re += esc(c)
  }
  const prefix = esc(base) + (anyDepth ? '(?:/.*)?' : '')
  // A pattern also covers everything under a matched directory.
  return new RegExp('^' + prefix + re + '(?:/.*)?$')
}

export type Tool = 'Bash' | 'Read' | 'Edit' | 'Write' | 'WebFetch' | 'mcp'

export interface Call {
  tool: Tool
  value: string // command, path, URL, or mcp__server__tool
}

function hostOf(url: string): string {
  const m = url.trim().match(/^[a-z]+:\/\/([^/:?#]+)/i)
  return (m ? m[1] : url.trim().split('/')[0]).toLowerCase()
}

/** WebFetch domain pattern: a leading "*." covers subdomains; any other * stays inside one label. */
function domainPattern(pat: string): RegExp {
  let p = pat.trim().toLowerCase()
  let lead = ''
  if (p.startsWith('*.')) {
    lead = '(?:[^.]+\\.)+'
    p = p.slice(2)
  }
  return new RegExp('^' + lead + p.split('*').map(esc).join('[^.]*') + '$')
}

/** Does one rule match one call (or one subcommand)? */
export function ruleMatches(rule: Rule, call: Call, sub?: string): boolean {
  if (rule.tool === '*') return true
  if (call.tool === 'mcp') {
    const name = call.value.trim()
    if (!rule.tool.startsWith('mcp__') || rule.spec !== undefined) return false
    if (rule.tool === 'mcp__*') return rule.kind !== 'allow' // an unanchored allow glob is skipped
    if (rule.tool.endsWith('__*')) return name.startsWith(rule.tool.slice(0, -1))
    if (rule.tool === name) return true
    return name.startsWith(rule.tool + '__') && rule.tool.split('__').length === 2
  }
  // Write calls are checked against Edit rules; Write(path) rules never match.
  const ruleTool = rule.tool
  const callTool = call.tool === 'Write' ? 'Edit' : call.tool
  if (call.tool === 'Write' && ruleTool === 'Write') return rule.spec === undefined
  if (ruleTool !== callTool) return false
  if (rule.spec === undefined || rule.spec === '*' || rule.spec === '') return true
  if (callTool === 'Bash') {
    const c = (sub ?? call.value).trim()
    const re = bashPattern(rule.spec)
    // Deny and ask rules also see past env assignments and wrappers like timeout or nohup.
    return re.test(c) || (rule.kind !== 'allow' && re.test(stripWrappers(c)))
  }
  if (callTool === 'Read' || callTool === 'Edit')
    return pathPattern(rule.spec, rule.kind).test(resolveTarget(call.value))
  if (callTool === 'WebFetch') {
    const m = rule.spec.match(/^domain:(.+)$/i)
    if (!m) return false
    return domainPattern(m[1]).test(hostOf(call.value))
  }
  return false
}

export type Outcome = 'removed' | 'deny' | 'ask' | 'allow' | 'mode'

export interface Decision {
  outcome: Outcome
  verdict: 'Blocked' | 'Asks you' | 'Runs' | 'Mode decides'
  rule?: string
  reason: string
  trail: { step: string; result: string; hit?: boolean }[]
  parts?: string[]
  hookNote?: string
}

const FILE_READERS = /^(cat|head|tail|sed|tee)$/

/** Files a shell part reads or writes, as far as this model can tell: arguments of cat, head, tail,
 *  sed and tee, and redirect targets. (Claude Code checks these against Read and Edit rules.) */
export function fileTargets(part: string): { reads: string[]; writes: string[] } {
  const reads: string[] = []
  const writes: string[] = []
  const p = stripWrappers(part)
  for (const m of Array.from(p.matchAll(/(\d?>>?|&>>?|<)\s*([^\s|;&<>]+)/g))) {
    if (m[2].startsWith('&')) continue
    if (m[1].includes('<')) reads.push(m[2])
    else if (m[2] !== '/dev/null') writes.push(m[2])
  }
  const words = p
    .replace(/(\d?>>?|&>>?|<)\s*[^\s|;&<>]+/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
  const cmd = words[0] ?? ''
  if (FILE_READERS.test(cmd)) {
    let args = words.slice(1).filter((w) => !w.startsWith('-'))
    if (cmd === 'sed') args = args.slice(1) // first plain argument is the script
    if (cmd === 'tee') writes.push(...args)
    else reads.push(...args)
    if (cmd === 'sed' && words.some((w) => /^-i/.test(w))) writes.push(...args)
  }
  return { reads, writes }
}

/** Claude Code's built-in read-only Bash set (permissions docs): no prompt in any mode. */
export function isReadOnly(part: string): boolean {
  const p = stripWrappers(part)
  if (/[<>]/.test(p.replace(/\d?>&\d|2>\/dev\/null/g, ''))) return false
  const w = p.split(/\s+/)
  const cmd = w[0]
  if (/^(ls|cat|echo|pwd|head|tail|grep|wc|which|diff|stat|du)$/.test(cmd)) return true
  if (cmd === 'find')
    return !w.some((x) => /^-(delete|exec|execdir|ok|okdir|fprint|fprintf|fls)$/.test(x))
  if (cmd === 'cd') return w.length === 1 || inProject(w[1])
  if (cmd === 'git') {
    const sub = w[1]
    if (/^(status|log|diff|show|blame)$/.test(sub)) return true
    if (sub === 'branch')
      return !w.some((x) => /^(-d|-D|-m|-M|-c|-C|--delete|--move|--copy|-f|--force)$/.test(x))
  }
  return false
}

const FS_CMD = /^(mkdir|touch|rm|rmdir|mv|cp|sed)(\s|$)/
const PROTECTED = /\/(\.git|\.claude)(\/|$)/

function hookCovers(settings: Settings, call: Call): HookEntry | undefined {
  const name = call.tool === 'mcp' ? call.value.trim() : call.tool
  return settings.hooks.find((h) => {
    if (h.event !== 'PreToolUse') return false
    const m = h.matcher.trim()
    if (m === '' || m === '*') return true
    if (/^[A-Za-z0-9_\-\s,|]+$/.test(m))
      return m
        .split(/[|,]/)
        .map((x) => x.trim())
        .includes(name)
    try {
      return new RegExp(m).test(name)
    } catch {
      return false
    }
  })
}

/** bypassPermissions and auto set in a project file don’t take effect: the session starts in Manual. */
export function effectiveMode(settings: Settings, scope: Scope): { mode: Mode; ignored?: Mode } {
  const m = settings.mode ?? 'default'
  if (scope === 'project' && (m === 'bypassPermissions' || m === 'auto'))
    return { mode: 'default', ignored: m }
  return { mode: m }
}

export type Scope = 'project' | 'user'

function modeOutcome(mode: Mode, call: Call): { verdict: Decision['verdict']; reason: string } {
  const isEdit = call.tool === 'Edit' || call.tool === 'Write'
  // Approval table (permissions docs): reads need no approval within the working directory,
  // and the built-in read-only Bash commands run without a prompt in every mode.
  if (call.tool === 'Read' && inProject(call.value))
    return {
      verdict: 'Runs',
      reason:
        'No rule matched. File reads inside the working directory need no approval in any mode, so it just runs. Only a deny rule stops it.',
    }
  if (call.tool === 'Bash' && splitCommand(call.value)?.every(isReadOnly))
    return {
      verdict: 'Runs',
      reason:
        'No rule matched, but this is in Claude Code’s built-in set of read-only commands, which run without a prompt in every mode.',
    }
  if (isEdit && PROTECTED.test(resolveTarget(call.value))) {
    if (mode === 'bypassPermissions')
      return {
        verdict: 'Runs',
        reason:
          'A protected path (.git or .claude); only bypassPermissions writes it without asking.',
      }
    if (mode === 'dontAsk' || mode === 'plan')
      return {
        verdict: 'Blocked',
        reason:
          'A protected path (.git or .claude): writes here are never auto-approved, and this mode doesn’t prompt.',
      }
    return {
      verdict: 'Asks you',
      reason:
        'A protected path (.git or .claude): writes here are never auto-approved outside bypassPermissions, so you get a prompt.',
    }
  }
  switch (mode) {
    case 'bypassPermissions':
      return {
        verdict: 'Runs',
        reason:
          'No rule matched and the mode is bypassPermissions, so it runs without asking (apart from the few actions no mode auto-approves).',
      }
    case 'dontAsk':
      return {
        verdict: 'Blocked',
        reason:
          'No allow rule matched and dontAsk auto-denies every call that would otherwise prompt.',
      }
    case 'acceptEdits': {
      const parts = call.tool === 'Bash' ? splitCommand(call.value) : null
      const fsOk =
        parts?.every((c) => {
          const x = stripWrappers(c)
          if (!FS_CMD.test(x)) return isReadOnly(c)
          return x
            .split(/\s+/)
            .slice(1)
            .filter((w) => !w.startsWith('-') && !/^s[/|#]/.test(w))
            .every(inProject)
        }) ?? false
      if ((isEdit && inProject(call.value)) || fsOk)
        return {
          verdict: 'Runs',
          reason:
            'No rule matched; acceptEdits accepts file edits and mkdir, touch, rm, rmdir, mv, cp and sed inside the working directory.',
        }
      return {
        verdict: 'Asks you',
        reason:
          'No rule matched; acceptEdits only covers edits and basic file commands inside the working directory, so this prompts.',
      }
    }
    case 'plan':
      if (isEdit) return { verdict: 'Blocked', reason: 'Plan mode doesn’t edit your source files.' }
      return {
        verdict: 'Asks you',
        reason:
          'No rule matched; in plan mode anything beyond reading goes through the normal permission prompt.',
      }
    case 'auto':
      return {
        verdict: 'Mode decides',
        reason:
          'No rule matched; in auto mode a background classifier checks the action against your request before it runs. That check is a model, not a rule.',
      }
    default:
      return {
        verdict: 'Asks you',
        reason:
          call.tool === 'Read'
            ? 'No rule matched and the file is outside the working directory, so Manual (default) mode asks you.'
            : 'No rule matched, so Manual (default) mode asks you (edits, shell commands and web fetches need approval).',
      }
  }
}

export function decide(
  settings: Settings,
  call: Call,
  modeOverride?: Mode,
  scope: Scope = 'project'
): Decision {
  const eff = effectiveMode(settings, scope)
  const mode: Mode = modeOverride ?? eff.mode
  const trail: Decision['trail'] = []
  const hook = hookCovers(settings, call)
  trail.push({
    step: 'PreToolUse hooks',
    result: hook
      ? `A PreToolUse hook matches this tool (matcher "${hook.matcher || '*'}"). If it exits 2 or returns "deny", the call is blocked here, before any rule, in every mode.`
      : settings.hooks.some((h) => h.event === 'PreToolUse')
        ? 'Your PreToolUse hooks don’t match this tool.'
        : 'No PreToolUse hook in this file.',
  })
  const finish = (d: Decision): Decision => {
    if (hook && d.verdict !== 'Blocked')
      d.hookNote = 'Unless your PreToolUse hook blocks it: this tester can’t run your script.'
    return d
  }

  // A bare tool name in deny removes the tool.
  const bare = settings.rules.find(
    (r) => r.kind === 'deny' && r.spec === undefined && r.tool === call.tool && call.tool !== 'mcp'
  )
  if (bare) {
    trail.push({ step: 'Deny rules', result: `${bare.raw} removes the tool entirely.`, hit: true })
    return {
      outcome: 'removed',
      verdict: 'Blocked',
      rule: bare.raw,
      reason: `${bare.raw} on its own removes the tool from Claude’s context, so Claude never sees it.`,
      trail,
    }
  }

  const parsed = call.tool === 'Bash' ? splitCommand(call.value) : null
  const unparseable = call.tool === 'Bash' && parsed === null
  const units = parsed && parsed.length ? parsed : [call.value]

  // Read deny rules also block Edit/Write on the same path, and file commands in Bash.
  const readDeny = settings.rules.filter((r) => r.kind === 'deny' && r.tool === 'Read')
  const editDeny = settings.rules.filter((r) => r.kind === 'deny' && r.tool === 'Edit')
  const fileHit = (): { rule: Rule; what: string } | undefined => {
    if (call.tool === 'Edit' || call.tool === 'Write') {
      const r = readDeny.find((x) => ruleMatches(x, { tool: 'Read', value: call.value }))
      return r && { rule: r, what: `a Read deny also blocks edits to ${call.value}` }
    }
    if (call.tool !== 'Bash') return undefined
    for (const u of units) {
      const t = fileTargets(u)
      for (const f of t.reads) {
        const r = readDeny.find((x) => ruleMatches(x, { tool: 'Read', value: f }))
        if (r) return { rule: r, what: `“${u}” reads ${f}` }
      }
      for (const f of t.writes) {
        const r =
          editDeny.find((x) => ruleMatches(x, { tool: 'Edit', value: f })) ??
          readDeny.find((x) => ruleMatches(x, { tool: 'Read', value: f }))
        if (r) return { rule: r, what: `“${u}” writes ${f}` }
      }
    }
    return undefined
  }

  for (const kind of ['deny', 'ask'] as Kind[]) {
    const rules = settings.rules.filter((r) => r.kind === kind && r.tool)
    let hit: { rule: Rule; part: string } | undefined
    for (const u of units) {
      const r = rules.find((x) => ruleMatches(x, call, u))
      if (r) {
        hit = { rule: r, part: u }
        break
      }
    }
    const label = kind === 'deny' ? 'Deny rules' : 'Ask rules'
    const fh = kind === 'deny' && !hit ? fileHit() : undefined
    if (hit || fh) {
      const raw = hit ? hit.rule.raw : fh!.rule.raw
      trail.push({
        step: label,
        result: fh
          ? `${raw} matches: ${fh.what}.`
          : units.length > 1
            ? `${raw} matches the part “${hit!.part}”.`
            : `${raw} matches.`,
        hit: true,
      })
      return finish({
        outcome: kind,
        verdict: kind === 'deny' ? 'Blocked' : 'Asks you',
        rule: raw,
        reason:
          kind === 'deny'
            ? fh
              ? `${raw} is a deny rule, and ${fh.what}. Claude Code checks file commands and edits against Read and Edit deny rules.`
              : `Deny is checked first, and ${raw} matches. No allow rule can override it.`
            : `${raw} matches, so Claude Code asks you every time, even if an allow rule also matches.`,
        trail,
        parts: units.length > 1 ? units : undefined,
      })
    }
    trail.push({ step: label, result: 'No match.' })
  }

  const protectedWrite =
    (call.tool === 'Edit' || call.tool === 'Write') && PROTECTED.test(resolveTarget(call.value))
  const allows = settings.rules.filter((r) => r.kind === 'allow' && r.tool)
  const perPart = units.map((u) => ({
    u,
    r: allows.find((x) => ruleMatches(x, call, u)),
    ro: call.tool === 'Bash' && isReadOnly(u),
  }))
  const matched = perPart.filter((p) => p.r)
  if (!unparseable && !protectedWrite && matched.length && perPart.every((p) => p.r || p.ro)) {
    const names = Array.from(new Set(matched.map((p) => p.r!.raw)))
    const roParts = perPart.filter((p) => !p.r && p.ro).map((p) => p.u)
    trail.push({
      step: 'Allow rules',
      result:
        units.length > 1
          ? `Every part is covered (${names.join(', ')}${roParts.length ? `; “${roParts.join('”, “')}” is read-only` : ''}).`
          : `${names[0]} matches.`,
      hit: true,
    })
    return finish({
      outcome: 'allow',
      verdict: 'Runs',
      rule: names.join(', '),
      reason: `${names.join(' + ')} ${names.length > 1 ? 'allow' : 'allows'} it${roParts.length ? ' (the rest is read-only)' : ''}, so it runs without a prompt.`,
      trail,
      parts: units.length > 1 ? units : undefined,
    })
  }
  const missing = perPart.filter((p) => !p.r && !p.ro).map((p) => p.u)
  trail.push({
    step: 'Allow rules',
    result: protectedWrite
      ? 'Allow rules don’t pre-approve writes to protected paths like .git and .claude.'
      : unparseable
        ? 'The command ends in && or ||, so Claude Code can’t split it and no allow rule applies.'
        : units.length > 1 && matched.length
          ? `Not every part is allowed: “${missing.join('”, “')}” has no allow rule.`
          : 'No match.',
  })
  const m = modeOutcome(mode, call)
  const modeLabel =
    !modeOverride && eff.ignored
      ? `Mode: default (your file sets ${eff.ignored}, which a project file can’t do)`
      : `Mode: ${mode}`
  trail.push({ step: modeLabel, result: m.reason, hit: true })
  return finish({
    outcome: 'mode',
    verdict: m.verdict,
    reason: m.reason,
    trail,
    parts: units.length > 1 ? units : undefined,
  })
}

/* ------------------------------------------------------------------ */
/* Checks on the settings file                                          */
/* ------------------------------------------------------------------ */

export type Level = 'fail' | 'warn' | 'pass' | 'info'

export interface Finding {
  id: string
  level: Level
  title: string
  detail: string
  source: Source
}

export interface Report {
  ok: boolean
  error?: string
  findings: Finding[]
  passed: number
  total: number
  counts: { deny: number; ask: number; allow: number; hooks: number }
}

// Hook events listed in the hooks guide (opened 25 Nov 2026).
export const HOOK_EVENTS = [
  'SessionStart',
  'Setup',
  'UserPromptSubmit',
  'UserPromptExpansion',
  'PreToolUse',
  'PermissionRequest',
  'PermissionDenied',
  'PostToolUse',
  'PostToolUseFailure',
  'PostToolBatch',
  'Notification',
  'MessageDisplay',
  'SubagentStart',
  'SubagentStop',
  'TaskCreated',
  'TaskCompleted',
  'Stop',
  'StopFailure',
  'TeammateIdle',
  'InstructionsLoaded',
  'ConfigChange',
  'CwdChanged',
  'DirectoryAdded',
  'FileChanged',
  'WorktreeCreate',
  'WorktreeRemove',
  'PreCompact',
  'PostCompact',
  'PreModelSwitch',
  'PostModelSwitch',
  'Elicitation',
  'ElicitationResult',
  'SessionEnd',
]

export function checkSettings(text: string, scope: Scope = 'project'): Report {
  const empty = { deny: 0, ask: 0, allow: 0, hooks: 0 }
  if (!text.trim())
    return {
      ok: false,
      error: 'Paste a settings.json to check.',
      findings: [],
      passed: 0,
      total: 0,
      counts: empty,
    }
  const parsed = parseSettings(text)
  if (!parsed.ok)
    return { ok: false, error: parsed.error, findings: [], passed: 0, total: 0, counts: empty }
  const s = parsed.settings
  const f: Finding[] = []
  const add = (x: Finding) => f.push(x)
  const of = (k: Kind) => s.rules.filter((r) => r.kind === k)
  const counts = {
    deny: of('deny').length,
    ask: of('ask').length,
    allow: of('allow').length,
    hooks: s.hooks.length,
  }

  // 1. Mode
  if (s.mode === 'bypassPermissions' || s.mode === 'auto')
    add({
      id: 'bypass',
      level: s.mode === 'bypassPermissions' ? (scope === 'project' ? 'warn' : 'fail') : 'info',
      title:
        scope === 'project'
          ? `defaultMode "${s.mode}" is ignored in a project file`
          : `defaultMode is ${s.mode}`,
      detail:
        scope === 'project'
          ? s.mode === 'bypassPermissions'
            ? 'In .claude/settings.json or settings.local.json this value doesn’t take effect and the session starts in Manual mode. Remove it so nobody thinks it works. In ~/.claude/settings.json it would skip prompts, which Anthropic says to use only in containers or VMs.'
            : 'In .claude/settings.json or settings.local.json "auto" doesn’t take effect; Claude Code uses its built-in default instead. Set it in ~/.claude/settings.json if you want it.'
          : s.mode === 'bypassPermissions'
            ? 'Every call that no rule catches runs without asking. Anthropic: only use this mode in isolated environments like containers or VMs.'
            : 'Calls no rule catches go to a background classifier. Anthropic: auto mode reduces prompts but does not guarantee safety.',
      source: SRC.modes,
    })
  else
    add({
      id: 'bypass',
      level: 'pass',
      title: s.mode ? `defaultMode is ${s.mode}` : 'No risky defaultMode set',
      detail: 'Calls that no rule catches still go through a prompt or a check.',
      source: SRC.modes,
    })
  for (const um of s.unknownModes)
    add({
      id: 'mode-unknown',
      level: 'warn',
      title: `Unknown defaultMode "${um}"`,
      detail:
        'The documented modes are default, acceptEdits, plan, auto, dontAsk and bypassPermissions.',
      source: SRC.permissions,
    })

  // 2. Secrets
  const envDenied = of('deny').some((r) => ruleMatches(r, { tool: 'Read', value: '.env' }))
  add({
    id: 'env',
    level: envDenied ? 'pass' : 'warn',
    title: envDenied ? 'Reading .env is denied' : 'Nothing stops Claude reading .env',
    detail: envDenied
      ? 'A deny rule covers .env. Note: it does not stop a script Claude runs from opening the file itself; the sandbox does that.'
      : 'Add "Read(./.env)" and "Read(./.env.*)" to deny, as in Anthropic’s settings example. A line in CLAUDE.md is only a request.',
    source: envDenied ? SRC.permissions : SRC.settings,
  })

  // 3. Rules that never match / are malformed
  const dead = s.rules.filter(
    (r) => /^(Write|NotebookEdit|Glob|MultiEdit)$/.test(r.tool) && r.spec !== undefined
  )
  add({
    id: 'write-rule',
    level: dead.length ? 'fail' : 'pass',
    title: dead.length
      ? `${dead.length} rule${dead.length > 1 ? 's' : ''} that never match${dead.length > 1 ? '' : 'es'}: ${dead.map((r) => r.raw).join(', ')}`
      : 'No Write(path) rules that would never match',
    detail: dead.length
      ? 'Claude Code checks file permissions against Edit(path) and Read(path) rules only. A Write, NotebookEdit or Glob path rule is accepted but never used. Write it as Edit(…) instead.'
      : 'File rules use Edit(path) and Read(path), which are the two Claude Code checks.',
    source: SRC.permissions,
  })
  const bad = s.rules.filter((r) => !r.tool)
  if (bad.length)
    add({
      id: 'malformed',
      level: 'fail',
      title: `${bad.length} rule${bad.length > 1 ? 's' : ''} not in Tool or Tool(specifier) form`,
      detail: `Check: ${bad.map((r) => r.raw).join(', ')}`,
      source: SRC.permissions,
    })
  const mcpParen = s.rules.filter((r) => r.tool.startsWith('mcp__') && r.spec !== undefined)
  if (mcpParen.length)
    add({
      id: 'mcp-paren',
      level: 'fail',
      title: `MCP rule with brackets is skipped: ${mcpParen.map((r) => r.raw).join(', ')}`,
      detail:
        'Write mcp__server__tool, or mcp__server__* for every tool from a server, with no brackets.',
      source: SRC.permissions,
    })
  const singleSlash = s.rules.filter(
    (r) =>
      (r.tool === 'Read' || r.tool === 'Edit') &&
      r.spec &&
      /^\/(Users|home|etc|var|tmp|opt|root|mnt)\//.test(r.spec)
  )
  if (singleSlash.length)
    add({
      id: 'slash',
      level: 'warn',
      title: `Looks like an absolute path with one slash: ${singleSlash.map((r) => r.raw).join(', ')}`,
      detail:
        'One leading slash means “relative to the settings file’s project”, not the filesystem root. Use two slashes for an absolute path: Read(//Users/alice/secrets/**).',
      source: SRC.permissions,
    })
  const midColon = s.rules.filter((r) => r.tool === 'Bash' && r.spec && /:\*\s*\S/.test(r.spec))
  if (midColon.length)
    add({
      id: 'colon',
      level: 'warn',
      title: `":*" in the middle of a pattern: ${midColon.map((r) => r.raw).join(', ')}`,
      detail:
        'The :* form only works at the end. In the middle the colon is a literal character, so the rule matches nothing you expect. Use a space: Bash(git push *).',
      source: SRC.permissions,
    })
  const noSpace = s.rules.filter(
    (r) => r.tool === 'Bash' && r.spec && /[A-Za-z0-9]\*$/.test(r.spec.trim())
  )
  if (noSpace.length)
    add({
      id: 'nospace',
      level: 'info',
      title: `No space before the *: ${noSpace.map((r) => r.raw).join(', ')}`,
      detail:
        'Bash(ls*) also matches lsof. Bash(ls *) needs a space after ls, so it matches ls and ls -la but not lsof.',
      source: SRC.permissions,
    })

  // 4. Broad allows
  const broad = of('allow').filter(
    (r) =>
      (r.tool === 'Bash' && (r.spec === undefined || r.spec.trim() === '*')) ||
      (r.tool === 'Edit' && (r.spec === undefined || r.spec === '**'))
  )
  add({
    id: 'broad',
    level: broad.length ? 'warn' : 'pass',
    title: broad.length
      ? `Very broad allow: ${broad.map((r) => r.raw).join(', ')}`
      : 'No allow rule that approves every command or edit',
    detail: broad.length
      ? 'This approves every shell command (or every edit) without a prompt, so only deny and ask rules stand in the way. Allow the exact commands you run instead, e.g. Bash(npm run test *).'
      : 'Allow rules name specific commands, so everything else still prompts.',
    source: SRC.permissions,
  })

  // 5. Allows that a deny cancels
  const shadow = of('allow').filter((a) =>
    of('deny').some((d) => d.raw === a.raw || (d.tool === a.tool && d.spec === undefined))
  )
  if (shadow.length)
    add({
      id: 'shadow',
      level: 'info',
      title: `Allow rule cancelled by a deny: ${shadow.map((r) => r.raw).join(', ')}`,
      detail:
        'Deny is checked first. An allow rule can’t carve an exception out of a deny rule, so this allow does nothing.',
      source: SRC.permissions,
    })

  // 6. Push / destructive commands
  const pushStopped = ['git push origin main', 'git push --force'].every((c) =>
    of('deny')
      .concat(of('ask'))
      .some((r) => ruleMatches(r, { tool: 'Bash', value: c }, c))
  )
  add({
    id: 'push',
    level: pushStopped ? 'pass' : 'warn',
    title: pushStopped
      ? 'git push needs a deny or ask'
      : 'git push can run without a rule stopping it',
    detail: pushStopped
      ? 'A deny or ask rule catches git push, including inside a chain like “npm test && git push”.'
      : 'Add "Bash(git push *)" to ask (or deny) so a push never happens silently. Deny and ask apply when any part of a chained command matches.',
    source: SRC.permissions,
  })

  // 7. Hooks
  const unknownEv = Array.from(
    new Set(s.hooks.map((h) => h.event).filter((e) => !HOOK_EVENTS.includes(e)))
  )
  if (unknownEv.length)
    add({
      id: 'event',
      level: 'fail',
      title: `Hook event not in Claude Code’s list: ${unknownEv.join(', ')}`,
      detail:
        'Event names are case-sensitive, e.g. PreToolUse, PostToolUse, Stop. A misspelt event never fires.',
      source: SRC.hooksGuide,
    })
  const unquoted = s.hooks.filter(
    (h) => !h.exec && /(^|[^"'])\$\{?CLAUDE_PROJECT_DIR/.test(h.command)
  )
  if (unquoted.length)
    add({
      id: 'quote',
      level: 'warn',
      title: 'Unquoted $CLAUDE_PROJECT_DIR in a hook command',
      detail:
        'A project path with a space breaks the command. Anthropic’s examples write "\\"$CLAUDE_PROJECT_DIR\\"/.claude/hooks/…" and its security notes say always quote shell variables.',
      source: SRC.hooks,
    })
  const modelHooks = s.hooks.filter(
    (h) =>
      (h.type === 'prompt' || h.type === 'agent') &&
      (h.event === 'PreToolUse' || h.event === 'Stop')
  )
  if (modelHooks.length)
    add({
      id: 'model-hook',
      level: 'info',
      title: `${modelHooks.length} prompt/agent hook${modelHooks.length > 1 ? 's' : ''} used as a gate`,
      detail:
        'A prompt hook is a “single-turn LLM evaluation” and an agent hook is experimental, so the answer can vary from run to run. For a rule that must always hold, use a command hook (a script) or a deny rule.',
      source: SRC.hooksGuide,
    })
  const postBlock = s.hooks.filter(
    (h) => h.event === 'PostToolUse' && /protect|block|guard|deny/i.test(h.command)
  )
  if (postBlock.length)
    add({
      id: 'post',
      level: 'warn',
      title: 'A blocking script on PostToolUse',
      detail:
        'PostToolUse hooks can’t undo actions since the tool has already executed. Put guards on PreToolUse; keep PostToolUse for formatters and checks.',
      source: SRC.hooksGuide,
    })
  const preGuard = s.hooks.some(
    (h) => h.event === 'PreToolUse' && h.type !== 'prompt' && h.type !== 'agent'
  )
  add({
    id: 'pre',
    level: preGuard ? 'pass' : 'info',
    title: preGuard ? 'Has a PreToolUse command hook' : 'No PreToolUse command hook',
    detail: preGuard
      ? 'A PreToolUse hook that exits 2 blocks the call before permission rules are checked, in every mode, even bypassPermissions.'
      : 'Rules cover most needs. Add a PreToolUse hook only for a check a pattern can’t express (for example, “block edits to any file under migrations/ unless a ticket ID is in the prompt”).',
    source: SRC.hooksGuide,
  })
  if (!counts.deny)
    add({
      id: 'nodeny',
      level: 'warn',
      title: 'No deny rules at all',
      detail:
        'Start with the two or three things that must never happen (read secrets, push to main, delete the database) and deny them.',
      source: SRC.permissions,
    })

  const graded = f.filter((x) => x.level !== 'info')
  const order: Record<Level, number> = { fail: 0, warn: 1, info: 2, pass: 3 }
  f.sort((a, b) => order[a.level] - order[b.level])
  return {
    ok: true,
    findings: f,
    passed: graded.filter((x) => x.level === 'pass').length,
    total: graded.length,
    counts,
  }
}

/* ------------------------------------------------------------------ */
/* Samples and test calls (fictional project "jobtrack")                */
/* ------------------------------------------------------------------ */

export const SAMPLE_BEFORE = `{
  "permissions": {
    "defaultMode": "bypassPermissions",
    "allow": [
      "Bash",
      "Edit"
    ],
    "deny": [
      "Write(prisma/migrations/**)"
    ]
  },
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          { "type": "command", "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/protect-files.sh" }
        ]
      }
    ]
  }
}
`

export const SAMPLE_AFTER = `{
  "permissions": {
    "defaultMode": "acceptEdits",
    "allow": [
      "Bash(pnpm test *)",
      "Bash(pnpm lint)",
      "Bash(pnpm typecheck)",
      "Bash(git status)",
      "Bash(git diff *)"
    ],
    "ask": [
      "Bash(git push *)",
      "Bash(rm *)",
      "Bash(pnpm add *)"
    ],
    "deny": [
      "Read(.env)",
      "Read(.env.*)",
      "Edit(prisma/migrations/**)",
      "Bash(rm -rf *)",
      "Bash(git push --force *)"
    ]
  },
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          { "type": "command", "command": "\\"$CLAUDE_PROJECT_DIR\\"/.claude/hooks/protect-files.sh" }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          { "type": "command", "command": "npx prettier --write \\"$(jq -r '.tool_input.file_path')\\"" }
        ]
      }
    ]
  }
}
`

export const TEST_CALLS: { label: string; call: Call; risky: boolean }[] = [
  { label: 'Run the tests', call: { tool: 'Bash', value: 'pnpm test --run' }, risky: false },
  { label: 'Read the secrets file', call: { tool: 'Read', value: '.env' }, risky: true },
  {
    label: 'Read production secrets',
    call: { tool: 'Read', value: 'config/.env.production' },
    risky: true,
  },
  {
    label: 'Edit a source file',
    call: { tool: 'Edit', value: 'src/app/jobs/page.tsx' },
    risky: false,
  },
  {
    label: 'Rewrite a migration',
    call: { tool: 'Write', value: 'prisma/migrations/0007_stages/migration.sql' },
    risky: true,
  },
  {
    label: 'Test, then push',
    call: { tool: 'Bash', value: 'pnpm test && git push origin main' },
    risky: true,
  },
  {
    label: 'Force-push',
    call: { tool: 'Bash', value: 'git push --force origin main' },
    risky: true,
  },
  { label: 'Delete a folder', call: { tool: 'Bash', value: 'rm -rf prisma' }, risky: true },
]

export function unchecked(text: string, scope: Scope = 'project') {
  const out = {
    risky: 0,
    riskyRun: 0,
    riskyBlocked: 0,
    riskyAsk: 0,
    total: TEST_CALLS.length,
    prompts: 0,
  }
  const p = parseSettings(text)
  if (!p.ok) return out
  for (const t of TEST_CALLS) {
    const d = decide(p.settings, t.call, undefined, scope)
    if (t.risky) {
      out.risky++
      if (d.verdict === 'Runs') out.riskyRun++
      if (d.verdict === 'Blocked') out.riskyBlocked++
      if (d.verdict === 'Asks you') out.riskyAsk++
    }
    if (d.verdict === 'Asks you') out.prompts++
  }
  return out
}
