import type { RoleHub } from './types'
import aipm from './aipm'
import fde from './fde'
import gtmEngineer from './gtm-engineer'
import aiEngineer from './ai-engineer'
import foundersOffice from './founders-office'
import chiefOfStaff from './chief-of-staff'
import growth from './growth'
import productManager from './product-manager'
import strategyAndOperations from './strategy-and-operations'

export const ROLE_HUB_LIST: RoleHub[] = [
  aipm,
  fde,
  gtmEngineer,
  aiEngineer,
  foundersOffice,
  chiefOfStaff,
  growth,
  productManager,
  strategyAndOperations,
]

export const ROLE_HUBS: Record<string, RoleHub> = Object.fromEntries(
  ROLE_HUB_LIST.map((h) => [h.slug, h])
)

export type { RoleHub } from './types'
