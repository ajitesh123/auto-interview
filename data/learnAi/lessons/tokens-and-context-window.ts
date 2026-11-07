import type { Lesson } from '../types'

export const lesson: Lesson = {
  slug: 'tokens-and-context-window',
  track: 'foundations',
  order: 4,
  title: 'Tokens and context windows',
  metaTitle: 'Tokens and Context Window in LLMs, Explained Simply',
  metaDescription:
    'What are tokens and what is a context window in ChatGPT or Claude? See real counts, why long chats forget, and how AI pricing per token works, in plain words.',
  h1: 'Tokens and context windows: how LLMs read text, and why long chats forget',
  tldr: 'LLMs do not read words. They read tokens, small chunks of text that are often a whole word or part of one; in English, 100 tokens is about 75 words. The context window is the maximum number of tokens a model can look at at once, including your messages and its replies. When a chat gets too long, older parts get dropped or summarised, which is why AI seems to “forget”, and every token you send or receive also costs money on an API.',
  minutes: 10,
  level: 'Beginner',
  steps: [
    {
      heading: 'What is a token?',
      body: [
        'Before an LLM sees your message, a tool called a tokenizer chops it into tokens. Common words are usually one token. Rare words, names and long words get split into pieces. Spaces and punctuation are part of tokens too.',
        'We ran a few examples through o200k_base, the tokenizer used by GPT-4o and newer OpenAI models. The | marks show where it cuts.',
      ],
      example: {
        label: 'Real token splits (o200k_base tokenizer)',
        text: '“I love playing cricket with my friends on Sunday.” → 10 tokens\nI | love | playing | cricket | with | my | friends | on | Sunday | .\n\n“unbelievable” → un | bel | ievable (3 tokens)\n“Swiggy” → Sw | ig | gy (3 tokens)\n“UPI payment failed” → UP | I | payment | failed (4 tokens)',
      },
      keyIdea:
        'Rule of thumb for English: 1 token ≈ 4 characters ≈ ¾ of a word, so 100 tokens ≈ 75 words.',
    },
    {
      heading: 'Why tokens matter: languages and spelling',
      body: [
        'Each model family has its own tokenizer, built from large samples of text. Text that is common there, like English, gets packed into fewer tokens. The same meaning in another language can need many more. Even within one company, tokenizers change: Anthropic says its tokenizer for Claude 4.7 and later produces about 30% more tokens for the same text.',
        'Tokens also explain a famous quirk. Ask a chatbot how many r’s are in “strawberry” and it may get it wrong, because it sees st | raw | berry, not single letters. Karpathy covers this in his deep dive: models think in chunks, so spelling and counting letters are surprisingly hard for them.',
      ],
      example: {
        label: 'Same sentence, English vs Hindi (o200k_base)',
        text: 'English: “I love playing cricket with my friends on Sunday.” → 10 tokens\nHindi: “मुझे रविवार को अपने दोस्तों के साथ क्रिकेट खेलना पसंद है।” → 30 tokens\nSame meaning, 3× the tokens. On an API, that is 3× the cost and 3× the space used.',
      },
    },
    {
      heading: 'What is a context window?',
      body: [
        'The context window is the model’s working memory: the most tokens it can look at in one go. Anthropic’s docs say it includes everything in the request: instructions, your messages, its earlier replies, any files or images, and the answer it is writing right now.',
        'Sizes have grown fast. Many current Claude models handle 1 million tokens by default, and older ones 200,000. Using the 75-words-per-100-tokens rule, 1 million tokens is roughly 750,000 English words. Anything outside the window simply does not exist for the model on that turn.',
      ],
      example: {
        label: 'Quick maths',
        text: '200,000 tokens × 0.75 ≈ 150,000 English words\n1,000,000 tokens × 0.75 ≈ 750,000 English words',
      },
    },
    {
      heading: 'Why do long chats “forget”?',
      body: [
        'An LLM has no memory between turns. Each time you send a message, the app sends the whole conversation again. As the chat grows, it eventually hits the window limit, and the app must drop or summarise older messages. Your instructions from the start can quietly fall out.',
        'Even before the limit, more is not always better. Anthropic’s docs call this “context rot”: as the token count grows, accuracy and recall go down. A 2023 study, “Lost in the Middle”, found models use information at the start or end of a long input better than information buried in the middle.',
      ],
      flow: [
        'Message 1',
        'Messages 2 to 80',
        'Window fills up',
        'Old parts dropped or summarised',
        'Early details “forgotten”',
      ],
      bullets: [
        'Start a new chat for a new topic.',
        'Restate key facts and rules when a chat gets long.',
        'Put the most important instruction at the start or the end, not the middle.',
      ],
    },
    {
      heading: 'Tokens are also how AI is priced',
      body: [
        'When developers use an AI model through an API (a way for programs to talk to it), they pay per token, usually quoted per million tokens. Output tokens (what the model writes) cost more than input tokens (what you send). On Anthropic’s current price list, output costs 5 times as much as input.',
        'Long inputs are also slower and more expensive to process. IBM notes that the compute needed grows quadratically with input length: double the input and the work roughly quadruples. You will see why in the next lesson on attention.',
      ],
      example: {
        label: 'A real cost calculation (Claude Sonnet 5.5 API prices, November 2026)',
        text: 'Prices: $2 per million input tokens, $10 per million output tokens\nOne request: 2,000 tokens in, 500 tokens out\nInput: 2,000 × $2 ÷ 1,000,000 = $0.004\nOutput: 500 × $10 ÷ 1,000,000 = $0.005\nTotal: $0.009 per request, or about $90 for 10,000 requests',
      },
      keyIdea: 'Fewer, better tokens means cheaper, faster and often more accurate answers.',
    },
  ],
  keyTerms: [
    {
      term: 'Token',
      meaning:
        'A chunk of text (a word, part of a word, or punctuation) that an LLM reads and writes.',
    },
    {
      term: 'Tokenizer',
      meaning:
        'The tool that splits text into tokens and turns them into numbers the model can use. Each model family has its own.',
    },
    {
      term: 'Context window',
      meaning:
        'The maximum number of tokens the model can consider at once, including both input and output.',
    },
    {
      term: 'Context rot',
      meaning:
        'The drop in accuracy and recall as more and more tokens are packed into the context.',
    },
    {
      term: 'Input and output tokens',
      meaning:
        'Input tokens are what you send; output tokens are what the model writes. APIs charge for both, output at a higher rate.',
    },
  ],
  videos: [
    {
      youtubeId: '7xTGNNLPyMI',
      title: 'Deep Dive into LLMs like ChatGPT',
      channel: 'Andrej Karpathy',
      minutes: 211,
      start: 467,
      why: 'A 3.5-hour lecture, but you only need the “Tokenization” chapter from 7:47 to 14:27 (about 7 minutes). The link starts there.',
    },
  ],
  tryIt: {
    title: 'Count tokens yourself',
    steps: [
      'Open the free OpenAI Tokenizer page (link below). No login needed.',
      'Paste: “I love playing cricket with my friends on Sunday.” Check the token count and the coloured chunks.',
      'Now paste the same sentence in Hindi, Tamil, Bengali or your own language. How many more tokens does it take?',
      'Try your full name, a 10-digit phone number, an emoji and a long word like “internationalisation”. Which ones split into many pieces?',
      'Check the rule of thumb: divide the character count by the token count for an English paragraph. Is it close to 4?',
      'Bonus: ask a chatbot “How many r’s are in strawberry?” and think about why tokens make this tricky.',
    ],
    link: { label: 'OpenAI Tokenizer', url: 'https://platform.openai.com/tokenizer' },
  },
  check: [
    {
      q: 'Roughly how many tokens is a 750-word English essay?',
      options: ['About 75', 'About 500', 'About 1,000', 'About 7,500'],
      answer: 2,
      why: '100 tokens ≈ 75 words, so 750 words ≈ 1,000 tokens. The exact count depends on the tokenizer and the words used.',
    },
    {
      q: 'You gave a chatbot rules at the start of a very long chat, and now it ignores them. What is the most likely reason?',
      options: [
        'The model got tired',
        'Older parts of the chat were dropped or summarised to fit the context window, and long contexts reduce accuracy',
        'The model saved your rules to a file and lost it',
        'Chatbots can only follow one rule per chat',
      ],
      answer: 1,
      why: 'Each turn, the whole chat must fit in the context window. When it does not, old messages get cut or summarised. Even before that, very long contexts make recall less reliable (context rot).',
    },
    {
      q: 'The same message takes 3 times as many tokens in Hindi as in English. What is a practical effect?',
      options: [
        'The Hindi answer will be 3 times more accurate',
        'Nothing; tokens do not matter to users',
        'It costs more on an API and fills the context window faster',
        'The model cannot read Hindi at all',
      ],
      answer: 2,
      why: 'Pricing and context limits are counted in tokens, so more tokens per sentence means higher cost and less room. Models can still read Hindi well.',
    },
  ],
  fromTheSource: [
    {
      who: 'Rico Sennrich, Barry Haddow and Alexandra Birch (University of Edinburgh)',
      role: 'Their 2015 translation paper brought byte pair encoding (BPE) into neural language models. Versions of BPE now build the tokenizers of GPT, Llama and many other models.',
      work: 'Neural Machine Translation of Rare Words with Subword Units (2015)',
      url: 'https://arxiv.org/abs/1508.07909',
      idea: 'Models that use a fixed list of whole words get stuck on new words, names and compounds. The authors split rare words into smaller, common pieces called subword units, so a model can read and write any word from a limited set of parts.',
      breakdown: [
        'Start with single characters. Find the pair that appears side by side most often and merge it into one new token. Repeat thousands of times.',
        'Common words end up as a single token. Rare words stay split into pieces, like “unbelievable” → un | bel | ievable.',
        'No word is ever “unknown”: in the worst case, it is built from small pieces.',
        'In their tests this beat the older dictionary approach for translating rare words, from English into German and Russian.',
      ],
      use: 'This is why a rare name, a long technical word or text in a language the tokenizer saw less often takes more tokens. When you pay per token or are close to a context limit, plain, common wording packs more meaning into each token.',
    },
    {
      who: 'Andrej Karpathy',
      role: 'A founding member of OpenAI and former director of AI at Tesla, known for teaching how LLMs work by building them from scratch.',
      work: 'Let’s build the GPT Tokenizer (video lecture, 2024)',
      url: 'https://www.youtube.com/watch?v=zduSFxRajkE',
      idea: 'Karpathy builds a GPT-style BPE tokenizer from scratch and argues that many odd LLM failures trace back to tokenization: trouble with spelling, reversing a string, simple arithmetic and non-English text.',
      breakdown: [
        'The model never sees letters, only token numbers. So “how many r’s in strawberry” asks about something it cannot directly see.',
        'Numbers are split into chunks too, which is one reason simple arithmetic can go wrong.',
        'A tokenizer packs the text it was trained on most efficiently. Text it saw less of, often non-English, breaks into more, smaller pieces.',
        'He released the code as minbpe, a small open repository, so anyone can read the whole algorithm for themselves.',
      ],
      use: 'When a chatbot struggles with counting letters, reversing text or long sums, do not argue with it. Ask it to use its code tool, or to write the word out letter by letter first so each letter gets its own token.',
    },
  ],
  sources: [
    {
      label: 'OpenAI Help: What are tokens and how to count them?',
      url: 'https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them',
    },
    {
      label: 'OpenAI tiktoken: model-to-tokenizer map (o200k_base)',
      url: 'https://github.com/openai/tiktoken/blob/main/tiktoken/model.py',
    },
    {
      label: 'gpt-tokenizer (npm), used to run the o200k_base examples in this lesson',
      url: 'https://github.com/niieani/gpt-tokenizer',
    },
    {
      label: 'Claude docs: Context windows',
      url: 'https://platform.claude.com/docs/en/build-with-claude/context-windows',
    },
    {
      label: 'Claude docs: Pricing',
      url: 'https://platform.claude.com/docs/en/about-claude/pricing',
    },
    { label: 'IBM: What is a context window?', url: 'https://www.ibm.com/topics/context-window' },
    {
      label: 'Liu et al. (2023): Lost in the Middle: How Language Models Use Long Contexts',
      url: 'https://arxiv.org/abs/2307.03172',
    },
    {
      label: 'Andrej Karpathy (YouTube): Deep Dive into LLMs like ChatGPT',
      url: 'https://www.youtube.com/watch?v=7xTGNNLPyMI',
    },
    {
      label: 'Chapter list for Karpathy’s Deep Dive (rosetta.to)',
      url: 'https://rosetta.to/u/andrejkarpathy/deep-dive-into-llms-like-chatgpt',
    },
    {
      label:
        'Sennrich, Haddow, Birch (2015): Neural Machine Translation of Rare Words with Subword Units',
      url: 'https://arxiv.org/abs/1508.07909',
    },
    {
      label: 'Andrej Karpathy (YouTube): Let’s build the GPT Tokenizer',
      url: 'https://www.youtube.com/watch?v=zduSFxRajkE',
    },
    { label: 'Andrej Karpathy (GitHub): minbpe', url: 'https://github.com/karpathy/minbpe' },
    {
      label: 'fast.ai: Let’s Build the GPT Tokenizer, text version of Karpathy’s lecture',
      url: 'https://www.fast.ai/posts/2025-10-16-karpathy-tokenizers',
    },
  ],
  faqs: [
    {
      q: 'How many tokens is 1,000 words?',
      a: 'For English, about 1,300 tokens, using OpenAI’s rule of thumb that 100 tokens ≈ 75 words. Other languages, code and unusual words often need more tokens for the same length.',
    },
    {
      q: 'What happens when the context window is full?',
      a: 'The model cannot see more than its window. Chat apps usually drop or summarise the oldest messages so the chat can continue, which is when it starts “forgetting”. On the API, a request that is too long is rejected with an error, or the answer stops early when the limit is hit.',
    },
    {
      q: 'Is a bigger context window always better?',
      a: 'No. A bigger window lets you paste longer documents, but accuracy and recall drop as context grows (context rot), and long inputs cost more and run slower. Give the model the information it needs, not everything you have.',
    },
  ],
  related: [
    { label: 'Previous: What is an LLM?', href: '/learn-ai/what-is-an-llm' },
    { label: 'Next: Transformers and attention', href: '/learn-ai/transformers-explained' },
    { label: 'Prompting techniques that work', href: '/learn-ai/prompt-engineering' },
    { label: 'Embeddings and RAG', href: '/learn-ai/embeddings-and-rag' },
    { label: 'What is an API?', href: '/learn-ai/what-is-an-api' },
  ],
}
