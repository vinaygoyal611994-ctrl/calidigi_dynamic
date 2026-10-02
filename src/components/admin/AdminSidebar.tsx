'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { removeToken } from '@/lib/adminApi'

const navItems = [
  { section: 'Main' },
  { href: '/admin/dashboard', icon: 'fa-gauge',     label: 'Dashboard' },
  { section: 'Content' },
  { href: '/admin/contacts', icon: 'fa-inbox',      label: 'Contacts' },
  { href: '/admin/blogs',    icon: 'fa-newspaper',  label: 'Blog Posts' },
  { section: 'System' },
  { href: '/admin/settings', icon: 'fa-gear',       label: 'Settings' },
]

type Props = {
  open: boolean
  onClose: () => void
}

export default function AdminSidebar({ open, onClose }: Props) {
  const pathname = usePathname()

  function handleLogout() {
    removeToken()
    window.location.href = '/admin/login'
  }

  return (
    <>
      <div className={`adm-overlay${open ? ' active' : ''}`} onClick={onClose} />
      <aside className={`adm-sidebar${open ? ' open' : ''}`}>
        <Link href="/admin/dashboard" className="adm-sidebar-logo" onClick={onClose}>
          <Image src="/images/logo.png" alt="Calidigi" width={120} height={40} style={{ height: 36, width: 'auto' }} />
          <span className="adm-logo-badge">Admin</span>
        </Link>

        <nav className="adm-nav">
          {navItems.map((item, i) =>
            'section' in item ? (
              <div key={i} className="adm-nav-section">{item.section}</div>
            ) : (
              <Link
                key={item.href}
                href={item.href!}
                className={`adm-nav-link${pathname === item.href || pathname.startsWith(item.href + '/') ? ' active' : ''}`}
                onClick={onClose}
              >
                <i className={`fas ${item.icon} adm-nav-icon`}></i>
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="adm-sidebar-footer">
          <div className="adm-user-row">
            <div className="adm-user-avatar"><i className="fas fa-user-shield"></i></div>
            <div>
              <div className="adm-user-name">Admin</div>
              <div className="adm-user-role">Calidigi Admin Panel</div>
            </div>
          </div>
          <button className="adm-logout-btn" onClick={handleLogout}>
            <i className="fas fa-right-from-bracket"></i> Logout
          </button>
        </div>
      </aside>
    </>
  )
}
