import type { RoleSalary } from './types'
import foundersOffice from './founders-office'
import fde from './fde'
import gtmEngineer from './gtm-engineer'

export const ROLE_SALARY_LIST: RoleSalary[] = [foundersOffice, fde, gtmEngineer]
export const ROLE_SALARIES: Record<string, RoleSalary> = Object.fromEntries(
  ROLE_SALARY_LIST.map((r) => [r.slug, r])
)
export type { RoleSalary, PayPost } from './types'
