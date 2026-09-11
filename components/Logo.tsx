import React from 'react'
import CubeLogo from './CubeLogo'

interface LogoProps {
  className?: string
  width?: number
  height?: number
}

const Logo: React.FC<LogoProps> = ({ className = '', width = 50, height = 50 }) => {
  return <CubeLogo size={width || height || 50} className={className} />
}

export default Logo
