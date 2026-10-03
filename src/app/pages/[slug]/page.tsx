import { notFound } from 'next/navigation'

async function getPage(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/pages/${slug}`, { cache: 'no-store' })
    if (!res.ok) return null
    return res.json()
  } catch { return null }
}

export default async function PublicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = await getPage(slug)
  if (!page) notFound()

  const fmt = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

  return (
    <div className="cms-page-wrap">
      <div className="cms-page-hero">
        <div className="container">
          <h1 className="cms-page-title">{page.title}</h1>
          <p className="cms-page-meta">Last updated: {fmt(page.updatedAt)}</p>
        </div>
      </div>
      <div className="container">
        <div className="cms-page-body" dangerouslySetInnerHTML={{ __html: page.content }} />
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = await getPage(slug)
  return {
    title: page ? `${page.title} | Calidigi` : 'Page Not Found',
    description: page?.metaDescription || '',
  }
}
