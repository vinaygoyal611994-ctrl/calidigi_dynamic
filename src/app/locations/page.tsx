import type { Metadata } from 'next'
import Link from 'next/link'
import { CITIES } from '@/lib/cityData'

export const metadata: Metadata = {
  title: 'Digital Marketing Agency Locations in California | Calidigi',
  description: 'Calidigi serves businesses across California — Los Angeles, San Francisco, San Diego, Sacramento, San Jose, Fresno and beyond. Expert local SEO, web design, and digital marketing.',
  alternates: {
    canonical: 'https://www.calidigi.com/locations',
  },
}

export default function LocationsPage() {
  return (
    <>
      <section className="svc-hero" style={{ paddingBottom: '80px' }}>
        <div className="svc-hero-glow"></div>
        <div className="container" style={{ textAlign: 'center', paddingTop: '60px' }}>
          <div className="badge badge-white"><i className="fas fa-map-location-dot"></i> California Locations</div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'white', margin: '20px 0 16px' }}>
            Serving Businesses Across <em style={{ fontStyle: 'normal', color: 'var(--orange)' }}>California</em>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: '600px', margin: '0 auto 40px', fontSize: '1.05rem' }}>
            Calidigi helps businesses in every major California market grow online with local SEO, web design, digital marketing, and AI solutions.
          </p>
        </div>
      </section>

      <section style={{ padding: '80px 0', background: 'var(--white)' }}>
        <div className="container">
          <div className="sd-related-grid">
            {CITIES.map(city => (
              <Link key={city.slug} href={`/locations/${city.slug}`} className="sd-related-card">
                <div className="sd-related-icon"><i className="fas fa-city"></i></div>
                <h3>{city.name}, {city.state}</h3>
                <p>{city.metaDescription.slice(0, 110)}…</p>
                <span className="sd-related-link">Learn More <i className="fas fa-arrow-right"></i></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
