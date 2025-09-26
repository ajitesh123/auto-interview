import React from 'react'
import Image from 'next/image'

interface LogoProps {
  className?: string
  width?: number
  height?: number
}

const Logo: React.FC<LogoProps> = ({ className = '', width = 50, height = 50 }) => {
  return (
    <Image
      src="/static/images/logo.png"
      alt="Auto Interview Logo"
      width={width}
      height={height}
      className={className}
      priority
    />
  )
}

export default Logo
