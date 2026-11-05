// Small inline icons (Lucide geometry, 1.75 stroke). Decorative by default.
type P = { className?: string }
const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox: '0 0 24 24',
  'aria-hidden': true,
}

export const CheckIcon = ({ className = 'h-4 w-4' }: P) => (
  <svg {...base} className={className}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
)
export const ChevronDownIcon = ({ className = 'h-4 w-4' }: P) => (
  <svg {...base} className={className}>
    <path d="m6 9 6 6 6-6" />
  </svg>
)
export const ArrowRightIcon = ({ className = 'h-4 w-4' }: P) => (
  <svg {...base} className={className}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)
export const ArrowUpRightIcon = ({ className = 'h-3.5 w-3.5' }: P) => (
  <svg {...base} className={className}>
    <path d="M7 17 17 7M7 7h10v10" />
  </svg>
)
export const SparkIcon = ({ className = 'h-4 w-4' }: P) => (
  <svg {...base} className={className}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.8 2.8M14.9 14.9l2.8 2.8M6.3 17.7l2.8-2.8M14.9 9.1l2.8-2.8" />
  </svg>
)
export const MicIcon = ({ className = 'h-4 w-4' }: P) => (
  <svg {...base} className={className}>
    <rect x="9" y="2" width="6" height="12" rx="3" />
    <path d="M19 10a7 7 0 0 1-14 0M12 17v5" />
  </svg>
)
