import Link from 'next/link'

/**
 * The one mock-interview call to action, used everywhere: a pill with a small moving voice
 * meter, so it reads as "this talks". Links to /free-mock-interview, which runs the Tough
 * Tongue AI voice interviewer. `tone="light"` is for ink bands.
 */
export default function MockInterviewButton({
  label = 'Free mock interview',
  tone = 'ink',
  caption = true,
  role,
}: {
  label?: string
  tone?: 'ink' | 'light'
  caption?: boolean
  role?: string // e.g. "Data Analyst": used in the caption
}) {
  const ink = tone === 'ink'
  return (
    <span className="inline-flex flex-col gap-1.5">
      <Link
        href="/free-mock-interview"
        className={`group inline-flex h-12 items-center gap-3 rounded-full pl-2 pr-5 text-small font-semibold shadow-e1 transition-[box-shadow,background-color] duration-fast hover:shadow-e2 ${
          ink ? 'bg-ink text-ink-fg hover:bg-ink-2' : 'bg-white text-ink hover:bg-white/90'
        }`}
      >
        <span
          aria-hidden="true"
          className={`flex h-8 w-8 items-center justify-center gap-[3px] rounded-full ${ink ? 'bg-white/10' : 'bg-ink'}`}
        >
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={`mi-bar w-[3px] rounded-full ${ink ? 'bg-signal-on-ink' : 'bg-white'}`}
              style={{ animationDelay: `${i * 140}ms` }}
            />
          ))}
        </span>
        {label}
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="h-4 w-4 transition-transform duration-base group-hover:translate-x-0.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
        >
          <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
      {caption && (
        <span className={`pl-2 text-caption ${ink ? 'text-fg-3' : 'text-ink-fg-2'}`}>
          {role ? `${role} questions, out loud` : 'Out loud, with a voice interviewer'} · by Tough
          Tongue AI
        </span>
      )}
    </span>
  )
}
