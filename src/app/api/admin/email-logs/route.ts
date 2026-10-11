import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/authMiddleware'
import db from '@/lib/db'

export async function GET(req: NextRequest) {
  const auth = requireAuth(req)
  if (auth instanceof NextResponse) return auth

  try {
    const { searchParams } = new URL(req.url)
    const page   = Math.max(1, Number(searchParams.get('page') || 1))
    const limit  = Math.min(100, Number(searchParams.get('limit') || 30))
    const offset = (page - 1) * limit
    const type   = searchParams.get('type')
    const status = searchParams.get('status')
    const search = searchParams.get('search')?.trim()

    let where = 'WHERE 1=1'
    const params: any[] = []

    if (type)   { where += ' AND type = ?';   params.push(type) }
    if (status) { where += ' AND status = ?'; params.push(status) }
    if (search) {
      where += ' AND (to_email LIKE ? OR to_name LIKE ? OR subject LIKE ?)'
      params.push(`%${search}%`, `%${search}%`, `%${search}%`)
    }

    const [[{ total }]] = await db.execute(
      `SELECT COUNT(*) as total FROM email_logs ${where}`, params
    ) as any[]

    const [rows] = await db.execute(
      `SELECT * FROM email_logs ${where} ORDER BY id DESC LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    ) as any[]

    const logs = rows.map((r: any) => ({
      id:       r.id,
      type:     r.type,
      toEmail:  r.to_email,
      toName:   r.to_name,
      subject:  r.subject,
      status:   r.status,
      errorMsg: r.error_msg,
      sentAt:   r.sent_at,
    }))

    return NextResponse.json({ logs, total, page, limit, totalPages: Math.ceil(total / limit) })
  } catch (err) {
    console.error('Email logs GET error:', err)
    return NextResponse.json({ message: 'Server error.' }, { status: 500 })
  }
}
