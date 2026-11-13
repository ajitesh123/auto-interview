import type { RoleInterviewTips, Src } from './types'

// Product Manager interview tips, round by round. Every page below was opened on 2026-11-13.
// Official: amazon.jobs PM interview prep; careers.microsoft.com interview tips; atlassian.com PM
// careers page; Flipkart APM application process (sites.google.com/flipkart.com/apm).
// Reported: Glassdoor (Amazon RVW99496351, Microsoft RVW101467849, Google RVW104236235, Meta PM
// questions page, Flipkart PM questions page), AmbitionBox (Flipkart PM campus), aced.io
// experiences (Google SPM ffd98c, Meta 03d15e, Zomato 668683). aced.io shows relative dates
// ("9 months ago"); we convert them to an approximate month as of 13 Nov 2026 and say so.
// Commentary: Barron Ernst (Medium, Dec 2017), Tom Leung (Fireside PM, 13 Nov 2024).

const S = {
  amazon: {
    label: 'Amazon, Product Manager interview prep',
    url: 'https://amazon.jobs/content/en/how-we-hire/product-manager-interview-prep',
  },
  microsoft: {
    label: 'Microsoft Careers, interview tips',
    url: 'https://careers.microsoft.com/v2/global/en/hiring-tips/interview-tips.html',
  },
  atlassian: {
    label: 'Atlassian Careers, product managers',
    url: 'https://www.atlassian.com/company/careers/resources/career-growth/product-managers',
  },
  flipkartApm: {
    label: 'Flipkart APM program, application process',
    url: 'https://sites.google.com/flipkart.com/apm/application-process',
  },
  gdAmazon: {
    label: 'Glassdoor, Amazon PM review (Seattle, May 2026)',
    url: 'https://www.glassdoor.com/Interview/Amazon-Interview-E6036-RVW99496351.htm',
  },
  gdMicrosoft: {
    label: 'Glassdoor, Microsoft PM review (Redmond, Oct 2026)',
    url: 'https://www.glassdoor.com/Interview/Microsoft-Interview-E1651-RVW101467849.htm',
  },
  gdGoogleApm: {
    label: 'Glassdoor, Google APM review (Bengaluru)',
    url: 'https://www.glassdoor.co.in/Interview/Google-Interview-E9079-RVW104236235.htm',
  },
  gdMeta: {
    label: 'Glassdoor, Meta PM interview questions',
    url: 'https://static.glassdoor.com.mx/Interview/Meta-PM-Interview-Questions-EI_IE40772.0,4_KO5,7_IP10.htm',
  },
  gdFlipkart: {
    label: 'Glassdoor, Flipkart PM interview questions',
    url: 'https://www.glassdoor.co.uk/Interview/Flipkart-Product-Manager-Interview-Questions-EI_IE300494.0,8_KO9,24.htm',
  },
  abFlipkart: {
    label: 'AmbitionBox, Flipkart PM interview (campus)',
    url: 'https://www.ambitionbox.com/interviews/flipkart-interview-questions/product-manager/job-type',
  },
  acedGoogle: {
    label: 'aced.io, Google Senior PM interview experience',
    url: 'https://www.aced.io/experiences/google-senior-product-manager-interview-ffd98c',
  },
  acedMeta: {
    label: 'aced.io, Meta PM interview experience',
    url: 'https://www.aced.io/experiences/meta-facebook-product-manager-interview-03d15e',
  },
  acedZomato: {
    label: 'aced.io, Zomato PM interview experience',
    url: 'https://www.aced.io/experiences/zomato-product-manager-interview-668683',
  },
  ernst: {
    label: 'Barron Ernst (CPO, Showmax), Medium, Dec 2017',
    url: 'https://medium.com/naspers/mistakes-people-make-when-interviewing-for-a-product-manager-b81d908c8bbb',
  },
  leung: {
    label: 'Tom Leung, Fireside PM, Nov 2024',
    url: 'https://firesidepm.substack.com/p/mastering-the-pm-interview-common',
  },
} satisfies Record<string, Src>

const PRODUCT_MANAGER_TIPS: RoleInterviewTips = {
  slug: 'product-manager',
  metaTitle: 'Product Manager Interview Tips 2026: Round by Round',
  metaDescription:
    'PM interview tips for every round, from {nLoops} mapped loops (Google, Meta, Amazon, Microsoft, Flipkart): what each round tests, do/avoid, weak vs strong answers.',
  h1: 'Product manager interview tips, round by round',
  kicker: 'Interview tips · {nLoops} loops mapped · {nCompanies} companies',
  directAnswer:
    'A product manager interview is usually a recruiter call, a PM or hiring-manager screen, then case and behavioural rounds of 30–60 minutes each: product sense, analytics and execution, strategy, a technical round and behavioural. Complete loops we mapped ran {minRounds} to {maxRounds} rounds in all. Each round rewards the same habit in a different form: state your assumption or user first, make one clear call, and back it with a number. The candidate reports we opened name lost points for answers that stay broad, skip the data, or follow a framework instead of a thesis.',
  checked: '2026-11-13',

  loops: [
    {
      company: 'Amazon',
      level: 'PM (official prep page)',
      region: 'Global',
      kind: 'official',
      when: 'live page',
      src: S.amazon,
      partial: true,
      rounds: [
        {
          name: 'Phone screen with a senior leader, half Leadership Principles',
          type: 'screen',
          minutes: 60,
        },
        { name: 'Writing assessment', type: 'written' },
        { name: 'Loop of five interviews', type: 'final', minutes: 55 },
      ],
    },
    {
      company: 'Amazon',
      level: 'PM, Seattle',
      region: 'US',
      kind: 'reported',
      when: 'May 2026',
      date: '2026-05',
      src: S.gdAmazon,
      rounds: [
        { name: 'Recruiter call', type: 'recruiter' },
        { name: 'Phone screen', type: 'screen', minutes: 45 },
        { name: 'Two-page writing sample', type: 'written' },
        { name: 'Product strategy', type: 'strategy' },
        { name: 'Execution', type: 'analytics' },
        { name: 'Analytical', type: 'analytics' },
        { name: 'Technical', type: 'technical' },
        { name: 'Bar raiser', type: 'final', also: ['behavioural'] },
      ],
    },
    {
      company: 'Microsoft',
      level: 'PM, AI org, Redmond',
      region: 'US',
      kind: 'reported',
      when: 'Oct 2026',
      date: '2026-10',
      src: S.gdMicrosoft,
      rounds: [
        { name: 'Recruiter call (resume, growth mindset)', type: 'recruiter' },
        { name: 'Screen with an engineer (simple coding)', type: 'screen' },
        { name: 'Technical, with an engineer', type: 'technical' },
        { name: 'Product sense', type: 'product-sense' },
        { name: 'Behavioural', type: 'behavioural' },
        { name: 'Execution', type: 'analytics' },
        { name: '“Vibecoding”: working prototype from a rough spec', type: 'technical' },
        { name: 'Final with a director', type: 'final' },
      ],
    },
    {
      company: 'Meta',
      level: 'PM (referral)',
      region: 'Global',
      kind: 'reported',
      when: 'undated',
      src: S.gdMeta,
      rounds: [
        { name: 'Recruiter screen', type: 'recruiter', minutes: 30 },
        { name: 'Product sense', type: 'product-sense', minutes: 45 },
        { name: 'Execution', type: 'analytics', minutes: 45 },
        { name: 'Leadership and drive', type: 'behavioural', minutes: 45 },
        { name: 'Hiring manager', type: 'final', minutes: 30 },
      ],
    },
    {
      company: 'Meta',
      level: 'PM, L5',
      region: 'US',
      kind: 'reported',
      when: '~Jan 2026 (“10 months ago”)',
      date: '2026-01',
      src: S.acedMeta,
      rounds: [
        { name: 'Phone: product sense + analytical', type: 'screen' },
        { name: 'Product sense', type: 'product-sense' },
        { name: 'Analytical / execution', type: 'analytics' },
        { name: 'Behavioural', type: 'behavioural' },
      ],
    },
    {
      company: 'Google',
      level: 'Senior PM (L5/L6 loop)',
      region: 'US',
      kind: 'reported',
      when: '~Feb 2026 (“9 months ago”)',
      date: '2026-02',
      src: S.acedGoogle,
      rounds: [
        { name: 'Recruiter screen', type: 'recruiter' },
        { name: 'PM phone screen: product + behavioural', type: 'screen' },
        { name: 'Behavioural', type: 'behavioural' },
        { name: 'Product design (Maps)', type: 'product-sense' },
        { name: 'Analytics / execution (YouTube comments drop)', type: 'analytics' },
        { name: 'Strategy (Zoom)', type: 'strategy' },
      ],
    },
    {
      company: 'Google',
      level: 'APM, Bengaluru',
      region: 'India',
      kind: 'reported',
      when: 'Oct 2025 (review posted Jun 2026)',
      date: '2025-10',
      src: S.gdGoogleApm,
      partial: true,
      rounds: [
        { name: 'Product case: a product for airport check-in', type: 'product-sense' },
        { name: '“Several more rounds” (not described)', type: 'final' },
      ],
    },
    {
      company: 'Flipkart',
      level: 'PM, Bengaluru',
      region: 'India',
      kind: 'reported',
      when: 'Jul 2025',
      date: '2025-07',
      src: S.gdFlipkart,
      partial: true,
      rounds: [
        { name: 'Root-cause analysis (RCA)', type: 'analytics' },
        { name: 'Product design', type: 'product-sense' },
        { name: 'Product strategy', type: 'strategy' },
        { name: 'Product metrics', type: 'analytics' },
      ],
    },
    {
      company: 'Flipkart',
      level: 'PM, campus',
      region: 'India',
      kind: 'reported',
      when: 'undated',
      src: S.abFlipkart,
      rounds: [
        { name: 'Case: reduce delivery SLA breaches', type: 'analytics', minutes: 45 },
        { name: 'With an engineering manager: clear requirements', type: 'technical', minutes: 30 },
        {
          name: 'Design an elevator system + past work',
          type: 'product-sense',
          also: ['behavioural'],
          minutes: 30,
        },
        { name: 'Should Flipkart sell jewellery?', type: 'strategy', minutes: 45 },
      ],
    },
    {
      company: 'Flipkart',
      level: 'APM programme (official)',
      region: 'India',
      kind: 'official',
      when: 'live page',
      src: S.flipkartApm,
      partial: true,
      rounds: [
        { name: 'Two-page solution with a prototype', type: 'written' },
        {
          name: 'Campus interviews: problem solving, product thinking, culture fit',
          type: 'final',
        },
      ],
    },
    {
      company: 'Zomato',
      level: 'PM, entry level, India',
      region: 'India',
      kind: 'reported',
      when: '~Jun 2026 (“5 months ago”)',
      date: '2026-06',
      src: S.acedZomato,
      partial: true,
      rounds: [
        { name: 'Recruiter screen', type: 'recruiter' },
        { name: 'Technical: past products, an API-call estimate, why Blinkit', type: 'technical' },
      ],
    },
    {
      company: 'Atlassian',
      level: 'PM (official careers page)',
      region: 'Global',
      kind: 'official',
      when: 'live page',
      src: S.atlassian,
      partial: true,
      rounds: [
        { name: 'Hiring manager conversation', type: 'screen' },
        { name: 'Three interviews, one per PM pillar', type: 'final' },
        { name: 'Values interview, often by another team', type: 'behavioural' },
      ],
    },
  ],

  rounds: [
    {
      id: 'recruiter',
      type: 'recruiter',
      name: 'Recruiter screen',
      short: 'Recruiter screen',
      minutes: '~30 min',
      tests:
        'Whether your story fits the level and the team: what you shipped, why PM, why this company, and logistics. It is rarely scored hard, but a vague answer ends the process here.',
      doThis: [
        'Have a 60-second walkthrough of your resume that ends with one shipped result and its number.',
        'Ask which rounds you will face and what each one is called. Recruiters tell you; the names map to the cards below.',
        'Ask about the level (APM, PM, Senior PM) before you talk pay.',
      ],
      avoid: [
        'Reading your resume line by line.',
        'Naming a salary number before you know the level.',
      ],
      weak: '“I have five years of experience across many functions and I am passionate about product.”',
      strong:
        '“I am a PM at a payments startup. Last quarter I cut merchant onboarding from 5 days to 2, which lifted activation by 9 points. I want to do that at your scale.”',
      why: 'The strong version gives a role, a decision and a number in three sentences, so the recruiter can place you at a level.',
      evidence: [],
      selfCheck: [
        'My walkthrough is under 90 seconds',
        'It ends with one result and its number',
        'I asked which rounds I will face',
      ],
      practice: { label: 'Motivation and leadership questions', href: '/product-manager#q-fit' },
    },
    {
      id: 'screen',
      type: 'screen',
      name: 'PM or hiring-manager screen',
      short: 'PM / HM screen',
      minutes: '30–60 min',
      tests:
        'A shorter version of the loop: usually one product question and one or two behavioural or metrics questions. Amazon says half of its 60-minute screen is on its Leadership Principles.',
      doThis: [
        'Treat it as a real round: structure, one call, one number.',
        'For a favourite-product question, pick a product you use weekly and a user you can describe.',
        'Prepare two metrics for any product you name: one for success and one guardrail.',
      ],
      avoid: [
        'Spending more than a minute on frameworks before answering.',
        'Answering a 2-minute question in 6 minutes.',
      ],
      weak: '“My favourite product is Spotify because it has a great user experience and good recommendations.”',
      strong:
        '“Spotify, for one user: a commuter who listens in 20-minute bursts. Their pain is skipping. I would test a ‘commute mix’ and judge it on skips per session, with listening time as the guardrail.”',
      why: 'The strong version names a user, a pain, one idea and how it would be measured; that is the whole loop in miniature.',
      evidence: [
        {
          who: 'Amazon (official)',
          quote:
            'Half of the time will be spent on behavioral questions that focus on our Leadership Principles',
          src: S.amazon,
          official: true,
        },
        {
          who: 'Tom Leung, PM interview coach',
          quote: 'If someone asks you a question that expects a 2 minute answer, give it to them.',
          src: S.leung,
        },
      ],
      selfCheck: [
        'I named one user before any idea',
        'I gave a success metric and a guardrail',
        'My answer was about 2 minutes',
      ],
      practice: { label: 'Product sense questions', href: '/product-manager#q-product-sense' },
    },
    {
      id: 'written',
      type: 'written',
      name: 'Take-home, deck or writing exercise',
      short: 'Take-home / writing',
      minutes: 'Days, not minutes',
      tests:
        'Whether you can think on paper: a problem picked well, a solution, what you cut and how you would measure it. Amazon sends a writing assessment before its loop; Flipkart shortlists campus APMs on a two-page solution with a prototype.',
      doThis: [
        'Open with the decision you recommend, then the evidence.',
        'Show what you cut and why; it proves you prioritised.',
        'Add a clickable prototype if allowed; AI tools make one an afternoon of work.',
        'Keep to the page limit. A two-page brief that runs to five reads as poor judgement.',
      ],
      avoid: ['Ten ideas with no ranking.', 'Slides full of frameworks and no numbers.'],
      weak: 'A deck that opens with “Market overview” and lists 12 feature ideas.',
      strong:
        'Page 1 opens: “Recommendation: fix repeat orders for first-month users before anything else. 61% of them never order twice in the sample I pulled; the fix is a reorder card. Success: second-order rate; guardrail: refunds.”',
      why: 'Reviewers skim. The strong version puts the decision, the evidence and the metric in the first lines. (The 61% is an example figure.)',
      evidence: [
        {
          who: 'Flipkart APM programme (official)',
          quote: 'a 2-pager solution with prototype for the problem statement',
          src: S.flipkartApm,
          official: true,
        },
        {
          who: 'Amazon (official)',
          quote: 'they’ll send you a writing assessment.',
          src: S.amazon,
          official: true,
        },
      ],
      selfCheck: [
        'My first two lines state the recommendation',
        'I said what I cut and why',
        'There is one success metric and one guardrail',
        'It fits the page limit',
      ],
    },
    {
      id: 'product-sense',
      type: 'product-sense',
      name: 'Product sense or product design',
      short: 'Product sense',
      minutes: '30–45 min',
      tests:
        'Can you pick a user, find the pain that matters most, and choose one solution you can defend? Interviewers push on why that user and why that idea.',
      doThis: [
        'Spend the first minute on goal and user, out loud: “I will design for X because Y.”',
        'List three pains, rank them, and say why the top one wins.',
        'Pick one solution and defend it with its trade-off; mention the runner-up.',
        'If the interviewer keeps pushing on your idea, take the hint and change course.',
      ],
      avoid: [
        'Jumping to features in the first minute.',
        'Reciting a framework step by step when the question does not need it.',
        'Designing for “everyone”.',
      ],
      weak: '“I would add AI recommendations, a dark mode, social sharing and gamification.”',
      strong:
        '“The goal is more first trips. I will focus on first-time riders in tier-2 cities; their top pain is not knowing the fare. I would show a fixed fare before booking. Risk: we absorb surge; I would cap it at 1.5x.”',
      why: 'The strong version chooses: one goal, one user, one pain, one idea and its cost. That is what interviewers can score.',
      evidence: [
        {
          who: 'Meta PM candidate (L5), rejected',
          quote:
            'They had a specific framework or pathway in mind and wanted me to go down that path',
          src: S.acedMeta,
        },
        {
          who: 'Google APM candidate, Bengaluru, Oct 2025 (question asked)',
          quote:
            'As a PM at google design a product for user which could be used once they checkin at airport.',
          src: S.gdGoogleApm,
        },
      ],
      selfCheck: [
        'I stated the goal and one user in the first minute',
        'I ranked pains and said why the top one wins',
        'I chose one solution and named its trade-off',
        'I said how I would measure it',
      ],
      practice: { label: 'Product sense questions', href: '/product-manager#q-product-sense' },
    },
    {
      id: 'analytics',
      type: 'analytics',
      name: 'Analytics, metrics and execution (incl. root cause)',
      short: 'Analytics / execution',
      minutes: '45–55 min',
      tests:
        'Can you define success for a product, and work out why a number moved? Typical prompts: a north-star metric for a feature, or “comments fell sharply in 24 hours, what next?”.',
      doThis: [
        'For a drop, first check it is real: a tracking change, a release, a holiday, one platform.',
        'Split the number (platform, country, new vs returning) before guessing causes.',
        'Pair every success metric with a guardrail and a counter-metric.',
        'End with a decision: what you would ship, roll back or test.',
      ],
      avoid: [
        'Listing 15 metrics with no ranking.',
        'Naming a cause before checking the data is real.',
      ],
      weak: '“Comments dropped, so maybe users are less engaged. I would look at engagement metrics.”',
      strong:
        '“First I check it is real: any logging change or release in the last day? Then I split by platform and country. If it is only Android after yesterday’s release, I roll back and confirm the number recovers.”',
      why: 'The strong version is an ordered plan that ends in an action. Amazon’s own page asks for metrics or data in every answer.',
      evidence: [
        {
          who: 'Amazon (official)',
          quote:
            'Amazon is a data-driven company, so your answers should include metrics or data where applicable.',
          src: S.amazon,
          official: true,
        },
        {
          who: 'Flipkart campus PM candidate (case round, 45 min)',
          quote: 'How to reduce number of SLA breaches',
          src: S.abFlipkart,
        },
      ],
      selfCheck: [
        'I checked whether the change was real first',
        'I split the number before naming causes',
        'Each metric had a guardrail',
        'I ended with a decision',
      ],
      practice: { label: 'Metrics and root-cause questions', href: '/product-manager#q-metrics' },
    },
    {
      id: 'strategy',
      type: 'strategy',
      name: 'Strategy and estimation',
      short: 'Strategy / estimation',
      minutes: '45 min',
      tests:
        'Can you take a position on a market and size it? Prompts reported in 2025–26: “Imagine you are the CPO of Zoom”, “Should Flipkart sell jewellery?”.',
      doThis: [
        'Lead with a thesis in one sentence, then defend it.',
        'For sizing, write the formula first (e.g. users × share who would use it × uses per user per day), fill numbers you can justify, then sanity-check against one figure you know.',
        'Name what would change your mind.',
      ],
      avoid: [
        'Jumping into feature ideas before a point of view.',
        'Precise-looking numbers with no stated assumption.',
      ],
      weak: '“Zoom could add AI features, improve chat, and partner with more companies.”',
      strong:
        '“My thesis: Zoom’s edge is reliable video for people outside your company. I would defend that, not chase Teams on chat: invest in guest-friendly meetings and webinars, and judge it on external meeting minutes.”',
      why: 'The strong version takes a side first; the Google candidate who failed this round said a thesis was what was missing.',
      evidence: [
        {
          who: 'Google Senior PM candidate, rejected',
          quote: 'In hindsight I should’ve started with a clear thesis on Zoom’s core value prop.',
          src: S.acedGoogle,
        },
        {
          who: 'Barron Ernst, CPO and hiring manager',
          quote: 'Inability to prioritize and make trade-offs',
          src: S.ernst,
        },
      ],
      selfCheck: [
        'My first sentence was a thesis',
        'I wrote the sizing formula before numbers',
        'I said what would change my mind',
      ],
      practice: {
        label: 'Estimation and strategy questions',
        href: '/product-manager#q-estimation-strategy',
      },
    },
    {
      id: 'technical',
      type: 'technical',
      name: 'Technical round, and the AI prototype (“vibecoding”) round',
      short: 'Technical / AI build',
      minutes: '30–55 min',
      tests:
        'Can engineers work with you: clear requirements, sensible trade-offs, and enough system knowledge to discuss them. In some AI teams this is now a build round: a rough spec, any tool, a working prototype by the end.',
      doThis: [
        'Write a short spec before building: user, the one job, what “done” means.',
        'Say your trade-offs out loud (speed vs accuracy, build vs buy).',
        'In a build round, narrate as you go and test the AI’s output; the judgement is graded, not the prompts.',
        'Practise one end-to-end prototype with Claude, Cursor or Lovable before the day.',
      ],
      avoid: [
        'Pretending to know an architecture you do not.',
        'Building for 40 minutes with no spec, then demoing something that does not run.',
      ],
      weak: '“I would just ask the AI to build the app and then show it.”',
      strong:
        '“Spec first: one user (a store manager), one job (see today’s low-stock items), done = a list sorted by days of stock left. I will build that, test it with 5 fake rows, then add the alert if time allows.”',
      why: 'A spec with a test turns a demo into evidence that you can lead engineers, which is what this round scores.',
      evidence: [
        {
          who: 'Microsoft PM candidate, AI org, Redmond, Oct 2026',
          quote:
            'they gave like a rough spec and expected a working prototype by the end using whatever tool i wanted.',
          src: S.gdMicrosoft,
        },
        {
          who: 'Flipkart campus PM candidate (round with an engineering manager)',
          quote:
            'Aim was to figure out if the engineering team(developers) can get clear requirements and communication from me.',
          src: S.abFlipkart,
        },
      ],
      selfCheck: [
        'I wrote a spec before building',
        'I named at least one trade-off',
        'I tested the output with sample data',
      ],
      practice: { label: 'Technical and AI questions', href: '/product-manager#q-technical-ai' },
    },
    {
      id: 'behavioural',
      type: 'behavioural',
      name: 'Behavioural and leadership',
      short: 'Behavioural',
      minutes: '30–55 min',
      tests:
        'How you lead without authority: conflict, failure, influence, a hard call. Amazon and Microsoft both ask for STAR-shaped answers; Atlassian says it listens for outcomes and “we”.',
      doThis: [
        'Write 6 stories: conflict, failure, data decision, influence, ambiguity, a launch.',
        'Spend most of each answer on what you did, and end on the result and what you learned.',
        'Give the outcome in numbers: what it moved, not how long it took.',
        'Credit the team (“we”), and be clear which decision was yours.',
      ],
      avoid: [
        'A story with no result, or a result with no number.',
        'Playing it safe: interviewers want the real stakes.',
        'Blaming a manager or another team.',
      ],
      weak: '“We had a disagreement with engineering about the timeline, but we worked through it and launched.”',
      strong:
        '“Engineering wanted six more weeks for a better model; sales had a fixed partner date. I asked what ‘better’ meant in numbers, and we launched the current model to 10% with a rule to pause if complaints passed a threshold. We hit the date and switched models three weeks later.”',
      why: 'The strong version shows the conflict, your move, the safeguard and the result. That maps to STAR without sounding like a template.',
      evidence: [
        {
          who: 'Atlassian (official)',
          quote: 'Instead, tell us how that project was received or what it moved year-over-year.',
          src: S.atlassian,
          official: true,
        },
        {
          who: 'Microsoft (official)',
          quote: 'We recommend you use the STAR(R) model when answering questions.',
          src: S.microsoft,
          official: true,
        },
        {
          who: 'Amazon PM candidate, Seattle, May 2026',
          quote:
            'was staying way too high-level with my impact instead of clearly explaining the exact data points',
          src: S.gdAmazon,
        },
      ],
      selfCheck: [
        'The story has a real conflict or risk',
        'Most of the time went on what I did',
        'The result has a number',
        'I said what I learned',
      ],
      practice: { label: 'Motivation and leadership questions', href: '/product-manager#q-fit' },
    },
    {
      id: 'final',
      type: 'final',
      name: 'Bar raiser, hiring manager or director final',
      short: 'Final / bar raiser',
      minutes: '30–55 min',
      tests:
        'A senior check on the whole loop. Interviewers may read earlier notes and press on your weakest answer; Amazon’s bar raiser and Meta’s hiring-manager round sit here.',
      doThis: [
        'Before it, write down your weakest earlier answer and a better version of it.',
        'Have two questions about the team’s hardest problem this year.',
        'Restate why this role, in one sentence tied to something you shipped.',
      ],
      avoid: [
        'Treating it as a chat because it is “the last one”.',
        'Repeating a story the panel already heard, unchanged.',
      ],
      weak: '“I think the earlier rounds went well, so I do not have anything to add.”',
      strong:
        '“In execution I picked weekly actives as the metric; on reflection I would lead with retention of new teams, because that is what your growth goal depends on.”',
      why: 'Fixing your own weak spot shows judgement, and the Microsoft candidate reported exactly that kind of follow-up from a director.',
      evidence: [
        {
          who: 'Microsoft PM candidate, Redmond, Oct 2026',
          quote: 'Got an AA round at the end with a director.',
          src: S.gdMicrosoft,
        },
        {
          who: 'Meta PM candidate (referral)',
          quote: 'The process felt collaborative rather than adversarial.',
          src: S.gdMeta,
        },
      ],
      selfCheck: [
        'I improved my weakest earlier answer',
        'I asked about the team’s hardest problem',
        'My “why this role” was one sentence',
      ],
    },
  ],

  india: [
    {
      title: 'Campus APM (Flipkart): the written round decides the shortlist',
      body: 'Flipkart’s APM process is campus-only and runs 8–10 weeks: a workshop, then a two-page solution with a prototype that decides who is interviewed, then a buddy programme with mock cases that is not scored, then the campus interviews on problem solving, product thinking and culture fit.',
      src: S.flipkartApm,
    },
    {
      title: 'Indian consumer companies lean on root cause and estimation',
      body: 'Reported Flipkart loops include root-cause, product design, strategy and metrics rounds; a campus round asked how to cut delivery SLA breaches, and another asked whether Flipkart should sell jewellery. A Zomato candidate was asked to estimate API calls for an app.',
      src: S.gdFlipkart,
    },
    {
      title: 'Expect an engineer in the room',
      body: 'One Flipkart campus round was run by an engineering manager to judge whether developers would get clear requirements from you. Bring one spec you wrote and be ready to explain a trade-off you made with engineers.',
      src: S.abFlipkart,
    },
    {
      title: 'Google APM Bengaluru starts with a product case',
      body: 'A candidate reported a first round of a product case (a product for travellers after airport check-in), with several more rounds for those who passed.',
      src: S.gdGoogleApm,
    },
  ],

  decision: [
    {
      you: 'A campus candidate applying to APM programmes in India',
      focus: 'The written round (two-pager + prototype), then product sense and estimation',
      firstStep: 'Write one two-page teardown with a prototype this week and get it critiqued',
      effort: 'High',
    },
    {
      you: 'An engineer or analyst moving into PM',
      focus: 'Product sense and behavioural: show decisions and users, not tasks',
      firstStep: 'Rewrite three of your projects as decision, evidence, result',
      effort: 'Medium',
    },
    {
      you: 'A PM moving to Google, Meta or Amazon',
      focus:
        'Analytics / execution and strategy at their bar; Amazon: Leadership Principles in every answer',
      firstStep: 'Practise 5 metric-drop and 3 strategy prompts out loud, timed',
      effort: 'High',
    },
    {
      you: 'Applying to an early-stage startup',
      focus:
        'A take-home or product case presented to the founder, and how you work with engineers',
      firstStep: 'Use their product for a week and bring a one-page teardown',
      effort: 'Medium',
    },
    {
      you: 'Applying to an AI product team',
      focus: 'The technical round, possibly a build round: spec, prototype, evaluation',
      firstStep:
        'Build one small prototype end to end with an AI tool and test it with sample data',
      effort: 'Medium',
    },
  ],

  week: [
    {
      when: '7 days before',
      items: [
        'Ask the recruiter for the names of your rounds',
        'Write 6 behavioural stories with a number in each',
        'Pick 3 products you know well and write a success metric and a guardrail for each',
      ],
    },
    {
      when: '3 days before',
      items: [
        'Do one timed product-sense and one metric-drop answer out loud',
        'Score both with the checklists on this page',
        'Do a full mock interview out loud',
      ],
    },
    {
      when: 'The day before',
      items: [
        'Read the company’s own prep page and its values or principles',
        'Prepare two questions about the team’s hardest problem',
        'Test camera, microphone and the meeting link',
      ],
    },
    {
      when: 'After each round',
      items: [
        'Write down the question and your weakest moment within an hour',
        'Draft a better version for the final round',
      ],
    },
  ],

  sources: [
    S.amazon,
    S.microsoft,
    S.atlassian,
    S.flipkartApm,
    S.gdAmazon,
    S.gdMicrosoft,
    S.gdGoogleApm,
    S.gdMeta,
    S.gdFlipkart,
    S.abFlipkart,
    S.acedGoogle,
    S.acedMeta,
    S.acedZomato,
    S.ernst,
    S.leung,
  ],

  faqs: [
    {
      q: 'How many rounds are in a product manager interview?',
      a: 'In the {nFull} complete loops we mapped, candidates faced {minRounds} to {maxRounds} rounds including the recruiter call (median {medRounds}). Amazon’s own page describes a 60-minute phone screen, a writing assessment and a loop of five 55-minute interviews.',
    },
    {
      q: 'What are the most common mistakes in PM interviews?',
      a: 'In the reports we opened: answers that stay broad, impact with no data, following a framework instead of a clear thesis, and talking about “I” with no team. Hiring managers add weak prioritisation and not knowing the business’s key metrics.',
    },
    {
      q: 'Should I use the STAR method in a PM interview?',
      a: 'Yes for behavioural questions. Amazon tells candidates to use STAR, and Microsoft recommends STAR(R), which adds Reflection. Keep the situation short and spend most of the time on what you did and the result.',
    },
    {
      q: 'Do product managers have to code in the interview?',
      a: 'Usually no. Some loops have a technical round, and some AI teams now run a build round: a Microsoft candidate in October 2026 was given a rough spec and asked for a working prototype using any tool. Write a short spec first and test what you build.',
    },
    {
      q: 'How is the APM interview different in India?',
      a: 'Campus programmes like Flipkart’s shortlist on a written two-page solution with a prototype, then interview on problem solving, product thinking and culture fit. Reported Indian loops lean on root-cause and estimation rounds.',
    },
    {
      q: 'How do I practise for a PM interview?',
      a: 'Answer real questions out loud, timed, and score each answer with the checklist for its round on this page. Then do a full mock interview so you practise under pressure, and fix your weakest round first.',
    },
  ],
}

export default PRODUCT_MANAGER_TIPS
