'use client'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { getToken, adminApi } from '@/lib/adminApi'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminTopbar from '@/components/admin/AdminTopbar'
import './admin.css'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const isLoginPage = pathname === '/admin/login' || pathname === '/admin'
  const [authed, setAuthed] = useState(false)
  const [checking, setChecking] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (isLoginPage) { setChecking(false); return }

    const token = getToken()
    if (!token) { router.replace('/admin/login'); return }

    adminApi.me()
      .then(res => {
        if (!res.ok) { router.replace('/admin/login'); return }
        setAuthed(true)
      })
      .catch(() => router.replace('/admin/login'))
      .finally(() => setChecking(false))
  }, [pathname, isLoginPage, router])

  if (isLoginPage) return <>{children}</>

  if (checking) {
    return (
      <div className="adm-loading-screen">
        <div className="adm-loading-spinner"></div>
        <span className="adm-loading-text">Loading admin panel…</span>
      </div>
    )
  }

  if (!authed) return null

  return (
    <div className="adm-shell">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="adm-main">
        <AdminTopbar onMenuToggle={() => setSidebarOpen(v => !v)} />
        <main className="adm-content">{children}</main>
      </div>
    </div>
  )
}
