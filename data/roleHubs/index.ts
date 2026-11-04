import type { RoleHub } from './types'
import aipm from './aipm'
import fde from './fde'
import gtmEngineer from './gtm-engineer'
import aiEngineer from './ai-engineer'
import foundersOffice from './founders-office'
import chiefOfStaff from './chief-of-staff'

export const ROLE_HUB_LIST: RoleHub[] = [
  aipm,
  fde,
  gtmEngineer,
  aiEngineer,
  foundersOffice,
  chiefOfStaff,
]

export const ROLE_HUBS: Record<string, RoleHub> = Object.fromEntries(
  ROLE_HUB_LIST.map((h) => [h.slug, h])
)

export type { RoleHub } from './types'
