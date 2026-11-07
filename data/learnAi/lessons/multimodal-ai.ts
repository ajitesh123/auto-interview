import type { Lesson } from '../types'

export const lesson: Lesson = {
  slug: 'multimodal-ai',
  track: 'foundations',
  order: 0,
  title: 'How AI sees, hears and speaks',
  metaTitle: 'What Is Multimodal AI? How AI Sees, Hears and Speaks',
  metaDescription:
    'Multimodal AI explained simply: how ChatGPT and Claude read photos, how voice mode hears and speaks, and how diffusion models turn noise into images and video.',
  h1: 'What is multimodal AI? How AI sees, hears, speaks and makes images',
  tldr: 'Multimodal AI is AI that works with more than one kind of input or output: text, images, audio and video. It sees by cutting a picture into small patches and turning each into tokens, hears by turning speech into text or audio tokens, and speaks with text-to-speech or a single speech-to-speech model. Image and video generators mostly use diffusion: they start from random noise and remove it step by step until a picture that matches your prompt appears.',
  minutes: 12,
  level: 'Beginner',
  steps: [
    {
      heading: 'What does “multimodal” mean?',
      body: [
        'A modality is a type of information: text, images, sound or video. Early chatbots were text-only. Multimodal AI can take in several types and often produce several too, so you can photograph a maths problem, speak a question or ask for a picture.',
        'The trick is the same everywhere: turn every kind of input into tokens, the small chunks a model works with (see the tokens lesson). Once a photo or a sound clip is tokens, the same transformer that handles text can handle it, and can connect what it sees with what you typed.',
      ],
      flow: [
        'Photo, voice or text',
        'Turned into tokens',
        'One model reasons over all of it',
        'Text, speech or image out',
      ],
      keyIdea:
        'Multimodal AI turns pictures and sound into tokens, so one model can reason across all of them.',
    },
    {
      heading: 'How does AI see? Images become patches',
      body: [
        'A 2020 Google paper titled “An Image is Worth 16x16 Words” showed that you can cut an image into small square patches and feed them to a transformer like words in a sentence. Claude’s documentation describes the same idea: images are processed in 28 by 28 pixel patches, so a 1000 by 1000 photo costs about 1,296 tokens.',
        'To link pictures with words, OpenAI’s CLIP (2021) learned from about 400 million image and caption pairs from the internet, by guessing which caption goes with which image. That is how a model learns that a photo of a dosa and the word “dosa” mean the same thing.',
        'What it is good at: reading handwriting and whiteboards, explaining charts, describing screenshots, solving a photographed question. Where it slips: tiny or blurry images, exact counts of many small objects, and precise positions. Claude also refuses to name people in photos and cannot tell whether an image is AI-generated.',
      ],
      example: {
        label: 'Whiteboard photo to clean notes',
        text: 'Upload: a phone photo of today’s lecture whiteboard\nPrompt: “Turn this whiteboard into clean study notes with headings. Write [unclear] wherever you cannot read a word. Then give me 3 quiz questions on it.”',
      },
    },
    {
      heading: 'How does AI hear and speak?',
      body: [
        'Speech-to-text turns your voice into words. OpenAI’s Whisper (September 2022) was trained on 680,000 hours of audio in many languages, which made it robust to accents and background noise. Text-to-speech does the reverse and reads text out in a natural voice.',
        'Early voice assistants chained three models: speech-to-text, then a text model, then text-to-speech. OpenAI says its old ChatGPT Voice Mode took 2.8 to 5.4 seconds on average to reply and lost tone of voice, background sounds and who was speaking. In May 2024, GPT-4o handled text, images and audio in one model and could reply to speech in about 320 milliseconds on average, close to human conversation speed. Models that take audio in and give audio out directly are called speech-to-speech or realtime models.',
      ],
      flow: ['Old way: Speech-to-text', 'Text model', 'Text-to-speech'],
      example: {
        label: 'Voice mode today (Nov 2026)',
        text: 'Claude: tap the sound wave icon next to the microphone. Available on all plans, including Free, and works best on your phone.\nChatGPT: voice chats are on every plan (limited on Free), and paid plans add voice with video.\nGemini: Gemini Live is included free.',
      },
    },
    {
      heading: 'How does AI make images and video? Diffusion, simply',
      body: [
        'Many image generators are built on an idea called diffusion. During training, you take real pictures and add random noise to them, a little at a time, until they are pure static, like an old TV with no signal. The model learns to undo one step of noise at a time.',
        'To make a new image, you start from pure static and let the model remove the noise step by step, guided by your text prompt, until a clear picture appears. It is like a sculptor who starts with a rough block and chips away until the statue matches the description. A 2021 paper showed you can do this in a compressed version of the image, which made it far cheaper, and used attention to follow the text prompt.',
        'Video works on the same idea across many frames. Google’s Veo 3 (May 2025) generates video together with sound, and Veo 3.1 followed in October 2025. ChatGPT Images 2.0 (April 2026) can plan before it draws and writes text inside images more accurately, with gains in Hindi and Bengali.',
      ],
      flow: [
        'Random noise',
        'Remove a little noise (guided by your prompt)',
        'Repeat many times',
        'Finished image',
      ],
      keyIdea:
        'Diffusion models do not paste photos together. They learn to turn noise into a picture that fits your words.',
    },
    {
      heading: 'Using multimodal AI well (and safely)',
      body: [
        'Good input makes good output. Send clear, well-lit photos, crop to what matters but keep the context, and say exactly what you want back. For voice, a quiet room helps. For images, describe the subject, style, layout and any text you want, then ask for changes one at a time.',
        'Check before you trust. AI can misread a blurry digit on a bill or a word on a board. Do not upload ID cards, medical reports or other people’s photos unless you are comfortable with that app’s privacy terms, and never use image or voice tools to imitate a real person.',
      ],
      bullets: [
        'Ask it to mark anything it cannot read instead of guessing',
        'Ask for a table when extracting numbers from a photo, then spot-check two or three',
        'Treat generated images as illustrations, not evidence of real events',
      ],
    },
  ],
  keyTerms: [
    {
      term: 'Multimodal AI',
      meaning:
        'AI that can take in or produce more than one type of data, such as text, images, audio and video.',
    },
    {
      term: 'Vision (image input)',
      meaning:
        'A model’s ability to read and reason about images you upload. The image is cut into patches that become tokens.',
    },
    {
      term: 'Speech-to-text',
      meaning:
        'Turning spoken audio into written words. Also called automatic speech recognition (ASR).',
    },
    {
      term: 'Text-to-speech',
      meaning: 'Turning written text into spoken audio in a natural-sounding voice.',
    },
    {
      term: 'Speech-to-speech (realtime) model',
      meaning:
        'A model that takes audio in and gives audio out directly, which is faster and keeps tone of voice.',
    },
    {
      term: 'Diffusion model',
      meaning:
        'An image or video generator that starts from random noise and removes it step by step, guided by your prompt.',
    },
  ],
  videos: [
    {
      youtubeId: 'J51oZYcNvP8',
      title: 'What is Multimodal AI? How LLMs Process Text, Images, and More',
      channel: 'IBM Technology',
      minutes: 10,
      why: 'Martin Keen explains, on a whiteboard, how models add vision with an encoder versus being built multimodal from the start. Good for steps 1 and 2.',
    },
    {
      youtubeId: 'iv-5mZ_9CPY',
      title: 'But how do AI images and videos actually work? | Guest video by Welch Labs',
      channel: '3Blue1Brown',
      minutes: 37,
      why: 'The clearest visual explanation of CLIP and diffusion. If short on time, watch from 2:22 (CLIP) to about 17:30 (diffusion basics).',
      start: 142,
    },
  ],
  tryIt: {
    title: 'Three senses in ten minutes: see, hear and draw',
    steps: [
      'See: take a photo of a page of your notes, a whiteboard or a bill. Upload it to Claude, ChatGPT or Gemini and ask: “Turn this into clean notes. Write [unclear] wherever you cannot read something.” Check three details against the photo.',
      'Hear and speak: on your phone, open the Claude or ChatGPT app and start voice mode. Ask it to quiz you on those notes out loud. Try interrupting it mid-answer and see how it handles that.',
      'Draw: in ChatGPT or Gemini, ask for “a simple poster for a college coding club with the words ‘Code Club Tuesday 5 pm’ in English and Hindi”. Check whether the text is spelled correctly.',
      'Ask the same tool: “Explain in 3 sentences how you made that image.” Compare its answer with the diffusion steps in this lesson.',
    ],
    link: { label: 'Open Gemini (free)', url: 'https://gemini.google.com' },
  },
  check: [
    {
      q: 'How does a multimodal model “see” an uploaded photo?',
      options: [
        'It looks the photo up on Google Images',
        'It cuts the image into small patches and turns them into tokens the model can process',
        'A human describes it first',
        'It reads only the file name',
      ],
      answer: 1,
      why: 'Images are split into patches (Claude uses 28 by 28 pixel patches), each turned into tokens, so the same transformer can reason over pictures and text together.',
    },
    {
      q: 'Why are single speech-to-speech models better for voice chat than chaining three models?',
      options: [
        'They are cheaper to train',
        'They reply faster and keep information like tone of voice that is lost when speech is turned into plain text',
        'They do not need any training data',
        'They only work in English',
      ],
      answer: 1,
      why: 'In the old pipeline the main model only saw text, so tone and background were lost and replies took seconds. GPT-4o replied in about 320 milliseconds on average with one model.',
    },
    {
      q: 'What does a diffusion model do when it creates an image?',
      options: [
        'Copies and blends existing photos from the internet',
        'Starts from random noise and removes it step by step, guided by the prompt',
        'Draws the image line by line like a pen',
        'Searches a database of stock images',
      ],
      answer: 1,
      why: 'Diffusion models learn to reverse the process of adding noise. To generate, they start from static and denoise step by step toward an image that matches your text.',
    },
  ],
  sources: [
    {
      label: 'Dosovitskiy et al. (2020): An Image is Worth 16x16 Words (Vision Transformer)',
      url: 'https://arxiv.org/abs/2010.11929',
    },
    {
      label:
        'Radford et al. (2021): Learning Transferable Visual Models From Natural Language Supervision (CLIP)',
      url: 'https://arxiv.org/abs/2103.00020',
    },
    {
      label: 'Claude Docs: Vision',
      url: 'https://platform.claude.com/docs/en/build-with-claude/vision',
    },
    {
      label: 'OpenAI (Sept 21, 2022): Introducing Whisper',
      url: 'https://openai.com/index/whisper/',
    },
    { label: 'OpenAI (May 13, 2024): Hello GPT-4o', url: 'https://openai.com/index/hello-gpt-4o/' },
    {
      label: 'OpenAI (Aug 28, 2025): Introducing gpt-realtime',
      url: 'https://openai.com/index/introducing-gpt-realtime/',
    },
    {
      label: 'Claude Help Center: Use voice mode',
      url: 'https://support.claude.com/en/articles/11101966-use-voice-mode',
    },
    {
      label: 'ChatGPT pricing (voice and image features by plan, Nov 2026)',
      url: 'https://chatgpt.com/pricing',
    },
    {
      label: 'Google: Gemini subscriptions (features by plan, Nov 2026)',
      url: 'https://gemini.google/subscriptions/',
    },
    {
      label: 'Ho, Jain and Abbeel (2020): Denoising Diffusion Probabilistic Models',
      url: 'https://arxiv.org/abs/2006.11239',
    },
    {
      label: 'Rombach et al. (2021): High-Resolution Image Synthesis with Latent Diffusion Models',
      url: 'https://arxiv.org/abs/2112.10752',
    },
    {
      label: '9to5Google: Google Veo guide (version history)',
      url: 'https://9to5google.com/guides/google-veo/',
    },
    {
      label: 'eWeek (Apr 2026): OpenAI debuts ChatGPT Images 2.0',
      url: 'https://www.eweek.com/news/openai-chatgpt-images-2-0/',
    },
    {
      label: 'University of Southampton: What is multimodal AI?',
      url: 'https://www.online.southampton.ac.uk/blog/what-is-multimodal-ai',
    },
    {
      label: 'StartupHub.ai: IBM Master Inventor explains multimodal AI (video summary)',
      url: 'https://www.startuphub.ai/ai-news/artificial-intelligence/2026/ibm-master-inventor-explains-multimodal-ai',
    },
    {
      label: 'Podwise: chapters of “But how do AI images and videos actually work?”',
      url: 'https://podwise.ai/episodes/5073016',
    },
  ],
  faqs: [
    {
      q: 'What is an example of multimodal AI?',
      a: 'Uploading a photo of a maths problem to ChatGPT or Claude and getting a worked solution is multimodal: image in, text out. Talking to Gemini Live or Claude’s voice mode (audio in, audio out) and asking ChatGPT to make a poster (text in, image out) are also examples.',
    },
    {
      q: 'Is ChatGPT multimodal?',
      a: 'Yes. ChatGPT can read images and files, hold voice conversations, and generate images. Claude can read images and documents and has voice mode. Gemini can read images, hold voice chats with Gemini Live and generate images, with video generation on paid plans.',
    },
    {
      q: 'What is the difference between multimodal AI and generative AI?',
      a: 'Generative AI creates new content, like text or images. Multimodal AI works with more than one type of data. Many tools are both, such as a chatbot that reads your photo and writes an answer, but a model that only reads images and labels them is multimodal without being generative.',
    },
  ],
  related: [
    { label: 'Previous: Reasoning models and thinking', href: '/learn-ai/reasoning-models' },
    { label: 'Next: Your first prompt', href: '/learn-ai/first-prompt' },
    { label: 'Tokens and context windows', href: '/learn-ai/tokens-and-context-window' },
    { label: 'How voice AI agents work', href: '/learn-ai/voice-ai-agents' },
    { label: 'Why AI makes things up', href: '/learn-ai/ai-hallucinations' },
    { label: 'Free AI resources', href: '/free-resources#ai-skills' },
  ],
  fromTheSource: [
    {
      who: 'OpenAI (the GPT-4o team)',
      role: 'Built GPT-4o, a single model for text, images and audio',
      work: 'Hello GPT-4o (announcement, May 2024)',
      url: 'https://openai.com/index/hello-gpt-4o/',
      idea: 'OpenAI trained one model end to end across text, vision and audio, so the same network handles every input and output. The “o” stands for “omni”.',
      breakdown: [
        'Before, voice mode chained three models, and the main model only ever saw text.',
        'That lost tone, laughter, background noise and who was speaking, and replies took seconds.',
        'One model hearing audio directly could reply in about 320 milliseconds on average, close to human conversation.',
      ],
      use: 'In voice mode you can interrupt, change your mind mid-sentence or ask it to slow down, just as you would with a person. Use it to practise interview answers out loud or to quiz yourself on notes.',
    },
    {
      who: 'Jonathan Ho, Ajay Jain and Pieter Abbeel',
      role: 'Authors of the 2020 paper that made diffusion models produce high-quality images',
      work: 'Denoising Diffusion Probabilistic Models (paper, 2020)',
      url: 'https://arxiv.org/abs/2006.11239',
      idea: 'They showed that a model trained to remove noise from images, one small step at a time, can generate new high-quality pictures, reaching a “state-of-the-art FID score of 3.17” on a standard image test.',
      breakdown: [
        'Training: add noise to real images bit by bit, and teach the model to undo each step.',
        'Generating: start from pure noise and run the undo step many times.',
        'Later work added text prompts and ran the process on a compressed image, which led to today’s text-to-image tools.',
      ],
      use: 'When an image comes out wrong, small prompt changes help because each generation starts from fresh noise. Generate a few versions, pick the closest one, then ask for one change at a time.',
    },
  ],
}
