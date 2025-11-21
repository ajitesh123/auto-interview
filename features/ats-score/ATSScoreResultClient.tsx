'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import ATSScorePage, { AnalysisResults } from './ATSScorePage'

interface StoredTip {
  title: string
  body: string
}

const ATSScoreResultClient = () => {
  const router = useRouter()
  const [results, setResults] = useState<AnalysisResults | null>(null)
  const [tips, setTips] = useState<StoredTip[]>([])
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const storedResults = window.sessionStorage.getItem('ats:analysisResult')
    const storedTips = window.sessionStorage.getItem('ats:analysisTips')

    if (!storedResults) {
      router.replace('/ats-score')
      return
    }

    try {
      setResults(JSON.parse(storedResults))
    } catch (error) {
      console.error('Failed to parse stored ATS results', error)
      router.replace('/ats-score')
      return
    }

    if (storedTips) {
      try {
        setTips(JSON.parse(storedTips))
      } catch (error) {
        console.error('Failed to parse stored ATS tips', error)
      }
    }

    setIsReady(true)
  }, [router])

  if (!isReady) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-white">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-2 border-accent-500 border-t-transparent"></div>
          <p className="text-gray-300">Loading your ATS analysis...</p>
        </div>
      </div>
    )
  }

  return <ATSScorePage initialResults={results} initialTips={tips} showUploadSection={false} />
}

export default ATSScoreResultClient
