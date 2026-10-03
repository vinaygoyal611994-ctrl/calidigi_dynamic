import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/authMiddleware'
import db from '@/lib/db'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = requireAuth(req)
  if (auth instanceof NextResponse) return auth

  const { id } = await params
  try {
    const [rows] = await db.execute('SELECT * FROM cms_pages WHERE id = ?', [id]) as any[]
    if (!rows[0]) return NextResponse.json({ message: 'Not found.' }, { status: 404 })
    const r = rows[0]
    return NextResponse.json({
      id: r.id, title: r.title, slug: r.slug, content: r.content,
      metaDescription: r.meta_description, status: r.status,
      createdAt: r.created_at, updatedAt: r.updated_at,
    })
  } catch (err) {
    console.error('Page GET error:', err)
    return NextResponse.json({ message: 'Server error.' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = requireAuth(req)
  if (auth instanceof NextResponse) return auth

  const { id } = await params
  try {
    const { title, slug, content, metaDescription, status } = await req.json()
    if (!title?.trim() || !slug?.trim()) {
      return NextResponse.json({ message: 'Title and slug are required.' }, { status: 400 })
    }

    const [result] = await db.execute(
      'UPDATE cms_pages SET title=?, slug=?, content=?, meta_description=?, status=? WHERE id=?',
      [title.trim(), slug.trim(), content || '', metaDescription || '', status || 'draft', id]
    ) as any[]

    if (result.affectedRows === 0) return NextResponse.json({ message: 'Not found.' }, { status: 404 })
    return NextResponse.json({ success: true })
  } catch (err: any) {
    if (err?.code === 'ER_DUP_ENTRY') {
      return NextResponse.json({ message: 'A page with this slug already exists.' }, { status: 409 })
    }
    console.error('Page PUT error:', err)
    return NextResponse.json({ message: 'Server error.' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = requireAuth(req)
  if (auth instanceof NextResponse) return auth

  const { id } = await params
  try {
    const [result] = await db.execute('DELETE FROM cms_pages WHERE id = ?', [id]) as any[]
    if (result.affectedRows === 0) return NextResponse.json({ message: 'Not found.' }, { status: 404 })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Page DELETE error:', err)
    return NextResponse.json({ message: 'Server error.' }, { status: 500 })
  }
}
