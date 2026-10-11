import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/authMiddleware'
import db from '@/lib/db'

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = requireAuth(req)
  if (auth instanceof NextResponse) return auth

  try {
    const { id: rawId } = await params
    const id = Number(rawId)
    await db.execute('DELETE FROM newsletters WHERE id = ?', [id])
    return NextResponse.json({ message: 'Deleted.' })
  } catch (err) {
    console.error('Newsletter DELETE error:', err)
    return NextResponse.json({ message: 'Server error.' }, { status: 500 })
  }
}
