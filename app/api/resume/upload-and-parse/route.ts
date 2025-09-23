import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('resume') as File

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    console.log(`Processing file: ${file.name}, type: ${file.type}`)

    let textContent = ''

    // Extract text based on file type
    if (file.type === 'application/pdf') {
      try {
        const pdfParse = (await import('pdf-parse')).default
        const buffer = await file.arrayBuffer()
        const pdfData = await pdfParse(Buffer.from(buffer))
        textContent = pdfData.text
      } catch (error) {
        console.error('Error parsing PDF:', error)
        return NextResponse.json({ error: 'Error parsing PDF file' }, { status: 400 })
      }
    } else if (
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      try {
        const mammoth = await import('mammoth')
        const buffer = await file.arrayBuffer()
        const result = await mammoth.extractRawText({ buffer: Buffer.from(buffer) })
        textContent = result.value
      } catch (error) {
        console.error('Error parsing Word document:', error)
        return NextResponse.json({ error: 'Error parsing Word document' }, { status: 400 })
      }
    } else {
      return NextResponse.json(
        { error: 'Unsupported file type. Please upload PDF or Word document.' },
        { status: 400 }
      )
    }

    console.log('Extracted text content length:', textContent.length)

    // Parse resume using Gemini AI
    const parsedData = await parseResumeWithGemini(textContent)

    console.log('Parsed data:', JSON.stringify(parsedData, null, 2))

    return NextResponse.json({
      success: true,
      data: parsedData,
    })
  } catch (error) {
    console.error('Error processing resume:', error)
    return NextResponse.json({ error: 'Error processing resume' }, { status: 500 })
  }
}

async function parseResumeWithGemini(resumeText: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

  const prompt = `
You are an expert resume parser. Parse the following resume text and extract information into the exact JSON structure provided below.

IMPORTANT RULES:
1. If any information doesn't fit into a specific context, leave it blank - DO NOT force it
2. For dates, convert to MM/YYYY format (e.g., "January 2023" becomes "01/2023")
3. For months, use full names (January, February, etc.)
4. For bullet points, extract each as a separate string in the bullets array
5. If a field is not present or unclear, leave it as empty string or empty array
6. Generate unique IDs for each entry using timestamp + random number

Resume text:
${resumeText}

Extract into this EXACT JSON structure:
{
  "contact": {
    "name": "string",
    "email": "string",
    "phone": "string", 
    "location": "string",
    "linkedin": "string",
    "portfolio": "string"
  },
  "education": [
    {
      "id": "string",
      "degree": "string",
      "major": "string",
      "university": "string", 
      "location": "string",
      "graduationMonth": "string",
      "graduationYear": "string",
      "gpa": "string"
    }
  ],
  "experience": [
    {
      "id": "string",
      "jobTitle": "string",
      "company": "string",
      "location": "string",
      "startMonth": "string",
      "startYear": "string", 
      "endMonth": "string",
      "endYear": "string",
      "isCurrent": false,
      "bullets": ["string"]
    }
  ],
  "leadership": [
    {
      "id": "string",
      "organization": "string",
      "title": "string",
      "location": "string",
      "startMonth": "string",
      "startYear": "string",
      "endMonth": "string", 
      "endYear": "string",
      "isCurrent": false,
      "bullets": ["string"]
    }
  ],
  "projects": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "duration": "string",
      "link": "string",
      "bullets": ["string"]
    }
  ],
  "other1": {
    "sectionTitle": "Other",
    "entries": []
  },
  "skills": {
    "technical": ["string"],
    "languages": ["string"],
    "interests": ["string"]
  }
}

Return ONLY the JSON object, no additional text or formatting.
`

  try {
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Clean the response to extract just the JSON
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('No JSON found in response')
    }

    const parsedData = JSON.parse(jsonMatch[0])

    // Add unique IDs if not present
    if (parsedData.education) {
      parsedData.education = parsedData.education.map(
        (edu: Record<string, unknown>, index: number) => ({
          ...edu,
          id: edu.id || `${Date.now()}_edu_${index}`,
        })
      )
    }

    if (parsedData.experience) {
      parsedData.experience = parsedData.experience.map(
        (exp: Record<string, unknown>, index: number) => ({
          ...exp,
          id: exp.id || `${Date.now()}_exp_${index}`,
        })
      )
    }

    if (parsedData.leadership) {
      parsedData.leadership = parsedData.leadership.map(
        (lead: Record<string, unknown>, index: number) => ({
          ...lead,
          id: lead.id || `${Date.now()}_lead_${index}`,
        })
      )
    }

    if (parsedData.projects) {
      parsedData.projects = parsedData.projects.map(
        (proj: Record<string, unknown>, index: number) => ({
          ...proj,
          id: proj.id || `${Date.now()}_proj_${index}`,
        })
      )
    }

    return parsedData
  } catch (error) {
    console.error('Error with Gemini API:', error)
    throw new Error('Failed to parse resume with AI')
  }
}
