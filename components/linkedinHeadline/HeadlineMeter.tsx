import { LIMIT, PREVIEW } from '@/data/linkedinHeadline/engine'

/**
 * A 220-character ruler: the filled part is the headline, the tinted zone is the first
 * PREVIEW characters (our planning number for narrow views), and a tick marks where the role
 * starts. Server-safe; the checker and the worked example share it.
 */
export default function HeadlineMeter({
  chars,
  rolePos = -1,
  compact = false,
}: {
  chars: number
  rolePos?: number
  compact?: boolean
}) {
  const over = chars > LIMIT
  const pct = Math.min(chars / LIMIT, 1) * 100
  const zone = (PREVIEW / LIMIT) * 100
  return (
    <div>
      <div
        className={`relative w-full overflow-hidden rounded-md bg-muted ${compact ? 'h-3' : 'h-5'}`}
        role="img"
        aria-label={`${chars} of ${LIMIT} characters${over ? ', over the limit' : ''}${
          rolePos >= 0 ? `; the role starts at character ${rolePos + 1}` : '; no role found'
        }`}
      >
        <div
          className="absolute inset-y-0 left-0 bg-signal-tint ring-1 ring-inset ring-signal/20"
          style={{ width: `${zone}%` }}
        />
        <div
          className={`absolute inset-y-0 left-0 transition-[width] duration-slow ease-standard ${
            over ? 'bg-danger' : 'bg-viz-1'
          }`}
          style={{ width: `${pct}%`, opacity: 0.9 }}
        />
        {rolePos >= 0 && rolePos < LIMIT && (
          <div
            className="absolute inset-y-0 w-[3px] bg-viz-s5"
            style={{ left: `calc(${(rolePos / LIMIT) * 100}% - 1px)` }}
          />
        )}
      </div>
      {!compact && (
        <div className="mt-1.5 flex justify-between text-caption tabular-nums text-fg-3">
          <span>0</span>
          <span style={{ marginLeft: `${zone - 8}%` }} className="mr-auto">
            {PREVIEW}
          </span>
          <span>{LIMIT}</span>
        </div>
      )}
    </div>
  )
}
