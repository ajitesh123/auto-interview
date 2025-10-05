'use client'

import { useState, useEffect } from 'react'

interface VisitorStats {
  totalVisitors: number
  liveVisitors: number
  actualLiveVisitors?: number // Real live visitors count
}

const VisitorCounter = () => {
  const [stats, setStats] = useState<VisitorStats>({
    totalVisitors: 10010,
    liveVisitors: 12,
    actualLiveVisitors: 0,
  })
  const [isLoading, setIsLoading] = useState(false) // Start as not loading since we have default values
  const [showIncrement, setShowIncrement] = useState(false)
  const [prevTotal, setPrevTotal] = useState(10010)

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // Generate a unique session ID for this visitor
        const sessionId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

        // Track the visitor
        const response = await fetch('/api/visitors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sessionId }),
        })

        if (response.ok) {
          const data = await response.json()
          console.log('Tracked visitor, received stats:', data) // Debug logging

          // Always update stats to ensure live visitors are current
          setStats(data)

          // Check if total visitors increased
          if (data.totalVisitors > prevTotal) {
            setShowIncrement(true)
            setPrevTotal(data.totalVisitors)

            // Hide increment animation after 2 seconds
            setTimeout(() => setShowIncrement(false), 2000)
          }
        }
      } catch (error) {
        console.warn('Failed to track visitor:', error)
      }
    }

    const fetchVisitorStats = async () => {
      try {
        // Only fetch if we're in the browser and API is available
        if (typeof window !== 'undefined') {
          const response = await fetch('/api/visitors', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })

          if (response.ok) {
            const data = await response.json()
            console.log('Fetched visitor stats:', data) // Debug logging
            setStats(data)
          } else {
            console.warn('API response not ok:', response.status)
          }
        }
      } catch (error) {
        console.warn('Failed to fetch visitor stats:', error)
      } finally {
        setIsLoading(false)
      }
    }

    // Track visitor on initial load
    trackVisitor()

    // Update stats every 30 seconds to reduce API calls
    const interval = setInterval(fetchVisitorStats, 30000)

    return () => clearInterval(interval)
  }, [prevTotal])

  // Format numbers with commas
  const formatNumber = (num: number) => {
    return num.toLocaleString()
  }

  if (isLoading) {
    return (
      <div className="relative flex min-h-[160px] items-center justify-center py-8">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-purple-600/10 to-purple-700/5 blur-3xl"></div>

        <div className="group relative">
          <div className="relative overflow-hidden rounded-3xl border border-purple-500/20 bg-gradient-to-br from-slate-900/90 via-purple-900/80 to-slate-900/90 px-12 py-8 shadow-2xl shadow-purple-500/10 backdrop-blur-xl">
            <div className="flex items-center space-x-12">
              <div className="flex items-center space-x-4">
                <div className="h-6 w-6 animate-pulse rounded-full bg-gradient-to-r from-emerald-400/30 via-green-500/30 to-emerald-600/30"></div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="h-3 w-24 animate-pulse rounded bg-gray-600/50"></div>
                  <div className="h-8 w-16 animate-pulse rounded bg-gray-600/50"></div>
                </div>
              </div>

              <div className="relative flex items-center justify-center">
                <div className="h-12 w-px bg-gradient-to-b from-transparent via-purple-400/30 to-transparent"></div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="h-6 w-6 animate-pulse rounded-full bg-gradient-to-r from-red-400/30 via-pink-500/30 to-red-600/30"></div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="h-3 w-20 animate-pulse rounded bg-gray-600/50"></div>
                  <div className="h-8 w-12 animate-pulse rounded bg-gray-600/50"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-[50px] items-center justify-center py-3">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-purple-600/10 to-purple-700/5 blur-3xl"></div>

      <div className="group relative">
        {/* Main container - compact */}
        <div className="relative overflow-hidden rounded-lg border border-purple-500/20 bg-gradient-to-br from-slate-900/90 via-purple-900/80 to-slate-900/90 px-6 py-3 shadow-2xl shadow-purple-500/10 backdrop-blur-xl">
          {/* Animated border gradient */}
          <div className="absolute inset-0 animate-pulse rounded-lg bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 opacity-50"></div>

          {/* Inner glow effect */}
          <div className="absolute inset-1 rounded-lg bg-gradient-to-br from-white/5 via-transparent to-transparent"></div>

          {/* Content - compact spacing */}
          <div className="relative z-10 flex items-center space-x-6">
            {/* Total Visitors */}
            <div className="group/item flex items-center space-x-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-gradient-to-r from-emerald-400 to-green-500"></div>
              <div className="flex items-center space-x-1">
                <span className="text-xs font-medium text-gray-300/80">Total:</span>
                <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-lg font-bold text-transparent">
                  {formatNumber(stats.totalVisitors)}
                </span>
              </div>
            </div>

            {/* Separator */}
            <div className="h-4 w-px bg-purple-400/40"></div>

            {/* Live Visitors */}
            <div className="group/item flex items-center space-x-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-gradient-to-r from-red-400 to-pink-500"></div>
              <div className="flex items-center space-x-1">
                <span className="text-xs font-medium text-gray-300/80">Live:</span>
                <span className="bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-lg font-bold text-transparent">
                  {formatNumber(stats.actualLiveVisitors || stats.liveVisitors)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VisitorCounter
