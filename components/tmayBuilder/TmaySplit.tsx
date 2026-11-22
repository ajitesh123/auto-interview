import { ORDERS, PARTS, type Order, type PartKey } from '@/data/tmay/engine'

// Ordered parts use the one-hue ramp (data marks only). Server-safe: the builder and the worked
// example share it, so the colours mean the same thing everywhere on the page.
export const SEG: Record<PartKey, string> = {
  present: 'bg-viz-s1 text-fg',
  past: 'bg-viz-s3 text-white',
  future: 'bg-viz-s5 text-white',
}

export default function TmaySplit({
  words,
  order = 'present-first',
}: {
  words: Record<PartKey, number>
  order?: Order
}) {
  const keys = ORDERS[order].keys
  const total = keys.reduce((s, k) => s + words[k], 0)
  const share = (k: PartKey) => (total ? Math.round((words[k] / total) * 100) : 0)
  return (
    <div
      className="flex h-8 w-full gap-[2px] overflow-hidden rounded-md bg-muted"
      role="img"
      aria-label={
        total ? keys.map((k) => `${PARTS[k].name} ${share(k)}%`).join(', ') : 'No words yet'
      }
    >
      {total > 0 &&
        keys.map((k) =>
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
