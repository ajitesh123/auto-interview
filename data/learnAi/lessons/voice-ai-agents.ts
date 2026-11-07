import type { Lesson } from '../types'

export const lesson: Lesson = {
  slug: 'voice-ai-agents',
  track: 'build',
  order: 0,
  title: 'How voice AI agents work',
  metaTitle: 'How Do Voice AI Agents Work? A Simple Guide (2026)',
  metaDescription:
    'How voice AI agents work: speech-to-text, LLM and text-to-speech vs realtime models, the latency budget, turn-taking and interruptions, phone calls and tools.',
  h1: 'How do voice AI agents work? A simple explanation',
  tldr: 'A voice AI agent listens, thinks and speaks, and can take actions like booking an appointment. Most are built as a cascade: speech-to-text turns your voice into text, a language model writes the reply and calls tools, and text-to-speech reads it out. Newer speech-to-speech models, such as OpenAI’s Realtime API, do all three in one model. The hard parts are speed (replying in about a second), knowing when you have finished speaking, and stopping politely when you interrupt.',
  minutes: 13,
  level: 'Beginner',
  steps: [
    {
      heading: 'What is a voice AI agent?',
      body: [
        'A voice AI agent is an AI agent you talk to instead of type to. Like any agent, it can use tools: look up an order, check a calendar, send a text message. The difference is that everything happens live, in a conversation, often over a phone call.',
        'You have probably met one already: a support line that understands full sentences, a clinic bot that books slots, or ChatGPT’s and Gemini’s voice modes. AI mock interviews, like the one on this site, use the same building blocks.',
      ],
      bullets: [
        'Customer support: answer common questions, check order status, hand off to a human.',
        'Sales calls: qualify leads and book meetings.',
        'Appointment booking: clinics, salons, service visits.',
        'Practice: mock interviews and cold-call roleplay.',
      ],
    },
    {
      heading: 'The cascade: speech-to-text, LLM, text-to-speech',
      body: [
        'The classic design chains three models. OpenAI’s Agents SDK describes its voice pipeline in exactly these three steps: turn audio into text, run your agent, turn the reply text back into audio. Vapi’s docs describe the same three parts as the transcriber, the model and the voice.',
        'Speech-to-text (STT, also called ASR, automatic speech recognition) writes down what the caller said. The LLM reads that text, decides what to say and which tools to call. Text-to-speech (TTS) turns the reply into a voice. To save time, each part streams: the LLM starts writing before the transcript is final, and TTS starts speaking the first words before the full reply exists.',
      ],
      flow: [
        'Caller speaks',
        'Speech-to-text',
        'LLM thinks and calls tools',
        'Text-to-speech',
        'Caller hears the reply',
      ],
      keyIdea:
        'A cascade lets you pick the best part for each job and read the text in the middle, which helps with logging and safety checks.',
    },
    {
      heading: 'What is a speech-to-speech (realtime) model?',
      body: [
        'A speech-to-speech model takes audio in and gives audio out, with no text step in between. OpenAI launched its Realtime API in October 2024 and made it generally available on 28 August 2025 with the gpt-realtime model, adding phone calling over SIP, remote MCP servers and function calls that can run while the model keeps talking. OpenAI has released newer realtime models since; check its docs for current names.',
        'The upside is natural speech: tone, emphasis and accents survive, and interruptions are handled inside the session. The trade-offs, according to OpenAI’s own voice agent guide and builders who run both, are less control over each step and higher cost. Deepgram’s Voice Agent API and ElevenLabs’ platform sit in between: one connection, with speech-to-text, LLM and text-to-speech run together on their side.',
      ],
      flow: ['Caller speaks', 'One realtime model (audio in, audio out)', 'Caller hears the reply'],
    },
    {
      heading: 'Why is speed so hard? The latency budget',
      body: [
        'Latency is the delay between you stopping talking and the agent starting to reply. In normal conversation people answer fast: the open "Voice AI & Voice Agents" primer (updated June 2026) calls about 500 ms typical, and suggests voice agents aim for 1,500 ms or less voice-to-voice. Vapi’s docs set a tighter target of under 500–700 ms.',
        'Every step spends part of that budget. Here is the primer’s example for a well-tuned cascade:',
      ],
      example: {
        label: 'Example latency budget (from the Voice AI primer)',
        text: 'Speech-to-text + deciding you finished:  300 ms\nLLM time to first token:                 650 ms\nText-to-speech time to first audio:     120 ms\nMicrophone, network, buffers:           the rest\nTotal:                                about 1,293 ms',
        code: true,
      },
      keyIdea:
        'The LLM is usually the biggest slice of the wait, which is why voice agents often use fast, smaller models.',
    },
    {
      heading: 'Turn-taking, voice activity detection and barge-in',
      body: [
        'The agent must guess when you are done. Voice activity detection (VAD) is a small model that hears whether someone is speaking. The simple rule is "reply after a short silence", which OpenAI calls server_vad. But people pause mid-sentence, so OpenAI also offers semantic_vad, which judges from your words whether you finished your thought. LiveKit, Deepgram and ElevenLabs each describe their own turn-detection models for the same job.',
        'Barge-in means you interrupt the agent and it stops talking to listen. That sounds easy, but coughs, background voices and the agent’s own echo can trigger false interruptions. The primer also advises saving only the words the caller actually heard, so the agent does not think it said a sentence that was cut off.',
      ],
      bullets: [
        'Too eager: the agent talks over you.',
        'Too patient: awkward silences.',
        'Good agents tune this per use case, for example waiting longer when someone is reading out a phone number.',
      ],
    },
    {
      heading: 'Phone calls, tools during calls, and the platforms',
      body: [
        'To use a real phone number, the agent connects to the phone network through a telephony provider, usually over SIP (Session Initiation Protocol, the standard for internet phone calls). LiveKit, ElevenLabs, OpenAI’s Realtime API and others support SIP; ElevenLabs also lists a native Twilio integration.',
        'Function calling (tool calling) works as in text agents, but every call adds a wait. The primer suggests saying "one moment, let me check" for slow tools. Retell’s docs list ready-made call actions such as transferring the call, booking a calendar slot and sending an SMS.',
      ],
      bullets: [
        'Speech-to-speech APIs: OpenAI Realtime API.',
        'Hosted voice agent platforms: Vapi, Retell, ElevenLabs Agents (ElevenAgents), Deepgram Voice Agent API.',
        'Open-source frameworks: LiveKit Agents (Python and Node.js, Apache 2.0) and Pipecat (Python, BSD-2, maintained by Daily).',
      ],
      keyIdea:
        'Pick a hosted platform to launch fast, or an open-source framework when you need full control.',
    },
  ],
  keyTerms: [
    {
      term: 'Speech-to-text (STT / ASR)',
      meaning: 'A model that turns spoken audio into written text.',
    },
    {
      term: 'Text-to-speech (TTS)',
      meaning: 'A model that turns written text into a spoken voice.',
    },
    {
      term: 'Speech-to-speech (realtime) model',
      meaning: 'One model that takes audio in and gives audio out, with no separate text step.',
    },
    {
      term: 'Voice activity detection (VAD)',
      meaning:
        'A small model that detects when someone is speaking, used to decide when a turn starts and ends.',
    },
    {
      term: 'Barge-in',
      meaning: 'When the caller interrupts and the agent stops speaking to listen.',
    },
    {
      term: 'SIP',
      meaning:
        'Session Initiation Protocol, the standard used to connect internet voice systems to phone numbers.',
    },
  ],
  videos: [
    {
      youtubeId: '0bt2hRt0dD8',
      title: 'How Voice Agents Work: STT, LLM, TTS, WebRTC & Speech-to-Speech',
      channel: 'Voice AI Space',
      minutes: 12,
      why: 'Walks through the cascade, the audio transport and speech-to-speech models in one go. Watch after step 3.',
    },
  ],
  tryIt: {
    title: 'Stress-test a voice agent in 10 minutes',
    steps: [
      'Open any voice AI you can use, such as the voice mode in the ChatGPT or Gemini app, or the free AI mock interview on this site.',
      'Latency: ask a simple question and count, roughly, how long until it starts speaking.',
      'Turn-taking: start a sentence, pause for two seconds mid-thought ("I worked at... a startup"), and see whether it jumps in too early.',
      'Barge-in: while it is answering, interrupt with "wait, shorter please". Does it stop and adjust?',
      'Write down one thing that felt natural and one that felt robotic, and match each to a step in this lesson.',
    ],
    link: { label: 'Free AI mock interview (voice)', url: '/free-mock-interview' },
  },
  check: [
    {
      q: 'In a cascaded voice agent, what is the correct order?',
      options: [
        'Text-to-speech, LLM, speech-to-text',
        'Speech-to-text, LLM, text-to-speech',
        'LLM, speech-to-text, text-to-speech',
        'Speech-to-text, text-to-speech, LLM',
      ],
      answer: 1,
      why: 'The caller’s audio is transcribed, the LLM writes a reply, and text-to-speech speaks it.',
    },
    {
      q: 'The agent keeps cutting people off when they pause to think. What should you tune first?',
      options: [
        'The text-to-speech voice',
        'Turn detection (VAD settings or a semantic turn model)',
        'The phone number',
        'The size of the knowledge base',
      ],
      answer: 1,
      why: 'Cutting in during pauses is a turn-taking problem. A longer silence threshold or a model that judges whether the thought is finished helps.',
    },
    {
      q: 'Why might a team choose a cascade over a speech-to-speech model?',
      options: [
        'Cascades cannot call tools',
        'Cascades let them read and check the text between steps and swap each part',
        'Speech-to-speech models cannot speak',
        'Cascades never have latency',
      ],
      answer: 1,
      why: 'OpenAI’s voice agent guide notes the chained design lets you inspect or change the text and replace each part, which helps with logs, policy checks and control.',
    },
  ],
  sources: [
    {
      label: 'OpenAI: Introducing the Realtime API (Oct 2024)',
      url: 'https://openai.com/index/introducing-the-realtime-api/',
    },
    {
      label: 'OpenAI: Introducing gpt-realtime and Realtime API updates (Aug 2025)',
      url: 'https://openai.com/index/introducing-gpt-realtime/',
    },
    {
      label: 'OpenAI API docs: Voice agents',
      url: 'https://developers.openai.com/api/docs/guides/voice-agents?voice-agent-architecture=speech-to-speech',
    },
    {
      label: 'OpenAI API docs: Voice activity detection',
      url: 'https://developers.openai.com/api/docs/guides/realtime-vad',
    },
    {
      label: 'OpenAI Agents SDK: Voice quickstart',
      url: 'https://openai.github.io/openai-agents-python/voice/quickstart/',
    },
    {
      label: 'Voice AI & Voice Agents: an illustrated primer (updated June 2026)',
      url: 'https://www.voiceaiandvoiceagents.com',
    },
    { label: 'LiveKit docs: Agents introduction', url: 'https://docs.livekit.io/agents/' },
    {
      label: 'LiveKit blog: Voice agent architecture, STT-LLM-TTS pipelines explained (Feb 2026)',
      url: 'https://livekit.com/blog/voice-agent-architecture-stt-llm-tts-pipelines-explained',
    },
    { label: 'Pipecat docs: Introduction', url: 'https://docs.pipecat.ai/overview/introduction' },
    { label: 'Vapi docs: Introduction', url: 'https://docs.vapi.ai/introduction' },
    { label: 'Retell AI docs: ChatGPT app', url: 'https://docs.retellai.com/get-started/chatgpt' },
    {
      label: 'ElevenLabs docs: ElevenAgents overview',
      url: 'https://elevenlabs.io/docs/eleven-agents/overview',
    },
    {
      label: 'Deepgram docs: Voice agent architecture',
      url: 'https://developers.deepgram.com/docs/voice-agent-architecture',
    },
  ],
  faqs: [
    {
      q: 'How do AI voice agents work?',
      a: 'Most chain three models: speech-to-text turns your voice into text, a language model decides the reply and calls any tools, and text-to-speech speaks it. Some newer models do speech-to-speech in one step. Around this sit turn detection, interruption handling and a phone connection.',
    },
    {
      q: 'What is the difference between a voice agent and an IVR?',
      a: 'An IVR (the old "press 1 for billing" menu) follows fixed paths and keywords. A voice AI agent understands free-form speech, keeps track of the conversation, and can decide which tool to call, such as checking an order or booking a slot.',
    },
    {
      q: 'What is good latency for a voice AI agent?',
      a: 'People typically reply in about half a second. Builders aim for roughly one second or less from when you stop talking to when the agent starts; the Voice AI primer treats 1,500 ms as an upper target and Vapi aims for under 500–700 ms.',
    },
  ],
  related: [
    { label: 'Previous: Evals, does your AI work?', href: '/learn-ai/ai-evals' },
    { label: 'Next: Run an LLM on your laptop', href: '/learn-ai/run-llm-locally' },
    { label: 'Tool calling (function calling)', href: '/learn-ai/tool-calling' },
    { label: 'How AI sees, hears and speaks', href: '/learn-ai/multimodal-ai' },
    { label: 'Voice AI calling: latency, cost per minute and laws', href: '/voice-ai-calling' },
    { label: 'Free AI mock interview', href: '/free-mock-interview' },
    { label: 'GTM engineer guide', href: '/gtm-engineer' },
  ],
  fromTheSource: [
    {
      who: 'OpenAI',
      role: 'Makers of the Realtime API and ChatGPT’s Advanced Voice Mode',
      work: 'Introducing the Realtime API (October 2024)',
      url: 'https://openai.com/index/introducing-the-realtime-api/',
      idea: 'Older voice assistants chained transcription, a text model and text-to-speech, which OpenAI says "often resulted in loss of emotion, emphasis and accents, plus noticeable latency". A single speech-to-speech model streams audio in and out instead.',
      breakdown: [
        'The cascade loses information: tone and emphasis disappear when speech becomes plain text.',
        'Each hand-off between models adds delay.',
        'A realtime session can also handle interruptions and call functions, such as placing an order.',
      ],
      use: 'When you try a voice agent, notice whether it keeps your tone and handles interruptions; that tells you a lot about how it is built.',
    },
    {
      who: 'OpenAI',
      role: 'Maintainers of the OpenAI Agents SDK',
      work: 'Agents SDK voice pipeline and Voice agents guide',
      url: 'https://openai.github.io/openai-agents-python/voice/quickstart/',
      idea: 'Even OpenAI documents both designs: a three-step pipeline (speech-to-text, your agent, text-to-speech) and a realtime speech-to-speech session, each with its own strengths.',
      breakdown: [
        'Chained: inspect the text, run policy checks, and swap any part.',
        'Realtime: one model hears, decides and speaks, and manages turns and interruptions.',
        'Neither is always better; the choice depends on control, cost and naturalness.',
      ],
      use: 'Start with whichever your platform makes easy, then test both on your real calls before committing.',
    },
  ],
}
