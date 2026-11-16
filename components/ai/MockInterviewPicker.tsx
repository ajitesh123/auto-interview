'use client'

import { useState } from 'react'

export type MockOption = {
  id: string // Tough Tongue AI scenario id (public)
  label: string // short tab label
  title: string
  forWho: string
  about: string // from the scenario's own description
  minutes?: string
}

/**
 * Pick an interview, then talk to it. Each option is a public Tough Tongue AI scenario shown in
 * an iframe; switching tabs swaps the iframe source. The frame stays light until the embed loads.
 */
export default function MockInterviewPicker({ options }: { options: MockOption[] }) {
  const [active, setActive] = useState(0)
  const o = options[active]
  return (
    <div>
      <div
        role="tablist"
        aria-label="Choose an interview"
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:px-0"
      >
        {options.map((opt, i) => (
          <button
            key={opt.id}
            type="button"
            role="tab"
            id={`mi-tab-${i}`}
            aria-selected={i === active}
            aria-controls="mi-panel"
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
              e.preventDefault()
              const n = (i + (e.key === 'ArrowRight' ? 1 : -1) + options.length) % options.length
              setActive(n)
              document.getElementById(`mi-tab-${n}`)?.focus()
            }}
            className={`inline-flex h-10 shrink-0 items-center rounded-full px-4 text-small font-medium transition-colors duration-fast ${
              i === active
                ? 'bg-fg text-bg'
                : 'bg-surface text-fg-2 ring-1 ring-inset ring-border hover:text-fg hover:ring-border-strong'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div
        id="mi-panel"
        role="tabpanel"
        aria-labelledby={`mi-tab-${active}`}
        className="mt-4 overflow-hidden rounded-2xl border border-border bg-surface shadow-e2"
      >
        <div className="flex flex-col gap-1 border-b border-border px-5 py-4 md:flex-row md:items-baseline md:justify-between md:gap-6">
          <div>
            <h2 className="text-h4 font-semibold text-fg">{o.title}</h2>
            <p className="mt-1 max-w-[70ch] text-small text-fg-2">{o.about}</p>
          </div>
          <p className="shrink-0 text-caption text-fg-3">
            {o.forWho}
            {o.minutes ? ` · ${o.minutes}` : ''}
          </p>
        </div>
        <div className="bg-muted">
          <iframe
            key={o.id}
            src={`https://app.toughtongueai.com/embed/${o.id}?skipPrecheck=true`}
            width="100%"
            height="720"
            allow="microphone; camera; display-capture"
            title={`${o.title}: mock interview by Tough Tongue AI`}
            className="block h-[640px] w-full border-0 md:h-[720px]"
          />
        </div>
        <p className="border-t border-border px-5 py-3 text-caption text-fg-3">
          Not loading?{' '}
          <a
            href={`https://app.toughtongueai.com/embed/${o.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-signal-strong underline decoration-signal/30 underline-offset-2 hover:decoration-signal"
          >
            Open this interview in a new tab
          </a>
        </p>
      </div>
    </div>
  )
}
