import type { Lesson } from '../types'

export const lesson: Lesson = {
  slug: 'prompt-engineering',
  track: 'use',
  order: 8,
  title: 'Prompting techniques that work',
  metaTitle: 'Prompt Engineering for Beginners: 6 Techniques That Work',
  metaDescription:
    'Prompt engineering for beginners: six techniques from the Anthropic, OpenAI and Google guides, with before-and-after prompt examples you can copy and use today.',
  h1: 'Prompt engineering for beginners: 6 techniques that actually work',
  tldr: 'Prompt engineering means writing instructions that get reliable, useful answers from an AI model. The official guides from Anthropic, OpenAI and Google agree on the same core moves: be clear and give context, set a role, show examples, structure long prompts, let the model think, and ask for a format. Then test and improve.',
  minutes: 11,
  level: 'Beginner',
  steps: [
    {
      heading: 'Technique 1: Be clear and explain why',
      body: [
        'Every official guide starts here. Anthropic’s test is simple: show your prompt to a colleague who knows nothing about the task. If they would be confused, the model will be too.',
        'Also say why you want something. Anthropic’s example: instead of “never use ellipses”, explain that the answer will be read aloud by a text-to-speech engine, which cannot pronounce them. With the reason, the model can handle cases you did not think of.',
      ],
      example: {
        label: 'Weak prompt vs strong prompt',
        text: `Weak:
Write a message about the delay.

Strong:
I run a small home bakery in Pune. A customer’s birthday cake order will be 2 hours late because our oven broke. Write a short WhatsApp message to her. She is a regular, so keep it warm and personal. Apologise once, give the new delivery time (6 pm), and offer free cupcakes. No more than 60 words, because people skim WhatsApp.`,
      },
      keyIdea: 'Write for a smart stranger: what, for whom, why, and any limits.',
    },
    {
      heading: 'Technique 2: Give it a role',
      body: [
        'A role (also called a persona) tells the model which point of view to answer from. OpenAI’s guide recommends it for tailoring answers to an audience, and Anthropic notes that even a single sentence of role makes a difference.',
        'Roles work best when they are specific and paired with a task. “You are an expert” adds little. “You are a hiring manager at a fintech startup interviewing for a junior product manager” changes the questions you get.',
      ],
      example: {
        label: 'Role + task',
        text: `You are a hiring manager at a Bengaluru fintech startup, interviewing me for a junior product manager role.

Ask me one interview question at a time. After each answer, give me a score out of 10, one thing I did well and one thing to fix. Start with a product sense question.`,
      },
    },
    {
      heading: 'Technique 3: Show examples (few-shot prompting)',
      body: [
        'Showing beats telling. Giving the model a few sample inputs with the outputs you want is called few-shot prompting; giving none is zero-shot. Google’s Gemini guide recommends always including a few examples, and Anthropic suggests 3 to 5 for best results.',
        'Make the examples varied, so the model learns the pattern rather than copying one sample. Google also warns that too many examples can make the model copy them too closely.',
      ],
      example: {
        label: 'Few-shot example: sorting customer messages',
        text: `Sort each customer message into one label: ORDER, COMPLAINT, or QUESTION.

Message: "Can I get 2 kg chocolate cake for Saturday?"
Label: ORDER

Message: "The cake was dry and came late."
Label: COMPLAINT

Message: "Do you have eggless options?"
Label: QUESTION

Message: "Is delivery free to Kothrud? Also want 1 kg black forest."
Label:`,
      },
      keyIdea:
        'Two or three good examples often fix format problems faster than paragraphs of rules.',
    },
    {
      heading: 'Technique 4: Structure long prompts with headings or tags',
      body: [
        'When a prompt mixes instructions, a document and examples, the model can lose track of which part is which. Mark the parts clearly. OpenAI calls these delimiters (like ### or quotes); Anthropic recommends XML tags such as <document> and <instructions>.',
        'For long material, Anthropic suggests putting the document at the top and your question at the end. In its tests, asking the question at the end improved answer quality by up to 30 percent.',
      ],
      example: {
        label: 'A structured prompt',
        code: true,
        text: `<job_description>
[paste the job post here]
</job_description>

<my_resume>
[paste your resume here]
</my_resume>

<instructions>
Compare my resume to the job description.
List the 5 skills the job asks for that my resume does not show.
For each, suggest one honest way to show it, using only my real experience.
</instructions>`,
      },
    },
    {
      heading: 'Technique 5: Let it think, then check its work',
      body: [
        'For problems with several steps, such as maths, planning or comparing options, asking the model to reason through the steps before answering helps. OpenAI’s guide calls this giving step-by-step instructions instead of jumping to the answer.',
        'Newer “reasoning” models already think before they reply. For these, Anthropic advises a general nudge like “think this through carefully” over writing out every step yourself, plus a self-check: “Before you finish, verify your answer against these criteria.”',
      ],
      example: {
        label: 'Thinking + self-check',
        text: `I have offers from two companies. Offer A: ₹9 LPA, Bengaluru, 1-hour commute each way. Offer B: ₹7.5 LPA, fully remote, in my hometown.

Think this through carefully: compare take-home pay after rent and travel, learning, and growth. Then recommend one.
Before you finish, check that every number you used came from my message, and list any assumptions you made.`,
      },
    },
    {
      heading: 'Technique 6: Ask for a format, then iterate',
      body: [
        'Say how the answer should look: a table, 5 bullets, under 100 words, JSON, or a formal email. Google’s guide calls these constraints and response format. OpenAI adds that a single tone word like formal, friendly or simple changes the style a lot.',
        'Then iterate. All three guides say prompting is trial and error. If a task is big, split it into smaller prompts and feed each answer into the next. A handy trick from Google’s guide: type “Make this a power prompt:” followed by your rough prompt, then use the improved version it gives you.',
      ],
      bullets: [
        'Format: “Give me a table with columns X, Y, Z.”',
        'Length: “Under 80 words.”',
        'Tone: “Friendly, simple English, no jargon.”',
        'Split big jobs: outline first, then each section',
      ],
      keyIdea: 'A great prompt is usually the third version, not the first.',
    },
  ],
  keyTerms: [
    {
      term: 'Prompt engineering',
      meaning: 'Writing and testing instructions so an AI model gives reliable, useful answers.',
    },
    {
      term: 'Role (persona)',
      meaning:
        'A line telling the model who to act as, such as “a hiring manager” or “a patient maths tutor”.',
    },
    {
      term: 'Few-shot prompting',
      meaning:
        'Including a few example inputs and outputs in your prompt so the model copies the pattern. Zero-shot means no examples.',
    },
    {
      term: 'Delimiters / XML tags',
      meaning: 'Markers like ### or <document></document> that separate the parts of a prompt.',
    },
    {
      term: 'Reasoning model',
      meaning:
        'A model that thinks through a problem step by step before it answers. Slower, but better at multi-step tasks.',
    },
  ],
  videos: [
    {
      youtubeId: 'ysPbXH0LpIE',
      title: 'Prompting 101 | Code w/ Claude',
      channel: 'Anthropic',
      minutes: 25,
      why: 'Two Anthropic engineers build one real prompt layer by layer: task, tone, background, examples and output format. The clearest demo of these techniques together.',
    },
    {
      youtubeId: 'T9aRN5JkmL8',
      title: 'AI prompt engineering: A deep dive',
      channel: 'Anthropic',
      minutes: 76,
      why: 'A relaxed roundtable with Anthropic’s prompt experts. Watch for how they think about clear communication and iteration, not tricks.',
    },
  ],
  tryIt: {
    title: 'Build your own mock interview coach',
    steps: [
      'Open Claude, ChatGPT or Gemini.',
      'First send a weak prompt: “Ask me interview questions.” Note what you get.',
      'Now open a new chat and write a strong prompt using at least four techniques: a role (interviewer for a specific job), clear context (your experience level), one example of the feedback style you want, and a format (one question at a time, score out of 10).',
      'Answer two questions. Then add a follow-up: “Make the next question harder and focus on my weak area.”',
      'Compare the two chats. Save the strong prompt in your notes so you can reuse it.',
    ],
    link: { label: 'Open Claude (free)', url: 'https://claude.ai' },
  },
  check: [
    {
      q: 'Your chatbot keeps returning answers in the wrong layout. Which technique usually fixes this fastest?',
      options: [
        'Adding “please” and “thank you”',
        'Showing two or three examples of the exact output you want',
        'Writing the prompt in capital letters',
        'Asking the same question again',
      ],
      answer: 1,
      why: 'Few-shot examples show the model the pattern directly. Google and Anthropic both recommend examples for controlling format.',
    },
    {
      q: 'You paste a 20-page report and ask a question about it. Where should the question go?',
      options: [
        'At the very top, before the report',
        'In the middle of the report',
        'At the end, after the report',
        'It does not matter at all',
      ],
      answer: 2,
      why: 'Anthropic recommends long documents at the top and the question at the end; in its tests this improved answer quality by up to 30 percent.',
    },
    {
      q: 'Why does Anthropic suggest explaining why you want something, not just giving the rule?',
      options: [
        'Longer prompts are always better',
        'The model can apply the reason to situations your rule did not cover',
        'It makes the answer faster',
        'Models ignore rules without reasons',
      ],
      answer: 1,
      why: 'With the reason (for example, the text will be read aloud), the model can make sensible choices in cases you did not list.',
    },
  ],
  fromTheSource: [
    {
      who: 'Tom Brown and 30 co-authors at OpenAI',
      role: 'The team behind GPT-3. Several of them, including Brown, Dario Amodei, Jared Kaplan and Sam McCandlish, later co-founded Anthropic.',
      work: 'Language Models are Few-Shot Learners (GPT-3, 2020)',
      url: 'https://arxiv.org/abs/2005.14165',
      idea: 'They showed that a big enough model, GPT-3 with 175 billion parameters, can pick up a new task from a few examples written in the prompt, “without any gradient updates or fine-tuning”. The paper calls this in-context learning.',
      breakdown: [
        'Zero-shot: you only describe the task. One-shot: you add one example. Few-shot: you add a handful.',
        'The model’s weights do not change. It picks up the pattern from your examples for that one request only.',
        'The larger the model, the better it used examples in the prompt, which is a big reason prompting became a real skill.',
      ],
      use: 'When instructions alone do not get the format you want, paste two or three examples of input and ideal output, like the customer-message sorter in Technique 3. That is few-shot prompting, straight from this paper.',
    },
    {
      who: 'Jason Wei and eight co-authors at Google Research (Brain team)',
      role: 'The Google team that named and tested chain-of-thought prompting, the idea behind today’s “thinking” models.',
      work: 'Chain-of-Thought Prompting Elicits Reasoning in Large Language Models (2022)',
      url: 'https://arxiv.org/abs/2201.11903',
      idea: 'They found that showing a model a few worked examples with “a series of intermediate reasoning steps” made large models much better at maths word problems, common sense questions and simple symbol-manipulation puzzles. With just eight such examples, a 540 billion parameter model set a new best score on GSM8K, a test of school maths word problems.',
      breakdown: [
        'Normal few-shot: question → answer. Chain of thought: question → steps → answer.',
        'The model copies the habit and writes out its own steps before giving the final answer.',
        'The gain showed up in very large models. It is an ability that appears with scale.',
        'Today’s reasoning models are trained to think in steps on their own, so you rarely need to spell the steps out.',
      ],
      use: 'On a fast, non-thinking model, show one worked example with steps, or ask it to work through the problem step by step before answering. On a reasoning model, a short “think this through carefully” plus a self-check, as in Technique 5, is usually enough.',
    },
  ],
  sources: [
    {
      label: 'Anthropic: Prompt engineering overview',
      url: 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview',
    },
    {
      label: 'Anthropic: Prompting best practices (clarity, examples, XML, roles, thinking)',
      url: 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/be-clear-and-direct',
    },
    {
      label: 'OpenAI Help: Prompt engineering best practices for ChatGPT',
      url: 'https://help.openai.com/en/articles/10032626-prompt-engineering-best-practices-for-chatgpt',
    },
    {
      label: 'Google AI for Developers: Prompt design strategies (Gemini API)',
      url: 'https://ai.google.dev/gemini-api/docs/prompting-strategies',
    },
    {
      label: 'Google Workspace: Writing effective prompts',
      url: 'https://workspace.google.com/intl/en_ie//resources/ai/writing-effective-prompts/',
    },
    {
      label: 'Brown et al. (2020): Language Models are Few-Shot Learners (GPT-3)',
      url: 'https://arxiv.org/abs/2005.14165',
    },
    {
      label:
        'Wei et al. (2022): Chain-of-Thought Prompting Elicits Reasoning in Large Language Models',
      url: 'https://arxiv.org/abs/2201.11903',
    },
    { label: 'Wikipedia: Anthropic (founders)', url: 'https://en.wikipedia.org/wiki/Anthropic' },
  ],
  faqs: [
    {
      q: 'What is prompt engineering in simple words?',
      a: 'It is the skill of writing clear instructions for an AI model, then testing and improving them until the answers are reliable. You do not need to code; it is closer to writing a good brief for a new colleague.',
    },
    {
      q: 'What is few-shot prompting?',
      a: 'Few-shot prompting means putting a few examples of inputs and the outputs you want inside your prompt. The model follows the pattern. Zero-shot means giving instructions with no examples.',
    },
    {
      q: 'Do I still need to say “think step by step”?',
      a: 'With newer reasoning models, usually not, because they already think before answering. A general nudge like “think this through carefully” plus a request to check the answer against your criteria tends to work better than spelling out each step.',
    },
  ],
  related: [
    { label: 'Previous: Your first prompt', href: '/learn-ai/first-prompt' },
    { label: 'Next: Why AI makes things up', href: '/learn-ai/ai-hallucinations' },
    { label: 'Prompting vs RAG vs fine-tuning', href: '/learn-ai/fine-tuning-vs-rag' },
    { label: 'AI product manager guide', href: '/aipm' },
    { label: 'Free AI mock interview', href: '/free-mock-interview' },
    { label: 'Free AI skills resources', href: '/free-resources#ai-skills' },
  ],
}
