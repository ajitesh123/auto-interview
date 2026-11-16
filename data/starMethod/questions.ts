import type { Story } from './engine'

// The 12 competencies behavioural rounds probe most often, each with one question in its most
// common wording. Sources for the list: MIT CAPD's sample questions, Amazon's 16 Leadership
// Principles (amazon.jobs/en/principles, opened 16 Nov 2026) and our own behavioural question
// pages. `lp` maps to Amazon principle names exactly as Amazon writes them.
export interface Competency {
  id: string
  name: string
  question: string
  href?: string // our page for this question, if we have one
  lp: string[]
}

export const COMPETENCIES: Competency[] = [
  {
    id: 'leadership',
    name: 'Leadership',
    question: 'Tell me about a time you led a team or a project.',
    href: '/interview-questions/behavioral/tell-me-about-a-time-you-showed-leadership',
    lp: ['Hire and Develop the Best', 'Think Big'],
  },
  {
    id: 'conflict',
    name: 'Conflict',
    question: 'Tell me about a conflict with a coworker and how you resolved it.',
    href: '/interview-questions/behavioral/describe-a-conflict-with-coworker',
    lp: ['Earn Trust'],
  },
  {
    id: 'failure',
    name: 'Failure',
    question: 'Tell me about a time you failed.',
    href: '/interview-questions/behavioral/tell-me-about-a-time-you-failed',
    lp: ['Learn and Be Curious', 'Earn Trust'],
  },
  {
    id: 'disagree',
    name: 'Disagreeing with a manager',
    question: 'Tell me about a time you disagreed with your manager.',
    href: '/interview-questions/behavioral/tell-me-about-a-time-you-disagreed-with-your-manager',
    lp: ['Have Backbone; Disagree and Commit'],
  },
  {
    id: 'pressure',
    name: 'Deadline or pressure',
    question: 'Tell me about a time you worked under a tight deadline.',
    href: '/interview-questions/behavioral/how-do-you-handle-stress-pressure',
    lp: ['Bias for Action', 'Deliver Results'],
  },
  {
    id: 'prioritise',
    name: 'Prioritising',
    question: 'Tell me about a time you had too much to do. What did you drop?',
    href: '/interview-questions/behavioral/how-do-you-prioritize-your-work',
    lp: ['Deliver Results', 'Frugality'],
  },
  {
    id: 'customer',
    name: 'Customer or user',
    question: 'Tell me about a time you went out of your way for a customer or user.',
    lp: ['Customer Obsession'],
  },
  {
    id: 'ownership',
    name: 'Ownership',
    question: 'Tell me about a time you took on something outside your role.',
    lp: ['Ownership'],
  },
  {
    id: 'data',
    name: 'Decision with data',
    question: 'Tell me about a decision you made using data.',
    lp: ['Dive Deep', 'Are Right, A Lot'],
  },
  {
    id: 'ambiguity',
    name: 'Ambiguity',
    question: 'Tell me about a time you had to act without clear direction.',
    lp: ['Bias for Action', 'Invent and Simplify'],
  },
  {
    id: 'influence',
    name: 'Influence',
    question: 'Tell me about a time you persuaded someone who did not report to you.',
    lp: ['Earn Trust', 'Insist on the Highest Standards'],
  },
  {
    id: 'learning',
    name: 'Learning fast',
    question: 'Tell me about a time you had to learn something new quickly.',
    lp: ['Learn and Be Curious'],
  },
]

export const AMAZON_LP_COUNT = 16

// Fictional stories for the samples and the worked example. Numbers are invented and labelled so.
export const SAMPLES: (Story & { label: string })[] = [
  {
    id: 'sample-analyst',
    label: 'Analyst, deadline (strong)',
    title: 'Refund report the night before the review',
    tags: ['pressure', 'ownership', 'data'],
    s: 'In my first year as a data analyst at a food delivery startup, the finance head needed refund numbers for a board review the next morning.',
    t: 'I owned the refund dashboard, and at 6 pm I found it was double counting partial refunds, so every city looked worse than it was.',
    a: 'I first checked ten orders by hand against the payments export to prove the bug, which took twenty minutes. Then I rewrote the refund query to count each refund once by refund ID, and I compared the new totals with the bank settlement file for the last month. They matched within 0.4%. I told the finance head at 8 pm what was wrong, what I had changed and how I had checked it, so she could decide whether to use the new numbers. I also added a test that fails if a refund ID appears twice.',
    r: 'The board saw refunds of 3.1%, not 4.6%, and kept two cities it had planned to cut. I learned to check every money number against a second source first.',
  },
  {
    id: 'sample-analyst-weak',
    label: 'Same story (weak)',
    title: 'Refund report (weak version)',
    tags: ['pressure'],
    s: 'So basically I was working at a startup, it was a food delivery company, quite a big one actually, and we had a lot of dashboards for different teams like finance, ops and marketing, and there was this board review coming up, which was kind of a big deal for everyone because the founders were presenting to investors and the finance team was really stressed about it.',
    t: 'We were supposed to make sure all the numbers were right before the review.',
    a: 'We found that there was an issue with the refund numbers, so we worked on fixing the query and we checked it with the payments data. The team stayed late and we managed to sort it out before the morning.',
    r: 'It went well and the finance head was happy with the numbers.',
  },
  {
    id: 'sample-fresher',
    label: 'Fresher, team project',
    title: 'Final-year project teammate who went quiet',
    tags: ['conflict', 'leadership'],
    s: 'In my final year of B.Tech, four of us built an attendance app for our college as the major project, with the demo due in six weeks.',
    t: 'I was the team lead, and by week three one teammate had stopped replying, and his module, the login and roles, was still empty.',
    a: 'I met him alone after class instead of raising it in the group chat. He told me he was stuck on the authentication library and embarrassed to say so. I split his module into three small tasks, took the hardest one myself, and paired with him for two evenings until his part worked. Then I moved our stand-up to a ten-minute call every Monday and Thursday, where each of us showed one working screen, so nobody could go quiet for long.',
    r: 'We demoed on time, and the app scored 46 out of 50, the second highest in our batch. I learned to ask a quiet teammate what is blocking them before I assume they do not care.',
  },
]
