import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/authMiddleware'
import db from '@/lib/db'

async function ensureTable() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS business_imports (
      id            INT AUTO_INCREMENT PRIMARY KEY,
      original_name VARCHAR(255) NOT NULL,
      inserted      INT DEFAULT 0,
      skipped       INT DEFAULT 0,
      total         INT DEFAULT 0,
      file_data     LONGTEXT,
      created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `)
}

export async function GET(req: NextRequest) {
  const auth = requireAuth(req)
  if (auth instanceof NextResponse) return auth

  try {
    await ensureTable()
    const [rows] = await db.execute(
      'SELECT id, original_name, inserted, skipped, total, created_at FROM business_imports ORDER BY created_at DESC LIMIT 50'
    ) as any[]
    return NextResponse.json(rows)
  } catch (err) {
    console.error('Import history error:', err)
    return NextResponse.json({ message: 'Failed to load import history.' }, { status: 500 })
  }
}
