# Brief: Connectors in Claude and ChatGPT (Learn AI lesson 42)

- URL: /learn-ai/ai-connectors
- Slot: B (Learn AI + engagement)
- Date: 2026-11-12 Author run: 15:42 IST

## 1. Who is searching and why

- Main query: "claude connectors" / "chatgpt connectors". Fan-out: how to connect gmail to claude; can claude send emails; chatgpt plugins gmail; what are ai connectors; are connectors safe; custom connector mcp url.
- Reader: a non-developer (job seeker, chief of staff, PM, GTM person) who uses Claude or ChatGPT daily and copies text in from Gmail, Drive, Slack or Notion. Knows chat, not MCP.
- Success: they connect one app, set tool permissions safely, and run a real workflow (interview brief, weekly update) with citations and drafts, not sends.
- What the reader can do after this page: connect Gmail/Drive/Slack/Notion in either app, write a connector prompt that names source + window + output + "do not", set Always allow / Needs approval / Blocked per tool, and add a custom connector by URL.

## 2. What we already have (inventory check)

- /learn-ai/what-is-mcp (protocol: host/client/server, primitives, safety). /learn-ai/agent-harness (connector = MCP part of a harness). /learn-ai/prompt-injection (lethal trifecta).
- Verdict: NEW page. The user-facing how-to and workflows do not exist anywhere on the site. what-is-mcp stays the protocol page; it now gets a traced-request workflow + a remote vs local table (upgrade) and links here.
- Links in: what-is-mcp, agent-harness, ai-for-excel (prev/next), what-is-an-api (prev), role hubs chief-of-staff, founders-office, gtm-engineer (LESSON_EXTRA_ROLES). Links out: what-is-mcp, agent-harness, prompt-injection, context-engineering, /free-mock-interview.

## 3. What is ranking and being cited (opened by the research subagent, 12 Nov 2026)

| #   | URL                                                 | Type                               | Does well                  | Misses                                                         |
| --- | --------------------------------------------------- | ---------------------------------- | -------------------------- | -------------------------------------------------------------- |
| 1   | zapier.com/blog/claude-connectors (Aug 2026)        | blog                               | plans, workflows           | prompt injection, Gmail send/read conflict, ChatGPT comparison |
| 2   | claude.com/docs/connectors/overview                 | docs                               | taxonomy                   | no workflows, not for beginners                                |
| 3   | zapier.com/blog/chatgpt-connectors (Aug 2026)       | blog                               | rename chain, security FAQ | plan details                                                   |
| 4   | dragapp.com/blog/connect-gmail-to-claude (Sep 2026) | blog                               | send capability, approvals | ChatGPT, injection                                             |
| 5   | claude.com/docs/connectors/google/gmail             | docs                               | steps                      | says read-only (conflicts with help centre)                    |
| -   | "chatgpt apps gmail" SERP                           | extensions                         | -                          | no OpenAI page in top 10; intent mismatch                      |
| -   | "what are ai connectors"                            | glossaries (conductor, harvard IT) | definitions                | nothing covering both apps + MCP + safety                      |

## 4. Our information gain

- Side-by-side Claude vs ChatGPT table from both makers' pages, with the July 2026 "plugins" rename that most results miss.
- Our count of the Gmail connector's tools by what they do (6 read, 12 organise, 4 write/send, 2 delete of 24 shown) → concrete permission settings.
- The documented conflict between two Anthropic pages on Gmail send (dated, both linked).
- Three worked workflows with copyable prompts (interview brief; Slack + Notion update as draft; custom connector by URL), each ending in a draft or a read, never an unapproved send.
- Context cost: Anthropic's 150,000 → 2,000 token example + the "10 or more connectors → On demand" advice.

## 5. Sources (opened 12 Nov 2026)

| Claim                                            | Source                                                                                | Quote or number                                                                                                             |
| ------------------------------------------------ | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Definition                                       | support.claude.com 11176164                                                           | "Connectors let Claude access your apps and services, retrieve your data, and take actions within connected services."      |
| Availability, free limit, permissions, On demand | same                                                                                  | all users; 1 custom on Free; Always allow / Needs approval / Blocked; 10+ → On demand                                       |
| Gmail send + approval                            | support.claude.com 10166901                                                           | "Send, reply to, and forward emails from Gmail."; "By default, Claude asks for your approval before each of these actions." |
| Gmail read-only (older)                          | claude.com/docs/connectors/google/gmail                                               | "Claude reads and searches email only; it can't create, send, or modify messages."                                          |
| Gmail tool list                                  | claude.com/connectors/gmail                                                           | 24 of 29 tools shown; made by Google; added March 2026                                                                      |
| Custom connector steps, plans, precautions       | claude.com/docs/connectors/custom/remote-mcp                                          | Free, Pro, Max, Ultra, Team, Enterprise; "Only click Always allow for trusted servers"                                      |
| ChatGPT plugins                                  | chatgpt.com/features/plugins; learn.chatgpt.com/docs/plugins; openai.com (9 Jul 2026) | "Select plugins available in all plans"; "Some plugins require a paid plan."; @ to invoke; install doesn't grant access     |
| ChatGPT permission controls                      | developers.openai.com/plugins/changelog (12 Jun 2026)                                 | always / before making changes / only before important changes                                                              |
| ChatGPT custom MCP                               | developers.openai.com/apps-sdk/quickstart                                             | "Go to ChatGPT Plugins, select the plus button, then Add custom MCP server."                                                |
| Slack MCP                                        | docs.slack.dev/ai/slack-mcp-server                                                    | search, send, read history; admins approve MCP clients                                                                      |
| Notion MCP                                       | notion.com/help/notion-mcp                                                            | "read from and write to your Notion pages in real-time"                                                                     |
| Token cost                                       | anthropic.com/engineering/code-execution-with-mcp (4 Nov 2025)                        | 150,000 → 2,000 tokens, 98.7%                                                                                               |
| Lethal trifecta                                  | simonwillison.net 2025/Jun/16                                                         | private data, untrusted content, external communication                                                                     |
| MCP definition                                   | modelcontextprotocol.io intro                                                         | "Think of MCP like a USB-C port for AI applications."                                                                       |
| Videos                                           | YouTube oEmbed verified 12 Nov                                                        | \_jjSS0qGFbI (Anthropic), 5QPBVrAAdBk (OpenAI)                                                                              |

UNKNOWN (left out): which ChatGPT plans allow custom MCP servers; whether ChatGPT's Gmail plugin can send (not just draft); exact update dates of Claude help articles.

## 6. Shape and engagement plan

- TL;DR answers "what is a connector + names in both apps + the one safety habit".
- 6 steps: definition (flow) → turn one on (CompareTable) → workflow 1 interview brief → workflow 2 Slack+Notion draft → permissions (BarList of Gmail tools by type) → custom connector workflow + context-cost bars.
- Visuals: 1 CompareTable (Claude vs ChatGPT), 2 BarLists (Gmail tools by what they do; tokens), 3 workflows, 1 flow.
- To DO: try-it (connect one app, read-only test), 3-question check, copyable prompts.
- Next step: what-is-an-api (path), mock interview link after the interview-brief workflow.

## Upgrade in the same run

- what-is-mcp: worked workflow tracing tools/list → tools/call with the spec's messages; CompareTable remote vs local servers from Claude docs; ChatGPT plugins naming; 2 new sources.
- agent-harness (lesson 41, shipped without a critic): critic audit in this run; link to connectors lesson.

## 7. Review (filled after the independent critic)

- Critic verdict (independent general-purpose subagent, re-opened every source it could reach): ai-connectors SHIP AFTER FIXES; what-is-mcp SHIP AFTER FIXES; agent-harness SHIP AFTER FIXES. It beats the 4 competitors on safety, covering both apps, the tool count and worked workflows, but was "not yet" best until it covered disconnecting, training/privacy and mobile.
- Fixes applied (all): calendar approval claim narrowed; "measured" → "described one example"; Slack admin wording; ChatGPT naming history (connectors → apps 6 Oct 2025 → plugins 9 Jul 2026) with the apps launch post added as a source; "older" Gmail page wording; workflows now set permissions before the first run and give the ChatGPT @-mention route; workflow 2 names the parent page; FAQ 3 now training + disconnect (Anthropic quote, consumer opt-in caveat, ChatGPT uninstall); mobile line; Claude's own skills/plugins disambiguated; BarList labels and table cell shortened for 390px. what-is-mcp: tools/list re-sent on list_changed; "shortened from" the spec; one tool name; tryIt paths. agent-harness: metaDescription 156; sprint/reset wording; short table cells.
- Not verified by the critic (proxy blocked): YouTube pages (IDs verified by me via oEmbed), the MCP demo server.
- Metric: indexed by 26 Nov; impressions for "claude connectors", "chatgpt plugins gmail", "can claude send emails" by 10 Dec; role-hub → lesson clicks once GA4 arrives. Check back 26 Nov and 10 Dec.
