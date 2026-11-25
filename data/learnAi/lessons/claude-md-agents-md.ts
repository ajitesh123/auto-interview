import type { Lesson } from '../types'
import { SAMPLE_AFTER, SAMPLE_BEFORE, SRC, TOOLS, checkInstructionFile } from '../instructionFile'

// Numbers in the worked example come from the checker itself, so the text and the tool agree.
const before = checkInstructionFile(SAMPLE_BEFORE)
const after = checkInstructionFile(SAMPLE_AFTER)

export const lesson: Lesson = {
  slug: 'claude-md-agents-md',
  track: 'automate',
  order: 0,
  title: 'CLAUDE.md and AGENTS.md',
  metaTitle: 'CLAUDE.md and AGENTS.md: Write Instruction Files That Work',
  metaDescription:
    'How to write CLAUDE.md and AGENTS.md: which file each AI coding tool reads, what to put in and leave out, what research found, and a free checker for your file.',
  h1: 'CLAUDE.md and AGENTS.md: how to write instruction files for AI coding agents',
  tldr: 'CLAUDE.md and AGENTS.md are plain Markdown files in your project that a coding agent reads at the start of every session. Claude Code reads CLAUDE.md; Codex, Cursor, GitHub Copilot and many others read AGENTS.md, so write your rules once in AGENTS.md and add a one-line CLAUDE.md that imports it. Keep it short (Anthropic targets under 200 lines) and put in only what the agent cannot work out from the code: the exact test and lint commands, misleading places, team decisions and hard limits.',
  minutes: 14,
  level: 'Beginner',
  steps: [
    {
      heading: 'What is an instruction file?',
      body: [
        'A coding agent starts every session with a blank memory. An instruction file is a note it reads first, every time: how to run the tests, which old pattern not to copy, what it must never touch. The agents.md site calls AGENTS.md “a README for agents”.',
        'It is plain Markdown with no required fields. Claude Code’s docs are clear that the agent treats it “as context, not enforced configuration”: it is advice the model weighs, not a lock. Anything that must happen every time belongs in a hook or a permission rule instead.',
      ],
      flow: [
        'Session starts',
        'Agent reads instruction files',
        'You give a task',
        'Agent works with your rules in mind',
        'It runs your test command to check',
      ],
      keyIdea: 'Every line is read on every task, so each line should change what the agent does.',
    },
    {
      heading: 'Which file does each tool read?',
      body: [
        'Each tool started with its own file name. AGENTS.md is the shared one: it is now stewarded by the Agentic AI Foundation under the Linux Foundation, and agents.md says it is “used by over 60k open-source projects”. Codex, Cursor, GitHub Copilot, Gemini CLI (with one setting) and many others read it.',
        'Claude Code is the exception to watch. Its memory page (checked 21 Nov 2026) says it reads CLAUDE.md, not AGENTS.md, and tells you to create a CLAUDE.md that imports it with the line @AGENTS.md. InfoWorld reported on 21 Sep 2026 that version 2.1.277 also falls back to AGENTS.md when no CLAUDE.md exists, but only when Claude Code can load Anthropic’s feature flags (not on Bedrock or Vertex, or with telemetry off). The import works in every case, so use it. On Mac or Linux a symlink also works (ln -s AGENTS.md CLAUDE.md); on Windows Anthropic says use the import.',
      ],
      visual: {
        kind: 'compare',
        label: '5 coding agents · each tool’s docs · checked 21 Nov 2026',
        title:
          'Three of five tools read AGENTS.md as is; Gemini CLI needs a setting, Claude Code an import',
        corner: 'Tool',
        columns: [{ name: 'Main file' }, { name: 'AGENTS.md' }, { name: 'Rules for one folder' }],
        rows: TOOLS.map((t) => ({ label: t.name, cells: [t.file, t.readsAgents, t.scoped] })),
        source: TOOLS.map((t) => t.source),
        updated: '21 Nov 2026',
      },
      example: {
        label: 'CLAUDE.md that shares AGENTS.md (Anthropic’s documented way)',
        code: true,
        text: '@AGENTS.md\n\n## Claude Code only\nUse plan mode for changes under src/billing/.',
      },
    },
    {
      heading: 'Does an instruction file actually help?',
      body: [
        'Less than most guides suggest, and it depends on what you write. A 2026 ETH Zurich study found that providing context files “does not generally improve task success rates” while “increasing inference cost by over 20% on average”. The same paper found the instructions were followed well, and that repository overviews “are not helpful”.',
        'A second 2026 study, on 10 repositories and 124 pull requests, found AGENTS.md went with a 28.64% lower median runtime and 16.58% fewer output tokens at similar completion. Read together: a short file of rules the agent could not guess saves wasted work; a long tour of the codebase mostly costs tokens.',
      ],
      visual: {
        kind: 'compare',
        label: '3 studies of real instruction files · 2025–2026',
        title: 'Rules the agent can’t guess help; long overviews mostly add cost',
        corner: 'Study',
        columns: [{ name: 'What they tested' }, { name: 'What they found' }],
        rows: [
          {
            label: 'ETH Zurich, arXiv 2602.11988 (Feb 2026, rev. Sep 2026)',
            cells: [
              'Coding agents with and without context files, both LLM-written and developer-written',
              'No general gain in task success; inference cost up over 20% on average; overviews not helpful',
            ],
          },
          {
            label: 'Lulla et al., arXiv 2601.20404 (Jan 2026)',
            cells: [
              '10 repositories, 124 pull requests, agent run with and without AGENTS.md',
              'Median runtime 28.64% lower, output tokens 16.58% lower, similar completion',
            ],
          },
          {
            label: 'GitHub blog, 2,500+ agents.md files (Nov 2025)',
            cells: [
              'What public files that work have in common',
              'Commands early, one real code example, clear always / ask first / never rules; most fail by being vague',
            ],
          },
        ],
        note: 'Each study measured different agents and tasks, so the numbers are not comparable with each other.',
        source: [
          SRC.eth,
          {
            label: 'Lulla et al.: AGENTS.md and agent efficiency (arXiv 2601.20404)',
            url: 'https://arxiv.org/abs/2601.20404',
          },
          SRC.github,
        ],
        updated: '21 Nov 2026',
      },
      keyIdea:
        'Write down what is non-standard about your project. Skip what the agent can read for itself.',
    },
    {
      heading: 'What should you put in, and what should you leave out?',
      body: [
        'Anthropic’s best-practices page says the file works best when it holds only what Claude couldn’t work out from the code. Here is its list of what to put in, plus what to leave out. Be exact: Anthropic’s memory docs suggest “Use 2-space indentation” over “Format code properly”, and “Run npm test before committing” over “Test your changes”.',
      ],
      bullets: [
        'Put in: the exact test, typecheck and lint commands, and how to run one test file.',
        'Put in: places where the code misleads, like an old pattern new code must not copy.',
        'Put in: decisions that aren’t in the repo (which error helper, how deploys work) and anything you’ve corrected twice.',
        'Leave out: long architecture and folder tours (the ETH study found overviews “are not helpful”; one line on where new code goes is fine), style rules your linter enforces (list the lint command instead), and secrets.',
        'Move out: multi-step procedures to a skill; rules for one folder to a path-scoped rule; anything that must happen every time to a hook (a script the tool always runs).',
        'Older guides, including Anthropic’s own 2025 blog post, suggest a project map; the 2026 docs and research favour cutting it to the parts the code hides.',
      ],
      example: {
        label: 'A starter AGENTS.md to copy (fill in your own)',
        code: true,
        text: '## Commands\n- Install: <install command>\n- Done means this passes: <test + lint + typecheck>\n- One test file: <command>\n\n## Things the code won’t tell you\n- <old pattern new code must not copy>\n- <team decision, e.g. which error helper>\n\n## Boundaries\n- Always: <e.g. add a test for a behaviour change>\n- Ask first: <e.g. new dependency, schema change>\n- Never: <e.g. edit migrations by hand, commit .env>',
      },
      keyIdea:
        'Shouting does not help: Anthropic says piling on IMPORTANT “mostly makes Claude over-apply the rule”.',
    },
    {
      heading: 'Worked example: from a /init draft to a short AGENTS.md',
      body: [
        'Running /init in Claude Code writes a first draft by studying your project. Anthropic’s advice: “From there the work is mostly removing lines.” Here is that cut on a fictional Next.js job tracker, run through the checker on this page.',
      ],
      workflow: {
        title: 'Worked workflow: cleaning up jobtrack’s instruction file',
        input: `A ${before.lines}-line draft (~${before.tokens} tokens): project overview, a 13-line architecture section (mostly a folder tour), style rules, a database URL with a password, an 8-step release list and two “write clean code” lines. Checker: ${before.passed} of ${before.total} checks pass.`,
        steps: [
          {
            title: 'Delete what the agent can read',
            detail:
              'The overview and folder tour describe what is already in package.json and the folders. Keep one line for the misleading place: lib/legacyApi.ts must not be copied.',
          },
          {
            title: 'Replace style rules with the command',
            detail:
              'Five formatting lines become one: the lint command that enforces them. Vague lines (“format code properly”, “be careful”) are deleted or turned into exact rules.',
            code: 'pnpm typecheck && pnpm lint && pnpm test\npnpm vitest run tests/stages.test.ts',
          },
          {
            title: 'Remove the secret, keep the name',
            detail:
              'The connection string with a password goes; the file now says DATABASE_URL lives in .env.local. Anyone who saw the old file should get that password changed.',
          },
          {
            title: 'Fix the contradiction and the shouting',
            detail:
              '“IMPORTANT: Never use any” and “Use any only when…” pull in opposite directions. The linter now owns that rule, and the three IMPORTANT / YOU MUST lines are gone.',
          },
          {
            title: 'Move the procedure, add limits',
            detail:
              'The 8-step release list moves to docs/release.md (in Claude Code it could become a skill). Three boundary lines are added: always add a test, ask first before a new dependency, never hand-edit migrations.',
          },
          {
            title: 'Rename to AGENTS.md and import it',
            detail:
              'The file becomes AGENTS.md so Codex, Cursor and Copilot read it too; CLAUDE.md holds one line, @AGENTS.md.',
          },
        ],
        output: `A ${after.lines}-line AGENTS.md (~${after.tokens} tokens) with commands at the top, four facts the code hides, three limits plus a pointer to the release doc, and one real code example. Checker: ${after.passed} of ${after.total} checks pass. Load both versions in the checker below to see each finding.`,
      },
    },
    {
      heading: 'Where do the files live, and how do they combine?',
      body: [
        'Tools look in more than one place and join what they find. Claude Code walks up from the folder you start in and reads every CLAUDE.md on the way; files in subfolders load when the agent works there; “all discovered files are concatenated” rather than replacing each other. A personal CLAUDE.local.md (kept out of git) is read last at its level.',
        'Codex reads from the project root down to your folder, and files closer to your folder “override earlier guidance because they appear later”. It stops adding files at 32 KiB by default. agents.md’s rule for nested files: “the closest one takes precedence.”',
      ],
      example: {
        label: 'A monorepo with one shared file and one per app',
        code: true,
        text: 'my-repo/\n├── AGENTS.md          # shared: commands, limits\n├── CLAUDE.md          # @AGENTS.md\n├── apps/web/\n│   └── AGENTS.md      # web-only rules, read when working here\n└── apps/api/\n    └── AGENTS.md      # api-only rules',
      },
      keyIdea:
        'Root file for what is true everywhere; a small file in a folder for what is true only there.',
      bullets: [
        'Keep it alive: when you correct the agent the same way twice, add one line.',
        'Review changes to the file in pull requests, like code.',
        'Delete rules that point at files or tools you no longer use. In Claude Code, /doctor prompt-audit flags rules that contradict each other or point at missing files.',
      ],
    },
  ],
  keyTerms: [
    {
      term: 'CLAUDE.md',
      meaning:
        'Claude Code’s instruction file. Lives in the project (shared), in ~/.claude/ (just you) or as CLAUDE.local.md (just you, this project).',
    },
    {
      term: 'AGENTS.md',
      meaning:
        'The shared, open instruction-file format read by Codex, Cursor, GitHub Copilot, Gemini CLI (with one setting) and many other agents.',
    },
    {
      term: '/init',
      meaning:
        'A Claude Code command that writes a first CLAUDE.md by studying your project. Treat it as a draft to cut down.',
    },
    {
      term: '@import',
      meaning:
        'A line like @AGENTS.md inside CLAUDE.md that pulls another file in. It organises text but does not reduce what is loaded.',
    },
    {
      term: 'Lint and typecheck',
      meaning:
        'Commands that check code automatically: a linter flags style and common mistakes, a typecheck catches wrong types. Listing them lets the agent check its own work.',
    },
    {
      term: 'Hook',
      meaning:
        'A script the tool always runs at a set moment, such as before a command or after an edit. Use it for rules that must never be skipped.',
    },
    {
      term: 'Path-scoped rule',
      meaning:
        'A rule file that applies only to matching files, e.g. .claude/rules/ with paths:, Cursor globs or Copilot applyTo.',
    },
  ],
  videos: [
    {
      youtubeId: '6w88NVf2_lY',
      title: 'How I Write My AGENTS.md Files  - Best Practices',
      channel: 'NeuralNine',
      why: 'A practitioner builds a real AGENTS.md section by section. Compare his file with the checklist in step 4.',
    },
    {
      youtubeId: 'GcNu6wrLTJc',
      title: 'Delete your CLAUDE.md (and your AGENT.md too)',
      channel: 'Theo - t3․gg',
      why: 'A strong opinion on the 2026 research in step 3. Watch it after the lesson and decide where you agree.',
    },
  ],
  tryIt: {
    title: 'Audit your own instruction file in 10 minutes',
    steps: [
      'Open your project’s CLAUDE.md or AGENTS.md. No file yet? In Claude Code type /init; in Codex or Cursor create AGENTS.md at the project root.',
      'Paste it into the checker above and fix every “Fix” item first (a key or password in the file means change that key).',
      'Delete any line the agent could learn by reading the code. Ask of each line: would the agent do something different without it?',
      'Add the one command that checks the work (tests + lint) near the top, and one “never” rule for the thing you most fear the agent touching.',
      'Start a fresh session and ask “what are the rules for this project?” In Claude Code, /memory shows which files loaded.',
    ],
    link: { label: 'Claude Code docs: memory and CLAUDE.md', url: SRC.memory.url },
  },
  check: [
    {
      q: 'Your team uses Claude Code and Cursor. What is the simplest setup?',
      options: [
        'Two separate files with the same rules copied in',
        'Rules in AGENTS.md, and a CLAUDE.md containing @AGENTS.md',
        'Only CLAUDE.md, because Cursor reads it',
        'Put the rules in the README',
      ],
      answer: 1,
      why: 'Cursor reads AGENTS.md; Anthropic documents importing it into CLAUDE.md with @AGENTS.md, so the rules live in one place.',
    },
    {
      q: 'Which line is most worth keeping in an instruction file?',
      options: [
        'components/ contains the React components',
        'Write clean code and follow best practices',
        'Never edit prisma/migrations/ by hand; run pnpm prisma migrate dev',
        'IMPORTANT: YOU MUST be careful',
      ],
      answer: 2,
      why: 'It is specific, the agent could not guess it, and it changes what the agent does. Folder tours, vague advice and shouting do not.',
    },
    {
      q: 'Claude keeps ignoring a rule that must happen every time. What does Anthropic suggest?',
      options: [
        'Add IMPORTANT in capitals',
        'Repeat the rule three times',
        'Make it a hook or a deny rule',
        'Make the file longer',
      ],
      answer: 2,
      why: 'Anthropic: “If something has to happen every time, make it a hook, a deny rule, or a managed setting.” The instruction file is for guidelines.',
    },
  ],
  sources: [
    { label: 'Claude Code docs: memory (CLAUDE.md, imports, AGENTS.md)', url: SRC.memory.url },
    { label: 'Claude Code docs: best practices', url: SRC.best.url },
    { label: 'Anthropic: Using CLAUDE.md files (Nov 2025)', url: SRC.blog.url },
    { label: 'AGENTS.md (agents.md)', url: 'https://agents.md' },
    { label: 'OpenAI Codex: custom instructions with AGENTS.md', url: SRC.codex.url },
    { label: 'Cursor docs: rules', url: SRC.cursor.url },
    {
      label: 'GitHub docs: repository custom instructions for Copilot',
      url: 'https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions',
    },
    { label: 'Gemini CLI docs: GEMINI.md', url: 'https://geminicli.com/docs/cli/gemini-md/' },
    {
      label:
        'Gloaguen et al. (ETH Zurich): Evaluating AGENTS.md, arXiv 2602.11988 (Feb 2026, rev. Sep 2026)',
      url: SRC.eth.url,
    },
    {
      label:
        'Lulla et al.: On the Impact of AGENTS.md Files on the Efficiency of AI Coding Agents, arXiv 2601.20404',
      url: 'https://arxiv.org/abs/2601.20404',
    },
    { label: 'GitHub blog: How to write a great agents.md (Nov 2025)', url: SRC.github.url },
    {
      label: 'OpenAI: Harness engineering (Ryan Lopopolo, Feb 2026)',
      url: 'https://openai.com/index/harness-engineering/',
    },
    {
      label: 'InfoWorld: Claude Code now also accepts AGENTS.md (21 Sep 2026)',
      url: 'https://www.infoworld.com/article/4224410/claude-code-now-also-accepts-instructions-in-openais-agents-md-format.html',
    },
    { label: 'OpenAI Help: what are tokens (4 characters rule of thumb)', url: SRC.tokens.url },
  ],
  faqs: [
    {
      q: 'What is the difference between CLAUDE.md and AGENTS.md?',
      a: 'They do the same job. CLAUDE.md is the file Claude Code reads; AGENTS.md is the open format read by Codex, Cursor, GitHub Copilot, Gemini CLI (with one setting) and others. If you use more than one tool, write the rules in AGENTS.md and put @AGENTS.md in CLAUDE.md, as Anthropic’s docs describe.',
    },
    {
      q: 'How long should CLAUDE.md be?',
      a: 'Anthropic targets under 200 lines per CLAUDE.md, because longer files use more context and reduce adherence. Cursor says keep rules under 500 lines, and Codex stops reading instruction files at 32 KiB by default. OpenAI’s own team kept its AGENTS.md to roughly 100 lines and pointed to deeper docs.',
    },
    {
      q: 'Should I use /init to write my CLAUDE.md?',
      a: 'Yes, as a draft. /init studies your project and writes a starting file. Then cut it: delete folder tours and anything the agent can read from the code, add your exact test and lint commands, and add the rules you have had to repeat.',
    },
  ],
  related: [
    {
      label: 'Previous: Claude Code vs Cursor vs Codex',
      href: '/learn-ai/ai-coding-tools-compared',
    },
    { label: 'Next: Hooks and permissions', href: '/learn-ai/claude-code-hooks-permissions' },
    { label: 'Claude Code for beginners', href: '/learn-ai/claude-code' },
    { label: 'What is an agent harness?', href: '/learn-ai/agent-harness' },
    { label: 'What are Agent Skills?', href: '/learn-ai/agent-skills' },
    { label: 'AI engineer career guide', href: '/ai-engineer' },
    { label: 'Free AI skills resources', href: '/free-resources#ai-skills' },
  ],
  fromTheSource: [
    {
      who: 'Ryan Lopopolo, OpenAI',
      role: 'Engineer on the OpenAI team that built a product with Codex writing the code',
      work: 'Harness engineering: leveraging Codex in an agent-first world (Feb 2026)',
      url: 'https://openai.com/index/harness-engineering/',
      idea: 'A huge instruction file failed them. Their fix: a short AGENTS.md, roughly 100 lines, that works as a map, “not a 1,000-page instruction manual”, pointing to deeper docs.',
      breakdown: [
        'Context is scarce: a giant file crowds out the task and the code.',
        'Big manuals go stale fast, and stale rules mislead the agent.',
        'Treat AGENTS.md as a table of contents; keep detail in linked docs.',
        'They checked the docs with linters and CI so the map stayed true.',
      ],
      use: 'If your file is growing, move each long section into its own doc and leave one line in AGENTS.md saying when to read it.',
    },
    {
      who: 'Thibaud Gloaguen, Martin Vechev and team, ETH Zurich',
      role: 'Researchers who measured whether context files help coding agents',
      work: 'Evaluating AGENTS.md: Are Repository-Level Context Files Helpful for Coding Agents? (arXiv, 2026)',
      url: 'https://arxiv.org/abs/2602.11988',
      idea: 'Across several models and agents, context files did not generally raise task success but raised cost by over 20%. Agents did follow the instructions; overviews of the repository did not help.',
      breakdown: [
        'Following instructions is not the same as solving more tasks.',
        'Overviews repeat what the agent finds by reading the code.',
        'The useful part is non-standard practice the agent could not guess.',
        'Measure any change to your file before trusting it.',
      ],
      use: 'Before adding a line, ask whether the agent would act differently without it. If not, leave it out.',
    },
  ],
  widget: 'instruction-file-checker',
}
