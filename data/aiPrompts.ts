import type { AiPromptDef } from '@/components/ai/AiPrompt'

// Ready prompts a candidate can open in Claude or ChatGPT. Written for the role, with the rules a
// good coach would set: ask before assuming, never invent facts, one step at a time.
// Keep each under ~1,500 characters (they travel in a link).

interface RoleLike {
  roleName: string // "Data Analyst"
  shortName: string
}

const kw = (terms?: string[]) =>
  terms && terms.length
    ? ` Use these keywords only where they are true for me: ${terms.slice(0, 10).join(', ')}.`
    : ''

export function resumePrompt(r: RoleLike, keywords?: string[]): AiPromptDef {
  return {
    id: 'resume',
    title: `Rewrite my resume for the ${r.shortName} role`,
    why: 'Paste the job description and your current resume when it asks.',
    prompt: `You are a recruiter who screens ${r.roleName} resumes all day. Help me rewrite my resume (CV) for the job below.

Rules:
- First ask me for the job description and my current resume. Wait for both.
- Keep every fact true. If a bullet has no number, ask me for one. Never invent numbers, employers or tools.
- One page. Each bullet: action verb + what I did + the result with a number.
- Put the most relevant experience for a ${r.roleName} first.${kw(keywords)}
- After the rewrite, list the 3 things a recruiter would still doubt, and what proof would fix each.

Start by asking for the job description.`,
  }
}

export function coverLetterPrompt(r: RoleLike): AiPromptDef {
  return {
    id: 'cover-letter',
    title: `Write my ${r.shortName} cover letter`,
    why: 'A short, specific letter in your own facts. Paste the job post when asked.',
    prompt: `Help me write a cover letter for a ${r.roleName} role.

Rules:
- First ask me for: the job post, the company name, and my 2 most relevant achievements with numbers. Wait for my answers.
- 150 to 180 words, 3 short paragraphs: why this company, the proof I can do this job (my 2 achievements), a clear close.
- Plain, confident English. No "I am writing to apply", no "passionate", no flattery.
- Use only facts I give you. If something is missing, ask.
- Then give me a 2-line version for a recruiter message on LinkedIn.

Start by asking your questions.`,
  }
}

export function mockInterviewPrompt(r: RoleLike): AiPromptDef {
  return {
    id: 'mock',
    title: `Run a written ${r.shortName} mock interview`,
    why: 'Six questions, one at a time, with a score and a stronger answer after each.',
    prompt: `Act as an interviewer hiring a ${r.roleName}. Run a mock interview with me.

Rules:
- Ask ONE question at a time and wait for my answer. 6 questions: 2 behavioural, 3 specific to the ${r.roleName} role, 1 short case or problem.
- After each answer: score it 1 to 5 on structure, specifics and numbers; say in 2 lines what a strong answer has that mine lacked; show a stronger version in 4 lines using only facts I gave.
- Ask a follow-up if my answer was vague, like a real interviewer.
- At the end: my 3 biggest gaps and a 7-day plan to fix them.

First ask which company and level I am interviewing for, then begin.`,
  }
}

export function conceptsPrompt(r: RoleLike): AiPromptDef {
  return {
    id: 'concepts',
    title: `Quiz me on ${r.shortName} concepts`,
    why: 'Finds what you cannot yet explain, then teaches it with an example.',
    prompt: `I am preparing for a ${r.roleName} interview. Test whether I can explain the concepts the role needs.

Rules:
- List the 12 concepts an interviewer most expects a ${r.roleName} to explain. Then quiz me on them one at a time.
- For each: ask me to explain it in 2 or 3 sentences as I would in an interview. Wait for my answer.
- Then tell me what was right, what was missing, and give a worked example with small numbers.
- Keep a running list of the concepts I got wrong. At the end, re-ask those, then give me a one-page revision sheet.

Start with the list, then question 1.`,
  }
}

export function planPrompt(r: RoleLike): AiPromptDef {
  return {
    id: 'plan',
    title: 'Build my day-by-day prep plan',
    why: 'A realistic plan around your interview date and the hours you have.',
    prompt: `Build me a day-by-day preparation plan for a ${r.roleName} interview.

First ask me: the interview date, the company and rounds if I know them, hours I can study per day, and my 2 weakest areas. Wait for my answers.

Then give a table: day, focus, exact task (specific, not "revise"), time needed, and how I will know it is done. Include: role concepts, practice questions answered out loud, one mock interview every 3 days, my resume stories, questions to ask the interviewer, and a light last day. Keep each day within my hours.`,
  }
}

export function negotiationPrompt(r: RoleLike): AiPromptDef {
  return {
    id: 'negotiate',
    title: 'Practise the salary conversation',
    why: 'The AI plays the recruiter. Use the pay data on this page as your evidence.',
    prompt: `Play a recruiter making me an offer for a ${r.roleName} role, so I can practise negotiating.

First ask me: the offer (fixed, variable, equity, joining bonus), my current pay, the city, my years of experience, and any other offers. Wait for my answers.

Then role-play the call one line at a time: you speak as the recruiter, I reply. Push back the way a real recruiter does (budget, internal parity, "this is our best"). After 6 exchanges, stop and review: what I did well, where I gave away leverage, the exact sentences I should have said, and what to ask for besides base pay.`,
  }
}

export function lorPrompt(r: RoleLike): AiPromptDef {
  return {
    id: 'lor',
    title: 'Draft the brief for my recommender',
    why: 'Recommenders write better letters from a clear brief. This builds yours.',
    prompt: `Help me prepare a one-page brief that my recommender can use to write a letter of recommendation for a ${r.roleName} role (or a related programme).

First ask me: who the recommender is and how they know me, what I am applying for, and 3 things I did under them with dates and results. Wait for my answers.

Then write: (1) a polite 100-word email asking for the letter, with the deadline; (2) a brief with 3 specific stories they saw first-hand, each with the result and the quality it shows; (3) a draft letter of about 300 words in THEIR voice that they can edit. Use only facts I give you. Mark anything they must confirm.`,
  }
}

export function linkedinPrompt(r: RoleLike): AiPromptDef {
  return {
    id: 'linkedin',
    title: 'Fix my LinkedIn headline and About',
    why: 'So recruiters searching for this role find you and understand you in ten seconds.',
    prompt: `Rewrite my LinkedIn headline and About section so recruiters searching for a ${r.roleName} find me.

First ask me for my current headline, About text, and my 3 best results with numbers. Wait.

Then give: 3 headline options under 120 characters (role + what I do + proof), and an About section of 5 short lines: what I do, 2 results with numbers, tools I use, what I want next. Plain words. Only facts I gave.`,
  }
}

/** The set shown on a role hub. */
export function hubPrompts(r: RoleLike, keywords?: string[]): AiPromptDef[] {
  return [
    mockInterviewPrompt(r),
    conceptsPrompt(r),
    planPrompt(r),
    resumePrompt(r, keywords),
    coverLetterPrompt(r),
    negotiationPrompt(r),
  ]
}

/** A tutor prompt for any lesson (Learn AI and the Paul Graham course). */
export function tutorPrompt(l: {
  title: string
  tldr: string
  keyTerms: { term: string }[]
}): AiPromptDef {
  return {
    id: 'tutor',
    title: 'Practise this lesson with an AI tutor',
    why: 'It checks what you understood, then gives you a small real task to try.',
    prompt: `Be my patient tutor. I just studied this lesson: "${l.title}". Summary: ${l.tldr}
Key terms: ${l.keyTerms
      .slice(0, 6)
      .map((k) => k.term)
      .join(', ')}.

Do this, one step at a time, waiting for me each time:
1. Ask me to explain the main idea in my own words. Correct me kindly with one concrete example.
2. Ask 4 questions, easy to hard. After each answer, say what was right and what was missing.
3. Give me one small workflow I can try in 10 minutes that uses this idea in real work or study. Walk me through it step by step and check my result.
4. End with 3 lines: what I now know, what I should practise, what to learn next.`,
  }
}
