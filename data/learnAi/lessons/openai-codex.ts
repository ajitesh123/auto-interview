import type { Lesson } from '../types'

export const lesson: Lesson = {
  slug: 'openai-codex',
  track: 'automate',
  order: 20,
  title: 'OpenAI Codex for beginners',
  metaTitle: 'OpenAI Codex Tutorial for Beginners: App, CLI and Cloud',
  metaDescription:
    'What OpenAI Codex is in 2026: a coding agent in ChatGPT, a desktop app, an IDE extension and a CLI. How to start, your first task, what it does well, and plans.',
  h1: 'OpenAI Codex for beginners: what it is and how to start',
  tldr: 'Codex is OpenAI’s coding agent. You give it a task in plain English, and it reads your code, makes changes, runs commands and shows you the result to review. It runs inside ChatGPT, as a desktop app, in code editors like VS Code and in the terminal, all signed in with your ChatGPT account.',
  minutes: 12,
  level: 'Beginner',
  steps: [
    {
      heading: 'Which "Codex" is this?',
      body: [
        'The name Codex was first used in 2021 for an older OpenAI code model. Today, Codex means OpenAI’s coding agent: "the same powerful coding agent, now in ChatGPT", as OpenAI’s Codex page puts it. If a tutorial talks about the 2021 model, it is about something else.',
        'Like Claude Code and Cursor’s Agent, Codex is an agent. It doesn’t just suggest code. It works through a task step by step: read the project, plan, edit files, run the tests, and hand you the changes to review.',
      ],
      bullets: [
        'Codex in ChatGPT: start tasks from the ChatGPT app or chatgpt.com/codex, including in the cloud.',
        'Codex app: a desktop "command center" for running several agents at once.',
        'IDE extension: inside VS Code, Cursor or Windsurf.',
        'Codex CLI: in your terminal. It is open source (Apache-2.0) on GitHub.',
      ],
      keyIdea: 'One agent, many doors. All of them use the same ChatGPT login.',
    },
    {
      heading: 'How does it work on a task?',
      body: [
        'You describe a task. Codex reads the relevant files, makes a plan, edits code and runs commands such as tests. On your own computer it works in your project folder. In the cloud it works in its own copy of your code, so you can close your laptop while it runs.',
        'Codex can run several agents in parallel, each in its own git worktree (a separate working copy of the same project), so their changes don’t clash. You can also teach it your team’s way of working with Skills, schedule background jobs, and ask it to review pull requests.',
      ],
      flow: [
        'You describe the task',
        'Codex reads and plans',
        'Edits and runs tests',
        'You review the changes',
        'You merge or ask for fixes',
      ],
    },
    {
      heading: 'Get started: app, ChatGPT or CLI',
      body: [
        'The easiest start is the Codex app or Codex inside ChatGPT. Log in with your ChatGPT account, connect a project (a folder on your computer, or a GitHub repository for cloud tasks) and type a task.',
        'If you like the terminal (a text window where you type commands), install the Codex CLI. Then go into your project folder, run codex, and choose "Sign in with ChatGPT". You can use an OpenAI API key instead, but that needs extra setup.',
      ],
      example: {
        label: 'Codex CLI install commands (from the official GitHub README)',
        code: true,
        text: '# macOS or Linux\ncurl -fsSL https://chatgpt.com/codex/install.sh | sh\n\n# Windows PowerShell\npowershell -ExecutionPolicy ByPass -c "irm https://chatgpt.com/codex/install.ps1 | iex"\n\n# Or with npm or Homebrew\nnpm install -g @openai/codex\nbrew install --cask codex\n\n# Then, inside your project folder\ncodex',
      },
    },
    {
      heading: 'Your first task, and a file of instructions',
      body: [
        'Start with questions so you learn the project, then give one small, clear task. Say what "done" means, and ask Codex to run the tests or check its work. Small tasks with a clear finish line are where coding agents do best.',
        'Codex reads instructions from an AGENTS.md file in your project, the same idea as CLAUDE.md for Claude Code and rules in Cursor. Put how to run and test the project, and any rules, in a few short lines.',
      ],
      example: {
        label: 'Three good first prompts',
        code: true,
        text: 'Explain what this project does and how its folders fit together. Don’t change anything yet.\n\nAdd a "clear all" button to the to-do list in index.html. Keep the current style. Tell me how you tested it.\n\nWrite an AGENTS.md with how to run this project and our rule: no new libraries without asking.',
      },
    },
    {
      heading: 'What is Codex good at, and where should you be careful?',
      body: [
        'OpenAI pitches Codex for real engineering work: building features, large refactors and migrations, code review, and background jobs like watching CI (the automatic tests that run when code changes). In practice, agents shine on tasks that are well defined and can be checked by tests.',
        'Be careful with vague asks ("make it better"), code you cannot test, and anything touching passwords, payments or live data. Read every change before you merge it. Codex makes mistakes like every AI tool, and you own the code it writes.',
      ],
      keyIdea: 'Small, clear, testable tasks in. Reviewed changes out.',
    },
    {
      heading: 'Which plans include Codex?',
      body: [
        'Codex runs on your ChatGPT account. As of Nov 2026, ChatGPT’s pricing page lists "Limited Codex access" on the Free plan, limited use on Go, "Expanded Codex usage" on Plus, and more on Pro. The official Codex README lists Plus, Pro, Business, Edu and Enterprise as plans you can sign in with. OpenAI’s help centre lists ChatGPT Plus at $20 a month.',
        'The official pages we checked did not show the other prices, so look at chatgpt.com/pricing for Pro, Business and the pay-as-you-go Codex option for teams before you buy. Limits change often, so check them on the day you sign up.',
      ],
    },
  ],
  keyTerms: [
    {
      term: 'Codex',
      meaning:
        'OpenAI’s coding agent, available in ChatGPT, as a desktop app, as an IDE extension and as a CLI.',
    },
    {
      term: 'Codex CLI',
      meaning:
        'The open-source terminal version of Codex. You start it by typing codex in a project folder.',
    },
    {
      term: 'Cloud task',
      meaning:
        'A task Codex runs on OpenAI’s computers using a copy of your repository, so it keeps going while you do other things.',
    },
    {
      term: 'Worktree',
      meaning:
        'A separate working copy of the same git project, so parallel agents don’t overwrite each other’s changes.',
    },
    {
      term: 'AGENTS.md',
      meaning:
        'A Markdown file of project instructions that Codex (and several other coding tools) read before working.',
    },
  ],
  videos: [
    {
      youtubeId: 'HFM3se4lNiw',
      title: 'Introducing the Codex app',
      channel: 'OpenAI',
      minutes: 4,
      why: 'OpenAI’s own short tour of the desktop app: parallel agents in worktrees, skills and automations. Watch it to see what the app looks like before you install it.',
    },
  ],
  tryIt: {
    title: 'Build a tip calculator with Codex',
    steps: [
      'Open Codex in ChatGPT or the Codex app, or install the CLI and run codex in a new empty folder called tip-calc.',
      'Ask: "Create a tip calculator web page in one index.html file. Inputs: bill amount, tip percent, number of people. Show the amount each person pays. Indian rupees by default."',
      'Read the changes it proposes, accept them, and open index.html in your browser to test it with a bill of 1,250 rupees, 10 percent tip and 4 people (it should show 343.75 each).',
      'Ask: "Add a simple test for the calculation and run it. Tell me what you ran."',
      'Ask: "Explain the code to a beginner in five short points."',
    ],
    link: { label: 'Open Codex', url: 'https://chatgpt.com/codex' },
  },
  check: [
    {
      q: 'What does "Codex" mean in 2026?',
      options: [
        'Only the 2021 code model behind early GitHub Copilot',
        'OpenAI’s coding agent, used in ChatGPT, a desktop app, editors and the terminal',
        'A website builder for non-coders',
        'A programming language from OpenAI',
      ],
      answer: 1,
      why: 'Today Codex is OpenAI’s coding agent. The 2021 model with the same name is a different, older thing.',
    },
    {
      q: 'Why does Codex use separate worktrees when it runs agents in parallel?',
      options: [
        'To make the code run faster',
        'So each agent has its own working copy and their changes don’t clash',
        'Because the internet is required',
        'To hide the changes from you',
      ],
      answer: 1,
      why: 'A worktree is a separate working copy of the same project. Parallel agents can each work in one without overwriting each other.',
    },
    {
      q: 'Which task is Codex most likely to do well?',
      options: [
        '"Make the app better"',
        '"Add a clear-all button to index.html, keep the style, and run the tests"',
        '"Guess what my users want"',
        '"Move money between bank accounts for me"',
      ],
      answer: 1,
      why: 'Coding agents do best with small, specific tasks that have a clear finish line and a way to check the result.',
    },
  ],
  fromTheSource: [
    {
      who: 'Mark Chen, Jerry Tworek, Heewoo Jun and 55 co-authors (OpenAI)',
      role: 'The OpenAI team behind the original 2021 Codex model, which powered the first GitHub Copilot.',
      work: 'Evaluating Large Language Models Trained on Code (paper, 2021)',
      url: 'https://arxiv.org/abs/2107.03374',
      idea: 'They trained a GPT model on public code and tested it with HumanEval, a new set of programming problems checked by running tests. Codex solved 28.8% of the problems, where GPT-3 solved none, and 70.2% when it could try 100 times per problem.',
      breakdown: [
        'HumanEval judges code by running it against tests, not by how it looks. That idea, "does it pass?", is still how coding models are measured.',
        'Trying many times helped a lot. Generating several answers and keeping one that passes the tests beat a single attempt.',
        'The paper noted weak spots: long chains of steps in one instruction, and keeping track of which variable is which.',
        'A separate production version of this model powered GitHub Copilot.',
      ],
      use: 'This is why you should give today’s Codex tests to run. An agent that can run tests can try, check and try again, the same idea that made the 2021 model so much stronger when it had more attempts.',
    },
    {
      who: 'OpenAI',
      role: 'The company that makes ChatGPT and the Codex coding agent.',
      work: 'Introducing Codex (OpenAI announcement, May 2025)',
      url: 'https://openai.com/index/introducing-codex/',
      idea: 'The 2025 Codex is a cloud software engineering agent that can work on many tasks at once. OpenAI says "each task is processed independently in a separate, isolated environment preloaded with your codebase," and Codex shows terminal logs and test results as evidence of what it did.',
      breakdown: [
        'At launch it ran on codex-1, a version of OpenAI o3 tuned for software engineering.',
        'Isolated environment means a separate copy of your project in the cloud, so one task cannot break another or your own computer.',
        'Citations of logs and test outputs let you check its work instead of taking its word for it.',
        'AGENTS.md files, like a README for the agent, tell it how to find its way around, which tests to run and which conventions to follow.',
      ],
      use: 'When Codex finishes a task, open the logs and test results before you read its summary. If there are no tests, ask it to write and run some first.',
    },
  ],
  sources: [
    { label: 'OpenAI: Codex', url: 'https://openai.com/codex/' },
    {
      label: 'OpenAI: Introducing Codex (May 2025)',
      url: 'https://openai.com/index/introducing-codex/',
    },
    {
      label: 'Chen et al. (2021), Evaluating Large Language Models Trained on Code',
      url: 'https://arxiv.org/abs/2107.03374',
    },
    { label: 'ChatGPT: Codex', url: 'https://chatgpt.com/codex' },
    { label: 'ChatGPT pricing', url: 'https://chatgpt.com/pricing/' },
    { label: 'openai/codex on GitHub (README)', url: 'https://github.com/openai/codex' },
    {
      label: 'openai/codex docs: install',
      url: 'https://github.com/openai/codex/blob/main/docs/install.md',
    },
    {
      label: 'openai/codex docs: AGENTS.md',
      url: 'https://github.com/openai/codex/blob/main/docs/agents_md.md',
    },
    {
      label: 'OpenAI Help Center: What is ChatGPT Plus?',
      url: 'https://help.openai.com/en/articles/6950777-what-is-chatgpt-plus',
    },
    {
      label: 'OpenAI for developers: Learn (Codex videos)',
      url: 'https://developers.openai.com/learn',
    },
  ],
  faqs: [
    {
      q: 'Is OpenAI Codex free?',
      a: 'Partly. As of Nov 2026, ChatGPT’s pricing page lists "Limited Codex access" on the Free plan, and more usage on paid plans such as Plus ($20 a month) and Pro. The Codex CLI itself is free, open-source software, but it needs a ChatGPT plan or an API key to do any work.',
    },
    {
      q: 'Is Codex the same as ChatGPT?',
      a: 'No, but they are connected. ChatGPT is the general assistant. Codex is the coding agent that lives inside ChatGPT and also comes as a desktop app, an editor extension and a CLI. One ChatGPT login works for all of them.',
    },
    {
      q: 'Codex vs Claude Code: what is the difference?',
      a: 'Both are coding agents that read your project, edit files and run commands, and both work in the terminal, editors, desktop apps and the cloud. Codex uses OpenAI models and your ChatGPT plan. Claude Code uses Anthropic’s Claude models and a Claude plan. The comparison lesson in this path covers how to choose.',
    },
  ],
  related: [
    { label: 'Previous: Cursor for beginners', href: '/learn-ai/cursor' },
    { label: 'Next: Claude Code vs Cursor vs Codex', href: '/learn-ai/ai-coding-tools-compared' },
    { label: 'Claude Code for beginners', href: '/learn-ai/claude-code' },
    { label: 'What is an AI agent?', href: '/learn-ai/ai-agents' },
    { label: 'AI engineer career guide', href: '/ai-engineer' },
    { label: 'Free AI skills resources', href: '/free-resources#ai-skills' },
  ],
}
