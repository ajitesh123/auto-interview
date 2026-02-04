import React, { ReactNode } from 'react'

interface ContentBoxProps {
  children: ReactNode
  className?: string
  padding?: 'sm' | 'md' | 'lg'
  background?: 'white' | 'warm' | 'gray'
}

/**
 * Premium Content Box Component
 * Large structured container like ElevenLabs
 */
const ContentBox = ({
  children,
  className = '',
  padding = 'lg',
  background = 'warm',
}: ContentBoxProps) => {
  const paddingClasses = {
    sm: 'p-6 sm:p-8',
    md: 'p-8 sm:p-12',
    lg: 'p-10 sm:p-16',
  }

  const backgroundClasses = {
    white: 'bg-white',
    warm: 'bg-[#F8F6F3]',
    gray: 'bg-gray-50',
  }

  return (
    <div
      className={`rounded-3xl ${backgroundClasses[background]} ${paddingClasses[padding]} ${className} `}
    >
      {children}
    </div>
  )
}

export default ContentBox
