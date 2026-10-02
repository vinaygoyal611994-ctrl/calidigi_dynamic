'use client'

export default function BlogNewsletterForm() {
  return (
    <form className="nl-form" onSubmit={(e) => e.preventDefault()}>
      <div className="nl-field">
        <input type="text" placeholder="Your Name" className="nl-input" />
      </div>
      <div className="nl-field">
        <input type="email" placeholder="Your Email Address" className="nl-input" required />
      </div>
      <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
        Subscribe to Insights <i className="fas fa-paper-plane"></i>
      </button>
      <p className="nl-note"><i className="fas fa-lock"></i> No spam. Unsubscribe any time.</p>
    </form>
  )
}
