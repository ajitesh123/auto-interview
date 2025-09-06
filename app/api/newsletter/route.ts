import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { email } = await req.json()

  if (!email || !email.length) {
    return NextResponse.json(
      {
        error: 'Email is required',
      },
      {
        status: 400,
      }
    )
  }

  try {
    const API_KEY = process.env.BEEHIVE_API_KEY
    const PUBLICATION_ID = process.env.BEEHIVE_PUBLICATION_ID

    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${PUBLICATION_ID}/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          email: email,
          reactivate_existing: false,
          send_welcome_email: true,
        }),
      }
    )

    if (!response.ok) {
      const error = await response.json()
      return NextResponse.json(
        {
          error: error.message || 'Error subscribing to newsletter',
        },
        {
          status: response.status,
        }
      )
    }

    return NextResponse.json(
      { message: 'Successfully subscribed to the newsletter' },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Error subscribing to the newsletter',
      },
      {
        status: 500,
      }
    )
  }
}
