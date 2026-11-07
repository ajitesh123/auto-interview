import type { Lesson } from '../types'

export const lesson: Lesson = {
  slug: 'context-engineering',
  track: 'use',
  order: 0,
  title: 'Context engineering',
  metaTitle: 'What Is Context Engineering? Explained Simply With Examples',
  metaDescription:
    'Context engineering explained simply: what goes in the context window, why too much makes AI worse (context rot), and how compaction, notes and retrieval help.',
  h1: 'What is context engineering? A simple guide for AI users and builders',
  tldr: 'Context engineering is choosing what goes into an AI model’s context window, the working memory it reads before every answer: instructions, tools, examples, documents and chat history. Prompt engineering is about wording one message; context engineering is about curating everything the model sees. Too little and it guesses; too much and its answers get worse, so the goal is the smallest set of useful information.',
  minutes: 12,
  level: 'Beginner',
  steps: [
    {
      heading: 'From prompt engineering to context engineering',
      body: [
        'The model does not remember you between calls. Every time it answers, it reads one long block of text, the context window, and predicts what comes next. Whatever is in that block is all it knows about your task. Context engineering is the craft of deciding what goes in that block.',
        'In June 2025 Andrej Karpathy said he preferred the term to “prompt engineering”, describing it as “the delicate art and science of filling the context window with just the right information for the next step.” Anthropic’s engineering team defines it as curating and maintaining the best set of tokens (small chunks of text) while the model runs. The shift is from writing one good message to managing everything around it.',
      ],
      flow: [
        'Instructions',
        'Tools',
        'Examples',
        'Documents',
        'Chat history',
        'Context window',
        'Answer',
      ],
      keyIdea:
        'The model only knows what is in its context window right now. Your job is to put the right things there.',
    },
    {
      heading: 'What goes into the context window',
      body: [
        'Anthropic’s Claude docs list what counts: the system prompt, every message (including tool results, images and documents), the tool definitions, and the answer being written, including any thinking. In a chat app you see only your messages, but the app quietly adds a system prompt, your custom instructions, memory and uploaded files.',
        'Each part has a job. The system prompt sets the role and rules. Tool definitions tell the model what it can do. Examples show the expected output. Retrieved documents supply facts. Message history carries the conversation so far. Every one of them uses up space and attention.',
      ],
      example: {
        label: 'What an AI support agent actually sees (simplified)',
        code: true,
        text: `<system>
You are the support assistant for a food delivery app in India.
Be brief and polite. Refunds above ₹500 need a human.
</system>

<tools>
get_order(order_id), issue_refund(order_id, amount), escalate(reason)
</tools>

<examples>
[2 short sample chats showing the tone and when to escalate]
</examples>

<retrieved_documents>
[only the refund policy section, not the whole handbook]
</retrieved_documents>

<history>
User: My biryani came cold, order #4471.
Tool result: get_order -> amount ₹380, delivered 40 min late
</history>`,
      },
    },
    {
      heading: 'Why more context can make answers worse (context rot)',
      body: [
        'Bigger windows do not solve everything. Anthropic’s docs warn that as the token count grows, accuracy and recall degrade, a problem called context rot, and add that more context is not automatically better. Chroma’s July 2025 study tested 18 models and found performance dropped as input got longer, even on simple tasks. In one test, models did much better with a focused prompt of about 300 tokens than with the full 113,000-token version.',
        'Anthropic explains why with an “attention budget”. In a transformer, every token attends to every other token, so n tokens create n² relationships, and attention is spread thinner as the window fills. Irrelevant text also acts as a distractor: Chroma found that even one distractor lowered accuracy.',
      ],
      keyIdea:
        'Aim for the smallest set of high-signal information that gets the job done, not the most information.',
    },
    {
      heading: 'Context engineering in ChatGPT and Claude',
      body: [
        'You can do this today without code. Start a new chat when you switch topics, as Karpathy advises, so old text does not distract. Paste the relevant section, not the whole 80-page PDF. Keep a project (such as a Claude Project) to the files that matter for that one job, and review what memory has saved.',
        'When a long chat starts drifting, compact it yourself: ask for a handoff summary, open a new chat, and paste it in. This is the same trick agents use.',
      ],
      bullets: [
        'One topic per chat',
        'Paste the parts that matter, and say why they matter',
        'Put long documents first and your question last',
        'Summarise and restart when a chat gets long or confused',
      ],
      example: {
        label: 'Copy this: a handoff summary prompt',
        text: `We are going to continue this in a new chat. Write a handoff summary under 200 words with:
1. The goal
2. Decisions we made and why
3. Facts I gave you that still matter
4. Open questions and the next step
Leave out anything we abandoned.`,
      },
    },
    {
      heading: 'For builders: retrieval, compaction, notes and sub-agents',
      body: [
        'Just-in-time retrieval: instead of loading everything up front, the agent keeps light references such as file paths, links or saved queries, and pulls data in with tools when needed. Claude Code works this way, reading a project’s CLAUDE.md at the start and using search commands like grep for the rest. Anthropic calls this mix a hybrid strategy.',
        'For long tasks, Anthropic describes three techniques. Compaction: when the window is nearly full, summarise it (keep decisions, open bugs and key details; drop old tool output) and continue in a fresh window. Structured notes: the agent writes progress to a file such as NOTES.md or a to-do list outside the window and reads it back later. Sub-agents: helpers explore in their own clean windows and return short summaries, often 1,000 to 2,000 tokens.',
      ],
      example: {
        label: 'An agent’s NOTES.md (structured note-taking)',
        code: true,
        text: `# Task: migrate signup form to new API
## Done
- Updated api/client.ts to v2 endpoints
## Decisions
- Keep old error codes; mobile app depends on them
## Open
- Test for OTP timeout fails (see tests/otp.test.ts)
## Next
- Fix OTP test, then update docs`,
      },
      keyIdea:
        'Compaction for long back-and-forth, notes for work with milestones, sub-agents for wide research.',
    },
    {
      heading: 'A simple checklist for any context',
      body: [
        'Anthropic’s guidance boils down to a few habits. Write the system prompt at the “right altitude”: specific enough to guide, general enough not to break, in clear sections. Start minimal and add instructions only when you see the model fail.',
        'Keep the toolset small and non-overlapping; if a person cannot tell which tool to use, the model will not either. Use a few varied, typical examples instead of a long list of edge-case rules. And do the simplest thing that works.',
      ],
      bullets: [
        'Does it have everything needed to do the task?',
        'What can I remove without hurting the answer?',
        'Is the most important information easy to find (start or end, clearly labelled)?',
        'For long tasks: where will progress be saved when the window fills?',
      ],
    },
  ],
  keyTerms: [
    {
      term: 'Context window',
      meaning:
        'All the text the model can see in one call: instructions, messages, documents, tool results and its own answer. Its working memory.',
    },
    {
      term: 'Context engineering',
      meaning:
        'Deciding what goes into the context window, and what stays out, so the model has just what it needs.',
    },
    {
      term: 'Context rot',
      meaning:
        'The drop in accuracy and recall as the context window fills with more and more tokens.',
    },
    {
      term: 'Just-in-time retrieval',
      meaning:
        'Keeping references such as file paths and loading the actual content only when the agent needs it.',
    },
    {
      term: 'Compaction',
      meaning:
        'Summarising a long conversation near the limit and continuing in a fresh window with that summary.',
    },
    {
      term: 'Structured notes (agent memory)',
      meaning:
        'Progress an agent writes to a file outside the context window and reads back later.',
    },
  ],
  videos: [
    {
      youtubeId: 'LCEmiRjPEtQ',
      title: 'Andrej Karpathy: Software Is Changing (Again)',
      channel: 'Y Combinator',
      minutes: 40,
      start: 370,
      why: 'Starts at “LLMs as utilities, fabs, and operating systems” (6:10). Watch to about 18:22 for the idea that the context window is the model’s working memory, and why models forget between sessions.',
    },
  ],
  tryIt: {
    title: 'See context engineering change an answer',
    steps: [
      'Pick a real job post. In a new chat, ask: “Write the opening paragraph of my cover letter for this role.” Paste only the job title. Save the answer.',
      'New chat. Paste the full job post, three true facts about you, and one sentence you have written yourself so it can match your voice. Ask the same question.',
      'New chat. Paste the same material plus your entire resume, an old cover letter for a different job, and some unrelated notes. Ask again. Did the extra text help or distract?',
      'In any long chat, use the handoff summary prompt from this lesson, start a fresh chat with the summary, and keep going.',
      'Note which version was best. Most people find the focused one beats both the empty and the stuffed one.',
    ],
    link: { label: 'Open Claude (free)', url: 'https://claude.ai' },
  },
  check: [
    {
      q: 'What is context rot?',
      options: [
        'When a model’s training data becomes out of date',
        'The drop in accuracy and recall as the context window fills with more tokens',
        'When a chat app deletes your old conversations',
        'A virus that corrupts prompts',
      ],
      answer: 1,
      why: 'Anthropic’s docs and Chroma’s study both found that longer inputs lower accuracy, even on simple tasks.',
    },
    {
      q: 'An agent on a long coding task is close to its context limit. Which technique summarises the conversation and continues in a fresh window?',
      options: ['Few-shot prompting', 'Compaction', 'Raising the temperature', 'Fine-tuning'],
      answer: 1,
      why: 'Compaction keeps decisions, open bugs and key details, drops redundant tool output, and carries the summary into a new window.',
    },
    {
      q: 'What does just-in-time retrieval mean?',
      options: [
        'Loading every document into the prompt before the task starts',
        'Keeping light references, such as file paths, and loading content only when it is needed',
        'Answering as fast as possible',
        'Retraining the model every night',
      ],
      answer: 1,
      why: 'The agent keeps the window clean and pulls in data with tools when a step needs it, as Claude Code does with grep and file reads.',
    },
  ],
  sources: [
    {
      label: 'Anthropic Engineering (Sep 29, 2025): Effective context engineering for AI agents',
      url: 'https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents',
    },
    {
      label: 'Claude docs: Context windows (context rot, compaction, context editing)',
      url: 'https://platform.claude.com/docs/en/build-with-claude/context-windows',
    },
    {
      label: 'Chroma Research (Jul 14, 2025): Context Rot',
      url: 'https://www.trychroma.com/research/context-rot',
    },
    {
      label: 'PureAI: Karpathy puts context at the core of AI coding (quotes the X post)',
      url: 'https://pureai.com/articles/2025/09/23/karpathy-puts-context-at-the-core-of-ai-coding.aspx',
    },
    {
      label: 'Analytics India Magazine: Context engineering is the new vibe coding',
      url: 'https://analyticsindiamag.com/ai-features/context-engineering-is-the-new-vibe-coding',
    },
    {
      label: 'Y Combinator (YouTube): Andrej Karpathy, Software Is Changing (Again)',
      url: 'https://www.youtube.com/watch?v=LCEmiRjPEtQ',
    },
    {
      label: 'Transcript of Karpathy’s Software Is Changing (Again)',
      url: 'https://cdn.billmill.org/static/yt-transcribe/karpathy/httpswwwyoutubecomwatchvLCEmiRjPEtQ.html',
    },
    {
      label: 'Analytics Vidhya: summary of Karpathy’s How I use LLMs',
      url: 'https://www.analyticsvidhya.com/?p=225252',
    },
    {
      label: 'Anthropic: Prompting best practices (long context tips)',
      url: 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices',
    },
    {
      label: 'Claude Help Center: What are projects?',
      url: 'https://support.claude.com/en/articles/9517075-what-are-projects',
    },
  ],
  faqs: [
    {
      q: 'What is the difference between prompt engineering and context engineering?',
      a: 'Prompt engineering is writing and organising the instructions in a message. Context engineering covers everything the model sees on each call: system prompt, tools, examples, retrieved documents, chat history and tool results, and deciding what to leave out as a task goes on.',
    },
    {
      q: 'Does a bigger context window mean better answers?',
      a: 'Not by itself. A bigger window lets you include more, but accuracy and recall drop as it fills, which is called context rot. Focused, relevant context usually beats pasting everything.',
    },
    {
      q: 'How do I use context engineering in ChatGPT or Claude?',
      a: 'Keep one topic per chat, paste only the relevant parts of documents, put long documents before your question, keep projects to the files that matter, and when a chat gets long, ask for a handoff summary and continue in a new chat.',
    },
  ],
  related: [
    { label: 'Previous: The levers that make answers better', href: '/learn-ai/ai-output-levers' },
    { label: 'Next: Why AI makes things up', href: '/learn-ai/ai-hallucinations' },
    { label: 'Tokens and context windows', href: '/learn-ai/tokens-and-context-window' },
    { label: 'Embeddings and RAG', href: '/learn-ai/embeddings-and-rag' },
    { label: 'What is an AI agent?', href: '/learn-ai/ai-agents' },
    { label: 'AI engineer guide', href: '/ai-engineer' },
  ],
  fromTheSource: [
    {
      who: 'Anthropic Applied AI team',
      role: 'The team that helps companies build agents on Claude; the post is by Prithvi Rajasekaran, Ethan Dixon, Carly Ryan and Jeremy Hadfield.',
      work: 'Effective context engineering for AI agents (engineering blog, September 2025)',
      url: 'https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents',
      idea: 'Context is a limited resource with diminishing returns, so the goal is to find “the smallest set of high-signal tokens” that make the result you want most likely, and to keep curating it as the agent works.',
      breakdown: [
        'Models have an attention budget. Every extra token spends some of it, and recall weakens as the window grows.',
        'Each part needs care: a system prompt at the right altitude, a small set of clear tools, and a few typical examples.',
        'Agents can fetch information just in time with tools instead of loading everything up front.',
        'For long tasks, use compaction, structured notes, or sub-agents that return short summaries.',
      ],
      use: 'Before adding anything to a prompt or agent, ask whether it raises the chance of a good answer. If not, leave it out or let the model fetch it when needed.',
    },
    {
      who: 'Andrej Karpathy',
      role: 'OpenAI founding member and former director of AI at Tesla, whose June 2025 post on context engineering was widely shared.',
      work: 'Software Is Changing (Again) (talk at Y Combinator AI Startup School, 2025)',
      url: 'https://www.youtube.com/watch?v=LCEmiRjPEtQ',
      idea: 'Karpathy compares an LLM to a new kind of operating system: the model is like the CPU, and “context windows are really kind of like working memory.” He also notes LLMs have a kind of amnesia: they do not learn from your session the way a coworker would.',
      breakdown: [
        'The context window is like a computer’s RAM: fast, limited, and wiped between sessions.',
        'Because the model does not build up knowledge of you over time, everything it needs must be in the window for each task.',
        'In his June 2025 post on context engineering, he listed packing the context window as one of the core jobs of any serious LLM app.',
      ],
      use: 'Treat each chat like a fresh colleague with a small desk: hand over exactly the papers needed for this task, and clear the desk when the task changes.',
    },
  ],
}
