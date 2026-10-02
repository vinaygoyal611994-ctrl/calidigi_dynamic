'use client'
import { useState } from 'react'

type Result = { n: string; l: string }
type Card = {
  category: string
  bg: string
  icon: string
  catLabel: string
  title: string
  desc: string
  results: Result[]
}

const CARDS: Card[] = [
  /* ── HEALTHCARE ── */
  { category: 'healthcare', bg: 'pf-bg-medical',     icon: 'fa-hospital-user', catLabel: 'Healthcare',    title: 'Medical Clinic',          desc: 'AI patient management, HIPAA-compliant portal, automated scheduling & chatbot triage',                             results: [{ n: '+47%', l: 'Bookings' }, { n: '24/7', l: 'AI Triage' }, { n: '4.9★', l: 'Reviews' }] },
  { category: 'healthcare', bg: 'pf-bg-dental',      icon: 'fa-tooth',         catLabel: 'Healthcare',    title: 'Dental Practice',         desc: 'New patient acquisition platform, automated recall reminders, before/after gallery & reviews',                      results: [{ n: '+63%', l: 'New Patients' }, { n: '85%', l: 'Recall Rate' }, { n: '4.8★', l: 'Google' }] },
  { category: 'healthcare', bg: 'pf-bg-fitness',     icon: 'fa-dumbbell',      catLabel: 'Healthcare',    title: 'Fitness & Gym',           desc: 'AI workout plans, member app with 5K+ users, class booking engine, trainer marketplace',                             results: [{ n: '+89%', l: 'Signups' }, { n: '5K+', l: 'App Users' }, { n: '-34%', l: 'Churn' }] },
  { category: 'healthcare', bg: 'pf-bg-beauty',      icon: 'fa-spa',           catLabel: 'Healthcare',    title: 'Beauty & Spa',            desc: 'AI skin analysis tool, online booking with deposits, loyalty rewards app, upsell automation',                         results: [{ n: '+52%', l: 'Bookings' }, { n: '+38%', l: 'Avg Revenue' }, { n: '92%', l: 'Retention' }] },
  { category: 'healthcare', bg: 'pf-bg-seniorcare',  icon: 'fa-person-cane',   catLabel: 'Healthcare',    title: 'Senior Care',             desc: 'Family communication portal, caregiver scheduling AI, compliance tracking, incident reporting',                       results: [{ n: '30%', l: 'Faster Intake' }, { n: '100%', l: 'Compliance' }, { n: '4.7★', l: 'Family Rating' }] },
  { category: 'healthcare', bg: 'pf-bg-petcare',     icon: 'fa-paw',           catLabel: 'Healthcare',    title: 'Pet Care Clinic',         desc: 'AI health tracking for pets, owner app, 24/7 emergency bot, automated vaccination reminders',                          results: [{ n: '+71%', l: 'Appointments' }, { n: '2×', l: 'Recall Rate' }, { n: '4.9★', l: 'Yelp' }] },
  /* ── HOME SERVICES ── */
  { category: 'home',       bg: 'pf-bg-homeservices', icon: 'fa-house-chimney-crack', catLabel: 'Home Services', title: 'Home Services',    desc: 'Instant quoting engine, GPS-tracked technician app, automated follow-ups, review generation',                        results: [{ n: '+55%', l: 'Quotes' }, { n: '4.8★', l: 'Google' }, { n: '+40%', l: 'Revenue' }] },
  { category: 'home',       bg: 'pf-bg-construction', icon: 'fa-hard-hat',     catLabel: 'Home Services', title: 'Construction',            desc: 'AI project estimation, client portal with milestones, subcontractor coordination, permit tracker',                   results: [{ n: '40%', l: 'Faster Projects' }, { n: '+68%', l: 'Bid Wins' }, { n: '-22%', l: 'Cost Overruns' }] },
  { category: 'home',       bg: 'pf-bg-automotive',  icon: 'fa-car-wrench',    catLabel: 'Home Services', title: 'Auto Repair',             desc: 'Online service booking, AI diagnosis chatbot, inventory management, loyalty program app',                             results: [{ n: '+38%', l: 'Bookings' }, { n: '+25%', l: 'Parts Upsell' }, { n: '4.8★', l: 'Reviews' }] },
  { category: 'home',       bg: 'pf-bg-plumbing',    icon: 'fa-wrench',        catLabel: 'Home Services', title: 'Plumbing',                desc: '24/7 emergency call capture, GPS dispatch app, real-time customer updates, automated invoicing',                       results: [{ n: '+60%', l: 'Emergency Calls' }, { n: '98%', l: 'On-Time Rate' }, { n: '+45%', l: 'Revenue' }] },
  { category: 'home',       bg: 'pf-bg-hvac',        icon: 'fa-wind',          catLabel: 'Home Services', title: 'HVAC',                    desc: 'Predictive maintenance AI, seasonal campaign automation, technician mobile app, service contracts',                   results: [{ n: '+45%', l: 'Seasonal Jobs' }, { n: '+82%', l: 'Contracts' }, { n: '-30%', l: 'No-Shows' }] },
  { category: 'home',       bg: 'pf-bg-cleaning',    icon: 'fa-broom',         catLabel: 'Home Services', title: 'Cleaning Services',       desc: 'AI-optimized scheduling, recurring client automation, team management app, real-time GPS tracking',                   results: [{ n: '+72%', l: 'Recurring' }, { n: '4.9★', l: 'Rating' }, { n: '+55%', l: 'Capacity' }] },
  { category: 'home',       bg: 'pf-bg-landscaping', icon: 'fa-seedling',      catLabel: 'Home Services', title: 'Landscaping',             desc: 'AI garden design previewer, seasonal campaign engine, project photo documentation, quote generator',                   results: [{ n: '+58%', l: 'Project Leads' }, { n: '+43%', l: 'Avg Job Size' }, { n: '4.8★', l: 'Reviews' }] },
  /* ── PROFESSIONAL ── */
  { category: 'professional', bg: 'pf-bg-realestate', icon: 'fa-building',     catLabel: 'Professional',  title: 'Real Estate',             desc: 'AI property matching engine, virtual tours, lead scoring CRM, neighborhood data analytics',                           results: [{ n: '+85%', l: 'Lead Quality' }, { n: '3×', l: 'Faster Closings' }, { n: '+62%', l: 'Listings' }] },
  { category: 'professional', bg: 'pf-bg-legal',      icon: 'fa-scale-balanced', catLabel: 'Professional', title: 'Law Firm',               desc: 'AI case research assistant, secure client portal, intake automation, billing dashboard',                               results: [{ n: '50%', l: 'Faster Intake' }, { n: '+35%', l: 'Billable Hours' }, { n: '100%', l: 'Compliance' }] },
  { category: 'professional', bg: 'pf-bg-accounting', icon: 'fa-calculator',   catLabel: 'Professional',  title: 'Accounting & Tax',        desc: 'AI tax preparation assistant, client document portal, automated deadline reminders, compliance tools',                 results: [{ n: '3×', l: 'Client Capacity' }, { n: '-60%', l: 'Manual Work' }, { n: '99%', l: 'Filing Rate' }] },
  { category: 'professional', bg: 'pf-bg-insurance',  icon: 'fa-shield-halved', catLabel: 'Professional', title: 'Insurance Agency',        desc: 'AI underwriting assistant, policy comparison tool, automated renewal campaigns, claims portal',                       results: [{ n: '+67%', l: 'Renewals' }, { n: '+44%', l: 'New Policies' }, { n: '-40%', l: 'Claims Cost' }] },
  { category: 'professional', bg: 'pf-bg-financial',  icon: 'fa-chart-line',   catLabel: 'Professional',  title: 'Financial Services',      desc: 'AI investment advisor chatbot, compliance dashboard, client portfolio tracker, digital onboarding',                    results: [{ n: '+92%', l: 'Digital Engage' }, { n: '+58%', l: 'AUM Growth' }, { n: '100%', l: 'SEC Compliant' }] },
  { category: 'professional', bg: 'pf-bg-consulting', icon: 'fa-lightbulb',    catLabel: 'Professional',  title: 'Business Consulting',     desc: 'AI business insights platform, ROI dashboard, client success tracking, automated reporting',                           results: [{ n: '+40%', l: 'Client Retention' }, { n: '+70%', l: 'New Clients' }, { n: '4.9★', l: 'NPS Score' }] },
  /* ── COMMERCE ── */
  { category: 'commerce',   bg: 'pf-bg-ecommerce',   icon: 'fa-shopping-cart', catLabel: 'Commerce',      title: 'E-Commerce Store',        desc: 'AI product recommendations, personalized landing pages, cart recovery automation, mobile-first PWA',                  results: [{ n: '+148%', l: 'Online Revenue' }, { n: '92%', l: 'Mobile Conv.' }, { n: '-45%', l: 'Cart Abandon' }] },
  { category: 'commerce',   bg: 'pf-bg-restaurant',  icon: 'fa-utensils',      catLabel: 'Commerce',      title: 'Restaurant & Food',       desc: 'Online ordering with AI upsell, loyalty app, table reservation system, menu optimization analytics',                  results: [{ n: '+73%', l: 'Online Orders' }, { n: '+32%', l: 'Avg Check' }, { n: '4.8★', l: 'Yelp / Maps' }] },
  { category: 'commerce',   bg: 'pf-bg-hotel',       icon: 'fa-hotel',         catLabel: 'Commerce',      title: 'Hotel & Hospitality',     desc: 'Direct booking engine, AI concierge chatbot, dynamic pricing, review management platform',                            results: [{ n: '+54%', l: 'Direct Bookings' }, { n: '+28%', l: 'RevPAR' }, { n: '4.9★', l: 'TripAdvisor' }] },
  { category: 'commerce',   bg: 'pf-bg-travel',      icon: 'fa-plane-departure', catLabel: 'Commerce',    title: 'Travel & Tourism',        desc: 'AI itinerary builder, tour booking platform, real-time availability, multi-currency checkout',                         results: [{ n: '+89%', l: 'Tour Bookings' }, { n: '+65%', l: 'International' }, { n: '4.9★', l: 'TripAdvisor' }] },
  { category: 'commerce',   bg: 'pf-bg-retail',      icon: 'fa-store',         catLabel: 'Commerce',      title: 'Local Retail',            desc: 'Omnichannel presence, loyalty rewards app, AI inventory forecasting, click-and-collect system',                         results: [{ n: '+67%', l: 'Foot Traffic' }, { n: '+44%', l: 'Online Sales' }, { n: '-25%', l: 'Overstock' }] },
  /* ── B2B & TECH ── */
  { category: 'b2b',        bg: 'pf-bg-solar',       icon: 'fa-solar-panel',   catLabel: 'B2B & Tech',    title: 'Solar Energy',            desc: 'AI ROI calculator, financing integrations, project tracking portal, permit automation, installer app',                  results: [{ n: '+120%', l: 'Qualified Leads' }, { n: '+85%', l: 'Conversion' }, { n: '-40%', l: 'Install Time' }] },
  { category: 'b2b',        bg: 'pf-bg-logistics',   icon: 'fa-truck-fast',    catLabel: 'B2B & Tech',    title: 'Logistics & Freight',     desc: 'AI route optimization, real-time tracking platform, driver app, automated dispatch, analytics',                         results: [{ n: '35%', l: 'Faster Delivery' }, { n: '-28%', l: 'Fuel Cost' }, { n: '99%', l: 'On-Time' }] },
  { category: 'b2b',        bg: 'pf-bg-manufacturing', icon: 'fa-industry',    catLabel: 'B2B & Tech',    title: 'Manufacturing',           desc: 'AI quality control vision system, ERP integration, predictive maintenance, production analytics',                        results: [{ n: '28%', l: 'Waste Reduced' }, { n: '+45%', l: 'Throughput' }, { n: '-35%', l: 'Downtime' }] },
  { category: 'b2b',        bg: 'pf-bg-saas',        icon: 'fa-microchip',     catLabel: 'B2B & Tech',    title: 'SaaS Startup',            desc: 'Full-stack SaaS platform build, AI onboarding flows, usage analytics, subscription billing, API layer',                  results: [{ n: '+200%', l: 'ARR Growth' }, { n: '89%', l: 'Retention' }, { n: '-60%', l: 'Churn' }] },
  /* ── EDUCATION ── */
  { category: 'education',  bg: 'pf-bg-education',   icon: 'fa-graduation-cap', catLabel: 'Education',    title: 'Education & Coaching',    desc: 'AI tutoring assistant, personalized learning paths, progress tracking, parent dashboard, LMS build',                   results: [{ n: '+95%', l: 'Engagement' }, { n: '+78%', l: 'Completion' }, { n: '4.9★', l: 'Student NPS' }] },
  { category: 'education',  bg: 'pf-bg-nonprofit',   icon: 'fa-hand-holding-heart', catLabel: 'Education', title: 'Nonprofit & Community',  desc: 'Donor management platform, volunteer coordination app, impact reporting dashboard, campaign tools',                     results: [{ n: '+300%', l: 'Donor Reach' }, { n: '+180%', l: 'Donations' }, { n: '5×', l: 'Volunteers' }] },
]

const FILTERS = [
  { label: 'All Industries', slug: 'all',          icon: 'fa-border-all' },
  { label: 'Healthcare',     slug: 'healthcare',   icon: 'fa-heartbeat' },
  { label: 'Home Services',  slug: 'home',         icon: 'fa-tools' },
  { label: 'Professional',   slug: 'professional', icon: 'fa-briefcase' },
  { label: 'Commerce',       slug: 'commerce',     icon: 'fa-shopping-bag' },
  { label: 'B2B & Tech',     slug: 'b2b',          icon: 'fa-industry' },
  { label: 'Education',      slug: 'education',    icon: 'fa-book' },
]

export default function PortfolioFilter() {
  const [active, setActive] = useState('all')

  const visible = active === 'all' ? CARDS : CARDS.filter(c => c.category === active)

  return (
    <>
      {/* ── FILTER BAR ── */}
      <div className="pf-filter-wrap" id="portfolioTop">
        <div className="container">
          <div className="pf-filter-bar">
            {FILTERS.map(({ label, slug, icon }) => (
              <button
                key={slug}
                className={`pf-filter-btn${active === slug ? ' active' : ''}`}
                onClick={() => setActive(slug)}
              >
                <i className={`fas ${icon}`}></i> {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── PORTFOLIO GRID ── */}
      <section className="pf-portfolio-section">
        <div className="container">
          <div className="pf-section-head">
            <h2>Case Study Library</h2>
            <p>Every card below represents a real industry transformation — click to explore the approach, technology stack, and results.</p>
          </div>

          {visible.length === 0 ? (
            <div className="pf-no-results">
              <i className="fas fa-search"></i>
              <h3>No projects found</h3>
              <p>Try selecting a different industry category above.</p>
            </div>
          ) : (
            <div className="pf-grid" id="portfolioGrid">
              {visible.map((card, i) => (
                <div key={`${card.category}-${i}`} className="pf-card">
                  <div className={`pf-card-bg ${card.bg}`}></div>
                  <div className="pf-card-overlay"></div>
                  <div className="pf-card-body">
                    <div className="pf-card-cat"><i className={`fas ${card.icon}`}></i> {card.catLabel}</div>
                    <h3 className="pf-card-title">{card.title}</h3>
                    <p className="pf-card-desc">{card.desc}</p>
                    <div className="pf-card-results">
                      {card.results.map(r => (
                        <div key={r.l} className="pf-result">
                          <span className="pf-rn">{r.n}</span>
                          <span>{r.l}</span>
                        </div>
                      ))}
                    </div>
                    <a href="/contact-us" className="pf-card-link">View Case Study <i className="fas fa-arrow-right"></i></a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
