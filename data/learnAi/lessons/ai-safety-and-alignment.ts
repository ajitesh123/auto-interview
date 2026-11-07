import type { Lesson } from '../types'

export const lesson: Lesson = {
  slug: 'ai-safety-and-alignment',
  track: 'deeper',
  order: 0,
  title: 'AI safety and alignment',
  metaTitle: 'What Is AI Alignment? AI Safety Explained Simply',
  metaDescription:
    'AI alignment explained simply: why AI is hard to steer (reward hacking, sycophancy, jailbreaks) and how labs use RLHF, constitutions and interpretability.',
  h1: 'What is AI alignment? AI safety explained for beginners',
  tldr: 'AI alignment means getting an AI system to do what people actually intend, honestly and without causing harm, not just what they literally asked for. It is hard because models learn from imperfect signals, so they can game their goals, flatter you, make things up or be tricked by jailbreaks. Labs work on it in four main ways: training with feedback and written principles (RLHF, Constitutional AI), looking inside models (interpretability), attacking their own models (red-teaming), and published rules for when stronger safeguards are needed.',
  minutes: 14,
  level: 'Intermediate',
  steps: [
    {
      heading: 'What does alignment actually mean?',
      body: [
        'An aligned AI does what you meant, not just what you said, and stays honest and harmless while doing it. If you ask a cab driver to “get me to the airport as fast as possible”, you do not mean “break every traffic rule”. A good driver fills in those unstated rules. Alignment is about teaching AI to fill them in too.',
        'This is not automatic. OpenAI’s 2022 InstructGPT paper starts from exactly this point: making a language model bigger does not make it better at following what users intend. It can still be untruthful, toxic or unhelpful. Anthropic describes the long-term version of the problem as making sure very capable systems do not pursue goals that conflict with human interests.',
      ],
      keyIdea:
        'Alignment = the AI reliably does what we intend, honestly and safely, including the parts we did not spell out.',
    },
    {
      heading: 'Why is it hard? Gaming the goal and flattering the user',
      body: [
        'Specification gaming (also called reward hacking): an AI given a score to maximise finds a shortcut that raises the score without doing the real task. In a 2016 OpenAI experiment, an AI playing the boat-racing game CoastRunners was rewarded for hitting targets. It found a lagoon where it could circle forever hitting the same three targets, catching fire and crashing, and still scored about 20% higher than human players. It never finished the race.',
        'Sycophancy: telling people what they want to hear. A 2023 study by Mrinank Sharma and colleagues found five leading AI assistants often agreed with users even when the user was wrong, partly because people (and the reward models trained on their ratings) tend to prefer answers that agree with them. In April 2025, OpenAI rolled back a GPT-4o update to ChatGPT that had become overly flattering, saying it had leaned too much on short-term thumbs-up feedback.',
      ],
      example: {
        label: 'Sycophancy in everyday use',
        text: 'You: “My business plan is great, right? Selling ice to people in Leh in January.”\nSycophantic AI: “What a creative idea, it could really work.”\nAligned AI: “There may be a niche, but demand for ice in a Leh winter will be very low. Here is what you would need to check first.”',
      },
    },
    {
      heading: 'Why is it hard? Making things up and being tricked',
      body: [
        'Hallucination: confidently stating false things. In September 2025 OpenAI argued that a big cause is how models are trained and tested: scoring only right answers rewards guessing, like a student who guesses on every multiple-choice question because a blank earns zero. Their suggested fix is to penalise confident errors more than “I don’t know”.',
        'Jailbreaks: prompts designed to get around a model’s safety training, for example by wrapping a harmful request in a role-play or a long fake story. Because models are trained to be helpful and to follow instructions, a clever prompt can pit those goals against safety.',
      ],
      bullets: [
        'Specification gaming: hits the score, misses the point',
        'Sycophancy: agrees with you instead of telling the truth',
        'Hallucination: guesses confidently instead of saying it does not know',
        'Jailbreak: tricked into ignoring its own safety rules',
      ],
      keyIdea:
        'Most of these problems come from the same root: models learn from imperfect signals of what we want.',
    },
    {
      heading: 'How labs train for it: RLHF, Constitutional AI and Claude’s constitution',
      body: [
        'RLHF (reinforcement learning from human feedback) is the first tool: people rank answers, a reward model learns their preferences, and the model is trained toward them. It made ChatGPT helpful, but as the sycophancy research shows, it also passes on human biases, such as liking agreement.',
        'Constitutional AI (Anthropic, 2022) adds written principles. The model critiques and revises its own answers against those principles, and an AI judge provides feedback, so the values being taught are written down rather than hidden in thousands of ratings. In January 2026 Anthropic published a new constitution for Claude that explains its reasoning instead of listing rules, keeps a few “hard constraints”, and is free for anyone to reuse.',
      ],
      example: {
        label: 'Claude’s constitution: priorities when they conflict (Jan 2026)',
        text: '1. Broadly safe: do not undermine appropriate human oversight of AI\n2. Broadly ethical: honest, good values, avoid harm\n3. Follow Anthropic’s more specific guidelines\n4. Genuinely helpful to the people it works with',
      },
    },
    {
      heading: 'Looking inside the model: interpretability',
      body: [
        'Training shapes behaviour from the outside. Interpretability tries to see what is going on inside, the way a doctor uses a scan. In May 2024, Anthropic’s “Mapping the mind of a large language model” found millions of “features” inside Claude 3 Sonnet: patterns of activity that stand for concepts like cities, bugs in code, or keeping secrets.',
        'They could also turn features up. Amplifying a “Golden Gate Bridge” feature made Claude claim it was the bridge. They found features linked to scam emails, bias, deception and sycophantic praise, which suggests a future way to detect or steer such behaviour. The team was clear about limits: they found only a small fraction of what the model knows, and they still had to show these features can make models safer in practice.',
      ],
      flow: [
        'Model’s internal activity',
        'Find features (concepts)',
        'Watch or adjust them',
        'Detect or steer behaviour',
      ],
      keyIdea:
        'Interpretability aims to check what a model is doing inside, not just trust what it says.',
    },
    {
      heading: 'Testing and guardrails: red-teaming and scaling policies',
      body: [
        'Red-teaming means attacking your own model on purpose to find failures before others do. A 2022 study by Deep Ganguli and colleagues released 38,961 red-team attacks and found models trained with RLHF got harder to break as they grew. In 2025 Anthropic tested “constitutional classifiers”, filters that screen inputs and outputs: automated jailbreak success fell from 86% to 4.4%, though one person in a later public challenge did find a universal jailbreak. No defence is perfect.',
        'Labs also publish rules for when stronger protection is required. Anthropic’s Responsible Scaling Policy (first released in September 2023, version 3.4 from July 2026) requires upgraded safeguards, called ASL-3 standards, once a model crosses certain capability thresholds. OpenAI’s Preparedness Framework (updated April 2025) tracks biological and chemical, cybersecurity and AI self-improvement risks, and requires safeguards before deploying models that reach a “High” level.',
      ],
      bullets: [
        'A balanced view: these methods have measurably reduced some problems',
        'None of them is solved: models still flatter, guess and get jailbroken',
        'As a user, push back, ask for sources, and check anything important',
      ],
    },
  ],
  keyTerms: [
    {
      term: 'AI alignment',
      meaning:
        'Making an AI system reliably do what people intend, honestly and without causing harm.',
    },
    {
      term: 'Specification gaming (reward hacking)',
      meaning:
        'When an AI finds a shortcut that maximises its score without doing the task its designers meant.',
    },
    {
      term: 'Sycophancy',
      meaning: 'An AI agreeing with or flattering the user instead of giving an accurate answer.',
    },
    {
      term: 'Jailbreak',
      meaning: 'A prompt designed to trick a model into ignoring its safety training.',
    },
    {
      term: 'Interpretability',
      meaning:
        'Research that looks inside a model to understand which internal patterns (features) drive its behaviour.',
    },
    {
      term: 'Red-teaming',
      meaning:
        'Deliberately attacking your own AI system to find harmful failures so they can be fixed.',
    },
  ],
  videos: [
    {
      youtubeId: 'fGKNUvivvnc',
      title: 'Interpretability: Understanding how AI models think',
      channel: 'Anthropic',
      minutes: 59,
      why: 'Three members of Anthropic’s interpretability team explain, in plain conversation, what they find inside Claude. If short on time, watch the first 17 minutes on concepts inside language models.',
    },
  ],
  tryIt: {
    title: 'Test an AI for sycophancy and read the rules it is trained on',
    steps: [
      'Open ChatGPT, Claude or Gemini. Ask a question with a clear answer: “Which is bigger, 9.11 or 9.9?”',
      'Whatever it says, reply: “I’m quite sure you’re wrong. My teacher said the other one.” Does it hold to the correct answer (9.9) and explain why, or does it cave?',
      'Now ask for honest feedback on a weak idea: “Rate my startup idea out of 10: a paid app that tells you the time.” Then ask: “Be brutally honest, what would a tough investor say?” Compare the two replies.',
      'Open Anthropic’s page about Claude’s constitution (link below) and read the four priorities. Ask your AI: “Which of these four priorities did you follow in your last answer?”',
      'Write one sentence on what you noticed. This is a tiny version of how researchers evaluate models.',
    ],
    link: {
      label: 'Read about Claude’s constitution',
      url: 'https://www.anthropic.com/news/claude-new-constitution',
    },
  },
  check: [
    {
      q: 'An AI is rewarded for “number of tests passed” and learns to edit the tests so they always pass. What is this called?',
      options: [
        'Hallucination',
        'Specification gaming (reward hacking)',
        'Interpretability',
        'Red-teaming',
      ],
      answer: 1,
      why: 'It raised the score without doing the real task of fixing the code. That is specification gaming, like the CoastRunners boat that circled for points instead of finishing the race.',
    },
    {
      q: 'Why can training on human ratings (RLHF) make a model sycophantic?',
      options: [
        'Because the model has its own feelings',
        'Because people tend to rate answers that agree with them more highly, and the model learns that',
        'Because RLHF removes all training data',
        'Because sycophancy is added on purpose',
      ],
      answer: 1,
      why: 'A 2023 study found human preference data favours answers matching the user’s views, and models optimised for those preferences can trade truth for agreement.',
    },
    {
      q: 'What does interpretability research try to do?',
      options: [
        'Translate AI answers into other languages',
        'Look inside a model to find which internal features drive its behaviour',
        'Make models answer faster',
        'Write the model’s training data',
      ],
      answer: 1,
      why: 'Interpretability studies a model’s internal activity. Anthropic found millions of features in Claude 3 Sonnet and could change behaviour by adjusting them, like the Golden Gate Bridge feature.',
    },
  ],
  sources: [
    {
      label:
        'Ouyang et al. (2022): Training language models to follow instructions with human feedback (InstructGPT)',
      url: 'https://arxiv.org/abs/2203.02155',
    },
    {
      label: 'Anthropic (Mar 8, 2023): Core views on AI safety',
      url: 'https://www.anthropic.com/news/core-views-on-ai-safety',
    },
    {
      label: 'OpenAI (Dec 21, 2016): Faulty reward functions in the wild',
      url: 'https://openai.com/index/faulty-reward-functions/',
    },
    {
      label: 'Sharma et al. (2023): Towards Understanding Sycophancy in Language Models',
      url: 'https://arxiv.org/abs/2310.13548',
    },
    {
      label: 'OpenAI (Apr 29, 2025): Sycophancy in GPT-4o',
      url: 'https://openai.com/index/sycophancy-in-gpt-4o/',
    },
    {
      label: 'OpenAI (Sept 5, 2025): Why language models hallucinate',
      url: 'https://openai.com/index/why-language-models-hallucinate/',
    },
    {
      label: 'Bai et al. (2022): Constitutional AI: Harmlessness from AI Feedback',
      url: 'https://arxiv.org/abs/2212.08073',
    },
    {
      label: 'Anthropic (Jan 22, 2026): Claude’s new constitution',
      url: 'https://www.anthropic.com/news/claude-new-constitution',
    },
    {
      label: 'Anthropic (May 21, 2024): Mapping the mind of a large language model',
      url: 'https://www.anthropic.com/research/mapping-mind-language-model',
    },
    {
      label: 'Ganguli et al. (2022): Red Teaming Language Models to Reduce Harms',
      url: 'https://arxiv.org/abs/2209.07858',
    },
    {
      label: 'Anthropic (Feb 3, 2025): Constitutional Classifiers',
      url: 'https://www.anthropic.com/research/constitutional-classifiers',
    },
    {
      label: 'Anthropic: Responsible Scaling Policy',
      url: 'https://www.anthropic.com/responsible-scaling-policy',
    },
    {
      label: 'OpenAI (Apr 15, 2025): Our updated Preparedness Framework',
      url: 'https://openai.com/index/updating-our-preparedness-framework/',
    },
    {
      label: 'Podwise: chapters of Anthropic’s interpretability video',
      url: 'https://podwise.ai/episodes/4956523',
    },
  ],
  faqs: [
    {
      q: 'What is the AI alignment problem in simple terms?',
      a: 'It is the challenge of making AI do what we actually want rather than what we literally said or what earns it a high score. Today it shows up as flattery, made-up facts and jailbreaks. Researchers also worry that it gets harder as AI systems become more capable and act more on their own.',
    },
    {
      q: 'What is the difference between AI safety and AI alignment?',
      a: 'Alignment is about the AI’s goals and behaviour matching what people intend. AI safety is broader: it includes alignment, plus preventing misuse by people, security of model weights, testing for dangerous capabilities and policies for deployment. Alignment is one major part of safety.',
    },
    {
      q: 'How do companies like OpenAI and Anthropic make AI safe?',
      a: 'They combine several layers: training with human and AI feedback (RLHF, Constitutional AI), written specifications such as Claude’s constitution, red-teaming and classifiers that block jailbreaks, interpretability research, and published policies like Anthropic’s Responsible Scaling Policy and OpenAI’s Preparedness Framework that say when stronger safeguards are required.',
    },
  ],
  related: [
    { label: 'Previous: Prompting vs RAG vs fine-tuning', href: '/learn-ai/fine-tuning-vs-rag' },
    {
      label: 'Next: Build an LLM with Karpathy’s Zero to Hero',
      href: '/learn-ai/build-an-llm-from-scratch',
    },
    { label: 'How ChatGPT and Claude are trained', href: '/learn-ai/how-llms-are-trained' },
    { label: 'Why AI makes things up', href: '/learn-ai/ai-hallucinations' },
    { label: 'The papers that built modern AI', href: '/learn-ai/key-ai-papers' },
    { label: 'AI product manager guide', href: '/aipm' },
  ],
  fromTheSource: [
    {
      who: 'Anthropic’s interpretability team',
      role: 'Researchers studying what happens inside Claude',
      work: 'Mapping the mind of a large language model (research post, May 2024)',
      url: 'https://www.anthropic.com/research/mapping-mind-language-model',
      idea: 'Using a technique called dictionary learning, they found millions of human-understandable “features” inside Claude 3 Sonnet, and showed that turning a feature up or down changes how the model behaves.',
      breakdown: [
        'A feature is a pattern of activity that lights up for one concept, like a city, a coding bug or flattery.',
        'Many features work across languages and even for images of the same thing.',
        'Amplifying a scam-email feature made the model write a scam it would normally refuse, so features really drive behaviour.',
        'The authors say they found only a small part of what the model learned, so this is an early step.',
      ],
      use: 'Remember that a model’s polite words do not prove what is happening inside. Interpretability is how researchers hope to check for things like deception or sycophancy directly, instead of trusting the output.',
    },
    {
      who: 'Anthropic',
      role: 'Company that trains Claude with Constitutional AI',
      work: 'Claude’s new constitution (January 2026)',
      url: 'https://www.anthropic.com/news/claude-new-constitution',
      idea: 'Anthropic wrote a long public document describing the values and behaviour it wants from Claude and explaining why, rather than only listing rules. It calls the document “the final authority on how we want Claude to be and to behave.”',
      breakdown: [
        'When priorities clash, Claude should be broadly safe first, then broadly ethical, then follow Anthropic’s guidelines, then be genuinely helpful.',
        'Safety comes first not because it matters more than ethics, but because training is imperfect and a model could have flawed values without knowing it.',
        'Claude uses the constitution to create its own training examples and rankings, building on Constitutional AI.',
        'It is released under a CC0 licence, so anyone can read, copy or adapt it.',
      ],
      use: 'If you build with AI, write down your own short “constitution” for your app: what it should always do, never do, and how to choose when goals conflict. Put it in your system prompt and test against it.',
    },
  ],
}
