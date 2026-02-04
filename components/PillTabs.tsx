'use client'

import { useState } from 'react'

interface PillTab {
  id: string
  label: string
}

interface PillTabsProps {
  tabs: PillTab[]
  activeTab: string
  onChange: (tabId: string) => void
  className?: string
}

/**
 * ElevenLabs-style Pill Tab Navigation
 * Clean tabbed interface with rounded pills
 */
const PillTabs = ({ tabs, activeTab, onChange, className = '' }: PillTabsProps) => {
  return (
    <div className={`inline-flex gap-2 rounded-full bg-gray-100 p-2 ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-200 ${
            activeTab === tab.id
              ? 'bg-white text-black shadow-sm'
              : 'text-gray-600 hover:text-black'
          } `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export default PillTabs
