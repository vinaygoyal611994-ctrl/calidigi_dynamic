import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Calidigi — California Digital Technology Company',
  description:
    "Read Calidigi's Privacy Policy to understand how we collect, use, and protect your personal information in compliance with California privacy laws (CCPA) and GDPR.",
  alternates: {
    canonical: 'https://www.calidigi.com/privacy-policy',
    languages: { 'en-US': 'https://www.calidigi.com/privacy-policy', 'x-default': 'https://www.calidigi.com/privacy-policy' },
  },
  robots: { index: true, follow: true },
  openGraph: {
    url: 'https://www.calidigi.com/privacy-policy',
    title: 'Privacy Policy | Calidigi — California Digital Technology Company',
    description: "Read Calidigi's Privacy Policy to understand how we collect, use, and protect your personal information in compliance with California privacy laws (CCPA) and GDPR.",
  },
  twitter: {
    title: 'Privacy Policy | Calidigi — California Digital Technology Company',
    description: "Read Calidigi's Privacy Policy to understand how we collect, use, and protect your personal information in compliance with California privacy laws (CCPA) and GDPR.",
  },
}

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="lg-hero">
        <div className="container">
          <div className="lg-hero-inner">
            <div className="badge badge-white"><i className="fas fa-shield-halved"></i> Legal</div>
            <h1>Privacy Policy</h1>
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
              <a href="#info-collect"><i className="fas fa-circle-dot"></i> Information We Collect</a>
              <a href="#how-use"><i className="fas fa-circle-dot"></i> How We Use It</a>
              <a href="#sharing"><i className="fas fa-circle-dot"></i> Sharing &amp; Disclosure</a>
              <a href="#cookies"><i className="fas fa-circle-dot"></i> Cookies</a>
              <a href="#data-security"><i className="fas fa-circle-dot"></i> Data Security</a>
              <a href="#retention"><i className="fas fa-circle-dot"></i> Data Retention</a>
              <a href="#your-rights"><i className="fas fa-circle-dot"></i> Your Rights</a>
              <a href="#california"><i className="fas fa-circle-dot"></i> California (CCPA)</a>
              <a href="#children"><i className="fas fa-circle-dot"></i> Children&apos;s Privacy</a>
              <a href="#third-party"><i className="fas fa-circle-dot"></i> Third-Party Links</a>
              <a href="#changes"><i className="fas fa-circle-dot"></i> Policy Changes</a>
              <a href="#contact-pp"><i className="fas fa-circle-dot"></i> Contact Us</a>
            </nav>
            <div className="lg-toc-contact">
              <p>Questions about your data?</p>
              <a href="mailto:privacy@calidigi.com"><i className="fas fa-envelope"></i> privacy@calidigi.com</a>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg-content">

            <div className="lg-highlight">
              This Privacy Policy explains how Calidigi (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, and protects information about you when you visit our website or engage our services. By using our website you agree to the practices described here.
            </div>

            <div className="lg-section" id="info-collect">
              <div className="lg-section-num">Section 01</div>
              <h2>Information We Collect</h2>
              <p>We collect information you provide directly to us and information collected automatically when you use our website.</p>
              <p><strong>Information you provide:</strong></p>
              <ul>
                <li>Name, email address, phone number, and company name when you fill out our contact form</li>
                <li>Project details, budget ranges, and timeline information submitted through inquiry forms</li>
                <li>Communications you send us by email, phone, or social media</li>
                <li>Information provided when subscribing to our newsletter or blog updates</li>
              </ul>
              <p><strong>Information collected automatically:</strong></p>
              <ul>
                <li>IP address, browser type, operating system, and device identifiers</li>
                <li>Pages visited, time spent on pages, and referring URLs</li>
                <li>Cookie data and similar tracking technologies (see Section 4)</li>
                <li>General geographic location based on IP address</li>
              </ul>
            </div>

            <div className="lg-section" id="how-use">
              <div className="lg-section-num">Section 02</div>
              <h2>How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Respond to your inquiries and provide requested services</li>
                <li>Send project proposals, quotes, and follow-up communications</li>
                <li>Improve our website experience and content</li>
                <li>Send marketing communications (only with your consent)</li>
                <li>Analyse website usage patterns to improve performance</li>
                <li>Comply with legal obligations and prevent fraudulent activity</li>
                <li>Maintain records of our business transactions and correspondence</li>
              </ul>
              <p>We will never sell your personal information to third parties for their own marketing purposes.</p>
            </div>

            <div className="lg-section" id="sharing">
              <div className="lg-section-num">Section 03</div>
              <h2>Sharing &amp; Disclosure</h2>
              <p>We do not sell, trade, or rent your personal information. We may share your data only in the following circumstances:</p>
              <ul>
                <li><strong>Service Providers:</strong> Trusted third-party vendors who assist us in operating our website and delivering services (e.g., hosting providers, email platforms, analytics tools)</li>
                <li><strong>Legal Requirements:</strong> When required by law, regulation, court order, or to protect our legal rights</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of business assets, your data may be transferred — we will notify you before this occurs</li>
                <li><strong>With Your Consent:</strong> For any other purpose with your explicit permission</li>
              </ul>
              <p>All third-party service providers are contractually obligated to protect your information and use it only for the purposes we specify.</p>
            </div>

            <div className="lg-section" id="cookies">
              <div className="lg-section-num">Section 04</div>
              <h2>Cookies &amp; Tracking Technologies</h2>
              <p>We use cookies and similar technologies to enhance your experience. You can control cookie preferences through your browser settings. For full details, please read our <Link href="/cookie-policy">Cookie Policy</Link>.</p>
              <ul>
                <li><strong>Essential cookies</strong> — required for the website to function properly</li>
                <li><strong>Analytics cookies</strong> — help us understand how visitors interact with our site</li>
                <li><strong>Marketing cookies</strong> — used to deliver relevant advertisements (only with consent)</li>
              </ul>
            </div>

            <div className="lg-section" id="data-security">
              <div className="lg-section-num">Section 05</div>
              <h2>Data Security</h2>
              <p>We implement industry-standard security measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. These measures include:</p>
              <ul>
                <li>SSL/TLS encryption for all data transmitted via our website</li>
                <li>Secure, access-controlled servers hosted in SOC 2 compliant facilities</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Strict internal access controls — only authorised personnel access personal data</li>
              </ul>
              <p>However, no method of internet transmission is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.</p>
            </div>

            <div className="lg-section" id="retention">
              <div className="lg-section-num">Section 06</div>
              <h2>Data Retention</h2>
              <p>We retain personal information for as long as necessary to fulfil the purposes outlined in this policy, unless a longer retention period is required by law. Specifically:</p>
              <ul>
                <li>Contact form submissions are retained for up to 3 years for business correspondence purposes</li>
                <li>Client project data is retained for the duration of the engagement plus 5 years</li>
                <li>Analytics data is retained in aggregated, anonymised form indefinitely</li>
                <li>Marketing communication preferences are retained until you unsubscribe</li>
              </ul>
              <p>You may request deletion of your personal data at any time by contacting us at <a href="mailto:privacy@calidigi.com">privacy@calidigi.com</a>.</p>
            </div>

            <div className="lg-section" id="your-rights">
              <div className="lg-section-num">Section 07</div>
              <h2>Your Rights</h2>
              <p>Depending on your location, you may have the following rights regarding your personal information:</p>
              <ul>
                <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data</li>
                <li><strong>Deletion:</strong> Request erasure of your personal data (&ldquo;right to be forgotten&rdquo;)</li>
                <li><strong>Portability:</strong> Receive your data in a structured, commonly used format</li>
                <li><strong>Restriction:</strong> Request that we limit how we process your data</li>
                <li><strong>Objection:</strong> Object to processing based on legitimate interests or direct marketing</li>
                <li><strong>Withdrawal:</strong> Withdraw consent at any time where processing is consent-based</li>
              </ul>
              <p>To exercise any of these rights, email us at <a href="mailto:privacy@calidigi.com">privacy@calidigi.com</a>. We will respond within 30 days.</p>
            </div>

            <div className="lg-section" id="california">
              <div className="lg-section-num">Section 08</div>
              <h2>California Residents (CCPA)</h2>
              <p>If you are a California resident, the California Consumer Privacy Act (CCPA) provides you with additional rights:</p>
              <ul>
                <li><strong>Right to Know:</strong> Request disclosure of the categories and specific pieces of personal information we have collected about you</li>
                <li><strong>Right to Delete:</strong> Request deletion of your personal information, subject to certain exceptions</li>
                <li><strong>Right to Opt-Out:</strong> Opt out of the sale of your personal information (note: we do not sell personal information)</li>
                <li><strong>Right to Non-Discrimination:</strong> We will not discriminate against you for exercising your CCPA rights</li>
              </ul>
              <p>To submit a CCPA request, contact us at <a href="mailto:privacy@calidigi.com">privacy@calidigi.com</a> or call <a href="tel:+15550001234">+1 (555) 000-1234</a>. We will verify your identity before processing requests.</p>
            </div>

            <div className="lg-section" id="children">
              <div className="lg-section-num">Section 09</div>
              <h2>Children&apos;s Privacy</h2>
              <p>Our website and services are not directed to children under the age of 16. We do not knowingly collect personal information from children. If we become aware that we have inadvertently collected data from a child under 16, we will take immediate steps to delete such information. If you believe we may have collected information from a child, please contact us immediately.</p>
            </div>

            <div className="lg-section" id="third-party">
              <div className="lg-section-num">Section 10</div>
              <h2>Third-Party Links</h2>
              <p>Our website may contain links to third-party websites, plugins, and applications. Clicking those links may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements. We encourage you to read the privacy policy of every website you visit.</p>
            </div>

            <div className="lg-section" id="changes">
              <div className="lg-section-num">Section 11</div>
              <h2>Changes to This Policy</h2>
              <p>We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by:</p>
              <ul>
                <li>Updating the &ldquo;Last Updated&rdquo; date at the top of this page</li>
                <li>Posting a prominent notice on our website</li>
                <li>Sending an email notification to registered users (for significant changes)</li>
              </ul>
              <p>Your continued use of our website after any changes constitutes your acceptance of the updated policy.</p>
            </div>

            <div className="lg-section" id="contact-pp">
              <div className="lg-section-num">Section 12</div>
              <h2>Contact Us</h2>
              <p>If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact our Data Privacy Team:</p>
              <ul>
                <li><strong>Email:</strong> <a href="mailto:privacy@calidigi.com">privacy@calidigi.com</a></li>
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
