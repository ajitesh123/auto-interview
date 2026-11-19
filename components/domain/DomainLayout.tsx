import React from 'react'
import GlassNav from './GlassNav'
import SiteFooter from './SiteFooter'

interface DomainLayoutProps {
  children: React.ReactNode
  currentPath?: string
}

const DomainLayout: React.FC<DomainLayoutProps> = ({ children, currentPath }) => {
  return (
    <div className="domain-page">
      <GlassNav currentPath={currentPath} />
      <main>{children}</main>

      <SiteFooter />
    </div>
  )
}

export default DomainLayout
