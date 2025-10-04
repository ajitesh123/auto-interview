'use client'

import { useState, useEffect } from 'react'

interface VisitorStats {
  totalVisitors: number
  liveVisitors: number
}

const VisitorCounter = () => {
  const [stats, setStats] = useState<VisitorStats>({ totalVisitors: 9991, liveVisitors: 13 })
  const [isLoading, setIsLoading] = useState(false) // Start as not loading since we have default values
  const [showIncrement, setShowIncrement] = useState(false)
  const [prevTotal, setPrevTotal] = useState(9991)

  useEffect(() => {
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
            
            // Check if total visitors increased
            if (data.totalVisitors > prevTotal) {
              setStats(data)
              setShowIncrement(true)
              setPrevTotal(data.totalVisitors)
              
              // Hide increment animation after 2 seconds
              setTimeout(() => setShowIncrement(false), 2000)
            } else {
              setStats(data)
            }
          } else {
            console.warn('API response not ok:', response.status)
            // Keep default values
          }
        }
      } catch (error) {
        console.warn('Failed to fetch visitor stats:', error)
        // Keep default values if API fails - this is expected in some cases
      } finally {
        setIsLoading(false)
      }
    }

    // Initial fetch
    fetchVisitorStats()

    // Update stats every 30 seconds
    const interval = setInterval(fetchVisitorStats, 30000)

    return () => clearInterval(interval)
  }, [prevTotal])

  // Format numbers with commas
  const formatNumber = (num: number) => {
    return num.toLocaleString()
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8 min-h-[160px] relative">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-purple-600/10 to-purple-700/5 blur-3xl"></div>
        
        <div className="relative group">
          <div className="relative overflow-hidden bg-gradient-to-br from-slate-900/90 via-purple-900/80 to-slate-900/90 backdrop-blur-xl border border-purple-500/20 shadow-2xl shadow-purple-500/10 px-12 py-8 rounded-3xl">
            <div className="flex items-center space-x-12">
              <div className="flex items-center space-x-4">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-emerald-400/30 via-green-500/30 to-emerald-600/30 animate-pulse"></div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="h-3 w-24 bg-gray-600/50 rounded animate-pulse"></div>
                  <div className="h-8 w-16 bg-gray-600/50 rounded animate-pulse"></div>
                </div>
              </div>
              
              <div className="relative flex items-center justify-center">
                <div className="h-12 w-px bg-gradient-to-b from-transparent via-purple-400/30 to-transparent"></div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-red-400/30 via-pink-500/30 to-red-600/30 animate-pulse"></div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="h-3 w-20 bg-gray-600/50 rounded animate-pulse"></div>
                  <div className="h-8 w-12 bg-gray-600/50 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center py-3 min-h-[50px] relative">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-purple-600/10 to-purple-700/5 blur-3xl"></div>
      
      <div className="relative group">
        {/* Main container - compact */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900/90 via-purple-900/80 to-slate-900/90 backdrop-blur-xl border border-purple-500/20 shadow-2xl shadow-purple-500/10 px-6 py-3 rounded-lg">
          {/* Animated border gradient */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 animate-pulse opacity-50"></div>
          
          {/* Inner glow effect */}
          <div className="absolute inset-1 rounded-lg bg-gradient-to-br from-white/5 via-transparent to-transparent"></div>
          
          {/* Content - compact spacing */}
          <div className="relative z-10 flex items-center space-x-6">
            {/* Total Visitors */}
            <div className="flex items-center space-x-2 group/item">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 animate-pulse"></div>
              <div className="flex items-center space-x-1">
                <span className="text-xs text-gray-300/80 font-medium">Total:</span>
                <span className="text-lg font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                  {formatNumber(stats.totalVisitors)}
                </span>
              </div>
            </div>

            {/* Separator */}
            <div className="w-px h-4 bg-purple-400/40"></div>

            {/* Live Visitors */}
            <div className="flex items-center space-x-2 group/item">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-red-400 to-pink-500 animate-pulse"></div>
              <div className="flex items-center space-x-1">
                <span className="text-xs text-gray-300/80 font-medium">Live:</span>
                <span className="text-lg font-bold bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">
                  {formatNumber(stats.liveVisitors)}
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

