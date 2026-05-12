export default function SuccessPage() {
  return (
    <div style={{ maxWidth: 480, margin: '100px auto', padding: '0 24px', textAlign: 'center' }}>
      <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 24, padding: 56 }}>
        <div style={{ fontSize: 72, marginBottom: 24 }}>✅</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#22c55e', marginBottom: 12 }}>Payment Successful!</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>Your IT-S Coin payment has been processed and confirmed. The merchant has been notified.</p>
        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 14, padding: 20, marginBottom: 32 }}>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 6 }}>Powered by</div>
          <div style={{ fontWeight: 800, color: '#22d3ee', fontSize: 18 }}>IT-S Gateway · IT-S Universe</div>
        </div>
        <a href="/" style={{ display: 'inline-block', background: 'linear-gradient(135deg,#22c55e,#16a34a)', color: 'white', padding: '14px 32px', borderRadius: 14, fontWeight: 700, textDecoration: 'none' }}>Go to Gateway</a>
      </div>
    </div>
  )
}
