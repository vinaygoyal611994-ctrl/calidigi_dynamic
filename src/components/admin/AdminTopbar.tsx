'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const breadcrumbs: Record<string, string> = {
  '/admin/dashboard': 'Dashboard',
  '/admin/contacts':  'Contacts',
  '/admin/blogs':     'Blog Posts',
  '/admin/blogs/new': 'New Blog Post',
  '/admin/settings':  'Settings',
}

type Props = { onMenuToggle: () => void }

export default function AdminTopbar({ onMenuToggle }: Props) {
  const pathname = usePathname()
  const isEdit = pathname.match(/^\/admin\/blogs\/\d+$/)
  const label = isEdit ? 'Edit Blog Post' : (breadcrumbs[pathname] ?? 'Admin')

  const now = new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })

  return (
    <header className="adm-topbar">
      <button className="adm-hamburger" onClick={onMenuToggle} aria-label="Toggle sidebar">
        <i className="fas fa-bars"></i>
      </button>

      <div style={{ flex: 1 }}>
        <div className="adm-topbar-breadcrumb">
          <Link href="/admin/dashboard" style={{ color: 'var(--gray-400)', textDecoration: 'none' }}>Admin</Link>
          {label !== 'Dashboard' && <> &rsaquo; <span>{label}</span></>}
        </div>
        <div className="adm-topbar-title">{label}</div>
      </div>

      <div className="adm-topbar-actions">
        <span className="adm-topbar-date">{now}</span>
        <Link href="/" target="_blank" className="adm-btn adm-btn-ghost adm-btn-sm" style={{ fontSize: '0.78rem' }}>
          <i className="fas fa-external-link"></i> View Site
        </Link>
      </div>
    </header>
  )
}
