import type { Lesson } from '../types'

export const lesson: Lesson = {
  slug: 'vibe-coding',
  track: 'automate',
  order: 0,
  title: 'Vibe coding: apps without code',
  metaTitle: 'What Is Vibe Coding? Meaning, Tools and Limits (2026)',
  metaDescription:
    'What is vibe coding? Karpathy’s term explained, app builders for non-coders (Lovable, Bolt, Replit, v0, AI Studio), a first project, and the security limits.',
  h1: 'What is vibe coding? A beginner’s guide to building apps without code',
  tldr: 'Vibe coding means building software by describing what you want to an AI and accepting the code it writes without reading it. Andrej Karpathy coined the term in February 2025, and Collins Dictionary made it its 2025 Word of the Year. App builders like Lovable, Bolt, Replit Agent, v0 and Google AI Studio’s Build mode let a non-coder ship a working prototype in an afternoon, but code nobody has read can hide security holes, so learn the basics before real users or money are involved.',
  minutes: 12,
  level: 'Beginner',
  steps: [
    {
      heading: 'Where did the term "vibe coding" come from?',
      body: [
        'In February 2025, Andrej Karpathy, an OpenAI founding member and former head of AI at Tesla, posted on X about a new way of working he called vibe coding. He described a way of working where you "fully give in to the vibes, embrace exponentials, and forget that the code even exists".',
        'He talked to the AI, clicked "Accept All" on every change without reading the diffs (the list of edits), and pasted error messages back in without comment. He called it fine for "throwaway weekend projects". The name stuck: Collins English Dictionary named vibe coding its Word of the Year for 2025.',
      ],
      keyIdea: 'Vibe coding is about the result you see, not the code you read.',
    },
    {
      heading: 'Is all coding with AI vibe coding?',
      body: [
        'No, and the difference matters. Programmer Simon Willison draws the line clearly: if an AI wrote every line, but you reviewed it, tested it and can explain how it works, "that’s not vibe coding, it’s software development".',
        'Think of it as a dial. At one end, you never look at the code and judge only whether the app seems to work. At the other end, you use AI like a fast assistant and check everything. Both are useful; they fit different jobs.',
      ],
      visual: {
        kind: 'compare',
        label: 'Two ends of the dial',
        title: 'The difference is who reads and tests the code, not which tool writes it',
        columns: [
          { name: 'Vibe coding', sub: 'Karpathy, Feb 2025' },
          { name: 'AI-assisted coding', sub: 'Willison: “software development”' },
        ],
        rows: [
          { label: 'Who reads the code', cells: ['Nobody', 'You, or a reviewer'] },
          {
            label: 'How you judge it',
            cells: ['It seems to work', 'Tests and a read of every change'],
          },
          { label: 'Errors', cells: ['Pasted back to the AI', 'Understood, then fixed'] },
        ],
        source: [
          {
            label: 'Andrej Karpathy on X (Feb 2025)',
            url: 'https://x.com/karpathy/status/1886192184808149383',
          },
          {
            label: 'Simon Willison (Mar 19, 2025)',
            url: 'https://simonwillison.net/2025/Mar/19/vibe-coding/',
          },
        ],
        updated: 'Nov 2026',
      },
      bullets: [
        'Vibe coding: a party invite page, a personal habit tracker, a demo for an idea.',
        'Careful AI-assisted coding: anything with logins, payments, personal data or paying customers.',
      ],
    },
    {
      heading: 'Which app builders can a non-coder use?',
      body: [
        'Several tools let you build a working web app from a chat box, with a live preview beside it. Each describes itself like this in its own docs (as of Nov 2026). Most offer some free use; check each site for current limits.',
      ],
      bullets: [
        'Lovable: describe what you want and it "generates a working application" with editable code; you can sync the code to GitHub and publish to a live URL.',
        'Bolt (bolt.new): builds sites and apps from your description, with a Plan Mode to talk through the idea first, a built-in database and publishing to a live website.',
        'Replit Agent: sets up the project, writes and tests the code, saves checkpoints you can roll back to, then publishes the app.',
        'v0 (by Vercel): an AI agent for "real code and full-stack apps"; deploy in one click or open a pull request for review.',
        'Google AI Studio Build mode: "vibe code" web or Android apps that use Gemini, then deploy to Google Cloud Run; costs may apply for paid models and hosting.',
      ],
    },
    {
      heading: 'Your first vibe-coded project, step by step',
      body: [
        'Pick something tiny that only you will use, such as interview flashcards. Write a clear first prompt: who it is for, the three things it must do, and how it should look. Then change one thing at a time, so when something breaks you know what caused it.',
      ],
      flow: [
        'Describe the app in one paragraph',
        'Ask for a plan first',
        'Check the live preview',
        'Fix one thing per message',
        'Save a checkpoint',
        'Publish and share',
      ],
      example: {
        label: 'A good first prompt',
        text: 'Build a one-page web app for practising job interview questions.\n1. Show one question at a time from a list of 20 common HR questions.\n2. A "Show tips" button reveals 3 short tips for answering.\n3. A "Next" button moves on; a counter shows "Question 4 of 20".\nClean, mobile-friendly design, large text. No login, no database.',
      },
      workflow: {
        title: 'Interview flashcards, from idea to a link on your phone',
        input:
          'An idea (“practise 20 HR interview questions on my phone”), a free app-builder account and the first prompt above.',
        steps: [
          {
            title: 'Ask for a plan, not an app',
            detail:
              'Paste the prompt, then add one line: “List the screens and buttons you will build, and wait for my OK.” Correct the plan in words; it is cheaper than correcting code.',
          },
          {
            title: 'Write 3 checks before the preview loads',
            detail:
              'Turn the prompt into tests you can click: (1) only one question shows at a time, (2) “Show tips” reveals exactly 3 tips, (3) after pressing Next 3 times the counter reads “Question 4 of 20”.',
          },
          {
            title: 'Click through the live preview',
            detail:
              'Run the 3 checks on a laptop and again at phone width. Write down every miss in one line each.',
          },
          {
            title: 'Fix one thing per message',
            detail:
              'Describe what you did, what you expected and what you saw. One fix per message tells you which change broke what.',
            code: `After I press Next 3 times the
counter says "Question 3 of 20".
Expected "Question 4 of 20".
Fix only the counter.`,
          },
          {
            title: 'Save a checkpoint, then publish',
            detail:
              'Save a checkpoint (or sync to GitHub) once all 3 checks pass, then publish and open the link on your phone.',
          },
        ],
        output:
          'A live link that passes your 3 checks on a phone, a saved version you can roll back to, and a list of what you would change next. No logins or personal data, so the risks below stay small.',
      },
    },
    {
      heading: 'What are the limits and risks?',
      body: [
        'When nobody reads the code, nobody checks it. Reported problems include: a scan of 1,645 apps made with Lovable found 170 where anyone could reach personal information; a CodeRabbit study (December 2025) found AI co-written code had about 2.74 times more security vulnerabilities than human-written code; and a Replit agent deleted a database despite instructions not to change anything. Willison’s summary: "Vibe coding your way to a production codebase is clearly risky."',
        'Maintainability is the second limit. After many rounds of "fix this", the code can turn into a tangle that even the AI struggles to change.',
      ],
      bullets: [
        'Never put passwords or API keys (secret access codes) in prompts or in the visible app.',
        'Do not collect personal or payment data in a vibe-coded app.',
        'Use checkpoints or GitHub sync so you can undo.',
        'Once real users, data or money are involved, learn the basics or ask a developer to review it.',
      ],
      keyIdea:
        'Vibe code to explore and prototype. Read and test the code before anyone trusts it.',
    },
    {
      heading: 'How is this different from Claude Code, Cursor or Codex?',
      body: [
        'App builders host everything for you in the browser, which is easy but hides the code. Agentic coding tools like Claude Code, Cursor and OpenAI Codex work inside a real project folder: the AI plans, edits many files and runs commands, while you review each change, run tests and keep the code in version control (Git).',
        'A common path is to start with an app builder to prove the idea, export the code to GitHub, then continue in an agentic coding tool where you can see and understand every change. The next lessons cover those tools.',
      ],
    },
  ],
  keyTerms: [
    {
      term: 'Vibe coding',
      meaning:
        'Building software by describing it to an AI and accepting its code without reading or reviewing it.',
    },
    {
      term: 'App builder',
      meaning:
        'A browser tool, like Lovable, Bolt, Replit, v0 or AI Studio Build mode, that turns a chat description into a working app with a live preview.',
    },
    { term: 'Diff', meaning: 'The list of exact changes an AI (or a person) made to the code.' },
    {
      term: 'Checkpoint',
      meaning:
        'A saved version of your project you can roll back to if a later change breaks something.',
    },
    {
      term: 'Agentic coding',
      meaning:
        'Using an AI agent such as Claude Code or Cursor to plan, edit and test code in a real project while you review the changes.',
    },
  ],
  videos: [
    {
      youtubeId: 'LCEmiRjPEtQ',
      title: 'Andrej Karpathy: Software Is Changing (Again)',
      channel: 'Y Combinator',
      minutes: 5,
      start: 1746,
      why: 'The person who named vibe coding explains why "everyone is now a programmer". This starts at the vibe coding chapter (29:06); the full talk is about 40 minutes and worth it later.',
    },
  ],
  tryIt: {
    title: 'Vibe code an interview flashcard app in 10 minutes',
    steps: [
      'Open Google AI Studio and choose Build, or create a free account on Lovable or Bolt.',
      'Paste the "good first prompt" from step 4 and send it.',
      'Click through the live preview. Write down one thing you want changed.',
      'Ask for that one change only, for example "make the tips appear in a light yellow box". Check the preview again.',
      'Open the code view and skim one file. You do not need to understand it; just notice how much code was written for you, and that nobody has reviewed it.',
    ],
    link: {
      label: 'Google AI Studio Build mode docs',
      url: 'https://ai.google.dev/gemini-api/docs/aistudio-build-mode',
    },
  },
  check: [
    {
      q: 'Who coined the term "vibe coding", and when?',
      options: [
        'Sam Altman, 2023',
        'Andrej Karpathy, February 2025',
        'Simon Willison, 2024',
        'Collins Dictionary, 2026',
      ],
      answer: 1,
      why: 'Karpathy described it in an X post in February 2025. Collins later named it Word of the Year for 2025.',
    },
    {
      q: 'You used AI to write all the code, then read it, tested it and can explain it. By Simon Willison’s definition, is that vibe coding?',
      options: [
        'Yes, any AI-written code is vibe coding',
        'No, that is software development',
        'Only if you used Lovable',
        'Only if the app is small',
      ],
      answer: 1,
      why: 'Willison’s line: vibe coding means not reviewing the code. Reviewing, testing and understanding it is ordinary software development, even if AI typed it.',
    },
    {
      q: 'Which project is the riskiest to vibe code without any review?',
      options: [
        'A birthday invite page',
        'A personal to-do list',
        'A shop that stores customer addresses and takes payments',
        'A demo to show a friend an idea',
      ],
      answer: 2,
      why: 'Personal data and payments need security checks. Unreviewed code has led to exposed data in real apps.',
    },
  ],
  sources: [
    {
      label: 'Wikipedia: Vibe coding (quotes Karpathy’s Feb 2025 post, Collins, security studies)',
      url: 'https://en.wikipedia.org/wiki/Vibe_coding',
    },
    {
      label: 'Simon Willison: Not all AI-assisted programming is vibe coding (Mar 2025)',
      url: 'https://simonwillison.net/2025/Mar/19/vibe-coding/',
    },
    { label: 'Lovable docs: Introduction', url: 'https://docs.lovable.dev/introduction' },
    { label: 'Bolt help center', url: 'https://support.bolt.new/' },
    { label: 'Replit docs: Replit Agent', url: 'https://docs.replit.com/replitai/agent' },
    { label: 'v0 docs', url: 'https://v0.app/docs' },
    {
      label: 'Google AI Studio: Build mode',
      url: 'https://ai.google.dev/gemini-api/docs/aistudio-build-mode',
    },
  ],
  faqs: [
    {
      q: 'What does vibe coding mean?',
      a: 'Building an app by describing it to an AI in plain language and accepting the code it writes without reading it. You judge the result by trying the app, not by checking the code. Andrej Karpathy coined the term in February 2025.',
    },
    {
      q: 'Can I vibe code with no programming experience?',
      a: 'Yes. Tools like Lovable, Bolt, Replit Agent, v0 and Google AI Studio’s Build mode turn a chat description into a working app with a live preview. Keep projects small and personal until you learn enough to check the code.',
    },
    {
      q: 'Is vibe coding safe?',
      a: 'For throwaway prototypes, mostly yes. For apps with logins, personal data or payments, unreviewed AI code has caused real data leaks, so have the code reviewed and tested before real users rely on it.',
    },
  ],
  related: [
    { label: 'Previous: Your first AI automation in n8n', href: '/learn-ai/n8n-ai-automation' },
    { label: 'Next: Claude Code for beginners', href: '/learn-ai/claude-code' },
    { label: 'Cursor for beginners', href: '/learn-ai/cursor' },
    { label: 'Claude Code vs Cursor vs Codex', href: '/learn-ai/ai-coding-tools-compared' },
    { label: 'Prompting techniques that work', href: '/learn-ai/prompt-engineering' },
    { label: 'GTM engineer guide', href: '/gtm-engineer' },
    { label: 'Free AI skills resources', href: '/free-resources#ai-skills' },
  ],
  fromTheSource: [
    {
      who: 'Andrej Karpathy',
      role: 'OpenAI founding member, former director of AI at Tesla',
      work: 'The "vibe coding" post on X (February 2025)',
      url: 'https://x.com/karpathy/status/1886192184808149383',
      idea: 'He named a new way of working where you talk to the AI, accept every change and "forget that the code even exists", and said it suits throwaway weekend projects.',
      breakdown: [
        'You steer by describing and testing, not by reading code.',
        'Errors go straight back to the AI, often without comment.',
        'He framed it as fun and fast for small projects, not as how to build serious software.',
      ],
      use: 'Use vibe coding for quick experiments and personal tools, and switch to reviewing the code once something matters.',
    },
    {
      who: 'Simon Willison',
      role: 'Programmer and widely read writer on AI tools, who drew the line between vibe coding and AI-assisted development',
      work: 'Not all AI-assisted programming is vibe coding (blog post, March 2025)',
      url: 'https://simonwillison.net/2025/Mar/19/vibe-coding/',
      idea: 'Vibe coding means building with an AI without reviewing its code. If you review, test and can explain the code, "that’s not vibe coding, it’s software development".',
      breakdown: [
        'The test is whether you understand and check the code, not who typed it.',
        'Vibe coding is great for learning and low-stakes projects.',
        'Taking unreviewed code to production is where the risk lies.',
      ],
      use: 'Before you share an app with others, ask yourself: could I explain how this part works? If not, review it or get help.',
    },
  ],
}
