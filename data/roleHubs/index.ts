import type { RoleHub } from './types'
import aipm from './aipm'

export const ROLE_HUBS: Record<string, RoleHub> = {
  [aipm.slug]: aipm,
}

export const ROLE_HUB_LIST: RoleHub[] = Object.values(ROLE_HUBS)

export type { RoleHub } from './types'
