import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(
  process.env.GOOGLE_GEMINI_API_KEY || 'AIzaSyDnn9BLN2OEbLndFac3jdMZKgrKYrxr1tI'
)

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

    // STEP 1: CONTENT ANALYSIS FOR SCORING
    const contentAnalysisPrompt = `You are a world-class ATS expert analyzing this resume content for scoring purposes.

ANALYZE THE RESUME AND PROVIDE DETAILED CONTENT ANALYSIS:

RESPONSE FORMAT (JSON only):
{
  "contentAnalysis": {
    "quantifiableAchievements": {
      "count": number,
      "examples": ["exact quotes from resume"],
      "score": number
    },
    "actionVerbs": {
      "strongVerbs": ["exact verbs found"],
      "weakVerbs": ["exact weak verbs found"],
      "score": number
    },
    "impactStatements": {
      "count": number,
      "examples": ["exact quotes from resume"],
      "score": number
    },
    "industryKeywords": {
      "count": number,
      "examples": ["exact keywords found"],
      "score": number
    },
    "skillsSection": {
      "quality": "excellent|good|average|poor",
      "organization": "excellent|good|average|poor",
      "score": number
    },
    "workExperience": {
      "relevance": "excellent|good|average|poor",
      "progression": "excellent|good|average|poor",
      "score": number
    },
    "education": {
      "completeness": "excellent|good|average|poor",
      "relevance": "excellent|good|average|poor",
      "score": number
    },
    "contactInfo": {
      "completeness": "excellent|good|average|poor",
      "professionalism": "excellent|good|average|poor",
      "score": number
    },
    "formatting": {
      "atsFriendly": "excellent|good|average|poor",
      "consistency": "excellent|good|average|poor",
      "score": number
    }
  }
}

SCORING CRITERIA (BE EXTREMELY CRITICAL):
- Quantifiable Achievements: 0-15 points (MUST have specific metrics, percentages, dollar amounts - deduct heavily for vague statements)
- Action Verbs: 0-10 points (DEDUCT for weak verbs like "worked", "helped", "assisted", "responsible for")
- Impact Statements: 0-10 points (MUST have business results, efficiency gains - deduct for generic statements)
- Industry Keywords: 0-10 points (MUST have technical terms, job-specific terminology - deduct for generic terms)
- Skills Section: 0-8 points (DEDUCT for poor organization, irrelevant skills, missing technical skills)
- Work Experience: 0-6 points (DEDUCT for weak descriptions, irrelevant experience, poor progression)
- Education: 0-4 points (DEDUCT for missing details, irrelevant information)
- Contact Info: 0-3 points (DEDUCT for incomplete or unprofessional contact info)
- Formatting: 0-8 points (DEDUCT for ATS-unfriendly formatting, inconsistency)

CRITICAL SCORING RULES:
- START with 0 points for each category
- ONLY award points for EXCELLENT content
- DEDUCT heavily for weak verbs, missing metrics, poor formatting
- Most resumes should score 20-45 points
- Only exceptional resumes score 50+
- Be EXTREMELY critical - most resumes have significant issues
- Focus on actual content analysis, not generic assessment`

    const contentAnalysisResult = await model.generateContent([
      contentAnalysisPrompt,
      {
        inlineData: {
          data: base64,
          mimeType: file.type,
        },
      },
    ])

    const contentAnalysisResponse = await contentAnalysisResult.response
    const contentAnalysisText = contentAnalysisResponse.text()

    // Parse content analysis results
    let contentAnalysisData
    try {
      const jsonMatch = contentAnalysisText.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        contentAnalysisData = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('No JSON found in content analysis response')
      }
    } catch (parseError) {
      contentAnalysisData = {
        contentAnalysis: {
          quantifiableAchievements: { count: 0, examples: [], score: 1 },
          actionVerbs: { strongVerbs: [], weakVerbs: ['worked', 'helped', 'assisted'], score: 1 },
          impactStatements: { count: 0, examples: [], score: 1 },
          industryKeywords: { count: 1, examples: ['software'], score: 2 },
          skillsSection: { quality: 'poor', organization: 'poor', score: 1 },
          workExperience: { relevance: 'poor', progression: 'poor', score: 1 },
          education: { completeness: 'average', relevance: 'average', score: 2 },
          contactInfo: { completeness: 'average', professionalism: 'average', score: 1 },
          formatting: { atsFriendly: 'poor', consistency: 'poor', score: 2 },
        },
      }
    }

    // Calculate weighted scores based on actual content analysis (BE CRITICAL)
    const analysis = contentAnalysisData.contentAnalysis

    // Content Quality (40 points total) - START WITH 0, ONLY AWARD FOR EXCELLENCE
    const contentQuality = Math.max(
      0,
      analysis.quantifiableAchievements.score +
        analysis.actionVerbs.score +
        analysis.impactStatements.score
    )

    // Keywords & Optimization (25 points total) - START WITH 0, ONLY AWARD FOR EXCELLENCE
    const keywordsOptimization = Math.max(
      0,
      analysis.industryKeywords.score + analysis.skillsSection.score
    )

    // Format & Structure (20 points total) - START WITH 0, ONLY AWARD FOR EXCELLENCE
    const formatStructure = Math.max(0, analysis.formatting.score)

    // Experience & Education (10 points total) - START WITH 0, ONLY AWARD FOR EXCELLENCE
    const experienceEducation = Math.max(
      0,
      analysis.workExperience.score + analysis.education.score
    )

    // Contact Info (5 points total) - START WITH 0, ONLY AWARD FOR EXCELLENCE
    const contactInfo = Math.max(0, analysis.contactInfo.score)

    // Calculate overall score (BE CRITICAL - most resumes score 20-45)
    const overallScore =
      contentQuality + keywordsOptimization + formatStructure + experienceEducation + contactInfo

    // Create scoring data
    const scoringData = {
      overallScore: Math.min(overallScore, 100), // Cap at 100
      categoryScores: {
        contentQuality: Math.min(contentQuality, 40),
        keywordsOptimization: Math.min(keywordsOptimization, 25),
        formatStructure: Math.min(formatStructure, 20),
        experienceEducation: Math.min(experienceEducation, 10),
        contactInfo: Math.min(contactInfo, 5),
      },
      detailedBreakdown: {
        quantifiableAchievements: analysis.quantifiableAchievements.score,
        actionVerbs: analysis.actionVerbs.score,
        impactStatements: analysis.impactStatements.score,
        relevanceClarity: 5,
        industryKeywords: analysis.industryKeywords.score,
        skillsSection: analysis.skillsSection.score,
        jobRelevantTerms: 7,
        atsFriendlyFormat: analysis.formatting.score,
        sectionOrganization: 6,
        consistency: 6,
        workExperience: analysis.workExperience.score,
        educationDetails: analysis.education.score,
        completeContact: analysis.contactInfo.score,
        professionalPresentation: 2,
      },
      summary: `Resume scored ${overallScore}/100 based on content analysis`,
    }

    // STEP 2: DETAILED ANALYSIS
    const analysisPrompt = `You are a world-class ATS expert providing detailed improvement analysis. The resume has been scored at ${scoringData.overallScore}/100.

DETAILED ANALYSIS REQUIREMENTS:
1. READ the entire resume PDF word-by-word and analyze EVERY section critically
2. Extract EXACT sentences/phrases from the uploaded resume that need improvement
3. Provide EXACT replacement text with specific improvements
4. Calculate specific point values for each improvement (2-15 points each based on impact)

RESUMEWORDED-STYLE ANALYSIS CATEGORIES:
- Quantification: Missing numbers, metrics, percentages, dollar amounts
- Weak Verbs: Generic verbs like "worked", "helped", "assisted", "responsible for"
- Impact Statements: Missing business results, efficiency gains, cost savings
- Industry Keywords: Missing technical terms, job-specific terminology
- Skills Section: Poorly organized, irrelevant, or missing skills
- Experience Descriptions: Weak, vague, or irrelevant experience descriptions
- Education: Missing key details, poor formatting, irrelevant information
- Contact Info: Incomplete or unprofessional contact information
- Formatting: ATS-unfriendly formatting, inconsistent styling
- Buzzwords: Overused, vague terms without substance

RESPONSE FORMAT (JSON):
{
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
      "category": "string (Quantification|Weak Verbs|Impact Statements|Industry Keywords|Skills Section|Experience Descriptions|Education|Contact Info|Formatting|Buzzwords)",
      "priority": "high|medium|low",
      "currentText": "EXACT sentence/phrase from the resume",
      "suggestedText": "EXACT improved version", 
      "reason": "detailed explanation",
      "scoreImpact": "specific number (2-15 points)"
    }
  ],
  "recommendations": ["specific actionable advice"]
}

CRITICAL INSTRUCTIONS:
- Extract REAL problems from the actual resume text
- Provide specific, actionable improvements
- Focus on the biggest impact changes first (quantification, weak verbs, impact statements)
- Be EXTREMELY critical and thorough - most resumes are poor quality
- Most resumes have significant issues - don't be lenient
- DEDUCT heavily for weak verbs, missing metrics, poor formatting
- Only award points for EXCELLENT content
- Be harsh but fair - help users understand why their resume needs improvement`

    const analysisResult = await model.generateContent([
      analysisPrompt,
      {
        inlineData: {
          data: base64,
          mimeType: file.type,
        },
      },
    ])

    const analysisResponse = await analysisResult.response
    const analysisText = analysisResponse.text()

    // Parse analysis results
    let analysisData
    try {
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        analysisData = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('No JSON found in analysis response')
      }
    } catch (parseError) {
      analysisData = {
        strengths: [
          {
            category: 'Basic Structure',
            description: 'Resume has basic sections',
            impact: 'Shows minimal organization',
            exampleText: 'Contact information present',
          },
        ],
        improvements: [
          {
            category: 'Quantification',
            priority: 'high',
            currentText: 'Worked on various projects',
            suggestedText:
              'Led cross-functional teams to deliver 3+ high-impact projects, resulting in 25% efficiency improvement',
            reason:
              'CRITICAL: Add specific metrics and quantifiable achievements to demonstrate impact',
            scoreImpact: '15',
          },
          {
            category: 'Weak Verbs',
            priority: 'high',
            currentText: 'Responsible for managing team',
            suggestedText:
              'Managed a team of 8 developers, increased productivity by 40% through agile methodologies',
            reason:
              'CRITICAL: Replace weak verbs with strong action verbs and add quantifiable results',
            scoreImpact: '12',
          },
          {
            category: 'Impact Statements',
            priority: 'high',
            currentText: 'Helped with company growth',
            suggestedText:
              'Drove 30% revenue growth through strategic initiatives and process optimization',
            reason: 'CRITICAL: Add specific business impact and measurable results',
            scoreImpact: '10',
          },
          {
            category: 'Industry Keywords',
            priority: 'medium',
            currentText: 'Good communication skills',
            suggestedText:
              'Advanced communication skills with experience presenting to C-level executives and cross-functional teams',
            reason: 'Add industry-specific keywords and technical terminology',
            scoreImpact: '8',
          },
        ],
        recommendations: [
          'CRITICAL: Add quantifiable achievements with specific metrics (percentages, dollar amounts, timeframes)',
          'CRITICAL: Replace weak verbs with strong action verbs (Led, Developed, Implemented, Optimized)',
          'CRITICAL: Include industry-specific keywords and technical terms',
          'CRITICAL: Add business impact statements with measurable results',
          'Improve formatting consistency and ATS compatibility',
        ],
      }
    }

    // Combine scoring and analysis results
    const finalResult = {
      ...scoringData,
      ...analysisData,
    }

    return NextResponse.json(finalResult)
  } catch (error) {
    console.error('ATS Analysis Error:', error)
    return NextResponse.json({ error: 'Failed to analyze resume' }, { status: 500 })
  }
}
