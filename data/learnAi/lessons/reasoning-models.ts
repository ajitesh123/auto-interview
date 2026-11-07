import type { Lesson } from '../types'

export const lesson: Lesson = {
  slug: 'reasoning-models',
  track: 'foundations',
  order: 0,
  title: 'Reasoning models and thinking',
  metaTitle: 'What Are Reasoning Models? AI Thinking Mode Explained',
  metaDescription:
    'What reasoning or “thinking” models are, how o1 and DeepSeek-R1 learned to think, what test-time compute means, and when to use thinking in ChatGPT or Claude.',
  h1: 'What are reasoning models? How AI “thinking” works, and when to use it',
  tldr: 'A reasoning model is an AI model that writes out hidden rough work, called thinking, before it gives you an answer. It was trained with reinforcement learning to solve problems step by step, so it is much better at maths, code and planning, but slower and more expensive. In ChatGPT and Claude you control this with thinking or effort settings: turn it up for hard multi-step problems and down for quick facts and rewriting.',
  minutes: 12,
  level: 'Beginner',
  steps: [
    {
      heading: 'What is a reasoning model?',
      body: [
        'A normal chat model starts writing its answer straight away, one token at a time. A reasoning model first writes a private scratchpad: it breaks the problem down, tries an approach, checks it, and sometimes backtracks. Only then does it write the final answer. These scratchpad words are called thinking tokens or reasoning tokens.',
        'Think of a maths exam. A student who writes the answer in one line often makes silly mistakes. A student who does rough work in the margin first gets more answers right, but takes longer. Reasoning models do the rough work.',
      ],
      flow: ['Your question', 'Hidden thinking (plan, try, check)', 'Final answer'],
      keyIdea:
        'A reasoning model is the same kind of LLM, trained to spend more tokens thinking before it answers.',
    },
    {
      heading: 'Where did thinking come from?',
      body: [
        'In 2022, Google researchers showed that asking a model to write out its steps, called chain of thought, made it much better at maths word problems (see the papers lesson). But that was a prompting trick. The model was not trained to reason well, it was just asked to.',
        'On 12 September 2024, OpenAI released o1, trained with large-scale reinforcement learning to think in a chain of steps, notice its own mistakes and try other approaches. On a hard maths contest exam (AIME 2024), o1 averaged 74% with one try per problem, while GPT-4o averaged 12%.',
        'In January 2025, the AI lab DeepSeek published DeepSeek-R1 and showed that reasoning can be grown with reinforcement learning on problems whose answers can be checked, without humans writing example reasoning. The model learned on its own to check its work and switch strategies. The paper was later published in Nature.',
      ],
      flow: [
        'Problem with a checkable answer',
        'Model thinks and answers',
        'Answer checked: right or wrong',
        'Reward good thinking',
        'Repeat millions of times',
      ],
    },
    {
      heading: 'Test-time compute: thinking longer gives better answers',
      body: [
        'Training compute is the computing power spent building a model. Test-time compute is the computing power spent while it answers your question. Reasoning models opened a new lever: instead of only building a bigger model, you can let the same model think longer.',
        'OpenAI reported that o1 got steadily better with more thinking time. Anthropic described two kinds: serial (one long chain of thinking) and parallel (several separate attempts, then picking the best one). A 2024 study by Snell and colleagues found that a smaller model given extra thinking on problems it could partly solve could beat a model 14 times its size.',
      ],
      example: {
        label: 'o1 on AIME 2024 maths problems (from OpenAI, Sept 2024)',
        text: 'GPT-4o, no extended thinking: 12% average\no1, one attempt per problem: 74%\no1, re-ranking 1,000 attempts per problem: 93%',
      },
      keyIdea:
        'More thinking at answer time can buy accuracy, the way extra rough work does in an exam.',
    },
    {
      heading: 'Thinking in the apps you use (as of November 2026)',
      body: [
        'Claude (claude.ai): click the model name next to the send button. Under “Effort” you choose Low, Medium, High, Extra high or Max. Low and Medium save your usage limits for routine tasks, High balances quality and speed, and Max is the most thorough. Some models have a Thinking toggle; on Claude Opus 5.5 thinking is always on, so you lower effort to make it think less. Behind the scenes, Anthropic calls this adaptive thinking: Claude decides for each message whether to think and how much.',
        'ChatGPT: the free plan includes GPT-5 Thinking Mini, and paid plans add more reasoning models; Pro lists “Pro reasoning powered by GPT-6 Astra”. Earlier in 2026, ChatGPT’s picker offered Instant for fast answers and Thinking for harder questions, with Standard or Extended thinking time, plus an auto mode that picks for you. These names change often, so look for the words “Thinking”, “reasoning” or “effort” in your model menu.',
        'For developers, both APIs expose an effort setting: OpenAI’s reasoning effort runs from none to max, and Anthropic’s effort runs from low to max.',
      ],
    },
    {
      heading: 'When should you turn thinking on?',
      body: [
        'Thinking helps when there are several steps and a wrong step ruins the answer. It wastes time when the answer is a simple lookup or a rewrite of your own text. Anthropic’s docs give the same rule: a simple factual question may get no thinking at all, while a multi-step maths problem or tricky debugging gets deep reasoning.',
      ],
      bullets: [
        'Turn thinking up: maths and physics problems, debugging code, comparing two job offers with numbers, planning a trip or study schedule with constraints, logic puzzles, analysing a long contract',
        'Keep it low or off: quick facts, rewriting an email, translating a message, brainstorming names, casual chat',
        'If a fast answer feels shallow or wrong, ask again with more thinking before you rewrite your prompt',
      ],
      keyIdea: 'Multi-step and checkable: think more. One-step or creative: answer fast.',
    },
    {
      heading: 'The trade-off: cost, waiting time and trust',
      body: [
        'Thinking is not free. Thinking tokens are billed as output tokens on both the OpenAI and Claude APIs, even though you usually see only a summary of them. A reply that thinks for a minute can cost many times more than a quick one, and in the apps it uses up your plan’s limits faster.',
        'Also, the visible thinking is not a perfect window into the model. OpenAI hides o1’s raw chain of thought and shows a summary. Anthropic’s research found models sometimes rely on things they never mention in their thinking. So treat the thinking as a helpful explanation, and still check important answers.',
      ],
      keyIdea:
        'Reasoning models are more accurate on hard problems, not always right. Use them where accuracy is worth the wait and cost.',
    },
  ],
  keyTerms: [
    {
      term: 'Reasoning model',
      meaning:
        'An LLM trained to think through a problem in hidden steps before answering. Also called a thinking model or large reasoning model (LRM).',
    },
    {
      term: 'Thinking tokens',
      meaning:
        'The scratchpad text a reasoning model writes before its answer. You are billed for them, but usually see only a summary.',
    },
    {
      term: 'Test-time compute',
      meaning:
        'Computing power used while the model answers your question, as opposed to while it was being trained. More thinking means more test-time compute.',
    },
    {
      term: 'Reinforcement learning (RL)',
      meaning:
        'Training by trial and reward: the model tries, its answer is scored, and behaviour that earned rewards is strengthened.',
    },
    {
      term: 'Effort',
      meaning:
        'A setting in Claude and the OpenAI API (low to max) that controls how much work, including thinking, the model puts into a reply.',
    },
    {
      term: 'Adaptive thinking',
      meaning:
        'Anthropic’s mode where Claude decides for each request whether to think and how much, guided by the effort level.',
    },
  ],
  videos: [
    {
      youtubeId: 'enLbj0igyx4',
      title: 'What Are Large Reasoning Models (LRMs)? Smarter AI Beyond LLMs',
      channel: 'IBM Technology',
      minutes: 9,
      why: 'A short whiteboard explanation of how reasoning models differ from plain LLMs, how they are trained, and their cost. Good companion to steps 1 to 3.',
    },
  ],
  tryIt: {
    title: 'Fast answer vs thinking answer: run a side-by-side test',
    steps: [
      'Open Claude or ChatGPT (free plans work). Find the model menu and look for “Effort”, “Thinking” or a fast vs thinking option.',
      'With thinking low or off, ask: “A pen and a notebook cost ₹110 together. The notebook costs ₹100 more than the pen. How much is the pen? Reply with only the number.” The right answer is ₹5. Note what you get.',
      'Now a harder one with thinking low: “I have ₹3,000 for 4 days and 4 nights in Jaipur. Hotels cost ₹600 a night, food ₹250 a day, and each of 5 sights costs ₹150 entry plus ₹100 travel. Can I see all 5? Show the total.”',
      'Turn thinking or effort up (or pick the Thinking option) and ask the same question in a new chat. Compare the answer, the time taken, and whether the arithmetic is right (₹4,650, so no).',
      'Finally, with thinking on, ask “What is the capital of Kerala?” Notice that it may answer instantly. Simple questions do not need thinking.',
    ],
    link: { label: 'Open Claude (free)', url: 'https://claude.ai' },
  },
  check: [
    {
      q: 'What makes a reasoning model different from a regular chat model?',
      options: [
        'It searches the web for every question',
        'It writes hidden step-by-step thinking before giving the final answer',
        'It is a completely different kind of AI that does not use tokens',
        'It only works for maths',
      ],
      answer: 1,
      why: 'Reasoning models are still LLMs. They have been trained with reinforcement learning to think in steps, check their work and only then answer.',
    },
    {
      q: 'What does “test-time compute” mean?',
      options: [
        'The computing used to test a model before release',
        'The computing used while the model answers your question, which grows when it thinks longer',
        'The time you spend testing prompts',
        'The number of GPUs used in training',
      ],
      answer: 1,
      why: 'Test-time compute is spent at answer time. Letting a model think longer uses more of it and often improves accuracy on hard problems.',
    },
    {
      q: 'Which task gains the least from turning thinking up?',
      options: [
        'Finding the bug in a 200-line program',
        'Working out whether a budget adds up across several costs',
        'Rewriting a short email to sound more polite',
        'Solving a probability question',
      ],
      answer: 2,
      why: 'Rewriting a short email is a one-step, language task. Extra thinking adds wait time and cost without much benefit. The other three are multi-step and have a right answer.',
    },
  ],
  sources: [
    {
      label: 'OpenAI (Sept 12, 2024): Learning to reason with LLMs (o1)',
      url: 'https://openai.com/index/learning-to-reason-with-llms/',
    },
    {
      label:
        'DeepSeek-AI (2025): DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning',
      url: 'https://arxiv.org/abs/2501.12948',
    },
    {
      label:
        'Wei et al. (2022): Chain-of-Thought Prompting Elicits Reasoning in Large Language Models',
      url: 'https://arxiv.org/abs/2201.11903',
    },
    {
      label:
        'Snell et al. (2024): Scaling LLM Test-Time Compute Optimally can be More Effective than Scaling Model Parameters',
      url: 'https://arxiv.org/abs/2408.03314',
    },
    {
      label: 'Anthropic (Feb 24, 2025): Claude’s extended thinking',
      url: 'https://www.anthropic.com/news/visible-extended-thinking',
    },
    {
      label: 'Claude Docs: Adaptive thinking',
      url: 'https://platform.claude.com/docs/en/build-with-claude/adaptive-thinking',
    },
    {
      label: 'Claude Docs: Effort',
      url: 'https://platform.claude.com/docs/en/build-with-claude/effort',
    },
    {
      label: 'Claude Docs: Extended thinking (legacy)',
      url: 'https://platform.claude.com/docs/en/build-with-claude/extended-thinking',
    },
    {
      label: 'Claude Help Center: Change the model, effort and thinking settings',
      url: 'https://support.claude.com/en/articles/8664678-change-the-model-effort-and-thinking-settings',
    },
    {
      label: 'Claude Help Center: Using extended thinking',
      url: 'https://support.claude.com/en/articles/10574485',
    },
    {
      label: 'OpenAI API docs: Reasoning models',
      url: 'https://developers.openai.com/api/docs/guides/reasoning',
    },
    { label: 'ChatGPT pricing (plans and models, Nov 2026)', url: 'https://chatgpt.com/pricing' },
    {
      label: 'TechRadar (Apr 30, 2026): When to use Instant, Thinking or Pro in ChatGPT',
      url: 'https://www.techradar.com/ai-platforms-assistants/chatgpt/chatgpt-just-made-it-easier-to-pick-the-right-model-just-like-gemini-does-heres-when-to-use-instant-thinking-or-pro',
    },
    {
      label: 'IBM Technology (YouTube): What Are Large Reasoning Models (LRMs)?',
      url: 'https://www.youtube.com/watch?v=enLbj0igyx4',
    },
  ],
  faqs: [
    {
      q: 'What is the difference between a reasoning model and an LLM?',
      a: 'A reasoning model is a kind of LLM. It is trained further with reinforcement learning to think through problems step by step before answering. A regular LLM answers straight away. Reasoning models are better at maths, code and planning, but slower and cost more per answer.',
    },
    {
      q: 'Is ChatGPT a reasoning model?',
      a: 'ChatGPT is an app that offers several models. Some are fast models and some are reasoning (“Thinking”) models, and it can also pick automatically. Claude works the same way through its effort and thinking settings. Model names change often, so check the model menu in your app.',
    },
    {
      q: 'Does thinking mode make AI more accurate?',
      a: 'On multi-step problems like maths, coding and planning, usually yes: that is what these models were trained for. On simple facts or writing tasks it adds little. It does not stop all mistakes or made-up facts, so still check answers that matter.',
    },
  ],
  related: [
    {
      label: 'Previous: How ChatGPT and Claude are trained',
      href: '/learn-ai/how-llms-are-trained',
    },
    { label: 'Next: How AI sees, hears and speaks', href: '/learn-ai/multimodal-ai' },
    { label: 'The papers that built modern AI', href: '/learn-ai/key-ai-papers' },
    { label: 'The levers that make answers better', href: '/learn-ai/ai-output-levers' },
    { label: 'ChatGPT vs Claude vs Gemini', href: '/learn-ai/choosing-an-ai-model' },
    { label: 'AI engineer career guide', href: '/ai-engineer' },
  ],
  fromTheSource: [
    {
      who: 'OpenAI (the o1 team)',
      role: 'Built o1, the first widely released reasoning model',
      work: 'Learning to reason with LLMs (blog post, September 2024)',
      url: 'https://openai.com/index/learning-to-reason-with-llms/',
      idea: 'OpenAI trained o1 with large-scale reinforcement learning to think in a long chain of steps, spot its own mistakes and try different approaches. They reported that performance kept improving with more training and with more time spent thinking at answer time.',
      breakdown: [
        'The model is rewarded for reaching correct answers, so it learns what useful thinking looks like.',
        'Two knobs now matter: how much training it got, and how long it thinks for your question.',
        'OpenAI chose to hide the raw chain of thought and show users a summary instead.',
      ],
      use: 'When you pick a Thinking option in ChatGPT, you are spending more test-time compute. Use it for problems with several steps, and give it the full details so it has something to reason about.',
    },
    {
      who: 'DeepSeek-AI',
      role: 'The AI lab behind DeepSeek-R1',
      work: 'DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning (paper, January 2025; Nature, 2025)',
      url: 'https://arxiv.org/abs/2501.12948',
      idea: 'They showed that “the reasoning abilities of LLMs can be incentivized through pure reinforcement learning,” without human-written reasoning examples, using problems where the answer can be checked automatically.',
      breakdown: [
        'Maths, coding and science problems have answers a computer can check, so no human grader is needed.',
        'With only a reward for right answers, the model developed habits like checking its own work and switching strategy mid-problem.',
        'They also used reasoning from the large model to improve smaller models.',
      ],
      use: 'This is why reasoning models shine on tasks with a clear right answer. When you ask one for help, ask it to check its answer against the numbers you gave, since checking is a skill it was trained for.',
    },
  ],
}
