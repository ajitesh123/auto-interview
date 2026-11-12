import type { Lesson } from '../types'

export const lesson: Lesson = {
  slug: 'multi-agent-systems',
  track: 'build',
  order: 0,
  title: 'Subagents and multi-agent systems',
  metaTitle: 'Multi-Agent Systems Explained: Subagents for Beginners',
  metaDescription:
    'Multi-agent systems explained simply: the orchestrator-worker pattern, how Anthropic built its research agent, when subagents help or hurt, and handoffs.',
  h1: 'Multi-agent systems and subagents, explained simply',
  tldr: 'A multi-agent system splits one big job across several AI agents. Usually a lead agent (the orchestrator) plans the work, sends pieces to helper agents (subagents or workers), each with its own fresh context, and combines what they return. It helps most when the pieces can run in parallel, like broad research, and it hurts when the pieces depend on each other, because it costs many more tokens and the agents can miss each other’s decisions.',
  minutes: 13,
  level: 'Intermediate',
  steps: [
    {
      heading: 'What is a multi-agent system?',
      body: [
        'In the last lessons, an AI agent was one model using tools in a loop until a task is done. A multi-agent system uses several of these agents on one task. Each agent has its own instructions, its own tools and its own context window (the text it can keep in view).',
        'A subagent is a helper that a main agent starts for one piece of work. In Claude Code’s docs, a subagent "does that work in its own context and returns only the summary". That is the core trick: the messy middle (fifty search results, a thousand lines of code) stays inside the helper, and the main agent gets a short, clean answer.',
      ],
      keyIdea:
        'Subagents are mostly about context: each one gets a fresh, focused workspace and hands back a summary.',
    },
    {
      heading: 'How does the orchestrator–worker pattern work?',
      body: [
        'The most common shape is orchestrator–worker. Anthropic’s "Building effective agents" (December 2024) describes it as a central model that breaks a task into subtasks, delegates them to worker models and combines the results. The difference from simple parallel calls is that the orchestrator decides the subtasks on the fly, based on the question.',
        'Think of a newspaper editor. The editor reads the brief, sends three reporters to cover different angles at the same time, then edits their notes into one story. The reporters never see each other’s notes. Only the editor sees everything.',
      ],
      flow: [
        'Your question',
        'Lead agent makes a plan',
        'Subagents work in parallel',
        'Each returns a short summary',
        'Lead combines and checks',
        'Final answer',
      ],
    },
    {
      heading: 'What did Anthropic learn building its multi-agent research system?',
      body: [
        'In June 2025, Anthropic’s engineers described how Claude’s Research feature works. A lead agent plans the research and starts subagents that search in parallel. A separate citation agent then matches each claim in the report to its source.',
        'On Anthropic’s internal research eval, a Claude Opus 4 lead with Claude Sonnet 4 subagents scored 90.2% higher than a single Claude Opus 4 agent. The biggest wins were broad questions, such as finding the board members of every IT company in the S&P 500. Running 3–5 subagents at once, each calling tools in parallel, cut research time by up to 90% on complex questions.',
      ],
      bullets: [
        'Teach the lead how to delegate: each subagent needs a clear goal, an output format, which tools to use and where its task ends.',
        'Scale effort to the question: early versions started 50 subagents for simple queries. Simple fact-finding now uses one agent with 3–10 tool calls.',
        'Start wide, then narrow: short broad searches first, then drill down.',
      ],
    },
    {
      heading: 'When do multiple agents hurt?',
      body: [
        'The same Anthropic post is honest about the price. Agents use about 4 times more tokens than a normal chat, and multi-agent systems about 15 times more. Tokens are what you pay for, so this only makes sense for valuable tasks. In their tests, how many tokens were spent explained 80% of the difference in results on a hard browsing benchmark.',
        'Splitting also breaks shared understanding. Workers cannot see each other’s choices, so two of them can make decisions that clash. Anthropic says multi-agent setups fit poorly when every agent must share the same context or when the pieces depend on each other, and notes that "most coding tasks involve fewer truly parallelizable tasks than research".',
      ],
      bullets: [
        'Good fit: broad research, many independent questions, more information than one context window can hold.',
        'Poor fit: one tightly connected piece of work, like a single feature where each step builds on the last.',
        'Default: start with one agent. Add subagents only when you can name the separate, parallel pieces.',
      ],
      keyIdea:
        'More agents means more cost and more coordination. Use them only when the work truly splits.',
    },
    {
      heading: 'How do subagents work in Claude Code?',
      body: [
        'Claude Code ships with built-in subagents. Explore is a fast, read-only agent for searching a codebase. Plan gathers context in plan mode. General-purpose can both explore and make changes. Claude decides when to hand work to them, or you can ask, for example "use a subagent to find every place we call the payments API".',
        'You can make your own by adding a Markdown file to .claude/agents/ in a project (or ~/.claude/agents/ for all projects). Only name and description are required; the description tells Claude when to delegate, and the body becomes the subagent’s instructions. As of Nov 2026, a subagent can start its own subagents up to three layers deep by default.',
      ],
      example: {
        label: '.claude/agents/code-reviewer.md (from the Claude Code docs)',
        code: true,
        text: '---\nname: code-reviewer\ndescription: Reviews code for quality and best practices\ntools: Read, Glob, Grep\nmodel: sonnet\n---\n\nYou are a code reviewer. When invoked, analyze the code and provide\nspecific, actionable feedback on quality, security, and best practices.',
      },
    },
    {
      heading: 'What are handoffs in the OpenAI Agents SDK?',
      body: [
        'OpenAI’s Agents SDK offers two ways for agents to work together. With a handoff, one agent passes the conversation to a specialist, which then answers the user directly. The SDK shows each handoff to the model as a tool named like transfer_to_refund_agent, so the model "calls" the specialist it wants.',
        'With agents as tools, a manager agent stays in charge and calls specialists for small subtasks, then writes the final answer itself. That is the orchestrator–worker pattern again. You can mix both.',
      ],
      example: {
        label: 'A triage agent with handoffs (simplified from the SDK docs)',
        code: true,
        text: 'from agents import Agent, Runner\n\nrefund_agent = Agent(name="Refund agent",\n    handoff_description="Handles refund requests")\norder_agent = Agent(name="Order status agent",\n    handoff_description="Looks up order delivery status")\n\ntriage_agent = Agent(\n    name="Triage agent",\n    instructions="Hand each customer message to the right specialist.",\n    handoffs=[refund_agent, order_agent],\n)\nresult = await Runner.run(triage_agent, "I was charged twice.")',
      },
    },
  ],
  keyTerms: [
    {
      term: 'Multi-agent system',
      meaning:
        'Several AI agents, each with its own instructions, tools and context, working on parts of one task.',
    },
    {
      term: 'Subagent',
      meaning:
        'A helper agent started by a main agent for one piece of work; it works in its own context and returns a summary.',
    },
    {
      term: 'Orchestrator–worker',
      meaning:
        'A pattern where a lead agent plans, hands subtasks to worker agents, and combines their results.',
    },
    {
      term: 'Handoff',
      meaning:
        'In the OpenAI Agents SDK, passing the conversation from one agent to a specialist agent that takes over.',
    },
    {
      term: 'Parallel',
      meaning: 'Running several pieces of work at the same time instead of one after another.',
    },
  ],
  videos: [
    {
      youtubeId: 'sWH0T4Zez6I',
      title: 'Multi Agent Systems Explained: How AI Agents & LLMs Work Together',
      channel: 'IBM Technology',
      minutes: 8,
      why: 'A clear whiteboard tour of supervisor, hierarchical and network shapes, plus the risks of shared weaknesses. Watch after step 2.',
    },
  ],
  tryIt: {
    title: 'Run an orchestrator–worker team by hand',
    steps: [
      'Pick a broad question, such as "Which three AI tools should a fresher learn for a data analyst job in 2026, and why?"',
      'In one chat with any free assistant (ChatGPT, Claude or Gemini), act as the orchestrator: ask it to split the question into 3 independent research subtasks, each with a goal and a 5-line output format.',
      'Open a new, separate chat for each subtask and paste just that subtask. These are your workers, each with a clean context.',
      'Paste the three short answers back into the first chat and ask it to combine them, flag conflicts and name what is still unknown.',
      'Compare with asking the whole question in one chat. Note what improved, and how many more messages (tokens) it took.',
    ],
    link: {
      label: 'Anthropic: How we built our multi-agent research system',
      url: 'https://www.anthropic.com/engineering/multi-agent-research-system',
    },
  },
  check: [
    {
      q: 'What is the main job of a subagent?',
      options: [
        'To replace the main agent completely',
        'To do one piece of work in its own context and return a short summary',
        'To store passwords for the main agent',
        'To make the model larger',
      ],
      answer: 1,
      why: 'A subagent keeps the messy details in its own context window and hands back only what the main agent needs.',
    },
    {
      q: 'According to Anthropic, roughly how many more tokens did multi-agent systems use than a normal chat?',
      options: ['About the same', 'About 2 times', 'About 15 times', 'About 1,000 times'],
      answer: 2,
      why: 'Anthropic reported about 4 times for single agents and about 15 times for multi-agent systems, so they suit only high-value tasks.',
    },
    {
      q: 'Which task is the best fit for several parallel subagents?',
      options: [
        'Fixing one small bug in a single function',
        'Researching 20 companies, each looked up independently',
        'Writing one short email',
        'Renaming a variable',
      ],
      answer: 1,
      why: 'Independent pieces that can run at the same time are where parallel subagents help. Tightly linked or tiny tasks are better done by one agent.',
    },
  ],
  sources: [
    {
      label: 'Anthropic Engineering: How we built our multi-agent research system (Jun 2025)',
      url: 'https://www.anthropic.com/engineering/multi-agent-research-system',
    },
    {
      label: 'Anthropic Engineering: Building effective agents (Dec 2024)',
      url: 'https://www.anthropic.com/engineering/building-effective-agents',
    },
    { label: 'Claude Code docs: Subagents', url: 'https://code.claude.com/docs/en/sub-agents' },
    {
      label: 'OpenAI Agents SDK: Handoffs',
      url: 'https://openai.github.io/openai-agents-python/handoffs/',
    },
    {
      label: 'OpenAI Agents SDK: Orchestrating multiple agents',
      url: 'https://openai.github.io/openai-agents-python/multi_agent/',
    },
    {
      label: 'Claude blog: Skills explained (subagents compared)',
      url: 'https://claude.com/blog/skills-explained',
    },
  ],
  faqs: [
    {
      q: 'What is the difference between an AI agent and a multi-agent system?',
      a: 'An AI agent is one model using tools in a loop to finish a task. A multi-agent system has several agents, often a lead that plans and helpers that each handle one part in their own context, with the lead combining the results.',
    },
    {
      q: 'Are multi-agent systems better than a single agent?',
      a: 'Only for some tasks. Anthropic found big gains on broad research that splits into parallel parts, but multi-agent systems used about 15 times more tokens than chat and fit poorly when every step depends on the last, as in most coding.',
    },
    {
      q: 'What is a subagent in Claude Code?',
      a: 'A specialised helper with its own context window, instructions and tool permissions. Claude Code includes Explore, Plan and general-purpose subagents, and you can add your own as Markdown files in .claude/agents/.',
    },
  ],
  related: [
    { label: 'Previous: What are Agent Skills?', href: '/learn-ai/agent-skills' },
    { label: 'Next: What is an agent harness?', href: '/learn-ai/agent-harness' },
    { label: 'What is an AI agent?', href: '/learn-ai/ai-agents' },
    { label: 'Context engineering', href: '/learn-ai/context-engineering' },
    { label: 'Claude Code for beginners', href: '/learn-ai/claude-code' },
    { label: 'AI engineer career guide', href: '/ai-engineer' },
    { label: 'Forward deployed engineer guide', href: '/fde' },
  ],
  fromTheSource: [
    {
      who: 'Anthropic Engineering (Jeremy Hadfield, Barry Zhang and colleagues)',
      role: 'The team that built the Research feature in Claude',
      work: 'How we built our multi-agent research system (engineering post, June 2025)',
      url: 'https://www.anthropic.com/engineering/multi-agent-research-system',
      idea: 'Research is open-ended, so a lead agent should plan and send parallel subagents, each with its own context, to explore different angles and return condensed findings.',
      breakdown: [
        'Parallel subagents gave a 90.2% gain over a single agent on Anthropic’s internal research eval.',
        'Each subagent acts like a filter: it reads a lot and returns a little.',
        'The cost is real: about 15 times the tokens of a chat.',
        'It fits broad, splittable tasks better than tightly linked ones like most coding.',
      ],
      use: 'Before adding agents, list the subtasks. If they are independent and valuable, try parallel subagents; if not, keep one agent.',
    },
    {
      who: 'Anthropic (Erik S. and Barry Zhang)',
      role: 'Anthropic engineers who wrote its widely read guide to agent patterns',
      work: 'Building effective agents (December 2024)',
      url: 'https://www.anthropic.com/engineering/building-effective-agents',
      idea: 'Look for "the simplest solution possible, and only increasing complexity when needed"; orchestrator–workers is one pattern to reach for when subtasks cannot be known in advance.',
      breakdown: [
        'Orchestrator–workers: a central model decides the subtasks for each input and merges the results.',
        'Parallelization: fixed subtasks run at once, or the same task runs several times to vote.',
        'Every added layer trades speed and cost for quality, so it has to earn its place.',
      ],
      use: 'Build the single-agent version first, measure it, and add workers only where the measurements show it falls short.',
    },
  ],
}
