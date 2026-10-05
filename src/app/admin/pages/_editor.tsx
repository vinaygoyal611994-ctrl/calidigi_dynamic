'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { adminApi } from '@/lib/adminApi'

type Props = { mode: 'new' | 'edit'; id?: number }

const TEMPLATES: Record<string, { title: string; slug: string; content: string }> = {
  privacy: {
    title: 'Privacy Policy',
    slug: 'privacy-policy',
    content: `<h2>Privacy Policy</h2>
<p>Last updated: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
<p>At Calidigi, we are committed to protecting your personal information and your right to privacy.</p>
<h3>Information We Collect</h3>
<p>We collect information you provide directly to us, such as when you fill out a contact form, subscribe to our newsletter, or communicate with us.</p>
<h3>How We Use Your Information</h3>
<p>We use the information we collect to provide, maintain, and improve our services, respond to your comments and questions, and send you technical notices and support messages.</p>
<h3>Contact Us</h3>
<p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:sales@calidigi.com">sales@calidigi.com</a>.</p>`,
  },
  terms: {
    title: 'Terms of Service',
    slug: 'terms-of-service',
    content: `<h2>Terms of Service</h2>
<p>Last updated: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
<p>By accessing and using Calidigi's services, you accept and agree to be bound by the terms and provisions of this agreement.</p>
<h3>Use of Services</h3>
<p>You may use our services only as permitted by law and these Terms. You may not misuse our services or try to access them using a method other than the interface and instructions we provide.</p>
<h3>Limitation of Liability</h3>
<p>To the fullest extent permitted by law, Calidigi shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.</p>
<h3>Contact Us</h3>
<p>For questions regarding these Terms, contact us at <a href="mailto:sales@calidigi.com">sales@calidigi.com</a>.</p>`,
  },
  about: {
    title: 'About Us',
    slug: 'about-us',
    content: `<h2>About Calidigi</h2>
<p>Calidigi is a California-based digital marketing and technology agency helping businesses grow their digital presence through innovative solutions.</p>
<h3>Our Mission</h3>
<p>We empower businesses with cutting-edge technology — from AI automation and custom software to cloud solutions and digital growth strategies.</p>
<h3>Our Team</h3>
<p>Our team of 15+ engineers, designers, and strategists brings decades of combined experience across industries including SaaS, e-commerce, healthcare, and enterprise technology.</p>
<h3>Get In Touch</h3>
<p>Ready to build something extraordinary? <a href="/contact-us">Contact us today</a>.</p>`,
  },
}

function slugify(str: string) {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-').replace(/^-|-$/g, '')
}

export default function PageEditor({ mode, id }: Props) {
  const router = useRouter()
  const editorRef = useRef<HTMLDivElement>(null)

  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [content, setContent] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [status, setStatus] = useState<'draft' | 'published'>('draft')
  const [preview, setPreview] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(mode === 'edit')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [slugManual, setSlugManual] = useState(false)

  useEffect(() => {
    if (mode === 'edit' && id) {
      adminApi.getPage(id).then(async res => {
        if (res.ok) {
          const d = await res.json()
          setTitle(d.title); setSlug(d.slug); setContent(d.content || '')
          setMetaDescription(d.metaDescription || ''); setStatus(d.status)
          setSlugManual(true)
        }
      }).finally(() => setFetchLoading(false))
    }
  }, [mode, id])

  function applyTemplate(key: string) {
    const t = TEMPLATES[key]
    setTitle(t.title); setSlug(t.slug); setContent(t.content); setSlugManual(true)
  }

  function handleTitleChange(v: string) {
    setTitle(v)
    if (!slugManual) setSlug(slugify(v))
  }

  function execCmd(cmd: string, value?: string) {
    document.execCommand(cmd, false, value)
    if (editorRef.current) setContent(editorRef.current.innerHTML)
  }

  function handleEditorInput() {
    if (editorRef.current) setContent(editorRef.current.innerHTML)
  }

  async function handleSave(publishStatus?: 'draft' | 'published') {
    const finalStatus = publishStatus ?? status
    if (!title.trim()) { setError('Title is required.'); return }
    if (!slug.trim()) { setError('Slug is required.'); return }
    setLoading(true); setError(''); setSuccess('')
    try {
      const payload = { title: title.trim(), slug: slug.trim(), content, metaDescription, status: finalStatus }
      const res = mode === 'new'
        ? await adminApi.createPage(payload)
        : await adminApi.updatePage(id!, payload)
      const data = await res.json()
      if (!res.ok) { setError(data.message || 'Save failed.'); return }
      setSuccess(finalStatus === 'published' ? 'Page published!' : 'Draft saved!')
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
          <p>{mode === 'new' ? 'Create a new static page for your website' : `Editing: ${title}`}</p>
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

      {/* Templates (only for new) */}
      {mode === 'new' && (
        <div className="adm-card" style={{ marginBottom: 20 }}>
          <div className="adm-card-title"><i className="fas fa-wand-magic-sparkles"></i> Start from a Template</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {Object.entries(TEMPLATES).map(([key, t]) => (
              <button key={key} className="adm-cms-template-btn" onClick={() => applyTemplate(key)}>
                <i className={`fas ${key === 'privacy' ? 'fa-shield-halved' : key === 'terms' ? 'fa-file-contract' : 'fa-building'}`}></i>
                {t.title}
              </button>
            ))}
            <button className="adm-cms-template-btn adm-cms-template-blank" onClick={() => { setTitle(''); setSlug(''); setContent(''); setSlugManual(false) }}>
              <i className="fas fa-file-circle-plus"></i> Blank Page
            </button>
          </div>
        </div>
      )}

      <div className="adm-cms-layout">
        {/* Main Editor */}
        <div className="adm-cms-main">
          {/* Title */}
          <div className="adm-card" style={{ marginBottom: 16 }}>
            <div className="adm-form-group">
              <label className="adm-label">Page Title <span>*</span></label>
              <input className="adm-input" placeholder="e.g. Privacy Policy"
                value={title} onChange={e => handleTitleChange(e.target.value)} />
            </div>
            <div className="adm-form-group" style={{ marginTop: 14 }}>
              <label className="adm-label">URL Slug <span>*</span></label>
              <div className="adm-input-addon">
                <span>/pages/</span>
                <input className="adm-input" placeholder="privacy-policy"
                  value={slug}
                  onChange={e => { setSlug(slugify(e.target.value)); setSlugManual(true) }} />
              </div>
              <p className="adm-field-hint">Public URL: <strong>/pages/{slug || 'your-slug'}</strong></p>
            </div>
          </div>

          {/* Content Editor */}
          <div className="adm-card">
            <div className="adm-cms-editor-head">
              <span className="adm-card-title" style={{ margin: 0 }}><i className="fas fa-pen-to-square"></i> Page Content</span>
              <div className="adm-cms-view-toggle">
                <button className={`adm-cvt-btn${!preview ? ' active' : ''}`} onClick={() => setPreview(false)}>
                  <i className="fas fa-code"></i> Edit
                </button>
                <button className={`adm-cvt-btn${preview ? ' active' : ''}`} onClick={() => setPreview(true)}>
                  <i className="fas fa-eye"></i> Preview
                </button>
              </div>
            </div>

            {!preview ? (
              <>
                {/* Toolbar */}
                <div className="adm-cms-toolbar">
                  <div className="adm-cms-tb-group">
                    <button type="button" className="adm-tb-btn" title="Bold" onMouseDown={e => { e.preventDefault(); execCmd('bold') }}><i className="fas fa-bold"></i></button>
                    <button type="button" className="adm-tb-btn" title="Italic" onMouseDown={e => { e.preventDefault(); execCmd('italic') }}><i className="fas fa-italic"></i></button>
                    <button type="button" className="adm-tb-btn" title="Underline" onMouseDown={e => { e.preventDefault(); execCmd('underline') }}><i className="fas fa-underline"></i></button>
                  </div>
                  <div className="adm-cms-tb-sep"></div>
                  <div className="adm-cms-tb-group">
                    <button type="button" className="adm-tb-btn" title="H2" onMouseDown={e => { e.preventDefault(); execCmd('formatBlock', 'h2') }}><b>H2</b></button>
                    <button type="button" className="adm-tb-btn" title="H3" onMouseDown={e => { e.preventDefault(); execCmd('formatBlock', 'h3') }}><b>H3</b></button>
                    <button type="button" className="adm-tb-btn" title="Paragraph" onMouseDown={e => { e.preventDefault(); execCmd('formatBlock', 'p') }}><i className="fas fa-paragraph"></i></button>
                  </div>
                  <div className="adm-cms-tb-sep"></div>
                  <div className="adm-cms-tb-group">
                    <button type="button" className="adm-tb-btn" title="Bullet List" onMouseDown={e => { e.preventDefault(); execCmd('insertUnorderedList') }}><i className="fas fa-list-ul"></i></button>
                    <button type="button" className="adm-tb-btn" title="Numbered List" onMouseDown={e => { e.preventDefault(); execCmd('insertOrderedList') }}><i className="fas fa-list-ol"></i></button>
                    <button type="button" className="adm-tb-btn" title="Blockquote" onMouseDown={e => { e.preventDefault(); execCmd('formatBlock', 'blockquote') }}><i className="fas fa-quote-left"></i></button>
                  </div>
                  <div className="adm-cms-tb-sep"></div>
                  <div className="adm-cms-tb-group">
                    <button type="button" className="adm-tb-btn" title="Insert Link"
                      onMouseDown={e => {
                        e.preventDefault()
                        const url = prompt('Enter URL:')
                        if (url) execCmd('createLink', url)
                      }}>
                      <i className="fas fa-link"></i>
                    </button>
                    <button type="button" className="adm-tb-btn" title="Remove Link" onMouseDown={e => { e.preventDefault(); execCmd('unlink') }}><i className="fas fa-link-slash"></i></button>
                  </div>
                  <div className="adm-cms-tb-sep"></div>
                  <div className="adm-cms-tb-group">
                    <button type="button" className="adm-tb-btn" title="Align Left" onMouseDown={e => { e.preventDefault(); execCmd('justifyLeft') }}><i className="fas fa-align-left"></i></button>
                    <button type="button" className="adm-tb-btn" title="Align Center" onMouseDown={e => { e.preventDefault(); execCmd('justifyCenter') }}><i className="fas fa-align-center"></i></button>
                    <button type="button" className="adm-tb-btn" title="Clear Format" onMouseDown={e => { e.preventDefault(); execCmd('removeFormat') }}><i className="fas fa-eraser"></i></button>
                  </div>
                </div>
                <div
                  ref={editorRef}
                  className="adm-cms-editor"
                  contentEditable
                  suppressContentEditableWarning
                  onInput={handleEditorInput}
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </>
            ) : (
              <div className="adm-cms-preview">
                {content
                  ? <div className="adm-cms-preview-body" dangerouslySetInnerHTML={{ __html: content }} />
                  : <div className="adm-cms-preview-empty"><i className="fas fa-eye-slash"></i><p>Nothing to preview yet. Add some content first.</p></div>
                }
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="adm-cms-sidebar">
          <div className="adm-card" style={{ marginBottom: 16 }}>
            <div className="adm-card-title"><i className="fas fa-sliders"></i> Page Settings</div>
            <div className="adm-form-group">
              <label className="adm-label">Status</label>
              <select className="adm-select" value={status} onChange={e => setStatus(e.target.value as any)}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div className="adm-form-group" style={{ marginTop: 14 }}>
              <label className="adm-label">Meta Description</label>
              <textarea className="adm-textarea" rows={3} placeholder="Short description for SEO (150–160 chars)"
                value={metaDescription} onChange={e => setMetaDescription(e.target.value)}
                style={{ minHeight: 80 }} />
              <p className="adm-field-hint">{metaDescription.length} / 160 chars</p>
            </div>
          </div>

          <div className="adm-card">
            <div className="adm-card-title"><i className="fas fa-circle-info"></i> Page Info</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div className="adm-cms-info-row">
                <span>Public URL</span>
                <span className="adm-cms-info-val">/pages/{slug || '—'}</span>
              </div>
              <div className="adm-cms-info-row">
                <span>Status</span>
                <span className={`adm-badge ${status === 'published' ? 'adm-badge-green' : 'adm-badge-gray'}`}>{status}</span>
              </div>
              {mode === 'edit' && (
                <div className="adm-cms-info-row">
                  <span>ID</span>
                  <span className="adm-cms-info-val">#{id}</span>
                </div>
              )}
            </div>
            <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button className="adm-btn adm-btn-primary" style={{ width: '100%' }}
                onClick={() => handleSave('published')} disabled={loading}>
                <i className="fas fa-globe"></i> Publish Page
              </button>
              <button className="adm-btn adm-btn-secondary" style={{ width: '100%' }}
                onClick={() => handleSave('draft')} disabled={loading}>
                <i className="fas fa-floppy-disk"></i> Save as Draft
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
