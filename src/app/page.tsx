import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: { absolute: 'California Digital Marketing Solutions | Calidigi' },
  description:
    'Calidigi delivers web development, SEO, local SEO and AI automation to help California businesses attract more customers and grow online.',
  alternates: {
    canonical: 'https://www.calidigi.com/',
    languages: { 'en-US': 'https://www.calidigi.com/', 'x-default': 'https://www.calidigi.com/' },
  },
  openGraph: {
    url: 'https://www.calidigi.com/',
    title: 'California Digital Marketing Solutions | Calidigi',
    description: 'Calidigi delivers web development, SEO, local SEO and AI automation to help California businesses attract more customers and grow online.',
  },
  twitter: {
    title: 'California Digital Marketing Solutions | Calidigi',
    description: 'Calidigi delivers web development, SEO, local SEO and AI automation to help California businesses attract more customers and grow online.',
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
        address: { '@type': 'PostalAddress', addressLocality: 'San Francisco', addressRegion: 'CA', postalCode: '94103', addressCountry: 'US' },
        telephone: '+13233876255',
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
        address: { '@type': 'PostalAddress', addressLocality: 'San Francisco', addressRegion: 'CA', postalCode: '94103', addressCountry: 'US' },
        geo: { '@type': 'GeoCoordinates', latitude: 37.7749, longitude: -122.4194 },
        telephone: '+13233876255',
        email: 'sales@calidigi.com',
        priceRange: '$$',
        openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '09:00', closes: '18:00' },
        areaServed: [
          { '@type': 'State', name: 'California' },
          { '@type': 'City', name: 'San Francisco' },
          { '@type': 'City', name: 'Los Angeles' },
          { '@type': 'City', name: 'San Diego' },
          { '@type': 'City', name: 'Sacramento' },
          { '@type': 'City', name: 'San Jose' },
          { '@type': 'City', name: 'Oakland' },
          { '@type': 'City', name: 'Fresno' },
        ],
        hasMap: 'https://maps.google.com/?q=San+Francisco,CA',
        currenciesAccepted: 'USD',
        paymentAccepted: 'Cash, Credit Card, Bank Transfer',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Digital Services for California Businesses',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Meta & Google Ads', description: 'Paid advertising on Meta and Google to drive qualified inquiries for California businesses' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '24/7 AI Lead Follow-Up', description: 'AI-powered lead follow-up and qualification in your brand\'s voice, around the clock' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Email & SMS Marketing', description: 'Email and SMS campaigns that convert prospects and retain customers for California businesses' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SEO & AI Search Visibility', description: 'Local SEO and AI search optimization to help California businesses get found online' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Website Design', description: 'High-converting website design for California businesses' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Branding & Logo Design', description: 'Brand identity design for California businesses' } },
          ],
        },
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://www.calidigi.com/#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What digital services does Calidigi offer?',
            acceptedAnswer: { '@type': 'Answer', text: 'Calidigi offers Meta & Google Ads, 24/7 AI lead follow-up, email & SMS marketing, SEO & AI search visibility, website design, and branding & logo design for California businesses.' },
          },
          {
            '@type': 'Question',
            name: 'Where is Calidigi located?',
            acceptedAnswer: { '@type': 'Answer', text: 'Calidigi is based in San Francisco, California. We serve businesses across the entire state of California including Los Angeles, San Diego, Sacramento, San Jose, Oakland, and the Bay Area.' },
          },
          {
            '@type': 'Question',
            name: 'Does Calidigi work with small businesses?',
            acceptedAnswer: { '@type': 'Answer', text: 'Yes, Calidigi works with businesses of all sizes — from startups and small businesses to enterprise companies — across 30+ industries in California.' },
          },
          {
            '@type': 'Question',
            name: 'How long does it take to build a website with Calidigi?',
            acceptedAnswer: { '@type': 'Answer', text: 'Most websites are completed within 4–8 weeks depending on complexity and scope. We provide a detailed project timeline during your free strategy session.' },
          },
          {
            '@type': 'Question',
            name: 'How much does web development cost in California?',
            acceptedAnswer: { '@type': 'Answer', text: 'Calidigi offers transparent, flexible pricing based on your project scope and goals. We provide custom quotes after understanding your business needs. Contact us for a free proposal within 48 hours.' },
          },
          {
            '@type': 'Question',
            name: 'What industries does Calidigi serve?',
            acceptedAnswer: { '@type': 'Answer', text: 'Calidigi serves 30+ industries including healthcare, real estate, e-commerce, SaaS, legal, restaurants, solar energy, education, home services, logistics, and manufacturing across California.' },
          },
        ],
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
        name: 'Digital Marketing for California Businesses | Calidigi',
        isPartOf: { '@id': 'https://www.calidigi.com/#website' },
        about: { '@id': 'https://www.calidigi.com/#organization' },
        description: 'Calidigi is a California digital marketing agency combining paid advertising with AI-powered lead follow-up to turn prospects into qualified appointments.',
        breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.calidigi.com/' }] },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── HERO ── */}
      <section className="hero" id="home">
        <div className="hero-bg"></div>
        <div className="hero-dots"></div>
        <div className="container hero-inner">
          <div className="hero-content">
            <h1 className="sr-only">Digital Marketing for California Businesses | Calidigi</h1>
            <div className="hero-eyebrow">
              <div className="hero-eyebrow-dot"></div>
              <span>DIGITAL MARKETING FOR CALIFORNIA BUSINESSES</span>
            </div>
            <h2>Not Just Leads.<br /><em>Qualified Appointments.</em></h2>
            <p className="hero-desc">
              We&apos;re a digital marketing agency that combines paid advertising with AI-powered lead follow-up to turn more prospects into qualified appointments. We generate the leads, respond 24/7 in your brand&apos;s voice, answer questions using your business information, and qualify prospects based on your criteria&mdash;guiding the right people toward booking with you.
            </p>
            <div className="hero-actions">
              <Link href="/contact-us" className="btn btn-primary">
                Book A Free Strategy Call <i className="fas fa-arrow-right"></i>
              </Link>
              <Link href="/services" className="btn btn-outline">
                Explore Our Services
              </Link>
            </div>
            <div className="hero-proof">
              <div className="proof-item"><i className="fas fa-check-circle"></i><span>More Qualified Inquiries</span></div>
              <div className="proof-item"><i className="fas fa-check-circle"></i><span>No More Chasing Leads</span></div>
              <div className="proof-item"><i className="fas fa-check-circle"></i><span>Know What Your Marketing Delivers</span></div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-visual-wrap">
              <div className="hv-float hv-float-1">
                <div className="hv-float-icon orange"><i className="fas fa-user-check"></i></div>
                <div className="hv-float-text"><p>Qualified Leads</p><span>Screened against your criteria</span></div>
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
                  <div className="hv-metric"><span className="hv-metric-val orange">$1,840</span><span className="hv-metric-lbl">Ad Spend</span></div>
                  <div className="hv-metric"><span className="hv-metric-val blue">94</span><span className="hv-metric-lbl">New Leads</span></div>
                  <div className="hv-metric"><span className="hv-metric-val" style={{ color: '#10B981' }}>38</span><span className="hv-metric-lbl">Qualified Leads</span></div>
                  <div className="hv-metric"><span className="hv-metric-val">14</span><span className="hv-metric-lbl">Appointments Booked</span></div>
                </div>
                <div className="hv-dash-actions">
                  <span className="hv-dash-btn hv-dash-btn--orange">View Results</span>
                  <span className="hv-dash-btn hv-dash-btn--gray">View Leads</span>
                </div>
              </div>
              <div className="hv-float hv-float-2">
                <div className="hv-float-icon green"><i className="fas fa-robot"></i></div>
                <div className="hv-float-text"><p>24/7 AI Follow-Up</p><span>Your brand&apos;s voice. Every conversation.</span></div>
              </div>
              <div className="hv-float hv-float-3">
                <div className="hv-float-icon blue"><i className="fas fa-calendar-check"></i></div>
                <div className="hv-float-text"><p>Appointment Booking</p><span>From inquiry to your calendar</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW WE HELP STRIP ── */}
      <div className="trust-strip">
        <div className="container trust-strip-inner">
          <span className="trust-strip-label">HOW WE HELP</span>
          <span className="trust-pill"><i className="fas fa-bullseye"></i> Meta &amp; Google Ads</span>
          <span className="trust-pill"><i className="fas fa-robot"></i> 24/7 AI Lead Follow-Up</span>
          <span className="trust-pill"><i className="fas fa-envelope"></i> Email &amp; SMS Marketing</span>
          <span className="trust-pill"><i className="fas fa-laptop-code"></i> Website Design</span>
          <span className="trust-pill"><i className="fas fa-file-lines"></i> Landing Page Design</span>
          <span className="trust-pill"><i className="fas fa-paint-brush"></i> Branding &amp; Logo Design</span>
          <span className="trust-pill"><i className="fas fa-magnifying-glass"></i> SEO &amp; AI Search Visibility</span>
        </div>
      </div>

      {/* ── SOUND FAMILIAR? (PROBLEMS) ── */}
      <section className="problems" id="problems">
        <div className="container">
          <div className="section-head">
            <div className="badge badge-orange"><i className="fas fa-circle-exclamation"></i> Sound Familiar?</div>
            <h2>You Wanted More Customers.<br />You Got More Leads to Chase.</h2>
            <p>You&apos;re running a business. But now you&apos;re answering the same questions, sorting serious buyers from people just browsing, and following up with prospects who stop replying. Getting an inquiry shouldn&apos;t mean the hardest part of your marketing is handed back to you.</p>
          </div>
          <div className="problems-grid">
            {[
              { num: '01', icon: 'fa-inbox',           title: 'Plenty of Leads. Too Few Buyers.',       desc: "Your inbox fills up, but too many inquiries go nowhere. You spend hours finding out who's actually ready—and a good fit." },
              { num: '02', icon: 'fa-clock',            title: 'Follow-Up Falls on You.',                 desc: "You're serving customers, managing staff, and running the business. Chasing yesterday's inquiries keeps falling to the bottom of the list." },
              { num: '03', icon: 'fa-robot',            title: 'AI Sounds Useful. Where Do You Start?',  desc: "You hear AI can save you hours. But choosing the tools, setting them up, and making them work becomes another job on your list." },
              { num: '04', icon: 'fa-arrow-pointer',    title: "Clicks Come In. Inquiries Don't.",        desc: "People visit your website but leave without reaching out. You paid to get their attention, but never got the chance to earn their business." },
              { num: '05', icon: 'fa-map-location-dot', title: "Local Customers Can't Find You.",         desc: "People nearby are searching Google for exactly what you offer. But your competitors are the ones showing up—and getting the calls." },
              { num: '06', icon: 'fa-swatchbook',       title: 'Your Website Undersells You.',            desc: "You know why customers choose you. Your website and branding don't make that difference clear to someone discovering you for the first time." },
              { num: '07', icon: 'fa-microchip',        title: 'Does AI Mention Your Business?',          desc: "Someone asks an AI assistant for a business like yours. Will they discover what you offer—or get a shortlist that leaves you out?" },
              { num: '08', icon: 'fa-chart-pie',        title: "You're Spending. But What's Working?",    desc: "Your reports show clicks and impressions. What you want to know is which marketing brings inquiries, appointments, and paying customers." },
            ].map(({ num, icon, title, desc }) => (
              <div key={num} className="problem-card" data-num={num}>
                <div className="problem-icon"><i className={`fas ${icon}`}></i></div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
          <div className="problems-bridge">
            <div className="problems-bridge-text">
              <p>THE CALI DIGI DIFFERENCE</p>
              <h3>We turn these problems into <em>growth opportunities</em> — with the right strategy, design and technology.</h3>
            </div>
            <div className="problems-bridge-cta">
              <div className="bridge-stat">
                <div className="bridge-stat-dot"></div>
                <span>150+ businesses helped</span>
              </div>
              <Link href="/contact-us" className="btn btn-primary">
                Book A Free Strategy Call <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES (THE CALI DIGI DIFFERENCE) ── */}
      <section className="services" id="services">
        <div className="container">
          <div className="section-head">
            <div className="badge badge-orange"><i className="fas fa-briefcase"></i> What We Do</div>
            <h2>Digital Services Built Around<br />Business Growth</h2>
            <p>Every service we offer is designed with one goal: helping your business attract more customers and grow.</p>
          </div>
          <div className="services-grid">
            {[
              {
                icon: 'fa-bullseye',
                title: 'Meta & Google Ads',
                desc: 'Put your business in front of potential customers with ads built to drive inquiries. We manage the targeting, creative, and ongoing testing to make your budget work harder.',
                href: '/services/digital-marketing',
              },
              {
                icon: 'fa-robot',
                title: '24/7 AI Lead Follow-Up',
                desc: 'Keep inquiries moving while you run your business. AI responds in your brand\'s voice, answers questions, checks fit, and guides qualified prospects toward booking—even after hours.',
                href: '/services/ai-automation',
              },
              {
                icon: 'fa-envelope',
                title: 'Email & SMS Marketing',
                desc: 'Give interested prospects a reason to act and past customers a reason to return. Stay in touch with timely offers, helpful reminders, and messages that keep your business top of mind.',
                href: '/services/digital-marketing',
              },
              {
                icon: 'fa-magnifying-glass',
                title: 'SEO & AI Search Visibility',
                desc: 'Help customers discover your business when they search Google or ask AI for recommendations. We improve your website\'s content and structure so what you offer is easier to find and understand.',
                href: '/services/local-seo',
              },
              {
                icon: 'fa-laptop-code',
                title: 'Website Design',
                desc: 'Make your first impression count. Get a website that clearly explains your value, builds trust, and makes it easy for visitors to contact you—from their phone or computer.',
                href: '/services/web-development',
              },
              {
                icon: 'fa-paint-brush',
                title: 'Branding & Logo Design',
                desc: 'Give customers a brand they recognize and remember. Build a consistent look across your logo, website, and marketing that reflects your business and makes a professional first impression.',
                href: '/services/branding',
              },
            ].map(({ icon, title, desc, href }) => (
              <div key={title} className="service-card">
                <div className="service-icon"><i className={`fas ${icon}`}></i></div>
                <h3>{title}</h3>
                <p>{desc}</p>
                <Link href={href} className="service-link" aria-label={`${title} — View service details`}>{title} <i className="fas fa-arrow-right"></i></Link>
              </div>
            ))}
          </div>

          {/* AI Lead Nurturing Highlight Card */}
          <div className="service-highlight">
            <div className="service-highlight-icon">
              <i className="fas fa-robot"></i>
            </div>
            <div className="service-highlight-body">
              <h3>24/7 AI Lead Nurturing</h3>
              <p>Make more of the leads you paid for. AI answers questions, qualifies prospects, and follows up to guide them toward booking.</p>
            </div>
            <Link href="/contact-us" className="btn btn-primary">
              Book A Free Strategy Call <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* ── AI SOLUTIONS ── */}
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
              { icon: 'fa-headset',      title: 'AI Customer Support',      desc: '24/7 intelligent support that handles common customer questions automatically.' },
              { icon: 'fa-user-check',   title: 'AI Lead Qualification',    desc: 'Automatically qualify and route leads so your team focuses on the best opportunities.' },
              { icon: 'fa-pen-nib',      title: 'AI Content & Marketing',   desc: 'AI-assisted content creation, SEO writing and campaign optimization at scale.' },
              { icon: 'fa-cogs',         title: 'AI Workflow Automation',   desc: 'Automate repetitive business processes to save time and reduce errors.' },
              { icon: 'fa-chart-bar',    title: 'AI Data Analysis',         desc: 'Turn your business data into clear insights and actionable decisions.' },
              { icon: 'fa-microphone',   title: 'AI Voice Agents',          desc: 'Intelligent voice assistants that handle calls, bookings and customer interactions.' },
              { icon: 'fa-brain',        title: 'AI Knowledge Assistants',  desc: 'Smart assistants trained on your business knowledge to answer customer queries.' },
              { icon: 'fa-puzzle-piece', title: 'Custom AI Solutions',      desc: 'Bespoke AI tools designed around your specific business challenges and goals.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="ai-card">
                <div className="ai-card-icon"><i className={`fas ${icon}`}></i></div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCAL SEO | AI SEARCH VISIBILITY ── */}
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
            <div className="badge badge-orange"><i className="fas fa-map-marker-alt"></i> LOCAL SEO | AI SEARCH VISIBILITY</div>
            <h2>Get Found By Customers<br /><em>Near You</em></h2>
            <p>When local customers search for your services or ask AI for recommendations, your business should be part of the conversation. We help improve your visibility across Google Maps, local search, and AI-generated answers.</p>
            <div className="seo-features">
              {[
                'Google Business Profile Optimization',
                'Local Keyword Strategy',
                'Local Landing Pages',
                'Citation Optimization',
                'Review Strategy & Management',
                'Location-Based Content',
                'AI Search Content Optimization',
                'Clear Answers to Customer Questions',
              ].map((f) => (
                <div key={f} className="seo-feat"><i className="fas fa-check"></i><span>{f}</span></div>
              ))}
            </div>
            <Link href="/contact-us" className="btn btn-primary">Improve My Local Visibility <i className="fas fa-arrow-right"></i></Link>
          </div>
        </div>
      </section>

      {/* ── WEB DESIGN & BRANDING ── */}
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
              { icon: 'fa-star',          title: 'Look Professional', desc: 'Strong visual identity and modern UI design that reflects your brand quality and builds instant trust with visitors.' },
              { icon: 'fa-shield-halved', title: 'Build Trust',       desc: 'Clear messaging, social proof, consistent branding and credibility signals that make customers confident in choosing you.' },
              { icon: 'fa-funnel-dollar', title: 'Generate Leads',    desc: 'Strategic CTAs, conversion-focused layouts and guided user journeys that turn website visitors into genuine business leads.' },
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

      {/* ── PROCESS ── */}
      <section className="process" id="process">
        <div className="container">
          <div className="section-head">
            <div className="badge badge-orange"><i className="fas fa-route"></i> How We Work</div>
            <h2>How We Help Your Business Grow</h2>
            <p>A clear, proven process from understanding your business to achieving sustainable digital growth.</p>
          </div>
          <div className="process-steps">
            {[
              { icon: 'fa-bullseye',        label: 'STEP 01', title: 'Define Your Goals',          desc: 'Understand where you are, where you want to go, and what strategy would bring in more customers and revenue for your business.' },
              { icon: 'fa-magnifying-glass', label: 'STEP 02', title: 'Find the Gaps',              desc: 'Review your marketing, website, and sales follow-up to find where potential customers lose interest—and opportunities slip away.' },
              { icon: 'fa-diagram-project', label: 'STEP 03', title: 'Make the Right Moves',       desc: 'Create and launch a plan around your biggest opportunities, improving what you have and adding what\'s missing.' },
              { icon: 'fa-handshake',       label: 'STEP 04', title: 'Turn Interest Into Business', desc: 'Use targeted marketing and AI follow-up to attract prospects, answer questions, and help move the right people toward buying.' },
              { icon: 'fa-chart-line',      label: 'STEP 05', title: 'Grow What Works',            desc: 'Track inquiries, bookings, and sales to see what pays off. Refine the approach and focus your budget where it delivers.' },
            ].map(({ icon, label, title, desc }) => (
              <div key={title} className="process-step">
                <div className="ps-num"><i className={`fas ${icon} ps-icon`}></i></div>
                <div className="ps-label">{label}</div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUTIONS ── */}
      <section className="solutions" id="solutions">
        <div className="container">
          <div className="section-head">
            <div className="badge badge-orange"><i className="fas fa-lightbulb"></i> Solutions</div>
            <h2>Solutions For Modern Businesses</h2>
            <p>Practical, business-first solutions — not complicated technology for its own sake.</p>
          </div>
          <div className="solutions-grid">
            {[
              { num: '01 / Marketing',     title: 'Marketing Solutions',   desc: 'Drive visibility, traffic and qualified leads through integrated SEO, content, social media and paid campaigns designed around your growth goals.',          tags: ['SEO', 'Content', 'Paid Ads', 'Lead Gen'] },
              { num: '02 / AI',            title: 'AI Automation',         desc: 'Automate repetitive business processes, qualify leads automatically and let AI handle routine tasks so your team can focus on what matters most.',            tags: ['Workflow AI', 'Chatbots', 'Voice Agents'] },
              { num: '03 / Experience',    title: 'Customer Experience',   desc: 'Build superior customer journeys through conversion-focused websites, intelligent chatbots, voice agents and AI-powered support systems.',                   tags: ['Web Design', 'AI Support', 'UX'] },
              { num: '04 / Intelligence',  title: 'Business Intelligence', desc: 'Use AI and data analysis to understand your business performance, customer behaviour and market opportunities — and make smarter decisions.',                 tags: ['Analytics', 'Reporting', 'AI Insights'] },
              { num: '05 / Local',         title: 'Local Growth',          desc: 'Help local businesses attract customers in their service area through Google Maps optimization, local SEO, review management and location content.',           tags: ['Local SEO', 'GMB', 'Citations'] },
              { num: '06 / Brand',         title: 'Brand Building',        desc: 'Create a consistent, professional and memorable brand presence that builds recognition, establishes credibility and differentiates your business.',              tags: ['Logo', 'Visual Identity', 'Messaging'] },
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

      {/* ── PORTFOLIO ── */}
      <section className="portfolio" id="portfolio">
        <div className="container">
          <div className="section-head">
            <div className="badge badge-orange"><i className="fas fa-briefcase"></i> Portfolio</div>
            <h2>Built For Businesses.<br />Designed For Results.</h2>
            <p>A selection of projects across web design, digital marketing, local SEO and AI solutions.</p>
          </div>
          <div className="portfolio-grid">
            {[
              { cls: 'pt-1', cat: 'Web Design',        title: 'Healthcare Clinic Website',     desc: 'Modern, patient-focused website with online booking, local SEO and conversion-optimized landing pages.',                                                         tags: ['Web Design', 'Local SEO', 'UX'] },
              { cls: 'pt-2', cat: 'AI Solutions',       title: 'AI Customer Support System',   desc: 'Intelligent chatbot and lead qualification system that automated customer conversations for a local service business.',                                          tags: ['AI Chatbot', 'Lead Gen', 'Automation'] },
              { cls: 'pt-3', cat: 'Local SEO',          title: 'Local Restaurant Chain SEO',   desc: 'Multi-location local SEO strategy, Google Business Profile optimization and review management for a California restaurant group.',                               tags: ['Local SEO', 'GMB', 'Content'] },
              { cls: 'pt-4', cat: 'Branding',           title: 'Tech Startup Brand Identity',  desc: 'Complete brand identity including logo, color system, typography and brand guidelines for a Bay Area technology startup.',                                        tags: ['Branding', 'Logo', 'Visual Identity'] },
              { cls: 'pt-5', cat: 'Digital Marketing',  title: 'E-Commerce Growth Campaign',   desc: 'Integrated digital marketing strategy combining SEO, Google Ads and social campaigns for a California retail business.',                                         tags: ['SEO', 'Paid Ads', 'Social'] },
              { cls: 'pt-6', cat: 'Lead Generation',    title: 'Real Estate Lead System',      desc: 'Conversion-focused landing pages and automated lead nurturing system for a California real estate company.',                                                    tags: ['Landing Pages', 'CRO', 'Automation'] },
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

      {/* ── BLOG ── */}
      <section className="blog" id="blog">
        <div className="container">
          <div className="section-head">
            <div className="badge badge-orange"><i className="fas fa-pen-nib"></i> Insights</div>
            <h2>Ideas To Help Your Business Grow</h2>
            <p>Practical guides, strategies and insights on digital marketing, web design, local SEO and AI for business.</p>
          </div>
          <div className="blog-grid">
            {[
              { cls: 'bb-1', icon: 'fa-robot',         cat: 'AI For Business', title: 'How AI Can Help Small Businesses Save Time and Grow Faster',      desc: 'Practical examples of AI tools and workflows that small businesses can implement today to automate tasks and improve customer experience.',              time: '6 min read', slug: 'ai-chatbots-how-businesses-are-using-them-to-improve-customer-service' },
              { cls: 'bb-2', icon: 'fa-map-marker-alt', cat: 'Local SEO',       title: 'Why Local SEO Matters More Than Ever For Small Businesses',        desc: 'How local search has changed, why Google Maps ranking is critical for local businesses and what steps to take to improve your local visibility.',         time: '7 min read', slug: 'how-local-seo-helps-businesses-get-found-by-nearby-customers' },
              { cls: 'bb-3', icon: 'fa-laptop-code',    cat: 'Web Design',      title: 'How To Build a Business Website That Actually Generates Leads',    desc: 'The key elements of a high-converting business website — from clear messaging and trust signals to strategic calls-to-action and fast performance.',    time: '8 min read', slug: 'what-makes-a-business-website-convert-visitors-into-customers' },
            ].map(({ cls, icon, cat, title, desc, time, slug }) => (
              <div key={title} className="blog-card">
                <div className={`blog-thumb ${cls}`}><i className={`fas ${icon}`}></i></div>
                <div className="blog-body">
                  <div className="blog-cat">{cat}</div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                  <div className="blog-meta">
                    <span><i className="fas fa-clock"></i> {time}</span>
                    <Link href={`/blog/${slug}`} className="blog-read">Read Article <i className="fas fa-arrow-right"></i></Link>
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

      {/* ── ABOUT STRIP ── */}
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

      {/* ── FINAL CTA ── */}
      <section className="final-cta" id="contact">
        <div className="final-cta-glow"></div>
        <div className="container final-cta-inner">
          <div className="badge badge-white"><i className="fas fa-rocket"></i> Let&apos;s Get Started</div>
          <h2>Ready To Turn Your Digital Presence<br />Into <em>Business Growth?</em></h2>
          <p>Let&apos;s build a website, marketing strategy and digital system that works for your business — and brings you real, measurable results.</p>
          <div className="final-cta-actions">
            <a href="mailto:sales@calidigi.com" className="btn btn-primary">Let&apos;s Grow Your Business <i className="fas fa-arrow-right"></i></a>
            <a href="tel:+13233876255" className="btn btn-outline-white"><i className="fas fa-phone"></i> Talk To Our Team</a>
          </div>
        </div>
      </section>
    </>
  )
}
