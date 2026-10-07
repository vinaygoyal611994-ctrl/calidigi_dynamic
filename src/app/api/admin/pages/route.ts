import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/authMiddleware'
import db from '@/lib/db'

function rowToPage(r: any) {
  return {
    id: r.id,
    pageName: r.page_name,
    title: r.title,
    slug: r.slug,
    content: r.content,
    metaTitle: r.meta_title,
    metaDescription: r.meta_description,
    metaKeyword: r.meta_keyword,
    status: r.status,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  }
}

export async function GET(req: NextRequest) {
  const auth = requireAuth(req)
  if (auth instanceof NextResponse) return auth

  try {
    const [rows] = await db.execute('SELECT * FROM cms_pages ORDER BY created_at DESC') as any[]
    return NextResponse.json({ pages: (rows as any[]).map(rowToPage), total: rows.length })
  } catch (err) {
    console.error('Pages GET error:', err)
    return NextResponse.json({ message: 'Server error.' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const auth = requireAuth(req)
  if (auth instanceof NextResponse) return auth

  try {
    const { pageName, title, slug, content, metaTitle, metaDescription, metaKeyword, status } = await req.json()
    if (!title?.trim() || !slug?.trim()) {
      return NextResponse.json({ message: 'Title and slug are required.' }, { status: 400 })
    }

    const [result] = await db.execute(
      'INSERT INTO cms_pages (page_name, title, slug, content, meta_title, meta_description, meta_keyword, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [pageName || '', title.trim(), slug.trim(), content || '', metaTitle || '', metaDescription || '', metaKeyword || '', status || 'draft']
    ) as any[]

    return NextResponse.json({ success: true, id: result.insertId }, { status: 201 })
  } catch (err: any) {
    if (err?.code === 'ER_DUP_ENTRY') {
      return NextResponse.json({ message: 'A page with this slug already exists.' }, { status: 409 })
    }
    console.error('Page POST error:', err)
    return NextResponse.json({ message: 'Server error.' }, { status: 500 })
  }
}
