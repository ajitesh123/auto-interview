import type { Lesson } from '../types'

export const lesson: Lesson = {
  slug: 'history-of-ai',
  track: 'foundations',
  order: 2,
  title: 'How AI started: 1956 to ChatGPT',
  metaTitle: 'History of AI: Timeline From 1956 Dartmouth to ChatGPT',
  metaDescription:
    'A simple history of AI with sourced dates: the 1956 Dartmouth workshop, AI winters, AlexNet, the 2017 transformer, GPT-3, ChatGPT, Claude, Gemini and AI agents.',
  h1: 'How AI started: a short history from 1956 Dartmouth to ChatGPT',
  tldr: 'AI got its name at a 1956 summer workshop at Dartmouth College, then went through boom and bust cycles called AI winters. Deep learning took off in 2012, Google’s 2017 transformer paper made today’s language models possible, and ChatGPT (November 2022) brought AI to everyone. Since 2024 the focus has moved to reasoning models and AI agents that take actions.',
  minutes: 10,
  level: 'Beginner',
  steps: [
    {
      heading: '1950–1956: Can machines think?',
      body: [
        'In 1950 the British mathematician Alan Turing published a paper that opens with the question “Can machines think?”. A few years later, four researchers, John McCarthy, Marvin Minsky, Nathaniel Rochester and Claude Shannon, proposed a summer study of “artificial intelligence”. McCarthy chose the name.',
        'Their proposal guessed that “every aspect of learning or any other feature of intelligence” could in principle be described so precisely that a machine could simulate it. That bold guess still drives the field. The workshop ran at Dartmouth College in the summer of 1956, and it is usually called the birth of AI as a field.',
      ],
      bullets: [
        'Oct 1950: Turing, “Computing Machinery and Intelligence”',
        'Aug 31, 1955: Dartmouth proposal written (submitted Sep 2, 1955)',
        'Summer 1956 (about June 18 to Aug 17): the Dartmouth workshop',
      ],
    },
    {
      heading: '1970s–1990s: Big promises and two AI winters',
      body: [
        'Early researchers expected fast progress. Computers of the time were far too slow and data was scarce, so results fell short. Funding dried up in periods now called “AI winters”: roughly 1974–1980 and 1987–2000.',
        'In between came expert systems, programs packed with hand-written rules from human experts. They worked in narrow areas but were costly to maintain and could not learn. In May 1997 IBM’s Deep Blue became the first computer to beat a reigning world chess champion, Garry Kasparov. Impressive, but it could only play chess.',
      ],
      bullets: [
        '1973: the UK Lighthill report criticises AI; UK funding is largely cut',
        '1974: DARPA in the US moves money away from open-ended AI research',
        '1987: the market for special AI computers (Lisp machines) collapses',
        'May 1997: Deep Blue beats Kasparov',
      ],
      keyIdea: 'AI winters happen when promises run far ahead of what the technology can do.',
    },
    {
      heading: '2012: Deep learning wins',
      body: [
        'Three things had changed by 2012: the internet produced huge amounts of data, gaming chips called GPUs made heavy maths cheap, and better methods for training neural networks existed. In 2012 Alex Krizhevsky, Ilya Sutskever and Geoffrey Hinton entered a deep neural network, later nicknamed AlexNet, in the ImageNet image-recognition contest.',
        'It was wrong on about 15.3% of test images (top-5 error), while the next best team was wrong on about 26.2%. That gap convinced researchers that deep learning, trained on lots of data with GPUs, beat older methods. Almost every AI system you use today comes from this shift.',
      ],
      example: {
        label: 'AlexNet in numbers',
        text: 'About 1.3 million training images, 60 million parameters, trained on GPUs.\nImageNet 2012 top-5 error: 15.3% (AlexNet) vs 26.2% (second place).',
      },
    },
    {
      heading: '2017–2020: Transformers and GPT',
      body: [
        'On June 12, 2017, a team mostly from Google Brain and Google Research posted “Attention Is All You Need”. It introduced the transformer, a design that reads all the words of a sentence at once using a trick called attention, instead of one word at a time. That made it much faster to train on GPUs, so models could grow far bigger.',
        'In June 2018 OpenAI showed GPT: pretrain a transformer on lots of plain text, then fine-tune it for specific tasks. Google’s BERT followed in October 2018. In May 2020 GPT-3, with 175 billion parameters, showed that a big enough model could do new tasks from just a few examples in the prompt.',
      ],
      bullets: [
        'Jun 12, 2017: “Attention Is All You Need” (the transformer)',
        'Jun 11, 2018: OpenAI’s first GPT',
        'Oct 11, 2018: Google’s BERT',
        'May 28, 2020: GPT-3 (175 billion parameters)',
      ],
    },
    {
      heading: '2022–2023: Chatbots for everyone',
      body: [
        'Raw language models were good at continuing text but not at following instructions. In March 2022 OpenAI’s InstructGPT paper showed that training with human feedback (RLHF) made models much more helpful. On November 30, 2022, OpenAI released ChatGPT, built with the same method, and AI became something anyone could try in a browser.',
        'March 14, 2023 was a busy day: OpenAI announced GPT-4, which could also read images, and Anthropic launched Claude. On December 6, 2023 Google announced Gemini, designed from the start to handle text, images and other inputs together.',
      ],
      bullets: [
        'Mar 4, 2022: InstructGPT paper (learning from human feedback)',
        'Nov 30, 2022: ChatGPT launches',
        'Mar 14, 2023: GPT-4 and Claude',
        'Dec 6, 2023: Gemini 1.0 (Ultra, Pro and Nano)',
      ],
    },
    {
      heading: '2024–2026: Reasoning models and agents',
      body: [
        'In September 2024 OpenAI released o1, a model trained to “think” in steps before answering. In January 2025 DeepSeek’s R1 paper showed that this kind of reasoning can be learned with reinforcement learning. Reasoning models are much better at maths and code.',
        'At the same time, AI started taking actions, not just chatting. These systems are called agents. In October 2024 Claude learned to use a computer by looking at the screen and clicking. In November 2024 Anthropic released MCP, an open standard for connecting AI to tools and data. Coding agents like Claude Code became generally available in 2025, and by 2026 many Claude models can read about a million tokens (roughly 750,000 English words) in one go.',
      ],
      bullets: [
        'Sep 12, 2024: OpenAI o1, a reasoning model',
        'Oct 22, 2024: Claude computer use (public beta)',
        'Nov 25, 2024: Model Context Protocol (MCP)',
        'Jan 2025: DeepSeek-R1 paper and OpenAI’s Operator browser agent',
        'May 22, 2025: Claude Code generally available; Dec 9, 2025: MCP donated to the Linux Foundation’s Agentic AI Foundation',
      ],
      keyIdea:
        'The story so far: rules (1950s–1990s), then learning from data (2012), then language models (2017–2023), then reasoning and agents (2024 onward).',
    },
  ],
  keyTerms: [
    {
      term: 'AI winter',
      meaning:
        'A period when interest and funding for AI dropped after results fell short of promises. The two big ones were about 1974–1980 and 1987–2000.',
    },
    {
      term: 'Expert system',
      meaning:
        'An older type of AI made of many hand-written “if this, then that” rules from human experts.',
    },
    {
      term: 'Deep learning',
      meaning:
        'Machine learning with many-layer neural networks. It took off after AlexNet in 2012.',
    },
    {
      term: 'Transformer',
      meaning:
        'The neural network design from Google’s 2017 paper that powers GPT, Claude and Gemini.',
    },
    {
      term: 'Reasoning model',
      meaning:
        'A language model trained to work through a problem step by step before giving its final answer.',
    },
    {
      term: 'AI agent',
      meaning:
        'An AI system that can take actions, like browsing, clicking or running code, to finish a task.',
    },
  ],
  videos: [
    {
      youtubeId: 'UFJQV5Jb0pY',
      title: 'The History of AI Explained: Crash Course Futures of AI #1',
      channel: 'CrashCourse',
      minutes: 13,
      why: 'A fast, friendly tour from early computers and Deep Blue to deep learning, transformers and scaling. Good to watch after this lesson to lock in the big picture.',
    },
  ],
  tryIt: {
    title: 'Ask AI for its own history, then fact-check it',
    steps: [
      'Open a free chatbot such as ChatGPT, Claude or Gemini.',
      'Ask: “Give me 8 key milestones in AI history from 1950 to today, each with an exact date and one line on why it mattered.”',
      'Pick any 3 dates from its answer and check them against the timeline in this lesson and the sources below.',
      'Note any date or claim that is wrong or vague. Then ask the chatbot: “Are you sure about [that item]? Give me a source.” See whether it corrects itself.',
      'Write one line for yourself: which milestone surprised you most, and why?',
    ],
    link: { label: 'Open ChatGPT (free)', url: 'https://chatgpt.com' },
  },
  check: [
    {
      q: 'Why did the AI winters happen?',
      options: [
        'Governments banned AI research',
        'Results fell far short of early promises, so funding and interest dropped',
        'Computers became too fast to control',
        'The internet had not been invented, so AI was illegal to sell',
      ],
      answer: 1,
      why: 'Early researchers expected fast progress, but slow computers and little data held results back. When promises were not met, funders like the UK government and DARPA pulled back.',
    },
    {
      q: 'What made AlexNet in 2012 such a big moment?',
      options: [
        'It was the first chatbot',
        'It beat the world chess champion',
        'It showed that a deep neural network trained on lots of data with GPUs could beat older methods by a wide margin',
        'It invented the transformer',
      ],
      answer: 2,
      why: 'AlexNet cut the ImageNet top-5 error to about 15.3%, against 26.2% for the next best team. That large gap convinced the field to switch to deep learning.',
    },
    {
      q: 'What was the key change in the 2017 transformer paper?',
      options: [
        'It used attention to look at all words at once, which made training much faster and allowed far bigger models',
        'It added hand-written grammar rules to neural networks',
        'It connected chatbots to the internet',
        'It was the first model to play chess',
      ],
      answer: 0,
      why: 'Older language models read one word at a time, which is slow to train. Transformers process all words in parallel with attention, so they scale well on GPUs. GPT, BERT, Claude and Gemini all build on this.',
    },
  ],
  fromTheSource: [
    {
      who: 'Alex Krizhevsky, Ilya Sutskever and Geoffrey Hinton (University of Toronto)',
      role: 'Hinton later shared the 2018 Turing Award and the 2024 Nobel Prize in Physics. Sutskever, his doctoral student, went on to co-found OpenAI and serve as its chief scientist.',
      work: 'ImageNet Classification with Deep Convolutional Neural Networks (NeurIPS 2012)',
      url: 'https://papers.nips.cc/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html',
      idea: 'They trained a large neural network, with 60 million parameters, on about 1.3 million labelled photos in 1,000 categories. With fast GPU code and a new way to stop it memorising the training photos, it beat the previous best results by a wide margin.',
      breakdown: [
        'Data: ImageNet gave them more than a million labelled photos to learn from.',
        'Compute: they wrote efficient GPU code, which made training a network this big practical.',
        'Method: a technique called dropout helped the big network work well on photos it had never seen.',
        'No hand-written rules for what a cat or a car looks like. The network learned its own visual features from the data.',
      ],
      use: 'Face recognition, photo search and voice typing on your phone all come from this recipe: lots of data, big networks, fast chips. When you read about a new model, ask the same three questions: what data, how big, and how much compute.',
    },
    {
      who: 'Rich Sutton',
      role: 'A pioneer of reinforcement learning, who shared the 2024 ACM Turing Award with Andrew Barto.',
      work: 'The Bitter Lesson (essay, March 13, 2019)',
      url: 'http://www.incompleteideas.net/IncIdeas/BitterLesson.html',
      idea: 'Looking back over 70 years of AI research, Sutton argued that general methods that make use of more computing power, mainly search and learning, end up beating methods built on human knowledge. The lesson is bitter because researchers like building their own knowledge into systems, and that work keeps being overtaken.',
      breakdown: [
        'Chess: the program that beat Kasparov in 1997 relied on massive, deep search, not on chess wisdom written in by experts.',
        'Speech and vision: statistical and learned methods replaced hand-designed rules and features, as AlexNet showed in 2012.',
        'Computing power keeps getting cheaper, so a method that improves with more of it wins in the long run.',
        'His advice: build systems that can discover things for themselves, rather than ones packed with what we already know.',
      ],
      use: 'This idea ties the whole timeline together: hand-written rules and expert systems stalled, while learning from data at scale kept improving. It also explains why labs keep training bigger models on more data, and why new model releases arrive so often.',
    },
  ],
  sources: [
    {
      label: 'Turing (1950): Computing Machinery and Intelligence, Mind',
      url: 'https://academic.oup.com/mind/article/LIX/236/433/986238',
    },
    {
      label: 'Dartmouth: Artificial Intelligence (AI) coined at Dartmouth',
      url: 'https://home.dartmouth.edu/about/artificial-intelligence-ai-coined-dartmouth',
    },
    {
      label: 'Wikipedia: Dartmouth workshop',
      url: 'https://en.wikipedia.org/wiki/Dartmouth_workshop',
    },
    { label: 'Wikipedia: AI winter', url: 'https://en.wikipedia.org/wiki/AI_winter' },
    { label: 'IBM: Deep Blue', url: 'https://www.ibm.com/history/deep-blue' },
    {
      label:
        'Krizhevsky, Sutskever, Hinton (2012): ImageNet Classification with Deep Convolutional Neural Networks',
      url: 'https://papers.nips.cc/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html',
    },
    {
      label: 'ImageNet ILSVRC 2012 results',
      url: 'https://image-net.org/challenges/LSVRC/2012/results.html',
    },
    {
      label: 'Vaswani et al. (2017): Attention Is All You Need',
      url: 'https://arxiv.org/abs/1706.03762',
    },
    {
      label:
        'Google Research blog (Aug 31, 2017): Transformer, a novel neural network architecture',
      url: 'https://research.google/blog/transformer-a-novel-neural-network-architecture-for-language-understanding/',
    },
    {
      label: 'OpenAI (Jun 11, 2018): Improving language understanding with unsupervised learning',
      url: 'https://openai.com/index/language-unsupervised/',
    },
    { label: 'Devlin et al. (2018): BERT', url: 'https://arxiv.org/abs/1810.04805' },
    {
      label: 'Brown et al. (2020): Language Models are Few-Shot Learners (GPT-3)',
      url: 'https://arxiv.org/abs/2005.14165',
    },
    {
      label:
        'Ouyang et al. (2022): Training language models to follow instructions with human feedback',
      url: 'https://arxiv.org/abs/2203.02155',
    },
    {
      label: 'OpenAI (Nov 30, 2022): Introducing ChatGPT',
      url: 'https://openai.com/index/chatgpt/',
    },
    { label: 'OpenAI (Mar 14, 2023): GPT-4', url: 'https://openai.com/index/gpt-4-research/' },
    {
      label: 'Anthropic (Mar 14, 2023): Introducing Claude',
      url: 'https://www.anthropic.com/news/introducing-claude',
    },
    {
      label: 'Google (Dec 6, 2023): Introducing Gemini',
      url: 'https://blog.google/technology/ai/google-gemini-ai/',
    },
    {
      label: 'OpenAI (Sep 12, 2024): Learning to reason with LLMs',
      url: 'https://openai.com/index/learning-to-reason-with-llms/',
    },
    {
      label: 'Anthropic (Oct 22, 2024): Claude 3.5 models and computer use',
      url: 'https://www.anthropic.com/news/3-5-models-and-computer-use',
    },
    {
      label: 'Anthropic (Nov 25, 2024): Introducing the Model Context Protocol',
      url: 'https://www.anthropic.com/news/model-context-protocol',
    },
    { label: 'DeepSeek-AI (Jan 22, 2025): DeepSeek-R1', url: 'https://arxiv.org/abs/2501.12948' },
    {
      label: 'OpenAI (Jan 23, 2025): Introducing Operator',
      url: 'https://openai.com/index/introducing-operator/',
    },
    {
      label: 'Anthropic (May 22, 2025): Introducing Claude 4',
      url: 'https://www.anthropic.com/news/claude-4',
    },
    {
      label: 'Anthropic (Dec 9, 2025): Donating MCP and establishing the Agentic AI Foundation',
      url: 'https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation',
    },
    {
      label: 'Claude docs: Context windows',
      url: 'https://platform.claude.com/docs/en/build-with-claude/context-windows',
    },
    {
      label: 'Rich Sutton (Mar 13, 2019): The Bitter Lesson',
      url: 'http://www.incompleteideas.net/IncIdeas/BitterLesson.html',
    },
    {
      label: 'ACM: Richard Sutton, 2024 A.M. Turing Award recipient',
      url: 'https://awards.acm.org/award-recipients/sutton_0160594',
    },
    { label: 'Wikipedia: Geoffrey Hinton', url: 'https://en.wikipedia.org/wiki/Geoffrey_Hinton' },
    { label: 'Wikipedia: Ilya Sutskever', url: 'https://en.wikipedia.org/wiki/Ilya_Sutskever' },
  ],
  faqs: [
    {
      q: 'Who coined the term artificial intelligence?',
      a: 'John McCarthy picked the name “artificial intelligence” for the 1955 proposal of the Dartmouth summer workshop, which he organised with Marvin Minsky, Nathaniel Rochester and Claude Shannon.',
    },
    {
      q: 'When was AI invented?',
      a: 'There is no single invention date. Most historians point to the 1956 Dartmouth workshop as the start of AI as a field. Alan Turing’s 1950 paper “Computing Machinery and Intelligence” came a few years earlier and asked whether machines can think.',
    },
    {
      q: 'Was ChatGPT the first AI?',
      a: 'No. AI research is about 70 years old, and AI was already inside spam filters, recommendations and voice assistants. What ChatGPT, released on November 30, 2022, changed was access: anyone could chat with a powerful language model in a browser, with no code and no setup.',
    },
  ],
  related: [
    { label: 'Previous: What is AI?', href: '/learn-ai/what-is-ai' },
    { label: 'Next: What is an LLM?', href: '/learn-ai/what-is-an-llm' },
    { label: 'Transformers and attention', href: '/learn-ai/transformers-explained' },
    { label: 'What is MCP?', href: '/learn-ai/what-is-mcp' },
    { label: 'What is an AI agent?', href: '/learn-ai/ai-agents' },
  ],
}
