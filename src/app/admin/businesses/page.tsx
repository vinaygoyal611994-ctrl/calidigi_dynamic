'use client'
import { useEffect, useState, useCallback, useRef } from 'react'
import Link from 'next/link'
import { adminApi } from '@/lib/adminApi'

interface Business {
  id: number
  title: string
  company_name: string | null
  email: string | null
  phone: string | null
  city: string | null
  state: string | null
  country: string | null
  zip_code: string | null
  rating: number
  review: number
  claimed: number | null
  web: string | null
  yelp_url: string | null
  address: string | null
  logo: string | null
  noe: number
  skor: number
  updates: number
  web_scan: number
  created_at: string
}

interface ImportRecord {
  id: number
  original_name: string
  inserted: number
  skipped: number
  total: number
  created_at: string
}

const PAGE_SIZE = 20
const US_STATES = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY']

export default function BusinessesPage() {
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [total, setTotal]           = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage]             = useState(1)
  const [loading, setLoading]       = useState(true)
  const [searchInput, setSearchInput] = useState('')
  const [search, setSearch]         = useState('')
  const [cityFilter, setCityFilter] = useState('')
  const [stateFilter, setStateFilter] = useState('')
  const [countryFilter, setCountryFilter] = useState('')
  const [claimedFilter, setClaimedFilter] = useState('')
  const [ratingMin, setRatingMin]   = useState('')
  const [ratingMax, setRatingMax]   = useState('')
  const [confirmDelete, setConfirmDelete] = useState<Business | null>(null)
  const [confirmDeleteImport, setConfirmDeleteImport] = useState<ImportRecord | null>(null)
  const [deleting, setDeleting]     = useState<number | null>(null)
  const [emailTarget, setEmailTarget] = useState<Business | null>(null)
  const [emailSubject, setEmailSubject] = useState('')
  const [emailBody, setEmailBody]   = useState('')
  const [emailSending, setEmailSending] = useState(false)
  const [emailSuccess, setEmailSuccess] = useState('')
  const [emailError, setEmailError] = useState('')
  const [importLoading, setImportLoading] = useState(false)
  const [importResult, setImportResult] = useState<{ inserted: number; skipped: number } | null>(null)
  const [showImport, setShowImport] = useState(false)
  const [showImportHistory, setShowImportHistory] = useState(false)
  const [importHistory, setImportHistory] = useState<ImportRecord[]>([])
  const [historyLoading, setHistoryLoading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const p = new URLSearchParams()
      p.set('page', String(page))
      p.set('limit', String(PAGE_SIZE))
      if (search)       p.set('search', search)
      if (cityFilter)   p.set('city', cityFilter)
      if (stateFilter)  p.set('state', stateFilter)
      if (countryFilter) p.set('country', countryFilter)
      if (claimedFilter !== '') p.set('claimed', claimedFilter)
      if (ratingMin)    p.set('rating_min', ratingMin)
      if (ratingMax)    p.set('rating_max', ratingMax)

      const res = await adminApi.getBusinesses('?' + p.toString())
      const data = await res.json()
      setBusinesses(data.data || [])
      setTotal(data.total || 0)
      setTotalPages(data.totalPages || 1)
    } finally {
      setLoading(false)
    }
  }, [page, search, cityFilter, stateFilter, countryFilter, claimedFilter, ratingMin, ratingMax])

  useEffect(() => { load() }, [load])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setSearch(searchInput)
    setPage(1)
  }

  function resetFilters() {
    setSearchInput(''); setSearch(''); setCityFilter(''); setStateFilter('')
    setCountryFilter(''); setClaimedFilter(''); setRatingMin(''); setRatingMax('')
    setPage(1)
  }

  async function handleDelete() {
    if (!confirmDelete) return
    setDeleting(confirmDelete.id)
    try {
      await adminApi.deleteBusiness(confirmDelete.id)
      setConfirmDelete(null)
      load()
    } finally { setDeleting(null) }
  }

  function openEmailModal(b: Business) {
    setEmailTarget(b)
    setEmailSubject('')
    setEmailBody('')
    setEmailSuccess('')
    setEmailError('')
  }

  async function handleSendEmail() {
    if (!emailTarget) return
    if (!emailSubject.trim()) { setEmailError('Subject is required.'); return }
    if (!emailBody.trim())    { setEmailError('Message is required.'); return }
    setEmailSending(true); setEmailError('')
    try {
      const res = await adminApi.sendBusinessEmail(emailTarget.id, { subject: emailSubject, message: emailBody })
      const data = await res.json()
      if (!res.ok) { setEmailError(data.message || 'Failed to send.'); return }
      setEmailSuccess('Email sent successfully!')
      setEmailSubject(''); setEmailBody('')
    } catch {
      setEmailError('Something went wrong. Please try again.')
    } finally {
      setEmailSending(false)
    }
  }

  async function loadImportHistory() {
    setHistoryLoading(true)
    try {
      const res = await adminApi.getBusinessImports()
      const data = await res.json()
      setImportHistory(Array.isArray(data) ? data : [])
    } finally {
      setHistoryLoading(false)
    }
  }

  function toggleImportHistory() {
    if (!showImportHistory) loadImportHistory()
    setShowImportHistory(v => !v)
  }

  async function handleDownloadImport(rec: ImportRecord) {
    const res = await adminApi.downloadBusinessImport(rec.id)
    const blob = await res.blob()
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href = url; a.download = rec.original_name; a.click()
    URL.revokeObjectURL(url)
  }

  async function handleDeleteImport() {
    if (!confirmDeleteImport) return
    await adminApi.deleteBusinessImport(confirmDeleteImport.id)
    setImportHistory(h => h.filter(r => r.id !== confirmDeleteImport.id))
    setConfirmDeleteImport(null)
  }

  async function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setImportLoading(true)
    setImportResult(null)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await adminApi.importBusinessesCSV(fd)
      const data = await res.json()
      setImportResult(data)
      load()
      if (showImportHistory) loadImportHistory()
    } finally {
      setImportLoading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  async function handleSampleCSV() {
    const res = await adminApi.getBusinesses('/sample-csv')
    const blob = await res.blob()
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href = url; a.download = 'businesses_sample.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  function exportCSV() {
    const headers = ['ID','Title','Company','Email','Phone','City','State','Country','ZIP','Rating','Reviews','Claimed','Website']
    const rows = businesses.map(b => [
      b.id, b.title, b.company_name||'', b.email||'', b.phone||'',
      b.city||'', b.state||'', b.country||'', b.zip_code||'',
      b.rating, b.review, b.claimed ?? '', b.web||''
    ])
    const csv = [headers, ...rows].map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href = url; a.download = `businesses_page${page}.csv`; a.click()
    URL.revokeObjectURL(url)
  }

  const stars = (r: number) => {
    const full = Math.floor(r)
    return '★'.repeat(full) + '☆'.repeat(5 - full)
  }

  return (
    <div className="adm-page">
      <div className="adm-page-header">
        <div>
          <h1>Business Management</h1>
          <p className="adm-page-info">{total.toLocaleString()} total businesses</p>
        </div>
        <div className="adm-page-actions">
          <button className="adm-btn adm-btn-outline" onClick={() => setShowImport(v => !v)}>
            <i className="fas fa-file-import"></i> Import CSV
          </button>
          <button className="adm-btn adm-btn-outline" onClick={toggleImportHistory}>
            <i className="fas fa-history"></i> Import History
          </button>
          <button className="adm-btn adm-btn-outline" onClick={handleSampleCSV}>
            <i className="fas fa-download"></i> Sample CSV
          </button>
          <button className="adm-btn adm-btn-outline" onClick={exportCSV}>
            <i className="fas fa-file-export"></i> Export
          </button>
          <Link href="/admin/businesses/new" className="adm-btn adm-btn-primary">
            <i className="fas fa-plus"></i> Add Business
          </Link>
        </div>
      </div>

      {/* Import Panel */}
      {showImport && (
        <div className="adm-import-panel">
          <div className="adm-import-body">
            <i className="fas fa-file-csv adm-import-icon"></i>
            <div>
              <p><strong>Import businesses from CSV</strong></p>
              <p className="adm-td-muted">CSV must have column headers. Download sample CSV to see the format.</p>
            </div>
            <label className="adm-btn adm-btn-primary" style={{ cursor: 'pointer' }}>
              {importLoading ? <><i className="fas fa-spinner fa-spin"></i> Importing...</> : <><i className="fas fa-upload"></i> Choose CSV File</>}
              <input ref={fileRef} type="file" accept=".csv" style={{ display: 'none' }} onChange={handleImport} disabled={importLoading} />
            </label>
          </div>
          {importResult && (
            <div className="adm-import-result">
              <span className="adm-badge adm-badge-green"><i className="fas fa-check"></i> {importResult.inserted} inserted</span>
              {importResult.skipped > 0 && <span className="adm-badge adm-badge-orange">{importResult.skipped} skipped</span>}
            </div>
          )}
        </div>
      )}

      {/* Import History Panel */}
      {showImportHistory && (
        <div className="adm-import-panel">
          <div className="adm-import-history-head">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <i className="fas fa-history" style={{ color: 'var(--orange)' }}></i>
              <strong>CSV Import History</strong>
            </div>
            <span className="adm-td-muted" style={{ fontSize: 12 }}>Last 50 uploads shown</span>
          </div>

          {historyLoading ? (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--gray-400)' }}>
              <i className="fas fa-spinner fa-spin"></i> Loading...
            </div>
          ) : importHistory.length === 0 ? (
            <div style={{ padding: '28px', textAlign: 'center', color: 'var(--gray-400)', fontSize: '0.88rem' }}>
              <i className="fas fa-inbox" style={{ fontSize: '1.6rem', display: 'block', marginBottom: 8 }}></i>
              No CSV imports found.
            </div>
          ) : (
            <div className="adm-table-wrap" style={{ margin: 0, borderRadius: 0, border: 'none', borderTop: '1px solid var(--gray-200)' }}>
              <table className="adm-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>File Name</th>
                    <th>Inserted</th>
                    <th>Skipped</th>
                    <th>Total Rows</th>
                    <th>Uploaded On</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {importHistory.map((rec, i) => (
                    <tr key={rec.id}>
                      <td className="adm-td-muted">{i + 1}</td>
                      <td>
                        <div style={{ fontWeight: 600, fontSize: 13 }}><i className="fas fa-file-csv" style={{ color: 'var(--orange)', marginRight: 6 }}></i>{rec.original_name}</div>
                      </td>
                      <td><span className="adm-badge adm-badge-green">{rec.inserted}</span></td>
                      <td>{rec.skipped > 0 ? <span className="adm-badge adm-badge-orange">{rec.skipped}</span> : <span className="adm-td-muted">0</span>}</td>
                      <td className="adm-td-muted">{rec.total}</td>
                      <td className="adm-td-muted" style={{ fontSize: 12 }}>
                        {new Date(rec.created_at).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td>
                        <div className="adm-table-actions">
                          <button className="adm-act-btn adm-act-edit" onClick={() => handleDownloadImport(rec)}>
                            <i className="fas fa-download"></i> Download
                          </button>
                          <button className="adm-act-btn adm-act-delete" onClick={() => setConfirmDeleteImport(rec)}>
                            <i className="fas fa-trash"></i> Delete
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
      )}

      {/* Search + Filters */}
      <div className="adm-filter-block">
        <form onSubmit={handleSearch} className="adm-search-row">
          <div className="adm-search-wrap">
            <i className="fas fa-search"></i>
            <input
              className="adm-search-input"
              placeholder="Search title, company, email, phone, city..."
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
            />
          </div>
          <button type="submit" className="adm-btn adm-btn-primary adm-btn-sm">Search</button>
        </form>
        <div className="adm-filter-row">
          <input className="adm-filter-input" placeholder="City" value={cityFilter} onChange={e => { setCityFilter(e.target.value); setPage(1) }} />
          <select className="adm-filter-select" value={stateFilter} onChange={e => { setStateFilter(e.target.value); setPage(1) }}>
            <option value="">All States</option>
            {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <input className="adm-filter-input" placeholder="Country" value={countryFilter} onChange={e => { setCountryFilter(e.target.value); setPage(1) }} />
          <select className="adm-filter-select" value={claimedFilter} onChange={e => { setClaimedFilter(e.target.value); setPage(1) }}>
            <option value="">Claimed: All</option>
            <option value="1">Claimed</option>
            <option value="0">Unclaimed</option>
          </select>
          <input className="adm-filter-input" style={{ width: 80 }} placeholder="Rating ≥" type="number" min="0" max="5" step="0.1" value={ratingMin} onChange={e => { setRatingMin(e.target.value); setPage(1) }} />
          <input className="adm-filter-input" style={{ width: 80 }} placeholder="Rating ≤" type="number" min="0" max="5" step="0.1" value={ratingMax} onChange={e => { setRatingMax(e.target.value); setPage(1) }} />
          <button className="adm-btn adm-btn-ghost adm-btn-sm" onClick={resetFilters}>
            <i className="fas fa-xmark"></i> Reset
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="adm-table-wrap">
        {loading ? (
          <div className="adm-empty-state"><i className="fas fa-spinner fa-spin"></i> Loading...</div>
        ) : businesses.length === 0 ? (
          <div className="adm-empty-state">
            <i className="fas fa-building"></i>
            <p>No businesses found.</p>
            <Link href="/admin/businesses/new" className="adm-btn adm-btn-primary">Add First Business</Link>
          </div>
        ) : (
          <table className="adm-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Business</th>
                <th>Contact</th>
                <th>Location</th>
                <th>Rating</th>
                <th>Claimed</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {businesses.map(b => (
                <tr key={b.id}>
                  <td className="adm-td-muted">{b.id}</td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{b.title}</div>
                    {b.company_name && <div className="adm-td-muted" style={{ fontSize: 12 }}>{b.company_name}</div>}
                    {b.web && <a href={b.web} target="_blank" rel="noreferrer" className="adm-td-muted" style={{ fontSize: 11 }}><i className="fas fa-globe"></i> {b.web.replace(/^https?:\/\//, '')}</a>}
                  </td>
                  <td>
                    {b.email && <div style={{ fontSize: 13 }}><i className="fas fa-envelope adm-td-muted"></i> {b.email}</div>}
                    {b.phone && <div style={{ fontSize: 13 }}><i className="fas fa-phone adm-td-muted"></i> {b.phone}</div>}
                  </td>
                  <td>
                    <div style={{ fontSize: 13 }}>{[b.city, b.state].filter(Boolean).join(', ')}</div>
                    {b.zip_code && <div className="adm-td-muted" style={{ fontSize: 11 }}>{b.zip_code} {b.country}</div>}
                  </td>
                  <td>
                    <div style={{ color: '#f59e0b', fontSize: 13 }}>{stars(b.rating)} <span style={{ color: '#6b7280' }}>{Number(b.rating).toFixed(1)}</span></div>
                    <div className="adm-td-muted" style={{ fontSize: 11 }}>{b.review} reviews</div>
                  </td>
                  <td>
                    {b.claimed === 1
                      ? <span className="adm-badge adm-badge-green">Claimed</span>
                      : b.claimed === 0
                      ? <span className="adm-badge adm-badge-gray">Unclaimed</span>
                      : <span className="adm-badge adm-badge-orange">Unknown</span>}
                  </td>
                  <td>
                    <div className="adm-table-actions">
                      <Link href={`/admin/businesses/${b.id}`} className="adm-act-btn adm-act-edit">
                        <i className="fas fa-pen"></i> Edit
                      </Link>
                      {b.email && (
                        <button className="adm-act-btn adm-act-email" onClick={() => openEmailModal(b)}>
                          <i className="fas fa-envelope"></i> Email
                        </button>
                      )}
                      <button className="adm-act-btn adm-act-delete" onClick={() => setConfirmDelete(b)}>
                        <i className="fas fa-trash"></i> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="adm-pagination">
          <button className="adm-btn adm-btn-outline adm-btn-sm" onClick={() => setPage(1)} disabled={page === 1}>«</button>
          <button className="adm-btn adm-btn-outline adm-btn-sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>‹</button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const start = Math.max(1, Math.min(page - 2, totalPages - 4))
            const p = start + i
            return (
              <button key={p} className={`adm-btn adm-btn-sm ${p === page ? 'adm-btn-primary' : 'adm-btn-outline'}`} onClick={() => setPage(p)}>{p}</button>
            )
          })}
          <button className="adm-btn adm-btn-outline adm-btn-sm" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>›</button>
          <button className="adm-btn adm-btn-outline adm-btn-sm" onClick={() => setPage(totalPages)} disabled={page === totalPages}>»</button>
          <span className="adm-td-muted" style={{ marginLeft: 8 }}>Page {page} of {totalPages}</span>
        </div>
      )}

      {/* Email Compose Modal */}
      {emailTarget && (
        <div className="adm-modal-overlay" onClick={() => setEmailTarget(null)}>
          <div className="adm-modal adm-modal-lg" onClick={e => e.stopPropagation()}>
            <div className="adm-modal-header">
              <span className="adm-modal-title"><i className="fas fa-paper-plane" style={{ color: 'var(--orange)', marginRight: 6 }}></i> Send Marketing Email</span>
              <button className="adm-modal-close" onClick={() => setEmailTarget(null)}><i className="fas fa-xmark"></i></button>
            </div>
            <div className="adm-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {emailSuccess && <div className="adm-alert adm-alert-success"><i className="fas fa-circle-check"></i> {emailSuccess}</div>}
              {emailError   && <div className="adm-alert adm-alert-danger"><i className="fas fa-circle-exclamation"></i> {emailError}</div>}
              <div className="adm-form-grid">
                <div className="adm-field-group">
                  <label className="adm-label">To (Business)</label>
                  <input className="adm-input" value={emailTarget.title} disabled style={{ background: 'var(--gray-100)', color: 'var(--gray-500)' }} />
                </div>
                <div className="adm-field-group">
                  <label className="adm-label">Email Address</label>
                  <input className="adm-input" value={emailTarget.email || ''} disabled style={{ background: 'var(--gray-100)', color: 'var(--gray-500)' }} />
                </div>
              </div>
              <div className="adm-field-group">
                <label className="adm-label">Subject <span style={{ color: 'var(--orange)' }}>*</span></label>
                <input
                  className="adm-input"
                  placeholder="e.g. Grow Your Business with Calidigi's Digital Marketing Services"
                  value={emailSubject}
                  onChange={e => setEmailSubject(e.target.value)}
                  disabled={emailSending}
                />
              </div>
              <div className="adm-field-group">
                <label className="adm-label">Message <span style={{ color: 'var(--orange)' }}>*</span></label>
                <textarea
                  className="adm-input adm-textarea"
                  rows={8}
                  placeholder="Write your marketing message here...&#10;&#10;Use blank lines to separate paragraphs."
                  value={emailBody}
                  onChange={e => setEmailBody(e.target.value)}
                  disabled={emailSending}
                  style={{ minHeight: 180 }}
                />
              </div>
            </div>
            <div className="adm-modal-footer">
              <button className="adm-btn adm-btn-outline" onClick={() => setEmailTarget(null)} disabled={emailSending}>Cancel</button>
              <button className="adm-btn adm-btn-primary" onClick={handleSendEmail} disabled={emailSending || !!emailSuccess}>
                {emailSending
                  ? <><i className="fas fa-spinner fa-spin"></i> Sending...</>
                  : <><i className="fas fa-paper-plane"></i> Send Email</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Business Modal */}
      {confirmDelete && (
        <div className="adm-modal-overlay" onClick={() => setConfirmDelete(null)}>
          <div className="adm-modal" onClick={e => e.stopPropagation()}>
            <div className="adm-modal-header-center">
              <div className="adm-modal-avatar adm-modal-avatar-danger"><i className="fas fa-trash"></i></div>
              <h3>Delete Business?</h3>
              <p>This action cannot be undone.</p>
            </div>
            <div className="adm-modal-body">
              <div className="adm-modal-info-row"><strong>{confirmDelete.title}</strong></div>
              {confirmDelete.city && <div className="adm-td-muted" style={{ marginTop: 4 }}>{confirmDelete.city}, {confirmDelete.state}</div>}
            </div>
            <div className="adm-modal-footer">
              <button className="adm-btn adm-btn-outline" onClick={() => setConfirmDelete(null)}>Cancel</button>
              <button className="adm-btn adm-btn-danger" onClick={handleDelete} disabled={!!deleting}>
                {deleting ? <><i className="fas fa-spinner fa-spin"></i> Deleting...</> : <><i className="fas fa-trash"></i> Delete</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Import Record Modal */}
      {confirmDeleteImport && (
        <div className="adm-modal-overlay" onClick={() => setConfirmDeleteImport(null)}>
          <div className="adm-modal" onClick={e => e.stopPropagation()}>
            <div className="adm-modal-header-center">
              <div className="adm-modal-avatar adm-modal-avatar-danger"><i className="fas fa-file-csv"></i></div>
              <h3>Delete Import Record?</h3>
              <p>The uploaded file and its history will be permanently removed.</p>
            </div>
            <div className="adm-modal-body">
              <div className="adm-modal-info-row">
                <i className="fas fa-file-csv" style={{ color: 'var(--orange)', marginRight: 8 }}></i>
                <strong>{confirmDeleteImport.original_name}</strong>
              </div>
              <div className="adm-td-muted" style={{ marginTop: 6, fontSize: 12 }}>
                {confirmDeleteImport.inserted} inserted · {confirmDeleteImport.skipped} skipped · uploaded {new Date(confirmDeleteImport.created_at).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
            </div>
            <div className="adm-modal-footer">
              <button className="adm-btn adm-btn-outline" onClick={() => setConfirmDeleteImport(null)}>Cancel</button>
              <button className="adm-btn adm-btn-danger" onClick={handleDeleteImport}>
                <i className="fas fa-trash"></i> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
