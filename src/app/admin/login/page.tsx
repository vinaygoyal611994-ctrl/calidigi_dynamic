'use client'
import { useState, useEffect, Suspense } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { adminApi, setToken, getToken } from '@/lib/adminApi'

type View = 'login' | 'forgot' | 'sent' | 'reset'

function LoginContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const resetToken = searchParams.get('token')

  const [view, setView] = useState<View>(resetToken ? 'reset' : 'login')

  // Login
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)

  // Forgot
  const [forgotUser, setForgotUser] = useState('')
  const [resetLink, setResetLink] = useState('')

  // Reset
  const [newPwd, setNewPwd] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')
  const [showNewPwd, setShowNewPwd] = useState(false)

  // Shared
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (getToken()) {
      adminApi.me().then(res => {
        if (res.ok) router.replace('/admin/dashboard')
      }).catch(() => {})
    }
  }, [router])

  const switchView = (v: View) => { setView(v); setError(''); setSuccess('') }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!username.trim() || !password.trim()) { setError('Please enter username and password.'); return }
    setLoading(true); setError('')
    try {
      const res = await adminApi.login(username.trim(), password)
      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        setError(d.message || 'Invalid credentials. Please try again.')
        return
      }
      const d = await res.json()
      setToken(d.token)
      router.push('/admin/dashboard')
    } catch { setError('Unable to connect to server. Please try again.') }
    finally { setLoading(false) }
  }

  async function handleForgot(e: React.FormEvent) {
    e.preventDefault()
    if (!forgotUser.trim()) { setError('Please enter your username.'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/admin/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: forgotUser.trim() }),
      })
      const d = await res.json()
      if (!res.ok) { setError(d.message || 'Request failed.'); return }
      setResetLink(d.resetUrl || '')
      setView('sent')
    } catch { setError('Unable to connect to server.') }
    finally { setLoading(false) }
  }

  async function handleReset(e: React.FormEvent) {
    e.preventDefault()
    if (!newPwd || !confirmPwd) { setError('Please fill in all fields.'); return }
    if (newPwd.length < 8) { setError('Password must be at least 8 characters.'); return }
    if (newPwd !== confirmPwd) { setError('Passwords do not match.'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/admin/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: resetToken, newPassword: newPwd }),
      })
      const d = await res.json()
      if (!res.ok) { setError(d.message || 'Reset failed.'); return }
      setSuccess('Password updated! Redirecting to login…')
      setTimeout(() => router.replace('/admin/login'), 2200)
    } catch { setError('Unable to connect to server.') }
    finally { setLoading(false) }
  }

  return (
    <div className="adm-login-wrap">
      {/* ── LEFT BRANDING PANEL ── */}
      <div className="adm-login-left">
        <div className="adm-ll-glow1"></div>
        <div className="adm-ll-glow2"></div>
        <div className="adm-ll-grid"></div>

        <div className="adm-ll-inner">
          {/* Logo */}
          <div className="adm-ll-logo">
            <div className="adm-ll-logo-pill">
              <Image src="/images/logo.png" alt="Calidigi" width={150} height={48}
                style={{ height: 44, width: 'auto', display: 'block' }} />
            </div>
            <span className="adm-ll-badge">Admin</span>
          </div>

          {/* Center Content */}
          <div className="adm-ll-center">
            <div className="adm-ll-tagline">
              <i className="fas fa-bolt"></i> Digital Marketing Command Center
            </div>
            <h2 className="adm-ll-title">Manage Your<br /><span className="adm-ll-title-accent">Digital Presence</span></h2>
            <p className="adm-ll-desc">Control your entire web presence — leads, blog content, and client inquiries — all from one intelligent dashboard built for Calidigi.</p>

            <ul className="adm-ll-features">
              <li>
                <span className="adm-llf-icon"><i className="fas fa-users"></i></span>
                <div>
                  <span className="adm-llf-title">Lead Management</span>
                  <span className="adm-llf-sub">Track &amp; respond to contact submissions</span>
                </div>
              </li>
              <li>
                <span className="adm-llf-icon"><i className="fas fa-pen-nib"></i></span>
                <div>
                  <span className="adm-llf-title">Content Publishing</span>
                  <span className="adm-llf-sub">Create and manage blog articles</span>
                </div>
              </li>
              <li>
                <span className="adm-llf-icon"><i className="fas fa-shield-halved"></i></span>
                <div>
                  <span className="adm-llf-title">Secure &amp; Private</span>
                  <span className="adm-llf-sub">JWT auth with encrypted passwords</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Footer */}
          <div className="adm-ll-footer">
            <p className="adm-ll-footer-text" suppressHydrationWarning>
              &copy; {new Date().getFullYear()} Calidigi &mdash; All rights reserved
            </p>
            <p className="adm-ll-footer-sub">Authorized personnel only</p>
          </div>
        </div>
      </div>

      {/* ── RIGHT FORM PANEL ── */}
      <div className="adm-login-right">
        <div className="adm-login-card">

          {/* ── LOGIN VIEW ── */}
          {view === 'login' && (
            <div className="adm-lc-view">
              <div className="adm-lc-header">
                <div className="adm-lc-logo">
                  <Image src="/images/logo.png" alt="Calidigi" width={180} height={60}
                    style={{ height: 58, width: 'auto', display: 'block' }} />
                </div>
                <h1 className="adm-login-heading">Welcome back <span className="adm-login-badge adm-badge-inline">Admin</span></h1>
                <p className="adm-login-sub">Sign in to your Calidigi control panel</p>
              </div>

              <form className="adm-login-form" onSubmit={handleLogin} noValidate>
                <div className={`adm-login-alert adm-login-alert-error${error ? ' adm-alert-show' : ''}`} aria-live="polite">
                  <i className="fas fa-circle-exclamation"></i> <span>{error}</span>
                </div>

                <div className="adm-login-group">
                  <label className="adm-login-label">Username</label>
                  <div className="adm-login-field">
                    <i className="fas fa-user adm-lf-icon"></i>
                    <input type="text" className={`adm-login-input${error ? ' adm-input-err' : ''}`}
                      placeholder="admin" value={username} autoFocus autoComplete="username"
                      suppressHydrationWarning
                      onChange={e => { setUsername(e.target.value); setError('') }} />
                  </div>
                </div>

                <div className="adm-login-group">
                  <div className="adm-login-label-row">
                    <label className="adm-login-label">Password</label>
                    <button type="button" className="adm-forgot-link" onClick={() => switchView('forgot')}>
                      Forgot password?
                    </button>
                  </div>
                  <div className="adm-login-field">
                    <i className="fas fa-lock adm-lf-icon"></i>
                    <input type={showPwd ? 'text' : 'password'}
                      className={`adm-login-input adm-input-pr${error ? ' adm-input-err' : ''}`}
                      placeholder="••••••••" value={password} autoComplete="current-password"
                      suppressHydrationWarning
                      onChange={e => { setPassword(e.target.value); setError('') }} />
                    <button type="button" className="adm-eye-btn" onClick={() => setShowPwd(v => !v)}>
                      <i className={`fas ${showPwd ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>
                </div>

                <button type="submit" className="adm-login-btn" disabled={loading}>
                  {loading
                    ? <><i className="fas fa-spinner fa-spin"></i> Signing in…</>
                    : <><i className="fas fa-right-to-bracket"></i> Sign In</>}
                </button>
              </form>

              <p className="adm-lc-footnote"><i className="fas fa-lock"></i> Authorized access only — Calidigi Admin</p>
            </div>
          )}

          {/* ── FORGOT VIEW ── */}
          {view === 'forgot' && (
            <div className="adm-lc-view">
              <button className="adm-back-btn" onClick={() => switchView('login')}>
                <i className="fas fa-arrow-left"></i> Back to login
              </button>
              <div className="adm-lc-view-icon adm-vi-orange">
                <i className="fas fa-key"></i>
              </div>
              <h1 className="adm-login-heading">Forgot Password?</h1>
              <p className="adm-login-sub">Enter your username and we'll generate a secure reset link instantly.</p>

              <form className="adm-login-form" onSubmit={handleForgot} noValidate>
                <div className={`adm-login-alert adm-login-alert-error${error ? ' adm-alert-show' : ''}`} aria-live="polite">
                  <i className="fas fa-circle-exclamation"></i> <span>{error}</span>
                </div>
                <div className="adm-login-group">
                  <label className="adm-login-label">Username</label>
                  <div className="adm-login-field">
                    <i className="fas fa-user adm-lf-icon"></i>
                    <input type="text" className="adm-login-input" placeholder="admin"
                      value={forgotUser} autoFocus
                      onChange={e => { setForgotUser(e.target.value); setError('') }} />
                  </div>
                </div>
                <button type="submit" className="adm-login-btn" disabled={loading}>
                  {loading
                    ? <><i className="fas fa-spinner fa-spin"></i> Generating…</>
                    : <><i className="fas fa-paper-plane"></i> Generate Reset Link</>}
                </button>
              </form>
            </div>
          )}

          {/* ── SENT VIEW ── */}
          {view === 'sent' && (
            <div className="adm-lc-view adm-lc-centered">
              <div className="adm-lc-view-icon adm-vi-green">
                <i className="fas fa-circle-check"></i>
              </div>
              <h1 className="adm-login-heading">Reset Link Ready!</h1>
              <p className="adm-login-sub">
                Click the link below to reset your password.<br />
                <strong>Expires in 15 minutes.</strong>
              </p>

              <div className="adm-reset-link-box">
                <div className="adm-rlb-label"><i className="fas fa-link"></i> Your secure reset link</div>
                <div className="adm-rlb-url">{resetLink}</div>
              </div>

              <a href={resetLink} className="adm-login-btn adm-login-btn-link">
                <i className="fas fa-unlock-keyhole"></i> Open Reset Page
              </a>

              <button type="button" className="adm-back-btn adm-back-center" onClick={() => switchView('login')}>
                <i className="fas fa-arrow-left"></i> Back to login
              </button>
            </div>
          )}

          {/* ── RESET VIEW ── */}
          {view === 'reset' && (
            <div className="adm-lc-view">
              {!success ? (
                <>
                  <button className="adm-back-btn" onClick={() => router.replace('/admin/login')}>
                    <i className="fas fa-arrow-left"></i> Back to login
                  </button>
                  <div className="adm-lc-view-icon adm-vi-orange">
                    <i className="fas fa-unlock-keyhole"></i>
                  </div>
                  <h1 className="adm-login-heading">Set New Password</h1>
                  <p className="adm-login-sub">Choose a strong password of at least 8 characters.</p>

                  <form className="adm-login-form" onSubmit={handleReset} noValidate>
                    <div className={`adm-login-alert adm-login-alert-error${error ? ' adm-alert-show' : ''}`} aria-live="polite">
                      <i className="fas fa-circle-exclamation"></i> <span>{error}</span>
                    </div>
                    <div className="adm-login-group">
                      <label className="adm-login-label">New Password</label>
                      <div className="adm-login-field">
                        <i className="fas fa-lock adm-lf-icon"></i>
                        <input type={showNewPwd ? 'text' : 'password'}
                          className="adm-login-input adm-input-pr"
                          placeholder="Min 8 characters" value={newPwd} autoFocus
                          onChange={e => { setNewPwd(e.target.value); setError('') }} />
                        <button type="button" className="adm-eye-btn" onClick={() => setShowNewPwd(v => !v)}>
                          <i className={`fas ${showNewPwd ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                        </button>
                      </div>
                    </div>
                    <div className="adm-login-group">
                      <label className="adm-login-label">Confirm Password</label>
                      <div className="adm-login-field">
                        <i className="fas fa-lock adm-lf-icon"></i>
                        <input type="password" className="adm-login-input"
                          placeholder="Repeat new password" value={confirmPwd}
                          onChange={e => { setConfirmPwd(e.target.value); setError('') }} />
                      </div>
                    </div>

                    {/* Password strength hints */}
                    {newPwd && (
                      <div className="adm-pwd-hints">
                        <span className={newPwd.length >= 8 ? 'adm-ph-ok' : 'adm-ph-no'}>
                          <i className={`fas ${newPwd.length >= 8 ? 'fa-check' : 'fa-times'}`}></i> 8+ characters
                        </span>
                        <span className={/[A-Z]/.test(newPwd) ? 'adm-ph-ok' : 'adm-ph-no'}>
                          <i className={`fas ${/[A-Z]/.test(newPwd) ? 'fa-check' : 'fa-times'}`}></i> Uppercase
                        </span>
                        <span className={/[0-9]/.test(newPwd) ? 'adm-ph-ok' : 'adm-ph-no'}>
                          <i className={`fas ${/[0-9]/.test(newPwd) ? 'fa-check' : 'fa-times'}`}></i> Number
                        </span>
                      </div>
                    )}

                    <button type="submit" className="adm-login-btn" disabled={loading}>
                      {loading
                        ? <><i className="fas fa-spinner fa-spin"></i> Updating…</>
                        : <><i className="fas fa-check"></i> Reset Password</>}
                    </button>
                  </form>
                </>
              ) : (
                <div className="adm-lc-centered">
                  <div className="adm-lc-view-icon adm-vi-green">
                    <i className="fas fa-circle-check"></i>
                  </div>
                  <h1 className="adm-login-heading">Password Updated!</h1>
                  <p className="adm-login-sub">{success}</p>
                  <div className="adm-login-spinner-row">
                    <i className="fas fa-spinner fa-spin"></i>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <div className="adm-loading-screen">
        <div className="adm-loading-spinner"></div>
        <p className="adm-loading-text">Loading…</p>
      </div>
    }>
      <LoginContent />
    </Suspense>
  )
}
