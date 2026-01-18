import type { SegmentedResume } from './segment'

export interface ScoreBreakdown {
  formatCompatibility: number
  keywordOptimization: number
  impactAndMetrics: number
  actionVerbs: number
  sectionCompleteness: number
}

export interface LineIssue {
  type: string
  detail: string
}

export interface LineFeedback {
  section?: 'summary' | 'experience' | 'skills' | 'education'
  index: number
  text: string
  issues: LineIssue[]
  score: number // 0-10
  potentialScore: number // 0-10
}

export interface ScoreResult {
  version: string
  overallScore: number
  breakdown: ScoreBreakdown
  priorityIssues: Array<{ level: 'critical' | 'high' | 'medium'; message: string }>
  breakdownMax: ScoreBreakdown
  lineByLine: LineFeedback[]
  strengths: Array<{ category: string; description: string; impact: string; exampleText?: string }>
  improvements: Array<{
    category: string
    priority: 'high' | 'medium' | 'low'
    currentText?: string
    suggestedText?: string
    reason: string
    scoreImpact: string
  }>
  recommendations: string[]
  parseCoverage: number // percent of text parseable, 0–100
}

export interface ScoreOptions {
  weights?: Partial<ScoreBreakdown>
  keywords?: string[]
  aliases?: Record<string, string[]>
  level?: 'entry' | 'mid' | 'senior' | 'exec'
  semanticMatch?: number // 0-100
  mime?: string
  fileSize?: number
}

const DEFAULT_WEIGHTS: ScoreBreakdown = {
  formatCompatibility: 20,
  keywordOptimization: 25,
  impactAndMetrics: 25,
  actionVerbs: 15,
  sectionCompleteness: 15,
}

const STRONG_ACTION_VERBS = {
  leadership: [
    'led',
    'managed',
    'directed',
    'supervised',
    'coordinated',
    'oversaw',
    'spearheaded',
    'headed',
    'orchestrated',
    'guided',
    'mentored',
    'coached',
    'championed',
    'drove',
    'pioneered',
    'initiated',
    'founded',
    'established',
  ],
  achievement: [
    'achieved',
    'accomplished',
    'delivered',
    'exceeded',
    'surpassed',
    'attained',
    'completed',
    'secured',
    'won',
    'earned',
    'gained',
  ],
  improvement: [
    'improved',
    'enhanced',
    'optimized',
    'streamlined',
    'increased',
    'boosted',
    'strengthened',
    'upgraded',
    'refined',
    'elevated',
    'maximized',
    'accelerated',
    'advanced',
    'amplified',
  ],
  creation: [
    'created',
    'developed',
    'built',
    'designed',
    'launched',
    'established',
    'formulated',
    'generated',
    'produced',
    'constructed',
    'engineered',
    'architected',
    'implemented',
    'deployed',
    'introduced',
  ],
  reduction: [
    'reduced',
    'decreased',
    'minimized',
    'eliminated',
    'cut',
    'slashed',
    'saved',
    'lowered',
    'diminished',
    'curtailed',
  ],
  transformation: [
    're-engineered',
    'transformed',
    'restructured',
    'revamped',
    'overhauled',
    'modernized',
    'automated',
    'digitized',
    'migrated',
    'converted',
  ],
  analysis: [
    'analyzed',
    'evaluated',
    'assessed',
    'examined',
    'investigated',
    'researched',
    'studied',
    'measured',
    'audited',
    'diagnosed',
    'identified',
    'determined',
    'calculated',
    'estimated',
    'forecasted',
  ],
  communication: [
    'presented',
    'communicated',
    'reported',
    'documented',
    'briefed',
    'articulated',
    'conveyed',
    'demonstrated',
    'illustrated',
  ],
  collaboration: [
    'collaborated',
    'partnered',
    'facilitated',
    'engaged',
    'unified',
    'aligned',
    'integrated',
    'synchronized',
  ],
  strategy: [
    'strategized',
    'planned',
    'devised',
    'conceptualized',
    'crafted',
    'formulated',
    'shaped',
    'outlined',
  ],
  execution: [
    'executed',
    'performed',
    'conducted',
    'operated',
    'administered',
    'processed',
    'handled',
    'delivered',
    'shipped',
    'rolled',
    'rolled out',
  ],
  growth: [
    'grew',
    'expanded',
    'scaled',
    'multiplied',
    'extended',
    'broadened',
    'diversified',
    'penetrated',
    'captured',
  ],
}
const ALL_STRONG_VERBS: string[] = Object.values(STRONG_ACTION_VERBS).flat()
const WEAK_VERBS = [
  'responsible for',
  'helped',
  'assisted',
  'worked on',
  'participated in',
  'involved in',
  'tasked with',
]
const METRIC_REGEX =
  /((\$\s?)?\d[\d,.]*\s*(k|m|b|million|billion)?)|(\d+(\.\d+)?\s*%)|(\d+(\.\d+)?\s*(days?|weeks?|months?|years?|hrs?|hours?))/i

function wordCount(s: string): number {
  const m = s.match(/\b\w+\b/g)
  return m ? m.length : 0
}

function normalizeToken(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9+.#]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function buildKeywordSet(
  keywords: string[] = [],
  aliases: Record<string, string[]> = {}
): Set<string> {
  const set = new Set<string>()
  for (const kw of keywords) {
    set.add(normalizeToken(kw))
    const als = aliases[kw] || []
    for (const a of als) set.add(normalizeToken(a))
  }
  return set
}

export function scoreResume(parsed: SegmentedResume, opts: ScoreOptions = {}): ScoreResult {
  const weights = { ...DEFAULT_WEIGHTS, ...(opts.weights || {}) }
  const normalizedText = normalizeToken(parsed.rawText)

  // Calculate parse coverage (word-based with section weighting)
  const totalWords = wordCount(parsed.rawText)
  let parsedWords = 0

  // Section weights - reflect importance and avoid double-counting
  const sectionWeights = {
    contact: 1.0,
    summary: 1.0,
    experienceHeader: 0.5, // Headers less important
    experienceBullets: 1.0, // Main content
    skills: 0.6, // Often just keywords
    education: 0.8, // Usually shorter sections
  }

  // Contact information
  if (parsed.contact) {
    Object.values(parsed.contact).forEach((val) => {
      if (val) parsedWords += wordCount(val) * sectionWeights.contact
    })
  }

  // Summary
  if (parsed.summary) {
    parsedWords += wordCount(parsed.summary) * sectionWeights.summary
  }

  // Experience (main content)
  parsed.experience.forEach((e) => {
    if (e.header) parsedWords += wordCount(e.header) * sectionWeights.experienceHeader
    e.bullets.forEach((b) => (parsedWords += wordCount(b) * sectionWeights.experienceBullets))
  })

  // Skills
  parsed.skills.forEach((s) => {
    parsedWords += wordCount(s) * sectionWeights.skills
  })

  // Education
  parsed.education.forEach((e) => {
    if (e.school) parsedWords += wordCount(e.school) * sectionWeights.education
    if (e.degree) parsedWords += wordCount(e.degree) * sectionWeights.education
    if (e.dates) parsedWords += wordCount(e.dates) * sectionWeights.education * 0.5 // Dates less important
  })

  // Calculate coverage percentage
  const parseCoverage =
    totalWords > 0 ? Math.min(100, Math.round((parsedWords / totalWords) * 100)) : 0

  // 1) FormatCompatibility (20) - realistic ATS-focused scoring
  const realisticFormat20 = (() => {
    let score = 0 // Start at 0, earn points for good practices

    // File type scoring
    const m = (opts as any).mime as string | undefined
    if (m) {
      const mime = m.toLowerCase()
      if (mime.includes('pdf'))
        score += 8 // PDF is best
      else if (mime.includes('word') || mime.includes('officedocument'))
        score += 6 // DOCX ok
      else if (mime.includes('msword'))
        score += 4 // DOC less ideal
      else score += 0 // Wrong type: no points
    } else {
      score += 5 // Unknown but parseable
    }

    // Critical ATS-breaking issues (harsh penalties)
    const hasTables = /\btable\b|\|\s*[-|]+\s*\|/.test(parsed.rawText)
    const hasTextBoxes = /text\s*box/i.test(parsed.rawText)
    const hasEmbeddedImages = /(image:|data:image|<img)/i.test(parsed.rawText)
    if (hasTables) score -= 8 // Tables break ATS parsing badly
    if (hasTextBoxes) score -= 8 // Text boxes not parseable
    if (hasEmbeddedImages) score -= 10 // Images completely unparseable

    // Multi-column layout issues
    const looksThreePlus = /\s{12,}\S/.test(parsed.rawText)
    if (looksThreePlus) score -= 4 // Multi-column confuses parsers

    // Award points for good practices
    const dateUniform =
      /(\b\d{2}\/\d{4}\b|\b(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s+\d{4}\b)/i.test(
        parsed.rawText
      )
    if (dateUniform) score += 4 // Consistent date formatting

    const hasGoodLength = parsed.rawText.length >= 400 && parsed.rawText.length <= 3000
    if (hasGoodLength) score += 4 // Appropriate resume length

    const standardBullets = /^[\s]*[-•*]\s+/m.test(parsed.rawText)
    if (standardBullets) score += 3 // Standard bullet points

    const noSpacingIssues = !/\s{6,}/.test(parsed.rawText)
    if (noSpacingIssues) score += 3 // Clean spacing

    return Math.max(0, Math.min(20, score))
  })()

  const formatScore = realisticFormat20

  // 2) KeywordOptimization (25) recalibrated baseline when no JD
  const keywordSet = buildKeywordSet(opts.keywords, opts.aliases || {})
  let keywordScore = 0
  if (keywordSet.size > 0) {
    let keywordHits = 0
    for (const kw of keywordSet) {
      const re = new RegExp(`(^|\\W)${escapeRegExp(kw)}(?=$|\\W)`, 'i')
      if (re.test(normalizedText)) keywordHits++
    }
    const coverage = keywordHits / Math.max(1, keywordSet.size)
    let stuffingPenalty = 0
    for (const kw of keywordSet) {
      const reAll = new RegExp(`(^|\\W)${escapeRegExp(kw)}(?=$|\\W)`, 'gi')
      const count = (normalizedText.match(reAll) || []).length
      if (count >= 7) stuffingPenalty += 0.05
    }
    let keywordRaw = coverage * 25
    keywordRaw = Math.max(0, keywordRaw - 25 * stuffingPenalty)
    keywordScore = Math.min(25, Math.round(keywordRaw))
  } else {
    // NO JD: Only award minimal points for basic technical competence
    // This is NOT optimization - that requires a target JD
    const resumeText = normalizedText
    let base = 0
    // Basic technical skills presence (max 2 points total)
    if (
      /\b(python|javascript|react|node|sql|aws|azure|docker|kubernetes|java|c\+\+|typescript|angular|vue)\b/i.test(
        resumeText
      )
    )
      base += 1
    // Quantification present (1 point)
    if (/\d+%|\$[\d,]+|(increased|decreased|improved|reduced)/i.test(resumeText)) base += 1
    // Leadership language (1 point)
    if (/\b(led|managed|directed|spearheaded|coordinated|supervised)\b/i.test(resumeText)) base += 1
    // Collaboration language (1 point)
    if (/(cross-functional|collaborated|partnered|stakeholder|team)/i.test(resumeText)) base += 1
    // Modern methodologies (1 point)
    if (/(agile|scrum|lean|six sigma|waterfall|kanban)/i.test(resumeText)) base += 0.5
    // Business tools (0.5 points)
    if (/(excel|tableau|power bi|salesforce|jira|confluence|slack|figma)/i.test(resumeText))
      base += 0.5
    // Cap at 5/25 - without JD, cannot truly optimize keywords
    keywordScore = Math.min(5, Math.round(base))
  }

  // 3) ImpactAndMetrics (25)
  const bullets = parsed.bullets
  const withMetrics = bullets.filter((b) => METRIC_REGEX.test(b)).length
  const density = bullets.length ? withMetrics / bullets.length : 0
  const outcomes =
    /(revenue|cost|margin|profit|retention|churn|nps|engagement|conversion|latency|uptime|availability|sla)/i
  const outcomeHits = bullets.filter((b) => outcomes.test(b)).length
  // Minimal baseline - must earn points through metrics
  const impact = Math.max(
    0.05, // Very low baseline (1.25/25 points) - must have metrics to score well
    density * 0.75 + (bullets.length ? outcomeHits / bullets.length : 0) * 0.25
  )
  const impactScore = Math.min(
    weights.impactAndMetrics,
    Math.round(impact * weights.impactAndMetrics)
  )

  // 4) ActionVerbs (reworked generous 0–4 scale based on strong verb starts)
  const detectStrongStart = (s: string) => {
    const first = s
      .trim()
      .split(/\s+/)[0]
      ?.toLowerCase()
      .replace(/[^a-z-]/g, '')
    if (!first) return false
    if (ALL_STRONG_VERBS.includes(first)) return true
    if (first.endsWith('ed')) {
      const root = first.slice(0, -2)
      return ALL_STRONG_VERBS.some((v) => v.startsWith(root))
    }
    return false
  }
  let strongStarts = 0
  for (const b of bullets) if (detectStrongStart(b)) strongStarts++
  const strongPct = bullets.length ? (strongStarts / bullets.length) * 100 : 0
  let actionVerbs4 = 0
  if (strongPct >= 85) actionVerbs4 = 4
  else if (strongPct >= 70) actionVerbs4 = 3
  else if (strongPct >= 55) actionVerbs4 = 3
  else if (strongPct >= 40) actionVerbs4 = 2
  else if (strongPct >= 25) actionVerbs4 = 1
  // retain weak verb penalty only if not strong
  const strong = strongStarts
  let weak = 0
  for (const b of bullets) {
    if (!detectStrongStart(b)) {
      if (
        /^(responsible for|helped|assisted|worked on|participated in|involved in|tasked with)\b/i.test(
          b.trim()
        )
      )
        weak++
    }
  }
  const strongRatio = bullets.length ? strong / bullets.length : 0
  const weakRatio = bullets.length ? weak / bullets.length : 0
  // Strict scoring: must have strong verbs to score well
  let verbs = strongRatio * 0.9 - weakRatio * 0.4
  if (weakRatio === 0 && strongRatio === 0) verbs = 0.15 // Minimal baseline for neutral verbs
  verbs = Math.max(0, Math.min(1, verbs))
  const verbsScore = Math.min(
    weights.actionVerbs,
    Math.round((actionVerbs4 / 4) * weights.actionVerbs)
  )

  // 5) SectionCompleteness (15)
  let completeness = 0
  const c = parsed.contact
  if (c.email) completeness += 3
  if (c.phone) completeness += 3
  if (c.linkedin) completeness += 3
  if (c.location) completeness += 2
  if (parsed.summary && parsed.summary.split(/\n/).join(' ').trim().length > 40) completeness += 2
  if (parsed.experience.length > 0 && parsed.education.length > 0 && parsed.skills.length > 0)
    completeness += 2
  const completenessScore = Math.min(
    weights.sectionCompleteness,
    Math.round((completeness / 15) * weights.sectionCompleteness)
  )

  const breakdown: ScoreBreakdown = {
    formatCompatibility: formatScore,
    keywordOptimization: keywordScore,
    impactAndMetrics: impactScore,
    actionVerbs: verbsScore,
    sectionCompleteness: completenessScore,
  }

  // Realistic ATS Score Calculation (no artificial inflation)
  const rawScore =
    breakdown.formatCompatibility +
    breakdown.keywordOptimization +
    breakdown.impactAndMetrics +
    breakdown.actionVerbs +
    breakdown.sectionCompleteness

  // Score bands - REALISTIC distribution:
  // - Exceptional: 85–100 (top 5%)
  // - Good: 70–84 (top 25%)
  // - Average: 55–69 (50% of resumes)
  // - Below Average: 40–54 (15%)
  // - Poor: <40 (5%, nearly empty/unparsable)

  function curveScore(unscaled: number, parseCoverage: number) {
    // Only apply minimal curve for edge cases
    if (parseCoverage < 15 || unscaled < 10) return Math.max(15, Math.round(unscaled)) // Nearly blank
    if (unscaled > 95) return 98 // Cap exceptional at 98
    // Linear scoring for most cases - no inflation
    return Math.round(unscaled)
  }
  let overall = curveScore(rawScore, parseCoverage)
  // Realistic floor: only prevent scores below 25 for parseable content
  overall = Math.min(100, Math.max(overall, parseCoverage > 60 ? 40 : 25))

  const priorityIssues: ScoreResult['priorityIssues'] = []
  if (withMetrics === 0)
    priorityIssues.push({ level: 'critical', message: 'No quantifiable metrics found in bullets' })
  if (keywordSet.size > 0 && keywordScore < weights.keywordOptimization * 0.4)
    priorityIssues.push({ level: 'high', message: 'Low coverage of target keywords' })
  if (!c.linkedin) priorityIssues.push({ level: 'medium', message: 'LinkedIn profile missing' })

  // Line-by-line feedback (deterministic)
  const lineByLine: LineFeedback[] = []
  bullets.forEach((b, idx) => {
    const issues: LineIssue[] = []
    let score = 10
    // Strong verb detection
    const isStrong = detectStrongStart(b)
    if (!isStrong) {
      if (
        /^(responsible for|helped|assisted|worked on|participated in|involved in|tasked with)\b/i.test(
          b.trim()
        )
      ) {
        issues.push({ type: 'weakVerb', detail: 'Starts with weak verb' })
        score -= 2
      } else {
        issues.push({ type: 'neutralVerb', detail: 'Consider a stronger action verb' })
        score -= 1
      }
    }
    // Metrics
    const hasMetrics = METRIC_REGEX.test(b)
    if (!hasMetrics) {
      issues.push({
        type: 'noMetrics',
        detail:
          'Add quantifiable metrics: percentages (%), dollar amounts ($), timeframes, or numbers (e.g., "increased revenue by 30%", "managed team of 8")',
      })
      score -= 2 // gentler
    }
    const wc = wordCount(b)
    if (wc > 200) {
      issues.push({
        type: 'tooLong',
        detail: `Too long (${wc} chars). Consider shortening for readability`,
      })
      score -= 1
    }
    score = Math.max(0, Math.min(10, score))
    lineByLine.push({
      section: 'experience',
      index: idx,
      text: b,
      issues,
      score,
      potentialScore: 10,
    })
  })

  // Generate deterministic strengths/improvements/recommendations
  const strengths: ScoreResult['strengths'] = []
  const improvements: ScoreResult['improvements'] = []
  const recommendations: string[] = []

  // Strengths
  if (formatScore >= weights.formatCompatibility * 0.7) {
    strengths.push({
      category: 'Format & Structure',
      description: 'Resume has clean, ATS-friendly formatting',
      impact: 'Easy for ATS systems to parse and extract information',
    })
  }
  if (impactScore >= weights.impactAndMetrics * 0.6) {
    const goodBullets = lineByLine.filter((l) => l.score >= 7)
    if (goodBullets.length > 0) {
      strengths.push({
        category: 'Quantifiable Achievements',
        description: `${goodBullets.length} bullet${goodBullets.length > 1 ? 's' : ''} with strong metrics and impact`,
        impact: 'Demonstrates measurable results',
        exampleText: goodBullets[0]?.text.substring(0, 100),
      })
    }
  }
  if (verbsScore >= weights.actionVerbs * 0.7) {
    strengths.push({
      category: 'Action-Oriented Language',
      description: 'Strong use of action verbs to start bullet points',
      impact: 'Shows leadership and impact',
    })
  }
  if (completenessScore >= weights.sectionCompleteness * 0.8) {
    strengths.push({
      category: 'Complete Information',
      description: 'All essential sections are present and well-organized',
      impact: 'Provides comprehensive view of qualifications',
    })
  }
  if (parsed.skills.length >= 5) {
    strengths.push({
      category: 'Skills Section',
      description: `Well-defined skills section with ${parsed.skills.length} skills`,
      impact: 'Easy for ATS to match against job requirements',
    })
  }

  // Improvements from line-by-line analysis (ACTIONABLE SUGGESTIONS)
  const bestPracticeExamples = {
    noMetrics: {
      label: 'Add Metrics',
      example: 'Increased sales by 25% over two years by optimizing lead generation strategies.',
    },
    weakVerb: {
      label: 'Use Strong Verbs',
      example:
        'Led cross-functional team to deliver a $2M product rollout three months ahead of schedule.',
    },
    tooShort: {
      label: 'Add Detail',
      example:
        'Automated monthly financial report process, saving 16 hours of manual labor per cycle.',
    },
    noOutcome: {
      label: 'Show Business Impact',
      example: 'Reduced customer churn by 15% by implementing a proactive engagement campaign.',
    },
    tooLong: {
      label: 'Make Concise',
      example: 'Consolidated five reporting tools into one dashboard, improving team efficiency.',
    },
  }

  // Generate improvements from low-scoring bullets (score < 8, not just < 7, to ensure we get some)
  let lowScoringBullets = lineByLine.filter((l) => l.score < 8 && l.issues.length > 0).slice(0, 5)

  // If no low-scoring bullets, get bullets with any issues (even if scoring 8-9)
  if (lowScoringBullets.length === 0) {
    lowScoringBullets = lineByLine.filter((l) => l.issues.length > 0).slice(0, 5)
  }

  // If still no bullets with issues, get the lowest scoring bullets regardless
  if (lowScoringBullets.length === 0 && lineByLine.length > 0) {
    lowScoringBullets = [...lineByLine]
      .sort((a, b) => a.score - b.score)
      .slice(0, Math.min(3, lineByLine.length))
  }

  lowScoringBullets.forEach((item, idx) => {
    const topIssue = item.issues[0] || {
      type: 'generic',
      detail:
        'This bullet point could be strengthened with more specific metrics and impact statements.',
    }
    let category = 'Content Quality'
    let priority: 'high' | 'medium' | 'low' = 'medium'
    let impact = '8'
    let example = ''

    if (topIssue.type === 'noMetrics') {
      category = 'Quantification'
      priority = 'high'
      impact = '12'
      example = bestPracticeExamples.noMetrics.example
    } else if (topIssue.type === 'weakVerb') {
      category = 'Weak Verbs'
      priority = 'high'
      impact = '10'
      example = bestPracticeExamples.weakVerb.example
    } else if (topIssue.type === 'noOutcome') {
      category = 'Impact Statements'
      priority = 'high'
      impact = '10'
      example = bestPracticeExamples.noOutcome.example
    } else if (topIssue.type === 'tooShort') {
      category = 'Content Depth'
      priority = 'medium'
      impact = '6'
      example = bestPracticeExamples.tooShort.example
    } else if (topIssue.type === 'tooLong') {
      category = 'Conciseness'
      priority = 'low'
      impact = '5'
      example = bestPracticeExamples.tooLong.example
    } else {
      // Generic improvement for bullets without specific issues
      category = 'Content Enhancement'
      priority = 'medium'
      impact = '6'
      example =
        'Enhanced version with quantified metrics and stronger action verbs will improve ATS ranking and readability.'
    }

    improvements.push({
      category,
      priority,
      currentText: item.text.substring(0, 150),
      suggestedText: example, // Will be overwritten by Gemini if available, otherwise a best-practice sample
      reason:
        topIssue.detail ||
        'This bullet point can be improved to better showcase your achievements and impact.',
      scoreImpact: impact,
    })
  })

  // Ensure we have at least some improvements by adding category-based ones if needed
  if (improvements.length === 0) {
    // Add improvements based on category scores, even if bullets are good
    if (impactScore < weights.impactAndMetrics * 0.8) {
      improvements.push({
        category: 'Quantification',
        priority: 'medium',
        currentText: 'Consider adding more quantified metrics to your experience bullets',
        suggestedText:
          'Add specific numbers, percentages, or dollar amounts to demonstrate impact (e.g., "Increased sales by 25%" or "Managed a team of 8 developers")',
        reason:
          'Metrics help quantify your achievements and make them more compelling to both ATS systems and hiring managers.',
        scoreImpact: '10',
      })
    }
    if (verbsScore < weights.actionVerbs * 0.8) {
      improvements.push({
        category: 'Action Verbs',
        priority: 'medium',
        currentText: 'Enhance action verbs in your bullet points',
        suggestedText:
          'Use stronger action verbs like "Led", "Developed", "Implemented", "Optimized", "Delivered" instead of weaker phrases like "responsible for" or "helped"',
        reason:
          'Strong action verbs create a more powerful narrative and better demonstrate leadership and impact.',
        scoreImpact: '8',
      })
    }
    if (keywordScore < weights.keywordOptimization * 0.7) {
      improvements.push({
        category: 'Keywords',
        priority: 'high',
        currentText: 'Incorporate more industry-relevant keywords',
        suggestedText:
          'Add relevant technical terms, tools, and skills that match your target job descriptions naturally throughout your resume',
        reason: 'Keywords help ATS systems identify your resume as a match for relevant positions.',
        scoreImpact: '12',
      })
    }

    // If still no improvements, add a general one to ensure we always have something
    if (improvements.length === 0) {
      improvements.push({
        category: 'Resume Enhancement',
        priority: 'medium',
        currentText: 'Continue to refine and optimize your resume',
        suggestedText:
          'Consider adding more quantifiable achievements, using stronger action verbs, and tailoring keywords to your target roles for even better ATS performance.',
        reason:
          'Even strong resumes can benefit from continuous improvement and optimization for specific roles.',
        scoreImpact: '5',
      })
    }
  }

  // Before returning recommendations, ensure at least 3 actionable market-competitive tips.
  while (recommendations.length < 3) {
    if (!recommendations.includes(bestPracticeExamples.noMetrics.example))
      recommendations.push('Example: ' + bestPracticeExamples.noMetrics.example)
    if (!recommendations.includes(bestPracticeExamples.weakVerb.example))
      recommendations.push('Example: ' + bestPracticeExamples.weakVerb.example)
    if (!recommendations.includes(bestPracticeExamples.noOutcome.example))
      recommendations.push('Example: ' + bestPracticeExamples.noOutcome.example)
  }

  // Recommendations from priority issues and analysis
  if (withMetrics === 0 || withMetrics / bullets.length < 0.3) {
    recommendations.push(
      'CRITICAL: Add quantifiable metrics to at least 40% of your bullet points. Include percentages (%), dollar amounts ($), timeframes, or specific numbers (e.g., "increased revenue by 30%", "managed team of 8 developers")'
    )
  }
  if (weak > strong) {
    recommendations.push(
      'HIGH PRIORITY: Replace weak action verbs (worked, helped, assisted, responsible for) with strong verbs (Led, Developed, Implemented, Optimized, Delivered, Launched)'
    )
  }
  if (impactScore < weights.impactAndMetrics * 0.5) {
    recommendations.push(
      'HIGH PRIORITY: Add business impact statements mentioning revenue, efficiency, cost savings, user growth, retention, or performance improvements'
    )
  }
  if (keywordScore < weights.keywordOptimization * 0.6) {
    recommendations.push(
      'MEDIUM PRIORITY: Incorporate more industry-specific keywords and technical terms relevant to your target roles'
    )
  }
  if (!c.linkedin) {
    recommendations.push(
      'MEDIUM PRIORITY: Add your LinkedIn profile URL to increase recruiter connections and verify professional presence'
    )
  }
  if (parsed.skills.length < 5) {
    recommendations.push(
      'MEDIUM PRIORITY: Expand your skills section with technical and soft skills relevant to your target positions'
    )
  }
  if (formatScore < weights.formatCompatibility * 0.7) {
    recommendations.push(
      'LOW PRIORITY: Ensure consistent date formatting (MM/YYYY or Month YYYY) and use standard bullet points for better ATS compatibility'
    )
  }

  // Two-tier scoring per spec
  // Tier 1: Parsability & Structure (50 points)
  const fileFormatScore = (() => {
    const mime = (opts as any).mime as string | undefined
    const size = (opts as any).fileSize as number | undefined
    let pts = 8 // default plain PDF/text
    if (mime) {
      const m = mime.toLowerCase()
      if (m.includes('pdf')) pts = 8
      if (m.includes('word') || m.includes('officedocument')) pts = 10
      if (m.includes('msword')) pts = 7
    }
    // crude scanned detection: if very low parseCoverage
    if (parseCoverage < 40) pts = Math.min(pts, 2)
    if (size && size > 2_000_000) pts = Math.max(0, pts - 2)
    return Math.max(0, Math.min(10, pts))
  })()

  const layoutStructureScore = (() => {
    // Heuristics: heavy spacing suggests multi/columns; tables rarely in raw text
    const multiColumnHints = /\s{10,}/.test(parsed.rawText) || /\|\s+\w+\s+\|/.test(parsed.rawText)
    const textBoxHints = /\bbox\b|text\s*box/i.test(parsed.rawText)
    const graphicsHints = /(chart|graph|diagram)/i.test(parsed.rawText)
    const headerFooterInfo = /(header|footer)/i.test(parsed.rawText)

    let base = multiColumnHints ? 8 : 10 // single-column default 10, two-column 8
    if (/\n.*\n.*\n/.test(parsed.rawText) && /\s{6,}/.test(parsed.rawText)) base = Math.min(base, 8)
    if (textBoxHints) base -= 3
    if (graphicsHints) base -= 2
    if (headerFooterInfo) base -= 2
    // margins unknown; small hit if lots of trailing spaces
    if (/\s{4,}$/.test(parsed.rawText)) base -= 1
    return Math.max(0, Math.min(10, base))
  })()

  const headersOrganizationScore = (() => {
    let pts = 0
    const hasExp = parsed.experience.length > 0
    const hasEdu = parsed.education.length > 0
    const hasSkills = parsed.skills.length > 0
    const hasContact = !!(parsed.contact?.email || parsed.contact?.phone)
    if (hasExp) pts += 2
    if (hasEdu) pts += 2
    if (hasSkills) pts += 2
    if (hasContact) pts += 2
    // bonus sections
    const hasSummary = !!parsed.summary && parsed.summary.trim().length > 0
    const bonusCandidates = [
      hasSummary,
      /cert/i.test(parsed.rawText),
      /project/i.test(parsed.rawText),
      /(accomplish|achieve)/i.test(parsed.rawText),
      /award/i.test(parsed.rawText),
      /publication/i.test(parsed.rawText),
      /volunteer/i.test(parsed.rawText),
    ]
    pts += Math.min(4, bonusCandidates.filter(Boolean).length)
    // deduction for creative headers
    const creative = /my\s+journey|what\s+i'?ve\s+done/i.test(parsed.rawText)
    if (creative) pts = Math.max(0, pts - 2)
    return Math.max(0, Math.min(8, pts))
  })()

  const parseSuccessRateScore = (() => {
    const rate = parseCoverage
    if (rate >= 95) return 12
    if (rate >= 90) return 10
    if (rate >= 85) return 8
    if (rate >= 80) return 6
    if (rate >= 75) return 4
    if (rate >= 70) return 2
    return 0
  })()

  const fontReadabilityScore = (() => {
    // We lack font metadata; approximate with bullet readability
    const longBullets = bullets.filter((b) => b.length > 150).length
    let pts = 4
    if (longBullets === 0) pts = 5
    if (longBullets >= 4) pts = Math.max(0, pts - 2)
    return Math.max(0, Math.min(5, pts))
  })()

  const resumeLengthScore = (() => {
    const totalChars = parsed.rawText.length
    const approxPages = Math.ceil(totalChars / 1800) // rough
    const level = (opts.level || 'mid') as 'entry' | 'mid' | 'senior' | 'exec'
    let pts = 5
    if (level === 'entry') pts = approxPages === 1 ? 5 : approxPages === 2 ? 3 : 0
    else if (level === 'mid') pts = approxPages <= 2 ? 5 : approxPages === 3 ? 3 : 0
    else pts = approxPages === 2 ? 5 : approxPages === 3 ? 3 : approxPages > 3 ? 0 : 5
    // deduct 0.5 per very long bullet (max -3)
    const overlong = bullets.filter((b) => b.length > 150).length
    pts -= Math.min(3, overlong * 0.5)
    return Math.max(0, Math.min(5, Math.round(pts)))
  })()

  const semantic = Math.max(0, Math.min(100, (opts as any).semanticMatch || 0))
  const semanticBoost = Math.round((semantic / 100) * 10) // up to +10

  const tier1Total =
    fileFormatScore +
    layoutStructureScore +
    headersOrganizationScore +
    parseSuccessRateScore +
    fontReadabilityScore +
    resumeLengthScore

  // Tier 2: Content Quality (50 points)
  // Hard skills
  const hardSkillsScore8 = (() => {
    const skillsCount = parsed.skills.length
    if (opts.keywords && opts.keywords.length > 0) {
      let matched = 0
      for (const kw of opts.keywords || []) {
        const re = new RegExp(`(^|\\W)${escapeRegExp(normalizeToken(kw))}(?=$|\\W)`, 'i')
        if (re.test(normalizedText)) matched++
      }
      const required = Math.max(1, (opts.keywords || []).length)
      return Math.min(8, Math.round((matched / required) * 8))
    }
    if (skillsCount >= 8) return 8
    if (skillsCount >= 5) return 5
    if (skillsCount >= 3) return 3
    return 0
  })()

  const softSkillsScore3 = (() => {
    const softs = [
      'leadership',
      'communication',
      'teamwork',
      'problem',
      'time management',
      'collaborat',
      'mentor',
      'present',
      'negotia',
    ]
    let hits = 0
    for (const b of bullets) {
      if (softs.some((s) => new RegExp(s, 'i').test(b))) hits++
    }
    const distinct = Math.min(3, Math.floor(hits / 3))
    return distinct
  })()

  const keywordDistribution4 = (() => {
    const critical =
      opts.keywords && opts.keywords.length > 0
        ? opts.keywords.slice(0, 10).map(normalizeToken)
        : parsed.skills.slice(0, 10).map(normalizeToken)
    let pts = 0
    for (const kw of critical) {
      const re = new RegExp(escapeRegExp(kw), 'i')
      const inSummary = parsed.summary ? re.test(parsed.summary) : false
      const inExp = bullets.some((b) => re.test(b))
      const inSkills = parsed.skills.some((s) => re.test(s))
      if ([inSummary, inExp, inSkills].filter(Boolean).length >= 2) pts += 0.5
      if (
        (normalizedText.match(new RegExp(`(^|\\W)${escapeRegExp(kw)}(?=$|\\W)`, 'gi')) || [])
          .length > 5
      )
        pts -= 1
    }
    return Math.max(0, Math.min(4, Math.round(pts)))
  })()

  const achievements8 = (() => {
    const withMetric = bullets.filter((b) => METRIC_REGEX.test(b)).length
    const ratio = bullets.length ? withMetric / bullets.length : 0
    if (ratio >= 0.6) return 8
    if (ratio >= 0.4) return 6
    if (ratio >= 0.2) return 4
    if (ratio >= 0.1) return 2
    return 0
  })()

  const grammarSpelling4 = (() => {
    // Heuristic: count double spaces, obvious typos like teh/recieve, dangling punctuation
    const issues =
      (parsed.rawText.match(/\s{2,}/g) || []).length +
      (parsed.rawText.match(/\bteh\b|\brecieve\b/gi) || []).length +
      (parsed.rawText.match(/\s[.,;:]/g) || []).length
    if (issues === 0) return 4
    if (issues <= 2) return 3
    if (issues <= 5) return 2
    if (issues <= 10) return 1
    return 0
  })()

  const buzzwords2 = (() => {
    const list = [
      'results-driven',
      'team player',
      'hard worker',
      'go-getter',
      'synergy',
      'rockstar',
      'ninja',
      'guru',
      'self-starter',
      'detail-oriented',
      'think outside the box',
      'thought leader',
      'best of breed',
    ]
    let count = 0
    for (const w of list)
      count += (normalizedText.match(new RegExp(escapeRegExp(w), 'gi')) || []).length
    if (count <= 1) return 2
    if (count <= 3) return 1
    return 0
  })()

  const summary2 = (() => {
    if (!parsed.summary) return 0
    const words = parsed.summary.split(/\s+/).length
    let pts = 0
    if (words >= 50 && words <= 150) pts += 1
    if (/\b\d+\+?\s*(years|yrs)\b/i.test(parsed.summary)) pts += 0.5
    if (/(engineer|marketing|finance|product|design|sales)/i.test(parsed.summary)) pts += 0.5
    if (words > 200) pts -= 1
    return Math.max(0, Math.min(2, pts))
  })()

  const contact8 = (() => {
    let pts = 0
    if (parsed.contact?.name || /\b[A-Z][a-z]+\s+[A-Z][a-z]+\b/.test(parsed.rawText)) pts += 1.5
    if (parsed.contact?.phone) pts += 1.5
    if (parsed.contact?.email) pts += 1.5
    if (parsed.contact?.location) pts += 0.5
    if (parsed.contact?.email && /cool|ninja|guru/i.test(parsed.contact.email)) pts -= 0.5
    if (parsed.contact?.linkedin) pts += 2
    if (/github\.com|portfolio|behance|dribbble/i.test(parsed.rawText)) pts += 1
    return Math.max(0, Math.min(8, Math.round(pts * 2) / 2))
  })()

  const experience4 = (() => {
    let pts = 0
    const positions = parsed.experience
    for (const pos of positions) {
      const hasBasics = !!pos?.header && pos.bullets && pos.bullets.length >= 2
      if (hasBasics) pts += 0.5
      if (/\b\d{2}\/\d{4}\b/i.test(pos?.header || '')) pts += 0.25
    }
    // small bonus for promotions
    if (/promot|advanc/i.test(parsed.rawText)) pts += 1
    // gaps detection out of scope with limited dates
    return Math.min(4, Math.round(pts * 2) / 2)
  })()

  const education3 = (() => {
    let pts = 0
    const edus = parsed.education
    if (edus.length > 0) {
      const e = edus[0]
      if (e.degree) pts += 1
      if (e.school) pts += 1
      if (e.dates) pts += 0.5
      if (/gpa\s*[=:]?\s*([3-4](?:\.\d+)?)/i.test(parsed.rawText)) pts += 0.5
    }
    return Math.min(3, Math.round(pts * 2) / 2)
  })()

  const tier2Total = Math.min(
    50,
    hardSkillsScore8 +
      softSkillsScore3 +
      keywordDistribution4 +
      achievements8 +
      actionVerbs4 +
      grammarSpelling4 +
      buzzwords2 +
      summary2 +
      contact8 +
      experience4 +
      education3 +
      semanticBoost
  )

  // Map into existing breakdown for UI (use realisticFormat20)
  const formatCompatMapped = Math.round((realisticFormat20 / 20) * weights.formatCompatibility)
  const keywordMapped = Math.round(
    ((hardSkillsScore8 + softSkillsScore3 + keywordDistribution4) / 15) *
      weights.keywordOptimization
  )
  const impactMapped = Math.round((achievements8 / 8) * weights.impactAndMetrics)
  const verbsMapped = Math.round((actionVerbs4 / 4) * weights.actionVerbs)
  const sectionMapped = Math.round(
    ((headersOrganizationScore + contact8 + education3) / (8 + 8 + 3)) * weights.sectionCompleteness
  )

  const mappedBreakdown: ScoreBreakdown = {
    formatCompatibility: Math.min(weights.formatCompatibility, formatCompatMapped),
    keywordOptimization: Math.min(weights.keywordOptimization, keywordMapped),
    impactAndMetrics: Math.min(weights.impactAndMetrics, impactMapped),
    actionVerbs: Math.min(weights.actionVerbs, verbsMapped),
    sectionCompleteness: Math.min(weights.sectionCompleteness, sectionMapped),
  }

  const finalScore = Math.min(100, tier1Total + tier2Total)

  // Gentle, accuracy-first market-aligned curve (only uplift when fundamentals are good)
  if (parseCoverage >= 80 && achievements8 >= 4) {
    overall = Math.min(100, Math.round(finalScore * 1.05))
  } else if (finalScore < 80 && finalScore > 65) {
    overall = Math.min(100, finalScore + 8)
  } else if (parseCoverage >= 70) {
    overall = Math.min(100, Math.round(finalScore * 1.03))
  } else {
    overall = finalScore
  }
  // overwrite breakdown with mapped one
  Object.assign(breakdown, mappedBreakdown)

  // Add recommendations based on low subscores
  if (hardSkillsScore8 <= 4)
    recommendations.push(
      'HIGH PRIORITY: Add hard skills aligned to your target roles. Include tools, frameworks, platforms (e.g., AWS, React, SQL).'
    )
  if (achievements8 <= 4)
    recommendations.push(
      'HIGH PRIORITY: Add quantified achievements to at least 40% of bullets (%, $, time saved, team size).'
    )
  if (layoutStructureScore <= 6)
    recommendations.push(
      'MEDIUM PRIORITY: Prefer single-column layout with standard section headers; avoid tables/text boxes.'
    )
  if (grammarSpelling4 <= 2)
    recommendations.push(
      'MEDIUM PRIORITY: Fix grammar/spelling and remove double spaces; run a grammar checker.'
    )
  if (buzzwords2 === 0)
    recommendations.push(
      'LOW PRIORITY: Reduce clichés like "results-driven" or "team player" and use specific impact statements.'
    )

  // Additional strengths
  if (strongStarts / Math.max(1, bullets.length) >= 0.8) {
    strengths.push({
      category: 'Strong Action Verbs',
      description: 'Majority of bullets start with impactful verbs',
      impact: 'Creates compelling narrative of achievements',
    })
  }
  const bulletsWithMetrics = bullets.filter((b) => METRIC_REGEX.test(b))
  if (bulletsWithMetrics.length >= 10) {
    strengths.push({
      category: 'Quantifiable Achievements',
      description: `${bulletsWithMetrics.length} bullets with metrics`,
      impact: 'Demonstrates measurable results',
    })
  }

  return {
    version: '1.0.0',
    overallScore: overall,
    breakdown,
    priorityIssues,
    breakdownMax: weights,
    lineByLine,
    strengths:
      strengths.length > 0
        ? strengths
        : [
            {
              category: 'Basic Structure',
              description: 'Resume has basic sections present',
              impact: 'Foundation for improvement',
            },
          ],
    improvements,
    recommendations:
      recommendations.length > 0
        ? recommendations
        : ['Review each bullet point and add specific metrics and measurable outcomes'],
    parseCoverage,
  }
}
