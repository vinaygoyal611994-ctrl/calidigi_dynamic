import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BLOG_ARTICLES, getArticleBySlug, getRelatedArticles } from '@/lib/blogData'

/* ── Static Params ── */
export function generateStaticParams() {
  return BLOG_ARTICLES.map(a => ({ slug: a.slug }))
}

/* ── Metadata ── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return { title: 'Article Not Found | Calidigi' }

  const url = `https://www.calidigi.com/blog/${article.slug}`
  return {
    title: `${article.title} | Calidigi`,
    description: article.excerpt,
    alternates: {
      canonical: url,
      languages: { 'en-US': url, 'x-default': url },
    },
    openGraph: {
      url,
      title: `${article.title} | Calidigi`,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.date,
      authors: [article.author],
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${article.title} | Calidigi`,
      description: article.excerpt,
    },
  }
}

/* ── Page ── */
export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const related = getRelatedArticles(article, 3)
  const articleUrl = `https://www.calidigi.com/blog/${article.slug}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${articleUrl}#blogposting`,
    headline: article.title,
    description: article.excerpt,
    url: articleUrl,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      '@type': 'Organization',
      name: 'Calidigi',
      '@id': 'https://www.calidigi.com/#organization',
    },
    publisher: {
      '@id': 'https://www.calidigi.com/#organization',
    },
    keywords: article.tags,
    articleSection: article.category,
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'Blog',
      '@id': 'https://www.calidigi.com/blog#blog',
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.calidigi.com/' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.calidigi.com/blog' },
        { '@type': 'ListItem', position: 3, name: article.title, item: articleUrl },
      ],
    },
  }

  const shareSubject = encodeURIComponent(article.title)
  const shareBody = encodeURIComponent(`${article.excerpt}\n\n${articleUrl}`)
  const twitterText = encodeURIComponent(`${article.title} — ${article.excerpt.slice(0, 80)}...`)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── 1. HERO ── */}
      <section className="bd-hero">
        <div className="bd-hero-inner container">
          {/* Breadcrumb */}
          <nav className="bd-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <i className="fas fa-chevron-right"></i>
            <Link href="/blog">Blog</Link>
            <i className="fas fa-chevron-right"></i>
            <span>{article.category}</span>
          </nav>

          {/* Category Badge */}
          <div className="bd-hero-badge">
            <i className={`fas ${article.icon}`}></i>
            {article.category}
          </div>

          {/* Title */}
          <h1 className="bd-hero-title">{article.title}</h1>

          {/* Meta */}
          <div className="bd-hero-meta">
            <span>
              <i className="fas fa-user"></i>
              {article.author}
            </span>
            <span>
              <i className="fas fa-calendar"></i>
              {article.date}
            </span>
            <span>
              <i className="fas fa-clock"></i>
              {article.readTime} read
            </span>
          </div>

          {/* Tags */}
          <div className="bd-hero-tags">
            {article.tags.map(tag => (
              <span key={tag} className="bd-hero-tag">{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. BODY ── */}
      <section className="bd-body">
        <div className="bd-body-inner container">

          {/* ── Main Content ── */}
          <article className="bd-content">

            {/* Intro */}
            <div className="bd-intro">
              <p>{article.content.intro}</p>
            </div>

            {/* Sections */}
            {article.content.sections.map((section, i) => (
              <div
                key={i}
                className="bd-section"
                id={`section-${i}`}
              >
                <h2 className="bd-section-h2">{section.heading}</h2>
                {section.body.split('\n\n').map((para, j) => (
                  <p key={j}>{para}</p>
                ))}
              </div>
            ))}

            {/* Conclusion */}
            <div className="bd-conclusion">
              <p>{article.content.conclusion}</p>
            </div>
          </article>

          {/* ── Sidebar ── */}
          <aside className="bd-sidebar">

            {/* Table of Contents */}
            <div className="bd-toc">
              <p className="bd-toc-title">
                <i className="fas fa-list"></i> Table of Contents
              </p>
              <ol className="bd-toc-list">
                {article.content.sections.map((section, i) => (
                  <li key={i}>
                    <a href={`#section-${i}`}>{section.heading}</a>
                  </li>
                ))}
              </ol>
            </div>

            {/* Share */}
            <div className="bd-share">
              <p className="bd-share-title">
                <i className="fas fa-share-nodes"></i> Share This Article
              </p>
              <div className="bd-share-btns">
                <a
                  href={`mailto:?subject=${shareSubject}&body=${shareBody}`}
                  className="bd-share-btn bd-share-email"
                  aria-label="Share via Email"
                >
                  <i className="fas fa-envelope"></i> Email
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bd-share-btn bd-share-linkedin"
                  aria-label="Share on LinkedIn"
                >
                  <i className="fab fa-linkedin"></i> LinkedIn
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${twitterText}&url=${encodeURIComponent(articleUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bd-share-btn bd-share-twitter"
                  aria-label="Share on Twitter/X"
                >
                  <i className="fab fa-x-twitter"></i> Twitter
                </a>
              </div>
            </div>

            {/* Author Card */}
            <div className="bd-author-card">
              <div className="bd-author-avatar">
                <i className="fas fa-users"></i>
              </div>
              <div className="bd-author-info">
                <p className="bd-author-name">{article.author}</p>
                <p className="bd-author-role">Digital Growth Experts</p>
                <p className="bd-author-bio">
                  We help California businesses grow online through strategy, web development, SEO, and AI-powered solutions — combining deep expertise with hands-on execution.
                </p>
              </div>
            </div>

            {/* CTA Card */}
            <div className="bd-cta-card">
              <div className="bd-cta-card-icon">
                <i className="fas fa-rocket"></i>
              </div>
              <h3 className="bd-cta-card-title">Ready to Grow?</h3>
              <p className="bd-cta-card-desc">
                Put these insights into action. Calidigi helps businesses build the digital presence, strategy, and systems they need to grow.
              </p>
              <Link href="/contact-us" className="bd-cta-card-btn">
                Start a Conversation <i className="fas fa-arrow-right"></i>
              </Link>
            </div>

          </aside>
        </div>
      </section>

      {/* ── 3. RELATED ARTICLES ── */}
      {related.length > 0 && (
        <section className="bd-related">
          <div className="container">
            <div className="bd-related-head">
              <h2>Related <em>Articles</em></h2>
              <p>Continue exploring ideas relevant to this topic.</p>
            </div>
            <div className="bd-related-grid">
              {related.map(r => (
                <Link key={r.id} href={`/blog/${r.slug}`} className="bd-related-card">
                  <div className={`bd-related-thumb ${r.bg}`}>
                    <i className={`fas ${r.icon}`}></i>
                  </div>
                  <div className="bd-related-body">
                    <span className="bd-related-cat">{r.category}</span>
                    <h3 className="bd-related-title">{r.title}</h3>
                    <p className="bd-related-excerpt">{r.excerpt.slice(0, 100)}…</p>
                    <div className="bd-related-meta">
                      <span><i className="fas fa-calendar"></i> {r.date}</span>
                      <span className="bd-related-read">
                        {r.readTime} <i className="fas fa-arrow-right"></i>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 4. CTA STRIP ── */}
      <section className="bd-cta-strip">
        <div className="container">
          <div className="bd-cta-strip-inner">
            <div className="bd-cta-strip-icon">
              <i className="fas fa-comments"></i>
            </div>
            <div className="bd-cta-strip-text">
              <h2>Have questions after reading?</h2>
              <p>Our team is happy to discuss how these ideas apply to your specific business.</p>
            </div>
            <Link href="/contact-us" className="btn btn-primary bd-cta-strip-btn">
              Start a Conversation <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
