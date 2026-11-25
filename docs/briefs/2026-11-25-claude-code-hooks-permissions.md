# Brief: /learn-ai/claude-code-hooks-permissions (Part 2, learning run, 25 Nov 2026)

## Why this page

Queued since 21 Nov: the CLAUDE.md lesson and the agent-harness lesson both tell readers to "make it a hook or a deny rule" but no page explained how. Learn AI is one of our ranking clusters; Claude Code lessons score 5/5 on walks.

## Reader can do after the page

- Explain why CLAUDE.md is advice and rules/hooks are enforced (Anthropic best practices).
- Predict whether a given tool call runs: hooks → deny → ask → allow → mode.
- Write correct rules (space before \*, compound commands, 4 path forms, Edit not Write, MCP names).
- Write or read a PreToolUse hook (exit 0 vs exit 2) and know PostToolUse can't undo.
- Paste their own settings.json into the tester, fix flagged issues, test any call.

## Original asset (information gain)

- Free no-AI tester (data/learnAi/permissionRules.ts + components/learnAi/PermissionRuleTester.tsx): parses settings.json, 8–15 checks each tied to a docs page, a decision trail for any call, all 8 example calls tabled under the current mode.
- Finding computed by the tester from Anthropic's approval table: with NO settings file, 2 of 6 risky calls (both .env reads) run unprompted, because reads inside the working directory need no approval. Risky file 6/6, fixed file 0/6.
- 29 rule-matching cases from the docs' own examples swept with tsx (0 mismatches).

## Visuals

1. Compare table: CLAUDE.md vs permission rule vs hook vs sandbox (who enforces, can the model skip it).
2. Flow: decision order.
3. Bars (computed): risky calls that run with no check under 3 settings.
4. Compare table: hooks across Claude Code, Cursor, Copilot, Gemini CLI, Codex.
5. Worked workflow: 6 changes, before/after numbers from the engine.

## Sources (opened 25 Nov 2026)

code.claude.com/docs/en/{permissions, hooks-guide, hooks, settings, best-practices}; The Register 21 Jul 2025 and Fortune 23 Jul 2025 (Replit incident); cursor.com/docs/hooks; docs.github.com Copilot hooks; geminicli.com/docs/hooks; developers.openai.com/codex/agent-approvals-security.

## Keywords

claude code hooks, claude code permissions, claude code settings.json permissions, pretooluse hook, claude code deny rules, can claude code read .env

## Metric

GSC impressions for the keywords on this URL; claude-md lesson → this lesson clicks. Check back 9 Dec.

## Critic (independent subagent, 25 Nov)

Verdict: SHIP AFTER FIXES. 6 must-fix, all applied: two quotes not on the cited page (replaced with verified best-practices lines); Replit quotes reframed (LinkedIn video, fake-data context, CEO quote via Fortune); bypassPermissions/auto ignored in project settings (tester now has a project/user scope); acceptEdits also auto-approves rm, rmdir, sed (fixed file now asks for rm _); tester waved through cat .env, redirects, find -delete, git branch -D, cd outside (now modelled); ./path anchoring vs bare names (fixed file uses bare names). Should-fix applied: Manual-mode label + auto note, PreToolUse wording, deny/ask single-dir any depth, 2>&1 splitting, read-only parts in chains, protected .git/.claude writes, mcp\_\__ allow skipped, "_" deny, WebFetch inner-_ labels, env/wrapper stripping, hook note, hook wiring workflow + JSON output, precedence, Bash-deny limits, exec-form quoting. UI: 16px inputs on phones, 44px targets, keyboard-scrollable table, role=group, verdict-only live region.
