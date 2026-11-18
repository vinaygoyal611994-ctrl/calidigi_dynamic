import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CITIES, getCityBySlug } from '@/lib/cityData'
import { BLOG_ARTICLES } from '@/lib/blogData'

export function generateStaticParams() {
  return CITIES.map(c => ({ city: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>
}): Promise<Metadata> {
  const { city } = await params
  const data = getCityBySlug(city)
  if (!data) return { title: 'Location Not Found' }
  const url = `https://www.calidigi.com/locations/${data.slug}`
  return {
    title: { absolute: data.metaTitle },
    description: data.metaDescription,
    alternates: { canonical: url, languages: { 'en-US': url, 'x-default': url } },
    openGraph: { url, title: data.metaTitle, description: data.metaDescription },
    twitter: { title: data.metaTitle, description: data.metaDescription },
  }
}

const SERVICE_COLORS: Record<string, string> = {
  'local-seo':       'linear-gradient(135deg,#0d9488,#0f766e)',
  'web-development': 'linear-gradient(135deg,#1e3a5f,#2563EB)',
  'digital-marketing':'linear-gradient(135deg,#2563EB,#1D4ED8)',
  'ai-automation':   'linear-gradient(135deg,#7c3aed,#4f46e5)',
  'branding':        'linear-gradient(135deg,#ec4899,#f97316)',
  'business-growth': 'linear-gradient(135deg,#16a34a,#15803d)',
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>
}) {
  const { city } = await params
  const data = getCityBySlug(city)
  if (!data) notFound()

  const url = `https://www.calidigi.com/locations/${data.slug}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': `${url}#localbusiness`,
        name: `Calidigi — Digital Marketing Agency ${data.name}`,
        description: data.metaDescription,
        url,
        areaServed: { '@type': 'City', name: data.name, addressRegion: 'CA', addressCountry: 'US' },
        parentOrganization: { '@id': 'https://www.calidigi.com/#organization' },
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: data.metaTitle,
        isPartOf: { '@id': 'https://www.calidigi.com/#website' },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.calidigi.com/' },
            { '@type': 'ListItem', position: 2, name: 'Locations', item: 'https://www.calidigi.com/locations' },
            { '@type': 'ListItem', position: 3, name: data.name, item: url },
          ],
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: data.faqs.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  }

  const relatedBlogs = BLOG_ARTICLES.filter(a => data.blogSlugs.includes(a.slug)).slice(0, 3)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ══════════════════════════════════
          1. HERO
      ══════════════════════════════════ */}
      <section className="loc-hero">
        <div className="loc-hero-glow"></div>
        <div className="loc-hero-glow-2"></div>
        <div className="loc-hero-dots"></div>
        <div className="container loc-hero-inner">

          {/* LEFT */}
          <div className="loc-hero-content">
            <h1 className="sr-only">{data.h1}</h1>
            <div className="loc-hero-eyebrow">
              <span className="loc-hero-pin"><i className="fas fa-location-dot"></i></span>
              <span>{data.heroBadge}</span>
            </div>
            <h2>
              {data.heroHeading.split('\n').map((line, i) =>
                i === 0
                  ? <span key={i}>{line}<br /></span>
                  : <em key={i}>{line}</em>
              )}
            </h2>
            <p className="loc-hero-desc">{data.heroDesc}</p>

            <div className="loc-hero-actions">
              <Link href="/contact-us" className="btn btn-primary btn-lg">
                Get a Free Audit <i className="fas fa-arrow-right"></i>
              </Link>
              <Link href="/services" className="btn btn-outline-white">
                Our Services
              </Link>
            </div>

            <div className="loc-hero-trust">
              <div className="loc-ht-item"><i className="fas fa-check-circle"></i><span>Free audit — no commitment</span></div>
              <div className="loc-ht-item"><i className="fas fa-check-circle"></i><span>California-based team</span></div>
              <div className="loc-ht-item"><i className="fas fa-check-circle"></i><span>Response in 8 hours</span></div>
            </div>
          </div>

          {/* RIGHT — City Card */}
          <div className="loc-hero-visual">
            <div className="loc-city-card">
              <div className="loc-city-card-header">
                <div className="loc-city-badge">
                  <i className="fas fa-city"></i>
                </div>
                <div>
                  <div className="loc-city-name">{data.name}</div>
                  <div className="loc-city-state">{data.state}</div>
                </div>
              </div>

              <div className="loc-city-metrics">
                {data.heroStats.slice(0, 3).map(s => (
                  <div key={s.label} className="loc-city-metric">
                    <strong>{s.num}</strong>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>

              <div className="loc-city-info-rows">
                <div className="loc-city-info-row">
                  <span className="loc-cir-label"><i className="fas fa-bolt"></i> Results Timeline</span>
                  <span className="loc-cir-val loc-cir-orange">{data.timeline}</span>
                </div>
                <div className="loc-city-info-row">
                  <span className="loc-cir-label"><i className="fas fa-chart-bar"></i> Competition Level</span>
                  <span className="loc-cir-val">{data.competitionLabel}</span>
                </div>
              </div>

              <div className="loc-city-services-list">
                {data.services.map(svc => (
                  <div key={svc.slug} className="loc-city-svc-item">
                    <i className="fas fa-check"></i>
                    <span>{svc.title}</span>
                  </div>
                ))}
              </div>

              <Link href="/contact-us" className="loc-city-cta-btn">
                Get Free {data.name} Audit <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          BREADCRUMB
      ══════════════════════════════════ */}
      <div className="sd-breadcrumb">
        <div className="container">
          <nav aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <i className="fas fa-chevron-right"></i>
            <Link href="/locations">Locations</Link>
            <i className="fas fa-chevron-right"></i>
            <span>{data.name}</span>
          </nav>
        </div>
      </div>

      {/* ══════════════════════════════════
          2. TRUST STRIP
      ══════════════════════════════════ */}
      <section className="loc-trust">
        <div className="container loc-trust-inner">
          <div className="loc-trust-item">
            <i className="fas fa-users"></i>
            <strong>150+</strong>
            <span>CA Businesses Helped</span>
          </div>
          <div className="loc-trust-divider"></div>
          <div className="loc-trust-item">
            <i className="fas fa-map-location-dot"></i>
            <strong>100+</strong>
            <span>CA Cities Served</span>
          </div>
          <div className="loc-trust-divider"></div>
          <div className="loc-trust-item">
            <i className="fas fa-star"></i>
            <strong>4.9★</strong>
            <span>Client Rating</span>
          </div>
          <div className="loc-trust-divider"></div>
          <div className="loc-trust-item">
            <i className="fas fa-chart-line"></i>
            <strong>3×</strong>
            <span>More Map Pack Clicks</span>
          </div>
          <div className="loc-trust-divider"></div>
          <div className="loc-trust-item">
            <i className="fas fa-bolt"></i>
            <strong>{data.timeline}</strong>
            <span>First Results in {data.name}</span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          3. MARKET SECTION
      ══════════════════════════════════ */}
      <section className="loc-market">
        <div className="container loc-market-inner">
          <div className="loc-market-content">
            <div className="badge badge-orange">
              <i className="fas fa-map-location-dot"></i> {data.name} Market
            </div>
            <h2>{data.marketHeading}</h2>
            <p>{data.about}</p>
            <Link href="/contact-us" className="btn btn-primary" style={{ marginTop: '24px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              Start Growing in {data.name} <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
          <div className="loc-market-visual">
            <div className="loc-market-card">
              <div className="loc-mc-title">
                <i className="fas fa-industry"></i> Top Industries in {data.name}
              </div>
              <div className="loc-mc-industries">
                {data.topIndustries.map((ind, i) => (
                  <div key={ind} className="loc-mc-ind">
                    <span className="loc-mc-num">{String(i + 1).padStart(2, '0')}</span>
                    <span>{ind}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          4. SERVICES
      ══════════════════════════════════ */}
      <section className="loc-services">
        <div className="container">
          <div className="section-head">
            <div className="badge badge-orange"><i className="fas fa-list-check"></i> Our Services in {data.name}</div>
            <h2>{data.servicesHeading}</h2>
            <p>{data.servicesSub}</p>
          </div>
          <div className="loc-services-grid">
            {data.services.map(svc => (
              <Link
                key={svc.slug}
                href={`/services/${svc.slug}`}
                className="loc-svc-card"
              >
                <div
                  className="loc-svc-icon"
                  style={{ background: SERVICE_COLORS[svc.slug] ?? 'linear-gradient(135deg,#2563EB,#1D4ED8)' }}
                >
                  <i className={`fas ${svc.icon}`}></i>
                </div>
                <div className="loc-svc-body">
                  <h3>{svc.title}</h3>
                  <p>{svc.desc}</p>
                </div>
                <div className="loc-svc-footer">
                  <span>Learn More</span>
                  <i className="fas fa-arrow-right"></i>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          5. RESULTS STRIP
      ══════════════════════════════════ */}
      <section className="loc-results">
        <div className="loc-results-glow"></div>
        <div className="container">
          <div className="loc-results-head">
            <div className="badge badge-white"><i className="fas fa-chart-line"></i> Real Results</div>
            <h2>Real Results for {data.name} Businesses</h2>
          </div>
          <div className="loc-results-grid">
            <div className="loc-result-card">
              <div className="loc-result-icon"><i className="fas fa-map-location-dot"></i></div>
              <div className="loc-result-num">3×</div>
              <div className="loc-result-label">More Google Maps Clicks</div>
              <p>Businesses that rank in the Local Pack get up to 3x more calls and direction requests than those below it.</p>
            </div>
            <div className="loc-result-card">
              <div className="loc-result-icon"><i className="fas fa-bolt"></i></div>
              <div className="loc-result-num">{data.timeline}</div>
              <div className="loc-result-label">First Results in {data.name}</div>
              <p>Most {data.name} businesses see measurable Map Pack improvement within {data.timeline.toLowerCase()} of consistent local SEO work.</p>
            </div>
            <div className="loc-result-card">
              <div className="loc-result-icon"><i className="fas fa-star"></i></div>
              <div className="loc-result-num">4.9★</div>
              <div className="loc-result-label">Average Client Rating</div>
              <p>California businesses consistently rate Calidigi 4.9/5 for results delivered, communication, and strategic value.</p>
            </div>
            <div className="loc-result-card">
              <div className="loc-result-icon"><i className="fas fa-users"></i></div>
              <div className="loc-result-num">150+</div>
              <div className="loc-result-label">California Businesses Helped</div>
              <p>From {data.name} startups to established California enterprises — we have built digital growth engines across every major industry.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          6. WHY CALIDIGI
      ══════════════════════════════════ */}
      <section className="loc-why">
        <div className="container">
          <div className="loc-why-inner">
            <div className="loc-why-left">
              <div className="badge badge-orange"><i className="fas fa-trophy"></i> Why Calidigi</div>
              <h2>{data.whyHeading}</h2>
              <p>{data.whySub}</p>
              <div className="loc-why-checklist">
                <div className="loc-wc-item"><i className="fas fa-check-circle"></i> Free local SEO audit — no obligation</div>
                <div className="loc-wc-item"><i className="fas fa-check-circle"></i> {data.name}-specific keyword & competitor research</div>
                <div className="loc-wc-item"><i className="fas fa-check-circle"></i> Monthly reporting tied to real business outcomes</div>
                <div className="loc-wc-item"><i className="fas fa-check-circle"></i> No lock-in contracts — results keep us</div>
                <div className="loc-wc-item"><i className="fas fa-check-circle"></i> California-based team, {data.name} market expertise</div>
              </div>
              <Link href="/contact-us" className="btn btn-primary" style={{ marginTop: '32px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                Talk to Our Team <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
            <div className="loc-why-right">
              {data.whyPoints.map(pt => (
                <div key={pt.heading} className="loc-why-card">
                  <div className="loc-why-icon">
                    <i className={`fas ${pt.icon}`}></i>
                  </div>
                  <div>
                    <h3>{pt.heading}</h3>
                    <p>{pt.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          7. PROCESS
      ══════════════════════════════════ */}
      <section className="loc-process">
        <div className="container">
          <div className="section-head">
            <div className="badge badge-orange"><i className="fas fa-route"></i> Our Process</div>
            <h2>How We Grow Your <em className="text-orange">{data.name}</em> Business</h2>
            <p>A clear 4-step process from first conversation to measurable results — no vague deliverables, no guesswork.</p>
          </div>
          <div className="loc-process-steps">
            <div className="loc-process-step">
              <div className="loc-ps-num">01</div>
              <div className="loc-ps-icon"><i className="fas fa-magnifying-glass-chart"></i></div>
              <h3>Free Audit</h3>
              <p>We analyze your current {data.name} local search position, GBP, citations, reviews, and competitors — before recommending anything.</p>
            </div>
            <div className="loc-process-arrow"><i className="fas fa-chevron-right"></i></div>
            <div className="loc-process-step">
              <div className="loc-ps-num">02</div>
              <div className="loc-ps-icon"><i className="fas fa-map"></i></div>
              <h3>Strategy</h3>
              <p>Build a {data.name}-specific keyword map and prioritized action plan based on your service area, competition level, and goals.</p>
            </div>
            <div className="loc-process-arrow"><i className="fas fa-chevron-right"></i></div>
            <div className="loc-process-step">
              <div className="loc-ps-num">03</div>
              <div className="loc-ps-icon"><i className="fas fa-gears"></i></div>
              <h3>Execute</h3>
              <p>Optimize GBP, build citations, generate reviews, create local content, and launch campaigns — hands-on implementation, not just advice.</p>
            </div>
            <div className="loc-process-arrow"><i className="fas fa-chevron-right"></i></div>
            <div className="loc-process-step">
              <div className="loc-ps-num">04</div>
              <div className="loc-ps-icon"><i className="fas fa-chart-line"></i></div>
              <h3>Grow</h3>
              <p>Track rankings, calls, and leads monthly. Expand to new neighborhoods and compound your {data.name} local authority over time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          8. FAQ
      ══════════════════════════════════ */}
      <section className="loc-faq">
        <div className="container">
          <div className="section-head">
            <div className="badge badge-orange"><i className="fas fa-circle-question"></i> FAQ</div>
            <h2>Common Questions About Digital Marketing in <em className="text-orange">{data.name}</em></h2>
          </div>
          <div className="loc-faq-grid">
            {data.faqs.map((f, i) => (
              <div key={f.q} className="loc-faq-card">
                <div className="loc-faq-num">{String(i + 1).padStart(2, '0')}</div>
                <h4>{f.q}</h4>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          9. BLOG RESOURCES
      ══════════════════════════════════ */}
      {relatedBlogs.length > 0 && (
        <section className="loc-blog">
          <div className="container">
            <div className="section-head">
              <div className="badge badge-orange"><i className="fas fa-book-open"></i> Expert Insights</div>
              <h2>Free Guides for <em className="text-orange">{data.name}</em> Businesses</h2>
              <p>Practical digital marketing guides built specifically for the {data.name} market.</p>
            </div>
            <div className="loc-blog-grid">
              {relatedBlogs.map(b => (
                <Link key={b.slug} href={`/blog/${b.slug}`} className="loc-blog-card">
                  <div className={`loc-blog-thumb ${b.bg}`}>
                    <i className={`fas ${b.icon}`}></i>
                  </div>
                  <div className="loc-blog-body">
                    <span className="loc-blog-cat">{b.category}</span>
                    <h3>{b.title}</h3>
                    <p>{b.excerpt.slice(0, 100)}…</p>
                    <span className="loc-blog-link">Read Article <i className="fas fa-arrow-right"></i></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════
          10. CTA
      ══════════════════════════════════ */}
      <section className="loc-cta" id="contact">
        <div className="loc-cta-glow"></div>
        <div className="container">
          <div className="loc-cta-inner">
            <div className="badge badge-white"><i className="fas fa-comments"></i> Ready to Grow?</div>
            <h2>{data.ctaHeading.includes('?')
              ? <>{data.ctaHeading.split('?')[0]}?<br /><em>Let&apos;s Build a Plan.</em></>
              : <>{data.ctaHeading}<br /><em>Let&apos;s Talk.</em></>
            }</h2>
            <p>{data.ctaDesc}</p>
            <div className="loc-cta-btns">
              <Link href="/contact-us" className="btn btn-primary btn-lg">
                Get a Free {data.name} Audit <i className="fas fa-arrow-right"></i>
              </Link>
              <Link href="/services" className="btn btn-outline-white">
                View All Services
              </Link>
            </div>
            <div className="loc-cta-proof">
              <div className="loc-cta-proof-item"><i className="fas fa-check-circle"></i><span>Free audit — zero pressure</span></div>
              <div className="loc-cta-proof-item"><i className="fas fa-check-circle"></i><span>California-based team</span></div>
              <div className="loc-cta-proof-item"><i className="fas fa-check-circle"></i><span>Response within 8 hours</span></div>
              <div className="loc-cta-proof-item"><i className="fas fa-check-circle"></i><span>No lock-in contracts</span></div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
