'use client'
import { useEffect, useState } from 'react'

export default function GatewayAdmin() {
  const [payments, setPayments] = useState<any[]>([])
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, volume: 0 })

  useEffect(() => {
    fetch('/api/payment/history?admin=true').then(r => r.json()).then(d => {
      if (d.data) {
        setPayments(d.data)
        setStats({
          total: d.data.length,
          completed: d.data.filter((p: any) => p.status === 'completed').length,
          pending: d.data.filter((p: any) => p.status === 'pending').length,
          volume: d.data.reduce((s: number, p: any) => s + Number(p.amount_its), 0),
        })
      }
    })
  }, [])

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 32 }}>
        <div style={{ background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.4)', borderRadius: 10, padding: '6px 14px', fontSize: 12, color: '#ef4444', fontWeight: 700 }}>ADMIN</div>
        <h1 style={{ fontSize: 28, fontWeight: 800 }}>IT-S Gateway Admin</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 32 }}>
        {[
          { label: 'Total Payments', value: stats.total, color: '#6366f1' },
          { label: 'Completed', value: stats.completed, color: '#22c55e' },
          { label: 'Pending', value: stats.pending, color: '#f59e0b' },
          { label: 'Volume (ITS)', value: stats.volume.toLocaleString(), color: '#22d3ee' },
        ].map(s => (
          <div key={s.label} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: 24 }}>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)', fontWeight: 700 }}>Live Payments Feed</div>
        {payments.length === 0 ? (
          <div style={{ padding: 60, textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>No payments yet</div>
        ) : payments.map((p, i) => (
          <div key={p.id} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: 16, alignItems: 'center', padding: '14px 24px', borderBottom: i < payments.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{p.reference_id?.slice(0, 16) || p.id.slice(0, 16)}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{new Date(p.created_at).toLocaleString()}</div>
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#22d3ee' }}>{Number(p.amount_its).toLocaleString()} ITS</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>PKR {Number(p.amount_pkr).toLocaleString()}</div>
            <div style={{ background: p.status === 'completed' ? 'rgba(34,197,94,0.2)' : 'rgba(245,158,11,0.2)', color: p.status === 'completed' ? '#22c55e' : '#f59e0b', padding: '4px 12px', borderRadius: 8, fontSize: 12, fontWeight: 700 }}>{p.status}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
