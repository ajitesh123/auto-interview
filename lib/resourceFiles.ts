import fs from 'fs'
import path from 'path'

/** Server-only: true when a resource's download file actually exists under /public. */
export function resourceFileExists(fileUrl?: string): boolean {
  if (!fileUrl || !fileUrl.startsWith('/')) return false
  try {
    return fs.statSync(path.join(process.cwd(), 'public', fileUrl)).isFile()
  } catch {
    return false
  }
}
