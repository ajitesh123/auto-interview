import type { Lesson } from '../types'

export const lesson: Lesson = {
  slug: 'first-prompt',
  track: 'use',
  order: 7,
  title: 'Your first prompt',
  metaTitle: 'How to Use ChatGPT, Claude and Gemini: Your First Prompt',
  metaDescription:
    'How to use ChatGPT, Claude and Gemini for free: sign up, write your first prompt, plan a study week, rewrite a resume bullet and follow up for better answers.',
  h1: 'Your first prompt: how to talk to ChatGPT, Claude and Gemini',
  tldr: 'A prompt is simply the message you type to an AI chatbot. Open any free one (ChatGPT, Claude or Gemini), describe your task the way you would brief a smart new colleague, then keep talking: correct it, add details and ask for changes. Treat the first answer as a draft, not the final word.',
  minutes: 9,
  level: 'Beginner',
  steps: [
    {
      heading: 'Which chatbot should I open first?',
      body: [
        'Any of the big three is fine for your first try, and all three have a free plan. What you learn here works the same way in every one of them, so do not spend long choosing. You can compare them properly later in the lesson on choosing a model.',
        'ChatGPT lets you try it without an account, but while logged out you get one conversation at a time and your chat history is not saved. Claude asks every new user to verify a phone number with a six-digit text code. Gemini is free with a Google account, so if you have Gmail you are already set.',
      ],
      bullets: [
        'ChatGPT: chatgpt.com (log in to save your chats)',
        'Claude: claude.ai (sign up, then verify your phone number)',
        'Gemini: gemini.google.com (your Google account)',
        'All three also have free Android and iPhone apps',
      ],
      keyIdea: 'Pick one and start. Prompting skills carry over to every chatbot.',
    },
    {
      heading: 'What is a prompt, really?',
      body: [
        'A prompt is the text you send. The model reads only what is in front of it and writes the most useful reply it can from that. It does not know your exam date, your city or your job unless you tell it.',
        'Anthropic, the company behind Claude, puts it well: treat the model like a brilliant but new employee who lacks context on how you work. Google’s Gemini guide suggests thinking about four things: who the AI should act as (persona), what you want done (task), your situation (context) and how the answer should look (format). You rarely need all four, but two or three make a big difference.',
      ],
      flow: [
        'Persona: who it should be',
        'Task: what to do',
        'Context: your situation',
        'Format: how the answer looks',
      ],
      keyIdea: 'If a smart stranger would be confused by your message, the AI will be too.',
    },
    {
      heading: 'A first useful task: plan your study week',
      body: [
        'Let’s try something real. Most first prompts are short and vague, so the answer comes back generic. Google found that the most successful prompts in its tests averaged around 21 words, which is longer than most people type.',
        'Compare the two prompts below. The second one takes 30 seconds more to write and gets you a plan you can actually use.',
      ],
      example: {
        label: 'Weak prompt vs strong prompt',
        text: `Weak:
Make me a study plan.

Strong:
I’m a final-year B.Com student preparing for the CA Foundation exam in 6 weeks. I can study 3 hours on weekdays (7–10 pm) and 6 hours on Sundays. My weakest subject is Quantitative Aptitude.

Make a study plan for this week only. Give more time to Quant, include one revision slot and one full mock test, and keep Saturday evening free.

Show it as a table with columns: Day, Time, Subject, Topic.`,
      },
    },
    {
      heading: 'Don’t stop at the first answer: follow up',
      body: [
        'The real skill is the second and third message. OpenAI’s own guide says good prompting usually takes a few rounds: look at the answer, then adjust. You do not need to rewrite your whole prompt. Just reply in the same chat, like you would to a person.',
        'If the plan is too packed, say so. If you are not sure what to add, ask the AI to ask you questions first. It remembers everything earlier in the same conversation, so short follow-ups work well.',
      ],
      bullets: [
        '“Too much. Cut Sunday to 4 hours and move the mock test to Sunday morning.”',
        '“Swap Wednesday’s topic with something lighter, I have college till 6.”',
        '“Before you redo it, ask me 3 questions that would make this plan better.”',
        '“Turn this into a checklist I can paste into Google Keep.”',
      ],
      example: {
        label: 'Illustrative follow-up and reply',
        text: `You: Good, but I lose focus after 90 minutes. Add 10-minute breaks and make Friday a light day.

AI: Here’s the updated plan. I split each weekday into two 80-minute blocks with a 10-minute break, and moved Friday’s Accounts topic to a short 60-minute revision so the day stays light...`,
      },
      keyIdea: 'Treat the first answer as a draft. The follow-ups are where it gets good.',
    },
    {
      heading: 'A second task: rewrite a resume bullet',
      body: [
        'Rewriting is one of the best everyday uses for a chatbot, because you supply the facts and it supplies the polish. Give it your real bullet, the job you are applying for and any numbers you have.',
        'One rule: never let it invent results. A chatbot will happily add “increased sales by 40%” if you do not stop it, and that number would be made up. Tell it to use only the facts you gave, and to ask if something is missing. The lesson on hallucinations explains why this happens.',
      ],
      example: {
        label: 'Weak prompt vs strong prompt',
        text: `Weak:
Make this resume line better: "Handled social media for college fest."

Strong:
I’m applying for a marketing intern role. Rewrite this resume bullet in 3 versions, each under 25 words, starting with a strong action verb:
"Handled social media for college fest."

Facts you can use: Instagram, 6 weeks, team of 4, followers went from 1,200 to 3,100, fest had about 5,000 visitors.
Use only these facts. If a number would help but I haven’t given it, ask me instead of guessing.`,
      },
      keyIdea: 'Let AI polish your facts. Never let it supply them.',
    },
  ],
  keyTerms: [
    { term: 'Prompt', meaning: 'The message or instruction you type to an AI chatbot.' },
    {
      term: 'Chatbot',
      meaning:
        'An app like ChatGPT, Claude or Gemini where you talk to an AI model by typing or speaking.',
    },
    {
      term: 'Context',
      meaning:
        'Background the AI needs to help you: who you are, your situation, your deadline, your limits.',
    },
    {
      term: 'Follow-up',
      meaning:
        'A reply in the same chat that corrects or refines the last answer, instead of starting over.',
    },
    {
      term: 'Free tier',
      meaning: 'The no-cost plan of a chatbot. It works well for learning but has usage limits.',
    },
  ],
  videos: [
    {
      youtubeId: 'EWvNQjAaOHw',
      title: 'How I use LLMs',
      channel: 'Andrej Karpathy',
      minutes: 131,
      why: 'A former OpenAI researcher shows how he uses chatbots day to day. The first 20 minutes alone will change how you talk to them.',
    },
    {
      youtubeId: 'p09yRj47kNM',
      title: "Google's 9 Hour AI Prompt Engineering Course In 20 Minutes",
      channel: 'Tina Huang',
      minutes: 20,
      why: 'A quick, friendly summary of Google’s beginner prompting course, with simple frameworks you can use right away.',
    },
  ],
  tryIt: {
    title: 'Plan your real week in 10 minutes',
    steps: [
      'Open ChatGPT, Claude or Gemini on your phone or laptop.',
      'Write a prompt about your actual week: your goal (exam, job search, a side project), the hours you have, one thing you struggle with, and ask for a table.',
      'Read the plan and send two follow-ups: one correction (“too much on Tuesday”) and one change of format (“make it a checklist”).',
      'Now ask: “What questions would help you make this plan better?” Answer them and get a final version.',
      'Save the final plan somewhere you will see it, and notice how much better it is than the first answer.',
    ],
    link: { label: 'Open ChatGPT (free)', url: 'https://chatgpt.com' },
  },
  check: [
    {
      q: 'You type “make me a diet plan” and get a generic answer. What is the most useful next step?',
      options: [
        'Switch to a different chatbot',
        'Add your details: goal, food preferences, budget, schedule, and the format you want',
        'Type the same prompt again',
        'Pay for a premium plan',
      ],
      answer: 1,
      why: 'The model only knows what you tell it. Adding context and a format fixes most generic answers, on any chatbot, free or paid.',
    },
    {
      q: 'Why should you tell a chatbot to “use only these facts” when rewriting a resume?',
      options: [
        'It makes the answer shorter',
        'Chatbots cannot read numbers',
        'Otherwise it may invent results, like a sales figure you never achieved',
        'It is required by the free plan',
      ],
      answer: 2,
      why: 'Chatbots tend to fill gaps with plausible details. On a resume, a made-up number is a real problem in an interview.',
    },
    {
      q: 'The first answer is close but not right. What does good prompting usually look like?',
      options: [
        'Start a brand-new chat each time',
        'Reply in the same chat with specific changes, a few times if needed',
        'Accept the first answer, the AI knows best',
        'Write one very long perfect prompt and never edit it',
      ],
      answer: 1,
      why: 'Iterating is normal. The chatbot remembers the earlier conversation, so short, specific follow-ups improve the result quickly.',
    },
  ],
  fromTheSource: [
    {
      who: 'OpenAI',
      role: 'The company that released ChatGPT on November 30, 2022, the launch that brought AI chatbots to the general public.',
      work: 'Introducing ChatGPT (blog post, November 30, 2022)',
      url: 'https://openai.com/index/chatgpt/',
      idea: 'OpenAI explained that the chat format lets the model answer follow-up questions, admit its mistakes, challenge incorrect premises and reject inappropriate requests. The same post was frank about its limits: it can write plausible-sounding but wrong answers, and it is sensitive to how a question is phrased.',
      breakdown: [
        'Follow-ups are the point: the product was designed for a conversation, not a single perfect question.',
        'Phrasing matters: OpenAI noted the model might claim not to know an answer, then answer correctly after a small rephrase.',
        'It guesses instead of asking: OpenAI said that ideally it would ask clarifying questions when a request is unclear, but it usually guesses what you meant.',
        'Long-winded answers were a known habit, so asking for a length or format is normal, not fussy.',
      ],
      use: 'Give the details up front so it does not have to guess. If the answer misses, rephrase or correct it in the same chat, and when your request is vague, ask it to ask you questions first.',
    },
    {
      who: 'Andrej Karpathy',
      role: 'A founding member of OpenAI and former director of AI at Tesla, who walks through how he uses chatbots in daily life.',
      work: 'How I use LLMs (video, 2025)',
      url: 'https://www.youtube.com/watch?v=EWvNQjAaOHw',
      idea: 'Karpathy describes a chatbot as a lossy “zip file” of the internet: knowledge frozen at a training cutoff, plus a working memory that holds only the current chat. His everyday habits follow from that picture, such as starting a new chat for a new topic and checking anything that matters.',
      breakdown: [
        'Compressed knowledge: it recalls common things well and rare things vaguely, like a blurry copy.',
        'Frozen in time: it knows nothing after its training cutoff unless it can search the web.',
        'Working memory: the chat so far is all it is looking at. Old, unrelated messages can distract it, so a new topic deserves a new chat.',
        'Know your model: free plans and logged-out use may run smaller, less capable models than paid plans.',
      ],
      use: 'Open a fresh chat for each new task, give it the details it cannot know, and turn on web search for anything recent. Then check names, numbers and dates yourself.',
    },
  ],
  sources: [
    {
      label: 'OpenAI Help: How can I use ChatGPT without an account?',
      url: 'https://help.openai.com/articles/9125172',
    },
    {
      label: 'OpenAI Help: Prompt engineering best practices for ChatGPT',
      url: 'https://help.openai.com/en/articles/10032626-prompt-engineering-best-practices-for-chatgpt',
    },
    {
      label: 'Claude Help Center: Verifying your phone number',
      url: 'https://support.claude.com/en/articles/8287232-verifying-your-phone-number',
    },
    {
      label: 'Google Gemini: Plans and subscriptions',
      url: 'https://gemini.google/subscriptions/',
    },
    {
      label: 'Google Workspace: Writing effective prompts',
      url: 'https://workspace.google.com/intl/en_ie//resources/ai/writing-effective-prompts/',
    },
    {
      label: 'Google: Gemini for Google Workspace Prompting Guide 101 (PDF)',
      url: 'https://services.google.com/fh/files/misc/gemini-for-google-workspace-prompting-guide-101.pdf',
    },
    {
      label: 'Anthropic: Prompting best practices (be clear and direct)',
      url: 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/be-clear-and-direct',
    },
    {
      label: 'OpenAI (Nov 30, 2022): Introducing ChatGPT',
      url: 'https://openai.com/index/chatgpt/',
    },
    {
      label: 'Andrej Karpathy (YouTube): How I use LLMs',
      url: 'https://www.youtube.com/watch?v=EWvNQjAaOHw',
    },
    {
      label: 'Analytics Vidhya: This is how Andrej Karpathy uses LLMs (summary of the talk)',
      url: 'https://www.analyticsvidhya.com/?p=225252',
    },
  ],
  faqs: [
    {
      q: 'Is ChatGPT free to use?',
      a: 'Yes. ChatGPT, Claude and Gemini all have free plans with usage limits. ChatGPT even works without an account, though logged out you get one conversation at a time and no saved history. Paid plans add more usage and stronger models.',
    },
    {
      q: 'What should I ask ChatGPT first?',
      a: 'Start with a real task from your week: a study plan, a polite email to a landlord or recruiter, or a rewrite of a resume bullet. Real tasks show you quickly where the AI helps and where you need to add detail.',
    },
    {
      q: 'How do I write a good prompt for ChatGPT, Claude or Gemini?',
      a: 'Say what you want done, give your situation (goal, limits, audience), and say how the answer should look, such as a table or three short options. Then follow up in the same chat to fix anything that is off.',
    },
  ],
  related: [
    { label: 'Next: Prompting techniques that work', href: '/learn-ai/prompt-engineering' },
    { label: 'Why AI makes things up', href: '/learn-ai/ai-hallucinations' },
    { label: 'ChatGPT vs Claude vs Gemini', href: '/learn-ai/choosing-an-ai-model' },
    { label: 'Free AI skills resources', href: '/free-resources#ai-skills' },
    { label: 'Practise with a free AI mock interview', href: '/free-mock-interview' },
  ],
}
