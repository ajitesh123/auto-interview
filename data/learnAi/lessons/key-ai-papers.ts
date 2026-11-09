import type { Lesson } from '../types'

export const lesson: Lesson = {
  slug: 'key-ai-papers',
  track: 'foundations',
  order: 0,
  title: 'The papers that built modern AI',
  metaTitle: 'The Most Important AI Papers, Explained Simply',
  metaDescription:
    'Attention Is All You Need, GPT, scaling laws, Chinchilla, InstructGPT, chain of thought and Constitutional AI: what each paper did and what it means for you.',
  h1: 'The AI papers that built ChatGPT and Claude, explained simply',
  tldr: 'Modern AI chatbots rest on a handful of research papers published between 2017 and 2022. The transformer (2017) gave us the engine, the GPT papers showed that predicting the next word on lots of text teaches a model many skills, scaling laws and Chinchilla showed how big to build it, InstructGPT turned it into an assistant, chain of thought taught it to show its working, and Constitutional AI trained it with written principles. Each one explains something you see in ChatGPT or Claude today.',
  minutes: 14,
  level: 'Beginner',
  steps: [
    {
      heading: '2017: Attention Is All You Need (the engine)',
      body: [
        'The problem: older language models read a sentence one word at a time, in order, like reading with your finger under each word. That made them slow to train, because the computer could not work on many words at once.',
        'The key idea: a Google team of eight authors, with Ashish Vaswani as first author, proposed the Transformer. It drops word-by-word reading and uses only “attention”: every word looks at every other word at the same time to work out which ones matter to it. In “the bank of the river”, attention helps “bank” look at “river” and pick the right meaning.',
        'Why it mattered: it translated English to German better than any earlier system (28.4 on the BLEU translation score, more than 2 points above the previous best) and trained in 3.5 days on eight GPUs for English to French, a small fraction of earlier costs. Because it could run in parallel, people could now train much bigger models.',
      ],
      keyIdea:
        'You see it today in every chatbot: the GPT models that followed were all built on the transformer. Lesson 5 explains attention in depth.',
    },
    {
      heading: '2018 to 2020: GPT-1, GPT-2 and GPT-3 (predict the next word, learn everything)',
      body: [
        'The problem: AI models were trained separately for each task, one for translation, one for answering questions, each needing lots of labelled examples that people had to prepare by hand.',
        'The key idea, in three steps. GPT-1 (June 2018): first train a transformer on a few thousand books just to predict text, then fine-tune it a little for each task. It beat the previous best on most tasks it was tested on. GPT-2 (February 2019): a 1.5 billion parameter model trained only to predict the next word on about 40 GB of text from 8 million web pages. With no task-specific training it set records on several tests. GPT-3 (May 2020): 175 billion parameters, ten times bigger than any earlier model of its kind. You could teach it a new task just by showing a few examples in the prompt.',
      ],
      flow: [
        'Lots of text',
        'Predict the next word',
        'Model picks up grammar, facts, skills',
        'Do new tasks from a prompt',
      ],
      example: {
        label: 'Few-shot prompting, the GPT-3 idea you still use',
        text: 'Translate to Hindi:\nGood morning → सुप्रभात\nThank you → धन्यवाद\nSee you tomorrow →\n\nThe model continues the pattern. No retraining, just examples in the prompt.',
      },
      keyIdea:
        'What you see today: you can ask ChatGPT or Claude to do almost any text task in plain words, and giving examples in your prompt still helps.',
    },
    {
      heading: '2020 and 2022: Scaling laws and Chinchilla (how big to build it)',
      body: [
        'The problem: training a large model costs millions of dollars. Before you spend that, you want to know: will a bigger model actually be better, and should you spend the money on a bigger model or on more data?',
        'Scaling laws (Kaplan and colleagues at OpenAI, January 2020): the model’s error falls in a smooth, predictable way as you add parameters, data and computing power, across more than seven orders of magnitude (a range of ten million times). Think of it like knowing that each extra hour of study reliably raises your marks by a known amount. Their advice was to train very large models on a modest amount of data.',
        'Chinchilla (Hoffmann and colleagues at DeepMind, March 2022) trained over 400 models and corrected that advice: most large models were undertrained. Model size and training data should grow together. Their 70 billion parameter Chinchilla used the same computing budget as the 280 billion parameter Gopher, but with 4 times more data, and it beat Gopher and GPT-3 on a wide range of tasks while being cheaper to run.',
      ],
      example: {
        label: 'The Chinchilla rule of thumb (from the paper)',
        text: '“For every doubling of model size the number of training tokens should also be doubled.”\n\nChinchilla, 70B parameters → 67.5% on the MMLU knowledge test\nGopher, 280B parameters → more than 7 points lower',
      },
      keyIdea:
        'What you see today: labs plan model size and data together, which is why smaller, cheaper models can still be very capable.',
    },
    {
      heading: '2022: InstructGPT (from autocomplete to assistant)',
      body: [
        'The problem: a bigger model is not automatically a more helpful one. A model trained only to predict internet text can be untruthful, toxic or simply ignore what you asked, because it is continuing text, not following instructions.',
        'The key idea: Long Ouyang and colleagues at OpenAI fine-tuned GPT-3 with human feedback in three stages. People wrote good example answers, then ranked several model answers from best to worst, a reward model learned those rankings, and the model was trained to score higher. This is RLHF (reinforcement learning from human feedback).',
        'Why it mattered: people preferred answers from the 1.3 billion parameter InstructGPT over the 175 billion parameter GPT-3, a model about 100 times bigger. In November 2022, OpenAI trained ChatGPT using the same approach.',
      ],
      flow: [
        'Humans write example answers',
        'Humans rank model answers',
        'Reward model learns rankings',
        'Model trained to score higher',
      ],
      keyIdea:
        'What you see today: ChatGPT and Claude answer like helpful assistants instead of random web pages. Lesson 7 covers this training in detail.',
    },
    {
      heading: '2022: Chain-of-thought prompting (show your working)',
      body: [
        'The problem: large models were good at language but often wrong on maths word problems and multi-step logic. They jumped straight to an answer.',
        'The key idea: Jason Wei and colleagues at Google showed that if your prompt includes a few worked examples that write out the steps, the model also writes out its steps, and gets far more answers right. With just eight such examples, Google’s 540 billion parameter PaLM model reached 58% on GSM8K, a set of school maths word problems, a new best. The benefit only showed up in big models, around 100 billion parameters and above.',
        'A few months later, another team (Kojima and colleagues) found you do not even need examples. Adding “Let’s think step by step” raised one model’s score on GSM8K from 10.4% to 40.7%.',
      ],
      keyIdea:
        'What you see today: “thinking” or reasoning models that work through a problem before answering grew out of this idea. That is the next lesson after training.',
    },
    {
      heading: '2022: Constitutional AI (training with written principles)',
      body: [
        'The problem: RLHF needs lots of people to rate answers, including harmful ones, which is slow and unpleasant work. And the values being taught stay hidden inside thousands of individual ratings.',
        'The key idea: Yuntao Bai and colleagues at Anthropic gave the model a short written list of principles, a “constitution”. The model critiques and rewrites its own answers using those principles, then an AI judge compares answers to train it further. They called this RL from AI feedback (RLAIF). The result was an assistant that was harmless but not evasive: when it declined a harmful request, it explained why instead of just refusing.',
      ],
      keyIdea:
        'What you see today: Claude is trained with a public constitution. Anthropic published a new, longer one in January 2026 that anyone can read and reuse.',
    },
  ],
  keyTerms: [
    {
      term: 'Research paper',
      meaning:
        'A written report of a new method and its results. AI papers are usually shared free on arXiv.org before or alongside journal publication.',
    },
    {
      term: 'Transformer',
      meaning:
        'The 2017 model design that uses attention to look at all words at once. Today’s chatbots are built on it.',
    },
    {
      term: 'Scaling laws',
      meaning:
        'The finding that a model’s error drops in a smooth, predictable way as you add parameters, data and computing power.',
    },
    {
      term: 'Few-shot prompting',
      meaning:
        'Teaching a model a task by putting a few examples in your prompt, with no retraining. Made famous by GPT-3.',
    },
    {
      term: 'RLHF',
      meaning:
        'Reinforcement learning from human feedback: people rank answers, a reward model learns their preferences, and the model is trained toward them.',
    },
    {
      term: 'Chain of thought',
      meaning: 'Having the model write out intermediate reasoning steps before its final answer.',
    },
  ],
  videos: [
    {
      youtubeId: 'iDulhoQ2pro',
      title: 'Attention Is All You Need',
      channel: 'Yannic Kilcher',
      minutes: 27,
      why: 'A researcher walks through the original transformer paper page by page. Watch after this lesson and the transformers lesson; skip the maths you do not need yet.',
    },
  ],
  tryIt: {
    title: 'Read a real AI paper abstract with an AI tutor, then test chain of thought',
    steps: [
      'Open the Attention Is All You Need page on arXiv (link below). Read only the title and the short abstract. It is about 10 lines.',
      'Copy the abstract into ChatGPT, Claude or Gemini (free versions are fine) and ask: “Explain this abstract to a first-year college student in 5 short bullet points. Explain every technical term.”',
      'Check the AI: does its summary mention 28.4 BLEU and 3.5 days on eight GPUs, as the abstract does? If it adds numbers that are not in the abstract, it is making them up.',
      'Now test chain of thought. In a new chat, ask: “A pen and a notebook cost ₹110 in total. The notebook costs ₹100 more than the pen. How much is the pen? Answer with just a number.” Then ask again in another new chat, ending with “Think step by step.” Compare. The right answer is ₹5.',
      'Optional: repeat step 2 with the InstructGPT abstract (arxiv.org/abs/2203.02155) and ask how it connects to ChatGPT.',
    ],
    link: {
      label: 'Open “Attention Is All You Need” on arXiv',
      url: 'https://arxiv.org/abs/1706.03762',
    },
  },
  check: [
    {
      q: 'What was the main change the 2017 transformer paper made?',
      options: [
        'It used much more training data than anyone before',
        'It dropped word-by-word reading and used attention, so all words could be processed at once',
        'It added human feedback to training',
        'It was the first model to generate images',
      ],
      answer: 1,
      why: 'The transformer relies only on attention, with no word-by-word recurrence. That made it faster to train and easier to run in parallel, which opened the door to much bigger models.',
    },
    {
      q: 'What did the Chinchilla paper find?',
      options: [
        'Bigger models are always better, whatever the data',
        'Model size and training data should grow together, so many large models were undertrained',
        'Models stop improving after 10 billion parameters',
        'Human feedback matters more than size',
      ],
      answer: 1,
      why: 'Chinchilla showed that for a fixed compute budget, you should double the training data every time you double the model size. The smaller Chinchilla, trained on 4 times more data, beat the much bigger Gopher.',
    },
    {
      q: 'Why did people prefer a 1.3 billion parameter InstructGPT model over the 175 billion parameter GPT-3?',
      options: [
        'It had access to the internet',
        'It was trained with human feedback to follow what users actually wanted',
        'It used a new kind of computer chip',
        'It was trained on more books',
      ],
      answer: 1,
      why: 'Size alone does not make a model follow instructions. RLHF taught InstructGPT what helpful answers look like, so a much smaller model was preferred.',
    },
  ],
  sources: [
    {
      label: 'Vaswani et al. (2017): Attention Is All You Need (arXiv)',
      url: 'https://arxiv.org/abs/1706.03762',
    },
    {
      label:
        'OpenAI (June 11, 2018): Improving language understanding with unsupervised learning (GPT-1)',
      url: 'https://openai.com/index/language-unsupervised/',
    },
    {
      label: 'OpenAI (Feb 14, 2019): Better language models and their implications (GPT-2)',
      url: 'https://openai.com/index/better-language-models/',
    },
    {
      label: 'Brown et al. (2020): Language Models are Few-Shot Learners (GPT-3)',
      url: 'https://arxiv.org/abs/2005.14165',
    },
    {
      label: 'Kaplan et al. (2020): Scaling Laws for Neural Language Models',
      url: 'https://arxiv.org/abs/2001.08361',
    },
    {
      label: 'Hoffmann et al. (2022): Training Compute-Optimal Large Language Models (Chinchilla)',
      url: 'https://arxiv.org/abs/2203.15556',
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
      label:
        'Wei et al. (2022): Chain-of-Thought Prompting Elicits Reasoning in Large Language Models',
      url: 'https://arxiv.org/abs/2201.11903',
    },
    {
      label:
        'Google Research (May 11, 2022): Language Models Perform Reasoning via Chain of Thought',
      url: 'https://research.google/blog/language-models-perform-reasoning-via-chain-of-thought/',
    },
    {
      label: 'Kojima et al. (2022): Large Language Models are Zero-Shot Reasoners',
      url: 'https://arxiv.org/abs/2205.11916',
    },
    {
      label: 'Bai et al. (2022): Constitutional AI: Harmlessness from AI Feedback',
      url: 'https://arxiv.org/abs/2212.08073',
    },
    {
      label: 'Anthropic (Jan 22, 2026): Claude’s new constitution',
      url: 'https://www.anthropic.com/news/claude-new-constitution',
    },
    { label: 'Wikipedia: Anthropic (founders)', url: 'https://en.wikipedia.org/wiki/Anthropic' },
    {
      label: 'Yannic Kilcher (YouTube): Attention Is All You Need',
      url: 'https://www.youtube.com/watch?v=iDulhoQ2pro',
    },
  ],
  faqs: [
    {
      q: 'What is the most important AI paper?',
      a: 'Most people point to “Attention Is All You Need” (Google, 2017), which introduced the transformer. Every GPT model since was built on it. But a chatbot like ChatGPT also needed the GPT papers, scaling laws and InstructGPT, so it is better to think of a short chain of papers than one.',
    },
    {
      q: 'Do I need to read AI research papers to work in AI?',
      a: 'Not to use AI or build apps with it. But reading the abstract and introduction of the key papers helps you understand why models behave as they do, and it comes up in AI engineer interviews. Paste an abstract into an AI tool and ask it to explain each term, then check its summary against the original.',
    },
    {
      q: 'Where can I read AI papers for free?',
      a: 'Most AI papers are free on arXiv.org. Each paper has an abstract page (like arxiv.org/abs/1706.03762) with a short summary and a PDF link. Labs such as OpenAI, Anthropic and Google DeepMind also publish plain-language blog posts about their research.',
    },
  ],
  related: [
    { label: 'Previous: Transformers and attention', href: '/learn-ai/transformers-explained' },
    { label: 'Next: Mixture of experts (MoE)', href: '/learn-ai/mixture-of-experts' },
    { label: 'Reasoning models and thinking', href: '/learn-ai/reasoning-models' },
    { label: 'AI safety and alignment', href: '/learn-ai/ai-safety-and-alignment' },
    {
      label: 'Build an LLM with Karpathy’s Zero to Hero',
      href: '/learn-ai/build-an-llm-from-scratch',
    },
    { label: 'AI engineer career guide', href: '/ai-engineer' },
  ],
  fromTheSource: [
    {
      who: 'Ashish Vaswani, Noam Shazeer, Niki Parmar and colleagues',
      role: 'The Google team of eight authors who introduced the transformer',
      work: 'Attention Is All You Need (paper, 2017)',
      url: 'https://arxiv.org/abs/1706.03762',
      idea: 'They showed that a model built only from attention, with no step-by-step reading of words, translates better and trains much faster. Their architecture was “more parallelizable and requiring significantly less time to train.”',
      breakdown: [
        'Older models processed words in order, so they could not use many processors at once.',
        'Attention lets every word look at every other word in one go, which suits GPUs.',
        'Faster training meant labs could afford to train far bigger models on far more text.',
        'The GPT series, and the chatbots built on it, came out of this design.',
      ],
      use: 'When an AI tool handles your whole document at once and connects a pronoun on page 3 to a name on page 1, that is attention at work. It is also why the context you give matters: the model attends to everything you paste in.',
    },
    {
      who: 'Jared Kaplan, Sam McCandlish, Dario Amodei and colleagues',
      role: 'OpenAI researchers in 2020; Kaplan, McCandlish and Amodei were later among Anthropic’s founders',
      work: 'Scaling Laws for Neural Language Models (paper, 2020)',
      url: 'https://arxiv.org/abs/2001.08361',
      idea: 'They found that a language model’s error falls in a smooth, predictable way as you scale it up: “The loss scales as a power-law with model size, dataset size, and the amount of compute.”',
      breakdown: [
        'Loss means how wrong the model’s next-word guesses are. Lower is better.',
        'A power law means steady, predictable gains each time you multiply size, data or compute.',
        'Small details of the design mattered much less than overall scale.',
        'This gave labs the confidence to spend huge sums on bigger models, and Chinchilla later refined how to split that budget between size and data.',
      ],
      use: 'It explains why each new model generation is usually better and why larger models in a family (for example, a “Pro” or “Opus” tier) tend to beat smaller ones on hard tasks, while costing more per answer.',
    },
  ],
}
