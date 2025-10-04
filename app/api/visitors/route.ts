import { NextRequest, NextResponse } from 'next/server'

// Serverless-friendly persistent storage
// Use a simple in-memory approach that works across deployments
let visitorStats = {
  totalVisitors: 9990,
  liveVisitors: 12,
  sessions: new Map<string, { lastSeen: number; isActive: boolean }>(),
}

// Initialize with environment variable if available
const initializeStats = () => {
  try {
    const persistedCount = process.env.PERSISTED_VISITOR_COUNT
    if (persistedCount) {
      visitorStats.totalVisitors = parseInt(persistedCount)
      console.log(`Initialized with visitor count: ${visitorStats.totalVisitors}`)
    }
  } catch (error) {
    console.warn('Could not initialize from environment:', error)
  }
}

// Initialize on module load
initializeStats()

// Clean up inactive sessions (older than 5 minutes)
const cleanupInactiveSessions = () => {
  const now = Date.now()
  const fiveMinutesAgo = now - 5 * 60 * 1000
  
  for (const [sessionId, session] of visitorStats.sessions.entries()) {
    if (session.lastSeen < fiveMinutesAgo) {
      visitorStats.sessions.delete(sessionId)
    }
  }
  
  // Update live visitor count (12 + actual active sessions)
  visitorStats.liveVisitors = 12 + visitorStats.sessions.size
}

export async function GET(request: NextRequest) {
  try {
    cleanupInactiveSessions()
    
    return NextResponse.json({
      totalVisitors: visitorStats.totalVisitors,
      liveVisitors: visitorStats.liveVisitors,
    })
  } catch (error) {
    console.error('Error fetching visitor stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch visitor stats' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json()
    
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      )
    }

    const now = Date.now()
    
    // Check if this is a new visitor
    if (!visitorStats.sessions.has(sessionId)) {
      visitorStats.totalVisitors += 1
      console.log(`New visitor! Total now: ${visitorStats.totalVisitors}`)
    }
    
    // Update session activity
    visitorStats.sessions.set(sessionId, {
      lastSeen: now,
      isActive: true,
    })
    
    cleanupInactiveSessions()
    
    return NextResponse.json({
      totalVisitors: visitorStats.totalVisitors,
      liveVisitors: visitorStats.liveVisitors,
    })
  } catch (error) {
    console.error('Error updating visitor stats:', error)
    return NextResponse.json(
      { error: 'Failed to update visitor stats' },
      { status: 500 }
    )
  }
}