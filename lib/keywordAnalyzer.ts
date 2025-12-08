import geminiService from './geminiService'

export interface KeywordAnalysisResult {
  score25: number
  raw: any
}

function qualityToScore(quality?: string): number {
  const q = (quality || '').toLowerCase()
  if (q === 'excellent') return 100
  if (q === 'good') return 80
  if (q === 'fair') return 60
  if (q === 'poor') return 30
  return 50
}

export async function analyzeKeywords(
  resumeText: string,
  jobDescription?: string,
  jdKeywords?: string[]
): Promise<KeywordAnalysisResult> {
  if (jobDescription && jobDescription.trim().length > 0) {
    const prompt = buildJobMatchPrompt(resumeText, jobDescription, jdKeywords)
    try {
      const analysis = await geminiService.generateStructuredContent(prompt)
      console.log('[Gemini] JD Analysis received:', JSON.stringify(analysis, null, 2))

      const matchScore = analysis.matchScore || 0
      const hardSkillsMatch = analysis?.skillsBreakdown?.hardSkills?.matchRate || 0
      const softSkillsMatch = analysis?.skillsBreakdown?.softSkills?.matchRate || 0

      let weighted = matchScore * 0.5 + hardSkillsMatch * 0.35 + softSkillsMatch * 0.15

      // Boost if many keywords matched
      const matched = analysis.matchedKeywords || []
      const missing = analysis.missingKeywords || []
      const totalKW = matched.length + missing.length
      if (totalKW > 0) {
        const matchRatio = matched.length / totalKW
        weighted = Math.max(weighted, matchRatio * 100)
      }

      const score25 = Math.round((weighted / 100) * 25)
      const finalScore = Math.max(score25, matched.length > 0 ? 8 : 0)

      console.log(
        `[Gemini] JD Keyword Score: ${finalScore}/25 (matchScore: ${matchScore}, hardSkills: ${hardSkillsMatch}%, matched: ${matched.length}/${totalKW})`
      )

      return { score25: finalScore, raw: analysis }
    } catch (e) {
      console.error('[Gemini] JD keyword analysis failed:', e)
      throw e
    }
  }

  const prompt = buildBaselinePrompt(resumeText)
  try {
    const analysis = await geminiService.generateStructuredContent(prompt)
    console.log('[Gemini] Baseline Analysis received:', JSON.stringify(analysis, null, 2))

    const optimization = analysis.optimizationScore || 0
    const atsReadiness = analysis?.atsReadiness?.score || 0
    const hardSkillsQuality = qualityToScore(analysis?.keywordsFound?.hardSkills?.quality)
    const distAssess = (analysis?.keywordDistribution?.assessment || '').toLowerCase()
    const distributionQuality =
      distAssess === 'well-distributed'
        ? 100
        : distAssess === 'concentrated'
          ? 60
          : distAssess === 'sparse'
            ? 30
            : 50

    let weighted =
      optimization * 0.4 + atsReadiness * 0.3 + hardSkillsQuality * 0.2 + distributionQuality * 0.1

    // Boost if resume has good keyword variety
    const hardSkills = analysis?.keywordsFound?.hardSkills?.list || []
    if (hardSkills.length >= 10) weighted = Math.max(weighted, 70)
    else if (hardSkills.length >= 5) weighted = Math.max(weighted, 50)

    const score25 = Math.round((weighted / 100) * 25)
    const finalScore = Math.max(score25, hardSkills.length > 0 ? 12 : 0)

    console.log(
      `[Gemini] Baseline Keyword Score: ${finalScore}/25 (optimization: ${optimization}, atsReadiness: ${atsReadiness}, hardSkills: ${hardSkills.length}, inferredRole: ${analysis.inferredRole || 'unknown'})`
    )

    return { score25: finalScore, raw: analysis }
  } catch (e) {
    console.error('[Gemini] Baseline keyword analysis failed:', e)
    throw e
  }
}

function buildJobMatchPrompt(
  resumeText: string,
  jobDescription: string,
  jdKeywords?: string[]
): string {
  const seed =
    jdKeywords && jdKeywords.length
      ? `\n\nSEED_KEYWORDS_FROM_JD: ${jdKeywords.join(', ').slice(0, 800)}`
      : ''
  return `You are an expert ATS keyword analyzer. Analyze how well a resume matches a job description. Return ONLY valid JSON (no markdown, no code blocks).

Required JSON structure:
{
  "matchScore": <0-100 number>,
  "skillsBreakdown": {
    "hardSkills": {"matchRate": <0-100>},
    "softSkills": {"matchRate": <0-100>},
    "tools": {"matchRate": <0-100>}
  },
  "matchedKeywords": ["keyword1", "keyword2"],
  "missingKeywords": ["keyword3", "keyword4"],
  "recommendations": [
    {"priority": "high|medium|low", "issue": "description", "action": "what to do", "example": "example"}
  ]
}

${seed}

RESUME TEXT:
${resumeText.slice(0, 28000)}

JOB DESCRIPTION:
${jobDescription.slice(0, 28000)}

Analyze semantic matches (e.g., "JavaScript" matches "JS", "React dev", "Node.js"). Be generous with matches. Count implicit matches where skills are demonstrated through experience. Return ONLY the JSON object.`
}

function buildBaselinePrompt(resumeText: string): string {
  return `You are an expert ATS keyword analyzer. Analyze resume keyword optimization WITHOUT a job description. Return ONLY valid JSON (no markdown, no code blocks).

CRITICAL: First infer the candidate's target role/industry from their resume, then suggest keywords RELEVANT to that specific role. DO NOT suggest random programming languages or tech stacks unless they match the candidate's background.

Required JSON structure:
{
  "inferredRole": "<inferred job role/career path based on resume>",
  "inferredIndustry": "<inferred industry>",
  "optimizationScore": <0-100>,
  "atsReadiness": {"score": <0-100>, "level": "excellent|good|fair|poor"},
  "keywordsFound": {
    "hardSkills": {"quality": "excellent|good|fair|poor", "list": ["skill1", "skill2"]},
    "softSkills": {"list": ["skill1"]},
    "tools": {"list": ["tool1"]}
  },
  "keywordDistribution": {"assessment": "well-distributed|concentrated|sparse"},
  "recommendations": [
    {
      "priority": "high|medium|low", 
      "category": "category", 
      "issue": "description", 
      "action": "what to do - MUST be relevant to the inferred role/industry", 
      "examples": ["example1 - MUST match the candidate's career path"]
    }
  ]
}

RESUME TEXT:
${resumeText.slice(0, 30000)}

IMPORTANT INSTRUCTIONS:
1. First analyze the resume to determine:What role is this person targeting? (e.g., Software Engineer, Data Scientist, Product Manager, Marketing Manager, etc.)
2. Base ALL recommendations on that inferred role
3. For keyword recommendations: ONLY suggest keywords relevant to their specific career path
4. DO NOT recommend random programming languages (e.g., don't suggest Python to a Marketing Manager, or Java to a Data Scientist who uses Python)
5. If resume shows backend experience with Python/Django, don't suggest frontend frameworks like React/Vue
6. Match recommendations to their actual skill set and career trajectory
7. Be generous - if resume has 5+ hard skills, optimizationScore should be at least 60

Example of GOOD recommendations:
- If resume shows Python/Django backend work → suggest "API design, microservices, PostgreSQL, Docker"
- If resume shows data science → suggest "machine learning, statistical analysis, data visualization"
- If resume shows frontend → suggest "responsive design, accessibility, performance optimization"

Example of BAD recommendations (AVOID):
- Suggesting "JavaScript, TypeScript, Java, Kotlin, Swift" to someone with no web/mobile dev experience
- Suggesting unrelated tech stacks just because they're popular
- Generic lists of programming languages

Return ONLY the JSON object.`
}
