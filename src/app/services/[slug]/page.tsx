import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SERVICES, getServiceBySlug } from '@/lib/serviceData'

export function generateStaticParams() {
  return SERVICES.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const svc = getServiceBySlug(slug)
  if (!svc) return { title: 'Service Not Found' }

  const url = `https://www.calidigi.com/services/${svc.slug}`
  return {
    title: { absolute: svc.metaTitle },
    description: svc.metaDescription,
    alternates: {
      canonical: url,
      languages: { 'en-US': url, 'x-default': url },
    },
    openGraph: {
      url,
      title: svc.metaTitle,
      description: svc.metaDescription,
    },
    twitter: {
      title: svc.metaTitle,
      description: svc.metaDescription,
    },
  }
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const svc = getServiceBySlug(slug)
  if (!svc) notFound()

  const url = `https://www.calidigi.com/services/${svc.slug}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: svc.name,
        description: svc.metaDescription,
        provider: { '@id': 'https://www.calidigi.com/#organization' },
        areaServed: { '@type': 'State', name: 'California' },
        url,
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: svc.metaTitle,
        isPartOf: { '@id': 'https://www.calidigi.com/#website' },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.calidigi.com/' },
            { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://www.calidigi.com/services' },
            { '@type': 'ListItem', position: 3, name: svc.name, item: url },
          ],
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: svc.faqs.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  }

  const relatedServices = SERVICES.filter(s => svc.relatedSlugs.includes(s.slug))

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── HERO ── */}
      <section className="svc-hero" id="home">
        <div className="svc-hero-glow"></div>
        <div className="svc-hero-glow-2"></div>
        <div className="container svc-hero-inner">
          <div className="svc-hero-content">
            <h1 className="sr-only">{svc.h1}</h1>
            <div className="badge badge-white">
              <i className={`fas ${svc.icon}`}></i> {svc.heroBadge}
            </div>
            <h2>
              {svc.heroHeading.split('\n').map((line, i) => (
                i === 0 ? <span key={i}>{line}<br /></span> : <em key={i}>{line}</em>
              ))}
            </h2>
            <p className="svc-hero-sub">{svc.heroSub}</p>
            <p>{svc.heroDesc}</p>
            <div className="svc-hero-actions">
              <Link href="/contact-us" className="btn btn-primary">
                Get a Free Consultation <i className="fas fa-arrow-right"></i>
              </Link>
              <Link href="/services" className="btn btn-outline-white">
                All Services
              </Link>
            </div>
            <div className="svc-hero-proof">
              {svc.heroStats.map(s => (
                <div key={s.label} className="svc-hero-proof-item">
                  <strong>{s.num}</strong><span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="svc-hero-visual">
            <div className="sd-icon-card">
              <div className="sd-icon-wrap">
                <i className={`fas ${svc.icon}`}></i>
              </div>
              <h3>{svc.name}</h3>
              <p>{svc.heroSub}</p>
              <div className="sd-icon-tags">
                {svc.features.slice(0, 4).map(f => (
                  <span key={f.title}><i className={`fas ${f.icon}`}></i> {f.title}</span>
                ))}
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
            <Link href="/services">Services</Link>
            <i className="fas fa-chevron-right"></i>
            <span>{svc.name}</span>
          </nav>
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section className="sd-features">
        <div className="container">
          <div className="section-head">
            <div className="badge badge-orange"><i className="fas fa-list-check"></i> What&apos;s Included</div>
            <h2>Everything in Our <em className="text-orange">{svc.name} Service</em></h2>
            <p>A complete service delivery — not just advice, but hands-on implementation that produces measurable results for your California business.</p>
          </div>
          <div className="sd-features-grid">
            {svc.features.map(f => (
              <div key={f.title} className="sd-feat-card">
                <div className="sd-feat-icon"><i className={`fas ${f.icon}`}></i></div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="sd-process">
        <div className="container">
          <div className="section-head">
            <div className="badge badge-orange"><i className="fas fa-route"></i> Our Process</div>
            <h2>How We Deliver <em className="text-orange">Results</em></h2>
            <p>A clear, structured process that keeps every engagement aligned to your business goals from first conversation to measurable outcomes.</p>
          </div>
          <div className="sd-process-steps">
            {svc.process.map((p, i) => (
              <div key={p.n} className="sd-process-step">
                <div className="sd-process-num">{p.n}</div>
                <h4>{p.title}</h4>
                <p>{p.desc}</p>
                {i < svc.process.length - 1 && <div className="sd-process-arrow"><i className="fas fa-arrow-right"></i></div>}
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
            <h2>Common Questions About <em className="text-orange">{svc.name}</em></h2>
          </div>
          <div className="sd-faq-list">
            {svc.faqs.map(f => (
              <div key={f.q} className="sd-faq-item">
                <h4><i className="fas fa-circle-question"></i> {f.q}</h4>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED SERVICES ── */}
      {relatedServices.length > 0 && (
        <section className="sd-related">
          <div className="container">
            <div className="section-head">
              <div className="badge badge-orange"><i className="fas fa-diagram-project"></i> Related Services</div>
              <h2>Often Combined With <em className="text-orange">{svc.name}</em></h2>
            </div>
            <div className="sd-related-grid">
              {relatedServices.map(r => (
                <Link key={r.slug} href={`/services/${r.slug}`} className="sd-related-card">
                  <div className="sd-related-icon"><i className={`fas ${r.icon}`}></i></div>
                  <h3>{r.name}</h3>
                  <p>{r.metaDescription.slice(0, 100)}…</p>
                  <span className="sd-related-link">Learn More <i className="fas fa-arrow-right"></i></span>
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
            <h2>{svc.ctaHeading.split('?')[0]}?<br /><em>Let&apos;s Build a Plan.</em></h2>
            <p>{svc.ctaDesc}</p>
            <div className="svc-cta-btns">
              <Link href="/contact-us" className="btn btn-primary">
                Get a Free Consultation <i className="fas fa-arrow-right"></i>
              </Link>
              <Link href="/services" className="btn btn-outline-white">View All Services</Link>
            </div>
            <div className="svc-cta-proof">
              <div className="svc-cta-proof-item"><i className="fas fa-check-circle"></i><span>Free strategy session — no pressure</span></div>
              <div className="svc-cta-proof-item"><i className="fas fa-check-circle"></i><span>California-based team</span></div>
              <div className="svc-cta-proof-item"><i className="fas fa-check-circle"></i><span>Response within 8 hours</span></div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
