import type { Lesson } from '../types'

export const lesson: Lesson = {
  slug: 'fine-tuning-vs-rag',
  track: 'deeper',
  order: 22,
  title: 'Prompting vs RAG vs fine-tuning',
  metaTitle: 'Fine-Tuning vs RAG vs Prompting: When to Use Which',
  metaDescription:
    'Fine-tuning vs RAG vs prompt engineering explained simply: what each one does, cost and effort, and a decision flow based on OpenAI, Anthropic and Google docs.',
  h1: 'Fine-tuning vs RAG vs prompting: when to use which',
  tldr: 'Start with prompting, always. Add RAG (retrieval-augmented generation) when the model is missing knowledge, such as your private documents or facts that change often. Use fine-tuning only when the model is missing behaviour, like a strict format or style, that good prompts and examples cannot fix. Let a small test set decide, not hype.',
  minutes: 12,
  level: 'Intermediate',
  steps: [
    {
      heading: 'Three ways to make an AI fit your job',
      body: [
        'OpenAI explains the choice with an exam analogy. Prompting and RAG are like letting the model sit the exam with the textbook open: you put the right information in front of it, in the prompt. Fine-tuning is like months of classes beforehand: the model learns from many examples and its internal settings change.',
        'In plain terms: prompting means writing better instructions and examples. RAG means automatically finding the relevant pages from your documents and adding them to the prompt. Fine-tuning means training an existing model further on your own examples, which changes its weights (the numbers it learned in training).',
      ],
      flow: [
        'Prompting: better instructions',
        'RAG: fetch your documents into the prompt',
        'Fine-tuning: retrain on your examples',
      ],
      keyIdea:
        'Prompting and RAG change what the model sees. Fine-tuning changes the model itself.',
    },
    {
      heading: 'Always start with prompting and a test set',
      body: [
        'OpenAI calls prompt engineering “typically the best place to start”, and Google’s tuning guide says the same: start with prompting to find the best prompt. It costs nothing to set up and you see results immediately.',
        'Before you go further, build a small test set: 20 to 50 real questions with the answers you expect. This is called an eval. It tells you whether a change actually helped. If your documents are small, you may not even need RAG: Anthropic notes that if your knowledge base is under about 200,000 tokens, you can simply put all of it in the prompt.',
      ],
      example: {
        label: 'A tiny eval for a college helpdesk bot (illustrative)',
        text: `Q: What is the last date to pay semester fees?        Expected: 15 July
Q: Can I get a refund after the add/drop week?        Expected: No, only within 7 days
Q: Who do I contact for hostel allotment?             Expected: Warden office, Block C
...
Score each version of your system: how many of 30 does it get right?`,
        code: true,
      },
    },
    {
      heading: 'Use RAG when the model lacks knowledge',
      body: [
        'A model only knows what was in its training data. It has never seen your company’s HR policy, your coaching institute’s fee PDF or this week’s prices. Google describes RAG as combining search with an LLM, so answers are grounded in up-to-date information. Updating knowledge is cheap: change the document and the next answer uses it.',
        'The catch is that RAG is only as good as its search step. Google warns that if the retrieved text is irrelevant, the answer can be “grounded but off-topic or incorrect”. Anthropic showed that better retrieval matters: its Contextual Retrieval method cut failed retrievals by 49%, and by 67% when combined with reranking. You will build this in the Embeddings and RAG lesson.',
      ],
      bullets: [
        'Facts are private: internal docs, policies, product manuals',
        'Facts change often: prices, schedules, stock, news',
        'Users need citations: “show me where it says that”',
        'Too much material to fit in one prompt',
      ],
    },
    {
      heading: 'Use fine-tuning when the model lacks behaviour',
      body: [
        'Fine-tuning shines when you need the same kind of output again and again: sorting support tickets, extracting fields from forms, or always answering in one strict format or brand voice. Google lists classification, sentiment analysis and entity extraction as good fits. It can also let a smaller, cheaper model do a job that needed a bigger one, with shorter prompts.',
        'A real example: Anthropic fine-tuned its small Claude 3 Haiku model to moderate forum comments. Accuracy rose from 81.5% to 99.6%, and tokens per query dropped by 85%. The cost is data and upkeep. OpenAI suggests starting with 50 or more high-quality examples; Google says think 100 examples or more. And when your facts change, you have to retrain.',
      ],
      bullets: [
        'Good for: consistent format, tone, classification, cheaper specialised models',
        'Not good for: adding fresh or frequently changing facts',
        'Needs: hundreds of clean examples, an eval, and time to retrain',
        'Check availability: OpenAI’s docs say it is winding down its fine-tuning platform and it is closed to new users (as of Nov 2026); Google still offers tuning for Gemini',
      ],
    },
    {
      heading: 'Cost and effort, side by side',
      body: [
        'Here is the trade-off in one view. The order also matches how much work each one takes, which is why every vendor guide says to go left to right.',
      ],
      example: {
        label: 'Prompting vs RAG vs fine-tuning (rough guide)',
        code: true,
        text: `                 Prompting        RAG                     Fine-tuning
Fixes            instructions     missing knowledge       inconsistent behaviour
Setup effort     minutes          days (search pipeline)  weeks (data + training)
Data needed      a few examples   your documents          100s of labelled examples
Update facts     edit the prompt  edit the documents      retrain the model
Shows sources    no               yes                     no
Extra cost       none             storage + search        training + upkeep`,
      },
    },
    {
      heading: 'A decision flow you can reuse',
      body: [
        'Run your eval after every step and only move on if the score is still too low. Diagnose the failure first: wrong or missing facts point to RAG; right facts but wrong format, tone or reasoning pattern point to fine-tuning.',
        'You can combine them. IBM’s example is a legal assistant that uses RAG for recent court decisions, prompting for document format and fine-tuning for firm-specific style. But more is not always better: in one OpenAI case study, adding RAG to a fine-tuned model lowered accuracy. Let the test set decide.',
      ],
      flow: [
        'Clear prompt + eval',
        'Good enough? Ship it',
        'Missing facts? Add RAG',
        'Wrong behaviour at scale? Fine-tune',
        'Re-run the eval',
      ],
      keyIdea:
        'Knowledge problem: RAG. Behaviour problem: fine-tuning. Everything else: a better prompt.',
    },
  ],
  keyTerms: [
    {
      term: 'RAG (retrieval-augmented generation)',
      meaning:
        'Finding the most relevant parts of your documents and adding them to the prompt so the model answers from them.',
    },
    {
      term: 'Fine-tuning',
      meaning:
        'Training an existing model further on your own input-output examples so its behaviour changes.',
    },
    {
      term: 'Weights',
      meaning:
        'The millions or billions of numbers inside a model that store what it learned. Fine-tuning changes them; prompting and RAG do not.',
    },
    {
      term: 'Eval (test set)',
      meaning:
        'A list of real questions with expected answers, used to score whether a change helped.',
    },
    {
      term: 'Context window',
      meaning:
        'How much text a model can read at once. If your documents fit, you may not need RAG.',
    },
  ],
  videos: [
    {
      youtubeId: 'zYGDpG-pTho',
      title: 'RAG vs Fine-Tuning vs Prompt Engineering: Optimizing AI Models',
      channel: 'IBM Technology',
      minutes: 11,
      why: 'A clear whiteboard comparison of all three, including costs like compute and “catastrophic forgetting”, and how they combine.',
    },
  ],
  tryIt: {
    title: 'Feel the difference in 10 minutes, no code',
    steps: [
      'Find a short document the model has never seen, such as your college’s attendance rules, a company leave policy or a product FAQ page.',
      'Prompting only: ask Claude or ChatGPT a specific question about it without pasting it. Note whether it guesses.',
      '“Manual RAG”: in a new chat, paste the document inside <document> tags and ask: “Answer only from the document and quote the line you used.” Compare.',
      '“Fine-tuning feel”: give 3 examples of answers in a strict format (for example, “Answer: … | Source line: …”) and ask 3 new questions. See how examples lock the format.',
      'Write one line: which problem did each step fix, knowledge or behaviour?',
    ],
    link: { label: 'Open Claude (free)', url: 'https://claude.ai' },
  },
  check: [
    {
      q: 'Your chatbot must answer questions about a product catalogue whose prices change every week. What fits best?',
      options: [
        'Fine-tuning every week',
        'RAG over the latest catalogue',
        'A longer system prompt with old prices',
        'A bigger model with no extra data',
      ],
      answer: 1,
      why: 'Changing facts are a knowledge problem. With RAG, updating the catalogue updates the answers, with no retraining.',
    },
    {
      q: 'A support bot gets the facts right but its replies are in inconsistent formats, even after good prompts and examples. What should you consider next?',
      options: [
        'RAG',
        'Fine-tuning on a few hundred well-formatted examples',
        'Removing the examples',
        'A model with a bigger context window',
      ],
      answer: 1,
      why: 'Right facts with inconsistent behaviour is the classic case for fine-tuning, once prompting has been pushed as far as it goes.',
    },
    {
      q: 'Your college handbook is about 80 pages. What is the simplest thing to try first?',
      options: [
        'Fine-tune a model on the handbook',
        'Build a full vector database pipeline',
        'Put the whole handbook in the prompt and test it on real questions',
        'Ask the model without any handbook',
      ],
      answer: 2,
      why: 'It easily fits in a modern context window. Anthropic notes that knowledge under about 200,000 tokens can go straight into the prompt.',
    },
  ],
  fromTheSource: [
    {
      who: 'Patrick Lewis and 11 co-authors at Facebook AI Research, University College London and New York University',
      role: 'The team that introduced and named retrieval-augmented generation (RAG) in 2020.',
      work: 'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (2020)',
      url: 'https://arxiv.org/abs/2005.11401',
      idea: 'They paired a model’s built-in memory, the knowledge stored in its parameters, with an outside memory: a searchable index of Wikipedia. The system first retrieves relevant passages, then writes its answer using them, and this gave more specific and more factual answers than the model alone.',
      breakdown: [
        'Parametric memory: what the model learned in training. It is hard to inspect or update.',
        'Non-parametric memory: documents you can search, read and replace at any time.',
        'Updating knowledge is a swap: when they replaced a 2016 Wikipedia index with a 2018 one, the model answered questions about the newer world leaders, with no retraining.',
        'Because each answer is built from retrieved passages, the system can point to where a fact came from.',
      ],
      use: 'When your app must know your own or fast-changing facts, keep them in documents and retrieve them, instead of training them into the model. To change an answer, change the document.',
    },
    {
      who: 'Edward Hu and seven co-authors at Microsoft',
      role: 'The Microsoft team behind LoRA, a low-cost way to fine-tune large models that is now widely used.',
      work: 'LoRA: Low-Rank Adaptation of Large Language Models (2021)',
      url: 'https://arxiv.org/abs/2106.09685',
      idea: 'Instead of retraining all of a model’s weights, LoRA freezes them and trains small extra matrices added to each layer. Compared with fully fine-tuning GPT-3 175B, it cut the number of trainable parameters by 10,000 times and GPU memory by 3 times, with no extra delay when the model answers.',
      breakdown: [
        'The big model stays frozen. Only a small add-on is trained.',
        'Their bet: the change a model needs for a new task is simple (“low rank”), so a small add-on can capture it.',
        'Because each add-on is small, one shared base model can be paired with many add-ons, one per task.',
      ],
      use: 'If prompting and RAG are not enough and you fine-tune an open model such as Llama, you will almost certainly meet LoRA. It needs far fewer trainable numbers and less GPU memory than full fine-tuning, which puts fine-tuning within reach of a small budget.',
    },
  ],
  sources: [
    {
      label: 'OpenAI: Optimizing LLM accuracy',
      url: 'https://developers.openai.com/api/docs/guides/optimizing-llm-accuracy',
    },
    {
      label: 'OpenAI: Model optimization (evals, prompting, fine-tuning)',
      url: 'https://developers.openai.com/api/docs/guides/model-optimization',
    },
    {
      label: 'Anthropic: Introducing Contextual Retrieval',
      url: 'https://www.anthropic.com/news/contextual-retrieval',
    },
    {
      label: 'Anthropic: Fine-tune Claude 3 Haiku in Amazon Bedrock',
      url: 'https://claude.com/blog/fine-tune-claude-3-haiku',
    },
    {
      label: 'Anthropic: Prompt engineering overview',
      url: 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview',
    },
    {
      label: 'Google Cloud: Introduction to tuning (Gemini)',
      url: 'https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tuning.md.txt',
    },
    {
      label: 'Google Cloud: What is retrieval-augmented generation?',
      url: 'https://cloud.google.com/use-cases/retrieval-augmented-generation',
    },
    {
      label: 'IBM Technology video transcript: RAG vs Fine-Tuning vs Prompt Engineering',
      url: 'https://sozai.app/transcript/rag-vs-finetuning-vs-prompt-engineering-ai/',
    },
    {
      label:
        'Lewis et al. (2020): Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks',
      url: 'https://arxiv.org/abs/2005.11401',
    },
    {
      label: 'Hu et al. (2021): LoRA: Low-Rank Adaptation of Large Language Models',
      url: 'https://arxiv.org/abs/2106.09685',
    },
  ],
  faqs: [
    {
      q: 'Is RAG better than fine-tuning?',
      a: 'They solve different problems. RAG gives a model knowledge it lacks, like private or changing facts, and can show sources. Fine-tuning changes behaviour, like format or tone. Most teams should try prompting first, then RAG, and fine-tune last.',
    },
    {
      q: 'Can fine-tuning add new knowledge to an LLM?',
      a: 'It is a poor fit for that. Vendor guides present fine-tuning mainly for format, style and task behaviour, and every fact update would mean retraining. For new or changing facts, put the information in the prompt or use RAG.',
    },
    {
      q: 'How much data do you need to fine-tune an LLM?',
      a: 'OpenAI suggests starting with 50 or more high-quality examples, and Google’s guide says to think of 100 or more, often hundreds to thousands for supervised tuning. Quality matters more than quantity.',
    },
  ],
  related: [
    { label: 'Embeddings and RAG', href: '/learn-ai/embeddings-and-rag' },
    { label: 'Evals: does your AI work?', href: '/learn-ai/ai-evals' },
    { label: 'Prompting techniques that work', href: '/learn-ai/prompt-engineering' },
    { label: 'Next: Build an LLM with Karpathy', href: '/learn-ai/build-an-llm-from-scratch' },
    { label: 'AI engineer guide', href: '/ai-engineer' },
    { label: 'AI product manager guide', href: '/aipm' },
  ],
}
