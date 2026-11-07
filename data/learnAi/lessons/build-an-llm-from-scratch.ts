import type { Lesson } from '../types'

export const lesson: Lesson = {
  slug: 'build-an-llm-from-scratch',
  track: 'deeper',
  order: 23,
  title: "Build an LLM with Karpathy's Zero to Hero",
  metaTitle: 'Karpathy Zero to Hero: A Study Guide to Build an LLM',
  metaDescription:
    'A study guide to Karpathy’s Neural Networks: Zero to Hero. What each video teaches, from micrograd to GPT-2, prerequisites, time needed and how to code along.',
  h1: 'Build an LLM from scratch with Karpathy’s Zero to Hero: a study guide',
  tldr: 'Neural Networks: Zero to Hero is a free YouTube course by Andrej Karpathy that takes you from a tiny neural network in plain Python to training your own GPT. You need basic Python and some memory of high-school calculus. Expect well over 10 hours of video, and two to three times that if you code along, which you should.',
  minutes: 15,
  level: 'Intermediate',
  steps: [
    {
      heading: 'What is Zero to Hero, and is it for you?',
      body: [
        'Andrej Karpathy is one of the best-known teachers of deep learning. His course is, in his words, "a course on neural networks that starts all the way at the basics". Every video is him writing code live, line by line, and explaining each line. The videos are free on YouTube and the code is free on GitHub.',
        'The stated prerequisite is "basic Python and a vague recollection of high-school calculus". If you can write a for loop and a function, and you remember roughly what a derivative (slope) is, you can start. Earlier lessons on this path, such as transformers and tokens, give you the big picture. This course shows you how it works in code.',
      ],
      keyIdea:
        'You will understand LLMs far better after building a small one yourself, even a bad one.',
    },
    {
      heading: 'The map: nine videos, one path',
      body: [
        'The course builds up in order, and each video uses ideas from the last. Don’t skip ahead to the GPT video unless you already know PyTorch tensors and how training works.',
      ],
      flow: ['micrograd', 'makemore 1–5', 'Let’s build GPT', 'GPT Tokenizer', 'Reproduce GPT-2'],
      bullets: [
        'The spelled-out intro to neural networks and backpropagation: building micrograd (about 2 h 25 min).',
        'makemore Parts 1 to 5: bigrams, MLP, activations and BatchNorm, "Becoming a Backprop Ninja", and WaveNet.',
        'Let’s build GPT: from scratch, in code, spelled out (about 1 h 55 min).',
        'Let’s build the GPT Tokenizer (about 2 h 13 min).',
        'Let’s reproduce GPT-2 (124M) (about 4 h).',
      ],
    },
    {
      heading: 'Stage 1: micrograd, how a network learns',
      body: [
        'In the first video you build micrograd, a tiny engine that does backpropagation: working out how much each number inside a network should change to reduce the error. It starts with the slope of a simple function, then builds a neuron, then a small multi-layer network, all in plain Python.',
        'This is the most important video. Gradient descent and backpropagation sit under every model you have used, including ChatGPT and Claude. If you only watch one, watch this one.',
      ],
      example: {
        label: 'The kind of code you write in the first 20 minutes',
        code: true,
        text: 'def f(x):\n    return 3*x**2 - 4*x + 5\n\nh = 0.0001\nx = 3.0\nslope = (f(x + h) - f(x)) / h\nprint(slope)  # about 14: nudging x up makes f go up 14 times as fast',
      },
    },
    {
      heading: 'Stage 2: makemore, your first language model',
      body: [
        'makemore is a model that reads a list of names and learns to invent new, name-like words. Over five videos it grows from simple counting of letter pairs (a bigram model) to a neural network (MLP) and then a deeper, WaveNet-style model. Along the way you learn PyTorch tensors, training loops, why training goes wrong, and BatchNorm.',
        'Part 4, "Becoming a Backprop Ninja", has you compute gradients by hand. It is hard. The repo links a Google Colab exercise, and Karpathy suggests working through it with the video, pausing whenever you get stuck.',
      ],
      keyIdea:
        'A language model, at its core, predicts the next token. makemore does it with letters, GPT does it with tokens.',
    },
    {
      heading: 'Stage 3: GPT, the tokenizer and GPT-2',
      body: [
        '"Let’s build GPT" builds a small transformer that learns to write Shakespeare-like text. You code self-attention, the key idea from the transformers lesson, step by step. The finished code is in the ng-video-lecture repo (bigram.py and gpt.py).',
        'The tokenizer video builds byte pair encoding, the way GPT models split text into tokens, with code in the minbpe repo. The GPT-2 video reproduces the 124M-parameter GPT-2 from scratch. Its companion repo, build-nanogpt, estimates "~1hr and ~$10" on a rented cloud GPU, so this is the only stage that needs paid hardware.',
      ],
    },
    {
      heading: 'How to study it, and what comes after',
      body: [
        'Do not just watch. Open a Jupyter notebook or Google Colab next to the video, type the code yourself, and pause often. Rewatch parts that don’t click. Try the exercises listed in each video’s description. One video a week is a healthy pace with a job or college.',
        'When you finish, two Karpathy repos take you further. nanoGPT, the classic small GPT trainer, is now marked "very old and deprecated" by Karpathy in favour of nanochat. nanochat covers the full pipeline (tokenizer, pretraining, finetuning, evaluation and inference) and its README says you can train a GPT-2-level model for about $48, roughly 2 hours on an 8xH100 GPU node.',
      ],
      bullets: [
        'Keep a notes file: one line per new idea, in your own words.',
        'Re-derive one gradient by hand per video.',
        'Push your notebooks to GitHub. It shows real work to recruiters.',
      ],
    },
  ],
  keyTerms: [
    {
      term: 'Backpropagation',
      meaning:
        'The method for working out how much each weight in a network should change to reduce the error.',
    },
    {
      term: 'Gradient',
      meaning:
        'The slope that tells you which direction, and how much, to nudge a number to lower the loss.',
    },
    {
      term: 'Bigram model',
      meaning:
        'A very simple language model that predicts the next character only from the current one.',
    },
    {
      term: 'Self-attention',
      meaning:
        'The transformer step where each token looks at earlier tokens to decide what matters for predicting the next one.',
    },
    {
      term: 'Byte pair encoding (BPE)',
      meaning:
        'A way to build a tokenizer by repeatedly merging the most common pairs of characters or bytes.',
    },
    {
      term: 'nanochat',
      meaning:
        'Karpathy’s small, full-pipeline repo for training a ChatGPT-like model on a single GPU node.',
    },
  ],
  videos: [
    {
      youtubeId: 'VMj-3S1tku0',
      title: 'The spelled-out intro to neural networks and backpropagation: building micrograd',
      channel: 'Andrej Karpathy',
      minutes: 145,
      why: 'The foundation of everything else. Code along and make sure you can explain backpropagation in your own words before moving on.',
    },
    {
      youtubeId: 'kCc8FmEb1nY',
      title: "Let's build GPT: from scratch, in code, spelled out.",
      channel: 'Andrej Karpathy',
      minutes: 116,
      why: 'Build a small transformer that writes Shakespeare-like text. Focus on the self-attention section, it is the heart of every LLM.',
    },
  ],
  tryIt: {
    title: 'Compute your first gradient in 10 minutes',
    steps: [
      'Open colab.research.google.com and create a new notebook (free, needs a Google account).',
      'Paste the f(x) code from Stage 1 and run it. You should see a number close to 14.',
      'Work out the slope by hand: the derivative of 3x² − 4x + 5 is 6x − 4, so at x = 3 it is 14. They match.',
      'Change x to -2 and run again. Predict the answer first (6 × −2 − 4 = −16).',
      'Now play the first 20 minutes of the micrograd video and watch Karpathy do the same thing, then keep going.',
    ],
    link: {
      label: 'Neural Networks: Zero to Hero on GitHub',
      url: 'https://github.com/karpathy/nn-zero-to-hero',
    },
  },
  check: [
    {
      q: 'What does the course list as the prerequisites?',
      options: [
        'A PhD in machine learning',
        'Basic Python and a vague recollection of high-school calculus',
        'Five years of C++ experience',
        'Nothing at all, no coding needed',
      ],
      answer: 1,
      why: 'The course page lists basic Python and a vague memory of high-school calculus. Everything else is taught in the videos.',
    },
    {
      q: 'In which order should a beginner watch the videos?',
      options: [
        'GPT-2 first, then micrograd',
        'micrograd, then makemore, then Let’s build GPT, then the tokenizer and GPT-2',
        'Any order, they are unrelated',
        'Only the tokenizer video',
      ],
      answer: 1,
      why: 'Each video builds on the last. The GPT video assumes you already know tensors and training loops from makemore.',
    },
    {
      q: 'Which stage is likely to need a rented cloud GPU?',
      options: [
        'micrograd',
        'makemore Part 1',
        'Reproducing GPT-2 (124M)',
        'None, everything runs on a phone',
      ],
      answer: 2,
      why: 'The build-nanogpt repo estimates about an hour and about $10 of cloud GPU time to reproduce GPT-2 (124M). The early videos run fine on a normal laptop or in Colab.',
    },
  ],
  fromTheSource: [
    {
      who: 'Andrej Karpathy',
      role: 'Founding member of OpenAI and former director of AI at Tesla, who wrote micrograd and the Zero to Hero course.',
      work: 'micrograd and Neural Networks: Zero to Hero (GitHub repos and video course)',
      url: 'https://github.com/karpathy/micrograd',
      idea: 'Karpathy shows that the learning engine under every neural network fits in about 100 lines of Python, plus about 50 more for a small neural network library. The course is built on that idea: write each piece yourself, in plain code, and you will understand what the big libraries are doing.',
      breakdown: [
        'micrograd does backpropagation over a graph of single numbers: it records how each number was computed, then works backwards to find how much each one should change.',
        'Its small library copies the shape of PyTorch, so what you learn carries straight over to the real tool used in the later videos.',
        'The course is meant to be done, not just watched. The README says each lecture comes with exercises, and one video is "not super intended to be simply watched."',
      ],
      use: 'Type micrograd out yourself while watching the first video, then change one thing, such as the learning rate, and predict what will happen before you run it.',
    },
    {
      who: 'Andrej Karpathy',
      role: 'Author of nanoGPT and its successor, nanochat, small codebases for training GPT-style models.',
      work: 'nanochat (GitHub repo)',
      url: 'https://github.com/karpathy/nanochat',
      idea: 'nanochat aims to be "the best ChatGPT that $100 can buy": one small, readable codebase that runs every stage of making a chat model on a single GPU machine, from tokenizer to a chat you can talk to.',
      breakdown: [
        'Full pipeline: train a tokenizer, pretrain a base model, fine-tune it into a chat model (with supervised fine-tuning and reinforcement learning), evaluate it, then chat with it.',
        'Minimal by design: no giant configuration objects or model factories, so you can read and change the code.',
        'One main dial: a depth setting (the number of transformer layers) sets the other training settings for you.',
      ],
      use: 'After the course, read nanochat’s code from top to bottom before renting any GPU. You will recognise the tokenizer, attention and training loop you built in the videos, which shows how far you have come.',
    },
  ],
  sources: [
    {
      label: 'karpathy/nn-zero-to-hero (course repo and lecture list)',
      url: 'https://github.com/karpathy/nn-zero-to-hero',
    },
    { label: 'karpathy/micrograd', url: 'https://github.com/karpathy/micrograd' },
    {
      label: 'karpathy/ng-video-lecture (Let’s build GPT code)',
      url: 'https://github.com/karpathy/ng-video-lecture',
    },
    {
      label: 'karpathy/build-nanogpt (GPT-2 reproduction code)',
      url: 'https://github.com/karpathy/build-nanogpt',
    },
    { label: 'karpathy/nanoGPT', url: 'https://github.com/karpathy/nanoGPT' },
    { label: 'karpathy/nanochat', url: 'https://github.com/karpathy/nanochat' },
    {
      label: 'YouTube: Let’s build the GPT Tokenizer',
      url: 'https://www.youtube.com/watch?v=zduSFxRajkE',
    },
    {
      label: 'YouTube: Let’s reproduce GPT-2 (124M)',
      url: 'https://www.youtube.com/watch?v=l8pRSuU81PU',
    },
  ],
  faqs: [
    {
      q: 'Is Karpathy’s Zero to Hero good for beginners?',
      a: 'Yes, if you know basic Python. It starts from a single derivative and explains every line. It is not light viewing, though: the videos are long and you learn most by typing the code yourself. If you have never coded, learn Python basics first.',
    },
    {
      q: 'How long does Zero to Hero take?',
      a: 'The videos add up to well over 10 hours: the micrograd, GPT, tokenizer and GPT-2 videos alone run about 10.5 hours, before the five makemore videos. Coding along, pausing and doing exercises usually takes two to three times longer. At one video a week, you can finish in about two to three months.',
    },
    {
      q: 'Do I need a GPU to build an LLM from scratch?',
      a: 'Not for most of the course. micrograd and makemore run on a normal laptop or free Google Colab, and nanoGPT’s README says a tiny Shakespeare model trains in a few minutes even on a MacBook. Reproducing GPT-2 (124M) needs a rented cloud GPU, which Karpathy estimates at about an hour and $10.',
    },
  ],
  related: [
    { label: 'Previous: Prompting vs RAG vs fine-tuning', href: '/learn-ai/fine-tuning-vs-rag' },
    { label: 'Transformers and attention', href: '/learn-ai/transformers-explained' },
    { label: 'Tokens and context windows', href: '/learn-ai/tokens-and-context-window' },
    { label: 'How ChatGPT and Claude are trained', href: '/learn-ai/how-llms-are-trained' },
    { label: 'AI engineer career guide', href: '/ai-engineer' },
    { label: 'Free AI skills resources', href: '/free-resources#ai-skills' },
  ],
}
