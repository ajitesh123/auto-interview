import type { Lesson } from '../types'

export const lesson: Lesson = {
  slug: 'ai-coding-tools-compared',
  track: 'automate',
  order: 21,
  title: 'Claude Code vs Cursor vs Codex',
  metaTitle: 'Claude Code vs Cursor vs Codex: Which to Use (Nov 2026)',
  metaDescription:
    'Claude Code vs Cursor vs OpenAI Codex, plus GitHub Copilot and app builders like Lovable: who each is for, how they work, Nov 2026 prices, and how to pick.',
  h1: 'Claude Code vs Cursor vs Codex: which AI coding tool should you use?',
  tldr: 'All three are coding agents that can read your project, edit files and run commands. The real differences are where you work (terminal, editor or app), which models you get, and which subscription you already have. Claude Code suits Claude subscribers, Cursor suits people who want an AI editor, and Codex suits ChatGPT subscribers. Non-coders who just want an app can start with a browser app builder.',
  minutes: 12,
  level: 'Beginner',
  steps: [
    {
      heading: 'First, the three shapes of AI coding tools',
      body: [
        'AI coding tools come in three shapes. Editors put AI inside the app where you write code: Cursor, or VS Code with GitHub Copilot. Agents take a task and work through it on their own, in a terminal, editor panel, desktop app or the cloud: Claude Code, Codex, and Cursor’s Agent. App builders like Lovable and Bolt run in the browser, so you describe an app and get a working one without opening any code.',
        'The lines are blurring. Claude Code now has editor extensions and a desktop app, Codex lives in ChatGPT and in editors, and Cursor has cloud agents. So pick by how you like to work, not by labels.',
      ],
      flow: [
        'App builder: describe, get an app',
        'AI editor: you code, AI helps',
        'Coding agent: you assign, AI codes, you review',
      ],
    },
    {
      heading: 'The big three, side by side',
      body: [
        'Claude Code (Anthropic) started in the terminal and now also runs in VS Code, JetBrains, a desktop app and the web. It uses Claude models. It needs a paid Claude plan: Pro is $20 a month, Max $100, Ultra $200, or pay per use through the API (as of Nov 2026). Instructions go in CLAUDE.md.',
        'Cursor is a full code editor built on VS Code, with Tab autocomplete, an Agent, Plan Mode and cloud agents. Plans as of Nov 2026: Free, Plus $8 (Grok models only), Premium $30 (adds Claude, GPT and other third-party models at API list price), Super $100 and Ultra $200. Instructions go in .cursor/rules or AGENTS.md.',
        'Codex (OpenAI) is a coding agent inside ChatGPT, plus a desktop app, an editor extension and an open-source CLI. It uses OpenAI models and your ChatGPT login. ChatGPT Free lists limited Codex access, and Plus ($20 a month) gives more. Instructions go in AGENTS.md.',
      ],
      visual: {
        kind: 'compare',
        label: 'Makers’ pages · 4 tools',
        title: 'The tools differ mostly in where you work and which login you need',
        corner: 'As of Nov 2026',
        columns: [
          {
            name: 'Claude Code',
            sub: 'Anthropic',
            href: 'https://code.claude.com/docs/en/overview',
          },
          { name: 'Cursor', sub: 'Anysphere', href: 'https://cursor.com/docs' },
          { name: 'Codex', sub: 'OpenAI', href: 'https://openai.com/codex/' },
          {
            name: 'GitHub Copilot',
            sub: 'GitHub',
            href: 'https://github.com/features/copilot/plans',
          },
        ],
        rows: [
          {
            label: 'Where you work',
            cells: [
              'Terminal, VS Code, JetBrains, desktop app, web',
              'Its own editor (built on VS Code), plus cloud agents',
              'ChatGPT, desktop app, editor extension, open-source CLI',
              'Inside VS Code and other editors; a coding agent on paid plans',
            ],
          },
          {
            label: 'Models',
            cells: [
              'Claude models',
              'Grok on Plus; Claude, GPT and others on Premium and up',
              'OpenAI models',
              'Several makers’ models (see GitHub)',
            ],
          },
          {
            label: 'Cheapest way in',
            cells: [
              'Claude Pro, $20 a month billed monthly',
              'Free plan',
              'ChatGPT Free (limited Codex)',
              'Copilot Free (2,000 completions a month)',
            ],
          },
          {
            label: 'Instruction file',
            cells: [
              'CLAUDE.md (reads AGENTS.md too)',
              '.cursor/rules or AGENTS.md',
              'AGENTS.md',
              'See GitHub docs',
            ],
          },
        ],
        note: 'For Copilot’s models and instruction files, see GitHub’s plans page and docs; we have not re-checked them for this table. Prices change often: open the pricing page on the day you buy.',
        source: [
          { label: 'Claude plans and pricing', url: 'https://claude.com/pricing' },
          { label: 'Claude Code docs', url: 'https://code.claude.com/docs/en/overview' },
          { label: 'Cursor pricing', url: 'https://cursor.com/pricing' },
          { label: 'OpenAI: Codex', url: 'https://openai.com/codex/' },
          { label: 'GitHub Copilot plans', url: 'https://github.com/features/copilot/plans' },
        ],
        updated: 'Nov 2026',
      },
      bullets: [
        'Pick Claude Code if you already pay for Claude, or like working in the terminal with any editor.',
        'Pick Cursor if you want to see and edit code in one AI-first editor.',
        'Pick Codex if you already pay for ChatGPT, or want cloud tasks running while you do other things.',
      ],
    },
    {
      heading: 'GitHub Copilot and the app builders',
      body: [
        'GitHub Copilot works inside VS Code and other editors you may already use. As of Nov 2026, Copilot Free gives 2,000 code completions a month, Pro is $10 a month, Pro+ $39 and Max $100, and paid plans include the Copilot coding agent. Verified students can get the Copilot Student plan through GitHub Education, which makes it a strong first pick for students.',
        'Lovable and Bolt are browser app builders for non-coders: you chat, and they build and host a web app. They are great for a quick prototype or a portfolio demo. We could not verify their current prices, so check lovable.dev/pricing and bolt.new/pricing. When your app grows, you will want to understand the code, and that is where the tools above help.',
      ],
    },
    {
      heading: 'A simple decision guide',
      body: [
        'You don’t need the "best" tool. You need one you will use every day. Start with what you already pay for, try the free tiers, and give one tool a full week before switching.',
      ],
      bullets: [
        'Never coded, want a quick app: try an app builder, or Claude Code’s desktop app or the Codex app, which need no terminal.',
        'Learning to code: Cursor or VS Code with Copilot, so you see every line. Students should check the free Copilot Student plan.',
        'Already pay for ChatGPT Plus: start with Codex. Already pay for Claude Pro: start with Claude Code.',
        'Smallest budget: Copilot Free, Cursor Free and ChatGPT Free (limited Codex) cost nothing to try.',
        'Working in a team: use the tool your team uses, and share one instruction file (AGENTS.md works in Codex, Cursor and Claude Code).',
      ],
      keyIdea:
        'The habits matter more than the tool: small clear tasks, a test to check, and a careful review of every change.',
    },
    {
      heading: 'One task, start to finish, in any of these tools',
      body: [
        'The fastest way to choose is to watch a tool do one small, checkable job. This is the same loop in Claude Code, Cursor’s Agent, Codex or Copilot’s agent: ask for a plan, let it build, test with numbers you worked out yourself, and review the change.',
        'The test is the part beginners skip. Work out the right answer before the AI runs, so you can tell a working app from one that only looks finished.',
      ],
      workflow: {
        title: 'An expense splitter in one file',
        input:
          'An empty folder and one sentence: “Three friends paid different amounts for a trip; show who owes whom.”',
        steps: [
          {
            title: 'Ask for a plan before any code',
            detail:
              'Plan mode (Claude Code, Cursor) or a “plan first” line in the prompt makes the agent say what it will build. Fix the plan, not the code.',
            code: `Build an expense splitter in one
index.html file. I enter names and
amounts paid; it shows who owes whom.
First list your plan and how you will
test it. Wait for my OK.`,
          },
          {
            title: 'Work out the right answer yourself',
            detail:
              'A paid 900, B paid 300, C paid 0. Total 1,200, so each share is 400. A is owed 500, B owes 100, C owes 400.',
          },
          {
            title: 'Let it build, then test with your numbers',
            detail:
              'Open index.html in a browser and type the three amounts. The app must say C pays A 400 and B pays A 100. Anything else is a bug, however polished the page looks.',
          },
          {
            title: 'Review the change and ask for one fix at a time',
            detail:
              'Read the diff the tool shows. If something is wrong, describe the input, what you expected and what you got. Then save a commit or checkpoint.',
            code: `With A=900, B=300, C=0 the app says
B pays A 300. Expected: B pays A 100,
C pays A 400. Fix only the settle-up
logic and explain the change.`,
          },
        ],
        output:
          'A one-file app that passes your test (C pays A 400, B pays A 100), a diff you have read, and a saved version you can roll back to.',
      },
      keyIdea: 'Decide the right answer before the AI runs. That is your test.',
    },
    {
      heading: 'What we could not verify, and what changes fast',
      body: [
        'We took every price and feature here from each company’s official pages in Nov 2026. We did not run our own head-to-head tests, so we don’t claim one tool writes better code. Model rankings change every few months, and any single test result is a snapshot.',
        'Prices and limits change often too. Cursor rebuilt its whole plan line-up in 2026, and "usage" means different things on each service (weekly pools, five-hour windows, credits). Before paying, open the pricing page on the day you buy.',
      ],
      keyIdea: 'Try two tools on the same small task and keep the one you understand better.',
    },
  ],
  keyTerms: [
    {
      term: 'Coding agent',
      meaning:
        'An AI that takes a task, reads and edits files, and runs commands in a loop until the task is done.',
    },
    {
      term: 'AI code editor',
      meaning: 'A code editor with AI built in, like Cursor, or VS Code with Copilot.',
    },
    {
      term: 'App builder',
      meaning:
        'A browser tool like Lovable or Bolt where you describe an app in chat and it builds and hosts it.',
    },
    {
      term: 'AGENTS.md',
      meaning:
        'A shared Markdown instruction file that Codex, Cursor and Claude Code can all read.',
    },
    {
      term: 'Usage limit',
      meaning:
        'How much AI work a plan includes before you wait for a reset or pay more. Each company measures it differently.',
    },
  ],
  videos: [
    {
      youtubeId: 'JMYspR42HFM',
      title: 'Claude Code vs Codex vs Cursor (an honest comparison)',
      channel: 'Theo - t3․gg',
      minutes: 38,
      why: 'One experienced developer’s strong opinions after using all three daily. Recorded in May 2026, before Cursor’s plan changes, so use it for workflow ideas, not prices.',
    },
  ],
  tryIt: {
    title: 'Run the same task in two tools',
    steps: [
      'Pick two tools you can use for free or already pay for, for example Cursor Free and Codex in ChatGPT, or Copilot Free and Claude Code.',
      'Make two empty folders, one per tool.',
      'Give both the same prompt: "Build an expense splitter in one index.html file. I enter names and amounts paid, and it shows who owes whom. Explain how you tested it."',
      'Test both in your browser with three people: A paid 900, B paid 300, C paid 0. Each should owe 400, so C pays A 400 and B pays A 100.',
      'Note which one was easier to follow and review. That is your tool for now.',
    ],
    link: {
      label: 'GitHub Copilot plans (includes the free tier)',
      url: 'https://github.com/features/copilot/plans',
    },
  },
  check: [
    {
      q: 'You already pay for ChatGPT Plus and want a coding agent. Which is the most natural first try?',
      options: ['Codex', 'Claude Code', 'Cursor Ultra', 'Nothing, ChatGPT Plus cannot code'],
      answer: 0,
      why: 'Codex runs on your ChatGPT login, and Plus includes expanded Codex usage, so you can start without a new subscription.',
    },
    {
      q: 'A student wants to learn coding and see every line the AI writes, on a small budget. What fits best?',
      options: [
        'Only a browser app builder, never looking at code',
        'VS Code with GitHub Copilot (check the free Student plan) or Cursor Free',
        'The most expensive plan of any tool',
        'Waiting until tools stop changing',
      ],
      answer: 1,
      why: 'Editors keep the code in front of you, which is how you learn. Copilot Student and Cursor Free cost nothing to try.',
    },
    {
      q: 'Which statement is fair?',
      options: [
        'One of these tools always writes better code than the others',
        'Prices and limits are fixed for years',
        'All three are coding agents, and the main differences are where you work, the models and the plan',
        'You never need to review AI-written code',
      ],
      answer: 2,
      why: 'All three can read, edit and run code. Quality changes with each model release, and prices change often, so review every change and recheck prices.',
    },
  ],
  fromTheSource: [
    {
      who: 'Andrej Karpathy',
      role: 'Founding member of OpenAI and former director of AI at Tesla, where he saw neural networks replace hand-written code in Autopilot.',
      work: 'Software Is Changing (Again), keynote at Y Combinator’s AI Startup School (June 2025)',
      url: 'https://www.youtube.com/watch?v=LCEmiRjPEtQ',
      idea: 'Karpathy calls LLMs a new kind of computer that you program in English, which he names Software 3.0. His advice is to build "partial autonomy" tools, where people choose how much to hand to the AI, rather than flashy fully automatic agents. In his words, "less Iron Man robots and more Iron Man suits."',
      breakdown: [
        'Software 1.0 is code people write. Software 2.0 is the learned weights of a neural network. Software 3.0 is prompts in plain language that program an LLM.',
        'The autonomy slider: in Cursor, for example, you can go from Tab completion, to editing a selected chunk, to letting the agent change the whole project. You decide how far to slide.',
        'The AI generates and the human verifies, so the faster you can check its work (clear diffs, screenshots, tests), the faster you go.',
        'Keep the AI on a leash: he works in small chunks, because a huge AI change is slow to check and can hide bugs.',
      ],
      use: 'Judge each tool by two questions: how easily can I slide between small help and big tasks, and how quickly can I check what it did? Whichever tool you choose, keep tasks small enough that you can review every change.',
    },
  ],
  sources: [
    { label: 'Claude Code docs: Overview', url: 'https://code.claude.com/docs/en/overview' },
    { label: 'Claude plans and pricing', url: 'https://claude.com/pricing' },
    {
      label: 'Claude Code docs: CLAUDE.md and AGENTS.md',
      url: 'https://code.claude.com/docs/en/memory',
    },
    { label: 'Cursor docs', url: 'https://cursor.com/docs' },
    { label: 'Cursor pricing', url: 'https://cursor.com/pricing' },
    { label: 'Cursor docs: Rules and AGENTS.md', url: 'https://cursor.com/docs/rules' },
    { label: 'OpenAI: Codex', url: 'https://openai.com/codex/' },
    { label: 'ChatGPT: Codex', url: 'https://chatgpt.com/codex' },
    { label: 'ChatGPT pricing', url: 'https://chatgpt.com/pricing/' },
    { label: 'openai/codex on GitHub (README)', url: 'https://github.com/openai/codex' },
    {
      label: 'OpenAI Help Center: What is ChatGPT Plus?',
      url: 'https://help.openai.com/en/articles/6950777-what-is-chatgpt-plus',
    },
    { label: 'GitHub Copilot plans', url: 'https://github.com/features/copilot/plans' },
    {
      label: 'Y Combinator: Andrej Karpathy, Software Is Changing (Again) (YouTube, June 2025)',
      url: 'https://www.youtube.com/watch?v=LCEmiRjPEtQ',
    },
  ],
  faqs: [
    {
      q: 'Which AI coding tool is best for beginners?',
      a: 'The one that fits what you already have. If you pay for ChatGPT, try Codex. If you pay for Claude, try Claude Code. If you want to learn to code, an editor like Cursor or VS Code with Copilot keeps the code in front of you. If you never want to see code, start with an app builder.',
    },
    {
      q: 'Is Cursor better than Claude Code?',
      a: 'Neither is better for everyone. Cursor is a full AI code editor; Claude Code is an agent you use from the terminal, your editor, a desktop app or the web. You can even use both, because Claude Code has an extension that installs in Cursor. Try both on the same small task.',
    },
    {
      q: 'Is GitHub Copilot free for students?',
      a: 'GitHub’s plans page says verified students can access the GitHub Copilot Student plan through GitHub Education. Anyone can also use Copilot Free, which includes 2,000 code completions a month as of Nov 2026.',
    },
  ],
  related: [
    { label: 'Previous: OpenAI Codex for beginners', href: '/learn-ai/openai-codex' },
    { label: 'Next: Prompting vs RAG vs fine-tuning', href: '/learn-ai/fine-tuning-vs-rag' },
    { label: 'Claude Code for beginners', href: '/learn-ai/claude-code' },
    { label: 'Cursor for beginners', href: '/learn-ai/cursor' },
    { label: 'AI engineer career guide', href: '/ai-engineer' },
    { label: 'Forward deployed engineer guide', href: '/fde' },
    { label: 'Free AI skills resources', href: '/free-resources#ai-skills' },
  ],
}
