import type { PayTable } from '@/data/roleHubs/types'

/** Short label for a pay table tab, e.g. "Europe: Germany" -> "Germany". Shared by server and client. */
export function tabLabel(t: PayTable) {
  if (t.tab) return t.tab
  let r = t.region.replace(/\s*\(.*?\)\s*/g, '').trim()
  if (/^Europe:\s*/.test(r)) r = r.replace(/^Europe:\s*/, '')
  else r = r.split(':')[0]
  return r.replace('United States', 'US').replace('United Kingdom', 'UK')
}
