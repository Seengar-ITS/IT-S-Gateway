import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const merchant_id = searchParams.get('merchant_id')
  const admin = searchParams.get('admin')
  const query = admin ? supabaseAdmin.from('payments').select('*').order('created_at', { ascending: false }).limit(100)
    : supabaseAdmin.from('payments').select('*').eq('merchant_id', merchant_id!).order('created_at', { ascending: false })
  const { data } = await query
  return NextResponse.json({ data: data || [] })
}
