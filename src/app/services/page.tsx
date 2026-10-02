import type { Metadata } from 'next'
import Link from 'next/link'
import ServicesFaq from '@/components/ServicesFaq'

export const metadata: Metadata = {
  title: 'Digital Marketing, Web Design, SEO & AI Services | Calidigi',
  description:
    "Explore Calidigi's full range of digital services: Digital Marketing, Web Design & Development, Local SEO, Branding, AI Solutions and Business Growth Solutions for California businesses.",
  alternates: {
    canonical: 'https://www.calidigi.com/services',
    languages: { 'en-US': 'https://www.calidigi.com/services', 'x-default': 'https://www.calidigi.com/services' },
  },
  openGraph: {
    url: 'https://www.calidigi.com/services',
    title: 'Digital Marketing, Web Design & SEO Services | Calidigi California',
    description: "Explore Calidigi's full range of digital services: Digital Marketing, Web Design & Development, Local SEO, Branding, AI Solutions and Business Growth Solutions for California businesses.",
  },
  twitter: {
    title: 'Digital Marketing, Web Design & SEO Services | Calidigi California',
    description: "Explore Calidigi's full range of digital services: Digital Marketing, Web Design & Development, Local SEO, Branding, AI Solutions and Business Growth Solutions for California businesses.",
  },
}

export default function ServicesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://www.calidigi.com/services#webpage',
        url: 'https://www.calidigi.com/services',
        name: 'Digital Marketing, Web Design & SEO Services | Calidigi California',
        description: "Explore Calidigi's full range of digital services for California businesses.",
        isPartOf: { '@id': 'https://www.calidigi.com/#website' },
        breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.calidigi.com/' }, { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://www.calidigi.com/services' }] },
      },
      {
        '@type': 'Service',
        '@id': 'https://www.calidigi.com/services#service-digital-marketing',
        serviceType: 'Digital Marketing',
        name: 'Digital Marketing Services',
        description: 'Turn digital visibility into measurable business opportunities. SEO, content marketing, social media, paid campaigns and lead generation.',
        provider: { '@id': 'https://www.calidigi.com/#organization' },
        areaServed: { '@type': 'State', name: 'California' },
        url: 'https://www.calidigi.com/services',
      },
      {
        '@type': 'Service',
        '@id': 'https://www.calidigi.com/services#service-web-design',
        serviceType: 'Web Design and Development',
        name: 'Web Design & Development',
        description: 'High-performance business websites that convert visitors into customers — built for speed, SEO and user experience.',
        provider: { '@id': 'https://www.calidigi.com/#organization' },
        areaServed: { '@type': 'State', name: 'California' },
        url: 'https://www.calidigi.com/services',
      },
      {
        '@type': 'Service',
        '@id': 'https://www.calidigi.com/services#service-local-seo',
        serviceType: 'Local SEO',
        name: 'Local SEO Services',
        description: 'Help customers find your business on Google Maps and local search — Google Business Profile optimization, local citations and review management.',
        provider: { '@id': 'https://www.calidigi.com/#organization' },
        areaServed: { '@type': 'State', name: 'California' },
        url: 'https://www.calidigi.com/services',
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://www.calidigi.com/services#faq',
        mainEntity: [
          { '@type': 'Question', name: 'What types of businesses does Calidigi work with?', acceptedAnswer: { '@type': 'Answer', text: 'Calidigi works with small to mid-sized businesses across California — from local service businesses and retail stores to startups and growing companies that need a stronger digital presence and more customers.' } },
          { '@type': 'Question', name: 'How long does it take to build a business website?', acceptedAnswer: { '@type': 'Answer', text: 'Most business websites take 4–8 weeks from discovery to launch, depending on the scope, number of pages, custom features required, and how quickly content and approvals are provided.' } },
          { '@type': 'Question', name: 'Do you offer local SEO services in California?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Local SEO is one of our core service areas. We help California businesses rank on Google Maps, optimize their Google Business Profile, build local citations, and generate customer reviews.' } },
          { '@type': 'Question', name: 'How is Calidigi different from other digital agencies?', acceptedAnswer: { '@type': 'Answer', text: 'We are strategy-first, not service-first. We start every engagement by understanding your specific business challenge — then we recommend and build only what you actually need to grow.' } },
          { '@type': 'Question', name: 'What does AI Solutions mean for a small business?', acceptedAnswer: { '@type': 'Answer', text: 'For small businesses, AI solutions typically mean chatbots for customer service, AI-powered content tools, automated follow-up sequences, smart lead scoring, and workflow automations that save hours every week.' } },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* ── 1. HERO ── */}
      <section className="svc-hero" id="home">
        <div className="svc-hero-glow"></div>
        <div className="svc-hero-glow-2"></div>
        <div className="container svc-hero-inner">
          <div className="svc-hero-content">
            <div className="badge badge-white"><i className="fas fa-bolt"></i> Calidigi Services</div>
            <h1>Digital Solutions Built to<br /><em>Move Your Business Forward</em></h1>
            <p>From digital marketing and web design to local SEO, branding, and AI-powered solutions, Calidigi helps businesses build a stronger digital presence and create measurable opportunities for growth.</p>
            <div className="svc-hero-actions">
              <Link href="/contact-us" className="btn btn-primary">Let&apos;s Grow Your Business <i className="fas fa-arrow-right"></i></Link>
              <Link href="/services" className="btn btn-outline-white">Explore Our Services</Link>
            </div>
            <div className="svc-hero-proof">
              <div className="svc-hero-proof-item"><i className="fas fa-check-circle"></i><span>Strategy-first approach</span></div>
              <div className="svc-hero-proof-item"><i className="fas fa-check-circle"></i><span>150+ businesses helped</span></div>
              <div className="svc-hero-proof-item"><i className="fas fa-check-circle"></i><span>6 core service areas</span></div>
            </div>
          </div>
          <div className="svc-hero-visual">
            <div className="svc-eco-card">
              <div className="svc-eco-header">
                <span className="svc-eco-header-title">Calidigi Service Ecosystem</span>
                <div className="svc-eco-dot"></div>
              </div>
              <div className="svc-eco-grid">
                <div className="svc-eco-item"><div className="svc-eco-item-icon"><i className="fas fa-chart-line"></i></div><span>Digital Marketing</span></div>
                <div className="svc-eco-item"><div className="svc-eco-item-icon"><i className="fas fa-code"></i></div><span>Web Design</span></div>
                <div className="svc-eco-item"><div className="svc-eco-item-icon"><i className="fas fa-map-location-dot"></i></div><span>Local SEO</span></div>
                <div className="svc-eco-center-row svc-eco-item"><div className="svc-eco-item-icon"><i className="fas fa-rocket"></i></div><span>Calidigi Growth Platform</span></div>
                <div className="svc-eco-item"><div className="svc-eco-item-icon"><i className="fas fa-palette"></i></div><span>Branding</span></div>
                <div className="svc-eco-item"><div className="svc-eco-item-icon"><i className="fas fa-brain"></i></div><span>AI Solutions</span></div>
                <div className="svc-eco-item"><div className="svc-eco-item-icon"><i className="fas fa-seedling"></i></div><span>Growth Solutions</span></div>
              </div>
              <div className="svc-eco-footer">
                <div className="svc-eco-dot"></div>
                <span>Integrated digital solutions designed around your business goals</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. SERVICE CATEGORIES ── */}
      <section className="svc-categories" id="services">
        <div className="container">
          <div className="section-head">
            <div className="badge badge-orange"><i className="fas fa-th-large"></i> Our Services</div>
            <h2>Six Core <em className="text-orange">Service Areas</em> Built Around Business Growth</h2>
            <p>Every service Calidigi offers is designed to help businesses solve specific challenges, improve their digital presence, and create opportunities for sustainable growth.</p>
          </div>
          <div className="svc-main-grid">
            <div className="svc-main-card">
              <span className="svc-main-num">01 — Digital Marketing</span>
              <div className="svc-main-icon"><i className="fas fa-chart-line"></i></div>
              <h3>Digital Marketing</h3>
              <p>Turn digital visibility into measurable business opportunities. We help businesses attract the right audience, increase online presence, and generate qualified leads.</p>
              <div className="svc-tags">
                <span className="svc-tag">Search Engine Optimization</span><span className="svc-tag">Content Marketing</span>
                <span className="svc-tag">Social Media Marketing</span><span className="svc-tag">Paid Campaign Strategy</span>
                <span className="svc-tag">Lead Generation</span><span className="svc-tag">Analytics &amp; Reporting</span>
              </div>
              <Link href="/contact-us" className="svc-explore-link">Explore Digital Marketing <i className="fas fa-arrow-right"></i></Link>
            </div>

            <div className="svc-main-card">
              <span className="svc-main-num">02 — Web Design &amp; Development</span>
              <div className="svc-main-icon"><i className="fas fa-code"></i></div>
              <h3>Web Design &amp; Development</h3>
              <p>Create modern, responsive, high-performing digital experiences that turn visitors into customers and communicate your brand&apos;s value at every touchpoint.</p>
              <div className="svc-tags">
                <span className="svc-tag">Website Design</span><span className="svc-tag">Website Development</span>
                <span className="svc-tag">Landing Pages</span><span className="svc-tag">E-commerce</span>
                <span className="svc-tag">CMS Development</span><span className="svc-tag">Conversion Optimization</span>
                <span className="svc-tag">Website Performance</span>
              </div>
              <Link href="/contact-us" className="svc-explore-link">Explore Web Design <i className="fas fa-arrow-right"></i></Link>
            </div>

            <div className="svc-main-card">
              <span className="svc-main-num">03 — Local SEO</span>
              <div className="svc-main-icon"><i className="fas fa-map-location-dot"></i></div>
              <h3>Local SEO</h3>
              <p>Help businesses become more visible when customers search for services in their local area. We build strategies that improve discoverability and local authority.</p>
              <div className="svc-tags">
                <span className="svc-tag">Google Business Profile</span><span className="svc-tag">Local Keyword Strategy</span>
                <span className="svc-tag">Local Citations</span><span className="svc-tag">Reputation Management</span>
                <span className="svc-tag">Local Content</span><span className="svc-tag">Location-Based SEO</span>
                <span className="svc-tag">Local Analytics</span>
              </div>
              <Link href="/contact-us" className="svc-explore-link">Explore Local SEO <i className="fas fa-arrow-right"></i></Link>
            </div>

            <div className="svc-main-card">
              <span className="svc-main-num">04 — Branding &amp; Creative</span>
              <div className="svc-main-icon"><i className="fas fa-palette"></i></div>
              <h3>Branding &amp; Creative</h3>
              <p>Build a consistent, memorable brand identity that communicates your value and stands out in a competitive market — from logo to full visual identity systems.</p>
              <div className="svc-tags">
                <span className="svc-tag">Brand Strategy</span><span className="svc-tag">Logo Design</span>
                <span className="svc-tag">Visual Identity</span><span className="svc-tag">Brand Guidelines</span>
                <span className="svc-tag">Marketing Materials</span><span className="svc-tag">Creative Design</span>
                <span className="svc-tag">Digital Brand Assets</span>
              </div>
              <Link href="/contact-us" className="svc-explore-link">Explore Branding <i className="fas fa-arrow-right"></i></Link>
            </div>

            <div className="svc-main-card">
              <span className="svc-main-num">05 — AI Solutions</span>
              <div className="svc-main-icon"><i className="fas fa-brain"></i></div>
              <h3>AI Solutions</h3>
              <p>Help businesses use AI to improve productivity, enhance customer experiences, automate processes, and make better decisions with data-driven intelligence.</p>
              <div className="svc-tags">
                <span className="svc-tag">AI Strategy</span><span className="svc-tag">AI Automation</span>
                <span className="svc-tag">AI-Powered Workflows</span><span className="svc-tag">AI Chatbots</span>
                <span className="svc-tag">AI Content Solutions</span><span className="svc-tag">AI Data Analysis</span>
                <span className="svc-tag">Custom AI Integrations</span>
              </div>
              <Link href="/contact-us" className="svc-explore-link">Explore AI Solutions <i className="fas fa-arrow-right"></i></Link>
            </div>

            <div className="svc-main-card">
              <span className="svc-main-num">06 — Business Growth Solutions</span>
              <div className="svc-main-icon"><i className="fas fa-seedling"></i></div>
              <h3>Business Growth Solutions</h3>
              <p>Combine technology, marketing, branding, and automation to solve specific business challenges — designed for businesses ready to scale their digital operations.</p>
              <div className="svc-tags">
                <span className="svc-tag">Digital Strategy</span><span className="svc-tag">Lead Generation Systems</span>
                <span className="svc-tag">Marketing Automation</span><span className="svc-tag">Customer Journey Optimization</span>
                <span className="svc-tag">Business Process Automation</span><span className="svc-tag">Digital Transformation</span>
              </div>
              <Link href="/contact-us" className="svc-explore-link">Explore Growth Solutions <i className="fas fa-arrow-right"></i></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. CHALLENGE ── */}
      <section className="svc-challenge" id="challenges">
        <div className="container">
          <div className="section-head">
            <div className="badge badge-orange"><i className="fas fa-magnifying-glass"></i> Problem-Focused</div>
            <h2>What Business Challenge <em className="text-orange">Are You Solving?</em></h2>
            <p>Calidigi doesn&apos;t start with a list of services — we start by understanding your business problem. Here are the challenges we most commonly help businesses work through.</p>
          </div>
          <div className="challenge-grid">
            {[
              { icon: 'fa-bullseye', q: '"We need more leads from our website"', s: 'Lead Generation + SEO + Landing Page Optimization + Conversion Strategy' },
              { icon: 'fa-globe', q: '"Customers can\'t find us locally on Google"', s: 'Local SEO + Google Business Profile Optimization + Local Content Strategy' },
              { icon: 'fa-laptop-code', q: '"Our website doesn\'t reflect our business quality"', s: 'Website Redesign + UX/UI + Conversion Optimization + Brand Alignment' },
              { icon: 'fa-robot', q: '"Our business processes are too manual and slow"', s: 'AI Automation + Digital Workflows + Business Process Automation' },
              { icon: 'fa-star', q: '"Our brand doesn\'t stand out from competitors"', s: 'Brand Strategy + Visual Identity + Creative Design + Digital Brand Assets' },
              { icon: 'fa-lightbulb', q: '"We don\'t know where to start with digital growth"', s: 'Digital Strategy Consultation + Roadmap Development + Priority Planning' },
            ].map(({ icon, q, s }) => (
              <div key={q} className="challenge-card">
                <div className="challenge-icon"><i className={`fas ${icon}`}></i></div>
                <h4>{q}</h4>
                <div className="challenge-divider">
                  <div className="challenge-divider-line"></div>
                  <span className="challenge-divider-text">Calidigi Solution</span>
                  <div className="challenge-divider-line"></div>
                </div>
                <div className="challenge-solution">{s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. SPOTLIGHT ── */}
      <section className="svc-spotlight" id="spotlight">
        <div className="container svc-spotlight-inner">
          <div className="spotlight-content">
            <div className="badge badge-orange"><i className="fas fa-rocket"></i> Featured Approach</div>
            <h2>Digital Growth Starts With the <em>Right Strategy</em></h2>
            <p>Most businesses need more than a single service. Real digital growth happens when the right combination of strategy, design, technology, and marketing work together — not in isolation.</p>
            <div className="spotlight-points">
              <div className="spotlight-point"><div className="sp-icon"><i className="fas fa-check"></i></div><span>We start by understanding your business goals and customer journey</span></div>
              <div className="spotlight-point"><div className="sp-icon"><i className="fas fa-check"></i></div><span>We build the right combination of services around your specific challenge</span></div>
              <div className="spotlight-point"><div className="sp-icon"><i className="fas fa-check"></i></div><span>We measure impact and continuously optimize for better results</span></div>
              <div className="spotlight-point"><div className="sp-icon"><i className="fas fa-check"></i></div><span>We use AI and automation where they create real business value</span></div>
            </div>
            <Link href="/contact-us" className="btn btn-primary">Build Your Digital Growth Strategy <i className="fas fa-arrow-right"></i></Link>
          </div>
          <div className="spotlight-visual">
            <div className="sv-flow-card">
              <span className="sv-flow-label">Digital Growth Journey</span>
              {[
                { cls: 'sv-orange', icon: 'fa-magnifying-glass', title: 'Business Strategy', desc: 'Understand goals, audience & competitive landscape' },
                { cls: 'sv-blue', icon: 'fa-palette', title: 'Brand Identity', desc: 'Build a consistent visual identity and brand voice' },
                { cls: 'sv-navy', icon: 'fa-code', title: 'Website & Digital Experience', desc: 'Design and build high-converting digital touchpoints' },
                { cls: 'sv-teal', icon: 'fa-map-location-dot', title: 'SEO & Local Visibility', desc: 'Get found by the right customers in the right places' },
                { cls: 'sv-purple', icon: 'fa-brain', title: 'AI & Automation', desc: 'Automate workflows, enhance experiences, improve decisions' },
                { cls: 'sv-green', icon: 'fa-chart-line', title: 'Marketing & Lead Generation', desc: 'Drive traffic, generate leads, convert customers' },
                { cls: 'sv-gold', icon: 'fa-trophy', title: 'Business Growth', desc: 'Measurable results: more customers, more revenue' },
              ].map(({ cls, icon, title, desc }, i, arr) => (
                <>
                  <div key={title} className="sv-step">
                    <div className={`sv-step-icon ${cls}`}><i className={`fas ${icon}`}></i></div>
                    <div className="sv-step-info"><strong>{title}</strong><span>{desc}</span></div>
                  </div>
                  {i < arr.length - 1 && <div key={`arr-${i}`} className="sv-arrow"></div>}
                </>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. WHY CALIDIGI ── */}
      <section className="svc-why" id="why">
        <div className="svc-why-glow"></div>
        <div className="svc-why-glow-2"></div>
        <div className="container">
          <div className="section-head light">
            <div className="badge badge-white"><i className="fas fa-award"></i> Why Choose Us</div>
            <h2>More Than a Service Provider.<br />A Digital <em>Growth Partner.</em></h2>
            <p>Calidigi combines strategy, design, technology, and AI to deliver integrated digital solutions — not isolated services that don&apos;t connect to your business goals.</p>
          </div>
          <div className="svc-why-grid">
            {[
              { icon: 'fa-crosshairs', title: 'Strategy First', desc: 'We start with your business objective before recommending any technology, service, or marketing activity. Solutions follow strategy — not the other way around.' },
              { icon: 'fa-puzzle-piece', title: 'Integrated Solutions', desc: 'Branding, web, SEO, marketing, and AI working together — not isolated services that create disconnected experiences. We build cohesive digital ecosystems.' },
              { icon: 'fa-building', title: 'Business-Focused', desc: 'Every solution we recommend connects to a measurable business objective — more leads, better visibility, stronger brand, or improved efficiency. No vanity metrics.' },
              { icon: 'fa-microchip', title: 'Modern Technology', desc: 'We use modern digital tools, AI, and automation where they create real business value — not just because they\'re new or interesting. Practical intelligence over novelty.' },
              { icon: 'fa-arrows-up-to-line', title: 'Scalable Approach', desc: 'We build solutions designed to evolve as your business grows — not quick fixes that need to be rebuilt every year. Sustainable digital infrastructure from day one.' },
              { icon: 'fa-handshake', title: 'Long-Term Partnership', desc: 'We support businesses beyond the initial project — through ongoing SEO, marketing, technical improvements, and strategic guidance as your market evolves.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="svc-why-card">
                <div className="svc-why-icon"><i className={`fas ${icon}`}></i></div>
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. APPROACH ── */}
      <section className="svc-approach" id="approach">
        <div className="container">
          <div className="section-head">
            <div className="badge badge-orange"><i className="fas fa-route"></i> Our Process</div>
            <h2>How We Deliver <em className="text-orange">Results</em></h2>
            <p>A structured, repeatable approach that keeps every project aligned to your business goals from first conversation to long-term growth.</p>
          </div>
          <div className="approach-timeline">
            {[
              { n: '01', title: 'Discover', desc: 'Understand the business, audience, challenges, and growth objectives before proposing anything.' },
              { n: '02', title: 'Strategize', desc: 'Develop the right digital strategy, service combination, and solution roadmap for your specific situation.' },
              { n: '03', title: 'Design', desc: 'Create the experience, brand identity, and digital interfaces that communicate value and convert visitors.' },
              { n: '04', title: 'Build', desc: 'Develop and integrate the required technology, content, and marketing infrastructure to execute the strategy.' },
              { n: '05', title: 'Launch', desc: 'Deploy, test, and validate the solution — ensuring everything performs as intended from the first day.' },
              { n: '06', title: 'Grow', desc: 'Use data, SEO, marketing, AI, and continuous optimization to improve results and scale digital operations.' },
            ].map(({ n, title, desc }) => (
              <div key={n} className="approach-node">
                <div className="approach-circle">{n}</div>
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. ECOSYSTEM ── */}
      <section className="svc-ecosystem" id="ecosystem">
        <div className="container">
          <div className="eco-intro section-head">
            <div className="badge badge-orange"><i className="fas fa-diagram-project"></i> Integrated Ecosystem</div>
            <h2>A Complete <em className="text-orange">Digital Growth Ecosystem</em></h2>
            <p>Businesses rarely need a single isolated service. The greatest digital growth happens when branding, website, SEO, marketing, AI, and automation work together as a unified ecosystem.</p>
          </div>
          <div className="eco-flow-wrap">
            <div className="eco-node"><div className="eco-node-icon"><i className="fas fa-palette"></i></div><span>Brand Identity</span></div>
            <div className="eco-arr"><i className="fas fa-arrow-right"></i></div>
            <div className="eco-node"><div className="eco-node-icon"><i className="fas fa-code"></i></div><span>Website</span></div>
            <div className="eco-arr"><i className="fas fa-arrow-right"></i></div>
            <div className="eco-node"><div className="eco-node-icon"><i className="fas fa-map-location-dot"></i></div><span>Local SEO</span></div>
            <div className="eco-arr"><i className="fas fa-arrow-right"></i></div>
            <div className="eco-node"><div className="eco-node-icon"><i className="fas fa-chart-line"></i></div><span>Marketing</span></div>
            <div className="eco-arr"><i className="fas fa-arrow-right"></i></div>
            <div className="eco-node"><div className="eco-node-icon"><i className="fas fa-brain"></i></div><span>AI &amp; Automation</span></div>
            <div className="eco-arr"><i className="fas fa-arrow-right"></i></div>
            <div className="eco-node eco-final"><div className="eco-node-icon"><i className="fas fa-trophy"></i></div><span>Business Growth</span></div>
          </div>
          <div className="eco-cta">
            <Link href="/contact-us" className="btn btn-primary">Discuss Your Digital Ecosystem <i className="fas fa-arrow-right"></i></Link>
          </div>
        </div>
      </section>

      {/* ── 8. INDUSTRIES ── */}
      <section className="svc-industries" id="industries">
        <div className="container">
          <div className="section-head">
            <div className="badge badge-orange"><i className="fas fa-industry"></i> Industry Experience</div>
            <h2>We Work With Businesses <em className="text-orange">Across Industries</em></h2>
            <p>Calidigi&apos;s digital services are designed to work across a wide range of business types — from local service providers to growing startups and established organizations.</p>
          </div>
          <div className="industry-pills">
            <div className="ind-pill"><i className="fas fa-stethoscope"></i> Healthcare &amp; Medical</div>
            <div className="ind-pill"><i className="fas fa-shopping-cart"></i> E-Commerce &amp; Retail</div>
            <div className="ind-pill"><i className="fas fa-house"></i> Real Estate</div>
            <div className="ind-pill"><i className="fas fa-briefcase"></i> Professional Services</div>
            <div className="ind-pill"><i className="fas fa-graduation-cap"></i> Education &amp; Training</div>
            <div className="ind-pill"><i className="fas fa-laptop"></i> Technology &amp; SaaS</div>
            <div className="ind-pill"><i className="fas fa-hotel"></i> Hospitality &amp; Tourism</div>
            <div className="ind-pill"><i className="fas fa-store"></i> Local Businesses</div>
            <div className="ind-pill"><i className="fas fa-rocket"></i> Startups</div>
            <div className="ind-pill"><i className="fas fa-utensils"></i> Restaurants &amp; Food</div>
            <div className="ind-pill"><i className="fas fa-hammer"></i> Construction &amp; Trades</div>
            <div className="ind-pill"><i className="fas fa-chart-bar"></i> Financial Services</div>
            <div className="ind-pill"><i className="fas fa-dumbbell"></i> Health &amp; Wellness</div>
            <div className="ind-pill"><i className="fas fa-balance-scale"></i> Legal Services</div>
          </div>
          <div className="ind-cta">
            <Link href="/contact-us" className="btn btn-outline">Discuss Your Industry <i className="fas fa-arrow-right"></i></Link>
          </div>
        </div>
      </section>

      {/* ── 9. RESULTS ── */}
      <section className="svc-results" id="results">
        <div className="container">
          <div className="section-head">
            <div className="badge badge-orange"><i className="fas fa-chart-bar"></i> Business Impact</div>
            <h2>The Types of Outcomes <em className="text-orange">We Help Create</em></h2>
            <p>While every business situation is unique, these are the types of improvements Calidigi&apos;s services are designed to help businesses work toward.</p>
          </div>
          <div className="results-grid">
            {[
              { icon: 'fa-search', title: 'Increase Online Visibility', desc: 'Improve how customers discover your business through search engines, Google Maps, and digital channels — reaching the right people at the right moment.' },
              { icon: 'fa-funnel-dollar', title: 'Generate Better Leads', desc: 'Create digital experiences designed to attract and convert relevant prospects — not just website traffic, but actual business opportunities worth pursuing.' },
              { icon: 'fa-star', title: 'Improve Customer Experience', desc: 'Make digital interactions with your business easier, faster, and more intuitive — from first impression to final conversion and beyond.' },
              { icon: 'fa-robot', title: 'Automate Repetitive Work', desc: 'Use AI and automation to reduce unnecessary manual processes — freeing your team to focus on higher-value work that actually moves the business forward.' },
              { icon: 'fa-award', title: 'Build Brand Authority', desc: 'Create a consistent, professional digital presence that builds trust with potential customers and differentiates your business in a competitive market.' },
              { icon: 'fa-arrows-up-to-line', title: 'Scale Digital Operations', desc: 'Build digital systems, processes, and infrastructure that can evolve as your business grows — without starting from scratch every time you add capacity.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="result-card">
                <div className="result-icon"><i className={`fas ${icon}`}></i></div>
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. CASE STUDIES ── */}
      <section className="svc-cases" id="cases">
        <div className="container">
          <div className="section-head">
            <div className="badge badge-orange"><i className="fas fa-folder-open"></i> Case Studies</div>
            <h2>See How Digital Solutions Solve <em className="text-orange">Real Business Problems</em></h2>
            <p>A sample of the business challenges Calidigi has helped solve through the right combination of strategy, technology, and digital marketing.</p>
          </div>
          <div className="svc-cases-grid">
            <div className="svc-case-card">
              <div className="svc-case-top"><span className="svc-case-industry">Healthcare</span><div className="svc-case-ico"><i className="fas fa-stethoscope"></i></div></div>
              <div className="svc-case-body">
                <div className="svc-case-row"><span className="svc-case-label">Challenge</span><span className="svc-case-text">A local medical practice had low online visibility and was losing patients to competitors who appeared above them in local search results.</span></div>
                <div className="svc-case-row"><span className="svc-case-label">Solution</span><span className="svc-case-text">Redesigned website with local SEO strategy, Google Business Profile optimization, and an automated appointment follow-up system.</span></div>
                <div className="svc-case-services"><span className="svc-case-svc">Website Redesign</span><span className="svc-case-svc">Local SEO</span><span className="svc-case-svc">AI Automation</span><span className="svc-case-svc">Lead Management</span></div>
                <Link href="/contact-us" className="svc-case-link">Discuss a Similar Project <i className="fas fa-arrow-right"></i></Link>
              </div>
            </div>
            <div className="svc-case-card">
              <div className="svc-case-top"><span className="svc-case-industry">Professional Services</span><div className="svc-case-ico"><i className="fas fa-briefcase"></i></div></div>
              <div className="svc-case-body">
                <div className="svc-case-row"><span className="svc-case-label">Challenge</span><span className="svc-case-text">A consulting firm had an outdated website, no consistent brand identity, and was struggling to differentiate from competitors online.</span></div>
                <div className="svc-case-row"><span className="svc-case-label">Solution</span><span className="svc-case-text">Complete brand strategy, new visual identity system, modern website with thought leadership content and lead capture optimization.</span></div>
                <div className="svc-case-services"><span className="svc-case-svc">Brand Strategy</span><span className="svc-case-svc">Visual Identity</span><span className="svc-case-svc">Web Design</span><span className="svc-case-svc">Content Marketing</span></div>
                <Link href="/contact-us" className="svc-case-link">Discuss a Similar Project <i className="fas fa-arrow-right"></i></Link>
              </div>
            </div>
            <div className="svc-case-card">
              <div className="svc-case-top"><span className="svc-case-industry">E-Commerce</span><div className="svc-case-ico"><i className="fas fa-shopping-cart"></i></div></div>
              <div className="svc-case-body">
                <div className="svc-case-row"><span className="svc-case-label">Challenge</span><span className="svc-case-text">An online retailer had strong product inventory but low website conversion rates and high cart abandonment — traffic wasn&apos;t translating to sales.</span></div>
                <div className="svc-case-row"><span className="svc-case-label">Solution</span><span className="svc-case-text">UX audit and website optimization, AI-powered product recommendations, automated abandoned cart recovery, and performance improvements.</span></div>
                <div className="svc-case-services"><span className="svc-case-svc">CRO</span><span className="svc-case-svc">AI Solutions</span><span className="svc-case-svc">Marketing Automation</span><span className="svc-case-svc">SEO</span></div>
                <Link href="/contact-us" className="svc-case-link">Discuss a Similar Project <i className="fas fa-arrow-right"></i></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 11. FAQ ── */}
      <section className="svc-faq" id="faq">
        <div className="container">
          <div className="section-head">
            <div className="badge badge-orange"><i className="fas fa-circle-question"></i> FAQ</div>
            <h2>Frequently Asked <em className="text-orange">Questions</em></h2>
            <p>Common questions about Calidigi&apos;s services, process, and how we work with businesses.</p>
          </div>
          <ServicesFaq />
        </div>
      </section>

      {/* ── 12. FINAL CTA ── */}
      <section className="svc-cta" id="contact">
        <div className="svc-cta-glow"></div>
        <div className="svc-cta-glow-2"></div>
        <div className="container">
          <div className="svc-cta-inner">
            <div className="badge badge-white"><i className="fas fa-comments"></i> Start a Conversation</div>
            <h2>Ready to Turn Your Digital Challenges Into <em>Growth Opportunities?</em></h2>
            <p>Tell us what you&apos;re trying to achieve. We&apos;ll help identify the right combination of strategy, technology, marketing, branding, and AI to move your business forward.</p>
            <div className="svc-cta-btns">
              <Link href="/contact-us" className="btn btn-primary">Start a Conversation <i className="fas fa-arrow-right"></i></Link>
              <Link href="/about" className="btn btn-outline-white">Learn About Calidigi</Link>
            </div>
            <div className="svc-cta-proof">
              <div className="svc-cta-proof-item"><i className="fas fa-check-circle"></i><span>No pressure — just a conversation</span></div>
              <div className="svc-cta-proof-item"><i className="fas fa-check-circle"></i><span>150+ businesses helped</span></div>
              <div className="svc-cta-proof-item"><i className="fas fa-check-circle"></i><span>California-based team</span></div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
