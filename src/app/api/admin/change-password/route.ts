import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { requireAuth } from '@/lib/authMiddleware'
import db from '@/lib/db'

export async function POST(req: NextRequest) {
  const auth = requireAuth(req)
  if (auth instanceof NextResponse) return auth

  try {
    const { currentPassword, newPassword } = await req.json()
    if (!currentPassword || !newPassword) {
      return NextResponse.json({ message: 'Both passwords are required.' }, { status: 400 })
    }
    if (newPassword.length < 8) {
      return NextResponse.json({ message: 'New password must be at least 8 characters.' }, { status: 400 })
    }

    const [rows] = await db.execute('SELECT * FROM admin_users WHERE id = ?', [auth.user.id]) as any[]
    const user = rows[0]
    if (!user) return NextResponse.json({ message: 'User not found.' }, { status: 404 })

    const valid = await bcrypt.compare(currentPassword, user.password)
    if (!valid) return NextResponse.json({ message: 'Current password is incorrect.' }, { status: 400 })

    const hash = await bcrypt.hash(newPassword, 12)
    await db.execute('UPDATE admin_users SET password = ? WHERE id = ?', [hash, auth.user.id])

    return NextResponse.json({ success: true, message: 'Password updated successfully.' })
  } catch (err) {
    console.error('Change password error:', err)
    return NextResponse.json({ message: 'Server error.' }, { status: 500 })
  }
}
