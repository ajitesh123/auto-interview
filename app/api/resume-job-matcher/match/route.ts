import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Gemini AI
const GOOGLE_GEMINI_API_KEY =
  process.env.GEMINI_API_KEY || 'AIzaSyBzPxbFBd7imzZOlYo8JVIRNo_a6Sqwp5s'
const genAI = GOOGLE_GEMINI_API_KEY ? new GoogleGenerativeAI(GOOGLE_GEMINI_API_KEY) : null

async function extractTextFromFile(file: File): Promise<{ text: string; mime: string }> {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const mime = file.type || 'application/octet-stream'

  const isPDF =
    mime === 'application/pdf' ||
    mime === 'application/x-pdf' ||
    file.name.toLowerCase().endsWith('.pdf')

  if (isPDF) {
    try {
      const pdfParse = (await import('pdf-parse')).default
      const res = await pdfParse(buffer, { max: 0 })
      if (res && typeof res.text === 'string' && res.text.trim().length > 0) {
        return { text: res.text, mime }
      }
    } catch (e) {
      console.error('pdf-parse failed:', e)
    }

    try {
      const PDFParser = (await import('pdf2json')).default
      const fs = await import('fs')
      const path = await import('path')
      const os = await import('os')
      const tempDir = os.tmpdir()
      const tempFilePath = path.join(tempDir, `resume-job-${Date.now()}.pdf`)
      fs.writeFileSync(tempFilePath, buffer)
      const pdfParser = new PDFParser(null, true)
      const text: string = await new Promise((resolve, reject) => {
        pdfParser.on('pdfParser_dataError', (e: any) => {
          reject(new Error(e?.parserError?.message || 'PDF parse error'))
        })
        pdfParser.on('pdfParser_dataReady', () => {
          try {
            const t = pdfParser.getRawTextContent()
            resolve(t)
          } catch (err) {
            reject(err)
          }
        })
        pdfParser.loadPDF(tempFilePath)
      })
      fs.unlinkSync(tempFilePath)
      return { text, mime }
    } catch (e) {
      console.error('pdf2json failed:', e)
      return { text: buffer.toString('utf-8'), mime }
    }
  }

  if (
    mime === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    mime === 'application/msword' ||
    file.name.toLowerCase().endsWith('.docx')
  ) {
    try {
      const mammoth = await import('mammoth')
      const result = await mammoth.extractRawText({ buffer })
      return { text: result.value || '', mime }
    } catch (e) {
      console.error('mammoth failed:', e)
      return { text: buffer.toString('utf-8'), mime }
    }
  }

  return { text: buffer.toString('utf-8'), mime }
}

// Helper function to clean and normalize text for AI processing
function cleanTextForAI(text: string): string {
  return text
    .replace(/[\r\n]+/g, ' ') // Replace newlines with spaces
    .replace(/\s+/g, ' ') // Normalize multiple spaces
    .replace(/[""]/g, '"') // Normalize quotes
    .replace(/['']/g, "'") // Normalize apostrophes
    .trim()
}

// Helper function to repair incomplete JSON
function repairIncompleteJSON(jsonString: string): string {
  let repaired = jsonString.trim()

  // Count open and close braces/brackets
  const openBraces = (repaired.match(/\{/g) || []).length
  const closeBraces = (repaired.match(/\}/g) || []).length
  const openBrackets = (repaired.match(/\[/g) || []).length
  const closeBrackets = (repaired.match(/\]/g) || []).length

  // If JSON is incomplete, try to repair it
  if (openBraces > closeBraces || openBrackets > closeBrackets) {
    console.log('[Resume-Job-Matcher] Detected incomplete JSON, attempting repair...')

    // Remove trailing incomplete strings/values
    repaired = repaired.replace(/,?\s*"[^"]*$/, '') // Remove incomplete string at end
    repaired = repaired.replace(/,?\s*$/, '') // Remove trailing comma/whitespace

    // Close any open strings
    const quoteCount = (repaired.match(/"/g) || []).length
    if (quoteCount % 2 !== 0) {
      repaired += '"'
    }

    // Close open arrays
    for (let i = 0; i < openBrackets - closeBrackets; i++) {
      repaired += ']'
    }

    // Close open objects
    for (let i = 0; i < openBraces - closeBraces; i++) {
      repaired += '}'
    }

    console.log('[Resume-Job-Matcher] Repaired JSON structure')
  }

  return repaired
}

// Helper function to extract and clean JSON from AI response
function extractAndCleanJSON(response: string): string | null {
  let jsonString: string | null = null

  // Method 1: Try to find JSON in markdown code blocks
  const markdownMatch = response.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/)
  if (markdownMatch && markdownMatch[1]) {
    jsonString = markdownMatch[1]
    console.log('[Resume-Job-Matcher] Found JSON in markdown code block')
  }

  // Method 2: Try to find JSON object with balanced braces
  if (!jsonString) {
    let openBraces = 0
    let startIdx = -1
    let endIdx = -1

    for (let i = 0; i < response.length; i++) {
      if (response[i] === '{') {
        if (openBraces === 0) startIdx = i
        openBraces++
      } else if (response[i] === '}') {
        openBraces--
        if (openBraces === 0 && startIdx !== -1) {
          endIdx = i
          break
        }
      }
    }

    if (startIdx !== -1 && endIdx !== -1) {
      jsonString = response.substring(startIdx, endIdx + 1)
      console.log('[Resume-Job-Matcher] Found JSON using balanced braces')
    }
  }

  // Method 3: Extract from start to last possible closing brace (for truncated responses)
  if (!jsonString) {
    const startIdx = response.indexOf('{')
    const lastBrace = response.lastIndexOf('}')
    if (startIdx !== -1 && lastBrace > startIdx) {
      jsonString = response.substring(startIdx, lastBrace + 1)
      console.log('[Resume-Job-Matcher] Extracted JSON from truncated response')
    }
  }

  if (!jsonString) return null

  // Repair incomplete JSON (handles truncated responses)
  jsonString = repairIncompleteJSON(jsonString)

  // Clean up the JSON string
  jsonString = jsonString
    .trim()
    // Remove trailing commas before closing braces/brackets
    .replace(/,(\s*[}\]])/g, '$1')
    // Fix unescaped newlines in strings
    .replace(/\n/g, ' ')
    // Fix multiple spaces
    .replace(/\s+/g, ' ')

  return jsonString
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const jobDescription = (formData.get('jobDescription') as string) || ''

    if (!file) {
      return NextResponse.json(
        { errorCode: 'NO_FILE', message: 'No file uploaded' },
        { status: 400 }
      )
    }

    if (!jobDescription || jobDescription.trim().length < 50) {
      return NextResponse.json(
        {
          errorCode: 'NO_JOB_DESC',
          message: 'Job description is required (at least 50 characters)',
        },
        { status: 400 }
      )
    }

    // Extract text from resume
    const { text: resumeText } = await extractTextFromFile(file)
    if (!resumeText || resumeText.trim().length < 16) {
      return NextResponse.json(
        {
          errorCode: 'EMPTY_TEXT',
          message:
            'Failed to extract text from your resume. Please upload a valid PDF or DOCX with actual content.',
        },
        { status: 400 }
      )
    }

    if (!genAI) {
      return NextResponse.json(
        { errorCode: 'API_ERROR', message: 'Gemini API not configured' },
        { status: 500 }
      )
    }

    // Clean the input texts
    const cleanedJobDesc = cleanTextForAI(jobDescription.slice(0, 20000))
    const cleanedResume = cleanTextForAI(resumeText.slice(0, 20000))

    // Use Gemini to analyze the match
    // Try multiple model names in case one doesn't work
    const modelNames = [
      'gemini-2.5-pro',
      'gemini-2.5-flash',
      'gemini-1.5-flash',
      'gemini-1.5-flash-001',
      'gemini-pro',
    ]
    let model: any = null
    let lastError: any = null

    for (const modelName of modelNames) {
      try {
        console.log(`[Resume-Job-Matcher] Trying model: ${modelName}`)
        model = genAI.getGenerativeModel({ model: modelName })
        // Test if model is accessible by checking if it has the method
        if (model && typeof model.generateContent === 'function') {
          console.log(`[Resume-Job-Matcher] Model ${modelName} is accessible`)
          break
        }
      } catch (modelError: any) {
        console.warn(`[Resume-Job-Matcher] Model ${modelName} failed:`, modelError.message)
        lastError = modelError
        continue
      }
    }

    if (!model) {
      console.error('[Resume-Job-Matcher] All models failed to initialize')
      throw new Error(
        `Failed to initialize Gemini model. Last error: ${lastError?.message || 'Unknown'}`
      )
    }

    try {
      const prompt = `You are an expert ATS resume analyzer. Analyze how well a resume matches a job description. 

CRITICAL INSTRUCTIONS:
1. Return ONLY a valid JSON object
2. Start with { and end with }
3. Do NOT use markdown code blocks
4. Do NOT include any explanatory text
5. Ensure all strings are properly quoted
6. Do NOT use trailing commas
7. Keep recommendations concise (max 3 items, each action under 150 chars)


Required JSON structure (return exactly this format):
{
  "matchScore": 85,
  "matchedKeywords": {
    "technical": ["JavaScript", "React", "Python"],
    "softSkills": ["leadership", "communication", "teamwork"]
  },
  "missingKeywords": {
    "technical": ["Node.js", "TypeScript"],
    "softSkills": ["problem-solving", "collaboration"]
  },
  "recommendations": [
    {
      "priority": "high",
      "category": "Keywords",
      "issue": "Missing key technical skills",
      "action": "Add Node.js and TypeScript to your skills section",
      "example": "Experience with Node.js and TypeScript for backend development"
    }
  ]
}

Categorize keywords into:
- Technical: Programming languages, frameworks, tools, platforms, technologies, certifications (e.g., "Python", "React", "AWS", "Docker", "SQL", "Agile", "Scrum")
- Soft Skills: Interpersonal skills, communication abilities, personal attributes (e.g., "leadership", "communication", "problem-solving", "teamwork", "collaboration", "adaptability")

Analyze semantic matches (e.g., "JavaScript" matches "JS", "React dev", "Node.js"). Be generous with matches. Count implicit matches where skills are demonstrated through experience.

JOB DESCRIPTION:
${cleanedJobDesc}

RESUME TEXT:
${cleanedResume}

Remember: Return ONLY the JSON object, starting with { and ending with }. No markdown, no code blocks, no explanations.`

      console.log('[Resume-Job-Matcher] Calling Gemini API...')
      console.log('[Resume-Job-Matcher] Job description length:', cleanedJobDesc.length)
      console.log('[Resume-Job-Matcher] Resume text length:', cleanedResume.length)

      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.1, // Lower temperature for more deterministic JSON output
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 8192,
        },
      })

      const response = await result.response

      // Check for response issues
      let wasTruncated = false
      if (response.candidates && response.candidates.length > 0) {
        const candidate = response.candidates[0]
        if (candidate.finishReason) {
          console.log('[Resume-Job-Matcher] Finish reason:', candidate.finishReason)
          if (candidate.finishReason === 'MAX_TOKENS') {
            wasTruncated = true
            console.warn('[Resume-Job-Matcher] Response truncated due to MAX_TOKENS')
          } else if (candidate.finishReason !== 'STOP') {
            console.warn(
              '[Resume-Job-Matcher] Response may be incomplete. Finish reason:',
              candidate.finishReason
            )
          }
        }
      }

      let out: string
      try {
        out = response.text()
        if (!out || out.trim().length === 0) {
          console.error('[Resume-Job-Matcher] Empty response received from Gemini')
          throw new Error('Empty response from Gemini API. Please try again.')
        }
        console.log('[Resume-Job-Matcher] Gemini response received, length:', out.length)
        console.log('[Resume-Job-Matcher] Response preview (first 2000 chars):', out.slice(0, 2000))
      } catch (textError: any) {
        console.error('[Resume-Job-Matcher] Error getting text from response:', textError)
        console.error('[Resume-Job-Matcher] Response object:', JSON.stringify(response, null, 2))
        throw new Error(`Failed to get response text: ${textError?.message || 'Unknown error'}`)
      }

      // Try multiple methods to extract JSON from response
      let jsonString: string | null = null

      // Method 1: Try to find JSON in markdown code blocks (```json ... ``` or ``` ... ```)
      const markdownMatch = out.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/)
      if (markdownMatch && markdownMatch[1]) {
        jsonString = markdownMatch[1]
        console.log('[Resume-Job-Matcher] Found JSON in markdown code block')
      }

      // Method 2: Try to find JSON object (looking for opening { and matching closing })
      if (!jsonString) {
        const jsonMatch = out.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
          jsonString = jsonMatch[0]
          console.log('[Resume-Job-Matcher] Found JSON using regex match')
        }
      }

      // Method 3: Try to find JSON between specific markers if present
      if (!jsonString) {
        const startIdx = out.indexOf('{')
        const lastIdx = out.lastIndexOf('}')
        if (startIdx !== -1 && lastIdx !== -1 && lastIdx > startIdx) {
          jsonString = out.substring(startIdx, lastIdx + 1)
          console.log('[Resume-Job-Matcher] Found JSON using index-based extraction')
        }
      }

      if (!jsonString) {
        console.error('[Resume-Job-Matcher] No JSON found in response.')
        console.error('[Resume-Job-Matcher] Full response:', out)
        console.error('[Resume-Job-Matcher] Response length:', out.length)
        console.error('[Resume-Job-Matcher] Has opening brace:', out.includes('{'))
        console.error('[Resume-Job-Matcher] Has closing brace:', out.includes('}'))

        // If we have some text but no JSON, try to provide a helpful error
        if (out.trim().length > 0) {
          throw new Error(
            `Gemini returned text but no valid JSON was found. Response: ${out.slice(0, 200)}...`
          )
        } else {
          throw new Error('Empty response from Gemini. Please check your API key and try again.')
        }
      }

      let analysis: any
      try {
        // Clean up the JSON string (remove trailing commas, etc.)
        jsonString = jsonString.trim()
        // Remove trailing commas before closing braces/brackets
        jsonString = jsonString.replace(/,(\s*[}\]])/g, '$1')

        analysis = JSON.parse(jsonString)
        console.log('[Resume-Job-Matcher] JSON parsed successfully')
      } catch (parseError: any) {
        console.error('[Resume-Job-Matcher] JSON parse error:', parseError)
        console.error(
          '[Resume-Job-Matcher] JSON string that failed (first 1000 chars):',
          jsonString.slice(0, 1000)
        )
        console.error('[Resume-Job-Matcher] Full response:', out)

        // Try to fix common JSON issues and parse again
        try {
          // Try to fix unescaped quotes, etc.
          const fixedJson = jsonString
            .replace(/,\s*}/g, '}') // Remove trailing commas before }
            .replace(/,\s*]/g, ']') // Remove trailing commas before ]

          analysis = JSON.parse(fixedJson)
          console.log('[Resume-Job-Matcher] JSON parsed after fixing common issues')
        } catch (secondParseError: any) {
          console.error('[Resume-Job-Matcher] Second parse attempt also failed:', secondParseError)
          throw new Error(`Failed to parse JSON: ${parseError?.message || 'Invalid JSON format'}`)
        }
      }

      // Handle both old format (array) and new format (object with technical/softSkills)
      const matchedKW = analysis.matchedKeywords || {}
      const missingKW = analysis.missingKeywords || {}

      // Convert old format to new format if needed
      let matchedTechnical: string[] = []
      let matchedSoftSkills: string[] = []
      let missingTechnical: string[] = []
      let missingSoftSkills: string[] = []

      if (Array.isArray(matchedKW)) {
        // Old format - categorize manually
        matchedTechnical = matchedKW.filter(
          (kw: string) =>
            typeof kw === 'string' &&
            (/^(react|angular|vue|node|python|java|javascript|typescript|aws|docker|kubernetes|sql|git|agile|scrum|html|css|mongodb|postgres|mysql|redis|jenkins|terraform|ansible|gcp|azure)/i.test(
              kw
            ) ||
              /[A-Z]{2,}/.test(kw) || // Acronyms like AWS, API, CSS
              /(\.js|\.py|\.ts|framework|library|tool|platform|database|server|cloud)/i.test(kw))
        )
        matchedSoftSkills = matchedKW.filter(
          (kw: string) => typeof kw === 'string' && !matchedTechnical.includes(kw)
        )
      } else if (typeof matchedKW === 'object' && matchedKW !== null) {
        matchedTechnical = Array.isArray(matchedKW.technical) ? matchedKW.technical : []
        matchedSoftSkills = Array.isArray(matchedKW.softSkills) ? matchedKW.softSkills : []
      }

      if (Array.isArray(missingKW)) {
        // Old format - categorize manually
        missingTechnical = missingKW.filter(
          (kw: string) =>
            typeof kw === 'string' &&
            (/^(react|angular|vue|node|python|java|javascript|typescript|aws|docker|kubernetes|sql|git|agile|scrum|html|css|mongodb|postgres|mysql|redis|jenkins|terraform|ansible|gcp|azure)/i.test(
              kw
            ) ||
              /[A-Z]{2,}/.test(kw) ||
              /(\.js|\.py|\.ts|framework|library|tool|platform|database|server|cloud)/i.test(kw))
        )
        missingSoftSkills = missingKW.filter(
          (kw: string) => typeof kw === 'string' && !missingTechnical.includes(kw)
        )
      } else if (typeof missingKW === 'object' && missingKW !== null) {
        missingTechnical = Array.isArray(missingKW.technical) ? missingKW.technical : []
        missingSoftSkills = Array.isArray(missingKW.softSkills) ? missingKW.softSkills : []
      }

      // Calculate match rate
      const totalMatched = matchedTechnical.length + matchedSoftSkills.length
      const totalMissing = missingTechnical.length + missingSoftSkills.length
      const totalKeywords = totalMatched + totalMissing
      const matchRate = totalKeywords > 0 ? Math.round((totalMatched / totalKeywords) * 100) : 0

      // Ensure match score is reasonable
      const matchScore = Math.max(0, Math.min(100, analysis.matchScore || matchRate))

      const result_data = {
        matchScore,
        matchedKeywords: {
          technical: matchedTechnical,
          softSkills: matchedSoftSkills,
        },
        missingKeywords: {
          technical: missingTechnical,
          softSkills: missingSoftSkills,
        },
        keywordAnalysis: {
          matched: [...matchedTechnical, ...matchedSoftSkills],
          missing: [...missingTechnical, ...missingSoftSkills],
          matchRate,
        },
        recommendations: analysis.recommendations || [],
        resumeText: resumeText.slice(0, 1000), // Store first 1000 chars for reference
        jobDescriptionText: jobDescription.slice(0, 1000),
      }

      return NextResponse.json(result_data)
    } catch (geminiError: any) {
      console.error('[Resume-Job-Matcher] Gemini analysis failed:', geminiError)
      console.error('[Resume-Job-Matcher] Error details:', {
        message: geminiError?.message,
        stack: geminiError?.stack,
        name: geminiError?.name,
        cause: geminiError?.cause,
      })

      // Check if it's an API error
      if (
        geminiError?.message?.includes('API') ||
        geminiError?.message?.includes('quota') ||
        geminiError?.message?.includes('403') ||
        geminiError?.message?.includes('401')
      ) {
        console.error('[Resume-Job-Matcher] This appears to be an API configuration issue')
      }

      // Provide more specific error messages
      let errorMessage = 'Failed to analyze with AI. Please try again.'
      if (geminiError instanceof Error) {
        if (
          geminiError.message.includes('API_KEY_INVALID') ||
          geminiError.message.includes('401')
        ) {
          errorMessage = 'Invalid API key. Please check your Gemini API configuration.'
        } else if (
          geminiError.message.includes('QUOTA_EXCEEDED') ||
          geminiError.message.includes('quota')
        ) {
          errorMessage = 'API quota exceeded. Please wait a moment or check your API limits.'
        } else if (geminiError.message.includes('429')) {
          errorMessage = 'Rate limit exceeded. Please wait a moment before trying again.'
        } else if (
          geminiError.message.includes('PERMISSION_DENIED') ||
          geminiError.message.includes('403')
        ) {
          errorMessage = 'Permission denied. Please check your API key permissions.'
        } else if (
          geminiError.message.includes('404') ||
          geminiError.message.includes('not found')
        ) {
          errorMessage = 'API endpoint not found. Please check your Gemini API configuration.'
        } else {
          errorMessage = `Failed to analyze: ${geminiError.message}`
        }
      }

      return NextResponse.json(
        { errorCode: 'GEMINI_ERROR', message: errorMessage },
        { status: 500 }
      )
    }
  } catch (error: any) {
    console.error('Resume-Job Matcher Error:', error)
    const message =
      typeof error?.message === 'string'
        ? error.message
        : 'Failed to match resume with job description'
    return NextResponse.json({ errorCode: 'UNKNOWN', message }, { status: 500 })
  }
}
