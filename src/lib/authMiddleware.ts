import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, JwtPayload } from './jwt'

export function getAuthUser(req: NextRequest): JwtPayload | null {
  const auth = req.headers.get('authorization') || ''
  if (!auth.startsWith('Bearer ')) return null
  return verifyToken(auth.slice(7))
}

export function unauthorized() {
  return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
}

export function requireAuth(req: NextRequest): { user: JwtPayload } | NextResponse {
  const user = getAuthUser(req)
  if (!user) return unauthorized()
  return { user }
}
