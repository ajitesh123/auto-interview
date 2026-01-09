import { NextRequest, NextResponse } from 'next/server'

const INDEXNOW_API_KEY = process.env.INDEXNOW_API_KEY || 'bfb19e6f5a5e3515e0c255f4d3e05d77'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://autointerviewai.com'

export async function POST(request: NextRequest) {
  try {
    const { urls } = await request.json()

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json(
        { error: 'URLs array is required' },
        { status: 400 }
      )
    }

    // Submit to IndexNow API (Bing endpoint)
    const indexNowPayload = {
      host: new URL(SITE_URL).hostname,
      key: INDEXNOW_API_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_API_KEY}.txt`,
      urlList: urls.map((url) => {
        // Ensure URLs are absolute
        if (url.startsWith('http')) return url
        return `${SITE_URL}${url.startsWith('/') ? url : `/${url}`}`
      }),
    }

    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(indexNowPayload),
    })

    if (response.ok || response.status === 202) {
      return NextResponse.json({
        success: true,
        message: 'URLs submitted to IndexNow successfully',
        urls: indexNowPayload.urlList,
        status: response.status,
      })
    } else {
      const errorText = await response.text()
      return NextResponse.json(
        {
          success: false,
          error: `IndexNow API returned ${response.status}`,
          details: errorText,
        },
        { status: response.status }
      )
    }
  } catch (error) {
    console.error('IndexNow submission error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to submit URLs to IndexNow',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

// GET endpoint to test the API
export async function GET() {
  return NextResponse.json({
    message: 'IndexNow API endpoint is working',
    keyLocation: `${SITE_URL}/${INDEXNOW_API_KEY}.txt`,
    usage: 'POST to this endpoint with { "urls": ["https://example.com/page1", "https://example.com/page2"] }',
  })
}
