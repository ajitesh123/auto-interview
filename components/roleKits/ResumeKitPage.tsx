import Link from 'next/link'
import type { RoleHub } from '@/data/roleHubs/types'
import type { ResumeKit } from '@/data/roleKits/types'
import { KIT_PATHS } from '@/data/roleKits'
import { ArrowRightIcon, CheckIcon } from '@/components/roleHub/icons'
import { CopyButton, KeywordChecker } from './KitClient'
import CampusResumePreview from './CampusResumePreview'
import { Card, KitShell, Section, SITE, kitSchemas } from './KitLayout'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default function ResumeKitPage({ hub, kit }: { hub: RoleHub; kit: ResumeKit }) {
  const url = `${SITE}${KIT_PATHS.resume(hub.slug)}`
  const [y, m] = hub.lastUpdated.split('-').map(Number)
  const toc = [
    { id: 'recruiter', label: 'What recruiters check' },
    { id: 'format', label: 'Format' },
    { id: 'summary', label: 'Summary' },
    { id: 'bullets', label: 'Bullet bank' },
    { id: 'rewrites', label: 'Before and after' },
    { id: 'keywords', label: 'Keywords' },
    { id: 'projects', label: 'No experience yet' },
    { id: 'sample', label: 'Word templates and sample' },
    { id: 'cover-letter', label: 'Cover letter and LinkedIn' },
    { id: 'mistakes', label: 'Mistakes' },
  ]
  return (
    <KitShell
      hub={hub}
      kind="resume"
      h1={kit.h1}
      kicker={`Resume (CV) guide · Free Word templates · ${kit.bulletBank.reduce((n, g) => n + g.bullets.length, 0)} bullet examples · Updated ${MONTHS[m - 1]} ${y}`}
      directAnswer={kit.directAnswer}
      toc={toc}
      primary={{ href: '#sample', label: 'Download the Word template' }}
      faqs={kit.faqs}
      schemas={kitSchemas({
        url,
        name: kit.metaTitle,
        description: kit.metaDescription,
        dateModified: hub.lastUpdated,
        hub,
        crumb: 'Resume (CV)',
        faqs: kit.faqs,
      })}
    >
      <Section
        id="recruiter"
        n={1}
        title="What the recruiter checks first"
        sub={`For ${hub.roleName} roles, these decide whether you get a call.`}
      >
        <ol className="grid gap-3 md:grid-cols-2">
          {kit.recruiterLens.map((r, i) => (
            <li key={r} className="flex gap-4 rounded-xl border border-border bg-surface p-5">
              <span className="font-mono text-h3 font-medium text-signal">0{i + 1}</span>
              <span className="text-body leading-relaxed text-fg-2">{r}</span>
            </li>
          ))}
        </ol>
        <p className="max-w-[68ch] text-caption leading-relaxed text-fg-3">
          Recruiters spend about 7.4 seconds on the first skim, and simple one-column layouts with
          clear headings held attention best (
          <a
            href="https://www.hrdive.com/news/eye-tracking-study-shows-recruiters-look-at-resumes-for-7-seconds/541582/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-fg"
          >
            Ladders eye-tracking study, 2018
          </a>
          ).
        </p>
      </Section>

      <Section id="format" n={2} title="Format and section order" sub={kit.format.length}>
        <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
          <Card>
            <h3 className="text-h4 font-semibold text-fg">Section order</h3>
            <ol className="mt-4 space-y-3">
              {kit.format.sections.map((s, i) => (
                <li
                  key={s}
                  className="flex items-start gap-3 text-small leading-relaxed text-fg-2 sm:text-body"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border font-mono text-[11px] text-fg-2">
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
          </Card>
          <div className="grid gap-4">
            <Card>
              <div className="text-caption font-semibold text-signal-strong">India (CV)</div>
              <p className="mt-1.5 text-small leading-relaxed text-fg-2">{kit.format.indiaNote}</p>
            </Card>
            <Card>
              <div className="text-caption font-semibold text-signal-strong">US (resume)</div>
              <p className="mt-1.5 text-small leading-relaxed text-fg-2">{kit.format.usNote}</p>
            </Card>
          </div>
        </div>
      </Section>

      <Section
        id="summary"
        n={3}
        title="Profile summary examples"
        sub="Two lines at the top. Lead with your strongest result for this role."
      >
        <div className="grid gap-3 md:grid-cols-2">
          {kit.summaries.map((s) => (
            <Card key={s.level}>
              <div className="flex items-start justify-between gap-3">
                <div className="text-caption font-semibold text-fg-3">{s.level}</div>
                <CopyButton text={s.text} />
              </div>
              <p className="mt-2 text-body leading-relaxed text-fg">{s.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        id="bullets"
        n={4}
        title={`${hub.shortName} resume bullet bank`}
        sub="Swap the [brackets] for your own numbers. Each bullet: verb, what you did, measurable result."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {kit.bulletBank.map((g) => (
            <Card key={g.area}>
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-h4 font-semibold text-fg">{g.area}</h3>
                <CopyButton text={g.bullets.map((b) => `• ${b}`).join('\n')} label="Copy all" />
              </div>
              <ul className="mt-3 space-y-2.5">
                {g.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-small leading-relaxed text-fg-2">
                    <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-signal-strong" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        id="rewrites"
        n={5}
        title="Before and after"
        sub="The same experience, rewritten so a recruiter sees the result."
      >
        <div className="space-y-3">
          {kit.beforeAfter.map((b) => (
            <div
              key={b.strong}
              className="overflow-hidden rounded-xl border border-border bg-surface"
            >
              <div className="grid md:grid-cols-2">
                <div className="p-4 md:p-5">
                  <div className="text-caption font-medium text-fg-3">Before</div>
                  <p className="mt-1 text-small leading-relaxed text-fg-2 line-through decoration-border-strong">
                    {b.weak}
                  </p>
                </div>
                <div className="border-t border-border bg-signal-tint/60 p-4 md:border-l md:border-t-0 md:p-5">
                  <div className="text-caption font-semibold text-signal-ink">After</div>
                  <p className="mt-1 text-small leading-relaxed text-fg">{b.strong}</p>
                </div>
              </div>
              <p className="border-t border-border px-4 py-3 text-caption text-fg-2 md:px-5">
                <span className="font-semibold text-fg">Why it works: </span>
                {b.why}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="keywords"
        n={6}
        title={`${hub.roleName} resume keywords`}
        sub="Taken from real job posts. Use the ones you can prove, inside bullets, not as a list."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <div className="space-y-4">
              {kit.keywords.map((g) => (
                <div key={g.group}>
                  <div className="text-caption font-medium text-fg-3">{g.group}</div>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {g.terms.map((t) => (
                      <span
                        key={t}
                        className="inline-flex min-h-7 items-center rounded-full bg-muted px-2.5 py-1 text-caption font-medium leading-snug text-fg-2"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 border-t border-border pt-4 text-caption leading-relaxed text-fg-3">
              Sources:{' '}
              {kit.keywordSources.map((s, i) => (
                <span key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="underline underline-offset-2 hover:text-fg"
                  >
                    {s.label}
                  </a>
                  {i < kit.keywordSources.length - 1 ? '; ' : '.'}
                </span>
              ))}
            </div>
          </Card>
          <KeywordChecker groups={kit.keywords} roleName={hub.shortName} />
        </div>
      </Section>

      <Section
        id="projects"
        n={7}
        title="No experience yet? Build proof"
        sub="Each of these can become a line on your resume and a story in the interview."
      >
        <div className="grid gap-3 md:grid-cols-3">
          {kit.projects.map((p) => (
            <Card key={p.title}>
              <h3 className="text-h4 font-semibold text-fg">{p.title}</h3>
              <p className="mt-2 text-small leading-relaxed text-fg-2">{p.what}</p>
              <p className="mt-3 border-t border-border pt-3 text-small text-fg">
                <span className="font-semibold">Proves: </span>
                {p.proves}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        id="sample"
        n={8}
        title={`Free ${hub.shortName} resume template (Word) with a sample`}
        sub="One Word file in the one-page table format that Indian recruiters, placement cells and founders know, filled with a made-up example for this role. Replace every line with your own."
      >
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-5 sm:flex-row sm:items-center sm:justify-between md:p-6">
          <div>
            <div className="text-h4 font-semibold text-fg">
              {hub.roleName} resume template (.docx)
            </div>
            <p className="mt-1 text-small leading-relaxed text-fg-2">
              Education with marks, experience with a label beside every bullet, co-curriculars,
              extra-curriculars, positions of responsibility and skills. One page.
            </p>
          </div>
          <a
            href={`/downloads/resume-templates/${hub.slug}-resume-template.docx`}
            download
            className="inline-flex h-11 shrink-0 items-center gap-2 self-start rounded-full bg-signal px-5 text-small font-semibold text-white shadow-e1 hover:bg-signal-strong sm:self-auto"
          >
            Download Word template
          </a>
        </div>
        <p className="text-caption leading-relaxed text-fg-3">
          Opens in Microsoft Word, Google Docs and LibreOffice. Everything is real text (no text
          boxes or images), so applicant tracking systems can read it. We left out photo, age,
          gender and date of birth on purpose: recruiters do not need them.
        </p>
        <CampusResumePreview slug={hub.slug} sample={kit.sample} />
        <Link
          href="/build-resume"
          className="inline-flex h-10 items-center gap-1.5 text-small font-semibold text-signal-strong hover:underline"
        >
          Prefer to fill it in online? Use the free resume builder <ArrowRightIcon />
        </Link>
      </Section>

      <Section
        id="cover-letter"
        n={9}
        title="Cover letter and LinkedIn"
        sub="Short and specific beats long and generic."
      >
        <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
          <Card>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-caption font-semibold text-fg-3">
                  Cover letter (about 150 words)
                </div>
                <div className="mt-1 text-small font-semibold text-fg">
                  Subject: {kit.coverLetter.subject}
                </div>
              </div>
              <CopyButton text={`Subject: ${kit.coverLetter.subject}\n\n${kit.coverLetter.body}`} />
            </div>
            <p className="mt-3 whitespace-pre-line rounded-lg bg-muted p-4 text-small leading-relaxed text-fg">
              {kit.coverLetter.body}
            </p>
          </Card>
          <Card>
            <div className="flex items-start justify-between gap-3">
              <div className="text-caption font-semibold text-fg-3">LinkedIn headline</div>
              <CopyButton text={kit.linkedin.headline} />
            </div>
            <p className="mt-1.5 text-small font-semibold text-fg">{kit.linkedin.headline}</p>
            <div className="mt-5 flex items-start justify-between gap-3">
              <div className="text-caption font-semibold text-fg-3">LinkedIn About</div>
              <CopyButton text={kit.linkedin.about} />
            </div>
            <p className="mt-1.5 text-small leading-relaxed text-fg-2">{kit.linkedin.about}</p>
          </Card>
        </div>
      </Section>

      <Section id="mistakes" n={10} title="Mistakes that get resumes rejected">
        <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-surface">
          {kit.mistakes.map((x) => (
            <li key={x.mistake} className="grid gap-1 p-4 md:grid-cols-[1fr_1.4fr] md:gap-6 md:p-5">
              <span className="text-small font-semibold text-fg">{x.mistake}</span>
              <span className="text-small leading-relaxed text-fg-2">
                <span className="font-medium text-signal-strong">Fix: </span>
                {x.fix}
              </span>
            </li>
          ))}
        </ul>
        <Card className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-h4 font-semibold text-fg">Need a recommendation letter too?</div>
            <p className="mt-1 text-small text-fg-2">
              Who to ask, what they should say, a sample letter and the email to send.
            </p>
          </div>
          <Link
            href={KIT_PATHS.lor(hub.slug)}
            className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full bg-surface px-4 text-small font-semibold text-fg ring-1 ring-inset ring-border-strong hover:bg-muted"
          >
            Letter of recommendation guide <ArrowRightIcon />
          </Link>
        </Card>
      </Section>
    </KitShell>
  )
}
