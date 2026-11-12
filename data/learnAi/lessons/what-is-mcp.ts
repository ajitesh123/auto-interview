import type { Lesson } from '../types'

export const lesson: Lesson = {
  slug: 'what-is-mcp',
  track: 'build',
  order: 14,
  title: 'What is MCP?',
  metaTitle: 'What Is MCP? Model Context Protocol Explained Simply',
  metaDescription:
    'What is MCP (Model Context Protocol)? The USB-C port for AI apps: hosts, clients, servers, tools, who supports it in 2026, and how to use MCP servers safely.',
  h1: 'What is MCP (Model Context Protocol)? A simple explanation',
  tldr: 'MCP (Model Context Protocol) is an open standard for connecting AI apps like Claude, ChatGPT, VS Code or Cursor to outside tools and data, such as your files, GitHub or a database. Anthropic released it in November 2024, and the official docs compare it to a USB-C port for AI apps: build a connector once and it works in every app that supports MCP. Since December 2025 it has belonged to the Agentic AI Foundation, part of the Linux Foundation.',
  minutes: 12,
  level: 'Beginner',
  steps: [
    {
      heading: 'What problem does MCP solve?',
      body: [
        'Remember when every phone had a different charger? Each brand needed its own cable. AI apps had the same problem. If five AI apps each wanted to work with ten tools (GitHub, Google Drive, Slack, a database), someone had to build up to fifty separate connections.',
        'On 25 November 2024, Anthropic released the Model Context Protocol, "an open standard for connecting AI assistants to the systems where data lives". The official site says: think of MCP like a USB-C port for AI applications. A tool maker builds one MCP server, and any AI app that speaks MCP can plug into it.',
        'The idea borrows from the Language Server Protocol, which did the same job for code editors: one standard so every editor can support every programming language.',
      ],
      keyIdea: 'Build the connector once, use it in every AI app that speaks MCP.',
    },
    {
      heading: 'Who are the host, the client and the server?',
      body: [
        'MCP has three roles. The host is the AI app you use, like Claude Desktop, Claude Code or VS Code. The server is a program that offers tools or data, like a GitHub server or a files server. The client sits inside the host: the host creates one client for each server it connects to, and each client keeps its own connection.',
        'Picture your laptop (host). Each USB-C port is a client. Each device you plug in, a hard disk or a monitor, is a server.',
        'Servers can be local or remote. A local server runs on your own computer, for example one that reads files in a folder. A remote server runs on the internet, for example one run by a company like Sentry, and you sign in to use it.',
      ],
      visual: {
        kind: 'compare',
        label: 'Claude docs · checked 12 Nov 2026',
        title:
          'Remote servers suit online services; local ones suit your own files and offline work',
        corner: 'Question',
        columns: [{ name: 'Remote server (by URL)' }, { name: 'Local server (desktop extension)' }],
        rows: [
          {
            label: 'Where it runs',
            cells: ['On the internet, run by the tool maker', 'On your own computer'],
          },
          {
            label: 'Best for',
            cells: [
              'Internet-hosted services and public APIs',
              'Local files and tools, sensitive data, offline work',
            ],
          },
          {
            label: 'How you add it in Claude',
            cells: [
              'Customize > Connectors > Add custom connector',
              'Desktop app: Settings > Extensions, drag in a .mcpb file',
            ],
          },
          {
            label: 'Who can use it',
            cells: [
              'Free (1 custom), Pro, Max, Ultra, Team, Enterprise',
              'Claude desktop app, signed in',
            ],
          },
          {
            label: 'What it can reach',
            cells: [
              'Whatever your sign-in allows in that service',
              'Whatever your user account can reach on the computer',
            ],
          },
        ],
        note: 'Most people meet remote servers first, as the connectors for Gmail, Drive, Slack or Notion.',
        source: [
          {
            label: 'Claude docs: Add a connector that isn’t in the directory',
            url: 'https://claude.com/docs/connectors/custom/remote-mcp',
          },
        ],
        updated: 'Nov 2026',
      },
      flow: [
        'You',
        'Host (e.g. Claude Desktop)',
        'MCP client',
        'MCP server (e.g. GitHub)',
        'GitHub data and actions',
      ],
    },
    {
      heading: 'What can an MCP server offer?',
      body: ['A server can offer three kinds of things, which the docs call primitives:'],
      bullets: [
        'Tools: actions the model can call, like search_files, create_issue or run_query.',
        'Resources: read-only information, like a file’s contents or a database’s layout.',
        'Prompts: ready-made templates the user can pick, like "summarise this pull request".',
        'Going the other way, a server can ask the user for missing details (the docs call this elicitation).',
      ],
      example: {
        label: 'Part of a server’s tool list (simplified from the MCP docs)',
        code: true,
        text: '{\n  "tools": [\n    {\n      "name": "get_weather",\n      "description": "Get current weather information for any location",\n      "inputSchema": {\n        "type": "object",\n        "properties": { "location": { "type": "string" } },\n        "required": ["location"]\n      }\n    }\n  ]\n}',
      },
      keyIdea:
        'MCP does not replace tool calling. The host collects tools from MCP servers and hands them to the model through ordinary tool calling.',
    },
    {
      heading: 'What happens when you ask a question?',
      body: [
        'Say you connect a GitHub MCP server to your AI app and type "open a bug report for the login error". The host asks each connected server which tools it has (a "tools/list" request). It passes those tools to the model. The model picks create_issue and fills in a title and description.',
        'The host asks you to approve. Its client then sends a "tools/call" request to the GitHub server, which does the work and replies. The model reads the reply and tells you the issue is created. All these messages use JSON-RPC 2.0, a simple JSON format for "call this method with these inputs".',
      ],
      flow: [
        'You ask',
        'Host lists tools from servers',
        'Model picks a tool',
        'You approve',
        'Server runs it and replies',
        'Model answers you',
      ],
      workflow: {
        title: 'Worked workflow: trace one MCP request, message by message',
        input:
          'A host (say Claude Desktop) connected to a weather MCP server, and your question: "What is the weather in New York?" The messages below are shortened from the examples in the MCP specification.',
        steps: [
          {
            title: 'The client asks the server what it can do',
            detail:
              'When it connects, and again if the server says its list changed, the client sends tools/list.',
            code: `{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/list"
}`,
          },
          {
            title: 'The server replies with its tools',
            detail:
              'Each tool has a name, a description the model reads, and an input schema. The host passes these to the model as ordinary tools.',
            code: `{ "name": "get_weather",
  "description": "Get current
    weather information
    for a location",
  "inputSchema": {
    "type": "object",
    "properties": {
      "location": {
        "type": "string" } },
    "required": ["location"] } }`,
          },
          {
            title: 'The model picks a tool and fills in the input',
            detail:
              'Reading your question, the model asks to call get_weather with location "New York". The spec says a human should be able to deny the call, so the host may show an approval prompt here.',
          },
          {
            title: 'The client sends tools/call',
            code: `{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/call",
  "params": {
    "name": "get_weather",
    "arguments": {
      "location": "New York" } } }`,
            detail: 'Same JSON-RPC format, a new id, the tool name and the arguments.',
          },
          {
            title: 'The server answers, and the model writes the reply',
            detail:
              'The result comes back as content blocks. If the tool failed, the result says isError: true and the model can explain or retry.',
            code: `"content": [{
  "type": "text",
  "text": "...Temperature: 72°F
    ...Partly cloudy" }],
"isError": false`,
          },
        ],
        output:
          'You read "It is 72°F and partly cloudy in New York." Behind it: two requests, two replies, one approval. Every connector you switch on in Claude or ChatGPT works this way.',
      },
    },
    {
      heading: 'Who supports MCP in 2026?',
      body: [
        'MCP started at Anthropic but is no longer only for Claude. On 9 December 2025, Anthropic donated MCP to the new Agentic AI Foundation, a fund under the Linux Foundation co-founded by Anthropic, Block and OpenAI, with Google, Microsoft, AWS, Cloudflare and Bloomberg supporting it. MCP’s own maintainers still decide how the protocol changes.',
        'At that time, Anthropic reported more than 10,000 active public MCP servers and over 97 million monthly SDK downloads across Python and TypeScript.',
      ],
      bullets: [
        'Anthropic: Claude apps and Claude Code.',
        'OpenAI: MCP servers in ChatGPT (as plugins since July 2026) and Codex, the Responses API and the Agents SDK.',
        'Google: Gemini support, and in April 2026, more than 50 Google-managed MCP servers for Google Cloud services such as BigQuery and Workspace.',
        'Microsoft: Microsoft Copilot, Copilot Studio (since March 2025) and Visual Studio Code.',
        'Developer tools such as Cursor.',
      ],
    },
    {
      heading: 'Is MCP safe? What should you watch for?',
      body: [
        'An MCP server can read your data and act as you. The MCP specification itself warns that tools mean running code, so treat them with care: hosts must ask your permission before running any tool, and a tool’s own description should not be trusted unless the server comes from a trusted source.',
        'A local server runs with your computer’s permissions. A harmful one, or a harmful install command, could copy your files or keys. And text inside a document or web page can try to trick the model into calling tools you did not intend (prompt injection).',
      ],
      bullets: [
        'Install servers only from sources you trust, ideally the tool maker’s official one.',
        'Read the exact command before approving a one-click install.',
        'Give the least access: one folder, not your whole drive; read-only tokens where possible.',
        'Read each approval prompt, especially for anything that sends, deletes or pays.',
        'Remove connectors you no longer use.',
      ],
      keyIdea: 'Connect an MCP server only if you would trust it with your login.',
    },
  ],
  keyTerms: [
    {
      term: 'MCP (Model Context Protocol)',
      meaning:
        'An open standard for connecting AI apps to outside tools and data, so one connector works across many apps.',
    },
    {
      term: 'MCP host',
      meaning:
        'The AI app you use, such as Claude Desktop or VS Code, which manages connections to servers.',
    },
    {
      term: 'MCP client',
      meaning: 'The part inside the host that keeps one connection to one MCP server.',
    },
    {
      term: 'MCP server',
      meaning:
        'A program that offers tools, resources or prompts to AI apps, running locally or on the internet.',
    },
    {
      term: 'Tools, resources, prompts',
      meaning:
        'The three things a server can offer: actions to take, data to read, and ready-made templates.',
    },
    {
      term: 'Local vs remote server',
      meaning:
        'A local server runs on your computer; a remote server runs online and usually needs you to sign in.',
    },
  ],
  videos: [
    {
      youtubeId: 'eur8dUO9mvE',
      title: 'What is MCP? Integrate AI Agents with Databases & APIs',
      channel: 'IBM Technology',
      minutes: 4,
      why: 'A short whiteboard view of hosts, clients and servers. Watch it right after step 2.',
    },
    {
      youtubeId: 'CQywdSdi5iA',
      title: 'The Model Context Protocol (MCP)',
      channel: 'Anthropic',
      minutes: 20,
      why: 'The people who built MCP explain why they made it and how to start. Good once the basics click.',
    },
  ],
  tryIt: {
    title: 'Connect Claude to a demo MCP server',
    steps: [
      'Open Claude in a browser or Claude Desktop and go to Customize, then Connectors.',
      'Choose "Add custom connector" and paste the official demo server address: https://example-server.modelcontextprotocol.io/mcp',
      'In a new chat, select + at the lower left, then Connectors, and switch the demo server on. You will see what the demo server offers.',
      'Ask Claude to use one of its tools. Notice the approval prompt before the tool runs.',
      'The Free plan allows one custom connector. If you already use it, open the Connectors list anyway: each ready-made connector there, like Google Drive or GitHub, works the same way.',
    ],
    link: {
      label: 'Official guide: connect to remote MCP servers',
      url: 'https://modelcontextprotocol.io/docs/develop/connect-remote-servers',
    },
  },
  check: [
    {
      q: 'In MCP, what is the host?',
      options: [
        'The company that hosts the website',
        'The AI app you use, like Claude Desktop or VS Code',
        'The database the server reads',
        'The person who wrote the server',
      ],
      answer: 1,
      why: 'The host is the AI application. It creates one client per server and passes the servers’ tools to the model.',
    },
    {
      q: 'You want the model to be able to create a GitHub issue. Which MCP primitive is that?',
      options: ['A resource', 'A prompt', 'A tool', 'A transport'],
      answer: 2,
      why: 'Tools are actions the model can call. Resources are data to read, and prompts are templates the user picks.',
    },
    {
      q: 'A blog post says "paste this command to install a cool MCP server". What is the safest move?',
      options: [
        'Paste it right away, MCP is a standard so it must be safe',
        'Check the source is official, read the full command, and give it access to only what it needs',
        'Give it access to your whole drive so it works smoothly',
        'Turn off approvals so it runs faster',
      ],
      answer: 1,
      why: 'A local MCP server runs with your permissions. The MCP security guide warns about harmful install commands, so check the source, read the command and keep access small.',
    },
  ],
  fromTheSource: [
    {
      who: 'David Soria Parra and Justin Spahr-Summers (Anthropic)',
      role: 'The two Anthropic engineers who created MCP, as Anthropic’s launch post states.',
      work: 'Introducing the Model Context Protocol (Anthropic announcement, November 2024)',
      url: 'https://www.anthropic.com/news/model-context-protocol',
      idea: 'Even the best models are cut off from data stuck in separate apps and old systems. The post says "every new data source requires its own custom implementation", and MCP replaces those one-off connectors with one open standard.',
      breakdown: [
        'Launch day shipped three things: the specification and SDKs, local MCP server support in the Claude Desktop apps, and an open-source set of ready-made servers.',
        'Developers can either offer their data through an MCP server or build AI apps (clients) that connect to those servers.',
        'Early users named in the post included Block and Apollo, with developer-tool companies such as Zed, Replit, Codeium and Sourcegraph also working with it.',
      ],
      use: 'Before you write custom glue code to connect an AI app to a tool, check whether an MCP server for that tool already exists. If it does, you can plug it in instead of building it.',
    },
    {
      who: 'David Soria Parra and Justin Spahr-Summers',
      role: 'MCP’s co-creators, explaining in their own words how it started and why it is designed the way it is.',
      work: 'The Creators of Model Context Protocol (Latent Space podcast, April 2025)',
      url: 'https://www.latent.space/p/mcp',
      idea: 'MCP began with a small annoyance: David kept copying things back and forth between Claude Desktop and his code editor. He saw it as an "M times N" problem, many apps times many tools, and the pair built the protocol in about six weeks, borrowing heavily from the Language Server Protocol.',
      breakdown: [
        'M times N: without a standard, 5 apps and 10 tools need up to 50 connectors. With one, each side builds once.',
        'Tools, resources and prompts are kept apart because a different party controls each. The model chooses tools, the app decides which resources to pull in, and the user picks prompts.',
        'Their advice for beginners: start by building a small server for something you personally care about. A simple one can take about half an hour.',
      ],
      use: 'When you meet a new MCP server, ask who is in control of each part: what the model can call by itself, what the app adds, and what you choose. That tells you where to set approvals.',
    },
  ],
  sources: [
    {
      label: 'MCP specification: Tools (tools/list and tools/call examples)',
      url: 'https://modelcontextprotocol.io/specification/2025-06-18/server/tools',
    },
    {
      label: 'Claude docs: Add a connector that isn’t in the directory (remote vs local)',
      url: 'https://claude.com/docs/connectors/custom/remote-mcp',
    },
    {
      label: 'Anthropic: Introducing the Model Context Protocol (Nov 2024)',
      url: 'https://www.anthropic.com/news/model-context-protocol',
    },
    {
      label: 'Latent Space podcast: The Creators of Model Context Protocol (Apr 2025)',
      url: 'https://www.latent.space/p/mcp',
    },
    {
      label: 'MCP docs: What is the Model Context Protocol?',
      url: 'https://modelcontextprotocol.io/docs/getting-started/intro',
    },
    {
      label: 'MCP docs: Architecture overview',
      url: 'https://modelcontextprotocol.io/docs/learn/architecture',
    },
    {
      label: 'MCP specification (latest)',
      url: 'https://modelcontextprotocol.io/specification/latest',
    },
    {
      label: 'MCP docs: Security best practices',
      url: 'https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices',
    },
    {
      label: 'MCP docs: Connect to local MCP servers',
      url: 'https://modelcontextprotocol.io/docs/develop/connect-local-servers',
    },
    {
      label: 'MCP docs: Connect to remote MCP servers',
      url: 'https://modelcontextprotocol.io/docs/develop/connect-remote-servers',
    },
    {
      label: 'Anthropic: Donating MCP and establishing the Agentic AI Foundation (Dec 2025)',
      url: 'https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation',
    },
    {
      label: 'MCP blog: MCP joins the Agentic AI Foundation',
      url: 'https://blog.modelcontextprotocol.io/posts/2025-12-09-mcp-joins-agentic-ai-foundation/',
    },
    {
      label: 'OpenAI docs: Building MCP servers for ChatGPT and the API',
      url: 'https://developers.openai.com/api/docs/mcp/',
    },
    { label: 'OpenAI Agents SDK: MCP', url: 'https://openai.github.io/openai-agents-python/mcp/' },
    {
      label: 'Google Cloud blog: 50+ managed MCP servers (Apr 2026)',
      url: 'https://cloud.google.com/blog/products/ai-machine-learning/google-managed-mcp-servers-are-available-for-everyone',
    },
    {
      label: 'Microsoft: Introducing MCP in Copilot Studio (Mar 2025)',
      url: 'https://www.microsoft.com/en-us/microsoft-copilot/blog/copilot-studio/introducing-model-context-protocol-mcp-in-copilot-studio-simplified-integration-with-ai-apps-and-agents/',
    },
  ],
  faqs: [
    {
      q: 'What is MCP in simple terms?',
      a: 'MCP is a common plug for AI apps. Instead of every AI app building its own link to every tool, a tool maker builds one MCP server, and any app that supports MCP, like Claude, ChatGPT, VS Code or Cursor, can use it.',
    },
    {
      q: 'Is MCP only for Claude?',
      a: 'No. Anthropic created it, but it is an open standard now run under the Linux Foundation’s Agentic AI Foundation. ChatGPT, Gemini, Microsoft Copilot, Visual Studio Code and Cursor all support it.',
    },
    {
      q: 'What is the difference between MCP and an API?',
      a: 'An API is one service’s own interface, with its own rules. MCP is a shared standard that AI apps use to discover and call tools from any server in the same way. An MCP server often calls a normal API behind the scenes, for example the GitHub API.',
    },
  ],
  related: [
    { label: 'Tool calling (function calling)', href: '/learn-ai/tool-calling' },
    { label: 'Connectors: use MCP in Claude and ChatGPT', href: '/learn-ai/ai-connectors' },
    { label: 'What is an API?', href: '/learn-ai/what-is-an-api' },
    { label: 'Next: What is an AI agent?', href: '/learn-ai/ai-agents' },
    { label: 'Claude Code for beginners', href: '/learn-ai/claude-code' },
    { label: 'AI engineer career guide', href: '/ai-engineer' },
    { label: 'Forward deployed engineer guide', href: '/fde' },
    { label: 'Free AI skills resources', href: '/free-resources#ai-skills' },
  ],
}
