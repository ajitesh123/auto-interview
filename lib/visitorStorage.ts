interface VisitorStats {
  totalVisitors: number
  liveVisitors: number
  actualLiveVisitors: number // Real live visitors count
  sessions: Record<string, { lastSeen: number; isActive: boolean }>
  lastUpdated: number
  lastVisitorAdded: number // Track when last visitor was added
}

// In-memory storage for Vercel deployment
let visitorStats: VisitorStats = {
  totalVisitors: 11534, // Set baseline as requested
  liveVisitors: 15, // Random live visitors count
  actualLiveVisitors: 0, // Real live visitors count
  sessions: {},
  lastUpdated: Date.now(),
  lastVisitorAdded: Date.now(),
}

// External storage URL (you can use any JSON storage service)
const EXTERNAL_STORAGE_URL = process.env.VISITOR_STATS_URL || 'https://jsonbin.io/v3/b/your-bin-id'
const EXTERNAL_STORAGE_KEY = process.env.VISITOR_STATS_KEY || 'your-api-key'

// Check if we're in development (local) or production (Vercel)
const isDevelopment = process.env.NODE_ENV === 'development'

// Generate random live visitor count between 12-25
const getRandomLiveCount = (): number => {
  return Math.floor(Math.random() * (25 - 12 + 1)) + 12
}

// Check if we should add a new visitor (every 30 seconds)
const shouldAddVisitor = (lastVisitorAdded: number): boolean => {
  const now = Date.now()
  return now - lastVisitorAdded >= 30000 // 30 seconds
}

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

      const now = Date.now()

      // Check if we should add a new visitor (every 30 seconds)
      if (shouldAddVisitor(stats.lastVisitorAdded)) {
        stats.totalVisitors += 1
        stats.lastVisitorAdded = now
        console.log(`Simulated new visitor! Total now: ${stats.totalVisitors}`)
      }

      // Generate random live visitor count between 12-25
      stats.liveVisitors = getRandomLiveCount()
      stats.actualLiveVisitors = stats.liveVisitors // For debugging
      stats.lastUpdated = now

      return stats
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
            console.log('Loaded from external storage:', visitorStats)
          }
        }
      } else {
        console.log('Using in-memory storage (no external storage configured)')
      }
    } catch (error) {
      console.warn('Failed to load from external storage, using in-memory:', error)
    }

    const now = Date.now()

    // Check if we should add a new visitor (every 30 seconds)
    if (shouldAddVisitor(visitorStats.lastVisitorAdded)) {
      visitorStats.totalVisitors += 1
      visitorStats.lastVisitorAdded = now
      console.log(`Simulated new visitor! Total now: ${visitorStats.totalVisitors}`)
    }

    // Generate random live visitor count between 12-25
    visitorStats.liveVisitors = getRandomLiveCount()
    visitorStats.actualLiveVisitors = visitorStats.liveVisitors // For debugging
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

// Update visitor stats (simplified - just return current stats)
export const updateVisitorStats = async (
  sessionId: string,
  userAgent?: string
): Promise<VisitorStats> => {
  const stats = await loadVisitorStats()

  // Just return the current stats without any real tracking
  console.log('Visitor tracking request received, returning simulated stats')

  return stats
}

// Get current visitor stats
export const getCurrentStats = async (): Promise<VisitorStats> => {
  return await loadVisitorStats()
}
