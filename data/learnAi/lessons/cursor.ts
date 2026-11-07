import type { Lesson } from '../types'

export const lesson: Lesson = {
  slug: 'cursor',
  track: 'automate',
  order: 19,
  title: 'Cursor for beginners',
  metaTitle: 'Cursor AI Tutorial for Beginners: Tab, Agent and Rules',
  metaDescription:
    'Learn Cursor, the AI editor built on VS Code: install it, use Tab autocomplete, Agent and Plan Mode, write rules and build a first app. Plans as of Nov 2026.',
  h1: 'Cursor for beginners: your first project in an AI code editor',
  tldr: 'Cursor is a code editor with AI built in, made from the same codebase as VS Code. It predicts your next edit as you type (Tab), and its Agent can plan, write and test whole features from a plain-English request. It has a free plan with limited agent use, and paid plans from $8 a month as of Nov 2026.',
  minutes: 13,
  level: 'Beginner',
  steps: [
    {
      heading: 'What is Cursor?',
      body: [
        'A code editor is the app where programmers write code, a bit like a word processor for code. VS Code from Microsoft is the most common one. Cursor’s docs say "Cursor is based upon the VS Code codebase", so it looks and feels like VS Code, with AI added everywhere.',
        'Where Claude Code started in the terminal, Cursor starts in the editor: you see your files, the AI’s changes and the result side by side. Cursor became part of SpaceX in August 2026 and says it is "keeping the work familiar" for users.',
      ],
      bullets: [
        'Tab: AI autocomplete that predicts your next edit.',
        'Agent: an assistant that can edit files and run commands for you.',
        'Plan Mode: the Agent researches and writes a plan before building.',
        'Rules: saved instructions the Agent follows on every task.',
      ],
    },
    {
      heading: 'Install it and open a project',
      body: [
        'Download Cursor from cursor.com/downloads. There are installers for macOS (.dmg) and Windows (.exe), and apt, dnf or AppImage options for Linux. Open the app and sign in.',
        'If you used VS Code before, you can bring everything across in one click: open Cursor Settings (Ctrl/Cmd + Shift + J), go to General, then Account, and click Import under "VS Code Import". Your extensions, themes, settings and keyboard shortcuts come with you.',
        'Now open a folder (File, then Open Folder). Cursor treats that folder as your project. Start with a small, empty folder for your first try.',
      ],
    },
    {
      heading: 'Tab: autocomplete that guesses your next edit',
      body: [
        'As you type, Cursor shows grey suggested code. It looks at your recent edits, the code around you and any errors, and can suggest several lines, add a missing import or jump to the next place you will probably change.',
        'Press Tab to accept the whole suggestion. Press Esc, or just keep typing, to ignore it. To accept one word at a time, press Cmd + Right Arrow on Mac or Ctrl + Right Arrow on Windows and Linux.',
      ],
      keyIdea: 'Tab is for small edits while you type. The Agent is for whole tasks you describe.',
    },
    {
      heading: 'Agent and Plan Mode: describe the task',
      body: [
        'Open the Agent in the side panel with Cmd + I (Mac) or Ctrl + I (Windows and Linux). It can search your code and the web, read and edit files, run terminal commands and even control a browser to test a change. Before big changes it saves checkpoints, so you can restore files if you don’t like the result.',
        'For anything bigger than a small fix, press Shift + Tab in the Agent box to switch on Plan Mode. Cursor researches the code, asks you clarifying questions, writes a plan and waits for your approval before building. When it finishes, read the diff (the list of changed lines) and ask it to run your tests or build.',
      ],
      example: {
        label: 'First prompts from Cursor’s quickstart',
        code: true,
        text: 'Explain this codebase. Point me to the main entry points, key modules, and anything I should read before making changes.\n\nSuggest three small, safe improvements in this codebase. Explain the tradeoffs and wait for me to choose one.',
      },
      flow: [
        'Describe the task',
        'Plan Mode: questions and plan',
        'You approve',
        'Agent edits and runs checks',
        'You review the diff',
      ],
    },
    {
      heading: 'Rules: teach Cursor your preferences once',
      body: [
        'Models don’t remember past chats, so rules give the Agent the same instructions every time. Project rules live in the .cursor/rules folder as .mdc files and are saved with your code. A simpler option is an AGENTS.md file in the project root, plain Markdown with no settings. User Rules (in Customize, then Rules) apply to all your projects, for example "explain your changes simply, I am learning".',
        'Each project rule can be set to always apply, apply when the Agent thinks it is relevant, apply to matching files, or apply only when you @-mention it.',
      ],
      example: {
        label: 'A rule file: .cursor/rules/basics.mdc',
        code: true,
        text: '---\nalwaysApply: true\n---\n- Use plain HTML, CSS and JavaScript. No frameworks.\n- Explain every change in 2-3 simple sentences.\n- Never delete files without asking first.',
      },
    },
    {
      heading: 'What does Cursor cost?',
      body: [
        'Cursor rebuilt its plans in 2026, so older tutorials that mention Hobby or Pro plans are out of date. As of Nov 2026, Cursor’s pricing page lists: Free ($0, limited agent and chat requests), Plus ($8 a month, Grok models only), Premium ($30 a month, 4x Plus usage, adds third-party models such as Claude or GPT at API list price, plus cloud agents), Super ($100 a month, 15x Plus) and Ultra ($200 a month, 50x Plus). Teams starts at $30 per user a month.',
        'Usage on every plan is a pool shared across Cursor and Grok products, and it refreshes weekly. Check the pricing page before you pay, because this is changing fast.',
      ],
      keyIdea: 'Start on Free. Upgrade only when you hit the limit on real work, not before.',
    },
  ],
  keyTerms: [
    {
      term: 'Code editor (IDE)',
      meaning: 'The app where you write and organise code. VS Code and Cursor are examples.',
    },
    {
      term: 'Tab completion',
      meaning:
        'Cursor’s AI autocomplete. It suggests the next lines as you type and you press Tab to accept.',
    },
    {
      term: 'Agent',
      meaning:
        'Cursor’s assistant that can plan, edit files and run commands to finish a task you describe.',
    },
    {
      term: 'Plan Mode',
      meaning:
        'A mode where the Agent researches, asks questions and writes a plan, then waits for approval before coding.',
    },
    {
      term: 'Rules',
      meaning:
        'Saved instructions (in .cursor/rules or AGENTS.md) that the Agent follows on every task.',
    },
    {
      term: 'Checkpoint',
      meaning:
        'A snapshot the Agent saves before big changes so you can restore your files. Use git for permanent history.',
    },
  ],
  videos: [
    {
      youtubeId: '2aldTxnbNt0',
      title: 'Cursor 2.0 Tutorial for Beginners (Full Course)',
      channel: 'Riley Brown',
      minutes: 151,
      why: 'A long build-along from November 2025. Watch the first 30 minutes for setup, Agent and Tab. Prices and plan names in it are now out of date.',
    },
  ],
  tryIt: {
    title: 'Build a to-do app in Cursor in 10 minutes',
    steps: [
      'Install Cursor, sign in, and open a new empty folder called todo-app.',
      'Open the Agent (Cmd/Ctrl + I), press Shift + Tab for Plan Mode, and type: "Build a to-do list web app in one index.html file. I can add, tick off and delete tasks, and they stay after a refresh. No frameworks."',
      'Answer its questions, read the plan, then approve it. Review the diff before accepting.',
      'Open index.html in your browser and test it. Then type a new CSS comment like /* make the buttons */ in the file and watch Tab suggest the rest.',
      'Ask the Agent: "Explain how this app saves my tasks, for a beginner." Then add a rule from this lesson and ask for one more feature.',
    ],
    link: { label: 'Cursor quickstart', url: 'https://cursor.com/docs/get-started/quickstart' },
  },
  check: [
    {
      q: 'You are typing code and Cursor shows a grey suggestion. How do you accept all of it?',
      options: ['Press Enter twice', 'Press Tab', 'Press Esc', 'Right-click and choose Paste'],
      answer: 1,
      why: 'Tab accepts the full suggestion. Esc dismisses it, and Cmd/Ctrl + Right Arrow accepts one word at a time.',
    },
    {
      q: 'You want the Agent to ask questions and write a plan before changing anything. What do you turn on?',
      options: [
        'Plan Mode (Shift + Tab in the Agent box)',
        'Tab completion',
        'VS Code Import',
        'A User Rule that says "be careful"',
      ],
      answer: 0,
      why: 'Plan Mode researches the code, asks clarifying questions, writes a plan and waits for your approval before building.',
    },
    {
      q: 'Where do Cursor project rules live?',
      options: [
        'In your browser’s cookies',
        'In the .cursor/rules folder as .mdc files',
        'Only on Cursor’s servers',
        'Inside package.json',
      ],
      answer: 1,
      why: 'Project rules are .mdc files in .cursor/rules, saved with your code. AGENTS.md in the project root is a simpler alternative.',
    },
  ],
  fromTheSource: [
    {
      who: 'Michael Truell, Sualeh Asif, Arvid Lunnemark and Aman Sanger',
      role: 'Cursor’s founding team.',
      work: 'Lex Fridman Podcast #447 with the Cursor team (October 2024)',
      url: 'https://lexfridman.com/cursor-team-transcript/',
      idea: 'The founders expected AI models to keep getting better, which would change how software is written. A plug-in for an existing editor felt too limiting, so they built their own editor from the VS Code codebase. For Tab, Aman Sanger described the goal as "eliminate all the low entropy actions you take inside of the editor."',
      breakdown: [
        'Low entropy means predictable. Once your intent is clear, many of your next keystrokes are obvious, and the editor should type them for you.',
        'So Tab predicts your next whole change, and where in the file you will edit next, not just the next few characters.',
        'To feel instant, Tab uses a small, fast model with tricks like caching, rather than the biggest model available.',
        'They expect the human role to shift toward checking AI changes. As Sualeh Asif put it, "I don’t want to spend all my time reviewing code," so reviewing has to get easier too.',
      ],
      use: 'Let Tab handle the obvious edits, and save your own attention for decisions and for reading diffs. If you find yourself making the same small change in many places, make the first one and press Tab through the rest.',
    },
    {
      who: 'Jacob Jackson, Phillip Kravtsov and Shomil Jain (Cursor)',
      role: 'Cursor researchers who wrote up how the Tab model is trained.',
      work: 'Improving Cursor Tab with online RL (Cursor blog, September 2025)',
      url: 'https://cursor.com/blog/tab-rl',
      idea: 'A wrong suggestion is a distraction, so Tab has to learn when to stay quiet as well as what to suggest. Cursor trained it with reinforcement learning on real use: accepted suggestions are rewarded, rejected ones are penalised, and showing nothing scores zero.',
      breakdown: [
        'Reinforcement learning means learning from rewards and penalties, like a game score, instead of from an answer key.',
        'Online means the model learns from fresh data. Cursor ships a new version to users, collects what they accept or reject, and trains again, about every 1.5 to 2 hours.',
        'The result: 21% fewer suggestions, with a 28% higher accept rate. The Tab model handles over 400 million requests a day.',
      ],
      use: 'Whether people accept or reject suggestions is the signal Tab learns from, and quiet moments are on purpose. Read each suggestion before you press Tab, and if it is wrong, just keep typing.',
    },
  ],
  sources: [
    { label: 'Cursor docs: Home', url: 'https://cursor.com/docs' },
    { label: 'Cursor docs: Quickstart', url: 'https://cursor.com/docs/get-started/quickstart' },
    { label: 'Cursor docs: Tab', url: 'https://cursor.com/docs/tab/overview' },
    { label: 'Cursor docs: Agent overview', url: 'https://cursor.com/docs/agent/overview' },
    { label: 'Cursor docs: Rules', url: 'https://cursor.com/docs/rules' },
    {
      label: 'Cursor docs: Migrate from VS Code',
      url: 'https://cursor.com/docs/configuration/migrations/vscode',
    },
    { label: 'Cursor pricing', url: 'https://cursor.com/pricing' },
    { label: 'Cursor blog: Joining SpaceX', url: 'https://cursor.com/blog/joining-spacex' },
    { label: 'Learn Cursor (official course)', url: 'https://cursor.com/learn' },
    {
      label: 'Lex Fridman Podcast #447: Cursor team (transcript)',
      url: 'https://lexfridman.com/cursor-team-transcript/',
    },
    {
      label: 'Cursor blog: Improving Cursor Tab with online RL (Sept 2025)',
      url: 'https://cursor.com/blog/tab-rl',
    },
  ],
  faqs: [
    {
      q: 'Is Cursor free?',
      a: 'Yes, there is a Free plan with limited agent and chat requests. As of Nov 2026, paid plans are Plus ($8 a month, Grok models only), Premium ($30), Super ($100) and Ultra ($200). Third-party models like Claude and GPT start on Premium and are charged at API list price.',
    },
    {
      q: 'What is the difference between Cursor and VS Code?',
      a: 'Cursor is built on the VS Code codebase, so the layout, extensions and shortcuts feel the same. The difference is that Cursor builds AI into the editor: Tab predictions, an Agent that edits and runs code, Plan Mode and rules. You can import your VS Code setup in one click.',
    },
    {
      q: 'Can I use Claude or GPT models in Cursor?',
      a: 'As of Nov 2026, Cursor’s pricing page says the Plus plan includes only Grok models. Third-party models, such as Claude and GPT, are available from the Premium plan up and are billed at API list price.',
    },
  ],
  related: [
    { label: 'Previous: Claude Code for beginners', href: '/learn-ai/claude-code' },
    { label: 'Next: OpenAI Codex for beginners', href: '/learn-ai/openai-codex' },
    { label: 'Claude Code vs Cursor vs Codex', href: '/learn-ai/ai-coding-tools-compared' },
    { label: 'Prompting techniques that work', href: '/learn-ai/prompt-engineering' },
    { label: 'AI engineer career guide', href: '/ai-engineer' },
    { label: 'Free AI skills resources', href: '/free-resources#ai-skills' },
  ],
}
