'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

const projectTypes = [
  { value: 'ai', icon: 'fa-robot', label: 'AI & Automation' },
  { value: 'software', icon: 'fa-code', label: 'Custom Software' },
  { value: 'web', icon: 'fa-globe', label: 'Web & Mobile App' },
  { value: 'ecommerce', icon: 'fa-shopping-cart', label: 'E-Commerce' },
  { value: 'cloud', icon: 'fa-cloud', label: 'Cloud & DevOps' },
  { value: 'data', icon: 'fa-chart-bar', label: 'Data & Analytics' },
  { value: 'digital', icon: 'fa-rocket', label: 'Digital Growth' },
  { value: 'other', icon: 'fa-ellipsis', label: 'Something Else' },
]

const budgets = ['Under $10K', '$10K – $25K', '$25K – $50K', '$50K – $100K', '$100K+', "Let's Discuss"]
const timelines = ['ASAP', '1–3 Months', '3–6 Months', '6+ Months', 'Just Exploring']

const faqItems = [
  { q: 'How quickly can you start my project?', a: "For most projects we can begin within 1–2 weeks of proposal approval. We maintain dedicated capacity for new clients so there's no waiting list. For urgent needs, we can often mobilise within 72 hours." },
  { q: 'Do you work with startups or only enterprises?', a: "Both. We work with founders building their first product, growing SMBs digitalising operations, and enterprise teams needing specialised AI or cloud expertise. Our proposals are scoped to your stage — not a one-size-fits-all quote." },
  { q: 'What does the strategy session cost?', a: "The initial strategy session is completely free and carries no obligation. We believe you should fully understand what we'd build and how before spending a dollar. Most clients find the session valuable even if they choose not to proceed." },
  { q: 'Can you sign an NDA before we talk?', a: "Absolutely. Just check the NDA checkbox in the contact form or mention it in your email. We'll send our standard mutual NDA within 2 hours. We respect the sensitivity of early-stage ideas and proprietary systems." },
  { q: 'Do you handle projects outside California?', a: "Yes — while we're headquartered in San Francisco, we work with clients across the US and internationally. Our engineering team operates across multiple time zones, ensuring responsive communication regardless of your location." },
  { q: 'What information should I prepare before contacting you?', a: "Even rough notes are fine. The more context you share — your industry, the problem you're solving, the users involved, any existing systems — the more specific and useful our response will be. But if you only have a vague idea, reach out anyway. That's what discovery calls are for." },
]

type Errors = Record<string, string>

function validate(fname: string, email: string, phone: string, message: string): Errors {
  const errs: Errors = {}

  if (!fname.trim()) {
    errs.fname = 'Full name is required.'
  } else if (fname.trim().length < 2) {
    errs.fname = 'Name must be at least 2 characters.'
  }

  if (!email.trim()) {
    errs.email = 'Email address is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errs.email = 'Please enter a valid email address.'
  }

  if (phone.trim() && !/^[\+\d\s\-\(\)]{7,20}$/.test(phone.trim())) {
    errs.phone = 'Please enter a valid phone number.'
  }

  if (!message.trim()) {
    errs.message = 'Please tell us about your project.'
  } else if (message.trim().length < 20) {
    errs.message = 'Message must be at least 20 characters.'
  }

  return errs
}

export default function ContactUsClient() {
  const [projectType, setProjectType] = useState('')
  const [budget, setBudget] = useState('')
  const [timeline, setTimeline] = useState('')
  const [charCount, setCharCount] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [errors, setErrors] = useState<Errors>({})
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('ct-visible')
          observer.unobserve(entry.target)
        }
      }),
      { threshold: 0.12 }
    )
    const selectors = '.ct-connect-card, .ct-process-step, .ct-office-card, .ct-testimonial'
    document.querySelectorAll(selectors).forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const clearError = (field: string) =>
    setErrors((prev) => { const next = { ...prev }; delete next[field]; return next })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget

    const fname   = (form.elements.namedItem('fname')   as HTMLInputElement).value
    const email   = (form.elements.namedItem('email')   as HTMLInputElement).value
    const phone   = (form.elements.namedItem('phone')   as HTMLInputElement).value
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value

    const errs = validate(fname, email, phone, message)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      // scroll to first error field
      const firstKey = Object.keys(errs)[0]
      const el = form.elements.namedItem(firstKey) as HTMLElement | null
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    setErrors({})
    setLoading(true)

    const data = {
      fname,
      company: (form.elements.namedItem('company') as HTMLInputElement).value,
      email,
      phone,
      projectType,
      budget,
      timeline,
      message,
      nda: (form.elements.namedItem('nda') as HTMLInputElement).checked,
    }

    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        setErrors({ fname: d.message || 'Something went wrong. Please try again.' })
        setLoading(false)
        return
      }
    } catch {
      setErrors({ fname: 'Unable to connect. Please try again.' })
      setLoading(false)
      return
    }

    setLoading(false)
    setSubmitted(true)
  }

  return (
    <>
      {/* HERO */}
      <section className="ct-hero" id="home">
        <div className="ct-hero-glow"></div>
        <div className="ct-hero-glow-2"></div>
        <div className="ct-hero-grid"></div>
        <div className="container ct-hero-inner">
          <div className="ct-hero-text">
            <div className="badge badge-white"><i className="fas fa-paper-plane"></i> Get In Touch</div>
            <h1 className="ct-hero-h1">Let&apos;s Build Something<br /><em>Extraordinary Together</em></h1>
            <p className="ct-hero-lead">Whether you&apos;re ready to launch, still exploring ideas, or need an expert opinion on your current tech — we&apos;re here. Every great project starts with a single conversation.</p>
          </div>
          <div className="ct-hero-trust">
            {[
              { icon: 'fa-clock', val: '8 hrs', label: 'Response Guarantee' },
              { icon: 'fa-shield-halved', val: 'NDA', label: 'Available on Request' },
              { icon: 'fa-star', val: '4.9★', label: 'Client Satisfaction' },
              { icon: 'fa-handshake', val: 'Free', label: 'Strategy Session' },
            ].map(({ icon, val, label }) => (
              <div key={label} className="ct-trust-item">
                <div className="ct-trust-icon"><i className={`fas ${icon}`}></i></div>
                <div><div className="ct-trust-val">{val}</div><div className="ct-trust-label">{label}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CONTACT SECTION */}
      <section className="ct-main" id="ct-form">
        <div className="container ct-main-inner">
          {/* FORM */}
          <div className="ct-form-col">
            {!submitted ? (
              <>
                <div className="ct-form-header">
                  <h2>Tell Us About Your Project</h2>
                  <p>Fill in the details below and our team will put together a custom roadmap — with timeline, technology recommendations, and transparent pricing.</p>
                </div>
                <form className="ct-form" ref={formRef} onSubmit={handleSubmit} noValidate>

                  {/* Row 1: Name + Company */}
                  <div className="ct-form-row">
                    <div className="ct-field-group">
                      <div className="ct-field">
                        <span className="ct-field-icon"><i className="fas fa-user"></i></span>
                        <input
                          type="text" id="fname" name="fname"
                          className={`ct-input ct-input-icon${errors.fname ? ' ct-input-error' : ''}`}
                          placeholder="Full Name *" required
                          onChange={() => clearError('fname')}
                        />
                      </div>
                      {errors.fname && <span className="ct-field-error-msg"><i className="fas fa-circle-exclamation"></i> {errors.fname}</span>}
                    </div>
                    <div className="ct-field-group">
                      <div className="ct-field">
                        <span className="ct-field-icon"><i className="fas fa-building"></i></span>
                        <input type="text" id="company" name="company" className="ct-input ct-input-icon" placeholder="Company / Business" />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Email + Phone */}
                  <div className="ct-form-row">
                    <div className="ct-field-group">
                      <div className="ct-field">
                        <span className="ct-field-icon"><i className="fas fa-envelope"></i></span>
                        <input
                          type="email" id="email" name="email"
                          className={`ct-input ct-input-icon${errors.email ? ' ct-input-error' : ''}`}
                          placeholder="Email Address *" required
                          onChange={() => clearError('email')}
                        />
                      </div>
                      {errors.email && <span className="ct-field-error-msg"><i className="fas fa-circle-exclamation"></i> {errors.email}</span>}
                    </div>
                    <div className="ct-field-group">
                      <div className="ct-field">
                        <span className="ct-field-icon"><i className="fas fa-phone"></i></span>
                        <input
                          type="tel" id="phone" name="phone"
                          className={`ct-input ct-input-icon${errors.phone ? ' ct-input-error' : ''}`}
                          placeholder="Phone Number"
                          onChange={() => clearError('phone')}
                        />
                      </div>
                      {errors.phone && <span className="ct-field-error-msg"><i className="fas fa-circle-exclamation"></i> {errors.phone}</span>}
                    </div>
                  </div>

                  {/* Project Type */}
                  <div className="ct-section-label">What are you looking to build?</div>
                  <div className="ct-project-types">
                    {projectTypes.map(({ value, icon, label }) => (
                      <label key={value} className={`ct-pt-card${projectType === value ? ' selected' : ''}`} onClick={() => setProjectType(value)}>
                        <input type="radio" name="project_type" value={value} onChange={() => setProjectType(value)} />
                        <span className="ct-pt-inner">
                          <span className="ct-pt-icon"><i className={`fas ${icon}`}></i></span>
                          <span className="ct-pt-name">{label}</span>
                        </span>
                      </label>
                    ))}
                  </div>

                  {/* Budget */}
                  <div className="ct-section-label">Estimated Budget</div>
                  <div className="ct-budget-pills">
                    {budgets.map((b) => (
                      <button key={b} type="button" className={`ct-pill${budget === b ? ' active' : ''}`} onClick={() => setBudget(b)}>{b}</button>
                    ))}
                  </div>

                  {/* Timeline */}
                  <div className="ct-section-label">Timeline</div>
                  <div className="ct-timeline-pills">
                    {timelines.map((t) => (
                      <button key={t} type="button" className={`ct-pill${timeline === t ? ' active' : ''}`} onClick={() => setTimeline(t)}>{t}</button>
                    ))}
                  </div>

                  {/* Message */}
                  <div className="ct-field-group">
                    <div className="ct-field ct-field-full">
                      <textarea
                        id="message" name="message"
                        className={`ct-input ct-textarea${errors.message ? ' ct-input-error' : ''}`}
                        placeholder="Tell us about your project *" rows={5} required maxLength={2000}
                        onChange={(e) => {
                          setCharCount(e.target.value.length)
                          clearError('message')
                        }}
                      ></textarea>
                      <span className={`ct-char-count${charCount > 1800 ? ' ct-char-warn' : ''}`}>{charCount} / 2000</span>
                    </div>
                    {errors.message && <span className="ct-field-error-msg"><i className="fas fa-circle-exclamation"></i> {errors.message}</span>}
                  </div>

                  {/* How did you hear */}
                  <div className="ct-field ct-field-full">
                    <select id="source" name="source" className="ct-input ct-select" defaultValue="">
                      <option value="" disabled>How did you hear about us?</option>
                      {['Google Search', 'LinkedIn', 'Referral from a Client', 'Social Media', 'Blog / Article', 'Conference / Event', 'Other'].map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                    <span className="ct-field-icon ct-select-arrow"><i className="fas fa-chevron-down"></i></span>
                  </div>

                  {/* NDA */}
                  <label className="ct-check-wrap">
                    <input type="checkbox" id="nda" name="nda" className="ct-checkbox" />
                    <span className="ct-check-box"><i className="fas fa-check"></i></span>
                    <span className="ct-check-text">I&apos;d like to discuss this under NDA before sharing project details</span>
                  </label>

                  {/* Submit */}
                  <button type="submit" className="ct-submit" disabled={loading}>
                    {loading
                      ? <span><i className="fas fa-circle-notch fa-spin"></i> Sending…</span>
                      : <span>Send My Project Brief <i className="fas fa-paper-plane"></i></span>}
                  </button>

                  <p className="ct-form-note"><i className="fas fa-lock"></i> Your information is 100% confidential. We never share or sell your data.</p>
                </form>
              </>
            ) : (
              <div className="ct-success">
                <div className="ct-success-icon"><i className="fas fa-check-circle"></i></div>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for reaching out. Our team will review your project brief and respond within <strong>8 business hours</strong> with a personalised strategy and next steps.</p>
                <div className="ct-success-next">
                  <div className="ct-sn-item"><i className="fas fa-search"></i><span>We&apos;ll analyse your project scope</span></div>
                  <div className="ct-sn-item"><i className="fas fa-phone"></i><span>Schedule an intro call at your convenience</span></div>
                  <div className="ct-sn-item"><i className="fas fa-file-lines"></i><span>Deliver a custom proposal within 48 hours</span></div>
                </div>
                <Link href="/portfolio" className="btn btn-primary">Explore Our Portfolio <i className="fas fa-arrow-right"></i></Link>
              </div>
            )}
          </div>

          {/* SIDEBAR */}
          <div className="ct-sidebar">
            <div className="ct-avail-card">
              <div className="ct-avail-header">
                <div className="ct-avail-dot"></div>
                <span>Currently Accepting New Projects</span>
              </div>
              <div className="ct-avail-team">
                <div className="ct-avail-avatars">
                  <div className="ct-avatar ct-av-1"><i className="fas fa-user"></i></div>
                  <div className="ct-avatar ct-av-2"><i className="fas fa-user"></i></div>
                  <div className="ct-avatar ct-av-3"><i className="fas fa-user"></i></div>
                  <div className="ct-avatar ct-av-more">+12</div>
                </div>
                <div className="ct-avail-info">
                  <div className="ct-avail-name">Calidigi Engineering Team</div>
                  <div className="ct-avail-role">15+ Engineers &amp; Designers</div>
                </div>
              </div>
              <div className="ct-avail-slots">
                <div className="ct-slot-label">Q4 2025 Project Slots</div>
                <div className="ct-slot-bar"><div className="ct-slot-fill"></div></div>
                <div className="ct-slot-text"><span className="ct-slot-open">3 slots remaining</span> — book early</div>
              </div>
            </div>

            <div className="ct-info-card">
              <h3 className="ct-info-title">Direct Contact</h3>
              <a href="mailto:sales@calidigi.com" className="ct-info-row">
                <div className="ct-info-icon ct-icon-email"><i className="fas fa-envelope"></i></div>
                <div className="ct-info-detail">
                  <span className="ct-info-label">Email Us</span>
                  <span className="ct-info-val">sales@calidigi.com</span>
                </div>
                <i className="fas fa-arrow-right ct-info-arr"></i>
              </a>
              <a href="tel:+15550001234" className="ct-info-row">
                <div className="ct-info-icon ct-icon-phone"><i className="fas fa-phone"></i></div>
                <div className="ct-info-detail">
                  <span className="ct-info-label">Call Us</span>
                  <span className="ct-info-val">+1 (555) 000-1234</span>
                </div>
                <i className="fas fa-arrow-right ct-info-arr"></i>
              </a>
              <div className="ct-info-row ct-info-row-plain">
                <div className="ct-info-icon ct-icon-loc"><i className="fas fa-location-dot"></i></div>
                <div className="ct-info-detail">
                  <span className="ct-info-label">Headquarters</span>
                  <span className="ct-info-val">1234 Digital Ave, Suite 500<br />San Francisco, CA 94103</span>
                </div>
              </div>
              <div className="ct-info-hours">
                <div className="ct-hours-title"><i className="fas fa-clock"></i> Office Hours</div>
                <div className="ct-hours-row"><span>Monday – Friday</span><span>9:00 AM – 7:00 PM PT</span></div>
                <div className="ct-hours-row"><span>Saturday</span><span>10:00 AM – 3:00 PM PT</span></div>
                <div className="ct-hours-row ct-hours-closed"><span>Sunday</span><span>Closed</span></div>
              </div>
              <div className="ct-social-row">
                <a href="javascript:void(0);" className="ct-soc" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                <a href="javascript:void(0);" className="ct-soc" aria-label="X/Twitter"><i className="fab fa-x-twitter"></i></a>
                <a href="javascript:void(0);" className="ct-soc" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                <a href="javascript:void(0);" className="ct-soc" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              </div>
            </div>

            <div className="ct-quick-card">
              <h4 className="ct-quick-title">Before You Reach Out</h4>
              <Link href="/solutions" className="ct-quick-link">
                <i className="fas fa-microchip"></i>
                <div><span>Explore Our Solutions</span><small>See what we build</small></div>
                <i className="fas fa-chevron-right"></i>
              </Link>
              <Link href="/portfolio" className="ct-quick-link">
                <i className="fas fa-briefcase"></i>
                <div><span>View Our Portfolio</span><small>30+ industry case studies</small></div>
                <i className="fas fa-chevron-right"></i>
              </Link>
              <Link href="/services" className="ct-quick-link">
                <i className="fas fa-cogs"></i>
                <div><span>Our Services</span><small>Full capability list</small></div>
                <i className="fas fa-chevron-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* THREE WAYS TO CONNECT */}
      <section className="ct-connect-section">
        <div className="container">
          <div className="ct-connect-head">
            <h2>Three Ways to Start</h2>
            <p>Pick whichever feels most comfortable. We&apos;ll meet you where you are.</p>
          </div>
          <div className="ct-connect-grid">
            <div className="ct-connect-card">
              <div className="ct-cc-icon ct-cc-email"><i className="fas fa-envelope-open-text"></i></div>
              <h3>Send a Message</h3>
              <p>Fill out the project brief above. Most detailed method — helps us prepare a truly personalised response with pricing and timeline.</p>
              <div className="ct-cc-detail"><i className="fas fa-clock"></i> We reply within 8 hours</div>
              <a href="#ct-form" className="ct-cc-btn">Fill the Form <i className="fas fa-arrow-right"></i></a>
            </div>
            <div className="ct-connect-card ct-connect-card-featured">
              <div className="ct-cc-badge">Most Popular</div>
              <div className="ct-cc-icon ct-cc-call"><i className="fas fa-phone-volume"></i></div>
              <h3>Email Us Directly</h3>
              <p>Drop us an email at sales@calidigi.com. Great for quick questions, ballpark estimates, or checking if we&apos;re the right fit before investing time in a full brief.</p>
              <div className="ct-cc-detail"><i className="fas fa-bolt"></i> Fastest turnaround</div>
              <a href="mailto:sales@calidigi.com" className="ct-cc-btn ct-cc-btn-primary">Email sales@calidigi.com <i className="fas fa-arrow-right"></i></a>
            </div>
            <div className="ct-connect-card">
              <div className="ct-cc-icon ct-cc-schedule"><i className="fas fa-calendar-check"></i></div>
              <h3>Book a Strategy Call</h3>
              <p>Schedule a 30-minute discovery call with our team. Perfect for complex projects where you want to talk through options before committing to anything.</p>
              <div className="ct-cc-detail"><i className="fas fa-star"></i> No obligation, 100% free</div>
              <a href="mailto:sales@calidigi.com?subject=Schedule%20Strategy%20Call" className="ct-cc-btn">Schedule a Call <i className="fas fa-arrow-right"></i></a>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT HAPPENS NEXT */}
      <section className="ct-process-section">
        <div className="container">
          <div className="ct-process-head">
            <span className="badge"><i className="fas fa-map-signs"></i> What Happens Next</span>
            <h2>Your Journey from <em>Inquiry to Launch</em></h2>
            <p>We&apos;ve refined our onboarding to be transparent, fast, and genuinely collaborative — here&apos;s what to expect.</p>
          </div>
          <div className="ct-process-track">
            <div className="ct-process-step">
              <div className="ct-ps-number">01</div>
              <div className="ct-ps-icon"><i className="fas fa-inbox"></i></div>
              <div className="ct-ps-body">
                <h3>We Receive &amp; Review</h3>
                <p>Within 8 business hours our team reviews your brief, researches your industry and competitors, and assigns the right specialist to your project.</p>
                <div className="ct-ps-time"><i className="fas fa-clock"></i> Within 8 hours</div>
              </div>
            </div>
            <div className="ct-ps-arrow"><i className="fas fa-arrow-right"></i></div>
            <div className="ct-process-step">
              <div className="ct-ps-number">02</div>
              <div className="ct-ps-icon"><i className="fas fa-comments"></i></div>
              <div className="ct-ps-body">
                <h3>Discovery Call</h3>
                <p>A focused 30–45 minute call with a senior engineer or strategist. We dig into your goals, constraints, timelines, and success criteria — no small talk.</p>
                <div className="ct-ps-time"><i className="fas fa-clock"></i> Day 1–2</div>
              </div>
            </div>
            <div className="ct-ps-arrow"><i className="fas fa-arrow-right"></i></div>
            <div className="ct-process-step">
              <div className="ct-ps-number">03</div>
              <div className="ct-ps-icon"><i className="fas fa-file-lines"></i></div>
              <div className="ct-ps-body">
                <h3>Custom Proposal</h3>
                <p>We deliver a detailed proposal: project scope, technology stack, timeline with milestones, team structure, and fully transparent pricing. No surprises.</p>
                <div className="ct-ps-time"><i className="fas fa-clock"></i> Day 2–3</div>
              </div>
            </div>
            <div className="ct-ps-arrow"><i className="fas fa-arrow-right"></i></div>
            <div className="ct-process-step">
              <div className="ct-ps-number">04</div>
              <div className="ct-ps-icon"><i className="fas fa-rocket"></i></div>
              <div className="ct-ps-body">
                <h3>Project Kickoff</h3>
                <p>Once you approve, we set up your dedicated workspace, introduce the team, finalise the roadmap, and begin development — usually within the same week.</p>
                <div className="ct-ps-time"><i className="fas fa-clock"></i> Week 1</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="ct-faq-section">
        <div className="container ct-faq-inner">
          <div className="ct-faq-left">
            <span className="badge"><i className="fas fa-circle-question"></i> FAQ</span>
            <h2>Common Questions</h2>
            <p>Can&apos;t find what you&apos;re looking for? Email us at <a href="mailto:sales@calidigi.com">sales@calidigi.com</a> and we&apos;ll answer within a few hours.</p>
            <div className="ct-faq-contact">
              <a href="mailto:sales@calidigi.com" className="btn btn-primary">Email Us <i className="fas fa-arrow-right"></i></a>
            </div>
          </div>
          <div className="ct-faq-right">
            {faqItems.map(({ q, a }, i) => (
              <div key={q} className={`ct-faq-item${openFaq === i ? ' open' : ''}`} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="ct-faq-q">
                  <span>{q}</span>
                  <i className={`fas ${openFaq === i ? 'fa-minus' : 'fa-plus'} ct-faq-icon`}></i>
                </div>
                {openFaq === i && <div className="ct-faq-a"><p>{a}</p></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OFFICE LOCATIONS */}
      <section className="ct-offices-section">
        <div className="container">
          <div className="ct-offices-head">
            <h2>Find Us</h2>
            <p>Headquartered in San Francisco with remote teams across the United States.</p>
          </div>
          <div className="ct-offices-grid">
            <div className="ct-office-card ct-office-main">
              <div className="ct-office-map">
                <div className="ct-map-placeholder">
                  <div className="ct-map-pin"><i className="fas fa-location-dot"></i></div>
                  <div className="ct-map-city">San Francisco, CA</div>
                </div>
              </div>
              <div className="ct-office-body">
                <div className="ct-office-badge">Headquarters</div>
                <h3>San Francisco</h3>
                <p>1234 Digital Ave, Suite 500<br />San Francisco, CA 94103</p>
                <div className="ct-office-links">
                  <a href="mailto:sales@calidigi.com" className="ct-ol"><i className="fas fa-envelope"></i> sales@calidigi.com</a>
                  <a href="tel:+15550001234" className="ct-ol"><i className="fas fa-phone"></i> +1 (555) 000-1234</a>
                </div>
                <a href="https://maps.google.com/?q=San+Francisco+CA" target="_blank" rel="noopener noreferrer" className="btn btn-primary ct-office-btn">
                  Get Directions <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>
            <div className="ct-office-card">
              <div className="ct-office-map ct-office-map-la">
                <div className="ct-map-placeholder">
                  <div className="ct-map-pin"><i className="fas fa-location-dot"></i></div>
                  <div className="ct-map-city">Los Angeles, CA</div>
                </div>
              </div>
              <div className="ct-office-body">
                <div className="ct-office-badge ct-office-badge-sec">Regional Office</div>
                <h3>Los Angeles</h3>
                <p>Remote-first hub serving Southern California businesses with dedicated account managers.</p>
                <a href="mailto:sales@calidigi.com" className="ct-ol"><i className="fas fa-envelope"></i> sales@calidigi.com</a>
              </div>
            </div>
            <div className="ct-office-card">
              <div className="ct-office-map ct-office-map-remote">
                <div className="ct-map-placeholder">
                  <div className="ct-map-pin ct-map-pin-us"><i className="fas fa-map"></i></div>
                  <div className="ct-map-city">Nationwide</div>
                </div>
              </div>
              <div className="ct-office-body">
                <div className="ct-office-badge ct-office-badge-sec">Remote Team</div>
                <h3>Across the US</h3>
                <p>Engineers, designers, and strategists distributed across Pacific, Mountain, and Eastern time zones.</p>
                <a href="mailto:sales@calidigi.com" className="ct-ol"><i className="fas fa-envelope"></i> sales@calidigi.com</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP / TESTIMONIALS */}
      <section className="ct-trust-strip">
        <div className="container">
          <div className="ct-trust-head">What our clients say after that first message</div>
          <div className="ct-testimonials-grid">
            <div className="ct-testimonial">
              <div className="ct-test-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
              <p>&ldquo;Within hours of submitting the form, Calidigi came back with a detailed breakdown of exactly how they&apos;d approach our AI project. No generic pitch — specific, actionable, and impressive.&rdquo;</p>
              <div className="ct-test-author">
                <div className="ct-test-avatar"><i className="fas fa-user"></i></div>
                <div>
                  <div className="ct-test-name">Sarah M.</div>
                  <div className="ct-test-role">CTO, HealthTech Startup</div>
                </div>
              </div>
            </div>
            <div className="ct-testimonial">
              <div className="ct-test-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
              <p>&ldquo;We filled out the form on a Tuesday. By Thursday we had a full proposal with a tech stack recommendation, timeline, and pricing. Signed the contract Friday. Unbelievably efficient.&rdquo;</p>
              <div className="ct-test-author">
                <div className="ct-test-avatar"><i className="fas fa-user"></i></div>
                <div>
                  <div className="ct-test-name">James R.</div>
                  <div className="ct-test-role">Founder, SaaS Platform</div>
                </div>
              </div>
            </div>
            <div className="ct-testimonial">
              <div className="ct-test-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
              <p>&ldquo;I was sceptical about reaching out — usually these forms go into a void. Calidigi responded within 4 hours with thoughtful questions that showed they&apos;d actually read my brief. Rare.&rdquo;</p>
              <div className="ct-test-author">
                <div className="ct-test-avatar"><i className="fas fa-user"></i></div>
                <div>
                  <div className="ct-test-name">Maria T.</div>
                  <div className="ct-test-role">Director of Operations, Retail Chain</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
