/**
 * DPDP Act for L&D teams: one source of truth for the readiness checker, the
 * dates table and the penalties table in /blog/dpdp-act-for-l-and-d-teams-2026.
 *
 * Sources (opened 8 Nov 2026):
 * - DPDP Act 2023 (India Code): https://www.indiacode.nic.in/bitstream/123456789/22037/2/a2023-22.pdf
 * - DPDP Rules 2025, Gazette G.S.R. 846(E), 13 Nov 2025: https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf
 * - PIB release, 14 Nov 2025: https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=2190014
 * - Rule 6 English text (unofficial reproduction): https://www.dpdpa.com/dpdparules/rule6.html
 * - Rules 7 and 8 English text (unofficial reproduction): https://dpdp.myndsolution.com/wiki/rules/rule-7-intimation-of-personal-data-breach/
 * - Compression status (not gazetted as of 9 Oct 2026): https://consentos.in/learn/dpdp-rules-notification-status/
 * - Rule 4 scope: https://cyberaube.com/blog/dpdp-consent-manager-deadline-november-2026-data-fiduciary-playbook
 * - Employment ground limits (Khaitan & Co., SCC Times, 11 Nov 2024): https://www.scconline.com/blog/post/2024/11/11/digital-personal-data-protection-act-2023-employers-guide/
 */

export const CHECKED = '8 Nov 2026'
export const MAIN_DUTIES_DATE = '2027-05-13'

export const SRC = {
  act: 'https://www.indiacode.nic.in/bitstream/123456789/22037/2/a2023-22.pdf',
  rules: 'https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf',
  pib: 'https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=2190014',
  rule6: 'https://www.dpdpa.com/dpdparules/rule6.html',
  rule7: 'https://dpdp.myndsolution.com/wiki/rules/rule-7-intimation-of-personal-data-breach/',
  rule8:
    'https://dpdp.myndsolution.com/wiki/rules/rule-8-time-period-for-specified-purpose-to-be-deemed-as-no-longer/',
  status: 'https://consentos.in/learn/dpdp-rules-notification-status/',
  khaitan:
    'https://www.scconline.com/blog/post/2024/11/11/digital-personal-data-protection-act-2023-employers-guide/',
} as const

/** Penalty rows from the Schedule to the Act (s.33). Crore rupees, "may extend to". */
export const PENALTIES = [
  { id: 'security', crore: 250, what: 'No reasonable security safeguards (s.8(5))' },
  {
    id: 'breach',
    crore: 200,
    what: 'Not telling the Board or affected people about a breach (s.8(6))',
  },
  { id: 'children', crore: 200, what: "Children's data duties (s.9)" },
  { id: 'sdf', crore: 150, what: 'Significant Data Fiduciary duties (s.10)' },
  { id: 'other', crore: 50, what: 'Any other provision of the Act or Rules' },
] as const

export type PenaltyId = (typeof PENALTIES)[number]['id']

export type Control = {
  id: string
  label: string
  /** Who usually owns it in an L&D setup. */
  owner: 'L&D' | 'HR' | 'IT' | 'Legal' | 'Sales enablement'
  law: string
  penalty: PenaltyId
}

/** 12 controls an L&D team can check today. Each maps to the Act or Rules. */
export const CONTROLS: Control[] = [
  {
    id: 'map',
    label: 'We have a list of every learner data field our LMS and tools hold',
    owner: 'L&D',
    law: 's.8(1) accountability',
    penalty: 'other',
  },
  {
    id: 'ground',
    label: 'Each field is tagged "employment use" or "needs consent"',
    owner: 'Legal',
    law: 's.4, s.6, s.7(i)',
    penalty: 'other',
  },
  {
    id: 'notice',
    label: 'Learners get a plain notice of what we collect and why',
    owner: 'HR',
    law: 's.5, Rule 3 (required where you rely on consent)',
    penalty: 'other',
  },
  {
    id: 'optional',
    label: 'Optional courses and pre-hire tests ask for consent separately',
    owner: 'L&D',
    law: 's.6(1)',
    penalty: 'other',
  },
  {
    id: 'calls',
    label: 'Customer calls used for coaching are covered by notice or redacted',
    owner: 'Sales enablement',
    law: 's.5, s.6 (the customer is a Data Principal too)',
    penalty: 'other',
  },
  {
    id: 'minors',
    label: 'Under-18 interns or apprentices have verifiable parental consent',
    owner: 'HR',
    law: 's.9, Rule 10',
    penalty: 'children',
  },
  {
    id: 'access',
    label: 'Scores and recordings are visible only to roles that need them',
    owner: 'IT',
    law: 'Rule 6(1)(b)',
    penalty: 'security',
  },
  {
    id: 'logs',
    label: 'Access logs are kept and kept for at least one year',
    owner: 'IT',
    law: 'Rule 6(1)(c) and (e)',
    penalty: 'security',
  },
  {
    id: 'vendor',
    label: 'Our LMS vendor signed a processor contract with security terms',
    owner: 'Legal',
    law: 'Rule 6(1)(f), s.8(2)',
    penalty: 'security',
  },
  {
    id: 'breach',
    label: 'We have a breach drill: tell learners, report to the Board within 72 hours',
    owner: 'IT',
    law: 's.8(6), Rule 7',
    penalty: 'breach',
  },
  {
    id: 'erase',
    label: "Leavers' learning records have an erase date, with 48 hours' notice",
    owner: 'HR',
    law: 's.8(7), Rule 8',
    penalty: 'other',
  },
  {
    id: 'contact',
    label: 'Learners know whom to ask or complain to about their data',
    owner: 'HR',
    law: 's.8(9), s.8(10)',
    penalty: 'other',
  },
]

export const PENALTY_BY_ID: Record<PenaltyId, number> = Object.fromEntries(
  PENALTIES.map((p) => [p.id, p.crore])
) as Record<PenaltyId, number>
