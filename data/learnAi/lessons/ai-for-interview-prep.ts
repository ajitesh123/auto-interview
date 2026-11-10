import type { Lesson } from '../types'

export const lesson: Lesson = {
  slug: 'ai-for-interview-prep',
  track: 'use',
  order: 0,
  title: 'Use AI to prepare for interviews',
  metaTitle: 'How to Use AI to Prepare for a Job Interview (With Prompts)',
  metaDescription:
    'How to use ChatGPT or Claude to prepare for a job interview: research, likely questions, STAR answers, voice mock interviews and salary practice, with prompts.',
  h1: 'How to use AI to prepare for a job interview: prompts that work',
  tldr: 'Use AI as a practice partner, not a script writer. It can research the company, decode the job description, predict likely questions, coach your STAR answers, run a mock interview by voice and play a tough recruiter for salary practice. Do not use it during a live interview unless the employer allows it, never paste confidential information, and never let it invent experience you do not have.',
  minutes: 12,
  level: 'Beginner',
  steps: [
    {
      heading: 'Research the company and decode the job description',
      body: [
        'Start by understanding what the employer actually wants. Paste the job description and ask the AI to separate must-have skills from nice-to-haves, and to translate jargon into plain English. Then compare it with your resume to find gaps you should be ready to talk about.',
        'For company research, switch on web search so it can find recent news, and ask for links. AI can give outdated or incomplete details, so Yale’s career office advises double-checking anything you will repeat in the interview against the company’s own site and reputable news.',
      ],
      example: {
        label: 'Copy this: decode the job description',
        text: `Here is a job description for a [role] at [company]:
"""
[paste job description]
"""
Here is my resume:
"""
[paste resume, with phone number and address removed]
"""
1. List the 5 most important skills this job needs, in plain English.
2. For each, say whether my resume shows it: yes, partly or no.
3. For every "partly" or "no", suggest which of my real experiences I could talk about. Do not invent anything.
4. Search the web for this company’s news from the last 6 months and give me 3 points worth mentioning, with links.`,
      },
    },
    {
      heading: 'Generate the questions you are likely to face',
      body: [
        'Ask for questions in three groups: behavioural (“Tell me about a time…”), role-specific or technical, and questions about this company. Kean University’s career office suggests aiming to understand the topics rather than memorising answers, because you will never get the exact list.',
        'Also ask for good questions to ask the interviewer. It is an easy part to prepare and shows you have done your homework.',
      ],
      example: {
        label: 'Copy this: likely questions',
        text: `Based on the job description above, list:
- 6 behavioural questions this interviewer is likely to ask
- 6 role-specific or technical questions, from easy to hard
- 3 questions about why I want this company
- 4 smart questions I can ask the interviewer
For each interview question, add one line on what the interviewer is really checking.`,
      },
      keyIdea: 'Prepare for topics, not exact questions.',
    },
    {
      heading: 'Draft your answers with STAR, then ask for feedback',
      body: [
        'STAR is a simple structure for “tell me about a time” questions: Situation, Task, Action, Result. The University of Washington’s career centre suggests roughly 20 percent on the situation, 10 percent on the task, 60 percent on your actions and 10 percent on the result, using “I” and a number where you can.',
        'Write the first draft yourself. Anthropic gives its own candidates the same advice: draft first, then use Claude to refine. A model that writes from scratch produces generic stories, or worse, experiences you never had. Paste your rough answer and ask for feedback, not a replacement.',
      ],
      example: {
        label: 'Copy this: STAR feedback',
        text: `Here is my answer to "Tell me about a time you handled a difficult customer":
"""
[your own rough answer]
"""
Act as an interview coach. Do not rewrite it.
1. Label which parts are Situation, Task, Action and Result.
2. Tell me what is missing or too long.
3. Ask me 2 questions that would help me add a specific number or detail.
Only use facts I have given you.`,
      },
    },
    {
      heading: 'Run a mock interview, ideally out loud',
      body: [
        'Real interviews are spoken, so practise speaking. ChatGPT Voice is available to logged-in free users with a daily limit; tap the voice icon in the app and paste a setup prompt first. Google’s free Interview Warmup lets you answer questions aloud, shows a transcript and highlights job-related terms and words you repeat. Our free AI mock interview asks role-specific questions and gives feedback on pace, structure and delivery.',
        'Tell the AI to ask one question at a time, follow up like a real interviewer, and save the feedback for the end, so the practice feels like the real thing.',
      ],
      example: {
        label: 'Copy this: voice mock interview',
        text: `You are a friendly but demanding interviewer at [company] hiring a [role]. Interview me for 15 minutes.
Rules: ask one question at a time, wait for my answer, and ask one follow-up if my answer is vague. Mix behavioural and role-specific questions.
At the end, give me: a score out of 10, my two strongest answers, my two weakest answers with a better structure for each, and any filler words I overused.`,
      },
    },
    {
      heading: 'Practise the salary conversation',
      body: [
        'Negotiation is a skill, and AI is a safe sparring partner. Ask it to play a recruiter who pushes back, so you can rehearse saying your number calmly. Berkeley Haas negotiation lecturer Holly Schroth tested ChatGPT’s salary advice and found specific, single questions in one thread gave the most useful answers.',
        'Her study also found its salary ranges were often very wide and unreliable, and it missed company-specific norms. So get the number from real data such as recent offers, salary sites and people in the role, and use the AI for practice, not for the figure.',
      ],
      example: {
        label: 'Copy this: salary role-play',
        text: `Role-play a recruiter at [company] who has just offered me [amount] for a [role] in [city]. My research says [range], and I want [target].
Push back realistically: mention budget limits and ask about my current salary. Keep each reply short.
After 6 exchanges, stop and tell me where I sounded unsure, where I gave away too much, and one better line for each.`,
      },
    },
    {
      heading: 'What not to do with AI',
      body: [
        'Do not use AI during a live interview unless the employer says you can. Anthropic’s own hiring rules allow Claude for research and practice, but for live interviews they say “This is all you–no AI assistance unless we indicate otherwise.” If an employer has not said AI is allowed, assume it is not.',
        'Do not paste confidential information, such as a current employer’s code, client names or internal numbers. In ChatGPT you can switch off “Improve the model for everyone” in Data Controls, and Temporary Chats are not used for training. Above all, never let AI invent skills, projects or results. Interviewers ask follow-ups, and invented stories fall apart.',
      ],
      bullets: [
        'No AI in live interviews or take-home tests unless the employer allows it',
        'No confidential or personal data from your current job',
        'No invented experience, numbers or certificates',
        'No memorised scripts: know your stories, speak them naturally',
      ],
      keyIdea: 'AI helps you rehearse. The interview itself has to be you.',
    },
  ],
  keyTerms: [
    {
      term: 'STAR method',
      meaning:
        'A way to answer “tell me about a time” questions: Situation, Task, Action, Result. Most of the time goes on Action.',
    },
    {
      term: 'Behavioural question',
      meaning:
        'A question about how you handled a real past situation, used to predict how you will act in the job.',
    },
    {
      term: 'Mock interview',
      meaning: 'A practice interview, with a person or an AI, followed by feedback.',
    },
    {
      term: 'Temporary Chat',
      meaning:
        'A ChatGPT mode whose chats are not used for model training and are deleted from OpenAI’s systems within 30 days.',
    },
    {
      term: 'Role-play prompt',
      meaning:
        'A prompt that asks the AI to act as someone, such as an interviewer or recruiter, so you can practise a conversation.',
    },
  ],
  videos: [
    {
      youtubeId: '99iAKsXHy_o',
      title: 'ChatGPT Interview Preparation: From Research to Salary Negotiation',
      channel: 'Coursera',
      minutes: 12,
      why: 'Coursera walks through using ChatGPT as an interview coach, from company research to salary negotiation. Pause after each part and run the matching prompt from this lesson.',
    },
  ],
  tryIt: {
    title: 'A 10-minute AI mock interview',
    steps: [
      'Find one real job post you would apply for.',
      'Open ChatGPT, Claude or Gemini and run the “decode the job description” prompt with the post and your resume (personal details removed).',
      'Pick the behavioural question it predicts you will find hardest. Write a rough STAR answer yourself, then use the STAR feedback prompt.',
      'Switch to voice, paste the mock interview prompt, and answer three questions out loud.',
      'Write down your two weakest answers and practise them once more tomorrow, or try a full session on our free mock interview page.',
    ],
    link: { label: 'Free AI mock interview', url: '/free-mock-interview' },
  },
  check: [
    {
      q: 'In a STAR answer, which part should take most of your time?',
      options: ['Situation', 'Task', 'Action', 'Result'],
      answer: 2,
      why: 'The University of Washington suggests about 60 percent on Action: the specific steps you personally took.',
    },
    {
      q: 'You want help with an answer about a project. What is the best way to use AI?',
      options: [
        'Ask it to write a strong answer from scratch',
        'Write a rough draft yourself and ask for feedback using only your real facts',
        'Ask it to add some impressive numbers',
        'Copy a sample answer from the internet and ask AI to polish it',
      ],
      answer: 1,
      why: 'Your own draft keeps the story true and yours. Anthropic gives its own candidates the same advice: draft first, then refine with Claude.',
    },
    {
      q: 'Which use of AI is usually not acceptable?',
      options: [
        'Researching the company before the interview',
        'Running a voice mock interview the night before',
        'Getting hidden AI answers during a live video interview',
        'Practising salary negotiation with a role-play',
      ],
      answer: 2,
      why: 'Live interviews test you. Unless the employer says AI is allowed, hidden help breaks the rules of the interview.',
    },
  ],
  sources: [
    {
      label: 'Anthropic: How to collaborate with Claude during our hiring process',
      url: 'https://www.anthropic.com/candidate-ai-guidance',
    },
    {
      label: 'University of Washington Career Center: STAR method of interviewing',
      url: 'https://careers.uw.edu/resources/star-method-of-interviewing/',
    },
    {
      label: 'Yale SOM Career Development: How to use AI for interview prep (Jan 2025)',
      url: 'https://cdo.som.yale.edu/blog/2025/01/24/how-to-use-ai-for-interview-prep/',
    },
    {
      label:
        'Kean University Career Services: Tips for using AI to prepare for job interviews (Feb 2026)',
      url: 'https://career.kean.edu/blog/2026/02/12/tips-for-using-ai-to-prepare-for-job-interviews/',
    },
    {
      label:
        'California Management Review (Feb 2023): Hey ChatGPT, can you help me negotiate my salary?',
      url: 'https://cmr.berkeley.edu/2023/02/hey-chatgpt-can-you-help-me-negotiate-my-salary/',
    },
    { label: 'OpenAI Help: ChatGPT Voice', url: 'https://help.openai.com/articles/8400625' },
    {
      label: 'OpenAI Help: Data controls FAQ',
      url: 'https://help.openai.com/en/articles/7730893-data-controls-faq',
    },
    {
      label: 'Grow with Google: Interview Warmup (official page)',
      url: 'https://grow.google/interview-warmup',
    },
    {
      label: '9to5Google: Google Interview Warmup',
      url: 'https://9to5google.com/2022/05/17/google-interview-warmup/',
    },
    {
      label: 'TechRadar: How to use ChatGPT to prepare for a job interview (Mar 2025)',
      url: 'https://www.techradar.com/computing/artificial-intelligence/how-to-use-chatgpt-to-prepare-for-a-job-interview',
    },
    {
      label: 'Coursera: How to use ChatGPT to prepare for an interview (video)',
      url: 'https://www.coursera.org/articles/how-to-use-chatgpt-to-prepare-for-an-interview-video',
    },
  ],
  faqs: [
    {
      q: 'Can I use ChatGPT to prepare for a job interview?',
      a: 'Yes. Use it to decode the job description, research the company with web search, predict likely questions, get feedback on your STAR answers and run a mock interview by voice. Check company facts against official sources and keep every story true.',
    },
    {
      q: 'Is it cheating to use AI in a job interview?',
      a: 'Using AI to prepare is normal. Using it secretly during a live interview or take-home test is usually treated as cheating unless the employer says AI is allowed. Anthropic, for example, allows Claude for interview prep but not in live interviews unless it says otherwise.',
    },
    {
      q: 'What is the best prompt for a mock interview?',
      a: 'Give it a role (“interviewer at [company] hiring a [role]”), rules (one question at a time, follow up on vague answers) and the feedback you want at the end (a score, your strongest and weakest answers, a better structure for the weak ones). Use voice mode if you can.',
    },
  ],
  related: [
    { label: 'Previous: ChatGPT vs Claude vs Gemini', href: '/learn-ai/choosing-an-ai-model' },
    { label: 'Next: AI for data analysis', href: '/learn-ai/ai-for-data-analysis' },
    { label: 'Free AI mock interview', href: '/free-mock-interview' },
    { label: 'Interview questions by role', href: '/interview-questions' },
    { label: 'Behavioural interview questions', href: '/interview-questions/behavioral' },
    { label: 'Free CV templates', href: '/cv-templates' },
    { label: 'Salary calculator', href: '/salary-calculator' },
    { label: 'AI product manager guide', href: '/aipm' },
    { label: 'AI engineer guide', href: '/ai-engineer' },
  ],
  fromTheSource: [
    {
      who: 'Anthropic',
      role: 'The company that makes Claude. It published rules for how its own job candidates may use Claude at each stage of hiring.',
      work: 'How to collaborate with Claude during our hiring process (candidate guidance)',
      url: 'https://www.anthropic.com/candidate-ai-guidance',
      idea: 'An AI company drew a clear line: use Claude to prepare and to polish your own work, but not to replace you. Applications should start as your own draft, and live interviews are “all you” unless they say otherwise.',
      breakdown: [
        'Applications: write the first draft yourself, then use Claude to refine it. Letting AI create experiences gives generic content you have not lived.',
        'Interview prep: fine to use Claude to research the company, practise answers and prepare questions.',
        'Take-home tests and live interviews: no AI unless the company explicitly allows it.',
      ],
      use: 'Follow the same rule everywhere unless an employer says otherwise: AI before the interview to prepare, no AI during it.',
    },
    {
      who: 'Holly Schroth',
      role: 'Senior Lecturer and Distinguished Teaching Fellow at UC Berkeley’s Haas School of Business, who teaches negotiation.',
      work: 'Hey ChatGPT, can you help me negotiate my salary? (California Management Review, February 2023)',
      url: 'https://cmr.berkeley.edu/2023/02/hey-chatgpt-can-you-help-me-negotiate-my-salary/',
      idea: 'She put hundreds of salary-negotiation questions to ChatGPT and concluded it is a useful study aid when you ask specific, single questions in one thread, but it should not replace real salary data or advice from practitioners.',
      breakdown: [
        'Broad questions got generic advice; specific follow-ups got practical, usable answers.',
        'Its salary ranges were often very wide and unreliable, and ignored experience.',
        'It missed company-specific norms and deeper strategy, such as knowing your walk-away point.',
      ],
      use: 'Use AI to rehearse the conversation and sharpen your wording. Get the actual number from real offers, salary data and people who work there.',
    },
  ],
}
