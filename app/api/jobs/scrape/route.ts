import { NextRequest, NextResponse } from 'next/server'
import puppeteer from 'puppeteer'

export const maxDuration = 30 // Extend timeout to 30 seconds

interface JobData {
  title: string
  company: string
  experience: string
  location: string
  link: string
  postedTime: string
}

export async function POST(request: NextRequest) {
  let browser: any = null

  try {
    console.log('Starting job scraping process...')

    // Parse request body for search parameters
    const { searchQuery, location, company, experience } = await request.json()

    // Launch Puppeteer browser
    console.log('Launching browser...')
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu',
      ],
    })

    const page = await browser!.newPage()

    // Set user agent to avoid bot detection
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36'
    )

    // Set viewport
    await page.setViewport({ width: 1366, height: 768 })

    // Build search URL with parameters to get more results
    let searchUrl = 'https://www.naukri.com/jobs-in-india'

    if (searchQuery) {
      searchUrl = `https://www.naukri.com/${searchQuery.toLowerCase().replace(/\s+/g, '-')}-jobs`
    }

    // Add parameters to get more results
    const urlParams = new URLSearchParams()
    urlParams.append('k', searchQuery || '')
    if (location) urlParams.append('l', location)
    urlParams.append('experience', '0') // Start with 0 years to get more results
    urlParams.append('sort', 'date') // Sort by date to get recent jobs

    if (urlParams.toString()) {
      searchUrl += '?' + urlParams.toString()
    }

    console.log('Navigating to:', searchUrl)

    // Navigate to the page
    await page.goto(searchUrl, {
      waitUntil: 'networkidle2',
      timeout: 30000,
    })

    // Wait a bit for dynamic content to load
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Scroll down to load more jobs dynamically
    console.log('Scrolling to load more jobs...')
    await page.evaluate(() => {
      return new Promise((resolve) => {
        let totalHeight = 0
        const distance = 100
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight
          window.scrollBy(0, distance)
          totalHeight += distance

          if (totalHeight >= scrollHeight) {
            clearInterval(timer)
            resolve(null)
          }
        }, 100)
      })
    })

    // Wait a bit more for additional content to load
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Wait for job listings to load
    try {
      await page.waitForSelector('.cust-job-tuple', { timeout: 15000 })
      console.log('Found job listings with .cust-job-tuple selector')
    } catch (error) {
      console.log('Primary selector not found, trying alternative selectors...')

      // Try alternative selectors
      const alternativeSelectors = [
        '.jobTuple',
        '.job-card',
        '.job-item',
        '[data-testid="job-card"]',
        '.job-listing',
      ]

      let foundSelector = false
      for (const selector of alternativeSelectors) {
        try {
          await page.waitForSelector(selector, { timeout: 5000 })
          console.log(`Found jobs with selector: ${selector}`)
          foundSelector = true
          break
        } catch (e) {
          console.log(`Selector ${selector} not found`)
        }
      }

      if (!foundSelector) {
        // If no selectors work, let's try to get the page content and see what's available
        const pageContent = await page.content()
        console.log('Page loaded but no job selectors found. Page title:', await page.title())

        // Return mock data for now
        return NextResponse.json({
          success: true,
          jobs: [
            {
              id: 'mock-1',
              title: 'Product Manager',
              company: 'Tech Company',
              experience: '3-5 years',
              location: 'Bangalore',
              link: 'https://www.naukri.com/job-details',
              postedTime: '2 days ago',
              matchScore: 95,
              salary: 'Not specified',
              description: 'Mock job description for testing',
            },
          ],
          total: 1,
          searchParams: { searchQuery, location, company, experience },
          note: 'Using mock data - could not find job listings on the page',
        })
      }
    }

    console.log('Page loaded, extracting job data...')

    // First, let's see what's actually on the page
    const pageTitle = await page.title()
    console.log('Page title:', pageTitle)

    // Check if we're on the right page
    const currentUrl = page.url()
    console.log('Current URL:', currentUrl)

    // Extract job data
    const jobs = await page.evaluate(() => {
      const jobElements = document.querySelectorAll('.cust-job-tuple')
      const jobData: JobData[] = []

      console.log(`Found ${jobElements.length} job elements with .cust-job-tuple`)

      // If no elements found, try other selectors
      if (jobElements.length === 0) {
        const altSelectors = ['.jobTuple', '.job-card', '.job-item', '[data-testid="job-card"]']
        for (const selector of altSelectors) {
          const elements = document.querySelectorAll(selector)
          console.log(`Found ${elements.length} elements with selector: ${selector}`)
          if (elements.length > 0) {
            // Use the first working selector
            return Array.from(elements)
              .slice(0, 5)
              .map((element, index) => ({
                title: element.querySelector('a')?.textContent?.trim() || `Job ${index + 1}`,
                company: element.querySelector('.comp-name')?.textContent?.trim() || 'Company',
                experience:
                  element.querySelector('.expwdth')?.textContent?.trim() || 'Not specified',
                location: element.querySelector('.locWdth')?.textContent?.trim() || 'Location',
                link: element.querySelector('a')?.getAttribute('href') || '#',
                postedTime:
                  element.querySelector('.job-post-day')?.textContent?.trim() || 'Recently',
              }))
          }
        }
      }

      jobElements.forEach((element, index) => {
        try {
          // Extract title - try multiple selectors
          const titleElement =
            element.querySelector('.title a') ||
            element.querySelector('a[data-testid="job-title"]') ||
            element.querySelector('.job-title a') ||
            element.querySelector('a[title]')
          const title =
            titleElement?.textContent?.trim() || titleElement?.getAttribute('title') || ''

          // Extract company name - try multiple selectors
          const companyElement =
            element.querySelector('.comp-name') ||
            element.querySelector('[data-testid="company-name"]') ||
            element.querySelector('.company-name') ||
            element.querySelector('.comp-name a')
          const company = companyElement?.textContent?.trim() || ''

          // Extract experience - try multiple selectors
          const expElement =
            element.querySelector('.expwdth') ||
            element.querySelector('[data-testid="experience"]') ||
            element.querySelector('.experience') ||
            element.querySelector('.exp')
          const experience = expElement?.textContent?.trim() || ''

          // Extract location - try multiple selectors
          const locElement =
            element.querySelector('.locWdth') ||
            element.querySelector('[data-testid="location"]') ||
            element.querySelector('.location') ||
            element.querySelector('.loc')
          const location = locElement?.textContent?.trim() || ''

          // Extract link - try multiple approaches
          const linkElement =
            element.querySelector('.title a') ||
            element.querySelector('a[data-testid="job-title"]') ||
            element.querySelector('.job-title a') ||
            element.querySelector('a[href*="/job/"]') ||
            element.querySelector('a[href*="naukri.com"]') ||
            element.querySelector('a')
          let link = linkElement?.getAttribute('href') || ''

          // Ensure we have a proper link
          if (link && !link.startsWith('http')) {
            link = link.startsWith('/')
              ? `https://www.naukri.com${link}`
              : `https://www.naukri.com/${link}`
          }

          // Extract posted time - try multiple selectors
          const timeElement =
            element.querySelector('.job-post-day') ||
            element.querySelector('[data-testid="posted-date"]') ||
            element.querySelector('.posted-date') ||
            element.querySelector('.date')
          const postedTime = timeElement?.textContent?.trim() || ''

          console.log(`Job ${index + 1}:`, {
            title,
            company,
            experience,
            location,
            postedTime,
            link,
          })

          // Only add if we have at least title and company
          if (title && company) {
            jobData.push({
              title,
              company,
              experience,
              location,
              link: link || 'https://www.naukri.com',
              postedTime,
            })
          }
        } catch (error) {
          console.error('Error extracting job data:', error)
        }
      })

      return jobData
    })

    console.log(`Successfully scraped ${jobs.length} jobs`)
    console.log('Sample job data:', jobs.slice(0, 2)) // Log first 2 jobs for debugging

    // Filter jobs based on search criteria
    let filteredJobs = jobs

    console.log('Before filtering:', filteredJobs.length, 'jobs')

    if (location) {
      filteredJobs = filteredJobs.filter((job) =>
        job.location.toLowerCase().includes(location.toLowerCase())
      )
      console.log('After location filter:', filteredJobs.length, 'jobs')
    }

    // Filter by company
    if (company) {
      filteredJobs = filteredJobs.filter((job) =>
        job.company.toLowerCase().includes(company.toLowerCase())
      )
      console.log('After company filter:', filteredJobs.length, 'jobs')
    }

    // Filter by experience (minimum years) - more flexible approach
    if (experience && !isNaN(Number(experience))) {
      const userExperience = Number(experience)
      filteredJobs = filteredJobs.filter((job) => {
        const expText = job.experience.toLowerCase()

        // Extract years from experience string (e.g., "3-5 Yrs" -> 3, "5+ Yrs" -> 5)
        const experienceMatch = job.experience.match(/(\d+)/)
        if (experienceMatch) {
          const jobMinExperience = Number(experienceMatch[1])
          // Show jobs where user's experience is within or above the required range
          // e.g., if user has 3 years, show jobs requiring 0-5 years
          return jobMinExperience <= userExperience + 2 // Allow some flexibility
        }

        // If we can't parse experience, include the job
        return true
      })
      console.log('After experience filter:', filteredJobs.length, 'jobs')
    }

    // Filter by date (jobs posted within 7 days for more results)
    filteredJobs = filteredJobs.filter((job) => {
      const postedTime = job.postedTime.toLowerCase()
      return (
        postedTime.includes('1 day') ||
        postedTime.includes('today') ||
        postedTime.includes('hours') ||
        postedTime.includes('2 day') ||
        postedTime.includes('3 day') ||
        postedTime.includes('4 day') ||
        postedTime.includes('5 day') ||
        postedTime.includes('6 day') ||
        postedTime.includes('7 day') ||
        postedTime.includes('week')
      )
    })
    console.log('After date filter (7 days):', filteredJobs.length, 'jobs')

    console.log('Final filtered jobs:', filteredJobs.length)

    // If we have very few results, be less restrictive with date filtering
    if (filteredJobs.length < 20) {
      console.log('Too few results, relaxing date filter...')
      filteredJobs = jobs // Start with all scraped jobs again

      // Reapply other filters but with relaxed date filter
      if (location) {
        filteredJobs = filteredJobs.filter((job) =>
          job.location.toLowerCase().includes(location.toLowerCase())
        )
      }

      if (company) {
        filteredJobs = filteredJobs.filter((job) =>
          job.company.toLowerCase().includes(company.toLowerCase())
        )
      }

      if (experience && !isNaN(Number(experience))) {
        const userExperience = Number(experience)
        filteredJobs = filteredJobs.filter((job) => {
          const experienceMatch = job.experience.match(/(\d+)/)
          if (experienceMatch) {
            const jobMinExperience = Number(experienceMatch[1])
            return jobMinExperience <= userExperience + 2
          }
          return true
        })
      }

      // More relaxed date filter - show jobs from last 30 days
      filteredJobs = filteredJobs.filter((job) => {
        const postedTime = job.postedTime.toLowerCase()
        return (
          postedTime.includes('day') ||
          postedTime.includes('today') ||
          postedTime.includes('hours') ||
          postedTime.includes('week') ||
          postedTime.includes('month')
        )
      })

      console.log('After relaxed filtering:', filteredJobs.length, 'jobs')
    }

    // Add match score (mock calculation for now)
    const jobsWithScore = filteredJobs.map((job) => ({
      ...job,
      id: Math.random().toString(36).substr(2, 9),
      matchScore: Math.floor(Math.random() * 20) + 80, // Random score between 80-100
      salary: 'Not specified',
      description: `Join ${job.company} as a ${job.title}. ${job.experience} experience required.`,
    }))

    console.log('Returning response with', jobsWithScore.length, 'jobs')

    return NextResponse.json({
      success: true,
      jobs: jobsWithScore,
      total: jobsWithScore.length,
      searchParams: { searchQuery, location, company, experience },
    })
  } catch (error) {
    console.error('Error scraping jobs:', error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to scrape jobs',
        jobs: [],
      },
      { status: 500 }
    )
  } finally {
    if (browser) {
      await browser.close()
      console.log('Browser closed')
    }
  }
}
