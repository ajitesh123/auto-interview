import type { Lesson } from '../types'

export const lesson: Lesson = {
  slug: 'what-is-an-api',
  track: 'build',
  order: 11,
  title: 'What is an API?',
  metaTitle: 'What Is an API? Explained Simply, With AI Examples',
  metaDescription:
    'What is an API? A plain-English guide with a restaurant waiter analogy, a real AI API request and response, why API keys stay secret, and what each call costs.',
  h1: 'What is an API? A simple explanation, and how apps talk to AI',
  tldr: 'An API (application programming interface) is a set of requests one program can make to another, plus the rules for asking. When an app uses Claude, ChatGPT or Gemini behind the scenes, it sends a request to the model’s API over the internet and gets a response back. You prove who you are with a secret API key, and you pay for the tokens you send and receive.',
  minutes: 9,
  level: 'Beginner',
  steps: [
    {
      heading: 'So what is an API, in one picture?',
      body: [
        'Think of a restaurant. You don’t walk into the kitchen and cook. You read the menu, tell the waiter what you want, and the waiter brings your food back. The menu tells you what you can ask for. The waiter carries your order in and the answer out.',
        'An API works the same way between two programs. One program (your app) asks. The other (a bank, a map service, an AI model) does the work and replies. MDN, the web’s main reference, calls an API "a simple contract" between the program offering it and the programs using it.',
        'You already use APIs every day. When you pay with a UPI app, the app does not own your bank account. It sends a request in a format every bank agrees on, and your bank sends back "success" or "failed".',
      ],
      flow: [
        'You (the customer)',
        'Waiter (the API)',
        'Kitchen (the system)',
        'Food comes back (the response)',
      ],
      keyIdea:
        'An API is a contract: ask in the agreed format, and you get an answer in the agreed format.',
    },
    {
      heading: 'How does an app talk to an AI model?',
      body: [
        'Most AI apps you see, like a resume helper or a study bot, do not have their own model. They send your text to a model provider such as Anthropic (Claude), OpenAI (GPT) or Google (Gemini) through that provider’s API.',
        'The request says which model to use, what the user wrote, and how long the answer may be. The response carries the model’s text plus a count of tokens used. Both are written in JSON, a simple text format of labels and values inside curly braces, like {"city": "Pune"}.',
      ],
      flow: [
        'Your app',
        'Request (JSON + API key)',
        'Model on the provider’s servers',
        'Response (JSON)',
        'Your app shows the answer',
      ],
    },
    {
      heading: 'What does a real request look like?',
      body: [
        'Here is a request to Anthropic’s Messages API, trimmed to the parts that matter. The first line is the address (the endpoint). The next lines are headers: your key and the API version. Then comes the JSON body.',
        'Read it like an order slip: which model, the most tokens the answer may use (max_tokens), and the conversation so far. Each message has a role ("user" for you, "assistant" for the model) and content.',
      ],
      example: {
        label: 'A request to an AI model (Anthropic Messages API)',
        code: true,
        text: 'POST https://api.anthropic.com/v1/messages\nAuthorization: Bearer YOUR_SECRET_KEY\nanthropic-version: 2026-10-21\n\n{\n  "model": "claude-opus-5-5",\n  "max_tokens": 1024,\n  "messages": [\n    { "role": "user", "content": "Hello, Claude" }\n  ]\n}',
      },
    },
    {
      heading: 'What comes back, and what does it cost?',
      body: [
        'The reply is JSON too. The answer sits inside "content". The "usage" part tells you how many tokens went in and came out. That count is your bill. (New to tokens? See the lesson on tokens and context windows.)',
        'Providers price input and output tokens separately, per million tokens. In November 2026, Anthropic lists Claude Sonnet 5.5 at $2 per million input tokens and $10 per million output tokens. So a call with 1,000 tokens in and 500 out costs $0.002 + $0.005 = $0.007, less than one rupee. Ten thousand such calls a day is about $70. Prices change, so always check the provider’s pricing page.',
      ],
      example: {
        label: 'The response (from Anthropic’s docs)',
        code: true,
        text: '{\n  "id": "msg_01XFDUDYJgAACzvnptvVoYEL",\n  "type": "message",\n  "role": "assistant",\n  "content": [\n    { "type": "text", "text": "Hello!" }\n  ],\n  "model": "claude-opus-5-5",\n  "stop_reason": "end_turn",\n  "usage": { "input_tokens": 12, "output_tokens": 6 }\n}',
      },
      keyIdea: 'You pay per token, and output tokens usually cost more than input tokens.',
    },
    {
      heading: 'What is an API key, and why must you hide it?',
      body: [
        'An API key is a long secret string that tells the provider "this request is from me, bill my account". Anyone who copies your key can make calls that you pay for. It is like your UPI PIN and your signature rolled into one.',
        'That is why the key must live on a server you control, never inside a website’s JavaScript or a mobile app where anyone can dig it out. Anthropic’s guidance on keeping keys safe boils down to these habits:',
      ],
      bullets: [
        'Never share your key, in chats, screenshots or emails. Each person gets their own.',
        'Load it from an environment variable, not typed into your code.',
        'Never commit a key to GitHub. Keep .env files out of your repository.',
        'Rotate keys on a schedule, for example every 90 days, and delete old ones.',
        'Turn on secret scanning so leaked keys are caught early.',
      ],
      keyIdea:
        'Treat an API key like a password that spends money. If it leaks, delete it and make a new one.',
    },
  ],
  keyTerms: [
    {
      term: 'API',
      meaning:
        'Application programming interface: the agreed set of requests one program can make to another, and the format of the replies.',
    },
    {
      term: 'Endpoint',
      meaning:
        'The web address you send a request to, such as https://api.anthropic.com/v1/messages.',
    },
    {
      term: 'JSON',
      meaning:
        'A simple text format for data, made of labels and values inside curly braces. Almost all AI APIs use it.',
    },
    {
      term: 'API key',
      meaning:
        'A secret string that identifies you to the provider and decides who gets billed. Keep it private.',
    },
    {
      term: 'Token',
      meaning:
        'A small chunk of text (often part of a word). AI APIs count and charge by tokens in and tokens out.',
    },
    {
      term: 'Environment variable',
      meaning:
        'A setting stored outside your code, used to keep secrets like API keys out of files you share.',
    },
  ],
  videos: [
    {
      youtubeId: 's7wmiS2mSXY',
      title: 'What is an API? (in 3 minutes)',
      channel: 'MuleSoft Videos',
      minutes: 3,
      why: 'The classic waiter analogy in three minutes. Watch it first, then come back to see how the same idea works for AI models.',
    },
  ],
  tryIt: {
    title: 'Make your first API call from your phone',
    steps: [
      'Open the link below in your browser. It calls the free Open-Meteo weather API for Mumbai. What you see is the raw JSON response.',
      'Find "temperature_2m" inside "current". That is the live temperature. Everything else is labels and units.',
      'Change the latitude and longitude in the address bar to your city (search "<your city> latitude longitude") and reload. You just changed the request and got a new response.',
      'Notice there was no key. This weather API is public. AI APIs need a key because every call costs the provider money.',
      'Optional: in Google AI Studio, type a prompt, run it, then look for the "Get code" option. It shows the exact API request behind your prompt. Spot the model name, your text and where the key goes.',
    ],
    link: {
      label: 'Open-Meteo: current temperature in Mumbai',
      url: 'https://api.open-meteo.com/v1/forecast?latitude=19.07&longitude=72.88&current=temperature_2m',
    },
  },
  check: [
    {
      q: 'In the restaurant analogy, what plays the role of the API?',
      options: ['The kitchen', 'The waiter and the menu', 'The food', 'The customer'],
      answer: 1,
      why: 'The API is the go-between with fixed rules: the menu says what you can ask for and the waiter carries requests and replies. The kitchen is the system doing the work.',
    },
    {
      q: 'An AI API response shows "input_tokens": 12 and "output_tokens": 6. What is this for?',
      options: [
        'It shows how fast the model replied',
        'It counts the tokens you are billed for, in and out',
        'It is the number of users online',
        'It is the model’s confidence score',
      ],
      answer: 1,
      why: 'Usage counts are how providers bill you. Input and output tokens are priced separately, and output usually costs more.',
    },
    {
      q: 'You are building a website that calls an AI model. Where should the API key live?',
      options: [
        'In the JavaScript that runs in the visitor’s browser',
        'In a public GitHub repository so teammates can find it',
        'In an environment variable on your own server',
        'In the page’s HTML, hidden with CSS',
      ],
      answer: 2,
      why: 'Anything sent to the browser can be read by visitors. Keep the key on your server, loaded from an environment variable, and have the browser talk to your server instead.',
    },
  ],
  fromTheSource: [
    {
      who: 'Greg Brockman, Mira Murati and Peter Welinder (OpenAI)',
      role: 'Authors of the June 2020 post that opened OpenAI’s first model API to outside developers. Brockman is an OpenAI co-founder.',
      work: 'OpenAI API (blog post, June 2020)',
      url: 'https://openai.com/index/openai-api/',
      idea: 'Instead of handing out the model, OpenAI offered it through an API with a general-purpose "text in, text out" interface. They gave three reasons: selling access pays for research, the models are too big and costly for most people to run, and a hosted API lets them stop misuse.',
      breakdown: [
        '"Text in, text out" is the whole contract. You send text, the model sends text back. That is still the shape of every AI API today.',
        'The model stays on the provider’s computers. You rent its work one request at a time, which is why you need a key and pay per use.',
        'Because the provider controls access, it can change prices, retire old models or block a key. Your app depends on their rules.',
      ],
      use: 'Treat every AI feature you build as "my text goes out, their text comes back". Keep your key on your server and check the provider’s model and pricing pages before you rely on them.',
    },
    {
      who: 'Andrej Karpathy',
      role: 'Founding member of OpenAI and former director of AI at Tesla, known for clear teaching videos on how LLMs work.',
      work: '[1hr Talk] Intro to Large Language Models (talk, 2023)',
      url: 'https://www.youtube.com/watch?v=zjkBMFhNj_g',
      idea: 'Karpathy describes an LLM as the core of a new kind of operating system. The model is like the kernel, its context window is like working memory (RAM), and tools such as search, a calculator or Python are like devices it can plug into.',
      breakdown: [
        'Kernel: the model is the part that thinks and decides. Everything else is arranged around it.',
        'RAM: the model only "sees" what is in its context window right now. When you call an API, that means only what is inside your request.',
        'Devices: tools let the model reach things it cannot do alone, like live data or exact maths.',
        'He also compares closed models (like GPT and Claude) and open models (like Llama) to the split between Windows and macOS on one side and Linux on the other.',
      ],
      use: 'When you call an AI API, remember you are filling the model’s working memory. With a Messages-style API like Anthropic’s, you send the whole conversation and any facts it needs in each request, because the model only works with what that request contains.',
    },
  ],
  sources: [
    {
      label: 'MDN Web Docs: API (glossary)',
      url: 'https://developer.mozilla.org/en-US/docs/Glossary/API',
    },
    {
      label: 'Anthropic docs: Working with the Messages API',
      url: 'https://platform.claude.com/docs/en/build-with-claude/working-with-messages',
    },
    {
      label: 'Anthropic API reference: Create a message',
      url: 'https://platform.claude.com/docs/en/api/messages/create',
    },
    {
      label: 'Anthropic docs: Get started with Claude',
      url: 'https://platform.claude.com/docs/en/get-started',
    },
    {
      label: 'Anthropic docs: Pricing',
      url: 'https://platform.claude.com/docs/en/about-claude/pricing',
    },
    {
      label: 'Claude Help Center: API key best practices',
      url: 'https://support.claude.com/en/articles/9767949-api-key-best-practices-keeping-your-keys-safe-and-secure',
    },
    { label: 'OpenAI: OpenAI API (June 2020)', url: 'https://openai.com/index/openai-api/' },
    {
      label: 'Andrej Karpathy: [1hr Talk] Intro to Large Language Models (YouTube)',
      url: 'https://www.youtube.com/watch?v=zjkBMFhNj_g',
    },
  ],
  faqs: [
    {
      q: 'What is an API in simple terms?',
      a: 'An API is a way for one program to ask another program for something, using fixed rules. Like ordering from a waiter with a menu: you ask in the agreed format, and you get a reply in the agreed format, without seeing how the kitchen works.',
    },
    {
      q: 'What is an API key?',
      a: 'An API key is a secret string you send with each request so the provider knows who is calling and whom to bill. Anyone with your key can spend your credits, so keep it on your server, out of code you share, and rotate it regularly.',
    },
    {
      q: 'How much does it cost to use an AI API?',
      a: 'AI APIs charge per token, with separate prices for input and output, quoted per million tokens. For example, in November 2026 Anthropic lists Claude Sonnet 5.5 at $2 per million input and $10 per million output tokens, so a short call costs a fraction of a rupee. Check the provider’s pricing page for current rates.',
    },
  ],
  related: [
    {
      label: 'Previous: Connectors: Gmail, Drive and Slack in AI',
      href: '/learn-ai/ai-connectors',
    },
    { label: 'Tokens and context windows', href: '/learn-ai/tokens-and-context-window' },
    { label: 'Next: Tool calling (function calling)', href: '/learn-ai/tool-calling' },
    { label: 'AI engineer career guide', href: '/ai-engineer' },
    { label: 'Free AI skills resources', href: '/free-resources#ai-skills' },
  ],
}
