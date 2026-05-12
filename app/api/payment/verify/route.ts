import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const { payment_id, reference_id } = await req.json()
  const query = payment_id
    ? supabaseAdmin.from('payments').select('*').eq('id', payment_id)
    : supabaseAdmin.from('payments').select('*').eq('reference_id', reference_id)
  const { data, error } = await query.single()
  if (error) return NextResponse.json({ error: 'Payment not found' }, { status: 404 })
  return NextResponse.json({ data, verified: data.status === 'completed' })
}
