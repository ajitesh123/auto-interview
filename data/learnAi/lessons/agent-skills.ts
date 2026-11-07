import type { Lesson } from '../types'

export const lesson: Lesson = {
  slug: 'agent-skills',
  track: 'build',
  order: 0,
  title: 'What are Agent Skills?',
  metaTitle: 'What Are Agent Skills? SKILL.md Explained Simply',
  metaDescription:
    'What are Agent Skills? Folders with a SKILL.md file that AI agents load only when needed. How they work, skills vs MCP vs prompts, and how to write your own.',
  h1: 'What are Agent Skills? SKILL.md explained for beginners',
  tldr: 'An Agent Skill is a folder with a SKILL.md file inside: a name, a one-line description of when to use it, and step-by-step instructions, plus optional scripts and reference files. The agent sees only the name and description until a task matches, then reads the rest. Anthropic introduced Skills in October 2025 and published the format as an open standard (agentskills.io) in December 2025; Cursor, Gemini CLI, GitHub Copilot in VS Code and OpenAI Codex use it too.',
  minutes: 12,
  level: 'Beginner',
  steps: [
    {
      heading: 'What problem do skills solve?',
      body: [
        'A general AI agent is smart but does not know your way of doing things: your report format, your company’s brand rules, the exact steps to fill a tricky form. You could paste those instructions into every chat, but that is tiring, and long instructions crowd the model’s context window (its working memory).',
        'On 16 October 2025, Anthropic introduced Agent Skills. Its engineering team compares a skill to an onboarding guide for a new hire: a packet of instructions, scripts and resources that an agent can find and load when a task needs it. You write the guide once, and the agent opens it only when it is relevant.',
      ],
      keyIdea:
        'A skill teaches an agent how to do one kind of task, and it is loaded only when that task comes up.',
    },
    {
      heading: 'What is inside a skill?',
      body: [
        'A skill is just a folder. The only required file is SKILL.md, a Markdown text file. It starts with a short header in YAML (a simple "key: value" format) that the spec calls frontmatter, followed by plain instructions.',
        'The open spec at agentskills.io sets two required fields. name: up to 64 characters, lowercase letters, numbers and hyphens, and it must match the folder name. description: up to 1,024 characters, saying what the skill does and when to use it. Everything else is optional.',
      ],
      example: {
        label: 'A skill folder (from the Agent Skills spec)',
        code: true,
        text: 'pdf-processing/\n├── SKILL.md       # required: name, description, instructions\n├── scripts/       # optional: code the agent can run\n├── references/    # optional: longer docs, read when needed\n└── assets/        # optional: templates, images, data',
      },
    },
    {
      heading: 'How does an agent load a skill? (progressive disclosure)',
      body: [
        'Skills load in layers, which Anthropic calls progressive disclosure. At startup the agent reads only each skill’s name and description, about 100 tokens per skill according to the spec. When your request matches a description, the agent reads the full SKILL.md. Only if the instructions point to another file, or to a script, does the agent open or run that too.',
        'This is why you can install dozens of skills without slowing the agent down. Anthropic notes that scripts help in a second way: code like sorting or extracting form fields gives the same result every time, and the agent can run a script without reading the whole script into its context.',
      ],
      flow: [
        'Startup: names and descriptions only',
        'Your task matches a description',
        'Agent reads full SKILL.md',
        'Opens extra files or runs scripts only if needed',
        'Does the task',
      ],
      keyIdea:
        'The description is the trigger. If it is vague, the agent will not know when to use the skill.',
    },
    {
      heading: 'Skills vs prompts vs MCP vs subagents: what is the difference?',
      body: [
        'These four get mixed up because they all change what an agent does. Anthropic’s "Skills explained" post (March 2026) separates them like this:',
      ],
      bullets: [
        'Prompt: what you type in one chat. It is gone when the chat ends.',
        'Skill: a saved "how to do this task" package that loads itself when relevant, in any chat.',
        'MCP: a connection to outside tools and data, like GitHub or a database. In Anthropic’s words, "MCP connects Claude to data; Skills teach Claude what to do with that data."',
        'Subagent: a separate helper with its own context window and tool permissions, for handing off a whole job.',
      ],
      keyIdea: 'MCP gives the agent hands; a skill gives it a recipe.',
    },
    {
      heading: 'How do you write your first SKILL.md?',
      body: [
        'Make a folder with a lowercase, hyphenated name and put one SKILL.md inside. Write the description as "what it does + when to use it", using words a user would actually type. Keep the instructions short and numbered. The spec suggests keeping SKILL.md under 500 lines and moving long reference material into separate files.',
        'In Claude Code, put the folder at ~/.claude/skills/interview-answer-coach/ for all your projects, or .claude/skills/ inside one project to share it with your team. Claude uses it when your request matches, or you can call it directly by typing /interview-answer-coach.',
      ],
      example: {
        label: 'interview-answer-coach/SKILL.md',
        code: true,
        text: '---\nname: interview-answer-coach\ndescription: Rewrites a job interview answer in STAR format (Situation, Task, Action, Result). Use when the user pastes an interview answer or asks how to answer a behavioral question.\n---\n\n# Interview answer coach\n\n1. Read the question and the user’s answer.\n2. Rewrite it in STAR order, 120 to 180 words, first person.\n3. Keep every fact the user gave. Never invent numbers; write [add a number].\n4. End with one line naming the strongest result.',
      },
    },
    {
      heading: 'Who supports skills, and are they safe?',
      body: [
        'On 18 December 2025, Anthropic published Agent Skills as an open standard, now documented at agentskills.io, which says the format "was originally developed by Anthropic" and is open to contributions. As of Nov 2026, the official docs of these tools say they read SKILL.md folders: Claude apps, Claude Code and the Claude API; Cursor; Gemini CLI; GitHub Copilot in VS Code; and OpenAI Codex. In Claude’s apps, the help center lists Skills for Pro, Max, Team and Enterprise plans.',
        'Skills can contain code, so treat them like software you install. Anthropic warns that a harmful skill could tell the agent to leak data or take actions you did not want.',
      ],
      bullets: [
        'Install skills only from sources you trust.',
        'Before using someone else’s skill, read SKILL.md and every script in it.',
        'Be wary of instructions that send data to unknown websites.',
      ],
    },
  ],
  keyTerms: [
    {
      term: 'Agent Skill',
      meaning:
        'A folder with a SKILL.md file (and optional scripts and references) that teaches an agent how to do one kind of task.',
    },
    {
      term: 'SKILL.md',
      meaning:
        'The required file in a skill: a short header with name and description, then plain Markdown instructions.',
    },
    {
      term: 'Frontmatter',
      meaning:
        'The header between two --- lines at the top of SKILL.md, written in YAML "key: value" style.',
    },
    {
      term: 'Progressive disclosure',
      meaning:
        'Loading information in layers: names and descriptions first, full instructions only when needed, extra files only if asked for.',
    },
    {
      term: 'Context window',
      meaning:
        'The amount of text a model can keep in view at once. Skills save space in it by loading only when relevant.',
    },
  ],
  videos: [
    {
      youtubeId: 'fOxC44g8vig',
      title: 'Claude Agent Skills Explained',
      channel: 'Anthropic',
      minutes: 3,
      why: 'Anthropic’s own short explainer, comparing skills with CLAUDE.md, MCP and subagents. Watch before step 4.',
    },
    {
      youtubeId: 'Lg-meK5IU8Q',
      title: 'What AI Agent Skills Are and How They Work',
      channel: 'IBM Technology',
      minutes: 12,
      why: 'A whiteboard walk-through of why agents need step-by-step know-how, and how skills fit with RAG and MCP.',
    },
  ],
  tryIt: {
    title: 'Write and test your own interview-coach skill',
    steps: [
      'Create a folder named interview-answer-coach and, inside it, a plain text file named SKILL.md.',
      'Copy the example from step 5 into SKILL.md. Change the description so it uses the words you would type.',
      'If you use Claude Code, move the folder to ~/.claude/skills/. In Cursor or VS Code with GitHub Copilot, put it in .agents/skills/ inside a project. In Gemini CLI, follow its skills page.',
      'Start a new session and paste a rough interview answer without naming the skill. Check whether the agent picks it up on its own; if not, make the description more specific.',
      'No agent installed? Paste SKILL.md into any free chatbot and say "follow these instructions for my next message". You lose the automatic loading, but you can test and improve the instructions.',
    ],
    link: {
      label: 'Agent Skills quickstart (agentskills.io)',
      url: 'https://agentskills.io/skill-creation/quickstart',
    },
  },
  check: [
    {
      q: 'What does an agent read about every installed skill at startup?',
      options: [
        'The whole SKILL.md and all scripts',
        'Only the name and description',
        'Nothing until you type the skill’s name',
        'Only the scripts folder',
      ],
      answer: 1,
      why: 'Progressive disclosure: only names and descriptions load at startup. The full SKILL.md loads when a task matches the description.',
    },
    {
      q: 'You want the agent to follow your team’s 8-step code review checklist whenever someone asks for a review. What fits best?',
      options: ['An MCP server', 'A skill', 'A longer prompt in each chat', 'A bigger model'],
      answer: 1,
      why: 'A repeatable "how to do this task" procedure is exactly what a skill is for. MCP connects to outside tools and data; it does not hold your procedure.',
    },
    {
      q: 'Which skill name follows the Agent Skills spec?',
      options: ['Interview_Coach', 'interview-coach', '-interview-coach', 'interview--coach'],
      answer: 1,
      why: 'Names use lowercase letters, numbers and single hyphens, cannot start or end with a hyphen, and must match the folder name.',
    },
  ],
  sources: [
    {
      label:
        'Anthropic Engineering: Equipping agents for the real world with Agent Skills (Oct 2025, updated Dec 2025)',
      url: 'https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills',
    },
    {
      label: 'Claude blog: Introducing Agent Skills (Oct 2025)',
      url: 'https://claude.com/blog/skills',
    },
    {
      label: 'Claude blog: Skills explained (Mar 2026)',
      url: 'https://claude.com/blog/skills-explained',
    },
    { label: 'Agent Skills: overview (agentskills.io)', url: 'https://agentskills.io' },
    { label: 'Agent Skills: specification', url: 'https://agentskills.io/specification' },
    { label: 'Claude Code docs: Skills', url: 'https://code.claude.com/docs/en/skills' },
    {
      label: 'Claude Help Center: Using Skills in Claude',
      url: 'https://support.claude.com/en/articles/12512180-using-skills-in-claude',
    },
    {
      label: 'VS Code docs: Agent Skills in GitHub Copilot',
      url: 'https://code.visualstudio.com/docs/copilot/customization/agent-skills',
    },
    { label: 'Gemini CLI docs: Agent Skills', url: 'https://geminicli.com/docs/cli/skills/' },
    { label: 'Cursor docs: Agent Skills', url: 'https://cursor.com/docs/context/skills' },
    { label: 'OpenAI: Skills catalog for Codex (GitHub)', url: 'https://github.com/openai/skills' },
  ],
  faqs: [
    {
      q: 'What is the difference between Agent Skills and MCP?',
      a: 'MCP connects an AI app to outside tools and data, such as GitHub, Google Drive or a database. A skill is a folder of instructions (and sometimes scripts) that teaches the agent how to do a task. They work together: MCP gives access, the skill says what to do with it.',
    },
    {
      q: 'Are Agent Skills only for Claude?',
      a: 'No. Anthropic created the format and published it as an open standard at agentskills.io in December 2025. As of Nov 2026, Cursor, Gemini CLI, GitHub Copilot in VS Code and OpenAI Codex also read SKILL.md folders.',
    },
    {
      q: 'Do I need to know how to code to write a skill?',
      a: 'No. A basic skill is a text file with a name, a description and numbered instructions in plain English. Scripts are optional and only help when a step should run the same way every time.',
    },
  ],
  related: [
    { label: 'Previous: What is an AI agent?', href: '/learn-ai/ai-agents' },
    { label: 'Next: Subagents and multi-agent systems', href: '/learn-ai/multi-agent-systems' },
    { label: 'What is MCP?', href: '/learn-ai/what-is-mcp' },
    { label: 'Context engineering', href: '/learn-ai/context-engineering' },
    { label: 'Claude Code for beginners', href: '/learn-ai/claude-code' },
    { label: 'AI engineer career guide', href: '/ai-engineer' },
    { label: 'Free AI skills resources', href: '/free-resources#ai-skills' },
  ],
  fromTheSource: [
    {
      who: 'Anthropic Engineering team',
      role: 'The team that created Agent Skills for Claude',
      work: 'Equipping agents for the real world with Agent Skills (engineering post, October 2025)',
      url: 'https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills',
      idea: 'General agents need specific know-how, so package it like an onboarding guide: a folder the agent discovers by its name and description and opens only when a task calls for it.',
      breakdown: [
        'Level 1: name and description always loaded, so the agent knows when a skill applies.',
        'Level 2: the full SKILL.md is read only when the skill is relevant.',
        'Level 3: extra files and scripts are opened or run only if needed, so a skill can hold a lot without filling the context.',
        'Code inside a skill gives repeatable results for jobs like sorting or extracting form fields.',
      ],
      use: 'Start by noticing where an agent keeps getting your task wrong, then write a small skill for just that task and refine it as you watch the agent use it.',
    },
    {
      who: 'Agent Skills open standard',
      role: 'The open format, originally developed by Anthropic, now used by many agent tools',
      work: 'Agent Skills overview and specification (agentskills.io)',
      url: 'https://agentskills.io/specification',
      idea: 'A skill is "a folder containing a SKILL.md file" with a name, a description and instructions, so the same skill works in any compatible agent.',
      breakdown: [
        'Only two fields are required: name and description.',
        'The description should say what the skill does and when to use it, with words users actually type.',
        'Keep SKILL.md short and move long material into references/ files one level deep.',
      ],
      use: 'Write your skill once to the open spec, and you can use the same folder in Claude Code, Cursor, Gemini CLI or Copilot instead of rewriting it for each tool.',
    },
  ],
}
