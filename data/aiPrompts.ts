import type { AiPromptDef } from '@/components/ai/AiPrompt'

// Ready prompts a candidate can open in Claude or ChatGPT, for DOCUMENTS only (resume, cover
// letter, recommendation) and for lesson tutoring. Interview practice is never a prompt: it goes
// to Tough Tongue AI via MockInterviewButton. Written for the role, with the rules a
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

/**
 * The set shown on a role hub. Rahul, 11 Nov 2026: only documents (resume, cover letter,
 * recommendation) go to Claude or ChatGPT. Mock interviews and any spoken practice happen on
 * Tough Tongue AI only (MockInterviewButton), never through a prompt.
 */
export function hubPrompts(r: RoleLike, keywords?: string[]): AiPromptDef[] {
  return [resumePrompt(r, keywords), coverLetterPrompt(r), lorPrompt(r)]
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
