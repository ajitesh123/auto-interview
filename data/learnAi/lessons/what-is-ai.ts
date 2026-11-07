import type { Lesson } from '../types'

export const lesson: Lesson = {
  slug: 'what-is-ai',
  track: 'foundations',
  order: 1,
  title: 'What is AI?',
  metaTitle: 'What Is AI? AI vs Machine Learning vs Deep Learning',
  metaDescription:
    'What is AI, in plain English? See how AI, machine learning, deep learning and generative AI fit together, with everyday examples like UPI alerts and ChatGPT.',
  h1: 'What is AI? AI vs machine learning vs deep learning vs generative AI',
  tldr: 'Artificial intelligence (AI) is technology that lets computers do things we link with human thinking, like understanding language, spotting patterns and making decisions. Machine learning is the part of AI where computers learn from examples instead of hand-written rules. Deep learning is machine learning with large neural networks, and generative AI, like ChatGPT, Claude and Gemini, is deep learning that creates new text, images or code.',
  minutes: 8,
  level: 'Beginner',
  steps: [
    {
      heading: 'So what counts as AI?',
      body: [
        'IBM defines AI as technology that lets computers “simulate human learning, comprehension, problem solving”, decision making and creativity. In simple words: if a machine does a task that would need some thinking if a person did it, we call it AI.',
        'You already use AI many times a day. Most of it is invisible. It sits quietly inside apps you open without thinking.',
      ],
      bullets: [
        'Your bank flags an unusual UPI payment from a new city at 3 a.m.',
        'YouTube, Netflix or Swiggy suggests what to watch or order next.',
        'Your phone turns your voice into a WhatsApp message.',
        'ChatGPT writes a leave application when you ask for one.',
      ],
      keyIdea:
        'AI is a goal (machines doing tasks that seem to need intelligence), not one single technology.',
    },
    {
      heading: 'Rules vs learning: what is machine learning?',
      body: [
        'The old way to build “smart” software was to write rules by hand. A programmer might write: if a payment is over ₹50,000 and comes from a new phone, block it. Rules are clear, but they break when the world changes and nobody wrote a rule for the new case.',
        'Machine learning (ML) flips this. Google describes it as a way for a system to “learn and improve from experience” instead of being explicitly programmed. You show it thousands of past examples, say payments marked “fraud” or “fine”, and it finds the patterns itself. The result is called a model: a program that makes predictions on new data.',
      ],
      flow: ['Past examples (data)', 'Training', 'Model', 'Prediction on new data'],
      keyIdea:
        'Traditional programs follow rules people write. Machine learning finds the rules from examples.',
    },
    {
      heading: 'What is deep learning?',
      body: [
        'Deep learning is a kind of machine learning that uses neural networks with many layers. A neural network is a big web of simple maths units, loosely inspired by brain cells, that pass numbers to each other. “Deep” just means many layers stacked on top of each other.',
        'Each layer picks up slightly more complex patterns than the one before. Roughly, for a photo of a cricket match, early layers react to edges and colours, and later layers react to shapes like a bat, a ball or a face. Deep learning needs lots of data and powerful chips called GPUs. It took off in 2012, when a deep network called AlexNet won a major image contest by a wide margin (more on that in the next lesson).',
      ],
      bullets: [
        'Opening your phone with your face',
        'Speech-to-text and voice typing',
        'Google Translate and photo search',
      ],
    },
    {
      heading: 'What is generative AI?',
      body: [
        'Most older AI predicts or sorts: spam or not spam, fraud or fine, which video you might like. Generative AI creates something new: text, images, audio, video or code. IBM describes it as deep learning models “that can create complex original content”.',
        'ChatGPT, Claude and Gemini are generative AI. They are built on large language models (LLMs), which you will meet in lesson 3. They have not stored your leave application somewhere. They write a fresh one each time, based on patterns learned from huge amounts of text.',
      ],
      example: {
        label: 'Predictive AI vs generative AI',
        text: 'Predictive: “Is this email spam?” → “Yes, 98% likely spam.”\nGenerative: “Write a polite 3-line email asking my manager for Friday off.” → a brand-new email that did not exist before.',
      },
    },
    {
      heading: 'How do they all fit together?',
      body: [
        'Think of nested circles, like a Russian doll. AI is the biggest circle. Machine learning sits inside AI, deep learning sits inside machine learning, and generative AI sits inside deep learning. LLMs are one type of generative AI, focused on text.',
        'You may also hear “AGI” (artificial general intelligence): AI that could learn and do almost any mental task a person can. IBM calls this level still theoretical, and researchers disagree on when, or whether, it will arrive. Today’s tools are powerful but still make basic mistakes.',
      ],
      bullets: [
        'AI: any machine doing “smart” tasks, e.g. a chess program or route planner',
        'Machine learning: learns from data, e.g. spam filters and fraud alerts',
        'Deep learning: many-layer neural networks, e.g. face recognition and voice typing',
        'Generative AI: creates new content, e.g. ChatGPT, Claude, Gemini, image generators',
      ],
      keyIdea:
        'All generative AI is deep learning, all deep learning is machine learning, and all machine learning is AI. Not the other way around.',
    },
  ],
  keyTerms: [
    {
      term: 'Artificial intelligence (AI)',
      meaning:
        'Technology that lets computers do tasks we link with human thinking, like understanding language or making decisions.',
    },
    {
      term: 'Machine learning (ML)',
      meaning:
        'A part of AI where computers learn patterns from examples instead of following hand-written rules.',
    },
    {
      term: 'Model',
      meaning:
        'The result of training: a program that takes new input and gives a prediction or an output.',
    },
    {
      term: 'Neural network',
      meaning:
        'A web of simple maths units, arranged in layers, that learns by adjusting the numbers that connect them.',
    },
    {
      term: 'Deep learning',
      meaning:
        'Machine learning that uses neural networks with many layers. It powers face recognition, voice typing and chatbots.',
    },
    {
      term: 'Generative AI',
      meaning:
        'AI that creates new content (text, images, audio, code) instead of only sorting or predicting.',
    },
  ],
  videos: [
    {
      youtubeId: 'qYNweeDHiyU',
      title: 'AI, Machine Learning, Deep Learning and Generative AI Explained',
      channel: 'IBM Technology',
      minutes: 10,
      why: 'A clear 10-minute whiteboard talk on how AI, ML, deep learning and generative AI nest inside each other. Watch it after reading step 5.',
    },
  ],
  tryIt: {
    title: 'Find the AI hiding in your phone',
    steps: [
      'Write down 5 apps you used today, for example a UPI app, YouTube, Google Maps, Swiggy or Zomato, and your camera.',
      'Next to each, guess one feature that uses AI and whether it predicts (sorts, ranks, flags) or generates (writes, draws).',
      'Open a free chatbot such as Claude or ChatGPT and paste: “For each of these apps, name one feature that probably uses machine learning and say if it is predictive or generative AI. Say clearly when you are guessing: [your list]”.',
      'Compare its answer with your guesses. Where do you disagree, and why?',
      'Finally ask: “Explain the difference between machine learning and generative AI in 3 lines for a friend who has never studied computers.” The answer you just got is generative AI at work.',
    ],
    link: { label: 'Open Claude (free)', url: 'https://claude.ai' },
  },
  check: [
    {
      q: 'A bank system studies millions of past payments and learns to flag a suspicious UPI transfer. What is the best description?',
      options: [
        'Generative AI, because it creates an alert',
        'Machine learning used for prediction',
        'A plain rule-based program with no learning',
        'Artificial general intelligence (AGI)',
      ],
      answer: 1,
      why: 'It learned patterns from past examples and makes a prediction (fraud or fine) about new data. That is predictive machine learning. It does not create new content, and it is far from AGI.',
    },
    {
      q: 'Which statement is correct?',
      options: [
        'All machine learning is deep learning',
        'Generative AI and machine learning are unrelated',
        'All deep learning is machine learning, but not all machine learning is deep learning',
        'AI is a part of machine learning',
      ],
      answer: 2,
      why: 'The circles are nested: AI contains machine learning, which contains deep learning. Many ML methods use no neural networks at all, so not all ML is deep learning.',
    },
    {
      q: 'You ask ChatGPT to write a birthday message for your mother. Why is this called generative AI?',
      options: [
        'It copies a saved message from a database',
        'It creates new text based on patterns it learned from lots of data',
        'A programmer wrote a rule for every possible birthday message',
        'It searches Google and pastes the first result',
      ],
      answer: 1,
      why: 'Generative models produce fresh output each time, built from patterns learned during training. They do not look up a stored answer or follow a hand-written rule for each case.',
    },
  ],
  fromTheSource: [
    {
      who: 'John McCarthy, Marvin Minsky, Nathaniel Rochester and Claude Shannon',
      role: 'The four researchers who proposed the 1956 Dartmouth summer study that started AI as a field. McCarthy chose the name “artificial intelligence”.',
      work: 'A Proposal for the Dartmouth Summer Research Project on Artificial Intelligence (August 31, 1955)',
      url: 'https://www-formal.stanford.edu/jmc/history/dartmouth/dartmouth.html',
      idea: 'They guessed that “every aspect of learning or any other feature of intelligence” could in principle be described so precisely that a machine could simulate it. Their aim was to make machines use language, form concepts and solve problems then left to humans.',
      breakdown: [
        'AI was defined by a goal, not a method. Any machine that does these jobs counts, whether it follows rules or learns from data.',
        'Their list of topics already included using language, “neuron nets” and self-improvement. Today we call these chatbots, neural networks and machine learning.',
        'The key word is “simulate”. The aim was to reproduce what intelligence does, not to build a copy of a brain.',
        'They planned it as a two-month summer project. Seventy years later, the work is still going.',
      ],
      use: 'When you meet a new AI tool, ask the Dartmouth question: which human task is it doing, such as writing, sorting or recognising, and how well? That tells you more than arguing about whether it is “really” intelligent.',
    },
    {
      who: 'Alan Turing',
      role: 'British mathematician and one of the founders of computer science. His 1950 paper is one of the first serious studies of machine intelligence.',
      work: 'Computing Machinery and Intelligence (Mind, October 1950)',
      url: 'https://academic.oup.com/mind/article/LIX/236/433/986238',
      idea: 'Turing opened with the question “Can machines think?” and then set it aside, because the words “machine” and “think” are too vague to settle. In its place he proposed a game: can a machine answer typed questions so well that a questioner cannot reliably tell it from a person?',
      breakdown: [
        'He swapped a fuzzy question (“does it think?”) for a test you can actually run (“can you tell it apart?”).',
        'The test looks only at behaviour: what the machine says, not what is going on inside it.',
        'Today’s definitions of AI keep that spirit: a machine doing tasks we link with human thinking.',
        'Modern chatbots write fluent, human-sounding text, yet still make basic mistakes. Sounding human and being right are different things.',
      ],
      use: 'Judge a chatbot by the quality of its answers, not by how human it sounds. Fluent writing is easy for today’s models, so check whether the facts and the reasoning hold up.',
    },
  ],
  sources: [
    {
      label: 'IBM: What is artificial intelligence (AI)?',
      url: 'https://www.ibm.com/think/topics/artificial-intelligence',
    },
    {
      label: 'Google Cloud: AI vs. machine learning',
      url: 'https://cloud.google.com/learn/artificial-intelligence-vs-machine-learning',
    },
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
      label: 'freeCodeCamp: Machine learning vs deep learning vs generative AI',
      url: 'https://www.freecodecamp.org/news/machine-learning-vs-deep-learning-vs-generative-ai/',
    },
    {
      label:
        'IBM Technology (YouTube): AI, Machine Learning, Deep Learning and Generative AI Explained',
      url: 'https://www.youtube.com/watch?v=qYNweeDHiyU',
    },
    {
      label:
        'McCarthy, Minsky, Rochester, Shannon (1955): A Proposal for the Dartmouth Summer Research Project on Artificial Intelligence',
      url: 'https://www-formal.stanford.edu/jmc/history/dartmouth/dartmouth.html',
    },
    {
      label: 'Turing (1950): Computing Machinery and Intelligence, Mind',
      url: 'https://academic.oup.com/mind/article/LIX/236/433/986238',
    },
  ],
  faqs: [
    {
      q: 'Is ChatGPT AI or machine learning?',
      a: 'Both. ChatGPT is AI, and it was built with machine learning. More precisely, it is a deep learning model called a large language model (LLM), which is a type of generative AI.',
    },
    {
      q: 'What is the difference between AI and machine learning?',
      a: 'AI is the broad goal of making machines do tasks that seem to need intelligence. Machine learning is one way to get there: the computer learns patterns from data instead of following rules a programmer wrote. Almost all modern AI uses machine learning.',
    },
    {
      q: 'Do I need coding or maths to learn AI?',
      a: 'Not to start. You can understand and use AI tools well with no coding at all, which is what the first two tracks of this path cover. Building AI products later needs some programming, and training your own models needs more maths.',
    },
  ],
  related: [
    { label: 'Next: How AI started, from 1956 to ChatGPT', href: '/learn-ai/history-of-ai' },
    { label: 'What is an LLM?', href: '/learn-ai/what-is-an-llm' },
    { label: 'Your first prompt', href: '/learn-ai/first-prompt' },
    { label: 'Free AI skills resources', href: '/free-resources#ai-skills' },
    { label: 'AI engineer career guide', href: '/ai-engineer' },
  ],
}
