import type { Lesson } from '../types'

export const lesson: Lesson = {
  slug: 'ai-connectors',
  track: 'use',
  order: 0,
  title: 'Connectors: Gmail, Drive, Slack in AI',
  metaTitle: 'Claude and ChatGPT Connectors: Gmail, Drive, Slack Guide',
  metaDescription:
    'How connectors (plugins in ChatGPT) link Claude and ChatGPT to Gmail, Drive, Slack and Notion: setup, three worked workflows, safe permissions, as of Nov 2026.',
  h1: 'Connectors in Claude and ChatGPT: connect Gmail, Drive, Slack and Notion safely',
  tldr: 'A connector lets an AI app such as Claude or ChatGPT search, read and act inside another app you use, like Gmail, Google Drive, Slack or Notion, with your own login. Claude calls them connectors; since July 2026 ChatGPT calls them plugins. Both are built on MCP, both can ask before they act, and the safe habit is simple: turn on only the connectors a task needs, let read tools run, and make anything that sends, shares or deletes wait for your approval.',
  minutes: 15,
  level: 'Beginner',
  steps: [
    {
      heading: 'What is a connector, in one sentence?',
      body: [
        'Anthropic’s help centre defines it this way: "Connectors let Claude access your apps and services, retrieve your data, and take actions within connected services." Without one, you copy an email or a document into the chat. With one, the AI goes and gets it, and its answer links back to the email or file it used.',
        'Under the hood a connector is an MCP server: a small program, usually run by the app’s maker, that offers the AI a list of tools such as search_threads or create_draft. The AI app decides which tool to call, the connector runs it with your permissions, and the result comes back into the conversation. The AI can only see what you can already see in that app.',
      ],
      flow: [
        'You ask a question',
        'AI picks a connector tool',
        'Connector runs it with your login',
        'Result enters the chat',
        'Answer with links to sources',
      ],
      keyIdea:
        'A connector is a door from the chat into one of your apps. It opens with your key, so it can see and do what you can.',
    },
    {
      heading: 'How do you turn one on in Claude and in ChatGPT?',
      body: [
        'In Claude, go to Customize > Connectors, find the app (Gmail, Google Drive, Slack, Notion and many more in the directory) and select Connect, then sign in to that app. In a chat, select + at the lower left, then Connectors, and switch on only the ones this conversation needs. On Team and Enterprise plans an Owner must first add the connector for the organisation; each person then connects their own account. Connectors also work in the Claude iOS and Android apps.',
        'In ChatGPT the same thing is now a plugin. OpenAI launched "apps" in ChatGPT in October 2025 and in July 2026 moved them into one plugins directory. Open Plugins, select + on the one you want, connect your account if asked, then start a new chat and type @ followed by the plugin name to use it. Installing a plugin does not by itself give it your data or approve its actions.',
      ],
      visual: {
        kind: 'compare',
        label: 'Anthropic and OpenAI help pages · checked 12 Nov 2026',
        title: 'Claude and ChatGPT do the same job with different names and menus',
        corner: 'Question',
        columns: [{ name: 'Claude' }, { name: 'ChatGPT' }],
        rows: [
          {
            label: 'What it is called',
            cells: ['Connector', 'Plugin (earlier connector, then app)'],
          },
          {
            label: 'Where to add one',
            cells: ['Customize > Connectors', 'Plugins directory, then +'],
          },
          {
            label: 'Use it in a chat',
            cells: ['+ > Connectors, switch it on', 'Type @ and the plugin name'],
          },
          {
            label: 'Free plan',
            cells: [
              'Web connectors for all users; 1 custom connector',
              'Select plugins on all plans; some need a paid plan',
            ],
          },
          {
            label: 'Add your own MCP server',
            cells: ['Add custom connector (paste URL)', 'Add custom MCP server (paste URL)'],
          },
          {
            label: 'Approval controls',
            cells: [
              'Per tool: Always allow, Needs approval or Blocked',
              'Always, before changes, or before big ones',
            ],
          },
        ],
        note: 'Menus change often. If a label differs on your screen, search the help page named in the source.',
        source: [
          {
            label: 'Claude Help: Use connectors to extend Claude’s capabilities',
            url: 'https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities',
          },
          {
            label: 'Claude docs: Add a connector that isn’t in the directory',
            url: 'https://claude.com/docs/connectors/custom/remote-mcp',
          },
          { label: 'ChatGPT: Plugins', url: 'https://chatgpt.com/features/plugins/' },
          { label: 'ChatGPT docs: Plugins', url: 'https://learn.chatgpt.com/docs/plugins' },
          {
            label: 'OpenAI plugins changelog (12 Jun 2026: permission controls)',
            url: 'https://developers.openai.com/plugins/changelog',
          },
        ],
        updated: 'Nov 2026',
      },
      keyIdea:
        'Connect once in settings, then switch connectors on per chat. Fewer switched on means fewer ways for the AI to go wrong.',
    },
    {
      heading: 'Worked workflow 1: an interview-prep brief from Gmail, Calendar and Drive',
      body: [
        'Here is a task most job seekers do by hand: before an interview, dig out the recruiter’s emails, the invite and your resume, and turn them into one page of notes. The people and company below are made up; the steps work the same in Claude, and in ChatGPT with its Gmail, Google Calendar and Google Drive plugins.',
        'One thing to know first. As of 12 Nov 2026, two Anthropic pages disagree about Gmail. The help centre says Claude can send, reply to and forward email, and asks your approval before each of these actions by default; the Gmail docs page still says the connector only reads. The connector’s own page lists both kinds of tools. So check the tool list on your screen, and in this workflow ask only for a draft.',
      ],
      workflow: {
        title: 'Worked workflow: one-page interview brief with sources',
        input:
          'An email thread with a recruiter at Northwind Analytics (fictional), a calendar invite for Thursday 3 pm, and resume.pdf in Google Drive.',
        steps: [
          {
            title: 'Switch on only three connectors for this chat',
            detail:
              'Select + > Connectors and turn on Gmail, Google Calendar and Google Drive. Turn the rest off so the AI cannot wander into Slack or Notion. Before the first run, set send, forward and delete to Needs approval (see the permissions step below). In ChatGPT, type @Gmail, @Google Calendar and @Google Drive in the message instead.',
          },
          {
            title: 'Ask with names, a time window and a format',
            detail:
              'Name the company, the file and the date range, and ask for citations. Say what it must not do.',
            code: 'Search my Gmail for the thread with Northwind Analytics from the last 30 days,\nand my Calendar for the interview invite. Then open resume.pdf in my Drive.\nWrite a one-page brief: role, interviewers and time, what the recruiter asked\nme to prepare, three resume lines that match the job, two questions to ask.\nCite every email or file you used. Do not send or create anything.',
          },
          {
            title: 'Check every citation',
            detail:
              'Open each linked email or file. Delete any line in the brief that has no source; that line is a guess.',
          },
          {
            title: 'Approve one small action',
            detail:
              'Ask: "Draft, do not send, a two-line reply confirming Thursday 3 pm." Read the draft in Gmail and send it yourself.',
          },
        ],
        output:
          'A one-page brief where every fact links to an email, invite or file, plus one unsent reply waiting in your Drafts.',
      },
      keyIdea:
        'Good connector prompts name the source, the time window and the output, and say what the AI must not do.',
    },
    {
      heading: 'Worked workflow 2: a weekly update from Slack and Notion, as a draft',
      body: [
        'The second pattern is "read many places, write one draft". Slack’s own MCP server can search messages, read channel history, and also send messages, and Slack says workspace admins can approve and manage every MCP client, so yours may need to allow it first. Notion says its connector can read from and write to your pages with your permissions. That is useful and risky at once, so the output goes to a draft you check, never straight to the team channel.',
      ],
      workflow: {
        title: 'Worked workflow: Friday update from #launch and the launch tracker',
        input:
          'A Slack channel #launch with this week’s messages and a Notion page called "Launch tracker" (both fictional).',
        steps: [
          {
            title: 'Connect Slack and Notion once',
            detail:
              'Customize > Connectors > Slack, then Notion (in ChatGPT, type @Slack and @Notion). Set Slack’s send tools to Needs approval or Blocked. If Slack refuses, your workspace admin has not approved the connector yet; ask them.',
          },
          {
            title: 'Read, then write in one place only',
            detail: 'Tell it where to write and where never to write.',
            code: 'Read #launch messages since Monday and the Notion page "Launch tracker".\nWrite a 150-word update under three headings: Done, Blocked, Next.\nLink each line to the message or page it came from.\nCreate it as a new Notion page "Week 46 update" inside "Launch tracker". Do not post in Slack.',
          },
          {
            title: 'Approve the one write',
            detail:
              'When it asks to create the Notion page, check the title and the parent page, then approve.',
          },
          {
            title: 'Edit and post it yourself',
            detail:
              'Fix anything wrong, then paste the update into Slack. You stay the person who speaks for the team.',
          },
        ],
        output:
          'A linked, 150-word update in Notion that you checked, and nothing posted in Slack without you.',
      },
    },
    {
      heading: 'Which tools should you let a connector use without asking?',
      body: [
        'A connector is not one switch. It is a bundle of tools, and in Claude you can set each tool to Always allow, Needs approval or Blocked. We counted the tools on Google’s Gmail connector page in Claude’s directory (24 shown of 29): only a quarter just read your mail. The rest label, file, draft, send or delete.',
        'Why care? Simon Willison, who coined the term prompt injection, warns about a "lethal trifecta": an AI with access to your private data, exposure to text an attacker controls, and a way to send data out. Your inbox has all three. A stranger’s email can contain hidden instructions, and if the AI may read mail and also forward it without asking, those instructions can leak your data.',
      ],
      visual: {
        kind: 'bars',
        label: 'Gmail connector (made by Google) · 24 tools shown',
        title: 'Only 6 of the 24 Gmail tools just read; 18 change your mailbox',
        rows: [
          {
            label: 'Read only',
            value: 6,
            note: 'search_threads, get_thread, get_message, list_labels, list_drafts, list_filters',
            highlight: true,
          },
          {
            label: 'Labels, filters, spam',
            value: 12,
            note: 'label_message, create_filter, mark_thread_spam and 9 more',
          },
          {
            label: 'Write or send',
            value: 4,
            note: 'create_draft, reply, forward, send_message',
          },
          { label: 'Delete', value: 2, note: 'trash_message, trash_thread' },
        ],
        emphasis: true,
        sort: false,
        note: 'Our count of the tool names on the connector page; 5 of 29 tools were not shown. Suggested settings: Read = Always allow; Organise and drafts = Needs approval; send, forward and delete = Needs approval or Blocked.',
        source: [
          {
            label: 'Claude connectors directory: Gmail',
            url: 'https://claude.com/connectors/gmail',
          },
          {
            label: 'Simon Willison: The lethal trifecta for AI agents (16 Jun 2025)',
            url: 'https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/',
          },
        ],
        updated: '12 Nov 2026',
      },
      bullets: [
        'Read tools: Always allow is fine; they cannot change anything.',
        'Draft, label, create page: Needs approval, so you see each one.',
        'Send, forward, share, delete: Needs approval, or Blocked if the task never needs them.',
        'In ChatGPT, set plugins to ask before changes, or before every action for email.',
      ],
      keyIdea:
        'Let it read freely, make it ask before it changes anything, and block what the task never needs.',
    },
    {
      heading: 'Worked workflow 3: add a custom connector, and keep the list short',
      body: [
        'If a tool you use is not in the directory but its maker publishes an MCP server address, you can add it by URL. Claude’s Free plan allows one custom connector; ChatGPT has the same idea under Add custom MCP server. Custom servers are not verified by Anthropic or OpenAI, so only add ones from a maker you trust.',
        'More connectors is not better. Each connector’s tool list takes room in the AI’s context, and results such as a long transcript pass through it too. Anthropic’s help page suggests switching tool access to On demand once you have 10 or more connectors active. Its engineers described one example where loading only the tools needed, instead of every definition up front, cut token use by 98.7%.',
      ],
      visual: {
        kind: 'bars',
        label: 'Anthropic Engineering · one agent task',
        title: 'Loading only the tools a task needs used 2,000 tokens instead of 150,000',
        rows: [
          { label: 'All tools up front', value: 150000, display: '150,000 tokens' },
          { label: 'Only needed tools', value: 2000, display: '2,000 tokens', highlight: true },
        ],
        format: { suffix: ' tokens' },
        emphasis: true,
        sort: false,
        note: 'One example from an agent that loads tools as code files, not a benchmark of the Claude or ChatGPT apps. The lesson is the direction: fewer tools in context, cheaper and clearer work.',
        source: [
          {
            label: 'Anthropic Engineering: Code execution with MCP (4 Nov 2025)',
            url: 'https://www.anthropic.com/engineering/code-execution-with-mcp',
          },
        ],
        updated: 'Nov 2025',
      },
      workflow: {
        title: 'Worked workflow: connect a tool by its MCP URL, safely',
        input:
          'The MCP server address your tool’s maker publishes, for example https://mcp.example.com/mcp (placeholder).',
        steps: [
          {
            title: 'Add it',
            detail:
              'Claude: Customize > Connectors > Add custom connector, paste the URL, then Add. ChatGPT: Plugins > + > Add custom MCP server, read the risk warning, then Create as a plugin.',
          },
          {
            title: 'Sign in with the narrowest account',
            detail:
              'Choose the sign-in the server offers and read the permission scopes. Use a read-only or test account if the tool has one.',
          },
          {
            title: 'Set each tool’s permission',
            detail:
              'Open the connector, then set read tools to Always allow, and anything that writes, sends or deletes to Needs approval or Blocked.',
          },
          {
            title: 'Test with a question that only reads',
            detail:
              'Ask something you already know the answer to, such as "list my three most recent projects", and compare with the app itself.',
          },
        ],
        output:
          'One new connector that can read without friction, cannot change anything without your click, and is switched on only in the chats that need it.',
      },
    },
  ],
  keyTerms: [
    {
      term: 'Connector',
      meaning:
        'A ready-made link that lets an AI app search, read and act in another app with your login. ChatGPT calls it a plugin; Claude’s own skills and plugins are separate things.',
    },
    {
      term: 'MCP server',
      meaning:
        'The program behind a connector. It lists the tools the AI may call and runs them. MCP is the open standard both Claude and ChatGPT use.',
    },
    {
      term: 'Custom connector',
      meaning:
        'A connector you add yourself by pasting an MCP server URL, for a tool that is not in the official directory.',
    },
    {
      term: 'Tool permission',
      meaning:
        'Whether a single connector tool may run on its own, must ask you first, or is blocked.',
    },
    {
      term: 'Lethal trifecta',
      meaning:
        'Simon Willison’s name for the risky mix: private data, untrusted content and a way to send data out, all in one AI.',
    },
  ],
  videos: [
    {
      youtubeId: '_jjSS0qGFbI',
      title: 'Getting started with connectors in Claude.ai',
      channel: 'Anthropic',
      why: 'Anthropic’s own short walkthrough of connecting apps. The menu may now say Customize instead of Settings; the steps are the same.',
    },
    {
      youtubeId: '5QPBVrAAdBk',
      title: 'Plugins & Skills',
      channel: 'OpenAI',
      why: 'OpenAI’s demo of Gmail and Google Calendar plugins in ChatGPT. Watch how the request names the source and the output, as in workflow 1.',
    },
  ],
  tryIt: {
    title: 'Connect one app and run a read-only question (10 minutes)',
    steps: [
      'Pick the app you copy from most often: Gmail, Google Drive, Notion or Slack.',
      'Connect it in Claude (Customize > Connectors) or ChatGPT (Plugins).',
      'Open its tool list and set anything that sends, shares or deletes to Needs approval or Blocked.',
      'Ask a question you already know the answer to, for example "What did the last email from my manager ask me to do?", and ask for links to sources.',
      'Open each link. If every fact matches, try workflow 1 before your next interview.',
    ],
    link: {
      label: 'Claude Help: Use connectors',
      url: 'https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities',
    },
  },
  check: [
    {
      q: 'You connect Gmail and want the AI to prepare a reply. What is the safest request?',
      options: [
        'Reply to the recruiter for me',
        'Draft a reply, do not send it',
        'Forward the thread to my personal email first',
        'Turn on every connector so it has full context',
      ],
      answer: 1,
      why: 'A draft lets you read and send it yourself. Sending and forwarding are the actions an attacker would want the AI to take.',
    },
    {
      q: 'Why can a stranger’s email be a risk once an AI can read your inbox?',
      options: [
        'Emails use too many tokens',
        'The AI cannot read attachments',
        'The email can contain hidden instructions, and if the AI can also send, it may leak data',
        'Gmail blocks AI tools',
      ],
      answer: 2,
      why: 'This is the lethal trifecta: private data, untrusted content and a way to send data out. Removing one leg, usually the send step, breaks the attack.',
    },
    {
      q: 'You have 12 connectors switched on and answers are getting slower and vaguer. What does Anthropic’s help page suggest?',
      options: [
        'Switch tool access to On demand, and turn off connectors the chat does not need',
        'Write longer prompts',
        'Add a thirteenth connector',
        'Switch to a smaller model',
      ],
      answer: 0,
      why: 'Each connector’s tools take context. On demand loads them only when needed, and switching unused ones off removes them entirely.',
    },
  ],
  sources: [
    {
      label: 'Claude Help: Use connectors to extend Claude’s capabilities',
      url: 'https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities',
    },
    {
      label: 'Claude Help: Use Google Workspace connectors',
      url: 'https://support.claude.com/en/articles/10166901-use-google-workspace-connectors',
    },
    {
      label: 'Claude docs: Gmail connector (describes a read-only version)',
      url: 'https://claude.com/docs/connectors/google/gmail',
    },
    {
      label: 'Claude connectors directory: Gmail (made by Google, added March 2026)',
      url: 'https://claude.com/connectors/gmail',
    },
    {
      label: 'Claude docs: Add a connector that isn’t in the directory',
      url: 'https://claude.com/docs/connectors/custom/remote-mcp',
    },
    { label: 'ChatGPT: Plugins', url: 'https://chatgpt.com/features/plugins/' },
    {
      label: 'OpenAI: Introducing apps in ChatGPT and the new Apps SDK (6 Oct 2025)',
      url: 'https://openai.com/index/introducing-apps-in-chatgpt/',
    },
    { label: 'ChatGPT docs: Plugins', url: 'https://learn.chatgpt.com/docs/plugins' },
    {
      label: 'OpenAI: ChatGPT is now a partner for your most ambitious work (9 Jul 2026)',
      url: 'https://openai.com/index/chatgpt-for-your-most-ambitious-work/',
    },
    {
      label: 'OpenAI plugins changelog (permission controls, 12 Jun 2026)',
      url: 'https://developers.openai.com/plugins/changelog',
    },
    {
      label: 'OpenAI Apps SDK quickstart: add a custom MCP server',
      url: 'https://developers.openai.com/apps-sdk/quickstart',
    },
    {
      label: 'Slack: Slack MCP server',
      url: 'https://docs.slack.dev/ai/slack-mcp-server/',
    },
    { label: 'Notion Help: Notion MCP', url: 'https://www.notion.com/help/notion-mcp' },
    {
      label: 'Model Context Protocol: What is MCP?',
      url: 'https://modelcontextprotocol.io/docs/getting-started/intro',
    },
    {
      label: 'Anthropic Engineering: Code execution with MCP (4 Nov 2025)',
      url: 'https://www.anthropic.com/engineering/code-execution-with-mcp',
    },
    {
      label: 'Simon Willison: The lethal trifecta for AI agents (16 Jun 2025)',
      url: 'https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/',
    },
  ],
  faqs: [
    {
      q: 'Can Claude send emails from my Gmail?',
      a: 'As of 12 Nov 2026, Anthropic’s help centre says the Google Workspace connectors can send, reply to and forward email, asking your approval before each by default, and that the Calendar connector can create events. An older Anthropic docs page still describes Gmail as read-only, so check the tool list on your own connector page.',
    },
    {
      q: 'What happened to connectors in ChatGPT?',
      a: 'ChatGPT first called them connectors. On 6 October 2025 OpenAI launched apps in ChatGPT, built on MCP, and on 9 July 2026 it brought them into one plugins directory. You now add them from Plugins and call one in a chat by typing @ and its name.',
    },
    {
      q: 'Does Claude train on my Gmail, and how do I disconnect a connector?',
      a: 'Anthropic says: "We do not train our models on your Gmail, Drive, or Calendar connector data." On consumer plans, if you opted in to training, chats that quote that content may be used. To disconnect, open Customize > Connectors, select the connector and choose Disconnect. In ChatGPT, uninstall the plugin; a separately connected MCP server stays connected until you disconnect it too.',
    },
  ],
  related: [
    {
      label: 'Previous: AI for Excel and Google Sheets',
      href: '/learn-ai/ai-for-excel-and-google-sheets',
    },
    { label: 'Next: What is an API?', href: '/learn-ai/what-is-an-api' },
    { label: 'What is MCP?', href: '/learn-ai/what-is-mcp' },
    { label: 'What is an agent harness?', href: '/learn-ai/agent-harness' },
    { label: 'Prompt injection and AI security', href: '/learn-ai/prompt-injection' },
    { label: 'Context engineering', href: '/learn-ai/context-engineering' },
    { label: 'Practise the interview: free mock interview', href: '/free-mock-interview' },
  ],
  fromTheSource: [
    {
      who: 'Simon Willison',
      role: 'Co-creator of the Django web framework; named the prompt injection attack in September 2022',
      work: 'The lethal trifecta for AI agents (blog post, 16 June 2025)',
      url: 'https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/',
      idea: 'An AI tool becomes easy to turn against you when it has three things at once: access to your private data, exposure to content an attacker controls, and a way to communicate outside.',
      breakdown: [
        'Private data: the reason you connect Gmail, Drive or Slack in the first place.',
        'Untrusted content: any email, shared doc or web page someone else wrote can carry instructions.',
        'A way out: send, forward, share, post, or even load a link with your data in it.',
        'Telling the AI to ignore instructions inside emails does not hold up reliably, so the fix is to break the set, not to hope the AI notices.',
      ],
      use: 'Before you switch on a connector, ask which of the three it adds. If a chat already reads untrusted mail, keep every send or share tool on approval or blocked.',
    },
  ],
}
