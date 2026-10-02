'use client'
import { useState } from 'react'
import { adminApi } from '@/lib/adminApi'

export default function SettingsPage() {
  const [currentPwd, setCurrentPwd] = useState('')
  const [newPwd, setNewPwd]         = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')
  const [pwdLoading, setPwdLoading] = useState(false)
  const [pwdMsg, setPwdMsg]         = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew]         = useState(false)

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault()
    setPwdMsg(null)
    if (!currentPwd || !newPwd || !confirmPwd) { setPwdMsg({ type: 'error', text: 'All fields are required.' }); return }
    if (newPwd.length < 8) { setPwdMsg({ type: 'error', text: 'New password must be at least 8 characters.' }); return }
    if (newPwd !== confirmPwd) { setPwdMsg({ type: 'error', text: 'Passwords do not match.' }); return }

    setPwdLoading(true)
    try {
      const res = await adminApi.changePassword({ currentPassword: currentPwd, newPassword: newPwd })
      if (!res.ok) { const d = await res.json().catch(() => ({})); setPwdMsg({ type: 'error', text: d.message || 'Failed to change password.' }); return }
      setPwdMsg({ type: 'success', text: 'Password changed successfully.' })
      setCurrentPwd(''); setNewPwd(''); setConfirmPwd('')
    } catch { setPwdMsg({ type: 'error', text: 'Unable to connect to server.' }) }
    finally { setPwdLoading(false) }
  }

  return (
    <>
      <div className="adm-page-head">
        <div className="adm-head-left">
          <h1>Settings</h1>
          <p>Manage admin account and site configuration</p>
        </div>
      </div>

      <div className="adm-settings-grid">
        {/* Change Password */}
        <div className="adm-card">
          <div className="adm-card-title"><i className="fas fa-lock"></i> Change Password</div>

          {pwdMsg && (
            <div style={{
              padding: '10px 14px', borderRadius: 8, marginBottom: 16, fontSize: '0.84rem', display: 'flex', alignItems: 'center', gap: 8,
              background: pwdMsg.type === 'success' ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)',
              border: `1px solid ${pwdMsg.type === 'success' ? 'rgba(16,185,129,0.25)' : 'rgba(239,68,68,0.2)'}`,
              color: pwdMsg.type === 'success' ? '#059669' : '#dc2626',
            }}>
              <i className={`fas ${pwdMsg.type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}`}></i>
              {pwdMsg.text}
            </div>
          )}

          <form onSubmit={handlePasswordChange} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="adm-form-group">
              <label className="adm-label">Current Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showCurrent ? 'text' : 'password'}
                  className="adm-input"
                  placeholder="Enter current password"
                  value={currentPwd}
                  onChange={e => setCurrentPwd(e.target.value)}
                  style={{ paddingRight: 40 }}
                />
                <button type="button" onClick={() => setShowCurrent(v => !v)}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-400)', fontSize: '0.82rem' }}>
                  <i className={`fas ${showCurrent ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>

            <div className="adm-form-group">
              <label className="adm-label">New Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showNew ? 'text' : 'password'}
                  className="adm-input"
                  placeholder="Minimum 8 characters"
                  value={newPwd}
                  onChange={e => setNewPwd(e.target.value)}
                  style={{ paddingRight: 40 }}
                />
                <button type="button" onClick={() => setShowNew(v => !v)}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-400)', fontSize: '0.82rem' }}>
                  <i className={`fas ${showNew ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
              {newPwd && newPwd.length < 8 && <span className="adm-field-hint" style={{ color: '#f59e0b' }}>Must be at least 8 characters</span>}
            </div>

            <div className="adm-form-group">
              <label className="adm-label">Confirm New Password</label>
              <input
                type="password"
                className="adm-input"
                placeholder="Repeat new password"
                value={confirmPwd}
                onChange={e => setConfirmPwd(e.target.value)}
              />
              {confirmPwd && newPwd !== confirmPwd && <span className="adm-field-hint" style={{ color: '#ef4444' }}>Passwords do not match</span>}
            </div>

            <button type="submit" className="adm-btn adm-btn-primary" disabled={pwdLoading} style={{ alignSelf: 'flex-start' }}>
              {pwdLoading ? <><i className="fas fa-spinner fa-spin"></i> Updating…</> : <><i className="fas fa-key"></i> Update Password</>}
            </button>
          </form>
        </div>

        {/* Admin Info */}
        <div className="adm-card">
          <div className="adm-card-title"><i className="fas fa-circle-info"></i> Admin Panel Info</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { label: 'Admin URL', val: '/admin' },
              { label: 'Login URL', val: '/admin/login' },
              { label: 'API Base', val: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000' },
              { label: 'Version', val: '1.0.0' },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 12, borderBottom: '1px solid var(--gray-200)' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--gray-500)', fontFamily: 'var(--font-head)', fontWeight: 600 }}>{row.label}</span>
                <code style={{ fontSize: '0.8rem', background: 'var(--gray-100)', padding: '3px 8px', borderRadius: 5, color: 'var(--navy)' }}>{row.val}</code>
              </div>
            ))}
          </div>
        </div>

        {/* Site Info */}
        <div className="adm-card">
          <div className="adm-card-title"><i className="fas fa-globe"></i> Site Pages</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              { href: '/', label: 'Home' },
              { href: '/about', label: 'About' },
              { href: '/services', label: 'Services' },
              { href: '/solutions', label: 'Solutions' },
              { href: '/portfolio', label: 'Portfolio' },
              { href: '/blog', label: 'Blog' },
              { href: '/contact-us', label: 'Contact Us' },
            ].map(p => (
              <a key={p.href} href={p.href} target="_blank" rel="noopener"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--gray-200)', textDecoration: 'none', fontSize: '0.84rem' }}>
                <span style={{ color: 'var(--navy)', fontWeight: 500 }}>{p.label}</span>
                <span style={{ color: 'var(--orange)', fontSize: '0.72rem' }}><i className="fas fa-external-link"></i> {p.href}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Quick Nav */}
        <div className="adm-card">
          <div className="adm-card-title"><i className="fas fa-bolt"></i> Quick Actions</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { href: '/admin/dashboard', icon: 'fa-gauge',    label: 'Go to Dashboard' },
              { href: '/admin/contacts',  icon: 'fa-inbox',   label: 'View All Contacts' },
              { href: '/admin/blogs',     icon: 'fa-newspaper',label: 'Manage Blog Posts' },
              { href: '/admin/blogs/new', icon: 'fa-plus',    label: 'Create New Post' },
            ].map(a => (
              <a key={a.href} href={a.href}
                className="adm-quick-btn"
                style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                <i className={`fas ${a.icon}`} style={{ width: 18, textAlign: 'center' }}></i>
                <span>{a.label}</span>
                <i className="fas fa-arrow-right" style={{ marginLeft: 'auto', fontSize: '0.7rem', color: 'var(--gray-400)' }}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
