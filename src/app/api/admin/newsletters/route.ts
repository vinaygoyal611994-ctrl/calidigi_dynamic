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
    const search = searchParams.get('search')?.trim()

    let where = 'WHERE 1=1'
    const params: any[] = []

    if (search) {
      where += ' AND (name LIKE ? OR email LIKE ?)'
      params.push(`%${search}%`, `%${search}%`)
    }

    const [[{ total }]] = await db.execute(
      `SELECT COUNT(*) as total FROM newsletters ${where}`, params
    ) as any[]

    const [rows] = await db.execute(
      `SELECT * FROM newsletters ${where} ORDER BY id DESC LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    ) as any[]

    const subscribers = rows.map((r: any) => ({
      id: r.id, name: r.name, email: r.email, createdAt: r.created_at,
    }))

    return NextResponse.json({ subscribers, total, page, limit, totalPages: Math.ceil(total / limit) })
  } catch (err) {
    console.error('Newsletters GET error:', err)
    return NextResponse.json({ message: 'Server error.' }, { status: 500 })
  }
}
