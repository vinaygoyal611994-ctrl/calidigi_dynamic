import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Calidigi — California Digital Growth Company',
  description:
    'Calidigi is a California-based digital solutions company. We work with businesses to identify real challenges, design practical digital solutions and help them improve their online presence and growth.',
  alternates: {
    canonical: 'https://www.calidigi.com/about',
    languages: { 'en-US': 'https://www.calidigi.com/about', 'x-default': 'https://www.calidigi.com/about' },
  },
  openGraph: {
    url: 'https://www.calidigi.com/about',
    title: 'About Calidigi — California Digital Growth & AI Technology Company',
    description: 'Learn about Calidigi — a California-based digital solutions company helping businesses solve real problems through web design, digital marketing, local SEO, AI solutions and technology consulting.',
  },
  twitter: {
    title: 'About Calidigi — California Digital Growth & AI Technology Company',
    description: 'Learn about Calidigi — a California-based digital solutions company helping businesses solve real problems through web design, digital marketing, local SEO, AI solutions and technology consulting.',
  },
}

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': 'https://www.calidigi.com/about#webpage',
        url: 'https://www.calidigi.com/about',
        name: 'About Calidigi — California Digital Growth & AI Technology Company',
        description: 'Learn about Calidigi — a California-based digital solutions company helping businesses solve real problems.',
        isPartOf: { '@id': 'https://www.calidigi.com/#website' },
        about: { '@id': 'https://www.calidigi.com/#organization' },
        breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.calidigi.com/' }, { '@type': 'ListItem', position: 2, name: 'About', item: 'https://www.calidigi.com/about' }] },
      },
      {
        '@type': 'Organization',
        '@id': 'https://www.calidigi.com/#organization',
        name: 'Calidigi',
        url: 'https://www.calidigi.com',
        foundingDate: '2020',
        foundingLocation: 'San Francisco, California, USA',
        numberOfEmployees: { '@type': 'QuantitativeValue', value: 25 },
        description: 'California digital growth company offering web design, digital marketing, local SEO, AI solutions and branding.',
        address: { '@type': 'PostalAddress', streetAddress: '1234 Digital Ave, Suite 500', addressLocality: 'San Francisco', addressRegion: 'CA', postalCode: '94103', addressCountry: 'US' },
        telephone: '+15550001234',
        email: 'sales@calidigi.com',
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* HERO */}
      <section className="about-hero">
        <div className="about-hero-glow"></div>
        <div className="about-hero-glow-2"></div>
        <div className="container about-hero-inner">
          <div className="about-hero-content">
            <div className="badge badge-white"><i className="fas fa-building"></i> About Calidigi</div>
            <h1>Turning Business Challenges Into<br /><em>Digital Solutions.</em></h1>
            <p>We work with businesses to identify real challenges, design practical digital solutions and help them improve their online presence, operations, customer experience and growth — not just build websites.</p>
            <div className="about-hero-actions">
              <Link href="/contact-us" className="btn btn-primary">Let&apos;s Talk About Your Business <i className="fas fa-arrow-right"></i></Link>
              <Link href="/solutions" className="btn btn-outline-white">Explore Our Solutions</Link>
            </div>
          </div>
          <div className="about-hero-visual">
            <div className="about-flow-card">
              {[
                { icon: 'fa-magnifying-glass', title: 'Understand', desc: 'Understand your business, goals and customers' },
                { icon: 'fa-crosshairs', title: 'Identify', desc: 'Identify the real problem and root cause' },
                { icon: 'fa-lightbulb', title: 'Strategize', desc: 'Define the right digital or AI approach' },
                { icon: 'fa-hammer', title: 'Build', desc: 'Design and develop the right solution' },
                { icon: 'fa-chart-line', title: 'Optimize', desc: 'Measure, improve and grow continuously' },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="about-flow-item">
                  <div className="aflow-num"><i className={`fas ${icon}`} style={{ fontSize: '0.8rem' }}></i></div>
                  <div className="aflow-text"><strong>{title}</strong><span>{desc}</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="about-who" id="who">
        <div className="container about-who-inner">
          <div className="about-who-content">
            <div className="badge badge-orange"><i className="fas fa-users"></i> Who We Are</div>
            <h2>A Digital Partner That Starts With <em>Your Business,</em> Not Our Services</h2>
            <p>Calidigi is a California-based digital solutions company. We work with small businesses, growing companies and entrepreneurs to understand their specific goals and challenges before recommending any solution.</p>
            <p>We don&apos;t start by pitching our services. We start by asking questions — about your business, your customers, your competitors and what&apos;s holding you back from growing online.</p>
            <div className="about-flow-pills">
              <div className="flow-pill active"><i className="fas fa-circle-dot" style={{ fontSize: '0.6rem' }}></i> Understand</div>
              <div className="flow-arrow"><i className="fas fa-arrow-right"></i></div>
              <div className="flow-pill">Identify</div>
              <div className="flow-arrow"><i className="fas fa-arrow-right"></i></div>
              <div className="flow-pill">Strategize</div>
              <div className="flow-arrow"><i className="fas fa-arrow-right"></i></div>
              <div className="flow-pill">Build</div>
              <div className="flow-arrow"><i className="fas fa-arrow-right"></i></div>
              <div className="flow-pill">Optimize</div>
            </div>
            <a href="#approach" className="btn btn-primary">See Our Approach <i className="fas fa-arrow-right"></i></a>
          </div>
          <div className="about-who-visual">
            <div className="who-stat-grid">
              <div className="who-stat-card"><span className="wsc-num">150+</span><span className="wsc-label">Businesses Helped</span></div>
              <div className="who-stat-card"><span className="wsc-num">5★</span><span className="wsc-label">Client Reviews</span></div>
              <div className="who-stat-card"><span className="wsc-num">10+</span><span className="wsc-label">Industries Served</span></div>
              <div className="who-stat-card"><span className="wsc-num">CA</span><span className="wsc-label">Based &amp; Focused</span></div>
              <div className="who-stat-card featured">
                <div><span className="wsc-num">AI + Digital</span><span className="wsc-label">Combined Approach</span></div>
                <p>We combine design, marketing, SEO, AI and automation to solve real business problems.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BELIEFS */}
      <section className="beliefs" id="beliefs">
        <div className="container">
          <div className="section-head">
            <div className="badge badge-orange"><i className="fas fa-heart"></i> Our Philosophy</div>
            <h2>What We Believe</h2>
            <p>These principles guide how we approach every business challenge and every client relationship.</p>
          </div>
          <div className="beliefs-grid">
            {[
              { icon: 'fa-magnifying-glass', title: 'Understand the Problem Before Building the Solution', desc: "We never recommend technology without first understanding what business problem needs to be solved. The solution should fit the problem — not the other way around." },
              { icon: 'fa-screwdriver-wrench', title: 'Technology Should Solve a Real Business Need', desc: "We don't apply AI, automation or new platforms for the sake of it. Every technology decision should create genuine business value." },
              { icon: 'fa-fingerprint', title: 'Every Business Needs a Different Strategy', desc: "A local restaurant, a healthcare clinic and a tech startup have different challenges. We build strategies around specific business goals, not generic templates." },
              { icon: 'fa-leaf', title: 'Simple, Useful Solutions Create Better Experiences', desc: "Complexity rarely serves the customer. We design solutions that are easy to use, easy to understand and easy to maintain." },
              { icon: 'fa-robot', title: 'AI Should Create Measurable Business Value', desc: "AI is a tool, not a trend. We apply it where it can automate real tasks, improve customer experience or generate better business insights." },
              { icon: 'fa-arrow-up-right-dots', title: 'Digital Transformation Should Be Practical and Scalable', desc: "We build solutions that work today and can grow with your business. Not over-engineered systems that become a burden." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="belief-card">
                <div className="belief-icon"><i className={`fas ${icon}`}></i></div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="approach" id="approach">
        <div className="container">
          <div className="section-head">
            <div className="badge badge-orange"><i className="fas fa-route"></i> How We Work</div>
            <h2>Our Approach to Every Client</h2>
            <p>A structured consulting and implementation process designed around your business — not around our service catalog.</p>
          </div>
          <div className="approach-steps">
            {[
              { num: 'Step 01', icon: 'fa-magnifying-glass', title: 'Discover', desc: 'We start by understanding your business — your customers, current digital presence, goals, competitors and the challenges preventing growth.' },
              { num: 'Step 02', icon: 'fa-chart-bar', title: 'Analyze', desc: 'We identify gaps, inefficiencies, missed opportunities and root causes — before making any recommendations.' },
              { num: 'Step 03', icon: 'fa-lightbulb', title: 'Strategize', desc: "We define the right approach — whether that's web design, SEO, digital marketing, AI automation or a combination — based on your specific goals." },
              { num: 'Step 04', icon: 'fa-hammer', title: 'Build', desc: 'We design and develop the solution — whether a website, marketing campaign, AI workflow, SEO strategy or automation system.' },
              { num: 'Step 05', icon: 'fa-rocket', title: 'Launch', desc: 'We deploy, test and measure the solution — and make any refinements needed before going live at full scale.' },
              { num: 'Step 06', icon: 'fa-seedling', title: 'Grow', desc: 'We continuously improve based on real business data and customer feedback — so your digital presence evolves alongside your business.' },
            ].map(({ num, icon, title, desc }) => (
              <div key={title} className="approach-step">
                <div className="approach-step-num">{num}</div>
                <div className="approach-step-icon"><i className={`fas ${icon}`}></i></div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="what-we-do" id="services">
        <div className="container">
          <div className="section-head">
            <div className="badge badge-orange"><i className="fas fa-briefcase"></i> What We Do</div>
            <h2>Digital Solutions Built Around Business Outcomes</h2>
            <p>We don&apos;t offer a service catalog. We offer solutions built around what your business actually needs to grow.</p>
          </div>
          <div className="wwd-grid">
            {[
              { icon: 'fa-laptop-code', title: 'Digital Experiences', subtitle: 'Websites and applications that convert visitors into customers', items: ['Website Design & Development', 'Landing Pages', 'Web Applications', 'UX / UI Design', 'E-Commerce Development', 'Website Redesign'] },
              { icon: 'fa-bullhorn', title: 'Growth & Marketing', subtitle: 'Strategies that increase visibility, traffic and qualified leads', items: ['Search Engine Optimization', 'Local SEO', 'Digital Marketing', 'Content Strategy', 'Conversion Optimization', 'Lead Generation'] },
              { icon: 'fa-robot', title: 'AI & Automation', subtitle: 'Intelligent solutions that reduce repetitive work and improve customer experience', items: ['AI Solutions & Assistants', 'Business Automation', 'AI-Powered Workflows', 'Intelligent Data Solutions', 'AI Voice Agents', 'Custom AI Development'] },
              { icon: 'fa-microchip', title: 'Technology Consulting', subtitle: 'Strategic technology decisions that align with your business goals', items: ['Digital Transformation', 'Business Process Optimization', 'Custom Software Solutions', 'Analytics & Reporting', 'CRM Integration', 'API & System Integration'] },
            ].map(({ icon, title, subtitle, items }) => (
              <div key={title} className="wwd-card">
                <div className="wwd-card-head">
                  <div className="wwd-icon"><i className={`fas ${icon}`}></i></div>
                  <div><h3>{title}</h3><p>{subtitle}</p></div>
                </div>
                <ul className="wwd-list">
                  {items.map((item) => <li key={item}><i className="fas fa-check"></i> {item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="industries" id="industries">
        <div className="container">
          <div className="section-head">
            <div className="badge badge-orange"><i className="fas fa-building-columns"></i> Industries</div>
            <h2>Industries We Support</h2>
            <p>We work with businesses across a wide range of industries — each with unique challenges that require a tailored digital approach.</p>
          </div>
          <div className="industries-grid">
            {[
              { icon: 'fa-heart-pulse', label: 'Healthcare' }, { icon: 'fa-house', label: 'Real Estate' },
              { icon: 'fa-cart-shopping', label: 'E-Commerce' }, { icon: 'fa-graduation-cap', label: 'Education' },
              { icon: 'fa-briefcase', label: 'Professional Services' }, { icon: 'fa-coins', label: 'Finance' },
              { icon: 'fa-scale-balanced', label: 'Legal' }, { icon: 'fa-truck', label: 'Logistics' },
              { icon: 'fa-concierge-bell', label: 'Hospitality' }, { icon: 'fa-solar-panel', label: 'Solar & Energy' },
              { icon: 'fa-industry', label: 'Manufacturing' }, { icon: 'fa-rocket', label: 'Startups' },
              { icon: 'fa-store', label: 'Local Businesses' }, { icon: 'fa-spa', label: 'Wellness & Beauty' },
            ].map(({ icon, label }) => (
              <div key={label} className="industry-pill"><i className={`fas ${icon}`}></i> {label}</div>
            ))}
          </div>
          <div className="industries-cta">
            <p>Have a different industry or business challenge? Let&apos;s discuss it.</p>
            <Link href="/contact-us" className="btn btn-primary">Talk To Us <i className="fas fa-arrow-right"></i></Link>
          </div>
        </div>
      </section>

      {/* WHY CALIDIGI */}
      <section className="why-calidigi" id="why">
        <div className="why-glow"></div>
        <div className="why-glow-2"></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="section-head light">
            <div className="badge badge-white"><i className="fas fa-star"></i> Why Calidigi</div>
            <h2>Why Businesses Choose Calidigi</h2>
            <p>We&apos;re not a generic digital agency. We&apos;re a business problem-solving partner that happens to use digital technology.</p>
          </div>
          <div className="why-grid">
            {[
              { icon: 'fa-bullseye', title: 'Business-First Thinking', desc: 'We start by understanding your business problem — not by pitching our services. The right solution comes from the right question.' },
              { icon: 'fa-screwdriver-wrench', title: 'Practical Solutions', desc: 'Solutions are designed around actual business requirements and available resources — not over-engineered for show.' },
              { icon: 'fa-robot', title: 'Technology + AI Where It Matters', desc: 'Modern technologies and AI are applied where they create genuine business value — not as buzzwords or unnecessary complexity.' },
              { icon: 'fa-circle-nodes', title: 'End-to-End Support', desc: 'From strategy and design to development, marketing, automation and optimization — we support the full journey.' },
              { icon: 'fa-arrow-up-right-dots', title: 'Scalable Approach', desc: 'Solutions are built to evolve. As your business grows, your digital systems should be capable of growing with it.' },
              { icon: 'fa-handshake', title: 'Long-Term Partnership', desc: "We're not here for a one-time project. We aim to be a trusted digital partner that understands your business over time." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="why-card">
                <div className="why-card-icon"><i className={`fas ${icon}`}></i></div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta" id="contact">
        <div className="final-cta-glow"></div>
        <div className="container final-cta-inner">
          <div className="badge badge-white"><i className="fas fa-rocket"></i> Let&apos;s Get Started</div>
          <h2>Ready To Work With A Partner That<br /><em>Starts With Your Business?</em></h2>
          <p>Let&apos;s have a conversation about your business goals, challenges and what digital solutions could help you grow.</p>
          <div className="final-cta-actions">
            <Link href="/contact-us" className="btn btn-primary">Let&apos;s Talk About Your Business <i className="fas fa-arrow-right"></i></Link>
            <a href="tel:+15550001234" className="btn btn-outline-white"><i className="fas fa-phone"></i> Call Our Team</a>
          </div>
        </div>
      </section>
    </>
  )
}
