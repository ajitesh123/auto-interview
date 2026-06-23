'use client'

import React, { useState } from 'react'
import type { SubDomain } from '@/data/domains'
import ResourceCard from './ResourceCard'
import ComingSoonTab from './ComingSoonTab'

interface ContentHubTabsProps {
  subDomain: SubDomain
  domainSlug: string
}

type TabId = 'resources' | 'mock-interview' | 'resume-building'

const ContentHubTabs: React.FC<ContentHubTabsProps> = ({ subDomain, domainSlug }) => {
  const [activeTab, setActiveTab] = useState<TabId>('resources')

  const tabs: { id: TabId; label: string; isComingSoon: boolean }[] = [
    { id: 'resources', label: 'Resources', isComingSoon: false },
    { id: 'mock-interview', label: 'Mock Interview', isComingSoon: true },
    { id: 'resume-building', label: 'Resume Building with AI', isComingSoon: true },
  ]

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2 border-b border-white/10 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'border border-white/20 bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.15)]'
                : 'border border-transparent text-[hsl(240,4%,66%)] hover:bg-white/[0.04] hover:text-white'
            }`}
          >
            {tab.label}
            {tab.isComingSoon && (
              <span className="rounded-full bg-white/[0.08] px-2 py-0.5 text-[10px] uppercase tracking-wider text-[hsl(240,4%,66%)]">
                Soon
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="animate-fade-rise" key={activeTab}>
        {activeTab === 'resources' && (
          <div>
            {subDomain.resources.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {subDomain.resources.map((resource) => (
                  <ResourceCard
                    key={resource.slug}
                    resource={resource}
                    domainSlug={domainSlug}
                    subDomainSlug={subDomain.slug}
                  />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center">
                <p className="text-lg text-[hsl(240,4%,66%)]">
                  Resources for {subDomain.name} are being prepared. Check back soon!
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'mock-interview' && (
          <ComingSoonTab
            featureName="Mock Interview"
            description={`AI-powered mock interviews for ${subDomain.name}. Practice with realistic scenarios and get instant feedback.`}
          />
        )}

        {activeTab === 'resume-building' && (
          <ComingSoonTab
            featureName="Resume Building with AI"
            description={`Create a tailored resume for ${subDomain.name} roles with AI-optimized keywords and formatting.`}
          />
        )}
      </div>
    </div>
  )
}

export default ContentHubTabs
