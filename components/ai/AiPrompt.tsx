import { CopyButton } from '@/components/roleKits/KitClient'

// "Do it with AI" launcher. No API and no key: each button is a plain link that opens Claude or
// ChatGPT in a new tab with the prompt already typed in (claude.ai/new?q=… and chatgpt.com/?q=…).
// The reader uses their own free account there. The full prompt is always on our page too, so
// it can be read, copied and edited. Rahul, 11 Nov 2026: "give a way for them to go to Claude
// directly... the prompt would also be there if they click on that."

export interface AiPromptDef {
  id: string
  title: string // what the reader gets, e.g. "Rewrite my resume for this role"
  why: string // one line: when to use it and what to paste
  prompt: string // keep under ~1,500 characters so the link works everywhere
}

export const claudeUrl = (prompt: string) => `https://claude.ai/new?q=${encodeURIComponent(prompt)}`
export const chatgptUrl = (prompt: string) => `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`

const btn =
  'inline-flex h-10 items-center gap-2 rounded-full px-4 text-small font-semibold transition-colors duration-fast'

export function AiPrompt({ p, open = false }: { p: AiPromptDef; open?: boolean }) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-surface p-5">
      <div className="text-h4 font-semibold text-fg">{p.title}</div>
      <p className="mt-1 text-small text-fg-2">{p.why}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href={claudeUrl(p.prompt)}
          target="_blank"
          rel="noopener nofollow"
          className={`${btn} bg-ink text-ink-fg hover:bg-ink-2`}
        >
          Open in Claude <Arrow />
        </a>
        <a
          href={chatgptUrl(p.prompt)}
          target="_blank"
          rel="noopener nofollow"
          className={`${btn} bg-surface text-fg ring-1 ring-inset ring-border-strong hover:bg-muted`}
        >
          Open in ChatGPT <Arrow />
        </a>
        <CopyButton text={p.prompt} label="Copy prompt" />
      </div>
      <details className="group mt-4" open={open}>
        <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 text-caption font-medium text-fg-2 hover:text-fg [&::-webkit-details-marker]:hidden">
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="h-3.5 w-3.5 transition-transform duration-base group-open:rotate-90"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
          >
            <path d="M6 3.5 10.5 8 6 12.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Read the prompt
        </summary>
        <pre className="mt-3 max-h-72 overflow-auto whitespace-pre-wrap rounded-lg bg-muted p-4 font-mono text-caption leading-relaxed text-fg">
          {p.prompt}
        </pre>
      </details>
    </div>
  )
}

/** A titled group of prompts with the honest small print. */
export function PromptKit({
  title = 'Do it with AI',
  sub,
  prompts,
  columns = 2,
}: {
  title?: string
  sub?: string
  prompts: AiPromptDef[]
  columns?: 1 | 2
}) {
  return (
    <div>
      <div className="max-w-2xl">
        <div className="font-mono text-kicker uppercase tracking-[0.08em] text-signal-strong">
          {prompts.length} ready prompts · opens Claude or ChatGPT · free
        </div>
        <h2 className="mt-2 text-h2 font-semibold text-fg">{title}</h2>
        {sub && <p className="mt-2 text-body text-fg-2">{sub}</p>}
      </div>
      <div className={`mt-7 grid gap-4 ${columns === 2 ? 'md:grid-cols-2' : ''}`}>
        {prompts.map((p) => (
          <AiPrompt key={p.id} p={p} />
        ))}
      </div>
      <p className="mt-4 max-w-prose text-caption text-fg-3">
        Each button opens a new tab with the prompt typed in. You use your own Claude or ChatGPT
        account; nothing you type there comes back to this site. Replace the parts in [square
        brackets], and do not paste anything confidential. Check every fact the AI writes about you.
      </p>
    </div>
  )
}

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
    >
      <path d="M5 11 11 5M6 5h5v5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
