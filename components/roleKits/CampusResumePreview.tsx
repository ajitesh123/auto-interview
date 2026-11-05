import { Fragment } from 'react'
import type { ResumeKit } from '@/data/roleKits/types'
import CAMPUS from '@/data/roleKits/campusResumes.json'

// On-page preview of the Word template (one-page Indian table CV). Mirrors
// scripts/resume-templates/build.js so what people see is what they download.

type Row3 = [string, string, string]
interface CampusData {
  education: string[][]
  labels: string[][]
  internship: [string, string, string, [string, string]]
  cocurricular: Row3[]
  extracurricular: Row3[]
  por: Row3[]
}

const clean = (s: string) => s.replace(/\s*\((sample|fictional)\)/gi, '').trim()
const bar = 'bg-[#BFBFBF]'
const light = 'bg-[#E7E6E6]'
const td = 'border border-black px-2 py-1 align-middle'

export default function CampusResumePreview({
  slug,
  sample,
}: {
  slug: string
  sample: ResumeKit['sample']
}) {
  const c = (CAMPUS as unknown as Record<string, CampusData>)[slug]
  if (!c) return null
  const parts = sample.contact.split(' · ')
  const rest = parts.slice(1)
  const iEmail = rest.findIndex((x) => x.includes('@'))
  rest.splice(iEmail + 1, 0, '+91 98765 XXXXX')
  const header = [clean(sample.name), ...rest, parts[0]].join('  |  ')
  const jobs = [
    ...sample.experience.map((e, i) => ({
      org: clean(e.org).replace(/,.*$/, ''),
      role: e.role,
      dates: e.dates,
      items: e.bullets.map((b, j) => [c.labels[i]?.[j] ?? '', b] as [string, string]),
    })),
    {
      org: clean(c.internship[0]),
      role: c.internship[1],
      dates: c.internship[2],
      items: [c.internship[3]],
    },
  ]
  const dated = (title: string, rows: Row3[]) => (
    <>
      <tr>
        <td colSpan={3} className={`${td} ${bar} font-bold`}>
          {title}
        </td>
      </tr>
      {rows.map(([label, text, year]) => (
        <tr key={text}>
          <td className={`${td} ${light} w-[18%] font-bold`}>{label}</td>
          <td className={td}>• {text}</td>
          <td className={`${td} w-[11%] text-center`}>{year}</td>
        </tr>
      ))}
    </>
  )

  return (
    <figure className="space-y-2">
      <div
        role="region"
        aria-label="Sample resume preview (scrolls sideways on small screens)"
        // Scrollable region must be keyboard-focusable (WCAG 2.1.1)
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        className="overflow-x-auto rounded-2xl border border-border bg-white p-4 shadow-e2 md:p-8"
      >
        <div className="min-w-[640px] font-serif text-[13px] leading-snug text-black">
          <p className="text-[11px] italic text-[#7F7F7F]">
            SAMPLE: every name, company, college and number is made up. Replace each line with your
            own.
          </p>
          <p className="mt-1 text-[16px] font-bold">{header}</p>
          <p className="mb-3 italic">{sample.headline}</p>
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                <td colSpan={4} className={`${td} ${bar} font-bold`}>
                  Educational Background
                </td>
              </tr>
              <tr className={`${light} font-bold`}>
                <td className={`${td} w-[16%]`} />
                <td className={td}>College / Board</td>
                <td className={`${td} w-[14%]`}>Marks</td>
                <td className={`${td} w-[28%]`}>Achievement</td>
              </tr>
              {c.education.map((r) => (
                <tr key={r[0]}>
                  <td className={`${td} ${light} text-center font-bold`}>{r[0]}</td>
                  <td className={td}>{r[1]}</td>
                  <td className={td}>{r[2]}</td>
                  <td className={td}>{r[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                <td colSpan={2} className={`${td} ${bar} font-bold`}>
                  Professional Experience
                </td>
              </tr>
              {jobs.map((j) => (
                <Fragment key={j.org + j.role}>
                  <tr>
                    <td colSpan={2} className={`${td} ${light} font-bold`}>
                      <span className="flex justify-between gap-3">
                        <span>{j.org}</span>
                        <span>{j.role}</span>
                        <span>({j.dates})</span>
                      </span>
                    </td>
                  </tr>
                  {j.items.map(([label, text]) => (
                    <tr key={text}>
                      <td className={`${td} ${light} w-[18%] font-bold`}>{label}</td>
                      <td className={td}>• {text}</td>
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
          <table className="w-full border-collapse">
            <tbody>
              {dated('Co-curricular and Projects', c.cocurricular)}
              {dated('Extra-Curricular Activities', c.extracurricular)}
              {dated('Positions of Responsibility', c.por)}
              <tr>
                <td colSpan={3} className={`${td} ${bar} font-bold`}>
                  Skills and Tools
                </td>
              </tr>
              <tr>
                <td className={`${td} ${light} font-bold`}>Skills</td>
                <td colSpan={2} className={td}>
                  {sample.skills.join(' · ')}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <figcaption className="text-caption text-fg-3 md:hidden">
        Swipe sideways to see the full page →
      </figcaption>
    </figure>
  )
}
