import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { v4 as uuidv4 } from 'uuid'

export async function POST(req: NextRequest) {
  try {
    const { merchant_id, amount_pkr, amount_its, webhook_url, metadata } = await req.json()
    if (!merchant_id || (!amount_pkr && !amount_its)) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

    const { data: coin } = await supabaseAdmin.from('its_coins').select('rate_pkr').single()
    const rate = coin?.rate_pkr || 1
    const pkr = amount_pkr || (amount_its * rate)
    const its = amount_its || (amount_pkr / rate)
    const fee = its * 0.005

    const { data, error } = await supabaseAdmin.from('payments').insert({
      merchant_id, amount_its: its, amount_pkr: pkr, fee_its: fee, status: 'pending',
      reference_id: uuidv4(), webhook_url, metadata
    }).select().single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ data, checkout_url: `https://it-s-gateway.vercel.app/checkout/${data.id}` })
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
