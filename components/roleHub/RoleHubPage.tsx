import Link from 'next/link'
import DomainLayout from '@/components/domain/DomainLayout'
import type { HubVisual, RoleHub } from '@/data/roleHubs/types'
import { ROLE_HUB_LIST } from '@/data/roleHubs'

const SITE = 'https://www.autointerviewai.com'

const NAV = [
  { id: 'role', label: 'The role' },
  { id: 'expectations', label: 'B2B vs B2C' },
  { id: 'pay', label: 'Pay' },
  { id: 'hiring', label: 'Who is hiring' },
  { id: 'process', label: 'Interview loop' },
  { id: 'questions', label: 'Questions' },
  { id: 'plan', label: 'Prep plan' },
  { id: 'resources', label: 'Resources' },
  { id: 'faq', label: 'FAQ' },
]

function paras(text: string) {
  return text.split('\n\n').map((p, i) => (
    <p key={i} className="text-sm leading-relaxed text-[#4d4d4d]">
      {p}
    </p>
  ))
}

function SectionHead({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <div className="space-y-2">
      <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#ea580c]">
        {kicker}
      </span>
      <h2 className="text-2xl font-normal tracking-tight text-[#171717] sm:text-3xl">{title}</h2>
      {sub && <p className="text-sm leading-relaxed text-[#666666]">{sub}</p>}
    </div>
  )
}

function Visual({ v, priority = false }: { v: HubVisual; priority?: boolean }) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-[#ebebeb] bg-[#0E1424] shadow-sm">
      {v.mp4 ? (
        <video
          className="block aspect-video w-full"
          src={v.mp4}
          poster={v.image}
          autoPlay
          muted
          loop
          playsInline
          preload={priority ? 'auto' : 'metadata'}
          aria-label={v.alt}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="block aspect-video w-full"
          src={v.image}
          alt={v.alt}
          width={1600}
          height={900}
          loading={priority ? 'eager' : 'lazy'}
        />
      )}
      <figcaption className="sr-only">{v.alt}</figcaption>
    </figure>
  )
}

function HeroPoster({ hub }: { hub: RoleHub }) {
  const india = hub.pay.tables[0]
  const median = india?.rows.find((r) => r.band === 'Median')
  return (
    <div className="rh-poster relative overflow-hidden rounded-2xl bg-[#171717] p-6 sm:p-8">
      <div aria-hidden="true" className="rh-dots absolute inset-0 opacity-40" />
      <div
        aria-hidden="true"
        className="rh-word relative select-none font-black uppercase leading-[0.82] tracking-[-0.04em] text-[#fafafa]"
      >
        {hub.shortName.split(' ').map((w, i) => (
          <span key={w} className="rh-rise block" style={{ animationDelay: `${0.15 * i}s` }}>
            {w}
          </span>
        ))}
      </div>
      {median && (
        <div className="rh-lens absolute bottom-6 right-6 w-[62%] max-w-[260px] rounded-2xl border border-white/30 bg-white/10 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-md sm:bottom-8 sm:right-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-white/70">
            {india.region} median pay
          </div>
          <div className="rh-sweep mt-1 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {median.value}
          </div>
          <div className="mt-1 text-[11px] leading-snug text-white/70">
            Product managers, total comp · Levels.fyi
          </div>
          <div className="mt-3 h-[3px] w-full overflow-hidden rounded bg-white/15">
            <div className="rh-arc h-full rounded bg-[#ea580c]" />
          </div>
        </div>
      )}
      <style>{`
        .rh-poster { min-height: 300px; }
        .rh-dots { background-image: radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px); background-size: 14px 14px; animation: rh-drift 10s linear infinite; }
        .rh-word { font-size: clamp(88px, 16vw, 168px); }
        .rh-rise { animation: rh-rise 10s cubic-bezier(.2,.7,.1,1) infinite both; }
        .rh-lens { animation: rh-lens 10s cubic-bezier(.2,.7,.1,1) infinite both; }
        .rh-arc { animation: rh-arc 10s ease-out infinite both; }
        .rh-sweep { background: linear-gradient(100deg,#fff 40%,#fdba74 50%,#fff 60%); background-size: 250% 100%; -webkit-background-clip: text; background-clip: text; color: transparent; animation: rh-sweep 10s ease-in-out infinite; }
        @keyframes rh-rise { 0% { opacity: 0; transform: translateY(40px); } 8%,92% { opacity: 1; transform: translateY(0); } 100% { opacity: 0; } }
        @keyframes rh-lens { 0%,10% { opacity: 0; transform: translate(30px,10px); } 20%,92% { opacity: 1; transform: translate(0,0); } 100% { opacity: 0; } }
        @keyframes rh-arc { 0%,20% { width: 0; } 45%,100% { width: 62%; } }
        @keyframes rh-sweep { 0%,30% { background-position: 100% 0; } 55%,100% { background-position: 0 0; } }
        @keyframes rh-drift { from { background-position: 0 0; } to { background-position: 14px 14px; } }
        @media (prefers-reduced-motion: reduce) {
          .rh-dots, .rh-rise, .rh-lens, .rh-arc, .rh-sweep { animation: none !important; opacity: 1 !important; transform: none !important; }
          .rh-arc { width: 62%; }
          .rh-sweep { color: #fff; background: none; }
        }
      `}</style>
    </div>
  )
}

export default function RoleHubPage({ hub }: { hub: RoleHub }) {
  const url = `${SITE}/${hub.slug}`
  const totalQuestions = hub.questionGroups.reduce((n, g) => n + g.questions.length, 0)
  const maxHires = Math.max(...hub.hiring.companies.map((c) => c.count))

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: hub.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: `${hub.roleName} interview prep`, item: url },
    ],
  }
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: hub.metaTitle,
    description: hub.metaDescription,
    url,
    dateModified: hub.lastUpdated,
    about: { '@type': 'Occupation', name: hub.roleName },
    publisher: { '@type': 'Organization', name: 'Auto Interview AI', url: SITE },
  }

  return (
    <DomainLayout currentPath={`/${hub.slug}`}>
      {[faqSchema, breadcrumbSchema, pageSchema].map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}

      <div className="min-h-screen bg-[#fafafa] px-4 pb-32 pt-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-16">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-xs font-medium text-[#666666]">
            <Link href="/" className="transition-colors hover:text-[#171717]">
              Home
            </Link>
            <span>/</span>
            <span className="font-semibold text-[#171717]">{hub.roleName}</span>
          </nav>

          {/* Hero */}
          <header className="grid items-center gap-8 lg:grid-cols-[1.1fr_1fr]">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#ebebeb] bg-white px-3.5 py-1 font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717] shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#f97316]" />
                <span>Role hub</span>
                <span className="text-[#999999]">•</span>
                <span className="font-semibold text-[#ea580c]">Updated {hub.lastUpdated}</span>
              </div>
              <h1 className="text-4xl font-normal leading-[1.08] tracking-tight text-[#171717] sm:text-5xl">
                {hub.heroTitle}
              </h1>
              <p className="text-lg font-light leading-relaxed text-[#666666]">
                {hub.heroDescription}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/free-mock-interview"
                  className="inline-flex items-center rounded-md bg-[#171717] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#333]"
                >
                  Practise with a free AI mock interview
                </Link>
                <a
                  href="#questions"
                  className="inline-flex items-center rounded-md border border-[#ebebeb] bg-white px-5 py-2.5 text-sm font-medium text-[#171717] transition hover:bg-[#f5f5f5]"
                >
                  {totalQuestions} questions with answers ↓
                </a>
              </div>
            </div>
            {hub.visuals?.hero ? (
              <Visual v={hub.visuals.hero} priority />
            ) : (
              <HeroPoster hub={hub} />
            )}
          </header>

          {/* Direct answer */}
          <div className="rounded-xl border-y border-l-4 border-r border-[#ebebeb] border-l-[#ea580c] bg-white p-6 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-[#ea580c]">
              In one paragraph
            </div>
            <p className="speakable-direct-answer mt-3 text-sm font-medium leading-relaxed text-[#171717]">
              {hub.directAnswer}
            </p>
          </div>

          {/* In-page nav */}
          <nav
            aria-label="On this page"
            className="sticky top-16 z-10 -mx-4 overflow-x-auto border-y border-[#ebebeb] bg-[#fafafa]/90 px-4 py-3 backdrop-blur"
          >
            <ul className="flex gap-2 whitespace-nowrap">
              {NAV.map((n) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    className="rounded-full border border-[#ebebeb] bg-white px-3 py-1 text-xs text-[#4d4d4d] transition hover:border-[#171717] hover:text-[#171717]"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* The role */}
          <section id="role" className="scroll-mt-32 space-y-6">
            <SectionHead
              kicker="01 · The role"
              title={`What ${/^[AEIOU]/i.test(hub.roleName) ? 'an' : 'a'} ${hub.roleName} does`}
            />
            <div className="space-y-3">
              {hub.whatTheRoleIs.map((p, i) => (
                <p key={i} className="text-base leading-relaxed text-[#4d4d4d]">
                  {p}
                </p>
              ))}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {hub.skills.map((s) => (
                <div key={s.area} className="rounded-xl border border-[#ebebeb] bg-white p-5">
                  <h3 className="text-sm font-semibold text-[#171717]">{s.area}</h3>
                  <ul className="mt-3 space-y-1.5 text-sm text-[#4d4d4d]">
                    {s.items.map((it) => (
                      <li key={it} className="flex gap-2">
                        <span className="text-[#ea580c]">✓</span>
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Expectations */}
          <section id="expectations" className="scroll-mt-32 space-y-6">
            <SectionHead
              kicker="02 · Expectations"
              title="What companies expect: B2B vs B2C"
              sub="Most open roles in 2026 are B2B. Read that column first."
            />
            <div className="grid gap-4 lg:grid-cols-2">
              {(['b2b', 'b2c'] as const).map((k) => {
                const e = hub.expectations[k]
                return (
                  <div
                    key={k}
                    className={`rounded-xl border bg-white p-6 ${
                      k === 'b2b' ? 'border-[#171717]' : 'border-[#ebebeb]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded px-2 py-0.5 font-mono text-[11px] uppercase ${
                          k === 'b2b' ? 'bg-[#171717] text-white' : 'bg-[#f5f5f5] text-[#171717]'
                        }`}
                      >
                        {k.toUpperCase()}
                      </span>
                      {k === 'b2b' && (
                        <span className="text-[11px] font-medium text-[#ea580c]">
                          Most roles today
                        </span>
                      )}
                    </div>
                    <h3 className="mt-3 text-base font-medium text-[#171717]">{e.headline}</h3>
                    <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#4d4d4d]">
                      {e.points.map((p) => (
                        <li key={p} className="flex gap-2">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#171717]" />
                          {p}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 border-t border-[#ebebeb] pt-4">
                      <div className="font-mono text-[11px] uppercase tracking-wider text-[#666666]">
                        Metrics you will own
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {e.metrics.map((m) => (
                          <span
                            key={m}
                            className="rounded-full bg-[#f5f5f5] px-2.5 py-1 text-[11px] text-[#171717]"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="rounded-xl border border-[#ebebeb] bg-white p-6">
              <h3 className="text-sm font-semibold text-[#171717]">
                How it differs from a classic {hub.roleName.replace(/^AI /, '')} role
              </h3>
              <ul className="mt-3 grid gap-2 text-sm text-[#4d4d4d] sm:grid-cols-2">
                {hub.expectations.difference.map((d) => (
                  <li key={d} className="flex gap-2">
                    <span className="text-[#ea580c]">→</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Pay */}
          <section id="pay" className="scroll-mt-32 space-y-6">
            <SectionHead
              kicker="03 · Pay"
              title="Pay by experience: India, US and Europe"
              sub={hub.pay.intro}
            />
            {hub.visuals?.pay && <Visual v={hub.visuals.pay} />}
            <div className="grid gap-4 md:grid-cols-2">
              {hub.pay.tables.map((t) => (
                <div key={t.region} className="rounded-xl border border-[#ebebeb] bg-white p-5">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-base font-medium text-[#171717]">{t.region}</h3>
                    <span className="text-[11px] text-[#666666]">{t.currency}</span>
                  </div>
                  <table className="mt-3 w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-[#ebebeb] text-[11px] uppercase tracking-wider text-[#666666]">
                        <th className="py-2 font-medium">Band</th>
                        <th className="py-2 font-medium">Experience</th>
                        <th className="py-2 text-right font-medium">Total pay</th>
                      </tr>
                    </thead>
                    <tbody>
                      {t.rows.map((r) => (
                        <tr key={r.band} className="border-b border-[#f5f5f5] last:border-0">
                          <td className="py-2 text-[#4d4d4d]">{r.band}</td>
                          <td className="py-2 text-xs text-[#666666]">{r.experience}</td>
                          <td className="py-2 text-right font-mono font-semibold text-[#171717]">
                            {r.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="mt-3 text-[11px] leading-relaxed text-[#666666]">
                    Source:{' '}
                    <a
                      href={t.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      {t.sourceLabel}
                    </a>{' '}
                    ({t.asOf}). {t.note}
                  </p>
                </div>
              ))}
            </div>
            {hub.pay.crossCheck && (
              <p className="text-xs leading-relaxed text-[#666666]">{hub.pay.crossCheck}</p>
            )}
          </section>

          {/* Hiring */}
          <section id="hiring" className="scroll-mt-32 space-y-6">
            <SectionHead
              kicker="04 · Who is hiring"
              title="Companies hiring the most in 2025–26"
              sub={hub.hiring.intro}
            />
            {hub.visuals?.hiring && <Visual v={hub.visuals.hiring} />}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {hub.hiring.companies.map((c) => (
                <div key={c.name} className="rounded-xl border border-[#ebebeb] bg-white p-4">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#171717] text-sm font-semibold text-white"
                    >
                      {c.name.charAt(0)}
                    </span>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium text-[#171717]">{c.name}</div>
                      <div className="text-[11px] text-[#666666]">{c.segment}</div>
                    </div>
                    <div className="ml-auto text-right">
                      <div className="font-mono text-lg font-semibold text-[#171717]">
                        {c.count}
                      </div>
                      <div className="text-[10px] text-[#666666]">moved in</div>
                    </div>
                  </div>
                  <div className="mt-3 h-1.5 w-full rounded bg-[#f5f5f5]">
                    <div
                      className="h-full rounded bg-[#ea580c]"
                      style={{ width: `${Math.max(4, (c.count / maxHires) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[11px] leading-relaxed text-[#666666]">
              {hub.hiring.method} ({hub.hiring.sourceLabel}, {hub.hiring.asOf}.)
            </p>
          </section>

          {/* Process */}
          <section id="process" className="scroll-mt-32 space-y-6">
            <SectionHead
              kicker="05 · Interview loop"
              title="The interview process by company type"
              sub="Typical loops. Each company varies, so confirm the rounds with your recruiter."
            />
            <div className="grid gap-4 md:grid-cols-2">
              {hub.process.map((p) => (
                <div
                  key={p.companyType}
                  className="rounded-xl border border-[#ebebeb] bg-white p-5"
                >
                  <h3 className="text-sm font-semibold text-[#171717]">{p.companyType}</h3>
                  <ol className="mt-3 space-y-2">
                    {p.rounds.map((r, i) => (
                      <li key={r} className="flex items-start gap-3 text-sm text-[#4d4d4d]">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#ebebeb] font-mono text-[10px] text-[#171717]">
                          {i + 1}
                        </span>
                        {r}
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </section>

          {/* Questions */}
          <section id="questions" className="scroll-mt-32 space-y-8">
            <SectionHead
              kicker="06 · Question bank"
              title={`${totalQuestions} ${hub.shortName} interview questions with model answers`}
              sub="Tap a question to see a model answer and what the interviewer is listening for. Practise out loud before you read the answer."
            />
            <div className="flex flex-wrap gap-2">
              {hub.questionGroups.map((g) => (
                <a
                  key={g.id}
                  href={`#q-${g.id}`}
                  className="rounded-full border border-[#ebebeb] bg-white px-3 py-1 text-xs text-[#4d4d4d] hover:border-[#171717]"
                >
                  {g.title} · {g.questions.length}
                </a>
              ))}
            </div>
            {hub.questionGroups.map((g) => (
              <div key={g.id} id={`q-${g.id}`} className="scroll-mt-32 space-y-3">
                <div>
                  <h3 className="text-lg font-medium text-[#171717]">{g.title}</h3>
                  <p className="text-xs text-[#666666]">{g.blurb}</p>
                </div>
                <div className="divide-y divide-[#ebebeb] overflow-hidden rounded-xl border border-[#ebebeb] bg-white">
                  {g.questions.map((q) => (
                    <details key={q.q} className="group">
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-4 text-sm font-medium text-[#171717] hover:bg-[#fafafa]">
                        <span>{q.q}</span>
                        <span className="mt-0.5 shrink-0 font-mono text-[#999999] transition group-open:rotate-45">
                          +
                        </span>
                      </summary>
                      <div className="space-y-3 border-t border-[#f5f5f5] bg-[#fcfcfc] px-5 py-4">
                        {paras(q.answer)}
                        {q.lookFor && (
                          <p className="rounded-md bg-[#fff7ed] px-3 py-2 text-xs text-[#9a3412]">
                            <strong>What they look for:</strong> {q.lookFor}
                          </p>
                        )}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex flex-col items-start gap-4 rounded-2xl bg-[#171717] p-6 text-white sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-lg font-medium">Reading answers is not practice.</div>
                <p className="text-sm text-white/70">
                  Answer these out loud to an AI interviewer and get feedback in minutes. Free, no
                  signup.
                </p>
              </div>
              <Link
                href="/free-mock-interview"
                className="shrink-0 rounded-md bg-white px-5 py-2.5 text-sm font-medium text-[#171717] hover:bg-[#f5f5f5]"
              >
                Start mock interview
              </Link>
            </div>
          </section>

          {/* Plan */}
          <section id="plan" className="scroll-mt-32 space-y-6">
            <SectionHead kicker="07 · Prep plan" title="7, 14 and 30-day prep plans" />
            <div className="grid items-start gap-4 md:grid-cols-3">
              {hub.plans.map((p) => (
                <details
                  key={p.days}
                  className="group rounded-xl border border-[#ebebeb] bg-white p-5"
                  open={p.days === '7 days'}
                >
                  <summary className="cursor-pointer list-none">
                    <div className="font-mono text-2xl font-semibold text-[#171717]">{p.days}</div>
                    <div className="text-sm text-[#666666]">{p.title}</div>
                  </summary>
                  <ul className="mt-4 space-y-2 text-sm text-[#4d4d4d]">
                    {p.tasks.map((t) => (
                      <li key={t} className="flex gap-2">
                        <span className="text-[#ea580c]">□</span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          </section>

          {/* Resources */}
          <section id="resources" className="scroll-mt-32 space-y-6">
            <SectionHead kicker="08 · Resources" title="The resources worth your time" />
            <div className="grid gap-3 md:grid-cols-2">
              {hub.resources.map((r) => {
                const internal = r.url.startsWith('/')
                const body = (
                  <>
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-[#f5f5f5] px-2 py-0.5 font-mono text-[10px] uppercase text-[#171717]">
                        {r.kind}
                      </span>
                      {r.free && (
                        <span className="text-[10px] font-medium text-[#297a3a]">Free</span>
                      )}
                    </div>
                    <div className="mt-2 text-sm font-medium text-[#171717] group-hover:underline">
                      {r.title}
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-[#666666]">{r.why}</p>
                  </>
                )
                return internal ? (
                  <Link
                    key={r.title}
                    href={r.url}
                    className="group rounded-xl border border-[#ebebeb] bg-white p-4 hover:border-[#171717]"
                  >
                    {body}
                  </Link>
                ) : (
                  <a
                    key={r.title}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-xl border border-[#ebebeb] bg-white p-4 hover:border-[#171717]"
                  >
                    {body}
                  </a>
                )
              })}
            </div>
            <div className="flex flex-wrap gap-2">
              {hub.related.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="rounded-full border border-[#ebebeb] bg-white px-3 py-1.5 text-xs text-[#171717] hover:border-[#171717]"
                >
                  {r.label} →
                </Link>
              ))}
            </div>
          </section>

          {/* More role hubs */}
          <section className="space-y-4">
            <SectionHead kicker="More role hubs" title="Prepare for another new-age role" />
            <div className="grid gap-3 sm:grid-cols-3">
              {ROLE_HUB_LIST.filter((h) => h.slug !== hub.slug).map((h) => (
                <Link
                  key={h.slug}
                  href={`/${h.slug}`}
                  className="group rounded-xl border border-[#ebebeb] bg-white p-4 hover:border-[#171717]"
                >
                  <div className="text-sm font-medium text-[#171717] group-hover:underline">
                    {h.roleName} interview prep →
                  </div>
                  <p className="mt-1 text-xs text-[#666666]">
                    {h.questionGroups.reduce((n, g) => n + g.questions.length, 0)} questions, pay
                    data and who is hiring
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="scroll-mt-32 space-y-6">
            <SectionHead kicker="09 · FAQ" title={`${hub.roleName}: frequently asked questions`} />
            <div className="divide-y divide-[#ebebeb] overflow-hidden rounded-xl border border-[#ebebeb] bg-white">
              {hub.faqs.map((f) => (
                <details key={f.q} className="group">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-4 text-sm font-medium text-[#171717]">
                    <span>{f.q}</span>
                    <span className="font-mono text-[#999999] transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="border-t border-[#f5f5f5] px-5 py-4 text-sm leading-relaxed text-[#4d4d4d]">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </div>
    </DomainLayout>
  )
}
