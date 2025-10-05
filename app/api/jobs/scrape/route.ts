import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import * as cheerio from 'cheerio'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Gemini AI with embedded API key
const GEMINI_API_KEY = 'AIzaSyBzPxbFBd7imzZOlYo8JVIRNo_a6Sqwp5s'
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)

export const maxDuration = 60

interface LinkedInJob {
  id: string
  title: string
  company: string
  location: string
  link: string
  postedTime: string
}

// Helper function to validate posted time (accept any time format)
const isValidPostedTime = (postedTime: string): boolean => {
  if (!postedTime) return false

  const timeStr = postedTime.toLowerCase().trim()

  // Accept any non-empty string as valid time - be extremely permissive
  return timeStr.length > 0
}

// Helper function to sort jobs by recency (most recent first)
const sortJobsByRecency = (jobs: LinkedInJob[]): LinkedInJob[] => {
  return jobs.sort((a, b) => {
    const aTime = a.postedTime.toLowerCase()
    const bTime = b.postedTime.toLowerCase()

    // Minutes first (most recent)
    if (aTime.includes('minute') && !bTime.includes('minute')) return -1
    if (!aTime.includes('minute') && bTime.includes('minute')) return 1

    // Then hours
    if (aTime.includes('hour') && !bTime.includes('hour')) return -1
    if (!aTime.includes('hour') && bTime.includes('hour')) return 1

    // Then days (1 day ago, 2 days ago, etc.)
    if (aTime.includes('day') && !bTime.includes('day')) return -1
    if (!aTime.includes('day') && bTime.includes('day')) return 1

    // Then weeks
    if (aTime.includes('week') && !bTime.includes('week')) return -1
    if (!aTime.includes('week') && bTime.includes('week')) return 1

    // Then months
    if (aTime.includes('month') && !bTime.includes('month')) return -1
    if (!aTime.includes('month') && bTime.includes('month')) return 1

    // Then years (least recent)
    if (aTime.includes('year') && !bTime.includes('year')) return -1
    if (!aTime.includes('year') && bTime.includes('year')) return 1

    return 0
  })
}

// Location normalization map - maps variations to standard names
const LOCATION_NORMALIZATION_MAP: Record<string, string[]> = {
  // Indian cities with common variations
  bengaluru: ['bangalore', 'bengaluru', 'bangaluru'],
  mumbai: ['mumbai', 'bombay'],
  delhi: ['delhi', 'new delhi', 'nct of delhi'],
  hyderabad: ['hyderabad', 'secunderabad'],
  chennai: ['chennai', 'madras'],
  pune: ['pune', 'punekar'],
  kolkata: ['kolkata', 'calcutta'],
  gurgaon: ['gurgaon', 'gurugram'],
  noida: ['noida', 'new okhla industrial development authority'],
  ahmedabad: ['ahmedabad', 'amdavad'],
  kochi: ['kochi', 'cochin'],
  indore: ['indore'],
  chandigarh: ['chandigarh'],
  jaipur: ['jaipur'],
  lucknow: ['lucknow'],
  bhubaneswar: ['bhubaneswar', 'bhubaneshwar'],
  coimbatore: ['coimbatore'],
  vadodara: ['vadodara', 'baroda'],
  nashik: ['nashik', 'nasik'],
  rajkot: ['rajkot'],
  mysore: ['mysore', 'mysuru'],
  thiruvananthapuram: ['thiruvananthapuram', 'trivandrum'],
  madurai: ['madurai'],
  tiruchirappalli: ['tiruchirappalli', 'trichy'],

  // International cities
  'san francisco': ['san francisco', 'sf', 'bay area'],
  'new york': ['new york', 'nyc', 'new york city'],
  'los angeles': ['los angeles', 'la'],
  chicago: ['chicago'],
  houston: ['houston'],
  phoenix: ['phoenix'],
  philadelphia: ['philadelphia', 'philly'],
  'san antonio': ['san antonio'],
  'san diego': ['san diego'],
  dallas: ['dallas'],
  austin: ['austin'],
  seattle: ['seattle'],
  denver: ['denver'],
  boston: ['boston'],
  atlanta: ['atlanta'],
  miami: ['miami'],
  'las vegas': ['las vegas', 'vegas'],
  toronto: ['toronto'],
  vancouver: ['vancouver'],
  montreal: ['montreal'],
  calgary: ['calgary'],
  london: ['london'],
  manchester: ['manchester'],
  birmingham: ['birmingham'],
  sydney: ['sydney'],
  melbourne: ['melbourne'],
  brisbane: ['brisbane'],
  perth: ['perth'],
  berlin: ['berlin'],
  munich: ['munich', 'münchen'],
  hamburg: ['hamburg'],
  frankfurt: ['frankfurt'],
  paris: ['paris'],
  lyon: ['lyon'],
  marseille: ['marseille'],
  singapore: ['singapore'],
  tokyo: ['tokyo'],
  osaka: ['osaka'],
  kyoto: ['kyoto'],
}

// Helper function to normalize location names
const normalizeLocation = (location: string): string => {
  const locationLower = location.toLowerCase().trim()

  // Find the standard name for this location
  for (const [standardName, variations] of Object.entries(LOCATION_NORMALIZATION_MAP)) {
    if (variations.some((variation) => locationLower.includes(variation))) {
      return standardName
    }
  }

  // If no normalization found, return the original location
  return locationLower
}

// Helper function to check if two locations match (fuzzy + normalized)
const locationsMatch = (userLocation: string, jobLocation: string): boolean => {
  // Handle empty strings - if either is empty, no match
  if (!userLocation || !jobLocation || userLocation.trim() === '' || jobLocation.trim() === '') {
    return false
  }

  const userNormalized = normalizeLocation(userLocation)
  const jobNormalized = normalizeLocation(jobLocation)

  // Direct match after normalization
  if (userNormalized === jobNormalized) {
    return true
  }

  // Check if either location contains the other (for cases like "Bengaluru, Karnataka, India")
  if (userNormalized.includes(jobNormalized) || jobNormalized.includes(userNormalized)) {
    return true
  }

  // Check if any variation of the user location matches the job location
  const userVariations = LOCATION_NORMALIZATION_MAP[userNormalized] || [userNormalized]
  const jobVariations = LOCATION_NORMALIZATION_MAP[jobNormalized] || [jobNormalized]

  // Check if any user variation matches any job variation
  for (const userVar of userVariations) {
    for (const jobVar of jobVariations) {
      if (userVar.includes(jobVar) || jobVar.includes(userVar)) {
        return true
      }
    }
  }

  return false
}

// Helper function to get geoId for different locations
const getGeoId = (location: string): string => {
  const locationLower = location.toLowerCase()

  // Common geoIds for different countries/regions
  if (
    locationLower.includes('india') ||
    locationLower.includes('mumbai') ||
    locationLower.includes('bangalore') ||
    locationLower.includes('delhi')
  ) {
    return '102713980' // India
  }
  if (
    locationLower.includes('united states') ||
    locationLower.includes('usa') ||
    locationLower.includes('us')
  ) {
    return '103644278' // United States
  }
  if (
    locationLower.includes('canada') ||
    locationLower.includes('toronto') ||
    locationLower.includes('vancouver')
  ) {
    return '101174742' // Canada
  }
  if (
    locationLower.includes('united kingdom') ||
    locationLower.includes('uk') ||
    locationLower.includes('london')
  ) {
    return '101165590' // United Kingdom
  }
  if (
    locationLower.includes('australia') ||
    locationLower.includes('sydney') ||
    locationLower.includes('melbourne')
  ) {
    return '101452733' // Australia
  }
  if (
    locationLower.includes('germany') ||
    locationLower.includes('berlin') ||
    locationLower.includes('munich')
  ) {
    return '101282230' // Germany
  }
  if (locationLower.includes('france') || locationLower.includes('paris')) {
    return '105015875' // France
  }
  if (locationLower.includes('singapore')) {
    return '102454443' // Singapore
  }
  if (locationLower.includes('japan') || locationLower.includes('tokyo')) {
    return '101355337' // Japan
  }

  // Default to global search if no specific location is found
  return '92000000' // Global
}

// Helper function to build LinkedIn URL with correct parameters
const buildLinkedInURL = (
  searchQuery: string,
  location: string,
  company: string,
  start: number
): string => {
  const baseURL = 'https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search'

  // Encode parameters like LinkedIn expects (spaces become +)
  const keywords = (searchQuery || '').replace(/\s+/g, '+')
  const locationParam = (location || '').replace(/\s+/g, '+')
  const companyParam = (company || '').replace(/\s+/g, '+')

  // Build search query - include company in keywords if specified
  let finalKeywords = keywords
  if (companyParam) {
    finalKeywords = keywords ? `${keywords}+${companyParam}` : companyParam
  }

  const params = new URLSearchParams({
    keywords: finalKeywords,
    location: locationParam || 'Global',
    geoId: getGeoId(location),
    trk: 'public_jobs_jobs-search-bar_search-submit',
    start: start.toString(),
  })

  return `${baseURL}?${params.toString()}`
}

// Helper function to filter jobs based on user criteria
const filterJobs = (
  jobs: LinkedInJob[],
  userLocation: string,
  userCompany: string
): LinkedInJob[] => {
  console.log(
    `Starting to filter ${jobs.length} jobs with location: "${userLocation}", company: "${userCompany}"`
  )

  return jobs.filter((job) => {
    // Filter by company if specified (more flexible matching)
    if (userCompany) {
      const jobCompanyLower = job.company.toLowerCase().trim()
      const userCompanyLower = userCompany.toLowerCase().trim()

      // More flexible company matching
      const companyMatches =
        jobCompanyLower.includes(userCompanyLower) ||
        userCompanyLower.includes(jobCompanyLower) ||
        // Handle common company name variations
        (userCompanyLower === 'google' &&
          (jobCompanyLower.includes('google') || jobCompanyLower.includes('alphabet'))) ||
        (userCompanyLower === 'microsoft' && jobCompanyLower.includes('microsoft')) ||
        (userCompanyLower === 'amazon' && jobCompanyLower.includes('amazon')) ||
        (userCompanyLower === 'apple' && jobCompanyLower.includes('apple')) ||
        (userCompanyLower === 'meta' &&
          (jobCompanyLower.includes('meta') || jobCompanyLower.includes('facebook'))) ||
        (userCompanyLower === 'facebook' &&
          (jobCompanyLower.includes('meta') || jobCompanyLower.includes('facebook')))

      if (!companyMatches) {
        return false
      }
    }

    // Filter by location if specified - using new fuzzy + normalized matching
    if (userLocation) {
      const jobLocationLower = job.location.toLowerCase()
      const userLocationLower = userLocation.toLowerCase()

      // Use our new fuzzy + normalized location matching
      if (!locationsMatch(userLocationLower, jobLocationLower)) {
        console.log(
          `Job filtered out due to location mismatch: "${job.location}" (user searched: "${userLocation}")`
        )
        return false
      }
    }

    return true
  })
}

// Helper function to extract job data from HTML element
const extractJobData = ($: cheerio.CheerioAPI, element: unknown): LinkedInJob | null => {
  try {
    // Use the correct selectors based on our testing
    // @ts-ignore - cheerio element type compatibility
    const title = $(element).find('h3.base-search-card__title').text().trim()
    // @ts-ignore - cheerio element type compatibility
    const company = $(element)
      .find('h4.base-search-card__subtitle a.hidden-nested-link')
      .text()
      .trim()
    // @ts-ignore - cheerio element type compatibility
    const location = $(element).find('span.job-search-card__location').text().trim()
    // @ts-ignore - cheerio element type compatibility
    const link = $(element).find('a.base-card__full-link').attr('href')

    // Try both time selectors (with and without --new suffix)
    // @ts-ignore - cheerio element type compatibility
    let postedTime = $(element).find('time.job-search-card__listdate--new').text().trim()
    if (!postedTime) {
      // @ts-ignore - cheerio element type compatibility
      postedTime = $(element).find('time.job-search-card__listdate').text().trim()
    }

    // Validate required fields
    if (!title || !company || !location || !link || !postedTime) {
      return null
    }

    // Validate posted time (accept any valid time format)
    if (!isValidPostedTime(postedTime)) {
      return null
    }

    return {
      id: Math.random().toString(36).substr(2, 9),
      title,
      company,
      location,
      link: link.startsWith('http') ? link : `https://www.linkedin.com${link}`,
      postedTime,
    }
  } catch (error) {
    console.error('Error extracting job data:', error)
    return null
  }
}

// Helper function to enhance search query using AI
const enhanceSearchQuery = async (
  userQuery: string,
  location: string
): Promise<{
  enhanced_query: string
  domain_keywords: string[]
  exclude_keywords: string[]
}> => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    const prompt = `
    Enhance this job search query to find more relevant results and filter out irrelevant ones:
    
    User Query: "${userQuery}"
    Location: "${location}"
    
    Return a JSON response with:
    1. enhanced_query: The best single LinkedIn search term that will find the most relevant jobs
    2. domain_keywords: Array of keywords that should appear in job titles/descriptions for relevance
    3. exclude_keywords: Array of keywords that indicate irrelevant jobs (to filter out)
    
    IMPORTANT FILTERING RULES:
    - For "equity research": ONLY include jobs with "equity", "research", "analyst", "investment", "financial", "portfolio", "securities", "capital markets"
    - EXCLUDE: "business analyst", "data analyst", "academic", "counselor", "counsellor", "teacher", "education", "hr", "marketing", "sales", "operations", "project manager", "software", "developer", "engineer"
    - For "product manager": ONLY include jobs with "product", "pm", "product owner", "product lead"
    - EXCLUDE: "project manager", "program manager", "marketing manager", "sales manager", "operations manager"
    
    Be VERY strict with filtering. Better to show fewer but highly relevant jobs than many irrelevant ones.
    
    Return only valid JSON, no other text.
    `

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Parse the JSON response (handle markdown code blocks)
    let jsonText = text.trim()
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/^```json\s*/, '').replace(/\s*```$/, '')
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/^```\s*/, '').replace(/\s*```$/, '')
    }

    const enhancedData = JSON.parse(jsonText)

    console.log('AI Query Enhancement Result:', enhancedData)

    return {
      enhanced_query: enhancedData.enhanced_query || userQuery,
      domain_keywords: enhancedData.domain_keywords || [],
      exclude_keywords: enhancedData.exclude_keywords || [],
    }
  } catch (error) {
    console.error('Error enhancing search query with AI:', error)
    // Fallback to original query if AI fails
    return {
      enhanced_query: userQuery,
      domain_keywords: [],
      exclude_keywords: [],
    }
  }
}

// Helper function to check if a job is relevant based on AI keywords
const isJobRelevant = (
  job: LinkedInJob,
  domainKeywords: string[],
  excludeKeywords: string[]
): boolean => {
  if (domainKeywords.length === 0 && excludeKeywords.length === 0) {
    return true // No filtering if AI didn't provide keywords
  }

  const jobText = `${job.title} ${job.company}`.toLowerCase()

  // STRICT: Check if job contains any exclude keywords (immediate rejection)
  const hasExcludeKeyword = excludeKeywords.some((keyword) =>
    jobText.includes(keyword.toLowerCase())
  )

  if (hasExcludeKeyword) {
    console.log(`🚫 FILTERED: Job excluded by keyword: "${job.title}" at "${job.company}"`)
    return false
  }

  // STRICT: If we have domain keywords, job MUST contain at least one
  if (domainKeywords.length > 0) {
    const hasDomainKeyword = domainKeywords.some((keyword) =>
      jobText.includes(keyword.toLowerCase())
    )

    if (!hasDomainKeyword) {
      console.log(`🚫 FILTERED: Job lacks domain keywords: "${job.title}" at "${job.company}"`)
      console.log(`🔍 Job text: "${jobText}"`)
      console.log(`🔍 Required keywords: [${domainKeywords.join(', ')}]`)
      return false
    }

    console.log(`✅ PASSED: Job matches domain: "${job.title}" at "${job.company}"`)
    return true
  }

  return true
}

// Helper function to delay execution
const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function POST(request: NextRequest) {
  try {
    const { searchQuery, location, company, experience, category } = await request.json()

    console.log('LinkedIn job search request received:', {
      searchQuery,
      location,
      company,
      experience,
      category,
    })

    // Step 1: Enhance search query using AI
    console.log('🤖 Enhancing search query with AI...')
    const aiEnhancement = await enhanceSearchQuery(searchQuery, location)
    const enhancedQuery = aiEnhancement.enhanced_query
    const domainKeywords = aiEnhancement.domain_keywords
    const excludeKeywords = aiEnhancement.exclude_keywords

    console.log('AI Enhancement Results:', {
      originalQuery: searchQuery,
      enhancedQuery,
      domainKeywords,
      excludeKeywords,
    })

    console.log('🔍 DEBUG: Starting job scraping with enhanced query...')

    const allJobs: LinkedInJob[] = []
    const maxJobs = 200 // Increased to 200 to get more results
    const jobsPerPage = 25
    const maxPages = Math.ceil(maxJobs / jobsPerPage) // This will be 8 pages max

    // Set up axios with proper headers to mimic the working request
    const axiosConfig = {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Mobile Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        Connection: 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        Referer:
          'https://www.linkedin.com/jobs/search?keywords=software+engineer&location=United+States&geoId=103644278&trk=public_jobs_jobs-search-bar_search-submit',
      },
      timeout: 30000,
    }

    // Scrape jobs from multiple pages using AI-enhanced query
    for (let page = 0; page < maxPages; page++) {
      const start = page * jobsPerPage
      const url = buildLinkedInURL(enhancedQuery, location, company, start)

      console.log(`Scraping page ${page + 1}, URL: ${url}`)

      try {
        const response = await axios.get(url, axiosConfig)
        const $ = cheerio.load(response.data)

        // Find all job listings
        const jobElements = $('li')
        let jobsFoundOnPage = 0

        console.log(`Found ${jobElements.length} job elements on page ${page + 1}`)

        jobElements.each((index, element) => {
          if (allJobs.length >= maxJobs) return false // Stop if we have enough jobs

          const jobData = extractJobData($, element)
          if (jobData) {
            allJobs.push(jobData)
            jobsFoundOnPage++
            console.log(`Added job: ${jobData.title} at ${jobData.company} (${jobData.postedTime})`)
          }
        })

        console.log(
          `Page ${page + 1}: Found ${jobsFoundOnPage} valid jobs (Total: ${allJobs.length})`
        )

        // Debug: Log first few jobs found
        if (jobsFoundOnPage > 0) {
          console.log('🔍 DEBUG: Sample jobs found on this page:')
          allJobs.slice(-jobsFoundOnPage).forEach((job, idx) => {
            console.log(`  ${idx + 1}. ${job.title} at ${job.company} (${job.location})`)
          })
        }

        // If no jobs found on this page, we've reached the end
        if (jobsFoundOnPage === 0) {
          console.log('No more jobs found, stopping pagination')
          break
        }

        // Add delay between requests (5 seconds)
        if (page < maxPages - 1) {
          console.log('Waiting 5 seconds before next request...')
          await delay(5000)
        }
      } catch (error) {
        console.error(`Error scraping page ${page + 1}:`, error)
        // Continue to next page instead of failing completely
        continue
      }
    }

    // Apply additional filtering based on user criteria and AI relevance
    const filteredJobs = filterJobs(allJobs, location, company)

    // Apply AI-based relevance filtering
    const aiFilteredJobs = filteredJobs.filter((job) =>
      isJobRelevant(job, domainKeywords, excludeKeywords)
    )

    console.log(`AI Filtering Results: ${filteredJobs.length} → ${aiFilteredJobs.length} jobs`)
    if (domainKeywords.length > 0 || excludeKeywords.length > 0) {
      console.log('AI Filtering Applied:', {
        domainKeywords,
        excludeKeywords,
        jobsFiltered: filteredJobs.length - aiFilteredJobs.length,
      })

      // Debug: Show which jobs were filtered out
      if (filteredJobs.length > aiFilteredJobs.length) {
        console.log('🔍 DEBUG: Jobs filtered out by AI:')
        const filteredOut = filteredJobs.filter((job) => !aiFilteredJobs.includes(job))
        filteredOut.slice(0, 5).forEach((job, idx) => {
          console.log(`  ${idx + 1}. ${job.title} at ${job.company} (${job.location})`)
        })
        if (filteredOut.length > 5) {
          console.log(`  ... and ${filteredOut.length - 5} more jobs filtered out`)
        }
      }
    }

    // Sort jobs by recency (most recent first)
    let sortedJobs = sortJobsByRecency(aiFilteredJobs)

    // FALLBACK: If AI filtering results in no jobs, use regular filtering
    if (sortedJobs.length === 0 && filteredJobs.length > 0) {
      console.log('🚨 FALLBACK: AI filtering resulted in 0 jobs, using regular filtering instead')
      sortedJobs = sortJobsByRecency(filteredJobs)
    }

    console.log(
      `LinkedIn scraping completed. Total jobs found: ${allJobs.length}, After filtering: ${sortedJobs.length}`
    )
    console.log(`Filtering details - Location: "${location}", Company: "${company}"`)
    if (allJobs.length > 0) {
      console.log(
        `Sample job locations before filtering:`,
        allJobs.slice(0, 5).map((job) => job.location)
      )
    }

    return NextResponse.json({
      success: true,
      jobs: sortedJobs,
      total: sortedJobs.length,
      searchParams: { searchQuery, location, company, experience, category },
      aiEnhancement: {
        originalQuery: searchQuery,
        enhancedQuery,
        domainKeywords,
        excludeKeywords,
        jobsFiltered: filteredJobs.length - aiFilteredJobs.length,
      },
      note: `Found ${sortedJobs.length} LinkedIn jobs matching your criteria (AI-enhanced search, sorted by most recent first)`,
    })
  } catch (error) {
    console.error('Error in LinkedIn job search:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to scrape LinkedIn jobs. Please try again later.',
        jobs: [],
      },
      { status: 500 }
    )
  }
}
