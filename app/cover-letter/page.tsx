import type { Metadata } from 'next'
import Link from 'next/link'
import type { ReactNode } from 'react'
import DomainLayout from '@/components/domain/DomainLayout'
import MockInterviewButton from '@/components/ai/MockInterviewButton'
import MockInterviewCTA from '@/components/ai/MockInterviewCTA'
import RelatedTools from '@/components/RelatedTools'
import { AiPrompt, type AiPromptDef } from '@/components/ai/AiPrompt'
import CoverLetterBuilder from '@/components/coverLetterBuilder/CoverLetterBuilder'
import { Figure, Flow, RangeList, StatRow } from '@/components/viz'
import {
  assemble,
  check,
  CLICHES,
  greeting,
  PARTS,
  signOff,
  TARGET,
} from '@/data/coverLetterBuilder/engine'
import { SAMPLE_POST, SAMPLES, WEAK } from '@/data/coverLetterBuilder/samples'
import { ROLE_HUB_LIST } from '@/data/roleHubs'
import { ROLE_KITS } from '@/data/roleKits'
import { ROLE_COVER_LETTERS, coverLetterPath } from '@/data/roleCoverLetters'

const PAGE_URL = 'https://www.autointerviewai.com/cover-letter'
const UPDATED = '2026-11-28'
const TITLE = 'Cover Letter Builder, Format + 6 Samples (Free, No AI)'
const DESC =
  'Free cover letter builder: write it part by part, see the right format for email, PDF or a Naukri box, get 10 checks and a Word file. 6 samples. No AI, no sign-up.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  keywords:
    'cover letter, cover letter format, cover letter builder, covering letter, cover letter for freshers, cover letter sample, cover letter template word',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: PAGE_URL,
    siteName: 'Auto Interview AI',
    type: 'website',
  },
  twitter: { card: 'summary', title: TITLE, description: DESC },
}

const container = 'mx-auto w-full max-w-[1200px] px-5 md:px-8'
const kicker = 'font-mono text-kicker uppercase tracking-[0.08em]'
const link =
  'font-medium text-signal-strong underline decoration-signal/30 underline-offset-2 hover:decoration-signal'

// Every quote below was opened and re-checked word for word on 28 Nov 2026.
const SRC = {
  mit: {
    label: 'MIT Career Advising & Professional Development',
    url: 'https://capd.mit.edu/resources/how-to-write-an-effective-cover-letter/',
  },
  ncs: {
    label: 'National Careers Service (UK government)',
    url: 'https://nationalcareers.service.gov.uk/careers-advice/covering-letter',
  },
  prospects: {
    label: 'Prospects (Jemma Smith, May 2025)',
    url: 'https://www.prospects.ac.uk/careers-advice/cvs-and-cover-letters/cover-letters',
  },
  umich: {
    label: 'University of Michigan Career Center',
    url: 'https://careercenter.umich.edu/node/116',
  },
  internshala: {
    label: 'Internshala (updated 21 May 2024)',
    url: 'https://internshala.com/blog/cover-letter-for-internship/',
  },
  rg: {
    label: 'Resume Genius survey of 625 US hiring managers (2022–23)',
    url: 'https://resumegenius.com/blog/cover-letter-help/cover-letter-statistics',
  },
  resumego: {
    label: 'ResumeGo field experiment (2019–20)',
    url: 'https://www.resumego.net/research/cover-letters/',
  },
  yale: {
    label: 'Cui, Dias and Ye (Yale), arXiv 2509.25054 v2',
    url: 'https://arxiv.org/html/2509.25054v2',
  },
  topresume: {
    label: 'TopResume survey of 600 US hiring managers (May 2025)',
    url: 'https://topresume.com/career-advice/ai-in-hiring-survey',
  },
}

const GUIDANCE: { org: string; src: { label: string; url: string }; topic: string; say: string }[] =
  [
    {
      org: 'MIT CAPD',
      src: SRC.mit,
      topic: 'Length',
      say: '“A cover letter should be no longer than one page with a font size between 10-12 points.”',
    },
    {
      org: 'National Careers Service (UK)',
      src: SRC.ncs,
      topic: 'Paragraphs',
      say: '“It’s a short letter, usually 3 to 5 paragraphs long.”',
    },
    {
      org: 'Prospects',
      src: SRC.prospects,
      topic: 'Length',
      say: '“Typically, three to five concise paragraphs, cover letters should not exceed one A4 page.”',
    },
    {
      org: 'University of Michigan',
      src: SRC.umich,
      topic: 'Email',
      say: '“E-mail: Use body of e-mail as cover letter starting with salutation.”',
    },
    {
      org: 'MIT CAPD',
      src: SRC.mit,
      topic: 'No name',
      say: '“If you are not sure who to address the letter to, write “Dear Hiring Manager.””',
    },
    {
      org: 'Prospects',
      src: SRC.prospects,
      topic: 'No name',
      say: '“However, general greetings should only be used once you have exhausted all other methods of finding a named contact.”',
    },
    {
      org: 'National Careers Service (UK)',
      src: SRC.ncs,
      topic: 'Sign-off',
      say: '“If you know the name of the person you’re writing to, you should end the letter with ‘Yours sincerely’.”',
    },
    {
      org: 'Internshala',
      src: SRC.internshala,
      topic: 'Length',
      say: '“Keep your cover letter concise and to the point. Aim for around 250-300 words.”',
    },
  ]

/* ---------- worked numbers, all computed from the engine ---------- */

const STRONG = SAMPLES[0]
const R_STRONG = check(STRONG.draft, SAMPLE_POST)
const R_WEAK = check(WEAK, SAMPLE_POST)
const fullSamples = SAMPLES.filter((s) => s.draft.channel !== 'portal')
const fullWords = fullSamples.map((s) => check(s.draft).bodyWords)
const portalWords = SAMPLES.filter((s) => s.draft.channel === 'portal').map(
  (s) => check(s.draft).bodyWords
)
const weakWords = R_WEAK.bodyWords

const CHANNEL_ROWS: {
  channel: string
  top: string
  greet: string
  close: string
  length: string
  file: string
}[] = [
  {
    channel: 'Email body',
    top: 'Subject line: “Application for <role> – <your name>”. No address block.',
    greet: `${greeting({ manager: 'Ms Rao' })} or “Dear Hiring Manager,”`,
    close: `“${signOff({ manager: 'Ms Rao', channel: 'email' })}” + name, phone, LinkedIn`,
    length: `${TARGET.email.min}–${TARGET.email.max} words`,
    file: 'Letter in the email body (Michigan, Prospects); resume attached.',
  },
  {
    channel: 'PDF or Word file',
    top: 'Your name and contact line, the date, then the company.',
    greet: '“Dear Ms Rao,” or “Dear Hiring Manager,”',
    close: `“${signOff({ manager: 'Ms Rao', channel: 'attach' })}” + name`,
    length: 'One page, 10–12 pt (MIT)',
    file: 'Save as PDF unless the form asks for Word (Prospects).',
  },
  {
    channel: 'Portal text box (Naukri, Internshala, Greenhouse, Lever)',
    top: 'Nothing: the form already has your name and contact.',
    greet: 'Skip it; start with your opening line.',
    close: 'One line that asks for a call. No signature block.',
    length: `${TARGET.portal.min}–${TARGET.portal.max} words (our rule of thumb)`,
    file: 'Plain text. Line breaks between paragraphs.',
  },
  {
    channel: 'UK letter',
    top: 'Same as a file.',
    greet: '“Dear Ms Rao,” or, if no name after searching, a general greeting',
    close: `“${signOff({ manager: 'Ms Rao', channel: 'uk' })}” with a name; “${signOff({ manager: '', channel: 'uk' })}” with a general greeting`,
    length: 'One A4 page (Prospects)',
    file: 'PDF, or pasted into the email body (Prospects).',
  },
]

const DECISION: { situation: string; doThis: string }[] = [
  {
    situation: 'The form has a cover letter field marked required',
    doThis: 'Write a full letter for this job. It is part of the screen.',
  },
  {
    situation: 'The field is optional',
    doThis:
      'Write it if you can make it specific to this job. ResumeGo’s test found tailored letters beat no letter, and 81% of the professionals it surveyed valued tailored letters over generic ones.',
  },
  {
    situation: 'Naukri or Internshala asks a question in a text box',
    doThis:
      'That box is your cover letter. Use the portal format: the role, one proof with a number, one line of fit.',
  },
  {
    situation: 'You are emailing a recruiter, founder or hiring manager',
    doThis: 'Put the letter in the email body with a clear subject line, resume attached.',
  },
  {
    situation: 'You are changing careers, returning after a gap, or a fresher with no internship',
    doThis:
      'Always write one. Your resume alone cannot explain why a teacher fits a customer success job.',
  },
  {
    situation: 'No field, no email, easy-apply only',
    doThis: 'Skip it. Spend the time on your resume keywords and a referral message instead.',
  },
]

const MOVES: { label: string; weak: string; strong: string }[] = [
  {
    label: 'Opening',
    weak: '“I am writing to express my interest in the vacant position in your esteemed organisation.”',
    strong: 'Names the role, where it was posted, and one reason tied to the team’s product.',
  },
  {
    label: 'Proof',
    weak: '“I am a hard-working and passionate individual who is a quick learner and a team player.”',
    strong: 'One project: 40 minutes to under 6 per booking, 120 users, no-shows 31 to 9.',
  },
  {
    label: 'Job-post skills',
    weak: '“I have good knowledge of Java, Python and SQL.” A list, no proof.',
    strong: 'Java, SQL, Python, Git and unit testing appear inside the story of what was built.',
  },
  {
    label: 'Fit',
    weak: '“I believe I am a perfect fit for this role.”',
    strong:
      'Quotes the post (fix production bugs, talk to hospital admins) and says what the first month looks like.',
  },
  {
    label: 'Greeting and close',
    weak: '“Dear Sir/Madam” … “Kindly consider my application. I look forward to hearing from you.”',
    strong: '“Dear Ms Rao” … asks for a short call and thanks her.',
  },
]

const AI_PROMPT: AiPromptDef = {
  id: 'cover-letter-edit',
  title: 'Tighten my cover letter (your facts only)',
  why: 'Paste the letter you built here and the job post. It edits; it does not invent.',
  prompt: `You are a recruiter who reads cover letters every day. Help me tighten my cover letter.

Rules:
- First ask me for: my current letter and the job post. Wait for both.
- Keep every fact, number, name and claim exactly as I wrote it. Never add a skill, result or employer I did not give you. If a paragraph has no number, ask me for one instead of inventing it.
- 250 to 400 words, 4 or 5 short paragraphs: the role and why; one proof story with a number; a second proof or how I closed a gap; why this company and what I would do first; a close that asks for a call.
- Plain English. Remove "I am writing to", "passionate", "esteemed", "team player" and similar phrases.
- Show me the changes as a list first, then the full letter.

Start by asking for my letter and the job post.`,
}

const FAQ: { q: string; a: string }[] = [
  {
    q: 'What is the correct cover letter format?',
    a: `A greeting, then 3 to 5 short paragraphs on one page: the role and why you want it, one or two proof stories with numbers, why this company and what you would do first, and a close that asks for a conversation. The UK National Careers Service and Prospects both describe 3 to 5 paragraphs; MIT says no longer than one page at 10 to 12 point. In an email the letter goes in the body with a subject line; in a portal box you drop the greeting and signature.`,
  },
  {
    q: 'How long should a cover letter be?',
    a: `Aim for ${TARGET.attach.min} to ${TARGET.attach.max} words. Internshala says “around 250-300 words”; hiring managers in Resume Genius’s survey preferred 400 words on average; MIT and Prospects cap it at one page. A Naukri or Internshala text box can be shorter: our samples there run ${Math.min(...portalWords)} to ${Math.max(...portalWords)} words.`,
  },
  {
    q: 'Is a cover letter necessary for freshers?',
    a: 'Only when someone will read it: a required or optional field on the form, an email to a person, or a portal question like Internshala’s. For easy-apply jobs with no field, put the time into your resume and a referral request. If you are a fresher with no internship, a short letter is often the only place to show a project with a result.',
  },
  {
    q: 'Should I put my cover letter in the email body or attach it?',
    a: 'In the body. The University of Michigan says “Use body of e-mail as cover letter starting with salutation”, and Prospects advises pasting the text into the email rather than attaching it so spam filters don’t catch it. Attach your resume as a PDF and add the letter as a PDF too only if the post asks for one.',
  },
  {
    q: 'Who do I address a cover letter to if there is no name?',
    a: 'Search first: the job post, the company’s LinkedIn page and team page often name the hiring manager or recruiter. If you still can’t find one, MIT suggests “Dear Hiring Manager”. Avoid “To whom it may concern” and “Respected Sir”.',
  },
  {
    q: 'Yours sincerely or yours faithfully?',
    a: 'This is a UK rule. The National Careers Service says to end with “Yours sincerely” if you know the person’s name, and “Yours faithfully” if you wrote “Dear Sir or Madam”. In India and the US, “Yours sincerely”, “Sincerely” or “Best regards” are all fine; the builder picks one for the format you choose.',
  },
  {
    q: 'What is the difference between a covering letter and a cover letter?',
    a: 'None. “Covering letter” is the older British and Indian name, “cover letter” the American one. Both mean the short letter that goes with your resume (CV).',
  },
  {
    q: 'What should I write in the Naukri or Internshala cover letter box?',
    a: `A short version of the same letter: the role and why, one proof with a number, and one line on fit or joining date, with no greeting block. Write it for this job, not from a copied template. Two of our samples are written for these boxes.`,
  },
  {
    q: 'Should I use ChatGPT or Claude to write my cover letter?',
    a: 'Use AI to edit a letter built from your own facts, not to write one from nothing. A Yale study of about 5 million Freelancer.com letters found the link between a letter’s tailoring and callbacks fell by 51% after an AI writing tool launched, because every letter started to look tailored. In a TopResume survey, 19.6% of recruiters said they would reject a candidate with an AI-generated resume or cover letter.',
  },
  {
    q: 'Do recruiters actually read cover letters?',
    a: 'Many say they do, though both numbers come from companies that sell resume services. In Resume Genius’s survey of 625 US hiring managers, 83% said they “always” or “frequently” read them. ResumeGo’s field test of 7,287 fictitious applications found letters tailored to the job had a 53% higher callback rate than no letter at all.',
  },
  {
    q: 'Can I use one cover letter for every job?',
    a: 'Keep one master draft, then change the opening, the proof you lead with and the fit paragraph for each job. The builder’s “Company named” and job-post checks fail a letter that could be sent anywhere unchanged.',
  },
]

function Section({
  id,
  meta,
  title,
  intro,
  children,
}: {
  id: string
  meta: string
  title: string
  intro?: ReactNode
  children: ReactNode
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-t`}
      className="scroll-mt-32 border-t border-border py-14 md:py-20"
    >
      <header className="max-w-2xl">
        <div className={`${kicker} text-signal-strong`}>{meta}</div>
        <h2 id={`${id}-t`} className="mt-3 text-h2 font-semibold text-fg">
          {title}
        </h2>
        {intro && <p className="mt-3 text-body-lg text-fg-2">{intro}</p>}
      </header>
      <div className="mt-8 space-y-8">{children}</div>
    </section>
  )
}

function P({ children }: { children: ReactNode }) {
  return <p className="max-w-prose text-body text-fg-2 md:text-prose">{children}</p>
}

const SECTIONS = [
  { id: 'builder', label: 'Builder' },
  { id: 'format', label: 'Format' },
  { id: 'length', label: 'Length' },
  { id: 'need', label: 'Do you need one?' },
  { id: 'example', label: 'Weak vs strong' },
  { id: 'samples', label: 'Samples' },
  { id: 'ai', label: 'Using AI' },
  { id: 'roles', label: 'By role' },
  { id: 'faq', label: 'FAQ' },
]

const lab = (st: string) => (st === 'pass' ? 'Pass' : st === 'warn' ? 'Fix' : 'Fix first')
const chip = (st: string) =>
  st === 'pass'
    ? 'bg-success-soft text-success-strong'
    : st === 'warn'
      ? 'bg-warn-soft text-warn'
      : 'bg-danger-soft text-danger'

function LetterCard({
  title,
  sub,
  draft,
}: {
  title: string
  sub: string
  draft: (typeof SAMPLES)[number]['draft']
}) {
  const L = assemble(draft, new Date(2026, 10, 28))
  return (
    <div className="min-w-0 rounded-xl border border-border bg-surface p-4 text-small leading-relaxed text-fg md:p-5">
      <div className="text-h4 font-semibold text-fg">{title}</div>
      <div className="mt-1 text-caption text-fg-3">{sub}</div>
      <div className="mt-4 space-y-3 break-words">
        {L.subject && (
          <p className="rounded-md bg-muted px-2 py-1 text-caption text-fg-2">
            <span className="font-semibold text-fg">Subject:</span> {L.subject}
          </p>
        )}
        {L.greeting && <p>{L.greeting}</p>}
        {L.paras.map((t, i) => (
          <p key={i}>{t}</p>
        ))}
        {L.signOff && (
          <p>
            {L.signOff}
            <br />
            {L.signature[0]}
          </p>
        )}
      </div>
    </div>
  )
}

export default function CoverLetterPage() {
  const kits = ROLE_HUB_LIST.filter((h) => ROLE_KITS[h.slug])
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Cover Letter Builder',
      url: PAGE_URL,
      description: DESC,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Any (runs in the browser)',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
      dateModified: UPDATED,
      publisher: {
        '@type': 'Organization',
        name: 'Auto Interview AI',
        url: 'https://www.autointerviewai.com',
        parentOrganization: {
          '@type': 'Organization',
          name: 'Tough Tongue AI',
          url: 'https://www.toughtongueai.com',
        },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.autointerviewai.com' },
        { '@type': 'ListItem', position: 2, name: 'Cover letter builder', item: PAGE_URL },
      ],
    },
  ]

  const anatomy = assemble(STRONG.draft, new Date(2026, 10, 28))
  const firstWords = (s: string, n = 11) => {
    const w = s.split(/\s+/)
    return w.length > n ? `${w.slice(0, n).join(' ')}…` : s
  }
  const anatomyParts = PARTS.filter((p) => (STRONG.draft[p.key] as string).trim())

  return (
    <DomainLayout currentPath="/cover-letter">
      <div className="bg-bg text-fg">
        {schema.map((s, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
          />
        ))}

        {/* ---------- Hero ---------- */}
        <div className={`${container} pb-10 pt-8 md:pb-14 md:pt-12`}>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-caption text-fg-3">
            <Link href="/" className="hover:text-fg">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-fg-2">Cover letter builder</span>
          </nav>

          <header className="mt-8 grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <div className={`${kicker} text-signal-strong`}>
                Free · No AI, no sign-up · Updated 28 Nov 2026
              </div>
              <h1 className="mt-4 font-serif text-display font-medium text-fg">
                Cover letter builder, format and samples
              </h1>
              <p className="mt-5 max-w-[56ch] text-body-lg text-fg-2">
                A cover letter (covering letter) is a one-page note, usually {TARGET.attach.min} to{' '}
                {TARGET.attach.max} words in 3 to 5 short paragraphs: the role and why you want it,
                one story with a number, why this company, and a close that asks for a call. Build
                yours below part by part; the format changes for an email, a PDF or a Naukri box,
                and {R_STRONG.checks.length} checks tell you what to fix before you send it.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#builder"
                  className="inline-flex h-12 items-center rounded-full bg-surface px-5 text-small font-semibold text-fg ring-1 ring-inset ring-border-strong transition-colors duration-fast hover:bg-muted"
                >
                  Build my cover letter
                </a>
                <a
                  href="#samples"
                  className="inline-flex h-12 items-center rounded-full px-4 text-small font-semibold text-signal-strong transition-colors duration-fast hover:bg-signal-tint"
                >
                  Read {SAMPLES.length} samples
                </a>
                <MockInterviewButton caption={false} label="Got the call? Free mock interview" />
              </div>
            </div>

            <aside
              aria-label="The parts of a cover letter, labelled"
              className="rounded-2xl border border-border bg-surface p-5 shadow-e1 md:p-6 lg:col-span-5"
            >
              <div className={`${kicker} text-fg-3`}>Anatomy · fresher sample, email</div>
              <div className="mt-4 space-y-3 text-caption leading-relaxed text-fg-2">
                <div className="rounded-md bg-muted px-2 py-1">
                  <span className="font-semibold text-fg">Subject:</span> {anatomy.subject}
                </div>
                <div>{anatomy.greeting}</div>
                <ol className="space-y-2.5">
                  {anatomyParts.map((p, i) => (
                    <li key={p.key} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-signal-tint font-mono text-caption font-semibold text-signal-ink">
                        {i + 1}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-small font-semibold text-fg">
                          {p.label.replace(/^\d · /, '').replace(' (optional)', '')}
                        </span>
                        <span className="block">
                          &ldquo;{firstWords(STRONG.draft[p.key] as string)}&rdquo;
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
                <div>
                  {anatomy.signOff} {anatomy.signature[0]}
                </div>
              </div>
              <p className="mt-4 border-t border-border pt-3 text-caption text-fg-3">
                Fictional sample. {R_STRONG.bodyWords} words, {R_STRONG.passed} of{' '}
                {R_STRONG.checks.length} checks pass.
              </p>
            </aside>
          </header>

          <div className="mt-10 max-w-3xl rounded-xl bg-signal-tint p-5 ring-1 ring-inset ring-signal/15">
            <div className={`${kicker} text-signal-ink`}>TL;DR</div>
            <ul className="mt-3 space-y-2 text-body text-fg">
              <li>
                <strong className="font-semibold">One page, 3 to 5 paragraphs.</strong> Role and
                reason; a story with a number; fit and first steps; a close that asks for a call.
              </li>
              <li>
                <strong className="font-semibold">Match the format to where it goes.</strong> Email:
                letter in the body with a subject line. Portal box: no greeting or signature. File:
                PDF with your details and the date at the top.
              </li>
              <li>
                <strong className="font-semibold">Specific beats polished.</strong> Name the
                company, use the job post&apos;s skills inside your proof, and cut stock phrases
                like &ldquo;esteemed organisation&rdquo;.
              </li>
            </ul>
          </div>
        </div>

        {/* ---------- In-page nav ---------- */}
        <nav aria-label="On this page" className="sticky top-16 z-40 border-y border-border bg-bg">
          <div className={`${container} flex gap-1 overflow-x-auto py-2`}>
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="inline-flex h-9 shrink-0 items-center rounded-full px-3 text-small text-fg-2 hover:bg-muted hover:text-fg"
              >
                {s.label}
              </a>
            ))}
          </div>
        </nav>

        <div className={container}>
          <Section
            id="builder"
            meta="The builder · about 15 minutes for most letters · saved on this device"
            title="Write your cover letter, part by part"
            intro="Pick who you are and where the letter goes, then fill each part. The letter on the right updates as you type, with the right greeting, sign-off and layout. Stuck? Start from a sample and replace every line."
          >
            <CoverLetterBuilder />
            <p className="text-caption text-fg-3">
              Nothing you type leaves your browser. The checks are plain rules (word counts, phrase
              lists and the skill list from our{' '}
              <Link href="/resume-keyword-checker" className={link}>
                resume keyword checker
              </Link>
              ), not AI.
            </p>
          </Section>

          <Section
            id="format"
            meta="Cover letter format · 4 versions"
            title="The same letter, four formats"
            intro="What you write stays the same; what goes around it changes with where you send it. The builder switches between these for you."
          >
            <Flow
              label="The five parts, in order"
              steps={PARTS.map((p) => ({
                title: p.label.replace(/^\d · /, ''),
                body: p.job,
              }))}
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {CHANNEL_ROWS.map((r) => (
                <div
                  key={r.channel}
                  className="min-w-0 rounded-xl border border-border bg-surface p-5"
                >
                  <h3 className="text-h4 font-semibold text-fg">{r.channel}</h3>
                  <dl className="mt-3 space-y-2 text-small">
                    {(
                      [
                        ['Top', r.top],
                        ['Greeting', r.greet],
                        ['Sign-off', r.close],
                        ['Length', r.length],
                        ['File', r.file],
                      ] as const
                    ).map(([k, v]) => (
                      <div key={k} className="grid grid-cols-[5.5rem_1fr] gap-2">
                        <dt className="text-fg-3">{k}</dt>
                        <dd className="min-w-0 text-fg-2">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-h3 font-semibold text-fg">What careers services say</h3>
              <ul className="mt-4 divide-y divide-border rounded-xl border border-border bg-surface">
                {GUIDANCE.map((g, i) => (
                  <li key={i} className="grid gap-1 p-4 sm:grid-cols-[9rem_1fr] sm:gap-4">
                    <div className={`${kicker} text-fg-3`}>{g.topic}</div>
                    <div className="min-w-0">
                      <p className="text-small text-fg">{g.say}</p>
                      <a
                        href={g.src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${link} text-caption`}
                      >
                        {g.org}
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-caption text-fg-3">
                Each quote checked on its page on 28 Nov 2026.
              </p>
            </div>
          </Section>

          <Section
            id="length"
            meta="How long · 2 sources + our samples"
            title={`Most advice lands between ${TARGET.attach.min} and ${TARGET.attach.max} words`}
          >
            <Figure
              label="Recommended length · words in the body"
              title={`Internshala says 250–300 words; hiring managers preferred 400 on average`}
              source={[
                { label: SRC.internshala.label, url: SRC.internshala.url },
                { label: SRC.rg.label, url: SRC.rg.url },
                { label: 'Our samples, counted by the builder', url: '#samples' },
              ]}
              updated="Nov 2026"
              table={{
                head: ['Source', 'Words'],
                rows: [
                  ['Internshala (internship letters)', '250–300'],
                  ['Resume Genius survey: average preferred length', '400'],
                  [
                    `Our ${fullSamples.length} full-letter samples`,
                    `${Math.min(...fullWords)}–${Math.max(...fullWords)}`,
                  ],
                  [
                    `Our ${portalWords.length} portal-box samples`,
                    `${Math.min(...portalWords)}–${Math.max(...portalWords)}`,
                  ],
                  ['The generic letter in “Weak vs strong”', String(weakWords)],
                ],
              }}
            >
              <RangeList
                rows={[
                  {
                    label: 'Internshala',
                    sub: 'internship cover letters',
                    min: 250,
                    max: 300,
                    href: SRC.internshala.url,
                  },
                  {
                    label: 'Resume Genius survey',
                    sub: 'average preferred, 625 US hiring managers',
                    min: 400,
                    max: 400,
                    mid: 400,
                    display: '400',
                    href: SRC.rg.url,
                  },
                  {
                    label: 'Our full-letter samples',
                    sub: `${fullSamples.length} letters on this page`,
                    min: Math.min(...fullWords),
                    max: Math.max(...fullWords),
                  },
                  {
                    label: 'Our portal-box samples',
                    sub: `${portalWords.length} Naukri / Internshala answers`,
                    min: Math.min(...portalWords),
                    max: Math.max(...portalWords),
                  },
                  {
                    label: 'The generic letter',
                    sub: 'what most people send (fictional)',
                    min: weakWords,
                    max: weakWords,
                    mid: weakWords,
                    display: String(weakWords),
                  },
                ]}
                domain={[0, 500]}
                rule={{ value: TARGET.attach.min, label: `${TARGET.attach.min} words` }}
              />
            </Figure>
            <P>
              Page limits say the same thing in a different unit: MIT and Prospects both stop at one
              page. The builder&apos;s Word file uses 11 pt Calibri with 2 cm margins; open it and
              check it fits one page before you save the PDF. The length check marks anything under{' '}
              {Math.round(TARGET.attach.min * 0.6)} or over {Math.round(TARGET.attach.max * 1.15)}{' '}
              words as &ldquo;Fix first&rdquo;.
            </P>
          </Section>

          <Section
            id="need"
            meta="Do you need one? · 4 studies, all with caveats"
            title="Write one when someone will read it"
            intro="The best data on cover letters comes from companies that sell resume help, and the newest research says AI has made letters easier to fake. Read the numbers with that in mind."
          >
            <StatRow
              stats={[
                {
                  value: '83%',
                  label: 'of hiring managers say they “always” or “frequently” read cover letters',
                  sub: 'Resume Genius, 625 US hiring managers, 2022–23. Sells resume services.',
                  href: SRC.rg.url,
                },
                {
                  value: '60%',
                  label: 'of companies require a cover letter',
                  sub: 'Same Resume Genius survey (US companies).',
                  href: SRC.rg.url,
                },
                {
                  value: '53%',
                  label: 'higher callback rate for tailored letters than for no letter',
                  sub: 'ResumeGo, 7,287 fictitious applications, 2019–20. Sells resume services.',
                  href: SRC.resumego.url,
                },
                {
                  value: '51%',
                  label:
                    'drop in the link between letter tailoring and callbacks after an AI tool launched',
                  sub: 'Cui, Dias, Ye (Yale), Freelancer.com, 2023.',
                  href: SRC.yale.url,
                },
              ]}
            />
            <div>
              <h3 className="text-h3 font-semibold text-fg">What to do if you are…</h3>
              <ul className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                {DECISION.map((d) => (
                  <li key={d.situation} className="rounded-xl border border-border bg-surface p-4">
                    <div className="text-small font-semibold text-fg">{d.situation}</div>
                    <p className="mt-1 text-small text-fg-2">{d.doThis}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Section>

          <Section
            id="example"
            meta={`Weak vs strong · ${R_WEAK.passed} of ${R_WEAK.checks.length} vs ${R_STRONG.passed} of ${R_STRONG.checks.length} checks`}
            title="The letter most freshers send, and the fix"
            intro="Same person, same job post (both fictional). The builder’s checks, run on each letter with the post pasted in:"
          >
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <LetterCard
                title={`Generic: ${R_WEAK.passed} of ${R_WEAK.checks.length} checks`}
                sub={`${R_WEAK.bodyWords} words · could be sent to any company`}
                draft={WEAK}
              />
              <LetterCard
                title={`Specific: ${R_STRONG.passed} of ${R_STRONG.checks.length} checks`}
                sub={`${R_STRONG.bodyWords} words · ${R_STRONG.keywords?.matched.length ?? 0} skills from the post used inside the story`}
                draft={STRONG.draft}
              />
            </div>

            <div
              className="overflow-x-auto rounded-xl border border-border bg-surface"
              role="region"
              aria-label="Checks on both letters"
              // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
              tabIndex={0}
            >
              <table className="w-full text-small">
                <caption className="sr-only">
                  Builder checks on the generic and the specific letter
                </caption>
                <thead className="bg-muted text-left text-fg-2">
                  <tr>
                    <th scope="col" className="px-4 py-2 font-medium">
                      Check
                    </th>
                    <th scope="col" className="px-4 py-2 font-medium">
                      Generic
                    </th>
                    <th scope="col" className="px-4 py-2 font-medium">
                      Specific
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {R_STRONG.checks.map((c) => {
                    const w = R_WEAK.checks.find((x) => x.id === c.id)
                    return (
                      <tr key={c.id}>
                        <th scope="row" className="px-4 py-2 text-left font-medium text-fg">
                          {c.label}
                        </th>
                        <td className="px-4 py-2">
                          {w && (
                            <span
                              className={`inline-flex h-6 items-center rounded-full px-2 text-caption font-semibold ${chip(w.status)}`}
                            >
                              {lab(w.status)}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-2">
                          <span
                            className={`inline-flex h-6 items-center rounded-full px-2 text-caption font-semibold ${chip(c.status)}`}
                          >
                            {lab(c.status)}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <div>
              <h3 className="text-h3 font-semibold text-fg">
                Five changes that made the difference
              </h3>
              <ol className="mt-4 space-y-3">
                {MOVES.map((m, i) => (
                  <li key={m.label} className="rounded-xl border border-border bg-surface p-4">
                    <div className="text-small font-semibold text-fg">
                      {i + 1}. {m.label}
                    </div>
                    <div className="mt-2 grid gap-2 text-small sm:grid-cols-2">
                      <p className="text-fg-2">
                        <span className="font-medium text-danger">Before: </span>
                        {m.weak}
                      </p>
                      <p className="text-fg-2">
                        <span className="font-medium text-success-strong">After: </span>
                        {m.strong}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Section>

          <Section
            id="samples"
            meta={`Samples · ${SAMPLES.length} cover letters, all fictional`}
            title="Cover letter samples for freshers, interns, switchers and experienced hires"
            intro="Every person, company and number below is made up. Open one in the builder and replace each line with your own facts; the checks will tell you what you missed."
          >
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {SAMPLES.map((s, i) => {
                const r = check(s.draft)
                return (
                  <details
                    key={s.id}
                    className="group min-w-0 rounded-xl border border-border bg-surface open:shadow-e1"
                    open={i < 2}
                  >
                    <summary className="flex min-h-12 cursor-pointer list-none items-start justify-between gap-3 p-4 md:p-5">
                      <span className="min-w-0">
                        <span className="block text-h4 font-semibold text-fg">{s.title}</span>
                        <span className="mt-1 block text-caption text-fg-3">
                          {s.who} · {r.bodyWords} words · {r.passed} of {r.checks.length} checks
                        </span>
                      </span>
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 16 16"
                        className="mt-1 h-4 w-4 shrink-0 text-fg-2 transition-transform duration-base group-open:rotate-180"
                      >
                        <path
                          d="M4 6l4 4 4-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </summary>
                    <div className="px-4 pb-4 md:px-5 md:pb-5">
                      <p className="rounded-md bg-signal-tint px-3 py-2 text-caption text-signal-ink">
                        {s.note}
                      </p>
                      <div className="mt-3 space-y-3 break-words text-small leading-relaxed text-fg">
                        {(() => {
                          const L = assemble(s.draft, new Date(2026, 10, 28))
                          return (
                            <>
                              {L.subject && (
                                <p className="text-caption text-fg-2">
                                  <span className="font-semibold text-fg">Subject:</span>{' '}
                                  {L.subject}
                                </p>
                              )}
                              {L.greeting && <p>{L.greeting}</p>}
                              {L.paras.map((t, j) => (
                                <p key={j}>{t}</p>
                              ))}
                              {L.signOff && (
                                <p>
                                  {L.signOff}
                                  <br />
                                  {L.signature[0]}
                                </p>
                              )}
                            </>
                          )
                        })()}
                      </div>
                      <a
                        href={`/cover-letter?sample=${s.id}#builder`}
                        className="mt-4 inline-flex h-11 items-center rounded-full bg-surface px-4 text-small font-semibold text-fg ring-1 ring-inset ring-border-strong transition-colors duration-fast hover:bg-muted"
                      >
                        Edit this sample in the builder
                      </a>
                    </div>
                  </details>
                )
              })}
            </div>
          </Section>

          <Section
            id="ai"
            meta="Using AI · 2 studies"
            title="Use AI to edit your facts, not to invent them"
          >
            <P>
              Cover letters used to signal effort. A Yale team studied about 5 million letters on
              Freelancer.com and found that after an AI writing tool launched, &ldquo;the
              correlation between cover-letter tailoring and receiving a callback fell by 51%&rdquo;
              (
              <a href={SRC.yale.url} target="_blank" rel="noopener noreferrer" className={link}>
                Cui, Dias and Ye
              </a>
              ). Employers shifted to work history instead. In a{' '}
              <a
                href={SRC.topresume.url}
                target="_blank"
                rel="noopener noreferrer"
                className={link}
              >
                TopResume survey of 600 US hiring managers
              </a>{' '}
              (May 2025), 19.6% of recruiters said they would reject a candidate with an
              AI-generated resume or cover letter.
            </P>
            <P>
              So the part that still works is the part AI can&apos;t make up: your project, your
              number, your reason for this company. Build the letter here from your facts, then, if
              you want, let an assistant tighten the wording with the prompt below. It is told never
              to add a fact you didn&apos;t give it.
            </P>
            <div className="max-w-xl">
              <AiPrompt p={AI_PROMPT} />
            </div>
          </Section>

          <Section
            id="roles"
            meta={`By role · ${kits.length} role kits`}
            title="Cover letters written for one role"
            intro="Each role kit has a sample cover letter for that job next to a one-page resume (CV) Word template and the keywords recruiters look for."
          >
            <ul className="flex flex-wrap gap-2">
              {kits.map((h) => (
                <li key={h.slug}>
                  <Link
                    href={
                      ROLE_COVER_LETTERS[h.slug]
                        ? coverLetterPath(h.slug)
                        : `/${h.slug}/resume#cover-letter`
                    }
                    className="inline-flex min-h-11 items-center rounded-full bg-surface px-4 text-small text-fg ring-1 ring-inset ring-border hover:ring-border-strong"
                  >
                    {h.roleName}
                    {ROLE_COVER_LETTERS[h.slug] ? ' · full guide + Word template' : ''}
                  </Link>
                </li>
              ))}
            </ul>
            <P>
              Next steps that pair with a letter:{' '}
              <Link href="/resume-keyword-checker" className={link}>
                check your resume against the job post
              </Link>
              ,{' '}
              <Link href="/referral-message" className={link}>
                ask for a referral
              </Link>
              , and{' '}
              <Link href="/why-should-we-hire-you" className={link}>
                prepare &ldquo;Why should we hire you?&rdquo;
              </Link>{' '}
              for when they call.
            </P>
          </Section>

          <Section id="faq" meta={`FAQ · ${FAQ.length} questions`} title="Quick answers">
            <div className="space-y-3">
              {FAQ.map((f, i) => (
                <details
                  key={f.q}
                  className="group rounded-xl border border-border bg-surface open:shadow-e1"
                  open={i < 2}
                >
                  <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 font-medium text-fg">
                    <h3 className="text-body font-medium">{f.q}</h3>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 16 16"
                      className="h-4 w-4 shrink-0 text-fg-2 transition-transform duration-base group-open:rotate-180"
                    >
                      <path
                        d="M4 6l4 4 4-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </summary>
                  <p className="max-w-prose px-5 pb-5 text-body text-fg-2">{f.a}</p>
                </details>
              ))}
            </div>
            <div>
              <h3 className="text-h4 font-semibold text-fg">Sources</h3>
              <ul className="mt-2 space-y-1 text-caption text-fg-2">
                {Object.values(SRC).map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className={link}>
                      {s.label}
                    </a>
                  </li>
                ))}
                <li>
                  Stock-phrase list ({CLICHES.length} phrases) and portal word range: our own rules
                  of thumb, shown as such in the tool.
                </li>
              </ul>
              <p className="mt-2 text-caption text-fg-3">
                Opened 28 Nov 2026. Resume Genius, ResumeGo and TopResume sell resume services.
              </p>
            </div>
          </Section>
        </div>

        <MockInterviewCTA
          title="Letter sent? Practise the interview out loud."
          body="A voice interviewer asks the questions your letter invites (“tell me about that project”, “why us?”), follows up, and tells you what was strong and what was thin."
          questions={[
            'Walk me through the project in your cover letter.',
            'Why do you want to work here?',
            'Why should we hire you?',
            'Tell me about yourself.',
          ]}
        />
        <RelatedTools currentPage="/cover-letter" />
      </div>
    </DomainLayout>
  )
}
