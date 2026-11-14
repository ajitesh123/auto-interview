import { computeSalary, DEFAULT_INPUTS } from '@/data/indiaTax'

/** Monthly in-hand pay for a CTC in ₹ lakh a year, on the site's default 2026-27 new-regime inputs. */
export const inHandMonthly = (lakhPa: number) =>
  computeSalary({ ...DEFAULT_INPUTS, ctc: Math.round(lakhPa * 100000) }).monthlyInHand
