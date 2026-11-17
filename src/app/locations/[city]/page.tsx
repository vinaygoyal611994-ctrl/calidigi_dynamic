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
    alternates: {
      canonical: url,
      languages: { 'en-US': url, 'x-default': url },
    },
    openGraph: {
      url,
      title: data.metaTitle,
      description: data.metaDescription,
    },
    twitter: {
      title: data.metaTitle,
      description: data.metaDescription,
    },
  }
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

      {/* ── HERO ── */}
      <section className="loc-hero">
        <div className="loc-hero-glow"></div>
        <div className="loc-hero-glow-2"></div>
        <div className="container loc-hero-inner">
          <div className="loc-hero-content">
            <h1 className="sr-only">{data.h1}</h1>
            <div className="badge badge-white">
              <i className="fas fa-location-dot"></i> {data.heroBadge}
            </div>
            <h2>
              {data.heroHeading.split('\n').map((line, i) => (
                i === 0 ? <span key={i}>{line}<br /></span> : <em key={i}>{line}</em>
              ))}
            </h2>
            <p className="loc-hero-sub">{data.heroSub}</p>
            <p>{data.heroDesc}</p>
            <div className="loc-hero-actions">
              <Link href="/contact-us" className="btn btn-primary">
                Get a Free Audit <i className="fas fa-arrow-right"></i>
              </Link>
              <Link href="/services" className="btn btn-outline-white">
                Our Services
              </Link>
            </div>
            <div className="loc-hero-stats">
              {data.heroStats.map(s => (
                <div key={s.label} className="loc-hero-stat">
                  <strong>{s.num}</strong><span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="loc-hero-visual">
            <div className="loc-city-card">
              <div className="loc-city-icon">
                <i className="fas fa-city"></i>
              </div>
              <h3>{data.name}, {data.state}</h3>
              <p className="loc-city-sub">{data.heroSub}</p>
              <div className="loc-city-industries">
                <span className="loc-ind-label">Key Industries</span>
                <div className="loc-ind-tags">
                  {data.topIndustries.slice(0, 6).map(ind => (
                    <span key={ind} className="loc-ind-tag">{ind}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BREADCRUMB ── */}
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

      {/* ── ABOUT ── */}
      <section className="loc-about">
        <div className="container">
          <div className="loc-about-inner">
            <div className="badge badge-orange"><i className="fas fa-map-location-dot"></i> {data.name} Market</div>
            <h2>Why <em className="text-orange">{data.name}</em> Businesses Need Strong Digital Marketing</h2>
            <p className="loc-about-text">{data.about}</p>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="sd-features">
        <div className="container">
          <div className="section-head">
            <div className="badge badge-orange"><i className="fas fa-list-check"></i> Our Services in {data.name}</div>
            <h2>Everything We Do for <em className="text-orange">{data.name}</em> Businesses</h2>
            <p>Hands-on implementation — not just advice — that produces measurable results for businesses in {data.name}, {data.state}.</p>
          </div>
          <div className="sd-features-grid">
            {data.services.map(svc => (
              <Link key={svc.slug} href={`/services/${svc.slug}`} className="sd-feat-card loc-svc-card">
                <div className="sd-feat-icon"><i className={`fas ${svc.icon}`}></i></div>
                <h3>{svc.title}</h3>
                <p>{svc.desc}</p>
                <span className="loc-svc-link">Learn More <i className="fas fa-arrow-right"></i></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CALIDIGI ── */}
      <section className="loc-why">
        <div className="container">
          <div className="section-head">
            <div className="badge badge-orange"><i className="fas fa-trophy"></i> Why Calidigi</div>
            <h2>Why <em className="text-orange">{data.name}</em> Businesses Choose Calidigi</h2>
          </div>
          <div className="loc-why-grid">
            {data.whyPoints.map(pt => (
              <div key={pt.heading} className="loc-why-card">
                <div className="loc-why-icon"><i className={`fas ${pt.icon}`}></i></div>
                <h3>{pt.heading}</h3>
                <p>{pt.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="sd-faq">
        <div className="container">
          <div className="section-head">
            <div className="badge badge-orange"><i className="fas fa-circle-question"></i> FAQ</div>
            <h2>Common Questions About Digital Marketing in <em className="text-orange">{data.name}</em></h2>
          </div>
          <div className="sd-faq-list">
            {data.faqs.map(f => (
              <div key={f.q} className="sd-faq-item">
                <h4><i className="fas fa-circle-question"></i> {f.q}</h4>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED BLOGS ── */}
      {relatedBlogs.length > 0 && (
        <section className="sd-related" style={{ background: 'var(--bg-soft, #f8fafc)' }}>
          <div className="container">
            <div className="section-head">
              <div className="badge badge-orange"><i className="fas fa-book-open"></i> Expert Insights</div>
              <h2>Learn More About <em className="text-orange">{data.name}</em> Digital Marketing</h2>
              <p>Free guides and strategies to help your {data.name} business grow online.</p>
            </div>
            <div className="sd-related-grid">
              {relatedBlogs.map(b => (
                <Link key={b.slug} href={`/blog/${b.slug}`} className="sd-related-card">
                  <div className="sd-related-icon"><i className={`fas ${b.icon}`}></i></div>
                  <h3>{b.title}</h3>
                  <p>{b.excerpt.slice(0, 110)}…</p>
                  <span className="sd-related-link">Read Article <i className="fas fa-arrow-right"></i></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="svc-cta" id="contact">
        <div className="svc-cta-glow"></div>
        <div className="svc-cta-glow-2"></div>
        <div className="container">
          <div className="svc-cta-inner">
            <div className="badge badge-white"><i className="fas fa-comments"></i> Start a Conversation</div>
            <h2>{data.ctaHeading.split('?')[0]}?<br /><em>Let&apos;s Build a Plan.</em></h2>
            <p>{data.ctaDesc}</p>
            <div className="svc-cta-btns">
              <Link href="/contact-us" className="btn btn-primary">
                Get a Free Audit <i className="fas fa-arrow-right"></i>
              </Link>
              <Link href="/services" className="btn btn-outline-white">View All Services</Link>
            </div>
            <div className="svc-cta-proof">
              <div className="svc-cta-proof-item"><i className="fas fa-check-circle"></i><span>Free audit — no pressure</span></div>
              <div className="svc-cta-proof-item"><i className="fas fa-check-circle"></i><span>California-based team</span></div>
              <div className="svc-cta-proof-item"><i className="fas fa-check-circle"></i><span>Response within 8 hours</span></div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
