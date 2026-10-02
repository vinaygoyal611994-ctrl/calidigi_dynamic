import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/authMiddleware'
import db from '@/lib/db'

const VALID = ['new', 'read', 'replied', 'archived']

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = requireAuth(req)
  if (auth instanceof NextResponse) return auth

  const { id } = await params
  try {
    const { status } = await req.json()
    if (!VALID.includes(status)) {
      return NextResponse.json({ message: 'Invalid status.' }, { status: 400 })
    }
    const [result] = await db.execute('UPDATE contacts SET status = ? WHERE id = ?', [status, id]) as any[]
    if (result.affectedRows === 0) return NextResponse.json({ message: 'Not found.' }, { status: 404 })
    return NextResponse.json({ success: true, status })
  } catch (err) {
    console.error('Status PATCH error:', err)
    return NextResponse.json({ message: 'Server error.' }, { status: 500 })
  }
}
