/**
 * ATS resume checkers + what real ATS products do, for /blog/best-ats-resume-checker-2025.
 * Every vendor fact was read on the vendor's own page on CHECKED (links in each row). Prices are
 * as written on those pages; currency differs by region (Enhancv showed EUR, no page showed INR).
 * Counts used in prose and figures are computed below, never typed by hand.
 */

export const CHECKED = '16 Nov 2026'

export type Tri = 'yes' | 'no' | 'partial' | 'unknown'

export type Checker = {
  id: string
  name: string
  url: string // the checker page we opened
  pricingUrl?: string
  ours?: boolean
  free: string // what you can do without paying, in the vendor's terms
  freeRepeat: boolean // a free check you can run again (not a one-off trial)
  noSignup: Tri // can you see a result without an account or email
  needs: string
  jobPost: Tri // compares with a pasted or saved job post
  score: string // what the number is called
  rewrite: Tri // suggests rewritten lines (AI or otherwise)
  linkedin: Tri
  paid: string // paid plans as written
  threeMonths: number | null // USD, cheapest way to cover a 3-month search (null = not published or not USD)
  threeMonthsBasis: string
  watch?: string
}

export const CHECKERS: Checker[] = [
  {
    id: 'ours',
    name: 'Resume Keyword Checker (this site)',
    url: '/resume-keyword-checker',
    ours: true,
    free: 'Free, unlimited, runs in your browser',
    freeRepeat: true,
    noSignup: 'yes',
    needs: 'Paste a job post and your resume. Nothing is uploaded',
    jobPost: 'yes',
    score:
      'No score: lists must-have, mentioned and nice-to-have skills you miss, plus 8 format checks',
    rewrite: 'no',
    linkedin: 'no',
    paid: 'None',
    threeMonths: 0,
    threeMonthsBasis: 'Free',
    watch:
      'Our product. Rules, not AI: it will not rewrite lines or judge how well a bullet is written.',
  },
  {
    id: 'jobscan',
    name: 'Jobscan',
    url: 'https://www.jobscan.co/resume-scanner',
    pricingUrl: 'https://www.jobscan.co/video-jobscan-premium',
    free: '“5 scans per month” with a free account',
    freeRepeat: true,
    noSignup: 'no',
    needs: 'Free account',
    jobPost: 'yes',
    score: 'Match Rate (%)',
    rewrite: 'yes',
    linkedin: 'yes',
    paid: 'Premium, monthly or quarterly; the price is shown only inside the app, so we could not read it',
    threeMonths: null,
    threeMonthsBasis: 'Not shown before sign-up',
    watch:
      'Its own page says the Match Rate is “a Jobscan visualization tool, not a score assigned by the employer’s ATS”.',
  },
  {
    id: 'resumeworded',
    name: 'Resume Worded',
    url: 'https://resumeworded.com/',
    pricingUrl: 'https://resumeworded.com/get-pro',
    free: 'Free “Score My Resume” review; re-upload as often as you like. Limits of the free plan are not printed',
    freeRepeat: true,
    noSignup: 'no',
    needs: 'Free account with email confirmation; PDF or DOCX up to 2 MB',
    jobPost: 'yes',
    score: 'Resume score out of 100',
    rewrite: 'yes',
    linkedin: 'yes',
    paid: '$49/month; $99 every 3 months; $229 a year',
    threeMonths: 99,
    threeMonthsBasis: 'Quarterly plan, “billed as $99 every 3 months”',
  },
  {
    id: 'enhancv',
    name: 'Enhancv Resume Checker',
    url: 'https://enhancv.com/resources/resume-checker/',
    pricingUrl: 'https://www.enhancv.com/de/preise/',
    free: 'Free checker, “27 crucial checks”; the builder’s free plan lasts 7 days',
    freeRepeat: true,
    noSignup: 'unknown',
    needs: 'Upload PDF or DOCX up to 2 MB; the page does not say whether an account is needed',
    jobPost: 'yes',
    score: 'A score, while the page also says “there’s no such thing as an ATS score”',
    rewrite: 'yes',
    linkedin: 'partial',
    paid: '€59.00 every 3 months (German pricing page; the US page showed broken “€NaN” prices)',
    threeMonths: null,
    threeMonthsBasis: '€59.00 a quarter (EUR, not converted)',
  },
  {
    id: 'teal',
    name: 'Teal',
    url: 'https://www.tealhq.com/tool/resume-job-description-match',
    pricingUrl: 'https://www.tealhq.com/pricing',
    free: '“Basic Resume Keyword Matching” and the top 5 keywords; limited AI (5 achievements, 2 summaries, 1 cover letter)',
    freeRepeat: true,
    noSignup: 'no',
    needs: 'Free account; the job is saved in its job tracker first',
    jobPost: 'yes',
    score: 'Match Score (%)',
    rewrite: 'partial',
    linkedin: 'no',
    paid: 'Teal+ “$9 / Week”, billed every week, month or 3 months ($0.87 a day on 90 days)',
    threeMonths: 78.3,
    threeMonthsBasis:
      '$0.87 a day × 90 days (our maths; Teal prints the daily rate, not the total)',
  },
  {
    id: 'rezi',
    name: 'Rezi',
    url: 'https://www.rezi.ai/tools/resume-checker',
    pricingUrl: 'https://www.rezi.ai/pricing',
    free: '$0 plan: 1 resume, 3 PDF downloads, limited Rezi Score and keyword targeting',
    freeRepeat: true,
    noSignup: 'no',
    needs: 'Free account; upload PDF or DOCX or paste text',
    jobPost: 'yes',
    score: 'Rezi Score, 1 to 100',
    rewrite: 'yes',
    linkedin: 'no',
    paid: '$29/month; $149 one-time lifetime',
    threeMonths: 87,
    threeMonthsBasis: '3 × $29 a month (lifetime is $149)',
  },
  {
    id: 'kickresume',
    name: 'Kickresume',
    url: 'https://www.kickresume.com/en/resume-checker/',
    pricingUrl: 'https://www.kickresume.com/en/pricing/',
    free: 'Overall resume score and 3 category scores (design, content, structure) free; the full report needs Premium (free Premium for verified students and teachers)',
    freeRepeat: true,
    noSignup: 'no',
    needs: 'Account; full report on Premium',
    jobPost: 'unknown',
    score: 'ATS score out of 100',
    rewrite: 'yes',
    linkedin: 'unknown',
    paid: '$24/month; $54 every 3 months; $96 every 12 months',
    threeMonths: 54,
    threeMonthsBasis: 'Quarterly plan, “Pay $54 every 3 months”',
    watch:
      'Its pricing table marks the AI Resume Checker as Premium, while its help centre says free users get the overall and category scores.',
  },
  {
    id: 'skillsyncer',
    name: 'SkillSyncer',
    url: 'https://skillsyncer.com/features/ats-resume-checker',
    pricingUrl: 'https://skillsyncer.com/pricing',
    free: '“2 job match scans a week” and 10 AI credits a week, free forever',
    freeRepeat: true,
    noSignup: 'no',
    needs: 'Free account, no card; PDF or DOCX',
    jobPost: 'yes',
    score: 'Job Match Score out of 100',
    rewrite: 'yes',
    linkedin: 'no',
    paid: '$14.95/month; $34.86 billed quarterly',
    threeMonths: 34.86,
    threeMonthsBasis: 'Quarterly plan, “billed $34.86 quarterly”',
  },
  {
    id: 'huntr',
    name: 'Huntr',
    url: 'https://huntr.co/product/resume-checker',
    pricingUrl: 'https://help.huntr.co/en/articles/10714568-plan-types-and-pricing',
    free: 'Basic plan: “Limited” AI review and tailoring (no number given) and a 100-job tracker',
    freeRepeat: true,
    noSignup: 'no',
    needs: 'Free account, no card',
    jobPost: 'yes',
    score: 'Base ATS Score and Job Match Score',
    rewrite: 'yes',
    linkedin: 'no',
    paid: 'Pro: $40 monthly, $90 quarterly or $160 every 6 months',
    threeMonths: 90,
    threeMonthsBasis: 'Pro quarterly, $90',
  },
  {
    id: 'resumeio',
    name: 'Resume.io',
    url: 'https://resume.io/ats-resume-checker',
    pricingUrl: 'https://resume.io/pricing',
    free: 'Free basic grader',
    freeRepeat: true,
    noSignup: 'no',
    needs: '“You will need to enter your email address to see your results”',
    jobPost: 'yes',
    score: 'ATS score (%), plus a role-match score with a job post',
    rewrite: 'partial',
    linkedin: 'no',
    paid: '$2.95 for 7 days, then $29.95 every 4 weeks; or $49.95 every 3 months',
    threeMonths: 49.95,
    threeMonthsBasis:
      'Quarterly plan, $49.95 (the $2.95 trial auto-renews at $29.95 every 4 weeks)',
    watch: 'The 7-day trial renews automatically; cancel before day 7 if you only want the trial.',
  },
  {
    id: 'naukri',
    name: 'Naukri360 ATS Resume Checker',
    url: 'https://www.naukri.com/naukri360/ats-resume-checker',
    free: '“checking your resume score on Naukri360 is free, and you do not need a paid plan”',
    freeRepeat: true,
    noSignup: 'unknown',
    needs:
      'Upload PDF, DOC or DOCX; the job description is “optional but recommended”; login not stated',
    jobPost: 'yes',
    score: 'ATS score with bands 80–100, 60–79, below 60',
    rewrite: 'no',
    linkedin: 'no',
    paid: 'Naukri360 Pro plans; no amounts shown on the page',
    threeMonths: null,
    threeMonthsBasis: 'Score is free; paid plan prices not shown',
  },
]

export const COUNT = CHECKERS.length
export const THIRD_PARTY = CHECKERS.filter((c) => !c.ours)
export const SCORE_GIVERS = THIRD_PARTY.filter((c) => !/^No score/.test(c.score))
export const FREE_REPEAT = CHECKERS.filter((c) => c.freeRepeat)
export const NO_SIGNUP = CHECKERS.filter((c) => c.noSignup === 'yes')
export const JOB_POST = CHECKERS.filter((c) => c.jobPost === 'yes')
export const PRICED_3M = CHECKERS.filter((c) => c.threeMonths !== null && c.threeMonths > 0)

export const usd = (n: number) =>
  `$${n.toLocaleString('en-US', { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 })}`

/** What real ATS products say they do, from their own help docs. */
export type AtsRow = {
  ats: string
  parse: string
  reject: string
  ai: string
  sources: { label: string; url: string }[]
}

export const ATS_ROWS: AtsRow[] = [
  {
    ats: 'Greenhouse',
    parse:
      'Auto-fills fields from the resume. Fails on tables, headers and footers, columns, text boxes; cannot parse files over 2.5 MB',
    reject:
      'Auto-Reject “uses custom application questions to screen and reject candidates based on their responses” (Plus and Pro tiers)',
    ai: 'Talent Matching gives a match score against the recruiter’s criteria and “does not automatically reject or advance candidates”',
    sources: [
      {
        label: 'Unsuccessful resume parse',
        url: 'https://support.greenhouse.io/hc/en-us/articles/200989175-Unsuccessful-resume-parse',
      },
      {
        label: 'Application Rules',
        url: 'https://support.greenhouse.io/hc/en-us/articles/203105595-Application-Rules-Overview',
      },
      {
        label: 'Talent Matching',
        url: 'https://support.greenhouse.io/hc/en-us/articles/44682413339675',
      },
    ],
  },
  {
    ats: 'Workday (with HiredScore)',
    parse:
      'Resume parsing “populates fields from a resume” for the candidate to review; resumes without images parse best',
    reject:
      'No resume-based auto-reject in the docs we read; HiredScore can move candidates “individually or in bulk” by application status',
    ai: 'HiredScore grades A to D on how well the resume matches the job’s requirements, and says “candidates with grades C or D might still be a great fit”',
    sources: [
      {
        label: 'Workday resume parsing',
        url: 'https://doc.workday.com/admin-guide/en-us/human-capital-management/recruiting/candidates/set-up-prospects-and-candidates/hdc1552497830785.html',
      },
      {
        label: 'HiredScore grades',
        url: 'https://doc.workday.com/hiredscore/en-us/workday-hiredscore/recruiter-productivity-/concept--hiredscore-grades.html',
      },
      {
        label: 'HiredScore features',
        url: 'https://doc.workday.com/admin-guide/en-us/workday-feature-descriptions/workday-hiredscore/hiredscore-ai-for-recruiting.html',
      },
    ],
  },
  {
    ats: 'Lever',
    parse:
      'Parses name, work history and contact details; “cannot parse information from image files”; if you cannot highlight the text, it likely will not parse',
    reject:
      'Auto-archive rules can archive an application and send a rejection email, with conditions that include application-form answers',
    ai: 'Not covered in the help pages we opened',
    sources: [
      {
        label: 'Lever resume parsing (help archive)',
        url: 'https://lever-old.zendesk.com/hc/en-us/articles/360056337151',
      },
      {
        label: 'Lever auto-archive',
        url: 'https://help.lever.co/hc/en-us/articles/20087323591069',
      },
    ],
  },
  {
    ats: 'Oracle Recruiting / Taleo',
    parse: 'Not covered in the pages we opened',
    reject:
      'Disqualification questions: answers “decide if candidates move forward … or are automatically disqualified”',
    ai: 'Taleo can weight answers and flag “ACE” candidates who meet all required criteria',
    sources: [
      {
        label: 'Oracle disqualification questions',
        url: 'https://docs.oracle.com/en/cloud/saas/talent-management/faimh/disqualification-question.html',
      },
      {
        label: 'Taleo prescreening',
        url: 'https://docs.oracle.com/en/cloud/saas/taleo-enterprise/21b/otfru/prescreening-candidates.html',
      },
    ],
  },
  {
    ats: 'SmartRecruiters',
    parse: 'Not covered in the pages we opened',
    reject:
      '“will automatically reject candidates who choose answers marked as knock-out”; the email goes 1 hour, 2 days or 5 days later',
    ai: 'Not covered in the pages we opened',
    sources: [
      {
        label: 'Knock-out questions (SAP learning)',
        url: 'https://learning.sap.com/courses/smartrecruiters-for-sap-successfactors-academy/creating-rejection-screening-questions',
      },
    ],
  },
  {
    ats: 'Ashby',
    parse: 'Not covered in the pages we opened',
    reject: 'No auto-reject described; recruiters filter and act in bulk',
    ai: 'AI review marks each criterion as met, not met or undecided against the resume',
    sources: [
      {
        label: 'AI-assisted application review',
        url: 'https://docs.ashbyhq.com/ai-assisted-application-review',
      },
    ],
  },
]

/** Same resume, same job post, one sitting (2–3 May 2026), by a developer whose own checker was one of the 8 (left out here, as is TopResume's label-only result). */
export const SCORE_TEST = {
  url: 'https://dev.to/charliemorrison/i-tested-8-ats-resume-scanners-with-the-same-file-real-scores-from-may-2026-904',
  label: 'Charlie Morrison, dev.to, May 2026',
  rows: [
    { label: 'Enhancv (free scan)', value: 91 },
    { label: 'Resume Worded, Score My Resume', value: 78 },
    { label: 'Resume Worded (free)', value: 72 },
    { label: 'Jobscan (free trial)', value: 67 },
    { label: 'Teal (free scan)', value: 62 },
    { label: 'SkillSyncer (free)', value: 54 },
  ],
}
export const SCORE_SPREAD = {
  low: Math.min(...SCORE_TEST.rows.map((r) => r.value)),
  high: Math.max(...SCORE_TEST.rows.map((r) => r.value)),
}

/** Numbers you will see quoted about ATS, traced to where they come from. */
export type Claim = {
  claim: string
  origin: string
  verdict: string
  url: string
  urlLabel: string
  also?: { label: string; url: string }[]
}

/** Enhancv's interviews with 25 US recruiters (Sep–Oct 2025, page updated Nov 2026). */
export const ENHANCV_STUDY = {
  url: 'https://enhancv.com/blog/does-ats-reject-resumes/',
  recruiters: 25,
  noAutoReject: 23,
  knockoutPct: 84,
  inOrderPct: 52,
}

export const CLAIMS: Claim[] = [
  {
    claim: '“75% of resumes are rejected by ATS before a human sees them”',
    origin:
      'Preptel, a resume-optimisation company, quoted by Computerworld on 4 Mar 2012 as saying ATS “kill 75% of candidates’ chances of landing an interview”. No study or method was published with it.',
    verdict: 'Untraceable sales figure. Do not plan around it.',
    url: 'https://www.computerworld.com/article/1458323/5-insider-secrets-for-beating-applicant-tracking-systems.html',
    urlLabel: 'Computerworld, 2012',
  },
  {
    claim: '“88% of employers say qualified high-skills candidates are screened out”',
    origin:
      'Harvard Business School and Accenture, Hidden Workers (2021): a survey of employers about their own systems, not a measured rejection rate.',
    verdict: 'Real survey, often misquoted as an ATS rejection rate.',
    url: 'https://www.hbs.edu/managing-the-future-of-work/Documents/research/hiddenworkers09032021.pdf',
    urlLabel: 'Hidden Workers, p. 3',
  },
  {
    claim: '“97% (or 99%) of Fortune 500 companies use an ATS”',
    origin:
      'Jobscan, which sells a checker, detected an ATS on 487 of 500 Fortune 500 career pages in its 2026 report (97.4%); its 2019 figure was 98.8%, often rounded to 99%.',
    verdict:
      'Plausible and has a method, but from a vendor. It says a system exists, not that it rejects.',
    url: 'https://www.jobscan.co/blog/fortune-500-use-applicant-tracking-systems/',
    urlLabel: 'Jobscan, Aug 2026',
  },
  {
    claim: '“Aim for an 80% match rate”',
    origin:
      'Jobscan’s recommendation for its own Match Rate (it adds that 75% can work). Teal says “80% or higher” is a good match score; Huntr says “aim for a score around 80”.',
    verdict: 'Each tool’s advice for its own number. No employer ATS uses it.',
    url: 'https://www.jobscan.co/blog/what-jobscan-match-rate-should-i-aim-for/',
    urlLabel: 'Jobscan',
    also: [
      { label: 'Teal', url: 'https://www.tealhq.com/tool/resume-job-description-match' },
      {
        label: 'Huntr',
        url: 'https://help.huntr.co/en/articles/9999137-huntr-resume-scoring-system',
      },
    ],
  },
]
