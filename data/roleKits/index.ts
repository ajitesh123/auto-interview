import type { RoleKits } from './types'
import { AIPM_KITS } from './aipm'
import { FDE_KITS } from './fde'
import { GTM_ENGINEER_KITS } from './gtm-engineer'
import { AI_ENGINEER_KITS } from './ai-engineer'
import { FOUNDERS_OFFICE_KITS } from './founders-office'
import { CHIEF_OF_STAFF_KITS } from './chief-of-staff'
import { GROWTH_KITS } from './growth'

/** Resume (CV) and letter-of-recommendation kits, keyed by role hub slug. */
export const ROLE_KITS: Record<string, RoleKits> = {
  aipm: AIPM_KITS,
  fde: FDE_KITS,
  'gtm-engineer': GTM_ENGINEER_KITS,
  'ai-engineer': AI_ENGINEER_KITS,
  'founders-office': FOUNDERS_OFFICE_KITS,
  'chief-of-staff': CHIEF_OF_STAFF_KITS,
  growth: GROWTH_KITS,
}

export const KIT_PATHS = {
  resume: (slug: string) => `/${slug}/resume`,
  lor: (slug: string) => `/${slug}/letter-of-recommendation`,
}
