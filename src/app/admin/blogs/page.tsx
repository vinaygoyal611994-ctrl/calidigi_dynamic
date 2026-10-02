'use client'
import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { adminApi } from '@/lib/adminApi'

interface Blog {
  id: number
  title: string
  slug: string
  category: string
  author: string
  date: string
  status: string
  readTime: string
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [filtered, setFiltered] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [confirmDelete, setConfirmDelete] = useState<Blog | null>(null)
  const [deleting, setDeleting] = useState<number | null>(null)

  const load = useCallback(() => {
    setLoading(true)
    adminApi.getBlogs()
      .then(r => r.json())
      .then(d => {
        const list = d?.blogs ?? []
        setBlogs(list)
        setFiltered(list)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { load() }, [load])

  useEffect(() => {
    let list = blogs
    if (statusFilter !== 'all') list = list.filter(b => b.status === statusFilter)
    if (catFilter !== 'all') list = list.filter(b => b.category === catFilter)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(b => b.title.toLowerCase().includes(q) || b.category.toLowerCase().includes(q))
    }
    setFiltered(list)
  }, [search, catFilter, statusFilter, blogs])

  async function handleDelete(blog: Blog) {
    setDeleting(blog.id)
    try {
      await adminApi.deleteBlog(blog.id)
      setBlogs(prev => prev.filter(b => b.id !== blog.id))
      setConfirmDelete(null)
    } catch {}
    finally { setDeleting(null) }
  }

  const categories = Array.from(new Set(blogs.map(b => b.category))).sort()

  return (
    <>
      <div className="adm-page-head">
        <div className="adm-head-left">
          <h1>Blog Posts</h1>
          <p>{blogs.length} total post{blogs.length !== 1 ? 's' : ''}</p>
        </div>
        <div className="adm-head-right">
          <Link href="/admin/blogs/new" className="adm-btn adm-btn-primary">
            <i className="fas fa-plus"></i> New Post
          </Link>
        </div>
      </div>

      <div className="adm-filter-bar">
        <div className="adm-search-wrap">
          <i className="fas fa-search"></i>
          <input
            className="adm-search-input"
            placeholder="Search blog posts…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select className="adm-filter-select" value={catFilter} onChange={e => setCatFilter(e.target.value)}>
          <option value="all">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select className="adm-filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
        <button className="adm-btn adm-btn-secondary adm-btn-sm" onClick={load}>
          <i className="fas fa-refresh"></i> Refresh
        </button>
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[1,2,3,4].map(i => <div key={i} className="adm-skeleton" style={{ height: 52, borderRadius: 8 }}></div>)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="adm-card">
          <div className="adm-empty">
            <div className="adm-empty-icon"><i className="fas fa-newspaper"></i></div>
            <h3>No blog posts found</h3>
            <p>{search || catFilter !== 'all' || statusFilter !== 'all' ? 'Try adjusting your filters.' : 'Create your first blog post.'}</p>
            <Link href="/admin/blogs/new" className="adm-btn adm-btn-primary" style={{ marginTop: 12 }}>
              <i className="fas fa-plus"></i> Create Post
            </Link>
          </div>
        </div>
      ) : (
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Category</th>
                <th>Author</th>
                <th>Read Time</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(b => (
                <tr key={b.id}>
                  <td style={{ color: 'var(--gray-400)', fontSize: '0.78rem' }}>{b.id}</td>
                  <td>
                    <div style={{ fontWeight: 600, maxWidth: 280 }}>{b.title}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--gray-400)', marginTop: 2 }}>/{b.slug}</div>
                  </td>
                  <td>
                    <span className="adm-badge adm-badge-navy">{b.category}</span>
                  </td>
                  <td style={{ color: 'var(--gray-600)' }}>{b.author}</td>
                  <td style={{ color: 'var(--gray-500)', fontSize: '0.82rem' }}>{b.readTime}</td>
                  <td style={{ color: 'var(--gray-400)', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>{b.date}</td>
                  <td>
                    <span className={`adm-badge ${b.status === 'published' ? 'adm-badge-green' : 'adm-badge-gray'}`}>
                      {b.status}
                    </span>
                  </td>
                  <td>
                    <div className="adm-table-actions">
                      <Link href={`/blog/${b.slug}`} target="_blank" className="adm-btn adm-btn-ghost adm-btn-icon" title="View on site">
                        <i className="fas fa-external-link"></i>
                      </Link>
                      <Link href={`/admin/blogs/${b.id}`} className="adm-btn adm-btn-ghost adm-btn-icon" title="Edit">
                        <i className="fas fa-pen"></i>
                      </Link>
                      <button className="adm-btn adm-btn-danger adm-btn-icon" onClick={() => setConfirmDelete(b)} title="Delete">
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

      {confirmDelete && (
        <div className="adm-modal-backdrop" onClick={() => setConfirmDelete(null)}>
          <div className="adm-modal" style={{ maxWidth: 420 }} onClick={e => e.stopPropagation()}>
            <div className="adm-modal-header">
              <div className="adm-modal-title">Delete Blog Post</div>
              <button className="adm-modal-close" onClick={() => setConfirmDelete(null)}><i className="fas fa-times"></i></button>
            </div>
            <div className="adm-modal-body">
              <p style={{ color: 'var(--gray-600)', fontSize: '0.9rem' }}>
                Are you sure you want to delete <strong>&ldquo;{confirmDelete.title}&rdquo;</strong>? This cannot be undone.
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
