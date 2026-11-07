import type { Lesson } from '../types'

export const lesson: Lesson = {
  slug: 'ai-evals',
  track: 'build',
  order: 16,
  title: 'Evals: does your AI work?',
  metaTitle: 'What Are AI Evals? How to Test an LLM App, Simply',
  metaDescription:
    'What are AI evals? Learn how to test an LLM feature with golden datasets, rubrics, LLM-as-a-judge and error analysis, plus a simple worked example you can copy.',
  h1: 'What are AI evals? How to know if your AI feature actually works',
  tldr: 'Evals are tests for AI features: a fixed set of realistic inputs, a clear rule for what a good answer looks like, and a score you check every time you change the prompt or model. You find what to test by reading real outputs, then grade with code, a human, or another model using a rubric (LLM-as-a-judge).',
  minutes: 10,
  level: 'Beginner',
  steps: [
    {
      heading: 'Why can’t you just try it a few times?',
      body: [
        'AI answers can change from run to run, and a prompt change that fixes one case can quietly break three others. Trying a few questions and saying "looks good" is what OpenAI calls a "vibe-based" eval, and it lists it as an anti-pattern.',
        'Think of a mock test series before JEE, NEET or the SAT. Same kind of paper, a fixed marking scheme, and a score you track week after week. An eval is a mock test for your AI.',
        'In his post "Your AI Product Needs Evals", Hamel Husain argues that most unsuccessful AI products share one root cause: no solid way to evaluate them.',
      ],
      keyIdea: 'If you are not measuring it, you are guessing.',
    },
    {
      heading: 'What goes into an eval?',
      body: [
        'An eval has three parts. A golden dataset: a list of realistic inputs, ideally from real users, including tricky edge cases, each with the expected answer or the key facts it must contain. A grader that decides pass or fail. And a score, like 17 out of 20.',
        'Anthropic’s docs give three design rules: make it task-specific (mirror what real users ask), automate grading where you can, and prefer more test cases with automatic grading over a few hand-graded ones.',
      ],
      bullets: [
        'Code grading: exact or keyword match. Fastest and most reliable, but misses nuance.',
        'Human grading: most flexible and high quality, but slow and expensive.',
        'LLM grading: another model grades with a rubric. Fast and flexible, but test it before you trust it.',
      ],
    },
    {
      heading: 'How do you find what to test?',
      body: [
        'Don’t start by imagining problems. Start by reading real outputs. This is called error analysis, and the AI Evals FAQ on hamel.dev calls it the most important activity in evals.',
        'Collect about 100 varied conversations and read at least the first 30 yourself. Write a short note on anything wrong. Then group the notes into categories and count them. Now you know which failure matters most. In the FAQ’s words: "Write evaluators for errors you discover, not errors you imagine."',
      ],
      example: {
        label: 'Error analysis notes for a college help bot (example)',
        code: true,
        text: 'Chat  Note                               Category\n#07   Quoted last year’s fee               Outdated info\n#12   Replied in Hindi to English question Wrong language\n#19   Invented a scholarship               Made-up fact\n#23   Invented a hostel rule               Made-up fact\n\nCounts: Made-up fact 9, Outdated info 5, Wrong language 2',
      },
    },
    {
      heading: 'What is LLM-as-a-judge, and when can you trust it?',
      body: [
        'For answers that code can’t check, you can ask a second model to grade them against a rubric, a short list of what a good answer must do. Anthropic’s tips: write a detailed rubric, ask for a fixed output like PASS or FAIL, let the judge reason before it decides, and use a different model from the one that wrote the answer.',
        'Judges have biases. OpenAI notes they can favour longer answers and be swayed by the order in which answers appear. So first grade 30 to 100 answers yourself, run the judge on the same ones, and only rely on it if it agrees with you most of the time. Simple pass or fail labels work better than 1 to 5 scores, which are hard to apply consistently.',
      ],
      example: {
        label: 'A judge prompt with a rubric',
        code: true,
        text: 'You are grading a college help bot.\nPASS only if the answer:\n1) uses only facts from the policy text, and\n2) gives a clear number or date when asked.\nOtherwise FAIL.\n\nPolicy: {policy}\nQuestion: {question}\nAnswer: {answer}\n\nThink step by step, then output PASS or FAIL.',
      },
    },
    {
      heading: 'A worked example: improving a leave-policy bot',
      body: [
        'Here is the loop in action, with made-up numbers. You collect 20 real questions about the leave policy, with the right answers. Version 1 of your prompt passes 14 out of 20 (70%). Error analysis shows 4 failures are made-up facts.',
        'You change the prompt to answer only from the policy text and to say "I don’t know" otherwise. You rerun the same 20 questions: 18 out of 20 (90%), and none of the 14 that passed before now fail. That last check matters: it catches regressions, things that used to work and broke.',
        'OpenAI’s advice is to keep evaluating: rerun your evals whenever you change the prompt, model or data, and keep adding new failures you see in real use.',
      ],
      flow: [
        'Collect real questions',
        'Read outputs, label failures',
        'Write graders',
        'Run and score',
        'Change prompt or model',
        'Rerun before release',
      ],
      keyIdea: 'Same test set, every change, every time. That is how a demo becomes a product.',
    },
  ],
  keyTerms: [
    {
      term: 'Eval',
      meaning: 'A repeatable test that measures how well an AI feature does a specific job.',
    },
    {
      term: 'Golden dataset',
      meaning:
        'A fixed set of realistic inputs with known good answers, reused every time you change something.',
    },
    {
      term: 'Rubric',
      meaning:
        'A short checklist of what a good answer must do, used by a human or a model to grade.',
    },
    {
      term: 'LLM-as-a-judge',
      meaning:
        'Using a second AI model to grade answers against a rubric, checked first against human grades.',
    },
    {
      term: 'Error analysis',
      meaning: 'Reading real outputs, noting what went wrong, and counting failures by category.',
    },
    {
      term: 'Regression',
      meaning:
        'Something that used to work but broke after a change. Evals help you catch it before users do.',
    },
  ],
  videos: [
    {
      youtubeId: 'trfUBIDeI1Y',
      title: 'LLM as a Judge: Scaling AI Evaluation Strategies',
      channel: 'IBM Technology',
      minutes: 6,
      why: 'Explains rubric-based and pairwise judging and the biases to watch for. Focus on the part about checking for bias.',
    },
  ],
  tryIt: {
    title: 'Build a 10-question eval in a spreadsheet',
    steps: [
      'Open a new Google Sheet. Add columns: Question, Must include, Model answer, Pass or Fail, Note.',
      'Write 10 questions on a topic you know well, like your college’s admission rules or your favourite app’s FAQ. Include 2 tricky ones and 1 whose answer is not in any official source.',
      'Paste each question into a chatbot and copy its answer into the sheet.',
      'Mark Pass or Fail yourself using the Must include column. Add a short note for each fail. Count your score.',
      'Change your prompt (for example, add "If you are not sure, say so") and rerun all 10. Did the score go up? Did anything that passed now fail?',
      'Bonus: ask a different chatbot to grade each answer with a PASS or FAIL rubric. How often does it agree with you?',
    ],
    link: { label: 'Open a new Google Sheet', url: 'https://sheets.new' },
  },
  check: [
    {
      q: 'What is a golden dataset?',
      options: [
        'The data used to train the model',
        'A fixed set of realistic inputs with known good answers that you rerun after every change',
        'A list of your best customers',
        'The model’s most confident answers',
      ],
      answer: 1,
      why: 'The golden dataset stays the same so scores are comparable across prompt and model changes.',
    },
    {
      q: 'Why should you compare an LLM judge with your own grades before trusting it?',
      options: [
        'Judges are always wrong',
        'Judges can have biases, like favouring longer answers, and may not match what you mean by good',
        'It makes the eval cheaper',
        'Because judges can only grade code',
      ],
      answer: 1,
      why: 'A judge is only useful if it agrees with careful human grading. Check it on a labelled sample first.',
    },
    {
      q: 'You just launched an AI feature. What is the best first step toward evals?',
      options: [
        'Buy an evaluation platform',
        'Write 50 tests for problems you imagine might happen',
        'Read real outputs, note what went wrong, and count failures by type',
        'Ask users to rate every answer from 1 to 10',
      ],
      answer: 2,
      why: 'Error analysis on real outputs shows which failures actually happen and matter most. Then you write tests for those.',
    },
  ],
  fromTheSource: [
    {
      who: 'Hamel Husain',
      role: 'Machine learning engineer with 20+ years of experience, formerly at Airbnb and GitHub, who now helps teams measure their AI systems and co-teaches a course on evals.',
      work: 'Your AI Product Needs Evals (blog post, March 2024)',
      url: 'https://hamel.dev/blog/posts/evals/',
      idea: 'AI products stall when teams judge quality by feel. The teams that improve fast build evals for their own users’ tasks, look at real outputs constantly, and use what they find to change prompts, data and code.',
      breakdown: [
        'Level 1, unit tests: quick, cheap checks written as code (does the answer include a date? is the JSON valid?), run on every change.',
        'Level 2, human and model review: log real conversations, have people read them, and train an AI judge to agree with those people.',
        'Level 3, A/B tests: once the product is mature, check whether changes actually help real users.',
        'Through all of it, keep reading the data. He writes, "You can never stop looking at data."',
      ],
      use: 'Start at Level 1 today. Write five simple code checks for your bot, run them every time you change the prompt, and spend 20 minutes a week reading real conversations.',
    },
    {
      who: 'Lianmin Zheng, Wei-Lin Chiang, Ion Stoica and colleagues (UC Berkeley, UC San Diego, Carnegie Mellon, Stanford and MBZUAI)',
      role: 'The team behind MT-Bench and Chatbot Arena, who tested at scale whether one AI can fairly grade another.',
      work: 'Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena (paper, 2023)',
      url: 'https://arxiv.org/abs/2306.05685',
      idea: 'Strong models like GPT-4 can grade open-ended answers and agree with human preferences over 80% of the time, about as often as humans agree with each other. But judges have clear biases you must test for.',
      breakdown: [
        'Position bias: the judge may favour whichever answer it sees first.',
        'Verbosity bias: it may prefer longer answers even when they are not better.',
        'Self-enhancement bias: it may favour answers written by itself or a similar model.',
        'Limited reasoning: judges can get maths and logic questions wrong when grading them, so check those verdicts with extra care.',
      ],
      use: 'Before trusting an AI judge, grade a sample yourself and compare. Swap the order of the answers you show it, and use a different model as judge from the one being tested.',
    },
  ],
  sources: [
    {
      label: 'OpenAI docs: Evaluation best practices',
      url: 'https://developers.openai.com/api/docs/guides/evaluation-best-practices',
    },
    {
      label: 'Anthropic docs: Define success criteria and build evaluations',
      url: 'https://platform.claude.com/docs/en/test-and-evaluate/develop-tests',
    },
    {
      label: 'Hamel Husain: Your AI Product Needs Evals',
      url: 'https://hamel.dev/blog/posts/evals/',
    },
    { label: 'hamel.dev: AI Evals FAQ', url: 'https://hamel.dev/blog/posts/evals-faq/' },
    {
      label: 'Zheng et al. (2023), Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena',
      url: 'https://arxiv.org/abs/2306.05685',
    },
  ],
  faqs: [
    {
      q: 'What are evals in AI?',
      a: 'Evals are repeatable tests for AI features. You run a fixed set of realistic inputs through your system, grade the outputs with code, people or another model, and track the score every time you change the prompt, model or data.',
    },
    {
      q: 'What is LLM-as-a-judge?',
      a: 'It means using one AI model to grade another model’s answers against a rubric. It is fast and scales well, but judges have biases, such as preferring longer answers, so check them against human grades before relying on them.',
    },
    {
      q: 'How many test cases do I need for an eval?',
      a: 'Start small and real. A useful habit is to read about 100 varied real conversations and label at least 30 yourself to find failure types, then turn those into tests. More test cases with automatic grading usually beat a few hand-graded ones.',
    },
  ],
  related: [
    { label: 'Previous: What is an AI agent?', href: '/learn-ai/ai-agents' },
    { label: 'Why AI makes things up', href: '/learn-ai/ai-hallucinations' },
    { label: 'Next: Your first AI automation in n8n', href: '/learn-ai/n8n-ai-automation' },
    { label: 'AI product manager guide', href: '/aipm' },
    { label: 'AI engineer career guide', href: '/ai-engineer' },
    { label: 'Free AI skills resources', href: '/free-resources#ai-skills' },
  ],
}
