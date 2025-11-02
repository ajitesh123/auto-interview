import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import crypto from 'crypto'
import { segmentResume } from '@/lib/ats/segment'
import { scoreResume } from '@/lib/ats/score'
import { analyzeKeywords } from '@/lib/keywordAnalyzer'

// Initialize Gemini AI with env key (used only for suggestions)
const GOOGLE_GEMINI_API_KEY =
  process.env.GEMINI_API_KEY || 'AIzaSyBzPxbFBd7imzZOlYo8JVIRNo_a6Sqwp5s'
const genAI = GOOGLE_GEMINI_API_KEY ? new GoogleGenerativeAI(GOOGLE_GEMINI_API_KEY) : null

// Simple in-memory cache (best-effort)
const cache = new Map<string, any>()

async function extractTextFromFile(file: File): Promise<{ text: string; mime: string }> {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const mime = file.type || 'application/octet-stream'

  const isPDF =
    mime === 'application/pdf' ||
    mime === 'application/x-pdf' ||
    file.name.toLowerCase().endsWith('.pdf')

  if (isPDF) {
    // Try simpler parser first
    try {
      const pdfParse = (await import('pdf-parse')).default
      const res = await pdfParse(buffer, { max: 0 })
      if (res && typeof res.text === 'string' && res.text.trim().length > 0) {
        return { text: res.text, mime }
      }
    } catch (e) {
      console.error('pdf-parse failed, will try pdf2json:', e)
    }

    // Fallback to pdf2json
    try {
      const PDFParser = (await import('pdf2json')).default
      const fs = await import('fs')
      const path = await import('path')
      const os = await import('os')
      const tempDir = os.tmpdir()
      const tempFilePath = path.join(tempDir, `ats-resume-${Date.now()}.pdf`)
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
      // last resort
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

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const jobDesc = (formData.get('job') as string) || ''

    if (!file) {
      return NextResponse.json(
        { errorCode: 'NO_FILE', message: 'No file uploaded' },
        { status: 400 }
      )
    }

    // Extract text, segment, score deterministically
    const { text, mime } = await extractTextFromFile(file)
    if (!text || typeof text !== 'string' || text.trim().length < 16) {
      console.error('ATS Analysis Error: Empty or unparsable text.')
      return NextResponse.json(
        {
          errorCode: 'EMPTY_TEXT',
          message:
            'Failed to extract text from your resume. Please upload a valid PDF or DOCX with actual content.',
        },
        { status: 400 }
      )
    }

    const hash = crypto.createHash('sha256').update(text).digest('hex')
    const hit = cache.get(
      hash + (jobDesc ? `:${crypto.createHash('sha1').update(jobDesc).digest('hex')}` : '')
    )
    if (hit) return NextResponse.json(hit)

    const parsed = segmentResume(text)

    // Optional: derive JD keywords and semantic match using Gemini
    let jdKeywords: string[] = []
    let semanticMatch = 0
    if (genAI && jobDesc && jobDesc.trim().length > 20) {
      // Extract keywords from provided JD
      try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
        const prompt = `Extract a concise list (max 25) of critical job skills/keywords/tools from the following job description. Output JSON only: {"keywords": ["kw1","kw2",...]}. JD: ${jobDesc.slice(0, 12000)}`
        const res = await (model as any).generateContent({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0, topP: 0, topK: 1, maxOutputTokens: 800 },
        })
        const out = await (res as any).response.text()
        const m = out.match(/\{[\s\S]*\}/)
        if (m) {
          const obj = JSON.parse(m[0])
          if (Array.isArray(obj.keywords)) jdKeywords = obj.keywords.slice(0, 25)
        }
      } catch (e) {
        console.warn('JD keyword extraction failed (non-blocking):', e)
      }
      // Semantic similarity via embeddings
      try {
        // @ts-ignore
        const embedModel = genAI.getGenerativeModel({ model: 'text-embedding-004' })
        // @ts-ignore
        const rEmb = await (embedModel as any).embedContent({ content: text.slice(0, 45000) })
        // @ts-ignore
        const jEmb = await (embedModel as any).embedContent({ content: jobDesc.slice(0, 45000) })
        const a: number[] =
          rEmb?.embedding?.values || rEmb?.data?.embedding || rEmb?.embedding?.embedding || []
        const b: number[] =
          jEmb?.embedding?.values || jEmb?.data?.embedding || jEmb?.embedding?.embedding || []
        if (a.length > 0 && b.length > 0) {
          const dot = a.reduce((s, v, i) => s + v * (b[i] || 0), 0)
          const magA = Math.sqrt(a.reduce((s, v) => s + v * v, 0))
          const magB = Math.sqrt(b.reduce((s, v) => s + v * v, 0))
          const cos = magA && magB ? dot / (magA * magB) : 0
          semanticMatch = Math.round(Math.max(0, Math.min(1, cos)) * 100)
        }
      } catch (e) {
        console.warn('Embedding similarity failed (non-blocking):', e)
      }
    } else if (genAI && (!jobDesc || jobDesc.trim().length === 0)) {
      // Infer target role and generate industry-standard keywords from resume content
      try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
        const prompt = `Infer the most likely target role(s) from the following resume text and return a concise list (max 25) of industry-standard keywords/skills/tools for that role, not just words from the resume. Output JSON only: {"keywords": ["kw1","kw2",...]}. Resume: ${text.slice(0, 14000)}`
        const res = await (model as any).generateContent({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0, topP: 0, topK: 1, maxOutputTokens: 800 },
        })
        const out = await (res as any).response.text()
        const m = out.match(/\{[\s\S]*\}/)
        if (m) {
          const obj = JSON.parse(m[0])
          if (Array.isArray(obj.keywords)) jdKeywords = obj.keywords.slice(0, 25)
        }
      } catch (e) {
        console.warn('Resume-based keyword inference failed (non-blocking):', e)
      }
    }

    // Fallback keyword extraction if Gemini didn't return any
    if (!jdKeywords || jdKeywords.length === 0) {
      const seed = new Set<string>()
      // Use skills section
      parsed.skills.slice(0, 50).forEach((s) => seed.add(s.toLowerCase()))
      // Common tech/business terms
      const fallbackList = [
        'python',
        'javascript',
        'react',
        'node',
        'typescript',
        'java',
        'kotlin',
        'swift',
        'c++',
        'c#',
        'sql',
        'nosql',
        'postgres',
        'mysql',
        'mongodb',
        'aws',
        'gcp',
        'azure',
        'docker',
        'kubernetes',
        'terraform',
        'git',
        'jira',
        'confluence',
        'figma',
        'excel',
        'tableau',
        'power bi',
        'salesforce',
        'ga4',
        'seo',
        'sem',
        'agile',
        'scrum',
        'kanban',
      ]
      fallbackList.forEach((k) => seed.add(k))
      jdKeywords = Array.from(seed).slice(0, 25)
    }

    // Expand keywords to aliases via Gemini to improve matching (synonyms/short-hands)
    let aliases: Record<string, string[]> = {}
    if (genAI && jdKeywords.length > 0) {
      try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
        const prompt = `For the following keywords, provide up to 3 synonyms/aliases/abbreviations each that commonly appear in resumes. Return ONLY JSON of the form {"aliases": {"keyword":["syn1","syn2"]}}. Keywords: ${jdKeywords.join(', ').slice(0, 1000)}`
        const res = await (model as any).generateContent({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0, topP: 0, topK: 1, maxOutputTokens: 600 },
        })
        const out = await (res as any).response.text()
        const m = out.match(/\{[\s\S]*\}/)
        if (m) {
          const obj = JSON.parse(m[0])
          if (obj && obj.aliases && typeof obj.aliases === 'object') aliases = obj.aliases
        }
      } catch (e) {
        console.warn('Keyword alias expansion failed (non-blocking):', e)
      }
    }

    let scoring
    try {
      scoring = scoreResume(parsed, {
        mime,
        fileSize: (file as any).size,
        level: 'mid',
        keywords: jdKeywords,
        aliases,
        semanticMatch,
      })
    } catch (e: any) {
      console.error('Scoring failed:', e)
      const msg =
        typeof e?.message === 'string' ? e.message : 'Resume scoring failed. Please try again.'
      return NextResponse.json({ errorCode: 'SCORE_FAIL', message: msg }, { status: 500 })
    }

    // Gemini-powered keyword optimization score (authoritative override)
    let geminiKW: any = null
    try {
      console.log('[API] Calling Gemini keyword analyzer...')
      geminiKW = await analyzeKeywords(text, jobDesc || '', jdKeywords)
      const oldKW = scoring.breakdown.keywordOptimization || 0
      const newKW = Math.max(0, Math.min(25, geminiKW.score25))
      const delta = newKW - oldKW
      console.log(`[API] Keyword score override: ${oldKW} -> ${newKW} (delta: ${delta})`)
      scoring.breakdown.keywordOptimization = newKW
      scoring.overallScore = Math.max(0, Math.min(100, scoring.overallScore + delta))
    } catch (e) {
      console.error('[API] Gemini keyword analyzer failed:', e)
      // Don't silently fail - log but continue with existing score
    }

    // Optional suggestions via Gemini
    let suggestions: any = { strengths: [], improvements: [], recommendations: [] }
    if (genAI) {
      try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
        const prompt = `You are an ATS resume editor. Given the following parsed resume JSON, produce JSON with fields: strengths[], improvements[], recommendations[]. Output JSON only.
Parsed: ${JSON.stringify({ contact: parsed.contact, summary: parsed.summary, experience: parsed.experience.slice(0, 8), skills: parsed.skills.slice(0, 50) }).slice(0, 14000)}`
        const result = await (model as any).generateContent({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0, topP: 0, topK: 1, maxOutputTokens: 1600 },
        })
        const resp = await (result as any).response
        const out = resp.text()
        const match = out.match(/\{[\s\S]*\}/)
        if (match) suggestions = JSON.parse(match[0])
      } catch (e) {
        console.warn('Gemini suggestions failed (non-blocking):', e)
        suggestions = { strengths: [], improvements: [], recommendations: [] }
      }
    }

    // Enhance ALL improvements with Gemini for better, contextual suggestions
    if (genAI && scoring.improvements.length > 0) {
      try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
        const improvementsToEnhance = scoring.improvements.slice(0, 8) // Process up to 8 improvements

        const prompt = `You are an expert ATS resume editor and career coach. For each resume bullet point below, provide a significantly improved version that:
1. Uses strong action verbs (led, achieved, increased, developed, etc.)
2. Includes specific metrics and quantifiable results (%, $, numbers, time saved)
3. Shows business impact and outcomes
4. Is concise but impactful (ideally 1-2 lines)
5. Maintains the original context and experience

Current resume bullets with issues:
${improvementsToEnhance.map((imp, idx) => `${idx + 1}. [${imp.category} - ${imp.priority} priority] "${imp.currentText}"\n   Issue: ${imp.reason}`).join('\n\n')}

Return ONLY valid JSON (no markdown):
{
  "improvements": [
    {"index": 0, "suggestedText": "Improved version with metrics and strong verbs", "reason": "Brief explanation of why this is better"},
    {"index": 1, "suggestedText": "Improved version", "reason": "Explanation"}
  ]
}`

        const result = await model.generateContent({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.3, topP: 0.8, topK: 40, maxOutputTokens: 3000 },
        })
        const resp = await result.response
        const out = resp.text()
        const match = out.match(/\{[\s\S]*\}/)
        if (match) {
          const geminiData = JSON.parse(match[0])
          if (geminiData.improvements && Array.isArray(geminiData.improvements)) {
            geminiData.improvements.forEach((s: any) => {
              if (s.index >= 0 && s.index < improvementsToEnhance.length && s.suggestedText) {
                const target = improvementsToEnhance[s.index]
                const idx = scoring.improvements.findIndex(
                  (imp) =>
                    imp.currentText === target.currentText && imp.category === target.category
                )
                if (idx >= 0) {
                  scoring.improvements[idx].suggestedText = s.suggestedText
                  if (s.reason && s.reason.trim().length > 0) {
                    scoring.improvements[idx].reason = s.reason
                  }
                }
              }
            })
          }
        }
      } catch (err) {
        console.warn('Gemini improvement rewrite failed (non-blocking):', err)
      }
    }

    // Add category-specific improvements based on low scores
    if (scoring.breakdown.formatCompatibility < 15) {
      scoring.improvements.push({
        category: 'Format & Structure',
        priority: 'high',
        currentText: 'Resume may have format compatibility issues',
        suggestedText:
          'Convert to a clean, single-column PDF format. Remove tables, text boxes, and embedded images. Use standard section headers (Experience, Education, Skills).',
        reason:
          'ATS systems parse simple, clean formats best. Complex layouts can cause parsing errors and reduce your visibility.',
        scoreImpact: '6',
      })
    }

    if (scoring.breakdown.sectionCompleteness < 10) {
      scoring.improvements.push({
        category: 'Section Completeness',
        priority: 'medium',
        currentText: 'Some resume sections may be incomplete',
        suggestedText:
          'Ensure all sections are complete: Contact info (name, email, phone, LinkedIn), Professional Summary, Work Experience (with dates and bullets), Education (degree, school, dates), Skills section.',
        reason:
          'Complete sections help ATS systems categorize and score your resume more accurately.',
        scoreImpact: '5',
      })
    }

    // Ensure suggestedText fallback always present
    try {
      scoring.improvements = scoring.improvements.map((imp) => ({
        ...imp,
        suggestedText:
          imp.suggestedText && imp.suggestedText.trim()
            ? imp.suggestedText
            : 'See common improvement examples.',
      }))
    } catch (e) {
      console.error('Improvements post-processing failed:', e)
    }

    // Compute keyword analysis for transparency (needed for keyword improvements)
    const normalized = parsed.rawText.toLowerCase()
    const matched: string[] = []
    const missing: string[] = []
    for (const kw of jdKeywords) {
      const k = kw.toLowerCase()
      const list = [k, ...((aliases && aliases[kw]) || [])]
      const found = list.some((term) =>
        new RegExp(`(^|\\W)${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?=$|\\W)`, 'i').test(
          normalized
        )
      )
      if (found) matched.push(kw)
      else missing.push(kw)
    }
    const matchRate = jdKeywords.length ? Math.round((matched.length / jdKeywords.length) * 100) : 0

    // Add keyword improvements if keyword score is low
    if (scoring.breakdown.keywordOptimization < 15 && missing.length > 0) {
      const missingKeywords = missing.slice(0, 5)
      scoring.improvements.push({
        category: 'Keywords',
        priority: 'high',
        currentText: `Missing critical keywords: ${missingKeywords.join(', ')}`,
        suggestedText: `Add these keywords naturally throughout your resume: ${missingKeywords.join(', ')}. Incorporate them in your experience bullets, skills section, and summary.`,
        reason: `ATS systems prioritize resumes with job-relevant keywords. Adding these ${missingKeywords.length} keywords can significantly improve your ranking.`,
        scoreImpact: '8',
      })
    }

    // Convert Gemini recommendation objects to strings
    const formatGeminiRecommendation = (rec: any): string => {
      if (typeof rec === 'string') return rec
      if (typeof rec !== 'object' || !rec) return ''

      // Format: "Issue: description. Action: what to do. Example: example"
      const parts: string[] = []
      if (rec.issue) parts.push(rec.issue)
      if (rec.action) parts.push(`Action: ${rec.action}`)
      if (rec.example) parts.push(`Example: ${rec.example}`)
      if (rec.examples && Array.isArray(rec.examples) && rec.examples.length > 0) {
        parts.push(`Example: ${rec.examples[0]}`)
      }

      return parts.length > 0 ? parts.join('. ') : JSON.stringify(rec)
    }

    const geminiRecommendations = (geminiKW?.raw?.recommendations || [])
      .map(formatGeminiRecommendation)
      .filter((r: string) => r.trim().length > 0)
    const suggestionsRecommendations = (suggestions.recommendations || [])
      .map((r: any) => (typeof r === 'string' ? r : formatGeminiRecommendation(r)))
      .filter((r: string) => r.trim().length > 0)

    // Recalculate overall score from breakdown to ensure consistency
    // The overall score should equal the sum of all breakdown values
    const recalculatedOverallScore = Math.min(
      100,
      Math.max(
        0,
        scoring.breakdown.formatCompatibility +
          scoring.breakdown.keywordOptimization +
          scoring.breakdown.impactAndMetrics +
          scoring.breakdown.actionVerbs +
          scoring.breakdown.sectionCompleteness
      )
    )

    // Final fallback: ensure we always have at least one improvement
    const finalImprovements =
      scoring.improvements && scoring.improvements.length > 0
        ? scoring.improvements
        : [
            {
              category: 'Resume Optimization',
              priority: 'medium' as const,
              currentText: 'Your resume is strong, but can always be optimized further',
              suggestedText:
                'Consider tailoring your resume for specific job descriptions by adding relevant keywords, quantifying achievements with specific metrics, and using strong action verbs.',
              reason:
                'Continuous optimization helps improve ATS matching and makes your resume stand out to recruiters.',
              scoreImpact: '5',
            },
          ]

    const finalResult = {
      version: scoring.version,
      hash,
      overallScore: recalculatedOverallScore,
      breakdown: scoring.breakdown,
      breakdownMax: scoring.breakdownMax,
      priorityIssues: scoring.priorityIssues,
      lineByLine: scoring.lineByLine,
      strengths: [...scoring.strengths, ...(suggestions.strengths || [])],
      improvements: finalImprovements,
      recommendations: [
        ...scoring.recommendations,
        ...suggestionsRecommendations,
        ...geminiRecommendations,
      ],
      keywordAnalysis: { matched, missing, matchRate, keywordsUsed: jdKeywords, aliases },
      geminiKeywordAnalysis: geminiKW?.raw || null,
      parseCoverage: scoring.parseCoverage || 0,
    }
    cache.set(
      hash + (jobDesc ? `:${crypto.createHash('sha1').update(jobDesc).digest('hex')}` : ''),
      finalResult
    )

    return NextResponse.json(finalResult)
  } catch (error: any) {
    console.error('ATS Analysis Error (outer):', error)
    const message = typeof error?.message === 'string' ? error.message : 'Failed to analyze resume'
    return NextResponse.json({ errorCode: 'UNKNOWN', message }, { status: 500 })
  }
}
