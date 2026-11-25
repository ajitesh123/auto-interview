import type { Lesson } from '../types'
import {
  SAMPLE_AFTER,
  SAMPLE_BEFORE,
  SRC,
  TEST_CALLS,
  checkSettings,
  unchecked,
} from '../permissionRules'

// Every number in the worked example comes from the tester itself, so the text and the tool agree.
const before = unchecked(SAMPLE_BEFORE)
const none = unchecked('{}')
const after = unchecked(SAMPLE_AFTER)
const beforeChecks = checkSettings(SAMPLE_BEFORE)
const afterChecks = checkSettings(SAMPLE_AFTER)

const REGISTER = {
  label: 'The Register: Replit agent deleted a production database (21 Jul 2025)',
  url: 'https://www.theregister.com/2025/07/21/replit_saastr_vibe_coding_incident',
}
const FORTUNE = {
  label: 'Fortune: AI coding tool Replit wiped a database (23 Jul 2025)',
  url: 'https://fortune.com/2025/07/23/ai-coding-tool-replit-wiped-database-called-it-a-catastrophic-failure/',
}

export const lesson: Lesson = {
  slug: 'claude-code-hooks-permissions',
  track: 'automate',
  order: 0,
  title: 'Hooks and permissions',
  metaTitle: 'Claude Code Hooks and Permissions: Rules That Always Hold',
  metaDescription:
    'How Claude Code permission rules and hooks work: the deny, ask, allow order, rule syntax, exit code 2, the modes, and a free tester for your settings.json.',
  h1: 'Claude Code hooks and permissions: rules an AI agent cannot ignore',
  tldr: 'A rule in CLAUDE.md is a request the model can skip. Permission rules and hooks are enforced by Claude Code itself: deny, ask and allow rules in .claude/settings.json decide which tool calls run, and a hook is your own script that runs at a set moment, such as before every edit, and can block the call by exiting with code 2. Use them for the few things that must never happen, like reading .env or pushing to main.',
  minutes: 15,
  level: 'Intermediate',
  steps: [
    {
      heading: 'Why isn’t a rule in CLAUDE.md enough?',
      body: [
        'In July 2025 a Replit coding agent deleted SaaStr founder Jason Lemkin’s production database during a code freeze. Days earlier, in a LinkedIn video quoted by The Register, he said he had told the agent “eleven times in ALL CAPS” not to make up data, and it did anyway. After the deletion he wrote: “There is no way to enforce a code freeze in vibe coding apps like Replit.” Replit’s CEO, quoted by Fortune, called it “Unacceptable and should never be possible”.',
        'Anthropic’s Claude Code docs draw the line that would have helped. “Unlike CLAUDE.md instructions which are advisory, hooks are deterministic and guarantee the action happens.” Permission rules work the same way: “Permission rules are enforced by Claude Code, not by the model.” Anthropic’s tip: “Use hooks for actions that must happen every time with zero exceptions.”',
      ],
      visual: {
        kind: 'compare',
        label: '4 ways to give Claude Code a rule · Anthropic docs · checked 25 Nov 2026',
        title: 'Only permission rules, hooks and the sandbox are enforced; CLAUDE.md is advice',
        corner: 'Layer',
        columns: [
          { name: 'Who enforces it' },
          { name: 'Can the model skip it?' },
          { name: 'Best for' },
        ],
        rows: [
          {
            label: 'CLAUDE.md or prompt',
            cells: ['Nobody: the model reads it', 'Yes', 'Guidelines, commands, team habits'],
          },
          {
            label: 'Permission rule',
            cells: ['Claude Code', 'No', 'Which tools, commands, files and sites are allowed'],
          },
          {
            label: 'Hook (command type)',
            cells: [
              'Claude Code runs your script',
              'No',
              'Checks a pattern can’t express; formatting after edits',
            ],
          },
          {
            label: 'Sandbox',
            cells: [
              'The operating system',
              'No',
              'Stopping scripts that open files or the network themselves',
            ],
          },
        ],
        note: 'Hooks here means command hooks (scripts). A prompt hook is a “single-turn LLM evaluation”, so its answer can vary like any model’s.',
        source: [SRC.best, SRC.permissions, SRC.hooksGuide, REGISTER, FORTUNE],
        updated: '25 Nov 2026',
      },
      keyIdea: 'Keep “usually” in CLAUDE.md. Turn every “never” into a deny rule or a hook.',
    },
    {
      heading: 'How does Claude Code decide whether a tool call runs?',
      body: [
        'Every time the agent wants to run a command, read or edit a file, or fetch a page, Claude Code checks in a fixed order. PreToolUse hooks run first. Then the rules: “deny, then ask, then allow. The first match in that order determines the outcome.” If no rule matches, the permission mode decides.',
        'Two consequences surprise people. First, “an allow rule can’t carve an exception out of a deny rule”, and if a tool is denied in any settings file, no other file can allow it. Second, Claude Code’s approval table says file reads inside the working directory need no approval. So unless you deny it, Claude can read your .env without asking.',
      ],
      flow: [
        'Agent wants a tool',
        'PreToolUse hooks (exit 2 = blocked)',
        'Deny rules',
        'Ask rules',
        'Allow rules',
        'Permission mode',
      ],
      bullets: [
        'default (shown as Manual): asks the first time each tool is used.',
        'acceptEdits: accepts file edits and mkdir, touch, rm, rmdir, mv, cp and sed inside the working directory. Yes, rm: add an ask rule if that worries you.',
        'plan: reads and explores but doesn’t edit your source files.',
        'auto: a background classifier checks actions against your request. With Claude Code v2.1.283 or later it is the built-in starting mode for terminal and VS Code sessions, where available. Anthropic: it “does not guarantee safety.”',
        'dontAsk: denies anything that would prompt. bypassPermissions: skips prompts; Anthropic says use it only in containers or VMs. Set in a project’s .claude/settings.json, bypassPermissions and auto don’t take effect.',
      ],
      keyIdea: 'Deny beats everything. Ask beats allow. Allow beats the mode.',
    },
    {
      heading: 'How do you write a permission rule?',
      body: [
        'Rules live in .claude/settings.json (shared with your team), .claude/settings.local.json (just you) or ~/.claude/settings.json (all your projects), as allow, ask and deny lists. Each rule is a tool name, optionally with a pattern in brackets: Bash(npm run build), Read(./.env), WebFetch(domain:example.com). Type /permissions to see every rule and the file it came from.',
        'The details matter. In Bash rules, the space before a trailing * counts: Bash(ls *) matches ls and ls -la but not lsof; Bash(ls*) matches lsof too. Claude Code also splits chained commands on &&, ||, ;, | and &: an allow rule must match every part, while a deny or ask rule applies if any part matches.',
      ],
      bullets: [
        'File paths: //path is absolute, ~/path is from your home folder, /path is from the project the settings file belongs to, and ./path is from the current folder. A bare name like .env (no slash) matches at any depth, so Read(.env) also covers config/.env; Read(./.env) covers only the top folder.',
        'Only Edit(path) and Read(path) are checked for files. A Write(path) rule is accepted but never matches; write Edit(path) instead.',
        'A bare tool name in deny, like "WebFetch", removes the tool so Claude never sees it.',
        'MCP tools: mcp__github__* (every tool on a server) or mcp__github__create_issue (one tool), with no brackets.',
        'Rules combine across files: managed settings beat the command line, which beats settings.local.json, then settings.json, then your user file. A deny anywhere can’t be allowed elsewhere.',
        'Know the limits. A Read deny also covers cat, head, tail, sed and tee in Bash, but not a Python or Node script that opens the file itself, and a Bash deny matches command text, not the program (git -C . push is not git push). For OS-level limits, Anthropic points to the sandbox.',
      ],
      example: {
        label: 'Anthropic’s settings example: run lint and tests freely, never read .env',
        code: true,
        text: '{\n  "permissions": {\n    "allow": ["Bash(npm run lint)", "Bash(npm run test *)"],\n    "deny": ["Read(./.env)", "Read(./.env.*)"]\n  }\n}',
      },
    },
    {
      heading: 'What is a hook, and when do you need one?',
      body: [
        'A hook is a shell command Claude Code runs at a set moment in its loop. Anthropic’s definition: hooks give “deterministic control: certain actions always happen rather than relying on the LLM to choose to run them.” You add them under "hooks" in the same settings files, pick an event, and use a matcher like "Edit|Write" to choose which tools trigger it.',
        'Your script gets the call as JSON on stdin (session_id, tool_name, tool_input). Exit 0 means no objection, and for PreToolUse the normal permission check still applies. Exit 2 blocks the action and sends what you wrote to stderr back to Claude as feedback. A PreToolUse hook that denies “blocks the tool even in bypassPermissions mode”.',
      ],
      bullets: [
        'PreToolUse: before a tool runs. The hook that stops a tool call before it happens.',
        'PostToolUse: after a tool succeeds. Good for formatters and checks; it “can’t undo actions since the tool has already executed.”',
        'Stop: when Claude finishes. Anthropic uses it as a gate that blocks the turn from ending until your check passes.',
        'SessionStart, UserPromptSubmit and Notification: load context, check a prompt, or ping you when Claude needs input.',
        'Hooks run with your full user permissions, so read any hook before you add it, especially one in a repo you didn’t write.',
      ],
      workflow: {
        title: 'Worked workflow: wire up Anthropic’s protect-files hook',
        input:
          'A project where Claude must never edit .env, package-lock.json or anything in .git/, in any mode.',
        steps: [
          {
            title: 'Save the script as .claude/hooks/protect-files.sh',
            detail:
              'Anthropic’s example from the hooks guide (shortened). It reads the call from stdin, pulls out the file path with jq, and exits 2 on a match.',
            code: '#!/bin/bash\n# protect-files.sh\n\nINPUT=$(cat)\nFILE_PATH=$(echo "$INPUT" | jq -r \'.tool_input.file_path // empty\')\n\nPROTECTED_PATTERNS=(".env" "package-lock.json" ".git/")\n\nfor pattern in "${PROTECTED_PATTERNS[@]}"; do\n  if [[ "$FILE_PATH" == *"$pattern"* ]]; then\n    echo "Blocked: $FILE_PATH matches protected pattern \'$pattern\'" >&2\n    exit 2\n  fi\ndone\n\nexit 0',
          },
          {
            title: 'Make it runnable',
            detail:
              'The script needs execute permission, and jq must be installed (brew install jq, or apt install jq).',
            code: 'chmod +x .claude/hooks/protect-files.sh',
          },
          {
            title: 'Register it on PreToolUse in .claude/settings.json',
            detail:
              'The matcher picks the tools; the quotes around $CLAUDE_PROJECT_DIR keep paths with spaces working.',
            code: '{\n  "hooks": {\n    "PreToolUse": [\n      {\n        "matcher": "Edit|Write",\n        "hooks": [\n          { "type": "command", "command": "\\"$CLAUDE_PROJECT_DIR\\"/.claude/hooks/protect-files.sh" }\n        ]\n      }\n    ]\n  }\n}',
          },
          {
            title: 'Test it by hand before trusting it',
            detail: 'Feed it a fake call. It should print the Blocked line and exit with 2.',
            code: 'echo \'{"tool_name":"Edit","tool_input":{"file_path":".env"}}\' | .claude/hooks/protect-files.sh; echo "exit: $?"',
          },
          {
            title: 'Check Claude Code loaded it',
            detail:
              'Type /hooks in Claude Code. The menu is read-only; edit the JSON to change anything.',
          },
        ],
        output:
          'The next time Claude tries to edit .env, the call is blocked before it runs and Claude sees “Blocked: .env matches protected pattern”, so it can choose another way.',
      },
      example: {
        label:
          'Instead of exit 2, a PreToolUse hook can print JSON with a reason (Anthropic’s example)',
        code: true,
        text: '{\n  "hookSpecificOutput": {\n    "hookEventName": "PreToolUse",\n    "permissionDecision": "deny",\n    "permissionDecisionReason": "Use rg instead of grep for better performance"\n  }\n}',
      },
      keyIdea:
        'Reach for a permission rule first. Write a hook only when a pattern can’t express the check.',
    },
    {
      heading: 'Worked example: locking down a project in six changes',
      body: [
        `jobtrack is a fictional Next.js job tracker. Its settings file looked productive: no prompts at all. We ran it through the tester on this page with ${TEST_CALLS.length} things an agent might try, ${before.risky} of them risky.`,
      ],
      workflow: {
        title: 'Worked workflow: from “never asks” to “asks only when it matters”',
        input: `A .claude/settings.json with defaultMode bypassPermissions, allow "Bash" and "Edit", one deny rule written as Write(prisma/migrations/**), and a protect-files hook on PostToolUse. Tester: ${before.riskyRun} of ${before.risky} risky calls run with no check; ${beforeChecks.passed} of ${beforeChecks.total} file checks pass.`,
        steps: [
          {
            title: 'Remove the bypass line',
            detail:
              'In a project file Claude Code ignores bypassPermissions and starts in Manual mode, so the line only misled the team. The real hole was the next one. defaultMode becomes acceptEdits.',
          },
          {
            title: 'Swap “allow everything” for the commands you run',
            detail:
              '"Bash" approved every shell command. It becomes five exact commands, so tests and lint still run without a prompt.',
            code: '"allow": ["Bash(pnpm test *)", "Bash(pnpm lint)", "Bash(pnpm typecheck)", "Bash(git status)", "Bash(git diff *)"]',
          },
          {
            title: 'Fix the rule that never matched',
            detail:
              'Write(prisma/migrations/**) was ignored, because Claude Code checks files against Edit and Read rules only. It becomes Edit(prisma/migrations/**).',
          },
          {
            title: 'Deny the secrets and the disasters',
            detail:
              'Reads inside the project need no approval, so .env was open. Bare names cover every folder, so config/.env.production is caught too. Then rm -rf and force-push.',
            code: '"deny": ["Read(.env)", "Read(.env.*)", "Edit(prisma/migrations/**)", "Bash(rm -rf *)", "Bash(git push --force *)"]',
          },
          {
            title: 'Make pushes and deletes ask',
            detail:
              'Bash(git push *) and Bash(rm *) go in ask (acceptEdits would otherwise run rm inside the project). Ask applies when any part of a chain matches, so “pnpm test && git push origin main” now stops for you.',
          },
          {
            title: 'Move the guard hook to PreToolUse',
            detail:
              'On PostToolUse the script could only complain after the edit. On PreToolUse its exit 2 blocks the edit. The path is quoted, and a Prettier hook stays on PostToolUse, where formatting belongs.',
          },
        ],
        output: `Tester: ${after.riskyRun} of ${after.risky} risky calls run unchecked (${after.riskyBlocked} blocked, ${after.riskyAsk} asks you), tests and edits still run without prompts, and ${afterChecks.passed} of ${afterChecks.total} file checks pass. Load both files in the tester below to see each decision.`,
      },
      visual: {
        kind: 'bars',
        label: `${TEST_CALLS.length} test calls, ${before.risky} risky · computed by the tester on this page · 25 Nov 2026`,
        title: `With no settings file, Claude Code still reads .env unprompted: ${none.riskyRun} of ${none.risky} risky calls run`,
        rows: [
          {
            label: 'Risky file (allow Bash + Edit)',
            value: before.riskyRun,
            display: `${before.riskyRun} of ${before.risky}`,
          },
          {
            label: 'No settings file (Manual mode)',
            value: none.riskyRun,
            display: `${none.riskyRun} of ${none.risky}`,
          },
          {
            label: 'Fixed file (this workflow)',
            value: after.riskyRun,
            display: `${after.riskyRun} of ${after.risky}`,
            highlight: true,
          },
        ],
        max: before.risky,
        note: 'Risky calls: reading .env, reading config/.env.production, rewriting a migration, test-then-push, force-push, rm -rf. With no file, the two reads run because reads inside the project need no approval; the rest prompt. In auto mode the two reads still run and a classifier, not a rule, decides the other four.',
        source: [SRC.permissions],
        updated: '25 Nov 2026',
      },
    },
    {
      heading: 'Do other coding agents have hooks and permissions?',
      body: [
        'Yes, and the ideas carry over. Cursor, GitHub Copilot and Gemini CLI now have hooks with a “before a tool runs” event that can block. OpenAI Codex controls the same risk with approval policies and a sandbox; its approvals page doesn’t mention hooks. Each tool names things differently, so check its own docs before you copy a config.',
      ],
      visual: {
        kind: 'compare',
        label: '5 coding agents · each tool’s docs · checked 25 Nov 2026',
        title:
          'Four of five have hooks that can stop a tool call; Codex relies on approvals and a sandbox',
        corner: 'Tool',
        columns: [
          { name: 'Hooks' },
          { name: 'Where you configure it' },
          { name: 'Block before a tool runs' },
        ],
        rows: [
          {
            label: 'Claude Code',
            cells: [true, '.claude/settings.json', 'PreToolUse: exit 2 or "deny"'],
          },
          {
            label: 'Cursor',
            cells: [true, '.cursor/hooks.json', 'preToolUse, beforeShellExecution'],
          },
          {
            label: 'GitHub Copilot',
            cells: [true, '.github/hooks/*.json', 'preToolUse can approve or deny'],
          },
          {
            label: 'Gemini CLI',
            cells: [true, '.gemini/settings.json', 'BeforeTool: exit 2 aborts it'],
          },
          {
            label: 'OpenAI Codex',
            cells: [null, '~/.codex/config.toml', 'Approval policy + sandbox mode'],
          },
        ],
        note: 'A dash means the page we read doesn’t mention hooks, not that they can’t exist.',
        source: [
          SRC.hooksGuide,
          { label: 'Cursor docs: hooks', url: 'https://cursor.com/docs/hooks' },
          {
            label: 'GitHub docs: hooks for Copilot agents',
            url: 'https://docs.github.com/en/copilot/concepts/agents/hooks',
          },
          { label: 'Gemini CLI docs: hooks', url: 'https://geminicli.com/docs/hooks/' },
          {
            label: 'OpenAI Codex: approvals and security',
            url: 'https://developers.openai.com/codex/agent-approvals-security',
          },
        ],
        updated: '25 Nov 2026',
      },
      keyIdea:
        'Whatever the tool: write the never-do list as rules, and use a hook for the checks rules can’t express.',
    },
  ],
  keyTerms: [
    {
      term: 'Permission rule',
      meaning:
        'A line in an allow, ask or deny list, like Bash(git push *) or Read(.env). Claude Code enforces it, not the model.',
    },
    {
      term: 'Hook',
      meaning:
        'Your own command that Claude Code runs at a set moment, such as before every edit. It can block the action or run a formatter.',
    },
    {
      term: 'PreToolUse',
      meaning:
        'The hook event that fires before a tool runs, so it can stop a tool call before it happens.',
    },
    {
      term: 'Exit code 2',
      meaning:
        'How a command hook says no, on events that can block. On PreToolUse, Claude Code blocks the call and passes the hook’s stderr message to Claude.',
    },
    {
      term: 'Permission mode',
      meaning:
        'What happens when no rule matches: ask (default), accept edits, plan only, a classifier (auto), deny (dontAsk) or skip prompts (bypassPermissions).',
    },
    {
      term: 'Sandbox',
      meaning:
        'Operating-system limits on what shell commands can touch on disk and on the network, which also catch scripts that rules miss.',
    },
  ],
  videos: [
    {
      youtubeId: '6_y3AtkgjqA',
      title: 'Claude Code Hooks explained in 5 minutes',
      channel: 'shanraisshan',
      why: 'A quick visual tour of the hook events. Watch it after step 4 and note which events can block.',
    },
    {
      youtubeId: 'CEODfvJLIGQ',
      title: 'Claude Code Hooks: MUST KNOW to Keep Claude Agent in Control!',
      channel: 'Mervin Praison',
      why: 'Builds hooks live. Recorded in Aug 2025, so check event names against the docs; the core idea hasn’t changed.',
    },
  ],
  tryIt: {
    title: 'Lock down one project in 10 minutes',
    steps: [
      'Open your project in Claude Code and type /permissions to see which rules are loaded and from which file.',
      'Paste your .claude/settings.json into the tester above (no file yet? start from Empty) and fix every “Fix” item.',
      'Write down the two things that must never happen in this project. Add a deny rule for each, and Bash(git push *) to ask.',
      'Pick the three commands you approve most often (tests, lint, typecheck) and add exact allow rules for them.',
      'Ask Claude to “show me the contents of .env”. It should be refused by your deny rule, not by its own judgement.',
    ],
    link: { label: 'Claude Code docs: permissions', url: SRC.permissions.url },
  },
  check: [
    {
      q: 'Your settings allow "Bash(git *)" and deny "Bash(git push *)". Claude tries git push origin main. What happens?',
      options: [
        'It runs, because the allow rule matched first',
        'It is blocked, because deny is checked before allow',
        'Claude Code asks you, because the rules conflict',
        'The more specific rule wins, so it runs',
      ],
      answer: 1,
      why: 'Claude Code checks deny, then ask, then allow, and “rule specificity doesn’t change the order.” An allow rule can’t carve an exception out of a deny.',
    },
    {
      q: 'You want to stop Claude reading .env. Which is the strongest single step?',
      options: [
        'Add “Never read .env” to CLAUDE.md in capitals',
        'Add "Write(./.env)" to deny',
        'Add "Read(.env)" to deny',
        'Switch to default mode, which asks before reads',
      ],
      answer: 2,
      why: 'A deny rule is enforced by Claude Code. CLAUDE.md is advice, Write rules never match, and reads inside the project need no approval even in default mode.',
    },
    {
      q: 'Your guard script runs on PostToolUse and exits 2 when a migration file is edited. What goes wrong?',
      options: [
        'Nothing; exit 2 blocks the edit',
        'The edit has already happened; PostToolUse can’t undo it',
        'Exit 2 is ignored on every event',
        'The hook only runs in bypassPermissions mode',
      ],
      answer: 1,
      why: 'Anthropic: PostToolUse hooks “can’t undo actions since the tool has already executed.” Guards belong on PreToolUse.',
    },
  ],
  sources: [
    {
      label: 'Claude Code docs: permissions (rules, order, modes, approval table)',
      url: SRC.permissions.url,
    },
    { label: 'Claude Code docs: automate actions with hooks (guide)', url: SRC.hooksGuide.url },
    { label: 'Claude Code docs: hooks reference', url: SRC.hooks.url },
    { label: 'Claude Code docs: settings (files and precedence)', url: SRC.settings.url },
    { label: 'Claude Code docs: best practices (deterministic vs not)', url: SRC.best.url },
    REGISTER,
    FORTUNE,
    { label: 'Cursor docs: hooks', url: 'https://cursor.com/docs/hooks' },
    {
      label: 'GitHub docs: about hooks for Copilot agents',
      url: 'https://docs.github.com/en/copilot/concepts/agents/hooks',
    },
    { label: 'Gemini CLI docs: hooks', url: 'https://geminicli.com/docs/hooks/' },
    {
      label: 'OpenAI Codex: agent approvals and security',
      url: 'https://developers.openai.com/codex/agent-approvals-security',
    },
  ],
  faqs: [
    {
      q: 'What are Claude Code hooks?',
      a: 'Hooks are shell commands (or HTTP calls) that Claude Code runs at set moments, such as before a tool runs (PreToolUse), after it succeeds (PostToolUse) or when Claude finishes (Stop). You configure them under "hooks" in .claude/settings.json. A PreToolUse hook can block an action by exiting with code 2, which no permission mode can override.',
    },
    {
      q: 'What is the difference between hooks and permissions in Claude Code?',
      a: 'Permission rules are allow, ask and deny patterns that Claude Code matches against each tool call. Hooks are your own scripts, so they can check anything a script can, like whether a branch name or ticket ID is right. Use rules for simple “never” and “always fine” lists, and hooks for checks a pattern can’t express or for actions like formatting after every edit.',
    },
    {
      q: 'Can Claude Code read my .env file?',
      a: 'Yes, unless you stop it. Claude Code’s approval table says file reads inside the working directory need no approval, in any mode. Add "Read(.env)" and "Read(.env.*)" to the deny list (bare names match in every folder; "./.env" only the top one). A deny rule doesn’t stop a script Claude runs from opening the file itself, so turn on the sandbox for OS-level protection too.',
    },
    {
      q: 'Why is my Claude Code hook not running?',
      a: 'Check the event name (it is case-sensitive: PreToolUse, not pretooluse), the matcher (Edit|Write must match the tool name), that the script is executable and its path is quoted, and which settings file it lives in. Type /hooks to see what Claude Code loaded; the menu is read-only.',
    },
  ],
  related: [
    { label: 'Previous: CLAUDE.md and AGENTS.md', href: '/learn-ai/claude-md-agents-md' },
    { label: 'Next: Prompting vs RAG vs fine-tuning', href: '/learn-ai/fine-tuning-vs-rag' },
    { label: 'Claude Code for beginners', href: '/learn-ai/claude-code' },
    { label: 'What is an agent harness?', href: '/learn-ai/agent-harness' },
    { label: 'Prompt injection and AI security', href: '/learn-ai/prompt-injection' },
    { label: 'AI engineer career guide', href: '/ai-engineer' },
    { label: 'Forward deployed engineer guide', href: '/fde' },
  ],
  fromTheSource: [
    {
      who: 'Anthropic, Claude Code team',
      role: 'The team that builds Claude Code and writes its best-practices guide',
      work: 'Claude Code docs: best practices, “Set up hooks” (2026)',
      url: SRC.best.url,
      idea: '“Unlike CLAUDE.md instructions which are advisory, hooks are deterministic and guarantee the action happens.” Their tip: “Use hooks for actions that must happen every time with zero exceptions.”',
      breakdown: [
        'The model is good at judgement, so give it guidelines.',
        'Judgement can say “this case is different”, so guidelines can be skipped.',
        'The harness (Claude Code) doesn’t judge; it runs your rules.',
        'A prompt hook asks a model, so for a hard rule use a command hook (a script).',
      ],
      use: 'Sort your CLAUDE.md lines into “usually” and “never”. Keep the “usually” lines there and turn each “never” into a deny rule or a hook.',
    },
  ],
  widget: 'permission-rule-tester',
}
