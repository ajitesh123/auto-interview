import type { Lesson } from '../types'

export const lesson: Lesson = {
  slug: 'choosing-an-ai-model',
  track: 'use',
  order: 10,
  title: 'ChatGPT vs Claude vs Gemini',
  metaTitle: 'ChatGPT vs Claude vs Gemini: Which AI Should You Use?',
  metaDescription:
    'ChatGPT vs Claude vs Gemini as of Nov 2026: free vs paid plans, prices in USD and INR, reasoning models, and which AI to pick for each task, plus Perplexity.',
  h1: 'ChatGPT vs Claude vs Gemini: which AI should you use?',
  tldr: 'As of November 2026, ChatGPT, Claude and Gemini are all strong, all have free plans, and their main paid plans cost about $20 a month in the US. None is best at everything, so choose by task: Gemini if you live in Google apps, ChatGPT for the widest set of built-in tools, Claude for long writing and coding work, and Perplexity when you need sources. The best test is to run your own task in two of them and compare.',
  minutes: 11,
  level: 'Beginner',
  steps: [
    {
      heading: 'First, they are more alike than different',
      body: [
        'All three are large language models wrapped in a chat app. All three can write, summarise, explain, and work with files and images you upload. For everyday tasks like an email, a study plan or explaining a concept, any of them will do a good job if your prompt is clear.',
        'The differences show up at the edges: which apps they connect to, how much you can use them for free, and which extra tools come built in. Model names and plans also change every few months, so everything below is stated as of November 2026, taken from each company’s own pages.',
      ],
      keyIdea: 'A clear prompt matters more than which brand you open.',
    },
    {
      heading: 'What do the free plans give you? (as of Nov 2026)',
      body: [
        'Start free. Each free plan is enough to learn on and to do real work most days. You only need to pay when you keep hitting limits or need a specific feature.',
      ],
      example: {
        label: 'Free plans compared (from official plan pages, Nov 2026)',
        text: `ChatGPT Free (chatgpt.com)
- Models: GPT-6 Luna and GPT-5 Thinking Mini
- Includes image creation, voice, deep research, memory, file uploads (limited)

Claude Free (claude.ai)
- Models: Claude Sonnet and Haiku
- Includes web search, file creation, code execution, memory, Artifacts
- Usage limits reset every 5 hours and every week

Gemini Free (gemini.google.com, with a Google account)
- Model: Gemini Flash-Lite
- Includes image generation and editing, Deep Research, Gemini Live (voice), Canvas, Gems, 15 GB storage`,
      },
    },
    {
      heading: 'What do the paid plans cost? (as of Nov 2026)',
      body: [
        'The standard paid tier from each company sits near $20 a month in the US. Each has cheaper and much more expensive options too. Prices vary by country, so always check the official page before you pay.',
        'Indian students: Google offers eligible university students aged 18 and over a Gemini student plan free for one year, which you can redeem until 31 December 2026.',
      ],
      example: {
        label: 'Paid plans (official prices, Nov 2026)',
        text: `ChatGPT
- Go: cheaper plan with more messages; may include ads
- Plus: $20/month, adds advanced reasoning models, more models (such as GPT-6 Astra), projects, custom GPTs
- Pro: three higher usage tiers for heavy research and coding

Claude
- Pro: $20/month ($17/month billed yearly), adds Claude Opus and Claude Code
- Max: $100/month (5x Pro usage), Ultra: $200/month

Gemini (US / India)
- AI Plus: $4.99 / ₹399 per month, includes Gemini 4 Argon
- AI Pro: $19.99 / ₹1,950 per month, adds Gemini in Gmail and Docs, 5 TB storage
- AI Ultra: from $99.99 / ₹6,500 per month`,
      },
      keyIdea: 'Pay only after a free plan has proven useful and you keep hitting its limits.',
    },
    {
      heading: 'What are reasoning (thinking) models?',
      body: [
        'A reasoning model takes extra time to work through a problem before it replies, a bit like doing rough work before writing the final answer. That makes it better at maths, coding, debugging and multi-step planning, but slower.',
        'All three companies now offer them. ChatGPT lists “advanced reasoning models” in Plus and a GPT-5 Thinking Mini model on Free. Anthropic’s current Claude models use “adaptive thinking”, deciding how much to think. Google calls Gemini 4 Argon its flagship reasoning model.',
      ],
      bullets: [
        'Use a reasoning model for: maths, code bugs, comparing job offers, complex plans',
        'Use a fast model for: rewriting, short emails, quick facts, brainstorming',
        'If an answer feels shallow, switch to the thinking option and ask again',
      ],
    },
    {
      heading: 'The others: Perplexity, Llama and DeepSeek',
      body: [
        'Perplexity describes itself as an AI-powered search engine. It searches the web in real time as you ask and shows citations with links, which makes it handy for current facts and quick research where you want to check sources.',
        'Meta’s Llama and DeepSeek’s models are “open” families: the companies publish models that developers can download and run on their own computers or servers. Meta lists Llama 4, Llama 3 and Llama 2 on Hugging Face and Kaggle under its own licence, and DeepSeek says it open-sources models including DeepSeek-V4 and DeepSeek-R1. These matter most once you start building, in the next track.',
      ],
    },
    {
      heading: 'So which one should I use? Pick by task',
      body: [
        'Use the table below as a starting point, not a rule. The single best habit is a side-by-side test: paste the same prompt into two chatbots and keep the one whose answer you would actually use. Retest every few months, because rankings change quickly.',
      ],
      example: {
        label: 'Where to start, by task (Nov 2026)',
        text: `Your work lives in Gmail, Docs, Drive  ->  Gemini
Need sources and links to check         ->  Perplexity, or Deep Research in ChatGPT / Gemini
Images and voice in one app              ->  ChatGPT (both on Free) or Gemini
Long writing, documents, coding projects ->  Claude (Pro adds Claude Code) or ChatGPT
Hard maths or debugging                  ->  any reasoning / thinking model
Private data on your own machine         ->  open models (Llama, DeepSeek), needs a strong computer`,
        code: true,
      },
      keyIdea: 'Choose by task, test two side by side, and recheck in six months.',
    },
  ],
  keyTerms: [
    {
      term: 'Model',
      meaning:
        'The AI system behind a chat app, such as GPT-6 Luna, Claude Sonnet or Gemini Flash. One app can offer several models.',
    },
    {
      term: 'Free tier / usage limit',
      meaning: 'The no-cost plan and the cap on how much you can use it in a time window.',
    },
    {
      term: 'Reasoning (thinking) model',
      meaning:
        'A model that works through a problem step by step before answering. Better at hard problems, slower.',
    },
    {
      term: 'Open model (open-weight)',
      meaning:
        'A model whose files are published so you can download and run it yourself, like Llama or DeepSeek.',
    },
    {
      term: 'Citations',
      meaning: 'Links or references showing where an answer came from, so you can check it.',
    },
  ],
  videos: [
    {
      youtubeId: 'EWvNQjAaOHw',
      title: 'How I use LLMs',
      channel: 'Andrej Karpathy',
      minutes: 131,
      why: 'Karpathy tours the chatbot landscape, explains thinking models and shows when he picks which tool. Watch the first 40 minutes for this lesson.',
    },
  ],
  tryIt: {
    title: 'Run a 10-minute side-by-side test',
    steps: [
      'Pick one real task from your week, for example: “Explain compound interest to a Class 10 student with an example in rupees” or “Write a cover letter opening for a data analyst role”.',
      'Paste the exact same prompt into ChatGPT, Claude and Gemini (free plans are fine).',
      'Score each answer from 1 to 5 on: correct, clear, useful as-is.',
      'Ask one follow-up in each (“make it shorter and add one more example”) and score again.',
      'Write down which one won for this kind of task. Repeat with a different task type next week.',
    ],
    link: { label: 'Open Gemini (free)', url: 'https://gemini.google.com' },
  },
  check: [
    {
      q: 'You need to answer a tricky probability question for an exam. What is the best choice?',
      options: [
        'The fastest, smallest model',
        'A reasoning (thinking) model',
        'An image generator',
        'Whichever app has the nicest design',
      ],
      answer: 1,
      why: 'Reasoning models work through the steps before answering, which helps most on maths and multi-step problems.',
    },
    {
      q: 'Which tool is designed around searching the web and showing citations for each answer?',
      options: ['Llama', 'Perplexity', 'DeepSeek-R1', 'Claude Haiku'],
      answer: 1,
      why: 'Perplexity describes itself as an AI-powered search engine that sources content from the web in real time and links to original sources.',
    },
    {
      q: 'What is the most reliable way to choose between ChatGPT, Claude and Gemini for your work?',
      options: [
        'Use whichever brand your friends use',
        'Always buy the most expensive plan',
        'Run the same real task in two or three of them and compare the results',
        'Pick the one with the newest model name',
      ],
      answer: 2,
      why: 'Strengths differ by task and change often. A side-by-side test on your own work is the most honest comparison.',
    },
  ],
  fromTheSource: [
    {
      who: 'Jared Kaplan, Sam McCandlish, Dario Amodei and seven co-authors at OpenAI',
      role: 'Kaplan, McCandlish, Amodei and co-author Tom Brown later co-founded Anthropic, the company behind Claude.',
      work: 'Scaling Laws for Neural Language Models (2020)',
      url: 'https://arxiv.org/abs/2001.08361',
      idea: 'They found that a language model’s error falls in a smooth, predictable way as you increase three things: model size, training data and compute. Details like the exact shape of the network mattered much less.',
      breakdown: [
        'Bigger models trained on more data with more compute predict text better, and some of these trends held across a range of more than ten million times.',
        'Larger models also learn more from each example they see, which gave labs a clear reason to keep scaling up.',
        'This helps explain why model families come in sizes: larger ones cost more to run and usually do better on hard tasks, while smaller ones are faster and cheaper.',
      ],
      use: 'Match the model size to the job. A small, fast model is fine for rewriting and quick questions; save the largest model on your plan for hard analysis, long documents and tricky code.',
    },
    {
      who: 'OpenAI',
      role: 'Introduced o1, its first reasoning model, in September 2024. Anthropic and Google have since added their own thinking models.',
      work: 'Learning to reason with LLMs (September 12, 2024)',
      url: 'https://openai.com/index/learning-to-reason-with-llms/',
      idea: 'OpenAI reported that o1 gets better both with more reinforcement learning during training and with more time spent thinking before it answers. It works through a chain of thought and learns to spot and correct its own mistakes.',
      breakdown: [
        'A second dial: besides model size, you can now spend more computing at answer time by letting the model think longer.',
        'Thinking helps most on maths, code and logic, where steps can be checked.',
        'It is not better at everything: in OpenAI’s tests, people did not prefer it over GPT-4o on some natural language tasks.',
      ],
      use: 'Switch on the thinking or reasoning option for hard maths, debugging and multi-step plans. Keep a fast model for emails, rewrites and quick questions, where extra thinking mostly adds waiting time.',
    },
  ],
  sources: [
    { label: 'ChatGPT: Plans and pricing', url: 'https://chatgpt.com/pricing' },
    {
      label: 'OpenAI Help: What is ChatGPT Plus?',
      url: 'https://help.openai.com/en/articles/6950777-what-is-chatgpt-plus',
    },
    { label: 'Claude: Pricing', url: 'https://claude.com/pricing' },
    {
      label: 'Anthropic: Models overview',
      url: 'https://platform.claude.com/docs/en/about-claude/models/overview',
    },
    { label: 'Google Gemini: Subscriptions (US)', url: 'https://gemini.google/subscriptions/' },
    {
      label: 'Google Gemini: Subscriptions (India)',
      url: 'https://gemini.google/in/subscriptions/?hl=en',
    },
    {
      label: 'Google Gemini: Student offer (India)',
      url: 'https://gemini.google/in/students/?hl=en',
    },
    {
      label: 'Google AI for Developers: Gemini models',
      url: 'https://ai.google.dev/gemini-api/docs/models',
    },
    {
      label: 'DeepLearning.AI The Batch: GPT-6.1 Sol and GPT-6 Astra',
      url: 'https://www.deeplearning.ai/the-batch/sol-nearly-eclipses-astra',
    },
    {
      label: 'Perplexity Help Center: What is Perplexity?',
      url: 'https://www.perplexity.ai/help-center/en/articles/10352155-what-is-perplexity',
    },
    { label: 'Meta: Llama documentation', url: 'https://dev.meta.ai/llama/' },
    { label: 'DeepSeek: Official site', url: 'https://www.deepseek.com/en' },
    {
      label: 'Kaplan et al. (2020): Scaling Laws for Neural Language Models',
      url: 'https://arxiv.org/abs/2001.08361',
    },
    {
      label: 'OpenAI (Sep 12, 2024): Learning to reason with LLMs',
      url: 'https://openai.com/index/learning-to-reason-with-llms/',
    },
    { label: 'Wikipedia: Anthropic (founders)', url: 'https://en.wikipedia.org/wiki/Anthropic' },
  ],
  faqs: [
    {
      q: 'Which is better: ChatGPT, Claude or Gemini?',
      a: 'None is best at everything. As of November 2026, Gemini fits best if you work in Google apps, ChatGPT bundles the widest range of tools, and Claude is a strong pick for long writing and coding. Test your own task in two of them.',
    },
    {
      q: 'Is ChatGPT Plus worth it compared with the free plan?',
      a: 'Plus costs $20 a month and adds advanced reasoning models, higher limits, projects and custom GPTs. If the free plan handles your tasks and you rarely hit limits, stay free. Upgrade when limits or missing models slow you down.',
    },
    {
      q: 'What is the best free AI chatbot?',
      a: 'ChatGPT, Claude and Gemini all have capable free plans, and Perplexity is a good free choice for searching with sources. Students in India can also check Google’s free one-year Gemini student plan, open until 31 December 2026.',
    },
  ],
  related: [
    { label: 'Previous: Why AI makes things up', href: '/learn-ai/ai-hallucinations' },
    { label: 'Next: What is an API?', href: '/learn-ai/what-is-an-api' },
    { label: 'Your first prompt', href: '/learn-ai/first-prompt' },
    { label: 'Claude Code vs Cursor vs Codex', href: '/learn-ai/ai-coding-tools-compared' },
    { label: 'AI product manager guide', href: '/aipm' },
    { label: 'Free AI skills resources', href: '/free-resources#ai-skills' },
  ],
}
