'use client'

import { useMemo, useState } from 'react'
import MockInterviewButton from '@/components/ai/MockInterviewButton'

// Nov 2026: this tool used to scrape LinkedIn, which LinkedIn's terms forbid.
// It builds search links so candidates open each job board's own live results.
// Nov 25 rebuild: the four boards are shown working as you type (the exact search each one
// receives), plus two filters that carry over where the board's URL supports them.
// URL parameters checked Nov 25, 2026 (docs/briefs/2026-11-25-find-jobs-hero.md):
//   LinkedIn f_TPR=r86400|r604800 (posted in last 24 h | week), f_E=1 internship, 2 entry level
//   Indeed fromage=N (max days since posted); country by subdomain (in.indeed.com)
//   Naukri /<role>-jobs-in-<city>, experience=0 for freshers; no verified freshness parameter
//   Google Jobs ibp=htl;jobs; no verified date parameter

type Posted = 'any' | 'day' | 'week'
type Level = 'any' | 'entry' | 'intern'

interface Board {
  name: string
  host: string
  note: string
  url: string
  shown: string // the readable part of the URL, for the live preview
  applied: string[]
  manual: string[]
}

const enc = encodeURIComponent
const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/\+\+/g, '-plus-plus')
    .replace(/#/g, '-sharp')
    .replace(/&/g, ' and ')
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
// Readable form of a query string: '+' is a space only before decoding, so 'C++' survives.
const readable = (p: URLSearchParams) => decodeURIComponent(p.toString().replace(/\+/g, ' '))

export const INDIA =
  /\b(india|bengaluru|bangalore|mumbai|thane|navi mumbai|delhi|new delhi|ncr|gurgaon|gurugram|noida|faridabad|ghaziabad|hyderabad|pune|chennai|kolkata|ahmedabad|jaipur|kochi|cochin|chandigarh|mohali|indore|bhopal|coimbatore|lucknow|patna|bhubaneswar|thiruvananthapuram|trivandrum|mysuru|mysore|nagpur|vadodara|surat|visakhapatnam|vizag|goa|kanpur|ranchi|guwahati)\b/i
export const REMOTE = /^(remote|wfh|work from home|anywhere)$/i
// Naukri's own city slugs for the common renamed cities
const NAUKRI_CITY: Record<string, string> = {
  bengaluru: 'bangalore',
  gurugram: 'gurgaon',
  'new-delhi': 'delhi',
}

export type Country = 'in' | 'us'

const POSTED_LABEL: Record<Posted, string> = {
  any: 'Any time',
  day: 'Last 24 hours',
  week: 'Last 7 days',
}
const LEVEL_LABEL: Record<Level, string> = {
  any: 'Any level',
  entry: 'Fresher / entry level',
  intern: 'Internship',
}
const COUNTRY_LABEL: Record<Country, string> = { in: 'India', us: 'US' }

export function buildBoards(
  keywords: string,
  location: string,
  posted: Posted,
  level: Level,
  country: Country
) {
  const q = keywords.trim()
  const raw = location.trim()
  const remote = REMOTE.test(raw)
  const l = remote ? '' : raw
  const remoteChip = remote ? ['Remote / work from home'] : []

  // LinkedIn
  const li = new URLSearchParams({ keywords: q })
  if (l) li.set('location', l)
  else if (!remote) li.set('location', COUNTRY_LABEL[country] === 'US' ? 'United States' : 'India')
  if (posted !== 'any') li.set('f_TPR', posted === 'day' ? 'r86400' : 'r604800')
  if (level !== 'any') li.set('f_E', level === 'intern' ? '1' : '2')
  const liApplied = [
    posted !== 'any' ? POSTED_LABEL[posted] : '',
    level !== 'any' ? LEVEL_LABEL[level] : '',
  ].filter(Boolean)

  // Naukri (Indian board: a non-Indian city is dropped)
  const nkCitySlug = l && country === 'in' ? slug(l) : ''
  const nkCity = NAUKRI_CITY[nkCitySlug] ?? nkCitySlug
  const nkPath = `${slug(q) || 'all'}-jobs${nkCity ? `-in-${nkCity}` : ''}`
  const nk = new URLSearchParams({ k: q })
  if (nkCity) nk.set('l', nkCity.replace(/-/g, ' '))
  if (level !== 'any') nk.set('experience', '0')
  const nkApplied = level !== 'any' ? ['0 years experience'] : []
  const nkManual = [...(posted !== 'any' ? ['Freshness'] : []), ...remoteChip]

  // Indeed (country site by subdomain)
  const inHost = country === 'in' ? 'in.indeed.com' : 'www.indeed.com'
  const id = new URLSearchParams({ q: level === 'intern' ? `${q} internship` : q })
  if (l) id.set('l', l)
  if (posted !== 'any') id.set('fromage', posted === 'day' ? '1' : '7')
  const idApplied = [
    posted !== 'any' ? POSTED_LABEL[posted] : '',
    level === 'intern' ? '“internship” added' : '',
  ].filter(Boolean)
  const idManual = [...(level === 'entry' ? ['Experience level'] : []), ...remoteChip]

  // Google Jobs
  const where = l ? ` in ${l}` : remote ? ' remote' : country === 'in' ? ' in India' : ''
  const gq = `${q}${level === 'intern' ? ' internship' : level === 'entry' ? ' entry level' : ''} jobs${where}`
  const gApplied = [
    ...(level !== 'any' ? [`“${level === 'intern' ? 'internship' : 'entry level'}” added`] : []),
    ...(remote ? ['“remote” added'] : []),
  ]
  const gManual = posted !== 'any' ? ['Date posted'] : []

  const boards: Board[] = [
    {
      name: 'LinkedIn Jobs',
      host: 'linkedin.com',
      note: 'Global. Takes the date and experience filters from the link.',
      url: `https://www.linkedin.com/jobs/search/?${li.toString()}`,
      shown: `linkedin.com/jobs/search/?${readable(li)}`,
      applied: liApplied,
      manual: remoteChip,
    },
    {
      name: 'Naukri',
      host: 'naukri.com',
      note:
        country === 'us' && raw && !remote
          ? 'Indian board, so your US location is left out.'
          : 'Indian board. Takes the fresher (0 years) filter from the link.',
      url: `https://www.naukri.com/${nkPath}?${nk.toString()}`,
      shown: `naukri.com/${nkPath}?${readable(nk)}`,
      applied: nkApplied,
      manual: nkManual,
    },
    {
      name: country === 'in' ? 'Indeed India' : 'Indeed US',
      host: inHost.replace('www.', ''),
      note:
        country === 'in'
          ? 'India’s Indeed site. Takes the date filter from the link.'
          : 'US Indeed site. Takes the date filter from the link.',
      url: `https://${inHost}/jobs?${id.toString()}`,
      shown: `${inHost.replace('www.', '')}/jobs?${readable(id)}`,
      applied: idApplied,
      manual: idManual,
    },
    {
      name: 'Google Jobs',
      host: 'google.com',
      note: 'Collects listings from many boards and company career pages.',
      url: `https://www.google.com/search?q=${enc(gq)}&ibp=htl;jobs`,
      shown: `google.com/search?q=${gq}`,
      applied: gApplied,
      manual: gManual,
    },
  ]
  return boards
}

const POPULAR = [
  { title: 'Product Manager', location: 'Bengaluru' },
  { title: 'Data Analyst', location: 'Hyderabad', level: 'entry' as Level },
  { title: 'Business Analyst', location: 'Mumbai' },
  { title: 'Software Engineer', location: 'Pune', level: 'entry' as Level },
  { title: 'Founder’s Office', location: 'Delhi' },
  { title: 'AI Engineer', location: 'Remote' },
]

const inputClass =
  'h-11 w-full rounded-lg border border-border-input bg-surface px-4 text-body text-fg placeholder:text-fg-3 focus:border-signal focus:outline-none focus-visible:ring-2 focus-visible:ring-signal'

function Seg<T extends string>({
  name,
  value,
  options,
  onChange,
}: {
  name: string
  value: T
  options: Record<T, string>
  onChange: (v: T) => void
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-2 text-small font-medium text-fg">{name}</legend>
      <div className="flex flex-wrap gap-2">
        {(Object.keys(options) as T[]).map((k) => (
          <button
            key={k}
            type="button"
            aria-pressed={value === k}
            onClick={() => onChange(k)}
            className={`h-10 rounded-full px-3.5 text-small transition-colors duration-fast ${
              value === k
                ? 'bg-fg font-medium text-bg'
                : 'bg-surface text-fg-2 ring-1 ring-inset ring-border-strong hover:bg-muted hover:text-fg'
            }`}
          >
            {options[k]}
          </button>
        ))}
      </div>
    </fieldset>
  )
}

const FindJobsPage = () => {
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [company, setCompany] = useState('')
  const [posted, setPosted] = useState<Posted>('any')
  const [level, setLevel] = useState<Level>('any')
  const [country, setCountry] = useState<Country>('in')
  const US =
    /\b(usa|united states|new york|nyc|san francisco|bay area|seattle|austin|boston|chicago|los angeles|denver|atlanta|dallas)\b/i
  const onLocation = (v: string) => {
    setLocation(v)
    if (INDIA.test(v)) setCountry('in')
    else if (US.test(v)) setCountry('us')
  }

  const keywords = [title, company].filter((s) => s.trim()).join(' ')
  const ready = keywords.trim().length > 0
  const boards = useMemo(
    () => buildBoards(keywords || 'your job title', location, posted, level, country),
    [keywords, location, posted, level, country]
  )

  return (
    <div className="mx-auto w-full max-w-[1200px] px-5 pb-6 pt-10 md:px-8 md:pt-14">
      <div className="max-w-3xl">
        <div className="font-mono text-kicker uppercase tracking-[0.08em] text-signal-strong">
          Free job search · 4 boards · no signup
        </div>
        <h1 className="mt-3 font-serif text-display font-medium text-fg">
          Search LinkedIn, Naukri, Indeed and Google Jobs in one go
        </h1>
        <p className="mt-4 max-w-[56ch] text-body-lg text-fg-2">
          Type the role once. Each board’s search is built as you type, with the date and experience
          filters carried over where that board allows it. You apply on the board itself.
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start">
        {/* The search */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="min-w-0 rounded-2xl border border-border bg-surface p-5 shadow-e1 md:p-6"
          aria-label="Job search"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="job-title" className="mb-2 block text-small font-medium text-fg">
                Job title
              </label>
              <input
                id="job-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Product Manager"
                autoComplete="off"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="job-location" className="mb-2 block text-small font-medium text-fg">
                Location
              </label>
              <input
                id="job-location"
                type="text"
                value={location}
                onChange={(e) => onLocation(e.target.value)}
                placeholder="e.g. Bengaluru or Remote"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="job-company" className="mb-2 block text-small font-medium text-fg">
                Company <span className="font-normal text-fg-3">(optional)</span>
              </label>
              <input
                id="job-company"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Flipkart"
                className={inputClass}
              />
            </div>
          </div>

          <div className="mt-5 grid gap-4">
            <Seg name="Country" value={country} options={COUNTRY_LABEL} onChange={setCountry} />
            <Seg name="Posted" value={posted} options={POSTED_LABEL} onChange={setPosted} />
            <Seg name="Level" value={level} options={LEVEL_LABEL} onChange={setLevel} />
          </div>

          <div className="mt-6 border-t border-border pt-4">
            <div className="text-caption text-fg-3">Or start from a common search</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {POPULAR.map((p) => (
                <button
                  key={p.title}
                  type="button"
                  onClick={() => {
                    setTitle(p.title)
                    onLocation(p.location)
                    setCompany('')
                    setPosted('any')
                    setLevel(p.level ?? 'any')
                  }}
                  className="inline-flex h-10 items-center rounded-full bg-muted px-3.5 text-caption font-medium text-fg-2 transition-colors duration-fast hover:bg-signal-tint hover:text-signal-strong sm:h-9"
                >
                  {p.title} · {p.location}
                </button>
              ))}
            </div>
          </div>
        </form>

        {/* The boards, built live */}
        <section aria-labelledby="boards-h" className="min-w-0">
          <div className="flex items-center justify-between gap-3">
            <h2 id="boards-h" className="text-h4 font-semibold text-fg">
              {ready ? 'Your searches are ready' : 'Your searches, built as you type'}
            </h2>
            <span className="inline-flex items-center gap-2 text-caption text-fg-2">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                {ready && (
                  <span className="cta-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-60" />
                )}
                <span
                  className={`relative inline-flex h-2 w-2 rounded-full ${ready ? 'bg-signal' : 'bg-fg-3'}`}
                />
              </span>
              {ready ? '4 of 4 boards' : 'Waiting for a job title'}
            </span>
          </div>
          <p className="sr-only" aria-live="polite">
            {ready ? 'Four job board searches are ready below.' : ''}
          </p>

          <ul className="mt-3 grid grid-cols-1 gap-3">
            {boards.map((b) => {
              const body = (
                <>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-body font-semibold text-fg">
                        {b.name}
                        {ready && <span className="sr-only"> (opens in a new tab)</span>}
                      </div>
                      <div className="mt-0.5 text-caption text-fg-2">{b.note}</div>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-caption font-semibold ${
                        ready ? 'bg-signal-tint text-signal-strong' : 'bg-muted text-fg-3'
                      }`}
                    >
                      {ready ? 'Open ↗' : 'Type a job title'}
                    </span>
                  </div>
                  <div
                    key={b.shown}
                    className="cta-q mt-3 truncate rounded-lg bg-muted px-3 py-2 font-mono text-caption text-fg-2"
                  >
                    {b.shown}
                  </div>
                  {(b.applied.length > 0 || b.manual.length > 0) && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {b.applied.map((a) => (
                        <span
                          key={a}
                          className="inline-flex h-6 items-center rounded-full bg-success-soft px-2.5 text-caption font-medium text-success-strong"
                        >
                          ✓ {a}
                        </span>
                      ))}
                      {b.manual.map((m) => (
                        <span
                          key={m}
                          className="inline-flex h-6 items-center rounded-full bg-warn-soft px-2.5 text-caption font-medium text-warn"
                        >
                          Set “{m}” on {b.host}
                        </span>
                      ))}
                    </div>
                  )}
                </>
              )
              return (
                <li key={b.name} className="min-w-0">
                  {ready ? (
                    <a
                      href={b.url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="block rounded-xl border border-border bg-surface p-4 transition-[border-color,box-shadow] duration-fast hover:border-signal/40 hover:shadow-e2"
                    >
                      {body}
                    </a>
                  ) : (
                    <div className="rounded-xl border border-dashed border-border-strong bg-surface/70 p-4 opacity-80">
                      {body}
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </section>
      </div>

      <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-border bg-signal-tint/50 p-5 md:flex-row md:items-center md:justify-between md:p-6">
        <div>
          <div className="text-body font-semibold text-fg">Already have an interview lined up?</div>
          <p className="mt-1 text-small text-fg-2">
            Practise the questions out loud with a voice interviewer before the real one.
          </p>
        </div>
        <MockInterviewButton label="Free mock interview" caption={false} />
      </div>
    </div>
  )
}

export default FindJobsPage
