import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/authMiddleware'
import db from '@/lib/db'

export async function GET(req: NextRequest) {
  const auth = requireAuth(req)
  if (auth instanceof NextResponse) return auth

  try {
    const today = new Date().toISOString().slice(0, 10)

    const [[totalContactsRow], [newTodayRow], [totalBlogsRow], [publishedRow]] = await Promise.all([
      db.execute('SELECT COUNT(*) as count FROM contacts') as any,
      db.execute('SELECT COUNT(*) as count FROM contacts WHERE DATE(created_at) = ?', [today]) as any,
      db.execute('SELECT COUNT(*) as count FROM blogs') as any,
      db.execute("SELECT COUNT(*) as count FROM blogs WHERE status = 'published'") as any,
    ])

    return NextResponse.json({
      totalContacts:    totalContactsRow[0]?.count ?? 0,
      newContactsToday: newTodayRow[0]?.count ?? 0,
      totalBlogs:       totalBlogsRow[0]?.count ?? 0,
      publishedBlogs:   publishedRow[0]?.count ?? 0,
    })
  } catch (err) {
    console.error('Stats error:', err)
    return NextResponse.json({ message: 'Server error.' }, { status: 500 })
  }
}
