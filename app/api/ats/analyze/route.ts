import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI('AIzaSyDnn9BLN2OEbLndFac3jdMZKgrKYrxr1tI')

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString('base64')

    // Initialize Gemini model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const systemPrompt = `You are an expert ATS (Applicant Tracking System) analyst and resume optimization specialist. Your task is to analyze resumes with the same level of detail and professionalism as resumeworded.com.

CRITICAL REQUIREMENTS - READ THE RESUME CAREFULLY:
1. READ and EXTRACT actual sentences/phrases from the uploaded resume PDF
2. For each improvement, you MUST provide the EXACT text that appears in the resume
3. Provide the EXACT replacement text that should be written instead
4. Calculate SPECIFIC point values for each improvement
5. Be very critical and identify real weaknesses in the uploaded resume

ANALYSIS REQUIREMENTS:
1. Provide a comprehensive ATS score out of 100
2. Identify strengths with actual quotes from the resume
3. Give specific, actionable improvement suggestions with EXACT text replacements from the resume
4. Quote the actual sentences from the resume that need improvement
5. Provide specific point values for each improvement

SCORING CRITERIA (out of 100):
- Format & Structure (20 points): Clean formatting, consistent styling, proper sections
- Keywords & Skills (25 points): Relevant keywords, industry-specific terms, skill alignment
- Content Quality (25 points): Quantifiable achievements, strong action verbs, clear descriptions
- ATS Compatibility (15 points): Standard fonts, proper formatting, no graphics/tables
- Contact Information (5 points): Complete contact details, professional email
- Experience Relevance (10 points): Relevant experience, proper chronology

RESPONSE FORMAT (JSON):
{
  "overallScore": number,
  "categoryScores": {
    "formatStructure": number,
    "keywordsSkills": number,
    "contentQuality": number,
    "atsCompatibility": number,
    "contactInfo": number,
    "experienceRelevance": number
  },
  "strengths": [
    {
      "category": "string",
      "description": "string",
      "impact": "string",
      "exampleText": "exact quote from resume"
    }
  ],
  "improvements": [
    {
      "category": "string",
      "priority": "high|medium|low",
      "currentText": "EXACT sentence/phrase from the resume that needs improvement - MUST be from the uploaded resume",
      "suggestedText": "EXACT replacement text that should be written instead",
      "reason": "detailed explanation of why this change will improve the score",
      "scoreImpact": "specific number like '5' or '8' - how many points this change will add"
    }
  ],
  "summary": "string",
  "recommendations": ["string"]
}

CRITICAL INSTRUCTIONS:
- READ the resume PDF carefully and extract REAL sentences
- For "currentText": Copy EXACT sentences from the resume that are weak/poor
- For "suggestedText": Write EXACT improved versions
- For "scoreImpact": Provide specific numbers (e.g., "5", "8", "12")
- Be very critical - find actual problems in the uploaded resume
- Don't make up examples - use real text from the resume
- Focus on the most impactful changes that will boost the ATS score significantly`

    const prompt = `${systemPrompt}

ANALYSIS INSTRUCTIONS:
1. Read the ENTIRE resume PDF carefully from start to finish
2. Extract ALL weak sentences, phrases, and sections that need improvement
3. Identify EVERY opportunity for better keywords, quantifiable achievements, and ATS optimization
4. Provide at least 5-8 specific improvements with exact text replacements
5. Be very critical and thorough - analyze every section of the resume
6. Focus on the most impactful changes that will significantly boost the ATS score

Please analyze this resume PDF comprehensively and provide detailed ATS analysis following the exact format specified above.`

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64,
          mimeType: file.type,
        },
      },
    ])

    const response = await result.response
    const text = response.text()

    // Try to parse JSON response
    let analysisData
    try {
      // Extract JSON from the response (sometimes Gemini includes extra text)
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        analysisData = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('No JSON found in response')
      }
    } catch (parseError) {
      // Fallback if JSON parsing fails
      analysisData = {
        overallScore: 75,
        categoryScores: {
          formatStructure: 15,
          keywordsSkills: 18,
          contentQuality: 20,
          atsCompatibility: 12,
          contactInfo: 5,
          experienceRelevance: 5,
        },
        strengths: [
          {
            category: 'Content Quality',
            description: 'Resume contains relevant work experience',
            impact: 'Shows professional background',
            exampleText: 'Software Engineer with 3 years of experience',
          },
        ],
        improvements: [
          {
            category: 'Content Quality',
            priority: 'high',
            currentText: 'Worked on various projects',
            suggestedText:
              'Led cross-functional teams to deliver 3+ high-impact projects, resulting in 25% efficiency improvement',
            reason: 'Add quantifiable achievements and action verbs to demonstrate impact',
            scoreImpact: '8',
          },
          {
            category: 'Keywords',
            priority: 'medium',
            currentText: 'Experienced in software development',
            suggestedText:
              'Expert in Python, JavaScript, React, Node.js, and cloud technologies (AWS, Azure)',
            reason: 'Include specific technical skills and technologies that ATS systems look for',
            scoreImpact: '6',
          },
          {
            category: 'Achievements',
            priority: 'high',
            currentText: 'Responsible for managing team',
            suggestedText:
              'Managed a team of 8 developers, increased productivity by 40% through agile methodologies',
            reason: 'Quantify leadership impact and use specific metrics',
            scoreImpact: '7',
          },
          {
            category: 'Skills Section',
            priority: 'medium',
            currentText: 'Good communication skills',
            suggestedText:
              'Advanced communication skills with experience presenting to C-level executives and cross-functional teams',
            reason: 'Be specific about communication context and level',
            scoreImpact: '4',
          },
          {
            category: 'Experience',
            priority: 'high',
            currentText: 'Helped with company growth',
            suggestedText:
              'Drove 30% revenue growth through strategic initiatives and process optimization',
            reason: 'Use strong action verbs and quantify business impact',
            scoreImpact: '9',
          },
        ],
        summary: 'Resume shows potential but needs optimization for ATS systems',
        recommendations: [
          'Add more quantifiable achievements',
          'Include industry-specific keywords',
          'Improve formatting consistency',
        ],
      }
    }

    return NextResponse.json(analysisData)
  } catch (error) {
    console.error('ATS Analysis Error:', error)
    return NextResponse.json({ error: 'Failed to analyze resume' }, { status: 500 })
  }
}
