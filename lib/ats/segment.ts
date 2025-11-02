export interface SegmentedResume {
  contact: {
    name?: string
    email?: string
    phone?: string
    linkedin?: string
    location?: string
  }
  summary?: string
  experience: Array<{
    header?: string
    role?: string
    company?: string
    dates?: string
    location?: string
    bullets: string[]
  }>
  skills: string[]
  education: Array<{
    school?: string
    degree?: string
    dates?: string
    location?: string
  }>
  bullets: string[]
  rawText: string
}

function normalize(text: string): string {
  return text
    .replace(/\u00A0/g, ' ')
    .replace(/[\t\r]+/g, ' ')
    .replace(/[ ]{2,}/g, ' ')
}

export function segmentResume(inputText: string): SegmentedResume {
  const text = normalize(inputText)
  const lower = text.toLowerCase()

  // Contact
  const emailMatch = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)
  const phoneMatch = text.match(/(\+\d{1,3}[\s-]?)?(\(?\d{3}\)?[\s-]?)?\d{3}[\s-]?\d{4}/)
  const linkedinMatch = text.match(/https?:\/\/(www\.)?linkedin\.com\/[A-Za-z0-9_\-/.]+/i)
  const locationMatch = text.match(
    /\b([A-Z][a-zA-Z]+(?:\s*,\s*[A-Z][a-zA-Z]+)?(?:\s*,\s*[A-Z]{2})?)\b/
  )

  // Section splitting by common headings
  const headingRegex =
    /^\s*(experience|work experience|professional experience|education|skills|projects|summary|profile|objective)\s*:?\s*$/gim
  const lines = text.split(/\n+/)
  const sections: Record<string, { start: number; end: number }> = {}

  let lastHeading: { key: string; idx: number } | null = null
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const m = line.match(
      /^(experience|work experience|professional experience|education|skills|projects|summary|profile|objective)\b/i
    )
    if (m) {
      const key = m[1]
        .toLowerCase()
        .replace('work experience', 'experience')
        .replace('professional experience', 'experience')
        .replace('profile', 'summary')
        .replace('objective', 'summary')
      if (lastHeading) {
        sections[lastHeading.key] = { start: lastHeading.idx + 1, end: i }
      }
      lastHeading = { key, idx: i }
    }
  }
  if (lastHeading) {
    sections[lastHeading.key] = { start: lastHeading.idx + 1, end: lines.length }
  }

  // Summary
  const summaryRange = sections['summary']
  const summary = summaryRange
    ? lines
        .slice(summaryRange.start, Math.min(summaryRange.end, summaryRange.start + 6))
        .join('\n')
        .trim()
    : undefined

  // Skills
  const skillsRange = sections['skills']
  let skills: string[] = []
  if (skillsRange) {
    const skillsText = lines.slice(skillsRange.start, skillsRange.end).join(' ')
    skills = skillsText
      .split(/[•\-\u2022,;\n]/)
      .map((s) => s.trim())
      .filter((s) => s.length > 1 && s.length <= 60)
  }

  // Education (coarse)
  const educationRange = sections['education']
  const education: SegmentedResume['education'] = []
  if (educationRange) {
    const eduLines = lines.slice(educationRange.start, educationRange.end)
    let buffer: string[] = []
    const flush = () => {
      if (buffer.length === 0) return
      const block = buffer.join(' ')
      education.push({
        school: block.match(/([A-Z][A-Za-z&.'\- ]+University|College|Institute|School)/i)?.[0],
        degree: block.match(
          /(B\.?Sc\.?|B\.?E\.?|B\.?Tech\.?|M\.?Sc\.?|M\.?E\.?|M\.?Tech\.?|MBA|Ph\.?D\.?|Bachelor|Master|Doctor)/i
        )?.[0],
        dates: block.match(
          /(\b\d{2}\/\d{4}\b|\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{4}\b)/i
        )?.[0],
      })
      buffer = []
    }
    for (const l of eduLines) {
      if (/^\s*$/.test(l)) {
        flush()
        continue
      }
      buffer.push(l.trim())
    }
    flush()
  }

  // Experience (coarse) and bullets - handle multi-line bullets
  const experienceRange = sections['experience']
  const experience: SegmentedResume['experience'] = []
  const allBullets: string[] = []
  if (experienceRange) {
    const expLines = lines.slice(experienceRange.start, experienceRange.end)
    let current: { header?: string; bullets: string[] } | null = null
    let currentBullet: string | null = null
    const isHeader = (l: string) =>
      /\b(\d{2}\/\d{4}|\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{4}\b)/i.test(
        l
      ) || /@| at /.test(l)
    const isBullet = (l: string) =>
      /^\s*(?:[-•\u2022\u25E6\u25AA\u2666\u25CF]|\d+\.|\d+\))/i.test(l)
    const isEmpty = (l: string) => /^\s*$/.test(l)

    for (let i = 0; i < expLines.length; i++) {
      const l = expLines[i]
      if (isHeader(l)) {
        // Finish current bullet if any
        if (currentBullet) {
          current ??= { bullets: [] }
          current.bullets.push(currentBullet.trim())
          allBullets.push(currentBullet.trim())
          currentBullet = null
        }
        if (current) experience.push({ header: current.header, bullets: current.bullets })
        current = { header: l.trim(), bullets: [] }
        continue
      }
      if (isBullet(l)) {
        // Finish previous bullet
        if (currentBullet) {
          current ??= { bullets: [] }
          current.bullets.push(currentBullet.trim())
          allBullets.push(currentBullet.trim())
        }
        // Start new bullet
        currentBullet = l
          .replace(/^\s*(?:[-•\u2022\u25E6\u25AA\u2666\u25CF]|\d+\.|\d+\))\s*/, '')
          .trim()
        continue
      }
      if (currentBullet && !isEmpty(l)) {
        // Continuation of current bullet (no bullet marker, not empty)
        currentBullet += ' ' + l.trim()
        continue
      }
      if (isEmpty(l) && currentBullet) {
        // Empty line after bullet - finish it
        current ??= { bullets: [] }
        current.bullets.push(currentBullet.trim())
        allBullets.push(currentBullet.trim())
        currentBullet = null
      }
    }
    // Finish any remaining bullet
    if (currentBullet) {
      current ??= { bullets: [] }
      current.bullets.push(currentBullet.trim())
      allBullets.push(currentBullet.trim())
    }
    if (current) experience.push({ header: current.header, bullets: current.bullets })
  }

  // Fallback bullets (global) if needed - also handle multi-line
  if (allBullets.length === 0) {
    const allLines = text.split(/\n/)
    let fallbackBullet: string | null = null
    for (let i = 0; i < allLines.length; i++) {
      const l = allLines[i]
      const isBulletStart = /^\s*(?:[-•\u2022\u25E6\u25AA\u2666\u25CF]|\d+\.|\d+\))/i.test(l)
      const isEmpty = /^\s*$/.test(l)

      if (isBulletStart) {
        if (fallbackBullet) {
          allBullets.push(fallbackBullet.trim())
        }
        fallbackBullet = l
          .replace(/^\s*(?:[-•\u2022\u25E6\u25AA\u2666\u25CF]|\d+\.|\d+\))\s*/, '')
          .trim()
      } else if (fallbackBullet && !isEmpty) {
        fallbackBullet += ' ' + l.trim()
      } else if (isEmpty && fallbackBullet) {
        allBullets.push(fallbackBullet.trim())
        fallbackBullet = null
      }
    }
    if (fallbackBullet) {
      allBullets.push(fallbackBullet.trim())
    }
  }

  const contact = {
    email: emailMatch?.[0],
    phone: phoneMatch?.[0],
    linkedin: linkedinMatch?.[0],
    location: locationMatch?.[0],
  }

  return {
    contact,
    summary,
    experience,
    skills,
    education,
    bullets: allBullets,
    rawText: text,
  }
}
