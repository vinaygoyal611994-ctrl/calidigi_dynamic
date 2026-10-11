'use client'
import { useState } from 'react'

export default function BlogNewsletterForm() {
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [nameErr, setNameErr]   = useState('')
  const [emailErr, setEmailErr] = useState('')
  const [status, setStatus]     = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [serverMsg, setServerMsg] = useState('')

  function validate() {
    let valid = true
    setNameErr('')
    setEmailErr('')

    if (!name.trim()) {
      setNameErr('Name is required.')
      valid = false
    }
    if (!email.trim()) {
      setEmailErr('Email address is required.')
      valid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailErr('Please enter a valid email address.')
      valid = false
    }
    return valid
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setStatus('loading')
    setServerMsg('')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      })
      const data = await res.json()
      if (!res.ok) {
        setStatus('error')
        setServerMsg(data.message || 'Something went wrong.')
      } else {
        setStatus('success')
      }
    } catch {
      setStatus('error')
      setServerMsg('Unable to connect. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div style={{ textAlign: 'center', padding: '24px 0' }}>
        <div style={{ fontSize: '2.2rem', marginBottom: 10 }}>🎉</div>
        <p style={{ fontWeight: 700, marginBottom: 6, fontSize: '1.05rem' }}>You&apos;re subscribed!</p>
        <p style={{ color: 'var(--gray-400)', fontSize: '0.88rem' }}>Check your inbox for a welcome email from us.</p>
      </div>
    )
  }

  return (
    <form className="nl-form" onSubmit={handleSubmit} noValidate>
      {status === 'error' && serverMsg && (
        <p style={{ color: '#ef4444', fontSize: '0.84rem', marginBottom: 10, textAlign: 'center' }}>
          <i className="fas fa-circle-exclamation" style={{ marginRight: 6 }}></i>{serverMsg}
        </p>
      )}

      {/* Name field */}
      <div className="nl-field">
        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: 4, color: 'var(--gray-300)' }}>
          Your Name <span style={{ color: '#F5821F' }}>*</span>
        </label>
        <input
          type="text"
          placeholder="John Smith"
          className={`nl-input${nameErr ? ' nl-input-error' : ''}`}
          value={name}
          onChange={e => { setName(e.target.value); if (nameErr) setNameErr('') }}
        />
        {nameErr && (
          <p style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: 4, marginBottom: 0 }}>
            <i className="fas fa-circle-exclamation" style={{ marginRight: 4 }}></i>{nameErr}
          </p>
        )}
      </div>

      {/* Email field */}
      <div className="nl-field">
        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: 4, color: 'var(--gray-300)' }}>
          Email Address <span style={{ color: '#F5821F' }}>*</span>
        </label>
        <input
          type="email"
          placeholder="john@example.com"
          className={`nl-input${emailErr ? ' nl-input-error' : ''}`}
          value={email}
          onChange={e => { setEmail(e.target.value); if (emailErr) setEmailErr('') }}
        />
        {emailErr && (
          <p style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: 4, marginBottom: 0 }}>
            <i className="fas fa-circle-exclamation" style={{ marginRight: 4 }}></i>{emailErr}
          </p>
        )}
      </div>

      <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 4 }} disabled={status === 'loading'}>
        {status === 'loading'
          ? <><i className="fas fa-spinner fa-spin"></i> Subscribing…</>
          : <><i className="fas fa-paper-plane"></i> Subscribe to Insights</>}
      </button>
      <p className="nl-note"><i className="fas fa-lock"></i> No spam. Unsubscribe any time.</p>
    </form>
  )
}
