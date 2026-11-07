import type { Lesson } from '../types'

export const lesson: Lesson = {
  slug: 'ai-output-levers',
  track: 'use',
  order: 0,
  title: 'The levers that make answers better',
  metaTitle: 'How to Get Better Answers From ChatGPT and Claude: 11 Levers',
  metaDescription:
    'How to get better answers from ChatGPT and Claude: 11 levers beyond wording, from context and thinking to tools, model choice and self-checks, with examples.',
  h1: 'How to get better answers from AI: the 11 levers you can pull',
  tldr: 'A weak AI answer usually means the model was missing something, not that you used the wrong magic words. Beyond wording, you can pull 11 levers: give it context, define what good looks like, show examples, set the format, let it think longer, pick the right model, switch on tools like web search, save standing instructions, adjust settings, ask it to check its own work, and split big jobs into steps. Find what went wrong, then pull the matching lever.',
  minutes: 13,
  level: 'Beginner',
  steps: [
    {
      heading: 'Give it more to work with: context and standing instructions',
      body: [
        'Lever 1 is context: the background the model cannot guess. Who you are, who the answer is for, what you already tried, and the actual documents. Anthropic describes Claude as a brilliant new employee who lacks context on your norms. Every fact you leave out, it fills with a generic guess.',
        'Lever 2 is saving context you repeat. Custom instructions in ChatGPT apply to every new chat until you change them. Memory keeps details you choose to share, and you can ask what it remembers or tell it to forget. A Claude Project holds files and instructions for one topic; free accounts can create up to five. If you are not sure what context to give, pull a bonus lever: ask the model to interview you first.',
      ],
      example: {
        label: 'Before and after: adding context',
        text: `Before:
Write a LinkedIn post about my new job.

After:
I just joined Razorpay in Bengaluru as a junior data analyst, after 2 years in customer support at a bank. My readers are former colleagues and recruiters. I want to thank my old team, say I taught myself SQL at night, and sound humble, not boastful.
Write a LinkedIn post of 80 to 120 words.
If anything important is missing, ask me up to 3 questions before you write.`,
      },
      keyIdea:
        'If a smart stranger would need to ask a question, the model needed that context too.',
    },
    {
      heading: 'Tell it what good looks like: criteria, examples and format',
      body: [
        'Lever 3 is success criteria: say how you will judge the answer. OpenAI’s reasoning guide tells you to be very specific about the end goal and to state hard limits, such as a budget. “Make it better” gives the model nothing to aim at; “a hiring manager should understand it in 20 seconds” does.',
        'Lever 4 is examples. One or two samples of the output you want teach tone and shape faster than paragraphs of rules (the previous lesson covers few-shot prompting in detail). Lever 5 is output format and length: a table, 5 bullets, under 100 words, simple English. Anthropic advises saying what to do rather than what to avoid, so “write in flowing paragraphs” works better than “no markdown”.',
      ],
      example: {
        label: 'Criteria + example + format',
        text: `Rewrite my resume bullet below.

Good means: starts with a strong verb, shows one number, under 25 words, no buzzwords.

Example of the style I want:
"Cut refund processing time from 5 days to 2 by building a Google Sheets tracker used by 12 agents."

My bullet: "Responsible for handling customer complaints and working with the team on improvements."

Give me 3 options in a numbered list, then say which one meets all 4 criteria best.`,
      },
    },
    {
      heading: 'Let it think: thinking modes and effort',
      body: [
        'Lever 6 is thinking time. Reasoning models (also called thinking models) write a hidden chain of reasoning before they answer: they try an approach, check it, and try again. Anthropic says this helps most on maths, coding, analysis and long agent tasks. In chat apps it is a “thinking” or “extended thinking” toggle or a model with “thinking” in its name. In the API it is an effort setting: Claude uses levels from low to max, and OpenAI’s reasoning effort ranges from none or minimal up to xhigh or max, depending on the model.',
        'When to pull it: multi-step problems, comparisons, plans and anything you would want a person to double-check. When not to: quick rewrites and simple facts, where it only adds waiting. It also costs more, because thinking tokens are billed as output even when you never see them. And with a reasoning model you do not need “think step by step”: OpenAI says such prompts are unnecessary and can even hurt, and Anthropic finds a general “think this through carefully” beats a hand-written list of steps.',
      ],
      flow: ['Your question', 'Hidden thinking', 'Checks its approach', 'Final answer'],
      example: {
        label: 'A good job for a thinking model',
        text: `[Thinking mode on]
I can take a ₹6 LPA job in Pune now, or do a 1-year full-time data science course costing ₹2.5 lakh and then look for jobs. I have ₹3 lakh in savings and live with my parents.
Compare both paths over 3 years: money, risk and skills. State every assumption, and tell me what information would change your answer.`,
      },
    },
    {
      heading: 'Give it tools: search, code, files and connectors',
      body: [
        'Lever 7 is tools. A model on its own only knows its training data and what you paste. Web search lets it look up recent facts and show sources. A code tool (called code execution, data analysis or a Python interpreter) lets it calculate instead of guess; Google’s Gemini guide suggests code execution for arithmetic and counting, and search grounding for recent or obscure facts. File upload puts your PDF or spreadsheet into its context.',
        'Connectors go one step further. In Claude, connectors are built on MCP (Model Context Protocol, an open standard for plugging tools into AI apps) and include ready-made ones for Google Drive, Gmail, GitHub and Slack. Karpathy’s advice from his own use: ask for a search explicitly when the answer depends on recent information, then check the citations.',
      ],
      flow: [
        'You ask',
        'Model sees it needs data',
        'Calls search or code',
        'Reads the result',
        'Answers with sources',
      ],
      example: {
        label: 'Before and after: adding tools',
        text: `Before (no tools, guesses from memory):
What is the average salary for a product analyst in Hyderabad?

After (search + code):
Search the web for product analyst salaries in Hyderabad from the last 12 months. Use at least 3 sources and link each one. Then use code to calculate the median of the figures you found, and tell me how much the sources disagree.`,
      },
      keyIdea:
        'Need fresh facts? Turn on search. Need exact numbers? Ask it to use code. Need your data? Upload it or connect it.',
    },
    {
      heading: 'Pick the right model and settings',
      body: [
        'Lever 8 is model choice. OpenAI’s guide calls reasoning models “the planners” and its fast GPT models “the workhorses”: use fast models for straightforward, well-defined jobs, and reasoning models when accuracy matters more than speed or cost. Most apps give you a fast default and a stronger option. Karpathy keeps fast models for everyday questions, switches to a thinking model when a hard problem (like a tricky bug) defeats the fast one, and sometimes asks several models the same question.',
        'Lever 9 is sampling settings, mainly temperature, and only in the API or developer tools. Temperature controls how random the word choices are: 0 makes the output close to deterministic, higher values give more variety. On many of the newest models you can no longer change it. Google says custom temperature is ignored on its newest Gemini models, and newer Claude models reject non-default values, so on those, thinking effort is the dial that matters.',
      ],
      bullets: [
        'Quick rewrite, summary, simple question: fast model',
        'Maths, code, planning, tricky analysis: reasoning model or thinking on',
        'Big decision: ask two different models and compare',
        'Building with the API: tune effort first; leave temperature at default on new models',
      ],
    },
    {
      heading: 'Iterate: make it check its work, and split big jobs',
      body: [
        'Lever 10 is self-critique. Anthropic’s guide suggests ending with a check such as “Before you finish, verify your answer against these criteria,” and names a common three-step pattern: draft, review the draft against criteria, then refine. The review step catches mistakes the first pass missed.',
        'Lever 11 is chaining: breaking a big task into steps and feeding each answer into the next. Google’s guide recommends splitting instructions into separate prompts, and Anthropic uses chains when you want to inspect each step. Outline first, then write each section, then edit. Use this checklist when an answer disappoints:',
      ],
      bullets: [
        'Generic or bland? Add context: who you are, the audience, your documents.',
        'Wrong shape or length? Give criteria, a format and one example.',
        'Wrong on logic, maths or planning? Turn on thinking, use a reasoning model, ask for code.',
        'Outdated or made-up facts? Turn on search or upload the source, and ask for citations.',
        'Good but not great? Ask it to critique against your criteria and revise; split big jobs into steps; save what works as custom instructions or a project.',
      ],
      example: {
        label: 'A self-critique follow-up',
        text: `Now act as a strict reviewer. Score your answer from 1 to 10 against my 4 criteria, list the 3 biggest weaknesses, then rewrite it to fix them.`,
      },
      keyIdea: 'Diagnose first, then pull one lever at a time, so you learn which one fixed it.',
    },
  ],
  keyTerms: [
    {
      term: 'Context',
      meaning:
        'Everything the model can see when it answers: your message, pasted documents, earlier chat, saved instructions and tool results.',
    },
    {
      term: 'Reasoning (thinking) model',
      meaning:
        'A model that writes hidden reasoning before its answer. Slower and costlier, but better at multi-step problems.',
    },
    {
      term: 'Effort setting',
      meaning:
        'A dial (for example low, medium, high) that controls how much a model thinks and works before answering.',
    },
    {
      term: 'Tool',
      meaning:
        'An ability the model can call, such as web search, running code, reading a file, or reaching an app through a connector.',
    },
    {
      term: 'Custom instructions',
      meaning:
        'Saved preferences about you and how you want answers, applied to every new chat. Projects do the same for one topic, plus files.',
    },
    {
      term: 'Temperature',
      meaning:
        'An API setting for how random word choices are. 0 is near-deterministic; many newest models fix it for you.',
    },
  ],
  videos: [
    {
      youtubeId: 'EWvNQjAaOHw',
      title: 'How I use LLMs',
      channel: 'Andrej Karpathy',
      minutes: 131,
      start: 1083,
      why: 'Starts at “Be aware of the model you’re using” (18:03). Watch about 40 minutes, through thinking models, internet search, deep research and file uploads: most of this lesson’s levers, shown live.',
    },
    {
      youtubeId: 'XSZP9GhhuAc',
      title: 'Prompting for Agents | Code w/ Claude',
      channel: 'Anthropic',
      minutes: 29,
      why: 'Anthropic’s team on the levers inside an agent: how to steer its thinking, when to use which tool, and why fewer, clearer examples work better.',
    },
  ],
  tryIt: {
    title: 'Pull four levers on one question',
    steps: [
      'Pick a real question you care about, such as which of two job offers or courses to choose. Ask it plainly in ChatGPT, Claude or Gemini and save the answer.',
      'New chat. Ask again, adding context (your situation in 3 to 4 lines) and 3 success criteria.',
      'New chat. Paste the improved prompt with thinking or a reasoning model switched on, and web search on if it needs current facts.',
      'Follow up: “Score your answer against my criteria, list its weaknesses, and rewrite it.”',
      'Compare all versions. Write down which lever made the biggest difference; that is the one to reach for first next time.',
    ],
    link: { label: 'Open Claude (free)', url: 'https://claude.ai' },
  },
  check: [
    {
      q: 'You ask for today’s petrol price in Mumbai and get an old, confident number. Which lever fixes this?',
      options: [
        'Lower the temperature',
        'Turn on web search and ask for sources',
        'Add a few-shot example',
        'Ask for a table',
      ],
      answer: 1,
      why: 'The model only knows its training data. Recent facts need a search tool, and sources let you check the answer.',
    },
    {
      q: 'You use a reasoning model. Should you add “think step by step” to every prompt?',
      options: [
        'Yes, it always improves answers',
        'No, it already reasons; OpenAI says such prompts are unnecessary and can hurt',
        'Yes, but only in capital letters',
        'No, because reasoning models cannot think',
      ],
      answer: 1,
      why: 'Reasoning models think before answering. A clear goal and criteria help more than spelling out the steps.',
    },
    {
      q: 'Your answer is well written but too generic for your situation. Which lever should you pull first?',
      options: [
        'Switch to a bigger model',
        'Raise the temperature',
        'Add context: who you are, the audience and your documents',
        'Ask for a shorter answer',
      ],
      answer: 2,
      why: 'Generic answers usually mean missing context. The model fills gaps with average guesses until you give it your specifics.',
    },
  ],
  sources: [
    {
      label: 'Anthropic: Prompting best practices',
      url: 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices',
    },
    {
      label: 'Anthropic: Thinking (adaptive thinking, effort, cost)',
      url: 'https://platform.claude.com/docs/en/build-with-claude/thinking',
    },
    {
      label: 'Anthropic: Extended thinking',
      url: 'https://platform.claude.com/docs/en/build-with-claude/extended-thinking',
    },
    {
      label: 'OpenAI: Reasoning best practices',
      url: 'https://developers.openai.com/api/docs/guides/reasoning-best-practices',
    },
    {
      label: 'OpenAI: Reasoning models guide',
      url: 'https://developers.openai.com/api/docs/guides/reasoning',
    },
    {
      label: 'OpenAI Help: Prompt engineering best practices for ChatGPT',
      url: 'https://help.openai.com/en/articles/10032626-prompt-engineering-best-practices-for-chatgpt',
    },
    {
      label: 'OpenAI Academy: Personalization (custom instructions and memory)',
      url: 'https://openai.com/academy/personalization',
    },
    {
      label: 'Google AI Studio: Prompt design strategies',
      url: 'https://aistudio.google.com/docs/prompting-strategies',
    },
    {
      label: 'Claude Help Center: What are projects?',
      url: 'https://support.claude.com/en/articles/9517075-what-are-projects',
    },
    {
      label: 'Claude docs: Connectors overview',
      url: 'https://claude.com/docs/connectors/overview',
    },
    {
      label: 'Andrej Karpathy (YouTube): How I use LLMs',
      url: 'https://www.youtube.com/watch?v=EWvNQjAaOHw',
    },
    {
      label: 'Analytics Vidhya: summary of Karpathy’s How I use LLMs',
      url: 'https://www.analyticsvidhya.com/?p=225252',
    },
    {
      label: 'Transcript: Prompting for Agents | Code w/ Claude',
      url: 'https://sozai.app/transcript/prompting-agents-code-claude/',
    },
    {
      label: 'eWeek: 10 clever tips to get better answers from ChatGPT (Dec 2025)',
      url: 'https://www.eweek.com/news/10-clever-chatgpt-tips/',
    },
  ],
  faqs: [
    {
      q: 'How do I get better answers from ChatGPT?',
      a: 'Give it your context and the documents, say what a good answer looks like, set the format, and switch on thinking for hard problems or web search for recent facts. Then ask it to check its answer against your criteria and revise.',
    },
    {
      q: 'Should I use a thinking model for everything?',
      a: 'No. Thinking models are slower and cost more, because their hidden reasoning is billed. Use them for maths, code, planning and careful comparisons, and a fast model for quick rewrites, summaries and simple questions.',
    },
    {
      q: 'What does temperature do in ChatGPT or Claude?',
      a: 'Temperature is an API setting that controls how random the word choices are: 0 gives near-identical answers, higher gives more variety. You cannot set it in the normal chat apps, and many of the newest models fix it, so effort or thinking settings matter more today.',
    },
  ],
  related: [
    { label: 'Previous: Prompting techniques that work', href: '/learn-ai/prompt-engineering' },
    { label: 'Next: Context engineering', href: '/learn-ai/context-engineering' },
    { label: 'Reasoning models and thinking', href: '/learn-ai/reasoning-models' },
    { label: 'ChatGPT vs Claude vs Gemini', href: '/learn-ai/choosing-an-ai-model' },
    { label: 'Tool calling (function calling)', href: '/learn-ai/tool-calling' },
    { label: 'What is MCP?', href: '/learn-ai/what-is-mcp' },
    { label: 'AI engineer guide', href: '/ai-engineer' },
  ],
  fromTheSource: [
    {
      who: 'Andrej Karpathy',
      role: 'OpenAI founding member, former director of AI at Tesla, and one of the clearest teachers of how LLMs work.',
      work: 'How I use LLMs (video, 2025)',
      url: 'https://www.youtube.com/watch?v=EWvNQjAaOHw',
      idea: 'In a practical tour of his own habits, Karpathy treats every chatbot feature as a choice: which model and pricing tier, whether to switch on thinking, whether to give it search, files or a Python tool, and when to start a fresh chat.',
      breakdown: [
        'Know which model you are talking to. Free and paid tiers differ, and he compares answers from several models, which he calls his “LLM council”.',
        'Thinking models are for hard problems such as tricky debugging; fast models for everyday questions. In one example a fast model failed a bug that a thinking model then solved.',
        'Tools close the gaps: search for recent information (check the citations), file uploads for documents, a Python interpreter for calculations.',
        'Start a new chat when you switch topics, so old text in the context does not get in the way.',
      ],
      use: 'Before you retype a prompt, ask which feature is missing: the right model, thinking, search, a file or a clean chat. Often one switch fixes the answer.',
    },
    {
      who: 'OpenAI',
      role: 'The company behind ChatGPT. Its developer guide explains how its reasoning models differ from its fast models and how to prompt each.',
      work: 'Reasoning best practices (developer guide)',
      url: 'https://developers.openai.com/api/docs/guides/reasoning-best-practices',
      idea: 'OpenAI splits its models into “the planners” (reasoning models that think longer on complex, ambiguous problems) and “the workhorses” (faster, cheaper models for straightforward execution), and says neither is better overall.',
      breakdown: [
        'Reach for a reasoning model when accuracy and reliability matter more than speed and cost, or the task has many steps.',
        'Keep the prompt simple and direct. Skip “think step by step”; the model already reasons inside.',
        'Try zero examples first, and add examples only if the output needs more structure.',
        'Be very specific about the end goal and the limits, so the model knows when it is done.',
      ],
      use: 'Use a fast model to draft and a reasoning model to plan, decide or check. With the reasoning model, spend your words on the goal and criteria, not on telling it how to think.',
    },
  ],
}
