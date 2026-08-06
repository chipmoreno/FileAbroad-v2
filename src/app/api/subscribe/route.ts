import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.KIT_API_KEY
    if (!apiKey) {
      console.error('KIT_API_KEY not configured')
      return NextResponse.json(
        { error: 'Newsletter not configured' },
        { status: 500 }
      )
    }

    const tagId = process.env.KIT_TAG_ID
    if (!tagId) {
      console.error('KIT_TAG_ID not configured')
      return NextResponse.json(
        { error: 'Newsletter not configured' },
        { status: 500 }
      )
    }

    const { email, firstName, tagId: customTagId } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    // Create subscriber
    const subRes = await fetch('https://api.kit.com/v4/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Kit-Api-Key': apiKey,
      },
      body: JSON.stringify({
        email_address: email,
        first_name: firstName || undefined,
        state: 'active',
      }),
    })

    if (!subRes.ok) {
      const err = await subRes.text()
      console.error('Kit subscriber error:', err)
      return NextResponse.json(
        { error: 'Failed to subscribe' },
        { status: 500 }
      )
    }

    const { subscriber } = await subRes.json()

    // Tag subscriber with brand tag (newsletter) or custom lead magnet tag
    const finalTagId = customTagId || tagId
    if (finalTagId) {
      await fetch(`https://api.kit.com/v4/tags/${finalTagId}/subscribers/${subscriber.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Kit-Api-Key': apiKey,
        },
        body: JSON.stringify({}),
      })
    }

    return NextResponse.json({ success: true, subscriberId: subscriber.id })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('Subscribe error:', message)
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    )
  }
}
