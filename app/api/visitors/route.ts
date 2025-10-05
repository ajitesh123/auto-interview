import { NextRequest, NextResponse } from 'next/server'
import { getCurrentStats, updateVisitorStats } from '@/lib/visitorStorage'

export async function GET(request: NextRequest) {
  try {
    const stats = await getCurrentStats()

    return NextResponse.json({
      totalVisitors: stats.totalVisitors,
      liveVisitors: stats.liveVisitors,
      actualLiveVisitors: stats.actualLiveVisitors, // For debugging
    })
  } catch (error) {
    console.error('Error fetching visitor stats:', error)
    return NextResponse.json({ error: 'Failed to fetch visitor stats' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json()

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 })
    }

    // Get user agent from request headers
    const userAgent = request.headers.get('user-agent') || ''

    const stats = await updateVisitorStats(sessionId, userAgent)

    return NextResponse.json({
      totalVisitors: stats.totalVisitors,
      liveVisitors: stats.liveVisitors,
      actualLiveVisitors: stats.actualLiveVisitors, // For debugging
    })
  } catch (error) {
    console.error('Error updating visitor stats:', error)
    return NextResponse.json({ error: 'Failed to update visitor stats' }, { status: 500 })
  }
}
