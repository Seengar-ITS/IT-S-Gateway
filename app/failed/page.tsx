'use client'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function FailedContent() {
  const params = useSearchParams()
  const reason = params.get('reason') || 'Payment could not be processed'
  return (
    <div style={{ maxWidth: 480, margin: '100px auto', padding: '0 24px', textAlign: 'center' }}>
      <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 24, padding: 56 }}>
        <div style={{ fontSize: 72, marginBottom: 24 }}>❌</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#ef4444', marginBottom: 12 }}>Payment Failed</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, marginBottom: 32 }}>{reason}</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button onClick={() => window.history.back()} style={{ background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.4)', color: '#ef4444', padding: '12px 24px', borderRadius: 12, fontWeight: 600, cursor: 'pointer', fontSize: 15 }}>Try Again</button>
          <a href="/" style={{ display: 'inline-block', background: 'rgba(255,255,255,0.08)', color: 'white', padding: '12px 24px', borderRadius: 12, textDecoration: 'none', fontWeight: 600, fontSize: 15 }}>Go Home</a>
        </div>
      </div>
    </div>
  )
}

export default function FailedPage() {
  return <Suspense fallback={null}><FailedContent /></Suspense>
}
