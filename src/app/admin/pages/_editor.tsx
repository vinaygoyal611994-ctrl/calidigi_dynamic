'use client'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { adminApi } from '@/lib/adminApi'

const CKEditorField = dynamic(() => import('../CKEditorField'), { ssr: false })

type Props = { mode: 'new' | 'edit'; id?: number }

function slugify(str: string) {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-').replace(/^-|-$/g, '')
}

export default function PageEditor({ mode, id }: Props) {
  const router = useRouter()

  const [pageName,        setPageName]        = useState('')
  const [title,           setTitle]           = useState('')
  const [slug,            setSlug]            = useState('')
  const [content,         setContent]         = useState('')
  const [metaTitle,       setMetaTitle]       = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [metaKeyword,     setMetaKeyword]     = useState('')
  const [status,          setStatus]          = useState<'draft' | 'published'>('draft')

  const [loading,      setLoading]      = useState(false)
  const [fetchLoading, setFetchLoading] = useState(mode === 'edit')
  const [error,        setError]        = useState('')
  const [success,      setSuccess]      = useState('')

  useEffect(() => {
    if (mode === 'edit' && id) {
      adminApi.getPage(id).then(async res => {
        if (res.ok) {
          const d = await res.json()
          setPageName(d.pageName || '')
          setTitle(d.title || '')
          setSlug(d.slug || '')
          setContent(d.content || '')
          setMetaTitle(d.metaTitle || '')
          setMetaDescription(d.metaDescription || '')
          setMetaKeyword(d.metaKeyword || '')
          setStatus(d.status || 'draft')
        }
      }).finally(() => setFetchLoading(false))
    }
  }, [mode, id])

  function handlePageNameChange(v: string) {
    setPageName(v)
    if (!title) setTitle(v)
    setSlug(slugify(v))
  }

  async function handleSave(publishStatus?: 'draft' | 'published') {
    const finalStatus = publishStatus ?? status
    if (!pageName.trim()) { setError('Page Name is required.'); window.scrollTo({ top: 0, behavior: 'smooth' }); return }
    if (!title.trim())    { setError('Page Title is required.'); window.scrollTo({ top: 0, behavior: 'smooth' }); return }
    setLoading(true); setError(''); setSuccess('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
    try {
      const payload = {
        pageName: pageName.trim(),
        title: title.trim(),
        slug: slug.trim() || slugify(pageName.trim()),
        content,
        metaTitle: metaTitle.trim(),
        metaDescription: metaDescription.trim(),
        metaKeyword: metaKeyword.trim(),
        status: finalStatus,
      }
      const res = mode === 'new'
        ? await adminApi.createPage(payload)
        : await adminApi.updatePage(id!, payload)
      const data = await res.json()
      if (!res.ok) { setError(data.message || 'Save failed.'); return }
      setSuccess(finalStatus === 'published' ? 'Page published successfully!' : 'Draft saved!')
      setStatus(finalStatus)
      if (mode === 'new') router.replace(`/admin/pages/${data.id}`)
    } catch { setError('Server error. Please try again.') }
    finally { setLoading(false) }
  }

  if (fetchLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
        <div className="adm-loading-spinner" style={{ width: 32, height: 32 }}></div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="adm-page-head">
        <div className="adm-head-left">
          <h1>{mode === 'new' ? 'New CMS Page' : 'Edit Page'}</h1>
          <p>{mode === 'new' ? 'Create a new static page' : `Editing: ${pageName || title}`}</p>
        </div>
        <div className="adm-head-right">
          <Link href="/admin/pages" className="adm-btn adm-btn-secondary">
            <i className="fas fa-arrow-left"></i> All Pages
          </Link>
          {status === 'published' && (
            <a href={`/pages/${slug}`} target="_blank" rel="noopener noreferrer" className="adm-btn adm-btn-ghost">
              <i className="fas fa-arrow-up-right-from-square"></i> View Live
            </a>
          )}
          <button className="adm-btn adm-btn-secondary" onClick={() => handleSave('draft')} disabled={loading}>
            <i className="fas fa-floppy-disk"></i> Save Draft
          </button>
          <button className="adm-btn adm-btn-primary" onClick={() => handleSave('published')} disabled={loading}>
            {loading ? <><i className="fas fa-spinner fa-spin"></i> Saving…</> : <><i className="fas fa-globe"></i> Publish</>}
          </button>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="adm-login-alert adm-login-alert-error adm-alert-show" style={{ marginBottom: 16, maxHeight: 80 }}>
          <i className="fas fa-circle-exclamation"></i> {error}
        </div>
      )}
      {success && (
        <div className="adm-login-alert adm-login-alert-success adm-alert-show" style={{ marginBottom: 16, maxHeight: 80 }}>
          <i className="fas fa-circle-check"></i> {success}
        </div>
      )}

      {/* Form Card */}
      <div className="adm-card" style={{ padding: 0 }}>

        {/* Page Name */}
        <div className="cms-field-row">
          <label className="cms-field-label">Page Name <span style={{ color: 'var(--orange)' }}>*</span></label>
          <input className="cms-field-input" placeholder="e.g. Privacy Policy"
            value={pageName} onChange={e => handlePageNameChange(e.target.value)} />
        </div>

        <div className="cms-field-divider" />

        {/* Page Title */}
        <div className="cms-field-row">
          <label className="cms-field-label">Page Title <span style={{ color: 'var(--orange)' }}>*</span></label>
          <input className="cms-field-input" placeholder="e.g. Privacy Policy — Calidigi"
            value={title} onChange={e => setTitle(e.target.value)} />
        </div>

        <div className="cms-field-divider" />

        {/* Description / Content */}
        <div className="cms-field-row">
          <label className="cms-field-label">Description <span style={{ color: 'var(--orange)' }}>*</span></label>
          <div style={{ marginTop: 8 }}>
            <CKEditorField value={content} onChange={setContent} />
          </div>
        </div>

        <div className="cms-field-divider" />

        {/* Meta Title */}
        <div className="cms-field-row">
          <label className="cms-field-label">Meta Title</label>
          <input className="cms-field-input" placeholder="SEO title (50–60 chars recommended)"
            value={metaTitle} onChange={e => setMetaTitle(e.target.value)} />
          <p className="cms-field-hint">{metaTitle.length} / 60 chars</p>
        </div>

        <div className="cms-field-divider" />

        {/* Meta Description */}
        <div className="cms-field-row">
          <label className="cms-field-label">Meta Description</label>
          <textarea className="cms-field-textarea" placeholder="Short description for search engines (150–160 chars)"
            rows={3} value={metaDescription} onChange={e => setMetaDescription(e.target.value)} />
          <p className="cms-field-hint">{metaDescription.length} / 160 chars</p>
        </div>

        <div className="cms-field-divider" />

        {/* Meta Keyword */}
        <div className="cms-field-row">
          <label className="cms-field-label">Meta Keyword</label>
          <input className="cms-field-input" placeholder="e.g. digital marketing, AI solutions, web design"
            value={metaKeyword} onChange={e => setMetaKeyword(e.target.value)} />
          <p className="cms-field-hint">Comma separated keywords</p>
        </div>

        <div className="cms-field-divider" />

        {/* Status + Save */}
        <div className="cms-field-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <label className="cms-field-label" style={{ margin: 0 }}>Status</label>
            <select className="adm-filter-select" value={status} onChange={e => setStatus(e.target.value as any)}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="adm-btn adm-btn-secondary" onClick={() => handleSave('draft')} disabled={loading}>
              <i className="fas fa-floppy-disk"></i> Save Draft
            </button>
            <button className="adm-btn adm-btn-primary" onClick={() => handleSave('published')} disabled={loading}>
              {loading ? <><i className="fas fa-spinner fa-spin"></i> Saving…</> : <><i className="fas fa-globe"></i> Publish</>}
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
