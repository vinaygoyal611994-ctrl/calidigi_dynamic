'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { adminApi } from '@/lib/adminApi'

export interface BusinessForm {
  title: string; company_name: string; email: string; phone: string; web: string
  link: string; logo: string; address: string; address_new: string; city: string
  state: string; zip_code: string; country: string; county: string
  lat: string; lon: string; about: string; rating: string; review: string
  claimed: string; yelp_url: string; hours_of_operation: string; hours_of_ops: string
  founding_date: string; noe: string; skor: string; sent: string; filename: string
  zips_id: string; updates: boolean; web_scan: boolean
}

export const EMPTY_FORM: BusinessForm = {
  title: '', company_name: '', email: '', phone: '', web: '', link: '', logo: '',
  address: '', address_new: '', city: '', state: '', zip_code: '', country: 'US', county: '',
  lat: '', lon: '', about: '', rating: '0', review: '0', claimed: '', yelp_url: '',
  hours_of_operation: '', hours_of_ops: '', founding_date: '', noe: '0',
  skor: '0', sent: '0', filename: '', zips_id: '', updates: false, web_scan: false,
}

const US_STATES = ['','AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY']

interface Props {
  initialData?: BusinessForm
  businessId?: number
  mode: 'new' | 'edit'
}

export default function BusinessFormPage({ initialData, businessId, mode }: Props) {
  const router = useRouter()
  const [form, setForm] = useState<BusinessForm>(initialData || EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  function set(k: keyof BusinessForm, v: string | boolean) {
    setForm(f => ({ ...f, [k]: v }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title.trim()) { setError('Business title is required.'); return }
    setSaving(true); setError('')
    try {
      if (mode === 'new') {
        await adminApi.createBusiness(form)
        setSuccess('Business added successfully!')
      } else {
        await adminApi.updateBusiness(businessId!, form)
        setSuccess('Business updated successfully!')
      }
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setError('Something went wrong. Please try again.')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } finally {
      setSaving(false)
    }
  }

  const fi = (label: string, key: keyof BusinessForm, type = 'text', placeholder = '', required = false) => (
    <div className="adm-field-group">
      <label className="adm-label">{label}{required && <span style={{ color: 'var(--danger,#ef4444)' }}> *</span>}</label>
      <input
        className="adm-input"
        type={type}
        placeholder={placeholder}
        value={form[key] as string}
        onChange={e => set(key, e.target.value)}
        required={required}
      />
    </div>
  )

  return (
    <div className="adm-page">
      <div className="adm-page-header">
        <div>
          <h1>{mode === 'new' ? 'Add New Business' : 'Edit Business'}</h1>
          {businessId && <p className="adm-td-muted">ID: {businessId}</p>}
        </div>
        <button className="adm-btn adm-btn-outline" onClick={() => router.push('/admin/businesses')}>
          <i className="fas fa-arrow-left"></i> Back
        </button>
      </div>

      {error   && <div className="adm-alert adm-alert-danger"><i className="fas fa-circle-exclamation"></i> {error}</div>}
      {success && <div className="adm-alert adm-alert-success"><i className="fas fa-circle-check"></i> {success}</div>}

      <form onSubmit={handleSubmit}>

        {/* Basic Info */}
        <div className="adm-form-section">
          <div className="adm-form-section-title"><i className="fas fa-building"></i> Basic Information</div>
          <div className="adm-form-grid">
            {fi('Business Title', 'title', 'text', 'e.g. Joe\'s Pizza', true)}
            {fi('Company Name', 'company_name', 'text', 'Legal company name')}
            {fi('Email', 'email', 'email', 'contact@business.com')}
            {fi('Phone', 'phone', 'text', '(323) 387-6255')}
            {fi('Website', 'web', 'url', 'https://example.com')}
            {fi('Yelp / Directory Link', 'link', 'url', 'https://yelp.com/biz/...')}
            {fi('Logo URL', 'logo', 'url', 'https://...')}
            {fi('Yelp URL', 'yelp_url', 'url', 'https://yelp.com/biz/...')}
          </div>
        </div>

        {/* Location */}
        <div className="adm-form-section">
          <div className="adm-form-section-title"><i className="fas fa-location-dot"></i> Location</div>
          <div className="adm-form-grid adm-form-grid-1">
            {fi('Address', 'address', 'text', '123 Main St, Suite 100')}
            {fi('Address (Formatted)', 'address_new', 'text', '123 Main Street')}
          </div>
          <div className="adm-form-grid">
            {fi('City', 'city', 'text', 'San Francisco')}
            <div className="adm-field-group">
              <label className="adm-label">State</label>
              <select className="adm-input" value={form.state} onChange={e => set('state', e.target.value)}>
                {US_STATES.map(s => <option key={s} value={s}>{s || '— Select State —'}</option>)}
              </select>
            </div>
            {fi('ZIP Code', 'zip_code', 'text', '94102')}
            {fi('Country', 'country', 'text', 'US')}
            {fi('County', 'county', 'text', 'San Francisco County')}
          </div>
          <div className="adm-form-grid">
            {fi('Latitude', 'lat', 'number', '37.7749')}
            {fi('Longitude', 'lon', 'number', '-122.4194')}
            {fi('ZIP ID', 'zips_id', 'number', '')}
          </div>
        </div>

        {/* Business Details */}
        <div className="adm-form-section">
          <div className="adm-form-section-title"><i className="fas fa-info-circle"></i> Business Details</div>
          <div className="adm-field-group">
            <label className="adm-label">About</label>
            <textarea className="adm-input adm-textarea" rows={4} placeholder="Brief description of the business..." value={form.about} onChange={e => set('about', e.target.value)} />
          </div>
          <div className="adm-form-grid">
            {fi('Rating (0–5)', 'rating', 'number', '4.5')}
            {fi('Review Count', 'review', 'number', '0')}
            <div className="adm-field-group">
              <label className="adm-label">Claimed</label>
              <select className="adm-input" value={form.claimed} onChange={e => set('claimed', e.target.value)}>
                <option value="">Unknown</option>
                <option value="1">Claimed</option>
                <option value="0">Unclaimed</option>
              </select>
            </div>
            {fi('Founding Year', 'founding_date', 'number', '2010')}
            {fi('No. of Employees', 'noe', 'number', '10')}
          </div>
        </div>

        {/* Hours */}
        <div className="adm-form-section">
          <div className="adm-form-section-title"><i className="fas fa-clock"></i> Hours of Operation</div>
          <div className="adm-form-grid">
            {fi('Hours of Operation', 'hours_of_operation', 'text', 'Mon-Fri 9am-6pm')}
            {fi('Hours of Ops', 'hours_of_ops', 'text', 'Mon-Fri 9am-6pm')}
          </div>
        </div>

        {/* System Fields */}
        <div className="adm-form-section">
          <div className="adm-form-section-title"><i className="fas fa-gear"></i> System Fields</div>
          <div className="adm-form-grid">
            {fi('Score', 'skor', 'number', '0')}
            {fi('Sent', 'sent', 'number', '0')}
            {fi('Filename', 'filename', 'text', '')}
          </div>
          <div className="adm-form-grid">
            <div className="adm-field-group">
              <label className="adm-label">Updates</label>
              <div className="adm-toggle-wrap">
                <input type="checkbox" id="updates" checked={form.updates} onChange={e => set('updates', e.target.checked)} />
                <label htmlFor="updates" className="adm-toggle-label">{form.updates ? 'Yes' : 'No'}</label>
              </div>
            </div>
            <div className="adm-field-group">
              <label className="adm-label">Web Scan</label>
              <div className="adm-toggle-wrap">
                <input type="checkbox" id="web_scan" checked={form.web_scan} onChange={e => set('web_scan', e.target.checked)} />
                <label htmlFor="web_scan" className="adm-toggle-label">{form.web_scan ? 'Yes' : 'No'}</label>
              </div>
            </div>
          </div>
        </div>

        {(success || error) && (
          <div style={{ padding: '0 0 4px' }}>
            {error   && <div className="adm-alert adm-alert-danger"><i className="fas fa-circle-exclamation"></i> {error}</div>}
            {success && <div className="adm-alert adm-alert-success"><i className="fas fa-circle-check"></i> {success}</div>}
          </div>
        )}

        <div className="adm-form-footer">
          <button type="button" className="adm-btn adm-btn-outline" onClick={() => router.push('/admin/businesses')}>Cancel</button>
          <button type="submit" className="adm-btn adm-btn-primary" disabled={saving}>
            {saving ? <><i className="fas fa-spinner fa-spin"></i> Saving...</> : <><i className="fas fa-save"></i> {mode === 'new' ? 'Add Business' : 'Save Changes'}</>}
          </button>
        </div>

      </form>
    </div>
  )
}
