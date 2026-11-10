import type { RoleSalary } from './types'
import foundersOffice from './founders-office'
import fde from './fde'
import gtmEngineer from './gtm-engineer'
import productManager from './product-manager'
import aiEngineer from './ai-engineer'
import dataAnalyst from './data-analyst'

export const ROLE_SALARY_LIST: RoleSalary[] = [
  dataAnalyst,
  aiEngineer,
  productManager,
  foundersOffice,
  fde,
  gtmEngineer,
]
export const ROLE_SALARIES: Record<string, RoleSalary> = Object.fromEntries(
  ROLE_SALARY_LIST.map((r) => [r.slug, r])
)
export type { RoleSalary, PayPost, CompanyPay, CityPay } from './types'
