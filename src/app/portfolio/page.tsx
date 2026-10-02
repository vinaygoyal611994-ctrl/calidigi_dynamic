import type { Metadata } from 'next'
import Link from 'next/link'
import PortfolioFilter from '@/components/PortfolioFilter'

export const metadata: Metadata = {
  title: 'Portfolio — 30+ Industry Digital Transformations | Calidigi',
  description:
    "Explore Calidigi's portfolio of 500+ successful digital transformation projects across 30+ industries — healthcare, real estate, e-commerce, SaaS, solar, manufacturing and more. California's technology company.",
  alternates: {
    canonical: 'https://www.calidigi.com/portfolio',
    languages: { 'en-US': 'https://www.calidigi.com/portfolio', 'x-default': 'https://www.calidigi.com/portfolio' },
  },
  openGraph: {
    url: 'https://www.calidigi.com/portfolio',
    title: 'Portfolio — 30+ Industry Digital Transformations | Calidigi California',
    description: "Explore Calidigi's portfolio of 500+ successful projects across 30+ industries — healthcare, e-commerce, SaaS, real estate, solar and more across California.",
  },
  twitter: {
    title: 'Portfolio — 30+ Industry Digital Transformations | Calidigi California',
    description: "Explore Calidigi's portfolio of 500+ digital transformation projects across 30+ industries across California.",
  },
}

export default function PortfolioPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': 'https://www.calidigi.com/portfolio#webpage',
        url: 'https://www.calidigi.com/portfolio',
        name: 'Portfolio — 30+ Industry Digital Transformations | Calidigi California',
        description: "Calidigi's portfolio of 500+ digital transformation projects across 30+ industries in California.",
        isPartOf: { '@id': 'https://www.calidigi.com/#website' },
        breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.calidigi.com/' }, { '@type': 'ListItem', position: 2, name: 'Portfolio', item: 'https://www.calidigi.com/portfolio' }] },
      },
      {
        '@type': 'Organization',
        '@id': 'https://www.calidigi.com/#organization',
        name: 'Calidigi',
        url: 'https://www.calidigi.com',
        logo: 'https://www.calidigi.com/Cali%20Digi%20Logo%201.png',
        address: { '@type': 'PostalAddress', streetAddress: '1234 Digital Ave, Suite 500', addressLocality: 'San Francisco', addressRegion: 'CA', postalCode: '94103', addressCountry: 'US' },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* ── 1. HERO ── */}
      <section className="pf-hero" id="home">
        <div className="pf-hero-glow"></div>
        <div className="pf-hero-glow-2"></div>
        <div className="container pf-hero-inner">
          <div className="pf-hero-content">
            <div className="badge badge-white"><i className="fas fa-briefcase"></i> Our Work</div>
            <h1 className="pf-hero-h1">Digital Transformation<br /><em>Across Every Industry</em></h1>
            <p className="pf-hero-lead">500+ successful projects. 30+ industries. Zero compromise on results. Every engagement starts with deep industry understanding and ends with measurable business growth.</p>
            <div className="pf-hero-stats">
              <div className="pf-hero-stat">
                <span className="pf-hero-stat-num">30<span className="pf-hero-stat-plus">+</span></span>
                <span className="pf-hero-stat-label">Industries Served</span>
              </div>
              <div className="pf-hero-stat">
                <span className="pf-hero-stat-num">500<span className="pf-hero-stat-plus">+</span></span>
                <span className="pf-hero-stat-label">Projects Delivered</span>
              </div>
              <div className="pf-hero-stat">
                <span className="pf-hero-stat-num">98<span className="pf-hero-stat-plus">%</span></span>
                <span className="pf-hero-stat-label">Client Retention</span>
              </div>
              <div className="pf-hero-stat">
                <span className="pf-hero-stat-num">$50M<span className="pf-hero-stat-plus">+</span></span>
                <span className="pf-hero-stat-label">Revenue Generated</span>
              </div>
            </div>
          </div>
          <div className="pf-hero-industry-cloud">
            <div className="pf-ic-item pf-ic-1"><i className="fas fa-hospital-user"></i> Healthcare</div>
            <div className="pf-ic-item pf-ic-2"><i className="fas fa-house-chimney-crack"></i> Home Services</div>
            <div className="pf-ic-item pf-ic-3"><i className="fas fa-scale-balanced"></i> Legal</div>
            <div className="pf-ic-item pf-ic-4"><i className="fas fa-store"></i> E-Commerce</div>
            <div className="pf-ic-item pf-ic-5"><i className="fas fa-solar-panel"></i> Solar Energy</div>
            <div className="pf-ic-item pf-ic-6"><i className="fas fa-graduation-cap"></i> Education</div>
            <div className="pf-ic-item pf-ic-7"><i className="fas fa-hotel"></i> Hospitality</div>
            <div className="pf-ic-item pf-ic-8"><i className="fas fa-microchip"></i> SaaS &amp; Tech</div>
            <div className="pf-ic-item pf-ic-9"><i className="fas fa-truck-fast"></i> Logistics</div>
            <div className="pf-ic-center">
              <i className="fas fa-globe"></i>
              <span>All Industries</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. FILTER + GRID (client component) ── */}
      <PortfolioFilter />

      {/* ── 3. FEATURED CASE STUDIES ── */}
      <section className="pf-featured-section" id="featured">
        <div className="container">
          <div className="pf-section-head">
            <span className="badge"><i className="fas fa-star"></i> Deep Dives</span>
            <h2>Featured Case Studies</h2>
            <p>Three transformations that showcase what&apos;s possible when AI, software, and strategy converge.</p>
          </div>
          <div className="pf-featured-grid">

            <div className="pf-feat-card">
              <div className="pf-feat-img pf-feat-img-1">
                <div className="pf-feat-img-overlay"></div>
                <div className="pf-feat-label">Healthcare / AI</div>
              </div>
              <div className="pf-feat-body">
                <div className="pf-feat-tags">
                  <span><i className="fas fa-robot"></i> AI Automation</span>
                  <span><i className="fas fa-mobile-alt"></i> Mobile App</span>
                  <span><i className="fas fa-shield-alt"></i> HIPAA</span>
                </div>
                <h3>Regional Medical Network — Patient Intelligence Platform</h3>
                <p>A 12-clinic network was losing patients to competitors with better digital experiences. We built an AI-powered patient intelligence platform with predictive scheduling, automated follow-ups, and a HIPAA-compliant mobile app that gave patients 24/7 access to their care team.</p>
                <div className="pf-feat-metrics">
                  <div className="pf-feat-metric"><span className="pf-fm-num">+47%</span><span>Patient Bookings</span></div>
                  <div className="pf-feat-metric"><span className="pf-fm-num">-38%</span><span>No-Show Rate</span></div>
                  <div className="pf-feat-metric"><span className="pf-fm-num">24/7</span><span>AI Support</span></div>
                  <div className="pf-feat-metric"><span className="pf-fm-num">12</span><span>Clinics Served</span></div>
                </div>
                <Link href="/contact-us" className="btn btn-primary">Request Full Case Study <i className="fas fa-arrow-right"></i></Link>
              </div>
            </div>

            <div className="pf-feat-card">
              <div className="pf-feat-img pf-feat-img-2">
                <div className="pf-feat-img-overlay"></div>
                <div className="pf-feat-label">E-Commerce / AI</div>
              </div>
              <div className="pf-feat-body">
                <div className="pf-feat-tags">
                  <span><i className="fas fa-shopping-cart"></i> E-Commerce</span>
                  <span><i className="fas fa-brain"></i> Personalization AI</span>
                  <span><i className="fas fa-chart-bar"></i> Analytics</span>
                </div>
                <h3>California Retail Brand — AI-Powered Commerce Platform</h3>
                <p>A California lifestyle brand was achieving only 1.2% conversion. We rebuilt their commerce stack around AI-driven personalization, predictive recommendations, and automated cart recovery — transforming their online channel into their highest-revenue stream within 90 days.</p>
                <div className="pf-feat-metrics">
                  <div className="pf-feat-metric"><span className="pf-fm-num">+148%</span><span>Online Revenue</span></div>
                  <div className="pf-feat-metric"><span className="pf-fm-num">4.1%</span><span>Conversion Rate</span></div>
                  <div className="pf-feat-metric"><span className="pf-fm-num">-45%</span><span>Cart Abandon</span></div>
                  <div className="pf-feat-metric"><span className="pf-fm-num">90</span><span>Days to ROI</span></div>
                </div>
                <Link href="/contact-us" className="btn btn-primary">Request Full Case Study <i className="fas fa-arrow-right"></i></Link>
              </div>
            </div>

            <div className="pf-feat-card">
              <div className="pf-feat-img pf-feat-img-3">
                <div className="pf-feat-img-overlay"></div>
                <div className="pf-feat-label">SaaS / Full-Stack</div>
              </div>
              <div className="pf-feat-body">
                <div className="pf-feat-tags">
                  <span><i className="fas fa-microchip"></i> SaaS Platform</span>
                  <span><i className="fas fa-cloud"></i> Cloud-Native</span>
                  <span><i className="fas fa-robot"></i> AI Onboarding</span>
                </div>
                <h3>B2B SaaS Startup — From MVP to $2M ARR Platform</h3>
                <p>A Series-A startup had a fragile MVP and was losing enterprise prospects to UX friction. We rebuilt the platform from the ground up: cloud-native architecture, AI-driven onboarding that reduced time-to-value from 14 days to 2, and a self-serve analytics dashboard that became their top selling point.</p>
                <div className="pf-feat-metrics">
                  <div className="pf-feat-metric"><span className="pf-fm-num">+200%</span><span>ARR Growth</span></div>
                  <div className="pf-feat-metric"><span className="pf-fm-num">89%</span><span>Net Retention</span></div>
                  <div className="pf-feat-metric"><span className="pf-fm-num">2 Days</span><span>Time-to-Value</span></div>
                  <div className="pf-feat-metric"><span className="pf-fm-num">$2M</span><span>ARR Reached</span></div>
                </div>
                <Link href="/contact-us" className="btn btn-primary">Request Full Case Study <i className="fas fa-arrow-right"></i></Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 4. RESULTS STRIP ── */}
      <section className="pf-results-strip">
        <div className="container">
          <div className="pf-results-inner">
            <div className="pf-rs-item">
              <span className="pf-rs-num">500<sup>+</sup></span>
              <span className="pf-rs-label">Projects Delivered</span>
            </div>
            <div className="pf-rs-divider"></div>
            <div className="pf-rs-item">
              <span className="pf-rs-num">30<sup>+</sup></span>
              <span className="pf-rs-label">Industries Served</span>
            </div>
            <div className="pf-rs-divider"></div>
            <div className="pf-rs-item">
              <span className="pf-rs-num">98%</span>
              <span className="pf-rs-label">Client Retention Rate</span>
            </div>
            <div className="pf-rs-divider"></div>
            <div className="pf-rs-item">
              <span className="pf-rs-num">$50M<sup>+</sup></span>
              <span className="pf-rs-label">Client Revenue Generated</span>
            </div>
            <div className="pf-rs-divider"></div>
            <div className="pf-rs-item">
              <span className="pf-rs-num">4.9<sup>★</sup></span>
              <span className="pf-rs-label">Average Client Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. CTA ── */}
      <section className="pf-cta" id="contact">
        <div className="pf-cta-glow"></div>
        <div className="container pf-cta-inner">
          <div className="pf-cta-content">
            <div className="badge badge-white"><i className="fas fa-rocket"></i> Start Your Project</div>
            <h2>Ready to be our next<br /><em>success story?</em></h2>
            <p>Tell us about your industry and goals. We&apos;ll show you exactly what&apos;s possible — with real numbers, real timelines, and a roadmap that fits your budget.</p>
            <ul className="pf-cta-list">
              <li><i className="fas fa-check-circle"></i> Free strategy session — no sales pitch</li>
              <li><i className="fas fa-check-circle"></i> Industry-specific roadmap within 48 hours</li>
              <li><i className="fas fa-check-circle"></i> Transparent pricing, no hidden fees</li>
              <li><i className="fas fa-check-circle"></i> NDA available before any discussion</li>
            </ul>
            <div className="pf-cta-actions">
              <Link href="/contact-us" className="btn btn-primary">Start a Free Consultation <i className="fas fa-arrow-right"></i></Link>
              <Link href="/solutions" className="btn btn-outline-white">View Our Solutions</Link>
            </div>
          </div>
          <div className="pf-cta-card">
            <div className="pf-cc-header">
              <div className="pf-cc-avatar"><i className="fas fa-user-tie"></i></div>
              <div>
                <div className="pf-cc-name">Calidigi Team</div>
                <div className="pf-cc-role">Digital Transformation Experts</div>
              </div>
              <div className="pf-cc-online"><span></span> Available</div>
            </div>
            <div className="pf-cc-body">
              <div className="pf-cc-item"><i className="fas fa-envelope"></i> hello@calidigi.com</div>
              <div className="pf-cc-item"><i className="fas fa-phone"></i> +1 (555) 000-1234</div>
              <div className="pf-cc-item"><i className="fas fa-location-dot"></i> San Francisco, CA</div>
              <div className="pf-cc-item"><i className="fas fa-clock"></i> Response within 8 hours</div>
            </div>
            <div className="pf-cc-industries">
              <div className="pf-cc-ind-title">We work across all industries</div>
              <div className="pf-cc-ind-tags">
                <span>Healthcare</span><span>Real Estate</span><span>E-Commerce</span>
                <span>SaaS</span><span>Legal</span><span>Restaurant</span>
                <span>Solar</span><span>Education</span><span>+ 22 more</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
