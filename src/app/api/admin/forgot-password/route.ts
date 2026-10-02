import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import db from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const { username } = await req.json()
    if (!username?.trim()) {
      return NextResponse.json({ message: 'Username is required.' }, { status: 400 })
    }

    const [rows] = await db.execute('SELECT id FROM admin_users WHERE username = ?', [username.trim()]) as any[]
    if (!rows[0]) {
      // Return success even if not found to prevent username enumeration
      return NextResponse.json({ message: 'If that username exists, a reset link has been generated.' })
    }

    const userId = rows[0].id
    const token = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes

    // Delete any existing reset tokens for this user
    await db.execute('DELETE FROM password_resets WHERE user_id = ?', [userId])

    // Insert new token
    await db.execute(
      'INSERT INTO password_resets (user_id, token, expires_at) VALUES (?, ?, ?)',
      [userId, token, expiresAt.toISOString().slice(0, 19).replace('T', ' ')]
    )

    const baseUrl = req.headers.get('origin') || 'http://localhost:3000'
    const resetUrl = `${baseUrl}/admin/login?token=${token}`

    return NextResponse.json({ success: true, resetUrl })
  } catch (err) {
    console.error('Forgot password error:', err)
    return NextResponse.json({ message: 'Server error.' }, { status: 500 })
  }
}
