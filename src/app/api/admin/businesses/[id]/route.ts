import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/authMiddleware'
import db from '@/lib/db'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = requireAuth(req)
  if (auth instanceof NextResponse) return auth

  const { id } = await params
  const [rows] = await db.execute('SELECT * FROM businesses WHERE id = ?', [id]) as any[]
  if (!rows.length) return NextResponse.json({ message: 'Not found' }, { status: 404 })
  return NextResponse.json(rows[0])
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = requireAuth(req)
  if (auth instanceof NextResponse) return auth

  const { id } = await params
  const b = await req.json()

  await db.execute(
    `UPDATE businesses SET
      title=?, company_name=?, email=?, phone=?, web=?, link=?, logo=?, address=?, address_new=?,
      city=?, state=?, zip_code=?, country=?, county=?, lat=?, lon=?, about=?,
      rating=?, review=?, claimed=?, yelp_url=?, hours_of_operation=?, hours_of_ops=?,
      founding_date=?, noe=?, skor=?, sent=?, filename=?, zips_id=?, updates=?, web_scan=?
     WHERE id=?`,
    [
      b.title || '', b.company_name || null, b.email || null, b.phone || null,
      b.web || null, b.link || null, b.logo || null, b.address || null, b.address_new || null,
      b.city || null, b.state || null, b.zip_code || null, b.country || null, b.county || null,
      b.lat || null, b.lon || null, b.about || null,
      parseFloat(b.rating) || 0, parseInt(b.review) || 0, b.claimed ?? null, b.yelp_url || null,
      b.hours_of_operation || null, b.hours_of_ops || null,
      parseInt(b.founding_date) || null, parseInt(b.noe) || 0,
      parseInt(b.skor) || 0, parseInt(b.sent) || 0, b.filename || null,
      parseInt(b.zips_id) || null, b.updates ? 1 : 0, b.web_scan ? 1 : 0,
      id,
    ]
  )

  return NextResponse.json({ success: true })
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = requireAuth(req)
  if (auth instanceof NextResponse) return auth

  const { id } = await params
  const [result] = await db.execute('DELETE FROM businesses WHERE id = ?', [id]) as any[]
  if ((result as any).affectedRows === 0) return NextResponse.json({ message: 'Not found' }, { status: 404 })
  return NextResponse.json({ success: true })
}
