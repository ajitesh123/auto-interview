'use client'

import { useState, useEffect } from 'react'

interface VisitorStats {
  totalVisitors: number
  liveVisitors: number
  actualLiveVisitors?: number
}

const VisitorCounter = () => {
  const [stats, setStats] = useState<VisitorStats>({
    totalVisitors: 21658,
    liveVisitors: Math.floor(Math.random() * (35 - 25 + 1)) + 25,
    actualLiveVisitors: 0,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showIncrement, setShowIncrement] = useState(false)
  const [prevTotal, setPrevTotal] = useState(21658)

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        const sessionId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

        const response = await fetch('/api/visitors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sessionId }),
        })

        if (response.ok) {
          const data = await response.json()
          setStats(data)

          if (data.totalVisitors > prevTotal) {
            setShowIncrement(true)
            setPrevTotal(data.totalVisitors)
            setTimeout(() => setShowIncrement(false), 2000)
          }
        }
      } catch (error) {
        console.warn('Failed to track visitor:', error)
      }
    }

    const fetchVisitorStats = async () => {
      try {
        if (typeof window !== 'undefined') {
          const response = await fetch('/api/visitors', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })

          if (response.ok) {
            const data = await response.json()
            setStats(data)
          }
        }
      } catch (error) {
        console.warn('Failed to fetch visitor stats:', error)
      } finally {
        setIsLoading(false)
      }
    }

    trackVisitor()
    const interval = setInterval(fetchVisitorStats, 60000)

    return () => clearInterval(interval)
  }, [prevTotal])

  const formatNumber = (num: number) => {
    return num.toLocaleString()
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[60px] items-center justify-center py-4">
        <div className="rounded-full border border-gray-200 bg-white px-8 py-3 shadow-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-gray-300"></div>
              <div className="h-4 w-20 animate-pulse rounded bg-gray-200"></div>
            </div>
            <div className="h-4 w-px bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-gray-300"></div>
              <div className="h-4 w-16 animate-pulse rounded bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-[60px] items-center justify-center py-4">
      <div className="rounded-full border border-gray-200 bg-white px-8 py-3 shadow-sm">
        <div className="flex items-center gap-6">
          {/* Total Visitors */}
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-gray-600">Total:</span>
              <span className="text-lg font-semibold text-black">
                {formatNumber(stats.totalVisitors)}
              </span>
            </div>
          </div>

          {/* Separator */}
          <div className="h-4 w-px bg-gray-300"></div>

          {/* Live Visitors */}
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-red-500"></div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-gray-600">Live:</span>
              <span className="text-lg font-semibold text-black">
                {formatNumber(stats.actualLiveVisitors || stats.liveVisitors)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VisitorCounter
