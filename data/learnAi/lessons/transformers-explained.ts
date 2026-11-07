import type { Lesson } from '../types'

export const lesson: Lesson = {
  slug: 'transformers-explained',
  track: 'foundations',
  order: 5,
  title: 'Transformers and attention',
  metaTitle: 'Transformers Explained Simply: How Attention Works',
  metaDescription:
    'What is a transformer in AI? A simple guide to attention, the idea from Google’s 2017 paper behind ChatGPT, Claude and Gemini, with an everyday analogy.',
  h1: 'Transformers explained simply: how attention works in ChatGPT and Claude',
  tldr: 'A transformer is the neural network design behind ChatGPT, Claude and Gemini, introduced by a Google team in the 2017 paper “Attention Is All You Need”. Its key idea, attention, lets every word look at every other word at once and decide which ones matter for its meaning. Because it processes all words in parallel instead of one by one, it trains fast on GPUs and scales to huge models.',
  minutes: 11,
  level: 'Beginner',
  steps: [
    {
      heading: 'What problem did transformers solve?',
      body: [
        'Before 2017, most language models were recurrent neural networks (RNNs). They read a sentence one word at a time, left to right, carrying a running summary. That is like reading a long WhatsApp forward through a keyhole: by the end, you have half-forgotten the start.',
        'Reading in order also made training slow. The 2017 paper put it plainly: this “inherently sequential nature precludes parallelization”. GPUs are great at doing thousands of things at once, but RNNs could not use that well. The transformer dropped the word-by-word reading entirely and used only attention.',
      ],
      example: {
        label: 'From the original paper',
        text: 'Task: English to French translation\nResult: a new best score after training for 3.5 days on 8 GPUs, much less training time than earlier top models.',
      },
    },
    {
      heading: 'The big idea: attention',
      body: [
        'Attention lets each word gather meaning from the other words around it, in a single step. The word “bank” means something different in “I sat on the bank of the river” and “I deposited cash at the bank”. Google’s blog post on the paper explains that the transformer can learn to look straight at “river” to decide which “bank” it is.',
        'Pronouns are another classic case. In “The animal didn’t cross the street because it was too tired”, “it” means the animal. Change “tired” to “wide” and “it” now means the street. Attention is how the model works out which word “it” should borrow its meaning from.',
      ],
      keyIdea:
        'Attention lets every word ask: which other words in this text matter most for what I mean here?',
    },
    {
      heading: 'An everyday analogy: query, key and value',
      body: [
        'Imagine every word is a member of a class WhatsApp group. The word “it” posts a question: “Who am I talking about? Probably something alive that can get tired.” This is its query.',
        'Every other word has a short profile line saying what it offers, called its key: “animal: a living thing”, “street: a place”. “It” checks how well each profile matches its question and gives each a score. Then it reads the actual messages, called values, mostly from the best matches. Google’s blog describes exactly this: the attention scores are used as weights for a weighted average of all the words’ representations.',
      ],
      example: {
        label: 'What “it” pays attention to (made-up numbers to show the idea)',
        text: 'Sentence: “The animal didn’t cross the street because it was too tired”\nanimal 0.70 · street 0.15 · tired 0.10 · everything else 0.05\nNew meaning of “it” = mostly “animal”, a bit of “street” and “tired”',
      },
    },
    {
      heading: 'What happens inside, step by step',
      body: [
        'First, text is split into tokens, and each token becomes a long list of numbers called an embedding, which captures its meaning. Attention on its own has no idea of word order (“dog bites man” vs “man bites dog”), so the model also adds position information to each token.',
        'Then the tokens pass through many layers. In each layer, attention mixes in context from other tokens, and a small network refines each token further. Each layer has several attention heads working side by side, each free to look for a different kind of link, like grammar or who-did-what. The original transformer used 6 layers and 8 heads; today’s models are much bigger. At the end, the model gives a score to every possible next token.',
      ],
      flow: [
        'Your text',
        'Tokens',
        'Embeddings + position',
        'Attention layers (many)',
        'Score every next token',
        'Pick one',
      ],
      bullets: [
        'In GPT-style chat models, each token can look only at earlier tokens, never ahead, because the job is to predict what comes next.',
        'Google’s BERT (2018) used the transformer to read in both directions, which suits understanding tasks like search.',
      ],
    },
    {
      heading: 'Why it changed everything (and its one big cost)',
      body: [
        'Because transformers process all tokens at once, they make full use of GPUs, so labs could train much bigger models on much more text. That is what made GPT, BERT and later ChatGPT, Claude and Gemini possible. The same design now handles images and audio too: Gemini, for example, was trained on different kinds of data from the start.',
        'The cost: attention compares every token with every other token. Double the length of the text and the work roughly quadruples. That is a big reason why long context windows are expensive and slower, as you saw in the last lesson.',
      ],
      keyIdea:
        'Transformers won because they are parallel. Parallel means fast to train, which means they could be made very large.',
    },
  ],
  keyTerms: [
    {
      term: 'Transformer',
      meaning:
        'A neural network design built around attention, introduced by a Google team in 2017. GPT stands for generative pre-trained transformer.',
    },
    {
      term: 'Attention (self-attention)',
      meaning:
        'A way for each token to look at all the other tokens and pull in meaning from the most relevant ones.',
    },
    {
      term: 'Embedding',
      meaning:
        'A long list of numbers that represents a token’s meaning. Similar meanings get similar lists.',
    },
    {
      term: 'Query, key, value',
      meaning:
        'In attention, a token’s question (query), each token’s label (key), and the information it shares (value).',
    },
    {
      term: 'Attention head',
      meaning:
        'One attention unit. Models run many in parallel so each can track a different kind of relationship.',
    },
    {
      term: 'Positional encoding',
      meaning: 'Extra information added to each token so the model knows word order.',
    },
  ],
  videos: [
    {
      youtubeId: 'SZorAJ4I-sA',
      title: 'Transformers, explained: Understand the model behind GPT, BERT, and T5',
      channel: 'Google Cloud Tech',
      minutes: 9,
      why: 'A short, no-maths overview of positional encoding and attention from Google. Watch this first.',
    },
    {
      youtubeId: 'eMlx5fFNoYc',
      title: 'Attention in transformers, step-by-step | Deep Learning Chapter 6',
      channel: '3Blue1Brown',
      minutes: 26,
      why: 'Beautiful animations of queries, keys and values. The first 13 minutes (up to “Context size”) cover what this lesson explains.',
    },
  ],
  tryIt: {
    title: 'Play with a real transformer in your browser',
    steps: [
      'Open Transformer Explainer (link below). It runs a small real model, GPT-2, inside your browser with nothing to install. A laptop works best.',
      'Type a short sentence like “Rohit Sharma hit the ball for a” and look at the next-token predictions and their probabilities.',
      'If you see a temperature setting, change it. Low temperature makes the top choice more likely; high temperature makes choices more random.',
      'Click on the attention part of the diagram to see which earlier words each token looks at most.',
      'On your phone instead? Ask a chatbot: “In ‘The trophy didn’t fit in the suitcase because it was too big’, what does ‘it’ mean? Now change ‘big’ to ‘small’.” Notice how one word flips the meaning, which is exactly what attention handles.',
    ],
    link: {
      label: 'Open Transformer Explainer',
      url: 'https://poloclub.github.io/transformer-explainer/',
    },
  },
  check: [
    {
      q: 'What is the main advantage of transformers over older RNN language models?',
      options: [
        'They use hand-written grammar rules',
        'They process all tokens in parallel with attention, so they train much faster on GPUs and link distant words directly',
        'They need no training data',
        'They read text strictly one word at a time',
      ],
      answer: 1,
      why: 'RNNs read word by word, which is slow and loses track of distant words. Attention looks at all tokens at once, which suits GPUs and allows much bigger models.',
    },
    {
      q: 'In “The animal didn’t cross the street because it was too tired”, what does attention help the model do?',
      options: [
        'Count the words in the sentence',
        'Translate the sentence word by word',
        'Work out that “it” refers to “the animal”',
        'Check the spelling of “street”',
      ],
      answer: 2,
      why: 'Attention lets “it” score how relevant each other word is. “Tired” fits an animal, so “it” draws its meaning mostly from “animal”.',
    },
    {
      q: 'Why do transformers need extra position information?',
      options: [
        'Attention by itself does not know word order, so “dog bites man” and “man bites dog” would look the same',
        'To make the model run on phones',
        'To count tokens for billing',
        'Because GPUs cannot store words',
      ],
      answer: 0,
      why: 'Attention compares tokens as a set. Adding position information lets the model tell who did what to whom.',
    },
  ],
  fromTheSource: [
    {
      who: 'Ashish Vaswani and seven co-authors, mostly at Google Brain and Google Research',
      role: 'The eight authors (Vaswani, Shazeer, Parmar, Uszkoreit, Jones, Gomez, Kaiser and Polosukhin) of the paper that introduced the transformer, the design behind GPT, Claude and Gemini.',
      work: 'Attention Is All You Need (2017)',
      url: 'https://arxiv.org/abs/1706.03762',
      idea: 'They proposed a new network, the Transformer, “based solely on attention mechanisms, dispensing with recurrence and convolutions entirely”. It set new best scores for English to German and English to French translation, at a fraction of the training cost of earlier top models.',
      breakdown: [
        'Old way: read words one after another, so training could not make full use of a GPU’s ability to do many things at once.',
        'New way: every word looks at every other word at the same time through attention, so training runs in parallel.',
        'Proof: the English to French model reached a new best score after training for 3.5 days on eight GPUs.',
        'The paper was about translation. Others soon used the same design for GPT, BERT and today’s chatbots.',
      ],
      use: 'Attention is how a model links “it” to the right noun, or a question at the end of your prompt to a detail near the top. You help it by naming things clearly and, with long documents, putting your actual question after the document.',
    },
  ],
  sources: [
    {
      label: 'Vaswani et al. (2017): Attention Is All You Need (arXiv abstract)',
      url: 'https://arxiv.org/abs/1706.03762',
    },
    {
      label: 'Attention Is All You Need (full paper, HTML)',
      url: 'https://arxiv.org/html/1706.03762v7',
    },
    {
      label:
        'Google Research blog (Aug 31, 2017): Transformer, a novel neural network architecture for language understanding',
      url: 'https://research.google/blog/transformer-a-novel-neural-network-architecture-for-language-understanding/',
    },
    { label: 'Devlin et al. (2018): BERT', url: 'https://arxiv.org/abs/1810.04805' },
    {
      label: 'Google (Dec 6, 2023): Introducing Gemini',
      url: 'https://blog.google/technology/ai/google-gemini-ai/',
    },
    { label: 'IBM: What is a context window?', url: 'https://www.ibm.com/topics/context-window' },
    {
      label: 'Wikipedia: Generative pre-trained transformer',
      url: 'https://en.wikipedia.org/wiki/Generative_pre-trained_transformer',
    },
    {
      label:
        'Cho et al. (2024): Transformer Explainer: Interactive Learning of Text-Generative Models',
      url: 'https://arxiv.org/abs/2408.04619',
    },
    {
      label: '3Blue1Brown chapter list for “Attention in transformers” (rosetta.to)',
      url: 'https://rosetta.to/u/3blue1brown/attention-in-transformers-step-by-step-deep-learning-chapter-6',
    },
  ],
  faqs: [
    {
      q: 'What is a transformer in AI, in simple terms?',
      a: 'It is a type of neural network that reads all the words of a text at once and uses attention to work out how they relate. It was introduced by a Google team in 2017 and is the base of nearly every modern chatbot.',
    },
    {
      q: 'What does GPT stand for?',
      a: 'Generative pre-trained transformer. Generative because it creates text, pre-trained because it first learns from huge amounts of text, and transformer because of the neural network design it uses.',
    },
    {
      q: 'What is self-attention in simple words?',
      a: 'Self-attention is when each word in a text looks at all the other words in the same text and decides how much each one matters for its own meaning. It is how a model knows that “it” means the animal and not the street.',
    },
  ],
  related: [
    { label: 'Previous: Tokens and context windows', href: '/learn-ai/tokens-and-context-window' },
    { label: 'Next: How ChatGPT and Claude are trained', href: '/learn-ai/how-llms-are-trained' },
    {
      label: 'Build an LLM with Karpathy’s Zero to Hero',
      href: '/learn-ai/build-an-llm-from-scratch',
    },
    { label: 'Embeddings and RAG', href: '/learn-ai/embeddings-and-rag' },
    { label: 'AI engineer career guide', href: '/ai-engineer' },
  ],
}
