'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { adminApi } from '@/lib/adminApi'
import BusinessFormPage, { BusinessForm, EMPTY_FORM } from '../_form'

export default function EditBusinessPage() {
  const { id } = useParams<{ id: string }>()
  const [data, setData] = useState<BusinessForm | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    adminApi.getBusiness(Number(id)).then(async res => {
      if (!res.ok) { setError('Business not found.'); setLoading(false); return }
      const b = await res.json()
      setData({
        title: b.title || '', company_name: b.company_name || '', email: b.email || '',
        phone: b.phone || '', web: b.web || '', link: b.link || '', logo: b.logo || '',
        address: b.address || '', address_new: b.address_new || '', city: b.city || '',
        state: b.state || '', zip_code: b.zip_code || '', country: b.country || 'US',
        county: b.county || '', lat: b.lat ?? '', lon: b.lon ?? '', about: b.about || '',
        rating: String(b.rating ?? 0), review: String(b.review ?? 0),
        claimed: b.claimed != null ? String(b.claimed) : '',
        yelp_url: b.yelp_url || '', hours_of_operation: b.hours_of_operation || '',
        hours_of_ops: b.hours_of_ops || '', founding_date: b.founding_date ?? '',
        noe: String(b.noe ?? 0), skor: String(b.skor ?? 0), sent: String(b.sent ?? 0),
        filename: b.filename || '', zips_id: b.zips_id ?? '',
        updates: !!b.updates, web_scan: !!b.web_scan,
      })
      setLoading(false)
    }).catch(() => { setError('Failed to load.'); setLoading(false) })
  }, [id])

  if (loading) return <div className="adm-page"><div className="adm-empty-state"><i className="fas fa-spinner fa-spin"></i> Loading...</div></div>
  if (error)   return <div className="adm-page"><div className="adm-alert adm-alert-danger">{error}</div></div>
  if (!data)   return null

  return <BusinessFormPage mode="edit" initialData={data} businessId={Number(id)} />
}
