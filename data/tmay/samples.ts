// Fictional sample answers for the "Tell me about yourself" builder. Names, companies' internal
// numbers and projects are invented. They exist to show the shape, and the worked example on
// /tell-me-about-yourself runs the weak and strong fresher versions through the same engine.
import type { Answer, Order, Length } from './engine'

export interface Sample {
  id: string
  label: string
  note: string
  order: Order
  length: Length
  answer: Answer
}

export const SAMPLES: Sample[] = [
  {
    id: 'fresher-analyst',
    label: 'Fresher → data analyst',
    note: 'Final-year B.Tech, campus placement, India',
    order: 'present-first',
    length: 'standard',
    answer: {
      stage: 'fresher',
      role: 'data analyst',
      company: '',
      skills: 'SQL, Excel, Power BI, Python',
      present:
        "I'm a final-year B.Tech student in electronics, and over the last year I've moved towards data. Most of my project work now is in SQL and Power BI, and the thing I'm best at is taking a messy spreadsheet and finding the one number that matters in it.",
      past: 'In my summer internship at a regional grocery chain, I cleaned two years of billing data for 14 stores in Excel and built a Power BI dashboard the store managers now check every Monday. It showed that 9% of dairy stock was expiring on the shelf, and the chain changed its reorder rule because of it. In my final-year project I wrote the SQL behind a canteen ordering app that 600 students use, so I have also seen what breaks when real people use your numbers.',
      future:
        "That's why this data analyst role appeals to me. I want to spend my first years turning messy data into decisions people act on, and your team does exactly that for retail clients, so I'd be learning from people who already do the work I want to be good at.",
    },
  },
  {
    id: 'fresher-weak',
    label: 'Fresher, weak version',
    note: 'The same student, as many first drafts sound',
    order: 'past-first',
    length: 'standard',
    answer: {
      stage: 'fresher',
      role: 'data analyst',
      company: '',
      skills: 'SQL, Excel, Power BI, Python',
      past: 'My name is Rohan and I am from Nagpur. My father is a bank manager and my mother is a teacher. I did my schooling at a CBSE school and scored 89% in 12th in 2021. Then in 2022 I joined B.Tech in electronics. In 2023 I learned Python and in 2024 I did kind of an internship where I basically helped with some data work.',
      present:
        'Currently I am in final year. My hobbies are cricket and reading. I think I am a hard worker and a quick learner.',
      future: 'I want to grow in a reputed company.',
    },
  },
  {
    id: 'experienced-pm',
    label: 'Experienced → product manager',
    note: '4 years in operations at a fintech, moving to product',
    order: 'present-first',
    length: 'standard',
    answer: {
      stage: 'experienced',
      role: 'product manager',
      company: '',
      skills: 'roadmap, user research, SQL, stakeholder management',
      present:
        "I'm a senior operations manager at a lending start-up, where I own the loan disbursal flow end to end, from the borrower's last form to money in their account.",
      past: 'Over the last two years I ran user research with 40 borrowers who dropped off before getting their money, wrote the specs for three fixes with our engineers, and tracked the results myself in SQL. Disbursal time fell from two days to six hours, and drop-offs at the last step halved. Because the product team kept asking me which fix should come first, I ended up setting priorities on the roadmap in practice, and running the weekly review with engineering and the risk team.',
      future:
        "Now I want to do that job in name too. This product manager role is on the payments side, where four years of seeing every failed transfer up close gives me a head start, and I'd like to own a roadmap rather than feed one.",
    },
  },
  {
    id: 'switcher-cs',
    label: 'Teacher → customer success',
    note: 'Career switch after 6 years of teaching, US or UK',
    order: 'past-first',
    length: 'short',
    answer: {
      stage: 'switcher',
      role: 'customer success',
      company: '',
      skills: 'onboarding, retention, CRM',
      past: 'For six years I taught high-school science, and for the last two I also trained 30 teachers on our new learning platform, from first login to running their own classes on it.',
      present:
        'That onboarding work is the part of my job I enjoy most. I now run it for the whole school, and teachers who went through it log in about three times as often as those who did not.',
      future:
        "I'm moving into customer success because it is the same job at a bigger scale, and this role starts with onboarding new schools.",
    },
  },
]

export const STRONG = SAMPLES[0]
export const WEAK = SAMPLES[1]

// The usual ways the question is asked, with where each was seen (opened 22 Nov 2026) and how to
// adjust the same answer.
export const VARIANTS: { q: string; seen: { label: string; url: string }; adjust: string }[] = [
  {
    q: 'Walk me through your resume.',
    seen: {
      label: 'Penn Career Services',
      url: 'https://careerservices.upenn.edu/blog/2026/04/02/how-to-answer-tell-me-about-yourself/',
    },
    adjust:
      'Use Past → Present → Future, but still pick only the two or three stops that matter for this job.',
  },
  {
    q: 'Tell me a little more about your background.',
    seen: {
      label: 'Penn Career Services',
      url: 'https://careerservices.upenn.edu/blog/2026/04/02/how-to-answer-tell-me-about-yourself/',
    },
    adjust: 'Same answer. Lead with the Past part if your background is the reason you fit.',
  },
  {
    q: "What should I know about you that isn't on your resume?",
    seen: { label: 'Grinnell College Career Center', url: 'https://career.grinnell.edu/?p=115977' },
    adjust:
      'Swap the Past part for a strength or a project that is not on your CV, with its number.',
  },
  {
    q: 'Tell me about your professional journey.',
    seen: {
      label: 'Penn Career Services',
      url: 'https://careerservices.upenn.edu/blog/2026/04/02/how-to-answer-tell-me-about-yourself/',
    },
    adjust:
      'Past-first, and say why each move happened in one clause. End on why this job is the next step.',
  },
  {
    q: 'Introduce yourself.',
    seen: {
      label: 'Naukri, Tell me about yourself for freshers',
      url: 'https://www.naukri.com/blog/tell-me-about-yourself-for-freshers/',
    },
    adjust:
      'Common in Indian campus HR rounds. Start with your name and degree, then the same three parts; keep the short version ready.',
  },
]
