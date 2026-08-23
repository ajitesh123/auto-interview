import React from 'react'

interface CubeLogoProps {
  size?: number
  className?: string
}

export default function CubeLogo({ size = 24, className = '' }: CubeLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g stroke="#fafafa" strokeWidth="2" strokeLinejoin="round">
        {/* Top block */}
        {/* Top face */}
        <path d="M50,10 L70,22 L50,34 L30,22 Z" fill="#000000" />
        {/* Left face */}
        <path d="M30,22 L50,34 L50,58 L30,46 Z" fill="#000000" />
        {/* Right face */}
        <path d="M50,34 L70,22 L70,46 L50,58 Z" fill="#000000" />

        {/* Left block */}
        {/* Top face */}
        <path d="M30,46 L50,58 L30,70 L10,58 Z" fill="#000000" />
        {/* Left face */}
        <path d="M10,58 L30,70 L30,94 L10,82 Z" fill="#000000" />
        {/* Right face */}
        <path d="M30,70 L50,58 L50,82 L30,94 Z" fill="#000000" />

        {/* Right block */}
        {/* Top face */}
        <path d="M70,46 L90,58 L70,70 L50,58 Z" fill="#000000" />
        {/* Left face */}
        <path d="M50,58 L70,70 L70,94 L50,82 Z" fill="#000000" />
        {/* Right face */}
        <path d="M70,70 L90,58 L90,82 L70,94 Z" fill="#000000" />
      </g>
    </svg>
  )
}
