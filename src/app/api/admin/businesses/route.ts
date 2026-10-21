import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/authMiddleware'
import db from '@/lib/db'

export async function GET(req: NextRequest) {
  const auth = requireAuth(req)
  if (auth instanceof NextResponse) return auth

  const { searchParams } = new URL(req.url)
  const page     = Math.max(1, parseInt(searchParams.get('page')  || '1'))
  const limit    = Math.min(100, parseInt(searchParams.get('limit') || '20'))
  const offset   = (page - 1) * limit
  const search   = searchParams.get('search')  || ''
  const city     = searchParams.get('city')    || ''
  const state    = searchParams.get('state')   || ''
  const country  = searchParams.get('country') || ''
  const claimed  = searchParams.get('claimed') || ''
  const ratingMin = searchParams.get('rating_min') || ''
  const ratingMax = searchParams.get('rating_max') || ''

  const conditions: string[] = []
  const params: (string | number)[] = []

  if (search) {
    conditions.push('(title LIKE ? OR company_name LIKE ? OR email LIKE ? OR phone LIKE ? OR city LIKE ?)')
    const s = `%${search}%`
    params.push(s, s, s, s, s)
  }
  if (city)    { conditions.push('city LIKE ?');    params.push(`%${city}%`) }
  if (state)   { conditions.push('state = ?');      params.push(state) }
  if (country) { conditions.push('country LIKE ?'); params.push(`%${country}%`) }
  if (claimed !== '') { conditions.push('claimed = ?'); params.push(parseInt(claimed)) }
  if (ratingMin) { conditions.push('rating >= ?'); params.push(parseFloat(ratingMin)) }
  if (ratingMax) { conditions.push('rating <= ?'); params.push(parseFloat(ratingMax)) }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''

  const [countRows] = await db.execute(
    `SELECT COUNT(*) as total FROM businesses ${where}`, params
  ) as any[]
  const total = countRows[0].total

  const [rows] = await db.execute(
    `SELECT id, title, company_name, email, phone, city, state, country, zip_code,
            rating, review, claimed, web, yelp_url, address, logo, founding_date, noe,
            skor, sent, updates, web_scan, created_at
     FROM businesses ${where} ORDER BY id DESC LIMIT ? OFFSET ?`,
    [...params, limit, offset]
  ) as any[]

  return NextResponse.json({ data: rows, total, page, totalPages: Math.ceil(total / limit) })
}

export async function POST(req: NextRequest) {
  const auth = requireAuth(req)
  if (auth instanceof NextResponse) return auth

  const b = await req.json()

  const [result] = await db.execute(
    `INSERT INTO businesses
      (title, company_name, email, phone, web, link, logo, address, address_new, city, state,
       zip_code, country, county, lat, lon, about, rating, review, claimed, yelp_url,
       hours_of_operation, hours_of_ops, founding_date, noe, skor, sent, filename,
       zips_id, updates, web_scan)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
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
    ]
  ) as any[]

  return NextResponse.json({ id: (result as any).insertId }, { status: 201 })
}
