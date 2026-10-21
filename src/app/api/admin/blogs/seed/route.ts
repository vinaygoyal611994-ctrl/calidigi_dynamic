import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/authMiddleware'
import db from '@/lib/db'
import { BLOG_ARTICLES } from '@/lib/blogData'

export async function POST(req: NextRequest) {
  const auth = requireAuth(req)
  if (auth instanceof NextResponse) return auth

  let inserted = 0
  let skipped  = 0

  for (const a of BLOG_ARTICLES) {
    try {
      await db.execute(
        `INSERT INTO blogs (title, slug, excerpt, category, cat_slug, tags, date, read_time, bg, icon, author, status, content)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'published', ?)`,
        [
          a.title, a.slug, a.excerpt, a.category, a.catSlug,
          JSON.stringify(a.tags), a.date, a.readTime, a.bg, a.icon, a.author,
          JSON.stringify(a.content),
        ]
      )
      inserted++
    } catch (err: any) {
      if (err?.code === 'ER_DUP_ENTRY') skipped++
      else console.error(`Seed error for slug "${a.slug}":`, err)
    }
  }

  return NextResponse.json({ inserted, skipped, total: BLOG_ARTICLES.length })
}
