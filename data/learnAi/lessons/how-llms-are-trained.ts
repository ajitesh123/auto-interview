import type { Lesson } from '../types'

export const lesson: Lesson = {
  slug: 'how-llms-are-trained',
  track: 'foundations',
  order: 6,
  title: 'How ChatGPT and Claude are trained',
  metaTitle: 'How Are LLMs Trained? Pretraining, Fine-Tuning and RLHF',
  metaDescription:
    'How are ChatGPT and Claude trained? A simple guide to pretraining, instruction tuning, RLHF and Constitutional AI, and why base models differ from chat models.',
  h1: 'How ChatGPT and Claude are trained: pretraining, fine-tuning and RLHF',
  tldr: 'LLMs like ChatGPT and Claude are trained in stages. First, pretraining on huge amounts of text creates a base model that can only continue text. Then instruction tuning on example conversations and reinforcement learning from feedback (from humans in RLHF, or from AI guided by written principles in Anthropic’s Constitutional AI) turn it into a helpful, safer assistant. Newer reasoning models add more reinforcement learning on problems with checkable answers.',
  minutes: 12,
  level: 'Beginner',
  steps: [
    {
      heading: 'The big picture: three stages',
      body: [
        'Think of a student preparing for a competitive exam. First they read every textbook they can find. Then a teacher shows them model answers in the right format. Finally, they write practice answers and a teacher grades them, and they adjust.',
        'LLM training follows the same shape. Each stage builds on the one before. The first stage is by far the most expensive; the later stages are smaller but change the model’s behaviour the most.',
      ],
      flow: [
        'Pretraining on internet text',
        'Base model',
        'Instruction tuning',
        'Feedback (RLHF / RLAIF)',
        'Chat assistant',
      ],
    },
    {
      heading: 'Stage 1: Pretraining builds a base model',
      body: [
        'In pretraining, the model reads a huge amount of text and practises one task: predict the next token. Every wrong guess nudges its billions of parameters a little. For Llama 2 70B, Karpathy estimates about 10 TB of text, about 6,000 GPUs and about 12 days, costing roughly $2 million.',
        'The result is a base model. It has absorbed grammar, facts and patterns from its data, but it has no idea it is supposed to be an assistant. It is a document-completer: it continues whatever text you give it, in the style of the internet.',
      ],
      example: {
        label: 'Base model vs chat model (typical behaviour, simplified)',
        text: 'Prompt: “What is the capital of France?”\nBase model might continue: “What is the capital of Germany? What is the capital of Italy? …” (it thinks it is completing a quiz page)\nChat model answers: “The capital of France is Paris.”',
      },
      keyIdea:
        'A base model knows a lot but does not know how to help. Later training teaches it to behave like an assistant.',
    },
    {
      heading: 'Stage 2: Instruction tuning teaches the assistant format',
      body: [
        'Next comes supervised fine-tuning (SFT), also called instruction tuning. People write example conversations: a user’s request and an ideal assistant reply. For ChatGPT, OpenAI says human trainers wrote both sides of the conversation.',
        'Training on these examples teaches the model the format and personality of a helpful assistant: answer the question, follow instructions, be polite, say when it does not know. This stage uses far less data than pretraining, so it is much cheaper.',
      ],
    },
    {
      heading: 'Stage 3: Learning from feedback (RLHF)',
      body: [
        'Writing perfect answers is slow, but ranking answers is easy. In reinforcement learning from human feedback (RLHF), the model writes several answers to the same prompt and people rank them from best to worst. Those rankings train a second model, a reward model, that predicts which answers people prefer. Then the main model is trained to produce answers the reward model scores highly.',
        'It works remarkably well. In OpenAI’s 2022 InstructGPT paper, people preferred answers from a 1.3 billion parameter model trained this way over the 175 billion parameter GPT-3, a model about 100 times bigger. ChatGPT was trained with the same method.',
      ],
      flow: [
        'Model writes several answers',
        'Humans rank them',
        'Reward model learns the rankings',
        'Model trained to score higher',
      ],
    },
    {
      heading: 'Anthropic’s twist: Constitutional AI (RLAIF)',
      body: [
        'Human ranking is slow, costly, and can mean people reading disturbing content. In December 2022 Anthropic published Constitutional AI. Instead of humans labelling harmful answers, the model is given a written list of principles, a “constitution”. It critiques and rewrites its own answers using those principles, and then an AI judge picks the better of two answers. That is reinforcement learning from AI feedback (RLAIF).',
        'Anthropic says its early constitution drew on sources such as the UN Universal Declaration of Human Rights and principles published by other AI labs. In January 2026 it published a new, longer constitution for Claude. The principles are written down, so anyone can read what the model is being trained toward.',
      ],
      keyIdea:
        'RLHF learns from human rankings. Constitutional AI learns from AI feedback guided by written principles.',
    },
    {
      heading: 'The newest stage: training models to reason',
      body: [
        'Since 2024, labs have added more reinforcement learning on problems with checkable answers, like maths and code. The model tries a problem, the answer is checked, and approaches that lead to right answers are rewarded. It is like solving past papers with the answer key: you learn what kind of working gets marks.',
        'OpenAI’s o1 (September 2024) was trained this way to think in a chain of steps before answering, and DeepSeek’s R1 paper (January 2025) showed that reasoning skills like checking its own work can grow from reinforcement learning alone. That is why today’s models can show “thinking” before they reply.',
      ],
    },
  ],
  keyTerms: [
    {
      term: 'Pretraining',
      meaning:
        'The first and biggest training stage: learning to predict the next token on huge amounts of text.',
    },
    {
      term: 'Base model',
      meaning:
        'The model after pretraining. It continues text but does not reliably answer or follow instructions.',
    },
    {
      term: 'Supervised fine-tuning (SFT)',
      meaning:
        'Extra training on example conversations written by people, to teach the assistant format. Also called instruction tuning.',
    },
    {
      term: 'RLHF',
      meaning:
        'Reinforcement learning from human feedback: people rank answers, a reward model learns their preferences, and the model is trained toward them.',
    },
    {
      term: 'Reward model',
      meaning:
        'A helper model that predicts how good an answer is, trained on human or AI rankings.',
    },
    {
      term: 'Constitutional AI (RLAIF)',
      meaning:
        'Anthropic’s method that uses written principles and AI feedback, instead of human labels, to make a model safer and more helpful.',
    },
  ],
  videos: [
    {
      youtubeId: 'zjkBMFhNj_g',
      title: '[1hr Talk] Intro to Large Language Models',
      channel: 'Andrej Karpathy',
      minutes: 60,
      start: 854,
      why: 'Starts at “Finetuning into an Assistant” (14:14). Watch about 11 minutes, through the RLHF appendix, for a clear picture of how a base model becomes an assistant.',
    },
    {
      youtubeId: '7xTGNNLPyMI',
      title: 'Deep Dive into LLMs like ChatGPT',
      channel: 'Andrej Karpathy',
      minutes: 211,
      start: 3563,
      why: 'Starts at “Pretraining to post-training” (59:23). Watch about 20 minutes on post-training data; the RLHF chapter is at 2:48:26 if you want more.',
    },
  ],
  tryIt: {
    title: 'Be the human feedback: run mini RLHF and Constitutional AI yourself',
    steps: [
      'Open Claude or ChatGPT. Ask: “My friend failed an exam and feels low. Write a short WhatsApp message to cheer them up.”',
      'Use the regenerate (retry) button to get a second answer. You now have two answers to the same prompt, just like in RLHF.',
      'Rank them. Write one line on why the winner is better: kinder, shorter, more honest, more natural?',
      'Now write your own 3-rule “constitution”, for example: 1) Be honest, no fake promises. 2) Sound like a real friend, not a greeting card. 3) Keep it under 40 words.',
      'Paste the losing answer back with: “Critique this message against these 3 rules, then rewrite it to follow them.” You just did the critique-and-revise step of Constitutional AI by hand.',
    ],
    link: { label: 'Open Claude (free)', url: 'https://claude.ai' },
  },
  check: [
    {
      q: 'You give a base model (straight out of pretraining) the prompt “Write a leave application.” What is most likely?',
      options: [
        'It writes a perfect leave application',
        'It continues the text in some internet-document way, maybe listing more requests, because it was only trained to continue text',
        'It refuses because it has no internet access',
        'It asks you a clarifying question like an assistant',
      ],
      answer: 1,
      why: 'Pretraining only teaches next-token prediction on documents. Following instructions and acting like an assistant comes from later fine-tuning and feedback training.',
    },
    {
      q: 'In RLHF, what do the humans mainly provide?',
      options: [
        'The internet text used for pretraining',
        'New parameters for the model',
        'Rankings of which model answers are better, used to train a reward model',
        'The GPUs for training',
      ],
      answer: 2,
      why: 'People compare and rank answers. A reward model learns those preferences, and the main model is then trained to produce answers the reward model scores highly.',
    },
    {
      q: 'How does Anthropic’s Constitutional AI differ from standard RLHF?',
      options: [
        'It skips pretraining',
        'It uses written principles and AI feedback instead of human labels to judge harmful answers',
        'It only works for coding tasks',
        'It lets users vote on the model’s answers live',
      ],
      answer: 1,
      why: 'In Constitutional AI the model critiques and revises its own answers against a written constitution, and an AI judge (not humans) picks better answers for the reinforcement learning stage.',
    },
  ],
  fromTheSource: [
    {
      who: 'Long Ouyang and 19 co-authors at OpenAI',
      role: 'The OpenAI team behind InstructGPT. OpenAI trained ChatGPT later that year with the same method.',
      work: 'Training language models to follow instructions with human feedback (InstructGPT, 2022)',
      url: 'https://arxiv.org/abs/2203.02155',
      idea: 'They started from the point that “making language models bigger does not inherently make them better at following a user’s intent”. After training GPT-3 on human-written example answers and then on human rankings, people preferred answers from a 1.3 billion parameter model over the 175 billion parameter GPT-3.',
      breakdown: [
        'Step 1: people write good answers to real prompts, and the model learns from them (supervised fine-tuning).',
        'Step 2: the model writes several answers, people rank them, and a reward model learns those rankings.',
        'Step 3: reinforcement learning pushes the model toward answers the reward model scores highly.',
        'Size is not everything: the tuned model was about 100 times smaller, was more truthful and gave fewer toxic answers, though it still made simple mistakes.',
      ],
      use: 'The chatbot you use was shaped by people choosing better answers. That is also why a clear example of the reply you want often works better than a vague instruction: examples and rankings are how it was taught to help.',
    },
    {
      who: 'Yuntao Bai and 50 co-authors at Anthropic',
      role: 'The Anthropic research team, including co-founders Jared Kaplan and Dario Amodei, who introduced the Constitutional AI method used to train Claude.',
      work: 'Constitutional AI: Harmlessness from AI Feedback (December 2022)',
      url: 'https://arxiv.org/abs/2212.08073',
      idea: 'They trained a harmless assistant without any human labels for harmful answers. The only human input was “a list of rules or principles”, a constitution, which the AI used to critique and improve its own answers and to judge which of two answers was better.',
      breakdown: [
        'Phase 1: the model answers, critiques its answer against the principles, rewrites it, and is then fine-tuned on the rewrites.',
        'Phase 2: an AI compares pairs of answers and picks the better one. These AI preferences replace human rankings, which is why it is called RL from AI Feedback (RLAIF).',
        'The goal was an assistant that is “harmless but non-evasive”: it explains why it will not help with something harmful instead of just refusing.',
        'Because the principles are written in plain language, people can read and debate what the model is being trained toward.',
      ],
      use: 'You can borrow the critique-and-revise loop in any chat: give a short list of rules, ask the model to check its answer against them, then ask for a rewrite. The Try it task below does exactly this on a small scale.',
    },
  ],
  sources: [
    {
      label: 'OpenAI (Jun 11, 2018): Improving language understanding with unsupervised learning',
      url: 'https://openai.com/index/language-unsupervised/',
    },
    {
      label:
        'Ouyang et al. (2022): Training language models to follow instructions with human feedback (InstructGPT)',
      url: 'https://arxiv.org/abs/2203.02155',
    },
    {
      label: 'OpenAI (Nov 30, 2022): Introducing ChatGPT',
      url: 'https://openai.com/index/chatgpt/',
    },
    {
      label: 'Bai et al. (2022): Constitutional AI: Harmlessness from AI Feedback',
      url: 'https://arxiv.org/abs/2212.08073',
    },
    {
      label: 'Anthropic (May 9, 2023, updated Jan 2026): Claude’s Constitution',
      url: 'https://www.anthropic.com/news/claudes-constitution',
    },
    {
      label: 'OpenAI (Sep 12, 2024): Learning to reason with LLMs',
      url: 'https://openai.com/index/learning-to-reason-with-llms/',
    },
    {
      label:
        'DeepSeek-AI (2025): DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning',
      url: 'https://arxiv.org/abs/2501.12948',
    },
    {
      label: 'Touvron et al. (2023): Llama 2: Open Foundation and Fine-Tuned Chat Models',
      url: 'https://arxiv.org/abs/2307.09288',
    },
    {
      label: 'Andrej Karpathy (YouTube): [1hr Talk] Intro to Large Language Models',
      url: 'https://www.youtube.com/watch?v=zjkBMFhNj_g',
    },
    {
      label: 'Notes on Karpathy’s Intro to LLMs talk (gist)',
      url: 'https://gist.github.com/anupj/f3a778dcb26972ba72c774634a80d796',
    },
    {
      label: 'Chapter list for Karpathy’s Intro to LLMs (rosetta.to)',
      url: 'https://rosetta.to/u/andrejkarpathy/1hr-talk-intro-to-large-language-models',
    },
    {
      label: 'Chapter list for Karpathy’s Deep Dive (rosetta.to)',
      url: 'https://rosetta.to/u/andrejkarpathy/deep-dive-into-llms-like-chatgpt',
    },
    { label: 'Wikipedia: Anthropic (founders)', url: 'https://en.wikipedia.org/wiki/Anthropic' },
  ],
  faqs: [
    {
      q: 'What is RLHF in simple terms?',
      a: 'Reinforcement learning from human feedback. The model writes several answers, people rank them, a reward model learns what people prefer, and the model is trained to give answers that score higher. It is like a teacher grading practice answers until the student learns what a good answer looks like.',
    },
    {
      q: 'What is the difference between a base model and an instruct (chat) model?',
      a: 'A base model has only been pretrained to continue text, so it may ramble or continue your question instead of answering it. An instruct or chat model has had extra training on example conversations and feedback, so it follows instructions and answers like an assistant.',
    },
    {
      q: 'How much does it cost to train an LLM?',
      a: 'It varies hugely with size. Karpathy estimates Meta’s Llama 2 70B took about 6,000 GPUs for about 12 days, roughly $2 million, just for pretraining. Labs rarely publish exact costs for their newest frontier models. Fine-tuning a small open model for your own task can cost far less.',
    },
  ],
  related: [
    { label: 'Previous: Transformers and attention', href: '/learn-ai/transformers-explained' },
    { label: 'Next: Your first prompt', href: '/learn-ai/first-prompt' },
    { label: 'Prompting vs RAG vs fine-tuning', href: '/learn-ai/fine-tuning-vs-rag' },
    { label: 'Why AI makes things up', href: '/learn-ai/ai-hallucinations' },
    { label: 'AI product manager guide', href: '/aipm' },
  ],
}
