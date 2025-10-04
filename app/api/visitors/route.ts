import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// File path for persistent storage
const DATA_FILE = path.join(process.cwd(), 'visitor-data.json')

// Default visitor stats
const defaultStats = {
  totalVisitors: 9990,
  liveVisitors: 12,
  lastUpdated: Date.now(),
}

// Load persistent data from file
const loadPersistedData = () => {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf8')
      const parsed = JSON.parse(data)
      console.log(`Loaded visitor count: ${parsed.totalVisitors}`)
      return parsed
    }
  } catch (error) {
    console.warn('Could not load persisted data:', error)
  }
  return defaultStats
}

// Save data to file
const savePersistedData = (stats: any) => {
  try {
    const dataToSave = {
      ...stats,
      lastUpdated: Date.now(),
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(dataToSave, null, 2))
    console.log(`Saved visitor count: ${stats.totalVisitors}`)
  } catch (error) {
    console.warn('Could not save persisted data:', error)
  }
}

// Load initial data
let visitorStats = loadPersistedData()
let sessions = new Map<string, { lastSeen: number; isActive: boolean }>()

// Clean up inactive sessions (older than 5 minutes)
const cleanupInactiveSessions = () => {
  const now = Date.now()
  const fiveMinutesAgo = now - 5 * 60 * 1000
  
  for (const [sessionId, session] of sessions.entries()) {
    if (session.lastSeen < fiveMinutesAgo) {
      sessions.delete(sessionId)
    }
  }
  
  // Update live visitor count (12 + actual active sessions)
  visitorStats.liveVisitors = 12 + sessions.size
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
    if (!sessions.has(sessionId)) {
      visitorStats.totalVisitors += 1
    }
    
    // Update session activity
    sessions.set(sessionId, {
      lastSeen: now,
      isActive: true,
    })
    
    cleanupInactiveSessions()
    
    // Save the updated count for persistence
    savePersistedData(visitorStats)
    
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