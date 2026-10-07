'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { adminApi } from '@/lib/adminApi'

const CKEditorField = dynamic(() => import('../../CKEditorField'), { ssr: false })

const CATEGORIES = ['AI & Automation','Digital Marketing','Web Design','Web Development','SEO','Local SEO','Branding','Business Growth','Technology','Case Studies','Industry Insights']
const BG_OPTIONS = [
  { val: 'bb-ai', label: 'AI (Purple)' },
  { val: 'bb-local', label: 'Local SEO (Blue)' },
  { val: 'bb-web', label: 'Web Design (Teal)' },
  { val: 'bb-mkt', label: 'Marketing (Orange)' },
  { val: 'bb-brand', label: 'Branding (Pink)' },
  { val: 'bb-growth', label: 'Growth (Green)' },
  { val: 'bb-seo', label: 'SEO (Navy)' },
  { val: 'bb-tech', label: 'Technology (Gray)' },
  { val: 'bb-insight', label: 'Insights (Gold)' },
  { val: 'bb-case', label: 'Case Study (Cyan)' },
  { val: 'bb-dev', label: 'Dev (Dark)' },
]

interface Section { id: number; heading: string; body: string }
let _sectionId = 0
const newSection = (): Section => ({ id: ++_sectionId, heading: '', body: '' })

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()
}

export default function NewBlogPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [tags, setTags] = useState('')
  const [readTime, setReadTime] = useState('5 min')
  const [date, setDate] = useState(new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }))

  function isoToDisplay(iso: string) {
    if (!iso) return ''
    const [y, m, d] = iso.split('-').map(Number)
    return new Date(y, m - 1, d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }
  function displayToISO(display: string) {
    if (!display) return ''
    try { const d = new Date(display); return isNaN(d.getTime()) ? '' : d.toISOString().split('T')[0] } catch { return '' }
  }
  const [author, setAuthor] = useState('Calidigi Team')
  const [icon, setIcon] = useState('fa-newspaper')
  const [bg, setBg] = useState('bb-ai')
  const [status, setStatus] = useState('draft')
  const [intro, setIntro] = useState('')
  const [sections, setSections] = useState<Section[]>([newSection()])
  const [conclusion, setConclusion] = useState('')

  function handleTitleChange(val: string) {
    setTitle(val)
    setSlug(slugify(val))
  }

  function addSection() { setSections(prev => [...prev, newSection()]) }
  function removeSection(i: number) { setSections(prev => prev.filter((_, idx) => idx !== i)) }
  function updateSection(i: number, field: keyof Section, val: string) {
    setSections(prev => prev.map((s, idx) => idx === i ? { ...s, [field]: val } : s))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !excerpt.trim() || !intro.trim()) {
      setError('Title, excerpt and intro are required.')
      return
    }
    setSaving(true)
    setError('')
    try {
      const payload = {
        title: title.trim(), slug: slug.trim() || slugify(title),
        excerpt: excerpt.trim(), category, tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        readTime, date, author, icon, bg, status,
        content: { intro: intro.trim(), sections, conclusion: conclusion.trim() },
      }
      const res = await adminApi.createBlog(payload)
      if (!res.ok) { const d = await res.json().catch(() => ({})); setError(d.message || 'Failed to create blog post.'); return }
      router.push('/admin/blogs')
    } catch { setError('Unable to connect to server.') }
    finally { setSaving(false) }
  }

  return (
    <>
      <div className="adm-page-head">
        <div className="adm-head-left">
          <h1>New Blog Post</h1>
          <p>Create and publish a new article</p>
        </div>
        <div className="adm-head-right">
          <Link href="/admin/blogs" className="adm-btn adm-btn-secondary">
            <i className="fas fa-arrow-left"></i> Back
          </Link>
        </div>
      </div>

      {error && (
        <div className="adm-login-error" style={{ marginBottom: 20 }}>
          <i className="fas fa-circle-exclamation"></i> {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20, alignItems: 'start' }}>
          {/* Main Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            <div className="adm-card">
              <div className="adm-card-title"><i className="fas fa-heading"></i> Post Details</div>
              <div className="adm-form-grid">
                <div className="adm-form-group full">
                  <label className="adm-label">Title <span>*</span></label>
                  <input className="adm-input" placeholder="Enter blog post title…" value={title} onChange={e => handleTitleChange(e.target.value)} required />
                </div>
                <div className="adm-form-group full">
                  <label className="adm-label">Slug</label>
                  <div className="adm-input-addon">
                    <span>/blog/</span>
                    <input className="adm-input" value={slug} onChange={e => setSlug(e.target.value)} placeholder="auto-generated-from-title" />
                  </div>
                </div>
                <div className="adm-form-group full">
                  <label className="adm-label">Excerpt / Meta Description <span>*</span></label>
                  <textarea className="adm-textarea" rows={3} placeholder="Brief description of the article (shown in listings and SEO)…" value={excerpt} onChange={e => setExcerpt(e.target.value)} required />
                </div>
              </div>
            </div>

            <div className="adm-card">
              <div className="adm-card-title"><i className="fas fa-align-left"></i> Article Content</div>

              <div className="adm-form-group" style={{ marginBottom: 16 }}>
                <label className="adm-label">Introduction <span>*</span></label>
                <CKEditorField value={intro} onChange={setIntro} />
              </div>

              <div className="adm-settings-section-title" style={{ color: 'var(--navy)', borderTop: '2px solid var(--gray-200)', paddingTop: 14, marginBottom: 12, fontFamily: 'var(--font-head)', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Sections
              </div>

              {sections.map((s, i) => (
                <div key={s.id} className="adm-section-block">
                  <div className="adm-section-num">Section {i + 1}</div>
                  {sections.length > 1 && (
                    <button type="button" className="adm-section-remove" onClick={() => removeSection(i)}>
                      <i className="fas fa-times"></i>
                    </button>
                  )}
                  <div className="adm-form-group" style={{ marginBottom: 10 }}>
                    <label className="adm-label">Heading</label>
                    <input className="adm-input" placeholder="Section heading…" value={s.heading} onChange={e => updateSection(i, 'heading', e.target.value)} />
                  </div>
                  <div className="adm-form-group">
                    <label className="adm-label">Body</label>
                    <CKEditorField value={s.body} onChange={v => updateSection(i, 'body', v)} />
                  </div>
                </div>
              ))}
              <button type="button" className="adm-add-section-btn" onClick={addSection}>
                <i className="fas fa-plus"></i> Add Section
              </button>

              <div className="adm-form-group" style={{ marginTop: 16 }}>
                <label className="adm-label">Conclusion</label>
                <CKEditorField value={conclusion} onChange={setConclusion} />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="adm-card">
              <div className="adm-card-title"><i className="fas fa-sliders"></i> Publish</div>
              <div className="adm-form-group" style={{ marginBottom: 14 }}>
                <label className="adm-label">Status</label>
                <select className="adm-select" value={status} onChange={e => setStatus(e.target.value)}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <button type="submit" className="adm-btn adm-btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={saving}>
                {saving ? <><i className="fas fa-spinner fa-spin"></i> Saving…</> : <><i className="fas fa-check"></i> {status === 'published' ? 'Publish Post' : 'Save Draft'}</>}
              </button>
            </div>

            <div className="adm-card">
              <div className="adm-card-title"><i className="fas fa-tag"></i> Metadata</div>
              <div className="adm-form-group" style={{ marginBottom: 12 }}>
                <label className="adm-label">Category</label>
                <select className="adm-select" value={category} onChange={e => setCategory(e.target.value)}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="adm-form-group" style={{ marginBottom: 12 }}>
                <label className="adm-label">Tags <span style={{ color: 'var(--gray-400)', fontWeight: 400 }}>(comma-separated)</span></label>
                <input className="adm-input" placeholder="SEO, marketing, AI…" value={tags} onChange={e => setTags(e.target.value)} />
              </div>
              <div className="adm-form-group" style={{ marginBottom: 12 }}>
                <label className="adm-label">Read Time</label>
                <input className="adm-input" placeholder="5 min" value={readTime} onChange={e => setReadTime(e.target.value)} />
              </div>
              <div className="adm-form-group" style={{ marginBottom: 12 }}>
                <label className="adm-label">Date</label>
                <input className="adm-input" type="date" value={displayToISO(date)} onChange={e => setDate(isoToDisplay(e.target.value))} />
              </div>
              <div className="adm-form-group" style={{ marginBottom: 12 }}>
                <label className="adm-label">Author</label>
                <input className="adm-input" value={author} onChange={e => setAuthor(e.target.value)} />
              </div>
            </div>

            <div className="adm-card">
              <div className="adm-card-title"><i className="fas fa-palette"></i> Appearance</div>
              <div className="adm-form-group" style={{ marginBottom: 12 }}>
                <label className="adm-label">Card Background</label>
                <select className="adm-select" value={bg} onChange={e => setBg(e.target.value)}>
                  {BG_OPTIONS.map(o => <option key={o.val} value={o.val}>{o.label}</option>)}
                </select>
              </div>
              <div className="adm-form-group">
                <label className="adm-label">Icon <span style={{ color: 'var(--gray-400)', fontWeight: 400 }}>(fa- class)</span></label>
                <input className="adm-input" placeholder="fa-newspaper" value={icon} onChange={e => setIcon(e.target.value)} />
                <span className="adm-field-hint">FontAwesome class e.g. fa-brain, fa-chart-line</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
