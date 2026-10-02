'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'

const ARTICLES = [
  { id: 2,  slug: 'how-local-seo-helps-businesses-get-found-by-nearby-customers', title: 'How Local SEO Helps Businesses Get Found by Nearby Customers', excerpt: 'Understand the key elements that influence local online visibility and help customers discover your business when they search nearby on Google.', category: 'Local SEO', catSlug: 'local-seo', tags: ['local SEO','Google Maps','local search','Google Business Profile'], date: 'Dec 10, 2026', readTime: '6 min', bg: 'bb-local', icon: 'fa-map-location-dot' },
  { id: 3,  slug: 'what-makes-a-business-website-convert-visitors-into-customers', title: 'What Makes a Business Website Convert Visitors Into Customers?', excerpt: 'Explore the design, usability, content, and conversion elements behind effective business websites that turn traffic into real revenue.', category: 'Web Design', catSlug: 'web-design', tags: ['web design','conversion','UX','CRO','website'], date: 'Dec 5, 2026', readTime: '7 min', bg: 'bb-web', icon: 'fa-code' },
  { id: 4,  slug: 'building-a-digital-marketing-strategy-for-a-growing-business', title: 'Building a Digital Marketing Strategy for a Growing Business', excerpt: 'A practical framework for connecting marketing channels with business objectives — from content and SEO to social and paid campaigns.', category: 'Digital Marketing', catSlug: 'digital-marketing', tags: ['digital marketing','strategy','SEO','content','social media'], date: 'Nov 28, 2026', readTime: '9 min', bg: 'bb-mkt', icon: 'fa-chart-line' },
  { id: 5,  slug: 'why-consistent-branding-matters-in-the-digital-age', title: 'Why Consistent Branding Matters in the Digital Age', excerpt: 'Understand how a consistent visual identity can strengthen recognition, build trust, and differentiate your business in a crowded digital market.', category: 'Branding', catSlug: 'branding', tags: ['branding','visual identity','logo','brand strategy'], date: 'Nov 22, 2026', readTime: '5 min', bg: 'bb-brand', icon: 'fa-palette' },
  { id: 6,  slug: 'from-digital-presence-to-digital-growth-what-the-difference-means', title: 'From Digital Presence to Digital Growth: What the Difference Means', excerpt: 'Explore how websites, SEO, marketing, automation, and analytics can work together to move beyond simply being visible online.', category: 'Business Growth', catSlug: 'business-growth', tags: ['business growth','digital strategy','online presence'], date: 'Nov 18, 2026', readTime: '8 min', bg: 'bb-growth', icon: 'fa-seedling' },
  { id: 7,  slug: 'the-complete-guide-to-on-page-seo-for-business-websites', title: 'The Complete Guide to On-Page SEO for Business Websites', excerpt: 'A comprehensive walkthrough of the on-page SEO elements every business website needs to improve search rankings and attract qualified organic traffic.', category: 'SEO', catSlug: 'seo', tags: ['SEO','on-page SEO','meta tags','content optimization'], date: 'Nov 14, 2026', readTime: '11 min', bg: 'bb-seo', icon: 'fa-magnifying-glass' },
  { id: 8,  slug: 'ai-chatbots-how-businesses-are-using-them-to-improve-customer-service', title: 'AI Chatbots: How Businesses Are Using Them to Improve Customer Service', excerpt: 'A practical look at how AI chatbots help businesses handle customer inquiries faster, reduce support costs, and improve response quality.', category: 'AI & Automation', catSlug: 'ai-automation', tags: ['AI','chatbots','customer service','automation'], date: 'Nov 10, 2026', readTime: '7 min', bg: 'bb-ai', icon: 'fa-robot' },
  { id: 9,  slug: 'mobile-first-design-why-it-matters-more-than-ever-for-your-business', title: "Mobile-First Design: Why It Matters More Than Ever for Your Business", excerpt: "With over 60% of web traffic coming from mobile devices, your website's mobile experience isn't optional — it's the primary experience.", category: 'Web Design', catSlug: 'web-design', tags: ['mobile design','responsive','UX','mobile-first'], date: 'Nov 6, 2026', readTime: '6 min', bg: 'bb-web', icon: 'fa-mobile-alt' },
  { id: 10, slug: 'google-business-profile-optimization-a-step-by-step-guide', title: 'Google Business Profile Optimization: A Step-by-Step Guide', excerpt: 'Learn how to fully optimize your Google Business Profile to improve local search visibility, attract more calls, and generate more customer reviews.', category: 'Local SEO', catSlug: 'local-seo', tags: ['Google Business Profile','GMB','local SEO','Google Maps'], date: 'Oct 30, 2026', readTime: '8 min', bg: 'bb-local', icon: 'fa-location-pin' },
  { id: 11, slug: 'content-marketing-strategies-that-drive-real-business-results', title: 'Content Marketing Strategies That Drive Real Business Results', excerpt: "Practical approaches to content marketing that generate leads, build authority, and support long-term SEO — without producing content for content's sake.", category: 'Digital Marketing', catSlug: 'digital-marketing', tags: ['content marketing','SEO','lead generation','blog'], date: 'Oct 24, 2026', readTime: '8 min', bg: 'bb-mkt', icon: 'fa-pen-to-square' },
  { id: 12, slug: 'the-technology-stack-every-modern-business-website-needs', title: 'The Technology Stack Every Modern Business Website Needs', excerpt: 'From CMS and hosting to analytics and automation tools — understand the core technology decisions behind a high-performing business website.', category: 'Technology', catSlug: 'technology', tags: ['tech stack','CMS','website','tools','hosting'], date: 'Oct 18, 2026', readTime: '7 min', bg: 'bb-tech', icon: 'fa-server' },
  { id: 13, slug: 'brand-guidelines-why-your-business-needs-them-and-what-to-include', title: 'Brand Guidelines: Why Your Business Needs Them and What to Include', excerpt: 'Brand guidelines are the foundation of consistent communication. Learn what to include and why they matter for businesses of every size.', category: 'Branding', catSlug: 'branding', tags: ['brand guidelines','branding','visual identity'], date: 'Oct 12, 2026', readTime: '6 min', bg: 'bb-brand', icon: 'fa-swatchbook' },
  { id: 14, slug: 'how-to-build-a-lead-generation-system-that-scales-with-your-business', title: 'How to Build a Lead Generation System That Scales With Your Business', excerpt: 'Explore the components of an effective digital lead generation system — from landing pages and CTAs to email automation and conversion tracking.', category: 'Business Growth', catSlug: 'business-growth', tags: ['lead generation','CRO','email marketing','automation'], date: 'Oct 6, 2026', readTime: '9 min', bg: 'bb-growth', icon: 'fa-funnel-dollar' },
  { id: 15, slug: 'local-vs-national-seo-which-strategy-does-your-business-need', title: 'Local vs. National SEO: Which Strategy Does Your Business Need?', excerpt: 'Understand the key differences between local and national SEO strategies and how to determine the right approach for your business goals.', category: 'SEO', catSlug: 'seo', tags: ['local SEO','national SEO','SEO strategy','keywords'], date: 'Sep 30, 2026', readTime: '7 min', bg: 'bb-seo', icon: 'fa-globe' },
  { id: 16, slug: 'marketing-automation-how-to-grow-faster-while-spending-less-time', title: 'Marketing Automation: How to Grow Faster While Spending Less Time', excerpt: 'Discover which marketing workflows are worth automating, which tools to use, and how to implement automation without losing the human touch.', category: 'AI & Automation', catSlug: 'ai-automation', tags: ['marketing automation','email','CRM','workflows'], date: 'Sep 22, 2026', readTime: '8 min', bg: 'bb-ai', icon: 'fa-gears' },
  { id: 17, slug: 'digital-transformation-trends-reshaping-us-businesses-in-2025', title: 'Digital Transformation Trends Reshaping US Businesses in 2025', excerpt: 'An overview of the key digital transformation trends that US businesses need to understand as they plan their digital strategy for the year ahead.', category: 'Industry Insights', catSlug: 'industry-insights', tags: ['digital transformation','trends','AI','technology','2025'], date: 'Sep 15, 2026', readTime: '10 min', bg: 'bb-insight', icon: 'fa-chart-bar' },
  { id: 18, slug: 'how-a-healthcare-practice-improved-local-visibility-with-digital-strategy', title: 'How a Healthcare Practice Improved Local Visibility With Digital Strategy', excerpt: 'A look at how a local medical practice used website optimization, local SEO, and reputation management to significantly improve patient discovery.', category: 'Case Studies', catSlug: 'case-studies', tags: ['case study','healthcare','local SEO','website'], date: 'Sep 8, 2026', readTime: '6 min', bg: 'bb-case', icon: 'fa-stethoscope' },
  { id: 19, slug: 'web-development-best-practices-for-business-websites-in-2025', title: 'Web Development Best Practices for Business Websites in 2025', excerpt: 'From performance optimization and accessibility to security and scalability — the development standards every business website should meet.', category: 'Web Development', catSlug: 'web-development', tags: ['web development','performance','accessibility','security'], date: 'Sep 2, 2026', readTime: '9 min', bg: 'bb-dev', icon: 'fa-laptop-code' },
]

const CATS = [
  { label: 'All', slug: 'all' },
  { label: 'Digital Marketing', slug: 'digital-marketing' },
  { label: 'Web Design', slug: 'web-design' },
  { label: 'Web Development', slug: 'web-development' },
  { label: 'SEO', slug: 'seo' },
  { label: 'Local SEO', slug: 'local-seo' },
  { label: 'Branding', slug: 'branding' },
  { label: 'AI & Automation', slug: 'ai-automation' },
  { label: 'Business Growth', slug: 'business-growth' },
  { label: 'Technology', slug: 'technology' },
  { label: 'Case Studies', slug: 'case-studies' },
  { label: 'Industry Insights', slug: 'industry-insights' },
]

const PER_PAGE = 9

export default function BlogInteractive() {
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    return ARTICLES.filter(a => {
      const matchCat = category === 'all' || a.catSlug === category
      const q = search.toLowerCase().trim()
      const matchQ = !q || [a.title, a.excerpt, a.category, ...a.tags].some(s => s.toLowerCase().includes(q))
      return matchCat && matchQ
    })
  }, [category, search])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const currentPage = Math.min(page, totalPages)
  const slice = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE)

  const handleCat = (slug: string) => { setCategory(slug); setPage(1) }
  const handleSearch = (val: string) => { setSearch(val); setPage(1) }

  return (
    <>
      {/* SEARCH */}
      <section className="blg-search-sect">
        <div className="container">
          <span className="blg-search-label">Search Articles</span>
          <div className="blg-search-field">
            <i className="fas fa-search blg-search-icon"></i>
            <input
              type="text"
              className="blg-search-input"
              placeholder="Search articles, topics, strategies..."
              value={search}
              onChange={e => handleSearch(e.target.value)}
              autoComplete="off"
              aria-label="Search articles"
            />
            {search && (
              <button className="blg-search-clear" onClick={() => handleSearch('')} aria-label="Clear search">
                <i className="fas fa-times"></i> Clear
              </button>
            )}
          </div>
          {(search || category !== 'all') && (
            <p className="blg-search-count">
              {filtered.length > 0
                ? <><strong>{filtered.length}</strong> article{filtered.length === 1 ? '' : 's'} found</>
                : 'No articles found'}
            </p>
          )}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="blg-cats-sect">
        <div className="container">
          <div className="blg-cats-wrap" role="navigation" aria-label="Filter by category">
            {CATS.map(c => (
              <button
                key={c.slug}
                className={`blg-cat-pill${category === c.slug ? ' active' : ''}`}
                onClick={() => handleCat(c.slug)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST INSIGHTS */}
      <section className="blg-latest" id="latest">
        <div className="container">
          <div className="blg-latest-head">
            <div>
              <h2>Latest <em>Insights</em></h2>
              <p>Practical ideas, strategies, and perspectives to help your business navigate the digital landscape.</p>
            </div>
          </div>

          {slice.length === 0 ? (
            <div className="blg-empty">
              <div className="blg-empty-icon"><i className="fas fa-file-circle-xmark"></i></div>
              <h3>No Articles Found</h3>
              <p>We couldn&rsquo;t find any articles matching your search or filter.<br />Try a different keyword or explore another category.</p>
              <button className="btn btn-primary" onClick={() => { setCategory('all'); setSearch(''); setPage(1) }}>
                View All Articles <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          ) : (
            <div className="blog-grid">
              {slice.map(a => (
                <div key={a.id} className="blog-card">
                  <div className={`blog-thumb ${a.bg}`} style={{ fontSize: '2.4rem' }}>
                    <i className={`fas ${a.icon}`}></i>
                  </div>
                  <div className="blog-body">
                    <span className="blog-cat">{a.category}</span>
                    <h3>{a.title}</h3>
                    <p>{a.excerpt}</p>
                    <div className="blog-meta">
                      <span><i className="fas fa-calendar" style={{ fontSize: '0.7rem', color: 'var(--orange)', marginRight: '4px' }}></i>{a.date}</span>
                      <Link href={`/blog/${a.slug}`} className="blog-read"><i className="fas fa-clock" style={{ fontSize: '0.7rem' }}></i> {a.readTime} <i className="fas fa-arrow-right"></i></Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="blg-pagination" role="navigation" aria-label="Article pagination">
              <button className="blg-page-btn blg-page-nav" onClick={() => setPage(p => p - 1)} disabled={currentPage === 1}>
                <i className="fas fa-chevron-left"></i> Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button key={n} className={`blg-page-btn${n === currentPage ? ' active' : ''}`} onClick={() => setPage(n)} aria-label={`Page ${n}`}>{n}</button>
              ))}
              <button className="blg-page-btn blg-page-nav" onClick={() => setPage(p => p + 1)} disabled={currentPage === totalPages}>
                Next <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
