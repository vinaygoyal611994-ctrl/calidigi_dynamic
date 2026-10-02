import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'calidigi_admin_secret_change_in_production'
const EXPIRES = '7d'

export interface JwtPayload {
  id: number
  username: string
}

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, SECRET, { expiresIn: EXPIRES })
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, SECRET) as JwtPayload
  } catch {
    return null
  }
}
