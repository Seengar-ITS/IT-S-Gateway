'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function CheckoutPage({ params }: { params: { payment_id: string } }) {
  const [payment, setPayment] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [paying, setPaying] = useState(false)
  const [error, setError] = useState('')
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    fetch(`/api/payment/${params.payment_id}`).then(r => r.json()).then(d => { if (d.data) setPayment(d.data); setLoading(false) })
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user))
  }, [params.payment_id])

  async function handlePay() {
    if (!user) { setError('Please sign in to pay'); return }
    setPaying(true); setError('')
    const res = await fetch('/api/payment/verify', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ payment_id: params.payment_id }) })
    const data = await res.json()
    if (data.verified) { window.location.href = '/success'; return }
    if (data.error) { setError(data.error); setPaying(false); return }
    window.location.href = '/success'
  }

  if (loading) return <div style={{ textAlign: 'center', padding: 80, color: 'rgba(255,255,255,0.5)' }}>Loading payment...</div>
  if (!payment) return <div style={{ textAlign: 'center', padding: 80, color: '#ef4444' }}>Payment not found</div>

  return (
    <div style={{ maxWidth: 480, margin: '60px auto', padding: '0 24px' }}>
      <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: 24, padding: 40 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>⚡</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>Payment Request</div>
          <div style={{ fontSize: 12, fontFamily: 'monospace', color: '#6366f1' }}>Ref: {payment.reference_id}</div>
        </div>
        <div style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 18, padding: 28, marginBottom: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>Amount Due</div>
          <div style={{ fontSize: 48, fontWeight: 800, color: '#22d3ee', marginBottom: 4 }}>{Number(payment.amount_its).toLocaleString()}</div>
          <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.6)', fontWeight: 700 }}>ITS</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 8 }}>≈ PKR {Number(payment.amount_pkr).toLocaleString()}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: 8 }}>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>Processing Fee</span>
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>{Number(payment.fee_its).toFixed(4)} ITS</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', marginBottom: 24 }}>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>Status</span>
          <span style={{ color: '#f59e0b', fontWeight: 700, textTransform: 'capitalize' }}>{payment.status}</span>
        </div>
        {error && <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, padding: '12px 16px', color: '#ef4444', fontSize: 14, marginBottom: 16 }}>{error}</div>}
        {payment.status === 'pending' ? (
          <button onClick={handlePay} disabled={paying} style={{ width: '100%', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: 'white', padding: '16px', borderRadius: 14, fontWeight: 700, fontSize: 16, border: 'none', cursor: 'pointer' }}>
            {paying ? 'Processing...' : `Pay ${Number(payment.amount_its).toLocaleString()} ITS`}
          </button>
        ) : (
          <div style={{ textAlign: 'center', color: payment.status === 'completed' ? '#22c55e' : '#ef4444', fontWeight: 700, fontSize: 16 }}>
            Payment {payment.status}
          </div>
        )}
        <div style={{ textAlign: 'center', marginTop: 20, fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>Secured by IT-S Gateway · IT-S Universe</div>
      </div>
    </div>
  )
}
