import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy | Calidigi — California Digital Technology Company',
  description:
    'Learn how Calidigi uses cookies and similar tracking technologies on our website, what data is collected, and how you can manage your cookie preferences.',
  alternates: {
    canonical: 'https://www.calidigi.com/cookie-policy',
    languages: { 'en-US': 'https://www.calidigi.com/cookie-policy', 'x-default': 'https://www.calidigi.com/cookie-policy' },
  },
  robots: { index: true, follow: true },
  openGraph: {
    url: 'https://www.calidigi.com/cookie-policy',
    title: 'Cookie Policy | Calidigi — California Digital Technology Company',
    description: 'Learn how Calidigi uses cookies and similar tracking technologies on our website, and how you can control your cookie preferences.',
  },
  twitter: {
    title: 'Cookie Policy | Calidigi — California Digital Technology Company',
    description: 'Learn how Calidigi uses cookies and similar tracking technologies on our website, and how you can control your cookie preferences.',
  },
}

export default function CookiePolicyPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="lg-hero">
        <div className="container">
          <div className="lg-hero-inner">
            <div className="badge badge-white"><i className="fas fa-cookie-bite"></i> Legal</div>
            <h1>Cookie Policy</h1>
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
              <a href="#what-cookies"><i className="fas fa-circle-dot"></i> What Are Cookies</a>
              <a href="#why-use"><i className="fas fa-circle-dot"></i> Why We Use Them</a>
              <a href="#types"><i className="fas fa-circle-dot"></i> Types of Cookies</a>
              <a href="#cookie-list"><i className="fas fa-circle-dot"></i> Cookies We Use</a>
              <a href="#third-party-c"><i className="fas fa-circle-dot"></i> Third-Party Cookies</a>
              <a href="#manage"><i className="fas fa-circle-dot"></i> Managing Cookies</a>
              <a href="#do-not-track"><i className="fas fa-circle-dot"></i> Do Not Track</a>
              <a href="#updates-c"><i className="fas fa-circle-dot"></i> Policy Updates</a>
              <a href="#contact-cp"><i className="fas fa-circle-dot"></i> Contact Us</a>
            </nav>
            <div className="lg-toc-contact">
              <p>Cookie questions?</p>
              <a href="mailto:privacy@calidigi.com"><i className="fas fa-envelope"></i> privacy@calidigi.com</a>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg-content">

            <div className="lg-highlight">
              This Cookie Policy explains how Calidigi uses cookies and similar tracking technologies when you visit our website. It describes what these technologies are, why we use them, and your rights to control our use of them.
            </div>

            <div className="lg-section" id="what-cookies">
              <div className="lg-section-num">Section 01</div>
              <h2>What Are Cookies?</h2>
              <p>Cookies are small text files that are placed on your device (computer, tablet, or smartphone) when you visit a website. They are widely used to make websites work efficiently, provide a better user experience, and give website owners useful information about how their site is used.</p>
              <p>Cookies are not programs and cannot carry viruses or malware. They simply store a small amount of data that can be read by the website that created them.</p>
              <p>In addition to cookies, we may use similar technologies such as:</p>
              <ul>
                <li><strong>Web beacons</strong> &mdash; tiny transparent images embedded in web pages or emails that track whether a page has been viewed</li>
                <li><strong>Local storage</strong> &mdash; data stored in your browser&apos;s local storage rather than as a cookie</li>
                <li><strong>Session storage</strong> &mdash; temporary data stored for the duration of your browser session</li>
                <li><strong>Pixel tags</strong> &mdash; used by third-party analytics and advertising platforms</li>
              </ul>
            </div>

            <div className="lg-section" id="why-use">
              <div className="lg-section-num">Section 02</div>
              <h2>Why We Use Cookies</h2>
              <p>We use cookies for several important reasons:</p>
              <ul>
                <li>To ensure our website functions correctly and securely</li>
                <li>To remember your preferences and settings between visits</li>
                <li>To understand how visitors interact with our website so we can improve it</li>
                <li>To measure the effectiveness of our content and marketing campaigns</li>
                <li>To provide relevant content based on your interests</li>
                <li>To prevent fraudulent activity and improve security</li>
              </ul>
            </div>

            <div className="lg-section" id="types">
              <div className="lg-section-num">Section 03</div>
              <h2>Types of Cookies We Use</h2>
              <p>We categorise our cookies into four types:</p>
              <ul>
                <li><strong>Essential / Strictly Necessary:</strong> These cookies are required for the website to function and cannot be switched off. They are usually set in response to actions you take (e.g., setting privacy preferences, logging in). You can set your browser to block these cookies, but the site may not work properly.</li>
                <li><strong>Performance / Analytics:</strong> These cookies allow us to count visits and understand traffic sources so we can measure and improve our site&apos;s performance. All information is aggregated and anonymised.</li>
                <li><strong>Functional:</strong> These cookies enable enhanced functionality and personalisation such as remembering your preferences or region. Disabling them may affect some features.</li>
                <li><strong>Targeting / Marketing:</strong> These cookies may be set through our site by our advertising partners to build a profile of your interests and show you relevant ads. We only enable these with your explicit consent.</li>
              </ul>
            </div>

            <div className="lg-section" id="cookie-list">
              <div className="lg-section-num">Section 04</div>
              <h2>Cookies We Use</h2>
              <div className="lg-cookie-table-wrap">
                <table className="lg-table lg-cookie-table">
                  <thead>
                    <tr>
                      <th>Cookie Name</th>
                      <th>Type</th>
                      <th>Purpose</th>
                      <th>Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>_session</td>
                      <td>Essential</td>
                      <td>Maintains user session state</td>
                      <td>Session</td>
                    </tr>
                    <tr>
                      <td>_csrf</td>
                      <td>Essential</td>
                      <td>Security token to prevent cross-site request forgery</td>
                      <td>Session</td>
                    </tr>
                    <tr>
                      <td>cookie_consent</td>
                      <td>Essential</td>
                      <td>Stores your cookie consent preferences</td>
                      <td>1 year</td>
                    </tr>
                    <tr>
                      <td>_ga</td>
                      <td>Analytics</td>
                      <td>Google Analytics &mdash; distinguishes unique users</td>
                      <td>2 years</td>
                    </tr>
                    <tr>
                      <td>_ga_*</td>
                      <td>Analytics</td>
                      <td>Google Analytics &mdash; stores session state</td>
                      <td>2 years</td>
                    </tr>
                    <tr>
                      <td>_gid</td>
                      <td>Analytics</td>
                      <td>Google Analytics &mdash; distinguishes users</td>
                      <td>24 hours</td>
                    </tr>
                    <tr>
                      <td>_fbp</td>
                      <td>Marketing</td>
                      <td>Facebook Pixel &mdash; tracks conversions and ad effectiveness</td>
                      <td>3 months</td>
                    </tr>
                    <tr>
                      <td>li_fat_id</td>
                      <td>Marketing</td>
                      <td>LinkedIn Insight Tag &mdash; measures ad performance</td>
                      <td>30 days</td>
                    </tr>
                    <tr>
                      <td>user_pref</td>
                      <td>Functional</td>
                      <td>Stores user interface preferences</td>
                      <td>6 months</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="lg-section" id="third-party-c">
              <div className="lg-section-num">Section 05</div>
              <h2>Third-Party Cookies</h2>
              <p>In addition to our own cookies, we use cookies from trusted third-party services. These services have their own privacy and cookie policies:</p>
              <ul>
                <li><strong>Google Analytics</strong> &mdash; Website traffic and usage analytics. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google Privacy Policy</a></li>
                <li><strong>Google Fonts</strong> &mdash; Web fonts delivery. Google may set cookies when fonts are loaded.</li>
                <li><strong>Font Awesome</strong> &mdash; Icon library loaded via CDN (Cloudflare)</li>
                <li><strong>Facebook Pixel</strong> &mdash; Advertising performance tracking (only if you consent)</li>
                <li><strong>LinkedIn Insight</strong> &mdash; B2B ad performance tracking (only if you consent)</li>
              </ul>
              <p>We do not control third-party cookies and are not responsible for their content or privacy practices. Please review their respective policies for more information.</p>
            </div>

            <div className="lg-section" id="manage">
              <div className="lg-section-num">Section 06</div>
              <h2>Managing Your Cookie Preferences</h2>
              <p>You have several options for controlling cookies:</p>
              <p><strong>Browser Settings:</strong> Most browsers allow you to control cookies through their settings. You can usually find these in the &ldquo;Privacy&rdquo; or &ldquo;Security&rdquo; section of your browser&apos;s settings menu:</p>
              <ul>
                <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener">Google Chrome</a></li>
                <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener">Mozilla Firefox</a></li>
                <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener">Apple Safari</a></li>
                <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener">Microsoft Edge</a></li>
              </ul>
              <p><strong>Opt-Out Tools:</strong></p>
              <ul>
                <li>Google Analytics: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener">Google Analytics Opt-out Add-on</a></li>
                <li>Facebook: Manage ad preferences in your Facebook account settings</li>
                <li>LinkedIn: Opt out via LinkedIn&apos;s ad settings</li>
              </ul>
              <p>Please note that restricting cookies may impact the functionality of our website and your overall experience.</p>
            </div>

            <div className="lg-section" id="do-not-track">
              <div className="lg-section-num">Section 07</div>
              <h2>Do Not Track</h2>
              <p>Some browsers offer a &ldquo;Do Not Track&rdquo; (DNT) setting that signals your preference not to be tracked. Currently, there is no universally accepted standard for how websites should respond to DNT signals. As a result, our website does not currently alter its behaviour in response to DNT signals.</p>
              <p>However, we honour opt-out requests made through the methods described in Section 6 above.</p>
            </div>

            <div className="lg-section" id="updates-c">
              <div className="lg-section-num">Section 08</div>
              <h2>Policy Updates</h2>
              <p>We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our business practices. We will update the &ldquo;Last Updated&rdquo; date at the top of this page when we make changes.</p>
              <p>We encourage you to periodically review this page to stay informed about our use of cookies. Continued use of our website after any changes constitutes your acceptance of the updated policy.</p>
            </div>

            <div className="lg-section" id="contact-cp">
              <div className="lg-section-num">Section 09</div>
              <h2>Contact Us</h2>
              <p>If you have any questions about our use of cookies, please contact us:</p>
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
