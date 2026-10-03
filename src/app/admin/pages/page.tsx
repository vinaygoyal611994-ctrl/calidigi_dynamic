'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { adminApi } from '@/lib/adminApi'

type Page = {
  id: number; title: string; slug: string
  status: 'draft' | 'published'; updatedAt: string
}

export default function AdminPagesPage() {
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [deleting, setDeleting] = useState(false)

  async function load() {
    setLoading(true)
    try {
      const res = await adminApi.getPages()
      if (res.ok) {
        const data = await res.json()
        setPages(data.pages || [])
      }
    } finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  async function handleDelete() {
    if (!deleteId) return
    setDeleting(true)
    try {
      await adminApi.deletePage(deleteId)
      setPages(p => p.filter(x => x.id !== deleteId))
      setDeleteId(null)
    } finally { setDeleting(false) }
  }

  const filtered = pages.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.slug.toLowerCase().includes(search.toLowerCase())
  )

  const fmt = (d: string) => new Date(d).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })

  return (
    <div>
      <div className="adm-page-head">
        <div className="adm-head-left">
          <h1>CMS Pages</h1>
          <p>Manage static pages like Privacy Policy, About Us, Terms &amp; more</p>
        </div>
        <div className="adm-head-right">
          <Link href="/admin/pages/new" className="adm-btn adm-btn-primary">
            <i className="fas fa-plus"></i> New Page
          </Link>
        </div>
      </div>

      <div className="adm-filter-bar">
        <div className="adm-search-wrap">
          <i className="fas fa-search"></i>
          <input className="adm-search-input" placeholder="Search pages…"
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <span className="adm-filter-count">{filtered.length} page{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {loading ? (
        <div className="adm-table-wrap">
          {[1,2,3].map(i => (
            <div key={i} style={{ padding: '16px 20px', borderBottom: '1px solid var(--gray-200)', display: 'flex', gap: 12 }}>
              <div className="adm-skeleton" style={{ height: 16, flex: 1 }}></div>
              <div className="adm-skeleton" style={{ height: 16, width: 80 }}></div>
              <div className="adm-skeleton" style={{ height: 16, width: 100 }}></div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="adm-card adm-empty">
          <div className="adm-empty-icon"><i className="fas fa-file-lines"></i></div>
          <h3>{search ? 'No pages found' : 'No pages yet'}</h3>
          <p>{search ? 'Try a different search term.' : 'Create your first CMS page to get started.'}</p>
          {!search && <Link href="/admin/pages/new" className="adm-btn adm-btn-primary" style={{ marginTop: 16 }}><i className="fas fa-plus"></i> New Page</Link>}
        </div>
      ) : (
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>URL Slug</th>
                <th>Status</th>
                <th>Last Updated</th>
                <th>Public URL</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(page => (
                <tr key={page.id}>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--navy)', fontSize: '0.88rem' }}>{page.title}</div>
                  </td>
                  <td>
                    <code style={{ fontSize: '0.78rem', background: 'var(--gray-100)', padding: '2px 7px', borderRadius: 5, color: 'var(--gray-600)' }}>
                      /{page.slug}
                    </code>
                  </td>
                  <td>
                    <span className={`adm-badge ${page.status === 'published' ? 'adm-badge-green' : 'adm-badge-gray'}`}>
                      <i className={`fas ${page.status === 'published' ? 'fa-circle-check' : 'fa-circle'}`}></i>
                      {page.status}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.82rem', color: 'var(--gray-500)' }}>{fmt(page.updatedAt)}</td>
                  <td>
                    {page.status === 'published' ? (
                      <a href={`/pages/${page.slug}`} target="_blank" rel="noopener noreferrer"
                        className="adm-btn adm-btn-ghost adm-btn-sm">
                        <i className="fas fa-arrow-up-right-from-square"></i> View
                      </a>
                    ) : (
                      <span style={{ fontSize: '0.78rem', color: 'var(--gray-400)' }}>Draft</span>
                    )}
                  </td>
                  <td>
                    <div className="adm-table-actions">
                      <Link href={`/admin/pages/${page.id}`} className="adm-btn adm-btn-secondary adm-btn-sm adm-btn-icon" title="Edit">
                        <i className="fas fa-pen"></i>
                      </Link>
                      <button className="adm-btn adm-btn-danger adm-btn-sm adm-btn-icon" title="Delete"
                        onClick={() => setDeleteId(page.id)}>
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

      {/* Delete Modal */}
      {deleteId && (
        <div className="adm-modal-backdrop">
          <div className="adm-modal" style={{ maxWidth: 440 }}>
            <div className="adm-modal-header">
              <span className="adm-modal-title">Delete Page</span>
              <button className="adm-modal-close" onClick={() => setDeleteId(null)}><i className="fas fa-times"></i></button>
            </div>
            <div className="adm-modal-body">
              <p style={{ color: 'var(--gray-600)', lineHeight: 1.6 }}>
                Are you sure you want to delete <strong>"{pages.find(p => p.id === deleteId)?.title}"</strong>?
                This action cannot be undone. Any published links to this page will stop working.
              </p>
            </div>
            <div className="adm-modal-footer">
              <button className="adm-btn adm-btn-secondary" onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="adm-btn adm-btn-danger" onClick={handleDelete} disabled={deleting}>
                {deleting ? <><i className="fas fa-spinner fa-spin"></i> Deleting…</> : <><i className="fas fa-trash"></i> Delete Page</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
