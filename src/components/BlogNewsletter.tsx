'use client'
import { useState } from 'react'

export default function BlogNewsletter() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
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
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <i className="fas fa-check-circle" style={{ fontSize: '2rem', color: '#16a34a' }}></i>
                <p style={{ marginTop: '12px', fontWeight: 600, color: '#16a34a' }}>You&rsquo;re Subscribed!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="blg-nl-field">
                  <label htmlFor="nl-name">First Name</label>
                  <input type="text" id="nl-name" placeholder="e.g. Sarah" autoComplete="given-name" />
                </div>
                <div className="blg-nl-field">
                  <label htmlFor="nl-email">Email Address <span style={{ color: 'var(--orange)' }}>*</span></label>
                  <input type="email" id="nl-email" className="blg-nl-input" placeholder="you@company.com" required autoComplete="email" aria-label="Email address for newsletter" />
                </div>
                <button type="submit" className="blg-nl-btn">
                  Subscribe Free &nbsp;<i className="fas fa-arrow-right"></i>
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
