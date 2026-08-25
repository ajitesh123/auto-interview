'use client'

import React, { useEffect, useState } from 'react'
import CubeLogo from '@/components/CubeLogo'

export default function HeroGlassCube() {
  const [mounted, setMounted] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Trigger entrance animation on mount
    const timer = setTimeout(() => {
      setMounted(true)
    }, 50)
    return () => clearTimeout(timer)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14
    setMousePos({ x, y })
  }

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 })
  }

  return (
    <div
      className="relative flex items-center justify-center p-8 transition-transform duration-700 ease-out"
      style={{
        transform: mounted ? `translateY(0px) scale(1)` : `translateY(64px) scale(0.9)`,
        opacity: mounted ? 1 : 0,
        transition:
          'transform 1.1s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Soft Ambient Radial Glow (Apple-style backlight) */}
      <div
        className="pointer-events-none absolute -inset-6 rounded-full opacity-60 blur-3xl transition-opacity duration-500"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(23, 23, 23, 0.08) 0%, rgba(0, 0, 0, 0) 70%)',
        }}
      />

      {/* Apple-Style Frosted Glass Container Card */}
      <div
        className="group relative flex h-[240px] w-[240px] items-center justify-center rounded-[24px] transition-all duration-300 sm:h-[270px] sm:w-[270px]"
        style={{
          background:
            'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(250, 250, 250, 0.55) 100%)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          boxShadow: `
            0 0 0 1px rgba(0, 0, 0, 0.06),
            0 24px 48px -12px rgba(0, 0, 0, 0.08),
            0 8px 16px -4px rgba(0, 0, 0, 0.03),
            inset 0 1px 1px 0 rgba(255, 255, 255, 0.9),
            inset 0 -1px 1px 0 rgba(0, 0, 0, 0.02)
          `,
          transform: `perspective(1000px) rotateY(${mousePos.x}deg) rotateX(${mousePos.y}deg)`,
        }}
      >
        {/* Specular Top-Light Glass Sheen */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[24px] opacity-75"
          style={{
            background:
              'linear-gradient(120deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 45%, rgba(0,0,0,0.02) 100%)',
          }}
        />

        {/* 4x4x4 Isometric 3D Cube with Micro Float Animation */}
        <div className="relative z-10 transition-transform duration-500 group-hover:scale-[1.04]">
          <CubeLogo size={150} />
        </div>

        {/* Bottom subtle brand indicator */}
        <div className="pointer-events-none absolute bottom-3.5 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.1em] text-[#888888] opacity-60">
          4×4×4 ARCHITECTURE
        </div>
      </div>
    </div>
  )
}
