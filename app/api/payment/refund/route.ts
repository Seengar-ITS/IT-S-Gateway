import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const { payment_id, reason } = await req.json()
  const { data: payment } = await supabaseAdmin.from('payments').select('*').eq('id', payment_id).single()
  if (!payment) return NextResponse.json({ error: 'Payment not found' }, { status: 404 })
  if (payment.status !== 'completed') return NextResponse.json({ error: 'Payment not eligible for refund' }, { status: 400 })

  const { data: refund, error } = await supabaseAdmin.from('refunds').insert({
    payment_id, merchant_id: payment.merchant_id, amount_its: payment.amount_its, reason, status: 'completed'
  }).select().single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  await supabaseAdmin.from('payments').update({ status: 'refunded' }).eq('id', payment_id)
  return NextResponse.json({ data: refund })
}
