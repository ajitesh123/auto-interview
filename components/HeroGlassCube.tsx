'use client'

import React, { useEffect, useState } from 'react'
import CubeLogo from '@/components/CubeLogo'

/**
 * Animated Hero Logo
 * Clean standalone 3D isometric logo with modern Apple-style entrance physics
 * and interactive 3D perspective response without any surrounding box or card.
 */
export default function HeroGlassCube() {
  const [mounted, setMounted] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true)
    }, 60)
    return () => clearTimeout(timer)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16
    setMousePos({ x, y })
  }

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 })
  }

  return (
    <div
      className="relative flex cursor-pointer items-center justify-center p-4"
      style={{
        transform: mounted ? `translateY(0px) scale(1)` : `translateY(56px) scale(0.92)`,
        opacity: mounted ? 1 : 0,
        transition:
          'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="transition-transform duration-300 ease-out"
        style={{
          transform: `perspective(800px) rotateY(${mousePos.x}deg) rotateX(${mousePos.y}deg)`,
        }}
      >
        <CubeLogo
          size={175}
          className="drop-shadow-sm transition-transform duration-500 hover:scale-105"
        />
      </div>
    </div>
  )
}
