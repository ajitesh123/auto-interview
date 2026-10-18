export interface BehavioralQuestionData {
  slug: string
  questionText: string
  searchVolumeTier: string
  metaTitle: string
  metaDescription: string
  psychologyInsight: string
  framework: string
  goodSampleAnswer: {
    roleContext: string
    script: string
    breakdown: {
      step: string
      content: string
    }[]
  }
  badAnswerExample: {
    script: string
    critique: string
  }
  proTips: string[]
  commonMistakes: string[]
  faqs: {
    q: string
    a: string
  }[]
}

export interface RoleQuestionData {
  slug: string
  roleName: string
  category: string
  metaTitle: string
  metaDescription: string
  heroTitle: string
  heroDescription: string
  topQuestions: {
    id: string
    question: string
    category: 'Technical' | 'Behavioral' | 'System Design' | 'Strategy' | 'Situational'
    difficulty: 'Entry' | 'Mid' | 'Senior'
    keyTakeaway: string
    modelAnswer: string
    frameworkTip: string
  }[]
  interviewTips: string[]
  faqs: {
    q: string
    a: string
  }[]
}

export const BEHAVIORAL_QUESTIONS: Record<string, BehavioralQuestionData> = {
  'tell-me-about-yourself': {
    slug: 'tell-me-about-yourself',
    questionText: 'Tell Me About Yourself',
    searchVolumeTier: '450,000+ Searches/Mo',
    metaTitle: 'How to Answer "Tell Me About Yourself" (2026 Example Answers)',
    metaDescription:
      'Proven formula to answer "Tell me about yourself" in job interviews. Word-for-word scripts for software engineers, product managers, sales, and freshers.',
    psychologyInsight:
      'Interviewers ask this first to evaluate three things: communication conciseness (can you tell a compelling 90-second story without rambling?), career intentionality (did you stumble into this field or choose it?), and relevance (how does your past solve their immediate problem?). It is NOT an invitation to recite your entire chronological resume.',
    framework: 'Present -> Past -> Future (90-Second Framework)',
    goodSampleAnswer: {
      roleContext: 'Mid-to-Senior Professional Example (Software / Product / Sales)',
      script:
        '"Currently, I am a Software Engineer at TechCorp, where I specialize in building high-throughput microservices in Node.js and AWS, most recently optimizing our billing pipeline to cut p99 latency by 42%. Before this, I spent three years at StartupX, where I helped scale our core data infrastructure from 10k to 500k daily active users. What drew me to your company specifically is your recent expansion into real-time voice AI—I’ve spent the last six months building low-latency WebSocket systems, and I’m eager to bring that distributed systems experience to your engineering team."',
      breakdown: [
        {
          step: '1. Present (30 Seconds)',
          content: 'State current role, core technical scope, and one massive quantified win.',
        },
        {
          step: '2. Past (30 Seconds)',
          content:
            'Highlight 1-2 relevant prior experiences that demonstrate upward trajectory and foundational skills.',
        },
        {
          step: '3. Future & Why Them (30 Seconds)',
          content:
            'Directly bridge why this specific open role is the exact logical next chapter in your career.',
        },
      ],
    },
    badAnswerExample: {
      script:
        '"Well, I was born in Chicago, went to high school there, and then went to college where I studied computer science because I liked video games. After college I got a job at a small agency doing maintenance, and then I left because the management was terrible. In my spare time I like hiking and playing guitar."',
      critique:
        'Red flags: Begins too far in the past, shares irrelevant personal hobbies, and criticizes past management, signaling a difficult team dynamic.',
    },
    proTips: [
      'Strictly cap your answer between 75 and 90 seconds (approximately 180 to 220 spoken words).',
      'End with a proactive handoff: "That’s a high-level overview, but I’d be glad to dive deeper into any of those projects."',
      'Never recite your resume line by line; focus exclusively on the highlight reel.',
    ],
    commonMistakes: [
      'Rambling past the 2-minute mark (interviewer attention drops 60% after 90 seconds).',
      'Starting with childhood or high school education.',
      'Failing to mention why you want THIS specific company.',
    ],
    faqs: [
      {
        q: 'How long should the "Tell me about yourself" answer be?',
        a: 'The sweet spot is 75 to 90 seconds. Anything under 45 seconds feels underprepared, while answers over 2 minutes cause interviewers to lose focus.',
      },
      {
        q: 'How should a fresher or college graduate answer "Tell me about yourself"?',
        a: 'Use the Education -> Project -> Aspiration formula: Highlight your degree, your flagship capstone or internship project with real metrics, and why this specific entry-level role matches your skills.',
      },
    ],
  },

  'what-is-your-greatest-weakness': {
    slug: 'what-is-your-greatest-weakness',
    questionText: 'What Is Your Greatest Weakness?',
    searchVolumeTier: '300,000+ Searches/Mo',
    metaTitle: 'How to Answer "What Is Your Greatest Weakness?" (2026 Guide)',
    metaDescription:
      'Authentic, high-scoring answers to "What is your greatest weakness?". How to answer without humblebragging ("I work too hard") or disqualifying yourself.',
    psychologyInsight:
      'This question is a test of self-awareness and continuous self-improvement. Hiring managers despise humblebrags ("I’m a perfectionist", "I work too many weekends"). They want to see that you can candidly identify a blind spot and have already put automated systems or habits in place to manage it.',
    framework: 'Real Operational Weakness + Concrete Mitigation Habit + Measurable Improvement',
    goodSampleAnswer: {
      roleContext: 'Engineering / Operations / Business Professional',
      script:
        '"Early in my career, I had a tendency to dive straight into coding or execution without delegating or checking in until the project was 90% complete. In one instance, this led to scope creep because I hadn\'t surfaced an architectural blocker early. To address this, I completed an agile project management course and instituted a weekly asynchronous stand-up cadence using Jira and Loom. Now, I explicitly break deliverables into 3-day milestone checks, which has significantly improved cross-team visibility and kept my last four major releases 100% on schedule."',
      breakdown: [
        {
          step: '1. Genuine, Non-Fatal Weakness',
          content:
            'Pick a real habit or past tendency (e.g. over-communicating via text vs calling, hesitation to delegate, impatience with manual tasks).',
        },
        {
          step: '2. Tangible Remediation System',
          content:
            'Detail the concrete tools, courses, or habits you adopted to neutralize the weakness.',
        },
        {
          step: '3. Proof of Improvement',
          content: 'Demonstrate how your current output reflects that this is actively managed.',
        },
      ],
    },
    badAnswerExample: {
      script:
        '"My biggest weakness is that I care too much about my work and I’m a perfectionist. I often stay at the office until midnight because I can’t stop until everything is flawless."',
      critique:
        'Humblebrag clich\u00e9. Signals lack of genuine self-awareness and poor boundary management, and recruiters hear it 10 times a week.',
    },
    proTips: [
      'Never choose a weakness that is a core requirement of the job description (e.g., an accountant saying "I am bad with spreadsheets").',
      'Spend 20% of your time acknowledging the weakness and 80% explaining your active remediation system.',
    ],
    commonMistakes: [
      'Saying "I don\'t have any major weaknesses" (immediate disqualification for arrogance).',
      'Confessing a fatal character flaw (e.g. "I have trouble getting along with difficult colleagues").',
    ],
    faqs: [
      {
        q: 'Can I say "public speaking" is my greatest weakness?',
        a: 'Yes, provided the role is primarily technical or individual contributor (e.g. backend engineer, data analyst) and you explain how you are practicing (e.g. presenting monthly sprint demos or joining Toastmasters).',
      },
    ],
  },

  'why-should-we-hire-you': {
    slug: 'why-should-we-hire-you',
    questionText: 'Why Should We Hire You?',
    searchVolumeTier: '220,000+ Searches/Mo',
    metaTitle: 'How to Answer "Why Should We Hire You?" (2026 Winning Scripts)',
    metaDescription:
      'Stand out from hundreds of applicants with the 3-Pillar Value Proposition. Tested answers for "Why should we hire you?" across tech, sales, and management.',
    psychologyInsight:
      'The interviewer is asking: "Why you over the other 4 candidates with identical resumes on paper?" You win by aligning your unique intersection of technical competence, cultural adaptability, and immediate business ROI.',
    framework: 'The 3-Pillar Pitch: Core Competence + Proven Track Record + Immediate Day-30 ROI',
    goodSampleAnswer: {
      roleContext: 'Product / Sales / Tech Candidate Example',
      script:
        '"You should hire me because of the intersection of three things: First, I bring four years of hands-on experience solving the exact latency and database throughput challenges you are facing as you scale from 10k to 100k concurrent users. Second, at my previous company, I didn’t just write code—I helped cut infrastructure costs by $140,000 while maintaining 99.99% uptime. And third, having reviewed your Q3 product roadmap, I can onboard and ship your upcoming enterprise SSO and analytics integrations by Day 45 without requiring senior engineering hand-holding."',
      breakdown: [
        {
          step: 'Pillar 1: Exact Skill Overlap',
          content: 'Map your core skills directly to their primary job description requirement.',
        },
        {
          step: 'Pillar 2: Quantified Commercial Proof',
          content:
            'Provide verifiable metric evidence of value creation (revenue, savings, efficiency).',
        },
        {
          step: 'Pillar 3: Fast Time-to-Value',
          content:
            'Explain how you will deliver results in your first 30-90 days with minimal ramp friction.',
        },
      ],
    },
    badAnswerExample: {
      script:
        '"You should hire me because I am a very hardworking, passionate person and I really need this job. I learn very fast and I promise I won’t let you down."',
      critique:
        'Completely subjective, desperation-coded, and provides zero competitive differentiation or commercial reason to hire.',
    },
    proTips: [
      'Reference specific goals mentioned by the interviewer earlier in the conversation.',
      'Adopt a consultative mindset: you are a solution to their operational problem.',
    ],
    commonMistakes: [
      'Focusing on what the job does for you instead of what you do for the business.',
      'Listing generic personality traits (hard worker, friendly, motivated) instead of hard accomplishments.',
    ],
    faqs: [
      {
        q: 'How does "Why should we hire you" differ from "Why do you want to work here"?',
        a: '"Why should we hire you" is about your value to them (your skills, ROI, track record). "Why do you want to work here" is about their appeal to you (their mission, product, engineering culture).',
      },
    ],
  },

  'why-do-you-want-to-work-here': {
    slug: 'why-do-you-want-to-work-here',
    questionText: 'Why Do You Want to Work Here?',
    searchVolumeTier: '200,000+ Searches/Mo',
    metaTitle: 'How to Answer "Why Do You Want to Work Here?" (2026 Guide)',
    metaDescription:
      'Prove your company research and cultural alignment. Word-for-word scripts for "Why do you want to work here?" that impress hiring managers.',
    psychologyInsight:
      'Recruiters want to filter out "spray-and-pray" applicants who submitted 200 generic applications. They want candidates who understand their business model, respect their product roadmap, and will stay long enough to deliver positive return on investment.',
    framework: 'Product/Mission Admiration + Strategic Challenge Alignment + Career Synergy',
    goodSampleAnswer: {
      roleContext: 'General Professional Example',
      script:
        '"I’ve followed your product evolution closely over the past two years, especially your recent pivot to native voice AI agents. Most companies in this space are still relying on legacy cascaded pipelines with 2-second walkie-talkie lag, but your team was one of the first to implement sub-400ms duplex audio streaming. That focus on technical excellence mirrors my own background building low-latency WebSockets. I don’t just want another engineering role; I want to work with the team setting the benchmark for the entire industry."',
      breakdown: [
        {
          step: '1. Specific Product Evidence',
          content: 'Cite a specific recent feature, architecture decision, or corporate milestone.',
        },
        {
          step: '2. Alignment of Philosophy',
          content:
            'Connect their execution style to your personal engineering or professional standards.',
        },
        {
          step: '3. Long-Term Commitment',
          content:
            'Demonstrate that this role is a deliberate, highly considered career destination.',
        },
      ],
    },
    badAnswerExample: {
      script:
        '"I want to work here because your company has great benefits, allows remote work, and is very close to where I live. Also, the compensation package looks very competitive."',
      critique:
        'Focuses 100% on self-serving perks. Signals that the candidate would leave tomorrow for an extra $5k or closer office.',
    },
    proTips: [
      'Read their company blog, recent press releases, and CEO podcasts before the interview.',
      'Reference a specific challenge they are trying to solve right now.',
    ],
    commonMistakes: [
      'Giving an answer so generic it could apply to any company in the industry.',
      'Mentioning salary, vacation time, or perks as your primary motivation.',
    ],
    faqs: [
      {
        q: 'What if I am interviewing with a small startup that has little public information?',
        a: 'Focus on their founding team, their core value proposition in the market, and the agility of joining an early-stage team where you can make an immediate 0-to-1 impact.',
      },
    ],
  },

  'where-do-you-see-yourself-in-5-years': {
    slug: 'where-do-you-see-yourself-in-5-years',
    questionText: 'Where Do You See Yourself in 5 Years?',
    searchVolumeTier: '180,000+ Searches/Mo',
    metaTitle: 'How to Answer "Where Do You See Yourself in 5 Years?" (2026)',
    metaDescription:
      'Realistic, ambitious example answers for "Where do you see yourself in 5 years?". How to demonstrate retention and career progression.',
    psychologyInsight:
      'Interviewers don’t expect you to predict the future. They are testing two things: Are your career expectations realistic? And does this role naturally lead to where you want to go, or will you quit out of boredom in 9 months?',
    framework:
      'Skill Mastery (Years 1-2) -> Strategic Ownership (Years 3-4) -> Leadership/Mentorship (Year 5)',
    goodSampleAnswer: {
      roleContext: 'Career Progression Example',
      script:
        '"Over the next two years, my focus is on becoming a subject-matter expert in your core distributed streaming architecture and mastering your deployment pipeline. By years three and four, as I gain deeper domain intuition, I see myself taking ownership of multi-service architectural decisions and mentoring junior engineers. In five years, whether via a Staff Engineering path or Technical Lead track, I want to be recognized as someone who reliably transforms ambiguous business problems into scalable, production-grade infrastructure."',
      breakdown: [
        {
          step: 'Phase 1: Deep Competence',
          content: 'Focus on mastering the immediate job and delivering high team output.',
        },
        {
          step: 'Phase 2: Expanded Scope',
          content:
            'Move from individual contributor tasks to cross-team architectural or commercial ownership.',
        },
        {
          step: 'Phase 3: Leadership Leverage',
          content: 'Show commitment to lifting team standards and mentoring future cohorts.',
        },
      ],
    },
    badAnswerExample: {
      script:
        '"In five years, I hope to have your job, or maybe have launched my own SaaS startup."',
      critique:
        'Saying "I want your job" is an awkward cliché, and announcing plans to launch your own business tells the company you will leave soon.',
    },
    proTips: [
      'Focus on the skills, responsibility, and impact you want to acquire rather than specific job titles.',
      'Make sure the progression you describe actually exists inside their organizational structure.',
    ],
    commonMistakes: [
      'Revealing plans to change fields entirely (e.g. telling an engineering manager you plan to attend law school in 2 years).',
      'Saying "I have no idea, I take things day by day" (signals lack of ambition).',
    ],
    faqs: [
      {
        q: 'Should I specify whether I want management vs individual contributor (IC) track?',
        a: 'State your current inclination while expressing open flexibility: "I am excited by deep technical architecture, but I also enjoy mentoring and am open to leadership as the team scales."',
      },
    ],
  },

  'describe-a-conflict-with-coworker': {
    slug: 'describe-a-conflict-with-coworker',
    questionText: 'Describe a Conflict with a Coworker and How You Handled It',
    searchVolumeTier: '110,000+ Searches/Mo',
    metaTitle: 'How to Answer "Conflict with a Coworker" (STAR Method Examples)',
    metaDescription:
      'Master the conflict resolution behavioral interview question. Tested STAR framework examples focusing on empathy, data-driven compromise, and results.',
    psychologyInsight:
      'Conflict is inevitable in any high-performing team. Hiring managers want to see emotional maturity: Do you take disagreements personally? Do you run to HR or gossip? Or can you depersonalize the issue, lean on data, and find a professional compromise that serves the customer?',
    framework:
      'STAR: Situation -> Task -> Action (Empathy + Data) -> Result (De-escalation + Long-Term Relationship)',
    goodSampleAnswer: {
      roleContext: 'Cross-Functional Team Example',
      script:
        '"On a recent product launch, our lead UX designer and I had a fundamental disagreement about whether to mandate a 3-step phone verification before checkout. The designer felt it created excessive drop-off, while from a fraud perspective, I was concerned about spam accounts. Instead of debating back and forth on Slack, I scheduled a 20-minute 1-on-1 coffee chat. I listened to their usability data first, acknowledged the friction concern, and proposed an A/B compromise: run the 3-step verification only on suspicious IP risk scores while keeping frictionless 1-step checkout for clean users. We launched the experiment together: fraud fell by 68% with zero statistically significant conversion loss, and the designer and I went on to co-lead the next two quarterly releases together."',
      breakdown: [
        {
          step: 'Situation & Task',
          content:
            'Set a legitimate professional disagreement about product/engineering (never interpersonal drama).',
        },
        {
          step: 'Action (Private & Empathetic)',
          content:
            'Took the discussion offline, listened actively, and used objective data/experiments to resolve it.',
        },
        {
          step: 'Result & Ongoing Trust',
          content:
            'Delivered measurable business metrics and proved the working relationship became stronger.',
        },
      ],
    },
    badAnswerExample: {
      script:
        '"A coworker was constantly missing deadlines, which made me look bad. I confronted them in a group meeting and reported them to our manager. The manager agreed with me and put them on a PIP."',
      critique:
        'Red flag: Public shaming, lack of empathy, and inability to handle conflict peer-to-peer.',
    },
    proTips: [
      'Never choose a conflict regarding ethics, harassment, or personal lifestyle.',
      'Always emphasize that you respect the other person’s perspective and sought common ground.',
    ],
    commonMistakes: [
      'Pretending you have never experienced workplace conflict (unbelievable and evasive).',
      'Portraying yourself as 100% blameless hero and your colleague as incompetent.',
    ],
    faqs: [
      {
        q: 'What is the best type of conflict to discuss in an interview?',
        a: 'A technical, prioritization, or architectural disagreement where both sides had valid points, resolved through empirical data, testing, or structured compromise.',
      },
    ],
  },

  'tell-me-about-a-time-you-failed': {
    slug: 'tell-me-about-a-time-you-failed',
    questionText: 'Tell Me About a Time You Failed',
    searchVolumeTier: '90,000+ Searches/Mo',
    metaTitle: 'How to Answer "Tell Me About a Time You Failed" (STAR Method)',
    metaDescription:
      'How to answer the failure interview question without sabotaging your candidacy. Real examples showing accountability, learning, and rebound.',
    psychologyInsight:
      'Hiring managers know everyone fails. They want to see accountability (do you own your mistakes or blame coworkers and clients?) and resilience (did you learn a permanent operational lesson that prevents recurrence?).',
    framework:
      'STAR: Situation -> The Mistake (Full Accountability) -> Immediate Remediation -> Permanent Systemic Fix',
    goodSampleAnswer: {
      roleContext: 'Operational / Engineering / Sales Example',
      script:
        '"During my first year as an engineering lead, I underestimated the database migration complexity for an enterprise client and committed to a Friday evening deployment deadline. Because we hadn\'t stress-tested historical indexing edge cases, the migration stalled, causing two hours of unexpected downtime on Saturday morning. I immediately took full ownership, alerted our VP of Engineering, and rolled back to the stable snapshot. Once systems were restored, I authored a blameless post-mortem, instituted mandatory staging rehearsal runs with synthetic data, and banned Friday afternoon production migrations. In the two years since, our team has executed 28 major migrations with zero unplanned customer downtime."',
      breakdown: [
        {
          step: '1. Genuine Failure & Ownership',
          content:
            'Directly describe a real miscalculation and explicitly state: "I took full ownership."',
        },
        {
          step: '2. Immediate Crisis Response',
          content: 'Explain how you stayed calm and remediated the issue quickly.',
        },
        {
          step: '3. Permanent Institutional Learning',
          content:
            'Detail the automated safeguard or team policy you established that solved the root cause forever.',
        },
      ],
    },
    badAnswerExample: {
      script:
        '"I was on a project where the client changed their mind at the last second and the junior developer didn’t write the unit tests properly, so the launch failed. It wasn’t really my fault, but I had to fix their mess."',
      critique:
        'Zero accountability, blames junior teammates, and signals high toxicity in team environments.',
    },
    proTips: [
      'Choose a failure that happened at least 1-2 years ago so you have proven runway of subsequent success.',
      'Spend 70% of your time on the fix and the permanent post-mortem process improvements.',
    ],
    commonMistakes: [
      'Choosing a fake failure ("My failure was that I worked too hard and got exhausted").',
      'Choosing a catastrophic ethical or legal violation.',
    ],
    faqs: [
      {
        q: 'Can I discuss a failure that cost the company money?',
        a: 'Yes, if you own it completely and explain the permanent checks, automated testing, or financial safeguards you instituted that saved far more money down the road.',
      },
    ],
  },

  'what-is-your-greatest-strength': {
    slug: 'what-is-your-greatest-strength',
    questionText: 'What Is Your Greatest Strength?',
    searchVolumeTier: '150,000+ Searches/Mo',
    metaTitle: 'How to Answer "What Is Your Greatest Strength?" (2026 Guide)',
    metaDescription:
      'The definitive guide to answering "What is your greatest strength?". How to back up your strengths with quantitative proof and storytelling.',
    psychologyInsight:
      'Interviewers don’t want a grocery list of 10 generic adjectives ("hardworking, punctual, team player"). They want ONE superpower that is directly relevant to their open role, backed up by an undeniable quantitative story.',
    framework: 'One Superpower + Real-World Pressure Test + Quantified Business Outcome',
    goodSampleAnswer: {
      roleContext: 'Technical / Strategic Strength Example',
      script:
        '"My greatest strength is translating complex, ambiguous business problems into simplified, highly reliable technical architectures. For example, at my last company, our operations team was losing 18 hours each week reconciling mismatched billing entries between Stripe and Salesforce. Instead of applying band-aids, I mapped the entire event-stream data flow, discovered an asynchronous race condition in our webhook listener, and designed an idempotent queue handler in Redis. That single intervention eliminated 100% of the manual reconciliation errors and saved the company over 900 hours of manual labor in 2025."',
      breakdown: [
        {
          step: '1. Clear Superpower Stated Upfront',
          content: 'Lead with a single, memorable capability.',
        },
        {
          step: '2. Real-World Pressure Test',
          content: 'Introduce a high-friction problem the team was experiencing.',
        },
        {
          step: '3. Measurable Value Metric',
          content: 'Conclude with exact hours, dollars, or performance metrics unlocked.',
        },
      ],
    },
    badAnswerExample: {
      script:
        '"I have many strengths—I’m very friendly, I never give up, I am good with people, I am good with computers, and I always arrive 15 minutes early."',
      critique:
        'Scattered list of table-stakes expectations that fails to leave any lasting impression of competence.',
    },
    proTips: [
      'Pick the strength that is most heavily weighted in the top 3 bullet points of their job description.',
    ],
    commonMistakes: [
      'Listing 5 different strengths instead of going deep on one definitive superpower.',
    ],
    faqs: [
      {
        q: 'Should I provide metrics when describing my strength?',
        a: 'Always. A strength without metrics is just an opinion; a strength backed by numbers is verified proof.',
      },
    ],
  },

  'why-are-you-leaving-your-current-job': {
    slug: 'why-are-you-leaving-your-current-job',
    questionText: 'Why Are You Leaving Your Current Job?',
    searchVolumeTier: '130,000+ Searches/Mo',
    metaTitle: 'How to Answer "Why Are You Leaving Your Job?" (2026 Scripts)',
    metaDescription:
      'Professional, diplomatic scripts to answer "Why are you leaving your job?". How to frame career transitions positively without badmouthing employers.',
    psychologyInsight:
      'Recruiters ask this to identify flight risks, workplace friction, or termination issues. The golden rule is: ALWAYS run TOWARD a new opportunity, never run AWAY from an old employer.',
    framework: 'Gratitude for Past Growth -> Logical Ceiling Reached -> Pull to New Opportunity',
    goodSampleAnswer: {
      roleContext: 'Career Transition Example',
      script:
        '"I’ve had a fantastic three years at TechCorp, where I grew from an individual contributor to leading our core API team and shipping our flagship enterprise product. However, as that system reached operational maturity, our focus shifted from architectural innovation to routine maintenance. I’m at a stage in my career where I thrive most in high-growth environments tackling 0-to-1 scaling challenges—which is why your current expansion into distributed voice agents aligns so perfectly with what I want to conquer next."',
      breakdown: [
        {
          step: '1. Gratitude & Accomplishment',
          content: 'Frame your current role as a successful, completed chapter of growth.',
        },
        {
          step: '2. Natural Skill Plateau / Ceiling',
          content: 'Explain that you have outgrown the available challenges internally.',
        },
        {
          step: '3. Clear Attraction to New Company',
          content: 'Explain why their specific challenges re-ignite your highest motivation.',
        },
      ],
    },
    badAnswerExample: {
      script:
        '"Honestly, the management at my current company is terrible, my boss micromanager, and they refused to give me a raise after I worked 60-hour weeks."',
      critique:
        'Criticizing past management guarantees rejection; interviewers will assume you are difficult to manage and will badmouth them next.',
    },
    proTips: [
      'Keep your tone upbeat, forward-looking, and completely free of resentment.',
      'Never mention salary or compensation as your primary reason for leaving.',
    ],
    commonMistakes: [
      'Ventilating emotional frustration about past leadership or workplace politics.',
      'Lying about being laid off—always frame corporate restructurings diplomatically and objectively.',
    ],
    faqs: [
      {
        q: 'How should I explain being laid off in a corporate downsizing?',
        a: 'Be direct, calm, and objective: "Due to broader market conditions and corporate restructuring in Q4, my department was downsized by 25%. I am proud of the systems I built there, and I am excited to bring those learnings to my next team."',
      },
    ],
  },

  'how-do-you-handle-stress-pressure': {
    slug: 'how-do-you-handle-stress-pressure',
    questionText: 'How Do You Handle Stress and High-Pressure Situations?',
    searchVolumeTier: '95,000+ Searches/Mo',
    metaTitle: 'How to Answer "How Do You Handle Stress?" (2026 Guide)',
    metaDescription:
      'Best answers to "How do you handle stress and pressure?". Real frameworks for prioritization, proactive communication, and composure under fire.',
    psychologyInsight:
      'Every startup and enterprise faces unexpected outages, compressed deadlines, and shifting priorities. Recruiters want to know if you freeze, panic, or lash out—or if you have a structured operational framework to triage chaos.',
    framework: 'Emotional Composure + Triage Prioritization + Proactive Stakeholder Communication',
    goodSampleAnswer: {
      roleContext: 'Engineering / Project Delivery Example',
      script:
        '"When high-pressure situations arise, my first step is to depersonalize the urgency and break the panic cycle by conducting an objective triage. For instance, when a critical payment integration went down during a holiday marketing blitz, instead of rushing fixes, I immediately set up a single war room channel, assigned clear roles (one person investigating logs, one communicating to customer support), and established 15-minute status check-ins. By prioritizing the root cause and keeping stakeholders informed with realistic timelines, we restored transaction flow in 28 minutes with zero panic. Outside of work, I maintain a strict daily morning gym routine, which keeps my baseline stress low during high-stakes workdays."',
      breakdown: [
        {
          step: '1. Structured Triage Process',
          content: 'Detail your methodical protocol for categorizing urgent vs important tasks.',
        },
        {
          step: '2. Team Communication Under Pressure',
          content:
            'Explain how you create clarity for teammates and manage executive expectations.',
        },
        {
          step: '3. Healthy Personal Decompression Habits',
          content:
            'Mention positive routines (exercise, meditation, sleep discipline) that maintain long-term stamina.',
        },
      ],
    },
    badAnswerExample: {
      script:
        '"I don’t ever get stressed. Pressure doesn’t affect me at all, I just drink 6 cups of coffee and push through until 3 AM."',
      critique:
        'Unrealistic claim of invulnerability paired with unsustainable burnout behavior that concerns hiring managers.',
    },
    proTips: [
      'Demonstrate that your reaction to stress is structure, not panic.',
      'Show that you communicate MORE during a crisis, not less.',
    ],
    commonMistakes: [
      'Admitting that you become irritable or withdraw from team communication under pressure.',
      'Claiming you never experience stress (signals dishonesty or lack of real experience).',
    ],
    faqs: [
      {
        q: 'What is the best framework for answering stress questions?',
        a: 'The Triage & Communicate model: Explain how you isolate the core problem, rank tasks by business impact, and maintain transparent status updates with team leads.',
      },
    ],
  },
}

export const ROLE_INTERVIEW_QUESTIONS: Record<string, RoleQuestionData> = {
  'software-engineer': {
    slug: 'software-engineer',
    roleName: 'Software Engineer',
    category: 'Engineering',
    metaTitle: 'Software Engineer Interview Questions (2026 Tested & Answers)',
    metaDescription:
      'Top 15 Software Engineer interview questions and model answers. System design, distributed caching, concurrency, and behavioral engineering questions.',
    heroTitle: 'Software Engineer Interview Questions & Model Answers',
    heroDescription:
      'Master the technical and behavioral screening bar for FAANG, scale-up, and enterprise engineering teams. Includes architectural deep dives and 1-click voice mock simulator practice.',
    topQuestions: [
      {
        id: 'swe-1',
        question: 'How do you design a scalable rate limiter for distributed microservices?',
        category: 'System Design',
        difficulty: 'Senior',
        keyTakeaway: 'Use Token Bucket or Sliding Window Log with Redis clusters.',
        modelAnswer:
          'For a distributed rate limiter handling millions of requests per second, I recommend the Sliding Window Counter algorithm backed by Redis. To handle distributed clock drift and concurrent race conditions, execute Lua scripts atomically in Redis. If high availability is prioritized over strict limit compliance, implement local in-memory token buckets with periodic asynchronous synchronization to a central Redis cluster.',
        frameworkTip:
          'Explain algorithm choices (Token Bucket vs Leaky Bucket vs Sliding Window) -> Datastore selection (Redis) -> Concurrency & Atomic execution (Lua scripts).',
      },
      {
        id: 'swe-2',
        question:
          'What is the difference between optimistic and pessimistic locking in relational databases?',
        category: 'Technical',
        difficulty: 'Mid',
        keyTakeaway:
          'Optimistic relies on version checks (high-read); pessimistic locks rows upfront (high-write collision).',
        modelAnswer:
          'Pessimistic locking explicitly locks the target database row (`SELECT ... FOR UPDATE`) upon read, blocking concurrent transactions until the transaction commits. It is ideal for heavy write collision scenarios like inventory reservations. Optimistic locking avoids database-level locks; instead, it checks a record version number before updating. If the version changed, the transaction aborts and retries. Optimistic locking is vastly superior for high-read, low-contention web applications.',
        frameworkTip:
          'Define both -> Compare performance under contention -> Provide concrete use case for each.',
      },
      {
        id: 'swe-3',
        question:
          'Describe a time you diagnosed and fixed a severe performance bottleneck or memory leak in production.',
        category: 'Behavioral',
        difficulty: 'Mid',
        keyTakeaway:
          'STAR story focusing on profiling tools (APM, heap dumps) and root cause verification.',
        modelAnswer:
          'In a Node.js microservice handling 4,000 requests/sec, our servers were experiencing gradual memory exhaustion and crashing every 36 hours. Instead of randomly changing code, I took V8 heap snapshots in staging and analyzed memory allocation timelines in Chrome DevTools. I discovered an uncleaned event listener on our WebSocket connection handler holding references to disconnected socket objects. After refactoring the listener lifecycle and running a 12-hour soak test, memory consumption stabilized at a flat 320MB, eliminating all production pod restarts.',
        frameworkTip:
          'Use STAR: Situation -> Diagnostic methodology (never guess!) -> Root cause -> Long-term telemetry verification.',
      },
    ],
    interviewTips: [
      'Always clarify requirements and system scale (RPS, read-to-write ratio) before proposing an architectural solution.',
      'State tradeoffs explicitly: every engineering decision trades latency, consistency, or infrastructure cost.',
    ],
    faqs: [
      {
        q: 'What is the most common reason software engineers fail technical interviews?',
        a: 'Jumping straight into writing code without clarifying edge cases, scale constraints, or explaining their thought process out loud to the interviewer.',
      },
    ],
  },

  'product-manager': {
    slug: 'product-manager',
    roleName: 'Product Manager',
    category: 'Product',
    metaTitle: 'Product Manager Interview Questions (2026 Frameworks & Answers)',
    metaDescription:
      'Top Product Manager interview questions across product sense, execution, metrics, and estimation. Frameworks from Google and Meta PM interviewers.',
    heroTitle: 'Product Manager Interview Questions & Frameworks',
    heroDescription:
      'Prepare for APM, Senior PM, and Director product interviews. Master product design, metrics troubleshooting, prioritization, and technical trade-offs.',
    topQuestions: [
      {
        id: 'pm-1',
        question:
          'Our core engagement metric dropped by 8% week-over-week. How would you diagnose the root cause?',
        category: 'Strategy',
        difficulty: 'Senior',
        keyTakeaway:
          'Systematic diagnosis: external factors -> internal bugs -> segment breakdown -> funnel analysis.',
        modelAnswer:
          'I would diagnose an 8% drop through a 4-step framework: First, rule out data integrity and telemetry bugs (did tracking SDKs break? Was there a logging outage?). Second, examine external events (holidays, seasonality, competitor launches, regional internet outages). Third, inspect internal releases (did we deploy a broken app update, change an onboarding step, or run a conflicting experiment?). Fourth, segment the metric by platform (iOS vs Android), geography, user cohort (new vs returning), and marketing acquisition channel to isolate where the degradation originated.',
        frameworkTip:
          'State the triage tree: Data integrity -> External events -> Internal releases -> Granular segment cuts.',
      },
      {
        id: 'pm-2',
        question: 'Design an automated luggage tracking feature for an international airline app.',
        category: 'Technical',
        difficulty: 'Mid',
        keyTakeaway:
          'Identify user personas -> Map pain points -> Prioritize MVP features -> Define success metrics.',
        modelAnswer:
          'I begin by identifying the core user: an anxious international traveler carrying critical items who experiences acute stress during tight flight connections. The primary pain point is informational asymmetry: "Did my bag make the transfer?" For our MVP, I would prioritize real-time milestone push notifications (Baggage Scanned onto Flight -> Transferred at Hub -> Arrived at Carousel #4) paired with Bluetooth beacon / AirTag integration. Success would be measured by a 50% decrease in airport baggage desk inquiry volume and a 15-point increase in customer post-flight CSAT.',
        frameworkTip:
          'User segment -> Pain point isolation -> 3 prioritized solutions -> North Star metric.',
      },
    ],
    interviewTips: [
      'Never propose a solution before deeply defining the user persona and their primary friction point.',
      'Always tie feature proposals back to measurable commercial outcomes (retention, CAC, ARPU).',
    ],
    faqs: [
      {
        q: 'Which framework is best for product design questions?',
        a: 'The CIRCLES method: Comprehend context, Identify user personas, Report user needs, Cut through prioritization, List solutions, Evaluate tradeoffs, Summarize recommendation.',
      },
    ],
  },

  'sales-sdr': {
    slug: 'sales-sdr',
    roleName: 'Sales & SDR Executive',
    category: 'Sales & GTM',
    metaTitle: 'SDR & Sales Interview Questions (2026 Cold Call Scripts)',
    metaDescription:
      'Top SDR and sales interview questions. How to pass live cold call roleplay screens, handle gatekeepers, and demonstrate quota drive.',
    heroTitle: 'SDR & Sales Interview Questions & Roleplay Scripts',
    heroDescription:
      'Master the sales interview process for high-growth tech companies. Practice live cold call roleplay scenarios and prove your outbound prospecting engine.',
    topQuestions: [
      {
        id: 'sdr-1',
        question: 'Roleplay: Sell me this pen / Cold call me right now as an enterprise prospect.',
        category: 'Situational',
        difficulty: 'Mid',
        keyTakeaway: 'Do not feature dump. Ask discovery questions to uncover immediate pain.',
        modelAnswer:
          '"Thanks for taking my call, Sarah. The reason I reached out isn\'t to sell you software today, but because I noticed your sales team just hired 15 new SDRs on LinkedIn. Most VP of Sales we talk to during rapid hiring tell us their biggest headache is that new reps burn through expensive enterprise leads while practicing objections live on the phone. Out of curiosity, how are your new reps currently getting certified before dialing tier-1 accounts?"',
        frameworkTip:
          'Acknowledge & Validate -> State hyper-relevant observation -> Ask open-ended discovery question.',
      },
      {
        id: 'sdr-2',
        question:
          'What do you do when a prospect says "We already use your competitor and we are happy with them"?',
        category: 'Behavioral',
        difficulty: 'Mid',
        keyTakeaway:
          'A.D.D. Framework: Acknowledge vendor choice -> Deflect rip-and-replace -> Differentiate.',
        modelAnswer:
          '"I completely respect that—[Competitor] is a reputable platform and many of our best customers were using them before speaking with us. We definitely wouldn\'t expect you to rip and replace anything today. The reason enterprise leaders chat with us mid-contract is to benchmark their call connect rates and turn-taking latency so they have leverage before renewal season. Would you be opposed to a brief 10-minute benchmarking conversation next Tuesday?"',
        frameworkTip:
          "Disarm prospect hostility -> Confirm you aren't asking them to switch today -> Propose low-friction benchmark.",
      },
    ],
    interviewTips: [
      'In sales interviews, energy, vocal pacing, and active listening are evaluated more than script memorization.',
      'Always close the interview: at the end of the conversation, ask "Based on our discussion today, is there anything that would prevent you from recommending me to the next round?"',
    ],
    faqs: [
      {
        q: 'What is the biggest red flag in an SDR interview?',
        a: 'Feature dumping during a live roleplay instead of asking discovery questions about the prospect’s workflow.',
      },
    ],
  },

  'data-analyst': {
    slug: 'data-analyst',
    roleName: 'Data Analyst',
    category: 'Data & Analytics',
    metaTitle: 'Data Analyst Interview Questions (2026 SQL & Answers)',
    metaDescription:
      'Top Data Analyst interview questions. Advanced SQL window functions, statistical hypothesis testing, metric definition, and case studies.',
    heroTitle: 'Data Analyst Interview Questions & Model Answers',
    heroDescription:
      'Crack the data analyst technical screen. Master SQL window functions, cohort retention modeling, business case studies, and dashboard visualization design.',
    topQuestions: [
      {
        id: 'da-1',
        question: 'How do you calculate 30-day user retention using SQL window functions?',
        category: 'Technical',
        difficulty: 'Senior',
        keyTakeaway:
          'Self-join or window function comparing signup timestamp against activity timestamps.',
        modelAnswer:
          'To calculate 30-day retention, I first create a Common Table Expression (CTE) defining each user’s initial signup date using `MIN(activity_date) OVER(PARTITION BY user_id)`. Then, I compute the date difference (`DATEDIFF`) between the subsequent activity dates and that cohort signup date. Finally, I group by signup cohort week/month and calculate the count of distinct active users at Day 30 divided by the initial cohort size.',
        frameworkTip:
          'State CTE approach -> Window function syntax -> Grouping and ratio calculation.',
      },
      {
        id: 'da-2',
        question:
          'How do you explain the difference between correlation and causation to a non-technical executive?',
        category: 'Behavioral',
        difficulty: 'Mid',
        keyTakeaway: 'Use intuitive real-world analogies (ice cream sales and shark attacks).',
        modelAnswer:
          '"I explain it using the classic summer analogy: ice cream sales and shark attacks both spike during July and August. They are strongly correlated, but eating ice cream doesn’t cause shark attacks—the hidden underlying variable is warm weather driving more people to the beach. In business, if marketing email opens correlate with high purchases, we must run a controlled A/B holdout test to prove whether the emails drove the purchase or if active loyal buyers were simply more likely to open our emails anyway."',
        frameworkTip:
          'Simple relatable analogy -> Business application -> Controlled experimentation methodology.',
      },
    ],
    interviewTips: [
      'Practice writing advanced SQL syntax by hand: CTEs, RANK() vs DENSE_RANK(), and self-joins.',
      'Always link technical queries back to commercial business impact.',
    ],
    faqs: [
      {
        q: 'What SQL questions are asked most frequently for data analysts?',
        a: 'Finding the second highest salary (DENSE_RANK), calculating rolling 7-day revenue (SUM OVER ROWS BETWEEN), and cohort retention matrices.',
      },
    ],
  },

  fresher: {
    slug: 'fresher',
    roleName: 'Fresher & Entry-Level Candidate',
    category: 'Students & Graduates',
    metaTitle: 'Top HR Interview Questions for Freshers (2026 Answers)',
    metaDescription:
      'Top 20 HR interview questions and answers for freshers and college graduates. Master campus placement questions, project walkthroughs, and confidence.',
    heroTitle: 'Top HR Interview Questions & Answers for Freshers',
    heroDescription:
      'Designed for college students and entry-level graduates. Ace technical, HR, and behavioral campus placement interviews with proven high-scoring answers.',
    topQuestions: [
      {
        id: 'fresher-1',
        question: 'Why should a company hire you when you have zero industry work experience?',
        category: 'Behavioral',
        difficulty: 'Entry',
        keyTakeaway:
          'Highlight practical hands-on capstone projects, academic rigor, and fast learning agility.',
        modelAnswer:
          '"While I may not have corporate full-time tenure yet, I bring substantial hands-on project experience where I built and deployed a production full-stack application using React, Node, and PostgreSQL as our capstone. Unlike experienced candidates who may have ingrained habits, I bring high energy, complete adaptability to your team’s coding standards, and a verified track record of learning new technologies quickly, as proven by mastering Docker and AWS during my semester internship."',
        frameworkTip:
          'Acknowledge honestly -> Counter with practical project deliverables -> Emphasize fast ramp speed.',
      },
      {
        id: 'fresher-2',
        question:
          'Walk me through your final year college project and your individual contribution.',
        category: 'Technical',
        difficulty: 'Entry',
        keyTakeaway:
          'Problem statement -> Your exact technical role -> Challenges overcome -> Final outcome.',
        modelAnswer:
          '"For our final year engineering capstone, my 4-person team built an automated hospital bed availability tracker. My specific responsibility was engineering the backend REST API in Node.js and designing the PostgreSQL database schema. The biggest technical challenge was handling concurrent updates from 12 ward nurses simultaneously without race conditions, which I resolved by implementing row-level locking. The system achieved sub-150ms latency across 500 simulated devices and won 2nd place in our college symposium."',
        frameworkTip:
          'Problem -> Individual contribution -> Technical bottleneck overcome -> Verifiable result.',
      },
    ],
    interviewTips: [
      'Never say "I don’t know" and stop talking. Say: "I haven’t worked with that specific tool yet, but based on my experience with [Related Tool], here is how I would approach it."',
      'Dress professionally and maintain good eye contact—confidence and humility are the top two hiring traits for freshers.',
    ],
    faqs: [
      {
        q: 'What do campus placement interviewers look for most in freshers?',
        a: 'Foundational problem-solving fundamentals, clear communication without hesitation, humility, and genuine enthusiasm for the company.',
      },
    ],
  },

  'devops-engineer': {
    slug: 'devops-engineer',
    roleName: 'DevOps & Cloud Engineer',
    category: 'Engineering & Cloud',
    metaTitle: 'DevOps Interview Questions (2026 Kubernetes & CI/CD)',
    metaDescription:
      'Top DevOps and Cloud Engineer interview questions. Zero-downtime deployments, Kubernetes cluster troubleshooting, Terraform IaC, and SRE incident triage.',
    heroTitle: 'DevOps & Cloud Engineer Interview Questions',
    heroDescription:
      'Prepare for senior DevOps, Platform Engineer, and SRE interviews. Master Kubernetes container orchestration, GitOps CI/CD pipelines, and high-availability cloud architecture.',
    topQuestions: [
      {
        id: 'devops-1',
        question:
          'How do you design a zero-downtime deployment strategy for high-traffic microservices on Kubernetes?',
        category: 'System Design',
        difficulty: 'Senior',
        keyTakeaway:
          'Use Blue-Green or Canary releases with automated ArgoCD / Istio traffic shifting and health probes.',
        modelAnswer:
          'For zero-downtime Kubernetes deployments, I implement a Canary release pattern using Argo Rollouts combined with Istio service mesh. First, properly configure `readinessProbe` and `livenessProbe` with graceful `preStop` lifecycle hooks so inflight requests drain safely before pods terminate. During rollout, route 5% of ingress traffic to the canary replica. We run automated Prometheus metric checks for 5 minutes monitoring HTTP 5xx error rates and p99 latency. If error rates remain below 0.05%, traffic steps up to 25%, 50%, and 100%; otherwise, automated instant rollback occurs without user-facing downtime.',
        frameworkTip:
          'Traffic shifting mechanism (Canary/Blue-Green) -> Pod lifecycle & probe readiness -> Automated telemetry rollback gate.',
      },
      {
        id: 'devops-2',
        question:
          'A production alert fires reporting 95% CPU across your node cluster. How do you systematically triage it?',
        category: 'Technical',
        difficulty: 'Senior',
        keyTakeaway:
          'Triage methodology: Check pod resource hogs (`top pods`), verify HPA autoscaling, inspect recent deployments.',
        modelAnswer:
          'First, I check whether the high CPU is impacting user-facing SLA (error rates and latency). Second, I run `kubectl top pods -A --sort-by=cpu` and inspect Grafana dashboards to identify if one specific namespace or rogue container has runaway CPU consumption or an unconstrained thread loop. Third, I verify if Cluster Autoscaler and Horizontal Pod Autoscaler (HPA) are properly spinning up additional compute nodes or if we hit cloud quota limits. If a runaway bad release caused a spin loop, I execute an immediate rollback while pulling thread and heap dumps for post-incident RCA.',
        frameworkTip:
          'User impact assessment -> Telemetry drill-down -> Resource constraints check -> Safe remediation & RCA.',
      },
    ],
    interviewTips: [
      'In DevOps interviews, always emphasize automated recovery (self-healing, IaC) over manual SSH fixes.',
      'Always mention observability pillars: Metrics (Prometheus), Logs (Loki/ELK), and Traces (OpenTelemetry).',
    ],
    faqs: [
      {
        q: 'What is the biggest difference between a DevOps Engineer and an SRE?',
        a: 'DevOps focuses primarily on delivery velocity and CI/CD automation, while Site Reliability Engineers (SRE) apply software engineering principles directly to infrastructure availability, latency, and SLA error budgets.',
      },
    ],
  },

  'full-stack-developer': {
    slug: 'full-stack-developer',
    roleName: 'Full Stack Developer',
    category: 'Engineering',
    metaTitle: 'Full Stack Developer Interview Questions (2026 Answers)',
    metaDescription:
      'Master Full Stack Developer interviews. React, Next.js, Node.js backend architectures, REST vs GraphQL, state management, and web security questions.',
    heroTitle: 'Full Stack Developer Interview Questions & Answers',
    heroDescription:
      'Ace technical interviews covering modern frontend (React/Next.js/TypeScript) and robust distributed backend APIs, databases, and microservices.',
    topQuestions: [
      {
        id: 'fs-1',
        question:
          'How do you optimize rendering performance and prevent waterfalls in modern React / Next.js web apps?',
        category: 'Technical',
        difficulty: 'Mid',
        keyTakeaway:
          'Use React Server Components (RSC), parallel data fetching, streaming SSR with Suspense, and dynamic imports.',
        modelAnswer:
          'In modern full stack Next.js applications, I eliminate network request waterfalls by fetching data at the server component level in parallel using `Promise.all()` rather than cascading `useEffect` calls in client components. For heavy UI widgets, I implement React Suspense with streaming SSR so critical layout and text paint immediately while slower async components stream in. Furthermore, I wrap client-heavy bundles (like charting libraries) in Next.js dynamic imports (`next/dynamic`) with `ssr: false` to keep initial JavaScript bundles under 80kB.',
        frameworkTip:
          'Server vs Client separation -> Parallel fetching -> Streaming with Suspense -> Bundle code-splitting.',
      },
      {
        id: 'fs-2',
        question:
          'How do you protect modern web applications against Cross-Site Scripting (XSS) and CSRF attacks?',
        category: 'Technical',
        difficulty: 'Mid',
        keyTakeaway:
          'Content Security Policy (CSP), sanitization, `SameSite=Strict` cookies, and anti-CSRF token verification.',
        modelAnswer:
          'To prevent XSS, modern React inherently escapes JSX bindings, but when rendering user-submitted HTML, I sanitize input with DOMPurify and enforce a strict Content Security Policy (CSP) header restricting script execution to cryptographic nonces. For Cross-Site Request Forgery (CSRF), I store authentication JWTs in `HttpOnly`, `Secure`, `SameSite=Lax` or `SameSite=Strict` cookies, preventing JavaScript access and cross-domain malicious form submissions. For state-changing REST endpoints, I mandate standard anti-CSRF token verification headers.',
        frameworkTip:
          'Define XSS vs CSRF -> Frontend prevention (escaping, CSP) -> Backend authentication & cookie security.',
      },
    ],
    interviewTips: [
      'Demonstrate end-to-end architectural mastery: from the CSS layout paint to the database query plan.',
      'Show clear understanding of when to use Server-Side Rendering (SSR) vs Static Site Generation (SSG) vs Client Rendering.',
    ],
    faqs: [
      {
        q: 'What do engineering leads evaluate most in full stack candidates?',
        a: 'The ability to diagnose bugs across the entire stack—from a browser rendering reflow to an unindexed database query—without getting stuck in silos.',
      },
    ],
  },

  'data-scientist': {
    slug: 'data-scientist',
    roleName: 'Data Scientist & ML Specialist',
    category: 'Data & Analytics',
    metaTitle: 'Data Science Interview Questions (2026 Machine Learning)',
    metaDescription:
      'Top Data Scientist interview questions and mathematical explanations. Feature engineering, overfitting, class imbalance, model evaluation, and LLM fine-tuning.',
    heroTitle: 'Data Scientist & Machine Learning Interview Questions',
    heroDescription:
      'Master data science and ML engineering interviews. Dive into algorithmic fundamentals, statistical inference, feature engineering, and production model serving.',
    topQuestions: [
      {
        id: 'ds-1',
        question:
          'How do you handle severe class imbalance (e.g. 99.8% negative vs 0.2% positive) in machine learning classification?',
        category: 'Technical',
        difficulty: 'Senior',
        keyTakeaway:
          'Never use accuracy; use PR-AUC/F1, cost-sensitive learning (Focal Loss), SMOTE, or anomaly detection.',
        modelAnswer:
          'When dealing with extreme class imbalance like credit card fraud, first eliminate raw accuracy as an evaluation metric and switch to Precision-Recall AUC (PR-AUC) or F-beta score depending on the business cost of false negatives. At the algorithm level, I implement cost-sensitive learning by adjusting class weights in the loss function (or using Focal Loss). At the data level, rather than naive random oversampling, I use SMOTE with Tomek links or treat the problem as an unsupervised anomaly detection task using Isolation Forests or autoencoders.',
        frameworkTip:
          'Metric selection first (never accuracy) -> Algorithmic weighting -> Resampling techniques -> Anomaly detection alternatives.',
      },
      {
        id: 'ds-2',
        question:
          'What is the bias-variance tradeoff and how do L1 (Lasso) vs L2 (Ridge) regularizations combat overfitting?',
        category: 'Technical',
        difficulty: 'Mid',
        keyTakeaway:
          'Bias = underfitting error; Variance = sensitivity to training noise. L1 enforces sparsity; L2 penalizes large weights.',
        modelAnswer:
          'The bias-variance tradeoff reflects the tension between model simplicity (bias) and flexibility (variance). High bias causes underfitting, while high variance causes the model to memorize training noise, leading to poor generalization. Regularization constrains model complexity: L2 regularization (Ridge) adds the squared sum of coefficients to the loss function, shrinking weights toward zero and distributing influence smoothly. L1 regularization (Lasso) adds the absolute sum, driving non-essential coefficients completely to zero, functioning as automated feature selection.',
        frameworkTip:
          'Define bias vs variance -> Explain overfitting -> Contrast L1 (sparsity/feature selection) vs L2 (weight shrinkage).',
      },
    ],
    interviewTips: [
      'Always discuss model evaluation in the context of business impact (e.g., cost of a false positive vs a false negative).',
      'Be prepared to write clean vectorized Python code using NumPy and Pandas from memory.',
    ],
    faqs: [
      {
        q: 'What is the most common coding question for data scientists?',
        a: 'Manipulating complex DataFrames using groupby, aggregations, windowing, and implementing algorithms (like K-Means or gradient descent) from scratch.',
      },
    ],
  },

  'account-executive': {
    slug: 'account-executive',
    roleName: 'Account Executive (Enterprise Sales)',
    category: 'Sales & GTM',
    metaTitle: 'Account Executive Interview Questions (2026 MEDDPICC)',
    metaDescription:
      'Top Account Executive (AE) interview questions and answers. Master complex enterprise sales discovery, multi-stakeholder MEDDPICC alignment, and demo closing.',
    heroTitle: 'Account Executive Interview Questions & Discovery Scripts',
    heroDescription:
      'Prepare for Mid-Market and Enterprise AE interviews. Master MEDDPICC sales qualification, multi-threaded consensus building, and live mock demo roleplays.',
    topQuestions: [
      {
        id: 'ae-1',
        question:
          'Walk me through how you qualify and advance a $100k+ enterprise opportunity using MEDDPICC.',
        category: 'Strategy',
        difficulty: 'Senior',
        keyTakeaway:
          'Identify Economic Buyer, quantify Pain Metrics, establish Decision Criteria, and test Champion strength.',
        modelAnswer:
          'In enterprise deals, I qualify relentlessly using MEDDPICC. First, I identify the quantifiable Metric: what business problem are we solving in dollars or saved hours? Second, I identify the Economic Buyer with discretionary budget authority—not just a friendly evaluator. Third, I align with an internal Champion and test their credibility: will they share internal procurement roadmaps and set up meetings with the CFO? If a deal lacks a verified Champion or documented Decision Process by Stage 3, it is not a forecastable deal; it is a pipeline hope.',
        frameworkTip:
          'Define MEDDPICC components -> Focus on Champion testing and Economic Buyer -> Contrast real deal vs pipeline clutter.',
      },
      {
        id: 'ae-2',
        question:
          'Roleplay: A prospect goes silent for two weeks after you sent a high-tier proposal. How do you re-engage them without sounding desperate?',
        category: 'Situational',
        difficulty: 'Mid',
        keyTakeaway:
          'Provide new proprietary value or leverage the "permission to close file" email; never say "just checking in".',
        modelAnswer:
          "\"I never send a 'just checking in' or 'bumping this' message because it offers zero value. Instead, I send an email titled: 'Permission to close your file, John?'. The body says: 'John, usually when I don't hear back after our contract review, it means priorities have shifted or you’ve decided to put this on hold—which is completely fine. Should I close out this project so I stop cluttering your inbox, or is this still a Q4 priority?' This creates reverse psychological leverage: 80% of serious buyers immediately reply to clarify where the contract actually stands in legal.\"",
        frameworkTip:
          'Explain why standard follow-ups fail -> Script high-converting re-engagement -> Psychology of letting them say no.',
      },
    ],
    interviewTips: [
      'In AE interviews, interviewers are looking for consultative problem solvers who control the sales cycle, not aggressive pitchmen.',
      'Always have 3 detailed case studies ready: your largest closed deal, your hardest multi-stakeholder turnaround, and a deal you lost and what you learned.',
    ],
    faqs: [
      {
        q: 'What is the most critical question an AE should ask during an interview?',
        a: '"What percentage of reps hit quota last year, what is the average sales cycle length, and what percentage of pipeline is outbound-sourced vs inbound SDR-generated?"',
      },
    ],
  },

  'customer-success-manager': {
    slug: 'customer-success-manager',
    roleName: 'Customer Success Manager',
    category: 'Sales & GTM',
    metaTitle: 'Customer Success Manager Interview Questions (2026 Answers)',
    metaDescription:
      'Top Customer Success Manager (CSM) interview questions. Churn prevention, Net Retention Rate (NRR), onboarding playbooks, and Executive Business Reviews (EBR).',
    heroTitle: 'Customer Success Manager Interview Questions',
    heroDescription:
      'Master CSM and Senior Account Manager interview rounds. Learn proven frameworks for driving Net Retention Rate (NRR), handling red-account escalations, and QBRs.',
    topQuestions: [
      {
        id: 'csm-1',
        question:
          'How do you turn around an at-risk enterprise customer whose daily active usage dropped 40% in the last 60 days?',
        category: 'Situational',
        difficulty: 'Senior',
        keyTakeaway:
          'Acknowledge issue -> Identify root cause (personnel turnover vs feature friction) -> 30-day recovery plan -> Executive alignment.',
        modelAnswer:
          "When telemetry flags a 40% drop in active users, I do not send an automated email; I immediately reach out to our primary point of contact and executive sponsor. In 70% of enterprise drops, the root cause is internal stakeholder turnover where the original buyer left. I schedule an emergency 15-minute diagnostic call: 'We noticed your team's weekly workflow volume has shifted. We want to ensure you are getting maximum ROI before your executive review.' I present a 30-day tailored re-onboarding plan, run two high-impact team enablement workshops, and set up a weekly milestone check until telemetry recovers to baseline.",
        frameworkTip:
          'Data detection -> Root cause isolation -> 30-day recovery blueprint -> Executive accountability.',
      },
      {
        id: 'csm-2',
        question: 'What is the single most important metric for a SaaS Customer Success Manager?',
        category: 'Strategy',
        difficulty: 'Mid',
        keyTakeaway: 'Net Revenue Retention (NRR) and Gross Revenue Retention (GRR).',
        modelAnswer:
          'While CSAT and NPS measure sentiment, the definitive commercial health metric for a modern enterprise CSM is Net Revenue Retention (NRR). High CSAT means nothing if a customer quietly down-tiers at renewal. Top CSMs drive NRR above 115% by proactively identifying expansion opportunities (upselling more seats or higher-tier API tiers) based on product usage milestones, ensuring that account growth far outpaces unavoidable logo churn.',
        frameworkTip:
          'Distinguish sentiment (CSAT/NPS) from revenue retention (NRR/GRR) -> Explain how proactive CSMs drive account expansion.',
      },
    ],
    interviewTips: [
      'Frame yourself as a strategic business advisor rather than a reactive customer support rep.',
      'Show that you measure success through customer business outcomes (ROI, time saved), not just software feature usage.',
    ],
    faqs: [
      {
        q: 'What is the biggest difference between Customer Support and Customer Success?',
        a: 'Customer Support is reactive and resolves transactional technical issues; Customer Success is proactive, strategic, and focused on driving long-term customer business outcomes and net revenue retention.',
      },
    ],
  },
}
