import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/authMiddleware'
import db from '@/lib/db'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = requireAuth(req)
  if (auth instanceof NextResponse) return auth

  const { id } = await params
  try {
    const [rows] = await db.execute('SELECT * FROM contacts WHERE id = ?', [id]) as any[]
    if (!rows[0]) return NextResponse.json({ message: 'Not found.' }, { status: 404 })

    const r = rows[0]
    return NextResponse.json({
      id: r.id, fname: r.fname, email: r.email, phone: r.phone, company: r.company,
      projectType: r.project_type, budget: r.budget, timeline: r.timeline,
      message: r.message, nda: Boolean(r.nda), status: r.status, createdAt: r.created_at,
    })
  } catch (err) {
    console.error('Contact GET error:', err)
    return NextResponse.json({ message: 'Server error.' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = requireAuth(req)
  if (auth instanceof NextResponse) return auth

  const { id } = await params
  try {
    const [result] = await db.execute('DELETE FROM contacts WHERE id = ?', [id]) as any[]
    if (result.affectedRows === 0) return NextResponse.json({ message: 'Not found.' }, { status: 404 })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact DELETE error:', err)
    return NextResponse.json({ message: 'Server error.' }, { status: 500 })
  }
}
