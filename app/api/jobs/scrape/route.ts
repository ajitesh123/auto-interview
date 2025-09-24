import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import * as cheerio from 'cheerio'

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

    // Filter by location if specified
    if (userLocation) {
      const jobLocationLower = job.location.toLowerCase()
      const userLocationLower = userLocation.toLowerCase()

      // For city-specific searches, be more strict
      const citySearches = [
        'bengaluru',
        'bangalore',
        'mumbai',
        'delhi',
        'hyderabad',
        'chennai',
        'pune',
        'kolkata',
        'gurgaon',
        'noida',
        'ahmedabad',
      ]
      const isCitySearch = citySearches.some((city) => userLocationLower.includes(city))

      if (isCitySearch) {
        // For city searches, only match if the job location contains the city name
        if (!jobLocationLower.includes(userLocationLower)) {
          console.log(
            `Job filtered out due to city mismatch: "${job.location}" (user searched: "${userLocation}")`
          )
          return false
        }
      } else {
        // For country/region searches, use the existing flexible matching
        if (
          !jobLocationLower.includes(userLocationLower) &&
          !userLocationLower.includes(jobLocationLower)
        ) {
          // Additional check for country-level matching
          const countryMatches = [
            {
              user: 'india',
              job: [
                'india',
                'mumbai',
                'bangalore',
                'bengaluru',
                'delhi',
                'hyderabad',
                'chennai',
                'pune',
                'kolkata',
                'gurgaon',
                'noida',
                'ahmedabad',
                'kochi',
                'indore',
                'chandigarh',
                'jaipur',
                'lucknow',
                'bhubaneswar',
                'coimbatore',
                'vadodara',
                'nashik',
                'rajkot',
                'mysore',
                'thiruvananthapuram',
                'madurai',
                'tiruchirappalli',
                'karnataka',
                'maharashtra',
                'tamil nadu',
                'telangana',
                'gujarat',
                'rajasthan',
                'kerala',
                'punjab',
                'haryana',
                'uttar pradesh',
                'west bengal',
                'odisha',
                'andhra pradesh',
                'bihar',
                'assam',
                'jammu',
                'kashmir',
                'himachal pradesh',
                'uttarakhand',
                'goa',
                'manipur',
                'meghalaya',
                'mizoram',
                'nagaland',
                'sikkim',
                'tripura',
                'arunachal pradesh',
                'chhattisgarh',
                'jharkhand',
                'madhya pradesh',
              ],
            },
            {
              user: 'usa',
              job: ['united states', 'usa', 'us', 'california', 'new york', 'texas', 'florida'],
            },
            {
              user: 'united states',
              job: ['united states', 'usa', 'us', 'california', 'new york', 'texas', 'florida'],
            },
            { user: 'canada', job: ['canada', 'toronto', 'vancouver', 'montreal', 'calgary'] },
            { user: 'uk', job: ['united kingdom', 'uk', 'london', 'manchester', 'birmingham'] },
            {
              user: 'united kingdom',
              job: ['united kingdom', 'uk', 'london', 'manchester', 'birmingham'],
            },
            { user: 'australia', job: ['australia', 'sydney', 'melbourne', 'brisbane', 'perth'] },
            { user: 'germany', job: ['germany', 'berlin', 'munich', 'hamburg', 'frankfurt'] },
            { user: 'france', job: ['france', 'paris', 'lyon', 'marseille'] },
            { user: 'singapore', job: ['singapore'] },
            { user: 'japan', job: ['japan', 'tokyo', 'osaka', 'kyoto'] },
          ]

          const foundMatch = countryMatches.find(
            (match) =>
              userLocationLower.includes(match.user) &&
              match.job.some((jobLocation) => jobLocationLower.includes(jobLocation))
          )

          if (!foundMatch) {
            console.log(
              `Job filtered out due to location mismatch: "${job.location}" (user searched: "${userLocation}")`
            )
            return false
          }
        }
      }
    }

    return true
  })
}

// Helper function to extract job data from HTML element
const extractJobData = ($: cheerio.CheerioAPI, element: any): LinkedInJob | null => {
  try {
    // Use the correct selectors based on our testing
    const title = $(element).find('h3.base-search-card__title').text().trim()
    const company = $(element)
      .find('h4.base-search-card__subtitle a.hidden-nested-link')
      .text()
      .trim()
    const location = $(element).find('span.job-search-card__location').text().trim()
    const link = $(element).find('a.base-card__full-link').attr('href')

    // Try both time selectors (with and without --new suffix)
    let postedTime = $(element).find('time.job-search-card__listdate--new').text().trim()
    if (!postedTime) {
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

    // Scrape jobs from multiple pages
    for (let page = 0; page < maxPages; page++) {
      const start = page * jobsPerPage
      const url = buildLinkedInURL(searchQuery, location, company, start)

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

    // Apply additional filtering based on user criteria
    const filteredJobs = filterJobs(allJobs, location, company)

    // Sort jobs by recency (most recent first)
    const sortedJobs = sortJobsByRecency(filteredJobs)

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
      note: `Found ${sortedJobs.length} LinkedIn jobs matching your criteria (sorted by most recent first)`,
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
