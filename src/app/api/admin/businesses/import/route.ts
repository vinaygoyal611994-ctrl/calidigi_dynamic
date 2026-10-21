import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/authMiddleware'
import db from '@/lib/db'

async function ensureImportsTable() {
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

function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++ }
      else inQuotes = !inQuotes
    } else if (ch === ',' && !inQuotes) {
      result.push(current.trim()); current = ''
    } else {
      current += ch
    }
  }
  result.push(current.trim())
  return result
}

export async function POST(req: NextRequest) {
  const auth = requireAuth(req)
  if (auth instanceof NextResponse) return auth

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  if (!file) return NextResponse.json({ message: 'No file uploaded' }, { status: 400 })

  const text = await file.text()
  const lines = text.split(/\r?\n/).filter(l => l.trim())
  if (lines.length < 2) return NextResponse.json({ message: 'CSV is empty' }, { status: 400 })

  const headers = parseCSVLine(lines[0]).map(h => h.toLowerCase().replace(/\s+/g, '_'))

  const col = (row: string[], name: string) => {
    const idx = headers.indexOf(name)
    return idx >= 0 ? row[idx] || null : null
  }

  let inserted = 0, skipped = 0
  for (let i = 1; i < lines.length; i++) {
    const row = parseCSVLine(lines[i])
    if (row.length < 2) continue
    const title = col(row, 'title')
    if (!title) { skipped++; continue }
    try {
      await db.execute(
        `INSERT INTO businesses
          (title, company_name, email, phone, web, link, logo, address, address_new, city, state,
           zip_code, country, county, lat, lon, about, rating, review, claimed, yelp_url,
           hours_of_operation, hours_of_ops, founding_date, noe, skor, sent, filename,
           zips_id, updates, web_scan)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
          title,
          col(row, 'company_name'), col(row, 'email'), col(row, 'phone'),
          col(row, 'web'), col(row, 'link'), col(row, 'logo'),
          col(row, 'address'), col(row, 'address_new'),
          col(row, 'city'), col(row, 'state'), col(row, 'zip_code'),
          col(row, 'country'), col(row, 'county'),
          col(row, 'lat') ? parseFloat(col(row, 'lat')!) : null,
          col(row, 'lon') ? parseFloat(col(row, 'lon')!) : null,
          col(row, 'about'),
          col(row, 'rating') ? parseFloat(col(row, 'rating')!) : 0,
          col(row, 'review') ? parseInt(col(row, 'review')!) : 0,
          col(row, 'claimed') ? parseInt(col(row, 'claimed')!) : null,
          col(row, 'yelp_url'),
          col(row, 'hours_of_operation'),
          col(row, 'hours_of_ops'),
          col(row, 'founding_date') ? parseInt(col(row, 'founding_date')!) : null,
          col(row, 'noe') ? parseInt(col(row, 'noe')!) : 0,
          col(row, 'skor') ? parseInt(col(row, 'skor')!) : 0,
          col(row, 'sent') ? parseInt(col(row, 'sent')!) : 0,
          col(row, 'filename'),
          col(row, 'zips_id') ? parseInt(col(row, 'zips_id')!) : null,
          col(row, 'updates') === '1' ? 1 : 0,
          col(row, 'web_scan') === '1' ? 1 : 0,
        ]
      )
      inserted++
    } catch { skipped++ }
  }

  const total = lines.length - 1
  try {
    await ensureImportsTable()
    await db.execute(
      'INSERT INTO business_imports (original_name, inserted, skipped, total, file_data) VALUES (?, ?, ?, ?, ?)',
      [file.name, inserted, skipped, total, text]
    )
  } catch (err) {
    console.error('Failed to save import record:', err)
  }

  return NextResponse.json({ inserted, skipped, total })
}
