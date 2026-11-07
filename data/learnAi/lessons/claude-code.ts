import type { Lesson } from '../types'

export const lesson: Lesson = {
  slug: 'claude-code',
  track: 'automate',
  order: 18,
  title: 'Claude Code for beginners',
  metaTitle: 'Claude Code Tutorial for Beginners: Install and First Task',
  metaDescription:
    'How to use Claude Code: what a terminal is, the install command, your first task, CLAUDE.md, permission modes, good habits and plan prices as of Nov 2026.',
  h1: 'Claude Code for beginners: install it and finish your first task',
  tldr: 'Claude Code is Anthropic’s AI coding agent. You describe what you want in plain English, and it reads your project, edits files and runs commands to get it done, asking your permission along the way. It runs in the terminal, in VS Code and JetBrains, in a desktop app and on the web, and needs a paid Claude plan (from $20 a month as of Nov 2026) or an API account.',
  minutes: 14,
  level: 'Beginner',
  steps: [
    {
      heading: 'What is Claude Code, and how is it different from a chatbot?',
      body: [
        'In a chatbot you copy code in, copy an answer out, and paste it back into your files yourself. Claude Code skips the copying. Anthropic’s docs call it "an agentic coding tool that reads your codebase, edits files, runs commands, and integrates with your development tools."',
        'That makes it an agent, like the ones in the AI agents lesson: you give it a goal, and it loops through reading files, making a change, running a check and fixing what broke. You stay in charge by approving actions and reviewing the changes.',
      ],
      bullets: [
        'Terminal (CLI): the full version, works with any editor.',
        'VS Code and JetBrains: inside your code editor, with visual diffs.',
        'Desktop app: no terminal at all, with a Code tab.',
        'Web at claude.ai/code: runs in the cloud, even from your phone.',
      ],
      keyIdea: 'A chatbot talks about your code. Claude Code works on your code.',
    },
    {
      heading: 'First, what is a terminal? Then install',
      body: [
        'A terminal is a window where you type commands instead of clicking. On a Mac, press Cmd + Space, type Terminal and press Enter. On Windows, press Win + X and choose Windows PowerShell (or Terminal). You will see a blinking cursor: that is where commands go.',
        'Copy the command for your system, paste it and press Enter. It shows no progress while it downloads, so wait. Then open a new terminal window and run claude --version. If you see a version number, it worked. Prefer not to use a terminal at all? Install the Claude desktop app and use its Code tab instead.',
      ],
      example: {
        label: 'Official install commands (from Anthropic’s docs)',
        code: true,
        text: '# macOS, Linux or WSL\ncurl -fsSL https://claude.ai/install.sh | bash\n\n# Windows PowerShell\nirm https://claude.ai/install.ps1 | iex\n\n# Check it worked (in a new window)\nclaude --version',
      },
    },
    {
      heading: 'Start your first session',
      body: [
        'Claude Code works inside a folder, which it treats as your project. Use cd ("change directory") to move into that folder, then type claude. The first time, a browser window opens so you can log in with your Claude account.',
        'Start by asking questions, not giving orders. Claude reads the files it needs by itself, so you don’t have to paste anything. When it wants to change a file, it shows you the change and asks. Choose Yes to approve.',
      ],
      example: {
        label: 'Your first commands and prompts',
        code: true,
        text: 'cd my-project\nclaude\n\n> what does this project do?\n> explain the folder structure\n> add a hello world function to the main file',
      },
      bullets: [
        'Esc stops Claude mid-action, so you can redirect it.',
        '/help shows commands. /clear starts a fresh conversation.',
        'Type exit, or press Ctrl + D twice, to leave.',
      ],
    },
    {
      heading: 'CLAUDE.md: the note Claude reads every time',
      body: [
        'Every session starts with a fresh memory. CLAUDE.md is a plain text (Markdown) file in your project folder that Claude reads at the start of every session. Put the things it cannot guess from the code: how to run the app, how to run tests, and your rules.',
        'Type /init and Claude writes a starter CLAUDE.md for you by studying the project. Keep it short. Anthropic suggests under 200 lines, because every line takes some of Claude’s attention on every task. If your project already has an AGENTS.md file for other tools, Claude Code can read that instead.',
      ],
      example: {
        label: 'A small CLAUDE.md',
        code: true,
        text: '# Commands\n- Run the app: npm run dev\n- Run tests: npm test\n\n# Conventions\n- Use TypeScript, not plain JavaScript\n- Keep components in src/components\n\n# Gotchas\n- Never edit files in dist/',
      },
    },
    {
      heading: 'Permissions: how much can Claude do without asking?',
      body: [
        'Claude Code has permission modes. Press Shift + Tab during a session to switch. In Manual (default) mode it asks before most edits, commands or network access. acceptEdits lets it edit files in your project without asking. Plan mode makes it research and propose a plan without changing anything. Auto mode, where available, lets a classifier review risky actions so you get fewer prompts. Anthropic’s best-practices page says new sessions now start in auto mode, so check which mode is shown before you begin.',
        'There is also bypassPermissions, which turns off the checks. Anthropic says to use it only in isolated environments like containers or VMs, never on your main computer. As a beginner, stay in Manual or Plan mode until you know what Claude tends to do.',
      ],
      flow: [
        'Plan mode: propose',
        'You read the plan',
        'Manual mode: approve each change',
        'Review the diff',
        'Commit',
      ],
      keyIdea: 'Approving a change is your job. Read what it wants to run before you press Yes.',
    },
    {
      heading: 'Good habits, and what it costs',
      body: [
        'Be specific: name the file, describe the problem and say what "done" looks like. Give Claude a check it can run, such as a test or a build, so it can tell if its work really works. If you have corrected it twice and it is still wrong, run /clear and write one better prompt. Save your work with git before big changes, since /rewind only restores files Claude edited itself.',
        'Prices as of Nov 2026, from claude.com/pricing: the Free plan does not include Claude Code. Pro is $20 a month (or $17 a month billed yearly at $200), Max is $100 a month with 5x Pro usage, and Ultra is $200 a month. Team seats start at $25 a month ($20 billed yearly). You can also pay per use with an API (Console) account.',
      ],
      bullets: [
        'Instead of "fix the bug", try "users see a blank screen after a wrong password on the login page. Find why and fix it."',
        'Let it explore first: "read the code for the signup form and explain it before changing anything".',
        'For new projects, ask it to interview you and write a short SPEC.md first.',
      ],
    },
  ],
  keyTerms: [
    {
      term: 'Terminal',
      meaning:
        'A text window where you type commands to your computer. On Windows it is usually PowerShell.',
    },
    {
      term: 'Agentic coding tool',
      meaning:
        'An AI that can read files, edit them and run commands in a loop to finish a task, not just reply with text.',
    },
    {
      term: 'CLAUDE.md',
      meaning:
        'A Markdown file of project instructions that Claude Code reads at the start of every session.',
    },
    {
      term: 'Permission mode',
      meaning:
        'The setting that decides which actions Claude can take without asking you first. Switch with Shift + Tab.',
    },
    { term: 'Diff', meaning: 'A view of exactly which lines were added or removed in a change.' },
  ],
  videos: [
    {
      youtubeId: 'gv0WHhKelSE',
      title: 'Claude Code best practices | Code w/ Claude',
      channel: 'Anthropic',
      minutes: 26,
      why: 'An Anthropic engineer explains how Claude Code works and the habits that get good results. Focus on CLAUDE.md, permissions and context.',
    },
    {
      youtubeId: 'ntDIxaeo3Wg',
      title: 'Claude Code - Full Tutorial for Beginners',
      channel: 'Tech With Tim',
      minutes: 36,
      why: 'A screen-by-screen walkthrough from install to building a small project. Good if you want to watch someone do every step first.',
    },
  ],
  tryIt: {
    title: 'Build and explain a tiny web page with Claude Code',
    steps: [
      'Install Claude Code with the command for your system, then log in when you first run claude.',
      'In the terminal, make a folder and enter it: mkdir my-first-app, then cd my-first-app, then claude.',
      'Press Shift + Tab until you see plan mode, then type: "Plan a one-page to-do list app in a single index.html file. Tasks should stay after a page refresh." Read the plan.',
      'Switch back to the default mode and say "go ahead". Approve the file it wants to create, then double-click index.html to open it in your browser.',
      'Type /init to create a CLAUDE.md, then ask "explain how index.html saves my tasks, in simple words".',
    ],
    link: {
      label: 'Claude Code terminal guide for new users',
      url: 'https://code.claude.com/docs/en/terminal-guide',
    },
  },
  check: [
    {
      q: 'What makes Claude Code different from pasting code into a chatbot?',
      options: [
        'It uses a different kind of AI that never makes mistakes',
        'It can read your files, edit them and run commands itself, with your permission',
        'It only works without internet',
        'It writes code only in Python',
      ],
      answer: 1,
      why: 'Claude Code is an agent that works directly in your project. It still makes mistakes, so you review and approve its changes.',
    },
    {
      q: 'You want Claude to suggest an approach for a big change without touching any files yet. What should you use?',
      options: ['bypassPermissions mode', 'Plan mode', 'The /exit command', 'A longer CLAUDE.md'],
      answer: 1,
      why: 'Plan mode tells Claude to research and propose changes without making them. You approve the plan before any edits happen.',
    },
    {
      q: 'What belongs in CLAUDE.md?',
      options: [
        'Your passwords and API keys',
        'A full copy of every file in the project',
        'Short instructions Claude cannot guess, like how to run tests and project rules',
        'Nothing, it must stay empty',
      ],
      answer: 2,
      why: 'CLAUDE.md is read every session, so keep it short (Anthropic suggests under 200 lines) and limited to what Claude can’t work out from the code. Never put secrets in it.',
    },
  ],
  fromTheSource: [
    {
      who: 'Boris Cherny and Cat Wu (Anthropic)',
      role: 'Boris Cherny built the first version of Claude Code and was its lead engineer; Cat Wu was its product manager.',
      work: 'Claude Code: Anthropic’s Agent in Your Terminal (Latent Space podcast, May 2025)',
      url: 'https://www.latent.space/p/claude-code',
      idea: 'Claude Code started as a side experiment: Boris built a small terminal tool on Anthropic’s API, and once he gave it access to the terminal and the ability to write code, he found himself using it every day. The team then kept the tool as thin as possible and let the model do the work.',
      breakdown: [
        'Thin by design: their rule was to do the simple thing first, with very little interface between you and the model.',
        'Like a Unix tool: you can run it in scripts with claude -p, pipe text into it, and combine it with other command-line tools.',
        'Search like a person: it finds code with ordinary file search (glob and grep) instead of building a separate index of your project.',
        'Simple memory: CLAUDE.md is just a Markdown file that is read into the conversation at the start.',
      ],
      use: 'Treat Claude Code like a colleague at your terminal, not a magic box. Keep CLAUDE.md short and plain, and when you repeat a task often, try running it as a one-line claude -p command.',
    },
    {
      who: 'The Claude Code team at Anthropic',
      role: 'The team that builds Claude Code and maintains its official best-practices guide.',
      work: 'Best practices for Claude Code (official docs)',
      url: 'https://code.claude.com/docs/en/best-practices',
      idea: 'The guide says "Claude stops when the work looks done." If it has no test or check to run, "looks done" is all it has, and you end up being the test suite.',
      breakdown: [
        'Give Claude a check that returns pass or fail, such as a test file, a build, a linter or a screenshot next to the design. Then it can fix its own mistakes.',
        'Tell Claude what it cannot see in the code: how you deploy, which files are off limits, what counts as done.',
        'Rules that must never be broken belong in settings or hooks that Claude Code enforces every time, not only in a prompt the model might skip.',
        'Ask for evidence, such as the command it ran and the output, rather than a bare "all tests pass".',
      ],
      use: 'End your prompts with a check, for example "run npm test and keep going until it passes, then show me the output." Put that test command in your CLAUDE.md so every session knows it.',
    },
  ],
  sources: [
    { label: 'Claude Code docs: Overview', url: 'https://code.claude.com/docs/en/overview' },
    { label: 'Claude Code docs: Quickstart', url: 'https://code.claude.com/docs/en/quickstart' },
    {
      label: 'Claude Code docs: Terminal guide for new users',
      url: 'https://code.claude.com/docs/en/terminal-guide',
    },
    {
      label: 'Claude Code docs: How Claude remembers your project (CLAUDE.md)',
      url: 'https://code.claude.com/docs/en/memory',
    },
    {
      label: 'Claude Code docs: Permission modes',
      url: 'https://code.claude.com/docs/en/permission-modes',
    },
    {
      label: 'Claude Code docs: Best practices',
      url: 'https://code.claude.com/docs/en/best-practices',
    },
    { label: 'Claude plans and pricing', url: 'https://claude.com/pricing' },
    {
      label: 'Latent Space podcast: Claude Code, Anthropic’s Agent in Your Terminal (May 2025)',
      url: 'https://www.latent.space/p/claude-code',
    },
  ],
  faqs: [
    {
      q: 'Is Claude Code free?',
      a: 'No. As of Nov 2026, Claude’s Free plan does not include Claude Code. The cheapest way in is the Pro plan at $20 a month ($17 a month if paid yearly). You can also use a Claude Console (API) account and pay for what you use.',
    },
    {
      q: 'Do I need to know how to code to use Claude Code?',
      a: 'Not to start. Anthropic’s terminal guide says you can describe what you want in plain English and Claude writes the code. But you will get much better and safer results if you learn to read what it changes, so treat it as a teacher as well as a helper.',
    },
    {
      q: 'Claude Code vs Cursor: which should I use?',
      a: 'Claude Code is an agent you talk to in the terminal, an editor extension, the desktop app or the web. Cursor is a full code editor with AI built in. Many people use both. See the comparison lesson in this path for a fair side-by-side.',
    },
  ],
  related: [
    { label: 'Previous: Your first AI automation in n8n', href: '/learn-ai/n8n-ai-automation' },
    { label: 'Next: Cursor for beginners', href: '/learn-ai/cursor' },
    { label: 'Claude Code vs Cursor vs Codex', href: '/learn-ai/ai-coding-tools-compared' },
    { label: 'What is an AI agent?', href: '/learn-ai/ai-agents' },
    { label: 'AI engineer career guide', href: '/ai-engineer' },
    { label: 'Forward deployed engineer guide', href: '/fde' },
    { label: 'Free AI skills resources', href: '/free-resources#ai-skills' },
  ],
}
