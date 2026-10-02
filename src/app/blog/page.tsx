import type { Metadata } from 'next'
import Link from 'next/link'
import BlogInteractive from '@/components/BlogInteractive'
import BlogNewsletter from '@/components/BlogNewsletter'

export const metadata: Metadata = {
  title: 'Digital Marketing, SEO & AI Business Growth Blog | Calidigi',
  description:
    "Explore Calidigi's expert insights on digital marketing, web design, local SEO, branding, AI solutions and business growth strategies for California businesses.",
  alternates: {
    canonical: 'https://www.calidigi.com/blog',
    languages: { 'en-US': 'https://www.calidigi.com/blog', 'x-default': 'https://www.calidigi.com/blog' },
  },
  openGraph: {
    url: 'https://www.calidigi.com/blog',
    title: 'Digital Marketing, SEO & AI Business Growth Blog | Calidigi',
    description: "Explore Calidigi's expert insights on digital marketing, web design, local SEO, branding, AI solutions and business growth strategies for California businesses.",
  },
  twitter: {
    title: 'Digital Marketing, SEO & AI Business Growth Blog | Calidigi',
    description: "Explore Calidigi's expert insights on digital marketing, web design, local SEO, branding, AI solutions and business growth strategies for California businesses.",
  },
}

export default function BlogPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        '@id': 'https://www.calidigi.com/blog#blog',
        url: 'https://www.calidigi.com/blog',
        name: 'Calidigi Blog — Digital Marketing, SEO & AI Business Insights',
        description: 'Expert insights on digital marketing, web design, local SEO, AI solutions and business growth strategies.',
        publisher: { '@id': 'https://www.calidigi.com/#organization' },
        inLanguage: 'en-US',
      },
      {
        '@type': 'WebPage',
        '@id': 'https://www.calidigi.com/blog#webpage',
        url: 'https://www.calidigi.com/blog',
        name: 'Digital Marketing, SEO & AI Business Growth Blog | Calidigi',
        description: 'Expert insights on digital marketing, web design, local SEO, branding and AI solutions for California businesses.',
        isPartOf: { '@id': 'https://www.calidigi.com/#website' },
        breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.calidigi.com/' }, { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.calidigi.com/blog' }] },
      },
      {
        '@type': 'BlogPosting',
        '@id': 'https://www.calidigi.com/blog#post-1',
        headline: 'How Local SEO Helps Businesses Get Found by Nearby Customers',
        description: 'Understand the key elements that influence local online visibility and help customers discover your business when they search nearby on Google.',
        url: 'https://www.calidigi.com/blog',
        datePublished: '2026-12-10',
        dateModified: '2026-12-10',
        author: { '@type': 'Organization', name: 'Calidigi', '@id': 'https://www.calidigi.com/#organization' },
        publisher: { '@id': 'https://www.calidigi.com/#organization' },
        isPartOf: { '@id': 'https://www.calidigi.com/blog#blog' },
        keywords: ['local SEO', 'local search', 'Google Business Profile', 'California business'],
        articleSection: 'Local SEO',
        inLanguage: 'en-US',
      },
      {
        '@type': 'BlogPosting',
        '@id': 'https://www.calidigi.com/blog#post-2',
        headline: 'What Makes a Business Website Convert Visitors Into Customers?',
        description: 'Explore the design, usability, content, and conversion elements behind effective business websites that turn traffic into real revenue.',
        url: 'https://www.calidigi.com/blog',
        datePublished: '2026-12-05',
        dateModified: '2026-12-05',
        author: { '@type': 'Organization', name: 'Calidigi', '@id': 'https://www.calidigi.com/#organization' },
        publisher: { '@id': 'https://www.calidigi.com/#organization' },
        isPartOf: { '@id': 'https://www.calidigi.com/blog#blog' },
        keywords: ['website conversion', 'web design', 'CRO', 'landing page', 'business website'],
        articleSection: 'Web Design',
        inLanguage: 'en-US',
      },
      {
        '@type': 'BlogPosting',
        '@id': 'https://www.calidigi.com/blog#post-3',
        headline: 'Building a Digital Marketing Strategy for a Growing Business',
        description: 'A practical framework for connecting marketing channels with business objectives — from content and SEO to social and paid campaigns.',
        url: 'https://www.calidigi.com/blog',
        datePublished: '2026-11-28',
        dateModified: '2026-11-28',
        author: { '@type': 'Organization', name: 'Calidigi', '@id': 'https://www.calidigi.com/#organization' },
        publisher: { '@id': 'https://www.calidigi.com/#organization' },
        isPartOf: { '@id': 'https://www.calidigi.com/blog#blog' },
        keywords: ['digital marketing strategy', 'content marketing', 'SEO', 'paid ads', 'business growth'],
        articleSection: 'Digital Marketing',
        inLanguage: 'en-US',
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* ── 1. HERO ── */}
      <section className="blg-hero">
        <div className="blg-hero-glow"></div>
        <div className="blg-hero-glow-2"></div>
        <div className="container blg-hero-inner">
          <div className="blg-hero-content">
            <div className="badge badge-white"><i className="fas fa-book-open"></i> Calidigi Insights</div>
            <h1>Insights That Help<br /><em>Businesses Grow</em></h1>
            <p>Explore practical insights, strategies, trends, and solutions across digital marketing, web development, SEO, branding, AI, and business growth.</p>
            <div className="blg-hero-actions">
              <a href="#latest" className="btn btn-primary">Explore All Insights <i className="fas fa-arrow-right"></i></a>
              <a href="#newsletter" className="btn btn-outline-white">Get Insights in Your Inbox</a>
            </div>
            <div className="blg-hero-stats">
              <div className="blg-hero-stat"><strong>18+</strong><span>Articles</span></div>
              <div className="blg-hero-stat"><strong>11</strong><span>Categories</span></div>
              <div className="blg-hero-stat"><strong>Weekly</strong><span>New Content</span></div>
            </div>
          </div>
          <div className="blg-hero-visual">
            <div className="blg-preview-row">
              <div className="blg-preview-card">
                <div className="blg-preview-thumb bb-ai"><i className="fas fa-brain"></i></div>
                <div className="blg-preview-body">
                  <span className="blg-preview-cat">AI &amp; Automation</span>
                  <p className="blg-preview-title">How AI Is Transforming Business Operations</p>
                  <span className="blg-preview-meta">8 min read</span>
                </div>
              </div>
              <div className="blg-preview-card">
                <div className="blg-preview-thumb bb-local"><i className="fas fa-map-location-dot"></i></div>
                <div className="blg-preview-body">
                  <span className="blg-preview-cat">Local SEO</span>
                  <p className="blg-preview-title">How Local SEO Helps Businesses Get Found</p>
                  <span className="blg-preview-meta">6 min read</span>
                </div>
              </div>
            </div>
            <div className="blg-preview-row">
              <div className="blg-preview-card">
                <div className="blg-preview-thumb bb-web"><i className="fas fa-code"></i></div>
                <div className="blg-preview-body">
                  <span className="blg-preview-cat">Web Design</span>
                  <p className="blg-preview-title">What Makes a Business Website Convert Visitors?</p>
                  <span className="blg-preview-meta">7 min read</span>
                </div>
              </div>
              <div className="blg-preview-card">
                <div className="blg-preview-thumb bb-mkt"><i className="fas fa-chart-line"></i></div>
                <div className="blg-preview-body">
                  <span className="blg-preview-cat">Digital Marketing</span>
                  <p className="blg-preview-title">Building a Digital Marketing Strategy That Works</p>
                  <span className="blg-preview-meta">9 min read</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. FEATURED ARTICLE ── */}
      <section className="blg-featured">
        <div className="container">
          <div className="section-head" style={{ marginBottom: '36px' }}>
            <div className="badge badge-orange"><i className="fas fa-star"></i> Featured Article</div>
          </div>
          <div className="blg-feat-card">
            <div className="blg-feat-img bb-ai" style={{ fontSize: '5rem', color: 'rgba(255,255,255,0.85)' }}>
              <i className="fas fa-brain" style={{ position: 'relative', zIndex: 1 }}></i>
            </div>
            <div className="blg-feat-content">
              <div className="blg-feat-label"><i className="fas fa-star"></i> Featured</div>
              <span className="blg-feat-cat">AI &amp; Automation</span>
              <h2 className="blg-feat-title">How AI Is Changing the Way Businesses Approach Digital Growth</h2>
              <p className="blg-feat-desc">Discover how businesses can use AI, automation, and digital strategy to improve productivity, create better customer experiences, and make smarter data-driven decisions — without needing a team of engineers.</p>
              <div className="blg-feat-meta">
                <div className="blg-feat-meta-item"><i className="fas fa-user"></i><span>Calidigi Team</span></div>
                <div className="blg-feat-meta-item"><i className="fas fa-calendar"></i><span>Dec 15, 2026</span></div>
                <div className="blg-feat-meta-item"><i className="fas fa-clock"></i><span>8 min read</span></div>
              </div>
              <Link href="/blog/how-ai-is-changing-the-way-businesses-approach-digital-growth" className="blg-feat-link">Read Article <i className="fas fa-arrow-right"></i></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. SEARCH + CATEGORIES + GRID + PAGINATION ── */}
      <BlogInteractive />

      {/* ── 4. NEWSLETTER ── */}
      <BlogNewsletter />

      {/* ── 5. BUSINESS CTA ── */}
      <section className="blg-biz-cta" id="contact">
        <div className="blg-biz-cta-glow"></div>
        <div className="container">
          <div className="blg-biz-inner">
            <div className="badge badge-white" style={{ marginBottom: '20px' }}><i className="fas fa-comments"></i> Work With Us</div>
            <h2>Have a Digital Challenge?<br /><em>Let&rsquo;s Solve It.</em></h2>
            <p>Whether you need a stronger website, better local visibility, a smarter digital strategy, or an AI-powered solution — Calidigi can help you identify the right approach for your business.</p>
            <div className="blg-biz-btns">
              <Link href="/contact-us" className="btn btn-primary">Start a Conversation <i className="fas fa-arrow-right"></i></Link>
              <Link href="/services" className="btn btn-outline-white">Explore Our Services</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
