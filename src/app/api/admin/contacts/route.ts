import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/authMiddleware'
import db from '@/lib/db'

export async function GET(req: NextRequest) {
  const auth = requireAuth(req)
  if (auth instanceof NextResponse) return auth

  try {
    const { searchParams } = new URL(req.url)
    const page   = Math.max(1, Number(searchParams.get('page') || 1))
    const limit  = Number(searchParams.get('limit') || 20)
    const offset = (page - 1) * limit
    const status = searchParams.get('status')
    const search = searchParams.get('search')?.trim()

    let where = 'WHERE 1=1'
    const params: any[] = []

    if (status) { where += ' AND status = ?'; params.push(status) }
    if (search) {
      where += ' AND (fname LIKE ? OR email LIKE ? OR company LIKE ?)'
      params.push(`%${search}%`, `%${search}%`, `%${search}%`)
    }

    const [[{ total }]] = await db.execute(
      `SELECT COUNT(*) as total FROM contacts ${where}`, params
    ) as any[]

    const [rows] = await db.execute(
      `SELECT * FROM contacts ${where} ORDER BY id DESC LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    ) as any[]

    const contacts = rows.map((r: any) => ({
      id: r.id, fname: r.fname, email: r.email, phone: r.phone, company: r.company,
      projectType: r.project_type, budget: r.budget, timeline: r.timeline,
      message: r.message, nda: Boolean(r.nda), status: r.status,
      createdAt: r.created_at,
    }))

    return NextResponse.json({ contacts, total, page, limit, totalPages: Math.ceil(total / limit) })
  } catch (err) {
    console.error('Contacts GET error:', err)
    return NextResponse.json({ message: 'Server error.' }, { status: 500 })
  }
}
