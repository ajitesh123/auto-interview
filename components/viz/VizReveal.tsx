'use client'

import { useEffect, useRef } from 'react'

/**
 * Arms the nearest [data-viz] figure if it is below the fold, then releases it once it scrolls
 * into view, so bars grow and lines draw one time (CSS in css/tailwind.css, "DATA VISUALS").
 * A figure already on screen is left drawn, so nothing flickers on load. Reduced motion and
 * no-JS readers always see the finished chart.
 */
export default function VizReveal() {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const fig = ref.current?.closest<HTMLElement>('[data-viz]')
    if (!fig || !('IntersectionObserver' in window)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = fig.getBoundingClientRect()
    if (r.top < window.innerHeight && r.bottom > 0) return
    fig.dataset.viz = 'armed'
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            fig.dataset.viz = 'in'
            io.disconnect()
          }
        }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    )
    io.observe(fig)
    return () => {
      io.disconnect()
      fig.dataset.viz = 'in'
    }
  }, [])
  return <span ref={ref} hidden />
}
