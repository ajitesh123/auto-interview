import type { Lesson } from '../types'

export const lesson: Lesson = {
  slug: 'run-llm-locally',
  track: 'build',
  order: 0,
  title: 'Open models: run an LLM on your laptop',
  metaTitle: 'How to Run an LLM Locally: Ollama and LM Studio Guide',
  metaDescription:
    'How to run an LLM locally for free: open-weight vs closed models, RAM and quantization made simple, first steps in Ollama and LM Studio, and models to try.',
  h1: 'How to run an LLM locally on your laptop (Ollama and LM Studio)',
  tldr: 'Open-weight models like Gemma, gpt-oss, Llama, Qwen, DeepSeek and Mistral can be downloaded and run on your own computer, so your chats stay on your machine and work without internet once the model is downloaded. The two easiest tools are Ollama (one install command, then "ollama run") and LM Studio (a desktop app with a chat window). The main limit is memory: aim for 16 GB of RAM, start with a small model, and use a 4-bit quantized version.',
  minutes: 13,
  level: 'Beginner',
  steps: [
    {
      heading: 'Open-weight vs closed models: what is the difference?',
      body: [
        'A model’s weights are the billions of numbers it learned in training. With a closed model, like the ones behind ChatGPT, Claude or Gemini, the weights stay on the company’s servers; you use the model through an app or API. With an open-weight model, the company publishes the weights so anyone can download and run them.',
        'Licences differ. OpenAI’s gpt-oss models use the permissive Apache 2.0 licence. Google DeepMind calls Gemma "a family of open-weights" models. Meta’s Llama comes with its own licence file, which Meta says covers researchers and commercial use. "Open-weight" is not always the same as fully open source, so read the licence before building a product.',
      ],
      keyIdea:
        'Open-weight means you can download the model and run it yourself, under the terms of its licence.',
    },
    {
      heading: 'Why run a model on your own computer?',
      body: [
        'Privacy is the big one. Ollama’s FAQ says it runs locally and "conversation data does not leave your machine". That matters for a CV with your phone number, company documents or medical notes.',
        'Other reasons: it works offline once the model is downloaded, there is no per-message fee, and you learn how models really behave. The trade-off is honest: a model that fits on a laptop is smaller and usually less capable than the top cloud models, and it can be slow on older hardware.',
      ],
      bullets: [
        'Good for: private notes, summarising your own files, offline use, learning and tinkering.',
        'Not ideal for: hard reasoning, long research, or anything needing the newest facts.',
      ],
    },
    {
      heading: 'How much RAM do you need? Quantization explained',
      body: [
        'A model must fit in memory to run. RAM is your computer’s main memory; VRAM is the separate memory on a graphics card (GPU), which runs models much faster. Apple Silicon Macs share one pool, called unified memory. LM Studio’s system requirements (as of Nov 2026) advise 16 GB of RAM or more; 8 GB Macs can work with small models, and on Windows at least 4 GB of dedicated VRAM is suggested.',
        'Quantization makes models smaller by storing each number with fewer bits, like saving a photo as a smaller JPEG. LM Studio’s docs describe quantized files as copies of the same model at different fidelity: smaller files, slightly lower quality. Its advice is to pick a 4-bit option or higher if your machine can run it.',
      ],
      example: {
        label: 'Rough size of an 8-billion-parameter model (weights only)',
        text: '16-bit:  8 billion x 2 bytes   = about 16 GB\n8-bit:   8 billion x 1 byte    = about 8 GB\n4-bit:   8 billion x 0.5 bytes = about 4 GB\n(Leave extra room for your apps and the conversation.)',
        code: true,
      },
      keyIdea:
        'Parameters times bits decides the size. A 4-bit version is usually the sweet spot for laptops.',
    },
    {
      heading: 'Your first run with Ollama',
      body: [
        'Ollama is a free, open-source tool that downloads and runs models from the command line, with a desktop app on Mac and Windows. Install it with the official command below, or download the app from ollama.com. Then run a small model; Ollama’s quickstart uses Gemma 4’s e2b version, about a 7.2 GB download, and recommends 8 GB of available VRAM or Mac unified memory.',
        'Type your message and press Enter. Type /bye to quit. The command "ollama ps" shows whether the model is running on your GPU or CPU. Note that Ollama also offers cloud models when you sign in; those run on Ollama’s servers, not your laptop, so pick a local model when privacy matters.',
      ],
      example: {
        label: 'Install and run (commands from Ollama’s official README and quickstart)',
        code: true,
        text: '# macOS or Linux\ncurl -fsSL https://ollama.com/install.sh | sh\n\n# Windows (PowerShell)\nirm https://ollama.com/install.ps1 | iex\n\n# Chat with a small model\nollama run gemma4:e2b\n\n# See what is loaded, and where\nollama ps',
      },
    },
    {
      heading: 'Prefer buttons? Your first run with LM Studio',
      body: [
        'LM Studio is a desktop app with a chat window, so you never touch a terminal. As of Nov 2026 it runs on Apple Silicon Macs (not Intel Macs), Windows x64 and ARM, and Linux.',
        'Its built-in downloader pulls models from Hugging Face, the largest public hub of open models; you can search by name or paste a Hugging Face link.',
      ],
      flow: [
        'Install LM Studio',
        'Discover tab: search a model',
        'Pick a 4-bit (Q4) file that fits',
        'Chat tab: load the model',
        'Chat offline',
      ],
    },
    {
      heading: 'Which open models should you try in 2026?',
      body: [
        'New open models arrive every month, so treat this as a starting list as of Nov 2026. Start small, check it runs smoothly, then move up.',
      ],
      bullets: [
        'Gemma 4 (Google DeepMind): open-weights family; the small e2b version is Ollama’s quickstart model.',
        'gpt-oss (OpenAI, August 2025, Apache 2.0): gpt-oss-20b runs within 16 GB of memory; gpt-oss-120b needs a single 80 GB GPU.',
        'Llama (Meta): Llama 3.2 has small 1B and 3B models; Llama 4 Scout and Maverick (April 2025) are much larger.',
        'Qwen (Alibaba), DeepSeek and Mistral: popular families with many sizes, all listed in Ollama’s library.',
        'Mixture-of-experts models list two sizes. Memory follows the total (Llama 4 Scout: 109B total, about 54.5 GB at 4-bit) even though only 17B run per token.',
      ],
      example: {
        label: 'Try OpenAI’s open model if you have 16 GB or more',
        code: true,
        text: 'ollama run gpt-oss:20b',
      },
    },
  ],
  keyTerms: [
    {
      term: 'Open-weight model',
      meaning:
        'A model whose trained weights are published, so you can download and run it yourself under its licence.',
    },
    {
      term: 'Parameters',
      meaning:
        'The numbers inside a model learned during training; more parameters usually means more capable but larger.',
    },
    {
      term: 'RAM / VRAM',
      meaning:
        'RAM is your computer’s main memory; VRAM is the faster memory on a graphics card. The model has to fit in them.',
    },
    {
      term: 'Quantization',
      meaning:
        'Storing a model’s numbers with fewer bits (for example 4-bit) to make it smaller and faster, with a small loss in quality.',
    },
    {
      term: 'Ollama',
      meaning:
        'A free, open-source tool to download and run open models from the command line or its app.',
    },
    {
      term: 'Hugging Face',
      meaning:
        'The largest public website for sharing open models and datasets; LM Studio downloads from it.',
    },
  ],
  videos: [
    {
      youtubeId: '5RIOQuHOihY',
      title: 'What is Ollama? Running Local LLMs Made Simple',
      channel: 'IBM Technology',
      minutes: 7,
      why: 'Cedric Clyburn shows how Ollama runs models on your own machine and why that helps privacy and cost. Watch before step 4.',
    },
  ],
  tryIt: {
    title: 'Chat with an AI that never leaves your laptop',
    steps: [
      'Check your memory: on Windows, Task Manager, then Performance; on a Mac, Apple menu, then About This Mac.',
      'Install Ollama from ollama.com (or LM Studio from lmstudio.ai if you prefer an app).',
      'Run "ollama run gemma4:e2b" and wait for the download to finish (about 7.2 GB).',
      'Turn off Wi-Fi and ask: "Explain quantization to a 12-year-old in 3 sentences." It still answers, because the model is on your computer.',
      'Run "ollama ps" in a second terminal and note whether it says GPU or CPU. If replies are very slow, try a smaller model or close other apps.',
    ],
    link: {
      label: 'Ollama on GitHub (install and quickstart)',
      url: 'https://github.com/ollama/ollama',
    },
  },
  check: [
    {
      q: 'What does "open-weight" mean?',
      options: [
        'The model is free to use in a browser',
        'The trained weights are published so you can download and run the model',
        'The model has no licence',
        'The model is lighter than 1 GB',
      ],
      answer: 1,
      why: 'Open-weight means the weights are downloadable. The licence still sets what you may do with them.',
    },
    {
      q: 'Roughly how much memory do the weights of an 8-billion-parameter model need at 4-bit?',
      options: ['About 0.5 GB', 'About 4 GB', 'About 16 GB', 'About 64 GB'],
      answer: 1,
      why: '8 billion parameters times half a byte each is about 4 GB, before the extra room needed for the conversation and your other apps.',
    },
    {
      q: 'You want your chats to stay completely on your machine. In Ollama, what should you avoid?',
      options: [
        'Local models',
        'The ollama ps command',
        'Cloud models that run on Ollama’s servers',
        'Small models',
      ],
      answer: 2,
      why: 'Ollama now offers cloud models when you sign in. Those run on remote servers. Local models keep conversation data on your machine.',
    },
  ],
  sources: [
    {
      label: 'Ollama on GitHub: README and install commands',
      url: 'https://github.com/ollama/ollama',
    },
    {
      label: 'Ollama docs: Quickstart',
      url: 'https://github.com/ollama/ollama/blob/main/docs/quickstart.mdx',
    },
    { label: 'Ollama docs: FAQ', url: 'https://github.com/ollama/ollama/blob/main/docs/faq.md' },
    {
      label: 'Ollama docs: Importing models',
      url: 'https://github.com/ollama/ollama/blob/main/docs/import.mdx',
    },
    { label: 'LM Studio docs: Get started', url: 'https://lmstudio.ai/docs/app/basics' },
    {
      label: 'LM Studio docs: System requirements',
      url: 'https://lmstudio.ai/docs/app/system-requirements',
    },
    {
      label: 'LM Studio docs: Download a model',
      url: 'https://lmstudio.ai/docs/app/basics/download-model',
    },
    { label: 'OpenAI gpt-oss on GitHub', url: 'https://github.com/openai/gpt-oss' },
    { label: 'Google DeepMind Gemma on GitHub', url: 'https://github.com/google-deepmind/gemma' },
    { label: 'Meta Llama models on GitHub', url: 'https://github.com/meta-llama/llama-models' },
    { label: 'Qwen team on GitHub', url: 'https://github.com/QwenLM' },
  ],
  faqs: [
    {
      q: 'Can I run an LLM on a laptop with 8 GB of RAM?',
      a: 'Yes, with small models. LM Studio says 8 GB Macs can work if you stick to smaller models and modest context sizes, and Ollama’s quickstart model gemma4:e2b recommends about 8 GB of VRAM or Mac unified memory. 16 GB gives you far more choice.',
    },
    {
      q: 'Is Ollama free and safe?',
      a: 'Ollama is free and open source. Its FAQ says local conversation data does not leave your machine. It needs internet to download models, and its optional cloud models run on Ollama’s servers, so choose local models for private work.',
    },
    {
      q: 'Ollama or LM Studio: which should a beginner use?',
      a: 'If you are comfortable typing one command, Ollama is quick and also works as a local API for your own apps. If you want a normal app with buttons and a chat window, start with LM Studio. Both run the same kinds of open models.',
    },
  ],
  related: [
    { label: 'Previous: How voice AI agents work', href: '/learn-ai/voice-ai-agents' },
    { label: 'Next: Your first AI automation in n8n', href: '/learn-ai/n8n-ai-automation' },
    { label: 'ChatGPT vs Claude vs Gemini', href: '/learn-ai/choosing-an-ai-model' },
    {
      label: 'Mixture of experts: total vs active parameters',
      href: '/learn-ai/mixture-of-experts',
    },
    { label: 'Tokens and context windows', href: '/learn-ai/tokens-and-context-window' },
    { label: 'Prompting vs RAG vs fine-tuning', href: '/learn-ai/fine-tuning-vs-rag' },
    { label: 'AI engineer career guide', href: '/ai-engineer' },
    { label: 'Free AI skills resources', href: '/free-resources#ai-skills' },
  ],
  fromTheSource: [
    {
      who: 'OpenAI',
      role: 'Maker of ChatGPT, which also publishes the open-weight gpt-oss models',
      work: 'gpt-oss (model release and GitHub repository, August 2025)',
      url: 'https://github.com/openai/gpt-oss',
      idea: 'Two open-weight reasoning models under the Apache 2.0 licence: gpt-oss-120b for heavy work on one 80 GB GPU, and gpt-oss-20b for local use within 16 GB of memory.',
      breakdown: [
        'Mixture-of-experts: gpt-oss-20b has 21B parameters but only 3.6B are active for each token, which keeps it fast.',
        'The weights ship already quantized (MXFP4), which is why 20B fits in 16 GB.',
        'Apache 2.0 lets you use and modify it commercially without copyleft rules.',
      ],
      use: 'If your laptop has 16 GB or more, run "ollama run gpt-oss:20b" and compare its answers with a cloud chatbot on the same question.',
    },
    {
      who: 'Meta',
      role: 'Maker of the Llama family of open-weight models',
      work: 'Llama models repository (Llama 3.1 to Llama 4)',
      url: 'https://github.com/meta-llama/llama-models',
      idea: 'Meta publishes Llama weights in many sizes, from 1B and 3B models (Llama 3.2) that fit small machines to Llama 4 Scout and Maverick, under its own licence for researchers and commercial use.',
      breakdown: [
        'Sizes matter: the 1B and 3B models are small enough for ordinary laptops.',
        'Bigger versions need far more memory but answer better.',
        'The licence is Meta’s own, so check it before using Llama in a product.',
      ],
      use: 'Pick the smallest size that answers your kind of question well, and only move up when it clearly falls short.',
    },
  ],
}
