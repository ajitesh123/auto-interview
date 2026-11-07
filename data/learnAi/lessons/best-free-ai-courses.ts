import type { Lesson } from '../types'

export const lesson: Lesson = {
  slug: 'best-free-ai-courses',
  track: 'deeper',
  order: 0,
  title: 'Best free AI courses and who to learn from',
  metaTitle: 'Best Free AI Courses in 2026: Beginner to Researcher',
  metaDescription:
    'The best free AI courses in 2026, sorted by level: Karpathy, 3Blue1Brown, Anthropic, OpenAI, Google, Hugging Face, fast.ai and Stanford, with time for each.',
  h1: 'The best free AI courses in 2026, and who to learn from',
  tldr: 'If you are new, start with Karpathy’s one-hour Intro to Large Language Models and 3Blue1Brown’s neural network videos, then a short course from OpenAI Academy or Anthropic Academy. To build, take Hugging Face’s Agents Course and DeepLearning.AI short courses. To understand models from the inside, do Karpathy’s Zero to Hero, fast.ai and Stanford’s lectures. Pick one course for your level, finish it, and build something.',
  minutes: 12,
  level: 'Beginner',
  steps: [
    {
      heading: 'Pick by goal, not by hype',
      body: [
        'There are three different goals, and each needs a different course. Beginners want to understand and use AI well, with no code. Builders want to make apps and agents with AI models, using some Python. Researchers want to know how models work inside and train their own, which needs coding and some maths.',
        'Every course below was checked in November 2026. “Free” means you can learn the material without paying; a few charge for certificates or graded work, and that is noted. Prices and access can change, so confirm on the course page before you start.',
      ],
      flow: [
        'Beginner: understand and use',
        'Builder: apps and agents',
        'Researcher: build models',
      ],
      keyIdea: 'The best course is the one at your level that you actually finish.',
    },
    {
      heading: 'Beginner: understand AI and use it well (no code)',
      body: [
        'Start with people who explain clearly. Andrej Karpathy’s general-audience talks show what an LLM is and how to use it. 3Blue1Brown (Grant Sanderson) makes animated videos that build real intuition for neural networks; the series continues to transformers and attention.',
        'Then add one structured course from an AI lab. OpenAI Academy’s courses are free with a ChatGPT account. Anthropic Academy offers short courses such as Claude 101 and AI Fluency. Andrew Ng’s AI For Everyone is a classic non-technical overview, but read the note on cost.',
      ],
      example: {
        label: 'Beginner shortlist',
        text: `1. Karpathy: [1hr Talk] Intro to Large Language Models (1 hour, YouTube)
2. 3Blue1Brown: Neural networks playlist (chapter 1 is 19 minutes, YouTube)
3. Karpathy: How I use LLMs (2 hours 11 minutes) and Deep Dive into LLMs like ChatGPT (3.5 hours)
4. OpenAI Academy: AI Foundations (60–75 minutes; free, sign in with a ChatGPT account)
5. Anthropic Academy: AI Fluency: Framework & Foundations (under 1 hour) and Claude 101
6. Andrew Ng: AI For Everyone on Coursera (about 7 hours, 4 modules). Coursera shows “Enroll for free”, but graded work and the certificate need a paid option.

Not free: Google AI Essentials costs $49 a month on Coursera in the US and Canada after a 7-day trial.`,
      },
    },
    {
      heading: 'Builder: make apps and agents',
      body: [
        'Once you can use AI well, learn to build with it. DeepLearning.AI’s short courses take one to two hours each and are free for now during its platform beta; certificates need a paid PRO membership. A good first one is ChatGPT Prompt Engineering for Developers, taught by Isa Fulford of OpenAI and Andrew Ng.',
        'Hugging Face’s Agents Course is free, including its certificate, and teaches the smolagents, LlamaIndex and LangGraph frameworks. The AI labs teach their own tools: OpenAI Academy has Build with AI courses on RAG, agents and evals, and Anthropic Academy has Building with the Claude API, Model Context Protocol and Claude Code courses.',
      ],
      example: {
        label: 'Builder shortlist',
        text: `1. DeepLearning.AI: ChatGPT Prompt Engineering for Developers (1 hour 40 minutes, basic Python)
2. Hugging Face: AI Agents Course (5 core units, about 3–4 hours a week each, free certificate)
3. OpenAI Academy, Build with AI: Build with RAG (100 min), Design and Build Agentic Systems (110 min), Evaluate AI Applications (70 min)
4. Anthropic Academy: Building with the Claude API (8+ hours), Introduction to Model Context Protocol, Claude Code in Action
5. Google: Machine Learning Crash Course (12 modules, about 13.5 hours, includes an Intro to LLMs module)`,
      },
    },
    {
      heading: 'Researcher: how models work inside',
      body: [
        'This level needs Python and some maths, and it is where real understanding comes from. Karpathy’s Neural Networks: Zero to Hero builds everything from scratch in code, from backpropagation to a GPT and its tokenizer. fast.ai’s Practical Deep Learning for Coders starts with working models and digs into the theory as you go.',
        'Stanford posts full university courses on YouTube. CS229 is Andrew Ng’s machine learning course, CS224N covers natural language processing with deep learning, and CS336 builds a language model from scratch. Stanford says CS336 is “not a beginner-level introduction”, and its assignments need GPU access.',
      ],
      example: {
        label: 'Researcher shortlist',
        text: `1. Karpathy: Neural Networks: Zero to Hero (8 lectures, about 14.5 hours of video; needs Python and intro calculus)
2. fast.ai: Practical Deep Learning for Coders (9 lessons of about 90 minutes; about a year of coding recommended)
3. Hugging Face: LLM Course (12 chapters, each about a week at 6–8 hours; good Python needed)
4. Stanford CS229: Machine Learning, Andrew Ng, Autumn 2018 (20 lectures)
5. Stanford CS224N: NLP with Deep Learning, Winter 2021 (calculus, linear algebra, probability)
6. Stanford CS336: Language Modeling from Scratch, 2025 (advanced; strong PyTorch and GPU access)`,
      },
    },
    {
      heading: 'How to actually finish (and get value from) a free course',
      body: [
        'Free courses are easy to start and easy to abandon. Pick one, block a fixed time each week, and stop shopping for a better one. The time estimates above help you plan how many weeks it will take.',
        'Build something small after each course and put it on GitHub or LinkedIn: a prompt library, a small RAG app, an agent that does one job. Employers remember what you built more than what you watched. When you finish this path, our AI engineer and AI product manager guides show which skills those roles hire for.',
      ],
      bullets: [
        'One course at a time, at your level',
        'A fixed weekly slot in your calendar',
        'One small project per course, shared publicly',
        'Revisit Karpathy and 3Blue1Brown whenever an idea feels fuzzy',
      ],
    },
  ],
  keyTerms: [
    {
      term: 'Audit',
      meaning:
        'Taking a course’s lessons without paying for the certificate or graded work, where the platform allows it.',
    },
    {
      term: 'Short course',
      meaning:
        'A focused course of one to a few hours on one skill, such as prompting or building an agent.',
    },
    {
      term: 'From scratch',
      meaning:
        'Building something yourself in code instead of calling a ready-made library, to see how it works inside.',
    },
    {
      term: 'Prerequisites',
      meaning:
        'What you should know before starting, such as Python, high-school maths or calculus.',
    },
  ],
  videos: [
    {
      youtubeId: 'aircAruvnKk',
      title: 'But what is a neural network? | Deep learning chapter 1',
      channel: '3Blue1Brown',
      minutes: 19,
      why: 'The best first video on how a neural network works. If you enjoy it, the rest of the playlist runs through learning, backpropagation, transformers and attention.',
    },
    {
      youtubeId: 'zjkBMFhNj_g',
      title: '[1hr Talk] Intro to Large Language Models',
      channel: 'Andrej Karpathy',
      minutes: 60,
      why: 'Karpathy’s classic general-audience talk: what an LLM is, how it is trained and where it is going. The ideal first hour before any course.',
    },
  ],
  tryIt: {
    title: 'Choose your course and start it today',
    steps: [
      'Decide your level: beginner (use AI), builder (make apps) or researcher (build models).',
      'Pick one course from that level’s shortlist. Only one.',
      'Open it now and complete the first 10 minutes: for beginners, the first 3Blue1Brown video is a good start.',
      'Put a weekly time slot in your calendar for the next four weeks.',
      'Write one line in your notes on what you will build when you finish.',
    ],
    link: {
      label: 'Open the 3Blue1Brown neural networks playlist',
      url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi',
    },
  },
  check: [
    {
      q: 'You have never coded and want to understand what ChatGPT is. Where should you start?',
      options: [
        'Stanford CS336: Language Modeling from Scratch',
        'Karpathy’s one-hour Intro to Large Language Models',
        'Karpathy’s Zero to Hero lecture on backpropagation',
        'fast.ai Practical Deep Learning',
      ],
      answer: 1,
      why: 'The one-hour talk is for a general audience. CS336, Zero to Hero and fast.ai all expect coding, and CS336 is explicitly not for beginners.',
    },
    {
      q: 'Which of these is free, including its certificate?',
      options: [
        'Google AI Essentials',
        'Hugging Face AI Agents Course',
        'A DeepLearning.AI short course certificate',
        'The AI For Everyone certificate on Coursera',
      ],
      answer: 1,
      why: 'Hugging Face says both the Agents Course and its certification are free. Google AI Essentials is a paid subscription, and the others charge for certificates.',
    },
    {
      q: 'What does fast.ai’s course recommend before you start?',
      options: [
        'A university maths degree',
        'An expensive GPU',
        'About a year of coding experience, ideally in Python',
        'Nothing at all',
      ],
      answer: 2,
      why: 'fast.ai asks for coding experience, ideally about a year, plus high-school maths. It teaches the rest and uses free computing resources.',
    },
  ],
  sources: [
    {
      label: 'Andrej Karpathy: Neural Networks: Zero to Hero',
      url: 'https://karpathy.ai/zero-to-hero.html',
    },
    {
      label: 'karpathy/nn-zero-to-hero on GitHub',
      url: 'https://github.com/karpathy/nn-zero-to-hero',
    },
    {
      label: 'Andrej Karpathy (YouTube): How I use LLMs',
      url: 'https://www.youtube.com/watch?v=EWvNQjAaOHw',
    },
    {
      label: 'Andrej Karpathy (YouTube): [1hr Talk] Intro to Large Language Models',
      url: 'https://www.youtube.com/watch?v=zjkBMFhNj_g',
    },
    {
      label: '3Blue1Brown (YouTube): Neural networks playlist',
      url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi',
    },
    {
      label: 'OpenAI Help: OpenAI Academy courses',
      url: 'https://help.openai.com/en/articles/20001270-openai-academy-courses',
    },
    { label: 'Anthropic Academy course list (Skilljar)', url: 'https://anthropic.skilljar.com/' },
    { label: 'Anthropic: Learn', url: 'https://www.anthropic.com/learn' },
    {
      label: 'Analytics Vidhya (Mar 2026): Free Anthropic Academy courses with certificates',
      url: 'https://www.analyticsvidhya.com/blog/2026/03/free-anthropic-ai-courses-with-certificates/',
    },
    {
      label: 'Google for Developers: Machine Learning Crash Course',
      url: 'https://developers.google.com/machine-learning/crash-course',
    },
    {
      label: 'Google for Developers: MLCC prerequisites and prework',
      url: 'https://developers.google.com/machine-learning/crash-course/prereqs-and-prework',
    },
    {
      label: 'Grow with Google: Google AI Essentials on Coursera',
      url: 'https://grow.google/enroll-certificates/ai-essentials-mid/',
    },
    {
      label: 'DeepLearning.AI FAQ: Short courses',
      url: 'https://sites.google.com/deeplearning.ai/deeplearningaifaq/courses/short-courses',
    },
    {
      label: 'DeepLearning.AI: ChatGPT Prompt Engineering for Developers',
      url: 'https://deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/',
    },
    {
      label: 'Coursera: AI For Everyone (DeepLearning.AI)',
      url: 'https://www.coursera.org/learn/ai-for-everyone',
    },
    {
      label: 'Hugging Face: LLM Course',
      url: 'https://huggingface.co/learn/llm-course/chapter1/1',
    },
    {
      label: 'Hugging Face: AI Agents Course',
      url: 'https://huggingface.co/learn/agents-course/unit0/introduction',
    },
    { label: 'fast.ai: Practical Deep Learning for Coders', url: 'https://course.fast.ai/' },
    {
      label: 'Stanford Online (YouTube): CS336 Language Modeling from Scratch, 2025',
      url: 'https://www.youtube.com/playlist?list=PLoROMvodv4rOY23Y0BoGoBGgQ1zmU_MT_',
    },
    {
      label: 'Stanford Online (YouTube): CS224N NLP with Deep Learning, Winter 2021',
      url: 'https://www.youtube.com/playlist?list=PLoROMvodv4rOSH4v6133s9LFPRHjEmbmJ',
    },
    {
      label: 'Stanford CS229: Machine Learning, Autumn 2018 (YouTube playlist)',
      url: 'https://www.youtube.com/playlist?list=PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU',
    },
    {
      label: 'Class Central: Stanford CS229 Autumn 2018 listing',
      url: 'https://www.classcentral.com/course/youtube-stanford-cs229-machine-learning-full-course-taught-by-andrew-ng-autumn-2018-107761',
    },
    {
      label: 'Falcon Internet blog: Stanford releases CS336 free on YouTube (Nov 2025)',
      url: 'https://www.falconinternet.net/blog/standford-drops-free-ai-modeling-course-on-youtube',
    },
    {
      label: 'I Programmer: Take Stanford’s NLP with Deep Learning for free',
      url: 'https://www.i-programmer.info/news/150-training-a-education/15028-take-stanfords-natural-language-processing-with-deep-learning-for-free.html',
    },
  ],
  faqs: [
    {
      q: 'What is the best free AI course for beginners?',
      a: 'Start with Karpathy’s one-hour Intro to Large Language Models and 3Blue1Brown’s neural network videos on YouTube, then take OpenAI Academy’s AI Foundations or Anthropic Academy’s AI Fluency. None of these need code.',
    },
    {
      q: 'Can I learn AI completely for free?',
      a: 'Yes. Karpathy’s lectures, 3Blue1Brown, Hugging Face’s LLM and Agents courses, fast.ai and Stanford’s YouTube lectures are free to learn from. Some platforms charge only for certificates or graded work.',
    },
    {
      q: 'Is Andrew Ng’s AI For Everyone free?',
      a: 'Coursera shows an “Enroll for free” option, but graded assignments and the certificate need a paid option, and what you can see for free can vary. Check the enrolment choices on the course page; financial aid may be available.',
    },
  ],
  related: [
    {
      label: 'Previous: Build an LLM with Karpathy’s Zero to Hero',
      href: '/learn-ai/build-an-llm-from-scratch',
    },
    { label: 'Back to the start of the Learn AI path', href: '/learn-ai' },
    { label: 'Free AI skills resources', href: '/free-resources#ai-skills' },
    { label: 'AI engineer guide', href: '/ai-engineer' },
    { label: 'AI product manager guide', href: '/aipm' },
    { label: 'Free AI mock interview', href: '/free-mock-interview' },
  ],
  fromTheSource: [
    {
      who: 'Andrej Karpathy',
      role: 'OpenAI founding member and former director of AI at Tesla, now teaching through Eureka Labs and his YouTube lectures.',
      work: 'Neural Networks: Zero to Hero (lecture series)',
      url: 'https://karpathy.ai/zero-to-hero.html',
      idea: 'Karpathy teaches neural networks by building every piece from scratch in code, starting with backpropagation and ending with a GPT. He focuses on language models because what you learn there transfers to other areas.',
      breakdown: [
        'Lecture 1 builds micrograd, a tiny engine that shows how networks learn through backpropagation.',
        'The makemore lectures grow a character-level language model step by step.',
        'Then he builds a GPT and its tokenizer, the same core pieces behind ChatGPT.',
        'You need solid Python and intro maths, such as derivatives.',
      ],
      use: 'If you want to really understand LLMs, type the code along with him instead of only watching. Pause, run it, and change things to see what breaks.',
    },
    {
      who: 'Jeremy Howard (fast.ai)',
      role: 'Co-founder of fast.ai with Rachel Thomas, former President and Chief Scientist of Kaggle, and lead developer of the fastai library.',
      work: 'Practical Deep Learning for Coders (free course)',
      url: 'https://course.fast.ai/',
      idea: 'fast.ai teaches top-down: you start with a complete, working model that solves a real problem, then gradually dig into how it works. As the course puts it, “We always teach through examples.”',
      breakdown: [
        'By the end of lesson 2 you build and deploy your own model on data you collect.',
        'Theory comes later, in the context of real code, not as maths first.',
        'No university maths or special hardware needed; it uses free tools.',
      ],
      use: 'Learn the way fast.ai teaches: get something working first, then ask why it works. It keeps you motivated and makes the theory stick.',
    },
  ],
}
