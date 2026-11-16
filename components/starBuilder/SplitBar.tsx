import { PARTS, type PartKey } from '@/data/starMethod/engine'

// Ordered parts use the one-hue ramp (data marks only): Situation lightest, Action in Signal blue.
export const SEG: Record<PartKey, string> = {
  s: 'bg-viz-s1 text-fg',
  t: 'bg-viz-s2 text-white',
  a: 'bg-viz-s3 text-white',
  r: 'bg-viz-s4 text-white',
}

/**
 * The S/T/A/R time split as one bar, with the MIT CAPD target split as a thin bar under it.
 * Server-safe (no hooks): the builder and the worked example on /star-method share it, so the
 * colours mean the same thing everywhere on the page. Widths ease when they change.
 */
export default function SplitBar({
  words,
  showTarget = true,
}: {
  words: Record<PartKey, number>
  showTarget?: boolean
}) {
  const total = words.s + words.t + words.a + words.r
  const share = (k: PartKey) => (total ? Math.round((words[k] / total) * 100) : 0)
  return (
    <div>
      <div
        className="flex h-8 w-full gap-[2px] overflow-hidden rounded-md bg-muted"
        role="img"
        aria-label={
          total ? PARTS.map((p) => `${p.name} ${share(p.key)}%`).join(', ') : 'No words yet'
        }
      >
        {total > 0 &&
          PARTS.map((p) =>
            words[p.key] ? (
              <div
                key={p.key}
                className={`flex items-center justify-center whitespace-nowrap text-caption font-semibold tabular-nums transition-[width] duration-slow ease-standard ${SEG[p.key]}`}
                style={{ width: `${(words[p.key] / total) * 100}%` }}
              >
                {share(p.key) >= 9 ? `${p.letter} ${share(p.key)}%` : ''}
              </div>
            ) : null
          )}
      </div>
      {showTarget && (
        <>
          <div
            className="mt-1.5 flex h-2 w-full gap-[2px] overflow-hidden rounded-sm opacity-60"
            aria-hidden="true"
          >
            {PARTS.map((p) => (
              <div
                key={p.key}
                className={SEG[p.key].split(' ')[0]}
                style={{ width: `${p.target}%` }}
              />
            ))}
          </div>
          <div className="mt-1 text-caption text-fg-3">
            Thin bar: MIT CAPD&apos;s target split (20 / 10 / 60 / 10).
          </div>
        </>
      )}
    </div>
  )
}
