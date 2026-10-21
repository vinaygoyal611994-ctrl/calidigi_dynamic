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

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await ensureTable()
  const auth = requireAuth(req)
  if (auth instanceof NextResponse) return auth

  try {
    const { id } = await params
    const [rows] = await db.execute(
      'SELECT original_name, file_data FROM business_imports WHERE id = ?', [id]
    ) as any[]

    const record = rows[0]
    if (!record || !record.file_data) {
      return NextResponse.json({ message: 'Import not found.' }, { status: 404 })
    }

    return new NextResponse(record.file_data, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${record.original_name}"`,
      },
    })
  } catch (err) {
    console.error('Import download error:', err)
    return NextResponse.json({ message: 'Failed to download.' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = requireAuth(req)
  if (auth instanceof NextResponse) return auth

  try {
    const { id } = await params
    await db.execute('DELETE FROM business_imports WHERE id = ?', [id])
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ message: 'Failed to delete.' }, { status: 500 })
  }
}
