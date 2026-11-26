import { KEYS, PARTS, type NeedHit, type PartKey } from '@/data/wswhy/engine'

// Ordered parts use the one-hue ramp (data marks only). Server-safe: the builder and the worked
// example share it, so the colours mean the same thing everywhere on the page.
export const SEG: Record<PartKey, string> = {
  match: 'bg-viz-s1 text-fg',
  proof: 'bg-viz-s3 text-white',
  value: 'bg-viz-s5 text-white',
}

export default function WswhySplit({ words }: { words: Record<PartKey, number> }) {
  const total = KEYS.reduce((s, k) => s + words[k], 0)
  const share = (k: PartKey) => (total ? Math.round((words[k] / total) * 100) : 0)
  return (
    <div
      className="flex h-8 w-full gap-[2px] overflow-hidden rounded-md bg-muted"
      role="img"
      aria-label={
        total ? KEYS.map((k) => `${PARTS[k].name} ${share(k)}%`).join(', ') : 'No words yet'
      }
    >
      {total > 0 &&
        KEYS.map((k) =>
          words[k] ? (
            <div
              key={k}
              className={`flex items-center justify-center overflow-hidden whitespace-nowrap px-1 text-caption font-semibold tabular-nums transition-[width] duration-slow ease-standard ${SEG[k]}`}
              style={{ width: `${(words[k] / total) * 100}%` }}
            >
              {share(k) >= 30
                ? `${PARTS[k].name} ${share(k)}%`
                : share(k) >= 9
                  ? `${share(k)}%`
                  : ''}
            </div>
          ) : null
        )}
    </div>
  )
}

// Each need from the job post, and where the answer covers it: named (match or value part) and
// proved (in the proof part).
export function NeedMap({ needs }: { needs: NeedHit[] }) {
  if (!needs.length)
    return (
      <p className="text-caption text-fg-3">
        Add the job post&apos;s needs above to see which ones your answer covers.
      </p>
    )
  return (
    <ul className="space-y-1.5">
      {needs.map((n, i) => {
        const st = n.inProof ? 'proved' : n.inMatch ? 'named' : 'missing'
        return (
          <li key={`${i}-${n.need}`} className="flex items-center justify-between gap-3 text-small">
            <span className="min-w-0 truncate font-medium text-fg">{n.need}</span>
            <span
              className={`inline-flex h-6 shrink-0 items-center rounded-full px-2 text-caption font-semibold transition-colors duration-base ${
                st === 'proved'
                  ? 'bg-success-soft text-success-strong'
                  : st === 'named'
                    ? 'bg-signal-tint text-signal-ink'
                    : 'bg-muted text-fg-3'
              }`}
            >
              {st === 'proved' ? 'Named + proved' : st === 'named' ? 'Named only' : 'Not in it yet'}
            </span>
          </li>
        )
      })}
    </ul>
  )
}
