'use client'
import { useState } from 'react'

export default function BlogNewsletter() {
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [nameErr, setNameErr]   = useState('')
  const [emailErr, setEmailErr] = useState('')
  const [status, setStatus]     = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [serverMsg, setServerMsg] = useState('')

  function validate() {
    let valid = true
    setNameErr(''); setEmailErr('')
    if (!name.trim()) { setNameErr('First name is required.'); valid = false }
    if (!email.trim()) {
      setEmailErr('Email address is required.'); valid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailErr('Please enter a valid email address.'); valid = false
    }
    return valid
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading'); setServerMsg('')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      })
      const data = await res.json()
      if (!res.ok) { setStatus('error'); setServerMsg(data.message || 'Something went wrong.') }
      else { setStatus('success') }
    } catch { setStatus('error'); setServerMsg('Unable to connect. Please try again.') }
  }

  return (
    <section className="blg-newsletter" id="newsletter">
      <div className="blg-nl-dots"></div>
      <div className="container">
        <div className="blg-nl-grid">
          <div className="blg-nl-left">
            <div className="blg-nl-eyebrow"><i className="fas fa-paper-plane"></i> Weekly Newsletter</div>
            <h2>Stay Ahead of the<br /><span>Digital Curve</span></h2>
            <p>Join 2,400+ business owners and marketers who get our weekly digest of proven strategies in SEO, web design, AI tools, and local marketing — straight to their inbox.</p>
            <ul className="blg-nl-benefits">
              <li><i className="fas fa-check"></i> Actionable tips every week</li>
              <li><i className="fas fa-check"></i> No fluff — only what works</li>
              <li><i className="fas fa-check"></i> Free forever, unsubscribe any time</li>
            </ul>
            <div className="blg-nl-proof">
              <div className="blg-nl-avatars"><span>JM</span><span>SK</span><span>RL</span><span>+</span></div>
              <div className="blg-nl-proof-text">
                <strong>2,400+ subscribers</strong>
                <span>★★★★★ Loved by readers</span>
              </div>
            </div>
          </div>

          <div className="blg-nl-card">
            <div className="blg-nl-card-icon"><i className="fas fa-envelope-open-text"></i></div>
            <h3>Get Your Free Weekly Digest</h3>
            <p>Enter your details below and we&rsquo;ll send your first issue within 24 hours.</p>

            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '28px 0' }}>
                <i className="fas fa-check-circle" style={{ fontSize: '2.5rem', color: '#16a34a' }}></i>
                <p style={{ marginTop: 14, fontWeight: 700, fontSize: '1.1rem', color: '#16a34a' }}>You&rsquo;re Subscribed!</p>
                <p style={{ fontSize: '0.9rem', color: '#6b7280', marginTop: 6 }}>Check your inbox for a welcome email from us.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {status === 'error' && serverMsg && (
                  <p style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: 12, textAlign: 'center' }}>
                    <i className="fas fa-circle-exclamation" style={{ marginRight: 6 }}></i>{serverMsg}
                  </p>
                )}

                <div className="blg-nl-field">
                  <label htmlFor="nl-name">
                    First Name <span style={{ color: 'var(--orange)' }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="nl-name"
                    placeholder="e.g. Sarah"
                    autoComplete="given-name"
                    value={name}
                    onChange={e => { setName(e.target.value); if (nameErr) setNameErr('') }}
                    style={nameErr ? { borderColor: '#ef4444', boxShadow: '0 0 0 3px rgba(239,68,68,0.1)' } : {}}
                  />
                  {nameErr && (
                    <p style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: 4 }}>
                      <i className="fas fa-circle-exclamation" style={{ marginRight: 4 }}></i>{nameErr}
                    </p>
                  )}
                </div>

                <div className="blg-nl-field">
                  <label htmlFor="nl-email">
                    Email Address <span style={{ color: 'var(--orange)' }}>*</span>
                  </label>
                  <input
                    type="email"
                    id="nl-email"
                    placeholder="you@company.com"
                    autoComplete="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); if (emailErr) setEmailErr('') }}
                    style={emailErr ? { borderColor: '#ef4444', boxShadow: '0 0 0 3px rgba(239,68,68,0.1)' } : {}}
                  />
                  {emailErr && (
                    <p style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: 4 }}>
                      <i className="fas fa-circle-exclamation" style={{ marginRight: 4 }}></i>{emailErr}
                    </p>
                  )}
                </div>

                <button type="submit" className="blg-nl-btn" disabled={status === 'loading'}>
                  {status === 'loading'
                    ? <><i className="fas fa-spinner fa-spin"></i> Subscribing…</>
                    : <>Subscribe Free &nbsp;<i className="fas fa-arrow-right"></i></>}
                </button>
              </form>
            )}

            <p className="blg-nl-note"><i className="fas fa-shield-alt"></i> 100% private. No spam. Unsubscribe any time.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
