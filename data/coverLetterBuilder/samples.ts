// Sample cover letters for /cover-letter. Every person, company, college and number here is
// FICTIONAL and labelled so on the page. Each sample loads into the builder (?sample=<id>).
import type { Draft } from './engine'

export interface Sample {
  id: string
  title: string // card title
  who: string // fictional person + situation
  note: string // why it works, one line
  draft: Draft
}

export const SAMPLES: Sample[] = [
  {
    id: 'fresher-engineer',
    title: 'B.Tech fresher, software role (email)',
    who: 'Aarav Nair (sample), final-year B.Tech, emailing a named recruiter',
    note: 'One project with a before/after number, and a first task tied to the post.',
    draft: {
      stage: 'fresher',
      channel: 'email',
      name: 'Aarav Nair',
      contact: 'aarav.nair@example.com · +91 98xxx xxx10 · Kochi',
      role: 'Graduate Engineer Trainee',
      company: 'Mehta Systems',
      manager: 'Ms Priya Rao',
      hook: 'I’m applying for the Graduate Engineer Trainee role at Mehta Systems, which I found on your careers page. Your post says new trainees join the team that builds the scheduling tool hospitals use for OPD bookings, and that is exactly the kind of software I want to work on: small screens, busy users, and mistakes that cost someone their morning.',
      proof:
        'In the final year of my B.Tech in Computer Science at Coastal Institute of Technology, two classmates and I built a lab-slot booking app for our department. Before it, students queued outside the lab office and a booking took about 40 minutes. I wrote the Python backend and the SQL schema, kept the code on Git with unit testing for every booking rule, and added a waitlist that offers a freed slot to the next student by SMS. In the first month 120 students used it, a booking took under 6 minutes, and no-shows fell from 31 to 9.',
      proof2:
        'Because your post lists Java and SQL as must-haves, I also finished a 12-week Java course this year. Most of the 180 problems I have solved on LeetCode are arrays, graphs and SQL joins, and two of my SQL answers are pinned in our college coding club’s notes.',
      fit: 'Your post asks trainees to fix bugs in production code in their first quarter, and to talk to hospital admins. That suits me: the lab app taught me to sit with the people who use the software. My first month would go on reading the booking flow end to end, reproducing open tickets on my machine, and writing a unit test for each fix so it stays fixed.',
      close:
        'I’ve attached my resume. I would welcome a short call about the trainee programme, and thank you for your time and consideration.',
    },
  },
  {
    id: 'fresher-commerce',
    title: 'B.Com fresher, accounts role (Naukri box)',
    who: 'Sneha Kulkarni (sample), B.Com graduate, pasting into a portal text box',
    note: 'Portal boxes are short: the role, one proof with numbers, one line of fit.',
    draft: {
      stage: 'fresher',
      channel: 'portal',
      name: 'Sneha Kulkarni',
      contact: '',
      role: 'Accounts Executive',
      company: 'Shree Ganesh Traders',
      manager: '',
      hook: 'I’m applying for the Accounts Executive role at Shree Ganesh Traders. I finished my B.Com from Pune in 2026, and a trading business where the books move every day is where I want to start.',
      proof:
        'During a 3-month internship at a CA firm in Pune, I prepared monthly GST returns for 14 small clients and reconciled their purchase registers in Tally Prime. Two of those clients had missed ₹2.3 lakh of input tax credit between them; I found it while matching invoices against GSTR-2B, and the partner kept me on their files until the internship ended.',
      proof2: '',
      fit: 'Your post asks for Tally, GST filing and bank reconciliation. That was my work every week, so the first month would go on learning your parties and your billing cycle rather than the software. I can join within 15 days.',
      close:
        'I would welcome a call to discuss the role. Thank you for considering my application.',
    },
  },
  {
    id: 'intern-marketing',
    title: 'Student, marketing internship (Internshala answer)',
    who: 'Ritika Sharma (sample), second-year BBA, answering a portal question',
    note: 'An internship letter can lean on a college project, as long as it has a result.',
    draft: {
      stage: 'intern',
      channel: 'portal',
      name: 'Ritika Sharma',
      contact: '',
      role: 'Social Media Marketing Intern',
      company: 'Brewhouse Coffee',
      manager: '',
      hook: 'I’m applying for the Social Media Marketing Intern role at Brewhouse Coffee. I’ve followed your Instagram since you opened in Indiranagar, and your “regulars of the week” posts are the reason I tried you.',
      proof:
        'As social media lead for our college fest, I planned 30 days of Instagram posts and reels on a ₹15,000 budget. Our reels reached 48,000 accounts, and registrations rose from 900 the year before to 1,400. The reel that did best was the simplest: a 12-second clip of the stage being built.',
      proof2: '',
      fit: 'Your post asks for reels, Canva and basic analytics. Reels in CapCut are already a weekly habit for me, and Instagram Insights is where I check what worked. My first idea would be to turn your regulars posts into a short weekly series.',
      close: 'I would be glad to talk about the internship. Thank you for your time.',
    },
  },
  {
    id: 'experienced-sales',
    title: '4 years experience, Account Executive (PDF)',
    who: 'Karan Mehta (sample), SaaS sales, attaching a one-page letter',
    note: 'Experienced letters lead with a quota number and say what they would do first.',
    draft: {
      stage: 'experienced',
      channel: 'attach',
      name: 'Karan Mehta',
      contact: 'karan.mehta@example.com · +91 99xxx xxx42 · Mumbai',
      role: 'Account Executive, Mid-Market',
      company: 'Ledgerly',
      manager: 'Mr Desai',
      hook: 'I’m applying for the Account Executive, Mid-Market role at Ledgerly. Your LinkedIn post about moving finance teams off spreadsheets matched what I hear on almost every call I take, and Ledgerly is the product I would most like to sell to them.',
      proof:
        'For four years I have sold payroll software to companies with 50 to 500 employees. Last year I closed ₹1.8 crore of new annual revenue against a ₹1.5 crore quota, 120% of target, with an average sales cycle of 46 days. The biggest change was booking a short demo with the finance head before the HR team, which cut my lost-to-no-decision deals from 14 to 6.',
      proof2:
        'Last year our manager also asked me to train two new hires on discovery calls. Both reached full quota by their fourth month, and the call checklist we built together is now used by the whole team of nine. Most of my pipeline comes from outbound, so I am used to building a territory from a cold list and a CRM that nobody has cleaned in a year.',
      fit: 'Your post says Ledgerly is opening a mid-market segment this quarter and wants AEs who can work with a new SDR team. My first 90 days would go on building a list of 200 target accounts with the SDRs, running discovery calls with the first 30, and sharing what we hear with product every two weeks, so the pitch improves while the segment is still small.',
      close:
        'I would welcome a conversation about the role. Thank you for your time and consideration.',
    },
  },
  {
    id: 'switcher-teacher',
    title: 'Teacher to customer success (career change)',
    who: 'Meera Iyer (sample), five years teaching, moving into customer success',
    note: 'A switcher letter translates old work into the new job’s words, with numbers.',
    draft: {
      stage: 'switcher',
      channel: 'attach',
      name: 'Meera Iyer',
      contact: 'meera.iyer@example.com · +91 97xxx xxx18 · Chennai',
      role: 'Customer Success Associate',
      company: 'Classwise',
      manager: '',
      hook: 'I’m applying for the Customer Success Associate role at Classwise. After five years of teaching Class 8 maths, I want to help schools get real value from software like yours, and I already know the people your team supports: teachers who are short on time.',
      proof:
        'At my school I was the go-to person when we moved to an online homework platform. I ran 12 short training sessions for 35 teachers, wrote a two-page guide, and answered their questions on a WhatsApp group. Within one term, 31 of the 35 teachers were assigning homework on the platform every week, up from 6.',
      proof2:
        'I also ran parent meetings for 40 families each term, often with a parent who was upset before they sat down. Turning a worried parent into a partner is close to turning an unhappy customer into a renewal, and I cut missed homework in my classes by a third by agreeing a simple weekly plan with each family and checking in every Friday. I am comfortable with Google Sheets, Zoom and the admin side of three school platforms.',
      fit: 'Your post asks for onboarding, product training and renewals. Schools buy in March and decide on renewals in January, so the months in between matter most. My first steps would be sitting in on onboarding calls, building a one-page guide for each school type, and tracking which schools stop logging in long before renewal comes up.',
      close:
        'I would welcome the chance to talk about the role. Thank you for your time and consideration.',
    },
  },
  {
    id: 'uk-graduate',
    title: 'UK graduate scheme (Yours faithfully)',
    who: 'Daniel Okafor (sample), economics graduate, no named contact',
    note: 'No name found, so “Dear Hiring Manager” and the UK sign-off “Yours faithfully”.',
    draft: {
      stage: 'fresher',
      channel: 'uk',
      name: 'Daniel Okafor',
      contact: 'daniel.okafor@example.com · 07xxx xxx321 · Leeds',
      role: 'Graduate Data Analyst',
      company: 'Northway Housing',
      manager: '',
      hook: 'I am applying for the Graduate Data Analyst role at Northway Housing, advertised on Prospects. Your annual report says repair times are your tenants’ top complaint, and I want my first analyst job to be one where the numbers change how quickly someone gets a boiler fixed.',
      proof:
        'For my dissertation at the University of Westmoor, I analysed 18,000 council repair records in Python and SQL. I found that jobs logged on a Friday took 2.4 days longer to close than jobs logged on a Monday, mostly because of how they were assigned. I presented the finding to the council’s own repairs team in a ten-minute talk with one chart, and they now use my weekly dashboard to spot late jobs before tenants have to chase them.',
      proof2:
        'Alongside my degree, I worked 15 hours a week at a supermarket, where I was trusted to close the store and cash up. It taught me to explain a problem in two sentences to a busy manager, which is the skill your advert calls “clear writing for non-specialists”.',
      fit: 'Your advert asks for SQL, Power BI and clear writing for non-specialists. I would start by learning how your repair data is recorded, then build one simple report that shows which jobs are about to miss their target, and check it with the people who book the engineers before anyone else sees it. I am free to start this September.',
      close:
        'I would welcome the chance to discuss the role. Thank you for your time and consideration.',
    },
  },
]

/** The generic letter most people send, used for the before/after on the page (fictional). */
export const WEAK: Draft = {
  stage: 'fresher',
  channel: 'email',
  name: 'Aarav Nair',
  contact: 'aarav.nair@example.com',
  role: 'Graduate Engineer Trainee',
  company: 'Mehta Systems',
  manager: 'Sir/Madam',
  hook: 'I am writing to express my interest in the vacant position in your esteemed organisation. My name is Aarav Nair and I am a B.Tech graduate.',
  proof:
    'I am a hard-working and passionate individual who is a quick learner and a team player. I have good knowledge of Java, Python and SQL and I have done many projects in college.',
  proof2: '',
  fit: 'I believe I am a perfect fit for this role and I will give my best to the company.',
  close: 'Kindly consider my application. I look forward to hearing from you.',
}

/** Fictional job post used for the worked keyword example. */
export const SAMPLE_POST = `Graduate Engineer Trainee – Mehta Systems (Kochi)
About the role: you will join the team that builds our hospital scheduling tool.
Requirements:
- B.Tech / B.E. in Computer Science or IT (2026 batch)
- Strong Java and SQL
- Python is a plus
- Git and unit testing basics
- Good communication with doctors and hospital admins
Nice to have: React, REST APIs`
