'use client'
import { useEffect, useState, useCallback } from 'react'
import { adminApi } from '@/lib/adminApi'

interface EmailLog {
  id: number
  type: string
  toEmail: string
  toName: string | null
  subject: string
  status: 'sent' | 'failed'
  errorMsg: string | null
  sentAt: string
}

const PAGE_SIZE = 30

const TYPE_LABELS: Record<string, { label: string; color: string; bg: string; icon: string }> = {
  contact_admin:      { label: 'Contact — Admin',       color: '#b45309', bg: 'rgba(245,130,31,0.12)',  icon: 'fa-bell' },
  contact_user:       { label: 'Contact — Confirm',     color: '#1d4ed8', bg: 'rgba(37,99,235,0.10)',   icon: 'fa-circle-check' },
  contact_reply:      { label: 'Contact — Reply',       color: '#0A0F1E', bg: 'rgba(10,15,30,0.08)',    icon: 'fa-reply' },
  newsletter_welcome: { label: 'Newsletter — Welcome',  color: '#059669', bg: 'rgba(16,185,129,0.10)',  icon: 'fa-paper-plane' },
  newsletter_admin:   { label: 'Newsletter — Admin',    color: '#b45309', bg: 'rgba(245,130,31,0.12)',  icon: 'fa-bell' },
  newsletter_reply:   { label: 'Newsletter — Reply',    color: '#7c3aed', bg: 'rgba(139,92,246,0.10)', icon: 'fa-envelope' },
  general:            { label: 'General',               color: '#6b7280', bg: 'rgba(107,114,128,0.10)', icon: 'fa-at' },
}

const TYPE_OPTIONS = [
  { value: '',                   label: 'All Types' },
  { value: 'contact_admin',      label: 'Contact — Admin Notification' },
  { value: 'contact_user',       label: 'Contact — User Confirmation' },
  { value: 'contact_reply',      label: 'Contact — Admin Reply' },
  { value: 'newsletter_welcome', label: 'Newsletter — Welcome' },
  { value: 'newsletter_admin',   label: 'Newsletter — Admin Notification' },
  { value: 'newsletter_reply',   label: 'Newsletter — Admin Reply' },
]

function formatDateTime(d: string) {
  const dt = new Date(d)
  return dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    + ' · '
    + dt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}

function TypeBadge({ type }: { type: string }) {
  const t = TYPE_LABELS[type] || TYPE_LABELS.general
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      background: t.bg, color: t.color,
      padding: '3px 10px', borderRadius: 50,
      fontSize: '0.72rem', fontWeight: 700,
      fontFamily: 'var(--font-head)', letterSpacing: '0.03em',
      whiteSpace: 'nowrap',
    }}>
      <i className={`fas ${t.icon}`} style={{ fontSize: '0.65rem' }}></i>
      {t.label}
    </span>
  )
}

export default function EmailLogsPage() {
  const [logs, setLogs]             = useState<EmailLog[]>([])
  const [total, setTotal]           = useState(0)
  const [page, setPage]             = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading]       = useState(true)

  const [searchInput, setSearchInput] = useState('')
  const [search, setSearch]           = useState('')
  const [typeFilter, setTypeFilter]   = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const [detailLog, setDetailLog] = useState<EmailLog | null>(null)

  const fetchData = useCallback(async (
    p = 1, s = search, t = typeFilter, st = statusFilter
  ) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page: String(p), limit: String(PAGE_SIZE) })
      if (s)  params.set('search', s)
      if (t)  params.set('type', t)
      if (st) params.set('status', st)
      const res  = await adminApi.getEmailLogs('?' + params)
      const data = await res.json()
      setLogs(data.logs || [])
      setTotal(data.total || 0)
      setPage(data.page || 1)
      setTotalPages(data.totalPages || 1)
    } catch { /* ignore */ }
    finally { setLoading(false) }
  }, [search, typeFilter, statusFilter])

  useEffect(() => { fetchData(1, '', '', '') }, [])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setSearch(searchInput)
    fetchData(1, searchInput, typeFilter, statusFilter)
  }

  function handleTypeChange(v: string) {
    setTypeFilter(v)
    fetchData(1, search, v, statusFilter)
  }

  function handleStatusChange(v: string) {
    setStatusFilter(v)
    fetchData(1, search, typeFilter, v)
  }

  function handleClear() {
    setSearchInput(''); setSearch('')
    setTypeFilter(''); setStatusFilter('')
    fetchData(1, '', '', '')
  }

  const sentCount   = logs.filter(l => l.status === 'sent').length
  const failedCount = logs.filter(l => l.status === 'failed').length

  return (
    <div>
      {/* Header */}
      <div className="adm-page-head">
        <div className="adm-head-left">
          <h1>Email Logs</h1>
          <p>{total} email{total !== 1 ? 's' : ''} logged</p>
        </div>
        <div className="adm-head-right">
          {/* Summary chips */}
          <span style={{ display:'inline-flex', alignItems:'center', gap:6, background:'rgba(16,185,129,0.1)', color:'#059669', padding:'5px 14px', borderRadius:50, fontSize:'0.78rem', fontWeight:700 }}>
            <i className="fas fa-circle-check"></i> {total > 0 ? (logs.filter(l=>l.status==='sent').length + ' / ' + logs.length) : '0'} Sent
          </span>
          {failedCount > 0 && (
            <span style={{ display:'inline-flex', alignItems:'center', gap:6, background:'rgba(239,68,68,0.1)', color:'#dc2626', padding:'5px 14px', borderRadius:50, fontSize:'0.78rem', fontWeight:700 }}>
              <i className="fas fa-circle-exclamation"></i> {failedCount} Failed
            </span>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="adm-filter-bar" style={{ marginBottom: 16 }}>
        <form onSubmit={handleSearch} style={{ display:'flex', gap:8, alignItems:'center', flex:1, flexWrap:'wrap' }}>
          <div className="adm-search-wrap" style={{ minWidth: 240 }}>
            <i className="fas fa-search"></i>
            <input
              className="adm-search-input"
              placeholder="Search email, name, subject…"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
            />
          </div>
          <button type="submit" className="adm-btn adm-btn-primary adm-btn-sm">
            <i className="fas fa-search"></i> Search
          </button>
        </form>

        <select
          className="adm-filter-select"
          value={typeFilter}
          onChange={e => handleTypeChange(e.target.value)}
        >
          {TYPE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>

        <select
          className="adm-filter-select"
          value={statusFilter}
          onChange={e => handleStatusChange(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="sent">Sent</option>
          <option value="failed">Failed</option>
        </select>

        {(search || typeFilter || statusFilter) && (
          <button className="adm-btn adm-btn-secondary adm-btn-sm" onClick={handleClear}>
            <i className="fas fa-times"></i> Clear
          </button>
        )}
      </div>

      {/* Table */}
      <div className="adm-card" style={{ padding: 0 }}>
        {loading ? (
          <div style={{ display:'flex', justifyContent:'center', padding:'60px 0' }}>
            <div className="adm-loading-spinner"></div>
          </div>
        ) : logs.length === 0 ? (
          <div className="adm-empty-state">
            <div className="adm-empty-icon"><i className="fas fa-envelope-open-text"></i></div>
            <h3>No email logs found</h3>
            <p>Emails will be logged here as they are sent from the system.</p>
          </div>
        ) : (
          <div className="adm-table-wrap" style={{ border:'none', borderRadius:0, boxShadow:'none' }}>
            <table className="adm-table">
              <thead>
                <tr>
                  <th style={{ width: 44 }}>#</th>
                  <th style={{ width: 210 }}>Type</th>
                  <th>Recipient</th>
                  <th>Subject</th>
                  <th style={{ width: 80, textAlign:'center' }}>Status</th>
                  <th style={{ width: 175 }}>Date &amp; Time</th>
                  <th style={{ width: 56, textAlign:'center' }}>Info</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, idx) => (
                  <tr key={log.id}>
                    <td className="adm-td-muted">{(page - 1) * PAGE_SIZE + idx + 1}</td>
                    <td><TypeBadge type={log.type} /></td>
                    <td>
                      <div style={{ fontWeight: 600, fontSize:'0.85rem', color:'var(--navy)', marginBottom: 2 }}>
                        {log.toName || <span className="adm-td-muted">—</span>}
                      </div>
                      <div style={{ fontSize:'0.78rem', color:'var(--orange)' }}>{log.toEmail}</div>
                    </td>
                    <td style={{ fontSize:'0.84rem', color:'var(--navy)', maxWidth: 280 }}>
                      <span style={{ display:'block', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                        {log.subject || <span className="adm-td-muted">—</span>}
                      </span>
                    </td>
                    <td style={{ textAlign:'center' }}>
                      {log.status === 'sent' ? (
                        <span className="adm-badge adm-badge-green">
                          <i className="fas fa-check"></i> Sent
                        </span>
                      ) : (
                        <span className="adm-badge adm-badge-red">
                          <i className="fas fa-times"></i> Failed
                        </span>
                      )}
                    </td>
                    <td className="adm-td-muted" style={{ fontSize:'0.8rem', whiteSpace:'nowrap' }}>
                      {formatDateTime(log.sentAt)}
                    </td>
                    <td style={{ textAlign:'center' }}>
                      <button
                        className="adm-icon-btn"
                        title="View details"
                        onClick={() => setDetailLog(log)}
                      >
                        <i className="fas fa-eye"></i>
                      </button>
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
            onClick={() => { const p = page - 1; setPage(p); fetchData(p, search, typeFilter, statusFilter) }}
          >
            <i className="fas fa-chevron-left"></i> Prev
          </button>
          <span className="adm-page-info">Page {page} of {totalPages}</span>
          <button
            className="adm-btn adm-btn-secondary adm-btn-sm"
            disabled={page >= totalPages}
            onClick={() => { const p = page + 1; setPage(p); fetchData(p, search, typeFilter, statusFilter) }}
          >
            Next <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      )}

      {/* Detail Modal */}
      {detailLog && (
        <div className="adm-modal-backdrop" onClick={e => { if (e.target === e.currentTarget) setDetailLog(null) }}>
          <div className="adm-modal" style={{ maxWidth: 520 }}>
            <div className="adm-modal-header">
              <div className="adm-modal-title">
                <i className="fas fa-envelope-open-text" style={{ color:'var(--orange)', marginRight:8 }}></i>
                Email Log Detail
              </div>
              <button className="adm-modal-close" onClick={() => setDetailLog(null)}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="adm-modal-body">
              <div className="adm-detail-grid" style={{ gap: 12 }}>

                <div className="adm-detail-item">
                  <div className="adm-detail-label">Type</div>
                  <div style={{ marginTop: 4 }}><TypeBadge type={detailLog.type} /></div>
                </div>

                <div className="adm-detail-item">
                  <div className="adm-detail-label">Status</div>
                  <div style={{ marginTop: 4 }}>
                    {detailLog.status === 'sent' ? (
                      <span className="adm-badge adm-badge-green"><i className="fas fa-check"></i> Sent</span>
                    ) : (
                      <span className="adm-badge adm-badge-red"><i className="fas fa-times"></i> Failed</span>
                    )}
                  </div>
                </div>

                <div className="adm-detail-item">
                  <div className="adm-detail-label">Recipient Name</div>
                  <div className="adm-detail-val">{detailLog.toName || '—'}</div>
                </div>

                <div className="adm-detail-item">
                  <div className="adm-detail-label">Recipient Email</div>
                  <div className="adm-detail-val" style={{ color:'var(--orange)' }}>{detailLog.toEmail}</div>
                </div>

                <div className="adm-detail-item full">
                  <div className="adm-detail-label">Subject</div>
                  <div className="adm-detail-val">{detailLog.subject || '—'}</div>
                </div>

                <div className="adm-detail-item full">
                  <div className="adm-detail-label">Sent At</div>
                  <div className="adm-detail-val">{formatDateTime(detailLog.sentAt)}</div>
                </div>

                {detailLog.errorMsg && (
                  <div className="adm-detail-item full">
                    <div className="adm-detail-label" style={{ color:'#dc2626' }}>Error</div>
                    <div style={{
                      background:'rgba(239,68,68,0.06)', border:'1px solid rgba(239,68,68,0.2)',
                      borderRadius:8, padding:'10px 14px', fontSize:'0.83rem',
                      color:'#dc2626', lineHeight:1.6, marginTop:4, wordBreak:'break-all',
                    }}>
                      {detailLog.errorMsg}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="adm-modal-footer">
              <button className="adm-btn adm-btn-secondary" onClick={() => setDetailLog(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
