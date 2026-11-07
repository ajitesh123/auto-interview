import type { Lesson } from '../types'

export const lesson: Lesson = {
  slug: 'ai-agents',
  track: 'build',
  order: 15,
  title: 'What is an AI agent?',
  metaTitle: 'What Is an AI Agent? AI Agents Explained for Beginners',
  metaDescription:
    'What is an AI agent? Learn the think, act, observe loop, how agents differ from workflows and chatbots, real examples, and the guardrails that keep agents safe.',
  h1: 'What is an AI agent? How agents think, act and check their work',
  tldr: 'An AI agent is an AI system that works toward a goal on its own: it decides the next step, uses a tool such as web search or code, looks at the result, and repeats until the job is done. A workflow follows steps you fixed in advance; an agent chooses its own steps. Agents suit open-ended tasks, but they need limits, approvals and testing.',
  minutes: 10,
  level: 'Beginner',
  steps: [
    {
      heading: 'What makes something an agent?',
      body: [
        'A chatbot answers. An agent gets things done. OpenAI’s practical guide defines agents as "systems that independently accomplish tasks on your behalf".',
        'Think of the difference between a friend who explains how to renew your passport and a travel agent who fills the form, books the appointment and only calls you when a document is missing. The second one is acting for you.',
        'Every agent has three parts, according to the same guide: a model that reasons, tools that let it look things up and take actions (the tool calling from lesson 12), and instructions that set its job and its limits.',
      ],
      flow: ['Model (the brain)', 'Tools (the hands)', 'Instructions (the rules)'],
    },
    {
      heading: 'Workflow or agent: what is the difference?',
      body: [
        'Anthropic’s "Building effective agents" draws a clear line. In a workflow, the model and tools follow "predefined code paths": you wrote the steps. In an agent, the model "dynamically directs" its own process and decides which tool to use next.',
        'Example workflow: every support email is sorted into a category, a reply is drafted, and a human approves it. Same steps every time. Example agent: "find out why this customer was charged twice and fix it", where the steps depend on what it discovers.',
        'Anthropic’s advice is to find the simplest thing that works. Often one well-written model call with good context is enough. Workflows suit tasks with clear steps; agents suit tasks where the steps can’t be known in advance.',
      ],
      keyIdea: 'Start simple. Reach for an agent only when the steps can’t be planned ahead.',
    },
    {
      heading: 'How does the agent loop work?',
      body: [
        'An agent runs in a loop. It thinks about the next step, acts by calling a tool, observes the result, and repeats. Anthropic stresses that at each step the agent should get "ground truth" from the real world, such as a search result or a test run, to check its progress.',
        'The loop needs a way to stop. OpenAI lists common exit conditions: the agent produces its final answer, it replies without asking for any tool, an error occurs, or it hits a maximum number of turns.',
      ],
      flow: [
        'Goal',
        'Think: choose next step',
        'Act: call a tool',
        'Observe: read the result',
        'Repeat or finish',
      ],
      example: {
        label: 'An agent’s trace (simplified)',
        code: true,
        text: 'Goal:  Compare 3 free beginner Python courses\nThink: I need options. Search first.\nAct:   web_search("free beginner Python course")\nSee:   10 results\nThink: Open the top 3, check length and certificate.\nAct:   open_page(...) x3\nSee:   Course details\nThink: I have enough. Write the table.\nDone:  Comparison table with links',
      },
    },
    {
      heading: 'Where are agents used today?',
      body: [
        'Coding agents like Claude Code, Codex and Cursor’s agent read your code, make changes, run tests and fix what fails. You will try them in the next track. Research agents search many pages and write a report. Support agents look up an order and issue a refund within set limits.',
        'OpenAI’s guide says agents fit best where older automation struggles:',
      ],
      bullets: [
        'Decisions that need judgment, like approving an unusual refund.',
        'Rules that are too many or change too often to code by hand.',
        'Lots of unstructured data, such as documents, emails or chats.',
      ],
    },
    {
      heading: 'What can go wrong, and what guardrails help?',
      body: [
        'More freedom means more risk. Agents cost more, take longer, and small mistakes can pile up over many steps. A web page or email the agent reads can also contain hidden instructions trying to hijack it (prompt injection).',
        'Both Anthropic and OpenAI recommend layers of protection, and testing in a safe sandbox before real use:',
      ],
      bullets: [
        'Limit power: give only the tools and access the job needs.',
        'Rate tools by risk, and require a human to approve sensitive, irreversible or high-value actions like payments.',
        'Set a maximum number of turns or retries, then hand over to a person.',
        'Filter inputs and outputs: block off-topic requests, injection attempts and personal data leaks.',
        'Show the agent’s plan and steps so people can see what it did.',
      ],
      keyIdea:
        'Give an agent the least power it needs, a turn limit, and a human check before anything you can’t undo.',
    },
  ],
  keyTerms: [
    {
      term: 'AI agent',
      meaning:
        'An AI system that works toward a goal by choosing and using tools in a loop, with little step-by-step direction.',
    },
    {
      term: 'Workflow',
      meaning:
        'A fixed sequence of model calls and tools that you design in advance. Predictable, but not flexible.',
    },
    {
      term: 'Agent loop',
      meaning: 'The cycle of think, act with a tool, observe the result, and repeat until done.',
    },
    {
      term: 'Exit condition',
      meaning:
        'The rule that ends the loop, such as a final answer, an error or a maximum number of turns.',
    },
    {
      term: 'Guardrail',
      meaning:
        'A check that keeps an agent safe, such as an input filter, a tool limit or a human approval step.',
    },
    {
      term: 'Human in the loop',
      meaning: 'A person reviews or approves certain steps before the agent continues.',
    },
  ],
  videos: [
    {
      youtubeId: 'F8NKVhkZZWI',
      title: 'What are AI Agents?',
      channel: 'IBM Technology',
      minutes: 12,
      why: 'Shows how we moved from single model calls to systems that reason and act. Focus on the reason, act, observe part.',
    },
    {
      youtubeId: 'LP5OCa20Zpg',
      title: 'Tips for building AI agents',
      channel: 'Anthropic',
      minutes: 18,
      why: 'Anthropic engineers on when to build an agent and when not to. Good after you finish this lesson.',
    },
  ],
  tryIt: {
    title: 'Watch an agent loop, then design its guardrails',
    steps: [
      'Open ChatGPT, Claude or Gemini with web search turned on.',
      'Give it a multi-step task: "Find three free beginner Python courses from well-known sources. For each, check the length and whether it gives a certificate. Give me a comparison table with links."',
      'Open the activity or thinking panel if it shows one. Write down each think, act and observe step. How many searches or page visits did it make?',
      'Open one link yourself and check one fact. Was the agent right?',
      'Now imagine this agent could also read your email and pay with UPI. Write three guardrails you would insist on before letting it.',
    ],
    link: {
      label: 'Read Anthropic’s "Building effective agents"',
      url: 'https://www.anthropic.com/engineering/building-effective-agents',
    },
  },
  check: [
    {
      q: 'Which of these is a workflow rather than an agent?',
      options: [
        'A bot that decides on its own which tools to use to debug a failing app',
        'A fixed pipeline: sort each email, draft a reply, send it to a human to approve',
        'A research assistant that keeps searching until it is confident',
        'A coding assistant that runs tests and fixes failures in a loop',
      ],
      answer: 1,
      why: 'A workflow follows steps you defined in advance. The others let the model choose the next step based on what it finds.',
    },
    {
      q: 'Why give an agent a maximum number of turns?',
      options: [
        'To make it sound more polite',
        'To stop endless loops and runaway cost, and hand over to a human',
        'Because models can only call one tool',
        'To make answers longer',
      ],
      answer: 1,
      why: 'A turn limit is a basic exit condition. Without it, a confused agent can keep calling tools and spending money.',
    },
    {
      q: 'Your support agent can issue refunds. Which action should need human approval?',
      options: [
        'Looking up the order status',
        'Reading the refund policy',
        'Refunding ₹50,000 to a new account',
        'Saying hello to the customer',
      ],
      answer: 2,
      why: 'OpenAI’s guide says high-risk actions that are sensitive, irreversible or high-value, like large refunds, should trigger human review.',
    },
  ],
  fromTheSource: [
    {
      who: 'Shunyu Yao and colleagues (Princeton University and Google)',
      role: 'Authors of ReAct, the paper behind the think, act, observe loop that most AI agents still use.',
      work: 'ReAct: Synergizing Reasoning and Acting in Language Models (paper, 2022)',
      url: 'https://arxiv.org/abs/2210.03629',
      idea: 'Let the model write its reasoning and its actions in turns: a thought, then a tool call, then the result, then the next thought. The reasoning keeps the plan on track, and the actions bring in real information so the model is not left guessing.',
      breakdown: [
        'Thought: the model writes down what it needs next, in plain words.',
        'Action: it calls a tool. In the paper this was a simple Wikipedia search, and it cut down the made-up facts that reasoning alone produced.',
        'Observation: it reads what came back and plans again. With only one or two examples in the prompt, ReAct beat earlier methods by 34 points on ALFWorld (a text game of household tasks) and 10 points on WebShop (an online shopping test).',
        'Because the thoughts are written out, a person can read the trace and see why the agent did what it did.',
      ],
      use: 'When an agent goes wrong, read its trace step by step: thought, action, result. You will usually spot the exact step where it guessed instead of checking.',
    },
    {
      who: 'Erik Schluntz and Barry Zhang (Anthropic)',
      role: 'Anthropic engineers who wrote "Building effective agents" after working with dozens of teams building agents.',
      work: 'Building effective agents (Anthropic engineering post, December 2024)',
      url: 'https://www.anthropic.com/engineering/building-effective-agents',
      idea: 'The most successful teams were not using complex frameworks. They built with simple, composable patterns, starting from one "augmented LLM": a model that can search, use tools and remember.',
      breakdown: [
        'Start with the simplest thing that works, and add steps only when they clearly help. Agents trade speed and cost for better results on hard tasks.',
        'Their three principles: keep the design simple, show the agent’s planning steps, and put real care into tool descriptions and testing.',
        'Frameworks can speed you up but can hide the actual prompts. They suggest starting with the model’s API directly, since many patterns are only a few lines of code.',
      ],
      use: 'Before you build an agent, try one model call with good context and one or two tools. If you do need an agent, spend your time on clear tool names and descriptions, and watch the first runs closely.',
    },
  ],
  sources: [
    {
      label: 'Anthropic: Building effective agents (Dec 2024)',
      url: 'https://www.anthropic.com/engineering/building-effective-agents',
    },
    {
      label: 'Yao et al. (2022), ReAct: Synergizing Reasoning and Acting in Language Models',
      url: 'https://arxiv.org/abs/2210.03629',
    },
    {
      label: 'OpenAI: A practical guide to building agents (PDF)',
      url: 'https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf',
    },
  ],
  faqs: [
    {
      q: 'What is the difference between an AI agent and a chatbot?',
      a: 'A chatbot replies to your message. An agent works toward a goal: it plans steps, calls tools like search or code, checks results, and keeps going until the task is done or it needs your input.',
    },
    {
      q: 'What is the difference between an AI agent and an AI workflow?',
      a: 'In a workflow, you write the steps and the model fills them in. In an agent, the model decides the steps itself. Anthropic recommends starting with the simplest option and using agents only when the steps can’t be planned in advance.',
    },
    {
      q: 'Are AI agents safe to use?',
      a: 'They can be, with guardrails. Give agents only the access they need, require human approval for payments or anything irreversible, set turn limits, filter inputs for prompt injection, and test them in a sandbox first.',
    },
  ],
  related: [
    { label: 'Tool calling (function calling)', href: '/learn-ai/tool-calling' },
    { label: 'What is MCP?', href: '/learn-ai/what-is-mcp' },
    { label: 'Next: Evals, does your AI work?', href: '/learn-ai/ai-evals' },
    { label: 'Your first AI automation in n8n', href: '/learn-ai/n8n-ai-automation' },
    { label: 'AI engineer career guide', href: '/ai-engineer' },
    { label: 'AI product manager guide', href: '/aipm' },
    { label: 'Free AI skills resources', href: '/free-resources#ai-skills' },
  ],
}
