// Fictional sample answers for the "Why should we hire you?" builder. People, employers'
// internal numbers and projects are invented. They show the shape; the worked example on
// /why-should-we-hire-you runs the weak and strong fresher versions through the same engine.
import type { Answer, Length } from './engine'

export interface Sample {
  id: string
  label: string
  note: string
  length: Length
  answer: Answer
}

export const SAMPLES: Sample[] = [
  {
    id: 'fresher-sde',
    label: 'Fresher → software engineer',
    note: 'Final-year B.Tech, campus placement, India',
    length: 'short',
    answer: {
      stage: 'fresher',
      role: 'software engineer',
      company: '',
      needs: 'Java, REST APIs, debugging',
      match:
        'This role needs someone who can pick up a ticket in a Java service and ship it without hand-holding, and that is how I have spent my final year.',
      proof:
        'In my internship at a logistics start-up I built two REST APIs in Java for driver payouts, and I debugged the payout service until I found the bug that was double-paying 40 drivers a week. My final-year project, a hostel complaint app, has had 1,200 complaints filed through it since July.',
      value:
        'So in my first months here I could take smaller API and debugging tickets off the team, and grow into owning a service.',
    },
  },
  {
    id: 'fresher-weak',
    label: 'Fresher, weak version',
    note: 'The same student, as many first drafts sound',
    length: 'short',
    answer: {
      stage: 'fresher',
      role: 'software engineer',
      company: '',
      needs: 'Java, REST APIs, debugging',
      match:
        'You should hire me because I am a hard worker and a quick learner. I am also very passionate about coding and I think I am better than other candidates because I do a lot of practice.',
      proof: 'I have basically done an internship where I helped with some backend work.',
      value:
        'This is my dream company and it will be a great learning opportunity for me. I will give 100% effort.',
    },
  },
  {
    id: 'experienced-ae',
    label: 'Experienced → account executive',
    note: '3 years as an SDR at a SaaS company, US or India',
    length: 'short',
    answer: {
      stage: 'experienced',
      role: 'account executive',
      company: '',
      needs: 'mid-market, discovery, pipeline',
      match:
        'You need an account executive who can close mid-market deals without a long ramp, and I have been doing most of that job already.',
      proof:
        'As an SDR for the last three years I booked 210 qualified meetings, and for the last two quarters my manager let me run discovery and the second call myself on 18 mid-market deals. Seven of them closed, worth about $180,000 in first-year revenue, and I built the pipeline review sheet our team still uses on Mondays.',
      value:
        'In this role I would start with the accounts that stalled after a first call last quarter, because that is exactly the stage I have been working, and aim to have my own pipeline at three times quota by the end of my first quarter.',
    },
  },
  {
    id: 'switcher-cs',
    label: 'Teacher → customer success',
    note: 'Career switch after 6 years of teaching',
    length: 'short',
    answer: {
      stage: 'switcher',
      role: 'customer success',
      company: '',
      needs: 'onboarding, retention, training',
      match:
        'This role is mostly onboarding new schools, and onboarding people onto software is the part of my teaching job I am best at.',
      proof:
        'For the last two years I trained 30 teachers on our learning platform, from first login to running their own classes, and the ones I trained log in about three times as often as those who were not.',
      value:
        'So I could start running onboarding calls for your new school accounts in my first weeks, with a training plan that already works.',
    },
  },
  {
    id: 'bcom-accounts',
    label: 'B.Com fresher → accounts executive',
    note: 'B.Com graduate, CA articleship dropped, India',
    length: 'short',
    answer: {
      stage: 'fresher',
      role: 'accounts executive',
      company: '',
      needs: 'Tally, GST, reconciliation',
      match:
        'You need someone who can run GST filings and bank reconciliation in Tally without errors, and that is the work I did every week for the last year.',
      proof:
        'During my 14 months of articleship I filed monthly GST returns for 11 small clients in Tally and reconciled their bank statements. At one client I traced ₹2.3 lakh of unclaimed input tax credit and got it into the next return.',
      value:
        'So in my first month here I could take the monthly GST and reconciliation work off your senior accountant and free up their time for audits.',
    },
  },
  {
    id: 'returner-analyst',
    label: 'Returner after a career gap → data analyst',
    note: '2-year break for caregiving, 5 years of analytics before it',
    length: 'short',
    answer: {
      stage: 'experienced',
      role: 'data analyst',
      company: '',
      needs: 'SQL, dashboards, stakeholders',
      match:
        'This role needs an analyst who can turn messy sales data into a dashboard managers actually use, and I did that for five years before my break.',
      proof:
        'At a consumer brand I built the weekly sales dashboard in SQL and Tableau that 60 regional managers used, and cut the Monday report from a day of spreadsheets to an hour. During my break I finished a Power BI course and rebuilt that dashboard on public data to keep my SQL current.',
      value:
        'I would start by sitting with your stakeholders in sales to learn which numbers they argue about, then fix those first.',
    },
  },
  {
    id: 'intern-marketing',
    label: 'Intern → marketing',
    note: 'Second-year BBA, internship interview',
    length: 'short',
    answer: {
      stage: 'fresher',
      role: 'marketing intern',
      company: '',
      needs: 'Instagram, content calendar, Canva',
      match:
        'You need an intern who can keep the Instagram content calendar full without being chased, and I already run one.',
      proof:
        'I manage the Instagram page for our college fest, where I planned 45 posts in Canva over eight weeks and the page went from 900 to 3,400 followers before the event.',
      value:
        'In the first week I could take over your weekly content calendar and draft the first batch of posts for your review, so the team spends its time approving rather than chasing.',
    },
  },
]

export const STRONG = SAMPLES[0]
export const WEAK = SAMPLES[1]

// The usual ways the question is asked, with where each was seen (opened 26 Nov 2026) and how
// to adjust the same answer.
export const VARIANTS: { q: string; seen: { label: string; url: string }; adjust: string }[] = [
  {
    q: 'Why should we hire you as a fresher?',
    seen: {
      label: 'Naukri, for freshers',
      url: 'https://www.naukri.com/blog/how-to-answer-why-should-we-hire-you-for-freshers/',
    },
    adjust:
      'Same three parts. Your proof is an internship, project, fest or part-time job, with a number.',
  },
  {
    q: 'Why should we hire you over other candidates?',
    seen: {
      label: 'The Muse',
      url: 'https://www.themuse.com/advice/3-better-ways-to-answer-why-should-we-hire-you',
    },
    adjust:
      'Do not talk about the others. Lead with the one need you meet best, and make the proof specific enough that it could only be you.',
  },
  {
    q: 'What sets you apart? / What makes you unique?',
    seen: { label: 'Naukri', url: 'https://www.naukri.com/blog/why-should-i-hire-you/' },
    adjust:
      'Pick the one combination few people have (for example, sales experience plus SQL) and prove each half.',
  },
  {
    q: 'Why are you a good fit for this job?',
    seen: { label: 'Naukri', url: 'https://www.naukri.com/blog/why-should-i-hire-you/' },
    adjust: 'Use the Match part first and name two needs from the job post, then the proof.',
  },
  {
    q: 'Why should you be hired for this internship?',
    seen: {
      label: 'Internshala',
      url: 'https://internshala.com/blog/why-should-you-be-hired-for-this-internship/',
    },
    adjust:
      'Keep it under a minute. The value part is what you could take on in the first week or two.',
  },
]
