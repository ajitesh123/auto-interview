import { NextRequest, NextResponse } from 'next/server'
import { resumeStoreOperations, ResumeData } from '../../../../lib/resumeStore'
import fs from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { resumeId, template, data, preview } = body

    if (!resumeId || !template || !data) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required parameters',
        },
        { status: 400 }
      )
    }

    // Load and fill the appropriate template
    let filledHTML: string
    if (template === 'lbs') {
      filledHTML = await fillLBSTemplate(data)
    } else {
      filledHTML = await fillHarvardTemplate(data)
    }

    // Return HTML for preview (DOCX generation is now handled client-side)
    return new NextResponse(filledHTML, {
      headers: {
        'Content-Type': 'text/html',
      },
    })
  } catch (error) {
    console.error('Error generating DOCX:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

async function fillHarvardTemplate(data: ResumeData): Promise<string> {
  try {
    // Load the Harvard template
    const templateResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/templates/harvard/harvard-template.html`
    )
    if (!templateResponse.ok) {
      throw new Error('Failed to load Harvard template')
    }

    let template = await templateResponse.text()

    // Load template styles
    const stylesResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/templates/harvard/style.css`
    )
    let styles = ''
    if (stylesResponse.ok) {
      styles = await stylesResponse.text()
    }

    // Replace placeholders with actual data
    const replacements = getReplacements(data)

    Object.entries(replacements).forEach(([placeholder, value]) => {
      const regex = new RegExp(`{{${placeholder}}}`, 'g')
      template = template.replace(regex, value)
    })

    // Remove empty sections
    template = removeEmptySections(template)

    // Inject styles
    if (styles) {
      template = template.replace('</head>', `<style>${styles}</style></head>`)
    }

    return template
  } catch (error) {
    console.error('Error filling template:', error)
    throw error
  }
}

function getReplacements(data: ResumeData): Record<string, string> {
  const { contact, education, experience, leadership, projects, other1, skills } = data

  // Helper function to get bullets from array - only return filled bullets
  const getBullets = (bullets: string[], maxBullets: number = 15) => {
    if (!bullets || bullets.length === 0) return []
    const filteredBullets = bullets.filter((bullet) => bullet.trim().length > 0)
    return filteredBullets.slice(0, maxBullets)
  }

  // Helper function to parse text with bold formatting for HTML
  function parseBoldTextHTML(text: string): string {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  }

  // Helper function to generate bullet HTML
  const generateBulletsHTML = (bullets: string[], prefix: string = '') => {
    const filteredBullets = getBullets(bullets)
    if (filteredBullets.length === 0) return ''

    return `<ul class="bullets">
      ${filteredBullets.map((bullet) => `<li class="bullet-item">${parseBoldTextHTML(bullet)}</li>`).join('\n      ')}
    </ul>`
  }

  // Helper function to check if a field has content
  const hasContent = (value: unknown): boolean => {
    if (!value) return false
    if (typeof value === 'string') {
      const trimmed = value.trim()
      return trimmed !== '' && trimmed !== 'undefined' && trimmed !== 'null'
    }
    if (Array.isArray(value)) {
      return value.some((item) => hasContent(item))
    }
    return Boolean(value)
  }

  // Helper function to create project title with link
  const createProjectTitle = (project: { link?: string; projectName?: string }) => {
    if (!project) return ''
    if (project.link) {
      return `<a href="${project.link}" target="_blank">${project.projectName || ''}</a>`
    }
    return project.projectName || ''
  }

  // Helper function to check if section has content
  const hasSectionContent = (section: unknown) => {
    if (Array.isArray(section)) {
      return (
        section.length > 0 &&
        section.some((item) =>
          Object.values(item).some((value) =>
            typeof value === 'string'
              ? value.trim().length > 0
              : Array.isArray(value)
                ? value.some((v) => v.trim().length > 0)
                : value
          )
        )
      )
    }
    if (section && typeof section === 'object') {
      const sectionObj = section as Record<string, unknown>
      if ('entries' in sectionObj && Array.isArray(sectionObj.entries)) {
        return (
          sectionObj.entries.length > 0 &&
          sectionObj.entries.some((entry) =>
            Object.values(entry).some((value) =>
              typeof value === 'string'
                ? value.trim().length > 0
                : Array.isArray(value)
                  ? value.some((v) => v.trim().length > 0)
                  : value
            )
          )
        )
      }
      if ('technical' in sectionObj || 'languages' in sectionObj || 'interests' in sectionObj) {
        // Skills data structure
        return Object.values(sectionObj).some((value) =>
          Array.isArray(value)
            ? value.some((v) => v.trim().length > 0)
            : typeof value === 'string'
              ? value.trim().length > 0
              : value
        )
      }
      return Object.values(section).some((value) =>
        typeof value === 'string'
          ? value.trim().length > 0
          : Array.isArray(value)
            ? value.some((v) => v.trim().length > 0)
            : value
      )
    }
    return false
  }

  // Build dynamic contact info
  const contactParts: string[] = []
  if (hasContent(contact.location)) contactParts.push(contact.location)
  if (hasContent(contact.email)) contactParts.push(contact.email)
  if (hasContent(contact.phone)) contactParts.push(contact.phone)
  if (hasContent(contact.linkedin)) contactParts.push(contact.linkedin)
  const contactInfo = contactParts.join(' • ')

  const replacements: Record<string, string> = {
    // Contact Information
    'Resume Title': `${contact.name || 'Resume'} - Resume`,
    Name: contact.name || '',
    Email: contact.email || '',
    'Phone Number': contact.phone || '',
    Location: contact.location || '',
    LinkedIn: contact.linkedin || '',
    'Contact Info': contactInfo, // Dynamic contact info with separators

    // Education Section (mapped to specific placeholders)
    Education: hasSectionContent(education) ? 'Education' : '',
    'Institution 1': education[0]?.university || '',
    'Institution Location 1': education[0]?.location || '',
    'Graduation Date 1': `${education[0]?.graduationMonth || ''} ${education[0]?.graduationYear || ''}`,
    'Degree 1': education[0]?.degree || '',
    'Major/Concentration 1': education[0]?.major || '',
    'GPA 1': education[0]?.gpa || '',
    'Education Meta 1': (() => {
      const parts: string[] = []
      if (hasContent(education[0]?.degree)) parts.push(education[0].degree)
      if (hasContent(education[0]?.major)) parts.push(education[0].major)
      if (hasContent(education[0]?.gpa)) parts.push(education[0].gpa)
      return parts.join(' — ')
    })(),
    'Institution 2': education[1]?.university || '',
    'Institution Location 2': education[1]?.location || '',
    'Graduation Date 2': `${education[1]?.graduationMonth || ''} ${education[1]?.graduationYear || ''}`,
    'Degree 2': education[1]?.degree || '',
    'Major/Concentration 2': education[1]?.major || '',
    'GPA 2': education[1]?.gpa || '',
    'Education Meta 2': (() => {
      const parts: string[] = []
      if (hasContent(education[1]?.degree)) parts.push(education[1].degree)
      if (hasContent(education[1]?.major)) parts.push(education[1].major)
      if (hasContent(education[1]?.gpa)) parts.push(education[1].gpa)
      return parts.join(' — ')
    })(),
    'Institution 3': education[2]?.university || '',
    'Institution Location 3': education[2]?.location || '',
    'Graduation Date 3': `${education[2]?.graduationMonth || ''} ${education[2]?.graduationYear || ''}`,
    'Degree 3': education[2]?.degree || '',
    'Major/Concentration 3': education[2]?.major || '',
    'GPA 3': education[2]?.gpa || '',
    'Education Meta 3': (() => {
      const parts: string[] = []
      if (hasContent(education[2]?.degree)) parts.push(education[2].degree)
      if (hasContent(education[2]?.major)) parts.push(education[2].major)
      if (hasContent(education[2]?.gpa)) parts.push(education[2].gpa)
      return parts.join(' — ')
    })(),

    // Experience Section (mapped to specific placeholders)
    Experience: hasSectionContent(experience) ? 'Experience' : '',
    'Organisation 1': experience[0]?.company || '',
    'Position Title 1': experience[0]?.jobTitle || '',
    'Organisation Location 1': experience[0]?.location || '',
    StartDate1: `${experience[0]?.startMonth || ''} ${experience[0]?.startYear || ''}`,
    EndDate1: experience[0]?.isCurrent
      ? 'Present'
      : `${experience[0]?.endMonth || ''} ${experience[0]?.endYear || ''}`,
    'Experience Date 1': (() => {
      const startDate =
        `${experience[0]?.startMonth || ''} ${experience[0]?.startYear || ''}`.trim()
      const endDate = experience[0]?.isCurrent
        ? 'Present'
        : `${experience[0]?.endMonth || ''} ${experience[0]?.endYear || ''}`.trim()
      if (hasContent(startDate) && hasContent(endDate)) {
        return `${startDate} – ${endDate}`
      } else if (hasContent(startDate)) {
        return startDate
      } else if (hasContent(endDate)) {
        return endDate
      }
      return ''
    })(),
    'Experience Bullets 1': generateBulletsHTML(experience[0]?.bullets || []),
    'Organisation 2': experience[1]?.company || '',
    'Position Title 2': experience[1]?.jobTitle || '',
    'Organisation Location 2': experience[1]?.location || '',
    StartDate2: `${experience[1]?.startMonth || ''} ${experience[1]?.startYear || ''}`,
    EndDate2: experience[1]?.isCurrent
      ? 'Present'
      : `${experience[1]?.endMonth || ''} ${experience[1]?.endYear || ''}`,
    'Experience Date 2': (() => {
      const startDate =
        `${experience[1]?.startMonth || ''} ${experience[1]?.startYear || ''}`.trim()
      const endDate = experience[1]?.isCurrent
        ? 'Present'
        : `${experience[1]?.endMonth || ''} ${experience[1]?.endYear || ''}`.trim()
      if (hasContent(startDate) && hasContent(endDate)) {
        return `${startDate} – ${endDate}`
      } else if (hasContent(startDate)) {
        return startDate
      } else if (hasContent(endDate)) {
        return endDate
      }
      return ''
    })(),
    'Experience Bullets 2': generateBulletsHTML(experience[1]?.bullets || []),
    'Experience 3': hasSectionContent(experience[2]) ? 'Experience' : '',
    'Organisation 3': experience[2]?.company || '',
    'Position Title 3': experience[2]?.jobTitle || '',
    'Organisation Location 3': experience[2]?.location || '',
    StartDate3: `${experience[2]?.startMonth || ''} ${experience[2]?.startYear || ''}`,
    EndDate3: experience[2]?.isCurrent
      ? 'Present'
      : `${experience[2]?.endMonth || ''} ${experience[2]?.endYear || ''}`,
    'Experience Date 3': (() => {
      const startDate =
        `${experience[2]?.startMonth || ''} ${experience[2]?.startYear || ''}`.trim()
      const endDate = experience[2]?.isCurrent
        ? 'Present'
        : `${experience[2]?.endMonth || ''} ${experience[2]?.endYear || ''}`.trim()
      if (hasContent(startDate) && hasContent(endDate)) {
        return `${startDate} – ${endDate}`
      } else if (hasContent(startDate)) {
        return startDate
      } else if (hasContent(endDate)) {
        return endDate
      }
      return ''
    })(),
    'Experience Bullets 3': generateBulletsHTML(experience[2]?.bullets || []),

    // Leadership Section (mapped to specific placeholders)
    'Leadership & Activities': hasSectionContent(leadership) ? 'Leadership & Activities' : '',
    'Organization / Club L': leadership[0]?.organization || '',
    'Role L': leadership[0]?.title || '',
    'Organisation Location L': leadership[0]?.location || '',
    StartDateL: `${leadership[0]?.startMonth || ''} ${leadership[0]?.startYear || ''}`,
    EndDateL: leadership[0]?.isCurrent
      ? 'Present'
      : `${leadership[0]?.endMonth || ''} ${leadership[0]?.endYear || ''}`,
    'Leadership Bullets': generateBulletsHTML(leadership[0]?.bullets || []),

    // Second Leadership Entry
    'Organization / Club L2': leadership[1]?.organization || '',
    'Role L2': leadership[1]?.title || '',
    'Organisation Location L2': leadership[1]?.location || '',
    StartDateL2: `${leadership[1]?.startMonth || ''} ${leadership[1]?.startYear || ''}`,
    EndDateL2: leadership[1]?.isCurrent
      ? 'Present'
      : `${leadership[1]?.endMonth || ''} ${leadership[1]?.endYear || ''}`,
    'Leadership Bullets 2': generateBulletsHTML(leadership[1]?.bullets || []),

    // Projects Section (mapped to specific placeholders)
    Projects: hasSectionContent(projects) ? 'Projects' : '',
    'Project 1 Title': createProjectTitle(projects[0]),
    'Project 1 Bullets': generateBulletsHTML(projects[0]?.bullets || []),
    'Project 2 Title': createProjectTitle(projects[1]),
    'Project 2 Bullets': generateBulletsHTML(projects[1]?.bullets || []),

    // Other Section (mapped to specific placeholders)
    'Other (1)': hasSectionContent(other1) ? other1.sectionTitle || 'Other' : '',
    'Other1 Bullet 1': other1.entries[0]?.title || '',
    'Other1 Bullet 2': other1.entries[1]?.title || '',
    'Other1 Bullet 3': other1.entries[2]?.title || '',
    'Other1 Bullet 4': other1.entries[3]?.title || '',
    'Other1 Bullet 5': other1.entries[4]?.title || '',

    // Skills Section (mapped to specific placeholders)
    'Skills & Interests': hasSectionContent(skills) ? 'Skills & Interests' : '',
    Technical: skills.technical.some((skill) => skill.trim() !== '') ? 'Technical' : '',
    'Tech Skill 1': skills.technical[0] || '',
    'Tech Skill 2': skills.technical[1] || '',
    'Tech Skill 3': skills.technical[2] || '',
    'Tech Skill 4': skills.technical[3] || '',
    'Technical Skills': (() => {
      const techSkills = skills.technical.filter((skill) => hasContent(skill))
      return techSkills.length > 0 ? `Technical: ${techSkills.join(', ')}` : ''
    })(),
    Languages: skills.languages.some((skill) => skill.trim() !== '') ? 'Languages' : '',
    'Language 1': skills.languages[0] || '',
    'Language 2': skills.languages[1] || '',
    'Language Skills': (() => {
      const languages = skills.languages.filter((skill) => hasContent(skill))
      return languages.length > 0 ? `Languages: ${languages.join(', ')}` : ''
    })(),
    Interests: skills.interests.some((skill) => skill.trim() !== '') ? 'Interests' : '',
    'Interest 1': skills.interests[0] || '',
    'Interest 2': skills.interests[1] || '',
    'Interest 3': skills.interests[2] || '',
    'Interest Skills': (() => {
      const interests = skills.interests.filter((skill) => hasContent(skill))
      return interests.length > 0 ? `Interests: ${interests.join(', ')}` : ''
    })(),
  }

  return replacements
}

function removeEmptySections(html: string): string {
  // Remove sections that have empty headings or no content
  const sectionRegex = /<section[^>]*>[\s\S]*?<\/section>/g
  let processedHtml = html.replace(sectionRegex, (section) => {
    // Check if the section has an empty heading (only whitespace or empty)
    const headingMatch = section.match(/<h2[^>]*>(.*?)<\/h2>/)
    if (headingMatch) {
      const headingText = headingMatch[1].trim()
      if (!headingText || headingText === '') {
        return '' // Remove the entire section
      }
    }

    // Also check for sections with only empty list items
    const listItems = section.match(/<li[^>]*>(.*?)<\/li>/g)
    if (listItems) {
      const hasContent = listItems.some((item) => {
        const content = item.replace(/<[^>]*>/g, '').trim()
        return content.length > 0
      })
      if (!hasContent) {
        return '' // Remove section with only empty list items
      }
    }

    return section
  })

  // Remove empty individual entries (like education-2, experience-2, leadership-2, etc.)
  const entryRegex = /<div class="entry"[^>]*id="[^"]*"[^>]*>[\s\S]*?<\/div>/g
  processedHtml = processedHtml.replace(entryRegex, (entry) => {
    // Check if the entry has any meaningful content
    const content = entry.replace(/<[^>]*>/g, '').trim()
    if (!content || content === '') {
      return '' // Remove empty entries
    }
    return entry
  })

  return processedHtml
}

// Function to fill LBS template
async function fillLBSTemplate(data: ResumeData): Promise<string> {
  try {
    const templatePath = path.join(
      process.cwd(),
      'public',
      'templates',
      'Harvard',
      'LBS',
      'LBS-Template.html'
    )
    const template = fs.readFileSync(templatePath, 'utf-8')

    const replacements = getLBSReplacements(data)

    let filledTemplate = template
    Object.entries(replacements).forEach(([placeholder, value]) => {
      filledTemplate = filledTemplate.replace(new RegExp(`{{${placeholder}}}`, 'g'), value)
    })

    // Remove empty sections and entries
    filledTemplate = removeEmptyLBSSections(filledTemplate)

    return filledTemplate
  } catch (error) {
    console.error('Error filling LBS template:', error)
    throw error
  }
}

// Function to get LBS template replacements
function getLBSReplacements(data: ResumeData): Record<string, string> {
  const { contact, education, experience, leadership, skills } = data

  // Helper function to parse text with bold formatting for HTML
  function parseBoldTextHTML(text: string): string {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  }

  // Helper function to generate bullets HTML
  const generateBulletsHTML = (bullets: string[]): string => {
    if (!bullets || bullets.length === 0) return ''
    return bullets.map((bullet) => `<li>${parseBoldTextHTML(bullet)}</li>`).join('\n            ')
  }

  // Helper function to format date range
  const formatDateRange = (
    startMonth: string,
    startYear: string,
    endMonth: string,
    endYear: string,
    isCurrent: boolean
  ): string => {
    const start = startYear ? startYear : ''
    const end = isCurrent ? 'Present' : endYear ? endYear : ''
    return start && end ? `${start} - ${end}` : start || end
  }

  return {
    // Contact Information
    Name: contact.name || '',
    Email: contact.email || '',
    Phone: contact.phone || '',
    LinkedIn: contact.linkedin || '',

    // Education (up to 4 entries) - Add later year (till 2030)
    Education1_StartYear: education[0]?.graduationYear || '',
    Education1_EndYear: education[0]?.graduationYear
      ? `${education[0].graduationYear} – 2030`
      : '2030',
    Education1_Institution: education[0]?.university || '',
    Education1_Degree: education[0]?.degree || '',

    Education2_StartYear: education[1]?.graduationYear || '',
    Education2_EndYear: education[1]?.graduationYear
      ? `${education[1].graduationYear} – 2030`
      : '2030',
    Education2_Institution: education[1]?.university || '',
    Education2_Degree: education[1]?.degree || '',
    Education2_Honours: education[1]?.major || '',

    Education3_StartYear: education[2]?.graduationYear || '',
    Education3_EndYear: education[2]?.graduationYear
      ? `${education[2].graduationYear} – 2030`
      : '2030',
    Education3_Institution: education[2]?.university || '',
    Education3_Degree: education[2]?.degree || '',
    Education3_Honours: education[2]?.major || '',

    Education4_StartYear: education[3]?.graduationYear || '',
    Education4_EndYear: education[3]?.graduationYear
      ? `${education[3].graduationYear} – 2030`
      : '2030',
    Education4_Institution: education[3]?.university || '',
    Education4_Degree: education[3]?.degree || '',
    Education4_Honours: education[3]?.major || '',

    // Experience (up to 3 entries)
    Experience1_StartYear: experience[0]?.startYear || '',
    Experience1_EndYear: experience[0]?.endYear || '',
    Organisation1: experience[0]?.company || '',
    Organisation1_Description: experience[0]?.location || '',
    Role1: experience[0]?.jobTitle || '',
    Experience1_Bullets: generateBulletsHTML(experience[0]?.bullets),

    Experience2_StartYear: experience[1]?.startYear || '',
    Experience2_EndYear: experience[1]?.endYear || '',
    Organisation2: experience[1]?.company || '',
    Organisation2_Description: experience[1]?.location || '',
    Role2: experience[1]?.jobTitle || '',
    Experience2_Bullets: generateBulletsHTML(experience[1]?.bullets),

    Experience3_StartYear: experience[2]?.startYear || '',
    Experience3_EndYear: experience[2]?.endYear || '',
    Organisation3: experience[2]?.company || '',
    Organisation3_Description: experience[2]?.location || '',
    Role3: experience[2]?.jobTitle || '',
    Experience3_Bullets: generateBulletsHTML(experience[2]?.bullets),

    // Leadership & Activities (up to 2 entries)
    Leadership1_StartYear: leadership[0]?.startYear || '',
    Leadership1_EndYear: leadership[0]?.endYear || '',
    Leadership1_Organisation: leadership[0]?.organization || '',
    Leadership1_Location: leadership[0]?.location || '',
    Leadership1_Role: leadership[0]?.title || '',
    Leadership1_Bullets: generateBulletsHTML(leadership[0]?.bullets),

    Leadership2_StartYear: leadership[1]?.startYear || '',
    Leadership2_EndYear: leadership[1]?.endYear || '',
    Leadership2_Organisation: leadership[1]?.organization || '',
    Leadership2_Location: leadership[1]?.location || '',
    Leadership2_Role: leadership[1]?.title || '',
    Leadership2_Bullets: generateBulletsHTML(leadership[1]?.bullets),

    // Projects (up to 2 entries)
    Project1_Name: data.projects?.[0]?.projectName || '',
    Project1_Bullets: generateBulletsHTML(data.projects?.[0]?.bullets),

    Project2_Name: data.projects?.[1]?.projectName || '',
    Project2_Bullets: generateBulletsHTML(data.projects?.[1]?.bullets),

    // Skills
    TechnicalSkills: skills.technical?.join(', ') || '',
    Languages: skills.languages?.join(', ') || '',
  }
}

// Function to remove empty sections from LBS template
function removeEmptyLBSSections(html: string): string {
  console.log('Starting removeEmptyLBSSections with HTML length:', html.length)

  // Remove entries that contain only empty placeholders or empty content
  // This handles cases where placeholders are replaced with empty strings

  let processedHtml = html

  // Remove education entries that have empty content
  processedHtml = processedHtml.replace(
    /<div class="education-entry">\s*<div class="date-range">\s*–\s*<\/div>\s*<div class="degree-title">\s*<br>\s*, <span class="degree-details"><\/span><\/div>\s*<\/div>/g,
    ''
  )

  // Remove leadership entries that have empty content
  processedHtml = processedHtml.replace(
    /<div class="experience-entry">\s*<div class="date-range">\s*-\s*<\/div>\s*<div class="company-description">\s*<div class="company-name">, <\/div>\s*<div class="job-title"><\/div>\s*<\/div>\s*<\/div>/g,
    ''
  )

  // Remove project entries that have empty content
  processedHtml = processedHtml.replace(
    /<div class="experience-entry">\s*<div class="date-range"><\/div>\s*<div class="company-description">\s*<div class="company-name"><\/div>\s*<\/div>\s*<\/div>/g,
    ''
  )

  // Also remove entries that still contain placeholder patterns (in case they weren't replaced)
  processedHtml = processedHtml.replace(
    /<div class="education-entry">[\s\S]*?{{Education[34]_[^}]+}}[\s\S]*?<\/div>/g,
    ''
  )
  processedHtml = processedHtml.replace(
    /<div class="experience-entry">[\s\S]*?{{Leadership2_[^}]+}}[\s\S]*?<\/div>/g,
    ''
  )
  processedHtml = processedHtml.replace(
    /<div class="experience-entry">[\s\S]*?{{Project2_[^}]+}}[\s\S]*?<\/div>/g,
    ''
  )

  // Remove empty Technical Skills section
  processedHtml = processedHtml.replace(
    /<div class="footer-info">\s*<p>Technical Skills: <\/p>\s*<\/div>/g,
    ''
  )

  // Remove empty Languages section
  processedHtml = processedHtml.replace(
    /<div class="footer-info">\s*<p>Languages: <\/p>\s*<\/div>/g,
    ''
  )

  console.log('Finished removeEmptyLBSSections')
  return processedHtml
}
