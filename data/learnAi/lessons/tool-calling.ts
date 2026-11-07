import type { Lesson } from '../types'

export const lesson: Lesson = {
  slug: 'tool-calling',
  track: 'build',
  order: 12,
  title: 'Tool calling (function calling)',
  metaTitle: 'What Is Tool Calling? Function Calling in LLMs Explained',
  metaDescription:
    'What is tool calling (function calling) in AI? See how a model asks your code to run a function like get_weather, step by step, with real JSON and safety tips.',
  h1: 'What is tool calling (function calling) in AI?',
  tldr: 'Tool calling, also called function calling, lets an AI model ask your code to run a function, like get_weather or book_slot. The model never runs your code itself: it replies with the function’s name and inputs, your app runs it, and you send the result back so the model can finish its answer. This is how chatbots check live data and take actions.',
  minutes: 9,
  level: 'Beginner',
  steps: [
    {
      heading: 'Why does a model need tools at all?',
      body: [
        'A language model only knows what was in its training data, and it can only produce text. On its own it cannot check today’s weather in Chennai, your PNR status, or your calendar.',
        'Tool calling fixes this. You give the model a short list of tools it may use. When a question needs one, the model writes a neat, structured request: "please run get_weather with city = Chennai". Your code does the real work and hands back the result.',
        'Think of a manager on a phone call who cannot leave the desk. She tells her assistant, "check how many boxes are in godown 2". The assistant checks and reports back, and she uses that number in her reply.',
      ],
      keyIdea:
        'The model chooses the tool and fills in the inputs. Your code does the actual work.',
    },
    {
      heading: 'How do you describe a tool to the model?',
      body: [
        'Each tool has three parts: a name, a plain-English description of when to use it, and a schema listing its inputs. The schema uses JSON Schema, a standard way to say "this input is text, this one is a number, this one is required".',
        'The model reads the name and description to decide when to call the tool, so write them as if for a new intern. OpenAI’s guide even suggests an "intern test": could a person use this function correctly with only what you gave the model?',
      ],
      example: {
        label: 'A tool definition (Anthropic format)',
        code: true,
        text: '{\n  "name": "get_weather",\n  "description": "Get the current weather for a city.",\n  "input_schema": {\n    "type": "object",\n    "properties": {\n      "location": {\n        "type": "string",\n        "description": "City and country, e.g. Pune, India"\n      }\n    },\n    "required": ["location"]\n  }\n}',
      },
      bullets: [
        'Use clear names and detailed descriptions.',
        'Keep the list short. OpenAI suggests fewer than 20 tools at the start of a turn.',
        'Use fixed choices (enums) where you can, like "celsius" or "fahrenheit".',
        'Don’t make the model fill in things your code already knows, like the user’s ID.',
      ],
    },
    {
      heading: 'What happens, step by step?',
      body: [
        'OpenAI’s docs describe five steps, and Anthropic and Google work the same way. You send the question plus the tool list. The model replies with a tool call instead of an answer. Your code runs the function. You send the result back in a second request. The model then writes the final answer, or asks for another tool.',
        'The model can also decide that no tool is needed. Ask "what is 2 + 2?" and it will just answer.',
      ],
      flow: [
        'User asks a question',
        'Model picks a tool and inputs',
        'Your code runs the function',
        'Result goes back to the model',
        'Model writes the answer',
      ],
    },
    {
      heading: 'What does a tool call look like?',
      body: [
        'With Claude, the model’s reply contains a "tool_use" block with an id, the tool name and the inputs. Your code runs the function and replies with a "tool_result" that carries the same id, so the model knows which call the result belongs to.',
        'OpenAI calls the same thing a "function_call" with a "call_id" and "arguments" (a JSON string your code must parse). Gemini calls it a function call too. Different field names, same idea.',
      ],
      example: {
        label: 'Model asks, your app answers',
        code: true,
        text: '// Model to your app\n{\n  "type": "tool_use",\n  "id": "toolu_01A09q90qw90lq917835lq9",\n  "name": "get_weather",\n  "input": { "location": "Pune, India" }\n}\n\n// Your app to model\n{\n  "type": "tool_result",\n  "tool_use_id": "toolu_01A09q90qw90lq917835lq9",\n  "content": "31°C, clear sky"\n}',
      },
    },
    {
      heading: 'What can go wrong, and how do you stay safe?',
      body: [
        'Models sometimes pick the wrong tool or fill in a wrong value, like the wrong city or an amount with an extra zero. Your code is the last line of defence, so check every input before acting on it.',
        'Some tools only read (get_weather). Others change things in the world (send_email, make_payment, delete_file). Treat those with extra care.',
      ],
      bullets: [
        'Validate inputs in code: right type, sensible range, user allowed to do this.',
        'Ask the user to confirm before anything costly or hard to undo.',
        'Give each tool the least access it needs, such as read-only database access.',
        'Log every tool call so you can see what happened later.',
      ],
      keyIdea:
        'Tool calling turns a chatbot into something that can act. Next you will see MCP, a standard way to share tools across apps, and agents, which call tools in a loop.',
    },
  ],
  keyTerms: [
    {
      term: 'Tool calling (function calling)',
      meaning:
        'Two names for the same thing: the model asks your app to run a named function with specific inputs.',
    },
    {
      term: 'Tool definition',
      meaning:
        'The name, description and input schema you send so the model knows a tool exists and how to use it.',
    },
    {
      term: 'JSON Schema',
      meaning:
        'A standard way to describe the shape of JSON data: which fields exist, their types, and which are required.',
    },
    {
      term: 'Tool result',
      meaning:
        'The output of the function, which your app sends back to the model so it can continue.',
    },
    {
      term: 'Client tool vs server tool',
      meaning:
        'A client tool runs in your app. A server tool, such as Anthropic’s web search, runs on the provider’s own servers.',
    },
  ],
  videos: [
    {
      youtubeId: 'h8gMhXYAv1k',
      title: 'What is Tool Calling? Connecting LLMs to Your Data',
      channel: 'IBM Technology',
      minutes: 5,
      why: 'A whiteboard walk-through of the request, tool call and result loop. Focus on who runs the tool at each step.',
    },
  ],
  tryIt: {
    title: 'Play the part of the code in any chatbot',
    steps: [
      'Open ChatGPT, Claude or Gemini and start a new chat.',
      'Paste this: "You can use one tool: get_weather(city). When you need it, reply ONLY with JSON like {"tool": "get_weather", "city": "..."} and wait. I will reply with the result. Do not guess the weather."',
      'Ask: "Should I carry an umbrella in Mumbai today?" The model should reply with only the JSON tool call. That is a tool call.',
      'Now act as your code. Reply: "RESULT: 27°C, heavy rain expected after 4 pm". Watch the model use your result to answer.',
      'Ask "What is the capital of France?" and notice that it answers directly without calling the tool. Then read the official guide below to see the real version.',
    ],
    link: {
      label: 'OpenAI function calling guide',
      url: 'https://developers.openai.com/api/docs/guides/function-calling',
    },
  },
  check: [
    {
      q: 'A user asks for the weather and the model returns a get_weather tool call. Who actually runs get_weather?',
      options: [
        'The model, inside its own servers',
        'Your application code',
        'The user, by hand',
        'Nobody, the model guesses the weather',
      ],
      answer: 1,
      why: 'For tools you define, the model only writes the request. Your app runs the function and sends back the result. (Provider-run server tools like web search are the exception.)',
    },
    {
      q: 'Why should a tool have a clear, detailed description?',
      options: [
        'It makes the API call cheaper',
        'The model uses the name and description to decide when and how to call it',
        'It is shown to the user as an advert',
        'Descriptions are required by law',
      ],
      answer: 1,
      why: 'The model only knows what you tell it. A vague description leads to wrong or missed tool calls.',
    },
    {
      q: 'Your code has run the function and has a result. What happens next?',
      options: [
        'Show the raw result to the user and stop',
        'Send the result back to the model in a new request so it can write the answer',
        'Retrain the model with the result',
        'Delete the conversation',
      ],
      answer: 1,
      why: 'The tool result goes back to the model, tied to the same call id. The model then answers, or asks for another tool.',
    },
  ],
  fromTheSource: [
    {
      who: 'Timo Schick, Jane Dwivedi-Yu and colleagues, mostly at Meta AI Research',
      role: 'Authors of Toolformer, one of the first papers to show a language model learning by itself when to call outside tools.',
      work: 'Toolformer: Language Models Can Teach Themselves to Use Tools (paper, 2023)',
      url: 'https://arxiv.org/abs/2302.04761',
      idea: 'The paper starts from a puzzle: big language models can learn new tasks from a few examples, yet they slip on simple things like arithmetic or looking up a fact, where much smaller tools do well. Toolformer trains a model to decide which API to call, when to call it and what inputs to pass, using only a handful of examples per tool.',
      breakdown: [
        'The six tools were a calculator, a question-answering system, two search engines, a translation system and a calendar.',
        'The model tried tool calls on ordinary text. A call was kept for training only if its result made the following words easier to predict.',
        'With tools, it often did as well as much larger models on the tested tasks, without getting worse at ordinary writing.',
      ],
      use: 'Give the model tools for the jobs it is weak at: exact maths, today’s date, live facts and your own data. Let the model write the text, and let your tools supply the facts.',
    },
    {
      who: 'Atty Eleti, Jeff Harris and Logan Kilpatrick (OpenAI)',
      role: 'Authors of the June 2023 post that launched function calling in the OpenAI API, the pattern most AI APIs now follow.',
      work: 'Function calling and other API updates (blog post, June 2023)',
      url: 'https://openai.com/index/function-calling-and-other-api-updates/',
      idea: 'Developers describe functions to the model, and the model can choose to reply with a JSON object holding the inputs for one of them. The post says this lets developers "more reliably get structured data back from the model."',
      breakdown: [
        'Functions were described with JSON Schema, the same format you saw in this lesson’s tool definition.',
        'Examples in the post: turn a request to email someone into a send_email call, a weather question into get_current_weather, or a question about orders into a database query.',
        'It also warned that text coming back from a tool can try to steer the model. It advised using only trusted tools and asking the user to confirm actions like sending email or buying something.',
      ],
      use: 'Use tool calling even when you just need clean structured data, like pulling names and dates out of a message. And copy the 2023 safety advice: confirm with the user before any tool that acts in the real world.',
    },
  ],
  sources: [
    {
      label: 'OpenAI docs: Function calling',
      url: 'https://developers.openai.com/api/docs/guides/function-calling',
    },
    {
      label: 'Anthropic docs: Tool use overview',
      url: 'https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview',
    },
    {
      label: 'Google Gemini API docs: Function calling',
      url: 'https://ai.google.dev/gemini-api/docs/function-calling',
    },
    {
      label: 'IBM Think: What is tool calling?',
      url: 'https://www.ibm.com/think/topics/tool-calling',
    },
    {
      label: 'Schick et al. (2023), Toolformer: Language Models Can Teach Themselves to Use Tools',
      url: 'https://arxiv.org/abs/2302.04761',
    },
    {
      label: 'OpenAI: Function calling and other API updates (June 2023)',
      url: 'https://openai.com/index/function-calling-and-other-api-updates/',
    },
  ],
  faqs: [
    {
      q: 'What is the difference between tool calling and function calling?',
      a: 'There is no real difference. OpenAI’s docs say function calling is "also known as tool calling", and Anthropic’s docs call it tool use. All of these mean the model asks your code to run a named function with specific inputs.',
    },
    {
      q: 'Does the LLM execute the function itself?',
      a: 'No. For tools you define, the model only returns the function name and inputs. Your application runs the code and sends the result back. Some providers also offer server tools, like web search, that they run on their own servers.',
    },
    {
      q: 'What is the difference between tool calling and MCP?',
      a: 'Tool calling is how a model asks for a function to be run. MCP (Model Context Protocol) is a standard way to package tools and data so any AI app that supports MCP can discover and use them. MCP tools still reach the model through tool calling.',
    },
  ],
  related: [
    { label: 'Previous: What is an API?', href: '/learn-ai/what-is-an-api' },
    { label: 'What is MCP?', href: '/learn-ai/what-is-mcp' },
    { label: 'What is an AI agent?', href: '/learn-ai/ai-agents' },
    { label: 'AI engineer career guide', href: '/ai-engineer' },
    { label: 'Free AI skills resources', href: '/free-resources#ai-skills' },
  ],
}
