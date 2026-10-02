import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import db from '@/lib/db'
import { signToken } from '@/lib/jwt'

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json()
    if (!username || !password) {
      return NextResponse.json({ message: 'Username and password are required.' }, { status: 400 })
    }

    const [rows] = await db.execute('SELECT * FROM admin_users WHERE username = ?', [username]) as any[]
    const user = rows[0]
    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 })
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 })
    }

    const token = signToken({ id: user.id, username: user.username })
    return NextResponse.json({ token, username: user.username })
  } catch (err) {
    console.error('Login error:', err)
    return NextResponse.json({ message: 'Server error.' }, { status: 500 })
  }
}
