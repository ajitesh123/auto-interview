import { NextRequest, NextResponse } from 'next/server'
import { resumeStoreOperations, ResumeData } from '../../../../lib/resumeStore'
import fs from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { resumeId, template, data, preview } = body

    console.log('Skills data received:', JSON.stringify(data.skills, null, 2))

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
    } else if (template === 'stanford') {
      filledHTML = await fillStanfordTemplate(data)
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
    // Load the Harvard template from file system
    const templatePath = path.join(process.cwd(), 'public/templates/Harvard/harvard-template.html')
    let template = fs.readFileSync(templatePath, 'utf-8')

    // Load template styles from file system
    const stylesPath = path.join(process.cwd(), 'public/templates/Harvard/style.css')
    const styles = fs.readFileSync(stylesPath, 'utf-8')

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
  const { contact, education, experience, leadership, projects, certifications, skills } = data

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

    const listItems = filteredBullets
      .map((bullet) => `<li class="bullet-item">${parseBoldTextHTML(bullet)}</li>`)
      .join('\n            ')
    return `<ul class="bullets">\n            ${listItems}\n          </ul>`
  }

  // Helper function to generate bullet HTML for Harvard template (without ul wrapper)
  const generateBulletsHTMLForHarvard = (bullets: string[]) => {
    const filteredBullets = getBullets(bullets)
    if (filteredBullets.length === 0) return ''

    return filteredBullets
      .map((bullet) => `<li class="bullet-item">${parseBoldTextHTML(bullet)}</li>`)
      .join('\n            ')
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
      return section.length > 0
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

    // Projects Section (using template placeholders)
    Projects: hasSectionContent(projects) ? 'Projects' : '',
    'Project 1 Title': projects[0]?.projectName || '',
    'Project 1 Bullets': generateBulletsHTML(projects[0]?.bullets || []),
    'Project 2 Title': projects[1]?.projectName || '',
    'Project 2 Bullets': generateBulletsHTML(projects[1]?.bullets || []),

    // Certifications Section (using template placeholders)
    Certifications:
      certifications.bullets && certifications.bullets.some((bullet) => bullet.trim())
        ? 'Certifications'
        : '',
    Certifications_Bullets: generateBulletsHTML(certifications.bullets || []),

    // Skills Section (using template placeholders)
    'Skills & Interests': hasSectionContent(skills) ? 'Skills & Interests' : '',
    'Technical Skills': (() => {
      const techSkills = skills.technical.filter((skill) => hasContent(skill))
      return techSkills.length > 0
        ? `<strong>Technical Skills:</strong> ${techSkills.join(', ')}`
        : ''
    })(),
    'Language Skills': (() => {
      const languageSkills = skills.languages.filter((skill) => hasContent(skill))
      return languageSkills.length > 0
        ? `<strong>Languages:</strong> ${languageSkills.join(', ')}`
        : ''
    })(),
    'Interest Skills': (() => {
      const interestSkills = skills.interests.filter((skill) => hasContent(skill))
      return interestSkills.length > 0
        ? `<strong>Interests:</strong> ${interestSkills.join(', ')}`
        : ''
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
    filledTemplate = removeEmptyLBSSections(filledTemplate, data)

    return filledTemplate
  } catch (error) {
    console.error('Error filling LBS template:', error)
    throw error
  }
}

// Function to get LBS template replacements
function getLBSReplacements(data: ResumeData): Record<string, string> {
  const { contact, education, experience, leadership, projects, certifications, skills } = data

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

  // Helper function to format education completion date
  const formatEducationCompletionDate = (
    graduationMonth: string,
    graduationYear: string
  ): string => {
    if (!graduationYear) return ''

    // Convert month name to number
    const monthMap: { [key: string]: string } = {
      January: '01',
      February: '02',
      March: '03',
      April: '04',
      May: '05',
      June: '06',
      July: '07',
      August: '08',
      September: '09',
      October: '10',
      November: '11',
      December: '12',
    }

    const monthNumber = monthMap[graduationMonth] || '01'
    return `${monthNumber}/${graduationYear}`
  }

  return {
    // Contact Information
    Name: contact.name || '',
    Email: contact.email || '',
    Phone: contact.phone || '',
    LinkedIn: contact.linkedin || '',

    // Education (up to 4 entries) - Use completion date only
    Education1_CompletionDate: formatEducationCompletionDate(
      education[0]?.graduationMonth || '',
      education[0]?.graduationYear || ''
    ),
    Education1_Institution: education[0]?.university || '',
    Education1_Degree: education[0]?.degree || '',

    Education2_CompletionDate: formatEducationCompletionDate(
      education[1]?.graduationMonth || '',
      education[1]?.graduationYear || ''
    ),
    Education2_Institution: education[1]?.university || '',
    Education2_Degree: education[1]?.degree || '',
    Education2_Honours: education[1]?.major || '',

    Education3_CompletionDate: formatEducationCompletionDate(
      education[2]?.graduationMonth || '',
      education[2]?.graduationYear || ''
    ),
    Education3_Institution: education[2]?.university || '',
    Education3_Degree: education[2]?.degree || '',
    Education3_Honours: education[2]?.major || '',

    Education4_CompletionDate: formatEducationCompletionDate(
      education[3]?.graduationMonth || '',
      education[3]?.graduationYear || ''
    ),
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
    TechnicalSkills: (() => {
      const techSkills = skills.technical?.filter((skill) => skill.trim()) || []
      console.log('Technical skills processed:', techSkills)
      return techSkills.join(', ')
    })(),
    Languages: (() => {
      const languages = skills.languages?.filter((lang) => lang.trim()) || []
      console.log('Languages processed:', languages)
      return languages.join(', ')
    })(),
    Interests: (() => {
      const interests = skills.interests?.filter((interest) => interest.trim()) || []
      console.log('Interests processed:', interests)
      return interests.join(', ')
    })(),

    // Certifications
    Certifications: (() => {
      const certifications = data.certifications?.bullets?.filter((cert) => cert.trim()) || []
      console.log('Certifications processed:', certifications)
      return certifications.join(', ')
    })(),

    // Certifications Bullets for LBS template
    Certifications_Bullets: (() => {
      const certifications = data.certifications?.bullets?.filter((cert) => cert.trim()) || []
      return generateBulletsHTML(certifications)
    })(),
  }
}

// Function to remove empty sections from LBS template
function removeEmptyLBSSections(html: string, data: ResumeData): string {
  console.log('Starting removeEmptyLBSSections with HTML length:', html.length)

  let processedHtml = html

  // Remove education entries that have empty content - based on new MM/YYYY format
  // Pattern 1: Remove entries with empty completion date and empty degree title
  processedHtml = processedHtml.replace(
    /<div class="education-entry">\s*<div class="date-range"><\/div>\s*<div class="degree-title">\s*<br>\s*, <span class="degree-details"><\/span><\/div>\s*<\/div>/g,
    ''
  )

  // Pattern 2: Remove entries with empty degree title (just <br>, <span></span>)
  processedHtml = processedHtml.replace(
    /<div class="education-entry">[\s\S]*?<div class="degree-title">\s*<br>\s*, <span class="degree-details"><\/span><\/div>[\s\S]*?<\/div>/g,
    ''
  )

  // Pattern 3: Remove entries that still contain placeholder patterns
  processedHtml = processedHtml.replace(
    /<div class="education-entry">[\s\S]*?{{Education[34]_[^}]+}}[\s\S]*?<\/div>/g,
    ''
  )

  // Remove experience entries that have empty content
  processedHtml = processedHtml.replace(
    /<div class="experience-entry">\s*<div class="date-range">\s*-\s*<\/div>\s*<div class="company-description">\s*<div class="company-name">, <\/div>\s*<div class="job-title"><\/div>\s*<\/div>\s*<\/div>/g,
    ''
  )

  // Remove project entries that have empty content
  processedHtml = processedHtml.replace(
    /<div class="experience-entry">\s*<div class="date-range"><\/div>\s*<div class="company-description">\s*<div class="company-name"><\/div>\s*<\/div>\s*<\/div>/g,
    ''
  )

  // Remove entries that still contain placeholder patterns
  processedHtml = processedHtml.replace(
    /<div class="experience-entry">[\s\S]*?{{Leadership2_[^}]+}}[\s\S]*?<\/div>/g,
    ''
  )
  processedHtml = processedHtml.replace(
    /<div class="experience-entry">[\s\S]*?{{Project2_[^}]+}}[\s\S]*?<\/div>/g,
    ''
  )

  // Remove the entire Projects section if no projects exist
  // Check if there are any projects in the data
  const hasProjects =
    data.projects &&
    data.projects.length > 0 &&
    data.projects.some((project) => project.projectName && project.projectName.trim() !== '')

  if (!hasProjects) {
    // Remove the entire Projects section including the heading
    processedHtml = processedHtml.replace(
      /<!-- Projects Section -->[\s\S]*?<!-- Certifications Section -->/g,
      '<!-- Certifications Section -->'
    )
  }

  // Remove the entire Certifications section if no certifications exist
  const hasCertifications =
    data.certifications &&
    data.certifications.bullets &&
    data.certifications.bullets.some((bullet) => bullet.trim() !== '')

  if (!hasCertifications) {
    // Remove the entire Certifications section including the heading
    processedHtml = processedHtml.replace(
      /<!-- Certifications Section -->[\s\S]*?<!-- Footer Information -->/g,
      '<!-- Footer Information -->'
    )
  }

  // Remove empty footer sections
  processedHtml = processedHtml.replace(
    /<p><span class="footer-label">Technical Skills:<\/span> <\/p>/g,
    ''
  )
  processedHtml = processedHtml.replace(
    /<p><span class="footer-label">Languages:<\/span> <\/p>/g,
    ''
  )
  processedHtml = processedHtml.replace(
    /<p><span class="footer-label">Interests:<\/span> <\/p>/g,
    ''
  )

  // Remove empty footer-info div if all content is removed
  processedHtml = processedHtml.replace(/<div class="footer-info">\s*<\/div>/g, '')

  console.log('Finished removeEmptyLBSSections with HTML length:', processedHtml.length)
  return processedHtml
}

async function fillStanfordTemplate(data: ResumeData): Promise<string> {
  console.log('Filling Stanford template with data:', JSON.stringify(data, null, 2))

  // Load the Stanford template
  const templatePath = path.join(
    process.cwd(),
    'public/templates/Harvard/Stanford/Stanford-template.html'
  )
  const templateHTML = fs.readFileSync(templatePath, 'utf-8')

  // Get Stanford-specific replacements
  const replacements = getStanfordReplacements(data)

  // Apply replacements
  let filledHTML = templateHTML
  Object.entries(replacements).forEach(([placeholder, value]) => {
    const regex = new RegExp(`{{${placeholder}}}`, 'g')
    filledHTML = filledHTML.replace(regex, value || '')
  })

  // Remove empty sections
  filledHTML = removeEmptyStanfordSections(filledHTML, data)

  console.log('Stanford template filled successfully')
  return filledHTML
}

function getStanfordReplacements(data: ResumeData): Record<string, string> {
  const { contact, education, experience, leadership, projects, certifications, skills } = data

  // Helper function to format dates
  const formatDate = (month: string, year: string) => {
    if (!month || !year) return ''
    return `${month} ${year}`
  }

  // Helper function to generate bullets HTML
  const generateBulletsHTML = (bullets: string[]) => {
    if (!bullets || bullets.length === 0) return ''
    return bullets
      .filter((bullet) => bullet.trim())
      .map((bullet) => `<li>${bullet}</li>`)
      .join('')
  }

  return {
    // Header
    NAME: contact.name || '',
    Location: contact.location || '',
    Phone: contact.phone || '',
    Email: contact.email || '',
    LinkedIn: contact.linkedin || '',

    // Experience (4 entries)
    Organization1: experience[0]?.company || '',
    Location1: experience[0]?.location || '',
    JobTitle1: experience[0]?.jobTitle || '',
    StartMonthYear1: formatDate(experience[0]?.startMonth, experience[0]?.startYear),
    EndMonthYear1: experience[0]?.isCurrent
      ? 'Present'
      : formatDate(experience[0]?.endMonth, experience[0]?.endYear),
    'bullet1.1': experience[0]?.bullets?.[0] || '',
    'bullet1.2': experience[0]?.bullets?.[1] || '',
    'bullet1.3': experience[0]?.bullets?.[2] || '',
    'bullet1.4': experience[0]?.bullets?.[3] || '',
    'bullet1.5': experience[0]?.bullets?.[4] || '',
    'bullet1.6': experience[0]?.bullets?.[5] || '',
    'bullet1.7': experience[0]?.bullets?.[6] || '',
    'bullet1.8': experience[0]?.bullets?.[7] || '',
    'bullet1.9': experience[0]?.bullets?.[8] || '',
    'bullet1.10': experience[0]?.bullets?.[9] || '',
    'bullet1.11': experience[0]?.bullets?.[10] || '',
    'bullet1.12': experience[0]?.bullets?.[11] || '',
    'bullet1.13': experience[0]?.bullets?.[12] || '',
    'bullet1.14': experience[0]?.bullets?.[13] || '',
    'bullet1.15': experience[0]?.bullets?.[14] || '',

    Organization2: experience[1]?.company || '',
    Location2: experience[1]?.location || '',
    JobTitle2: experience[1]?.jobTitle || '',
    StartMonthYear2: formatDate(experience[1]?.startMonth, experience[1]?.startYear),
    EndMonthYear2: experience[1]?.isCurrent
      ? 'Present'
      : formatDate(experience[1]?.endMonth, experience[1]?.endYear),
    'bullet2.1': experience[1]?.bullets?.[0] || '',
    'bullet2.2': experience[1]?.bullets?.[1] || '',
    'bullet2.3': experience[1]?.bullets?.[2] || '',
    'bullet2.4': experience[1]?.bullets?.[3] || '',
    'bullet2.5': experience[1]?.bullets?.[4] || '',
    'bullet2.6': experience[1]?.bullets?.[5] || '',
    'bullet2.7': experience[1]?.bullets?.[6] || '',
    'bullet2.8': experience[1]?.bullets?.[7] || '',
    'bullet2.9': experience[1]?.bullets?.[8] || '',
    'bullet2.10': experience[1]?.bullets?.[9] || '',
    'bullet2.11': experience[1]?.bullets?.[10] || '',
    'bullet2.12': experience[1]?.bullets?.[11] || '',
    'bullet2.13': experience[1]?.bullets?.[12] || '',
    'bullet2.14': experience[1]?.bullets?.[13] || '',
    'bullet2.15': experience[1]?.bullets?.[14] || '',

    Organization3: experience[2]?.company || '',
    Location3: experience[2]?.location || '',
    JobTitle3: experience[2]?.jobTitle || '',
    StartMonthYear3: formatDate(experience[2]?.startMonth, experience[2]?.startYear),
    EndMonthYear3: experience[2]?.isCurrent
      ? 'Present'
      : formatDate(experience[2]?.endMonth, experience[2]?.endYear),
    'bullet3.1': experience[2]?.bullets?.[0] || '',
    'bullet3.2': experience[2]?.bullets?.[1] || '',
    'bullet3.3': experience[2]?.bullets?.[2] || '',
    'bullet3.4': experience[2]?.bullets?.[3] || '',
    'bullet3.5': experience[2]?.bullets?.[4] || '',
    'bullet3.6': experience[2]?.bullets?.[5] || '',
    'bullet3.7': experience[2]?.bullets?.[6] || '',
    'bullet3.8': experience[2]?.bullets?.[7] || '',
    'bullet3.9': experience[2]?.bullets?.[8] || '',
    'bullet3.10': experience[2]?.bullets?.[9] || '',
    'bullet3.11': experience[2]?.bullets?.[10] || '',
    'bullet3.12': experience[2]?.bullets?.[11] || '',
    'bullet3.13': experience[2]?.bullets?.[12] || '',
    'bullet3.14': experience[2]?.bullets?.[13] || '',
    'bullet3.15': experience[2]?.bullets?.[14] || '',

    Organization4: experience[3]?.company || '',
    Location4: experience[3]?.location || '',
    JobTitle4: experience[3]?.jobTitle || '',
    StartMonthYear4: formatDate(experience[3]?.startMonth, experience[3]?.startYear),
    EndMonthYear4: experience[3]?.isCurrent
      ? 'Present'
      : formatDate(experience[3]?.endMonth, experience[3]?.endYear),
    'bullet4.1': experience[3]?.bullets?.[0] || '',
    'bullet4.2': experience[3]?.bullets?.[1] || '',
    'bullet4.3': experience[3]?.bullets?.[2] || '',
    'bullet4.4': experience[3]?.bullets?.[3] || '',
    'bullet4.5': experience[3]?.bullets?.[4] || '',
    'bullet4.6': experience[3]?.bullets?.[5] || '',
    'bullet4.7': experience[3]?.bullets?.[6] || '',
    'bullet4.8': experience[3]?.bullets?.[7] || '',
    'bullet4.9': experience[3]?.bullets?.[8] || '',
    'bullet4.10': experience[3]?.bullets?.[9] || '',
    'bullet4.11': experience[3]?.bullets?.[10] || '',
    'bullet4.12': experience[3]?.bullets?.[11] || '',
    'bullet4.13': experience[3]?.bullets?.[12] || '',
    'bullet4.14': experience[3]?.bullets?.[13] || '',
    'bullet4.15': experience[3]?.bullets?.[14] || '',

    // Education (4 entries)
    Institute1: education[0]?.university || '',
    EduLocation1: education[0]?.location || '',
    Degree1: education[0]?.degree || '',
    Major1: education[0]?.major || '',
    GPA1: education[0]?.gpa || '',
    YearofGraduation1: formatDate(education[0]?.graduationMonth, education[0]?.graduationYear),

    Institute2: education[1]?.university || '',
    EduLocation2: education[1]?.location || '',
    Degree2: education[1]?.degree || '',
    Major2: education[1]?.major || '',
    GPA2: education[1]?.gpa || '',
    YearofGraduation2: formatDate(education[1]?.graduationMonth, education[1]?.graduationYear),

    Institute3: education[2]?.university || '',
    EduLocation3: education[2]?.location || '',
    Degree3: education[2]?.degree || '',
    Major3: education[2]?.major || '',
    GPA3: education[2]?.gpa || '',
    YearofGraduation3: formatDate(education[2]?.graduationMonth, education[2]?.graduationYear),

    Institute4: education[3]?.university || '',
    EduLocation4: education[3]?.location || '',
    Degree4: education[3]?.degree || '',
    Major4: education[3]?.major || '',
    GPA4: education[3]?.gpa || '',
    YearofGraduation4: formatDate(education[3]?.graduationMonth, education[3]?.graduationYear),

    // Leadership (2 entries)
    Organization_Name1: leadership[0]?.organization || '',
    LeadLocation1: leadership[0]?.location || '',
    Title1: leadership[0]?.title || '',
    LeadStartMonthYear1: formatDate(leadership[0]?.startMonth, leadership[0]?.startYear),
    LeadEndMonthYear1: leadership[0]?.isCurrent
      ? 'Present'
      : formatDate(leadership[0]?.endMonth, leadership[0]?.endYear),
    LeadBullet1: leadership[0]?.bullets?.[0] || '',
    LeadBullet2: leadership[0]?.bullets?.[1] || '',

    Organization_Name2: leadership[1]?.organization || '',
    LeadLocation2: leadership[1]?.location || '',
    Title2: leadership[1]?.title || '',
    LeadStartMonthYear2: formatDate(leadership[1]?.startMonth, leadership[1]?.startYear),
    LeadEndMonthYear2: leadership[1]?.isCurrent
      ? 'Present'
      : formatDate(leadership[1]?.endMonth, leadership[1]?.endYear),
    LeadBullet3: leadership[1]?.bullets?.[0] || '',
    LeadBullet4: leadership[1]?.bullets?.[1] || '',

    // Projects (2 entries)
    Project_Name1: projects[0]?.projectName || '',
    ProjBullet1: projects[0]?.bullets?.[0] || '',
    ProjBullet2: projects[0]?.bullets?.[1] || '',

    Project_Name2: projects[1]?.projectName || '',
    ProjBullet3: projects[1]?.bullets?.[0] || '',
    ProjBullet4: projects[1]?.bullets?.[1] || '',

    // Certifications (6 entries)
    Certification1: certifications?.bullets?.[0] || '',
    Certification2: certifications?.bullets?.[1] || '',
    Certification3: certifications?.bullets?.[2] || '',
    Certification4: certifications?.bullets?.[3] || '',
    Certification5: certifications?.bullets?.[4] || '',
    Certification6: certifications?.bullets?.[5] || '',

    // Skills (up to 6 each, with proper comma separation)
    Skill1: skills.technical?.[0] ? skills.technical[0] + (skills.technical[1] ? ', ' : '') : '',
    Skill2: skills.technical?.[1] ? skills.technical[1] + (skills.technical[2] ? ', ' : '') : '',
    Skill3: skills.technical?.[2] ? skills.technical[2] + (skills.technical[3] ? ', ' : '') : '',
    Skill4: skills.technical?.[3] ? skills.technical[3] + (skills.technical[4] ? ', ' : '') : '',
    Skill5: skills.technical?.[4] ? skills.technical[4] + (skills.technical[5] ? ', ' : '') : '',
    Skill6: skills.technical?.[5] || '',
    Language1: skills.languages?.[0] ? skills.languages[0] + (skills.languages[1] ? ', ' : '') : '',
    Language2: skills.languages?.[1] ? skills.languages[1] + (skills.languages[2] ? ', ' : '') : '',
    Language3: skills.languages?.[2] ? skills.languages[2] + (skills.languages[3] ? ', ' : '') : '',
    Language4: skills.languages?.[3] ? skills.languages[3] + (skills.languages[4] ? ', ' : '') : '',
    Language5: skills.languages?.[4] ? skills.languages[4] + (skills.languages[5] ? ', ' : '') : '',
    Language6: skills.languages?.[5] || '',
    Interest1: skills.interests?.[0] ? skills.interests[0] + (skills.interests[1] ? ', ' : '') : '',
    Interest2: skills.interests?.[1] ? skills.interests[1] + (skills.interests[2] ? ', ' : '') : '',
    Interest3: skills.interests?.[2] ? skills.interests[2] + (skills.interests[3] ? ', ' : '') : '',
    Interest4: skills.interests?.[3] ? skills.interests[3] + (skills.interests[4] ? ', ' : '') : '',
    Interest5: skills.interests?.[4] ? skills.interests[4] + (skills.interests[5] ? ', ' : '') : '',
    Interest6: skills.interests?.[5] || '',
  }
}

function removeEmptyStanfordSections(html: string, data: ResumeData): string {
  // Disable server-side dynamic content removal for now to ensure all content shows up
  // The client-side JavaScript will handle hiding empty content
  return html
}
