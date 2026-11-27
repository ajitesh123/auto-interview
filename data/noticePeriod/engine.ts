/**
 * Notice period + last working day engine (pure functions, no AI, no network).
 *
 * From the day you resign and the notice in your contract it works out:
 *   - your last working day (LWD), counted the way your contract counts (calendar days, Mon–Fri
 *     or Mon–Sat working days, calendar months or 30-day months), with your holiday list;
 *   - the LWD if your employer lets you set earned leave off against the notice;
 *   - against a joining date: the notice days you would not serve and their buyout cost at the
 *     two common day rates (monthly pay ÷ 30 per calendar day, ÷ 26 per Mon–Sat working day);
 *   - the date wages fall due under the Code on Wages s.17(2) reading, and your service length
 *     against the 5-year gratuity line (Code on Social Security s.53).
 *
 * Rules and where they come from (opened 27 Nov 2026):
 *   - Notice starts the day after you resign when the contract is silent: Acas (UK guidance,
 *     updated 24 Nov 2025). Indian contracts usually say; the tool lets you pick either.
 *   - Code on Wages 2019 s.17(2): wages paid "within two working days of his removal, dismissal,
 *     retrenchment or, as the case may be, his resignation" (India Code). In force 21 Nov 2025
 *     with the other three Labour Codes (PIB, 21 Nov 2025).
 *   - Gratuity after 5 years' continuous service; fixed-term employees after 1 year (Code on
 *     Social Security 2020 s.53; PIB 21 Nov 2025). Part of a year above 6 months counts as a year.
 *   - The ÷30 and ÷26 day rates are employer practice, not law: the contract decides.
 */

export type Unit = 'days' | 'weeks' | 'months'
export type Count = 'calendar' | 'mon-fri' | 'mon-sat'
export type Start = 'next' | 'same'
export type MonthRule = 'calendar' | 'thirty'
export type Currency = 'INR' | 'USD' | 'GBP'

export interface Inputs {
  resign: string // YYYY-MM-DD, the day your resignation is accepted / sent
  length: number // notice length in `unit`
  unit: Unit
  count: Count // how days are counted (only used for days, and for months under the 30-day rule)
  start: Start // 'next': notice starts the day after you resign; 'same': resignation day is day 1
  monthRule: MonthRule // a month = a calendar month, or 30 days
  holidays: string[] // YYYY-MM-DD, skipped only when counting working days
  leave: number // earned leave days your employer lets you set off against notice
  join?: string // joining date the new employer wants
  pay?: number // monthly pay on the basis your contract names (gross or basic)
  currency: Currency
  joined?: string // when you joined the current employer (for the gratuity line)
  fixedTerm?: boolean // fixed-term contract (gratuity after 1 year)
}

export interface Result {
  startDay: string // first day of notice
  lwd: string // last working day, full notice
  lwdWithLeave: string // last working day after leave set-off (== lwd when leave is 0)
  calendarDays: number // calendar days from startDay to lwd, inclusive
  weekdays: number // Mon–Fri days (minus holidays) in that span
  endsOnOff: boolean // lwd falls on a weekend or holiday
  prevWorkday?: string // the working day before, when it does
  countUsed: Count // the counting actually used (weeks and calendar months are calendar)
  earliestJoin: string // the day after lwdWithLeave
  shortCalendar: number // notice calendar days you would not serve, given the joining date
  shortWorking6: number // the same span in Mon–Sat working days
  buyout30?: number // pay ÷ 30 × shortCalendar
  buyout26?: number // pay ÷ 26 × shortWorking6
  servedUntil?: string // the day before the joining date, when it cuts the notice
  wagesDue: string // 2 working days (Mon–Fri, holidays skipped) after lwdWithLeave
  service?: { years: number; months: number; days: number }
  gratuityLine?: string // the date you reach the gratuity line (5 years, or 1 year fixed-term)
  gratuityMet?: boolean // at lwdWithLeave
  wagesDueEarly?: string // when released early for the joining date
  gratuityGapEarly?: number // days from the early last day to the gratuity line, when not met
}

/* ---------------- dates (UTC maths on YYYY-MM-DD so time zones never shift a day) ---------------- */

export const ISO = /^\d{4}-\d{2}-\d{2}$/
export function toUTC(d: string): number {
  const [y, m, day] = d.split('-').map(Number)
  return Date.UTC(y, m - 1, day)
}
export function fromUTC(t: number): string {
  return new Date(t).toISOString().slice(0, 10)
}
export function addDays(d: string, n: number): string {
  return fromUTC(toUTC(d) + n * 86400000)
}
export function diffDays(a: string, b: string): number {
  return Math.round((toUTC(b) - toUTC(a)) / 86400000)
}
export function dow(d: string): number {
  return new Date(toUTC(d)).getUTCDay()
}
/** Same day n months later; clamps to the month's last day (31 Jan + 1 month = 28/29 Feb). */
export function addMonths(d: string, n: number): string {
  const [y, m, day] = d.split('-').map(Number)
  const total = m - 1 + n
  const ty = y + Math.floor(total / 12)
  const tm = ((total % 12) + 12) % 12
  const last = new Date(Date.UTC(ty, tm + 1, 0)).getUTCDate()
  return fromUTC(Date.UTC(ty, tm, Math.min(day, last)))
}
export function isValidISO(d: string | undefined): d is string {
  if (!d || !ISO.test(d)) return false
  const t = toUTC(d)
  return !Number.isNaN(t) && fromUTC(t) === d
}

const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
/** "Thu 31 Dec 2026" */
export function fmtDate(d: string, withYear = true): string {
  const t = new Date(toUTC(d))
  return `${DOW[t.getUTCDay()]} ${t.getUTCDate()} ${MON[t.getUTCMonth()]}${withYear ? ` ${t.getUTCFullYear()}` : ''}`
}

export function isWorkday(d: string, mode: Count, holidays: Set<string>): boolean {
  if (mode === 'calendar') return true
  const w = dow(d)
  if (w === 0) return false
  if (w === 6 && mode === 'mon-fri') return false
  return !holidays.has(d)
}

/** Day on which the n-th counted day falls, counting from `from` (inclusive). n >= 1. */
function nthDay(from: string, n: number, mode: Count, holidays: Set<string>): string {
  if (mode === 'calendar') return addDays(from, n - 1)
  let d = from
  let k = 0
  // guard: at most 3 years of days
  for (let i = 0; i < 1200; i++) {
    if (isWorkday(d, mode, holidays)) {
      k++
      if (k === n) return d
    }
    d = addDays(d, 1)
  }
  return d
}

/** Counted days from a to b inclusive (0 when b < a). */
export function countBetween(a: string, b: string, mode: Count, holidays: Set<string>): number {
  if (diffDays(a, b) < 0) return 0
  if (mode === 'calendar') return diffDays(a, b) + 1
  let k = 0
  for (let d = a; diffDays(d, b) >= 0; d = addDays(d, 1)) if (isWorkday(d, mode, holidays)) k++
  return k
}

/** n working days (Mon–Fri, holidays skipped) after d. */
export function workdaysAfter(
  d: string,
  n: number,
  holidays: Set<string>,
  week: Count = 'mon-fri'
): string {
  let x = d
  let k = 0
  while (k < n) {
    x = addDays(x, 1)
    if (isWorkday(x, week === 'calendar' ? 'mon-fri' : week, holidays)) k++
  }
  return x
}

export const MAX_LENGTH: Record<Unit, number> = { days: 365, weeks: 52, months: 12 }

export function validate(i: Inputs): string | undefined {
  if (!isValidISO(i.resign)) return 'Pick the date you resign.'
  if (!Number.isFinite(i.length) || i.length < 1) return 'Enter a notice length of at least 1.'
  if (i.length > MAX_LENGTH[i.unit])
    return `Notice longer than ${MAX_LENGTH[i.unit]} ${i.unit}? Check the number.`
  if (i.join && !isValidISO(i.join)) return 'The joining date is not a valid date.'
  if (i.join && diffDays(i.resign, i.join) < 1)
    return 'The joining date is on or before the day you resign.'
  if (i.joined && !isValidISO(i.joined)) return 'The date you joined is not a valid date.'
  if (i.joined && diffDays(i.joined, i.resign) < 0)
    return 'You joined after the day you resign? Check the dates.'
  return undefined
}

/** The counting the result actually uses: weeks and calendar months are always calendar. */
export function effectiveCount(i: Inputs): Count {
  if (i.unit === 'weeks') return 'calendar'
  if (i.unit === 'months' && i.monthRule === 'calendar') return 'calendar'
  return i.count
}

/** Service length from joined to lwd, inclusive of the last day, as y/m/d. */
export function serviceLength(joined: string, lwd: string) {
  const end = addDays(lwd, 1) // service runs through the last working day
  let years = 0
  while (diffDays(addMonths(joined, (years + 1) * 12), end) >= 0) years++
  let months = 0
  const yBase = addMonths(joined, years * 12)
  while (diffDays(addMonths(yBase, months + 1), end) >= 0) months++
  const days = diffDays(addMonths(yBase, months), end)
  return { years, months, days }
}

export function compute(i: Inputs): Result {
  const mode = effectiveCount(i)
  const hol = new Set(mode === 'calendar' ? [] : i.holidays.filter(isValidISO))
  const startDay = i.start === 'next' ? addDays(i.resign, 1) : i.resign

  // full notice
  let lwd: string
  if (i.unit === 'months' && i.monthRule === 'calendar') {
    // a calendar month from the day you resign: resign 15 Mar → LWD 15 Apr (notice 16 Mar–15 Apr);
    // when the resignation day is day 1, the LWD is a day earlier (14 Apr)
    // corresponding-date rule: a resignation on a month's last day ends on the target month's last day
    const same = addMonths(i.resign, i.length)
    const lastOfMonth = (d: string) => addDays(d, 1).slice(8) === '01'
    lwd =
      i.start === 'next'
        ? same
        : lastOfMonth(i.resign)
          ? addDays(addMonths(addDays(i.resign, 1), i.length), -1)
          : addDays(same, -1)
  } else {
    const n = i.unit === 'weeks' ? i.length * 7 : i.unit === 'months' ? i.length * 30 : i.length
    lwd = nthDay(startDay, n, mode, hol)
  }

  // leave set-off: each leave day removes one counted day from the end of the notice
  const leave = Math.max(0, Math.floor(i.leave || 0))
  let lwdWithLeave = lwd
  if (leave > 0) {
    const total = countBetween(startDay, lwd, mode, hol)
    const keep = total - leave
    lwdWithLeave = keep <= 0 ? addDays(startDay, -1) : nthDay(startDay, keep, mode, hol)
    if (diffDays(i.resign, lwdWithLeave) < 0) lwdWithLeave = i.resign
  }

  // weekend check uses the contract's working week (Mon–Sat contracts work Saturdays)
  const week: Count = mode === 'mon-sat' ? 'mon-sat' : 'mon-fri'
  const endsOnOff = !isWorkday(lwdWithLeave, week, hol)
  let prevWorkday: string | undefined
  if (endsOnOff) {
    let d = addDays(lwdWithLeave, -1)
    while (!isWorkday(d, week, hol)) d = addDays(d, -1)
    prevWorkday = d
  }

  const end = lwdWithLeave
  let shortCalendar = 0
  let shortWorking6 = 0
  let servedUntil: string | undefined
  if (i.join && isValidISO(i.join)) {
    const lastFree = addDays(i.join, -1)
    if (diffDays(lastFree, end) > 0) {
      servedUntil = lastFree
      const from = addDays(lastFree, 1)
      shortCalendar = diffDays(from, end) + 1
      shortWorking6 = countBetween(from, end, 'mon-sat', hol)
    }
  }
  const pay = i.pay && i.pay > 0 ? i.pay : undefined
  const r2 = (x: number) => Math.round(x)

  let service: Result['service']
  let gratuityLine: string | undefined
  let gratuityMet: boolean | undefined
  if (i.joined && isValidISO(i.joined)) {
    service = serviceLength(i.joined, end)
    const need = i.fixedTerm ? 1 : 5
    // the day on which `need` years of service are complete
    gratuityLine = addDays(addMonths(i.joined, need * 12), -1)
    gratuityMet = diffDays(gratuityLine, end) >= 0
  }

  let wagesDueEarly: string | undefined
  let gratuityGapEarly: number | undefined
  if (servedUntil) {
    wagesDueEarly = workdaysAfter(servedUntil, 2, hol, week)
    if (gratuityLine && diffDays(gratuityLine, servedUntil) < 0)
      gratuityGapEarly = diffDays(servedUntil, gratuityLine)
  }

  return {
    wagesDueEarly,
    gratuityGapEarly,
    startDay,
    lwd,
    lwdWithLeave,
    calendarDays: diffDays(startDay, lwd) + 1,
    weekdays: countBetween(startDay, lwd, 'mon-fri', hol),
    endsOnOff,
    prevWorkday,
    countUsed: mode,
    earliestJoin: addDays(end, 1),
    shortCalendar,
    shortWorking6,
    buyout30: pay && shortCalendar ? r2((pay / 30) * shortCalendar) : undefined,
    buyout26: pay && shortWorking6 ? r2((pay / 26) * shortWorking6) : undefined,
    servedUntil,
    wagesDue: workdaysAfter(end, 2, hol, week),
    service,
    gratuityLine,
    gratuityMet,
  }
}

export function fmtMoney(n: number, c: Currency): string {
  if (c === 'INR') return `₹${Math.round(n).toLocaleString('en-IN')}`
  const sym = c === 'USD' ? '$' : '£'
  return `${sym}${Math.round(n).toLocaleString('en-US')}`
}

export const COUNT_LABEL: Record<Count, string> = {
  calendar: 'calendar days',
  'mon-fri': 'working days (Mon–Fri)',
  'mon-sat': 'working days (Mon–Sat)',
}

/** Plain-text request for early release, built from the result. */
export function releaseEmail(i: Inputs, r: Result): string {
  const short = r.shortCalendar > 0
  const leaveLine =
    i.leave > 0
      ? `I have ${i.leave} days of earned leave; if policy allows, I request that they be set off against the notice, which moves my last day to ${fmtDate(r.lwdWithLeave)}.\n`
      : ''
  const want = short && r.servedUntil ? r.servedUntil : r.lwdWithLeave
  const buy =
    short && i.pay
      ? `For the ${r.shortCalendar} notice days I would not serve, I am willing to pay notice pay as per my appointment letter, or to have it adjusted in my full and final settlement.\n`
      : ''
  return `Subject: Request for early release — last working day ${fmtDate(want)}

Hi <manager's name>,

As per my resignation dated ${fmtDate(i.resign)}, my notice period ends on ${fmtDate(r.lwd)}.
${leaveLine}I request an early release with ${fmtDate(want)} as my last working day.
${buy}
Handover plan:
- <work item> → <colleague>, documented by <date>
- <work item> → <colleague>, walkthrough on <date>
- Access, files and open tickets listed in <link/doc>

I will make sure nothing is left open before I go. Please let me know if this works, or the earliest date you can release me.

Thanks,
<your name>`
}

/** Plain-text note to the new employer about the joining date. */
export function joiningEmail(i: Inputs, r: Result): string {
  return `Subject: Joining date — ${fmtDate(r.earliestJoin)} (earlier if released)

Hi <recruiter's name>,

Thank you for the offer. I resigned on ${fmtDate(i.resign)}. My notice period ends on ${fmtDate(r.lwdWithLeave)}, so I can join on ${fmtDate(r.earliestJoin)}.

I have requested an early release${i.join ? ` so I can join on ${fmtDate(i.join)}` : ''} and will confirm in writing as soon as my manager replies.${r.shortCalendar > 0 && i.pay ? ` If my employer asks for notice pay for the ${r.shortCalendar} days I would not serve, could you let me know whether you offer a notice buyout reimbursement?` : ''}

Best,
<your name>`
}

export const SAMPLE: Inputs = {
  resign: '2026-12-01',
  length: 90,
  unit: 'days',
  count: 'calendar',
  start: 'next',
  monthRule: 'calendar',
  holidays: [],
  leave: 10,
  join: '2027-01-15',
  pay: 120000,
  currency: 'INR',
  joined: '2022-03-14',
  fixedTerm: false,
}
