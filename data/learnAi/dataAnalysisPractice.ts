// "Spot the AI's mistake": a fictional dataset and four AI-style claims, each with one classic
// analysis error. Every number shown on the page (the wrong claim AND the right answer) is
// computed here from ROWS, so prose never hard-codes a figure. No AI, no network.
// Kettle Lane Cafés is a made-up company; the numbers are invented for practice.

export type Row = {
  month: 'Jul' | 'Aug' | 'Sep' | 'Oct'
  city: 'Bengaluru' | 'Mumbai' | 'Pune'
  orders: number
  revenue: number | null // ₹; null = blank cell in the file
}

export const ROWS: Row[] = [
  { month: 'Jul', city: 'Bengaluru', orders: 4500, revenue: 1125000 },
  { month: 'Jul', city: 'Mumbai', orders: 1200, revenue: 384000 },
  { month: 'Jul', city: 'Pune', orders: 300, revenue: 120000 },
  { month: 'Aug', city: 'Bengaluru', orders: 4600, revenue: 1173000 },
  { month: 'Aug', city: 'Mumbai', orders: 1350, revenue: 438750 },
  { month: 'Aug', city: 'Pune', orders: 320, revenue: 131200 },
  { month: 'Sep', city: 'Bengaluru', orders: 4550, revenue: 1164800 },
  { month: 'Sep', city: 'Mumbai', orders: 1450, revenue: 478500 },
  { month: 'Sep', city: 'Pune', orders: 360, revenue: 147600 },
  { month: 'Oct', city: 'Bengaluru', orders: 4400, revenue: 1135200 },
  { month: 'Oct', city: 'Mumbai', orders: 1600, revenue: 536000 },
  { month: 'Oct', city: 'Pune', orders: 400, revenue: null },
]

export const CSV_PATH = '/downloads/learn-ai/kettle-lane-cafes.csv'

const inr = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN')
const inr2 = (n: number) =>
  '₹' + n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
export const MONTH_NAME: Record<Row['month'], string> = {
  Jul: 'July',
  Aug: 'August',
  Sep: 'September',
  Oct: 'October',
}
const pct = (n: number) => (Math.round(n * 10) / 10).toFixed(1) + '%'
const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0)
const rowsOf = (m: Row['month']) => ROWS.filter((r) => r.month === m)

// --- Round 1: average of averages ---
const jul = rowsOf('Jul')
const julAov = jul.map((r) => (r.revenue ?? 0) / r.orders)
export const R1 = {
  wrong: sum(julAov) / julAov.length, // mean of the three city averages
  right: sum(jul.map((r) => r.revenue ?? 0)) / sum(jul.map((r) => r.orders)),
  cityAov: jul.map((r, i) => ({ city: r.city, aov: julAov[i], orders: r.orders })),
}

// --- Round 2: a blank cell read as zero ---
const sep = rowsOf('Sep')
const oct = rowsOf('Oct')
const sepTotal = sum(sep.map((r) => r.revenue ?? 0))
const octAsZero = sum(oct.map((r) => r.revenue ?? 0))
const sepLike = sum(sep.filter((r) => r.city !== 'Pune').map((r) => r.revenue ?? 0))
const octLike = sum(oct.filter((r) => r.city !== 'Pune').map((r) => r.revenue ?? 0))
export const R2 = {
  sepTotal,
  octAsZero,
  wrongChange: (octAsZero / sepTotal - 1) * 100,
  sepLike,
  octLike,
  rightChange: (octLike / sepLike - 1) * 100,
  blanks: ROWS.filter((r) => r.revenue === null).length,
}

// --- Round 3: percent vs percentage points ---
const share = (m: Row['month']) => {
  const rs = rowsOf(m)
  return ((rs.find((r) => r.city === 'Mumbai')?.orders ?? 0) / sum(rs.map((r) => r.orders))) * 100
}
export const R3 = {
  jul: share('Jul'),
  oct: share('Oct'),
  points: share('Oct') - share('Jul'),
  relative: (share('Oct') / share('Jul') - 1) * 100,
}

// --- Round 4: a number not in the data ---
const blr = ROWS.filter((r) => r.city === 'Bengaluru')
const best = blr.reduce((a, b) => (b.orders > a.orders ? b : a))
export const R4 = {
  claimedMonth: 'Jul' as const,
  claimedOrders: blr.find((r) => r.month === 'Jul')?.orders ?? 0,
  bestMonth: best.month,
  bestOrders: best.orders,
}

export type Round = {
  id: string
  claim: string // what the "AI" said, written the way chat answers read
  question: string
  options: string[]
  answer: number // 0-based
  explain: string[] // 2–3 short lines with the right numbers
  check: string // the habit to keep
}

export const ROUNDS: Round[] = [
  {
    id: 'average-of-averages',
    claim: `In July, the average order value across all three cities was ${inr2(R1.wrong)}.`,
    question: 'Which check catches the mistake?',
    options: [
      'Ask the AI to make a chart of it',
      'Recompute it as total revenue ÷ total orders',
      'Ask the AI if it is sure',
    ],
    answer: 1,
    explain: [
      `It averaged the three city averages (${R1.cityAov.map((c) => inr2(c.aov)).join(', ')}) as if each city sold the same amount.`,
      `Pune sold ${R1.cityAov[2].orders.toLocaleString('en-IN')} orders and Bengaluru ${R1.cityAov[0].orders.toLocaleString('en-IN')}, so Bengaluru should count far more.`,
      `Right answer: ${inr2(R1.right)} per order, ${inr2(R1.wrong - R1.right)} lower.`,
    ],
    check: 'Averages of averages are wrong when the groups differ in size. Divide totals.',
  },
  {
    id: 'blank-as-zero',
    claim: `Revenue fell ${pct(Math.abs(R2.wrongChange))} from September (${inr(R2.sepTotal)}) to October (${inr(R2.octAsZero)}).`,
    question: 'Which check catches the mistake?',
    options: [
      'Count the rows and blanks for each month first',
      'Ask for the answer in a table',
      'Round the numbers to lakhs',
    ],
    answer: 0,
    explain: [
      `October’s Pune revenue is blank in the file, and the analysis treated the blank as ₹0.`,
      `Comparing like for like (Bengaluru + Mumbai only): ${inr(R2.sepLike)} → ${inr(R2.octLike)}.`,
      `Right answer: revenue rose ${pct(R2.rightChange)} where both months have data; Pune is unknown.`,
    ],
    check: 'Before any answer, ask how many rows, how many blanks, and what it did with them.',
  },
  {
    id: 'percent-vs-points',
    claim: `Mumbai’s share of orders grew by ${pct(R3.points)} between July and October.`,
    question: 'What should the sentence say?',
    options: [
      'Nothing: “grew by 5%” is clear',
      'The share went down, not up',
      '+5 percentage points (a 25% rise)',
    ],
    answer: 2,
    explain: [
      `Mumbai’s share went from ${pct(R3.jul)} of orders to ${pct(R3.oct)}.`,
      `That is +${(Math.round(R3.points * 10) / 10).toFixed(1)} percentage points, which is a ${pct(R3.relative)} rise in the share itself.`,
      '“Grew by 5%” could mean either, so the reader cannot tell. Say “points” for the gap.',
    ],
    check:
      'When a rate changes, say “percentage points” for the gap and “%” for the relative change.',
  },
  {
    id: 'not-in-the-data',
    claim: `Bengaluru’s best month for orders was ${MONTH_NAME[R4.claimedMonth]}, with ${R4.claimedOrders.toLocaleString('en-IN')} orders.`,
    question: 'Which check catches the mistake?',
    options: [
      'Sort the Bengaluru rows yourself and look',
      'Ask a second chatbot',
      'Trust it: the number is in the file',
    ],
    answer: 0,
    explain: [
      `${R4.claimedOrders.toLocaleString('en-IN')} is a real number from the file, which makes the claim look right.`,
      `But ${MONTH_NAME[R4.bestMonth]} had more: ${R4.bestOrders.toLocaleString('en-IN')} orders.`,
      'A correct-looking number attached to the wrong label is the easiest error to miss.',
    ],
    check: 'Spot-check one claim against the raw rows yourself, in Excel or Sheets, every time.',
  },
]

export function toCsv(): string {
  const head = 'month,city,orders,revenue_inr'
  return [head, ...ROWS.map((r) => `${r.month},${r.city},${r.orders},${r.revenue ?? ''}`)].join(
    '\n'
  )
}
