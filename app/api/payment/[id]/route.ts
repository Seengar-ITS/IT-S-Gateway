import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { data, error } = await supabaseAdmin.from('payments').select('*').eq('id', params.id).single()
  if (error) return NextResponse.json({ error: 'Payment not found' }, { status: 404 })
  return NextResponse.json({ data })
}
