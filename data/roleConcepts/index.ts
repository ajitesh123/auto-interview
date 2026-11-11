import type { RoleConcepts } from './types'
import dataAnalyst from './data-analyst'

/** "Concepts to know before the interview" pages, keyed by role hub slug. */
export const ROLE_CONCEPTS: Record<string, RoleConcepts> = {
  'data-analyst': dataAnalyst,
}
export type { RoleConcepts, Concept, ConceptGroup, QuizItem } from './types'
