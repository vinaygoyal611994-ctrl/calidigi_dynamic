import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Calidigi — Digital Marketing, Web Design & AI Solutions | California',
  description:
    'Calidigi is a California digital growth company offering web design, digital marketing, local SEO, AI solutions and branding to help businesses attract customers and grow.',
  alternates: {
    canonical: 'https://www.calidigi.com/',
    languages: { 'en-US': 'https://www.calidigi.com/', 'x-default': 'https://www.calidigi.com/' },
  },
  openGraph: {
    url: 'https://www.calidigi.com/',
    title: 'Calidigi — Digital Marketing, Web Design & AI Solutions | California',
    description: 'Calidigi is a California digital growth company offering web design, digital marketing, local SEO, AI solutions and branding to help businesses attract customers and grow.',
  },
  twitter: {
    title: 'Calidigi — Digital Marketing, Web Design & AI Solutions | California',
    description: 'Calidigi is a California digital growth company offering web design, digital marketing, local SEO, AI solutions and branding to help businesses attract customers and grow.',
  },
}

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://www.calidigi.com/#organization',
        name: 'Calidigi',
        url: 'https://www.calidigi.com',
        logo: { '@type': 'ImageObject', url: 'https://www.calidigi.com/Cali%20Digi%20Logo%201.png', width: 500, height: 200 },
        description: 'California digital growth company offering web design, digital marketing, local SEO, AI solutions and branding.',
        address: { '@type': 'PostalAddress', streetAddress: '1234 Digital Ave, Suite 500', addressLocality: 'San Francisco', addressRegion: 'CA', postalCode: '94103', addressCountry: 'US' },
        telephone: '+15550001234',
        email: 'sales@calidigi.com',
        sameAs: ['https://www.facebook.com/calidigi', 'https://www.instagram.com/calidigi', 'https://www.linkedin.com/company/calidigi', 'https://twitter.com/calidigi'],
      },
      {
        '@type': 'LocalBusiness',
        '@id': 'https://www.calidigi.com/#localbusiness',
        name: 'Calidigi',
        url: 'https://www.calidigi.com',
        image: 'https://www.calidigi.com/og-image.jpg',
        description: 'California digital growth company helping businesses build a stronger online presence, attract more customers and grow with the right digital strategy and AI solutions.',
        address: { '@type': 'PostalAddress', streetAddress: '1234 Digital Ave, Suite 500', addressLocality: 'San Francisco', addressRegion: 'CA', postalCode: '94103', addressCountry: 'US' },
        geo: { '@type': 'GeoCoordinates', latitude: 37.7749, longitude: -122.4194 },
        telephone: '+15550001234',
        email: 'sales@calidigi.com',
        priceRange: '$$',
        openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '09:00', closes: '18:00' },
        areaServed: { '@type': 'State', name: 'California' },
        hasMap: 'https://maps.google.com/?q=San+Francisco,CA',
        currenciesAccepted: 'USD',
        paymentAccepted: 'Cash, Credit Card, Bank Transfer',
      },
      {
        '@type': 'WebSite',
        '@id': 'https://www.calidigi.com/#website',
        url: 'https://www.calidigi.com',
        name: 'Calidigi',
        description: 'California digital growth company — digital marketing, web design, SEO, AI solutions and branding.',
        publisher: { '@id': 'https://www.calidigi.com/#organization' },
        potentialAction: { '@type': 'SearchAction', target: { '@type': 'EntryPoint', urlTemplate: 'https://www.calidigi.com/blog?search={search_term_string}' }, 'query-input': 'required name=search_term_string' },
      },
      {
        '@type': 'WebPage',
        '@id': 'https://www.calidigi.com/#webpage',
        url: 'https://www.calidigi.com/',
        name: 'Calidigi — Digital Marketing, Web Design & AI Solutions | California',
        isPartOf: { '@id': 'https://www.calidigi.com/#website' },
        about: { '@id': 'https://www.calidigi.com/#organization' },
        description: 'Calidigi is a California digital growth company offering web design, digital marketing, local SEO, AI solutions and branding to help businesses attract customers and grow.',
        breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.calidigi.com/' }] },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-bg"></div>
        <div className="hero-dots"></div>
        <div className="container hero-inner">
          <div className="hero-content">
            <div className="hero-eyebrow">
              <div className="hero-eyebrow-dot"></div>
              <span>California&apos;s Digital Growth Company</span>
            </div>
            <h1>Grow Your Business With<br /><em>Digital, Design &amp; AI</em></h1>
            <p className="hero-desc">
              We build high-performing websites, powerful brands, local SEO strategies and AI-powered solutions that help businesses attract customers, generate leads and grow.
            </p>
            <div className="hero-actions">
              <Link href="/contact-us" className="btn btn-primary">
                Let&apos;s Grow Your Business <i className="fas fa-arrow-right"></i>
              </Link>
              <Link href="/services" className="btn btn-outline">
                Explore Our Services
              </Link>
            </div>
            <div className="hero-proof">
              <div className="proof-item"><i className="fas fa-check-circle"></i><span>High-Converting Websites</span></div>
              <div className="proof-item"><i className="fas fa-check-circle"></i><span>Local SEO Specialists</span></div>
              <div className="proof-item"><i className="fas fa-check-circle"></i><span>AI-Powered Solutions</span></div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-visual-wrap">
              <div className="hv-float hv-float-1">
                <div className="hv-float-icon orange"><i className="fas fa-chart-line"></i></div>
                <div className="hv-float-text"><p>Organic Traffic</p><span>+247% this month</span></div>
              </div>
              <div className="hv-main">
                <div className="hv-browser-bar">
                  <div className="hv-browser-dot" style={{ background: '#FF5F57' }}></div>
                  <div className="hv-browser-dot" style={{ background: '#FEBC2E' }}></div>
                  <div className="hv-browser-dot" style={{ background: '#28C840' }}></div>
                  <div className="url-bar">calidigi.com/your-business</div>
                </div>
                <div className="hv-content">
                  <div className="hv-heading lg"></div>
                  <div className="hv-heading sm" style={{ marginBottom: '14px' }}></div>
                  <div className="hv-para w90"></div>
                  <div className="hv-para w75"></div>
                  <div className="hv-para w60" style={{ marginBottom: '14px' }}></div>
                  <div className="hv-cta-bar">
                    <div className="hv-btn orange"></div>
                    <div className="hv-btn ghost"></div>
                  </div>
                </div>
                <div className="hv-metrics">
                  <div className="hv-metric"><span className="hv-metric-val orange">342</span><span className="hv-metric-lbl">Leads / mo</span></div>
                  <div className="hv-metric"><span className="hv-metric-val blue">#1</span><span className="hv-metric-lbl">Local Rank</span></div>
                  <div className="hv-metric"><span className="hv-metric-val" style={{ color: '#10B981' }}>4.9★</span><span className="hv-metric-lbl">Reviews</span></div>
                  <div className="hv-metric"><span className="hv-metric-val">+68%</span><span className="hv-metric-lbl">Conversions</span></div>
                </div>
              </div>
              <div className="hv-float hv-float-2">
                <div className="hv-float-icon green"><i className="fas fa-robot"></i></div>
                <div className="hv-float-text"><p>AI Automation</p><span>Saving 18 hrs/week</span></div>
              </div>
              <div className="hv-float hv-float-3">
                <div className="hv-float-icon blue"><i className="fas fa-map-marker-alt"></i></div>
                <div className="hv-float-text"><p>Local SEO</p><span>Top 3 Google Maps</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <div className="trust-strip">
        <div className="container trust-strip-inner">
          <span className="trust-strip-label">We help with</span>
          <span className="trust-pill"><i className="fas fa-laptop-code"></i> Web Design</span>
          <span className="trust-pill"><i className="fas fa-bullhorn"></i> Digital Marketing</span>
          <span className="trust-pill"><i className="fas fa-map-marker-alt"></i> Local SEO</span>
          <span className="trust-pill"><i className="fas fa-robot"></i> AI Solutions</span>
          <span className="trust-pill"><i className="fas fa-paint-brush"></i> Branding</span>
          <span className="trust-pill"><i className="fas fa-funnel-dollar"></i> Lead Generation</span>
          <span className="trust-pill"><i className="fas fa-chart-line"></i> Business Growth</span>
        </div>
      </div>

      {/* PROBLEMS */}
      <section className="problems" id="problems">
        <div className="container">
          <div className="section-head">
            <div className="badge badge-orange"><i className="fas fa-circle-exclamation"></i> Sound Familiar?</div>
            <h2>Your Business Has Potential.<br />Your Digital Presence Should Show It.</h2>
            <p>Many businesses struggle with the same digital challenges. We understand them — and we know how to solve them.</p>
          </div>
          <div className="problems-grid">
            {[
              { num: '01', icon: 'fa-magnifying-glass', title: "Hard to Find on Google", desc: "Customers search for your services but find your competitors instead." },
              { num: '02', icon: 'fa-arrow-pointer', title: "Website Doesn't Convert", desc: "You have traffic but visitors leave without becoming leads or customers." },
              { num: '03', icon: 'fa-map-location-dot', title: "Local Customers Can't Find You", desc: "Nearby customers don't discover your business in local searches." },
              { num: '04', icon: 'fa-swatchbook', title: "Inconsistent Branding", desc: "Your brand looks different across your website, social and materials." },
              { num: '05', icon: 'fa-chart-pie', title: "Marketing Hard to Measure", desc: "Marketing feels expensive without visibility into what's actually working." },
              { num: '06', icon: 'fa-arrows-rotate', title: "Too Many Repetitive Tasks", desc: "Your team spends hours on manual work that AI could handle automatically." },
              { num: '07', icon: 'fa-robot', title: "Don't Know How to Use AI", desc: "Everyone talks about AI but it's unclear how it actually applies to you." },
              { num: '08', icon: 'fa-bullhorn', title: "Website Doesn't Communicate Value", desc: "Visitors don't understand what you do or why they should choose you." },
            ].map(({ num, icon, title, desc }) => (
              <div key={num} className="problem-card" data-num={num}>
                <div className="problem-icon"><i className={`fas ${icon}`}></i></div>
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            ))}
          </div>
          <div className="problems-bridge">
            <div className="problems-bridge-text">
              <p>The Calidigi Difference</p>
              <h3>We turn these problems into <em>growth opportunities</em> — with the right strategy, design and technology.</h3>
            </div>
            <div className="problems-bridge-cta">
              <div className="bridge-stat">
                <div className="bridge-stat-dot"></div>
                <span>150+ businesses helped</span>
              </div>
              <Link href="/services" className="btn btn-primary">
                See How We Help <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services" id="services">
        <div className="container">
          <div className="section-head">
            <div className="badge badge-orange"><i className="fas fa-briefcase"></i> What We Do</div>
            <h2>Digital Services Built Around<br />Business Growth</h2>
            <p>Every service we offer is designed with one goal: helping your business attract more customers and grow.</p>
          </div>
          <div className="services-grid">
            {[
              { icon: 'fa-laptop-code', title: 'Web Design & Development', desc: 'High-converting, fast, responsive websites built around your business goals — not just beautiful design, but sites that turn visitors into customers.' },
              { icon: 'fa-bullhorn', title: 'Digital Marketing', desc: 'Data-driven strategies that increase your visibility, drive targeted traffic and generate qualified leads — across search, social and paid channels.' },
              { icon: 'fa-map-marker-alt', title: 'Local SEO', desc: 'Improve your local search visibility so nearby customers can find and choose your business — on Google Maps, local search and beyond.' },
              { icon: 'fa-robot', title: 'AI Solutions', desc: 'Practical AI automation and intelligent workflows that reduce repetitive work, improve customer experience and solve real business problems.' },
              { icon: 'fa-paint-brush', title: 'Branding', desc: 'Create a consistent, memorable brand identity — logo, visual system, voice and messaging — that builds recognition and trust across every channel.' },
              { icon: 'fa-funnel-dollar', title: 'Lead Generation', desc: 'Turn website visitors and search traffic into qualified business opportunities using conversion-focused landing pages, forms and follow-up systems.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="service-card">
                <div className="service-icon"><i className={`fas ${icon}`}></i></div>
                <h3>{title}</h3>
                <p>{desc}</p>
                <Link href="/contact-us" className="service-link">Learn More <i className="fas fa-arrow-right"></i></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI SOLUTIONS */}
      <section className="ai-section" id="ai">
        <div className="ai-bg-glow"></div>
        <div className="ai-bg-glow-2"></div>
        <div className="container ai-inner">
          <div className="ai-content">
            <div className="badge badge-white"><i className="fas fa-microchip"></i> AI Solutions</div>
            <h2><em>AI That Solves</em> Real<br />Business Problems</h2>
            <p>We don&apos;t use AI as a buzzword. From automation to intelligent workflows, we help businesses use AI where it can save time, improve customer experiences and create new opportunities.</p>
            <div className="ai-flow">
              <div className="ai-flow-step"><i className="fas fa-circle-dot"></i> Business Problem</div>
              <div className="ai-flow-arrow"><i className="fas fa-arrow-right"></i></div>
              <div className="ai-flow-step"><i className="fas fa-robot"></i> AI Solution</div>
              <div className="ai-flow-arrow"><i className="fas fa-arrow-right"></i></div>
              <div className="ai-flow-step"><i className="fas fa-chart-line"></i> Better Outcome</div>
            </div>
            <Link href="/contact-us" className="btn btn-primary">Explore AI Solutions <i className="fas fa-arrow-right"></i></Link>
          </div>
          <div className="ai-grid">
            {[
              { icon: 'fa-headset', title: 'AI Customer Support', desc: '24/7 intelligent support that handles common customer questions automatically.' },
              { icon: 'fa-user-check', title: 'AI Lead Qualification', desc: 'Automatically qualify and route leads so your team focuses on the best opportunities.' },
              { icon: 'fa-pen-nib', title: 'AI Content & Marketing', desc: 'AI-assisted content creation, SEO writing and campaign optimization at scale.' },
              { icon: 'fa-cogs', title: 'AI Workflow Automation', desc: 'Automate repetitive business processes to save time and reduce errors.' },
              { icon: 'fa-chart-bar', title: 'AI Data Analysis', desc: 'Turn your business data into clear insights and actionable decisions.' },
              { icon: 'fa-microphone', title: 'AI Voice Agents', desc: 'Intelligent voice assistants that handle calls, bookings and customer interactions.' },
              { icon: 'fa-brain', title: 'AI Knowledge Assistants', desc: 'Smart assistants trained on your business knowledge to answer customer queries.' },
              { icon: 'fa-puzzle-piece', title: 'Custom AI Solutions', desc: 'Bespoke AI tools designed around your specific business challenges and goals.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="ai-card">
                <div className="ai-card-icon"><i className={`fas ${icon}`}></i></div>
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCAL SEO */}
      <section className="local-seo" id="seo">
        <div className="container local-seo-inner">
          <div className="local-seo-visual">
            <div className="seo-map-card">
              <div className="seo-map-bg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086069584395!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan+Francisco%2C+CA!5e0!3m2!1sen!2sus!4v1"
                  width="100%" height="100%" style={{ border: 0, display: 'block' }}
                  allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                  title="Calidigi - California"
                />
              </div>
              <div className="seo-result-item">
                <div className="seo-rank">1</div>
                <div className="seo-result-text">
                  <strong>Calidigi — Digital Marketing Agency</strong>
                  <span>San Francisco, CA · 5.0★ · Open Now</span>
                </div>
              </div>
            </div>
          </div>
          <div className="local-seo-content">
            <div className="badge badge-orange"><i className="fas fa-map-marker-alt"></i> Local SEO</div>
            <h2>Get Found By Customers<br /><em>Near You</em></h2>
            <p>When local customers search for your services, they should find you — not your competitors. We build local search strategies that put your business at the top of Google Maps, local packs and nearby searches.</p>
            <div className="seo-features">
              {['Google Business Profile Optimization', 'Local Keyword Strategy', 'Local Landing Pages', 'Citation Optimization', 'Review Strategy & Management', 'Location-Based Content', 'Local Search Visibility', 'Conversion-Focused Local Pages'].map((f) => (
                <div key={f} className="seo-feat"><i className="fas fa-check"></i><span>{f}</span></div>
              ))}
            </div>
            <Link href="/contact-us" className="btn btn-primary">Improve My Local Visibility <i className="fas fa-arrow-right"></i></Link>
          </div>
        </div>
      </section>

      {/* WEB DESIGN & BRANDING */}
      <section className="web-branding" id="design">
        <div className="container">
          <div className="web-branding-top">
            <div className="web-mockup">
              <div className="web-mockup-bar">
                <div className="wm-dot r"></div><div className="wm-dot y"></div><div className="wm-dot g"></div>
              </div>
              <div className="web-mockup-body">
                <div className="wm-hero-area">
                  <div className="wm-h lg"></div><div className="wm-h sm"></div>
                  <div className="wm-h xs"></div><div className="wm-btn"></div>
                </div>
                <div className="wm-row">
                  <div className="wm-card"></div><div className="wm-card"></div><div className="wm-card"></div>
                </div>
              </div>
            </div>
            <div className="web-branding-content">
              <div className="badge badge-orange"><i className="fas fa-laptop-code"></i> Web Design &amp; Branding</div>
              <h2>Your Website Is Your<br /><em>Digital First Impression</em></h2>
              <p>A website shouldn&apos;t just look good — it should communicate trust, clearly explain what you do and convert visitors into customers. We build websites that work as hard as you do.</p>
              <p>Combined with strong branding, your business builds recognition, credibility and consistency across every digital touchpoint.</p>
              <Link href="/contact-us" className="btn btn-primary">Build My Website <i className="fas fa-arrow-right"></i></Link>
            </div>
          </div>
          <div className="branding-pillars">
            {[
              { icon: 'fa-star', title: 'Look Professional', desc: 'Strong visual identity and modern UI design that reflects your brand quality and builds instant trust with visitors.' },
              { icon: 'fa-shield-halved', title: 'Build Trust', desc: 'Clear messaging, social proof, consistent branding and credibility signals that make customers confident in choosing you.' },
              { icon: 'fa-funnel-dollar', title: 'Generate Leads', desc: 'Strategic CTAs, conversion-focused layouts and guided user journeys that turn website visitors into genuine business leads.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="branding-pillar">
                <div className="bp-icon"><i className={`fas ${icon}`}></i></div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="process" id="process">
        <div className="container">
          <div className="section-head">
            <div className="badge badge-orange"><i className="fas fa-route"></i> How We Work</div>
            <h2>How We Help Your Business Grow</h2>
            <p>A clear, proven process from understanding your business to achieving sustainable digital growth.</p>
          </div>
          <div className="process-steps">
            {[
              { icon: 'fa-magnifying-glass', label: 'Step 01', title: 'Understand', desc: 'Understand your business, target audience, goals and current digital position.' },
              { icon: 'fa-hammer', label: 'Step 02', title: 'Build', desc: 'Create your website, branding and digital foundation built to convert.' },
              { icon: 'fa-chart-line', label: 'Step 03', title: 'Optimize', desc: 'Improve SEO, local visibility, speed and conversion rates.' },
              { icon: 'fa-robot', label: 'Step 04', title: 'Automate', desc: 'Introduce AI and automation where it creates the most business value.' },
              { icon: 'fa-rocket', label: 'Step 05', title: 'Grow', desc: 'Use data, marketing and continuous optimization to generate sustainable growth.' },
            ].map(({ icon, label, title, desc }) => (
              <div key={title} className="process-step">
                <div className="ps-num"><i className={`fas ${icon} ps-icon`}></i></div>
                <div className="ps-label">{label}</div>
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="solutions" id="solutions">
        <div className="container">
          <div className="section-head">
            <div className="badge badge-orange"><i className="fas fa-lightbulb"></i> Solutions</div>
            <h2>Solutions For Modern Businesses</h2>
            <p>Practical, business-first solutions — not complicated technology for its own sake.</p>
          </div>
          <div className="solutions-grid">
            {[
              { num: '01 / Marketing', title: 'Marketing Solutions', desc: 'Drive visibility, traffic and qualified leads through integrated SEO, content, social media and paid campaigns designed around your growth goals.', tags: ['SEO', 'Content', 'Paid Ads', 'Lead Gen'] },
              { num: '02 / AI', title: 'AI Automation', desc: 'Automate repetitive business processes, qualify leads automatically and let AI handle routine tasks so your team can focus on what matters most.', tags: ['Workflow AI', 'Chatbots', 'Voice Agents'] },
              { num: '03 / Experience', title: 'Customer Experience', desc: 'Build superior customer journeys through conversion-focused websites, intelligent chatbots, voice agents and AI-powered support systems.', tags: ['Web Design', 'AI Support', 'UX'] },
              { num: '04 / Intelligence', title: 'Business Intelligence', desc: 'Use AI and data analysis to understand your business performance, customer behaviour and market opportunities — and make smarter decisions.', tags: ['Analytics', 'Reporting', 'AI Insights'] },
              { num: '05 / Local', title: 'Local Growth', desc: 'Help local businesses attract customers in their service area through Google Maps optimization, local SEO, review management and location content.', tags: ['Local SEO', 'GMB', 'Citations'] },
              { num: '06 / Brand', title: 'Brand Building', desc: 'Create a consistent, professional and memorable brand presence that builds recognition, establishes credibility and differentiates your business.', tags: ['Logo', 'Visual Identity', 'Messaging'] },
            ].map(({ num, title, desc, tags }) => (
              <div key={title} className="solution-card">
                <div className="solution-num">{num}</div>
                <h3>{title}</h3>
                <p>{desc}</p>
                <div className="solution-tag">{tags.map((t) => <span key={t}>{t}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="portfolio" id="portfolio">
        <div className="container">
          <div className="section-head">
            <div className="badge badge-orange"><i className="fas fa-briefcase"></i> Portfolio</div>
            <h2>Built For Businesses.<br />Designed For Results.</h2>
            <p>A selection of projects across web design, digital marketing, local SEO and AI solutions.</p>
          </div>
          <div className="portfolio-grid">
            {[
              { cls: 'pt-1', cat: 'Web Design', title: 'Healthcare Clinic Website', desc: 'Modern, patient-focused website with online booking, local SEO and conversion-optimized landing pages.', tags: ['Web Design', 'Local SEO', 'UX'] },
              { cls: 'pt-2', cat: 'AI Solutions', title: 'AI Customer Support System', desc: 'Intelligent chatbot and lead qualification system that automated customer conversations for a local service business.', tags: ['AI Chatbot', 'Lead Gen', 'Automation'] },
              { cls: 'pt-3', cat: 'Local SEO', title: 'Local Restaurant Chain SEO', desc: 'Multi-location local SEO strategy, Google Business Profile optimization and review management for a California restaurant group.', tags: ['Local SEO', 'GMB', 'Content'] },
              { cls: 'pt-4', cat: 'Branding', title: 'Tech Startup Brand Identity', desc: 'Complete brand identity including logo, color system, typography and brand guidelines for a Bay Area technology startup.', tags: ['Branding', 'Logo', 'Visual Identity'] },
              { cls: 'pt-5', cat: 'Digital Marketing', title: 'E-Commerce Growth Campaign', desc: 'Integrated digital marketing strategy combining SEO, Google Ads and social campaigns for a California retail business.', tags: ['SEO', 'Paid Ads', 'Social'] },
              { cls: 'pt-6', cat: 'Lead Generation', title: 'Real Estate Lead System', desc: 'Conversion-focused landing pages and automated lead nurturing system for a California real estate company.', tags: ['Landing Pages', 'CRO', 'Automation'] },
            ].map(({ cls, cat, title, desc, tags }) => (
              <div key={title} className="portfolio-card">
                <div className={`portfolio-thumb ${cls}`}>
                  <div className="portfolio-thumb-inner">
                    <div className="pthi-bar"></div><div className="pthi-bar sm"></div>
                    <div className="pthi-bar xs"></div>
                    <div className="pthi-row"><div className="pthi-block"></div><div className="pthi-block"></div></div>
                  </div>
                  <div className="portfolio-cat">{cat}</div>
                </div>
                <div className="portfolio-body">
                  <h3>{title}</h3>
                  <p>{desc}</p>
                  <div className="portfolio-tags">{tags.map((t) => <span key={t}>{t}</span>)}</div>
                  <Link href="/contact-us" className="portfolio-view">View Project <i className="fas fa-arrow-right"></i></Link>
                </div>
              </div>
            ))}
          </div>
          <div className="portfolio-cta">
            <Link href="/portfolio" className="btn btn-primary">View All Projects <i className="fas fa-arrow-right"></i></Link>
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="blog" id="blog">
        <div className="container">
          <div className="section-head">
            <div className="badge badge-orange"><i className="fas fa-pen-nib"></i> Insights</div>
            <h2>Ideas To Help Your Business Grow</h2>
            <p>Practical guides, strategies and insights on digital marketing, web design, local SEO and AI for business.</p>
          </div>
          <div className="blog-grid">
            {[
              { cls: 'bb-1', icon: 'fa-robot', cat: 'AI For Business', title: 'How AI Can Help Small Businesses Save Time and Grow Faster', desc: 'Practical examples of AI tools and workflows that small businesses can implement today to automate tasks and improve customer experience.', time: '6 min read' },
              { cls: 'bb-2', icon: 'fa-map-marker-alt', cat: 'Local SEO', title: 'Why Local SEO Matters More Than Ever For Small Businesses', desc: 'How local search has changed, why Google Maps ranking is critical for local businesses and what steps to take to improve your local visibility.', time: '7 min read' },
              { cls: 'bb-3', icon: 'fa-laptop-code', cat: 'Web Design', title: 'How To Build a Business Website That Actually Generates Leads', desc: 'The key elements of a high-converting business website — from clear messaging and trust signals to strategic calls-to-action and fast performance.', time: '8 min read' },
            ].map(({ cls, icon, cat, title, desc, time }) => (
              <div key={title} className="blog-card">
                <div className={`blog-thumb ${cls}`}><i className={`fas ${icon}`}></i></div>
                <div className="blog-body">
                  <div className="blog-cat">{cat}</div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                  <div className="blog-meta">
                    <span><i className="fas fa-clock"></i> {time}</span>
                    <Link href="/blog" className="blog-read">Read Article <i className="fas fa-arrow-right"></i></Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="blog-cta">
            <Link href="/blog" className="btn btn-outline">View All Insights <i className="fas fa-arrow-right"></i></Link>
          </div>
        </div>
      </section>

      {/* ABOUT STRIP */}
      <section className="about-strip">
        <div className="container about-strip-inner">
          <div className="about-content">
            <div className="badge badge-orange"><i className="fas fa-building"></i> About Calidigi</div>
            <h2>We Combine <em>Creativity,</em><br />Technology &amp; Strategy</h2>
            <p>Calidigi is a California-based digital growth company bringing together design, marketing, SEO, AI and strategy to help businesses build a stronger digital presence and achieve real growth.</p>
            <p>We focus on solving business problems with the right combination of tools and expertise — not on impressing you with technology for its own sake.</p>
            <div className="about-pillars">
              {['Design', 'Digital Marketing', 'Local SEO', 'AI Solutions', 'Strategy', 'Lead Generation'].map((p) => (
                <span key={p} className="about-pill">{p}</span>
              ))}
            </div>
            <Link href="/about" className="btn btn-primary">Learn About Calidigi <i className="fas fa-arrow-right"></i></Link>
          </div>
          <div className="about-visual-grid">
            <div className="av-card"><span className="av-num">150+</span><span className="av-lbl">Businesses Helped</span></div>
            <div className="av-card"><span className="av-num">5★</span><span className="av-lbl">Client Reviews</span></div>
            <div className="av-card"><span className="av-num">6</span><span className="av-lbl">Core Services</span></div>
            <div className="av-card"><span className="av-num">CA</span><span className="av-lbl">Based &amp; Focused</span></div>
            <div className="av-card accent">
              <div><span className="av-num">AI + Digital</span><span className="av-lbl">Combined Approach</span></div>
              <p>The right mix of creativity, SEO, AI and strategy for your business goals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta" id="contact">
        <div className="final-cta-glow"></div>
        <div className="container final-cta-inner">
          <div className="badge badge-white"><i className="fas fa-rocket"></i> Let&apos;s Get Started</div>
          <h2>Ready To Turn Your Digital Presence<br />Into <em>Business Growth?</em></h2>
          <p>Let&apos;s build a website, marketing strategy and digital system that works for your business — and brings you real, measurable results.</p>
          <div className="final-cta-actions">
            <a href="mailto:sales@calidigi.com" className="btn btn-primary">Let&apos;s Grow Your Business <i className="fas fa-arrow-right"></i></a>
            <a href="tel:+15550001234" className="btn btn-outline-white"><i className="fas fa-phone"></i> Talk To Our Team</a>
          </div>
        </div>
      </section>
    </>
  )
}
