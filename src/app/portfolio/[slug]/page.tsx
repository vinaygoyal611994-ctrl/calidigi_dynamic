import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CASE_STUDIES, getCaseStudyBySlug } from '@/lib/caseStudyData'

export function generateStaticParams() {
  return CASE_STUDIES.map(cs => ({ slug: cs.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const cs = getCaseStudyBySlug(slug)
  if (!cs) return { title: 'Case Study Not Found' }
  const url = `https://www.calidigi.com/portfolio/${cs.slug}`
  return {
    title: { absolute: cs.metaTitle },
    description: cs.metaDescription,
    alternates: { canonical: url },
    openGraph: { url, title: cs.metaTitle, description: cs.metaDescription },
    twitter: { title: cs.metaTitle, description: cs.metaDescription },
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const cs = getCaseStudyBySlug(slug)
  if (!cs) notFound()

  const related = CASE_STUDIES.filter(s => cs.relatedSlugs.includes(s.slug))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `https://www.calidigi.com/portfolio/${cs.slug}#webpage`,
        url: `https://www.calidigi.com/portfolio/${cs.slug}`,
        name: cs.metaTitle,
        description: cs.metaDescription,
        isPartOf: { '@id': 'https://www.calidigi.com/#website' },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.calidigi.com/' },
            { '@type': 'ListItem', position: 2, name: 'Portfolio', item: 'https://www.calidigi.com/portfolio' },
            { '@type': 'ListItem', position: 3, name: cs.title, item: `https://www.calidigi.com/portfolio/${cs.slug}` },
          ],
        },
      },
      {
        '@type': 'Article',
        '@id': `https://www.calidigi.com/portfolio/${cs.slug}#article`,
        headline: cs.title,
        description: cs.metaDescription,
        url: `https://www.calidigi.com/portfolio/${cs.slug}`,
        author: { '@type': 'Organization', name: 'Calidigi', '@id': 'https://www.calidigi.com/#organization' },
        publisher: { '@id': 'https://www.calidigi.com/#organization' },
        about: cs.services.map(s => ({ '@type': 'Thing', name: s })),
        locationCreated: { '@type': 'Place', name: cs.location },
        keywords: cs.services.join(', '),
        inLanguage: 'en-US',
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── BREADCRUMB ── */}
      <nav className="cs-breadcrumb" aria-label="Breadcrumb">
        <div className="container">
          <ol className="cs-bc-list">
            <li><Link href="/">Home</Link></li>
            <li><i className="fas fa-chevron-right"></i></li>
            <li><Link href="/portfolio">Portfolio</Link></li>
            <li><i className="fas fa-chevron-right"></i></li>
            <li aria-current="page">{cs.catLabel}</li>
          </ol>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="cs-hero">
        <div className={`cs-hero-bg ${cs.bg}`}></div>
        <div className="cs-hero-overlay"></div>
        <div className="container cs-hero-inner">
          <div className="cs-hero-content">
            <div className="cs-hero-cat">
              <i className={`fas ${cs.icon}`}></i> {cs.catLabel}
            </div>
            <h1 className="cs-hero-title">{cs.title}</h1>
            <p className="cs-hero-location"><i className="fas fa-map-marker-alt"></i> {cs.location}</p>
            <div className="cs-hero-services">
              {cs.services.map(s => (
                <span key={s} className="cs-service-tag">{s}</span>
              ))}
            </div>
          </div>
          <div className="cs-hero-stats">
            {cs.heroStats.map(stat => (
              <div key={stat.l} className="cs-stat-card">
                <span className="cs-stat-n">{stat.n}</span>
                <span className="cs-stat-l">{stat.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHALLENGE & SOLUTION ── */}
      <section className="cs-challenge-solution">
        <div className="container cs-cs-grid">
          <div className="cs-block cs-challenge">
            <div className="cs-block-icon"><i className="fas fa-triangle-exclamation"></i></div>
            <h2>The Challenge</h2>
            <p>{cs.challenge}</p>
          </div>
          <div className="cs-block cs-solution">
            <div className="cs-block-icon"><i className="fas fa-lightbulb"></i></div>
            <h2>Our Solution</h2>
            <p>{cs.solution}</p>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="cs-process">
        <div className="container">
          <div className="cs-section-head">
            <div className="badge badge-orange"><i className="fas fa-route"></i> Our Approach</div>
            <h2>How We Did It</h2>
          </div>
          <div className="cs-process-steps">
            {cs.process.map(step => (
              <div key={step.n} className="cs-step">
                <div className="cs-step-num">{step.n}</div>
                <div className="cs-step-body">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESULTS ── */}
      <section className="cs-results">
        <div className="container">
          <div className="cs-section-head cs-section-head--light">
            <div className="badge badge-white"><i className="fas fa-chart-line"></i> Measurable Impact</div>
            <h2>The Results</h2>
          </div>
          <div className="cs-results-grid">
            {cs.results.map(r => (
              <div key={r.l} className="cs-result-card">
                <span className="cs-result-n">{r.n}</span>
                <span className="cs-result-l">{r.l}</span>
                <p className="cs-result-desc">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      <section className="cs-testimonial">
        <div className="container">
          <div className="cs-testimonial-card">
            <div className="cs-testimonial-quote-mark"><i className="fas fa-quote-left"></i></div>
            <blockquote className="cs-testimonial-text">&ldquo;{cs.testimonial.quote}&rdquo;</blockquote>
            <div className="cs-testimonial-author">
              <div className="cs-testimonial-avatar">
                <i className="fas fa-user-circle"></i>
              </div>
              <div>
                <strong>{cs.testimonial.name}</strong>
                <span>{cs.testimonial.role}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── RELATED CASE STUDIES ── */}
      {related.length > 0 && (
        <section className="cs-related">
          <div className="container">
            <div className="cs-section-head">
              <h2>Related Case Studies</h2>
            </div>
            <div className="cs-related-grid">
              {related.map(r => (
                <Link key={r.slug} href={`/portfolio/${r.slug}`} className="cs-related-card">
                  <div className={`cs-related-bg ${r.bg}`}></div>
                  <div className="cs-related-overlay"></div>
                  <div className="cs-related-body">
                    <div className="cs-related-cat">
                      <i className={`fas ${r.icon}`}></i> {r.catLabel}
                    </div>
                    <h3>{r.title}</h3>
                    <div className="cs-related-stats">
                      {r.heroStats.slice(0, 2).map(s => (
                        <span key={s.l} className="cs-related-stat"><strong>{s.n}</strong> {s.l}</span>
                      ))}
                    </div>
                    <span className="cs-related-link">View Case Study <i className="fas fa-arrow-right"></i></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="cs-cta">
        <div className="cs-cta-glow"></div>
        <div className="container">
          <div className="cs-cta-inner">
            <div className="badge badge-white" style={{ marginBottom: '20px' }}>
              <i className="fas fa-rocket"></i> Start Your Project
            </div>
            <h2>Ready to Transform<br /><em>Your Business?</em></h2>
            <p>Let&rsquo;s discuss how Calidigi can deliver results like these for your industry — with a custom strategy built around your goals.</p>
            <div className="cs-cta-btns">
              <Link href="/contact-us" className="btn btn-primary">Get a Free Consultation <i className="fas fa-arrow-right"></i></Link>
              <Link href="/portfolio" className="btn btn-outline-white">See All Case Studies</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
