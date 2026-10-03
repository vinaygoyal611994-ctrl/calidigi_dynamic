import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  try {
    const [rows] = await db.execute(
      "SELECT * FROM cms_pages WHERE slug = ? AND status = 'published'", [slug]
    ) as any[]
    if (!rows[0]) return NextResponse.json({ message: 'Page not found.' }, { status: 404 })
    const r = rows[0]
    return NextResponse.json({
      id: r.id, title: r.title, slug: r.slug, content: r.content,
      metaDescription: r.meta_description, updatedAt: r.updated_at,
    })
  } catch (err) {
    console.error('Public page GET error:', err)
    return NextResponse.json({ message: 'Server error.' }, { status: 500 })
  }
}
