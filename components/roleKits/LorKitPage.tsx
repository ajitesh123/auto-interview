import Link from 'next/link'
import type { RoleHub } from '@/data/roleHubs/types'
import type { LorKit } from '@/data/roleKits/types'
import { KIT_PATHS } from '@/data/roleKits'
import { ArrowRightIcon, CheckIcon } from '@/components/roleHub/icons'
import { CopyButton } from './KitClient'
import { Card, KitShell, Section, SITE, kitSchemas } from './KitLayout'
import { PromptKit } from '@/components/ai/AiPrompt'
import { lorPrompt, resumePrompt } from '@/data/aiPrompts'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default function LorKitPage({ hub, kit }: { hub: RoleHub; kit: LorKit }) {
  const url = `${SITE}${KIT_PATHS.lor(hub.slug)}`
  const [y, m] = hub.lastUpdated.split('-').map(Number)
  const letterText = `${kit.sampleLetter.paragraphs.join('\n\n')}\n\n${kit.sampleLetter.signoff}`
  const toc = [
    { id: 'who', label: 'Who should write it' },
    { id: 'highlight', label: 'What it must prove' },
    { id: 'structure', label: 'Structure' },
    { id: 'sample', label: 'Sample letter' },
    { id: 'ask', label: 'How to ask' },
    { id: 'variants', label: 'Job, MBA, promotion' },
    { id: 'mistakes', label: 'Mistakes' },
  ]
  return (
    <KitShell
      hub={hub}
      kind="lor"
      h1={kit.h1}
      kicker={`Recommendation letter guide · Sample letter and email · Updated ${MONTHS[m - 1]} ${y}`}
      directAnswer={kit.directAnswer}
      toc={toc}
      primary={{ href: '#sample', label: 'See the sample letter' }}
      faqs={kit.faqs}
      schemas={kitSchemas({
        url,
        name: kit.metaTitle,
        description: kit.metaDescription,
        dateModified: hub.lastUpdated,
        hub,
        crumb: 'Letter of recommendation',
        faqs: kit.faqs,
      })}
    >
      <Section
        id="who"
        n={1}
        title="Who should write it"
        sub="Pick the person who saw your work most closely, not the one with the biggest title."
      >
        <div className="grid gap-3 md:grid-cols-3">
          {kit.whoShouldWrite.map((w) => (
            <Card key={w.who}>
              <h3 className="text-h4 font-semibold text-fg">{w.who}</h3>
              <p className="mt-2 text-small leading-relaxed text-fg-2">{w.why}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        id="highlight"
        n={2}
        title={`What a ${hub.shortName} letter must prove`}
        sub="Each quality needs a specific story. Here is the kind of line that proves it."
      >
        <div className="grid gap-3 md:grid-cols-2">
          {kit.whatToHighlight.map((h) => (
            <Card key={h.quality}>
              <div className="flex items-center gap-2 text-h4 font-semibold text-fg">
                <CheckIcon className="h-4 w-4 text-signal-strong" />
                {h.quality}
              </div>
              <p className="mt-2 border-l-0 font-serif text-body-lg italic leading-relaxed text-fg-2">
                {h.evidence}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="structure" n={3} title="Structure: one page, five short parts">
        <ol className="space-y-0 overflow-hidden rounded-xl border border-border bg-surface">
          {kit.structure.map((s, i) => (
            <li
              key={s.part}
              className="grid gap-1 border-b border-border p-4 last:border-b-0 md:grid-cols-[200px_1fr] md:gap-6 md:p-5"
            >
              <span className="flex items-center gap-3 text-small font-semibold text-fg">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-fg font-mono text-[11px] text-bg">
                  {i + 1}
                </span>
                {s.part}
              </span>
              <span className="text-small leading-relaxed text-fg-2">{s.what}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        id="sample"
        n={4}
        title="Sample letter of recommendation"
        sub={kit.sampleLetter.context}
      >
        <div className="flex flex-wrap gap-2">
          <CopyButton text={letterText} label="Copy the letter" />
        </div>
        <article
          aria-label="Sample letter"
          className="mx-auto max-w-[760px] rounded-2xl border border-border bg-white p-6 shadow-e2 md:p-10"
        >
          <div className="space-y-4">
            {kit.sampleLetter.paragraphs.map((p, i) => (
              <p key={i} className="text-body leading-relaxed text-fg">
                {p}
              </p>
            ))}
          </div>
          <p className="mt-6 border-t border-border pt-4 text-small text-fg-2">
            {kit.sampleLetter.signoff}
          </p>
        </article>
        <p className="mx-auto max-w-[760px] text-caption text-fg-3">
          All people, companies and numbers in this sample are fictional. Your recommender should
          write in their own words.
        </p>
      </Section>

      <Section
        id="ask"
        n={5}
        title="How to ask, and what to send"
        sub="Make it easy to say yes: a short email plus a one-page brief."
      >
        <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
          <Card>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-caption font-semibold text-fg-3">
                  Email to your recommender
                </div>
                <div className="mt-1 text-small font-semibold text-fg">
                  Subject: {kit.askEmail.subject}
                </div>
              </div>
              <CopyButton text={`Subject: ${kit.askEmail.subject}\n\n${kit.askEmail.body}`} />
            </div>
            <p className="mt-3 whitespace-pre-line rounded-lg bg-muted p-4 text-small leading-relaxed text-fg">
              {kit.askEmail.body}
            </p>
          </Card>
          <Card>
            <div className="flex items-start justify-between gap-3">
              <div className="text-caption font-semibold text-fg-3">The brief to attach</div>
              <CopyButton text={kit.brief.map((b) => `• ${b}`).join('\n')} />
            </div>
            <ul className="mt-3 space-y-2.5">
              {kit.brief.map((b) => (
                <li key={b} className="flex gap-3 text-small leading-relaxed text-fg-2">
                  <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-signal-strong" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      <Section
        id="variants"
        n={6}
        title="Job, MBA, promotion or referral"
        sub="Same stories, different emphasis."
      >
        <div className="grid gap-3 md:grid-cols-2">
          {kit.variants.map((v) => (
            <Card key={v.context}>
              <h3 className="text-h4 font-semibold text-fg">{v.context}</h3>
              <p className="mt-2 text-small leading-relaxed text-fg-2">{v.tweak}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="mistakes" n={7} title="Mistakes that weaken a recommendation">
        <ul className="space-y-2.5">
          {kit.mistakes.map((x) => (
            <li
              key={x}
              className="flex gap-3 rounded-xl border border-border bg-surface p-4 text-small leading-relaxed text-fg-2"
            >
              <span aria-hidden="true" className="font-mono text-fg-3">
                ×
              </span>
              <span>{x}</span>
            </li>
          ))}
        </ul>
        <Card className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-h4 font-semibold text-fg">Fix your resume next</div>
            <p className="mt-1 text-small text-fg-2">
              Bullet bank, keywords from real job posts and a sample one-page {hub.shortName}{' '}
              resume.
            </p>
          </div>
          <Link
            href={KIT_PATHS.resume(hub.slug)}
            className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full bg-surface px-4 text-small font-semibold text-fg ring-1 ring-inset ring-border-strong hover:bg-muted"
          >
            {hub.shortName} resume (CV) guide <ArrowRightIcon />
          </Link>
        </Card>
      </Section>
      <section id="with-ai" className="scroll-mt-24 border-t border-border py-12 md:py-16">
        <PromptKit
          title="Prepare the ask with AI"
          sub="A recommender writes a stronger letter from a clear brief. This prompt builds the email, the brief and a draft in their voice from your real stories."
          prompts={[lorPrompt(hub), resumePrompt(hub)]}
        />
      </section>
    </KitShell>
  )
}
