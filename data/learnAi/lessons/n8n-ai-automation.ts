import type { Lesson } from '../types'

export const lesson: Lesson = {
  slug: 'n8n-ai-automation',
  track: 'automate',
  order: 17,
  title: 'Your first AI automation in n8n',
  metaTitle: 'n8n Tutorial for Beginners: Build Your First AI Workflow',
  metaDescription:
    'Learn n8n: what triggers and nodes are, how the AI nodes work, and how to build a form to AI summary to email workflow. Free and paid options, Nov 2026.',
  h1: 'n8n for beginners: build your first AI automation',
  tldr: 'n8n is a workflow automation tool: you join apps together as boxes on a canvas, and the workflow runs by itself when something happens. You can add an AI step that reads, summarises or sorts text with a model like GPT, Claude or Gemini. In this lesson you build one real workflow: a form is submitted, an AI summarises it, and the summary lands in your email or Slack.',
  minutes: 14,
  level: 'Beginner',
  steps: [
    {
      heading: 'What is n8n, in plain words?',
      body: [
        'n8n (say "n-eight-n") lets you automate boring, repeated work without writing a full program. You drag boxes onto a canvas, connect them with lines, and each box does one job: read a form, call an AI model, send an email. n8n describes itself as a "fair-code workflow automation platform with native AI capabilities".',
        'Fair-code means the source code is public on GitHub, but it uses n8n’s own Sustainable Use License rather than a classic open-source licence. You can use n8n in two ways. n8n Cloud is hosted for you, so there is nothing to install. Self-hosting means you run it on your own computer or server, which needs some technical setup (npm, Docker or a server).',
      ],
      keyIdea:
        'n8n is a visual way to say: "when this happens, do these steps", with AI as one of the steps.',
    },
    {
      heading: 'Triggers, nodes and executions: the only three words you need',
      body: [
        'A workflow is "a collection of nodes that automate a process". A node is one box on the canvas. The first box is always a trigger node, which starts the workflow when something happens: a form is submitted, a new row is added to a Google Sheet, or it is 8 AM.',
        'Each time the workflow runs from start to finish, that is one execution. This matters because n8n Cloud plans are priced by executions per month, not by how many steps a workflow has.',
      ],
      flow: [
        'Trigger (something happens)',
        'Node: do a step',
        'Node: AI step',
        'Node: send the result',
      ],
      bullets: [
        'Credentials: saved logins that let n8n talk to Gmail, Slack or an AI provider.',
        'Expressions: small snippets like {{ $json.feedback }} that pull data from an earlier node.',
        'Test vs publish: you test while building, then publish so it runs on its own.',
      ],
    },
    {
      heading: 'How does the AI part work?',
      body: [
        'n8n’s AI nodes come as "cluster nodes": a main (root) node with smaller sub-nodes plugged into it. For a first workflow, use the Basic LLM Chain node. It sends one prompt to a model and passes the answer to the next node. You plug a chat model sub-node into it, such as OpenAI, Anthropic or Google Gemini.',
        'The AI Agent node is the bigger cousin. n8n’s docs describe an agent as "a chain that knows how to make decisions": it can choose tools, use memory and take several steps. Start with a chain. Move to an agent when the task needs choices, like you saw in the AI agents lesson.',
        'To call a model you need access to it. On n8n Cloud Starter and Pro, "Gateway credits" let you run supported models without your own API key, and new Cloud users get a small amount of free credit. When self-hosting, you add your own API key from the model provider as a credential.',
      ],
      keyIdea:
        'Basic LLM Chain = one prompt in, one answer out. AI Agent = a model that decides what to do next.',
    },
    {
      heading: 'Build it: form, AI summary, email',
      body: [
        'Here is a real first workflow. A student club collects feedback with a form. Instead of reading every response, an AI writes a two-line summary with a mood label and emails it to the organiser.',
        'Add an n8n Form Trigger node and create two fields: Name and Feedback (a Textarea). n8n builds the form page for you. Then add a Basic LLM Chain, set Prompt to "Define below", and paste the prompt below. Plug in a chat model sub-node. Finally add a Gmail node with the "Send a message" operation, or a Slack node with "Send a message", and drag the chain’s output into the message body.',
        'Using Google Forms instead? Its responses go into a Google Sheet. Swap the first node for the Google Sheets Trigger with the "Row added" event, and the rest stays the same.',
      ],
      flow: ['n8n Form Trigger', 'Basic LLM Chain + chat model', 'Gmail or Slack: send a message'],
      example: {
        label: 'Prompt for the Basic LLM Chain (the {{ }} parts pull in the form answers)',
        code: true,
        text: 'Summarise this event feedback in at most 2 short sentences.\nThen add one label on a new line: Positive, Neutral or Negative.\n\nName: {{ $json.Name }}\nFeedback: {{ $json.Feedback }}',
      },
    },
    {
      heading: 'Test it, publish it, and what it costs',
      body: [
        'Click Execute workflow and open the form’s test URL. Submit a sample answer and watch each node turn green. Click a node to see exactly what data went in and out. That is how you debug in n8n. When it works, publish the workflow and share the production URL. Production runs no longer show in the editor, but you can see them in the Executions tab.',
        'Prices, as of Nov 2026, from n8n’s official pages. The self-hosted Community edition is listed as free, "with almost the complete feature set". n8n Cloud starts with a free trial (1,000 executions on the trial). Starter is €20 a month billed annually with 2,500 executions a month, and Pro is €50 a month billed annually with 10,000. The self-hosted Business plan is €667 a month billed annually. AI model usage is billed separately, by Gateway credits or by your own provider.',
      ],
      keyIdea:
        'Always test with fake data first. A published workflow runs every time the trigger fires, including AI calls that cost money.',
    },
  ],
  keyTerms: [
    {
      term: 'Workflow',
      meaning: 'A set of connected nodes that automate one process from start to finish.',
    },
    {
      term: 'Trigger node',
      meaning:
        'The first node, which starts the workflow when something happens, like a form submission or a schedule.',
    },
    {
      term: 'Execution',
      meaning: 'One complete run of a workflow. Cloud plans are priced by executions per month.',
    },
    {
      term: 'Basic LLM Chain',
      meaning:
        'An n8n AI node that sends a prompt to a chat model and returns the answer, with no tools or memory.',
    },
    {
      term: 'Credential',
      meaning: 'Saved login details that let n8n connect to an app or AI provider on your behalf.',
    },
    {
      term: 'Fair-code',
      meaning:
        'Source code you can read and self-host, shared under n8n’s own Sustainable Use License instead of a standard open-source licence.',
    },
  ],
  videos: [
    {
      youtubeId: 'GuaKeDS6UKU',
      title: 'n8n Quick Start Tutorial: Build Your First AI Agent [2026]',
      channel: 'n8n',
      minutes: 21,
      why: 'The official 2026 quick start. Watch how the form trigger, Basic LLM Chain and test data work, then how the agent part adds memory and tools.',
    },
    {
      youtubeId: '4BVTkqbn_tY',
      title: 'n8n Beginner Course (1/9) - Introduction to Automation',
      channel: 'n8n',
      minutes: 13,
      why: 'If triggers, nodes and data still feel fuzzy, this first episode of n8n’s own course explains them slowly. The interface has changed a little since 2024.',
    },
  ],
  tryIt: {
    title: 'Build a 3-node AI feedback summariser',
    steps: [
      'Sign up for the n8n Cloud free trial (no credit card needed for Starter or Pro trials) and create a new workflow.',
      'Add an n8n Form Trigger with two fields: Name (Text) and Feedback (Textarea).',
      'Add a Basic LLM Chain, choose "Define below", paste the prompt from step 4 of this lesson, and plug in a chat model sub-node.',
      'Add a Gmail node, choose "Send a message", send it to yourself, and drag the chain’s output text into the message body.',
      'Click Execute workflow, open the test form URL, and submit "The talk was great but the hall was too hot". Check your inbox for the summary and label.',
    ],
    link: { label: 'n8n docs: Build your first workflow', url: 'https://docs.n8n.io/try-it-out/' },
  },
  check: [
    {
      q: 'Which node starts an n8n workflow?',
      options: [
        'The AI Agent node',
        'A trigger node',
        'The Gmail node',
        'Whichever node you add last',
      ],
      answer: 1,
      why: 'A trigger node runs the workflow when something happens, such as a form submission, a new sheet row or a schedule.',
    },
    {
      q: 'You only need to summarise each form response with one prompt. Which AI node is the simplest fit?',
      options: [
        'AI Agent with memory and tools',
        'Basic LLM Chain with a chat model',
        'A vector store node',
        'No AI node, n8n summarises by itself',
      ],
      answer: 1,
      why: 'A Basic LLM Chain sends one prompt to a model and returns the answer. An agent is for tasks where the model must decide between tools or steps.',
    },
    {
      q: 'Your workflow has 5 nodes and runs once. How many executions does n8n count?',
      options: ['5', '1', '0, tests are never counted', 'It depends on the AI model'],
      answer: 1,
      why: 'An execution is one full run of the workflow, however many nodes it has. Cloud plans are priced by executions per month.',
    },
  ],
  fromTheSource: [
    {
      who: 'Erik Schluntz and Barry Zhang (Anthropic)',
      role: 'Anthropic engineers whose "Building effective agents" post set out the common patterns for putting AI models into workflows.',
      work: 'Building effective agents (Anthropic engineering post, December 2024)',
      url: 'https://www.anthropic.com/engineering/building-effective-agents',
      idea: 'They split AI systems into two kinds. Workflows run models and tools along "predefined code paths" that you design, while agents choose their own steps. Many useful jobs only need a workflow.',
      breakdown: [
        'Prompt chaining: one step’s output feeds the next, like form answer, then AI summary, then email. That is the workflow you build in this lesson.',
        'Routing: a first step sorts the input, then sends it down the right path, such as complaints to one team and praise to another.',
        'Parallelization: several model calls run at once on parts of the job, or on the same job to compare answers.',
        'Orchestrator-workers and evaluator-optimizer: one model splits a task for helper models, or one model writes while another checks and asks for fixes.',
      ],
      use: 'In n8n, start with a fixed chain of nodes. Add a sorting step when inputs need different handling, and reach for the AI Agent node only when you truly cannot list the steps in advance.',
    },
    {
      who: 'Jan Oberhauser',
      role: 'Founder and CEO of n8n.',
      work: 'n8n CEO Jan Oberhauser on Building the Universal AI Automation Layer (Sequoia Training Data podcast, August 2025), and the n8n GitHub README',
      url: 'https://sequoiacap.com/podcast/training-data-jan-oberhauser',
      idea: 'Oberhauser wants n8n to be the layer that ties AI models, tools and services together, so "you can actually connect everything to anything." Because nobody knows which model will win, n8n lets you plug in whichever one suits your job.',
      breakdown: [
        'The name: n8n is short for "nodemation", a blend of node (the boxes on the canvas, and Node.js) and automation. He explains in the README that he could not find a good, free short name.',
        'Any model: the chat model is a swappable part, so you can move from OpenAI to Claude or Gemini without rebuilding the workflow.',
        'Fair-code: the source is public and free to self-host, but it is not classic open source. He says the licence is there so other companies cannot sell n8n’s code commercially.',
      ],
      use: 'Build your workflow so the AI model is one plug-in part. Try the same prompt with two different chat models and keep the one that gives better summaries for the cost.',
    },
  ],
  sources: [
    { label: 'n8n pricing', url: 'https://n8n.io/pricing/' },
    {
      label: 'n8n docs: Build your first workflow (quickstart)',
      url: 'https://docs.n8n.io/try-it-out/',
    },
    {
      label: 'n8n docs: Choose how to use n8n (Cloud vs self-hosted)',
      url: 'https://docs.n8n.io/choose-how-to-use-n8n.md',
    },
    { label: 'n8n docs: Key concept glossary', url: 'https://docs.n8n.io/key-concept-glossary.md' },
    { label: 'n8n on GitHub (README and license)', url: 'https://github.com/n8n-io/n8n' },
    { label: 'n8n docs: Integrate AI', url: 'https://docs.n8n.io/advanced-ai/' },
    {
      label: 'n8n docs: Understand AI components',
      url: 'https://docs.n8n.io/build/integrate-ai/understand-ai-components.md',
    },
    {
      label: 'n8n docs: What chains do',
      url: 'https://docs.n8n.io/build/integrate-ai/understand-ai-components/what-chains-do.md',
    },
    {
      label: 'n8n docs: What agents do',
      url: 'https://docs.n8n.io/build/integrate-ai/understand-ai-components/what-agents-do.md',
    },
    {
      label: 'n8n docs: AI examples',
      url: 'https://docs.n8n.io/build/integrate-ai/ai-examples.md',
    },
    {
      label: 'n8n docs: Basic LLM Chain node',
      url: 'https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainllm.md',
    },
    {
      label: 'n8n docs: n8n Form Trigger node',
      url: 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.formtrigger.md',
    },
    {
      label: 'n8n docs: Google Sheets Trigger node',
      url: 'https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.googlesheetstrigger.md',
    },
    {
      label: 'n8n docs: Gmail node',
      url: 'https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail.md',
    },
    {
      label: 'n8n docs: Slack node',
      url: 'https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.slack.md',
    },
    {
      label: 'n8n docs: Gateway credits',
      url: 'https://docs.n8n.io/deploy/use-n8n-cloud/gateway-credits',
    },
    { label: 'n8n Learn (official courses)', url: 'https://learn.n8n.io/' },
    {
      label: 'Anthropic: Building effective agents (Dec 2024)',
      url: 'https://www.anthropic.com/engineering/building-effective-agents',
    },
    {
      label:
        'Sequoia Training Data: n8n CEO Jan Oberhauser on Building the Universal AI Automation Layer (Aug 2025)',
      url: 'https://sequoiacap.com/podcast/training-data-jan-oberhauser',
    },
  ],
  faqs: [
    {
      q: 'Is n8n free?',
      a: 'The self-hosted Community edition is listed as free, and you can stay on it indefinitely. n8n Cloud, where n8n hosts it for you, has a free trial and then paid plans. As of Nov 2026, Starter is €20 a month and Pro is €50 a month, both billed annually. AI model usage is paid separately.',
    },
    {
      q: 'Do I need to know coding to use n8n?',
      a: 'No. n8n’s own quickstart says that apart from n8n you don’t need any coding experience. Knowing a little JavaScript helps later, because expressions like {{ $json.Name }} use it, but your first workflows only need drag, drop and copy-paste.',
    },
    {
      q: 'What is the difference between the AI Agent node and the Basic LLM Chain in n8n?',
      a: 'The Basic LLM Chain sends one prompt to a model and returns the answer. The AI Agent node lets the model decide which tools to use and in what order, and it can use memory. n8n’s docs note that agents can use memory but chains cannot.',
    },
  ],
  related: [
    { label: 'Previous: Evals, does your AI work?', href: '/learn-ai/ai-evals' },
    { label: 'Next: Claude Code for beginners', href: '/learn-ai/claude-code' },
    { label: 'What is an AI agent?', href: '/learn-ai/ai-agents' },
    { label: 'GTM engineer career guide', href: '/gtm-engineer' },
    { label: 'AI engineer career guide', href: '/ai-engineer' },
    { label: 'Free AI skills resources', href: '/free-resources#ai-skills' },
  ],
}
