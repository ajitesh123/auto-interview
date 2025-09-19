import { NextRequest, NextResponse } from 'next/server'
import mammoth from 'mammoth'
import pdf from 'pdf-parse'
import { ResumeData } from '../../../../lib/resumeStore'

// Helper function to parse text and extract resume data
function parseResumeText(text: string): Partial<ResumeData> {
  const lines = text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)

  // Initialize empty resume data structure
  const parsedData: Partial<ResumeData> = {
    contact: {
      name: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      portfolio: '',
    },
    education: [],
    experience: [],
    leadership: [],
    projects: [],
    other1: {
      sectionTitle: 'Other',
      entries: [],
    },
    other2: {
      sectionTitle: 'Other',
      entries: [],
    },
  }

  // Extract contact information
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/
  const phoneRegex = /(\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})/
  const linkedinRegex = /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?/
  const portfolioRegex = /(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?/

  // Find name (usually first non-empty line or line with name-like pattern)
  const nameRegex = /^[A-Za-z\s]{2,50}$/
  for (let i = 0; i < Math.min(5, lines.length); i++) {
    if (
      nameRegex.test(lines[i]) &&
      !lines[i].toLowerCase().includes('resume') &&
      !lines[i].toLowerCase().includes('cv')
    ) {
      parsedData.contact!.name = lines[i]
      break
    }
  }

  // Extract email
  const emailMatch = text.match(emailRegex)
  if (emailMatch) {
    parsedData.contact!.email = emailMatch[0]
  }

  // Extract phone
  const phoneMatch = text.match(phoneRegex)
  if (phoneMatch) {
    parsedData.contact!.phone = phoneMatch[0]
  }

  // Extract LinkedIn
  const linkedinMatch = text.match(linkedinRegex)
  if (linkedinMatch) {
    parsedData.contact!.linkedin = linkedinMatch[0]
  }

  // Extract portfolio/website
  const portfolioMatch = text.match(portfolioRegex)
  if (portfolioMatch && !linkedinMatch?.includes(portfolioMatch[0])) {
    parsedData.contact!.portfolio = portfolioMatch[0]
  }

  // Extract location (look for city, state patterns)
  const locationRegex = /([A-Za-z\s]+,\s*[A-Za-z\s]+)/
  const locationMatch = text.match(locationRegex)
  if (locationMatch) {
    parsedData.contact!.location = locationMatch[1]
  }

  // Parse sections
  let currentSection = ''
  let currentEntry: any = {}
  let entryLines: string[] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const lowerLine = line.toLowerCase()

    // Detect section headers
    if (lowerLine.includes('education') || lowerLine.includes('academic')) {
      currentSection = 'education'
      continue
    } else if (
      lowerLine.includes('experience') ||
      lowerLine.includes('employment') ||
      lowerLine.includes('work history')
    ) {
      currentSection = 'experience'
      continue
    } else if (
      lowerLine.includes('leadership') ||
      lowerLine.includes('activities') ||
      lowerLine.includes('involvement')
    ) {
      currentSection = 'leadership'
      continue
    } else if (lowerLine.includes('project') || lowerLine.includes('portfolio')) {
      currentSection = 'projects'
      continue
    } else if (
      lowerLine.includes('skill') ||
      lowerLine.includes('technical') ||
      lowerLine.includes('competenc')
    ) {
      currentSection = 'skills'
      continue
    }

    // Process entries based on current section
    if (currentSection === 'education') {
      // Look for degree patterns
      if (
        line.match(
          /\b(Bachelor|Master|PhD|Associate|Certificate|Diploma|B\.S\.|B\.A\.|M\.S\.|M\.A\.|Ph\.D\.)/i
        )
      ) {
        if (currentEntry.degree) {
          parsedData.education!.push(currentEntry)
        }
        currentEntry = { degree: line }
        entryLines = []
      } else if (currentEntry.degree && line.match(/\b(University|College|Institute|School)\b/i)) {
        currentEntry.university = line
      } else if (currentEntry.degree && line.match(/\b(20\d{2}|19\d{2})\b/)) {
        currentEntry.graduationYear = line.match(/\b(20\d{2}|19\d{2})\b/)?.[0]
      } else if (currentEntry.degree && line.match(/\b(GPA|Grade|G\.P\.A\.)\b/i)) {
        const gpaMatch = line.match(/\b\d+\.?\d*\b/)
        if (gpaMatch) {
          currentEntry.gpa = gpaMatch[0]
        }
      }
    } else if (currentSection === 'experience') {
      // Look for job title patterns
      if (
        line.match(
          /\b(Developer|Engineer|Manager|Analyst|Consultant|Specialist|Coordinator|Director|Lead|Senior|Junior)\b/i
        )
      ) {
        if (currentEntry.jobTitle) {
          parsedData.experience!.push(currentEntry)
        }
        currentEntry = { jobTitle: line }
        entryLines = []
      } else if (currentEntry.jobTitle && line.match(/\b(Company|Corp|Inc|LLC|Ltd|Group)\b/i)) {
        currentEntry.company = line
      } else if (currentEntry.jobTitle && line.match(/\b(20\d{2}|19\d{2})\b/)) {
        const yearMatch = line.match(/\b(20\d{2}|19\d{2})\b/)
        if (yearMatch) {
          if (!currentEntry.startYear) {
            currentEntry.startYear = yearMatch[0]
          } else if (!currentEntry.endYear && !line.toLowerCase().includes('present')) {
            currentEntry.endYear = yearMatch[0]
          }
        }
        if (line.toLowerCase().includes('present')) {
          currentEntry.isCurrent = true
        }
      } else if (
        (currentEntry.jobTitle && line.startsWith('•')) ||
        line.startsWith('-') ||
        line.startsWith('*')
      ) {
        if (!currentEntry.responsibilities) {
          currentEntry.responsibilities = ''
        }
        currentEntry.responsibilities += line.replace(/^[•\-*]\s*/, '') + '\n'
      }
    } else if (currentSection === 'projects') {
      // Look for project patterns
      if (line.match(/\b(Project|App|System|Platform|Tool|Website|Application)\b/i)) {
        if (currentEntry.projectName) {
          parsedData.projects!.push(currentEntry)
        }
        currentEntry = { projectName: line }
        entryLines = []
      } else if (
        currentEntry.projectName &&
        line.match(/\b(JavaScript|Python|Java|React|Node|SQL|HTML|CSS|TypeScript|Angular|Vue)\b/i)
      ) {
        if (!currentEntry.technologies) {
          currentEntry.technologies = ''
        }
        currentEntry.technologies += line + ', '
      }
    }
  }

  // Add the last entry if it exists
  if (currentSection === 'education' && currentEntry.degree) {
    parsedData.education!.push(currentEntry)
  } else if (currentSection === 'experience' && currentEntry.jobTitle) {
    parsedData.experience!.push(currentEntry)
  } else if (currentSection === 'projects' && currentEntry.projectName) {
    parsedData.projects!.push(currentEntry)
  }

  return parsedData
}

export async function POST(request: NextRequest) {
  try {
    console.log('Upload API called')
    const formData = await request.formData()
    const file = formData.get('resume') as File

    console.log('File received:', {
      name: file?.name,
      size: file?.size,
      type: file?.type,
      exists: !!file,
    })

    if (!file) {
      console.log('No file found in request')
      return NextResponse.json(
        {
          success: false,
          message: 'No file uploaded',
        },
        { status: 400 }
      )
    }

    // Check file type
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ]

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid file type. Only PDF and Word documents are allowed.',
        },
        { status: 400 }
      )
    }

    // Check file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        {
          success: false,
          message: 'File size must be less than 10MB',
        },
        { status: 400 }
      )
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer())
    let text = ''

    // Parse based on file type
    if (file.type === 'application/pdf') {
      try {
        const pdfData = await pdf(buffer)
        text = pdfData.text
      } catch (error) {
        console.error('Error parsing PDF:', error)
        return NextResponse.json(
          {
            success: false,
            message: 'Error parsing PDF file',
          },
          { status: 500 }
        )
      }
    } else if (
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.type === 'application/msword'
    ) {
      try {
        const result = await mammoth.extractRawText({ buffer })
        text = result.value
      } catch (error) {
        console.error('Error parsing Word document:', error)
        return NextResponse.json(
          {
            success: false,
            message: 'Error parsing Word document',
          },
          { status: 500 }
        )
      }
    }

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Could not extract text from the uploaded file',
        },
        { status: 400 }
      )
    }

    // Parse the extracted text
    const parsedData = parseResumeText(text)

    return NextResponse.json({
      success: true,
      message: 'Resume parsed successfully',
      data: parsedData,
      rawText: text, // Include raw text for debugging
    })
  } catch (error) {
    console.error('Error processing resume upload:', error)
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
