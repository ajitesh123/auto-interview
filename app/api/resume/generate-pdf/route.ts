import { NextRequest, NextResponse } from 'next/server'
import { resumeStoreOperations, ResumeData } from '../../../../lib/resumeStore'
import * as htmlDocx from 'html-docx-js'

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

    // Load and fill the Harvard template
    const filledHTML = await fillHarvardTemplate(data)

    // If preview is requested, return HTML
    if (preview) {
      return new NextResponse(filledHTML, {
        headers: {
          'Content-Type': 'text/html',
        },
      })
    }

    // Convert HTML to DOCX
    const docxBuffer = htmlDocx.asBlob(filledHTML)

    // Return DOCX content
    return new NextResponse(docxBuffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': 'attachment; filename="resume.docx"',
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
  const { contact, education, experience, leadership, projects, other1, other2 } = data

  return {
    // Contact Information
    'Resume Title': `${contact.name || 'Resume'} - Resume`,
    Name: contact.name || '',
    Email: contact.email || '',
    'Phone Number': contact.phone || '',
    Location: contact.location || '',
    LinkedIn: contact.linkedin || '',

    // Education Section
    Education: 'Education',
    'Institution 1': education[0]?.university || '',
    'Institution Location 1': education[0]?.location || '',
    'Graduation Date 1': `${education[0]?.graduationMonth || ''} ${education[0]?.graduationYear || ''}`,
    'Degree 1': education[0]?.degree || '',
    'Major/Concentration 1': education[0]?.major || '',
    'GPA 1': education[0]?.gpa || '',

    'Institution 2': education[1]?.university || '',
    'Institution Location 2': education[1]?.location || '',
    'Graduation Date 2': `${education[1]?.graduationMonth || ''} ${education[1]?.graduationYear || ''}`,
    'Degree 2': education[1]?.degree || '',
    'Major/Concentration 2': education[1]?.major || '',
    'GPA 2': education[1]?.gpa || '',

    'Institution 3': education[2]?.university || '',
    'Institution Location 3': education[2]?.location || '',
    'Graduation Date 3': `${education[2]?.graduationMonth || ''} ${education[2]?.graduationYear || ''}`,
    'Degree 3': education[2]?.degree || '',
    'Major/Concentration 3': education[2]?.major || '',
    'GPA 3': education[2]?.gpa || '',

    // Experience Section
    Experience: 'Experience',
    'Organisation 1': experience[0]?.company || '',
    'Position Title 1': experience[0]?.jobTitle || '',
    'Organisation Location 1': experience[0]?.location || '',
    StartDate1: `${experience[0]?.startMonth || ''} ${experience[0]?.startYear || ''}`,
    EndDate1: experience[0]?.isCurrent
      ? 'Present'
      : `${experience[0]?.endMonth || ''} ${experience[0]?.endYear || ''}`,
    'Bullet 1.1': experience[0]?.responsibilities
      ? experience[0].responsibilities.split('\n')[0]?.replace(/^[-•]\s*/, '') || ''
      : '',
    'Bullet 1.2': experience[0]?.responsibilities
      ? experience[0].responsibilities.split('\n')[1]?.replace(/^[-•]\s*/, '') || ''
      : '',
    'Bullet 1.3': experience[0]?.responsibilities
      ? experience[0].responsibilities.split('\n')[2]?.replace(/^[-•]\s*/, '') || ''
      : '',

    'Organisation 2': experience[1]?.company || '',
    'Position Title 2': experience[1]?.jobTitle || '',
    'Organisation Location 2': experience[1]?.location || '',
    StartDate2: `${experience[1]?.startMonth || ''} ${experience[1]?.startYear || ''}`,
    EndDate2: experience[1]?.isCurrent
      ? 'Present'
      : `${experience[1]?.endMonth || ''} ${experience[1]?.endYear || ''}`,
    'Bullet 2.1': experience[1]?.responsibilities
      ? experience[1].responsibilities.split('\n')[0]?.replace(/^[-•]\s*/, '') || ''
      : '',
    'Bullet 2.2': experience[1]?.responsibilities
      ? experience[1].responsibilities.split('\n')[1]?.replace(/^[-•]\s*/, '') || ''
      : '',

    // Leadership Section
    'Leadership & Activities': 'Leadership & Activities',
    'Organization / Club L': leadership[0]?.organization || '',
    'Role L': leadership[0]?.title || '',
    'Organisation Location L': leadership[0]?.location || '',
    StartDateL: `${leadership[0]?.startMonth || ''} ${leadership[0]?.startYear || ''}`,
    EndDateL: leadership[0]?.isCurrent
      ? 'Present'
      : `${leadership[0]?.endMonth || ''} ${leadership[0]?.endYear || ''}`,
    'Leadership Bullet 1': leadership[0]?.description
      ? leadership[0].description.split('\n')[0]?.replace(/^[-•]\s*/, '') || ''
      : '',
    'Leadership Bullet 2': leadership[0]?.description
      ? leadership[0].description.split('\n')[1]?.replace(/^[-•]\s*/, '') || ''
      : '',

    // Projects Section
    Projects: 'Projects',
    'Project 1': projects[0]?.projectName || '',
    'Project 2': projects[1]?.projectName || '',

    // Other Section
    'Other (1)': other1.sectionTitle || 'Other',
    'Other1 Bullet 1': other1.entries[0]?.title || '',
    'Other1 Bullet 2': other1.entries[1]?.title || '',

    // Skills Section
    'Skills & Interests': 'Skills & Interests',
    Technical: 'Technical',
    'Tech Skill 1': projects[0]?.technologies?.split(',')[0]?.trim() || '',
    'Tech Skill 2': projects[0]?.technologies?.split(',')[1]?.trim() || '',
    'Tech Skill 3': projects[1]?.technologies?.split(',')[0]?.trim() || '',
    'Tech Skill 4': projects[1]?.technologies?.split(',')[1]?.trim() || '',
    Languages: 'Languages',
    'Language 1': 'English',
    'Language 2': 'Spanish',
    Interests: 'Interests',
    'Interest 1': 'Technology',
    'Interest 2': 'Innovation',
    'Interest 3': 'Leadership',
  }
}
