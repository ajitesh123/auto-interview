import type { Lesson } from '../types'

export const lesson: Lesson = {
  slug: 'agent-harness',
  track: 'build',
  order: 0,
  title: 'What is an agent harness?',
  metaTitle: 'What Is an Agent Harness? AI Harness Explained Simply',
  metaDescription:
    'What is an agent harness? The software around an AI model: tools, context, memory, MCP connectors, skills, hooks and checks. See why the harness changes results.',
  h1: 'What is an agent harness? The layer that makes an AI model useful',
  tldr: 'An agent harness is the software wrapped around an AI model: it gives the model tools, decides what the model sees, keeps notes between sessions, and checks the work. The model does the thinking; the harness does everything else. Claude Code, Cursor and OpenAI Codex are harnesses, and the parts you can change yourself are instruction files, skills, MCP connectors, subagents, hooks and permissions.',
  minutes: 14,
  level: 'Intermediate',
  steps: [
    {
      heading: 'What is an agent harness, in one sentence?',
      body: [
        'A model on its own can only read text and write text. To fix a bug, fill a spreadsheet or book a meeting, something has to hand it tools, feed it the right files, run its commands and pass the results back. That something is the harness.',
        'Anthropic’s Claude Code docs put it plainly: Claude Code is the layer around the model that provides the tools and manages the context the model sees, and that surrounding layer is what "agentic harness" means. The same Claude model sits inside the chat app, Claude Code and many other products. What differs is the harness.',
      ],
      flow: [
        'Your task',
        'Harness picks context and tools',
        'Model decides a step',
        'Harness runs it',
        'Result goes back to the model',
      ],
      keyIdea:
        'Agent = model + harness. The model reasons; the harness gives it hands, memory and a checker.',
    },
    {
      heading: 'What does a harness do on every task? (the loop)',
      body: [
        'Anthropic describes the work of an agent as a loop with three phases: gather context, take action, verify the result, then repeat until the task is done. Each phase has harness parts behind it.',
        'Gathering context uses search over your files, subagents and compaction (summarising old conversation so the context window does not overflow). Taking action uses tools, shell commands and MCP servers. Verifying uses fixed rules such as a linter, screenshots, or a second model acting as a judge.',
      ],
      flow: ['Gather context', 'Take action', 'Verify the result', 'Repeat or finish'],
      keyIdea:
        'When an agent fails, ask which phase failed: did it lack context, lack a tool, or lack a way to check its work?',
    },
    {
      heading: 'Which parts of a harness can you change yourself?',
      body: [
        'You do not need to build a harness to improve one. Modern harnesses expose a handful of parts you can edit. The table shows the ones in Claude Code, with what each does and what it costs in context. Cursor and Codex have close equivalents: an AGENTS.md or rules file, skills, MCP servers and approval settings.',
        'A connector is the friendly name for the MCP part. When you switch on Gmail, Google Drive or Slack in a chat app, you are adding an MCP server to the harness, so the model can read and act in that app.',
      ],
      visual: {
        kind: 'compare',
        label: 'Claude Code docs · Nov 2026',
        title: 'Six harness parts you control, and what each one costs in context',
        corner: 'Part',
        columns: [{ name: 'What it does' }, { name: 'When it loads' }, { name: 'Add it when' }],
        rows: [
          {
            label: 'Instruction file (CLAUDE.md, AGENTS.md)',
            cells: [
              'Standing rules the agent sees every session',
              'Session start, in full, on every request',
              'The agent gets a convention or command wrong twice',
            ],
          },
          {
            label: 'Skill',
            cells: [
              'A saved how-to for one kind of task',
              'Description at start; full text only when used',
              'You paste the same procedure for the third time',
            ],
          },
          {
            label: 'MCP server (connector)',
            cells: [
              'Access to an outside app or database',
              'Tool names at start; full details on demand',
              'You keep copying data from a tab the agent cannot see',
            ],
          },
          {
            label: 'Subagent',
            cells: [
              'A helper with its own separate context',
              'Only when spawned; returns a summary',
              'A side task floods the conversation with output',
            ],
          },
          {
            label: 'Hook',
            cells: [
              'A script that runs at a set moment, every time',
              'Runs outside the conversation; no context cost',
              'Something must happen every time without asking',
            ],
          },
          {
            label: 'Permissions',
            cells: [
              'What the agent may do without asking you',
              'Always in force',
              'You trust a command (run tests) or must block one',
            ],
          },
        ],
        note: 'Rules written in an instruction file are requests. A hook that blocks an action is enforcement.',
        source: [
          {
            label: 'Claude Code docs: Extend Claude Code',
            url: 'https://code.claude.com/docs/en/features-overview',
          },
          {
            label: 'How Claude Code works',
            url: 'https://code.claude.com/docs/en/how-claude-code-works',
          },
        ],
        updated: 'Nov 2026',
      },
      keyIdea:
        'Every part you add uses some context or adds a rule. Add a part only when a real, repeated problem calls for it.',
    },
    {
      heading: 'Does the harness really change the result? Two Anthropic experiments',
      body: [
        'In November 2025, Anthropic engineers asked a strong model to build a clone of the claude.ai web app from one high-level prompt. Run in a plain loop, it failed in two ways: it tried to do too much at once and ran out of context mid-feature, and later sessions looked at the half-built app and declared it finished. The fix was not a new model. It was harness work: a first session that wrote a list of over 200 features, each marked as failing, a progress file, a script to start the app, and a rule that each later session finishes one feature, tests it in a browser like a user, and commits.',
        'In March 2026, Prithvi Rajasekaran of Anthropic compared the same model alone and inside a three-agent harness (a planner, a generator and a separate evaluator that clicks through the app). The task was a retro game maker.',
      ],
      visual: {
        kind: 'compare',
        label: 'Anthropic Engineering · retro game maker · Opus 4.5',
        title:
          'Same model, same prompt: the harness run cost over 20 times more and produced a game that worked',
        corner: 'Measure',
        columns: [{ name: 'Model alone' }, { name: 'Planner + generator + evaluator' }],
        rows: [
          { label: 'Time', cells: ['20 minutes', '6 hours'] },
          { label: 'Cost', cells: ['$9', '$200'] },
          {
            label: 'Plan it worked from',
            cells: ['The short prompt', 'A 16-feature spec built over ten sprints'],
          },
          { label: 'Result', cells: ['Core game mechanics were broken', 'The game was playable'] },
        ],
        note: 'One task reported by Anthropic, not a benchmark. A harness is not free: it buys reliability with time and money.',
        source: [
          {
            label:
              'Anthropic Engineering: Harness design for long-running application development (24 Mar 2026)',
            url: 'https://www.anthropic.com/engineering/harness-design-long-running-apps',
          },
        ],
        updated: 'Mar 2026',
      },
      keyIdea:
        'A separate checker matters because, in the author’s words, "agents reliably skew positive when grading their own work".',
    },
    {
      heading: 'Worked workflow: set up a small harness for a weekly task',
      body: [
        'Here is the same thinking applied to a job seeker’s weekly routine: tailoring a resume to five job posts. The example is ours; the order of steps follows the triggers in the Claude Code docs. You can do it in Claude Code, Cursor or Codex, and the first two steps work in any chat app with projects and connectors.',
      ],
      workflow: {
        title: 'Worked workflow: five tailored resumes, checked, every week',
        input:
          'A folder with master-resume.md, five saved job posts, and an agent tool such as Claude Code.',
        steps: [
          {
            title: 'Write the standing rules (instruction file)',
            detail:
              'Put the rules that never change in CLAUDE.md or AGENTS.md at the top of the folder. Keep it short; the docs suggest under 200 lines.',
            code: '# Rules\n- Never invent a number, employer or tool. Write [add a number] instead.\n- One page. Keep my section order.\n- Save each result as out/<company>-resume.md. Never edit master-resume.md.',
          },
          {
            title: 'Save the procedure once (skill)',
            detail:
              'Create a tailor-resume skill: read the post, list its ten most important requirements, map each to a line in the master resume, rewrite only those lines, and list the requirements you could not match.',
          },
          {
            title: 'Connect the source (MCP connector)',
            detail:
              'If the job posts live in Google Drive or Notion, add that connector so the agent reads them directly instead of you pasting them in.',
          },
          {
            title: 'Enforce the one rule that must never break (hook or permission)',
            detail:
              'A rule in a file is only a request. Deny edits to master-resume.md in permissions, or add a hook that blocks any edit to that file.',
          },
          {
            title: 'Give it a way to check its work (verification)',
            detail:
              'Borrow Anthropic’s feature-list idea: a checklist file with one line per post, each marked "fails" until the agent has confirmed one page, no invented facts and the unmatched-requirements list. The agent may only flip a line to "passes".',
            code: '[\n  { "post": "acme-analyst", "one_page": false, "no_invented_facts": false, "gaps_listed": false, "passes": false }\n]',
          },
        ],
        output:
          'Five files in out/, a checklist showing which passed, and a list of real gaps per job. Next week you drop in five new posts and type one line.',
      },
      keyIdea:
        'You improved the result without touching the model or writing a cleverer prompt. That is harness work.',
    },
    {
      heading: 'What is harness engineering, and how much harness is enough?',
      body: [
        'In February 2026, OpenAI’s Ryan Lopopolo described a team that shipped an internal product with no hand-written code: roughly one million lines and about 1,500 merged pull requests in around five months, started by three engineers. Their job changed from writing code to building the harness: a short AGENTS.md of about 100 lines that points to deeper docs, linters whose error messages tell the agent how to fix the problem, and background agents that clean up drift. Their rule for context: "give Codex a map, not a 1,000-page instruction manual".',
        'More harness is not always better. Rajasekaran’s March 2026 post notes that "every component in a harness encodes an assumption about what the model can’t do on its own", and those assumptions go stale. When a newer model could work for over two hours without losing the thread, his team removed the sprint structure and kept only the planner and the evaluator.',
      ],
      bullets: [
        'Start with the simplest setup: an instruction file and good permissions.',
        'Add one part when the same failure shows up twice.',
        'After a model upgrade, remove parts and see if anything gets worse.',
        'Keep everything the agent needs inside the project. OpenAI’s team: "What Codex can’t see doesn’t exist."',
      ],
    },
  ],
  keyTerms: [
    {
      term: 'Agent harness',
      meaning:
        'The software around a model that gives it tools, manages what it sees, keeps state and checks its work. Also called an agentic harness or scaffold.',
    },
    {
      term: 'Agentic loop',
      meaning: 'The cycle an agent repeats: gather context, take action, verify the result.',
    },
    {
      term: 'Compaction',
      meaning:
        'Summarising or clearing older conversation so the context window does not overflow during long work.',
    },
    {
      term: 'Hook',
      meaning:
        'A script the harness runs at a fixed moment, such as before a tool is used. It runs every time, whatever the model decides.',
    },
    {
      term: 'Connector',
      meaning:
        'A ready-made link between an AI app and another service such as Gmail or Slack, usually built on MCP.',
    },
    {
      term: 'Harness engineering',
      meaning:
        'Improving an agent by changing its environment, instructions, tools and feedback loops rather than the model.',
    },
  ],
  videos: [
    {
      youtubeId: '1a1VXDdIyrk',
      title: 'Agent Harness explained in 8min..',
      channel: 'Caleb Writes Code',
      minutes: 8,
      why: 'A short overview of what sits around the model. Watch after step 2 and name which loop phase each part serves.',
    },
    {
      youtubeId: 'NovNcsKX8AU',
      title: 'The Never Ending Lore of Harness | Vivek Trivedy (Product Lead, Langchain)',
      channel: 'GroundZero YT',
      why: 'A longer talk from a LangChain product lead who builds harnesses. Watch for how the idea has changed as models improved.',
    },
  ],
  tryIt: {
    title: 'Find the weak part of your own harness',
    steps: [
      'Pick one task you give an AI tool every week and where the result often needs fixing.',
      'Write down the last two failures. For each, mark the phase: missing context, missing tool or access, or no check.',
      'Missing context twice? Add a short instruction file or project instructions with the rule it broke.',
      'Missing access? Switch on one connector (Drive, Gmail, Notion) so you stop pasting.',
      'No check? Add a five-line checklist the agent must fill before it says "done", then run the task again and compare.',
    ],
    link: {
      label: 'Claude Code docs: when to add each part',
      url: 'https://code.claude.com/docs/en/features-overview',
    },
  },
  check: [
    {
      q: 'Which of these is part of the harness, not the model?',
      options: [
        'The weights learned in training',
        'The code that runs a shell command and returns its output to the model',
        'The model’s ability to reason about code',
        'The number of parameters',
      ],
      answer: 1,
      why: 'The harness is the layer around the model: tools, context management, memory and checks. Running a command and passing back the result is harness work.',
    },
    {
      q: 'Your agent keeps editing a file it must never touch, even though the instruction file says not to. What is the right fix?',
      options: [
        'Write the rule again in capital letters',
        'Switch to a bigger model',
        'Add a hook or permission rule that blocks the edit',
        'Add a skill describing the rule',
      ],
      answer: 2,
      why: 'Instructions are requests the model may not follow. A hook or permission rule is enforced by the harness every time.',
    },
    {
      q: 'After a model upgrade, what does Anthropic’s March 2026 post suggest doing with your harness?',
      options: [
        'Add more agents to use the extra capability',
        'Leave it exactly as it is',
        'Remove parts that are no longer needed and keep the simplest setup that works',
        'Rewrite every prompt',
      ],
      answer: 2,
      why: 'Each harness part encodes an assumption about what the model cannot do. When the model improves, some parts stop earning their cost.',
    },
  ],
  sources: [
    {
      label: 'Claude Code docs: How Claude Code works (the agentic loop and harness)',
      url: 'https://code.claude.com/docs/en/how-claude-code-works',
    },
    {
      label: 'Claude Code docs: Extend Claude Code (CLAUDE.md, skills, MCP, subagents, hooks)',
      url: 'https://code.claude.com/docs/en/features-overview',
    },
    {
      label: 'Anthropic Engineering: Effective harnesses for long-running agents (26 Nov 2025)',
      url: 'https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents',
    },
    {
      label:
        'Anthropic Engineering: Harness design for long-running application development (24 Mar 2026)',
      url: 'https://www.anthropic.com/engineering/harness-design-long-running-apps',
    },
    {
      label: 'Anthropic: Building agents with the Claude Agent SDK (29 Sep 2025)',
      url: 'https://claude.com/resources/articles/building-agents-with-the-claude-agent-sdk',
    },
    {
      label: 'OpenAI: Harness engineering: leveraging Codex in an agent-first world (11 Feb 2026)',
      url: 'https://openai.com/index/harness-engineering/',
    },
  ],
  faqs: [
    {
      q: 'What is the difference between an AI model and an agent harness?',
      a: 'The model is the trained network that reads text and predicts what comes next. The harness is the software around it that supplies tools, chooses what the model sees, stores notes and checks results. An agent is the two working together.',
    },
    {
      q: 'Is Claude Code a harness? What about Cursor and Codex?',
      a: 'Yes. Anthropic’s docs describe Claude Code as the layer around the model that provides tools and manages context, which is what an agentic harness is. Cursor and OpenAI Codex play the same role around the models they run.',
    },
    {
      q: 'Is MCP part of the harness?',
      a: 'MCP is the standard a harness uses to connect to outside apps and data. Each MCP server or connector you add becomes one more set of tools the harness can offer the model.',
    },
  ],
  related: [
    { label: 'Previous: Subagents and multi-agent systems', href: '/learn-ai/multi-agent-systems' },
    { label: 'Next: Prompt injection and AI security', href: '/learn-ai/prompt-injection' },
    { label: 'What is MCP?', href: '/learn-ai/what-is-mcp' },
    { label: 'What are Agent Skills?', href: '/learn-ai/agent-skills' },
    { label: 'Context engineering', href: '/learn-ai/context-engineering' },
    { label: 'The levers that make answers better', href: '/learn-ai/ai-output-levers' },
    { label: 'Claude Code for beginners', href: '/learn-ai/claude-code' },
    { label: 'AI engineer career guide', href: '/ai-engineer' },
  ],
  fromTheSource: [
    {
      who: 'Prithvi Rajasekaran',
      role: 'Anthropic Labs engineer who built and measured multi-agent harnesses for long coding tasks',
      work: 'Harness design for long-running application development (Anthropic Engineering, March 2026)',
      url: 'https://www.anthropic.com/engineering/harness-design-long-running-apps',
      idea: 'Separate the agent that builds from the agent that judges, and treat every harness part as an assumption about a model weakness that may no longer be true.',
      breakdown: [
        'A planner turns a one-line request into a spec, so the builder is not guessing the scope.',
        'A separate evaluator uses the running app like a user; it is easier to make a judge strict than to make a builder self-critical.',
        'The harness run took 6 hours and $200 against 20 minutes and $9 alone, and only the harness run produced a working game.',
        'With a newer model, the team removed sprints and context resets because the model no longer needed them.',
      ],
      use: 'Give your agent a written definition of "done" and a separate check. After each model upgrade, try removing one part of your setup.',
    },
    {
      who: 'Ryan Lopopolo',
      role: 'OpenAI engineer on a team that shipped a product written entirely by Codex',
      work: 'Harness engineering: leveraging Codex in an agent-first world (OpenAI, February 2026)',
      url: 'https://openai.com/index/harness-engineering/',
      idea: 'When agents write the code, the engineer’s job is to design the environment: "Humans steer. Agents execute."',
      breakdown: [
        'One huge instruction file crowded out context and went stale; a short AGENTS.md of about 100 lines pointing to deeper docs worked better.',
        'Anything outside the project folder (chat threads, documents, what is in your head) does not exist for the agent.',
        'Rules were enforced by linters and tests whose error messages tell the agent how to fix the problem.',
        'When an agent failed, the fix was usually a missing tool or missing structure, not asking it to try harder.',
      ],
      use: 'Keep your instruction file short and use it as a table of contents. When the agent fails, ask what it could not see or could not do, and add that.',
    },
  ],
}
