import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service | Calidigi — California Digital Technology Company',
  description:
    "Read Calidigi's Terms of Service governing the use of our website and digital technology services, including AI, software development, and digital transformation solutions.",
  alternates: {
    canonical: 'https://www.calidigi.com/terms-of-service',
    languages: { 'en-US': 'https://www.calidigi.com/terms-of-service', 'x-default': 'https://www.calidigi.com/terms-of-service' },
  },
  robots: { index: true, follow: true },
  openGraph: {
    url: 'https://www.calidigi.com/terms-of-service',
    title: 'Terms of Service | Calidigi — California Digital Technology Company',
    description: "Review Calidigi's Terms of Service covering service agreements, intellectual property rights, payment terms, confidentiality, and California governing law.",
  },
  twitter: {
    title: 'Terms of Service | Calidigi — California Digital Technology Company',
    description: "Review Calidigi's Terms of Service covering service agreements, intellectual property rights, payment terms, confidentiality, and California governing law.",
  },
}

export default function TermsOfServicePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="lg-hero">
        <div className="container">
          <div className="lg-hero-inner">
            <div className="badge badge-white"><i className="fas fa-file-contract"></i> Legal</div>
            <h1>Terms of Service</h1>
            <p className="lg-hero-updated"><i className="fas fa-calendar-check"></i> Last updated: September 29, 2025</p>
          </div>
        </div>
      </section>

      {/* ── BODY ── */}
      <section className="lg-body">
        <div className="container lg-body-inner">

          {/* TOC Sidebar */}
          <aside className="lg-toc">
            <div className="lg-toc-title">Contents</div>
            <nav className="lg-toc-list">
              <a href="#acceptance"><i className="fas fa-circle-dot"></i> Acceptance</a>
              <a href="#services-desc"><i className="fas fa-circle-dot"></i> Our Services</a>
              <a href="#user-obligations"><i className="fas fa-circle-dot"></i> Your Obligations</a>
              <a href="#intellectual-property"><i className="fas fa-circle-dot"></i> Intellectual Property</a>
              <a href="#payment"><i className="fas fa-circle-dot"></i> Payment Terms</a>
              <a href="#confidentiality"><i className="fas fa-circle-dot"></i> Confidentiality</a>
              <a href="#disclaimer"><i className="fas fa-circle-dot"></i> Disclaimers</a>
              <a href="#liability"><i className="fas fa-circle-dot"></i> Limitation of Liability</a>
              <a href="#indemnification"><i className="fas fa-circle-dot"></i> Indemnification</a>
              <a href="#termination"><i className="fas fa-circle-dot"></i> Termination</a>
              <a href="#governing-law"><i className="fas fa-circle-dot"></i> Governing Law</a>
              <a href="#contact-tos"><i className="fas fa-circle-dot"></i> Contact Us</a>
            </nav>
            <div className="lg-toc-contact">
              <p>Legal questions?</p>
              <a href="mailto:legal@calidigi.com"><i className="fas fa-envelope"></i> legal@calidigi.com</a>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg-content">

            <div className="lg-highlight">
              Please read these Terms of Service carefully before using our website or engaging Calidigi for any services. By accessing our website or entering into a service agreement, you agree to be bound by these terms.
            </div>

            <div className="lg-section" id="acceptance">
              <div className="lg-section-num">Section 01</div>
              <h2>Acceptance of Terms</h2>
              <p>These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the Calidigi website (www.calidigi.com) and any services provided by Calidigi Inc. (&ldquo;Calidigi,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;).</p>
              <p>By accessing our website or engaging our services, you confirm that you are at least 18 years of age, have the legal authority to enter into binding agreements, and agree to comply with these Terms. If you do not agree, please do not use our website or services.</p>
              <p>We reserve the right to update these Terms at any time. Continued use after changes constitutes acceptance of the revised Terms.</p>
            </div>

            <div className="lg-section" id="services-desc">
              <div className="lg-section-num">Section 02</div>
              <h2>Our Services</h2>
              <p>Calidigi provides premium digital technology services to businesses, including:</p>
              <ul>
                <li>AI integration, automation, and machine learning solutions</li>
                <li>Custom software development (web applications, mobile apps, SaaS platforms)</li>
                <li>Website design, development, and digital experience</li>
                <li>Cloud architecture, DevOps, and infrastructure management</li>
                <li>Data analytics, business intelligence, and reporting</li>
                <li>Digital marketing, SEO, and growth strategy</li>
                <li>Digital transformation consulting and technology roadmapping</li>
              </ul>
              <p>Specific deliverables, timelines, pricing, and terms for individual engagements are set forth in separate Project Agreements or Statements of Work, which supplement these Terms.</p>
            </div>

            <div className="lg-section" id="user-obligations">
              <div className="lg-section-num">Section 03</div>
              <h2>Your Obligations</h2>
              <p>When using our website or services, you agree to:</p>
              <ul>
                <li>Provide accurate, current, and complete information when submitting inquiries or project briefs</li>
                <li>Not use our website for any unlawful purpose or in a way that violates applicable laws or regulations</li>
                <li>Not attempt to gain unauthorised access to any part of our systems or infrastructure</li>
                <li>Not transmit any harmful, offensive, or disruptive content through our communication channels</li>
                <li>Not reproduce, duplicate, copy, or exploit any portion of our website without express written permission</li>
                <li>Cooperate with our team during project delivery, including timely approvals and feedback</li>
                <li>Provide accurate project requirements and notify us promptly of any changes</li>
              </ul>
            </div>

            <div className="lg-section" id="intellectual-property">
              <div className="lg-section-num">Section 04</div>
              <h2>Intellectual Property</h2>
              <p><strong>Our IP:</strong> All content on this website &mdash; including text, graphics, logos, icons, images, and software &mdash; is the property of Calidigi and protected by US and international copyright, trademark, and other intellectual property laws.</p>
              <p><strong>Client IP:</strong> Upon full payment of agreed fees, clients receive full ownership of all custom deliverables created specifically for their project, including source code, designs, and documentation, unless otherwise agreed in the Project Agreement.</p>
              <p><strong>Pre-existing IP:</strong> Any tools, frameworks, libraries, or proprietary methodologies that we use in delivering services &mdash; which exist prior to or independent of your project &mdash; remain the sole property of Calidigi. We grant you a perpetual, non-exclusive licence to use such components as incorporated in your deliverables.</p>
              <p><strong>Portfolio Rights:</strong> Unless you request otherwise in writing, we retain the right to display completed work in our portfolio, case studies, and marketing materials.</p>
            </div>

            <div className="lg-section" id="payment">
              <div className="lg-section-num">Section 05</div>
              <h2>Payment Terms</h2>
              <p>Payment terms for services are as follows, unless otherwise specified in a Project Agreement:</p>
              <ul>
                <li>A deposit (typically 30&ndash;50% of the total project value) is required before work commences</li>
                <li>Milestone payments are due upon completion of each agreed project phase</li>
                <li>Final payment is due upon project delivery and before final files/code are transferred</li>
                <li>Invoices are payable within 14 days of issue unless otherwise agreed</li>
                <li>Late payments are subject to interest at 1.5% per month on the outstanding balance</li>
                <li>Prices are quoted in USD and exclude applicable taxes unless stated otherwise</li>
              </ul>
              <p>We reserve the right to suspend work on any project where payment obligations are not met.</p>
            </div>

            <div className="lg-section" id="confidentiality">
              <div className="lg-section-num">Section 06</div>
              <h2>Confidentiality</h2>
              <p>Both parties agree to keep confidential any proprietary or sensitive information shared during the course of an engagement. We will not disclose your business information, project details, or trade secrets to third parties without your written consent, except as required by law.</p>
              <p>We are happy to sign a mutual Non-Disclosure Agreement (NDA) before any project discussion. Simply request one via our <Link href="/contact-us">Contact page</Link> and we will issue one within 2 business hours.</p>
            </div>

            <div className="lg-section" id="disclaimer">
              <div className="lg-section-num">Section 07</div>
              <h2>Disclaimers</h2>
              <p>Our website and services are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind, either express or implied, including but not limited to:</p>
              <ul>
                <li>Warranties of merchantability, fitness for a particular purpose, or non-infringement</li>
                <li>Guarantees that the website will be uninterrupted, error-free, or free of viruses</li>
                <li>Warranties regarding the accuracy or completeness of any content on our website</li>
              </ul>
              <p>We do not warrant that our services will achieve specific business outcomes, revenue targets, or performance metrics, unless explicitly stated in a signed Project Agreement with defined KPIs.</p>
            </div>

            <div className="lg-section" id="liability">
              <div className="lg-section-num">Section 08</div>
              <h2>Limitation of Liability</h2>
              <p>To the maximum extent permitted by applicable law, Calidigi shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, goodwill, or business opportunities, arising from your use of our website or services.</p>
              <p>Our total liability to you for any claims arising from our services shall not exceed the total amount paid by you to Calidigi in the three (3) months preceding the claim.</p>
              <p>Some jurisdictions do not allow the exclusion of certain warranties or limitation of liability &mdash; in such cases, our liability will be limited to the maximum extent permitted by law.</p>
            </div>

            <div className="lg-section" id="indemnification">
              <div className="lg-section-num">Section 09</div>
              <h2>Indemnification</h2>
              <p>You agree to indemnify, defend, and hold harmless Calidigi and its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including legal fees) arising from:</p>
              <ul>
                <li>Your use of our website or services in violation of these Terms</li>
                <li>Your violation of any applicable law or regulation</li>
                <li>Content or materials you provide to us that infringe on third-party rights</li>
                <li>Any dispute between you and a third party in connection with our services</li>
              </ul>
            </div>

            <div className="lg-section" id="termination">
              <div className="lg-section-num">Section 10</div>
              <h2>Termination</h2>
              <p>Either party may terminate a service engagement with written notice as specified in the relevant Project Agreement. In general:</p>
              <ul>
                <li>Clients may terminate with 14 days written notice, and will be invoiced for all work completed to date</li>
                <li>Calidigi may terminate immediately if a client breaches these Terms or fails to pay outstanding invoices after 30 days</li>
                <li>Upon termination, we will deliver all completed work and you will remit all outstanding payments</li>
              </ul>
              <p>Sections regarding intellectual property, confidentiality, limitation of liability, and governing law survive termination.</p>
            </div>

            <div className="lg-section" id="governing-law">
              <div className="lg-section-num">Section 11</div>
              <h2>Governing Law &amp; Disputes</h2>
              <p>These Terms are governed by and construed in accordance with the laws of the State of California, United States, without regard to conflict of law principles.</p>
              <p>Any disputes arising from these Terms or our services shall first be attempted to be resolved through good-faith negotiation. If unresolved within 30 days, disputes shall be submitted to binding arbitration in San Francisco, California, under the rules of the American Arbitration Association.</p>
              <p>Notwithstanding the above, either party may seek injunctive relief in a court of competent jurisdiction to prevent irreparable harm.</p>
            </div>

            <div className="lg-section" id="contact-tos">
              <div className="lg-section-num">Section 12</div>
              <h2>Contact Us</h2>
              <p>For any questions about these Terms of Service, please contact our legal team:</p>
              <ul>
                <li><strong>Email:</strong> <a href="mailto:legal@calidigi.com">legal@calidigi.com</a></li>
                <li><strong>General:</strong> <a href="mailto:hello@calidigi.com">hello@calidigi.com</a></li>
                <li><strong>Phone:</strong> <a href="tel:+15550001234">+1 (555) 000-1234</a></li>
                <li><strong>Address:</strong> 1234 Digital Ave, Suite 500, San Francisco, CA 94103</li>
              </ul>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
