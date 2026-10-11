'use client'
import { useEffect, useState, useCallback } from 'react'
import { adminApi } from '@/lib/adminApi'

interface Subscriber {
  id: number
  name: string | null
  email: string
  createdAt: string
}

const PAGE_SIZE = 20

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function exportCSV(subscribers: Subscriber[]) {
  const headers = ['#', 'Name', 'Email', 'Subscribed On']
  const rows = subscribers.map((s, i) => [i + 1, s.name || '', s.email, formatDate(s.createdAt)])
  const csv = [headers, ...rows].map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n')
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = 'newsletter-subscribers.csv'; a.click()
  URL.revokeObjectURL(url)
}

export default function NewslettersPage() {
  const [subscribers, setSubscribers]   = useState<Subscriber[]>([])
  const [total, setTotal]               = useState(0)
  const [page, setPage]                 = useState(1)
  const [totalPages, setTotalPages]     = useState(1)
  const [search, setSearch]             = useState('')
  const [searchInput, setSearchInput]   = useState('')
  const [loading, setLoading]           = useState(true)
  const [deleting, setDeleting]         = useState<number | null>(null)
  const [exportLoading, setExportLoading] = useState(false)

  // Delete confirm modal state
  const [deleteTarget, setDeleteTarget]   = useState<Subscriber | null>(null)

  // Reply modal state
  const [replyTarget, setReplyTarget]   = useState<Subscriber | null>(null)
  const [replySubject, setReplySubject] = useState('')
  const [replyBody, setReplyBody]       = useState('')
  const [replySending, setReplySending] = useState(false)
  const [replyStatus, setReplyStatus]   = useState<'idle' | 'success' | 'error'>('idle')
  const [replyMsg, setReplyMsg]         = useState('')

  const fetchData = useCallback(async (p = 1, s = search) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page: String(p), limit: String(PAGE_SIZE) })
      if (s) params.set('search', s)
      const res  = await adminApi.getNewsletters('?' + params)
      const data = await res.json()
      setSubscribers(data.subscribers || [])
      setTotal(data.total || 0)
      setPage(data.page || 1)
      setTotalPages(data.totalPages || 1)
    } catch { /* ignore */ }
    finally { setLoading(false) }
  }, [search])

  useEffect(() => { fetchData(1, '') }, [])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setSearch(searchInput)
    fetchData(1, searchInput)
  }

  function handleClearSearch() {
    setSearchInput(''); setSearch('')
    fetchData(1, '')
  }

  async function confirmDelete() {
    if (!deleteTarget) return
    setDeleting(deleteTarget.id)
    setDeleteTarget(null)
    try { await adminApi.deleteNewsletter(deleteTarget.id); fetchData(page, search) }
    catch { /* ignore */ }
    finally { setDeleting(null) }
  }

  async function handleExportAll() {
    setExportLoading(true)
    try {
      const res  = await adminApi.getNewsletters('?limit=10000')
      const data = await res.json()
      exportCSV(data.subscribers || [])
    } catch { /* ignore */ }
    finally { setExportLoading(false) }
  }

  function openReply(s: Subscriber) {
    setReplyTarget(s)
    setReplySubject('Calidigi Insights — Exclusive Update for You')
    setReplyBody(`Hi ${s.name || 'there'},\n\nThank you for subscribing to Calidigi Insights!\n\n`)
    setReplyStatus('idle'); setReplyMsg('')
  }

  function closeReply() {
    setReplyTarget(null); setReplySending(false)
    setReplyStatus('idle'); setReplyMsg('')
  }

  async function handleSendReply(e: React.FormEvent) {
    e.preventDefault()
    if (!replyTarget || !replyBody.trim()) return
    setReplySending(true); setReplyStatus('idle'); setReplyMsg('')
    try {
      const res = await fetch('/api/admin/newsletters/reply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
        },
        body: JSON.stringify({
          email: replyTarget.email,
          name: replyTarget.name,
          subject: replySubject.trim() || 'Message from Calidigi',
          message: replyBody.trim(),
        }),
      })
      const data = await res.json()
      if (!res.ok) { setReplyStatus('error'); setReplyMsg(data.message || 'Failed to send.') }
      else { setReplyStatus('success'); setReplyMsg('Email sent successfully!') }
    } catch { setReplyStatus('error'); setReplyMsg('Unable to connect. Please try again.') }
    finally { setReplySending(false) }
  }

  return (
    <div>
      {/* Page Header */}
      <div className="adm-page-head">
        <div className="adm-head-left">
          <h1>Newsletter Subscribers</h1>
          <p>{total} subscriber{total !== 1 ? 's' : ''} total</p>
        </div>
        <div className="adm-head-right">
          <button className="adm-btn adm-btn-secondary" onClick={handleExportAll} disabled={exportLoading}>
            {exportLoading
              ? <><i className="fas fa-spinner fa-spin"></i> Exporting…</>
              : <><i className="fas fa-file-csv"></i> Export CSV</>}
          </button>
        </div>
      </div>

      {/* Filter / Search */}
      <div className="adm-filter-row">
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <div className="adm-search-wrap">
            <i className="fas fa-search"></i>
            <input
              className="adm-search-input"
              placeholder="Search name or email…"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
            />
          </div>
          <button type="submit" className="adm-btn adm-btn-primary adm-btn-sm">
            <i className="fas fa-search"></i> Search
          </button>
          {search && (
            <button type="button" className="adm-btn adm-btn-secondary adm-btn-sm" onClick={handleClearSearch}>
              <i className="fas fa-times"></i> Clear
            </button>
          )}
        </form>
      </div>

      {/* Table Card */}
      <div className="adm-card" style={{ padding: 0 }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
            <div className="adm-loading-spinner"></div>
          </div>
        ) : subscribers.length === 0 ? (
          <div className="adm-empty-state">
            <div className="adm-empty-icon"><i className="fas fa-envelope-open"></i></div>
            <h3>{search ? 'No subscribers found' : 'No subscribers yet'}</h3>
            <p>{search ? 'Try a different search term.' : 'Subscribers will appear here once someone signs up from the blog page.'}</p>
          </div>
        ) : (
          <div className="adm-table-wrap" style={{ border: 'none', borderRadius: 0, boxShadow: 'none' }}>
            <table className="adm-table">
              <thead>
                <tr>
                  <th style={{ width: 48 }}>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Subscribed On</th>
                  <th style={{ width: 100, textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((s, idx) => (
                  <tr key={s.id}>
                    <td className="adm-td-muted">{(page - 1) * PAGE_SIZE + idx + 1}</td>
                    <td style={{ fontWeight: 600 }}>{s.name || <span className="adm-td-muted">—</span>}</td>
                    <td>
                      <a href={`mailto:${s.email}`} style={{ color: 'var(--orange)', textDecoration: 'none', fontWeight: 500 }}>
                        {s.email}
                      </a>
                    </td>
                    <td className="adm-td-muted">{formatDate(s.createdAt)}</td>
                    <td>
                      <div className="adm-table-actions" style={{ justifyContent: 'center' }}>
                        <button
                          className="adm-icon-btn adm-icon-btn-primary"
                          title="Reply / Send Email"
                          onClick={() => openReply(s)}
                        >
                          <i className="fas fa-reply"></i>
                        </button>
                        <button
                          className="adm-icon-btn adm-icon-btn-danger"
                          title="Delete subscriber"
                          disabled={deleting === s.id}
                          onClick={() => setDeleteTarget(s)}
                        >
                          {deleting === s.id
                            ? <i className="fas fa-spinner fa-spin"></i>
                            : <i className="fas fa-trash"></i>}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="adm-pagination">
          <button
            className="adm-btn adm-btn-secondary adm-btn-sm"
            disabled={page <= 1}
            onClick={() => { const p = page - 1; setPage(p); fetchData(p, search) }}
          >
            <i className="fas fa-chevron-left"></i> Prev
          </button>
          <span className="adm-page-info">Page {page} of {totalPages}</span>
          <button
            className="adm-btn adm-btn-secondary adm-btn-sm"
            disabled={page >= totalPages}
            onClick={() => { const p = page + 1; setPage(p); fetchData(p, search) }}
          >
            Next <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteTarget && (
        <div className="adm-modal-backdrop" onClick={e => { if (e.target === e.currentTarget) setDeleteTarget(null) }}>
          <div className="adm-modal" style={{ maxWidth: 420 }}>
            <div className="adm-modal-header" style={{ borderBottom: 'none', paddingBottom: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: 'rgba(239,68,68,0.1)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  color: '#dc2626', fontSize: '1.1rem', flexShrink: 0,
                }}>
                  <i className="fas fa-trash"></i>
                </div>
                <div>
                  <div className="adm-modal-title" style={{ marginBottom: 2 }}>Delete Subscriber</div>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--gray-400)' }}>This action cannot be undone</p>
                </div>
              </div>
              <button className="adm-modal-close" onClick={() => setDeleteTarget(null)}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="adm-modal-body" style={{ paddingTop: 16 }}>
              <div style={{
                background: 'var(--gray-100)', borderRadius: 10,
                padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <div style={{
                  width: 38, height: 38, borderRadius: '50%',
                  background: 'var(--orange)', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '0.95rem', flexShrink: 0,
                }}>
                  {(deleteTarget.name || deleteTarget.email).charAt(0).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--navy)', marginBottom: 2 }}>
                    {deleteTarget.name || '—'}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--orange)' }}>{deleteTarget.email}</div>
                </div>
              </div>
              <p style={{ margin: '16px 0 0', fontSize: '0.88rem', color: 'var(--gray-500)', lineHeight: 1.6 }}>
                Are you sure you want to remove <strong style={{ color: 'var(--navy)' }}>{deleteTarget.name || deleteTarget.email}</strong> from the newsletter list? They will no longer receive emails.
              </p>
            </div>

            <div className="adm-modal-footer">
              <button className="adm-btn adm-btn-secondary" onClick={() => setDeleteTarget(null)}>
                Cancel
              </button>
              <button className="adm-btn adm-btn-danger" onClick={confirmDelete}>
                <i className="fas fa-trash"></i> Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reply Modal */}
      {replyTarget && (
        <div className="adm-modal-backdrop" onClick={e => { if (e.target === e.currentTarget) closeReply() }}>
          <div className="adm-modal adm-modal-lg">
            <div className="adm-modal-header">
              <div className="adm-modal-title">
                <i className="fas fa-paper-plane" style={{ color: 'var(--orange)', marginRight: 8 }}></i>
                Send Email to Subscriber
              </div>
              <button className="adm-modal-close" onClick={closeReply}><i className="fas fa-times"></i></button>
            </div>

            <form onSubmit={handleSendReply}>
              <div className="adm-modal-body">
                {/* Recipient */}
                <div className="adm-form-group" style={{ marginBottom: 16 }}>
                  <label className="adm-label">To</label>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    background: 'var(--gray-100)', border: '1.5px solid var(--gray-200)',
                    borderRadius: 8, padding: '9px 14px', fontSize: '0.88rem', color: 'var(--navy)',
                  }}>
                    <i className="fas fa-user-circle" style={{ color: 'var(--orange)', fontSize: '1rem' }}></i>
                    <span style={{ fontWeight: 600 }}>{replyTarget.name || 'Subscriber'}</span>
                    <span style={{ color: 'var(--gray-400)' }}>·</span>
                    <span style={{ color: 'var(--orange)' }}>{replyTarget.email}</span>
                  </div>
                </div>

                {/* Subject */}
                <div className="adm-form-group" style={{ marginBottom: 16 }}>
                  <label className="adm-label">Subject <span>*</span></label>
                  <input
                    className="adm-input"
                    placeholder="Email subject…"
                    value={replySubject}
                    onChange={e => setReplySubject(e.target.value)}
                    required
                  />
                </div>

                {/* Message */}
                <div className="adm-form-group" style={{ marginBottom: 16 }}>
                  <label className="adm-label">Message <span>*</span></label>
                  <textarea
                    className="adm-textarea"
                    rows={8}
                    placeholder="Write your message…"
                    value={replyBody}
                    onChange={e => setReplyBody(e.target.value)}
                    required
                    style={{ minHeight: 180 }}
                  />
                </div>

                {/* Status */}
                {replyStatus === 'success' && (
                  <div className="adm-login-alert adm-login-alert-success adm-alert-show" style={{ maxHeight: 60 }}>
                    <i className="fas fa-circle-check"></i> {replyMsg}
                  </div>
                )}
                {replyStatus === 'error' && (
                  <div className="adm-login-alert adm-login-alert-error adm-alert-show" style={{ maxHeight: 60 }}>
                    <i className="fas fa-circle-exclamation"></i> {replyMsg}
                  </div>
                )}
              </div>

              <div className="adm-modal-footer">
                <button type="button" className="adm-btn adm-btn-secondary" onClick={closeReply}>
                  Cancel
                </button>
                <button type="submit" className="adm-btn adm-btn-primary" disabled={replySending}>
                  {replySending
                    ? <><i className="fas fa-spinner fa-spin"></i> Sending…</>
                    : <><i className="fas fa-paper-plane"></i> Send Email</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
