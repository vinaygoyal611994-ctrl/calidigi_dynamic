'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { adminApi } from '@/lib/adminApi'

interface Stats {
  totalContacts: number
  newContactsToday: number
  totalBlogs: number
  publishedBlogs: number
}

interface RecentContact {
  id: number
  fname: string
  email: string
  company: string
  projectType: string
  createdAt: string
  status: string
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [recentContacts, setRecentContacts] = useState<RecentContact[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      adminApi.getStats().then(r => r.json()).catch(() => null),
      adminApi.getContacts('?limit=5&sort=newest').then(r => r.json()).catch(() => ({ contacts: [] })),
    ]).then(([statsData, contactsData]) => {
      if (statsData) setStats(statsData)
      setRecentContacts(contactsData?.contacts ?? [])
    }).finally(() => setLoading(false))
  }, [])

  const statCards = [
    { icon: 'fa-inbox', color: 'orange', label: 'Total Contacts', val: stats?.totalContacts ?? '—', delta: `+${stats?.newContactsToday ?? 0} today`, dir: 'up' },
    { icon: 'fa-newspaper', color: 'blue', label: 'Total Blogs', val: stats?.totalBlogs ?? '—', delta: `${stats?.publishedBlogs ?? 0} published`, dir: 'neutral' },
    { icon: 'fa-check-circle', color: 'green', label: 'Published Posts', val: stats?.publishedBlogs ?? '—', delta: 'live on site', dir: 'neutral' },
    { icon: 'fa-star', color: 'purple', label: 'New Today', val: stats?.newContactsToday ?? '—', delta: 'contact submissions', dir: stats?.newContactsToday ? 'up' : 'neutral' },
  ]

  function statusBadge(status: string) {
    const map: Record<string, string> = {
      new: 'adm-badge-orange',
      read: 'adm-badge-blue',
      replied: 'adm-badge-green',
      archived: 'adm-badge-gray',
    }
    return map[status] || 'adm-badge-gray'
  }

  return (
    <>
      <div className="adm-page-head">
        <div className="adm-head-left">
          <h1>Dashboard</h1>
          <p>Welcome back — here&rsquo;s what&rsquo;s happening with Calidigi.</p>
        </div>
        <div className="adm-head-right">
          <Link href="/admin/blogs/new" className="adm-btn adm-btn-primary">
            <i className="fas fa-plus"></i> New Blog Post
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="adm-stats-grid">
        {statCards.map(s => (
          <div key={s.label} className="adm-stat-card">
            <div className={`adm-stat-icon ${s.color}`}><i className={`fas ${s.icon}`}></i></div>
            <div className="adm-stat-body">
              <div className="adm-stat-val">{loading ? '—' : s.val}</div>
              <div className="adm-stat-label">{s.label}</div>
              <div className={`adm-stat-delta ${s.dir}`}>
                {s.dir === 'up' && <i className="fas fa-arrow-trend-up"></i>}
                {s.delta}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="adm-dash-grid">
        {/* Recent Contacts */}
        <div className="adm-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div className="adm-card-title" style={{ marginBottom: 0 }}>
              <i className="fas fa-inbox"></i> Recent Contacts
            </div>
            <Link href="/admin/contacts" className="adm-btn adm-btn-ghost adm-btn-sm">
              View All <i className="fas fa-arrow-right"></i>
            </Link>
          </div>

          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[1,2,3].map(i => <div key={i} className="adm-skeleton" style={{ height: 48 }}></div>)}
            </div>
          ) : recentContacts.length === 0 ? (
            <div className="adm-empty">
              <div className="adm-empty-icon"><i className="fas fa-inbox"></i></div>
              <h3>No contacts yet</h3>
              <p>Contact form submissions will appear here.</p>
            </div>
          ) : (
            <div className="adm-table-wrap">
              <table className="adm-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Project</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentContacts.map(c => (
                    <tr key={c.id}>
                      <td style={{ fontWeight: 600 }}>{c.fname}</td>
                      <td style={{ color: 'var(--gray-500)' }}>{c.email}</td>
                      <td>{c.projectType || '—'}</td>
                      <td style={{ color: 'var(--gray-400)', fontSize: '0.8rem' }}>
                        {new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </td>
                      <td><span className={`adm-badge ${statusBadge(c.status)}`}>{c.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div>
          <div className="adm-card" style={{ marginBottom: 16 }}>
            <div className="adm-card-title"><i className="fas fa-bolt"></i> Quick Actions</div>
            <div className="adm-quick-actions">
              {[
                { href: '/admin/blogs/new', icon: 'fa-plus',     label: 'New Blog Post' },
                { href: '/admin/contacts',  icon: 'fa-inbox',    label: 'View Contacts' },
                { href: '/admin/blogs',     icon: 'fa-newspaper',label: 'Manage Blogs' },
                { href: '/admin/settings',  icon: 'fa-gear',     label: 'Settings' },
              ].map(a => (
                <Link key={a.href} href={a.href} className="adm-quick-btn">
                  <i className={`fas ${a.icon}`}></i>
                  <span>{a.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="adm-card">
            <div className="adm-card-title"><i className="fas fa-link"></i> Site Links</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                { href: '/',         label: 'Home Page' },
                { href: '/blog',     label: 'Blog' },
                { href: '/services', label: 'Services' },
                { href: '/contact-us',label: 'Contact Us' },
              ].map(l => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.84rem', color: 'var(--gray-600)', padding: '6px 0', borderBottom: '1px solid var(--gray-200)', textDecoration: 'none' }}>
                  <i className="fas fa-external-link" style={{ color: 'var(--orange)', fontSize: '0.7rem' }}></i>
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
