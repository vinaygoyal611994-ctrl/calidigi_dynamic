import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/authMiddleware'
import db from '@/lib/db'

export async function GET(req: NextRequest) {
  const auth = requireAuth(req)
  if (auth instanceof NextResponse) return auth

  try {
    const { searchParams } = new URL(req.url)
    const limit  = Number(searchParams.get('limit') || 100)
    const sort   = searchParams.get('sort') === 'newest' ? 'DESC' : 'DESC'
    const status = searchParams.get('status')

    let sql = 'SELECT * FROM contacts'
    const params: any[] = []
    if (status) { sql += ' WHERE status = ?'; params.push(status) }
    sql += ` ORDER BY created_at ${sort} LIMIT ?`
    params.push(limit)

    const [rows] = await db.execute(sql, params) as any[]

    const contacts = rows.map((r: any) => ({
      id: r.id, fname: r.fname, email: r.email, phone: r.phone, company: r.company,
      projectType: r.project_type, budget: r.budget, timeline: r.timeline,
      message: r.message, nda: Boolean(r.nda), status: r.status,
      createdAt: r.created_at,
    }))

    return NextResponse.json({ contacts, total: contacts.length })
  } catch (err) {
    console.error('Contacts GET error:', err)
    return NextResponse.json({ message: 'Server error.' }, { status: 500 })
  }
}
