import { promises as fs } from 'fs'
import path from 'path'

interface VisitorStats {
  totalVisitors: number
  liveVisitors: number
  sessions: Record<string, { lastSeen: number; isActive: boolean }>
  lastUpdated: number
}

const VISITOR_DATA_FILE = path.join(process.cwd(), 'lib', 'visitor-stats.json')

// Default stats
const defaultStats: VisitorStats = {
  totalVisitors: 10010, // Start from 10010 as requested
  liveVisitors: 12, // Minimum 12 live visitors to appear busy
  sessions: {},
  lastUpdated: Date.now(),
}

// Ensure lib directory exists
const ensureLibDir = async () => {
  const libDir = path.dirname(VISITOR_DATA_FILE)
  try {
    await fs.access(libDir)
  } catch {
    await fs.mkdir(libDir, { recursive: true })
  }
}

// Load visitor stats from file
export const loadVisitorStats = async (): Promise<VisitorStats> => {
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
    await saveVisitorStats(defaultStats)
    return defaultStats
  }
}

// Save visitor stats to file
export const saveVisitorStats = async (stats: VisitorStats): Promise<void> => {
  try {
    await ensureLibDir()
    await fs.writeFile(VISITOR_DATA_FILE, JSON.stringify(stats, null, 2))
  } catch (error) {
    console.error('Failed to save visitor stats:', error)
    throw error
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
  return stats
}

// Get current visitor stats
export const getCurrentStats = async (): Promise<VisitorStats> => {
  return await loadVisitorStats()
}
