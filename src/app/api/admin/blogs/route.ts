import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/authMiddleware'
import db from '@/lib/db'

function rowToBlog(r: any) {
  return {
    id: r.id, title: r.title, slug: r.slug, excerpt: r.excerpt,
    category: r.category, catSlug: r.cat_slug,
    tags: typeof r.tags === 'string' ? JSON.parse(r.tags) : (r.tags ?? []),
    date: r.date, readTime: r.read_time, bg: r.bg, icon: r.icon,
    author: r.author, status: r.status,
    content: typeof r.content === 'string' ? JSON.parse(r.content) : (r.content ?? {}),
    createdAt: r.created_at, updatedAt: r.updated_at,
  }
}

export async function GET(req: NextRequest) {
  const auth = requireAuth(req)
  if (auth instanceof NextResponse) return auth

  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    let sql = 'SELECT * FROM blogs'
    const params: any[] = []
    if (status) { sql += ' WHERE status = ?'; params.push(status) }
    sql += ' ORDER BY created_at DESC'

    const [rows] = await db.execute(sql, params) as any[]
    return NextResponse.json({ blogs: (rows as any[]).map(rowToBlog), total: rows.length })
  } catch (err) {
    console.error('Blogs GET error:', err)
    return NextResponse.json({ message: 'Server error.' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const auth = requireAuth(req)
  if (auth instanceof NextResponse) return auth

  try {
    const body = await req.json()
    const { title, slug, excerpt, category, tags, date, readTime, bg, icon, author, status, content } = body

    if (!title?.trim() || !slug?.trim()) {
      return NextResponse.json({ message: 'Title and slug are required.' }, { status: 400 })
    }

    const catSlug = (category || '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

    const [result] = await db.execute(
      `INSERT INTO blogs (title, slug, excerpt, category, cat_slug, tags, date, read_time, bg, icon, author, status, content)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title.trim(), slug.trim(), excerpt || '', category || '', catSlug,
       JSON.stringify(tags ?? []), date || '', readTime || '5 min', bg || 'bb-ai',
       icon || 'fa-newspaper', author || 'Calidigi Team', status || 'draft',
       JSON.stringify(content ?? {})]
    ) as any[]

    return NextResponse.json({ success: true, id: result.insertId }, { status: 201 })
  } catch (err: any) {
    if (err?.code === 'ER_DUP_ENTRY') {
      return NextResponse.json({ message: 'A blog post with this slug already exists.' }, { status: 409 })
    }
    console.error('Blog POST error:', err)
    return NextResponse.json({ message: 'Server error.' }, { status: 500 })
  }
}
