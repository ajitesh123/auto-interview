import type { RoleHub } from './types'
import aipm from './aipm'
import fde from './fde'
import gtmEngineer from './gtm-engineer'
import aiEngineer from './ai-engineer'

export const ROLE_HUB_LIST: RoleHub[] = [aipm, fde, gtmEngineer, aiEngineer]

export const ROLE_HUBS: Record<string, RoleHub> = Object.fromEntries(
  ROLE_HUB_LIST.map((h) => [h.slug, h])
)

export type { RoleHub } from './types'
