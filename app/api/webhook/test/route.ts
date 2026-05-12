import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { url } = await req.json()
  if (!url) return NextResponse.json({ error: 'URL required' }, { status: 400 })
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-ITS-Gateway': 'test' },
      body: JSON.stringify({ event: 'test', message: 'IT-S Gateway webhook test', timestamp: new Date().toISOString() })
    })
    return NextResponse.json({ success: true, status: res.status })
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message })
  }
}
