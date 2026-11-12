import Link from 'next/link'
import type { RoleHub } from '@/data/roleHubs/types'
import type { CoverLetterKit, CoverLetterSample } from '@/data/roleCoverLetters/types'
import { coverLetterPath, fillCounts, letterWords, wordCount } from '@/data/roleCoverLetters'
import { KIT_PATHS } from '@/data/roleKits'
import { ArrowRightIcon } from '@/components/roleHub/icons'
import { CopyButton } from '@/components/roleKits/KitClient'
import { Card, KitShell, Section, SITE, kitSchemas } from '@/components/roleKits/KitLayout'
import {
  Figure,
  BarList,
  RangeList,
  SegmentBar,
  CompareTable,
  StatRow,
  Flow,
  Insight,
  PullQuote,
} from '@/components/viz'
import MockInterviewButton from '@/components/ai/MockInterviewButton'
import { AiPrompt } from '@/components/ai/AiPrompt'
import { coverLetterPrompt } from '@/data/aiPrompts'
import { LetterChecker } from './CoverLetterClient'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const fmtDate = (d: string) => {
  const [y, m, day] = d.split('-').map(Number)
  return `${day} ${MONTHS[m - 1]} ${y}`
}

const ext = { target: '_blank', rel: 'noopener noreferrer' } as const
const linkCls = 'underline underline-offset-2 hover:text-fg'

function letterText(s: CoverLetterSample) {
  return [s.greeting, ...s.paragraphs.map((p) => p.text), s.signoff].join('\n\n')
}

/** A letter on "paper", with the job of each paragraph in a margin label. */
function Letter({ s, annotate = true }: { s: CoverLetterSample; annotate?: boolean }) {
  const words = letterWords(s.paragraphs)
  return (
    <div className="rounded-xl border border-border bg-surface">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border px-5 py-4 md:px-6">
        <div>
          <div className="font-mono text-kicker uppercase tracking-[0.08em] text-fg-3">
            {s.level} · {words} words · {s.paragraphs.length} paragraphs
          </div>
          <div className="mt-1 text-small font-semibold text-fg">{s.who}</div>
          <div className="text-caption text-fg-2">{s.context}</div>
        </div>
        <CopyButton text={letterText(s)} label="Copy letter" />
      </div>
      <div className="space-y-4 px-5 py-5 md:px-6">
        <p className="text-small text-fg sm:text-body">{s.greeting}</p>
        {s.paragraphs.map((p) => (
          <div key={p.role} className="grid gap-1.5 md:grid-cols-[9.5rem_1fr] md:gap-5">
            {annotate ? (
              <div className="font-mono text-caption leading-snug text-signal-strong md:pt-1">
                {p.role}
                <span className="text-fg-3"> · {wordCount(p.text)} w</span>
              </div>
            ) : (
              <div className="hidden md:block" />
            )}
            <p className="max-w-[68ch] text-small leading-relaxed text-fg-2 sm:text-body">
              {p.text}
            </p>
          </div>
        ))}
        <p className="whitespace-pre-line text-small text-fg sm:text-body">{s.signoff}</p>
      </div>
    </div>
  )
}

export default function CoverLetterKitPage({
  hub,
  kit: raw,
}: {
  hub: RoleHub
  kit: CoverLetterKit
}) {
  const fill = (t: string) => fillCounts(raw, t)
  const kit: CoverLetterKit = {
    ...raw,
    metaDescription: fill(raw.metaDescription),
    directAnswer: fill(raw.directAnswer),
    faqs: raw.faqs.map((f) => ({ q: f.q, a: fill(f.a) })),
    portals: raw.portals.map((p) => ({ ...p, whatWeFound: fill(p.whatWeFound) })),
  }
  const url = `${SITE}${coverLetterPath(hub.slug)}`
  const checked = fmtDate(kit.checked)
  const [y, m] = kit.checked.split('-').map(Number)
  const posts = kit.jobPosts
  const n = posts.length
  const count = (c: string) => posts.filter((p) => p.coverLetter === c).length
  const required = count('required')
  const optional = count('optional')
  const none = count('none')
  const india = posts.filter((p) => p.region === 'India').length
  const indiaWithField = posts.filter(
    (p) => p.region === 'India' && p.coverLetter !== 'none'
  ).length
  const termCounts = Object.entries(
    posts.reduce<Record<string, number>>((acc, p) => {
      p.terms.forEach((t) => (acc[t] = (acc[t] || 0) + 1))
      return acc
    }, {})
  )
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value || a.label.localeCompare(b.label))
  const main = kit.samples[0]
  const sampleWords = kit.samples.map((s) => letterWords(s.paragraphs))
  const minW = Math.min(...sampleWords)
  const maxW = Math.max(...sampleWords)
  const mainWords = letterWords(main.paragraphs)
  const storyPara = main.paragraphs[1]
  const storyShare = Math.round((wordCount(storyPara.text) / mainWords) * 100)
  const weakWords = letterWords(kit.rewrite.weak.paragraphs)
  const postSrc = posts.map((p) => ({ label: p.company, url: p.url }))

  const toc = [
    { id: 'need', label: 'Do you need one?' },
    { id: 'structure', label: 'Length and structure' },
    { id: 'story', label: 'The analysis story' },
    { id: 'rewrite', label: 'Before and after' },
    { id: 'samples', label: '3 samples' },
    { id: 'words', label: 'Words to mirror' },
    { id: 'check', label: 'Check your letter' },
    { id: 'where', label: 'Portals and India' },
    { id: 'ai', label: 'Using AI' },
    { id: 'template', label: 'Word template' },
  ]

  return (
    <KitShell
      hub={hub}
      kind="cover-letter"
      h1={kit.h1}
      kicker={`Cover letter (covering letter) · ${kit.samples.length} samples · ${n} job posts checked · Free Word template · Updated ${MONTHS[m - 1]} ${y}`}
      directAnswer={kit.directAnswer}
      toc={toc}
      primary={{ href: '#template', label: 'Download the Word template' }}
      faqs={kit.faqs}
      schemas={kitSchemas({
        url,
        name: kit.metaTitle,
        description: kit.metaDescription,
        dateModified: kit.checked,
        hub,
        crumb: 'Cover letter',
        faqs: kit.faqs,
      })}
    >
      {/* 1. Do you need one? */}
      <Section
        id="need"
        n={1}
        title="Do data analysts need a cover letter?"
        sub={`Usually it is optional. Of ${n} live ${hub.shortName} posts we opened on ${checked}, ${required === 0 ? 'none' : required} required one. When a letter is read, a tailored one helps.`}
      >
        <StatRow
          stats={[
            {
              label: 'Live posts that required a cover letter',
              value: `${required} of ${n}`,
              sub: `Our check, ${checked}: ${india} India, ${n - india} US, UK and Europe`,
            },
            ...kit.evidence.map((e) => ({
              label: e.label,
              value: e.value,
              sub: e.sub,
              href: e.href,
            })),
          ]}
        />
        <Figure
          label={`Application forms · ${n} data analyst posts · opened ${checked}`}
          title={`${required === 0 ? 'None' : required} of ${n} posts required a letter; ${optional} offered an optional field`}
          sub={`On the other ${none} we saw no field and no mention.${indiaWithField === 0 ? ` None of the ${india} India posts mentioned one.` : ''}`}
          source={postSrc}
          updated={checked}
          table={{
            head: ['Company', 'Role', 'Location', 'Cover letter'],
            rows: posts.map((p) => [p.company, p.title, p.location, p.coverLetterNote]),
          }}
        >
          <SegmentBar
            parts={[
              { label: 'No field seen, not mentioned', value: none },
              { label: 'Optional field', value: optional },
              { label: 'Required', value: required },
            ].filter((p) => p.value > 0)}
            format={{ suffix: ' posts' }}
          />
        </Figure>
        <ul className="space-y-3 md:hidden">
          {kit.decision.map((d) => (
            <li key={d.situation} className="rounded-xl border border-border bg-surface p-4">
              <div className="text-small font-semibold text-fg">{d.situation}</div>
              <p className="mt-1.5 text-small leading-relaxed text-fg-2">{d.doThis}</p>
              <div className="mt-2 font-mono text-caption text-fg-3">
                {d.length} · effort {d.effort.toLowerCase()}
              </div>
            </li>
          ))}
        </ul>
        <div
          className="hidden overflow-x-auto rounded-xl border border-border bg-surface md:block"
          role="region"
          aria-label="When to write a cover letter"
        >
          <table className="w-full min-w-[640px] text-left text-small">
            <caption className="sr-only">
              When to write a cover letter, how long, and the effort
            </caption>
            <thead className="bg-muted text-fg-2">
              <tr>
                <th scope="col" className="px-4 py-3 font-medium">
                  If this is your situation
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  Do this
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  Length
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  Effort
                </th>
              </tr>
            </thead>
            <tbody>
              {kit.decision.map((d) => (
                <tr key={d.situation} className="border-t border-border align-top">
                  <th scope="row" className="px-4 py-3 font-semibold text-fg">
                    {d.situation}
                  </th>
                  <td className="px-4 py-3 leading-relaxed text-fg-2">{d.doThis}</td>
                  <td className="whitespace-nowrap px-4 py-3 tabular-nums text-fg-2">{d.length}</td>
                  <td className="px-4 py-3 text-fg-2">{d.effort}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="max-w-[68ch] text-caption leading-relaxed text-fg-3">
          Read the numbers with care: ResumeGo sells writing services and does not print its raw
          callback rates; Resume Genius’s figures are what hiring managers say, not what they do.
          Our post count is small and a snapshot, so check each post you apply to.
        </p>
      </Section>

      {/* 2. Length and structure */}
      <Section
        id="structure"
        n={2}
        title="How long, and what goes in each paragraph"
        sub="One page, four short paragraphs, 250–350 words. The analysis story gets the most room."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <Figure
            label="Recommended length · words"
            title="Published guides land between 250 and 400 words"
            sub={`Our three samples: ${minW}–${maxW} words.`}
            source={kit.lengthGuides.map((g) => ({ label: g.label, url: g.href }))}
            updated={checked}
            table={{
              head: ['Source', 'Words', 'Note'],
              rows: [
                ...kit.lengthGuides.map((g) => [
                  g.label,
                  g.min === g.max ? `${g.min}` : `${g.min}–${g.max}`,
                  g.sub,
                ]),
                ['Our samples', `${minW}–${maxW}`, 'Body paragraphs, counted on this page'],
              ],
            }}
          >
            <RangeList
              domain={[200, 500]}
              ticks={3}
              rows={[
                ...kit.lengthGuides.map((g) => ({
                  label: g.label,
                  sub: g.sub,
                  min: g.min,
                  max: g.max,
                  mid: g.min === g.max ? g.min : undefined,
                  display: g.min === g.max ? `${g.min}` : `${g.min}–${g.max}`,
                })),
                {
                  label: 'Our samples',
                  sub: 'counted on this page',
                  min: minW,
                  max: maxW,
                  display: `${minW}–${maxW}`,
                },
              ]}
            />
          </Figure>
          <Figure
            label={`Sample 1 · ${mainWords} words · counted`}
            title={`The analysis story is ${storyShare}% of Ishita’s letter`}
            sub="Word count of each paragraph in Ishita’s letter below."
            source="Our sample, counted on this page"
            updated={checked}
            table={{
              head: ['Paragraph', 'Words'],
              rows: main.paragraphs.map((p) => [p.role, wordCount(p.text)]),
            }}
          >
            <SegmentBar
              sort={false}
              parts={main.paragraphs.map((p) => ({ label: p.role, value: wordCount(p.text) }))}
              format={{ suffix: ' words' }}
            />
          </Figure>
        </div>
        <Flow label="The four paragraphs" steps={kit.structure} />
        <p className="max-w-[68ch] text-small leading-relaxed text-fg-2">
          MIT’s careers office puts it plainly: a cover letter should be{' '}
          <a
            href="https://capd.mit.edu/resources/how-to-write-an-effective-cover-letter/"
            {...ext}
            className={linkCls}
          >
            “no longer than one page”
          </a>
          , and should complement the resume, not repeat it.
        </p>
      </Section>

      {/* 3. The analysis story */}
      <Section
        id="story"
        n={3}
        title="The one paragraph that does the work: an analysis story"
        sub="A hiring manager for an analyst role wants to see how you think. Tell one analysis end to end."
      >
        <Flow label="Question → data → method → decision → number" steps={kit.story} />
        <Card>
          <h3 className="text-h4 font-semibold text-fg">Find your own numbers</h3>
          <p className="mt-1 text-small text-fg-2">
            Most people say they have no numbers. Ask these five questions about your best piece of
            work, and write down only what you could defend in the interview.
          </p>
          <div
            className="mt-4 overflow-x-auto"
            role="region"
            aria-label="Questions to find your numbers"
          >
            <table className="w-full min-w-[720px] text-left text-small">
              <thead className="bg-muted text-fg-2">
                <tr>
                  <th scope="col" className="px-3 py-2.5 font-medium">
                    Kind
                  </th>
                  <th scope="col" className="px-3 py-2.5 font-medium">
                    Ask yourself
                  </th>
                  <th scope="col" className="px-3 py-2.5 font-medium">
                    Example (sample)
                  </th>
                  <th scope="col" className="px-3 py-2.5 font-medium">
                    No job yet?
                  </th>
                </tr>
              </thead>
              <tbody>
                {kit.metricFinder.map((r) => (
                  <tr key={r.kind} className="border-t border-border align-top">
                    <th scope="row" className="px-3 py-2.5 font-semibold text-fg">
                      {r.kind}
                    </th>
                    <td className="px-3 py-2.5 leading-relaxed text-fg-2">{r.ask}</td>
                    <td className="px-3 py-2.5 leading-relaxed text-fg-2">{r.example}</td>
                    <td className="px-3 py-2.5 leading-relaxed text-fg-2">{r.noJob}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <Insight title="No job yet?">
          A public-dataset project counts if it has a question, a finding and a link. Kabir’s letter
          below is built on one. A list of courses is not a story.
        </Insight>
      </Section>

      {/* 4. Before and after */}
      <Section
        id="rewrite"
        n={4}
        title="Before and after: the same person, two letters"
        sub={`The first draft is ${weakWords} words of claims. The rewrite is ${mainWords} words of proof.`}
      >
        <CompareTable
          label="What changes from the weak letter to the strong one"
          corner="Move"
          columns={[{ name: 'Before' }, { name: 'After', featured: true }]}
          rows={kit.rewrite.moves.map((mv) => ({ label: mv.label, cells: [mv.weak, mv.strong] }))}
        />
        <details className="group rounded-xl border border-border bg-surface open:shadow-e1">
          <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-body font-medium text-fg [&::-webkit-details-marker]:hidden">
            Read the “before” letter ({weakWords} words)
            <span
              aria-hidden="true"
              className="font-mono text-fg-3 transition-transform duration-base group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <div className="px-2 pb-2">
            <Letter s={kit.rewrite.weak} />
          </div>
        </details>
        <p className="text-small text-fg-2">
          The “after” letter is sample 1 below.{' '}
          <a href="#sample-experienced" className={linkCls}>
            Jump to it
          </a>
          .
        </p>
      </Section>

      {/* 5. Samples */}
      <Section
        id="samples"
        n={5}
        title={`${kit.samples.length} sample cover letters for data analysts`}
        sub="Experienced, fresher and career switcher. Every name, company and number is made up; copy the structure, not the facts."
      >
        {kit.samples.map((s) => (
          <div key={s.id} id={`sample-${s.id}`} className="scroll-mt-24">
            <Letter s={s} />
          </div>
        ))}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-mono text-kicker uppercase tracking-[0.08em] text-fg-3">
                  Email note · {wordCount(kit.emailNote.body)} words
                </div>
                <h3 className="mt-1 text-h4 font-semibold text-fg">When you email a person</h3>
              </div>
              <CopyButton text={`Subject: ${kit.emailNote.subject}\n\n${kit.emailNote.body}`} />
            </div>
            <p className="mt-3 text-small font-medium text-fg">Subject: {kit.emailNote.subject}</p>
            <p className="mt-2 whitespace-pre-line text-small leading-relaxed text-fg-2">
              {kit.emailNote.body}
            </p>
          </Card>
          <Card>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-mono text-kicker uppercase tracking-[0.08em] text-fg-3">
                  Portal answer · {wordCount(kit.portalAnswer.body)} words
                </div>
                <h3 className="mt-1 text-h4 font-semibold text-fg">
                  “{kit.portalAnswer.question}”
                </h3>
              </div>
              <CopyButton text={kit.portalAnswer.body} />
            </div>
            <p className="mt-3 text-small leading-relaxed text-fg-2">{kit.portalAnswer.body}</p>
            <p className="mt-3 text-caption text-fg-3">
              Fresher version for Internshala-style forms.{' '}
              <a href={kit.portalAnswer.src.url} {...ext} className={linkCls}>
                {kit.portalAnswer.src.label}
              </a>
            </p>
          </Card>
        </div>
      </Section>

      {/* 6. Words to mirror */}
      <Section
        id="words"
        n={6}
        title="Which words to mirror from the job post"
        sub="Use the post’s exact words for the two or three tools you can prove. Here is what our sample of posts asked for."
      >
        <Figure
          label={`Words on ${n} live data analyst posts · checked one by one · ${checked}`}
          title={`SQL was on all ${n} posts; “stakeholder” on ${termCounts.find((t) => t.label === 'stakeholder')?.value ?? 0}`}
          sub="The BI tool varies by company, so read each post: Power BI, Tableau and Looker split the field."
          note="Counted as present when the word appears anywhere on the post. Planet’s Looker is Looker Studio, and its “statistics” is in a list of degrees."
          source={postSrc}
          updated={checked}
          table={{
            head: ['Word on the post', `Posts (of ${n})`],
            rows: termCounts.map((t) => [t.label, t.value]),
          }}
        >
          <BarList rows={termCounts} format={{ suffix: ` of ${n}` }} max={n} />
        </Figure>
        <p className="max-w-[68ch] text-small leading-relaxed text-fg-2">
          The same words belong on your resume. Our{' '}
          <Link href={KIT_PATHS.resume(hub.slug)} className={linkCls}>
            {hub.shortName} resume (CV) kit
          </Link>{' '}
          has a keyword checker and bullet examples for each of them.
        </p>
      </Section>

      {/* 7. Check your letter */}
      <Section
        id="check"
        n={7}
        title="Check your letter"
        sub="Paste a draft. Fixed rules, no AI, nothing leaves your browser."
      >
        <LetterChecker terms={kit.checkerTerms} />
      </Section>

      {/* 8. Portals and India */}
      <Section
        id="where"
        n={8}
        title="Where the letter goes: portals, email and India"
        sub="The same letter is pasted, uploaded, shortened or skipped depending on where you apply."
      >
        <div className="grid gap-3 md:grid-cols-2">
          {kit.portals.map((p) => (
            <Card key={p.name}>
              <h3 className="text-h4 font-semibold text-fg">{p.name}</h3>
              <p className="mt-2 text-small leading-relaxed text-fg-2">{p.whatWeFound}</p>
              <p className="mt-2 text-small leading-relaxed text-fg">
                <span className="font-semibold">Do this: </span>
                {p.doThis}
              </p>
              {p.src && (
                <p className="mt-2 text-caption text-fg-3">
                  <a href={p.src.url} {...ext} className={linkCls}>
                    {p.src.label}
                  </a>
                </p>
              )}
            </Card>
          ))}
        </div>
        <h3 className="pt-4 text-h3 font-semibold text-fg">Applying in India</h3>
        <div className="grid gap-3 md:grid-cols-2">
          {kit.india.map((i) => (
            <Card key={i.title}>
              <h4 className="text-h4 font-semibold text-fg">{i.title}</h4>
              <p className="mt-2 text-small leading-relaxed text-fg-2">{i.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 9. AI */}
      <Section
        id="ai"
        n={9}
        title="Using ChatGPT or Claude for a cover letter"
        sub="AI drafts are now everywhere, so a generic letter says less than it used to. Your own story is what still counts."
      >
        <p className="max-w-[68ch] text-body leading-relaxed text-fg-2">{kit.ai.finding}</p>
        <PullQuote
          name="Cui, Dias and Ye"
          jobTitle="Yale Department of Economics"
          href={kit.ai.src.url}
          source="arXiv 2509.25054"
        >
          {kit.ai.quote}
        </PullQuote>
        <ul className="grid gap-3 md:grid-cols-3">
          {kit.ai.whatToDo.map((w, i) => (
            <li key={w} className="flex gap-3 rounded-xl border border-border bg-surface p-5">
              <span className="font-mono text-h4 text-signal">0{i + 1}</span>
              <span className="text-small leading-relaxed text-fg-2">{w}</span>
            </li>
          ))}
        </ul>
        <AiPrompt p={coverLetterPrompt(hub)} />
      </Section>

      {/* 10. Template */}
      <Section
        id="template"
        n={10}
        title="Free Word template"
        sub="One page, plain text, no tables or graphics, so it pastes cleanly into any portal. No sign-up."
      >
        <Card className="flex flex-wrap items-center justify-between gap-4">
          <div className="max-w-xl">
            <h3 className="text-h4 font-semibold text-fg">
              {hub.roleName} cover letter template (.docx)
            </h3>
            <p className="mt-1 text-small leading-relaxed text-fg-2">
              Ishita’s letter with each paragraph’s job marked in [brackets]. Replace every line
              with your own facts and delete the sample note.
            </p>
          </div>
          <a
            href={kit.template.href}
            download={kit.template.fileName}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-signal px-5 text-small font-semibold text-white shadow-e1 transition-colors duration-fast hover:bg-signal-strong"
          >
            Download Word (.docx) <ArrowRightIcon />
          </a>
        </Card>
        <h3 className="pt-4 text-h3 font-semibold text-fg">Mistakes that cost the interview</h3>
        <div className="grid gap-3 md:grid-cols-2">
          {kit.mistakes.map((mi) => (
            <Card key={mi.mistake}>
              <h4 className="text-h4 font-semibold text-fg">{mi.mistake}</h4>
              <p className="mt-2 text-small leading-relaxed text-fg-2">{mi.fix}</p>
            </Card>
          ))}
        </div>
        <div className="mt-6 flex flex-col gap-4 rounded-xl border border-border bg-surface p-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <div className="font-mono text-kicker uppercase tracking-[0.08em] text-fg-3">
              After the letter
            </div>
            <p className="mt-2 font-serif text-h3 text-fg">
              The letter gets the call. The interview gets the offer.
            </p>
            <p className="mt-1 text-small text-fg-2">
              Practise the {hub.shortName} questions out loud, then read the{' '}
              <Link href={`/${hub.slug}#interview`} className={linkCls}>
                model answers
              </Link>
              .
            </p>
          </div>
          <MockInterviewButton
            label={`Practise the ${hub.shortName} interview`}
            role={hub.roleName}
          />
        </div>
        <div className="pt-4">
          <h3 className="text-small font-semibold text-fg">Sources (opened {checked})</h3>
          <ul className="mt-2 space-y-1 text-caption text-fg-2">
            {kit.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} {...ext} className={linkCls}>
                  {s.label}
                </a>
              </li>
            ))}
            <li>
              Job posts:{' '}
              {posts.map((p, i) => (
                <span key={p.url}>
                  {i > 0 && ', '}
                  <a href={p.url} {...ext} className={linkCls}>
                    {p.company}
                  </a>
                </span>
              ))}
            </li>
          </ul>
        </div>
      </Section>
    </KitShell>
  )
}
