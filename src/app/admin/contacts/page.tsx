'use client'
import { useEffect, useState, useCallback } from 'react'
import { adminApi } from '@/lib/adminApi'

interface Contact {
  id: number
  fname: string
  email: string
  phone: string
  company: string
  projectType: string
  budget: string
  timeline: string
  message: string
  status: string
  nda: boolean
  createdAt: string
}

const STATUS_OPTIONS = ['new', 'read', 'replied', 'archived']

function statusBadgeClass(s: string) {
  const map: Record<string, string> = { new: 'adm-badge-orange', read: 'adm-badge-blue', replied: 'adm-badge-green', archived: 'adm-badge-gray' }
  return map[s] || 'adm-badge-gray'
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [filtered, setFiltered] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selected, setSelected] = useState<Contact | null>(null)
  const [deleting, setDeleting] = useState<number | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<Contact | null>(null)

  const load = useCallback(() => {
    setLoading(true)
    adminApi.getContacts()
      .then(r => r.json())
      .then(d => {
        const list = d?.contacts ?? []
        setContacts(list)
        setFiltered(list)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { load() }, [load])

  useEffect(() => {
    let list = contacts
    if (statusFilter !== 'all') list = list.filter(c => c.status === statusFilter)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(c =>
        [c.fname, c.email, c.company, c.projectType].some(v => v?.toLowerCase().includes(q))
      )
    }
    setFiltered(list)
  }, [search, statusFilter, contacts])

  async function handleStatusChange(contact: Contact, newStatus: string) {
    try {
      await adminApi.updateContactStatus(contact.id, newStatus)
      setContacts(prev => prev.map(c => c.id === contact.id ? { ...c, status: newStatus } : c))
      if (selected?.id === contact.id) setSelected({ ...contact, status: newStatus })
    } catch {}
  }

  async function handleDelete(contact: Contact) {
    setDeleting(contact.id)
    try {
      await adminApi.deleteContact(contact.id)
      setContacts(prev => prev.filter(c => c.id !== contact.id))
      if (selected?.id === contact.id) setSelected(null)
      setConfirmDelete(null)
    } catch {}
    finally { setDeleting(null) }
  }

  return (
    <>
      <div className="adm-page-head">
        <div className="adm-head-left">
          <h1>Contacts</h1>
          <p>{contacts.length} total submission{contacts.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="adm-filter-bar">
        <div className="adm-search-wrap">
          <i className="fas fa-search"></i>
          <input
            className="adm-search-input"
            placeholder="Search by name, email, company…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select className="adm-filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="all">All Status</option>
          {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
        <button className="adm-btn adm-btn-secondary adm-btn-sm" onClick={load}>
          <i className="fas fa-refresh"></i> Refresh
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[1,2,3,4,5].map(i => <div key={i} className="adm-skeleton" style={{ height: 52, borderRadius: 8 }}></div>)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="adm-card">
          <div className="adm-empty">
            <div className="adm-empty-icon"><i className="fas fa-inbox"></i></div>
            <h3>No contacts found</h3>
            <p>{search || statusFilter !== 'all' ? 'Try adjusting your filters.' : 'Contact form submissions will appear here.'}</p>
          </div>
        </div>
      ) : (
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Company</th>
                <th>Project</th>
                <th>Budget</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id}>
                  <td style={{ color: 'var(--gray-400)', fontSize: '0.78rem' }}>{c.id}</td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{c.fname}</div>
                    {c.nda && <span style={{ fontSize: '0.68rem', color: 'var(--orange)' }}>NDA Requested</span>}
                  </td>
                  <td style={{ color: 'var(--gray-600)' }}>{c.email}</td>
                  <td style={{ color: 'var(--gray-600)' }}>{c.company || '—'}</td>
                  <td>{c.projectType || '—'}</td>
                  <td style={{ fontSize: '0.8rem' }}>{c.budget || '—'}</td>
                  <td style={{ color: 'var(--gray-400)', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                    {new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td>
                    <select
                      className="adm-filter-select"
                      style={{ padding: '4px 28px 4px 8px', fontSize: '0.75rem' }}
                      value={c.status}
                      onChange={e => handleStatusChange(c, e.target.value)}
                    >
                      {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                    </select>
                  </td>
                  <td>
                    <div className="adm-table-actions">
                      <button className="adm-btn adm-btn-ghost adm-btn-icon" onClick={() => setSelected(c)} title="View Details">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="adm-btn adm-btn-danger adm-btn-icon" onClick={() => setConfirmDelete(c)} title="Delete">
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* View Modal */}
      {selected && (
        <div className="adm-modal-backdrop" onClick={() => setSelected(null)}>
          <div className="adm-modal adm-modal-lg" onClick={e => e.stopPropagation()}>
            <div className="adm-modal-header">
              <div>
                <div className="adm-modal-title">{selected.fname}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--gray-400)', marginTop: 2 }}>{selected.email}</div>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span className={`adm-badge ${statusBadgeClass(selected.status)}`}>{selected.status}</span>
                <button className="adm-modal-close" onClick={() => setSelected(null)}><i className="fas fa-times"></i></button>
              </div>
            </div>
            <div className="adm-modal-body">
              <div className="adm-detail-grid">
                <div className="adm-detail-item">
                  <div className="adm-detail-label">Email</div>
                  <div className="adm-detail-val"><a href={`mailto:${selected.email}`} style={{ color: 'var(--orange)' }}>{selected.email}</a></div>
                </div>
                <div className="adm-detail-item">
                  <div className="adm-detail-label">Phone</div>
                  <div className="adm-detail-val">{selected.phone || '—'}</div>
                </div>
                <div className="adm-detail-item">
                  <div className="adm-detail-label">Company</div>
                  <div className="adm-detail-val">{selected.company || '—'}</div>
                </div>
                <div className="adm-detail-item">
                  <div className="adm-detail-label">Project Type</div>
                  <div className="adm-detail-val">{selected.projectType || '—'}</div>
                </div>
                <div className="adm-detail-item">
                  <div className="adm-detail-label">Budget</div>
                  <div className="adm-detail-val">{selected.budget || '—'}</div>
                </div>
                <div className="adm-detail-item">
                  <div className="adm-detail-label">Timeline</div>
                  <div className="adm-detail-val">{selected.timeline || '—'}</div>
                </div>
                <div className="adm-detail-item">
                  <div className="adm-detail-label">Submitted</div>
                  <div className="adm-detail-val">{new Date(selected.createdAt).toLocaleString()}</div>
                </div>
                <div className="adm-detail-item">
                  <div className="adm-detail-label">NDA Requested</div>
                  <div className="adm-detail-val">{selected.nda ? 'Yes' : 'No'}</div>
                </div>
                <div className="adm-detail-item full">
                  <div className="adm-detail-label">Message</div>
                  <div className="adm-detail-message">{selected.message}</div>
                </div>
              </div>
            </div>
            <div className="adm-modal-footer">
              <a href={`mailto:${selected.email}?subject=Re: Your Project Inquiry`} className="adm-btn adm-btn-primary">
                <i className="fas fa-envelope"></i> Reply via Email
              </a>
              <button className="adm-btn adm-btn-secondary" onClick={() => setSelected(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {confirmDelete && (
        <div className="adm-modal-backdrop" onClick={() => setConfirmDelete(null)}>
          <div className="adm-modal" style={{ maxWidth: 420 }} onClick={e => e.stopPropagation()}>
            <div className="adm-modal-header">
              <div className="adm-modal-title">Delete Contact</div>
              <button className="adm-modal-close" onClick={() => setConfirmDelete(null)}><i className="fas fa-times"></i></button>
            </div>
            <div className="adm-modal-body">
              <p style={{ color: 'var(--gray-600)', fontSize: '0.9rem' }}>
                Are you sure you want to delete the contact from <strong>{confirmDelete.fname}</strong> ({confirmDelete.email})? This action cannot be undone.
              </p>
            </div>
            <div className="adm-modal-footer">
              <button
                className="adm-btn adm-btn-danger"
                onClick={() => handleDelete(confirmDelete)}
                disabled={deleting === confirmDelete.id}
              >
                {deleting === confirmDelete.id ? <><i className="fas fa-spinner fa-spin"></i> Deleting…</> : <><i className="fas fa-trash"></i> Delete</>}
              </button>
              <button className="adm-btn adm-btn-secondary" onClick={() => setConfirmDelete(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
