// Instruction-file checker for the lesson /learn-ai/claude-md-agents-md.
// Pure functions, no AI, no network. Every check names the page it comes from (opened 21 Nov 2026):
//  - Claude Code memory:          https://code.claude.com/docs/en/memory
//  - Claude Code best practices:  https://code.claude.com/docs/en/best-practices
//  - Anthropic blog (CLAUDE.md):  https://claude.com/blog/using-claude-md-files
//  - Codex AGENTS.md (32 KiB):    https://learn.chatgpt.com/docs/agent-configuration/agents-md
//  - Cursor rules (500 lines):    https://cursor.com/docs/rules
//  - GitHub, 2,500 agents.md:     https://github.blog/ai-and-ml/github-copilot/how-to-write-a-great-agents-md-lessons-from-over-2500-repositories/
//  - ETH Zurich, arXiv 2602.11988 (overviews not helpful): https://arxiv.org/abs/2602.11988
//  - OpenAI tokens rule of thumb (1 token ≈ 4 characters): https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them

export const CHECKED = '21 Nov 2026'

export type Level = 'fail' | 'warn' | 'pass' | 'info'

export interface Finding {
  id: string
  level: Level
  title: string
  detail: string
  /** line numbers (1-based) the finding points at, at most a few */
  lines?: number[]
  source: { label: string; url: string }
}

export interface Report {
  lines: number // non-empty and empty lines, as an editor counts them
  bytes: number
  tokens: number // rough: characters / 4
  findings: Finding[]
  passed: number
  total: number // pass + warn + fail (info excluded)
}

export const SRC = {
  memory: { label: 'Claude Code docs: memory', url: 'https://code.claude.com/docs/en/memory' },
  best: {
    label: 'Claude Code docs: best practices',
    url: 'https://code.claude.com/docs/en/best-practices',
  },
  blog: {
    label: 'Anthropic: Using CLAUDE.md files',
    url: 'https://claude.com/blog/using-claude-md-files',
  },
  codex: {
    label: 'OpenAI Codex: AGENTS.md',
    url: 'https://learn.chatgpt.com/docs/agent-configuration/agents-md',
  },
  cursor: { label: 'Cursor docs: rules', url: 'https://cursor.com/docs/rules' },
  github: {
    label: 'GitHub blog: lessons from 2,500 agents.md files',
    url: 'https://github.blog/ai-and-ml/github-copilot/how-to-write-a-great-agents-md-lessons-from-over-2500-repositories/',
  },
  eth: {
    label: 'ETH Zurich: Evaluating AGENTS.md (arXiv 2602.11988)',
    url: 'https://arxiv.org/abs/2602.11988',
  },
  tokens: {
    label: 'OpenAI: what are tokens',
    url: 'https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them',
  },
} as const

const CMD =
  /(^|[\s`])(npm|pnpm|yarn|bun|npx|pytest|python -m|uv run|poetry run|make|go test|go build|cargo|mvn|gradle|\.\/gradlew|dotnet|rspec|bundle exec|rake|composer|php artisan|ruff|eslint|tsc|jest|vitest|deno)\b/i
// A command at the start of a line or list item, optionally after a short label ("- Test: pnpm test").
// Case-sensitive on purpose, so prose like "Make sure it works" does not count.
const BARE_CMD =
  /^\s*(?:[-*]\s+|\d+[.)]\s+)?(?:[^:`]{1,40}:\s+)?(?:npm|pnpm|yarn|bun|npx|pytest|python3? -m|uv run|uv sync|poetry run|make(?! sure)|go test|go build|go run|cargo|mvn|gradle|\.\/gradlew|dotnet|rspec|bundle exec|rake|composer|php artisan|ruff|eslint|tsc|jest|vitest|deno|docker compose|pip install)\s+\S/
const SECRET: { re: RegExp; what: string }[] = [
  { re: /\bsk-(ant-|proj-)?[A-Za-z0-9_-]{16,}/, what: 'an API key (sk-…)' },
  { re: /\bAKIA[0-9A-Z]{16}\b/, what: 'an AWS access key (AKIA…)' },
  { re: /\bgh[pousr]_[A-Za-z0-9]{20,}/, what: 'a GitHub token (ghp_…)' },
  { re: /\bxox[baprs]-[A-Za-z0-9-]{10,}/, what: 'a Slack token (xox…)' },
  { re: /-----BEGIN [A-Z ]*PRIVATE KEY-----/, what: 'a private key' },
  {
    re: /\b[a-z][a-z0-9+.-]*:\/\/[^\s:/@]+:[^\s@/]{3,}@[^\s]+/i,
    what: 'a connection string with a password',
  },
  {
    re: /\b(password|passwd|secret|api[_-]?key|token)\s*[:=]\s*["']?[^\s"'`<>]{6,}/i,
    what: 'a password or key value',
  },
]
const VAGUE =
  /\b(properly|clean code|best practices?|be careful|good code|high[- ]quality code|as needed|when appropriate|where appropriate|make sure (it|everything) works|follow (the )?conventions|write good|be smart|use common sense|idiomatic)\b/i
const SHOUT = /\b(IMPORTANT|YOU MUST|CRITICAL|NEVER EVER|ALWAYS ALWAYS|MANDATORY|ABSOLUTELY)\b/
const OVERVIEW_HEAD =
  /^#{1,4}\s*(project )?(overview|architecture|project structure|folder structure|directory structure|directory layout|file structure|codebase structure|repo(sitory)? structure|tech stack)\b/i
const FORMAT_RULE =
  /\b(indent(ation)?|semicolons?|trailing commas?|tabs? (vs|or) spaces|2[- ]space|4[- ]space|line length|max line|single quotes|double quotes|import order|sort imports|camelCase|snake_case|PascalCase)\b/i
const LINT_CMD =
  /\b(lint|eslint|ruff|prettier|black|flake8|rubocop|gofmt|golangci|biome|clippy|format)\b/i
const BOUNDARY = /\b(never|don['’]t|do not|ask (me )?(first|before)|always|must not|avoid)\b/i
const NEG_USE =
  /\b(?:never|don['’]t|do not|avoid)\s+(?:use|using|add|adding|import)\s+([A-Za-z][\w.@/-]{1,30})/gi
const NEG_USE_1 = new RegExp(NEG_USE.source, 'i')
const POS_USE = (w: string) =>
  new RegExp(
    `(^|[^a-z'’])(use|always use|prefer)\\s+${w.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')}\\b`,
    'i'
  )

/** "password: ${DB_PASSWORD}", "apiKey = process.env.API_KEY", "token: refreshToken is rotated" are references, not secrets. */
function looksLikeReference(l: string): boolean {
  const m = l.match(/\b(?:password|passwd|secret|api[_-]?key|token)\s*[:=]\s*["']?([^\s"'`<>]+)/i)
  if (!m) return false
  const v = m[1]
  if (
    /^(process\.env|\$|os\.environ|env\(|<|your|example|xxx|\*\*\*|changeme|placeholder)/i.test(v)
  )
    return true
  if (v.length < 16 && !/[\d!@#%^&*+=?~]/.test(v)) return true
  return false
}

const plural = (n: number, one: string, many = one + 's') => `${n} ${n === 1 ? one : many}`
const an = (n: number) =>
  /^8/.test(String(n)) || n === 11 || n === 18 || (n >= 1100 && n < 1200) || (n >= 1800 && n < 1900)
    ? 'An'
    : 'A'

/** Lines inside ``` fences are code (not checked for vague words or shouting). */
function fenceMask(lines: string[]): boolean[] {
  const mask: boolean[] = []
  let inFence = false
  for (const l of lines) {
    if (/^\s*(```|~~~)/.test(l)) {
      mask.push(true)
      inFence = !inFence
      continue
    }
    mask.push(inFence)
  }
  return mask
}

export function checkInstructionFile(raw: string): Report {
  const text = raw.replace(/\r\n?/g, '\n')
  const trimmed = text.replace(/\n+$/, '')
  const lines = trimmed === '' ? [] : trimmed.split('\n')
  const bytes = new TextEncoder().encode(text).length
  const tokens = Math.round(text.length / 4)
  const code = fenceMask(lines)
  const f: Finding[] = []
  const at = (pred: (l: string, i: number) => boolean) =>
    lines.map((l, i) => (pred(l, i) ? i + 1 : 0)).filter(Boolean)

  if (lines.length === 0) {
    return { lines: 0, bytes: 0, tokens: 0, findings: [], passed: 0, total: 0 }
  }

  // A thin CLAUDE.md that imports AGENTS.md: the rules live in the imported file.
  const importLines = lines.filter((l) => /^\s*@[\w./~-]+\.(md|mdc|txt)\s*$/.test(l)).length
  const contentLines = lines.filter((l) => l.trim() !== '' && !/^\s*@[\w./~-]+/.test(l)).length
  const thinImporter = importLines > 0 && contentLines < 15

  // 1. Length (Claude Code: under 200 lines; Cursor: under 500; Codex: 32 KiB cap)
  const n = lines.length
  if (n > 500)
    f.push({
      id: 'length',
      level: 'fail',
      title: `${n} lines: far over every tool’s advice`,
      detail:
        'Claude Code’s docs target under 200 lines per CLAUDE.md and Cursor says keep rules under 500. Every line is read on every task. Move procedures to skills and part-specific rules to path-scoped rule files.',
      source: SRC.memory,
    })
  else if (n > 200)
    f.push({
      id: 'length',
      level: 'warn',
      title: `${n} lines: over Claude Code’s 200-line target`,
      detail:
        'Anthropic: “Longer files consume more context and reduce adherence.” Cut what the agent can read from the code itself, then move multi-step procedures into a skill.',
      source: SRC.memory,
    })
  else
    f.push({
      id: 'length',
      level: 'pass',
      title: `${plural(n, 'line')}: under the 200-line target`,
      detail:
        'Short enough that every line can earn its place. Keep pruning as the project changes.',
      source: SRC.memory,
    })

  if (bytes > 32 * 1024)
    f.push({
      id: 'bytes',
      level: 'fail',
      title: `${(bytes / 1024).toFixed(1)} KiB: Codex stops at 32 KiB`,
      detail:
        'Codex’s project_doc_max_bytes defaults to 32 KiB; once the limit is reached it adds no more instruction files, so text past it may never reach the agent.',
      source: SRC.codex,
    })

  // 2. Secrets (fail)
  const secretHits: { line: number; what: string }[] = []
  lines.forEach((l, i) => {
    for (const s of SECRET)
      if (s.re.test(l) && !(s.what === 'a password or key value' && looksLikeReference(l))) {
        secretHits.push({ line: i + 1, what: s.what })
        break
      }
  })
  if (secretHits.length)
    f.push({
      id: 'secrets',
      level: 'fail',
      title: `Looks like ${secretHits[0].what}${secretHits.length > 1 ? ` (+${secretHits.length - 1} more)` : ''}`,
      detail:
        'Instruction files are usually committed to the repo. Anthropic: don’t include API keys, credentials or database connection strings. Put the variable name (e.g. DATABASE_URL in .env) instead, and rotate any key that was ever committed.',
      lines: secretHits.slice(0, 4).map((h) => h.line),
      source: SRC.blog,
    })
  else
    f.push({
      id: 'secrets',
      level: 'pass',
      title: 'No keys or passwords spotted',
      detail:
        'Nothing that looks like an API key, token, private key or password. (A pattern check can miss things; never paste a real key here.)',
      source: SRC.blog,
    })

  // 3. Commands, and how early they appear
  // A command counts when it is written as a command: in a code block, in `backticks`, or after "$ ".
  const isCmd = (l: string, i: number) =>
    (code[i] && CMD.test(l)) ||
    [...l.matchAll(/`([^`]+)`/g)].some((m) => CMD.test(' ' + m[1])) ||
    /^\s*\$\s+\S/.test(l) ||
    BARE_CMD.test(l) ||
    /^( {4}|\t)\S/.test(l)
  const cmdLines = at(isCmd)
  if (thinImporter)
    f.push({
      id: 'commands',
      level: 'info',
      title: 'This file imports another file',
      detail:
        'A short CLAUDE.md that imports AGENTS.md is Anthropic’s documented setup. The commands and limits should be in the imported file: paste that one to check it.',
      source: SRC.memory,
    })
  else if (cmdLines.length === 0)
    f.push({
      id: 'commands',
      level: 'fail',
      title: 'No build, test or lint command',
      detail:
        'Anthropic’s first item for the file: “the exact test, typecheck, and lint commands, and how to run a single test file”. GitHub found commands in an early section are what helpful files share.',
      source: SRC.best,
    })
  else {
    const first = cmdLines[0]
    const early = first <= Math.max(25, Math.ceil(n / 3))
    f.push({
      id: 'commands',
      level: early ? 'pass' : 'warn',
      title: early
        ? `${plural(cmdLines.length, 'command line')}, first one at line ${first}`
        : `First command is at line ${first} of ${n}`,
      detail: early
        ? 'The agent can check its own work. Make sure one of them runs a single test file.'
        : 'GitHub’s review of 2,500 files: “Put relevant executable commands in an early section.” Move them near the top.',
      lines: cmdLines.slice(0, 3),
      source: early ? SRC.best : SRC.github,
    })
  }

  // 4. Vague lines
  const vague = at((l, i) => !code[i] && VAGUE.test(l))
  if (vague.length)
    f.push({
      id: 'vague',
      level: 'warn',
      title: `${plural(vague.length, 'vague line')} the agent can’t act on`,
      detail:
        'Anthropic’s example: write “Use 2-space indentation” instead of “Format code properly”. GitHub: “Most agent files fail because they’re too vague.” Replace each with the exact rule or delete it.',
      lines: vague.slice(0, 4),
      source: SRC.memory,
    })
  else
    f.push({
      id: 'vague',
      level: 'pass',
      title: 'No vague filler found',
      detail: 'No “write clean code” or “follow best practices” lines.',
      source: SRC.best,
    })

  // 5. Shouting
  const shout = at((l, i) => !code[i] && SHOUT.test(l))
  if (shout.length >= 3)
    f.push({
      id: 'shout',
      level: 'warn',
      title: `${plural(shout.length, 'shouted line')} (IMPORTANT, YOU MUST…)`,
      detail:
        'Anthropic: current models “follow a plainly worded line, and piling on emphasis mostly makes Claude over-apply the rule.” If a rule must happen every time, make it a hook or a deny rule.',
      lines: shout.slice(0, 4),
      source: SRC.best,
    })
  else
    f.push({
      id: 'shout',
      level: 'pass',
      title: shout.length
        ? `Only ${plural(shout.length, 'shouted line')}`
        : 'Plain wording, no shouting',
      detail: 'Plainly worded lines are what current models follow best.',
      source: SRC.best,
    })

  // 6. Long overview / architecture section
  let ovStart = 0
  let ovLen = 0
  for (let i = 0; i < n; i++) {
    if (!code[i] && OVERVIEW_HEAD.test(lines[i])) {
      const level = (lines[i].match(/^#+/) || ['#'])[0].length
      let j = i + 1
      while (j < n && !(!code[j] && new RegExp(`^#{1,${level}}\\s`).test(lines[j]))) j++
      const len = lines.slice(i + 1, j).filter((l) => l.trim() !== '').length
      if (len > ovLen) {
        ovLen = len
        ovStart = i + 1
      }
    }
  }
  if (ovLen > 12)
    f.push({
      id: 'overview',
      level: 'warn',
      title: `${an(ovLen)} ${ovLen}-line overview or structure section`,
      detail:
        'ETH Zurich (2026) found repository overviews “are not helpful”, and Anthropic says the agent reads the repo itself. Keep only what the code hides: a misleading old folder, the one place new code must go.',
      lines: [ovStart],
      source: SRC.eth,
    })

  // 7. Formatting rules a linter should own
  const fmt = at((l, i) => !code[i] && FORMAT_RULE.test(l))
  const hasLint = lines.some((l, i) => isCmd(l, i) && LINT_CMD.test(l))
  if (fmt.length >= 3 && !hasLint)
    f.push({
      id: 'format',
      level: 'warn',
      title: `${plural(fmt.length, 'formatting rule')} but no lint command`,
      detail:
        'Anthropic: if the repo has a linter or formatter, “the single most useful line in your CLAUDE.md is the command that runs it.” Let the tool enforce style and list the command instead.',
      lines: fmt.slice(0, 4),
      source: SRC.best,
    })

  // 8. Boundaries (always / ask first / never)
  const bound = at((l, i) => !code[i] && BOUNDARY.test(l))
  if (!thinImporter)
    f.push(
      bound.length >= 2
        ? {
            id: 'boundaries',
            level: 'pass',
            title: `${plural(bound.length, 'boundary line')} (always, ask first, never)`,
            detail: 'Clear limits are among the most useful lines GitHub found in real files.',
            source: SRC.github,
          }
        : {
            id: 'boundaries',
            level: 'warn',
            title: 'No clear limits',
            detail:
              'GitHub: “Set clear rules using always do, ask first, never do.” For example: never edit migrations by hand; ask first before adding a dependency.',
            source: SRC.github,
          }
    )

  // 9. Contradictions: "never use X" and "use X"
  const contra: { word: string; neg: number; pos: number }[] = []
  lines.forEach((l, i) => {
    if (code[i]) return
    for (const m of l.matchAll(NEG_USE)) {
      const w = m[1].replace(/[.,;:]+$/, '')
      const pos = lines.findIndex(
        (o, k) => k !== i && !code[k] && POS_USE(w).test(o) && !NEG_USE_1.test(o)
      )
      if (pos >= 0 && !contra.some((c) => c.word.toLowerCase() === w.toLowerCase()))
        contra.push({ word: w, neg: i + 1, pos: pos + 1 })
    }
  })
  if (contra.length)
    f.push({
      id: 'contradiction',
      level: 'warn',
      title: `Rules both against and for “${contra[0].word}”`,
      detail:
        'Check the two lines agree. Anthropic: “if two rules contradict each other, Claude may pick one arbitrarily.” Keep one rule, or say plainly when each applies.',
      lines: [contra[0].neg, contra[0].pos],
      source: SRC.memory,
    })

  // 10. Long numbered procedures → skill
  let run = 0
  let best = 0
  let bestAt = 0
  let runStart = 0
  lines.forEach((l, i) => {
    if (/^\s*\d+[.)]\s/.test(l)) {
      if (run === 0) runStart = i + 1
      run++
      if (run > best) {
        best = run
        bestAt = runStart
      }
    } else if (l.trim() !== '') run = 0
  })
  if (best >= 7)
    f.push({
      id: 'procedure',
      level: 'warn',
      title: `${an(best)} ${best}-step numbered list inside the file`,
      detail:
        'Anthropic: “If an entry is a multi-step procedure or only matters for one part of the codebase, move it to a skill or a path-scoped rule instead.” It then loads only when needed.',
      lines: [bestAt],
      source: SRC.memory,
    })

  // 11. Duplicate lines
  const seen = new Map<string, number>()
  const dups: number[] = []
  lines.forEach((l, i) => {
    const k = l.trim().toLowerCase().replace(/\s+/g, ' ')
    if (code[i] || k.length < 12 || /^[#>*\-|`]+$/.test(k)) return
    if (seen.has(k)) dups.push(i + 1)
    else seen.set(k, i + 1)
  })
  if (dups.length)
    f.push({
      id: 'duplicates',
      level: 'warn',
      title: `${plural(dups.length, 'repeated line')}`,
      detail:
        'The same rule twice costs context twice and drifts apart when someone edits one copy.',
      lines: dups.slice(0, 4),
      source: SRC.best,
    })

  // 12. An example of real code
  const hasFence = lines.some((l) => /^\s*```/.test(l))
  f.push(
    hasFence
      ? {
          id: 'example',
          level: 'pass',
          title: 'Has a code block',
          detail:
            'GitHub: “One real code snippet showing your style beats three paragraphs describing it.”',
          source: SRC.github,
        }
      : {
          id: 'example',
          level: 'info',
          title: 'No code block',
          detail:
            'Optional. If a style rule needs explaining, one short real snippet usually says it better than a paragraph (GitHub’s finding).',
          source: SRC.github,
        }
  )

  // 13. Imports (@path) - info only
  const imports = at((l, i) => !code[i] && /(^|\s)@[\w./~-]+\.(md|mdc|txt)\b/.test(l))
  if (imports.length)
    f.push({
      id: 'imports',
      level: 'info',
      title: `${plural(imports.length, '@import')} found`,
      detail:
        'In Claude Code, imported files load with the file that imports them (up to four hops deep), so they organise a long file but don’t cut its context cost.',
      lines: imports.slice(0, 3),
      source: SRC.memory,
    })

  const order: Record<Level, number> = { fail: 0, warn: 1, info: 3, pass: 2 }
  f.sort((a, b) => order[a.level] - order[b.level])
  const scored = f.filter((x) => x.level !== 'info')
  return {
    lines: n,
    bytes,
    tokens,
    findings: f,
    passed: scored.filter((x) => x.level === 'pass').length,
    total: scored.length,
  }
}

// ---------- Which file should I create? (by the tools you use) ----------

export type ToolId = 'claude' | 'codex' | 'cursor' | 'copilot' | 'gemini'

export const TOOLS: {
  id: ToolId
  name: string
  file: string
  readsAgents: string
  scoped: string
  source: { label: string; url: string }
}[] = [
  {
    id: 'claude',
    name: 'Claude Code',
    file: 'CLAUDE.md (also ~/.claude/CLAUDE.md, CLAUDE.local.md)',
    readsAgents: 'Import it: put @AGENTS.md in CLAUDE.md',
    scoped: '.claude/rules/*.md with paths in the header',
    source: SRC.memory,
  },
  {
    id: 'codex',
    name: 'OpenAI Codex',
    file: 'AGENTS.md (also ~/.codex/AGENTS.md, AGENTS.override.md)',
    readsAgents: 'Yes, natively',
    scoped: 'An AGENTS.md in the subfolder',
    source: SRC.codex,
  },
  {
    id: 'cursor',
    name: 'Cursor',
    file: '.cursor/rules/*.mdc, or AGENTS.md',
    readsAgents: 'Yes, root and subfolders',
    scoped: 'A rule with globs in its header',
    source: SRC.cursor,
  },
  {
    id: 'copilot',
    name: 'GitHub Copilot',
    file: '.github/copilot-instructions.md, or AGENTS.md (or a root CLAUDE.md / GEMINI.md)',
    readsAgents: 'Yes, nearest file wins',
    scoped: '.github/instructions/*.instructions.md with applyTo in the header',
    source: {
      label: 'GitHub docs: repository custom instructions',
      url: 'https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions',
    },
  },
  {
    id: 'gemini',
    name: 'Gemini CLI',
    file: 'GEMINI.md (also ~/.gemini/GEMINI.md)',
    readsAgents: 'If you set context.fileName to AGENTS.md',
    scoped: 'A GEMINI.md in the subfolder',
    source: {
      label: 'Gemini CLI docs: GEMINI.md',
      url: 'https://geminicli.com/docs/cli/gemini-md/',
    },
  },
]

export function filePlan(picked: ToolId[]): {
  files: { path: string; body: string }[]
  note: string
} {
  const set = new Set(picked)
  if (set.size === 0) return { files: [], note: 'Pick the tools you or your team use.' }
  const others = picked.filter((t) => t !== 'claude')
  const onlyClaude = set.size === 1 && set.has('claude')
  const files: { path: string; body: string }[] = []
  if (onlyClaude) {
    files.push({ path: 'CLAUDE.md', body: '# Your rules here (aim for under 200 lines)' })
    return {
      files,
      note: 'Only Claude Code: one CLAUDE.md at the project root is enough. Run /init for a first draft, then delete what the agent could work out from the code.',
    }
  }
  files.push({ path: 'AGENTS.md', body: '# Your shared rules here, written once for every tool' })
  if (set.has('claude'))
    files.push({
      path: 'CLAUDE.md',
      body: '@AGENTS.md\n\n# Claude Code only (optional)\n# e.g. use plan mode for changes under src/billing/',
    })
  if (set.has('gemini'))
    files.push({
      path: '.gemini/settings.json',
      body: '{ "context": { "fileName": ["AGENTS.md", "GEMINI.md"] } }',
    })
  const names = picked.map((t) => TOOLS.find((x) => x.id === t)?.name).filter(Boolean)
  return {
    files,
    note:
      others.length && set.has('claude')
        ? `${names.join(', ')}: write the rules once in AGENTS.md. Claude Code gets them through the one-line @AGENTS.md import (Anthropic’s documented way)${set.has('gemini') ? ', and Gemini CLI through its settings file' : ''}.`
        : `${names.join(', ')}: one AGENTS.md at the project root${set.has('gemini') ? ', plus a one-line Gemini CLI setting so it reads AGENTS.md too' : ''}.`,
  }
}

// ---------- The worked example: a /init-style draft, then the cut ----------
// Fictional project "jobtrack": a small Next.js job-application tracker.

export const SAMPLE_BEFORE = `# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Project Overview

jobtrack is a web application that helps job seekers track their applications.
It is built with Next.js, React, TypeScript and Tailwind CSS.
The app lets users add jobs, move them through stages and see stats.

## Architecture

- app/ contains the Next.js App Router pages
- app/api/ contains the API route handlers
- components/ contains the React components
- components/ui/ contains the shared UI primitives
- lib/ contains utility functions
- lib/db.ts contains the database client
- prisma/ contains the Prisma schema and migrations
- public/ contains static assets
- tests/ contains the Vitest tests
- styles/ contains global CSS
- types/ contains shared TypeScript types
- The app uses Server Components by default
- Client Components are marked with "use client"

## Code Style

- Write clean code and follow best practices
- Use 2-space indentation
- Use single quotes
- No semicolons
- Use camelCase for variables and PascalCase for components
- Sort imports alphabetically
- Format code properly
- IMPORTANT: Use TypeScript strict mode
- IMPORTANT: Never use any
- YOU MUST write tests for everything
- Use any only when a library type is missing

## Database

- Connection: postgres://jobtrack:hunter2pass@db.example.internal:5432/jobtrack
- Be careful with migrations

## Releasing

1. Pull the latest main
2. Bump the version in package.json
3. Update CHANGELOG.md
4. Run the full test suite
5. Build the app
6. Tag the release
7. Push the tag
8. Watch the deploy

## Notes

- Write clean code and follow best practices
- Make sure everything works before finishing
`

export const SAMPLE_AFTER = `# AGENTS.md

## Commands
- Install: \`pnpm install\`
- Dev server: \`pnpm dev\`
- Check your work: \`pnpm typecheck && pnpm lint && pnpm test\`
- One test file: \`pnpm vitest run tests/stages.test.ts\`
- Style is enforced by \`pnpm lint --fix\` (ESLint + Prettier): don't hand-format.

## Things the code won't tell you
- lib/legacyApi.ts is old. Don't copy its fetch pattern; new data access goes in lib/data/.
- Errors: throw AppError from lib/errors.ts, never a plain Error.
- Dates are stored in UTC and shown in the user's time zone with formatDate().
- DATABASE_URL lives in .env.local (never commit it).

## Boundaries
- Always add or update a test in tests/ for a behaviour change.
- Ask first before adding a dependency or changing prisma/schema.prisma.
- Never edit files in prisma/migrations/ by hand; run \`pnpm prisma migrate dev\`.
- Releases: follow docs/release.md, not this file.

## Example: a server action in our style
\`\`\`ts
export async function moveStage(id: string, stage: Stage) {
  const job = await db.job.update({ where: { id }, data: { stage } })
  revalidatePath('/board')
  return job
}
\`\`\`
`
