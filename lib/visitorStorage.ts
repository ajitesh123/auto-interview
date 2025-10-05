interface VisitorStats {
  totalVisitors: number
  liveVisitors: number
  sessions: Record<string, { lastSeen: number; isActive: boolean }>
  lastUpdated: number
}

// In-memory storage for Vercel deployment
let visitorStats: VisitorStats = {
  totalVisitors: 10010, // Start from 10010 as requested
  liveVisitors: 12, // Minimum 12 live visitors to appear busy
  sessions: {},
  lastUpdated: Date.now(),
}

// External storage URL (you can use any JSON storage service)
const EXTERNAL_STORAGE_URL = process.env.VISITOR_STATS_URL || 'https://jsonbin.io/v3/b/your-bin-id'
const EXTERNAL_STORAGE_KEY = process.env.VISITOR_STATS_KEY || 'your-api-key'

// Check if we're in development (local) or production (Vercel)
const isDevelopment = process.env.NODE_ENV === 'development'

// For development: file-based storage
let fs: any = null
let path: any = null
let VISITOR_DATA_FILE: string = ''

if (isDevelopment) {
  fs = require('fs').promises
  path = require('path')
  VISITOR_DATA_FILE = path.join(process.cwd(), 'lib', 'visitor-stats.json')
}

// Ensure lib directory exists (development only)
const ensureLibDir = async () => {
  if (!isDevelopment) return

  const libDir = path.dirname(VISITOR_DATA_FILE)
  try {
    await fs.access(libDir)
  } catch {
    await fs.mkdir(libDir, { recursive: true })
  }
}

// Load visitor stats
export const loadVisitorStats = async (): Promise<VisitorStats> => {
  if (isDevelopment) {
    // Development: file-based storage
    try {
      await ensureLibDir()
      const data = await fs.readFile(VISITOR_DATA_FILE, 'utf-8')
      const stats = JSON.parse(data) as VisitorStats

      // Clean up old sessions (older than 5 minutes)
      const now = Date.now()
      const fiveMinutesAgo = now - 5 * 60 * 1000

      const activeSessions: Record<string, { lastSeen: number; isActive: boolean }> = {}
      let actualActiveCount = 0

      for (const [sessionId, session] of Object.entries(stats.sessions)) {
        if (session.lastSeen >= fiveMinutesAgo) {
          activeSessions[sessionId] = session
          if (session.isActive) actualActiveCount++
        }
      }

      return {
        ...stats,
        sessions: activeSessions,
        // Add 12 to actual live count to make it appear busier
        liveVisitors: Math.max(12, actualActiveCount + 12),
        lastUpdated: now,
      }
    } catch (error) {
      console.log('Creating new visitor stats file...')
      await saveVisitorStats(visitorStats)
      return visitorStats
    }
  } else {
    // Production: try external storage first, then fallback to in-memory
    try {
      if (
        EXTERNAL_STORAGE_URL &&
        EXTERNAL_STORAGE_KEY &&
        EXTERNAL_STORAGE_URL !== 'https://jsonbin.io/v3/b/your-bin-id'
      ) {
        const response = await fetch(EXTERNAL_STORAGE_URL, {
          headers: {
            'X-Master-Key': EXTERNAL_STORAGE_KEY,
          },
        })

        if (response.ok) {
          const externalStats = await response.json()
          if (externalStats.record) {
            visitorStats = externalStats.record
          }
        }
      }
    } catch (error) {
      console.warn('Failed to load from external storage, using in-memory:', error)
    }

    const now = Date.now()
    const fiveMinutesAgo = now - 5 * 60 * 1000

    const activeSessions: Record<string, { lastSeen: number; isActive: boolean }> = {}
    let actualActiveCount = 0

    for (const [sessionId, session] of Object.entries(visitorStats.sessions)) {
      if (session.lastSeen >= fiveMinutesAgo) {
        activeSessions[sessionId] = session
        if (session.isActive) actualActiveCount++
      }
    }

    visitorStats.sessions = activeSessions
    visitorStats.liveVisitors = Math.max(12, actualActiveCount + 12)
    visitorStats.lastUpdated = now

    return visitorStats
  }
}

// Save visitor stats
export const saveVisitorStats = async (stats: VisitorStats): Promise<void> => {
  if (isDevelopment) {
    // Development: file-based storage
    try {
      await ensureLibDir()
      await fs.writeFile(VISITOR_DATA_FILE, JSON.stringify(stats, null, 2))
    } catch (error) {
      console.error('Failed to save visitor stats:', error)
      throw error
    }
  } else {
    // Production: update in-memory storage and try external storage
    visitorStats = { ...stats }

    // Try to save to external storage (optional)
    try {
      if (
        EXTERNAL_STORAGE_URL &&
        EXTERNAL_STORAGE_KEY &&
        EXTERNAL_STORAGE_URL !== 'https://jsonbin.io/v3/b/your-bin-id'
      ) {
        await fetch(EXTERNAL_STORAGE_URL, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': EXTERNAL_STORAGE_KEY,
          },
          body: JSON.stringify(stats),
        })
      }
    } catch (error) {
      console.warn('Failed to save to external storage:', error)
      // Continue without throwing - in-memory storage still works
    }
  }
}

// Update visitor stats
export const updateVisitorStats = async (sessionId: string): Promise<VisitorStats> => {
  const stats = await loadVisitorStats()
  const now = Date.now()

  // Check if this is a new visitor
  if (!stats.sessions[sessionId]) {
    stats.totalVisitors += 1
    console.log(`New visitor! Total now: ${stats.totalVisitors}`)
  }

  // Update session activity
  stats.sessions[sessionId] = {
    lastSeen: now,
    isActive: true,
  }

  // Clean up inactive sessions and update live count
  const fiveMinutesAgo = now - 5 * 60 * 1000
  const activeSessions: Record<string, { lastSeen: number; isActive: boolean }> = {}
  let actualActiveCount = 0

  for (const [id, session] of Object.entries(stats.sessions)) {
    if (session.lastSeen >= fiveMinutesAgo) {
      activeSessions[id] = session
      if (session.isActive) actualActiveCount++
    }
  }

  stats.sessions = activeSessions
  // Add 12 to actual live count to make it appear busier
  stats.liveVisitors = Math.max(12, actualActiveCount + 12)
  stats.lastUpdated = now

  await saveVisitorStats(stats)

  // Update in-memory storage for production
  if (!isDevelopment) {
    visitorStats = { ...stats }
  }

  return stats
}

// Get current visitor stats
export const getCurrentStats = async (): Promise<VisitorStats> => {
  return await loadVisitorStats()
}
