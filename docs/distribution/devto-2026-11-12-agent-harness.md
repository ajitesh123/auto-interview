---
title: What is an agent harness? The part of your AI agent that is not the model
published: false
tags: ai, agents, beginners, productivity
canonical_url: https://www.autointerviewai.com/learn-ai/agent-harness
---

A model on its own reads text and writes text. Something else has to hand it tools, pick the files it sees, run its commands and pass the results back. That something is the **agent harness**.

The Claude Code docs say it plainly: Claude Code is the layer around the model that provides the tools and manages the context the model sees, and that surrounding layer is what "agentic harness" refers to ([How Claude Code works](https://code.claude.com/docs/en/how-claude-code-works)).

So: **agent = model + harness**. When an agent fails, the useful question is rarely "is the model good enough?". It is "which part of the harness let it down?".

## The loop every harness runs

Anthropic describes agent work as three phases that repeat:

1. **Gather context**: search files, spawn subagents, compact old conversation.
2. **Take action**: tools, shell commands, MCP servers.
3. **Verify the result**: linters and tests, screenshots, a second model as judge.

When a run goes wrong, name the phase. Did it lack context, lack a tool, or lack a way to check its work?

## Six parts you can change without building anything

| Part                                    | What it does                                   | Add it when                                           |
| --------------------------------------- | ---------------------------------------------- | ----------------------------------------------------- |
| Instruction file (CLAUDE.md, AGENTS.md) | Standing rules, loaded every session           | The agent gets a convention wrong twice               |
| Skill                                   | A saved how-to, loaded only when used          | You paste the same procedure a third time             |
| MCP server (connector)                  | Access to an outside app or database           | You keep copying data from a tab the agent cannot see |
| Subagent                                | A helper with its own context                  | A side task floods the conversation                   |
| Hook                                    | A script that runs at a set moment, every time | Something must happen every time without asking       |
| Permissions                             | What the agent may do unasked                  | You trust a command, or must block one                |

One distinction is worth remembering. A rule in an instruction file is a request. A hook or a permission rule that blocks the action is enforcement. The table is adapted from the [Claude Code extension docs](https://code.claude.com/docs/en/features-overview).

## Does the harness change the result? One measured case

In March 2026, Prithvi Rajasekaran of Anthropic ran the same model on the same prompt (build a retro game maker) two ways ([Harness design for long-running application development](https://www.anthropic.com/engineering/harness-design-long-running-apps)):

|        | Model alone                | Planner + generator + evaluator |
| ------ | -------------------------- | ------------------------------- |
| Time   | 20 minutes                 | 6 hours                         |
| Cost   | $9                         | $200                            |
| Result | Core game mechanics broken | Playable game                   |

It is one task, not a benchmark. The point is the trade: a harness buys reliability with time and money. The separate evaluator mattered because, as the post puts it, agents "reliably skew positive when grading their own work".

## How much harness is enough?

Less than you think. OpenAI's Ryan Lopopolo, writing about a product built entirely by Codex, found that one huge instruction file failed and a short AGENTS.md of about 100 lines that points to deeper docs worked: "give Codex a map, not a 1,000-page instruction manual" ([Harness engineering](https://openai.com/index/harness-engineering/)).

And the Anthropic post warns that every harness component encodes an assumption about what the model cannot do. Those assumptions go stale. After a model upgrade, remove a part and see whether anything gets worse.

A working order:

- Start with an instruction file and sensible permissions.
- Add one part when the same failure shows up twice.
- Give the agent a written definition of "done" and a check it cannot grade itself on.
- After each model upgrade, try removing something.

## A worked example

I wrote up a full workflow (a small harness that tailors five resumes a week, with the instruction file, a skill, a connector, a blocking rule and a checklist the agent must fill in) plus a three-question self-check in the free lesson this post is based on: [What is an agent harness?](https://www.autointerviewai.com/learn-ai/agent-harness). It is part of a free, no-login [Learn AI path](https://www.autointerviewai.com/learn-ai) that also covers [MCP](https://www.autointerviewai.com/learn-ai/what-is-mcp) and [Agent Skills](https://www.autointerviewai.com/learn-ai/agent-skills).

Which harness part fixed the most problems for you? I would like to hear cases where removing something helped.
