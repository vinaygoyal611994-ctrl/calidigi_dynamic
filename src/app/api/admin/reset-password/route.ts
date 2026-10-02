import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import db from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const { token, newPassword } = await req.json()
    if (!token || !newPassword) {
      return NextResponse.json({ message: 'Token and new password are required.' }, { status: 400 })
    }
    if (newPassword.length < 8) {
      return NextResponse.json({ message: 'Password must be at least 8 characters.' }, { status: 400 })
    }

    const [rows] = await db.execute(
      'SELECT pr.user_id, pr.expires_at FROM password_resets pr WHERE pr.token = ?',
      [token]
    ) as any[]

    if (!rows[0]) {
      return NextResponse.json({ message: 'Invalid or expired reset link.' }, { status: 400 })
    }

    const { user_id, expires_at } = rows[0]
    if (new Date(expires_at) < new Date()) {
      await db.execute('DELETE FROM password_resets WHERE token = ?', [token])
      return NextResponse.json({ message: 'Reset link has expired. Please request a new one.' }, { status: 400 })
    }

    const hash = await bcrypt.hash(newPassword, 12)
    await db.execute('UPDATE admin_users SET password = ? WHERE id = ?', [hash, user_id])
    await db.execute('DELETE FROM password_resets WHERE token = ?', [token])

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Reset password error:', err)
    return NextResponse.json({ message: 'Server error.' }, { status: 500 })
  }
}
