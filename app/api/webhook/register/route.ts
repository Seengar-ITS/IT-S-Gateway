import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const { payment_id, merchant_id, url, event, payload } = await req.json()
  const { data, error } = await supabaseAdmin.from('payment_webhooks').insert({
    payment_id, merchant_id, url, event, payload, status: 'pending', attempts: 0
  }).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}
