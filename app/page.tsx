export default function Home() {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 80 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 100, padding: '8px 20px', marginBottom: 24, fontSize: 13, color: '#6366f1' }}>
          ⚡ IT-S Gateway — Payment Infrastructure
        </div>
        <h1 style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1, marginBottom: 20, background: 'linear-gradient(135deg,#ffffff,#6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Accept IT-S Coin<br />Payments Instantly
        </h1>
        <p style={{ fontSize: 20, color: 'rgba(255,255,255,0.6)', marginBottom: 40, maxWidth: 560, margin: '0 auto 40px' }}>
          The universal payment gateway for IT-S Universe. Fast, secure, with webhooks and instant settlement.
        </p>
        <a href="https://it-s-merchant.vercel.app/register" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: 'white', padding: '14px 32px', borderRadius: 14, fontWeight: 700, fontSize: 16, textDecoration: 'none', display: 'inline-block' }}>
          Become a Merchant →
        </a>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24, marginBottom: 80 }}>
        {[
          { icon: '⚡', title: 'Instant Payments', desc: 'Checkout pages load in milliseconds. Payments settle in seconds.' },
          { icon: '🔐', title: 'Secure', desc: 'Every payment is verified and secured with cryptographic signatures.' },
          { icon: '💰', title: 'Low Fees', desc: 'Only 0.5% processing fee. No hidden charges. Transparent pricing.' },
          { icon: '🔔', title: 'Webhooks', desc: 'Real-time webhook notifications for every payment event.' },
          { icon: '↩️', title: 'Refunds', desc: 'One-click refunds processed instantly back to customer wallet.' },
          { icon: '📊', title: 'Analytics', desc: 'Track all payments, disputes, and revenue in real time.' },
        ].map(f => (
          <div key={f.title} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 28 }}>
            <div style={{ fontSize: 32, marginBottom: 14 }}>{f.icon}</div>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{f.title}</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, lineHeight: 1.6 }}>{f.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.2)', borderRadius: 20, padding: 40 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20 }}>API Integration</h2>
        <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: 12, padding: 24, fontFamily: 'monospace', fontSize: 13, color: '#22d3ee', lineHeight: 1.8 }}>
          <div style={{ color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}># Create a payment</div>
          <div>POST https://it-s-gateway.vercel.app/api/payment/create</div>
          <div style={{ color: 'rgba(255,255,255,0.5)', marginTop: 12 }}>{'{'}</div>
          <div style={{ paddingLeft: 16 }}>"merchant_id": "your-merchant-id",</div>
          <div style={{ paddingLeft: 16 }}>"amount_pkr": 1000,</div>
          <div style={{ paddingLeft: 16 }}>"webhook_url": "https://yoursite.com/webhook"</div>
          <div style={{ color: 'rgba(255,255,255,0.5)' }}>{'}'}</div>
        </div>
      </div>
    </div>
  )
}
