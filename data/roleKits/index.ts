import type { RoleKits } from './types'
import { AIPM_KITS } from './aipm'
import { FDE_KITS } from './fde'
import { GTM_ENGINEER_KITS } from './gtm-engineer'
import { AI_ENGINEER_KITS } from './ai-engineer'
import { FOUNDERS_OFFICE_KITS } from './founders-office'
import { CHIEF_OF_STAFF_KITS } from './chief-of-staff'
import { GROWTH_KITS } from './growth'
import { PRODUCT_MANAGER_KITS } from './product-manager'
import { STRATEGY_AND_OPERATIONS_KITS } from './strategy-and-operations'

/** Resume (CV) and letter-of-recommendation kits, keyed by role hub slug. */
export const ROLE_KITS: Record<string, RoleKits> = {
  aipm: AIPM_KITS,
  fde: FDE_KITS,
  'gtm-engineer': GTM_ENGINEER_KITS,
  'ai-engineer': AI_ENGINEER_KITS,
  'founders-office': FOUNDERS_OFFICE_KITS,
  'chief-of-staff': CHIEF_OF_STAFF_KITS,
  growth: GROWTH_KITS,
  'product-manager': PRODUCT_MANAGER_KITS,
  'strategy-and-operations': STRATEGY_AND_OPERATIONS_KITS,
}

export const KIT_PATHS = {
  resume: (slug: string) => `/${slug}/resume`,
  lor: (slug: string) => `/${slug}/letter-of-recommendation`,
}
