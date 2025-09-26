import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Gemini AI with embedded API key
const GEMINI_API_KEY = 'AIzaSyBzPxbFBd7imzZOlYo8JVIRNo_a6Sqwp5s'
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)
console.log('Gemini API Key configured:', !!GEMINI_API_KEY)

export async function POST(request: NextRequest) {
  try {
    console.log('=== UPLOAD-AND-PARSE API CALLED ===')
    const formData = await request.formData()
    console.log('FormData received')

    const file = formData.get('resume') as File
    console.log('File extracted from FormData:', file ? 'YES' : 'NO')

    if (!file) {
      console.log('ERROR: No file uploaded')
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    console.log(`Processing file: ${file.name}, type: ${file.type}, size: ${file.size}`)

    // Check file type more thoroughly
    const isPDF =
      file.type === 'application/pdf' ||
      file.type === 'application/x-pdf' ||
      file.name.toLowerCase().endsWith('.pdf')

    console.log('File type check:', {
      type: file.type,
      name: file.name,
      isPDF: isPDF,
      isWord:
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.type === 'application/msword',
    })

    let textContent = ''

    // Extract text based on file type
    if (isPDF) {
      try {
        console.log('Starting PDF parsing with pdf2json...')

        // Use pdf2json for reliable PDF parsing
        const PDFParser = (await import('pdf2json')).default
        const buffer = await file.arrayBuffer()
        console.log('PDF buffer size:', buffer.byteLength)

        // Create a temporary file for pdf2json
        const fs = await import('fs')
        const path = await import('path')
        const os = await import('os')

        const tempDir = os.tmpdir()
        const tempFilePath = path.join(tempDir, `temp-resume-${Date.now()}.pdf`)

        try {
          // Write buffer to temporary file
          fs.writeFileSync(tempFilePath, Buffer.from(buffer))
          console.log('Temporary file created:', tempFilePath)

          // Create PDF parser instance
          const pdfParser = new PDFParser(null, true)

          // Set up event handlers
          const parsePromise = new Promise<string>((resolve, reject) => {
            pdfParser.on('pdfParser_dataError', (errData: Error | { parserError: Error }) => {
              const errorMessage =
                errData instanceof Error ? errData.message : errData.parserError.message
              console.error('PDF parsing error:', errorMessage)
              reject(new Error(errorMessage))
            })

            pdfParser.on('pdfParser_dataReady', (pdfData: unknown) => {
              try {
                const textContent = pdfParser.getRawTextContent()
                console.log('PDF parsing successful, text length:', textContent.length)
                console.log('PDF text preview:', textContent.substring(0, 200))
                resolve(textContent)
              } catch (error) {
                reject(error)
              }
            })
          })

          // Load and parse the PDF
          pdfParser.loadPDF(tempFilePath)
          textContent = await parsePromise

          // Clean up temporary file
          fs.unlinkSync(tempFilePath)
          console.log('Temporary file cleaned up')
        } catch (tempError) {
          console.error('Temporary file approach failed:', tempError)

          // Fallback: try pdf-parse
          console.log('Trying fallback with pdf-parse...')
          const pdfParse = (await import('pdf-parse')).default
          const nodeBuffer = Buffer.from(buffer)

          const pdfData = await pdfParse(nodeBuffer, {
            max: 0,
          })
          textContent = pdfData.text
          console.log('Fallback PDF parsing successful, text length:', textContent.length)
        }
      } catch (error) {
        console.error('Error parsing PDF with pdf2json:', error)
        console.error('PDF parsing error details:', {
          message: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined,
          fileType: file.type,
          fileSize: file.size,
        })

        return NextResponse.json(
          {
            error: 'Error parsing PDF file',
            details: error instanceof Error ? error.message : String(error),
            suggestion:
              'Please try uploading a Word document (.docx) instead, or ensure the PDF is not password-protected.',
          },
          { status: 400 }
        )
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
      console.log('ERROR: Unsupported file type:', {
        type: file.type,
        name: file.name,
        isPDF: isPDF,
        isWord:
          file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
          file.type === 'application/msword',
      })
      return NextResponse.json(
        { error: `Unsupported file type: ${file.type}. Please upload PDF or Word document.` },
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
  console.log('Starting Gemini parsing with text length:', resumeText.length)

  // Use the new model (gemini-2.5-flash)
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

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
    console.log('Sending prompt to Gemini...')
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    console.log('Gemini response received, length:', text.length)

    // Clean the response to extract just the JSON
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      console.error('No JSON found in Gemini response:', text)
      throw new Error('No JSON found in response')
    }

    console.log('Parsing JSON from Gemini response...')
    const parsedData = JSON.parse(jsonMatch[0])
    console.log('JSON parsing successful')

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
    console.error('Error details:', {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    })

    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('404') || error.message.includes('not found')) {
        throw new Error(
          'Gemini API access issue: Please check that your API key has access to Gemini models and billing is set up.'
        )
      } else if (error.message.includes('API_KEY_INVALID')) {
        throw new Error('Invalid API key: Please check your Gemini API key.')
      } else if (error.message.includes('QUOTA_EXCEEDED') || error.message.includes('quota')) {
        throw new Error(
          'API quota exceeded: You have reached your free tier limit. Please wait or upgrade your plan. Error: ' +
            error.message
        )
      } else if (error.message.includes('PERMISSION_DENIED')) {
        throw new Error('Permission denied: Please check your API key permissions.')
      } else if (error.message.includes('429')) {
        throw new Error('Rate limit exceeded: Please wait a moment before trying again.')
      }
    }

    throw new Error(
      'Failed to parse resume with AI: ' + (error instanceof Error ? error.message : String(error))
    )
  }
}
