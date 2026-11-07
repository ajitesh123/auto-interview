import type { Lesson } from '../types'

export const lesson: Lesson = {
  slug: 'what-is-an-llm',
  track: 'foundations',
  order: 3,
  title: 'What is an LLM?',
  metaTitle: 'What Is an LLM? Large Language Models Explained Simply',
  metaDescription:
    'What is a large language model? Learn next-token prediction, parameters and training data in plain English, and why ChatGPT and Claude seem to understand you.',
  h1: 'What is a large language model (LLM)? Explained simply',
  tldr: 'A large language model (LLM) is an AI model that has read a huge amount of text and learned to predict the next piece of text, one small chunk at a time. ChatGPT, Claude and Gemini are all built on LLMs. By repeating that one simple step thousands of times, an LLM can write essays, answer questions and write code, though it can also confidently make things up.',
  minutes: 10,
  level: 'Beginner',
  steps: [
    {
      heading: 'So what does an LLM actually do?',
      body: [
        'At its core, an LLM does one thing: given some text, it predicts what comes next. Your phone keyboard does a tiny version of this when it suggests the next word. An LLM does the same job, but trained on far more text and with a far bigger model.',
        'It does not pick one word directly. It gives a probability (a likelihood score) to every possible next piece of text, called a token. It picks one, adds it to the text, and repeats. A full answer is just this loop running hundreds of times.',
      ],
      flow: [
        'Your text',
        'Score every possible next token',
        'Pick one',
        'Add it to the text',
        'Repeat',
      ],
      example: {
        label: 'Next-token prediction (from Andrej Karpathy’s talk)',
        text: 'Input: “cat sat on a”\nThe model scores possible next words. “mat” might get about 97%, and words like “chair” or “roof” get much smaller scores.\nPick “mat”, add it, and predict again.',
      },
      keyIdea:
        'An LLM is a very powerful “predict the next token” machine. Everything else is built on that.',
    },
    {
      heading: 'What makes it “large”? Parameters',
      body: [
        'Inside an LLM are billions of numbers called parameters. Think of them as tiny tuning knobs. During training, each knob is nudged again and again until the model gets better at predicting the next token. Nobody sets them by hand.',
        'GPT-3 (2020) had 175 billion parameters. Meta’s open model Llama 2 70B has 70 billion. In his talk, Karpathy points out that this model is basically two files: a 140 GB file of parameters and a small program that runs them.',
      ],
      example: {
        label: 'Why 140 GB?',
        text: '70,000,000,000 parameters × 2 bytes each = 140,000,000,000 bytes ≈ 140 GB',
      },
    },
    {
      heading: 'Where does it learn from? Training data',
      body: [
        'LLMs learn from huge collections of text: web pages, books, code and more. For Llama 2 70B, Karpathy estimates about 10 TB of text, around 6,000 GPUs running for about 12 days, at a cost of roughly $2 million. Labs rarely publish these numbers for their newest models.',
        'Karpathy compares training to compressing the internet into that parameter file. It is a lossy compression, like a blurry photo. The model keeps the general patterns and many facts, but not a perfect copy. That is why it can be wrong about details, and why it does not know about events after its training data was collected (its “knowledge cutoff”) unless the app gives it web search.',
      ],
      flow: ['About 10 TB of text', 'Thousands of GPUs for days', '140 GB of parameters'],
    },
    {
      heading: 'From autocomplete to assistant',
      body: [
        'A model fresh from this first training stage is called a base model. It just continues text. Ask it a question and it may continue with more questions, as if it were completing a quiz page from the internet.',
        'To turn it into a helpful assistant, companies train it further on example conversations and on human feedback about which answers are better. OpenAI built ChatGPT this way from a GPT-3.5 model. You will see exactly how in lesson 6.',
      ],
    },
    {
      heading: 'Why does it seem to understand?',
      body: [
        'To predict the next word well across billions of pages, a model has to pick up grammar, facts, and common patterns of reasoning. Research suggests it learns more than surface word patterns. In 2025 Anthropic looked inside Claude and found it plans a rhyming word before writing a line of poetry, and links facts in steps: for “the capital of the state where Dallas is”, it first gets to Texas, then to Austin.',
        'But the same research found Claude sometimes writes plausible-sounding reasoning that does not match what it actually did inside. The researchers say plainly that “we don’t understand how models do most of the things they do.” So treat an LLM like a very well-read helper who can still be confidently wrong, and check anything important.',
      ],
      keyIdea:
        'LLMs learn real patterns, not just word lists, but they produce likely text, not checked facts.',
    },
  ],
  keyTerms: [
    {
      term: 'Large language model (LLM)',
      meaning:
        'An AI model trained on huge amounts of text to predict the next token. ChatGPT, Claude and Gemini run on LLMs.',
    },
    {
      term: 'Token',
      meaning:
        'A small chunk of text, often a word or part of a word, that the model reads and writes. Covered in the next lesson.',
    },
    {
      term: 'Parameter',
      meaning:
        'One of the billions of adjustable numbers inside the model that training tunes. More parameters means a bigger model.',
    },
    {
      term: 'Training data',
      meaning: 'The text the model learned from, such as web pages, books and code.',
    },
    {
      term: 'Base model',
      meaning:
        'A model straight out of pretraining. It continues text but does not reliably follow instructions.',
    },
    {
      term: 'Knowledge cutoff',
      meaning:
        'The date after which the model has no training data, so it does not know newer events unless given search.',
    },
  ],
  videos: [
    {
      youtubeId: 'LPZh9BOjkQs',
      title: 'Large Language Models explained briefly',
      channel: '3Blue1Brown',
      minutes: 8,
      why: 'The best 8-minute visual explanation of next-word prediction, parameters and training. Watch this first.',
    },
    {
      youtubeId: 'zjkBMFhNj_g',
      title: '[1hr Talk] Intro to Large Language Models',
      channel: 'Andrej Karpathy',
      minutes: 60,
      why: 'Karpathy’s classic beginner talk. Watch the first 18 minutes (up to “Summary so far”) for the two-files idea, training cost and how an assistant is made.',
    },
  ],
  tryIt: {
    title: 'Watch next-token prediction in action',
    steps: [
      'Open ChatGPT, Claude or Gemini (all have free versions).',
      'Type: “Give me 5 likely next words for this sentence and rate how likely each one is: ‘Virat hit the ball over the …’”. Note: the percentages it gives are its guess, not its real internal scores, but they show the idea.',
      'Start a new chat and ask the same question again. Notice the answer is worded differently. The model samples from probabilities, so replies vary.',
      'Ask: “What is your knowledge cutoff date?” Then ask about something from yesterday’s news with web search turned off, if your app lets you. See how it handles not knowing.',
      'Ask it a fact you know well, like your city’s pin code or a cricket record. Was it right? This is why you check important answers.',
    ],
    link: { label: 'Open Gemini (free)', url: 'https://gemini.google.com' },
  },
  check: [
    {
      q: 'When an LLM writes a reply, what is it doing at each step?',
      options: [
        'Looking up the full answer in a database',
        'Predicting a likely next token, adding it, and repeating',
        'Searching Google and copying a page',
        'Running a hand-written rule for that question',
      ],
      answer: 1,
      why: 'An LLM generates text one token at a time. Each step scores all possible next tokens, picks one and feeds the longer text back in.',
    },
    {
      q: 'What is a parameter in an LLM?',
      options: [
        'A setting you type into the chat box',
        'One of the billions of numbers inside the model that training adjusts',
        'A rule written by an engineer',
        'A web page in the training data',
      ],
      answer: 1,
      why: 'Parameters are the learned numbers inside the model. Training nudges them to make better predictions. GPT-3 had 175 billion of them.',
    },
    {
      q: 'Why can an LLM give a confident answer that is wrong?',
      options: [
        'Because it is lying on purpose',
        'Because its database is out of date',
        'Because it produces the most likely-sounding text from learned patterns, which is not the same as checking facts',
        'Because it only knows English',
      ],
      answer: 2,
      why: 'The model stores a lossy, compressed version of what it read and generates plausible text. Plausible and true often match, but not always.',
    },
  ],
  fromTheSource: [
    {
      who: 'Andrej Karpathy',
      role: 'A founding member of OpenAI and former director of AI at Tesla. He now runs Eureka Labs, an AI education company.',
      work: '[1hr Talk] Intro to Large Language Models (talk, 2023)',
      url: 'https://www.youtube.com/watch?v=zjkBMFhNj_g',
      idea: 'Karpathy says an LLM is really just two files: a huge file of parameters and a short program that runs them. Training squeezes a large slice of the internet into those parameters, as a lossy compression, and he suggests seeing the LLM less as a chatbot and more as the core of a new kind of operating system.',
      breakdown: [
        'Two files: for Llama 2 70B, a 140 GB parameter file plus about 500 lines of code. Running it is cheap and works offline. Making the parameters is the expensive part.',
        'Compression: about 10 TB of text becomes 140 GB, roughly 100 times smaller. Like a blurry photo, the overall picture survives but fine details can be lost.',
        'Dreaming: when the model writes, it produces text in the style of what it read. Some of it is recalled, and some is invented in the same confident voice.',
        'LLM OS: he pictures the model at the centre, coordinating memory and tools such as a browser, a calculator and a code runner, the way an operating system runs a computer.',
      ],
      use: 'Treat the model’s memory as blurry: for exact facts, paste in the source or turn on web search. And when your app lets the model use tools like search, files or code, use them, because on its own the model is only the compressed file.',
    },
  ],
  sources: [
    {
      label: 'Google for Developers: Introduction to large language models',
      url: 'https://developers.google.com/machine-learning/resources/intro-llms',
    },
    {
      label: 'Brown et al. (2020): Language Models are Few-Shot Learners (GPT-3)',
      url: 'https://arxiv.org/abs/2005.14165',
    },
    { label: 'Touvron et al. (2023): Llama 2', url: 'https://arxiv.org/abs/2307.09288' },
    {
      label: 'Andrej Karpathy (YouTube): [1hr Talk] Intro to Large Language Models',
      url: 'https://www.youtube.com/watch?v=zjkBMFhNj_g',
    },
    {
      label: 'Notes on Karpathy’s Intro to LLMs talk (gist)',
      url: 'https://gist.github.com/anupj/f3a778dcb26972ba72c774634a80d796',
    },
    {
      label: 'OpenAI (Nov 30, 2022): Introducing ChatGPT',
      url: 'https://openai.com/index/chatgpt/',
    },
    {
      label: 'Anthropic (Mar 27, 2025): Tracing the thoughts of a large language model',
      url: 'https://www.anthropic.com/research/tracing-thoughts-language-model',
    },
    {
      label: 'Wikipedia: Generative pre-trained transformer',
      url: 'https://en.wikipedia.org/wiki/Generative_pre-trained_transformer',
    },
  ],
  faqs: [
    {
      q: 'Is ChatGPT an LLM?',
      a: 'ChatGPT is a chat app built on top of LLMs. The LLM is the model that predicts text. ChatGPT adds the chat window, memory features, web search and safety layers around it. The same is true for Claude and Gemini.',
    },
    {
      q: 'What is the difference between AI and an LLM?',
      a: 'AI is the whole field of making machines do “smart” tasks. An LLM is one specific kind of AI: a deep learning model trained on text to predict the next token. All LLMs are AI, but most AI (like a fraud detector) is not an LLM.',
    },
    {
      q: 'What are some examples of LLMs?',
      a: 'OpenAI’s GPT models (used in ChatGPT), Anthropic’s Claude, Google’s Gemini, Meta’s Llama and DeepSeek’s models are well-known LLMs. Some, like Llama, are open-weight, which means anyone can download the parameter files.',
    },
  ],
  related: [
    { label: 'Previous: How AI started', href: '/learn-ai/history-of-ai' },
    { label: 'Next: Tokens and context windows', href: '/learn-ai/tokens-and-context-window' },
    { label: 'How ChatGPT and Claude are trained', href: '/learn-ai/how-llms-are-trained' },
    { label: 'Why AI makes things up', href: '/learn-ai/ai-hallucinations' },
    { label: 'AI engineer career guide', href: '/ai-engineer' },
  ],
}
